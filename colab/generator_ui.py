"""Colab panel and a subprocess controller. Recovery words never enter widget state."""
import datetime as dt
import html
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import threading
import time
import zipfile

UTC = dt.timezone.utc


def duration_text(seconds):
    if not isinstance(seconds, (int, float)) or not math.isfinite(seconds):
        return "измеряем…"
    if seconds < 60:
        return f"{max(1, math.ceil(seconds))} сек."
    if seconds < 3600:
        return f"{seconds / 60:.1f} мин."
    if seconds < 86400:
        return f"{seconds / 3600:.1f} ч."
    return f"{seconds / 86400:.1f} дн."


def time_estimates(settings, rate, now=None, offset=7):
    """Conditional waiting time from now, not mean minus time already spent."""
    if not isinstance(rate, (int, float)) or not math.isfinite(rate) or rate <= 0:
        return None
    now = now or dt.datetime.now(UTC)
    probability = math.prod(2 / 64 if not settings.get("case_sensitive", True)
                            and char.isascii() and char.isalpha() else 1 / 64
                            for char in settings["pattern"])
    values = {"mean": 1 / probability / rate}
    for name, chance in (("median", .5), ("p95", .95)):
        values[name] = math.ceil(math.log1p(-chance) / math.log1p(-probability)) / rate
    zone = dt.timezone(dt.timedelta(hours=offset))
    answer = {}
    for name, seconds in values.items():
        try:
            date = (now + dt.timedelta(seconds=seconds)).astimezone(zone).strftime("%d.%m.%Y %H:%M:%S")
        except (OverflowError, ValueError):
            date = "за пределами календаря"
        answer[name] = {"seconds": seconds, "duration": duration_text(seconds), "date": date}
    return answer


class SearchController:
    def __init__(self, root):
        self.root = Path(root).resolve()
        self.lock = threading.RLock()
        self.process = None
        self.results = []
        self.state = {"phase": "idle", "attempts": 0, "rate": 0, "elapsedMs": 0, "paused": False}

    @property
    def running(self):
        with self.lock:
            return self.process is not None and self.process.poll() is None

    def snapshot(self):
        with self.lock:
            return {**self.state, "settings": dict(self.state.get("settings", {})), "results": list(self.results)}

    def node(self):
        for arch in ("x64", "arm64"):
            local = self.root / ".runtime" / ("node-linux-" + arch) / "bin" / "node"
            if local.is_file():
                return str(local)
        node = shutil.which("node")
        if not node:
            raise RuntimeError("Сначала нажми «Подготовить среду».")
        return node

    def start(self, settings, seconds=0):
        with self.lock:
            if self.running or self.state["phase"] == "saving":
                raise RuntimeError("Дождись остановки текущего поиска.")
            pattern = settings.get("pattern", "")
            if not re.fullmatch(r"[A-Za-z0-9_-]{1,8}", pattern):
                raise ValueError("Шаблон: от 1 до 8 латинских букв, цифр, _ или -.")
            if seconds < 0 or not math.isfinite(seconds):
                raise ValueError("Некорректная длительность.")
            parent = self.root / ".colab-results"
            parent.mkdir(mode=0o700, exist_ok=True)
            folder = Path(tempfile.mkdtemp(prefix="run-", dir=parent))
            args = [self.node(), str(self.root / "bin/generator-ton.mjs"), "--json", "--control-stdin",
                    "--pattern", pattern, "--wallet", settings["wallet"], "--engine", settings["engine"],
                    "--threads", str(settings["threads"]), "--words", str(settings["words"]),
                    "--cpu-load", str(settings["cpu_load"]), "--gpu-load", str(settings["gpu_load"]),
                    "--position", settings["position"], "--output", str(folder)]
            if not settings["case_sensitive"]:
                args.append("--ignore-case")
            if settings.get("max"):
                args.append("--max")
            if seconds:
                args += ["--duration", str(seconds)]
            self.process = subprocess.Popen(args, cwd=self.root, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                            stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="replace",
                                            bufsize=1)
            self.state = {"phase": "starting", "settings": dict(settings), "attempts": 0, "rate": 0,
                          "elapsedMs": 0, "paused": False, "manualPaused": False,
                          "duration": seconds, "startedAt": dt.datetime.now(UTC), "folder": str(folder),
                          "gpu": None, "stderr": ""}
            process = self.process
            threading.Thread(target=self._read_errors, args=(process,), daemon=True).start()
            threading.Thread(target=self._read_events, args=(process, folder), daemon=True).start()

    def _read_errors(self, process):
        for line in process.stderr:
            with self.lock:
                if self.process is process:
                    self.state["stderr"] = (self.state.get("stderr", "") + line)[-2000:]
        process.stderr.close()

    def _read_events(self, process, folder):
        for line in process.stdout:
            if len(line) > 16384:
                continue
            try:
                event = json.loads(line)
            except (ValueError, TypeError):
                continue
            if not isinstance(event, dict):
                continue
            with self.lock:
                if self.process is not process:
                    continue
                kind = event.get("type")
                if kind == "start":
                    self.state.update(phase="running", startedAt=dt.datetime.now(UTC))
                elif kind == "progress":
                    for key in ("attempts", "rate", "elapsedMs", "cpuDuty"):
                        value = event.get(key)
                        if isinstance(value, (int, float)) and math.isfinite(value) and value >= 0:
                            self.state[key] = value
                    self.state["paused"] = bool(event.get("paused"))
                    if self.state["paused"]:
                        self.state["rate"] = 0
                elif kind == "control":
                    self.state.update(paused=bool(event.get("paused")), manualPaused=bool(event.get("manualPaused")), rate=0)
                elif kind == "engine":
                    self.state["gpu"] = bool(event.get("gpu"))
                elif kind == "saving":
                    self.state.update(phase="saving", rate=0)
                elif kind == "found":
                    # Only accept actual files inside this run's private directory.
                    file, key = Path(event.get("file", "")).resolve(), Path(event.get("keyFile", "")).resolve()
                    if file.parent == folder and key == folder / "recovery.key" and file.is_file() and key.is_file():
                        item = {"address": str(event.get("address", "")), "contract": str(event.get("contract", "")),
                                "file": str(file), "keyFile": str(key)}
                        self.results.append(item)
                        self.state.update(phase="found", found=item, rate=0)
                elif kind == "end":
                    for name in ("attempts", "elapsedMs"):
                        if isinstance(event.get(name), (int, float)):
                            self.state[name] = event[name]
        process.stdout.close()
        code = process.wait()
        process.stdin.close()
        with self.lock:
            if self.process is process:
                self.state.update(phase="found" if self.state.get("found") else "stopped" if code in (0, 130) else "error",
                                  rate=0, paused=False, exitCode=code, finishedAt=dt.datetime.now(UTC))

    def control(self, action):
        if action not in ("pause", "resume", "stop"):
            raise ValueError("Неизвестное действие.")
        with self.lock:
            if not self.running:
                return
            if self.state["phase"] == "saving":
                raise RuntimeError("Сохраняется найденный кошелёк. Дождись подтверждения.")
            try:
                self.process.stdin.write(json.dumps({"action": action}) + "\n")
                self.process.stdin.flush()
            except (BrokenPipeError, OSError):
                return
            if action == "stop":
                self.state["phase"] = "stopping"

    def result_archive(self):
        with self.lock:
            results = list(self.results)
        if not results:
            raise RuntimeError("Сначала дождись найденного адреса.")
        output = self.root / ".colab-results" / "TON-wallets-private.zip"
        with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("README.txt", "PRIVATE BACKUP. Keep offline. Each wallet needs BOTH the encrypted JSON and recovery.key.\n"
                             "For import use the same wallet type. recovery.key decrypts the words. Never publish this archive.\n")
            for index, result in enumerate(results, 1):
                for name in ("file", "keyFile"):
                    file = Path(result[name])
                    archive.write(file, f"wallet-{index}/{file.name}")
        output.chmod(0o600)
        return output

    def export_words(self):
        with self.lock:
            if self.running or not self.results:
                raise RuntimeError("Дождись окончания поиска и найденного кошелька.")
            result = self.results[-1]
        folder = Path(tempfile.mkdtemp(prefix="export-", dir=self.root / ".colab-results"))
        file = folder / "SECRET-TON-backup.json"
        completed = subprocess.run([self.node(), str(self.root / "bin/generator-ton.mjs"), "export",
                                    "--file", result["file"], "--key", result["keyFile"], "--output", str(file)],
                                   cwd=self.root, capture_output=True, timeout=30)
        if completed.returncode or not file.is_file():
            raise RuntimeError("Не удалось открыть результат. Скачай архив с ключом.")
        return file


def create_panel(root):
    import ipywidgets as w
    from IPython.display import display

    controller = SearchController(root)
    cores = min(256, os.cpu_count() or 1)
    task = {"busy": False, "ready": False, "gpu_ready": False, "error": "", "note": ""}
    style = {"description_width": "145px"}
    field = {"width": "100%"}
    wallet = w.Dropdown(options=[("Telegram · WalletTg", "telegram"), ("Tonkeeper · V4R2", "v4"),
                                 ("Tonkeeper · V5R1", "v5")], description="Кошелёк", style=style, layout=field)
    engine = w.Dropdown(options=[("CPU", "cpu"), ("GPU", "gpu"), ("CPU + GPU", "hybrid")],
                        description="Устройство", style=style, layout=field)
    pattern = w.Text(value="ton", description="Текст в адресе", style=style, layout=field)
    position = w.Dropdown(options=[("В конце", "suffix"), ("После первых 4 символов", "prefix")],
                          description="Позиция", style=style, layout=field)
    case = w.Checkbox(value=False, description="Учитывать регистр", indent=False)
    words = w.Dropdown(options=[("12 слов · BIP39", 12), ("24 слова · TON (CPU)", 24)],
                       description="Сид-фраза", style=style, layout=field)
    threads = w.IntSlider(value=max(1, math.ceil(cores / 2)), min=1, max=cores, description="CPU-потоки", style=style, layout=field)
    cpu_load = w.IntSlider(value=50, min=5, max=100, step=5, description="Активность CPU, %", style=style, layout=field)
    gpu_load = w.IntSlider(value=50, min=5, max=90, step=5, description="Активность GPU, %", style=style, layout=field)
    timezone = w.Dropdown(options=[(f"UTC{x:+d}", x) for x in range(-12, 15)], value=7,
                          description="Время на панели", style=style, layout=field)
    maximum = w.Checkbox(value=False, description="MAX · полная мощность, без автоснижения", indent=False, layout=field)
    test_seconds = w.IntSlider(value=30, min=10, max=120, step=10, description="Длительность теста", style=style, layout=field)
    prepare = w.Button(description="1. Подготовить среду", button_style="info", layout=w.Layout(width="220px"))
    start = w.Button(description="Начать поиск", button_style="success")
    benchmark = w.Button(description="Тест скорости")
    pause = w.Button(description="Пауза")
    stop = w.Button(description="Остановить", button_style="warning")
    download = w.Button(description="↓ Архив с ключом", layout=w.Layout(width="200px"))
    consent = w.Checkbox(description="Скачать открытые слова для импорта", value=False, indent=False,
                         layout=w.Layout(width="100%"))
    export = w.Button(description="↓ Слова (JSON)", layout=w.Layout(width="200px"))
    info, status, metrics, dates, result, errors = [w.HTML() for _ in range(6)]
    controls = [wallet, engine, pattern, position, case, words, threads, cpu_load, gpu_load, test_seconds, maximum]

    def render():
        s = controller.snapshot()
        running = controller.running or s["phase"] in ("saving", "stopping")
        for control in controls:
            control.disabled = running or task["busy"]
        words.disabled = running or task["busy"] or wallet.value == "telegram" or engine.value != "cpu"
        gpu_load.disabled = running or task["busy"] or engine.value == "cpu"
        prepare.disabled = running or task["busy"]
        start.disabled = benchmark.disabled = running or task["busy"] or not task["ready"]
        pause.disabled = stop.disabled = not running or s["phase"] in ("saving", "stopping", "found")
        pause.description = "Продолжить" if s.get("manualPaused") else "Пауза"
        download.disabled = not s["results"] or task["busy"]
        export.disabled = running or task["busy"] or not s["results"] or not consent.value
        labels = {"idle": "Готов к настройке", "starting": "Запускаем…", "running": "Поиск идёт",
                  "saving": "Совпадение найдено. Сохраняем кошелёк…", "found": "Кошелёк сохранён",
                  "stopping": "Останавливаем…", "stopped": "Поиск остановлен", "error": "Поиск завершился с ошибкой"}
        label = "Подготовка среды…" if task["busy"] else "Пауза" if s.get("paused") else labels[s["phase"]]
        gpu_note = " · GPU проверен" if s.get("gpu") else " · GPU отключён, работает CPU" if s.get("gpu") is False else ""
        status.value = f"<h3>{label}{gpu_note}</h3><p>{html.escape(task['note'])}</p>"
        metrics.value = (f"<p><b>Проверено:</b> {s['attempts']:,} &nbsp; <b>Скорость:</b> {s['rate']:,} / сек."
                         f" &nbsp; <b>Прошло:</b> {duration_text(s['elapsedMs'] / 1000)}</p>")
        now = dt.datetime.now(UTC)
        if running and s.get("duration"):
            deadline = s["startedAt"] + dt.timedelta(seconds=s["duration"])
            date = deadline.astimezone(dt.timezone(dt.timedelta(hours=timezone.value))).strftime("%d.%m.%Y %H:%M:%S")
            dates.value = (f"<p><b>Тест закончится: {date} (UTC{timezone.value:+d})</b>"
                           f" · осталось {duration_text(max(0, (deadline - now).total_seconds()))}.</p>"
                           "<p>При нахождении адреса тест завершится раньше.</p>")
        elif s["phase"] == "running":
            estimates = None if s.get("paused") else time_estimates(s["settings"], s["rate"], now, timezone.value)
            if estimates:
                rows = [("Ожидаемое нахождение (среднее)", "mean"), ("Шанс 50% за следующие", "median"), ("Шанс 95% за следующие", "p95")]
                dates.value = "<table style='width:100%;text-align:left'>" + "".join(
                    f"<tr><td>{title}</td><td><b>{estimates[key]['duration']}</b></td><td>{estimates[key]['date']}</td></tr>"
                    for title, key in rows) + (f"</table><p>Время: UTC{timezone.value:+d}. Это оценка, не срок с гарантией. "
                                             "Паузы и изменение скорости сдвигают даты. Прошедшее время не приближает случайное совпадение.</p>")
            else:
                dates.value = "<p>Ожидаемое время нахождения: после паузы и замера скорости.</p>"
        elif s.get("finishedAt"):
            finished = s["finishedAt"].astimezone(dt.timezone(dt.timedelta(hours=timezone.value))).strftime("%d.%m.%Y %H:%M:%S")
            dates.value = f"<p><b>Завершено: {finished} (UTC{timezone.value:+d})</b></p>"
        else:
            dates.value = "<p>Дата нахождения появится после замера скорости. Для первого запуска попробуй 2–3 символа.</p>"
        if s["results"]:
            found = s["results"][-1]
            result.value = f"<h3>Найдено кошельков: {len(s['results'])}</h3><p style='overflow-wrap:anywhere'><b>{html.escape(found['address'])}</b></p><p>Тип: {html.escape(found['contract'])}. Скачай архив с ключом до отключения Colab.</p>"
        errors.value = "<pre style='white-space:pre-wrap'>" + html.escape(task["error"] or s.get("stderr", "")) + "</pre>"

    def settings():
        return dict(wallet=wallet.value, engine=engine.value, pattern=pattern.value.strip(), position=position.value,
                    case_sensitive=case.value, words=words.value, threads=threads.value, cpu_load=cpu_load.value, gpu_load=gpu_load.value, max=maximum.value)

    def background(action):
        if task["busy"]:
            return
        task.update(busy=True, error="")
        render()
        def run():
            try:
                action()
            except Exception as error:
                # Installation/controller errors contain no phrase; never inspect decrypted backup contents.
                task["error"] = str(error)
            finally:
                task["busy"] = False
                render()
        threading.Thread(target=run, daemon=True).start()

    def setup(_):
        def action():
            root = Path(controller.root)
            command = ["bash", "scripts/install-linux.sh"] + (["--gpu"] if engine.value != "cpu" else [])
            log = root / ".colab-setup.log"
            task["note"] = "Устанавливаем зависимости. Обычно это занимает несколько минут."
            with log.open("w", encoding="utf-8") as stream:
                completed = subprocess.run(command, cwd=root, stdout=stream, stderr=subprocess.STDOUT, timeout=900)
            if completed.returncode:
                raise RuntimeError("Подготовка не завершилась. Журнал: " + str(log) + "\n" + log.read_text(encoding="utf-8", errors="replace")[-1800:])
            task["ready"] = True
            if engine.value != "cpu":
                probe = subprocess.run([controller.node(), "colab/probe-gpu.mjs"], cwd=root, capture_output=True, timeout=90)
                task["gpu_ready"] = probe.returncode == 0
                if not task["gpu_ready"]:
                    task["note"] = "CPU готов. NVIDIA GPU найден системой, но доступ WebGPU/Vulkan не подтверждён." if shutil.which("nvidia-smi") else "CPU готов. GPU в этой среде недоступен."
                    raise RuntimeError("GPU не прошёл проверку WebGPU/Vulkan. Выбери CPU либо среду с Vulkan-драйвером. "
                                       "Выбор GPU в Colab сам по себе не включает ускорение генератора.")
            task["note"] = "Среда готова. Можно запустить тест скорости или полный поиск."
        background(action)

    def launch(seconds):
        try:
            task["error"] = ""
            if engine.value != "cpu" and not task["gpu_ready"]:
                raise RuntimeError("Сначала выбери GPU и нажми «Подготовить среду» для проверки.")
            controller.start(settings(), seconds)
        except Exception as error:
            task["error"] = str(error)
        render()

    def command(action):
        try:
            controller.control(action)
        except Exception as error:
            task["error"] = str(error)
        render()

    def save_file(plaintext=False):
        def action():
            from google.colab import files
            file = controller.export_words() if plaintext else controller.result_archive()
            files.download(str(file))
            task["note"] = "Скачивание отправлено в браузер. Проверь, что файл сохранился."
        background(action)

    def options_changed(_):
        if wallet.value == "telegram" or engine.value != "cpu":
            words.value = 12
        if cores < 2 and engine.value == "hybrid":
            engine.value = "cpu"
        render()
    def maximum_changed(_):
        gpu_load.max = 100 if maximum.value else 90
        if maximum.value:
            threads.value, cpu_load.value, gpu_load.value = cores, 100, 100
        elif gpu_load.value > 90:
            gpu_load.value = 90
        render()

    prepare.on_click(setup)
    start.on_click(lambda _: launch(0))
    benchmark.on_click(lambda _: launch(test_seconds.value))
    pause.on_click(lambda _: command("resume" if controller.snapshot().get("manualPaused") else "pause"))
    stop.on_click(lambda _: command("stop"))
    download.on_click(lambda _: save_file())
    export.on_click(lambda _: save_file(True))
    for control in (wallet, engine, consent, timezone):
        control.observe(options_changed, names="value")
    maximum.observe(maximum_changed, names="value")
    gpu_name = "не выделен"
    if shutil.which("nvidia-smi"):
        try:
            gpu_name = subprocess.check_output(["nvidia-smi", "--query-gpu=name", "--format=csv,noheader"],
                                               text=True, timeout=10).strip()
        except (subprocess.SubprocessError, OSError):
            gpu_name = "не удалось определить"
    info.value = f"<p><b>CPU:</b> {cores} потоков &nbsp; <b>GPU:</b> {html.escape(gpu_name)}</p><p>GPU использует WebGPU/Vulkan. Драйвер в Colab может не поддерживать этот способ.</p>"
    header = w.HTML("<h1>GENERATOR TON USERNAME</h1><p>Google Colab · полноценный поиск новых кошельков</p>"
                    "<p><b>Это облако Google.</b> Здесь создаются новые секретные слова. Не вводи существующие сид-фразы. "
                    "Архив с ключом даёт доступ к кошельку; храни его у себя. Colab может остановить среду и удалить файлы.</p>")
    panel = w.VBox([header, info, wallet, pattern, position, case, words, engine, maximum, threads, cpu_load, gpu_load, timezone,
                    prepare, test_seconds, w.HBox([start, benchmark, pause, stop], layout=w.Layout(flex_flow="row wrap")),
                    status, metrics, dates, result, download, consent, export, errors],
                   layout=w.Layout(max_width="930px", padding="20px", border="1px solid #426783"))
    closed = threading.Event()
    def refresh():
        while not closed.wait(1):
            try:
                render()
            except Exception:
                return
    render()
    threading.Thread(target=refresh, daemon=True).start()
    display(panel)
    return {"controller": controller, "widget": panel, "close": closed.set}
