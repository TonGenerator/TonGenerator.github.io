const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
class Governor {
  constructor(){this.lastBusy=0;this.busyUntil=0;this.sampleAt=null;this.cpuDuty=.5;this.gpuDuty=.25;}
  decide(input, now=Date.now()) {
    const elapsed=this.sampleAt===null?1:clamp((now-this.sampleAt)/1000,0,2);this.sampleAt=now;
    const max=clamp(Math.floor(input.threads||4),1,256),logical=clamp(Math.floor(input.logicalThreads||max),1,256);
    const gpuLimit=clamp(input.gpuLimit||.9,.05,.9);
    const hold=(reason)=>{this.cpuDuty=.25;this.gpuDuty=.1;return {paused:true,cpuThreads:0,cpuDuty:.05,gpuDuty:.05,reason};};
    if(input.manualPause)return hold('Пауза вручную');
    if(input.suspended)return hold('Компьютер спит');
    if(input.performanceMode==='max'){this.cpuDuty=1;this.gpuDuty=1;return {paused:false,cpuThreads:max,cpuDuty:1,gpuDuty:1,reason:'MAX · полная мощность, автоснижение отключено'};}
    if(!input.monitorFresh)return hold('Ожидаем данные Windows');
    if(input.onBattery)return hold('Работа от батареи');
    const cpu=clamp(input.externalCpu||0,0,1),gpu=clamp(input.externalGpu||0,0,1),lag=Math.max(0,input.loopLagMs||0);
    const disk=clamp(input.diskBusy||0,0,1),diskLatency=Math.max(0,input.diskLatencyMs||0);
    if(input.game||input.fullscreen){this.lastBusy=now;return hold(input.game?'Обнаружена игра':'Полноэкранное приложение');}
    if(cpu>.85||gpu>.85||lag>750){this.busyUntil=now+3000;return hold(lag>750?'Восстанавливаем отзывчивость ПК':'Компьютер занят');}
    if(disk>=.98&&diskLatency>=50){this.busyUntil=now+3000;return hold('Диск перегружен — освобождаем ресурсы');}
    if((this.lastBusy&&now-this.lastBusy<20000)||now<this.busyUntil)return hold('Даём компьютеру освободиться');
    // Input activity reserves CPU capacity, but no longer forces a slow preset.
    const active=(input.idleSeconds||0)<10;
    const reserve=active?Math.min(2,Math.floor(logical/4)):0;
    // GPU checkers share a batch: keep their ports alive and regulate their duty instead.
    const cpuThreads=input.computeEngine==='gpu'?Math.min(max,32):Math.max(1,Math.min(max,logical-reserve));
    const cpuTarget=clamp(((active?.85:.95)-cpu)*logical/cpuThreads,.05,1);
    const gpuTarget=clamp(.92-gpu,.05,gpuLimit);
    // A late control tick is a pressure signal, not a measurement of another app's FPS.
    const diskPressure=disk>.8&&diskLatency>30;
    const responsiveness=lag>250?.4:lag>80||diskPressure?.7:1;
    const approach=(current,target)=>target<current?target:Math.min(target,current+.08*elapsed);
    this.cpuDuty=approach(this.cpuDuty,cpuTarget*responsiveness);
    this.gpuDuty=approach(this.gpuDuty,clamp(gpuTarget*responsiveness,.05,gpuLimit));
    return {paused:false,cpuThreads,cpuDuty:this.cpuDuty,gpuDuty:this.gpuDuty,
      reason:responsiveness<1?'Снижаем нагрузку для отзывчивости':cpu>.2||gpu>.15?'Освобождаем ресурсы для других программ':'Максимум доступной скорости'};
  }
}
module.exports={Governor};
