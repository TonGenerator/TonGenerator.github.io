"""Embedded in the notebook so it works before the project has been uploaded."""
from pathlib import Path, PurePosixPath
import io
import re
import stat
import subprocess
import tempfile
import zipfile


def extract_project(data, destination):
    if len(data) > 30 * 1024 * 1024:
        raise ValueError("Архив слишком большой: нужен ZIP исходников генератора.")
    destination = Path(destination).resolve()
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        entries = archive.infolist()
        if len(entries) > 3000 or sum(x.file_size for x in entries) > 60 * 1024 * 1024:
            raise ValueError("Неверный архив исходников.")
        for entry in entries:
            raw_name = entry.orig_filename
            name = PurePosixPath(raw_name)
            if name.is_absolute() or ".." in name.parts or "\\" in raw_name or ":" in raw_name or "\0" in raw_name or stat.S_ISLNK(entry.external_attr >> 16):
                raise ValueError("Небезопасный путь в архиве.")
        archive.extractall(destination)
    candidates = [destination] + [x for x in destination.iterdir() if x.is_dir()]
    required = ("package-lock.json", "scripts/install-linux.sh", "bin/generator-ton.mjs", "colab/generator_ui.py")
    for folder in candidates:
        if all((folder / file).is_file() for file in required):
            return folder
    raise ValueError("В архиве нет Colab-панели. Скачай свежий архив исходников с кнопки «Установить».")


def launch_notebook(repository_url=""):
    from google.colab import files, output
    from IPython.display import display
    import importlib.util

    output.enable_custom_widget_manager()
    previous = globals().get("_ton_panel")
    if previous:
        display(previous["widget"])
        print("Панель уже открыта. Текущий поиск и результаты сохранены.")
        return
    parent = Path("/content") if Path("/content").is_dir() else Path(tempfile.gettempdir())
    destination = Path(tempfile.mkdtemp(prefix="ton-generator-", dir=parent))
    if repository_url.strip():
        match = re.fullmatch(r"https://github\.com/([A-Za-z0-9][A-Za-z0-9_.-]*)/([A-Za-z0-9][A-Za-z0-9_.-]*?)(?:\.git)?/?", repository_url.strip())
        if not match:
            raise ValueError("Нужна ссылка https://github.com/owner/repository без токенов и параметров.")
        root = destination / "project"
        completed = subprocess.run(["git", "clone", "--depth", "1", "--", f"https://github.com/{match[1]}/{match[2]}.git", str(root)],
                                   capture_output=True, timeout=180)
        if completed.returncode or not (root / "colab/generator_ui.py").is_file():
            raise RuntimeError("Не удалось загрузить проект. Проверь публичный GitHub или оставь поле пустым и загрузи ZIP.")
    else:
        print("Выбери generator-ton-username.source.zip, скачанный с кнопки «Установить».")
        uploaded = files.upload()
        if len(uploaded) != 1:
            raise ValueError("Выбери один ZIP с исходниками.")
        root = extract_project(next(iter(uploaded.values())), destination)
        uploaded.clear()
    spec = importlib.util.spec_from_file_location("ton_colab_ui", root / "colab/generator_ui.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    globals()["_ton_panel"] = module.create_panel(root)
