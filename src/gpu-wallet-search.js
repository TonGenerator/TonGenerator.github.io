import { createGpuBip39 } from './gpu-bip39.js';
import { mnemonicValidate } from '@ton/crypto';
import { newTelegramMnemonic, telegramMnemonicToKeyPair, validateTelegramMnemonic } from './tg-mnemonic.js';
import { publicKeyFromSeed } from './public-key.js';
import { createStandardKeyHasher, createMatcher, friendlyAddress, makeResult, defaultWalletId, validateSearchOptions } from './engine.js';

function validateGpuOptions(options) {
  validateSearchOptions(options);
  if (options.strategy !== 'standard' || (options.contract !== 'wallet-tg' && options.mnemonicScheme !== 'bip39-12-slip10-ed25519')) throw new Error('GPU requires standard ID and BIP39-12');
}

// CPU checker ports are transferred directly between workers. The page only
// owns their lifecycle and receives public progress; it never receives seeds.
export function connectSeedChecker(port, options, control=()=>({paused:false,duty:1})) {
  validateGpuOptions(options);
  const match = createMatcher(options), walletId = defaultWalletId(options.contract,options.testOnly), hash=createStandardKeyHasher(options.contract,options.testOnly);
  port.onmessage = async ({ data }) => {
    const seeds = new Uint8Array(data.seeds);
    let reply;
    try {
      if (!Number.isInteger(data.count) || data.count < 1 || data.count > 8192 || !Number.isInteger(data.offset) || data.offset<0 || seeds.length !== data.count * 32) throw new Error('Invalid seed batch');
      let address = '', found;
      let attempts = 0;
      let sliceStart=performance.now();
      for (let i = 0; i < data.count; i++) {
        if(options.desktopManaged&&(i&127)===0){
          const current=control(),spent=performance.now()-sliceStart;
          await new Promise(resolve=>setTimeout(resolve,Math.max(1,spent/current.duty-spent)));
          while(control().paused)await new Promise(resolve=>setTimeout(resolve,100));
          sliceStart=performance.now();
        }
        const publicKey = await publicKeyFromSeed(seeds.subarray(i * 32, i * 32 + 32));
        try {
          const digest = hash(publicKey);
          attempts++;
          if (match(digest)) {
            found = { index: data.offset + i, result: makeResult({ ...options, publicKey: publicKey.toString('hex') }, walletId) };
            break;
          }
          if (i === data.count - 1) address = friendlyAddress(digest, options);
        } finally { publicKey.fill(0); }
      }
      reply = { id: data.id, attempts, address, found };
    } catch { reply = { id: data.id, error: true }; }
    finally { seeds.fill(0); }
    port.postMessage(reply);
  };
  port.start();
}

export async function searchGpuWallet(options, ports, report, control) {
  validateGpuOptions(options);
  if (!ports.length || ports.length>32) throw new Error('Invalid GPU checker count');
  const shouldStop = control.shouldStop;
  let gpu, nextJob;
  let attempts = 0, keys = 0, round = 0;
  const request = (port, payload, transfer) => new Promise((resolve, reject) => {
    let activeWait=0,last=performance.now();
    const timeout = setInterval(()=>{const now=performance.now();if(!control.shouldPause())activeWait+=now-last;last=now;if(shouldStop()||activeWait>60000){clearInterval(timeout);reject(new Error('CPU checker timeout or cancelled'));}},1000);
    port.onmessage = ({ data }) => {
      if (data.id !== payload.id) return;
      clearInterval(timeout);
      if (data.error) reject(new Error('CPU checker failed')); else resolve(data);
    };
    port.postMessage(payload, transfer);
  });
  const wipeBatch=batch=>{batch?.phrases?.forEach(words=>words.fill(''));batch?.seeds?.forEach(seed=>seed.fill(0));};
  // One prepared batch ahead overlaps GPU work with the previous CPU check.
  // Capture rejection immediately; all staged secrets are wiped on every exit.
  const prepare=()=>{
    const batch={phrases:[],seeds:[]};
    return (async()=>{
      try{
        if(shouldStop())return batch;
        for(let i=0;i<gpu.info.batchSize;i++)batch.phrases.push(newTelegramMnemonic());
        keys+=batch.phrases.length;
        batch.seeds=await gpu.derive(batch.phrases);
        return batch;
      }catch(error){wipeBatch(batch);return {error};}
    })();
  };
  try {
    // Desktop/game pause also defers driver initialization and compilation.
    while(control.shouldPause()&&!shouldStop())await new Promise(resolve=>setTimeout(resolve,100));
    if(shouldStop())return null;
    gpu = await createGpuBip39({ batchSize: 512, maxBatchSize:8192, loopIterations:32, dutyCycle:control.getDuty(), shouldStop, shouldPause:control.shouldPause, shouldIgnoreBudget:control.shouldIgnoreBudget,
      onLimit:ms=>report({type:'gpu-limit',ms,attempts,keys}),onProgress: stage => report({ type: 'gpu-stage', stage, attempts, keys }) });
    control.attach(gpu); gpu.setDuty(control.getDuty());
    if (shouldStop()) return null;
    report({ type: 'gpu-ready', attempts, keys, adapter:gpu.info.adapter });
    nextJob=prepare();
    for (;;) {
      const batch=await nextJob;nextJob=null;
      if(batch.error)throw batch.error;
      const {phrases,seeds}=batch;
      try {
        if (shouldStop()) return null;
        {
          const reference = await telegramMnemonicToKeyPair(phrases[0]);
          const accelerated = await publicKeyFromSeed(seeds[0]);
          try {
            if (!reference.publicKey.every((byte, i) => byte === accelerated[i])) throw new Error('GPU sample check failed');
          } finally { reference.secretKey.fill(0); reference.publicKey.fill(0); accelerated.fill(0); }
        }
        const pending = [];
        const size = Math.ceil(seeds.length / ports.length);
        for (let lane = 0; lane < ports.length; lane++) {
          const offset = lane * size, count = Math.min(size, seeds.length - offset);
          if (count <= 0) break;
          const packed = new Uint8Array(count * 32);
          for (let i = 0; i < count; i++) { packed.set(seeds[offset + i], i * 32); seeds[offset + i].fill(0); }
          pending.push(request(ports[lane], { id: round * ports.length + lane, offset, count, seeds: packed.buffer }, [packed.buffer]));
        }
        nextJob=prepare();
        const batches = await Promise.all(pending);
        if (shouldStop()) return null;
        attempts += batches.reduce((total, data) => total + data.attempts, 0);
        const found = batches.find(data => data.found)?.found;
        if (found) {
          const words = phrases[found.index];
          if (!validateTelegramMnemonic(words)) throw new Error('Invalid generated BIP39 phrase');
          if (options.contract !== 'wallet-tg' && await mnemonicValidate(words)) continue;
          const reference = await telegramMnemonicToKeyPair(words);
          try {
            const verified = makeResult({ ...options, publicKey: reference.publicKey.toString('hex') }, defaultWalletId(options.contract,options.testOnly));
            if (verified.address !== found.result.address) throw new Error('GPU result verification failed');
            return { words: [...words], result: verified, attempts, keys };
          } finally { reference.secretKey.fill(0); reference.publicKey.fill(0); }
        }
        report({ type: 'progress', attempts, keys, address: batches.find(data => data.address)?.address || '', gpuBatchSize:gpu.info.batchSize, gpuPacketMs:gpu.info.maxPacketMs, gpuMeanPacketMs:gpu.info.meanPacketMs, gpuIterations:gpu.info.loopIterations });
        round++;
      } finally { wipeBatch(batch); }
    }
  } finally { control.attach(null);gpu?.cancel();ports.forEach(port => port.close());await gpu?.destroy();if(nextJob)wipeBatch(await nextJob); }
}
