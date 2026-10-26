import { entropyToMnemonic, validateMnemonic, wordlists } from 'bip39';
import { keyPairFromSeed } from '@ton/crypto';
import { hmac } from '@noble/hashes/hmac';
import { sha512 } from '@noble/hashes/sha512';
import { publicKeyFromSeed } from './public-key.js';
import { cpuPbkdf2 } from './cpu-pbkdf2.js';

const english = wordlists.english;
const encode = text => new TextEncoder().encode(text);

// Shared standard SLIP-0010 path, also used after GPU BIP39 PBKDF2. Input is
// caller-owned and must be wiped there; all intermediate HMAC states are wiped.
export function bip39RootToSeed(seed) {
  if (!(seed instanceof Uint8Array) || seed.length !== 64) throw new Error('Expected a 64-byte BIP39 root');
  let node = hmac(sha512, encode('ed25519 seed'), seed);
  const child = new Uint8Array(37);
  try {
    for (const index of [44, 607, 0]) {
      child.set(node.subarray(0, 32), 1);
      new DataView(child.buffer).setUint32(33, index + 0x80000000, false);
      const next = hmac(sha512, node.subarray(32), child);
      node.fill(0); node = next; child.fill(0);
    }
    return Buffer.from(node.subarray(0, 32));
  } finally { node.fill(0); child.fill(0); }
}

export function validateTelegramMnemonic(words) {
  return Array.isArray(words) && words.length === 12 &&
    words.every(word => typeof word === 'string' && /^[a-z]+$/.test(word)) &&
    validateMnemonic(words.join(' '), english);
}

export function newTelegramMnemonic() {
  const entropy = crypto.getRandomValues(new Uint8Array(16));
  try { return entropyToMnemonic(Buffer.from(entropy.buffer), english).split(' '); }
  finally { entropy.fill(0); }
}

// WalletTg uses BIP39 (empty passphrase) and SLIP-0010 Ed25519 at
// m/44'/607'/0'. It does not use TON's 24-word mnemonic derivation.
async function telegramMnemonicToSeed(words, backend = 'webcrypto') {
  if (!validateTelegramMnemonic(words)) throw new Error('Expected 12 valid BIP39 words');
  const input = encode(words.join(' ').normalize('NFKD'));
  let seed;
  try {
    if (backend === 'cpu') seed = await cpuPbkdf2(input, encode('mnemonic'), 2048);
    else {
      const password = await crypto.subtle.importKey('raw', input, 'PBKDF2', false, ['deriveBits']);
      seed = new Uint8Array(await crypto.subtle.deriveBits({
        name: 'PBKDF2', hash: 'SHA-512', salt: encode('mnemonic'), iterations: 2048,
      }, password, 512));
    }
    return bip39RootToSeed(seed);
  } finally { input.fill(0); seed?.fill(0); }
}

export async function telegramMnemonicToKeyPair(words) {
  const seed = await telegramMnemonicToSeed(words);
  try { return keyPairFromSeed(seed); }
  finally { seed.fill(0); }
}

export async function telegramMnemonicToPublicKey(words, backend = 'cpu') {
  const seed = await telegramMnemonicToSeed(words, backend);
  try { return await publicKeyFromSeed(seed); }
  finally { seed.fill(0); }
}
