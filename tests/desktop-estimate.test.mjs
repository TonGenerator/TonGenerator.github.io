import test from 'node:test';import assert from 'node:assert/strict';
import {searchTimeEstimate,estimateDuration,SearchRate} from '../desktop/client.js';
test('vanity ETA gives a mean and exact geometric 50% / 95% quantiles for the requested pattern',()=>{
 const rate=13000,p=1/64**6,result=searchTimeEstimate({pattern:'_FURRY',caseSensitive:true},rate);
 assert.equal(result.mean,64**6/rate);
 for(const [chance,seconds] of [[.5,result.median],[.95,result.p95]]){const trials=Math.round(seconds*rate);assert.ok(-Math.expm1(trials*Math.log1p(-p))>=chance);assert.ok(-Math.expm1((trials-1)*Math.log1p(-p))<chance);}
 assert.equal(searchTimeEstimate({pattern:'A_7',caseSensitive:false},1).mean,64**3/2);
 assert.equal(searchTimeEstimate({pattern:'A_7',caseSensitive:true},1).mean,64**3);
});
test('ETA never invents a time for no throughput or invalid input; short and very long times are readable',()=>{
 for(const rate of [0,-1,NaN,Infinity])assert.equal(searchTimeEstimate({pattern:'ton'},rate),null);
 for(const pattern of ['', '💎', '123456789'])assert.equal(searchTimeEstimate({pattern},100),null);
 assert.equal(estimateDuration(.5),'< 1 сек');assert.equal(estimateDuration(60),'≈1 мин');assert.equal(estimateDuration(3600),'≈1 ч');assert.equal(estimateDuration(86400),'≈1 дн');assert.equal(estimateDuration(31557600),'≈1 г.');assert.equal(estimateDuration(Infinity),'—');
});
const state=(attempts,elapsedMs,extra={})=>({running:true,attempts,elapsedMs,profile:{paused:false},...extra});
test('current speed follows the recent ten seconds instead of a lifetime average',()=>{
 const meter=new SearchRate();for(let i=0;i<=10;i++)meter.update(state(i*100,i*1000),i*1000);
 let rate;for(let i=11;i<=20;i++)rate=meter.update(state(1000+(i-10)*200,i*1000),i*1000);
 assert.equal(rate,200);
});
test('a pause, stopped search, restart or disconnected UI clears stale speed estimates',()=>{
 for(const interruption of [state(1000,5000,{profile:{paused:true}}),state(1000,5000,{running:false}),state(0,0),state(1000,5000)]){
  const meter=new SearchRate();meter.update(state(100,1000),1000);assert.equal(meter.update(state(300,3000),3000),100);
  const now=interruption.running&&interruption.attempts===1000&&!interruption.profile.paused?10000:4000;
  assert.equal(meter.update(interruption,now),0);assert.equal(meter.update(state(1500,15000),now+1000),0);assert.equal(meter.update(state(1700,17000),now+3000),100);
 }
});
