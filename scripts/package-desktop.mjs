import {readFile,writeFile,mkdir,copyFile,cp,rename,access,readdir} from 'node:fs/promises';
import path from 'node:path';import {deflateSync} from 'node:zlib';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
const root=process.cwd(),name='GENERATOR TON USERNAME',target=path.join(root,'release',name),appRoot=path.join(target,'resources','app');
const archive=path.join(root,'runtime-cache/electron-v45.0.0-win32-x64.zip');
const version='1.2.0';
const manifest=await readFile('runtime-cache/SHASUMS256.txt','utf8');const line=manifest.split(/\r?\n/).find(value=>value.endsWith(' *electron-v45.0.0-win32-x64.zip'));
if(!line||createHash('sha256').update(await readFile(archive)).digest('hex')!==line.slice(0,64))throw Error('Unverified Electron runtime');
await access(path.join(target,'electron.exe')).catch(async()=>access(path.join(target,name+'.exe')));
execFileSync('C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe',['/nologo','/utf8output','/target:exe','/platform:x64','/reference:System.Windows.Forms.dll','/out:'+path.join(root,'desktop/monitor.exe'),path.join(root,'desktop/Monitor.cs')],{stdio:'inherit'});
const crc32=data=>{let c=0xffffffff;for(const byte of data){c^=byte;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;};
const chunk=(type,data)=>{const t=Buffer.from(type),size=Buffer.alloc(4),crc=Buffer.alloc(4);size.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([size,t,data,crc]);};
const size=256,raw=Buffer.alloc((size*4+1)*size);
function distance(x,y,ax,ay,bx,by){const t=Math.max(0,Math.min(1,((x-ax)*(bx-ax)+(y-ay)*(by-ay))/((bx-ax)**2+(by-ay)**2)));return Math.hypot(x-ax-t*(bx-ax),y-ay-t*(by-ay));}
for(let y=0;y<size;y++)for(let x=0;x<size;x++){const p=y*(size*4+1)+1+x*4;const edge=Math.hypot(Math.max(0,32-x,x-223),Math.max(0,32-y,y-223))<=32;const mark=Math.min(distance(x,y,59,72,197,72),distance(x,y,59,72,128,199),distance(x,y,197,72,128,199),distance(x,y,128,72,128,199))<5;raw[p]=mark?105:12;raw[p+1]=mark?205:27;raw[p+2]=mark?250:44;raw[p+3]=edge?255:0;}
const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);
await writeFile('desktop/icon.png',png);const ico=Buffer.alloc(22);ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);await writeFile('desktop/icon.ico',Buffer.concat([ico,png]));
await mkdir(path.join(appRoot,'desktop'),{recursive:true});await cp('dist',path.join(appRoot,'dist'),{recursive:true});
const desktopFiles=['main.cjs','preload.cjs','server.cjs','governor.cjs','cpu-meter.cjs','uninstall.cjs','uninstall.ps1','windows-identity.cjs','monitor.exe','dashboard.html','dashboard.css','client.js','icon.png','icon.ico'];
for(const file of desktopFiles)await copyFile(path.join('desktop',file),path.join(appRoot,'desktop',file));
await mkdir(path.join(appRoot,'src'),{recursive:true});for(const file of ['patterns.js','donate.js','i18n.js','translations.js'])await copyFile(path.join('src',file),path.join(appRoot,'src',file));
await writeFile(path.join(appRoot,'package.json'),JSON.stringify({name:'generator-ton-username',productName:name,version,main:'desktop/main.cjs',private:true,type:'module'},null,2)+'\n','utf8');
try{await access(path.join(target,'electron.exe'));await rename(path.join(target,'electron.exe'),path.join(target,name+'.exe'));}catch(error){if(error.code!=='ENOENT')throw error;}
const {resourceTool}=await import('./windows-resource-tool.mjs'),editor=await resourceTool(root);
execFileSync(editor,[path.join(target,name+'.exe'),'--set-version-string','FileDescription',name,'--set-version-string','ProductName',name,'--set-version-string','InternalName',name,'--set-version-string','OriginalFilename',name+'.exe','--set-version-string','CompanyName','AlexFordash','--set-file-version',version,'--set-product-version',version,'--set-icon',path.join(root,'desktop','icon.ico')]);
await writeFile(path.join(target,'ПРОЧИТАЙ МЕНЯ.txt'),name+'\r\n\r\nЗапусти '+name+'.exe. Интерфейс: http://127.0.0.1:11111/\r\nПриложение остаётся в трее после закрытия браузера.\r\nАвтозапуск включается при первом обычном запуске, отключается в трее или интерфейсе.\r\nНе перемещай папку приложения после включения автозапуска.\r\nНайденные слова хранятся под защитой Windows DPAPI в папке данных текущего пользователя. Для переноса обязательно сохрани секретный JSON из интерфейса.\r\nАвтопауза использует состояние полноэкранных приложений, известные игры и нагрузку GPU/CPU; обнаружение занимает примерно 1–3 секунды. Отсутствие влияния на FPS для всех игр не гарантируется.\r\nСборка не подписана сертификатом разработчика.\r\n','utf8');
console.log('Built: '+path.join(target,name+'.exe'));
const managed=new Set(execFileSync('tar',['-tf',archive],{encoding:'utf8'}).split(/\r?\n/).filter(file=>file&&!file.endsWith('/')).map(file=>file==='electron.exe'?name+'.exe':file));
async function addBuilt(folder,prefix){for(const entry of await readdir(folder,{withFileTypes:true})){if(entry.isSymbolicLink())throw Error('Unexpected build symlink');if(entry.isDirectory())await addBuilt(path.join(folder,entry.name),prefix+entry.name+'/');else managed.add(prefix+entry.name);}}
await addBuilt('dist','resources/app/dist/');for(const file of desktopFiles)managed.add('resources/app/desktop/'+file);for(const file of ['patterns.js','donate.js','i18n.js','translations.js'])managed.add('resources/app/src/'+file);managed.add('resources/app/package.json');managed.add('ПРОЧИТАЙ МЕНЯ.txt');
const files=[];for(const file of [...managed].sort()){if(file.includes('..')||path.isAbsolute(file)||file.includes('\\'))throw Error('Unsafe runtime archive entry');files.push({path:file,sha256:createHash('sha256').update(await readFile(path.join(target,file))).digest('hex')});}
await writeFile(path.join(target,'uninstall-manifest.json'),JSON.stringify({appId:'local.generator.ton.username',format:1,version,files},null,2)+'\n','utf8');
if(process.argv.includes('--zip')){const zip=path.join(root,'release','GENERATOR-TON-USERNAME-windows-x64.zip');execFileSync(process.env.PYTHON||'python',['scripts/package-windows.py',target,zip],{stdio:'inherit'});console.log('Windows release: '+zip);}
