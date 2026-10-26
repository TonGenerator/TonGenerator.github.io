import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { createHasher, createStandardKeyHasher, defaultWalletId } from '../src/engine.js';

test('mutable-key standard hasher agrees with independent canonical cell hashing after repeated key changes',()=>{
  for(const contract of ['v4r2','v5r1','wallet-tg'])for(const testOnly of [false,true]){
    const hash=createStandardKeyHasher(contract,testOnly);
    const keys=[Buffer.alloc(32),Buffer.alloc(32,255),...Array.from({length:64},()=>randomBytes(32))];
    for(const key of [...keys,...keys.slice().reverse()])assert.deepEqual(hash(key),createHasher(key,contract)(defaultWalletId(contract,testOnly)));
    assert.throws(()=>hash(new Uint8Array(31)));
  }
});
