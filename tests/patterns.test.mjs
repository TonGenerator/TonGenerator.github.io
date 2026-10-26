import test from 'node:test';import assert from 'node:assert/strict';
import {parsePatterns,advanceQueue,patternsProbability} from '../src/patterns.js';
import {DONATION_ADDRESS} from '../src/donate.js';
import {Address} from '@ton/core';
test('multiple patterns are validated and deduplicated according to case mode',()=>{
 assert.deepEqual(parsePatterns('_GAY, _LOX\n_GAY;ton'),['_GAY','_LOX','ton']);
 assert.deepEqual(parsePatterns('_gay, _GAY',false),['_gay']);
 for(const value of ['', '0123456789','слово','<script>',Array.from({length:33},(_,i)=>'p'+i)])assert.throws(()=>parsePatterns(value));
});
test('simultaneous targets can finish in any order and overlapping matches complete together',()=>{
 const first={patterns:['_GAY','_LOX'],index:0,completed:[],active:true};
 const second=advanceQueue(first,'_LOX');assert.equal(second.index,1);assert.equal(second.active,true);assert.deepEqual(second.remaining,['_GAY']);
 assert.equal(advanceQueue(second,'_LOX'),second);assert.equal(advanceQueue(second,'_GAY').active,false);
 const both=advanceQueue({patterns:['_GAY','GAY'],index:0,completed:[],active:true},['_GAY','GAY']);assert.equal(both.index,2);assert.equal(both.active,false);
});
test('combined probability counts overlapping endings only once',()=>{
 assert.equal(patternsProbability(['_GAY','_LOX'],true),2/64**4);
 assert.equal(patternsProbability(['a','ba'],true,'suffix'),1/64);
 assert.equal(patternsProbability(['a','ab'],true,'prefix'),1/64);
 assert.equal(patternsProbability(['a','ab'],true,'suffix'),1/64+1/64**2);
 assert.equal(patternsProbability(['a','A','ba'],false,'suffix'),2/64);
});
test('donation button keeps the supplied valid TON mainnet address exactly',()=>{
 assert.equal(DONATION_ADDRESS,'UQAytQZrFxKtSxkfYB5N8up9UPpns72gZJffWEXPl1JT_GAY');assert.equal(Address.parse(DONATION_ADDRESS).toString({bounceable:false}),DONATION_ADDRESS);
});
