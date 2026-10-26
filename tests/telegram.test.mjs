import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, createPrivateKey, createPublicKey, randomBytes } from 'node:crypto';
import { mnemonicToSeedSync, validateMnemonic } from 'bip39';
import { Cell, beginCell, contractAddress } from '@ton/ton';
import { newTelegramMnemonic, telegramMnemonicToKeyPair, validateTelegramMnemonic } from '../src/tg-mnemonic.js';
import { createHasher, friendlyAddress, makeResult, defaultWalletId, validateSearchOptions } from '../src/engine.js';
import { CONTRACTS } from '../src/generated/contract.js';

// Independent OpenSSL HMAC/Ed25519 + BIP39 reference, following the official
// WalletTg integration example. Never print generated private material.
export function referenceTelegramKey(words) {
  const seed = mnemonicToSeedSync(words.join(' '), '');
  let node = createHmac('sha512', 'ed25519 seed').update(seed).digest();
  const child = Buffer.alloc(37);
  try {
    for (const index of [44, 607, 0]) {
      node.copy(child, 1, 0, 32); child.writeUInt32BE(index + 0x80000000, 33);
      const next = createHmac('sha512', node.subarray(32)).update(child).digest();
      node.fill(0); node = next; child.fill(0);
    }
    const der = Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), node.subarray(0, 32)]);
    try {
      const privateKey = createPrivateKey({ key: der, type: 'pkcs8', format: 'der' });
      return Buffer.from(createPublicKey(privateKey).export({ type: 'spki', format: 'der' }).subarray(-32));
    } finally { der.fill(0); }
  } finally { seed.fill(0); node.fill(0); child.fill(0); }
}

test('WalletTg BIP39/SLIP-0010 derivation agrees with independent OpenSSL reference', async () => {
  // Public BIP39 test vector, never used for an actual generated wallet.
  const fixture = [...Array(11).fill('abandon'), 'about'];
  const generated = newTelegramMnemonic();
  let pair;
  try {
    assert.equal(generated.length, 12); assert.ok(validateMnemonic(generated.join(' ')));
    for (const words of [fixture, generated]) {
      pair = await telegramMnemonicToKeyPair(words);
      assert.deepEqual(pair.publicKey, referenceTelegramKey(words));
      pair.secretKey.fill(0); pair.publicKey.fill(0); pair = null;
    }
    assert.equal(validateTelegramMnemonic([...fixture, ...fixture]), false);
    assert.equal(validateTelegramMnemonic([...Array(12).fill('abandon')]), false);
    await assert.rejects(telegramMnemonicToKeyPair([...fixture, ...fixture]));
  } finally { generated.fill(''); pair?.secretKey.fill(0); pair?.publicKey.fill(0); }
});

test('WalletTg trampoline and exact 328-bit initial storage agree with official Cell serialization', () => {
  const code = Cell.fromBoc(Buffer.from(CONTRACTS['wallet-tg'].boc, 'hex'))[0];
  assert.equal(code.hash().toString('hex'), '9149ae51c1e4689710cebf7830297b16acfbadb363a920a537893e7ffeeca768');
  assert.equal(defaultWalletId('wallet-tg'), 0x7FFF7F11);
  assert.equal(defaultWalletId('wallet-tg', true), 0x7FFF7FFD);
  for (const id of [0, 1, 0x7FFF7F11, 0x7FFF7FFD, 0xFFFFFFFF]) {
    for (let n = 0; n < 8; n++) {
      const publicKey = randomBytes(32);
      const data = beginCell().storeUint(0, 8).storeUint(0, 32).storeUint(id, 32).storeBuffer(publicKey).endCell();
      assert.equal(data.bits.length, 328);
      const expected = contractAddress(0, { code, data });
      const actual = createHasher(publicKey, 'wallet-tg')(id);
      assert.equal(Buffer.from(actual).toString('hex'), expected.hash.toString('hex'));
      for (const testOnly of [false, true]) for (const bounceable of [false, true]) {
        assert.equal(friendlyAddress(actual, { testOnly, bounceable }), expected.toString({ testOnly, bounceable, urlSafe: true }));
      }
    }
  }
});

test('Telegram results lock mainnet and standard ID and describe 12-word unrotated recovery', () => {
  const opts = { contract: 'wallet-tg', strategy: 'standard', pattern: 'a', position: 'suffix', caseSensitive: false, bounceable: false, testOnly: false, publicKey: randomBytes(32).toString('hex') };
  const result = makeResult(opts, defaultWalletId('wallet-tg'));
  assert.equal(result.mnemonicWordCount, 12);
  assert.equal(result.mnemonicScheme, 'bip39-12-slip10-ed25519');
  assert.equal(result.derivationPath, "m/44'/607'/0'");
  assert.equal(result.keyRotation, false);
  assert.equal(result.walletId, 0x7FFF7F11);
  assert.throws(() => makeResult(opts, 123));
  assert.throws(() => validateSearchOptions({ ...opts, strategy: 'wallet-id' }));
  assert.throws(() => validateSearchOptions({ ...opts, testOnly: true }));
  assert.throws(() => validateSearchOptions({ ...opts, bounceable: true }));
});
