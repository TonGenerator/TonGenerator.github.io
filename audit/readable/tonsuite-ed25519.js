import { t as e } from "./ed25519-D_YPZtkb.js";
const t = r(`9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60`), n = r(`d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a`);
function r(e2) {
  let t2 = new Uint8Array(e2.length / 2);
  for (let n2 = 0; n2 < t2.length; n2 += 1) t2[n2] = Number.parseInt(e2.slice(n2 * 2, n2 * 2 + 2), 16);
  return t2;
}
function i(e2, t2) {
  if (e2.byteLength !== t2.byteLength) return false;
  let n2 = 0;
  for (let r2 = 0; r2 < e2.byteLength; r2 += 1) n2 |= e2[r2] ^ t2[r2];
  return n2 === 0;
}
function a(e2) {
  if (!(e2 instanceof Uint8Array) || e2.byteLength !== 32) throw Error(`An Ed25519 seed must be exactly 32 bytes.`);
}
function o(t2) {
  return a(t2), e.getPublicKey(t2);
}
function s() {
  return { backend: `noble-js`, publicKeyFromSeed: o };
}
async function c() {
  return (await import("./libsodium-wrappers-CcskPyoL.js")).default;
}
function l(e2, t2) {
  a(t2);
  let n2;
  try {
    if (n2 = e2.crypto_sign_seed_keypair(t2), !(n2.publicKey instanceof Uint8Array) || n2.publicKey.byteLength !== 32 || !(n2.privateKey instanceof Uint8Array)) throw Error(`libsodium returned a malformed Ed25519 key pair.`);
    let r2 = n2.publicKey;
    return n2.publicKey = new Uint8Array(), r2;
  } finally {
    n2?.publicKey.fill(0), n2?.privateKey.fill(0);
  }
}
async function u(e2 = {}) {
  let r2, u2;
  try {
    r2 = await (e2.loadSodium ?? c)(), await r2.ready, u2 = t.slice();
    let a2 = l(r2, u2);
    try {
      if (!i(a2, n)) throw Error(`libsodium Ed25519 self-test failed.`);
    } finally {
      a2.fill(0);
    }
  } catch {
    return s();
  } finally {
    u2?.fill(0);
  }
  return { backend: `libsodium-wasm`, publicKeyFromSeed(e3) {
    try {
      return l(r2, e3);
    } catch (t2) {
      a(e3);
      try {
        return o(e3);
      } catch {
        throw t2;
      }
    }
  } };
}
export { u as createCpuEd25519Accelerator };
