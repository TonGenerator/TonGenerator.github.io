import test from 'node:test';import assert from 'node:assert/strict';import {Worker} from 'node:worker_threads';
function until(worker,type){return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{worker.off('message',read);reject(Error('Worker timeout'));},20000);function read(data){if(data.type==='error'){clearTimeout(timer);worker.off('message',read);reject(Error(data.message));}else if(data.type===type){clearTimeout(timer);worker.off('message',read);resolve(data);}}worker.on('message',read);worker.once('error',reject);});}
test('desktop CPU search submits no addresses while paused and resumes with a canonical winner',async()=>{
 const worker=new Worker(new URL('./browser-worker-bridge.mjs',import.meta.url));const replies=[];worker.on('message',data=>replies.push(data));
 try{await until(worker,'test-ready');worker.postMessage({type:'resource-control',paused:true,duty:.2});worker.postMessage({type:'start',lane:0,options:{contract:'wallet-tg',strategy:'standard',pattern:'________',patterns:['________','a'],position:'suffix',caseSensitive:false,bounceable:false,testOnly:false,mnemonicScheme:'bip39-12-slip10-ed25519',desktopManaged:true}});
 await new Promise(resolve=>setTimeout(resolve,250));assert.equal(replies.some(data=>data.attempts>0||data.type==='found'),false);
 const found=until(worker,'found');worker.postMessage({type:'resource-control',paused:false,duty:1});const winner=await found;assert.match(winner.result.address,/[aA]$/);assert.equal(winner.result.pattern,'a');assert.deepEqual(winner.result.matchedPatterns,['a']);assert.ok(winner.attempts>0);assert.equal('words' in winner,false);
 }finally{await worker.terminate();}
});
