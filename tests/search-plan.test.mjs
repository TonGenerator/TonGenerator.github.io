import test from 'node:test';
import assert from 'node:assert/strict';
import { createSearchPlan, desktopSearchThreadLimit } from '../src/search-plan.js';
test('MAX reserves almost the entire CPU budget for GPU checking instead of splitting it in half',()=>{
 const plan=createSearchPlan('hybrid',24,'max');assert.equal(plan.cpuCount,1);assert.equal(plan.checkerCount,23);assert.equal(plan.cpuCount+plan.checkerCount,24);
 for(const threads of [2,4,24,64]){const value=createSearchPlan('hybrid',threads,'max');assert.ok(value.checkerCount<=32);assert.equal(value.cpuCount+value.checkerCount,threads);}
});

test('desktop hybrid control reserves CPU capacity including GPU checkers',()=>{
  const plan=createSearchPlan('hybrid',24),budget=22;
  const allowed=Math.min(plan.cpuCount,desktopSearchThreadLimit(budget,plan.checkerCount));
  assert.equal(allowed,10);assert.equal(allowed+plan.checkerCount,budget);
  assert.equal(desktopSearchThreadLimit(24,0),24);assert.equal(desktopSearchThreadLimit(2,12),0);
});

test('hybrid search gives CPU and GPU distinct progress lanes within the CPU thread budget',()=>{
  for(const threads of [2,4,8,16,24,64,256]) {
    const plan=createSearchPlan('hybrid',threads);
    assert.equal(plan.cpuCount+plan.checkerCount,threads);
    assert.equal(plan.checkerCount,Math.min(32,Math.max(1,Math.floor(threads/2))));
    assert.equal(plan.gpuLane,plan.cpuCount);
    assert.equal(plan.laneCount,plan.cpuCount+1);
    const counts=Array(plan.laneCount).fill(0);
    for(let lane=0;lane<plan.cpuCount;lane++)counts[lane]=17;
    counts[plan.gpuLane]=512;
    assert.equal(counts.reduce((a,b)=>a+b,0),17*plan.cpuCount+512);
  }
});

test('CPU never starts GPU; GPU uses only its checker threads; invalid plans are rejected',()=>{
  assert.deepEqual(createSearchPlan('cpu',8),{cpuCount:8,checkerCount:0,gpuLane:null,laneCount:8});
  assert.deepEqual(createSearchPlan('gpu',8),{cpuCount:0,checkerCount:8,gpuLane:0,laneCount:1});
  assert.deepEqual(createSearchPlan('gpu',1),{cpuCount:0,checkerCount:1,gpuLane:0,laneCount:1});
  assert.equal(createSearchPlan('cpu',24).cpuCount,24);
  for(const args of [['hybrid',1],['hybrid',0],['hybrid',257],['cpu',1.5],['other',8]])assert.throws(()=>createSearchPlan(...args));
});
