import os from 'node:os';
import {Worker} from 'node:worker_threads';
import {fork} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {createSearchPlan} from '../src/search-plan.js';
import {SearchRate,searchTimeEstimate,estimateDuration} from '../desktop/client.js';
import {openVault,saveWallet} from './vault.mjs';

export async function runSearch(config){
  const vault=await openVault(config.output),plan=createSearchPlan(config.options.computeEngine,config.threads,config.options.performanceMode);
  const workers=new Set(),counts=new Map(),rateMeter=new SearchRate();
  let timer,deadline,winner=null,saving=false,finishing=false,address='',paused=false,manualPaused=false,duty=.5,gpuFailed=false,done;
  const completed=new Promise(resolve=>{done=resolve;}),start=performance.now();
  let cpuStart=process.cpuUsage(),cpuAt=start,systemStart=os.cpus(),tickAt=start,busyUntil=0,gpuCpu=0,previousGpuCpu=0;
  const emit=value=>{if(config.json)process.stdout.write(JSON.stringify(value)+'\n');};
  const message=text=>{if(!config.json)process.stdout.write((process.stdout.isTTY?'\r\x1b[2K':'')+text+'\n');};
  const warn=text=>process.stderr.write(text+'\n');
  const attempts=()=>[...counts.values()].reduce((sum,count)=>sum+count,0);
  async function finish(code){
    if(finishing||saving)return;finishing=true;clearInterval(timer);clearTimeout(deadline);
    for(const worker of workers)worker.postMessage({type:'stop'});
    await delay(150);
    await Promise.allSettled([...workers].map(worker=>worker.terminate()));
    process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
    if(config.controlStdin){process.stdin.off('data',controlInput);process.stdin.off('end',inputClosed);process.stdin.pause();}
    vault.close();
    emit({type:'end',found:!!winner,attempts:attempts(),elapsedMs:performance.now()-start});
    if(!winner)message('Поиск остановлен.');done(code);
  }
  function interrupt(){if(saving){warn('Сохраняем найденный кошелёк. Дождись подтверждения записи.');return;}finish(130);}
  process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
  let inputBuffer='',inputOverflow=false;
  function controlInput(chunk){
    for(const char of chunk.toString('utf8')){
      if(char==='\n'){
        if(!inputOverflow&&!finishing&&!saving){
          try{const {action}=JSON.parse(inputBuffer);if(action==='stop')finish(0);else if(action==='pause'||action==='resume'){
            manualPaused=action==='pause';paused=manualPaused||performance.now()<busyUntil;
            for(const worker of workers)worker.postMessage({type:'control',paused,duty,gpuDuty:config.options.gpuDuty});
            emit({type:'control',paused,manualPaused});
          }}catch{}
        }
        inputBuffer='';inputOverflow=false;
      }else if(inputBuffer.length<256&&!inputOverflow)inputBuffer+=char;
      else{inputBuffer='';inputOverflow=true;}
    }
  }
  function inputClosed(){finish(130);}
  if(config.controlStdin){process.stdin.on('data',controlInput);process.stdin.on('end',inputClosed);}
  async function keepFound(worker,result){
    if(winner||finishing)return;winner=worker;saving=true;emit({type:'saving'});
    for(const item of workers)if(item!==worker)item.postMessage({type:'stop'});
    let words;
    try{
      words=await new Promise((resolve,reject)=>{
        const timeout=setTimeout(()=>{worker.off('message',onMessage);reject(Error('Recovery unavailable'));},15000);
        const onMessage=data=>{if(data.type==='revealed'){clearTimeout(timeout);worker.off('message',onMessage);resolve(data.words);}};
        worker.on('message',onMessage);worker.postMessage({type:'reveal'});
      });
      for(;;){
        try{
          const file=await saveWallet(vault,result,words);
          emit({type:'found',address:result.address,contract:result.contract,walletId:result.walletId,file,keyFile:vault.keyFile});
          message(`Найден адрес: ${result.address}\nЗашифрованная копия: ${file}\nКлюч восстановления: ${vault.keyFile}`);
          if(process.stdout.isTTY)process.stdout.write('\x07');break;
        }catch{warn('Не удалось сохранить результат. Не закрывай процесс: повторяем запись через 5 секунд.');await delay(5000);}
      }
      words.fill('');words=null;worker.postMessage({type:'discard'});saving=false;await finish(0);
    }catch{warn('Не удалось получить слова из найденного worker. Процесс оставлен открытым для сохранения результата.');}
    finally{words?.fill('');}
  }
  function gpuFailure(){
    if(gpuFailed)return;gpuFailed=true;emit({type:'engine',gpu:false,fallback:!!plan.cpuCount});
    if(plan.cpuCount){warn('GPU остановлен; поиск продолжается на CPU.');for(const worker of workers)if(worker.role!=='cpu')worker.terminate();}
    else{warn('GPU недоступен или не прошёл проверку. Проверь драйвер и пакет webgpu@0.6.2 либо выбери --engine cpu.');finish(1);}
  }
  function spawn(role){
    const worker=role==='gpu'?fork(new URL('./gpu-process.mjs',import.meta.url),[],{stdio:['ignore','ignore','ignore','ipc'],serialization:'advanced'}):new Worker(new URL('./worker.mjs',import.meta.url),{workerData:{role,options:config.options}});
    if(role==='gpu'){
      worker.postMessage=value=>{if(worker.connected)worker.send(value);};
      worker.terminate=()=>new Promise(resolve=>{if(worker.exitCode!==null||worker.signalCode!==null)return resolve();worker.once('exit',resolve);worker.kill('SIGKILL');});
      worker.postMessage({type:'start',options:config.options,checkerCount:plan.checkerCount,ignoreGpuLimit:config.ignoreGpuLimit});
    }
    worker.role=role;workers.add(worker);counts.set(worker,0);
    worker.on('message',data=>{
      if(data.type==='gpu-cpu'){gpuCpu=Math.max(gpuCpu,Number(data.microseconds)||0);return;}
      if(Number.isFinite(data.attempts))counts.set(worker,data.attempts);
      if(typeof data.address==='string')address=data.address;
      if(data.type==='gpu-ready')emit({type:'engine',gpu:true});
      if(data.type==='found')keepFound(worker,data.result);
      if(data.type==='gpu-limit'){warn('GPU-команда превысила безопасную длительность. Для явного разрешения: --ignore-gpu-limit.');gpuFailure();}
      if(data.type==='error'){
        if(data.code==='missing-gpu')warn('Установи модуль GPU: npm install --no-save --package-lock=false webgpu@0.6.2');
        if(role==='gpu'||role==='checker')gpuFailure();else{warn('Вычислительный поток остановился с ошибкой.');finish(1);}
      }
    });
    worker.on('error',()=>{if(!finishing){if(role==='gpu'||role==='checker')gpuFailure();else{warn('Не удалось запустить вычислительный поток.');finish(1);}}});
    worker.on('exit',code=>{workers.delete(worker);if(!finishing&&!winner){if(role==='gpu')gpuFailure();else if(code&&role==='cpu'){warn('Вычислительный поток завершился.');finish(1);}}});
    return worker;
  }
  try{
    try{os.setPriority(os.constants.priority.PRIORITY_BELOW_NORMAL);}catch{}
    emit({type:'start',engine:config.options.computeEngine,threads:config.threads,contract:config.options.contract,pattern:config.options.pattern});
    message(`GENERATOR TON USERNAME · ${config.options.contract} · ${config.options.computeEngine} · потоков: ${config.threads}\nШаблон: ${config.options.pattern}. Ctrl+C — остановить.`);
    for(let lane=0;lane<plan.cpuCount;lane++)spawn('cpu');
    if(plan.checkerCount)spawn('gpu');
    let reports=0;
    timer=setInterval(()=>{
      if(finishing||saving)return;
      const now=performance.now(),elapsed=now-cpuAt,currentCpu=process.cpuUsage(),cpus=os.cpus();
      let all=0,idle=0;for(let i=0;i<cpus.length;i++){const previous=systemStart[i]?.times||cpus[i].times;for(const key of Object.keys(previous))all+=cpus[i].times[key]-previous[key];idle+=cpus[i].times.idle-previous.idle;}
      const own=(currentCpu.user+currentCpu.system-cpuStart.user-cpuStart.system+gpuCpu-previousGpuCpu)/1000/Math.max(1,elapsed)/Math.max(1,cpus.length);
      const external=Math.max(0,(all>0?1-idle/all:0)-own),lag=Math.max(0,now-tickAt-1000);
      if(external>.85||lag>750)busyUntil=now+3000;
      paused=manualPaused||(config.options.performanceMode!=='max'&&now<busyUntil);
      const target=Math.min(config.cpuLoad,Math.max(.05,(config.cpuLoad-external)*cpus.length/config.threads))*(lag>200?.6:1);
      duty=config.options.performanceMode==='max'?config.cpuLoad:Math.max(.05,Math.min(target,duty+.1));
      for(const worker of workers)worker.postMessage({type:'control',paused,duty,gpuDuty:config.options.gpuDuty});
      cpuStart=currentCpu;previousGpuCpu=gpuCpu;cpuAt=now;systemStart=cpus;tickAt=now;
      const count=attempts(),elapsedMs=now-start,rate=rateMeter.update({running:true,attempts:count,elapsedMs,profile:{paused}},now),estimate=searchTimeEstimate(config.options,rate);
      const state={type:'progress',attempts:count,rate:Math.round(rate),elapsedMs:Math.round(elapsedMs),paused,cpuDuty:duty,address,...(estimate?{meanSeconds:estimate.mean,medianSeconds:estimate.median,p95Seconds:estimate.p95}:{})};
      if(config.json)emit(state);
      else if(process.stdout.isTTY||++reports%10===0){
        const text=`${count.toLocaleString('ru-RU')} проверок · ${paused?'пауза':Math.round(rate).toLocaleString('ru-RU')+' / с'} · в среднем ${estimate?estimateDuration(estimate.mean):'измеряем…'}`;
        process.stdout.write(process.stdout.isTTY?'\r\x1b[2K'+text:text+'\n');
      }
    },1000);
    if(config.duration)deadline=setTimeout(()=>finish(0),config.duration*1000);
  }catch{warn('Не удалось запустить поиск.');await finish(1);}
  return completed;
}
