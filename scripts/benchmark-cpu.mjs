import { createHasher, createSearchHasher, createMatcher, DEMO_KEY } from '../src/engine.js';
const count = 200000;
const options = {contract:'v4r2', strategy:'wallet-id', pattern:'_FURRY', position:'suffix', caseSensitive:true, bounceable:false, testOnly:false};
const matcher = createMatcher(options);
const results = {};
for (const [name, factory] of [['previous', createHasher], ['reused', createSearchHasher]]) {
  const hash = factory(DEMO_KEY, options.contract);
  for (let i = 0; i < 10000; i++) matcher(hash(i));
  const begin = performance.now(); let matches = 0;
  for (let i = 0; i < count; i++) if (matcher(hash(i))) matches++;
  results[name] = {addressesPerSecond: Math.round(count * 1000 / (performance.now() - begin)), matches};
}
if (results.previous.matches !== results.reused.matches) throw new Error('CPU benchmark mismatch');
console.log(JSON.stringify({threads:1, count, ...results}));
