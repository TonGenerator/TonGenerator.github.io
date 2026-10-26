import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { WalletContractV4, WalletContractV5R1, Address } from '@ton/ton';
import { createHasher, createSearchHasher, createMatcher, crc16, friendlyAddress, makeResult, matches, walletIdAt, patternProbability, SPACE, DEMO_KEY, validateOptions, defaultWalletId, customWalletId } from '../src/engine.js';

test('allocation-free cell hashing agrees with canonical hashing across all contracts, keys and ID boundaries', () => {
  const ids = [0, 1, 698983191, 2147450641, 2147483647, 2147483648, 4294967295, ...Array.from({length: 200}, () => randomBytes(4).readUInt32BE())];
  for (const contract of ['v4r2', 'v5r1', 'wallet-tg']) for (let keyIndex = 0; keyIndex < 8; keyIndex++) {
    const key = randomBytes(32), fast = createSearchHasher(key, contract), reference = createHasher(key, contract);
    for (const id of ids) assert.deepEqual(Buffer.from(fast(id)), Buffer.from(reference(id)));
  }
});

test('Tonkeeper import target rejects custom ID results and restores exact standard SDK addresses', () => {
  for (const contract of ['v4r2', 'v5r1']) for (const testOnly of [false, true]) {
    const key = randomBytes(32);
    const options = {publicKey:key.toString('hex'), contract, testOnly, bounceable:false, strategy:'standard', importTarget:'tonkeeper', pattern:'a', position:'suffix', caseSensitive:false};
    const id = defaultWalletId(contract, testOnly);
    assert.throws(() => makeResult(options, id + 1), /Tonkeeper/);
    assert.throws(() => makeResult({...options, strategy:'wallet-id'}, id), /Tonkeeper/);
    const sdk = contract === 'v4r2' ? WalletContractV4.create({workchain:0,publicKey:key})
      : WalletContractV5R1.create({publicKey:key, walletId:{networkGlobalId:testOnly ? -3 : -239}});
    assert.equal(makeResult(options,id).address, sdk.address.toString({bounceable:false,testOnly,urlSafe:true}));
  }
});

test('V4R2 raw and friendly addresses agree with TON SDK for uint32 boundaries and random keys', () => {
  const ids = [0, 1, 698983191, 2147483647, 2147483648, 4294967295, ...Array.from({ length: 30 }, () => randomBytes(4).readUInt32BE())];
  for (const id of ids) {
    const publicKey = randomBytes(32);
    const wallet = WalletContractV4.create({ workchain: 0, publicKey, walletId: id });
    const hash = createHasher(publicKey)(id);
    assert.equal(Buffer.from(hash).toString('hex'), wallet.address.hash.toString('hex'));
    for (const bounceable of [false, true]) for (const testOnly of [false, true]) {
      const addr = friendlyAddress(hash, { bounceable, testOnly });
      assert.equal(addr, wallet.address.toString({ bounceable, testOnly, urlSafe: true }));
      assert.ok(Address.parse(addr).equals(wallet.address));
    }
  }
});

test('worker lanes cover the entire uint32 range exactly with no duplicate wraparound', () => {
  for (const n of [1, 3, 4, 7, 16]) {
    const start = SPACE - 10;
    const offsets = new Set();
    let total = 0;
    for (let lane = 0; lane < n; lane++) {
      const count = Math.floor((SPACE - 1 - lane) / n) + 1;
      total += count;
      assert.ok(lane + (count - 1) * n < SPACE);
      assert.ok(lane + count * n >= SPACE);
      for (let step = 0; step < 100; step++) offsets.add(walletIdAt(start, lane, step, n));
    }
    assert.equal(total, SPACE);
    assert.equal(offsets.size, n * 100);
  }
});

test('matching, result export and probability respect position, case and demo mode', () => {
  const opts = { publicKey: DEMO_KEY, pattern: 'ab', position: 'suffix', caseSensitive: false, bounceable: false, testOnly: false };
  assert.ok(matches('UQxyzAB', 'ab', 'suffix', false));
  assert.ok(!matches('UQxyzAB', 'ab', 'suffix', true));
  assert.ok(matches('UQxyAb123', 'ab', 'prefix', false));
  assert.equal(patternProbability('a7', false), 2 / 4096);
  assert.equal(patternProbability('a7', true), 1 / 4096);
  assert.equal(makeResult(opts, 0).demo, true);
  assert.equal(makeResult(opts, 0).walletId, 0);
  assert.ok(!JSON.stringify(makeResult(opts, 0)).includes('secretKey'));
  assert.throws(() => validateOptions({ ...opts, publicKey: 'abandon '.repeat(24) }));
  assert.throws(() => validateOptions({ ...opts, pattern: '../' }));
});

test('table CRC16 agrees with independent bitwise CRC for random messages and the standard vector', () => {
  function reference(bytes) {
    let crc = 0;
    for (const byte of bytes) {
      crc ^= byte << 8;
      for (let bit = 0; bit < 8; bit++) crc = ((crc << 1) ^ ((crc & 0x8000) ? 0x1021 : 0)) & 0xffff;
    }
    return crc;
  }
  assert.equal(crc16(Buffer.from('123456789')), 0x31c3);
  for (const size of [0, 1, 2, 34, 35, 36, 100, 257]) {
    for (let i = 0; i < 20; i++) { const bytes = randomBytes(size); assert.equal(crc16(bytes), reference(bytes)); }
  }
});

test('fast hash matching agrees with SDK string matching across suffix CRC boundaries, case, formats and lengths', () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const publicKey = Buffer.from(DEMO_KEY, 'hex');
  const probes = [0, 1, 698983191, 2147483648, 4294967295, ...Array.from({ length: 25 }, () => randomBytes(4).readUInt32BE())];
  for (const walletId of probes) {
    const address = WalletContractV4.create({ publicKey, workchain: 0, walletId }).address;
    for (const bounceable of [false, true]) for (const testOnly of [false, true]) {
      const friendly = address.toString({ bounceable, testOnly, urlSafe: true });
      for (const position of ['suffix', 'prefix']) for (const caseSensitive of [false, true]) {
        for (let length = 1; length <= 8; length++) {
          const positive = position === 'suffix' ? friendly.slice(-length) : friendly.slice(4, 4 + length);
          const swapped = positive.replace(/[a-z]/gi, c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase());
          const negative = [...positive].map(c => alphabet[(alphabet.indexOf(c) + 13) % 64]).join('');
          for (const pattern of [positive, swapped, negative, '_FURRY'.slice(0, length)]) {
            const opts = { publicKey: DEMO_KEY, pattern, position, caseSensitive, bounceable, testOnly };
            assert.equal(createMatcher(opts)(address.hash), matches(friendly, pattern, position, caseSensitive), JSON.stringify({ walletId, ...opts }));
          }
        }
      }
    }
  }
});

test('V5R1 data bit layout and exported walletIdConfig agree with TON SDK for both networks and context boundaries', () => {
  for (const testOnly of [false, true]) {
    const networkGlobalId = testOnly ? -3 : -239;
    for (const context of [0, 1, 32767, 32768, 2147483647, ...Array.from({ length: 20 }, () => randomBytes(4).readUInt32BE() >>> 1)]) {
      const publicKey = randomBytes(32);
      const id = customWalletId('v5r1', context, testOnly);
      const wallet = WalletContractV5R1.create({ publicKey, walletId: { networkGlobalId, context } });
      assert.equal(Buffer.from(createHasher(publicKey, 'v5r1')(id)).toString('hex'), wallet.address.hash.toString('hex'));
      for (const bounceable of [false, true]) {
        const options = { publicKey: publicKey.toString('hex'), pattern: 'a', position: 'suffix', caseSensitive: false, bounceable, testOnly, contract: 'v5r1', strategy: 'wallet-id' };
        const result = makeResult(options, id);
        assert.equal(result.address, wallet.address.toString({ bounceable, testOnly, urlSafe: true }));
        assert.deepEqual(result.walletIdConfig, { networkGlobalId, context });
      }
    }
    const publicKey = randomBytes(32);
    const id = defaultWalletId('v5r1', testOnly);
    const opts = { publicKey: publicKey.toString('hex'), pattern: 'a', position: 'suffix', caseSensitive: false, bounceable: false, testOnly, contract: 'v5r1', strategy: 'standard' };
    const result = makeResult(opts, id);
    const sdk = WalletContractV5R1.create({ publicKey, walletId: result.walletIdConfig });
    assert.equal(result.address, sdk.address.toString({ bounceable: false, testOnly, urlSafe: true }));
    assert.equal(id, testOnly ? 2147483645 : 2147483409);
  }
});
test('one hash is matched against every target, including a match that is not the first target',()=>{
 for(const position of ['suffix','prefix'])for(const caseSensitive of [false,true])for(let i=0;i<60;i++){
  const hash=randomBytes(32),base={pattern:'________',position,caseSensitive,bounceable:false,testOnly:false},address=friendlyAddress(hash,base);
  const actual=position==='suffix'?address.slice(-4):address.slice(4,8),patterns=['________',actual,actual.slice(-2)];
  const options={...base,patterns},matcher=createMatcher(options);
  assert.equal(matcher(hash),true);assert.equal(matcher(Buffer.alloc(32)),patterns.some(pattern=>matches(friendlyAddress(Buffer.alloc(32),base),pattern,position,caseSensitive)));
  assert.equal(matcher(hash),true); // Shared CRC cache must reset between hashes.
 }
 const options={publicKey:DEMO_KEY,pattern:'________',position:'suffix',caseSensitive:true,bounceable:false,testOnly:false};
 const address=makeResult(options,0).address,pattern=address.slice(-4),result=makeResult({...options,patterns:['________',pattern,pattern.slice(-2)]},0);
 assert.equal(result.pattern,pattern);assert.deepEqual(result.matchedPatterns,[pattern,pattern.slice(-2)]);
});
