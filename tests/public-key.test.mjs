import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { keyPairFromSeed } from '@ton/crypto';
import { publicKeyFromSeed } from '../src/public-key.js';

test('accelerated Ed25519 public-key extraction agrees with canonical SDK for edge and random seeds', async () => {
  const seeds = [Buffer.alloc(32), Buffer.alloc(32, 255), ...Array.from({ length: 32 }, () => randomBytes(32))];
  try {
    for (const seed of seeds) {
      const reference = keyPairFromSeed(seed);
      try { assert.deepEqual(await publicKeyFromSeed(seed), reference.publicKey); }
      finally { reference.secretKey.fill(0); reference.publicKey.fill(0); }
    }
  } finally { seeds.forEach(seed => seed.fill(0)); }
});
