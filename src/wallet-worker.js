import { mnemonicNew, mnemonicToPrivateKey, mnemonicValidate } from '@ton/crypto';
import { newTelegramMnemonic, telegramMnemonicToKeyPair, telegramMnemonicToPublicKey, validateTelegramMnemonic } from './tg-mnemonic.js';
import { tonMnemonicToPublicKey } from './public-key.js';
import { checkPerformance } from './performance.js';
import { connectSeedChecker, searchGpuWallet } from './gpu-wallet-search.js';
import { createSearchHasher, createMatcher, friendlyAddress, makeResult, validateSearchOptions, defaultWalletId, customWalletId } from './engine.js';

// TON's browser primitives use window.crypto. In a worker the same trusted
// Web Crypto API is available on self; no DOM or network shim is installed.
globalThis.window ??= globalThis;
let heldWords = null;
let running = false;
let stopRequested = false;
let performanceOptions = null;
let gpuInstance = null, gpuPaused=false, gpuDuty=0.2;
let resourcePaused=false,cpuDuty=1;

function forget() {
  heldWords?.fill('');
  heldWords = null;
}

let gpuIgnoreBudget=false;
function gpuErrorMessage(error) {
  if(error.gpuDiagnostic)return 'Не удалось скомпилировать GPU-программу. Подробности доступны при наведении на ошибку.';
  const message=typeof error.message==='string'?error.message:'';
  if(message.includes('self-test'))return 'GPU выдал неверный результат контрольной проверки. Поиск остановлен; выбери CPU.';
  if(message.includes('responsiveness budget'))return 'GPU-порция заняла больше 100 мс. Поиск остановлен для плавности работы компьютера.';
  if(message.startsWith('GPU timeout:'))return 'GPU не ответил вовремя. Поиск остановлен; можно выбрать CPU.';
  if(message.includes('unavailable'))return 'Браузер не предоставил GPU-устройство. Открой Windows-программу или совместимый браузер через «Установить».';
  if(message.includes('cancelled or lost'))return 'Связь с GPU потеряна или поиск отменён.';
  return 'Не удалось завершить GPU-проверку. Поиск остановлен; можно выбрать CPU.';
}

self.onmessage = ({ data }) => {
  if(data.type==='resource-control'){resourcePaused=!!data.paused;if(Number.isFinite(data.duty)&&data.duty>=.01&&data.duty<=1)cpuDuty=data.duty;return;}
  if (data.type === 'stop') { stopRequested = true; gpuInstance?.cancel(); return; }
  if (data.type === 'gpu-pause') { gpuPaused=Boolean(data.paused); return; }
  if (data.type === 'gpu-ignore-limit') {gpuIgnoreBudget=true;return;}
  if (data.type === 'gpu-load') {
    if(Number.isFinite(data.duty)&&data.duty>=0.05&&data.duty<=1){gpuDuty=data.duty;gpuInstance?.setDuty(gpuDuty);}
    return;
  }
  if (data.type === 'gpu-throttle') {gpuDuty=Math.max(0.05,gpuDuty/2);gpuInstance?.setDuty(gpuDuty);self.postMessage({type:'gpu-throttled',duty:gpuDuty});return;}
  if (data.type === 'connect-seeds' && !running) {
    try { connectSeedChecker(data.port,data.options,()=>({paused:resourcePaused,duty:cpuDuty})); running=true; }
    catch {data.port?.close();self.postMessage({type:'error',message:'Некорректные настройки GPU.'});}
    return;
  }
  if (data.type === 'start-gpu' && !running) {
    if(!data.options || !['gpu','hybrid'].includes(data.options.computeEngine) || !Array.isArray(data.ports) || !data.ports.length) {self.postMessage({type:'error',message:'GPU включается только явно выбранным режимом.'});return;}
    running=true;gpuDuty=data.options.gpuDuty??0.2;gpuIgnoreBudget=false;
    searchGpuWallet(data.options,data.ports,message=>self.postMessage({...message,lane:0}),{
      shouldStop:()=>stopRequested,shouldPause:()=>gpuPaused,shouldIgnoreBudget:()=>gpuIgnoreBudget||data.options.performanceMode==='max',getDuty:()=>gpuDuty,attach:value=>{gpuInstance=value;},
    }).then(found=>{
      if(!found||stopRequested){found?.words.fill('');self.close();return;}
      heldWords=found.words;self.postMessage({type:'found',lane:0,attempts:found.attempts,keys:found.keys,result:found.result});
    }).catch(error=>{forget();self.postMessage({type:'error',message:gpuErrorMessage(error),...(typeof error.gpuDiagnostic==='string'?{diagnostic:error.gpuDiagnostic}:typeof error.gpuTimeoutStage==='string'?{diagnostic:`Таймаут: ${error.gpuTimeoutStage}`}:{})});});
    return;
  }
  if (data.type === 'performance' && !running) {
    running = true;
    checkPerformance(data.options).then(info => self.postMessage(info)).catch(() => self.postMessage({ type: 'error', message: 'Не удалось выполнить замер CPU.' }));
    return;
  }
  if (data.type === 'performance-prepare' && !running) {
    running = true;
    checkPerformance(data.options, 4).then(() => {
      performanceOptions = data.options;
      self.postMessage({ type: 'performance-ready' });
    }).catch(() => self.postMessage({type:'error', message:'Не удалось подготовить замер CPU.'}));
    return;
  }
  if (data.type === 'performance-start' && performanceOptions) {
    const prepared = performanceOptions; performanceOptions = null;
    checkPerformance(prepared).then(info => self.postMessage(info)).catch(() => self.postMessage({type:'error', message:'Не удалось выполнить замер CPU.'}));
    return;
  }
  if (data.type === 'reveal') {
    if (heldWords) self.postMessage({ type: 'revealed', words: [...heldWords] });
    return;
  }
  if (data.type === 'discard') { forget(); self.close(); return; }
  if (data.type !== 'start' || running) return;
  running = true;
  search(data.options, data.lane).catch(() => {
    forget();
    // Never include an SDK exception or secret material in messages/logs.
    self.postMessage({ type: 'error', message: 'Не удалось создать кошелёк. Проверь доступность Web Crypto и попробуй ещё раз.' });
  });
};

async function search(options, lane) {
  validateSearchOptions(options);
  if (!globalThis.crypto?.getRandomValues || !globalThis.crypto?.subtle) throw new Error('Secure crypto unavailable');
  const matchesHash = createMatcher(options);
  const telegram = options.contract === 'wallet-tg';
  const bip39 = telegram || options.mnemonicScheme === 'bip39-12-slip10-ed25519';
  const derive = bip39 ? telegramMnemonicToKeyPair : mnemonicToPrivateKey;
  const derivePublic = bip39 ? words => telegramMnemonicToPublicKey(words, options.deriveBackend === 'webcrypto' ? 'webcrypto' : 'cpu') : tonMnemonicToPublicKey;
  let attempts = 0;
  let keys = 0;
  let lastReport = 0;
  const batch = options.strategy === 'standard' ? 1 : 2 ** 20;
  const space = options.contract === 'v5r1' ? 2 ** 31 : 2 ** 32;
  let sliceStart=performance.now();
  for (;;) {
    if(options.desktopManaged){
      const spent=performance.now()-sliceStart;
      if(resourcePaused||spent>=25){
        if(!resourcePaused)await new Promise(resolve=>setTimeout(resolve,Math.max(1,spent/cpuDuty-spent)));
        while(resourcePaused&&!stopRequested)await new Promise(resolve=>setTimeout(resolve,100));
        if(stopRequested)return;sliceStart=performance.now();
      }
    }
    let words = null;
    let keyPair;
    let lastDigest;
    try {
      if (!keys) {
        self.postMessage({ type: 'preparing', lane, attempts, keys });
        lastReport = performance.now();
      }
      words = bip39 ? newTelegramMnemonic() : await mnemonicNew(24);
      keyPair = { publicKey: await derivePublic(words) };
      const publicKey = keyPair.publicKey.toString('hex');
      const hash = createSearchHasher(publicKey, options.contract);
      keys++;
      const start = crypto.getRandomValues(new Uint32Array(1))[0] % space;
      for (let i = 0; i < batch; i++) {
        const walletId = options.strategy === 'standard' ? defaultWalletId(options.contract, options.testOnly)
          : customWalletId(options.contract, (start + i) % space, options.testOnly);
        const digest = hash(walletId);
        lastDigest = digest;
        attempts++;
        if (matchesHash(digest)) {
          // Tonkeeper detects TON mnemonics before BIP39. Reject the rare
          // ambiguous winner so an automatic import cannot choose another key.
          if (bip39 && !telegram && await mnemonicValidate(words)) continue;
          // Canonical TON mnemonic validation and re-derivation before holding
          // a winner. Only public metadata is sent to the page at this point.
          if (!(bip39 ? validateTelegramMnemonic(words) : await mnemonicValidate(words))) throw new Error('Invalid generated mnemonic');
          const verification = await derive(words);
          let verified;
          try { verified = verification.publicKey.toString('hex') === publicKey; }
          finally { verification.secretKey.fill(0); verification.publicKey.fill(0); }
          if (!verified) throw new Error('Generated key mismatch');
          const result = makeResult({ ...options, publicKey }, walletId);
          if (result.address !== friendlyAddress(digest, options)) throw new Error('Address mismatch');
          heldWords = words;
          words = null;
          self.postMessage({ type: 'found', lane, attempts, keys, result });
          return;
        }
        if (attempts % 2048 === 0 && performance.now() - lastReport >= 350) {
          self.postMessage({ type: 'progress', lane, attempts, keys, address: friendlyAddress(digest, options) });
          lastReport = performance.now();
        }
      }
      if (performance.now() - lastReport >= 350) {
        self.postMessage({ type: 'progress', lane, attempts, keys, address: friendlyAddress(lastDigest, options) });
        lastReport = performance.now();
      }
    } finally {
      words?.fill('');
      keyPair?.secretKey?.fill(0);
      keyPair?.publicKey.fill(0);
    }
  }
}
