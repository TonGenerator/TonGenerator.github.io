import { performance } from 'node:perf_hooks';
import { createHasher, createMatcher, friendlyAddress, matches, DEMO_KEY } from '../src/engine.js';

// Original implementation, retained here only for a reproducible before/after benchmark.
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function originalAddress(hash, opts) {
  const bytes = new Uint8Array(36);
  bytes[0] = (opts.bounceable ? 0x11 : 0x51) | (opts.testOnly ? 0x80 : 0);
  bytes.set(hash, 2);
  let crc = 0;
  for (let i = 0; i < 34; i++) {
    crc ^= bytes[i] << 8;
    for (let j = 0; j < 8; j++) crc = ((crc << 1) ^ ((crc & 0x8000) ? 0x1021 : 0)) & 0xffff;
  }
  bytes[34] = crc >>> 8; bytes[35] = crc & 255;
  let result = '';
  for (let i = 0; i < 36; i += 3) {
    const value = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    result += alphabet[value >>> 18] + alphabet[(value >>> 12) & 63] + alphabet[(value >>> 6) & 63] + alphabet[value & 63];
  }
  return result;
}
const scenarios = [
  { pattern: '_FURRY', caseSensitive: true, position: 'suffix' },
  { pattern: 'cafe', caseSensitive: false, position: 'suffix' },
  { pattern: 'a', caseSensitive: false, position: 'suffix' },
];
const count = 120000;
function median(values) { const sorted = [...values].sort((a, b) => a - b); return (sorted[1] + sorted[2]) / 2; }
for (const scenario of scenarios) {
  const opts = { ...scenario, publicKey: DEMO_KEY, bounceable: true, testOnly: false };
  const hash = createHasher(DEMO_KEY), fast = createMatcher(opts);
  let referenceFound = 0, optimizedFound = 0;
  const before = [], after = [];
  for (let i = 0; i < 10000; i++) { fast(hash(i)); matches(originalAddress(hash(i), opts), opts.pattern, opts.position, opts.caseSensitive); }
  for (let round = 0; round < 4; round++) {
    for (const mode of round % 2 ? ['after', 'before'] : ['before', 'after']) {
      const start = performance.now(); let found = 0;
      for (let i = 0; i < count; i++) {
        const digest = hash(i);
        if (mode === 'before' ? matches(originalAddress(digest, opts), opts.pattern, opts.position, opts.caseSensitive) : fast(digest)) {
          found++;
          if (mode === 'after') friendlyAddress(digest, opts);
        }
      }
      (mode === 'before' ? before : after).push(count / (performance.now() - start) * 1000);
      if (mode === 'before') referenceFound += found; else optimizedFound += found;
    }
  }
  if (referenceFound !== optimizedFound) throw new Error('Benchmark results differ');
  console.log(JSON.stringify({ pattern: opts.pattern, baselinePerSecond: Math.round(median(before)), optimizedPerSecond: Math.round(median(after)), speedup: +(median(after) / median(before)).toFixed(2), matches: referenceFound }));
}
