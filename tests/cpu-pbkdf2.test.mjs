import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { cpuPbkdf2 } from '../src/cpu-pbkdf2.js';

test('worker-local WASM PBKDF2-SHA512 agrees with independent OpenSSL for boundaries, random inputs and BIP39 iteration count', async () => {
  for (const length of [0, 1, 7, 64, 107, 127, 128]) for (const rounds of [1, 2, 2048]) {
    const password = randomBytes(length), salt = randomBytes(length % 17);
    let actual, expected;
    try {
      expected = pbkdf2Sync(password, salt, rounds, 64, 'sha512');
      actual = await cpuPbkdf2(password, salt, rounds);
      assert.deepEqual(Buffer.from(actual), expected);
    } finally { password.fill(0); salt.fill(0); actual?.fill(0); expected?.fill(0); }
  }
});

test('CPU PBKDF2 rejects inputs outside the bounded allocation', async () => {
  await assert.rejects(cpuPbkdf2(new Uint8Array(129), new Uint8Array(8)));
  await assert.rejects(cpuPbkdf2(new Uint8Array(12), new Uint8Array(125)));
  await assert.rejects(cpuPbkdf2(new Uint8Array(12), new Uint8Array(8), 0));
});
