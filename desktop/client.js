import {parsePatterns,patternsProbability} from '../src/patterns.js';
import {initDonation} from '../src/donate.js';
import {initI18n,getLocale} from '../src/i18n.js';
export function searchTimeEstimate(options,rate){
 if(!/^[A-Za-z0-9_-]{1,8}$/.test(options?.pattern)||!Number.isFinite(rate)||rate<=0)return null;
 const p=patternsProbability(options.patterns||[options.pattern],options.caseSensitive,options.position||'suffix');
 const quantile=chance=>Math.ceil(Math.log1p(-chance)/Math.log1p(-p))/rate;
 return {mean:1/p/rate,median:quantile(.5),p95:quantile(.95)};
}
export function estimateDuration(seconds){
 if(!Number.isFinite(seconds)||seconds<0)return '—';
 if(seconds<1)return '< 1 сек';
 const format=value=>value.toLocaleString(getLocale(),{maximumFractionDigits:1});
 if(seconds<60)return `≈${Math.ceil(seconds)} сек`;
 if(seconds<3600)return `≈${Math.ceil(seconds/60)} мин`;
 if(seconds<86400)return `≈${format(seconds/3600)} ч`;
 if(seconds<31557600)return `≈${format(seconds/86400)} дн`;
 return `≈${format(seconds/31557600)} г.`;
}
export class SearchRate {
 constructor(){this.samples=[];this.elapsed=0;}
 update(state,now=performance.now()){
  const last=this.samples.at(-1);
  const reset=!state.running||state.profile?.paused||state.attempts<(last?.attempts||0)||state.elapsedMs<this.elapsed||(last&&now-last.now>5000);
  this.elapsed=state.elapsedMs;
  if(reset){this.samples=[];return 0;}
  this.samples.push({now,attempts:state.attempts});
  while(this.samples.length>2&&this.samples[1].now<=now-10000)this.samples.shift();
  const first=this.samples[0],elapsed=now-first.now;
  return elapsed>=2000?Math.max(0,(state.attempts-first.attempts)/elapsed*1000):0;
 }
}
if(typeof document!=='undefined'){
initI18n();initDonation();
const $=id=>document.getElementById(id),num=value=>Math.floor(value||0).toLocaleString(getLocale());
let csrf='',current=null,initialized=false,secret=null,selected='',busy=false;
const rateMeter=new SearchRate();
// Older running desktop engines can show the guide without interrupting their search.
fetch('/install.html',{method:'HEAD'}).then(response=>{if(!response.ok)$('install-link').href='http://127.0.0.1:11112/install.html';}).catch(()=>{});
function renderEstimate(state,rate){
 const estimate=searchTimeEstimate(state.options,rate);
 let title='Ожидаемое время до совпадения',value='Измеряем скорость…',detail='Оценка появится через несколько секунд после начала поиска.';
 if(!state.running){value=state.found?'Адрес найден':'Начни поиск';detail=state.found?'Нужный адрес уже найден.':'Рассчитаем время по реальной скорости твоего компьютера.';}
 else if(state.profile?.paused){value='На паузе';detail='Пересчитаем после продолжения поиска.';}
 else if(estimate){title='В среднем до совпадения';value=estimateDuration(estimate.mean);const date=new Date(Date.now()+estimate.mean*1000);detail=`${Number.isFinite(date.getTime())?'Ориентир: '+date.toLocaleString(getLocale())+'. ':''}Шанс найти за ${estimateDuration(estimate.median).replace('≈','')} — 50%, за ${estimateDuration(estimate.p95).replace('≈','')} — 95%.`;}
 $('estimate-title').textContent=title;$('estimate-time').textContent=value;$('estimate-detail').textContent=detail;
 $('long-search').hidden=!estimate||estimate.mean<=86400||!state.running;
}
async function api(name,value){const response=await fetch('/api/'+name,{method:'POST',headers:{'Content-Type':'application/json','X-Generator-CSRF':csrf},body:JSON.stringify(value)});if(!response.ok)throw Error('Не удалось выполнить действие. Проверь настройки и состояние приложения.');return response.json();}
function fail(message){$('error').textContent=message;$('error').hidden=false;}
function hideWords(){secret?.mnemonic?.fill('');secret=null;$('words').replaceChildren();$('words').hidden=true;$('reveal').textContent='Показать сид-фразу';}
function readOptions(){return {contract:$('contract').value,pattern:parsePatterns($('pattern').value,$('case').checked)[0],performanceMode:$('performance-mode').value,position:$('position').value,caseSensitive:$('case').checked,computeEngine:$('engine').value,threads:Number($('threads').value),gpuDuty:Number($('gpu').value)/100,bounceable:$('format').value==='eq',testOnly:$('network').value==='testnet',mnemonicScheme:$('scheme').value};}
function labels(){const tg=$('contract').value==='wallet-tg';$('format').disabled=tg;$('network').disabled=tg;$('scheme').disabled=tg;$('threads').min=$('engine').value==='hybrid'?'2':'1';if(Number($('threads').value)<Number($('threads').min))$('threads').value=$('threads').min;$('threads-value').textContent=$('threads').value;$('gpu-value').textContent=$('gpu').value+'%';const chosen=$('performance-mode').value==='max'?'max':$('engine').value;for(const button of document.querySelectorAll('[data-engine-value]')){button.disabled=!!$('engine').querySelector(`option[value="${button.dataset.engineValue==='max'?'hybrid':button.dataset.engineValue}"]`).disabled;button.setAttribute('aria-checked',String(button.dataset.engineValue===chosen));}}
function loadOptions(value){$('pattern').value=current?.searchQueue?.patterns?.join(', ')||value.patterns?.join(', ')||value.pattern;$('performance-mode').value=value.performanceMode||'adaptive';$('max-note').hidden=value.performanceMode!=='max';$('gpu').max=value.performanceMode==='max'?100:90;$('contract').value=value.contract;$('position').value=value.position;$('case').checked=value.caseSensitive;$('engine').value=value.computeEngine;$('threads').value=value.threads;$('gpu').value=value.gpuDuty*100;$('format').value=value.bounceable?'eq':'uq';$('network').value=value.testOnly?'testnet':'mainnet';$('scheme').value=value.mnemonicScheme;labels();}
function render(state){
 current=state;$('connection').hidden=true;
 if(!initialized&&state.ready){$('threads').max=state.maxThreads;loadOptions(state.options);initialized=true;}
 else if(state.running)loadOptions(state.options);
 if(state.ready){for(const item of $('engine').options)if(item.value!=='cpu')item.disabled=!state.webgpuAvailable;}
 labels();
 $('fields').disabled=state.running||state.persisting;$('start').disabled=!state.ready||state.persisting;
 $('start').textContent=state.running?'Остановить поиск':state.found?'Найти ещё один адрес ↗':'Начать поиск ↗';
 $('pause').hidden=false;$('pause').disabled=!state.running||!state.ready||state.persisting;$('pause').textContent=state.manualPause?'▶ Продолжить поиск':'⏸ Пауза поиска';
 const queue=state.searchQueue;$('queue-status').textContent=queue?.patterns?.length>1?(queue.active?`Ищем одновременно: ${(queue.remaining||queue.patterns).join(' · ')}. Найдено ${queue.index} / ${queue.patterns.length}`:`Найдено ${Math.min(queue.index,queue.patterns.length)} / ${queue.patterns.length}`):'';
 $('gpu-limit').hidden=!state.gpuLimit;
 $('autostart').checked=state.autoStart;$('resume').checked=state.resumeOnBoot!==false;
 const reason=state.profile?.reason||'Запуск';$('status').textContent=state.persisting?'Сохраняем результат':state.found&&!state.running?'Найдено':state.running?(state.profile.paused?'На паузе':'Идёт поиск'):'Готов к поиску';
 $('load').textContent=reason;$('load-detail').textContent=state.profile.paused?'Поиск не нагружает CPU и GPU.':`CPU: до ${state.profile.cpuThreads} потоков поиска · активность GPU: до ${Math.round(state.profile.gpuDuty*100)}%`;
 $('address').textContent=state.found&&!state.running?state.found.address:/^[A-Za-z0-9_-]{48}$/.test(state.address)?state.address:'UQ··········································'+$('pattern').value;
 const rate=rateMeter.update(state);
 $('attempts').textContent=num(state.attempts);$('speed').textContent=state.running?(state.profile?.paused?'Пауза':rate?num(rate)+' / с':'—'):state.rate?num(state.rate)+' / с':'—';const seconds=Math.floor(state.elapsedMs/1000);$('elapsed').textContent=(seconds>=3600?Math.floor(seconds/3600)+':':'')+String(Math.floor(seconds/60)%60).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
 renderEstimate(state,rate);
 if(state.error)fail(state.error);
 const wallets=state.wallets||[];$('found').hidden=!wallets.length;$('empty').hidden=!!wallets.length;
 const previous=$('wallets').value;
 if($('wallets').options.length!==wallets.length){hideWords();$('wallets').replaceChildren(...wallets.slice().reverse().map(item=>{const option=document.createElement('option');option.value=item.id;option.textContent=item.contract.toUpperCase()+' · '+item.address;return option;}));if(state.found&&wallets.some(item=>item.id===state.found.id))$('wallets').value=state.found.id;else if(previous&&wallets.some(item=>item.id===previous))$('wallets').value=previous;}
 const chosen=wallets.find(item=>item.id===$('wallets').value);if(chosen){$('found-address').textContent=chosen.address;$('backup-status').textContent=chosen.id==='pending'?'Защищённая копия ещё не записана — сохрани JSON':'✓ Защищённая копия сохранена на этом компьютере';}
}
async function poll(){try{if(!csrf){const response=await fetch('/api/session');if(!response.ok)throw Error();csrf=(await response.json()).csrf;}const response=await fetch('/api/state');if(!response.ok)throw Error();render(await response.json());}catch{$('connection').hidden=false;csrf='';try{await fetch('/',{cache:'no-store'});}catch{}}finally{setTimeout(poll,1000);}}
$('form').addEventListener('submit',async event=>{event.preventDefault();if(busy)return;busy=true;$('error').hidden=true;try{if(current?.running)await api('stop',{});else{const patterns=parsePatterns($('pattern').value,$('case').checked);await api('start',{options:readOptions(),patterns});hideWords();} }catch(error){fail(error.message);}finally{busy=false;}});
$('pause').onclick=async()=>{if(!current||busy)return;busy=true;$('pause').disabled=true;try{await api('pause',{paused:!current.manualPause});}catch(error){fail(error.message);}finally{busy=false;}};
$('performance-mode').onchange=()=>{const max=$('performance-mode').value==='max';$('max-note').hidden=!max;$('gpu').max=max?100:90;if(max){$('threads').value=$('threads').max;$('gpu').value=100;}else if(Number($('gpu').value)>90)$('gpu').value=90;labels();};
for(const button of document.querySelectorAll('[data-engine-value]'))button.onclick=()=>{const max=button.dataset.engineValue==='max';$('engine').value=max?'hybrid':button.dataset.engineValue;$('performance-mode').value=max?'max':'adaptive';$('performance-mode').onchange();};
for(const button of document.querySelectorAll('[data-load-value]'))button.onclick=()=>{$('performance-mode').value=button.dataset.loadValue;$('performance-mode').onchange();};
$('gpu-limit').onclick=()=>api('gpu-limit',{}).then(()=>{$('error').hidden=true;}).catch(error=>fail(error.message));
for(const id of ['autostart','resume'])$(id).onchange=()=>api('settings',{autoStart:$('autostart').checked,resumeOnBoot:$('resume').checked}).catch(error=>fail(error.message));
for(const id of ['contract','engine','threads','gpu'])$(id).addEventListener('input',labels);
$('wallets').onchange=()=>{hideWords();const wallet=current.wallets.find(item=>item.id===$('wallets').value);$('found-address').textContent=wallet?.address||'';};
$('reveal').onclick=async()=>{if(secret){hideWords();return;}try{selected=$('wallets').value;secret=await api('reveal',{id:selected});$('words').replaceChildren(...secret.mnemonic.map(word=>{const li=document.createElement('li');li.textContent=word;return li;}));$('words').hidden=false;$('reveal').textContent='Скрыть сид-фразу';}catch(error){fail(error.message);}};
$('download').onclick=async()=>{let backup;try{backup=await api('reveal',{id:$('wallets').value,export:true});const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='SECRET-TON-'+backup.contract.toUpperCase()+'-'+backup.walletId+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}catch(error){fail(error.message);}finally{backup?.mnemonic?.fill('');}};
document.addEventListener('generator-language-change',()=>{if(current)render(current);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)hideWords();});window.addEventListener('pagehide',hideWords);poll();
}
