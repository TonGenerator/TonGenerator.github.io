import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {spawn} from 'node:child_process';
import {parseOptions} from '../cli/options.mjs';
import {openVault,saveWallet,readWallet,exportWallet} from '../cli/vault.mjs';
import {telegramMnemonicToKeyPair} from '../src/tg-mnemonic.js';
import {makeResult,defaultWalletId} from '../src/engine.js';
import {mnemonicToPrivateKey,mnemonicValidate} from '@ton/crypto';
import {fileURLToPath} from 'node:url';
const tempRoot=process.platform==='win32'?fileURLToPath(new URL('../test-results/cli-tests/',import.meta.url)):os.tmpdir();
async function tempFolder(prefix){await fs.mkdir(tempRoot,{recursive:true});return fs.mkdtemp(path.join(tempRoot,prefix));}
async function removeFolder(folder){if(!path.resolve(folder).startsWith(path.resolve(tempRoot)+path.sep))throw Error('Unsafe test cleanup');await fs.rm(folder,{recursive:true,force:true});}

test('CLI defaults lock standard import IDs and validate modes, limits and unsafe unknown arguments',()=>{
 const defaults=parseOptions([],24);assert.equal(defaults.threads,12);assert.equal(defaults.cpuLoad,.5);assert.equal(defaults.options.gpuDuty,.5);assert.equal(defaults.options.contract,'wallet-tg');assert.equal(defaults.options.strategy,'standard');
 assert.equal(parseOptions(['--wallet','v5','--words','24'],4).options.mnemonicScheme,'ton-24');
 assert.equal(parseOptions(['--engine','hybrid','--threads','2'],4).threads,2);
 for(const args of [['--wallet','random'],['--threads','0'],['--engine','hybrid','--threads','1'],['--wallet','telegram','--words','24'],['--wallet','v5','--words','24','--engine','gpu'],['--gpu-load','100'],['--pattern','too-long-a-pattern'],['--seed','secret'],['--testnet']])assert.throws(()=>parseOptions(args,4));
});
test('encrypted vault authenticates public metadata, uses private files, and exports only to a new explicit file',async()=>{
 const folder=await tempFolder('ton-cli-vault-');let vault,opened;
 const words=Array(12).fill('test');
 try{
  vault=await openVault(folder);const file=await saveWallet(vault,{address:'public-address',walletId:1},words);
  const text=await fs.readFile(file,'utf8');assert.ok(!text.includes(words.join(' ')));assert.ok(!text.includes('"mnemonic"'));
  opened=await readWallet(file);assert.equal(opened.mnemonic.join(' '),words.join(' '));
  if(process.platform!=='win32'){assert.equal((await fs.stat(file)).mode&0o077,0);assert.equal((await fs.stat(vault.keyFile)).mode&0o077,0);}
  const backup=path.join(folder,'SECRET-TON-test.json');await exportWallet(file,backup);await assert.rejects(()=>exportWallet(file,backup),{code:'EEXIST'});
  const altered=JSON.parse(text);altered.public.address='changed';const bad=path.join(folder,'tampered.json');await fs.writeFile(bad,JSON.stringify(altered));await assert.rejects(()=>readWallet(bad));
 }finally{words.fill('');opened?.mnemonic.fill('');vault?.close();await removeFolder(folder);}
});
function invoke(args,timeoutMs=45000){return new Promise((resolve,reject)=>{
 const child=spawn(process.execPath,['bin/generator-ton.mjs',...args],{cwd:new URL('..',import.meta.url),stdio:['ignore','pipe','pipe']});let stdout='',stderr='';
 const timeout=setTimeout(()=>{child.kill();reject(Error('CLI timeout'));},timeoutMs);
 child.stdout.on('data',value=>{stdout+=value;});child.stderr.on('data',value=>{stderr+=value;});child.on('error',reject);child.on('exit',code=>{clearTimeout(timeout);resolve({code,stdout,stderr});});
});}
for(const [wallet,words] of [['telegram',12],['v4',12],['v5',12],['v5',24]])test(`CLI ${wallet}/${words} saves a recoverable canonical wallet without logging its phrase`,{timeout:130000},async()=>{
 const folder=await tempFolder('ton-cli-find-');let backup,key;
 try{
  const run=await invoke(['--wallet',wallet,'--words',String(words),'--pattern','a','--ignore-case','--threads','2','--json','--output',folder,'--duration',words===24?'100':'30'],words===24?120000:45000);assert.equal(run.code,0,run.stderr);
  const events=run.stdout.trim().split('\n').map(line=>JSON.parse(line)),found=events.find(event=>event.type==='found');assert.ok(found,'Must find an easy pattern');
  assert.ok(events.every(event=>!('mnemonic' in event)&&!('words' in event)&&!('secretKey' in event)));
  backup=await readWallet(found.file);assert.ok(!run.stdout.includes(backup.mnemonic.join(' ')));assert.ok(!run.stderr.includes(backup.mnemonic.join(' ')));
  assert.equal(backup.mnemonic.length,words);if(words===24)assert.equal(await mnemonicValidate(backup.mnemonic),true);
  key=words===24?await mnemonicToPrivateKey(backup.mnemonic):await telegramMnemonicToKeyPair(backup.mnemonic);const expected=makeResult({...parseOptions(['--wallet',wallet,'--words',String(words)],4).options,publicKey:key.publicKey.toString('hex')},defaultWalletId(backup.contract));assert.equal(expected.address,backup.address);assert.match(backup.address,/[aA]$/);
 }finally{backup?.mnemonic.fill('');key?.publicKey.fill(0);key?.secretKey.fill(0);await removeFolder(folder);}
});
test('CLI timed run stops its workers and reports no false found wallet',async()=>{
 const folder=await tempFolder('ton-cli-stop-');
 try{const run=await invoke(['--pattern','________','--threads','1','--json','--duration','.2','--output',folder]);assert.equal(run.code,0,run.stderr);const events=run.stdout.trim().split('\n').map(line=>JSON.parse(line));assert.equal(events.at(-1).type,'end');assert.equal(events.at(-1).found,false);}
 finally{await removeFolder(folder);}
});
