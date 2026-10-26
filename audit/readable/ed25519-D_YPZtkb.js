/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function e(e2) {
  return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && e2.constructor.name === `Uint8Array`;
}
function t(e2, t2 = ``) {
  if (!Number.isSafeInteger(e2) || e2 < 0) {
    let n2 = t2 && `"${t2}" `;
    throw Error(`${n2}expected integer >= 0, got ${e2}`);
  }
}
function n(t2, n2, r2 = ``) {
  let i2 = e(t2), a2 = t2?.length, o2 = n2 !== void 0;
  if (!i2 || o2 && a2 !== n2) {
    let e2 = r2 && `"${r2}" `, s2 = o2 ? ` of length ${n2}` : ``, c2 = i2 ? `length=${a2}` : `type=${typeof t2}`;
    throw Error(e2 + `expected Uint8Array` + s2 + `, got ` + c2);
  }
  return t2;
}
function r(e2, t2 = true) {
  if (e2.destroyed) throw Error(`Hash instance has been destroyed`);
  if (t2 && e2.finished) throw Error(`Hash#digest() has already been called`);
}
function i(e2, t2) {
  n(e2, void 0, `digestInto() output`);
  let r2 = t2.outputLen;
  if (e2.length < r2) throw Error(`"digestInto() output" expected to be of length >=` + r2);
}
function a(...e2) {
  for (let t2 = 0; t2 < e2.length; t2++) e2[t2].fill(0);
}
function o(e2) {
  return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
}
const s = typeof Uint8Array.from([]).toHex == `function` && typeof Uint8Array.fromHex == `function`, c = Array.from({ length: 256 }, (e2, t2) => t2.toString(16).padStart(2, `0`));
function l(e2) {
  if (n(e2), s) return e2.toHex();
  let t2 = ``;
  for (let n2 = 0; n2 < e2.length; n2++) t2 += c[e2[n2]];
  return t2;
}
const u = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function d(e2) {
  if (e2 >= u._0 && e2 <= u._9) return e2 - u._0;
  if (e2 >= u.A && e2 <= u.F) return e2 - (u.A - 10);
  if (e2 >= u.a && e2 <= u.f) return e2 - (u.a - 10);
}
function f(e2) {
  if (typeof e2 != `string`) throw Error(`hex string expected, got ` + typeof e2);
  if (s) return Uint8Array.fromHex(e2);
  let t2 = e2.length, n2 = t2 / 2;
  if (t2 % 2) throw Error(`hex string expected, got unpadded hex of length ` + t2);
  let r2 = new Uint8Array(n2);
  for (let t3 = 0, i2 = 0; t3 < n2; t3++, i2 += 2) {
    let n3 = d(e2.charCodeAt(i2)), a2 = d(e2.charCodeAt(i2 + 1));
    if (n3 === void 0 || a2 === void 0) {
      let t4 = e2[i2] + e2[i2 + 1];
      throw Error(`hex string expected, got non-hex character "` + t4 + `" at index ` + i2);
    }
    r2[t3] = n3 * 16 + a2;
  }
  return r2;
}
function p(...e2) {
  let t2 = 0;
  for (let r3 = 0; r3 < e2.length; r3++) {
    let i2 = e2[r3];
    n(i2), t2 += i2.length;
  }
  let r2 = new Uint8Array(t2);
  for (let t3 = 0, n2 = 0; t3 < e2.length; t3++) {
    let i2 = e2[t3];
    r2.set(i2, n2), n2 += i2.length;
  }
  return r2;
}
function m(e2, t2 = {}) {
  let n2 = (t3, n3) => e2(n3).update(t3).digest(), r2 = e2(void 0);
  return n2.outputLen = r2.outputLen, n2.blockLen = r2.blockLen, n2.create = (t3) => e2(t3), Object.assign(n2, t2), Object.freeze(n2);
}
function h(e2 = 32) {
  let t2 = typeof globalThis == `object` ? globalThis.crypto : null;
  if (typeof t2?.getRandomValues != `function`) throw Error(`crypto.getRandomValues must be defined`);
  return t2.getRandomValues(new Uint8Array(e2));
}
const g = (e2) => ({ oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, e2]) });
var _ = class {
  blockLen;
  outputLen;
  padOffset;
  isLE;
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(e2, t2, n2, r2) {
    this.blockLen = e2, this.outputLen = t2, this.padOffset = n2, this.isLE = r2, this.buffer = new Uint8Array(e2), this.view = o(this.buffer);
  }
  update(e2) {
    r(this), n(e2);
    let { view: t2, buffer: i2, blockLen: a2 } = this, s2 = e2.length;
    for (let n2 = 0; n2 < s2; ) {
      let r2 = Math.min(a2 - this.pos, s2 - n2);
      if (r2 === a2) {
        let t3 = o(e2);
        for (; a2 <= s2 - n2; n2 += a2) this.process(t3, n2);
        continue;
      }
      i2.set(e2.subarray(n2, n2 + r2), this.pos), this.pos += r2, n2 += r2, this.pos === a2 && (this.process(t2, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    r(this), i(e2, this), this.finished = true;
    let { buffer: t2, view: n2, blockLen: s2, isLE: c2 } = this, { pos: l2 } = this;
    t2[l2++] = 128, a(this.buffer.subarray(l2)), this.padOffset > s2 - l2 && (this.process(n2, 0), l2 = 0);
    for (let e3 = l2; e3 < s2; e3++) t2[e3] = 0;
    n2.setBigUint64(s2 - 8, BigInt(this.length * 8), c2), this.process(n2, 0);
    let u2 = o(e2), d2 = this.outputLen;
    if (d2 % 4) throw Error(`_sha2: outputLen must be aligned to 32bit`);
    let f2 = d2 / 4, p2 = this.get();
    if (f2 > p2.length) throw Error(`_sha2: outputLen bigger than state`);
    for (let e3 = 0; e3 < f2; e3++) u2.setUint32(4 * e3, p2[e3], c2);
  }
  digest() {
    let { buffer: e2, outputLen: t2 } = this;
    this.digestInto(e2);
    let n2 = e2.slice(0, t2);
    return this.destroy(), n2;
  }
  _cloneInto(e2) {
    e2 ||= new this.constructor(), e2.set(...this.get());
    let { blockLen: t2, buffer: n2, length: r2, finished: i2, destroyed: a2, pos: o2 } = this;
    return e2.destroyed = a2, e2.finished = i2, e2.length = r2, e2.pos = o2, r2 % t2 && e2.buffer.set(n2), e2;
  }
  clone() {
    return this._cloneInto();
  }
};
const v = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]), y = BigInt(2 ** 32 - 1), b = BigInt(32);
function x(e2, t2 = false) {
  return t2 ? { h: Number(e2 & y), l: Number(e2 >> b & y) } : { h: Number(e2 >> b & y) | 0, l: Number(e2 & y) | 0 };
}
function S(e2, t2 = false) {
  let n2 = e2.length, r2 = new Uint32Array(n2), i2 = new Uint32Array(n2);
  for (let a2 = 0; a2 < n2; a2++) {
    let { h: n3, l: o2 } = x(e2[a2], t2);
    [r2[a2], i2[a2]] = [n3, o2];
  }
  return [r2, i2];
}
const C = (e2, t2, n2) => e2 >>> n2, w = (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, T = (e2, t2, n2) => e2 >>> n2 | t2 << 32 - n2, E = (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, D = (e2, t2, n2) => e2 << 64 - n2 | t2 >>> n2 - 32, O = (e2, t2, n2) => e2 >>> n2 - 32 | t2 << 64 - n2;
function k(e2, t2, n2, r2) {
  let i2 = (t2 >>> 0) + (r2 >>> 0);
  return { h: e2 + n2 + (i2 / 2 ** 32 | 0) | 0, l: i2 | 0 };
}
const ee = (e2, t2, n2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0), te = (e2, t2, n2, r2) => t2 + n2 + r2 + (e2 / 2 ** 32 | 0) | 0, ne = (e2, t2, n2, r2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0), re = (e2, t2, n2, r2, i2) => t2 + n2 + r2 + i2 + (e2 / 2 ** 32 | 0) | 0, ie = (e2, t2, n2, r2, i2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0) + (i2 >>> 0), ae = (e2, t2, n2, r2, i2, a2) => t2 + n2 + r2 + i2 + a2 + (e2 / 2 ** 32 | 0) | 0, A = S(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map((e2) => BigInt(e2))), oe = A[0], se = A[1], j = new Uint32Array(80), M = new Uint32Array(80);
var N = class extends _ {
  constructor(e2) {
    super(128, e2, 16, false);
  }
  get() {
    let { Ah: e2, Al: t2, Bh: n2, Bl: r2, Ch: i2, Cl: a2, Dh: o2, Dl: s2, Eh: c2, El: l2, Fh: u2, Fl: d2, Gh: f2, Gl: p2, Hh: m2, Hl: h2 } = this;
    return [e2, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2];
  }
  set(e2, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2) {
    this.Ah = e2 | 0, this.Al = t2 | 0, this.Bh = n2 | 0, this.Bl = r2 | 0, this.Ch = i2 | 0, this.Cl = a2 | 0, this.Dh = o2 | 0, this.Dl = s2 | 0, this.Eh = c2 | 0, this.El = l2 | 0, this.Fh = u2 | 0, this.Fl = d2 | 0, this.Gh = f2 | 0, this.Gl = p2 | 0, this.Hh = m2 | 0, this.Hl = h2 | 0;
  }
  process(e2, t2) {
    for (let n3 = 0; n3 < 16; n3++, t2 += 4) j[n3] = e2.getUint32(t2), M[n3] = e2.getUint32(t2 += 4);
    for (let e3 = 16; e3 < 80; e3++) {
      let t3 = j[e3 - 15] | 0, n3 = M[e3 - 15] | 0, r3 = T(t3, n3, 1) ^ T(t3, n3, 8) ^ C(t3, n3, 7), i3 = E(t3, n3, 1) ^ E(t3, n3, 8) ^ w(t3, n3, 7), a3 = j[e3 - 2] | 0, o3 = M[e3 - 2] | 0, s3 = T(a3, o3, 19) ^ D(a3, o3, 61) ^ C(a3, o3, 6), c3 = E(a3, o3, 19) ^ O(a3, o3, 61) ^ w(a3, o3, 6), l3 = ne(i3, c3, M[e3 - 7], M[e3 - 16]), u3 = re(l3, r3, s3, j[e3 - 7], j[e3 - 16]);
      j[e3] = u3 | 0, M[e3] = l3 | 0;
    }
    let { Ah: n2, Al: r2, Bh: i2, Bl: a2, Ch: o2, Cl: s2, Dh: c2, Dl: l2, Eh: u2, El: d2, Fh: f2, Fl: p2, Gh: m2, Gl: h2, Hh: g2, Hl: _2 } = this;
    for (let e3 = 0; e3 < 80; e3++) {
      let t3 = T(u2, d2, 14) ^ T(u2, d2, 18) ^ D(u2, d2, 41), v2 = E(u2, d2, 14) ^ E(u2, d2, 18) ^ O(u2, d2, 41), y2 = u2 & f2 ^ ~u2 & m2, b2 = d2 & p2 ^ ~d2 & h2, x2 = ie(_2, v2, b2, se[e3], M[e3]), S2 = ae(x2, g2, t3, y2, oe[e3], j[e3]), C2 = x2 | 0, w2 = T(n2, r2, 28) ^ D(n2, r2, 34) ^ D(n2, r2, 39), ne2 = E(n2, r2, 28) ^ O(n2, r2, 34) ^ O(n2, r2, 39), re2 = n2 & i2 ^ n2 & o2 ^ i2 & o2, A2 = r2 & a2 ^ r2 & s2 ^ a2 & s2;
      g2 = m2 | 0, _2 = h2 | 0, m2 = f2 | 0, h2 = p2 | 0, f2 = u2 | 0, p2 = d2 | 0, { h: u2, l: d2 } = k(c2 | 0, l2 | 0, S2 | 0, C2 | 0), c2 = o2 | 0, l2 = s2 | 0, o2 = i2 | 0, s2 = a2 | 0, i2 = n2 | 0, a2 = r2 | 0;
      let N2 = ee(C2, ne2, A2);
      n2 = te(N2, S2, w2, re2), r2 = N2 | 0;
    }
    ({ h: n2, l: r2 } = k(this.Ah | 0, this.Al | 0, n2 | 0, r2 | 0)), { h: i2, l: a2 } = k(this.Bh | 0, this.Bl | 0, i2 | 0, a2 | 0), { h: o2, l: s2 } = k(this.Ch | 0, this.Cl | 0, o2 | 0, s2 | 0), { h: c2, l: l2 } = k(this.Dh | 0, this.Dl | 0, c2 | 0, l2 | 0), { h: u2, l: d2 } = k(this.Eh | 0, this.El | 0, u2 | 0, d2 | 0), { h: f2, l: p2 } = k(this.Fh | 0, this.Fl | 0, f2 | 0, p2 | 0), { h: m2, l: h2 } = k(this.Gh | 0, this.Gl | 0, m2 | 0, h2 | 0), { h: g2, l: _2 } = k(this.Hh | 0, this.Hl | 0, g2 | 0, _2 | 0), this.set(n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2, _2);
  }
  roundClean() {
    a(j, M);
  }
  destroy() {
    a(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}, ce = class extends N {
  Ah = v[0] | 0;
  Al = v[1] | 0;
  Bh = v[2] | 0;
  Bl = v[3] | 0;
  Ch = v[4] | 0;
  Cl = v[5] | 0;
  Dh = v[6] | 0;
  Dl = v[7] | 0;
  Eh = v[8] | 0;
  El = v[9] | 0;
  Fh = v[10] | 0;
  Fl = v[11] | 0;
  Gh = v[12] | 0;
  Gl = v[13] | 0;
  Hh = v[14] | 0;
  Hl = v[15] | 0;
  constructor() {
    super(64);
  }
};
const le = m(() => new ce(), g(3)), ue = BigInt(0), de = BigInt(1);
function P(e2, t2 = ``) {
  if (typeof e2 != `boolean`) {
    let n2 = t2 && `"${t2}" `;
    throw Error(n2 + `expected boolean, got type=` + typeof e2);
  }
  return e2;
}
function fe(e2) {
  if (typeof e2 == `bigint`) {
    if (!L(e2)) throw Error(`positive bigint expected, got ` + e2);
  } else t(e2);
  return e2;
}
function pe(e2) {
  if (typeof e2 != `string`) throw Error(`hex string expected, got ` + typeof e2);
  return e2 === `` ? ue : BigInt(`0x` + e2);
}
function me(e2) {
  return pe(l(e2));
}
function F(e2) {
  return pe(l(I(n(e2)).reverse()));
}
function he(e2, n2) {
  t(n2), e2 = fe(e2);
  let r2 = f(e2.toString(16).padStart(n2 * 2, `0`));
  if (r2.length !== n2) throw Error(`number too large`);
  return r2;
}
function ge(e2, t2) {
  return he(e2, t2).reverse();
}
function I(e2) {
  return Uint8Array.from(e2);
}
const L = (e2) => typeof e2 == `bigint` && ue <= e2;
function _e(e2, t2, n2) {
  return L(e2) && L(t2) && L(n2) && t2 <= e2 && e2 < n2;
}
function ve(e2, t2, n2, r2) {
  if (!_e(t2, n2, r2)) throw Error(`expected valid ` + e2 + `: ` + n2 + ` <= n < ` + r2 + `, got ` + t2);
}
const ye = (e2) => (de << BigInt(e2)) - de;
function R(e2, t2 = {}, n2 = {}) {
  if (!e2 || typeof e2 != `object`) throw Error(`expected valid options object`);
  function r2(t3, n3, r3) {
    let i3 = e2[t3];
    if (r3 && i3 === void 0) return;
    let a2 = typeof i3;
    if (a2 !== n3 || i3 === null) throw Error(`param "${t3}" is invalid: expected ${n3}, got ${a2}`);
  }
  let i2 = (e3, t3) => Object.entries(e3).forEach(([e4, n3]) => r2(e4, n3, t3));
  i2(t2, false), i2(n2, true);
}
function be(e2) {
  let t2 = /* @__PURE__ */ new WeakMap();
  return (n2, ...r2) => {
    let i2 = t2.get(n2);
    if (i2 !== void 0) return i2;
    let a2 = e2(n2, ...r2);
    return t2.set(n2, a2), a2;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const z = BigInt(0), B = BigInt(1), V = BigInt(2), xe = BigInt(3), Se = BigInt(4), Ce = BigInt(5), we = BigInt(7), Te = BigInt(8), Ee = BigInt(9), De = BigInt(16);
function H(e2, t2) {
  let n2 = e2 % t2;
  return n2 >= z ? n2 : t2 + n2;
}
function U(e2, t2, n2) {
  let r2 = e2;
  for (; t2-- > z; ) r2 *= r2, r2 %= n2;
  return r2;
}
function Oe(e2, t2) {
  if (e2 === z) throw Error(`invert: expected non-zero number`);
  if (t2 <= z) throw Error(`invert: expected positive modulus, got ` + t2);
  let n2 = H(e2, t2), r2 = t2, i2 = z, a2 = B, o2 = B, s2 = z;
  for (; n2 !== z; ) {
    let e3 = r2 / n2, t3 = r2 % n2, c2 = i2 - o2 * e3, l2 = a2 - s2 * e3;
    r2 = n2, n2 = t3, i2 = o2, a2 = s2, o2 = c2, s2 = l2;
  }
  if (r2 !== B) throw Error(`invert: does not exist`);
  return H(i2, t2);
}
function W(e2, t2, n2) {
  if (!e2.eql(e2.sqr(t2), n2)) throw Error(`Cannot find square root`);
}
function ke(e2, t2) {
  let n2 = (e2.ORDER + B) / Se, r2 = e2.pow(t2, n2);
  return W(e2, r2, t2), r2;
}
function Ae(e2, t2) {
  let n2 = (e2.ORDER - Ce) / Te, r2 = e2.mul(t2, V), i2 = e2.pow(r2, n2), a2 = e2.mul(t2, i2), o2 = e2.mul(e2.mul(a2, V), i2), s2 = e2.mul(a2, e2.sub(o2, e2.ONE));
  return W(e2, s2, t2), s2;
}
function je(e2) {
  let t2 = G(e2), n2 = Me(e2), r2 = n2(t2, t2.neg(t2.ONE)), i2 = n2(t2, r2), a2 = n2(t2, t2.neg(r2)), o2 = (e2 + we) / De;
  return (e3, t3) => {
    let n3 = e3.pow(t3, o2), s2 = e3.mul(n3, r2), c2 = e3.mul(n3, i2), l2 = e3.mul(n3, a2), u2 = e3.eql(e3.sqr(s2), t3), d2 = e3.eql(e3.sqr(c2), t3);
    n3 = e3.cmov(n3, s2, u2), s2 = e3.cmov(l2, c2, d2);
    let f2 = e3.eql(e3.sqr(s2), t3), p2 = e3.cmov(n3, s2, f2);
    return W(e3, p2, t3), p2;
  };
}
function Me(e2) {
  if (e2 < xe) throw Error(`sqrt is not defined for small field`);
  let t2 = e2 - B, n2 = 0;
  for (; t2 % V === z; ) t2 /= V, n2++;
  let r2 = V, i2 = G(e2);
  for (; ze(i2, r2) === 1; ) if (r2++ > 1e3) throw Error(`Cannot find square root: probably non-prime P`);
  if (n2 === 1) return ke;
  let a2 = i2.pow(r2, t2), o2 = (t2 + B) / V;
  return function(e3, r3) {
    if (e3.is0(r3)) return r3;
    if (ze(e3, r3) !== 1) throw Error(`Cannot find square root`);
    let i3 = n2, s2 = e3.mul(e3.ONE, a2), c2 = e3.pow(r3, t2), l2 = e3.pow(r3, o2);
    for (; !e3.eql(c2, e3.ONE); ) {
      if (e3.is0(c2)) return e3.ZERO;
      let t3 = 1, n3 = e3.sqr(c2);
      for (; !e3.eql(n3, e3.ONE); ) if (t3++, n3 = e3.sqr(n3), t3 === i3) throw Error(`Cannot find square root`);
      let r4 = B << BigInt(i3 - t3 - 1), a3 = e3.pow(s2, r4);
      i3 = t3, s2 = e3.sqr(a3), c2 = e3.mul(c2, s2), l2 = e3.mul(l2, a3);
    }
    return l2;
  };
}
function Ne(e2) {
  return e2 % Se === xe ? ke : e2 % Te === Ce ? Ae : e2 % De === Ee ? je(e2) : Me(e2);
}
const Pe = (e2, t2) => (H(e2, t2) & B) === B, Fe = [`create`, `isValid`, `is0`, `neg`, `inv`, `sqrt`, `sqr`, `eql`, `add`, `sub`, `mul`, `pow`, `div`, `addN`, `subN`, `mulN`, `sqrN`];
function Ie(e2) {
  return R(e2, Fe.reduce((e3, t2) => (e3[t2] = `function`, e3), { ORDER: `bigint`, BYTES: `number`, BITS: `number` })), e2;
}
function Le(e2, t2, n2) {
  if (n2 < z) throw Error(`invalid exponent, negatives unsupported`);
  if (n2 === z) return e2.ONE;
  if (n2 === B) return t2;
  let r2 = e2.ONE, i2 = t2;
  for (; n2 > z; ) n2 & B && (r2 = e2.mul(r2, i2)), i2 = e2.sqr(i2), n2 >>= B;
  return r2;
}
function Re(e2, t2, n2 = false) {
  let r2 = Array(t2.length).fill(n2 ? e2.ZERO : void 0), i2 = t2.reduce((t3, n3, i3) => e2.is0(n3) ? t3 : (r2[i3] = t3, e2.mul(t3, n3)), e2.ONE), a2 = e2.inv(i2);
  return t2.reduceRight((t3, n3, i3) => e2.is0(n3) ? t3 : (r2[i3] = e2.mul(t3, r2[i3]), e2.mul(t3, n3)), a2), r2;
}
function ze(e2, t2) {
  let n2 = (e2.ORDER - B) / V, r2 = e2.pow(t2, n2), i2 = e2.eql(r2, e2.ONE), a2 = e2.eql(r2, e2.ZERO), o2 = e2.eql(r2, e2.neg(e2.ONE));
  if (!i2 && !a2 && !o2) throw Error(`invalid Legendre symbol result`);
  return i2 ? 1 : a2 ? 0 : -1;
}
function Be(e2, n2) {
  n2 !== void 0 && t(n2);
  let r2 = n2 === void 0 ? e2.toString(2).length : n2;
  return { nBitLength: r2, nByteLength: Math.ceil(r2 / 8) };
}
var Ve = class {
  ORDER;
  BITS;
  BYTES;
  isLE;
  ZERO = z;
  ONE = B;
  _lengths;
  _sqrt;
  _mod;
  constructor(e2, t2 = {}) {
    if (e2 <= z) throw Error(`invalid field: expected ORDER > 0, got ` + e2);
    let n2;
    this.isLE = false, typeof t2 == `object` && t2 && (typeof t2.BITS == `number` && (n2 = t2.BITS), typeof t2.sqrt == `function` && (this.sqrt = t2.sqrt), typeof t2.isLE == `boolean` && (this.isLE = t2.isLE), t2.allowedLengths && (this._lengths = t2.allowedLengths?.slice()), typeof t2.modFromBytes == `boolean` && (this._mod = t2.modFromBytes));
    let { nBitLength: r2, nByteLength: i2 } = Be(e2, n2);
    if (i2 > 2048) throw Error(`invalid field: expected ORDER of <= 2048 bytes`);
    this.ORDER = e2, this.BITS = r2, this.BYTES = i2, this._sqrt = void 0, Object.preventExtensions(this);
  }
  create(e2) {
    return H(e2, this.ORDER);
  }
  isValid(e2) {
    if (typeof e2 != `bigint`) throw Error(`invalid field element: expected bigint, got ` + typeof e2);
    return z <= e2 && e2 < this.ORDER;
  }
  is0(e2) {
    return e2 === z;
  }
  isValidNot0(e2) {
    return !this.is0(e2) && this.isValid(e2);
  }
  isOdd(e2) {
    return (e2 & B) === B;
  }
  neg(e2) {
    return H(-e2, this.ORDER);
  }
  eql(e2, t2) {
    return e2 === t2;
  }
  sqr(e2) {
    return H(e2 * e2, this.ORDER);
  }
  add(e2, t2) {
    return H(e2 + t2, this.ORDER);
  }
  sub(e2, t2) {
    return H(e2 - t2, this.ORDER);
  }
  mul(e2, t2) {
    return H(e2 * t2, this.ORDER);
  }
  pow(e2, t2) {
    return Le(this, e2, t2);
  }
  div(e2, t2) {
    return H(e2 * Oe(t2, this.ORDER), this.ORDER);
  }
  sqrN(e2) {
    return e2 * e2;
  }
  addN(e2, t2) {
    return e2 + t2;
  }
  subN(e2, t2) {
    return e2 - t2;
  }
  mulN(e2, t2) {
    return e2 * t2;
  }
  inv(e2) {
    return Oe(e2, this.ORDER);
  }
  sqrt(e2) {
    return this._sqrt ||= Ne(this.ORDER), this._sqrt(this, e2);
  }
  toBytes(e2) {
    return this.isLE ? ge(e2, this.BYTES) : he(e2, this.BYTES);
  }
  fromBytes(e2, t2 = false) {
    n(e2);
    let { _lengths: r2, BYTES: i2, isLE: a2, ORDER: o2, _mod: s2 } = this;
    if (r2) {
      if (!r2.includes(e2.length) || e2.length > i2) throw Error(`Field.fromBytes: expected ` + r2 + ` bytes, got ` + e2.length);
      let t3 = new Uint8Array(i2);
      t3.set(e2, a2 ? 0 : t3.length - e2.length), e2 = t3;
    }
    if (e2.length !== i2) throw Error(`Field.fromBytes: expected ` + i2 + ` bytes, got ` + e2.length);
    let c2 = a2 ? F(e2) : me(e2);
    if (s2 && (c2 = H(c2, o2)), !t2 && !this.isValid(c2)) throw Error(`invalid field element: outside of range 0..ORDER`);
    return c2;
  }
  invertBatch(e2) {
    return Re(this, e2);
  }
  cmov(e2, t2, n2) {
    return n2 ? t2 : e2;
  }
};
function G(e2, t2 = {}) {
  return new Ve(e2, t2);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const K = BigInt(0), q = BigInt(1);
function He(e2, t2) {
  let n2 = t2.negate();
  return e2 ? n2 : t2;
}
function J(e2, t2) {
  let n2 = Re(e2.Fp, t2.map((e3) => e3.Z));
  return t2.map((t3, r2) => e2.fromAffine(t3.toAffine(n2[r2])));
}
function Ue(e2, t2) {
  if (!Number.isSafeInteger(e2) || e2 <= 0 || e2 > t2) throw Error(`invalid window size, expected [1..` + t2 + `], got W=` + e2);
}
function Y(e2, t2) {
  Ue(e2, t2);
  let n2 = Math.ceil(t2 / e2) + 1, r2 = 2 ** (e2 - 1), i2 = 2 ** e2;
  return { windows: n2, windowSize: r2, mask: ye(e2), maxNumber: i2, shiftBy: BigInt(e2) };
}
function We(e2, t2, n2) {
  let { windowSize: r2, mask: i2, maxNumber: a2, shiftBy: o2 } = n2, s2 = Number(e2 & i2), c2 = e2 >> o2;
  s2 > r2 && (s2 -= a2, c2 += q);
  let l2 = t2 * r2, u2 = l2 + Math.abs(s2) - 1, d2 = s2 === 0, f2 = s2 < 0, p2 = t2 % 2 != 0;
  return { nextN: c2, offset: u2, isZero: d2, isNeg: f2, isNegF: p2, offsetF: l2 };
}
const X = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap();
function Z(e2) {
  return Ge.get(e2) || 1;
}
function Ke(e2) {
  if (e2 !== K) throw Error(`invalid wNAF`);
}
var qe = class {
  BASE;
  ZERO;
  Fn;
  bits;
  constructor(e2, t2) {
    this.BASE = e2.BASE, this.ZERO = e2.ZERO, this.Fn = e2.Fn, this.bits = t2;
  }
  _unsafeLadder(e2, t2, n2 = this.ZERO) {
    let r2 = e2;
    for (; t2 > K; ) t2 & q && (n2 = n2.add(r2)), r2 = r2.double(), t2 >>= q;
    return n2;
  }
  precomputeWindow(e2, t2) {
    let { windows: n2, windowSize: r2 } = Y(t2, this.bits), i2 = [], a2 = e2, o2 = a2;
    for (let e3 = 0; e3 < n2; e3++) {
      o2 = a2, i2.push(o2);
      for (let e4 = 1; e4 < r2; e4++) o2 = o2.add(a2), i2.push(o2);
      a2 = o2.double();
    }
    return i2;
  }
  wNAF(e2, t2, n2) {
    if (!this.Fn.isValid(n2)) throw Error(`invalid scalar`);
    let r2 = this.ZERO, i2 = this.BASE, a2 = Y(e2, this.bits);
    for (let e3 = 0; e3 < a2.windows; e3++) {
      let { nextN: o2, offset: s2, isZero: c2, isNeg: l2, isNegF: u2, offsetF: d2 } = We(n2, e3, a2);
      n2 = o2, c2 ? i2 = i2.add(He(u2, t2[d2])) : r2 = r2.add(He(l2, t2[s2]));
    }
    return Ke(n2), { p: r2, f: i2 };
  }
  wNAFUnsafe(e2, t2, n2, r2 = this.ZERO) {
    let i2 = Y(e2, this.bits);
    for (let e3 = 0; e3 < i2.windows && n2 !== K; e3++) {
      let { nextN: a2, offset: o2, isZero: s2, isNeg: c2 } = We(n2, e3, i2);
      if (n2 = a2, !s2) {
        let e4 = t2[o2];
        r2 = r2.add(c2 ? e4.negate() : e4);
      }
    }
    return Ke(n2), r2;
  }
  getPrecomputes(e2, t2, n2) {
    let r2 = X.get(t2);
    return r2 || (r2 = this.precomputeWindow(t2, e2), e2 !== 1 && (typeof n2 == `function` && (r2 = n2(r2)), X.set(t2, r2))), r2;
  }
  cached(e2, t2, n2) {
    let r2 = Z(e2);
    return this.wNAF(r2, this.getPrecomputes(r2, e2, n2), t2);
  }
  unsafe(e2, t2, n2, r2) {
    let i2 = Z(e2);
    return i2 === 1 ? this._unsafeLadder(e2, t2, r2) : this.wNAFUnsafe(i2, this.getPrecomputes(i2, e2, n2), t2, r2);
  }
  createCache(e2, t2) {
    Ue(t2, this.bits), Ge.set(e2, t2), X.delete(e2);
  }
  hasCache(e2) {
    return Z(e2) !== 1;
  }
};
function Je(e2, t2, n2) {
  if (t2) {
    if (t2.ORDER !== e2) throw Error(`Field.ORDER must match order: Fp == p, Fn == n`);
    return Ie(t2), t2;
  }
  return G(e2, { isLE: n2 });
}
function Ye(e2, t2, n2 = {}, r2) {
  if (r2 === void 0 && (r2 = e2 === `edwards`), !t2 || typeof t2 != `object`) throw Error(`expected valid ${e2} CURVE object`);
  for (let e3 of [`p`, `n`, `h`]) {
    let n3 = t2[e3];
    if (!(typeof n3 == `bigint` && n3 > K)) throw Error(`CURVE.${e3} must be positive bigint`);
  }
  let i2 = Je(t2.p, n2.Fp, r2), a2 = Je(t2.n, n2.Fn, r2), o2 = [`Gx`, `Gy`, `a`, e2 === `weierstrass` ? `b` : `d`];
  for (let e3 of o2) if (!i2.isValid(t2[e3])) throw Error(`CURVE.${e3} must be valid field element of CURVE.Fp`);
  return t2 = Object.freeze(Object.assign({}, t2)), { CURVE: t2, Fp: i2, Fn: a2 };
}
function Xe(e2, t2) {
  return function(n2) {
    let r2 = e2(n2);
    return { secretKey: r2, publicKey: t2(r2) };
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Q = BigInt(0), $ = BigInt(1), Ze = BigInt(2), Qe = BigInt(8);
function $e(e2, t2, n2, r2) {
  let i2 = e2.sqr(n2), a2 = e2.sqr(r2), o2 = e2.add(e2.mul(t2.a, i2), a2), s2 = e2.add(e2.ONE, e2.mul(t2.d, e2.mul(i2, a2)));
  return e2.eql(o2, s2);
}
function et(e2, t2 = {}) {
  let r2 = Ye(`edwards`, e2, t2, t2.FpFnLE), { Fp: i2, Fn: a2 } = r2, o2 = r2.CURVE, { h: s2 } = o2;
  R(t2, {}, { uvRatio: `function` });
  let c2 = Ze << BigInt(a2.BYTES * 8) - $, u2 = (e3) => i2.create(e3), d2 = t2.uvRatio || ((e3, t3) => {
    try {
      return { isValid: true, value: i2.sqrt(i2.div(e3, t3)) };
    } catch {
      return { isValid: false, value: Q };
    }
  });
  if (!$e(i2, o2, o2.Gx, o2.Gy)) throw Error(`bad curve params: generator point`);
  function p2(e3, t3, n2 = false) {
    let r3 = n2 ? $ : Q;
    return ve(`coordinate ` + e3, t3, r3, c2), t3;
  }
  function m2(e3) {
    if (!(e3 instanceof _2)) throw Error(`EdwardsPoint expected`);
  }
  let h2 = be((e3, t3) => {
    let { X: n2, Y: r3, Z: a3 } = e3, o3 = e3.is0();
    t3 ??= o3 ? Qe : i2.inv(a3);
    let s3 = u2(n2 * t3), c3 = u2(r3 * t3), l2 = i2.mul(a3, t3);
    if (o3) return { x: Q, y: $ };
    if (l2 !== $) throw Error(`invZ was invalid`);
    return { x: s3, y: c3 };
  }), g2 = be((e3) => {
    let { a: t3, d: n2 } = o2;
    if (e3.is0()) throw Error(`bad point: ZERO`);
    let { X: r3, Y: i3, Z: a3, T: s3 } = e3, c3 = u2(r3 * r3), l2 = u2(i3 * i3), d3 = u2(a3 * a3), f2 = u2(d3 * d3), p3 = u2(c3 * t3);
    if (u2(d3 * u2(p3 + l2)) !== u2(f2 + u2(n2 * u2(c3 * l2)))) throw Error(`bad point: equation left != right (1)`);
    if (u2(r3 * i3) !== u2(a3 * s3)) throw Error(`bad point: equation left != right (2)`);
    return true;
  });
  class _2 {
    static BASE = new _2(o2.Gx, o2.Gy, $, u2(o2.Gx * o2.Gy));
    static ZERO = new _2(Q, $, $, Q);
    static Fp = i2;
    static Fn = a2;
    X;
    Y;
    Z;
    T;
    constructor(e3, t3, n2, r3) {
      this.X = p2(`x`, e3), this.Y = p2(`y`, t3), this.Z = p2(`z`, n2, true), this.T = p2(`t`, r3), Object.freeze(this);
    }
    static CURVE() {
      return o2;
    }
    static fromAffine(e3) {
      if (e3 instanceof _2) throw Error(`extended point not allowed`);
      let { x: t3, y: n2 } = e3 || {};
      return p2(`x`, t3), p2(`y`, n2), new _2(t3, n2, $, u2(t3 * n2));
    }
    static fromBytes(e3, t3 = false) {
      let r3 = i2.BYTES, { a: a3, d: s3 } = o2;
      e3 = I(n(e3, r3, `point`)), P(t3, `zip215`);
      let l2 = I(e3), f2 = e3[r3 - 1];
      l2[r3 - 1] = f2 & -129;
      let p3 = F(l2), m3 = t3 ? c2 : i2.ORDER;
      ve(`point.y`, p3, Q, m3);
      let h3 = u2(p3 * p3), g3 = u2(h3 - $), v3 = u2(s3 * h3 - a3), { isValid: y2, value: b2 } = d2(g3, v3);
      if (!y2) throw Error(`bad point: invalid y coordinate`);
      let x2 = (b2 & $) === $, S2 = !!(f2 & 128);
      if (!t3 && b2 === Q && S2) throw Error(`bad point: x=0 and x_0=1`);
      return S2 !== x2 && (b2 = u2(-b2)), _2.fromAffine({ x: b2, y: p3 });
    }
    static fromHex(e3, t3 = false) {
      return _2.fromBytes(f(e3), t3);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(e3 = 8, t3 = true) {
      return v2.createCache(this, e3), t3 || this.multiply(Ze), this;
    }
    assertValidity() {
      g2(this);
    }
    equals(e3) {
      m2(e3);
      let { X: t3, Y: n2, Z: r3 } = this, { X: i3, Y: a3, Z: o3 } = e3, s3 = u2(t3 * o3), c3 = u2(i3 * r3), l2 = u2(n2 * o3), d3 = u2(a3 * r3);
      return s3 === c3 && l2 === d3;
    }
    is0() {
      return this.equals(_2.ZERO);
    }
    negate() {
      return new _2(u2(-this.X), this.Y, this.Z, u2(-this.T));
    }
    double() {
      let { a: e3 } = o2, { X: t3, Y: n2, Z: r3 } = this, i3 = u2(t3 * t3), a3 = u2(n2 * n2), s3 = u2(Ze * u2(r3 * r3)), c3 = u2(e3 * i3), l2 = t3 + n2, d3 = u2(u2(l2 * l2) - i3 - a3), f2 = c3 + a3, p3 = f2 - s3, m3 = c3 - a3, h3 = u2(d3 * p3), g3 = u2(f2 * m3), v3 = u2(d3 * m3), y2 = u2(p3 * f2);
      return new _2(h3, g3, y2, v3);
    }
    add(e3) {
      m2(e3);
      let { a: t3, d: n2 } = o2, { X: r3, Y: i3, Z: a3, T: s3 } = this, { X: c3, Y: l2, Z: d3, T: f2 } = e3, p3 = u2(r3 * c3), h3 = u2(i3 * l2), g3 = u2(s3 * n2 * f2), v3 = u2(a3 * d3), y2 = u2((r3 + i3) * (c3 + l2) - p3 - h3), b2 = v3 - g3, x2 = v3 + g3, S2 = u2(h3 - t3 * p3), C2 = u2(y2 * b2), w2 = u2(x2 * S2), T2 = u2(y2 * S2), E2 = u2(b2 * x2);
      return new _2(C2, w2, E2, T2);
    }
    subtract(e3) {
      return this.add(e3.negate());
    }
    multiply(e3) {
      if (!a2.isValidNot0(e3)) throw Error(`invalid scalar: expected 1 <= sc < curve.n`);
      let { p: t3, f: n2 } = v2.cached(this, e3, (e4) => J(_2, e4));
      return J(_2, [t3, n2])[0];
    }
    multiplyUnsafe(e3, t3 = _2.ZERO) {
      if (!a2.isValid(e3)) throw Error(`invalid scalar: expected 0 <= sc < curve.n`);
      return e3 === Q ? _2.ZERO : this.is0() || e3 === $ ? this : v2.unsafe(this, e3, (e4) => J(_2, e4), t3);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(s2).is0();
    }
    isTorsionFree() {
      return v2.unsafe(this, o2.n).is0();
    }
    toAffine(e3) {
      return h2(this, e3);
    }
    clearCofactor() {
      return s2 === $ ? this : this.multiplyUnsafe(s2);
    }
    toBytes() {
      let { x: e3, y: t3 } = this.toAffine(), n2 = i2.toBytes(t3);
      return n2[n2.length - 1] |= e3 & $ ? 128 : 0, n2;
    }
    toHex() {
      return l(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? `ZERO` : this.toHex()}>`;
    }
  }
  let v2 = new qe(_2, a2.BITS);
  return _2.BASE.precompute(8), _2;
}
function tt(t2, r2, i2 = {}) {
  if (typeof r2 != `function`) throw Error(`"hash" function param is required`);
  R(i2, {}, { adjustScalarBytes: `function`, randomBytes: `function`, domain: `function`, prehash: `function`, mapToCurve: `function` });
  let { prehash: a2 } = i2, { BASE: o2, Fp: s2, Fn: c2 } = t2, l2 = i2.randomBytes || h, u2 = i2.adjustScalarBytes || ((e2) => e2), d2 = i2.domain || ((e2, t3, n2) => {
    if (P(n2, `phflag`), t3.length || n2) throw Error(`Contexts/pre-hash are not supported`);
    return e2;
  });
  function f2(e2) {
    return c2.create(F(e2));
  }
  function m2(e2) {
    let t3 = C2.secretKey;
    n(e2, C2.secretKey, `secretKey`);
    let i3 = n(r2(e2), 2 * t3, `hashedSecretKey`), a3 = u2(i3.slice(0, t3));
    return { head: a3, prefix: i3.slice(t3, 2 * t3), scalar: f2(a3) };
  }
  function g2(e2) {
    let { head: t3, prefix: n2, scalar: r3 } = m2(e2), i3 = o2.multiply(r3);
    return { head: t3, prefix: n2, scalar: r3, point: i3, pointBytes: i3.toBytes() };
  }
  function _2(e2) {
    return g2(e2).pointBytes;
  }
  function v2(e2 = Uint8Array.of(), ...t3) {
    let i3 = p(...t3);
    return f2(r2(d2(i3, n(e2, void 0, `context`), !!a2)));
  }
  function y2(e2, t3, r3 = {}) {
    e2 = n(e2, void 0, `message`), a2 && (e2 = a2(e2));
    let { prefix: i3, scalar: s3, pointBytes: l3 } = g2(t3), u3 = v2(r3.context, i3, e2), d3 = o2.multiply(u3).toBytes(), f3 = v2(r3.context, d3, l3, e2), m3 = c2.create(u3 + f3 * s3);
    if (!c2.isValid(m3)) throw Error(`sign failed: invalid s`);
    return n(p(d3, c2.toBytes(m3)), C2.signature, `result`);
  }
  let b2 = { zip215: true };
  function x2(e2, r3, i3, s3 = b2) {
    let { context: c3, zip215: l3 } = s3, u3 = C2.signature;
    e2 = n(e2, u3, `signature`), r3 = n(r3, void 0, `message`), i3 = n(i3, C2.publicKey, `publicKey`), l3 !== void 0 && P(l3, `zip215`), a2 && (r3 = a2(r3));
    let d3 = u3 / 2, f3 = e2.subarray(0, d3), p2 = F(e2.subarray(d3, u3)), m3, h2, g3;
    try {
      m3 = t2.fromBytes(i3, l3), h2 = t2.fromBytes(f3, l3), g3 = o2.multiplyUnsafe(p2);
    } catch {
      return false;
    }
    if (!l3 && m3.isSmallOrder()) return false;
    let _3 = v2(c3, h2.toBytes(), m3.toBytes(), r3);
    return h2.add(m3.multiplyUnsafe(_3)).subtract(g3).clearCofactor().is0();
  }
  let S2 = s2.BYTES, C2 = { secretKey: S2, publicKey: S2, signature: 2 * S2, seed: S2 };
  function w2(e2 = l2(C2.seed)) {
    return n(e2, C2.seed, `seed`);
  }
  function T2(t3) {
    return e(t3) && t3.length === c2.BYTES;
  }
  function E2(e2, n2) {
    try {
      return !!t2.fromBytes(e2, n2);
    } catch {
      return false;
    }
  }
  let D2 = { getExtendedPublicKey: g2, randomSecretKey: w2, isValidSecretKey: T2, isValidPublicKey: E2, toMontgomery(e2) {
    let { y: n2 } = t2.fromBytes(e2), r3 = C2.publicKey, i3 = r3 === 32;
    if (!i3 && r3 !== 57) throw Error(`only defined for 25519 and 448`);
    let a3 = i3 ? s2.div($ + n2, $ - n2) : s2.div(n2 - $, n2 + $);
    return s2.toBytes(a3);
  }, toMontgomerySecret(e2) {
    let t3 = C2.secretKey;
    n(e2, t3);
    let i3 = r2(e2.subarray(0, t3));
    return u2(i3).subarray(0, t3);
  } };
  return Object.freeze({ keygen: Xe(w2, _2), getPublicKey: _2, sign: y2, verify: x2, utils: D2, Point: t2, lengths: C2 });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const nt = BigInt(1), rt = BigInt(2), it = BigInt(5), at = BigInt(8), ot = BigInt(`0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed`), st = { p: ot, n: BigInt(`0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed`), h: at, a: BigInt(`0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec`), d: BigInt(`0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3`), Gx: BigInt(`0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a`), Gy: BigInt(`0x6666666666666666666666666666666666666666666666666666666666666658`) };
function ct(e2) {
  let t2 = BigInt(10), n2 = BigInt(20), r2 = BigInt(40), i2 = BigInt(80), a2 = ot, o2 = e2 * e2 % a2 * e2 % a2, s2 = U(U(o2, rt, a2) * o2 % a2, nt, a2) * e2 % a2, c2 = U(s2, it, a2) * s2 % a2, l2 = U(c2, t2, a2) * c2 % a2, u2 = U(l2, n2, a2) * l2 % a2, d2 = U(u2, r2, a2) * u2 % a2;
  return { pow_p_5_8: U(U(U(U(d2, i2, a2) * d2 % a2, i2, a2) * d2 % a2, t2, a2) * c2 % a2, rt, a2) * e2 % a2, b2: o2 };
}
function lt(e2) {
  return e2[0] &= 248, e2[31] &= 127, e2[31] |= 64, e2;
}
const ut = BigInt(`19681161376707505956807079304988542015446066515923890162744021073123829784752`);
function dt(e2, t2) {
  let n2 = ot, r2 = H(t2 * t2 * t2, n2), i2 = ct(e2 * H(r2 * r2 * t2, n2)).pow_p_5_8, a2 = H(e2 * r2 * i2, n2), o2 = H(t2 * a2 * a2, n2), s2 = a2, c2 = H(a2 * ut, n2), l2 = o2 === e2, u2 = o2 === H(-e2, n2), d2 = o2 === H(-e2 * ut, n2);
  return l2 && (a2 = s2), (u2 || d2) && (a2 = c2), Pe(a2, n2) && (a2 = H(-a2, n2)), { isValid: l2 || u2, value: a2 };
}
const ft = et(st, { uvRatio: dt });
function pt(e2) {
  return tt(ft, le, Object.assign({ adjustScalarBytes: lt }, e2));
}
const mt = pt({});
export { mt as t };
