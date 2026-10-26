import { a as e, i as t, n, r, t as i } from "./rolldown-runtime-D0SfkDIG.js";
import { a, i as o, n as s, o as c, r as l, s as u } from "./vanity.worker-CItyiGg3.js";
import { t as d } from "./__vite-browser-external-ot8xyDl2.js";
import { t as f } from "./ed25519-D_YPZtkb.js";
var p = i(((e2, t2) => {
  (function(n2, r2) {
    typeof e2 == `object` && t2 !== void 0 ? t2.exports = r2() : typeof define == `function` && define.amd ? define(r2) : (n2 = typeof globalThis < `u` ? globalThis : n2 || self).jsSHA = r2();
  })(e2, (function() {
    var e3 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
    function t3(e4, t4, n3, r3) {
      var i3, a3, o3, s3 = t4 || [0], c3 = (n3 ||= 0) >>> 3, l3 = r3 === -1 ? 3 : 0;
      for (i3 = 0; i3 < e4.length; i3 += 1) a3 = (o3 = i3 + c3) >>> 2, s3.length <= a3 && s3.push(0), s3[a3] |= e4[i3] << 8 * (l3 + o3 % 4 * r3);
      return { value: s3, binLen: 8 * e4.length + n3 };
    }
    function n2(n3, r3, i3) {
      switch (r3) {
        case `UTF8`:
        case `UTF16BE`:
        case `UTF16LE`:
          break;
        default:
          throw Error(`encoding must be UTF8, UTF16BE, or UTF16LE`);
      }
      switch (n3) {
        case `HEX`:
          return function(e4, t4, n4) {
            return (function(e5, t5, n5, r4) {
              var i4, a3, o3, s3;
              if (e5.length % 2 != 0) throw Error(`String of HEX type must be in byte increments`);
              var c3 = t5 || [0], l3 = (n5 ||= 0) >>> 3, u3 = r4 === -1 ? 3 : 0;
              for (i4 = 0; i4 < e5.length; i4 += 2) {
                if (a3 = parseInt(e5.substr(i4, 2), 16), isNaN(a3)) throw Error(`String of HEX type contains invalid characters`);
                for (o3 = (s3 = (i4 >>> 1) + l3) >>> 2; c3.length <= o3; ) c3.push(0);
                c3[o3] |= a3 << 8 * (u3 + s3 % 4 * r4);
              }
              return { value: c3, binLen: 4 * e5.length + n5 };
            })(e4, t4, n4, i3);
          };
        case `TEXT`:
          return function(e4, t4, n4) {
            return (function(e5, t5, n5, r4, i4) {
              var a3, o3, s3, c3, l3, u3, d3, f3, p3 = 0, m3 = n5 || [0], h3 = (r4 ||= 0) >>> 3;
              if (t5 === `UTF8`) for (d3 = i4 === -1 ? 3 : 0, s3 = 0; s3 < e5.length; s3 += 1) for (o3 = [], 128 > (a3 = e5.charCodeAt(s3)) ? o3.push(a3) : 2048 > a3 ? (o3.push(192 | a3 >>> 6), o3.push(128 | 63 & a3)) : 55296 > a3 || 57344 <= a3 ? o3.push(224 | a3 >>> 12, 128 | a3 >>> 6 & 63, 128 | 63 & a3) : (s3 += 1, a3 = 65536 + ((1023 & a3) << 10 | 1023 & e5.charCodeAt(s3)), o3.push(240 | a3 >>> 18, 128 | a3 >>> 12 & 63, 128 | a3 >>> 6 & 63, 128 | 63 & a3)), c3 = 0; c3 < o3.length; c3 += 1) {
                for (l3 = (u3 = p3 + h3) >>> 2; m3.length <= l3; ) m3.push(0);
                m3[l3] |= o3[c3] << 8 * (d3 + u3 % 4 * i4), p3 += 1;
              }
              else for (d3 = i4 === -1 ? 2 : 0, f3 = t5 === `UTF16LE` && i4 !== 1 || t5 !== `UTF16LE` && i4 === 1, s3 = 0; s3 < e5.length; s3 += 1) {
                for (a3 = e5.charCodeAt(s3), true === f3 && (a3 = (c3 = 255 & a3) << 8 | a3 >>> 8), l3 = (u3 = p3 + h3) >>> 2; m3.length <= l3; ) m3.push(0);
                m3[l3] |= a3 << 8 * (d3 + u3 % 4 * i4), p3 += 2;
              }
              return { value: m3, binLen: 8 * p3 + r4 };
            })(e4, r3, t4, n4, i3);
          };
        case `B64`:
          return function(t4, n4, r4) {
            return (function(t5, n5, r5, i4) {
              var a3, o3, s3, c3, l3, u3, d3 = 0, f3 = n5 || [0], p3 = (r5 ||= 0) >>> 3, m3 = i4 === -1 ? 3 : 0, h3 = t5.indexOf(`=`);
              if (t5.search(/^[a-zA-Z0-9=+/]+$/) === -1) throw Error(`Invalid character in base-64 string`);
              if (t5 = t5.replace(/=/g, ``), h3 !== -1 && h3 < t5.length) throw Error(`Invalid '=' found in base-64 string`);
              for (a3 = 0; a3 < t5.length; a3 += 4) {
                for (c3 = t5.substr(a3, 4), s3 = 0, o3 = 0; o3 < c3.length; o3 += 1) s3 |= e3.indexOf(c3.charAt(o3)) << 18 - 6 * o3;
                for (o3 = 0; o3 < c3.length - 1; o3 += 1) {
                  for (l3 = (u3 = d3 + p3) >>> 2; f3.length <= l3; ) f3.push(0);
                  f3[l3] |= (s3 >>> 16 - 8 * o3 & 255) << 8 * (m3 + u3 % 4 * i4), d3 += 1;
                }
              }
              return { value: f3, binLen: 8 * d3 + r5 };
            })(t4, n4, r4, i3);
          };
        case `BYTES`:
          return function(e4, t4, n4) {
            return (function(e5, t5, n5, r4) {
              var i4, a3, o3, s3, c3 = t5 || [0], l3 = (n5 ||= 0) >>> 3, u3 = r4 === -1 ? 3 : 0;
              for (a3 = 0; a3 < e5.length; a3 += 1) i4 = e5.charCodeAt(a3), o3 = (s3 = a3 + l3) >>> 2, c3.length <= o3 && c3.push(0), c3[o3] |= i4 << 8 * (u3 + s3 % 4 * r4);
              return { value: c3, binLen: 8 * e5.length + n5 };
            })(e4, t4, n4, i3);
          };
        case `ARRAYBUFFER`:
          return function(e4, n4, r4) {
            return (function(e5, n5, r5, i4) {
              return t3(new Uint8Array(e5), n5, r5, i4);
            })(e4, n4, r4, i3);
          };
        case `UINT8ARRAY`:
          return function(e4, n4, r4) {
            return t3(e4, n4, r4, i3);
          };
        default:
          throw Error(`format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY`);
      }
    }
    function r2(t4, n3, r3, i3) {
      switch (t4) {
        case `HEX`:
          return function(e4) {
            return (function(e5, t5, n4, r4) {
              var i4, a3, o3 = ``, s3 = t5 / 8, c3 = n4 === -1 ? 3 : 0;
              for (i4 = 0; i4 < s3; i4 += 1) a3 = e5[i4 >>> 2] >>> 8 * (c3 + i4 % 4 * n4), o3 += `0123456789abcdef`.charAt(a3 >>> 4 & 15) + `0123456789abcdef`.charAt(15 & a3);
              return r4.outputUpper ? o3.toUpperCase() : o3;
            })(e4, n3, r3, i3);
          };
        case `B64`:
          return function(t5) {
            return (function(t6, n4, r4, i4) {
              var a3, o3, s3, c3, l3, u3 = ``, d3 = n4 / 8, f3 = r4 === -1 ? 3 : 0;
              for (a3 = 0; a3 < d3; a3 += 3) for (c3 = a3 + 1 < d3 ? t6[a3 + 1 >>> 2] : 0, l3 = a3 + 2 < d3 ? t6[a3 + 2 >>> 2] : 0, s3 = (t6[a3 >>> 2] >>> 8 * (f3 + a3 % 4 * r4) & 255) << 16 | (c3 >>> 8 * (f3 + r4 * ((a3 + 1) % 4)) & 255) << 8 | l3 >>> 8 * (f3 + r4 * ((a3 + 2) % 4)) & 255, o3 = 0; o3 < 4; o3 += 1) u3 += 8 * a3 + 6 * o3 <= n4 ? e3.charAt(s3 >>> 6 * (3 - o3) & 63) : i4.b64Pad;
              return u3;
            })(t5, n3, r3, i3);
          };
        case `BYTES`:
          return function(e4) {
            return (function(e5, t5, n4) {
              var r4, i4, a3 = ``, o3 = t5 / 8, s3 = n4 === -1 ? 3 : 0;
              for (r4 = 0; r4 < o3; r4 += 1) i4 = e5[r4 >>> 2] >>> 8 * (s3 + r4 % 4 * n4) & 255, a3 += String.fromCharCode(i4);
              return a3;
            })(e4, n3, r3);
          };
        case `ARRAYBUFFER`:
          return function(e4) {
            return (function(e5, t5, n4) {
              var r4, i4 = t5 / 8, a3 = new ArrayBuffer(i4), o3 = new Uint8Array(a3), s3 = n4 === -1 ? 3 : 0;
              for (r4 = 0; r4 < i4; r4 += 1) o3[r4] = e5[r4 >>> 2] >>> 8 * (s3 + r4 % 4 * n4) & 255;
              return a3;
            })(e4, n3, r3);
          };
        case `UINT8ARRAY`:
          return function(e4) {
            return (function(e5, t5, n4) {
              var r4, i4 = t5 / 8, a3 = n4 === -1 ? 3 : 0, o3 = new Uint8Array(i4);
              for (r4 = 0; r4 < i4; r4 += 1) o3[r4] = e5[r4 >>> 2] >>> 8 * (a3 + r4 % 4 * n4) & 255;
              return o3;
            })(e4, n3, r3);
          };
        default:
          throw Error(`format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY`);
      }
    }
    var i2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], a2 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], o2 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], s2 = `Chosen SHA variant is not supported`;
    function c2(e4, t4) {
      var n3, r3, i3 = e4.binLen >>> 3, a3 = t4.binLen >>> 3, o3 = i3 << 3, s3 = 4 - i3 << 3;
      if (i3 % 4 != 0) {
        for (n3 = 0; n3 < a3; n3 += 4) r3 = i3 + n3 >>> 2, e4.value[r3] |= t4.value[n3 >>> 2] << o3, e4.value.push(0), e4.value[r3 + 1] |= t4.value[n3 >>> 2] >>> s3;
        return (e4.value.length << 2) - 4 >= a3 + i3 && e4.value.pop(), { value: e4.value, binLen: e4.binLen + t4.binLen };
      }
      return { value: e4.value.concat(t4.value), binLen: e4.binLen + t4.binLen };
    }
    function l2(e4) {
      var t4 = { outputUpper: false, b64Pad: `=`, outputLen: -1 }, n3 = e4 || {}, r3 = `Output length must be a multiple of 8`;
      if (t4.outputUpper = n3.outputUpper || false, n3.b64Pad && (t4.b64Pad = n3.b64Pad), n3.outputLen) {
        if (n3.outputLen % 8 != 0) throw Error(r3);
        t4.outputLen = n3.outputLen;
      } else if (n3.shakeLen) {
        if (n3.shakeLen % 8 != 0) throw Error(r3);
        t4.outputLen = n3.shakeLen;
      }
      if (typeof t4.outputUpper != `boolean`) throw Error(`Invalid outputUpper formatting option`);
      if (typeof t4.b64Pad != `string`) throw Error(`Invalid b64Pad formatting option`);
      return t4;
    }
    function u2(e4, t4, r3, i3) {
      var a3 = e4 + ` must include a value and format`;
      if (!t4) {
        if (!i3) throw Error(a3);
        return i3;
      }
      if (t4.value === void 0 || !t4.format) throw Error(a3);
      return n2(t4.format, t4.encoding || `UTF8`, r3)(t4.value);
    }
    var d2 = (function() {
      function e4(e5, t4, n3) {
        var r3 = n3 || {};
        if (this.t = t4, this.i = r3.encoding || `UTF8`, this.numRounds = r3.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw Error(`numRounds must a integer >= 1`);
        this.o = e5, this.u = [], this.s = 0, this.h = false, this.v = 0, this.A = false, this.l = [], this.H = [];
      }
      return e4.prototype.update = function(e5) {
        var t4, n3 = 0, r3 = this.S >>> 5, i3 = this.p(e5, this.u, this.s), a3 = i3.binLen, o3 = i3.value, s3 = a3 >>> 5;
        for (t4 = 0; t4 < s3; t4 += r3) n3 + this.S <= a3 && (this.m = this.R(o3.slice(t4, t4 + r3), this.m), n3 += this.S);
        this.v += n3, this.u = o3.slice(n3 >>> 5), this.s = a3 % this.S, this.h = true;
      }, e4.prototype.getHash = function(e5, t4) {
        var n3, i3, a3 = this.U, o3 = l2(t4);
        if (this.T) {
          if (o3.outputLen === -1) throw Error(`Output length must be specified in options`);
          a3 = o3.outputLen;
        }
        var s3 = r2(e5, a3, this.C, o3);
        if (this.A && this.F) return s3(this.F(o3));
        for (i3 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), a3), n3 = 1; n3 < this.numRounds; n3 += 1) this.T && a3 % 32 != 0 && (i3[i3.length - 1] &= 16777215 >>> 24 - a3 % 32), i3 = this.K(i3, a3, 0, this.L(this.o), a3);
        return s3(i3);
      }, e4.prototype.setHMACKey = function(e5, t4, r3) {
        if (!this.g) throw Error(`Variant does not support HMAC`);
        if (this.h) throw Error(`Cannot set MAC key after calling update`);
        var i3 = n2(t4, (r3 || {}).encoding || `UTF8`, this.C);
        this.k(i3(e5));
      }, e4.prototype.k = function(e5) {
        var t4, n3 = this.S >>> 3, r3 = n3 / 4 - 1;
        if (this.numRounds !== 1) throw Error(`Cannot set numRounds with MAC`);
        if (this.A) throw Error(`MAC key already set`);
        for (n3 < e5.binLen / 8 && (e5.value = this.K(e5.value, e5.binLen, 0, this.L(this.o), this.U)); e5.value.length <= r3; ) e5.value.push(0);
        for (t4 = 0; t4 <= r3; t4 += 1) this.l[t4] = 909522486 ^ e5.value[t4], this.H[t4] = 1549556828 ^ e5.value[t4];
        this.m = this.R(this.l, this.m), this.v = this.S, this.A = true;
      }, e4.prototype.getHMAC = function(e5, t4) {
        var n3 = l2(t4);
        return r2(e5, this.U, this.C, n3)(this.Y());
      }, e4.prototype.Y = function() {
        var e5;
        if (!this.A) throw Error(`Cannot call getHMAC without first setting MAC key`);
        var t4 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), this.U);
        return e5 = this.R(this.H, this.L(this.o)), e5 = this.K(t4, this.U, this.S, e5, this.U);
      }, e4;
    })(), f2 = function(e4, t4) {
      return (f2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e5, t5) {
        e5.__proto__ = t5;
      } || function(e5, t5) {
        for (var n3 in t5) Object.prototype.hasOwnProperty.call(t5, n3) && (e5[n3] = t5[n3]);
      })(e4, t4);
    };
    function p2(e4, t4) {
      function n3() {
        this.constructor = e4;
      }
      f2(e4, t4), e4.prototype = t4 === null ? Object.create(t4) : (n3.prototype = t4.prototype, new n3());
    }
    function m2(e4, t4) {
      return e4 << t4 | e4 >>> 32 - t4;
    }
    function h2(e4, t4) {
      return e4 >>> t4 | e4 << 32 - t4;
    }
    function g2(e4, t4) {
      return e4 >>> t4;
    }
    function _2(e4, t4, n3) {
      return e4 ^ t4 ^ n3;
    }
    function v2(e4, t4, n3) {
      return e4 & t4 ^ ~e4 & n3;
    }
    function y2(e4, t4, n3) {
      return e4 & t4 ^ e4 & n3 ^ t4 & n3;
    }
    function b2(e4) {
      return h2(e4, 2) ^ h2(e4, 13) ^ h2(e4, 22);
    }
    function x2(e4, t4) {
      var n3 = (65535 & e4) + (65535 & t4);
      return (65535 & (e4 >>> 16) + (t4 >>> 16) + (n3 >>> 16)) << 16 | 65535 & n3;
    }
    function S2(e4, t4, n3, r3) {
      var i3 = (65535 & e4) + (65535 & t4) + (65535 & n3) + (65535 & r3);
      return (65535 & (e4 >>> 16) + (t4 >>> 16) + (n3 >>> 16) + (r3 >>> 16) + (i3 >>> 16)) << 16 | 65535 & i3;
    }
    function C2(e4, t4, n3, r3, i3) {
      var a3 = (65535 & e4) + (65535 & t4) + (65535 & n3) + (65535 & r3) + (65535 & i3);
      return (65535 & (e4 >>> 16) + (t4 >>> 16) + (n3 >>> 16) + (r3 >>> 16) + (i3 >>> 16) + (a3 >>> 16)) << 16 | 65535 & a3;
    }
    function w2(e4) {
      return h2(e4, 7) ^ h2(e4, 18) ^ g2(e4, 3);
    }
    function T2(e4) {
      return h2(e4, 6) ^ h2(e4, 11) ^ h2(e4, 25);
    }
    function E2(e4) {
      return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    }
    function D2(e4, t4) {
      var n3, r3, i3, a3, o3, s3, c3, l3 = [];
      for (n3 = t4[0], r3 = t4[1], i3 = t4[2], a3 = t4[3], o3 = t4[4], c3 = 0; c3 < 80; c3 += 1) l3[c3] = c3 < 16 ? e4[c3] : m2(l3[c3 - 3] ^ l3[c3 - 8] ^ l3[c3 - 14] ^ l3[c3 - 16], 1), s3 = c3 < 20 ? C2(m2(n3, 5), v2(r3, i3, a3), o3, 1518500249, l3[c3]) : c3 < 40 ? C2(m2(n3, 5), _2(r3, i3, a3), o3, 1859775393, l3[c3]) : c3 < 60 ? C2(m2(n3, 5), y2(r3, i3, a3), o3, 2400959708, l3[c3]) : C2(m2(n3, 5), _2(r3, i3, a3), o3, 3395469782, l3[c3]), o3 = a3, a3 = i3, i3 = m2(r3, 30), r3 = n3, n3 = s3;
      return t4[0] = x2(n3, t4[0]), t4[1] = x2(r3, t4[1]), t4[2] = x2(i3, t4[2]), t4[3] = x2(a3, t4[3]), t4[4] = x2(o3, t4[4]), t4;
    }
    function O2(e4, t4, n3, r3) {
      for (var i3, a3 = 15 + (t4 + 65 >>> 9 << 4), o3 = t4 + n3; e4.length <= a3; ) e4.push(0);
      for (e4[t4 >>> 5] |= 128 << 24 - t4 % 32, e4[a3] = 4294967295 & o3, e4[a3 - 1] = o3 / 4294967296 | 0, i3 = 0; i3 < e4.length; i3 += 16) r3 = D2(e4.slice(i3, i3 + 16), r3);
      return r3;
    }
    var k2 = (function(e4) {
      function t4(t5, r3, i3) {
        var a3 = this;
        if (t5 !== `SHA-1`) throw Error(s2);
        var o3 = i3 || {};
        return (a3 = e4.call(this, t5, r3, i3) || this).g = true, a3.F = a3.Y, a3.C = -1, a3.p = n2(a3.t, a3.i, a3.C), a3.R = D2, a3.B = function(e5) {
          return e5.slice();
        }, a3.L = E2, a3.K = O2, a3.m = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], a3.S = 512, a3.U = 160, a3.T = false, o3.hmacKey && a3.k(u2(`hmacKey`, o3.hmacKey, a3.C)), a3;
      }
      return p2(t4, e4), t4;
    })(d2);
    function A2(e4) {
      return e4 == `SHA-224` ? a2.slice() : o2.slice();
    }
    function j2(e4, t4) {
      var n3, r3, a3, o3, s3, c3, l3, u3, d3, f3, p3, m3, _3 = [];
      for (n3 = t4[0], r3 = t4[1], a3 = t4[2], o3 = t4[3], s3 = t4[4], c3 = t4[5], l3 = t4[6], u3 = t4[7], p3 = 0; p3 < 64; p3 += 1) _3[p3] = p3 < 16 ? e4[p3] : S2(h2(m3 = _3[p3 - 2], 17) ^ h2(m3, 19) ^ g2(m3, 10), _3[p3 - 7], w2(_3[p3 - 15]), _3[p3 - 16]), d3 = C2(u3, T2(s3), v2(s3, c3, l3), i2[p3], _3[p3]), f3 = x2(b2(n3), y2(n3, r3, a3)), u3 = l3, l3 = c3, c3 = s3, s3 = x2(o3, d3), o3 = a3, a3 = r3, r3 = n3, n3 = x2(d3, f3);
      return t4[0] = x2(n3, t4[0]), t4[1] = x2(r3, t4[1]), t4[2] = x2(a3, t4[2]), t4[3] = x2(o3, t4[3]), t4[4] = x2(s3, t4[4]), t4[5] = x2(c3, t4[5]), t4[6] = x2(l3, t4[6]), t4[7] = x2(u3, t4[7]), t4;
    }
    var M2 = (function(e4) {
      function t4(t5, r3, i3) {
        var a3 = this;
        if (t5 !== `SHA-224` && t5 !== `SHA-256`) throw Error(s2);
        var o3 = i3 || {};
        return (a3 = e4.call(this, t5, r3, i3) || this).F = a3.Y, a3.g = true, a3.C = -1, a3.p = n2(a3.t, a3.i, a3.C), a3.R = j2, a3.B = function(e5) {
          return e5.slice();
        }, a3.L = A2, a3.K = function(e5, n3, r4, i4) {
          return (function(e6, t6, n4, r5, i5) {
            for (var a4, o4 = 15 + (t6 + 65 >>> 9 << 4), s3 = t6 + n4; e6.length <= o4; ) e6.push(0);
            for (e6[t6 >>> 5] |= 128 << 24 - t6 % 32, e6[o4] = 4294967295 & s3, e6[o4 - 1] = s3 / 4294967296 | 0, a4 = 0; a4 < e6.length; a4 += 16) r5 = j2(e6.slice(a4, a4 + 16), r5);
            return i5 === `SHA-224` ? [r5[0], r5[1], r5[2], r5[3], r5[4], r5[5], r5[6]] : r5;
          })(e5, n3, r4, i4, t5);
        }, a3.m = A2(t5), a3.S = 512, a3.U = t5 === `SHA-224` ? 224 : 256, a3.T = false, o3.hmacKey && a3.k(u2(`hmacKey`, o3.hmacKey, a3.C)), a3;
      }
      return p2(t4, e4), t4;
    })(d2), N2 = function(e4, t4) {
      this.N = e4, this.I = t4;
    };
    function P2(e4, t4) {
      var n3;
      return t4 > 32 ? (n3 = 64 - t4, new N2(e4.I << t4 | e4.N >>> n3, e4.N << t4 | e4.I >>> n3)) : t4 === 0 ? e4 : (n3 = 32 - t4, new N2(e4.N << t4 | e4.I >>> n3, e4.I << t4 | e4.N >>> n3));
    }
    function F2(e4, t4) {
      var n3;
      return t4 < 32 ? (n3 = 32 - t4, new N2(e4.N >>> t4 | e4.I << n3, e4.I >>> t4 | e4.N << n3)) : (n3 = 64 - t4, new N2(e4.I >>> t4 | e4.N << n3, e4.N >>> t4 | e4.I << n3));
    }
    function I2(e4, t4) {
      return new N2(e4.N >>> t4, e4.I >>> t4 | e4.N << 32 - t4);
    }
    function L2(e4, t4, n3) {
      return new N2(e4.N & t4.N ^ ~e4.N & n3.N, e4.I & t4.I ^ ~e4.I & n3.I);
    }
    function R2(e4, t4, n3) {
      return new N2(e4.N & t4.N ^ e4.N & n3.N ^ t4.N & n3.N, e4.I & t4.I ^ e4.I & n3.I ^ t4.I & n3.I);
    }
    function z2(e4) {
      var t4 = F2(e4, 28), n3 = F2(e4, 34), r3 = F2(e4, 39);
      return new N2(t4.N ^ n3.N ^ r3.N, t4.I ^ n3.I ^ r3.I);
    }
    function B2(e4, t4) {
      var n3 = (65535 & e4.I) + (65535 & t4.I), r3, i3 = (65535 & (r3 = (e4.I >>> 16) + (t4.I >>> 16) + (n3 >>> 16))) << 16 | 65535 & n3;
      return n3 = (65535 & e4.N) + (65535 & t4.N) + (r3 >>> 16), r3 = (e4.N >>> 16) + (t4.N >>> 16) + (n3 >>> 16), new N2((65535 & r3) << 16 | 65535 & n3, i3);
    }
    function V2(e4, t4, n3, r3) {
      var i3 = (65535 & e4.I) + (65535 & t4.I) + (65535 & n3.I) + (65535 & r3.I), a3, o3 = (65535 & (a3 = (e4.I >>> 16) + (t4.I >>> 16) + (n3.I >>> 16) + (r3.I >>> 16) + (i3 >>> 16))) << 16 | 65535 & i3;
      return i3 = (65535 & e4.N) + (65535 & t4.N) + (65535 & n3.N) + (65535 & r3.N) + (a3 >>> 16), a3 = (e4.N >>> 16) + (t4.N >>> 16) + (n3.N >>> 16) + (r3.N >>> 16) + (i3 >>> 16), new N2((65535 & a3) << 16 | 65535 & i3, o3);
    }
    function H2(e4, t4, n3, r3, i3) {
      var a3 = (65535 & e4.I) + (65535 & t4.I) + (65535 & n3.I) + (65535 & r3.I) + (65535 & i3.I), o3, s3 = (65535 & (o3 = (e4.I >>> 16) + (t4.I >>> 16) + (n3.I >>> 16) + (r3.I >>> 16) + (i3.I >>> 16) + (a3 >>> 16))) << 16 | 65535 & a3;
      return a3 = (65535 & e4.N) + (65535 & t4.N) + (65535 & n3.N) + (65535 & r3.N) + (65535 & i3.N) + (o3 >>> 16), o3 = (e4.N >>> 16) + (t4.N >>> 16) + (n3.N >>> 16) + (r3.N >>> 16) + (i3.N >>> 16) + (a3 >>> 16), new N2((65535 & o3) << 16 | 65535 & a3, s3);
    }
    function U2(e4, t4) {
      return new N2(e4.N ^ t4.N, e4.I ^ t4.I);
    }
    function W2(e4) {
      var t4 = F2(e4, 1), n3 = F2(e4, 8), r3 = I2(e4, 7);
      return new N2(t4.N ^ n3.N ^ r3.N, t4.I ^ n3.I ^ r3.I);
    }
    function G2(e4) {
      var t4 = F2(e4, 14), n3 = F2(e4, 18), r3 = F2(e4, 41);
      return new N2(t4.N ^ n3.N ^ r3.N, t4.I ^ n3.I ^ r3.I);
    }
    var K2 = [new N2(i2[0], 3609767458), new N2(i2[1], 602891725), new N2(i2[2], 3964484399), new N2(i2[3], 2173295548), new N2(i2[4], 4081628472), new N2(i2[5], 3053834265), new N2(i2[6], 2937671579), new N2(i2[7], 3664609560), new N2(i2[8], 2734883394), new N2(i2[9], 1164996542), new N2(i2[10], 1323610764), new N2(i2[11], 3590304994), new N2(i2[12], 4068182383), new N2(i2[13], 991336113), new N2(i2[14], 633803317), new N2(i2[15], 3479774868), new N2(i2[16], 2666613458), new N2(i2[17], 944711139), new N2(i2[18], 2341262773), new N2(i2[19], 2007800933), new N2(i2[20], 1495990901), new N2(i2[21], 1856431235), new N2(i2[22], 3175218132), new N2(i2[23], 2198950837), new N2(i2[24], 3999719339), new N2(i2[25], 766784016), new N2(i2[26], 2566594879), new N2(i2[27], 3203337956), new N2(i2[28], 1034457026), new N2(i2[29], 2466948901), new N2(i2[30], 3758326383), new N2(i2[31], 168717936), new N2(i2[32], 1188179964), new N2(i2[33], 1546045734), new N2(i2[34], 1522805485), new N2(i2[35], 2643833823), new N2(i2[36], 2343527390), new N2(i2[37], 1014477480), new N2(i2[38], 1206759142), new N2(i2[39], 344077627), new N2(i2[40], 1290863460), new N2(i2[41], 3158454273), new N2(i2[42], 3505952657), new N2(i2[43], 106217008), new N2(i2[44], 3606008344), new N2(i2[45], 1432725776), new N2(i2[46], 1467031594), new N2(i2[47], 851169720), new N2(i2[48], 3100823752), new N2(i2[49], 1363258195), new N2(i2[50], 3750685593), new N2(i2[51], 3785050280), new N2(i2[52], 3318307427), new N2(i2[53], 3812723403), new N2(i2[54], 2003034995), new N2(i2[55], 3602036899), new N2(i2[56], 1575990012), new N2(i2[57], 1125592928), new N2(i2[58], 2716904306), new N2(i2[59], 442776044), new N2(i2[60], 593698344), new N2(i2[61], 3733110249), new N2(i2[62], 2999351573), new N2(i2[63], 3815920427), new N2(3391569614, 3928383900), new N2(3515267271, 566280711), new N2(3940187606, 3454069534), new N2(4118630271, 4000239992), new N2(116418474, 1914138554), new N2(174292421, 2731055270), new N2(289380356, 3203993006), new N2(460393269, 320620315), new N2(685471733, 587496836), new N2(852142971, 1086792851), new N2(1017036298, 365543100), new N2(1126000580, 2618297676), new N2(1288033470, 3409855158), new N2(1501505948, 4234509866), new N2(1607167915, 987167468), new N2(1816402316, 1246189591)];
    function q2(e4) {
      return e4 === `SHA-384` ? [new N2(3418070365, a2[0]), new N2(1654270250, a2[1]), new N2(2438529370, a2[2]), new N2(355462360, a2[3]), new N2(1731405415, a2[4]), new N2(41048885895, a2[5]), new N2(3675008525, a2[6]), new N2(1203062813, a2[7])] : [new N2(o2[0], 4089235720), new N2(o2[1], 2227873595), new N2(o2[2], 4271175723), new N2(o2[3], 1595750129), new N2(o2[4], 2917565137), new N2(o2[5], 725511199), new N2(o2[6], 4215389547), new N2(o2[7], 327033209)];
    }
    function J2(e4, t4) {
      var n3, r3, i3, a3, o3, s3, c3, l3, u3, d3, f3, p3, m3, h3, g3, _3, v3 = [];
      for (n3 = t4[0], r3 = t4[1], i3 = t4[2], a3 = t4[3], o3 = t4[4], s3 = t4[5], c3 = t4[6], l3 = t4[7], f3 = 0; f3 < 80; f3 += 1) f3 < 16 ? (p3 = 2 * f3, v3[f3] = new N2(e4[p3], e4[p3 + 1])) : v3[f3] = V2((m3 = v3[f3 - 2], h3 = void 0, g3 = void 0, _3 = void 0, h3 = F2(m3, 19), g3 = F2(m3, 61), _3 = I2(m3, 6), new N2(h3.N ^ g3.N ^ _3.N, h3.I ^ g3.I ^ _3.I)), v3[f3 - 7], W2(v3[f3 - 15]), v3[f3 - 16]), u3 = H2(l3, G2(o3), L2(o3, s3, c3), K2[f3], v3[f3]), d3 = B2(z2(n3), R2(n3, r3, i3)), l3 = c3, c3 = s3, s3 = o3, o3 = B2(a3, u3), a3 = i3, i3 = r3, r3 = n3, n3 = B2(u3, d3);
      return t4[0] = B2(n3, t4[0]), t4[1] = B2(r3, t4[1]), t4[2] = B2(i3, t4[2]), t4[3] = B2(a3, t4[3]), t4[4] = B2(o3, t4[4]), t4[5] = B2(s3, t4[5]), t4[6] = B2(c3, t4[6]), t4[7] = B2(l3, t4[7]), t4;
    }
    var Y2 = (function(e4) {
      function t4(t5, r3, i3) {
        var a3 = this;
        if (t5 !== `SHA-384` && t5 !== `SHA-512`) throw Error(s2);
        var o3 = i3 || {};
        return (a3 = e4.call(this, t5, r3, i3) || this).F = a3.Y, a3.g = true, a3.C = -1, a3.p = n2(a3.t, a3.i, a3.C), a3.R = J2, a3.B = function(e5) {
          return e5.slice();
        }, a3.L = q2, a3.K = function(e5, n3, r4, i4) {
          return (function(e6, t6, n4, r5, i5) {
            for (var a4, o4 = 31 + (t6 + 129 >>> 10 << 5), s3 = t6 + n4; e6.length <= o4; ) e6.push(0);
            for (e6[t6 >>> 5] |= 128 << 24 - t6 % 32, e6[o4] = 4294967295 & s3, e6[o4 - 1] = s3 / 4294967296 | 0, a4 = 0; a4 < e6.length; a4 += 32) r5 = J2(e6.slice(a4, a4 + 32), r5);
            return i5 === `SHA-384` ? [(r5 = r5)[0].N, r5[0].I, r5[1].N, r5[1].I, r5[2].N, r5[2].I, r5[3].N, r5[3].I, r5[4].N, r5[4].I, r5[5].N, r5[5].I] : [r5[0].N, r5[0].I, r5[1].N, r5[1].I, r5[2].N, r5[2].I, r5[3].N, r5[3].I, r5[4].N, r5[4].I, r5[5].N, r5[5].I, r5[6].N, r5[6].I, r5[7].N, r5[7].I];
          })(e5, n3, r4, i4, t5);
        }, a3.m = q2(t5), a3.S = 1024, a3.U = t5 === `SHA-384` ? 384 : 512, a3.T = false, o3.hmacKey && a3.k(u2(`hmacKey`, o3.hmacKey, a3.C)), a3;
      }
      return p2(t4, e4), t4;
    })(d2), X2 = [new N2(0, 1), new N2(0, 32898), new N2(2147483648, 32906), new N2(2147483648, 2147516416), new N2(0, 32907), new N2(0, 2147483649), new N2(2147483648, 2147516545), new N2(2147483648, 32777), new N2(0, 138), new N2(0, 136), new N2(0, 2147516425), new N2(0, 2147483658), new N2(0, 2147516555), new N2(2147483648, 139), new N2(2147483648, 32905), new N2(2147483648, 32771), new N2(2147483648, 32770), new N2(2147483648, 128), new N2(0, 32778), new N2(2147483648, 2147483658), new N2(2147483648, 2147516545), new N2(2147483648, 32896), new N2(0, 2147483649), new N2(2147483648, 2147516424)], ee2 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
    function te2(e4) {
      var t4, n3 = [];
      for (t4 = 0; t4 < 5; t4 += 1) n3[t4] = [new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0)];
      return n3;
    }
    function ne2(e4) {
      var t4, n3 = [];
      for (t4 = 0; t4 < 5; t4 += 1) n3[t4] = e4[t4].slice();
      return n3;
    }
    function re2(e4, t4) {
      var n3, r3, i3, a3, o3, s3, c3, l3, u3, d3 = [], f3 = [];
      if (e4 !== null) for (r3 = 0; r3 < e4.length; r3 += 2) t4[(r3 >>> 1) % 5][(r3 >>> 1) / 5 | 0] = U2(t4[(r3 >>> 1) % 5][(r3 >>> 1) / 5 | 0], new N2(e4[r3 + 1], e4[r3]));
      for (n3 = 0; n3 < 24; n3 += 1) {
        for (a3 = te2(), r3 = 0; r3 < 5; r3 += 1) d3[r3] = (o3 = t4[r3][0], s3 = t4[r3][1], c3 = t4[r3][2], l3 = t4[r3][3], u3 = t4[r3][4], new N2(o3.N ^ s3.N ^ c3.N ^ l3.N ^ u3.N, o3.I ^ s3.I ^ c3.I ^ l3.I ^ u3.I));
        for (r3 = 0; r3 < 5; r3 += 1) f3[r3] = U2(d3[(r3 + 4) % 5], P2(d3[(r3 + 1) % 5], 1));
        for (r3 = 0; r3 < 5; r3 += 1) for (i3 = 0; i3 < 5; i3 += 1) t4[r3][i3] = U2(t4[r3][i3], f3[r3]);
        for (r3 = 0; r3 < 5; r3 += 1) for (i3 = 0; i3 < 5; i3 += 1) a3[i3][(2 * r3 + 3 * i3) % 5] = P2(t4[r3][i3], ee2[r3][i3]);
        for (r3 = 0; r3 < 5; r3 += 1) for (i3 = 0; i3 < 5; i3 += 1) t4[r3][i3] = U2(a3[r3][i3], new N2(~a3[(r3 + 1) % 5][i3].N & a3[(r3 + 2) % 5][i3].N, ~a3[(r3 + 1) % 5][i3].I & a3[(r3 + 2) % 5][i3].I));
        t4[0][0] = U2(t4[0][0], X2[n3]);
      }
      return t4;
    }
    function ie2(e4) {
      var t4, n3, r3 = 0, i3 = [0, 0], a3 = [4294967295 & e4, e4 / 4294967296 & 2097151];
      for (t4 = 6; t4 >= 0; t4--) (n3 = a3[t4 >> 2] >>> 8 * t4 & 255) == 0 && r3 === 0 || (i3[r3 + 1 >> 2] |= n3 << 8 * (r3 + 1), r3 += 1);
      return r3 = r3 === 0 ? 1 : r3, i3[0] |= r3, { value: r3 + 1 > 4 ? i3 : [i3[0]], binLen: 8 + 8 * r3 };
    }
    function ae2(e4) {
      return c2(ie2(e4.binLen), e4);
    }
    function oe2(e4, t4) {
      var n3, r3 = ie2(t4), i3 = t4 >>> 2, a3 = (i3 - (r3 = c2(r3, e4)).value.length % i3) % i3;
      for (n3 = 0; n3 < a3; n3++) r3.value.push(0);
      return r3.value;
    }
    var se2 = (function(e4) {
      function t4(t5, r3, i3) {
        var a3 = this, o3 = 6, c3 = 0, l3 = i3 || {};
        if ((a3 = e4.call(this, t5, r3, i3) || this).numRounds !== 1) {
          if (l3.kmacKey || l3.hmacKey) throw Error(`Cannot set numRounds with MAC`);
          if (a3.o === `CSHAKE128` || a3.o === `CSHAKE256`) throw Error(`Cannot set numRounds for CSHAKE variants`);
        }
        switch (a3.C = 1, a3.p = n2(a3.t, a3.i, a3.C), a3.R = re2, a3.B = ne2, a3.L = te2, a3.m = te2(), a3.T = false, t5) {
          case `SHA3-224`:
            a3.S = c3 = 1152, a3.U = 224, a3.g = true, a3.F = a3.Y;
            break;
          case `SHA3-256`:
            a3.S = c3 = 1088, a3.U = 256, a3.g = true, a3.F = a3.Y;
            break;
          case `SHA3-384`:
            a3.S = c3 = 832, a3.U = 384, a3.g = true, a3.F = a3.Y;
            break;
          case `SHA3-512`:
            a3.S = c3 = 576, a3.U = 512, a3.g = true, a3.F = a3.Y;
            break;
          case `SHAKE128`:
            o3 = 31, a3.S = c3 = 1344, a3.U = -1, a3.T = true, a3.g = false, a3.F = null;
            break;
          case `SHAKE256`:
            o3 = 31, a3.S = c3 = 1088, a3.U = -1, a3.T = true, a3.g = false, a3.F = null;
            break;
          case `KMAC128`:
            o3 = 4, a3.S = c3 = 1344, a3.M(i3), a3.U = -1, a3.T = true, a3.g = false, a3.F = a3.X;
            break;
          case `KMAC256`:
            o3 = 4, a3.S = c3 = 1088, a3.M(i3), a3.U = -1, a3.T = true, a3.g = false, a3.F = a3.X;
            break;
          case `CSHAKE128`:
            a3.S = c3 = 1344, o3 = a3.O(i3), a3.U = -1, a3.T = true, a3.g = false, a3.F = null;
            break;
          case `CSHAKE256`:
            a3.S = c3 = 1088, o3 = a3.O(i3), a3.U = -1, a3.T = true, a3.g = false, a3.F = null;
            break;
          default:
            throw Error(s2);
        }
        return a3.K = function(e5, t6, n3, r4, i4) {
          return (function(e6, t7, n4, r5, i5, a4, o4) {
            var s3, c4, l4 = 0, u3 = [], d3 = i5 >>> 5, f3 = t7 >>> 5;
            for (s3 = 0; s3 < f3 && t7 >= i5; s3 += d3) r5 = re2(e6.slice(s3, s3 + d3), r5), t7 -= i5;
            for (e6 = e6.slice(s3), t7 %= i5; e6.length < d3; ) e6.push(0);
            for (e6[(s3 = t7 >>> 3) >> 2] ^= a4 << s3 % 4 * 8, e6[d3 - 1] ^= 2147483648, r5 = re2(e6, r5); 32 * u3.length < o4 && (c4 = r5[l4 % 5][l4 / 5 | 0], u3.push(c4.I), !(32 * u3.length >= o4)); ) u3.push(c4.N), 64 * (l4 += 1) % i5 == 0 && (re2(null, r5), l4 = 0);
            return u3;
          })(e5, t6, 0, r4, c3, o3, i4);
        }, l3.hmacKey && a3.k(u2(`hmacKey`, l3.hmacKey, a3.C)), a3;
      }
      return p2(t4, e4), t4.prototype.O = function(e5, t5) {
        var n3 = (function(e6) {
          var t6 = e6 || {};
          return { funcName: u2(`funcName`, t6.funcName, 1, { value: [], binLen: 0 }), customization: u2(`Customization`, t6.customization, 1, { value: [], binLen: 0 }) };
        })(e5 || {});
        t5 && (n3.funcName = t5);
        var r3 = c2(ae2(n3.funcName), ae2(n3.customization));
        if (n3.customization.binLen !== 0 || n3.funcName.binLen !== 0) {
          for (var i3 = oe2(r3, this.S >>> 3), a3 = 0; a3 < i3.length; a3 += this.S >>> 5) this.m = this.R(i3.slice(a3, a3 + (this.S >>> 5)), this.m), this.v += this.S;
          return 4;
        }
        return 31;
      }, t4.prototype.M = function(e5) {
        var t5 = (function(e6) {
          var t6 = e6 || {};
          return { kmacKey: u2(`kmacKey`, t6.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: u2(`Customization`, t6.customization, 1, { value: [], binLen: 0 }) };
        })(e5 || {});
        this.O(e5, t5.funcName);
        for (var n3 = oe2(ae2(t5.kmacKey), this.S >>> 3), r3 = 0; r3 < n3.length; r3 += this.S >>> 5) this.m = this.R(n3.slice(r3, r3 + (this.S >>> 5)), this.m), this.v += this.S;
        this.A = true;
      }, t4.prototype.X = function(e5) {
        var t5 = c2({ value: this.u.slice(), binLen: this.s }, (function(e6) {
          var t6, n3, r3 = 0, i3 = [0, 0], a3 = [4294967295 & e6, e6 / 4294967296 & 2097151];
          for (t6 = 6; t6 >= 0; t6--) (n3 = a3[t6 >> 2] >>> 8 * t6 & 255) == 0 && r3 === 0 || (i3[r3 >> 2] |= n3 << 8 * r3, r3 += 1);
          return i3[(r3 = r3 === 0 ? 1 : r3) >> 2] |= r3 << 8 * r3, { value: r3 + 1 > 4 ? i3 : [i3[0]], binLen: 8 + 8 * r3 };
        })(e5.outputLen));
        return this.K(t5.value, t5.binLen, this.v, this.B(this.m), e5.outputLen);
      }, t4;
    })(d2);
    return (function() {
      function e4(e5, t4, n3) {
        if (e5 == `SHA-1`) this.j = new k2(e5, t4, n3);
        else if (e5 == `SHA-224` || e5 == `SHA-256`) this.j = new M2(e5, t4, n3);
        else if (e5 == `SHA-384` || e5 == `SHA-512`) this.j = new Y2(e5, t4, n3);
        else {
          if (e5 != `SHA3-224` && e5 != `SHA3-256` && e5 != `SHA3-384` && e5 != `SHA3-512` && e5 != `SHAKE128` && e5 != `SHAKE256` && e5 != `CSHAKE128` && e5 != `CSHAKE256` && e5 != `KMAC128` && e5 != `KMAC256`) throw Error(s2);
          this.j = new se2(e5, t4, n3);
        }
      }
      return e4.prototype.update = function(e5) {
        this.j.update(e5);
      }, e4.prototype.getHash = function(e5, t4) {
        return this.j.getHash(e5, t4);
      }, e4.prototype.setHMACKey = function(e5, t4, n3) {
        this.j.setHMACKey(e5, t4, n3);
      }, e4.prototype.getHMAC = function(e5, t4) {
        return this.j.getHMAC(e5, t4);
      }, e4;
    })();
  }));
})), m = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getSecureRandomWords = e2.getSecureRandomBytes = void 0;
  function t2(e3) {
    return Buffer.from(window.crypto.getRandomValues(new Uint8Array(e3)));
  }
  e2.getSecureRandomBytes = t2;
  function n2(e3) {
    return window.crypto.getRandomValues(new Uint16Array(e3));
  }
  e2.getSecureRandomWords = n2;
})), h = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.hmac_sha512 = void 0;
  async function t2(e3, t3) {
    let n2 = typeof e3 == `string` ? Buffer.from(e3, `utf-8`) : e3, r2 = typeof t3 == `string` ? Buffer.from(t3, `utf-8`) : t3, i2 = { name: `HMAC`, hash: `SHA-512` }, a2 = await window.crypto.subtle.importKey(`raw`, n2, i2, false, [`sign`]);
    return Buffer.from(await crypto.subtle.sign(i2, a2, r2));
  }
  e2.hmac_sha512 = t2;
})), g = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.pbkdf2_sha512 = void 0;
  async function t2(e3, t3, n2, r2) {
    let i2 = typeof e3 == `string` ? Buffer.from(e3, `utf-8`) : e3, a2 = typeof t3 == `string` ? Buffer.from(t3, `utf-8`) : t3, o2 = await window.crypto.subtle.importKey(`raw`, i2, { name: `PBKDF2` }, false, [`deriveBits`]), s2 = await window.crypto.subtle.deriveBits({ name: `PBKDF2`, hash: `SHA-512`, salt: a2, iterations: n2 }, o2, r2 * 8);
    return Buffer.from(s2);
  }
  e2.pbkdf2_sha512 = t2;
})), _ = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.sha256 = void 0;
  async function t2(e3) {
    return typeof e3 == `string` ? Buffer.from(await crypto.subtle.digest(`SHA-256`, Buffer.from(e3, `utf-8`))) : Buffer.from(await crypto.subtle.digest(`SHA-256`, e3));
  }
  e2.sha256 = t2;
})), v = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.sha512 = void 0;
  async function t2(e3) {
    return typeof e3 == `string` ? Buffer.from(await crypto.subtle.digest(`SHA-512`, Buffer.from(e3, `utf-8`))) : Buffer.from(await crypto.subtle.digest(`SHA-512`, e3));
  }
  e2.sha512 = t2;
})), y = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.sha512 = e2.sha256 = e2.pbkdf2_sha512 = e2.hmac_sha512 = e2.getSecureRandomWords = e2.getSecureRandomBytes = void 0;
  var t2 = m();
  Object.defineProperty(e2, "getSecureRandomBytes", { enumerable: true, get: function() {
    return t2.getSecureRandomBytes;
  } }), Object.defineProperty(e2, "getSecureRandomWords", { enumerable: true, get: function() {
    return t2.getSecureRandomWords;
  } });
  var n2 = h();
  Object.defineProperty(e2, "hmac_sha512", { enumerable: true, get: function() {
    return n2.hmac_sha512;
  } });
  var r2 = g();
  Object.defineProperty(e2, "pbkdf2_sha512", { enumerable: true, get: function() {
    return r2.pbkdf2_sha512;
  } });
  var i2 = _();
  Object.defineProperty(e2, "sha256", { enumerable: true, get: function() {
    return i2.sha256;
  } });
  var a2 = v();
  Object.defineProperty(e2, "sha512", { enumerable: true, get: function() {
    return a2.sha512;
  } });
})), b = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.sha256 = e2.sha256_fallback = e2.sha256_sync = void 0;
  let n2 = t2(p()), r2 = y();
  function i2(e3) {
    let t3;
    t3 = typeof e3 == `string` ? Buffer.from(e3, `utf-8`).toString(`hex`) : e3.toString(`hex`);
    let r3 = new n2.default(`SHA-256`, `HEX`);
    r3.update(t3);
    let i3 = r3.getHash(`HEX`);
    return Buffer.from(i3, `hex`);
  }
  e2.sha256_sync = i2;
  async function a2(e3) {
    return i2(e3);
  }
  e2.sha256_fallback = a2;
  function o2(e3) {
    return (0, r2.sha256)(e3);
  }
  e2.sha256 = o2;
})), x = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.sha512 = e2.sha512_fallback = e2.sha512_sync = void 0;
  let n2 = t2(p()), r2 = y();
  function i2(e3) {
    let t3;
    t3 = typeof e3 == `string` ? Buffer.from(e3, `utf-8`).toString(`hex`) : e3.toString(`hex`);
    let r3 = new n2.default(`SHA-512`, `HEX`);
    r3.update(t3);
    let i3 = r3.getHash(`HEX`);
    return Buffer.from(i3, `hex`);
  }
  e2.sha512_sync = i2;
  async function a2(e3) {
    return i2(e3);
  }
  e2.sha512_fallback = a2;
  async function o2(e3) {
    return (0, r2.sha512)(e3);
  }
  e2.sha512 = o2;
})), S = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.pbkdf2_sha512 = void 0;
  let t2 = y();
  function n2(e3, n3, r2, i2) {
    return (0, t2.pbkdf2_sha512)(e3, n3, r2, i2);
  }
  e2.pbkdf2_sha512 = n2;
})), C = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.hmac_sha512 = e2.hmac_sha512_fallback = void 0;
  let n2 = t2(p()), r2 = y();
  async function i2(e3, t3) {
    let r3 = typeof e3 == `string` ? Buffer.from(e3, `utf-8`) : e3, i3 = typeof t3 == `string` ? Buffer.from(t3, `utf-8`) : t3, a3 = new n2.default(`SHA-512`, `HEX`, { hmacKey: { value: r3.toString(`hex`), format: `HEX` } });
    a3.update(i3.toString(`hex`));
    let o2 = a3.getHash(`HEX`);
    return Buffer.from(o2, `hex`);
  }
  e2.hmac_sha512_fallback = i2;
  function a2(e3, t3) {
    return (0, r2.hmac_sha512)(e3, t3);
  }
  e2.hmac_sha512 = a2;
})), w = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getSecureRandomNumber = e2.getSecureRandomWords = e2.getSecureRandomBytes = void 0;
  let t2 = y();
  async function n2(e3) {
    return (0, t2.getSecureRandomBytes)(e3);
  }
  e2.getSecureRandomBytes = n2;
  async function r2(e3) {
    return r2(e3);
  }
  e2.getSecureRandomWords = r2;
  async function i2(e3, t3) {
    let r3 = t3 - e3;
    var i3 = Math.ceil(Math.log2(r3));
    if (i3 > 53) throw Error(`Range is too large`);
    for (var a2 = Math.ceil(i3 / 8), o2 = 2 ** i3 - 1; ; ) {
      let t4 = await n2(i3), c2 = (a2 - 1) * 8, l2 = 0;
      for (var s2 = 0; s2 < a2; s2++) l2 += t4[s2] * 2 ** c2, c2 -= 8;
      if (l2 &= o2, !(l2 >= r3)) return e3 + l2;
    }
  }
  e2.getSecureRandomNumber = i2;
})), T = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.wordlist = void 0, e2.wordlist = `abacus.abdomen.abdominal.abide.abiding.ability.ablaze.able.abnormal.abrasion.abrasive.abreast.abridge.abroad.abruptly.absence.absentee.absently.absinthe.absolute.absolve.abstain.abstract.absurd.accent.acclaim.acclimate.accompany.account.accuracy.accurate.accustom.acetone.achiness.aching.acid.acorn.acquaint.acquire.acre.acrobat.acronym.acting.action.activate.activator.active.activism.activist.activity.actress.acts.acutely.acuteness.aeration.aerobics.aerosol.aerospace.afar.affair.affected.affecting.affection.affidavit.affiliate.affirm.affix.afflicted.affluent.afford.affront.aflame.afloat.aflutter.afoot.afraid.afterglow.afterlife.aftermath.aftermost.afternoon.aged.ageless.agency.agenda.agent.aggregate.aghast.agile.agility.aging.agnostic.agonize.agonizing.agony.agreeable.agreeably.agreed.agreeing.agreement.aground.ahead.ahoy.aide.aids.aim.ajar.alabaster.alarm.albatross.album.alfalfa.algebra.algorithm.alias.alibi.alienable.alienate.aliens.alike.alive.alkaline.alkalize.almanac.almighty.almost.aloe.aloft.aloha.alone.alongside.aloof.alphabet.alright.although.altitude.alto.aluminum.alumni.always.amaretto.amaze.amazingly.amber.ambiance.ambiguity.ambiguous.ambition.ambitious.ambulance.ambush.amendable.amendment.amends.amenity.amiable.amicably.amid.amigo.amino.amiss.ammonia.ammonium.amnesty.amniotic.among.amount.amperage.ample.amplifier.amplify.amply.amuck.amulet.amusable.amused.amusement.amuser.amusing.anaconda.anaerobic.anagram.anatomist.anatomy.anchor.anchovy.ancient.android.anemia.anemic.aneurism.anew.angelfish.angelic.anger.angled.angler.angles.angling.angrily.angriness.anguished.angular.animal.animate.animating.animation.animator.anime.animosity.ankle.annex.annotate.announcer.annoying.annually.annuity.anointer.another.answering.antacid.antarctic.anteater.antelope.antennae.anthem.anthill.anthology.antibody.antics.antidote.antihero.antiquely.antiques.antiquity.antirust.antitoxic.antitrust.antiviral.antivirus.antler.antonym.antsy.anvil.anybody.anyhow.anymore.anyone.anyplace.anything.anytime.anyway.anywhere.aorta.apache.apostle.appealing.appear.appease.appeasing.appendage.appendix.appetite.appetizer.applaud.applause.apple.appliance.applicant.applied.apply.appointee.appraisal.appraiser.apprehend.approach.approval.approve.apricot.april.apron.aptitude.aptly.aqua.aqueduct.arbitrary.arbitrate.ardently.area.arena.arguable.arguably.argue.arise.armadillo.armband.armchair.armed.armful.armhole.arming.armless.armoire.armored.armory.armrest.army.aroma.arose.around.arousal.arrange.array.arrest.arrival.arrive.arrogance.arrogant.arson.art.ascend.ascension.ascent.ascertain.ashamed.ashen.ashes.ashy.aside.askew.asleep.asparagus.aspect.aspirate.aspire.aspirin.astonish.astound.astride.astrology.astronaut.astronomy.astute.atlantic.atlas.atom.atonable.atop.atrium.atrocious.atrophy.attach.attain.attempt.attendant.attendee.attention.attentive.attest.attic.attire.attitude.attractor.attribute.atypical.auction.audacious.audacity.audible.audibly.audience.audio.audition.augmented.august.authentic.author.autism.autistic.autograph.automaker.automated.automatic.autopilot.available.avalanche.avatar.avenge.avenging.avenue.average.aversion.avert.aviation.aviator.avid.avoid.await.awaken.award.aware.awhile.awkward.awning.awoke.awry.axis.babble.babbling.babied.baboon.backache.backboard.backboned.backdrop.backed.backer.backfield.backfire.backhand.backing.backlands.backlash.backless.backlight.backlit.backlog.backpack.backpedal.backrest.backroom.backshift.backside.backslid.backspace.backspin.backstab.backstage.backtalk.backtrack.backup.backward.backwash.backwater.backyard.bacon.bacteria.bacterium.badass.badge.badland.badly.badness.baffle.baffling.bagel.bagful.baggage.bagged.baggie.bagginess.bagging.baggy.bagpipe.baguette.baked.bakery.bakeshop.baking.balance.balancing.balcony.balmy.balsamic.bamboo.banana.banish.banister.banjo.bankable.bankbook.banked.banker.banking.banknote.bankroll.banner.bannister.banshee.banter.barbecue.barbed.barbell.barber.barcode.barge.bargraph.barista.baritone.barley.barmaid.barman.barn.barometer.barrack.barracuda.barrel.barrette.barricade.barrier.barstool.bartender.barterer.bash.basically.basics.basil.basin.basis.basket.batboy.batch.bath.baton.bats.battalion.battered.battering.battery.batting.battle.bauble.bazooka.blabber.bladder.blade.blah.blame.blaming.blanching.blandness.blank.blaspheme.blasphemy.blast.blatancy.blatantly.blazer.blazing.bleach.bleak.bleep.blemish.blend.bless.blighted.blimp.bling.blinked.blinker.blinking.blinks.blip.blissful.blitz.blizzard.bloated.bloating.blob.blog.bloomers.blooming.blooper.blot.blouse.blubber.bluff.bluish.blunderer.blunt.blurb.blurred.blurry.blurt.blush.blustery.boaster.boastful.boasting.boat.bobbed.bobbing.bobble.bobcat.bobsled.bobtail.bodacious.body.bogged.boggle.bogus.boil.bok.bolster.bolt.bonanza.bonded.bonding.bondless.boned.bonehead.boneless.bonelike.boney.bonfire.bonnet.bonsai.bonus.bony.boogeyman.boogieman.book.boondocks.booted.booth.bootie.booting.bootlace.bootleg.boots.boozy.borax.boring.borough.borrower.borrowing.boss.botanical.botanist.botany.botch.both.bottle.bottling.bottom.bounce.bouncing.bouncy.bounding.boundless.bountiful.bovine.boxcar.boxer.boxing.boxlike.boxy.breach.breath.breeches.breeching.breeder.breeding.breeze.breezy.brethren.brewery.brewing.briar.bribe.brick.bride.bridged.brigade.bright.brilliant.brim.bring.brink.brisket.briskly.briskness.bristle.brittle.broadband.broadcast.broaden.broadly.broadness.broadside.broadways.broiler.broiling.broken.broker.bronchial.bronco.bronze.bronzing.brook.broom.brought.browbeat.brownnose.browse.browsing.bruising.brunch.brunette.brunt.brush.brussels.brute.brutishly.bubble.bubbling.bubbly.buccaneer.bucked.bucket.buckle.buckshot.buckskin.bucktooth.buckwheat.buddhism.buddhist.budding.buddy.budget.buffalo.buffed.buffer.buffing.buffoon.buggy.bulb.bulge.bulginess.bulgur.bulk.bulldog.bulldozer.bullfight.bullfrog.bullhorn.bullion.bullish.bullpen.bullring.bullseye.bullwhip.bully.bunch.bundle.bungee.bunion.bunkbed.bunkhouse.bunkmate.bunny.bunt.busboy.bush.busily.busload.bust.busybody.buzz.cabana.cabbage.cabbie.cabdriver.cable.caboose.cache.cackle.cacti.cactus.caddie.caddy.cadet.cadillac.cadmium.cage.cahoots.cake.calamari.calamity.calcium.calculate.calculus.caliber.calibrate.calm.caloric.calorie.calzone.camcorder.cameo.camera.camisole.camper.campfire.camping.campsite.campus.canal.canary.cancel.candied.candle.candy.cane.canine.canister.cannabis.canned.canning.cannon.cannot.canola.canon.canopener.canopy.canteen.canyon.capable.capably.capacity.cape.capillary.capital.capitol.capped.capricorn.capsize.capsule.caption.captivate.captive.captivity.capture.caramel.carat.caravan.carbon.cardboard.carded.cardiac.cardigan.cardinal.cardstock.carefully.caregiver.careless.caress.caretaker.cargo.caring.carless.carload.carmaker.carnage.carnation.carnival.carnivore.carol.carpenter.carpentry.carpool.carport.carried.carrot.carrousel.carry.cartel.cartload.carton.cartoon.cartridge.cartwheel.carve.carving.carwash.cascade.case.cash.casing.casino.casket.cassette.casually.casualty.catacomb.catalog.catalyst.catalyze.catapult.cataract.catatonic.catcall.catchable.catcher.catching.catchy.caterer.catering.catfight.catfish.cathedral.cathouse.catlike.catnap.catnip.catsup.cattail.cattishly.cattle.catty.catwalk.caucasian.caucus.causal.causation.cause.causing.cauterize.caution.cautious.cavalier.cavalry.caviar.cavity.cedar.celery.celestial.celibacy.celibate.celtic.cement.census.ceramics.ceremony.certainly.certainty.certified.certify.cesarean.cesspool.chafe.chaffing.chain.chair.chalice.challenge.chamber.chamomile.champion.chance.change.channel.chant.chaos.chaperone.chaplain.chapped.chaps.chapter.character.charbroil.charcoal.charger.charging.chariot.charity.charm.charred.charter.charting.chase.chasing.chaste.chastise.chastity.chatroom.chatter.chatting.chatty.cheating.cheddar.cheek.cheer.cheese.cheesy.chef.chemicals.chemist.chemo.cherisher.cherub.chess.chest.chevron.chevy.chewable.chewer.chewing.chewy.chief.chihuahua.childcare.childhood.childish.childless.childlike.chili.chill.chimp.chip.chirping.chirpy.chitchat.chivalry.chive.chloride.chlorine.choice.chokehold.choking.chomp.chooser.choosing.choosy.chop.chosen.chowder.chowtime.chrome.chubby.chuck.chug.chummy.chump.chunk.churn.chute.cider.cilantro.cinch.cinema.cinnamon.circle.circling.circular.circulate.circus.citable.citadel.citation.citizen.citric.citrus.city.civic.civil.clad.claim.clambake.clammy.clamor.clamp.clamshell.clang.clanking.clapped.clapper.clapping.clarify.clarinet.clarity.clash.clasp.class.clatter.clause.clavicle.claw.clay.clean.clear.cleat.cleaver.cleft.clench.clergyman.clerical.clerk.clever.clicker.client.climate.climatic.cling.clinic.clinking.clip.clique.cloak.clobber.clock.clone.cloning.closable.closure.clothes.clothing.cloud.clover.clubbed.clubbing.clubhouse.clump.clumsily.clumsy.clunky.clustered.clutch.clutter.coach.coagulant.coastal.coaster.coasting.coastland.coastline.coat.coauthor.cobalt.cobbler.cobweb.cocoa.coconut.cod.coeditor.coerce.coexist.coffee.cofounder.cognition.cognitive.cogwheel.coherence.coherent.cohesive.coil.coke.cola.cold.coleslaw.coliseum.collage.collapse.collar.collected.collector.collide.collie.collision.colonial.colonist.colonize.colony.colossal.colt.coma.come.comfort.comfy.comic.coming.comma.commence.commend.comment.commerce.commode.commodity.commodore.common.commotion.commute.commuting.compacted.compacter.compactly.compactor.companion.company.compare.compel.compile.comply.component.composed.composer.composite.compost.composure.compound.compress.comprised.computer.computing.comrade.concave.conceal.conceded.concept.concerned.concert.conch.concierge.concise.conclude.concrete.concur.condense.condiment.condition.condone.conducive.conductor.conduit.cone.confess.confetti.confidant.confident.confider.confiding.configure.confined.confining.confirm.conflict.conform.confound.confront.confused.confusing.confusion.congenial.congested.congrats.congress.conical.conjoined.conjure.conjuror.connected.connector.consensus.consent.console.consoling.consonant.constable.constant.constrain.constrict.construct.consult.consumer.consuming.contact.container.contempt.contend.contented.contently.contents.contest.context.contort.contour.contrite.control.contusion.convene.convent.copartner.cope.copied.copier.copilot.coping.copious.copper.copy.coral.cork.cornball.cornbread.corncob.cornea.corned.corner.cornfield.cornflake.cornhusk.cornmeal.cornstalk.corny.coronary.coroner.corporal.corporate.corral.correct.corridor.corrode.corroding.corrosive.corsage.corset.cortex.cosigner.cosmetics.cosmic.cosmos.cosponsor.cost.cottage.cotton.couch.cough.could.countable.countdown.counting.countless.country.county.courier.covenant.cover.coveted.coveting.coyness.cozily.coziness.cozy.crabbing.crabgrass.crablike.crabmeat.cradle.cradling.crafter.craftily.craftsman.craftwork.crafty.cramp.cranberry.crane.cranial.cranium.crank.crate.crave.craving.crawfish.crawlers.crawling.crayfish.crayon.crazed.crazily.craziness.crazy.creamed.creamer.creamlike.crease.creasing.creatable.create.creation.creative.creature.credible.credibly.credit.creed.creme.creole.crepe.crept.crescent.crested.cresting.crestless.crevice.crewless.crewman.crewmate.crib.cricket.cried.crier.crimp.crimson.cringe.cringing.crinkle.crinkly.crisped.crisping.crisply.crispness.crispy.criteria.critter.croak.crock.crook.croon.crop.cross.crouch.crouton.crowbar.crowd.crown.crucial.crudely.crudeness.cruelly.cruelness.cruelty.crumb.crummiest.crummy.crumpet.crumpled.cruncher.crunching.crunchy.crusader.crushable.crushed.crusher.crushing.crust.crux.crying.cryptic.crystal.cubbyhole.cube.cubical.cubicle.cucumber.cuddle.cuddly.cufflink.culinary.culminate.culpable.culprit.cultivate.cultural.culture.cupbearer.cupcake.cupid.cupped.cupping.curable.curator.curdle.cure.curfew.curing.curled.curler.curliness.curling.curly.curry.curse.cursive.cursor.curtain.curtly.curtsy.curvature.curve.curvy.cushy.cusp.cussed.custard.custodian.custody.customary.customer.customize.customs.cut.cycle.cyclic.cycling.cyclist.cylinder.cymbal.cytoplasm.cytoplast.dab.dad.daffodil.dagger.daily.daintily.dainty.dairy.daisy.dallying.dance.dancing.dandelion.dander.dandruff.dandy.danger.dangle.dangling.daredevil.dares.daringly.darkened.darkening.darkish.darkness.darkroom.darling.darn.dart.darwinism.dash.dastardly.data.datebook.dating.daughter.daunting.dawdler.dawn.daybed.daybreak.daycare.daydream.daylight.daylong.dayroom.daytime.dazzler.dazzling.deacon.deafening.deafness.dealer.dealing.dealmaker.dealt.dean.debatable.debate.debating.debit.debrief.debtless.debtor.debug.debunk.decade.decaf.decal.decathlon.decay.deceased.deceit.deceiver.deceiving.december.decency.decent.deception.deceptive.decibel.decidable.decimal.decimeter.decipher.deck.declared.decline.decode.decompose.decorated.decorator.decoy.decrease.decree.dedicate.dedicator.deduce.deduct.deed.deem.deepen.deeply.deepness.deface.defacing.defame.default.defeat.defection.defective.defendant.defender.defense.defensive.deferral.deferred.defiance.defiant.defile.defiling.define.definite.deflate.deflation.deflator.deflected.deflector.defog.deforest.defraud.defrost.deftly.defuse.defy.degraded.degrading.degrease.degree.dehydrate.deity.dejected.delay.delegate.delegator.delete.deletion.delicacy.delicate.delicious.delighted.delirious.delirium.deliverer.delivery.delouse.delta.deluge.delusion.deluxe.demanding.demeaning.demeanor.demise.democracy.democrat.demote.demotion.demystify.denatured.deniable.denial.denim.denote.dense.density.dental.dentist.denture.deny.deodorant.deodorize.departed.departure.depict.deplete.depletion.deplored.deploy.deport.depose.depraved.depravity.deprecate.depress.deprive.depth.deputize.deputy.derail.deranged.derby.derived.desecrate.deserve.deserving.designate.designed.designer.designing.deskbound.desktop.deskwork.desolate.despair.despise.despite.destiny.destitute.destruct.detached.detail.detection.detective.detector.detention.detergent.detest.detonate.detonator.detoxify.detract.deuce.devalue.deviancy.deviant.deviate.deviation.deviator.device.devious.devotedly.devotee.devotion.devourer.devouring.devoutly.dexterity.dexterous.diabetes.diabetic.diabolic.diagnoses.diagnosis.diagram.dial.diameter.diaper.diaphragm.diary.dice.dicing.dictate.dictation.dictator.difficult.diffused.diffuser.diffusion.diffusive.dig.dilation.diligence.diligent.dill.dilute.dime.diminish.dimly.dimmed.dimmer.dimness.dimple.diner.dingbat.dinghy.dinginess.dingo.dingy.dining.dinner.diocese.dioxide.diploma.dipped.dipper.dipping.directed.direction.directive.directly.directory.direness.dirtiness.disabled.disagree.disallow.disarm.disarray.disaster.disband.disbelief.disburse.discard.discern.discharge.disclose.discolor.discount.discourse.discover.discuss.disdain.disengage.disfigure.disgrace.dish.disinfect.disjoin.disk.dislike.disliking.dislocate.dislodge.disloyal.dismantle.dismay.dismiss.dismount.disobey.disorder.disown.disparate.disparity.dispatch.dispense.dispersal.dispersed.disperser.displace.display.displease.disposal.dispose.disprove.dispute.disregard.disrupt.dissuade.distance.distant.distaste.distill.distinct.distort.distract.distress.district.distrust.ditch.ditto.ditzy.dividable.divided.dividend.dividers.dividing.divinely.diving.divinity.divisible.divisibly.division.divisive.divorcee.dizziness.dizzy.doable.docile.dock.doctrine.document.dodge.dodgy.doily.doing.dole.dollar.dollhouse.dollop.dolly.dolphin.domain.domelike.domestic.dominion.dominoes.donated.donation.donator.donor.donut.doodle.doorbell.doorframe.doorknob.doorman.doormat.doornail.doorpost.doorstep.doorstop.doorway.doozy.dork.dormitory.dorsal.dosage.dose.dotted.doubling.douche.dove.down.dowry.doze.drab.dragging.dragonfly.dragonish.dragster.drainable.drainage.drained.drainer.drainpipe.dramatic.dramatize.drank.drapery.drastic.draw.dreaded.dreadful.dreadlock.dreamboat.dreamily.dreamland.dreamless.dreamlike.dreamt.dreamy.drearily.dreary.drench.dress.drew.dribble.dried.drier.drift.driller.drilling.drinkable.drinking.dripping.drippy.drivable.driven.driver.driveway.driving.drizzle.drizzly.drone.drool.droop.drop-down.dropbox.dropkick.droplet.dropout.dropper.drove.drown.drowsily.drudge.drum.dry.dubbed.dubiously.duchess.duckbill.ducking.duckling.ducktail.ducky.duct.dude.duffel.dugout.duh.duke.duller.dullness.duly.dumping.dumpling.dumpster.duo.dupe.duplex.duplicate.duplicity.durable.durably.duration.duress.during.dusk.dust.dutiful.duty.duvet.dwarf.dweeb.dwelled.dweller.dwelling.dwindle.dwindling.dynamic.dynamite.dynasty.dyslexia.dyslexic.each.eagle.earache.eardrum.earflap.earful.earlobe.early.earmark.earmuff.earphone.earpiece.earplugs.earring.earshot.earthen.earthlike.earthling.earthly.earthworm.earthy.earwig.easeful.easel.easiest.easily.easiness.easing.eastbound.eastcoast.easter.eastward.eatable.eaten.eatery.eating.eats.ebay.ebony.ebook.ecard.eccentric.echo.eclair.eclipse.ecologist.ecology.economic.economist.economy.ecosphere.ecosystem.edge.edginess.edging.edgy.edition.editor.educated.education.educator.eel.effective.effects.efficient.effort.eggbeater.egging.eggnog.eggplant.eggshell.egomaniac.egotism.egotistic.either.eject.elaborate.elastic.elated.elbow.eldercare.elderly.eldest.electable.election.elective.elephant.elevate.elevating.elevation.elevator.eleven.elf.eligible.eligibly.eliminate.elite.elitism.elixir.elk.ellipse.elliptic.elm.elongated.elope.eloquence.eloquent.elsewhere.elude.elusive.elves.email.embargo.embark.embassy.embattled.embellish.ember.embezzle.emblaze.emblem.embody.embolism.emboss.embroider.emcee.emerald.emergency.emission.emit.emote.emoticon.emotion.empathic.empathy.emperor.emphases.emphasis.emphasize.emphatic.empirical.employed.employee.employer.emporium.empower.emptier.emptiness.empty.emu.enable.enactment.enamel.enchanted.enchilada.encircle.enclose.enclosure.encode.encore.encounter.encourage.encroach.encrust.encrypt.endanger.endeared.endearing.ended.ending.endless.endnote.endocrine.endorphin.endorse.endowment.endpoint.endurable.endurance.enduring.energetic.energize.energy.enforced.enforcer.engaged.engaging.engine.engorge.engraved.engraver.engraving.engross.engulf.enhance.enigmatic.enjoyable.enjoyably.enjoyer.enjoying.enjoyment.enlarged.enlarging.enlighten.enlisted.enquirer.enrage.enrich.enroll.enslave.ensnare.ensure.entail.entangled.entering.entertain.enticing.entire.entitle.entity.entomb.entourage.entrap.entree.entrench.entrust.entryway.entwine.enunciate.envelope.enviable.enviably.envious.envision.envoy.envy.enzyme.epic.epidemic.epidermal.epidermis.epidural.epilepsy.epileptic.epilogue.epiphany.episode.equal.equate.equation.equator.equinox.equipment.equity.equivocal.eradicate.erasable.erased.eraser.erasure.ergonomic.errand.errant.erratic.error.erupt.escalate.escalator.escapable.escapade.escapist.escargot.eskimo.esophagus.espionage.espresso.esquire.essay.essence.essential.establish.estate.esteemed.estimate.estimator.estranged.estrogen.etching.eternal.eternity.ethanol.ether.ethically.ethics.euphemism.evacuate.evacuee.evade.evaluate.evaluator.evaporate.evasion.evasive.even.everglade.evergreen.everybody.everyday.everyone.evict.evidence.evident.evil.evoke.evolution.evolve.exact.exalted.example.excavate.excavator.exceeding.exception.excess.exchange.excitable.exciting.exclaim.exclude.excluding.exclusion.exclusive.excretion.excretory.excursion.excusable.excusably.excuse.exemplary.exemplify.exemption.exerciser.exert.exes.exfoliate.exhale.exhaust.exhume.exile.existing.exit.exodus.exonerate.exorcism.exorcist.expand.expanse.expansion.expansive.expectant.expedited.expediter.expel.expend.expenses.expensive.expert.expire.expiring.explain.expletive.explicit.explode.exploit.explore.exploring.exponent.exporter.exposable.expose.exposure.express.expulsion.exquisite.extended.extending.extent.extenuate.exterior.external.extinct.extortion.extradite.extras.extrovert.extrude.extruding.exuberant.fable.fabric.fabulous.facebook.facecloth.facedown.faceless.facelift.faceplate.faceted.facial.facility.facing.facsimile.faction.factoid.factor.factsheet.factual.faculty.fade.fading.failing.falcon.fall.false.falsify.fame.familiar.family.famine.famished.fanatic.fancied.fanciness.fancy.fanfare.fang.fanning.fantasize.fantastic.fantasy.fascism.fastball.faster.fasting.fastness.faucet.favorable.favorably.favored.favoring.favorite.fax.feast.federal.fedora.feeble.feed.feel.feisty.feline.felt-tip.feminine.feminism.feminist.feminize.femur.fence.fencing.fender.ferment.fernlike.ferocious.ferocity.ferret.ferris.ferry.fervor.fester.festival.festive.festivity.fetal.fetch.fever.fiber.fiction.fiddle.fiddling.fidelity.fidgeting.fidgety.fifteen.fifth.fiftieth.fifty.figment.figure.figurine.filing.filled.filler.filling.film.filter.filth.filtrate.finale.finalist.finalize.finally.finance.financial.finch.fineness.finer.finicky.finished.finisher.finishing.finite.finless.finlike.fiscally.fit.five.flaccid.flagman.flagpole.flagship.flagstick.flagstone.flail.flakily.flaky.flame.flammable.flanked.flanking.flannels.flap.flaring.flashback.flashbulb.flashcard.flashily.flashing.flashy.flask.flatbed.flatfoot.flatly.flatness.flatten.flattered.flatterer.flattery.flattop.flatware.flatworm.flavored.flavorful.flavoring.flaxseed.fled.fleshed.fleshy.flick.flier.flight.flinch.fling.flint.flip.flirt.float.flock.flogging.flop.floral.florist.floss.flounder.flyable.flyaway.flyer.flying.flyover.flypaper.foam.foe.fog.foil.folic.folk.follicle.follow.fondling.fondly.fondness.fondue.font.food.fool.footage.football.footbath.footboard.footer.footgear.foothill.foothold.footing.footless.footman.footnote.footpad.footpath.footprint.footrest.footsie.footsore.footwear.footwork.fossil.foster.founder.founding.fountain.fox.foyer.fraction.fracture.fragile.fragility.fragment.fragrance.fragrant.frail.frame.framing.frantic.fraternal.frayed.fraying.frays.freckled.freckles.freebase.freebee.freebie.freedom.freefall.freehand.freeing.freeload.freely.freemason.freeness.freestyle.freeware.freeway.freewill.freezable.freezing.freight.french.frenzied.frenzy.frequency.frequent.fresh.fretful.fretted.friction.friday.fridge.fried.friend.frighten.frightful.frigidity.frigidly.frill.fringe.frisbee.frisk.fritter.frivolous.frolic.from.front.frostbite.frosted.frostily.frosting.frostlike.frosty.froth.frown.frozen.fructose.frugality.frugally.fruit.frustrate.frying.gab.gaffe.gag.gainfully.gaining.gains.gala.gallantly.galleria.gallery.galley.gallon.gallows.gallstone.galore.galvanize.gambling.game.gaming.gamma.gander.gangly.gangrene.gangway.gap.garage.garbage.garden.gargle.garland.garlic.garment.garnet.garnish.garter.gas.gatherer.gathering.gating.gauging.gauntlet.gauze.gave.gawk.gazing.gear.gecko.geek.geiger.gem.gender.generic.generous.genetics.genre.gentile.gentleman.gently.gents.geography.geologic.geologist.geology.geometric.geometry.geranium.gerbil.geriatric.germicide.germinate.germless.germproof.gestate.gestation.gesture.getaway.getting.getup.giant.gibberish.giblet.giddily.giddiness.giddy.gift.gigabyte.gigahertz.gigantic.giggle.giggling.giggly.gigolo.gilled.gills.gimmick.girdle.giveaway.given.giver.giving.gizmo.gizzard.glacial.glacier.glade.gladiator.gladly.glamorous.glamour.glance.glancing.glandular.glare.glaring.glass.glaucoma.glazing.gleaming.gleeful.glider.gliding.glimmer.glimpse.glisten.glitch.glitter.glitzy.gloater.gloating.gloomily.gloomy.glorified.glorifier.glorify.glorious.glory.gloss.glove.glowing.glowworm.glucose.glue.gluten.glutinous.glutton.gnarly.gnat.goal.goatskin.goes.goggles.going.goldfish.goldmine.goldsmith.golf.goliath.gonad.gondola.gone.gong.good.gooey.goofball.goofiness.goofy.google.goon.gopher.gore.gorged.gorgeous.gory.gosling.gossip.gothic.gotten.gout.gown.grab.graceful.graceless.gracious.gradation.graded.grader.gradient.grading.gradually.graduate.graffiti.grafted.grafting.grain.granddad.grandkid.grandly.grandma.grandpa.grandson.granite.granny.granola.grant.granular.grape.graph.grapple.grappling.grasp.grass.gratified.gratify.grating.gratitude.gratuity.gravel.graveness.graves.graveyard.gravitate.gravity.gravy.gray.grazing.greasily.greedily.greedless.greedy.green.greeter.greeting.grew.greyhound.grid.grief.grievance.grieving.grievous.grill.grimace.grimacing.grime.griminess.grimy.grinch.grinning.grip.gristle.grit.groggily.groggy.groin.groom.groove.grooving.groovy.grope.ground.grouped.grout.grove.grower.growing.growl.grub.grudge.grudging.grueling.gruffly.grumble.grumbling.grumbly.grumpily.grunge.grunt.guacamole.guidable.guidance.guide.guiding.guileless.guise.gulf.gullible.gully.gulp.gumball.gumdrop.gumminess.gumming.gummy.gurgle.gurgling.guru.gush.gusto.gusty.gutless.guts.gutter.guy.guzzler.gyration.habitable.habitant.habitat.habitual.hacked.hacker.hacking.hacksaw.had.haggler.haiku.half.halogen.halt.halved.halves.hamburger.hamlet.hammock.hamper.hamster.hamstring.handbag.handball.handbook.handbrake.handcart.handclap.handclasp.handcraft.handcuff.handed.handful.handgrip.handgun.handheld.handiness.handiwork.handlebar.handled.handler.handling.handmade.handoff.handpick.handprint.handrail.handsaw.handset.handsfree.handshake.handstand.handwash.handwork.handwoven.handwrite.handyman.hangnail.hangout.hangover.hangup.hankering.hankie.hanky.haphazard.happening.happier.happiest.happily.happiness.happy.harbor.hardcopy.hardcore.hardcover.harddisk.hardened.hardener.hardening.hardhat.hardhead.hardiness.hardly.hardness.hardship.hardware.hardwired.hardwood.hardy.harmful.harmless.harmonica.harmonics.harmonize.harmony.harness.harpist.harsh.harvest.hash.hassle.haste.hastily.hastiness.hasty.hatbox.hatchback.hatchery.hatchet.hatching.hatchling.hate.hatless.hatred.haunt.haven.hazard.hazelnut.hazily.haziness.hazing.hazy.headache.headband.headboard.headcount.headdress.headed.header.headfirst.headgear.heading.headlamp.headless.headlock.headphone.headpiece.headrest.headroom.headscarf.headset.headsman.headstand.headstone.headway.headwear.heap.heat.heave.heavily.heaviness.heaving.hedge.hedging.heftiness.hefty.helium.helmet.helper.helpful.helping.helpless.helpline.hemlock.hemstitch.hence.henchman.henna.herald.herbal.herbicide.herbs.heritage.hermit.heroics.heroism.herring.herself.hertz.hesitancy.hesitant.hesitate.hexagon.hexagram.hubcap.huddle.huddling.huff.hug.hula.hulk.hull.human.humble.humbling.humbly.humid.humiliate.humility.humming.hummus.humongous.humorist.humorless.humorous.humpback.humped.humvee.hunchback.hundredth.hunger.hungrily.hungry.hunk.hunter.hunting.huntress.huntsman.hurdle.hurled.hurler.hurling.hurray.hurricane.hurried.hurry.hurt.husband.hush.husked.huskiness.hut.hybrid.hydrant.hydrated.hydration.hydrogen.hydroxide.hyperlink.hypertext.hyphen.hypnoses.hypnosis.hypnotic.hypnotism.hypnotist.hypnotize.hypocrisy.hypocrite.ibuprofen.ice.iciness.icing.icky.icon.icy.idealism.idealist.idealize.ideally.idealness.identical.identify.identity.ideology.idiocy.idiom.idly.igloo.ignition.ignore.iguana.illicitly.illusion.illusive.image.imaginary.imagines.imaging.imbecile.imitate.imitation.immature.immerse.immersion.imminent.immobile.immodest.immorally.immortal.immovable.immovably.immunity.immunize.impaired.impale.impart.impatient.impeach.impeding.impending.imperfect.imperial.impish.implant.implement.implicate.implicit.implode.implosion.implosive.imply.impolite.important.importer.impose.imposing.impotence.impotency.impotent.impound.imprecise.imprint.imprison.impromptu.improper.improve.improving.improvise.imprudent.impulse.impulsive.impure.impurity.iodine.iodize.ion.ipad.iphone.ipod.irate.irk.iron.irregular.irrigate.irritable.irritably.irritant.irritate.islamic.islamist.isolated.isolating.isolation.isotope.issue.issuing.italicize.italics.item.itinerary.itunes.ivory.ivy.jab.jackal.jacket.jackknife.jackpot.jailbird.jailbreak.jailer.jailhouse.jalapeno.jam.janitor.january.jargon.jarring.jasmine.jaundice.jaunt.java.jawed.jawless.jawline.jaws.jaybird.jaywalker.jazz.jeep.jeeringly.jellied.jelly.jersey.jester.jet.jiffy.jigsaw.jimmy.jingle.jingling.jinx.jitters.jittery.job.jockey.jockstrap.jogger.jogging.john.joining.jokester.jokingly.jolliness.jolly.jolt.jot.jovial.joyfully.joylessly.joyous.joyride.joystick.jubilance.jubilant.judge.judgingly.judicial.judiciary.judo.juggle.juggling.jugular.juice.juiciness.juicy.jujitsu.jukebox.july.jumble.jumbo.jump.junction.juncture.june.junior.juniper.junkie.junkman.junkyard.jurist.juror.jury.justice.justifier.justify.justly.justness.juvenile.kabob.kangaroo.karaoke.karate.karma.kebab.keenly.keenness.keep.keg.kelp.kennel.kept.kerchief.kerosene.kettle.kick.kiln.kilobyte.kilogram.kilometer.kilowatt.kilt.kimono.kindle.kindling.kindly.kindness.kindred.kinetic.kinfolk.king.kinship.kinsman.kinswoman.kissable.kisser.kissing.kitchen.kite.kitten.kitty.kiwi.kleenex.knapsack.knee.knelt.knickers.knoll.koala.kooky.kosher.krypton.kudos.kung.labored.laborer.laboring.laborious.labrador.ladder.ladies.ladle.ladybug.ladylike.lagged.lagging.lagoon.lair.lake.lance.landed.landfall.landfill.landing.landlady.landless.landline.landlord.landmark.landmass.landmine.landowner.landscape.landside.landslide.language.lankiness.lanky.lantern.lapdog.lapel.lapped.lapping.laptop.lard.large.lark.lash.lasso.last.latch.late.lather.latitude.latrine.latter.latticed.launch.launder.laundry.laurel.lavender.lavish.laxative.lazily.laziness.lazy.lecturer.left.legacy.legal.legend.legged.leggings.legible.legibly.legislate.lego.legroom.legume.legwarmer.legwork.lemon.lend.length.lens.lent.leotard.lesser.letdown.lethargic.lethargy.letter.lettuce.level.leverage.levers.levitate.levitator.liability.liable.liberty.librarian.library.licking.licorice.lid.life.lifter.lifting.liftoff.ligament.likely.likeness.likewise.liking.lilac.lilly.lily.limb.limeade.limelight.limes.limit.limping.limpness.line.lingo.linguini.linguist.lining.linked.linoleum.linseed.lint.lion.lip.liquefy.liqueur.liquid.lisp.list.litigate.litigator.litmus.litter.little.livable.lived.lively.liver.livestock.lividly.living.lizard.lubricant.lubricate.lucid.luckily.luckiness.luckless.lucrative.ludicrous.lugged.lukewarm.lullaby.lumber.luminance.luminous.lumpiness.lumping.lumpish.lunacy.lunar.lunchbox.luncheon.lunchroom.lunchtime.lung.lurch.lure.luridness.lurk.lushly.lushness.luster.lustfully.lustily.lustiness.lustrous.lusty.luxurious.luxury.lying.lyrically.lyricism.lyricist.lyrics.macarena.macaroni.macaw.mace.machine.machinist.magazine.magenta.maggot.magical.magician.magma.magnesium.magnetic.magnetism.magnetize.magnifier.magnify.magnitude.magnolia.mahogany.maimed.majestic.majesty.majorette.majority.makeover.maker.makeshift.making.malformed.malt.mama.mammal.mammary.mammogram.manager.managing.manatee.mandarin.mandate.mandatory.mandolin.manger.mangle.mango.mangy.manhandle.manhole.manhood.manhunt.manicotti.manicure.manifesto.manila.mankind.manlike.manliness.manly.manmade.manned.mannish.manor.manpower.mantis.mantra.manual.many.map.marathon.marauding.marbled.marbles.marbling.march.mardi.margarine.margarita.margin.marigold.marina.marine.marital.maritime.marlin.marmalade.maroon.married.marrow.marry.marshland.marshy.marsupial.marvelous.marxism.mascot.masculine.mashed.mashing.massager.masses.massive.mastiff.matador.matchbook.matchbox.matcher.matching.matchless.material.maternal.maternity.math.mating.matriarch.matrimony.matrix.matron.matted.matter.maturely.maturing.maturity.mauve.maverick.maximize.maximum.maybe.mayday.mayflower.moaner.moaning.mobile.mobility.mobilize.mobster.mocha.mocker.mockup.modified.modify.modular.modulator.module.moisten.moistness.moisture.molar.molasses.mold.molecular.molecule.molehill.mollusk.mom.monastery.monday.monetary.monetize.moneybags.moneyless.moneywise.mongoose.mongrel.monitor.monkhood.monogamy.monogram.monologue.monopoly.monorail.monotone.monotype.monoxide.monsieur.monsoon.monstrous.monthly.monument.moocher.moodiness.moody.mooing.moonbeam.mooned.moonlight.moonlike.moonlit.moonrise.moonscape.moonshine.moonstone.moonwalk.mop.morale.morality.morally.morbidity.morbidly.morphine.morphing.morse.mortality.mortally.mortician.mortified.mortify.mortuary.mosaic.mossy.most.mothball.mothproof.motion.motivate.motivator.motive.motocross.motor.motto.mountable.mountain.mounted.mounting.mourner.mournful.mouse.mousiness.moustache.mousy.mouth.movable.move.movie.moving.mower.mowing.much.muck.mud.mug.mulberry.mulch.mule.mulled.mullets.multiple.multiply.multitask.multitude.mumble.mumbling.mumbo.mummified.mummify.mummy.mumps.munchkin.mundane.municipal.muppet.mural.murkiness.murky.murmuring.muscular.museum.mushily.mushiness.mushroom.mushy.music.musket.muskiness.musky.mustang.mustard.muster.mustiness.musty.mutable.mutate.mutation.mute.mutilated.mutilator.mutiny.mutt.mutual.muzzle.myself.myspace.mystified.mystify.myth.nacho.nag.nail.name.naming.nanny.nanometer.nape.napkin.napped.napping.nappy.narrow.nastily.nastiness.national.native.nativity.natural.nature.naturist.nautical.navigate.navigator.navy.nearby.nearest.nearly.nearness.neatly.neatness.nebula.nebulizer.nectar.negate.negation.negative.neglector.negligee.negligent.negotiate.nemeses.nemesis.neon.nephew.nerd.nervous.nervy.nest.net.neurology.neuron.neurosis.neurotic.neuter.neutron.never.next.nibble.nickname.nicotine.niece.nifty.nimble.nimbly.nineteen.ninetieth.ninja.nintendo.ninth.nuclear.nuclei.nucleus.nugget.nullify.number.numbing.numbly.numbness.numeral.numerate.numerator.numeric.numerous.nuptials.nursery.nursing.nurture.nutcase.nutlike.nutmeg.nutrient.nutshell.nuttiness.nutty.nuzzle.nylon.oaf.oak.oasis.oat.obedience.obedient.obituary.object.obligate.obliged.oblivion.oblivious.oblong.obnoxious.oboe.obscure.obscurity.observant.observer.observing.obsessed.obsession.obsessive.obsolete.obstacle.obstinate.obstruct.obtain.obtrusive.obtuse.obvious.occultist.occupancy.occupant.occupier.occupy.ocean.ocelot.octagon.octane.october.octopus.ogle.oil.oink.ointment.okay.old.olive.olympics.omega.omen.ominous.omission.omit.omnivore.onboard.oncoming.ongoing.onion.online.onlooker.only.onscreen.onset.onshore.onslaught.onstage.onto.onward.onyx.oops.ooze.oozy.opacity.opal.open.operable.operate.operating.operation.operative.operator.opium.opossum.opponent.oppose.opposing.opposite.oppressed.oppressor.opt.opulently.osmosis.other.otter.ouch.ought.ounce.outage.outback.outbid.outboard.outbound.outbreak.outburst.outcast.outclass.outcome.outdated.outdoors.outer.outfield.outfit.outflank.outgoing.outgrow.outhouse.outing.outlast.outlet.outline.outlook.outlying.outmatch.outmost.outnumber.outplayed.outpost.outpour.output.outrage.outrank.outreach.outright.outscore.outsell.outshine.outshoot.outsider.outskirts.outsmart.outsource.outspoken.outtakes.outthink.outward.outweigh.outwit.oval.ovary.oven.overact.overall.overarch.overbid.overbill.overbite.overblown.overboard.overbook.overbuilt.overcast.overcoat.overcome.overcook.overcrowd.overdraft.overdrawn.overdress.overdrive.overdue.overeager.overeater.overexert.overfed.overfeed.overfill.overflow.overfull.overgrown.overhand.overhang.overhaul.overhead.overhear.overheat.overhung.overjoyed.overkill.overlabor.overlaid.overlap.overlay.overload.overlook.overlord.overlying.overnight.overpass.overpay.overplant.overplay.overpower.overprice.overrate.overreach.overreact.override.overripe.overrule.overrun.overshoot.overshot.oversight.oversized.oversleep.oversold.overspend.overstate.overstay.overstep.overstock.overstuff.oversweet.overtake.overthrow.overtime.overtly.overtone.overture.overturn.overuse.overvalue.overview.overwrite.owl.oxford.oxidant.oxidation.oxidize.oxidizing.oxygen.oxymoron.oyster.ozone.paced.pacemaker.pacific.pacifier.pacifism.pacifist.pacify.padded.padding.paddle.paddling.padlock.pagan.pager.paging.pajamas.palace.palatable.palm.palpable.palpitate.paltry.pampered.pamperer.pampers.pamphlet.panama.pancake.pancreas.panda.pandemic.pang.panhandle.panic.panning.panorama.panoramic.panther.pantomime.pantry.pants.pantyhose.paparazzi.papaya.paper.paprika.papyrus.parabola.parachute.parade.paradox.paragraph.parakeet.paralegal.paralyses.paralysis.paralyze.paramedic.parameter.paramount.parasail.parasite.parasitic.parcel.parched.parchment.pardon.parish.parka.parking.parkway.parlor.parmesan.parole.parrot.parsley.parsnip.partake.parted.parting.partition.partly.partner.partridge.party.passable.passably.passage.passcode.passenger.passerby.passing.passion.passive.passivism.passover.passport.password.pasta.pasted.pastel.pastime.pastor.pastrami.pasture.pasty.patchwork.patchy.paternal.paternity.path.patience.patient.patio.patriarch.patriot.patrol.patronage.patronize.pauper.pavement.paver.pavestone.pavilion.paving.pawing.payable.payback.paycheck.payday.payee.payer.paying.payment.payphone.payroll.pebble.pebbly.pecan.pectin.peculiar.peddling.pediatric.pedicure.pedigree.pedometer.pegboard.pelican.pellet.pelt.pelvis.penalize.penalty.pencil.pendant.pending.penholder.penknife.pennant.penniless.penny.penpal.pension.pentagon.pentagram.pep.perceive.percent.perch.percolate.perennial.perfected.perfectly.perfume.periscope.perish.perjurer.perjury.perkiness.perky.perm.peroxide.perpetual.perplexed.persecute.persevere.persuaded.persuader.pesky.peso.pessimism.pessimist.pester.pesticide.petal.petite.petition.petri.petroleum.petted.petticoat.pettiness.petty.petunia.phantom.phobia.phoenix.phonebook.phoney.phonics.phoniness.phony.phosphate.photo.phrase.phrasing.placard.placate.placidly.plank.planner.plant.plasma.plaster.plastic.plated.platform.plating.platinum.platonic.platter.platypus.plausible.plausibly.playable.playback.player.playful.playgroup.playhouse.playing.playlist.playmaker.playmate.playoff.playpen.playroom.playset.plaything.playtime.plaza.pleading.pleat.pledge.plentiful.plenty.plethora.plexiglas.pliable.plod.plop.plot.plow.ploy.pluck.plug.plunder.plunging.plural.plus.plutonium.plywood.poach.pod.poem.poet.pogo.pointed.pointer.pointing.pointless.pointy.poise.poison.poker.poking.polar.police.policy.polio.polish.politely.polka.polo.polyester.polygon.polygraph.polymer.poncho.pond.pony.popcorn.pope.poplar.popper.poppy.popsicle.populace.popular.populate.porcupine.pork.porous.porridge.portable.portal.portfolio.porthole.portion.portly.portside.poser.posh.posing.possible.possibly.possum.postage.postal.postbox.postcard.posted.poster.posting.postnasal.posture.postwar.pouch.pounce.pouncing.pound.pouring.pout.powdered.powdering.powdery.power.powwow.pox.praising.prance.prancing.pranker.prankish.prankster.prayer.praying.preacher.preaching.preachy.preamble.precinct.precise.precision.precook.precut.predator.predefine.predict.preface.prefix.preflight.preformed.pregame.pregnancy.pregnant.preheated.prelaunch.prelaw.prelude.premiere.premises.premium.prenatal.preoccupy.preorder.prepaid.prepay.preplan.preppy.preschool.prescribe.preseason.preset.preshow.president.presoak.press.presume.presuming.preteen.pretended.pretender.pretense.pretext.pretty.pretzel.prevail.prevalent.prevent.preview.previous.prewar.prewashed.prideful.pried.primal.primarily.primary.primate.primer.primp.princess.print.prior.prism.prison.prissy.pristine.privacy.private.privatize.prize.proactive.probable.probably.probation.probe.probing.probiotic.problem.procedure.process.proclaim.procreate.procurer.prodigal.prodigy.produce.product.profane.profanity.professed.professor.profile.profound.profusely.progeny.prognosis.program.progress.projector.prologue.prolonged.promenade.prominent.promoter.promotion.prompter.promptly.prone.prong.pronounce.pronto.proofing.proofread.proofs.propeller.properly.property.proponent.proposal.propose.props.prorate.protector.protegee.proton.prototype.protozoan.protract.protrude.proud.provable.proved.proven.provided.provider.providing.province.proving.provoke.provoking.provolone.prowess.prowler.prowling.proximity.proxy.prozac.prude.prudishly.prune.pruning.pry.psychic.public.publisher.pucker.pueblo.pug.pull.pulmonary.pulp.pulsate.pulse.pulverize.puma.pumice.pummel.punch.punctual.punctuate.punctured.pungent.punisher.punk.pupil.puppet.puppy.purchase.pureblood.purebred.purely.pureness.purgatory.purge.purging.purifier.purify.purist.puritan.purity.purple.purplish.purposely.purr.purse.pursuable.pursuant.pursuit.purveyor.pushcart.pushchair.pusher.pushiness.pushing.pushover.pushpin.pushup.pushy.putdown.putt.puzzle.puzzling.pyramid.pyromania.python.quack.quadrant.quail.quaintly.quake.quaking.qualified.qualifier.qualify.quality.qualm.quantum.quarrel.quarry.quartered.quarterly.quarters.quartet.quench.query.quicken.quickly.quickness.quicksand.quickstep.quiet.quill.quilt.quintet.quintuple.quirk.quit.quiver.quizzical.quotable.quotation.quote.rabid.race.racing.racism.rack.racoon.radar.radial.radiance.radiantly.radiated.radiation.radiator.radio.radish.raffle.raft.rage.ragged.raging.ragweed.raider.railcar.railing.railroad.railway.raisin.rake.raking.rally.ramble.rambling.ramp.ramrod.ranch.rancidity.random.ranged.ranger.ranging.ranked.ranking.ransack.ranting.rants.rare.rarity.rascal.rash.rasping.ravage.raven.ravine.raving.ravioli.ravishing.reabsorb.reach.reacquire.reaction.reactive.reactor.reaffirm.ream.reanalyze.reappear.reapply.reappoint.reapprove.rearrange.rearview.reason.reassign.reassure.reattach.reawake.rebalance.rebate.rebel.rebirth.reboot.reborn.rebound.rebuff.rebuild.rebuilt.reburial.rebuttal.recall.recant.recapture.recast.recede.recent.recess.recharger.recipient.recital.recite.reckless.reclaim.recliner.reclining.recluse.reclusive.recognize.recoil.recollect.recolor.reconcile.reconfirm.reconvene.recopy.record.recount.recoup.recovery.recreate.rectal.rectangle.rectified.rectify.recycled.recycler.recycling.reemerge.reenact.reenter.reentry.reexamine.referable.referee.reference.refill.refinance.refined.refinery.refining.refinish.reflected.reflector.reflex.reflux.refocus.refold.reforest.reformat.reformed.reformer.reformist.refract.refrain.refreeze.refresh.refried.refueling.refund.refurbish.refurnish.refusal.refuse.refusing.refutable.refute.regain.regalia.regally.reggae.regime.region.register.registrar.registry.regress.regretful.regroup.regular.regulate.regulator.rehab.reheat.rehire.rehydrate.reimburse.reissue.reiterate.rejoice.rejoicing.rejoin.rekindle.relapse.relapsing.relatable.related.relation.relative.relax.relay.relearn.release.relenting.reliable.reliably.reliance.reliant.relic.relieve.relieving.relight.relish.relive.reload.relocate.relock.reluctant.rely.remake.remark.remarry.rematch.remedial.remedy.remember.reminder.remindful.remission.remix.remnant.remodeler.remold.remorse.remote.removable.removal.removed.remover.removing.rename.renderer.rendering.rendition.renegade.renewable.renewably.renewal.renewed.renounce.renovate.renovator.rentable.rental.rented.renter.reoccupy.reoccur.reopen.reorder.repackage.repacking.repaint.repair.repave.repaying.repayment.repeal.repeated.repeater.repent.rephrase.replace.replay.replica.reply.reporter.repose.repossess.repost.repressed.reprimand.reprint.reprise.reproach.reprocess.reproduce.reprogram.reps.reptile.reptilian.repugnant.repulsion.repulsive.repurpose.reputable.reputably.request.require.requisite.reroute.rerun.resale.resample.rescuer.reseal.research.reselect.reseller.resemble.resend.resent.reset.reshape.reshoot.reshuffle.residence.residency.resident.residual.residue.resigned.resilient.resistant.resisting.resize.resolute.resolved.resonant.resonate.resort.resource.respect.resubmit.result.resume.resupply.resurface.resurrect.retail.retainer.retaining.retake.retaliate.retention.rethink.retinal.retired.retiree.retiring.retold.retool.retorted.retouch.retrace.retract.retrain.retread.retreat.retrial.retrieval.retriever.retry.return.retying.retype.reunion.reunite.reusable.reuse.reveal.reveler.revenge.revenue.reverb.revered.reverence.reverend.reversal.reverse.reversing.reversion.revert.revisable.revise.revision.revisit.revivable.revival.reviver.reviving.revocable.revoke.revolt.revolver.revolving.reward.rewash.rewind.rewire.reword.rework.rewrap.rewrite.rhyme.ribbon.ribcage.rice.riches.richly.richness.rickety.ricotta.riddance.ridden.ride.riding.rifling.rift.rigging.rigid.rigor.rimless.rimmed.rind.rink.rinse.rinsing.riot.ripcord.ripeness.ripening.ripping.ripple.rippling.riptide.rise.rising.risk.risotto.ritalin.ritzy.rival.riverbank.riverbed.riverboat.riverside.riveter.riveting.roamer.roaming.roast.robbing.robe.robin.robotics.robust.rockband.rocker.rocket.rockfish.rockiness.rocking.rocklike.rockslide.rockstar.rocky.rogue.roman.romp.rope.roping.roster.rosy.rotten.rotting.rotunda.roulette.rounding.roundish.roundness.roundup.roundworm.routine.routing.rover.roving.royal.rubbed.rubber.rubbing.rubble.rubdown.ruby.ruckus.rudder.rug.ruined.rule.rumble.rumbling.rummage.rumor.runaround.rundown.runner.running.runny.runt.runway.rupture.rural.ruse.rush.rust.rut.sabbath.sabotage.sacrament.sacred.sacrifice.sadden.saddlebag.saddled.saddling.sadly.sadness.safari.safeguard.safehouse.safely.safeness.saffron.saga.sage.sagging.saggy.said.saint.sake.salad.salami.salaried.salary.saline.salon.saloon.salsa.salt.salutary.salute.salvage.salvaging.salvation.same.sample.sampling.sanction.sanctity.sanctuary.sandal.sandbag.sandbank.sandbar.sandblast.sandbox.sanded.sandfish.sanding.sandlot.sandpaper.sandpit.sandstone.sandstorm.sandworm.sandy.sanitary.sanitizer.sank.santa.sapling.sappiness.sappy.sarcasm.sarcastic.sardine.sash.sasquatch.sassy.satchel.satiable.satin.satirical.satisfied.satisfy.saturate.saturday.sauciness.saucy.sauna.savage.savanna.saved.savings.savior.savor.saxophone.say.scabbed.scabby.scalded.scalding.scale.scaling.scallion.scallop.scalping.scam.scandal.scanner.scanning.scant.scapegoat.scarce.scarcity.scarecrow.scared.scarf.scarily.scariness.scarring.scary.scavenger.scenic.schedule.schematic.scheme.scheming.schilling.schnapps.scholar.science.scientist.scion.scoff.scolding.scone.scoop.scooter.scope.scorch.scorebook.scorecard.scored.scoreless.scorer.scoring.scorn.scorpion.scotch.scoundrel.scoured.scouring.scouting.scouts.scowling.scrabble.scraggly.scrambled.scrambler.scrap.scratch.scrawny.screen.scribble.scribe.scribing.scrimmage.script.scroll.scrooge.scrounger.scrubbed.scrubber.scruffy.scrunch.scrutiny.scuba.scuff.sculptor.sculpture.scurvy.scuttle.secluded.secluding.seclusion.second.secrecy.secret.sectional.sector.secular.securely.security.sedan.sedate.sedation.sedative.sediment.seduce.seducing.segment.seismic.seizing.seldom.selected.selection.selective.selector.self.seltzer.semantic.semester.semicolon.semifinal.seminar.semisoft.semisweet.senate.senator.send.senior.senorita.sensation.sensitive.sensitize.sensually.sensuous.sepia.september.septic.septum.sequel.sequence.sequester.series.sermon.serotonin.serpent.serrated.serve.service.serving.sesame.sessions.setback.setting.settle.settling.setup.sevenfold.seventeen.seventh.seventy.severity.shabby.shack.shaded.shadily.shadiness.shading.shadow.shady.shaft.shakable.shakily.shakiness.shaking.shaky.shale.shallot.shallow.shame.shampoo.shamrock.shank.shanty.shape.shaping.share.sharpener.sharper.sharpie.sharply.sharpness.shawl.sheath.shed.sheep.sheet.shelf.shell.shelter.shelve.shelving.sherry.shield.shifter.shifting.shiftless.shifty.shimmer.shimmy.shindig.shine.shingle.shininess.shining.shiny.ship.shirt.shivering.shock.shone.shoplift.shopper.shopping.shoptalk.shore.shortage.shortcake.shortcut.shorten.shorter.shorthand.shortlist.shortly.shortness.shorts.shortwave.shorty.shout.shove.showbiz.showcase.showdown.shower.showgirl.showing.showman.shown.showoff.showpiece.showplace.showroom.showy.shrank.shrapnel.shredder.shredding.shrewdly.shriek.shrill.shrimp.shrine.shrink.shrivel.shrouded.shrubbery.shrubs.shrug.shrunk.shucking.shudder.shuffle.shuffling.shun.shush.shut.shy.siamese.siberian.sibling.siding.sierra.siesta.sift.sighing.silenced.silencer.silent.silica.silicon.silk.silliness.silly.silo.silt.silver.similarly.simile.simmering.simple.simplify.simply.sincere.sincerity.singer.singing.single.singular.sinister.sinless.sinner.sinuous.sip.siren.sister.sitcom.sitter.sitting.situated.situation.sixfold.sixteen.sixth.sixties.sixtieth.sixtyfold.sizable.sizably.size.sizing.sizzle.sizzling.skater.skating.skedaddle.skeletal.skeleton.skeptic.sketch.skewed.skewer.skid.skied.skier.skies.skiing.skilled.skillet.skillful.skimmed.skimmer.skimming.skimpily.skincare.skinhead.skinless.skinning.skinny.skintight.skipper.skipping.skirmish.skirt.skittle.skydiver.skylight.skyline.skype.skyrocket.skyward.slab.slacked.slacker.slacking.slackness.slacks.slain.slam.slander.slang.slapping.slapstick.slashed.slashing.slate.slather.slaw.sled.sleek.sleep.sleet.sleeve.slept.sliceable.sliced.slicer.slicing.slick.slider.slideshow.sliding.slighted.slighting.slightly.slimness.slimy.slinging.slingshot.slinky.slip.slit.sliver.slobbery.slogan.sloped.sloping.sloppily.sloppy.slot.slouching.slouchy.sludge.slug.slum.slurp.slush.sly.small.smartly.smartness.smasher.smashing.smashup.smell.smelting.smile.smilingly.smirk.smite.smith.smitten.smock.smog.smoked.smokeless.smokiness.smoking.smoky.smolder.smooth.smother.smudge.smudgy.smuggler.smuggling.smugly.smugness.snack.snagged.snaking.snap.snare.snarl.snazzy.sneak.sneer.sneeze.sneezing.snide.sniff.snippet.snipping.snitch.snooper.snooze.snore.snoring.snorkel.snort.snout.snowbird.snowboard.snowbound.snowcap.snowdrift.snowdrop.snowfall.snowfield.snowflake.snowiness.snowless.snowman.snowplow.snowshoe.snowstorm.snowsuit.snowy.snub.snuff.snuggle.snugly.snugness.speak.spearfish.spearhead.spearman.spearmint.species.specimen.specked.speckled.specks.spectacle.spectator.spectrum.speculate.speech.speed.spellbind.speller.spelling.spendable.spender.spending.spent.spew.sphere.spherical.sphinx.spider.spied.spiffy.spill.spilt.spinach.spinal.spindle.spinner.spinning.spinout.spinster.spiny.spiral.spirited.spiritism.spirits.spiritual.splashed.splashing.splashy.splatter.spleen.splendid.splendor.splice.splicing.splinter.splotchy.splurge.spoilage.spoiled.spoiler.spoiling.spoils.spoken.spokesman.sponge.spongy.sponsor.spoof.spookily.spooky.spool.spoon.spore.sporting.sports.sporty.spotless.spotlight.spotted.spotter.spotting.spotty.spousal.spouse.spout.sprain.sprang.sprawl.spray.spree.sprig.spring.sprinkled.sprinkler.sprint.sprite.sprout.spruce.sprung.spry.spud.spur.sputter.spyglass.squabble.squad.squall.squander.squash.squatted.squatter.squatting.squeak.squealer.squealing.squeamish.squeegee.squeeze.squeezing.squid.squiggle.squiggly.squint.squire.squirt.squishier.squishy.stability.stabilize.stable.stack.stadium.staff.stage.staging.stagnant.stagnate.stainable.stained.staining.stainless.stalemate.staleness.stalling.stallion.stamina.stammer.stamp.stand.stank.staple.stapling.starboard.starch.stardom.stardust.starfish.stargazer.staring.stark.starless.starlet.starlight.starlit.starring.starry.starship.starter.starting.startle.startling.startup.starved.starving.stash.state.static.statistic.statue.stature.status.statute.statutory.staunch.stays.steadfast.steadier.steadily.steadying.steam.steed.steep.steerable.steering.steersman.stegosaur.stellar.stem.stench.stencil.step.stereo.sterile.sterility.sterilize.sterling.sternness.sternum.stew.stick.stiffen.stiffly.stiffness.stifle.stifling.stillness.stilt.stimulant.stimulate.stimuli.stimulus.stinger.stingily.stinging.stingray.stingy.stinking.stinky.stipend.stipulate.stir.stitch.stock.stoic.stoke.stole.stomp.stonewall.stoneware.stonework.stoning.stony.stood.stooge.stool.stoop.stoplight.stoppable.stoppage.stopped.stopper.stopping.stopwatch.storable.storage.storeroom.storewide.storm.stout.stove.stowaway.stowing.straddle.straggler.strained.strainer.straining.strangely.stranger.strangle.strategic.strategy.stratus.straw.stray.streak.stream.street.strength.strenuous.strep.stress.stretch.strewn.stricken.strict.stride.strife.strike.striking.strive.striving.strobe.strode.stroller.strongbox.strongly.strongman.struck.structure.strudel.struggle.strum.strung.strut.stubbed.stubble.stubbly.stubborn.stucco.stuck.student.studied.studio.study.stuffed.stuffing.stuffy.stumble.stumbling.stump.stung.stunned.stunner.stunning.stunt.stupor.sturdily.sturdy.styling.stylishly.stylist.stylized.stylus.suave.subarctic.subatomic.subdivide.subdued.subduing.subfloor.subgroup.subheader.subject.sublease.sublet.sublevel.sublime.submarine.submerge.submersed.submitter.subpanel.subpar.subplot.subprime.subscribe.subscript.subsector.subside.subsiding.subsidize.subsidy.subsoil.subsonic.substance.subsystem.subtext.subtitle.subtly.subtotal.subtract.subtype.suburb.subway.subwoofer.subzero.succulent.such.suction.sudden.sudoku.suds.sufferer.suffering.suffice.suffix.suffocate.suffrage.sugar.suggest.suing.suitable.suitably.suitcase.suitor.sulfate.sulfide.sulfite.sulfur.sulk.sullen.sulphate.sulphuric.sultry.superbowl.superglue.superhero.superior.superjet.superman.supermom.supernova.supervise.supper.supplier.supply.support.supremacy.supreme.surcharge.surely.sureness.surface.surfacing.surfboard.surfer.surgery.surgical.surging.surname.surpass.surplus.surprise.surreal.surrender.surrogate.surround.survey.survival.survive.surviving.survivor.sushi.suspect.suspend.suspense.sustained.sustainer.swab.swaddling.swagger.swampland.swan.swapping.swarm.sway.swear.sweat.sweep.swell.swept.swerve.swifter.swiftly.swiftness.swimmable.swimmer.swimming.swimsuit.swimwear.swinger.swinging.swipe.swirl.switch.swivel.swizzle.swooned.swoop.swoosh.swore.sworn.swung.sycamore.sympathy.symphonic.symphony.symptom.synapse.syndrome.synergy.synopses.synopsis.synthesis.synthetic.syrup.system.t-shirt.tabasco.tabby.tableful.tables.tablet.tableware.tabloid.tackiness.tacking.tackle.tackling.tacky.taco.tactful.tactical.tactics.tactile.tactless.tadpole.taekwondo.tag.tainted.take.taking.talcum.talisman.tall.talon.tamale.tameness.tamer.tamper.tank.tanned.tannery.tanning.tantrum.tapeless.tapered.tapering.tapestry.tapioca.tapping.taps.tarantula.target.tarmac.tarnish.tarot.tartar.tartly.tartness.task.tassel.taste.tastiness.tasting.tasty.tattered.tattle.tattling.tattoo.taunt.tavern.thank.that.thaw.theater.theatrics.thee.theft.theme.theology.theorize.thermal.thermos.thesaurus.these.thesis.thespian.thicken.thicket.thickness.thieving.thievish.thigh.thimble.thing.think.thinly.thinner.thinness.thinning.thirstily.thirsting.thirsty.thirteen.thirty.thong.thorn.those.thousand.thrash.thread.threaten.threefold.thrift.thrill.thrive.thriving.throat.throbbing.throng.throttle.throwaway.throwback.thrower.throwing.thud.thumb.thumping.thursday.thus.thwarting.thyself.tiara.tibia.tidal.tidbit.tidiness.tidings.tidy.tiger.tighten.tightly.tightness.tightrope.tightwad.tigress.tile.tiling.till.tilt.timid.timing.timothy.tinderbox.tinfoil.tingle.tingling.tingly.tinker.tinkling.tinsel.tinsmith.tint.tinwork.tiny.tipoff.tipped.tipper.tipping.tiptoeing.tiptop.tiring.tissue.trace.tracing.track.traction.tractor.trade.trading.tradition.traffic.tragedy.trailing.trailside.train.traitor.trance.tranquil.transfer.transform.translate.transpire.transport.transpose.trapdoor.trapeze.trapezoid.trapped.trapper.trapping.traps.trash.travel.traverse.travesty.tray.treachery.treading.treadmill.treason.treat.treble.tree.trekker.tremble.trembling.tremor.trench.trend.trespass.triage.trial.triangle.tribesman.tribunal.tribune.tributary.tribute.triceps.trickery.trickily.tricking.trickle.trickster.tricky.tricolor.tricycle.trident.tried.trifle.trifocals.trillion.trilogy.trimester.trimmer.trimming.trimness.trinity.trio.tripod.tripping.triumph.trivial.trodden.trolling.trombone.trophy.tropical.tropics.trouble.troubling.trough.trousers.trout.trowel.truce.truck.truffle.trump.trunks.trustable.trustee.trustful.trusting.trustless.truth.try.tubby.tubeless.tubular.tucking.tuesday.tug.tuition.tulip.tumble.tumbling.tummy.turban.turbine.turbofan.turbojet.turbulent.turf.turkey.turmoil.turret.turtle.tusk.tutor.tutu.tux.tweak.tweed.tweet.tweezers.twelve.twentieth.twenty.twerp.twice.twiddle.twiddling.twig.twilight.twine.twins.twirl.twistable.twisted.twister.twisting.twisty.twitch.twitter.tycoon.tying.tyke.udder.ultimate.ultimatum.ultra.umbilical.umbrella.umpire.unabashed.unable.unadorned.unadvised.unafraid.unaired.unaligned.unaltered.unarmored.unashamed.unaudited.unawake.unaware.unbaked.unbalance.unbeaten.unbend.unbent.unbiased.unbitten.unblended.unblessed.unblock.unbolted.unbounded.unboxed.unbraided.unbridle.unbroken.unbuckled.unbundle.unburned.unbutton.uncanny.uncapped.uncaring.uncertain.unchain.unchanged.uncharted.uncheck.uncivil.unclad.unclaimed.unclamped.unclasp.uncle.unclip.uncloak.unclog.unclothed.uncoated.uncoiled.uncolored.uncombed.uncommon.uncooked.uncork.uncorrupt.uncounted.uncouple.uncouth.uncover.uncross.uncrown.uncrushed.uncured.uncurious.uncurled.uncut.undamaged.undated.undaunted.undead.undecided.undefined.underage.underarm.undercoat.undercook.undercut.underdog.underdone.underfed.underfeed.underfoot.undergo.undergrad.underhand.underline.underling.undermine.undermost.underpaid.underpass.underpay.underrate.undertake.undertone.undertook.undertow.underuse.underwear.underwent.underwire.undesired.undiluted.undivided.undocked.undoing.undone.undrafted.undress.undrilled.undusted.undying.unearned.unearth.unease.uneasily.uneasy.uneatable.uneaten.unedited.unelected.unending.unengaged.unenvied.unequal.unethical.uneven.unexpired.unexposed.unfailing.unfair.unfasten.unfazed.unfeeling.unfiled.unfilled.unfitted.unfitting.unfixable.unfixed.unflawed.unfocused.unfold.unfounded.unframed.unfreeze.unfrosted.unfrozen.unfunded.unglazed.ungloved.unglue.ungodly.ungraded.ungreased.unguarded.unguided.unhappily.unhappy.unharmed.unhealthy.unheard.unhearing.unheated.unhelpful.unhidden.unhinge.unhitched.unholy.unhook.unicorn.unicycle.unified.unifier.uniformed.uniformly.unify.unimpeded.uninjured.uninstall.uninsured.uninvited.union.uniquely.unisexual.unison.unissued.unit.universal.universe.unjustly.unkempt.unkind.unknotted.unknowing.unknown.unlaced.unlatch.unlawful.unleaded.unlearned.unleash.unless.unleveled.unlighted.unlikable.unlimited.unlined.unlinked.unlisted.unlit.unlivable.unloaded.unloader.unlocked.unlocking.unlovable.unloved.unlovely.unloving.unluckily.unlucky.unmade.unmanaged.unmanned.unmapped.unmarked.unmasked.unmasking.unmatched.unmindful.unmixable.unmixed.unmolded.unmoral.unmovable.unmoved.unmoving.unnamable.unnamed.unnatural.unneeded.unnerve.unnerving.unnoticed.unopened.unopposed.unpack.unpadded.unpaid.unpainted.unpaired.unpaved.unpeeled.unpicked.unpiloted.unpinned.unplanned.unplanted.unpleased.unpledged.unplowed.unplug.unpopular.unproven.unquote.unranked.unrated.unraveled.unreached.unread.unreal.unreeling.unrefined.unrelated.unrented.unrest.unretired.unrevised.unrigged.unripe.unrivaled.unroasted.unrobed.unroll.unruffled.unruly.unrushed.unsaddle.unsafe.unsaid.unsalted.unsaved.unsavory.unscathed.unscented.unscrew.unsealed.unseated.unsecured.unseeing.unseemly.unseen.unselect.unselfish.unsent.unsettled.unshackle.unshaken.unshaved.unshaven.unsheathe.unshipped.unsightly.unsigned.unskilled.unsliced.unsmooth.unsnap.unsocial.unsoiled.unsold.unsolved.unsorted.unspoiled.unspoken.unstable.unstaffed.unstamped.unsteady.unsterile.unstirred.unstitch.unstopped.unstuck.unstuffed.unstylish.unsubtle.unsubtly.unsuited.unsure.unsworn.untagged.untainted.untaken.untamed.untangled.untapped.untaxed.unthawed.unthread.untidy.untie.until.untimed.untimely.untitled.untoasted.untold.untouched.untracked.untrained.untreated.untried.untrimmed.untrue.untruth.unturned.untwist.untying.unusable.unused.unusual.unvalued.unvaried.unvarying.unveiled.unveiling.unvented.unviable.unvisited.unvocal.unwanted.unwarlike.unwary.unwashed.unwatched.unweave.unwed.unwelcome.unwell.unwieldy.unwilling.unwind.unwired.unwitting.unwomanly.unworldly.unworn.unworried.unworthy.unwound.unwoven.unwrapped.unwritten.unzip.upbeat.upchuck.upcoming.upcountry.update.upfront.upgrade.upheaval.upheld.uphill.uphold.uplifted.uplifting.upload.upon.upper.upright.uprising.upriver.uproar.uproot.upscale.upside.upstage.upstairs.upstart.upstate.upstream.upstroke.upswing.uptake.uptight.uptown.upturned.upward.upwind.uranium.urban.urchin.urethane.urgency.urgent.urging.urologist.urology.usable.usage.useable.used.uselessly.user.usher.usual.utensil.utility.utilize.utmost.utopia.utter.vacancy.vacant.vacate.vacation.vagabond.vagrancy.vagrantly.vaguely.vagueness.valiant.valid.valium.valley.valuables.value.vanilla.vanish.vanity.vanquish.vantage.vaporizer.variable.variably.varied.variety.various.varmint.varnish.varsity.varying.vascular.vaseline.vastly.vastness.veal.vegan.veggie.vehicular.velcro.velocity.velvet.vendetta.vending.vendor.veneering.vengeful.venomous.ventricle.venture.venue.venus.verbalize.verbally.verbose.verdict.verify.verse.version.versus.vertebrae.vertical.vertigo.very.vessel.vest.veteran.veto.vexingly.viability.viable.vibes.vice.vicinity.victory.video.viewable.viewer.viewing.viewless.viewpoint.vigorous.village.villain.vindicate.vineyard.vintage.violate.violation.violator.violet.violin.viper.viral.virtual.virtuous.virus.visa.viscosity.viscous.viselike.visible.visibly.vision.visiting.visitor.visor.vista.vitality.vitalize.vitally.vitamins.vivacious.vividly.vividness.vixen.vocalist.vocalize.vocally.vocation.voice.voicing.void.volatile.volley.voltage.volumes.voter.voting.voucher.vowed.vowel.voyage.wackiness.wad.wafer.waffle.waged.wager.wages.waggle.wagon.wake.waking.walk.walmart.walnut.walrus.waltz.wand.wannabe.wanted.wanting.wasabi.washable.washbasin.washboard.washbowl.washcloth.washday.washed.washer.washhouse.washing.washout.washroom.washstand.washtub.wasp.wasting.watch.water.waviness.waving.wavy.whacking.whacky.wham.wharf.wheat.whenever.whiff.whimsical.whinny.whiny.whisking.whoever.whole.whomever.whoopee.whooping.whoops.why.wick.widely.widen.widget.widow.width.wieldable.wielder.wife.wifi.wikipedia.wildcard.wildcat.wilder.wildfire.wildfowl.wildland.wildlife.wildly.wildness.willed.willfully.willing.willow.willpower.wilt.wimp.wince.wincing.wind.wing.winking.winner.winnings.winter.wipe.wired.wireless.wiring.wiry.wisdom.wise.wish.wisplike.wispy.wistful.wizard.wobble.wobbling.wobbly.wok.wolf.wolverine.womanhood.womankind.womanless.womanlike.womanly.womb.woof.wooing.wool.woozy.word.work.worried.worrier.worrisome.worry.worsening.worshiper.worst.wound.woven.wow.wrangle.wrath.wreath.wreckage.wrecker.wrecking.wrench.wriggle.wriggly.wrinkle.wrinkly.wrist.writing.written.wrongdoer.wronged.wrongful.wrongly.wrongness.wrought.xbox.xerox.yahoo.yam.yanking.yapping.yard.yarn.yeah.yearbook.yearling.yearly.yearning.yeast.yelling.yelp.yen.yesterday.yiddish.yield.yin.yippee.yo-yo.yodel.yoga.yogurt.yonder.yoyo.yummy.zap.zealous.zebra.zen.zeppelin.zero.zestfully.zesty.zigzagged.zipfile.zipping.zippy.zips.zit.zodiac.zombie.zone.zoning.zookeeper.zoologist.zoology.zoom`.split(`.`);
})), E = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.newSecureWords = void 0;
  let t2 = w(), n2 = T();
  async function r2(e3 = 6) {
    let r3 = [];
    for (let i2 = 0; i2 < e3; i2++) r3.push(n2.wordlist[await (0, t2.getSecureRandomNumber)(0, n2.wordlist.length)]);
    return r3;
  }
  e2.newSecureWords = r2;
})), D = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.newSecurePassphrase = void 0;
  let t2 = I();
  async function n2(e3 = 6) {
    return (await (0, t2.newSecureWords)(e3)).join(`-`);
  }
  e2.newSecurePassphrase = n2;
})), O = i(((e2, n2) => {
  (function(e3) {
    var n3 = function(e4) {
      var t2, n4 = new Float64Array(16);
      if (e4) for (t2 = 0; t2 < e4.length; t2++) n4[t2] = e4[t2];
      return n4;
    }, r2 = function() {
      throw Error(`no PRNG`);
    }, i2 = new Uint8Array(16), a2 = new Uint8Array(32);
    a2[0] = 9;
    var o2 = n3(), s2 = n3([1]), c2 = n3([56129, 1]), l2 = n3([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), u2 = n3([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), f2 = n3([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), p2 = n3([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), m2 = n3([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function h2(e4, t2, n4, r3) {
      e4[t2] = n4 >> 24 & 255, e4[t2 + 1] = n4 >> 16 & 255, e4[t2 + 2] = n4 >> 8 & 255, e4[t2 + 3] = n4 & 255, e4[t2 + 4] = r3 >> 24 & 255, e4[t2 + 5] = r3 >> 16 & 255, e4[t2 + 6] = r3 >> 8 & 255, e4[t2 + 7] = r3 & 255;
    }
    function g2(e4, t2, n4, r3, i3) {
      var a3, o3 = 0;
      for (a3 = 0; a3 < i3; a3++) o3 |= e4[t2 + a3] ^ n4[r3 + a3];
      return (1 & o3 - 1 >>> 8) - 1;
    }
    function _2(e4, t2, n4, r3) {
      return g2(e4, t2, n4, r3, 16);
    }
    function v2(e4, t2, n4, r3) {
      return g2(e4, t2, n4, r3, 32);
    }
    function y2(e4, t2, n4, r3) {
      for (var i3 = r3[0] & 255 | (r3[1] & 255) << 8 | (r3[2] & 255) << 16 | (r3[3] & 255) << 24, a3 = n4[0] & 255 | (n4[1] & 255) << 8 | (n4[2] & 255) << 16 | (n4[3] & 255) << 24, o3 = n4[4] & 255 | (n4[5] & 255) << 8 | (n4[6] & 255) << 16 | (n4[7] & 255) << 24, s3 = n4[8] & 255 | (n4[9] & 255) << 8 | (n4[10] & 255) << 16 | (n4[11] & 255) << 24, c3 = n4[12] & 255 | (n4[13] & 255) << 8 | (n4[14] & 255) << 16 | (n4[15] & 255) << 24, l3 = r3[4] & 255 | (r3[5] & 255) << 8 | (r3[6] & 255) << 16 | (r3[7] & 255) << 24, u3 = t2[0] & 255 | (t2[1] & 255) << 8 | (t2[2] & 255) << 16 | (t2[3] & 255) << 24, d2 = t2[4] & 255 | (t2[5] & 255) << 8 | (t2[6] & 255) << 16 | (t2[7] & 255) << 24, f3 = t2[8] & 255 | (t2[9] & 255) << 8 | (t2[10] & 255) << 16 | (t2[11] & 255) << 24, p3 = t2[12] & 255 | (t2[13] & 255) << 8 | (t2[14] & 255) << 16 | (t2[15] & 255) << 24, m3 = r3[8] & 255 | (r3[9] & 255) << 8 | (r3[10] & 255) << 16 | (r3[11] & 255) << 24, h3 = n4[16] & 255 | (n4[17] & 255) << 8 | (n4[18] & 255) << 16 | (n4[19] & 255) << 24, g3 = n4[20] & 255 | (n4[21] & 255) << 8 | (n4[22] & 255) << 16 | (n4[23] & 255) << 24, _3 = n4[24] & 255 | (n4[25] & 255) << 8 | (n4[26] & 255) << 16 | (n4[27] & 255) << 24, v3 = n4[28] & 255 | (n4[29] & 255) << 8 | (n4[30] & 255) << 16 | (n4[31] & 255) << 24, y3 = r3[12] & 255 | (r3[13] & 255) << 8 | (r3[14] & 255) << 16 | (r3[15] & 255) << 24, b3 = i3, x3 = a3, S3 = o3, C3 = s3, w3 = c3, T3 = l3, E3 = u3, D3 = d2, O3 = f3, k3 = p3, A3 = m3, j3 = h3, M3 = g3, N3 = _3, P3 = v3, F3 = y3, I3, L3 = 0; L3 < 20; L3 += 2) I3 = b3 + M3 | 0, w3 ^= I3 << 7 | I3 >>> 25, I3 = w3 + b3 | 0, O3 ^= I3 << 9 | I3 >>> 23, I3 = O3 + w3 | 0, M3 ^= I3 << 13 | I3 >>> 19, I3 = M3 + O3 | 0, b3 ^= I3 << 18 | I3 >>> 14, I3 = T3 + x3 | 0, k3 ^= I3 << 7 | I3 >>> 25, I3 = k3 + T3 | 0, N3 ^= I3 << 9 | I3 >>> 23, I3 = N3 + k3 | 0, x3 ^= I3 << 13 | I3 >>> 19, I3 = x3 + N3 | 0, T3 ^= I3 << 18 | I3 >>> 14, I3 = A3 + E3 | 0, P3 ^= I3 << 7 | I3 >>> 25, I3 = P3 + A3 | 0, S3 ^= I3 << 9 | I3 >>> 23, I3 = S3 + P3 | 0, E3 ^= I3 << 13 | I3 >>> 19, I3 = E3 + S3 | 0, A3 ^= I3 << 18 | I3 >>> 14, I3 = F3 + j3 | 0, C3 ^= I3 << 7 | I3 >>> 25, I3 = C3 + F3 | 0, D3 ^= I3 << 9 | I3 >>> 23, I3 = D3 + C3 | 0, j3 ^= I3 << 13 | I3 >>> 19, I3 = j3 + D3 | 0, F3 ^= I3 << 18 | I3 >>> 14, I3 = b3 + C3 | 0, x3 ^= I3 << 7 | I3 >>> 25, I3 = x3 + b3 | 0, S3 ^= I3 << 9 | I3 >>> 23, I3 = S3 + x3 | 0, C3 ^= I3 << 13 | I3 >>> 19, I3 = C3 + S3 | 0, b3 ^= I3 << 18 | I3 >>> 14, I3 = T3 + w3 | 0, E3 ^= I3 << 7 | I3 >>> 25, I3 = E3 + T3 | 0, D3 ^= I3 << 9 | I3 >>> 23, I3 = D3 + E3 | 0, w3 ^= I3 << 13 | I3 >>> 19, I3 = w3 + D3 | 0, T3 ^= I3 << 18 | I3 >>> 14, I3 = A3 + k3 | 0, j3 ^= I3 << 7 | I3 >>> 25, I3 = j3 + A3 | 0, O3 ^= I3 << 9 | I3 >>> 23, I3 = O3 + j3 | 0, k3 ^= I3 << 13 | I3 >>> 19, I3 = k3 + O3 | 0, A3 ^= I3 << 18 | I3 >>> 14, I3 = F3 + P3 | 0, M3 ^= I3 << 7 | I3 >>> 25, I3 = M3 + F3 | 0, N3 ^= I3 << 9 | I3 >>> 23, I3 = N3 + M3 | 0, P3 ^= I3 << 13 | I3 >>> 19, I3 = P3 + N3 | 0, F3 ^= I3 << 18 | I3 >>> 14;
      b3 = b3 + i3 | 0, x3 = x3 + a3 | 0, S3 = S3 + o3 | 0, C3 = C3 + s3 | 0, w3 = w3 + c3 | 0, T3 = T3 + l3 | 0, E3 = E3 + u3 | 0, D3 = D3 + d2 | 0, O3 = O3 + f3 | 0, k3 = k3 + p3 | 0, A3 = A3 + m3 | 0, j3 = j3 + h3 | 0, M3 = M3 + g3 | 0, N3 = N3 + _3 | 0, P3 = P3 + v3 | 0, F3 = F3 + y3 | 0, e4[0] = b3 >>> 0 & 255, e4[1] = b3 >>> 8 & 255, e4[2] = b3 >>> 16 & 255, e4[3] = b3 >>> 24 & 255, e4[4] = x3 >>> 0 & 255, e4[5] = x3 >>> 8 & 255, e4[6] = x3 >>> 16 & 255, e4[7] = x3 >>> 24 & 255, e4[8] = S3 >>> 0 & 255, e4[9] = S3 >>> 8 & 255, e4[10] = S3 >>> 16 & 255, e4[11] = S3 >>> 24 & 255, e4[12] = C3 >>> 0 & 255, e4[13] = C3 >>> 8 & 255, e4[14] = C3 >>> 16 & 255, e4[15] = C3 >>> 24 & 255, e4[16] = w3 >>> 0 & 255, e4[17] = w3 >>> 8 & 255, e4[18] = w3 >>> 16 & 255, e4[19] = w3 >>> 24 & 255, e4[20] = T3 >>> 0 & 255, e4[21] = T3 >>> 8 & 255, e4[22] = T3 >>> 16 & 255, e4[23] = T3 >>> 24 & 255, e4[24] = E3 >>> 0 & 255, e4[25] = E3 >>> 8 & 255, e4[26] = E3 >>> 16 & 255, e4[27] = E3 >>> 24 & 255, e4[28] = D3 >>> 0 & 255, e4[29] = D3 >>> 8 & 255, e4[30] = D3 >>> 16 & 255, e4[31] = D3 >>> 24 & 255, e4[32] = O3 >>> 0 & 255, e4[33] = O3 >>> 8 & 255, e4[34] = O3 >>> 16 & 255, e4[35] = O3 >>> 24 & 255, e4[36] = k3 >>> 0 & 255, e4[37] = k3 >>> 8 & 255, e4[38] = k3 >>> 16 & 255, e4[39] = k3 >>> 24 & 255, e4[40] = A3 >>> 0 & 255, e4[41] = A3 >>> 8 & 255, e4[42] = A3 >>> 16 & 255, e4[43] = A3 >>> 24 & 255, e4[44] = j3 >>> 0 & 255, e4[45] = j3 >>> 8 & 255, e4[46] = j3 >>> 16 & 255, e4[47] = j3 >>> 24 & 255, e4[48] = M3 >>> 0 & 255, e4[49] = M3 >>> 8 & 255, e4[50] = M3 >>> 16 & 255, e4[51] = M3 >>> 24 & 255, e4[52] = N3 >>> 0 & 255, e4[53] = N3 >>> 8 & 255, e4[54] = N3 >>> 16 & 255, e4[55] = N3 >>> 24 & 255, e4[56] = P3 >>> 0 & 255, e4[57] = P3 >>> 8 & 255, e4[58] = P3 >>> 16 & 255, e4[59] = P3 >>> 24 & 255, e4[60] = F3 >>> 0 & 255, e4[61] = F3 >>> 8 & 255, e4[62] = F3 >>> 16 & 255, e4[63] = F3 >>> 24 & 255;
    }
    function b2(e4, t2, n4, r3) {
      for (var i3 = r3[0] & 255 | (r3[1] & 255) << 8 | (r3[2] & 255) << 16 | (r3[3] & 255) << 24, a3 = n4[0] & 255 | (n4[1] & 255) << 8 | (n4[2] & 255) << 16 | (n4[3] & 255) << 24, o3 = n4[4] & 255 | (n4[5] & 255) << 8 | (n4[6] & 255) << 16 | (n4[7] & 255) << 24, s3 = n4[8] & 255 | (n4[9] & 255) << 8 | (n4[10] & 255) << 16 | (n4[11] & 255) << 24, c3 = n4[12] & 255 | (n4[13] & 255) << 8 | (n4[14] & 255) << 16 | (n4[15] & 255) << 24, l3 = r3[4] & 255 | (r3[5] & 255) << 8 | (r3[6] & 255) << 16 | (r3[7] & 255) << 24, u3 = t2[0] & 255 | (t2[1] & 255) << 8 | (t2[2] & 255) << 16 | (t2[3] & 255) << 24, d2 = t2[4] & 255 | (t2[5] & 255) << 8 | (t2[6] & 255) << 16 | (t2[7] & 255) << 24, f3 = t2[8] & 255 | (t2[9] & 255) << 8 | (t2[10] & 255) << 16 | (t2[11] & 255) << 24, p3 = t2[12] & 255 | (t2[13] & 255) << 8 | (t2[14] & 255) << 16 | (t2[15] & 255) << 24, m3 = r3[8] & 255 | (r3[9] & 255) << 8 | (r3[10] & 255) << 16 | (r3[11] & 255) << 24, h3 = n4[16] & 255 | (n4[17] & 255) << 8 | (n4[18] & 255) << 16 | (n4[19] & 255) << 24, g3 = n4[20] & 255 | (n4[21] & 255) << 8 | (n4[22] & 255) << 16 | (n4[23] & 255) << 24, _3 = n4[24] & 255 | (n4[25] & 255) << 8 | (n4[26] & 255) << 16 | (n4[27] & 255) << 24, v3 = n4[28] & 255 | (n4[29] & 255) << 8 | (n4[30] & 255) << 16 | (n4[31] & 255) << 24, y3 = r3[12] & 255 | (r3[13] & 255) << 8 | (r3[14] & 255) << 16 | (r3[15] & 255) << 24, b3 = i3, x3 = a3, S3 = o3, C3 = s3, w3 = c3, T3 = l3, E3 = u3, D3 = d2, O3 = f3, k3 = p3, A3 = m3, j3 = h3, M3 = g3, N3 = _3, P3 = v3, F3 = y3, I3, L3 = 0; L3 < 20; L3 += 2) I3 = b3 + M3 | 0, w3 ^= I3 << 7 | I3 >>> 25, I3 = w3 + b3 | 0, O3 ^= I3 << 9 | I3 >>> 23, I3 = O3 + w3 | 0, M3 ^= I3 << 13 | I3 >>> 19, I3 = M3 + O3 | 0, b3 ^= I3 << 18 | I3 >>> 14, I3 = T3 + x3 | 0, k3 ^= I3 << 7 | I3 >>> 25, I3 = k3 + T3 | 0, N3 ^= I3 << 9 | I3 >>> 23, I3 = N3 + k3 | 0, x3 ^= I3 << 13 | I3 >>> 19, I3 = x3 + N3 | 0, T3 ^= I3 << 18 | I3 >>> 14, I3 = A3 + E3 | 0, P3 ^= I3 << 7 | I3 >>> 25, I3 = P3 + A3 | 0, S3 ^= I3 << 9 | I3 >>> 23, I3 = S3 + P3 | 0, E3 ^= I3 << 13 | I3 >>> 19, I3 = E3 + S3 | 0, A3 ^= I3 << 18 | I3 >>> 14, I3 = F3 + j3 | 0, C3 ^= I3 << 7 | I3 >>> 25, I3 = C3 + F3 | 0, D3 ^= I3 << 9 | I3 >>> 23, I3 = D3 + C3 | 0, j3 ^= I3 << 13 | I3 >>> 19, I3 = j3 + D3 | 0, F3 ^= I3 << 18 | I3 >>> 14, I3 = b3 + C3 | 0, x3 ^= I3 << 7 | I3 >>> 25, I3 = x3 + b3 | 0, S3 ^= I3 << 9 | I3 >>> 23, I3 = S3 + x3 | 0, C3 ^= I3 << 13 | I3 >>> 19, I3 = C3 + S3 | 0, b3 ^= I3 << 18 | I3 >>> 14, I3 = T3 + w3 | 0, E3 ^= I3 << 7 | I3 >>> 25, I3 = E3 + T3 | 0, D3 ^= I3 << 9 | I3 >>> 23, I3 = D3 + E3 | 0, w3 ^= I3 << 13 | I3 >>> 19, I3 = w3 + D3 | 0, T3 ^= I3 << 18 | I3 >>> 14, I3 = A3 + k3 | 0, j3 ^= I3 << 7 | I3 >>> 25, I3 = j3 + A3 | 0, O3 ^= I3 << 9 | I3 >>> 23, I3 = O3 + j3 | 0, k3 ^= I3 << 13 | I3 >>> 19, I3 = k3 + O3 | 0, A3 ^= I3 << 18 | I3 >>> 14, I3 = F3 + P3 | 0, M3 ^= I3 << 7 | I3 >>> 25, I3 = M3 + F3 | 0, N3 ^= I3 << 9 | I3 >>> 23, I3 = N3 + M3 | 0, P3 ^= I3 << 13 | I3 >>> 19, I3 = P3 + N3 | 0, F3 ^= I3 << 18 | I3 >>> 14;
      e4[0] = b3 >>> 0 & 255, e4[1] = b3 >>> 8 & 255, e4[2] = b3 >>> 16 & 255, e4[3] = b3 >>> 24 & 255, e4[4] = T3 >>> 0 & 255, e4[5] = T3 >>> 8 & 255, e4[6] = T3 >>> 16 & 255, e4[7] = T3 >>> 24 & 255, e4[8] = A3 >>> 0 & 255, e4[9] = A3 >>> 8 & 255, e4[10] = A3 >>> 16 & 255, e4[11] = A3 >>> 24 & 255, e4[12] = F3 >>> 0 & 255, e4[13] = F3 >>> 8 & 255, e4[14] = F3 >>> 16 & 255, e4[15] = F3 >>> 24 & 255, e4[16] = E3 >>> 0 & 255, e4[17] = E3 >>> 8 & 255, e4[18] = E3 >>> 16 & 255, e4[19] = E3 >>> 24 & 255, e4[20] = D3 >>> 0 & 255, e4[21] = D3 >>> 8 & 255, e4[22] = D3 >>> 16 & 255, e4[23] = D3 >>> 24 & 255, e4[24] = O3 >>> 0 & 255, e4[25] = O3 >>> 8 & 255, e4[26] = O3 >>> 16 & 255, e4[27] = O3 >>> 24 & 255, e4[28] = k3 >>> 0 & 255, e4[29] = k3 >>> 8 & 255, e4[30] = k3 >>> 16 & 255, e4[31] = k3 >>> 24 & 255;
    }
    function x2(e4, t2, n4, r3) {
      y2(e4, t2, n4, r3);
    }
    function S2(e4, t2, n4, r3) {
      b2(e4, t2, n4, r3);
    }
    var C2 = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function w2(e4, t2, n4, r3, i3, a3, o3) {
      var s3 = new Uint8Array(16), c3 = new Uint8Array(64), l3, u3;
      for (u3 = 0; u3 < 16; u3++) s3[u3] = 0;
      for (u3 = 0; u3 < 8; u3++) s3[u3] = a3[u3];
      for (; i3 >= 64; ) {
        for (x2(c3, s3, o3, C2), u3 = 0; u3 < 64; u3++) e4[t2 + u3] = n4[r3 + u3] ^ c3[u3];
        for (l3 = 1, u3 = 8; u3 < 16; u3++) l3 = l3 + (s3[u3] & 255) | 0, s3[u3] = l3 & 255, l3 >>>= 8;
        i3 -= 64, t2 += 64, r3 += 64;
      }
      if (i3 > 0) for (x2(c3, s3, o3, C2), u3 = 0; u3 < i3; u3++) e4[t2 + u3] = n4[r3 + u3] ^ c3[u3];
      return 0;
    }
    function T2(e4, t2, n4, r3, i3) {
      var a3 = new Uint8Array(16), o3 = new Uint8Array(64), s3, c3;
      for (c3 = 0; c3 < 16; c3++) a3[c3] = 0;
      for (c3 = 0; c3 < 8; c3++) a3[c3] = r3[c3];
      for (; n4 >= 64; ) {
        for (x2(o3, a3, i3, C2), c3 = 0; c3 < 64; c3++) e4[t2 + c3] = o3[c3];
        for (s3 = 1, c3 = 8; c3 < 16; c3++) s3 = s3 + (a3[c3] & 255) | 0, a3[c3] = s3 & 255, s3 >>>= 8;
        n4 -= 64, t2 += 64;
      }
      if (n4 > 0) for (x2(o3, a3, i3, C2), c3 = 0; c3 < n4; c3++) e4[t2 + c3] = o3[c3];
      return 0;
    }
    function E2(e4, t2, n4, r3, i3) {
      var a3 = new Uint8Array(32);
      S2(a3, r3, i3, C2);
      for (var o3 = new Uint8Array(8), s3 = 0; s3 < 8; s3++) o3[s3] = r3[s3 + 16];
      return T2(e4, t2, n4, o3, a3);
    }
    function D2(e4, t2, n4, r3, i3, a3, o3) {
      var s3 = new Uint8Array(32);
      S2(s3, a3, o3, C2);
      for (var c3 = new Uint8Array(8), l3 = 0; l3 < 8; l3++) c3[l3] = a3[l3 + 16];
      return w2(e4, t2, n4, r3, i3, c3, s3);
    }
    var O2 = function(e4) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var t2 = e4[0] & 255 | (e4[1] & 255) << 8, n4, r3, i3, a3, o3, s3, c3;
      this.r[0] = t2 & 8191, n4 = e4[2] & 255 | (e4[3] & 255) << 8, this.r[1] = (t2 >>> 13 | n4 << 3) & 8191, r3 = e4[4] & 255 | (e4[5] & 255) << 8, this.r[2] = (n4 >>> 10 | r3 << 6) & 7939, i3 = e4[6] & 255 | (e4[7] & 255) << 8, this.r[3] = (r3 >>> 7 | i3 << 9) & 8191, a3 = e4[8] & 255 | (e4[9] & 255) << 8, this.r[4] = (i3 >>> 4 | a3 << 12) & 255, this.r[5] = a3 >>> 1 & 8190, o3 = e4[10] & 255 | (e4[11] & 255) << 8, this.r[6] = (a3 >>> 14 | o3 << 2) & 8191, s3 = e4[12] & 255 | (e4[13] & 255) << 8, this.r[7] = (o3 >>> 11 | s3 << 5) & 8065, c3 = e4[14] & 255 | (e4[15] & 255) << 8, this.r[8] = (s3 >>> 8 | c3 << 8) & 8191, this.r[9] = c3 >>> 5 & 127, this.pad[0] = e4[16] & 255 | (e4[17] & 255) << 8, this.pad[1] = e4[18] & 255 | (e4[19] & 255) << 8, this.pad[2] = e4[20] & 255 | (e4[21] & 255) << 8, this.pad[3] = e4[22] & 255 | (e4[23] & 255) << 8, this.pad[4] = e4[24] & 255 | (e4[25] & 255) << 8, this.pad[5] = e4[26] & 255 | (e4[27] & 255) << 8, this.pad[6] = e4[28] & 255 | (e4[29] & 255) << 8, this.pad[7] = e4[30] & 255 | (e4[31] & 255) << 8;
    };
    O2.prototype.blocks = function(e4, t2, n4) {
      for (var r3 = this.fin ? 0 : 2048, i3, a3, o3, s3, c3, l3, u3, d2, f3, p3, m3, h3, g3, _3, v3, y3, b3, x3, S3, C3 = this.h[0], w3 = this.h[1], T3 = this.h[2], E3 = this.h[3], D3 = this.h[4], O3 = this.h[5], k3 = this.h[6], A3 = this.h[7], j3 = this.h[8], M3 = this.h[9], N3 = this.r[0], P3 = this.r[1], F3 = this.r[2], I3 = this.r[3], L3 = this.r[4], R3 = this.r[5], z3 = this.r[6], B3 = this.r[7], V3 = this.r[8], H3 = this.r[9]; n4 >= 16; ) i3 = e4[t2 + 0] & 255 | (e4[t2 + 1] & 255) << 8, C3 += i3 & 8191, a3 = e4[t2 + 2] & 255 | (e4[t2 + 3] & 255) << 8, w3 += (i3 >>> 13 | a3 << 3) & 8191, o3 = e4[t2 + 4] & 255 | (e4[t2 + 5] & 255) << 8, T3 += (a3 >>> 10 | o3 << 6) & 8191, s3 = e4[t2 + 6] & 255 | (e4[t2 + 7] & 255) << 8, E3 += (o3 >>> 7 | s3 << 9) & 8191, c3 = e4[t2 + 8] & 255 | (e4[t2 + 9] & 255) << 8, D3 += (s3 >>> 4 | c3 << 12) & 8191, O3 += c3 >>> 1 & 8191, l3 = e4[t2 + 10] & 255 | (e4[t2 + 11] & 255) << 8, k3 += (c3 >>> 14 | l3 << 2) & 8191, u3 = e4[t2 + 12] & 255 | (e4[t2 + 13] & 255) << 8, A3 += (l3 >>> 11 | u3 << 5) & 8191, d2 = e4[t2 + 14] & 255 | (e4[t2 + 15] & 255) << 8, j3 += (u3 >>> 8 | d2 << 8) & 8191, M3 += d2 >>> 5 | r3, f3 = 0, p3 = f3, p3 += C3 * N3, p3 += 5 * H3 * w3, p3 += 5 * V3 * T3, p3 += 5 * B3 * E3, p3 += 5 * z3 * D3, f3 = p3 >>> 13, p3 &= 8191, p3 += 5 * R3 * O3, p3 += 5 * L3 * k3, p3 += 5 * I3 * A3, p3 += 5 * F3 * j3, p3 += 5 * P3 * M3, f3 += p3 >>> 13, p3 &= 8191, m3 = f3, m3 += C3 * P3, m3 += w3 * N3, m3 += 5 * H3 * T3, m3 += 5 * V3 * E3, m3 += 5 * B3 * D3, f3 = m3 >>> 13, m3 &= 8191, m3 += 5 * z3 * O3, m3 += 5 * R3 * k3, m3 += 5 * L3 * A3, m3 += 5 * I3 * j3, m3 += 5 * F3 * M3, f3 += m3 >>> 13, m3 &= 8191, h3 = f3, h3 += C3 * F3, h3 += w3 * P3, h3 += T3 * N3, h3 += 5 * H3 * E3, h3 += 5 * V3 * D3, f3 = h3 >>> 13, h3 &= 8191, h3 += 5 * B3 * O3, h3 += 5 * z3 * k3, h3 += 5 * R3 * A3, h3 += 5 * L3 * j3, h3 += 5 * I3 * M3, f3 += h3 >>> 13, h3 &= 8191, g3 = f3, g3 += C3 * I3, g3 += w3 * F3, g3 += T3 * P3, g3 += E3 * N3, g3 += 5 * H3 * D3, f3 = g3 >>> 13, g3 &= 8191, g3 += 5 * V3 * O3, g3 += 5 * B3 * k3, g3 += 5 * z3 * A3, g3 += 5 * R3 * j3, g3 += 5 * L3 * M3, f3 += g3 >>> 13, g3 &= 8191, _3 = f3, _3 += C3 * L3, _3 += w3 * I3, _3 += T3 * F3, _3 += E3 * P3, _3 += D3 * N3, f3 = _3 >>> 13, _3 &= 8191, _3 += 5 * H3 * O3, _3 += 5 * V3 * k3, _3 += 5 * B3 * A3, _3 += 5 * z3 * j3, _3 += 5 * R3 * M3, f3 += _3 >>> 13, _3 &= 8191, v3 = f3, v3 += C3 * R3, v3 += w3 * L3, v3 += T3 * I3, v3 += E3 * F3, v3 += D3 * P3, f3 = v3 >>> 13, v3 &= 8191, v3 += O3 * N3, v3 += 5 * H3 * k3, v3 += 5 * V3 * A3, v3 += 5 * B3 * j3, v3 += 5 * z3 * M3, f3 += v3 >>> 13, v3 &= 8191, y3 = f3, y3 += C3 * z3, y3 += w3 * R3, y3 += T3 * L3, y3 += E3 * I3, y3 += D3 * F3, f3 = y3 >>> 13, y3 &= 8191, y3 += O3 * P3, y3 += k3 * N3, y3 += 5 * H3 * A3, y3 += 5 * V3 * j3, y3 += 5 * B3 * M3, f3 += y3 >>> 13, y3 &= 8191, b3 = f3, b3 += C3 * B3, b3 += w3 * z3, b3 += T3 * R3, b3 += E3 * L3, b3 += D3 * I3, f3 = b3 >>> 13, b3 &= 8191, b3 += O3 * F3, b3 += k3 * P3, b3 += A3 * N3, b3 += 5 * H3 * j3, b3 += 5 * V3 * M3, f3 += b3 >>> 13, b3 &= 8191, x3 = f3, x3 += C3 * V3, x3 += w3 * B3, x3 += T3 * z3, x3 += E3 * R3, x3 += D3 * L3, f3 = x3 >>> 13, x3 &= 8191, x3 += O3 * I3, x3 += k3 * F3, x3 += A3 * P3, x3 += j3 * N3, x3 += 5 * H3 * M3, f3 += x3 >>> 13, x3 &= 8191, S3 = f3, S3 += C3 * H3, S3 += w3 * V3, S3 += T3 * B3, S3 += E3 * z3, S3 += D3 * R3, f3 = S3 >>> 13, S3 &= 8191, S3 += O3 * L3, S3 += k3 * I3, S3 += A3 * F3, S3 += j3 * P3, S3 += M3 * N3, f3 += S3 >>> 13, S3 &= 8191, f3 = (f3 << 2) + f3 | 0, f3 = f3 + p3 | 0, p3 = f3 & 8191, f3 >>>= 13, m3 += f3, C3 = p3, w3 = m3, T3 = h3, E3 = g3, D3 = _3, O3 = v3, k3 = y3, A3 = b3, j3 = x3, M3 = S3, t2 += 16, n4 -= 16;
      this.h[0] = C3, this.h[1] = w3, this.h[2] = T3, this.h[3] = E3, this.h[4] = D3, this.h[5] = O3, this.h[6] = k3, this.h[7] = A3, this.h[8] = j3, this.h[9] = M3;
    }, O2.prototype.finish = function(e4, t2) {
      var n4 = new Uint16Array(10), r3, i3, a3, o3;
      if (this.leftover) {
        for (o3 = this.leftover, this.buffer[o3++] = 1; o3 < 16; o3++) this.buffer[o3] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (r3 = this.h[1] >>> 13, this.h[1] &= 8191, o3 = 2; o3 < 10; o3++) this.h[o3] += r3, r3 = this.h[o3] >>> 13, this.h[o3] &= 8191;
      for (this.h[0] += r3 * 5, r3 = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += r3, r3 = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += r3, n4[0] = this.h[0] + 5, r3 = n4[0] >>> 13, n4[0] &= 8191, o3 = 1; o3 < 10; o3++) n4[o3] = this.h[o3] + r3, r3 = n4[o3] >>> 13, n4[o3] &= 8191;
      for (n4[9] -= 8192, i3 = (r3 ^ 1) - 1, o3 = 0; o3 < 10; o3++) n4[o3] &= i3;
      for (i3 = ~i3, o3 = 0; o3 < 10; o3++) this.h[o3] = this.h[o3] & i3 | n4[o3];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, a3 = this.h[0] + this.pad[0], this.h[0] = a3 & 65535, o3 = 1; o3 < 8; o3++) a3 = (this.h[o3] + this.pad[o3] | 0) + (a3 >>> 16) | 0, this.h[o3] = a3 & 65535;
      e4[t2 + 0] = this.h[0] >>> 0 & 255, e4[t2 + 1] = this.h[0] >>> 8 & 255, e4[t2 + 2] = this.h[1] >>> 0 & 255, e4[t2 + 3] = this.h[1] >>> 8 & 255, e4[t2 + 4] = this.h[2] >>> 0 & 255, e4[t2 + 5] = this.h[2] >>> 8 & 255, e4[t2 + 6] = this.h[3] >>> 0 & 255, e4[t2 + 7] = this.h[3] >>> 8 & 255, e4[t2 + 8] = this.h[4] >>> 0 & 255, e4[t2 + 9] = this.h[4] >>> 8 & 255, e4[t2 + 10] = this.h[5] >>> 0 & 255, e4[t2 + 11] = this.h[5] >>> 8 & 255, e4[t2 + 12] = this.h[6] >>> 0 & 255, e4[t2 + 13] = this.h[6] >>> 8 & 255, e4[t2 + 14] = this.h[7] >>> 0 & 255, e4[t2 + 15] = this.h[7] >>> 8 & 255;
    }, O2.prototype.update = function(e4, t2, n4) {
      var r3, i3;
      if (this.leftover) {
        for (i3 = 16 - this.leftover, i3 > n4 && (i3 = n4), r3 = 0; r3 < i3; r3++) this.buffer[this.leftover + r3] = e4[t2 + r3];
        if (n4 -= i3, t2 += i3, this.leftover += i3, this.leftover < 16) return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (n4 >= 16 && (i3 = n4 - n4 % 16, this.blocks(e4, t2, i3), t2 += i3, n4 -= i3), n4) {
        for (r3 = 0; r3 < n4; r3++) this.buffer[this.leftover + r3] = e4[t2 + r3];
        this.leftover += n4;
      }
    };
    function k2(e4, t2, n4, r3, i3, a3) {
      var o3 = new O2(a3);
      return o3.update(n4, r3, i3), o3.finish(e4, t2), 0;
    }
    function A2(e4, t2, n4, r3, i3, a3) {
      var o3 = new Uint8Array(16);
      return k2(o3, 0, n4, r3, i3, a3), _2(e4, t2, o3, 0);
    }
    function j2(e4, t2, n4, r3, i3) {
      var a3;
      if (n4 < 32) return -1;
      for (D2(e4, 0, t2, 0, n4, r3, i3), k2(e4, 16, e4, 32, n4 - 32, e4), a3 = 0; a3 < 16; a3++) e4[a3] = 0;
      return 0;
    }
    function M2(e4, t2, n4, r3, i3) {
      var a3, o3 = new Uint8Array(32);
      if (n4 < 32 || (E2(o3, 0, 32, r3, i3), A2(t2, 16, t2, 32, n4 - 32, o3) !== 0)) return -1;
      for (D2(e4, 0, t2, 0, n4, r3, i3), a3 = 0; a3 < 32; a3++) e4[a3] = 0;
      return 0;
    }
    function N2(e4, t2) {
      var n4;
      for (n4 = 0; n4 < 16; n4++) e4[n4] = t2[n4] | 0;
    }
    function P2(e4) {
      var t2, n4, r3 = 1;
      for (t2 = 0; t2 < 16; t2++) n4 = e4[t2] + r3 + 65535, r3 = Math.floor(n4 / 65536), e4[t2] = n4 - r3 * 65536;
      e4[0] += r3 - 1 + 37 * (r3 - 1);
    }
    function F2(e4, t2, n4) {
      for (var r3, i3 = ~(n4 - 1), a3 = 0; a3 < 16; a3++) r3 = i3 & (e4[a3] ^ t2[a3]), e4[a3] ^= r3, t2[a3] ^= r3;
    }
    function I2(e4, t2) {
      var r3, i3, a3, o3 = n3(), s3 = n3();
      for (r3 = 0; r3 < 16; r3++) s3[r3] = t2[r3];
      for (P2(s3), P2(s3), P2(s3), i3 = 0; i3 < 2; i3++) {
        for (o3[0] = s3[0] - 65517, r3 = 1; r3 < 15; r3++) o3[r3] = s3[r3] - 65535 - (o3[r3 - 1] >> 16 & 1), o3[r3 - 1] &= 65535;
        o3[15] = s3[15] - 32767 - (o3[14] >> 16 & 1), a3 = o3[15] >> 16 & 1, o3[14] &= 65535, F2(s3, o3, 1 - a3);
      }
      for (r3 = 0; r3 < 16; r3++) e4[2 * r3] = s3[r3] & 255, e4[2 * r3 + 1] = s3[r3] >> 8;
    }
    function L2(e4, t2) {
      var n4 = new Uint8Array(32), r3 = new Uint8Array(32);
      return I2(n4, e4), I2(r3, t2), v2(n4, 0, r3, 0);
    }
    function R2(e4) {
      var t2 = new Uint8Array(32);
      return I2(t2, e4), t2[0] & 1;
    }
    function z2(e4, t2) {
      var n4;
      for (n4 = 0; n4 < 16; n4++) e4[n4] = t2[2 * n4] + (t2[2 * n4 + 1] << 8);
      e4[15] &= 32767;
    }
    function B2(e4, t2, n4) {
      for (var r3 = 0; r3 < 16; r3++) e4[r3] = t2[r3] + n4[r3];
    }
    function V2(e4, t2, n4) {
      for (var r3 = 0; r3 < 16; r3++) e4[r3] = t2[r3] - n4[r3];
    }
    function H2(e4, t2, n4) {
      var r3, i3, a3 = 0, o3 = 0, s3 = 0, c3 = 0, l3 = 0, u3 = 0, d2 = 0, f3 = 0, p3 = 0, m3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k3 = 0, A3 = 0, j3 = 0, M3 = 0, N3 = 0, P3 = 0, F3 = 0, I3 = n4[0], L3 = n4[1], R3 = n4[2], z3 = n4[3], B3 = n4[4], V3 = n4[5], H3 = n4[6], U3 = n4[7], W3 = n4[8], G3 = n4[9], K3 = n4[10], q3 = n4[11], J3 = n4[12], Y3 = n4[13], X3 = n4[14], ee3 = n4[15];
      r3 = t2[0], a3 += r3 * I3, o3 += r3 * L3, s3 += r3 * R3, c3 += r3 * z3, l3 += r3 * B3, u3 += r3 * V3, d2 += r3 * H3, f3 += r3 * U3, p3 += r3 * W3, m3 += r3 * G3, h3 += r3 * K3, g3 += r3 * q3, _3 += r3 * J3, v3 += r3 * Y3, y3 += r3 * X3, b3 += r3 * ee3, r3 = t2[1], o3 += r3 * I3, s3 += r3 * L3, c3 += r3 * R3, l3 += r3 * z3, u3 += r3 * B3, d2 += r3 * V3, f3 += r3 * H3, p3 += r3 * U3, m3 += r3 * W3, h3 += r3 * G3, g3 += r3 * K3, _3 += r3 * q3, v3 += r3 * J3, y3 += r3 * Y3, b3 += r3 * X3, x3 += r3 * ee3, r3 = t2[2], s3 += r3 * I3, c3 += r3 * L3, l3 += r3 * R3, u3 += r3 * z3, d2 += r3 * B3, f3 += r3 * V3, p3 += r3 * H3, m3 += r3 * U3, h3 += r3 * W3, g3 += r3 * G3, _3 += r3 * K3, v3 += r3 * q3, y3 += r3 * J3, b3 += r3 * Y3, x3 += r3 * X3, S3 += r3 * ee3, r3 = t2[3], c3 += r3 * I3, l3 += r3 * L3, u3 += r3 * R3, d2 += r3 * z3, f3 += r3 * B3, p3 += r3 * V3, m3 += r3 * H3, h3 += r3 * U3, g3 += r3 * W3, _3 += r3 * G3, v3 += r3 * K3, y3 += r3 * q3, b3 += r3 * J3, x3 += r3 * Y3, S3 += r3 * X3, C3 += r3 * ee3, r3 = t2[4], l3 += r3 * I3, u3 += r3 * L3, d2 += r3 * R3, f3 += r3 * z3, p3 += r3 * B3, m3 += r3 * V3, h3 += r3 * H3, g3 += r3 * U3, _3 += r3 * W3, v3 += r3 * G3, y3 += r3 * K3, b3 += r3 * q3, x3 += r3 * J3, S3 += r3 * Y3, C3 += r3 * X3, w3 += r3 * ee3, r3 = t2[5], u3 += r3 * I3, d2 += r3 * L3, f3 += r3 * R3, p3 += r3 * z3, m3 += r3 * B3, h3 += r3 * V3, g3 += r3 * H3, _3 += r3 * U3, v3 += r3 * W3, y3 += r3 * G3, b3 += r3 * K3, x3 += r3 * q3, S3 += r3 * J3, C3 += r3 * Y3, w3 += r3 * X3, T3 += r3 * ee3, r3 = t2[6], d2 += r3 * I3, f3 += r3 * L3, p3 += r3 * R3, m3 += r3 * z3, h3 += r3 * B3, g3 += r3 * V3, _3 += r3 * H3, v3 += r3 * U3, y3 += r3 * W3, b3 += r3 * G3, x3 += r3 * K3, S3 += r3 * q3, C3 += r3 * J3, w3 += r3 * Y3, T3 += r3 * X3, E3 += r3 * ee3, r3 = t2[7], f3 += r3 * I3, p3 += r3 * L3, m3 += r3 * R3, h3 += r3 * z3, g3 += r3 * B3, _3 += r3 * V3, v3 += r3 * H3, y3 += r3 * U3, b3 += r3 * W3, x3 += r3 * G3, S3 += r3 * K3, C3 += r3 * q3, w3 += r3 * J3, T3 += r3 * Y3, E3 += r3 * X3, D3 += r3 * ee3, r3 = t2[8], p3 += r3 * I3, m3 += r3 * L3, h3 += r3 * R3, g3 += r3 * z3, _3 += r3 * B3, v3 += r3 * V3, y3 += r3 * H3, b3 += r3 * U3, x3 += r3 * W3, S3 += r3 * G3, C3 += r3 * K3, w3 += r3 * q3, T3 += r3 * J3, E3 += r3 * Y3, D3 += r3 * X3, O3 += r3 * ee3, r3 = t2[9], m3 += r3 * I3, h3 += r3 * L3, g3 += r3 * R3, _3 += r3 * z3, v3 += r3 * B3, y3 += r3 * V3, b3 += r3 * H3, x3 += r3 * U3, S3 += r3 * W3, C3 += r3 * G3, w3 += r3 * K3, T3 += r3 * q3, E3 += r3 * J3, D3 += r3 * Y3, O3 += r3 * X3, k3 += r3 * ee3, r3 = t2[10], h3 += r3 * I3, g3 += r3 * L3, _3 += r3 * R3, v3 += r3 * z3, y3 += r3 * B3, b3 += r3 * V3, x3 += r3 * H3, S3 += r3 * U3, C3 += r3 * W3, w3 += r3 * G3, T3 += r3 * K3, E3 += r3 * q3, D3 += r3 * J3, O3 += r3 * Y3, k3 += r3 * X3, A3 += r3 * ee3, r3 = t2[11], g3 += r3 * I3, _3 += r3 * L3, v3 += r3 * R3, y3 += r3 * z3, b3 += r3 * B3, x3 += r3 * V3, S3 += r3 * H3, C3 += r3 * U3, w3 += r3 * W3, T3 += r3 * G3, E3 += r3 * K3, D3 += r3 * q3, O3 += r3 * J3, k3 += r3 * Y3, A3 += r3 * X3, j3 += r3 * ee3, r3 = t2[12], _3 += r3 * I3, v3 += r3 * L3, y3 += r3 * R3, b3 += r3 * z3, x3 += r3 * B3, S3 += r3 * V3, C3 += r3 * H3, w3 += r3 * U3, T3 += r3 * W3, E3 += r3 * G3, D3 += r3 * K3, O3 += r3 * q3, k3 += r3 * J3, A3 += r3 * Y3, j3 += r3 * X3, M3 += r3 * ee3, r3 = t2[13], v3 += r3 * I3, y3 += r3 * L3, b3 += r3 * R3, x3 += r3 * z3, S3 += r3 * B3, C3 += r3 * V3, w3 += r3 * H3, T3 += r3 * U3, E3 += r3 * W3, D3 += r3 * G3, O3 += r3 * K3, k3 += r3 * q3, A3 += r3 * J3, j3 += r3 * Y3, M3 += r3 * X3, N3 += r3 * ee3, r3 = t2[14], y3 += r3 * I3, b3 += r3 * L3, x3 += r3 * R3, S3 += r3 * z3, C3 += r3 * B3, w3 += r3 * V3, T3 += r3 * H3, E3 += r3 * U3, D3 += r3 * W3, O3 += r3 * G3, k3 += r3 * K3, A3 += r3 * q3, j3 += r3 * J3, M3 += r3 * Y3, N3 += r3 * X3, P3 += r3 * ee3, r3 = t2[15], b3 += r3 * I3, x3 += r3 * L3, S3 += r3 * R3, C3 += r3 * z3, w3 += r3 * B3, T3 += r3 * V3, E3 += r3 * H3, D3 += r3 * U3, O3 += r3 * W3, k3 += r3 * G3, A3 += r3 * K3, j3 += r3 * q3, M3 += r3 * J3, N3 += r3 * Y3, P3 += r3 * X3, F3 += r3 * ee3, a3 += 38 * x3, o3 += 38 * S3, s3 += 38 * C3, c3 += 38 * w3, l3 += 38 * T3, u3 += 38 * E3, d2 += 38 * D3, f3 += 38 * O3, p3 += 38 * k3, m3 += 38 * A3, h3 += 38 * j3, g3 += 38 * M3, _3 += 38 * N3, v3 += 38 * P3, y3 += 38 * F3, i3 = 1, r3 = a3 + i3 + 65535, i3 = Math.floor(r3 / 65536), a3 = r3 - i3 * 65536, r3 = o3 + i3 + 65535, i3 = Math.floor(r3 / 65536), o3 = r3 - i3 * 65536, r3 = s3 + i3 + 65535, i3 = Math.floor(r3 / 65536), s3 = r3 - i3 * 65536, r3 = c3 + i3 + 65535, i3 = Math.floor(r3 / 65536), c3 = r3 - i3 * 65536, r3 = l3 + i3 + 65535, i3 = Math.floor(r3 / 65536), l3 = r3 - i3 * 65536, r3 = u3 + i3 + 65535, i3 = Math.floor(r3 / 65536), u3 = r3 - i3 * 65536, r3 = d2 + i3 + 65535, i3 = Math.floor(r3 / 65536), d2 = r3 - i3 * 65536, r3 = f3 + i3 + 65535, i3 = Math.floor(r3 / 65536), f3 = r3 - i3 * 65536, r3 = p3 + i3 + 65535, i3 = Math.floor(r3 / 65536), p3 = r3 - i3 * 65536, r3 = m3 + i3 + 65535, i3 = Math.floor(r3 / 65536), m3 = r3 - i3 * 65536, r3 = h3 + i3 + 65535, i3 = Math.floor(r3 / 65536), h3 = r3 - i3 * 65536, r3 = g3 + i3 + 65535, i3 = Math.floor(r3 / 65536), g3 = r3 - i3 * 65536, r3 = _3 + i3 + 65535, i3 = Math.floor(r3 / 65536), _3 = r3 - i3 * 65536, r3 = v3 + i3 + 65535, i3 = Math.floor(r3 / 65536), v3 = r3 - i3 * 65536, r3 = y3 + i3 + 65535, i3 = Math.floor(r3 / 65536), y3 = r3 - i3 * 65536, r3 = b3 + i3 + 65535, i3 = Math.floor(r3 / 65536), b3 = r3 - i3 * 65536, a3 += i3 - 1 + 37 * (i3 - 1), i3 = 1, r3 = a3 + i3 + 65535, i3 = Math.floor(r3 / 65536), a3 = r3 - i3 * 65536, r3 = o3 + i3 + 65535, i3 = Math.floor(r3 / 65536), o3 = r3 - i3 * 65536, r3 = s3 + i3 + 65535, i3 = Math.floor(r3 / 65536), s3 = r3 - i3 * 65536, r3 = c3 + i3 + 65535, i3 = Math.floor(r3 / 65536), c3 = r3 - i3 * 65536, r3 = l3 + i3 + 65535, i3 = Math.floor(r3 / 65536), l3 = r3 - i3 * 65536, r3 = u3 + i3 + 65535, i3 = Math.floor(r3 / 65536), u3 = r3 - i3 * 65536, r3 = d2 + i3 + 65535, i3 = Math.floor(r3 / 65536), d2 = r3 - i3 * 65536, r3 = f3 + i3 + 65535, i3 = Math.floor(r3 / 65536), f3 = r3 - i3 * 65536, r3 = p3 + i3 + 65535, i3 = Math.floor(r3 / 65536), p3 = r3 - i3 * 65536, r3 = m3 + i3 + 65535, i3 = Math.floor(r3 / 65536), m3 = r3 - i3 * 65536, r3 = h3 + i3 + 65535, i3 = Math.floor(r3 / 65536), h3 = r3 - i3 * 65536, r3 = g3 + i3 + 65535, i3 = Math.floor(r3 / 65536), g3 = r3 - i3 * 65536, r3 = _3 + i3 + 65535, i3 = Math.floor(r3 / 65536), _3 = r3 - i3 * 65536, r3 = v3 + i3 + 65535, i3 = Math.floor(r3 / 65536), v3 = r3 - i3 * 65536, r3 = y3 + i3 + 65535, i3 = Math.floor(r3 / 65536), y3 = r3 - i3 * 65536, r3 = b3 + i3 + 65535, i3 = Math.floor(r3 / 65536), b3 = r3 - i3 * 65536, a3 += i3 - 1 + 37 * (i3 - 1), e4[0] = a3, e4[1] = o3, e4[2] = s3, e4[3] = c3, e4[4] = l3, e4[5] = u3, e4[6] = d2, e4[7] = f3, e4[8] = p3, e4[9] = m3, e4[10] = h3, e4[11] = g3, e4[12] = _3, e4[13] = v3, e4[14] = y3, e4[15] = b3;
    }
    function U2(e4, t2) {
      H2(e4, t2, t2);
    }
    function W2(e4, t2) {
      var r3 = n3(), i3;
      for (i3 = 0; i3 < 16; i3++) r3[i3] = t2[i3];
      for (i3 = 253; i3 >= 0; i3--) U2(r3, r3), i3 !== 2 && i3 !== 4 && H2(r3, r3, t2);
      for (i3 = 0; i3 < 16; i3++) e4[i3] = r3[i3];
    }
    function G2(e4, t2) {
      var r3 = n3(), i3;
      for (i3 = 0; i3 < 16; i3++) r3[i3] = t2[i3];
      for (i3 = 250; i3 >= 0; i3--) U2(r3, r3), i3 !== 1 && H2(r3, r3, t2);
      for (i3 = 0; i3 < 16; i3++) e4[i3] = r3[i3];
    }
    function K2(e4, t2, r3) {
      var i3 = new Uint8Array(32), a3 = new Float64Array(80), o3, s3, l3 = n3(), u3 = n3(), d2 = n3(), f3 = n3(), p3 = n3(), m3 = n3();
      for (s3 = 0; s3 < 31; s3++) i3[s3] = t2[s3];
      for (i3[31] = t2[31] & 127 | 64, i3[0] &= 248, z2(a3, r3), s3 = 0; s3 < 16; s3++) u3[s3] = a3[s3], f3[s3] = l3[s3] = d2[s3] = 0;
      for (l3[0] = f3[0] = 1, s3 = 254; s3 >= 0; --s3) o3 = i3[s3 >>> 3] >>> (s3 & 7) & 1, F2(l3, u3, o3), F2(d2, f3, o3), B2(p3, l3, d2), V2(l3, l3, d2), B2(d2, u3, f3), V2(u3, u3, f3), U2(f3, p3), U2(m3, l3), H2(l3, d2, l3), H2(d2, u3, p3), B2(p3, l3, d2), V2(l3, l3, d2), U2(u3, l3), V2(d2, f3, m3), H2(l3, d2, c2), B2(l3, l3, f3), H2(d2, d2, l3), H2(l3, f3, m3), H2(f3, u3, a3), U2(u3, p3), F2(l3, u3, o3), F2(d2, f3, o3);
      for (s3 = 0; s3 < 16; s3++) a3[s3 + 16] = l3[s3], a3[s3 + 32] = d2[s3], a3[s3 + 48] = u3[s3], a3[s3 + 64] = f3[s3];
      var h3 = a3.subarray(32), g3 = a3.subarray(16);
      return W2(h3, h3), H2(g3, g3, h3), I2(e4, g3), 0;
    }
    function q2(e4, t2) {
      return K2(e4, t2, a2);
    }
    function J2(e4, t2) {
      return r2(t2, 32), q2(e4, t2);
    }
    function Y2(e4, t2, n4) {
      var r3 = new Uint8Array(32);
      return K2(r3, n4, t2), S2(e4, i2, r3, C2);
    }
    var X2 = j2, ee2 = M2;
    function te2(e4, t2, n4, r3, i3, a3) {
      var o3 = new Uint8Array(32);
      return Y2(o3, i3, a3), X2(e4, t2, n4, r3, o3);
    }
    function ne2(e4, t2, n4, r3, i3, a3) {
      var o3 = new Uint8Array(32);
      return Y2(o3, i3, a3), ee2(e4, t2, n4, r3, o3);
    }
    var re2 = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    function ie2(e4, t2, n4, r3) {
      for (var i3 = new Int32Array(16), a3 = new Int32Array(16), o3, s3, c3, l3, u3, d2, f3, p3, m3, h3, g3, _3, v3, y3, b3, x3, S3, C3, w3, T3, E3, D3, O3, k3, A3, j3, M3 = e4[0], N3 = e4[1], P3 = e4[2], F3 = e4[3], I3 = e4[4], L3 = e4[5], R3 = e4[6], z3 = e4[7], B3 = t2[0], V3 = t2[1], H3 = t2[2], U3 = t2[3], W3 = t2[4], G3 = t2[5], K3 = t2[6], q3 = t2[7], J3 = 0; r3 >= 128; ) {
        for (w3 = 0; w3 < 16; w3++) T3 = 8 * w3 + J3, i3[w3] = n4[T3 + 0] << 24 | n4[T3 + 1] << 16 | n4[T3 + 2] << 8 | n4[T3 + 3], a3[w3] = n4[T3 + 4] << 24 | n4[T3 + 5] << 16 | n4[T3 + 6] << 8 | n4[T3 + 7];
        for (w3 = 0; w3 < 80; w3++) if (o3 = M3, s3 = N3, c3 = P3, l3 = F3, u3 = I3, d2 = L3, f3 = R3, p3 = z3, m3 = B3, h3 = V3, g3 = H3, _3 = U3, v3 = W3, y3 = G3, b3 = K3, x3 = q3, E3 = z3, D3 = q3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = (I3 >>> 14 | W3 << 18) ^ (I3 >>> 18 | W3 << 14) ^ (W3 >>> 9 | I3 << 23), D3 = (W3 >>> 14 | I3 << 18) ^ (W3 >>> 18 | I3 << 14) ^ (I3 >>> 9 | W3 << 23), O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, E3 = I3 & L3 ^ ~I3 & R3, D3 = W3 & G3 ^ ~W3 & K3, O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, E3 = re2[w3 * 2], D3 = re2[w3 * 2 + 1], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, E3 = i3[w3 % 16], D3 = a3[w3 % 16], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, S3 = A3 & 65535 | j3 << 16, C3 = O3 & 65535 | k3 << 16, E3 = S3, D3 = C3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = (M3 >>> 28 | B3 << 4) ^ (B3 >>> 2 | M3 << 30) ^ (B3 >>> 7 | M3 << 25), D3 = (B3 >>> 28 | M3 << 4) ^ (M3 >>> 2 | B3 << 30) ^ (M3 >>> 7 | B3 << 25), O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, E3 = M3 & N3 ^ M3 & P3 ^ N3 & P3, D3 = B3 & V3 ^ B3 & H3 ^ V3 & H3, O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, p3 = A3 & 65535 | j3 << 16, x3 = O3 & 65535 | k3 << 16, E3 = l3, D3 = _3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = S3, D3 = C3, O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, l3 = A3 & 65535 | j3 << 16, _3 = O3 & 65535 | k3 << 16, N3 = o3, P3 = s3, F3 = c3, I3 = l3, L3 = u3, R3 = d2, z3 = f3, M3 = p3, V3 = m3, H3 = h3, U3 = g3, W3 = _3, G3 = v3, K3 = y3, q3 = b3, B3 = x3, w3 % 16 == 15) for (T3 = 0; T3 < 16; T3++) E3 = i3[T3], D3 = a3[T3], O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = i3[(T3 + 9) % 16], D3 = a3[(T3 + 9) % 16], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, S3 = i3[(T3 + 1) % 16], C3 = a3[(T3 + 1) % 16], E3 = (S3 >>> 1 | C3 << 31) ^ (S3 >>> 8 | C3 << 24) ^ S3 >>> 7, D3 = (C3 >>> 1 | S3 << 31) ^ (C3 >>> 8 | S3 << 24) ^ (C3 >>> 7 | S3 << 25), O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, S3 = i3[(T3 + 14) % 16], C3 = a3[(T3 + 14) % 16], E3 = (S3 >>> 19 | C3 << 13) ^ (C3 >>> 29 | S3 << 3) ^ S3 >>> 6, D3 = (C3 >>> 19 | S3 << 13) ^ (S3 >>> 29 | C3 << 3) ^ (C3 >>> 6 | S3 << 26), O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, i3[T3] = A3 & 65535 | j3 << 16, a3[T3] = O3 & 65535 | k3 << 16;
        E3 = M3, D3 = B3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[0], D3 = t2[0], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[0] = M3 = A3 & 65535 | j3 << 16, t2[0] = B3 = O3 & 65535 | k3 << 16, E3 = N3, D3 = V3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[1], D3 = t2[1], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[1] = N3 = A3 & 65535 | j3 << 16, t2[1] = V3 = O3 & 65535 | k3 << 16, E3 = P3, D3 = H3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[2], D3 = t2[2], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[2] = P3 = A3 & 65535 | j3 << 16, t2[2] = H3 = O3 & 65535 | k3 << 16, E3 = F3, D3 = U3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[3], D3 = t2[3], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[3] = F3 = A3 & 65535 | j3 << 16, t2[3] = U3 = O3 & 65535 | k3 << 16, E3 = I3, D3 = W3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[4], D3 = t2[4], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[4] = I3 = A3 & 65535 | j3 << 16, t2[4] = W3 = O3 & 65535 | k3 << 16, E3 = L3, D3 = G3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[5], D3 = t2[5], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[5] = L3 = A3 & 65535 | j3 << 16, t2[5] = G3 = O3 & 65535 | k3 << 16, E3 = R3, D3 = K3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[6], D3 = t2[6], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[6] = R3 = A3 & 65535 | j3 << 16, t2[6] = K3 = O3 & 65535 | k3 << 16, E3 = z3, D3 = q3, O3 = D3 & 65535, k3 = D3 >>> 16, A3 = E3 & 65535, j3 = E3 >>> 16, E3 = e4[7], D3 = t2[7], O3 += D3 & 65535, k3 += D3 >>> 16, A3 += E3 & 65535, j3 += E3 >>> 16, k3 += O3 >>> 16, A3 += k3 >>> 16, j3 += A3 >>> 16, e4[7] = z3 = A3 & 65535 | j3 << 16, t2[7] = q3 = O3 & 65535 | k3 << 16, J3 += 128, r3 -= 128;
      }
      return r3;
    }
    function ae2(e4, t2, n4) {
      var r3 = new Int32Array(8), i3 = new Int32Array(8), a3 = new Uint8Array(256), o3, s3 = n4;
      for (r3[0] = 1779033703, r3[1] = 3144134277, r3[2] = 1013904242, r3[3] = 2773480762, r3[4] = 1359893119, r3[5] = 2600822924, r3[6] = 528734635, r3[7] = 1541459225, i3[0] = 4089235720, i3[1] = 2227873595, i3[2] = 4271175723, i3[3] = 1595750129, i3[4] = 2917565137, i3[5] = 725511199, i3[6] = 4215389547, i3[7] = 327033209, ie2(r3, i3, t2, n4), n4 %= 128, o3 = 0; o3 < n4; o3++) a3[o3] = t2[s3 - n4 + o3];
      for (a3[n4] = 128, n4 = 256 - 128 * (n4 < 112), a3[n4 - 9] = 0, h2(a3, n4 - 8, s3 / 536870912 | 0, s3 << 3), ie2(r3, i3, a3, n4), o3 = 0; o3 < 8; o3++) h2(e4, 8 * o3, r3[o3], i3[o3]);
      return 0;
    }
    function oe2(e4, t2) {
      var r3 = n3(), i3 = n3(), a3 = n3(), o3 = n3(), s3 = n3(), c3 = n3(), l3 = n3(), d2 = n3(), f3 = n3();
      V2(r3, e4[1], e4[0]), V2(f3, t2[1], t2[0]), H2(r3, r3, f3), B2(i3, e4[0], e4[1]), B2(f3, t2[0], t2[1]), H2(i3, i3, f3), H2(a3, e4[3], t2[3]), H2(a3, a3, u2), H2(o3, e4[2], t2[2]), B2(o3, o3, o3), V2(s3, i3, r3), V2(c3, o3, a3), B2(l3, o3, a3), B2(d2, i3, r3), H2(e4[0], s3, c3), H2(e4[1], d2, l3), H2(e4[2], l3, c3), H2(e4[3], s3, d2);
    }
    function se2(e4, t2, n4) {
      var r3;
      for (r3 = 0; r3 < 4; r3++) F2(e4[r3], t2[r3], n4);
    }
    function ce2(e4, t2) {
      var r3 = n3(), i3 = n3(), a3 = n3();
      W2(a3, t2[2]), H2(r3, t2[0], a3), H2(i3, t2[1], a3), I2(e4, i3), e4[31] ^= R2(r3) << 7;
    }
    function le2(e4, t2, n4) {
      var r3, i3;
      for (N2(e4[0], o2), N2(e4[1], s2), N2(e4[2], s2), N2(e4[3], o2), i3 = 255; i3 >= 0; --i3) r3 = n4[i3 / 8 | 0] >> (i3 & 7) & 1, se2(e4, t2, r3), oe2(t2, e4), oe2(e4, e4), se2(e4, t2, r3);
    }
    function ue2(e4, t2) {
      var r3 = [n3(), n3(), n3(), n3()];
      N2(r3[0], f2), N2(r3[1], p2), N2(r3[2], s2), H2(r3[3], f2, p2), le2(e4, r3, t2);
    }
    function de2(e4, t2, i3) {
      var a3 = new Uint8Array(64), o3 = [n3(), n3(), n3(), n3()], s3;
      for (i3 || r2(t2, 32), ae2(a3, t2, 32), a3[0] &= 248, a3[31] &= 127, a3[31] |= 64, ue2(o3, a3), ce2(e4, o3), s3 = 0; s3 < 32; s3++) t2[s3 + 32] = e4[s3];
      return 0;
    }
    var fe2 = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function pe2(e4, t2) {
      var n4, r3, i3, a3;
      for (r3 = 63; r3 >= 32; --r3) {
        for (n4 = 0, i3 = r3 - 32, a3 = r3 - 12; i3 < a3; ++i3) t2[i3] += n4 - 16 * t2[r3] * fe2[i3 - (r3 - 32)], n4 = Math.floor((t2[i3] + 128) / 256), t2[i3] -= n4 * 256;
        t2[i3] += n4, t2[r3] = 0;
      }
      for (n4 = 0, i3 = 0; i3 < 32; i3++) t2[i3] += n4 - (t2[31] >> 4) * fe2[i3], n4 = t2[i3] >> 8, t2[i3] &= 255;
      for (i3 = 0; i3 < 32; i3++) t2[i3] -= n4 * fe2[i3];
      for (r3 = 0; r3 < 32; r3++) t2[r3 + 1] += t2[r3] >> 8, e4[r3] = t2[r3] & 255;
    }
    function me2(e4) {
      var t2 = new Float64Array(64), n4;
      for (n4 = 0; n4 < 64; n4++) t2[n4] = e4[n4];
      for (n4 = 0; n4 < 64; n4++) e4[n4] = 0;
      pe2(e4, t2);
    }
    function he2(e4, t2, r3, i3) {
      var a3 = new Uint8Array(64), o3 = new Uint8Array(64), s3 = new Uint8Array(64), c3, l3, u3 = new Float64Array(64), d2 = [n3(), n3(), n3(), n3()];
      ae2(a3, i3, 32), a3[0] &= 248, a3[31] &= 127, a3[31] |= 64;
      var f3 = r3 + 64;
      for (c3 = 0; c3 < r3; c3++) e4[64 + c3] = t2[c3];
      for (c3 = 0; c3 < 32; c3++) e4[32 + c3] = a3[32 + c3];
      for (ae2(s3, e4.subarray(32), r3 + 32), me2(s3), ue2(d2, s3), ce2(e4, d2), c3 = 32; c3 < 64; c3++) e4[c3] = i3[c3];
      for (ae2(o3, e4, r3 + 64), me2(o3), c3 = 0; c3 < 64; c3++) u3[c3] = 0;
      for (c3 = 0; c3 < 32; c3++) u3[c3] = s3[c3];
      for (c3 = 0; c3 < 32; c3++) for (l3 = 0; l3 < 32; l3++) u3[c3 + l3] += o3[c3] * a3[l3];
      return pe2(e4.subarray(32), u3), f3;
    }
    function ge2(e4, t2) {
      var r3 = n3(), i3 = n3(), a3 = n3(), c3 = n3(), u3 = n3(), d2 = n3(), f3 = n3();
      return N2(e4[2], s2), z2(e4[1], t2), U2(a3, e4[1]), H2(c3, a3, l2), V2(a3, a3, e4[2]), B2(c3, e4[2], c3), U2(u3, c3), U2(d2, u3), H2(f3, d2, u3), H2(r3, f3, a3), H2(r3, r3, c3), G2(r3, r3), H2(r3, r3, a3), H2(r3, r3, c3), H2(r3, r3, c3), H2(e4[0], r3, c3), U2(i3, e4[0]), H2(i3, i3, c3), L2(i3, a3) && H2(e4[0], e4[0], m2), U2(i3, e4[0]), H2(i3, i3, c3), L2(i3, a3) ? -1 : (R2(e4[0]) === t2[31] >> 7 && V2(e4[0], o2, e4[0]), H2(e4[3], e4[0], e4[1]), 0);
    }
    function _e2(e4, t2, r3, i3) {
      var a3, o3 = new Uint8Array(32), s3 = new Uint8Array(64), c3 = [n3(), n3(), n3(), n3()], l3 = [n3(), n3(), n3(), n3()];
      if (r3 < 64 || ge2(l3, i3)) return -1;
      for (a3 = 0; a3 < r3; a3++) e4[a3] = t2[a3];
      for (a3 = 0; a3 < 32; a3++) e4[a3 + 32] = i3[a3];
      if (ae2(s3, e4, r3), me2(s3), le2(c3, l3, s3), ue2(l3, t2.subarray(32)), oe2(c3, l3), ce2(o3, c3), r3 -= 64, v2(t2, 0, o3, 0)) {
        for (a3 = 0; a3 < r3; a3++) e4[a3] = 0;
        return -1;
      }
      for (a3 = 0; a3 < r3; a3++) e4[a3] = t2[a3 + 64];
      return r3;
    }
    var ve2 = 32, ye2 = 24, be2 = 32, xe2 = 16, Se2 = 32, Ce2 = 32, we2 = 32, Z2 = 32, Q2 = 32, Te2 = ye2, Ee2 = be2, De2 = xe2, Oe2 = 64, ke2 = 32, Ae2 = 64, je2 = 32, Me2 = 64;
    e3.lowlevel = { crypto_core_hsalsa20: S2, crypto_stream_xor: D2, crypto_stream: E2, crypto_stream_salsa20_xor: w2, crypto_stream_salsa20: T2, crypto_onetimeauth: k2, crypto_onetimeauth_verify: A2, crypto_verify_16: _2, crypto_verify_32: v2, crypto_secretbox: j2, crypto_secretbox_open: M2, crypto_scalarmult: K2, crypto_scalarmult_base: q2, crypto_box_beforenm: Y2, crypto_box_afternm: X2, crypto_box: te2, crypto_box_open: ne2, crypto_box_keypair: J2, crypto_hash: ae2, crypto_sign: he2, crypto_sign_keypair: de2, crypto_sign_open: _e2, crypto_secretbox_KEYBYTES: ve2, crypto_secretbox_NONCEBYTES: ye2, crypto_secretbox_ZEROBYTES: be2, crypto_secretbox_BOXZEROBYTES: xe2, crypto_scalarmult_BYTES: Se2, crypto_scalarmult_SCALARBYTES: Ce2, crypto_box_PUBLICKEYBYTES: we2, crypto_box_SECRETKEYBYTES: Z2, crypto_box_BEFORENMBYTES: Q2, crypto_box_NONCEBYTES: Te2, crypto_box_ZEROBYTES: Ee2, crypto_box_BOXZEROBYTES: De2, crypto_sign_BYTES: Oe2, crypto_sign_PUBLICKEYBYTES: ke2, crypto_sign_SECRETKEYBYTES: Ae2, crypto_sign_SEEDBYTES: je2, crypto_hash_BYTES: Me2, gf: n3, D: l2, L: fe2, pack25519: I2, unpack25519: z2, M: H2, A: B2, S: U2, Z: V2, pow2523: G2, add: oe2, set25519: N2, modL: pe2, scalarmult: le2, scalarbase: ue2 };
    function Ne2(e4, t2) {
      if (e4.length !== ve2) throw Error(`bad key size`);
      if (t2.length !== ye2) throw Error(`bad nonce size`);
    }
    function Pe2(e4, t2) {
      if (e4.length !== we2) throw Error(`bad public key size`);
      if (t2.length !== Z2) throw Error(`bad secret key size`);
    }
    function Fe2() {
      for (var e4 = 0; e4 < arguments.length; e4++) if (!(arguments[e4] instanceof Uint8Array)) throw TypeError(`unexpected type, use Uint8Array`);
    }
    function Ie2(e4) {
      for (var t2 = 0; t2 < e4.length; t2++) e4[t2] = 0;
    }
    e3.randomBytes = function(e4) {
      var t2 = new Uint8Array(e4);
      return r2(t2, e4), t2;
    }, e3.secretbox = function(e4, t2, n4) {
      Fe2(e4, t2, n4), Ne2(n4, t2);
      for (var r3 = new Uint8Array(be2 + e4.length), i3 = new Uint8Array(r3.length), a3 = 0; a3 < e4.length; a3++) r3[a3 + be2] = e4[a3];
      return j2(i3, r3, r3.length, t2, n4), i3.subarray(xe2);
    }, e3.secretbox.open = function(e4, t2, n4) {
      Fe2(e4, t2, n4), Ne2(n4, t2);
      for (var r3 = new Uint8Array(xe2 + e4.length), i3 = new Uint8Array(r3.length), a3 = 0; a3 < e4.length; a3++) r3[a3 + xe2] = e4[a3];
      return r3.length < 32 || M2(i3, r3, r3.length, t2, n4) !== 0 ? null : i3.subarray(be2);
    }, e3.secretbox.keyLength = ve2, e3.secretbox.nonceLength = ye2, e3.secretbox.overheadLength = xe2, e3.scalarMult = function(e4, t2) {
      if (Fe2(e4, t2), e4.length !== Ce2) throw Error(`bad n size`);
      if (t2.length !== Se2) throw Error(`bad p size`);
      var n4 = new Uint8Array(Se2);
      return K2(n4, e4, t2), n4;
    }, e3.scalarMult.base = function(e4) {
      if (Fe2(e4), e4.length !== Ce2) throw Error(`bad n size`);
      var t2 = new Uint8Array(Se2);
      return q2(t2, e4), t2;
    }, e3.scalarMult.scalarLength = Ce2, e3.scalarMult.groupElementLength = Se2, e3.box = function(t2, n4, r3, i3) {
      var a3 = e3.box.before(r3, i3);
      return e3.secretbox(t2, n4, a3);
    }, e3.box.before = function(e4, t2) {
      Fe2(e4, t2), Pe2(e4, t2);
      var n4 = new Uint8Array(Q2);
      return Y2(n4, e4, t2), n4;
    }, e3.box.after = e3.secretbox, e3.box.open = function(t2, n4, r3, i3) {
      var a3 = e3.box.before(r3, i3);
      return e3.secretbox.open(t2, n4, a3);
    }, e3.box.open.after = e3.secretbox.open, e3.box.keyPair = function() {
      var e4 = new Uint8Array(we2), t2 = new Uint8Array(Z2);
      return J2(e4, t2), { publicKey: e4, secretKey: t2 };
    }, e3.box.keyPair.fromSecretKey = function(e4) {
      if (Fe2(e4), e4.length !== Z2) throw Error(`bad secret key size`);
      var t2 = new Uint8Array(we2);
      return q2(t2, e4), { publicKey: t2, secretKey: new Uint8Array(e4) };
    }, e3.box.publicKeyLength = we2, e3.box.secretKeyLength = Z2, e3.box.sharedKeyLength = Q2, e3.box.nonceLength = Te2, e3.box.overheadLength = e3.secretbox.overheadLength, e3.sign = function(e4, t2) {
      if (Fe2(e4, t2), t2.length !== Ae2) throw Error(`bad secret key size`);
      var n4 = new Uint8Array(Oe2 + e4.length);
      return he2(n4, e4, e4.length, t2), n4;
    }, e3.sign.open = function(e4, t2) {
      if (Fe2(e4, t2), t2.length !== ke2) throw Error(`bad public key size`);
      var n4 = new Uint8Array(e4.length), r3 = _e2(n4, e4, e4.length, t2);
      if (r3 < 0) return null;
      for (var i3 = new Uint8Array(r3), a3 = 0; a3 < i3.length; a3++) i3[a3] = n4[a3];
      return i3;
    }, e3.sign.detached = function(t2, n4) {
      for (var r3 = e3.sign(t2, n4), i3 = new Uint8Array(Oe2), a3 = 0; a3 < i3.length; a3++) i3[a3] = r3[a3];
      return i3;
    }, e3.sign.detached.verify = function(e4, t2, n4) {
      if (Fe2(e4, t2, n4), t2.length !== Oe2) throw Error(`bad signature size`);
      if (n4.length !== ke2) throw Error(`bad public key size`);
      var r3 = new Uint8Array(Oe2 + e4.length), i3 = new Uint8Array(Oe2 + e4.length), a3;
      for (a3 = 0; a3 < Oe2; a3++) r3[a3] = t2[a3];
      for (a3 = 0; a3 < e4.length; a3++) r3[a3 + Oe2] = e4[a3];
      return _e2(i3, r3, r3.length, n4) >= 0;
    }, e3.sign.keyPair = function() {
      var e4 = new Uint8Array(ke2), t2 = new Uint8Array(Ae2);
      return de2(e4, t2), { publicKey: e4, secretKey: t2 };
    }, e3.sign.keyPair.fromSecretKey = function(e4) {
      if (Fe2(e4), e4.length !== Ae2) throw Error(`bad secret key size`);
      for (var t2 = new Uint8Array(ke2), n4 = 0; n4 < t2.length; n4++) t2[n4] = e4[32 + n4];
      return { publicKey: t2, secretKey: new Uint8Array(e4) };
    }, e3.sign.keyPair.fromSeed = function(e4) {
      if (Fe2(e4), e4.length !== je2) throw Error(`bad seed size`);
      for (var t2 = new Uint8Array(ke2), n4 = new Uint8Array(Ae2), r3 = 0; r3 < 32; r3++) n4[r3] = e4[r3];
      return de2(t2, n4, true), { publicKey: t2, secretKey: n4 };
    }, e3.sign.publicKeyLength = ke2, e3.sign.secretKeyLength = Ae2, e3.sign.seedLength = je2, e3.sign.signatureLength = Oe2, e3.hash = function(e4) {
      Fe2(e4);
      var t2 = new Uint8Array(Me2);
      return ae2(t2, e4, e4.length), t2;
    }, e3.hash.hashLength = Me2, e3.verify = function(e4, t2) {
      return Fe2(e4, t2), e4.length === 0 || t2.length === 0 || e4.length !== t2.length ? false : g2(e4, 0, t2, 0, e4.length) === 0;
    }, e3.setPRNG = function(e4) {
      r2 = e4;
    }, (function() {
      var n4 = typeof self < `u` ? self.crypto || self.msCrypto : null;
      if (n4 && n4.getRandomValues) {
        var r3 = 65536;
        e3.setPRNG(function(e4, t2) {
          var i3, a3 = new Uint8Array(t2);
          for (i3 = 0; i3 < t2; i3 += r3) n4.getRandomValues(a3.subarray(i3, i3 + Math.min(t2 - i3, r3)));
          for (i3 = 0; i3 < t2; i3++) e4[i3] = a3[i3];
          Ie2(a3);
        });
      } else t !== void 0 && (n4 = d(), n4 && n4.randomBytes && e3.setPRNG(function(e4, t2) {
        var r4, i3 = n4.randomBytes(t2);
        for (r4 = 0; r4 < t2; r4++) e4[r4] = i3[r4];
        Ie2(i3);
      }));
    })();
  })(n2 !== void 0 && n2.exports ? n2.exports : self.nacl = self.nacl || {});
})), k = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.bitsToBytes = e2.bytesToBits = e2.lpad = void 0;
  function t2(e3, t3, n3) {
    for (; e3.length < n3; ) e3 = t3 + e3;
    return e3;
  }
  e2.lpad = t2;
  function n2(e3) {
    let n3 = ``;
    for (let r3 = 0; r3 < e3.length; r3++) {
      let i2 = e3.at(r3);
      n3 += t2(i2.toString(2), `0`, 8);
    }
    return n3;
  }
  e2.bytesToBits = n2;
  function r2(e3) {
    if (e3.length % 8 != 0) throw Error(`Uneven bits`);
    let t3 = [];
    for (; e3.length > 0; ) t3.push(parseInt(e3.slice(0, 8), 2)), e3 = e3.slice(8);
    return Buffer.from(t3);
  }
  e2.bitsToBytes = r2;
})), A = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.wordlist = void 0, e2.wordlist = `abandon.ability.able.about.above.absent.absorb.abstract.absurd.abuse.access.accident.account.accuse.achieve.acid.acoustic.acquire.across.act.action.actor.actress.actual.adapt.add.addict.address.adjust.admit.adult.advance.advice.aerobic.affair.afford.afraid.again.age.agent.agree.ahead.aim.air.airport.aisle.alarm.album.alcohol.alert.alien.all.alley.allow.almost.alone.alpha.already.also.alter.always.amateur.amazing.among.amount.amused.analyst.anchor.ancient.anger.angle.angry.animal.ankle.announce.annual.another.answer.antenna.antique.anxiety.any.apart.apology.appear.apple.approve.april.arch.arctic.area.arena.argue.arm.armed.armor.army.around.arrange.arrest.arrive.arrow.art.artefact.artist.artwork.ask.aspect.assault.asset.assist.assume.asthma.athlete.atom.attack.attend.attitude.attract.auction.audit.august.aunt.author.auto.autumn.average.avocado.avoid.awake.aware.away.awesome.awful.awkward.axis.baby.bachelor.bacon.badge.bag.balance.balcony.ball.bamboo.banana.banner.bar.barely.bargain.barrel.base.basic.basket.battle.beach.bean.beauty.because.become.beef.before.begin.behave.behind.believe.below.belt.bench.benefit.best.betray.better.between.beyond.bicycle.bid.bike.bind.biology.bird.birth.bitter.black.blade.blame.blanket.blast.bleak.bless.blind.blood.blossom.blouse.blue.blur.blush.board.boat.body.boil.bomb.bone.bonus.book.boost.border.boring.borrow.boss.bottom.bounce.box.boy.bracket.brain.brand.brass.brave.bread.breeze.brick.bridge.brief.bright.bring.brisk.broccoli.broken.bronze.broom.brother.brown.brush.bubble.buddy.budget.buffalo.build.bulb.bulk.bullet.bundle.bunker.burden.burger.burst.bus.business.busy.butter.buyer.buzz.cabbage.cabin.cable.cactus.cage.cake.call.calm.camera.camp.can.canal.cancel.candy.cannon.canoe.canvas.canyon.capable.capital.captain.car.carbon.card.cargo.carpet.carry.cart.case.cash.casino.castle.casual.cat.catalog.catch.category.cattle.caught.cause.caution.cave.ceiling.celery.cement.census.century.cereal.certain.chair.chalk.champion.change.chaos.chapter.charge.chase.chat.cheap.check.cheese.chef.cherry.chest.chicken.chief.child.chimney.choice.choose.chronic.chuckle.chunk.churn.cigar.cinnamon.circle.citizen.city.civil.claim.clap.clarify.claw.clay.clean.clerk.clever.click.client.cliff.climb.clinic.clip.clock.clog.close.cloth.cloud.clown.club.clump.cluster.clutch.coach.coast.coconut.code.coffee.coil.coin.collect.color.column.combine.come.comfort.comic.common.company.concert.conduct.confirm.congress.connect.consider.control.convince.cook.cool.copper.copy.coral.core.corn.correct.cost.cotton.couch.country.couple.course.cousin.cover.coyote.crack.cradle.craft.cram.crane.crash.crater.crawl.crazy.cream.credit.creek.crew.cricket.crime.crisp.critic.crop.cross.crouch.crowd.crucial.cruel.cruise.crumble.crunch.crush.cry.crystal.cube.culture.cup.cupboard.curious.current.curtain.curve.cushion.custom.cute.cycle.dad.damage.damp.dance.danger.daring.dash.daughter.dawn.day.deal.debate.debris.decade.december.decide.decline.decorate.decrease.deer.defense.define.defy.degree.delay.deliver.demand.demise.denial.dentist.deny.depart.depend.deposit.depth.deputy.derive.describe.desert.design.desk.despair.destroy.detail.detect.develop.device.devote.diagram.dial.diamond.diary.dice.diesel.diet.differ.digital.dignity.dilemma.dinner.dinosaur.direct.dirt.disagree.discover.disease.dish.dismiss.disorder.display.distance.divert.divide.divorce.dizzy.doctor.document.dog.doll.dolphin.domain.donate.donkey.donor.door.dose.double.dove.draft.dragon.drama.drastic.draw.dream.dress.drift.drill.drink.drip.drive.drop.drum.dry.duck.dumb.dune.during.dust.dutch.duty.dwarf.dynamic.eager.eagle.early.earn.earth.easily.east.easy.echo.ecology.economy.edge.edit.educate.effort.egg.eight.either.elbow.elder.electric.elegant.element.elephant.elevator.elite.else.embark.embody.embrace.emerge.emotion.employ.empower.empty.enable.enact.end.endless.endorse.enemy.energy.enforce.engage.engine.enhance.enjoy.enlist.enough.enrich.enroll.ensure.enter.entire.entry.envelope.episode.equal.equip.era.erase.erode.erosion.error.erupt.escape.essay.essence.estate.eternal.ethics.evidence.evil.evoke.evolve.exact.example.excess.exchange.excite.exclude.excuse.execute.exercise.exhaust.exhibit.exile.exist.exit.exotic.expand.expect.expire.explain.expose.express.extend.extra.eye.eyebrow.fabric.face.faculty.fade.faint.faith.fall.false.fame.family.famous.fan.fancy.fantasy.farm.fashion.fat.fatal.father.fatigue.fault.favorite.feature.february.federal.fee.feed.feel.female.fence.festival.fetch.fever.few.fiber.fiction.field.figure.file.film.filter.final.find.fine.finger.finish.fire.firm.first.fiscal.fish.fit.fitness.fix.flag.flame.flash.flat.flavor.flee.flight.flip.float.flock.floor.flower.fluid.flush.fly.foam.focus.fog.foil.fold.follow.food.foot.force.forest.forget.fork.fortune.forum.forward.fossil.foster.found.fox.fragile.frame.frequent.fresh.friend.fringe.frog.front.frost.frown.frozen.fruit.fuel.fun.funny.furnace.fury.future.gadget.gain.galaxy.gallery.game.gap.garage.garbage.garden.garlic.garment.gas.gasp.gate.gather.gauge.gaze.general.genius.genre.gentle.genuine.gesture.ghost.giant.gift.giggle.ginger.giraffe.girl.give.glad.glance.glare.glass.glide.glimpse.globe.gloom.glory.glove.glow.glue.goat.goddess.gold.good.goose.gorilla.gospel.gossip.govern.gown.grab.grace.grain.grant.grape.grass.gravity.great.green.grid.grief.grit.grocery.group.grow.grunt.guard.guess.guide.guilt.guitar.gun.gym.habit.hair.half.hammer.hamster.hand.happy.harbor.hard.harsh.harvest.hat.have.hawk.hazard.head.health.heart.heavy.hedgehog.height.hello.helmet.help.hen.hero.hidden.high.hill.hint.hip.hire.history.hobby.hockey.hold.hole.holiday.hollow.home.honey.hood.hope.horn.horror.horse.hospital.host.hotel.hour.hover.hub.huge.human.humble.humor.hundred.hungry.hunt.hurdle.hurry.hurt.husband.hybrid.ice.icon.idea.identify.idle.ignore.ill.illegal.illness.image.imitate.immense.immune.impact.impose.improve.impulse.inch.include.income.increase.index.indicate.indoor.industry.infant.inflict.inform.inhale.inherit.initial.inject.injury.inmate.inner.innocent.input.inquiry.insane.insect.inside.inspire.install.intact.interest.into.invest.invite.involve.iron.island.isolate.issue.item.ivory.jacket.jaguar.jar.jazz.jealous.jeans.jelly.jewel.job.join.joke.journey.joy.judge.juice.jump.jungle.junior.junk.just.kangaroo.keen.keep.ketchup.key.kick.kid.kidney.kind.kingdom.kiss.kit.kitchen.kite.kitten.kiwi.knee.knife.knock.know.lab.label.labor.ladder.lady.lake.lamp.language.laptop.large.later.latin.laugh.laundry.lava.law.lawn.lawsuit.layer.lazy.leader.leaf.learn.leave.lecture.left.leg.legal.legend.leisure.lemon.lend.length.lens.leopard.lesson.letter.level.liar.liberty.library.license.life.lift.light.like.limb.limit.link.lion.liquid.list.little.live.lizard.load.loan.lobster.local.lock.logic.lonely.long.loop.lottery.loud.lounge.love.loyal.lucky.luggage.lumber.lunar.lunch.luxury.lyrics.machine.mad.magic.magnet.maid.mail.main.major.make.mammal.man.manage.mandate.mango.mansion.manual.maple.marble.march.margin.marine.market.marriage.mask.mass.master.match.material.math.matrix.matter.maximum.maze.meadow.mean.measure.meat.mechanic.medal.media.melody.melt.member.memory.mention.menu.mercy.merge.merit.merry.mesh.message.metal.method.middle.midnight.milk.million.mimic.mind.minimum.minor.minute.miracle.mirror.misery.miss.mistake.mix.mixed.mixture.mobile.model.modify.mom.moment.monitor.monkey.monster.month.moon.moral.more.morning.mosquito.mother.motion.motor.mountain.mouse.move.movie.much.muffin.mule.multiply.muscle.museum.mushroom.music.must.mutual.myself.mystery.myth.naive.name.napkin.narrow.nasty.nation.nature.near.neck.need.negative.neglect.neither.nephew.nerve.nest.net.network.neutral.never.news.next.nice.night.noble.noise.nominee.noodle.normal.north.nose.notable.note.nothing.notice.novel.now.nuclear.number.nurse.nut.oak.obey.object.oblige.obscure.observe.obtain.obvious.occur.ocean.october.odor.off.offer.office.often.oil.okay.old.olive.olympic.omit.once.one.onion.online.only.open.opera.opinion.oppose.option.orange.orbit.orchard.order.ordinary.organ.orient.original.orphan.ostrich.other.outdoor.outer.output.outside.oval.oven.over.own.owner.oxygen.oyster.ozone.pact.paddle.page.pair.palace.palm.panda.panel.panic.panther.paper.parade.parent.park.parrot.party.pass.patch.path.patient.patrol.pattern.pause.pave.payment.peace.peanut.pear.peasant.pelican.pen.penalty.pencil.people.pepper.perfect.permit.person.pet.phone.photo.phrase.physical.piano.picnic.picture.piece.pig.pigeon.pill.pilot.pink.pioneer.pipe.pistol.pitch.pizza.place.planet.plastic.plate.play.please.pledge.pluck.plug.plunge.poem.poet.point.polar.pole.police.pond.pony.pool.popular.portion.position.possible.post.potato.pottery.poverty.powder.power.practice.praise.predict.prefer.prepare.present.pretty.prevent.price.pride.primary.print.priority.prison.private.prize.problem.process.produce.profit.program.project.promote.proof.property.prosper.protect.proud.provide.public.pudding.pull.pulp.pulse.pumpkin.punch.pupil.puppy.purchase.purity.purpose.purse.push.put.puzzle.pyramid.quality.quantum.quarter.question.quick.quit.quiz.quote.rabbit.raccoon.race.rack.radar.radio.rail.rain.raise.rally.ramp.ranch.random.range.rapid.rare.rate.rather.raven.raw.razor.ready.real.reason.rebel.rebuild.recall.receive.recipe.record.recycle.reduce.reflect.reform.refuse.region.regret.regular.reject.relax.release.relief.rely.remain.remember.remind.remove.render.renew.rent.reopen.repair.repeat.replace.report.require.rescue.resemble.resist.resource.response.result.retire.retreat.return.reunion.reveal.review.reward.rhythm.rib.ribbon.rice.rich.ride.ridge.rifle.right.rigid.ring.riot.ripple.risk.ritual.rival.river.road.roast.robot.robust.rocket.romance.roof.rookie.room.rose.rotate.rough.round.route.royal.rubber.rude.rug.rule.run.runway.rural.sad.saddle.sadness.safe.sail.salad.salmon.salon.salt.salute.same.sample.sand.satisfy.satoshi.sauce.sausage.save.say.scale.scan.scare.scatter.scene.scheme.school.science.scissors.scorpion.scout.scrap.screen.script.scrub.sea.search.season.seat.second.secret.section.security.seed.seek.segment.select.sell.seminar.senior.sense.sentence.series.service.session.settle.setup.seven.shadow.shaft.shallow.share.shed.shell.sheriff.shield.shift.shine.ship.shiver.shock.shoe.shoot.shop.short.shoulder.shove.shrimp.shrug.shuffle.shy.sibling.sick.side.siege.sight.sign.silent.silk.silly.silver.similar.simple.since.sing.siren.sister.situate.six.size.skate.sketch.ski.skill.skin.skirt.skull.slab.slam.sleep.slender.slice.slide.slight.slim.slogan.slot.slow.slush.small.smart.smile.smoke.smooth.snack.snake.snap.sniff.snow.soap.soccer.social.sock.soda.soft.solar.soldier.solid.solution.solve.someone.song.soon.sorry.sort.soul.sound.soup.source.south.space.spare.spatial.spawn.speak.special.speed.spell.spend.sphere.spice.spider.spike.spin.spirit.split.spoil.sponsor.spoon.sport.spot.spray.spread.spring.spy.square.squeeze.squirrel.stable.stadium.staff.stage.stairs.stamp.stand.start.state.stay.steak.steel.stem.step.stereo.stick.still.sting.stock.stomach.stone.stool.story.stove.strategy.street.strike.strong.struggle.student.stuff.stumble.style.subject.submit.subway.success.such.sudden.suffer.sugar.suggest.suit.summer.sun.sunny.sunset.super.supply.supreme.sure.surface.surge.surprise.surround.survey.suspect.sustain.swallow.swamp.swap.swarm.swear.sweet.swift.swim.swing.switch.sword.symbol.symptom.syrup.system.table.tackle.tag.tail.talent.talk.tank.tape.target.task.taste.tattoo.taxi.teach.team.tell.ten.tenant.tennis.tent.term.test.text.thank.that.theme.then.theory.there.they.thing.this.thought.three.thrive.throw.thumb.thunder.ticket.tide.tiger.tilt.timber.time.tiny.tip.tired.tissue.title.toast.tobacco.today.toddler.toe.together.toilet.token.tomato.tomorrow.tone.tongue.tonight.tool.tooth.top.topic.topple.torch.tornado.tortoise.toss.total.tourist.toward.tower.town.toy.track.trade.traffic.tragic.train.transfer.trap.trash.travel.tray.treat.tree.trend.trial.tribe.trick.trigger.trim.trip.trophy.trouble.truck.true.truly.trumpet.trust.truth.try.tube.tuition.tumble.tuna.tunnel.turkey.turn.turtle.twelve.twenty.twice.twin.twist.two.type.typical.ugly.umbrella.unable.unaware.uncle.uncover.under.undo.unfair.unfold.unhappy.uniform.unique.unit.universe.unknown.unlock.until.unusual.unveil.update.upgrade.uphold.upon.upper.upset.urban.urge.usage.use.used.useful.useless.usual.utility.vacant.vacuum.vague.valid.valley.valve.van.vanish.vapor.various.vast.vault.vehicle.velvet.vendor.venture.venue.verb.verify.version.very.vessel.veteran.viable.vibrant.vicious.victory.video.view.village.vintage.violin.virtual.virus.visa.visit.visual.vital.vivid.vocal.voice.void.volcano.volume.vote.voyage.wage.wagon.wait.walk.wall.walnut.want.warfare.warm.warrior.wash.wasp.waste.water.wave.way.wealth.weapon.wear.weasel.weather.web.wedding.weekend.weird.welcome.west.wet.whale.what.wheat.wheel.when.where.whip.whisper.wide.width.wife.wild.will.win.window.wine.wing.wink.winner.winter.wire.wisdom.wise.wish.witness.wolf.woman.wonder.wood.wool.word.work.world.worry.worth.wrap.wreck.wrestle.wrist.write.wrong.yard.year.yellow.you.young.youth.zebra.zero.zone.zoo`.split(`.`);
})), j = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.mnemonicFromRandomSeed = e2.mnemonicIndexesToBytes = e2.bytesToMnemonics = e2.bytesToMnemonicIndexes = e2.mnemonicNew = e2.mnemonicValidate = e2.mnemonicToHDSeed = e2.mnemonicToWalletKey = e2.mnemonicToPrivateKey = e2.mnemonicToSeed = e2.mnemonicToEntropy = void 0;
  let n2 = t2(O()), r2 = w(), i2 = C(), a2 = S(), o2 = k(), s2 = A();
  async function c2(e3) {
    let t3 = await f2(e3);
    return await d2(t3) && !await u2(t3);
  }
  function l2(e3) {
    return e3.map((e4) => e4.toLowerCase().trim());
  }
  async function u2(e3) {
    return (await (0, a2.pbkdf2_sha512)(e3, `TON seed version`, 390, 64))[0] == 0;
  }
  async function d2(e3) {
    return (await (0, a2.pbkdf2_sha512)(e3, `TON fast seed version`, 1, 64))[0] == 1;
  }
  async function f2(e3, t3) {
    return await (0, i2.hmac_sha512)(e3.join(` `), t3 && t3.length > 0 ? t3 : ``);
  }
  e2.mnemonicToEntropy = f2;
  async function p2(e3, t3, n3) {
    let r3 = await f2(e3, n3);
    return await (0, a2.pbkdf2_sha512)(r3, t3, 1e5, 64);
  }
  e2.mnemonicToSeed = p2;
  async function m2(e3, t3) {
    e3 = l2(e3);
    let r3 = await p2(e3, `TON default seed`, t3), i3 = n2.default.sign.keyPair.fromSeed(r3.slice(0, 32));
    return { publicKey: Buffer.from(i3.publicKey), secretKey: Buffer.from(i3.secretKey) };
  }
  e2.mnemonicToPrivateKey = m2;
  async function h2(e3, t3) {
    let r3 = (await m2(e3, t3)).secretKey.slice(0, 32), i3 = n2.default.sign.keyPair.fromSeed(r3);
    return { publicKey: Buffer.from(i3.publicKey), secretKey: Buffer.from(i3.secretKey) };
  }
  e2.mnemonicToWalletKey = h2;
  async function g2(e3, t3) {
    return e3 = l2(e3), await p2(e3, `TON HD Keys seed`, t3);
  }
  e2.mnemonicToHDSeed = g2;
  async function _2(e3, t3) {
    e3 = l2(e3);
    for (let t4 of e3) if (s2.wordlist.indexOf(t4) < 0) return false;
    return t3 && t3.length > 0 && !await c2(e3) ? false : await u2(await f2(e3, t3));
  }
  e2.mnemonicValidate = _2;
  async function v2(e3 = 24, t3) {
    let n3 = [];
    for (; ; ) {
      n3 = [];
      for (let t4 = 0; t4 < e3; t4++) {
        let e4 = await (0, r2.getSecureRandomNumber)(0, s2.wordlist.length);
        n3.push(s2.wordlist[e4]);
      }
      if (!(t3 && t3.length > 0 && !await c2(n3)) && await u2(await f2(n3, t3))) break;
    }
    return n3;
  }
  e2.mnemonicNew = v2;
  function y2(e3, t3) {
    let n3 = (0, o2.bytesToBits)(e3), r3 = [];
    for (let e4 = 0; e4 < t3; e4++) {
      let t4 = n3.slice(e4 * 11, e4 * 11 + 11);
      r3.push(parseInt(t4, 2));
    }
    return r3;
  }
  e2.bytesToMnemonicIndexes = y2;
  function b2(e3, t3) {
    let n3 = y2(e3, t3), r3 = [];
    for (let e4 of n3) r3.push(s2.wordlist[e4]);
    return r3;
  }
  e2.bytesToMnemonics = b2;
  function x2(e3) {
    let t3 = ``;
    for (let n3 of e3) {
      if (!Number.isSafeInteger(n3) || n3 < 0 || n3 >= 2028) throw Error(`Invalid input`);
      t3 += (0, o2.lpad)(n3.toString(2), `0`, 11);
    }
    for (; t3.length % 8 != 0; ) t3 += `0`;
    return (0, o2.bitsToBytes)(t3);
  }
  e2.mnemonicIndexesToBytes = x2;
  async function T2(e3, t3 = 24, n3) {
    let r3 = Math.ceil(t3 * 11 / 8), i3 = e3;
    for (; ; ) {
      let e4 = await (0, a2.pbkdf2_sha512)(i3, `TON mnemonic seed`, 390, r3), o3 = b2(e4, t3);
      if (await _2(o3, n3)) return o3;
      i3 = e4;
    }
  }
  e2.mnemonicFromRandomSeed = T2;
})), M = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.openBox = e2.sealBox = e2.signVerify = e2.sign = e2.keyPairFromSeed = e2.keyPairFromSecretKey = void 0;
  let n2 = t2(O());
  function r2(e3) {
    let t3 = n2.default.sign.keyPair.fromSecretKey(new Uint8Array(e3));
    return { publicKey: Buffer.from(t3.publicKey), secretKey: Buffer.from(t3.secretKey) };
  }
  e2.keyPairFromSecretKey = r2;
  function i2(e3) {
    let t3 = n2.default.sign.keyPair.fromSeed(new Uint8Array(e3));
    return { publicKey: Buffer.from(t3.publicKey), secretKey: Buffer.from(t3.secretKey) };
  }
  e2.keyPairFromSeed = i2;
  function a2(e3, t3) {
    return Buffer.from(n2.default.sign.detached(new Uint8Array(e3), new Uint8Array(t3)));
  }
  e2.sign = a2;
  function o2(e3, t3, r3) {
    return n2.default.sign.detached.verify(new Uint8Array(e3), new Uint8Array(t3), new Uint8Array(r3));
  }
  e2.signVerify = o2;
  function s2(e3, t3, r3) {
    return Buffer.from(n2.default.secretbox(e3, t3, r3));
  }
  e2.sealBox = s2;
  function c2(e3, t3, r3) {
    let i3 = n2.default.secretbox.open(e3, t3, r3);
    return i3 ? Buffer.from(i3) : null;
  }
  e2.openBox = c2;
})), N = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.deriveEd25519Path = e2.deriveED25519HardenedKey = e2.getED25519MasterKeyFromSeed = void 0;
  let t2 = C(), n2 = 2147483648;
  async function r2(e3) {
    let n3 = await (0, t2.hmac_sha512)(`ed25519 seed`, e3);
    return { key: n3.slice(0, 32), chainCode: n3.slice(32) };
  }
  e2.getED25519MasterKeyFromSeed = r2;
  async function i2(e3, r3) {
    if (r3 >= n2) throw Error(`Key index must be less than offset`);
    let i3 = Buffer.alloc(4);
    i3.writeUInt32BE(r3 + n2, 0);
    let a3 = Buffer.concat([Buffer.alloc(1, 0), e3.key, i3]), o2 = await (0, t2.hmac_sha512)(e3.chainCode, a3);
    return { key: o2.slice(0, 32), chainCode: o2.slice(32) };
  }
  e2.deriveED25519HardenedKey = i2;
  async function a2(e3, t3) {
    let n3 = await r2(e3), a3 = [...t3];
    for (; a3.length > 0; ) {
      let e4 = a3[0];
      a3 = a3.slice(1), n3 = await i2(n3, e4);
    }
    return n3.key;
  }
  e2.deriveEd25519Path = a2;
})), P = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.deriveSymmetricPath = e2.deriveSymmetricHardenedKey = e2.getSymmetricMasterKeyFromSeed = void 0;
  let t2 = C();
  async function n2(e3) {
    let n3 = await (0, t2.hmac_sha512)(`Symmetric key seed`, e3);
    return { key: n3.slice(32), chainCode: n3.slice(0, 32) };
  }
  e2.getSymmetricMasterKeyFromSeed = n2;
  async function r2(e3, n3) {
    let r3 = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(n3)]), i3 = await (0, t2.hmac_sha512)(e3.chainCode, r3);
    return { key: i3.slice(32), chainCode: i3.slice(0, 32) };
  }
  e2.deriveSymmetricHardenedKey = r2;
  async function i2(e3, t3) {
    let i3 = await n2(e3), a2 = [...t3];
    for (; a2.length > 0; ) {
      let e4 = a2[0];
      a2 = a2.slice(1), i3 = await r2(i3, e4);
    }
    return i3.key;
  }
  e2.deriveSymmetricPath = i2;
})), F = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.deriveMnemonicsPath = e2.deriveMnemonicHardenedKey = e2.getMnemonicsMasterKeyFromSeed = void 0;
  let t2 = j(), n2 = C(), r2 = 2147483648;
  async function i2(e3) {
    let t3 = await (0, n2.hmac_sha512)(`TON Mnemonics HD seed`, e3);
    return { key: t3.slice(0, 32), chainCode: t3.slice(32) };
  }
  e2.getMnemonicsMasterKeyFromSeed = i2;
  async function a2(e3, t3) {
    if (t3 >= r2) throw Error(`Key index must be less than offset`);
    let i3 = Buffer.alloc(4);
    i3.writeUInt32BE(t3 + r2, 0);
    let a3 = Buffer.concat([Buffer.alloc(1, 0), e3.key, i3]), o3 = await (0, n2.hmac_sha512)(e3.chainCode, a3);
    return { key: o3.slice(0, 32), chainCode: o3.slice(32) };
  }
  e2.deriveMnemonicHardenedKey = a2;
  async function o2(e3, n3, r3 = 24, o3) {
    let s2 = await i2(e3), c2 = [...n3];
    for (; c2.length > 0; ) {
      let e4 = c2[0];
      c2 = c2.slice(1), s2 = await a2(s2, e4);
    }
    return await (0, t2.mnemonicFromRandomSeed)(s2.key, r3, o3);
  }
  e2.deriveMnemonicsPath = o2;
})), I = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getMnemonicsMasterKeyFromSeed = e2.deriveMnemonicHardenedKey = e2.deriveMnemonicsPath = e2.deriveSymmetricPath = e2.deriveSymmetricHardenedKey = e2.getSymmetricMasterKeyFromSeed = e2.deriveEd25519Path = e2.deriveED25519HardenedKey = e2.getED25519MasterKeyFromSeed = e2.signVerify = e2.sign = e2.keyPairFromSecretKey = e2.keyPairFromSeed = e2.openBox = e2.sealBox = e2.mnemonicWordList = e2.mnemonicToHDSeed = e2.mnemonicToSeed = e2.mnemonicToWalletKey = e2.mnemonicToPrivateKey = e2.mnemonicValidate = e2.mnemonicNew = e2.newSecurePassphrase = e2.newSecureWords = e2.getSecureRandomNumber = e2.getSecureRandomWords = e2.getSecureRandomBytes = e2.hmac_sha512 = e2.pbkdf2_sha512 = e2.sha512_sync = e2.sha512 = e2.sha256_sync = e2.sha256 = void 0;
  var t2 = b();
  Object.defineProperty(e2, "sha256", { enumerable: true, get: function() {
    return t2.sha256;
  } }), Object.defineProperty(e2, "sha256_sync", { enumerable: true, get: function() {
    return t2.sha256_sync;
  } });
  var n2 = x();
  Object.defineProperty(e2, "sha512", { enumerable: true, get: function() {
    return n2.sha512;
  } }), Object.defineProperty(e2, "sha512_sync", { enumerable: true, get: function() {
    return n2.sha512_sync;
  } });
  var r2 = S();
  Object.defineProperty(e2, "pbkdf2_sha512", { enumerable: true, get: function() {
    return r2.pbkdf2_sha512;
  } });
  var i2 = C();
  Object.defineProperty(e2, "hmac_sha512", { enumerable: true, get: function() {
    return i2.hmac_sha512;
  } });
  var a2 = w();
  Object.defineProperty(e2, "getSecureRandomBytes", { enumerable: true, get: function() {
    return a2.getSecureRandomBytes;
  } }), Object.defineProperty(e2, "getSecureRandomWords", { enumerable: true, get: function() {
    return a2.getSecureRandomWords;
  } }), Object.defineProperty(e2, "getSecureRandomNumber", { enumerable: true, get: function() {
    return a2.getSecureRandomNumber;
  } });
  var o2 = E();
  Object.defineProperty(e2, "newSecureWords", { enumerable: true, get: function() {
    return o2.newSecureWords;
  } });
  var s2 = D();
  Object.defineProperty(e2, "newSecurePassphrase", { enumerable: true, get: function() {
    return s2.newSecurePassphrase;
  } });
  var c2 = j();
  Object.defineProperty(e2, "mnemonicNew", { enumerable: true, get: function() {
    return c2.mnemonicNew;
  } }), Object.defineProperty(e2, "mnemonicValidate", { enumerable: true, get: function() {
    return c2.mnemonicValidate;
  } }), Object.defineProperty(e2, "mnemonicToPrivateKey", { enumerable: true, get: function() {
    return c2.mnemonicToPrivateKey;
  } }), Object.defineProperty(e2, "mnemonicToWalletKey", { enumerable: true, get: function() {
    return c2.mnemonicToWalletKey;
  } }), Object.defineProperty(e2, "mnemonicToSeed", { enumerable: true, get: function() {
    return c2.mnemonicToSeed;
  } }), Object.defineProperty(e2, "mnemonicToHDSeed", { enumerable: true, get: function() {
    return c2.mnemonicToHDSeed;
  } });
  var l2 = A();
  Object.defineProperty(e2, "mnemonicWordList", { enumerable: true, get: function() {
    return l2.wordlist;
  } });
  var u2 = M();
  Object.defineProperty(e2, "sealBox", { enumerable: true, get: function() {
    return u2.sealBox;
  } }), Object.defineProperty(e2, "openBox", { enumerable: true, get: function() {
    return u2.openBox;
  } });
  var d2 = M();
  Object.defineProperty(e2, "keyPairFromSeed", { enumerable: true, get: function() {
    return d2.keyPairFromSeed;
  } }), Object.defineProperty(e2, "keyPairFromSecretKey", { enumerable: true, get: function() {
    return d2.keyPairFromSecretKey;
  } }), Object.defineProperty(e2, "sign", { enumerable: true, get: function() {
    return d2.sign;
  } }), Object.defineProperty(e2, "signVerify", { enumerable: true, get: function() {
    return d2.signVerify;
  } });
  var f2 = N();
  Object.defineProperty(e2, "getED25519MasterKeyFromSeed", { enumerable: true, get: function() {
    return f2.getED25519MasterKeyFromSeed;
  } }), Object.defineProperty(e2, "deriveED25519HardenedKey", { enumerable: true, get: function() {
    return f2.deriveED25519HardenedKey;
  } }), Object.defineProperty(e2, "deriveEd25519Path", { enumerable: true, get: function() {
    return f2.deriveEd25519Path;
  } });
  var p2 = P();
  Object.defineProperty(e2, "getSymmetricMasterKeyFromSeed", { enumerable: true, get: function() {
    return p2.getSymmetricMasterKeyFromSeed;
  } }), Object.defineProperty(e2, "deriveSymmetricHardenedKey", { enumerable: true, get: function() {
    return p2.deriveSymmetricHardenedKey;
  } }), Object.defineProperty(e2, "deriveSymmetricPath", { enumerable: true, get: function() {
    return p2.deriveSymmetricPath;
  } });
  var m2 = F();
  Object.defineProperty(e2, "deriveMnemonicsPath", { enumerable: true, get: function() {
    return m2.deriveMnemonicsPath;
  } }), Object.defineProperty(e2, "deriveMnemonicHardenedKey", { enumerable: true, get: function() {
    return m2.deriveMnemonicHardenedKey;
  } }), Object.defineProperty(e2, "getMnemonicsMasterKeyFromSeed", { enumerable: true, get: function() {
    return m2.getMnemonicsMasterKeyFromSeed;
  } });
})), L = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.inspectSymbol = void 0, e2.inspectSymbol = Symbol.for(`nodejs.util.inspect.custom`);
})), R = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.crc16 = void 0;
  function t2(e3) {
    let t3 = 0, n2 = Buffer.alloc(e3.length + 2);
    n2.set(e3);
    for (let e4 of n2) {
      let n3 = 128;
      for (; n3 > 0; ) t3 <<= 1, e4 & n3 && (t3 += 1), n3 >>= 1, t3 > 65535 && (t3 &= 65535, t3 ^= 4129);
    }
    return Buffer.from([Math.floor(t3 / 256), t3 % 256]);
  }
  e2.crc16 = t2;
})), z = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.address = e2.Address = void 0;
  let n2 = L(), r2 = R();
  function i2(e3) {
    if (typeof e3 == `string` && !a2.isFriendly(e3)) throw Error(`Unknown address type`);
    let t3 = Buffer.isBuffer(e3) ? e3 : Buffer.from(e3, `base64`);
    if (t3.length !== 36) throw Error(`Unknown address type: byte length is not equal to 36`);
    let n3 = t3.subarray(0, 34), i3 = t3.subarray(34, 36), o3 = (0, r2.crc16)(n3);
    if (o3[0] !== i3[0] || o3[1] !== i3[1]) throw Error(`Invalid checksum: ` + e3);
    let s2 = n3[0], c2 = false, l2 = false;
    if (s2 & 128 && (c2 = true, s2 ^= 128), s2 !== 17 && s2 !== 81) throw `Unknown address tag`;
    l2 = s2 === 17;
    let u2 = null;
    u2 = n3[1] === 255 ? -1 : n3[1];
    let d2 = n3.subarray(2, 34);
    return { isTestOnly: c2, isBounceable: l2, workchain: u2, hashPart: d2 };
  }
  var a2 = class e3 {
    static isAddress(t3) {
      return t3 instanceof e3;
    }
    static isFriendly(e4) {
      return !(e4.length !== 48 || !/^[A-Za-z0-9+/_-]+$/.test(e4));
    }
    static isRaw(e4) {
      if (e4.indexOf(`:`) === -1) return false;
      let [t3, n3] = e4.split(`:`);
      return !(!Number.isInteger(parseFloat(t3)) || !/[a-f0-9]+/.test(n3.toLowerCase()) || n3.length !== 64);
    }
    static normalize(t3) {
      return typeof t3 == `string` ? e3.parse(t3).toString() : t3.toString();
    }
    static parse(t3) {
      if (e3.isFriendly(t3)) return this.parseFriendly(t3).address;
      if (e3.isRaw(t3)) return this.parseRaw(t3);
      throw Error(`Unknown address type: ` + t3);
    }
    static parseRaw(t3) {
      let n3 = parseInt(t3.split(`:`)[0]), r3 = Buffer.from(t3.split(`:`)[1], `hex`);
      return new e3(n3, r3);
    }
    static parseFriendly(t3) {
      if (Buffer.isBuffer(t3)) {
        let n3 = i2(t3);
        return { isBounceable: n3.isBounceable, isTestOnly: n3.isTestOnly, address: new e3(n3.workchain, n3.hashPart) };
      }
      {
        let n3 = i2(t3.replace(/\-/g, `+`).replace(/_/g, `/`));
        return { isBounceable: n3.isBounceable, isTestOnly: n3.isTestOnly, address: new e3(n3.workchain, n3.hashPart) };
      }
    }
    constructor(e4, n3) {
      if (this.toRawString = () => this.workChain + `:` + this.hash.toString(`hex`), this.toRaw = () => {
        let e5 = Buffer.alloc(36);
        return e5.set(this.hash), e5.set([this.workChain, this.workChain, this.workChain, this.workChain], 32), e5;
      }, this.toStringBuffer = (e5) => {
        let t3 = e5 && e5.testOnly !== void 0 ? e5.testOnly : false, n4 = !(e5 && e5.bounceable !== void 0) || e5.bounceable ? 17 : 81;
        t3 && (n4 |= 128);
        let i3 = Buffer.alloc(34);
        i3[0] = n4, i3[1] = this.workChain, i3.set(this.hash, 2);
        let a3 = Buffer.alloc(36);
        return a3.set(i3), a3.set((0, r2.crc16)(i3), 34), a3;
      }, this.toString = (e5) => {
        let t3 = e5 && e5.urlSafe !== void 0 ? e5.urlSafe : true, n4 = this.toStringBuffer(e5);
        return t3 ? n4.toString(`base64`).replace(/\+/g, `-`).replace(/\//g, `_`) : n4.toString(`base64`);
      }, this[t2] = () => this.toString(), n3.length !== 32) throw Error(`Invalid address hash length: ` + n3.length);
      this.workChain = e4, this.hash = n3, Object.freeze(this);
    }
    equals(e4) {
      return e4.workChain === this.workChain && e4.hash.equals(this.hash);
    }
  };
  e2.Address = a2, t2 = n2.inspectSymbol;
  function o2(e3) {
    return a2.parse(e3);
  }
  e2.address = o2;
})), B = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ExternalAddress = void 0;
  let n2 = L();
  e2.ExternalAddress = class e3 {
    static isAddress(t3) {
      return t3 instanceof e3;
    }
    constructor(e4, n3) {
      this[t2] = () => this.toString(), this.value = e4, this.bits = n3;
    }
    toString() {
      return `External<${this.bits}:${this.value}>`;
    }
  }, t2 = n2.inspectSymbol;
})), V = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.base32Decode = e2.base32Encode = void 0;
  let t2 = `abcdefghijklmnopqrstuvwxyz234567`;
  function n2(e3) {
    let n3 = e3.byteLength, r3 = 0, i3 = 0, a2 = ``;
    for (let o2 = 0; o2 < n3; o2++) for (i3 = i3 << 8 | e3[o2], r3 += 8; r3 >= 5; ) a2 += t2[i3 >>> r3 - 5 & 31], r3 -= 5;
    return r3 > 0 && (a2 += t2[i3 << 5 - r3 & 31]), a2;
  }
  e2.base32Encode = n2;
  function r2(e3, t3) {
    let n3 = e3.indexOf(t3);
    if (n3 === -1) throw Error(`Invalid character found: ` + t3);
    return n3;
  }
  function i2(e3) {
    let n3;
    n3 = e3.toLowerCase();
    let { length: i3 } = n3, a2 = 0, o2 = 0, s2 = 0, c2 = Buffer.alloc(i3 * 5 / 8 | 0);
    for (let e4 = 0; e4 < i3; e4++) o2 = o2 << 5 | r2(t2, n3[e4]), a2 += 5, a2 >= 8 && (c2[s2++] = o2 >>> a2 - 8 & 255, a2 -= 8);
    return c2;
  }
  e2.base32Decode = i2;
})), H = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ADNLAddress = void 0;
  let n2 = L(), r2 = V(), i2 = R();
  e2.ADNLAddress = class e3 {
    static parseFriendly(t3) {
      if (t3.length !== 55) throw Error(`Invalid address`);
      t3 = `f` + t3;
      let n3 = (0, r2.base32Decode)(t3);
      if (n3[0] !== 45) throw Error(`Invalid address`);
      let a2 = n3.slice(33);
      if (!(0, i2.crc16)(n3.slice(0, 33)).equals(a2)) throw Error(`Invalid address`);
      return new e3(n3.slice(1, 33));
    }
    static parseRaw(t3) {
      let n3 = Buffer.from(t3, `base64`);
      return new e3(n3);
    }
    constructor(e4) {
      if (this.toRaw = () => this.address.toString(`hex`).toUpperCase(), this.toString = () => {
        let e5 = Buffer.concat([Buffer.from([45]), this.address]), t3 = (0, i2.crc16)(e5);
        return e5 = Buffer.concat([e5, t3]), (0, r2.base32Encode)(e5).slice(1);
      }, this[t2] = () => this.toString(), e4.length !== 32) throw Error(`Invalid address`);
      this.address = e4;
    }
    equals(e4) {
      return this.address.equals(e4.address);
    }
  }, t2 = n2.inspectSymbol;
})), U = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.paddedBufferToBits = e2.bitsToPaddedBuffer = void 0;
  let t2 = G(), n2 = W();
  function r2(e3) {
    let n3 = new t2.BitBuilder(Math.ceil(e3.length / 8) * 8);
    n3.writeBits(e3);
    let r3 = Math.ceil(e3.length / 8) * 8 - e3.length;
    for (let e4 = 0; e4 < r3; e4++) e4 === 0 ? n3.writeBit(1) : n3.writeBit(0);
    return n3.buffer();
  }
  e2.bitsToPaddedBuffer = r2;
  function i2(e3) {
    let t3 = 0;
    for (let n3 = e3.length - 1; n3 >= 0; n3--) if (e3[n3] !== 0) {
      let r3 = e3[n3], i3 = r3 & -r3;
      i3 & 1 || (i3 = Math.log2(i3) + 1), n3 > 0 && (t3 = n3 << 3), t3 += 8 - i3;
      break;
    }
    return new n2.BitString(e3, 0, t3);
  }
  e2.paddedBufferToBits = i2;
})), W = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.BitString = void 0;
  let n2 = U(), r2 = L();
  var i2 = class e3 {
    static isBitString(t3) {
      return t3 instanceof e3;
    }
    constructor(e4, n3, r3) {
      if (this[t2] = () => this.toString(), r3 < 0) throw Error(`Length ${r3} is out of bounds`);
      this._length = r3, this._data = e4, this._offset = n3;
    }
    get length() {
      return this._length;
    }
    at(e4) {
      if (e4 >= this._length) throw Error(`Index ${e4} > ${this._length} is out of bounds`);
      if (e4 < 0) throw Error(`Index ${e4} < 0 is out of bounds`);
      let t3 = this._offset + e4 >> 3, n3 = 7 - (this._offset + e4) % 8;
      return !!(this._data[t3] & 1 << n3);
    }
    substring(t3, n3) {
      if (t3 > this._length) throw Error(`Offset(${t3}) > ${this._length} is out of bounds`);
      if (t3 < 0) throw Error(`Offset(${t3}) < 0 is out of bounds`);
      if (n3 === 0) return e3.EMPTY;
      if (t3 + n3 > this._length) throw Error(`Offset ${t3} + Length ${n3} > ${this._length} is out of bounds`);
      return new e3(this._data, this._offset + t3, n3);
    }
    subbuffer(e4, t3) {
      if (e4 > this._length || e4 < 0) throw Error(`Offset ${e4} is out of bounds`);
      if (e4 + t3 > this._length) throw Error(`Offset + Length = ${e4 + t3} is out of bounds`);
      if (t3 % 8 != 0 || (this._offset + e4) % 8 != 0) return null;
      let n3 = this._offset + e4 >> 3, r3 = n3 + (t3 >> 3);
      return this._data.subarray(n3, r3);
    }
    equals(e4) {
      if (this._length !== e4._length) return false;
      for (let t3 = 0; t3 < this._length; t3++) if (this.at(t3) !== e4.at(t3)) return false;
      return true;
    }
    toString() {
      let e4 = (0, n2.bitsToPaddedBuffer)(this);
      if (this._length % 4 == 0) {
        let t3 = e4.subarray(0, Math.ceil(this._length / 8)).toString(`hex`).toUpperCase();
        return this._length % 8 == 0 ? t3 : t3.substring(0, t3.length - 1);
      }
      {
        let t3 = e4.toString(`hex`).toUpperCase();
        return this._length % 8 <= 4 ? t3.substring(0, t3.length - 1) + `_` : t3 + `_`;
      }
    }
  };
  e2.BitString = i2, t2 = r2.inspectSymbol, i2.EMPTY = new i2(Buffer.alloc(0), 0, 0);
})), G = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.BitBuilder = void 0;
  let t2 = z(), n2 = B(), r2 = W();
  e2.BitBuilder = class {
    constructor(e3 = 1023) {
      this._buffer = Buffer.alloc(Math.ceil(e3 / 8)), this._length = 0;
    }
    get length() {
      return this._length;
    }
    writeBit(e3) {
      let t3 = this._length;
      if (t3 > this._buffer.length * 8) throw Error(`BitBuilder overflow`);
      (typeof e3 == `boolean` && e3 === true || typeof e3 == `number` && e3 > 0) && (this._buffer[t3 / 8 | 0] |= 1 << 7 - t3 % 8), this._length++;
    }
    writeBits(e3) {
      for (let t3 = 0; t3 < e3.length; t3++) this.writeBit(e3.at(t3));
    }
    writeBuffer(e3) {
      if (this._length % 8 == 0) {
        if (this._length + e3.length * 8 > this._buffer.length * 8) throw Error(`BitBuilder overflow`);
        e3.copy(this._buffer, this._length / 8), this._length += e3.length * 8;
      } else for (let t3 = 0; t3 < e3.length; t3++) this.writeUint(e3[t3], 8);
    }
    writeUint(e3, t3) {
      if (t3 < 0 || !Number.isSafeInteger(t3)) throw Error(`invalid bit length. Got ${t3}`);
      let n3 = BigInt(e3);
      if (t3 === 0) {
        if (n3 !== 0n) throw Error(`value is not zero for ${t3} bits. Got ${e3}`);
        return;
      }
      let r3 = 1n << BigInt(t3);
      if (n3 < 0 || n3 >= r3) throw Error(`bitLength is too small for a value ${e3}. Got ${t3}`);
      if (this._length + t3 > this._buffer.length * 8) throw Error(`BitBuilder overflow`);
      let i2 = 8 - this._length % 8;
      if (i2 > 0) {
        let e4 = Math.floor(this._length / 8);
        if (t3 < i2) {
          let r4 = Number(n3);
          this._buffer[e4] |= r4 << i2 - t3, this._length += t3;
        } else {
          let r4 = Number(n3 >> BigInt(t3 - i2));
          this._buffer[e4] |= r4, this._length += i2;
        }
      }
      for (t3 -= i2; t3 > 0; ) t3 >= 8 ? (this._buffer[this._length / 8] = Number(n3 >> BigInt(t3 - 8) & 255n), this._length += 8, t3 -= 8) : (this._buffer[this._length / 8] = Number(n3 << BigInt(8 - t3) & 255n), this._length += t3, t3 = 0);
    }
    writeInt(e3, t3) {
      let n3 = BigInt(e3);
      if (t3 < 0 || !Number.isSafeInteger(t3)) throw Error(`invalid bit length. Got ${t3}`);
      if (t3 === 0) {
        if (n3 !== 0n) throw Error(`value is not zero for ${t3} bits. Got ${e3}`);
        return;
      }
      if (t3 === 1) {
        if (n3 !== -1n && n3 !== 0n) throw Error(`value is not zero or -1 for ${t3} bits. Got ${e3}`);
        this.writeBit(n3 === -1n);
        return;
      }
      let r3 = 1n << BigInt(t3) - 1n;
      if (n3 < -r3 || n3 >= r3) throw Error(`value is out of range for ${t3} bits. Got ${e3}`);
      n3 < 0 ? (this.writeBit(true), n3 = r3 + n3) : this.writeBit(false), this.writeUint(n3, t3 - 1);
    }
    writeVarUint(e3, t3) {
      let n3 = BigInt(e3);
      if (t3 < 0 || !Number.isSafeInteger(t3)) throw Error(`invalid bit length. Got ${t3}`);
      if (n3 < 0) throw Error(`value is negative. Got ${e3}`);
      if (n3 === 0n) {
        this.writeUint(0, t3);
        return;
      }
      let r3 = Math.ceil(n3.toString(2).length / 8), i2 = r3 * 8;
      this.writeUint(r3, t3), this.writeUint(n3, i2);
    }
    writeVarInt(e3, t3) {
      let n3 = BigInt(e3);
      if (t3 < 0 || !Number.isSafeInteger(t3)) throw Error(`invalid bit length. Got ${t3}`);
      if (n3 === 0n) {
        this.writeUint(0, t3);
        return;
      }
      let r3 = n3 > 0 ? n3 : -n3, i2 = Math.ceil((r3.toString(2).length + 1) / 8), a2 = i2 * 8;
      this.writeUint(i2, t3), this.writeInt(n3, a2);
    }
    writeCoins(e3) {
      this.writeVarUint(e3, 4);
    }
    writeAddress(e3) {
      if (e3 == null) {
        this.writeUint(0, 2);
        return;
      }
      if (t2.Address.isAddress(e3)) {
        this.writeUint(2, 2), this.writeUint(0, 1), this.writeInt(e3.workChain, 8), this.writeBuffer(e3.hash);
        return;
      }
      if (n2.ExternalAddress.isAddress(e3)) {
        this.writeUint(1, 2), this.writeUint(e3.bits, 9), this.writeUint(e3.value, e3.bits);
        return;
      }
      throw Error(`Invalid address. Got ${e3}`);
    }
    build() {
      return new r2.BitString(this._buffer, 0, this._length);
    }
    buffer() {
      if (this._length % 8 != 0) throw Error(`BitBuilder buffer is not byte aligned`);
      return this._buffer.subarray(0, this._length / 8);
    }
  };
})), K = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.CellType = void 0;
  var t2;
  (function(e3) {
    e3[e3.Ordinary = -1] = `Ordinary`, e3[e3.PrunedBranch = 1] = `PrunedBranch`, e3[e3.Library = 2] = `Library`, e3[e3.MerkleProof = 3] = `MerkleProof`, e3[e3.MerkleUpdate = 4] = `MerkleUpdate`;
  })(t2 || (e2.CellType = t2 = {}));
})), q = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.readUnaryLength = void 0;
  function t2(e3) {
    let t3 = 0;
    for (; e3.loadBit(); ) t3++;
    return t3;
  }
  e2.readUnaryLength = t2;
})), J = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.BitReader = void 0;
  let t2 = z(), n2 = B();
  e2.BitReader = class e3 {
    constructor(e4, t3 = 0) {
      this._checkpoints = [], this._bits = e4, this._offset = t3;
    }
    get offset() {
      return this._offset;
    }
    get remaining() {
      return this._bits.length - this._offset;
    }
    skip(e4) {
      if (e4 < 0 || this._offset + e4 > this._bits.length) throw Error(`Index ${this._offset + e4} is out of bounds`);
      this._offset += e4;
    }
    reset() {
      this._offset = this._checkpoints.length > 0 ? this._checkpoints.pop() : 0;
    }
    save() {
      this._checkpoints.push(this._offset);
    }
    loadBit() {
      let e4 = this._bits.at(this._offset);
      return this._offset++, e4;
    }
    preloadBit() {
      return this._bits.at(this._offset);
    }
    loadBits(e4) {
      let t3 = this._bits.substring(this._offset, e4);
      return this._offset += e4, t3;
    }
    preloadBits(e4) {
      return this._bits.substring(this._offset, e4);
    }
    loadBuffer(e4) {
      let t3 = this._preloadBuffer(e4, this._offset);
      return this._offset += e4 * 8, t3;
    }
    preloadBuffer(e4) {
      return this._preloadBuffer(e4, this._offset);
    }
    loadUint(e4) {
      return this._toSafeInteger(this.loadUintBig(e4), `loadUintBig`);
    }
    loadUintBig(e4) {
      let t3 = this.preloadUintBig(e4);
      return this._offset += e4, t3;
    }
    preloadUint(e4) {
      return this._toSafeInteger(this._preloadUint(e4, this._offset), `preloadUintBig`);
    }
    preloadUintBig(e4) {
      return this._preloadUint(e4, this._offset);
    }
    loadInt(e4) {
      let t3 = this._preloadInt(e4, this._offset);
      return this._offset += e4, this._toSafeInteger(t3, `loadUintBig`);
    }
    loadIntBig(e4) {
      let t3 = this._preloadInt(e4, this._offset);
      return this._offset += e4, t3;
    }
    preloadInt(e4) {
      return this._toSafeInteger(this._preloadInt(e4, this._offset), `preloadIntBig`);
    }
    preloadIntBig(e4) {
      return this._preloadInt(e4, this._offset);
    }
    loadVarUint(e4) {
      let t3 = Number(this.loadUint(e4));
      return this._toSafeInteger(this.loadUintBig(t3 * 8), `loadVarUintBig`);
    }
    loadVarUintBig(e4) {
      let t3 = Number(this.loadUint(e4));
      return this.loadUintBig(t3 * 8);
    }
    preloadVarUint(e4) {
      let t3 = Number(this._preloadUint(e4, this._offset));
      return this._toSafeInteger(this._preloadUint(t3 * 8, this._offset + e4), `preloadVarUintBig`);
    }
    preloadVarUintBig(e4) {
      let t3 = Number(this._preloadUint(e4, this._offset));
      return this._preloadUint(t3 * 8, this._offset + e4);
    }
    loadVarInt(e4) {
      let t3 = Number(this.loadUint(e4));
      return this._toSafeInteger(this.loadIntBig(t3 * 8), `loadVarIntBig`);
    }
    loadVarIntBig(e4) {
      let t3 = Number(this.loadUint(e4));
      return this.loadIntBig(t3 * 8);
    }
    preloadVarInt(e4) {
      let t3 = Number(this._preloadUint(e4, this._offset));
      return this._toSafeInteger(this._preloadInt(t3 * 8, this._offset + e4), `preloadVarIntBig`);
    }
    preloadVarIntBig(e4) {
      let t3 = Number(this._preloadUint(e4, this._offset));
      return this._preloadInt(t3 * 8, this._offset + e4);
    }
    loadCoins() {
      return this.loadVarUintBig(4);
    }
    preloadCoins() {
      return this.preloadVarUintBig(4);
    }
    loadAddress() {
      let e4 = Number(this._preloadUint(2, this._offset));
      if (e4 === 2) return this._loadInternalAddress();
      throw Error(`Invalid address: ` + e4);
    }
    loadMaybeAddress() {
      let e4 = Number(this._preloadUint(2, this._offset));
      if (e4 === 0) return this._offset += 2, null;
      if (e4 === 2) return this._loadInternalAddress();
      throw Error(`Invalid address`);
    }
    loadExternalAddress() {
      if (Number(this._preloadUint(2, this._offset)) === 1) return this._loadExternalAddress();
      throw Error(`Invalid address`);
    }
    loadMaybeExternalAddress() {
      let e4 = Number(this._preloadUint(2, this._offset));
      if (e4 === 0) return this._offset += 2, null;
      if (e4 === 1) return this._loadExternalAddress();
      throw Error(`Invalid address`);
    }
    loadAddressAny() {
      let e4 = Number(this._preloadUint(2, this._offset));
      if (e4 === 0) return this._offset += 2, null;
      if (e4 === 2) return this._loadInternalAddress();
      if (e4 === 1) return this._loadExternalAddress();
      throw Error(e4 === 3 ? `Unsupported` : `Unreachable`);
    }
    loadPaddedBits(e4) {
      if (e4 % 8 != 0) throw Error(`Invalid number of bits`);
      let t3 = e4;
      for (; ; ) if (this._bits.at(this._offset + t3 - 1)) {
        t3--;
        break;
      } else t3--;
      let n3 = this._bits.substring(this._offset, t3);
      return this._offset += e4, n3;
    }
    clone() {
      return new e3(this._bits, this._offset);
    }
    _preloadInt(e4, t3) {
      if (e4 == 0) return 0n;
      let n3 = this._bits.at(t3), r2 = 0n;
      for (let n4 = 0; n4 < e4 - 1; n4++) this._bits.at(t3 + 1 + n4) && (r2 += 1n << BigInt(e4 - n4 - 1 - 1));
      return n3 && (r2 -= 1n << BigInt(e4 - 1)), r2;
    }
    _preloadUint(e4, t3) {
      if (e4 == 0) return 0n;
      let n3 = 0n;
      for (let r2 = 0; r2 < e4; r2++) this._bits.at(t3 + r2) && (n3 += 1n << BigInt(e4 - r2 - 1));
      return n3;
    }
    _preloadBuffer(e4, t3) {
      let n3 = this._bits.subbuffer(t3, e4 * 8);
      if (n3) return n3;
      let r2 = Buffer.alloc(e4);
      for (let n4 = 0; n4 < e4; n4++) r2[n4] = Number(this._preloadUint(8, t3 + n4 * 8));
      return r2;
    }
    _loadInternalAddress() {
      if (Number(this._preloadUint(2, this._offset)) !== 2) throw Error(`Invalid address`);
      let e4, n3;
      this._preloadUint(1, this._offset + 2) !== 0n && (n3 = Number(this._preloadUint(5, this._offset + 3)), e4 = this._preloadUint(n3, this._offset + 8), this._offset += 5 + n3);
      let r2 = Number(this._preloadInt(8, this._offset + 3)), i2 = this._preloadBuffer(32, this._offset + 11);
      if (n3 !== void 0 && e4 !== void 0) {
        let t3 = Number(e4), r3 = 0, a2 = 0, o2 = n3;
        for (; o2 > 0; ) {
          let e5 = Math.min(8 - a2, o2), n4 = (1 << e5) - 1 << 8 - a2 - e5, s2 = (t3 >> o2 - e5 & (1 << e5) - 1) << 8 - a2 - e5;
          i2[r3] = i2[r3] & ~n4 | s2, o2 -= e5, a2 += e5, a2 === 8 && (r3++, a2 = 0);
        }
      }
      return this._offset += 267, new t2.Address(r2, i2);
    }
    _loadExternalAddress() {
      if (Number(this._preloadUint(2, this._offset)) !== 1) throw Error(`Invalid address`);
      let e4 = Number(this._preloadUint(9, this._offset + 2)), t3 = this._preloadUint(e4, this._offset + 11);
      return this._offset += 11 + e4, new n2.ExternalAddress(t3, e4);
    }
    _toSafeInteger(e4, t3) {
      if (BigInt(2 ** 53 - 1) < e4 || e4 < BigInt(-(2 ** 53 - 1))) throw TypeError(`${e4} is out of safe integer range. Use ${t3} instead`);
      return Number(e4);
    }
  };
})), Y = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.convertToMerkleProof = e2.exoticMerkleProof = void 0;
  let t2 = J(), n2 = be();
  function r2(e3, n3) {
    let r3 = new t2.BitReader(e3);
    if (e3.length !== 280) throw Error(`Merkle Proof cell must have exactly (8 + 256 + 16) bits, got "${e3.length}"`);
    if (n3.length !== 1) throw Error(`Merkle Proof cell must have exactly 1 ref, got "${n3.length}"`);
    let i3 = r3.loadUint(8);
    if (i3 !== 3) throw Error(`Merkle Proof cell must have type 3, got "${i3}"`);
    let a2 = r3.loadBuffer(32), o2 = r3.loadUint(16), s2 = n3[0].hash(0), c2 = n3[0].depth(0);
    if (o2 !== c2) throw Error(`Merkle Proof cell ref depth must be exactly "${o2}", got "${c2}"`);
    if (!a2.equals(s2)) throw Error(`Merkle Proof cell ref hash must be exactly "${a2.toString(`hex`)}", got "${s2.toString(`hex`)}"`);
    return { proofDepth: o2, proofHash: a2 };
  }
  e2.exoticMerkleProof = r2;
  function i2(e3) {
    return (0, n2.beginCell)().storeUint(3, 8).storeBuffer(e3.hash(0)).storeUint(e3.depth(0), 16).storeRef(e3).endCell({ exotic: true });
  }
  e2.convertToMerkleProof = i2;
})), X = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.generateMerkleProof = e2.generateMerkleProofDirect = void 0;
  let t2 = be(), n2 = q(), r2 = Y();
  function i2(e3) {
    return (0, t2.beginCell)().storeUint(1, 8).storeUint(1, 8).storeBuffer(e3.hash(0)).storeUint(e3.depth(0), 16).endCell({ exotic: true });
  }
  function a2(e3, r3, o3, s3) {
    let c2 = r3.asCell();
    if (s3.length == 0) return i2(c2);
    let l2 = +!!r3.loadBit(), u2 = 0, d2 = e3;
    if (l2 === 0) {
      u2 = (0, n2.readUnaryLength)(r3);
      for (let e4 = 0; e4 < u2; e4++) d2 += r3.loadBit() ? `1` : `0`;
    } else if (+!!r3.loadBit() == 0) {
      u2 = r3.loadUint(Math.ceil(Math.log2(o3 + 1)));
      for (let e4 = 0; e4 < u2; e4++) d2 += r3.loadBit() ? `1` : `0`;
    } else {
      let e4 = r3.loadBit() ? `1` : `0`;
      u2 = r3.loadUint(Math.ceil(Math.log2(o3 + 1)));
      for (let t3 = 0; t3 < u2; t3++) d2 += e4;
    }
    if (o3 - u2 === 0) return c2;
    {
      let e4 = c2.beginParse(), n3 = e4.loadRef(), r4 = e4.loadRef();
      if (!n3.isExotic) {
        let e5 = s3.filter((e6) => d2 + `0` === e6.slice(0, d2.length + 1));
        n3 = a2(d2 + `0`, n3.beginParse(), o3 - u2 - 1, e5);
      }
      if (!r4.isExotic) {
        let e5 = s3.filter((e6) => d2 + `1` === e6.slice(0, d2.length + 1));
        r4 = a2(d2 + `1`, r4.beginParse(), o3 - u2 - 1, e5);
      }
      return (0, t2.beginCell)().storeSlice(e4).storeRef(n3).storeRef(r4).endCell();
    }
  }
  function o2(e3, n3, r3) {
    return n3.forEach((t3) => {
      if (!e3.has(t3)) throw Error(`Trying to generate merkle proof for a missing key "${t3}"`);
    }), a2(``, (0, t2.beginCell)().storeDictDirect(e3).asSlice(), r3.bits, n3.map((e4) => r3.serialize(e4).toString(2).padStart(r3.bits, `0`)));
  }
  e2.generateMerkleProofDirect = o2;
  function s2(e3, t3, n3) {
    return (0, r2.convertToMerkleProof)(o2(e3, t3, n3));
  }
  e2.generateMerkleProof = s2;
})), ee = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.generateMerkleUpdate = void 0;
  let t2 = be(), n2 = X();
  function r2(e3, n3) {
    return (0, t2.beginCell)().storeUint(4, 8).storeBuffer(e3.hash(0)).storeBuffer(n3.hash(0)).storeUint(e3.depth(0), 16).storeUint(n3.depth(0), 16).storeRef(e3).storeRef(n3).endCell({ exotic: true });
  }
  function i2(e3, t3, i3, a2) {
    let o2 = (0, n2.generateMerkleProof)(e3, [t3], i3).refs[0];
    e3.set(t3, a2);
    let s2 = (0, n2.generateMerkleProof)(e3, [t3], i3).refs[0];
    return r2(o2, s2);
  }
  e2.generateMerkleUpdate = i2;
})), te = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.parseDict = void 0;
  function t2(e3) {
    let t3 = 0;
    for (; e3.loadBit(); ) t3++;
    return t3;
  }
  function n2(e3, r3, i2, a2, o2) {
    let s2 = +!!r3.loadBit(), c2 = 0, l2 = e3;
    if (s2 === 0) {
      c2 = t2(r3);
      for (let e4 = 0; e4 < c2; e4++) l2 += r3.loadBit() ? `1` : `0`;
    } else if (+!!r3.loadBit() == 0) {
      c2 = r3.loadUint(Math.ceil(Math.log2(i2 + 1)));
      for (let e4 = 0; e4 < c2; e4++) l2 += r3.loadBit() ? `1` : `0`;
    } else {
      let e4 = r3.loadBit() ? `1` : `0`;
      c2 = r3.loadUint(Math.ceil(Math.log2(i2 + 1)));
      for (let t3 = 0; t3 < c2; t3++) l2 += e4;
    }
    if (i2 - c2 === 0) a2.set(BigInt(`0b` + l2), o2(r3));
    else {
      let e4 = r3.loadRef(), t3 = r3.loadRef();
      e4.isExotic || n2(l2 + `0`, e4.beginParse(), i2 - c2 - 1, a2, o2), t3.isExotic || n2(l2 + `1`, t3.beginParse(), i2 - c2 - 1, a2, o2);
    }
  }
  function r2(e3, t3, r3) {
    let i2 = /* @__PURE__ */ new Map();
    return e3 && n2(``, e3, t3, i2, r3), i2;
  }
  e2.parseDict = r2;
})), ne = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.findCommonPrefix = void 0;
  function t2(e3, t3 = 0) {
    if (e3.length === 0) return ``;
    let n2 = e3[0].slice(t3);
    for (let r2 = 1; r2 < e3.length; r2++) {
      let i2 = e3[r2];
      for (; i2.indexOf(n2, t3) !== t3; ) if (n2 = n2.substring(0, n2.length - 1), n2 === ``) return n2;
    }
    return n2;
  }
  e2.findCommonPrefix = t2;
})), re = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.serializeDict = e2.detectLabelType = e2.writeLabelSame = e2.writeLabelLong = e2.writeLabelShort = e2.buildTree = void 0;
  let t2 = be(), n2 = ne();
  function r2(e3, t3) {
    for (; e3.length < t3; ) e3 = `0` + e3;
    return e3;
  }
  function i2(e3, t3) {
    if (e3.size === 0) throw Error(`Internal inconsistency`);
    let n3 = /* @__PURE__ */ new Map(), r3 = /* @__PURE__ */ new Map();
    for (let [i3, a3] of e3.entries()) i3[t3] === `0` ? n3.set(i3, a3) : r3.set(i3, a3);
    if (n3.size === 0) throw Error(`Internal inconsistency. Left emtpy.`);
    if (r3.size === 0) throw Error(`Internal inconsistency. Right emtpy.`);
    return { left: n3, right: r3 };
  }
  function a2(e3, t3) {
    if (e3.size === 0) throw Error(`Internal inconsistency`);
    if (e3.size === 1) return { type: `leaf`, value: Array.from(e3.values())[0] };
    let { left: n3, right: r3 } = i2(e3, t3);
    return { type: `fork`, left: o2(n3, t3 + 1), right: o2(r3, t3 + 1) };
  }
  function o2(e3, t3 = 0) {
    if (e3.size === 0) throw Error(`Internal inconsistency`);
    let r3 = (0, n2.findCommonPrefix)(Array.from(e3.keys()), t3);
    return { label: r3, node: a2(e3, r3.length + t3) };
  }
  function s2(e3, t3) {
    let n3 = /* @__PURE__ */ new Map();
    for (let i3 of Array.from(e3.keys())) {
      let a3 = r2(i3.toString(2), t3);
      n3.set(a3, e3.get(i3));
    }
    return o2(n3);
  }
  e2.buildTree = s2;
  function c2(e3, t3) {
    t3.storeBit(0);
    for (let n3 = 0; n3 < e3.length; n3++) t3.storeBit(1);
    return t3.storeBit(0), e3.length > 0 && t3.storeUint(BigInt(`0b` + e3), e3.length), t3;
  }
  e2.writeLabelShort = c2;
  function l2(e3) {
    return 1 + e3.length + 1 + e3.length;
  }
  function u2(e3, t3, n3) {
    n3.storeBit(1), n3.storeBit(0);
    let r3 = Math.ceil(Math.log2(t3 + 1));
    return n3.storeUint(e3.length, r3), e3.length > 0 && n3.storeUint(BigInt(`0b` + e3), e3.length), n3;
  }
  e2.writeLabelLong = u2;
  function d2(e3, t3) {
    return 2 + Math.ceil(Math.log2(t3 + 1)) + e3.length;
  }
  function f2(e3, t3, n3, r3) {
    r3.storeBit(1), r3.storeBit(1), r3.storeBit(e3);
    let i3 = Math.ceil(Math.log2(n3 + 1));
    r3.storeUint(t3, i3);
  }
  e2.writeLabelSame = f2;
  function p2(e3) {
    return 3 + Math.ceil(Math.log2(e3 + 1));
  }
  function m2(e3) {
    if (e3.length === 0 || e3.length === 1) return true;
    for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3] !== e3[0]) return false;
    return true;
  }
  function h2(e3, t3) {
    let n3 = `short`, r3 = l2(e3), i3 = d2(e3, t3);
    if (i3 < r3 && (r3 = i3, n3 = `long`), m2(e3)) {
      let e4 = p2(t3);
      e4 < r3 && (r3 = e4, n3 = `same`);
    }
    return n3;
  }
  e2.detectLabelType = h2;
  function g2(e3, t3, n3) {
    let r3 = h2(e3, t3);
    r3 === `short` ? c2(e3, n3) : r3 === `long` ? u2(e3, t3, n3) : r3 === `same` && f2(e3[0] === `1`, e3.length, t3, n3);
  }
  function _2(e3, n3, r3, i3) {
    if (e3.type === `leaf` && r3(e3.value, i3), e3.type === `fork`) {
      let a3 = (0, t2.beginCell)(), o3 = (0, t2.beginCell)();
      v2(e3.left, n3 - 1, r3, a3), v2(e3.right, n3 - 1, r3, o3), i3.storeRef(a3), i3.storeRef(o3);
    }
  }
  function v2(e3, t3, n3, r3) {
    g2(e3.label, t3, r3), _2(e3.node, t3 - e3.label.length, n3, r3);
  }
  function y2(e3, t3, n3, r3) {
    v2(s2(e3, t3), t3, n3, r3);
  }
  e2.serializeDict = y2;
})), ie = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.deserializeInternalKey = e2.serializeInternalKey = void 0;
  let t2 = z(), n2 = W(), r2 = U();
  function i2(e3) {
    if (typeof e3 == `number`) {
      if (!Number.isSafeInteger(e3)) throw Error(`Invalid key type: not a safe integer: ` + e3);
      return `n:` + e3.toString(10);
    }
    if (typeof e3 == `bigint`) return `b:` + e3.toString(10);
    if (t2.Address.isAddress(e3)) return `a:` + e3.toString();
    if (Buffer.isBuffer(e3)) return `f:` + e3.toString(`hex`);
    if (n2.BitString.isBitString(e3)) return `B:` + e3.toString();
    throw Error(`Invalid key type`);
  }
  e2.serializeInternalKey = i2;
  function a2(e3) {
    let i3 = e3.slice(0, 2), a3 = e3.slice(2);
    if (i3 === `n:`) return parseInt(a3, 10);
    if (i3 === `b:`) return BigInt(a3);
    if (i3 === `a:`) return t2.Address.parse(a3);
    if (i3 === `f:`) return Buffer.from(a3, `hex`);
    if (i3 === `B:`) {
      let e4 = a3.slice(-1) == `_`;
      if (e4 || a3.length % 2 != 0) {
        let t3 = e4 ? a3.length - 1 : a3.length, i4 = a3.substr(0, t3) + `0`;
        return !e4 && t3 & 1 ? new n2.BitString(Buffer.from(i4, `hex`), 0, t3 << 2) : (0, r2.paddedBufferToBits)(Buffer.from(i4, `hex`));
      }
      return new n2.BitString(Buffer.from(a3, `hex`), 0, a3.length << 2);
    }
    throw Error(`Invalid key type: ` + i3);
  }
  e2.deserializeInternalKey = a2;
})), ae = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.Dictionary = void 0;
  let t2 = z(), n2 = be(), r2 = ye(), i2 = W(), a2 = X(), o2 = ee(), s2 = te(), c2 = re(), l2 = ie();
  var u2 = class e3 {
    static empty(t3, n3) {
      return t3 && n3 ? new e3(/* @__PURE__ */ new Map(), t3, n3) : new e3(/* @__PURE__ */ new Map(), null, null);
    }
    static load(t3, n3, i3) {
      let a3;
      if (i3 instanceof r2.Cell) {
        if (i3.isExotic) return e3.empty(t3, n3);
        a3 = i3.beginParse();
      } else a3 = i3;
      let o3 = a3.loadMaybeRef();
      return o3 && !o3.isExotic ? e3.loadDirect(t3, n3, o3.beginParse()) : e3.empty(t3, n3);
    }
    static loadDirect(t3, n3, i3) {
      if (!i3) return e3.empty(t3, n3);
      let a3;
      a3 = i3 instanceof r2.Cell ? i3.beginParse() : i3;
      let o3 = (0, s2.parseDict)(a3, t3.bits, n3.parse), c3 = /* @__PURE__ */ new Map();
      for (let [e4, n4] of o3) c3.set((0, l2.serializeInternalKey)(t3.parse(e4)), n4);
      return new e3(c3, t3, n3);
    }
    constructor(e4, t3, n3) {
      this._key = t3, this._value = n3, this._map = e4;
    }
    get size() {
      return this._map.size;
    }
    get(e4) {
      return this._map.get((0, l2.serializeInternalKey)(e4));
    }
    has(e4) {
      return this._map.has((0, l2.serializeInternalKey)(e4));
    }
    set(e4, t3) {
      return this._map.set((0, l2.serializeInternalKey)(e4), t3), this;
    }
    delete(e4) {
      let t3 = (0, l2.serializeInternalKey)(e4);
      return this._map.delete(t3);
    }
    clear() {
      this._map.clear();
    }
    *[Symbol.iterator]() {
      for (let [e4, t3] of this._map) yield [(0, l2.deserializeInternalKey)(e4), t3];
    }
    keys() {
      return Array.from(this._map.keys()).map((e4) => (0, l2.deserializeInternalKey)(e4));
    }
    values() {
      return Array.from(this._map.values());
    }
    store(e4, t3, r3) {
      if (this._map.size === 0) e4.storeBit(0);
      else {
        let i3 = this._key;
        t3 != null && (i3 = t3);
        let a3 = this._value;
        if (r3 != null && (a3 = r3), !i3) throw Error(`Key serializer is not defined`);
        if (!a3) throw Error(`Value serializer is not defined`);
        let o3 = /* @__PURE__ */ new Map();
        for (let [e5, t4] of this._map) o3.set(i3.serialize((0, l2.deserializeInternalKey)(e5)), t4);
        e4.storeBit(1);
        let s3 = (0, n2.beginCell)();
        (0, c2.serializeDict)(o3, i3.bits, a3.serialize, s3), e4.storeRef(s3.endCell());
      }
    }
    storeDirect(e4, t3, n3) {
      if (this._map.size === 0) throw Error(`Cannot store empty dictionary directly`);
      let r3 = this._key;
      t3 != null && (r3 = t3);
      let i3 = this._value;
      if (n3 != null && (i3 = n3), !r3) throw Error(`Key serializer is not defined`);
      if (!i3) throw Error(`Value serializer is not defined`);
      let a3 = /* @__PURE__ */ new Map();
      for (let [e5, t4] of this._map) a3.set(r3.serialize((0, l2.deserializeInternalKey)(e5)), t4);
      (0, c2.serializeDict)(a3, r3.bits, i3.serialize, e4);
    }
    generateMerkleProof(e4) {
      return (0, a2.generateMerkleProof)(this, e4, this._key);
    }
    generateMerkleProofDirect(e4) {
      return (0, a2.generateMerkleProofDirect)(this, e4, this._key);
    }
    generateMerkleUpdate(e4, t3) {
      return (0, o2.generateMerkleUpdate)(this, e4, this._key, t3);
    }
  };
  e2.Dictionary = u2, u2.Keys = { Address: () => d2(), BigInt: (e3) => f2(e3), Int: (e3) => p2(e3), BigUint: (e3) => m2(e3), Uint: (e3) => h2(e3), Buffer: (e3) => g2(e3), BitString: (e3) => _2(e3) }, u2.Values = { BigInt: (e3) => y2(e3), Int: (e3) => v2(e3), BigVarInt: (e3) => b2(e3), BigUint: (e3) => C2(e3), Uint: (e3) => S2(e3), BigVarUint: (e3) => x2(e3), Bool: () => w2(), Address: () => T2(), Cell: () => E2(), Buffer: (e3) => O2(e3), BitString: (e3) => k2(e3), Dictionary: (e3, t3) => D2(e3, t3) };
  function d2() {
    return { bits: 267, serialize: (e3) => {
      if (!t2.Address.isAddress(e3)) throw Error(`Key is not an address`);
      return (0, n2.beginCell)().storeAddress(e3).endCell().beginParse().preloadUintBig(267);
    }, parse: (e3) => (0, n2.beginCell)().storeUint(e3, 267).endCell().beginParse().loadAddress() };
  }
  function f2(e3) {
    return { bits: e3, serialize: (t3) => {
      if (typeof t3 != `bigint`) throw Error(`Key is not a bigint`);
      return (0, n2.beginCell)().storeInt(t3, e3).endCell().beginParse().loadUintBig(e3);
    }, parse: (t3) => (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadIntBig(e3) };
  }
  function p2(e3) {
    return { bits: e3, serialize: (t3) => {
      if (typeof t3 != `number`) throw Error(`Key is not a number`);
      if (!Number.isSafeInteger(t3)) throw Error(`Key is not a safe integer: ` + t3);
      return (0, n2.beginCell)().storeInt(t3, e3).endCell().beginParse().loadUintBig(e3);
    }, parse: (t3) => (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadInt(e3) };
  }
  function m2(e3) {
    return { bits: e3, serialize: (t3) => {
      if (typeof t3 != `bigint`) throw Error(`Key is not a bigint`);
      if (t3 < 0) throw Error(`Key is negative: ` + t3);
      return (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadUintBig(e3);
    }, parse: (t3) => (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadUintBig(e3) };
  }
  function h2(e3) {
    return { bits: e3, serialize: (t3) => {
      if (typeof t3 != `number`) throw Error(`Key is not a number`);
      if (!Number.isSafeInteger(t3)) throw Error(`Key is not a safe integer: ` + t3);
      if (t3 < 0) throw Error(`Key is negative: ` + t3);
      return (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadUintBig(e3);
    }, parse: (t3) => Number((0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadUint(e3)) };
  }
  function g2(e3) {
    return { bits: e3 * 8, serialize: (t3) => {
      if (!Buffer.isBuffer(t3)) throw Error(`Key is not a buffer`);
      return (0, n2.beginCell)().storeBuffer(t3).endCell().beginParse().loadUintBig(e3 * 8);
    }, parse: (t3) => (0, n2.beginCell)().storeUint(t3, e3 * 8).endCell().beginParse().loadBuffer(e3) };
  }
  function _2(e3) {
    return { bits: e3, serialize: (t3) => {
      if (!i2.BitString.isBitString(t3)) throw Error(`Key is not a BitString`);
      return (0, n2.beginCell)().storeBits(t3).endCell().beginParse().loadUintBig(e3);
    }, parse: (t3) => (0, n2.beginCell)().storeUint(t3, e3).endCell().beginParse().loadBits(e3) };
  }
  function v2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeInt(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadInt(e3);
      return t3.endParse(), n3;
    } };
  }
  function y2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeInt(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadIntBig(e3);
      return t3.endParse(), n3;
    } };
  }
  function b2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeVarInt(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadVarIntBig(e3);
      return t3.endParse(), n3;
    } };
  }
  function x2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeVarUint(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadVarUintBig(e3);
      return t3.endParse(), n3;
    } };
  }
  function S2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeUint(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadUint(e3);
      return t3.endParse(), n3;
    } };
  }
  function C2(e3) {
    return { serialize: (t3, n3) => {
      n3.storeUint(t3, e3);
    }, parse: (t3) => {
      let n3 = t3.loadUintBig(e3);
      return t3.endParse(), n3;
    } };
  }
  function w2() {
    return { serialize: (e3, t3) => {
      t3.storeBit(e3);
    }, parse: (e3) => {
      let t3 = e3.loadBit();
      return e3.endParse(), t3;
    } };
  }
  function T2() {
    return { serialize: (e3, t3) => {
      t3.storeAddress(e3);
    }, parse: (e3) => {
      let t3 = e3.loadAddress();
      return e3.endParse(), t3;
    } };
  }
  function E2() {
    return { serialize: (e3, t3) => {
      t3.storeRef(e3);
    }, parse: (e3) => {
      let t3 = e3.loadRef();
      return e3.endParse(), t3;
    } };
  }
  function D2(e3, t3) {
    return { serialize: (e4, t4) => {
      e4.store(t4);
    }, parse: (n3) => {
      let r3 = u2.load(e3, t3, n3);
      return n3.endParse(), r3;
    } };
  }
  function O2(e3) {
    return { serialize: (t3, n3) => {
      if (t3.length !== e3) throw Error(`Invalid buffer size`);
      n3.storeBuffer(t3);
    }, parse: (t3) => {
      let n3 = t3.loadBuffer(e3);
      return t3.endParse(), n3;
    } };
  }
  function k2(e3) {
    return { serialize: (t3, n3) => {
      if (t3.length !== e3) throw Error(`Invalid BitString size`);
      n3.storeBits(t3);
    }, parse: (t3) => {
      let n3 = t3.loadBits(e3);
      return t3.endParse(), n3;
    } };
  }
})), oe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.writeString = e2.stringToCell = e2.readString = void 0;
  let t2 = be();
  function n2(e3) {
    if (e3.remainingBits % 8 != 0) throw Error(`Invalid string length: ${e3.remainingBits}`);
    if (e3.remainingRefs !== 0 && e3.remainingRefs !== 1) throw Error(`invalid number of refs: ${e3.remainingRefs}`);
    let t3;
    return t3 = e3.remainingBits === 0 ? Buffer.alloc(0) : e3.loadBuffer(e3.remainingBits / 8), e3.remainingRefs === 1 && (t3 = Buffer.concat([t3, n2(e3.loadRef().beginParse())])), t3;
  }
  function r2(e3) {
    return n2(e3).toString();
  }
  e2.readString = r2;
  function i2(e3, n3) {
    if (e3.length > 0) {
      let r3 = Math.floor(n3.availableBits / 8);
      if (e3.length > r3) {
        let a3 = e3.subarray(0, r3), o3 = e3.subarray(r3);
        n3 = n3.storeBuffer(a3);
        let s2 = (0, t2.beginCell)();
        i2(o3, s2), n3 = n3.storeRef(s2.endCell());
      } else n3 = n3.storeBuffer(e3);
    }
  }
  function a2(e3) {
    let n3 = (0, t2.beginCell)();
    return i2(Buffer.from(e3), n3), n3.endCell();
  }
  e2.stringToCell = a2;
  function o2(e3, t3) {
    i2(Buffer.from(e3), t3);
  }
  e2.writeString = o2;
})), se = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.Slice = void 0;
  let n2 = L(), r2 = ae(), i2 = be(), a2 = oe();
  e2.Slice = class e3 {
    constructor(e4, n3) {
      this[t2] = () => this.toString(), this._reader = e4.clone(), this._refs = [...n3], this._refsOffset = 0;
    }
    get remainingBits() {
      return this._reader.remaining;
    }
    get offsetBits() {
      return this._reader.offset;
    }
    get remainingRefs() {
      return this._refs.length - this._refsOffset;
    }
    get offsetRefs() {
      return this._refsOffset;
    }
    skip(e4) {
      return this._reader.skip(e4), this;
    }
    loadBit() {
      return this._reader.loadBit();
    }
    preloadBit() {
      return this._reader.preloadBit();
    }
    loadBoolean() {
      return this.loadBit();
    }
    loadMaybeBoolean() {
      return this.loadBit() ? this.loadBoolean() : null;
    }
    loadBits(e4) {
      return this._reader.loadBits(e4);
    }
    preloadBits(e4) {
      return this._reader.preloadBits(e4);
    }
    loadUint(e4) {
      return this._reader.loadUint(e4);
    }
    loadUintBig(e4) {
      return this._reader.loadUintBig(e4);
    }
    preloadUint(e4) {
      return this._reader.preloadUint(e4);
    }
    preloadUintBig(e4) {
      return this._reader.preloadUintBig(e4);
    }
    loadMaybeUint(e4) {
      return this.loadBit() ? this.loadUint(e4) : null;
    }
    loadMaybeUintBig(e4) {
      return this.loadBit() ? this.loadUintBig(e4) : null;
    }
    loadInt(e4) {
      return this._reader.loadInt(e4);
    }
    loadIntBig(e4) {
      return this._reader.loadIntBig(e4);
    }
    preloadInt(e4) {
      return this._reader.preloadInt(e4);
    }
    preloadIntBig(e4) {
      return this._reader.preloadIntBig(e4);
    }
    loadMaybeInt(e4) {
      return this.loadBit() ? this.loadInt(e4) : null;
    }
    loadMaybeIntBig(e4) {
      return this.loadBit() ? this.loadIntBig(e4) : null;
    }
    loadVarUint(e4) {
      return this._reader.loadVarUint(e4);
    }
    loadVarUintBig(e4) {
      return this._reader.loadVarUintBig(e4);
    }
    preloadVarUint(e4) {
      return this._reader.preloadVarUint(e4);
    }
    preloadVarUintBig(e4) {
      return this._reader.preloadVarUintBig(e4);
    }
    loadVarInt(e4) {
      return this._reader.loadVarInt(e4);
    }
    loadVarIntBig(e4) {
      return this._reader.loadVarIntBig(e4);
    }
    preloadVarInt(e4) {
      return this._reader.preloadVarInt(e4);
    }
    preloadVarIntBig(e4) {
      return this._reader.preloadVarIntBig(e4);
    }
    loadCoins() {
      return this._reader.loadCoins();
    }
    preloadCoins() {
      return this._reader.preloadCoins();
    }
    loadMaybeCoins() {
      return this._reader.loadBit() ? this._reader.loadCoins() : null;
    }
    loadAddress() {
      return this._reader.loadAddress();
    }
    loadMaybeAddress() {
      return this._reader.loadMaybeAddress();
    }
    loadExternalAddress() {
      return this._reader.loadExternalAddress();
    }
    loadMaybeExternalAddress() {
      return this._reader.loadMaybeExternalAddress();
    }
    loadAddressAny() {
      return this._reader.loadAddressAny();
    }
    loadRef() {
      if (this._refsOffset >= this._refs.length) throw Error(`No more references`);
      return this._refs[this._refsOffset++];
    }
    preloadRef() {
      if (this._refsOffset >= this._refs.length) throw Error(`No more references`);
      return this._refs[this._refsOffset];
    }
    loadMaybeRef() {
      return this.loadBit() ? this.loadRef() : null;
    }
    preloadMaybeRef() {
      return this.preloadBit() ? this.preloadRef() : null;
    }
    loadBuffer(e4) {
      return this._reader.loadBuffer(e4);
    }
    preloadBuffer(e4) {
      return this._reader.preloadBuffer(e4);
    }
    loadStringTail() {
      return (0, a2.readString)(this);
    }
    loadMaybeStringTail() {
      return this.loadBit() ? (0, a2.readString)(this) : null;
    }
    loadStringRefTail() {
      return (0, a2.readString)(this.loadRef().beginParse());
    }
    loadMaybeStringRefTail() {
      let e4 = this.loadMaybeRef();
      return e4 ? (0, a2.readString)(e4.beginParse()) : null;
    }
    loadDict(e4, t3) {
      return r2.Dictionary.load(e4, t3, this);
    }
    loadDictDirect(e4, t3) {
      return r2.Dictionary.loadDirect(e4, t3, this);
    }
    endParse() {
      if (this.remainingBits > 0 || this.remainingRefs > 0) throw Error(`Slice is not empty`);
    }
    asCell() {
      return (0, i2.beginCell)().storeSlice(this).endCell();
    }
    asBuilder() {
      return (0, i2.beginCell)().storeSlice(this);
    }
    clone(t3 = false) {
      if (t3) {
        let t4 = this._reader.clone();
        return t4.reset(), new e3(t4, this._refs);
      }
      {
        let t4 = new e3(this._reader, this._refs);
        return t4._refsOffset = this._refsOffset, t4;
      }
    }
    toString() {
      return this.asCell().toString();
    }
  }, t2 = n2.inspectSymbol;
})), ce = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.exoticLibrary = void 0;
  let t2 = J();
  function n2(e3, n3) {
    let r2 = new t2.BitReader(e3);
    if (e3.length !== 264) throw Error(`Library cell must have exactly (8 + 256) bits, got "${e3.length}"`);
    let i2 = r2.loadUint(8);
    if (i2 !== 2) throw Error(`Library cell must have type 2, got "${i2}"`);
    return {};
  }
  e2.exoticLibrary = n2;
})), le = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.exoticMerkleUpdate = void 0;
  let t2 = J();
  function n2(e3, n3) {
    let r2 = new t2.BitReader(e3);
    if (e3.length !== 552) throw Error(`Merkle Update cell must have exactly (8 + (2 * (256 + 16))) bits, got "${e3.length}"`);
    if (n3.length !== 2) throw Error(`Merkle Update cell must have exactly 2 refs, got "${n3.length}"`);
    let i2 = r2.loadUint(8);
    if (i2 !== 4) throw Error(`Merkle Update cell type must be exactly 4, got "${i2}"`);
    let a2 = r2.loadBuffer(32), o2 = r2.loadBuffer(32), s2 = r2.loadUint(16), c2 = r2.loadUint(16);
    if (s2 !== n3[0].depth(0)) throw Error(`Merkle Update cell ref depth must be exactly "${s2}", got "${n3[0].depth(0)}"`);
    if (!a2.equals(n3[0].hash(0))) throw Error(`Merkle Update cell ref hash must be exactly "${a2.toString(`hex`)}", got "${n3[0].hash(0).toString(`hex`)}"`);
    if (c2 !== n3[1].depth(0)) throw Error(`Merkle Update cell ref depth must be exactly "${c2}", got "${n3[1].depth(0)}"`);
    if (!o2.equals(n3[1].hash(0))) throw Error(`Merkle Update cell ref hash must be exactly "${o2.toString(`hex`)}", got "${n3[1].hash(0).toString(`hex`)}"`);
    return { proofDepth1: s2, proofDepth2: c2, proofHash1: a2, proofHash2: o2 };
  }
  e2.exoticMerkleUpdate = n2;
})), ue = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.LevelMask = void 0, e2.LevelMask = class e3 {
    constructor(e4 = 0) {
      this._mask = 0, this._mask = e4, this._hashIndex = t2(this._mask), this._hashCount = this._hashIndex + 1;
    }
    get value() {
      return this._mask;
    }
    get level() {
      return 32 - Math.clz32(this._mask);
    }
    get hashIndex() {
      return this._hashIndex;
    }
    get hashCount() {
      return this._hashCount;
    }
    apply(t3) {
      return new e3(this._mask & (1 << t3) - 1);
    }
    isSignificant(e4) {
      return e4 === 0 || (this._mask >> e4 - 1) % 2 != 0;
    }
  };
  function t2(e3) {
    return e3 -= e3 >> 1 & 1431655765, e3 = (e3 & 858993459) + (e3 >> 2 & 858993459), (e3 + (e3 >> 4) & 252645135) * 16843009 >> 24;
  }
})), de = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.exoticPruned = void 0;
  let t2 = J(), n2 = ue();
  function r2(e3, r3) {
    let i2 = new t2.BitReader(e3), a2 = i2.loadUint(8);
    if (a2 !== 1) throw Error(`Pruned branch cell must have type 1, got "${a2}"`);
    if (r3.length !== 0) throw Error(`Pruned Branch cell can't has refs, got "${r3.length}"`);
    let o2;
    if (e3.length === 280) o2 = new n2.LevelMask(1);
    else {
      if (o2 = new n2.LevelMask(i2.loadUint(8)), o2.level < 1 || o2.level > 3) throw Error(`Pruned Branch cell level must be >= 1 and <= 3, got "${o2.level}/${o2.value}"`);
      let t3 = 16 + o2.apply(o2.level - 1).hashCount * 272;
      if (e3.length !== t3) throw Error(`Pruned branch cell must have exactly ${t3} bits, got "${e3.length}"`);
    }
    let s2 = [], c2 = [], l2 = [];
    for (let e4 = 0; e4 < o2.level; e4++) c2.push(i2.loadBuffer(32));
    for (let e4 = 0; e4 < o2.level; e4++) l2.push(i2.loadUint(16));
    for (let e4 = 0; e4 < o2.level; e4++) s2.push({ depth: l2[e4], hash: c2[e4] });
    return { mask: o2.value, pruned: s2 };
  }
  e2.exoticPruned = r2;
})), fe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.resolveExotic = void 0;
  let t2 = J(), n2 = K(), r2 = ce(), i2 = Y(), a2 = le(), o2 = de(), s2 = ue();
  function c2(e3, t3) {
    let r3 = (0, o2.exoticPruned)(e3, t3), i3 = [], a3 = [], c3 = new s2.LevelMask(r3.mask);
    for (let e4 = 0; e4 < r3.pruned.length; e4++) i3.push(r3.pruned[e4].depth), a3.push(r3.pruned[e4].hash);
    return { type: n2.CellType.PrunedBranch, depths: i3, hashes: a3, mask: c3 };
  }
  function l2(e3, t3) {
    (0, r2.exoticLibrary)(e3, t3);
    let i3 = [], a3 = [], o3 = new s2.LevelMask();
    return { type: n2.CellType.Library, depths: i3, hashes: a3, mask: o3 };
  }
  function u2(e3, t3) {
    (0, i2.exoticMerkleProof)(e3, t3);
    let r3 = [], a3 = [], o3 = new s2.LevelMask(t3[0].level() >> 1);
    return { type: n2.CellType.MerkleProof, depths: r3, hashes: a3, mask: o3 };
  }
  function d2(e3, t3) {
    (0, a2.exoticMerkleUpdate)(e3, t3);
    let r3 = [], i3 = [], o3 = new s2.LevelMask((t3[0].level() | t3[1].level()) >> 1);
    return { type: n2.CellType.MerkleUpdate, depths: r3, hashes: i3, mask: o3 };
  }
  function f2(e3, n3) {
    let r3 = new t2.BitReader(e3).preloadUint(8);
    if (r3 === 1) return c2(e3, n3);
    if (r3 === 2) return l2(e3, n3);
    if (r3 === 3) return u2(e3, n3);
    if (r3 === 4) return d2(e3, n3);
    throw Error(`Invalid exotic cell type: ` + r3);
  }
  e2.resolveExotic = f2;
})), pe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getRepr = e2.getBitsDescriptor = e2.getRefsDescriptor = void 0;
  let t2 = K(), n2 = U();
  function r2(e3, n3, r3) {
    return e3.length + (r3 === t2.CellType.Ordinary ? 0 : 1) * 8 + n3 * 32;
  }
  e2.getRefsDescriptor = r2;
  function i2(e3) {
    let t3 = e3.length;
    return Math.ceil(t3 / 8) + Math.floor(t3 / 8);
  }
  e2.getBitsDescriptor = i2;
  function a2(e3, a3, o2, s2, c2, l2) {
    let u2 = Math.ceil(a3.length / 8), d2 = Buffer.alloc(2 + u2 + 34 * o2.length), f2 = 0;
    d2[f2++] = r2(o2, c2, l2), d2[f2++] = i2(e3), (0, n2.bitsToPaddedBuffer)(a3).copy(d2, f2), f2 += u2;
    for (let e4 of o2) {
      let n3;
      n3 = l2 == t2.CellType.MerkleProof || l2 == t2.CellType.MerkleUpdate ? e4.depth(s2 + 1) : e4.depth(s2), d2[f2++] = Math.floor(n3 / 256), d2[f2++] = n3 % 256;
    }
    for (let e4 of o2) {
      let n3;
      n3 = l2 == t2.CellType.MerkleProof || l2 == t2.CellType.MerkleUpdate ? e4.hash(s2 + 1) : e4.hash(s2), n3.copy(d2, f2), f2 += 32;
    }
    return d2;
  }
  e2.getRepr = a2;
})), me = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.wonderCalculator = void 0;
  let t2 = W(), n2 = K(), r2 = ue(), i2 = de(), a2 = Y(), o2 = pe(), s2 = I(), c2 = le(), l2 = ce();
  function u2(e3, u3, d2) {
    let f2, p2 = null;
    if (e3 === n2.CellType.Ordinary) {
      let e4 = 0;
      for (let t3 of d2) e4 |= t3.mask.value;
      f2 = new r2.LevelMask(e4);
    } else if (e3 === n2.CellType.PrunedBranch) p2 = (0, i2.exoticPruned)(u3, d2), f2 = new r2.LevelMask(p2.mask);
    else if (e3 === n2.CellType.MerkleProof) (0, a2.exoticMerkleProof)(u3, d2), f2 = new r2.LevelMask(d2[0].mask.value >> 1);
    else if (e3 === n2.CellType.MerkleUpdate) (0, c2.exoticMerkleUpdate)(u3, d2), f2 = new r2.LevelMask((d2[0].mask.value | d2[1].mask.value) >> 1);
    else if (e3 === n2.CellType.Library) (0, l2.exoticLibrary)(u3, d2), f2 = new r2.LevelMask();
    else throw Error(`Unsupported exotic type`);
    let m2 = [], h2 = [], g2 = e3 === n2.CellType.PrunedBranch ? 1 : f2.hashCount, _2 = f2.hashCount - g2;
    for (let r3 = 0, i3 = 0; r3 <= f2.level; r3++) {
      if (!f2.isSignificant(r3)) continue;
      if (i3 < _2) {
        i3++;
        continue;
      }
      let a3;
      if (i3 === _2) {
        if (r3 !== 0 && e3 !== n2.CellType.PrunedBranch) throw Error(`Invalid`);
        a3 = u3;
      } else {
        if (r3 === 0 || e3 === n2.CellType.PrunedBranch) throw Error(`Invalid: ` + r3 + `, ` + e3);
        a3 = new t2.BitString(h2[i3 - _2 - 1], 0, 256);
      }
      let c3 = 0;
      for (let t3 of d2) {
        let i4;
        i4 = e3 == n2.CellType.MerkleProof || e3 == n2.CellType.MerkleUpdate ? t3.depth(r3 + 1) : t3.depth(r3), c3 = Math.max(c3, i4);
      }
      d2.length > 0 && c3++;
      let l3 = (0, o2.getRepr)(u3, a3, d2, r3, f2.apply(r3).value, e3), p3 = (0, s2.sha256_sync)(l3), g3 = i3 - _2;
      m2[g3] = c3, h2[g3] = p3, i3++;
    }
    let v2 = [], y2 = [];
    if (p2) for (let e4 = 0; e4 < 4; e4++) {
      let { hashIndex: t3 } = f2.apply(e4), { hashIndex: n3 } = f2;
      t3 === n3 ? (v2.push(h2[0]), y2.push(m2[0])) : (v2.push(p2.pruned[t3].hash), y2.push(p2.pruned[t3].depth));
    }
    else for (let e4 = 0; e4 < 4; e4++) v2.push(h2[f2.apply(e4).hashIndex]), y2.push(m2[f2.apply(e4).hashIndex]);
    return { mask: f2, hashes: v2, depths: y2 };
  }
  e2.wonderCalculator = u2;
})), he = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.topologicalSort = void 0;
  function t2(e3) {
    let t3 = [e3], n2 = /* @__PURE__ */ new Map(), r2 = /* @__PURE__ */ new Set(), i2 = [];
    for (; t3.length > 0; ) {
      let e4 = [...t3];
      t3 = [];
      for (let i3 of e4) {
        let e5 = i3.hash().toString(`hex`);
        if (!n2.has(e5)) {
          r2.add(e5), n2.set(e5, { cell: i3, refs: i3.refs.map((e6) => e6.hash().toString(`hex`)) });
          for (let e6 of i3.refs) t3.push(e6);
        }
      }
    }
    let a2 = /* @__PURE__ */ new Set();
    function o2(e4) {
      if (!r2.has(e4)) return;
      if (a2.has(e4)) throw Error(`Not a DAG`);
      a2.add(e4);
      let t4 = n2.get(e4).refs;
      for (let e5 = t4.length - 1; e5 >= 0; e5--) o2(t4[e5]);
      i2.push(e4), a2.delete(e4), r2.delete(e4);
    }
    for (; r2.size > 0; ) {
      let e4 = Array.from(r2)[0];
      o2(e4);
    }
    let s2 = /* @__PURE__ */ new Map();
    for (let e4 = 0; e4 < i2.length; e4++) s2.set(i2[i2.length - e4 - 1], e4);
    let c2 = [];
    for (let e4 = i2.length - 1; e4 >= 0; e4--) {
      let t4 = i2[e4], r3 = n2.get(t4);
      c2.push({ cell: r3.cell, refs: r3.refs.map((e5) => s2.get(e5)) });
    }
    return c2;
  }
  e2.topologicalSort = t2;
})), ge = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.bitsForNumber = void 0;
  function t2(e3, t3) {
    let n2 = BigInt(e3);
    if (t3 === `int`) return n2 === 0n || n2 === -1n ? 1 : (n2 > 0 ? n2 : -n2).toString(2).length + 1;
    if (t3 === `uint`) {
      if (n2 < 0) throw Error(`value is negative. Got ${e3}`);
      return n2.toString(2).length;
    }
    throw Error(`invalid mode. Got ${t3}`);
  }
  e2.bitsForNumber = t2;
})), _e = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.crc32c = void 0;
  let t2 = 2197175160;
  function n2(e3) {
    let n3 = -1;
    for (let r3 = 0; r3 < e3.length; r3++) n3 ^= e3[r3], n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1, n3 = n3 & 1 ? n3 >>> 1 ^ t2 : n3 >>> 1;
    n3 ^= 4294967295;
    let r2 = Buffer.alloc(4);
    return r2.writeInt32LE(n3), r2;
  }
  e2.crc32c = n2;
})), ve = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.serializeBoc = e2.deserializeBoc = e2.parseBoc = void 0;
  let t2 = J(), n2 = W(), r2 = ye(), i2 = he(), a2 = ge(), o2 = G(), s2 = pe(), c2 = U(), l2 = _e();
  function u2(e3) {
    return d2(e3 & 7);
  }
  function d2(e3) {
    let t3 = 0;
    for (let n3 = 0; n3 < 3; n3++) t3 += e3 & 1, e3 >>= 1;
    return t3 + 1;
  }
  function f2(e3, t3) {
    let r3 = e3.loadUint(8), i3 = r3 % 8, a3 = !!(r3 & 8), o3 = e3.loadUint(8), s3 = Math.ceil(o3 / 2), c3 = !!(o3 % 2), l3 = r3 >> 5, d3 = !!(r3 & 16), f3 = d3 ? u2(l3) * 32 : 0, p3 = d3 ? u2(l3) * 2 : 0;
    e3.skip(f3 * 8), e3.skip(p3 * 8);
    let m3 = n2.BitString.EMPTY;
    s3 > 0 && (m3 = c3 ? e3.loadPaddedBits(s3 * 8) : e3.loadBits(s3 * 8));
    let h3 = [];
    for (let n3 = 0; n3 < i3; n3++) h3.push(e3.loadUint(t3 * 8));
    return { bits: m3, refs: h3, exotic: a3 };
  }
  function p2(e3, t3) {
    return 2 + Math.ceil(e3.bits.length / 8) + e3.refs.length * t3;
  }
  function m2(e3) {
    let r3 = new t2.BitReader(new n2.BitString(e3, 0, e3.length * 8)), i3 = r3.loadUint(32);
    if (i3 === 1761568243) {
      let e4 = r3.loadUint(8), t3 = r3.loadUint(8), n3 = r3.loadUint(e4 * 8), i4 = r3.loadUint(e4 * 8), a3 = r3.loadUint(e4 * 8), o3 = r3.loadUint(t3 * 8);
      return { size: e4, offBytes: t3, cells: n3, roots: i4, absent: a3, totalCellSize: o3, index: r3.loadBuffer(n3 * t3), cellData: r3.loadBuffer(o3), root: [0] };
    }
    if (i3 === 2898503464) {
      let t3 = r3.loadUint(8), n3 = r3.loadUint(8), i4 = r3.loadUint(t3 * 8), a3 = r3.loadUint(t3 * 8), o3 = r3.loadUint(t3 * 8), s3 = r3.loadUint(n3 * 8), c3 = r3.loadBuffer(i4 * n3), u3 = r3.loadBuffer(s3), d3 = r3.loadBuffer(4);
      if (!(0, l2.crc32c)(e3.subarray(0, e3.length - 4)).equals(d3)) throw Error(`Invalid CRC32C`);
      return { size: t3, offBytes: n3, cells: i4, roots: a3, absent: o3, totalCellSize: s3, index: c3, cellData: u3, root: [0] };
    }
    if (i3 === 3052313714) {
      let t3 = r3.loadUint(1), n3 = r3.loadUint(1);
      r3.loadUint(1), r3.loadUint(2);
      let i4 = r3.loadUint(3), a3 = r3.loadUint(8), o3 = r3.loadUint(i4 * 8), s3 = r3.loadUint(i4 * 8), c3 = r3.loadUint(i4 * 8), u3 = r3.loadUint(a3 * 8), d3 = [];
      for (let e4 = 0; e4 < s3; e4++) d3.push(r3.loadUint(i4 * 8));
      let f3 = null;
      t3 && (f3 = r3.loadBuffer(o3 * a3));
      let p3 = r3.loadBuffer(u3);
      if (n3) {
        let t4 = r3.loadBuffer(4);
        if (!(0, l2.crc32c)(e3.subarray(0, e3.length - 4)).equals(t4)) throw Error(`Invalid CRC32C`);
      }
      return { size: i4, offBytes: a3, cells: o3, roots: s3, absent: c3, totalCellSize: u3, index: f3, cellData: p3, root: d3 };
    }
    throw Error(`Invalid magic`);
  }
  e2.parseBoc = m2;
  function h2(e3) {
    let i3 = m2(e3), a3 = new t2.BitReader(new n2.BitString(i3.cellData, 0, i3.cellData.length * 8)), o3 = [];
    for (let e4 = 0; e4 < i3.cells; e4++) {
      let e5 = f2(a3, i3.size);
      o3.push({ ...e5, result: null });
    }
    for (let e4 = o3.length - 1; e4 >= 0; e4--) {
      if (o3[e4].result) throw Error(`Impossible`);
      let t3 = [];
      for (let n3 of o3[e4].refs) {
        if (!o3[n3].result) throw Error(`Invalid BOC file`);
        t3.push(o3[n3].result);
      }
      o3[e4].result = new r2.Cell({ bits: o3[e4].bits, refs: t3, exotic: o3[e4].exotic });
    }
    let s3 = [];
    for (let e4 = 0; e4 < i3.root.length; e4++) s3.push(o3[i3.root[e4]].result);
    return s3;
  }
  e2.deserializeBoc = h2;
  function g2(e3, t3, n3, r3) {
    let i3 = (0, s2.getRefsDescriptor)(e3.refs, e3.mask.value, e3.type), a3 = (0, s2.getBitsDescriptor)(e3.bits);
    r3.writeUint(i3, 8), r3.writeUint(a3, 8), r3.writeBuffer((0, c2.bitsToPaddedBuffer)(e3.bits));
    for (let e4 of t3) r3.writeUint(e4, n3 * 8);
  }
  function _2(e3, t3) {
    let n3 = (0, i2.topologicalSort)(e3), r3 = n3.length, s3 = t3.idx, c3 = t3.crc32, u3 = Math.max(Math.ceil((0, a2.bitsForNumber)(r3, `uint`) / 8), 1), d3 = 0, f3 = [];
    for (let e4 of n3) {
      let t4 = p2(e4.cell, u3);
      d3 += t4, f3.push(d3);
    }
    let m3 = Math.max(Math.ceil((0, a2.bitsForNumber)(d3, `uint`) / 8), 1), h3 = (6 + 3 * u3 + m3 + 1 * u3 + (s3 ? r3 * m3 : 0) + d3 + (c3 ? 4 : 0)) * 8, _3 = new o2.BitBuilder(h3);
    if (_3.writeUint(3052313714, 32), _3.writeBit(s3), _3.writeBit(c3), _3.writeBit(false), _3.writeUint(0, 2), _3.writeUint(u3, 3), _3.writeUint(m3, 8), _3.writeUint(r3, u3 * 8), _3.writeUint(1, u3 * 8), _3.writeUint(0, u3 * 8), _3.writeUint(d3, m3 * 8), _3.writeUint(0, u3 * 8), s3) for (let e4 = 0; e4 < r3; e4++) _3.writeUint(f3[e4], m3 * 8);
    for (let e4 = 0; e4 < r3; e4++) g2(n3[e4].cell, n3[e4].refs, u3, _3);
    if (c3) {
      let e4 = (0, l2.crc32c)(_3.buffer());
      _3.writeBuffer(e4);
    }
    let v2 = _3.buffer();
    if (v2.length !== h3 / 8) throw Error(`Internal error`);
    return v2;
  }
  e2.serializeBoc = _2;
})), ye = i(((e2) => {
  var t2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.Cell = void 0;
  let n2 = L(), r2 = W(), i2 = K(), a2 = se(), o2 = fe(), s2 = me(), c2 = ve(), l2 = J(), u2 = be();
  var d2 = class e3 {
    static fromBoc(e4) {
      return (0, c2.deserializeBoc)(e4);
    }
    static fromBase64(t3) {
      let n3 = e3.fromBoc(Buffer.from(t3, `base64`));
      if (n3.length !== 1) throw Error(`Deserialized more than one cell`);
      return n3[0];
    }
    static fromHex(t3) {
      let n3 = e3.fromBoc(Buffer.from(t3, `hex`));
      if (n3.length !== 1) throw Error(`Deserialized more than one cell`);
      return n3[0];
    }
    constructor(e4) {
      this._hashes = [], this._depths = [], this.beginParse = (e5 = false) => {
        if (this.isExotic && !e5) throw Error(`Exotic cells cannot be parsed`);
        return new a2.Slice(new l2.BitReader(this.bits), this.refs);
      }, this.hash = (e5 = 3) => this._hashes[Math.min(this._hashes.length - 1, e5)], this.depth = (e5 = 3) => this._depths[Math.min(this._depths.length - 1, e5)], this.level = () => this.mask.level, this.equals = (e5) => this.hash().equals(e5.hash()), this[t2] = () => this.toString();
      let n3 = r2.BitString.EMPTY;
      e4 && e4.bits && (n3 = e4.bits);
      let c3 = [];
      e4 && e4.refs && (c3 = [...e4.refs]);
      let u3, d3, f2, p2 = i2.CellType.Ordinary;
      if (e4 && e4.exotic) {
        let e5 = (0, o2.resolveExotic)(n3, c3), t3 = (0, s2.wonderCalculator)(e5.type, n3, c3);
        f2 = t3.mask, d3 = t3.depths, u3 = t3.hashes, p2 = e5.type;
      } else {
        if (c3.length > 4) throw Error(`Invalid number of references`);
        if (n3.length > 1023) throw Error(`Bits overflow: ${n3.length} > 1023`);
        let e5 = (0, s2.wonderCalculator)(i2.CellType.Ordinary, n3, c3);
        f2 = e5.mask, d3 = e5.depths, u3 = e5.hashes, p2 = i2.CellType.Ordinary;
      }
      this.type = p2, this.bits = n3, this.refs = c3, this.mask = f2, this._depths = d3, this._hashes = u3, Object.freeze(this), Object.freeze(this.refs), Object.freeze(this.bits), Object.freeze(this.mask), Object.freeze(this._depths), Object.freeze(this._hashes);
    }
    get isExotic() {
      return this.type !== i2.CellType.Ordinary;
    }
    toBoc(e4) {
      let t3 = e4 && e4.idx !== null && e4.idx !== void 0 ? e4.idx : false, n3 = e4 && e4.crc32 !== null && e4.crc32 !== void 0 ? e4.crc32 : true;
      return (0, c2.serializeBoc)(this, { idx: t3, crc32: n3 });
    }
    toString(e4) {
      let t3 = e4 || ``, n3 = `x`;
      this.isExotic && (this.type === i2.CellType.MerkleProof ? n3 = `p` : this.type === i2.CellType.MerkleUpdate ? n3 = `u` : this.type === i2.CellType.PrunedBranch && (n3 = `p`));
      let r3 = t3 + (this.isExotic ? n3 : `x`) + `{` + this.bits.toString() + `}`;
      for (let e5 in this.refs) {
        let n4 = this.refs[e5];
        r3 += `
` + n4.toString(t3 + ` `);
      }
      return r3;
    }
    asSlice() {
      return this.beginParse();
    }
    asBuilder() {
      return (0, u2.beginCell)().storeSlice(this.asSlice());
    }
  };
  e2.Cell = d2, t2 = n2.inspectSymbol, d2.EMPTY = new d2();
})), be = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.Builder = e2.beginCell = void 0;
  let t2 = G(), n2 = ye(), r2 = oe();
  function i2() {
    return new a2();
  }
  e2.beginCell = i2;
  var a2 = class e3 {
    constructor() {
      this._bits = new t2.BitBuilder(), this._refs = [];
    }
    get bits() {
      return this._bits.length;
    }
    get refs() {
      return this._refs.length;
    }
    get availableBits() {
      return 1023 - this.bits;
    }
    get availableRefs() {
      return 4 - this.refs;
    }
    storeBit(e4) {
      return this._bits.writeBit(e4), this;
    }
    storeBits(e4) {
      return this._bits.writeBits(e4), this;
    }
    storeBuffer(e4, t3) {
      if (t3 != null && e4.length !== t3) throw Error(`Buffer length ${e4.length} is not equal to ${t3}`);
      return this._bits.writeBuffer(e4), this;
    }
    storeMaybeBuffer(e4, t3) {
      return e4 === null ? this.storeBit(0) : (this.storeBit(1), this.storeBuffer(e4, t3)), this;
    }
    storeUint(e4, t3) {
      return this._bits.writeUint(e4, t3), this;
    }
    storeMaybeUint(e4, t3) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeUint(e4, t3)), this;
    }
    storeInt(e4, t3) {
      return this._bits.writeInt(e4, t3), this;
    }
    storeMaybeInt(e4, t3) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeInt(e4, t3)), this;
    }
    storeVarUint(e4, t3) {
      return this._bits.writeVarUint(e4, t3), this;
    }
    storeMaybeVarUint(e4, t3) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeVarUint(e4, t3)), this;
    }
    storeVarInt(e4, t3) {
      return this._bits.writeVarInt(e4, t3), this;
    }
    storeMaybeVarInt(e4, t3) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeVarInt(e4, t3)), this;
    }
    storeCoins(e4) {
      return this._bits.writeCoins(e4), this;
    }
    storeMaybeCoins(e4) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeCoins(e4)), this;
    }
    storeAddress(e4) {
      return this._bits.writeAddress(e4), this;
    }
    storeRef(t3) {
      if (this._refs.length >= 4) throw Error(`Too many references`);
      if (t3 instanceof n2.Cell) this._refs.push(t3);
      else if (t3 instanceof e3) this._refs.push(t3.endCell());
      else throw Error(`Invalid argument`);
      return this;
    }
    storeMaybeRef(e4) {
      return e4 ? (this.storeBit(1), this.storeRef(e4)) : this.storeBit(0), this;
    }
    storeSlice(e4) {
      let t3 = e4.clone();
      for (t3.remainingBits > 0 && this.storeBits(t3.loadBits(t3.remainingBits)); t3.remainingRefs > 0; ) this.storeRef(t3.loadRef());
      return this;
    }
    storeMaybeSlice(e4) {
      return e4 ? (this.storeBit(1), this.storeSlice(e4)) : this.storeBit(0), this;
    }
    storeBuilder(e4) {
      return this.storeSlice(e4.endCell().beginParse());
    }
    storeMaybeBuilder(e4) {
      return e4 ? (this.storeBit(1), this.storeBuilder(e4)) : this.storeBit(0), this;
    }
    storeWritable(e4) {
      return typeof e4 == `object` ? e4.writeTo(this) : e4(this), this;
    }
    storeMaybeWritable(e4) {
      return e4 ? (this.storeBit(1), this.storeWritable(e4)) : this.storeBit(0), this;
    }
    store(e4) {
      return this.storeWritable(e4), this;
    }
    storeStringTail(e4) {
      return (0, r2.writeString)(e4, this), this;
    }
    storeMaybeStringTail(e4) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), (0, r2.writeString)(e4, this)), this;
    }
    storeStringRefTail(e4) {
      return this.storeRef(i2().storeStringTail(e4)), this;
    }
    storeMaybeStringRefTail(e4) {
      return e4 == null ? this.storeBit(0) : (this.storeBit(1), this.storeStringRefTail(e4)), this;
    }
    storeDict(e4, t3, n3) {
      return e4 ? e4.store(this, t3, n3) : this.storeBit(0), this;
    }
    storeDictDirect(e4, t3, n3) {
      return e4.storeDirect(this, t3, n3), this;
    }
    endCell(e4) {
      return new n2.Cell({ bits: this._bits.build(), refs: this._refs, exotic: e4?.exotic });
    }
    asCell() {
      return this.endCell();
    }
    asSlice() {
      return this.endCell().beginParse();
    }
  };
  e2.Builder = a2;
})), xe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.SimpleLibraryValue = e2.storeSimpleLibrary = e2.loadSimpleLibrary = void 0;
  function t2(e3) {
    return { public: e3.loadBit(), root: e3.loadRef() };
  }
  e2.loadSimpleLibrary = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeBit(e3.public), t3.storeRef(e3.root);
    };
  }
  e2.storeSimpleLibrary = n2, e2.SimpleLibraryValue = { serialize(e3, t3) {
    n2(e3)(t3);
  }, parse(e3) {
    return t2(e3);
  } };
})), Se = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTickTock = e2.loadTickTock = void 0;
  function t2(e3) {
    return { tick: e3.loadBit(), tock: e3.loadBit() };
  }
  e2.loadTickTock = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeBit(e3.tick), t3.storeBit(e3.tock);
    };
  }
  e2.storeTickTock = n2;
})), Ce = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeStateInit = e2.loadStateInit = void 0;
  let t2 = ae(), n2 = xe(), r2 = Se();
  function i2(e3) {
    let i3;
    e3.loadBit() && (i3 = e3.loadUint(5));
    let a3;
    e3.loadBit() && (a3 = (0, r2.loadTickTock)(e3));
    let o2 = e3.loadMaybeRef(), s2 = e3.loadMaybeRef(), c2 = e3.loadDict(t2.Dictionary.Keys.BigUint(256), n2.SimpleLibraryValue);
    return c2.size === 0 && (c2 = void 0), { splitDepth: i3, special: a3, code: o2, data: s2, libraries: c2 };
  }
  e2.loadStateInit = i2;
  function a2(e3) {
    return (t3) => {
      e3.splitDepth !== null && e3.splitDepth !== void 0 ? (t3.storeBit(true), t3.storeUint(e3.splitDepth, 5)) : t3.storeBit(false), e3.special !== null && e3.special !== void 0 ? (t3.storeBit(true), t3.store((0, r2.storeTickTock)(e3.special))) : t3.storeBit(false), t3.storeMaybeRef(e3.code), t3.storeMaybeRef(e3.data), t3.storeDict(e3.libraries);
    };
  }
  e2.storeStateInit = a2;
})), we = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.contractAddress = void 0;
  let t2 = be(), n2 = Ce(), r2 = z();
  function i2(e3, i3) {
    let a2 = (0, t2.beginCell)().store((0, n2.storeStateInit)(i3)).endCell().hash();
    return new r2.Address(e3, a2);
  }
  e2.contractAddress = i2;
})), Z = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.parseTuple = e2.serializeTuple = e2.parseTupleItem = e2.serializeTupleItem = void 0;
  let t2 = be(), n2 = BigInt(`-9223372036854775808`), r2 = BigInt(`9223372036854775807`);
  function i2(e3, a3) {
    if (e3.type === `null`) a3.storeUint(0, 8);
    else if (e3.type === `int`) e3.value <= r2 && e3.value >= n2 ? (a3.storeUint(1, 8), a3.storeInt(e3.value, 64)) : (a3.storeUint(256, 15), a3.storeInt(e3.value, 257));
    else if (e3.type === `nan`) a3.storeInt(767, 16);
    else if (e3.type === `cell`) a3.storeUint(3, 8), a3.storeRef(e3.cell);
    else if (e3.type === `slice`) a3.storeUint(4, 8), a3.storeUint(0, 10), a3.storeUint(e3.cell.bits.length, 10), a3.storeUint(0, 3), a3.storeUint(e3.cell.refs.length, 3), a3.storeRef(e3.cell);
    else if (e3.type === `builder`) a3.storeUint(5, 8), a3.storeRef(e3.cell);
    else if (e3.type === `tuple`) {
      let n3 = null, r3 = null;
      for (let a4 = 0; a4 < e3.items.length; a4++) {
        let o3 = n3;
        n3 = r3, r3 = o3, a4 > 1 && (n3 = (0, t2.beginCell)().storeRef(r3).storeRef(n3).endCell());
        let s3 = (0, t2.beginCell)();
        i2(e3.items[a4], s3), r3 = s3.endCell();
      }
      a3.storeUint(7, 8), a3.storeUint(e3.items.length, 16), n3 && a3.storeRef(n3), r3 && a3.storeRef(r3);
    } else throw Error(`Invalid value`);
  }
  e2.serializeTupleItem = i2;
  function a2(e3) {
    let n3 = e3.loadUint(8);
    if (n3 === 0) return { type: `null` };
    if (n3 === 1) return { type: `int`, value: e3.loadIntBig(64) };
    if (n3 === 2) return e3.loadUint(7) === 0 ? { type: `int`, value: e3.loadIntBig(257) } : (e3.loadBit(), { type: `nan` });
    if (n3 === 3) return { type: `cell`, cell: e3.loadRef() };
    if (n3 === 4) {
      let n4 = e3.loadUint(10), r3 = e3.loadUint(10), i3 = e3.loadUint(3), a3 = e3.loadUint(3), o3 = e3.loadRef().beginParse();
      o3.skip(n4);
      let s3 = o3.loadBits(r3 - n4), c3 = (0, t2.beginCell)().storeBits(s3);
      if (i3 < a3) {
        for (let e4 = 0; e4 < i3; e4++) o3.loadRef();
        for (let e4 = 0; e4 < a3 - i3; e4++) c3.storeRef(o3.loadRef());
      }
      return { type: `slice`, cell: c3.endCell() };
    }
    if (n3 === 5) return { type: `builder`, cell: e3.loadRef() };
    if (n3 === 7) {
      let t3 = e3.loadUint(16), n4 = [];
      if (t3 > 1) {
        let r3 = e3.loadRef().beginParse(), i3 = e3.loadRef().beginParse();
        n4.unshift(a2(i3));
        for (let e4 = 0; e4 < t3 - 2; e4++) {
          let e5 = r3;
          r3 = e5.loadRef().beginParse(), i3 = e5.loadRef().beginParse(), n4.unshift(a2(i3));
        }
        n4.unshift(a2(r3));
      } else t3 === 1 && n4.push(a2(e3.loadRef().beginParse()));
      return { type: `tuple`, items: n4 };
    }
    throw Error(`Unsupported stack item`);
  }
  e2.parseTupleItem = a2;
  function o2(e3, n3) {
    if (e3.length > 0) {
      let r3 = (0, t2.beginCell)();
      o2(e3.slice(0, e3.length - 1), r3), n3.storeRef(r3.endCell()), i2(e3[e3.length - 1], n3);
    }
  }
  function s2(e3) {
    let n3 = (0, t2.beginCell)();
    return n3.storeUint(e3.length, 24), o2([...e3], n3), n3.endCell();
  }
  e2.serializeTuple = s2;
  function c2(e3) {
    let t3 = [], n3 = e3.beginParse(), r3 = n3.loadUint(24);
    for (let e4 = 0; e4 < r3; e4++) {
      let e5 = n3.loadRef();
      t3.unshift(a2(n3)), n3 = e5.beginParse();
    }
    return t3;
  }
  e2.parseTuple = c2;
})), Q = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.TupleReader = void 0, e2.TupleReader = class e3 {
    constructor(e4) {
      this.items = [...e4];
    }
    get remaining() {
      return this.items.length;
    }
    peek() {
      if (this.items.length === 0) throw Error(`EOF`);
      return this.items[0];
    }
    pop() {
      if (this.items.length === 0) throw Error(`EOF`);
      let e4 = this.items[0];
      return this.items.splice(0, 1), e4;
    }
    skip(e4 = 1) {
      for (let t2 = 0; t2 < e4; t2++) this.pop();
      return this;
    }
    readBigNumber() {
      let e4 = this.pop();
      if (e4.type !== `int`) throw Error(`Not a number`);
      return e4.value;
    }
    readBigNumberOpt() {
      let e4 = this.pop();
      if (e4.type === `null`) return null;
      if (e4.type !== `int`) throw Error(`Not a number`);
      return e4.value;
    }
    readNumber() {
      return Number(this.readBigNumber());
    }
    readNumberOpt() {
      let e4 = this.readBigNumberOpt();
      return e4 === null ? null : Number(e4);
    }
    readBoolean() {
      return this.readNumber() !== 0;
    }
    readBooleanOpt() {
      let e4 = this.readNumberOpt();
      return e4 === null ? null : e4 !== 0;
    }
    readAddress() {
      let e4 = this.readCell().beginParse().loadAddress();
      if (e4 !== null) return e4;
      throw Error(`Not an address`);
    }
    readAddressOpt() {
      let e4 = this.readCellOpt();
      return e4 === null ? null : e4.beginParse().loadMaybeAddress();
    }
    readCell() {
      let e4 = this.pop();
      if (e4.type !== `cell` && e4.type !== `slice` && e4.type !== `builder`) throw Error(`Not a cell: ` + e4.type);
      return e4.cell;
    }
    readCellOpt() {
      let e4 = this.pop();
      if (e4.type === `null`) return null;
      if (e4.type !== `cell` && e4.type !== `slice` && e4.type !== `builder`) throw Error(`Not a cell`);
      return e4.cell;
    }
    readTuple() {
      let t2 = this.pop();
      if (t2.type !== `tuple`) throw Error(`Not a tuple`);
      return new e3(t2.items);
    }
    readTupleOpt() {
      let t2 = this.pop();
      if (t2.type === `null`) return null;
      if (t2.type !== `tuple`) throw Error(`Not a tuple`);
      return new e3(t2.items);
    }
    static readLispList(e4) {
      let t2 = [], n2 = e4;
      for (; n2 !== null; ) {
        var r2 = n2.pop();
        if (n2.items.length === 0 || n2.items[0].type !== `tuple` && n2.items[0].type !== `null`) throw Error(`Lisp list consists only from (any, tuple) elements and ends with null`);
        n2 = n2.readTupleOpt(), t2.push(r2);
      }
      return t2;
    }
    readLispListDirect() {
      return this.items.length === 1 && this.items[0].type === `null` ? [] : e3.readLispList(this);
    }
    readLispList() {
      return e3.readLispList(this.readTupleOpt());
    }
    readBuffer() {
      let e4 = this.readCell().beginParse();
      if (e4.remainingRefs !== 0 || e4.remainingBits % 8 != 0) throw Error(`Not a buffer`);
      return e4.loadBuffer(e4.remainingBits / 8);
    }
    readBufferOpt() {
      let e4 = this.readCellOpt();
      if (e4 !== null) {
        let t2 = e4.beginParse();
        if (t2.remainingRefs !== 0 || t2.remainingBits % 8 != 0) throw Error(`Not a buffer`);
        return t2.loadBuffer(t2.remainingBits / 8);
      }
      return null;
    }
    readString() {
      return this.readCell().beginParse().loadStringTail();
    }
    readStringOpt() {
      let e4 = this.readCellOpt();
      return e4 === null ? null : e4.beginParse().loadStringTail();
    }
  };
})), Te = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.TupleBuilder = void 0;
  let t2 = be(), n2 = ye(), r2 = se();
  e2.TupleBuilder = class {
    constructor() {
      this._tuple = [];
    }
    writeNumber(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `int`, value: BigInt(e3) });
    }
    writeBoolean(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `int`, value: e3 ? -1n : 0n });
    }
    writeBuffer(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `slice`, cell: (0, t2.beginCell)().storeBuffer(e3).endCell() });
    }
    writeString(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `slice`, cell: (0, t2.beginCell)().storeStringTail(e3).endCell() });
    }
    writeCell(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : e3 instanceof n2.Cell ? this._tuple.push({ type: `cell`, cell: e3 }) : e3 instanceof r2.Slice && this._tuple.push({ type: `cell`, cell: e3.asCell() });
    }
    writeSlice(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : e3 instanceof n2.Cell ? this._tuple.push({ type: `slice`, cell: e3 }) : e3 instanceof r2.Slice && this._tuple.push({ type: `slice`, cell: e3.asCell() });
    }
    writeBuilder(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : e3 instanceof n2.Cell ? this._tuple.push({ type: `builder`, cell: e3 }) : e3 instanceof r2.Slice && this._tuple.push({ type: `builder`, cell: e3.asCell() });
    }
    writeTuple(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `tuple`, items: e3 });
    }
    writeAddress(e3) {
      e3 == null ? this._tuple.push({ type: `null` }) : this._tuple.push({ type: `slice`, cell: (0, t2.beginCell)().storeAddress(e3).endCell() });
    }
    build() {
      return [...this._tuple];
    }
  };
})), Ee = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.fromNano = e2.toNano = void 0;
  function t2(e3) {
    if (typeof e3 == `bigint`) return e3 * 1000000000n;
    {
      if (typeof e3 == `number`) {
        if (!Number.isFinite(e3)) throw Error(`Invalid number`);
        if (Math.log10(e3) <= 6) e3 = e3.toLocaleString(`en`, { minimumFractionDigits: 9, useGrouping: false });
        else if (e3 - Math.trunc(e3) === 0) e3 = e3.toLocaleString(`en`, { maximumFractionDigits: 0, useGrouping: false });
        else throw Error(`Not enough precision for a number value. Use string value instead`);
      }
      let t3 = false;
      for (; e3.startsWith(`-`); ) t3 = !t3, e3 = e3.slice(1);
      if (e3 === `.`) throw Error(`Invalid number`);
      let n3 = e3.split(`.`);
      if (n3.length > 2) throw Error(`Invalid number`);
      let r2 = n3[0], i2 = n3[1];
      if (r2 ||= `0`, i2 ||= `0`, i2.length > 9) throw Error(`Invalid number`);
      for (; i2.length < 9; ) i2 += `0`;
      let a2 = BigInt(r2) * 1000000000n + BigInt(i2);
      return t3 && (a2 = -a2), a2;
    }
  }
  e2.toNano = t2;
  function n2(e3) {
    let t3 = BigInt(e3), n3 = false;
    t3 < 0 && (n3 = true, t3 = -t3);
    let r2 = (t3 % 1000000000n).toString();
    for (; r2.length < 9; ) r2 = `0` + r2;
    r2 = r2.match(/^([0-9]*[1-9]|0)(0*)/)[1];
    let i2 = `${(t3 / 1000000000n).toString()}${r2 === `0` ? `` : `.${r2}`}`;
    return n3 && (i2 = `-` + i2), i2;
  }
  e2.fromNano = n2;
})), De = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.packExtraCurrencyCell = e2.packExtraCurrencyDict = e2.storeExtraCurrency = e2.loadMaybeExtraCurrency = e2.loadExtraCurrency = void 0;
  let t2 = be(), n2 = ae();
  function r2(e3) {
    let t3 = e3 instanceof n2.Dictionary ? e3 : n2.Dictionary.loadDirect(n2.Dictionary.Keys.Uint(32), n2.Dictionary.Values.BigVarUint(5), e3), r3 = {};
    for (let [e4, n3] of t3) r3[e4] = n3;
    return r3;
  }
  e2.loadExtraCurrency = r2;
  function i2(e3) {
    let t3 = e3.loadMaybeRef();
    return t3 === null ? t3 : r2(t3);
  }
  e2.loadMaybeExtraCurrency = i2;
  function a2(e3) {
    return (t3) => {
      t3.storeDict(o2(e3));
    };
  }
  e2.storeExtraCurrency = a2;
  function o2(e3) {
    let t3 = n2.Dictionary.empty(n2.Dictionary.Keys.Uint(32), n2.Dictionary.Values.BigVarUint(5));
    return Object.entries(e3).map(([e4, n3]) => t3.set(Number(e4), n3)), t3;
  }
  e2.packExtraCurrencyDict = o2;
  function s2(e3) {
    return (0, t2.beginCell)().storeDictDirect(o2(e3)).endCell();
  }
  e2.packExtraCurrencyCell = s2;
})), Oe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.comment = e2.external = e2.internal = void 0;
  let t2 = z(), n2 = ye(), r2 = be(), i2 = Ee(), a2 = De();
  function o2(e3) {
    let o3 = true;
    e3.bounce !== null && e3.bounce !== void 0 && (o3 = e3.bounce);
    let s3;
    if (typeof e3.to == `string`) s3 = t2.Address.parse(e3.to);
    else if (t2.Address.isAddress(e3.to)) s3 = e3.to;
    else throw Error(`Invalid address ${e3.to}`);
    let c3;
    c3 = typeof e3.value == `string` ? (0, i2.toNano)(e3.value) : e3.value;
    let l2;
    e3.extracurrency && (l2 = (0, a2.packExtraCurrencyDict)(e3.extracurrency));
    let u2 = n2.Cell.EMPTY;
    return typeof e3.body == `string` ? u2 = (0, r2.beginCell)().storeUint(0, 32).storeStringTail(e3.body).endCell() : e3.body && (u2 = e3.body), { info: { type: `internal`, dest: s3, value: { coins: c3, other: l2 }, bounce: o3, ihrDisabled: true, bounced: false, ihrFee: 0n, forwardFee: 0n, createdAt: 0, createdLt: 0n }, init: e3.init ?? void 0, body: u2 };
  }
  e2.internal = o2;
  function s2(e3) {
    let r3;
    if (typeof e3.to == `string`) r3 = t2.Address.parse(e3.to);
    else if (t2.Address.isAddress(e3.to)) r3 = e3.to;
    else throw Error(`Invalid address ${e3.to}`);
    return { info: { type: `external-in`, dest: r3, importFee: 0n }, init: e3.init ?? void 0, body: e3.body || n2.Cell.EMPTY };
  }
  e2.external = s2;
  function c2(e3) {
    return (0, r2.beginCell)().storeUint(0, 32).storeStringTail(e3).endCell();
  }
  e2.comment = c2;
})), ke = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeAccountState = e2.loadAccountState = void 0;
  let t2 = Ce();
  function n2(e3) {
    return e3.loadBit() ? { type: `active`, state: (0, t2.loadStateInit)(e3) } : e3.loadBit() ? { type: `frozen`, stateHash: e3.loadUintBig(256) } : { type: `uninit` };
  }
  e2.loadAccountState = n2;
  function r2(e3) {
    return (n3) => {
      e3.type === `active` ? (n3.storeBit(true), n3.store((0, t2.storeStateInit)(e3.state))) : e3.type === `frozen` ? (n3.storeBit(false), n3.storeBit(true), n3.storeUint(e3.stateHash, 256)) : e3.type === `uninit` && (n3.storeBit(false), n3.storeBit(false));
    };
  }
  e2.storeAccountState = r2;
})), Ae = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeCurrencyCollection = e2.loadCurrencyCollection = void 0;
  let t2 = ae();
  function n2(e3) {
    let n3 = e3.loadCoins(), r3 = e3.loadDict(t2.Dictionary.Keys.Uint(32), t2.Dictionary.Values.BigVarUint(5));
    return r3.size === 0 ? { coins: n3 } : { other: r3, coins: n3 };
  }
  e2.loadCurrencyCollection = n2;
  function r2(e3) {
    return (t3) => {
      t3.storeCoins(e3.coins), e3.other ? t3.storeDict(e3.other) : t3.storeBit(0);
    };
  }
  e2.storeCurrencyCollection = r2;
})), je = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeAccountStorage = e2.loadAccountStorage = void 0;
  let t2 = ke(), n2 = Ae();
  function r2(e3) {
    return { lastTransLt: e3.loadUintBig(64), balance: (0, n2.loadCurrencyCollection)(e3), state: (0, t2.loadAccountState)(e3) };
  }
  e2.loadAccountStorage = r2;
  function i2(e3) {
    return (r3) => {
      r3.storeUint(e3.lastTransLt, 64), r3.store((0, n2.storeCurrencyCollection)(e3.balance)), r3.store((0, t2.storeAccountState)(e3.state));
    };
  }
  e2.storeAccountStorage = i2;
})), Me = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeStorageExtraInfo = e2.loadStorageExtraInfo = void 0;
  function t2(e3) {
    let t3 = e3.loadUint(3);
    if (t3 === 0) return null;
    if (t3 === 1) return { dictHash: e3.loadUintBig(256) };
    throw Error(`Invalid storage extra info header: ${t3}`);
  }
  e2.loadStorageExtraInfo = t2;
  function n2(e3) {
    return (t3) => {
      e3 == null ? t3.storeUint(0, 3) : (t3.storeUint(1, 3), t3.storeUint(e3.dictHash, 256));
    };
  }
  e2.storeStorageExtraInfo = n2;
})), Ne = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeStorageUsed = e2.loadStorageUsed = void 0;
  function t2(e3) {
    return { cells: e3.loadVarUintBig(3), bits: e3.loadVarUintBig(3) };
  }
  e2.loadStorageUsed = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeVarUint(e3.cells, 3), t3.storeVarUint(e3.bits, 3);
    };
  }
  e2.storeStorageUsed = n2;
})), Pe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeStorageInfo = e2.loadStorageInfo = void 0;
  let t2 = Me(), n2 = Ne();
  function r2(e3) {
    return { used: (0, n2.loadStorageUsed)(e3), storageExtra: (0, t2.loadStorageExtraInfo)(e3), lastPaid: e3.loadUint(32), duePayment: e3.loadMaybeCoins() };
  }
  e2.loadStorageInfo = r2;
  function i2(e3) {
    return (r3) => {
      r3.store((0, n2.storeStorageUsed)(e3.used)), r3.store((0, t2.storeStorageExtraInfo)(e3.storageExtra)), r3.storeUint(e3.lastPaid, 32), r3.storeMaybeCoins(e3.duePayment);
    };
  }
  e2.storeStorageInfo = i2;
})), Fe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeAccount = e2.loadAccount = void 0;
  let t2 = je(), n2 = Pe();
  function r2(e3) {
    return { addr: e3.loadAddress(), storageStats: (0, n2.loadStorageInfo)(e3), storage: (0, t2.loadAccountStorage)(e3) };
  }
  e2.loadAccount = r2;
  function i2(e3) {
    return (r3) => {
      r3.storeAddress(e3.addr), r3.store((0, n2.storeStorageInfo)(e3.storageStats)), r3.store((0, t2.storeAccountStorage)(e3.storage));
    };
  }
  e2.storeAccount = i2;
})), Ie = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeAccountStatus = e2.loadAccountStatus = void 0;
  function t2(e3) {
    let t3 = e3.loadUint(2);
    if (t3 === 0) return `uninitialized`;
    if (t3 === 1) return `frozen`;
    if (t3 === 2) return `active`;
    if (t3 === 3) return `non-existing`;
    throw Error(`Invalid data`);
  }
  e2.loadAccountStatus = t2;
  function n2(e3) {
    return (t3) => {
      if (e3 === `uninitialized`) t3.storeUint(0, 2);
      else if (e3 === `frozen`) t3.storeUint(1, 2);
      else if (e3 === `active`) t3.storeUint(2, 2);
      else if (e3 === `non-existing`) t3.storeUint(3, 2);
      else throw Error(`Invalid data`);
      return t3;
    };
  }
  e2.storeAccountStatus = n2;
})), Le = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeAccountStatusChange = e2.loadAccountStatusChange = void 0;
  function t2(e3) {
    return e3.loadBit() ? e3.loadBit() ? `deleted` : `frozen` : `unchanged`;
  }
  e2.loadAccountStatusChange = t2;
  function n2(e3) {
    return (t3) => {
      if (e3 == `unchanged`) t3.storeBit(0);
      else if (e3 === `frozen`) t3.storeBit(1), t3.storeBit(0);
      else if (e3 === `deleted`) t3.storeBit(1), t3.storeBit(1);
      else throw Error(`Invalid account status change`);
    };
  }
  e2.storeAccountStatusChange = n2;
})), Re = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeCommonMessageInfoRelaxed = e2.loadCommonMessageInfoRelaxed = void 0;
  let t2 = Ae();
  function n2(e3) {
    if (!e3.loadBit()) return { type: `internal`, ihrDisabled: e3.loadBit(), bounce: e3.loadBit(), bounced: e3.loadBit(), src: e3.loadMaybeAddress(), dest: e3.loadAddress(), value: (0, t2.loadCurrencyCollection)(e3), ihrFee: e3.loadCoins(), forwardFee: e3.loadCoins(), createdLt: e3.loadUintBig(64), createdAt: e3.loadUint(32) };
    if (!e3.loadBit()) throw Error(`External In message is not possible for CommonMessageInfoRelaxed`);
    return { type: `external-out`, src: e3.loadMaybeAddress(), dest: e3.loadMaybeExternalAddress(), createdLt: e3.loadUintBig(64), createdAt: e3.loadUint(32) };
  }
  e2.loadCommonMessageInfoRelaxed = n2;
  function r2(e3) {
    return (n3) => {
      if (e3.type === `internal`) n3.storeBit(0), n3.storeBit(e3.ihrDisabled), n3.storeBit(e3.bounce), n3.storeBit(e3.bounced), n3.storeAddress(e3.src), n3.storeAddress(e3.dest), n3.store((0, t2.storeCurrencyCollection)(e3.value)), n3.storeCoins(e3.ihrFee), n3.storeCoins(e3.forwardFee), n3.storeUint(e3.createdLt, 64), n3.storeUint(e3.createdAt, 32);
      else if (e3.type === `external-out`) n3.storeBit(1), n3.storeBit(1), n3.storeAddress(e3.src), n3.storeAddress(e3.dest), n3.storeUint(e3.createdLt, 64), n3.storeUint(e3.createdAt, 32);
      else throw Error(`Unknown CommonMessageInfo type`);
    };
  }
  e2.storeCommonMessageInfoRelaxed = r2;
})), ze = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeMessageRelaxed = e2.loadMessageRelaxed = void 0;
  let t2 = be(), n2 = Re(), r2 = Ce();
  function i2(e3) {
    let t3 = (0, n2.loadCommonMessageInfoRelaxed)(e3), i3 = null;
    e3.loadBit() && (i3 = e3.loadBit() ? (0, r2.loadStateInit)(e3.loadRef().beginParse()) : (0, r2.loadStateInit)(e3));
    let a3 = e3.loadBit() ? e3.loadRef() : e3.asCell();
    return { info: t3, init: i3, body: a3 };
  }
  e2.loadMessageRelaxed = i2;
  function a2(e3, i3) {
    return (a3) => {
      if (a3.store((0, n2.storeCommonMessageInfoRelaxed)(e3.info)), e3.init) {
        a3.storeBit(true);
        let n3 = (0, t2.beginCell)().store((0, r2.storeStateInit)(e3.init)), o3 = false;
        o3 = i3 && i3.forceRef ? true : !(a3.availableBits - 2 >= n3.bits), o3 ? (a3.storeBit(true), a3.storeRef(n3)) : (a3.storeBit(false), a3.storeBuilder(n3));
      } else a3.storeBit(false);
      let o2 = false;
      o2 = i3 && i3.forceRef ? true : !(a3.availableBits - 1 >= e3.body.bits.length && a3.refs + e3.body.refs.length <= 4 && !e3.body.isExotic), o2 ? (a3.storeBit(true), a3.storeRef(e3.body)) : (a3.storeBit(false), a3.storeBuilder(e3.body.asBuilder()));
    };
  }
  e2.storeMessageRelaxed = a2;
})), Be = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeLibRef = e2.loadLibRef = void 0;
  function t2(e3) {
    return e3.loadUint(1) === 0 ? { type: `hash`, libHash: e3.loadBuffer(32) } : { type: `ref`, library: e3.loadRef() };
  }
  e2.loadLibRef = t2;
  function n2(e3) {
    return (t3) => {
      e3.type === `hash` ? (t3.storeUint(0, 1), t3.storeBuffer(e3.libHash)) : (t3.storeUint(1, 1), t3.storeRef(e3.library));
    };
  }
  e2.storeLibRef = n2;
})), Ve = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.loadOutList = e2.storeOutList = e2.loadOutAction = e2.storeOutAction = void 0;
  let t2 = ze(), n2 = be(), r2 = Ae(), i2 = Be();
  function a2(e3) {
    switch (e3.type) {
      case `sendMsg`:
        return s2(e3);
      case `setCode`:
        return l2(e3);
      case `reserve`:
        return d2(e3);
      case `changeLibrary`:
        return p2(e3);
      default:
        throw Error(`Unknown action type ${e3.type}`);
    }
  }
  e2.storeOutAction = a2;
  let o2 = 247711853;
  function s2(e3) {
    return (r3) => {
      r3.storeUint(o2, 32).storeUint(e3.mode, 8).storeRef((0, n2.beginCell)().store((0, t2.storeMessageRelaxed)(e3.outMsg)).endCell());
    };
  }
  let c2 = 2907562126;
  function l2(e3) {
    return (t3) => {
      t3.storeUint(c2, 32).storeRef(e3.newCode);
    };
  }
  let u2 = 921090057;
  function d2(e3) {
    return (t3) => {
      t3.storeUint(u2, 32).storeUint(e3.mode, 8).store((0, r2.storeCurrencyCollection)(e3.currency));
    };
  }
  let f2 = 653925844;
  function p2(e3) {
    return (t3) => {
      t3.storeUint(f2, 32).storeUint(e3.mode, 7).store((0, i2.storeLibRef)(e3.libRef));
    };
  }
  function m2(e3) {
    let n3 = e3.loadUint(32);
    if (n3 === o2) return { type: `sendMsg`, mode: e3.loadUint(8), outMsg: (0, t2.loadMessageRelaxed)(e3.loadRef().beginParse()) };
    if (n3 === c2) return { type: `setCode`, newCode: e3.loadRef() };
    if (n3 === u2) return { type: `reserve`, mode: e3.loadUint(8), currency: (0, r2.loadCurrencyCollection)(e3) };
    if (n3 === f2) return { type: `changeLibrary`, mode: e3.loadUint(7), libRef: (0, i2.loadLibRef)(e3) };
    throw Error(`Unknown out action tag 0x${n3.toString(16)}`);
  }
  e2.loadOutAction = m2;
  function h2(e3) {
    let t3 = e3.reduce((e4, t4) => (0, n2.beginCell)().storeRef(e4).store(a2(t4)).endCell(), (0, n2.beginCell)().endCell());
    return (e4) => {
      e4.storeSlice(t3.beginParse());
    };
  }
  e2.storeOutList = h2;
  function g2(e3) {
    let t3 = [];
    for (; e3.remainingRefs; ) {
      let n3 = e3.loadRef();
      t3.push(m2(e3)), e3 = n3.beginParse();
    }
    return t3.reverse();
  }
  e2.loadOutList = g2;
})), He = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeCommonMessageInfo = e2.loadCommonMessageInfo = void 0;
  let t2 = Ae();
  function n2(e3) {
    return e3.loadBit() ? e3.loadBit() ? { type: `external-out`, src: e3.loadAddress(), dest: e3.loadMaybeExternalAddress(), createdLt: e3.loadUintBig(64), createdAt: e3.loadUint(32) } : { type: `external-in`, src: e3.loadMaybeExternalAddress(), dest: e3.loadAddress(), importFee: e3.loadCoins() } : { type: `internal`, ihrDisabled: e3.loadBit(), bounce: e3.loadBit(), bounced: e3.loadBit(), src: e3.loadAddress(), dest: e3.loadAddress(), value: (0, t2.loadCurrencyCollection)(e3), ihrFee: e3.loadCoins(), forwardFee: e3.loadCoins(), createdLt: e3.loadUintBig(64), createdAt: e3.loadUint(32) };
  }
  e2.loadCommonMessageInfo = n2;
  function r2(e3) {
    return (n3) => {
      if (e3.type === `internal`) n3.storeBit(0), n3.storeBit(e3.ihrDisabled), n3.storeBit(e3.bounce), n3.storeBit(e3.bounced), n3.storeAddress(e3.src), n3.storeAddress(e3.dest), n3.store((0, t2.storeCurrencyCollection)(e3.value)), n3.storeCoins(e3.ihrFee), n3.storeCoins(e3.forwardFee), n3.storeUint(e3.createdLt, 64), n3.storeUint(e3.createdAt, 32);
      else if (e3.type === `external-in`) n3.storeBit(1), n3.storeBit(0), n3.storeAddress(e3.src), n3.storeAddress(e3.dest), n3.storeCoins(e3.importFee);
      else if (e3.type === `external-out`) n3.storeBit(1), n3.storeBit(1), n3.storeAddress(e3.src), n3.storeAddress(e3.dest), n3.storeUint(e3.createdLt, 64), n3.storeUint(e3.createdAt, 32);
      else throw Error(`Unknown CommonMessageInfo type`);
    };
  }
  e2.storeCommonMessageInfo = r2;
})), Ue = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeComputeSkipReason = e2.loadComputeSkipReason = void 0;
  function t2(e3) {
    let t3 = e3.loadUint(2);
    if (t3 === 0) return `no-state`;
    if (t3 === 1) return `bad-state`;
    if (t3 === 2) return `no-gas`;
    throw Error(`Unknown ComputeSkipReason: ${t3}`);
  }
  e2.loadComputeSkipReason = t2;
  function n2(e3) {
    return (t3) => {
      if (e3 === `no-state`) t3.storeUint(0, 2);
      else if (e3 === `bad-state`) t3.storeUint(1, 2);
      else if (e3 === `no-gas`) t3.storeUint(2, 2);
      else throw Error(`Unknown ComputeSkipReason: ${e3}`);
    };
  }
  e2.storeComputeSkipReason = n2;
})), We = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeDepthBalanceInfo = e2.loadDepthBalanceInfo = void 0;
  let t2 = Ae();
  function n2(e3) {
    return { splitDepth: e3.loadUint(5), balance: (0, t2.loadCurrencyCollection)(e3) };
  }
  e2.loadDepthBalanceInfo = n2;
  function r2(e3) {
    return (n3) => {
      n3.storeUint(e3.splitDepth, 5), n3.store((0, t2.storeCurrencyCollection)(e3.balance));
    };
  }
  e2.storeDepthBalanceInfo = r2;
})), Ge = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeHashUpdate = e2.loadHashUpdate = void 0;
  function t2(e3) {
    if (e3.loadUint(8) !== 114) throw Error(`Invalid data`);
    return { oldHash: e3.loadBuffer(32), newHash: e3.loadBuffer(32) };
  }
  e2.loadHashUpdate = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeUint(114, 8), t3.storeBuffer(e3.oldHash), t3.storeBuffer(e3.newHash);
    };
  }
  e2.storeHashUpdate = n2;
})), Ke = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.loadMasterchainStateExtra = void 0;
  let t2 = ae(), n2 = Ae();
  function r2(e3) {
    if (e3.loadUint(16) !== 52262) throw Error(`Invalid data`);
    e3.loadBit() && e3.loadRef();
    let r3 = e3.loadUintBig(256);
    return { config: t2.Dictionary.load(t2.Dictionary.Keys.Int(32), t2.Dictionary.Values.Cell(), e3), configAddress: r3, globalBalance: (0, n2.loadCurrencyCollection)(e3) };
  }
  e2.loadMasterchainStateExtra = r2;
})), qe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.MessageValue = e2.storeMessage = e2.loadMessage = void 0;
  let t2 = be(), n2 = He(), r2 = Ce();
  function i2(e3) {
    let t3 = (0, n2.loadCommonMessageInfo)(e3), i3 = null;
    e3.loadBit() && (i3 = e3.loadBit() ? (0, r2.loadStateInit)(e3.loadRef().beginParse()) : (0, r2.loadStateInit)(e3));
    let a3 = e3.loadBit() ? e3.loadRef() : e3.asCell();
    return { info: t3, init: i3, body: a3 };
  }
  e2.loadMessage = i2;
  function a2(e3, i3) {
    return (a3) => {
      if (a3.store((0, n2.storeCommonMessageInfo)(e3.info)), e3.init) {
        a3.storeBit(true);
        let n3 = (0, t2.beginCell)().store((0, r2.storeStateInit)(e3.init)), o3 = false;
        o3 = i3 && i3.forceRef ? true : a3.availableBits - 2 < n3.bits + e3.body.bits.length, o3 ? (a3.storeBit(true), a3.storeRef(n3)) : (a3.storeBit(false), a3.storeBuilder(n3));
      } else a3.storeBit(false);
      let o2 = false;
      o2 = i3 && i3.forceRef ? true : a3.availableBits - 1 < e3.body.bits.length || a3.refs + e3.body.refs.length > 4, o2 ? (a3.storeBit(true), a3.storeRef(e3.body)) : (a3.storeBit(false), a3.storeBuilder(e3.body.asBuilder()));
    };
  }
  e2.storeMessage = a2, e2.MessageValue = { serialize(e3, n3) {
    n3.storeRef((0, t2.beginCell)().store(a2(e3)));
  }, parse(e3) {
    return i2(e3.loadRef().beginParse());
  } };
})), Je = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.SendMode = void 0;
  var t2;
  (function(e3) {
    e3[e3.CARRY_ALL_REMAINING_BALANCE = 128] = `CARRY_ALL_REMAINING_BALANCE`, e3[e3.CARRY_ALL_REMAINING_INCOMING_VALUE = 64] = `CARRY_ALL_REMAINING_INCOMING_VALUE`, e3[e3.DESTROY_ACCOUNT_IF_ZERO = 32] = `DESTROY_ACCOUNT_IF_ZERO`, e3[e3.PAY_GAS_SEPARATELY = 1] = `PAY_GAS_SEPARATELY`, e3[e3.IGNORE_ERRORS = 2] = `IGNORE_ERRORS`, e3[e3.NONE = 0] = `NONE`;
  })(t2 || (e2.SendMode = t2 = {}));
})), Ye = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ReserveMode = void 0;
  var t2;
  (function(e3) {
    e3[e3.THIS_AMOUNT = 0] = `THIS_AMOUNT`, e3[e3.LEAVE_THIS_AMOUNT = 1] = `LEAVE_THIS_AMOUNT`, e3[e3.AT_MOST_THIS_AMOUNT = 2] = `AT_MOST_THIS_AMOUNT`, e3[e3.LEAVE_MAX_THIS_AMOUNT = 3] = `LEAVE_MAX_THIS_AMOUNT`, e3[e3.BEFORE_BALANCE_PLUS_THIS_AMOUNT = 4] = `BEFORE_BALANCE_PLUS_THIS_AMOUNT`, e3[e3.LEAVE_BBALANCE_PLUS_THIS_AMOUNT = 5] = `LEAVE_BBALANCE_PLUS_THIS_AMOUNT`, e3[e3.BEFORE_BALANCE_MINUS_THIS_AMOUNT = 12] = `BEFORE_BALANCE_MINUS_THIS_AMOUNT`, e3[e3.LEAVE_BEFORE_BALANCE_MINUS_THIS_AMOUNT = 13] = `LEAVE_BEFORE_BALANCE_MINUS_THIS_AMOUNT`;
  })(t2 || (e2.ReserveMode = t2 = {}));
})), Xe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeShardAccount = e2.loadShardAccount = void 0;
  let t2 = be(), n2 = Fe();
  function r2(e3) {
    let t3 = e3.loadRef(), r3;
    if (!t3.isExotic) {
      let e4 = t3.beginParse();
      e4.loadBit() && (r3 = (0, n2.loadAccount)(e4));
    }
    return { account: r3, lastTransactionHash: e3.loadUintBig(256), lastTransactionLt: e3.loadUintBig(64) };
  }
  e2.loadShardAccount = r2;
  function i2(e3) {
    return (r3) => {
      e3.account ? r3.storeRef((0, t2.beginCell)().storeBit(true).store((0, n2.storeAccount)(e3.account))) : r3.storeRef((0, t2.beginCell)().storeBit(false)), r3.storeUint(e3.lastTransactionHash, 256), r3.storeUint(e3.lastTransactionLt, 64);
    };
  }
  e2.storeShardAccount = i2;
})), Ze = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeShardAccounts = e2.loadShardAccounts = e2.ShardAccountRefValue = void 0;
  let t2 = ae(), n2 = We(), r2 = Xe();
  e2.ShardAccountRefValue = { parse: (e3) => ({ depthBalanceInfo: (0, n2.loadDepthBalanceInfo)(e3), shardAccount: (0, r2.loadShardAccount)(e3) }), serialize(e3, t3) {
    t3.store((0, n2.storeDepthBalanceInfo)(e3.depthBalanceInfo)), t3.store((0, r2.storeShardAccount)(e3.shardAccount));
  } };
  function i2(n3) {
    return t2.Dictionary.load(t2.Dictionary.Keys.BigUint(256), e2.ShardAccountRefValue, n3);
  }
  e2.loadShardAccounts = i2;
  function a2(e3) {
    return (t3) => {
      t3.storeDict(e3);
    };
  }
  e2.storeShardAccounts = a2;
})), $ = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeShardIdent = e2.loadShardIdent = void 0;
  function t2(e3) {
    if (e3.loadUint(2) !== 0) throw Error(`Invalid data`);
    return { shardPrefixBits: e3.loadUint(6), workchainId: e3.loadInt(32), shardPrefix: e3.loadUintBig(64) };
  }
  e2.loadShardIdent = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeUint(0, 2), t3.storeUint(e3.shardPrefixBits, 6), t3.storeInt(e3.workchainId, 32), t3.storeUint(e3.shardPrefix, 64);
    };
  }
  e2.storeShardIdent = n2;
})), Qe = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.loadShardStateUnsplit = void 0;
  let t2 = Ke(), n2 = Ze(), r2 = $();
  function i2(e3) {
    if (e3.loadUint(32) !== 2418257890) throw Error(`Invalid data`);
    let i3 = e3.loadInt(32), a2 = (0, r2.loadShardIdent)(e3), o2 = e3.loadUint(32), s2 = e3.loadUint(32), c2 = e3.loadUint(32), l2 = e3.loadUintBig(64), u2 = e3.loadUint(32);
    e3.loadRef();
    let d2 = e3.loadBit(), f2 = e3.loadRef(), p2;
    f2.isExotic || (p2 = (0, n2.loadShardAccounts)(f2.beginParse())), e3.loadRef();
    let m2 = e3.loadBit(), h2 = null;
    if (m2) {
      let n3 = e3.loadRef();
      n3.isExotic || (h2 = (0, t2.loadMasterchainStateExtra)(n3.beginParse()));
    }
    return { globalId: i3, shardId: a2, seqno: o2, vertSeqNo: s2, genUtime: c2, genLt: l2, minRefMcSeqno: u2, beforeSplit: d2, accounts: p2, extras: h2 };
  }
  e2.loadShardStateUnsplit = i2;
})), $e = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.signatureDomainEmptyTag = e2.signatureDomainL2Tag = void 0, e2.signatureDomainL2Tag = 1907576545, e2.signatureDomainEmptyTag = 236803867;
})), et = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeSplitMergeInfo = e2.loadSplitMergeInfo = void 0;
  function t2(e3) {
    return { currentShardPrefixLength: e3.loadUint(6), accountSplitDepth: e3.loadUint(6), thisAddress: e3.loadUintBig(256), siblingAddress: e3.loadUintBig(256) };
  }
  e2.loadSplitMergeInfo = t2;
  function n2(e3) {
    return (t3) => {
      t3.storeUint(e3.currentShardPrefixLength, 6), t3.storeUint(e3.accountSplitDepth, 6), t3.storeUint(e3.thisAddress, 256), t3.storeUint(e3.siblingAddress, 256);
    };
  }
  e2.storeSplitMergeInfo = n2;
})), tt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionActionPhase = e2.loadTransactionActionPhase = void 0;
  let t2 = Le(), n2 = Ne();
  function r2(e3) {
    return { success: e3.loadBit(), valid: e3.loadBit(), noFunds: e3.loadBit(), statusChange: (0, t2.loadAccountStatusChange)(e3), totalFwdFees: e3.loadBit() ? e3.loadCoins() : void 0, totalActionFees: e3.loadBit() ? e3.loadCoins() : void 0, resultCode: e3.loadInt(32), resultArg: e3.loadBit() ? e3.loadInt(32) : void 0, totalActions: e3.loadUint(16), specActions: e3.loadUint(16), skippedActions: e3.loadUint(16), messagesCreated: e3.loadUint(16), actionListHash: e3.loadUintBig(256), totalMessageSize: (0, n2.loadStorageUsed)(e3) };
  }
  e2.loadTransactionActionPhase = r2;
  function i2(e3) {
    return (r3) => {
      r3.storeBit(e3.success), r3.storeBit(e3.valid), r3.storeBit(e3.noFunds), r3.store((0, t2.storeAccountStatusChange)(e3.statusChange)), r3.storeMaybeCoins(e3.totalFwdFees), r3.storeMaybeCoins(e3.totalActionFees), r3.storeInt(e3.resultCode, 32), r3.storeMaybeInt(e3.resultArg, 32), r3.storeUint(e3.totalActions, 16), r3.storeUint(e3.specActions, 16), r3.storeUint(e3.skippedActions, 16), r3.storeUint(e3.messagesCreated, 16), r3.storeUint(e3.actionListHash, 256), r3.store((0, n2.storeStorageUsed)(e3.totalMessageSize));
    };
  }
  e2.storeTransactionActionPhase = i2;
})), nt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionBouncePhase = e2.loadTransactionBouncePhase = void 0;
  let t2 = Ne();
  function n2(e3) {
    return e3.loadBit() ? { type: `ok`, messageSize: (0, t2.loadStorageUsed)(e3), messageFees: e3.loadCoins(), forwardFees: e3.loadCoins() } : e3.loadBit() ? { type: `no-funds`, messageSize: (0, t2.loadStorageUsed)(e3), requiredForwardFees: e3.loadCoins() } : { type: `negative-funds` };
  }
  e2.loadTransactionBouncePhase = n2;
  function r2(e3) {
    return (n3) => {
      if (e3.type === `ok`) n3.storeBit(true), n3.store((0, t2.storeStorageUsed)(e3.messageSize)), n3.storeCoins(e3.messageFees), n3.storeCoins(e3.forwardFees);
      else if (e3.type === `negative-funds`) n3.storeBit(false), n3.storeBit(false);
      else if (e3.type === `no-funds`) n3.storeBit(false), n3.storeBit(true), n3.store((0, t2.storeStorageUsed)(e3.messageSize)), n3.storeCoins(e3.requiredForwardFees);
      else throw Error(`Invalid TransactionBouncePhase type`);
    };
  }
  e2.storeTransactionBouncePhase = r2;
})), rt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionComputePhase = e2.loadTransactionComputePhase = void 0;
  let t2 = be(), n2 = Ue();
  function r2(e3) {
    if (!e3.loadBit()) return { type: `skipped`, reason: (0, n2.loadComputeSkipReason)(e3) };
    let t3 = e3.loadBit(), r3 = e3.loadBit(), i3 = e3.loadBit(), a2 = e3.loadCoins(), o2 = e3.loadRef().beginParse();
    return { type: `vm`, success: t3, messageStateUsed: r3, accountActivated: i3, gasFees: a2, gasUsed: o2.loadVarUintBig(3), gasLimit: o2.loadVarUintBig(3), gasCredit: o2.loadBit() ? o2.loadVarUintBig(2) : void 0, mode: o2.loadUint(8), exitCode: o2.loadInt(32), exitArg: o2.loadBit() ? o2.loadInt(32) : void 0, vmSteps: o2.loadUint(32), vmInitStateHash: o2.loadUintBig(256), vmFinalStateHash: o2.loadUintBig(256) };
  }
  e2.loadTransactionComputePhase = r2;
  function i2(e3) {
    return (r3) => {
      if (e3.type === `skipped`) {
        r3.storeBit(0), r3.store((0, n2.storeComputeSkipReason)(e3.reason));
        return;
      }
      r3.storeBit(1), r3.storeBit(e3.success), r3.storeBit(e3.messageStateUsed), r3.storeBit(e3.accountActivated), r3.storeCoins(e3.gasFees), r3.storeRef((0, t2.beginCell)().storeVarUint(e3.gasUsed, 3).storeVarUint(e3.gasLimit, 3).store((t3) => e3.gasCredit !== void 0 && e3.gasCredit !== null ? t3.storeBit(1).storeVarUint(e3.gasCredit, 2) : t3.storeBit(0)).storeUint(e3.mode, 8).storeInt(e3.exitCode, 32).store((t3) => e3.exitArg !== void 0 && e3.exitArg !== null ? t3.storeBit(1).storeInt(e3.exitArg, 32) : t3.storeBit(0)).storeUint(e3.vmSteps, 32).storeUint(e3.vmInitStateHash, 256).storeUint(e3.vmFinalStateHash, 256).endCell());
    };
  }
  e2.storeTransactionComputePhase = i2;
})), it = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionCreditPhase = e2.loadTransactionCreditPhase = void 0;
  let t2 = Ae();
  function n2(e3) {
    return { dueFeesColelcted: e3.loadBit() ? e3.loadCoins() : void 0, credit: (0, t2.loadCurrencyCollection)(e3) };
  }
  e2.loadTransactionCreditPhase = n2;
  function r2(e3) {
    return (n3) => {
      e3.dueFeesColelcted === null || e3.dueFeesColelcted === void 0 ? n3.storeBit(false) : (n3.storeBit(true), n3.storeCoins(e3.dueFeesColelcted)), n3.store((0, t2.storeCurrencyCollection)(e3.credit));
    };
  }
  e2.storeTransactionCreditPhase = r2;
})), at = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionsStoragePhase = e2.loadTransactionStoragePhase = void 0;
  let t2 = Le();
  function n2(e3) {
    let n3 = e3.loadCoins(), r3;
    e3.loadBit() && (r3 = e3.loadCoins());
    let i2 = (0, t2.loadAccountStatusChange)(e3);
    return { storageFeesCollected: n3, storageFeesDue: r3, statusChange: i2 };
  }
  e2.loadTransactionStoragePhase = n2;
  function r2(e3) {
    return (n3) => {
      n3.storeCoins(e3.storageFeesCollected), e3.storageFeesDue === null || e3.storageFeesDue === void 0 ? n3.storeBit(false) : (n3.storeBit(true), n3.storeCoins(e3.storageFeesDue)), n3.store((0, t2.storeAccountStatusChange)(e3.statusChange));
    };
  }
  e2.storeTransactionsStoragePhase = r2;
})), ot = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransactionDescription = e2.loadTransactionDescription = void 0;
  let t2 = be(), n2 = et(), r2 = st(), i2 = tt(), a2 = nt(), o2 = rt(), s2 = it(), c2 = at();
  function l2(e3) {
    let t3 = e3.loadUint(4);
    if (t3 === 0) {
      let t4 = e3.loadBit(), n3;
      e3.loadBit() && (n3 = (0, c2.loadTransactionStoragePhase)(e3));
      let r3;
      e3.loadBit() && (r3 = (0, s2.loadTransactionCreditPhase)(e3));
      let l3 = (0, o2.loadTransactionComputePhase)(e3), u3;
      e3.loadBit() && (u3 = (0, i2.loadTransactionActionPhase)(e3.loadRef().beginParse()));
      let d2 = e3.loadBit(), f2;
      e3.loadBit() && (f2 = (0, a2.loadTransactionBouncePhase)(e3));
      let p2 = e3.loadBit();
      return { type: `generic`, creditFirst: t4, storagePhase: n3, creditPhase: r3, computePhase: l3, actionPhase: u3, bouncePhase: f2, aborted: d2, destroyed: p2 };
    }
    if (t3 === 1) return { type: `storage`, storagePhase: (0, c2.loadTransactionStoragePhase)(e3) };
    if (t3 === 2 || t3 === 3) {
      let n3 = t3 === 3, r3 = (0, c2.loadTransactionStoragePhase)(e3), a3 = (0, o2.loadTransactionComputePhase)(e3), s3;
      e3.loadBit() && (s3 = (0, i2.loadTransactionActionPhase)(e3.loadRef().beginParse()));
      let l3 = e3.loadBit(), u3 = e3.loadBit();
      return { type: `tick-tock`, isTock: n3, storagePhase: r3, computePhase: a3, actionPhase: s3, aborted: l3, destroyed: u3 };
    }
    if (t3 === 4) {
      let t4 = (0, n2.loadSplitMergeInfo)(e3), r3;
      e3.loadBit() && (r3 = (0, c2.loadTransactionStoragePhase)(e3));
      let a3 = (0, o2.loadTransactionComputePhase)(e3), s3;
      e3.loadBit() && (s3 = (0, i2.loadTransactionActionPhase)(e3.loadRef().beginParse()));
      let l3 = e3.loadBit(), u3 = e3.loadBit();
      return { type: `split-prepare`, splitInfo: t4, storagePhase: r3, computePhase: a3, actionPhase: s3, aborted: l3, destroyed: u3 };
    }
    if (t3 === 5) return { type: `split-install`, splitInfo: (0, n2.loadSplitMergeInfo)(e3), prepareTransaction: (0, r2.loadTransaction)(e3.loadRef().beginParse()), installed: e3.loadBit() };
    throw Error(`Unsupported transaction description type ${t3}`);
  }
  e2.loadTransactionDescription = l2;
  function u2(e3) {
    return (l3) => {
      if (e3.type === `generic`) l3.storeUint(0, 4), l3.storeBit(e3.creditFirst), e3.storagePhase ? (l3.storeBit(true), l3.store((0, c2.storeTransactionsStoragePhase)(e3.storagePhase))) : l3.storeBit(false), e3.creditPhase ? (l3.storeBit(true), l3.store((0, s2.storeTransactionCreditPhase)(e3.creditPhase))) : l3.storeBit(false), l3.store((0, o2.storeTransactionComputePhase)(e3.computePhase)), e3.actionPhase ? (l3.storeBit(true), l3.storeRef((0, t2.beginCell)().store((0, i2.storeTransactionActionPhase)(e3.actionPhase)))) : l3.storeBit(false), l3.storeBit(e3.aborted), e3.bouncePhase ? (l3.storeBit(true), l3.store((0, a2.storeTransactionBouncePhase)(e3.bouncePhase))) : l3.storeBit(false), l3.storeBit(e3.destroyed);
      else if (e3.type === `storage`) l3.storeUint(1, 4), l3.store((0, c2.storeTransactionsStoragePhase)(e3.storagePhase));
      else if (e3.type === `tick-tock`) l3.storeUint(e3.isTock ? 3 : 2, 4), l3.store((0, c2.storeTransactionsStoragePhase)(e3.storagePhase)), l3.store((0, o2.storeTransactionComputePhase)(e3.computePhase)), e3.actionPhase ? (l3.storeBit(true), l3.storeRef((0, t2.beginCell)().store((0, i2.storeTransactionActionPhase)(e3.actionPhase)))) : l3.storeBit(false), l3.storeBit(e3.aborted), l3.storeBit(e3.destroyed);
      else if (e3.type === `split-prepare`) l3.storeUint(4, 4), l3.store((0, n2.storeSplitMergeInfo)(e3.splitInfo)), e3.storagePhase ? (l3.storeBit(true), l3.store((0, c2.storeTransactionsStoragePhase)(e3.storagePhase))) : l3.storeBit(false), l3.store((0, o2.storeTransactionComputePhase)(e3.computePhase)), e3.actionPhase ? (l3.storeBit(true), l3.store((0, i2.storeTransactionActionPhase)(e3.actionPhase))) : l3.storeBit(false), l3.storeBit(e3.aborted), l3.storeBit(e3.destroyed);
      else if (e3.type === `split-install`) l3.storeUint(5, 4), l3.store((0, n2.storeSplitMergeInfo)(e3.splitInfo)), l3.storeRef((0, t2.beginCell)().store((0, r2.storeTransaction)(e3.prepareTransaction))), l3.storeBit(e3.installed);
      else throw Error(`Unsupported transaction description type ${e3.type}`);
    };
  }
  e2.storeTransactionDescription = u2;
})), st = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeTransaction = e2.loadTransaction = void 0;
  let t2 = be(), n2 = ae(), r2 = Ie(), i2 = Ae(), a2 = Ge(), o2 = qe(), s2 = ot();
  function c2(e3) {
    let t3 = e3.asCell();
    if (e3.loadUint(4) !== 7) throw Error(`Invalid data`);
    let c3 = e3.loadUintBig(256), l3 = e3.loadUintBig(64), u2 = e3.loadUintBig(256), d2 = e3.loadUintBig(64), f2 = e3.loadUint(32), p2 = e3.loadUint(15), m2 = (0, r2.loadAccountStatus)(e3), h2 = (0, r2.loadAccountStatus)(e3), g2 = e3.loadRef().beginParse(), _2 = g2.loadBit() ? (0, o2.loadMessage)(g2.loadRef().beginParse()) : void 0, v2 = g2.loadDict(n2.Dictionary.Keys.Uint(15), o2.MessageValue);
    return g2.endParse(), { address: c3, lt: l3, prevTransactionHash: u2, prevTransactionLt: d2, now: f2, outMessagesCount: p2, oldStatus: m2, endStatus: h2, inMessage: _2, outMessages: v2, totalFees: (0, i2.loadCurrencyCollection)(e3), stateUpdate: (0, a2.loadHashUpdate)(e3.loadRef().beginParse()), description: (0, s2.loadTransactionDescription)(e3.loadRef().beginParse()), raw: t3, hash: () => t3.hash() };
  }
  e2.loadTransaction = c2;
  function l2(e3) {
    return (n3) => {
      n3.storeUint(7, 4), n3.storeUint(e3.address, 256), n3.storeUint(e3.lt, 64), n3.storeUint(e3.prevTransactionHash, 256), n3.storeUint(e3.prevTransactionLt, 64), n3.storeUint(e3.now, 32), n3.storeUint(e3.outMessagesCount, 15), n3.store((0, r2.storeAccountStatus)(e3.oldStatus)), n3.store((0, r2.storeAccountStatus)(e3.endStatus));
      let c3 = (0, t2.beginCell)();
      e3.inMessage ? (c3.storeBit(true), c3.storeRef((0, t2.beginCell)().store((0, o2.storeMessage)(e3.inMessage)))) : c3.storeBit(false), c3.storeDict(e3.outMessages), n3.storeRef(c3), n3.store((0, i2.storeCurrencyCollection)(e3.totalFees)), n3.storeRef((0, t2.beginCell)().store((0, a2.storeHashUpdate)(e3.stateUpdate))), n3.storeRef((0, t2.beginCell)().store((0, s2.storeTransactionDescription)(e3.description)));
    };
  }
  e2.storeTransaction = l2;
})), ct = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.signatureDomainEmptyTag = e2.loadShardStateUnsplit = e2.storeShardIdent = e2.loadShardIdent = e2.storeShardAccounts = e2.loadShardAccounts = e2.ShardAccountRefValue = e2.storeShardAccount = e2.loadShardAccount = e2.ReserveMode = e2.SendMode = e2.storeMessageRelaxed = e2.loadMessageRelaxed = e2.storeMessage = e2.loadMessage = e2.loadMasterchainStateExtra = e2.storeHashUpdate = e2.loadHashUpdate = e2.storeExtraCurrency = e2.loadMaybeExtraCurrency = e2.loadExtraCurrency = e2.packExtraCurrencyDict = e2.packExtraCurrencyCell = e2.storeDepthBalanceInfo = e2.loadDepthBalanceInfo = e2.storeCurrencyCollection = e2.loadCurrencyCollection = e2.storeComputeSkipReason = e2.loadComputeSkipReason = e2.storeCommonMessageInfoRelaxed = e2.loadCommonMessageInfoRelaxed = e2.storeCommonMessageInfo = e2.loadCommonMessageInfo = e2.storeOutList = e2.loadOutList = e2.storeOutAction = e2.loadOutAction = e2.storeAccountStorage = e2.loadAccountStorage = e2.storeAccountStatusChange = e2.loadAccountStatusChange = e2.storeAccountStatus = e2.loadAccountStatus = e2.storeAccountState = e2.loadAccountState = e2.storeAccount = e2.loadAccount = e2.comment = e2.external = e2.internal = void 0, e2.storeTransactionsStoragePhase = e2.loadTransactionStoragePhase = e2.storeTransactionDescription = e2.loadTransactionDescription = e2.storeTransactionCreditPhase = e2.loadTransactionCreditPhase = e2.storeTransactionComputePhase = e2.loadTransactionComputePhase = e2.storeTransactionBouncePhase = e2.loadTransactionBouncePhase = e2.storeTransactionActionPhase = e2.loadTransactionActionPhase = e2.storeTransaction = e2.loadTransaction = e2.storeTickTock = e2.loadTickTock = e2.storeStorageUsed = e2.loadStorageUsed = e2.storeStorageInfo = e2.loadStorageInfo = e2.storeStateInit = e2.loadStateInit = e2.storeSplitMergeInfo = e2.loadSplitMergeInfo = e2.storeLibRef = e2.loadLibRef = e2.storeSimpleLibrary = e2.loadSimpleLibrary = e2.signatureDomainL2Tag = void 0;
  var t2 = Oe();
  Object.defineProperty(e2, "internal", { enumerable: true, get: function() {
    return t2.internal;
  } }), Object.defineProperty(e2, "external", { enumerable: true, get: function() {
    return t2.external;
  } }), Object.defineProperty(e2, "comment", { enumerable: true, get: function() {
    return t2.comment;
  } });
  var n2 = Fe();
  Object.defineProperty(e2, "loadAccount", { enumerable: true, get: function() {
    return n2.loadAccount;
  } }), Object.defineProperty(e2, "storeAccount", { enumerable: true, get: function() {
    return n2.storeAccount;
  } });
  var r2 = ke();
  Object.defineProperty(e2, "loadAccountState", { enumerable: true, get: function() {
    return r2.loadAccountState;
  } }), Object.defineProperty(e2, "storeAccountState", { enumerable: true, get: function() {
    return r2.storeAccountState;
  } });
  var i2 = Ie();
  Object.defineProperty(e2, "loadAccountStatus", { enumerable: true, get: function() {
    return i2.loadAccountStatus;
  } }), Object.defineProperty(e2, "storeAccountStatus", { enumerable: true, get: function() {
    return i2.storeAccountStatus;
  } });
  var a2 = Le();
  Object.defineProperty(e2, "loadAccountStatusChange", { enumerable: true, get: function() {
    return a2.loadAccountStatusChange;
  } }), Object.defineProperty(e2, "storeAccountStatusChange", { enumerable: true, get: function() {
    return a2.storeAccountStatusChange;
  } });
  var o2 = je();
  Object.defineProperty(e2, "loadAccountStorage", { enumerable: true, get: function() {
    return o2.loadAccountStorage;
  } }), Object.defineProperty(e2, "storeAccountStorage", { enumerable: true, get: function() {
    return o2.storeAccountStorage;
  } });
  var s2 = Ve();
  Object.defineProperty(e2, "loadOutAction", { enumerable: true, get: function() {
    return s2.loadOutAction;
  } }), Object.defineProperty(e2, "storeOutAction", { enumerable: true, get: function() {
    return s2.storeOutAction;
  } }), Object.defineProperty(e2, "loadOutList", { enumerable: true, get: function() {
    return s2.loadOutList;
  } }), Object.defineProperty(e2, "storeOutList", { enumerable: true, get: function() {
    return s2.storeOutList;
  } });
  var c2 = He();
  Object.defineProperty(e2, "loadCommonMessageInfo", { enumerable: true, get: function() {
    return c2.loadCommonMessageInfo;
  } }), Object.defineProperty(e2, "storeCommonMessageInfo", { enumerable: true, get: function() {
    return c2.storeCommonMessageInfo;
  } });
  var l2 = Re();
  Object.defineProperty(e2, "loadCommonMessageInfoRelaxed", { enumerable: true, get: function() {
    return l2.loadCommonMessageInfoRelaxed;
  } }), Object.defineProperty(e2, "storeCommonMessageInfoRelaxed", { enumerable: true, get: function() {
    return l2.storeCommonMessageInfoRelaxed;
  } });
  var u2 = Ue();
  Object.defineProperty(e2, "loadComputeSkipReason", { enumerable: true, get: function() {
    return u2.loadComputeSkipReason;
  } }), Object.defineProperty(e2, "storeComputeSkipReason", { enumerable: true, get: function() {
    return u2.storeComputeSkipReason;
  } });
  var d2 = Ae();
  Object.defineProperty(e2, "loadCurrencyCollection", { enumerable: true, get: function() {
    return d2.loadCurrencyCollection;
  } }), Object.defineProperty(e2, "storeCurrencyCollection", { enumerable: true, get: function() {
    return d2.storeCurrencyCollection;
  } });
  var f2 = We();
  Object.defineProperty(e2, "loadDepthBalanceInfo", { enumerable: true, get: function() {
    return f2.loadDepthBalanceInfo;
  } }), Object.defineProperty(e2, "storeDepthBalanceInfo", { enumerable: true, get: function() {
    return f2.storeDepthBalanceInfo;
  } });
  var p2 = De();
  Object.defineProperty(e2, "packExtraCurrencyCell", { enumerable: true, get: function() {
    return p2.packExtraCurrencyCell;
  } }), Object.defineProperty(e2, "packExtraCurrencyDict", { enumerable: true, get: function() {
    return p2.packExtraCurrencyDict;
  } }), Object.defineProperty(e2, "loadExtraCurrency", { enumerable: true, get: function() {
    return p2.loadExtraCurrency;
  } }), Object.defineProperty(e2, "loadMaybeExtraCurrency", { enumerable: true, get: function() {
    return p2.loadMaybeExtraCurrency;
  } }), Object.defineProperty(e2, "storeExtraCurrency", { enumerable: true, get: function() {
    return p2.storeExtraCurrency;
  } });
  var m2 = Ge();
  Object.defineProperty(e2, "loadHashUpdate", { enumerable: true, get: function() {
    return m2.loadHashUpdate;
  } }), Object.defineProperty(e2, "storeHashUpdate", { enumerable: true, get: function() {
    return m2.storeHashUpdate;
  } });
  var h2 = Ke();
  Object.defineProperty(e2, "loadMasterchainStateExtra", { enumerable: true, get: function() {
    return h2.loadMasterchainStateExtra;
  } });
  var g2 = qe();
  Object.defineProperty(e2, "loadMessage", { enumerable: true, get: function() {
    return g2.loadMessage;
  } }), Object.defineProperty(e2, "storeMessage", { enumerable: true, get: function() {
    return g2.storeMessage;
  } });
  var _2 = ze();
  Object.defineProperty(e2, "loadMessageRelaxed", { enumerable: true, get: function() {
    return _2.loadMessageRelaxed;
  } }), Object.defineProperty(e2, "storeMessageRelaxed", { enumerable: true, get: function() {
    return _2.storeMessageRelaxed;
  } });
  var v2 = Je();
  Object.defineProperty(e2, "SendMode", { enumerable: true, get: function() {
    return v2.SendMode;
  } });
  var y2 = Ye();
  Object.defineProperty(e2, "ReserveMode", { enumerable: true, get: function() {
    return y2.ReserveMode;
  } });
  var b2 = Xe();
  Object.defineProperty(e2, "loadShardAccount", { enumerable: true, get: function() {
    return b2.loadShardAccount;
  } }), Object.defineProperty(e2, "storeShardAccount", { enumerable: true, get: function() {
    return b2.storeShardAccount;
  } });
  var x2 = Ze();
  Object.defineProperty(e2, "ShardAccountRefValue", { enumerable: true, get: function() {
    return x2.ShardAccountRefValue;
  } }), Object.defineProperty(e2, "loadShardAccounts", { enumerable: true, get: function() {
    return x2.loadShardAccounts;
  } }), Object.defineProperty(e2, "storeShardAccounts", { enumerable: true, get: function() {
    return x2.storeShardAccounts;
  } });
  var S2 = $();
  Object.defineProperty(e2, "loadShardIdent", { enumerable: true, get: function() {
    return S2.loadShardIdent;
  } }), Object.defineProperty(e2, "storeShardIdent", { enumerable: true, get: function() {
    return S2.storeShardIdent;
  } });
  var C2 = Qe();
  Object.defineProperty(e2, "loadShardStateUnsplit", { enumerable: true, get: function() {
    return C2.loadShardStateUnsplit;
  } });
  var w2 = $e();
  Object.defineProperty(e2, "signatureDomainEmptyTag", { enumerable: true, get: function() {
    return w2.signatureDomainEmptyTag;
  } }), Object.defineProperty(e2, "signatureDomainL2Tag", { enumerable: true, get: function() {
    return w2.signatureDomainL2Tag;
  } });
  var T2 = xe();
  Object.defineProperty(e2, "loadSimpleLibrary", { enumerable: true, get: function() {
    return T2.loadSimpleLibrary;
  } }), Object.defineProperty(e2, "storeSimpleLibrary", { enumerable: true, get: function() {
    return T2.storeSimpleLibrary;
  } });
  var E2 = Be();
  Object.defineProperty(e2, "loadLibRef", { enumerable: true, get: function() {
    return E2.loadLibRef;
  } }), Object.defineProperty(e2, "storeLibRef", { enumerable: true, get: function() {
    return E2.storeLibRef;
  } });
  var D2 = et();
  Object.defineProperty(e2, "loadSplitMergeInfo", { enumerable: true, get: function() {
    return D2.loadSplitMergeInfo;
  } }), Object.defineProperty(e2, "storeSplitMergeInfo", { enumerable: true, get: function() {
    return D2.storeSplitMergeInfo;
  } });
  var O2 = Ce();
  Object.defineProperty(e2, "loadStateInit", { enumerable: true, get: function() {
    return O2.loadStateInit;
  } }), Object.defineProperty(e2, "storeStateInit", { enumerable: true, get: function() {
    return O2.storeStateInit;
  } });
  var k2 = Pe();
  Object.defineProperty(e2, "loadStorageInfo", { enumerable: true, get: function() {
    return k2.loadStorageInfo;
  } }), Object.defineProperty(e2, "storeStorageInfo", { enumerable: true, get: function() {
    return k2.storeStorageInfo;
  } });
  var A2 = Ne();
  Object.defineProperty(e2, "loadStorageUsed", { enumerable: true, get: function() {
    return A2.loadStorageUsed;
  } }), Object.defineProperty(e2, "storeStorageUsed", { enumerable: true, get: function() {
    return A2.storeStorageUsed;
  } });
  var j2 = Se();
  Object.defineProperty(e2, "loadTickTock", { enumerable: true, get: function() {
    return j2.loadTickTock;
  } }), Object.defineProperty(e2, "storeTickTock", { enumerable: true, get: function() {
    return j2.storeTickTock;
  } });
  var M2 = st();
  Object.defineProperty(e2, "loadTransaction", { enumerable: true, get: function() {
    return M2.loadTransaction;
  } }), Object.defineProperty(e2, "storeTransaction", { enumerable: true, get: function() {
    return M2.storeTransaction;
  } });
  var N2 = tt();
  Object.defineProperty(e2, "loadTransactionActionPhase", { enumerable: true, get: function() {
    return N2.loadTransactionActionPhase;
  } }), Object.defineProperty(e2, "storeTransactionActionPhase", { enumerable: true, get: function() {
    return N2.storeTransactionActionPhase;
  } });
  var P2 = nt();
  Object.defineProperty(e2, "loadTransactionBouncePhase", { enumerable: true, get: function() {
    return P2.loadTransactionBouncePhase;
  } }), Object.defineProperty(e2, "storeTransactionBouncePhase", { enumerable: true, get: function() {
    return P2.storeTransactionBouncePhase;
  } });
  var F2 = rt();
  Object.defineProperty(e2, "loadTransactionComputePhase", { enumerable: true, get: function() {
    return F2.loadTransactionComputePhase;
  } }), Object.defineProperty(e2, "storeTransactionComputePhase", { enumerable: true, get: function() {
    return F2.storeTransactionComputePhase;
  } });
  var I2 = it();
  Object.defineProperty(e2, "loadTransactionCreditPhase", { enumerable: true, get: function() {
    return I2.loadTransactionCreditPhase;
  } }), Object.defineProperty(e2, "storeTransactionCreditPhase", { enumerable: true, get: function() {
    return I2.storeTransactionCreditPhase;
  } });
  var L2 = ot();
  Object.defineProperty(e2, "loadTransactionDescription", { enumerable: true, get: function() {
    return L2.loadTransactionDescription;
  } }), Object.defineProperty(e2, "storeTransactionDescription", { enumerable: true, get: function() {
    return L2.storeTransactionDescription;
  } });
  var R2 = at();
  Object.defineProperty(e2, "loadTransactionStoragePhase", { enumerable: true, get: function() {
    return R2.loadTransactionStoragePhase;
  } }), Object.defineProperty(e2, "storeTransactionsStoragePhase", { enumerable: true, get: function() {
    return R2.storeTransactionsStoragePhase;
  } });
})), lt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.openContract = void 0;
  let t2 = z(), n2 = ye();
  function r2(e3, r3) {
    let i2, a2 = null;
    if (!t2.Address.isAddress(e3.address)) throw Error(`Invalid address`);
    if (i2 = e3.address, e3.init) {
      if (!(e3.init.code instanceof n2.Cell)) throw Error(`Invalid init.code`);
      if (!(e3.init.data instanceof n2.Cell)) throw Error(`Invalid init.data`);
      a2 = e3.init;
    }
    let o2 = r3({ address: i2, init: a2 });
    return new Proxy(e3, { get(e4, t3) {
      let n3 = e4[t3];
      return typeof t3 == `string` && (t3.startsWith(`get`) || t3.startsWith(`send`) || t3.startsWith(`is`)) && typeof n3 == `function` ? (...t4) => n3.apply(e4, [o2, ...t4]) : n3;
    } });
  }
  e2.openContract = r2;
})), ut = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ComputeError = void 0, e2.ComputeError = class e3 extends Error {
    constructor(t2, n2, r2) {
      super(t2), this.exitCode = n2, this.debugLogs = r2 && r2.debugLogs ? r2.debugLogs : null, this.logs = r2 && r2.logs ? r2.logs : null, Object.setPrototypeOf(this, e3.prototype);
    }
  };
})), dt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getMethodId = void 0;
  let t2 = new Int16Array([0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920]);
  function n2(e3) {
    e3 instanceof Buffer || (e3 = Buffer.from(e3));
    let n3 = 0;
    for (let r3 = 0; r3 < e3.length; r3++) {
      let i2 = e3[r3];
      n3 = (t2[(n3 >> 8 ^ i2) & 255] ^ n3 << 8) & 65535;
    }
    return n3;
  }
  function r2(e3) {
    return n2(e3) & 65535 | 65536;
  }
  e2.getMethodId = r2;
})), ft = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.safeSignVerify = e2.safeSign = void 0;
  let t2 = I();
  function n2(e3, n3) {
    let r3 = Buffer.from(n3);
    if (r3.length > 64) throw Error(`Seed can	 be longer than 64 bytes`);
    if (r3.length < 8) throw Error(`Seed must be at least 8 bytes`);
    return (0, t2.sha256_sync)(Buffer.concat([Buffer.from([255, 255]), r3, e3.hash()]));
  }
  function r2(e3, r3, i3 = `ton-safe-sign-magic`) {
    return (0, t2.sign)(n2(e3, i3), r3);
  }
  e2.safeSign = r2;
  function i2(e3, r3, i3, a2 = `ton-safe-sign-magic`) {
    return (0, t2.signVerify)(n2(e3, a2), r3, i3);
  }
  e2.safeSignVerify = i2;
})), pt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.domainSignVerify = e2.domainSign = e2.domainDataToSign = e2.signatureDomainPrefix = e2.signatureDomainHash = void 0;
  let t2 = I(), n2 = $e();
  function r2(e3) {
    switch (e3.type) {
      case `empty`:
        let r3 = Buffer.alloc(4);
        return r3.writeInt32LE(n2.signatureDomainEmptyTag), (0, t2.sha256_sync)(r3);
      case `l2`: {
        let r4 = Buffer.alloc(8);
        return r4.writeInt32LE(n2.signatureDomainL2Tag), r4.writeInt32LE(e3.globalId, 4), (0, t2.sha256_sync)(r4);
      }
      default:
        throw Error(`Unknown SignatureDomain type ${e3.type}`);
    }
  }
  e2.signatureDomainHash = r2;
  let i2 = r2({ type: `empty` });
  function a2(e3) {
    let t3 = Buffer.isBuffer(e3) ? e3 : r2(e3);
    if (t3.length !== 32) throw Error(`Invalid signature domain hash length`);
    return t3.equals(i2) ? null : t3;
  }
  e2.signatureDomainPrefix = a2;
  function o2(e3, t3) {
    let n3 = a2(t3);
    return n3 ? Buffer.concat([n3, e3]) : e3;
  }
  e2.domainDataToSign = o2;
  function s2({ data: e3, secretKey: n3, domain: r3 = { type: `empty` } }) {
    let i3 = o2(e3, r3);
    return (0, t2.sign)(i3, n3);
  }
  e2.domainSign = s2;
  function c2({ data: e3, signature: n3, publicKey: r3, domain: i3 = { type: `empty` } }) {
    let a3 = o2(e3, i3);
    return (0, t2.signVerify)(a3, n3, r3);
  }
  e2.domainSignVerify = c2;
})), mt = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3);
    var i3 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i3 || (`get` in i3 ? !t3.__esModule : i3.writable || i3.configurable)) && (i3 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r3, i3);
  }) : (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3), e3[r3] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r3 in e3) r3 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r3) && t2(n3, e3, r3);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.domainDataToSign = e2.domainSignVerify = e2.domainSign = e2.signatureDomainPrefix = e2.signatureDomainHash = e2.safeSignVerify = e2.safeSign = e2.getMethodId = e2.base32Encode = e2.base32Decode = e2.crc32c = e2.crc16 = e2.fromNano = e2.toNano = e2.ComputeError = e2.openContract = e2.TupleBuilder = e2.TupleReader = e2.serializeTupleItem = e2.parseTupleItem = e2.serializeTuple = e2.parseTuple = e2.generateMerkleUpdate = e2.generateMerkleProofDirect = e2.generateMerkleProof = e2.exoticPruned = e2.exoticMerkleUpdate = e2.convertToMerkleProof = e2.exoticMerkleProof = e2.Dictionary = e2.Cell = e2.CellType = e2.Slice = e2.beginCell = e2.Builder = e2.BitBuilder = e2.BitReader = e2.BitString = e2.contractAddress = e2.ADNLAddress = e2.ExternalAddress = e2.address = e2.Address = void 0;
  var r2 = z();
  Object.defineProperty(e2, "Address", { enumerable: true, get: function() {
    return r2.Address;
  } }), Object.defineProperty(e2, "address", { enumerable: true, get: function() {
    return r2.address;
  } });
  var i2 = B();
  Object.defineProperty(e2, "ExternalAddress", { enumerable: true, get: function() {
    return i2.ExternalAddress;
  } });
  var a2 = H();
  Object.defineProperty(e2, "ADNLAddress", { enumerable: true, get: function() {
    return a2.ADNLAddress;
  } });
  var o2 = we();
  Object.defineProperty(e2, "contractAddress", { enumerable: true, get: function() {
    return o2.contractAddress;
  } });
  var s2 = W();
  Object.defineProperty(e2, "BitString", { enumerable: true, get: function() {
    return s2.BitString;
  } });
  var c2 = J();
  Object.defineProperty(e2, "BitReader", { enumerable: true, get: function() {
    return c2.BitReader;
  } });
  var l2 = G();
  Object.defineProperty(e2, "BitBuilder", { enumerable: true, get: function() {
    return l2.BitBuilder;
  } });
  var u2 = be();
  Object.defineProperty(e2, "Builder", { enumerable: true, get: function() {
    return u2.Builder;
  } }), Object.defineProperty(e2, "beginCell", { enumerable: true, get: function() {
    return u2.beginCell;
  } });
  var d2 = se();
  Object.defineProperty(e2, "Slice", { enumerable: true, get: function() {
    return d2.Slice;
  } });
  var f2 = K();
  Object.defineProperty(e2, "CellType", { enumerable: true, get: function() {
    return f2.CellType;
  } });
  var p2 = ye();
  Object.defineProperty(e2, "Cell", { enumerable: true, get: function() {
    return p2.Cell;
  } });
  var m2 = ae();
  Object.defineProperty(e2, "Dictionary", { enumerable: true, get: function() {
    return m2.Dictionary;
  } });
  var h2 = Y();
  Object.defineProperty(e2, "exoticMerkleProof", { enumerable: true, get: function() {
    return h2.exoticMerkleProof;
  } }), Object.defineProperty(e2, "convertToMerkleProof", { enumerable: true, get: function() {
    return h2.convertToMerkleProof;
  } });
  var g2 = le();
  Object.defineProperty(e2, "exoticMerkleUpdate", { enumerable: true, get: function() {
    return g2.exoticMerkleUpdate;
  } });
  var _2 = de();
  Object.defineProperty(e2, "exoticPruned", { enumerable: true, get: function() {
    return _2.exoticPruned;
  } });
  var v2 = X();
  Object.defineProperty(e2, "generateMerkleProof", { enumerable: true, get: function() {
    return v2.generateMerkleProof;
  } }), Object.defineProperty(e2, "generateMerkleProofDirect", { enumerable: true, get: function() {
    return v2.generateMerkleProofDirect;
  } });
  var y2 = ee();
  Object.defineProperty(e2, "generateMerkleUpdate", { enumerable: true, get: function() {
    return y2.generateMerkleUpdate;
  } });
  var b2 = Z();
  Object.defineProperty(e2, "parseTuple", { enumerable: true, get: function() {
    return b2.parseTuple;
  } }), Object.defineProperty(e2, "serializeTuple", { enumerable: true, get: function() {
    return b2.serializeTuple;
  } }), Object.defineProperty(e2, "parseTupleItem", { enumerable: true, get: function() {
    return b2.parseTupleItem;
  } }), Object.defineProperty(e2, "serializeTupleItem", { enumerable: true, get: function() {
    return b2.serializeTupleItem;
  } });
  var x2 = Q();
  Object.defineProperty(e2, "TupleReader", { enumerable: true, get: function() {
    return x2.TupleReader;
  } });
  var S2 = Te();
  Object.defineProperty(e2, "TupleBuilder", { enumerable: true, get: function() {
    return S2.TupleBuilder;
  } }), n2(ct(), e2);
  var C2 = lt();
  Object.defineProperty(e2, "openContract", { enumerable: true, get: function() {
    return C2.openContract;
  } });
  var w2 = ut();
  Object.defineProperty(e2, "ComputeError", { enumerable: true, get: function() {
    return w2.ComputeError;
  } });
  var T2 = Ee();
  Object.defineProperty(e2, "toNano", { enumerable: true, get: function() {
    return T2.toNano;
  } }), Object.defineProperty(e2, "fromNano", { enumerable: true, get: function() {
    return T2.fromNano;
  } });
  var E2 = R();
  Object.defineProperty(e2, "crc16", { enumerable: true, get: function() {
    return E2.crc16;
  } });
  var D2 = _e();
  Object.defineProperty(e2, "crc32c", { enumerable: true, get: function() {
    return D2.crc32c;
  } });
  var O2 = V();
  Object.defineProperty(e2, "base32Decode", { enumerable: true, get: function() {
    return O2.base32Decode;
  } }), Object.defineProperty(e2, "base32Encode", { enumerable: true, get: function() {
    return O2.base32Encode;
  } });
  var k2 = dt();
  Object.defineProperty(e2, "getMethodId", { enumerable: true, get: function() {
    return k2.getMethodId;
  } });
  var A2 = ft();
  Object.defineProperty(e2, "safeSign", { enumerable: true, get: function() {
    return A2.safeSign;
  } }), Object.defineProperty(e2, "safeSignVerify", { enumerable: true, get: function() {
    return A2.safeSignVerify;
  } });
  var j2 = pt();
  Object.defineProperty(e2, "signatureDomainHash", { enumerable: true, get: function() {
    return j2.signatureDomainHash;
  } }), Object.defineProperty(e2, "signatureDomainPrefix", { enumerable: true, get: function() {
    return j2.signatureDomainPrefix;
  } }), Object.defineProperty(e2, "domainSign", { enumerable: true, get: function() {
    return j2.domainSign;
  } }), Object.defineProperty(e2, "domainSignVerify", { enumerable: true, get: function() {
    return j2.domainSignVerify;
  } }), Object.defineProperty(e2, "domainDataToSign", { enumerable: true, get: function() {
    return j2.domainDataToSign;
  } });
})), ht = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.InMemoryCache = void 0, e2.InMemoryCache = class {
    constructor() {
      this.cache = /* @__PURE__ */ new Map(), this.set = async (e3, t2, n2) => {
        n2 === null ? this.cache.delete(e3 + `$$` + t2) : this.cache.set(e3 + `$$` + t2, n2);
      }, this.get = async (e3, t2) => {
        let n2 = this.cache.get(e3 + `$$` + t2);
        return n2 === void 0 ? null : n2;
      };
    }
  };
})), gt = i(((e2, t2) => {
  var n2 = (function() {
    function e3(e4, t4) {
      if (typeof e4 != `function`) throw TypeError(`DataLoader must be constructed with a function which accepts ` + (`Array<key> and returns Promise<Array<value>>, but got: ` + e4 + `.`));
      this._batchLoadFn = e4, this._maxBatchSize = l2(t4), this._batchScheduleFn = u2(t4), this._cacheKeyFn = d2(t4), this._cacheMap = f2(t4), this._batch = null, this.name = p2(t4);
    }
    var t3 = e3.prototype;
    return t3.load = function(e4) {
      if (e4 == null) throw TypeError(`The loader.load() function must be called with a value, ` + (`but got: ` + String(e4) + `.`));
      var t4 = a2(this), n3 = this._cacheMap, r3;
      if (n3) {
        r3 = this._cacheKeyFn(e4);
        var i3 = n3.get(r3);
        if (i3) {
          var o3 = t4.cacheHits ||= [];
          return new Promise(function(e5) {
            o3.push(function() {
              e5(i3);
            });
          });
        }
      }
      t4.keys.push(e4);
      var s3 = new Promise(function(e5, n4) {
        t4.callbacks.push({ resolve: e5, reject: n4 });
      });
      return n3 && n3.set(r3, s3), s3;
    }, t3.loadMany = function(e4) {
      if (!m2(e4)) throw TypeError(`The loader.loadMany() function must be called with Array<key> ` + (`but got: ` + e4 + `.`));
      for (var t4 = [], n3 = 0; n3 < e4.length; n3++) t4.push(this.load(e4[n3]).catch(function(e5) {
        return e5;
      }));
      return Promise.all(t4);
    }, t3.clear = function(e4) {
      var t4 = this._cacheMap;
      if (t4) {
        var n3 = this._cacheKeyFn(e4);
        t4.delete(n3);
      }
      return this;
    }, t3.clearAll = function() {
      var e4 = this._cacheMap;
      return e4 && e4.clear(), this;
    }, t3.prime = function(e4, t4) {
      var n3 = this._cacheMap;
      if (n3) {
        var r3 = this._cacheKeyFn(e4);
        if (n3.get(r3) === void 0) {
          var i3;
          t4 instanceof Error ? (i3 = Promise.reject(t4), i3.catch(function() {
          })) : i3 = Promise.resolve(t4), n3.set(r3, i3);
        }
      }
      return this;
    }, e3;
  })(), r2 = typeof process == `object` && typeof process.nextTick == `function` ? function(e3) {
    i2 ||= Promise.resolve(), i2.then(function() {
      process.nextTick(e3);
    });
  } : typeof setImmediate == `function` ? function(e3) {
    setImmediate(e3);
  } : function(e3) {
    setTimeout(e3);
  }, i2;
  function a2(e3) {
    var t3 = e3._batch;
    if (t3 !== null && !t3.hasDispatched && t3.keys.length < e3._maxBatchSize) return t3;
    var n3 = { hasDispatched: false, keys: [], callbacks: [] };
    return e3._batch = n3, e3._batchScheduleFn(function() {
      o2(e3, n3);
    }), n3;
  }
  function o2(e3, t3) {
    if (t3.hasDispatched = true, t3.keys.length === 0) {
      c2(t3);
      return;
    }
    var n3;
    try {
      n3 = e3._batchLoadFn(t3.keys);
    } catch (n4) {
      return s2(e3, t3, TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function ` + (`errored synchronously: ` + String(n4) + `.`)));
    }
    if (!n3 || typeof n3.then != `function`) return s2(e3, t3, TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did ` + (`not return a Promise: ` + String(n3) + `.`)));
    n3.then(function(e4) {
      if (!m2(e4)) throw TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did ` + (`not return a Promise of an Array: ` + String(e4) + `.`));
      if (e4.length !== t3.keys.length) throw TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.` + (`

Keys:
` + String(t3.keys)) + (`

Values:
` + String(e4)));
      c2(t3);
      for (var n4 = 0; n4 < t3.callbacks.length; n4++) {
        var r3 = e4[n4];
        r3 instanceof Error ? t3.callbacks[n4].reject(r3) : t3.callbacks[n4].resolve(r3);
      }
    }).catch(function(n4) {
      s2(e3, t3, n4);
    });
  }
  function s2(e3, t3, n3) {
    c2(t3);
    for (var r3 = 0; r3 < t3.keys.length; r3++) e3.clear(t3.keys[r3]), t3.callbacks[r3].reject(n3);
  }
  function c2(e3) {
    if (e3.cacheHits) for (var t3 = 0; t3 < e3.cacheHits.length; t3++) e3.cacheHits[t3]();
  }
  function l2(e3) {
    if (!(!e3 || e3.batch !== false)) return 1;
    var t3 = e3 && e3.maxBatchSize;
    if (t3 === void 0) return 1 / 0;
    if (typeof t3 != `number` || t3 < 1) throw TypeError(`maxBatchSize must be a positive number: ` + t3);
    return t3;
  }
  function u2(e3) {
    var t3 = e3 && e3.batchScheduleFn;
    if (t3 === void 0) return r2;
    if (typeof t3 != `function`) throw TypeError(`batchScheduleFn must be a function: ` + t3);
    return t3;
  }
  function d2(e3) {
    var t3 = e3 && e3.cacheKeyFn;
    if (t3 === void 0) return function(e4) {
      return e4;
    };
    if (typeof t3 != `function`) throw TypeError(`cacheKeyFn must be a function: ` + t3);
    return t3;
  }
  function f2(e3) {
    if (!(!e3 || e3.cache !== false)) return null;
    var t3 = e3 && e3.cacheMap;
    if (t3 === void 0) return /* @__PURE__ */ new Map();
    if (t3 !== null) {
      var n3 = [`get`, `set`, `delete`, `clear`].filter(function(e4) {
        return t3 && typeof t3[e4] != `function`;
      });
      if (n3.length !== 0) throw TypeError(`Custom cacheMap missing methods: ` + n3.join(`, `));
    }
    return t3;
  }
  function p2(e3) {
    return e3 && e3.name ? e3.name : null;
  }
  function m2(e3) {
    return typeof e3 == `object` && !!e3 && typeof e3.length == `number` && (e3.length === 0 || e3.length > 0 && Object.prototype.hasOwnProperty.call(e3, e3.length - 1));
  }
  t2.exports = n2;
})), _t = i(((e2, t2) => {
  /*! Axios v1.20.0 Copyright (c) 2026 Matt Zabriskie and contributors */
  function n2(e3, t3) {
    return function() {
      return e3.apply(t3, arguments);
    };
  }
  let { toString: r2 } = Object.prototype, { getPrototypeOf: i2 } = Object, { iterator: a2, toStringTag: o2 } = Symbol, s2 = (({ hasOwnProperty: e3 }) => (t3, n3) => e3.call(t3, n3))(Object.prototype), c2 = (e3) => typeof e3 == `string` && (e3 === `__proto__` || e3 === `constructor` || e3 === `prototype`), l2 = (e3, t3, n3) => e3 === Object.prototype || !n3 && t3 === null, u2 = (e3) => {
    if (!Object.isExtensible(e3)) return false;
    let t3 = Object.getOwnPropertyNames(e3);
    return Object.getOwnPropertySymbols && t3.push(...Object.getOwnPropertySymbols(e3)), t3.every((t4) => {
      if (c2(t4)) return false;
      let n3 = Object.getOwnPropertyDescriptor(e3, t4);
      return !!n3 && n3.configurable && n3.writable === true;
    });
  }, d2 = (e3, t3) => {
    let n3 = e3, r3 = [];
    for (; n3 != null; ) {
      if (r3.indexOf(n3) !== -1) return false;
      r3.push(n3);
      let a3 = i2(n3);
      if (l2(n3, a3, n3 === e3)) return false;
      if (s2(n3, t3)) return true;
      n3 = a3;
    }
    return false;
  }, f2 = (e3, t3) => e3 != null && d2(e3, t3) ? e3[t3] : void 0, p2 = (e3) => {
    if (e3 == null || typeof e3 != `object` && typeof e3 != `function`) return e3;
    let t3 = i2(e3);
    if (t3 === null && u2(e3)) return e3;
    let n3 = /* @__PURE__ */ Object.create(null), r3 = /* @__PURE__ */ Object.create(null), a3 = [], o3 = e3;
    for (; o3 != null && a3.indexOf(o3) === -1; ) {
      a3.push(o3);
      let u3 = o3 === e3 ? t3 : i2(o3);
      if (l2(o3, u3, o3 === e3)) break;
      let d3 = Object.getOwnPropertyNames(o3);
      Object.getOwnPropertySymbols && d3.push(...Object.getOwnPropertySymbols(o3));
      for (let t4 of d3) c2(t4) || s2(r3, t4) || (n3[t4] = e3[t4], r3[t4] = true);
      o3 = u3;
    }
    return n3;
  }, m2 = /* @__PURE__ */ ((e3) => (t3) => {
    let n3 = r2.call(t3);
    return e3[n3] || (e3[n3] = n3.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null)), h2 = (e3) => (e3 = e3.toLowerCase(), (t3) => m2(t3) === e3), g2 = (e3) => (t3) => typeof t3 === e3, { isArray: _2 } = Array, v2 = g2(`undefined`);
  function y2(e3) {
    return e3 !== null && !v2(e3) && e3.constructor !== null && !v2(e3.constructor) && C2(e3.constructor.isBuffer) && e3.constructor.isBuffer(e3);
  }
  let b2 = h2(`ArrayBuffer`);
  function x2(e3) {
    let t3;
    return t3 = typeof ArrayBuffer < `u` && ArrayBuffer.isView ? ArrayBuffer.isView(e3) : e3 && e3.buffer && b2(e3.buffer), t3;
  }
  let S2 = g2(`string`), C2 = g2(`function`), w2 = g2(`number`), T2 = (e3) => typeof e3 == `object` && !!e3, E2 = (e3) => e3 === true || e3 === false, D2 = (e3) => {
    if (!T2(e3)) return false;
    let t3 = i2(e3);
    return (t3 === null || t3 === Object.prototype || i2(t3) === null) && !d2(e3, o2) && !d2(e3, a2);
  }, O2 = (e3) => {
    if (!T2(e3) || y2(e3)) return false;
    try {
      return Object.keys(e3).length === 0 && Object.getPrototypeOf(e3) === Object.prototype;
    } catch {
      return false;
    }
  }, k2 = h2(`Date`), A2 = h2(`File`), j2 = (e3) => !!(e3 && e3.uri !== void 0), M2 = (e3) => e3 && e3.getParts !== void 0, N2 = h2(`Blob`), P2 = h2(`FileList`), F2 = h2(`Set`), I2 = (e3) => T2(e3) && C2(e3.pipe);
  function L2() {
    return typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : typeof global < `u` ? global : {};
  }
  let R2 = L2(), z2 = R2.FormData === void 0 ? void 0 : R2.FormData, B2 = (e3) => {
    if (!e3) return false;
    if (z2 && e3 instanceof z2) return true;
    let t3 = i2(e3);
    if (!t3 || t3 === Object.prototype || !C2(e3.append)) return false;
    let n3 = m2(e3);
    return n3 === `formdata` || n3 === `object` && C2(e3.toString) && e3.toString() === `[object FormData]`;
  }, V2 = h2(`URLSearchParams`), [H2, U2, W2, G2] = [`ReadableStream`, `Request`, `Response`, `Headers`].map(h2), K2 = (e3) => e3.trim ? e3.trim() : e3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ``);
  function q2(e3, t3, { allOwnKeys: n3 = false } = {}) {
    if (e3 == null) return;
    let r3, i3;
    if (typeof e3 != `object` && (e3 = [e3]), _2(e3)) for (r3 = 0, i3 = e3.length; r3 < i3; r3++) t3.call(null, e3[r3], r3, e3);
    else {
      if (y2(e3)) return;
      let i4 = n3 ? Object.getOwnPropertyNames(e3) : Object.keys(e3), a3 = i4.length, o3;
      for (r3 = 0; r3 < a3; r3++) o3 = i4[r3], t3.call(null, e3[o3], o3, e3);
    }
  }
  function J2(e3, t3) {
    if (y2(e3)) return null;
    t3 = t3.toLowerCase();
    let n3 = Object.keys(e3), r3 = n3.length, i3;
    for (; r3-- > 0; ) if (i3 = n3[r3], t3 === i3.toLowerCase()) return i3;
    return null;
  }
  let Y2 = typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : global, X2 = (e3) => !v2(e3) && e3 !== Y2;
  function ee2(...e3) {
    let { caseless: t3, skipUndefined: n3 } = X2(this) && this || {}, r3 = {}, i3 = (e4, i4) => {
      if (i4 === `__proto__` || i4 === `constructor` || i4 === `prototype`) return;
      let a3 = t3 && typeof i4 == `string` && J2(r3, i4) || i4, o3 = s2(r3, a3) ? r3[a3] : void 0;
      D2(o3) && D2(e4) ? r3[a3] = ee2(o3, e4) : D2(e4) ? r3[a3] = ee2({}, e4) : _2(e4) ? r3[a3] = e4.slice() : (!n3 || !v2(e4)) && (r3[a3] = e4);
    };
    for (let t4 = 0, n4 = e3.length; t4 < n4; t4++) {
      let n5 = e3[t4];
      if (!n5 || y2(n5) || (q2(n5, i3), typeof n5 != `object` || _2(n5))) continue;
      let r4 = Object.getOwnPropertySymbols(n5);
      for (let e4 = 0; e4 < r4.length; e4++) {
        let t5 = r4[e4];
        fe2.call(n5, t5) && i3(n5[t5], t5);
      }
    }
    return r3;
  }
  let te2 = (e3, t3, r3, { allOwnKeys: i3 } = {}) => (q2(t3, (t4, i4) => {
    r3 && C2(t4) ? Object.defineProperty(e3, i4, { __proto__: null, value: n2(t4, r3), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(e3, i4, { __proto__: null, value: t4, writable: true, enumerable: true, configurable: true });
  }, { allOwnKeys: i3 }), e3), ne2 = (e3) => (e3.charCodeAt(0) === 65279 && (e3 = e3.slice(1)), e3), re2 = (e3, t3, n3, r3) => {
    e3.prototype = Object.create(t3.prototype, r3), Object.defineProperty(e3.prototype, "constructor", { __proto__: null, value: e3, writable: true, enumerable: false, configurable: true }), Object.defineProperty(e3, "super", { __proto__: null, value: t3.prototype }), n3 && Object.assign(e3.prototype, n3);
  }, ie2 = (e3, t3, n3, r3) => {
    let a3, o3, s3, c3 = {};
    if (t3 ||= {}, e3 == null) return t3;
    do {
      for (a3 = Object.getOwnPropertyNames(e3), o3 = a3.length; o3-- > 0; ) s3 = a3[o3], (!r3 || r3(s3, e3, t3)) && !c3[s3] && (t3[s3] = e3[s3], c3[s3] = true);
      e3 = n3 !== false && i2(e3);
    } while (e3 && (!n3 || n3(e3, t3)) && e3 !== Object.prototype);
    return t3;
  }, ae2 = (e3, t3, n3) => {
    e3 = String(e3), (n3 === void 0 || n3 > e3.length) && (n3 = e3.length), n3 -= t3.length;
    let r3 = e3.indexOf(t3, n3);
    return r3 !== -1 && r3 === n3;
  }, oe2 = (e3) => {
    if (!e3) return null;
    if (_2(e3)) return e3;
    let t3 = e3.length;
    if (!w2(t3)) return null;
    let n3 = Array(t3);
    for (; t3-- > 0; ) n3[t3] = e3[t3];
    return n3;
  }, se2 = /* @__PURE__ */ ((e3) => (t3) => e3 && t3 instanceof e3)(typeof Uint8Array < `u` && i2(Uint8Array)), ce2 = (e3, t3) => {
    let n3 = (e3 && e3[a2]).call(e3), r3;
    for (; (r3 = n3.next()) && !r3.done; ) {
      let n4 = r3.value;
      t3.call(e3, n4[0], n4[1]);
    }
  }, le2 = (e3, t3) => {
    let n3, r3 = [];
    for (; (n3 = e3.exec(t3)) !== null; ) r3.push(n3);
    return r3;
  }, ue2 = h2(`HTMLFormElement`), de2 = (e3) => e3.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e4, t3, n3) {
    return t3.toUpperCase() + n3;
  }), { propertyIsEnumerable: fe2 } = Object.prototype, pe2 = h2(`RegExp`), me2 = (e3, t3) => {
    let n3 = Object.getOwnPropertyDescriptors(e3), r3 = {};
    q2(n3, (n4, i3) => {
      let a3;
      (a3 = t3(n4, i3, e3)) !== false && (r3[i3] = a3 || n4);
    }), Object.defineProperties(e3, r3);
  }, he2 = (e3) => {
    me2(e3, (t3, n3) => {
      if (C2(e3) && [`arguments`, `caller`, `callee`].includes(n3)) return false;
      let r3 = e3[n3];
      if (C2(r3)) {
        if (t3.enumerable = false, `writable` in t3) {
          t3.writable = false;
          return;
        }
        t3.set ||= () => {
          throw Error(`Can not rewrite read-only method '` + n3 + `'`);
        };
      }
    });
  }, ge2 = (e3, t3) => {
    let n3 = {}, r3 = (e4) => {
      e4.forEach((e5) => {
        n3[e5] = true;
      });
    };
    return _2(e3) ? r3(e3) : r3(String(e3).split(t3)), n3;
  }, _e2 = () => {
  }, ve2 = (e3, t3) => e3 != null && Number.isFinite(e3 = +e3) ? e3 : t3;
  function ye2(e3) {
    return !!(e3 && C2(e3.append) && e3[o2] === `FormData` && e3[a2]);
  }
  let be2 = (e3) => {
    let t3 = /* @__PURE__ */ new WeakSet(), n3 = (e4) => {
      if (T2(e4)) {
        if (t3.has(e4)) return;
        if (y2(e4)) return e4;
        if (!(`toJSON` in e4)) {
          t3.add(e4);
          let r3;
          if (F2(e4)) {
            r3 = [];
            for (let t4 of e4) {
              let e5 = n3(t4);
              !v2(e5) && r3.push(e5);
            }
          } else r3 = _2(e4) ? [] : {}, q2(e4, (e5, t4) => {
            let i3 = n3(e5);
            !v2(i3) && (r3[t4] = i3);
          });
          return t3.delete(e4), r3;
        }
      }
      return e4;
    };
    return n3(e3);
  }, xe2 = h2(`AsyncFunction`), Se2 = (e3) => e3 && (T2(e3) || C2(e3)) && C2(e3.then) && C2(e3.catch), Ce2 = ((e3, t3) => e3 ? setImmediate : t3 ? ((e4, t4) => (Y2.addEventListener(`message`, ({ source: n3, data: r3 }) => {
    n3 === Y2 && r3 === e4 && t4.length && t4.shift()();
  }, false), (n3) => {
    t4.push(n3), Y2.postMessage(e4, `*`);
  }))(`axios@${Math.random()}`, []) : (e4) => setTimeout(e4))(typeof setImmediate == `function`, C2(Y2.postMessage)), we2 = typeof queueMicrotask < `u` ? queueMicrotask.bind(Y2) : typeof process < `u` && process.nextTick || Ce2, Z2 = (e3) => e3 != null && C2(e3[a2]);
  var Q2 = { isArray: _2, isArrayBuffer: b2, isBuffer: y2, isFormData: B2, isArrayBufferView: x2, isString: S2, isNumber: w2, isBoolean: E2, isObject: T2, isPlainObject: D2, isEmptyObject: O2, isReadableStream: H2, isRequest: U2, isResponse: W2, isHeaders: G2, isUndefined: v2, isDate: k2, isFile: A2, isReactNativeBlob: j2, isReactNative: M2, isBlob: N2, isRegExp: pe2, isFunction: C2, isStream: I2, isURLSearchParams: V2, isTypedArray: se2, isFileList: P2, forEach: q2, merge: ee2, extend: te2, trim: K2, stripBOM: ne2, inherits: re2, toFlatObject: ie2, kindOf: m2, kindOfTest: h2, endsWith: ae2, toArray: oe2, forEachEntry: ce2, matchAll: le2, isHTMLForm: ue2, hasOwnProperty: s2, hasOwnProp: s2, hasOwnInPrototypeChain: d2, getSafeProp: f2, toSafeFlatObject: p2, reduceDescriptors: me2, freezeMethods: he2, toObjectSet: ge2, toCamelCase: de2, noop: _e2, toFiniteNumber: ve2, findKey: J2, global: Y2, isContextDefined: X2, isSpecCompliantForm: ye2, toJSONObject: be2, isAsyncFn: xe2, isThenable: Se2, setImmediate: Ce2, asap: we2, isIterable: Z2, isSafeIterable: (e3) => e3 != null && d2(e3, a2) && Z2(e3) };
  let Te2 = Q2.toObjectSet([`age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `user-agent`]);
  var Ee2 = (e3) => {
    let t3 = {}, n3, r3, i3;
    return e3 && e3.split(`
`).forEach(function(e4) {
      i3 = e4.indexOf(`:`), n3 = e4.substring(0, i3).trim().toLowerCase(), r3 = e4.substring(i3 + 1).trim();
      let a3 = Q2.hasOwnProp(t3, n3);
      !n3 || a3 && Q2.hasOwnProp(Te2, n3) || (n3 === `set-cookie` ? a3 ? t3[n3].push(r3) : t3[n3] = [r3] : t3[n3] = a3 ? t3[n3] + `, ` + r3 : r3);
    }), t3;
  };
  function De2(e3) {
    let t3 = 0, n3 = e3.length;
    for (; t3 < n3; ) {
      let n4 = e3.charCodeAt(t3);
      if (n4 !== 9 && n4 !== 32) break;
      t3 += 1;
    }
    for (; n3 > t3; ) {
      let t4 = e3.charCodeAt(n3 - 1);
      if (t4 !== 9 && t4 !== 32) break;
      --n3;
    }
    return t3 === 0 && n3 === e3.length ? e3 : e3.slice(t3, n3);
  }
  let Oe2 = RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`, `g`), ke2 = RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`, `g`);
  function Ae2(e3, t3) {
    return Q2.isArray(e3) ? e3.map((e4) => Ae2(e4, t3)) : De2(String(e3).replace(t3, ``));
  }
  let je2 = (e3) => Ae2(e3, Oe2), Me2 = (e3) => Ae2(e3, ke2);
  function Ne2(e3) {
    let t3 = /* @__PURE__ */ Object.create(null);
    return Q2.forEach(e3.toJSON(), (e4, n3) => {
      t3[n3] = Me2(e4);
    }), t3;
  }
  let Pe2 = Symbol(`internals`);
  function Fe2(e3) {
    return e3 && String(e3).trim().toLowerCase();
  }
  function Ie2(e3) {
    return e3 === false || e3 == null ? e3 : Q2.isArray(e3) ? e3.map(Ie2) : je2(String(e3));
  }
  function Le2(e3) {
    let t3 = /* @__PURE__ */ Object.create(null), n3 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r3;
    for (; r3 = n3.exec(e3); ) t3[r3[1]] = r3[2];
    return t3;
  }
  let Re2 = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  function ze2(e3) {
    let t3 = 0, n3 = e3.length;
    for (; t3 < n3; ) {
      let n4 = e3.charCodeAt(t3);
      if (n4 !== 9 && n4 !== 32) break;
      t3 += 1;
    }
    for (; n3 > t3; ) {
      let t4 = e3.charCodeAt(n3 - 1);
      if (t4 !== 9 && t4 !== 32) break;
      --n3;
    }
    return t3 === 0 && n3 === e3.length ? e3 : e3.slice(t3, n3);
  }
  function Be2(e3) {
    let t3 = e3.length - 1;
    if (t3 < 1 || e3.charCodeAt(0) !== 34 || e3.charCodeAt(t3) !== 34) return e3;
    let n3 = ``;
    for (let r3 = 1; r3 < t3; r3++) {
      let i3 = e3.charCodeAt(r3);
      if (i3 === 34 || i3 === 92 && (r3 += 1, r3 >= t3)) return e3;
      n3 += e3[r3];
    }
    return n3;
  }
  function Ve2(e3) {
    let t3 = /* @__PURE__ */ Object.create(null), n3 = String(e3), r3 = 0, i3 = false, a3 = false;
    function o3(e4) {
      let i4 = ze2(n3.slice(r3, e4)), a4 = i4.indexOf(`=`);
      if (a4 < 1) return;
      let o4 = ze2(i4.slice(0, a4));
      if (!Re2.test(o4)) return;
      let s3 = o4.toLowerCase();
      if (s3 === `__proto__` || s3 === `constructor` || s3 === `prototype`) return;
      let c3 = ze2(i4.slice(a4 + 1));
      t3[s3] = Be2(c3);
    }
    for (let e4 = 0; e4 < n3.length; e4++) {
      let t4 = n3.charCodeAt(e4);
      i3 ? a3 ? a3 = false : t4 === 92 ? a3 = true : t4 === 34 && (i3 = false) : t4 === 34 ? i3 = true : (t4 === 44 || t4 === 59) && (o3(e4), r3 = e4 + 1);
    }
    return o3(n3.length), t3;
  }
  let He2 = (e3) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e3.trim());
  function Ue2(e3, t3, n3, r3, i3) {
    if (Q2.isFunction(r3)) return r3.call(this, t3, n3);
    if (i3 && (t3 = n3), Q2.isString(t3)) {
      if (Q2.isString(r3)) return t3.indexOf(r3) !== -1;
      if (Q2.isRegExp(r3)) return r3.test(t3);
    }
  }
  function We2(e3) {
    return e3.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e4, t3, n3) => t3.toUpperCase() + n3);
  }
  function Ge2(e3, t3) {
    let n3 = Q2.toCamelCase(` ` + t3);
    [`get`, `set`, `has`].forEach((r3) => {
      Object.defineProperty(e3, r3 + n3, { __proto__: null, value: function(e4, n4, i3) {
        return this[r3].call(this, t3, e4, n4, i3);
      }, configurable: true });
    });
  }
  var Ke2 = class {
    constructor(e3) {
      e3 && this.set(e3);
    }
    set(e3, t3, n3) {
      let r3 = this;
      function i3(e4, t4, n4) {
        let i4 = Fe2(t4);
        if (!i4) return;
        let a4 = Q2.findKey(r3, i4);
        (!a4 || r3[a4] === void 0 || n4 === true || n4 === void 0 && r3[a4] !== false) && (r3[a4 || t4] = Ie2(e4));
      }
      let a3 = (e4, t4) => Q2.forEach(e4, (e5, n4) => i3(e5, n4, t4));
      if (Q2.isPlainObject(e3) || e3 instanceof this.constructor) a3(e3, t3);
      else if (Q2.isString(e3) && (e3 = e3.trim()) && !He2(e3)) a3(Ee2(e3), t3);
      else if (Q2.isObject(e3) && Q2.isSafeIterable(e3)) {
        let n4 = /* @__PURE__ */ Object.create(null), r4, i4;
        for (let t4 of e3) {
          if (!Q2.isArray(t4)) throw TypeError(`Object iterator must return a key-value pair`);
          i4 = t4[0], Q2.hasOwnProp(n4, i4) ? (r4 = n4[i4], n4[i4] = Q2.isArray(r4) ? [...r4, t4[1]] : [r4, t4[1]]) : n4[i4] = t4[1];
        }
        a3(n4, t3);
      } else e3 != null && i3(t3, e3, n3);
      return this;
    }
    get(e3, t3) {
      if (e3 = Fe2(e3), e3) {
        let n3 = Q2.findKey(this, e3);
        if (n3) {
          let e4 = this[n3];
          if (!t3) return e4;
          if (t3 === true) return Le2(e4);
          if (Q2.isFunction(t3)) return t3.call(this, e4, n3);
          if (Q2.isRegExp(t3)) return t3.exec(e4);
          throw TypeError(`parser must be boolean|regexp|function`);
        }
      }
    }
    has(e3, t3) {
      if (e3 = Fe2(e3), e3) {
        let n3 = Q2.findKey(this, e3);
        return !!(n3 && this[n3] !== void 0 && (!t3 || Ue2(this, this[n3], n3, t3)));
      }
      return false;
    }
    delete(e3, t3) {
      let n3 = this, r3 = false;
      function i3(e4) {
        if (e4 = Fe2(e4), e4) {
          let i4 = Q2.findKey(n3, e4);
          i4 && (!t3 || Ue2(n3, n3[i4], i4, t3)) && (delete n3[i4], r3 = true);
        }
      }
      return Q2.isArray(e3) ? e3.forEach(i3) : i3(e3), r3;
    }
    clear(e3) {
      let t3 = Object.keys(this), n3 = t3.length, r3 = false;
      for (; n3--; ) {
        let i3 = t3[n3];
        (!e3 || Ue2(this, this[i3], i3, e3, true)) && (delete this[i3], r3 = true);
      }
      return r3;
    }
    normalize(e3) {
      let t3 = this, n3 = {};
      return Q2.forEach(this, (r3, i3) => {
        let a3 = Q2.findKey(n3, i3);
        if (a3) {
          t3[a3] = Ie2(r3), delete t3[i3];
          return;
        }
        let o3 = e3 ? We2(i3) : String(i3).trim();
        o3 !== i3 && delete t3[i3], t3[o3] = Ie2(r3), n3[o3] = true;
      }), this;
    }
    concat(...e3) {
      return this.constructor.concat(this, ...e3);
    }
    toJSON(e3) {
      let t3 = /* @__PURE__ */ Object.create(null);
      return Q2.forEach(this, (n3, r3) => {
        n3 != null && n3 !== false && (t3[r3] = e3 && Q2.isArray(n3) ? n3.join(`, `) : n3);
      }), t3;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([e3, t3]) => e3 + `: ` + t3).join(`
`);
    }
    getSetCookie() {
      let e3 = this.get(`set-cookie`);
      return Q2.isArray(e3) ? e3 : e3 == null || e3 === false ? [] : [e3];
    }
    get [Symbol.toStringTag]() {
      return `AxiosHeaders`;
    }
    static from(e3) {
      return e3 instanceof this ? e3 : new this(e3);
    }
    static parseParameters(e3) {
      return Ve2(e3);
    }
    static concat(e3, ...t3) {
      let n3 = new this(e3);
      return t3.forEach((e4) => n3.set(e4)), n3;
    }
    static accessor(e3) {
      let t3 = (this[Pe2] = this[Pe2] = { accessors: {} }).accessors, n3 = this.prototype;
      function r3(e4) {
        let r4 = Fe2(e4);
        t3[r4] || (Ge2(n3, e4), t3[r4] = true);
      }
      return Q2.isArray(e3) ? e3.forEach(r3) : r3(e3), this;
    }
  };
  Ke2.accessor([`Content-Type`, `Content-Length`, `Accept`, `Accept-Encoding`, `User-Agent`, `Authorization`]), Q2.reduceDescriptors(Ke2.prototype, ({ value: e3 }, t3) => {
    let n3 = t3[0].toUpperCase() + t3.slice(1);
    return { get: () => e3, set(e4) {
      this[n3] = e4;
    } };
  }), Q2.freezeMethods(Ke2);
  let qe2 = `[REDACTED ****]`;
  function Je2(e3) {
    if (Q2.hasOwnProp(e3, `toJSON`)) return true;
    let t3 = Object.getPrototypeOf(e3);
    for (; t3 && t3 !== Object.prototype; ) {
      if (Q2.hasOwnProp(t3, `toJSON`)) return true;
      t3 = Object.getPrototypeOf(t3);
    }
    return false;
  }
  function Ye2(e3, t3) {
    let n3 = new Set(t3.map((e4) => String(e4).toLowerCase())), r3 = [], i3 = (e4) => {
      if (typeof e4 != `object` || !e4 || Q2.isBuffer(e4)) return e4;
      if (r3.indexOf(e4) !== -1) return;
      e4 instanceof Ke2 && (e4 = e4.toJSON()), r3.push(e4);
      let t4;
      if (Q2.isArray(e4)) t4 = [], e4.forEach((e5, n4) => {
        let r4 = i3(e5);
        Q2.isUndefined(r4) || (t4[n4] = r4);
      });
      else {
        if (!Q2.isPlainObject(e4) && Je2(e4)) return r3.pop(), e4;
        t4 = /* @__PURE__ */ Object.create(null);
        for (let [r4, a3] of Object.entries(e4)) {
          let e5 = n3.has(r4.toLowerCase()) ? qe2 : i3(a3);
          Q2.isUndefined(e5) || (t4[r4] = e5);
        }
      }
      return r3.pop(), t4;
    };
    return i3(e3);
  }
  function Xe2(e3) {
    try {
      return String(e3);
    } catch {
      return ``;
    }
  }
  function Ze2(e3) {
    return e3.errors.map((e4) => {
      try {
        return e4 && e4.message ? Xe2(e4.message) : Xe2(e4);
      } catch {
        return ``;
      }
    }).filter(Boolean).join(`; `) || e3.name || `AggregateError`;
  }
  var $2 = class e3 extends Error {
    static from(t3, n3, r3, i3, a3, o3) {
      let s3 = t3.message;
      !s3 && Q2.isArray(t3.errors) && t3.errors.length && (s3 = Ze2(t3));
      let c3 = new e3(s3, n3 || t3.code, r3, i3, a3);
      return Object.defineProperty(c3, "cause", { __proto__: null, value: t3, writable: true, enumerable: false, configurable: true }), c3.name = t3.name, t3.status != null && c3.status == null && (c3.status = t3.status), o3 && Object.assign(c3, o3), c3;
    }
    constructor(e4, t3, n3, r3, i3) {
      super(e4), Object.defineProperty(this, "message", { __proto__: null, value: e4, enumerable: true, writable: true, configurable: true }), this.name = `AxiosError`, this.isAxiosError = true, t3 && (this.code = t3), n3 && (this.config = n3), r3 && (this.request = r3), i3 && (this.response = i3, this.status = i3.status);
    }
    toJSON() {
      let e4 = this.config, t3 = e4 && Q2.hasOwnProp(e4, `redact`) ? e4.redact : void 0, n3 = Q2.isArray(t3) && t3.length > 0 ? Ye2(e4, t3) : Q2.toJSONObject(e4);
      return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: n3, code: this.code, status: this.status };
    }
  };
  $2.ERR_BAD_OPTION_VALUE = `ERR_BAD_OPTION_VALUE`, $2.ERR_BAD_OPTION = `ERR_BAD_OPTION`, $2.ECONNABORTED = `ECONNABORTED`, $2.ETIMEDOUT = `ETIMEDOUT`, $2.ECONNREFUSED = `ECONNREFUSED`, $2.ERR_NETWORK = `ERR_NETWORK`, $2.ERR_FR_TOO_MANY_REDIRECTS = `ERR_FR_TOO_MANY_REDIRECTS`, $2.ERR_DEPRECATED = `ERR_DEPRECATED`, $2.ERR_BAD_RESPONSE = `ERR_BAD_RESPONSE`, $2.ERR_BAD_REQUEST = `ERR_BAD_REQUEST`, $2.ERR_CANCELED = `ERR_CANCELED`, $2.ERR_NOT_SUPPORT = `ERR_NOT_SUPPORT`, $2.ERR_INVALID_URL = `ERR_INVALID_URL`, $2.ERR_FORM_DATA_DEPTH_EXCEEDED = `ERR_FORM_DATA_DEPTH_EXCEEDED`;
  var Qe2 = null;
  function $e2(e3) {
    return Q2.isPlainObject(e3) || Q2.isArray(e3);
  }
  function et2(e3) {
    return Q2.endsWith(e3, `[]`) ? e3.slice(0, -2) : e3;
  }
  function tt2(e3, t3, n3) {
    return e3 ? e3.concat(t3).map(function(e4, t4) {
      return e4 = et2(e4), !n3 && t4 ? `[` + e4 + `]` : e4;
    }).join(n3 ? `.` : ``) : t3;
  }
  function nt2(e3) {
    return Q2.isArray(e3) && !e3.some($e2);
  }
  let rt2 = Q2.toFlatObject(Q2, {}, null, function(e3) {
    return /^is[A-Z]/.test(e3);
  });
  function it2(e3, t3, n3) {
    if (!Q2.isObject(e3)) throw TypeError(`target must be an object`);
    t3 ||= new FormData();
    let r3 = (e4, t4) => {
      let r4 = Q2.getSafeProp(n3, e4);
      return Q2.isUndefined(r4) ? t4 : r4;
    }, i3 = r3(`metaTokens`, true), a3 = r3(`visitor`) || h3, o3 = r3(`dots`, false), s3 = r3(`indexes`, false), c3 = r3(`Blob`) || typeof Blob < `u` && Blob, l3 = r3(`maxDepth`, 100), u3 = c3 && Q2.isSpecCompliantForm(t3), d3 = [];
    if (!Q2.isFunction(a3)) throw TypeError(`visitor must be a function`);
    function f3(e4) {
      if (e4 === null) return ``;
      if (Q2.isDate(e4)) return e4.toISOString();
      if (Q2.isBoolean(e4)) return e4.toString();
      if (!u3 && Q2.isBlob(e4)) throw new $2(`Blob is not supported. Use a Buffer instead.`);
      if (Q2.isArrayBuffer(e4) || Q2.isTypedArray(e4)) {
        if (u3 && typeof c3 == `function`) return new c3([e4]);
        throw new $2(`Blob is not supported. Use a Buffer instead.`, $2.ERR_NOT_SUPPORT);
      }
      return e4;
    }
    function p3(e4) {
      if (e4 > l3) throw new $2(`Object is too deeply nested (` + e4 + ` levels). Max depth: ` + l3, $2.ERR_FORM_DATA_DEPTH_EXCEEDED);
    }
    function m3(e4, t4) {
      if (l3 === 1 / 0) return JSON.stringify(e4);
      let n4 = [];
      return JSON.stringify(e4, function(e5, r4) {
        if (!Q2.isObject(r4)) return r4;
        for (; n4.length && n4[n4.length - 1] !== this; ) n4.pop();
        return n4.push(r4), p3(t4 + n4.length - 1), r4;
      });
    }
    function h3(e4, n4, r4) {
      let a4 = e4;
      if (Q2.isReactNative(t3) && Q2.isReactNativeBlob(e4)) return t3.append(tt2(r4, n4, o3), f3(e4)), false;
      if (e4 && !r4 && typeof e4 == `object`) {
        if (Q2.endsWith(n4, `{}`)) n4 = i3 ? n4 : n4.slice(0, -2), e4 = m3(e4, 1);
        else if (Q2.isArray(e4) && nt2(e4) || (Q2.isFileList(e4) || Q2.endsWith(n4, `[]`)) && (a4 = Q2.toArray(e4))) return n4 = et2(n4), a4.forEach(function(e5, r5) {
          !(Q2.isUndefined(e5) || e5 === null) && t3.append(s3 === true ? tt2([n4], r5, o3) : s3 === null ? n4 : n4 + `[]`, f3(e5));
        }), false;
      }
      return $e2(e4) ? true : (t3.append(tt2(r4, n4, o3), f3(e4)), false);
    }
    let g3 = Object.assign(rt2, { defaultVisitor: h3, convertValue: f3, isVisitable: $e2 });
    function _3(e4, n4, r4 = 0) {
      if (!Q2.isUndefined(e4)) {
        if (p3(r4), d3.indexOf(e4) !== -1) throw Error(`Circular reference detected in ` + n4.join(`.`));
        d3.push(e4), Q2.forEach(e4, function(e5, i4) {
          (!(Q2.isUndefined(e5) || e5 === null) && a3.call(t3, e5, Q2.isString(i4) ? i4.trim() : i4, n4, g3)) === true && _3(e5, n4 ? n4.concat(i4) : [i4], r4 + 1);
        }), d3.pop();
      }
    }
    if (!Q2.isObject(e3)) throw TypeError(`data must be an object`);
    return _3(e3), t3;
  }
  function at2(e3) {
    let t3 = { "!": `%21`, "'": `%27`, "(": `%28`, ")": `%29`, "~": `%7E`, "%20": `+` };
    return encodeURIComponent(e3).replace(/[!'()~]|%20/g, function(e4) {
      return t3[e4];
    });
  }
  function ot2(e3, t3) {
    this._pairs = [], e3 && it2(e3, this, t3);
  }
  let st2 = ot2.prototype;
  st2.append = function(e3, t3) {
    this._pairs.push([e3, t3]);
  }, st2.toString = function(e3) {
    let t3 = e3 ? (t4) => e3.call(this, t4, at2) : at2;
    return this._pairs.map(function(e4) {
      return t3(e4[0]) + `=` + t3(e4[1]);
    }, ``).join(`&`);
  };
  function ct2(e3) {
    return encodeURIComponent(e3).replace(/%3A/gi, `:`).replace(/%24/g, `$`).replace(/%2C/gi, `,`).replace(/%20/g, `+`);
  }
  function lt2(e3, t3, n3) {
    if (!t3) return e3;
    e3 ||= ``;
    let r3 = Q2.isFunction(n3) ? { serialize: n3 } : n3, i3 = Q2.getSafeProp(r3, `encode`) || ct2, a3 = Q2.getSafeProp(r3, `serialize`), o3;
    if (o3 = a3 ? a3(t3, r3) : Q2.isURLSearchParams(t3) ? t3.toString() : new ot2(t3, r3).toString(i3), o3) {
      let t4 = e3.indexOf(`#`);
      t4 !== -1 && (e3 = e3.slice(0, t4)), e3 += (e3.indexOf(`?`) === -1 ? `?` : `&`) + o3;
    }
    return e3;
  }
  let ut2 = Symbol(`internals`);
  function dt2(e3) {
    return e3 ? e3.length : 0;
  }
  function ft2(e3) {
    if (e3) for (; e3.length && e3[e3.length - 1] === null; ) e3.pop();
  }
  function pt2(e3, t3) {
    let n3 = e3.handlers, r3 = dt2(n3);
    n3 === t3.handlersRef ? r3 !== t3.handlersLength && (r3 ? t3.handlerEntries.forEach(function(e4, r4) {
      n3[e4.index] !== e4.handler && t3.handlerEntries.delete(r4);
    }) : t3.handlerEntries.clear()) : (t3.handlersRef = n3, t3.handlerEntries.clear()), t3.handlersLength = r3;
  }
  var mt2 = class {
    constructor() {
      this.handlers = [], this[ut2] = { handlersRef: this.handlers, handlersLength: this.handlers.length, handlerEntries: /* @__PURE__ */ new Map(), iterationDepth: 0, nextId: 0 };
    }
    use(e3, t3, n3) {
      let r3 = { fulfilled: e3, rejected: t3, synchronous: n3 ? n3.synchronous : false, runWhen: n3 ? n3.runWhen : null }, i3 = this[ut2];
      this.handlers ??= [], pt2(this, i3);
      let a3 = i3.nextId++;
      return this.handlers.push(r3), i3.handlerEntries.set(a3, { handler: r3, index: this.handlers.length - 1 }), i3.handlersLength = this.handlers.length, a3;
    }
    eject(e3) {
      let t3 = this[ut2];
      pt2(this, t3);
      let n3 = t3.handlerEntries.get(e3);
      if (n3) {
        if (t3.handlerEntries.delete(e3), this.handlers[n3.index] !== n3.handler) return;
        this.handlers[n3.index] = null, t3.iterationDepth || (ft2(this.handlers), t3.handlersLength = this.handlers.length);
      }
    }
    clear() {
      this.handlers && (this.handlers = [], pt2(this, this[ut2]));
    }
    forEach(e3) {
      let t3 = this[ut2];
      pt2(this, t3), t3.iterationDepth++;
      try {
        Q2.forEach(this.handlers, function(t4) {
          t4 !== null && e3(t4);
        });
      } finally {
        --t3.iterationDepth || (pt2(this, t3), ft2(this.handlers), t3.handlersLength = dt2(this.handlers));
      }
    }
  }, ht2 = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false, validateStatusUndefinedResolves: true }, gt2 = { isBrowser: true, classes: { URLSearchParams: typeof URLSearchParams < `u` ? URLSearchParams : ot2, FormData: typeof FormData < `u` ? FormData : null, Blob: typeof Blob < `u` ? Blob : null }, protocols: [`http`, `https`, `file`, `blob`, `url`, `data`] };
  let _t2 = typeof window < `u` && typeof document < `u`, vt2 = typeof navigator == `object` && navigator || void 0, yt2 = _t2 && (!vt2 || [`ReactNative`, `NativeScript`, `NS`].indexOf(vt2.product) < 0), bt2 = typeof WorkerGlobalScope < `u` && self instanceof WorkerGlobalScope && typeof self.importScripts == `function`, xt2 = _t2 && window.location.href || `http://localhost`;
  var St2 = { ...Object.freeze({ __proto__: null, hasBrowserEnv: _t2, hasStandardBrowserEnv: yt2, hasStandardBrowserWebWorkerEnv: bt2, navigator: vt2, origin: xt2 }), ...gt2 };
  function Ct2(e3, t3) {
    return it2(e3, new St2.classes.URLSearchParams(), { visitor: function(e4, t4, n3, r3) {
      return St2.isNode && Q2.isBuffer(e4) ? (this.append(t4, e4.toString(`base64`)), false) : r3.defaultVisitor.apply(this, arguments);
    }, ...t3 });
  }
  function wt2(e3) {
    if (e3 > 100) throw new $2(`FormData field is too deeply nested (` + e3 + ` levels). Max depth: 100`, $2.ERR_FORM_DATA_DEPTH_EXCEEDED);
  }
  function Tt2(e3) {
    let t3 = [], n3 = /[^.[\]]+|\[([^.[\]]*)]/g, r3;
    for (; (r3 = n3.exec(e3)) !== null; ) wt2(t3.length), t3.push(r3[0] === `[]` ? `` : r3[1] || r3[0]);
    return t3;
  }
  function Et2(e3) {
    let t3 = {}, n3 = Object.keys(e3), r3, i3 = n3.length, a3;
    for (r3 = 0; r3 < i3; r3++) a3 = n3[r3], t3[a3] = e3[a3];
    return t3;
  }
  function Dt2(e3) {
    function t3(e4, n3, r3, i3) {
      wt2(i3);
      let a3 = e4[i3++];
      if (a3 === `__proto__`) return true;
      let o3 = Number.isFinite(+a3), s3 = i3 >= e4.length;
      return a3 = !a3 && Q2.isArray(r3) ? r3.length : a3, s3 ? (Q2.hasOwnProp(r3, a3) ? r3[a3] = Q2.isArray(r3[a3]) ? r3[a3].concat(n3) : [r3[a3], n3] : r3[a3] = n3, !o3) : ((!Q2.hasOwnProp(r3, a3) || !Q2.isObject(r3[a3])) && (r3[a3] = []), t3(e4, n3, r3[a3], i3) && Q2.isArray(r3[a3]) && (r3[a3] = Et2(r3[a3])), !o3);
    }
    if (Q2.isFormData(e3) && Q2.isFunction(e3.entries)) {
      let n3 = {};
      return Q2.forEachEntry(e3, (e4, r3) => {
        t3(Tt2(e4), r3, n3, 0);
      }), n3;
    }
    return null;
  }
  let Ot2 = Object.freeze([`get`, `delete`, `head`, `options`, `post`, `put`, `patch`, `purge`, `link`, `unlink`, `query`]), kt2 = (e3, t3) => e3 != null && Q2.hasOwnProp(e3, t3) ? e3[t3] : void 0;
  function At2(e3, t3, n3) {
    if (Q2.isString(e3)) try {
      return (t3 || JSON.parse)(e3), Q2.trim(e3);
    } catch (e4) {
      if (e4.name !== `SyntaxError`) throw e4;
    }
    return (n3 || JSON.stringify)(e3);
  }
  let jt2 = { transitional: ht2, adapter: [`xhr`, `http`, `fetch`], transformRequest: [function(e3, t3) {
    let n3 = t3.getContentType() || ``, r3 = n3.indexOf(`application/json`) > -1, i3 = Q2.isObject(e3);
    if (i3 && Q2.isHTMLForm(e3) && (e3 = new FormData(e3)), Q2.isFormData(e3)) return r3 ? JSON.stringify(Dt2(e3)) : e3;
    if (Q2.isArrayBuffer(e3) || Q2.isBuffer(e3) || Q2.isStream(e3) || Q2.isFile(e3) || Q2.isBlob(e3) || Q2.isReadableStream(e3)) return e3;
    if (Q2.isArrayBufferView(e3)) return e3.buffer;
    if (Q2.isURLSearchParams(e3)) return t3.setContentType(`application/x-www-form-urlencoded;charset=utf-8`, false), e3.toString();
    let a3;
    if (i3) {
      let t4 = kt2(this, `formSerializer`);
      if (n3.indexOf(`application/x-www-form-urlencoded`) > -1) return Ct2(e3, t4).toString();
      if ((a3 = Q2.isFileList(e3)) || n3.indexOf(`multipart/form-data`) > -1) {
        let n4 = kt2(this, `env`), r4 = n4 && n4.FormData;
        return it2(a3 ? { "files[]": e3 } : e3, r4 && new r4(), t4);
      }
    }
    return i3 || r3 ? (t3.setContentType(`application/json`, false), At2(e3)) : e3;
  }], transformResponse: [function(e3) {
    let t3 = kt2(this, `transitional`) || jt2.transitional, n3 = t3 && t3.forcedJSONParsing, r3 = kt2(this, `responseType`), i3 = r3 === `json`;
    if (Q2.isResponse(e3) || Q2.isReadableStream(e3)) return e3;
    if (e3 && Q2.isString(e3) && (n3 && !r3 || i3)) {
      let n4 = !(t3 && t3.silentJSONParsing) && i3;
      try {
        return JSON.parse(e3, kt2(this, `parseReviver`));
      } catch (e4) {
        if (n4) throw e4.name === `SyntaxError` ? $2.from(e4, $2.ERR_BAD_RESPONSE, this, null, kt2(this, `response`)) : e4;
      }
    }
    return e3;
  }], timeout: 0, xsrfCookieName: `XSRF-TOKEN`, xsrfHeaderName: `X-XSRF-TOKEN`, maxContentLength: -1, maxBodyLength: -1, env: { FormData: St2.classes.FormData, Blob: St2.classes.Blob }, validateStatus: function(e3) {
    return e3 >= 200 && e3 < 300;
  }, headers: { common: { Accept: `application/json, text/plain, */*`, "Content-Type": void 0 } } };
  Q2.forEach(Ot2, (e3) => {
    jt2.headers[e3] = {};
  });
  function Mt2(e3, t3) {
    let n3 = this || jt2, r3 = t3 || n3, i3 = Ke2.from(r3.headers), a3 = r3.data;
    return Q2.forEach(e3, function(e4) {
      a3 = e4.call(n3, a3, i3.normalize(), t3 ? t3.status : void 0);
    }), i3.normalize(), a3;
  }
  function Nt2(e3) {
    return !!(e3 && e3.__CANCEL__);
  }
  var Pt2 = class extends $2 {
    constructor(e3, t3, n3) {
      super(e3 ?? `canceled`, $2.ERR_CANCELED, t3, n3), this.name = `CanceledError`, this.__CANCEL__ = true;
    }
  };
  function Ft2(e3, t3, n3) {
    let r3 = n3.config.validateStatus;
    !n3.status || !r3 || r3(n3.status) ? e3(n3) : t3(new $2(`Request failed with status code ` + n3.status, n3.status >= 400 && n3.status < 500 ? $2.ERR_BAD_REQUEST : $2.ERR_BAD_RESPONSE, n3.config, n3.request, n3));
  }
  let It2 = /[\t\n\r]/g;
  function Lt2(e3) {
    if (typeof e3 != `string`) return e3;
    let t3 = 0;
    for (; t3 < e3.length && e3.charCodeAt(t3) <= 32; ) t3++;
    return e3.slice(t3).replace(It2, ``);
  }
  function Rt2(e3) {
    let t3 = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e3);
    return t3 && t3[1] || ``;
  }
  function zt2(e3, t3) {
    e3 ||= 10;
    let n3 = Array(e3), r3 = Array(e3), i3 = 0, a3 = 0, o3;
    return t3 = t3 === void 0 ? 1e3 : t3, function(s3) {
      let c3 = Date.now(), l3 = r3[a3];
      o3 ||= c3, n3[i3] = s3, r3[i3] = c3;
      let u3 = a3, d3 = 0;
      for (; u3 !== i3; ) d3 += n3[u3++], u3 %= e3;
      if (i3 = (i3 + 1) % e3, i3 === a3 && (a3 = (a3 + 1) % e3), c3 - o3 < t3) return;
      let f3 = l3 && c3 - l3;
      return f3 ? Math.round(d3 * 1e3 / f3) : void 0;
    };
  }
  function Bt2(e3, t3) {
    let n3 = 0, r3 = 1e3 / t3, i3, a3, o3 = (t4, r4 = Date.now()) => {
      n3 = r4, i3 = null, a3 &&= (clearTimeout(a3), null), e3(...t4);
    };
    return [(...e4) => {
      let t4 = Date.now(), s3 = t4 - n3;
      s3 >= r3 ? o3(e4, t4) : (i3 = e4, a3 ||= setTimeout(() => {
        a3 = null, o3(i3);
      }, r3 - s3));
    }, () => i3 && o3(i3), (...e4) => o3(e4)];
  }
  let Vt2 = (e3, t3, n3 = 3) => {
    let r3 = 0, i3 = zt2(50, 250);
    return Bt2((n4) => {
      if (!n4 || !Q2.isNumber(n4.loaded)) return;
      let a3 = n4.loaded, o3 = n4.lengthComputable ? n4.total : void 0, s3 = Math.max(0, o3 == null ? a3 : Math.min(a3, o3)), c3 = Math.max(0, s3 - r3), l3 = i3(c3);
      r3 = Math.max(r3, s3), e3({ loaded: s3, total: o3, progress: o3 ? s3 / o3 : void 0, bytes: c3, rate: l3 || void 0, estimated: l3 && o3 ? (o3 - s3) / l3 : void 0, event: n4, lengthComputable: o3 != null, [t3 ? `download` : `upload`]: true });
    }, n3);
  }, Ht2 = (e3, t3) => {
    let n3 = e3 != null;
    return [(r3) => t3[0]({ lengthComputable: n3, total: e3, loaded: r3 }), t3[1]];
  }, Ut2 = (e3, t3 = Q2.asap) => (...n3) => t3(() => e3(...n3));
  var Wt2 = St2.hasStandardBrowserEnv ? /* @__PURE__ */ ((e3, t3) => (n3) => (n3 = new URL(n3, St2.origin), e3.protocol === n3.protocol && e3.host === n3.host && (t3 || e3.port === n3.port)))(new URL(St2.origin), St2.navigator && /(msie|trident)/i.test(St2.navigator.userAgent)) : () => true, Gt2 = St2.hasStandardBrowserEnv ? { write(e3, t3, n3, r3, i3, a3, o3) {
    if (typeof document > `u`) return;
    let s3 = [`${e3}=${encodeURIComponent(t3)}`];
    Q2.isNumber(n3) && s3.push(`expires=${new Date(n3).toUTCString()}`), Q2.isString(r3) && s3.push(`path=${r3}`), Q2.isString(i3) && s3.push(`domain=${i3}`), a3 === true && s3.push(`secure`), Q2.isString(o3) && s3.push(`SameSite=${o3}`), document.cookie = s3.join(`; `);
  }, read(e3) {
    if (typeof document > `u`) return null;
    let t3 = document.cookie.split(`;`);
    for (let n3 = 0; n3 < t3.length; n3++) {
      let r3 = t3[n3].replace(/^\s+/, ``), i3 = r3.indexOf(`=`);
      if (i3 !== -1 && r3.slice(0, i3) === e3) try {
        return decodeURIComponent(r3.slice(i3 + 1));
      } catch {
        return r3.slice(i3 + 1);
      }
    }
    return null;
  }, remove(e3) {
    this.write(e3, ``, Date.now() - 864e5, `/`);
  } } : { write() {
  }, read() {
    return null;
  }, remove() {
  } };
  function Kt2(e3) {
    return typeof e3 == `string` && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e3);
  }
  function qt2(e3, t3) {
    if (!t3) return e3;
    let n3 = e3.length;
    for (; n3 > 0 && e3.charCodeAt(n3 - 1) === 47; ) n3--;
    return e3.slice(0, n3) + `/` + t3.replace(/^\/+/, ``);
  }
  let Jt2 = /^https?:(?!\/\/)/i;
  function Yt2(e3) {
    return e3 && e3.replace(/(^|&)([^=&]*=)?[^&]+/g, (e4, t3, n3 = ``) => `${t3}${n3}${qe2}`);
  }
  function Xt2(e3) {
    let t3 = e3.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${qe2}@`), n3 = t3.indexOf(`#`), r3 = (n3 === -1 ? t3 : t3.slice(0, n3)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${qe2}`);
    return n3 === -1 ? r3 : `${r3}#${Yt2(t3.slice(n3 + 1))}`;
  }
  function Zt2(e3, t3) {
    if (typeof e3 == `string`) {
      let n3 = Lt2(e3);
      if (Jt2.test(n3)) throw new $2(`Invalid URL ${JSON.stringify(Xt2(n3))}: missing "//" after protocol`, $2.ERR_INVALID_URL, t3);
    }
  }
  function Qt2(e3, t3, n3, r3) {
    Zt2(t3, r3);
    let i3 = !Kt2(t3);
    return e3 && (i3 || n3 === false) ? (Zt2(e3, r3), qt2(e3, t3)) : t3;
  }
  let $t2 = (e3) => e3 instanceof Ke2 ? { ...e3 } : e3, en2 = (e3) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e3).concat(Object.getOwnPropertySymbols(e3).filter((t3) => Object.getOwnPropertyDescriptor(e3, t3).enumerable)) : Object.keys(e3);
  function tn2(e3, t3) {
    e3 ||= {}, t3 ||= {};
    let n3 = /* @__PURE__ */ Object.create(null);
    Object.defineProperty(n3, "hasOwnProperty", { __proto__: null, value: Object.prototype.hasOwnProperty, enumerable: false, writable: true, configurable: true });
    function r3(e4, t4, n4, r4) {
      return Q2.isPlainObject(e4) && Q2.isPlainObject(t4) ? Q2.merge.call({ caseless: r4 }, e4, t4) : Q2.isPlainObject(t4) ? Q2.merge({}, t4) : Q2.isArray(t4) ? t4.slice() : t4;
    }
    function i3(e4, t4, n4, i4) {
      if (!Q2.isUndefined(t4)) return r3(e4, t4, n4, i4);
      if (!Q2.isUndefined(e4)) return r3(void 0, e4, n4, i4);
    }
    function a3(e4, t4) {
      if (!Q2.isUndefined(t4)) return r3(void 0, t4);
    }
    function o3(e4, t4) {
      if (!Q2.isUndefined(t4)) return r3(void 0, t4);
      if (!Q2.isUndefined(e4)) return r3(void 0, e4);
    }
    function s3(n4) {
      let r4 = Q2.hasOwnProp(t3, `transitional`) ? t3.transitional : void 0;
      if (!Q2.isUndefined(r4)) {
        if (Q2.isPlainObject(r4)) {
          if (Q2.hasOwnProp(r4, n4)) return r4[n4];
        } else return;
      }
      let i4 = Q2.hasOwnProp(e3, `transitional`) ? e3.transitional : void 0;
      if (Q2.isPlainObject(i4) && Q2.hasOwnProp(i4, n4)) return i4[n4];
    }
    function c3(n4, i4, a4) {
      if (Q2.hasOwnProp(t3, a4)) return r3(n4, i4);
      if (Q2.hasOwnProp(e3, a4)) return r3(void 0, n4);
    }
    let l3 = { url: a3, method: a3, data: a3, baseURL: o3, transformRequest: o3, transformResponse: o3, paramsSerializer: o3, timeout: o3, timeoutErrorMessage: o3, withCredentials: o3, withXSRFToken: o3, adapter: o3, responseType: o3, xsrfCookieName: o3, xsrfHeaderName: o3, onUploadProgress: o3, onDownloadProgress: o3, decompress: o3, maxContentLength: o3, maxBodyLength: o3, beforeRedirect: o3, transport: o3, httpAgent: o3, httpsAgent: o3, cancelToken: o3, socketPath: o3, allowedSocketPaths: o3, responseEncoding: o3, validateStatus: c3, headers: (e4, t4, n4) => i3($t2(e4), $t2(t4), n4, true) };
    return Q2.forEach(en2({ ...e3, ...t3 }), function(r4) {
      if (r4 === `__proto__` || r4 === `constructor` || r4 === `prototype`) return;
      let a4 = Q2.hasOwnProp(l3, r4) ? l3[r4] : i3, o4 = a4(Q2.hasOwnProp(e3, r4) ? e3[r4] : void 0, Q2.hasOwnProp(t3, r4) ? t3[r4] : void 0, r4);
      Q2.isUndefined(o4) && a4 !== c3 || (n3[r4] = o4);
    }), Q2.hasOwnProp(t3, `validateStatus`) && Q2.isUndefined(t3.validateStatus) && s3(`validateStatusUndefinedResolves`) === false && (Q2.hasOwnProp(e3, `validateStatus`) ? n3.validateStatus = r3(void 0, e3.validateStatus) : delete n3.validateStatus), n3;
  }
  let nn2 = [`content-type`, `content-length`];
  function rn2(e3, t3, n3) {
    if (n3 !== `content-only`) {
      e3.set(t3);
      return;
    }
    Object.entries(t3 || {}).forEach(([t4, n4]) => {
      nn2.includes(t4.toLowerCase()) && e3.set(t4, n4);
    });
  }
  let an2 = (e3) => encodeURIComponent(e3).replace(/%([0-9A-F]{2})/gi, (e4, t3) => String.fromCharCode(parseInt(t3, 16)));
  function on2(e3) {
    let t3 = tn2({}, e3), n3 = (e4) => Q2.hasOwnProp(t3, e4) ? t3[e4] : void 0, r3 = n3(`data`), i3 = n3(`withXSRFToken`), a3 = n3(`xsrfHeaderName`), o3 = n3(`xsrfCookieName`), s3 = n3(`headers`), c3 = n3(`auth`), l3 = n3(`baseURL`), u3 = n3(`allowAbsoluteUrls`), d3 = n3(`url`);
    if (t3.headers = s3 = Ke2.from(s3), t3.url = lt2(Qt2(l3, d3, u3, t3), n3(`params`), n3(`paramsSerializer`)), c3) {
      let t4 = Q2.getSafeProp(c3, `username`) || ``, n4 = Q2.getSafeProp(c3, `password`) || ``;
      try {
        s3.set(`Authorization`, `Basic ` + btoa(t4 + `:` + (n4 ? an2(n4) : ``)));
      } catch (t5) {
        throw $2.from(t5, $2.ERR_BAD_OPTION_VALUE, e3);
      }
    }
    if (Q2.isFormData(r3)) {
      let e4 = Q2.getSafeProp(r3, `getHeaders`);
      St2.hasStandardBrowserEnv || St2.hasStandardBrowserWebWorkerEnv || Q2.isReactNative(r3) ? s3.setContentType(void 0) : Q2.isFunction(e4) && rn2(s3, e4.call(r3), n3(`formDataHeaderPolicy`));
    }
    if (St2.hasStandardBrowserEnv && (Q2.isFunction(i3) && (i3 = i3(t3)), i3 === true || i3 == null && Wt2(t3.url))) {
      let e4 = a3 && o3 && Gt2.read(o3);
      e4 && s3.set(a3, e4);
    }
    return t3;
  }
  var sn2 = typeof XMLHttpRequest < `u` && function(e3) {
    return new Promise(function(t3, n3) {
      let r3 = on2(e3), i3 = r3.data, a3 = Ke2.from(r3.headers).normalize(), { responseType: o3, onUploadProgress: s3, onDownloadProgress: c3 } = r3, l3, u3, d3, f3, p3, m3;
      function h3() {
        f3 && f3(), p3 && p3(), r3.cancelToken && r3.cancelToken.unsubscribe(l3), r3.signal && r3.signal.removeEventListener(`abort`, l3);
      }
      let g3 = new XMLHttpRequest();
      g3.open(r3.method.toUpperCase(), r3.url, true), g3.timeout = r3.timeout;
      function _3(i4) {
        if (!g3) return;
        if (g3.status === 0 && (Rt2(Lt2(r3.url)) || Rt2(St2.origin)) !== `file` && !(g3.responseURL && g3.responseURL.startsWith(`file:`))) {
          n3(new $2(`Request aborted`, $2.ECONNABORTED, e3, g3)), h3(), g3 = null;
          return;
        }
        try {
          i4 ? m3 && m3(i4) : p3 && p3();
        } catch (e4) {
          setTimeout(() => {
            throw e4;
          });
        }
        if (!g3) return;
        let a4 = Ke2.from(`getAllResponseHeaders` in g3 && g3.getAllResponseHeaders());
        Ft2(function(e4) {
          t3(e4), h3();
        }, function(e4) {
          n3(e4), h3();
        }, { data: !o3 || o3 === `text` || o3 === `json` ? g3.responseText : g3.response, status: g3.status, statusText: g3.statusText, headers: a4, config: e3, request: g3 }), g3 = null;
      }
      `onloadend` in g3 ? g3.onloadend = _3 : g3.onreadystatechange = function() {
        !g3 || g3.readyState !== 4 || g3.status === 0 && !(g3.responseURL && g3.responseURL.startsWith(`file:`)) || setTimeout(_3);
      }, g3.onabort = function() {
        g3 &&= (n3(new $2(`Request aborted`, $2.ECONNABORTED, e3, g3)), h3(), null);
      }, g3.onerror = function(t4) {
        let r4 = new $2(t4 && t4.message ? t4.message : `Network Error`, $2.ERR_NETWORK, e3, g3);
        r4.event = t4 || null, n3(r4), h3(), g3 = null;
      }, g3.ontimeout = function() {
        let t4 = r3.timeout ? `timeout of ` + r3.timeout + `ms exceeded` : `timeout exceeded`, i4 = r3.transitional || ht2;
        r3.timeoutErrorMessage && (t4 = r3.timeoutErrorMessage), n3(new $2(t4, i4.clarifyTimeoutError ? $2.ETIMEDOUT : $2.ECONNABORTED, e3, g3)), h3(), g3 = null;
      }, i3 === void 0 && a3.setContentType(null), `setRequestHeader` in g3 && Q2.forEach(Ne2(a3), function(e4, t4) {
        g3.setRequestHeader(t4, e4);
      }), Q2.isUndefined(r3.withCredentials) || (g3.withCredentials = !!r3.withCredentials), o3 && o3 !== `json` && (g3.responseType = r3.responseType), c3 && ([d3, p3, m3] = Vt2(c3, true), g3.addEventListener(`progress`, d3)), s3 && g3.upload && ([u3, f3] = Vt2(s3), g3.upload.addEventListener(`progress`, u3), g3.upload.addEventListener(`loadend`, f3)), (r3.cancelToken || r3.signal) && (l3 = (t4) => {
        g3 &&= (n3(!t4 || t4.type ? new Pt2(null, e3, g3) : t4), g3.abort(), h3(), null);
      }, r3.cancelToken && r3.cancelToken.subscribe(l3), r3.signal && (r3.signal.aborted ? l3() : r3.signal.addEventListener(`abort`, l3)));
      let v3 = Rt2(r3.url);
      if (v3 && !St2.protocols.includes(v3)) {
        n3(new $2(`Unsupported protocol ` + v3 + `:`, $2.ERR_BAD_REQUEST, e3)), h3();
        return;
      }
      g3.send(i3 || null);
    });
  };
  let cn2 = (e3, t3) => {
    if (e3 = e3 ? e3.filter(Boolean) : [], !t3 && !e3.length) return;
    let n3 = new AbortController(), r3 = false, i3 = function(e4) {
      if (!r3) {
        r3 = true, o3();
        let t4 = e4 instanceof Error ? e4 : this.reason;
        n3.abort(t4 instanceof $2 ? t4 : new Pt2(t4 instanceof Error ? t4.message : t4));
      }
    }, a3 = t3 && setTimeout(() => {
      a3 = null, i3(new $2(`timeout of ${t3}ms exceeded`, $2.ETIMEDOUT));
    }, t3), o3 = () => {
      e3 &&= (a3 && clearTimeout(a3), a3 = null, e3.forEach((e4) => {
        e4.unsubscribe ? e4.unsubscribe(i3) : e4.removeEventListener(`abort`, i3);
      }), null);
    };
    e3.forEach((e4) => {
      if (!r3) {
        if (e4.aborted) {
          i3.call(e4);
          return;
        }
        e4.addEventListener(`abort`, i3, { once: true });
      }
    });
    let { signal: s3 } = n3;
    return s3.unsubscribe = () => Q2.asap(o3), s3;
  }, ln2 = function* (e3, t3) {
    let n3 = e3.byteLength;
    if (n3 < t3) {
      yield e3;
      return;
    }
    let r3 = 0, i3;
    for (; r3 < n3; ) i3 = r3 + t3, yield e3.slice(r3, i3), r3 = i3;
  }, un2 = async function* (e3, t3) {
    for await (let n3 of dn2(e3)) yield* ln2(n3, t3);
  }, dn2 = async function* (e3) {
    if (e3[Symbol.asyncIterator]) {
      yield* e3;
      return;
    }
    let t3 = e3.getReader();
    try {
      for (; ; ) {
        let { done: e4, value: n3 } = await t3.read();
        if (e4) break;
        yield n3;
      }
    } finally {
      await t3.cancel();
    }
  }, fn2 = (e3, t3, n3, r3) => {
    let i3 = un2(e3, t3), a3 = 0, o3, s3 = (e4) => {
      o3 || (o3 = true, r3 && r3(e4));
    };
    return new ReadableStream({ async pull(e4) {
      try {
        let { done: t4, value: r4 } = await i3.next();
        if (t4) {
          s3(), e4.close();
          return;
        }
        let o4 = r4.byteLength;
        n3 && n3(a3 += o4), e4.enqueue(new Uint8Array(r4));
      } catch (e5) {
        throw s3(e5), e5;
      }
    }, cancel(e4) {
      return s3(e4), i3.return();
    } }, { highWaterMark: 2 });
  }, pn2 = (e3) => e3 >= 48 && e3 <= 57 || e3 >= 65 && e3 <= 70 || e3 >= 97 && e3 <= 102, mn2 = (e3, t3, n3) => t3 + 2 < n3 && pn2(e3.charCodeAt(t3 + 1)) && pn2(e3.charCodeAt(t3 + 2)), hn2 = (e3) => e3 <= 57 ? e3 - 48 : (e3 & 223) - 55, gn2 = (e3) => e3 >= 65 && e3 <= 90 || e3 >= 97 && e3 <= 122 || e3 >= 48 && e3 <= 57 || e3 === 43 || e3 === 47 || e3 === 45 || e3 === 95, _n2 = (e3) => e3 === 9 || e3 === 10 || e3 === 12 || e3 === 13 || e3 === 32, vn2 = (e3) => {
    let t3 = Math.floor(e3 / 4), n3 = e3 % 4;
    return t3 * 3 + (n3 === 2 ? 1 : n3 === 3 ? 2 : 0);
  }, yn2 = (e3) => {
    let t3 = e3.length, n3 = 0;
    return t3 > 0 && e3.charCodeAt(t3 - 1) === 61 && (n3++, t3 > 1 && e3.charCodeAt(t3 - 2) === 61 && n3++), Math.floor((t3 - n3) * 3 / 4);
  }, bn2 = (e3) => {
    let t3 = e3.length, n3 = 0, r3 = 0, i3 = false;
    for (let a3 = 0; a3 < t3; a3++) {
      let o3 = e3.charCodeAt(a3);
      if (o3 === 37 && mn2(e3, a3, t3) && (o3 = hn2(e3.charCodeAt(a3 + 1)) * 16 + hn2(e3.charCodeAt(a3 + 2)), a3 += 2), !_n2(o3)) {
        if (o3 === 61) {
          r3++;
          continue;
        }
        if (!gn2(o3) || r3 > 0) {
          i3 = true;
          continue;
        }
        n3++;
      }
    }
    return i3 || r3 > 2 || r3 > 0 && (n3 + r3) % 4 != 0 || n3 % 4 == 1 ? yn2(e3) : vn2(n3);
  }, xn2 = (e3, t3) => {
    if (!e3 || typeof e3 != `string` || !e3.startsWith(`data:`)) return 0;
    let n3 = e3.indexOf(`,`);
    if (n3 < 0) return 0;
    let r3 = e3.slice(5, n3), i3 = e3.slice(n3 + 1);
    if (/;base64/i.test(r3)) return t3(i3);
    let a3 = 0;
    for (let e4 = 0, t4 = i3.length; e4 < t4; e4++) {
      let n4 = i3.charCodeAt(e4);
      if (n4 === 37 && mn2(i3, e4, t4)) a3 += 1, e4 += 2;
      else if (n4 < 128) a3 += 1;
      else if (n4 < 2048) a3 += 2;
      else if (n4 >= 55296 && n4 <= 56319 && e4 + 1 < t4) {
        let t5 = i3.charCodeAt(e4 + 1);
        t5 >= 56320 && t5 <= 57343 ? (a3 += 4, e4++) : a3 += 3;
      } else a3 += 3;
    }
    return a3;
  };
  function Sn2(e3) {
    let t3 = typeof e3 == `string` ? e3.indexOf(`#`) : -1;
    return xn2(t3 === -1 ? e3 : e3.slice(0, t3), bn2);
  }
  let Cn2 = 65536, wn2 = { cache: `default`, redirect: `follow`, referrer: `about:client`, referrerPolicy: ``, mode: `cors`, integrity: ``, keepalive: false, priority: `auto`, window: null }, { isFunction: Tn2 } = Q2, En2 = (e3) => encodeURIComponent(e3).replace(/%([0-9A-F]{2})/gi, (e4, t3) => String.fromCharCode(parseInt(t3, 16))), Dn2 = (e3) => {
    if (!Q2.isString(e3)) return e3;
    try {
      return decodeURIComponent(e3);
    } catch {
      return e3;
    }
  }, On2 = (e3, ...t3) => {
    try {
      return !!e3(...t3);
    } catch {
      return false;
    }
  }, kn2 = (e3) => {
    let t3 = e3.indexOf(`://`), n3 = e3;
    return t3 !== -1 && (n3 = n3.slice(t3 + 3)), n3.includes(`@`) || n3.includes(`:`);
  }, An2 = (e3) => {
    let t3 = Q2.global !== void 0 && Q2.global !== null ? Q2.global : globalThis, { ReadableStream: n3, TextEncoder: r3 } = t3;
    e3 = Q2.merge.call({ skipUndefined: true }, { Request: t3.Request, Response: t3.Response }, e3);
    let { fetch: i3, Request: a3, Response: o3 } = e3, s3 = i3 ? Tn2(i3) : typeof fetch == `function`, c3 = Tn2(a3), l3 = Tn2(o3);
    if (!s3) return false;
    let u3 = s3 && Tn2(n3), d3 = s3 && (typeof r3 == `function` ? /* @__PURE__ */ ((e4) => (t4) => e4.encode(t4))(new r3()) : async (e4) => new Uint8Array(await new a3(e4).arrayBuffer())), f3 = c3 && u3 && On2(() => {
      let e4 = false, t4 = new a3(St2.origin, { body: new n3(), method: `POST`, get duplex() {
        return e4 = true, `half`;
      } }), r4 = t4.headers.has(`Content-Type`);
      return t4.body != null && t4.body.cancel(), e4 && !r4;
    }), p3 = l3 && u3 && On2(() => Q2.isReadableStream(new o3(``).body)), m3 = { stream: p3 && ((e4) => e4.body) };
    s3 && [`text`, `arrayBuffer`, `blob`, `formData`, `stream`].forEach((e4) => {
      !m3[e4] && (m3[e4] = (t4, n4) => {
        let r4 = t4 && t4[e4];
        if (r4) return r4.call(t4);
        throw new $2(`Response type '${e4}' is not supported`, $2.ERR_NOT_SUPPORT, n4);
      });
    });
    let h3 = async (e4) => {
      if (e4 == null) return 0;
      if (Q2.isBlob(e4)) return e4.size;
      if (Q2.isSpecCompliantForm(e4)) return (await new a3(St2.origin, { method: `POST`, body: e4 }).arrayBuffer()).byteLength;
      if (Q2.isArrayBufferView(e4) || Q2.isArrayBuffer(e4)) return e4.byteLength;
      if (Q2.isURLSearchParams(e4) && (e4 += ``), Q2.isString(e4)) return (await d3(e4)).byteLength;
    }, g3 = async (e4, t4) => Q2.toFiniteNumber(e4.getContentLength()) ?? h3(t4);
    return async (e4) => {
      let { url: t4, method: n4, data: s4, signal: l4, cancelToken: d4, timeout: _3, onDownloadProgress: v3, onUploadProgress: y3, responseType: b3, headers: x3, withCredentials: S3 = `same-origin`, fetchOptions: C3, maxContentLength: w3, maxBodyLength: T3, maxRedirects: E3 } = on2(e4), D3 = Q2.isNumber(w3) && w3 > -1, O3 = Q2.isNumber(T3) && T3 > -1, k3 = (t5) => Q2.hasOwnProp(e4, t5) ? e4[t5] : void 0, A3 = i3 || fetch;
      b3 = b3 ? (b3 + ``).toLowerCase() : `text`;
      let j3 = cn2([l4, d4 && d4.toAbortSignal()], _3), M3 = null, N3 = j3 && j3.unsubscribe && (() => {
        j3.unsubscribe();
      }), P3, F3 = null, I3 = () => new $2(`Request body larger than maxBodyLength limit`, $2.ERR_BAD_REQUEST, e4, M3);
      try {
        let i4, l5 = k3(`auth`);
        if (l5 && (i4 = { username: Q2.getSafeProp(l5, `username`) || ``, password: Q2.getSafeProp(l5, `password`) || `` }), kn2(t4)) {
          let e5 = new URL(t4, St2.origin);
          !i4 && (e5.username || e5.password) && (i4 = { username: Dn2(e5.username), password: Dn2(e5.password) }), (e5.username || e5.password) && (e5.username = ``, e5.password = ``, t4 = e5.href);
        }
        if (i4 && (x3.delete(`authorization`), x3.set(`Authorization`, `Basic ` + btoa(En2((i4.username || ``) + `:` + (i4.password || ``))))), D3 && typeof t4 == `string` && t4.startsWith(`data:`) && Sn2(t4) > w3) throw new $2(`maxContentLength size of ` + w3 + ` exceeded`, $2.ERR_BAD_RESPONSE, e4, M3);
        if (O3 && n4 !== `get` && n4 !== `head`) {
          let e5 = await h3(s4);
          if (typeof e5 == `number` && isFinite(e5) && (P3 = e5, e5 > T3)) throw I3();
        }
        let d5 = O3 && (Q2.isReadableStream(s4) || Q2.isStream(s4)), _4 = (e5, t5, n5) => fn2(e5, Cn2, (e6) => {
          if (O3 && e6 > T3) throw F3 = I3();
          t5 && t5(e6);
        }, n5);
        if (f3 && n4 !== `get` && n4 !== `head` && (y3 || d5)) {
          if (P3 ??= await g3(x3, s4), P3 !== 0 || d5) {
            let e5 = new a3(t4, { method: `POST`, body: s4, duplex: `half` }), n5;
            if (Q2.isFormData(s4) && (n5 = e5.headers.get(`content-type`)) && x3.setContentType(n5), e5.body) {
              let [t5, n6] = y3 && Ht2(P3, Vt2(Ut2(y3))) || [];
              s4 = _4(e5.body, t5, n6);
            }
          }
        } else if (d5 && !c3 && u3 && n4 !== `get` && n4 !== `head`) s4 = _4(s4);
        else if (d5 && c3 && !f3 && n4 !== `get` && n4 !== `head`) throw new $2(`Stream request bodies are not supported by the current fetch implementation`, $2.ERR_NOT_SUPPORT, e4, M3);
        Q2.isString(S3) || (S3 = S3 ? `include` : `omit`);
        let L3 = c3 && `credentials` in a3.prototype;
        if (Q2.isFormData(s4)) {
          let e5 = x3.getContentType();
          e5 && /^multipart\/form-data/i.test(e5) && !/boundary=/i.test(e5) && x3.delete(`content-type`);
        }
        x3.set(`User-Agent`, `axios/1.20.0`, false);
        let R3 = C3 == null ? C3 : Object.assign(/* @__PURE__ */ Object.create(null), C3);
        R3 && (delete R3.body, delete R3.headers, delete R3.method, delete R3.signal, delete R3.duplex, delete R3.credentials);
        let z3 = Object.assign(/* @__PURE__ */ Object.create(null), R3, { signal: j3, method: n4.toUpperCase(), headers: Ne2(x3.normalize()), body: s4, duplex: `half`, credentials: L3 ? S3 : void 0 });
        c3 && (Q2.forEach(wn2, (e5, t5) => {
          z3[t5] === void 0 && (z3[t5] = e5);
        }), z3.signal === void 0 && (z3.signal = null), z3.body === void 0 && (z3.body = null)), E3 === 0 && (z3.redirect = `manual`, R3 && (R3.redirect = `manual`)), M3 = c3 && new a3(t4, z3);
        let B3 = await (c3 ? A3(M3, R3) : A3(t4, z3)), V3 = Ke2.from(B3.headers);
        if (D3) {
          let t5 = Q2.toFiniteNumber(V3.getContentLength());
          if (t5 != null && t5 > w3) throw new $2(`maxContentLength size of ` + w3 + ` exceeded`, $2.ERR_BAD_RESPONSE, e4, M3);
        }
        let H3 = p3 && (b3 === `stream` || b3 === `response`);
        if (p3 && B3.body && (v3 || D3 || H3 && N3)) {
          let t5 = {};
          [`status`, `statusText`, `headers`].forEach((e5) => {
            t5[e5] = B3[e5];
          });
          let n5 = Q2.toFiniteNumber(V3.getContentLength()), [r4, i5] = v3 && Ht2(n5, Vt2(Ut2(v3), true)) || [], a4 = 0;
          B3 = new o3(fn2(B3.body, Cn2, (t6) => {
            if (D3 && (a4 = t6, a4 > w3)) throw new $2(`maxContentLength size of ` + w3 + ` exceeded`, $2.ERR_BAD_RESPONSE, e4, M3);
            r4 && r4(t6);
          }, () => {
            i5 && i5(), N3 && N3();
          }), t5);
        }
        b3 ||= `text`;
        let U3 = await m3[Q2.findKey(m3, b3) || `text`](B3, e4);
        if (D3 && !p3 && !H3) {
          let t5;
          if (U3 != null && (typeof U3.byteLength == `number` ? t5 = U3.byteLength : typeof U3.size == `number` ? t5 = U3.size : typeof U3 == `string` && (t5 = typeof r3 == `function` ? new r3().encode(U3).byteLength : U3.length)), typeof t5 == `number` && t5 > w3) throw new $2(`maxContentLength size of ` + w3 + ` exceeded`, $2.ERR_BAD_RESPONSE, e4, M3);
        }
        return !H3 && N3 && N3(), await new Promise((t5, n5) => {
          Ft2(t5, n5, { data: U3, headers: Ke2.from(B3.headers), status: B3.status, statusText: B3.statusText, config: e4, request: M3 });
        });
      } catch (t5) {
        if (N3 && N3(), j3 && j3.aborted && j3.reason instanceof $2) {
          let n5 = j3.reason;
          throw n5.config = e4, M3 && (n5.request = M3), t5 !== n5 && Object.defineProperty(n5, "cause", { __proto__: null, value: t5, writable: true, enumerable: false, configurable: true }), n5;
        }
        if (F3) throw M3 && !F3.request && (F3.request = M3), F3;
        if (t5 instanceof $2) throw M3 && !t5.request && (t5.request = M3), t5;
        if (t5 && t5.name === `TypeError` && /Load failed|fetch/i.test(t5.message)) {
          let n5 = new $2(`Network Error`, $2.ERR_NETWORK, e4, M3, t5 && t5.response);
          throw Object.defineProperty(n5, "cause", { __proto__: null, value: t5.cause || t5, writable: true, enumerable: false, configurable: true }), n5;
        }
        throw $2.from(t5, t5 && t5.code, e4, M3, t5 && t5.response);
      }
    };
  }, jn2 = /* @__PURE__ */ new Map(), Mn2 = (e3) => {
    let t3 = e3 && e3.env || {}, { fetch: n3, Request: r3, Response: i3 } = t3, a3 = [r3, i3, n3], o3 = a3.length, s3, c3, l3 = jn2;
    for (; o3--; ) s3 = a3[o3], c3 = l3.get(s3), c3 === void 0 && l3.set(s3, c3 = o3 ? /* @__PURE__ */ new Map() : An2(t3)), l3 = c3;
    return c3;
  };
  Mn2();
  let Nn2 = { http: Qe2, xhr: sn2, fetch: { get: Mn2 } };
  Q2.forEach(Nn2, (e3, t3) => {
    if (e3) {
      try {
        Object.defineProperty(e3, "name", { __proto__: null, value: t3 });
      } catch {
      }
      Object.defineProperty(e3, "adapterName", { __proto__: null, value: t3 });
    }
  });
  let Pn2 = (e3) => `- ${e3}`, Fn2 = (e3) => Q2.isFunction(e3) || e3 === null || e3 === false;
  function In2(e3, t3) {
    e3 = Q2.isArray(e3) ? e3 : [e3];
    let { length: n3 } = e3, r3, i3, a3 = {};
    for (let o3 = 0; o3 < n3; o3++) {
      r3 = e3[o3];
      let n4;
      if (i3 = r3, !Fn2(r3) && (i3 = Nn2[(n4 = String(r3)).toLowerCase()], i3 === void 0)) throw new $2(`Unknown adapter '${n4}'`);
      if (i3 && (Q2.isFunction(i3) || (i3 = i3.get(t3)))) break;
      a3[n4 || `#` + o3] = i3;
    }
    if (!i3) {
      let e4 = Object.entries(a3).map(([e5, t4]) => `adapter ${e5} ` + (t4 === false ? `is not supported by the environment` : `is not available in the build`));
      throw new $2(`There is no suitable adapter to dispatch the request ` + (n3 ? e4.length > 1 ? `since :
` + e4.map(Pn2).join(`
`) : ` ` + Pn2(e4[0]) : `as no adapter specified`), $2.ERR_NOT_SUPPORT);
    }
    return i3;
  }
  var Ln2 = { getAdapter: In2, adapters: Nn2 };
  function Rn2(e3) {
    if (e3.cancelToken && e3.cancelToken.throwIfRequested(), e3.signal && e3.signal.aborted) throw new Pt2(null, e3);
  }
  function zn2(e3) {
    let t3 = Q2.toSafeFlatObject(e3);
    return Rn2(t3), t3.headers = Ke2.from(Q2.getSafeProp(t3, `headers`)), t3.data = Mt2.call(t3, t3.transformRequest), [`post`, `put`, `patch`].indexOf(t3.method) !== -1 && t3.headers.setContentType(`application/x-www-form-urlencoded`, false), Ln2.getAdapter(t3.adapter || jt2.adapter, t3)(t3).then(function(e4) {
      Rn2(t3), t3.response = e4;
      try {
        e4.data = Mt2.call(t3, t3.transformResponse, e4);
      } finally {
        delete t3.response;
      }
      return e4.headers = Ke2.from(e4.headers), e4;
    }, function(e4) {
      if (!Nt2(e4) && (Rn2(t3), e4 && e4.response)) {
        t3.response = e4.response;
        try {
          e4.response.data = Mt2.call(t3, t3.transformResponse, e4.response);
        } finally {
          delete t3.response;
        }
        e4.response.headers = Ke2.from(e4.response.headers);
      }
      return Promise.reject(e4);
    });
  }
  let Bn2 = {};
  [`object`, `boolean`, `number`, `function`, `string`, `symbol`].forEach((e3, t3) => {
    Bn2[e3] = function(n3) {
      return typeof n3 === e3 || `a` + (t3 < 1 ? `n ` : ` `) + e3;
    };
  });
  let Vn2 = {};
  Bn2.transitional = function(e3, t3, n3) {
    function r3(e4, t4) {
      return `[Axios v1.20.0] Transitional option '` + e4 + `'` + t4 + (n3 ? `. ` + n3 : ``);
    }
    return (n4, i3, a3) => {
      if (e3 === false) throw new $2(r3(i3, ` has been removed` + (t3 ? ` in ` + t3 : ``)), $2.ERR_DEPRECATED);
      return t3 && !Vn2[i3] && (Vn2[i3] = true, console.warn(r3(i3, ` has been deprecated since v` + t3 + ` and will be removed in the near future`))), !e3 || e3(n4, i3, a3);
    };
  }, Bn2.spelling = function(e3) {
    return (t3, n3) => (console.warn(`${n3} is likely a misspelling of ${e3}`), true);
  };
  function Hn2(e3, t3, n3) {
    if (typeof e3 != `object` || !e3) throw new $2(`options must be an object`, $2.ERR_BAD_OPTION_VALUE);
    let r3 = Object.keys(e3), i3 = r3.length;
    for (; i3-- > 0; ) {
      let a3 = r3[i3], o3 = Object.prototype.hasOwnProperty.call(t3, a3) ? t3[a3] : void 0;
      if (o3) {
        let t4 = e3[a3], n4 = t4 === void 0 || o3(t4, a3, e3);
        if (n4 !== true) throw new $2(`option ` + a3 + ` must be ` + n4, $2.ERR_BAD_OPTION_VALUE);
        continue;
      }
      if (n3 !== true) throw new $2(`Unknown option ` + a3, $2.ERR_BAD_OPTION);
    }
  }
  var Un2 = { assertOptions: Hn2, validators: Bn2 };
  let Wn2 = Un2.validators;
  var Gn2 = class {
    constructor(e3) {
      this.defaults = e3 || {}, this.interceptors = { request: new mt2(), response: new mt2() };
    }
    async request(e3, t3) {
      try {
        return await this._request(e3, t3);
      } catch (e4) {
        if (e4 instanceof Error) try {
          let t4 = {};
          Error.captureStackTrace ? Error.captureStackTrace(t4) : t4 = Error();
          let n3 = t4.stack, r3 = ``;
          if (typeof n3 == `string`) {
            let e5 = n3.indexOf(`
`);
            r3 = e5 === -1 ? `` : n3.slice(e5 + 1);
          }
          if (!e4.stack) e4.stack = r3;
          else if (r3) {
            let t5 = r3.indexOf(`
`), n4 = t5 === -1 ? -1 : r3.indexOf(`
`, t5 + 1), i3 = n4 === -1 ? `` : r3.slice(n4 + 1);
            String(e4.stack).endsWith(i3) || (e4.stack += `
` + r3);
          }
        } catch {
        }
        throw e4;
      }
    }
    _request(e3, t3) {
      typeof e3 == `string` ? (t3 ||= {}, t3.url = e3) : t3 = e3 || {}, t3 = tn2(this.defaults, t3);
      let { transitional: n3, paramsSerializer: r3, headers: i3 } = t3;
      n3 !== void 0 && Un2.assertOptions(n3, { silentJSONParsing: Wn2.transitional(Wn2.boolean), forcedJSONParsing: Wn2.transitional(Wn2.boolean), clarifyTimeoutError: Wn2.transitional(Wn2.boolean), legacyInterceptorReqResOrdering: Wn2.transitional(Wn2.boolean), advertiseZstdAcceptEncoding: Wn2.transitional(Wn2.boolean), validateStatusUndefinedResolves: Wn2.transitional(Wn2.boolean) }, false), r3 != null && (Q2.isFunction(r3) ? t3.paramsSerializer = { serialize: r3 } : Un2.assertOptions(r3, { encode: Wn2.function, serialize: Wn2.function }, true)), t3.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t3.allowAbsoluteUrls = true : t3.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Un2.assertOptions(t3, { baseUrl: Wn2.spelling(`baseURL`), withXsrfToken: Wn2.spelling(`withXSRFToken`) }, true), t3.method = (Q2.getSafeProp(t3, `method`) || Q2.getSafeProp(this.defaults, `method`) || `get`).toLowerCase();
      let a3 = i3 && Q2.merge(i3.common, i3[t3.method]);
      i3 && Q2.forEach(Ot2.concat(`common`), (e4) => {
        delete i3[e4];
      }), t3.headers = Ke2.concat(a3, i3);
      let o3 = [], s3 = true;
      this.interceptors.request.forEach(function(e4) {
        if (typeof e4.runWhen == `function` && e4.runWhen(t3) === false) return;
        s3 &&= e4.synchronous;
        let n4 = t3.transitional || ht2;
        n4 && n4.legacyInterceptorReqResOrdering ? o3.unshift(e4.fulfilled, e4.rejected) : o3.push(e4.fulfilled, e4.rejected);
      });
      let c3 = [];
      this.interceptors.response.forEach(function(e4) {
        c3.push(e4.fulfilled, e4.rejected);
      });
      let l3, u3 = 0, d3;
      if (!s3) {
        let e4 = [zn2.bind(this), void 0];
        for (e4.unshift(...o3), e4.push(...c3), d3 = e4.length, l3 = Promise.resolve(t3); u3 < d3; ) l3 = l3.then(e4[u3++], e4[u3++]);
        return l3;
      }
      d3 = o3.length;
      let f3 = t3;
      for (; u3 < d3; ) {
        let e4 = o3[u3++], t4 = o3[u3++];
        try {
          f3 = e4 ? e4(f3) : f3;
        } catch (e5) {
          if (!t4) {
            l3 = Promise.reject(e5);
            break;
          }
          try {
            let n4 = t4.call(this, e5);
            Q2.isThenable(n4) && (l3 = Promise.resolve(n4).then(() => zn2.call(this, f3)));
          } catch (e6) {
            l3 = Promise.reject(e6);
          }
          break;
        }
      }
      if (!l3) try {
        l3 = zn2.call(this, f3);
      } catch (e4) {
        l3 = Promise.reject(e4);
      }
      for (u3 = 0, d3 = c3.length; u3 < d3; ) l3 = l3.then(c3[u3++], c3[u3++]);
      return l3;
    }
    getUri(e3) {
      return e3 = tn2(this.defaults, e3), lt2(Qt2(e3.baseURL, e3.url, e3.allowAbsoluteUrls, e3), e3.params, e3.paramsSerializer);
    }
  };
  Q2.forEach([`delete`, `get`, `head`, `options`], function(e3) {
    Gn2.prototype[e3] = function(t3, n3) {
      return this.request(tn2(n3 || {}, { method: e3, url: t3, data: n3 && Q2.hasOwnProp(n3, `data`) ? n3.data : void 0 }));
    };
  }), Q2.forEach([`post`, `put`, `patch`, `query`], function(e3) {
    function t3(t4) {
      return function(n3, r3, i3) {
        return this.request(tn2(i3 || {}, { method: e3, headers: t4 ? { "Content-Type": `multipart/form-data` } : {}, url: n3, data: r3 }));
      };
    }
    Gn2.prototype[e3] = t3(), e3 !== `query` && (Gn2.prototype[e3 + `Form`] = t3(true));
  });
  var Kn2 = class e3 {
    constructor(e4) {
      if (typeof e4 != `function`) throw TypeError(`executor must be a function.`);
      let t3;
      this.promise = new Promise(function(e5) {
        t3 = e5;
      });
      let n3 = this;
      this.promise.then((e5) => {
        if (!n3._listeners) return;
        let t4 = n3._listeners.length;
        for (; t4-- > 0; ) n3._listeners[t4](e5);
        n3._listeners = null;
      }), this.promise.then = (e5) => {
        let t4, r3 = new Promise((e6) => {
          n3.subscribe(e6), t4 = e6;
        }).then(e5);
        return r3.cancel = function() {
          n3.unsubscribe(t4);
        }, r3;
      }, e4(function(e5, r3, i3) {
        n3.reason || (n3.reason = new Pt2(e5, r3, i3), t3(n3.reason));
      });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(e4) {
      if (this.reason) {
        e4(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(e4) : this._listeners = [e4];
    }
    unsubscribe(e4) {
      if (!this._listeners) return;
      let t3 = this._listeners.indexOf(e4);
      t3 !== -1 && this._listeners.splice(t3, 1);
    }
    toAbortSignal() {
      let e4 = new AbortController(), t3 = (t4) => {
        e4.abort(t4);
      };
      return this.subscribe(t3), e4.signal.unsubscribe = () => this.unsubscribe(t3), e4.signal;
    }
    static source() {
      let t3;
      return { token: new e3(function(e4) {
        t3 = e4;
      }), cancel: t3 };
    }
  };
  function qn(e3) {
    return function(t3) {
      return e3.apply(null, t3);
    };
  }
  function Jn(e3) {
    return Q2.isObject(e3) && e3.isAxiosError === true;
  }
  let Yn = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, ContentTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, UnprocessableContent: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerReturnsAnUnknownError: 520, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
  Object.entries(Yn).forEach(([e3, t3]) => {
    Yn[t3] === void 0 && (Yn[t3] = e3);
  });
  function Xn(e3) {
    let t3 = new Gn2(e3), r3 = n2(Gn2.prototype.request, t3);
    return Q2.extend(r3, Gn2.prototype, t3, { allOwnKeys: true }), Q2.extend(r3, t3, null, { allOwnKeys: true }), r3.create = function(t4) {
      return Xn(tn2(e3, t4));
    }, r3;
  }
  let Zn = Xn(jt2);
  Zn.Axios = Gn2, Zn.CanceledError = Pt2, Zn.CancelToken = Kn2, Zn.isCancel = Nt2, Zn.VERSION = `1.20.0`, Zn.toFormData = it2, Zn.AxiosError = $2, Zn.Cancel = Zn.CanceledError, Zn.all = function(e3) {
    return Promise.all(e3);
  }, Zn.spread = qn, Zn.isAxiosError = Jn, Zn.mergeConfig = tn2, Zn.AxiosHeaders = Ke2, Zn.formToJSON = (e3) => Dt2(Q2.isHTMLForm(e3) ? new FormData(e3) : e3), Zn.getAdapter = Ln2.getAdapter, Zn.HttpStatusCode = Yn, Zn.default = Zn, t2.exports = Zn;
})), vt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.getParsedType = e2.ZodParsedType = e2.objectUtil = e2.util = void 0;
  var t2;
  (function(e3) {
    e3.assertEqual = (e4) => {
    };
    function t3(e4) {
    }
    e3.assertIs = t3;
    function n3(e4) {
      throw Error();
    }
    e3.assertNever = n3, e3.arrayToEnum = (e4) => {
      let t4 = {};
      for (let n4 of e4) t4[n4] = n4;
      return t4;
    }, e3.getValidEnumValues = (t4) => {
      let n4 = e3.objectKeys(t4).filter((e4) => typeof t4[t4[e4]] != `number`), r3 = {};
      for (let e4 of n4) r3[e4] = t4[e4];
      return e3.objectValues(r3);
    }, e3.objectValues = (t4) => e3.objectKeys(t4).map(function(e4) {
      return t4[e4];
    }), e3.objectKeys = typeof Object.keys == `function` ? (e4) => Object.keys(e4) : (e4) => {
      let t4 = [];
      for (let n4 in e4) Object.prototype.hasOwnProperty.call(e4, n4) && t4.push(n4);
      return t4;
    }, e3.find = (e4, t4) => {
      for (let n4 of e4) if (t4(n4)) return n4;
    }, e3.isInteger = typeof Number.isInteger == `function` ? (e4) => Number.isInteger(e4) : (e4) => typeof e4 == `number` && Number.isFinite(e4) && Math.floor(e4) === e4;
    function r2(e4, t4 = ` | `) {
      return e4.map((e5) => typeof e5 == `string` ? `'${e5}'` : e5).join(t4);
    }
    e3.joinValues = r2, e3.jsonStringifyReplacer = (e4, t4) => typeof t4 == `bigint` ? t4.toString() : t4;
  })(t2 || (e2.util = t2 = {}));
  var n2;
  (function(e3) {
    e3.mergeShapes = (e4, t3) => ({ ...e4, ...t3 });
  })(n2 || (e2.objectUtil = n2 = {})), e2.ZodParsedType = t2.arrayToEnum([`string`, `nan`, `number`, `integer`, `float`, `boolean`, `date`, `bigint`, `symbol`, `function`, `undefined`, `null`, `array`, `object`, `unknown`, `promise`, `void`, `never`, `map`, `set`]), e2.getParsedType = (t3) => {
    switch (typeof t3) {
      case `undefined`:
        return e2.ZodParsedType.undefined;
      case `string`:
        return e2.ZodParsedType.string;
      case `number`:
        return Number.isNaN(t3) ? e2.ZodParsedType.nan : e2.ZodParsedType.number;
      case `boolean`:
        return e2.ZodParsedType.boolean;
      case `function`:
        return e2.ZodParsedType.function;
      case `bigint`:
        return e2.ZodParsedType.bigint;
      case `symbol`:
        return e2.ZodParsedType.symbol;
      case `object`:
        return Array.isArray(t3) ? e2.ZodParsedType.array : t3 === null ? e2.ZodParsedType.null : t3.then && typeof t3.then == `function` && t3.catch && typeof t3.catch == `function` ? e2.ZodParsedType.promise : typeof Map < `u` && t3 instanceof Map ? e2.ZodParsedType.map : typeof Set < `u` && t3 instanceof Set ? e2.ZodParsedType.set : typeof Date < `u` && t3 instanceof Date ? e2.ZodParsedType.date : e2.ZodParsedType.object;
      default:
        return e2.ZodParsedType.unknown;
    }
  };
})), yt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ZodError = e2.quotelessJson = e2.ZodIssueCode = void 0;
  let t2 = vt();
  e2.ZodIssueCode = t2.util.arrayToEnum([`invalid_type`, `invalid_literal`, `custom`, `invalid_union`, `invalid_union_discriminator`, `invalid_enum_value`, `unrecognized_keys`, `invalid_arguments`, `invalid_return_type`, `invalid_date`, `invalid_string`, `too_small`, `too_big`, `invalid_intersection_types`, `not_multiple_of`, `not_finite`]), e2.quotelessJson = (e3) => JSON.stringify(e3, null, 2).replace(/"([^"]+)":/g, `$1:`);
  var n2 = class e3 extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e4) {
      super(), this.issues = [], this.addIssue = (e5) => {
        this.issues = [...this.issues, e5];
      }, this.addIssues = (e5 = []) => {
        this.issues = [...this.issues, ...e5];
      };
      let t3 = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t3) : this.__proto__ = t3, this.name = `ZodError`, this.issues = e4;
    }
    format(e4) {
      let t3 = e4 || function(e5) {
        return e5.message;
      }, n3 = { _errors: [] }, r2 = (e5) => {
        for (let i2 of e5.issues) if (i2.code === `invalid_union`) i2.unionErrors.map(r2);
        else if (i2.code === `invalid_return_type`) r2(i2.returnTypeError);
        else if (i2.code === `invalid_arguments`) r2(i2.argumentsError);
        else if (i2.path.length === 0) n3._errors.push(t3(i2));
        else {
          let e6 = n3, r3 = 0;
          for (; r3 < i2.path.length; ) {
            let n4 = i2.path[r3];
            r3 === i2.path.length - 1 ? (e6[n4] = e6[n4] || { _errors: [] }, e6[n4]._errors.push(t3(i2))) : e6[n4] = e6[n4] || { _errors: [] }, e6 = e6[n4], r3++;
          }
        }
      };
      return r2(this), n3;
    }
    static assert(t3) {
      if (!(t3 instanceof e3)) throw Error(`Not a ZodError: ${t3}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, t2.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e4 = (e5) => e5.message) {
      let t3 = {}, n3 = [];
      for (let r2 of this.issues) if (r2.path.length > 0) {
        let n4 = r2.path[0];
        t3[n4] = t3[n4] || [], t3[n4].push(e4(r2));
      } else n3.push(e4(r2));
      return { formErrors: n3, fieldErrors: t3 };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  e2.ZodError = n2, n2.create = (e3) => new n2(e3);
})), bt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true });
  let t2 = yt(), n2 = vt();
  e2.default = (e3, r2) => {
    let i2;
    switch (e3.code) {
      case t2.ZodIssueCode.invalid_type:
        i2 = e3.received === n2.ZodParsedType.undefined ? `Required` : `Expected ${e3.expected}, received ${e3.received}`;
        break;
      case t2.ZodIssueCode.invalid_literal:
        i2 = `Invalid literal value, expected ${JSON.stringify(e3.expected, n2.util.jsonStringifyReplacer)}`;
        break;
      case t2.ZodIssueCode.unrecognized_keys:
        i2 = `Unrecognized key(s) in object: ${n2.util.joinValues(e3.keys, `, `)}`;
        break;
      case t2.ZodIssueCode.invalid_union:
        i2 = `Invalid input`;
        break;
      case t2.ZodIssueCode.invalid_union_discriminator:
        i2 = `Invalid discriminator value. Expected ${n2.util.joinValues(e3.options)}`;
        break;
      case t2.ZodIssueCode.invalid_enum_value:
        i2 = `Invalid enum value. Expected ${n2.util.joinValues(e3.options)}, received '${e3.received}'`;
        break;
      case t2.ZodIssueCode.invalid_arguments:
        i2 = `Invalid function arguments`;
        break;
      case t2.ZodIssueCode.invalid_return_type:
        i2 = `Invalid function return type`;
        break;
      case t2.ZodIssueCode.invalid_date:
        i2 = `Invalid date`;
        break;
      case t2.ZodIssueCode.invalid_string:
        typeof e3.validation == `object` ? `includes` in e3.validation ? (i2 = `Invalid input: must include "${e3.validation.includes}"`, typeof e3.validation.position == `number` && (i2 = `${i2} at one or more positions greater than or equal to ${e3.validation.position}`)) : `startsWith` in e3.validation ? i2 = `Invalid input: must start with "${e3.validation.startsWith}"` : `endsWith` in e3.validation ? i2 = `Invalid input: must end with "${e3.validation.endsWith}"` : n2.util.assertNever(e3.validation) : i2 = e3.validation === `regex` ? `Invalid` : `Invalid ${e3.validation}`;
        break;
      case t2.ZodIssueCode.too_small:
        i2 = e3.type === `array` ? `Array must contain ${e3.exact ? `exactly` : e3.inclusive ? `at least` : `more than`} ${e3.minimum} element(s)` : e3.type === `string` ? `String must contain ${e3.exact ? `exactly` : e3.inclusive ? `at least` : `over`} ${e3.minimum} character(s)` : e3.type === `number` || e3.type === `bigint` ? `Number must be ${e3.exact ? `exactly equal to ` : e3.inclusive ? `greater than or equal to ` : `greater than `}${e3.minimum}` : e3.type === `date` ? `Date must be ${e3.exact ? `exactly equal to ` : e3.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(e3.minimum))}` : `Invalid input`;
        break;
      case t2.ZodIssueCode.too_big:
        i2 = e3.type === `array` ? `Array must contain ${e3.exact ? `exactly` : e3.inclusive ? `at most` : `less than`} ${e3.maximum} element(s)` : e3.type === `string` ? `String must contain ${e3.exact ? `exactly` : e3.inclusive ? `at most` : `under`} ${e3.maximum} character(s)` : e3.type === `number` ? `Number must be ${e3.exact ? `exactly` : e3.inclusive ? `less than or equal to` : `less than`} ${e3.maximum}` : e3.type === `bigint` ? `BigInt must be ${e3.exact ? `exactly` : e3.inclusive ? `less than or equal to` : `less than`} ${e3.maximum}` : e3.type === `date` ? `Date must be ${e3.exact ? `exactly` : e3.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(e3.maximum))}` : `Invalid input`;
        break;
      case t2.ZodIssueCode.custom:
        i2 = `Invalid input`;
        break;
      case t2.ZodIssueCode.invalid_intersection_types:
        i2 = `Intersection results could not be merged`;
        break;
      case t2.ZodIssueCode.not_multiple_of:
        i2 = `Number must be a multiple of ${e3.multipleOf}`;
        break;
      case t2.ZodIssueCode.not_finite:
        i2 = `Number must be finite`;
        break;
      default:
        i2 = r2.defaultError, n2.util.assertNever(e3);
    }
    return { message: i2 };
  };
})), xt = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.defaultErrorMap = void 0, e2.setErrorMap = i2, e2.getErrorMap = a2;
  let n2 = t2(bt());
  e2.defaultErrorMap = n2.default;
  let r2 = n2.default;
  function i2(e3) {
    r2 = e3;
  }
  function a2() {
    return r2;
  }
})), St = i(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.isAsync = e2.isValid = e2.isDirty = e2.isAborted = e2.OK = e2.DIRTY = e2.INVALID = e2.ParseStatus = e2.EMPTY_PATH = e2.makeIssue = void 0, e2.addIssueToContext = i2;
  let n2 = xt(), r2 = t2(bt());
  e2.makeIssue = (e3) => {
    let { data: t3, path: n3, errorMaps: r3, issueData: i3 } = e3, a2 = [...n3, ...i3.path || []], o2 = { ...i3, path: a2 };
    if (i3.message !== void 0) return { ...i3, path: a2, message: i3.message };
    let s2 = ``, c2 = r3.filter((e4) => !!e4).slice().reverse();
    for (let e4 of c2) s2 = e4(o2, { data: t3, defaultError: s2 }).message;
    return { ...i3, path: a2, message: s2 };
  }, e2.EMPTY_PATH = [];
  function i2(t3, i3) {
    let a2 = (0, n2.getErrorMap)(), o2 = (0, e2.makeIssue)({ issueData: i3, data: t3.data, path: t3.path, errorMaps: [t3.common.contextualErrorMap, t3.schemaErrorMap, a2, a2 === r2.default ? void 0 : r2.default].filter((e3) => !!e3) });
    t3.common.issues.push(o2);
  }
  e2.ParseStatus = class t3 {
    constructor() {
      this.value = `valid`;
    }
    dirty() {
      this.value === `valid` && (this.value = `dirty`);
    }
    abort() {
      this.value !== `aborted` && (this.value = `aborted`);
    }
    static mergeArray(t4, n3) {
      let r3 = [];
      for (let i3 of n3) {
        if (i3.status === `aborted`) return e2.INVALID;
        i3.status === `dirty` && t4.dirty(), r3.push(i3.value);
      }
      return { status: t4.value, value: r3 };
    }
    static async mergeObjectAsync(e3, n3) {
      let r3 = [];
      for (let e4 of n3) {
        let t4 = await e4.key, n4 = await e4.value;
        r3.push({ key: t4, value: n4 });
      }
      return t3.mergeObjectSync(e3, r3);
    }
    static mergeObjectSync(t4, n3) {
      let r3 = {};
      for (let i3 of n3) {
        let { key: n4, value: a2 } = i3;
        if (n4.status === `aborted` || a2.status === `aborted`) return e2.INVALID;
        n4.status === `dirty` && t4.dirty(), a2.status === `dirty` && t4.dirty(), n4.value !== `__proto__` && (a2.value !== void 0 || i3.alwaysSet) && (r3[n4.value] = a2.value);
      }
      return { status: t4.value, value: r3 };
    }
  }, e2.INVALID = Object.freeze({ status: `aborted` }), e2.DIRTY = (e3) => ({ status: `dirty`, value: e3 }), e2.OK = (e3) => ({ status: `valid`, value: e3 }), e2.isAborted = (e3) => e3.status === `aborted`, e2.isDirty = (e3) => e3.status === `dirty`, e2.isValid = (e3) => e3.status === `valid`, e2.isAsync = (e3) => typeof Promise < `u` && e3 instanceof Promise;
})), Ct = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true });
})), wt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.errorUtil = void 0;
  var t2;
  (function(e3) {
    e3.errToObj = (e4) => typeof e4 == `string` ? { message: e4 } : e4 || {}, e3.toString = (e4) => typeof e4 == `string` ? e4 : e4?.message;
  })(t2 || (e2.errorUtil = t2 = {}));
})), Tt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.discriminatedUnion = e2.date = e2.boolean = e2.bigint = e2.array = e2.any = e2.coerce = e2.ZodFirstPartyTypeKind = e2.late = e2.ZodSchema = e2.Schema = e2.ZodReadonly = e2.ZodPipeline = e2.ZodBranded = e2.BRAND = e2.ZodNaN = e2.ZodCatch = e2.ZodDefault = e2.ZodNullable = e2.ZodOptional = e2.ZodTransformer = e2.ZodEffects = e2.ZodPromise = e2.ZodNativeEnum = e2.ZodEnum = e2.ZodLiteral = e2.ZodLazy = e2.ZodFunction = e2.ZodSet = e2.ZodMap = e2.ZodRecord = e2.ZodTuple = e2.ZodIntersection = e2.ZodDiscriminatedUnion = e2.ZodUnion = e2.ZodObject = e2.ZodArray = e2.ZodVoid = e2.ZodNever = e2.ZodUnknown = e2.ZodAny = e2.ZodNull = e2.ZodUndefined = e2.ZodSymbol = e2.ZodDate = e2.ZodBoolean = e2.ZodBigInt = e2.ZodNumber = e2.ZodString = e2.ZodType = void 0, e2.NEVER = e2.void = e2.unknown = e2.union = e2.undefined = e2.tuple = e2.transformer = e2.symbol = e2.string = e2.strictObject = e2.set = e2.record = e2.promise = e2.preprocess = e2.pipeline = e2.ostring = e2.optional = e2.onumber = e2.oboolean = e2.object = e2.number = e2.nullable = e2.null = e2.never = e2.nativeEnum = e2.nan = e2.map = e2.literal = e2.lazy = e2.intersection = e2.instanceof = e2.function = e2.enum = e2.effect = void 0, e2.datetimeRegex = k2, e2.custom = we2;
  let t2 = yt(), n2 = xt(), r2 = wt(), i2 = St(), a2 = vt();
  var o2 = class {
    constructor(e3, t3, n3, r3) {
      this._cachedPath = [], this.parent = e3, this.data = t3, this._path = n3, this._key = r3;
    }
    get path() {
      return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  };
  let s2 = (e3, n3) => {
    if ((0, i2.isValid)(n3)) return { success: true, data: n3.value };
    if (!e3.common.issues.length) throw Error(`Validation failed but no issues detected.`);
    return { success: false, get error() {
      if (this._error) return this._error;
      let n4 = new t2.ZodError(e3.common.issues);
      return this._error = n4, this._error;
    } };
  };
  function c2(e3) {
    if (!e3) return {};
    let { errorMap: t3, invalid_type_error: n3, required_error: r3, description: i3 } = e3;
    if (t3 && (n3 || r3)) throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return t3 ? { errorMap: t3, description: i3 } : { errorMap: (t4, i4) => {
      let { message: a3 } = e3;
      return t4.code === `invalid_enum_value` ? { message: a3 ?? i4.defaultError } : i4.data === void 0 ? { message: a3 ?? r3 ?? i4.defaultError } : t4.code === `invalid_type` ? { message: a3 ?? n3 ?? i4.defaultError } : { message: i4.defaultError };
    }, description: i3 };
  }
  var l2 = class {
    get description() {
      return this._def.description;
    }
    _getType(e3) {
      return (0, a2.getParsedType)(e3.data);
    }
    _getOrReturnCtx(e3, t3) {
      return t3 || { common: e3.parent.common, data: e3.data, parsedType: (0, a2.getParsedType)(e3.data), schemaErrorMap: this._def.errorMap, path: e3.path, parent: e3.parent };
    }
    _processInputParams(e3) {
      return { status: new i2.ParseStatus(), ctx: { common: e3.parent.common, data: e3.data, parsedType: (0, a2.getParsedType)(e3.data), schemaErrorMap: this._def.errorMap, path: e3.path, parent: e3.parent } };
    }
    _parseSync(e3) {
      let t3 = this._parse(e3);
      if ((0, i2.isAsync)(t3)) throw Error(`Synchronous parse encountered promise.`);
      return t3;
    }
    _parseAsync(e3) {
      let t3 = this._parse(e3);
      return Promise.resolve(t3);
    }
    parse(e3, t3) {
      let n3 = this.safeParse(e3, t3);
      if (n3.success) return n3.data;
      throw n3.error;
    }
    safeParse(e3, t3) {
      let n3 = { common: { issues: [], async: t3?.async ?? false, contextualErrorMap: t3?.errorMap }, path: t3?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e3, parsedType: (0, a2.getParsedType)(e3) }, r3 = this._parseSync({ data: e3, path: n3.path, parent: n3 });
      return s2(n3, r3);
    }
    "~validate"(e3) {
      let t3 = { common: { issues: [], async: !!this[`~standard`].async }, path: [], schemaErrorMap: this._def.errorMap, parent: null, data: e3, parsedType: (0, a2.getParsedType)(e3) };
      if (!this[`~standard`].async) try {
        let n3 = this._parseSync({ data: e3, path: [], parent: t3 });
        return (0, i2.isValid)(n3) ? { value: n3.value } : { issues: t3.common.issues };
      } catch (e4) {
        e4?.message?.toLowerCase()?.includes(`encountered`) && (this[`~standard`].async = true), t3.common = { issues: [], async: true };
      }
      return this._parseAsync({ data: e3, path: [], parent: t3 }).then((e4) => (0, i2.isValid)(e4) ? { value: e4.value } : { issues: t3.common.issues });
    }
    async parseAsync(e3, t3) {
      let n3 = await this.safeParseAsync(e3, t3);
      if (n3.success) return n3.data;
      throw n3.error;
    }
    async safeParseAsync(e3, t3) {
      let n3 = { common: { issues: [], contextualErrorMap: t3?.errorMap, async: true }, path: t3?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e3, parsedType: (0, a2.getParsedType)(e3) }, r3 = this._parse({ data: e3, path: n3.path, parent: n3 }), o3 = await ((0, i2.isAsync)(r3) ? r3 : Promise.resolve(r3));
      return s2(n3, o3);
    }
    refine(e3, n3) {
      let r3 = (e4) => typeof n3 == `string` || n3 === void 0 ? { message: n3 } : typeof n3 == `function` ? n3(e4) : n3;
      return this._refinement((n4, i3) => {
        let a3 = e3(n4), o3 = () => i3.addIssue({ code: t2.ZodIssueCode.custom, ...r3(n4) });
        return typeof Promise < `u` && a3 instanceof Promise ? a3.then((e4) => e4 ? true : (o3(), false)) : a3 ? true : (o3(), false);
      });
    }
    refinement(e3, t3) {
      return this._refinement((n3, r3) => e3(n3) ? true : (r3.addIssue(typeof t3 == `function` ? t3(n3, r3) : t3), false));
    }
    _refinement(e3) {
      return new me2({ schema: this, typeName: Z2.ZodEffects, effect: { type: `refinement`, refinement: e3 } });
    }
    superRefine(e3) {
      return this._refinement(e3);
    }
    constructor(e3) {
      this.spa = this.safeParseAsync, this._def = e3, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this[`~standard`] = { version: 1, vendor: `zod`, validate: (e4) => this[`~validate`](e4) };
    }
    optional() {
      return he2.create(this, this._def);
    }
    nullable() {
      return ge2.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return K2.create(this);
    }
    promise() {
      return pe2.create(this, this._def);
    }
    or(e3) {
      return Y2.create([this, e3], this._def);
    }
    and(e3) {
      return ne2.create(this, e3, this._def);
    }
    transform(e3) {
      return new me2({ ...c2(this._def), schema: this, typeName: Z2.ZodEffects, effect: { type: `transform`, transform: e3 } });
    }
    default(e3) {
      let t3 = typeof e3 == `function` ? e3 : () => e3;
      return new _e2({ ...c2(this._def), innerType: this, defaultValue: t3, typeName: Z2.ZodDefault });
    }
    brand() {
      return new be2({ typeName: Z2.ZodBranded, type: this, ...c2(this._def) });
    }
    catch(e3) {
      let t3 = typeof e3 == `function` ? e3 : () => e3;
      return new ve2({ ...c2(this._def), innerType: this, catchValue: t3, typeName: Z2.ZodCatch });
    }
    describe(e3) {
      let t3 = this.constructor;
      return new t3({ ...this._def, description: e3 });
    }
    pipe(e3) {
      return xe2.create(this, e3);
    }
    readonly() {
      return Se2.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  e2.ZodType = l2, e2.Schema = l2, e2.ZodSchema = l2;
  let u2 = /^c[^\s-]{8,}$/i, d2 = /^[0-9a-z]+$/, f2 = /^[0-9A-HJKMNP-TV-Z]{26}$/i, p2 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, m2 = /^[a-z0-9_-]{21}$/i, h2 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, g2 = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, _2 = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, v2, y2 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, b2 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, x2 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, S2 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, C2 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, w2 = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, T2 = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`, E2 = RegExp(`^${T2}$`);
  function D2(e3) {
    let t3 = `[0-5]\\d`;
    e3.precision ? t3 = `${t3}\\.\\d{${e3.precision}}` : e3.precision ?? (t3 = `${t3}(\\.\\d+)?`);
    let n3 = e3.precision ? `+` : `?`;
    return `([01]\\d|2[0-3]):[0-5]\\d(:${t3})${n3}`;
  }
  function O2(e3) {
    return RegExp(`^${D2(e3)}$`);
  }
  function k2(e3) {
    let t3 = `${T2}T${D2(e3)}`, n3 = [];
    return n3.push(e3.local ? `Z?` : `Z`), e3.offset && n3.push(`([+-]\\d{2}:?\\d{2})`), t3 = `${t3}(${n3.join(`|`)})`, RegExp(`^${t3}$`);
  }
  function A2(e3, t3) {
    return !!((t3 === `v4` || !t3) && y2.test(e3) || (t3 === `v6` || !t3) && x2.test(e3));
  }
  function j2(e3, t3) {
    if (!h2.test(e3)) return false;
    try {
      let [n3] = e3.split(`.`);
      if (!n3) return false;
      let r3 = n3.replace(/-/g, `+`).replace(/_/g, `/`).padEnd(n3.length + (4 - n3.length % 4) % 4, `=`), i3 = JSON.parse(atob(r3));
      return !(typeof i3 != `object` || !i3 || `typ` in i3 && i3?.typ !== `JWT` || !i3.alg || t3 && i3.alg !== t3);
    } catch {
      return false;
    }
  }
  function M2(e3, t3) {
    return !!((t3 === `v4` || !t3) && b2.test(e3) || (t3 === `v6` || !t3) && S2.test(e3));
  }
  var N2 = class e3 extends l2 {
    _parse(e4) {
      if (this._def.coerce && (e4.data = String(e4.data)), this._getType(e4) !== a2.ZodParsedType.string) {
        let n4 = this._getOrReturnCtx(e4);
        return (0, i2.addIssueToContext)(n4, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.string, received: n4.parsedType }), i2.INVALID;
      }
      let n3 = new i2.ParseStatus(), r3;
      for (let o3 of this._def.checks) if (o3.kind === `min`) e4.data.length < o3.value && (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_small, minimum: o3.value, type: `string`, inclusive: true, exact: false, message: o3.message }), n3.dirty());
      else if (o3.kind === `max`) e4.data.length > o3.value && (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_big, maximum: o3.value, type: `string`, inclusive: true, exact: false, message: o3.message }), n3.dirty());
      else if (o3.kind === `length`) {
        let a3 = e4.data.length > o3.value, s3 = e4.data.length < o3.value;
        (a3 || s3) && (r3 = this._getOrReturnCtx(e4, r3), a3 ? (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_big, maximum: o3.value, type: `string`, inclusive: true, exact: true, message: o3.message }) : s3 && (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_small, minimum: o3.value, type: `string`, inclusive: true, exact: true, message: o3.message }), n3.dirty());
      } else if (o3.kind === `email`) _2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `email`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `emoji`) v2 ||= RegExp(`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`, `u`), v2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `emoji`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `uuid`) p2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `uuid`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `nanoid`) m2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `nanoid`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `cuid`) u2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `cuid`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `cuid2`) d2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `cuid2`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `ulid`) f2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `ulid`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty());
      else if (o3.kind === `url`) try {
        new URL(e4.data);
      } catch {
        r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `url`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty();
      }
      else o3.kind === `regex` ? (o3.regex.lastIndex = 0, o3.regex.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `regex`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty())) : o3.kind === `trim` ? e4.data = e4.data.trim() : o3.kind === `includes` ? e4.data.includes(o3.value, o3.position) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: { includes: o3.value, position: o3.position }, message: o3.message }), n3.dirty()) : o3.kind === `toLowerCase` ? e4.data = e4.data.toLowerCase() : o3.kind === `toUpperCase` ? e4.data = e4.data.toUpperCase() : o3.kind === `startsWith` ? e4.data.startsWith(o3.value) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: { startsWith: o3.value }, message: o3.message }), n3.dirty()) : o3.kind === `endsWith` ? e4.data.endsWith(o3.value) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: { endsWith: o3.value }, message: o3.message }), n3.dirty()) : o3.kind === `datetime` ? k2(o3).test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: `datetime`, message: o3.message }), n3.dirty()) : o3.kind === `date` ? E2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: `date`, message: o3.message }), n3.dirty()) : o3.kind === `time` ? O2(o3).test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_string, validation: `time`, message: o3.message }), n3.dirty()) : o3.kind === `duration` ? g2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `duration`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : o3.kind === `ip` ? A2(e4.data, o3.version) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `ip`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : o3.kind === `jwt` ? j2(e4.data, o3.alg) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `jwt`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : o3.kind === `cidr` ? M2(e4.data, o3.version) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `cidr`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : o3.kind === `base64` ? C2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `base64`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : o3.kind === `base64url` ? w2.test(e4.data) || (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { validation: `base64url`, code: t2.ZodIssueCode.invalid_string, message: o3.message }), n3.dirty()) : a2.util.assertNever(o3);
      return { status: n3.value, value: e4.data };
    }
    _regex(e4, n3, i3) {
      return this.refinement((t3) => e4.test(t3), { validation: n3, code: t2.ZodIssueCode.invalid_string, ...r2.errorUtil.errToObj(i3) });
    }
    _addCheck(t3) {
      return new e3({ ...this._def, checks: [...this._def.checks, t3] });
    }
    email(e4) {
      return this._addCheck({ kind: `email`, ...r2.errorUtil.errToObj(e4) });
    }
    url(e4) {
      return this._addCheck({ kind: `url`, ...r2.errorUtil.errToObj(e4) });
    }
    emoji(e4) {
      return this._addCheck({ kind: `emoji`, ...r2.errorUtil.errToObj(e4) });
    }
    uuid(e4) {
      return this._addCheck({ kind: `uuid`, ...r2.errorUtil.errToObj(e4) });
    }
    nanoid(e4) {
      return this._addCheck({ kind: `nanoid`, ...r2.errorUtil.errToObj(e4) });
    }
    cuid(e4) {
      return this._addCheck({ kind: `cuid`, ...r2.errorUtil.errToObj(e4) });
    }
    cuid2(e4) {
      return this._addCheck({ kind: `cuid2`, ...r2.errorUtil.errToObj(e4) });
    }
    ulid(e4) {
      return this._addCheck({ kind: `ulid`, ...r2.errorUtil.errToObj(e4) });
    }
    base64(e4) {
      return this._addCheck({ kind: `base64`, ...r2.errorUtil.errToObj(e4) });
    }
    base64url(e4) {
      return this._addCheck({ kind: `base64url`, ...r2.errorUtil.errToObj(e4) });
    }
    jwt(e4) {
      return this._addCheck({ kind: `jwt`, ...r2.errorUtil.errToObj(e4) });
    }
    ip(e4) {
      return this._addCheck({ kind: `ip`, ...r2.errorUtil.errToObj(e4) });
    }
    cidr(e4) {
      return this._addCheck({ kind: `cidr`, ...r2.errorUtil.errToObj(e4) });
    }
    datetime(e4) {
      return typeof e4 == `string` ? this._addCheck({ kind: `datetime`, precision: null, offset: false, local: false, message: e4 }) : this._addCheck({ kind: `datetime`, precision: e4?.precision === void 0 ? null : e4?.precision, offset: e4?.offset ?? false, local: e4?.local ?? false, ...r2.errorUtil.errToObj(e4?.message) });
    }
    date(e4) {
      return this._addCheck({ kind: `date`, message: e4 });
    }
    time(e4) {
      return typeof e4 == `string` ? this._addCheck({ kind: `time`, precision: null, message: e4 }) : this._addCheck({ kind: `time`, precision: e4?.precision === void 0 ? null : e4?.precision, ...r2.errorUtil.errToObj(e4?.message) });
    }
    duration(e4) {
      return this._addCheck({ kind: `duration`, ...r2.errorUtil.errToObj(e4) });
    }
    regex(e4, t3) {
      return this._addCheck({ kind: `regex`, regex: e4, ...r2.errorUtil.errToObj(t3) });
    }
    includes(e4, t3) {
      return this._addCheck({ kind: `includes`, value: e4, position: t3?.position, ...r2.errorUtil.errToObj(t3?.message) });
    }
    startsWith(e4, t3) {
      return this._addCheck({ kind: `startsWith`, value: e4, ...r2.errorUtil.errToObj(t3) });
    }
    endsWith(e4, t3) {
      return this._addCheck({ kind: `endsWith`, value: e4, ...r2.errorUtil.errToObj(t3) });
    }
    min(e4, t3) {
      return this._addCheck({ kind: `min`, value: e4, ...r2.errorUtil.errToObj(t3) });
    }
    max(e4, t3) {
      return this._addCheck({ kind: `max`, value: e4, ...r2.errorUtil.errToObj(t3) });
    }
    length(e4, t3) {
      return this._addCheck({ kind: `length`, value: e4, ...r2.errorUtil.errToObj(t3) });
    }
    nonempty(e4) {
      return this.min(1, r2.errorUtil.errToObj(e4));
    }
    trim() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: `trim` }] });
    }
    toLowerCase() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: `toLowerCase` }] });
    }
    toUpperCase() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: `toUpperCase` }] });
    }
    get isDatetime() {
      return !!this._def.checks.find((e4) => e4.kind === `datetime`);
    }
    get isDate() {
      return !!this._def.checks.find((e4) => e4.kind === `date`);
    }
    get isTime() {
      return !!this._def.checks.find((e4) => e4.kind === `time`);
    }
    get isDuration() {
      return !!this._def.checks.find((e4) => e4.kind === `duration`);
    }
    get isEmail() {
      return !!this._def.checks.find((e4) => e4.kind === `email`);
    }
    get isURL() {
      return !!this._def.checks.find((e4) => e4.kind === `url`);
    }
    get isEmoji() {
      return !!this._def.checks.find((e4) => e4.kind === `emoji`);
    }
    get isUUID() {
      return !!this._def.checks.find((e4) => e4.kind === `uuid`);
    }
    get isNANOID() {
      return !!this._def.checks.find((e4) => e4.kind === `nanoid`);
    }
    get isCUID() {
      return !!this._def.checks.find((e4) => e4.kind === `cuid`);
    }
    get isCUID2() {
      return !!this._def.checks.find((e4) => e4.kind === `cuid2`);
    }
    get isULID() {
      return !!this._def.checks.find((e4) => e4.kind === `ulid`);
    }
    get isIP() {
      return !!this._def.checks.find((e4) => e4.kind === `ip`);
    }
    get isCIDR() {
      return !!this._def.checks.find((e4) => e4.kind === `cidr`);
    }
    get isBase64() {
      return !!this._def.checks.find((e4) => e4.kind === `base64`);
    }
    get isBase64url() {
      return !!this._def.checks.find((e4) => e4.kind === `base64url`);
    }
    get minLength() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `min` && (e4 === null || t3.value > e4) && (e4 = t3.value);
      return e4;
    }
    get maxLength() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `max` && (e4 === null || t3.value < e4) && (e4 = t3.value);
      return e4;
    }
  };
  e2.ZodString = N2, N2.create = (e3) => new N2({ checks: [], typeName: Z2.ZodString, coerce: e3?.coerce ?? false, ...c2(e3) });
  function P2(e3, t3) {
    let n3 = (e3.toString().split(`.`)[1] || ``).length, r3 = (t3.toString().split(`.`)[1] || ``).length, i3 = n3 > r3 ? n3 : r3;
    return Number.parseInt(e3.toFixed(i3).replace(`.`, ``)) % Number.parseInt(t3.toFixed(i3).replace(`.`, ``)) / 10 ** i3;
  }
  var F2 = class e3 extends l2 {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e4) {
      if (this._def.coerce && (e4.data = Number(e4.data)), this._getType(e4) !== a2.ZodParsedType.number) {
        let n4 = this._getOrReturnCtx(e4);
        return (0, i2.addIssueToContext)(n4, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.number, received: n4.parsedType }), i2.INVALID;
      }
      let n3, r3 = new i2.ParseStatus();
      for (let o3 of this._def.checks) o3.kind === `int` ? a2.util.isInteger(e4.data) || (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: `integer`, received: `float`, message: o3.message }), r3.dirty()) : o3.kind === `min` ? (o3.inclusive ? e4.data < o3.value : e4.data <= o3.value) && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_small, minimum: o3.value, type: `number`, inclusive: o3.inclusive, exact: false, message: o3.message }), r3.dirty()) : o3.kind === `max` ? (o3.inclusive ? e4.data > o3.value : e4.data >= o3.value) && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_big, maximum: o3.value, type: `number`, inclusive: o3.inclusive, exact: false, message: o3.message }), r3.dirty()) : o3.kind === `multipleOf` ? P2(e4.data, o3.value) !== 0 && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.not_multiple_of, multipleOf: o3.value, message: o3.message }), r3.dirty()) : o3.kind === `finite` ? Number.isFinite(e4.data) || (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.not_finite, message: o3.message }), r3.dirty()) : a2.util.assertNever(o3);
      return { status: r3.value, value: e4.data };
    }
    gte(e4, t3) {
      return this.setLimit(`min`, e4, true, r2.errorUtil.toString(t3));
    }
    gt(e4, t3) {
      return this.setLimit(`min`, e4, false, r2.errorUtil.toString(t3));
    }
    lte(e4, t3) {
      return this.setLimit(`max`, e4, true, r2.errorUtil.toString(t3));
    }
    lt(e4, t3) {
      return this.setLimit(`max`, e4, false, r2.errorUtil.toString(t3));
    }
    setLimit(t3, n3, i3, a3) {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: t3, value: n3, inclusive: i3, message: r2.errorUtil.toString(a3) }] });
    }
    _addCheck(t3) {
      return new e3({ ...this._def, checks: [...this._def.checks, t3] });
    }
    int(e4) {
      return this._addCheck({ kind: `int`, message: r2.errorUtil.toString(e4) });
    }
    positive(e4) {
      return this._addCheck({ kind: `min`, value: 0, inclusive: false, message: r2.errorUtil.toString(e4) });
    }
    negative(e4) {
      return this._addCheck({ kind: `max`, value: 0, inclusive: false, message: r2.errorUtil.toString(e4) });
    }
    nonpositive(e4) {
      return this._addCheck({ kind: `max`, value: 0, inclusive: true, message: r2.errorUtil.toString(e4) });
    }
    nonnegative(e4) {
      return this._addCheck({ kind: `min`, value: 0, inclusive: true, message: r2.errorUtil.toString(e4) });
    }
    multipleOf(e4, t3) {
      return this._addCheck({ kind: `multipleOf`, value: e4, message: r2.errorUtil.toString(t3) });
    }
    finite(e4) {
      return this._addCheck({ kind: `finite`, message: r2.errorUtil.toString(e4) });
    }
    safe(e4) {
      return this._addCheck({ kind: `min`, inclusive: true, value: -(2 ** 53 - 1), message: r2.errorUtil.toString(e4) })._addCheck({ kind: `max`, inclusive: true, value: 2 ** 53 - 1, message: r2.errorUtil.toString(e4) });
    }
    get minValue() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `min` && (e4 === null || t3.value > e4) && (e4 = t3.value);
      return e4;
    }
    get maxValue() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `max` && (e4 === null || t3.value < e4) && (e4 = t3.value);
      return e4;
    }
    get isInt() {
      return !!this._def.checks.find((e4) => e4.kind === `int` || e4.kind === `multipleOf` && a2.util.isInteger(e4.value));
    }
    get isFinite() {
      let e4 = null, t3 = null;
      for (let n3 of this._def.checks) if (n3.kind === `finite` || n3.kind === `int` || n3.kind === `multipleOf`) return true;
      else n3.kind === `min` ? (t3 === null || n3.value > t3) && (t3 = n3.value) : n3.kind === `max` && (e4 === null || n3.value < e4) && (e4 = n3.value);
      return Number.isFinite(t3) && Number.isFinite(e4);
    }
  };
  e2.ZodNumber = F2, F2.create = (e3) => new F2({ checks: [], typeName: Z2.ZodNumber, coerce: e3?.coerce || false, ...c2(e3) });
  var I2 = class e3 extends l2 {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e4) {
      if (this._def.coerce) try {
        e4.data = BigInt(e4.data);
      } catch {
        return this._getInvalidInput(e4);
      }
      if (this._getType(e4) !== a2.ZodParsedType.bigint) return this._getInvalidInput(e4);
      let n3, r3 = new i2.ParseStatus();
      for (let o3 of this._def.checks) o3.kind === `min` ? (o3.inclusive ? e4.data < o3.value : e4.data <= o3.value) && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_small, type: `bigint`, minimum: o3.value, inclusive: o3.inclusive, message: o3.message }), r3.dirty()) : o3.kind === `max` ? (o3.inclusive ? e4.data > o3.value : e4.data >= o3.value) && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_big, type: `bigint`, maximum: o3.value, inclusive: o3.inclusive, message: o3.message }), r3.dirty()) : o3.kind === `multipleOf` ? e4.data % o3.value !== BigInt(0) && (n3 = this._getOrReturnCtx(e4, n3), (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.not_multiple_of, multipleOf: o3.value, message: o3.message }), r3.dirty()) : a2.util.assertNever(o3);
      return { status: r3.value, value: e4.data };
    }
    _getInvalidInput(e4) {
      let n3 = this._getOrReturnCtx(e4);
      return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.bigint, received: n3.parsedType }), i2.INVALID;
    }
    gte(e4, t3) {
      return this.setLimit(`min`, e4, true, r2.errorUtil.toString(t3));
    }
    gt(e4, t3) {
      return this.setLimit(`min`, e4, false, r2.errorUtil.toString(t3));
    }
    lte(e4, t3) {
      return this.setLimit(`max`, e4, true, r2.errorUtil.toString(t3));
    }
    lt(e4, t3) {
      return this.setLimit(`max`, e4, false, r2.errorUtil.toString(t3));
    }
    setLimit(t3, n3, i3, a3) {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: t3, value: n3, inclusive: i3, message: r2.errorUtil.toString(a3) }] });
    }
    _addCheck(t3) {
      return new e3({ ...this._def, checks: [...this._def.checks, t3] });
    }
    positive(e4) {
      return this._addCheck({ kind: `min`, value: BigInt(0), inclusive: false, message: r2.errorUtil.toString(e4) });
    }
    negative(e4) {
      return this._addCheck({ kind: `max`, value: BigInt(0), inclusive: false, message: r2.errorUtil.toString(e4) });
    }
    nonpositive(e4) {
      return this._addCheck({ kind: `max`, value: BigInt(0), inclusive: true, message: r2.errorUtil.toString(e4) });
    }
    nonnegative(e4) {
      return this._addCheck({ kind: `min`, value: BigInt(0), inclusive: true, message: r2.errorUtil.toString(e4) });
    }
    multipleOf(e4, t3) {
      return this._addCheck({ kind: `multipleOf`, value: e4, message: r2.errorUtil.toString(t3) });
    }
    get minValue() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `min` && (e4 === null || t3.value > e4) && (e4 = t3.value);
      return e4;
    }
    get maxValue() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `max` && (e4 === null || t3.value < e4) && (e4 = t3.value);
      return e4;
    }
  };
  e2.ZodBigInt = I2, I2.create = (e3) => new I2({ checks: [], typeName: Z2.ZodBigInt, coerce: e3?.coerce ?? false, ...c2(e3) });
  var L2 = class extends l2 {
    _parse(e3) {
      if (this._def.coerce && (e3.data = !!e3.data), this._getType(e3) !== a2.ZodParsedType.boolean) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.boolean, received: n3.parsedType }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodBoolean = L2, L2.create = (e3) => new L2({ typeName: Z2.ZodBoolean, coerce: e3?.coerce || false, ...c2(e3) });
  var R2 = class e3 extends l2 {
    _parse(e4) {
      if (this._def.coerce && (e4.data = new Date(e4.data)), this._getType(e4) !== a2.ZodParsedType.date) {
        let n4 = this._getOrReturnCtx(e4);
        return (0, i2.addIssueToContext)(n4, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.date, received: n4.parsedType }), i2.INVALID;
      }
      if (Number.isNaN(e4.data.getTime())) {
        let n4 = this._getOrReturnCtx(e4);
        return (0, i2.addIssueToContext)(n4, { code: t2.ZodIssueCode.invalid_date }), i2.INVALID;
      }
      let n3 = new i2.ParseStatus(), r3;
      for (let o3 of this._def.checks) o3.kind === `min` ? e4.data.getTime() < o3.value && (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_small, message: o3.message, inclusive: true, exact: false, minimum: o3.value, type: `date` }), n3.dirty()) : o3.kind === `max` ? e4.data.getTime() > o3.value && (r3 = this._getOrReturnCtx(e4, r3), (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_big, message: o3.message, inclusive: true, exact: false, maximum: o3.value, type: `date` }), n3.dirty()) : a2.util.assertNever(o3);
      return { status: n3.value, value: new Date(e4.data.getTime()) };
    }
    _addCheck(t3) {
      return new e3({ ...this._def, checks: [...this._def.checks, t3] });
    }
    min(e4, t3) {
      return this._addCheck({ kind: `min`, value: e4.getTime(), message: r2.errorUtil.toString(t3) });
    }
    max(e4, t3) {
      return this._addCheck({ kind: `max`, value: e4.getTime(), message: r2.errorUtil.toString(t3) });
    }
    get minDate() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `min` && (e4 === null || t3.value > e4) && (e4 = t3.value);
      return e4 == null ? null : new Date(e4);
    }
    get maxDate() {
      let e4 = null;
      for (let t3 of this._def.checks) t3.kind === `max` && (e4 === null || t3.value < e4) && (e4 = t3.value);
      return e4 == null ? null : new Date(e4);
    }
  };
  e2.ZodDate = R2, R2.create = (e3) => new R2({ checks: [], coerce: e3?.coerce || false, typeName: Z2.ZodDate, ...c2(e3) });
  var z2 = class extends l2 {
    _parse(e3) {
      if (this._getType(e3) !== a2.ZodParsedType.symbol) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.symbol, received: n3.parsedType }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodSymbol = z2, z2.create = (e3) => new z2({ typeName: Z2.ZodSymbol, ...c2(e3) });
  var B2 = class extends l2 {
    _parse(e3) {
      if (this._getType(e3) !== a2.ZodParsedType.undefined) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.undefined, received: n3.parsedType }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodUndefined = B2, B2.create = (e3) => new B2({ typeName: Z2.ZodUndefined, ...c2(e3) });
  var V2 = class extends l2 {
    _parse(e3) {
      if (this._getType(e3) !== a2.ZodParsedType.null) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.null, received: n3.parsedType }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodNull = V2, V2.create = (e3) => new V2({ typeName: Z2.ZodNull, ...c2(e3) });
  var H2 = class extends l2 {
    constructor() {
      super(...arguments), this._any = true;
    }
    _parse(e3) {
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodAny = H2, H2.create = (e3) => new H2({ typeName: Z2.ZodAny, ...c2(e3) });
  var U2 = class extends l2 {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(e3) {
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodUnknown = U2, U2.create = (e3) => new U2({ typeName: Z2.ZodUnknown, ...c2(e3) });
  var W2 = class extends l2 {
    _parse(e3) {
      let n3 = this._getOrReturnCtx(e3);
      return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.never, received: n3.parsedType }), i2.INVALID;
    }
  };
  e2.ZodNever = W2, W2.create = (e3) => new W2({ typeName: Z2.ZodNever, ...c2(e3) });
  var G2 = class extends l2 {
    _parse(e3) {
      if (this._getType(e3) !== a2.ZodParsedType.undefined) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.void, received: n3.parsedType }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
  };
  e2.ZodVoid = G2, G2.create = (e3) => new G2({ typeName: Z2.ZodVoid, ...c2(e3) });
  var K2 = class e3 extends l2 {
    _parse(e4) {
      let { ctx: n3, status: r3 } = this._processInputParams(e4), s3 = this._def;
      if (n3.parsedType !== a2.ZodParsedType.array) return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.array, received: n3.parsedType }), i2.INVALID;
      if (s3.exactLength !== null) {
        let e5 = n3.data.length > s3.exactLength.value, a3 = n3.data.length < s3.exactLength.value;
        (e5 || a3) && ((0, i2.addIssueToContext)(n3, { code: e5 ? t2.ZodIssueCode.too_big : t2.ZodIssueCode.too_small, minimum: a3 ? s3.exactLength.value : void 0, maximum: e5 ? s3.exactLength.value : void 0, type: `array`, inclusive: true, exact: true, message: s3.exactLength.message }), r3.dirty());
      }
      if (s3.minLength !== null && n3.data.length < s3.minLength.value && ((0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_small, minimum: s3.minLength.value, type: `array`, inclusive: true, exact: false, message: s3.minLength.message }), r3.dirty()), s3.maxLength !== null && n3.data.length > s3.maxLength.value && ((0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.too_big, maximum: s3.maxLength.value, type: `array`, inclusive: true, exact: false, message: s3.maxLength.message }), r3.dirty()), n3.common.async) return Promise.all([...n3.data].map((e5, t3) => s3.type._parseAsync(new o2(n3, e5, n3.path, t3)))).then((e5) => i2.ParseStatus.mergeArray(r3, e5));
      let c3 = [...n3.data].map((e5, t3) => s3.type._parseSync(new o2(n3, e5, n3.path, t3)));
      return i2.ParseStatus.mergeArray(r3, c3);
    }
    get element() {
      return this._def.type;
    }
    min(t3, n3) {
      return new e3({ ...this._def, minLength: { value: t3, message: r2.errorUtil.toString(n3) } });
    }
    max(t3, n3) {
      return new e3({ ...this._def, maxLength: { value: t3, message: r2.errorUtil.toString(n3) } });
    }
    length(t3, n3) {
      return new e3({ ...this._def, exactLength: { value: t3, message: r2.errorUtil.toString(n3) } });
    }
    nonempty(e4) {
      return this.min(1, e4);
    }
  };
  e2.ZodArray = K2, K2.create = (e3, t3) => new K2({ type: e3, minLength: null, maxLength: null, exactLength: null, typeName: Z2.ZodArray, ...c2(t3) });
  function q2(e3) {
    if (e3 instanceof J2) {
      let t3 = {};
      for (let n3 in e3.shape) {
        let r3 = e3.shape[n3];
        t3[n3] = he2.create(q2(r3));
      }
      return new J2({ ...e3._def, shape: () => t3 });
    }
    return e3 instanceof K2 ? new K2({ ...e3._def, type: q2(e3.element) }) : e3 instanceof he2 ? he2.create(q2(e3.unwrap())) : e3 instanceof ge2 ? ge2.create(q2(e3.unwrap())) : e3 instanceof re2 ? re2.create(e3.items.map((e4) => q2(e4))) : e3;
  }
  var J2 = class e3 extends l2 {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      let e4 = this._def.shape(), t3 = a2.util.objectKeys(e4);
      return this._cached = { shape: e4, keys: t3 }, this._cached;
    }
    _parse(e4) {
      if (this._getType(e4) !== a2.ZodParsedType.object) {
        let n4 = this._getOrReturnCtx(e4);
        return (0, i2.addIssueToContext)(n4, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.object, received: n4.parsedType }), i2.INVALID;
      }
      let { status: n3, ctx: r3 } = this._processInputParams(e4), { shape: s3, keys: c3 } = this._getCached(), l3 = [];
      if (!(this._def.catchall instanceof W2 && this._def.unknownKeys === `strip`)) for (let e5 in r3.data) c3.includes(e5) || l3.push(e5);
      let u3 = [];
      for (let e5 of c3) {
        let t3 = s3[e5], n4 = r3.data[e5];
        u3.push({ key: { status: `valid`, value: e5 }, value: t3._parse(new o2(r3, n4, r3.path, e5)), alwaysSet: e5 in r3.data });
      }
      if (this._def.catchall instanceof W2) {
        let e5 = this._def.unknownKeys;
        if (e5 === `passthrough`) for (let e6 of l3) u3.push({ key: { status: `valid`, value: e6 }, value: { status: `valid`, value: r3.data[e6] } });
        else if (e5 === `strict`) l3.length > 0 && ((0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.unrecognized_keys, keys: l3 }), n3.dirty());
        else if (e5 !== `strip`) throw Error(`Internal ZodObject error: invalid unknownKeys value.`);
      } else {
        let e5 = this._def.catchall;
        for (let t3 of l3) {
          let n4 = r3.data[t3];
          u3.push({ key: { status: `valid`, value: t3 }, value: e5._parse(new o2(r3, n4, r3.path, t3)), alwaysSet: t3 in r3.data });
        }
      }
      return r3.common.async ? Promise.resolve().then(async () => {
        let e5 = [];
        for (let t3 of u3) {
          let n4 = await t3.key, r4 = await t3.value;
          e5.push({ key: n4, value: r4, alwaysSet: t3.alwaysSet });
        }
        return e5;
      }).then((e5) => i2.ParseStatus.mergeObjectSync(n3, e5)) : i2.ParseStatus.mergeObjectSync(n3, u3);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t3) {
      return r2.errorUtil.errToObj, new e3({ ...this._def, unknownKeys: `strict`, ...t3 === void 0 ? {} : { errorMap: (e4, n3) => {
        let i3 = this._def.errorMap?.(e4, n3).message ?? n3.defaultError;
        return e4.code === `unrecognized_keys` ? { message: r2.errorUtil.errToObj(t3).message ?? i3 } : { message: i3 };
      } } });
    }
    strip() {
      return new e3({ ...this._def, unknownKeys: `strip` });
    }
    passthrough() {
      return new e3({ ...this._def, unknownKeys: `passthrough` });
    }
    extend(t3) {
      return new e3({ ...this._def, shape: () => ({ ...this._def.shape(), ...t3 }) });
    }
    merge(t3) {
      return new e3({ unknownKeys: t3._def.unknownKeys, catchall: t3._def.catchall, shape: () => ({ ...this._def.shape(), ...t3._def.shape() }), typeName: Z2.ZodObject });
    }
    setKey(e4, t3) {
      return this.augment({ [e4]: t3 });
    }
    catchall(t3) {
      return new e3({ ...this._def, catchall: t3 });
    }
    pick(t3) {
      let n3 = {};
      for (let e4 of a2.util.objectKeys(t3)) t3[e4] && this.shape[e4] && (n3[e4] = this.shape[e4]);
      return new e3({ ...this._def, shape: () => n3 });
    }
    omit(t3) {
      let n3 = {};
      for (let e4 of a2.util.objectKeys(this.shape)) t3[e4] || (n3[e4] = this.shape[e4]);
      return new e3({ ...this._def, shape: () => n3 });
    }
    deepPartial() {
      return q2(this);
    }
    partial(t3) {
      let n3 = {};
      for (let e4 of a2.util.objectKeys(this.shape)) {
        let r3 = this.shape[e4];
        n3[e4] = t3 && !t3[e4] ? r3 : r3.optional();
      }
      return new e3({ ...this._def, shape: () => n3 });
    }
    required(t3) {
      let n3 = {};
      for (let e4 of a2.util.objectKeys(this.shape)) if (t3 && !t3[e4]) n3[e4] = this.shape[e4];
      else {
        let t4 = this.shape[e4];
        for (; t4 instanceof he2; ) t4 = t4._def.innerType;
        n3[e4] = t4;
      }
      return new e3({ ...this._def, shape: () => n3 });
    }
    keyof() {
      return ue2(a2.util.objectKeys(this.shape));
    }
  };
  e2.ZodObject = J2, J2.create = (e3, t3) => new J2({ shape: () => e3, unknownKeys: `strip`, catchall: W2.create(), typeName: Z2.ZodObject, ...c2(t3) }), J2.strictCreate = (e3, t3) => new J2({ shape: () => e3, unknownKeys: `strict`, catchall: W2.create(), typeName: Z2.ZodObject, ...c2(t3) }), J2.lazycreate = (e3, t3) => new J2({ shape: e3, unknownKeys: `strip`, catchall: W2.create(), typeName: Z2.ZodObject, ...c2(t3) });
  var Y2 = class extends l2 {
    _parse(e3) {
      let { ctx: n3 } = this._processInputParams(e3), r3 = this._def.options;
      function a3(e4) {
        for (let t3 of e4) if (t3.result.status === `valid`) return t3.result;
        for (let t3 of e4) if (t3.result.status === `dirty`) return n3.common.issues.push(...t3.ctx.common.issues), t3.result;
        let r4 = e4.map((e5) => new t2.ZodError(e5.ctx.common.issues));
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_union, unionErrors: r4 }), i2.INVALID;
      }
      if (n3.common.async) return Promise.all(r3.map(async (e4) => {
        let t3 = { ...n3, common: { ...n3.common, issues: [] }, parent: null };
        return { result: await e4._parseAsync({ data: n3.data, path: n3.path, parent: t3 }), ctx: t3 };
      })).then(a3);
      {
        let e4, a4 = [];
        for (let t3 of r3) {
          let r4 = { ...n3, common: { ...n3.common, issues: [] }, parent: null }, i3 = t3._parseSync({ data: n3.data, path: n3.path, parent: r4 });
          if (i3.status === `valid`) return i3;
          i3.status === `dirty` && !e4 && (e4 = { result: i3, ctx: r4 }), r4.common.issues.length && a4.push(r4.common.issues);
        }
        if (e4) return n3.common.issues.push(...e4.ctx.common.issues), e4.result;
        let o3 = a4.map((e5) => new t2.ZodError(e5));
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_union, unionErrors: o3 }), i2.INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  e2.ZodUnion = Y2, Y2.create = (e3, t3) => new Y2({ options: e3, typeName: Z2.ZodUnion, ...c2(t3) });
  let X2 = (e3) => e3 instanceof ce2 ? X2(e3.schema) : e3 instanceof me2 ? X2(e3.innerType()) : e3 instanceof le2 ? [e3.value] : e3 instanceof de2 ? e3.options : e3 instanceof fe2 ? a2.util.objectValues(e3.enum) : e3 instanceof _e2 ? X2(e3._def.innerType) : e3 instanceof B2 ? [void 0] : e3 instanceof V2 ? [null] : e3 instanceof he2 ? [void 0, ...X2(e3.unwrap())] : e3 instanceof ge2 ? [null, ...X2(e3.unwrap())] : e3 instanceof be2 || e3 instanceof Se2 ? X2(e3.unwrap()) : e3 instanceof ve2 ? X2(e3._def.innerType) : [];
  var ee2 = class e3 extends l2 {
    _parse(e4) {
      let { ctx: n3 } = this._processInputParams(e4);
      if (n3.parsedType !== a2.ZodParsedType.object) return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.object, received: n3.parsedType }), i2.INVALID;
      let r3 = this.discriminator, o3 = n3.data[r3], s3 = this.optionsMap.get(o3);
      return s3 ? n3.common.async ? s3._parseAsync({ data: n3.data, path: n3.path, parent: n3 }) : s3._parseSync({ data: n3.data, path: n3.path, parent: n3 }) : ((0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [r3] }), i2.INVALID);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t3, n3, r3) {
      let i3 = /* @__PURE__ */ new Map();
      for (let e4 of n3) {
        let n4 = X2(e4.shape[t3]);
        if (!n4.length) throw Error(`A discriminator value for key \`${t3}\` could not be extracted from all schema options`);
        for (let r4 of n4) {
          if (i3.has(r4)) throw Error(`Discriminator property ${String(t3)} has duplicate value ${String(r4)}`);
          i3.set(r4, e4);
        }
      }
      return new e3({ typeName: Z2.ZodDiscriminatedUnion, discriminator: t3, options: n3, optionsMap: i3, ...c2(r3) });
    }
  };
  e2.ZodDiscriminatedUnion = ee2;
  function te2(e3, t3) {
    let n3 = (0, a2.getParsedType)(e3), r3 = (0, a2.getParsedType)(t3);
    if (e3 === t3) return { valid: true, data: e3 };
    if (n3 === a2.ZodParsedType.object && r3 === a2.ZodParsedType.object) {
      let n4 = a2.util.objectKeys(t3), r4 = a2.util.objectKeys(e3).filter((e4) => n4.indexOf(e4) !== -1), i3 = { ...e3, ...t3 };
      for (let n5 of r4) {
        let r5 = te2(e3[n5], t3[n5]);
        if (!r5.valid) return { valid: false };
        i3[n5] = r5.data;
      }
      return { valid: true, data: i3 };
    }
    if (n3 === a2.ZodParsedType.array && r3 === a2.ZodParsedType.array) {
      if (e3.length !== t3.length) return { valid: false };
      let n4 = [];
      for (let r4 = 0; r4 < e3.length; r4++) {
        let i3 = e3[r4], a3 = t3[r4], o3 = te2(i3, a3);
        if (!o3.valid) return { valid: false };
        n4.push(o3.data);
      }
      return { valid: true, data: n4 };
    }
    return n3 === a2.ZodParsedType.date && r3 === a2.ZodParsedType.date && +e3 == +t3 ? { valid: true, data: e3 } : { valid: false };
  }
  var ne2 = class extends l2 {
    _parse(e3) {
      let { status: n3, ctx: r3 } = this._processInputParams(e3), a3 = (e4, a4) => {
        if ((0, i2.isAborted)(e4) || (0, i2.isAborted)(a4)) return i2.INVALID;
        let o3 = te2(e4.value, a4.value);
        return o3.valid ? (((0, i2.isDirty)(e4) || (0, i2.isDirty)(a4)) && n3.dirty(), { status: n3.value, value: o3.data }) : ((0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_intersection_types }), i2.INVALID);
      };
      return r3.common.async ? Promise.all([this._def.left._parseAsync({ data: r3.data, path: r3.path, parent: r3 }), this._def.right._parseAsync({ data: r3.data, path: r3.path, parent: r3 })]).then(([e4, t3]) => a3(e4, t3)) : a3(this._def.left._parseSync({ data: r3.data, path: r3.path, parent: r3 }), this._def.right._parseSync({ data: r3.data, path: r3.path, parent: r3 }));
    }
  };
  e2.ZodIntersection = ne2, ne2.create = (e3, t3, n3) => new ne2({ left: e3, right: t3, typeName: Z2.ZodIntersection, ...c2(n3) });
  var re2 = class e3 extends l2 {
    _parse(e4) {
      let { status: n3, ctx: r3 } = this._processInputParams(e4);
      if (r3.parsedType !== a2.ZodParsedType.array) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.array, received: r3.parsedType }), i2.INVALID;
      if (r3.data.length < this._def.items.length) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: `array` }), i2.INVALID;
      !this._def.rest && r3.data.length > this._def.items.length && ((0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: `array` }), n3.dirty());
      let s3 = [...r3.data].map((e5, t3) => {
        let n4 = this._def.items[t3] || this._def.rest;
        return n4 ? n4._parse(new o2(r3, e5, r3.path, t3)) : null;
      }).filter((e5) => !!e5);
      return r3.common.async ? Promise.all(s3).then((e5) => i2.ParseStatus.mergeArray(n3, e5)) : i2.ParseStatus.mergeArray(n3, s3);
    }
    get items() {
      return this._def.items;
    }
    rest(t3) {
      return new e3({ ...this._def, rest: t3 });
    }
  };
  e2.ZodTuple = re2, re2.create = (e3, t3) => {
    if (!Array.isArray(e3)) throw Error(`You must pass an array of schemas to z.tuple([ ... ])`);
    return new re2({ items: e3, typeName: Z2.ZodTuple, rest: null, ...c2(t3) });
  };
  var ie2 = class e3 extends l2 {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e4) {
      let { status: n3, ctx: r3 } = this._processInputParams(e4);
      if (r3.parsedType !== a2.ZodParsedType.object) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.object, received: r3.parsedType }), i2.INVALID;
      let s3 = [], c3 = this._def.keyType, l3 = this._def.valueType;
      for (let e5 in r3.data) s3.push({ key: c3._parse(new o2(r3, e5, r3.path, e5)), value: l3._parse(new o2(r3, r3.data[e5], r3.path, e5)), alwaysSet: e5 in r3.data });
      return r3.common.async ? i2.ParseStatus.mergeObjectAsync(n3, s3) : i2.ParseStatus.mergeObjectSync(n3, s3);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t3, n3, r3) {
      return n3 instanceof l2 ? new e3({ keyType: t3, valueType: n3, typeName: Z2.ZodRecord, ...c2(r3) }) : new e3({ keyType: N2.create(), valueType: t3, typeName: Z2.ZodRecord, ...c2(n3) });
    }
  };
  e2.ZodRecord = ie2;
  var ae2 = class extends l2 {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e3) {
      let { status: n3, ctx: r3 } = this._processInputParams(e3);
      if (r3.parsedType !== a2.ZodParsedType.map) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.map, received: r3.parsedType }), i2.INVALID;
      let s3 = this._def.keyType, c3 = this._def.valueType, l3 = [...r3.data.entries()].map(([e4, t3], n4) => ({ key: s3._parse(new o2(r3, e4, r3.path, [n4, `key`])), value: c3._parse(new o2(r3, t3, r3.path, [n4, `value`])) }));
      if (r3.common.async) {
        let e4 = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (let t3 of l3) {
            let r4 = await t3.key, a3 = await t3.value;
            if (r4.status === `aborted` || a3.status === `aborted`) return i2.INVALID;
            (r4.status === `dirty` || a3.status === `dirty`) && n3.dirty(), e4.set(r4.value, a3.value);
          }
          return { status: n3.value, value: e4 };
        });
      }
      {
        let e4 = /* @__PURE__ */ new Map();
        for (let t3 of l3) {
          let r4 = t3.key, a3 = t3.value;
          if (r4.status === `aborted` || a3.status === `aborted`) return i2.INVALID;
          (r4.status === `dirty` || a3.status === `dirty`) && n3.dirty(), e4.set(r4.value, a3.value);
        }
        return { status: n3.value, value: e4 };
      }
    }
  };
  e2.ZodMap = ae2, ae2.create = (e3, t3, n3) => new ae2({ valueType: t3, keyType: e3, typeName: Z2.ZodMap, ...c2(n3) });
  var oe2 = class e3 extends l2 {
    _parse(e4) {
      let { status: n3, ctx: r3 } = this._processInputParams(e4);
      if (r3.parsedType !== a2.ZodParsedType.set) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.set, received: r3.parsedType }), i2.INVALID;
      let s3 = this._def;
      s3.minSize !== null && r3.data.size < s3.minSize.value && ((0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_small, minimum: s3.minSize.value, type: `set`, inclusive: true, exact: false, message: s3.minSize.message }), n3.dirty()), s3.maxSize !== null && r3.data.size > s3.maxSize.value && ((0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.too_big, maximum: s3.maxSize.value, type: `set`, inclusive: true, exact: false, message: s3.maxSize.message }), n3.dirty());
      let c3 = this._def.valueType;
      function l3(e5) {
        let t3 = /* @__PURE__ */ new Set();
        for (let r4 of e5) {
          if (r4.status === `aborted`) return i2.INVALID;
          r4.status === `dirty` && n3.dirty(), t3.add(r4.value);
        }
        return { status: n3.value, value: t3 };
      }
      let u3 = [...r3.data.values()].map((e5, t3) => c3._parse(new o2(r3, e5, r3.path, t3)));
      return r3.common.async ? Promise.all(u3).then((e5) => l3(e5)) : l3(u3);
    }
    min(t3, n3) {
      return new e3({ ...this._def, minSize: { value: t3, message: r2.errorUtil.toString(n3) } });
    }
    max(t3, n3) {
      return new e3({ ...this._def, maxSize: { value: t3, message: r2.errorUtil.toString(n3) } });
    }
    size(e4, t3) {
      return this.min(e4, t3).max(e4, t3);
    }
    nonempty(e4) {
      return this.min(1, e4);
    }
  };
  e2.ZodSet = oe2, oe2.create = (e3, t3) => new oe2({ valueType: e3, minSize: null, maxSize: null, typeName: Z2.ZodSet, ...c2(t3) });
  var se2 = class e3 extends l2 {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e4) {
      let { ctx: r3 } = this._processInputParams(e4);
      if (r3.parsedType !== a2.ZodParsedType.function) return (0, i2.addIssueToContext)(r3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.function, received: r3.parsedType }), i2.INVALID;
      function o3(e5, a3) {
        return (0, i2.makeIssue)({ data: e5, path: r3.path, errorMaps: [r3.common.contextualErrorMap, r3.schemaErrorMap, (0, n2.getErrorMap)(), n2.defaultErrorMap].filter((e6) => !!e6), issueData: { code: t2.ZodIssueCode.invalid_arguments, argumentsError: a3 } });
      }
      function s3(e5, a3) {
        return (0, i2.makeIssue)({ data: e5, path: r3.path, errorMaps: [r3.common.contextualErrorMap, r3.schemaErrorMap, (0, n2.getErrorMap)(), n2.defaultErrorMap].filter((e6) => !!e6), issueData: { code: t2.ZodIssueCode.invalid_return_type, returnTypeError: a3 } });
      }
      let c3 = { errorMap: r3.common.contextualErrorMap }, l3 = r3.data;
      if (this._def.returns instanceof pe2) {
        let e5 = this;
        return (0, i2.OK)(async function(...n3) {
          let r4 = new t2.ZodError([]), i3 = await e5._def.args.parseAsync(n3, c3).catch((e6) => {
            throw r4.addIssue(o3(n3, e6)), r4;
          }), a3 = await Reflect.apply(l3, this, i3);
          return await e5._def.returns._def.type.parseAsync(a3, c3).catch((e6) => {
            throw r4.addIssue(s3(a3, e6)), r4;
          });
        });
      }
      {
        let e5 = this;
        return (0, i2.OK)(function(...n3) {
          let r4 = e5._def.args.safeParse(n3, c3);
          if (!r4.success) throw new t2.ZodError([o3(n3, r4.error)]);
          let i3 = Reflect.apply(l3, this, r4.data), a3 = e5._def.returns.safeParse(i3, c3);
          if (!a3.success) throw new t2.ZodError([s3(i3, a3.error)]);
          return a3.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t3) {
      return new e3({ ...this._def, args: re2.create(t3).rest(U2.create()) });
    }
    returns(t3) {
      return new e3({ ...this._def, returns: t3 });
    }
    implement(e4) {
      return this.parse(e4);
    }
    strictImplement(e4) {
      return this.parse(e4);
    }
    static create(t3, n3, r3) {
      return new e3({ args: t3 || re2.create([]).rest(U2.create()), returns: n3 || U2.create(), typeName: Z2.ZodFunction, ...c2(r3) });
    }
  };
  e2.ZodFunction = se2;
  var ce2 = class extends l2 {
    get schema() {
      return this._def.getter();
    }
    _parse(e3) {
      let { ctx: t3 } = this._processInputParams(e3);
      return this._def.getter()._parse({ data: t3.data, path: t3.path, parent: t3 });
    }
  };
  e2.ZodLazy = ce2, ce2.create = (e3, t3) => new ce2({ getter: e3, typeName: Z2.ZodLazy, ...c2(t3) });
  var le2 = class extends l2 {
    _parse(e3) {
      if (e3.data !== this._def.value) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { received: n3.data, code: t2.ZodIssueCode.invalid_literal, expected: this._def.value }), i2.INVALID;
      }
      return { status: `valid`, value: e3.data };
    }
    get value() {
      return this._def.value;
    }
  };
  e2.ZodLiteral = le2, le2.create = (e3, t3) => new le2({ value: e3, typeName: Z2.ZodLiteral, ...c2(t3) });
  function ue2(e3, t3) {
    return new de2({ values: e3, typeName: Z2.ZodEnum, ...c2(t3) });
  }
  var de2 = class e3 extends l2 {
    _parse(e4) {
      if (typeof e4.data != `string`) {
        let n3 = this._getOrReturnCtx(e4), r3 = this._def.values;
        return (0, i2.addIssueToContext)(n3, { expected: a2.util.joinValues(r3), received: n3.parsedType, code: t2.ZodIssueCode.invalid_type }), i2.INVALID;
      }
      if (this._cache ||= new Set(this._def.values), !this._cache.has(e4.data)) {
        let n3 = this._getOrReturnCtx(e4), r3 = this._def.values;
        return (0, i2.addIssueToContext)(n3, { received: n3.data, code: t2.ZodIssueCode.invalid_enum_value, options: r3 }), i2.INVALID;
      }
      return (0, i2.OK)(e4.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e4 = {};
      for (let t3 of this._def.values) e4[t3] = t3;
      return e4;
    }
    get Values() {
      let e4 = {};
      for (let t3 of this._def.values) e4[t3] = t3;
      return e4;
    }
    get Enum() {
      let e4 = {};
      for (let t3 of this._def.values) e4[t3] = t3;
      return e4;
    }
    extract(t3, n3 = this._def) {
      return e3.create(t3, { ...this._def, ...n3 });
    }
    exclude(t3, n3 = this._def) {
      return e3.create(this.options.filter((e4) => !t3.includes(e4)), { ...this._def, ...n3 });
    }
  };
  e2.ZodEnum = de2, de2.create = ue2;
  var fe2 = class extends l2 {
    _parse(e3) {
      let n3 = a2.util.getValidEnumValues(this._def.values), r3 = this._getOrReturnCtx(e3);
      if (r3.parsedType !== a2.ZodParsedType.string && r3.parsedType !== a2.ZodParsedType.number) {
        let e4 = a2.util.objectValues(n3);
        return (0, i2.addIssueToContext)(r3, { expected: a2.util.joinValues(e4), received: r3.parsedType, code: t2.ZodIssueCode.invalid_type }), i2.INVALID;
      }
      if (this._cache ||= new Set(a2.util.getValidEnumValues(this._def.values)), !this._cache.has(e3.data)) {
        let e4 = a2.util.objectValues(n3);
        return (0, i2.addIssueToContext)(r3, { received: r3.data, code: t2.ZodIssueCode.invalid_enum_value, options: e4 }), i2.INVALID;
      }
      return (0, i2.OK)(e3.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  e2.ZodNativeEnum = fe2, fe2.create = (e3, t3) => new fe2({ values: e3, typeName: Z2.ZodNativeEnum, ...c2(t3) });
  var pe2 = class extends l2 {
    unwrap() {
      return this._def.type;
    }
    _parse(e3) {
      let { ctx: n3 } = this._processInputParams(e3);
      if (n3.parsedType !== a2.ZodParsedType.promise && n3.common.async === false) return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.promise, received: n3.parsedType }), i2.INVALID;
      let r3 = n3.parsedType === a2.ZodParsedType.promise ? n3.data : Promise.resolve(n3.data);
      return (0, i2.OK)(r3.then((e4) => this._def.type.parseAsync(e4, { path: n3.path, errorMap: n3.common.contextualErrorMap })));
    }
  };
  e2.ZodPromise = pe2, pe2.create = (e3, t3) => new pe2({ type: e3, typeName: Z2.ZodPromise, ...c2(t3) });
  var me2 = class extends l2 {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === Z2.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e3) {
      let { status: t3, ctx: n3 } = this._processInputParams(e3), r3 = this._def.effect || null, o3 = { addIssue: (e4) => {
        (0, i2.addIssueToContext)(n3, e4), e4.fatal ? t3.abort() : t3.dirty();
      }, get path() {
        return n3.path;
      } };
      if (o3.addIssue = o3.addIssue.bind(o3), r3.type === `preprocess`) {
        let e4 = r3.transform(n3.data, o3);
        if (n3.common.async) return Promise.resolve(e4).then(async (e5) => {
          if (t3.value === `aborted`) return i2.INVALID;
          let r4 = await this._def.schema._parseAsync({ data: e5, path: n3.path, parent: n3 });
          return r4.status === `aborted` ? i2.INVALID : r4.status === `dirty` || t3.value === `dirty` ? (0, i2.DIRTY)(r4.value) : r4;
        });
        {
          if (t3.value === `aborted`) return i2.INVALID;
          let r4 = this._def.schema._parseSync({ data: e4, path: n3.path, parent: n3 });
          return r4.status === `aborted` ? i2.INVALID : r4.status === `dirty` || t3.value === `dirty` ? (0, i2.DIRTY)(r4.value) : r4;
        }
      }
      if (r3.type === `refinement`) {
        let e4 = (e5) => {
          let t4 = r3.refinement(e5, o3);
          if (n3.common.async) return Promise.resolve(t4);
          if (t4 instanceof Promise) throw Error(`Async refinement encountered during synchronous parse operation. Use .parseAsync instead.`);
          return e5;
        };
        if (n3.common.async === false) {
          let r4 = this._def.schema._parseSync({ data: n3.data, path: n3.path, parent: n3 });
          return r4.status === `aborted` ? i2.INVALID : (r4.status === `dirty` && t3.dirty(), e4(r4.value), { status: t3.value, value: r4.value });
        }
        return this._def.schema._parseAsync({ data: n3.data, path: n3.path, parent: n3 }).then((n4) => n4.status === `aborted` ? i2.INVALID : (n4.status === `dirty` && t3.dirty(), e4(n4.value).then(() => ({ status: t3.value, value: n4.value }))));
      }
      if (r3.type === `transform`) {
        if (n3.common.async === false) {
          let e4 = this._def.schema._parseSync({ data: n3.data, path: n3.path, parent: n3 });
          if (!(0, i2.isValid)(e4)) return i2.INVALID;
          let a3 = r3.transform(e4.value, o3);
          if (a3 instanceof Promise) throw Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          return { status: t3.value, value: a3 };
        }
        return this._def.schema._parseAsync({ data: n3.data, path: n3.path, parent: n3 }).then((e4) => (0, i2.isValid)(e4) ? Promise.resolve(r3.transform(e4.value, o3)).then((e5) => ({ status: t3.value, value: e5 })) : i2.INVALID);
      }
      a2.util.assertNever(r3);
    }
  };
  e2.ZodEffects = me2, e2.ZodTransformer = me2, me2.create = (e3, t3, n3) => new me2({ schema: e3, typeName: Z2.ZodEffects, effect: t3, ...c2(n3) }), me2.createWithPreprocess = (e3, t3, n3) => new me2({ schema: t3, effect: { type: `preprocess`, transform: e3 }, typeName: Z2.ZodEffects, ...c2(n3) });
  var he2 = class extends l2 {
    _parse(e3) {
      return this._getType(e3) === a2.ZodParsedType.undefined ? (0, i2.OK)(void 0) : this._def.innerType._parse(e3);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  e2.ZodOptional = he2, he2.create = (e3, t3) => new he2({ innerType: e3, typeName: Z2.ZodOptional, ...c2(t3) });
  var ge2 = class extends l2 {
    _parse(e3) {
      return this._getType(e3) === a2.ZodParsedType.null ? (0, i2.OK)(null) : this._def.innerType._parse(e3);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  e2.ZodNullable = ge2, ge2.create = (e3, t3) => new ge2({ innerType: e3, typeName: Z2.ZodNullable, ...c2(t3) });
  var _e2 = class extends l2 {
    _parse(e3) {
      let { ctx: t3 } = this._processInputParams(e3), n3 = t3.data;
      return t3.parsedType === a2.ZodParsedType.undefined && (n3 = this._def.defaultValue()), this._def.innerType._parse({ data: n3, path: t3.path, parent: t3 });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  e2.ZodDefault = _e2, _e2.create = (e3, t3) => new _e2({ innerType: e3, typeName: Z2.ZodDefault, defaultValue: typeof t3.default == `function` ? t3.default : () => t3.default, ...c2(t3) });
  var ve2 = class extends l2 {
    _parse(e3) {
      let { ctx: n3 } = this._processInputParams(e3), r3 = { ...n3, common: { ...n3.common, issues: [] } }, a3 = this._def.innerType._parse({ data: r3.data, path: r3.path, parent: { ...r3 } });
      return (0, i2.isAsync)(a3) ? a3.then((e4) => ({ status: `valid`, value: e4.status === `valid` ? e4.value : this._def.catchValue({ get error() {
        return new t2.ZodError(r3.common.issues);
      }, input: r3.data }) })) : { status: `valid`, value: a3.status === `valid` ? a3.value : this._def.catchValue({ get error() {
        return new t2.ZodError(r3.common.issues);
      }, input: r3.data }) };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  e2.ZodCatch = ve2, ve2.create = (e3, t3) => new ve2({ innerType: e3, typeName: Z2.ZodCatch, catchValue: typeof t3.catch == `function` ? t3.catch : () => t3.catch, ...c2(t3) });
  var ye2 = class extends l2 {
    _parse(e3) {
      if (this._getType(e3) !== a2.ZodParsedType.nan) {
        let n3 = this._getOrReturnCtx(e3);
        return (0, i2.addIssueToContext)(n3, { code: t2.ZodIssueCode.invalid_type, expected: a2.ZodParsedType.nan, received: n3.parsedType }), i2.INVALID;
      }
      return { status: `valid`, value: e3.data };
    }
  };
  e2.ZodNaN = ye2, ye2.create = (e3) => new ye2({ typeName: Z2.ZodNaN, ...c2(e3) }), e2.BRAND = Symbol(`zod_brand`);
  var be2 = class extends l2 {
    _parse(e3) {
      let { ctx: t3 } = this._processInputParams(e3), n3 = t3.data;
      return this._def.type._parse({ data: n3, path: t3.path, parent: t3 });
    }
    unwrap() {
      return this._def.type;
    }
  };
  e2.ZodBranded = be2;
  var xe2 = class e3 extends l2 {
    _parse(e4) {
      let { status: t3, ctx: n3 } = this._processInputParams(e4);
      if (n3.common.async) return (async () => {
        let e5 = await this._def.in._parseAsync({ data: n3.data, path: n3.path, parent: n3 });
        return e5.status === `aborted` ? i2.INVALID : e5.status === `dirty` ? (t3.dirty(), (0, i2.DIRTY)(e5.value)) : this._def.out._parseAsync({ data: e5.value, path: n3.path, parent: n3 });
      })();
      {
        let e5 = this._def.in._parseSync({ data: n3.data, path: n3.path, parent: n3 });
        return e5.status === `aborted` ? i2.INVALID : e5.status === `dirty` ? (t3.dirty(), { status: `dirty`, value: e5.value }) : this._def.out._parseSync({ data: e5.value, path: n3.path, parent: n3 });
      }
    }
    static create(t3, n3) {
      return new e3({ in: t3, out: n3, typeName: Z2.ZodPipeline });
    }
  };
  e2.ZodPipeline = xe2;
  var Se2 = class extends l2 {
    _parse(e3) {
      let t3 = this._def.innerType._parse(e3), n3 = (e4) => ((0, i2.isValid)(e4) && (e4.value = Object.freeze(e4.value)), e4);
      return (0, i2.isAsync)(t3) ? t3.then((e4) => n3(e4)) : n3(t3);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  e2.ZodReadonly = Se2, Se2.create = (e3, t3) => new Se2({ innerType: e3, typeName: Z2.ZodReadonly, ...c2(t3) });
  function Ce2(e3, t3) {
    let n3 = typeof e3 == `function` ? e3(t3) : typeof e3 == `string` ? { message: e3 } : e3;
    return typeof n3 == `string` ? { message: n3 } : n3;
  }
  function we2(e3, t3 = {}, n3) {
    return e3 ? H2.create().superRefine((r3, i3) => {
      let a3 = e3(r3);
      if (a3 instanceof Promise) return a3.then((e4) => {
        if (!e4) {
          let e5 = Ce2(t3, r3), a4 = e5.fatal ?? n3 ?? true;
          i3.addIssue({ code: `custom`, ...e5, fatal: a4 });
        }
      });
      if (!a3) {
        let e4 = Ce2(t3, r3), a4 = e4.fatal ?? n3 ?? true;
        i3.addIssue({ code: `custom`, ...e4, fatal: a4 });
      }
    }) : H2.create();
  }
  e2.late = { object: J2.lazycreate };
  var Z2;
  (function(e3) {
    e3.ZodString = `ZodString`, e3.ZodNumber = `ZodNumber`, e3.ZodNaN = `ZodNaN`, e3.ZodBigInt = `ZodBigInt`, e3.ZodBoolean = `ZodBoolean`, e3.ZodDate = `ZodDate`, e3.ZodSymbol = `ZodSymbol`, e3.ZodUndefined = `ZodUndefined`, e3.ZodNull = `ZodNull`, e3.ZodAny = `ZodAny`, e3.ZodUnknown = `ZodUnknown`, e3.ZodNever = `ZodNever`, e3.ZodVoid = `ZodVoid`, e3.ZodArray = `ZodArray`, e3.ZodObject = `ZodObject`, e3.ZodUnion = `ZodUnion`, e3.ZodDiscriminatedUnion = `ZodDiscriminatedUnion`, e3.ZodIntersection = `ZodIntersection`, e3.ZodTuple = `ZodTuple`, e3.ZodRecord = `ZodRecord`, e3.ZodMap = `ZodMap`, e3.ZodSet = `ZodSet`, e3.ZodFunction = `ZodFunction`, e3.ZodLazy = `ZodLazy`, e3.ZodLiteral = `ZodLiteral`, e3.ZodEnum = `ZodEnum`, e3.ZodEffects = `ZodEffects`, e3.ZodNativeEnum = `ZodNativeEnum`, e3.ZodOptional = `ZodOptional`, e3.ZodNullable = `ZodNullable`, e3.ZodDefault = `ZodDefault`, e3.ZodCatch = `ZodCatch`, e3.ZodPromise = `ZodPromise`, e3.ZodBranded = `ZodBranded`, e3.ZodPipeline = `ZodPipeline`, e3.ZodReadonly = `ZodReadonly`;
  })(Z2 || (e2.ZodFirstPartyTypeKind = Z2 = {})), e2.instanceof = (e3, t3 = { message: `Input not instance of ${e3.name}` }) => we2((t4) => t4 instanceof e3, t3);
  let Q2 = N2.create;
  e2.string = Q2;
  let Te2 = F2.create;
  e2.number = Te2, e2.nan = ye2.create, e2.bigint = I2.create;
  let Ee2 = L2.create;
  e2.boolean = Ee2, e2.date = R2.create, e2.symbol = z2.create, e2.undefined = B2.create, e2.null = V2.create, e2.any = H2.create, e2.unknown = U2.create, e2.never = W2.create, e2.void = G2.create, e2.array = K2.create, e2.object = J2.create, e2.strictObject = J2.strictCreate, e2.union = Y2.create, e2.discriminatedUnion = ee2.create, e2.intersection = ne2.create, e2.tuple = re2.create, e2.record = ie2.create, e2.map = ae2.create, e2.set = oe2.create, e2.function = se2.create, e2.lazy = ce2.create, e2.literal = le2.create, e2.enum = de2.create, e2.nativeEnum = fe2.create, e2.promise = pe2.create;
  let De2 = me2.create;
  e2.effect = De2, e2.transformer = De2, e2.optional = he2.create, e2.nullable = ge2.create, e2.preprocess = me2.createWithPreprocess, e2.pipeline = xe2.create, e2.ostring = () => Q2().optional(), e2.onumber = () => Te2().optional(), e2.oboolean = () => Ee2().optional(), e2.coerce = { string: ((e3) => N2.create({ ...e3, coerce: true })), number: ((e3) => F2.create({ ...e3, coerce: true })), boolean: ((e3) => L2.create({ ...e3, coerce: true })), bigint: ((e3) => I2.create({ ...e3, coerce: true })), date: ((e3) => R2.create({ ...e3, coerce: true })) }, e2.NEVER = i2.INVALID;
})), Et = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(xt(), e2), n2(St(), e2), n2(Ct(), e2), n2(vt(), e2), n2(Tt(), e2), n2(yt(), e2);
})), Dt = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3);
    var i3 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i3 || (`get` in i3 ? !t3.__esModule : i3.writable || i3.configurable)) && (i3 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r3, i3);
  }) : (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3), e3[r3] = t3[n3];
  })), n2 = e2 && e2.__setModuleDefault || (Object.create ? (function(e3, t3) {
    Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
  }) : function(e3, t3) {
    e3.default = t3;
  }), r2 = e2 && e2.__importStar || function(e3) {
    if (e3 && e3.__esModule) return e3;
    var r3 = {};
    if (e3 != null) for (var i3 in e3) i3 !== "default" && Object.prototype.hasOwnProperty.call(e3, i3) && t2(r3, e3, i3);
    return n2(r3, e3), r3;
  }, i2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r3 in e3) r3 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r3) && t2(n3, e3, r3);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.z = void 0;
  let a2 = r2(Et());
  e2.z = a2, i2(Et(), e2), e2.default = a2;
})), Ot = r({ author: () => Mt, default: () => Vt, dependencies: () => Lt, devDependencies: () => It, files: () => Pt, license: () => `MIT`, main: () => Nt, name: () => kt, packageManager: () => Bt, peerDependencies: () => Rt, publishConfig: () => zt, repository: () => jt, scripts: () => Ft, version: () => At }), kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht = n((() => {
  kt = `@ton/ton`, At = `16.3.0`, jt = `https://github.com/ton-org/ton.git`, Mt = `Whales Corp. <developers@whalescorp.com>`, Nt = `dist/index.js`, Pt = [`dist`, `!*.test.*`, `!*.spec.*`, `!*.trait.*`, `!__snapshots__`, `!__testdata__`, `!__tests__`], Ft = { build: `rm -fr dist && tsc -p ./tsconfig.build.json`, typecheck: `tsc`, test: `jest --verbose`, format: `biome format --write .`, "format:check": `biome format .`, coverage: `jest -c ./jest-coverage.config.js`, release: `yarn build && yarn release-it --npm.yarn1` }, It = { "@biomejs/biome": `2.3.8`, "@release-it/keep-a-changelog": `^5.0.0`, "@swc/core": `^1.15.3`, "@swc/jest": `^0.2.39`, "@ton/core": `^0.63.0`, "@ton/crypto": `3.2.0`, "@ton/sandbox": `^0.40.0`, "@ton/test-utils": `^0.12.0`, "@types/jest": `^29.5.12`, "@types/node": `^20.11.30`, jest: `^29.7.0`, "release-it": `^17.1.1`, typescript: `^5.6.3` }, Lt = { axios: `^1.15.0`, dataloader: `^2.0.0`, zod: `^3.21.4` }, Rt = { "@ton/core": `>=0.63.0 <1.0.0`, "@ton/crypto": `>=3.2.0` }, zt = { access: `public`, registry: `https://registry.npmjs.org/` }, Bt = `yarn@3.4.1`, Vt = { name: kt, version: At, repository: jt, author: Mt, license: `MIT`, main: Nt, files: Pt, scripts: Ft, devDependencies: It, dependencies: Lt, peerDependencies: Rt, publishConfig: zt, "release-it": { github: { release: true }, plugins: { "@release-it/keep-a-changelog": { filename: `CHANGELOG.md` } } }, packageManager: Bt };
})), Ut = i(((t2) => {
  var n2 = t2 && t2.__importDefault || function(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.HttpApi = void 0;
  let r2 = ht(), i2 = n2(gt()), a2 = n2(_t()), o2 = Dt(), s2 = (Ht(), e(Ot).default).version, c2 = o2.z.object({ "@type": o2.z.literal(`ton.blockIdExt`), workchain: o2.z.number(), shard: o2.z.string(), seqno: o2.z.number(), root_hash: o2.z.string(), file_hash: o2.z.string() }), l2 = o2.z.object({ balance: o2.z.union([o2.z.number(), o2.z.string()]), extra_currencies: o2.z.optional(o2.z.array(o2.z.object({ "@type": o2.z.literal(`extraCurrency`), id: o2.z.number(), amount: o2.z.string() }))), state: o2.z.union([o2.z.literal(`active`), o2.z.literal(`uninitialized`), o2.z.literal(`frozen`)]), data: o2.z.string(), code: o2.z.string(), last_transaction_id: o2.z.object({ "@type": o2.z.literal(`internal.transactionId`), lt: o2.z.string(), hash: o2.z.string() }), block_id: c2, sync_utime: o2.z.number() }), u2 = o2.z.object({ "@type": o2.z.literal(`ok`) }), d2 = o2.z.object({ "@type": o2.z.literal(`query.fees`), source_fees: o2.z.object({ "@type": o2.z.literal(`fees`), in_fwd_fee: o2.z.number(), storage_fee: o2.z.number(), gas_fee: o2.z.number(), fwd_fee: o2.z.number() }) }), f2 = o2.z.object({ gas_used: o2.z.number(), exit_code: o2.z.number(), stack: o2.z.array(o2.z.unknown()) }), p2 = o2.z.union([o2.z.object({ "@type": o2.z.literal(`msg.dataRaw`), body: o2.z.string() }), o2.z.object({ "@type": o2.z.literal(`msg.dataText`), text: o2.z.string() }), o2.z.object({ "@type": o2.z.literal(`msg.dataDecryptedText`), text: o2.z.string() }), o2.z.object({ "@type": o2.z.literal(`msg.dataEncryptedText`), text: o2.z.string() })]), m2 = o2.z.object({ source: o2.z.string(), destination: o2.z.string(), value: o2.z.string(), fwd_fee: o2.z.string(), ihr_fee: o2.z.string(), created_lt: o2.z.string(), body_hash: o2.z.string(), msg_data: p2, message: o2.z.string().optional() }), h2 = o2.z.object({ data: o2.z.string(), utime: o2.z.number(), transaction_id: o2.z.object({ lt: o2.z.string(), hash: o2.z.string() }), fee: o2.z.string(), storage_fee: o2.z.string(), other_fee: o2.z.string(), in_msg: o2.z.union([o2.z.undefined(), m2]), out_msgs: o2.z.array(m2) }), g2 = o2.z.array(h2), _2 = o2.z.object({ state_root_hash: o2.z.string(), last: c2, init: c2 }), v2 = o2.z.object({ shards: o2.z.array(c2) }), y2 = o2.z.object({ "@type": o2.z.literal(`blocks.shortTxId`), mode: o2.z.number(), account: o2.z.string(), lt: o2.z.string(), hash: o2.z.string() }), b2 = o2.z.object({ id: c2, req_count: o2.z.number(), incomplete: o2.z.boolean(), transactions: o2.z.array(y2) });
  var x2 = class {
    constructor(e2, t3, n3, r3) {
      this.namespace = e2, this.cache = t3, this.codec = n3, this.keyEncoder = r3;
    }
    async get(e2) {
      let t3 = await this.cache.get(this.namespace, this.keyEncoder(e2));
      if (t3) {
        let e3 = this.codec.safeParse(JSON.parse(t3));
        if (e3.success) return e3.data;
      }
      return null;
    }
    async set(e2, t3) {
      t3 === null ? await this.cache.set(this.namespace, this.keyEncoder(e2), null) : await this.cache.set(this.namespace, this.keyEncoder(e2), JSON.stringify(t3));
    }
  };
  t2.HttpApi = class {
    constructor(e2, t3) {
      this.endpoint = e2, this.cache = new r2.InMemoryCache(), this.parameters = { timeout: t3?.timeout || 3e4, apiKey: t3?.apiKey, adapter: t3?.adapter }, this.shardCache = new x2(`ton-shard`, this.cache, o2.z.array(c2), (e3) => e3 + ``), this.shardLoader = new i2.default(async (e3) => await Promise.all(e3.map(async (e4) => {
        let t4 = await this.shardCache.get(e4);
        if (t4) return t4;
        let n3 = (await this.doCall(`shards`, { seqno: e4 }, v2)).shards;
        return await this.shardCache.set(e4, n3), n3;
      }))), this.shardTransactionsCache = new x2(`ton-shard-tx`, this.cache, b2, (e3) => e3.workchain + `:` + e3.shard + `:` + e3.seqno), this.shardTransactionsLoader = new i2.default(async (e3) => await Promise.all(e3.map(async (e4) => {
        let t4 = await this.shardTransactionsCache.get(e4);
        if (t4) return t4;
        let n3 = await this.doCall(`getBlockTransactions`, { workchain: e4.workchain, seqno: e4.seqno, shard: e4.shard }, b2);
        return await this.shardTransactionsCache.set(e4, n3), n3;
      })), { cacheKeyFn: (e3) => e3.workchain + `:` + e3.shard + `:` + e3.seqno });
    }
    getAddressInformation(e2) {
      return this.doCall(`getAddressInformation`, { address: e2.toString() }, l2);
    }
    async getTransactions(e2, t3) {
      let n3 = t3.inclusive;
      delete t3.inclusive;
      let r3;
      t3.hash && (r3 = Buffer.from(t3.hash, `base64`).toString(`hex`));
      let i3 = t3.limit;
      t3.hash && t3.lt && n3 !== true && i3++;
      let a3 = await this.doCall(`getTransactions`, { address: e2.toString(), ...t3, limit: i3, hash: r3 }, g2);
      return a3.length > i3 && (a3 = a3.slice(0, i3)), t3.hash && t3.lt && n3 !== true && a3.shift(), a3;
    }
    async getMasterchainInfo() {
      return await this.doCall(`getMasterchainInfo`, {}, _2);
    }
    async getShards(e2) {
      return await this.shardLoader.load(e2);
    }
    async getBlockTransactions(e2, t3, n3) {
      return await this.shardTransactionsLoader.load({ workchain: e2, seqno: t3, shard: n3 });
    }
    async getTransaction(e2, t3, n3) {
      let r3 = Buffer.from(n3, `base64`).toString(`hex`);
      return (await this.doCall(`getTransactions`, { address: e2.toString(), lt: t3, hash: r3, limit: 1 }, g2)).find((e3) => e3.transaction_id.lt === t3 && e3.transaction_id.hash === n3) || null;
    }
    async callGetMethod(e2, t3, n3) {
      return await this.doCall(`runGetMethod`, { address: e2.toString(), method: t3, stack: S2(n3) }, f2);
    }
    async sendBoc(e2) {
      await this.doCall(`sendBoc`, { boc: e2.toString(`base64`) }, u2);
    }
    async estimateFee(e2, t3) {
      return await this.doCall(`estimateFee`, { address: e2.toString(), body: t3.body.toBoc().toString(`base64`), init_data: t3.initData ? t3.initData.toBoc().toString(`base64`) : ``, init_code: t3.initCode ? t3.initCode.toBoc().toString(`base64`) : ``, ignore_chksig: t3.ignoreSignature }, d2);
    }
    async tryLocateResultTx(e2, t3, n3) {
      return await this.doCall(`tryLocateResultTx`, { source: e2.toString(), destination: t3.toString(), created_lt: n3 }, h2);
    }
    async tryLocateSourceTx(e2, t3, n3) {
      return await this.doCall(`tryLocateSourceTx`, { source: e2.toString(), destination: t3.toString(), created_lt: n3 }, h2);
    }
    async doCall(e2, t3, n3) {
      let r3 = { "Content-Type": `application/json`, "X-Ton-Client-Version": s2 };
      this.parameters.apiKey && (r3[`X-API-Key`] = this.parameters.apiKey);
      let i3 = await a2.default.post(this.endpoint, JSON.stringify({ id: `1`, jsonrpc: `2.0`, method: e2, params: t3 }), { headers: r3, timeout: this.parameters.timeout, adapter: this.parameters.adapter });
      if (i3.status !== 200 || !i3.data.ok) throw Error(`Received error: ` + JSON.stringify(i3.data));
      let o3 = n3.safeParse(i3.data.result);
      if (o3.success) return o3.data;
      throw Error(`Malformed response: ` + o3.error.format()._errors.join(`, `));
    }
  };
  function S2(e2) {
    let t3 = [];
    for (let n3 of e2) if (n3.type === `int`) t3.push([`num`, n3.value.toString()]);
    else if (n3.type === `cell`) t3.push([`tvm.Cell`, n3.cell.toBoc().toString(`base64`)]);
    else if (n3.type === `slice`) t3.push([`tvm.Slice`, n3.cell.toBoc().toString(`base64`)]);
    else if (n3.type === `builder`) t3.push([`tvm.Builder`, n3.cell.toBoc().toString(`base64`)]);
    else throw Error(`Unsupported stack item type: ` + n3.type);
    return t3;
  }
})), Wt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.TonClient = void 0;
  let t2 = Ut(), n2 = mt();
  e2.TonClient = class {
    constructor(e3) {
      this.parameters = { endpoint: e3.endpoint }, this.api = new t2.HttpApi(this.parameters.endpoint, { timeout: e3.timeout, apiKey: e3.apiKey, adapter: e3.httpAdapter });
    }
    async getBalance(e3) {
      return (await this.getContractState(e3)).balance;
    }
    async runMethod(e3, t3, n3 = []) {
      let r3 = await this.api.callGetMethod(e3, t3, n3);
      if (r3.exit_code !== 0) throw Error(`Unable to execute get method. Got exit_code: ` + r3.exit_code);
      return { gas_used: r3.gas_used, stack: a2(r3.stack) };
    }
    async callGetMethod(e3, t3, n3 = []) {
      return this.runMethod(e3, t3, n3);
    }
    async runMethodWithError(e3, t3, n3 = []) {
      let r3 = await this.api.callGetMethod(e3, t3, n3);
      return { gas_used: r3.gas_used, stack: a2(r3.stack), exit_code: r3.exit_code };
    }
    async callGetMethodWithError(e3, t3, n3 = []) {
      return this.runMethodWithError(e3, t3, n3);
    }
    async getTransactions(e3, t3) {
      let r3 = await this.api.getTransactions(e3, t3), i3 = [];
      for (let e4 of r3) i3.push((0, n2.loadTransaction)(n2.Cell.fromBoc(Buffer.from(e4.data, `base64`))[0].beginParse()));
      return i3;
    }
    async getTransaction(e3, t3, r3) {
      let i3 = await this.api.getTransaction(e3, t3, r3);
      return i3 ? (0, n2.loadTransaction)(n2.Cell.fromBoc(Buffer.from(i3.data, `base64`))[0].beginParse()) : null;
    }
    async tryLocateResultTx(e3, t3, r3) {
      let i3 = await this.api.tryLocateResultTx(e3, t3, r3);
      return (0, n2.loadTransaction)(n2.Cell.fromBase64(i3.data).beginParse());
    }
    async tryLocateSourceTx(e3, t3, r3) {
      let i3 = await this.api.tryLocateSourceTx(e3, t3, r3);
      return (0, n2.loadTransaction)(n2.Cell.fromBase64(i3.data).beginParse());
    }
    async getMasterchainInfo() {
      let e3 = await this.api.getMasterchainInfo();
      return { workchain: e3.init.workchain, shard: e3.last.shard, initSeqno: e3.init.seqno, latestSeqno: e3.last.seqno };
    }
    async getWorkchainShards(e3) {
      return (await this.api.getShards(e3)).map((e4) => ({ workchain: e4.workchain, shard: e4.shard, seqno: e4.seqno }));
    }
    async getShardTransactions(e3, t3, r3) {
      let i3 = await this.api.getBlockTransactions(e3, t3, r3);
      if (i3.incomplete) throw Error(`Unsupported`);
      return i3.transactions.map((e4) => ({ account: n2.Address.parseRaw(e4.account), lt: e4.lt, hash: e4.hash }));
    }
    async sendMessage(e3) {
      let t3 = (0, n2.beginCell)().store((0, n2.storeMessage)(e3)).endCell().toBoc();
      await this.api.sendBoc(t3);
    }
    async sendFile(e3) {
      await this.api.sendBoc(e3);
    }
    async estimateExternalMessageFee(e3, t3) {
      return await this.api.estimateFee(e3, { body: t3.body, initCode: t3.initCode, initData: t3.initData, ignoreSignature: t3.ignoreSignature });
    }
    async sendExternalMessage(e3, t3) {
      if (await this.isContractDeployed(e3.address) || !e3.init) {
        let r3 = (0, n2.external)({ to: e3.address, body: t3 });
        await this.sendMessage(r3);
      } else {
        let r3 = (0, n2.external)({ to: e3.address, init: e3.init, body: t3 });
        await this.sendMessage(r3);
      }
    }
    async isContractDeployed(e3) {
      return (await this.getContractState(e3)).state === `active`;
    }
    async getContractState(e3) {
      let t3 = await this.api.getAddressInformation(e3), n3 = BigInt(t3.balance), r3 = t3.state;
      return { balance: n3, extra_currencies: t3.extra_currencies, state: r3, code: t3.code === `` ? null : Buffer.from(t3.code, `base64`), data: t3.data === `` ? null : Buffer.from(t3.data, `base64`), lastTransaction: t3.last_transaction_id.lt === `0` ? null : { lt: t3.last_transaction_id.lt, hash: t3.last_transaction_id.hash }, blockId: { workchain: t3.block_id.workchain, shard: t3.block_id.shard, seqno: t3.block_id.seqno }, timestampt: t3.sync_utime };
    }
    open(e3) {
      return (0, n2.openContract)(e3, (e4) => o2(this, e4.address, e4.init));
    }
    provider(e3, t3) {
      return o2(this, e3, t3 ?? null);
    }
  };
  function r2(e3) {
    let t3 = e3[`@type`];
    switch (t3) {
      case `tvm.list`:
      case `tvm.tuple`:
        return e3.elements.map(r2);
      case `tvm.cell`:
        return n2.Cell.fromBoc(Buffer.from(e3.bytes, `base64`))[0];
      case `tvm.slice`:
        return n2.Cell.fromBoc(Buffer.from(e3.bytes, `base64`))[0];
      case `tvm.stackEntryCell`:
        return r2(e3.cell);
      case `tvm.stackEntrySlice`:
        return r2(e3.slice);
      case `tvm.stackEntryTuple`:
        return r2(e3.tuple);
      case `tvm.stackEntryList`:
        return r2(e3.list);
      case `tvm.stackEntryNumber`:
        return r2(e3.number);
      case `tvm.numberDecimal`:
        return BigInt(e3.number);
      default:
        throw Error(`Unsupported item type: ` + t3);
    }
  }
  function i2(e3) {
    if (e3[0] === `num`) {
      let t3 = e3[1];
      return t3.startsWith(`-`) ? { type: `int`, value: -BigInt(t3.slice(1)) } : { type: `int`, value: BigInt(t3) };
    }
    if (e3[0] === `null`) return { type: `null` };
    if (e3[0] === `cell`) return { type: `cell`, cell: n2.Cell.fromBoc(Buffer.from(e3[1].bytes, `base64`))[0] };
    if (e3[0] === `slice`) return { type: `slice`, cell: n2.Cell.fromBoc(Buffer.from(e3[1].bytes, `base64`))[0] };
    if (e3[0] === `builder`) return { type: `builder`, cell: n2.Cell.fromBoc(Buffer.from(e3[1].bytes, `base64`))[0] };
    if (e3[0] === `tuple` || e3[0] === `list`) return e3[1].elements.length === 0 ? { type: `null` } : { type: `tuple`, items: e3[1].elements.map(r2) };
    throw Error(`Unsupported stack item type: ` + e3[0]);
  }
  function a2(e3) {
    let t3 = [];
    for (let n3 of e3) t3.push(i2(n3));
    return new n2.TupleReader(t3);
  }
  function o2(e3, t3, r3) {
    return { async getState() {
      let n3 = await e3.getContractState(t3), r4 = n3.balance, i3 = n3.lastTransaction ? { lt: BigInt(n3.lastTransaction.lt), hash: Buffer.from(n3.lastTransaction.hash, `base64`) } : null, a3 = null, o3;
      if (n3.state === `active`) o3 = { type: `active`, code: n3.code ? n3.code : null, data: n3.data ? n3.data : null };
      else if (n3.state === `uninitialized`) o3 = { type: `uninit` };
      else if (n3.state === `frozen`) o3 = { type: `frozen`, stateHash: Buffer.alloc(0) };
      else throw Error(`Unsupported state`);
      if (n3.extra_currencies && n3.extra_currencies.length > 0) {
        a3 = {};
        for (let e4 of n3.extra_currencies) a3[e4.id] = BigInt(e4.amount);
      }
      return { balance: r4, extracurrency: a3, last: i3, state: o3 };
    }, async get(n3, r4) {
      if (typeof n3 != `string`) throw Error(`Method name must be a string for TonClient provider`);
      return { stack: (await e3.runMethod(t3, n3, r4)).stack };
    }, async external(i3) {
      let a3 = null;
      r3 && !await e3.isContractDeployed(t3) && (a3 = r3);
      let o3 = (0, n2.external)({ to: t3, init: a3, body: i3 }), s2 = (0, n2.beginCell)().store((0, n2.storeMessage)(o3)).endCell().toBoc();
      await e3.sendFile(s2);
    }, async internal(i3, a3) {
      let o3 = null;
      r3 && !await e3.isContractDeployed(t3) && (o3 = r3);
      let s2 = true;
      a3.bounce !== null && a3.bounce !== void 0 && (s2 = a3.bounce);
      let c2;
      c2 = typeof a3.value == `string` ? (0, n2.toNano)(a3.value) : a3.value;
      let l2 = null;
      typeof a3.body == `string` ? l2 = (0, n2.comment)(a3.body) : a3.body && (l2 = a3.body), await i3.send({ to: t3, value: c2, bounce: s2, sendMode: a3.sendMode, extracurrency: a3.extracurrency, init: o3, body: l2 });
    }, open(t4) {
      return (0, n2.openContract)(t4, (t5) => o2(e3, t5.address, t5.init ?? null));
    }, getTransactions(t4, n3, r4, i3) {
      return e3.getTransactions(t4, { limit: i3 ?? 100, lt: n3.toString(), hash: r4.toString(`base64`), inclusive: true });
    } };
  }
})), Gt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.toUrlSafe = t2;
  function t2(e3) {
    for (; e3.indexOf(`/`) >= 0; ) e3 = e3.replace(`/`, `_`);
    for (; e3.indexOf(`+`) >= 0; ) e3 = e3.replace(`+`, `-`);
    for (; e3.indexOf(`=`) >= 0; ) e3 = e3.replace(`=`, ``);
    return e3;
  }
})), Kt = i(((e2) => {
  var t2 = e2 && e2.__classPrivateFieldSet || function(e3, t3, n3, r3, i3) {
    if (r3 === `m`) throw TypeError(`Private method is not writable`);
    if (r3 === `a` && !i3) throw TypeError(`Private accessor was defined without a setter`);
    if (typeof t3 == `function` ? e3 !== t3 || !i3 : !t3.has(e3)) throw TypeError(`Cannot write private member to an object whose class did not declare it`);
    return r3 === `a` ? i3.call(e3, n3) : i3 ? i3.value = n3 : t3.set(e3, n3), n3;
  }, n2 = e2 && e2.__classPrivateFieldGet || function(e3, t3, n3, r3) {
    if (n3 === `a` && !r3) throw TypeError(`Private accessor was defined without a getter`);
    if (typeof t3 == `function` ? e3 !== t3 || !r3 : !t3.has(e3)) throw TypeError(`Cannot read private member from an object whose class did not declare it`);
    return n3 === `m` ? r3 : n3 === `a` ? r3.call(e3) : r3 ? r3.value : t3.get(e3);
  }, r2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  }, i2, a2, o2, s2;
  Object.defineProperty(e2, "__esModule", { value: true }), e2.TonClient4 = void 0;
  let c2 = r2(_t()), l2 = mt(), u2 = Gt(), d2 = Dt();
  e2.TonClient4 = class {
    constructor(e3) {
      i2.set(this, void 0), a2.set(this, void 0), o2.set(this, void 0), s2.set(this, void 0), t2(this, s2, c2.default.create(), `f`), t2(this, i2, e3.endpoint, `f`), t2(this, a2, e3.timeout || 5e3, `f`), t2(this, o2, e3.httpAdapter, `f`), e3.requestInterceptor && n2(this, s2, `f`).interceptors.request.use(e3.requestInterceptor);
    }
    async getLastBlock() {
      let e3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/latest`, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), t3 = p2.safeParse(e3.data);
      if (!t3.success) throw Error(`Mailformed response: ` + t3.error.format()._errors.join(`, `));
      return t3.data;
    }
    async getBlock(e3) {
      let t3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/` + e3, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), r3 = m2.safeParse(t3.data);
      if (!r3.success) throw Error(`Mailformed response`);
      if (!r3.data.exist) throw Error(`Block is out of scope`);
      return r3.data.block;
    }
    async getBlockByUtime(e3) {
      let t3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/utime/` + e3, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), r3 = m2.safeParse(t3.data);
      if (!r3.success) throw Error(`Mailformed response`);
      if (!r3.data.exist) throw Error(`Block is out of scope`);
      return r3.data.block;
    }
    async getAccount(e3, t3) {
      let r3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/` + e3 + `/` + t3.toString({ urlSafe: true }), { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), c3 = g2.safeParse(r3.data);
      if (!c3.success) throw Error(`Mailformed response`);
      return c3.data;
    }
    async getAccountLite(e3, t3) {
      let r3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/` + e3 + `/` + t3.toString({ urlSafe: true }) + `/lite`, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), c3 = _2.safeParse(r3.data);
      if (!c3.success) throw Error(`Mailformed response`);
      return c3.data;
    }
    async isContractDeployed(e3, t3) {
      return (await this.getAccountLite(e3, t3)).account.state.type === `active`;
    }
    async isAccountChanged(e3, t3, r3) {
      let c3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/` + e3 + `/` + t3.toString({ urlSafe: true }) + `/changed/` + r3.toString(10), { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), l3 = v2.safeParse(c3.data);
      if (!l3.success) throw Error(`Mailformed response`);
      return l3.data;
    }
    async getAccountTransactions(e3, t3, r3) {
      let c3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/account/` + e3.toString({ urlSafe: true }) + `/tx/` + t3.toString(10) + `/` + (0, u2.toUrlSafe)(r3.toString(`base64`)), { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), d3 = C2.safeParse(c3.data);
      if (!d3.success) throw Error(`Mailformed response`);
      let f3 = d3.data, p3 = [], m3 = l2.Cell.fromBoc(Buffer.from(f3.boc, `base64`));
      for (let e4 = 0; e4 < f3.blocks.length; e4++) p3.push({ block: f3.blocks[e4], tx: (0, l2.loadTransaction)(m3[e4].beginParse()) });
      return p3;
    }
    async getAccountTransactionsParsed(e3, t3, r3, c3 = 20) {
      let l3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/account/` + e3.toString({ urlSafe: true }) + `/tx/parsed/` + t3.toString(10) + `/` + (0, u2.toUrlSafe)(r3.toString(`base64`)), { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`), params: { count: c3 } }), d3 = F2.safeParse(l3.data);
      if (!d3.success) throw Error(`Mailformed response`);
      return d3.data;
    }
    async getConfig(e3, t3) {
      let r3 = ``;
      t3 && t3.length > 0 && (r3 = `/` + [...t3].sort().join(`,`));
      let c3 = await n2(this, s2, `f`).get(n2(this, i2, `f`) + `/block/` + e3 + `/config` + r3, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), l3 = b2.safeParse(c3.data);
      if (!l3.success) throw Error(`Mailformed response`);
      return l3.data;
    }
    async runMethod(e3, t3, r3, c3) {
      let d3 = c3 && c3.length > 0 ? `/` + (0, u2.toUrlSafe)((0, l2.serializeTuple)(c3).toBoc({ idx: false, crc32: false }).toString(`base64`)) : ``, f3 = n2(this, i2, `f`) + `/block/` + e3 + `/` + t3.toString({ urlSafe: true }) + `/run/` + encodeURIComponent(r3) + d3, p3 = await n2(this, s2, `f`).get(f3, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) }), m3 = y2.safeParse(p3.data);
      if (!m3.success) throw Error(`Mailformed response`);
      let h3 = m3.data.resultRaw ? (0, l2.parseTuple)(l2.Cell.fromBoc(Buffer.from(m3.data.resultRaw, `base64`))[0]) : [];
      return { exitCode: m3.data.exitCode, result: h3, resultRaw: m3.data.resultRaw, block: m3.data.block, shardBlock: m3.data.shardBlock, reader: new l2.TupleReader(h3) };
    }
    async sendMessage(e3) {
      let t3 = await n2(this, s2, `f`).post(n2(this, i2, `f`) + `/send`, { boc: e3.toString(`base64`) }, { adapter: n2(this, o2, `f`), timeout: n2(this, a2, `f`) });
      if (!x2.safeParse(t3.data).success) throw Error(`Mailformed response`);
      return { status: t3.data.status };
    }
    open(e3) {
      return (0, l2.openContract)(e3, (e4) => f2(this, null, e4.address, e4.init));
    }
    openAt(e3, t3) {
      return (0, l2.openContract)(t3, (t4) => f2(this, e3, t4.address, t4.init));
    }
    provider(e3, t3) {
      return f2(this, null, e3, t3 ?? null);
    }
    providerAt(e3, t3, n3) {
      return f2(this, e3, t3, n3 ?? null);
    }
  }, i2 = /* @__PURE__ */ new WeakMap(), a2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap();
  function f2(e3, t3, n3, r3) {
    return { async getState() {
      let r4 = t3;
      r4 === null && (r4 = (await e3.getLastBlock()).last.seqno);
      let i3 = await e3.getAccount(r4, n3), a3 = i3.account.last ? { lt: BigInt(i3.account.last.lt), hash: Buffer.from(i3.account.last.hash, `base64`) } : null, o3;
      if (i3.account.state.type === `active`) o3 = { type: `active`, code: i3.account.state.code ? Buffer.from(i3.account.state.code, `base64`) : null, data: i3.account.state.data ? Buffer.from(i3.account.state.data, `base64`) : null };
      else if (i3.account.state.type === `uninit`) o3 = { type: `uninit` };
      else if (i3.account.state.type === `frozen`) o3 = { type: `frozen`, stateHash: Buffer.from(i3.account.state.stateHash, `base64`) };
      else throw Error(`Unsupported state`);
      let s3 = null;
      if (i3.account.balance.currencies) {
        s3 = {};
        let e4 = i3.account.balance.currencies;
        for (let [t4, n4] of Object.entries(e4)) s3[Number(t4)] = BigInt(n4);
      }
      return { balance: BigInt(i3.account.balance.coins), extracurrency: s3, last: a3, state: o3 };
    }, async get(r4, i3) {
      if (typeof r4 != `string`) throw Error(`Method name must be a string for TonClient4 provider`);
      let a3 = t3;
      a3 === null && (a3 = (await e3.getLastBlock()).last.seqno);
      let o3 = await e3.runMethod(a3, n3, r4, i3);
      if (o3.exitCode !== 0 && o3.exitCode !== 1) throw Error(`Exit code: ` + o3.exitCode);
      return { stack: new l2.TupleReader(o3.result) };
    }, async external(t4) {
      let i3 = await e3.getLastBlock(), a3 = null;
      r3 && (await e3.getAccountLite(i3.last.seqno, n3)).account.state.type !== `active` && (a3 = r3);
      let o3 = (0, l2.external)({ to: n3, init: a3, body: t4 }), s3 = (0, l2.beginCell)().store((0, l2.storeMessage)(o3)).endCell().toBoc();
      await e3.sendMessage(s3);
    }, async internal(t4, i3) {
      let a3 = await e3.getLastBlock(), o3 = null;
      r3 && (await e3.getAccountLite(a3.last.seqno, n3)).account.state.type !== `active` && (o3 = r3);
      let s3 = true;
      i3.bounce !== null && i3.bounce !== void 0 && (s3 = i3.bounce);
      let c3;
      c3 = typeof i3.value == `string` ? (0, l2.toNano)(i3.value) : i3.value;
      let u3 = null;
      typeof i3.body == `string` ? u3 = (0, l2.comment)(i3.body) : i3.body && (u3 = i3.body), await t4.send({ to: n3, value: c3, extracurrency: i3.extracurrency, bounce: s3, sendMode: i3.sendMode, init: o3, body: u3 });
    }, open(n4) {
      return (0, l2.openContract)(n4, (n5) => f2(e3, t3, n5.address, n5.init ?? null));
    }, async getTransactions(t4, n4, r4, i3) {
      let a3 = typeof i3 == `number`;
      if (a3 && i3 <= 0) return [];
      let o3 = [];
      do {
        let i4 = await e3.getAccountTransactions(t4, n4, r4), a4 = i4[0].tx, [s3, c3] = [a4.lt, a4.hash()];
        if (o3.length > 0 && s3 === n4 && c3.equals(r4) && i4.shift(), i4.length === 0) break;
        let l3 = i4[i4.length - 1].tx, [u3, d3] = [l3.lt, l3.hash()];
        if (u3 === n4 && d3.equals(r4)) break;
        o3.push(...i4.map((e4) => e4.tx)), n4 = u3, r4 = d3;
      } while (a3 && o3.length < i3);
      return a3 && (o3 = o3.slice(0, i3)), o3;
    } };
  }
  let p2 = d2.z.object({ last: d2.z.object({ seqno: d2.z.number(), shard: d2.z.string(), workchain: d2.z.number(), fileHash: d2.z.string(), rootHash: d2.z.string() }), init: d2.z.object({ fileHash: d2.z.string(), rootHash: d2.z.string() }), stateRootHash: d2.z.string(), now: d2.z.number() }), m2 = d2.z.union([d2.z.object({ exist: d2.z.literal(false) }), d2.z.object({ exist: d2.z.literal(true), block: d2.z.object({ shards: d2.z.array(d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string(), transactions: d2.z.array(d2.z.object({ account: d2.z.string(), hash: d2.z.string(), lt: d2.z.string() })) })) }) })]), h2 = d2.z.object({ lastPaid: d2.z.number(), duePayment: d2.z.union([d2.z.null(), d2.z.string()]), used: d2.z.object({ bits: d2.z.number(), cells: d2.z.number(), publicCells: d2.z.number().optional() }) }), g2 = d2.z.object({ account: d2.z.object({ state: d2.z.union([d2.z.object({ type: d2.z.literal(`uninit`) }), d2.z.object({ type: d2.z.literal(`active`), code: d2.z.union([d2.z.string(), d2.z.null()]), data: d2.z.union([d2.z.string(), d2.z.null()]) }), d2.z.object({ type: d2.z.literal(`frozen`), stateHash: d2.z.string() })]), balance: d2.z.object({ coins: d2.z.string(), currencies: d2.z.record(d2.z.string(), d2.z.string()) }), last: d2.z.union([d2.z.null(), d2.z.object({ lt: d2.z.string(), hash: d2.z.string() })]), storageStat: d2.z.union([d2.z.null(), h2]) }), block: d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string() }) }), _2 = d2.z.object({ account: d2.z.object({ state: d2.z.union([d2.z.object({ type: d2.z.literal(`uninit`) }), d2.z.object({ type: d2.z.literal(`active`), codeHash: d2.z.string(), dataHash: d2.z.string() }), d2.z.object({ type: d2.z.literal(`frozen`), stateHash: d2.z.string() })]), balance: d2.z.object({ coins: d2.z.string(), currencies: d2.z.record(d2.z.string(), d2.z.string()) }), last: d2.z.union([d2.z.null(), d2.z.object({ lt: d2.z.string(), hash: d2.z.string() })]), storageStat: d2.z.union([d2.z.null(), h2]) }) }), v2 = d2.z.object({ changed: d2.z.boolean(), block: d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string() }) }), y2 = d2.z.object({ exitCode: d2.z.number(), resultRaw: d2.z.union([d2.z.string(), d2.z.null()]), block: d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string() }), shardBlock: d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string() }) }), b2 = d2.z.object({ config: d2.z.object({ cell: d2.z.string(), address: d2.z.string(), globalBalance: d2.z.object({ coins: d2.z.string() }) }) }), x2 = d2.z.object({ status: d2.z.number() }), S2 = d2.z.array(d2.z.object({ workchain: d2.z.number(), seqno: d2.z.number(), shard: d2.z.string(), rootHash: d2.z.string(), fileHash: d2.z.string() })), C2 = d2.z.object({ blocks: S2, boc: d2.z.string() }), w2 = d2.z.object({ bits: d2.z.number(), data: d2.z.string() }), T2 = d2.z.union([d2.z.object({ type: d2.z.literal(`internal`), value: d2.z.string(), dest: d2.z.string(), src: d2.z.string(), bounced: d2.z.boolean(), bounce: d2.z.boolean(), ihrDisabled: d2.z.boolean(), createdAt: d2.z.number(), createdLt: d2.z.string(), fwdFee: d2.z.string(), ihrFee: d2.z.string() }), d2.z.object({ type: d2.z.literal(`external-in`), dest: d2.z.string(), src: d2.z.union([w2, d2.z.null()]), importFee: d2.z.string() }), d2.z.object({ type: d2.z.literal(`external-out`), dest: d2.z.union([w2, d2.z.null()]) })]), E2 = d2.z.object({ splitDepth: d2.z.union([d2.z.number(), d2.z.null()]), code: d2.z.union([d2.z.string(), d2.z.null()]), data: d2.z.union([d2.z.string(), d2.z.null()]), special: d2.z.union([d2.z.object({ tick: d2.z.boolean(), tock: d2.z.boolean() }), d2.z.null()]) }), D2 = d2.z.object({ body: d2.z.string(), info: T2, init: d2.z.union([E2, d2.z.null()]) }), O2 = d2.z.union([d2.z.literal(`uninitialized`), d2.z.literal(`frozen`), d2.z.literal(`active`), d2.z.literal(`non-existing`)]), k2 = d2.z.union([d2.z.object({ type: d2.z.literal(`comment`), comment: d2.z.string() }), d2.z.object({ type: d2.z.literal(`payload`), cell: d2.z.string() })]), A2 = d2.z.union([d2.z.object({ kind: d2.z.literal(`ton`), amount: d2.z.string() }), d2.z.object({ kind: d2.z.literal(`token`), amount: d2.z.string() })]), j2 = d2.z.union([d2.z.literal(`jetton::excesses`), d2.z.literal(`jetton::transfer`), d2.z.literal(`jetton::transfer_notification`), d2.z.literal(`deposit`), d2.z.literal(`deposit::ok`), d2.z.literal(`withdraw`), d2.z.literal(`withdraw::all`), d2.z.literal(`withdraw::delayed`), d2.z.literal(`withdraw::ok`), d2.z.literal(`airdrop`)]), M2 = d2.z.object({ type: j2, options: d2.z.optional(d2.z.record(d2.z.string())) }), N2 = d2.z.object({ address: d2.z.string(), comment: d2.z.optional(d2.z.string()), items: d2.z.array(A2), op: d2.z.optional(M2) }), P2 = d2.z.object({ address: d2.z.string(), lt: d2.z.string(), hash: d2.z.string(), prevTransaction: d2.z.object({ lt: d2.z.string(), hash: d2.z.string() }), time: d2.z.number(), outMessagesCount: d2.z.number(), oldStatus: O2, newStatus: O2, fees: d2.z.string(), update: d2.z.object({ oldHash: d2.z.string(), newHash: d2.z.string() }), inMessage: d2.z.union([D2, d2.z.null()]), outMessages: d2.z.array(D2), parsed: d2.z.object({ seqno: d2.z.union([d2.z.number(), d2.z.null()]), body: d2.z.union([k2, d2.z.null()]), status: d2.z.union([d2.z.literal(`success`), d2.z.literal(`failed`), d2.z.literal(`pending`)]), dest: d2.z.union([d2.z.string(), d2.z.null()]), kind: d2.z.union([d2.z.literal(`out`), d2.z.literal(`in`)]), amount: d2.z.string(), resolvedAddress: d2.z.string(), bounced: d2.z.boolean(), mentioned: d2.z.array(d2.z.string()) }), operation: N2 }), F2 = d2.z.object({ blocks: S2, transactions: d2.z.array(P2) });
})), qt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.loadWalletIdV5Beta = r2, e2.storeWalletIdV5Beta = i2;
  let t2 = mt(), n2 = { v5: 0 };
  function r2(e3) {
    let r3 = new t2.BitReader(new t2.BitString(typeof e3 == `bigint` ? Buffer.from(e3.toString(16), `hex`) : e3 instanceof t2.Slice ? e3.loadBuffer(10) : e3, 0, 80)), i3 = r3.loadInt(32), a2 = r3.loadInt(8), o2 = r3.loadUint(8), s2 = r3.loadUint(32), c2 = Object.entries(n2).find(([e4, t3]) => t3 === o2)?.[0];
    if (c2 === void 0) throw Error(`Can't deserialize walletId: unknown wallet version ${o2}`);
    return { networkGlobalId: i3, workchain: a2, walletVersion: c2, subwalletNumber: s2 };
  }
  function i2(e3) {
    return (t3) => {
      t3.storeInt(e3.networkGlobalId, 32), t3.storeInt(e3.workchain, 8), t3.storeUint(n2[e3.walletVersion], 8), t3.storeUint(e3.subwalletNumber, 32);
    };
  }
})), Jt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV5Beta = void 0;
  let t2 = mt(), n2 = nn(), r2 = qt();
  var i2 = class e3 {
    static create(t3) {
      let n3 = { networkGlobalId: t3.walletId?.networkGlobalId ?? -239, workchain: t3?.walletId?.workchain ?? 0, subwalletNumber: t3?.walletId?.subwalletNumber ?? 0, walletVersion: t3?.walletId?.walletVersion ?? `v5` };
      return new e3(n3, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, i3) {
      this.walletId = e4, this.publicKey = n3, this.walletId = e4, this.domain = i3;
      let a2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAIwAIQgLkzzsvTG1qYeoPK1RH0mZ4WyavNjfbLe7mvNGqgm80Eg3NjhE=`, `base64`))[0], o2 = (0, t2.beginCell)().storeInt(0, 33).store((0, r2.storeWalletIdV5Beta)(this.walletId)).storeBuffer(this.publicKey, 32).storeBit(0).endCell();
      this.init = { code: a2, data: o2 }, this.address = (0, t2.contractAddress)(this.walletId.workchain, { code: a2, data: o2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async getExtensions(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`get_extensions`, [])).stack.readCellOpt() : null;
    }
    async getExtensionsArray(e4) {
      let n3 = await this.getExtensions(e4);
      if (!n3) return [];
      let r3 = t2.Dictionary.loadDirect(t2.Dictionary.Keys.BigUint(256), t2.Dictionary.Values.BigInt(8), n3);
      return r3.keys().map((e5) => {
        let n4 = r3.get(e5), i3 = e5 ^ n4 + 1n;
        return t2.Address.parseRaw(`${n4}:${i3.toString(16).padStart(64, `0`)}`);
      });
    }
    async getIsSecretKeyAuthEnabled(e4) {
      return (await e4.get(`get_is_signature_auth_allowed`, [])).stack.readNumber() !== 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = await this.createTransfer(t3);
      await this.send(e4, n3);
    }
    async sendAddExtension(e4, t3) {
      let n3 = await this.createAddExtension(t3);
      await this.send(e4, n3);
    }
    async sendRemoveExtension(e4, t3) {
      let n3 = await this.createRemoveExtension(t3);
      await this.send(e4, n3);
    }
    async sendActionsBatch(e4, t3) {
      let n3 = await this.createRequest(t3);
      await this.send(e4, n3);
    }
    createActions(e4) {
      return e4.messages.map((t3) => ({ type: `sendMsg`, mode: e4.sendMode, outMsg: t3 }));
    }
    createTransfer(e4) {
      return this.createRequest({ ...e4, actions: this.createActions({ messages: e4.messages, sendMode: e4.sendMode }) });
    }
    createAddExtension(e4) {
      return this.createRequest({ ...e4, actions: [{ type: `addExtension`, address: e4.extensionAddress }] });
    }
    createRemoveExtension(e4) {
      return this.createRequest({ ...e4, actions: [{ type: `removeExtension`, address: e4.extensionAddress }] });
    }
    createRequest(e4) {
      return e4.authType === `extension` ? (0, n2.createWalletTransferV5Beta)(e4) : (0, n2.createWalletTransferV5Beta)({ ...e4, walletId: (0, r2.storeWalletIdV5Beta)(this.walletId), domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r3) => {
        let i3 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i3, secretKey: n3, sendMode: r3.sendMode ?? t2.SendMode.PAY_GAS_SEPARATELY + t2.SendMode.IGNORE_ERRORS, messages: [(0, t2.internal)({ to: r3.to, value: r3.value, extracurrency: r3.extracurrency, init: r3.init, body: r3.body, bounce: r3.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
  e2.WalletContractV5Beta = i2, i2.OpCodes = { auth_extension: 1702392942, auth_signed_external: 1936287598, auth_signed_internal: 1936289396 };
})), Yt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.isOutActionExtended = t2, e2.isOutActionBasic = n2;
  function t2(e3) {
    return e3.type === `setIsPublicKeyEnabled` || e3.type === `addExtension` || e3.type === `removeExtension`;
  }
  function n2(e3) {
    return !t2(e3);
  }
})), Xt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeOutActionExtendedV5Beta = l2, e2.loadOutActionV5BetaExtended = u2, e2.storeOutListExtendedV5Beta = d2, e2.loadOutListExtendedV5Beta = f2;
  let t2 = mt(), n2 = Yt(), r2 = 550222170;
  function i2(e3) {
    return (t3) => {
      t3.storeUint(r2, 32).storeUint(+!!e3.isEnabled, 1);
    };
  }
  let a2 = 474012575;
  function o2(e3) {
    return (t3) => {
      t3.storeUint(a2, 32).storeAddress(e3.address);
    };
  }
  let s2 = 1588524196;
  function c2(e3) {
    return (t3) => {
      t3.storeUint(s2, 32).storeAddress(e3.address);
    };
  }
  function l2(e3) {
    switch (e3.type) {
      case `setIsPublicKeyEnabled`:
        return i2(e3);
      case `addExtension`:
        return o2(e3);
      case `removeExtension`:
        return c2(e3);
      default:
        throw Error(`Unknown action type` + e3?.type);
    }
  }
  function u2(e3) {
    let t3 = e3.loadUint(32);
    switch (t3) {
      case r2:
        return { type: `setIsPublicKeyEnabled`, isEnabled: !!e3.loadUint(1) };
      case a2:
        return { type: `addExtension`, address: e3.loadAddress() };
      case s2:
        return { type: `removeExtension`, address: e3.loadAddress() };
      default:
        throw Error(`Unknown extended out action tag 0x${t3.toString(16)}`);
    }
  }
  function d2(e3) {
    let [r3, ...i3] = e3;
    if (!r3 || !(0, n2.isOutActionExtended)(r3)) {
      if (e3.some(n2.isOutActionExtended)) throw Error(`Can't serialize actions list: all extended actions must be placed before out actions`);
      return (n3) => {
        n3.storeUint(0, 1).storeRef((0, t2.beginCell)().store((0, t2.storeOutList)(e3)).endCell());
      };
    }
    return (e4) => {
      e4.storeUint(1, 1).store(l2(r3)).storeRef((0, t2.beginCell)().store(d2(i3)).endCell());
    };
  }
  function f2(e3) {
    let n3 = [];
    for (; e3.loadUint(1); ) {
      let t3 = u2(e3);
      n3.push(t3), e3 = e3.loadRef().beginParse();
    }
    let r3 = (0, t2.loadOutList)(e3.loadRef().beginParse());
    if (r3.some((e4) => e4.type === `setCode`)) throw Error(`Can't deserialize actions list: only sendMsg actions are allowed for wallet v5`);
    return n3.concat(r3);
  }
})), Zt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.signPayload = n2;
  let t2 = mt();
  function n2(e3, n3, r2) {
    return `secretKey` in e3 ? r2((0, t2.domainSign)({ data: n3.endCell().hash(), secretKey: e3.secretKey, domain: e3.domain }), n3) : e3.signer(n3.endCell()).then((e4) => r2(e4, n3));
  }
})), Qt = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.isWalletIdV5R1ClientContext = n2, e2.loadWalletIdV5R1 = i2, e2.storeWalletIdV5R1 = a2;
  let t2 = mt();
  function n2(e3) {
    return typeof e3 != `number`;
  }
  let r2 = { v5r1: 0 };
  function i2(e3, n3) {
    let i3 = new t2.BitReader(new t2.BitString(typeof e3 == `bigint` ? Buffer.from(e3.toString(16).padStart(8, `0`), `hex`) : e3 instanceof t2.Slice ? e3.loadBuffer(4) : e3, 0, 32)).loadInt(32), a3 = BigInt(i3) ^ BigInt(n3), o2 = (0, t2.beginCell)().storeInt(a3, 32).endCell().beginParse();
    if (o2.loadUint(1)) {
      let e4 = o2.loadInt(8), t3 = o2.loadUint(8), i4 = o2.loadUint(15), a4 = Object.entries(r2).find(([e5, n4]) => n4 === t3)?.[0];
      if (a4 === void 0) throw Error(`Can't deserialize walletId: unknown wallet version ${t3}`);
      return { networkGlobalId: n3, context: { walletVersion: a4, workchain: e4, subwalletNumber: i4 } };
    }
    return { networkGlobalId: n3, context: o2.loadUint(31) };
  }
  function a2(e3) {
    return (i3) => {
      let a3;
      return a3 = n2(e3.context) ? (0, t2.beginCell)().storeUint(1, 1).storeInt(e3.context.workchain, 8).storeUint(r2[e3.context.walletVersion], 8).storeUint(e3.context.subwalletNumber, 15).endCell().beginParse().loadInt(32) : (0, t2.beginCell)().storeUint(0, 1).storeUint(e3.context, 31).endCell().beginParse().loadInt(32), i3.storeInt(BigInt(e3.networkGlobalId) ^ BigInt(a3), 32);
    };
  }
})), $t = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV5R1 = void 0;
  let t2 = mt(), n2 = nn(), r2 = Qt();
  var i2 = class e3 {
    static create(t3) {
      let n3 = 0;
      return `workchain` in t3 && t3.workchain != null && (n3 = t3.workchain), t3.walletId?.context && (0, r2.isWalletIdV5R1ClientContext)(t3.walletId.context) && t3.walletId.context.workchain != null && (n3 = t3.walletId.context.workchain), new e3(n3, t3.publicKey, { networkGlobalId: t3.walletId?.networkGlobalId ?? -239, context: t3.walletId?.context ?? { workchain: 0, walletVersion: `v5r1`, subwalletNumber: 0 } }, t3.domain);
    }
    constructor(e4, n3, i3, a2, o2) {
      this.publicKey = n3, this.walletId = i3, this.globalId = o2, this.walletId = i3, this.domain = a2;
      let s2 = t2.Cell.fromBoc(Buffer.from(`b5ee9c7241021401000281000114ff00f4a413f4bcf2c80b01020120020d020148030402dcd020d749c120915b8f6320d70b1f2082106578746ebd21821073696e74bdb0925f03e082106578746eba8eb48020d72101d074d721fa4030fa44f828fa443058bd915be0ed44d0810141d721f4058307f40e6fa1319130e18040d721707fdb3ce03120d749810280b99130e070e2100f020120050c020120060902016e07080019adce76a2684020eb90eb85ffc00019af1df6a2684010eb90eb858fc00201480a0b0017b325fb51341c75c875c2c7e00011b262fb513435c280200019be5f0f6a2684080a0eb90fa02c0102f20e011e20d70b1f82107369676ebaf2e08a7f0f01e68ef0eda2edfb218308d722028308d723208020d721d31fd31fd31fed44d0d200d31f20d31fd3ffd70a000af90140ccf9109a28945f0adb31e1f2c087df02b35007b0f2d0845125baf2e0855036baf2e086f823bbf2d0882292f800de01a47fc8ca00cb1f01cf16c9ed542092f80fde70db3cd81003f6eda2edfb02f404216e926c218e4c0221d73930709421c700b38e2d01d72820761e436c20d749c008f2e09320d74ac002f2e09320d71d06c712c2005230b0f2d089d74cd7393001a4e86c128407bbf2e093d74ac000f2e093ed55e2d20001c000915be0ebd72c08142091709601d72c081c12e25210b1e30f20d74a111213009601fa4001fa44f828fa443058baf2e091ed44d0810141d718f405049d7fc8ca0040048307f453f2e08b8e14038307f45bf2e08c22d70a00216e01b3b0f2d090e2c85003cf1612f400c9ed54007230d72c08248e2d21f2e092d200ed44d0d2005113baf2d08f54503091319c01810140d721d70a00f2e08ee2c8ca0058cf16c9ed5493f2c08de20010935bdb31e1d74cd0b4d6c35e`, `hex`))[0], c2 = (0, t2.beginCell)().storeUint(1, 1).storeUint(0, 32).store((0, r2.storeWalletIdV5R1)(this.walletId)).storeBuffer(this.publicKey, 32).storeBit(0).endCell();
      this.init = { code: s2, data: c2 }, this.address = (0, t2.contractAddress)(e4, { code: s2, data: c2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async getExtensions(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`get_extensions`, [])).stack.readCellOpt() : null;
    }
    async getExtensionsArray(e4) {
      let n3 = await this.getExtensions(e4);
      return n3 ? t2.Dictionary.loadDirect(t2.Dictionary.Keys.BigUint(256), t2.Dictionary.Values.BigInt(1), n3).keys().map((e5) => {
        let n4 = this.address.workChain;
        return t2.Address.parseRaw(`${n4}:${e5.toString(16).padStart(64, `0`)}`);
      }) : [];
    }
    async getIsSecretKeyAuthEnabled(e4) {
      return (await e4.get(`is_signature_allowed`, [])).stack.readBoolean();
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = await this.createTransfer(t3);
      await this.send(e4, n3);
    }
    async sendAddExtension(e4, t3) {
      let n3 = await this.createAddExtension(t3);
      await this.send(e4, n3);
    }
    async sendRemoveExtension(e4, t3) {
      let n3 = await this.createRemoveExtension(t3);
      await this.send(e4, n3);
    }
    createActions(e4) {
      return e4.messages.map((t3) => ({ type: `sendMsg`, mode: e4.sendMode, outMsg: t3 }));
    }
    createTransfer(e4) {
      return this.createRequest({ actions: this.createActions({ messages: e4.messages, sendMode: e4.sendMode }), ...e4 });
    }
    createAddExtension(e4) {
      return this.createRequest({ actions: [{ type: `addExtension`, address: e4.extensionAddress }], ...e4 });
    }
    createRemoveExtension(e4) {
      return this.createRequest({ actions: [{ type: `removeExtension`, address: e4.extensionAddress }], ...e4 });
    }
    createRequest(e4) {
      return e4.authType === `extension` ? (0, n2.createWalletTransferV5R1)(e4) : (0, n2.createWalletTransferV5R1)({ ...e4, walletId: (0, r2.storeWalletIdV5R1)(this.walletId), domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r3) => {
        let i3 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i3, secretKey: n3, sendMode: r3.sendMode ?? t2.SendMode.PAY_GAS_SEPARATELY + t2.SendMode.IGNORE_ERRORS, messages: [(0, t2.internal)({ to: r3.to, value: r3.value, extracurrency: r3.extracurrency, init: r3.init, body: r3.body, bounce: r3.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
  e2.WalletContractV5R1 = i2, i2.OpCodes = { auth_extension: 1702392942, auth_signed_external: 1936287598, auth_signed_internal: 1936289396 };
})), en = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeOutActionExtendedV5R1 = o2, e2.loadOutActionExtendedV5R1 = s2, e2.storeOutListExtendedV5R1 = c2, e2.loadOutListExtendedV5R1 = u2, e2.toSafeV5R1SendMode = d2, e2.patchV5R1ActionsSendMode = f2;
  let t2 = mt(), n2 = Yt();
  function r2(e3) {
    return (t3) => {
      t3.storeUint(4, 8).storeUint(+!!e3.isEnabled, 1);
    };
  }
  function i2(e3) {
    return (t3) => {
      t3.storeUint(2, 8).storeAddress(e3.address);
    };
  }
  function a2(e3) {
    return (t3) => {
      t3.storeUint(3, 8).storeAddress(e3.address);
    };
  }
  function o2(e3) {
    switch (e3.type) {
      case `setIsPublicKeyEnabled`:
        return r2(e3);
      case `addExtension`:
        return i2(e3);
      case `removeExtension`:
        return a2(e3);
      default:
        throw Error(`Unknown action type` + e3?.type);
    }
  }
  function s2(e3) {
    let t3 = e3.loadUint(8);
    switch (t3) {
      case 4:
        return { type: `setIsPublicKeyEnabled`, isEnabled: !!e3.loadUint(1) };
      case 2:
        return { type: `addExtension`, address: e3.loadAddress() };
      case 3:
        return { type: `removeExtension`, address: e3.loadAddress() };
      default:
        throw Error(`Unknown extended out action tag 0x${t3.toString(16)}`);
    }
  }
  function c2(e3) {
    let r3 = e3.filter(n2.isOutActionExtended), i3 = e3.filter(n2.isOutActionBasic);
    return (e4) => {
      let n3 = i3.length ? (0, t2.beginCell)().store((0, t2.storeOutList)(i3)) : null;
      if (e4.storeMaybeRef(n3), r3.length === 0) e4.storeUint(0, 1);
      else {
        let [t3, ...n4] = r3;
        e4.storeUint(1, 1).store(o2(t3)), n4.length > 0 && e4.storeRef(l2(n4));
      }
    };
  }
  function l2(e3) {
    let [n3, ...r3] = e3, i3 = (0, t2.beginCell)().store(o2(n3));
    return r3.length > 0 && (i3 = i3.storeRef(l2(r3))), i3.endCell();
  }
  function u2(e3) {
    let n3 = [], r3 = e3.loadMaybeRef();
    if (r3) {
      let e4 = (0, t2.loadOutList)(r3.beginParse());
      if (e4.some((e5) => e5.type !== `sendMsg`)) throw Error(`Can't deserialize actions list: only sendMsg actions are allowed for wallet v5r1`);
      n3.push(...e4);
    }
    if (e3.loadBoolean()) {
      let t3 = s2(e3);
      n3.push(t3);
    }
    for (; e3.remainingRefs > 0; ) {
      e3 = e3.loadRef().beginParse();
      let t3 = s2(e3);
      n3.push(t3);
    }
    return n3;
  }
  function d2(e3, n3) {
    return n3 === `internal` || n3 === `extension` ? e3 : e3 | t2.SendMode.IGNORE_ERRORS;
  }
  function f2(e3, t3) {
    return e3.map((e4) => e4.type === `sendMsg` ? { ...e4, mode: d2(e4.mode, t3) } : e4);
  }
})), tn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.storeExtendedAction = n2, e2.loadExtendedAction = r2;
  let t2 = mt();
  function n2(e3) {
    return (n3) => {
      switch (e3.type) {
        case `sendMsg`:
          n3.storeUint(0, 8);
          for (let r3 of e3.messages) n3.storeUint(e3.sendMode ?? t2.SendMode.NONE, 8), n3.storeRef((0, t2.beginCell)().store((0, t2.storeMessageRelaxed)(r3)));
          break;
        case `addAndDeployPlugin`:
          n3.storeUint(1, 8), n3.storeInt(e3.workchain, 8), n3.storeCoins(e3.forwardAmount), n3.storeRef((0, t2.beginCell)().store((0, t2.storeStateInit)(e3.stateInit))), n3.storeRef(e3.body);
          break;
        case `addPlugin`:
          n3.storeUint(2, 8), n3.storeInt(e3.address.workChain, 8), n3.storeBuffer(e3.address.hash), n3.storeCoins(e3.forwardAmount), n3.storeUint(e3.queryId ?? 0n, 64);
          break;
        case `removePlugin`:
          n3.storeUint(3, 8), n3.storeInt(e3.address.workChain, 8), n3.storeBuffer(e3.address.hash), n3.storeCoins(e3.forwardAmount), n3.storeUint(e3.queryId ?? 0n, 64);
          break;
        default:
          throw Error(`Unsupported plugin action`);
      }
    };
  }
  function r2(e3) {
    let n3 = e3.loadUint(8);
    switch (n3) {
      case 0: {
        let n4 = [], r3;
        for (; e3.remainingRefs > 0; ) {
          if (e3.remainingBits < 8) throw Error(`Invalid sendMsg action: insufficient bits for send mode`);
          let i2 = e3.loadUint(8), a2 = e3.loadRef(), o2 = (0, t2.loadMessageRelaxed)(a2.beginParse());
          if (r3 === void 0) r3 = i2;
          else if (r3 !== i2) throw Error(`Invalid sendMsg action: mixed send modes are not supported`);
          n4.push(o2);
        }
        return { type: `sendMsg`, messages: n4, sendMode: r3 };
      }
      case 1: {
        let n4 = e3.loadInt(8), r3 = e3.loadCoins();
        return { type: `addAndDeployPlugin`, workchain: n4, stateInit: (0, t2.loadStateInit)(e3.loadRef().beginParse()), body: e3.loadRef(), forwardAmount: r3 };
      }
      case 2: {
        let n4 = e3.loadInt(8), r3 = e3.loadBuffer(32), i2 = e3.loadCoins(), a2 = e3.loadUintBig(64);
        return { type: `addPlugin`, address: new t2.Address(n4, r3), forwardAmount: i2, queryId: a2 === 0n ? void 0 : a2 };
      }
      case 3: {
        let n4 = e3.loadInt(8), r3 = e3.loadBuffer(32), i2 = e3.loadCoins(), a2 = e3.loadUintBig(64);
        return { type: `removePlugin`, address: new t2.Address(n4, r3), forwardAmount: i2, queryId: a2 === 0n ? void 0 : a2 };
      }
      default:
        throw Error(`Unsupported action with opcode ${n3}`);
    }
  }
})), nn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.createWalletTransferV1 = u2, e2.createWalletTransferV2 = d2, e2.createWalletTransferV3 = f2, e2.createWalletTransferV4 = p2, e2.createWalletTransferV5Beta = m2, e2.createWalletTransferV5R1 = h2;
  let t2 = mt(), n2 = Jt(), r2 = Xt(), i2 = Zt(), a2 = $t(), o2 = en(), s2 = tn();
  function c2(e3, n3) {
    return (0, t2.beginCell)().storeBuffer(e3).storeBuilder(n3).endCell();
  }
  function l2(e3, n3) {
    return (0, t2.beginCell)().storeBuilder(n3).storeBuffer(e3).endCell();
  }
  function u2(e3) {
    let n3 = (0, t2.beginCell)().storeUint(e3.seqno, 32);
    e3.message && (n3.storeUint(e3.sendMode, 8), n3.storeRef((0, t2.beginCell)().store((0, t2.storeMessageRelaxed)(e3.message))));
    let r3 = (0, t2.domainSign)({ data: n3.endCell().hash(), secretKey: e3.secretKey, domain: e3.domain });
    return (0, t2.beginCell)().storeBuffer(r3).storeBuilder(n3).endCell();
  }
  function d2(e3) {
    if (e3.messages.length > 4) throw Error(`Maximum number of messages in a single transfer is 4`);
    let n3 = (0, t2.beginCell)().storeUint(e3.seqno, 32);
    n3.storeUint(e3.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
    for (let r4 of e3.messages) n3.storeUint(e3.sendMode, 8), n3.storeRef((0, t2.beginCell)().store((0, t2.storeMessageRelaxed)(r4)));
    let r3 = (0, t2.domainSign)({ data: n3.endCell().hash(), secretKey: e3.secretKey, domain: e3.domain });
    return (0, t2.beginCell)().storeBuffer(r3).storeBuilder(n3).endCell();
  }
  function f2(e3) {
    if (e3.messages.length > 4) throw Error(`Maximum number of messages in a single transfer is 4`);
    let n3 = (0, t2.beginCell)().storeUint(e3.walletId, 32);
    n3.storeUint(e3.timeout || Math.floor(Date.now() / 1e3) + 60, 32), n3.storeUint(e3.seqno, 32);
    for (let r3 of e3.messages) n3.storeUint(e3.sendMode, 8), n3.storeRef((0, t2.beginCell)().store((0, t2.storeMessageRelaxed)(r3)));
    return (0, i2.signPayload)(e3, n3, c2);
  }
  function p2(e3) {
    let n3 = (0, t2.beginCell)().storeUint(e3.walletId, 32);
    return n3.storeUint(e3.timeout || Math.floor(Date.now() / 1e3) + 60, 32), n3.storeUint(e3.seqno, 32), n3.store((0, s2.storeExtendedAction)(e3.action)), (0, i2.signPayload)(e3, n3, c2);
  }
  function m2(e3) {
    if (e3.actions.length > 255) throw Error(`Maximum number of OutActions in a single request is 255`);
    if (e3.authType === `extension`) return (0, t2.beginCell)().storeUint(n2.WalletContractV5Beta.OpCodes.auth_extension, 32).store((0, r2.storeOutListExtendedV5Beta)(e3.actions)).endCell();
    let a3 = (0, t2.beginCell)().storeUint(e3.authType === `internal` ? n2.WalletContractV5Beta.OpCodes.auth_signed_internal : n2.WalletContractV5Beta.OpCodes.auth_signed_external, 32).store(e3.walletId);
    return a3.storeUint(e3.timeout || Math.floor(Date.now() / 1e3) + 60, 32), a3.storeUint(e3.seqno, 32).store((0, r2.storeOutListExtendedV5Beta)(e3.actions)), (0, i2.signPayload)(e3, a3, l2);
  }
  function h2(e3) {
    if (e3.actions.length > 255) throw Error(`Maximum number of OutActions in a single request is 255`);
    if (e3 = { ...e3 }, e3.authType === `extension`) return (0, t2.beginCell)().storeUint(a2.WalletContractV5R1.OpCodes.auth_extension, 32).storeUint(e3.queryId ?? 0, 64).store((0, o2.storeOutListExtendedV5R1)(e3.actions)).endCell();
    e3.actions = (0, o2.patchV5R1ActionsSendMode)(e3.actions, e3.authType);
    let n3 = (0, t2.beginCell)().storeUint(e3.authType === `internal` ? a2.WalletContractV5R1.OpCodes.auth_signed_internal : a2.WalletContractV5R1.OpCodes.auth_signed_external, 32).store(e3.walletId);
    return n3.storeUint(e3.timeout || Math.floor(Date.now() / 1e3) + 60, 32), n3.storeUint(e3.seqno, 32).store((0, o2.storeOutListExtendedV5R1)(e3.actions)), (0, i2.signPayload)(e3, n3, l2);
  }
})), rn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV1R1 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV1R1 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, r2) {
      this.workchain = e4, this.publicKey = n3, this.domain = r2;
      let i2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEARAAAhP8AIN2k8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVEH98Ik=`, `base64`))[0], a2 = (0, t2.beginCell)().storeUint(0, 32).storeBuffer(n3).endCell();
      this.init = { code: i2, data: a2 }, this.address = (0, t2.contractAddress)(e4, { code: i2, data: a2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      let n3 = await e4.getState();
      return n3.state.type === `active` ? t2.Cell.fromBoc(n3.state.data)[0].beginParse().loadUint(32) : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      let r2 = t2.SendMode.PAY_GAS_SEPARATELY;
      return e4.sendMode !== null && e4.sendMode !== void 0 && (r2 = e4.sendMode), (0, n2.createWalletTransferV1)({ seqno: e4.seqno, sendMode: r2, secretKey: e4.secretKey, message: e4.message, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, message: (0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce }) });
        await this.send(e4, a2);
      } };
    }
  };
})), an = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(rn(), e2);
})), on = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV1R2 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV1R2 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, r2) {
      this.workchain = e4, this.publicKey = n3, this.domain = r2;
      let i2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAUwAAov8AIN0gggFMl7qXMO1E0NcLH+Ck8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVNDieG8=`, `base64`))[0], a2 = (0, t2.beginCell)().storeUint(0, 32).storeBuffer(n3).endCell();
      this.init = { code: i2, data: a2 }, this.address = (0, t2.contractAddress)(e4, { code: i2, data: a2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      let r2 = t2.SendMode.PAY_GAS_SEPARATELY;
      return e4.sendMode !== null && e4.sendMode !== void 0 && (r2 = e4.sendMode), (0, n2.createWalletTransferV1)({ seqno: e4.seqno, sendMode: r2, secretKey: e4.secretKey, message: e4.message, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, message: (0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce }) });
        await this.send(e4, a2);
      } };
    }
  };
})), sn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(on(), e2);
})), cn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV1R3 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV1R3 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, r2) {
      this.workchain = e4, this.publicKey = n3, this.domain = r2;
      let i2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAXwAAuv8AIN0gggFMl7ohggEznLqxnHGw7UTQ0x/XC//jBOCk8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVLW4bkI=`, `base64`))[0], a2 = (0, t2.beginCell)().storeUint(0, 32).storeBuffer(n3).endCell();
      this.init = { code: i2, data: a2 }, this.address = (0, t2.contractAddress)(e4, { code: i2, data: a2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      let r2 = t2.SendMode.PAY_GAS_SEPARATELY;
      return e4.sendMode !== null && e4.sendMode !== void 0 && (r2 = e4.sendMode), (0, n2.createWalletTransferV1)({ seqno: e4.seqno, sendMode: r2, secretKey: e4.secretKey, message: e4.message, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, message: (0, t2.internal)({ to: r2.to, value: r2.value, init: r2.init, body: r2.body, bounce: r2.bounce }) });
        await this.send(e4, a2);
      } };
    }
  };
})), ln = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(cn(), e2);
})), un = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV2R1 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV2R1 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, r2) {
      this.workchain = e4, this.publicKey = n3, this.domain = r2;
      let i2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAVwAAqv8AIN0gggFMl7qXMO1E0NcLH+Ck8mCDCNcYINMf0x8B+CO78mPtRNDTH9P/0VExuvKhA/kBVBBC+RDyovgAApMg10qW0wfUAvsA6NGkyMsfy//J7VShNwu2`, `base64`))[0], a2 = (0, t2.beginCell)().storeUint(0, 32).storeBuffer(n3).endCell();
      this.init = { code: i2, data: a2 }, this.address = (0, t2.contractAddress)(e4, { code: i2, data: a2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      let r2 = t2.SendMode.PAY_GAS_SEPARATELY;
      return e4.sendMode !== null && e4.sendMode !== void 0 && (r2 = e4.sendMode), (0, n2.createWalletTransferV2)({ seqno: e4.seqno, sendMode: r2, secretKey: e4.secretKey, messages: e4.messages, timeout: e4.timeout, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, messages: [(0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
})), dn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(un(), e2);
})), fn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV2R2 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV2R2 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.domain);
    }
    constructor(e4, n3, r2) {
      this.workchain = e4, this.publicKey = n3, this.domain = r2;
      let i2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAYwAAwv8AIN0gggFMl7ohggEznLqxnHGw7UTQ0x/XC//jBOCk8mCDCNcYINMf0x8B+CO78mPtRNDTH9P/0VExuvKhA/kBVBBC+RDyovgAApMg10qW0wfUAvsA6NGkyMsfy//J7VQETNeh`, `base64`))[0], a2 = (0, t2.beginCell)().storeUint(0, 32).storeBuffer(n3).endCell();
      this.init = { code: i2, data: a2 }, this.address = (0, t2.contractAddress)(e4, { code: i2, data: a2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      let r2 = t2.SendMode.PAY_GAS_SEPARATELY;
      return e4.sendMode !== null && e4.sendMode !== void 0 && (r2 = e4.sendMode), (0, n2.createWalletTransferV2)({ seqno: e4.seqno, sendMode: r2, secretKey: e4.secretKey, messages: e4.messages, timeout: e4.timeout, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, messages: [(0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
})), pn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(fn(), e2);
})), mn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV3R1 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV3R1 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.walletId, t3.domain);
    }
    constructor(e4, n3, r2, i2) {
      this.workchain = e4, this.publicKey = n3, this.domain = i2, this.walletId = r2 ?? 698983191 + e4;
      let a2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAYgAAwP8AIN0gggFMl7qXMO1E0NcLH+Ck8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVD++buA=`, `base64`))[0], o2 = (0, t2.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(n3).endCell();
      this.init = { code: a2, data: o2 }, this.address = (0, t2.contractAddress)(e4, { code: a2, data: o2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      return (0, n2.createWalletTransferV3)({ ...e4, sendMode: e4.sendMode ?? t2.SendMode.PAY_GAS_SEPARATELY, walletId: this.walletId, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, messages: [(0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
})), hn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(mn(), e2);
})), gn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV3R2 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV3R2 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.walletId, t3.domain);
    }
    constructor(e4, n3, r2, i2) {
      this.workchain = e4, this.publicKey = n3, this.domain = i2, this.walletId = r2 ?? 698983191 + e4;
      let a2 = t2.Cell.fromBoc(Buffer.from(`te6cckEBAQEAcQAA3v8AIN0gggFMl7ohggEznLqxn3Gw7UTQ0x/THzHXC//jBOCk8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVBC9ba0=`, `base64`))[0], o2 = (0, t2.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(n3).endCell();
      this.init = { code: a2, data: o2 }, this.address = (0, t2.contractAddress)(e4, { code: a2, data: o2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      return (0, n2.createWalletTransferV3)({ ...e4, sendMode: e4.sendMode ?? t2.SendMode.PAY_GAS_SEPARATELY, walletId: this.walletId, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, messages: [(0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce })] });
        await this.send(e4, a2);
      } };
    }
  };
})), _n = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(gn(), e2);
})), vn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.WalletContractV4 = void 0;
  let t2 = mt(), n2 = nn();
  e2.WalletContractV4 = class e3 {
    static create(t3) {
      return new e3(t3.workchain, t3.publicKey, t3.walletId, t3.domain);
    }
    constructor(e4, n3, r2, i2) {
      this.workchain = e4, this.publicKey = n3, this.domain = i2, this.walletId = r2 ?? 698983191 + e4;
      let a2 = t2.Cell.fromBoc(Buffer.from(`te6ccgECFAEAAtQAART/APSkE/S88sgLAQIBIAIDAgFIBAUE+PKDCNcYINMf0x/THwL4I7vyZO1E0NMf0x/T//QE0VFDuvKhUVG68qIF+QFUEGT5EPKj+AAkpMjLH1JAyx9SMMv/UhD0AMntVPgPAdMHIcAAn2xRkyDXSpbTB9QC+wDoMOAhwAHjACHAAuMAAcADkTDjDQOkyMsfEssfy/8QERITAubQAdDTAyFxsJJfBOAi10nBIJJfBOAC0x8hghBwbHVnvSKCEGRzdHK9sJJfBeAD+kAwIPpEAcjKB8v/ydDtRNCBAUDXIfQEMFyBAQj0Cm+hMbOSXwfgBdM/yCWCEHBsdWe6kjgw4w0DghBkc3RyupJfBuMNBgcCASAICQB4AfoA9AQw+CdvIjBQCqEhvvLgUIIQcGx1Z4MesXCAGFAEywUmzxZY+gIZ9ADLaRfLH1Jgyz8gyYBA+wAGAIpQBIEBCPRZMO1E0IEBQNcgyAHPFvQAye1UAXKwjiOCEGRzdHKDHrFwgBhQBcsFUAPPFiP6AhPLassfyz/JgED7AJJfA+ICASAKCwBZvSQrb2omhAgKBrkPoCGEcNQICEekk30pkQzmkD6f+YN4EoAbeBAUiYcVnzGEAgFYDA0AEbjJftRNDXCx+AA9sp37UTQgQFA1yH0BDACyMoHy//J0AGBAQj0Cm+hMYAIBIA4PABmtznaiaEAga5Drhf/AABmvHfaiaEAQa5DrhY/AAG7SB/oA1NQi+QAFyMoHFcv/ydB3dIAYyMsFywIizxZQBfoCFMtrEszMyXP7AMhAFIEBCPRR8qcCAHCBAQjXGPoA0z/IVCBHgQEI9FHyp4IQbm90ZXB0gBjIywXLAlAGzxZQBPoCFMtqEssfyz/Jc/sAAgBsgQEI1xj6ANM/MFIkgQEI9Fnyp4IQZHN0cnB0gBjIywXLAlAFzxZQA/oCE8tqyx8Syz/Jc/sAAAr0AMntVA==`, `base64`))[0], o2 = (0, t2.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(this.publicKey).storeBit(0).endCell();
      this.init = { code: a2, data: o2 }, this.address = (0, t2.contractAddress)(e4, { code: a2, data: o2 });
    }
    async getBalance(e4) {
      return (await e4.getState()).balance;
    }
    async getSeqno(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`seqno`, [])).stack.readNumber() : 0;
    }
    async getIsPluginInstalled(e4, t3) {
      if ((await e4.getState()).state.type !== `active`) return false;
      let n3 = BigInt(t3.workChain), r2 = BigInt(`0x` + t3.hash.toString(`hex`));
      return (await e4.get(`is_plugin_installed`, [{ type: `int`, value: n3 }, { type: `int`, value: r2 }])).stack.readBoolean();
    }
    async getPluginsArray(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`get_plugin_list`, [])).stack.readLispList().map((e5) => {
        if (e5.type !== `tuple`) throw Error(`Not a tuple`);
        let n3 = new t2.TupleReader(e5.items), r2 = n3.readNumber(), i2 = n3.readBigNumber().toString(16).padStart(64, `0`);
        return t2.Address.parseRaw(`${r2}:${i2}`);
      }) : [];
    }
    async send(e4, t3) {
      await e4.external(t3);
    }
    async sendTransfer(e4, t3) {
      let n3 = this.createTransfer(t3);
      await this.send(e4, n3);
    }
    createTransfer(e4) {
      return this.createRequest({ seqno: e4.seqno, timeout: e4.timeout, action: { type: `sendMsg`, messages: e4.messages, sendMode: e4.sendMode }, ...`secretKey` in e4 ? { secretKey: e4.secretKey } : { signer: e4.signer } });
    }
    async sendRequest(e4, t3) {
      let n3 = await this.createRequest(t3);
      await this.send(e4, n3);
    }
    createRequest(e4) {
      return (0, n2.createWalletTransferV4)({ ...e4, walletId: this.walletId, domain: this.domain });
    }
    sender(e4, n3) {
      return { send: async (r2) => {
        let i2 = await this.getSeqno(e4), a2 = this.createTransfer({ seqno: i2, secretKey: n3, sendMode: r2.sendMode, messages: [(0, t2.internal)({ to: r2.to, value: r2.value, extracurrency: r2.extracurrency, init: r2.init, body: r2.body, bounce: r2.bounce })] });
        await this.send(e4, a2);
      } };
    }
    async sendAddPlugin(e4, t3) {
      let n3 = await this.createAddPlugin(t3);
      return await this.send(e4, n3);
    }
    async sendRemovePlugin(e4, t3) {
      let n3 = await this.createRemovePlugin(t3);
      return await this.send(e4, n3);
    }
    async sendAddAndDeployPlugin(e4, t3) {
      let n3 = await this.createAddAndDeployPlugin(t3);
      return await this.send(e4, n3);
    }
    createAddPlugin(e4) {
      return this.createRequest({ action: { type: `addPlugin`, address: e4.address, forwardAmount: e4.forwardAmount, queryId: e4.queryId }, ...e4 });
    }
    createRemovePlugin(e4) {
      return this.createRequest({ action: { type: `removePlugin`, address: e4.address, forwardAmount: e4.forwardAmount, queryId: e4.queryId }, ...e4 });
    }
    createAddAndDeployPlugin(e4) {
      return this.createRequest({ action: { type: `addAndDeployPlugin`, workchain: e4.workchain, stateInit: e4.stateInit, body: e4.body, forwardAmount: e4.forwardAmount }, ...e4 });
    }
    async sendPluginRequestFunds(e4, t3, n3) {
      await e4.internal(t3, { value: n3.forwardAmount, body: this.createPluginRequestFundsMessage(n3), sendMode: n3.sendMode });
    }
    createPluginRequestFundsMessage(e4) {
      return (0, t2.beginCell)().storeUint(1886156135, 32).storeUint(e4.queryId ?? 0, 64).storeCoins(e4.toncoinsToWithdraw).storeDict(null).endCell();
    }
    async sendPluginRemovePlugin(e4, t3, n3, r2) {
      await e4.internal(t3, { value: n3, body: this.createPluginRemovePluginMessage(r2) });
    }
    createPluginRemovePluginMessage(e4) {
      return (0, t2.beginCell)().storeUint(1685288050, 32).storeUint(e4 ?? 0, 64).endCell();
    }
  };
})), yn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(vn(), e2), n2(tn(), e2);
})), bn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2(Jt(), e2), n2(Xt(), e2), n2(qt(), e2);
})), xn = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3);
    var i2 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i2 || (`get` in i2 ? !t3.__esModule : i2.writable || i2.configurable)) && (i2 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r2, i2);
  }) : (function(e3, t3, n3, r2) {
    r2 === void 0 && (r2 = n3), e3[r2] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r2 in e3) r2 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r2) && t2(n3, e3, r2);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), n2($t(), e2), n2(en(), e2), n2(Qt(), e2);
})), Sn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.JettonMaster = void 0;
  let t2 = mt();
  e2.JettonMaster = class e3 {
    static create(t3) {
      return new e3(t3);
    }
    constructor(e4) {
      this.address = e4;
    }
    async getWalletAddress(e4, n2) {
      return (await e4.get(`get_wallet_address`, [{ type: `slice`, cell: (0, t2.beginCell)().storeAddress(n2).endCell() }])).stack.readAddress();
    }
    async getJettonData(e4) {
      let t3 = await e4.get(`get_jetton_data`, []);
      return { totalSupply: t3.stack.readBigNumber(), mintable: t3.stack.readBoolean(), adminAddress: t3.stack.readAddress(), content: t3.stack.readCell(), walletCode: t3.stack.readCell() };
    }
  };
})), Cn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.JettonWallet = void 0, e2.JettonWallet = class e3 {
    static create(t2) {
      return new e3(t2);
    }
    constructor(e4) {
      this.address = e4;
    }
    async getBalance(e4) {
      return (await e4.getState()).state.type === `active` ? (await e4.get(`get_wallet_data`, [])).stack.readBigNumber() : 0n;
    }
  };
})), wn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.MultisigOrder = void 0;
  let t2 = I(), n2 = mt();
  e2.MultisigOrder = class e3 {
    constructor(e4) {
      this.signatures = {}, this.payload = e4;
    }
    static fromCell(t3) {
      let n3 = t3.beginParse(), r2 = n3.loadMaybeRef()?.beginParse(), i2 = n3.asCell(), a2 = new e3(i2);
      if (r2) {
        for (; r2.remainingBits > 0; ) {
          let e4 = r2.loadBuffer(64), t4 = r2.loadUint(8);
          a2.signatures[t4] = e4, r2.remainingRefs > 0 ? r2 = r2.loadRef().asSlice() : r2.skip(1);
        }
        r2.endParse();
      }
      return a2;
    }
    static fromPayload(t3) {
      return new e3(t3);
    }
    addSignature(e4, n3, r2) {
      let i2 = this.payload.hash();
      if (!(0, t2.signVerify)(i2, n3, r2.owners.get(e4).slice(0, -1))) throw Error(`invalid signature`);
      this.signatures[e4] = n3;
    }
    sign(e4, n3) {
      let r2 = this.payload.hash();
      return this.signatures[e4] = (0, t2.sign)(r2, n3), r2;
    }
    unionSignatures(e4) {
      this.signatures = Object.assign({}, this.signatures, e4.signatures);
    }
    clearSignatures() {
      this.signatures = {};
    }
    toCell(e4) {
      let t3 = (0, n2.beginCell)().storeBit(0);
      for (let e5 in this.signatures) {
        let r2 = this.signatures[e5];
        t3 = (0, n2.beginCell)().storeBit(1).storeRef((0, n2.beginCell)().storeBuffer(r2).storeUint(parseInt(e5), 8).storeBuilder(t3).endCell());
      }
      return (0, n2.beginCell)().storeUint(e4, 8).storeBuilder(t3).storeBuilder(this.payload.asBuilder()).endCell();
    }
  };
})), Tn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.MultisigOrderBuilder = void 0;
  let t2 = mt(), n2 = wn();
  e2.MultisigOrderBuilder = class {
    constructor(e3, n3) {
      this.messages = (0, t2.beginCell)(), this.queryId = 0n, this.walletId = e3, this.queryOffset = n3 || 7200;
    }
    addMessage(e3, n3) {
      if (this.messages.refs >= 4) throw Error(`only 4 refs are allowed`);
      this.updateQueryId(), this.messages.storeUint(n3, 8), this.messages.storeRef((0, t2.beginCell)().store((0, t2.storeMessageRelaxed)(e3)).endCell());
    }
    clearMessages() {
      this.messages = (0, t2.beginCell)();
    }
    build() {
      return n2.MultisigOrder.fromPayload((0, t2.beginCell)().storeUint(this.walletId, 32).storeUint(this.queryId, 64).storeBuilder(this.messages).endCell());
    }
    updateQueryId() {
      let e3 = BigInt(Math.floor(Date.now() / 1e3 + this.queryOffset));
      this.queryId = e3 << 32n;
    }
  };
})), En = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.MultisigWallet = void 0;
  let t2 = I(), n2 = mt(), r2 = n2.Cell.fromBase64(`te6ccgECKwEABBgAART/APSkE/S88sgLAQIBIAIDAgFIBAUE2vIgxwCOgzDbPOCDCNcYIPkBAdMH2zwiwAAToVNxePQOb6Hyn9s8VBq6+RDyoAb0BCD5AQHTH1EYuvKq0z9wUwHwCgHCCAGDCryx8mhTFYBA9A5voSCYDqQgwgryZw7f+COqH1NAufJhVCOjU04gIyEiAgLMBgcCASAMDQIBIAgJAgFmCgsAA9GEAiPymAvHoHN9CYbZ5S7Z4BPHohwhJQAtAKkItdJEqCTItdKlwLUAdAT8ArobBKAATwhbpEx4CBukTDgAdAg10rDAJrUAvALyFjPFszJ4HHXI8gBzxb0AMmACASAODwIBIBQVARW77ZbVA0cFUg2zyCoCAUgQEQIBIBITAXOxHXQgwjXGCD5AQHTB4IB1MTtQ9hTIHj0Dm+h8p/XC/9eMfkQ8qCuAfQEIW6TW3Ey4PkBWNs8AaQBgJwA9rtqA6ADoAPoCAXoCEfyAgPyA3XlP+AXkegAA54tkwAAXrhlXP8EA1WZ2oexAAgEgFhcCASAYGQFRtyVbZ4YmRmpGEAgegc30McJNhFpAADMaYeYuAFrgJhwLb+4cC3d0bhAjAYm1WZtnhqvgb+2xxsoicAgej430pBHEoFpAADHDhBACGuQkuuBk9kUWE5kAOeLKhACQCB6IYFImHFImHFImXEA2YlzNijAjAgEgGhsAF7UGtc4QQDVZnah7EAIBIBwdAgOZOB4fARGsGm2eL4G2CUAjABWt+UEAzJV2oewYQAENqTbPBVfBYCMAFa3f3CCAarM7UPYgAiDbPALyZfgAUENxQxPbPO1UIyoACtP/0wcwBKDbPC+uUyCw8mISsQKkJbNTHLmwJYEA4aojoCi8sPJpggGGoPgBBZcCERACPj4wjo0REB/bPEDXePRDEL0F4lQWW1Rz51YQU9zbPFRxClR6vCQlKCYAIO1E0NMf0wfTB9M/9AT0BNEAXgGOGjDSAAHyo9MH0wdQA9cBIPkBBfkBFbrypFAD4GwhIddKqgIi10m68qtwVCATAAwByMv/ywcE1ts87VT4D3AlblOJvrGYEG4QLVDHXwePGzBUJANQTds8UFWgRlAQSRA6SwlTuds8UFQWf+L4AAeDJaGOLCaAQPSWb6UglDBTA7neII4WODk5CNIAAZfTBzAW8AcFkTDifwgHBZJsMeKz5jAGKicoKQBgcI4pA9CDCNcY0wf0BDBTFnj0Dm+h8qXXC/9URUT5EPKmrlIgsVIDvRShI27mbCIyAH5SML6OIF8D+ACTItdKmALTB9QC+wAC6DJwyMoAQBSAQPRDAvAHjhdxyMsAFMsHEssHWM8BWM8WQBOAQPRDAeIBII6KEEUQNEMA2zztVJJfBuIqABzIyx/LB8sHyz/0APQAyQ==`);
  e2.MultisigWallet = class e3 {
    constructor(e4, t3, i2, a2, o2) {
      this.provider = null, this.owners = n2.Dictionary.empty(), this.workchain = t3, this.walletId = i2, this.k = a2;
      for (let t4 = 0; t4 < e4.length; t4 += 1) this.owners.set(t4, Buffer.concat([e4[t4], Buffer.alloc(1)]));
      this.init = { code: r2, data: (0, n2.beginCell)().storeUint(this.walletId, 32).storeUint(this.owners.size, 8).storeUint(this.k, 8).storeUint(0, 64).storeDict(this.owners, n2.Dictionary.Keys.Uint(8), n2.Dictionary.Values.Buffer(33)).storeBit(0).endCell() }, this.address = o2?.address || (0, n2.contractAddress)(t3, this.init), o2?.provider ? this.provider = o2.provider : o2?.client && (this.provider = o2.client.provider(this.address, { code: this.init.code, data: this.init.data }));
    }
    static async fromAddress(t3, r3) {
      let i2;
      if (r3.provider) i2 = r3.provider;
      else {
        if (!r3.client) throw Error(`Either provider or client must be specified`);
        i2 = r3.client.provider(t3, { code: null, data: null });
      }
      let a2 = (await i2.getState()).state;
      if (a2.type !== `active`) throw Error(`Contract must be active`);
      let o2 = n2.Cell.fromBoc(a2.data)[0].beginParse(), s2 = o2.loadUint(32);
      o2.skip(8);
      let c2 = o2.loadUint(8);
      o2.skip(64);
      let l2 = o2.loadDict(n2.Dictionary.Keys.Uint(8), n2.Dictionary.Values.Buffer(33)), u2 = [];
      for (let [e4, t4] of l2) {
        let e5 = t4.subarray(0, 32);
        u2.push(e5);
      }
      return new e3(u2, t3.workChain, s2, c2, { address: t3, provider: i2, client: r3.client });
    }
    async deployExternal(e4) {
      if (!e4 && !this.provider) throw Error(`you must specify provider if there is no such property in MultisigWallet instance`);
      e4 ||= this.provider, await e4.external(n2.Cell.EMPTY);
    }
    async deployInternal(e4, t3 = 1000000000n) {
      await e4.send({ sendMode: n2.SendMode.PAY_GAS_SEPARATELY + n2.SendMode.IGNORE_ERRORS, to: this.address, value: t3, init: this.init, body: n2.Cell.EMPTY, bounce: true });
    }
    async sendOrder(e4, r3, i2) {
      if (!i2 && !this.provider) throw Error(`you must specify provider if there is no such property in MultisigWallet instance`);
      i2 ||= this.provider;
      let a2 = (0, t2.keyPairFromSecretKey)(r3).publicKey, o2 = this.getOwnerIdByPubkey(a2), s2 = e4.toCell(o2), c2 = (0, t2.sign)(s2.hash(), r3);
      s2 = (0, n2.beginCell)().storeBuffer(c2).storeSlice(s2.asSlice()).endCell(), await i2.external(s2);
    }
    async sendOrderWithoutSecretKey(e4, t3, r3, i2) {
      if (!i2 && !this.provider) throw Error(`you must specify provider if there is no such property in MultisigWallet instance`);
      i2 ||= this.provider;
      let a2 = e4.toCell(r3);
      a2 = (0, n2.beginCell)().storeBuffer(t3).storeSlice(a2.asSlice()).endCell(), await i2.external(a2);
    }
    getOwnerIdByPubkey(e4) {
      for (let [t3, n3] of this.owners) if (n3.subarray(0, 32).equals(e4)) return t3;
      throw Error(`public key is not an owner`);
    }
  };
})), Dn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ElectorContract = void 0;
  let t2 = mt(), n2 = { serialize(e3, t3) {
    throw Error(`not implemented`);
  }, parse(e3) {
    return { address: new t2.Address(-1, e3.loadBuffer(32)), weight: e3.loadUintBig(64), stake: e3.loadCoins() };
  } }, r2 = { serialize(e3, t3) {
    throw Error(`not implemented`);
  }, parse(e3) {
    let n3 = e3.loadCoins();
    return e3.skip(64), { stake: n3, address: new t2.Address(-1, e3.loadBuffer(32)), adnl: e3.loadBuffer(32) };
  } };
  e2.ElectorContract = class e3 {
    static create() {
      return new e3();
    }
    constructor() {
      this.address = t2.Address.parseRaw(`-1:3333333333333333333333333333333333333333333333333333333333333333`);
    }
    async getReturnedStake(e4, t3) {
      if (t3.workChain !== -1) throw Error(`Only masterchain addresses could have stake`);
      return (await e4.get(`compute_returned_stake`, [{ type: `int`, value: BigInt(`0x` + t3.hash.toString(`hex`)) }])).stack.readBigNumber();
    }
    async getPastElectionsList(e4) {
      let n3 = await e4.get(`past_elections_list`, []), r3 = new t2.TupleReader(n3.stack.readLispList()), i2 = [];
      for (; r3.remaining > 0; ) {
        let e5 = r3.readTuple(), t3 = e5.readNumber(), n4 = e5.readNumber();
        e5.pop();
        let a2 = e5.readNumber();
        i2.push({ id: t3, unfreezeAt: n4, stakeHeld: a2 });
      }
      return i2;
    }
    async getPastElections(e4) {
      let r3 = await e4.get(`past_elections`, []), i2 = new t2.TupleReader(r3.stack.readLispList()), a2 = [];
      for (; i2.remaining > 0; ) {
        let e5 = i2.readTuple(), r4 = e5.readNumber(), o2 = e5.readNumber(), s2 = e5.readNumber();
        e5.pop();
        let c2 = e5.readCell(), l2 = e5.readBigNumber(), u2 = e5.readBigNumber(), d2 = /* @__PURE__ */ new Map(), f2 = c2.beginParse().loadDictDirect(t2.Dictionary.Keys.Buffer(32), n2);
        for (let [e6, t3] of f2) d2.set(BigInt(`0x` + e6.toString(`hex`)).toString(10), { address: t3.address, weight: t3.weight, stake: t3.stake });
        a2.push({ id: r4, unfreezeAt: o2, stakeHeld: s2, totalStake: l2, bonuses: u2, frozen: d2 });
      }
      return a2;
    }
    async getElectionEntities(e4) {
      let n3 = await e4.getState();
      if (n3.state.type !== `active`) throw Error(`Unexpected error`);
      let i2 = t2.Cell.fromBoc(n3.state.data)[0].beginParse();
      if (!i2.loadBit()) return null;
      let a2 = i2.loadRef().beginParse(), o2 = a2.loadUint(32), s2 = a2.loadUint(32), c2 = a2.loadCoins(), l2 = a2.loadCoins(), u2 = a2.loadDict(t2.Dictionary.Keys.Buffer(32), r2), d2 = [];
      if (u2) for (let [e5, t3] of u2) d2.push({ pubkey: e5, stake: t3.stake, address: t3.address, adnl: t3.adnl });
      return { minStake: c2, allStakes: l2, endElectionsTime: s2, startWorkTime: o2, entities: d2 };
    }
    async getActiveElectionId(e4) {
      let t3 = (await e4.get(`active_election_id`, [])).stack.readNumber();
      return t3 > 0 ? t3 : null;
    }
    async getComplaints(e4, n3) {
      let r3 = new t2.TupleBuilder();
      r3.writeNumber(n3);
      let i2 = await e4.get(`list_complaints`, r3.build());
      if (i2.stack.peek().type === `null`) return [];
      let a2 = new t2.TupleReader(i2.stack.readLispList()), o2 = [];
      for (; a2.remaining > 0; ) {
        let e5 = a2.readTuple(), n4 = e5.readBigNumber(), r4 = e5.readTuple(), i3 = r4.readTuple(), s2 = Buffer.from(i3.readBigNumber().toString(16), `hex`);
        i3.readCell();
        let c2 = i3.readNumber(), l2 = i3.readNumber(), u2 = new t2.Address(-1, Buffer.from(i3.readBigNumber().toString(16), `hex`)), d2 = i3.readBigNumber(), f2 = i3.readBigNumber(), p2 = i3.readBigNumber(), m2 = [], h2 = new t2.TupleReader(r4.readLispList());
        for (; h2.remaining > 0; ) m2.push(h2.readNumber());
        let g2 = r4.readBigNumber(), _2 = r4.readBigNumber();
        o2.push({ id: n4, publicKey: s2, createdAt: c2, severity: l2, paid: d2, suggestedFine: f2, suggestedFinePart: p2, rewardAddress: u2, votes: m2, remainingWeight: _2, vsetId: g2 });
      }
      return o2;
    }
  };
})), On = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.configParseMasterAddress = n2, e2.parseValidatorSet = a2, e2.parseBridge = o2, e2.configParseMasterAddressRequired = s2, e2.configParse5 = c2, e2.configParse6 = l2, e2.configParse7 = u2, e2.configParse9 = d2, e2.configParse10 = f2, e2.configParse13 = p2, e2.configParse14 = m2, e2.configParse15 = h2, e2.configParse16 = g2, e2.configParse17 = _2, e2.configParse18 = y2, e2.configParse8 = b2, e2.configParse40 = x2, e2.configParseWorkchainDescriptor = S2, e2.configParse12 = T2, e2.configParseValidatorSet = E2, e2.configParseBridge = D2, e2.loadJettonBridgeParams = O2, e2.configParseGasLimitsPrices = A2, e2.configParseBlockLimits = M2, e2.configParseMsgPrices = N2, e2.configParse28 = P2, e2.configParse29 = F2, e2.configParse31 = I2, e2.configParse44 = L2, e2.configParse45 = z2, e2.parseProposalSetup = B2, e2.parseVotingSetup = V2, e2.loadConfigParamById = U2, e2.loadConfigParamsAsSlice = W2, e2.parseFullConfig = G2, e2.parseFullerConfig = K2;
  let t2 = mt();
  function n2(e3) {
    return e3 ? new t2.Address(-1, e3.loadBuffer(32)) : null;
  }
  function r2(e3) {
    if (e3.loadUint(32) !== 2390828938) throw Error(`Invalid publicKey`);
    return e3.loadBuffer(32);
  }
  let i2 = { serialize(e3, t3) {
    throw Error(`not implemented`);
  }, parse(e3) {
    let t3 = e3.loadUint(8);
    if (t3 === 83) return { publicKey: r2(e3), weight: e3.loadUintBig(64), adnlAddress: null };
    if (t3 === 115) return { publicKey: r2(e3), weight: e3.loadUintBig(64), adnlAddress: e3.loadBuffer(32) };
    throw Error(`Invalid validator description dict`);
  } };
  function a2(e3) {
    let n3 = e3.loadUint(8);
    return n3 === 17 ? { timeSince: e3.loadUint(32), timeUntil: e3.loadUint(32), total: e3.loadUint(16), main: e3.loadUint(16), totalWeight: null, list: e3.loadDictDirect(t2.Dictionary.Keys.Uint(16), i2) } : n3 === 18 ? { timeSince: e3.loadUint(32), timeUntil: e3.loadUint(32), total: e3.loadUint(16), main: e3.loadUint(16), totalWeight: e3.loadUintBig(64), list: e3.loadDict(t2.Dictionary.Keys.Uint(16), i2) } : null;
  }
  function o2(e3) {
    let n3 = new t2.Address(-1, e3.loadBuffer(32)), r3 = new t2.Address(-1, e3.loadBuffer(32)), i3 = e3.loadDict(t2.Dictionary.Keys.Buffer(32), t2.Dictionary.Values.Buffer(32)), a3 = /* @__PURE__ */ new Map();
    for (let [e4, n4] of i3) a3.set(new t2.Address(-1, e4).toString(), n4);
    return { bridgeAddress: n3, oracleMultisigAddress: r3, oracles: a3, externalChainAddress: e3.loadBuffer(32) };
  }
  function s2(e3) {
    if (!e3) throw Error(`Invalid master address`);
    return n2(e3);
  }
  function c2(e3) {
    if (!e3) throw Error(`No config5 slice`);
    if (e3.loadUint(8) === 1) return { blackholeAddr: e3.loadBit() ? new t2.Address(-1, e3.loadBuffer(32)) : null, feeBurnNominator: e3.loadUint(32), feeBurnDenominator: e3.loadUint(32) };
    throw Error(`Invalid config5`);
  }
  function l2(e3) {
    return e3 ? { mintNewPrice: e3.loadCoins(), mintAddPrice: e3.loadCoins() } : null;
  }
  function u2(e3) {
    if (!e3) throw Error(`No config7 slice`);
    return { toMint: (0, t2.loadExtraCurrency)(e3.loadRef()) };
  }
  function d2(e3) {
    if (!e3) throw Error(`No config9 slice`);
    return new Set(e3.loadDictDirect(t2.Dictionary.Keys.Int(32), t2.Dictionary.Values.Uint(0)).keys());
  }
  function f2(e3) {
    if (!e3) throw Error(`No config10 slice`);
    return new Set(e3.loadDictDirect(t2.Dictionary.Keys.Int(32), t2.Dictionary.Values.Uint(0)).keys());
  }
  function p2(e3) {
    if (!e3) throw Error(`No config13 slice`);
    if (e3.loadUint(8) !== 26) throw Error(`Invalid config13`);
    return { deposit: e3.loadCoins(), bitPrice: e3.loadCoins(), cellPrice: e3.loadCoins() };
  }
  function m2(e3) {
    if (!e3) throw Error(`No config14 slice`);
    if (e3.loadUint(8) !== 107) throw Error(`Invalid config14`);
    return { masterchainBlockFee: e3.loadCoins(), workchainBlockFee: e3.loadCoins() };
  }
  function h2(e3) {
    if (!e3) throw Error(`No config15 slice`);
    return { validatorsElectedFor: e3.loadUint(32), electorsStartBefore: e3.loadUint(32), electorsEndBefore: e3.loadUint(32), stakeHeldFor: e3.loadUint(32) };
  }
  function g2(e3) {
    if (!e3) throw Error(`No config16 slice`);
    return { maxValidators: e3.loadUint(16), maxMainValidators: e3.loadUint(16), minValidators: e3.loadUint(16) };
  }
  function _2(e3) {
    if (!e3) throw Error(`No config17 slice`);
    return { minStake: e3.loadCoins(), maxStake: e3.loadCoins(), minTotalStake: e3.loadCoins(), maxStakeFactor: e3.loadUint(32) };
  }
  let v2 = { serialize(e3, t3) {
    throw Error(`not implemented`);
  }, parse(e3) {
    if (e3.loadUint(8) !== 204) throw Error(`Invalid storage prices dict`);
    return { utime_since: e3.loadUint(32), bit_price_ps: e3.loadUintBig(64), cell_price_ps: e3.loadUintBig(64), mc_bit_price_ps: e3.loadUintBig(64), mc_cell_price_ps: e3.loadUintBig(64) };
  } };
  function y2(e3) {
    if (!e3) throw Error(`No config18 slice`);
    return e3.loadDictDirect(t2.Dictionary.Keys.Buffer(4), v2).values();
  }
  function b2(e3) {
    return e3 ? { version: e3.loadUint(32), capabilities: e3.loadUintBig(64) } : { version: 0, capabilities: 0n };
  }
  function x2(e3) {
    if (!e3) return null;
    if (e3.loadUint(8) !== 1) throw Error(`Invalid config40`);
    return { defaultFlatFine: e3.loadCoins(), defaultProportionaFine: e3.loadCoins(), severityFlatMult: e3.loadUint(16), severityProportionalMult: e3.loadUint(16), unfunishableInterval: e3.loadUint(16), longInterval: e3.loadUint(16), longFlatMult: e3.loadUint(16), longProportionalMult: e3.loadUint(16), mediumInterval: e3.loadUint(16), mediumFlatMult: e3.loadUint(16), mediumProportionalMult: e3.loadUint(16) };
  }
  function S2(e3) {
    let t3 = e3.loadUint(8);
    if (t3 != 166 && t3 != 167) throw Error(`Invalid workchain descriptor`);
    let n3 = e3.loadUint(32), r3 = e3.loadUint(8), i3 = e3.loadUint(8), a3 = e3.loadUint(8), o3 = e3.loadBit(), s3 = e3.loadBit(), c3 = e3.loadBit(), l3 = e3.loadUint(13), u3 = e3.loadBuffer(32), d3 = e3.loadBuffer(32), f3 = e3.loadUint(32);
    if (!e3.loadUint(4)) throw Error(`Not basic workchain descriptor`);
    let p3 = e3.loadInt(32), m3 = e3.loadUintBig(64), h3;
    if (t3 == 167) {
      let t4 = C2(e3), n4 = e3.loadUint(8);
      if (n4 > 63) throw RangeError(`Invalid persistent_state_split_depth: ${n4} expected <= 63`);
      h3 = { split_merge_timings: t4, persistent_state_split_depth: n4 };
    }
    return { enabledSince: n3, actialMinSplit: r3, min_split: i3, max_split: a3, basic: o3, active: s3, accept_msgs: c3, flags: l3, zerostateRootHash: u3, zerostateFileHash: d3, version: f3, format: { vmVersion: p3, vmMode: m3 }, workchain_v2: h3 };
  }
  function C2(e3) {
    if (e3.loadUint(4) !== 0) throw Error(`Invalid WcSplitMergeTimings tag expected 0!`);
    return { split_merge_delay: e3.loadUint(32), split_merge_interval: e3.loadUint(32), min_split_merge_interval: e3.loadUint(32), max_split_merge_delay: e3.loadUint(32) };
  }
  let w2 = { serialize(e3, t3) {
    throw Error(`not implemented`);
  }, parse(e3) {
    return S2(e3);
  } };
  function T2(e3) {
    if (!e3) throw Error(`No config12 slice`);
    let n3 = e3.loadDict(t2.Dictionary.Keys.Uint(32), w2);
    if (n3) return n3;
    throw Error(`No workchains exist`);
  }
  function E2(e3) {
    return e3 ? a2(e3) : null;
  }
  function D2(e3) {
    return e3 ? o2(e3) : null;
  }
  function O2(e3) {
    if (!e3) return null;
    let n3 = e3.loadUint(8);
    if (n3 === 0) return { bridgeAddress: new t2.Address(-1, e3.loadBuffer(32)), oracleAddress: new t2.Address(-1, e3.loadBuffer(32)), oracles: [...e3.loadDict(t2.Dictionary.Keys.Buffer(32), t2.Dictionary.Values.Buffer(32))].map((e4) => ({ addr: new t2.Address(-1, e4[0]), pubkey: e4[1] })), flags: e3.loadUint(8), bridgeBurnFee: e3.loadCoins() };
    if (n3 === 1) {
      let n4 = new t2.Address(-1, e3.loadBuffer(32)), r3 = new t2.Address(-1, e3.loadBuffer(32)), i3 = [...e3.loadDict(t2.Dictionary.Keys.Buffer(32), t2.Dictionary.Values.Buffer(32))].map((e4) => ({ addr: new t2.Address(-1, e4[0]), pubkey: e4[1] })), a3 = e3.loadUint(8), o3 = e3.loadRef().beginParse(), s3 = o3.loadCoins(), c3 = o3.loadCoins(), l3 = o3.loadCoins(), u3 = o3.loadCoins(), d3 = o3.loadCoins(), f3 = o3.loadCoins(), p3 = e3.loadBuffer(32);
      return { bridgeAddress: n4, oracleAddress: r3, oracles: i3, flags: a3, jettonBridgePrices: { bridgeBurnFee: s3, bridgeMintFee: c3, walletMinTonsForStorage: l3, walletGasConsumption: u3, minterMinTonsForStorage: d3, discoverGasConsumption: f3 }, externalChainAddress: p3 };
    }
    throw Error(`Invalid msg prices param`);
  }
  function k2(e3) {
    let t3 = e3.loadUint(8);
    if (t3 === 222) return { gasPrice: e3.loadUintBig(64), gasLimit: e3.loadUintBig(64), specialGasLimit: e3.loadUintBig(64), gasCredit: e3.loadUintBig(64), blockGasLimit: e3.loadUintBig(64), freezeDueLimit: e3.loadUintBig(64), deleteDueLimit: e3.loadUintBig(64) };
    if (t3 === 221) return { gasPrice: e3.loadUintBig(64), gasLimit: e3.loadUintBig(64), gasCredit: e3.loadUintBig(64), blockGasLimit: e3.loadUintBig(64), freezeDueLimit: e3.loadUintBig(64), deleteDueLimit: e3.loadUintBig(64) };
    throw Error(`Invalid gas limits internal`);
  }
  function A2(e3) {
    if (!e3) throw Error(`No gas limits slice`);
    if (e3.loadUint(8) === 209) return { flatLimit: e3.loadUintBig(64), flatGasPrice: e3.loadUintBig(64), other: k2(e3) };
    throw Error(`Invalid gas limits`);
  }
  function j2(e3) {
    if (e3.loadUint(8) !== 195) throw Error(`Invalid params limit slice`);
    let t3 = e3.loadUint(32), n3 = e3.loadUint(32), r3 = e3.loadUint(32);
    if (t3 > n3 || n3 > r3) throw Error(`Incosistent limitParams`);
    return { underload: t3, softLimit: n3, hardLimit: r3 };
  }
  function M2(e3) {
    if (!e3) throw Error(`No block limits slice`);
    let t3 = e3.loadUint(8);
    if (t3 === 93) return { bytes: j2(e3), gas: j2(e3), ltDelta: j2(e3) };
    if (t3 === 94) {
      let t4 = j2(e3), n3 = j2(e3), r3 = j2(e3), i3 = j2(e3);
      if (e3.loadUint(8) !== 211) throw Error(`Invalid importedMsgQueue`);
      return { bytes: t4, gas: n3, ltDelta: r3, collatedData: i3, importedMsgQueue: { maxBytes: e3.loadUint(32), maxMsgs: e3.loadUint(32) } };
    }
    throw Error(`Invalid block limits`);
  }
  function N2(e3) {
    if (!e3) throw Error(`No msg prices slice`);
    if (e3.loadUint(8) !== 234) throw Error(`Invalid msg prices param`);
    return { lumpPrice: e3.loadUintBig(64), bitPrice: e3.loadUintBig(64), cellPrice: e3.loadUintBig(64), ihrPriceFactor: e3.loadUint(32), firstFrac: e3.loadUint(16), nextFrac: e3.loadUint(16) };
  }
  function P2(e3) {
    if (!e3) throw Error(`No config28 slice`);
    let t3 = e3.loadUint(8);
    if (t3 === 193) return { masterCatchainLifetime: e3.loadUint(32), shardCatchainLifetime: e3.loadUint(32), shardValidatorsLifetime: e3.loadUint(32), shardValidatorsCount: e3.loadUint(32) };
    if (t3 === 194) return { flags: e3.loadUint(7), suffleMasterValidators: e3.loadBit(), masterCatchainLifetime: e3.loadUint(32), shardCatchainLifetime: e3.loadUint(32), shardValidatorsLifetime: e3.loadUint(32), shardValidatorsCount: e3.loadUint(32) };
    throw Error(`Invalid config28`);
  }
  function F2(e3) {
    if (!e3) throw Error(`No config29 slice`);
    let t3 = e3.loadUint(8);
    if (t3 === 214) return { roundCandidates: e3.loadUint(32), nextCandidateDelay: e3.loadUint(32), consensusTimeout: e3.loadUint(32), fastAttempts: e3.loadUint(32), attemptDuration: e3.loadUint(32), catchainMaxDeps: e3.loadUint(32), maxBlockBytes: e3.loadUint(32), maxColaltedBytes: e3.loadUint(32) };
    if (t3 === 215) return { flags: e3.loadUint(7), newCatchainIds: e3.loadBit(), roundCandidates: e3.loadUint(8), nextCandidateDelay: e3.loadUint(32), consensusTimeout: e3.loadUint(32), fastAttempts: e3.loadUint(32), attemptDuration: e3.loadUint(32), catchainMaxDeps: e3.loadUint(32), maxBlockBytes: e3.loadUint(32), maxColaltedBytes: e3.loadUint(32) };
    if (t3 === 216) return { flags: e3.loadUint(7), newCatchainIds: e3.loadBit(), roundCandidates: e3.loadUint(8), nextCandidateDelay: e3.loadUint(32), consensusTimeout: e3.loadUint(32), fastAttempts: e3.loadUint(32), attemptDuration: e3.loadUint(32), catchainMaxDeps: e3.loadUint(32), maxBlockBytes: e3.loadUint(32), maxColaltedBytes: e3.loadUint(32), protoVersion: e3.loadUint(16) };
    if (t3 === 217) return { flags: e3.loadUint(7), newCatchainIds: e3.loadBit(), roundCandidates: e3.loadUint(8), nextCandidateDelay: e3.loadUint(32), consensusTimeout: e3.loadUint(32), fastAttempts: e3.loadUint(32), attemptDuration: e3.loadUint(32), catchainMaxDeps: e3.loadUint(32), maxBlockBytes: e3.loadUint(32), maxColaltedBytes: e3.loadUint(32), protoVersion: e3.loadUint(16), catchainMaxBlocksCoeff: e3.loadUint(32) };
    throw Error(`Invalid config29`);
  }
  function I2(e3) {
    if (!e3) throw Error(`No config31 slice`);
    return [...e3.loadDict(t2.Dictionary.Keys.Buffer(32), t2.Dictionary.Values.Uint(0))].map((e4) => new t2.Address(-1, e4[0]));
  }
  function L2(e3) {
    if (!e3) throw Error(`No config44 slice`);
    if (e3.loadUint(8) !== 0) throw Error(`Invalid config44`);
    let n3 = e3.loadDict(t2.Dictionary.Keys.Buffer(36), t2.Dictionary.Values.Uint(0)), r3 = e3.loadUint(32);
    return { addresses: [...n3].map((e4) => new t2.Address(e4[0].readInt32BE(), e4[0].subarray(4))), suspendedUntil: r3 };
  }
  let R2 = { serialize: () => {
    throw Error(`not implemented`);
  }, parse: (e3) => {
    if (e3.loadUint(8) !== 176) throw Error(`Invalid precompiled contracts dict`);
    return e3.loadUintBig(64);
  } };
  function z2(e3) {
    if (!e3) throw Error(`No config45 slice`);
    if (e3.loadUint(8) !== 192) throw Error(`Invalid config45`);
    return [...e3.loadDict(t2.Dictionary.Keys.Buffer(32), R2)].map((e4) => ({ hash: e4[0], gasUsed: e4[1] }));
  }
  function B2(e3) {
    if (e3.loadUint(8) !== 54) throw Error(`Invalid proposal setup`);
    return { minTotalRounds: e3.loadUint(8), maxTotalRounds: e3.loadUint(8), minWins: e3.loadUint(8), maxLoses: e3.loadUint(8), minStoreSec: e3.loadUint(32), maxStoreSec: e3.loadUint(32), bitPrice: e3.loadUint(32), cellPrice: e3.loadUint(32) };
  }
  function V2(e3) {
    if (!e3) throw Error(`No voting setup`);
    if (e3.loadUint(8) !== 145) throw Error(`Invalid voting setup`);
    return { normalParams: B2(e3.loadRef().beginParse()), criticalParams: B2(e3.loadRef().beginParse()) };
  }
  function H2(e3) {
    return t2.Cell.fromBase64(e3).beginParse().loadDictDirect(t2.Dictionary.Keys.Int(32), t2.Dictionary.Values.Cell());
  }
  function U2(e3, t3) {
    return H2(e3).get(t3);
  }
  function W2(e3) {
    let t3 = H2(e3), n3 = /* @__PURE__ */ new Map();
    for (let [e4, r3] of t3) n3.set(e4, r3.beginParse());
    return n3;
  }
  function G2(e3) {
    return { configAddress: s2(e3.get(0)), electorAddress: s2(e3.get(1)), minterAddress: n2(e3.get(2)), feeCollectorAddress: n2(e3.get(3)), dnsRootAddress: n2(e3.get(4)), burningConfig: c2(e3.get(5)), globalVersion: b2(e3.get(8)), workchains: T2(e3.get(12)), voting: V2(e3.get(11)), validators: { ...h2(e3.get(15)), ...g2(e3.get(16)), ..._2(e3.get(17)) }, storagePrices: y2(e3.get(18)), gasPrices: { masterchain: A2(e3.get(20)), workchain: A2(e3.get(21)) }, msgPrices: { masterchain: N2(e3.get(24)), workchain: N2(e3.get(25)) }, validatorSets: { prevValidators: E2(e3.get(32)), prevTempValidators: E2(e3.get(33)), currentValidators: E2(e3.get(34)), currentTempValidators: E2(e3.get(35)), nextValidators: E2(e3.get(36)), nextTempValidators: E2(e3.get(37)) }, validatorsPunish: x2(e3.get(40)), bridges: { ethereum: D2(e3.get(71)), binance: D2(e3.get(72)), polygon: D2(e3.get(73)) }, catchain: P2(e3.get(28)), consensus: F2(e3.get(29)) };
  }
  function K2(e3) {
    return { configAddress: s2(e3.get(0)), electorAddress: s2(e3.get(1)), minterAddress: n2(e3.get(2)), feeCollectorAddress: n2(e3.get(3)), dnsRootAddress: n2(e3.get(4)), burningConfig: c2(e3.get(5)), extraCurrenciesMintPrices: l2(e3.get(6)), extraCurrencies: u2(e3.get(7)), globalVersion: b2(e3.get(8)), configMandatoryParams: d2(e3.get(9)), configCriticalParams: f2(e3.get(10)), voting: V2(e3.get(11)), workchains: T2(e3.get(12)), complaintCost: p2(e3.get(13)), blockCreationRewards: m2(e3.get(14)), validators: { ...h2(e3.get(15)), ...g2(e3.get(16)), ..._2(e3.get(17)) }, storagePrices: y2(e3.get(18)), gasPrices: { masterchain: A2(e3.get(20)), workchain: A2(e3.get(21)) }, blockLimits: { masterchain: M2(e3.get(22)), workchain: M2(e3.get(23)) }, msgPrices: { masterchain: N2(e3.get(24)), workchain: N2(e3.get(25)) }, catchain: P2(e3.get(28)), consensus: F2(e3.get(29)), fundamentalSmcAddr: I2(e3.get(31)), validatorSets: { prevValidators: E2(e3.get(32)), prevTempValidators: E2(e3.get(33)), currentValidators: E2(e3.get(34)), currentTempValidators: E2(e3.get(35)), nextValidators: E2(e3.get(36)), nextTempValidators: E2(e3.get(37)) }, validatorsPunish: x2(e3.get(40)), suspended: L2(e3.get(44)), precompiledContracts: z2(e3.get(45)), bridges: { ethereum: D2(e3.get(71)), binance: D2(e3.get(72)), polygon: D2(e3.get(73)) }, tokenBridges: { ethereum: O2(e3.get(79)), binance: O2(e3.get(81)), polygon: O2(e3.get(82)) } };
  }
})), kn = i(((e2) => {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.computeStorageFees = n2, e2.computeFwdFees = r2, e2.computeGasPrices = i2, e2.computeExternalMessageFees = a2, e2.computeMessageForwardFees = o2;
  let t2 = mt();
  function n2(e3) {
    let { lastPaid: t3, now: n3, storagePrices: r3, storageStat: i3, special: a3, masterchain: o3 } = e3;
    if (n3 <= t3 || r3.length === 0 || n3 < r3[0].utime_since || a3) return BigInt(0);
    let s3 = Math.max(t3, r3[0].utime_since), l2 = BigInt(0);
    for (let e4 = 0; e4 < r3.length && s3 < n3; e4++) {
      let t4 = e4 < r3.length - 1 ? Math.min(n3, r3[e4 + 1].utime_since) : n3, a4 = BigInt(0);
      if (s3 < t4) {
        let n4 = t4 - s3;
        a4 += BigInt(i3.cells) * (o3 ? r3[e4].mc_cell_price_ps : r3[e4].cell_price_ps), a4 += BigInt(i3.bits) * (o3 ? r3[e4].mc_bit_price_ps : r3[e4].bit_price_ps), a4 *= BigInt(n4);
      }
      s3 = t4, l2 += a4;
    }
    return c2(l2);
  }
  function r2(e3, t3, n3) {
    return e3.lumpPrice + c2(e3.bitPrice * n3 + e3.cellPrice * t3);
  }
  function i2(e3, t3) {
    return e3 <= t3.flatLimit ? t3.flatPrice : t3.flatPrice + (t3.price * (e3 - t3.flatLimit) >> 16n);
  }
  function a2(e3, t3) {
    let n3 = s2(t3);
    return n3.bits -= t3.bits.length, --n3.cells, r2(e3, BigInt(n3.cells), BigInt(n3.bits));
  }
  function o2(e3, n3) {
    let i3 = (0, t2.loadMessageRelaxed)(n3.beginParse()), a3 = { bits: 0, cells: 0 };
    if (i3.init) {
      let e4 = new t2.Cell().asBuilder();
      (0, t2.storeStateInit)(i3.init)(e4);
      let n4 = e4.endCell(), r3 = s2(n4);
      r3.bits -= n4.bits.length, --r3.cells, a3.bits += r3.bits, a3.cells += r3.cells;
    }
    let o3 = s2(i3.body);
    o3.bits -= i3.body.bits.length, --o3.cells, a3.bits += o3.bits, a3.cells += o3.cells;
    let c3 = r2(e3, BigInt(a3.cells), BigInt(a3.bits)), l2 = c3 * BigInt(e3.firstFrac) >> 16n;
    return { fees: l2, remaining: c3 - l2 };
  }
  function s2(e3) {
    let t3 = e3.bits.length, n3 = 1;
    for (let r3 of e3.refs) {
      let e4 = s2(r3);
      n3 += e4.cells, t3 += e4.bits;
    }
    return { bits: t3, cells: n3 };
  }
  function c2(e3) {
    let t3 = e3 % 65536n, n3 = e3 >> 16n;
    return t3 !== 0n && (n3 += 1n), n3;
  }
})), An = i(((e2) => {
  var t2 = e2 && e2.__createBinding || (Object.create ? (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3);
    var i3 = Object.getOwnPropertyDescriptor(t3, n3);
    (!i3 || (`get` in i3 ? !t3.__esModule : i3.writable || i3.configurable)) && (i3 = { enumerable: true, get: function() {
      return t3[n3];
    } }), Object.defineProperty(e3, r3, i3);
  }) : (function(e3, t3, n3, r3) {
    r3 === void 0 && (r3 = n3), e3[r3] = t3[n3];
  })), n2 = e2 && e2.__exportStar || function(e3, n3) {
    for (var r3 in e3) r3 !== "default" && !Object.prototype.hasOwnProperty.call(n3, r3) && t2(n3, e3, r3);
  };
  Object.defineProperty(e2, "__esModule", { value: true }), e2.computeStorageFees = e2.computeMessageForwardFees = e2.computeGasPrices = e2.computeFwdFees = e2.computeExternalMessageFees = e2.loadConfigParamsAsSlice = e2.loadConfigParamById = e2.parseFullerConfig = e2.parseFullConfig = e2.parseVotingSetup = e2.parseValidatorSet = e2.parseProposalSetup = e2.parseBridge = e2.configParseWorkchainDescriptor = e2.configParseValidatorSet = e2.configParseMsgPrices = e2.configParseMasterAddressRequired = e2.configParseMasterAddress = e2.configParseGasLimitsPrices = e2.configParseBridge = e2.configParse40 = e2.configParse29 = e2.configParse28 = e2.configParse18 = e2.configParse17 = e2.configParse16 = e2.configParse15 = e2.configParse13 = e2.configParse12 = e2.configParse8 = e2.configParse5 = e2.ElectorContract = e2.MultisigWallet = e2.MultisigOrderBuilder = e2.MultisigOrder = e2.JettonWallet = e2.JettonMaster = e2.WalletContractV5R1 = e2.WalletContractV5Beta = e2.WalletContractV4 = e2.WalletContractV3R2 = e2.WalletContractV3R1 = e2.WalletContractV2R2 = e2.WalletContractV2R1 = e2.WalletContractV1R3 = e2.WalletContractV1R2 = e2.WalletContractV1R1 = e2.TonClient4 = e2.TonClient = e2.HttpApi = void 0, n2(mt(), e2);
  var r2 = Ut();
  Object.defineProperty(e2, "HttpApi", { enumerable: true, get: function() {
    return r2.HttpApi;
  } });
  var i2 = Wt();
  Object.defineProperty(e2, "TonClient", { enumerable: true, get: function() {
    return i2.TonClient;
  } });
  var a2 = Kt();
  Object.defineProperty(e2, "TonClient4", { enumerable: true, get: function() {
    return a2.TonClient4;
  } });
  var o2 = an();
  Object.defineProperty(e2, "WalletContractV1R1", { enumerable: true, get: function() {
    return o2.WalletContractV1R1;
  } });
  var s2 = sn();
  Object.defineProperty(e2, "WalletContractV1R2", { enumerable: true, get: function() {
    return s2.WalletContractV1R2;
  } });
  var c2 = ln();
  Object.defineProperty(e2, "WalletContractV1R3", { enumerable: true, get: function() {
    return c2.WalletContractV1R3;
  } });
  var l2 = dn();
  Object.defineProperty(e2, "WalletContractV2R1", { enumerable: true, get: function() {
    return l2.WalletContractV2R1;
  } });
  var u2 = pn();
  Object.defineProperty(e2, "WalletContractV2R2", { enumerable: true, get: function() {
    return u2.WalletContractV2R2;
  } });
  var d2 = hn();
  Object.defineProperty(e2, "WalletContractV3R1", { enumerable: true, get: function() {
    return d2.WalletContractV3R1;
  } });
  var f2 = _n();
  Object.defineProperty(e2, "WalletContractV3R2", { enumerable: true, get: function() {
    return f2.WalletContractV3R2;
  } });
  var p2 = yn();
  Object.defineProperty(e2, "WalletContractV4", { enumerable: true, get: function() {
    return p2.WalletContractV4;
  } });
  var m2 = bn();
  Object.defineProperty(e2, "WalletContractV5Beta", { enumerable: true, get: function() {
    return m2.WalletContractV5Beta;
  } });
  var h2 = xn();
  Object.defineProperty(e2, "WalletContractV5R1", { enumerable: true, get: function() {
    return h2.WalletContractV5R1;
  } });
  var g2 = Sn();
  Object.defineProperty(e2, "JettonMaster", { enumerable: true, get: function() {
    return g2.JettonMaster;
  } });
  var _2 = Cn();
  Object.defineProperty(e2, "JettonWallet", { enumerable: true, get: function() {
    return _2.JettonWallet;
  } });
  var v2 = wn();
  Object.defineProperty(e2, "MultisigOrder", { enumerable: true, get: function() {
    return v2.MultisigOrder;
  } });
  var y2 = Tn();
  Object.defineProperty(e2, "MultisigOrderBuilder", { enumerable: true, get: function() {
    return y2.MultisigOrderBuilder;
  } });
  var b2 = En();
  Object.defineProperty(e2, "MultisigWallet", { enumerable: true, get: function() {
    return b2.MultisigWallet;
  } });
  var x2 = Dn();
  Object.defineProperty(e2, "ElectorContract", { enumerable: true, get: function() {
    return x2.ElectorContract;
  } });
  var S2 = On();
  Object.defineProperty(e2, "configParse5", { enumerable: true, get: function() {
    return S2.configParse5;
  } }), Object.defineProperty(e2, "configParse8", { enumerable: true, get: function() {
    return S2.configParse8;
  } }), Object.defineProperty(e2, "configParse12", { enumerable: true, get: function() {
    return S2.configParse12;
  } }), Object.defineProperty(e2, "configParse13", { enumerable: true, get: function() {
    return S2.configParse13;
  } }), Object.defineProperty(e2, "configParse15", { enumerable: true, get: function() {
    return S2.configParse15;
  } }), Object.defineProperty(e2, "configParse16", { enumerable: true, get: function() {
    return S2.configParse16;
  } }), Object.defineProperty(e2, "configParse17", { enumerable: true, get: function() {
    return S2.configParse17;
  } }), Object.defineProperty(e2, "configParse18", { enumerable: true, get: function() {
    return S2.configParse18;
  } }), Object.defineProperty(e2, "configParse28", { enumerable: true, get: function() {
    return S2.configParse28;
  } }), Object.defineProperty(e2, "configParse29", { enumerable: true, get: function() {
    return S2.configParse29;
  } }), Object.defineProperty(e2, "configParse40", { enumerable: true, get: function() {
    return S2.configParse40;
  } }), Object.defineProperty(e2, "configParseBridge", { enumerable: true, get: function() {
    return S2.configParseBridge;
  } }), Object.defineProperty(e2, "configParseGasLimitsPrices", { enumerable: true, get: function() {
    return S2.configParseGasLimitsPrices;
  } }), Object.defineProperty(e2, "configParseMasterAddress", { enumerable: true, get: function() {
    return S2.configParseMasterAddress;
  } }), Object.defineProperty(e2, "configParseMasterAddressRequired", { enumerable: true, get: function() {
    return S2.configParseMasterAddressRequired;
  } }), Object.defineProperty(e2, "configParseMsgPrices", { enumerable: true, get: function() {
    return S2.configParseMsgPrices;
  } }), Object.defineProperty(e2, "configParseValidatorSet", { enumerable: true, get: function() {
    return S2.configParseValidatorSet;
  } }), Object.defineProperty(e2, "configParseWorkchainDescriptor", { enumerable: true, get: function() {
    return S2.configParseWorkchainDescriptor;
  } }), Object.defineProperty(e2, "parseBridge", { enumerable: true, get: function() {
    return S2.parseBridge;
  } }), Object.defineProperty(e2, "parseProposalSetup", { enumerable: true, get: function() {
    return S2.parseProposalSetup;
  } }), Object.defineProperty(e2, "parseValidatorSet", { enumerable: true, get: function() {
    return S2.parseValidatorSet;
  } }), Object.defineProperty(e2, "parseVotingSetup", { enumerable: true, get: function() {
    return S2.parseVotingSetup;
  } }), Object.defineProperty(e2, "parseFullConfig", { enumerable: true, get: function() {
    return S2.parseFullConfig;
  } }), Object.defineProperty(e2, "parseFullerConfig", { enumerable: true, get: function() {
    return S2.parseFullerConfig;
  } }), Object.defineProperty(e2, "loadConfigParamById", { enumerable: true, get: function() {
    return S2.loadConfigParamById;
  } }), Object.defineProperty(e2, "loadConfigParamsAsSlice", { enumerable: true, get: function() {
    return S2.loadConfigParamsAsSlice;
  } });
  var C2 = kn();
  Object.defineProperty(e2, "computeExternalMessageFees", { enumerable: true, get: function() {
    return C2.computeExternalMessageFees;
  } }), Object.defineProperty(e2, "computeFwdFees", { enumerable: true, get: function() {
    return C2.computeFwdFees;
  } }), Object.defineProperty(e2, "computeGasPrices", { enumerable: true, get: function() {
    return C2.computeGasPrices;
  } }), Object.defineProperty(e2, "computeMessageForwardFees", { enumerable: true, get: function() {
    return C2.computeMessageForwardFees;
  } }), Object.defineProperty(e2, "computeStorageFees", { enumerable: true, get: function() {
    return C2.computeStorageFees;
  } });
})), jn = I(), Mn = An(), Nn = u();
const Pn = [44, 607, 0], Fn = new TextEncoder().encode(`ed25519 seed`);
function In(e2) {
  let t2 = Nn.Buffer.alloc(32), n2 = e2 === `v4r2` ? Mn.WalletContractV4.create({ workchain: 0, publicKey: t2 }) : Mn.WalletContractV5R1.create({ publicKey: t2, walletId: { networkGlobalId: -239, context: { walletVersion: `v5r1`, workchain: 0, subwalletNumber: 0 } } });
  t2.fill(0);
  let r2 = n2.init?.code;
  if (!r2) throw Error(`Missing canonical ${e2} wallet code.`);
  return r2;
}
const Ln = { v4r2: In(`v4r2`), w5: In(`w5`) };
function Rn(e2) {
  let t2 = c(a, Fn, e2), n2 = t2.slice(0, 32), r2 = t2.slice(32);
  t2.fill(0);
  try {
    for (let e3 of Pn) {
      let i2 = new Uint8Array(1 + n2.length + 4);
      i2.set(n2, 1), new DataView(i2.buffer).setUint32(1 + n2.length, e3 + 2147483648, false);
      try {
        t2 = c(a, r2, i2);
      } finally {
        i2.fill(0);
      }
      let o2 = t2.slice(0, 32), s2 = t2.slice(32);
      t2.fill(0), n2.fill(0), r2.fill(0), n2 = o2, r2 = s2;
    }
    return r2.fill(0), n2;
  } catch (e3) {
    throw t2.fill(0), n2.fill(0), r2.fill(0), e3;
  }
}
function zn(e2) {
  if (e2.byteLength !== 32) throw Error(`An Ed25519 seed must be exactly 32 bytes.`);
  try {
    return Nn.Buffer.from(f.getPublicKey(e2));
  } catch {
    let t2 = (0, jn.keyPairFromSeed)(Nn.Buffer.from(e2));
    try {
      return Nn.Buffer.from(t2.publicKey);
    } finally {
      t2.secretKey.fill(0);
    }
  }
}
function Bn(e2, t2, n2) {
  if (e2.byteLength !== 64) throw Error(`A BIP39 root seed must be exactly 64 bytes.`);
  let r2, i2, a2, o2;
  try {
    return r2 = Nn.Buffer.from(e2), i2 = Rn(r2), a2 = Nn.Buffer.from(i2), o2 = zn(a2), Gn(o2, t2, n2);
  } finally {
    r2?.fill(0), i2?.fill(0), a2?.fill(0), o2?.fill(0);
  }
}
function Vn(e2, t2, n2) {
  if (e2.byteLength !== 32) throw Error(`A TON Ed25519 path seed must be exactly 32 bytes.`);
  let r2;
  try {
    return r2 = zn(e2), Gn(r2, t2, n2);
  } finally {
    r2?.fill(0);
  }
}
function Hn(e2, t2, n2, r2) {
  return { address: Vn(e2, n2, r2), mnemonic: [...t2] };
}
function Un(e2, t2, n2, r2) {
  return { address: Bn(e2, n2, r2), mnemonic: [...t2] };
}
async function Wn(e2, t2, n2, r2 = e2.length === 24 ? `ton-24` : `multichain-12`) {
  if (r2 === `ton-24`) {
    let r3 = e2.map((e3) => e3.toLowerCase().trim());
    if (r3.length !== 24 || !await (0, jn.mnemonicValidate)(r3)) throw r3.fill(``), Error(`The TON 24-word mnemonic failed canonical validation.`);
    let i3 = await (0, jn.mnemonicToPrivateKey)(r3);
    try {
      return { address: Gn(i3.publicKey, t2, n2), mnemonic: [...e2] };
    } finally {
      r3.fill(``), i3.publicKey.fill(0), i3.secretKey.fill(0);
    }
  }
  if (e2.length !== 12) throw Error(`The multichain mnemonic must contain exactly 12 words.`);
  let i2 = e2.join(` `), a2;
  try {
    return a2 = await o(i2), await Un(a2, e2, t2, n2);
  } finally {
    a2?.fill(0);
  }
}
function Gn(e2, t2, n2) {
  if (e2.length !== 32) throw Error(`A TON Ed25519 public key must be exactly 32 bytes.`);
  let r2 = t2 === `v4r2` ? (0, Mn.beginCell)().storeUint(0, 32).storeUint(698983191, 32).storeBuffer(e2).storeBit(0).endCell() : (0, Mn.beginCell)().storeUint(1, 1).storeUint(0, 32).storeInt(2147483409, 32).storeBuffer(e2, 32).storeBit(0).endCell();
  return (0, Mn.contractAddress)(0, { code: Ln[t2], data: r2 }).toString({ bounceable: n2 === `bounceable`, testOnly: false, urlSafe: true });
}
async function Kn(e2, t2, n2 = `multichain-12`) {
  return Wn(n2 === `ton-24` ? await (0, jn.mnemonicNew)(24) : l(s, 128).split(` `), e2, t2, n2);
}
export { Rn as deriveTonPathSeed, Kn as generateWalletCandidate, zn as publicKeyFromSeed, Gn as walletAddressFromPublicKey, Bn as walletAddressFromRootSeed, Vn as walletAddressFromTonSeed, Wn as walletCandidateFromMnemonic, Un as walletCandidateFromRootSeed, Hn as walletCandidateFromTonSeed };
