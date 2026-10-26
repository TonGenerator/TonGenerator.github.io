import sodium from 'libsodium-wrappers-sumo';

// PBKDF2-HMAC-SHA512, one 64-byte block. Each worker owns its local WASM
// instance, so this avoids Chromium's shared WebCrypto derivation queue.
// Keep the password's initialized HMAC state and clone it for U1..Uc.
let ready;
export async function cpuPbkdf2(password, salt, iterations = 2048) {
  if (!(password instanceof Uint8Array) || password.length > 128 ||
      !(salt instanceof Uint8Array) || salt.length > 124 ||
      !Number.isInteger(iterations) || iterations < 1 || iterations > 100000) throw new Error('Invalid CPU PBKDF2 input');
  ready ??= sodium.ready;
  await ready;
  const raw = sodium.libsodium;
  const stateSize = raw._crypto_auth_hmacsha512_statebytes();
  const size = stateSize * 2 + 384;
  const base = raw._malloc(size);
  if (!base) throw new Error('CPU PBKDF2 allocation failed');
  const state = base + stateSize, key = state + stateSize;
  const input = key + 128, output = input + 128, total = output + 64;
  try {
    const heap = raw.HEAPU8;
    heap.fill(0, base, base + size);
    heap.set(password, key);
    if (raw._crypto_auth_hmacsha512_init(base, key, password.length) !== 0) throw new Error('CPU HMAC initialization failed');
    heap.set(salt, input); heap[input + salt.length + 3] = 1;
    heap.copyWithin(state, base, base + stateSize);
    if (raw._crypto_auth_hmacsha512_update(state, input, salt.length + 4) !== 0 ||
        raw._crypto_auth_hmacsha512_final(state, output) !== 0) throw new Error('CPU HMAC failed');
    heap.copyWithin(total, output, output + 64);
    const totalWords = new Uint32Array(heap.buffer, total, 16);
    const outputWords = new Uint32Array(heap.buffer, output, 16);
    for (let round = 1; round < iterations; round++) {
      heap.copyWithin(state, base, base + stateSize);
      if (raw._crypto_auth_hmacsha512_update(state, output, 64) !== 0 ||
          raw._crypto_auth_hmacsha512_final(state, output) !== 0) throw new Error('CPU HMAC failed');
      for (let j = 0; j < 16; j++) totalWords[j] ^= outputWords[j];
    }
    return heap.slice(total, total + 64);
  } finally {
    raw.HEAPU8.fill(0, base, base + size);
    raw._free(base);
  }
}
