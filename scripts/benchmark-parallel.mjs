import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { newTelegramMnemonic, telegramMnemonicToPublicKey } from '../src/tg-mnemonic.js';
import { createSearchHasher, defaultWalletId, createMatcher } from '../src/engine.js';

if (!isMainThread) {
  const matcher = createMatcher({contract:'v4r2',strategy:'standard',pattern:'_FURRY',position:'suffix',caseSensitive:true,bounceable:false,testOnly:false});
  const check = async () => {
    const words = newTelegramMnemonic(); let key;
    try {
      key = await telegramMnemonicToPublicKey(words, workerData.backend);
      matcher(createSearchHasher(key, 'v4r2')(defaultWalletId('v4r2')));
    } finally { words.fill(''); key?.fill(0); }
  };
  for (let i=0;i<4;i++) await check();
  parentPort.postMessage({type:'ready'});
  parentPort.once('message', async () => {
    try {
      for (let i=0;i<128;i++) await check();
      parentPort.postMessage({type:'done',count:128});
    } catch { parentPort.postMessage({type:'error'}); }
    finally { parentPort.close(); }
  });
} else {
  const message = worker => new Promise((resolve,reject) => {worker.once('message',resolve);worker.once('error',reject);});
  for (const [backend, threads] of [['webcrypto',1], ['cpu',1], ['cpu',4], ['cpu',8]]) {
    const workers=Array.from({length:threads},()=>new Worker(new URL(import.meta.url),{workerData:{backend}}));
    try {
      const ready=await Promise.all(workers.map(message));
      if(ready.some(reply=>reply.type!=='ready')) throw new Error('Benchmark initialization failed');
      const replies=workers.map(message), started=performance.now();
      workers.forEach(worker=>worker.postMessage({type:'go'}));
      const done=await Promise.all(replies);
      if(done.some(reply=>reply.type!=='done')) throw new Error('Benchmark failed');
      console.log(JSON.stringify({backend,threads,addresses:threads*128,addressesPerSecond:Math.round(threads*128000/(performance.now()-started))}));
    } finally { await Promise.all(workers.map(worker=>worker.terminate())); }
  }
}
