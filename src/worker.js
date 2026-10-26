import { createHasher, createMatcher, friendlyAddress, validateOptions, walletIdAt, SPACE } from './engine.js';

self.onmessage = ({ data: { options, start, lane, workers } }) => {
  try {
    validateOptions(options);
    const hash = createHasher(options.publicKey);
    const matchesHash = createMatcher(options);
    const limit = Math.floor((SPACE - 1 - lane) / workers) + 1;
    let attempts = 0;
    let lastReport = performance.now();
    while (attempts < limit) {
      const walletId = walletIdAt(start, lane, attempts, workers);
      const addressHash = hash(walletId);
      attempts++;
      if (matchesHash(addressHash)) {
        const address = friendlyAddress(addressHash, options);
        self.postMessage({ type: 'found', lane, attempts, walletId, address });
        return;
      }
      if (attempts % 2048 === 0 && performance.now() - lastReport >= 250) {
        const address = friendlyAddress(addressHash, options);
        self.postMessage({ type: 'progress', lane, attempts, walletId, address });
        lastReport = performance.now();
      }
    }
    self.postMessage({ type: 'exhausted', lane, attempts });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
