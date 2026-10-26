var e = Object.defineProperty, t = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, r = Object.prototype.hasOwnProperty, i = (e2, t2, n2) => () => {
  if (n2) throw n2[0];
  try {
    return e2 && (t2 = e2(e2 = 0)), t2;
  } catch (e3) {
    throw n2 = [e3], e3;
  }
}, a = (e2, t2) => () => (t2 || (e2((t2 = { exports: {} }).exports, t2), e2 = null), t2.exports), o = (t2, n2) => {
  let r2 = {};
  for (var i2 in t2) e(r2, i2, { get: t2[i2], enumerable: true });
  return n2 || e(r2, Symbol.toStringTag, { value: `Module` }), r2;
}, s = (i2, a2, o2, s2) => {
  if (a2 && typeof a2 == `object` || typeof a2 == `function`) for (var c2 = n(a2), l2 = 0, u = c2.length, d; l2 < u; l2++) d = c2[l2], !r.call(i2, d) && d !== o2 && e(i2, d, { get: ((e2) => a2[e2]).bind(null, d), enumerable: !(s2 = t(a2, d)) || s2.enumerable });
  return i2;
}, c = (t2) => r.call(t2, `module.exports`) ? t2[`module.exports`] : s(e({}, `__esModule`, { value: true }), t2), l = ((e2) => typeof require < `u` ? require : typeof Proxy < `u` ? new Proxy(e2, { get: (e3, t2) => (typeof require < `u` ? require : e3)[t2] }) : e2)(function(e2) {
  if (typeof require < `u`) return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e2 + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
export { c as a, l as i, i as n, o as r, a as t };
