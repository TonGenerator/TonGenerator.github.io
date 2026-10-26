// Transitional, public-files-only guide for an already-running older desktop app.
// Its next ordinary restart serves these same files from port 11111.
import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const files={'/install.html':['install.html','text/html; charset=utf-8'],'/install.css':['install.css','text/css; charset=utf-8'],'/install.js':['install.js','text/javascript; charset=utf-8'],'/favicon.svg':['favicon.svg','image/svg+xml'],'/generator-ton-username.source.zip':['generator-ton-username.source.zip','application/zip'],'/GENERATOR_TON_USERNAME_Colab.ipynb':['GENERATOR_TON_USERNAME_Colab.ipynb','application/x-ipynb+json; charset=utf-8']};
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cross-Origin-Resource-Policy','same-origin');res.setHeader('X-Generator-Guide','install-guide-preview');
 res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
 if(req.headers.host!=='127.0.0.1:11112'){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const pathname=new URL(req.url,'http://127.0.0.1:11112').pathname;
 if(pathname==='/'){res.writeHead(302,{Location:'http://127.0.0.1:11111/'}).end();return;}
 const item=files[pathname];if(!item){res.writeHead(404).end();return;}
 try{const bytes=await fs.readFile(path.join(root,item[0]));if(/\.(zip|ipynb)$/.test(item[0]))res.setHeader('Content-Disposition','attachment; filename="'+item[0]+'"');res.writeHead(200,{'Content-Type':item[1]});res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(503).end();}
});
server.listen(11112,'127.0.0.1');
const parentIndex=process.argv.indexOf('--parent-pid'),parent=parentIndex>=0?Number(process.argv[parentIndex+1]):0;
if(Number.isInteger(parent)&&parent>0){const watch=setInterval(()=>{try{process.kill(parent,0);}catch(error){if(error.code==='ESRCH'){clearInterval(watch);setTimeout(()=>server.close(),60000);}}},5000);}
