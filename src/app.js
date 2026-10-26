import { DEMO_KEY, DEFAULT_ID, SPACE, validateOptions, patternProbability, makeResult, matches } from './engine.js';

const $ = id => document.getElementById(id);
const format = n => Math.floor(n).toLocaleString('ru-RU');
let position = 'suffix';
let running = false;
let workers = [];
let counts = [];
let exhausted = new Set();
let runId = 0;
let startedAt = 0;
let elapsedMs = 0;
let timer;
let result = null;
let options;
let toastTimer;
const maxThreads = Math.max(1, Math.min(16, navigator.hardwareConcurrency || 4));
$('threads').max = maxThreads;
$('threads').value = Math.min(4, Math.max(1, Math.floor(maxThreads / 2)));
$('thread-count').value = $('threads').value;

function readOptions() {
  return {
    publicKey: $('public-key').value.trim(), pattern: $('pattern').value.trim(), position,
    caseSensitive: $('case-sensitive').checked,
    bounceable: $('address-format').value === 'eq', testOnly: $('network').value === 'testnet',
  };
}

function showError(message) {
  $('form-error').textContent = message;
  $('form-error').hidden = false;
}

function setStatus(label, type = '') {
  $('status').className = `status ${type}`;
  $('status').lastElementChild.textContent = label;
  document.querySelector('.monitor').classList.toggle('searching', type === 'searching');
}

function duration(ms) {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  return (h ? `${String(h).padStart(2, '0')}:` : '') + `${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function metrics() {
  const attempts = counts.reduce((a, b) => a + b, 0);
  if (running) elapsedMs = performance.now() - startedAt;
  $('attempts').replaceChildren(document.createTextNode(format(attempts)), unit(' шт.'));
  const rate = attempts && elapsedMs > 0 ? Math.round(attempts / elapsedMs * 1000) : 0;
  $('speed').replaceChildren(document.createTextNode(rate ? format(rate) : '—'), unit(' / сек'));
  $('elapsed').replaceChildren(document.createTextNode(duration(elapsedMs)), unit(' сек'));
  $('space-count').textContent = `${format(attempts)} / ${format(SPACE)}`;
  $('track-fill').style.width = `${Math.min(100, attempts / SPACE * 100)}%`;
  if (running) {
    const p = patternProbability(options.pattern, options.caseSensitive);
    const seconds = rate ? 1 / p / rate : 0;
    $('scan-caption').textContent = !seconds ? 'Запускаем вычислительные потоки…' : p * SPACE < 1
      ? `До конца диапазона: ${timeEstimate((SPACE - attempts) / rate)}`
      : `Оценка в среднем: ${timeEstimate(seconds)}`;
  }
}

function unit(text) {
  const span = document.createElement('span');
  span.textContent = text;
  return span;
}

function timeEstimate(seconds) {
  if (seconds < 1) return '< 1 сек';
  if (seconds < 60) return `~${Math.ceil(seconds)} сек`;
  if (seconds < 3600) return `~${Math.ceil(seconds / 60)} мин`;
  if (seconds < 86400) return `~${Math.ceil(seconds / 3600)} ч`;
  return `~${format(Math.ceil(seconds / 86400))} дн`;
}

function renderAddress(address, highlight = false) {
  const node = $('address-preview');
  node.replaceChildren();
  if (!highlight) { node.textContent = address; return; }
  const start = options.position === 'prefix' ? 4 : address.length - options.pattern.length;
  node.append(document.createTextNode(address.slice(0, start)));
  const mark = document.createElement('mark');
  mark.textContent = address.slice(start, start + options.pattern.length);
  node.append(mark, document.createTextNode(address.slice(start + options.pattern.length)));
}

function preview() {
  if (running || result) return;
  const opts = readOptions();
  if (opts.publicKey) {
    try {
      const r = makeResult({ ...opts, pattern: opts.pattern || 'a' }, DEFAULT_ID);
      renderAddress(r.address);
      $('preview-label').textContent = 'АДРЕС ПРИ WALLETID 698983191';
      return;
    } catch { /* Invalid public input is explained when starting. */ }
  }
  const node = $('address-preview');
  node.replaceChildren();
  const tag = document.createElement('span');
  tag.className = 'address-prefix';
  tag.textContent = opts.testOnly ? (opts.bounceable ? 'kQ' : '0Q') : (opts.bounceable ? 'EQ' : 'UQ');
  const dots = document.createElement('span');
  dots.className = 'placeholder-address';
  dots.append('···· ···· ···· ····', document.createElement('br'), '···· ···· ···· ');
  const mark = document.createElement('mark');
  mark.textContent = opts.pattern || '…';
  if (position === 'prefix') node.append(tag, '··', mark, dots);
  else node.append(tag, dots, mark);
  $('preview-label').textContent = 'ТВОЙ БУДУЩИЙ АДРЕС';
}

function updateForm() {
  if (result && !running) {
    result = null;
    $('found-result').hidden = true;
    $('empty-result').hidden = false;
    $('result-title').textContent = 'Результат';
    $('start-label').textContent = 'Начать поиск';
    $('scan-caption').textContent = 'Готов к запуску';
    setStatus('Ожидание');
    counts = [];
    elapsedMs = 0;
    metrics();
  }
  const opts = readOptions();
  $('thread-count').value = $('threads').value;
  $('pattern-length').textContent = `${opts.pattern.length} / 8 СИМВОЛОВ`;
  $('pattern-marker').textContent = position === 'suffix' ? '…' : '↳';
  $('pattern-hint').textContent = position === 'suffix' ? 'Совпадение в самом конце, включая контрольную сумму.' : 'Совпадение после первых 4 символов адреса (служебная часть).';
  $('demo-warning').hidden = opts.publicKey.replace(/^0x/i, '').toLowerCase() !== DEMO_KEY;
  $('preview-network').textContent = `TON / ${opts.testOnly ? 'TESTNET' : 'MAINNET'}`;
  if (/^[A-Za-z0-9_-]{1,8}$/.test(opts.pattern)) {
    const p = patternProbability(opts.pattern, opts.caseSensitive);
    const chance = -Math.expm1(SPACE * Math.log1p(-p)) * 100;
    const percentage = chance >= 99.95 ? '> 99,9' : chance < .1 ? '< 0,1' : chance.toLocaleString('ru-RU', { maximumFractionDigits: 1 });
    $('estimate').textContent = `В среднем ${format(1 / p)} проверок · шанс за 2³²: ${percentage}%. Совпадение не гарантировано.`;
  } else $('estimate').textContent = 'От 1 до 8 символов: A–Z, a–z, 0–9, дефис и подчёркивание.';
  preview();
}

function stop(label = 'Остановлено', status = '') {
  if (running) elapsedMs = performance.now() - startedAt;
  running = false;
  runId++;
  for (const worker of workers) worker.terminate();
  workers = [];
  clearInterval(timer);
  $('settings-fields').disabled = false;
  $('start-button').classList.remove('running');
  $('start-label').textContent = result ? 'Искать ещё' : 'Начать поиск';
  $('start-icon').textContent = '↗';
  setStatus(label, status);
  metrics();
  $('scan-caption').textContent = label === 'Найдено' ? 'Подбор завершён · адрес проверен повторно' : label;
}

function finish(message) {
  // Recompute independently of the worker before showing/exporting a winner.
  const candidate = makeResult(options, message.walletId);
  if (candidate.address !== message.address || !matches(candidate.address, options.pattern, options.position, options.caseSensitive)) {
    stop('Ошибка проверки');
    showError('Найденный адрес не прошёл повторную проверку.');
    return;
  }
  result = candidate;
  stop('Найдено', 'found');
  renderAddress(result.address, true);
  $('preview-label').textContent = 'СОВПАДЕНИЕ НАЙДЕНО';
  $('empty-result').hidden = true;
  $('found-result').hidden = false;
  $('result-address').textContent = result.address;
  $('result-id').textContent = result.walletId;
  $('result-demo').hidden = !result.demo;
  $('result-title').textContent = result.demo ? 'Демо-результат' : 'Твой новый адрес';
}

$('search-form').addEventListener('submit', event => {
  event.preventDefault();
  if (running) { stop(); return; }
  options = readOptions();
  $('form-error').hidden = true;
  try { validateOptions(options); } catch (error) { showError(error.message); return; }
  result = null;
  $('empty-result').hidden = false;
  $('found-result').hidden = true;
  $('result-title').textContent = 'Результат';
  const count = Number($('threads').value);
  counts = Array(count).fill(0);
  exhausted = new Set();
  startedAt = performance.now();
  elapsedMs = 0;
  running = true;
  const token = ++runId;
  const start = crypto.getRandomValues(new Uint32Array(1))[0];
  $('settings-fields').disabled = true;
  $('start-button').classList.add('running');
  $('start-label').textContent = 'Остановить поиск';
  $('start-icon').textContent = '□';
  $('engine-info').textContent = `WEB WORKERS · ${count} ${count === 1 ? 'ПОТОК' : count < 5 ? 'ПОТОКА' : 'ПОТОКОВ'}`;
  $('preview-label').textContent = 'ПРОВЕРЯЕМ АДРЕСА';
  setStatus('Идёт поиск', 'searching');
  metrics();
  timer = setInterval(metrics, 200);
  try {
    workers = [];
    for (let lane = 0; lane < count; lane++) {
      const worker = new Worker('/worker.js', { type: 'module', name: `walletid-${lane}` });
      workers.push(worker);
      worker.onmessage = ({ data }) => {
        if (token !== runId || !running) return;
        if (data.type === 'error') { stop('Ошибка'); showError(data.message); return; }
        counts[lane] = data.attempts;
        if (data.type === 'found') { finish(data); return; }
        if (data.type === 'progress') renderAddress(data.address);
        if (data.type === 'exhausted') {
          exhausted.add(lane);
          if (exhausted.size === count) {
            stop('Весь диапазон проверен');
            showError('В этих 2³² walletID совпадений нет. Измени шаблон или публичный ключ.');
          }
        }
        metrics();
      };
      worker.onerror = () => {
        if (token === runId && running) { stop('Ошибка'); showError('Не удалось запустить вычисления. Перезагрузи локальную страницу.'); }
      };
      worker.postMessage({ options, start, lane, workers: count });
    }
  } catch (error) { stop('Ошибка'); showError(error.message); }
});

$('demo-button').addEventListener('click', () => {
  $('public-key').value = DEMO_KEY;
  updateForm();
});
document.querySelectorAll('[data-position]').forEach(button => button.addEventListener('click', () => {
  position = button.dataset.position;
  document.querySelectorAll('[data-position]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateForm();
}));
document.querySelectorAll('[data-pattern]').forEach(button => button.addEventListener('click', () => {
  $('pattern').value = button.dataset.pattern;
  updateForm();
}));
['public-key', 'pattern', 'case-sensitive', 'address-format', 'network', 'threads'].forEach(id => $(id).addEventListener('input', updateForm));

function toast(message) {
  $('toast').textContent = message;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 2800);
}

async function copy(value) {
  try { await navigator.clipboard.writeText(value); toast('Скопировано'); }
  catch { toast('Не удалось скопировать. Выдели текст вручную.'); }
}
$('copy-address').addEventListener('click', () => { if (result) copy(result.address); });
$('copy-id').addEventListener('click', () => { if (result) copy(String(result.walletId)); });
$('export-result').addEventListener('click', () => {
  if (!result) return;
  const payload = { ...result, notice: 'No private key or seed included. Use only with a wallet that supports this custom walletID and V4R2. A normal seed import may show another address.' };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2) + '\n'], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${result.demo ? 'DEMO-' : ''}ton-v4r2-walletid-${result.walletId}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  toast('JSON с публичными параметрами сохранён');
});

const howContent = `<p>У TON-кошелька V4R2 адрес зависит от кода контракта, публичного ключа и 32-битного walletID. При смене walletID получается отдельный адрес с тем же ключом подписи.</p><ol><li>Возьми <strong>публичный ключ</strong> своего кошелька: 32 байта, то есть 64 HEX-символа. Это не адрес UQ/EQ. Его можно получить из данных активного кошелька или методом <code>get_public_key</code>. Не вводи сид-фразу на сайтах для получения ключа.</li><li>Выбери шаблон и запусти перебор. Каждый вариант требует хеширования данных и StateInit, без PBKDF2 и генерации Ed25519-ключей.</li><li>Сохрани результат: публичный ключ, walletID, сеть и V4R2. Деньги каждого адреса учитываются отдельно.</li></ol><h3>Важное про восстановление</h3><p>Нестандартный walletID должен поддерживаться приложением, в котором ты будешь подписывать транзакции. Обычный импорт сид-фразы может показать другой адрес. Генератор не разворачивает контракт и не подписывает переводы. До пополнения проверь возможность использования выбранного walletID в своём кошельке.</p><h3>Скорость и вероятность</h3><p>Пространство поиска ограничено 2³² вариантами. Совпадение может не существовать для выбранного ключа. Оценки вероятности предполагают равномерное распределение хешей; время — среднее, а не обещанный срок. Каждый поток проверяет отдельную часть диапазона. Начало шаблона считается после первых четырёх символов, окончание — с учётом CRC16. Смена формата UQ/EQ или флага testnet меняет контрольную сумму и отображение адреса, но не его raw-значение.</p><p>Демо использует известный тестовый ключ RFC 8032. Его приватный ключ общедоступен. Адреса демо нельзя пополнять.</p>`;
const auditContent = `<p><strong>Локальный генератор:</strong> собственный код, без скриптов TonSuite. Вводится только публичный ключ. Сид-фразы и приватные ключи не создаются и не запрашиваются.</p><ul><li>Все скрипты и стили находятся на твоём компьютере; внешних шрифтов, CDN и аналитики нет.</li><li>Заголовок CSP содержит <code>connect-src 'none'</code>: сетевые API страницы и вычислительных потоков заблокированы.</li><li>Сервер слушает только <code>127.0.0.1</code>, отдаёт только пять файлов и не принимает POST.</li><li>Ввод и результаты остаются в памяти вкладки. Нет localStorage, cookies, IndexedDB и service worker. Экспорт JSON — только по кнопке.</li><li>Адреса проверены против закреплённой версии официального TON SDK. Код V4R2 сверяется с опубликованным хешем.</li></ul><h3>Что проверено у TonSuite</h3><p>Проверена локальная копия HTML и подключённых JavaScript-модулей от 23.10.2026: основной код, worker, TON, Ed25519, libsodium и WebGPU. В просмотренных путях генерации явной отправки сид-фраз не обнаружено. Есть сетевой код библиотек общего назначения и загрузка статических ресурсов; это само по себе не доказывает утечку.</p><p>Это ограниченная проверка загруженной версии: бинарная часть libsodium не проходила независимый аудит, корректность всей криптографии и будущие изменения сервера не гарантируются. CSP TonSuite разрешает соединения со своим доменом. Подробности и SHA-256 файлов сохранены в <code>audit/REPORT.md</code> рядом с исходниками.</p><p>Даже без сетевых запросов код, который создаёт секретные ключи, может быть небезопасным. Поэтому наша версия работает только с публичными данными.</p>`;

function openInfo(title, html) {
  $('dialog-title').textContent = title;
  $('dialog-content').innerHTML = html; // Static local text only; never user input.
  $('info-dialog').showModal();
}
$('how-button').addEventListener('click', () => openInfo('Как устроен подбор по walletID', howContent));
$('audit-button').addEventListener('click', () => openInfo('Проверка безопасности', auditContent));
$('close-dialog').addEventListener('click', () => $('info-dialog').close());
$('info-dialog').addEventListener('click', event => { if (event.target === $('info-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
window.addEventListener('pagehide', () => { workers.forEach(w => w.terminate()); });
updateForm();
