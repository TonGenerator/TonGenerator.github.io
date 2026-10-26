const http=require('node:http');const fs=require('node:fs/promises');const path=require('node:path');const crypto=require('node:crypto');
const ORIGIN='http://127.0.0.1:11111';
function createDesktopServer({root,engineToken,getState,action}){
 const cookie=crypto.randomBytes(32).toString('hex'),csrf=crypto.randomBytes(32).toString('hex');
 return http.createServer(async(req,res)=>{
  const send=(code,value)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(value));};
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cross-Origin-Resource-Policy','same-origin');res.setHeader('Cross-Origin-Opener-Policy','same-origin');
  res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self'; connect-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  if(req.headers.host!=='127.0.0.1:11111')return send(403,{error:'Host denied'});
  let pathname;try{pathname=new URL(req.url,ORIGIN).pathname;}catch{return send(400,{error:'Invalid URL'});}
  const site=req.headers['sec-fetch-site'],navigation=['/','/install.html'].includes(pathname)&&req.method==='GET'&&req.headers['sec-fetch-dest']==='document'&&req.headers['sec-fetch-mode']==='navigate';if(!navigation&&(site==='cross-site'||site==='same-site'))return send(403,{error:'Cross-origin denied'});
  if(pathname==='/engine.html'){
   if(req.headers['x-generator-engine']!==engineToken)return send(403,{error:'Engine denied'});
   res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self'; connect-src 'none'; worker-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
   const html=(await fs.readFile(path.join(root,'dist/index.html'),'utf8')).replace(/src="(?:\.\/|\/)app\.js"/,'src="/engine.js"');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(html);
  }
  if(pathname.startsWith('/api/')){
   if(!(req.headers.cookie||'').split(';').some(part=>part.trim()==='generator_session='+cookie))return send(403,{error:'Session required'});
   if(req.method==='GET'&&pathname==='/api/session')return send(200,{csrf});
   if(req.method==='GET'&&pathname==='/api/state')return send(200,getState());
   if(req.method!=='POST'||req.headers.origin!==ORIGIN||req.headers['x-generator-csrf']!==csrf||!/^application\/json/.test(req.headers['content-type']||''))return send(403,{error:'Request denied'});
   try{let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>16384){send(413,{error:'Too large'});req.destroy();return;}}const value=await action(pathname.slice(5),JSON.parse(body||'{}'));return send(200,value||{ok:true});}catch{return send(400,{error:'Не удалось выполнить действие. Проверь настройки.'});}
  }
  if(!['GET','HEAD'].includes(req.method))return send(405,{error:'Method denied'});
  const files={'/':['desktop/dashboard.html','text/html; charset=utf-8'],'/client.js':['desktop/client.js','text/javascript; charset=utf-8'],'/dashboard.css':['desktop/dashboard.css','text/css; charset=utf-8'],'/style.css':['dist/style.css','text/css; charset=utf-8'],'/favicon.svg':['dist/favicon.svg','image/svg+xml'],'/engine.js':['dist/app.js','text/javascript; charset=utf-8'],'/wallet-worker.js':['dist/wallet-worker.js','text/javascript; charset=utf-8']};
  Object.assign(files,{'/install.html':['dist/install.html','text/html; charset=utf-8'],'/install.css':['dist/install.css','text/css; charset=utf-8'],'/install.js':['dist/install.js','text/javascript; charset=utf-8'],'/generator-ton-username.source.zip':['dist/generator-ton-username.source.zip','application/zip']});
  files['/GENERATOR_TON_USERNAME_Colab.ipynb']=['dist/GENERATOR_TON_USERNAME_Colab.ipynb','application/x-ipynb+json; charset=utf-8'];
  files['/src/patterns.js']=['src/patterns.js','text/javascript; charset=utf-8'];
  files['/src/donate.js']=['src/donate.js','text/javascript; charset=utf-8'];
  for(const file of ['i18n.js','translations.js'])files['/src/'+file]=['src/'+file,'text/javascript; charset=utf-8'];
  for(const file of ['i18n.js','translations.js','donate.js'])files['/'+file]=['dist/'+file,'text/javascript; charset=utf-8'];
  files['/shell.css']=['dist/shell.css','text/css; charset=utf-8'];
  files['/gpu-check.html']=['dist/gpu-check.html','text/html; charset=utf-8'];files['/gpu-check.js']=['dist/gpu-check.js','text/javascript; charset=utf-8'];
  files['/gpu-check-worker.js']=['dist/gpu-check-worker.js','text/javascript; charset=utf-8'];
  const item=files[pathname];if(!item)return send(404,{error:'Not found'});
  if(pathname==='/generator-ton-username.source.zip')res.setHeader('Content-Disposition','attachment; filename="generator-ton-username.source.zip"');
  if(pathname==='/GENERATOR_TON_USERNAME_Colab.ipynb')res.setHeader('Content-Disposition','attachment; filename="GENERATOR_TON_USERNAME_Colab.ipynb"');
  try{const data=await fs.readFile(path.join(root,item[0]));if(pathname==='/')res.setHeader('Set-Cookie','generator_session='+cookie+'; HttpOnly; SameSite=Strict; Path=/');res.writeHead(200,{'Content-Type':item[1]});res.end(req.method==='HEAD'?undefined:data);}catch{send(503,{error:'App files unavailable'});}
 });
}
module.exports={createDesktopServer,ORIGIN};
