import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { randomBytes, randomUUID, createCipheriv, createDecipheriv } from 'node:crypto';

async function privateRead(file,limit){
  const handle=await fs.open(file,constants.O_RDONLY|(constants.O_NOFOLLOW||0));
  try{const info=await handle.stat();if(!info.isFile()||info.size>limit)throw Error('Invalid private file');if(limit===32&&process.platform!=='win32'&&(info.mode&0o077))throw Error('Recovery key requires mode 600');return await handle.readFile();}finally{await handle.close();}
}
async function exclusiveWrite(file,bytes){
  const handle=await fs.open(file,constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL,0o600);
  try{await handle.writeFile(bytes);await handle.sync();}finally{await handle.close();}
}
export async function openVault(folder){
  await fs.mkdir(folder,{recursive:true,mode:0o700});
  const keyFile=path.join(folder,'recovery.key');let key;
  try{key=await privateRead(keyFile,32);}catch(error){
    if(error.code!=='ENOENT')throw error;
    key=randomBytes(32);
    try{await exclusiveWrite(keyFile,key);}catch(error){key.fill(0);if(error.code!=='EEXIST')throw error;key=await privateRead(keyFile,32);}
  }
  if(key.length!==32){key.fill(0);throw Error('Invalid recovery key');}
  // Fail before searching if this folder cannot save a result.
  const probe=path.join(folder,'.probe-'+randomUUID());
  try{await exclusiveWrite(probe,Buffer.from('write-check'));await fs.unlink(probe);}catch(error){key.fill(0);throw error;}
  return {folder,keyFile,key,close(){key.fill(0);}};
}
export async function saveWallet(vault,result,words){
  if(!Array.isArray(words)||![12,24].includes(words.length))throw Error('Invalid recovery');
  const metadata={format:'generator-ton-username/encrypted-v1',createdAt:new Date().toISOString(),public:result};
  const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',vault.key,iv);
  cipher.setAAD(Buffer.from(JSON.stringify(metadata)));
  const plain=Buffer.from(JSON.stringify({...result,mnemonic:words}));
  try{
    const encrypted=Buffer.concat([cipher.update(plain),cipher.final()]);
    const packet={...metadata,iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),ciphertext:encrypted.toString('base64')};
    const file=path.join(vault.folder,`wallet-${randomUUID()}.encrypted.json`);
    const pending=file+'.pending';
    await exclusiveWrite(pending,Buffer.from(JSON.stringify(packet,null,2)+'\n'));
    await fs.rename(pending,file);return file;
  }finally{plain.fill(0);}
}
export async function readWallet(file,keyFile=path.join(path.dirname(file),'recovery.key')){
  const key=await privateRead(keyFile,32);let plain;
  try{
    if(key.length!==32)throw Error('Invalid recovery key');
    const packet=JSON.parse((await privateRead(file,65536)).toString('utf8'));
    if(packet.format!=='generator-ton-username/encrypted-v1')throw Error('Invalid wallet format');
    const iv=Buffer.from(packet.iv,'base64'),tag=Buffer.from(packet.tag,'base64');
    if(iv.length!==12||tag.length!==16)throw Error('Invalid encrypted wallet');
    const decipher=createDecipheriv('aes-256-gcm',key,iv);
    decipher.setAAD(Buffer.from(JSON.stringify({format:packet.format,createdAt:packet.createdAt,public:packet.public})));decipher.setAuthTag(tag);
    plain=Buffer.concat([decipher.update(Buffer.from(packet.ciphertext,'base64')),decipher.final()]);
    return JSON.parse(plain.toString('utf8'));
  }finally{key.fill(0);plain?.fill(0);}
}
export async function exportWallet(file,output,keyFile){
  const backup=await readWallet(file,keyFile);let plain;
  try{plain=Buffer.from(JSON.stringify(backup,null,2)+'\n');await exclusiveWrite(output,plain);}
  finally{backup.mnemonic?.fill('');plain?.fill(0);}
}
