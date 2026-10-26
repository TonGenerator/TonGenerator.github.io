#!/usr/bin/env bash
set -euo pipefail
[[ $# -eq 0 || ($# -eq 1 && "$1" == --gpu) ]] || { printf '%s\n' 'Использование: bash scripts/install-linux.sh [--gpu]' >&2; exit 1; }
task_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$task_root"
case "$(uname -s)" in Linux) ;; *) printf '%s\n' 'Для других ОС установи Node.js 22+ и выполни npm ci.' >&2; exit 1;; esac
case "$(uname -m)" in x86_64) task_arch=x64;; aarch64|arm64) task_arch=arm64;; *) printf '%s\n' 'Поддерживаются Linux x64 и arm64.' >&2; exit 1;; esac
task_runtime="$task_root/.runtime/node-linux-$task_arch"
if command -v node >/dev/null 2>&1 && node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)' ; then
  printf '%s\n' 'Используем установленный Node.js.'
elif [[ -x "$task_runtime/bin/node" ]]; then
  export PATH="$task_runtime/bin:$PATH"
else
  for task_command in curl sha256sum tar xz awk; do command -v "$task_command" >/dev/null || { printf 'Нужна утилита: %s\n' "$task_command" >&2; exit 1; }; done
  mkdir -p "$task_root/.runtime"
  task_download="$(mktemp -d "$task_root/.runtime/download.XXXXXX")"
  task_base=https://nodejs.org/dist/latest-v24.x
  curl --fail --location --proto '=https' --tlsv1.2 "$task_base/SHASUMS256.txt" -o "$task_download/SHASUMS256.txt"
  read -r task_hash task_archive < <(awk -v arch="$task_arch" '$2 ~ ("^node-v24\\.[0-9]+\\.[0-9]+-linux-" arch "\\.tar\\.xz$") {print $1,$2;exit}' "$task_download/SHASUMS256.txt")
  [[ "$task_hash" =~ ^[a-f0-9]{64}$ && "$task_archive" =~ ^node-v24\.[0-9]+\.[0-9]+-linux-(x64|arm64)\.tar\.xz$ ]] || { printf '%s\n' 'Не удалось проверить манифест Node.js.' >&2; exit 1; }
  curl --fail --location --proto '=https' --tlsv1.2 "$task_base/$task_archive" -o "$task_download/$task_archive"
  (cd "$task_download" && printf '%s  %s\n' "$task_hash" "$task_archive" | sha256sum --check -)
  [[ ! -L "$task_runtime" ]] || { printf '%s\n' 'Каталог runtime не должен быть ссылкой.' >&2; exit 1; }
  mkdir -p "$task_runtime"
  tar -xJf "$task_download/$task_archive" --strip-components=1 -C "$task_runtime"
  export PATH="$task_runtime/bin:$PATH"
fi
npm ci --omit=dev --ignore-scripts
if [[ "${1:-}" == --gpu ]]; then npm install --no-save --package-lock=false webgpu@0.6.2; fi
chmod +x "$task_root/generator-ton"
printf '\n%s\n' 'Готово. Запуск: ./generator-ton --pattern _FURRY --wallet telegram'
