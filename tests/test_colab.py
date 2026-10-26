import datetime as dt
import contextlib
import importlib.util
import io
import json
import math
from pathlib import Path
import shutil
import stat
import subprocess
import tempfile
import time
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def load(name, file):
    spec = importlib.util.spec_from_file_location(name, ROOT / file)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


ui = load("ton_colab_test_ui", "colab/generator_ui.py")
bootstrap = load("ton_colab_test_bootstrap", "colab/bootstrap.py")
SETTINGS = dict(wallet="telegram", engine="cpu", pattern="________", position="suffix",
                case_sensitive=True, words=12, threads=1, cpu_load=50, gpu_load=50)


def wait_until(condition, timeout=20):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        value = condition()
        if value:
            return value
        time.sleep(.1)
    raise AssertionError("Timed out waiting for controller")


class ColabTests(unittest.TestCase):
    def setUp(self):
        self.controller = None
        self.folders = []

    def tearDown(self):
        if self.controller:
            if self.controller.running:
                self.controller.control("stop")
                wait_until(lambda: not self.controller.running)
            folder = self.controller.snapshot().get("folder")
            if folder:
                self.folders.append(Path(folder))
        parent = (ROOT / ".colab-results").resolve()
        for folder in self.folders:
            self.assertEqual(folder.resolve().parent, parent)
            shutil.rmtree(folder)

    def test_estimates_are_conditional_and_have_calendar_timezone(self):
        now = dt.datetime(2026, 10, 24, tzinfo=dt.timezone.utc)
        estimate = ui.time_estimates({**SETTINGS, "pattern": "_FURRY"}, 1000000, now, 7)
        self.assertAlmostEqual(estimate["mean"]["seconds"], 64 ** 6 / 1000000)
        self.assertEqual(estimate["mean"]["date"], "25.10.2026 02:05:19")
        self.assertLess(estimate["median"]["seconds"], estimate["mean"]["seconds"])
        self.assertGreater(estimate["p95"]["seconds"], estimate["mean"]["seconds"])
        later = ui.time_estimates({**SETTINGS, "pattern": "_FURRY"}, 1000000, now + dt.timedelta(days=1), 7)
        self.assertEqual(later["mean"]["seconds"], estimate["mean"]["seconds"])
        slower = ui.time_estimates({**SETTINGS, "pattern": "_FURRY"}, 500000, now, 7)
        self.assertEqual(slower["mean"]["seconds"], 2 * estimate["mean"]["seconds"])
        self.assertIsNone(ui.time_estimates(SETTINGS, 0))
        self.assertIsNone(ui.time_estimates(SETTINGS, math.nan))

    def test_zip_extraction_accepts_source_and_rejects_traversal_and_symlinks(self):
        def packet(files):
            output = io.BytesIO()
            with zipfile.ZipFile(output, "w") as archive:
                for name, value in files:
                    if isinstance(name, str):
                        exact = zipfile.ZipInfo("placeholder")
                        exact.filename = name  # Preserve Windows backslashes for the rejection test.
                        name = exact
                    archive.writestr(name, value)
            return output.getvalue()
        with tempfile.TemporaryDirectory() as folder:
            files = [("repo/" + name, "# test") for name in ("package-lock.json", "scripts/install-linux.sh", "bin/generator-ton.mjs", "colab/generator_ui.py")]
            self.assertEqual(bootstrap.extract_project(packet(files), folder), Path(folder).resolve() / "repo")
            for name in ("../outside", "/absolute", "C:/outside", "folder\\outside"):
                with self.assertRaises(ValueError):
                    bootstrap.extract_project(packet([(name, "bad")]), folder)
            link = zipfile.ZipInfo("link")
            link.external_attr = (stat.S_IFLNK | 0o777) << 16
            with self.assertRaises(ValueError):
                bootstrap.extract_project(packet([(link, "somewhere")]), folder)

    def test_notebook_has_no_execution_outputs_and_embeds_working_bootstrap(self):
        notebook = json.loads((ROOT / "colab/GENERATOR_TON_USERNAME_Colab.ipynb").read_text(encoding="utf-8"))
        self.assertEqual(notebook["nbformat"], 4)
        for cell in notebook["cells"]:
            self.assertIn("id", cell)
            if cell["cell_type"] == "code":
                self.assertEqual(cell["outputs"], [])
                self.assertIsNone(cell["execution_count"])
                compile("".join(cell["source"]), "notebook-cell", "exec")
        with zipfile.ZipFile(ROOT / "dist/generator-ton-username.source.zip") as archive:
            self.assertIn("colab/generator_ui.py", archive.namelist())
            self.assertIn("colab/GENERATOR_TON_USERNAME_Colab.ipynb", archive.namelist())
            self.assertFalse(any("recovery.key" in name or ".encrypted.json" in name or ".colab-results" in name for name in archive.namelist()))

    @unittest.skipUnless(importlib.util.find_spec("ipywidgets"), "Optional ipywidgets UI verification")
    def test_real_widget_models_keep_telegram_and_gpu_word_formats_valid(self):
        with contextlib.redirect_stdout(io.StringIO()):
            panel = ui.create_panel(ROOT)
        try:
            children = panel["widget"].children
            find = lambda label: next(widget for widget in children if getattr(widget, "description", None) == label)
            wallet, engine, words = [find(label) for label in ("Кошелёк", "Устройство", "Сид-фраза")]
            self.assertEqual(words.value, 12)
            self.assertTrue(words.disabled)
            self.assertEqual(find("Время на панели").value, 7)
            wallet.value = "v5"
            self.assertFalse(words.disabled)
            words.value = 24
            engine.value = "gpu"
            self.assertEqual(words.value, 12)
            self.assertTrue(words.disabled)
            self.assertTrue(next(widget for widget in children if getattr(widget, "children", None) and getattr(widget.children[0], "description", None) == "Начать поиск").children[0].disabled)
        finally:
            panel["close"]()
            panel["widget"].close()

    def test_real_cli_pause_resume_stop_are_controlled_without_restarting_search(self):
        self.controller = ui.SearchController(ROOT)
        self.controller.start(SETTINGS)
        wait_until(lambda: self.controller.snapshot()["attempts"] > 0)
        process = self.controller.process
        self.controller.control("pause")
        wait_until(lambda: self.controller.snapshot().get("manualPaused"))
        time.sleep(1.5)  # Drain a batch that was already in flight before pause.
        count = self.controller.snapshot()["attempts"]
        time.sleep(1.2)
        self.assertEqual(self.controller.snapshot()["attempts"], count)
        self.assertEqual(self.controller.snapshot()["rate"], 0)
        self.controller.control("resume")
        wait_until(lambda: self.controller.snapshot()["attempts"] > count)
        self.assertIs(self.controller.process, process)
        self.controller.control("stop")
        wait_until(lambda: self.controller.snapshot()["phase"] == "stopped")
        self.assertEqual(self.controller.snapshot()["exitCode"], 0)

    def test_real_cli_find_backup_export_and_timed_stop(self):
        self.controller = ui.SearchController(ROOT)
        self.controller.start({**SETTINGS, "pattern": "a", "case_sensitive": False}, 40)
        wait_until(lambda: self.controller.snapshot().get("results"), 45)
        wait_until(lambda: not self.controller.running)
        snapshot = self.controller.snapshot()
        result = snapshot["results"][0]
        self.assertRegex(result["address"], "[aA]$")
        secret = self.controller.export_words()
        self.folders.append(secret.parent)
        backup = json.loads(secret.read_text(encoding="utf-8"))
        self.assertEqual(backup["address"], result["address"])
        self.assertEqual(len(backup["mnemonic"]), 12)
        self.assertNotIn(" ".join(backup["mnemonic"]), repr(snapshot))
        self.assertNotIn("mnemonic", repr(snapshot))
        archive_file = self.controller.result_archive()
        with zipfile.ZipFile(archive_file) as archive:
            self.assertIn("wallet-1/recovery.key", archive.namelist())
            encrypted = next(name for name in archive.namelist() if name.endswith(".encrypted.json"))
            encrypted_text = archive.read(encrypted).decode("utf-8")
            self.assertNotIn('"mnemonic"', encrypted_text)
            self.assertNotIn(" ".join(backup["mnemonic"]), encrypted_text)
        archive_file.unlink()
        backup["mnemonic"].clear()
        self.folders.append(Path(snapshot["folder"]))
        self.controller.start(SETTINGS, .2)
        wait_until(lambda: self.controller.snapshot()["phase"] == "stopped")
        self.assertEqual(self.controller.snapshot()["duration"], .2)
        self.assertNotIn("found", self.controller.snapshot())
        self.assertEqual(len(self.controller.snapshot()["results"]), 1)


if __name__ == "__main__":
    unittest.main()
