// Dawn lives in a process, not a worker: terminating a worker during native
// adapter initialization can abort the entire Node host on some drivers.
import {Worker,MessageChannel} from 'node:worker_threads';
import {searchGpuWallet} from '../src/gpu-wallet-search.js';
let started=false,stopped=false,paused=false,duty=.5,gpuDuty=.2,gpu=null,words=null;
const checkers=[];
const send=value=>{if(process.connected)process.send(value);};
const heartbeat=setInterval(()=>{const cpu=process.cpuUsage();send({type:'gpu-cpu',microseconds:cpu.user+cpu.system});},1000);
process.on('disconnect',()=>process.exit(0));
process.on('message',message=>{
  if(message.type==='stop'){stopped=true;paused=false;gpu?.cancel();}
  if(message.type==='control'){paused=!!message.paused;duty=message.duty;gpuDuty=message.gpuDuty;gpu?.setDuty(gpuDuty);for(const checker of checkers)checker.postMessage(message);}
  if(message.type==='reveal'&&words)send({type:'revealed',words:[...words]});
  if(message.type==='discard'){words?.fill('');words=null;clearInterval(heartbeat);process.exit(0);}
  if(message.type==='start'&&!started){started=true;run(message).catch(()=>{send({type:'error',code:'gpu-failed'});clearInterval(heartbeat);process.exitCode=1;for(const checker of checkers)checker.terminate();process.disconnect();});}
});
async function run(config){
  let module;try{module=await import('webgpu');}catch{send({type:'error',code:'missing-gpu'});clearInterval(heartbeat);process.disconnect();return;}
  Object.assign(globalThis,module.globals);Object.defineProperty(globalThis,'navigator',{value:{gpu:module.create([])},configurable:true});
  gpuDuty=config.options.gpuDuty;
  const ports=[];
  for(let i=0;i<config.checkerCount;i++){
    const channel=new MessageChannel();ports.push(channel.port1);
    const worker=new Worker(new URL('./worker.mjs',import.meta.url),{workerData:{role:'checker',options:config.options,port:channel.port2},transferList:[channel.port2]});
    worker.on('error',()=>{send({type:'error',code:'worker-failed'});stopped=true;gpu?.cancel();});checkers.push(worker);
  }
  const found=await searchGpuWallet(config.options,ports,send,{shouldStop:()=>stopped,shouldPause:()=>paused,shouldIgnoreBudget:()=>config.ignoreGpuLimit,getDuty:()=>gpuDuty,attach:value=>{gpu=value;}});
  if(found){words=found.words;send({type:'found',attempts:found.attempts,result:found.result});}
  else{send({type:'stopped'});clearInterval(heartbeat);process.disconnect();}
}
