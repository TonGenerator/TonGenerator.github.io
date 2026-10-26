import { SHA256 } from '@noble/hashes/sha256';

// Fixed-length public TON cells only. Reuse padding, output and SHA state to
// avoid allocating two hash objects per address. Compression is the pinned
// noble implementation, not a replacement cryptographic primitive.
export function fixedSha256(message) {
  if (![43, 71].includes(message.length)) throw new Error('Unexpected TON cell size');
  const padded = new Uint8Array(message.length < 56 ? 64 : 128);
  padded[message.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 4, message.length * 8, false);
  const hash = new SHA256();
  const output = new Uint8Array(32), out = new DataView(output.buffer);
  return () => {
    padded.set(message);
    hash.set(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
    hash.process(view, 0);
    if (padded.length === 128) hash.process(view, 64);
    out.setUint32(0, hash.A); out.setUint32(4, hash.B);
    out.setUint32(8, hash.C); out.setUint32(12, hash.D);
    out.setUint32(16, hash.E); out.setUint32(20, hash.F);
    out.setUint32(24, hash.G); out.setUint32(28, hash.H);
    return output;
  };
}
