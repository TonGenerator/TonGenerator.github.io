import { sha256 } from '@noble/hashes/sha256';
import { CONTRACTS } from './generated/contract.js';
import { fixedSha256 } from './fixed-sha256.js';
import {parsePatterns,patternsProbability} from './patterns.js';

export const SPACE = 2 ** 32;
export const DEMO_KEY = 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a';
export const DEFAULT_ID = 698983191;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const CRC_TABLE = Uint16Array.from({ length: 256 }, (_, byte) => {
  let crc = byte << 8;
  for (let bit = 0; bit < 8; bit++) crc = ((crc << 1) ^ ((crc & 0x8000) ? 0x1021 : 0)) & 0xffff;
  return crc;
});

export function parsePublicKey(text) {
  const key = text.trim().replace(/^0x/i, '');
  if (!/^[a-f0-9]{64}$/i.test(key) || /^0{64}$/.test(key)) {
    throw new Error('Нужен публичный ключ: 64 шестнадцатеричных символа. Адрес UQ/EQ и сид-фраза не подходят.');
  }
  return Uint8Array.from(key.match(/../g), byte => parseInt(byte, 16));
}

export function validateOptions(options) {
  parsePublicKey(options.publicKey);
  validateSearchOptions(options);
}

export function validateSearchOptions(options) {
  if (!/^[A-Za-z0-9_-]{1,8}$/.test(options.pattern)) throw new Error('Шаблон: от 1 до 8 символов A–Z, a–z, 0–9, дефис или подчёркивание.');
  if(options.patterns!==undefined){if(!Array.isArray(options.patterns)||options.patterns.length>32)throw Error('Invalid pattern list');parsePatterns(options.patterns,options.caseSensitive);}
  if (!['suffix', 'prefix'].includes(options.position)) throw new Error('Некорректная позиция шаблона.');
  if (typeof options.caseSensitive !== 'boolean' || typeof options.bounceable !== 'boolean' || typeof options.testOnly !== 'boolean') throw new Error('Некорректные настройки адреса.');
  if (options.contract !== undefined && !['v4r2', 'v5r1', 'wallet-tg'].includes(options.contract)) throw new Error('Выбери WalletTg, V4R2 или V5R1.');
  if (options.strategy !== undefined && !['wallet-id', 'standard'].includes(options.strategy)) throw new Error('Некорректный способ подбора.');
  if (options.mnemonicScheme !== undefined && !['ton-24', 'bip39-12-slip10-ed25519'].includes(options.mnemonicScheme)) throw new Error('Некорректный формат сид-фразы.');
  if (options.importTarget === 'tonkeeper' && (options.strategy !== 'standard' || !['v4r2', 'v5r1'].includes(options.contract))) throw new Error('Для Tonkeeper нужны V4/V5 и стандартный walletID.');
  if (options.contract === 'wallet-tg' && options.strategy !== 'standard') throw new Error('WalletTg для Telegram использует только стандартный walletID.');
  if (options.contract === 'wallet-tg' && options.testOnly) throw new Error('Встроенный кошелёк Telegram работает в Mainnet.');
  if (options.contract === 'wallet-tg' && options.bounceable) throw new Error('Telegram показывает UQ: выбери non-bounceable формат.');
}

export function crc16(bytes) {
  let crc = 0;
  for (const byte of bytes) {
    crc = ((crc << 8) ^ CRC_TABLE[(crc >>> 8) ^ byte]) & 0xffff;
  }
  return crc;
}

function encode64(bytes) {
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const value = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    result += ALPHABET[value >>> 18] + ALPHABET[(value >>> 12) & 63] + ALPHABET[(value >>> 6) & 63] + ALPHABET[value & 63];
  }
  return result;
}

export function createHasher(publicKey, contract = 'v4r2', reuseDigest = false) {
  const key = typeof publicKey === 'string' ? parsePublicKey(publicKey) : publicKey;
  if (!CONTRACTS[contract]) throw new Error('Unknown wallet contract');
  const code = CONTRACTS[contract];
  // Ordinary data cell: seqno:uint32 = 0, wallet_id:uint32, key:bits256,
  // empty HashmapE bit, then TON's top-up bit. 321 bits, no refs.
  const data = new Uint8Array(43);
  data[1] = 81;
  if (contract === 'wallet-tg') {
    // WalletTg revision:uint8=0, seqno:uint32=0, subwallet_id:uint32,
    // anchor_public_key:bits256. Exactly 328 bits: no top-up bit or dictionary.
    data[1] = 82;
    data.set(key, 11);
  } else if (contract === 'v4r2') {
    data.set(key, 10);
    data[42] = 0x40;
  } else {
    // V5R1: signature_allowed=1, seqno=0, wallet_id:uint32, key:bits256,
    // empty extensions. 322 bits; key and ID are shifted by one bit.
    data[2] = 0x80;
    for (let i = 0; i < 32; i++) {
      data[10 + i] |= key[i] >>> 1;
      data[11 + i] |= (key[i] & 1) << 7;
    }
    data[42] |= 0x20;
  }
  const view = new DataView(data.buffer);
  // StateInit: 00110 (no split depth, no special, code ref, data ref,
  // empty libraries), padded to 0x34. Ref depths precede both hashes.
  const state = new Uint8Array(71);
  state.set([2, 1, 0x34, code.depth >>> 8, code.depth & 255, 0, 0]);
  state.set(Uint8Array.from(code.hash.match(/../g), x => parseInt(x, 16)), 7);
  const hashData = reuseDigest ? fixedSha256(data) : () => sha256(data);
  const hashState = reuseDigest ? fixedSha256(state) : () => sha256(state);
  return function hash(walletId) {
    if (!Number.isInteger(walletId) || walletId < 0 || walletId >= SPACE) throw new Error('walletID должен быть uint32.');
    if (contract === 'wallet-tg') view.setUint32(7, walletId, false);
    else if (contract === 'v4r2') view.setUint32(6, walletId, false);
    else {
      data[6] = walletId >>> 25;
      data[7] = walletId >>> 17;
      data[8] = walletId >>> 9;
      data[9] = walletId >>> 1;
      data[10] = ((walletId & 1) << 7) | (key[0] >>> 1);
    }
    state.set(hashData(), 39);
    return hashState();
  };
}

// The returned digest is reused on the next call. Consume it before advancing.
export const createSearchHasher = (publicKey, contract = 'v4r2') => createHasher(publicKey, contract, true);

// Standard-ID searches change the key on every attempt. Keep contract data,
// code hash, padding and SHA state instead of rebuilding them for every key.
export function createStandardKeyHasher(contract = 'v4r2', testOnly = false) {
  const code=CONTRACTS[contract];
  if(!code)throw new Error('Unknown wallet contract');
  const walletId=defaultWalletId(contract,testOnly),data=new Uint8Array(43),state=new Uint8Array(71);
  data[1]=contract==='wallet-tg'?82:81;
  const view=new DataView(data.buffer);
  if(contract==='wallet-tg')view.setUint32(7,walletId,false);
  else if(contract==='v4r2'){view.setUint32(6,walletId,false);data[42]=0x40;}
  else{data[2]=0x80;data[6]=walletId>>>25;data[7]=walletId>>>17;data[8]=walletId>>>9;data[9]=walletId>>>1;}
  state.set([2,1,0x34,code.depth>>>8,code.depth&255,0,0]);
  state.set(Uint8Array.from(code.hash.match(/../g),byte=>parseInt(byte,16)),7);
  const hashData=fixedSha256(data),hashState=fixedSha256(state);
  return key=>{
    if(!(key instanceof Uint8Array)||key.length!==32)throw new Error('Expected a public key');
    if(contract==='wallet-tg')data.set(key,11);
    else if(contract==='v4r2')data.set(key,10);
    else{
      data[10]=((walletId&1)<<7)|(key[0]>>>1);
      for(let i=0;i<31;i++)data[11+i]=((key[i]&1)<<7)|(key[i+1]>>>1);
      data[42]=((key[31]&1)<<7)|0x20;
    }
    state.set(hashData(),39);return hashState();
  };
}

export function friendlyAddress(hash, { bounceable = false, testOnly = false } = {}) {
  const bytes = new Uint8Array(36);
  bytes[0] = (bounceable ? 0x11 : 0x51) | (testOnly ? 0x80 : 0);
  bytes.set(hash, 2); // Workchain 0.
  const crc = crc16(bytes.subarray(0, 34));
  bytes[34] = crc >>> 8;
  bytes[35] = crc & 255;
  return encode64(bytes);
}

export function matches(address, pattern, position, caseSensitive) {
  if(Array.isArray(pattern))return pattern.some(item=>matches(address,item,position,caseSensitive));
  let actual = position === 'prefix' ? address.slice(4, 4 + pattern.length) : address.slice(-pattern.length);
  return caseSensitive ? actual === pattern : actual.toLowerCase() === pattern.toLowerCase();
}

// Check the needed Base64 bits before CRC16 or string allocation. In a suffix,
// characters 0..44 are entirely in the hash; character 45 straddles hash/CRC.
// For a six-character exact suffix this rejects all but ~1 in 2^20 hashes
// before computing CRC. Every walletID is still hashed and counted.
export function createMatcher(options) {
  validateSearchOptions(options);
  if(options.patterns?.length>1){const cache={value:undefined},checks=parsePatterns(options.patterns,options.caseSensitive).map(pattern=>compileMatcher({...options,pattern},cache));return hash=>{cache.value=undefined;for(const check of checks)if(check(hash))return true;return false;};}
  return compileMatcher({...options,pattern:options.patterns?.[0]||options.pattern});
}
function compileMatcher(options,cache){
  const start = options.position === 'prefix' ? 4 : 48 - options.pattern.length;
  const hashChecks = [];
  const crcChecks = [];
  let boundary;
  for (let i = 0; i < options.pattern.length; i++) {
    const char = options.pattern[i];
    const a = ALPHABET.indexOf(char);
    const b = !options.caseSensitive && /[a-z]/i.test(char)
      ? ALPHABET.indexOf(char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()) : a;
    const index = start + i;
    if (index < 45) {
      const bit = index * 6 - 16;
      hashChecks.push([bit >>> 3, 10 - (bit & 7), a, b]);
    } else {
      crcChecks.push([index, a, b]);
      if (index === 45) boundary = [a >>> 4, b >>> 4];
    }
  }
  const tag = (options.bounceable ? 0x11 : 0x51) | (options.testOnly ? 0x80 : 0);
  // First two address bytes: tag, workchain = 0.
  const tagCrc = CRC_TABLE[tag];
  const initialCrc = ((tagCrc << 8) ^ CRC_TABLE[tagCrc >>> 8]) & 0xffff;
  return function matchesHash(hash) {
    for (const [byte, shift, a, b] of hashChecks) {
      const value = ((hash[byte] << 8) | (hash[byte + 1] || 0)) >>> shift & 63;
      if (value !== a && value !== b) return false;
    }
    if (!crcChecks.length) return true;
    const lastBits = hash[31] & 3;
    if (boundary && lastBits !== boundary[0] && lastBits !== boundary[1]) return false;
    let crc=cache?.value;
    if(crc===undefined){crc=initialCrc;for (let i = 0; i < 32; i++) crc = ((crc << 8) ^ CRC_TABLE[(crc >>> 8) ^ hash[i]]) & 0xffff;if(cache)cache.value=crc;}
    for (const [index, a, b] of crcChecks) {
      const value = index === 45 ? (lastBits << 4) | (crc >>> 12) : index === 46 ? (crc >>> 6) & 63 : crc & 63;
      if (value !== a && value !== b) return false;
    }
    return true;
  };
}

export function patternProbability(pattern, caseSensitive,position='suffix') {
  if(Array.isArray(pattern))return patternsProbability(pattern,caseSensitive,position);
  return [...pattern].reduce((p, c) => p * ((!caseSensitive && /[a-z]/i.test(c)) ? 2 : 1) / 64, 1);
}

// Interleaved offsets partition uint32 space exactly, including wraparound.
export function walletIdAt(start, lane, step, workers) {
  return (start + lane + step * workers) % SPACE;
}

export function makeResult(options, walletId) {
  validateOptions(options);
  const contract = options.contract ?? 'v4r2';
  if (options.importTarget === 'tonkeeper' && walletId !== defaultWalletId(contract, options.testOnly)) throw new Error('Этот walletID не подходит для обычного импорта в Tonkeeper.');
  if (contract === 'wallet-tg' && walletId !== defaultWalletId(contract, options.testOnly)) throw new Error('Нестандартный walletID не подходит для импорта WalletTg в Telegram.');
  const hash = createHasher(options.publicKey, contract)(walletId);
  const networkGlobalId = options.testOnly ? -3 : -239;
  const context = (walletId ^ networkGlobalId) >>> 0;
  const bip39 = contract === 'wallet-tg' || options.mnemonicScheme === 'bip39-12-slip10-ed25519';
  const address=friendlyAddress(hash,options),matchedPatterns=(options.patterns||[options.pattern]).filter(pattern=>matches(address,pattern,options.position,options.caseSensitive));
  return {
    format: 'ton-wallet-id-lab/v2', contract, workchain: 0,
    network: options.testOnly ? 'testnet' : 'mainnet',
    publicKey: options.publicKey.trim().replace(/^0x/i, '').toLowerCase(),
    walletId, address,
    rawAddress: `0:${Array.from(hash, x => x.toString(16).padStart(2, '0')).join('')}`,
    bounceable: options.bounceable, codeHash: CONTRACTS[contract].hash,
    strategy: options.strategy ?? 'wallet-id',
    ...(options.importTarget ? { importTarget: options.importTarget } : {}),
    mnemonicScheme: bip39 ? 'bip39-12-slip10-ed25519' : 'ton-24',
    mnemonicWordCount: bip39 ? 12 : 24,
    ...(bip39 ? {derivationPath: "m/44'/607'/0'"} : {}),
    ...(contract === 'wallet-tg' ? { derivationPath: "m/44'/607'/0'", keyRotation: false, subwalletId: walletId, codeBoc: CONTRACTS[contract].boc } : {}),
    walletIdConfig: contract !== 'v5r1' ? walletId : { networkGlobalId, context: context < 2 ** 31 ? context : { walletVersion: 'v5r1', workchain: 0, subwalletNumber: context & 32767 } },
    pattern: matchedPatterns[0]||options.pattern,matchedPatterns, position: options.position, caseSensitive: options.caseSensitive,
    demo: options.publicKey.trim().replace(/^0x/i, '').toLowerCase() === DEMO_KEY,
  };
}

export function defaultWalletId(contract, testOnly = false) {
  if (contract === 'wallet-tg') return testOnly ? 0x7FFF7FFD : 0x7FFF7F11;
  return contract === 'v5r1' ? ((testOnly ? -3 : -239) ^ -2147483648) >>> 0 : DEFAULT_ID;
}

export function customWalletId(contract, offset, testOnly = false) {
  if (contract === 'wallet-tg') throw new Error('WalletTg для Telegram использует фиксированный ID.');
  const size = contract === 'v5r1' ? 2 ** 31 : SPACE;
  if (!Number.isInteger(offset) || offset < 0 || offset >= size) throw new Error('Invalid walletID search offset');
  return contract === 'v5r1' ? (offset ^ (testOnly ? -3 : -239)) >>> 0 : offset;
}
