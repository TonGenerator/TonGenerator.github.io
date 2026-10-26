import { validateSearchOptions, makeResult, matches, patternProbability } from './engine.js';
import { restoreInfo, securityInfo } from './help.js';
import { createSearchPlan, desktopSearchThreadLimit } from './search-plan.js';
import {parsePatterns} from './patterns.js';
import {initDonation} from './donate.js';
import {requestGpuAdapter} from './gpu-adapter.js';
import {initI18n,getLocale} from './i18n.js';

const $ = id => document.getElementById(id);
const workerUrl=new URL('./wallet-worker.js',document.baseURI);initI18n();initDonation();
const number = n => Math.floor(n).toLocaleString(getLocale());
let contract = 'wallet-tg', position = 'suffix', options;
let running = false, token = 0, workers = [], counts = [], keyCounts = [];
let startedAt = 0, elapsedMs = 0, timer, result = null, winner = null, words = null;
let backedUp = false, pendingSecretAction = null, toastTimer;
let performanceWorkers = [];
let gpuAdapterAvailable=false,gpuChecked=false;
let gpuCoordinator=null, gpuCheckers=[], gpuManualPause=false, gpuWaitingLimit=false, lastUiTick=0;
let rateStartedAt=0, gpuLane=null;
let browserPaused=false,queuePatterns=[],queueIndex=0,queueTotal=0;const browserBackups=[];
let desktopControl=window.desktopEngine?{paused:true,cpuThreads:0,cpuDuty:0.05,gpuDuty:0.05}:null,desktopReveal=null;
const gpuIsPaused=()=>gpuManualPause||(window.desktopEngine?desktopControl?.paused:browserPaused||document.hidden);
function applyDesktopControl(value){
  desktopControl=value;
  const searchLimit=desktopSearchThreadLimit(value.cpuThreads,gpuCheckers.length);
  for(const worker of workers){if(worker===gpuCoordinator)continue;worker.postMessage({type:'resource-control',paused:value.paused||(!worker.isChecker&&worker.searchLane>=searchLimit),duty:value.cpuDuty});}
  gpuCoordinator?.postMessage({type:'gpu-load',duty:value.gpuDuty});gpuCoordinator?.postMessage({type:'gpu-pause',paused:gpuIsPaused()});
}
function stopPerformance() {
  performanceWorkers.forEach(worker => worker.terminate()); performanceWorkers = [];
  $('check-performance').disabled = false;
}
const maxThreads = Math.max(1, Math.min(256, navigator.hardwareConcurrency || 4));
$('threads').max = maxThreads;
$('threads').value = Math.max(1, Math.ceil(maxThreads / 2));

function settings() {
  const telegram = contract === 'wallet-tg';
  let patterns=[];try{patterns=queuePatterns.length?queuePatterns:parsePatterns($('pattern').value,$('case-sensitive').checked);}catch{}
  return { contract, position, pattern:patterns[0]||'',patterns,performanceMode:$('performance-mode').value, caseSensitive: $('case-sensitive').checked,
    bounceable: !telegram && $('address-format').value === 'eq', testOnly: !telegram && $('network').value === 'testnet',
    strategy: 'standard', importTarget: telegram ? 'telegram' : 'tonkeeper',
    mnemonicScheme: telegram ? 'bip39-12-slip10-ed25519' : $('mnemonic-scheme').value,
    computeEngine:$('compute-engine').value,gpuDuty:Number($('gpu-load').value)/100,desktopManaged:true };
}
const contractLabel = value => value === 'wallet-tg' ? 'WalletTg' : value.toUpperCase();
const methodLabel = value => value.contract === 'wallet-tg' ? 'TELEGRAM · 12 СЛОВ · СТАНДАРТНЫЙ ID'
  : value.strategy === 'standard' ? 'НОВЫЕ СИД-ФРАЗЫ · СТАНДАРТНЫЙ ID' : 'НОВЫЙ КЛЮЧ + WALLETID';
function recoveryLabels(value) {
  const telegram = value.contract === 'wallet-tg';
  const count = telegram || value.mnemonicScheme === 'bip39-12-slip10-ed25519' ? 12 : 24;
  $('seed-format-label').textContent = count === 12 ? `12 слов · BIP39 · ${telegram ? 'WalletTg' : 'Tonkeeper'}` : '24 слова · TON Mnemonic';
  $('copy-seed').textContent = `Скопировать ${count} слов`;
  if (!result) {
    $('result-tag').textContent = `${count} СЛОВ`;
    $('empty-result-copy').textContent = `Здесь появятся новый адрес ${telegram ? 'WalletTg' : 'для Tonkeeper'} и ${count} слов для восстановления.`;
  }
}
function status(text, kind = '') {
  $('status').className = `status ${kind}`; $('status').lastElementChild.textContent = text;
  document.querySelector('.address-card').classList.toggle('searching', kind === 'searching');
}
function error(text) { $('form-error').textContent = text; $('form-error').hidden = false; }
function toast(text) {
  $('toast').textContent = text; $('toast').hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3000);
}
function time(ms) {
  const s = Math.floor(ms / 1000), h = Math.floor(s / 3600);
  return (h ? `${String(h).padStart(2, '0')}:` : '') + `${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function eta(s) {
  if (s < 1) return '< 1 сек';
  if (s < 60) return `~${Math.ceil(s)} сек`;
  if (s < 3600) return `~${Math.ceil(s / 60)} мин`;
  if (s < 86400) return `~${(s / 3600).toLocaleString(getLocale(), { maximumFractionDigits: 1 })} ч`;
  return `~${(s / 86400).toLocaleString(getLocale(), { maximumFractionDigits: 1 })} дн`;
}
function metrics() {
  const attempts = counts.reduce((a, b) => a + b, 0), keys = keyCounts.reduce((a, b) => a + b, 0);
  if (running) elapsedMs = performance.now() - startedAt;
  const rateTime=startedAt ? (running?performance.now():startedAt+elapsedMs)-rateStartedAt : 0;
  const rate = attempts && rateTime>0 ? attempts / rateTime * 1000 : 0;
  $('attempts').textContent = number(attempts); $('keys-count').textContent = number(keys); $('elapsed').textContent = time(elapsedMs);
  const unit = document.createElement('small'); unit.textContent = ' / сек';
  $('speed').replaceChildren(document.createTextNode(browserPaused?'Пауза':rate ? number(rate) : '—'), unit);
  $('engine-progress').hidden = options?.computeEngine !== 'hybrid' || !startedAt;
  if (!$('engine-progress').hidden) {
    const gpuAttempts=counts[gpuLane]||0;
    $('engine-progress').textContent=`CPU: ${number(attempts-gpuAttempts)} · GPU: ${number(gpuAttempts)} проверок${gpuCoordinator ? gpuManualPause||gpuWaitingLimit ? ' · GPU на паузе' : '' : ' · GPU остановлен'}`;
  }
  if (running) {
    const p = patternProbability(options.patterns||options.pattern, options.caseSensitive,options.position);
    $('scan-caption').textContent = rate ? `В среднем: ${eta(1 / p / rate)}` : 'Генерируем защищённые ключи…';
    const chance = -Math.expm1(attempts * Math.log1p(-p)) * 100;
    $('probability-caption').textContent = attempts ? `Оценка по объёму: ${chance.toLocaleString(getLocale(), { maximumFractionDigits: 1 })}%` : 'Поиск до совпадения';
    $('long-search').hidden=!rate||1/p/rate<=86400;
  }
  if(!running||browserPaused)$('long-search').hidden=true;
  if(browserPaused)$('scan-caption').textContent='Поиск на паузе';
  $('pause-search').disabled=!running;$('pause-search').textContent=browserPaused?'▶ Продолжить поиск':'⏸ Пауза поиска';
}
function renderAddress(address, highlight = false) {
  const target = $('address-preview'); target.replaceChildren();
  if (!highlight) { target.textContent = address; return; }
  const pattern=result?.pattern||options.pattern,start = options.position === 'prefix' ? 4 : 48 - pattern.length;
  const mark = document.createElement('mark'); mark.textContent = address.slice(start, start + pattern.length);
  target.append(document.createTextNode(address.slice(0, start)), mark, document.createTextNode(address.slice(start + pattern.length)));
}
function update() {
  const telegram = contract === 'wallet-tg';
  $('mnemonic-settings').hidden = telegram;
  if (telegram) { $('network').value = 'mainnet'; $('address-format').value = 'uq'; }
  $('network').disabled = telegram; $('address-format').disabled = telegram;
  const s = settings(); $('thread-count').value = $('threads').value;
  const gpuAllowed=gpuAdapterAvailable&&(telegram||s.mnemonicScheme==='bip39-12-slip10-ed25519');
  $('compute-engine').querySelector('option[value="gpu"]').disabled=!gpuAllowed;
  $('compute-engine').querySelector('option[value="hybrid"]').disabled=!gpuAllowed||maxThreads<2;
  if(gpuChecked&&!gpuAllowed){$('compute-engine').value='cpu';$('performance-mode').value='adaptive';$('max-note').hidden=true;}
  const engine=$('compute-engine').value;
  if(!running)$('start-button').disabled=!gpuChecked&&engine!=='cpu';
  const chosen=$('performance-mode').value==='max'?'max':engine;
  for(const button of document.querySelectorAll('[data-engine-value]')){button.disabled=button.dataset.engineValue==='max'?(!gpuAllowed||maxThreads<2):!!$('compute-engine').querySelector(`option[value="${button.dataset.engineValue}"]`).disabled;button.setAttribute('aria-checked',String(button.dataset.engineValue===chosen));button.tabIndex=button.dataset.engineValue===chosen?0:-1;}
  for(const button of document.querySelectorAll('[data-load-value]')){const checked=button.dataset.loadValue===$('performance-mode').value;button.setAttribute('aria-checked',String(checked));button.tabIndex=checked?0:-1;}
  $('gpu-pacing-note').textContent=$('performance-mode').value==='max'?'MAX: 100% активности без искусственных пауз. Загрузка видеокарты зависит от скорости CPU-проверки. В скрытой вкладке GPU приостанавливается.':'5–90% — доля работы с паузами. Показатель в диспетчере задач может отличаться. В фоне GPU на паузе.';
  $('threads').min=engine==='hybrid'?2:1;
  if(engine==='hybrid'&&Number($('threads').value)<2)$('threads').value=2;
  $('thread-count').value=$('threads').value;
  document.querySelector('label[for="threads"]').textContent=engine==='gpu'?'Потоки проверки CPU':'Потоки CPU';
  $('gpu-controls').hidden=engine==='cpu';
  $('gpu-availability').textContent=!gpuChecked?'Проверяем доступ к видеокарте…':!gpuAdapterAvailable?'Этот браузер не предоставил WebGPU-адаптер. Используй Windows-программу или другой браузер с поддержкой WebGPU. CPU доступен.':!gpuAllowed?'GPU доступен для 12 слов BIP39.':chosen==='max'?'CPU и GPU работают без программного ограничения нагрузки.':engine==='hybrid'?'CPU и GPU ищут параллельно.':engine==='gpu'?'Поиск на видеокарте с проверкой результата на CPU.':'Поиск на процессоре.';
  $('pattern-length').textContent = `${s.pattern.length} / 8 на шаблон`; $('pattern-marker').textContent = position === 'suffix' ? '…' : '↳';
  $('compatibility-title').textContent = telegram ? 'Telegram · WalletTg · 12 слов' : `Tonkeeper · ${contractLabel(contract)}`;
  $('compatibility-text').textContent = telegram
    ? 'Новый кошелёк для встроенного Telegram Wallet.'
    : 'При восстановлении выбери ту же версию кошелька.';
  $('strategy-note').textContent = telegram
    ? '12 слов · Mainnet · UQ'
    : '';
  $('strategy-note').hidden=!telegram;
  $('estimate-text').textContent = /^[A-Za-z0-9_-]{1,8}$/.test(s.pattern)
    ? `В среднем ${number(1 / patternProbability(s.patterns||s.pattern, s.caseSensitive,s.position))} проверок до одного из совпадений. Все шаблоны проверяются вместе.`
    : 'Выбери от 1 до 8 допустимых символов для поиска.';
  if (running || result) return;
  recoveryLabels(s);
  $('preview-contract').textContent = `${contractLabel(contract)} · ${s.testOnly ? 'Testnet' : 'Mainnet'}`;
  $('preview-method').textContent = methodLabel(s);
  const prefix = s.testOnly ? (s.bounceable ? 'kQ' : '0Q') : (s.bounceable ? 'EQ' : 'UQ');
  const dots = document.createElement('span'); dots.textContent = '········································';
  const mark = document.createElement('mark'); mark.textContent = s.pattern || '…';
  $('address-preview').replaceChildren(document.createTextNode(prefix));
  if (position === 'prefix') $('address-preview').append('··', mark, dots); else $('address-preview').append(dots, mark);
}
function stop(label = 'Остановлено', kind = '') {
  if (running) elapsedMs = performance.now() - startedAt;
  running = false; token++; workers.forEach(worker => {
    if(worker===gpuCoordinator){worker.postMessage({type:'stop'});setTimeout(()=>worker.terminate(),2000);}
    else worker.terminate();
  }); workers = []; gpuCoordinator=null; gpuCheckers=[]; clearInterval(timer); $('pause-gpu').hidden=true;$('ignore-gpu-limit').hidden=true;$('gpu-limit-note').hidden=true;
  $('settings-fields').disabled = false; $('start-label').textContent = result ? 'Создать ещё один кошелёк' : 'Создать красивый кошелёк';
  $('start-icon').textContent = '↗'; $('start-button').classList.remove('running'); status(label, kind); metrics(); $('scan-caption').textContent = label;
}
function forgetResult() {
  winner?.terminate(); winner = null; words?.fill(''); words = null; result = null; backedUp = false; pendingSecretAction = null;
  $('seed-words').replaceChildren(); $('seed-words').hidden = true; $('copy-seed').hidden = true; $('seed-hidden').hidden = false;
  $('reveal-seed').textContent = 'Показать слова'; $('empty-result').hidden = false; $('found-result').hidden = true;
}
function found(data, source) {
  const candidate = makeResult({ ...options, publicKey: data.result.publicKey }, data.result.walletId);
  if (candidate.address !== data.result.address || !matches(candidate.address, options.patterns||options.pattern, options.position, options.caseSensitive)) {
    stop('Ошибка проверки'); error('Найденный адрес не прошёл проверку. Запусти поиск заново.'); return;
  }
  workers = workers.filter(worker => worker !== source); result = candidate; winner = source; stop('Найдено', 'found');
  source.onmessage = ({ data: message }) => {
    if (winner !== source || !result || message.type !== 'revealed') return;
    if (!Array.isArray(message.words) || message.words.length !== result.mnemonicWordCount || message.words.some(word => !/^[a-z]+$/.test(word))) { error('Не удалось получить резервную фразу. Не закрывай вкладку.'); return; }
    words?.fill(''); words = message.words; const action = pendingSecretAction; pendingSecretAction = null;
    if (action) runSecretAction(action);
  };
  renderAddress(candidate.address, true); $('preview-title').textContent = 'ТВОЙ НОВЫЙ АДРЕС';
  recoveryLabels(candidate);
  $('scan-caption').textContent = 'Готово · адрес проверен повторно'; $('probability-caption').textContent = `${candidate.mnemonicWordCount} слов сохранены в памяти вкладки`;
  $('track-fill').style.width = '100%'; $('empty-result').hidden = true; $('found-result').hidden = false;
  $('result-address').textContent = candidate.address; $('result-version').textContent = contractLabel(candidate.contract);
  $('result-id').textContent = candidate.walletId; $('result-tag').textContent = `${contractLabel(candidate.contract)} · TON`;
  $('recovery-note').classList.toggle('standard', candidate.strategy === 'standard');
  $('recovery-note').textContent = candidate.contract === 'wallet-tg'
    ? 'WalletTg: сохрани все 12 слов и JSON. Это новый кошелёк со стандартным ID Telegram, без ротации ключа. Контракт ещё не развёрнут в сети. V4/V5 при импорте выбирать не нужно.'
    : candidate.strategy === 'standard'
    ? `Tonkeeper · ${candidate.contract.toUpperCase()}: сохрани ${candidate.mnemonicWordCount} слов${candidate.mnemonicWordCount === 12 ? ' BIP39' : ' TON'} и при импорте выбери эту версию кошелька. ID стандартный, вводить его не нужно. Контракт ещё не развёрнут в сети.`
    : `Нестандартный walletID: нужны 24 слова + ID ${candidate.walletId} + версия ${candidate.contract.toUpperCase()}. Обычный импорт слов может открыть другой адрес. До пополнения проверь поддержку ID в своём клиенте. JSON содержит все параметры.`;
  if (candidate.contract !== 'wallet-tg') $('recovery-note').textContent += ' Это не WalletTg: для встроенного кошелька Telegram выбери отдельный режим Telegram и новый поиск.';
  if(!window.desktopEngine&&queueTotal>1)askSecret('queue');
}
function start(continueQueue=false) {
  stopPerformance();
  if(!window.desktopEngine&&!continueQueue){try{queuePatterns=parsePatterns($('pattern').value,$('case-sensitive').checked);queueIndex=0;queueTotal=queuePatterns.length;}catch(e){error(e.message);return;}}
  if(!window.desktopEngine){browserPaused=false;desktopControl={paused:false,cpuThreads:Number($('threads').value),cpuDuty:1,gpuDuty:Number($('gpu-load').value)/100};}
  options = settings(); $('form-error').hidden = true;
  try { validateSearchOptions(options); } catch (e) { error(e.message); return; }
  const count = Number($('threads').value);
  let plan;
  try { plan=createSearchPlan(options.computeEngine,count,options.performanceMode); } catch { error('Не удалось выбрать режим и число потоков.'); return; }
  forgetResult();
  options.deriveBackend = plan.cpuCount === 1 ? 'webcrypto' : 'cpu';
  const gpuMode=plan.gpuLane!==null, hybrid=options.computeEngine==='hybrid';
  gpuLane=plan.gpuLane;
  counts = Array(plan.laneCount).fill(0); keyCounts = Array(plan.laneCount).fill(0);
  recoveryLabels(options);
  running = true; const thisRun = ++token; startedAt = performance.now(); elapsedMs = 0;
  $('queue-progress').textContent=!window.desktopEngine&&queueTotal>1?`Ищем одновременно: ${queuePatterns.join(' · ')}. Найдено ${queueIndex} / ${queueTotal}`:'';
  rateStartedAt=startedAt;
  $('settings-fields').disabled = true; $('start-label').textContent = 'Остановить поиск'; $('start-icon').textContent = '□'; $('start-button').classList.add('running');
  $('preview-title').textContent = 'СОЗДАЁМ ТВОЙ КОШЕЛЁК'; $('preview-contract').textContent = `${contractLabel(contract)} · ${options.testOnly ? 'Testnet' : 'Mainnet'}`;
  $('preview-method').textContent = methodLabel(options);
  const searchLabel=()=>gpuCoordinator ? gpuManualPause||gpuWaitingLimit ? hybrid?'CPU ищет · GPU на паузе':'GPU на паузе' : hybrid?'CPU + GPU · идёт поиск':'GPU · идёт поиск' : 'CPU · идёт поиск';
  $('track-fill').style.width = '0%'; status(gpuMode?hybrid?'CPU ищет · готовим GPU':'Готовим GPU':'Создаём сид-фразы', 'searching'); metrics();
  gpuManualPause=false;gpuWaitingLimit=false;$('ignore-gpu-limit').hidden=true;$('gpu-limit-note').hidden=true;$('gpu-load-value').title='';$('pause-gpu').hidden=!gpuMode;$('pause-gpu').textContent='Пауза GPU';lastUiTick=performance.now();
  timer = setInterval(()=>{
    const tick=performance.now();
    if(gpuCoordinator&&options.performanceMode!=='max'&&!document.hidden&&tick-lastUiTick>600)gpuCoordinator.postMessage({type:'gpu-throttle'});
    lastUiTick=tick;metrics();
  },250);
  try {
    workers = []; gpuCheckers=[];
    const gpuFailed = message => {
      if(!hybrid){stop('Ошибка GPU');error(message);return;}
      const failed=gpuCoordinator;
      failed?.postMessage({type:'stop'});
      if(failed)setTimeout(()=>failed.terminate(),2000);
      gpuCheckers.forEach(checker=>checker.terminate());
      workers=workers.filter(worker=>worker!==failed&&!gpuCheckers.includes(worker));
      gpuCoordinator=null;gpuCheckers=[];$('pause-gpu').hidden=true;$('ignore-gpu-limit').hidden=true;$('gpu-limit-note').hidden=true;
      status('CPU · идёт поиск','searching');error(`${message} Поиск продолжается на CPU.`);metrics();
    };
    const attach = (worker, lane, isGpu=false) => {
      worker.searchLane=lane;
      workers.push(worker);
      if(desktopControl&&!isGpu)worker.postMessage({type:'resource-control',paused:desktopControl.paused||lane>=desktopSearchThreadLimit(desktopControl.cpuThreads,plan.checkerCount),duty:desktopControl.cpuDuty});
      worker.onmessage = ({ data }) => {
        if (!running || thisRun !== token || !workers.includes(worker)) return;
        if(data.type==='gpu-stage'){status(hybrid?'CPU ищет · готовим GPU':data.stage==='selftest'?'Малый тест GPU':'Подготовка GPU','searching');return;}
        if(data.type==='gpu-limit'){gpuWaitingLimit=true;status(searchLabel(),'searching');error(`GPU-порция заняла ${Math.round(data.ms)} мс. GPU на паузе${hybrid?'; CPU продолжает поиск':''}.`);$('ignore-gpu-limit').hidden=false;$('gpu-limit-note').hidden=false;metrics();return;}
        if(data.type==='gpu-ready'){if(!hybrid)rateStartedAt=performance.now();status(searchLabel(),'searching');$('preview-method').textContent=hybrid?'CPU + GPU · НОВЫЕ СИД-ФРАЗЫ':'GPU · НОВЫЕ СИД-ФРАЗЫ';if(data.adapter)$('gpu-availability').textContent=`GPU: ${data.adapter}`;return;}
        if(data.type==='gpu-throttled'){$('gpu-load').value=Math.round(data.duty*100);$('gpu-load-value').textContent=`${Math.round(data.duty*100)}%`;toast('Активность GPU снижена для плавности.');return;}
        if (data.type === 'error') { if(isGpu)gpuFailed(data.message);else{stop('Ошибка');error(data.message);} $('form-error').title=data.diagnostic||'';return; }
        counts[lane] = data.attempts ?? counts[lane]; keyCounts[lane] = data.keys ?? keyCounts[lane];
        if (data.type === 'found') { found(data, worker); return; }
        if (data.type === 'progress') { status(searchLabel(), 'searching'); if (data.address) renderAddress(data.address); if(isGpu)$('gpu-load-value').title=`Следующая порция: ${data.gpuBatchSize} фраз · ${data.gpuIterations} итераций/команду · среднее ${Number(data.gpuMeanPacketMs).toFixed(1)} мс · максимум ${Math.round(data.gpuPacketMs)} мс`; }
        metrics();
      };
      worker.onerror = () => { if (running && thisRun === token && workers.includes(worker)) { if(isGpu)gpuFailed('Вычислительный поток GPU остановился.');else{stop('Ошибка');error('Вычислительный поток остановился. Попробуй меньше потоков CPU.');} } };
    };
    for (let lane = 0; lane < plan.cpuCount; lane++) {
      const worker = new Worker(workerUrl, { type: 'module', name: `new-wallet-${lane}` });
      attach(worker, lane);
      worker.postMessage({ type: 'start', lane, options });
    }
    if(gpuMode) {
      const ports=[];
      for(let lane=0;lane<plan.checkerCount;lane++) {
        const checker=new Worker(workerUrl,{type:'module',name:`gpu-checker-${lane}`});checker.isChecker=true;workers.push(checker);gpuCheckers.push(checker);
        if(desktopControl)checker.postMessage({type:'resource-control',paused:desktopControl.paused,duty:desktopControl.cpuDuty});
        checker.onmessage=({data})=>{if(data.type==='error'&&running&&thisRun===token&&gpuCheckers.includes(checker))gpuFailed(data.message);};
        checker.onerror=()=>{if(running&&thisRun===token&&gpuCheckers.includes(checker))gpuFailed('Поток проверки GPU остановился.');};
        const channel=new MessageChannel();ports.push(channel.port1);
        checker.postMessage({type:'connect-seeds',options,port:channel.port2},[channel.port2]);
      }
      gpuCoordinator=new Worker(workerUrl,{type:'module',name:'paced-gpu'});attach(gpuCoordinator,plan.gpuLane,true);
      gpuCoordinator.postMessage({type:'start-gpu',options,ports},ports);
      gpuCoordinator.postMessage({type:'gpu-pause',paused:gpuIsPaused()});
    }
    if(desktopControl)applyDesktopControl(desktopControl);
  } catch { stop('Ошибка'); error('Не удалось запустить вычисления в браузере.'); }
}
$('search-form').addEventListener('submit', event => {
  event.preventDefault(); if (running) { stop(); return; }
  if (result && !backedUp) {
    openDialog('Сначала сохрани кошелёк', '<p>У найденного кошелька есть уникальная секретная фраза. Начало нового поиска удалит несохранённый результат из памяти вкладки.</p>');
    const actions = document.createElement('div'); actions.className = 'dialog-actions';
    const keep = document.createElement('button'); keep.textContent = 'Вернуться и сохранить'; keep.onclick = () => $('info-dialog').close();
    const discard = document.createElement('button'); discard.className = 'danger'; discard.textContent = 'Удалить результат и начать заново'; discard.onclick = () => { $('info-dialog').close(); start(); };
    actions.append(keep, discard); $('dialog-content').append(actions); return;
  }
  start();
});
document.querySelectorAll('[data-contract]').forEach(button => button.addEventListener('click', () => {
  contract = button.dataset.contract; document.querySelectorAll('[data-contract]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); update();
}));
document.querySelectorAll('[data-position]').forEach(button => button.addEventListener('click', () => {
  position = button.dataset.position; document.querySelectorAll('[data-position]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); update();
}));
document.querySelectorAll('[data-pattern]').forEach(button => button.addEventListener('click', () => { $('pattern').value = button.dataset.pattern; update(); }));
['pattern', 'case-sensitive', 'address-format', 'network', 'threads', 'mnemonic-scheme','compute-engine'].forEach(id => $(id).addEventListener('input', update));
$('gpu-load').addEventListener('input',()=>{$('gpu-load-value').textContent=`${$('gpu-load').value}%`;gpuCoordinator?.postMessage({type:'gpu-load',duty:Number($('gpu-load').value)/100});});
$('ignore-gpu-limit').addEventListener('click',()=>{
  if(!running||!gpuCoordinator||!gpuWaitingLimit)return;
  gpuWaitingLimit=false;gpuCoordinator.postMessage({type:'gpu-ignore-limit'});$('ignore-gpu-limit').hidden=true;$('gpu-limit-note').hidden=true;$('form-error').hidden=true;
  status(gpuManualPause?options.computeEngine==='hybrid'?'CPU ищет · GPU на паузе':'GPU на паузе':options.computeEngine==='hybrid'?'CPU + GPU · идёт поиск':'GPU · идёт поиск','searching');
  toast('Лимит времени GPU снят до конца поиска.');metrics();
});
$('pause-gpu').addEventListener('click',()=>{gpuManualPause=!gpuManualPause;gpuCoordinator?.postMessage({type:'gpu-pause',paused:gpuIsPaused()});$('pause-gpu').textContent=gpuManualPause?'Продолжить GPU':'Пауза GPU';status(gpuManualPause||gpuWaitingLimit?options.computeEngine==='hybrid'?'CPU ищет · GPU на паузе':'GPU на паузе':options.computeEngine==='hybrid'?'CPU + GPU · идёт поиск':'GPU · идёт поиск','searching');metrics();});
document.addEventListener('visibilitychange',()=>{gpuCoordinator?.postMessage({type:'gpu-pause',paused:gpuIsPaused()});lastUiTick=performance.now();});
async function copy(text) { try { await navigator.clipboard.writeText(text); toast('Скопировано'); } catch { toast('Не удалось скопировать. Выдели текст вручную.'); } }
$('copy-address').addEventListener('click', () => { if (result) copy(result.address); });
function askSecret(action) {
  if (!winner || !result) return;
  if (words) { runSecretAction(action); return; }
  if (pendingSecretAction) return;
  pendingSecretAction = action; winner.postMessage({ type: 'reveal' });
}
function runSecretAction(action) {
  if (!words || !result) return;
  if(action==='queue'){
    browserBackups.push({result:{...result},mnemonic:[...words],downloaded:false});renderQueueResults();
    const matched=result.matchedPatterns?.length?result.matchedPatterns:[result.pattern];queuePatterns=queuePatterns.filter(pattern=>!matched.includes(pattern));queueIndex=queueTotal-queuePatterns.length;
    if(queuePatterns.length){start(true);return;}
    $('queue-progress').textContent=`Готово: ${queueTotal} / ${queueTotal}. Скачай результаты ниже.`;return;
  }
  if(action==='desktop'){desktopReveal?.([...words]);desktopReveal=null;words.fill('');words=null;return;}
  if (action === 'show') {
    $('seed-words').replaceChildren(...words.map((word, index) => {
      const li = document.createElement('li'), n = document.createElement('span'), value = document.createElement('strong');
      n.textContent = index + 1; value.textContent = word; li.append(n, value); return li;
    }));
    $('seed-hidden').hidden = true; $('seed-words').hidden = false; $('copy-seed').hidden = false; $('reveal-seed').textContent = 'Скрыть слова';
  } else if (action === 'copy') copy(words.join(' '));
  else if (action === 'save') {
    const backup = { ...result, mnemonic: [...words], secret: true,
      notice: `SECRET BACKUP: ${words.length} recovery words, scheme ${result.mnemonicScheme}. Keep offline and private. Restore the exact contract version, network and walletIdConfig. Never upload this file to a website.` };
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2) + '\n'], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `SECRET-TON-${result.contract.toUpperCase()}-${result.walletId}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000); backedUp = true; toast('Резервная копия подготовлена. Проверь, что файл сохранён.');
  }
}
$('reveal-seed').addEventListener('click', () => {
  if (!$('seed-words').hidden) { $('seed-words').replaceChildren(); $('seed-words').hidden = true; $('copy-seed').hidden = true; $('seed-hidden').hidden = false; $('reveal-seed').textContent = 'Показать слова'; }
  else askSecret('show');
});
$('copy-seed').addEventListener('click', () => askSecret('copy'));
$('save-wallet').addEventListener('click', () => askSecret('save'));
$('check-performance').addEventListener('click', () => {
  stopPerformance();
  const count = Number($('threads').value), measured = settings();
  measured.deriveBackend = count === 1 ? 'webcrypto' : 'cpu';
  let ready = 0, completed = 0, samples = 0, begin = 0;
  $('check-performance').disabled = true; $('performance-result').textContent = `Прогрев CPU · потоков: ${count}…`;
  for (let lane = 0; lane < count; lane++) {
    const worker = new Worker(workerUrl, {type:'module', name:`performance-${lane}`}); performanceWorkers.push(worker);
    worker.onmessage = ({data}) => {
      if (!performanceWorkers.includes(worker)) return;
      if (data.type === 'performance-ready') {
        if (++ready === count) {
          begin = performance.now(); $('performance-result').textContent = `Измеряем CPU · потоков: ${count}…`;
          performanceWorkers.forEach(item => item.postMessage({type:'performance-start'}));
        }
      } else if (data.type === 'performance') {
        samples += data.samples;
        if (++completed === count) {
          const rate = samples * 1000 / (performance.now() - begin);
          $('performance-result').textContent = `${data.label} · CPU, потоков: ${count}. Всего ${number(rate)} адресов/сек. GPU отключён.`;
          stopPerformance();
        }
      } else if (data.type === 'error') { $('performance-result').textContent = data.message; stopPerformance(); }
    };
    worker.onerror = () => { if (!performanceWorkers.includes(worker)) return; stopPerformance(); $('performance-result').textContent = 'Не удалось выполнить замер.'; };
    worker.postMessage({type:'performance-prepare',options:measured});
  }
});
function openDialog(title, html) { $('dialog-title').textContent = title; $('dialog-content').innerHTML = html; $('info-dialog').showModal(); }
function renderQueueResults(){
 $('queue-results').hidden=!browserBackups.length;
 $('queue-wallets').replaceChildren(...browserBackups.map(item=>{const row=document.createElement('div'),text=document.createElement('code'),button=document.createElement('button');text.textContent=`${item.result.pattern}: ${item.result.address}`;button.type='button';button.className='small-button';button.textContent=item.downloaded?'Скачать JSON ещё раз':'Сохранить JSON';button.onclick=()=>{const blob=new Blob([JSON.stringify({...item.result,mnemonic:item.mnemonic,secret:true},null,2)+'\n'],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`SECRET-TON-${item.result.contract}-${item.result.pattern}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);item.downloaded=true;renderQueueResults();};row.append(text,button);return row;}));
}
$('pause-search').onclick=()=>{if(!running)return;browserPaused=!browserPaused;applyDesktopControl({...desktopControl,paused:browserPaused});status(browserPaused?'Поиск на паузе':'Идёт поиск',browserPaused?'':'searching');metrics();};
$('performance-mode').onchange=()=>{const max=$('performance-mode').value==='max';$('max-note').hidden=!max;$('gpu-load').max=max?100:90;if(max){$('threads').value=$('threads').max;$('gpu-load').value=100;}else if(Number($('gpu-load').value)>90)$('gpu-load').value=90;$('gpu-load-value').textContent=$('gpu-load').value+'%';update();};
for(const button of document.querySelectorAll('[data-engine-value]'))button.onclick=()=>{const max=button.dataset.engineValue==='max';$('compute-engine').value=max?'hybrid':button.dataset.engineValue;$('performance-mode').value=max?'max':'adaptive';$('performance-mode').onchange();};
for(const button of document.querySelectorAll('[data-load-value]'))button.onclick=()=>{$('performance-mode').value=button.dataset.loadValue;$('performance-mode').onchange();};
for(const group of document.querySelectorAll('.engine-picker,.load-picker'))group.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const items=[...group.querySelectorAll('button')].filter(button=>!button.disabled);if(!items.length)return;const current=Math.max(0,items.indexOf(document.activeElement)),index=event.key==='Home'?0:event.key==='End'?items.length-1:(current+(event.key==='ArrowRight'?1:-1)+items.length)%items.length;event.preventDefault();items[index].click();items[index].focus();});
$('how-button').addEventListener('click', () => openDialog('Как пользоваться новым кошельком', restoreInfo));
$('audit-button').addEventListener('click', () => openDialog('Безопасность и твои ключи', securityInfo));
$('close-dialog').addEventListener('click', () => $('info-dialog').close());
window.addEventListener('beforeunload', event => { if ((result && !backedUp)||browserBackups.some(item=>!item.downloaded)) { event.preventDefault(); event.returnValue = ''; } });
window.addEventListener('pagehide', () => { workers.forEach(w => w.terminate()); performanceWorkers.forEach(w => w.terminate()); winner?.terminate(); words?.fill('');browserBackups.forEach(item=>item.mnemonic.fill('')); });
document.addEventListener('generator-language-change',()=>{update();metrics();});
update();
async function detectGpu(){
 try{gpuAdapterAvailable=!!await requestGpuAdapter();}catch{gpuAdapterAvailable=false;}finally{gpuChecked=true;update();}
 return gpuAdapterAvailable;
}
const gpuDetection=detectGpu();
if(window.desktopEngine){
  window.desktopEngine.onCommand(async(command,value)=>{
    if(command==='control'){applyDesktopControl(value);return true;}
    if(command==='stop'){stop();return true;}
    if(command==='ignore-limit'){$('ignore-gpu-limit').click();return true;}
    if(command==='start'){
      if(running)stop();
      contract=value.contract;position=value.position;
      document.querySelectorAll('[data-contract]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.contract===contract)));
      document.querySelectorAll('[data-position]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.position===position)));
      $('pattern').value=value.pattern;$('case-sensitive').checked=value.caseSensitive;$('address-format').value=value.bounceable?'eq':'uq';$('network').value=value.testOnly?'testnet':'mainnet';$('mnemonic-scheme').value=value.mnemonicScheme;$('compute-engine').value=value.computeEngine;$('threads').value=value.threads;$('gpu-load').value=value.gpuDuty*100;
      $('performance-mode').value=value.performanceMode||'adaptive';$('gpu-load').max=value.performanceMode==='max'?100:90;queuePatterns=value.patterns||[value.pattern];queueTotal=0;
      update();start();return true;
    }
    if(command==='reveal'){
      if(!winner||!result)throw Error('No result');
      const mnemonic=await new Promise(resolve=>{desktopReveal=resolve;askSecret('desktop');});
      return {...result,mnemonic,notice:'SECRET BACKUP. Keep private. Restore the exact contract version, network and mnemonic scheme.'};
    }
    throw Error('Unknown command');
  });
  setInterval(()=>{
    const attempts=counts.reduce((a,b)=>a+b,0),duration=startedAt?(running?performance.now():startedAt+elapsedMs)-rateStartedAt:0;
    window.desktopEngine.publish({running,attempts,keys:keyCounts.reduce((a,b)=>a+b,0),elapsedMs:running?performance.now()-startedAt:elapsedMs,rate:duration>0?attempts*1000/duration:0,address:$('address-preview').textContent,status:$('status').innerText,error:$('form-error').hidden?'':$('form-error').textContent,result,gpuLimit:gpuWaitingLimit});
  },500);
  gpuDetection.then(available=>window.desktopEngine.ready({webgpu:available}));
}
