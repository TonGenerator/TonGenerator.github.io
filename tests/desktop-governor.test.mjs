import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';const require=createRequire(import.meta.url);const {Governor}=require('../desktop/governor.cjs');
const base={threads:24,logicalThreads:24,gpuLimit:.9,monitorFresh:true,onBattery:false,idleSeconds:600,externalCpu:0,externalGpu:0};
const settle=(g,input=base,start=100000)=>{let p;for(let i=0;i<20;i++)p=g.decide(input,start+i*1000);return p;};
test('Windows governor stops for games, fullscreen, stale monitor, battery, manual pause and extreme pressure',()=>{
 for(const extra of [{game:true},{fullscreen:true},{monitorFresh:false},{onBattery:true},{manualPause:true},{suspended:true},{externalGpu:.9},{externalCpu:.9},{loopLagMs:900}]){const p=new Governor().decide({...base,...extra},100000);assert.equal(p.paused,true);assert.equal(p.cpuThreads,0);}
});
test('ordinary PC use reaches the GPU cap without waiting for idle and leaves CPU headroom',()=>{
 const p=settle(new Governor(),{...base,idleSeconds:0});assert.equal(p.paused,false);assert.equal(p.gpuDuty,.9);assert.equal(p.cpuThreads,22);assert.ok(p.cpuThreads*p.cpuDuty<=24*.85+.0001);assert.ok(p.cpuDuty>.9);
 const idle=settle(new Governor());assert.equal(idle.cpuThreads,24);assert.ok(Math.abs(idle.cpuDuty-.95)<1e-9);
});
test('governor gives CPU and GPU capacity back independently, immediately, and recovers gradually',()=>{
 const g=new Governor(),fast=settle(g);
 const cpuBusy=g.decide({...base,externalCpu:.6},120000);assert.equal(cpuBusy.paused,false);assert.ok(cpuBusy.cpuDuty<fast.cpuDuty*.5);assert.equal(cpuBusy.gpuDuty,.9);
 const gpuBusy=g.decide({...base,externalGpu:.55},121000);assert.equal(gpuBusy.paused,false);assert.ok(gpuBusy.gpuDuty<.4);assert.ok(gpuBusy.cpuDuty<=cpuBusy.cpuDuty+.08001);
 const recovery=g.decide(base,122000);assert.ok(recovery.gpuDuty<=gpuBusy.gpuDuty+.08001);
});
test('an ordinary browser GPU load reduces only the required capacity instead of pausing search',()=>{
 const p=settle(new Governor(),{...base,idleSeconds:0,externalGpu:.267});assert.equal(p.paused,false);assert.ok(p.gpuDuty>.6);assert.ok(p.gpuDuty<.7);
});
test('GPU mode keeps checker ports active but leaves the same CPU capacity for other apps',()=>{
 const p=settle(new Governor(),{...base,computeEngine:'gpu',idleSeconds:0});assert.equal(p.cpuThreads,24);assert.ok(Math.abs(p.cpuDuty-.85)<1e-9);
});
test('governor waits after a game and ramps up within the user limits',()=>{
 const g=new Governor();settle(g);assert.equal(g.decide({...base,game:true},120000).paused,true);assert.equal(g.decide(base,139999).paused,true);
 const p=g.decide({...base,gpuLimit:.3},140001);assert.equal(p.paused,false);assert.ok(p.gpuDuty<=.3);assert.ok(p.cpuDuty<=.26);
 for(let i=0;i<20;i++){const value=g.decide({...base,threads:3,gpuLimit:.3},141000+i*1000);assert.ok(value.cpuThreads<=3);assert.ok(value.gpuDuty<=.3);}
});
test('short system load spikes use a short cooldown; lag reduces load immediately',()=>{
 const g=new Governor();settle(g);const slower=g.decide({...base,loopLagMs:300},120000);assert.ok(slower.cpuDuty<.4);assert.ok(slower.gpuDuty<.4);
 assert.equal(g.decide({...base,externalCpu:.9},121000).paused,true);assert.equal(g.decide(base,123999).paused,true);assert.equal(g.decide(base,124000).paused,false);
});
test('limits remain valid for small CPUs, a low GPU cap and repeated immediate control updates',()=>{
 for(const logicalThreads of [1,2,4,24]){const g=new Governor();let p=settle(g,{...base,threads:logicalThreads,logicalThreads,gpuLimit:.05,idleSeconds:0});assert.ok(p.cpuThreads>=1&&p.cpuThreads<=logicalThreads);assert.equal(p.gpuDuty,.05);const before=p.cpuDuty;for(let i=0;i<100;i++)p=g.decide({...base,threads:logicalThreads,logicalThreads,gpuLimit:.05,idleSeconds:0},119000);assert.equal(p.cpuDuty,before);const slow=g.decide({...base,gpuLimit:.05,loopLagMs:300},120000);assert.equal(slow.gpuDuty,.05);}
});
test('healthy disk activity keeps searching; saturated disks with high latency pause briefly',()=>{
 const g=new Governor();assert.equal(settle(g,{...base,diskBusy:.96,diskLatencyMs:2}).paused,false);
 const pressure=g.decide({...base,diskBusy:.99,diskLatencyMs:120},120000);assert.equal(pressure.paused,true);assert.match(pressure.reason,/Диск/);
 assert.equal(g.decide({...base,diskBusy:.5,diskLatencyMs:1},122000).paused,true);assert.equal(g.decide(base,123001).paused,false);
});
test('MAX uses the full budget despite external work but still respects manual pause and sleep',()=>{
 const max={...base,performanceMode:'max',game:true,fullscreen:true,monitorFresh:false,onBattery:true,externalGpu:1,externalCpu:1,diskBusy:1,diskLatencyMs:300,loopLagMs:2000};
 const p=new Governor().decide(max,100000);assert.equal(p.paused,false);assert.equal(p.cpuThreads,24);assert.equal(p.cpuDuty,1);assert.equal(p.gpuDuty,1);
 for(const extra of [{manualPause:true},{suspended:true}])assert.equal(new Governor().decide({...max,...extra},100000).paused,true);
});
