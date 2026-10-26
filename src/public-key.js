import { keyPairFromSeed, mnemonicToSeed } from '@ton/crypto';

let nativeSupported;
let sodiumPromise;
const prefix = Uint8Array.from([0x30, 0x2e, 2, 1, 0, 0x30, 5, 6, 3, 0x2b, 0x65, 0x70, 4, 0x22, 4, 0x20]);

function sdkPublicKey(seed) {
  const pair = keyPairFromSeed(seed);
  pair.secretKey.fill(0);
  return pair.publicKey;
}

async function sodiumModule() {
  sodiumPromise ??= import('libsodium-wrappers-sumo').then(async module => {
    const sodium = module.default; await sodium.ready; return sodium;
  }).catch(() => null);
  return sodiumPromise;
}

// Native Ed25519 removes the slow JavaScript scalar multiplication. The
// temporary private JWK is never posted or logged; only its public x is used.
export async function publicKeyFromSeed(seed) {
  if (seed.length !== 32) throw new Error('Expected a 32-byte Ed25519 seed');
  const sodium = await sodiumModule();
  if (sodium) {
    const pair = sodium.crypto_sign_seed_keypair(seed);
    try { return Buffer.from(pair.publicKey); }
    finally { pair.privateKey.fill(0); pair.publicKey.fill(0); }
  }
  if (nativeSupported !== false && crypto.subtle) {
    const der = new Uint8Array(48); der.set(prefix); der.set(seed, 16);
    let jwk;
    try {
      const privateKey = await crypto.subtle.importKey('pkcs8', der, 'Ed25519', true, ['sign']);
      jwk = await crypto.subtle.exportKey('jwk', privateKey);
      if (jwk.crv !== 'Ed25519' || typeof jwk.x !== 'string') throw new Error('Unsupported Ed25519 export');
      const publicKey = Buffer.from(jwk.x.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
      if (publicKey.length !== 32) throw new Error('Invalid Ed25519 public key');
      if (nativeSupported === undefined) {
        const reference = sdkPublicKey(seed);
        const valid = publicKey.every((byte, index) => byte === reference[index]);
        reference.fill(0);
        if (!valid) { publicKey.fill(0); throw new Error('Ed25519 self-test failed'); }
      }
      nativeSupported = true;
      return publicKey;
    } catch { nativeSupported = false; }
    finally { der.fill(0); if (jwk) { jwk.d = ''; jwk.x = ''; } }
  }
  return sdkPublicKey(seed);
}

export async function tonMnemonicToPublicKey(words) {
  const seed = await mnemonicToSeed(words, 'TON default seed');
  try { return await publicKeyFromSeed(seed.subarray(0, 32)); }
  finally { seed.fill(0); }
}
