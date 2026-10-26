import {probeGpu} from './gpu-probe.js';
import {initI18n} from './i18n.js';
import {initDonation} from './donate.js';
initI18n();initDonation();
const $=id=>document.getElementById(id);
async function workerProbe(){
 const worker=new Worker(new URL('./gpu-check-worker.js',document.baseURI),{type:'module'});
 try{return await new Promise(resolve=>{const timeout=setTimeout(()=>resolve({error:'Таймаут рабочего потока'}),25000);worker.onmessage=({data})=>{clearTimeout(timeout);resolve(data);};worker.onerror=()=>{clearTimeout(timeout);resolve({error:'Не удалось запустить рабочий поток'});};worker.postMessage({check:true});});}finally{worker.terminate();}
}
async function check(){
 $('gpu-check-again').disabled=true;$('gpu-check-title').textContent='Проверяем…';
 const [page,worker]=await Promise.all([probeGpu(),workerProbe()]);
 $('gpu-check-details').textContent=JSON.stringify({page,worker},null,2);
 const ok=worker.computePassed;
 $('gpu-check-title').textContent=ok?'GPU доступен для генератора':'GPU недоступен рабочему потоку';
 $('gpu-check-message').textContent=ok?'Вычислительный тест пройден и на странице, и в рабочем потоке.':page.computePassed?'На странице GPU работает, но браузер не передал его рабочему потоку. Именно там выполняется генерация.':worker.error||page.error||'Адаптер недоступен.';
 $('gpu-check-again').disabled=false;
}
$('gpu-check-again').onclick=check;check();
