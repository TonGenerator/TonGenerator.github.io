import fs from 'node:fs/promises';
import path from 'node:path';
import {deflateRawSync} from 'node:zlib';

// An allowlist keeps local results, credentials, runtimes and installed packages out of GitHub archives.
const roots=['bin','cli','colab','src','desktop','scripts','tests','.github','audit'];
const files=['package.json','package-lock.json','site.config.json','DEPLOY-GITHUB.md','README.md','.gitignore','.gitattributes','.dockerignore','Dockerfile','generator-ton','server.mjs','Открыть генератор.cmd'];
// Browser uploads may omit dotfiles. Keep the downloadable source usable and
// include safe ignore rules even when those optional repository files are absent.
const ignoredPaths=['node_modules/','dist/','test-results/','release/','runtime-cache/','.runtime/','wallets/','vault/','*.encrypted.json','*.encrypted.json.pending','recovery.key','SECRET-TON-*.json','*.secret.json','.env','*.log','*.source.zip','.colab-results/','__pycache__/','.ipynb_checkpoints/'];
const dotfileDefaults={
 '.gitignore':ignoredPaths.join('\n')+'\ndesktop/monitor.exe\ndesktop/icon.png\ndesktop/icon.ico\n',
 '.dockerignore':['.git/',...ignoredPaths].join('\n')+'\n',
 '.gitattributes':'* text=auto eol=lf\n*.cmd text eol=crlf\n',
};
async function readSource(file){
 try{return await fs.readFile(file);}
 catch(error){if(error.code==='ENOENT'&&Object.hasOwn(dotfileDefaults,file))return Buffer.from(dotfileDefaults[file],'utf8');throw error;}
}
async function collect(folder){for(const entry of await fs.readdir(folder,{withFileTypes:true})){const file=path.posix.join(folder,entry.name);if(entry.isSymbolicLink())throw Error('Refusing symlink in source');if(entry.isDirectory()&&!['__pycache__','.ipynb_checkpoints'].includes(entry.name))await collect(file);else if(entry.isFile()&&/\.(mjs|cjs|js|py|ipynb|md|html|css|cs|sh|ps1|svg|yml)$/.test(entry.name))files.push(file);}}
for(const root of roots)await collect(root);
const crc32=data=>{let value=0xffffffff;for(const byte of data){value^=byte;for(let bit=0;bit<8;bit++)value=(value>>>1)^((value&1)?0xedb88320:0);}return(value^0xffffffff)>>>0;};
const chunks=[],directory=[];let offset=0;
for(const file of [...new Set(files)].sort()){
  if(/recovery\.key|\.encrypted\.json|SECRET-TON-|\.env|node_modules|test-results|runtime-cache|\.runtime/.test(file))throw Error('Private path in source archive');
  const data=await readSource(file),compressed=deflateRawSync(data),name=Buffer.from(file,'utf8'),crc=crc32(data);
  const header=Buffer.alloc(30);header.writeUInt32LE(0x04034b50);header.writeUInt16LE(20,4);header.writeUInt16LE(0x800,6);header.writeUInt16LE(8,8);header.writeUInt16LE(33,12);header.writeUInt32LE(crc,14);header.writeUInt32LE(compressed.length,18);header.writeUInt32LE(data.length,22);header.writeUInt16LE(name.length,26);
  const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);central.writeUInt16LE(8,10);central.writeUInt16LE(33,14);central.writeUInt32LE(crc,16);central.writeUInt32LE(compressed.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(name.length,28);central.writeUInt32LE(offset,42);
  directory.push(central,name);chunks.push(header,name,compressed);offset+=header.length+name.length+compressed.length;
}
const central=Buffer.concat(directory),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(offset,16);
const archive=Buffer.concat([...chunks,central,end]);
await fs.mkdir('release',{recursive:true});await fs.writeFile('release/generator-ton-username.source.zip',archive);
await fs.mkdir('dist',{recursive:true});await fs.writeFile('dist/generator-ton-username.source.zip',archive);
console.log('Source archive: release/generator-ton-username.source.zip');
