import { t as e } from "./rolldown-runtime-D0SfkDIG.js";
var t = e(((e2) => {
  e2.byteLength = c2, e2.toByteArray = u2, e2.fromByteArray = p2;
  for (var t2 = [], n2 = [], r2 = typeof Uint8Array < `u` ? Uint8Array : Array, i2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`, a2 = 0, o2 = i2.length; a2 < o2; ++a2) t2[a2] = i2[a2], n2[i2.charCodeAt(a2)] = a2;
  n2[45] = 62, n2[95] = 63;
  function s2(e3) {
    var t3 = e3.length;
    if (t3 % 4 > 0) throw Error(`Invalid string. Length must be a multiple of 4`);
    var n3 = e3.indexOf(`=`);
    n3 === -1 && (n3 = t3);
    var r3 = n3 === t3 ? 0 : 4 - n3 % 4;
    return [n3, r3];
  }
  function c2(e3) {
    var t3 = s2(e3), n3 = t3[0], r3 = t3[1];
    return (n3 + r3) * 3 / 4 - r3;
  }
  function l2(e3, t3, n3) {
    return (t3 + n3) * 3 / 4 - n3;
  }
  function u2(e3) {
    var t3, i3 = s2(e3), a3 = i3[0], o3 = i3[1], c3 = new r2(l2(e3, a3, o3)), u3 = 0, d3 = o3 > 0 ? a3 - 4 : a3, f3;
    for (f3 = 0; f3 < d3; f3 += 4) t3 = n2[e3.charCodeAt(f3)] << 18 | n2[e3.charCodeAt(f3 + 1)] << 12 | n2[e3.charCodeAt(f3 + 2)] << 6 | n2[e3.charCodeAt(f3 + 3)], c3[u3++] = t3 >> 16 & 255, c3[u3++] = t3 >> 8 & 255, c3[u3++] = t3 & 255;
    return o3 === 2 && (t3 = n2[e3.charCodeAt(f3)] << 2 | n2[e3.charCodeAt(f3 + 1)] >> 4, c3[u3++] = t3 & 255), o3 === 1 && (t3 = n2[e3.charCodeAt(f3)] << 10 | n2[e3.charCodeAt(f3 + 1)] << 4 | n2[e3.charCodeAt(f3 + 2)] >> 2, c3[u3++] = t3 >> 8 & 255, c3[u3++] = t3 & 255), c3;
  }
  function d2(e3) {
    return t2[e3 >> 18 & 63] + t2[e3 >> 12 & 63] + t2[e3 >> 6 & 63] + t2[e3 & 63];
  }
  function f2(e3, t3, n3) {
    for (var r3, i3 = [], a3 = t3; a3 < n3; a3 += 3) r3 = (e3[a3] << 16 & 16711680) + (e3[a3 + 1] << 8 & 65280) + (e3[a3 + 2] & 255), i3.push(d2(r3));
    return i3.join(``);
  }
  function p2(e3) {
    for (var n3, r3 = e3.length, i3 = r3 % 3, a3 = [], o3 = 16383, s3 = 0, c3 = r3 - i3; s3 < c3; s3 += o3) a3.push(f2(e3, s3, s3 + o3 > c3 ? c3 : s3 + o3));
    return i3 === 1 ? (n3 = e3[r3 - 1], a3.push(t2[n3 >> 2] + t2[n3 << 4 & 63] + `==`)) : i3 === 2 && (n3 = (e3[r3 - 2] << 8) + e3[r3 - 1], a3.push(t2[n3 >> 10] + t2[n3 >> 4 & 63] + t2[n3 << 2 & 63] + `=`)), a3.join(``);
  }
})), n = e(((e2) => {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  e2.read = function(e3, t2, n2, r2, i2) {
    var a2, o2, s2 = i2 * 8 - r2 - 1, c2 = (1 << s2) - 1, l2 = c2 >> 1, u2 = -7, d2 = n2 ? i2 - 1 : 0, f2 = n2 ? -1 : 1, p2 = e3[t2 + d2];
    for (d2 += f2, a2 = p2 & (1 << -u2) - 1, p2 >>= -u2, u2 += s2; u2 > 0; a2 = a2 * 256 + e3[t2 + d2], d2 += f2, u2 -= 8) ;
    for (o2 = a2 & (1 << -u2) - 1, a2 >>= -u2, u2 += r2; u2 > 0; o2 = o2 * 256 + e3[t2 + d2], d2 += f2, u2 -= 8) ;
    if (a2 === 0) a2 = 1 - l2;
    else if (a2 === c2) return o2 ? NaN : (p2 ? -1 : 1) * (1 / 0);
    else o2 += 2 ** r2, a2 -= l2;
    return (p2 ? -1 : 1) * o2 * 2 ** (a2 - r2);
  }, e2.write = function(e3, t2, n2, r2, i2, a2) {
    var o2, s2, c2, l2 = a2 * 8 - i2 - 1, u2 = (1 << l2) - 1, d2 = u2 >> 1, f2 = i2 === 23 ? 2 ** -24 - 2 ** -77 : 0, p2 = r2 ? 0 : a2 - 1, m2 = r2 ? 1 : -1, h2 = +(t2 < 0 || t2 === 0 && 1 / t2 < 0);
    for (t2 = Math.abs(t2), isNaN(t2) || t2 === 1 / 0 ? (s2 = +!!isNaN(t2), o2 = u2) : (o2 = Math.floor(Math.log(t2) / Math.LN2), t2 * (c2 = 2 ** -o2) < 1 && (o2--, c2 *= 2), o2 + d2 >= 1 ? t2 += f2 / c2 : t2 += f2 * 2 ** (1 - d2), t2 * c2 >= 2 && (o2++, c2 /= 2), o2 + d2 >= u2 ? (s2 = 0, o2 = u2) : o2 + d2 >= 1 ? (s2 = (t2 * c2 - 1) * 2 ** i2, o2 += d2) : (s2 = t2 * 2 ** (d2 - 1) * 2 ** i2, o2 = 0)); i2 >= 8; e3[n2 + p2] = s2 & 255, p2 += m2, s2 /= 256, i2 -= 8) ;
    for (o2 = o2 << i2 | s2, l2 += i2; l2 > 0; e3[n2 + p2] = o2 & 255, p2 += m2, o2 /= 256, l2 -= 8) ;
    e3[n2 + p2 - m2] |= h2 * 128;
  };
})), r = e(((e2) => {
  /*!
  * The buffer module from node.js, for the browser.
  *
  * @author   Feross Aboukhadijeh <https://feross.org>
  * @license  MIT
  */
  let r2 = t(), i2 = n(), a2 = typeof Symbol == `function` && typeof Symbol.for == `function` ? Symbol.for(`nodejs.util.inspect.custom`) : null;
  e2.Buffer = l2, e2.SlowBuffer = y2, e2.INSPECT_MAX_BYTES = 50;
  let o2 = 2147483647;
  e2.kMaxLength = o2, l2.TYPED_ARRAY_SUPPORT = s2(), !l2.TYPED_ARRAY_SUPPORT && typeof console < `u` && typeof console.error == `function` && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function s2() {
    try {
      let e3 = new Uint8Array(1), t2 = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t2, Uint8Array.prototype), Object.setPrototypeOf(e3, t2), e3.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(l2.prototype, "parent", { enumerable: true, get: function() {
    if (l2.isBuffer(this)) return this.buffer;
  } }), Object.defineProperty(l2.prototype, "offset", { enumerable: true, get: function() {
    if (l2.isBuffer(this)) return this.byteOffset;
  } });
  function c2(e3) {
    if (e3 > o2) throw RangeError(`The value "` + e3 + `" is invalid for option "size"`);
    let t2 = new Uint8Array(e3);
    return Object.setPrototypeOf(t2, l2.prototype), t2;
  }
  function l2(e3, t2, n2) {
    if (typeof e3 == `number`) {
      if (typeof t2 == `string`) throw TypeError(`The "string" argument must be of type string. Received type number`);
      return p2(e3);
    }
    return u2(e3, t2, n2);
  }
  l2.poolSize = 8192;
  function u2(e3, t2, n2) {
    if (typeof e3 == `string`) return m2(e3, t2);
    if (ArrayBuffer.isView(e3)) return g2(e3);
    if (e3 == null) throw TypeError(`The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ` + typeof e3);
    if (H2(e3, ArrayBuffer) || e3 && H2(e3.buffer, ArrayBuffer) || typeof SharedArrayBuffer < `u` && (H2(e3, SharedArrayBuffer) || e3 && H2(e3.buffer, SharedArrayBuffer))) return _2(e3, t2, n2);
    if (typeof e3 == `number`) throw TypeError(`The "value" argument must not be of type number. Received type number`);
    let r3 = e3.valueOf && e3.valueOf();
    if (r3 != null && r3 !== e3) return l2.from(r3, t2, n2);
    let i3 = ee2(e3);
    if (i3) return i3;
    if (typeof Symbol < `u` && Symbol.toPrimitive != null && typeof e3[Symbol.toPrimitive] == `function`) return l2.from(e3[Symbol.toPrimitive](`string`), t2, n2);
    throw TypeError(`The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ` + typeof e3);
  }
  l2.from = function(e3, t2, n2) {
    return u2(e3, t2, n2);
  }, Object.setPrototypeOf(l2.prototype, Uint8Array.prototype), Object.setPrototypeOf(l2, Uint8Array);
  function d2(e3) {
    if (typeof e3 != `number`) throw TypeError(`"size" argument must be of type number`);
    if (e3 < 0) throw RangeError(`The value "` + e3 + `" is invalid for option "size"`);
  }
  function f2(e3, t2, n2) {
    return d2(e3), e3 <= 0 || t2 === void 0 ? c2(e3) : typeof n2 == `string` ? c2(e3).fill(t2, n2) : c2(e3).fill(t2);
  }
  l2.alloc = function(e3, t2, n2) {
    return f2(e3, t2, n2);
  };
  function p2(e3) {
    return d2(e3), c2(e3 < 0 ? 0 : v2(e3) | 0);
  }
  l2.allocUnsafe = function(e3) {
    return p2(e3);
  }, l2.allocUnsafeSlow = function(e3) {
    return p2(e3);
  };
  function m2(e3, t2) {
    if ((typeof t2 != `string` || t2 === ``) && (t2 = `utf8`), !l2.isEncoding(t2)) throw TypeError(`Unknown encoding: ` + t2);
    let n2 = b2(e3, t2) | 0, r3 = c2(n2), i3 = r3.write(e3, t2);
    return i3 !== n2 && (r3 = r3.slice(0, i3)), r3;
  }
  function h2(e3) {
    let t2 = e3.length < 0 ? 0 : v2(e3.length) | 0, n2 = c2(t2);
    for (let r3 = 0; r3 < t2; r3 += 1) n2[r3] = e3[r3] & 255;
    return n2;
  }
  function g2(e3) {
    if (H2(e3, Uint8Array)) {
      let t2 = new Uint8Array(e3);
      return _2(t2.buffer, t2.byteOffset, t2.byteLength);
    }
    return h2(e3);
  }
  function _2(e3, t2, n2) {
    if (t2 < 0 || e3.byteLength < t2) throw RangeError(`"offset" is outside of buffer bounds`);
    if (e3.byteLength < t2 + (n2 || 0)) throw RangeError(`"length" is outside of buffer bounds`);
    let r3;
    return r3 = t2 === void 0 && n2 === void 0 ? new Uint8Array(e3) : n2 === void 0 ? new Uint8Array(e3, t2) : new Uint8Array(e3, t2, n2), Object.setPrototypeOf(r3, l2.prototype), r3;
  }
  function ee2(e3) {
    if (l2.isBuffer(e3)) {
      let t2 = v2(e3.length) | 0, n2 = c2(t2);
      return n2.length === 0 || e3.copy(n2, 0, 0, t2), n2;
    }
    if (e3.length !== void 0) return typeof e3.length != `number` || U2(e3.length) ? c2(0) : h2(e3);
    if (e3.type === `Buffer` && Array.isArray(e3.data)) return h2(e3.data);
  }
  function v2(e3) {
    if (e3 >= o2) throw RangeError(`Attempt to allocate Buffer larger than maximum size: 0x` + o2.toString(16) + ` bytes`);
    return e3 | 0;
  }
  function y2(e3) {
    return +e3 != e3 && (e3 = 0), l2.alloc(+e3);
  }
  l2.isBuffer = function(e3) {
    return e3 != null && e3._isBuffer === true && e3 !== l2.prototype;
  }, l2.compare = function(e3, t2) {
    if (H2(e3, Uint8Array) && (e3 = l2.from(e3, e3.offset, e3.byteLength)), H2(t2, Uint8Array) && (t2 = l2.from(t2, t2.offset, t2.byteLength)), !l2.isBuffer(e3) || !l2.isBuffer(t2)) throw TypeError(`The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array`);
    if (e3 === t2) return 0;
    let n2 = e3.length, r3 = t2.length;
    for (let i3 = 0, a3 = Math.min(n2, r3); i3 < a3; ++i3) if (e3[i3] !== t2[i3]) {
      n2 = e3[i3], r3 = t2[i3];
      break;
    }
    return n2 < r3 ? -1 : +(r3 < n2);
  }, l2.isEncoding = function(e3) {
    switch (String(e3).toLowerCase()) {
      case `hex`:
      case `utf8`:
      case `utf-8`:
      case `ascii`:
      case `latin1`:
      case `binary`:
      case `base64`:
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
        return true;
      default:
        return false;
    }
  }, l2.concat = function(e3, t2) {
    if (!Array.isArray(e3)) throw TypeError(`"list" argument must be an Array of Buffers`);
    if (e3.length === 0) return l2.alloc(0);
    let n2;
    if (t2 === void 0) for (t2 = 0, n2 = 0; n2 < e3.length; ++n2) t2 += e3[n2].length;
    let r3 = l2.allocUnsafe(t2), i3 = 0;
    for (n2 = 0; n2 < e3.length; ++n2) {
      let t3 = e3[n2];
      if (H2(t3, Uint8Array)) i3 + t3.length > r3.length ? (l2.isBuffer(t3) || (t3 = l2.from(t3)), t3.copy(r3, i3)) : Uint8Array.prototype.set.call(r3, t3, i3);
      else if (l2.isBuffer(t3)) t3.copy(r3, i3);
      else throw TypeError(`"list" argument must be an Array of Buffers`);
      i3 += t3.length;
    }
    return r3;
  };
  function b2(e3, t2) {
    if (l2.isBuffer(e3)) return e3.length;
    if (ArrayBuffer.isView(e3) || H2(e3, ArrayBuffer)) return e3.byteLength;
    if (typeof e3 != `string`) throw TypeError(`The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ` + typeof e3);
    let n2 = e3.length, r3 = arguments.length > 2 && arguments[2] === true;
    if (!r3 && n2 === 0) return 0;
    let i3 = false;
    for (; ; ) switch (t2) {
      case `ascii`:
      case `latin1`:
      case `binary`:
        return n2;
      case `utf8`:
      case `utf-8`:
        return z2(e3).length;
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
        return n2 * 2;
      case `hex`:
        return n2 >>> 1;
      case `base64`:
        return B2(e3).length;
      default:
        if (i3) return r3 ? -1 : z2(e3).length;
        t2 = (`` + t2).toLowerCase(), i3 = true;
    }
  }
  l2.byteLength = b2;
  function x2(e3, t2, n2) {
    let r3 = false;
    if ((t2 === void 0 || t2 < 0) && (t2 = 0), t2 > this.length || ((n2 === void 0 || n2 > this.length) && (n2 = this.length), n2 <= 0) || (n2 >>>= 0, t2 >>>= 0, n2 <= t2)) return ``;
    for (e3 ||= `utf8`; ; ) switch (e3) {
      case `hex`:
        return j2(this, t2, n2);
      case `utf8`:
      case `utf-8`:
        return ie2(this, t2, n2);
      case `ascii`:
        return k2(this, t2, n2);
      case `latin1`:
      case `binary`:
        return A2(this, t2, n2);
      case `base64`:
        return re2(this, t2, n2);
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
        return M2(this, t2, n2);
      default:
        if (r3) throw TypeError(`Unknown encoding: ` + e3);
        e3 = (e3 + ``).toLowerCase(), r3 = true;
    }
  }
  l2.prototype._isBuffer = true;
  function S2(e3, t2, n2) {
    let r3 = e3[t2];
    e3[t2] = e3[n2], e3[n2] = r3;
  }
  l2.prototype.swap16 = function() {
    let e3 = this.length;
    if (e3 % 2 != 0) throw RangeError(`Buffer size must be a multiple of 16-bits`);
    for (let t2 = 0; t2 < e3; t2 += 2) S2(this, t2, t2 + 1);
    return this;
  }, l2.prototype.swap32 = function() {
    let e3 = this.length;
    if (e3 % 4 != 0) throw RangeError(`Buffer size must be a multiple of 32-bits`);
    for (let t2 = 0; t2 < e3; t2 += 4) S2(this, t2, t2 + 3), S2(this, t2 + 1, t2 + 2);
    return this;
  }, l2.prototype.swap64 = function() {
    let e3 = this.length;
    if (e3 % 8 != 0) throw RangeError(`Buffer size must be a multiple of 64-bits`);
    for (let t2 = 0; t2 < e3; t2 += 8) S2(this, t2, t2 + 7), S2(this, t2 + 1, t2 + 6), S2(this, t2 + 2, t2 + 5), S2(this, t2 + 3, t2 + 4);
    return this;
  }, l2.prototype.toString = function() {
    let e3 = this.length;
    return e3 === 0 ? `` : arguments.length === 0 ? ie2(this, 0, e3) : x2.apply(this, arguments);
  }, l2.prototype.toLocaleString = l2.prototype.toString, l2.prototype.equals = function(e3) {
    if (!l2.isBuffer(e3)) throw TypeError(`Argument must be a Buffer`);
    return this === e3 || l2.compare(this, e3) === 0;
  }, l2.prototype.inspect = function() {
    let t2 = ``, n2 = e2.INSPECT_MAX_BYTES;
    return t2 = this.toString(`hex`, 0, n2).replace(/(.{2})/g, `$1 `).trim(), this.length > n2 && (t2 += ` ... `), `<Buffer ` + t2 + `>`;
  }, a2 && (l2.prototype[a2] = l2.prototype.inspect), l2.prototype.compare = function(e3, t2, n2, r3, i3) {
    if (H2(e3, Uint8Array) && (e3 = l2.from(e3, e3.offset, e3.byteLength)), !l2.isBuffer(e3)) throw TypeError(`The "target" argument must be one of type Buffer or Uint8Array. Received type ` + typeof e3);
    if (t2 === void 0 && (t2 = 0), n2 === void 0 && (n2 = e3 ? e3.length : 0), r3 === void 0 && (r3 = 0), i3 === void 0 && (i3 = this.length), t2 < 0 || n2 > e3.length || r3 < 0 || i3 > this.length) throw RangeError(`out of range index`);
    if (r3 >= i3 && t2 >= n2) return 0;
    if (r3 >= i3) return -1;
    if (t2 >= n2) return 1;
    if (t2 >>>= 0, n2 >>>= 0, r3 >>>= 0, i3 >>>= 0, this === e3) return 0;
    let a3 = i3 - r3, o3 = n2 - t2, s3 = Math.min(a3, o3), c3 = this.slice(r3, i3), u3 = e3.slice(t2, n2);
    for (let e4 = 0; e4 < s3; ++e4) if (c3[e4] !== u3[e4]) {
      a3 = c3[e4], o3 = u3[e4];
      break;
    }
    return a3 < o3 ? -1 : +(o3 < a3);
  };
  function C2(e3, t2, n2, r3, i3) {
    if (e3.length === 0) return -1;
    if (typeof n2 == `string` ? (r3 = n2, n2 = 0) : n2 > 2147483647 ? n2 = 2147483647 : n2 < -2147483648 && (n2 = -2147483648), n2 = +n2, U2(n2) && (n2 = i3 ? 0 : e3.length - 1), n2 < 0 && (n2 = e3.length + n2), n2 >= e3.length) {
      if (i3) return -1;
      n2 = e3.length - 1;
    } else if (n2 < 0) {
      if (i3) n2 = 0;
      else return -1;
    }
    if (typeof t2 == `string` && (t2 = l2.from(t2, r3)), l2.isBuffer(t2)) return t2.length === 0 ? -1 : w2(e3, t2, n2, r3, i3);
    if (typeof t2 == `number`) return t2 &= 255, typeof Uint8Array.prototype.indexOf == `function` ? i3 ? Uint8Array.prototype.indexOf.call(e3, t2, n2) : Uint8Array.prototype.lastIndexOf.call(e3, t2, n2) : w2(e3, [t2], n2, r3, i3);
    throw TypeError(`val must be string, number or Buffer`);
  }
  function w2(e3, t2, n2, r3, i3) {
    let a3 = 1, o3 = e3.length, s3 = t2.length;
    if (r3 !== void 0 && (r3 = String(r3).toLowerCase(), r3 === `ucs2` || r3 === `ucs-2` || r3 === `utf16le` || r3 === `utf-16le`)) {
      if (e3.length < 2 || t2.length < 2) return -1;
      a3 = 2, o3 /= 2, s3 /= 2, n2 /= 2;
    }
    function c3(e4, t3) {
      return a3 === 1 ? e4[t3] : e4.readUInt16BE(t3 * a3);
    }
    let l3;
    if (i3) {
      let r4 = -1;
      for (l3 = n2; l3 < o3; l3++) if (c3(e3, l3) === c3(t2, r4 === -1 ? 0 : l3 - r4)) {
        if (r4 === -1 && (r4 = l3), l3 - r4 + 1 === s3) return r4 * a3;
      } else r4 !== -1 && (l3 -= l3 - r4), r4 = -1;
    } else for (n2 + s3 > o3 && (n2 = o3 - s3), l3 = n2; l3 >= 0; l3--) {
      let n3 = true;
      for (let r4 = 0; r4 < s3; r4++) if (c3(e3, l3 + r4) !== c3(t2, r4)) {
        n3 = false;
        break;
      }
      if (n3) return l3;
    }
    return -1;
  }
  l2.prototype.includes = function(e3, t2, n2) {
    return this.indexOf(e3, t2, n2) !== -1;
  }, l2.prototype.indexOf = function(e3, t2, n2) {
    return C2(this, e3, t2, n2, true);
  }, l2.prototype.lastIndexOf = function(e3, t2, n2) {
    return C2(this, e3, t2, n2, false);
  };
  function T2(e3, t2, n2, r3) {
    n2 = Number(n2) || 0;
    let i3 = e3.length - n2;
    r3 ? (r3 = Number(r3), r3 > i3 && (r3 = i3)) : r3 = i3;
    let a3 = t2.length;
    r3 > a3 / 2 && (r3 = a3 / 2);
    let o3;
    for (o3 = 0; o3 < r3; ++o3) {
      let r4 = parseInt(t2.substr(o3 * 2, 2), 16);
      if (U2(r4)) return o3;
      e3[n2 + o3] = r4;
    }
    return o3;
  }
  function E2(e3, t2, n2, r3) {
    return V2(z2(t2, e3.length - n2), e3, n2, r3);
  }
  function D2(e3, t2, n2, r3) {
    return V2(ge2(t2), e3, n2, r3);
  }
  function te2(e3, t2, n2, r3) {
    return V2(B2(t2), e3, n2, r3);
  }
  function ne2(e3, t2, n2, r3) {
    return V2(_e2(t2, e3.length - n2), e3, n2, r3);
  }
  l2.prototype.write = function(e3, t2, n2, r3) {
    if (t2 === void 0) r3 = `utf8`, n2 = this.length, t2 = 0;
    else if (n2 === void 0 && typeof t2 == `string`) r3 = t2, n2 = this.length, t2 = 0;
    else if (isFinite(t2)) t2 >>>= 0, isFinite(n2) ? (n2 >>>= 0, r3 === void 0 && (r3 = `utf8`)) : (r3 = n2, n2 = void 0);
    else throw Error(`Buffer.write(string, encoding, offset[, length]) is no longer supported`);
    let i3 = this.length - t2;
    if ((n2 === void 0 || n2 > i3) && (n2 = i3), e3.length > 0 && (n2 < 0 || t2 < 0) || t2 > this.length) throw RangeError(`Attempt to write outside buffer bounds`);
    r3 ||= `utf8`;
    let a3 = false;
    for (; ; ) switch (r3) {
      case `hex`:
        return T2(this, e3, t2, n2);
      case `utf8`:
      case `utf-8`:
        return E2(this, e3, t2, n2);
      case `ascii`:
      case `latin1`:
      case `binary`:
        return D2(this, e3, t2, n2);
      case `base64`:
        return te2(this, e3, t2, n2);
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
        return ne2(this, e3, t2, n2);
      default:
        if (a3) throw TypeError(`Unknown encoding: ` + r3);
        r3 = (`` + r3).toLowerCase(), a3 = true;
    }
  }, l2.prototype.toJSON = function() {
    return { type: `Buffer`, data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function re2(e3, t2, n2) {
    return t2 === 0 && n2 === e3.length ? r2.fromByteArray(e3) : r2.fromByteArray(e3.slice(t2, n2));
  }
  function ie2(e3, t2, n2) {
    n2 = Math.min(e3.length, n2);
    let r3 = [], i3 = t2;
    for (; i3 < n2; ) {
      let t3 = e3[i3], a3 = null, o3 = t3 > 239 ? 4 : t3 > 223 ? 3 : t3 > 191 ? 2 : 1;
      if (i3 + o3 <= n2) {
        let n3, r4, s3, c3;
        switch (o3) {
          case 1:
            t3 < 128 && (a3 = t3);
            break;
          case 2:
            n3 = e3[i3 + 1], (n3 & 192) == 128 && (c3 = (t3 & 31) << 6 | n3 & 63, c3 > 127 && (a3 = c3));
            break;
          case 3:
            n3 = e3[i3 + 1], r4 = e3[i3 + 2], (n3 & 192) == 128 && (r4 & 192) == 128 && (c3 = (t3 & 15) << 12 | (n3 & 63) << 6 | r4 & 63, c3 > 2047 && (c3 < 55296 || c3 > 57343) && (a3 = c3));
            break;
          case 4:
            n3 = e3[i3 + 1], r4 = e3[i3 + 2], s3 = e3[i3 + 3], (n3 & 192) == 128 && (r4 & 192) == 128 && (s3 & 192) == 128 && (c3 = (t3 & 15) << 18 | (n3 & 63) << 12 | (r4 & 63) << 6 | s3 & 63, c3 > 65535 && c3 < 1114112 && (a3 = c3));
        }
      }
      a3 === null ? (a3 = 65533, o3 = 1) : a3 > 65535 && (a3 -= 65536, r3.push(a3 >>> 10 & 1023 | 55296), a3 = 56320 | a3 & 1023), r3.push(a3), i3 += o3;
    }
    return ae2(r3);
  }
  let O2 = 4096;
  function ae2(e3) {
    let t2 = e3.length;
    if (t2 <= O2) return String.fromCharCode.apply(String, e3);
    let n2 = ``, r3 = 0;
    for (; r3 < t2; ) n2 += String.fromCharCode.apply(String, e3.slice(r3, r3 += O2));
    return n2;
  }
  function k2(e3, t2, n2) {
    let r3 = ``;
    n2 = Math.min(e3.length, n2);
    for (let i3 = t2; i3 < n2; ++i3) r3 += String.fromCharCode(e3[i3] & 127);
    return r3;
  }
  function A2(e3, t2, n2) {
    let r3 = ``;
    n2 = Math.min(e3.length, n2);
    for (let i3 = t2; i3 < n2; ++i3) r3 += String.fromCharCode(e3[i3]);
    return r3;
  }
  function j2(e3, t2, n2) {
    let r3 = e3.length;
    (!t2 || t2 < 0) && (t2 = 0), (!n2 || n2 < 0 || n2 > r3) && (n2 = r3);
    let i3 = ``;
    for (let r4 = t2; r4 < n2; ++r4) i3 += ve2[e3[r4]];
    return i3;
  }
  function M2(e3, t2, n2) {
    let r3 = e3.slice(t2, n2), i3 = ``;
    for (let e4 = 0; e4 < r3.length - 1; e4 += 2) i3 += String.fromCharCode(r3[e4] + r3[e4 + 1] * 256);
    return i3;
  }
  l2.prototype.slice = function(e3, t2) {
    let n2 = this.length;
    e3 = ~~e3, t2 = t2 === void 0 ? n2 : ~~t2, e3 < 0 ? (e3 += n2, e3 < 0 && (e3 = 0)) : e3 > n2 && (e3 = n2), t2 < 0 ? (t2 += n2, t2 < 0 && (t2 = 0)) : t2 > n2 && (t2 = n2), t2 < e3 && (t2 = e3);
    let r3 = this.subarray(e3, t2);
    return Object.setPrototypeOf(r3, l2.prototype), r3;
  };
  function N2(e3, t2, n2) {
    if (e3 % 1 != 0 || e3 < 0) throw RangeError(`offset is not uint`);
    if (e3 + t2 > n2) throw RangeError(`Trying to access beyond buffer length`);
  }
  l2.prototype.readUintLE = l2.prototype.readUIntLE = function(e3, t2, n2) {
    e3 >>>= 0, t2 >>>= 0, n2 || N2(e3, t2, this.length);
    let r3 = this[e3], i3 = 1, a3 = 0;
    for (; ++a3 < t2 && (i3 *= 256); ) r3 += this[e3 + a3] * i3;
    return r3;
  }, l2.prototype.readUintBE = l2.prototype.readUIntBE = function(e3, t2, n2) {
    e3 >>>= 0, t2 >>>= 0, n2 || N2(e3, t2, this.length);
    let r3 = this[e3 + --t2], i3 = 1;
    for (; t2 > 0 && (i3 *= 256); ) r3 += this[e3 + --t2] * i3;
    return r3;
  }, l2.prototype.readUint8 = l2.prototype.readUInt8 = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 1, this.length), this[e3];
  }, l2.prototype.readUint16LE = l2.prototype.readUInt16LE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 2, this.length), this[e3] | this[e3 + 1] << 8;
  }, l2.prototype.readUint16BE = l2.prototype.readUInt16BE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 2, this.length), this[e3] << 8 | this[e3 + 1];
  }, l2.prototype.readUint32LE = l2.prototype.readUInt32LE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), (this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16) + this[e3 + 3] * 16777216;
  }, l2.prototype.readUint32BE = l2.prototype.readUInt32BE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), this[e3] * 16777216 + (this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3]);
  }, l2.prototype.readBigUInt64LE = W2(function(e3) {
    e3 >>>= 0, L2(e3, `offset`);
    let t2 = this[e3], n2 = this[e3 + 7];
    (t2 === void 0 || n2 === void 0) && R2(e3, this.length - 8);
    let r3 = t2 + this[++e3] * 256 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 24, i3 = this[++e3] + this[++e3] * 256 + this[++e3] * 2 ** 16 + n2 * 2 ** 24;
    return BigInt(r3) + (BigInt(i3) << BigInt(32));
  }), l2.prototype.readBigUInt64BE = W2(function(e3) {
    e3 >>>= 0, L2(e3, `offset`);
    let t2 = this[e3], n2 = this[e3 + 7];
    (t2 === void 0 || n2 === void 0) && R2(e3, this.length - 8);
    let r3 = t2 * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 256 + this[++e3], i3 = this[++e3] * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 256 + n2;
    return (BigInt(r3) << BigInt(32)) + BigInt(i3);
  }), l2.prototype.readIntLE = function(e3, t2, n2) {
    e3 >>>= 0, t2 >>>= 0, n2 || N2(e3, t2, this.length);
    let r3 = this[e3], i3 = 1, a3 = 0;
    for (; ++a3 < t2 && (i3 *= 256); ) r3 += this[e3 + a3] * i3;
    return i3 *= 128, r3 >= i3 && (r3 -= 2 ** (8 * t2)), r3;
  }, l2.prototype.readIntBE = function(e3, t2, n2) {
    e3 >>>= 0, t2 >>>= 0, n2 || N2(e3, t2, this.length);
    let r3 = t2, i3 = 1, a3 = this[e3 + --r3];
    for (; r3 > 0 && (i3 *= 256); ) a3 += this[e3 + --r3] * i3;
    return i3 *= 128, a3 >= i3 && (a3 -= 2 ** (8 * t2)), a3;
  }, l2.prototype.readInt8 = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 1, this.length), this[e3] & 128 ? (255 - this[e3] + 1) * -1 : this[e3];
  }, l2.prototype.readInt16LE = function(e3, t2) {
    e3 >>>= 0, t2 || N2(e3, 2, this.length);
    let n2 = this[e3] | this[e3 + 1] << 8;
    return n2 & 32768 ? n2 | 4294901760 : n2;
  }, l2.prototype.readInt16BE = function(e3, t2) {
    e3 >>>= 0, t2 || N2(e3, 2, this.length);
    let n2 = this[e3 + 1] | this[e3] << 8;
    return n2 & 32768 ? n2 | 4294901760 : n2;
  }, l2.prototype.readInt32LE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16 | this[e3 + 3] << 24;
  }, l2.prototype.readInt32BE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), this[e3] << 24 | this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3];
  }, l2.prototype.readBigInt64LE = W2(function(e3) {
    e3 >>>= 0, L2(e3, `offset`);
    let t2 = this[e3], n2 = this[e3 + 7];
    (t2 === void 0 || n2 === void 0) && R2(e3, this.length - 8);
    let r3 = this[e3 + 4] + this[e3 + 5] * 256 + this[e3 + 6] * 2 ** 16 + (n2 << 24);
    return (BigInt(r3) << BigInt(32)) + BigInt(t2 + this[++e3] * 256 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 24);
  }), l2.prototype.readBigInt64BE = W2(function(e3) {
    e3 >>>= 0, L2(e3, `offset`);
    let t2 = this[e3], n2 = this[e3 + 7];
    (t2 === void 0 || n2 === void 0) && R2(e3, this.length - 8);
    let r3 = (t2 << 24) + this[++e3] * 2 ** 16 + this[++e3] * 256 + this[++e3];
    return (BigInt(r3) << BigInt(32)) + BigInt(this[++e3] * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 256 + n2);
  }), l2.prototype.readFloatLE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), i2.read(this, e3, true, 23, 4);
  }, l2.prototype.readFloatBE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 4, this.length), i2.read(this, e3, false, 23, 4);
  }, l2.prototype.readDoubleLE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 8, this.length), i2.read(this, e3, true, 52, 8);
  }, l2.prototype.readDoubleBE = function(e3, t2) {
    return e3 >>>= 0, t2 || N2(e3, 8, this.length), i2.read(this, e3, false, 52, 8);
  };
  function P2(e3, t2, n2, r3, i3, a3) {
    if (!l2.isBuffer(e3)) throw TypeError(`"buffer" argument must be a Buffer instance`);
    if (t2 > i3 || t2 < a3) throw RangeError(`"value" argument is out of bounds`);
    if (n2 + r3 > e3.length) throw RangeError(`Index out of range`);
  }
  l2.prototype.writeUintLE = l2.prototype.writeUIntLE = function(e3, t2, n2, r3) {
    if (e3 = +e3, t2 >>>= 0, n2 >>>= 0, !r3) {
      let r4 = 2 ** (8 * n2) - 1;
      P2(this, e3, t2, n2, r4, 0);
    }
    let i3 = 1, a3 = 0;
    for (this[t2] = e3 & 255; ++a3 < n2 && (i3 *= 256); ) this[t2 + a3] = e3 / i3 & 255;
    return t2 + n2;
  }, l2.prototype.writeUintBE = l2.prototype.writeUIntBE = function(e3, t2, n2, r3) {
    if (e3 = +e3, t2 >>>= 0, n2 >>>= 0, !r3) {
      let r4 = 2 ** (8 * n2) - 1;
      P2(this, e3, t2, n2, r4, 0);
    }
    let i3 = n2 - 1, a3 = 1;
    for (this[t2 + i3] = e3 & 255; --i3 >= 0 && (a3 *= 256); ) this[t2 + i3] = e3 / a3 & 255;
    return t2 + n2;
  }, l2.prototype.writeUint8 = l2.prototype.writeUInt8 = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 1, 255, 0), this[t2] = e3 & 255, t2 + 1;
  }, l2.prototype.writeUint16LE = l2.prototype.writeUInt16LE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 2, 65535, 0), this[t2] = e3 & 255, this[t2 + 1] = e3 >>> 8, t2 + 2;
  }, l2.prototype.writeUint16BE = l2.prototype.writeUInt16BE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 2, 65535, 0), this[t2] = e3 >>> 8, this[t2 + 1] = e3 & 255, t2 + 2;
  }, l2.prototype.writeUint32LE = l2.prototype.writeUInt32LE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 4, 4294967295, 0), this[t2 + 3] = e3 >>> 24, this[t2 + 2] = e3 >>> 16, this[t2 + 1] = e3 >>> 8, this[t2] = e3 & 255, t2 + 4;
  }, l2.prototype.writeUint32BE = l2.prototype.writeUInt32BE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 4, 4294967295, 0), this[t2] = e3 >>> 24, this[t2 + 1] = e3 >>> 16, this[t2 + 2] = e3 >>> 8, this[t2 + 3] = e3 & 255, t2 + 4;
  };
  function oe2(e3, t2, n2, r3, i3) {
    pe2(t2, r3, i3, e3, n2, 7);
    let a3 = Number(t2 & BigInt(4294967295));
    e3[n2++] = a3, a3 >>= 8, e3[n2++] = a3, a3 >>= 8, e3[n2++] = a3, a3 >>= 8, e3[n2++] = a3;
    let o3 = Number(t2 >> BigInt(32) & BigInt(4294967295));
    return e3[n2++] = o3, o3 >>= 8, e3[n2++] = o3, o3 >>= 8, e3[n2++] = o3, o3 >>= 8, e3[n2++] = o3, n2;
  }
  function se2(e3, t2, n2, r3, i3) {
    pe2(t2, r3, i3, e3, n2, 7);
    let a3 = Number(t2 & BigInt(4294967295));
    e3[n2 + 7] = a3, a3 >>= 8, e3[n2 + 6] = a3, a3 >>= 8, e3[n2 + 5] = a3, a3 >>= 8, e3[n2 + 4] = a3;
    let o3 = Number(t2 >> BigInt(32) & BigInt(4294967295));
    return e3[n2 + 3] = o3, o3 >>= 8, e3[n2 + 2] = o3, o3 >>= 8, e3[n2 + 1] = o3, o3 >>= 8, e3[n2] = o3, n2 + 8;
  }
  l2.prototype.writeBigUInt64LE = W2(function(e3, t2 = 0) {
    return oe2(this, e3, t2, BigInt(0), BigInt(`0xffffffffffffffff`));
  }), l2.prototype.writeBigUInt64BE = W2(function(e3, t2 = 0) {
    return se2(this, e3, t2, BigInt(0), BigInt(`0xffffffffffffffff`));
  }), l2.prototype.writeIntLE = function(e3, t2, n2, r3) {
    if (e3 = +e3, t2 >>>= 0, !r3) {
      let r4 = 2 ** (8 * n2 - 1);
      P2(this, e3, t2, n2, r4 - 1, -r4);
    }
    let i3 = 0, a3 = 1, o3 = 0;
    for (this[t2] = e3 & 255; ++i3 < n2 && (a3 *= 256); ) e3 < 0 && o3 === 0 && this[t2 + i3 - 1] !== 0 && (o3 = 1), this[t2 + i3] = (e3 / a3 >> 0) - o3 & 255;
    return t2 + n2;
  }, l2.prototype.writeIntBE = function(e3, t2, n2, r3) {
    if (e3 = +e3, t2 >>>= 0, !r3) {
      let r4 = 2 ** (8 * n2 - 1);
      P2(this, e3, t2, n2, r4 - 1, -r4);
    }
    let i3 = n2 - 1, a3 = 1, o3 = 0;
    for (this[t2 + i3] = e3 & 255; --i3 >= 0 && (a3 *= 256); ) e3 < 0 && o3 === 0 && this[t2 + i3 + 1] !== 0 && (o3 = 1), this[t2 + i3] = (e3 / a3 >> 0) - o3 & 255;
    return t2 + n2;
  }, l2.prototype.writeInt8 = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 1, 127, -128), e3 < 0 && (e3 = 255 + e3 + 1), this[t2] = e3 & 255, t2 + 1;
  }, l2.prototype.writeInt16LE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 2, 32767, -32768), this[t2] = e3 & 255, this[t2 + 1] = e3 >>> 8, t2 + 2;
  }, l2.prototype.writeInt16BE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 2, 32767, -32768), this[t2] = e3 >>> 8, this[t2 + 1] = e3 & 255, t2 + 2;
  }, l2.prototype.writeInt32LE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 4, 2147483647, -2147483648), this[t2] = e3 & 255, this[t2 + 1] = e3 >>> 8, this[t2 + 2] = e3 >>> 16, this[t2 + 3] = e3 >>> 24, t2 + 4;
  }, l2.prototype.writeInt32BE = function(e3, t2, n2) {
    return e3 = +e3, t2 >>>= 0, n2 || P2(this, e3, t2, 4, 2147483647, -2147483648), e3 < 0 && (e3 = 4294967295 + e3 + 1), this[t2] = e3 >>> 24, this[t2 + 1] = e3 >>> 16, this[t2 + 2] = e3 >>> 8, this[t2 + 3] = e3 & 255, t2 + 4;
  }, l2.prototype.writeBigInt64LE = W2(function(e3, t2 = 0) {
    return oe2(this, e3, t2, -BigInt(`0x8000000000000000`), BigInt(`0x7fffffffffffffff`));
  }), l2.prototype.writeBigInt64BE = W2(function(e3, t2 = 0) {
    return se2(this, e3, t2, -BigInt(`0x8000000000000000`), BigInt(`0x7fffffffffffffff`));
  });
  function ce2(e3, t2, n2, r3, i3, a3) {
    if (n2 + r3 > e3.length || n2 < 0) throw RangeError(`Index out of range`);
  }
  function le2(e3, t2, n2, r3, a3) {
    return t2 = +t2, n2 >>>= 0, a3 || ce2(e3, t2, n2, 4, 34028234663852886e22, -34028234663852886e22), i2.write(e3, t2, n2, r3, 23, 4), n2 + 4;
  }
  l2.prototype.writeFloatLE = function(e3, t2, n2) {
    return le2(this, e3, t2, true, n2);
  }, l2.prototype.writeFloatBE = function(e3, t2, n2) {
    return le2(this, e3, t2, false, n2);
  };
  function ue2(e3, t2, n2, r3, a3) {
    return t2 = +t2, n2 >>>= 0, a3 || ce2(e3, t2, n2, 8, 17976931348623157e292, -17976931348623157e292), i2.write(e3, t2, n2, r3, 52, 8), n2 + 8;
  }
  l2.prototype.writeDoubleLE = function(e3, t2, n2) {
    return ue2(this, e3, t2, true, n2);
  }, l2.prototype.writeDoubleBE = function(e3, t2, n2) {
    return ue2(this, e3, t2, false, n2);
  }, l2.prototype.copy = function(e3, t2, n2, r3) {
    if (!l2.isBuffer(e3)) throw TypeError(`argument should be a Buffer`);
    if (n2 ||= 0, !r3 && r3 !== 0 && (r3 = this.length), t2 >= e3.length && (t2 = e3.length), t2 ||= 0, r3 > 0 && r3 < n2 && (r3 = n2), r3 === n2 || e3.length === 0 || this.length === 0) return 0;
    if (t2 < 0) throw RangeError(`targetStart out of bounds`);
    if (n2 < 0 || n2 >= this.length) throw RangeError(`Index out of range`);
    if (r3 < 0) throw RangeError(`sourceEnd out of bounds`);
    r3 > this.length && (r3 = this.length), e3.length - t2 < r3 - n2 && (r3 = e3.length - t2 + n2);
    let i3 = r3 - n2;
    return this === e3 && typeof Uint8Array.prototype.copyWithin == `function` ? this.copyWithin(t2, n2, r3) : Uint8Array.prototype.set.call(e3, this.subarray(n2, r3), t2), i3;
  }, l2.prototype.fill = function(e3, t2, n2, r3) {
    if (typeof e3 == `string`) {
      if (typeof t2 == `string` ? (r3 = t2, t2 = 0, n2 = this.length) : typeof n2 == `string` && (r3 = n2, n2 = this.length), r3 !== void 0 && typeof r3 != `string`) throw TypeError(`encoding must be a string`);
      if (typeof r3 == `string` && !l2.isEncoding(r3)) throw TypeError(`Unknown encoding: ` + r3);
      if (e3.length === 1) {
        let t3 = e3.charCodeAt(0);
        (r3 === `utf8` && t3 < 128 || r3 === `latin1`) && (e3 = t3);
      }
    } else typeof e3 == `number` ? e3 &= 255 : typeof e3 == `boolean` && (e3 = Number(e3));
    if (t2 < 0 || this.length < t2 || this.length < n2) throw RangeError(`Out of range index`);
    if (n2 <= t2) return this;
    t2 >>>= 0, n2 = n2 === void 0 ? this.length : n2 >>> 0, e3 ||= 0;
    let i3;
    if (typeof e3 == `number`) for (i3 = t2; i3 < n2; ++i3) this[i3] = e3;
    else {
      let a3 = l2.isBuffer(e3) ? e3 : l2.from(e3, r3), o3 = a3.length;
      if (o3 === 0) throw TypeError(`The value "` + e3 + `" is invalid for argument "value"`);
      for (i3 = 0; i3 < n2 - t2; ++i3) this[i3 + t2] = a3[i3 % o3];
    }
    return this;
  };
  let F2 = {};
  function de2(e3, t2, n2) {
    F2[e3] = class extends n2 {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: t2.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e3}]`, this.stack, delete this.name;
      }
      get code() {
        return e3;
      }
      set code(e4) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e4, writable: true });
      }
      toString() {
        return `${this.name} [${e3}]: ${this.message}`;
      }
    };
  }
  de2(`ERR_BUFFER_OUT_OF_BOUNDS`, function(e3) {
    return e3 ? `${e3} is outside of buffer bounds` : `Attempt to access memory outside buffer bounds`;
  }, RangeError), de2(`ERR_INVALID_ARG_TYPE`, function(e3, t2) {
    return `The "${e3}" argument must be of type number. Received type ${typeof t2}`;
  }, TypeError), de2(`ERR_OUT_OF_RANGE`, function(e3, t2, n2) {
    let r3 = `The value of "${e3}" is out of range.`, i3 = n2;
    return Number.isInteger(n2) && Math.abs(n2) > 2 ** 32 ? i3 = I2(String(n2)) : typeof n2 == `bigint` && (i3 = String(n2), (n2 > BigInt(2) ** BigInt(32) || n2 < -(BigInt(2) ** BigInt(32))) && (i3 = I2(i3)), i3 += `n`), r3 += ` It must be ${t2}. Received ${i3}`, r3;
  }, RangeError);
  function I2(e3) {
    let t2 = ``, n2 = e3.length, r3 = +(e3[0] === `-`);
    for (; n2 >= r3 + 4; n2 -= 3) t2 = `_${e3.slice(n2 - 3, n2)}${t2}`;
    return `${e3.slice(0, n2)}${t2}`;
  }
  function fe2(e3, t2, n2) {
    L2(t2, `offset`), (e3[t2] === void 0 || e3[t2 + n2] === void 0) && R2(t2, e3.length - (n2 + 1));
  }
  function pe2(e3, t2, n2, r3, i3, a3) {
    if (e3 > n2 || e3 < t2) {
      let r4 = typeof t2 == `bigint` ? `n` : ``, i4;
      throw i4 = a3 > 3 ? t2 === 0 || t2 === BigInt(0) ? `>= 0${r4} and < 2${r4} ** ${(a3 + 1) * 8}${r4}` : `>= -(2${r4} ** ${(a3 + 1) * 8 - 1}${r4}) and < 2 ** ${(a3 + 1) * 8 - 1}${r4}` : `>= ${t2}${r4} and <= ${n2}${r4}`, new F2.ERR_OUT_OF_RANGE(`value`, i4, e3);
    }
    fe2(r3, i3, a3);
  }
  function L2(e3, t2) {
    if (typeof e3 != `number`) throw new F2.ERR_INVALID_ARG_TYPE(t2, `number`, e3);
  }
  function R2(e3, t2, n2) {
    throw Math.floor(e3) === e3 ? t2 < 0 ? new F2.ERR_BUFFER_OUT_OF_BOUNDS() : new F2.ERR_OUT_OF_RANGE(n2 || `offset`, `>= ${+!!n2} and <= ${t2}`, e3) : (L2(e3, n2), new F2.ERR_OUT_OF_RANGE(n2 || `offset`, `an integer`, e3));
  }
  let me2 = /[^+/0-9A-Za-z-_]/g;
  function he2(e3) {
    if (e3 = e3.split(`=`)[0], e3 = e3.trim().replace(me2, ``), e3.length < 2) return ``;
    for (; e3.length % 4 != 0; ) e3 += `=`;
    return e3;
  }
  function z2(e3, t2) {
    t2 ||= 1 / 0;
    let n2, r3 = e3.length, i3 = null, a3 = [];
    for (let o3 = 0; o3 < r3; ++o3) {
      if (n2 = e3.charCodeAt(o3), n2 > 55295 && n2 < 57344) {
        if (!i3) {
          if (n2 > 56319) {
            (t2 -= 3) > -1 && a3.push(239, 191, 189);
            continue;
          }
          if (o3 + 1 === r3) {
            (t2 -= 3) > -1 && a3.push(239, 191, 189);
            continue;
          }
          i3 = n2;
          continue;
        }
        if (n2 < 56320) {
          (t2 -= 3) > -1 && a3.push(239, 191, 189), i3 = n2;
          continue;
        }
        n2 = (i3 - 55296 << 10 | n2 - 56320) + 65536;
      } else i3 && (t2 -= 3) > -1 && a3.push(239, 191, 189);
      if (i3 = null, n2 < 128) {
        if (--t2 < 0) break;
        a3.push(n2);
      } else if (n2 < 2048) {
        if ((t2 -= 2) < 0) break;
        a3.push(n2 >> 6 | 192, n2 & 63 | 128);
      } else if (n2 < 65536) {
        if ((t2 -= 3) < 0) break;
        a3.push(n2 >> 12 | 224, n2 >> 6 & 63 | 128, n2 & 63 | 128);
      } else if (n2 < 1114112) {
        if ((t2 -= 4) < 0) break;
        a3.push(n2 >> 18 | 240, n2 >> 12 & 63 | 128, n2 >> 6 & 63 | 128, n2 & 63 | 128);
      } else throw Error(`Invalid code point`);
    }
    return a3;
  }
  function ge2(e3) {
    let t2 = [];
    for (let n2 = 0; n2 < e3.length; ++n2) t2.push(e3.charCodeAt(n2) & 255);
    return t2;
  }
  function _e2(e3, t2) {
    let n2, r3, i3, a3 = [];
    for (let o3 = 0; o3 < e3.length && !((t2 -= 2) < 0); ++o3) n2 = e3.charCodeAt(o3), r3 = n2 >> 8, i3 = n2 % 256, a3.push(i3), a3.push(r3);
    return a3;
  }
  function B2(e3) {
    return r2.toByteArray(he2(e3));
  }
  function V2(e3, t2, n2, r3) {
    let i3;
    for (i3 = 0; i3 < r3 && !(i3 + n2 >= t2.length || i3 >= e3.length); ++i3) t2[i3 + n2] = e3[i3];
    return i3;
  }
  function H2(e3, t2) {
    return e3 instanceof t2 || e3 != null && e3.constructor != null && e3.constructor.name != null && e3.constructor.name === t2.name;
  }
  function U2(e3) {
    return e3 !== e3;
  }
  let ve2 = (function() {
    let e3 = `0123456789abcdef`, t2 = Array(256);
    for (let n2 = 0; n2 < 16; ++n2) {
      let r3 = n2 * 16;
      for (let i3 = 0; i3 < 16; ++i3) t2[r3 + i3] = e3[n2] + e3[i3];
    }
    return t2;
  })();
  function W2(e3) {
    return typeof BigInt > `u` ? ye2 : e3;
  }
  function ye2() {
    throw Error(`BigInt not supported`);
  }
})), i = r();
function a(e2) {
  return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && e2.constructor.name === `Uint8Array` && `BYTES_PER_ELEMENT` in e2 && e2.BYTES_PER_ELEMENT === 1;
}
const o = (e2) => e2 ? `"${e2}" ` : ``;
function s(e2, t2 = ``) {
  if (typeof e2 != `number`) throw TypeError(o(t2) + `expected number, got ` + typeof e2);
  if (!Number.isSafeInteger(e2) || e2 < 0) throw RangeError(o(t2) + `expected integer >= 0, got ` + e2);
  return e2;
}
function c(e2, t2, n2 = ``) {
  if (a(e2) && (t2 === void 0 || e2.length === t2)) return e2;
  t2 !== void 0 && s(t2, `length`);
  let r2 = a(e2), i2 = t2 === void 0 ? `` : ` of length ${t2}`, c2 = r2 ? `length=${e2.length}` : `type=${typeof e2}`, l2 = o(n2) + `expected Uint8Array` + i2 + `, got ` + c2;
  throw r2 ? RangeError(l2) : TypeError(l2);
}
function l(e2) {
  return Uint8Array.from(c(e2));
}
function u(e2) {
  if (typeof e2 != `function` || typeof e2.create != `function`) throw TypeError(`expected hash wrapped by utils.createHasher`);
  if (s(e2.outputLen), s(e2.blockLen), e2.outputLen < 1 || e2.blockLen < 1) throw Error(`hash blockLen / outputLen must be >= 1`);
}
const d = (e2, t2) => {
  if (typeof e2 != `object` || !e2 || Array.isArray(e2)) throw TypeError((t2 === `object` ? `` : `"${t2}" `) + `expected object, got type=` + typeof e2);
}, f = (e2, t2) => {
  d(e2, t2);
  let n2 = Object.getPrototypeOf(e2);
  if (n2 !== Object.prototype && n2 !== null) throw TypeError(`"${t2}" expected plain object`);
  if (Object.hasOwn(e2, `__proto__`)) throw TypeError(`"${t2}.__proto__" is not allowed`);
};
function p(e2, t2 = true) {
  if (e2.destroyed) throw Error(`hash was destroyed`);
  if (t2 && e2.finished) throw Error(`digest() was already called`);
}
function m(e2, t2) {
  c(e2, void 0, `output`);
  let n2 = t2.outputLen;
  if (!(e2.length >= n2)) throw RangeError(`"output" expected length >= ` + n2);
}
function h(...e2) {
  for (let t2 = 0; t2 < e2.length; t2++) e2[t2].fill(0);
}
function g(e2) {
  return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
}
function _(e2, t2) {
  return e2 << 32 - t2 | e2 >>> t2;
}
function ee(e2) {
  if (typeof e2 != `string`) throw TypeError(`string expected`);
  let t2 = new TextEncoder().encode(e2);
  try {
    return new Uint8Array(t2);
  } finally {
    h(t2);
  }
}
function v(e2, t2 = ``) {
  return typeof e2 == `string` ? ee(e2) : c(e2, void 0, t2);
}
function y(e2, t2, n2 = `opts`) {
  return f(e2, `defaults`), t2 !== void 0 && f(t2, n2), Object.assign(/* @__PURE__ */ Object.create(null), e2, t2);
}
function b(e2, t2 = {}) {
  if (typeof e2 != `function`) throw TypeError(`"hashCons" expected function, got type=` + typeof e2);
  t2 = y({}, t2, `info`);
  let n2 = (t3, n3) => e2(n3).update(t3).digest(), r2 = e2(void 0);
  return n2.outputLen = r2.outputLen, n2.blockLen = r2.blockLen, n2.canXOF = r2.canXOF, n2.create = (t3) => e2(t3), Object.assign(n2, t2), Object.freeze(n2);
}
function x(e2 = 32) {
  s(e2, `bytesLength`);
  let t2 = typeof globalThis == `object` ? globalThis.crypto : null;
  if (typeof t2?.getRandomValues != `function`) throw Error(`crypto.getRandomValues must be defined`);
  if (e2 > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e2}`);
  return t2.getRandomValues(new Uint8Array(e2));
}
const S = (e2) => ({ oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, e2]) });
var C = class {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = false;
  finished = false;
  destroyed = false;
  constructor(e2, t2) {
    if (u(e2), c(t2, void 0, `key`), this.iHash = e2.create(), typeof this.iHash.update != `function`) throw Error(`expected Hash instance`);
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    let n2 = this.blockLen, r2 = new Uint8Array(n2);
    r2.set(t2.length > n2 ? e2.create().update(t2).digest() : t2);
    for (let e3 = 0; e3 < r2.length; e3++) r2[e3] ^= 54;
    this.iHash.update(r2), this.oHash = e2.create();
    for (let e3 = 0; e3 < r2.length; e3++) r2[e3] ^= 106;
    this.oHash.update(r2), h(r2);
  }
  update(e2) {
    return p(this), this.iHash.update(e2), this;
  }
  digestInto(e2) {
    p(this), m(e2, this), this.finished = true;
    let t2 = e2.subarray(0, this.outputLen);
    this.iHash.digestInto(t2), this.oHash.update(t2), this.oHash.digestInto(t2), this.destroy();
  }
  digest() {
    let e2 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e2), e2;
  }
  _cloneInto(e2) {
    e2 ||= Object.create(Object.getPrototypeOf(this), {});
    let { oHash: t2, iHash: n2, finished: r2, destroyed: i2, blockLen: a2, outputLen: o2, canXOF: s2 } = this;
    return e2 = e2, e2.finished = r2, e2.destroyed = i2, e2.blockLen = a2, e2.outputLen = o2, e2.canXOF = s2, e2.oHash = t2._cloneInto(e2.oHash), e2.iHash = n2._cloneInto(e2.iHash), e2;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
const w = (() => {
  let e2 = ((e3, t2, n2) => new C(e3, t2).update(n2).digest());
  return e2.create = (e3, t2) => new C(e3, t2), e2;
})(), T = BigInt(2 ** 32 - 1), E = BigInt(32);
function D(e2, t2 = false) {
  return t2 ? { h: Number(e2 & T), l: Number(e2 >> E & T) } : { h: Number(e2 >> E & T) | 0, l: Number(e2 & T) | 0 };
}
function te(e2, t2 = false) {
  let n2 = e2.length, r2 = new Uint32Array(n2), i2 = new Uint32Array(n2);
  for (let a2 = 0; a2 < n2; a2++) {
    let { h: n3, l: o2 } = D(e2[a2], t2);
    [r2[a2], i2[a2]] = [n3, o2];
  }
  return [r2, i2];
}
const ne = (e2) => e2 / 2 ** 32 | 0, re = (e2) => e2 >>> 0;
function ie(e2, t2, n2, r2) {
  let i2 = ne(n2), a2 = re(n2);
  e2.setUint32(t2, r2 ? a2 : i2, r2), e2.setUint32(t2 + 4, r2 ? i2 : a2, r2);
}
const O = (e2, t2, n2) => e2 >>> n2, ae = (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, k = (e2, t2, n2) => e2 >>> n2 | t2 << 32 - n2, A = (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, j = (e2, t2, n2) => e2 << 64 - n2 | t2 >>> n2 - 32, M = (e2, t2, n2) => e2 >>> n2 - 32 | t2 << 64 - n2;
function N(e2, t2, n2, r2) {
  let i2 = (t2 >>> 0) + (r2 >>> 0);
  return { h: e2 + n2 + (i2 / 2 ** 32 | 0) | 0, l: i2 | 0 };
}
const P = (e2, t2, n2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0), oe = (e2, t2, n2, r2) => t2 + n2 + r2 + (e2 / 2 ** 32 | 0) | 0, se = (e2, t2, n2, r2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0), ce = (e2, t2, n2, r2, i2) => t2 + n2 + r2 + i2 + (e2 / 2 ** 32 | 0) | 0, le = (e2, t2, n2, r2, i2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0) + (i2 >>> 0), ue = (e2, t2, n2, r2, i2, a2) => t2 + n2 + r2 + i2 + a2 + (e2 / 2 ** 32 | 0) | 0;
function F(e2, t2, n2) {
  return e2 & t2 ^ ~e2 & n2;
}
function de(e2, t2, n2) {
  return e2 & t2 ^ e2 & n2 ^ t2 & n2;
}
var I = class {
  blockLen;
  outputLen;
  canXOF = false;
  padOffset;
  isLE;
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(e2, t2, n2, r2) {
    this.blockLen = e2, this.outputLen = t2, this.padOffset = n2, this.isLE = r2, this.buffer = new Uint8Array(e2), this.view = g(this.buffer);
  }
  update(e2) {
    p(this), c(e2);
    let { view: t2, buffer: n2, blockLen: r2 } = this, i2 = e2.length, a2 = false;
    for (let o2 = 0; o2 < i2; ) {
      let s2 = Math.min(r2 - this.pos, i2 - o2);
      if (s2 === r2) {
        let t3 = g(e2);
        for (; r2 <= i2 - o2; o2 += r2) this.process(t3, o2);
        a2 = true;
        continue;
      }
      n2.set(o2 === 0 && s2 === i2 ? e2 : e2.subarray(o2, o2 + s2), this.pos), this.pos += s2, o2 += s2, this.pos === r2 && (this.process(t2, 0), this.pos = 0, a2 = true);
    }
    return this.length += e2.length, a2 && this.roundClean(), this;
  }
  digestInto(e2) {
    p(this), m(e2, this), this.finished = true;
    let { buffer: t2, view: n2, blockLen: r2, isLE: i2 } = this, { pos: a2 } = this;
    t2[a2++] = 128, t2.fill(0, a2), this.padOffset > r2 - a2 && (this.process(n2, 0), t2.fill(0)), ie(n2, r2 - 8, this.length * 8, i2), this.process(n2, 0), this.roundClean();
    let o2 = e2 === t2 ? n2 : g(e2), s2 = this.outputLen, c2 = s2 / 4, l2 = this.get();
    if (s2 % 4 || c2 > l2.length) throw Error(`invalid outputLen`);
    for (let e3 = 0; e3 < c2; e3++) o2.setUint32(4 * e3, l2[e3], i2);
  }
  digest() {
    let { buffer: e2, outputLen: t2 } = this;
    this.digestInto(e2);
    let n2 = e2.slice(0, t2);
    return this.destroy(), n2;
  }
  _cloneIntoMeta(e2) {
    let { buffer: t2, length: n2, finished: r2, destroyed: i2, pos: a2 } = this;
    return e2.destroyed = i2, e2.finished = r2, e2.length = n2, e2.pos = a2, a2 && e2.buffer.set(t2), e2;
  }
  clone() {
    return this._cloneInto();
  }
};
const fe = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), pe = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]), L = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), R = new Uint32Array(64);
var me = class extends I {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  constructor(e2, t2) {
    super(64, e2, 8, false), this.A = t2[0] | 0, this.B = t2[1] | 0, this.C = t2[2] | 0, this.D = t2[3] | 0, this.E = t2[4] | 0, this.F = t2[5] | 0, this.G = t2[6] | 0, this.H = t2[7] | 0;
  }
  get() {
    let { A: e2, B: t2, C: n2, D: r2, E: i2, F: a2, G: o2, H: s2 } = this;
    return [e2, t2, n2, r2, i2, a2, o2, s2];
  }
  set(e2, t2, n2, r2, i2, a2, o2, s2) {
    this.A = e2 | 0, this.B = t2 | 0, this.C = n2 | 0, this.D = r2 | 0, this.E = i2 | 0, this.F = a2 | 0, this.G = o2 | 0, this.H = s2 | 0;
  }
  _cloneInto(e2) {
    return (e2 ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e2);
  }
  process(e2, t2) {
    for (let n3 = 0; n3 < 16; n3++, t2 += 4) R[n3] = e2.getUint32(t2, false);
    for (let e3 = 16; e3 < 64; e3++) {
      let t3 = R[e3 - 15], n3 = R[e3 - 2], r3 = _(t3, 7) ^ _(t3, 18) ^ t3 >>> 3, i3 = _(n3, 17) ^ _(n3, 19) ^ n3 >>> 10;
      R[e3] = i3 + R[e3 - 7] + r3 + R[e3 - 16] | 0;
    }
    let { A: n2, B: r2, C: i2, D: a2, E: o2, F: s2, G: c2, H: l2 } = this;
    for (let e3 = 0; e3 < 64; e3++) {
      let t3 = _(o2, 6) ^ _(o2, 11) ^ _(o2, 25), u2 = l2 + t3 + F(o2, s2, c2) + L[e3] + R[e3] | 0, d2 = (_(n2, 2) ^ _(n2, 13) ^ _(n2, 22)) + de(n2, r2, i2) | 0;
      l2 = c2, c2 = s2, s2 = o2, o2 = a2 + u2 | 0, a2 = i2, i2 = r2, r2 = n2, n2 = u2 + d2 | 0;
    }
    n2 = n2 + this.A | 0, r2 = r2 + this.B | 0, i2 = i2 + this.C | 0, a2 = a2 + this.D | 0, o2 = o2 + this.E | 0, s2 = s2 + this.F | 0, c2 = c2 + this.G | 0, l2 = l2 + this.H | 0, this.set(n2, r2, i2, a2, o2, s2, c2, l2);
  }
  roundClean() {
    h(R);
  }
  destroy() {
    this.destroyed = true, this.set(0, 0, 0, 0, 0, 0, 0, 0), h(this.buffer);
  }
}, he = class extends me {
  constructor() {
    super(32, fe);
  }
};
const z = te(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map((e2) => BigInt(e2))), ge = z[0], _e = z[1], B = new Uint32Array(80), V = new Uint32Array(80);
var H = class extends I {
  Ah = 0;
  Al = 0;
  Bh = 0;
  Bl = 0;
  Ch = 0;
  Cl = 0;
  Dh = 0;
  Dl = 0;
  Eh = 0;
  El = 0;
  Fh = 0;
  Fl = 0;
  Gh = 0;
  Gl = 0;
  Hh = 0;
  Hl = 0;
  constructor(e2, t2) {
    super(128, e2, 16, false), this.Ah = t2[0] | 0, this.Al = t2[1] | 0, this.Bh = t2[2] | 0, this.Bl = t2[3] | 0, this.Ch = t2[4] | 0, this.Cl = t2[5] | 0, this.Dh = t2[6] | 0, this.Dl = t2[7] | 0, this.Eh = t2[8] | 0, this.El = t2[9] | 0, this.Fh = t2[10] | 0, this.Fl = t2[11] | 0, this.Gh = t2[12] | 0, this.Gl = t2[13] | 0, this.Hh = t2[14] | 0, this.Hl = t2[15] | 0;
  }
  get() {
    let { Ah: e2, Al: t2, Bh: n2, Bl: r2, Ch: i2, Cl: a2, Dh: o2, Dl: s2, Eh: c2, El: l2, Fh: u2, Fl: d2, Gh: f2, Gl: p2, Hh: m2, Hl: h2 } = this;
    return [e2, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2];
  }
  set(e2, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2) {
    this.Ah = e2 | 0, this.Al = t2 | 0, this.Bh = n2 | 0, this.Bl = r2 | 0, this.Ch = i2 | 0, this.Cl = a2 | 0, this.Dh = o2 | 0, this.Dl = s2 | 0, this.Eh = c2 | 0, this.El = l2 | 0, this.Fh = u2 | 0, this.Fl = d2 | 0, this.Gh = f2 | 0, this.Gl = p2 | 0, this.Hh = m2 | 0, this.Hl = h2 | 0;
  }
  _cloneInto(e2) {
    return (e2 ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e2);
  }
  process(e2, t2) {
    for (let n3 = 0; n3 < 16; n3++, t2 += 4) B[n3] = e2.getUint32(t2), V[n3] = e2.getUint32(t2 += 4);
    for (let e3 = 16; e3 < 80; e3++) {
      let t3 = B[e3 - 15] | 0, n3 = V[e3 - 15] | 0, r3 = k(t3, n3, 1) ^ k(t3, n3, 8) ^ O(t3, n3, 7), i3 = A(t3, n3, 1) ^ A(t3, n3, 8) ^ ae(t3, n3, 7), a3 = B[e3 - 2] | 0, o3 = V[e3 - 2] | 0, s3 = k(a3, o3, 19) ^ j(a3, o3, 61) ^ O(a3, o3, 6), c3 = A(a3, o3, 19) ^ M(a3, o3, 61) ^ ae(a3, o3, 6), l3 = se(i3, c3, V[e3 - 7], V[e3 - 16]), u3 = ce(l3, r3, s3, B[e3 - 7], B[e3 - 16]);
      B[e3] = u3 | 0, V[e3] = l3 | 0;
    }
    let { Ah: n2, Al: r2, Bh: i2, Bl: a2, Ch: o2, Cl: s2, Dh: c2, Dl: l2, Eh: u2, El: d2, Fh: f2, Fl: p2, Gh: m2, Gl: h2, Hh: g2, Hl: _2 } = this;
    for (let e3 = 0; e3 < 80; e3++) {
      let t3 = k(u2, d2, 14) ^ k(u2, d2, 18) ^ j(u2, d2, 41), ee2 = A(u2, d2, 14) ^ A(u2, d2, 18) ^ M(u2, d2, 41), v2 = u2 & f2 ^ ~u2 & m2, y2 = d2 & p2 ^ ~d2 & h2, b2 = le(_2, ee2, y2, _e[e3], V[e3]), x2 = ue(b2, g2, t3, v2, ge[e3], B[e3]), S2 = b2 | 0, C2 = k(n2, r2, 28) ^ j(n2, r2, 34) ^ j(n2, r2, 39), w2 = A(n2, r2, 28) ^ M(n2, r2, 34) ^ M(n2, r2, 39), T2 = n2 & i2 ^ n2 & o2 ^ i2 & o2, E2 = r2 & a2 ^ r2 & s2 ^ a2 & s2;
      g2 = m2 | 0, _2 = h2 | 0, m2 = f2 | 0, h2 = p2 | 0, f2 = u2 | 0, p2 = d2 | 0, { h: u2, l: d2 } = N(c2 | 0, l2 | 0, x2 | 0, S2 | 0), c2 = o2 | 0, l2 = s2 | 0, o2 = i2 | 0, s2 = a2 | 0, i2 = n2 | 0, a2 = r2 | 0;
      let D2 = P(S2, w2, E2);
      n2 = oe(D2, x2, C2, T2), r2 = D2 | 0;
    }
    ({ h: n2, l: r2 } = N(this.Ah | 0, this.Al | 0, n2 | 0, r2 | 0)), { h: i2, l: a2 } = N(this.Bh | 0, this.Bl | 0, i2 | 0, a2 | 0), { h: o2, l: s2 } = N(this.Ch | 0, this.Cl | 0, o2 | 0, s2 | 0), { h: c2, l: l2 } = N(this.Dh | 0, this.Dl | 0, c2 | 0, l2 | 0), { h: u2, l: d2 } = N(this.Eh | 0, this.El | 0, u2 | 0, d2 | 0), { h: f2, l: p2 } = N(this.Fh | 0, this.Fl | 0, f2 | 0, p2 | 0), { h: m2, l: h2 } = N(this.Gh | 0, this.Gl | 0, m2 | 0, h2 | 0), { h: g2, l: _2 } = N(this.Hh | 0, this.Hl | 0, g2 | 0, _2 | 0), this.set(n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2, _2);
  }
  roundClean() {
    h(B, V);
  }
  destroy() {
    this.destroyed = true, h(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}, U = class extends H {
  constructor() {
    super(64, pe);
  }
};
const ve = b(() => new he(), S(1)), W = b(() => new U(), S(3));
function ye() {
  let e2 = (typeof globalThis == `object` ? globalThis.crypto : null)?.subtle;
  if (typeof e2 == `object` && e2) return e2;
  throw Error(`crypto.subtle must be defined`);
}
function be(e2, t2, n2) {
  let r2 = async (t3) => {
    c(t3);
    let n3 = ye();
    return new Uint8Array(await n3.digest(e2, t3));
  };
  return r2.webCryptoName = e2, r2.outputLen = n2, r2.blockLen = t2, r2.create = () => {
    throw Error(`not implemented`);
  }, Object.freeze(r2);
}
function xe(e2) {
  u(e2);
  let t2 = e2.webCryptoName;
  if (typeof t2 != `string`) throw Error(`non-web hash`);
  return t2;
}
const Se = be(`SHA-512`, 128, 64);
async function Ce(e2, t2, n2, r2) {
  let i2 = ye(), a2 = xe(e2), { c: o2, dkLen: c2 } = y({ dkLen: 32 }, r2);
  if (s(o2, `c`), s(c2, `dkLen`), o2 > 2147483647) throw Error(`"c" exceeds WebCrypto backend limit`);
  if (c2 < 1) throw Error(`"dkLen" must be >= 1`);
  if (c2 >= 2 ** 29) throw Error(`derived key too long`);
  let u2 = v(t2, `password`);
  try {
    let e3 = v(n2, `salt`), t3 = typeof n2 == `string` ? e3 : l(e3);
    try {
      let e4 = await i2.importKey(`raw`, u2, `PBKDF2`, false, [`deriveBits`]), n3 = { name: `PBKDF2`, salt: t3, iterations: o2, hash: a2 }, r3 = new Uint8Array(await i2.deriveBits(n3, e4, 8 * c2));
      if (r3.length !== c2) throw h(r3), Error(`WebCrypto returned an invalid derived key length`);
      return r3;
    } finally {
      h(t3);
    }
  } finally {
    typeof t2 == `string` && h(u2);
  }
}
/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */
const we = (e2) => e2[0] === `\u3042\u3044\u3053\u304F\u3057\u3093`;
function Te(e2) {
  for (let t2 = 0; t2 < e2.length; t2++) {
    let n2 = e2.charCodeAt(t2);
    if (n2 >= 55296 && n2 <= 56319) {
      if (t2 + 1 >= e2.length) return false;
      let n3 = e2.charCodeAt(++t2);
      if (n3 < 56320 || n3 > 57343) return false;
    } else if (n2 >= 56320 && n2 <= 57343) return false;
  }
  return true;
}
function Ee(e2) {
  if (typeof e2 != `string`) throw TypeError(`invalid mnemonic type: ` + typeof e2);
  if (!Te(e2)) throw TypeError(`expected well-formed Unicode string`);
  return e2.normalize(`NFKD`);
}
function De(e2) {
  let t2 = Ee(e2), n2 = t2.split(` `);
  if (![12, 15, 18, 21, 24].includes(n2.length)) throw Error(`Invalid mnemonic`);
  return { nfkd: t2, words: n2 };
}
function Oe(e2) {
  if (c(e2), ![16, 20, 24, 28, 32].includes(e2.length)) throw RangeError(`invalid entropy length`);
}
function ke(e2, t2 = 128) {
  if (s(t2), t2 % 32 != 0 || t2 > 256) throw RangeError(`Invalid entropy`);
  return Ne(x(t2 / 8), e2);
}
const Ae = (e2) => {
  let t2 = 8 - e2.length / 4;
  return ve(e2)[0] >> t2 << t2;
};
function je(e2) {
  if (!Array.isArray(e2) || e2.length !== 2048 || typeof e2[0] != `string`) throw TypeError(`Wordlist: expected array of 2048 strings`);
  e2.forEach((e3) => {
    if (typeof e3 != `string`) throw TypeError(`wordlist: non-string element: ` + e3);
    if (!Te(e3)) throw TypeError(`wordlist: expected well-formed Unicode string`);
  });
}
function Me(e2, t2) {
  je(t2);
  let n2 = new Uint8Array(e2.length + 1);
  n2.set(e2), n2[e2.length] = Ae(e2);
  let r2 = [], i2 = 0, a2 = 0;
  for (let e3 of n2) i2 = i2 << 8 | e3, a2 += 8, a2 >= 11 && (a2 -= 11, r2.push(t2[i2 >>> a2 & 2047]), i2 &= (1 << a2) - 1);
  return r2;
}
function Ne(e2, t2) {
  return Oe(e2), Me(e2, t2).join(we(t2) ? `\u3000` : ` `);
}
const Pe = (e2) => {
  if (typeof e2 != `string`) throw TypeError(`invalid passphrase type: ` + typeof e2);
  return Ee(`mnemonic` + e2);
};
function Fe(e2, t2 = ``) {
  return Ce(Se, De(e2).nfkd, Pe(t2), { c: 2048, dkLen: 64 });
}
const G = Object.freeze(`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`)), Ie = 4096, Le = 1e6;
function Re() {
  if (!Array.isArray(G) || G.length !== 2048) throw TypeError(`The bundled BIP39 English wordlist is invalid.`);
  for (let e2 of G) if (typeof e2 != `string` || e2.length === 0) throw TypeError(`The bundled BIP39 English wordlist is invalid.`);
  return Object.freeze([...G]);
}
const K = Re();
function ze() {
  let e2 = globalThis.crypto;
  if (!e2 || typeof e2.getRandomValues != `function`) throw Error(`A cryptographically secure random-number generator is unavailable.`);
  return e2;
}
function Be(e2) {
  if (!(e2 instanceof Uint8Array) || e2.byteLength !== 16) throw RangeError(`A 12-word BIP39 mnemonic requires exactly 16 bytes of entropy.`);
  let t2 = ve(e2);
  try {
    let n2 = e2;
    return [K[n2[0] << 3 | n2[1] >>> 5], K[(n2[1] & 31) << 6 | n2[2] >>> 2], K[(n2[2] & 3) << 9 | n2[3] << 1 | n2[4] >>> 7], K[(n2[4] & 127) << 4 | n2[5] >>> 4], K[(n2[5] & 15) << 7 | n2[6] >>> 1], K[(n2[6] & 1) << 10 | n2[7] << 2 | n2[8] >>> 6], K[(n2[8] & 63) << 5 | n2[9] >>> 3], K[(n2[9] & 7) << 8 | n2[10]], K[n2[11] << 3 | n2[12] >>> 5], K[(n2[12] & 31) << 6 | n2[13] >>> 2], K[(n2[13] & 3) << 9 | n2[14] << 1 | n2[15] >>> 7], K[(n2[15] & 127) << 4 | t2[0] >>> 4]].join(` `);
  } finally {
    t2.fill(0);
  }
}
function Ve() {
  let e2 = new Uint8Array(16);
  try {
    return ze().getRandomValues(e2), Be(e2);
  } finally {
    e2.fill(0);
  }
}
function He(e2) {
  if (!Number.isSafeInteger(e2) || e2 < 0 || e2 > Le) throw RangeError(`Mnemonic batch size must be an integer from 0 to ${Le}.`);
  if (e2 === 0) return [];
  let t2 = ze(), n2 = Array(e2), r2 = new Uint8Array(Math.min(e2, Ie) * 16), i2 = 0;
  try {
    for (; i2 < e2; ) {
      let a2 = Math.min(e2 - i2, Ie), o2 = r2.subarray(0, a2 * 16);
      t2.getRandomValues(o2);
      try {
        for (let e3 = 0; e3 < a2; e3 += 1) {
          let t3 = e3 * 16;
          n2[i2 + e3] = Be(o2.subarray(t3, t3 + 16));
        }
      } finally {
        o2.fill(0);
      }
      i2 += a2;
    }
    return n2;
  } catch (e3) {
    throw n2.fill(``), e3;
  } finally {
    r2.fill(0);
  }
}
const Ue = 1e6, We = new TextEncoder(), Ge = new Uint8Array();
if (!Array.isArray(G) || G.length !== 2048) throw TypeError(`The bundled TON mnemonic wordlist is invalid.`);
const Ke = Object.freeze([...G]), qe = new Set(Ke);
function Je() {
  let e2 = globalThis.crypto;
  if (!e2 || typeof e2.getRandomValues != `function`) throw Error(`A cryptographically secure random-number generator is unavailable.`);
  return e2;
}
function Ye(e2) {
  if (!(e2 instanceof Uint8Array) || e2.byteLength !== 64) throw RangeError(`TON mnemonic entropy must be exactly 64 bytes.`);
}
function Xe(e2) {
  let t2 = (typeof e2 == `string` ? e2.split(/\s+/u) : [...e2]).map((e3) => e3.normalize(`NFKD`).trim().toLowerCase()).filter(Boolean);
  if (t2.length !== 24 || t2.some((e3) => !qe.has(e3))) throw TypeError(`Expected exactly 24 English TON mnemonic words.`);
  return t2;
}
function Ze(e2) {
  let t2 = Xe(e2), n2 = We.encode(t2.join(` `));
  try {
    return w(W, n2, Ge);
  } finally {
    n2.fill(0), t2.fill(``);
  }
}
async function Qe(e2, t2, n2) {
  Ye(e2);
  let r2 = globalThis.crypto?.subtle;
  if (!r2) throw Error(`Web Crypto is unavailable.`);
  let i2 = e2.slice(), a2 = We.encode(t2);
  try {
    let e3 = await r2.importKey(`raw`, i2.buffer, `PBKDF2`, false, [`deriveBits`]), t3 = await r2.deriveBits({ name: `PBKDF2`, hash: `SHA-512`, salt: a2, iterations: n2 }, e3, 512);
    return new Uint8Array(t3);
  } finally {
    i2.fill(0), a2.fill(0);
  }
}
function $e(e2) {
  return Qe(e2, `TON seed version`, 390);
}
async function et(e2) {
  let t2 = await Qe(e2, `TON default seed`, 1e5);
  try {
    return t2.slice(0, 32);
  } finally {
    t2.fill(0);
  }
}
function tt() {
  return nt(1)[0];
}
function nt(e2) {
  if (!Number.isSafeInteger(e2) || e2 < 0 || e2 > Ue) throw RangeError(`Mnemonic batch size must be an integer from 0 to ${Ue}.`);
  if (e2 === 0) return [];
  let t2 = Je(), n2 = Array(e2), r2 = Math.floor(65536 / (24 * Uint16Array.BYTES_PER_ELEMENT)), i2 = new Uint16Array(Math.min(e2, r2) * 24), a2 = 0;
  try {
    for (; a2 < e2; ) {
      let o2 = Math.min(e2 - a2, r2), s2 = i2.subarray(0, o2 * 24);
      t2.getRandomValues(s2);
      try {
        for (let e3 = 0; e3 < o2; e3 += 1) {
          let t3 = Array(24), r3 = e3 * 24;
          for (let e4 = 0; e4 < 24; e4 += 1) t3[e4] = Ke[s2[r3 + e4] & 2047];
          n2[a2 + e3] = t3.join(` `), t3.fill(``);
        }
      } finally {
        s2.fill(0);
      }
      a2 += o2;
    }
    return n2;
  } catch (e3) {
    throw n2.fill(``), e3;
  } finally {
    i2.fill(0);
  }
}
const rt = /^[A-Za-z0-9_-]+$/;
function it(e2) {
  return e2.trim();
}
function at(e2) {
  let t2 = it(e2);
  return t2.length === 0 ? { valid: false, error: `empty` } : t2.length > 48 ? { valid: false, error: `too-long` } : rt.test(t2) ? { valid: true, suffix: t2 } : { valid: false, error: `invalid-characters` };
}
function ot(e2, t2, n2) {
  return n2 ? e2.endsWith(t2) : e2.toLowerCase().endsWith(t2.toLowerCase());
}
function st(e2) {
  return e2.version !== `v4r2` && e2.version !== `w5` || e2.addressFormat !== `bounceable` && e2.addressFormat !== `non-bounceable` || e2.engine !== `cpu` && e2.engine !== `gpu` || e2.locale !== `ru` && e2.locale !== `en` || e2.mnemonicScheme !== `multichain-12` && e2.mnemonicScheme !== `ton-24` ? { valid: false, error: `invalid-characters` } : at(e2.suffix);
}
const ct = 16384, lt = self;
globalThis.Buffer = i.Buffer, Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
const ut = import("./ton-rNJp0IQ0.js"), dt = import("./cpu-ed25519-Cc_Yv4xd.js").then(({ createCpuEd25519Accelerator: e2 }) => e2());
let q = 0, J = null, Y = -1, ft = `ru`, pt = null;
const mt = { ru: { generation: `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0451\u043A. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u043E\u0438\u0441\u043A.`, invalid: `\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B.`, missing: `\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u0448\u0435\u043B\u0451\u043A \u0443\u0436\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u043E\u0438\u0441\u043A \u0437\u0430\u043D\u043E\u0432\u043E.` }, en: { generation: `The wallet could not be generated. Restart the search.`, invalid: `The search settings are invalid.`, missing: `The found wallet is no longer available. Start a new search.` } };
function X(e2) {
  lt.postMessage(e2);
}
function Z(e2) {
  e2.fill(``);
}
function ht() {
  J && Z(J.mnemonic), J = null, Y = -1;
}
function gt() {
  let e2 = Ve();
  return { mnemonic: e2.split(` `), rootSeed: Fe(e2) };
}
function _t(e2) {
  Z(e2.mnemonic), e2.rootSeed.then((e3) => {
    e3.fill(0);
  }, () => void 0);
}
function Q() {
  pt?.destroy(), pt = null;
}
function vt(e2, t2, n2 = false) {
  let r2 = performance.now();
  if (!n2 && r2 - t2.lastProgressAt < 500) return;
  let i2 = r2 - t2.startedAt;
  X({ type: `progress`, workerId: e2, progress: { attempts: t2.attempts, elapsedMs: i2, attemptsPerSecond: i2 > 0 ? t2.attempts * 1e3 / i2 : 0, sampleAddress: t2.sampleAddress } }), t2.lastProgressAt = r2;
}
function $(e2, t2, n2, r2, i2) {
  let a2 = performance.now() - i2.startedAt;
  J = { address: r2.address, mnemonic: r2.mnemonic, version: n2.version, addressFormat: n2.addressFormat, mnemonicScheme: n2.mnemonicScheme, attempts: i2.attempts, elapsedMs: a2 }, Y = t2, X({ type: `candidate`, workerId: t2, candidate: { address: J.address, version: J.version, addressFormat: J.addressFormat, mnemonicScheme: J.mnemonicScheme, attempts: J.attempts, elapsedMs: J.elapsedMs } }), q === e2 && (q += 1);
}
async function yt(e2, t2, n2, r2, a2) {
  let [o2, s2] = await Promise.all([ut, dt]);
  X({ type: `engine`, workerId: t2, engine: `cpu` });
  let c2 = gt();
  try {
    for (; e2 === q; ) {
      let l2 = c2;
      c2 = null;
      let u2, d2, f2, p2 = ``;
      try {
        if (u2 = await l2.rootSeed, e2 !== q) {
          Z(l2.mnemonic);
          return;
        }
        c2 = gt(), d2 = o2.deriveTonPathSeed(u2), f2 = s2.publicKeyFromSeed(d2);
        let t3 = i.Buffer.from(f2.buffer, f2.byteOffset, f2.byteLength);
        p2 = o2.walletAddressFromPublicKey(t3, n2.version, n2.addressFormat);
      } catch (e3) {
        throw Z(l2.mnemonic), e3;
      } finally {
        u2?.fill(0), d2?.fill(0), f2?.fill(0);
      }
      if (e2 !== q) {
        Z(l2.mnemonic);
        return;
      }
      if (a2.attempts += 1, a2.sampleAddress = p2, ot(p2, r2, n2.caseSensitive)) {
        let r3;
        try {
          r3 = await o2.walletCandidateFromMnemonic(l2.mnemonic, n2.version, n2.addressFormat, n2.mnemonicScheme);
        } catch (e3) {
          throw Z(l2.mnemonic), e3;
        }
        if (e2 !== q) {
          Z(l2.mnemonic), Z(r3.mnemonic);
          return;
        }
        if (r3.address !== p2) throw Z(l2.mnemonic), Z(r3.mnemonic), Error(`CPU winner failed independent canonical verification.`);
        Z(l2.mnemonic), $(e2, t2, n2, r3, a2);
        return;
      }
      Z(l2.mnemonic), vt(t2, a2);
    }
  } finally {
    c2 && _t(c2);
  }
}
async function bt(e2, t2, n2, r2, a2) {
  let [o2, s2] = await Promise.all([ut, dt]);
  for (X({ type: `engine`, workerId: t2, engine: `cpu` }); e2 === q; ) {
    let c2 = tt().split(` `), l2, u2, d2, f2, p2 = ``;
    try {
      if (l2 = Ze(c2), u2 = await $e(l2), e2 !== q) {
        Z(c2);
        return;
      }
      if (u2[0] !== 0) {
        Z(c2);
        continue;
      }
      if (d2 = await et(l2), e2 !== q) {
        Z(c2);
        return;
      }
      f2 = s2.publicKeyFromSeed(d2);
      let t3 = i.Buffer.from(f2.buffer, f2.byteOffset, f2.byteLength);
      p2 = o2.walletAddressFromPublicKey(t3, n2.version, n2.addressFormat);
    } catch (e3) {
      throw Z(c2), e3;
    } finally {
      l2?.fill(0), u2?.fill(0), d2?.fill(0), f2?.fill(0);
    }
    if (e2 !== q) {
      Z(c2);
      return;
    }
    if (a2.attempts += 1, a2.sampleAddress = p2, ot(p2, r2, n2.caseSensitive)) {
      let r3 = await o2.walletCandidateFromMnemonic(c2, n2.version, n2.addressFormat, n2.mnemonicScheme);
      if (e2 !== q) {
        Z(c2), Z(r3.mnemonic);
        return;
      }
      if (r3.address !== p2) throw Z(c2), Z(r3.mnemonic), Error(`TON mnemonic CPU winner failed canonical verification.`);
      Z(c2), $(e2, t2, n2, r3, a2);
      return;
    }
    Z(c2), vt(t2, a2);
  }
}
async function xt(e2, t2, n2, r2, a2) {
  let [{ WebGpuPbkdf2Accelerator: o2 }, s2, c2] = await Promise.all([import("./webgpu-pbkdf2-p_ao_5Vt.js"), ut, dt]), l2 = await o2.create({ maxBatchSize: n2.mnemonicScheme === `ton-24` ? ct : 512, powerPreference: `high-performance`, selfTest: true });
  if (pt = l2, n2.mnemonicScheme === `ton-24` && t2 === 0 && await l2.runTonMnemonicSelfTest(), e2 !== q) {
    Q();
    return;
  }
  if (X({ type: `engine`, workerId: t2, engine: `gpu` }), n2.mnemonicScheme === `ton-24`) {
    for (; e2 === q; ) {
      let o3 = nt(ct), u2 = [];
      try {
        if (u2 = await l2.deriveTonMnemonicSeeds(o3), e2 !== q) return;
        if (u2.length !== o3.length) throw Error(`WebGPU returned an incomplete TON mnemonic seed batch.`);
        let d2 = [];
        o3.forEach((e3, t3) => {
          let r3 = u2[t3];
          if (!r3) return;
          let a3 = e3.split(` `);
          try {
            let e4 = c2.publicKeyFromSeed(r3), t4;
            try {
              let r4 = i.Buffer.from(e4.buffer, e4.byteOffset, e4.byteLength);
              t4 = s2.walletAddressFromPublicKey(r4, n2.version, n2.addressFormat);
            } finally {
              e4.fill(0);
            }
            d2.push({ ok: true, mnemonic: a3, address: t4 });
          } catch (e4) {
            d2.push({ ok: false, mnemonic: a3, error: e4 });
          } finally {
            r3.fill(0);
          }
        });
        try {
          let i2 = d2.find((e3) => !e3.ok);
          if (i2 && !i2.ok) throw i2.error;
          if (e2 !== q) return;
          let o4;
          for (let e3 of d2) e3.ok && (a2.attempts += 1, a2.sampleAddress = e3.address, !o4 && ot(e3.address, r2, n2.caseSensitive) && (o4 = e3));
          if (o4) {
            let r3 = await s2.walletCandidateFromMnemonic(o4.mnemonic, n2.version, n2.addressFormat, n2.mnemonicScheme);
            if (e2 !== q) {
              Z(r3.mnemonic);
              return;
            }
            if (r3.address !== o4.address) throw Z(r3.mnemonic), Error(`TON mnemonic GPU winner failed independent CPU verification.`);
            $(e2, t2, n2, r3, a2), Q();
            return;
          }
          vt(t2, a2);
        } finally {
          for (let e3 of d2) Z(e3.mnemonic);
        }
      } finally {
        for (let e3 of u2) e3?.fill(0);
        o3.fill(``);
      }
    }
    return;
  }
  for (; e2 === q; ) {
    let o3 = He(512), u2 = [];
    try {
      if (u2 = await l2.deriveTonSeeds(o3), e2 !== q) return;
      let d2 = o3.map((e3, t3) => {
        let r3 = e3.split(` `), a3 = u2[t3];
        try {
          if (!a3) throw Error(`WebGPU returned an incomplete seed batch.`);
          let e4 = c2.publicKeyFromSeed(a3), t4;
          try {
            let r4 = i.Buffer.from(e4.buffer, e4.byteOffset, e4.byteLength);
            t4 = s2.walletAddressFromPublicKey(r4, n2.version, n2.addressFormat);
          } finally {
            e4.fill(0);
          }
          return { ok: true, mnemonic: r3, address: t4 };
        } catch (e4) {
          return { ok: false, mnemonic: r3, error: e4 };
        } finally {
          a3?.fill(0);
        }
      }), f2 = () => {
        for (let e3 of d2) Z(e3.mnemonic);
      };
      try {
        let i2 = d2.find((e3) => !e3.ok);
        if (i2 && !i2.ok) throw i2.error;
        if (e2 !== q) return;
        let o4;
        for (let e3 of d2) e3.ok && (a2.attempts += 1, a2.sampleAddress = e3.address, !o4 && ot(e3.address, r2, n2.caseSensitive) && (o4 = e3));
        if (o4) {
          let r3 = await s2.walletCandidateFromMnemonic(o4.mnemonic, n2.version, n2.addressFormat, n2.mnemonicScheme);
          if (e2 !== q) {
            Z(r3.mnemonic);
            return;
          }
          if (r3.address !== o4.address) throw Z(r3.mnemonic), Error(`GPU winner failed independent CPU verification.`);
          $(e2, t2, n2, r3, a2), Q();
          return;
        }
        vt(t2, a2);
      } finally {
        f2();
      }
    } finally {
      for (let e3 of u2) e3.fill(0);
      o3.fill(``);
    }
  }
}
async function St(e2, t2, n2, r2) {
  let i2 = performance.now(), a2 = { startedAt: i2, lastProgressAt: i2, attempts: 0, sampleAddress: `` };
  if (n2.engine === `gpu`) try {
    await xt(e2, t2, n2, r2, a2);
    return;
  } catch (n3) {
    if (e2 !== q) return;
    Q(), X({ type: `engine`, workerId: t2, engine: `cpu`, fallbackReason: n3 instanceof Error ? n3.message : `WebGPU failure` });
  }
  n2.mnemonicScheme === `ton-24` ? await bt(e2, t2, n2, r2, a2) : await yt(e2, t2, n2, r2, a2);
}
lt.addEventListener(`message`, (e2) => {
  let t2 = e2.data;
  if (t2.type === `stop`) {
    q += 1, Q(), ht();
    return;
  }
  if (t2.type === `reveal`) {
    if (!J) {
      X({ type: `error`, workerId: Y, message: mt[ft].missing });
      return;
    }
    let e3 = J, t3 = Y;
    J = null, Y = -1, X({ type: `revealed`, workerId: t3, wallet: e3 }), Z(e3.mnemonic);
    return;
  }
  ht(), Q(), ft = t2.options.locale;
  let n2 = q + 1;
  q = n2;
  let r2 = st(t2.options);
  if (!r2.valid) {
    X({ type: `error`, workerId: t2.workerId, message: mt[ft].invalid });
    return;
  }
  X({ type: `ready`, workerId: t2.workerId }), St(n2, t2.workerId, t2.options, r2.suffix).catch((e3) => {
    n2 === q && (Q(), q += 1, X({ type: `error`, workerId: t2.workerId, message: mt[ft].generation }));
  });
});
export { W as a, Fe as i, G as n, w as o, ke as r, r as s, Ze as t };
