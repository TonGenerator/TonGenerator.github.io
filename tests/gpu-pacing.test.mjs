import test from 'node:test';
import assert from 'node:assert/strict';
import { createGpuPacer, gpuPauseMs } from '../src/gpu-pacing.js';
import { packGpuPasswords } from '../src/gpu-bip39.js';

test('GPU work completes before real idle periods, supports live limits and stops long packets',async()=>{
  let clock=0,active=false,stopped=false;const idle=[];
  const pacer=createGpuPacer({dutyCycle:0.2,now:()=>clock,shouldStop:()=>stopped,wait:async ms=>{assert.equal(active,false);idle.push(ms);clock+=ms;}});
  await pacer.run(async()=>{active=true;clock+=5;await Promise.resolve();active=false;});
  assert.equal(idle.reduce((a,b)=>a+b,0),20);
  pacer.setDuty(0.5);idle.length=0;
  await pacer.run(async()=>{clock+=10;});
  assert.equal(idle.reduce((a,b)=>a+b,0),10);
  pacer.setDuty(0.9);idle.length=0;
  await pacer.run(async()=>{clock+=45;});
  assert.equal(idle.reduce((a,b)=>a+b,0),5);
  await assert.rejects(pacer.run(async()=>{clock+=101;}),/budget/);
  stopped=true;let executed=false;
  await assert.rejects(pacer.run(async()=>{executed=true;}),/cancelled/);
  assert.equal(executed,false);
  assert.equal(gpuPauseMs(5,1),0);
  pacer.setDuty(1);assert.equal(pacer.duty,1);
  assert.throws(()=>pacer.setDuty(1.01));
  assert.throws(()=>pacer.setDuty(0.049));
});

test('hidden or paused GPU submits nothing and cancellation wakes the pause loop',async()=>{
  let stopped=false,executed=false,waits=0;
  const pacer=createGpuPacer({shouldPause:()=>true,shouldStop:()=>stopped,wait:async ms=>{assert.equal(ms,100);waits++;stopped=true;}});
  await assert.rejects(pacer.run(async()=>{executed=true;}),/cancelled/);
  assert.equal(executed,false);assert.equal(waits,1);
});

test('a slow completed packet waits for an explicit override without being submitted twice',async()=>{
  let clock=0,ignore=false,limit=0,executions=0;
  const pacer=createGpuPacer({now:()=>clock,wait:async ms=>{clock+=ms;},shouldIgnoreBudget:()=>ignore,onBudgetExceeded:async ms=>{limit=ms;await Promise.resolve();ignore=true;}});
  await pacer.run(async()=>{executions++;clock+=120;});
  assert.equal(limit,120);assert.equal(executions,1);
  await pacer.run(async()=>{executions++;clock+=150;});
  assert.equal(limit,120);assert.equal(executions,2);
  let stopped=false;
  const cancelled=createGpuPacer({now:()=>clock,shouldStop:()=>stopped,onBudgetExceeded:async()=>{stopped=true;}});
  await assert.rejects(cancelled.run(async()=>{clock+=120;}),/cancelled/);
});

test('high GPU activity accumulates tiny idle periods instead of paying the browser timer clamp per packet',async()=>{
  let clock=0,waits=0,totalIdle=0;
  const pacer=createGpuPacer({dutyCycle:0.9,now:()=>clock,wait:async ms=>{assert.ok(ms>=4);waits++;totalIdle+=ms;clock+=ms;}});
  for(let i=0;i<90;i++)await pacer.run(async()=>{clock+=2;});
  assert.ok(totalIdle>=16&&totalIdle<=20);
  assert.ok(waits<=5);
  assert.ok(180/(180+totalIdle)>=0.9);
});

test('GPU password packing preserves big endian bytes and isolates adjacent phrases',()=>{
  const fixture='abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'.split(' ');
  const words=packGpuPasswords([fixture,fixture]);
  const bytes=new Uint8Array(256),view=new DataView(bytes.buffer);
  for(let i=0;i<words.length;i++)view.setUint32(i*4,words[i],false);
  const expected=new TextEncoder().encode(fixture.join(' '));
  assert.deepEqual(bytes.slice(0,expected.length),expected);
  assert.deepEqual(bytes.slice(128,128+expected.length),expected);
  assert.ok(bytes.slice(expected.length,128).every(value=>value===0));
  words.fill(0);bytes.fill(0);
  assert.throws(()=>packGpuPasswords([['wrong']]));
});
