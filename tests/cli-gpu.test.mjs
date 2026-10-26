import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs/promises';import path from 'node:path';import os from 'node:os';import {spawn} from 'node:child_process';import {fileURLToPath} from 'node:url';
import {readWallet} from '../cli/vault.mjs';import {telegramMnemonicToKeyPair} from '../src/tg-mnemonic.js';import {makeResult,defaultWalletId} from '../src/engine.js';
const enabled=process.env.TON_CLI_GPU_TEST==='1';
for(const engine of ['gpu','hybrid'])test(`native CLI ${engine} recovers a wallet and exits safely even during GPU initialization`,{skip:!enabled,timeout:70000},async()=>{
 const root=process.platform==='win32'?fileURLToPath(new URL('../test-results/cli-tests/',import.meta.url)):os.tmpdir();await fs.mkdir(root,{recursive:true});const folder=await fs.mkdtemp(path.join(root,'ton-native-gpu-'));let backup,key;
 try{
  const run=await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,['bin/generator-ton.mjs','--engine',engine,'--pattern','a','--ignore-case','--threads','4','--gpu-load','30','--duration','50','--json','--output',folder],{cwd:new URL('..',import.meta.url),stdio:['ignore','pipe','pipe']});let stdout='',stderr='';
   const timer=setTimeout(()=>{child.kill('SIGKILL');reject(Error('Native GPU timeout'));},60000);child.stdout.on('data',value=>{stdout+=value;});child.stderr.on('data',value=>{stderr+=value;});child.on('error',reject);child.on('exit',code=>{clearTimeout(timer);resolve({code,stdout,stderr});});
  });
  assert.equal(run.code,0,run.stderr);const events=run.stdout.trim().split('\n').map(line=>JSON.parse(line));assert.equal(events.at(-1).type,'end');const found=events.find(event=>event.type==='found');assert.ok(found);
  backup=await readWallet(found.file);key=await telegramMnemonicToKeyPair(backup.mnemonic);assert.ok(!run.stdout.includes(backup.mnemonic.join(' ')));assert.ok(!run.stderr.includes(backup.mnemonic.join(' ')));
  assert.equal(makeResult({...backup,testOnly:false,publicKey:key.publicKey.toString('hex')},defaultWalletId(backup.contract)).address,backup.address);
 }finally{backup?.mnemonic.fill('');key?.secretKey.fill(0);key?.publicKey.fill(0);if(!path.resolve(folder).startsWith(path.resolve(root)+path.sep))throw Error('Unsafe test cleanup');await fs.rm(folder,{recursive:true,force:true});}
});
