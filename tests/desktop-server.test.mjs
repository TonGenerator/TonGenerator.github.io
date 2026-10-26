import test from 'node:test';import assert from 'node:assert/strict';import http from 'node:http';import {createRequire} from 'node:module';const require=createRequire(import.meta.url);const {createDesktopServer}=require('../desktop/server.cjs');
function fetch(url,options={}){return new Promise((resolve,reject)=>{const req=http.request(url,{method:options.method||'GET',headers:options.headers},res=>{let body='';res.setEncoding('utf8');res.on('data',chunk=>body+=chunk);res.on('end',()=>resolve({status:res.statusCode,headers:{get:key=>Array.isArray(res.headers[key.toLowerCase()])?res.headers[key.toLowerCase()].join(','):res.headers[key.toLowerCase()]},text:async()=>body,json:async()=>JSON.parse(body)}));});req.on('error',reject);req.end(options.body);});}
test('desktop API restricts Host, sessions, CSRF, origin and secret methods; engine HTML has a separate credential',async()=>{
 const actions=[];const server=createDesktopServer({root:process.cwd(),engineToken:'fixture-only',getState:()=>({running:false}),action:async(name,value)=>{actions.push(name);return {ok:true};}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port,headers={Host:'127.0.0.1:11111'};
 try{
  assert.equal((await fetch(base)).status,403);
  assert.equal((await fetch(base+'/api/state',{headers})).status,403);
  const home=await fetch(base,{headers});assert.equal(home.status,200);assert.match(await home.text(),/GENERATOR TON USERNAME/);
  const cookie=home.headers.get('set-cookie').split(';')[0],auth={...headers,Cookie:cookie};assert.match(home.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/);
  const csrf=(await (await fetch(base+'/api/session',{headers:auth})).json()).csrf;
  assert.equal((await fetch(base+'/api/state',{headers:auth})).status,200);
  assert.equal((await fetch(base+'/api/reveal',{headers:auth})).status,403);
  for(const extra of [{Origin:'https://evil.test'}, {'X-Generator-CSRF':'wrong'}, {'Sec-Fetch-Site':'cross-site'}])assert.equal((await fetch(base+'/api/reveal',{method:'POST',headers:{...auth,Origin:'http://127.0.0.1:11111','Content-Type':'application/json','X-Generator-CSRF':csrf,...extra},body:'{}'})).status,403);
  const good=await fetch(base+'/api/start',{method:'POST',headers:{...auth,Origin:'http://127.0.0.1:11111','Content-Type':'application/json','X-Generator-CSRF':csrf},body:'{}'});assert.equal(good.status,200);assert.equal(good.headers.get('cache-control'),'no-store');assert.deepEqual(actions,['start']);
  assert.equal((await fetch(base+'/engine.html',{headers:auth})).status,403);
  const engine=await fetch(base+'/engine.html',{headers:{...headers,'X-Generator-Engine':'fixture-only'}});assert.equal(engine.status,200);assert.match(engine.headers.get('content-security-policy'),/connect-src 'none'/);assert.match(await engine.text(),/src="\/engine.js"/);
  assert.equal((await fetch(base+'/desktop/main.cjs',{headers})).status,404);
  const guide=await fetch(base+'/install.html',{headers});assert.equal(guide.status,200);assert.match(await guide.text(),/Установить генератор/);
  const source=await fetch(base+'/generator-ton-username.source.zip',{method:'HEAD',headers});assert.equal(source.status,200);assert.equal(source.headers.get('content-type'),'application/zip');assert.match(source.headers.get('content-disposition'),/^attachment;/);
  const notebook=await fetch(base+'/GENERATOR_TON_USERNAME_Colab.ipynb',{headers});assert.equal(notebook.status,200);assert.match(notebook.headers.get('content-disposition'),/^attachment;/);assert.equal((await notebook.json()).nbformat,4);
  assert.equal((await fetch(base+'/recovery.key',{headers})).status,404);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
