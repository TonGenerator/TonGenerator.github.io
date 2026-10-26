import { mnemonicNew } from '@ton/crypto';
import { newTelegramMnemonic, telegramMnemonicToPublicKey } from './tg-mnemonic.js';
import { tonMnemonicToPublicKey } from './public-key.js';
import { createSearchHasher, createMatcher, defaultWalletId, customWalletId, validateSearchOptions, DEMO_KEY } from './engine.js';

export async function checkPerformance(options, sampleCount) {
  validateSearchOptions(options);
  const fast = options.strategy === 'wallet-id', telegram = options.contract === 'wallet-tg';
  const bip39 = telegram || options.mnemonicScheme === 'bip39-12-slip10-ed25519';
  const samples = sampleCount ?? (fast ? 200000 : bip39 ? 128 : 4);
  const matcher = createMatcher(options);
  let started;
  if (fast) {
    const hash = createSearchHasher(DEMO_KEY, options.contract);
    for (let i = 0; i < 10000; i++) matcher(hash(customWalletId(options.contract, i, options.testOnly)));
    started = performance.now();
    for (let i = 0; i < samples; i++) matcher(hash(customWalletId(options.contract, i, options.testOnly)));
  } else {
    started = performance.now();
    for (let i = 0; i < samples; i++) {
      const words = bip39 ? newTelegramMnemonic() : await mnemonicNew(24);
      let publicKey;
      try {
        publicKey = await (bip39 ? telegramMnemonicToPublicKey(words, options.deriveBackend === 'webcrypto' ? 'webcrypto' : 'cpu') : tonMnemonicToPublicKey(words));
        matcher(createSearchHasher(publicKey, options.contract)(defaultWalletId(options.contract, options.testOnly)));
      } finally { words.fill(''); publicKey?.fill(0); }
    }
  }
  return {type:'performance', samples, cpuRate:samples * 1000 / (performance.now() - started),
    label: `${telegram ? 'WalletTg' : options.contract.toUpperCase()} · ${fast ? 'перебор walletID' : 'новые фразы'}`};
}
