import {parentPort,workerData} from 'node:worker_threads';
import {pbkdf2Sync,webcrypto} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {mnemonicNew,mnemonicValidate,mnemonicToPrivateKey} from '@ton/crypto';
import {newTelegramMnemonic,bip39RootToSeed,telegramMnemonicToKeyPair,validateTelegramMnemonic} from '../src/tg-mnemonic.js';
import {publicKeyFromSeed,tonMnemonicToPublicKey} from '../src/public-key.js';
import {createStandardKeyHasher,createMatcher,defaultWalletId,friendlyAddress,makeResult,validateSearchOptions} from '../src/engine.js';
import {connectSeedChecker} from '../src/gpu-wallet-search.js';

globalThis.crypto??=webcrypto;
let stopped=false,paused=false,duty=.5,heldWords=null;
const post=value=>parentPort.postMessage(value);
parentPort.on('message',message=>{
  if(message.type==='stop'){stopped=true;paused=false;}
  if(message.type==='control'){paused=!!message.paused;duty=message.duty;}
  if(message.type==='reveal'&&heldWords)post({type:'revealed',words:[...heldWords]});
  if(message.type==='discard'){heldWords?.fill('');heldWords=null;parentPort.close();}
});
export async function nativeBip39PublicKey(words){
  const input=Buffer.from(words.join(' ').normalize('NFKD'));let root,seed;
  try{root=pbkdf2Sync(input,'mnemonic',2048,64,'sha512');seed=bip39RootToSeed(root);return await publicKeyFromSeed(seed);}
  finally{input.fill(0);root?.fill(0);seed?.fill(0);}
}
async function search(){
  const options=workerData.options;validateSearchOptions(options);
  const bip39=options.mnemonicScheme==='bip39-12-slip10-ed25519',telegram=options.contract==='wallet-tg';
  const hash=createStandardKeyHasher(options.contract,options.testOnly),matches=createMatcher(options),id=defaultWalletId(options.contract,options.testOnly);
  let attempts=0,lastReport=performance.now(),sliceStart=lastReport;
  while(!stopped){
    const spent=performance.now()-sliceStart;
    if(paused||spent>=25){
      if(!paused)await delay(Math.max(1,spent/duty-spent));
      while(paused&&!stopped)await delay(100);
      if(stopped)break;sliceStart=performance.now();
    }
    let words,key;
    try{
      words=bip39?newTelegramMnemonic():await mnemonicNew(24);
      key=bip39?await nativeBip39PublicKey(words):await tonMnemonicToPublicKey(words);
      const digest=hash(key);attempts++;
      if(matches(digest)){
        if(bip39&&!telegram&&await mnemonicValidate(words))continue;
        if(!(bip39?validateTelegramMnemonic(words):await mnemonicValidate(words)))throw Error('Invalid recovery');
        const reference=bip39?await telegramMnemonicToKeyPair(words):await mnemonicToPrivateKey(words);
        let result;
        try{if(!reference.publicKey.equals(key))throw Error('Public key mismatch');result=makeResult({...options,publicKey:reference.publicKey.toString('hex')},id);if(result.address!==friendlyAddress(digest,options))throw Error('Address mismatch');}
        finally{reference.secretKey.fill(0);reference.publicKey.fill(0);}
        heldWords=words;words=null;post({type:'found',attempts,result});return;
      }
      if(performance.now()-lastReport>=500){post({type:'progress',attempts,address:friendlyAddress(digest,options)});lastReport=performance.now();}
    }finally{words?.fill('');key?.fill(0);}
  }
  post({type:'stopped',attempts});parentPort.close();
}
async function start(){
  if(workerData.role==='checker'){connectSeedChecker(workerData.port,workerData.options,()=>({paused,duty}));return;}
  await search();
}
start().catch(()=>{heldWords?.fill('');post({type:'error',code:workerData.role==='gpu'?'gpu-failed':'worker-failed'});parentPort.close();});
