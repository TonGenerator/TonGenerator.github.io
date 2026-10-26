import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';const require=createRequire(import.meta.url);const {OwnCpuMeter}=require('../desktop/cpu-meter.cjs');
const row=(pid,time,creationTime=1)=>({pid,creationTime,cpu:{cumulativeCPUUsage:time,percentCPUUsage:80}});
test('native CPU accounting subtracts generator CPU in system-wide units, independent of percent API normalization',()=>{
 const meter=new OwnCpuMeter();assert.equal(meter.sample([row(1,10),row(2,20)],1000,24),0);
 const own=meter.sample([row(1,16),row(2,26)],2000,24);assert.equal(own,.5);assert.ok(Math.abs(Math.max(0,.55-own)-.05)<1e-9);
});
test('CPU samples use elapsed time and do not mistake old CPU time or a reused PID for current load',()=>{
 const meter=new OwnCpuMeter();meter.sample([row(1,10)],1000,4);assert.equal(meter.sample([row(1,14),row(2,200)],3000,4),.5);
 assert.equal(meter.sample([row(1,300,2)],4000,4),0);
});
test('missing, reset and invalid CPU counters are conservative and never produce negative load',()=>{
 const meter=new OwnCpuMeter();meter.sample([row(1,100)],1000,4);assert.equal(meter.sample([row(1,1),row(2,NaN),{pid:3,cpu:{percentCPUUsage:99}}],2000,4),0);assert.equal(meter.sample([row(1,3)],2000,4),0);assert.equal(meter.sample([row(1,300)],3000,4),1);
});
