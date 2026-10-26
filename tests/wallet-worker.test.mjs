import test from 'node:test';
import assert from 'node:assert/strict';
import { Worker, MessageChannel } from 'node:worker_threads';
import { randomBytes } from 'node:crypto';
import { mnemonicValidate, mnemonicToPrivateKey, keyPairFromSeed } from '@ton/crypto';
import { WalletContractV4, WalletContractV5R1, Cell, beginCell, contractAddress } from '@ton/ton';
import { defaultWalletId, matches, makeResult } from '../src/engine.js';
import { telegramMnemonicToKeyPair, validateTelegramMnemonic } from '../src/tg-mnemonic.js';

function until(worker, type, timeout = 120000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { cleanup(); reject(new Error(`Worker timeout waiting for ${type}`)); }, timeout);
    function cleanup() { clearTimeout(timer); worker.off('message', message); worker.off('error', failed); }
    function failed(e) { cleanup(); reject(e); }
    function message(data) {
      if (data.type === 'error') { cleanup(); reject(new Error(data.message)); }
      else if (data.type === type) { cleanup(); resolve(data); }
    }
    worker.on('message', message); worker.on('error', failed);
  });
}

test('browser bundle requires explicit GPU mode and valid checker ports before touching GPU', { timeout: 10000 }, async () => {
  const worker = new Worker(new URL('./browser-worker-bridge.mjs', import.meta.url));
  try {
    await until(worker, 'test-ready');
    const response = new Promise(resolve => worker.once('message', resolve));
    worker.postMessage({ type: 'start-gpu' });
    const reply = await response;
    assert.equal(reply.type, 'error');
    assert.match(reply.message, /GPU/);
    assert.ok(!('words' in reply) && !('seeds' in reply));
  } finally { await worker.terminate(); }
});
for (const contract of ['v4r2','v5r1','wallet-tg']) test(`GPU checker port: ${contract} returns exact public results and wipes its seed transfer`,{timeout:10000},async()=>{
  const worker=new Worker(new URL('./browser-worker-bridge.mjs',import.meta.url));
  const channel=new MessageChannel();
  const seeds=randomBytes(32*8192), keys=[];
  const options={contract,strategy:'standard',mnemonicScheme:'bip39-12-slip10-ed25519',computeEngine:'hybrid',importTarget:contract==='wallet-tg'?'telegram':'tonkeeper',pattern:'a',position:'suffix',caseSensitive:false,bounceable:false,testOnly:false};
  let expected;
  try {
    for(let i=0;i<4;i++) {
      const key=keyPairFromSeed(seeds.subarray(i*32,(i+1)*32));keys.push(key);
      const candidate=makeResult({...options,publicKey:key.publicKey.toString('hex')},defaultWalletId(contract));
      if(i===3)options.pattern=candidate.address.slice(-1);
    }
    for(let i=0;i<keys.length;i++) {
      const candidate=makeResult({...options,publicKey:keys[i].publicKey.toString('hex')},defaultWalletId(contract));
      if(matches(candidate.address,options.pattern,'suffix',false)){expected={index:i,result:candidate};break;}
    }
    assert.ok(expected);
    await until(worker,'test-ready');
    worker.postMessage({type:'connect-seeds',options,port:channel.port2},[channel.port2]);
    // An exact-size transferable buffer, isolated from Node's pooled buffers.
    const transfer=new Uint8Array(seeds);
    const reply=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Checker timed out')),5000);channel.port1.once('message',data=>{clearTimeout(timer);resolve(data);});});
    channel.port1.postMessage({id:7,count:8192,offset:0,seeds:transfer.buffer},[transfer.buffer]);
    assert.equal(transfer.byteLength,0);
    const data=await reply;
    assert.equal(data.id,7);assert.equal(data.attempts,expected.index+1);
    assert.deepEqual(data.found,expected);
    assert.ok(!('seeds' in data)&&!('words' in data)&&!('secretKey' in data));
    // The shared test buffer lets the sender observe cleanup performed by the
    // checker. Real search buffers use the detached transfer path above.
    const shared=new Uint8Array(new SharedArrayBuffer(seeds.length));shared.set(seeds);
    const wipedReply=new Promise(resolve=>channel.port1.once('message',resolve));
    channel.port1.postMessage({id:8,count:8192,offset:0,seeds:shared.buffer});
    assert.equal((await wipedReply).id,8);assert.ok(shared.every(value=>value===0));
  } finally {seeds.fill(0);keys.forEach(key=>{key.publicKey.fill(0);key.secretKey.fill(0);});channel.port1.close();await worker.terminate();}
});
for (const contract of ['v4r2', 'v5r1', 'wallet-tg']) for (const strategy of (contract === 'wallet-tg' ? ['standard'] : ['wallet-id', 'standard'])) for (const scheme of (contract !== 'wallet-tg' && strategy === 'standard' ? ['ton-24', 'bip39-12-slip10-ed25519'] : [contract === 'wallet-tg' ? 'bip39-12-slip10-ed25519' : 'ton-24'])) {
  test(`browser bundle: ${contract}/${strategy}/${scheme} generates a valid recoverable phrase without revealing it before request`, { timeout: 130000 }, async () => {
    const worker = new Worker(new URL('./browser-worker-bridge.mjs', import.meta.url));
    let generatedWords, key;
    const messages = [];
    worker.on('message', data => { if (data.type !== 'revealed') messages.push(data); });
    try {
      await until(worker, 'test-ready');
      const opts = { contract, strategy, mnemonicScheme:scheme, ...(strategy === 'standard' && contract !== 'wallet-tg' ? {importTarget:'tonkeeper'} : {}), pattern: 'a', position: 'suffix', caseSensitive: false, bounceable: contract === 'v4r2', testOnly: contract === 'v4r2' };
      const found = until(worker, 'found');
      worker.postMessage({ type: 'start', lane: 0, options: opts });
      const { result } = await found;
      assert.ok(messages.every(m => !('words' in m) && !('mnemonic' in m) && !('secretKey' in m)));
      assert.ok(!('mnemonic' in result));
      assert.ok(matches(result.address, 'a', 'suffix', false));
      if (strategy === 'standard') assert.equal(result.walletId, defaultWalletId(contract, opts.testOnly));
      const revealed = until(worker, 'revealed');
      worker.postMessage({ type: 'reveal' });
      generatedWords = (await revealed).words;
      const telegram = contract === 'wallet-tg';
      const bip39 = scheme === 'bip39-12-slip10-ed25519';
      assert.equal(generatedWords.length, bip39 ? 12 : 24);
      assert.equal(result.mnemonicWordCount, generatedWords.length);
      assert.ok(bip39 ? validateTelegramMnemonic(generatedWords) : await mnemonicValidate(generatedWords));
      if (bip39 && !telegram) assert.equal(await mnemonicValidate(generatedWords), false, 'Tonkeeper must not confuse BIP39 with TON mnemonic');
      key = bip39 ? await telegramMnemonicToKeyPair(generatedWords) : await mnemonicToPrivateKey(generatedWords);
      assert.equal(key.publicKey.toString('hex'), result.publicKey);
      const sdk = telegram ? { address: contractAddress(0, {
        code: Cell.fromBoc(Buffer.from(result.codeBoc, 'hex'))[0],
        data: beginCell().storeUint(0, 8).storeUint(0, 32).storeUint(0x7FFF7F11, 32).storeBuffer(key.publicKey).endCell(),
      }) } : contract === 'v4r2' ? WalletContractV4.create({ workchain: 0, publicKey: key.publicKey, walletId: result.walletIdConfig })
        : WalletContractV5R1.create({ publicKey: key.publicKey, walletId: result.walletIdConfig });
      assert.equal(sdk.address.toString({ bounceable: opts.bounceable, testOnly: opts.testOnly, urlSafe: true }), result.address);
    } finally {
      generatedWords?.fill(''); key?.secretKey.fill(0); key?.publicKey.fill(0); await worker.terminate();
    }
  });
}
