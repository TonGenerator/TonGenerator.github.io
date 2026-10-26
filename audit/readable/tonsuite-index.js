var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e2, t2) => () => (t2 || (e2((t2 = { exports: {} }).exports, t2), e2 = null), t2.exports), s = (e2, i2, o2, s2) => {
  if (i2 && typeof i2 == `object` || typeof i2 == `function`) for (var c2 = r(i2), l2 = 0, u2 = c2.length, d2; l2 < u2; l2++) d2 = c2[l2], !a.call(e2, d2) && d2 !== o2 && t(e2, d2, { get: ((e3) => i2[e3]).bind(null, d2), enumerable: !(s2 = n(i2, d2)) || s2.enumerable });
  return e2;
}, c = (n2, r2, o2) => (o2 = n2 == null ? {} : e(i(n2)), s(r2 || !n2 || !n2.__esModule || !a.call(n2, `default`) ? t(o2, `default`, { value: n2, enumerable: true }) : o2, n2));
(function() {
  let e2 = document.createElement(`link`).relList;
  if (e2 && e2.supports && e2.supports(`modulepreload`)) return;
  for (let e3 of document.querySelectorAll(`link[rel="modulepreload"]`)) n2(e3);
  new MutationObserver((e3) => {
    for (let t3 of e3) if (t3.type === `childList`) for (let e4 of t3.addedNodes) e4.tagName === `LINK` && e4.rel === `modulepreload` && n2(e4);
  }).observe(document, { childList: true, subtree: true });
  function t2(e3) {
    let t3 = {};
    return e3.integrity && (t3.integrity = e3.integrity), e3.referrerPolicy && (t3.referrerPolicy = e3.referrerPolicy), t3.credentials = e3.crossOrigin === `use-credentials` ? `include` : e3.crossOrigin === `anonymous` ? `omit` : `same-origin`, t3;
  }
  function n2(e3) {
    if (e3.ep) return;
    e3.ep = true;
    let n3 = t2(e3);
    fetch(e3.href, n3);
  }
})();
var l = o(((e2) => {
  var t2 = Symbol.for(`react.transitional.element`), n2 = Symbol.for(`react.portal`), r2 = Symbol.for(`react.fragment`), i2 = Symbol.for(`react.strict_mode`), a2 = Symbol.for(`react.profiler`), o2 = Symbol.for(`react.consumer`), s2 = Symbol.for(`react.context`), c2 = Symbol.for(`react.forward_ref`), l2 = Symbol.for(`react.suspense`), u2 = Symbol.for(`react.memo`), d2 = Symbol.for(`react.lazy`), f2 = Symbol.for(`react.activity`), p2 = Symbol.iterator;
  function m2(e3) {
    return typeof e3 != `object` || !e3 ? null : (e3 = p2 && e3[p2] || e3[`@@iterator`], typeof e3 == `function` ? e3 : null);
  }
  var h2 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, g2 = Object.assign, _2 = {};
  function v2(e3, t3, n3) {
    this.props = e3, this.context = t3, this.refs = _2, this.updater = n3 || h2;
  }
  v2.prototype.isReactComponent = {}, v2.prototype.setState = function(e3, t3) {
    if (typeof e3 != `object` && typeof e3 != `function` && e3 != null) throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);
    this.updater.enqueueSetState(this, e3, t3, `setState`);
  }, v2.prototype.forceUpdate = function(e3) {
    this.updater.enqueueForceUpdate(this, e3, `forceUpdate`);
  };
  function y2() {
  }
  y2.prototype = v2.prototype;
  function b2(e3, t3, n3) {
    this.props = e3, this.context = t3, this.refs = _2, this.updater = n3 || h2;
  }
  var x2 = b2.prototype = new y2();
  x2.constructor = b2, g2(x2, v2.prototype), x2.isPureReactComponent = true;
  var S2 = Array.isArray;
  function C2() {
  }
  var w2 = { H: null, A: null, T: null, S: null }, T2 = Object.prototype.hasOwnProperty;
  function E2(e3, n3, r3) {
    var i3 = r3.ref;
    return { $$typeof: t2, type: e3, key: n3, ref: i3 === void 0 ? null : i3, props: r3 };
  }
  function D2(e3, t3) {
    return E2(e3.type, t3, e3.props);
  }
  function O2(e3) {
    return typeof e3 == `object` && !!e3 && e3.$$typeof === t2;
  }
  function k2(e3) {
    var t3 = { "=": `=0`, ":": `=2` };
    return `$` + e3.replace(/[=:]/g, function(e4) {
      return t3[e4];
    });
  }
  var A2 = /\/+/g;
  function ee2(e3, t3) {
    return typeof e3 == `object` && e3 && e3.key != null ? k2(`` + e3.key) : t3.toString(36);
  }
  function j2(e3) {
    switch (e3.status) {
      case `fulfilled`:
        return e3.value;
      case `rejected`:
        throw e3.reason;
      default:
        switch (typeof e3.status == `string` ? e3.then(C2, C2) : (e3.status = `pending`, e3.then(function(t3) {
          e3.status === `pending` && (e3.status = `fulfilled`, e3.value = t3);
        }, function(t3) {
          e3.status === `pending` && (e3.status = `rejected`, e3.reason = t3);
        })), e3.status) {
          case `fulfilled`:
            return e3.value;
          case `rejected`:
            throw e3.reason;
        }
    }
    throw e3;
  }
  function M2(e3, r3, i3, a3, o3) {
    var s3 = typeof e3;
    (s3 === `undefined` || s3 === `boolean`) && (e3 = null);
    var c3 = false;
    if (e3 === null) c3 = true;
    else switch (s3) {
      case `bigint`:
      case `string`:
      case `number`:
        c3 = true;
        break;
      case `object`:
        switch (e3.$$typeof) {
          case t2:
          case n2:
            c3 = true;
            break;
          case d2:
            return c3 = e3._init, M2(c3(e3._payload), r3, i3, a3, o3);
        }
    }
    if (c3) return o3 = o3(e3), c3 = a3 === `` ? `.` + ee2(e3, 0) : a3, S2(o3) ? (i3 = ``, c3 != null && (i3 = c3.replace(A2, `$&/`) + `/`), M2(o3, r3, i3, ``, function(e4) {
      return e4;
    })) : o3 != null && (O2(o3) && (o3 = D2(o3, i3 + (o3.key == null || e3 && e3.key === o3.key ? `` : (`` + o3.key).replace(A2, `$&/`) + `/`) + c3)), r3.push(o3)), 1;
    c3 = 0;
    var l3 = a3 === `` ? `.` : a3 + `:`;
    if (S2(e3)) for (var u3 = 0; u3 < e3.length; u3++) a3 = e3[u3], s3 = l3 + ee2(a3, u3), c3 += M2(a3, r3, i3, s3, o3);
    else if (u3 = m2(e3), typeof u3 == `function`) for (e3 = u3.call(e3), u3 = 0; !(a3 = e3.next()).done; ) a3 = a3.value, s3 = l3 + ee2(a3, u3++), c3 += M2(a3, r3, i3, s3, o3);
    else if (s3 === `object`) {
      if (typeof e3.then == `function`) return M2(j2(e3), r3, i3, a3, o3);
      throw r3 = String(e3), Error(`Objects are not valid as a React child (found: ` + (r3 === `[object Object]` ? `object with keys {` + Object.keys(e3).join(`, `) + `}` : r3) + `). If you meant to render a collection of children, use an array instead.`);
    }
    return c3;
  }
  function N2(e3, t3, n3) {
    if (e3 == null) return e3;
    var r3 = [], i3 = 0;
    return M2(e3, r3, ``, ``, function(e4) {
      return t3.call(n3, e4, i3++);
    }), r3;
  }
  function te2(e3) {
    if (e3._status === -1) {
      var t3 = e3._result;
      t3 = t3(), t3.then(function(t4) {
        (e3._status === 0 || e3._status === -1) && (e3._status = 1, e3._result = t4);
      }, function(t4) {
        (e3._status === 0 || e3._status === -1) && (e3._status = 2, e3._result = t4);
      }), e3._status === -1 && (e3._status = 0, e3._result = t3);
    }
    if (e3._status === 1) return e3._result.default;
    throw e3._result;
  }
  var P2 = typeof reportError == `function` ? reportError : function(e3) {
    if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
      var t3 = new window.ErrorEvent(`error`, { bubbles: true, cancelable: true, message: typeof e3 == `object` && e3 && typeof e3.message == `string` ? String(e3.message) : String(e3), error: e3 });
      if (!window.dispatchEvent(t3)) return;
    } else if (typeof process == `object` && typeof process.emit == `function`) {
      process.emit(`uncaughtException`, e3);
      return;
    }
    console.error(e3);
  }, F2 = { map: N2, forEach: function(e3, t3, n3) {
    N2(e3, function() {
      t3.apply(this, arguments);
    }, n3);
  }, count: function(e3) {
    var t3 = 0;
    return N2(e3, function() {
      t3++;
    }), t3;
  }, toArray: function(e3) {
    return N2(e3, function(e4) {
      return e4;
    }) || [];
  }, only: function(e3) {
    if (!O2(e3)) throw Error(`React.Children.only expected to receive a single React element child.`);
    return e3;
  } };
  e2.Activity = f2, e2.Children = F2, e2.Component = v2, e2.Fragment = r2, e2.Profiler = a2, e2.PureComponent = b2, e2.StrictMode = i2, e2.Suspense = l2, e2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w2, e2.__COMPILER_RUNTIME = { __proto__: null, c: function(e3) {
    return w2.H.useMemoCache(e3);
  } }, e2.cache = function(e3) {
    return function() {
      return e3.apply(null, arguments);
    };
  }, e2.cacheSignal = function() {
    return null;
  }, e2.cloneElement = function(e3, t3, n3) {
    if (e3 == null) throw Error(`The argument must be a React element, but you passed ` + e3 + `.`);
    var r3 = g2({}, e3.props), i3 = e3.key;
    if (t3 != null) for (a3 in t3.key !== void 0 && (i3 = `` + t3.key), t3) !T2.call(t3, a3) || a3 === `key` || a3 === `__self` || a3 === `__source` || a3 === `ref` && t3.ref === void 0 || (r3[a3] = t3[a3]);
    var a3 = arguments.length - 2;
    if (a3 === 1) r3.children = n3;
    else if (1 < a3) {
      for (var o3 = Array(a3), s3 = 0; s3 < a3; s3++) o3[s3] = arguments[s3 + 2];
      r3.children = o3;
    }
    return E2(e3.type, i3, r3);
  }, e2.createContext = function(e3) {
    return e3 = { $$typeof: s2, _currentValue: e3, _currentValue2: e3, _threadCount: 0, Provider: null, Consumer: null }, e3.Provider = e3, e3.Consumer = { $$typeof: o2, _context: e3 }, e3;
  }, e2.createElement = function(e3, t3, n3) {
    var r3, i3 = {}, a3 = null;
    if (t3 != null) for (r3 in t3.key !== void 0 && (a3 = `` + t3.key), t3) T2.call(t3, r3) && r3 !== `key` && r3 !== `__self` && r3 !== `__source` && (i3[r3] = t3[r3]);
    var o3 = arguments.length - 2;
    if (o3 === 1) i3.children = n3;
    else if (1 < o3) {
      for (var s3 = Array(o3), c3 = 0; c3 < o3; c3++) s3[c3] = arguments[c3 + 2];
      i3.children = s3;
    }
    if (e3 && e3.defaultProps) for (r3 in o3 = e3.defaultProps, o3) i3[r3] === void 0 && (i3[r3] = o3[r3]);
    return E2(e3, a3, i3);
  }, e2.createRef = function() {
    return { current: null };
  }, e2.forwardRef = function(e3) {
    return { $$typeof: c2, render: e3 };
  }, e2.isValidElement = O2, e2.lazy = function(e3) {
    return { $$typeof: d2, _payload: { _status: -1, _result: e3 }, _init: te2 };
  }, e2.memo = function(e3, t3) {
    return { $$typeof: u2, type: e3, compare: t3 === void 0 ? null : t3 };
  }, e2.startTransition = function(e3) {
    var t3 = w2.T, n3 = {};
    w2.T = n3;
    try {
      var r3 = e3(), i3 = w2.S;
      i3 !== null && i3(n3, r3), typeof r3 == `object` && r3 && typeof r3.then == `function` && r3.then(C2, P2);
    } catch (e4) {
      P2(e4);
    } finally {
      t3 !== null && n3.types !== null && (t3.types = n3.types), w2.T = t3;
    }
  }, e2.unstable_useCacheRefresh = function() {
    return w2.H.useCacheRefresh();
  }, e2.use = function(e3) {
    return w2.H.use(e3);
  }, e2.useActionState = function(e3, t3, n3) {
    return w2.H.useActionState(e3, t3, n3);
  }, e2.useCallback = function(e3, t3) {
    return w2.H.useCallback(e3, t3);
  }, e2.useContext = function(e3) {
    return w2.H.useContext(e3);
  }, e2.useDebugValue = function() {
  }, e2.useDeferredValue = function(e3, t3) {
    return w2.H.useDeferredValue(e3, t3);
  }, e2.useEffect = function(e3, t3) {
    return w2.H.useEffect(e3, t3);
  }, e2.useEffectEvent = function(e3) {
    return w2.H.useEffectEvent(e3);
  }, e2.useId = function() {
    return w2.H.useId();
  }, e2.useImperativeHandle = function(e3, t3, n3) {
    return w2.H.useImperativeHandle(e3, t3, n3);
  }, e2.useInsertionEffect = function(e3, t3) {
    return w2.H.useInsertionEffect(e3, t3);
  }, e2.useLayoutEffect = function(e3, t3) {
    return w2.H.useLayoutEffect(e3, t3);
  }, e2.useMemo = function(e3, t3) {
    return w2.H.useMemo(e3, t3);
  }, e2.useOptimistic = function(e3, t3) {
    return w2.H.useOptimistic(e3, t3);
  }, e2.useReducer = function(e3, t3, n3) {
    return w2.H.useReducer(e3, t3, n3);
  }, e2.useRef = function(e3) {
    return w2.H.useRef(e3);
  }, e2.useState = function(e3) {
    return w2.H.useState(e3);
  }, e2.useSyncExternalStore = function(e3, t3, n3) {
    return w2.H.useSyncExternalStore(e3, t3, n3);
  }, e2.useTransition = function() {
    return w2.H.useTransition();
  }, e2.version = `19.2.8`;
})), u = o(((e2, t2) => {
  t2.exports = l();
})), d = o(((e2) => {
  function t2(e3, t3) {
    var n3 = e3.length;
    e3.push(t3);
    a: for (; 0 < n3; ) {
      var r3 = n3 - 1 >>> 1, a3 = e3[r3];
      if (0 < i2(a3, t3)) e3[r3] = t3, e3[n3] = a3, n3 = r3;
      else break a;
    }
  }
  function n2(e3) {
    return e3.length === 0 ? null : e3[0];
  }
  function r2(e3) {
    if (e3.length === 0) return null;
    var t3 = e3[0], n3 = e3.pop();
    if (n3 !== t3) {
      e3[0] = n3;
      a: for (var r3 = 0, a3 = e3.length, o3 = a3 >>> 1; r3 < o3; ) {
        var s3 = 2 * (r3 + 1) - 1, c3 = e3[s3], l3 = s3 + 1, u3 = e3[l3];
        if (0 > i2(c3, n3)) l3 < a3 && 0 > i2(u3, c3) ? (e3[r3] = u3, e3[l3] = n3, r3 = l3) : (e3[r3] = c3, e3[s3] = n3, r3 = s3);
        else if (l3 < a3 && 0 > i2(u3, n3)) e3[r3] = u3, e3[l3] = n3, r3 = l3;
        else break a;
      }
    }
    return t3;
  }
  function i2(e3, t3) {
    var n3 = e3.sortIndex - t3.sortIndex;
    return n3 === 0 ? e3.id - t3.id : n3;
  }
  if (e2.unstable_now = void 0, typeof performance == `object` && typeof performance.now == `function`) {
    var a2 = performance;
    e2.unstable_now = function() {
      return a2.now();
    };
  } else {
    var o2 = Date, s2 = o2.now();
    e2.unstable_now = function() {
      return o2.now() - s2;
    };
  }
  var c2 = [], l2 = [], u2 = 1, d2 = null, f2 = 3, p2 = false, m2 = false, h2 = false, g2 = false, _2 = typeof setTimeout == `function` ? setTimeout : null, v2 = typeof clearTimeout == `function` ? clearTimeout : null, y2 = typeof setImmediate < `u` ? setImmediate : null;
  function b2(e3) {
    for (var i3 = n2(l2); i3 !== null; ) {
      if (i3.callback === null) r2(l2);
      else if (i3.startTime <= e3) r2(l2), i3.sortIndex = i3.expirationTime, t2(c2, i3);
      else break;
      i3 = n2(l2);
    }
  }
  function x2(e3) {
    if (h2 = false, b2(e3), !m2) {
      if (n2(c2) !== null) m2 = true, S2 || (S2 = true, O2());
      else {
        var t3 = n2(l2);
        t3 !== null && ee2(x2, t3.startTime - e3);
      }
    }
  }
  var S2 = false, C2 = -1, w2 = 5, T2 = -1;
  function E2() {
    return g2 ? true : !(e2.unstable_now() - T2 < w2);
  }
  function D2() {
    if (g2 = false, S2) {
      var t3 = e2.unstable_now();
      T2 = t3;
      var i3 = true;
      try {
        a: {
          m2 = false, h2 && (h2 = false, v2(C2), C2 = -1), p2 = true;
          var a3 = f2;
          try {
            b: {
              for (b2(t3), d2 = n2(c2); d2 !== null && !(d2.expirationTime > t3 && E2()); ) {
                var o3 = d2.callback;
                if (typeof o3 == `function`) {
                  d2.callback = null, f2 = d2.priorityLevel;
                  var s3 = o3(d2.expirationTime <= t3);
                  if (t3 = e2.unstable_now(), typeof s3 == `function`) {
                    d2.callback = s3, b2(t3), i3 = true;
                    break b;
                  }
                  d2 === n2(c2) && r2(c2), b2(t3);
                } else r2(c2);
                d2 = n2(c2);
              }
              if (d2 !== null) i3 = true;
              else {
                var u3 = n2(l2);
                u3 !== null && ee2(x2, u3.startTime - t3), i3 = false;
              }
            }
            break a;
          } finally {
            d2 = null, f2 = a3, p2 = false;
          }
          i3 = void 0;
        }
      } finally {
        i3 ? O2() : S2 = false;
      }
    }
  }
  var O2;
  if (typeof y2 == `function`) O2 = function() {
    y2(D2);
  };
  else if (typeof MessageChannel < `u`) {
    var k2 = new MessageChannel(), A2 = k2.port2;
    k2.port1.onmessage = D2, O2 = function() {
      A2.postMessage(null);
    };
  } else O2 = function() {
    _2(D2, 0);
  };
  function ee2(t3, n3) {
    C2 = _2(function() {
      t3(e2.unstable_now());
    }, n3);
  }
  e2.unstable_IdlePriority = 5, e2.unstable_ImmediatePriority = 1, e2.unstable_LowPriority = 4, e2.unstable_NormalPriority = 3, e2.unstable_Profiling = null, e2.unstable_UserBlockingPriority = 2, e2.unstable_cancelCallback = function(e3) {
    e3.callback = null;
  }, e2.unstable_forceFrameRate = function(e3) {
    0 > e3 || 125 < e3 ? console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`) : w2 = 0 < e3 ? Math.floor(1e3 / e3) : 5;
  }, e2.unstable_getCurrentPriorityLevel = function() {
    return f2;
  }, e2.unstable_next = function(e3) {
    switch (f2) {
      case 1:
      case 2:
      case 3:
        var t3 = 3;
        break;
      default:
        t3 = f2;
    }
    var n3 = f2;
    f2 = t3;
    try {
      return e3();
    } finally {
      f2 = n3;
    }
  }, e2.unstable_requestPaint = function() {
    g2 = true;
  }, e2.unstable_runWithPriority = function(e3, t3) {
    switch (e3) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e3 = 3;
    }
    var n3 = f2;
    f2 = e3;
    try {
      return t3();
    } finally {
      f2 = n3;
    }
  }, e2.unstable_scheduleCallback = function(r3, i3, a3) {
    var o3 = e2.unstable_now();
    switch (typeof a3 == `object` && a3 ? (a3 = a3.delay, a3 = typeof a3 == `number` && 0 < a3 ? o3 + a3 : o3) : a3 = o3, r3) {
      case 1:
        var s3 = -1;
        break;
      case 2:
        s3 = 250;
        break;
      case 5:
        s3 = 1073741823;
        break;
      case 4:
        s3 = 1e4;
        break;
      default:
        s3 = 5e3;
    }
    return s3 = a3 + s3, r3 = { id: u2++, callback: i3, priorityLevel: r3, startTime: a3, expirationTime: s3, sortIndex: -1 }, a3 > o3 ? (r3.sortIndex = a3, t2(l2, r3), n2(c2) === null && r3 === n2(l2) && (h2 ? (v2(C2), C2 = -1) : h2 = true, ee2(x2, a3 - o3))) : (r3.sortIndex = s3, t2(c2, r3), m2 || p2 || (m2 = true, S2 || (S2 = true, O2()))), r3;
  }, e2.unstable_shouldYield = E2, e2.unstable_wrapCallback = function(e3) {
    var t3 = f2;
    return function() {
      var n3 = f2;
      f2 = t3;
      try {
        return e3.apply(this, arguments);
      } finally {
        f2 = n3;
      }
    };
  };
})), f = o(((e2, t2) => {
  t2.exports = d();
})), p = o(((e2) => {
  var t2 = u();
  function n2(e3) {
    var t3 = `https://react.dev/errors/` + e3;
    if (1 < arguments.length) {
      t3 += `?args[]=` + encodeURIComponent(arguments[1]);
      for (var n3 = 2; n3 < arguments.length; n3++) t3 += `&args[]=` + encodeURIComponent(arguments[n3]);
    }
    return `Minified React error #` + e3 + `; visit ` + t3 + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function r2() {
  }
  var i2 = { d: { f: r2, r: function() {
    throw Error(n2(522));
  }, D: r2, C: r2, L: r2, m: r2, X: r2, S: r2, M: r2 }, p: 0, findDOMNode: null }, a2 = Symbol.for(`react.portal`);
  function o2(e3, t3, n3) {
    var r3 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: a2, key: r3 == null ? null : `` + r3, children: e3, containerInfo: t3, implementation: n3 };
  }
  var s2 = t2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c2(e3, t3) {
    if (e3 === `font`) return ``;
    if (typeof t3 == `string`) return t3 === `use-credentials` ? t3 : ``;
  }
  e2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i2, e2.createPortal = function(e3, t3) {
    var r3 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!t3 || t3.nodeType !== 1 && t3.nodeType !== 9 && t3.nodeType !== 11) throw Error(n2(299));
    return o2(e3, t3, null, r3);
  }, e2.flushSync = function(e3) {
    var t3 = s2.T, n3 = i2.p;
    try {
      if (s2.T = null, i2.p = 2, e3) return e3();
    } finally {
      s2.T = t3, i2.p = n3, i2.d.f();
    }
  }, e2.preconnect = function(e3, t3) {
    typeof e3 == `string` && (t3 ? (t3 = t3.crossOrigin, t3 = typeof t3 == `string` ? t3 === `use-credentials` ? t3 : `` : void 0) : t3 = null, i2.d.C(e3, t3));
  }, e2.prefetchDNS = function(e3) {
    typeof e3 == `string` && i2.d.D(e3);
  }, e2.preinit = function(e3, t3) {
    if (typeof e3 == `string` && t3 && typeof t3.as == `string`) {
      var n3 = t3.as, r3 = c2(n3, t3.crossOrigin), a3 = typeof t3.integrity == `string` ? t3.integrity : void 0, o3 = typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0;
      n3 === `style` ? i2.d.S(e3, typeof t3.precedence == `string` ? t3.precedence : void 0, { crossOrigin: r3, integrity: a3, fetchPriority: o3 }) : n3 === `script` && i2.d.X(e3, { crossOrigin: r3, integrity: a3, fetchPriority: o3, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0 });
    }
  }, e2.preinitModule = function(e3, t3) {
    if (typeof e3 == `string`) {
      if (typeof t3 == `object` && t3) {
        if (t3.as == null || t3.as === `script`) {
          var n3 = c2(t3.as, t3.crossOrigin);
          i2.d.M(e3, { crossOrigin: n3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0 });
        }
      } else t3 ?? i2.d.M(e3);
    }
  }, e2.preload = function(e3, t3) {
    if (typeof e3 == `string` && typeof t3 == `object` && t3 && typeof t3.as == `string`) {
      var n3 = t3.as, r3 = c2(n3, t3.crossOrigin);
      i2.d.L(e3, n3, { crossOrigin: r3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0, type: typeof t3.type == `string` ? t3.type : void 0, fetchPriority: typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0, referrerPolicy: typeof t3.referrerPolicy == `string` ? t3.referrerPolicy : void 0, imageSrcSet: typeof t3.imageSrcSet == `string` ? t3.imageSrcSet : void 0, imageSizes: typeof t3.imageSizes == `string` ? t3.imageSizes : void 0, media: typeof t3.media == `string` ? t3.media : void 0 });
    }
  }, e2.preloadModule = function(e3, t3) {
    if (typeof e3 == `string`) {
      if (t3) {
        var n3 = c2(t3.as, t3.crossOrigin);
        i2.d.m(e3, { as: typeof t3.as == `string` && t3.as !== `script` ? t3.as : void 0, crossOrigin: n3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0 });
      } else i2.d.m(e3);
    }
  }, e2.requestFormReset = function(e3) {
    i2.d.r(e3);
  }, e2.unstable_batchedUpdates = function(e3, t3) {
    return e3(t3);
  }, e2.useFormState = function(e3, t3, n3) {
    return s2.H.useFormState(e3, t3, n3);
  }, e2.useFormStatus = function() {
    return s2.H.useHostTransitionStatus();
  }, e2.version = `19.2.8`;
})), m = o(((e2, t2) => {
  function n2() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n2);
    } catch (e3) {
      console.error(e3);
    }
  }
  n2(), t2.exports = p();
})), h = o(((e2) => {
  var t2 = f(), n2 = u(), r2 = m();
  function i2(e3) {
    var t3 = `https://react.dev/errors/` + e3;
    if (1 < arguments.length) {
      t3 += `?args[]=` + encodeURIComponent(arguments[1]);
      for (var n3 = 2; n3 < arguments.length; n3++) t3 += `&args[]=` + encodeURIComponent(arguments[n3]);
    }
    return `Minified React error #` + e3 + `; visit ` + t3 + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function a2(e3) {
    return !(!e3 || e3.nodeType !== 1 && e3.nodeType !== 9 && e3.nodeType !== 11);
  }
  function o2(e3) {
    var t3 = e3, n3 = e3;
    if (e3.alternate) for (; t3.return; ) t3 = t3.return;
    else {
      e3 = t3;
      do
        t3 = e3, t3.flags & 4098 && (n3 = t3.return), e3 = t3.return;
      while (e3);
    }
    return t3.tag === 3 ? n3 : null;
  }
  function s2(e3) {
    if (e3.tag === 13) {
      var t3 = e3.memoizedState;
      if (t3 === null && (e3 = e3.alternate, e3 !== null && (t3 = e3.memoizedState)), t3 !== null) return t3.dehydrated;
    }
    return null;
  }
  function c2(e3) {
    if (e3.tag === 31) {
      var t3 = e3.memoizedState;
      if (t3 === null && (e3 = e3.alternate, e3 !== null && (t3 = e3.memoizedState)), t3 !== null) return t3.dehydrated;
    }
    return null;
  }
  function l2(e3) {
    if (o2(e3) !== e3) throw Error(i2(188));
  }
  function d2(e3) {
    var t3 = e3.alternate;
    if (!t3) {
      if (t3 = o2(e3), t3 === null) throw Error(i2(188));
      return t3 === e3 ? e3 : null;
    }
    for (var n3 = e3, r3 = t3; ; ) {
      var a3 = n3.return;
      if (a3 === null) break;
      var s3 = a3.alternate;
      if (s3 === null) {
        if (r3 = a3.return, r3 !== null) {
          n3 = r3;
          continue;
        }
        break;
      }
      if (a3.child === s3.child) {
        for (s3 = a3.child; s3; ) {
          if (s3 === n3) return l2(a3), e3;
          if (s3 === r3) return l2(a3), t3;
          s3 = s3.sibling;
        }
        throw Error(i2(188));
      }
      if (n3.return !== r3.return) n3 = a3, r3 = s3;
      else {
        for (var c3 = false, u2 = a3.child; u2; ) {
          if (u2 === n3) {
            c3 = true, n3 = a3, r3 = s3;
            break;
          }
          if (u2 === r3) {
            c3 = true, r3 = a3, n3 = s3;
            break;
          }
          u2 = u2.sibling;
        }
        if (!c3) {
          for (u2 = s3.child; u2; ) {
            if (u2 === n3) {
              c3 = true, n3 = s3, r3 = a3;
              break;
            }
            if (u2 === r3) {
              c3 = true, r3 = s3, n3 = a3;
              break;
            }
            u2 = u2.sibling;
          }
          if (!c3) throw Error(i2(189));
        }
      }
      if (n3.alternate !== r3) throw Error(i2(190));
    }
    if (n3.tag !== 3) throw Error(i2(188));
    return n3.stateNode.current === n3 ? e3 : t3;
  }
  function p2(e3) {
    var t3 = e3.tag;
    if (t3 === 5 || t3 === 26 || t3 === 27 || t3 === 6) return e3;
    for (e3 = e3.child; e3 !== null; ) {
      if (t3 = p2(e3), t3 !== null) return t3;
      e3 = e3.sibling;
    }
    return null;
  }
  var h2 = Object.assign, g2 = Symbol.for(`react.element`), _2 = Symbol.for(`react.transitional.element`), v2 = Symbol.for(`react.portal`), y2 = Symbol.for(`react.fragment`), b2 = Symbol.for(`react.strict_mode`), x2 = Symbol.for(`react.profiler`), S2 = Symbol.for(`react.consumer`), C2 = Symbol.for(`react.context`), w2 = Symbol.for(`react.forward_ref`), T2 = Symbol.for(`react.suspense`), E2 = Symbol.for(`react.suspense_list`), D2 = Symbol.for(`react.memo`), O2 = Symbol.for(`react.lazy`), k2 = Symbol.for(`react.activity`), A2 = Symbol.for(`react.memo_cache_sentinel`), ee2 = Symbol.iterator;
  function j2(e3) {
    return typeof e3 != `object` || !e3 ? null : (e3 = ee2 && e3[ee2] || e3[`@@iterator`], typeof e3 == `function` ? e3 : null);
  }
  var M2 = Symbol.for(`react.client.reference`);
  function N2(e3) {
    if (e3 == null) return null;
    if (typeof e3 == `function`) return e3.$$typeof === M2 ? null : e3.displayName || e3.name || null;
    if (typeof e3 == `string`) return e3;
    switch (e3) {
      case y2:
        return `Fragment`;
      case x2:
        return `Profiler`;
      case b2:
        return `StrictMode`;
      case T2:
        return `Suspense`;
      case E2:
        return `SuspenseList`;
      case k2:
        return `Activity`;
    }
    if (typeof e3 == `object`) switch (e3.$$typeof) {
      case v2:
        return `Portal`;
      case C2:
        return e3.displayName || `Context`;
      case S2:
        return (e3._context.displayName || `Context`) + `.Consumer`;
      case w2:
        var t3 = e3.render;
        return e3 = e3.displayName, e3 ||= (e3 = t3.displayName || t3.name || ``, e3 === `` ? `ForwardRef` : `ForwardRef(` + e3 + `)`), e3;
      case D2:
        return t3 = e3.displayName || null, t3 === null ? N2(e3.type) || `Memo` : t3;
      case O2:
        t3 = e3._payload, e3 = e3._init;
        try {
          return N2(e3(t3));
        } catch {
        }
    }
    return null;
  }
  var te2 = Array.isArray, P2 = n2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F2 = r2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne2 = { pending: false, data: null, method: null, action: null }, re2 = [], ie2 = -1;
  function I2(e3) {
    return { current: e3 };
  }
  function L2(e3) {
    0 > ie2 || (e3.current = re2[ie2], re2[ie2] = null, ie2--);
  }
  function ae2(e3, t3) {
    ie2++, re2[ie2] = e3.current, e3.current = t3;
  }
  var oe2 = I2(null), se2 = I2(null), ce2 = I2(null), le2 = I2(null);
  function ue2(e3, t3) {
    switch (ae2(ce2, t3), ae2(se2, e3), ae2(oe2, null), t3.nodeType) {
      case 9:
      case 11:
        e3 = (e3 = t3.documentElement) && (e3 = e3.namespaceURI) ? Vd(e3) : 0;
        break;
      default:
        if (e3 = t3.tagName, t3 = t3.namespaceURI) t3 = Vd(t3), e3 = Hd(t3, e3);
        else switch (e3) {
          case `svg`:
            e3 = 1;
            break;
          case `math`:
            e3 = 2;
            break;
          default:
            e3 = 0;
        }
    }
    L2(oe2), ae2(oe2, e3);
  }
  function de2() {
    L2(oe2), L2(se2), L2(ce2);
  }
  function R2(e3) {
    e3.memoizedState !== null && ae2(le2, e3);
    var t3 = oe2.current, n3 = Hd(t3, e3.type);
    t3 !== n3 && (ae2(se2, e3), ae2(oe2, n3));
  }
  function fe2(e3) {
    se2.current === e3 && (L2(oe2), L2(se2)), le2.current === e3 && (L2(le2), Qf._currentValue = ne2);
  }
  var z2, pe2;
  function me2(e3) {
    if (z2 === void 0) try {
      throw Error();
    } catch (e4) {
      var t3 = e4.stack.trim().match(/\n( *(at )?)/);
      z2 = t3 && t3[1] || ``, pe2 = -1 < e4.stack.indexOf(`
    at`) ? ` (<anonymous>)` : -1 < e4.stack.indexOf(`@`) ? `@unknown:0:0` : ``;
    }
    return `
` + z2 + e3 + pe2;
  }
  var he2 = false;
  function ge2(e3, t3) {
    if (!e3 || he2) return ``;
    he2 = true;
    var n3 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r3 = { DetermineComponentFrameRoot: function() {
        try {
          if (t3) {
            var n4 = function() {
              throw Error();
            };
            if (Object.defineProperty(n4.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == `object` && Reflect.construct) {
              try {
                Reflect.construct(n4, []);
              } catch (e4) {
                var r4 = e4;
              }
              Reflect.construct(e3, [], n4);
            } else {
              try {
                n4.call();
              } catch (e4) {
                r4 = e4;
              }
              e3.call(n4.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (e4) {
              r4 = e4;
            }
            (n4 = e3()) && typeof n4.catch == `function` && n4.catch(function() {
            });
          }
        } catch (e4) {
          if (e4 && r4 && typeof e4.stack == `string`) return [e4.stack, r4.stack];
        }
        return [null, null];
      } };
      r3.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
      var i3 = Object.getOwnPropertyDescriptor(r3.DetermineComponentFrameRoot, `name`);
      i3 && i3.configurable && Object.defineProperty(r3.DetermineComponentFrameRoot, "name", { value: `DetermineComponentFrameRoot` });
      var a3 = r3.DetermineComponentFrameRoot(), o3 = a3[0], s3 = a3[1];
      if (o3 && s3) {
        var c3 = o3.split(`
`), l3 = s3.split(`
`);
        for (i3 = r3 = 0; r3 < c3.length && !c3[r3].includes(`DetermineComponentFrameRoot`); ) r3++;
        for (; i3 < l3.length && !l3[i3].includes(`DetermineComponentFrameRoot`); ) i3++;
        if (r3 === c3.length || i3 === l3.length) for (r3 = c3.length - 1, i3 = l3.length - 1; 1 <= r3 && 0 <= i3 && c3[r3] !== l3[i3]; ) i3--;
        for (; 1 <= r3 && 0 <= i3; r3--, i3--) if (c3[r3] !== l3[i3]) {
          if (r3 !== 1 || i3 !== 1) do
            if (r3--, i3--, 0 > i3 || c3[r3] !== l3[i3]) {
              var u2 = `
` + c3[r3].replace(` at new `, ` at `);
              return e3.displayName && u2.includes(`<anonymous>`) && (u2 = u2.replace(`<anonymous>`, e3.displayName)), u2;
            }
          while (1 <= r3 && 0 <= i3);
          break;
        }
      }
    } finally {
      he2 = false, Error.prepareStackTrace = n3;
    }
    return (n3 = e3 ? e3.displayName || e3.name : ``) ? me2(n3) : ``;
  }
  function _e2(e3, t3) {
    switch (e3.tag) {
      case 26:
      case 27:
      case 5:
        return me2(e3.type);
      case 16:
        return me2(`Lazy`);
      case 13:
        return e3.child !== t3 && t3 !== null ? me2(`Suspense Fallback`) : me2(`Suspense`);
      case 19:
        return me2(`SuspenseList`);
      case 0:
      case 15:
        return ge2(e3.type, false);
      case 11:
        return ge2(e3.type.render, false);
      case 1:
        return ge2(e3.type, true);
      case 31:
        return me2(`Activity`);
      default:
        return ``;
    }
  }
  function ve2(e3) {
    try {
      var t3 = ``, n3 = null;
      do
        t3 += _e2(e3, n3), n3 = e3, e3 = e3.return;
      while (e3);
      return t3;
    } catch (e4) {
      return `
Error generating stack: ` + e4.message + `
` + e4.stack;
    }
  }
  var ye2 = Object.prototype.hasOwnProperty, be2 = t2.unstable_scheduleCallback, xe2 = t2.unstable_cancelCallback, B2 = t2.unstable_shouldYield, Se2 = t2.unstable_requestPaint, Ce2 = t2.unstable_now, we2 = t2.unstable_getCurrentPriorityLevel, Te2 = t2.unstable_ImmediatePriority, Ee2 = t2.unstable_UserBlockingPriority, De2 = t2.unstable_NormalPriority, Oe2 = t2.unstable_LowPriority, ke2 = t2.unstable_IdlePriority, Ae2 = t2.log, je2 = t2.unstable_setDisableYieldValue, Me2 = null, V2 = null;
  function Ne2(e3) {
    if (typeof Ae2 == `function` && je2(e3), V2 && typeof V2.setStrictMode == `function`) try {
      V2.setStrictMode(Me2, e3);
    } catch {
    }
  }
  var Pe2 = Math.clz32 ? Math.clz32 : Le2, Fe2 = Math.log, Ie2 = Math.LN2;
  function Le2(e3) {
    return e3 >>>= 0, e3 === 0 ? 32 : 31 - (Fe2(e3) / Ie2 | 0) | 0;
  }
  var Re2 = 256, ze2 = 262144, Be2 = 4194304;
  function Ve2(e3) {
    var t3 = e3 & 42;
    if (t3 !== 0) return t3;
    switch (e3 & -e3) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e3 & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e3 & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e3 & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e3;
    }
  }
  function He2(e3, t3, n3) {
    var r3 = e3.pendingLanes;
    if (r3 === 0) return 0;
    var i3 = 0, a3 = e3.suspendedLanes, o3 = e3.pingedLanes;
    e3 = e3.warmLanes;
    var s3 = r3 & 134217727;
    return s3 === 0 ? (s3 = r3 & ~a3, s3 === 0 ? o3 === 0 ? n3 || (n3 = r3 & ~e3, n3 !== 0 && (i3 = Ve2(n3))) : i3 = Ve2(o3) : i3 = Ve2(s3)) : (r3 = s3 & ~a3, r3 === 0 ? (o3 &= s3, o3 === 0 ? n3 || (n3 = s3 & ~e3, n3 !== 0 && (i3 = Ve2(n3))) : i3 = Ve2(o3)) : i3 = Ve2(r3)), i3 === 0 ? 0 : t3 !== 0 && t3 !== i3 && (t3 & a3) === 0 && (a3 = i3 & -i3, n3 = t3 & -t3, a3 >= n3 || a3 === 32 && n3 & 4194048) ? t3 : i3;
  }
  function H2(e3, t3) {
    return (e3.pendingLanes & ~(e3.suspendedLanes & ~e3.pingedLanes) & t3) === 0;
  }
  function Ue2(e3, t3) {
    switch (e3) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t3 + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t3 + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function We2() {
    var e3 = Be2;
    return Be2 <<= 1, !(Be2 & 62914560) && (Be2 = 4194304), e3;
  }
  function Ge2(e3) {
    for (var t3 = [], n3 = 0; 31 > n3; n3++) t3.push(e3);
    return t3;
  }
  function Ke2(e3, t3) {
    e3.pendingLanes |= t3, t3 !== 268435456 && (e3.suspendedLanes = 0, e3.pingedLanes = 0, e3.warmLanes = 0);
  }
  function qe2(e3, t3, n3, r3, i3, a3) {
    var o3 = e3.pendingLanes;
    e3.pendingLanes = n3, e3.suspendedLanes = 0, e3.pingedLanes = 0, e3.warmLanes = 0, e3.expiredLanes &= n3, e3.entangledLanes &= n3, e3.errorRecoveryDisabledLanes &= n3, e3.shellSuspendCounter = 0;
    var s3 = e3.entanglements, c3 = e3.expirationTimes, l3 = e3.hiddenUpdates;
    for (n3 = o3 & ~n3; 0 < n3; ) {
      var u2 = 31 - Pe2(n3), d3 = 1 << u2;
      s3[u2] = 0, c3[u2] = -1;
      var f2 = l3[u2];
      if (f2 !== null) for (l3[u2] = null, u2 = 0; u2 < f2.length; u2++) {
        var p3 = f2[u2];
        p3 !== null && (p3.lane &= -536870913);
      }
      n3 &= ~d3;
    }
    r3 !== 0 && Je2(e3, r3, 0), a3 !== 0 && i3 === 0 && e3.tag !== 0 && (e3.suspendedLanes |= a3 & ~(o3 & ~t3));
  }
  function Je2(e3, t3, n3) {
    e3.pendingLanes |= t3, e3.suspendedLanes &= ~t3;
    var r3 = 31 - Pe2(t3);
    e3.entangledLanes |= t3, e3.entanglements[r3] = e3.entanglements[r3] | 1073741824 | n3 & 261930;
  }
  function Ye2(e3, t3) {
    var n3 = e3.entangledLanes |= t3;
    for (e3 = e3.entanglements; n3; ) {
      var r3 = 31 - Pe2(n3), i3 = 1 << r3;
      i3 & t3 | e3[r3] & t3 && (e3[r3] |= t3), n3 &= ~i3;
    }
  }
  function Xe2(e3, t3) {
    var n3 = t3 & -t3;
    return n3 = n3 & 42 ? 1 : Ze2(n3), (n3 & (e3.suspendedLanes | t3)) === 0 ? n3 : 0;
  }
  function Ze2(e3) {
    switch (e3) {
      case 2:
        e3 = 1;
        break;
      case 8:
        e3 = 4;
        break;
      case 32:
        e3 = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e3 = 128;
        break;
      case 268435456:
        e3 = 134217728;
        break;
      default:
        e3 = 0;
    }
    return e3;
  }
  function U2(e3) {
    return e3 &= -e3, 2 < e3 ? 8 < e3 ? e3 & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function Qe2() {
    var e3 = F2.p;
    return e3 === 0 ? (e3 = window.event, e3 === void 0 ? 32 : mp(e3.type)) : e3;
  }
  function $e2(e3, t3) {
    var n3 = F2.p;
    try {
      return F2.p = e3, t3();
    } finally {
      F2.p = n3;
    }
  }
  var et2 = Math.random().toString(36).slice(2), tt2 = `__reactFiber$` + et2, nt2 = `__reactProps$` + et2, rt2 = `__reactContainer$` + et2, it2 = `__reactEvents$` + et2, at2 = `__reactListeners$` + et2, ot2 = `__reactHandles$` + et2, st2 = `__reactResources$` + et2, ct2 = `__reactMarker$` + et2;
  function lt2(e3) {
    delete e3[tt2], delete e3[nt2], delete e3[it2], delete e3[at2], delete e3[ot2];
  }
  function ut2(e3) {
    var t3 = e3[tt2];
    if (t3) return t3;
    for (var n3 = e3.parentNode; n3; ) {
      if (t3 = n3[rt2] || n3[tt2]) {
        if (n3 = t3.alternate, t3.child !== null || n3 !== null && n3.child !== null) for (e3 = df(e3); e3 !== null; ) {
          if (n3 = e3[tt2]) return n3;
          e3 = df(e3);
        }
        return t3;
      }
      e3 = n3, n3 = e3.parentNode;
    }
    return null;
  }
  function dt2(e3) {
    if (e3 = e3[tt2] || e3[rt2]) {
      var t3 = e3.tag;
      if (t3 === 5 || t3 === 6 || t3 === 13 || t3 === 31 || t3 === 26 || t3 === 27 || t3 === 3) return e3;
    }
    return null;
  }
  function ft2(e3) {
    var t3 = e3.tag;
    if (t3 === 5 || t3 === 26 || t3 === 27 || t3 === 6) return e3.stateNode;
    throw Error(i2(33));
  }
  function pt2(e3) {
    var t3 = e3[st2];
    return t3 ||= e3[st2] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }, t3;
  }
  function mt2(e3) {
    e3[ct2] = true;
  }
  var ht2 = /* @__PURE__ */ new Set(), gt2 = {};
  function _t2(e3, t3) {
    vt2(e3, t3), vt2(e3 + `Capture`, t3);
  }
  function vt2(e3, t3) {
    for (gt2[e3] = t3, e3 = 0; e3 < t3.length; e3++) ht2.add(t3[e3]);
  }
  var yt2 = RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`), bt2 = {}, xt2 = {};
  function St2(e3) {
    return ye2.call(xt2, e3) ? true : ye2.call(bt2, e3) ? false : yt2.test(e3) ? xt2[e3] = true : (bt2[e3] = true, false);
  }
  function Ct2(e3, t3, n3) {
    if (St2(t3)) {
      if (n3 === null) e3.removeAttribute(t3);
      else {
        switch (typeof n3) {
          case `undefined`:
          case `function`:
          case `symbol`:
            e3.removeAttribute(t3);
            return;
          case `boolean`:
            var r3 = t3.toLowerCase().slice(0, 5);
            if (r3 !== `data-` && r3 !== `aria-`) {
              e3.removeAttribute(t3);
              return;
            }
        }
        e3.setAttribute(t3, `` + n3);
      }
    }
  }
  function wt2(e3, t3, n3) {
    if (n3 === null) e3.removeAttribute(t3);
    else {
      switch (typeof n3) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e3.removeAttribute(t3);
          return;
      }
      e3.setAttribute(t3, `` + n3);
    }
  }
  function Tt2(e3, t3, n3, r3) {
    if (r3 === null) e3.removeAttribute(n3);
    else {
      switch (typeof r3) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e3.removeAttribute(n3);
          return;
      }
      e3.setAttributeNS(t3, n3, `` + r3);
    }
  }
  function Et2(e3) {
    switch (typeof e3) {
      case `bigint`:
      case `boolean`:
      case `number`:
      case `string`:
      case `undefined`:
        return e3;
      case `object`:
        return e3;
      default:
        return ``;
    }
  }
  function Dt2(e3) {
    var t3 = e3.type;
    return (e3 = e3.nodeName) && e3.toLowerCase() === `input` && (t3 === `checkbox` || t3 === `radio`);
  }
  function Ot2(e3, t3, n3) {
    var r3 = Object.getOwnPropertyDescriptor(e3.constructor.prototype, t3);
    if (!e3.hasOwnProperty(t3) && r3 !== void 0 && typeof r3.get == `function` && typeof r3.set == `function`) {
      var i3 = r3.get, a3 = r3.set;
      return Object.defineProperty(e3, t3, { configurable: true, get: function() {
        return i3.call(this);
      }, set: function(e4) {
        n3 = `` + e4, a3.call(this, e4);
      } }), Object.defineProperty(e3, t3, { enumerable: r3.enumerable }), { getValue: function() {
        return n3;
      }, setValue: function(e4) {
        n3 = `` + e4;
      }, stopTracking: function() {
        e3._valueTracker = null, delete e3[t3];
      } };
    }
  }
  function kt2(e3) {
    if (!e3._valueTracker) {
      var t3 = Dt2(e3) ? `checked` : `value`;
      e3._valueTracker = Ot2(e3, t3, `` + e3[t3]);
    }
  }
  function At2(e3) {
    if (!e3) return false;
    var t3 = e3._valueTracker;
    if (!t3) return true;
    var n3 = t3.getValue(), r3 = ``;
    return e3 && (r3 = Dt2(e3) ? e3.checked ? `true` : `false` : e3.value), e3 = r3, e3 !== n3 && (t3.setValue(e3), true);
  }
  function jt2(e3) {
    if (e3 ||= typeof document < `u` ? document : void 0, e3 === void 0) return null;
    try {
      return e3.activeElement || e3.body;
    } catch {
      return e3.body;
    }
  }
  var Mt2 = /[\n"\\]/g;
  function Nt2(e3) {
    return e3.replace(Mt2, function(e4) {
      return `\\` + e4.charCodeAt(0).toString(16) + ` `;
    });
  }
  function Pt2(e3, t3, n3, r3, i3, a3, o3, s3) {
    e3.name = ``, o3 != null && typeof o3 != `function` && typeof o3 != `symbol` && typeof o3 != `boolean` ? e3.type = o3 : e3.removeAttribute(`type`), t3 == null ? o3 !== `submit` && o3 !== `reset` || e3.removeAttribute(`value`) : o3 === `number` ? (t3 === 0 && e3.value === `` || e3.value != t3) && (e3.value = `` + Et2(t3)) : e3.value !== `` + Et2(t3) && (e3.value = `` + Et2(t3)), t3 == null ? n3 == null ? r3 != null && e3.removeAttribute(`value`) : It2(e3, o3, Et2(n3)) : It2(e3, o3, Et2(t3)), i3 == null && a3 != null && (e3.defaultChecked = !!a3), i3 != null && (e3.checked = i3 && typeof i3 != `function` && typeof i3 != `symbol`), s3 != null && typeof s3 != `function` && typeof s3 != `symbol` && typeof s3 != `boolean` ? e3.name = `` + Et2(s3) : e3.removeAttribute(`name`);
  }
  function Ft2(e3, t3, n3, r3, i3, a3, o3, s3) {
    if (a3 != null && typeof a3 != `function` && typeof a3 != `symbol` && typeof a3 != `boolean` && (e3.type = a3), t3 != null || n3 != null) {
      if (!(a3 !== `submit` && a3 !== `reset` || t3 != null)) {
        kt2(e3);
        return;
      }
      n3 = n3 == null ? `` : `` + Et2(n3), t3 = t3 == null ? n3 : `` + Et2(t3), s3 || t3 === e3.value || (e3.value = t3), e3.defaultValue = t3;
    }
    r3 ??= i3, r3 = typeof r3 != `function` && typeof r3 != `symbol` && !!r3, e3.checked = s3 ? e3.checked : !!r3, e3.defaultChecked = !!r3, o3 != null && typeof o3 != `function` && typeof o3 != `symbol` && typeof o3 != `boolean` && (e3.name = o3), kt2(e3);
  }
  function It2(e3, t3, n3) {
    t3 === `number` && jt2(e3.ownerDocument) === e3 || e3.defaultValue === `` + n3 || (e3.defaultValue = `` + n3);
  }
  function Lt2(e3, t3, n3, r3) {
    if (e3 = e3.options, t3) {
      t3 = {};
      for (var i3 = 0; i3 < n3.length; i3++) t3[`$` + n3[i3]] = true;
      for (n3 = 0; n3 < e3.length; n3++) i3 = t3.hasOwnProperty(`$` + e3[n3].value), e3[n3].selected !== i3 && (e3[n3].selected = i3), i3 && r3 && (e3[n3].defaultSelected = true);
    } else {
      for (n3 = `` + Et2(n3), t3 = null, i3 = 0; i3 < e3.length; i3++) {
        if (e3[i3].value === n3) {
          e3[i3].selected = true, r3 && (e3[i3].defaultSelected = true);
          return;
        }
        t3 !== null || e3[i3].disabled || (t3 = e3[i3]);
      }
      t3 !== null && (t3.selected = true);
    }
  }
  function Rt2(e3, t3, n3) {
    if (t3 != null && (t3 = `` + Et2(t3), t3 !== e3.value && (e3.value = t3), n3 == null)) {
      e3.defaultValue !== t3 && (e3.defaultValue = t3);
      return;
    }
    e3.defaultValue = n3 == null ? `` : `` + Et2(n3);
  }
  function zt2(e3, t3, n3, r3) {
    if (t3 == null) {
      if (r3 != null) {
        if (n3 != null) throw Error(i2(92));
        if (te2(r3)) {
          if (1 < r3.length) throw Error(i2(93));
          r3 = r3[0];
        }
        n3 = r3;
      }
      n3 ??= ``, t3 = n3;
    }
    n3 = Et2(t3), e3.defaultValue = n3, r3 = e3.textContent, r3 === n3 && r3 !== `` && r3 !== null && (e3.value = r3), kt2(e3);
  }
  function Bt2(e3, t3) {
    if (t3) {
      var n3 = e3.firstChild;
      if (n3 && n3 === e3.lastChild && n3.nodeType === 3) {
        n3.nodeValue = t3;
        return;
      }
    }
    e3.textContent = t3;
  }
  var Vt2 = new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));
  function Ht2(e3, t3, n3) {
    var r3 = t3.indexOf(`--`) === 0;
    n3 == null || typeof n3 == `boolean` || n3 === `` ? r3 ? e3.setProperty(t3, ``) : t3 === `float` ? e3.cssFloat = `` : e3[t3] = `` : r3 ? e3.setProperty(t3, n3) : typeof n3 != `number` || n3 === 0 || Vt2.has(t3) ? t3 === `float` ? e3.cssFloat = n3 : e3[t3] = (`` + n3).trim() : e3[t3] = n3 + `px`;
  }
  function Ut2(e3, t3, n3) {
    if (t3 != null && typeof t3 != `object`) throw Error(i2(62));
    if (e3 = e3.style, n3 != null) {
      for (var r3 in n3) !n3.hasOwnProperty(r3) || t3 != null && t3.hasOwnProperty(r3) || (r3.indexOf(`--`) === 0 ? e3.setProperty(r3, ``) : r3 === `float` ? e3.cssFloat = `` : e3[r3] = ``);
      for (var a3 in t3) r3 = t3[a3], t3.hasOwnProperty(a3) && n3[a3] !== r3 && Ht2(e3, a3, r3);
    } else for (var o3 in t3) t3.hasOwnProperty(o3) && Ht2(e3, o3, t3[o3]);
  }
  function Wt2(e3) {
    if (e3.indexOf(`-`) === -1) return false;
    switch (e3) {
      case `annotation-xml`:
      case `color-profile`:
      case `font-face`:
      case `font-face-src`:
      case `font-face-uri`:
      case `font-face-format`:
      case `font-face-name`:
      case `missing-glyph`:
        return false;
      default:
        return true;
    }
  }
  var Gt2 = /* @__PURE__ */ new Map([[`acceptCharset`, `accept-charset`], [`htmlFor`, `for`], [`httpEquiv`, `http-equiv`], [`crossOrigin`, `crossorigin`], [`accentHeight`, `accent-height`], [`alignmentBaseline`, `alignment-baseline`], [`arabicForm`, `arabic-form`], [`baselineShift`, `baseline-shift`], [`capHeight`, `cap-height`], [`clipPath`, `clip-path`], [`clipRule`, `clip-rule`], [`colorInterpolation`, `color-interpolation`], [`colorInterpolationFilters`, `color-interpolation-filters`], [`colorProfile`, `color-profile`], [`colorRendering`, `color-rendering`], [`dominantBaseline`, `dominant-baseline`], [`enableBackground`, `enable-background`], [`fillOpacity`, `fill-opacity`], [`fillRule`, `fill-rule`], [`floodColor`, `flood-color`], [`floodOpacity`, `flood-opacity`], [`fontFamily`, `font-family`], [`fontSize`, `font-size`], [`fontSizeAdjust`, `font-size-adjust`], [`fontStretch`, `font-stretch`], [`fontStyle`, `font-style`], [`fontVariant`, `font-variant`], [`fontWeight`, `font-weight`], [`glyphName`, `glyph-name`], [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`], [`glyphOrientationVertical`, `glyph-orientation-vertical`], [`horizAdvX`, `horiz-adv-x`], [`horizOriginX`, `horiz-origin-x`], [`imageRendering`, `image-rendering`], [`letterSpacing`, `letter-spacing`], [`lightingColor`, `lighting-color`], [`markerEnd`, `marker-end`], [`markerMid`, `marker-mid`], [`markerStart`, `marker-start`], [`overlinePosition`, `overline-position`], [`overlineThickness`, `overline-thickness`], [`paintOrder`, `paint-order`], [`panose-1`, `panose-1`], [`pointerEvents`, `pointer-events`], [`renderingIntent`, `rendering-intent`], [`shapeRendering`, `shape-rendering`], [`stopColor`, `stop-color`], [`stopOpacity`, `stop-opacity`], [`strikethroughPosition`, `strikethrough-position`], [`strikethroughThickness`, `strikethrough-thickness`], [`strokeDasharray`, `stroke-dasharray`], [`strokeDashoffset`, `stroke-dashoffset`], [`strokeLinecap`, `stroke-linecap`], [`strokeLinejoin`, `stroke-linejoin`], [`strokeMiterlimit`, `stroke-miterlimit`], [`strokeOpacity`, `stroke-opacity`], [`strokeWidth`, `stroke-width`], [`textAnchor`, `text-anchor`], [`textDecoration`, `text-decoration`], [`textRendering`, `text-rendering`], [`transformOrigin`, `transform-origin`], [`underlinePosition`, `underline-position`], [`underlineThickness`, `underline-thickness`], [`unicodeBidi`, `unicode-bidi`], [`unicodeRange`, `unicode-range`], [`unitsPerEm`, `units-per-em`], [`vAlphabetic`, `v-alphabetic`], [`vHanging`, `v-hanging`], [`vIdeographic`, `v-ideographic`], [`vMathematical`, `v-mathematical`], [`vectorEffect`, `vector-effect`], [`vertAdvY`, `vert-adv-y`], [`vertOriginX`, `vert-origin-x`], [`vertOriginY`, `vert-origin-y`], [`wordSpacing`, `word-spacing`], [`writingMode`, `writing-mode`], [`xmlnsXlink`, `xmlns:xlink`], [`xHeight`, `x-height`]]), Kt2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function qt2(e3) {
    return Kt2.test(`` + e3) ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')` : e3;
  }
  function Jt2() {
  }
  var Yt2 = null;
  function Xt2(e3) {
    return e3 = e3.target || e3.srcElement || window, e3.correspondingUseElement && (e3 = e3.correspondingUseElement), e3.nodeType === 3 ? e3.parentNode : e3;
  }
  var Zt2 = null, Qt2 = null;
  function $t2(e3) {
    var t3 = dt2(e3);
    if (t3 && (e3 = t3.stateNode)) {
      var n3 = e3[nt2] || null;
      a: switch (e3 = t3.stateNode, t3.type) {
        case `input`:
          if (Pt2(e3, n3.value, n3.defaultValue, n3.defaultValue, n3.checked, n3.defaultChecked, n3.type, n3.name), t3 = n3.name, n3.type === `radio` && t3 != null) {
            for (n3 = e3; n3.parentNode; ) n3 = n3.parentNode;
            for (n3 = n3.querySelectorAll(`input[name="` + Nt2(`` + t3) + `"][type="radio"]`), t3 = 0; t3 < n3.length; t3++) {
              var r3 = n3[t3];
              if (r3 !== e3 && r3.form === e3.form) {
                var a3 = r3[nt2] || null;
                if (!a3) throw Error(i2(90));
                Pt2(r3, a3.value, a3.defaultValue, a3.defaultValue, a3.checked, a3.defaultChecked, a3.type, a3.name);
              }
            }
            for (t3 = 0; t3 < n3.length; t3++) r3 = n3[t3], r3.form === e3.form && At2(r3);
          }
          break a;
        case `textarea`:
          Rt2(e3, n3.value, n3.defaultValue);
          break a;
        case `select`:
          t3 = n3.value, t3 != null && Lt2(e3, !!n3.multiple, t3, false);
      }
    }
  }
  var en2 = false;
  function tn2(e3, t3, n3) {
    if (en2) return e3(t3, n3);
    en2 = true;
    try {
      return e3(t3);
    } finally {
      if (en2 = false, (Zt2 !== null || Qt2 !== null) && (vu(), Zt2 && (t3 = Zt2, e3 = Qt2, Qt2 = Zt2 = null, $t2(t3), e3))) for (t3 = 0; t3 < e3.length; t3++) $t2(e3[t3]);
    }
  }
  function nn2(e3, t3) {
    var n3 = e3.stateNode;
    if (n3 === null) return null;
    var r3 = n3[nt2] || null;
    if (r3 === null) return null;
    n3 = r3[t3];
    a: switch (t3) {
      case `onClick`:
      case `onClickCapture`:
      case `onDoubleClick`:
      case `onDoubleClickCapture`:
      case `onMouseDown`:
      case `onMouseDownCapture`:
      case `onMouseMove`:
      case `onMouseMoveCapture`:
      case `onMouseUp`:
      case `onMouseUpCapture`:
      case `onMouseEnter`:
        (r3 = !r3.disabled) || (e3 = e3.type, r3 = e3 !== `button` && e3 !== `input` && e3 !== `select` && e3 !== `textarea`), e3 = !r3;
        break a;
      default:
        e3 = false;
    }
    if (e3) return null;
    if (n3 && typeof n3 != `function`) throw Error(i2(231, t3, typeof n3));
    return n3;
  }
  var rn2 = !(typeof window > `u` || window.document === void 0 || window.document.createElement === void 0), an2 = false;
  if (rn2) try {
    var on2 = {};
    Object.defineProperty(on2, "passive", { get: function() {
      an2 = true;
    } }), window.addEventListener(`test`, on2, on2), window.removeEventListener(`test`, on2, on2);
  } catch {
    an2 = false;
  }
  var sn2 = null, cn2 = null, ln2 = null;
  function un2() {
    if (ln2) return ln2;
    var e3, t3 = cn2, n3 = t3.length, r3, i3 = `value` in sn2 ? sn2.value : sn2.textContent, a3 = i3.length;
    for (e3 = 0; e3 < n3 && t3[e3] === i3[e3]; e3++) ;
    var o3 = n3 - e3;
    for (r3 = 1; r3 <= o3 && t3[n3 - r3] === i3[a3 - r3]; r3++) ;
    return ln2 = i3.slice(e3, 1 < r3 ? 1 - r3 : void 0);
  }
  function dn2(e3) {
    var t3 = e3.keyCode;
    return `charCode` in e3 ? (e3 = e3.charCode, e3 === 0 && t3 === 13 && (e3 = 13)) : e3 = t3, e3 === 10 && (e3 = 13), 32 <= e3 || e3 === 13 ? e3 : 0;
  }
  function fn2() {
    return true;
  }
  function pn2() {
    return false;
  }
  function mn2(e3) {
    function t3(t4, n3, r3, i3, a3) {
      for (var o3 in this._reactName = t4, this._targetInst = r3, this.type = n3, this.nativeEvent = i3, this.target = a3, this.currentTarget = null, e3) e3.hasOwnProperty(o3) && (t4 = e3[o3], this[o3] = t4 ? t4(i3) : i3[o3]);
      return this.isDefaultPrevented = (i3.defaultPrevented == null ? false === i3.returnValue : i3.defaultPrevented) ? fn2 : pn2, this.isPropagationStopped = pn2, this;
    }
    return h2(t3.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e4 = this.nativeEvent;
      e4 && (e4.preventDefault ? e4.preventDefault() : typeof e4.returnValue != `unknown` && (e4.returnValue = false), this.isDefaultPrevented = fn2);
    }, stopPropagation: function() {
      var e4 = this.nativeEvent;
      e4 && (e4.stopPropagation ? e4.stopPropagation() : typeof e4.cancelBubble != `unknown` && (e4.cancelBubble = true), this.isPropagationStopped = fn2);
    }, persist: function() {
    }, isPersistent: fn2 }), t3;
  }
  var hn2 = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e3) {
    return e3.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, gn2 = mn2(hn2), _n2 = h2({}, hn2, { view: 0, detail: 0 }), vn2 = mn2(_n2), yn2, bn2, xn2, Sn2 = h2({}, _n2, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Nn2, button: 0, buttons: 0, relatedTarget: function(e3) {
    return e3.relatedTarget === void 0 ? e3.fromElement === e3.srcElement ? e3.toElement : e3.fromElement : e3.relatedTarget;
  }, movementX: function(e3) {
    return `movementX` in e3 ? e3.movementX : (e3 !== xn2 && (xn2 && e3.type === `mousemove` ? (yn2 = e3.screenX - xn2.screenX, bn2 = e3.screenY - xn2.screenY) : bn2 = yn2 = 0, xn2 = e3), yn2);
  }, movementY: function(e3) {
    return `movementY` in e3 ? e3.movementY : bn2;
  } }), Cn2 = mn2(Sn2), wn2 = mn2(h2({}, Sn2, { dataTransfer: 0 })), Tn2 = mn2(h2({}, _n2, { relatedTarget: 0 })), En2 = mn2(h2({}, hn2, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })), Dn2 = mn2(h2({}, hn2, { clipboardData: function(e3) {
    return `clipboardData` in e3 ? e3.clipboardData : window.clipboardData;
  } })), On2 = mn2(h2({}, hn2, { data: 0 })), kn2 = { Esc: `Escape`, Spacebar: ` `, Left: `ArrowLeft`, Up: `ArrowUp`, Right: `ArrowRight`, Down: `ArrowDown`, Del: `Delete`, Win: `OS`, Menu: `ContextMenu`, Apps: `ContextMenu`, Scroll: `ScrollLock`, MozPrintableKey: `Unidentified` }, An2 = { 8: `Backspace`, 9: `Tab`, 12: `Clear`, 13: `Enter`, 16: `Shift`, 17: `Control`, 18: `Alt`, 19: `Pause`, 20: `CapsLock`, 27: `Escape`, 32: ` `, 33: `PageUp`, 34: `PageDown`, 35: `End`, 36: `Home`, 37: `ArrowLeft`, 38: `ArrowUp`, 39: `ArrowRight`, 40: `ArrowDown`, 45: `Insert`, 46: `Delete`, 112: `F1`, 113: `F2`, 114: `F3`, 115: `F4`, 116: `F5`, 117: `F6`, 118: `F7`, 119: `F8`, 120: `F9`, 121: `F10`, 122: `F11`, 123: `F12`, 144: `NumLock`, 145: `ScrollLock`, 224: `Meta` }, jn2 = { Alt: `altKey`, Control: `ctrlKey`, Meta: `metaKey`, Shift: `shiftKey` };
  function Mn2(e3) {
    var t3 = this.nativeEvent;
    return t3.getModifierState ? t3.getModifierState(e3) : (e3 = jn2[e3]) ? !!t3[e3] : false;
  }
  function Nn2() {
    return Mn2;
  }
  var Pn2 = mn2(h2({}, _n2, { key: function(e3) {
    if (e3.key) {
      var t3 = kn2[e3.key] || e3.key;
      if (t3 !== `Unidentified`) return t3;
    }
    return e3.type === `keypress` ? (e3 = dn2(e3), e3 === 13 ? `Enter` : String.fromCharCode(e3)) : e3.type === `keydown` || e3.type === `keyup` ? An2[e3.keyCode] || `Unidentified` : ``;
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Nn2, charCode: function(e3) {
    return e3.type === `keypress` ? dn2(e3) : 0;
  }, keyCode: function(e3) {
    return e3.type === `keydown` || e3.type === `keyup` ? e3.keyCode : 0;
  }, which: function(e3) {
    return e3.type === `keypress` ? dn2(e3) : e3.type === `keydown` || e3.type === `keyup` ? e3.keyCode : 0;
  } })), Fn2 = mn2(h2({}, Sn2, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), In2 = mn2(h2({}, _n2, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Nn2 })), Ln2 = mn2(h2({}, hn2, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })), Rn2 = mn2(h2({}, Sn2, { deltaX: function(e3) {
    return `deltaX` in e3 ? e3.deltaX : `wheelDeltaX` in e3 ? -e3.wheelDeltaX : 0;
  }, deltaY: function(e3) {
    return `deltaY` in e3 ? e3.deltaY : `wheelDeltaY` in e3 ? -e3.wheelDeltaY : `wheelDelta` in e3 ? -e3.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), zn2 = mn2(h2({}, hn2, { newState: 0, oldState: 0 })), Bn2 = [9, 13, 27, 32], Vn2 = rn2 && `CompositionEvent` in window, Hn2 = null;
  rn2 && `documentMode` in document && (Hn2 = document.documentMode);
  var Un2 = rn2 && `TextEvent` in window && !Hn2, Wn2 = rn2 && (!Vn2 || Hn2 && 8 < Hn2 && 11 >= Hn2), Gn2 = ` `, Kn2 = false;
  function qn2(e3, t3) {
    switch (e3) {
      case `keyup`:
        return Bn2.indexOf(t3.keyCode) !== -1;
      case `keydown`:
        return t3.keyCode !== 229;
      case `keypress`:
      case `mousedown`:
      case `focusout`:
        return true;
      default:
        return false;
    }
  }
  function Jn2(e3) {
    return e3 = e3.detail, typeof e3 == `object` && `data` in e3 ? e3.data : null;
  }
  var Yn2 = false;
  function Xn2(e3, t3) {
    switch (e3) {
      case `compositionend`:
        return Jn2(t3);
      case `keypress`:
        return t3.which === 32 ? (Kn2 = true, Gn2) : null;
      case `textInput`:
        return e3 = t3.data, e3 === Gn2 && Kn2 ? null : e3;
      default:
        return null;
    }
  }
  function Zn2(e3, t3) {
    if (Yn2) return e3 === `compositionend` || !Vn2 && qn2(e3, t3) ? (e3 = un2(), ln2 = cn2 = sn2 = null, Yn2 = false, e3) : null;
    switch (e3) {
      case `paste`:
        return null;
      case `keypress`:
        if (!(t3.ctrlKey || t3.altKey || t3.metaKey) || t3.ctrlKey && t3.altKey) {
          if (t3.char && 1 < t3.char.length) return t3.char;
          if (t3.which) return String.fromCharCode(t3.which);
        }
        return null;
      case `compositionend`:
        return Wn2 && t3.locale !== `ko` ? null : t3.data;
      default:
        return null;
    }
  }
  var W2 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function G2(e3) {
    var t3 = e3 && e3.nodeName && e3.nodeName.toLowerCase();
    return t3 === `input` ? !!W2[e3.type] : t3 === `textarea`;
  }
  function Qn2(e3, t3, n3, r3) {
    Zt2 ? Qt2 ? Qt2.push(r3) : Qt2 = [r3] : Zt2 = r3, t3 = Td(t3, `onChange`), 0 < t3.length && (n3 = new gn2(`onChange`, `change`, null, n3, r3), e3.push({ event: n3, listeners: t3 }));
  }
  var $n2 = null, er2 = null;
  function tr2(e3) {
    vd(e3, 0);
  }
  function nr2(e3) {
    if (At2(ft2(e3))) return e3;
  }
  function rr2(e3, t3) {
    if (e3 === `change`) return t3;
  }
  var ir2 = false;
  if (rn2) {
    var ar2;
    if (rn2) {
      var or2 = `oninput` in document;
      if (!or2) {
        var sr2 = document.createElement(`div`);
        sr2.setAttribute(`oninput`, `return;`), or2 = typeof sr2.oninput == `function`;
      }
      ar2 = or2;
    } else ar2 = false;
    ir2 = ar2 && (!document.documentMode || 9 < document.documentMode);
  }
  function cr2() {
    $n2 && ($n2.detachEvent(`onpropertychange`, lr2), er2 = $n2 = null);
  }
  function lr2(e3) {
    if (e3.propertyName === `value` && nr2(er2)) {
      var t3 = [];
      Qn2(t3, er2, e3, Xt2(e3)), tn2(tr2, t3);
    }
  }
  function ur2(e3, t3, n3) {
    e3 === `focusin` ? (cr2(), $n2 = t3, er2 = n3, $n2.attachEvent(`onpropertychange`, lr2)) : e3 === `focusout` && cr2();
  }
  function dr2(e3) {
    if (e3 === `selectionchange` || e3 === `keyup` || e3 === `keydown`) return nr2(er2);
  }
  function fr2(e3, t3) {
    if (e3 === `click`) return nr2(t3);
  }
  function pr2(e3, t3) {
    if (e3 === `input` || e3 === `change`) return nr2(t3);
  }
  function mr2(e3, t3) {
    return e3 === t3 && (e3 !== 0 || 1 / e3 == 1 / t3) || e3 !== e3 && t3 !== t3;
  }
  var hr2 = typeof Object.is == `function` ? Object.is : mr2;
  function gr2(e3, t3) {
    if (hr2(e3, t3)) return true;
    if (typeof e3 != `object` || !e3 || typeof t3 != `object` || !t3) return false;
    var n3 = Object.keys(e3), r3 = Object.keys(t3);
    if (n3.length !== r3.length) return false;
    for (r3 = 0; r3 < n3.length; r3++) {
      var i3 = n3[r3];
      if (!ye2.call(t3, i3) || !hr2(e3[i3], t3[i3])) return false;
    }
    return true;
  }
  function _r2(e3) {
    for (; e3 && e3.firstChild; ) e3 = e3.firstChild;
    return e3;
  }
  function vr2(e3, t3) {
    var n3 = _r2(e3);
    e3 = 0;
    for (var r3; n3; ) {
      if (n3.nodeType === 3) {
        if (r3 = e3 + n3.textContent.length, e3 <= t3 && r3 >= t3) return { node: n3, offset: t3 - e3 };
        e3 = r3;
      }
      a: {
        for (; n3; ) {
          if (n3.nextSibling) {
            n3 = n3.nextSibling;
            break a;
          }
          n3 = n3.parentNode;
        }
        n3 = void 0;
      }
      n3 = _r2(n3);
    }
  }
  function yr2(e3, t3) {
    return e3 && t3 ? e3 === t3 ? true : e3 && e3.nodeType === 3 ? false : t3 && t3.nodeType === 3 ? yr2(e3, t3.parentNode) : `contains` in e3 ? e3.contains(t3) : e3.compareDocumentPosition ? !!(e3.compareDocumentPosition(t3) & 16) : false : false;
  }
  function br2(e3) {
    e3 = e3 != null && e3.ownerDocument != null && e3.ownerDocument.defaultView != null ? e3.ownerDocument.defaultView : window;
    for (var t3 = jt2(e3.document); t3 instanceof e3.HTMLIFrameElement; ) {
      try {
        var n3 = typeof t3.contentWindow.location.href == `string`;
      } catch {
        n3 = false;
      }
      if (n3) e3 = t3.contentWindow;
      else break;
      t3 = jt2(e3.document);
    }
    return t3;
  }
  function xr2(e3) {
    var t3 = e3 && e3.nodeName && e3.nodeName.toLowerCase();
    return t3 && (t3 === `input` && (e3.type === `text` || e3.type === `search` || e3.type === `tel` || e3.type === `url` || e3.type === `password`) || t3 === `textarea` || e3.contentEditable === `true`);
  }
  var Sr2 = rn2 && `documentMode` in document && 11 >= document.documentMode, Cr2 = null, wr2 = null, Tr2 = null, Er2 = false;
  function Dr2(e3, t3, n3) {
    var r3 = n3.window === n3 ? n3.document : n3.nodeType === 9 ? n3 : n3.ownerDocument;
    Er2 || Cr2 == null || Cr2 !== jt2(r3) || (r3 = Cr2, `selectionStart` in r3 && xr2(r3) ? r3 = { start: r3.selectionStart, end: r3.selectionEnd } : (r3 = (r3.ownerDocument && r3.ownerDocument.defaultView || window).getSelection(), r3 = { anchorNode: r3.anchorNode, anchorOffset: r3.anchorOffset, focusNode: r3.focusNode, focusOffset: r3.focusOffset }), Tr2 && gr2(Tr2, r3) || (Tr2 = r3, r3 = Td(wr2, `onSelect`), 0 < r3.length && (t3 = new gn2(`onSelect`, `select`, null, t3, n3), e3.push({ event: t3, listeners: r3 }), t3.target = Cr2)));
  }
  function Or2(e3, t3) {
    var n3 = {};
    return n3[e3.toLowerCase()] = t3.toLowerCase(), n3[`Webkit` + e3] = `webkit` + t3, n3[`Moz` + e3] = `moz` + t3, n3;
  }
  var kr2 = { animationend: Or2(`Animation`, `AnimationEnd`), animationiteration: Or2(`Animation`, `AnimationIteration`), animationstart: Or2(`Animation`, `AnimationStart`), transitionrun: Or2(`Transition`, `TransitionRun`), transitionstart: Or2(`Transition`, `TransitionStart`), transitioncancel: Or2(`Transition`, `TransitionCancel`), transitionend: Or2(`Transition`, `TransitionEnd`) }, Ar2 = {}, jr2 = {};
  rn2 && (jr2 = document.createElement(`div`).style, `AnimationEvent` in window || (delete kr2.animationend.animation, delete kr2.animationiteration.animation, delete kr2.animationstart.animation), `TransitionEvent` in window || delete kr2.transitionend.transition);
  function Mr2(e3) {
    if (Ar2[e3]) return Ar2[e3];
    if (!kr2[e3]) return e3;
    var t3 = kr2[e3], n3;
    for (n3 in t3) if (t3.hasOwnProperty(n3) && n3 in jr2) return Ar2[e3] = t3[n3];
    return e3;
  }
  var Nr2 = Mr2(`animationend`), Pr2 = Mr2(`animationiteration`), Fr2 = Mr2(`animationstart`), Ir2 = Mr2(`transitionrun`), Lr2 = Mr2(`transitionstart`), Rr2 = Mr2(`transitioncancel`), zr2 = Mr2(`transitionend`), Br2 = /* @__PURE__ */ new Map(), Vr2 = `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);
  Vr2.push(`scrollEnd`);
  function Hr2(e3, t3) {
    Br2.set(e3, t3), _t2(t3, [e3]);
  }
  var Ur2 = typeof reportError == `function` ? reportError : function(e3) {
    if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
      var t3 = new window.ErrorEvent(`error`, { bubbles: true, cancelable: true, message: typeof e3 == `object` && e3 && typeof e3.message == `string` ? String(e3.message) : String(e3), error: e3 });
      if (!window.dispatchEvent(t3)) return;
    } else if (typeof process == `object` && typeof process.emit == `function`) {
      process.emit(`uncaughtException`, e3);
      return;
    }
    console.error(e3);
  }, Wr2 = [], Gr2 = 0, Kr2 = 0;
  function qr2() {
    for (var e3 = Gr2, t3 = Kr2 = Gr2 = 0; t3 < e3; ) {
      var n3 = Wr2[t3];
      Wr2[t3++] = null;
      var r3 = Wr2[t3];
      Wr2[t3++] = null;
      var i3 = Wr2[t3];
      Wr2[t3++] = null;
      var a3 = Wr2[t3];
      if (Wr2[t3++] = null, r3 !== null && i3 !== null) {
        var o3 = r3.pending;
        o3 === null ? i3.next = i3 : (i3.next = o3.next, o3.next = i3), r3.pending = i3;
      }
      a3 !== 0 && Zr2(n3, i3, a3);
    }
  }
  function Jr2(e3, t3, n3, r3) {
    Wr2[Gr2++] = e3, Wr2[Gr2++] = t3, Wr2[Gr2++] = n3, Wr2[Gr2++] = r3, Kr2 |= r3, e3.lanes |= r3, e3 = e3.alternate, e3 !== null && (e3.lanes |= r3);
  }
  function Yr2(e3, t3, n3, r3) {
    return Jr2(e3, t3, n3, r3), Qr2(e3);
  }
  function Xr2(e3, t3) {
    return Jr2(e3, null, null, t3), Qr2(e3);
  }
  function Zr2(e3, t3, n3) {
    e3.lanes |= n3;
    var r3 = e3.alternate;
    r3 !== null && (r3.lanes |= n3);
    for (var i3 = false, a3 = e3.return; a3 !== null; ) a3.childLanes |= n3, r3 = a3.alternate, r3 !== null && (r3.childLanes |= n3), a3.tag === 22 && (e3 = a3.stateNode, e3 === null || e3._visibility & 1 || (i3 = true)), e3 = a3, a3 = a3.return;
    return e3.tag === 3 ? (a3 = e3.stateNode, i3 && t3 !== null && (i3 = 31 - Pe2(n3), e3 = a3.hiddenUpdates, r3 = e3[i3], r3 === null ? e3[i3] = [t3] : r3.push(t3), t3.lane = n3 | 536870912), a3) : null;
  }
  function Qr2(e3) {
    if (50 < lu) throw lu = 0, uu = null, Error(i2(185));
    for (var t3 = e3.return; t3 !== null; ) e3 = t3, t3 = e3.return;
    return e3.tag === 3 ? e3.stateNode : null;
  }
  var $r2 = {};
  function ei2(e3, t3, n3, r3) {
    this.tag = e3, this.key = n3, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t3, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r3, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ti2(e3, t3, n3, r3) {
    return new ei2(e3, t3, n3, r3);
  }
  function ni2(e3) {
    return e3 = e3.prototype, !(!e3 || !e3.isReactComponent);
  }
  function ri2(e3, t3) {
    var n3 = e3.alternate;
    return n3 === null ? (n3 = ti2(e3.tag, t3, e3.key, e3.mode), n3.elementType = e3.elementType, n3.type = e3.type, n3.stateNode = e3.stateNode, n3.alternate = e3, e3.alternate = n3) : (n3.pendingProps = t3, n3.type = e3.type, n3.flags = 0, n3.subtreeFlags = 0, n3.deletions = null), n3.flags = e3.flags & 65011712, n3.childLanes = e3.childLanes, n3.lanes = e3.lanes, n3.child = e3.child, n3.memoizedProps = e3.memoizedProps, n3.memoizedState = e3.memoizedState, n3.updateQueue = e3.updateQueue, t3 = e3.dependencies, n3.dependencies = t3 === null ? null : { lanes: t3.lanes, firstContext: t3.firstContext }, n3.sibling = e3.sibling, n3.index = e3.index, n3.ref = e3.ref, n3.refCleanup = e3.refCleanup, n3;
  }
  function ii2(e3, t3) {
    e3.flags &= 65011714;
    var n3 = e3.alternate;
    return n3 === null ? (e3.childLanes = 0, e3.lanes = t3, e3.child = null, e3.subtreeFlags = 0, e3.memoizedProps = null, e3.memoizedState = null, e3.updateQueue = null, e3.dependencies = null, e3.stateNode = null) : (e3.childLanes = n3.childLanes, e3.lanes = n3.lanes, e3.child = n3.child, e3.subtreeFlags = 0, e3.deletions = null, e3.memoizedProps = n3.memoizedProps, e3.memoizedState = n3.memoizedState, e3.updateQueue = n3.updateQueue, e3.type = n3.type, t3 = n3.dependencies, e3.dependencies = t3 === null ? null : { lanes: t3.lanes, firstContext: t3.firstContext }), e3;
  }
  function ai2(e3, t3, n3, r3, a3, o3) {
    var s3 = 0;
    if (r3 = e3, typeof e3 == `function`) ni2(e3) && (s3 = 1);
    else if (typeof e3 == `string`) s3 = Uf(e3, n3, oe2.current) ? 26 : e3 === `html` || e3 === `head` || e3 === `body` ? 27 : 5;
    else a: switch (e3) {
      case k2:
        return e3 = ti2(31, n3, t3, a3), e3.elementType = k2, e3.lanes = o3, e3;
      case y2:
        return oi2(n3.children, a3, o3, t3);
      case b2:
        s3 = 8, a3 |= 24;
        break;
      case x2:
        return e3 = ti2(12, n3, t3, a3 | 2), e3.elementType = x2, e3.lanes = o3, e3;
      case T2:
        return e3 = ti2(13, n3, t3, a3), e3.elementType = T2, e3.lanes = o3, e3;
      case E2:
        return e3 = ti2(19, n3, t3, a3), e3.elementType = E2, e3.lanes = o3, e3;
      default:
        if (typeof e3 == `object` && e3) switch (e3.$$typeof) {
          case C2:
            s3 = 10;
            break a;
          case S2:
            s3 = 9;
            break a;
          case w2:
            s3 = 11;
            break a;
          case D2:
            s3 = 14;
            break a;
          case O2:
            s3 = 16, r3 = null;
            break a;
        }
        s3 = 29, n3 = Error(i2(130, e3 === null ? `null` : typeof e3, ``)), r3 = null;
    }
    return t3 = ti2(s3, n3, t3, a3), t3.elementType = e3, t3.type = r3, t3.lanes = o3, t3;
  }
  function oi2(e3, t3, n3, r3) {
    return e3 = ti2(7, e3, r3, t3), e3.lanes = n3, e3;
  }
  function si2(e3, t3, n3) {
    return e3 = ti2(6, e3, null, t3), e3.lanes = n3, e3;
  }
  function ci2(e3) {
    var t3 = ti2(18, null, null, 0);
    return t3.stateNode = e3, t3;
  }
  function li2(e3, t3, n3) {
    return t3 = ti2(4, e3.children === null ? [] : e3.children, e3.key, t3), t3.lanes = n3, t3.stateNode = { containerInfo: e3.containerInfo, pendingChildren: null, implementation: e3.implementation }, t3;
  }
  var ui2 = /* @__PURE__ */ new WeakMap();
  function di2(e3, t3) {
    if (typeof e3 == `object` && e3) {
      var n3 = ui2.get(e3);
      return n3 === void 0 ? (t3 = { value: e3, source: t3, stack: ve2(t3) }, ui2.set(e3, t3), t3) : n3;
    }
    return { value: e3, source: t3, stack: ve2(t3) };
  }
  var fi2 = [], pi2 = 0, mi2 = null, hi2 = 0, gi2 = [], _i2 = 0, vi2 = null, yi2 = 1, bi2 = ``;
  function xi2(e3, t3) {
    fi2[pi2++] = hi2, fi2[pi2++] = mi2, mi2 = e3, hi2 = t3;
  }
  function Si2(e3, t3, n3) {
    gi2[_i2++] = yi2, gi2[_i2++] = bi2, gi2[_i2++] = vi2, vi2 = e3;
    var r3 = yi2;
    e3 = bi2;
    var i3 = 32 - Pe2(r3) - 1;
    r3 &= ~(1 << i3), n3 += 1;
    var a3 = 32 - Pe2(t3) + i3;
    if (30 < a3) {
      var o3 = i3 - i3 % 5;
      a3 = (r3 & (1 << o3) - 1).toString(32), r3 >>= o3, i3 -= o3, yi2 = 1 << 32 - Pe2(t3) + i3 | n3 << i3 | r3, bi2 = a3 + e3;
    } else yi2 = 1 << a3 | n3 << i3 | r3, bi2 = e3;
  }
  function Ci2(e3) {
    e3.return !== null && (xi2(e3, 1), Si2(e3, 1, 0));
  }
  function wi2(e3) {
    for (; e3 === mi2; ) mi2 = fi2[--pi2], fi2[pi2] = null, hi2 = fi2[--pi2], fi2[pi2] = null;
    for (; e3 === vi2; ) vi2 = gi2[--_i2], gi2[_i2] = null, bi2 = gi2[--_i2], gi2[_i2] = null, yi2 = gi2[--_i2], gi2[_i2] = null;
  }
  function Ti2(e3, t3) {
    gi2[_i2++] = yi2, gi2[_i2++] = bi2, gi2[_i2++] = vi2, yi2 = t3.id, bi2 = t3.overflow, vi2 = e3;
  }
  var Ei2 = null, K2 = null, q2 = false, Di2 = null, Oi2 = false, ki2 = Error(i2(519));
  function Ai2(e3) {
    throw Ii2(di2(Error(i2(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`, ``)), e3)), ki2;
  }
  function ji2(e3) {
    var t3 = e3.stateNode, n3 = e3.type, r3 = e3.memoizedProps;
    switch (t3[tt2] = e3, t3[nt2] = r3, n3) {
      case `dialog`:
        $(`cancel`, t3), $(`close`, t3);
        break;
      case `iframe`:
      case `object`:
      case `embed`:
        $(`load`, t3);
        break;
      case `video`:
      case `audio`:
        for (n3 = 0; n3 < gd.length; n3++) $(gd[n3], t3);
        break;
      case `source`:
        $(`error`, t3);
        break;
      case `img`:
      case `image`:
      case `link`:
        $(`error`, t3), $(`load`, t3);
        break;
      case `details`:
        $(`toggle`, t3);
        break;
      case `input`:
        $(`invalid`, t3), Ft2(t3, r3.value, r3.defaultValue, r3.checked, r3.defaultChecked, r3.type, r3.name, true);
        break;
      case `select`:
        $(`invalid`, t3);
        break;
      case `textarea`:
        $(`invalid`, t3), zt2(t3, r3.value, r3.defaultValue, r3.children);
    }
    n3 = r3.children, typeof n3 != `string` && typeof n3 != `number` && typeof n3 != `bigint` || t3.textContent === `` + n3 || true === r3.suppressHydrationWarning || jd(t3.textContent, n3) ? (r3.popover != null && ($(`beforetoggle`, t3), $(`toggle`, t3)), r3.onScroll != null && $(`scroll`, t3), r3.onScrollEnd != null && $(`scrollend`, t3), r3.onClick != null && (t3.onclick = Jt2), t3 = true) : t3 = false, t3 || Ai2(e3, true);
  }
  function Mi2(e3) {
    for (Ei2 = e3.return; Ei2; ) switch (Ei2.tag) {
      case 5:
      case 31:
      case 13:
        Oi2 = false;
        return;
      case 27:
      case 3:
        Oi2 = true;
        return;
      default:
        Ei2 = Ei2.return;
    }
  }
  function Ni2(e3) {
    if (e3 !== Ei2) return false;
    if (!q2) return Mi2(e3), q2 = true, false;
    var t3 = e3.tag, n3;
    if ((n3 = t3 !== 3 && t3 !== 27) && ((n3 = t3 === 5) && (n3 = e3.type, n3 = n3 === `form` || n3 === `button` || Ud(e3.type, e3.memoizedProps)), n3 = !n3), n3 && K2 && Ai2(e3), Mi2(e3), t3 === 13) {
      if (e3 = e3.memoizedState, e3 = e3 === null ? null : e3.dehydrated, !e3) throw Error(i2(317));
      K2 = uf(e3);
    } else if (t3 === 31) {
      if (e3 = e3.memoizedState, e3 = e3 === null ? null : e3.dehydrated, !e3) throw Error(i2(317));
      K2 = uf(e3);
    } else t3 === 27 ? (t3 = K2, Zd(e3.type) ? (e3 = lf, lf = null, K2 = e3) : K2 = t3) : K2 = Ei2 ? cf(e3.stateNode.nextSibling) : null;
    return true;
  }
  function Pi2() {
    K2 = Ei2 = null, q2 = false;
  }
  function Fi2() {
    var e3 = Di2;
    return e3 !== null && (Yl === null ? Yl = e3 : Yl.push.apply(Yl, e3), Di2 = null), e3;
  }
  function Ii2(e3) {
    Di2 === null ? Di2 = [e3] : Di2.push(e3);
  }
  var Li2 = I2(null), Ri2 = null, zi2 = null;
  function Bi2(e3, t3, n3) {
    ae2(Li2, t3._currentValue), t3._currentValue = n3;
  }
  function Vi2(e3) {
    e3._currentValue = Li2.current, L2(Li2);
  }
  function Hi2(e3, t3, n3) {
    for (; e3 !== null; ) {
      var r3 = e3.alternate;
      if ((e3.childLanes & t3) === t3 ? r3 !== null && (r3.childLanes & t3) !== t3 && (r3.childLanes |= t3) : (e3.childLanes |= t3, r3 !== null && (r3.childLanes |= t3)), e3 === n3) break;
      e3 = e3.return;
    }
  }
  function Ui2(e3, t3, n3, r3) {
    var a3 = e3.child;
    for (a3 !== null && (a3.return = e3); a3 !== null; ) {
      var o3 = a3.dependencies;
      if (o3 !== null) {
        var s3 = a3.child;
        o3 = o3.firstContext;
        a: for (; o3 !== null; ) {
          var c3 = o3;
          o3 = a3;
          for (var l3 = 0; l3 < t3.length; l3++) if (c3.context === t3[l3]) {
            o3.lanes |= n3, c3 = o3.alternate, c3 !== null && (c3.lanes |= n3), Hi2(o3.return, n3, e3), r3 || (s3 = null);
            break a;
          }
          o3 = c3.next;
        }
      } else if (a3.tag === 18) {
        if (s3 = a3.return, s3 === null) throw Error(i2(341));
        s3.lanes |= n3, o3 = s3.alternate, o3 !== null && (o3.lanes |= n3), Hi2(s3, n3, e3), s3 = null;
      } else s3 = a3.child;
      if (s3 !== null) s3.return = a3;
      else for (s3 = a3; s3 !== null; ) {
        if (s3 === e3) {
          s3 = null;
          break;
        }
        if (a3 = s3.sibling, a3 !== null) {
          a3.return = s3.return, s3 = a3;
          break;
        }
        s3 = s3.return;
      }
      a3 = s3;
    }
  }
  function Wi2(e3, t3, n3, r3) {
    e3 = null;
    for (var a3 = t3, o3 = false; a3 !== null; ) {
      if (!o3) {
        if (a3.flags & 524288) o3 = true;
        else if (a3.flags & 262144) break;
      }
      if (a3.tag === 10) {
        var s3 = a3.alternate;
        if (s3 === null) throw Error(i2(387));
        if (s3 = s3.memoizedProps, s3 !== null) {
          var c3 = a3.type;
          hr2(a3.pendingProps.value, s3.value) || (e3 === null ? e3 = [c3] : e3.push(c3));
        }
      } else if (a3 === le2.current) {
        if (s3 = a3.alternate, s3 === null) throw Error(i2(387));
        s3.memoizedState.memoizedState !== a3.memoizedState.memoizedState && (e3 === null ? e3 = [Qf] : e3.push(Qf));
      }
      a3 = a3.return;
    }
    e3 !== null && Ui2(t3, e3, n3, r3), t3.flags |= 262144;
  }
  function Gi2(e3) {
    for (e3 = e3.firstContext; e3 !== null; ) {
      if (!hr2(e3.context._currentValue, e3.memoizedValue)) return true;
      e3 = e3.next;
    }
    return false;
  }
  function Ki2(e3) {
    Ri2 = e3, zi2 = null, e3 = e3.dependencies, e3 !== null && (e3.firstContext = null);
  }
  function qi2(e3) {
    return Yi2(Ri2, e3);
  }
  function Ji2(e3, t3) {
    return Ri2 === null && Ki2(e3), Yi2(e3, t3);
  }
  function Yi2(e3, t3) {
    var n3 = t3._currentValue;
    if (t3 = { context: t3, memoizedValue: n3, next: null }, zi2 === null) {
      if (e3 === null) throw Error(i2(308));
      zi2 = t3, e3.dependencies = { lanes: 0, firstContext: t3 }, e3.flags |= 524288;
    } else zi2 = zi2.next = t3;
    return n3;
  }
  var Xi2 = typeof AbortController < `u` ? AbortController : function() {
    var e3 = [], t3 = this.signal = { aborted: false, addEventListener: function(t4, n3) {
      e3.push(n3);
    } };
    this.abort = function() {
      t3.aborted = true, e3.forEach(function(e4) {
        return e4();
      });
    };
  }, Zi2 = t2.unstable_scheduleCallback, Qi2 = t2.unstable_NormalPriority, $i2 = { $$typeof: C2, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function ea2() {
    return { controller: new Xi2(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function ta2(e3) {
    e3.refCount--, e3.refCount === 0 && Zi2(Qi2, function() {
      e3.controller.abort();
    });
  }
  var na2 = null, ra2 = 0, ia2 = 0, aa2 = null;
  function oa2(e3, t3) {
    if (na2 === null) {
      var n3 = na2 = [];
      ra2 = 0, ia2 = ud(), aa2 = { status: `pending`, value: void 0, then: function(e4) {
        n3.push(e4);
      } };
    }
    return ra2++, t3.then(sa2, sa2), t3;
  }
  function sa2() {
    if (--ra2 === 0 && na2 !== null) {
      aa2 !== null && (aa2.status = `fulfilled`);
      var e3 = na2;
      na2 = null, ia2 = 0, aa2 = null;
      for (var t3 = 0; t3 < e3.length; t3++) (0, e3[t3])();
    }
  }
  function ca2(e3, t3) {
    var n3 = [], r3 = { status: `pending`, value: null, reason: null, then: function(e4) {
      n3.push(e4);
    } };
    return e3.then(function() {
      r3.status = `fulfilled`, r3.value = t3;
      for (var e4 = 0; e4 < n3.length; e4++) (0, n3[e4])(t3);
    }, function(e4) {
      for (r3.status = `rejected`, r3.reason = e4, e4 = 0; e4 < n3.length; e4++) (0, n3[e4])(void 0);
    }), r3;
  }
  var la2 = P2.S;
  P2.S = function(e3, t3) {
    Ql = Ce2(), typeof t3 == `object` && t3 && typeof t3.then == `function` && oa2(e3, t3), la2 !== null && la2(e3, t3);
  };
  var ua2 = I2(null);
  function da2() {
    var e3 = ua2.current;
    return e3 === null ? Fl.pooledCache : e3;
  }
  function fa2(e3, t3) {
    t3 === null ? ae2(ua2, ua2.current) : ae2(ua2, t3.pool);
  }
  function pa2() {
    var e3 = da2();
    return e3 === null ? null : { parent: $i2._currentValue, pool: e3 };
  }
  var ma2 = Error(i2(460)), ha2 = Error(i2(474)), ga2 = Error(i2(542)), _a2 = { then: function() {
  } };
  function va2(e3) {
    return e3 = e3.status, e3 === `fulfilled` || e3 === `rejected`;
  }
  function ya2(e3, t3, n3) {
    switch (n3 = e3[n3], n3 === void 0 ? e3.push(t3) : n3 !== t3 && (t3.then(Jt2, Jt2), t3 = n3), t3.status) {
      case `fulfilled`:
        return t3.value;
      case `rejected`:
        throw e3 = t3.reason, Ca2(e3), e3;
      default:
        if (typeof t3.status == `string`) t3.then(Jt2, Jt2);
        else {
          if (e3 = Fl, e3 !== null && 100 < e3.shellSuspendCounter) throw Error(i2(482));
          e3 = t3, e3.status = `pending`, e3.then(function(e4) {
            if (t3.status === `pending`) {
              var n4 = t3;
              n4.status = `fulfilled`, n4.value = e4;
            }
          }, function(e4) {
            if (t3.status === `pending`) {
              var n4 = t3;
              n4.status = `rejected`, n4.reason = e4;
            }
          });
        }
        switch (t3.status) {
          case `fulfilled`:
            return t3.value;
          case `rejected`:
            throw e3 = t3.reason, Ca2(e3), e3;
        }
        throw xa2 = t3, ma2;
    }
  }
  function ba2(e3) {
    try {
      var t3 = e3._init;
      return t3(e3._payload);
    } catch (e4) {
      throw typeof e4 == `object` && e4 && typeof e4.then == `function` ? (xa2 = e4, ma2) : e4;
    }
  }
  var xa2 = null;
  function Sa2() {
    if (xa2 === null) throw Error(i2(459));
    var e3 = xa2;
    return xa2 = null, e3;
  }
  function Ca2(e3) {
    if (e3 === ma2 || e3 === ga2) throw Error(i2(483));
  }
  var wa2 = null, Ta2 = 0;
  function Ea2(e3) {
    var t3 = Ta2;
    return Ta2 += 1, wa2 === null && (wa2 = []), ya2(wa2, e3, t3);
  }
  function Da2(e3, t3) {
    t3 = t3.props.ref, e3.ref = t3 === void 0 ? null : t3;
  }
  function Oa2(e3, t3) {
    throw t3.$$typeof === g2 ? Error(i2(525)) : (e3 = Object.prototype.toString.call(t3), Error(i2(31, e3 === `[object Object]` ? `object with keys {` + Object.keys(t3).join(`, `) + `}` : e3)));
  }
  function ka2(e3) {
    function t3(t4, n4) {
      if (e3) {
        var r4 = t4.deletions;
        r4 === null ? (t4.deletions = [n4], t4.flags |= 16) : r4.push(n4);
      }
    }
    function n3(n4, r4) {
      if (!e3) return null;
      for (; r4 !== null; ) t3(n4, r4), r4 = r4.sibling;
      return null;
    }
    function r3(e4) {
      for (var t4 = /* @__PURE__ */ new Map(); e4 !== null; ) e4.key === null ? t4.set(e4.index, e4) : t4.set(e4.key, e4), e4 = e4.sibling;
      return t4;
    }
    function a3(e4, t4) {
      return e4 = ri2(e4, t4), e4.index = 0, e4.sibling = null, e4;
    }
    function o3(t4, n4, r4) {
      return t4.index = r4, e3 ? (r4 = t4.alternate, r4 === null ? (t4.flags |= 67108866, n4) : (r4 = r4.index, r4 < n4 ? (t4.flags |= 67108866, n4) : r4)) : (t4.flags |= 1048576, n4);
    }
    function s3(t4) {
      return e3 && t4.alternate === null && (t4.flags |= 67108866), t4;
    }
    function c3(e4, t4, n4, r4) {
      return t4 === null || t4.tag !== 6 ? (t4 = si2(n4, e4.mode, r4), t4.return = e4, t4) : (t4 = a3(t4, n4), t4.return = e4, t4);
    }
    function l3(e4, t4, n4, r4) {
      var i3 = n4.type;
      return i3 === y2 ? d3(e4, t4, n4.props.children, r4, n4.key) : t4 !== null && (t4.elementType === i3 || typeof i3 == `object` && i3 && i3.$$typeof === O2 && ba2(i3) === t4.type) ? (t4 = a3(t4, n4.props), Da2(t4, n4), t4.return = e4, t4) : (t4 = ai2(n4.type, n4.key, n4.props, null, e4.mode, r4), Da2(t4, n4), t4.return = e4, t4);
    }
    function u2(e4, t4, n4, r4) {
      return t4 === null || t4.tag !== 4 || t4.stateNode.containerInfo !== n4.containerInfo || t4.stateNode.implementation !== n4.implementation ? (t4 = li2(n4, e4.mode, r4), t4.return = e4, t4) : (t4 = a3(t4, n4.children || []), t4.return = e4, t4);
    }
    function d3(e4, t4, n4, r4, i3) {
      return t4 === null || t4.tag !== 7 ? (t4 = oi2(n4, e4.mode, r4, i3), t4.return = e4, t4) : (t4 = a3(t4, n4), t4.return = e4, t4);
    }
    function f2(e4, t4, n4) {
      if (typeof t4 == `string` && t4 !== `` || typeof t4 == `number` || typeof t4 == `bigint`) return t4 = si2(`` + t4, e4.mode, n4), t4.return = e4, t4;
      if (typeof t4 == `object` && t4) {
        switch (t4.$$typeof) {
          case _2:
            return n4 = ai2(t4.type, t4.key, t4.props, null, e4.mode, n4), Da2(n4, t4), n4.return = e4, n4;
          case v2:
            return t4 = li2(t4, e4.mode, n4), t4.return = e4, t4;
          case O2:
            return t4 = ba2(t4), f2(e4, t4, n4);
        }
        if (te2(t4) || j2(t4)) return t4 = oi2(t4, e4.mode, n4, null), t4.return = e4, t4;
        if (typeof t4.then == `function`) return f2(e4, Ea2(t4), n4);
        if (t4.$$typeof === C2) return f2(e4, Ji2(e4, t4), n4);
        Oa2(e4, t4);
      }
      return null;
    }
    function p3(e4, t4, n4, r4) {
      var i3 = t4 === null ? null : t4.key;
      if (typeof n4 == `string` && n4 !== `` || typeof n4 == `number` || typeof n4 == `bigint`) return i3 === null ? c3(e4, t4, `` + n4, r4) : null;
      if (typeof n4 == `object` && n4) {
        switch (n4.$$typeof) {
          case _2:
            return n4.key === i3 ? l3(e4, t4, n4, r4) : null;
          case v2:
            return n4.key === i3 ? u2(e4, t4, n4, r4) : null;
          case O2:
            return n4 = ba2(n4), p3(e4, t4, n4, r4);
        }
        if (te2(n4) || j2(n4)) return i3 === null ? d3(e4, t4, n4, r4, null) : null;
        if (typeof n4.then == `function`) return p3(e4, t4, Ea2(n4), r4);
        if (n4.$$typeof === C2) return p3(e4, t4, Ji2(e4, n4), r4);
        Oa2(e4, n4);
      }
      return null;
    }
    function m2(e4, t4, n4, r4, i3) {
      if (typeof r4 == `string` && r4 !== `` || typeof r4 == `number` || typeof r4 == `bigint`) return e4 = e4.get(n4) || null, c3(t4, e4, `` + r4, i3);
      if (typeof r4 == `object` && r4) {
        switch (r4.$$typeof) {
          case _2:
            return e4 = e4.get(r4.key === null ? n4 : r4.key) || null, l3(t4, e4, r4, i3);
          case v2:
            return e4 = e4.get(r4.key === null ? n4 : r4.key) || null, u2(t4, e4, r4, i3);
          case O2:
            return r4 = ba2(r4), m2(e4, t4, n4, r4, i3);
        }
        if (te2(r4) || j2(r4)) return e4 = e4.get(n4) || null, d3(t4, e4, r4, i3, null);
        if (typeof r4.then == `function`) return m2(e4, t4, n4, Ea2(r4), i3);
        if (r4.$$typeof === C2) return m2(e4, t4, n4, Ji2(t4, r4), i3);
        Oa2(t4, r4);
      }
      return null;
    }
    function h3(i3, a4, s4, c4) {
      for (var l4 = null, u3 = null, d4 = a4, h4 = a4 = 0, g4 = null; d4 !== null && h4 < s4.length; h4++) {
        d4.index > h4 ? (g4 = d4, d4 = null) : g4 = d4.sibling;
        var _3 = p3(i3, d4, s4[h4], c4);
        if (_3 === null) {
          d4 === null && (d4 = g4);
          break;
        }
        e3 && d4 && _3.alternate === null && t3(i3, d4), a4 = o3(_3, a4, h4), u3 === null ? l4 = _3 : u3.sibling = _3, u3 = _3, d4 = g4;
      }
      if (h4 === s4.length) return n3(i3, d4), q2 && xi2(i3, h4), l4;
      if (d4 === null) {
        for (; h4 < s4.length; h4++) d4 = f2(i3, s4[h4], c4), d4 !== null && (a4 = o3(d4, a4, h4), u3 === null ? l4 = d4 : u3.sibling = d4, u3 = d4);
        return q2 && xi2(i3, h4), l4;
      }
      for (d4 = r3(d4); h4 < s4.length; h4++) g4 = m2(d4, i3, h4, s4[h4], c4), g4 !== null && (e3 && g4.alternate !== null && d4.delete(g4.key === null ? h4 : g4.key), a4 = o3(g4, a4, h4), u3 === null ? l4 = g4 : u3.sibling = g4, u3 = g4);
      return e3 && d4.forEach(function(e4) {
        return t3(i3, e4);
      }), q2 && xi2(i3, h4), l4;
    }
    function g3(a4, s4, c4, l4) {
      if (c4 == null) throw Error(i2(151));
      for (var u3 = null, d4 = null, h4 = s4, g4 = s4 = 0, _3 = null, v3 = c4.next(); h4 !== null && !v3.done; g4++, v3 = c4.next()) {
        h4.index > g4 ? (_3 = h4, h4 = null) : _3 = h4.sibling;
        var y3 = p3(a4, h4, v3.value, l4);
        if (y3 === null) {
          h4 === null && (h4 = _3);
          break;
        }
        e3 && h4 && y3.alternate === null && t3(a4, h4), s4 = o3(y3, s4, g4), d4 === null ? u3 = y3 : d4.sibling = y3, d4 = y3, h4 = _3;
      }
      if (v3.done) return n3(a4, h4), q2 && xi2(a4, g4), u3;
      if (h4 === null) {
        for (; !v3.done; g4++, v3 = c4.next()) v3 = f2(a4, v3.value, l4), v3 !== null && (s4 = o3(v3, s4, g4), d4 === null ? u3 = v3 : d4.sibling = v3, d4 = v3);
        return q2 && xi2(a4, g4), u3;
      }
      for (h4 = r3(h4); !v3.done; g4++, v3 = c4.next()) v3 = m2(h4, a4, g4, v3.value, l4), v3 !== null && (e3 && v3.alternate !== null && h4.delete(v3.key === null ? g4 : v3.key), s4 = o3(v3, s4, g4), d4 === null ? u3 = v3 : d4.sibling = v3, d4 = v3);
      return e3 && h4.forEach(function(e4) {
        return t3(a4, e4);
      }), q2 && xi2(a4, g4), u3;
    }
    function b3(e4, r4, o4, c4) {
      if (typeof o4 == `object` && o4 && o4.type === y2 && o4.key === null && (o4 = o4.props.children), typeof o4 == `object` && o4) {
        switch (o4.$$typeof) {
          case _2:
            a: {
              for (var l4 = o4.key; r4 !== null; ) {
                if (r4.key === l4) {
                  if (l4 = o4.type, l4 === y2) {
                    if (r4.tag === 7) {
                      n3(e4, r4.sibling), c4 = a3(r4, o4.props.children), c4.return = e4, e4 = c4;
                      break a;
                    }
                  } else if (r4.elementType === l4 || typeof l4 == `object` && l4 && l4.$$typeof === O2 && ba2(l4) === r4.type) {
                    n3(e4, r4.sibling), c4 = a3(r4, o4.props), Da2(c4, o4), c4.return = e4, e4 = c4;
                    break a;
                  }
                  n3(e4, r4);
                  break;
                }
                t3(e4, r4), r4 = r4.sibling;
              }
              o4.type === y2 ? (c4 = oi2(o4.props.children, e4.mode, c4, o4.key), c4.return = e4, e4 = c4) : (c4 = ai2(o4.type, o4.key, o4.props, null, e4.mode, c4), Da2(c4, o4), c4.return = e4, e4 = c4);
            }
            return s3(e4);
          case v2:
            a: {
              for (l4 = o4.key; r4 !== null; ) {
                if (r4.key === l4) {
                  if (r4.tag === 4 && r4.stateNode.containerInfo === o4.containerInfo && r4.stateNode.implementation === o4.implementation) {
                    n3(e4, r4.sibling), c4 = a3(r4, o4.children || []), c4.return = e4, e4 = c4;
                    break a;
                  }
                  n3(e4, r4);
                  break;
                }
                t3(e4, r4), r4 = r4.sibling;
              }
              c4 = li2(o4, e4.mode, c4), c4.return = e4, e4 = c4;
            }
            return s3(e4);
          case O2:
            return o4 = ba2(o4), b3(e4, r4, o4, c4);
        }
        if (te2(o4)) return h3(e4, r4, o4, c4);
        if (j2(o4)) {
          if (l4 = j2(o4), typeof l4 != `function`) throw Error(i2(150));
          return o4 = l4.call(o4), g3(e4, r4, o4, c4);
        }
        if (typeof o4.then == `function`) return b3(e4, r4, Ea2(o4), c4);
        if (o4.$$typeof === C2) return b3(e4, r4, Ji2(e4, o4), c4);
        Oa2(e4, o4);
      }
      return typeof o4 == `string` && o4 !== `` || typeof o4 == `number` || typeof o4 == `bigint` ? (o4 = `` + o4, r4 !== null && r4.tag === 6 ? (n3(e4, r4.sibling), c4 = a3(r4, o4), c4.return = e4, e4 = c4) : (n3(e4, r4), c4 = si2(o4, e4.mode, c4), c4.return = e4, e4 = c4), s3(e4)) : n3(e4, r4);
    }
    return function(e4, t4, n4, r4) {
      try {
        Ta2 = 0;
        var i3 = b3(e4, t4, n4, r4);
        return wa2 = null, i3;
      } catch (t5) {
        if (t5 === ma2 || t5 === ga2) throw t5;
        var a4 = ti2(29, t5, null, e4.mode);
        return a4.lanes = r4, a4.return = e4, a4;
      }
    };
  }
  var Aa2 = ka2(true), ja2 = ka2(false), Ma2 = false;
  function Na2(e3) {
    e3.updateQueue = { baseState: e3.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Pa2(e3, t3) {
    e3 = e3.updateQueue, t3.updateQueue === e3 && (t3.updateQueue = { baseState: e3.baseState, firstBaseUpdate: e3.firstBaseUpdate, lastBaseUpdate: e3.lastBaseUpdate, shared: e3.shared, callbacks: null });
  }
  function Fa2(e3) {
    return { lane: e3, tag: 0, payload: null, callback: null, next: null };
  }
  function J2(e3, t3, n3) {
    var r3 = e3.updateQueue;
    if (r3 === null) return null;
    if (r3 = r3.shared, X & 2) {
      var i3 = r3.pending;
      return i3 === null ? t3.next = t3 : (t3.next = i3.next, i3.next = t3), r3.pending = t3, t3 = Qr2(e3), Zr2(e3, null, n3), t3;
    }
    return Jr2(e3, r3, t3, n3), Qr2(e3);
  }
  function Ia2(e3, t3, n3) {
    if (t3 = t3.updateQueue, t3 !== null && (t3 = t3.shared, n3 & 4194048)) {
      var r3 = t3.lanes;
      r3 &= e3.pendingLanes, n3 |= r3, t3.lanes = n3, Ye2(e3, n3);
    }
  }
  function La2(e3, t3) {
    var n3 = e3.updateQueue, r3 = e3.alternate;
    if (r3 !== null && (r3 = r3.updateQueue, n3 === r3)) {
      var i3 = null, a3 = null;
      if (n3 = n3.firstBaseUpdate, n3 !== null) {
        do {
          var o3 = { lane: n3.lane, tag: n3.tag, payload: n3.payload, callback: null, next: null };
          a3 === null ? i3 = a3 = o3 : a3 = a3.next = o3, n3 = n3.next;
        } while (n3 !== null);
        a3 === null ? i3 = a3 = t3 : a3 = a3.next = t3;
      } else i3 = a3 = t3;
      n3 = { baseState: r3.baseState, firstBaseUpdate: i3, lastBaseUpdate: a3, shared: r3.shared, callbacks: r3.callbacks }, e3.updateQueue = n3;
      return;
    }
    e3 = n3.lastBaseUpdate, e3 === null ? n3.firstBaseUpdate = t3 : e3.next = t3, n3.lastBaseUpdate = t3;
  }
  var Ra2 = false;
  function za2() {
    if (Ra2) {
      var e3 = aa2;
      if (e3 !== null) throw e3;
    }
  }
  function Ba2(e3, t3, n3, r3) {
    Ra2 = false;
    var i3 = e3.updateQueue;
    Ma2 = false;
    var a3 = i3.firstBaseUpdate, o3 = i3.lastBaseUpdate, s3 = i3.shared.pending;
    if (s3 !== null) {
      i3.shared.pending = null;
      var c3 = s3, l3 = c3.next;
      c3.next = null, o3 === null ? a3 = l3 : o3.next = l3, o3 = c3;
      var u2 = e3.alternate;
      u2 !== null && (u2 = u2.updateQueue, s3 = u2.lastBaseUpdate, s3 !== o3 && (s3 === null ? u2.firstBaseUpdate = l3 : s3.next = l3, u2.lastBaseUpdate = c3));
    }
    if (a3 !== null) {
      var d3 = i3.baseState;
      o3 = 0, u2 = l3 = c3 = null, s3 = a3;
      do {
        var f2 = s3.lane & -536870913, p3 = f2 !== s3.lane;
        if (p3 ? (Q & f2) === f2 : (r3 & f2) === f2) {
          f2 !== 0 && f2 === ia2 && (Ra2 = true), u2 !== null && (u2 = u2.next = { lane: 0, tag: s3.tag, payload: s3.payload, callback: null, next: null });
          a: {
            var m2 = e3, g3 = s3;
            f2 = t3;
            var _3 = n3;
            switch (g3.tag) {
              case 1:
                if (m2 = g3.payload, typeof m2 == `function`) {
                  d3 = m2.call(_3, d3, f2);
                  break a;
                }
                d3 = m2;
                break a;
              case 3:
                m2.flags = m2.flags & -65537 | 128;
              case 0:
                if (m2 = g3.payload, f2 = typeof m2 == `function` ? m2.call(_3, d3, f2) : m2, f2 == null) break a;
                d3 = h2({}, d3, f2);
                break a;
              case 2:
                Ma2 = true;
            }
          }
          f2 = s3.callback, f2 !== null && (e3.flags |= 64, p3 && (e3.flags |= 8192), p3 = i3.callbacks, p3 === null ? i3.callbacks = [f2] : p3.push(f2));
        } else p3 = { lane: f2, tag: s3.tag, payload: s3.payload, callback: s3.callback, next: null }, u2 === null ? (l3 = u2 = p3, c3 = d3) : u2 = u2.next = p3, o3 |= f2;
        if (s3 = s3.next, s3 === null) {
          if (s3 = i3.shared.pending, s3 === null) break;
          p3 = s3, s3 = p3.next, p3.next = null, i3.lastBaseUpdate = p3, i3.shared.pending = null;
        }
      } while (1);
      u2 === null && (c3 = d3), i3.baseState = c3, i3.firstBaseUpdate = l3, i3.lastBaseUpdate = u2, a3 === null && (i3.shared.lanes = 0), Ul |= o3, e3.lanes = o3, e3.memoizedState = d3;
    }
  }
  function Va2(e3, t3) {
    if (typeof e3 != `function`) throw Error(i2(191, e3));
    e3.call(t3);
  }
  function Ha2(e3, t3) {
    var n3 = e3.callbacks;
    if (n3 !== null) for (e3.callbacks = null, e3 = 0; e3 < n3.length; e3++) Va2(n3[e3], t3);
  }
  var Ua2 = I2(null), Wa2 = I2(0);
  function Ga2(e3, t3) {
    e3 = Vl, ae2(Wa2, e3), ae2(Ua2, t3), Vl = e3 | t3.baseLanes;
  }
  function Ka2() {
    ae2(Wa2, Vl), ae2(Ua2, Ua2.current);
  }
  function qa2() {
    Vl = Wa2.current, L2(Ua2), L2(Wa2);
  }
  var Ja2 = I2(null), Ya2 = null;
  function Xa2(e3) {
    var t3 = e3.alternate;
    ae2(to2, to2.current & 1), ae2(Ja2, e3), Ya2 === null && (t3 === null || Ua2.current !== null || t3.memoizedState !== null) && (Ya2 = e3);
  }
  function Za2(e3) {
    ae2(to2, to2.current), ae2(Ja2, e3), Ya2 === null && (Ya2 = e3);
  }
  function Qa2(e3) {
    e3.tag === 22 ? (ae2(to2, to2.current), ae2(Ja2, e3), Ya2 === null && (Ya2 = e3)) : $a2(e3);
  }
  function $a2() {
    ae2(to2, to2.current), ae2(Ja2, Ja2.current);
  }
  function eo2(e3) {
    L2(Ja2), Ya2 === e3 && (Ya2 = null), L2(to2);
  }
  var to2 = I2(0);
  function no2(e3) {
    for (var t3 = e3; t3 !== null; ) {
      if (t3.tag === 13) {
        var n3 = t3.memoizedState;
        if (n3 !== null && (n3 = n3.dehydrated, n3 === null || af(n3) || of(n3))) return t3;
      } else if (t3.tag === 19 && (t3.memoizedProps.revealOrder === `forwards` || t3.memoizedProps.revealOrder === `backwards` || t3.memoizedProps.revealOrder === `unstable_legacy-backwards` || t3.memoizedProps.revealOrder === `together`)) {
        if (t3.flags & 128) return t3;
      } else if (t3.child !== null) {
        t3.child.return = t3, t3 = t3.child;
        continue;
      }
      if (t3 === e3) break;
      for (; t3.sibling === null; ) {
        if (t3.return === null || t3.return === e3) return null;
        t3 = t3.return;
      }
      t3.sibling.return = t3.return, t3 = t3.sibling;
    }
    return null;
  }
  var ro2 = 0, Y2 = null, io2 = null, ao2 = null, oo2 = false, so2 = false, co2 = false, lo2 = 0, uo2 = 0, fo2 = null, po2 = 0;
  function mo2() {
    throw Error(i2(321));
  }
  function ho2(e3, t3) {
    if (t3 === null) return false;
    for (var n3 = 0; n3 < t3.length && n3 < e3.length; n3++) if (!hr2(e3[n3], t3[n3])) return false;
    return true;
  }
  function go2(e3, t3, n3, r3, i3, a3) {
    return ro2 = a3, Y2 = t3, t3.memoizedState = null, t3.updateQueue = null, t3.lanes = 0, P2.H = e3 === null || e3.memoizedState === null ? Ns : Ps, co2 = false, a3 = n3(r3, i3), co2 = false, so2 && (a3 = vo2(t3, n3, r3, i3)), _o2(e3), a3;
  }
  function _o2(e3) {
    P2.H = Ms;
    var t3 = io2 !== null && io2.next !== null;
    if (ro2 = 0, ao2 = io2 = Y2 = null, oo2 = false, uo2 = 0, fo2 = null, t3) throw Error(i2(300));
    e3 === null || Zs || (e3 = e3.dependencies, e3 !== null && Gi2(e3) && (Zs = true));
  }
  function vo2(e3, t3, n3, r3) {
    Y2 = e3;
    var a3 = 0;
    do {
      if (so2 && (fo2 = null), uo2 = 0, so2 = false, 25 <= a3) throw Error(i2(301));
      if (a3 += 1, ao2 = io2 = null, e3.updateQueue != null) {
        var o3 = e3.updateQueue;
        o3.lastEffect = null, o3.events = null, o3.stores = null, o3.memoCache != null && (o3.memoCache.index = 0);
      }
      P2.H = Fs, o3 = t3(n3, r3);
    } while (so2);
    return o3;
  }
  function yo2() {
    var e3 = P2.H, t3 = e3.useState()[0];
    return t3 = typeof t3.then == `function` ? Eo2(t3) : t3, e3 = e3.useState()[0], (io2 === null ? null : io2.memoizedState) !== e3 && (Y2.flags |= 1024), t3;
  }
  function bo2() {
    var e3 = lo2 !== 0;
    return lo2 = 0, e3;
  }
  function xo2(e3, t3, n3) {
    t3.updateQueue = e3.updateQueue, t3.flags &= -2053, e3.lanes &= ~n3;
  }
  function So2(e3) {
    if (oo2) {
      for (e3 = e3.memoizedState; e3 !== null; ) {
        var t3 = e3.queue;
        t3 !== null && (t3.pending = null), e3 = e3.next;
      }
      oo2 = false;
    }
    ro2 = 0, ao2 = io2 = Y2 = null, so2 = false, uo2 = lo2 = 0, fo2 = null;
  }
  function Co2() {
    var e3 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ao2 === null ? Y2.memoizedState = ao2 = e3 : ao2 = ao2.next = e3, ao2;
  }
  function wo2() {
    if (io2 === null) {
      var e3 = Y2.alternate;
      e3 = e3 === null ? null : e3.memoizedState;
    } else e3 = io2.next;
    var t3 = ao2 === null ? Y2.memoizedState : ao2.next;
    if (t3 !== null) ao2 = t3, io2 = e3;
    else {
      if (e3 === null) throw Y2.alternate === null ? Error(i2(467)) : Error(i2(310));
      io2 = e3, e3 = { memoizedState: io2.memoizedState, baseState: io2.baseState, baseQueue: io2.baseQueue, queue: io2.queue, next: null }, ao2 === null ? Y2.memoizedState = ao2 = e3 : ao2 = ao2.next = e3;
    }
    return ao2;
  }
  function To2() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Eo2(e3) {
    var t3 = uo2;
    return uo2 += 1, fo2 === null && (fo2 = []), e3 = ya2(fo2, e3, t3), t3 = Y2, (ao2 === null ? t3.memoizedState : ao2.next) === null && (t3 = t3.alternate, P2.H = t3 === null || t3.memoizedState === null ? Ns : Ps), e3;
  }
  function Do2(e3) {
    if (typeof e3 == `object` && e3) {
      if (typeof e3.then == `function`) return Eo2(e3);
      if (e3.$$typeof === C2) return qi2(e3);
    }
    throw Error(i2(438, String(e3)));
  }
  function Oo2(e3) {
    var t3 = null, n3 = Y2.updateQueue;
    if (n3 !== null && (t3 = n3.memoCache), t3 == null) {
      var r3 = Y2.alternate;
      r3 !== null && (r3 = r3.updateQueue, r3 !== null && (r3 = r3.memoCache, r3 != null && (t3 = { data: r3.data.map(function(e4) {
        return e4.slice();
      }), index: 0 })));
    }
    if (t3 ??= { data: [], index: 0 }, n3 === null && (n3 = To2(), Y2.updateQueue = n3), n3.memoCache = t3, n3 = t3.data[t3.index], n3 === void 0) for (n3 = t3.data[t3.index] = Array(e3), r3 = 0; r3 < e3; r3++) n3[r3] = A2;
    return t3.index++, n3;
  }
  function ko2(e3, t3) {
    return typeof t3 == `function` ? t3(e3) : t3;
  }
  function Ao2(e3) {
    return jo2(wo2(), io2, e3);
  }
  function jo2(e3, t3, n3) {
    var r3 = e3.queue;
    if (r3 === null) throw Error(i2(311));
    r3.lastRenderedReducer = n3;
    var a3 = e3.baseQueue, o3 = r3.pending;
    if (o3 !== null) {
      if (a3 !== null) {
        var s3 = a3.next;
        a3.next = o3.next, o3.next = s3;
      }
      t3.baseQueue = a3 = o3, r3.pending = null;
    }
    if (o3 = e3.baseState, a3 === null) e3.memoizedState = o3;
    else {
      t3 = a3.next;
      var c3 = s3 = null, l3 = null, u2 = t3, d3 = false;
      do {
        var f2 = u2.lane & -536870913;
        if (f2 === u2.lane ? (ro2 & f2) === f2 : (Q & f2) === f2) {
          var p3 = u2.revertLane;
          if (p3 === 0) l3 !== null && (l3 = l3.next = { lane: 0, revertLane: 0, gesture: null, action: u2.action, hasEagerState: u2.hasEagerState, eagerState: u2.eagerState, next: null }), f2 === ia2 && (d3 = true);
          else if ((ro2 & p3) === p3) {
            u2 = u2.next, p3 === ia2 && (d3 = true);
            continue;
          } else f2 = { lane: 0, revertLane: u2.revertLane, gesture: null, action: u2.action, hasEagerState: u2.hasEagerState, eagerState: u2.eagerState, next: null }, l3 === null ? (c3 = l3 = f2, s3 = o3) : l3 = l3.next = f2, Y2.lanes |= p3, Ul |= p3;
          f2 = u2.action, co2 && n3(o3, f2), o3 = u2.hasEagerState ? u2.eagerState : n3(o3, f2);
        } else p3 = { lane: f2, revertLane: u2.revertLane, gesture: u2.gesture, action: u2.action, hasEagerState: u2.hasEagerState, eagerState: u2.eagerState, next: null }, l3 === null ? (c3 = l3 = p3, s3 = o3) : l3 = l3.next = p3, Y2.lanes |= f2, Ul |= f2;
        u2 = u2.next;
      } while (u2 !== null && u2 !== t3);
      if (l3 === null ? s3 = o3 : l3.next = c3, !hr2(o3, e3.memoizedState) && (Zs = true, d3 && (n3 = aa2, n3 !== null))) throw n3;
      e3.memoizedState = o3, e3.baseState = s3, e3.baseQueue = l3, r3.lastRenderedState = o3;
    }
    return a3 === null && (r3.lanes = 0), [e3.memoizedState, r3.dispatch];
  }
  function Mo2(e3) {
    var t3 = wo2(), n3 = t3.queue;
    if (n3 === null) throw Error(i2(311));
    n3.lastRenderedReducer = e3;
    var r3 = n3.dispatch, a3 = n3.pending, o3 = t3.memoizedState;
    if (a3 !== null) {
      n3.pending = null;
      var s3 = a3 = a3.next;
      do
        o3 = e3(o3, s3.action), s3 = s3.next;
      while (s3 !== a3);
      hr2(o3, t3.memoizedState) || (Zs = true), t3.memoizedState = o3, t3.baseQueue === null && (t3.baseState = o3), n3.lastRenderedState = o3;
    }
    return [o3, r3];
  }
  function No2(e3, t3, n3) {
    var r3 = Y2, a3 = wo2(), o3 = q2;
    if (o3) {
      if (n3 === void 0) throw Error(i2(407));
      n3 = n3();
    } else n3 = t3();
    var s3 = !hr2((io2 || a3).memoizedState, n3);
    if (s3 && (a3.memoizedState = n3, Zs = true), a3 = a3.queue, is(Io.bind(null, r3, a3, e3), [e3]), a3.getSnapshot !== t3 || s3 || ao2 !== null && ao2.memoizedState.tag & 1) {
      if (r3.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r3, a3, n3, t3), null), Fl === null) throw Error(i2(349));
      o3 || ro2 & 127 || Po(r3, t3, n3);
    }
    return n3;
  }
  function Po(e3, t3, n3) {
    e3.flags |= 16384, e3 = { getSnapshot: t3, value: n3 }, t3 = Y2.updateQueue, t3 === null ? (t3 = To2(), Y2.updateQueue = t3, t3.stores = [e3]) : (n3 = t3.stores, n3 === null ? t3.stores = [e3] : n3.push(e3));
  }
  function Fo(e3, t3, n3, r3) {
    t3.value = n3, t3.getSnapshot = r3, Lo(t3) && Ro(e3);
  }
  function Io(e3, t3, n3) {
    return n3(function() {
      Lo(t3) && Ro(e3);
    });
  }
  function Lo(e3) {
    var t3 = e3.getSnapshot;
    e3 = e3.value;
    try {
      var n3 = t3();
      return !hr2(e3, n3);
    } catch {
      return true;
    }
  }
  function Ro(e3) {
    var t3 = Xr2(e3, 2);
    t3 !== null && pu(t3, e3, 2);
  }
  function zo(e3) {
    var t3 = Co2();
    if (typeof e3 == `function`) {
      var n3 = e3;
      if (e3 = n3(), co2) {
        Ne2(true);
        try {
          n3();
        } finally {
          Ne2(false);
        }
      }
    }
    return t3.memoizedState = t3.baseState = e3, t3.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ko2, lastRenderedState: e3 }, t3;
  }
  function Bo(e3, t3, n3, r3) {
    return e3.baseState = n3, jo2(e3, io2, typeof r3 == `function` ? r3 : ko2);
  }
  function Vo(e3, t3, n3, r3, a3) {
    if (ks(e3)) throw Error(i2(485));
    if (e3 = t3.action, e3 !== null) {
      var o3 = { payload: a3, action: e3, next: null, isTransition: true, status: `pending`, value: null, reason: null, listeners: [], then: function(e4) {
        o3.listeners.push(e4);
      } };
      P2.T === null ? o3.isTransition = false : n3(true), r3(o3), n3 = t3.pending, n3 === null ? (o3.next = t3.pending = o3, Ho(t3, o3)) : (o3.next = n3.next, t3.pending = n3.next = o3);
    }
  }
  function Ho(e3, t3) {
    var n3 = t3.action, r3 = t3.payload, i3 = e3.state;
    if (t3.isTransition) {
      var a3 = P2.T, o3 = {};
      P2.T = o3;
      try {
        var s3 = n3(i3, r3), c3 = P2.S;
        c3 !== null && c3(o3, s3), Uo(e3, t3, s3);
      } catch (n4) {
        Go(e3, t3, n4);
      } finally {
        a3 !== null && o3.types !== null && (a3.types = o3.types), P2.T = a3;
      }
    } else try {
      a3 = n3(i3, r3), Uo(e3, t3, a3);
    } catch (n4) {
      Go(e3, t3, n4);
    }
  }
  function Uo(e3, t3, n3) {
    typeof n3 == `object` && n3 && typeof n3.then == `function` ? n3.then(function(n4) {
      Wo(e3, t3, n4);
    }, function(n4) {
      return Go(e3, t3, n4);
    }) : Wo(e3, t3, n3);
  }
  function Wo(e3, t3, n3) {
    t3.status = `fulfilled`, t3.value = n3, Ko(t3), e3.state = n3, t3 = e3.pending, t3 !== null && (n3 = t3.next, n3 === t3 ? e3.pending = null : (n3 = n3.next, t3.next = n3, Ho(e3, n3)));
  }
  function Go(e3, t3, n3) {
    var r3 = e3.pending;
    if (e3.pending = null, r3 !== null) {
      r3 = r3.next;
      do
        t3.status = `rejected`, t3.reason = n3, Ko(t3), t3 = t3.next;
      while (t3 !== r3);
    }
    e3.action = null;
  }
  function Ko(e3) {
    e3 = e3.listeners;
    for (var t3 = 0; t3 < e3.length; t3++) (0, e3[t3])();
  }
  function qo(e3, t3) {
    return t3;
  }
  function Jo(e3, t3) {
    if (q2) {
      var n3 = Fl.formState;
      if (n3 !== null) {
        a: {
          var r3 = Y2;
          if (q2) {
            if (K2) {
              b: {
                for (var i3 = K2, a3 = Oi2; i3.nodeType !== 8; ) {
                  if (!a3) {
                    i3 = null;
                    break b;
                  }
                  if (i3 = cf(i3.nextSibling), i3 === null) {
                    i3 = null;
                    break b;
                  }
                }
                a3 = i3.data, i3 = a3 === `F!` || a3 === `F` ? i3 : null;
              }
              if (i3) {
                K2 = cf(i3.nextSibling), r3 = i3.data === `F!`;
                break a;
              }
            }
            Ai2(r3);
          }
          r3 = false;
        }
        r3 && (t3 = n3[0]);
      }
    }
    return n3 = Co2(), n3.memoizedState = n3.baseState = t3, r3 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: qo, lastRenderedState: t3 }, n3.queue = r3, n3 = Es.bind(null, Y2, r3), r3.dispatch = n3, r3 = zo(false), a3 = Os.bind(null, Y2, false, r3.queue), r3 = Co2(), i3 = { state: t3, dispatch: null, action: e3, pending: null }, r3.queue = i3, n3 = Vo.bind(null, Y2, i3, a3, n3), i3.dispatch = n3, r3.memoizedState = e3, [t3, n3, false];
  }
  function Yo(e3) {
    return Xo(wo2(), io2, e3);
  }
  function Xo(e3, t3, n3) {
    if (t3 = jo2(e3, t3, qo)[0], e3 = Ao2(ko2)[0], typeof t3 == `object` && t3 && typeof t3.then == `function`) try {
      var r3 = Eo2(t3);
    } catch (e4) {
      throw e4 === ma2 ? ga2 : e4;
    }
    else r3 = t3;
    t3 = wo2();
    var i3 = t3.queue, a3 = i3.dispatch;
    return n3 !== t3.memoizedState && (Y2.flags |= 2048, $o(9, { destroy: void 0 }, Zo.bind(null, i3, n3), null)), [r3, a3, e3];
  }
  function Zo(e3, t3) {
    e3.action = t3;
  }
  function Qo(e3) {
    var t3 = wo2(), n3 = io2;
    if (n3 !== null) return Xo(t3, n3, e3);
    wo2(), t3 = t3.memoizedState, n3 = wo2();
    var r3 = n3.queue.dispatch;
    return n3.memoizedState = e3, [t3, r3, false];
  }
  function $o(e3, t3, n3, r3) {
    return e3 = { tag: e3, create: n3, deps: r3, inst: t3, next: null }, t3 = Y2.updateQueue, t3 === null && (t3 = To2(), Y2.updateQueue = t3), n3 = t3.lastEffect, n3 === null ? t3.lastEffect = e3.next = e3 : (r3 = n3.next, n3.next = e3, e3.next = r3, t3.lastEffect = e3), e3;
  }
  function es() {
    return wo2().memoizedState;
  }
  function ts(e3, t3, n3, r3) {
    var i3 = Co2();
    Y2.flags |= e3, i3.memoizedState = $o(1 | t3, { destroy: void 0 }, n3, r3 === void 0 ? null : r3);
  }
  function ns(e3, t3, n3, r3) {
    var i3 = wo2();
    r3 = r3 === void 0 ? null : r3;
    var a3 = i3.memoizedState.inst;
    io2 !== null && r3 !== null && ho2(r3, io2.memoizedState.deps) ? i3.memoizedState = $o(t3, a3, n3, r3) : (Y2.flags |= e3, i3.memoizedState = $o(1 | t3, a3, n3, r3));
  }
  function rs(e3, t3) {
    ts(8390656, 8, e3, t3);
  }
  function is(e3, t3) {
    ns(2048, 8, e3, t3);
  }
  function as(e3) {
    Y2.flags |= 4;
    var t3 = Y2.updateQueue;
    if (t3 === null) t3 = To2(), Y2.updateQueue = t3, t3.events = [e3];
    else {
      var n3 = t3.events;
      n3 === null ? t3.events = [e3] : n3.push(e3);
    }
  }
  function os(e3) {
    var t3 = wo2().memoizedState;
    return as({ ref: t3, nextImpl: e3 }), function() {
      if (X & 2) throw Error(i2(440));
      return t3.impl.apply(void 0, arguments);
    };
  }
  function ss(e3, t3) {
    return ns(4, 2, e3, t3);
  }
  function cs(e3, t3) {
    return ns(4, 4, e3, t3);
  }
  function ls(e3, t3) {
    if (typeof t3 == `function`) {
      e3 = e3();
      var n3 = t3(e3);
      return function() {
        typeof n3 == `function` ? n3() : t3(null);
      };
    }
    if (t3 != null) return e3 = e3(), t3.current = e3, function() {
      t3.current = null;
    };
  }
  function us(e3, t3, n3) {
    n3 = n3 == null ? null : n3.concat([e3]), ns(4, 4, ls.bind(null, t3, e3), n3);
  }
  function ds() {
  }
  function fs(e3, t3) {
    var n3 = wo2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = n3.memoizedState;
    return t3 !== null && ho2(t3, r3[1]) ? r3[0] : (n3.memoizedState = [e3, t3], e3);
  }
  function ps(e3, t3) {
    var n3 = wo2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = n3.memoizedState;
    if (t3 !== null && ho2(t3, r3[1])) return r3[0];
    if (r3 = e3(), co2) {
      Ne2(true);
      try {
        e3();
      } finally {
        Ne2(false);
      }
    }
    return n3.memoizedState = [r3, t3], r3;
  }
  function ms(e3, t3, n3) {
    return n3 === void 0 || ro2 & 1073741824 && !(Q & 261930) ? e3.memoizedState = t3 : (e3.memoizedState = n3, e3 = fu(), Y2.lanes |= e3, Ul |= e3, n3);
  }
  function hs(e3, t3, n3, r3) {
    return hr2(n3, t3) ? n3 : Ua2.current === null ? !(ro2 & 42) || ro2 & 1073741824 && !(Q & 261930) ? (Zs = true, e3.memoizedState = n3) : (e3 = fu(), Y2.lanes |= e3, Ul |= e3, t3) : (e3 = ms(e3, n3, r3), hr2(e3, t3) || (Zs = true), e3);
  }
  function gs(e3, t3, n3, r3, i3) {
    var a3 = F2.p;
    F2.p = a3 !== 0 && 8 > a3 ? a3 : 8;
    var o3 = P2.T, s3 = {};
    P2.T = s3, Os(e3, false, t3, n3);
    try {
      var c3 = i3(), l3 = P2.S;
      l3 !== null && l3(s3, c3), typeof c3 == `object` && c3 && typeof c3.then == `function` ? Ds(e3, t3, ca2(c3, r3), du(e3)) : Ds(e3, t3, r3, du(e3));
    } catch (n4) {
      Ds(e3, t3, { then: function() {
      }, status: `rejected`, reason: n4 }, du());
    } finally {
      F2.p = a3, o3 !== null && s3.types !== null && (o3.types = s3.types), P2.T = o3;
    }
  }
  function _s() {
  }
  function vs(e3, t3, n3, r3) {
    if (e3.tag !== 5) throw Error(i2(476));
    var a3 = ys(e3).queue;
    gs(e3, a3, t3, ne2, n3 === null ? _s : function() {
      return bs(e3), n3(r3);
    });
  }
  function ys(e3) {
    var t3 = e3.memoizedState;
    if (t3 !== null) return t3;
    t3 = { memoizedState: ne2, baseState: ne2, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ko2, lastRenderedState: ne2 }, next: null };
    var n3 = {};
    return t3.next = { memoizedState: n3, baseState: n3, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ko2, lastRenderedState: n3 }, next: null }, e3.memoizedState = t3, e3 = e3.alternate, e3 !== null && (e3.memoizedState = t3), t3;
  }
  function bs(e3) {
    var t3 = ys(e3);
    t3.next === null && (t3 = e3.alternate.memoizedState), Ds(e3, t3.next.queue, {}, du());
  }
  function xs() {
    return qi2(Qf);
  }
  function Ss() {
    return wo2().memoizedState;
  }
  function Cs() {
    return wo2().memoizedState;
  }
  function ws(e3) {
    for (var t3 = e3.return; t3 !== null; ) {
      switch (t3.tag) {
        case 24:
        case 3:
          var n3 = du();
          e3 = Fa2(n3);
          var r3 = J2(t3, e3, n3);
          r3 !== null && (pu(r3, t3, n3), Ia2(r3, t3, n3)), t3 = { cache: ea2() }, e3.payload = t3;
          return;
      }
      t3 = t3.return;
    }
  }
  function Ts(e3, t3, n3) {
    var r3 = du();
    n3 = { lane: r3, revertLane: 0, gesture: null, action: n3, hasEagerState: false, eagerState: null, next: null }, ks(e3) ? As(t3, n3) : (n3 = Yr2(e3, t3, n3, r3), n3 !== null && (pu(n3, e3, r3), js(n3, t3, r3)));
  }
  function Es(e3, t3, n3) {
    Ds(e3, t3, n3, du());
  }
  function Ds(e3, t3, n3, r3) {
    var i3 = { lane: r3, revertLane: 0, gesture: null, action: n3, hasEagerState: false, eagerState: null, next: null };
    if (ks(e3)) As(t3, i3);
    else {
      var a3 = e3.alternate;
      if (e3.lanes === 0 && (a3 === null || a3.lanes === 0) && (a3 = t3.lastRenderedReducer, a3 !== null)) try {
        var o3 = t3.lastRenderedState, s3 = a3(o3, n3);
        if (i3.hasEagerState = true, i3.eagerState = s3, hr2(s3, o3)) return Jr2(e3, t3, i3, 0), Fl === null && qr2(), false;
      } catch {
      }
      if (n3 = Yr2(e3, t3, i3, r3), n3 !== null) return pu(n3, e3, r3), js(n3, t3, r3), true;
    }
    return false;
  }
  function Os(e3, t3, n3, r3) {
    if (r3 = { lane: 2, revertLane: ud(), gesture: null, action: r3, hasEagerState: false, eagerState: null, next: null }, ks(e3)) {
      if (t3) throw Error(i2(479));
    } else t3 = Yr2(e3, n3, r3, 2), t3 !== null && pu(t3, e3, 2);
  }
  function ks(e3) {
    var t3 = e3.alternate;
    return e3 === Y2 || t3 !== null && t3 === Y2;
  }
  function As(e3, t3) {
    so2 = oo2 = true;
    var n3 = e3.pending;
    n3 === null ? t3.next = t3 : (t3.next = n3.next, n3.next = t3), e3.pending = t3;
  }
  function js(e3, t3, n3) {
    if (n3 & 4194048) {
      var r3 = t3.lanes;
      r3 &= e3.pendingLanes, n3 |= r3, t3.lanes = n3, Ye2(e3, n3);
    }
  }
  var Ms = { readContext: qi2, use: Do2, useCallback: mo2, useContext: mo2, useEffect: mo2, useImperativeHandle: mo2, useLayoutEffect: mo2, useInsertionEffect: mo2, useMemo: mo2, useReducer: mo2, useRef: mo2, useState: mo2, useDebugValue: mo2, useDeferredValue: mo2, useTransition: mo2, useSyncExternalStore: mo2, useId: mo2, useHostTransitionStatus: mo2, useFormState: mo2, useActionState: mo2, useOptimistic: mo2, useMemoCache: mo2, useCacheRefresh: mo2 };
  Ms.useEffectEvent = mo2;
  var Ns = { readContext: qi2, use: Do2, useCallback: function(e3, t3) {
    return Co2().memoizedState = [e3, t3 === void 0 ? null : t3], e3;
  }, useContext: qi2, useEffect: rs, useImperativeHandle: function(e3, t3, n3) {
    n3 = n3 == null ? null : n3.concat([e3]), ts(4194308, 4, ls.bind(null, t3, e3), n3);
  }, useLayoutEffect: function(e3, t3) {
    return ts(4194308, 4, e3, t3);
  }, useInsertionEffect: function(e3, t3) {
    ts(4, 2, e3, t3);
  }, useMemo: function(e3, t3) {
    var n3 = Co2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = e3();
    if (co2) {
      Ne2(true);
      try {
        e3();
      } finally {
        Ne2(false);
      }
    }
    return n3.memoizedState = [r3, t3], r3;
  }, useReducer: function(e3, t3, n3) {
    var r3 = Co2();
    if (n3 !== void 0) {
      var i3 = n3(t3);
      if (co2) {
        Ne2(true);
        try {
          n3(t3);
        } finally {
          Ne2(false);
        }
      }
    } else i3 = t3;
    return r3.memoizedState = r3.baseState = i3, e3 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e3, lastRenderedState: i3 }, r3.queue = e3, e3 = e3.dispatch = Ts.bind(null, Y2, e3), [r3.memoizedState, e3];
  }, useRef: function(e3) {
    var t3 = Co2();
    return e3 = { current: e3 }, t3.memoizedState = e3;
  }, useState: function(e3) {
    e3 = zo(e3);
    var t3 = e3.queue, n3 = Es.bind(null, Y2, t3);
    return t3.dispatch = n3, [e3.memoizedState, n3];
  }, useDebugValue: ds, useDeferredValue: function(e3, t3) {
    return ms(Co2(), e3, t3);
  }, useTransition: function() {
    var e3 = zo(false);
    return e3 = gs.bind(null, Y2, e3.queue, true, false), Co2().memoizedState = e3, [false, e3];
  }, useSyncExternalStore: function(e3, t3, n3) {
    var r3 = Y2, a3 = Co2();
    if (q2) {
      if (n3 === void 0) throw Error(i2(407));
      n3 = n3();
    } else {
      if (n3 = t3(), Fl === null) throw Error(i2(349));
      Q & 127 || Po(r3, t3, n3);
    }
    a3.memoizedState = n3;
    var o3 = { value: n3, getSnapshot: t3 };
    return a3.queue = o3, rs(Io.bind(null, r3, o3, e3), [e3]), r3.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r3, o3, n3, t3), null), n3;
  }, useId: function() {
    var e3 = Co2(), t3 = Fl.identifierPrefix;
    if (q2) {
      var n3 = bi2, r3 = yi2;
      n3 = (r3 & ~(1 << 32 - Pe2(r3) - 1)).toString(32) + n3, t3 = `_` + t3 + `R_` + n3, n3 = lo2++, 0 < n3 && (t3 += `H` + n3.toString(32)), t3 += `_`;
    } else n3 = po2++, t3 = `_` + t3 + `r_` + n3.toString(32) + `_`;
    return e3.memoizedState = t3;
  }, useHostTransitionStatus: xs, useFormState: Jo, useActionState: Jo, useOptimistic: function(e3) {
    var t3 = Co2();
    t3.memoizedState = t3.baseState = e3;
    var n3 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t3.queue = n3, t3 = Os.bind(null, Y2, true, n3), n3.dispatch = t3, [e3, t3];
  }, useMemoCache: Oo2, useCacheRefresh: function() {
    return Co2().memoizedState = ws.bind(null, Y2);
  }, useEffectEvent: function(e3) {
    var t3 = Co2(), n3 = { impl: e3 };
    return t3.memoizedState = n3, function() {
      if (X & 2) throw Error(i2(440));
      return n3.impl.apply(void 0, arguments);
    };
  } }, Ps = { readContext: qi2, use: Do2, useCallback: fs, useContext: qi2, useEffect: is, useImperativeHandle: us, useInsertionEffect: ss, useLayoutEffect: cs, useMemo: ps, useReducer: Ao2, useRef: es, useState: function() {
    return Ao2(ko2);
  }, useDebugValue: ds, useDeferredValue: function(e3, t3) {
    return hs(wo2(), io2.memoizedState, e3, t3);
  }, useTransition: function() {
    var e3 = Ao2(ko2)[0], t3 = wo2().memoizedState;
    return [typeof e3 == `boolean` ? e3 : Eo2(e3), t3];
  }, useSyncExternalStore: No2, useId: Ss, useHostTransitionStatus: xs, useFormState: Yo, useActionState: Yo, useOptimistic: function(e3, t3) {
    return Bo(wo2(), io2, e3, t3);
  }, useMemoCache: Oo2, useCacheRefresh: Cs };
  Ps.useEffectEvent = os;
  var Fs = { readContext: qi2, use: Do2, useCallback: fs, useContext: qi2, useEffect: is, useImperativeHandle: us, useInsertionEffect: ss, useLayoutEffect: cs, useMemo: ps, useReducer: Mo2, useRef: es, useState: function() {
    return Mo2(ko2);
  }, useDebugValue: ds, useDeferredValue: function(e3, t3) {
    var n3 = wo2();
    return io2 === null ? ms(n3, e3, t3) : hs(n3, io2.memoizedState, e3, t3);
  }, useTransition: function() {
    var e3 = Mo2(ko2)[0], t3 = wo2().memoizedState;
    return [typeof e3 == `boolean` ? e3 : Eo2(e3), t3];
  }, useSyncExternalStore: No2, useId: Ss, useHostTransitionStatus: xs, useFormState: Qo, useActionState: Qo, useOptimistic: function(e3, t3) {
    var n3 = wo2();
    return io2 === null ? (n3.baseState = e3, [e3, n3.queue.dispatch]) : Bo(n3, io2, e3, t3);
  }, useMemoCache: Oo2, useCacheRefresh: Cs };
  Fs.useEffectEvent = os;
  function Is(e3, t3, n3, r3) {
    t3 = e3.memoizedState, n3 = n3(r3, t3), n3 = n3 == null ? t3 : h2({}, t3, n3), e3.memoizedState = n3, e3.lanes === 0 && (e3.updateQueue.baseState = n3);
  }
  var Ls = { enqueueSetState: function(e3, t3, n3) {
    e3 = e3._reactInternals;
    var r3 = du(), i3 = Fa2(r3);
    i3.payload = t3, n3 != null && (i3.callback = n3), t3 = J2(e3, i3, r3), t3 !== null && (pu(t3, e3, r3), Ia2(t3, e3, r3));
  }, enqueueReplaceState: function(e3, t3, n3) {
    e3 = e3._reactInternals;
    var r3 = du(), i3 = Fa2(r3);
    i3.tag = 1, i3.payload = t3, n3 != null && (i3.callback = n3), t3 = J2(e3, i3, r3), t3 !== null && (pu(t3, e3, r3), Ia2(t3, e3, r3));
  }, enqueueForceUpdate: function(e3, t3) {
    e3 = e3._reactInternals;
    var n3 = du(), r3 = Fa2(n3);
    r3.tag = 2, t3 != null && (r3.callback = t3), t3 = J2(e3, r3, n3), t3 !== null && (pu(t3, e3, n3), Ia2(t3, e3, n3));
  } };
  function Rs(e3, t3, n3, r3, i3, a3, o3) {
    return e3 = e3.stateNode, typeof e3.shouldComponentUpdate == `function` ? e3.shouldComponentUpdate(r3, a3, o3) : t3.prototype && t3.prototype.isPureReactComponent ? !gr2(n3, r3) || !gr2(i3, a3) : true;
  }
  function zs(e3, t3, n3, r3) {
    e3 = t3.state, typeof t3.componentWillReceiveProps == `function` && t3.componentWillReceiveProps(n3, r3), typeof t3.UNSAFE_componentWillReceiveProps == `function` && t3.UNSAFE_componentWillReceiveProps(n3, r3), t3.state !== e3 && Ls.enqueueReplaceState(t3, t3.state, null);
  }
  function Bs(e3, t3) {
    var n3 = t3;
    if (`ref` in t3) for (var r3 in n3 = {}, t3) r3 !== `ref` && (n3[r3] = t3[r3]);
    if (e3 = e3.defaultProps) for (var i3 in n3 === t3 && (n3 = h2({}, n3)), e3) n3[i3] === void 0 && (n3[i3] = e3[i3]);
    return n3;
  }
  function Vs(e3) {
    Ur2(e3);
  }
  function Hs(e3) {
    console.error(e3);
  }
  function Us(e3) {
    Ur2(e3);
  }
  function Ws(e3, t3) {
    try {
      var n3 = e3.onUncaughtError;
      n3(t3.value, { componentStack: t3.stack });
    } catch (e4) {
      setTimeout(function() {
        throw e4;
      });
    }
  }
  function Gs(e3, t3, n3) {
    try {
      var r3 = e3.onCaughtError;
      r3(n3.value, { componentStack: n3.stack, errorBoundary: t3.tag === 1 ? t3.stateNode : null });
    } catch (e4) {
      setTimeout(function() {
        throw e4;
      });
    }
  }
  function Ks(e3, t3, n3) {
    return n3 = Fa2(n3), n3.tag = 3, n3.payload = { element: null }, n3.callback = function() {
      Ws(e3, t3);
    }, n3;
  }
  function qs(e3) {
    return e3 = Fa2(e3), e3.tag = 3, e3;
  }
  function Js(e3, t3, n3, r3) {
    var i3 = n3.type.getDerivedStateFromError;
    if (typeof i3 == `function`) {
      var a3 = r3.value;
      e3.payload = function() {
        return i3(a3);
      }, e3.callback = function() {
        Gs(t3, n3, r3);
      };
    }
    var o3 = n3.stateNode;
    o3 !== null && typeof o3.componentDidCatch == `function` && (e3.callback = function() {
      Gs(t3, n3, r3), typeof i3 != `function` && (tu === null ? tu = /* @__PURE__ */ new Set([this]) : tu.add(this));
      var e4 = r3.stack;
      this.componentDidCatch(r3.value, { componentStack: e4 === null ? `` : e4 });
    });
  }
  function Ys(e3, t3, n3, r3, a3) {
    if (n3.flags |= 32768, typeof r3 == `object` && r3 && typeof r3.then == `function`) {
      if (t3 = n3.alternate, t3 !== null && Wi2(t3, n3, a3, true), n3 = Ja2.current, n3 !== null) {
        switch (n3.tag) {
          case 31:
          case 13:
            return Ya2 === null ? Tu() : n3.alternate === null && Hl === 0 && (Hl = 3), n3.flags &= -257, n3.flags |= 65536, n3.lanes = a3, r3 === _a2 ? n3.flags |= 16384 : (t3 = n3.updateQueue, t3 === null ? n3.updateQueue = /* @__PURE__ */ new Set([r3]) : t3.add(r3), Wu(e3, r3, a3)), false;
          case 22:
            return n3.flags |= 65536, r3 === _a2 ? n3.flags |= 16384 : (t3 = n3.updateQueue, t3 === null ? (t3 = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([r3]) }, n3.updateQueue = t3) : (n3 = t3.retryQueue, n3 === null ? t3.retryQueue = /* @__PURE__ */ new Set([r3]) : n3.add(r3)), Wu(e3, r3, a3)), false;
        }
        throw Error(i2(435, n3.tag));
      }
      return Wu(e3, r3, a3), Tu(), false;
    }
    if (q2) return t3 = Ja2.current, t3 === null ? (r3 !== ki2 && (t3 = Error(i2(423), { cause: r3 }), Ii2(di2(t3, n3))), e3 = e3.current.alternate, e3.flags |= 65536, a3 &= -a3, e3.lanes |= a3, r3 = di2(r3, n3), a3 = Ks(e3.stateNode, r3, a3), La2(e3, a3), Hl !== 4 && (Hl = 2)) : (!(t3.flags & 65536) && (t3.flags |= 256), t3.flags |= 65536, t3.lanes = a3, r3 !== ki2 && (e3 = Error(i2(422), { cause: r3 }), Ii2(di2(e3, n3)))), false;
    var o3 = Error(i2(520), { cause: r3 });
    if (o3 = di2(o3, n3), Jl === null ? Jl = [o3] : Jl.push(o3), Hl !== 4 && (Hl = 2), t3 === null) return true;
    r3 = di2(r3, n3), n3 = t3;
    do {
      switch (n3.tag) {
        case 3:
          return n3.flags |= 65536, e3 = a3 & -a3, n3.lanes |= e3, e3 = Ks(n3.stateNode, r3, e3), La2(n3, e3), false;
        case 1:
          if (t3 = n3.type, o3 = n3.stateNode, !(n3.flags & 128) && (typeof t3.getDerivedStateFromError == `function` || o3 !== null && typeof o3.componentDidCatch == `function` && (tu === null || !tu.has(o3)))) return n3.flags |= 65536, a3 &= -a3, n3.lanes |= a3, a3 = qs(a3), Js(a3, e3, n3, r3), La2(n3, a3), false;
      }
      n3 = n3.return;
    } while (n3 !== null);
    return false;
  }
  var Xs = Error(i2(461)), Zs = false;
  function Qs(e3, t3, n3, r3) {
    t3.child = e3 === null ? ja2(t3, null, n3, r3) : Aa2(t3, e3.child, n3, r3);
  }
  function $s(e3, t3, n3, r3, i3) {
    n3 = n3.render;
    var a3 = t3.ref;
    if (`ref` in r3) {
      var o3 = {};
      for (var s3 in r3) s3 !== `ref` && (o3[s3] = r3[s3]);
    } else o3 = r3;
    return Ki2(t3), r3 = go2(e3, t3, n3, o3, a3, i3), s3 = bo2(), e3 !== null && !Zs ? (xo2(e3, t3, i3), Cc(e3, t3, i3)) : (q2 && s3 && Ci2(t3), t3.flags |= 1, Qs(e3, t3, r3, i3), t3.child);
  }
  function ec(e3, t3, n3, r3, i3) {
    if (e3 === null) {
      var a3 = n3.type;
      return typeof a3 == `function` && !ni2(a3) && a3.defaultProps === void 0 && n3.compare === null ? (t3.tag = 15, t3.type = a3, tc(e3, t3, a3, r3, i3)) : (e3 = ai2(n3.type, null, r3, t3, t3.mode, i3), e3.ref = t3.ref, e3.return = t3, t3.child = e3);
    }
    if (a3 = e3.child, !wc(e3, i3)) {
      var o3 = a3.memoizedProps;
      if (n3 = n3.compare, n3 = n3 === null ? gr2 : n3, n3(o3, r3) && e3.ref === t3.ref) return Cc(e3, t3, i3);
    }
    return t3.flags |= 1, e3 = ri2(a3, r3), e3.ref = t3.ref, e3.return = t3, t3.child = e3;
  }
  function tc(e3, t3, n3, r3, i3) {
    if (e3 !== null) {
      var a3 = e3.memoizedProps;
      if (gr2(a3, r3) && e3.ref === t3.ref) {
        if (Zs = false, t3.pendingProps = r3 = a3, wc(e3, i3)) e3.flags & 131072 && (Zs = true);
        else return t3.lanes = e3.lanes, Cc(e3, t3, i3);
      }
    }
    return lc(e3, t3, n3, r3, i3);
  }
  function nc(e3, t3, n3, r3) {
    var i3 = r3.children, a3 = e3 === null ? null : e3.memoizedState;
    if (e3 === null && t3.stateNode === null && (t3.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), r3.mode === `hidden`) {
      if (t3.flags & 128) {
        if (a3 = a3 === null ? n3 : a3.baseLanes | n3, e3 !== null) {
          for (r3 = t3.child = e3.child, i3 = 0; r3 !== null; ) i3 = i3 | r3.lanes | r3.childLanes, r3 = r3.sibling;
          r3 = i3 & ~a3;
        } else r3 = 0, t3.child = null;
        return ic(e3, t3, a3, n3, r3);
      }
      if (n3 & 536870912) t3.memoizedState = { baseLanes: 0, cachePool: null }, e3 !== null && fa2(t3, a3 === null ? null : a3.cachePool), a3 === null ? Ka2() : Ga2(t3, a3), Qa2(t3);
      else return r3 = t3.lanes = 536870912, ic(e3, t3, a3 === null ? n3 : a3.baseLanes | n3, n3, r3);
    } else a3 === null ? (e3 !== null && fa2(t3, null), Ka2(), $a2(t3)) : (fa2(t3, a3.cachePool), Ga2(t3, a3), $a2(t3), t3.memoizedState = null);
    return Qs(e3, t3, i3, n3), t3.child;
  }
  function rc(e3, t3) {
    return e3 !== null && e3.tag === 22 || t3.stateNode !== null || (t3.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t3.sibling;
  }
  function ic(e3, t3, n3, r3, i3) {
    var a3 = da2();
    return a3 = a3 === null ? null : { parent: $i2._currentValue, pool: a3 }, t3.memoizedState = { baseLanes: n3, cachePool: a3 }, e3 !== null && fa2(t3, null), Ka2(), Qa2(t3), e3 !== null && Wi2(e3, t3, r3, true), t3.childLanes = i3, null;
  }
  function ac(e3, t3) {
    return t3 = vc({ mode: t3.mode, children: t3.children }, e3.mode), t3.ref = e3.ref, e3.child = t3, t3.return = e3, t3;
  }
  function oc(e3, t3, n3) {
    return Aa2(t3, e3.child, null, n3), e3 = ac(t3, t3.pendingProps), e3.flags |= 2, eo2(t3), t3.memoizedState = null, e3;
  }
  function sc(e3, t3, n3) {
    var r3 = t3.pendingProps, a3 = !!(t3.flags & 128);
    if (t3.flags &= -129, e3 === null) {
      if (q2) {
        if (r3.mode === `hidden`) return e3 = ac(t3, r3), t3.lanes = 536870912, rc(null, e3);
        if (Za2(t3), (e3 = K2) ? (e3 = rf(e3, Oi2), e3 = e3 !== null && e3.data === `&` ? e3 : null, e3 !== null && (t3.memoizedState = { dehydrated: e3, treeContext: vi2 === null ? null : { id: yi2, overflow: bi2 }, retryLane: 536870912, hydrationErrors: null }, n3 = ci2(e3), n3.return = t3, t3.child = n3, Ei2 = t3, K2 = null)) : e3 = null, e3 === null) throw Ai2(t3);
        return t3.lanes = 536870912, null;
      }
      return ac(t3, r3);
    }
    var o3 = e3.memoizedState;
    if (o3 !== null) {
      var s3 = o3.dehydrated;
      if (Za2(t3), a3) {
        if (t3.flags & 256) t3.flags &= -257, t3 = oc(e3, t3, n3);
        else if (t3.memoizedState !== null) t3.child = e3.child, t3.flags |= 128, t3 = null;
        else throw Error(i2(558));
      } else if (Zs || Wi2(e3, t3, n3, false), a3 = (n3 & e3.childLanes) !== 0, Zs || a3) {
        if (r3 = Fl, r3 !== null && (s3 = Xe2(r3, n3), s3 !== 0 && s3 !== o3.retryLane)) throw o3.retryLane = s3, Xr2(e3, s3), pu(r3, e3, s3), Xs;
        Tu(), t3 = oc(e3, t3, n3);
      } else e3 = o3.treeContext, K2 = cf(s3.nextSibling), Ei2 = t3, q2 = true, Di2 = null, Oi2 = false, e3 !== null && Ti2(t3, e3), t3 = ac(t3, r3), t3.flags |= 4096;
      return t3;
    }
    return e3 = ri2(e3.child, { mode: r3.mode, children: r3.children }), e3.ref = t3.ref, t3.child = e3, e3.return = t3, e3;
  }
  function cc(e3, t3) {
    var n3 = t3.ref;
    if (n3 === null) e3 !== null && e3.ref !== null && (t3.flags |= 4194816);
    else {
      if (typeof n3 != `function` && typeof n3 != `object`) throw Error(i2(284));
      (e3 === null || e3.ref !== n3) && (t3.flags |= 4194816);
    }
  }
  function lc(e3, t3, n3, r3, i3) {
    return Ki2(t3), n3 = go2(e3, t3, n3, r3, void 0, i3), r3 = bo2(), e3 !== null && !Zs ? (xo2(e3, t3, i3), Cc(e3, t3, i3)) : (q2 && r3 && Ci2(t3), t3.flags |= 1, Qs(e3, t3, n3, i3), t3.child);
  }
  function uc(e3, t3, n3, r3, i3, a3) {
    return Ki2(t3), t3.updateQueue = null, n3 = vo2(t3, r3, n3, i3), _o2(e3), r3 = bo2(), e3 !== null && !Zs ? (xo2(e3, t3, a3), Cc(e3, t3, a3)) : (q2 && r3 && Ci2(t3), t3.flags |= 1, Qs(e3, t3, n3, a3), t3.child);
  }
  function dc(e3, t3, n3, r3, i3) {
    if (Ki2(t3), t3.stateNode === null) {
      var a3 = $r2, o3 = n3.contextType;
      typeof o3 == `object` && o3 && (a3 = qi2(o3)), a3 = new n3(r3, a3), t3.memoizedState = a3.state !== null && a3.state !== void 0 ? a3.state : null, a3.updater = Ls, t3.stateNode = a3, a3._reactInternals = t3, a3 = t3.stateNode, a3.props = r3, a3.state = t3.memoizedState, a3.refs = {}, Na2(t3), o3 = n3.contextType, a3.context = typeof o3 == `object` && o3 ? qi2(o3) : $r2, a3.state = t3.memoizedState, o3 = n3.getDerivedStateFromProps, typeof o3 == `function` && (Is(t3, n3, o3, r3), a3.state = t3.memoizedState), typeof n3.getDerivedStateFromProps == `function` || typeof a3.getSnapshotBeforeUpdate == `function` || typeof a3.UNSAFE_componentWillMount != `function` && typeof a3.componentWillMount != `function` || (o3 = a3.state, typeof a3.componentWillMount == `function` && a3.componentWillMount(), typeof a3.UNSAFE_componentWillMount == `function` && a3.UNSAFE_componentWillMount(), o3 !== a3.state && Ls.enqueueReplaceState(a3, a3.state, null), Ba2(t3, r3, a3, i3), za2(), a3.state = t3.memoizedState), typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), r3 = true;
    } else if (e3 === null) {
      a3 = t3.stateNode;
      var s3 = t3.memoizedProps, c3 = Bs(n3, s3);
      a3.props = c3;
      var l3 = a3.context, u2 = n3.contextType;
      o3 = $r2, typeof u2 == `object` && u2 && (o3 = qi2(u2));
      var d3 = n3.getDerivedStateFromProps;
      u2 = typeof d3 == `function` || typeof a3.getSnapshotBeforeUpdate == `function`, s3 = t3.pendingProps !== s3, u2 || typeof a3.UNSAFE_componentWillReceiveProps != `function` && typeof a3.componentWillReceiveProps != `function` || (s3 || l3 !== o3) && zs(t3, a3, r3, o3), Ma2 = false;
      var f2 = t3.memoizedState;
      a3.state = f2, Ba2(t3, r3, a3, i3), za2(), l3 = t3.memoizedState, s3 || f2 !== l3 || Ma2 ? (typeof d3 == `function` && (Is(t3, n3, d3, r3), l3 = t3.memoizedState), (c3 = Ma2 || Rs(t3, n3, c3, r3, f2, l3, o3)) ? (u2 || typeof a3.UNSAFE_componentWillMount != `function` && typeof a3.componentWillMount != `function` || (typeof a3.componentWillMount == `function` && a3.componentWillMount(), typeof a3.UNSAFE_componentWillMount == `function` && a3.UNSAFE_componentWillMount()), typeof a3.componentDidMount == `function` && (t3.flags |= 4194308)) : (typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), t3.memoizedProps = r3, t3.memoizedState = l3), a3.props = r3, a3.state = l3, a3.context = o3, r3 = c3) : (typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), r3 = false);
    } else {
      a3 = t3.stateNode, Pa2(e3, t3), o3 = t3.memoizedProps, u2 = Bs(n3, o3), a3.props = u2, d3 = t3.pendingProps, f2 = a3.context, l3 = n3.contextType, c3 = $r2, typeof l3 == `object` && l3 && (c3 = qi2(l3)), s3 = n3.getDerivedStateFromProps, (l3 = typeof s3 == `function` || typeof a3.getSnapshotBeforeUpdate == `function`) || typeof a3.UNSAFE_componentWillReceiveProps != `function` && typeof a3.componentWillReceiveProps != `function` || (o3 !== d3 || f2 !== c3) && zs(t3, a3, r3, c3), Ma2 = false, f2 = t3.memoizedState, a3.state = f2, Ba2(t3, r3, a3, i3), za2();
      var p3 = t3.memoizedState;
      o3 !== d3 || f2 !== p3 || Ma2 || e3 !== null && e3.dependencies !== null && Gi2(e3.dependencies) ? (typeof s3 == `function` && (Is(t3, n3, s3, r3), p3 = t3.memoizedState), (u2 = Ma2 || Rs(t3, n3, u2, r3, f2, p3, c3) || e3 !== null && e3.dependencies !== null && Gi2(e3.dependencies)) ? (l3 || typeof a3.UNSAFE_componentWillUpdate != `function` && typeof a3.componentWillUpdate != `function` || (typeof a3.componentWillUpdate == `function` && a3.componentWillUpdate(r3, p3, c3), typeof a3.UNSAFE_componentWillUpdate == `function` && a3.UNSAFE_componentWillUpdate(r3, p3, c3)), typeof a3.componentDidUpdate == `function` && (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate == `function` && (t3.flags |= 1024)) : (typeof a3.componentDidUpdate != `function` || o3 === e3.memoizedProps && f2 === e3.memoizedState || (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate != `function` || o3 === e3.memoizedProps && f2 === e3.memoizedState || (t3.flags |= 1024), t3.memoizedProps = r3, t3.memoizedState = p3), a3.props = r3, a3.state = p3, a3.context = c3, r3 = u2) : (typeof a3.componentDidUpdate != `function` || o3 === e3.memoizedProps && f2 === e3.memoizedState || (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate != `function` || o3 === e3.memoizedProps && f2 === e3.memoizedState || (t3.flags |= 1024), r3 = false);
    }
    return a3 = r3, cc(e3, t3), r3 = !!(t3.flags & 128), a3 || r3 ? (a3 = t3.stateNode, n3 = r3 && typeof n3.getDerivedStateFromError != `function` ? null : a3.render(), t3.flags |= 1, e3 !== null && r3 ? (t3.child = Aa2(t3, e3.child, null, i3), t3.child = Aa2(t3, null, n3, i3)) : Qs(e3, t3, n3, i3), t3.memoizedState = a3.state, e3 = t3.child) : e3 = Cc(e3, t3, i3), e3;
  }
  function fc(e3, t3, n3, r3) {
    return Pi2(), t3.flags |= 256, Qs(e3, t3, n3, r3), t3.child;
  }
  var pc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function mc(e3) {
    return { baseLanes: e3, cachePool: pa2() };
  }
  function hc(e3, t3, n3) {
    return e3 = e3 === null ? 0 : e3.childLanes & ~n3, t3 && (e3 |= Kl), e3;
  }
  function gc(e3, t3, n3) {
    var r3 = t3.pendingProps, a3 = false, o3 = !!(t3.flags & 128), s3;
    if ((s3 = o3) || (s3 = e3 !== null && e3.memoizedState === null ? false : !!(to2.current & 2)), s3 && (a3 = true, t3.flags &= -129), s3 = !!(t3.flags & 32), t3.flags &= -33, e3 === null) {
      if (q2) {
        if (a3 ? Xa2(t3) : $a2(t3), (e3 = K2) ? (e3 = rf(e3, Oi2), e3 = e3 !== null && e3.data !== `&` ? e3 : null, e3 !== null && (t3.memoizedState = { dehydrated: e3, treeContext: vi2 === null ? null : { id: yi2, overflow: bi2 }, retryLane: 536870912, hydrationErrors: null }, n3 = ci2(e3), n3.return = t3, t3.child = n3, Ei2 = t3, K2 = null)) : e3 = null, e3 === null) throw Ai2(t3);
        return of(e3) ? t3.lanes = 32 : t3.lanes = 536870912, null;
      }
      var c3 = r3.children;
      return r3 = r3.fallback, a3 ? ($a2(t3), a3 = t3.mode, c3 = vc({ mode: `hidden`, children: c3 }, a3), r3 = oi2(r3, a3, n3, null), c3.return = t3, r3.return = t3, c3.sibling = r3, t3.child = c3, r3 = t3.child, r3.memoizedState = mc(n3), r3.childLanes = hc(e3, s3, n3), t3.memoizedState = pc, rc(null, r3)) : (Xa2(t3), _c(t3, c3));
    }
    var l3 = e3.memoizedState;
    if (l3 !== null && (c3 = l3.dehydrated, c3 !== null)) {
      if (o3) t3.flags & 256 ? (Xa2(t3), t3.flags &= -257, t3 = yc(e3, t3, n3)) : t3.memoizedState === null ? ($a2(t3), c3 = r3.fallback, a3 = t3.mode, r3 = vc({ mode: `visible`, children: r3.children }, a3), c3 = oi2(c3, a3, n3, null), c3.flags |= 2, r3.return = t3, c3.return = t3, r3.sibling = c3, t3.child = r3, Aa2(t3, e3.child, null, n3), r3 = t3.child, r3.memoizedState = mc(n3), r3.childLanes = hc(e3, s3, n3), t3.memoizedState = pc, t3 = rc(null, r3)) : ($a2(t3), t3.child = e3.child, t3.flags |= 128, t3 = null);
      else if (Xa2(t3), of(c3)) {
        if (s3 = c3.nextSibling && c3.nextSibling.dataset, s3) var u2 = s3.dgst;
        s3 = u2, r3 = Error(i2(419)), r3.stack = ``, r3.digest = s3, Ii2({ value: r3, source: null, stack: null }), t3 = yc(e3, t3, n3);
      } else if (Zs || Wi2(e3, t3, n3, false), s3 = (n3 & e3.childLanes) !== 0, Zs || s3) {
        if (s3 = Fl, s3 !== null && (r3 = Xe2(s3, n3), r3 !== 0 && r3 !== l3.retryLane)) throw l3.retryLane = r3, Xr2(e3, r3), pu(s3, e3, r3), Xs;
        af(c3) || Tu(), t3 = yc(e3, t3, n3);
      } else af(c3) ? (t3.flags |= 192, t3.child = e3.child, t3 = null) : (e3 = l3.treeContext, K2 = cf(c3.nextSibling), Ei2 = t3, q2 = true, Di2 = null, Oi2 = false, e3 !== null && Ti2(t3, e3), t3 = _c(t3, r3.children), t3.flags |= 4096);
      return t3;
    }
    return a3 ? ($a2(t3), c3 = r3.fallback, a3 = t3.mode, l3 = e3.child, u2 = l3.sibling, r3 = ri2(l3, { mode: `hidden`, children: r3.children }), r3.subtreeFlags = l3.subtreeFlags & 65011712, u2 === null ? (c3 = oi2(c3, a3, n3, null), c3.flags |= 2) : c3 = ri2(u2, c3), c3.return = t3, r3.return = t3, r3.sibling = c3, t3.child = r3, rc(null, r3), r3 = t3.child, c3 = e3.child.memoizedState, c3 === null ? c3 = mc(n3) : (a3 = c3.cachePool, a3 === null ? a3 = pa2() : (l3 = $i2._currentValue, a3 = a3.parent === l3 ? a3 : { parent: l3, pool: l3 }), c3 = { baseLanes: c3.baseLanes | n3, cachePool: a3 }), r3.memoizedState = c3, r3.childLanes = hc(e3, s3, n3), t3.memoizedState = pc, rc(e3.child, r3)) : (Xa2(t3), n3 = e3.child, e3 = n3.sibling, n3 = ri2(n3, { mode: `visible`, children: r3.children }), n3.return = t3, n3.sibling = null, e3 !== null && (s3 = t3.deletions, s3 === null ? (t3.deletions = [e3], t3.flags |= 16) : s3.push(e3)), t3.child = n3, t3.memoizedState = null, n3);
  }
  function _c(e3, t3) {
    return t3 = vc({ mode: `visible`, children: t3 }, e3.mode), t3.return = e3, e3.child = t3;
  }
  function vc(e3, t3) {
    return e3 = ti2(22, e3, null, t3), e3.lanes = 0, e3;
  }
  function yc(e3, t3, n3) {
    return Aa2(t3, e3.child, null, n3), e3 = _c(t3, t3.pendingProps.children), e3.flags |= 2, t3.memoizedState = null, e3;
  }
  function bc(e3, t3, n3) {
    e3.lanes |= t3;
    var r3 = e3.alternate;
    r3 !== null && (r3.lanes |= t3), Hi2(e3.return, t3, n3);
  }
  function xc(e3, t3, n3, r3, i3, a3) {
    var o3 = e3.memoizedState;
    o3 === null ? e3.memoizedState = { isBackwards: t3, rendering: null, renderingStartTime: 0, last: r3, tail: n3, tailMode: i3, treeForkCount: a3 } : (o3.isBackwards = t3, o3.rendering = null, o3.renderingStartTime = 0, o3.last = r3, o3.tail = n3, o3.tailMode = i3, o3.treeForkCount = a3);
  }
  function Sc(e3, t3, n3) {
    var r3 = t3.pendingProps, i3 = r3.revealOrder, a3 = r3.tail;
    r3 = r3.children;
    var o3 = to2.current, s3 = !!(o3 & 2);
    if (s3 ? (o3 = o3 & 1 | 2, t3.flags |= 128) : o3 &= 1, ae2(to2, o3), Qs(e3, t3, r3, n3), r3 = q2 ? hi2 : 0, !s3 && e3 !== null && e3.flags & 128) a: for (e3 = t3.child; e3 !== null; ) {
      if (e3.tag === 13) e3.memoizedState !== null && bc(e3, n3, t3);
      else if (e3.tag === 19) bc(e3, n3, t3);
      else if (e3.child !== null) {
        e3.child.return = e3, e3 = e3.child;
        continue;
      }
      if (e3 === t3) break a;
      for (; e3.sibling === null; ) {
        if (e3.return === null || e3.return === t3) break a;
        e3 = e3.return;
      }
      e3.sibling.return = e3.return, e3 = e3.sibling;
    }
    switch (i3) {
      case `forwards`:
        for (n3 = t3.child, i3 = null; n3 !== null; ) e3 = n3.alternate, e3 !== null && no2(e3) === null && (i3 = n3), n3 = n3.sibling;
        n3 = i3, n3 === null ? (i3 = t3.child, t3.child = null) : (i3 = n3.sibling, n3.sibling = null), xc(t3, false, i3, n3, a3, r3);
        break;
      case `backwards`:
      case `unstable_legacy-backwards`:
        for (n3 = null, i3 = t3.child, t3.child = null; i3 !== null; ) {
          if (e3 = i3.alternate, e3 !== null && no2(e3) === null) {
            t3.child = i3;
            break;
          }
          e3 = i3.sibling, i3.sibling = n3, n3 = i3, i3 = e3;
        }
        xc(t3, true, n3, null, a3, r3);
        break;
      case `together`:
        xc(t3, false, null, null, void 0, r3);
        break;
      default:
        t3.memoizedState = null;
    }
    return t3.child;
  }
  function Cc(e3, t3, n3) {
    if (e3 !== null && (t3.dependencies = e3.dependencies), Ul |= t3.lanes, (n3 & t3.childLanes) === 0) {
      if (e3 !== null) {
        if (Wi2(e3, t3, n3, false), (n3 & t3.childLanes) === 0) return null;
      } else return null;
    }
    if (e3 !== null && t3.child !== e3.child) throw Error(i2(153));
    if (t3.child !== null) {
      for (e3 = t3.child, n3 = ri2(e3, e3.pendingProps), t3.child = n3, n3.return = t3; e3.sibling !== null; ) e3 = e3.sibling, n3 = n3.sibling = ri2(e3, e3.pendingProps), n3.return = t3;
      n3.sibling = null;
    }
    return t3.child;
  }
  function wc(e3, t3) {
    return (e3.lanes & t3) !== 0 || (e3 = e3.dependencies, !!(e3 !== null && Gi2(e3)));
  }
  function Tc(e3, t3, n3) {
    switch (t3.tag) {
      case 3:
        ue2(t3, t3.stateNode.containerInfo), Bi2(t3, $i2, e3.memoizedState.cache), Pi2();
        break;
      case 27:
      case 5:
        R2(t3);
        break;
      case 4:
        ue2(t3, t3.stateNode.containerInfo);
        break;
      case 10:
        Bi2(t3, t3.type, t3.memoizedProps.value);
        break;
      case 31:
        if (t3.memoizedState !== null) return t3.flags |= 128, Za2(t3), null;
        break;
      case 13:
        var r3 = t3.memoizedState;
        if (r3 !== null) return r3.dehydrated === null ? (n3 & t3.child.childLanes) === 0 ? (Xa2(t3), e3 = Cc(e3, t3, n3), e3 === null ? null : e3.sibling) : gc(e3, t3, n3) : (Xa2(t3), t3.flags |= 128, null);
        Xa2(t3);
        break;
      case 19:
        var i3 = !!(e3.flags & 128);
        if (r3 = (n3 & t3.childLanes) !== 0, r3 ||= (Wi2(e3, t3, n3, false), (n3 & t3.childLanes) !== 0), i3) {
          if (r3) return Sc(e3, t3, n3);
          t3.flags |= 128;
        }
        if (i3 = t3.memoizedState, i3 !== null && (i3.rendering = null, i3.tail = null, i3.lastEffect = null), ae2(to2, to2.current), r3) break;
        return null;
      case 22:
        return t3.lanes = 0, nc(e3, t3, n3, t3.pendingProps);
      case 24:
        Bi2(t3, $i2, e3.memoizedState.cache);
    }
    return Cc(e3, t3, n3);
  }
  function Ec(e3, t3, n3) {
    if (e3 !== null) {
      if (e3.memoizedProps !== t3.pendingProps) Zs = true;
      else {
        if (!wc(e3, n3) && !(t3.flags & 128)) return Zs = false, Tc(e3, t3, n3);
        Zs = !!(e3.flags & 131072);
      }
    } else Zs = false, q2 && t3.flags & 1048576 && Si2(t3, hi2, t3.index);
    switch (t3.lanes = 0, t3.tag) {
      case 16:
        a: {
          var r3 = t3.pendingProps;
          if (e3 = ba2(t3.elementType), t3.type = e3, typeof e3 == `function`) ni2(e3) ? (r3 = Bs(e3, r3), t3.tag = 1, t3 = dc(null, t3, e3, r3, n3)) : (t3.tag = 0, t3 = lc(null, t3, e3, r3, n3));
          else {
            if (e3 != null) {
              var a3 = e3.$$typeof;
              if (a3 === w2) {
                t3.tag = 11, t3 = $s(null, t3, e3, r3, n3);
                break a;
              }
              if (a3 === D2) {
                t3.tag = 14, t3 = ec(null, t3, e3, r3, n3);
                break a;
              }
            }
            throw t3 = N2(e3) || e3, Error(i2(306, t3, ``));
          }
        }
        return t3;
      case 0:
        return lc(e3, t3, t3.type, t3.pendingProps, n3);
      case 1:
        return r3 = t3.type, a3 = Bs(r3, t3.pendingProps), dc(e3, t3, r3, a3, n3);
      case 3:
        a: {
          if (ue2(t3, t3.stateNode.containerInfo), e3 === null) throw Error(i2(387));
          r3 = t3.pendingProps;
          var o3 = t3.memoizedState;
          a3 = o3.element, Pa2(e3, t3), Ba2(t3, r3, null, n3);
          var s3 = t3.memoizedState;
          if (r3 = s3.cache, Bi2(t3, $i2, r3), r3 !== o3.cache && Ui2(t3, [$i2], n3, true), za2(), r3 = s3.element, o3.isDehydrated) {
            if (o3 = { element: r3, isDehydrated: false, cache: s3.cache }, t3.updateQueue.baseState = o3, t3.memoizedState = o3, t3.flags & 256) {
              t3 = fc(e3, t3, r3, n3);
              break a;
            }
            if (r3 !== a3) {
              a3 = di2(Error(i2(424)), t3), Ii2(a3), t3 = fc(e3, t3, r3, n3);
              break a;
            }
            switch (e3 = t3.stateNode.containerInfo, e3.nodeType) {
              case 9:
                e3 = e3.body;
                break;
              default:
                e3 = e3.nodeName === `HTML` ? e3.ownerDocument.body : e3;
            }
            for (K2 = cf(e3.firstChild), Ei2 = t3, q2 = true, Di2 = null, Oi2 = true, n3 = ja2(t3, null, r3, n3), t3.child = n3; n3; ) n3.flags = n3.flags & -3 | 4096, n3 = n3.sibling;
          } else {
            if (Pi2(), r3 === a3) {
              t3 = Cc(e3, t3, n3);
              break a;
            }
            Qs(e3, t3, r3, n3);
          }
          t3 = t3.child;
        }
        return t3;
      case 26:
        return cc(e3, t3), e3 === null ? (n3 = kf(t3.type, null, t3.pendingProps, null)) ? t3.memoizedState = n3 : q2 || (n3 = t3.type, e3 = t3.pendingProps, r3 = Bd(ce2.current).createElement(n3), r3[tt2] = t3, r3[nt2] = e3, Pd(r3, n3, e3), mt2(r3), t3.stateNode = r3) : t3.memoizedState = kf(t3.type, e3.memoizedProps, t3.pendingProps, e3.memoizedState), null;
      case 27:
        return R2(t3), e3 === null && q2 && (r3 = t3.stateNode = ff(t3.type, t3.pendingProps, ce2.current), Ei2 = t3, Oi2 = true, a3 = K2, Zd(t3.type) ? (lf = a3, K2 = cf(r3.firstChild)) : K2 = a3), Qs(e3, t3, t3.pendingProps.children, n3), cc(e3, t3), e3 === null && (t3.flags |= 4194304), t3.child;
      case 5:
        return e3 === null && q2 && ((a3 = r3 = K2) && (r3 = tf(r3, t3.type, t3.pendingProps, Oi2), r3 === null ? a3 = false : (t3.stateNode = r3, Ei2 = t3, K2 = cf(r3.firstChild), Oi2 = false, a3 = true)), a3 || Ai2(t3)), R2(t3), a3 = t3.type, o3 = t3.pendingProps, s3 = e3 === null ? null : e3.memoizedProps, r3 = o3.children, Ud(a3, o3) ? r3 = null : s3 !== null && Ud(a3, s3) && (t3.flags |= 32), t3.memoizedState !== null && (a3 = go2(e3, t3, yo2, null, null, n3), Qf._currentValue = a3), cc(e3, t3), Qs(e3, t3, r3, n3), t3.child;
      case 6:
        return e3 === null && q2 && ((e3 = n3 = K2) && (n3 = nf(n3, t3.pendingProps, Oi2), n3 === null ? e3 = false : (t3.stateNode = n3, Ei2 = t3, K2 = null, e3 = true)), e3 || Ai2(t3)), null;
      case 13:
        return gc(e3, t3, n3);
      case 4:
        return ue2(t3, t3.stateNode.containerInfo), r3 = t3.pendingProps, e3 === null ? t3.child = Aa2(t3, null, r3, n3) : Qs(e3, t3, r3, n3), t3.child;
      case 11:
        return $s(e3, t3, t3.type, t3.pendingProps, n3);
      case 7:
        return Qs(e3, t3, t3.pendingProps, n3), t3.child;
      case 8:
        return Qs(e3, t3, t3.pendingProps.children, n3), t3.child;
      case 12:
        return Qs(e3, t3, t3.pendingProps.children, n3), t3.child;
      case 10:
        return r3 = t3.pendingProps, Bi2(t3, t3.type, r3.value), Qs(e3, t3, r3.children, n3), t3.child;
      case 9:
        return a3 = t3.type._context, r3 = t3.pendingProps.children, Ki2(t3), a3 = qi2(a3), r3 = r3(a3), t3.flags |= 1, Qs(e3, t3, r3, n3), t3.child;
      case 14:
        return ec(e3, t3, t3.type, t3.pendingProps, n3);
      case 15:
        return tc(e3, t3, t3.type, t3.pendingProps, n3);
      case 19:
        return Sc(e3, t3, n3);
      case 31:
        return sc(e3, t3, n3);
      case 22:
        return nc(e3, t3, n3, t3.pendingProps);
      case 24:
        return Ki2(t3), r3 = qi2($i2), e3 === null ? (a3 = da2(), a3 === null && (a3 = Fl, o3 = ea2(), a3.pooledCache = o3, o3.refCount++, o3 !== null && (a3.pooledCacheLanes |= n3), a3 = o3), t3.memoizedState = { parent: r3, cache: a3 }, Na2(t3), Bi2(t3, $i2, a3)) : ((e3.lanes & n3) !== 0 && (Pa2(e3, t3), Ba2(t3, null, null, n3), za2()), a3 = e3.memoizedState, o3 = t3.memoizedState, a3.parent === r3 ? (r3 = o3.cache, Bi2(t3, $i2, r3), r3 !== a3.cache && Ui2(t3, [$i2], n3, true)) : (a3 = { parent: r3, cache: r3 }, t3.memoizedState = a3, t3.lanes === 0 && (t3.memoizedState = t3.updateQueue.baseState = a3), Bi2(t3, $i2, r3))), Qs(e3, t3, t3.pendingProps.children, n3), t3.child;
      case 29:
        throw t3.pendingProps;
    }
    throw Error(i2(156, t3.tag));
  }
  function Dc(e3) {
    e3.flags |= 4;
  }
  function Oc(e3, t3, n3, r3, i3) {
    if ((t3 = !!(e3.mode & 32)) && (t3 = false), t3) {
      if (e3.flags |= 16777216, (i3 & 335544128) === i3) {
        if (e3.stateNode.complete) e3.flags |= 8192;
        else if (Su()) e3.flags |= 8192;
        else throw xa2 = _a2, ha2;
      }
    } else e3.flags &= -16777217;
  }
  function kc(e3, t3) {
    if (t3.type !== `stylesheet` || t3.state.loading & 4) e3.flags &= -16777217;
    else if (e3.flags |= 16777216, !Wf(t3)) {
      if (Su()) e3.flags |= 8192;
      else throw xa2 = _a2, ha2;
    }
  }
  function Ac(e3, t3) {
    t3 !== null && (e3.flags |= 4), e3.flags & 16384 && (t3 = e3.tag === 22 ? 536870912 : We2(), e3.lanes |= t3, ql |= t3);
  }
  function jc(e3, t3) {
    if (!q2) switch (e3.tailMode) {
      case `hidden`:
        t3 = e3.tail;
        for (var n3 = null; t3 !== null; ) t3.alternate !== null && (n3 = t3), t3 = t3.sibling;
        n3 === null ? e3.tail = null : n3.sibling = null;
        break;
      case `collapsed`:
        n3 = e3.tail;
        for (var r3 = null; n3 !== null; ) n3.alternate !== null && (r3 = n3), n3 = n3.sibling;
        r3 === null ? t3 || e3.tail === null ? e3.tail = null : e3.tail.sibling = null : r3.sibling = null;
    }
  }
  function Mc(e3) {
    var t3 = e3.alternate !== null && e3.alternate.child === e3.child, n3 = 0, r3 = 0;
    if (t3) for (var i3 = e3.child; i3 !== null; ) n3 |= i3.lanes | i3.childLanes, r3 |= i3.subtreeFlags & 65011712, r3 |= i3.flags & 65011712, i3.return = e3, i3 = i3.sibling;
    else for (i3 = e3.child; i3 !== null; ) n3 |= i3.lanes | i3.childLanes, r3 |= i3.subtreeFlags, r3 |= i3.flags, i3.return = e3, i3 = i3.sibling;
    return e3.subtreeFlags |= r3, e3.childLanes = n3, t3;
  }
  function Nc(e3, t3, n3) {
    var r3 = t3.pendingProps;
    switch (wi2(t3), t3.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Mc(t3), null;
      case 1:
        return Mc(t3), null;
      case 3:
        return n3 = t3.stateNode, r3 = null, e3 !== null && (r3 = e3.memoizedState.cache), t3.memoizedState.cache !== r3 && (t3.flags |= 2048), Vi2($i2), de2(), n3.pendingContext && (n3.context = n3.pendingContext, n3.pendingContext = null), (e3 === null || e3.child === null) && (Ni2(t3) ? Dc(t3) : e3 === null || e3.memoizedState.isDehydrated && !(t3.flags & 256) || (t3.flags |= 1024, Fi2())), Mc(t3), null;
      case 26:
        var a3 = t3.type, o3 = t3.memoizedState;
        return e3 === null ? (Dc(t3), o3 === null ? (Mc(t3), Oc(t3, a3, null, r3, n3)) : (Mc(t3), kc(t3, o3))) : o3 ? o3 === e3.memoizedState ? (Mc(t3), t3.flags &= -16777217) : (Dc(t3), Mc(t3), kc(t3, o3)) : (e3 = e3.memoizedProps, e3 !== r3 && Dc(t3), Mc(t3), Oc(t3, a3, e3, r3, n3)), null;
      case 27:
        if (fe2(t3), n3 = ce2.current, a3 = t3.type, e3 !== null && t3.stateNode != null) e3.memoizedProps !== r3 && Dc(t3);
        else {
          if (!r3) {
            if (t3.stateNode === null) throw Error(i2(166));
            return Mc(t3), null;
          }
          e3 = oe2.current, Ni2(t3) ? ji2(t3, e3) : (e3 = ff(a3, r3, n3), t3.stateNode = e3, Dc(t3));
        }
        return Mc(t3), null;
      case 5:
        if (fe2(t3), a3 = t3.type, e3 !== null && t3.stateNode != null) e3.memoizedProps !== r3 && Dc(t3);
        else {
          if (!r3) {
            if (t3.stateNode === null) throw Error(i2(166));
            return Mc(t3), null;
          }
          if (o3 = oe2.current, Ni2(t3)) ji2(t3, o3);
          else {
            var s3 = Bd(ce2.current);
            switch (o3) {
              case 1:
                o3 = s3.createElementNS(`http://www.w3.org/2000/svg`, a3);
                break;
              case 2:
                o3 = s3.createElementNS(`http://www.w3.org/1998/Math/MathML`, a3);
                break;
              default:
                switch (a3) {
                  case `svg`:
                    o3 = s3.createElementNS(`http://www.w3.org/2000/svg`, a3);
                    break;
                  case `math`:
                    o3 = s3.createElementNS(`http://www.w3.org/1998/Math/MathML`, a3);
                    break;
                  case `script`:
                    o3 = s3.createElement(`div`), o3.innerHTML = `<script><\/script>`, o3 = o3.removeChild(o3.firstChild);
                    break;
                  case `select`:
                    o3 = typeof r3.is == `string` ? s3.createElement(`select`, { is: r3.is }) : s3.createElement(`select`), r3.multiple ? o3.multiple = true : r3.size && (o3.size = r3.size);
                    break;
                  default:
                    o3 = typeof r3.is == `string` ? s3.createElement(a3, { is: r3.is }) : s3.createElement(a3);
                }
            }
            o3[tt2] = t3, o3[nt2] = r3;
            a: for (s3 = t3.child; s3 !== null; ) {
              if (s3.tag === 5 || s3.tag === 6) o3.appendChild(s3.stateNode);
              else if (s3.tag !== 4 && s3.tag !== 27 && s3.child !== null) {
                s3.child.return = s3, s3 = s3.child;
                continue;
              }
              if (s3 === t3) break a;
              for (; s3.sibling === null; ) {
                if (s3.return === null || s3.return === t3) break a;
                s3 = s3.return;
              }
              s3.sibling.return = s3.return, s3 = s3.sibling;
            }
            t3.stateNode = o3;
            a: switch (Pd(o3, a3, r3), a3) {
              case `button`:
              case `input`:
              case `select`:
              case `textarea`:
                r3 = !!r3.autoFocus;
                break a;
              case `img`:
                r3 = true;
                break a;
              default:
                r3 = false;
            }
            r3 && Dc(t3);
          }
        }
        return Mc(t3), Oc(t3, t3.type, e3 === null ? null : e3.memoizedProps, t3.pendingProps, n3), null;
      case 6:
        if (e3 && t3.stateNode != null) e3.memoizedProps !== r3 && Dc(t3);
        else {
          if (typeof r3 != `string` && t3.stateNode === null) throw Error(i2(166));
          if (e3 = ce2.current, Ni2(t3)) {
            if (e3 = t3.stateNode, n3 = t3.memoizedProps, r3 = null, a3 = Ei2, a3 !== null) switch (a3.tag) {
              case 27:
              case 5:
                r3 = a3.memoizedProps;
            }
            e3[tt2] = t3, e3 = !!(e3.nodeValue === n3 || r3 !== null && true === r3.suppressHydrationWarning || jd(e3.nodeValue, n3)), e3 || Ai2(t3, true);
          } else e3 = Bd(e3).createTextNode(r3), e3[tt2] = t3, t3.stateNode = e3;
        }
        return Mc(t3), null;
      case 31:
        if (n3 = t3.memoizedState, e3 === null || e3.memoizedState !== null) {
          if (r3 = Ni2(t3), n3 !== null) {
            if (e3 === null) {
              if (!r3) throw Error(i2(318));
              if (e3 = t3.memoizedState, e3 = e3 === null ? null : e3.dehydrated, !e3) throw Error(i2(557));
              e3[tt2] = t3;
            } else Pi2(), !(t3.flags & 128) && (t3.memoizedState = null), t3.flags |= 4;
            Mc(t3), e3 = false;
          } else n3 = Fi2(), e3 !== null && e3.memoizedState !== null && (e3.memoizedState.hydrationErrors = n3), e3 = true;
          if (!e3) return t3.flags & 256 ? (eo2(t3), t3) : (eo2(t3), null);
          if (t3.flags & 128) throw Error(i2(558));
        }
        return Mc(t3), null;
      case 13:
        if (r3 = t3.memoizedState, e3 === null || e3.memoizedState !== null && e3.memoizedState.dehydrated !== null) {
          if (a3 = Ni2(t3), r3 !== null && r3.dehydrated !== null) {
            if (e3 === null) {
              if (!a3) throw Error(i2(318));
              if (a3 = t3.memoizedState, a3 = a3 === null ? null : a3.dehydrated, !a3) throw Error(i2(317));
              a3[tt2] = t3;
            } else Pi2(), !(t3.flags & 128) && (t3.memoizedState = null), t3.flags |= 4;
            Mc(t3), a3 = false;
          } else a3 = Fi2(), e3 !== null && e3.memoizedState !== null && (e3.memoizedState.hydrationErrors = a3), a3 = true;
          if (!a3) return t3.flags & 256 ? (eo2(t3), t3) : (eo2(t3), null);
        }
        return eo2(t3), t3.flags & 128 ? (t3.lanes = n3, t3) : (n3 = r3 !== null, e3 = e3 !== null && e3.memoizedState !== null, n3 && (r3 = t3.child, a3 = null, r3.alternate !== null && r3.alternate.memoizedState !== null && r3.alternate.memoizedState.cachePool !== null && (a3 = r3.alternate.memoizedState.cachePool.pool), o3 = null, r3.memoizedState !== null && r3.memoizedState.cachePool !== null && (o3 = r3.memoizedState.cachePool.pool), o3 !== a3 && (r3.flags |= 2048)), n3 !== e3 && n3 && (t3.child.flags |= 8192), Ac(t3, t3.updateQueue), Mc(t3), null);
      case 4:
        return de2(), e3 === null && xd(t3.stateNode.containerInfo), Mc(t3), null;
      case 10:
        return Vi2(t3.type), Mc(t3), null;
      case 19:
        if (L2(to2), r3 = t3.memoizedState, r3 === null) return Mc(t3), null;
        if (a3 = !!(t3.flags & 128), o3 = r3.rendering, o3 === null) {
          if (a3) jc(r3, false);
          else {
            if (Hl !== 0 || e3 !== null && e3.flags & 128) for (e3 = t3.child; e3 !== null; ) {
              if (o3 = no2(e3), o3 !== null) {
                for (t3.flags |= 128, jc(r3, false), e3 = o3.updateQueue, t3.updateQueue = e3, Ac(t3, e3), t3.subtreeFlags = 0, e3 = n3, n3 = t3.child; n3 !== null; ) ii2(n3, e3), n3 = n3.sibling;
                return ae2(to2, to2.current & 1 | 2), q2 && xi2(t3, r3.treeForkCount), t3.child;
              }
              e3 = e3.sibling;
            }
            r3.tail !== null && Ce2() > $l && (t3.flags |= 128, a3 = true, jc(r3, false), t3.lanes = 4194304);
          }
        } else {
          if (!a3) {
            if (e3 = no2(o3), e3 !== null) {
              if (t3.flags |= 128, a3 = true, e3 = e3.updateQueue, t3.updateQueue = e3, Ac(t3, e3), jc(r3, true), r3.tail === null && r3.tailMode === `hidden` && !o3.alternate && !q2) return Mc(t3), null;
            } else 2 * Ce2() - r3.renderingStartTime > $l && n3 !== 536870912 && (t3.flags |= 128, a3 = true, jc(r3, false), t3.lanes = 4194304);
          }
          r3.isBackwards ? (o3.sibling = t3.child, t3.child = o3) : (e3 = r3.last, e3 === null ? t3.child = o3 : e3.sibling = o3, r3.last = o3);
        }
        return r3.tail === null ? (Mc(t3), null) : (e3 = r3.tail, r3.rendering = e3, r3.tail = e3.sibling, r3.renderingStartTime = Ce2(), e3.sibling = null, n3 = to2.current, ae2(to2, a3 ? n3 & 1 | 2 : n3 & 1), q2 && xi2(t3, r3.treeForkCount), e3);
      case 22:
      case 23:
        return eo2(t3), qa2(), r3 = t3.memoizedState !== null, e3 === null ? r3 && (t3.flags |= 8192) : e3.memoizedState !== null !== r3 && (t3.flags |= 8192), r3 ? n3 & 536870912 && !(t3.flags & 128) && (Mc(t3), t3.subtreeFlags & 6 && (t3.flags |= 8192)) : Mc(t3), n3 = t3.updateQueue, n3 !== null && Ac(t3, n3.retryQueue), n3 = null, e3 !== null && e3.memoizedState !== null && e3.memoizedState.cachePool !== null && (n3 = e3.memoizedState.cachePool.pool), r3 = null, t3.memoizedState !== null && t3.memoizedState.cachePool !== null && (r3 = t3.memoizedState.cachePool.pool), r3 !== n3 && (t3.flags |= 2048), e3 !== null && L2(ua2), null;
      case 24:
        return n3 = null, e3 !== null && (n3 = e3.memoizedState.cache), t3.memoizedState.cache !== n3 && (t3.flags |= 2048), Vi2($i2), Mc(t3), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i2(156, t3.tag));
  }
  function Pc(e3, t3) {
    switch (wi2(t3), t3.tag) {
      case 1:
        return e3 = t3.flags, e3 & 65536 ? (t3.flags = e3 & -65537 | 128, t3) : null;
      case 3:
        return Vi2($i2), de2(), e3 = t3.flags, e3 & 65536 && !(e3 & 128) ? (t3.flags = e3 & -65537 | 128, t3) : null;
      case 26:
      case 27:
      case 5:
        return fe2(t3), null;
      case 31:
        if (t3.memoizedState !== null) {
          if (eo2(t3), t3.alternate === null) throw Error(i2(340));
          Pi2();
        }
        return e3 = t3.flags, e3 & 65536 ? (t3.flags = e3 & -65537 | 128, t3) : null;
      case 13:
        if (eo2(t3), e3 = t3.memoizedState, e3 !== null && e3.dehydrated !== null) {
          if (t3.alternate === null) throw Error(i2(340));
          Pi2();
        }
        return e3 = t3.flags, e3 & 65536 ? (t3.flags = e3 & -65537 | 128, t3) : null;
      case 19:
        return L2(to2), null;
      case 4:
        return de2(), null;
      case 10:
        return Vi2(t3.type), null;
      case 22:
      case 23:
        return eo2(t3), qa2(), e3 !== null && L2(ua2), e3 = t3.flags, e3 & 65536 ? (t3.flags = e3 & -65537 | 128, t3) : null;
      case 24:
        return Vi2($i2), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fc(e3, t3) {
    switch (wi2(t3), t3.tag) {
      case 3:
        Vi2($i2), de2();
        break;
      case 26:
      case 27:
      case 5:
        fe2(t3);
        break;
      case 4:
        de2();
        break;
      case 31:
        t3.memoizedState !== null && eo2(t3);
        break;
      case 13:
        eo2(t3);
        break;
      case 19:
        L2(to2);
        break;
      case 10:
        Vi2(t3.type);
        break;
      case 22:
      case 23:
        eo2(t3), qa2(), e3 !== null && L2(ua2);
        break;
      case 24:
        Vi2($i2);
    }
  }
  function Ic(e3, t3) {
    try {
      var n3 = t3.updateQueue, r3 = n3 === null ? null : n3.lastEffect;
      if (r3 !== null) {
        var i3 = r3.next;
        n3 = i3;
        do {
          if ((n3.tag & e3) === e3) {
            r3 = void 0;
            var a3 = n3.create, o3 = n3.inst;
            r3 = a3(), o3.destroy = r3;
          }
          n3 = n3.next;
        } while (n3 !== i3);
      }
    } catch (e4) {
      Uu(t3, t3.return, e4);
    }
  }
  function Lc(e3, t3, n3) {
    try {
      var r3 = t3.updateQueue, i3 = r3 === null ? null : r3.lastEffect;
      if (i3 !== null) {
        var a3 = i3.next;
        r3 = a3;
        do {
          if ((r3.tag & e3) === e3) {
            var o3 = r3.inst, s3 = o3.destroy;
            if (s3 !== void 0) {
              o3.destroy = void 0, i3 = t3;
              var c3 = n3, l3 = s3;
              try {
                l3();
              } catch (e4) {
                Uu(i3, c3, e4);
              }
            }
          }
          r3 = r3.next;
        } while (r3 !== a3);
      }
    } catch (e4) {
      Uu(t3, t3.return, e4);
    }
  }
  function Rc(e3) {
    var t3 = e3.updateQueue;
    if (t3 !== null) {
      var n3 = e3.stateNode;
      try {
        Ha2(t3, n3);
      } catch (t4) {
        Uu(e3, e3.return, t4);
      }
    }
  }
  function zc(e3, t3, n3) {
    n3.props = Bs(e3.type, e3.memoizedProps), n3.state = e3.memoizedState;
    try {
      n3.componentWillUnmount();
    } catch (n4) {
      Uu(e3, t3, n4);
    }
  }
  function Bc(e3, t3) {
    try {
      var n3 = e3.ref;
      if (n3 !== null) {
        switch (e3.tag) {
          case 26:
          case 27:
          case 5:
            var r3 = e3.stateNode;
            break;
          case 30:
            r3 = e3.stateNode;
            break;
          default:
            r3 = e3.stateNode;
        }
        typeof n3 == `function` ? e3.refCleanup = n3(r3) : n3.current = r3;
      }
    } catch (n4) {
      Uu(e3, t3, n4);
    }
  }
  function Vc(e3, t3) {
    var n3 = e3.ref, r3 = e3.refCleanup;
    if (n3 !== null) {
      if (typeof r3 == `function`) try {
        r3();
      } catch (n4) {
        Uu(e3, t3, n4);
      } finally {
        e3.refCleanup = null, e3 = e3.alternate, e3 != null && (e3.refCleanup = null);
      }
      else if (typeof n3 == `function`) try {
        n3(null);
      } catch (n4) {
        Uu(e3, t3, n4);
      }
      else n3.current = null;
    }
  }
  function Hc(e3) {
    var t3 = e3.type, n3 = e3.memoizedProps, r3 = e3.stateNode;
    try {
      a: switch (t3) {
        case `button`:
        case `input`:
        case `select`:
        case `textarea`:
          n3.autoFocus && r3.focus();
          break a;
        case `img`:
          n3.src ? r3.src = n3.src : n3.srcSet && (r3.srcset = n3.srcSet);
      }
    } catch (t4) {
      Uu(e3, e3.return, t4);
    }
  }
  function Uc(e3, t3, n3) {
    try {
      var r3 = e3.stateNode;
      Fd(r3, e3.type, n3, t3), r3[nt2] = t3;
    } catch (t4) {
      Uu(e3, e3.return, t4);
    }
  }
  function Wc(e3) {
    return e3.tag === 5 || e3.tag === 3 || e3.tag === 26 || e3.tag === 27 && Zd(e3.type) || e3.tag === 4;
  }
  function Gc(e3) {
    a: for (; ; ) {
      for (; e3.sibling === null; ) {
        if (e3.return === null || Wc(e3.return)) return null;
        e3 = e3.return;
      }
      for (e3.sibling.return = e3.return, e3 = e3.sibling; e3.tag !== 5 && e3.tag !== 6 && e3.tag !== 18; ) {
        if (e3.tag === 27 && Zd(e3.type) || e3.flags & 2 || e3.child === null || e3.tag === 4) continue a;
        e3.child.return = e3, e3 = e3.child;
      }
      if (!(e3.flags & 2)) return e3.stateNode;
    }
  }
  function Kc(e3, t3, n3) {
    var r3 = e3.tag;
    if (r3 === 5 || r3 === 6) e3 = e3.stateNode, t3 ? (n3.nodeType === 9 ? n3.body : n3.nodeName === `HTML` ? n3.ownerDocument.body : n3).insertBefore(e3, t3) : (t3 = n3.nodeType === 9 ? n3.body : n3.nodeName === `HTML` ? n3.ownerDocument.body : n3, t3.appendChild(e3), n3 = n3._reactRootContainer, n3 != null || t3.onclick !== null || (t3.onclick = Jt2));
    else if (r3 !== 4 && (r3 === 27 && Zd(e3.type) && (n3 = e3.stateNode, t3 = null), e3 = e3.child, e3 !== null)) for (Kc(e3, t3, n3), e3 = e3.sibling; e3 !== null; ) Kc(e3, t3, n3), e3 = e3.sibling;
  }
  function qc(e3, t3, n3) {
    var r3 = e3.tag;
    if (r3 === 5 || r3 === 6) e3 = e3.stateNode, t3 ? n3.insertBefore(e3, t3) : n3.appendChild(e3);
    else if (r3 !== 4 && (r3 === 27 && Zd(e3.type) && (n3 = e3.stateNode), e3 = e3.child, e3 !== null)) for (qc(e3, t3, n3), e3 = e3.sibling; e3 !== null; ) qc(e3, t3, n3), e3 = e3.sibling;
  }
  function Jc(e3) {
    var t3 = e3.stateNode, n3 = e3.memoizedProps;
    try {
      for (var r3 = e3.type, i3 = t3.attributes; i3.length; ) t3.removeAttributeNode(i3[0]);
      Pd(t3, r3, n3), t3[tt2] = e3, t3[nt2] = n3;
    } catch (t4) {
      Uu(e3, e3.return, t4);
    }
  }
  var Yc = false, Xc = false, Zc = false, Qc = typeof WeakSet == `function` ? WeakSet : Set, $c = null;
  function el(e3, t3) {
    if (e3 = e3.containerInfo, Rd = sp, e3 = br2(e3), xr2(e3)) {
      if (`selectionStart` in e3) var n3 = { start: e3.selectionStart, end: e3.selectionEnd };
      else a: {
        n3 = (n3 = e3.ownerDocument) && n3.defaultView || window;
        var r3 = n3.getSelection && n3.getSelection();
        if (r3 && r3.rangeCount !== 0) {
          n3 = r3.anchorNode;
          var a3 = r3.anchorOffset, o3 = r3.focusNode;
          r3 = r3.focusOffset;
          try {
            n3.nodeType, o3.nodeType;
          } catch {
            n3 = null;
            break a;
          }
          var s3 = 0, c3 = -1, l3 = -1, u2 = 0, d3 = 0, f2 = e3, p3 = null;
          b: for (; ; ) {
            for (var m2; f2 !== n3 || a3 !== 0 && f2.nodeType !== 3 || (c3 = s3 + a3), f2 !== o3 || r3 !== 0 && f2.nodeType !== 3 || (l3 = s3 + r3), f2.nodeType === 3 && (s3 += f2.nodeValue.length), (m2 = f2.firstChild) !== null; ) p3 = f2, f2 = m2;
            for (; ; ) {
              if (f2 === e3) break b;
              if (p3 === n3 && ++u2 === a3 && (c3 = s3), p3 === o3 && ++d3 === r3 && (l3 = s3), (m2 = f2.nextSibling) !== null) break;
              f2 = p3, p3 = f2.parentNode;
            }
            f2 = m2;
          }
          n3 = c3 === -1 || l3 === -1 ? null : { start: c3, end: l3 };
        } else n3 = null;
      }
      n3 ||= { start: 0, end: 0 };
    } else n3 = null;
    for (zd = { focusedElem: e3, selectionRange: n3 }, sp = false, $c = t3; $c !== null; ) if (t3 = $c, e3 = t3.child, t3.subtreeFlags & 1028 && e3 !== null) e3.return = t3, $c = e3;
    else for (; $c !== null; ) {
      switch (t3 = $c, o3 = t3.alternate, e3 = t3.flags, t3.tag) {
        case 0:
          if (e3 & 4 && (e3 = t3.updateQueue, e3 = e3 === null ? null : e3.events, e3 !== null)) for (n3 = 0; n3 < e3.length; n3++) a3 = e3[n3], a3.ref.impl = a3.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if (e3 & 1024 && o3 !== null) {
            e3 = void 0, n3 = t3, a3 = o3.memoizedProps, o3 = o3.memoizedState, r3 = n3.stateNode;
            try {
              var h3 = Bs(n3.type, a3);
              e3 = r3.getSnapshotBeforeUpdate(h3, o3), r3.__reactInternalSnapshotBeforeUpdate = e3;
            } catch (e4) {
              Uu(n3, n3.return, e4);
            }
          }
          break;
        case 3:
          if (e3 & 1024) {
            if (e3 = t3.stateNode.containerInfo, n3 = e3.nodeType, n3 === 9) ef(e3);
            else if (n3 === 1) switch (e3.nodeName) {
              case `HEAD`:
              case `HTML`:
              case `BODY`:
                ef(e3);
                break;
              default:
                e3.textContent = ``;
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if (e3 & 1024) throw Error(i2(163));
      }
      if (e3 = t3.sibling, e3 !== null) {
        e3.return = t3.return, $c = e3;
        break;
      }
      $c = t3.return;
    }
  }
  function tl(e3, t3, n3) {
    var r3 = n3.flags;
    switch (n3.tag) {
      case 0:
      case 11:
      case 15:
        gl(e3, n3), r3 & 4 && Ic(5, n3);
        break;
      case 1:
        if (gl(e3, n3), r3 & 4) {
          if (e3 = n3.stateNode, t3 === null) try {
            e3.componentDidMount();
          } catch (e4) {
            Uu(n3, n3.return, e4);
          }
          else {
            var i3 = Bs(n3.type, t3.memoizedProps);
            t3 = t3.memoizedState;
            try {
              e3.componentDidUpdate(i3, t3, e3.__reactInternalSnapshotBeforeUpdate);
            } catch (e4) {
              Uu(n3, n3.return, e4);
            }
          }
        }
        r3 & 64 && Rc(n3), r3 & 512 && Bc(n3, n3.return);
        break;
      case 3:
        if (gl(e3, n3), r3 & 64 && (e3 = n3.updateQueue, e3 !== null)) {
          if (t3 = null, n3.child !== null) switch (n3.child.tag) {
            case 27:
            case 5:
              t3 = n3.child.stateNode;
              break;
            case 1:
              t3 = n3.child.stateNode;
          }
          try {
            Ha2(e3, t3);
          } catch (e4) {
            Uu(n3, n3.return, e4);
          }
        }
        break;
      case 27:
        t3 === null && r3 & 4 && Jc(n3);
      case 26:
      case 5:
        gl(e3, n3), t3 === null && r3 & 4 && Hc(n3), r3 & 512 && Bc(n3, n3.return);
        break;
      case 12:
        gl(e3, n3);
        break;
      case 31:
        gl(e3, n3), r3 & 4 && sl(e3, n3);
        break;
      case 13:
        gl(e3, n3), r3 & 4 && cl(e3, n3), r3 & 64 && (e3 = n3.memoizedState, e3 !== null && (e3 = e3.dehydrated, e3 !== null && (n3 = qu.bind(null, n3), sf(e3, n3))));
        break;
      case 22:
        if (r3 = n3.memoizedState !== null || Yc, !r3) {
          t3 = t3 !== null && t3.memoizedState !== null || Xc, i3 = Yc;
          var a3 = Xc;
          Yc = r3, (Xc = t3) && !a3 ? vl(e3, n3, !!(n3.subtreeFlags & 8772)) : gl(e3, n3), Yc = i3, Xc = a3;
        }
        break;
      case 30:
        break;
      default:
        gl(e3, n3);
    }
  }
  function nl(e3) {
    var t3 = e3.alternate;
    t3 !== null && (e3.alternate = null, nl(t3)), e3.child = null, e3.deletions = null, e3.sibling = null, e3.tag === 5 && (t3 = e3.stateNode, t3 !== null && lt2(t3)), e3.stateNode = null, e3.return = null, e3.dependencies = null, e3.memoizedProps = null, e3.memoizedState = null, e3.pendingProps = null, e3.stateNode = null, e3.updateQueue = null;
  }
  var rl = null, il = false;
  function al(e3, t3, n3) {
    for (n3 = n3.child; n3 !== null; ) ol(e3, t3, n3), n3 = n3.sibling;
  }
  function ol(e3, t3, n3) {
    if (V2 && typeof V2.onCommitFiberUnmount == `function`) try {
      V2.onCommitFiberUnmount(Me2, n3);
    } catch {
    }
    switch (n3.tag) {
      case 26:
        Xc || Vc(n3, t3), al(e3, t3, n3), n3.memoizedState ? n3.memoizedState.count-- : n3.stateNode && (n3 = n3.stateNode, n3.parentNode.removeChild(n3));
        break;
      case 27:
        Xc || Vc(n3, t3);
        var r3 = rl, i3 = il;
        Zd(n3.type) && (rl = n3.stateNode, il = false), al(e3, t3, n3), pf(n3.stateNode), rl = r3, il = i3;
        break;
      case 5:
        Xc || Vc(n3, t3);
      case 6:
        if (r3 = rl, i3 = il, rl = null, al(e3, t3, n3), rl = r3, il = i3, rl !== null) {
          if (il) try {
            (rl.nodeType === 9 ? rl.body : rl.nodeName === `HTML` ? rl.ownerDocument.body : rl).removeChild(n3.stateNode);
          } catch (e4) {
            Uu(n3, t3, e4);
          }
          else try {
            rl.removeChild(n3.stateNode);
          } catch (e4) {
            Uu(n3, t3, e4);
          }
        }
        break;
      case 18:
        rl !== null && (il ? (e3 = rl, Qd(e3.nodeType === 9 ? e3.body : e3.nodeName === `HTML` ? e3.ownerDocument.body : e3, n3.stateNode), Np(e3)) : Qd(rl, n3.stateNode));
        break;
      case 4:
        r3 = rl, i3 = il, rl = n3.stateNode.containerInfo, il = true, al(e3, t3, n3), rl = r3, il = i3;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Lc(2, n3, t3), Xc || Lc(4, n3, t3), al(e3, t3, n3);
        break;
      case 1:
        Xc || (Vc(n3, t3), r3 = n3.stateNode, typeof r3.componentWillUnmount == `function` && zc(n3, t3, r3)), al(e3, t3, n3);
        break;
      case 21:
        al(e3, t3, n3);
        break;
      case 22:
        Xc = (r3 = Xc) || n3.memoizedState !== null, al(e3, t3, n3), Xc = r3;
        break;
      default:
        al(e3, t3, n3);
    }
  }
  function sl(e3, t3) {
    if (t3.memoizedState === null && (e3 = t3.alternate, e3 !== null && (e3 = e3.memoizedState, e3 !== null))) {
      e3 = e3.dehydrated;
      try {
        Np(e3);
      } catch (e4) {
        Uu(t3, t3.return, e4);
      }
    }
  }
  function cl(e3, t3) {
    if (t3.memoizedState === null && (e3 = t3.alternate, e3 !== null && (e3 = e3.memoizedState, e3 !== null && (e3 = e3.dehydrated, e3 !== null)))) try {
      Np(e3);
    } catch (e4) {
      Uu(t3, t3.return, e4);
    }
  }
  function ll(e3) {
    switch (e3.tag) {
      case 31:
      case 13:
      case 19:
        var t3 = e3.stateNode;
        return t3 === null && (t3 = e3.stateNode = new Qc()), t3;
      case 22:
        return e3 = e3.stateNode, t3 = e3._retryCache, t3 === null && (t3 = e3._retryCache = new Qc()), t3;
      default:
        throw Error(i2(435, e3.tag));
    }
  }
  function ul(e3, t3) {
    var n3 = ll(e3);
    t3.forEach(function(t4) {
      if (!n3.has(t4)) {
        n3.add(t4);
        var r3 = Ju.bind(null, e3, t4);
        t4.then(r3, r3);
      }
    });
  }
  function dl(e3, t3) {
    var n3 = t3.deletions;
    if (n3 !== null) for (var r3 = 0; r3 < n3.length; r3++) {
      var a3 = n3[r3], o3 = e3, s3 = t3, c3 = s3;
      a: for (; c3 !== null; ) {
        switch (c3.tag) {
          case 27:
            if (Zd(c3.type)) {
              rl = c3.stateNode, il = false;
              break a;
            }
            break;
          case 5:
            rl = c3.stateNode, il = false;
            break a;
          case 3:
          case 4:
            rl = c3.stateNode.containerInfo, il = true;
            break a;
        }
        c3 = c3.return;
      }
      if (rl === null) throw Error(i2(160));
      ol(o3, s3, a3), rl = null, il = false, o3 = a3.alternate, o3 !== null && (o3.return = null), a3.return = null;
    }
    if (t3.subtreeFlags & 13886) for (t3 = t3.child; t3 !== null; ) pl(t3, e3), t3 = t3.sibling;
  }
  var fl = null;
  function pl(e3, t3) {
    var n3 = e3.alternate, r3 = e3.flags;
    switch (e3.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dl(t3, e3), ml(e3), r3 & 4 && (Lc(3, e3, e3.return), Ic(3, e3), Lc(5, e3, e3.return));
        break;
      case 1:
        dl(t3, e3), ml(e3), r3 & 512 && (Xc || n3 === null || Vc(n3, n3.return)), r3 & 64 && Yc && (e3 = e3.updateQueue, e3 !== null && (r3 = e3.callbacks, r3 !== null && (n3 = e3.shared.hiddenCallbacks, e3.shared.hiddenCallbacks = n3 === null ? r3 : n3.concat(r3))));
        break;
      case 26:
        var a3 = fl;
        if (dl(t3, e3), ml(e3), r3 & 512 && (Xc || n3 === null || Vc(n3, n3.return)), r3 & 4) {
          var o3 = n3 === null ? null : n3.memoizedState;
          if (r3 = e3.memoizedState, n3 === null) {
            if (r3 === null) {
              if (e3.stateNode === null) {
                a: {
                  r3 = e3.type, n3 = e3.memoizedProps, a3 = a3.ownerDocument || a3;
                  b: switch (r3) {
                    case `title`:
                      o3 = a3.getElementsByTagName(`title`)[0], (!o3 || o3[ct2] || o3[tt2] || o3.namespaceURI === `http://www.w3.org/2000/svg` || o3.hasAttribute(`itemprop`)) && (o3 = a3.createElement(r3), a3.head.insertBefore(o3, a3.querySelector(`head > title`))), Pd(o3, r3, n3), o3[tt2] = e3, mt2(o3), r3 = o3;
                      break a;
                    case `link`:
                      var s3 = Vf(`link`, `href`, a3).get(r3 + (n3.href || ``));
                      if (s3) {
                        for (var c3 = 0; c3 < s3.length; c3++) if (o3 = s3[c3], o3.getAttribute(`href`) === (n3.href == null || n3.href === `` ? null : n3.href) && o3.getAttribute(`rel`) === (n3.rel == null ? null : n3.rel) && o3.getAttribute(`title`) === (n3.title == null ? null : n3.title) && o3.getAttribute(`crossorigin`) === (n3.crossOrigin == null ? null : n3.crossOrigin)) {
                          s3.splice(c3, 1);
                          break b;
                        }
                      }
                      o3 = a3.createElement(r3), Pd(o3, r3, n3), a3.head.appendChild(o3);
                      break;
                    case `meta`:
                      if (s3 = Vf(`meta`, `content`, a3).get(r3 + (n3.content || ``))) {
                        for (c3 = 0; c3 < s3.length; c3++) if (o3 = s3[c3], o3.getAttribute(`content`) === (n3.content == null ? null : `` + n3.content) && o3.getAttribute(`name`) === (n3.name == null ? null : n3.name) && o3.getAttribute(`property`) === (n3.property == null ? null : n3.property) && o3.getAttribute(`http-equiv`) === (n3.httpEquiv == null ? null : n3.httpEquiv) && o3.getAttribute(`charset`) === (n3.charSet == null ? null : n3.charSet)) {
                          s3.splice(c3, 1);
                          break b;
                        }
                      }
                      o3 = a3.createElement(r3), Pd(o3, r3, n3), a3.head.appendChild(o3);
                      break;
                    default:
                      throw Error(i2(468, r3));
                  }
                  o3[tt2] = e3, mt2(o3), r3 = o3;
                }
                e3.stateNode = r3;
              } else Hf(a3, e3.type, e3.stateNode);
            } else e3.stateNode = If(a3, r3, e3.memoizedProps);
          } else o3 === r3 ? r3 === null && e3.stateNode !== null && Uc(e3, e3.memoizedProps, n3.memoizedProps) : (o3 === null ? n3.stateNode !== null && (n3 = n3.stateNode, n3.parentNode.removeChild(n3)) : o3.count--, r3 === null ? Hf(a3, e3.type, e3.stateNode) : If(a3, r3, e3.memoizedProps));
        }
        break;
      case 27:
        dl(t3, e3), ml(e3), r3 & 512 && (Xc || n3 === null || Vc(n3, n3.return)), n3 !== null && r3 & 4 && Uc(e3, e3.memoizedProps, n3.memoizedProps);
        break;
      case 5:
        if (dl(t3, e3), ml(e3), r3 & 512 && (Xc || n3 === null || Vc(n3, n3.return)), e3.flags & 32) {
          a3 = e3.stateNode;
          try {
            Bt2(a3, ``);
          } catch (t4) {
            Uu(e3, e3.return, t4);
          }
        }
        r3 & 4 && e3.stateNode != null && (a3 = e3.memoizedProps, Uc(e3, a3, n3 === null ? a3 : n3.memoizedProps)), r3 & 1024 && (Zc = true);
        break;
      case 6:
        if (dl(t3, e3), ml(e3), r3 & 4) {
          if (e3.stateNode === null) throw Error(i2(162));
          r3 = e3.memoizedProps, n3 = e3.stateNode;
          try {
            n3.nodeValue = r3;
          } catch (t4) {
            Uu(e3, e3.return, t4);
          }
        }
        break;
      case 3:
        if (Bf = null, a3 = fl, fl = gf(t3.containerInfo), dl(t3, e3), fl = a3, ml(e3), r3 & 4 && n3 !== null && n3.memoizedState.isDehydrated) try {
          Np(t3.containerInfo);
        } catch (t4) {
          Uu(e3, e3.return, t4);
        }
        Zc && (Zc = false, hl(e3));
        break;
      case 4:
        r3 = fl, fl = gf(e3.stateNode.containerInfo), dl(t3, e3), ml(e3), fl = r3;
        break;
      case 12:
        dl(t3, e3), ml(e3);
        break;
      case 31:
        dl(t3, e3), ml(e3), r3 & 4 && (r3 = e3.updateQueue, r3 !== null && (e3.updateQueue = null, ul(e3, r3)));
        break;
      case 13:
        dl(t3, e3), ml(e3), e3.child.flags & 8192 && e3.memoizedState !== null != (n3 !== null && n3.memoizedState !== null) && (Zl = Ce2()), r3 & 4 && (r3 = e3.updateQueue, r3 !== null && (e3.updateQueue = null, ul(e3, r3)));
        break;
      case 22:
        a3 = e3.memoizedState !== null;
        var l3 = n3 !== null && n3.memoizedState !== null, u2 = Yc, d3 = Xc;
        if (Yc = u2 || a3, Xc = d3 || l3, dl(t3, e3), Xc = d3, Yc = u2, ml(e3), r3 & 8192) a: for (t3 = e3.stateNode, t3._visibility = a3 ? t3._visibility & -2 : t3._visibility | 1, a3 && (n3 === null || l3 || Yc || Xc || _l(e3)), n3 = null, t3 = e3; ; ) {
          if (t3.tag === 5 || t3.tag === 26) {
            if (n3 === null) {
              l3 = n3 = t3;
              try {
                if (o3 = l3.stateNode, a3) s3 = o3.style, typeof s3.setProperty == `function` ? s3.setProperty(`display`, `none`, `important`) : s3.display = `none`;
                else {
                  c3 = l3.stateNode;
                  var f2 = l3.memoizedProps.style, p3 = f2 != null && f2.hasOwnProperty(`display`) ? f2.display : null;
                  c3.style.display = p3 == null || typeof p3 == `boolean` ? `` : (`` + p3).trim();
                }
              } catch (e4) {
                Uu(l3, l3.return, e4);
              }
            }
          } else if (t3.tag === 6) {
            if (n3 === null) {
              l3 = t3;
              try {
                l3.stateNode.nodeValue = a3 ? `` : l3.memoizedProps;
              } catch (e4) {
                Uu(l3, l3.return, e4);
              }
            }
          } else if (t3.tag === 18) {
            if (n3 === null) {
              l3 = t3;
              try {
                var m2 = l3.stateNode;
                a3 ? $d(m2, true) : $d(l3.stateNode, false);
              } catch (e4) {
                Uu(l3, l3.return, e4);
              }
            }
          } else if ((t3.tag !== 22 && t3.tag !== 23 || t3.memoizedState === null || t3 === e3) && t3.child !== null) {
            t3.child.return = t3, t3 = t3.child;
            continue;
          }
          if (t3 === e3) break a;
          for (; t3.sibling === null; ) {
            if (t3.return === null || t3.return === e3) break a;
            n3 === t3 && (n3 = null), t3 = t3.return;
          }
          n3 === t3 && (n3 = null), t3.sibling.return = t3.return, t3 = t3.sibling;
        }
        r3 & 4 && (r3 = e3.updateQueue, r3 !== null && (n3 = r3.retryQueue, n3 !== null && (r3.retryQueue = null, ul(e3, n3))));
        break;
      case 19:
        dl(t3, e3), ml(e3), r3 & 4 && (r3 = e3.updateQueue, r3 !== null && (e3.updateQueue = null, ul(e3, r3)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        dl(t3, e3), ml(e3);
    }
  }
  function ml(e3) {
    var t3 = e3.flags;
    if (t3 & 2) {
      try {
        for (var n3, r3 = e3.return; r3 !== null; ) {
          if (Wc(r3)) {
            n3 = r3;
            break;
          }
          r3 = r3.return;
        }
        if (n3 == null) throw Error(i2(160));
        switch (n3.tag) {
          case 27:
            var a3 = n3.stateNode;
            qc(e3, Gc(e3), a3);
            break;
          case 5:
            var o3 = n3.stateNode;
            n3.flags & 32 && (Bt2(o3, ``), n3.flags &= -33), qc(e3, Gc(e3), o3);
            break;
          case 3:
          case 4:
            var s3 = n3.stateNode.containerInfo;
            Kc(e3, Gc(e3), s3);
            break;
          default:
            throw Error(i2(161));
        }
      } catch (t4) {
        Uu(e3, e3.return, t4);
      }
      e3.flags &= -3;
    }
    t3 & 4096 && (e3.flags &= -4097);
  }
  function hl(e3) {
    if (e3.subtreeFlags & 1024) for (e3 = e3.child; e3 !== null; ) {
      var t3 = e3;
      hl(t3), t3.tag === 5 && t3.flags & 1024 && t3.stateNode.reset(), e3 = e3.sibling;
    }
  }
  function gl(e3, t3) {
    if (t3.subtreeFlags & 8772) for (t3 = t3.child; t3 !== null; ) tl(e3, t3.alternate, t3), t3 = t3.sibling;
  }
  function _l(e3) {
    for (e3 = e3.child; e3 !== null; ) {
      var t3 = e3;
      switch (t3.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Lc(4, t3, t3.return), _l(t3);
          break;
        case 1:
          Vc(t3, t3.return);
          var n3 = t3.stateNode;
          typeof n3.componentWillUnmount == `function` && zc(t3, t3.return, n3), _l(t3);
          break;
        case 27:
          pf(t3.stateNode);
        case 26:
        case 5:
          Vc(t3, t3.return), _l(t3);
          break;
        case 22:
          t3.memoizedState === null && _l(t3);
          break;
        case 30:
          _l(t3);
          break;
        default:
          _l(t3);
      }
      e3 = e3.sibling;
    }
  }
  function vl(e3, t3, n3) {
    for (n3 &&= !!(t3.subtreeFlags & 8772), t3 = t3.child; t3 !== null; ) {
      var r3 = t3.alternate, i3 = e3, a3 = t3, o3 = a3.flags;
      switch (a3.tag) {
        case 0:
        case 11:
        case 15:
          vl(i3, a3, n3), Ic(4, a3);
          break;
        case 1:
          if (vl(i3, a3, n3), r3 = a3, i3 = r3.stateNode, typeof i3.componentDidMount == `function`) try {
            i3.componentDidMount();
          } catch (e4) {
            Uu(r3, r3.return, e4);
          }
          if (r3 = a3, i3 = r3.updateQueue, i3 !== null) {
            var s3 = r3.stateNode;
            try {
              var c3 = i3.shared.hiddenCallbacks;
              if (c3 !== null) for (i3.shared.hiddenCallbacks = null, i3 = 0; i3 < c3.length; i3++) Va2(c3[i3], s3);
            } catch (e4) {
              Uu(r3, r3.return, e4);
            }
          }
          n3 && o3 & 64 && Rc(a3), Bc(a3, a3.return);
          break;
        case 27:
          Jc(a3);
        case 26:
        case 5:
          vl(i3, a3, n3), n3 && r3 === null && o3 & 4 && Hc(a3), Bc(a3, a3.return);
          break;
        case 12:
          vl(i3, a3, n3);
          break;
        case 31:
          vl(i3, a3, n3), n3 && o3 & 4 && sl(i3, a3);
          break;
        case 13:
          vl(i3, a3, n3), n3 && o3 & 4 && cl(i3, a3);
          break;
        case 22:
          a3.memoizedState === null && vl(i3, a3, n3), Bc(a3, a3.return);
          break;
        case 30:
          break;
        default:
          vl(i3, a3, n3);
      }
      t3 = t3.sibling;
    }
  }
  function yl(e3, t3) {
    var n3 = null;
    e3 !== null && e3.memoizedState !== null && e3.memoizedState.cachePool !== null && (n3 = e3.memoizedState.cachePool.pool), e3 = null, t3.memoizedState !== null && t3.memoizedState.cachePool !== null && (e3 = t3.memoizedState.cachePool.pool), e3 !== n3 && (e3 != null && e3.refCount++, n3 != null && ta2(n3));
  }
  function bl(e3, t3) {
    e3 = null, t3.alternate !== null && (e3 = t3.alternate.memoizedState.cache), t3 = t3.memoizedState.cache, t3 !== e3 && (t3.refCount++, e3 != null && ta2(e3));
  }
  function xl(e3, t3, n3, r3) {
    if (t3.subtreeFlags & 10256) for (t3 = t3.child; t3 !== null; ) Sl(e3, t3, n3, r3), t3 = t3.sibling;
  }
  function Sl(e3, t3, n3, r3) {
    var i3 = t3.flags;
    switch (t3.tag) {
      case 0:
      case 11:
      case 15:
        xl(e3, t3, n3, r3), i3 & 2048 && Ic(9, t3);
        break;
      case 1:
        xl(e3, t3, n3, r3);
        break;
      case 3:
        xl(e3, t3, n3, r3), i3 & 2048 && (e3 = null, t3.alternate !== null && (e3 = t3.alternate.memoizedState.cache), t3 = t3.memoizedState.cache, t3 !== e3 && (t3.refCount++, e3 != null && ta2(e3)));
        break;
      case 12:
        if (i3 & 2048) {
          xl(e3, t3, n3, r3), e3 = t3.stateNode;
          try {
            var a3 = t3.memoizedProps, o3 = a3.id, s3 = a3.onPostCommit;
            typeof s3 == `function` && s3(o3, t3.alternate === null ? `mount` : `update`, e3.passiveEffectDuration, -0);
          } catch (e4) {
            Uu(t3, t3.return, e4);
          }
        } else xl(e3, t3, n3, r3);
        break;
      case 31:
        xl(e3, t3, n3, r3);
        break;
      case 13:
        xl(e3, t3, n3, r3);
        break;
      case 23:
        break;
      case 22:
        a3 = t3.stateNode, o3 = t3.alternate, t3.memoizedState === null ? a3._visibility & 2 ? xl(e3, t3, n3, r3) : (a3._visibility |= 2, Cl(e3, t3, n3, r3, !!(t3.subtreeFlags & 10256) || false)) : a3._visibility & 2 ? xl(e3, t3, n3, r3) : wl(e3, t3), i3 & 2048 && yl(o3, t3);
        break;
      case 24:
        xl(e3, t3, n3, r3), i3 & 2048 && bl(t3.alternate, t3);
        break;
      default:
        xl(e3, t3, n3, r3);
    }
  }
  function Cl(e3, t3, n3, r3, i3) {
    for (i3 &&= !!(t3.subtreeFlags & 10256) || false, t3 = t3.child; t3 !== null; ) {
      var a3 = e3, o3 = t3, s3 = n3, c3 = r3, l3 = o3.flags;
      switch (o3.tag) {
        case 0:
        case 11:
        case 15:
          Cl(a3, o3, s3, c3, i3), Ic(8, o3);
          break;
        case 23:
          break;
        case 22:
          var u2 = o3.stateNode;
          o3.memoizedState === null ? (u2._visibility |= 2, Cl(a3, o3, s3, c3, i3)) : u2._visibility & 2 ? Cl(a3, o3, s3, c3, i3) : wl(a3, o3), i3 && l3 & 2048 && yl(o3.alternate, o3);
          break;
        case 24:
          Cl(a3, o3, s3, c3, i3), i3 && l3 & 2048 && bl(o3.alternate, o3);
          break;
        default:
          Cl(a3, o3, s3, c3, i3);
      }
      t3 = t3.sibling;
    }
  }
  function wl(e3, t3) {
    if (t3.subtreeFlags & 10256) for (t3 = t3.child; t3 !== null; ) {
      var n3 = e3, r3 = t3, i3 = r3.flags;
      switch (r3.tag) {
        case 22:
          wl(n3, r3), i3 & 2048 && yl(r3.alternate, r3);
          break;
        case 24:
          wl(n3, r3), i3 & 2048 && bl(r3.alternate, r3);
          break;
        default:
          wl(n3, r3);
      }
      t3 = t3.sibling;
    }
  }
  var Tl = 8192;
  function El(e3, t3, n3) {
    if (e3.subtreeFlags & Tl) for (e3 = e3.child; e3 !== null; ) Dl(e3, t3, n3), e3 = e3.sibling;
  }
  function Dl(e3, t3, n3) {
    switch (e3.tag) {
      case 26:
        El(e3, t3, n3), e3.flags & Tl && e3.memoizedState !== null && Gf(n3, fl, e3.memoizedState, e3.memoizedProps);
        break;
      case 5:
        El(e3, t3, n3);
        break;
      case 3:
      case 4:
        var r3 = fl;
        fl = gf(e3.stateNode.containerInfo), El(e3, t3, n3), fl = r3;
        break;
      case 22:
        e3.memoizedState === null && (r3 = e3.alternate, r3 !== null && r3.memoizedState !== null ? (r3 = Tl, Tl = 16777216, El(e3, t3, n3), Tl = r3) : El(e3, t3, n3));
        break;
      default:
        El(e3, t3, n3);
    }
  }
  function Ol(e3) {
    var t3 = e3.alternate;
    if (t3 !== null && (e3 = t3.child, e3 !== null)) {
      t3.child = null;
      do
        t3 = e3.sibling, e3.sibling = null, e3 = t3;
      while (e3 !== null);
    }
  }
  function kl(e3) {
    var t3 = e3.deletions;
    if (e3.flags & 16) {
      if (t3 !== null) for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        $c = r3, Ml(r3, e3);
      }
      Ol(e3);
    }
    if (e3.subtreeFlags & 10256) for (e3 = e3.child; e3 !== null; ) Al(e3), e3 = e3.sibling;
  }
  function Al(e3) {
    switch (e3.tag) {
      case 0:
      case 11:
      case 15:
        kl(e3), e3.flags & 2048 && Lc(9, e3, e3.return);
        break;
      case 3:
        kl(e3);
        break;
      case 12:
        kl(e3);
        break;
      case 22:
        var t3 = e3.stateNode;
        e3.memoizedState !== null && t3._visibility & 2 && (e3.return === null || e3.return.tag !== 13) ? (t3._visibility &= -3, jl(e3)) : kl(e3);
        break;
      default:
        kl(e3);
    }
  }
  function jl(e3) {
    var t3 = e3.deletions;
    if (e3.flags & 16) {
      if (t3 !== null) for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        $c = r3, Ml(r3, e3);
      }
      Ol(e3);
    }
    for (e3 = e3.child; e3 !== null; ) {
      switch (t3 = e3, t3.tag) {
        case 0:
        case 11:
        case 15:
          Lc(8, t3, t3.return), jl(t3);
          break;
        case 22:
          n3 = t3.stateNode, n3._visibility & 2 && (n3._visibility &= -3, jl(t3));
          break;
        default:
          jl(t3);
      }
      e3 = e3.sibling;
    }
  }
  function Ml(e3, t3) {
    for (; $c !== null; ) {
      var n3 = $c;
      switch (n3.tag) {
        case 0:
        case 11:
        case 15:
          Lc(8, n3, t3);
          break;
        case 23:
        case 22:
          if (n3.memoizedState !== null && n3.memoizedState.cachePool !== null) {
            var r3 = n3.memoizedState.cachePool.pool;
            r3 != null && r3.refCount++;
          }
          break;
        case 24:
          ta2(n3.memoizedState.cache);
      }
      if (r3 = n3.child, r3 !== null) r3.return = n3, $c = r3;
      else a: for (n3 = e3; $c !== null; ) {
        r3 = $c;
        var i3 = r3.sibling, a3 = r3.return;
        if (nl(r3), r3 === n3) {
          $c = null;
          break a;
        }
        if (i3 !== null) {
          i3.return = a3, $c = i3;
          break a;
        }
        $c = a3;
      }
    }
  }
  var Nl = { getCacheForType: function(e3) {
    var t3 = qi2($i2), n3 = t3.data.get(e3);
    return n3 === void 0 && (n3 = e3(), t3.data.set(e3, n3)), n3;
  }, cacheSignal: function() {
    return qi2($i2).controller.signal;
  } }, Pl = typeof WeakMap == `function` ? WeakMap : Map, X = 0, Fl = null, Z = null, Q = 0, Il = 0, Ll = null, Rl = false, zl = false, Bl = false, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = false, Zl = 0, Ql = 0, $l = 1 / 0, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
  function du() {
    return X & 2 && Q !== 0 ? Q & -Q : P2.T === null ? Qe2() : ud();
  }
  function fu() {
    if (Kl === 0) {
      if (!(Q & 536870912) || q2) {
        var e3 = ze2;
        ze2 <<= 1, !(ze2 & 3932160) && (ze2 = 262144), Kl = e3;
      } else Kl = 536870912;
    }
    return e3 = Ja2.current, e3 !== null && (e3.flags |= 32), Kl;
  }
  function pu(e3, t3, n3) {
    (e3 === Fl && (Il === 2 || Il === 9) || e3.cancelPendingCommit !== null) && (bu(e3, 0), _u(e3, Q, Kl, false)), Ke2(e3, n3), (!(X & 2) || e3 !== Fl) && (e3 === Fl && (!(X & 2) && (Wl |= n3), Hl === 4 && _u(e3, Q, Kl, false)), nd(e3));
  }
  function mu(e3, t3, n3) {
    if (X & 6) throw Error(i2(327));
    var r3 = !n3 && !(t3 & 127) && (t3 & e3.expiredLanes) === 0 || H2(e3, t3), a3 = r3 ? Ou(e3, t3) : Eu(e3, t3, true), o3 = r3;
    do {
      if (a3 === 0) {
        zl && !r3 && _u(e3, t3, 0, false);
        break;
      }
      if (n3 = e3.current.alternate, o3 && !gu(n3)) {
        a3 = Eu(e3, t3, false), o3 = false;
        continue;
      }
      if (a3 === 2) {
        if (o3 = t3, e3.errorRecoveryDisabledLanes & o3) var s3 = 0;
        else s3 = e3.pendingLanes & -536870913, s3 = s3 === 0 ? s3 & 536870912 ? 536870912 : 0 : s3;
        if (s3 !== 0) {
          t3 = s3;
          a: {
            var c3 = e3;
            a3 = Jl;
            var l3 = c3.current.memoizedState.isDehydrated;
            if (l3 && (bu(c3, s3).flags |= 256), s3 = Eu(c3, s3, false), s3 !== 2) {
              if (Bl && !l3) {
                c3.errorRecoveryDisabledLanes |= o3, Wl |= o3, a3 = 4;
                break a;
              }
              o3 = Yl, Yl = a3, o3 !== null && (Yl === null ? Yl = o3 : Yl.push.apply(Yl, o3));
            }
            a3 = s3;
          }
          if (o3 = false, a3 !== 2) continue;
        }
      }
      if (a3 === 1) {
        bu(e3, 0), _u(e3, t3, 0, true);
        break;
      }
      a: {
        switch (r3 = e3, o3 = a3, o3) {
          case 0:
          case 1:
            throw Error(i2(345));
          case 4:
            if ((t3 & 4194048) !== t3) break;
          case 6:
            _u(r3, t3, Kl, !Rl);
            break a;
          case 2:
            Yl = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(i2(329));
        }
        if ((t3 & 62914560) === t3 && (a3 = Zl + 300 - Ce2(), 10 < a3)) {
          if (_u(r3, t3, Kl, !Rl), He2(r3, 0, true) !== 0) break a;
          au = t3, r3.timeoutHandle = Kd(hu.bind(null, r3, n3, Yl, eu, Xl, t3, Kl, Wl, ql, Rl, o3, `Throttled`, -0, 0), a3);
          break a;
        }
        hu(r3, n3, Yl, eu, Xl, t3, Kl, Wl, ql, Rl, o3, null, -0, 0);
      }
      break;
    } while (1);
    nd(e3);
  }
  function hu(e3, t3, n3, r3, i3, a3, o3, s3, c3, l3, u2, d3, f2, p3) {
    if (e3.timeoutHandle = -1, d3 = t3.subtreeFlags, d3 & 8192 || (d3 & 16785408) == 16785408) {
      d3 = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Jt2 }, Dl(t3, a3, d3);
      var m2 = (a3 & 62914560) === a3 ? Zl - Ce2() : (a3 & 4194048) === a3 ? Ql - Ce2() : 0;
      if (m2 = qf(d3, m2), m2 !== null) {
        au = a3, e3.cancelPendingCommit = m2(Fu.bind(null, e3, t3, a3, n3, r3, i3, o3, s3, c3, u2, d3, null, f2, p3)), _u(e3, a3, o3, !l3);
        return;
      }
    }
    Fu(e3, t3, a3, n3, r3, i3, o3, s3, c3);
  }
  function gu(e3) {
    for (var t3 = e3; ; ) {
      var n3 = t3.tag;
      if ((n3 === 0 || n3 === 11 || n3 === 15) && t3.flags & 16384 && (n3 = t3.updateQueue, n3 !== null && (n3 = n3.stores, n3 !== null))) for (var r3 = 0; r3 < n3.length; r3++) {
        var i3 = n3[r3], a3 = i3.getSnapshot;
        i3 = i3.value;
        try {
          if (!hr2(a3(), i3)) return false;
        } catch {
          return false;
        }
      }
      if (n3 = t3.child, t3.subtreeFlags & 16384 && n3 !== null) n3.return = t3, t3 = n3;
      else {
        if (t3 === e3) break;
        for (; t3.sibling === null; ) {
          if (t3.return === null || t3.return === e3) return true;
          t3 = t3.return;
        }
        t3.sibling.return = t3.return, t3 = t3.sibling;
      }
    }
    return true;
  }
  function _u(e3, t3, n3, r3) {
    t3 &= ~Gl, t3 &= ~Wl, e3.suspendedLanes |= t3, e3.pingedLanes &= ~t3, r3 && (e3.warmLanes |= t3), r3 = e3.expirationTimes;
    for (var i3 = t3; 0 < i3; ) {
      var a3 = 31 - Pe2(i3), o3 = 1 << a3;
      r3[a3] = -1, i3 &= ~o3;
    }
    n3 !== 0 && Je2(e3, n3, t3);
  }
  function vu() {
    return X & 6 ? true : (rd(0, false), false);
  }
  function yu() {
    if (Z !== null) {
      if (Il === 0) var e3 = Z.return;
      else e3 = Z, zi2 = Ri2 = null, So2(e3), wa2 = null, Ta2 = 0, e3 = Z;
      for (; e3 !== null; ) Fc(e3.alternate, e3), e3 = e3.return;
      Z = null;
    }
  }
  function bu(e3, t3) {
    var n3 = e3.timeoutHandle;
    n3 !== -1 && (e3.timeoutHandle = -1, qd(n3)), n3 = e3.cancelPendingCommit, n3 !== null && (e3.cancelPendingCommit = null, n3()), au = 0, yu(), Fl = e3, Z = n3 = ri2(e3.current, null), Q = t3, Il = 0, Ll = null, Rl = false, zl = H2(e3, t3), Bl = false, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = false, t3 & 8 && (t3 |= t3 & 32);
    var r3 = e3.entangledLanes;
    if (r3 !== 0) for (e3 = e3.entanglements, r3 &= t3; 0 < r3; ) {
      var i3 = 31 - Pe2(r3), a3 = 1 << i3;
      t3 |= e3[i3], r3 &= ~a3;
    }
    return Vl = t3, qr2(), n3;
  }
  function xu(e3, t3) {
    Y2 = null, P2.H = Ms, t3 === ma2 || t3 === ga2 ? (t3 = Sa2(), Il = 3) : t3 === ha2 ? (t3 = Sa2(), Il = 4) : Il = t3 === Xs ? 8 : typeof t3 == `object` && t3 && typeof t3.then == `function` ? 6 : 1, Ll = t3, Z === null && (Hl = 1, Ws(e3, di2(t3, e3.current)));
  }
  function Su() {
    var e3 = Ja2.current;
    return e3 === null ? true : (Q & 4194048) === Q ? Ya2 === null : (Q & 62914560) === Q || Q & 536870912 ? e3 === Ya2 : false;
  }
  function Cu() {
    var e3 = P2.H;
    return P2.H = Ms, e3 === null ? Ms : e3;
  }
  function wu() {
    var e3 = P2.A;
    return P2.A = Nl, e3;
  }
  function Tu() {
    Hl = 4, Rl || (Q & 4194048) !== Q && Ja2.current !== null || (zl = true), !(Ul & 134217727) && !(Wl & 134217727) || Fl === null || _u(Fl, Q, Kl, false);
  }
  function Eu(e3, t3, n3) {
    var r3 = X;
    X |= 2;
    var i3 = Cu(), a3 = wu();
    (Fl !== e3 || Q !== t3) && (eu = null, bu(e3, t3)), t3 = false;
    var o3 = Hl;
    a: do
      try {
        if (Il !== 0 && Z !== null) {
          var s3 = Z, c3 = Ll;
          switch (Il) {
            case 8:
              yu(), o3 = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              Ja2.current === null && (t3 = true);
              var l3 = Il;
              if (Il = 0, Ll = null, Mu(e3, s3, c3, l3), n3 && zl) {
                o3 = 0;
                break a;
              }
              break;
            default:
              l3 = Il, Il = 0, Ll = null, Mu(e3, s3, c3, l3);
          }
        }
        Du(), o3 = Hl;
        break;
      } catch (t4) {
        xu(e3, t4);
      }
    while (1);
    return t3 && e3.shellSuspendCounter++, zi2 = Ri2 = null, X = r3, P2.H = i3, P2.A = a3, Z === null && (Fl = null, Q = 0, qr2()), o3;
  }
  function Du() {
    for (; Z !== null; ) Au(Z);
  }
  function Ou(e3, t3) {
    var n3 = X;
    X |= 2;
    var r3 = Cu(), a3 = wu();
    Fl !== e3 || Q !== t3 ? (eu = null, $l = Ce2() + 500, bu(e3, t3)) : zl = H2(e3, t3);
    a: do
      try {
        if (Il !== 0 && Z !== null) {
          t3 = Z;
          var o3 = Ll;
          b: switch (Il) {
            case 1:
              Il = 0, Ll = null, Mu(e3, t3, o3, 1);
              break;
            case 2:
            case 9:
              if (va2(o3)) {
                Il = 0, Ll = null, ju(t3);
                break;
              }
              t3 = function() {
                Il !== 2 && Il !== 9 || Fl !== e3 || (Il = 7), nd(e3);
              }, o3.then(t3, t3);
              break a;
            case 3:
              Il = 7;
              break a;
            case 4:
              Il = 5;
              break a;
            case 7:
              va2(o3) ? (Il = 0, Ll = null, ju(t3)) : (Il = 0, Ll = null, Mu(e3, t3, o3, 7));
              break;
            case 5:
              var s3 = null;
              switch (Z.tag) {
                case 26:
                  s3 = Z.memoizedState;
                case 5:
                case 27:
                  var c3 = Z;
                  if (s3 ? Wf(s3) : c3.stateNode.complete) {
                    Il = 0, Ll = null;
                    var l3 = c3.sibling;
                    if (l3 !== null) Z = l3;
                    else {
                      var u2 = c3.return;
                      u2 === null ? Z = null : (Z = u2, Nu(u2));
                    }
                    break b;
                  }
              }
              Il = 0, Ll = null, Mu(e3, t3, o3, 5);
              break;
            case 6:
              Il = 0, Ll = null, Mu(e3, t3, o3, 6);
              break;
            case 8:
              yu(), Hl = 6;
              break a;
            default:
              throw Error(i2(462));
          }
        }
        ku();
        break;
      } catch (t4) {
        xu(e3, t4);
      }
    while (1);
    return zi2 = Ri2 = null, P2.H = r3, P2.A = a3, X = n3, Z === null ? (Fl = null, Q = 0, qr2(), Hl) : 0;
  }
  function ku() {
    for (; Z !== null && !B2(); ) Au(Z);
  }
  function Au(e3) {
    var t3 = Ec(e3.alternate, e3, Vl);
    e3.memoizedProps = e3.pendingProps, t3 === null ? Nu(e3) : Z = t3;
  }
  function ju(e3) {
    var t3 = e3, n3 = t3.alternate;
    switch (t3.tag) {
      case 15:
      case 0:
        t3 = uc(n3, t3, t3.pendingProps, t3.type, void 0, Q);
        break;
      case 11:
        t3 = uc(n3, t3, t3.pendingProps, t3.type.render, t3.ref, Q);
        break;
      case 5:
        So2(t3);
      default:
        Fc(n3, t3), t3 = Z = ii2(t3, Vl), t3 = Ec(n3, t3, Vl);
    }
    e3.memoizedProps = e3.pendingProps, t3 === null ? Nu(e3) : Z = t3;
  }
  function Mu(e3, t3, n3, r3) {
    zi2 = Ri2 = null, So2(t3), wa2 = null, Ta2 = 0;
    var i3 = t3.return;
    try {
      if (Ys(e3, i3, t3, n3, Q)) {
        Hl = 1, Ws(e3, di2(n3, e3.current)), Z = null;
        return;
      }
    } catch (t4) {
      if (i3 !== null) throw Z = i3, t4;
      Hl = 1, Ws(e3, di2(n3, e3.current)), Z = null;
      return;
    }
    t3.flags & 32768 ? (q2 || r3 === 1 ? e3 = true : zl || Q & 536870912 ? e3 = false : (Rl = e3 = true, (r3 === 2 || r3 === 9 || r3 === 3 || r3 === 6) && (r3 = Ja2.current, r3 !== null && r3.tag === 13 && (r3.flags |= 16384))), Pu(t3, e3)) : Nu(t3);
  }
  function Nu(e3) {
    var t3 = e3;
    do {
      if (t3.flags & 32768) {
        Pu(t3, Rl);
        return;
      }
      e3 = t3.return;
      var n3 = Nc(t3.alternate, t3, Vl);
      if (n3 !== null) {
        Z = n3;
        return;
      }
      if (t3 = t3.sibling, t3 !== null) {
        Z = t3;
        return;
      }
      Z = t3 = e3;
    } while (t3 !== null);
    Hl === 0 && (Hl = 5);
  }
  function Pu(e3, t3) {
    do {
      var n3 = Pc(e3.alternate, e3);
      if (n3 !== null) {
        n3.flags &= 32767, Z = n3;
        return;
      }
      if (n3 = e3.return, n3 !== null && (n3.flags |= 32768, n3.subtreeFlags = 0, n3.deletions = null), !t3 && (e3 = e3.sibling, e3 !== null)) {
        Z = e3;
        return;
      }
      Z = e3 = n3;
    } while (e3 !== null);
    Hl = 6, Z = null;
  }
  function Fu(e3, t3, n3, r3, a3, o3, s3, c3, l3) {
    e3.cancelPendingCommit = null;
    do
      Bu();
    while (nu !== 0);
    if (X & 6) throw Error(i2(327));
    if (t3 !== null) {
      if (t3 === e3.current) throw Error(i2(177));
      if (o3 = t3.lanes | t3.childLanes, o3 |= Kr2, qe2(e3, n3, o3, s3, c3, l3), e3 === Fl && (Z = Fl = null, Q = 0), iu = t3, ru = e3, au = n3, ou = o3, su = a3, cu = r3, t3.subtreeFlags & 10256 || t3.flags & 10256 ? (e3.callbackNode = null, e3.callbackPriority = 0, Yu(De2, function() {
        return Vu(), null;
      })) : (e3.callbackNode = null, e3.callbackPriority = 0), r3 = !!(t3.flags & 13878), t3.subtreeFlags & 13878 || r3) {
        r3 = P2.T, P2.T = null, a3 = F2.p, F2.p = 2, s3 = X, X |= 4;
        try {
          el(e3, t3, n3);
        } finally {
          X = s3, F2.p = a3, P2.T = r3;
        }
      }
      nu = 1, Iu(), Lu(), Ru();
    }
  }
  function Iu() {
    if (nu === 1) {
      nu = 0;
      var e3 = ru, t3 = iu, n3 = !!(t3.flags & 13878);
      if (t3.subtreeFlags & 13878 || n3) {
        n3 = P2.T, P2.T = null;
        var r3 = F2.p;
        F2.p = 2;
        var i3 = X;
        X |= 4;
        try {
          pl(t3, e3);
          var a3 = zd, o3 = br2(e3.containerInfo), s3 = a3.focusedElem, c3 = a3.selectionRange;
          if (o3 !== s3 && s3 && s3.ownerDocument && yr2(s3.ownerDocument.documentElement, s3)) {
            if (c3 !== null && xr2(s3)) {
              var l3 = c3.start, u2 = c3.end;
              if (u2 === void 0 && (u2 = l3), `selectionStart` in s3) s3.selectionStart = l3, s3.selectionEnd = Math.min(u2, s3.value.length);
              else {
                var d3 = s3.ownerDocument || document, f2 = d3 && d3.defaultView || window;
                if (f2.getSelection) {
                  var p3 = f2.getSelection(), m2 = s3.textContent.length, h3 = Math.min(c3.start, m2), g3 = c3.end === void 0 ? h3 : Math.min(c3.end, m2);
                  !p3.extend && h3 > g3 && (o3 = g3, g3 = h3, h3 = o3);
                  var _3 = vr2(s3, h3), v3 = vr2(s3, g3);
                  if (_3 && v3 && (p3.rangeCount !== 1 || p3.anchorNode !== _3.node || p3.anchorOffset !== _3.offset || p3.focusNode !== v3.node || p3.focusOffset !== v3.offset)) {
                    var y3 = d3.createRange();
                    y3.setStart(_3.node, _3.offset), p3.removeAllRanges(), h3 > g3 ? (p3.addRange(y3), p3.extend(v3.node, v3.offset)) : (y3.setEnd(v3.node, v3.offset), p3.addRange(y3));
                  }
                }
              }
            }
            for (d3 = [], p3 = s3; p3 = p3.parentNode; ) p3.nodeType === 1 && d3.push({ element: p3, left: p3.scrollLeft, top: p3.scrollTop });
            for (typeof s3.focus == `function` && s3.focus(), s3 = 0; s3 < d3.length; s3++) {
              var b3 = d3[s3];
              b3.element.scrollLeft = b3.left, b3.element.scrollTop = b3.top;
            }
          }
          sp = !!Rd, zd = Rd = null;
        } finally {
          X = i3, F2.p = r3, P2.T = n3;
        }
      }
      e3.current = t3, nu = 2;
    }
  }
  function Lu() {
    if (nu === 2) {
      nu = 0;
      var e3 = ru, t3 = iu, n3 = !!(t3.flags & 8772);
      if (t3.subtreeFlags & 8772 || n3) {
        n3 = P2.T, P2.T = null;
        var r3 = F2.p;
        F2.p = 2;
        var i3 = X;
        X |= 4;
        try {
          tl(e3, t3.alternate, t3);
        } finally {
          X = i3, F2.p = r3, P2.T = n3;
        }
      }
      nu = 3;
    }
  }
  function Ru() {
    if (nu === 4 || nu === 3) {
      nu = 0, Se2();
      var e3 = ru, t3 = iu, n3 = au, r3 = cu;
      t3.subtreeFlags & 10256 || t3.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e3, e3.pendingLanes));
      var i3 = e3.pendingLanes;
      if (i3 === 0 && (tu = null), U2(n3), t3 = t3.stateNode, V2 && typeof V2.onCommitFiberRoot == `function`) try {
        V2.onCommitFiberRoot(Me2, t3, void 0, (t3.current.flags & 128) == 128);
      } catch {
      }
      if (r3 !== null) {
        t3 = P2.T, i3 = F2.p, F2.p = 2, P2.T = null;
        try {
          for (var a3 = e3.onRecoverableError, o3 = 0; o3 < r3.length; o3++) {
            var s3 = r3[o3];
            a3(s3.value, { componentStack: s3.stack });
          }
        } finally {
          P2.T = t3, F2.p = i3;
        }
      }
      au & 3 && Bu(), nd(e3), i3 = e3.pendingLanes, n3 & 261930 && i3 & 42 ? e3 === uu ? lu++ : (lu = 0, uu = e3) : lu = 0, rd(0, false);
    }
  }
  function zu(e3, t3) {
    (e3.pooledCacheLanes &= t3) === 0 && (t3 = e3.pooledCache, t3 != null && (e3.pooledCache = null, ta2(t3)));
  }
  function Bu() {
    return Iu(), Lu(), Ru(), Vu();
  }
  function Vu() {
    if (nu !== 5) return false;
    var e3 = ru, t3 = ou;
    ou = 0;
    var n3 = U2(au), r3 = P2.T, a3 = F2.p;
    try {
      F2.p = 32 > n3 ? 32 : n3, P2.T = null, n3 = su, su = null;
      var o3 = ru, s3 = au;
      if (nu = 0, iu = ru = null, au = 0, X & 6) throw Error(i2(331));
      var c3 = X;
      if (X |= 4, Al(o3.current), Sl(o3, o3.current, s3, n3), X = c3, rd(0, false), V2 && typeof V2.onPostCommitFiberRoot == `function`) try {
        V2.onPostCommitFiberRoot(Me2, o3);
      } catch {
      }
      return true;
    } finally {
      F2.p = a3, P2.T = r3, zu(e3, t3);
    }
  }
  function Hu(e3, t3, n3) {
    t3 = di2(n3, t3), t3 = Ks(e3.stateNode, t3, 2), e3 = J2(e3, t3, 2), e3 !== null && (Ke2(e3, 2), nd(e3));
  }
  function Uu(e3, t3, n3) {
    if (e3.tag === 3) Hu(e3, e3, n3);
    else for (; t3 !== null; ) {
      if (t3.tag === 3) {
        Hu(t3, e3, n3);
        break;
      }
      if (t3.tag === 1) {
        var r3 = t3.stateNode;
        if (typeof t3.type.getDerivedStateFromError == `function` || typeof r3.componentDidCatch == `function` && (tu === null || !tu.has(r3))) {
          e3 = di2(n3, e3), n3 = qs(2), r3 = J2(t3, n3, 2), r3 !== null && (Js(n3, r3, t3, e3), Ke2(r3, 2), nd(r3));
          break;
        }
      }
      t3 = t3.return;
    }
  }
  function Wu(e3, t3, n3) {
    var r3 = e3.pingCache;
    if (r3 === null) {
      r3 = e3.pingCache = new Pl();
      var i3 = /* @__PURE__ */ new Set();
      r3.set(t3, i3);
    } else i3 = r3.get(t3), i3 === void 0 && (i3 = /* @__PURE__ */ new Set(), r3.set(t3, i3));
    i3.has(n3) || (Bl = true, i3.add(n3), e3 = Gu.bind(null, e3, t3, n3), t3.then(e3, e3));
  }
  function Gu(e3, t3, n3) {
    var r3 = e3.pingCache;
    r3 !== null && r3.delete(t3), e3.pingedLanes |= e3.suspendedLanes & n3, e3.warmLanes &= ~n3, Fl === e3 && (Q & n3) === n3 && (Hl === 4 || Hl === 3 && (Q & 62914560) === Q && 300 > Ce2() - Zl ? !(X & 2) && bu(e3, 0) : Gl |= n3, ql === Q && (ql = 0)), nd(e3);
  }
  function Ku(e3, t3) {
    t3 === 0 && (t3 = We2()), e3 = Xr2(e3, t3), e3 !== null && (Ke2(e3, t3), nd(e3));
  }
  function qu(e3) {
    var t3 = e3.memoizedState, n3 = 0;
    t3 !== null && (n3 = t3.retryLane), Ku(e3, n3);
  }
  function Ju(e3, t3) {
    var n3 = 0;
    switch (e3.tag) {
      case 31:
      case 13:
        var r3 = e3.stateNode, a3 = e3.memoizedState;
        a3 !== null && (n3 = a3.retryLane);
        break;
      case 19:
        r3 = e3.stateNode;
        break;
      case 22:
        r3 = e3.stateNode._retryCache;
        break;
      default:
        throw Error(i2(314));
    }
    r3 !== null && r3.delete(t3), Ku(e3, n3);
  }
  function Yu(e3, t3) {
    return be2(e3, t3);
  }
  var Xu = null, Zu = null, Qu = false, $u = false, ed = false, td = 0;
  function nd(e3) {
    e3 !== Zu && e3.next === null && (Zu === null ? Xu = Zu = e3 : Zu = Zu.next = e3), $u = true, Qu || (Qu = true, ld());
  }
  function rd(e3, t3) {
    if (!ed && $u) {
      ed = true;
      do
        for (var n3 = false, r3 = Xu; r3 !== null; ) {
          if (!t3) {
            if (e3 !== 0) {
              var i3 = r3.pendingLanes;
              if (i3 === 0) var a3 = 0;
              else {
                var o3 = r3.suspendedLanes, s3 = r3.pingedLanes;
                a3 = (1 << 31 - Pe2(42 | e3) + 1) - 1, a3 &= i3 & ~(o3 & ~s3), a3 = a3 & 201326741 ? a3 & 201326741 | 1 : a3 ? a3 | 2 : 0;
              }
              a3 !== 0 && (n3 = true, cd(r3, a3));
            } else a3 = Q, a3 = He2(r3, r3 === Fl ? a3 : 0, r3.cancelPendingCommit !== null || r3.timeoutHandle !== -1), !(a3 & 3) || H2(r3, a3) || (n3 = true, cd(r3, a3));
          }
          r3 = r3.next;
        }
      while (n3);
      ed = false;
    }
  }
  function id() {
    ad();
  }
  function ad() {
    $u = Qu = false;
    var e3 = 0;
    td !== 0 && Gd() && (e3 = td);
    for (var t3 = Ce2(), n3 = null, r3 = Xu; r3 !== null; ) {
      var i3 = r3.next, a3 = od(r3, t3);
      a3 === 0 ? (r3.next = null, n3 === null ? Xu = i3 : n3.next = i3, i3 === null && (Zu = n3)) : (n3 = r3, (e3 !== 0 || a3 & 3) && ($u = true)), r3 = i3;
    }
    nu !== 0 && nu !== 5 || rd(e3, false), td !== 0 && (td = 0);
  }
  function od(e3, t3) {
    for (var n3 = e3.suspendedLanes, r3 = e3.pingedLanes, i3 = e3.expirationTimes, a3 = e3.pendingLanes & -62914561; 0 < a3; ) {
      var o3 = 31 - Pe2(a3), s3 = 1 << o3, c3 = i3[o3];
      c3 === -1 ? ((s3 & n3) === 0 || (s3 & r3) !== 0) && (i3[o3] = Ue2(s3, t3)) : c3 <= t3 && (e3.expiredLanes |= s3), a3 &= ~s3;
    }
    if (t3 = Fl, n3 = Q, n3 = He2(e3, e3 === t3 ? n3 : 0, e3.cancelPendingCommit !== null || e3.timeoutHandle !== -1), r3 = e3.callbackNode, n3 === 0 || e3 === t3 && (Il === 2 || Il === 9) || e3.cancelPendingCommit !== null) return r3 !== null && r3 !== null && xe2(r3), e3.callbackNode = null, e3.callbackPriority = 0;
    if (!(n3 & 3) || H2(e3, n3)) {
      if (t3 = n3 & -n3, t3 === e3.callbackPriority) return t3;
      switch (r3 !== null && xe2(r3), U2(n3)) {
        case 2:
        case 8:
          n3 = Ee2;
          break;
        case 32:
          n3 = De2;
          break;
        case 268435456:
          n3 = ke2;
          break;
        default:
          n3 = De2;
      }
      return r3 = sd.bind(null, e3), n3 = be2(n3, r3), e3.callbackPriority = t3, e3.callbackNode = n3, t3;
    }
    return r3 !== null && r3 !== null && xe2(r3), e3.callbackPriority = 2, e3.callbackNode = null, 2;
  }
  function sd(e3, t3) {
    if (nu !== 0 && nu !== 5) return e3.callbackNode = null, e3.callbackPriority = 0, null;
    var n3 = e3.callbackNode;
    if (Bu() && e3.callbackNode !== n3) return null;
    var r3 = Q;
    return r3 = He2(e3, e3 === Fl ? r3 : 0, e3.cancelPendingCommit !== null || e3.timeoutHandle !== -1), r3 === 0 ? null : (mu(e3, r3, t3), od(e3, Ce2()), e3.callbackNode != null && e3.callbackNode === n3 ? sd.bind(null, e3) : null);
  }
  function cd(e3, t3) {
    if (Bu()) return null;
    mu(e3, t3, true);
  }
  function ld() {
    Yd(function() {
      X & 6 ? be2(Te2, id) : ad();
    });
  }
  function ud() {
    if (td === 0) {
      var e3 = ia2;
      e3 === 0 && (e3 = Re2, Re2 <<= 1, !(Re2 & 261888) && (Re2 = 256)), td = e3;
    }
    return td;
  }
  function dd(e3) {
    return e3 == null || typeof e3 == `symbol` || typeof e3 == `boolean` ? null : typeof e3 == `function` ? e3 : qt2(`` + e3);
  }
  function fd(e3, t3) {
    var n3 = t3.ownerDocument.createElement(`input`);
    return n3.name = t3.name, n3.value = t3.value, e3.id && n3.setAttribute(`form`, e3.id), t3.parentNode.insertBefore(n3, t3), e3 = new FormData(e3), n3.parentNode.removeChild(n3), e3;
  }
  function pd(e3, t3, n3, r3, i3) {
    if (t3 === `submit` && n3 && n3.stateNode === i3) {
      var a3 = dd((i3[nt2] || null).action), o3 = r3.submitter;
      o3 && (t3 = (t3 = o3[nt2] || null) ? dd(t3.formAction) : o3.getAttribute(`formAction`), t3 !== null && (a3 = t3, o3 = null));
      var s3 = new gn2(`action`, `action`, null, r3, i3);
      e3.push({ event: s3, listeners: [{ instance: null, listener: function() {
        if (r3.defaultPrevented) {
          if (td !== 0) {
            var e4 = o3 ? fd(i3, o3) : new FormData(i3);
            vs(n3, { pending: true, data: e4, method: i3.method, action: a3 }, null, e4);
          }
        } else typeof a3 == `function` && (s3.preventDefault(), e4 = o3 ? fd(i3, o3) : new FormData(i3), vs(n3, { pending: true, data: e4, method: i3.method, action: a3 }, a3, e4));
      }, currentTarget: i3 }] });
    }
  }
  for (var md = 0; md < Vr2.length; md++) {
    var hd = Vr2[md];
    Hr2(hd.toLowerCase(), `on` + (hd[0].toUpperCase() + hd.slice(1)));
  }
  Hr2(Nr2, `onAnimationEnd`), Hr2(Pr2, `onAnimationIteration`), Hr2(Fr2, `onAnimationStart`), Hr2(`dblclick`, `onDoubleClick`), Hr2(`focusin`, `onFocus`), Hr2(`focusout`, `onBlur`), Hr2(Ir2, `onTransitionRun`), Hr2(Lr2, `onTransitionStart`), Hr2(Rr2, `onTransitionCancel`), Hr2(zr2, `onTransitionEnd`), vt2(`onMouseEnter`, [`mouseout`, `mouseover`]), vt2(`onMouseLeave`, [`mouseout`, `mouseover`]), vt2(`onPointerEnter`, [`pointerout`, `pointerover`]), vt2(`onPointerLeave`, [`pointerout`, `pointerover`]), _t2(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `)), _t2(`onSelect`, `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)), _t2(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]), _t2(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)), _t2(`onCompositionStart`, `compositionstart focusout keydown keypress keyup mousedown`.split(` `)), _t2(`onCompositionUpdate`, `compositionupdate focusout keydown keypress keyup mousedown`.split(` `));
  var gd = `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `), _d = new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));
  function vd(e3, t3) {
    t3 = !!(t3 & 4);
    for (var n3 = 0; n3 < e3.length; n3++) {
      var r3 = e3[n3], i3 = r3.event;
      r3 = r3.listeners;
      a: {
        var a3 = void 0;
        if (t3) for (var o3 = r3.length - 1; 0 <= o3; o3--) {
          var s3 = r3[o3], c3 = s3.instance, l3 = s3.currentTarget;
          if (s3 = s3.listener, c3 !== a3 && i3.isPropagationStopped()) break a;
          a3 = s3, i3.currentTarget = l3;
          try {
            a3(i3);
          } catch (e4) {
            Ur2(e4);
          }
          i3.currentTarget = null, a3 = c3;
        }
        else for (o3 = 0; o3 < r3.length; o3++) {
          if (s3 = r3[o3], c3 = s3.instance, l3 = s3.currentTarget, s3 = s3.listener, c3 !== a3 && i3.isPropagationStopped()) break a;
          a3 = s3, i3.currentTarget = l3;
          try {
            a3(i3);
          } catch (e4) {
            Ur2(e4);
          }
          i3.currentTarget = null, a3 = c3;
        }
      }
    }
  }
  function $(e3, t3) {
    var n3 = t3[it2];
    n3 === void 0 && (n3 = t3[it2] = /* @__PURE__ */ new Set());
    var r3 = e3 + `__bubble`;
    n3.has(r3) || (Sd(t3, e3, 2, false), n3.add(r3));
  }
  function yd(e3, t3, n3) {
    var r3 = 0;
    t3 && (r3 |= 4), Sd(n3, e3, r3, t3);
  }
  var bd = `_reactListening` + Math.random().toString(36).slice(2);
  function xd(e3) {
    if (!e3[bd]) {
      e3[bd] = true, ht2.forEach(function(t4) {
        t4 !== `selectionchange` && (_d.has(t4) || yd(t4, false, e3), yd(t4, true, e3));
      });
      var t3 = e3.nodeType === 9 ? e3 : e3.ownerDocument;
      t3 === null || t3[bd] || (t3[bd] = true, yd(`selectionchange`, false, t3));
    }
  }
  function Sd(e3, t3, n3, r3) {
    switch (mp(t3)) {
      case 2:
        var i3 = cp;
        break;
      case 8:
        i3 = lp;
        break;
      default:
        i3 = up;
    }
    n3 = i3.bind(null, t3, n3, e3), i3 = void 0, !an2 || t3 !== `touchstart` && t3 !== `touchmove` && t3 !== `wheel` || (i3 = true), r3 ? i3 === void 0 ? e3.addEventListener(t3, n3, true) : e3.addEventListener(t3, n3, { capture: true, passive: i3 }) : i3 === void 0 ? e3.addEventListener(t3, n3, false) : e3.addEventListener(t3, n3, { passive: i3 });
  }
  function Cd(e3, t3, n3, r3, i3) {
    var a3 = r3;
    if (!(t3 & 1) && !(t3 & 2) && r3 !== null) a: for (; ; ) {
      if (r3 === null) return;
      var s3 = r3.tag;
      if (s3 === 3 || s3 === 4) {
        var c3 = r3.stateNode.containerInfo;
        if (c3 === i3) break;
        if (s3 === 4) for (s3 = r3.return; s3 !== null; ) {
          var l3 = s3.tag;
          if ((l3 === 3 || l3 === 4) && s3.stateNode.containerInfo === i3) return;
          s3 = s3.return;
        }
        for (; c3 !== null; ) {
          if (s3 = ut2(c3), s3 === null) return;
          if (l3 = s3.tag, l3 === 5 || l3 === 6 || l3 === 26 || l3 === 27) {
            r3 = a3 = s3;
            continue a;
          }
          c3 = c3.parentNode;
        }
      }
      r3 = r3.return;
    }
    tn2(function() {
      var r4 = a3, i4 = Xt2(n3), s4 = [];
      a: {
        var c4 = Br2.get(e3);
        if (c4 !== void 0) {
          var l4 = gn2, u2 = e3;
          switch (e3) {
            case `keypress`:
              if (dn2(n3) === 0) break a;
            case `keydown`:
            case `keyup`:
              l4 = Pn2;
              break;
            case `focusin`:
              u2 = `focus`, l4 = Tn2;
              break;
            case `focusout`:
              u2 = `blur`, l4 = Tn2;
              break;
            case `beforeblur`:
            case `afterblur`:
              l4 = Tn2;
              break;
            case `click`:
              if (n3.button === 2) break a;
            case `auxclick`:
            case `dblclick`:
            case `mousedown`:
            case `mousemove`:
            case `mouseup`:
            case `mouseout`:
            case `mouseover`:
            case `contextmenu`:
              l4 = Cn2;
              break;
            case `drag`:
            case `dragend`:
            case `dragenter`:
            case `dragexit`:
            case `dragleave`:
            case `dragover`:
            case `dragstart`:
            case `drop`:
              l4 = wn2;
              break;
            case `touchcancel`:
            case `touchend`:
            case `touchmove`:
            case `touchstart`:
              l4 = In2;
              break;
            case Nr2:
            case Pr2:
            case Fr2:
              l4 = En2;
              break;
            case zr2:
              l4 = Ln2;
              break;
            case `scroll`:
            case `scrollend`:
              l4 = vn2;
              break;
            case `wheel`:
              l4 = Rn2;
              break;
            case `copy`:
            case `cut`:
            case `paste`:
              l4 = Dn2;
              break;
            case `gotpointercapture`:
            case `lostpointercapture`:
            case `pointercancel`:
            case `pointerdown`:
            case `pointermove`:
            case `pointerout`:
            case `pointerover`:
            case `pointerup`:
              l4 = Fn2;
              break;
            case `toggle`:
            case `beforetoggle`:
              l4 = zn2;
          }
          var d3 = !!(t3 & 4), f2 = !d3 && (e3 === `scroll` || e3 === `scrollend`), p3 = d3 ? c4 === null ? null : c4 + `Capture` : c4;
          d3 = [];
          for (var m2 = r4, h3; m2 !== null; ) {
            var g3 = m2;
            if (h3 = g3.stateNode, g3 = g3.tag, g3 !== 5 && g3 !== 26 && g3 !== 27 || h3 === null || p3 === null || (g3 = nn2(m2, p3), g3 != null && d3.push(wd(m2, g3, h3))), f2) break;
            m2 = m2.return;
          }
          0 < d3.length && (c4 = new l4(c4, u2, null, n3, i4), s4.push({ event: c4, listeners: d3 }));
        }
      }
      if (!(t3 & 7)) {
        a: {
          if (c4 = e3 === `mouseover` || e3 === `pointerover`, l4 = e3 === `mouseout` || e3 === `pointerout`, c4 && n3 !== Yt2 && (u2 = n3.relatedTarget || n3.fromElement) && (ut2(u2) || u2[rt2])) break a;
          if ((l4 || c4) && (c4 = i4.window === i4 ? i4 : (c4 = i4.ownerDocument) ? c4.defaultView || c4.parentWindow : window, l4 ? (u2 = n3.relatedTarget || n3.toElement, l4 = r4, u2 = u2 ? ut2(u2) : null, u2 !== null && (f2 = o2(u2), d3 = u2.tag, u2 !== f2 || d3 !== 5 && d3 !== 27 && d3 !== 6) && (u2 = null)) : (l4 = null, u2 = r4), l4 !== u2)) {
            if (d3 = Cn2, g3 = `onMouseLeave`, p3 = `onMouseEnter`, m2 = `mouse`, (e3 === `pointerout` || e3 === `pointerover`) && (d3 = Fn2, g3 = `onPointerLeave`, p3 = `onPointerEnter`, m2 = `pointer`), f2 = l4 == null ? c4 : ft2(l4), h3 = u2 == null ? c4 : ft2(u2), c4 = new d3(g3, m2 + `leave`, l4, n3, i4), c4.target = f2, c4.relatedTarget = h3, g3 = null, ut2(i4) === r4 && (d3 = new d3(p3, m2 + `enter`, u2, n3, i4), d3.target = h3, d3.relatedTarget = f2, g3 = d3), f2 = g3, l4 && u2) b: {
              for (d3 = Ed, p3 = l4, m2 = u2, h3 = 0, g3 = p3; g3; g3 = d3(g3)) h3++;
              g3 = 0;
              for (var _3 = m2; _3; _3 = d3(_3)) g3++;
              for (; 0 < h3 - g3; ) p3 = d3(p3), h3--;
              for (; 0 < g3 - h3; ) m2 = d3(m2), g3--;
              for (; h3--; ) {
                if (p3 === m2 || m2 !== null && p3 === m2.alternate) {
                  d3 = p3;
                  break b;
                }
                p3 = d3(p3), m2 = d3(m2);
              }
              d3 = null;
            }
            else d3 = null;
            l4 !== null && Dd(s4, c4, l4, d3, false), u2 !== null && f2 !== null && Dd(s4, f2, u2, d3, true);
          }
        }
        a: {
          if (c4 = r4 ? ft2(r4) : window, l4 = c4.nodeName && c4.nodeName.toLowerCase(), l4 === `select` || l4 === `input` && c4.type === `file`) var v3 = rr2;
          else if (G2(c4)) {
            if (ir2) v3 = pr2;
            else {
              v3 = dr2;
              var y3 = ur2;
            }
          } else l4 = c4.nodeName, !l4 || l4.toLowerCase() !== `input` || c4.type !== `checkbox` && c4.type !== `radio` ? r4 && Wt2(r4.elementType) && (v3 = rr2) : v3 = fr2;
          if (v3 &&= v3(e3, r4)) {
            Qn2(s4, v3, n3, i4);
            break a;
          }
          y3 && y3(e3, c4, r4), e3 === `focusout` && r4 && c4.type === `number` && r4.memoizedProps.value != null && It2(c4, `number`, c4.value);
        }
        switch (y3 = r4 ? ft2(r4) : window, e3) {
          case `focusin`:
            (G2(y3) || y3.contentEditable === `true`) && (Cr2 = y3, wr2 = r4, Tr2 = null);
            break;
          case `focusout`:
            Tr2 = wr2 = Cr2 = null;
            break;
          case `mousedown`:
            Er2 = true;
            break;
          case `contextmenu`:
          case `mouseup`:
          case `dragend`:
            Er2 = false, Dr2(s4, n3, i4);
            break;
          case `selectionchange`:
            if (Sr2) break;
          case `keydown`:
          case `keyup`:
            Dr2(s4, n3, i4);
        }
        var b3;
        if (Vn2) b: {
          switch (e3) {
            case `compositionstart`:
              var x3 = `onCompositionStart`;
              break b;
            case `compositionend`:
              x3 = `onCompositionEnd`;
              break b;
            case `compositionupdate`:
              x3 = `onCompositionUpdate`;
              break b;
          }
          x3 = void 0;
        }
        else Yn2 ? qn2(e3, n3) && (x3 = `onCompositionEnd`) : e3 === `keydown` && n3.keyCode === 229 && (x3 = `onCompositionStart`);
        x3 && (Wn2 && n3.locale !== `ko` && (Yn2 || x3 !== `onCompositionStart` ? x3 === `onCompositionEnd` && Yn2 && (b3 = un2()) : (sn2 = i4, cn2 = `value` in sn2 ? sn2.value : sn2.textContent, Yn2 = true)), y3 = Td(r4, x3), 0 < y3.length && (x3 = new On2(x3, e3, null, n3, i4), s4.push({ event: x3, listeners: y3 }), b3 ? x3.data = b3 : (b3 = Jn2(n3), b3 !== null && (x3.data = b3)))), (b3 = Un2 ? Xn2(e3, n3) : Zn2(e3, n3)) && (x3 = Td(r4, `onBeforeInput`), 0 < x3.length && (y3 = new On2(`onBeforeInput`, `beforeinput`, null, n3, i4), s4.push({ event: y3, listeners: x3 }), y3.data = b3)), pd(s4, e3, r4, n3, i4);
      }
      vd(s4, t3);
    });
  }
  function wd(e3, t3, n3) {
    return { instance: e3, listener: t3, currentTarget: n3 };
  }
  function Td(e3, t3) {
    for (var n3 = t3 + `Capture`, r3 = []; e3 !== null; ) {
      var i3 = e3, a3 = i3.stateNode;
      if (i3 = i3.tag, i3 !== 5 && i3 !== 26 && i3 !== 27 || a3 === null || (i3 = nn2(e3, n3), i3 != null && r3.unshift(wd(e3, i3, a3)), i3 = nn2(e3, t3), i3 != null && r3.push(wd(e3, i3, a3))), e3.tag === 3) return r3;
      e3 = e3.return;
    }
    return [];
  }
  function Ed(e3) {
    if (e3 === null) return null;
    do
      e3 = e3.return;
    while (e3 && e3.tag !== 5 && e3.tag !== 27);
    return e3 || null;
  }
  function Dd(e3, t3, n3, r3, i3) {
    for (var a3 = t3._reactName, o3 = []; n3 !== null && n3 !== r3; ) {
      var s3 = n3, c3 = s3.alternate, l3 = s3.stateNode;
      if (s3 = s3.tag, c3 !== null && c3 === r3) break;
      s3 !== 5 && s3 !== 26 && s3 !== 27 || l3 === null || (c3 = l3, i3 ? (l3 = nn2(n3, a3), l3 != null && o3.unshift(wd(n3, l3, c3))) : i3 || (l3 = nn2(n3, a3), l3 != null && o3.push(wd(n3, l3, c3)))), n3 = n3.return;
    }
    o3.length !== 0 && e3.push({ event: t3, listeners: o3 });
  }
  var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
  function Ad(e3) {
    return (typeof e3 == `string` ? e3 : `` + e3).replace(Od, `
`).replace(kd, ``);
  }
  function jd(e3, t3) {
    return t3 = Ad(t3), Ad(e3) === t3;
  }
  function Md(e3, t3, n3, r3, a3, o3) {
    switch (n3) {
      case `children`:
        typeof r3 == `string` ? t3 === `body` || t3 === `textarea` && r3 === `` || Bt2(e3, r3) : (typeof r3 == `number` || typeof r3 == `bigint`) && t3 !== `body` && Bt2(e3, `` + r3);
        break;
      case `className`:
        wt2(e3, `class`, r3);
        break;
      case `tabIndex`:
        wt2(e3, `tabindex`, r3);
        break;
      case `dir`:
      case `role`:
      case `viewBox`:
      case `width`:
      case `height`:
        wt2(e3, n3, r3);
        break;
      case `style`:
        Ut2(e3, r3, o3);
        break;
      case `data`:
        if (t3 !== `object`) {
          wt2(e3, `data`, r3);
          break;
        }
      case `src`:
      case `href`:
        if (r3 === `` && (t3 !== `a` || n3 !== `href`)) {
          e3.removeAttribute(n3);
          break;
        }
        if (r3 == null || typeof r3 == `function` || typeof r3 == `symbol` || typeof r3 == `boolean`) {
          e3.removeAttribute(n3);
          break;
        }
        r3 = qt2(`` + r3), e3.setAttribute(n3, r3);
        break;
      case `action`:
      case `formAction`:
        if (typeof r3 == `function`) {
          e3.setAttribute(n3, `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);
          break;
        }
        if (typeof o3 == `function` && (n3 === `formAction` ? (t3 !== `input` && Md(e3, t3, `name`, a3.name, a3, null), Md(e3, t3, `formEncType`, a3.formEncType, a3, null), Md(e3, t3, `formMethod`, a3.formMethod, a3, null), Md(e3, t3, `formTarget`, a3.formTarget, a3, null)) : (Md(e3, t3, `encType`, a3.encType, a3, null), Md(e3, t3, `method`, a3.method, a3, null), Md(e3, t3, `target`, a3.target, a3, null))), r3 == null || typeof r3 == `symbol` || typeof r3 == `boolean`) {
          e3.removeAttribute(n3);
          break;
        }
        r3 = qt2(`` + r3), e3.setAttribute(n3, r3);
        break;
      case `onClick`:
        r3 != null && (e3.onclick = Jt2);
        break;
      case `onScroll`:
        r3 != null && $(`scroll`, e3);
        break;
      case `onScrollEnd`:
        r3 != null && $(`scrollend`, e3);
        break;
      case `dangerouslySetInnerHTML`:
        if (r3 != null) {
          if (typeof r3 != `object` || !(`__html` in r3)) throw Error(i2(61));
          if (n3 = r3.__html, n3 != null) {
            if (a3.children != null) throw Error(i2(60));
            e3.innerHTML = n3;
          }
        }
        break;
      case `multiple`:
        e3.multiple = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
        break;
      case `muted`:
        e3.muted = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
        break;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `defaultValue`:
      case `defaultChecked`:
      case `innerHTML`:
      case `ref`:
        break;
      case `autoFocus`:
        break;
      case `xlinkHref`:
        if (r3 == null || typeof r3 == `function` || typeof r3 == `boolean` || typeof r3 == `symbol`) {
          e3.removeAttribute(`xlink:href`);
          break;
        }
        n3 = qt2(`` + r3), e3.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n3);
        break;
      case `contentEditable`:
      case `spellCheck`:
      case `draggable`:
      case `value`:
      case `autoReverse`:
      case `externalResourcesRequired`:
      case `focusable`:
      case `preserveAlpha`:
        r3 != null && typeof r3 != `function` && typeof r3 != `symbol` ? e3.setAttribute(n3, `` + r3) : e3.removeAttribute(n3);
        break;
      case `inert`:
      case `allowFullScreen`:
      case `async`:
      case `autoPlay`:
      case `controls`:
      case `default`:
      case `defer`:
      case `disabled`:
      case `disablePictureInPicture`:
      case `disableRemotePlayback`:
      case `formNoValidate`:
      case `hidden`:
      case `loop`:
      case `noModule`:
      case `noValidate`:
      case `open`:
      case `playsInline`:
      case `readOnly`:
      case `required`:
      case `reversed`:
      case `scoped`:
      case `seamless`:
      case `itemScope`:
        r3 && typeof r3 != `function` && typeof r3 != `symbol` ? e3.setAttribute(n3, ``) : e3.removeAttribute(n3);
        break;
      case `capture`:
      case `download`:
        true === r3 ? e3.setAttribute(n3, ``) : false !== r3 && r3 != null && typeof r3 != `function` && typeof r3 != `symbol` ? e3.setAttribute(n3, r3) : e3.removeAttribute(n3);
        break;
      case `cols`:
      case `rows`:
      case `size`:
      case `span`:
        r3 != null && typeof r3 != `function` && typeof r3 != `symbol` && !isNaN(r3) && 1 <= r3 ? e3.setAttribute(n3, r3) : e3.removeAttribute(n3);
        break;
      case `rowSpan`:
      case `start`:
        r3 == null || typeof r3 == `function` || typeof r3 == `symbol` || isNaN(r3) ? e3.removeAttribute(n3) : e3.setAttribute(n3, r3);
        break;
      case `popover`:
        $(`beforetoggle`, e3), $(`toggle`, e3), Ct2(e3, `popover`, r3);
        break;
      case `xlinkActuate`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r3);
        break;
      case `xlinkArcrole`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r3);
        break;
      case `xlinkRole`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:role`, r3);
        break;
      case `xlinkShow`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:show`, r3);
        break;
      case `xlinkTitle`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:title`, r3);
        break;
      case `xlinkType`:
        Tt2(e3, `http://www.w3.org/1999/xlink`, `xlink:type`, r3);
        break;
      case `xmlBase`:
        Tt2(e3, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r3);
        break;
      case `xmlLang`:
        Tt2(e3, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r3);
        break;
      case `xmlSpace`:
        Tt2(e3, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r3);
        break;
      case `is`:
        Ct2(e3, `is`, r3);
        break;
      case `innerText`:
      case `textContent`:
        break;
      default:
        (!(2 < n3.length) || n3[0] !== `o` && n3[0] !== `O` || n3[1] !== `n` && n3[1] !== `N`) && (n3 = Gt2.get(n3) || n3, Ct2(e3, n3, r3));
    }
  }
  function Nd(e3, t3, n3, r3, a3, o3) {
    switch (n3) {
      case `style`:
        Ut2(e3, r3, o3);
        break;
      case `dangerouslySetInnerHTML`:
        if (r3 != null) {
          if (typeof r3 != `object` || !(`__html` in r3)) throw Error(i2(61));
          if (n3 = r3.__html, n3 != null) {
            if (a3.children != null) throw Error(i2(60));
            e3.innerHTML = n3;
          }
        }
        break;
      case `children`:
        typeof r3 == `string` ? Bt2(e3, r3) : (typeof r3 == `number` || typeof r3 == `bigint`) && Bt2(e3, `` + r3);
        break;
      case `onScroll`:
        r3 != null && $(`scroll`, e3);
        break;
      case `onScrollEnd`:
        r3 != null && $(`scrollend`, e3);
        break;
      case `onClick`:
        r3 != null && (e3.onclick = Jt2);
        break;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `innerHTML`:
      case `ref`:
        break;
      case `innerText`:
      case `textContent`:
        break;
      default:
        if (!gt2.hasOwnProperty(n3)) a: {
          if (n3[0] === `o` && n3[1] === `n` && (a3 = n3.endsWith(`Capture`), t3 = n3.slice(2, a3 ? n3.length - 7 : void 0), o3 = e3[nt2] || null, o3 = o3 == null ? null : o3[n3], typeof o3 == `function` && e3.removeEventListener(t3, o3, a3), typeof r3 == `function`)) {
            typeof o3 != `function` && o3 !== null && (n3 in e3 ? e3[n3] = null : e3.hasAttribute(n3) && e3.removeAttribute(n3)), e3.addEventListener(t3, r3, a3);
            break a;
          }
          n3 in e3 ? e3[n3] = r3 : true === r3 ? e3.setAttribute(n3, ``) : Ct2(e3, n3, r3);
        }
    }
  }
  function Pd(e3, t3, n3) {
    switch (t3) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `img`:
        $(`error`, e3), $(`load`, e3);
        var r3 = false, a3 = false, o3;
        for (o3 in n3) if (n3.hasOwnProperty(o3)) {
          var s3 = n3[o3];
          if (s3 != null) switch (o3) {
            case `src`:
              r3 = true;
              break;
            case `srcSet`:
              a3 = true;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              throw Error(i2(137, t3));
            default:
              Md(e3, t3, o3, s3, n3, null);
          }
        }
        a3 && Md(e3, t3, `srcSet`, n3.srcSet, n3, null), r3 && Md(e3, t3, `src`, n3.src, n3, null);
        return;
      case `input`:
        $(`invalid`, e3);
        var c3 = o3 = s3 = a3 = null, l3 = null, u2 = null;
        for (r3 in n3) if (n3.hasOwnProperty(r3)) {
          var d3 = n3[r3];
          if (d3 != null) switch (r3) {
            case `name`:
              a3 = d3;
              break;
            case `type`:
              s3 = d3;
              break;
            case `checked`:
              l3 = d3;
              break;
            case `defaultChecked`:
              u2 = d3;
              break;
            case `value`:
              o3 = d3;
              break;
            case `defaultValue`:
              c3 = d3;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              if (d3 != null) throw Error(i2(137, t3));
              break;
            default:
              Md(e3, t3, r3, d3, n3, null);
          }
        }
        Ft2(e3, o3, c3, l3, u2, s3, a3, false);
        return;
      case `select`:
        for (a3 in $(`invalid`, e3), r3 = s3 = o3 = null, n3) if (n3.hasOwnProperty(a3) && (c3 = n3[a3], c3 != null)) switch (a3) {
          case `value`:
            o3 = c3;
            break;
          case `defaultValue`:
            s3 = c3;
            break;
          case `multiple`:
            r3 = c3;
          default:
            Md(e3, t3, a3, c3, n3, null);
        }
        t3 = o3, n3 = s3, e3.multiple = !!r3, t3 == null ? n3 != null && Lt2(e3, !!r3, n3, true) : Lt2(e3, !!r3, t3, false);
        return;
      case `textarea`:
        for (s3 in $(`invalid`, e3), o3 = a3 = r3 = null, n3) if (n3.hasOwnProperty(s3) && (c3 = n3[s3], c3 != null)) switch (s3) {
          case `value`:
            r3 = c3;
            break;
          case `defaultValue`:
            a3 = c3;
            break;
          case `children`:
            o3 = c3;
            break;
          case `dangerouslySetInnerHTML`:
            if (c3 != null) throw Error(i2(91));
            break;
          default:
            Md(e3, t3, s3, c3, n3, null);
        }
        zt2(e3, r3, a3, o3);
        return;
      case `option`:
        for (l3 in n3) if (n3.hasOwnProperty(l3) && (r3 = n3[l3], r3 != null)) switch (l3) {
          case `selected`:
            e3.selected = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
            break;
          default:
            Md(e3, t3, l3, r3, n3, null);
        }
        return;
      case `dialog`:
        $(`beforetoggle`, e3), $(`toggle`, e3), $(`cancel`, e3), $(`close`, e3);
        break;
      case `iframe`:
      case `object`:
        $(`load`, e3);
        break;
      case `video`:
      case `audio`:
        for (r3 = 0; r3 < gd.length; r3++) $(gd[r3], e3);
        break;
      case `image`:
        $(`error`, e3), $(`load`, e3);
        break;
      case `details`:
        $(`toggle`, e3);
        break;
      case `embed`:
      case `source`:
      case `link`:
        $(`error`, e3), $(`load`, e3);
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (u2 in n3) if (n3.hasOwnProperty(u2) && (r3 = n3[u2], r3 != null)) switch (u2) {
          case `children`:
          case `dangerouslySetInnerHTML`:
            throw Error(i2(137, t3));
          default:
            Md(e3, t3, u2, r3, n3, null);
        }
        return;
      default:
        if (Wt2(t3)) {
          for (d3 in n3) n3.hasOwnProperty(d3) && (r3 = n3[d3], r3 !== void 0 && Nd(e3, t3, d3, r3, n3, void 0));
          return;
        }
    }
    for (c3 in n3) n3.hasOwnProperty(c3) && (r3 = n3[c3], r3 != null && Md(e3, t3, c3, r3, n3, null));
  }
  function Fd(e3, t3, n3, r3) {
    switch (t3) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `input`:
        var a3 = null, o3 = null, s3 = null, c3 = null, l3 = null, u2 = null, d3 = null;
        for (m2 in n3) {
          var f2 = n3[m2];
          if (n3.hasOwnProperty(m2) && f2 != null) switch (m2) {
            case `checked`:
              break;
            case `value`:
              break;
            case `defaultValue`:
              l3 = f2;
            default:
              r3.hasOwnProperty(m2) || Md(e3, t3, m2, null, r3, f2);
          }
        }
        for (var p3 in r3) {
          var m2 = r3[p3];
          if (f2 = n3[p3], r3.hasOwnProperty(p3) && (m2 != null || f2 != null)) switch (p3) {
            case `type`:
              o3 = m2;
              break;
            case `name`:
              a3 = m2;
              break;
            case `checked`:
              u2 = m2;
              break;
            case `defaultChecked`:
              d3 = m2;
              break;
            case `value`:
              s3 = m2;
              break;
            case `defaultValue`:
              c3 = m2;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              if (m2 != null) throw Error(i2(137, t3));
              break;
            default:
              m2 !== f2 && Md(e3, t3, p3, m2, r3, f2);
          }
        }
        Pt2(e3, s3, c3, l3, u2, d3, o3, a3);
        return;
      case `select`:
        for (o3 in m2 = s3 = c3 = p3 = null, n3) if (l3 = n3[o3], n3.hasOwnProperty(o3) && l3 != null) switch (o3) {
          case `value`:
            break;
          case `multiple`:
            m2 = l3;
          default:
            r3.hasOwnProperty(o3) || Md(e3, t3, o3, null, r3, l3);
        }
        for (a3 in r3) if (o3 = r3[a3], l3 = n3[a3], r3.hasOwnProperty(a3) && (o3 != null || l3 != null)) switch (a3) {
          case `value`:
            p3 = o3;
            break;
          case `defaultValue`:
            c3 = o3;
            break;
          case `multiple`:
            s3 = o3;
          default:
            o3 !== l3 && Md(e3, t3, a3, o3, r3, l3);
        }
        t3 = c3, n3 = s3, r3 = m2, p3 == null ? !!r3 != !!n3 && (t3 == null ? Lt2(e3, !!n3, n3 ? [] : ``, false) : Lt2(e3, !!n3, t3, true)) : Lt2(e3, !!n3, p3, false);
        return;
      case `textarea`:
        for (c3 in m2 = p3 = null, n3) if (a3 = n3[c3], n3.hasOwnProperty(c3) && a3 != null && !r3.hasOwnProperty(c3)) switch (c3) {
          case `value`:
            break;
          case `children`:
            break;
          default:
            Md(e3, t3, c3, null, r3, a3);
        }
        for (s3 in r3) if (a3 = r3[s3], o3 = n3[s3], r3.hasOwnProperty(s3) && (a3 != null || o3 != null)) switch (s3) {
          case `value`:
            p3 = a3;
            break;
          case `defaultValue`:
            m2 = a3;
            break;
          case `children`:
            break;
          case `dangerouslySetInnerHTML`:
            if (a3 != null) throw Error(i2(91));
            break;
          default:
            a3 !== o3 && Md(e3, t3, s3, a3, r3, o3);
        }
        Rt2(e3, p3, m2);
        return;
      case `option`:
        for (var h3 in n3) if (p3 = n3[h3], n3.hasOwnProperty(h3) && p3 != null && !r3.hasOwnProperty(h3)) switch (h3) {
          case `selected`:
            e3.selected = false;
            break;
          default:
            Md(e3, t3, h3, null, r3, p3);
        }
        for (l3 in r3) if (p3 = r3[l3], m2 = n3[l3], r3.hasOwnProperty(l3) && p3 !== m2 && (p3 != null || m2 != null)) switch (l3) {
          case `selected`:
            e3.selected = p3 && typeof p3 != `function` && typeof p3 != `symbol`;
            break;
          default:
            Md(e3, t3, l3, p3, r3, m2);
        }
        return;
      case `img`:
      case `link`:
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `embed`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `source`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (var g3 in n3) p3 = n3[g3], n3.hasOwnProperty(g3) && p3 != null && !r3.hasOwnProperty(g3) && Md(e3, t3, g3, null, r3, p3);
        for (u2 in r3) if (p3 = r3[u2], m2 = n3[u2], r3.hasOwnProperty(u2) && p3 !== m2 && (p3 != null || m2 != null)) switch (u2) {
          case `children`:
          case `dangerouslySetInnerHTML`:
            if (p3 != null) throw Error(i2(137, t3));
            break;
          default:
            Md(e3, t3, u2, p3, r3, m2);
        }
        return;
      default:
        if (Wt2(t3)) {
          for (var _3 in n3) p3 = n3[_3], n3.hasOwnProperty(_3) && p3 !== void 0 && !r3.hasOwnProperty(_3) && Nd(e3, t3, _3, void 0, r3, p3);
          for (d3 in r3) p3 = r3[d3], m2 = n3[d3], !r3.hasOwnProperty(d3) || p3 === m2 || p3 === void 0 && m2 === void 0 || Nd(e3, t3, d3, p3, r3, m2);
          return;
        }
    }
    for (var v3 in n3) p3 = n3[v3], n3.hasOwnProperty(v3) && p3 != null && !r3.hasOwnProperty(v3) && Md(e3, t3, v3, null, r3, p3);
    for (f2 in r3) p3 = r3[f2], m2 = n3[f2], !r3.hasOwnProperty(f2) || p3 === m2 || p3 == null && m2 == null || Md(e3, t3, f2, p3, r3, m2);
  }
  function Id(e3) {
    switch (e3) {
      case `css`:
      case `script`:
      case `font`:
      case `img`:
      case `image`:
      case `input`:
      case `link`:
        return true;
      default:
        return false;
    }
  }
  function Ld() {
    if (typeof performance.getEntriesByType == `function`) {
      for (var e3 = 0, t3 = 0, n3 = performance.getEntriesByType(`resource`), r3 = 0; r3 < n3.length; r3++) {
        var i3 = n3[r3], a3 = i3.transferSize, o3 = i3.initiatorType, s3 = i3.duration;
        if (a3 && s3 && Id(o3)) {
          for (o3 = 0, s3 = i3.responseEnd, r3 += 1; r3 < n3.length; r3++) {
            var c3 = n3[r3], l3 = c3.startTime;
            if (l3 > s3) break;
            var u2 = c3.transferSize, d3 = c3.initiatorType;
            u2 && Id(d3) && (c3 = c3.responseEnd, o3 += u2 * (c3 < s3 ? 1 : (s3 - l3) / (c3 - l3)));
          }
          if (--r3, t3 += 8 * (a3 + o3) / (i3.duration / 1e3), e3++, 10 < e3) break;
        }
      }
      if (0 < e3) return t3 / e3 / 1e6;
    }
    return navigator.connection && (e3 = navigator.connection.downlink, typeof e3 == `number`) ? e3 : 5;
  }
  var Rd = null, zd = null;
  function Bd(e3) {
    return e3.nodeType === 9 ? e3 : e3.ownerDocument;
  }
  function Vd(e3) {
    switch (e3) {
      case `http://www.w3.org/2000/svg`:
        return 1;
      case `http://www.w3.org/1998/Math/MathML`:
        return 2;
      default:
        return 0;
    }
  }
  function Hd(e3, t3) {
    if (e3 === 0) switch (t3) {
      case `svg`:
        return 1;
      case `math`:
        return 2;
      default:
        return 0;
    }
    return e3 === 1 && t3 === `foreignObject` ? 0 : e3;
  }
  function Ud(e3, t3) {
    return e3 === `textarea` || e3 === `noscript` || typeof t3.children == `string` || typeof t3.children == `number` || typeof t3.children == `bigint` || typeof t3.dangerouslySetInnerHTML == `object` && t3.dangerouslySetInnerHTML !== null && t3.dangerouslySetInnerHTML.__html != null;
  }
  var Wd = null;
  function Gd() {
    var e3 = window.event;
    return e3 && e3.type === `popstate` ? e3 !== Wd && (Wd = e3, true) : (Wd = null, false);
  }
  var Kd = typeof setTimeout == `function` ? setTimeout : void 0, qd = typeof clearTimeout == `function` ? clearTimeout : void 0, Jd = typeof Promise == `function` ? Promise : void 0, Yd = typeof queueMicrotask == `function` ? queueMicrotask : Jd === void 0 ? Kd : function(e3) {
    return Jd.resolve(null).then(e3).catch(Xd);
  };
  function Xd(e3) {
    setTimeout(function() {
      throw e3;
    });
  }
  function Zd(e3) {
    return e3 === `head`;
  }
  function Qd(e3, t3) {
    var n3 = t3, r3 = 0;
    do {
      var i3 = n3.nextSibling;
      if (e3.removeChild(n3), i3 && i3.nodeType === 8) {
        if (n3 = i3.data, n3 === `/$` || n3 === `/&`) {
          if (r3 === 0) {
            e3.removeChild(i3), Np(t3);
            return;
          }
          r3--;
        } else if (n3 === `$` || n3 === `$?` || n3 === `$~` || n3 === `$!` || n3 === `&`) r3++;
        else if (n3 === `html`) pf(e3.ownerDocument.documentElement);
        else if (n3 === `head`) {
          n3 = e3.ownerDocument.head, pf(n3);
          for (var a3 = n3.firstChild; a3; ) {
            var o3 = a3.nextSibling, s3 = a3.nodeName;
            a3[ct2] || s3 === `SCRIPT` || s3 === `STYLE` || s3 === `LINK` && a3.rel.toLowerCase() === `stylesheet` || n3.removeChild(a3), a3 = o3;
          }
        } else n3 === `body` && pf(e3.ownerDocument.body);
      }
      n3 = i3;
    } while (n3);
    Np(t3);
  }
  function $d(e3, t3) {
    var n3 = e3;
    e3 = 0;
    do {
      var r3 = n3.nextSibling;
      if (n3.nodeType === 1 ? t3 ? (n3._stashedDisplay = n3.style.display, n3.style.display = `none`) : (n3.style.display = n3._stashedDisplay || ``, n3.getAttribute(`style`) === `` && n3.removeAttribute(`style`)) : n3.nodeType === 3 && (t3 ? (n3._stashedText = n3.nodeValue, n3.nodeValue = ``) : n3.nodeValue = n3._stashedText || ``), r3 && r3.nodeType === 8) {
        if (n3 = r3.data, n3 === `/$`) {
          if (e3 === 0) break;
          e3--;
        } else n3 !== `$` && n3 !== `$?` && n3 !== `$~` && n3 !== `$!` || e3++;
      }
      n3 = r3;
    } while (n3);
  }
  function ef(e3) {
    var t3 = e3.firstChild;
    for (t3 && t3.nodeType === 10 && (t3 = t3.nextSibling); t3; ) {
      var n3 = t3;
      switch (t3 = t3.nextSibling, n3.nodeName) {
        case `HTML`:
        case `HEAD`:
        case `BODY`:
          ef(n3), lt2(n3);
          continue;
        case `SCRIPT`:
        case `STYLE`:
          continue;
        case `LINK`:
          if (n3.rel.toLowerCase() === `stylesheet`) continue;
      }
      e3.removeChild(n3);
    }
  }
  function tf(e3, t3, n3, r3) {
    for (; e3.nodeType === 1; ) {
      var i3 = n3;
      if (e3.nodeName.toLowerCase() !== t3.toLowerCase()) {
        if (!r3 && (e3.nodeName !== `INPUT` || e3.type !== `hidden`)) break;
      } else if (!r3) {
        if (t3 === `input` && e3.type === `hidden`) {
          var a3 = i3.name == null ? null : `` + i3.name;
          if (i3.type === `hidden` && e3.getAttribute(`name`) === a3) return e3;
        } else return e3;
      } else if (!e3[ct2]) switch (t3) {
        case `meta`:
          if (!e3.hasAttribute(`itemprop`)) break;
          return e3;
        case `link`:
          if (a3 = e3.getAttribute(`rel`), a3 === `stylesheet` && e3.hasAttribute(`data-precedence`) || a3 !== i3.rel || e3.getAttribute(`href`) !== (i3.href == null || i3.href === `` ? null : i3.href) || e3.getAttribute(`crossorigin`) !== (i3.crossOrigin == null ? null : i3.crossOrigin) || e3.getAttribute(`title`) !== (i3.title == null ? null : i3.title)) break;
          return e3;
        case `style`:
          if (e3.hasAttribute(`data-precedence`)) break;
          return e3;
        case `script`:
          if (a3 = e3.getAttribute(`src`), (a3 !== (i3.src == null ? null : i3.src) || e3.getAttribute(`type`) !== (i3.type == null ? null : i3.type) || e3.getAttribute(`crossorigin`) !== (i3.crossOrigin == null ? null : i3.crossOrigin)) && a3 && e3.hasAttribute(`async`) && !e3.hasAttribute(`itemprop`)) break;
          return e3;
        default:
          return e3;
      }
      if (e3 = cf(e3.nextSibling), e3 === null) break;
    }
    return null;
  }
  function nf(e3, t3, n3) {
    if (t3 === ``) return null;
    for (; e3.nodeType !== 3; ) if ((e3.nodeType !== 1 || e3.nodeName !== `INPUT` || e3.type !== `hidden`) && !n3 || (e3 = cf(e3.nextSibling), e3 === null)) return null;
    return e3;
  }
  function rf(e3, t3) {
    for (; e3.nodeType !== 8; ) if ((e3.nodeType !== 1 || e3.nodeName !== `INPUT` || e3.type !== `hidden`) && !t3 || (e3 = cf(e3.nextSibling), e3 === null)) return null;
    return e3;
  }
  function af(e3) {
    return e3.data === `$?` || e3.data === `$~`;
  }
  function of(e3) {
    return e3.data === `$!` || e3.data === `$?` && e3.ownerDocument.readyState !== `loading`;
  }
  function sf(e3, t3) {
    var n3 = e3.ownerDocument;
    if (e3.data === `$~`) e3._reactRetry = t3;
    else if (e3.data !== `$?` || n3.readyState !== `loading`) t3();
    else {
      var r3 = function() {
        t3(), n3.removeEventListener(`DOMContentLoaded`, r3);
      };
      n3.addEventListener(`DOMContentLoaded`, r3), e3._reactRetry = r3;
    }
  }
  function cf(e3) {
    for (; e3 != null; e3 = e3.nextSibling) {
      var t3 = e3.nodeType;
      if (t3 === 1 || t3 === 3) break;
      if (t3 === 8) {
        if (t3 = e3.data, t3 === `$` || t3 === `$!` || t3 === `$?` || t3 === `$~` || t3 === `&` || t3 === `F!` || t3 === `F`) break;
        if (t3 === `/$` || t3 === `/&`) return null;
      }
    }
    return e3;
  }
  var lf = null;
  function uf(e3) {
    e3 = e3.nextSibling;
    for (var t3 = 0; e3; ) {
      if (e3.nodeType === 8) {
        var n3 = e3.data;
        if (n3 === `/$` || n3 === `/&`) {
          if (t3 === 0) return cf(e3.nextSibling);
          t3--;
        } else n3 !== `$` && n3 !== `$!` && n3 !== `$?` && n3 !== `$~` && n3 !== `&` || t3++;
      }
      e3 = e3.nextSibling;
    }
    return null;
  }
  function df(e3) {
    e3 = e3.previousSibling;
    for (var t3 = 0; e3; ) {
      if (e3.nodeType === 8) {
        var n3 = e3.data;
        if (n3 === `$` || n3 === `$!` || n3 === `$?` || n3 === `$~` || n3 === `&`) {
          if (t3 === 0) return e3;
          t3--;
        } else n3 !== `/$` && n3 !== `/&` || t3++;
      }
      e3 = e3.previousSibling;
    }
    return null;
  }
  function ff(e3, t3, n3) {
    switch (t3 = Bd(n3), e3) {
      case `html`:
        if (e3 = t3.documentElement, !e3) throw Error(i2(452));
        return e3;
      case `head`:
        if (e3 = t3.head, !e3) throw Error(i2(453));
        return e3;
      case `body`:
        if (e3 = t3.body, !e3) throw Error(i2(454));
        return e3;
      default:
        throw Error(i2(451));
    }
  }
  function pf(e3) {
    for (var t3 = e3.attributes; t3.length; ) e3.removeAttributeNode(t3[0]);
    lt2(e3);
  }
  var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
  function gf(e3) {
    return typeof e3.getRootNode == `function` ? e3.getRootNode() : e3.nodeType === 9 ? e3 : e3.ownerDocument;
  }
  var _f = F2.d;
  F2.d = { f: vf, r: yf, D: Sf, C: Cf, L: wf, m: Tf, X: Df, S: Ef, M: Of };
  function vf() {
    var e3 = _f.f(), t3 = vu();
    return e3 || t3;
  }
  function yf(e3) {
    var t3 = dt2(e3);
    t3 !== null && t3.tag === 5 && t3.type === `form` ? bs(t3) : _f.r(e3);
  }
  var bf = typeof document > `u` ? null : document;
  function xf(e3, t3, n3) {
    var r3 = bf;
    if (r3 && typeof t3 == `string` && t3) {
      var i3 = Nt2(t3);
      i3 = `link[rel="` + e3 + `"][href="` + i3 + `"]`, typeof n3 == `string` && (i3 += `[crossorigin="` + n3 + `"]`), hf.has(i3) || (hf.add(i3), e3 = { rel: e3, crossOrigin: n3, href: t3 }, r3.querySelector(i3) === null && (t3 = r3.createElement(`link`), Pd(t3, `link`, e3), mt2(t3), r3.head.appendChild(t3)));
    }
  }
  function Sf(e3) {
    _f.D(e3), xf(`dns-prefetch`, e3, null);
  }
  function Cf(e3, t3) {
    _f.C(e3, t3), xf(`preconnect`, e3, t3);
  }
  function wf(e3, t3, n3) {
    _f.L(e3, t3, n3);
    var r3 = bf;
    if (r3 && e3 && t3) {
      var i3 = `link[rel="preload"][as="` + Nt2(t3) + `"]`;
      t3 === `image` && n3 && n3.imageSrcSet ? (i3 += `[imagesrcset="` + Nt2(n3.imageSrcSet) + `"]`, typeof n3.imageSizes == `string` && (i3 += `[imagesizes="` + Nt2(n3.imageSizes) + `"]`)) : i3 += `[href="` + Nt2(e3) + `"]`;
      var a3 = i3;
      switch (t3) {
        case `style`:
          a3 = Af(e3);
          break;
        case `script`:
          a3 = Pf(e3);
      }
      mf.has(a3) || (e3 = h2({ rel: `preload`, href: t3 === `image` && n3 && n3.imageSrcSet ? void 0 : e3, as: t3 }, n3), mf.set(a3, e3), r3.querySelector(i3) !== null || t3 === `style` && r3.querySelector(jf(a3)) || t3 === `script` && r3.querySelector(Ff(a3)) || (t3 = r3.createElement(`link`), Pd(t3, `link`, e3), mt2(t3), r3.head.appendChild(t3)));
    }
  }
  function Tf(e3, t3) {
    _f.m(e3, t3);
    var n3 = bf;
    if (n3 && e3) {
      var r3 = t3 && typeof t3.as == `string` ? t3.as : `script`, i3 = `link[rel="modulepreload"][as="` + Nt2(r3) + `"][href="` + Nt2(e3) + `"]`, a3 = i3;
      switch (r3) {
        case `audioworklet`:
        case `paintworklet`:
        case `serviceworker`:
        case `sharedworker`:
        case `worker`:
        case `script`:
          a3 = Pf(e3);
      }
      if (!mf.has(a3) && (e3 = h2({ rel: `modulepreload`, href: e3 }, t3), mf.set(a3, e3), n3.querySelector(i3) === null)) {
        switch (r3) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            if (n3.querySelector(Ff(a3))) return;
        }
        r3 = n3.createElement(`link`), Pd(r3, `link`, e3), mt2(r3), n3.head.appendChild(r3);
      }
    }
  }
  function Ef(e3, t3, n3) {
    _f.S(e3, t3, n3);
    var r3 = bf;
    if (r3 && e3) {
      var i3 = pt2(r3).hoistableStyles, a3 = Af(e3);
      t3 ||= `default`;
      var o3 = i3.get(a3);
      if (!o3) {
        var s3 = { loading: 0, preload: null };
        if (o3 = r3.querySelector(jf(a3))) s3.loading = 5;
        else {
          e3 = h2({ rel: `stylesheet`, href: e3, "data-precedence": t3 }, n3), (n3 = mf.get(a3)) && Rf(e3, n3);
          var c3 = o3 = r3.createElement(`link`);
          mt2(c3), Pd(c3, `link`, e3), c3._p = new Promise(function(e4, t4) {
            c3.onload = e4, c3.onerror = t4;
          }), c3.addEventListener(`load`, function() {
            s3.loading |= 1;
          }), c3.addEventListener(`error`, function() {
            s3.loading |= 2;
          }), s3.loading |= 4, Lf(o3, t3, r3);
        }
        o3 = { type: `stylesheet`, instance: o3, count: 1, state: s3 }, i3.set(a3, o3);
      }
    }
  }
  function Df(e3, t3) {
    _f.X(e3, t3);
    var n3 = bf;
    if (n3 && e3) {
      var r3 = pt2(n3).hoistableScripts, i3 = Pf(e3), a3 = r3.get(i3);
      a3 || (a3 = n3.querySelector(Ff(i3)), a3 || (e3 = h2({ src: e3, async: true }, t3), (t3 = mf.get(i3)) && zf(e3, t3), a3 = n3.createElement(`script`), mt2(a3), Pd(a3, `link`, e3), n3.head.appendChild(a3)), a3 = { type: `script`, instance: a3, count: 1, state: null }, r3.set(i3, a3));
    }
  }
  function Of(e3, t3) {
    _f.M(e3, t3);
    var n3 = bf;
    if (n3 && e3) {
      var r3 = pt2(n3).hoistableScripts, i3 = Pf(e3), a3 = r3.get(i3);
      a3 || (a3 = n3.querySelector(Ff(i3)), a3 || (e3 = h2({ src: e3, async: true, type: `module` }, t3), (t3 = mf.get(i3)) && zf(e3, t3), a3 = n3.createElement(`script`), mt2(a3), Pd(a3, `link`, e3), n3.head.appendChild(a3)), a3 = { type: `script`, instance: a3, count: 1, state: null }, r3.set(i3, a3));
    }
  }
  function kf(e3, t3, n3, r3) {
    var a3 = (a3 = ce2.current) ? gf(a3) : null;
    if (!a3) throw Error(i2(446));
    switch (e3) {
      case `meta`:
      case `title`:
        return null;
      case `style`:
        return typeof n3.precedence == `string` && typeof n3.href == `string` ? (t3 = Af(n3.href), n3 = pt2(a3).hoistableStyles, r3 = n3.get(t3), r3 || (r3 = { type: `style`, instance: null, count: 0, state: null }, n3.set(t3, r3)), r3) : { type: `void`, instance: null, count: 0, state: null };
      case `link`:
        if (n3.rel === `stylesheet` && typeof n3.href == `string` && typeof n3.precedence == `string`) {
          e3 = Af(n3.href);
          var o3 = pt2(a3).hoistableStyles, s3 = o3.get(e3);
          if (s3 || (a3 = a3.ownerDocument || a3, s3 = { type: `stylesheet`, instance: null, count: 0, state: { loading: 0, preload: null } }, o3.set(e3, s3), (o3 = a3.querySelector(jf(e3))) && !o3._p && (s3.instance = o3, s3.state.loading = 5), mf.has(e3) || (n3 = { rel: `preload`, as: `style`, href: n3.href, crossOrigin: n3.crossOrigin, integrity: n3.integrity, media: n3.media, hrefLang: n3.hrefLang, referrerPolicy: n3.referrerPolicy }, mf.set(e3, n3), o3 || Nf(a3, e3, n3, s3.state))), t3 && r3 === null) throw Error(i2(528, ``));
          return s3;
        }
        if (t3 && r3 !== null) throw Error(i2(529, ``));
        return null;
      case `script`:
        return t3 = n3.async, n3 = n3.src, typeof n3 == `string` && t3 && typeof t3 != `function` && typeof t3 != `symbol` ? (t3 = Pf(n3), n3 = pt2(a3).hoistableScripts, r3 = n3.get(t3), r3 || (r3 = { type: `script`, instance: null, count: 0, state: null }, n3.set(t3, r3)), r3) : { type: `void`, instance: null, count: 0, state: null };
      default:
        throw Error(i2(444, e3));
    }
  }
  function Af(e3) {
    return `href="` + Nt2(e3) + `"`;
  }
  function jf(e3) {
    return `link[rel="stylesheet"][` + e3 + `]`;
  }
  function Mf(e3) {
    return h2({}, e3, { "data-precedence": e3.precedence, precedence: null });
  }
  function Nf(e3, t3, n3, r3) {
    e3.querySelector(`link[rel="preload"][as="style"][` + t3 + `]`) ? r3.loading = 1 : (t3 = e3.createElement(`link`), r3.preload = t3, t3.addEventListener(`load`, function() {
      return r3.loading |= 1;
    }), t3.addEventListener(`error`, function() {
      return r3.loading |= 2;
    }), Pd(t3, `link`, n3), mt2(t3), e3.head.appendChild(t3));
  }
  function Pf(e3) {
    return `[src="` + Nt2(e3) + `"]`;
  }
  function Ff(e3) {
    return `script[async]` + e3;
  }
  function If(e3, t3, n3) {
    if (t3.count++, t3.instance === null) switch (t3.type) {
      case `style`:
        var r3 = e3.querySelector(`style[data-href~="` + Nt2(n3.href) + `"]`);
        if (r3) return t3.instance = r3, mt2(r3), r3;
        var a3 = h2({}, n3, { "data-href": n3.href, "data-precedence": n3.precedence, href: null, precedence: null });
        return r3 = (e3.ownerDocument || e3).createElement(`style`), mt2(r3), Pd(r3, `style`, a3), Lf(r3, n3.precedence, e3), t3.instance = r3;
      case `stylesheet`:
        a3 = Af(n3.href);
        var o3 = e3.querySelector(jf(a3));
        if (o3) return t3.state.loading |= 4, t3.instance = o3, mt2(o3), o3;
        r3 = Mf(n3), (a3 = mf.get(a3)) && Rf(r3, a3), o3 = (e3.ownerDocument || e3).createElement(`link`), mt2(o3);
        var s3 = o3;
        return s3._p = new Promise(function(e4, t4) {
          s3.onload = e4, s3.onerror = t4;
        }), Pd(o3, `link`, r3), t3.state.loading |= 4, Lf(o3, n3.precedence, e3), t3.instance = o3;
      case `script`:
        return o3 = Pf(n3.src), (a3 = e3.querySelector(Ff(o3))) ? (t3.instance = a3, mt2(a3), a3) : (r3 = n3, (a3 = mf.get(o3)) && (r3 = h2({}, n3), zf(r3, a3)), e3 = e3.ownerDocument || e3, a3 = e3.createElement(`script`), mt2(a3), Pd(a3, `link`, r3), e3.head.appendChild(a3), t3.instance = a3);
      case `void`:
        return null;
      default:
        throw Error(i2(443, t3.type));
    }
    else t3.type === `stylesheet` && !(t3.state.loading & 4) && (r3 = t3.instance, t3.state.loading |= 4, Lf(r3, n3.precedence, e3));
    return t3.instance;
  }
  function Lf(e3, t3, n3) {
    for (var r3 = n3.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`), i3 = r3.length ? r3[r3.length - 1] : null, a3 = i3, o3 = 0; o3 < r3.length; o3++) {
      var s3 = r3[o3];
      if (s3.dataset.precedence === t3) a3 = s3;
      else if (a3 !== i3) break;
    }
    a3 ? a3.parentNode.insertBefore(e3, a3.nextSibling) : (t3 = n3.nodeType === 9 ? n3.head : n3, t3.insertBefore(e3, t3.firstChild));
  }
  function Rf(e3, t3) {
    e3.crossOrigin ??= t3.crossOrigin, e3.referrerPolicy ??= t3.referrerPolicy, e3.title ??= t3.title;
  }
  function zf(e3, t3) {
    e3.crossOrigin ??= t3.crossOrigin, e3.referrerPolicy ??= t3.referrerPolicy, e3.integrity ??= t3.integrity;
  }
  var Bf = null;
  function Vf(e3, t3, n3) {
    if (Bf === null) {
      var r3 = /* @__PURE__ */ new Map(), i3 = Bf = /* @__PURE__ */ new Map();
      i3.set(n3, r3);
    } else i3 = Bf, r3 = i3.get(n3), r3 || (r3 = /* @__PURE__ */ new Map(), i3.set(n3, r3));
    if (r3.has(e3)) return r3;
    for (r3.set(e3, null), n3 = n3.getElementsByTagName(e3), i3 = 0; i3 < n3.length; i3++) {
      var a3 = n3[i3];
      if (!(a3[ct2] || a3[tt2] || e3 === `link` && a3.getAttribute(`rel`) === `stylesheet`) && a3.namespaceURI !== `http://www.w3.org/2000/svg`) {
        var o3 = a3.getAttribute(t3) || ``;
        o3 = e3 + o3;
        var s3 = r3.get(o3);
        s3 ? s3.push(a3) : r3.set(o3, [a3]);
      }
    }
    return r3;
  }
  function Hf(e3, t3, n3) {
    e3 = e3.ownerDocument || e3, e3.head.insertBefore(n3, t3 === `title` ? e3.querySelector(`head > title`) : null);
  }
  function Uf(e3, t3, n3) {
    if (n3 === 1 || t3.itemProp != null) return false;
    switch (e3) {
      case `meta`:
      case `title`:
        return true;
      case `style`:
        if (typeof t3.precedence != `string` || typeof t3.href != `string` || t3.href === ``) break;
        return true;
      case `link`:
        if (typeof t3.rel != `string` || typeof t3.href != `string` || t3.href === `` || t3.onLoad || t3.onError) break;
        switch (t3.rel) {
          case `stylesheet`:
            return e3 = t3.disabled, typeof t3.precedence == `string` && e3 == null;
          default:
            return true;
        }
      case `script`:
        if (t3.async && typeof t3.async != `function` && typeof t3.async != `symbol` && !t3.onLoad && !t3.onError && t3.src && typeof t3.src == `string`) return true;
    }
    return false;
  }
  function Wf(e3) {
    return !(e3.type === `stylesheet` && !(e3.state.loading & 3));
  }
  function Gf(e3, t3, n3, r3) {
    if (n3.type === `stylesheet` && (typeof r3.media != `string` || false !== matchMedia(r3.media).matches) && !(n3.state.loading & 4)) {
      if (n3.instance === null) {
        var i3 = Af(r3.href), a3 = t3.querySelector(jf(i3));
        if (a3) {
          t3 = a3._p, typeof t3 == `object` && t3 && typeof t3.then == `function` && (e3.count++, e3 = Jf.bind(e3), t3.then(e3, e3)), n3.state.loading |= 4, n3.instance = a3, mt2(a3);
          return;
        }
        a3 = t3.ownerDocument || t3, r3 = Mf(r3), (i3 = mf.get(i3)) && Rf(r3, i3), a3 = a3.createElement(`link`), mt2(a3);
        var o3 = a3;
        o3._p = new Promise(function(e4, t4) {
          o3.onload = e4, o3.onerror = t4;
        }), Pd(a3, `link`, r3), n3.instance = a3;
      }
      e3.stylesheets === null && (e3.stylesheets = /* @__PURE__ */ new Map()), e3.stylesheets.set(n3, t3), (t3 = n3.state.preload) && !(n3.state.loading & 3) && (e3.count++, n3 = Jf.bind(e3), t3.addEventListener(`load`, n3), t3.addEventListener(`error`, n3));
    }
  }
  var Kf = 0;
  function qf(e3, t3) {
    return e3.stylesheets && e3.count === 0 && Xf(e3, e3.stylesheets), 0 < e3.count || 0 < e3.imgCount ? function(n3) {
      var r3 = setTimeout(function() {
        if (e3.stylesheets && Xf(e3, e3.stylesheets), e3.unsuspend) {
          var t4 = e3.unsuspend;
          e3.unsuspend = null, t4();
        }
      }, 6e4 + t3);
      0 < e3.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
      var i3 = setTimeout(function() {
        if (e3.waitingForImages = false, e3.count === 0 && (e3.stylesheets && Xf(e3, e3.stylesheets), e3.unsuspend)) {
          var t4 = e3.unsuspend;
          e3.unsuspend = null, t4();
        }
      }, (e3.imgBytes > Kf ? 50 : 800) + t3);
      return e3.unsuspend = n3, function() {
        e3.unsuspend = null, clearTimeout(r3), clearTimeout(i3);
      };
    } : null;
  }
  function Jf() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Xf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e3 = this.unsuspend;
        this.unsuspend = null, e3();
      }
    }
  }
  var Yf = null;
  function Xf(e3, t3) {
    e3.stylesheets = null, e3.unsuspend !== null && (e3.count++, Yf = /* @__PURE__ */ new Map(), t3.forEach(Zf, e3), Yf = null, Jf.call(e3));
  }
  function Zf(e3, t3) {
    if (!(t3.state.loading & 4)) {
      var n3 = Yf.get(e3);
      if (n3) var r3 = n3.get(null);
      else {
        n3 = /* @__PURE__ */ new Map(), Yf.set(e3, n3);
        for (var i3 = e3.querySelectorAll(`link[data-precedence],style[data-precedence]`), a3 = 0; a3 < i3.length; a3++) {
          var o3 = i3[a3];
          (o3.nodeName === `LINK` || o3.getAttribute(`media`) !== `not all`) && (n3.set(o3.dataset.precedence, o3), r3 = o3);
        }
        r3 && n3.set(null, r3);
      }
      i3 = t3.instance, o3 = i3.getAttribute(`data-precedence`), a3 = n3.get(o3) || r3, a3 === r3 && n3.set(null, i3), n3.set(o3, i3), this.count++, r3 = Jf.bind(this), i3.addEventListener(`load`, r3), i3.addEventListener(`error`, r3), a3 ? a3.parentNode.insertBefore(i3, a3.nextSibling) : (e3 = e3.nodeType === 9 ? e3.head : e3, e3.insertBefore(i3, e3.firstChild)), t3.state.loading |= 4;
    }
  }
  var Qf = { $$typeof: C2, Provider: null, Consumer: null, _currentValue: ne2, _currentValue2: ne2, _threadCount: 0 };
  function $f(e3, t3, n3, r3, i3, a3, o3, s3, c3) {
    this.tag = 1, this.containerInfo = e3, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ge2(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ge2(0), this.hiddenUpdates = Ge2(null), this.identifierPrefix = r3, this.onUncaughtError = i3, this.onCaughtError = a3, this.onRecoverableError = o3, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c3, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ep(e3, t3, n3, r3, i3, a3, o3, s3, c3, l3, u2, d3) {
    return e3 = new $f(e3, t3, n3, o3, c3, l3, u2, d3, s3), t3 = 1, true === a3 && (t3 |= 24), a3 = ti2(3, null, null, t3), e3.current = a3, a3.stateNode = e3, t3 = ea2(), t3.refCount++, e3.pooledCache = t3, t3.refCount++, a3.memoizedState = { element: r3, isDehydrated: n3, cache: t3 }, Na2(a3), e3;
  }
  function tp(e3) {
    return e3 ? (e3 = $r2, e3) : $r2;
  }
  function np(e3, t3, n3, r3, i3, a3) {
    i3 = tp(i3), r3.context === null ? r3.context = i3 : r3.pendingContext = i3, r3 = Fa2(t3), r3.payload = { element: n3 }, a3 = a3 === void 0 ? null : a3, a3 !== null && (r3.callback = a3), n3 = J2(e3, r3, t3), n3 !== null && (pu(n3, e3, t3), Ia2(n3, e3, t3));
  }
  function rp(e3, t3) {
    if (e3 = e3.memoizedState, e3 !== null && e3.dehydrated !== null) {
      var n3 = e3.retryLane;
      e3.retryLane = n3 !== 0 && n3 < t3 ? n3 : t3;
    }
  }
  function ip(e3, t3) {
    rp(e3, t3), (e3 = e3.alternate) && rp(e3, t3);
  }
  function ap(e3) {
    if (e3.tag === 13 || e3.tag === 31) {
      var t3 = Xr2(e3, 67108864);
      t3 !== null && pu(t3, e3, 67108864), ip(e3, 67108864);
    }
  }
  function op(e3) {
    if (e3.tag === 13 || e3.tag === 31) {
      var t3 = du();
      t3 = Ze2(t3);
      var n3 = Xr2(e3, t3);
      n3 !== null && pu(n3, e3, t3), ip(e3, t3);
    }
  }
  var sp = true;
  function cp(e3, t3, n3, r3) {
    var i3 = P2.T;
    P2.T = null;
    var a3 = F2.p;
    try {
      F2.p = 2, up(e3, t3, n3, r3);
    } finally {
      F2.p = a3, P2.T = i3;
    }
  }
  function lp(e3, t3, n3, r3) {
    var i3 = P2.T;
    P2.T = null;
    var a3 = F2.p;
    try {
      F2.p = 8, up(e3, t3, n3, r3);
    } finally {
      F2.p = a3, P2.T = i3;
    }
  }
  function up(e3, t3, n3, r3) {
    if (sp) {
      var i3 = dp(r3);
      if (i3 === null) Cd(e3, t3, r3, fp, n3), Cp(e3, r3);
      else if (Tp(i3, e3, t3, n3, r3)) r3.stopPropagation();
      else if (Cp(e3, r3), t3 & 4 && -1 < Sp.indexOf(e3)) {
        for (; i3 !== null; ) {
          var a3 = dt2(i3);
          if (a3 !== null) switch (a3.tag) {
            case 3:
              if (a3 = a3.stateNode, a3.current.memoizedState.isDehydrated) {
                var o3 = Ve2(a3.pendingLanes);
                if (o3 !== 0) {
                  var s3 = a3;
                  for (s3.pendingLanes |= 2, s3.entangledLanes |= 2; o3; ) {
                    var c3 = 1 << 31 - Pe2(o3);
                    s3.entanglements[1] |= c3, o3 &= ~c3;
                  }
                  nd(a3), !(X & 6) && ($l = Ce2() + 500, rd(0, false));
                }
              }
              break;
            case 31:
            case 13:
              s3 = Xr2(a3, 2), s3 !== null && pu(s3, a3, 2), vu(), ip(a3, 2);
          }
          if (a3 = dp(r3), a3 === null && Cd(e3, t3, r3, fp, n3), a3 === i3) break;
          i3 = a3;
        }
        i3 !== null && r3.stopPropagation();
      } else Cd(e3, t3, r3, null, n3);
    }
  }
  function dp(e3) {
    return e3 = Xt2(e3), pp(e3);
  }
  var fp = null;
  function pp(e3) {
    if (fp = null, e3 = ut2(e3), e3 !== null) {
      var t3 = o2(e3);
      if (t3 === null) e3 = null;
      else {
        var n3 = t3.tag;
        if (n3 === 13) {
          if (e3 = s2(t3), e3 !== null) return e3;
          e3 = null;
        } else if (n3 === 31) {
          if (e3 = c2(t3), e3 !== null) return e3;
          e3 = null;
        } else if (n3 === 3) {
          if (t3.stateNode.current.memoizedState.isDehydrated) return t3.tag === 3 ? t3.stateNode.containerInfo : null;
          e3 = null;
        } else t3 !== e3 && (e3 = null);
      }
    }
    return fp = e3, null;
  }
  function mp(e3) {
    switch (e3) {
      case `beforetoggle`:
      case `cancel`:
      case `click`:
      case `close`:
      case `contextmenu`:
      case `copy`:
      case `cut`:
      case `auxclick`:
      case `dblclick`:
      case `dragend`:
      case `dragstart`:
      case `drop`:
      case `focusin`:
      case `focusout`:
      case `input`:
      case `invalid`:
      case `keydown`:
      case `keypress`:
      case `keyup`:
      case `mousedown`:
      case `mouseup`:
      case `paste`:
      case `pause`:
      case `play`:
      case `pointercancel`:
      case `pointerdown`:
      case `pointerup`:
      case `ratechange`:
      case `reset`:
      case `resize`:
      case `seeked`:
      case `submit`:
      case `toggle`:
      case `touchcancel`:
      case `touchend`:
      case `touchstart`:
      case `volumechange`:
      case `change`:
      case `selectionchange`:
      case `textInput`:
      case `compositionstart`:
      case `compositionend`:
      case `compositionupdate`:
      case `beforeblur`:
      case `afterblur`:
      case `beforeinput`:
      case `blur`:
      case `fullscreenchange`:
      case `focus`:
      case `hashchange`:
      case `popstate`:
      case `select`:
      case `selectstart`:
        return 2;
      case `drag`:
      case `dragenter`:
      case `dragexit`:
      case `dragleave`:
      case `dragover`:
      case `mousemove`:
      case `mouseout`:
      case `mouseover`:
      case `pointermove`:
      case `pointerout`:
      case `pointerover`:
      case `scroll`:
      case `touchmove`:
      case `wheel`:
      case `mouseenter`:
      case `mouseleave`:
      case `pointerenter`:
      case `pointerleave`:
        return 8;
      case `message`:
        switch (we2()) {
          case Te2:
            return 2;
          case Ee2:
            return 8;
          case De2:
          case Oe2:
            return 32;
          case ke2:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hp = false, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);
  function Cp(e3, t3) {
    switch (e3) {
      case `focusin`:
      case `focusout`:
        gp = null;
        break;
      case `dragenter`:
      case `dragleave`:
        _p = null;
        break;
      case `mouseover`:
      case `mouseout`:
        vp = null;
        break;
      case `pointerover`:
      case `pointerout`:
        yp.delete(t3.pointerId);
        break;
      case `gotpointercapture`:
      case `lostpointercapture`:
        bp.delete(t3.pointerId);
    }
  }
  function wp(e3, t3, n3, r3, i3, a3) {
    return e3 === null || e3.nativeEvent !== a3 ? (e3 = { blockedOn: t3, domEventName: n3, eventSystemFlags: r3, nativeEvent: a3, targetContainers: [i3] }, t3 !== null && (t3 = dt2(t3), t3 !== null && ap(t3)), e3) : (e3.eventSystemFlags |= r3, t3 = e3.targetContainers, i3 !== null && t3.indexOf(i3) === -1 && t3.push(i3), e3);
  }
  function Tp(e3, t3, n3, r3, i3) {
    switch (t3) {
      case `focusin`:
        return gp = wp(gp, e3, t3, n3, r3, i3), true;
      case `dragenter`:
        return _p = wp(_p, e3, t3, n3, r3, i3), true;
      case `mouseover`:
        return vp = wp(vp, e3, t3, n3, r3, i3), true;
      case `pointerover`:
        var a3 = i3.pointerId;
        return yp.set(a3, wp(yp.get(a3) || null, e3, t3, n3, r3, i3)), true;
      case `gotpointercapture`:
        return a3 = i3.pointerId, bp.set(a3, wp(bp.get(a3) || null, e3, t3, n3, r3, i3)), true;
    }
    return false;
  }
  function Ep(e3) {
    var t3 = ut2(e3.target);
    if (t3 !== null) {
      var n3 = o2(t3);
      if (n3 !== null) {
        if (t3 = n3.tag, t3 === 13) {
          if (t3 = s2(n3), t3 !== null) {
            e3.blockedOn = t3, $e2(e3.priority, function() {
              op(n3);
            });
            return;
          }
        } else if (t3 === 31) {
          if (t3 = c2(n3), t3 !== null) {
            e3.blockedOn = t3, $e2(e3.priority, function() {
              op(n3);
            });
            return;
          }
        } else if (t3 === 3 && n3.stateNode.current.memoizedState.isDehydrated) {
          e3.blockedOn = n3.tag === 3 ? n3.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e3.blockedOn = null;
  }
  function Dp(e3) {
    if (e3.blockedOn !== null) return false;
    for (var t3 = e3.targetContainers; 0 < t3.length; ) {
      var n3 = dp(e3.nativeEvent);
      if (n3 === null) {
        n3 = e3.nativeEvent;
        var r3 = new n3.constructor(n3.type, n3);
        Yt2 = r3, n3.target.dispatchEvent(r3), Yt2 = null;
      } else return t3 = dt2(n3), t3 !== null && ap(t3), e3.blockedOn = n3, false;
      t3.shift();
    }
    return true;
  }
  function Op(e3, t3, n3) {
    Dp(e3) && n3.delete(t3);
  }
  function kp() {
    hp = false, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
  }
  function Ap(e3, n3) {
    e3.blockedOn === n3 && (e3.blockedOn = null, hp || (hp = true, t2.unstable_scheduleCallback(t2.unstable_NormalPriority, kp)));
  }
  var jp = null;
  function Mp(e3) {
    jp !== e3 && (jp = e3, t2.unstable_scheduleCallback(t2.unstable_NormalPriority, function() {
      jp === e3 && (jp = null);
      for (var t3 = 0; t3 < e3.length; t3 += 3) {
        var n3 = e3[t3], r3 = e3[t3 + 1], i3 = e3[t3 + 2];
        if (typeof r3 != `function`) {
          if (pp(r3 || n3) === null) continue;
          break;
        }
        var a3 = dt2(n3);
        a3 !== null && (e3.splice(t3, 3), t3 -= 3, vs(a3, { pending: true, data: i3, method: n3.method, action: r3 }, r3, i3));
      }
    }));
  }
  function Np(e3) {
    function t3(t4) {
      return Ap(t4, e3);
    }
    gp !== null && Ap(gp, e3), _p !== null && Ap(_p, e3), vp !== null && Ap(vp, e3), yp.forEach(t3), bp.forEach(t3);
    for (var n3 = 0; n3 < xp.length; n3++) {
      var r3 = xp[n3];
      r3.blockedOn === e3 && (r3.blockedOn = null);
    }
    for (; 0 < xp.length && (n3 = xp[0], n3.blockedOn === null); ) Ep(n3), n3.blockedOn === null && xp.shift();
    if (n3 = (e3.ownerDocument || e3).$$reactFormReplay, n3 != null) for (r3 = 0; r3 < n3.length; r3 += 3) {
      var i3 = n3[r3], a3 = n3[r3 + 1], o3 = i3[nt2] || null;
      if (typeof a3 == `function`) o3 || Mp(n3);
      else if (o3) {
        var s3 = null;
        if (a3 && a3.hasAttribute(`formAction`)) {
          if (i3 = a3, o3 = a3[nt2] || null) s3 = o3.formAction;
          else if (pp(i3) !== null) continue;
        } else s3 = o3.action;
        typeof s3 == `function` ? n3[r3 + 1] = s3 : (n3.splice(r3, 3), r3 -= 3), Mp(n3);
      }
    }
  }
  function Pp() {
    function e3(e4) {
      e4.canIntercept && e4.info === `react-transition` && e4.intercept({ handler: function() {
        return new Promise(function(e5) {
          return i3 = e5;
        });
      }, focusReset: `manual`, scroll: `manual` });
    }
    function t3() {
      i3 !== null && (i3(), i3 = null), r3 || setTimeout(n3, 20);
    }
    function n3() {
      if (!r3 && !navigation.transition) {
        var e4 = navigation.currentEntry;
        e4 && e4.url != null && navigation.navigate(e4.url, { state: e4.getState(), info: `react-transition`, history: `replace` });
      }
    }
    if (typeof navigation == `object`) {
      var r3 = false, i3 = null;
      return navigation.addEventListener(`navigate`, e3), navigation.addEventListener(`navigatesuccess`, t3), navigation.addEventListener(`navigateerror`, t3), setTimeout(n3, 100), function() {
        r3 = true, navigation.removeEventListener(`navigate`, e3), navigation.removeEventListener(`navigatesuccess`, t3), navigation.removeEventListener(`navigateerror`, t3), i3 !== null && (i3(), i3 = null);
      };
    }
  }
  function Fp(e3) {
    this._internalRoot = e3;
  }
  Ip.prototype.render = Fp.prototype.render = function(e3) {
    var t3 = this._internalRoot;
    if (t3 === null) throw Error(i2(409));
    var n3 = t3.current;
    np(n3, du(), e3, t3, null, null);
  }, Ip.prototype.unmount = Fp.prototype.unmount = function() {
    var e3 = this._internalRoot;
    if (e3 !== null) {
      this._internalRoot = null;
      var t3 = e3.containerInfo;
      np(e3.current, 2, null, e3, null, null), vu(), t3[rt2] = null;
    }
  };
  function Ip(e3) {
    this._internalRoot = e3;
  }
  Ip.prototype.unstable_scheduleHydration = function(e3) {
    if (e3) {
      var t3 = Qe2();
      e3 = { blockedOn: null, target: e3, priority: t3 };
      for (var n3 = 0; n3 < xp.length && t3 !== 0 && t3 < xp[n3].priority; n3++) ;
      xp.splice(n3, 0, e3), n3 === 0 && Ep(e3);
    }
  };
  var Lp = n2.version;
  if (Lp !== `19.2.8`) throw Error(i2(527, Lp, `19.2.8`));
  F2.findDOMNode = function(e3) {
    var t3 = e3._reactInternals;
    if (t3 === void 0) throw typeof e3.render == `function` ? Error(i2(188)) : (e3 = Object.keys(e3).join(`,`), Error(i2(268, e3)));
    return e3 = d2(t3), e3 = e3 === null ? null : p2(e3), e3 = e3 === null ? null : e3.stateNode, e3;
  };
  var Rp = { bundleType: 0, version: `19.2.8`, rendererPackageName: `react-dom`, currentDispatcherRef: P2, reconcilerVersion: `19.2.8` };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
    var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zp.isDisabled && zp.supportsFiber) try {
      Me2 = zp.inject(Rp), V2 = zp;
    } catch {
    }
  }
  e2.createRoot = function(e3, t3) {
    if (!a2(e3)) throw Error(i2(299));
    var n3 = false, r3 = ``, o3 = Vs, s3 = Hs, c3 = Us;
    return t3 != null && (true === t3.unstable_strictMode && (n3 = true), t3.identifierPrefix !== void 0 && (r3 = t3.identifierPrefix), t3.onUncaughtError !== void 0 && (o3 = t3.onUncaughtError), t3.onCaughtError !== void 0 && (s3 = t3.onCaughtError), t3.onRecoverableError !== void 0 && (c3 = t3.onRecoverableError)), t3 = ep(e3, 1, false, null, null, n3, r3, null, o3, s3, c3, Pp), e3[rt2] = t3.current, xd(e3), new Fp(t3);
  };
})), g = o(((e2, t2) => {
  function n2() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n2);
    } catch (e3) {
      console.error(e3);
    }
  }
  n2(), t2.exports = h();
})), _ = c(u(), 1), v = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M112,56V200L40,128Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-13.66,5.66l-72-72a8,8,0,0,1,0-11.32l72-72A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M222,128a6,6,0,0,1-6,6H54.49l61.75,61.76a6,6,0,1,1-8.48,8.48l-72-72a6,6,0,0,1,0-8.48l72-72a6,6,0,0,1,8.48,8.48L54.49,122H216A6,6,0,0,1,222,128Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M220,128a4,4,0,0,1-4,4H49.66l65.17,65.17a4,4,0,0,1-5.66,5.66l-72-72a4,4,0,0,1,0-5.66l72-72a4,4,0,0,1,5.66,5.66L49.66,124H216A4,4,0,0,1,220,128Z` }))]]), y = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M225.29,165.93C216.61,151,212,129.57,212,104a84,84,0,0,0-168,0c0,25.58-4.59,47-13.27,61.93A20.08,20.08,0,0,0,30.66,186,19.77,19.77,0,0,0,48,196H84.18a44,44,0,0,0,87.64,0H208a19.77,19.77,0,0,0,17.31-10A20.08,20.08,0,0,0,225.29,165.93ZM128,212a20,20,0,0,1-19.6-16h39.2A20,20,0,0,1,128,212ZM54.66,172C63.51,154,68,131.14,68,104a60,60,0,0,1,120,0c0,27.13,4.48,50,13.33,68Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M220.07,176.94C214.41,167.2,206,139.73,206,104a78,78,0,1,0-156,0c0,35.74-8.42,63.2-14.08,72.94A14,14,0,0,0,48,198H90.48a38,38,0,0,0,75,0H208a14,14,0,0,0,12.06-21.06ZM128,218a26,26,0,0,1-25.29-20h50.58A26,26,0,0,1,128,218Zm81.71-33a1.9,1.9,0,0,1-1.7,1H48a1.9,1.9,0,0,1-1.7-1,2,2,0,0,1,0-2C53.87,170,62,139.69,62,104a66,66,0,1,1,132,0c0,35.68,8.14,65.95,15.71,79A2,2,0,0,1,209.71,185Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M218.35,178C212.58,168,204,140.13,204,104a76,76,0,1,0-152,0c0,36.13-8.59,64-14.36,73.95A12,12,0,0,0,48,196H92.23a36,36,0,0,0,71.54,0H208A12,12,0,0,0,218.35,178ZM128,220a28,28,0,0,1-27.71-24h55.42A28,28,0,0,1,128,220Zm83.45-34a3.91,3.91,0,0,1-3.44,2H48a3.91,3.91,0,0,1-3.44-2,4,4,0,0,1,0-4C52,169.17,60,139.32,60,104a68,68,0,1,1,136,0c0,35.31,8,65.17,15.44,78A4,4,0,0,1,211.45,186Z` }))]]), b = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z` }))]]), x = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M170.83,101.17a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z` }))]]), S = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,40V168H168V88H88V40Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,36H88a4,4,0,0,0-4,4V84H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H168a4,4,0,0,0,4-4V172h44a4,4,0,0,0,4-4V40A4,4,0,0,0,216,36ZM164,212H44V92H164Zm48-48H172V88a4,4,0,0,0-4-4H92V44H212Z` }))]]), C = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M156,88H100a12,12,0,0,0-12,12v56a12,12,0,0,0,12,12h56a12,12,0,0,0,12-12V100A12,12,0,0,0,156,88Zm-12,56H112V112h32Zm88-4H220V116h12a12,12,0,0,0,0-24H220V56a20,20,0,0,0-20-20H164V24a12,12,0,0,0-24,0V36H116V24a12,12,0,0,0-24,0V36H56A20,20,0,0,0,36,56V92H24a12,12,0,0,0,0,24H36v24H24a12,12,0,0,0,0,24H36v36a20,20,0,0,0,20,20H92v12a12,12,0,0,0,24,0V220h24v12a12,12,0,0,0,24,0V220h36a20,20,0,0,0,20-20V164h12a12,12,0,0,0,0-24Zm-36,56H60V60H196Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,48H56a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48ZM152,152H104V104h48Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M152,96H104a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V104A8,8,0,0,0,152,96Zm-8,48H112V112h32Zm88,0H216V112h16a8,8,0,0,0,0-16H216V56a16,16,0,0,0-16-16H160V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H56A16,16,0,0,0,40,56V96H24a8,8,0,0,0,0,16H40v32H24a8,8,0,0,0,0,16H40v40a16,16,0,0,0,16,16H96v16a8,8,0,0,0,16,0V216h32v16a8,8,0,0,0,16,0V216h40a16,16,0,0,0,16-16V160h16a8,8,0,0,0,0-16Zm-32,56H56V56H200v95.87s0,.09,0,.13,0,.09,0,.13V200Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M104,104h48v48H104Zm136,48a8,8,0,0,1-8,8H216v40a16,16,0,0,1-16,16H160v16a8,8,0,0,1-16,0V216H112v16a8,8,0,0,1-16,0V216H56a16,16,0,0,1-16-16V160H24a8,8,0,0,1,0-16H40V112H24a8,8,0,0,1,0-16H40V56A16,16,0,0,1,56,40H96V24a8,8,0,0,1,16,0V40h32V24a8,8,0,0,1,16,0V40h40a16,16,0,0,1,16,16V96h16a8,8,0,0,1,0,16H216v32h16A8,8,0,0,1,240,152ZM168,96a8,8,0,0,0-8-8H96a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M152,98H104a6,6,0,0,0-6,6v48a6,6,0,0,0,6,6h48a6,6,0,0,0,6-6V104A6,6,0,0,0,152,98Zm-6,48H110V110h36Zm86,0H214V110h18a6,6,0,0,0,0-12H214V56a14,14,0,0,0-14-14H158V24a6,6,0,0,0-12,0V42H110V24a6,6,0,0,0-12,0V42H56A14,14,0,0,0,42,56V98H24a6,6,0,0,0,0,12H42v36H24a6,6,0,0,0,0,12H42v42a14,14,0,0,0,14,14H98v18a6,6,0,0,0,12,0V214h36v18a6,6,0,0,0,12,0V214h42a14,14,0,0,0,14-14V158h18a6,6,0,0,0,0-12Zm-30,54a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M152,96H104a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V104A8,8,0,0,0,152,96Zm-8,48H112V112h32Zm88,0H216V112h16a8,8,0,0,0,0-16H216V56a16,16,0,0,0-16-16H160V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H56A16,16,0,0,0,40,56V96H24a8,8,0,0,0,0,16H40v32H24a8,8,0,0,0,0,16H40v40a16,16,0,0,0,16,16H96v16a8,8,0,0,0,16,0V216h32v16a8,8,0,0,0,16,0V216h40a16,16,0,0,0,16-16V160h16a8,8,0,0,0,0-16Zm-32,56H56V56H200v95.87s0,.09,0,.13,0,.09,0,.13V200Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M152,100H104a4,4,0,0,0-4,4v48a4,4,0,0,0,4,4h48a4,4,0,0,0,4-4V104A4,4,0,0,0,152,100Zm-4,48H108V108h40Zm84,0H212V108h20a4,4,0,0,0,0-8H212V56a12,12,0,0,0-12-12H156V24a4,4,0,0,0-8,0V44H108V24a4,4,0,0,0-8,0V44H56A12,12,0,0,0,44,56v44H24a4,4,0,0,0,0,8H44v40H24a4,4,0,0,0,0,8H44v44a12,12,0,0,0,12,12h44v20a4,4,0,0,0,8,0V212h40v20a4,4,0,0,0,8,0V212h44a12,12,0,0,0,12-12V156h20a4,4,0,0,0,0-8Zm-28,52a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z` }))]]), w = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M243.66,126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87,72.22,170.7,52,128,52S56.13,72.22,39.17,89.18c-18.31,18.31-26.49,36.44-26.83,37.2a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17s71.87-20.21,88.83-37.17c18.31-18.31,26.49-36.43,26.83-37.2A4.08,4.08,0,0,0,243.66,126.38Zm-32.7,35c-23.07,23-51,34.62-83,34.62s-59.89-11.65-83-34.62A135.71,135.71,0,0,1,20.44,128,135.69,135.69,0,0,1,45,94.62C68.11,71.65,96,60,128,60s59.89,11.65,83,34.62A135.79,135.79,0,0,1,235.56,128,135.71,135.71,0,0,1,211,161.38ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Z` }))]]), T = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M56.88,31.93A12,12,0,1,0,39.12,48.07l16,17.65C20.67,88.66,5.72,121.58,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212a131.34,131.34,0,0,0,51-10l20.09,22.1a12,12,0,0,0,17.76-16.14ZM128,188c-29.59,0-55.47-10.73-76.91-31.88A130.69,130.69,0,0,1,29.52,128c5.27-9.31,18.79-29.9,42-44.29l90.09,99.11A109.33,109.33,0,0,1,128,188Zm123-55.12c-.36.81-9,20-28,39.16a12,12,0,1,1-17-16.9A130.48,130.48,0,0,0,226.48,128a130.36,130.36,0,0,0-21.57-28.12C183.46,78.73,157.59,68,128,68c-3.35,0-6.7.14-10,.42a12,12,0,1,1-2-23.91c3.93-.34,8-.51,12-.51,36,0,68.63,13.67,94.49,39.52,19.35,19.35,28.11,38.8,28.48,39.61A12.08,12.08,0,0,1,251,132.88Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M96.68,57.87a4,4,0,0,1,2.08-6.6A130.13,130.13,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41a8,8,0,0,1,0,6.5c-.35.79-8.82,19.57-27.65,38.4q-4.28,4.26-8.79,8.07a4,4,0,0,1-5.55-.36ZM213.92,210.62a8,8,0,1,1-11.84,10.76L180,197.13A127.21,127.21,0,0,1,128,208c-34.88,0-66.57-13.26-91.66-38.34C17.51,150.83,9,132.05,8.69,131.26a8,8,0,0,1,0-6.5C9,124,17.51,105.18,36.34,86.35a135,135,0,0,1,25-19.78L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-65.49-48.25-52.69-58a40,40,0,0,0,52.69,58Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M52.44,36A6,6,0,0,0,43.56,44L64.44,67c-37.28,21.9-53.23,57-53.92,58.57a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206a124.91,124.91,0,0,0,52.57-11.25l23,25.29a6,6,0,0,0,8.88-8.08Zm48.62,71.32,45,49.52a34,34,0,0,1-45-49.52ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.57,134.57,0,0,1,22.69,128c4.29-8.2,20.1-35.18,50-51.91L92.89,98.3a46,46,0,0,0,61.35,67.48l17.81,19.6A113.47,113.47,0,0,1,128,194Zm6.4-99.4a6,6,0,0,1,2.25-11.79,46.17,46.17,0,0,1,37.15,40.87,6,6,0,0,1-5.42,6.53l-.56,0a6,6,0,0,1-6-5.45A34.1,34.1,0,0,0,134.4,94.6Zm111.08,35.85c-.41.92-10.37,23-32.86,43.12a6,6,0,1,1-8-8.94A134.07,134.07,0,0,0,233.31,128a134.67,134.67,0,0,0-23.86-32.07C186.78,73.42,159.38,62,128,62a120.19,120.19,0,0,0-19.69,1.6,6,6,0,1,1-2-11.83A131.12,131.12,0,0,1,128,50c43.38,0,73,20.54,90.24,37.76,18.58,18.58,26.9,37,27.24,37.81A6,6,0,0,1,245.48,130.45Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M51,37.31A4,4,0,0,0,45,42.69L67.59,67.5C29.34,89,13,124.81,12.34,126.38a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17a122.59,122.59,0,0,0,53.06-11.69l24,26.38a4,4,0,1,0,5.92-5.38ZM149.1,157.16A36,36,0,0,1,101,104.22ZM128,196c-32,0-59.89-11.65-83-34.62A135.81,135.81,0,0,1,20.44,128c3.65-7.23,20.09-36.81,52.68-54.43l22.45,24.7a44,44,0,0,0,59,64.83l20.89,23A114.94,114.94,0,0,1,128,196Zm6.78-103.36a4,4,0,0,1,1.49-7.86,44.15,44.15,0,0,1,35.54,39.09,4,4,0,0,1-3.61,4.35l-.38,0a4,4,0,0,1-4-3.63A36.1,36.1,0,0,0,134.78,92.64Zm108.88,37c-.41.91-10.2,22.58-32.38,42.45a4,4,0,0,1-2.67,1,4,4,0,0,1-2.67-7A136.71,136.71,0,0,0,235.56,128,136.07,136.07,0,0,0,211,94.62C187.89,71.65,160,60,128,60a122,122,0,0,0-20,1.63,4,4,0,0,1-1.32-7.89A129.3,129.3,0,0,1,128,52c42.7,0,71.87,20.22,88.83,37.18,18.31,18.31,26.49,36.44,26.83,37.2A4.08,4.08,0,0,1,243.66,129.63Z` }))]]), E = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,104v8a48,48,0,0,1-48,48H136a32,32,0,0,1,32,32v40H104V192a32,32,0,0,1,32-32H112a48,48,0,0,1-48-48v-8a49.28,49.28,0,0,1,8.51-27.3A51.92,51.92,0,0,1,76,32a52,52,0,0,1,43.83,24h32.34A52,52,0,0,1,196,32a51.92,51.92,0,0,1,3.49,44.7A49.28,49.28,0,0,1,208,104Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M208.3,75.68A59.74,59.74,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58,58,0,0,0,208.3,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.76,41.76,0,0,1,200,104Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M206.13,75.92A57.79,57.79,0,0,0,201.2,29a6,6,0,0,0-5.2-3,57.77,57.77,0,0,0-47,24H123A57.77,57.77,0,0,0,76,26a6,6,0,0,0-5.2,3,57.79,57.79,0,0,0-4.93,46.92A55.88,55.88,0,0,0,58,104v8a54.06,54.06,0,0,0,50.45,53.87A37.85,37.85,0,0,0,98,192v10H72a26,26,0,0,1-26-26A38,38,0,0,0,8,138a6,6,0,0,0,0,12,26,26,0,0,1,26,26,38,38,0,0,0,38,38H98v18a6,6,0,0,0,12,0V192a26,26,0,0,1,52,0v40a6,6,0,0,0,12,0V192a37.85,37.85,0,0,0-10.45-26.13A54.06,54.06,0,0,0,214,112v-8A55.88,55.88,0,0,0,206.13,75.92ZM202,112a42,42,0,0,1-42,42H112a42,42,0,0,1-42-42v-8a43.86,43.86,0,0,1,7.3-23.69,6,6,0,0,0,.81-5.76,45.85,45.85,0,0,1,1.43-36.42,45.85,45.85,0,0,1,35.23,21.1A6,6,0,0,0,119.83,62h32.34a6,6,0,0,0,5.06-2.76,45.83,45.83,0,0,1,35.23-21.11,45.85,45.85,0,0,1,1.43,36.42,6,6,0,0,0,.79,5.74A43.78,43.78,0,0,1,202,104Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M203.94,76.16A55.73,55.73,0,0,0,199.46,30,4,4,0,0,0,196,28a55.78,55.78,0,0,0-46,24H122A55.78,55.78,0,0,0,76,28a4,4,0,0,0-3.46,2,55.73,55.73,0,0,0-4.48,46.16A53.78,53.78,0,0,0,60,104v8a52.06,52.06,0,0,0,52,52h1.41A36,36,0,0,0,100,192v12H72a28,28,0,0,1-28-28A36,36,0,0,0,8,140a4,4,0,0,0,0,8,28,28,0,0,1,28,28,36,36,0,0,0,36,36h28v20a4,4,0,0,0,8,0V192a28,28,0,0,1,56,0v40a4,4,0,0,0,8,0V192a36,36,0,0,0-13.41-28H160a52.06,52.06,0,0,0,52-52v-8A53.78,53.78,0,0,0,203.94,76.16ZM204,112a44.05,44.05,0,0,1-44,44H112a44.05,44.05,0,0,1-44-44v-8a45.76,45.76,0,0,1,7.71-24.89,4,4,0,0,0,.53-3.84,47.82,47.82,0,0,1,2.1-39.21,47.8,47.8,0,0,1,38.12,22.1A4,4,0,0,0,119.83,60h32.34a4,4,0,0,0,3.37-1.84,47.8,47.8,0,0,1,38.12-22.1,47.82,47.82,0,0,1,2.1,39.21,4,4,0,0,0,.53,3.83A45.85,45.85,0,0,1,204,104Z` }))]]), D = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm78.36,64H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM216,128a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM128,43a115.27,115.27,0,0,1,26,45H102A115.11,115.11,0,0,1,128,43ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48Zm50.35,61.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,28h0A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,190.61c-6.33-6.09-23-24.41-31.27-54.61h62.54C151,194.2,134.33,212.52,128,218.61ZM94.82,156a140.42,140.42,0,0,1,0-56h66.36a140.42,140.42,0,0,1,0,56ZM128,37.39c6.33,6.09,23,24.41,31.27,54.61H96.73C105,61.8,121.67,43.48,128,37.39ZM169.41,100h46.23a92.09,92.09,0,0,1,0,56H169.41a152.65,152.65,0,0,0,0-56Zm43.25-8h-45a129.39,129.39,0,0,0-29.19-55.4A92.25,92.25,0,0,1,212.66,92ZM117.54,36.6A129.39,129.39,0,0,0,88.35,92h-45A92.25,92.25,0,0,1,117.54,36.6ZM40.36,100H86.59a152.65,152.65,0,0,0,0,56H40.36a92.09,92.09,0,0,1,0-56Zm3,64h45a129.39,129.39,0,0,0,29.19,55.4A92.25,92.25,0,0,1,43.34,164Zm95.12,55.4A129.39,129.39,0,0,0,167.65,164h45A92.25,92.25,0,0,1,138.46,219.4Z` }))]]), O = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,44H16A12,12,0,0,0,4,56V208a12,12,0,0,0,24,0V196H44v12a12,12,0,0,0,24,0V196H84v12a12,12,0,0,0,24,0V196h16v12a12,12,0,0,0,24,0V196h84a20,20,0,0,0,20-20V64A20,20,0,0,0,232,44Zm-4,128H28V68H228Zm-52-12a40,40,0,1,0-40-40A40,40,0,0,0,176,160Zm0-56a16,16,0,1,1-16,16A16,16,0,0,1,176,104ZM80,160a40,40,0,1,0-40-40A40,40,0,0,0,80,160Zm0-56a16,16,0,1,1-16,16A16,16,0,0,1,80,104Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,56H16V184H232a8,8,0,0,0,8-8V64A8,8,0,0,0,232,56ZM80,152a32,32,0,1,1,32-32A32,32,0,0,1,80,152Zm96,0a32,32,0,1,1,32-32A32,32,0,0,1,176,152Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M232,48H16a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V192H40v16a8,8,0,0,0,16,0V192H72v16a8,8,0,0,0,16,0V192h16v16a8,8,0,0,0,16,0V192H232a16,16,0,0,0,16-16V64A16,16,0,0,0,232,48Zm0,128H24V64H232Zm-56-16a40,40,0,1,0-40-40A40,40,0,0,0,176,160Zm-24-40a23.74,23.74,0,0,1,2.35-10.34l32,32A23.74,23.74,0,0,1,176,144,24,24,0,0,1,152,120Zm48,0a23.74,23.74,0,0,1-2.35,10.34l-32-32A23.74,23.74,0,0,1,176,96,24,24,0,0,1,200,120ZM80,160a40,40,0,1,0-40-40A40,40,0,0,0,80,160ZM56,120a23.74,23.74,0,0,1,2.35-10.34l32,32A23.74,23.74,0,0,1,80,144,24,24,0,0,1,56,120Zm48,0a23.74,23.74,0,0,1-2.35,10.34l-32-32A23.74,23.74,0,0,1,80,96,24,24,0,0,1,104,120Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,48H16a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V192H40v16a8,8,0,0,0,16,0V192H72v16a8,8,0,0,0,16,0V192h16v16a8,8,0,0,0,16,0V192H232a16,16,0,0,0,16-16V64A16,16,0,0,0,232,48Zm-20,72a35.81,35.81,0,0,1-5.53,19.16L156.84,89.53A36,36,0,0,1,212,120Zm-96,0a35.81,35.81,0,0,1-5.53,19.16L60.84,89.53A36,36,0,0,1,116,120ZM80,156a36,36,0,0,1-30.47-55.16l49.63,49.63A35.81,35.81,0,0,1,80,156Zm60-36a35.81,35.81,0,0,1,5.53-19.16l49.63,49.63A36,36,0,0,1,140,120Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,50H16a6,6,0,0,0-6,6V208a6,6,0,0,0,12,0V190H42v18a6,6,0,0,0,12,0V190H74v18a6,6,0,0,0,12,0V190h20v18a6,6,0,0,0,12,0V190H232a14,14,0,0,0,14-14V64A14,14,0,0,0,232,50Zm2,126a2,2,0,0,1-2,2H22V62H232a2,2,0,0,1,2,2ZM176,82a38,38,0,1,0,38,38A38,38,0,0,0,176,82Zm26,38a25.81,25.81,0,0,1-3.88,13.64L162.36,97.88A26,26,0,0,1,202,120Zm-52,0a25.81,25.81,0,0,1,3.88-13.64l35.76,35.76A26,26,0,0,1,150,120ZM80,82a38,38,0,1,0,38,38A38,38,0,0,0,80,82Zm26,38a25.81,25.81,0,0,1-3.88,13.64L66.36,97.88A26,26,0,0,1,106,120Zm-52,0a25.81,25.81,0,0,1,3.88-13.64l35.76,35.76A26,26,0,0,1,54,120Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,48H16a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V192H40v16a8,8,0,0,0,16,0V192H72v16a8,8,0,0,0,16,0V192h16v16a8,8,0,0,0,16,0V192H232a16,16,0,0,0,16-16V64A16,16,0,0,0,232,48Zm0,128H24V64H232Zm-56-16a40,40,0,1,0-40-40A40,40,0,0,0,176,160Zm-24-40a23.74,23.74,0,0,1,2.35-10.34l32,32A23.74,23.74,0,0,1,176,144,24,24,0,0,1,152,120Zm48,0a23.74,23.74,0,0,1-2.35,10.34l-32-32A23.74,23.74,0,0,1,176,96,24,24,0,0,1,200,120ZM80,160a40,40,0,1,0-40-40A40,40,0,0,0,80,160ZM56,120a23.74,23.74,0,0,1,2.35-10.34l32,32A23.74,23.74,0,0,1,80,144,24,24,0,0,1,56,120Zm48,0a23.74,23.74,0,0,1-2.35,10.34l-32-32A23.74,23.74,0,0,1,80,96,24,24,0,0,1,104,120Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232,52H16a4,4,0,0,0-4,4V208a4,4,0,0,0,8,0V188H44v20a4,4,0,0,0,8,0V188H76v20a4,4,0,0,0,8,0V188h24v20a4,4,0,0,0,8,0V188H232a12,12,0,0,0,12-12V64A12,12,0,0,0,232,52Zm4,124a4,4,0,0,1-4,4H20V60H232a4,4,0,0,1,4,4ZM176,84a36,36,0,1,0,36,36A36,36,0,0,0,176,84Zm-28,36a27.89,27.89,0,0,1,5.58-16.76l39.18,39.18A28,28,0,0,1,148,120Zm50.42,16.76L159.24,97.58a28,28,0,0,1,39.18,39.18ZM80,84a36,36,0,1,0,36,36A36,36,0,0,0,80,84ZM52,120a27.89,27.89,0,0,1,5.58-16.76l39.18,39.18A28,28,0,0,1,52,120Zm50.42,16.76L63.24,97.58a28,28,0,0,1,39.18,39.18Z` }))]]), k = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M144,176a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176Zm88-48A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM124,96a12,12,0,1,0-12-12A12,12,0,0,0,124,96Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M140,176a4,4,0,0,1-4,4,12,12,0,0,1-12-12V128a4,4,0,0,0-4-4,4,4,0,0,1,0-8,12,12,0,0,1,12,12v40a4,4,0,0,0,4,4A4,4,0,0,1,140,176ZM124,92a8,8,0,1,0-8-8A8,8,0,0,0,124,92Zm104,36A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z` }))]]), A = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,76H180V56A52,52,0,0,0,76,56V76H48A20,20,0,0,0,28,96V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V96A20,20,0,0,0,208,76ZM100,56a28,28,0,0,1,56,0V76H100ZM204,204H52V100H204Zm-76-92a32,32,0,0,0-12,61.66V180a12,12,0,0,0,24,0v-6.34A32,32,0,0,0,128,112Zm0,24a8,8,0,1,1-8,8A8,8,0,0,1,128,136Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,88H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V96A8,8,0,0,0,208,88Zm-80,72a20,20,0,1,1,20-20A20,20,0,0,1,128,160Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-96a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a24,24,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,84H172V56a44,44,0,0,0-88,0V84H48A12,12,0,0,0,36,96V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V96A12,12,0,0,0,208,84ZM92,56a36,36,0,0,1,72,0V84H92ZM212,208a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V96a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Zm-84-92a24,24,0,0,0-4,47.66V184a4,4,0,0,0,8,0V163.66A24,24,0,0,0,128,116Zm0,40a16,16,0,1,1,16-16A16,16,0,0,1,128,156Z` }))]]), ee = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M252,152a12,12,0,0,1-12,12H228v12a12,12,0,0,1-24,0V164H192a12,12,0,0,1,0-24h12V128a12,12,0,0,1,24,0v12h12A12,12,0,0,1,252,152ZM56,76H68V88a12,12,0,0,0,24,0V76h12a12,12,0,1,0,0-24H92V40a12,12,0,0,0-24,0V52H56a12,12,0,0,0,0,24ZM184,188h-4v-4a12,12,0,0,0-24,0v4h-4a12,12,0,0,0,0,24h4v4a12,12,0,0,0,24,0v-4h4a12,12,0,0,0,0-24ZM222.14,82.83,82.82,222.14a20,20,0,0,1-28.28,0L33.85,201.46a20,20,0,0,1,0-28.29L173.17,33.86a20,20,0,0,1,28.28,0l20.69,20.68A20,20,0,0,1,222.14,82.83ZM159,112,144,97,53.65,187.31l15,15Zm43.31-43.31-15-15L161,80l15,15Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M176,112,74.34,213.66a8,8,0,0,1-11.31,0L42.34,193a8,8,0,0,1,0-11.31L144,80Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80ZM208,68.69,187.31,48l-32,32L176,100.69Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M246,152a6,6,0,0,1-6,6H222v18a6,6,0,0,1-12,0V158H192a6,6,0,0,1,0-12h18V128a6,6,0,0,1,12,0v18h18A6,6,0,0,1,246,152ZM56,70H74V88a6,6,0,0,0,12,0V70h18a6,6,0,0,0,0-12H86V40a6,6,0,0,0-12,0V58H56a6,6,0,0,0,0,12ZM184,194H174V184a6,6,0,0,0-12,0v10H152a6,6,0,0,0,0,12h10v10a6,6,0,0,0,12,0V206h10a6,6,0,0,0,0-12ZM217.9,78.59,78.58,217.9a14,14,0,0,1-19.8,0L38.09,197.21a14,14,0,0,1,0-19.8L177.41,38.1a14,14,0,0,1,19.8,0L217.9,58.79A14,14,0,0,1,217.9,78.59ZM167.51,112,144,88.49,46.58,185.9a2,2,0,0,0,0,2.83l20.69,20.68a2,2,0,0,0,2.82,0h0Zm41.9-44.73L188.73,46.59a2,2,0,0,0-2.83,0L152.48,80,176,103.52,209.41,70.1A2,2,0,0,0,209.41,67.27Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M244,152a4,4,0,0,1-4,4H220v20a4,4,0,0,1-8,0V156H192a4,4,0,0,1,0-8h20V128a4,4,0,0,1,8,0v20h20A4,4,0,0,1,244,152ZM56,68H76V88a4,4,0,0,0,8,0V68h20a4,4,0,0,0,0-8H84V40a4,4,0,0,0-8,0V60H56a4,4,0,0,0,0,8ZM184,196H172V184a4,4,0,0,0-8,0v12H152a4,4,0,0,0,0,8h12v12a4,4,0,0,0,8,0V204h12a4,4,0,0,0,0-8ZM216.48,77.17,77.17,216.49a12,12,0,0,1-17,0L39.51,195.8a12,12,0,0,1,0-17L178.83,39.51a12,12,0,0,1,17,0L216.48,60.2A12,12,0,0,1,216.48,77.17ZM170.34,112,144,85.66,45.17,184.49a4,4,0,0,0,0,5.65l20.68,20.69a4,4,0,0,0,5.66,0Zm40.49-46.14L190.14,45.17a4,4,0,0,0-5.66,0L149.65,80,176,106.34l34.83-34.83A4,4,0,0,0,210.83,65.86Z` }))]]), j = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z` }))]]), M = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z` }))]]), N = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,36H48A20,20,0,0,0,28,56v56c0,54.29,26.32,87.22,48.4,105.29,23.71,19.39,47.44,26,48.44,26.29a12.1,12.1,0,0,0,6.32,0c1-.28,24.73-6.9,48.44-26.29,22.08-18.07,48.4-51,48.4-105.29V56A20,20,0,0,0,208,36Zm-4,76c0,35.71-13.09,64.69-38.91,86.15A126.28,126.28,0,0,1,128,219.38a126.14,126.14,0,0,1-37.09-21.23C65.09,176.69,52,147.71,52,112V60H204ZM79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,56v56c0,96-88,120-88,120S40,208,40,112V56a8,8,0,0,1,8-8H208A8,8,0,0,1,216,56Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,42H48A14,14,0,0,0,34,56v56c0,51.94,25.12,83.4,46.2,100.64,22.73,18.6,45.27,24.89,46.22,25.15a6,6,0,0,0,3.16,0c.95-.26,23.49-6.55,46.22-25.15C196.88,195.4,222,163.94,222,112V56A14,14,0,0,0,208,42Zm2,70c0,37.76-13.94,68.39-41.44,91.06A131.17,131.17,0,0,1,128,225.72a130.94,130.94,0,0,1-40.56-22.66C59.94,180.39,46,149.76,46,112V56a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2ZM172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,44H48A12,12,0,0,0,36,56v56c0,51.16,24.73,82.12,45.47,99.1,22.4,18.32,44.55,24.5,45.48,24.76a4,4,0,0,0,2.1,0c.93-.26,23.08-6.44,45.48-24.76,20.74-17,45.47-47.94,45.47-99.1V56A12,12,0,0,0,208,44Zm4,68c0,38.44-14.23,69.63-42.29,92.71A132.45,132.45,0,0,1,128,227.82a132.23,132.23,0,0,1-41.71-23.11C58.23,181.63,44,150.44,44,112V56a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Zm-41.17-10.83a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17Z` }))]]), te = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M40,92H70.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24H137.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24Zm64-24A12,12,0,1,1,92,80,12,12,0,0,1,104,68Zm112,96H201.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24h94.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24Zm-48,24a12,12,0,1,1,12-12A12,12,0,0,1,168,188Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M128,80a24,24,0,1,1-24-24A24,24,0,0,1,128,80Zm40,72a24,24,0,1,0,24,24A24,24,0,0,0,168,152Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M32,80a8,8,0,0,1,8-8H77.17a28,28,0,0,1,53.66,0H216a8,8,0,0,1,0,16H130.83a28,28,0,0,1-53.66,0H40A8,8,0,0,1,32,80Zm184,88H194.83a28,28,0,0,0-53.66,0H40a8,8,0,0,0,0,16H141.17a28,28,0,0,0,53.66,0H216a8,8,0,0,0,0-16Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M40,86H74.6a30,30,0,0,0,58.8,0H216a6,6,0,0,0,0-12H133.4a30,30,0,0,0-58.8,0H40a6,6,0,0,0,0,12Zm64-24A18,18,0,1,1,86,80,18,18,0,0,1,104,62ZM216,170H197.4a30,30,0,0,0-58.8,0H40a6,6,0,0,0,0,12h98.6a30,30,0,0,0,58.8,0H216a6,6,0,0,0,0-12Zm-48,24a18,18,0,1,1,18-18A18,18,0,0,1,168,194Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M40,84H76.29a28,28,0,0,0,55.42,0H216a4,4,0,0,0,0-8H131.71a28,28,0,0,0-55.42,0H40a4,4,0,0,0,0,8Zm64-24A20,20,0,1,1,84,80,20,20,0,0,1,104,60ZM216,172H195.71a28,28,0,0,0-55.42,0H40a4,4,0,0,0,0,8H140.29a28,28,0,0,0,55.42,0H216a4,4,0,0,0,0-8Zm-48,24a20,20,0,1,1,20-20A20,20,0,0,1,168,196Z` }))]]), P = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M199,125.31l-49.88-18.39L130.69,57a19.92,19.92,0,0,0-37.38,0L74.92,106.92,25,125.31a19.92,19.92,0,0,0,0,37.38l49.88,18.39L93.31,231a19.92,19.92,0,0,0,37.38,0l18.39-49.88L199,162.69a19.92,19.92,0,0,0,0-37.38Zm-63.38,35.16a12,12,0,0,0-7.11,7.11L112,212.28l-16.47-44.7a12,12,0,0,0-7.11-7.11L43.72,144l44.7-16.47a12,12,0,0,0,7.11-7.11L112,75.72l16.47,44.7a12,12,0,0,0,7.11,7.11L180.28,144ZM140,40a12,12,0,0,1,12-12h12V16a12,12,0,0,1,24,0V28h12a12,12,0,0,1,0,24H188V64a12,12,0,0,1-24,0V52H152A12,12,0,0,1,140,40ZM252,88a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4V72a12,12,0,0,1,24,0v4h4A12,12,0,0,1,252,88Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M196.89,130.94,144.4,111.6,125.06,59.11a13.92,13.92,0,0,0-26.12,0L79.6,111.6,27.11,130.94a13.92,13.92,0,0,0,0,26.12L79.6,176.4l19.34,52.49a13.92,13.92,0,0,0,26.12,0L144.4,176.4l52.49-19.34a13.92,13.92,0,0,0,0-26.12Zm-4.15,14.86-55.08,20.3a6,6,0,0,0-3.56,3.56l-20.3,55.08a1.92,1.92,0,0,1-3.6,0L89.9,169.66a6,6,0,0,0-3.56-3.56L31.26,145.8a1.92,1.92,0,0,1,0-3.6l55.08-20.3a6,6,0,0,0,3.56-3.56l20.3-55.08a1.92,1.92,0,0,1,3.6,0l20.3,55.08a6,6,0,0,0,3.56,3.56l55.08,20.3a1.92,1.92,0,0,1,0,3.6ZM146,40a6,6,0,0,1,6-6h18V16a6,6,0,0,1,12,0V34h18a6,6,0,0,1,0,12H182V64a6,6,0,0,1-12,0V46H152A6,6,0,0,1,146,40ZM246,88a6,6,0,0,1-6,6H230v10a6,6,0,0,1-12,0V94H208a6,6,0,0,1,0-12h10V72a6,6,0,0,1,12,0V82h10A6,6,0,0,1,246,88Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M196.2,132.81l-53.36-19.65L123.19,59.8a11.93,11.93,0,0,0-22.38,0L81.16,113.16,27.8,132.81a11.93,11.93,0,0,0,0,22.38l53.36,19.65,19.65,53.36a11.93,11.93,0,0,0,22.38,0l19.65-53.36,53.36-19.65a11.93,11.93,0,0,0,0-22.38Zm-2.77,14.87L138.35,168a4,4,0,0,0-2.37,2.37l-20.3,55.08a3.92,3.92,0,0,1-7.36,0L88,170.35A4,4,0,0,0,85.65,168l-55.08-20.3a3.92,3.92,0,0,1,0-7.36L85.65,120A4,4,0,0,0,88,117.65l20.3-55.08a3.92,3.92,0,0,1,7.36,0L136,117.65a4,4,0,0,0,2.37,2.37l55.08,20.3a3.92,3.92,0,0,1,0,7.36ZM148,40a4,4,0,0,1,4-4h20V16a4,4,0,0,1,8,0V36h20a4,4,0,0,1,0,8H180V64a4,4,0,0,1-8,0V44H152A4,4,0,0,1,148,40Zm96,48a4,4,0,0,1-4,4H228v12a4,4,0,0,1-8,0V92H208a4,4,0,0,1,0-8h12V72a4,4,0,0,1,8,0V84h12A4,4,0,0,1,244,88Z` }))]]), F = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z` }))]]), ne = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M231.49,23.16a13,13,0,0,0-13.23-2.26L15.6,100.21a18.22,18.22,0,0,0,3.12,34.86L68,144.74V200a20,20,0,0,0,34.4,13.88l22.67-23.51L162.35,223a20,20,0,0,0,32.7-10.54L235.67,35.91A13,13,0,0,0,231.49,23.16ZM139.41,77.52,77.22,122.09l-34.43-6.75ZM92,190.06V161.35l15,13.15Zm81.16,10.52L99.28,135.81,205.59,59.63Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M223.41,32.09,80,134.87,21,123.3A6.23,6.23,0,0,1,20,111.38L222.63,32.07A1,1,0,0,1,223.41,32.09ZM80,200a8,8,0,0,0,13.76,5.56l30.61-31.76L80,134.87Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19ZM78.15,126.35l-49.61-9.73,139.2-54.48ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19ZM175.53,208,92.85,135.5l119-85.29Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M227.57,27.7a7,7,0,0,0-7.13-1.22L17.78,105.79a12.23,12.23,0,0,0,2.1,23.39L74,139.81V200a14,14,0,0,0,24.08,9.71l26.64-27.63,41.58,36.45a13.9,13.9,0,0,0,9.2,3.49,14.33,14.33,0,0,0,4.36-.69,13.86,13.86,0,0,0,9.34-10.17L229.82,34.57A7,7,0,0,0,227.57,27.7ZM22.05,117.37h0a.46.46,0,0,1,0-.32.51.51,0,0,1,.15-.08L181.91,54.45l-103.3,74L22.2,117.41Zm67.39,84A2,2,0,0,1,86,200V148.11l29.69,26Zm88.07,7.08a1.93,1.93,0,0,1-1.34,1.44,2,2,0,0,1-2-.4L89.64,135.34,215,45.5Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19Zm-61.14,36L78.15,126.35l-49.6-9.73ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M226.27,29.22a5,5,0,0,0-5.1-.87L18.51,107.66a10.22,10.22,0,0,0,1.75,19.56L76,138.16V200a12,12,0,0,0,7.51,11.13A12.1,12.1,0,0,0,88,212a12,12,0,0,0,8.62-3.68l28-29,43,37.71a12,12,0,0,0,7.89,3,12.47,12.47,0,0,0,3.74-.59,11.87,11.87,0,0,0,8-8.72L227.87,34.12A5,5,0,0,0,226.27,29.22ZM20,117.38a2.13,2.13,0,0,1,1.42-2.27L196.07,46.76l-117,83.85L21.81,119.37A2.12,2.12,0,0,1,20,117.38Zm70.87,85.38A4,4,0,0,1,84,200V143.7L118.58,174Zm88.58,6.14a4,4,0,0,1-6.57,2.09L86.43,135.18,218.13,40.8Z` }))]]), re = /* @__PURE__ */ new Map([[`bold`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z` }))], [`duotone`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z`, opacity: `0.2` }), _.createElement(`path`, { d: `M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z` }))], [`fill`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z` }))], [`light`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z` }))], [`regular`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z` }))], [`thin`, _.createElement(_.Fragment, null, _.createElement(`path`, { d: `M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z` }))]]), ie = (0, _.createContext)({ color: `currentColor`, size: `1em`, weight: `regular`, mirrored: false }), I = _.forwardRef((e2, t2) => {
  let { alt: n2, color: r2, size: i2, weight: a2, mirrored: o2, children: s2, weights: c2, ...l2 } = e2, { color: u2 = `currentColor`, size: d2, weight: f2 = `regular`, mirrored: p2 = false, ...m2 } = _.useContext(ie);
  return _.createElement(`svg`, { ref: t2, xmlns: `http://www.w3.org/2000/svg`, width: i2 ?? d2, height: i2 ?? d2, fill: r2 ?? u2, viewBox: `0 0 256 256`, transform: o2 || p2 ? `scale(-1, 1)` : void 0, ...m2, ...l2 }, !!n2 && _.createElement(`title`, null, n2), s2, c2.get(a2 ?? f2));
});
I.displayName = `IconBase`;
var L = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: v }));
L.displayName = `ArrowLeftIcon`;
var ae = L, oe = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: y }));
oe.displayName = `BellIcon`;
var se = oe, ce = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: b }));
ce.displayName = `CheckIcon`;
var le = ce, ue = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: x }));
ue.displayName = `CheckCircleIcon`;
var de = ue, R = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: S }));
R.displayName = `CopyIcon`;
var fe = R, z = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: C }));
z.displayName = `CpuIcon`;
var pe = z, me = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: w }));
me.displayName = `EyeIcon`;
var he = me, ge = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: T }));
ge.displayName = `EyeSlashIcon`;
var _e = ge, ve = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: E }));
ve.displayName = `GithubLogoIcon`;
var ye = ve, be = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: D }));
be.displayName = `GlobeIcon`;
var xe = be, B = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: O }));
B.displayName = `GraphicsCardIcon`;
var Se = B, Ce = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: k }));
Ce.displayName = `InfoIcon`;
var we = Ce, Te = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: A }));
Te.displayName = `LockKeyIcon`;
var Ee = Te, De = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: ee }));
De.displayName = `MagicWandIcon`;
var Oe = De, ke = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: j }));
ke.displayName = `PauseIcon`;
var Ae = ke, je = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: M }));
je.displayName = `PlayIcon`;
var Me = je, V = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: N }));
V.displayName = `ShieldCheckIcon`;
var Ne = V, Pe = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: te }));
Pe.displayName = `SlidersHorizontalIcon`;
var Fe = Pe, Ie = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: P }));
Ie.displayName = `SparkleIcon`;
var Le = Ie, Re = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: F }));
Re.displayName = `StopIcon`;
var ze = Re, Be = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: ne }));
Be.displayName = `TelegramLogoIcon`;
var Ve = Be, He = _.forwardRef((e2, t2) => _.createElement(I, { ref: t2, ...e2, weights: re }));
He.displayName = `XIcon`;
var H = He, Ue = o(((e2, t2) => {
  typeof document < `u` && typeof navigator < `u` && (function(n2, r2) {
    typeof e2 == `object` && t2 !== void 0 ? t2.exports = r2() : typeof define == `function` && define.amd ? define(r2) : (n2 = typeof globalThis < `u` ? globalThis : n2 || self, n2.lottie = r2());
  })(e2, (function() {
    var n2 = ``, r2 = false, i2 = -999999, a2 = function(e3) {
      r2 = !!e3;
    }, o2 = function() {
      return r2;
    }, s2 = function(e3) {
      n2 = e3;
    }, c2 = function() {
      return n2;
    };
    function l2(e3) {
      return document.createElement(e3);
    }
    function u2(e3, t3) {
      var n3, r3 = e3.length, i3;
      for (n3 = 0; n3 < r3; n3 += 1) for (var a3 in i3 = e3[n3].prototype, i3) Object.prototype.hasOwnProperty.call(i3, a3) && (t3.prototype[a3] = i3[a3]);
    }
    function d2(e3) {
      function t3() {
      }
      return t3.prototype = e3, t3;
    }
    var f2 = (function() {
      function e3(e4) {
        this.audios = [], this.audioFactory = e4, this._volume = 1, this._isMuted = false;
      }
      return e3.prototype = { addAudio: function(e4) {
        this.audios.push(e4);
      }, pause: function() {
        var e4, t3 = this.audios.length;
        for (e4 = 0; e4 < t3; e4 += 1) this.audios[e4].pause();
      }, resume: function() {
        var e4, t3 = this.audios.length;
        for (e4 = 0; e4 < t3; e4 += 1) this.audios[e4].resume();
      }, setRate: function(e4) {
        var t3, n3 = this.audios.length;
        for (t3 = 0; t3 < n3; t3 += 1) this.audios[t3].setRate(e4);
      }, createAudio: function(e4) {
        return this.audioFactory ? this.audioFactory(e4) : window.Howl ? new window.Howl({ src: [e4] }) : { isPlaying: false, play: function() {
          this.isPlaying = true;
        }, seek: function() {
          this.isPlaying = false;
        }, playing: function() {
        }, rate: function() {
        }, setVolume: function() {
        } };
      }, setAudioFactory: function(e4) {
        this.audioFactory = e4;
      }, setVolume: function(e4) {
        this._volume = e4, this._updateVolume();
      }, mute: function() {
        this._isMuted = true, this._updateVolume();
      }, unmute: function() {
        this._isMuted = false, this._updateVolume();
      }, getVolume: function() {
        return this._volume;
      }, _updateVolume: function() {
        var e4, t3 = this.audios.length;
        for (e4 = 0; e4 < t3; e4 += 1) this.audios[e4].volume(this._volume * +!this._isMuted);
      } }, function() {
        return new e3();
      };
    })(), p2 = /* @__PURE__ */ (function() {
      function e3(e4, t4) {
        var n3 = 0, r3 = [], i3;
        switch (e4) {
          case `int16`:
          case `uint8c`:
            i3 = 1;
            break;
          default:
            i3 = 1.1;
        }
        for (n3 = 0; n3 < t4; n3 += 1) r3.push(i3);
        return r3;
      }
      function t3(t4, n3) {
        return t4 === `float32` ? new Float32Array(n3) : t4 === `int16` ? new Int16Array(n3) : t4 === `uint8c` ? new Uint8ClampedArray(n3) : e3(t4, n3);
      }
      return typeof Uint8ClampedArray == `function` && typeof Float32Array == `function` ? t3 : e3;
    })();
    function m2(e3) {
      return Array.apply(null, { length: e3 });
    }
    function h2(e3) {
      "@babel/helpers - typeof";
      return h2 = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e4) {
        return typeof e4;
      } : function(e4) {
        return e4 && typeof Symbol == `function` && e4.constructor === Symbol && e4 !== Symbol.prototype ? `symbol` : typeof e4;
      }, h2(e3);
    }
    var g2 = true, _2 = null, v2 = null, y2 = ``, b2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), x2 = Math.pow, S2 = Math.sqrt, C2 = Math.floor, w2 = Math.min, T2 = {};
    (function() {
      var e3 = `abs.acos.acosh.asin.asinh.atan.atanh.atan2.ceil.cbrt.expm1.clz32.cos.cosh.exp.floor.fround.hypot.imul.log.log1p.log2.log10.max.min.pow.random.round.sign.sin.sinh.sqrt.tan.tanh.trunc.E.LN10.LN2.LOG10E.LOG2E.PI.SQRT1_2.SQRT2`.split(`.`), t3, n3 = e3.length;
      for (t3 = 0; t3 < n3; t3 += 1) T2[e3[t3]] = Math[e3[t3]];
    })(), T2.random = Math.random, T2.abs = function(e3) {
      if (h2(e3) === `object` && e3.length) {
        var t3 = m2(e3.length), n3, r3 = e3.length;
        for (n3 = 0; n3 < r3; n3 += 1) t3[n3] = Math.abs(e3[n3]);
        return t3;
      }
      return Math.abs(e3);
    };
    var E2 = 150, D2 = Math.PI / 180, O2 = 0.5519;
    function k2(e3, t3, n3, r3) {
      this.type = e3, this.currentTime = t3, this.totalTime = n3, this.direction = r3 < 0 ? -1 : 1;
    }
    function A2(e3, t3) {
      this.type = e3, this.direction = t3 < 0 ? -1 : 1;
    }
    function ee2(e3, t3, n3, r3) {
      this.type = e3, this.currentLoop = n3, this.totalLoops = t3, this.direction = r3 < 0 ? -1 : 1;
    }
    function j2(e3, t3, n3) {
      this.type = e3, this.firstFrame = t3, this.totalFrames = n3;
    }
    function M2(e3, t3) {
      this.type = e3, this.target = t3;
    }
    function N2(e3, t3) {
      this.type = `renderFrameError`, this.nativeError = e3, this.currentTime = t3;
    }
    function te2(e3) {
      this.type = `configError`, this.nativeError = e3;
    }
    var P2 = /* @__PURE__ */ (function() {
      var e3 = 0;
      return function() {
        return e3 += 1, y2 + `__lottie_element_` + e3;
      };
    })();
    function F2(e3, t3, n3) {
      var r3, i3, a3, o3 = Math.floor(e3 * 6), s3 = e3 * 6 - o3, c3 = n3 * (1 - t3), l3 = n3 * (1 - s3 * t3), u3 = n3 * (1 - (1 - s3) * t3);
      switch (o3 % 6) {
        case 0:
          r3 = n3, i3 = u3, a3 = c3;
          break;
        case 1:
          r3 = l3, i3 = n3, a3 = c3;
          break;
        case 2:
          r3 = c3, i3 = n3, a3 = u3;
          break;
        case 3:
          r3 = c3, i3 = l3, a3 = n3;
          break;
        case 4:
          r3 = u3, i3 = c3, a3 = n3;
          break;
        case 5:
          r3 = n3, i3 = c3, a3 = l3;
      }
      return [r3, i3, a3];
    }
    function ne2(e3, t3, n3) {
      var r3 = Math.max(e3, t3, n3), i3 = Math.min(e3, t3, n3), a3 = r3 - i3, o3, s3 = r3 === 0 ? 0 : a3 / r3, c3 = r3 / 255;
      switch (r3) {
        case i3:
          o3 = 0;
          break;
        case e3:
          o3 = t3 - n3 + a3 * (t3 < n3 ? 6 : 0), o3 /= 6 * a3;
          break;
        case t3:
          o3 = n3 - e3 + a3 * 2, o3 /= 6 * a3;
          break;
        case n3:
          o3 = e3 - t3 + a3 * 4, o3 /= 6 * a3;
      }
      return [o3, s3, c3];
    }
    function re2(e3, t3) {
      var n3 = ne2(e3[0] * 255, e3[1] * 255, e3[2] * 255);
      return n3[1] += t3, n3[1] > 1 ? n3[1] = 1 : n3[1] <= 0 && (n3[1] = 0), F2(n3[0], n3[1], n3[2]);
    }
    function ie2(e3, t3) {
      var n3 = ne2(e3[0] * 255, e3[1] * 255, e3[2] * 255);
      return n3[2] += t3, n3[2] > 1 ? n3[2] = 1 : n3[2] < 0 && (n3[2] = 0), F2(n3[0], n3[1], n3[2]);
    }
    function I2(e3, t3) {
      var n3 = ne2(e3[0] * 255, e3[1] * 255, e3[2] * 255);
      return n3[0] += t3 / 360, n3[0] > 1 ? --n3[0] : n3[0] < 0 && (n3[0] += 1), F2(n3[0], n3[1], n3[2]);
    }
    (function() {
      var e3 = [], t3, n3;
      for (t3 = 0; t3 < 256; t3 += 1) n3 = t3.toString(16), e3[t3] = n3.length === 1 ? `0` + n3 : n3;
      return function(t4, n4, r3) {
        return t4 < 0 && (t4 = 0), n4 < 0 && (n4 = 0), r3 < 0 && (r3 = 0), `#` + e3[t4] + e3[n4] + e3[r3];
      };
    })();
    var L2 = function(e3) {
      g2 = !!e3;
    }, ae2 = function() {
      return g2;
    }, oe2 = function(e3) {
      _2 = e3;
    }, se2 = function() {
      return _2;
    }, ce2 = function() {
      return v2;
    }, le2 = function(e3) {
      E2 = e3;
    }, ue2 = function() {
      return E2;
    }, de2 = function(e3) {
      y2 = e3;
    };
    function R2(e3) {
      return document.createElementNS(`http://www.w3.org/2000/svg`, e3);
    }
    function fe2(e3) {
      "@babel/helpers - typeof";
      return fe2 = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e4) {
        return typeof e4;
      } : function(e4) {
        return e4 && typeof Symbol == `function` && e4.constructor === Symbol && e4 !== Symbol.prototype ? `symbol` : typeof e4;
      }, fe2(e3);
    }
    var z2 = /* @__PURE__ */ (function() {
      var e3 = 1, t3 = [], n3, r3, i3 = { onmessage: function() {
      }, postMessage: function(e4) {
        n3({ data: e4 });
      } }, a3 = { postMessage: function(e4) {
        i3.onmessage({ data: e4 });
      } };
      function s3(e4) {
        if (window.Worker && window.Blob && o2()) {
          var t4 = new Blob([`var _workerSelf = self; self.onmessage = `, e4.toString()], { type: `text/javascript` }), r4 = URL.createObjectURL(t4);
          return new Worker(r4);
        }
        return n3 = e4, i3;
      }
      function c3() {
        r3 || (r3 = s3(function(e4) {
          function t4() {
            function e5(t6, n6) {
              var o4, s5, c5 = t6.length, l5, u5, d5, f5;
              for (s5 = 0; s5 < c5; s5 += 1) if (o4 = t6[s5], `ks` in o4 && !o4.completed) {
                if (o4.completed = true, o4.hasMask) {
                  var m4 = o4.masksProperties;
                  for (u5 = m4.length, l5 = 0; l5 < u5; l5 += 1) if (m4[l5].pt.k.i) a4(m4[l5].pt.k);
                  else for (f5 = m4[l5].pt.k.length, d5 = 0; d5 < f5; d5 += 1) m4[l5].pt.k[d5].s && a4(m4[l5].pt.k[d5].s[0]), m4[l5].pt.k[d5].e && a4(m4[l5].pt.k[d5].e[0]);
                }
                o4.ty === 0 ? (o4.layers = r4(o4.refId, n6), e5(o4.layers, n6)) : o4.ty === 4 ? i4(o4.shapes) : o4.ty === 5 && p3(o4);
              }
            }
            function t5(t6, n6) {
              if (t6) {
                var i5 = 0, a5 = t6.length;
                for (i5 = 0; i5 < a5; i5 += 1) t6[i5].t === 1 && (t6[i5].data.layers = r4(t6[i5].data.refId, n6), e5(t6[i5].data.layers, n6));
              }
            }
            function n5(e6, t6) {
              for (var n6 = 0, r5 = t6.length; n6 < r5; ) {
                if (t6[n6].id === e6) return t6[n6];
                n6 += 1;
              }
              return null;
            }
            function r4(e6, t6) {
              var r5 = n5(e6, t6);
              return r5 ? r5.layers.__used ? JSON.parse(JSON.stringify(r5.layers)) : (r5.layers.__used = true, r5.layers) : null;
            }
            function i4(e6) {
              var t6, n6 = e6.length, r5, o4;
              for (t6 = n6 - 1; t6 >= 0; --t6) if (e6[t6].ty === `sh`) {
                if (e6[t6].ks.k.i) a4(e6[t6].ks.k);
                else for (o4 = e6[t6].ks.k.length, r5 = 0; r5 < o4; r5 += 1) e6[t6].ks.k[r5].s && a4(e6[t6].ks.k[r5].s[0]), e6[t6].ks.k[r5].e && a4(e6[t6].ks.k[r5].e[0]);
              } else e6[t6].ty === `gr` && i4(e6[t6].it);
            }
            function a4(e6) {
              var t6, n6 = e6.i.length;
              for (t6 = 0; t6 < n6; t6 += 1) e6.i[t6][0] += e6.v[t6][0], e6.i[t6][1] += e6.v[t6][1], e6.o[t6][0] += e6.v[t6][0], e6.o[t6][1] += e6.v[t6][1];
            }
            function o3(e6, t6) {
              var n6 = t6 ? t6.split(`.`) : [100, 100, 100];
              return e6[0] > n6[0] ? true : n6[0] > e6[0] ? false : e6[1] > n6[1] ? true : n6[1] > e6[1] ? false : e6[2] > n6[2] ? true : n6[2] > e6[2] ? false : null;
            }
            var s4 = /* @__PURE__ */ (function() {
              var e6 = [4, 4, 14];
              function t6(e7) {
                var t7 = e7.t.d;
                e7.t.d = { k: [{ s: t7, t: 0 }] };
              }
              function n6(e7) {
                var n7, r5 = e7.length;
                for (n7 = 0; n7 < r5; n7 += 1) e7[n7].ty === 5 && t6(e7[n7]);
              }
              return function(t7) {
                if (o3(e6, t7.v) && (n6(t7.layers), t7.assets)) {
                  var r5, i5 = t7.assets.length;
                  for (r5 = 0; r5 < i5; r5 += 1) t7.assets[r5].layers && n6(t7.assets[r5].layers);
                }
              };
            })(), c4 = /* @__PURE__ */ (function() {
              var e6 = [4, 7, 99];
              return function(t6) {
                if (t6.chars && !o3(e6, t6.v)) {
                  var n6, r5 = t6.chars.length;
                  for (n6 = 0; n6 < r5; n6 += 1) {
                    var a5 = t6.chars[n6];
                    a5.data && a5.data.shapes && (i4(a5.data.shapes), a5.data.ip = 0, a5.data.op = 99999, a5.data.st = 0, a5.data.sr = 1, a5.data.ks = { p: { k: [0, 0], a: 0 }, s: { k: [100, 100], a: 0 }, a: { k: [0, 0], a: 0 }, r: { k: 0, a: 0 }, o: { k: 100, a: 0 } }, t6.chars[n6].t || (a5.data.shapes.push({ ty: `no` }), a5.data.shapes[0].it.push({ p: { k: [0, 0], a: 0 }, s: { k: [100, 100], a: 0 }, a: { k: [0, 0], a: 0 }, r: { k: 0, a: 0 }, o: { k: 100, a: 0 }, sk: { k: 0, a: 0 }, sa: { k: 0, a: 0 }, ty: `tr` })));
                  }
                }
              };
            })(), l4 = /* @__PURE__ */ (function() {
              var e6 = [5, 7, 15];
              function t6(e7) {
                var t7 = e7.t.p;
                typeof t7.a == `number` && (t7.a = { a: 0, k: t7.a }), typeof t7.p == `number` && (t7.p = { a: 0, k: t7.p }), typeof t7.r == `number` && (t7.r = { a: 0, k: t7.r });
              }
              function n6(e7) {
                var n7, r5 = e7.length;
                for (n7 = 0; n7 < r5; n7 += 1) e7[n7].ty === 5 && t6(e7[n7]);
              }
              return function(t7) {
                if (o3(e6, t7.v) && (n6(t7.layers), t7.assets)) {
                  var r5, i5 = t7.assets.length;
                  for (r5 = 0; r5 < i5; r5 += 1) t7.assets[r5].layers && n6(t7.assets[r5].layers);
                }
              };
            })(), u4 = /* @__PURE__ */ (function() {
              var e6 = [4, 1, 9];
              function t6(e7) {
                var n7, r5 = e7.length, i5, a5;
                for (n7 = 0; n7 < r5; n7 += 1) if (e7[n7].ty === `gr`) t6(e7[n7].it);
                else if (e7[n7].ty === `fl` || e7[n7].ty === `st`) {
                  if (e7[n7].c.k && e7[n7].c.k[0].i) for (a5 = e7[n7].c.k.length, i5 = 0; i5 < a5; i5 += 1) e7[n7].c.k[i5].s && (e7[n7].c.k[i5].s[0] /= 255, e7[n7].c.k[i5].s[1] /= 255, e7[n7].c.k[i5].s[2] /= 255, e7[n7].c.k[i5].s[3] /= 255), e7[n7].c.k[i5].e && (e7[n7].c.k[i5].e[0] /= 255, e7[n7].c.k[i5].e[1] /= 255, e7[n7].c.k[i5].e[2] /= 255, e7[n7].c.k[i5].e[3] /= 255);
                  else e7[n7].c.k[0] /= 255, e7[n7].c.k[1] /= 255, e7[n7].c.k[2] /= 255, e7[n7].c.k[3] /= 255;
                }
              }
              function n6(e7) {
                var n7, r5 = e7.length;
                for (n7 = 0; n7 < r5; n7 += 1) e7[n7].ty === 4 && t6(e7[n7].shapes);
              }
              return function(t7) {
                if (o3(e6, t7.v) && (n6(t7.layers), t7.assets)) {
                  var r5, i5 = t7.assets.length;
                  for (r5 = 0; r5 < i5; r5 += 1) t7.assets[r5].layers && n6(t7.assets[r5].layers);
                }
              };
            })(), d4 = /* @__PURE__ */ (function() {
              var e6 = [4, 4, 18];
              function t6(e7) {
                var n7, r5 = e7.length, i5, a5;
                for (n7 = r5 - 1; n7 >= 0; --n7) if (e7[n7].ty === `sh`) {
                  if (e7[n7].ks.k.i) e7[n7].ks.k.c = e7[n7].closed;
                  else for (a5 = e7[n7].ks.k.length, i5 = 0; i5 < a5; i5 += 1) e7[n7].ks.k[i5].s && (e7[n7].ks.k[i5].s[0].c = e7[n7].closed), e7[n7].ks.k[i5].e && (e7[n7].ks.k[i5].e[0].c = e7[n7].closed);
                } else e7[n7].ty === `gr` && t6(e7[n7].it);
              }
              function n6(e7) {
                var n7, r5, i5 = e7.length, a5, o4, s5, c5;
                for (r5 = 0; r5 < i5; r5 += 1) {
                  if (n7 = e7[r5], n7.hasMask) {
                    var l5 = n7.masksProperties;
                    for (o4 = l5.length, a5 = 0; a5 < o4; a5 += 1) if (l5[a5].pt.k.i) l5[a5].pt.k.c = l5[a5].cl;
                    else for (c5 = l5[a5].pt.k.length, s5 = 0; s5 < c5; s5 += 1) l5[a5].pt.k[s5].s && (l5[a5].pt.k[s5].s[0].c = l5[a5].cl), l5[a5].pt.k[s5].e && (l5[a5].pt.k[s5].e[0].c = l5[a5].cl);
                  }
                  n7.ty === 4 && t6(n7.shapes);
                }
              }
              return function(t7) {
                if (o3(e6, t7.v) && (n6(t7.layers), t7.assets)) {
                  var r5, i5 = t7.assets.length;
                  for (r5 = 0; r5 < i5; r5 += 1) t7.assets[r5].layers && n6(t7.assets[r5].layers);
                }
              };
            })();
            function f4(n6) {
              n6.__complete ||= (u4(n6), s4(n6), c4(n6), l4(n6), d4(n6), e5(n6.layers, n6.assets), t5(n6.chars, n6.assets), true);
            }
            function p3(e6) {
              e6.t.a.length === 0 && `m` in e6.t.p;
            }
            var m3 = {};
            return m3.completeData = f4, m3.checkColors = u4, m3.checkChars = c4, m3.checkPathProperties = l4, m3.checkShapes = d4, m3.completeLayers = e5, m3;
          }
          if (a3.dataManager ||= t4(), a3.assetLoader ||= /* @__PURE__ */ (function() {
            function e5(e6) {
              var t6 = e6.getResponseHeader(`content-type`);
              return t6 && e6.responseType === `json` && t6.indexOf(`json`) !== -1 || e6.response && fe2(e6.response) === `object` ? e6.response : e6.response && typeof e6.response == `string` ? JSON.parse(e6.response) : e6.responseText ? JSON.parse(e6.responseText) : null;
            }
            function t5(t6, n5, r4, i4) {
              var a4, o3 = new XMLHttpRequest();
              try {
                o3.responseType = `json`;
              } catch {
              }
              o3.onreadystatechange = function() {
                if (o3.readyState === 4) {
                  if (o3.status === 200) a4 = e5(o3), r4(a4);
                  else try {
                    a4 = e5(o3), r4(a4);
                  } catch (e6) {
                    i4 && i4(e6);
                  }
                }
              };
              try {
                o3.open([`G`, `E`, `T`].join(``), t6, true);
              } catch {
                o3.open([`G`, `E`, `T`].join(``), n5 + `/` + t6, true);
              }
              o3.send();
            }
            return { load: t5 };
          })(), e4.data.type === `loadAnimation`) a3.assetLoader.load(e4.data.path, e4.data.fullPath, function(t5) {
            a3.dataManager.completeData(t5), a3.postMessage({ id: e4.data.id, payload: t5, status: `success` });
          }, function() {
            a3.postMessage({ id: e4.data.id, status: `error` });
          });
          else if (e4.data.type === `complete`) {
            var n4 = e4.data.animation;
            a3.dataManager.completeData(n4), a3.postMessage({ id: e4.data.id, payload: n4, status: `success` });
          } else e4.data.type === `loadData` && a3.assetLoader.load(e4.data.path, e4.data.fullPath, function(t5) {
            a3.postMessage({ id: e4.data.id, payload: t5, status: `success` });
          }, function() {
            a3.postMessage({ id: e4.data.id, status: `error` });
          });
        }), r3.onmessage = function(e4) {
          var n4 = e4.data, r4 = n4.id, i4 = t3[r4];
          t3[r4] = null, n4.status === `success` ? i4.onComplete(n4.payload) : i4.onError && i4.onError();
        });
      }
      function l3(n4, r4) {
        e3 += 1;
        var i4 = `processId_` + e3;
        return t3[i4] = { onComplete: n4, onError: r4 }, i4;
      }
      function u3(e4, t4, n4) {
        c3();
        var i4 = l3(t4, n4);
        r3.postMessage({ type: `loadAnimation`, path: e4, fullPath: window.location.origin + window.location.pathname, id: i4 });
      }
      function d3(e4, t4, n4) {
        c3();
        var i4 = l3(t4, n4);
        r3.postMessage({ type: `loadData`, path: e4, fullPath: window.location.origin + window.location.pathname, id: i4 });
      }
      function f3(e4, t4, n4) {
        c3();
        var i4 = l3(t4, n4);
        r3.postMessage({ type: `complete`, animation: e4, id: i4 });
      }
      return { loadAnimation: u3, loadData: d3, completeAnimation: f3 };
    })(), pe2 = (function() {
      var e3 = (function() {
        var e4 = l2(`canvas`);
        e4.width = 1, e4.height = 1;
        var t4 = e4.getContext(`2d`);
        return t4.fillStyle = `rgba(0,0,0,0)`, t4.fillRect(0, 0, 1, 1), e4;
      })();
      function t3() {
        this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
      }
      function n3() {
        this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
      }
      function r3(e4, t4, n4) {
        var r4 = ``;
        if (e4.e) r4 = e4.p;
        else if (t4) {
          var i4 = e4.p;
          i4.indexOf(`images/`) !== -1 && (i4 = i4.split(`/`)[1]), r4 = t4 + i4;
        } else r4 = n4, r4 += e4.u ? e4.u : ``, r4 += e4.p;
        return r4;
      }
      function i3(e4) {
        var t4 = 0, n4 = setInterval(function() {
          (e4.getBBox().width || t4 > 500) && (this._imageLoaded(), clearInterval(n4)), t4 += 1;
        }.bind(this), 50);
      }
      function a3(t4) {
        var n4 = r3(t4, this.assetsPath, this.path), i4 = R2(`image`);
        b2 ? this.testImageLoaded(i4) : i4.addEventListener(`load`, this._imageLoaded, false), i4.addEventListener(`error`, function() {
          a4.img = e3, this._imageLoaded();
        }.bind(this), false), i4.setAttributeNS(`http://www.w3.org/1999/xlink`, `href`, n4), this._elementHelper.append ? this._elementHelper.append(i4) : this._elementHelper.appendChild(i4);
        var a4 = { img: i4, assetData: t4 };
        return a4;
      }
      function o3(t4) {
        var n4 = r3(t4, this.assetsPath, this.path), i4 = l2(`img`);
        i4.crossOrigin = `anonymous`, i4.addEventListener(`load`, this._imageLoaded, false), i4.addEventListener(`error`, function() {
          a4.img = e3, this._imageLoaded();
        }.bind(this), false), i4.src = n4;
        var a4 = { img: i4, assetData: t4 };
        return a4;
      }
      function s3(e4) {
        var t4 = { assetData: e4 }, n4 = r3(e4, this.assetsPath, this.path);
        return z2.loadData(n4, function(e5) {
          t4.img = e5, this._footageLoaded();
        }.bind(this), function() {
          t4.img = {}, this._footageLoaded();
        }.bind(this)), t4;
      }
      function c3(e4, t4) {
        this.imagesLoadedCb = t4;
        var n4, r4 = e4.length;
        for (n4 = 0; n4 < r4; n4 += 1) e4[n4].layers || (!e4[n4].t || e4[n4].t === `seq` ? (this.totalImages += 1, this.images.push(this._createImageData(e4[n4]))) : e4[n4].t === 3 && (this.totalFootages += 1, this.images.push(this.createFootageData(e4[n4]))));
      }
      function u3(e4) {
        this.path = e4 || ``;
      }
      function d3(e4) {
        this.assetsPath = e4 || ``;
      }
      function f3(e4) {
        for (var t4 = 0, n4 = this.images.length; t4 < n4; ) {
          if (this.images[t4].assetData === e4) return this.images[t4].img;
          t4 += 1;
        }
        return null;
      }
      function p3() {
        this.imagesLoadedCb = null, this.images.length = 0;
      }
      function m3() {
        return this.totalImages === this.loadedAssets;
      }
      function h3() {
        return this.totalFootages === this.loadedFootagesCount;
      }
      function g3(e4, t4) {
        e4 === `svg` ? (this._elementHelper = t4, this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this);
      }
      function _3() {
        this._imageLoaded = t3.bind(this), this._footageLoaded = n3.bind(this), this.testImageLoaded = i3.bind(this), this.createFootageData = s3.bind(this), this.assetsPath = ``, this.path = ``, this.totalImages = 0, this.totalFootages = 0, this.loadedAssets = 0, this.loadedFootagesCount = 0, this.imagesLoadedCb = null, this.images = [];
      }
      return _3.prototype = { loadAssets: c3, setAssetsPath: d3, setPath: u3, loadedImages: m3, loadedFootages: h3, destroy: p3, getAsset: f3, createImgData: o3, createImageData: a3, imageLoaded: t3, footageLoaded: n3, setCacheType: g3 }, _3;
    })();
    function me2() {
    }
    me2.prototype = { triggerEvent: function(e3, t3) {
      if (this._cbs[e3]) for (var n3 = this._cbs[e3], r3 = 0; r3 < n3.length; r3 += 1) n3[r3](t3);
    }, addEventListener: function(e3, t3) {
      return this._cbs[e3] || (this._cbs[e3] = []), this._cbs[e3].push(t3), function() {
        this.removeEventListener(e3, t3);
      }.bind(this);
    }, removeEventListener: function(e3, t3) {
      if (!t3) this._cbs[e3] = null;
      else if (this._cbs[e3]) {
        for (var n3 = 0, r3 = this._cbs[e3].length; n3 < r3; ) this._cbs[e3][n3] === t3 && (this._cbs[e3].splice(n3, 1), --n3, --r3), n3 += 1;
        this._cbs[e3].length || (this._cbs[e3] = null);
      }
    } };
    var he2 = /* @__PURE__ */ (function() {
      function e3(e4) {
        for (var t3 = e4.split(`\r
`), n3 = {}, r3, i3 = 0, a3 = 0; a3 < t3.length; a3 += 1) r3 = t3[a3].split(`:`), r3.length === 2 && (n3[r3[0]] = r3[1].trim(), i3 += 1);
        if (i3 === 0) throw Error();
        return n3;
      }
      return function(t3) {
        for (var n3 = [], r3 = 0; r3 < t3.length; r3 += 1) {
          var i3 = t3[r3], a3 = { time: i3.tm, duration: i3.dr };
          try {
            a3.payload = JSON.parse(t3[r3].cm);
          } catch {
            try {
              a3.payload = e3(t3[r3].cm);
            } catch {
              a3.payload = { name: t3[r3].cm };
            }
          }
          n3.push(a3);
        }
        return n3;
      };
    })(), ge2 = /* @__PURE__ */ (function() {
      function e3(e4) {
        this.compositions.push(e4);
      }
      return function() {
        function t3(e4) {
          for (var t4 = 0, n3 = this.compositions.length; t4 < n3; ) {
            if (this.compositions[t4].data && this.compositions[t4].data.nm === e4) return this.compositions[t4].prepareFrame && this.compositions[t4].data.xt && this.compositions[t4].prepareFrame(this.currentFrame), this.compositions[t4].compInterface;
            t4 += 1;
          }
          return null;
        }
        return t3.compositions = [], t3.currentFrame = 0, t3.registerComposition = e3, t3;
      };
    })(), _e2 = {}, ve2 = function(e3, t3) {
      _e2[e3] = t3;
    };
    function ye2(e3) {
      return _e2[e3];
    }
    function be2() {
      if (_e2.canvas) return `canvas`;
      for (var e3 in _e2) if (_e2[e3]) return e3;
      return ``;
    }
    function xe2(e3) {
      "@babel/helpers - typeof";
      return xe2 = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e4) {
        return typeof e4;
      } : function(e4) {
        return e4 && typeof Symbol == `function` && e4.constructor === Symbol && e4 !== Symbol.prototype ? `symbol` : typeof e4;
      }, xe2(e3);
    }
    var B2 = function() {
      this._cbs = [], this.name = ``, this.path = ``, this.isLoaded = false, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = true, this.autoplay = false, this.loop = true, this.renderer = null, this.animationID = P2(), this.assetsPath = ``, this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = ae2(), this.segments = [], this._idle = true, this._completedLoop = false, this.projectInterface = ge2(), this.imagePreloader = new pe2(), this.audioController = f2(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this), this.drawnFrameEvent = new k2(`drawnFrame`, 0, 0, 0), this.expressionsPlugin = se2();
    };
    u2([me2], B2), B2.prototype.setParams = function(e3) {
      (e3.wrapper || e3.container) && (this.wrapper = e3.wrapper || e3.container);
      var t3 = `svg`;
      e3.animType ? t3 = e3.animType : e3.renderer && (t3 = e3.renderer);
      var n3 = ye2(t3);
      this.renderer = new n3(this, e3.rendererSettings), this.imagePreloader.setCacheType(t3, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = t3, this.loop = e3.loop === `` || e3.loop === null || e3.loop === void 0 || e3.loop === true || e3.loop !== false && parseInt(e3.loop, 10), this.autoplay = `autoplay` in e3 ? e3.autoplay : true, this.name = e3.name ? e3.name : ``, this.autoloadSegments = !Object.prototype.hasOwnProperty.call(e3, `autoloadSegments`) || e3.autoloadSegments, this.assetsPath = e3.assetsPath, this.initialSegment = e3.initialSegment, e3.audioFactory && this.audioController.setAudioFactory(e3.audioFactory), e3.animationData ? this.setupAnimation(e3.animationData) : e3.path && (this.path = e3.path.lastIndexOf(`\\`) === -1 ? e3.path.substr(0, e3.path.lastIndexOf(`/`) + 1) : e3.path.substr(0, e3.path.lastIndexOf(`\\`) + 1), this.fileName = e3.path.substr(e3.path.lastIndexOf(`/`) + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(`.json`)), z2.loadAnimation(e3.path, this.configAnimation, this.onSetupError));
    }, B2.prototype.onSetupError = function() {
      this.trigger(`data_failed`);
    }, B2.prototype.setupAnimation = function(e3) {
      z2.completeAnimation(e3, this.configAnimation);
    }, B2.prototype.setData = function(e3, t3) {
      t3 && xe2(t3) !== `object` && (t3 = JSON.parse(t3));
      var n3 = { wrapper: e3, animationData: t3 }, r3 = e3.attributes;
      n3.path = r3.getNamedItem(`data-animation-path`) ? r3.getNamedItem(`data-animation-path`).value : r3.getNamedItem(`data-bm-path`) ? r3.getNamedItem(`data-bm-path`).value : r3.getNamedItem(`bm-path`) ? r3.getNamedItem(`bm-path`).value : ``, n3.animType = r3.getNamedItem(`data-anim-type`) ? r3.getNamedItem(`data-anim-type`).value : r3.getNamedItem(`data-bm-type`) ? r3.getNamedItem(`data-bm-type`).value : r3.getNamedItem(`bm-type`) ? r3.getNamedItem(`bm-type`).value : r3.getNamedItem(`data-bm-renderer`) ? r3.getNamedItem(`data-bm-renderer`).value : r3.getNamedItem(`bm-renderer`) ? r3.getNamedItem(`bm-renderer`).value : be2() || `canvas`;
      var i3 = r3.getNamedItem(`data-anim-loop`) ? r3.getNamedItem(`data-anim-loop`).value : r3.getNamedItem(`data-bm-loop`) ? r3.getNamedItem(`data-bm-loop`).value : r3.getNamedItem(`bm-loop`) ? r3.getNamedItem(`bm-loop`).value : ``;
      i3 === `false` ? n3.loop = false : i3 === `true` ? n3.loop = true : i3 !== `` && (n3.loop = parseInt(i3, 10)), n3.autoplay = (r3.getNamedItem(`data-anim-autoplay`) ? r3.getNamedItem(`data-anim-autoplay`).value : r3.getNamedItem(`data-bm-autoplay`) ? r3.getNamedItem(`data-bm-autoplay`).value : !r3.getNamedItem(`bm-autoplay`) || r3.getNamedItem(`bm-autoplay`).value) !== `false`, n3.name = r3.getNamedItem(`data-name`) ? r3.getNamedItem(`data-name`).value : r3.getNamedItem(`data-bm-name`) ? r3.getNamedItem(`data-bm-name`).value : r3.getNamedItem(`bm-name`) ? r3.getNamedItem(`bm-name`).value : ``, (r3.getNamedItem(`data-anim-prerender`) ? r3.getNamedItem(`data-anim-prerender`).value : r3.getNamedItem(`data-bm-prerender`) ? r3.getNamedItem(`data-bm-prerender`).value : r3.getNamedItem(`bm-prerender`) ? r3.getNamedItem(`bm-prerender`).value : ``) === `false` && (n3.prerender = false), n3.path ? this.setParams(n3) : this.trigger(`destroy`);
    }, B2.prototype.includeLayers = function(e3) {
      e3.op > this.animationData.op && (this.animationData.op = e3.op, this.totalFrames = Math.floor(e3.op - this.animationData.ip));
      var t3 = this.animationData.layers, n3, r3 = t3.length, i3 = e3.layers, a3, o3 = i3.length;
      for (a3 = 0; a3 < o3; a3 += 1) for (n3 = 0; n3 < r3; ) {
        if (t3[n3].id === i3[a3].id) {
          t3[n3] = i3[a3];
          break;
        }
        n3 += 1;
      }
      if ((e3.chars || e3.fonts) && (this.renderer.globalData.fontManager.addChars(e3.chars), this.renderer.globalData.fontManager.addFonts(e3.fonts, this.renderer.globalData.defs)), e3.assets) for (r3 = e3.assets.length, n3 = 0; n3 < r3; n3 += 1) this.animationData.assets.push(e3.assets[n3]);
      this.animationData.__complete = false, z2.completeAnimation(this.animationData, this.onSegmentComplete);
    }, B2.prototype.onSegmentComplete = function(e3) {
      this.animationData = e3;
      var t3 = se2();
      t3 && t3.initExpressions(this), this.loadNextSegment();
    }, B2.prototype.loadNextSegment = function() {
      var e3 = this.animationData.segments;
      if (!e3 || e3.length === 0 || !this.autoloadSegments) {
        this.trigger(`data_ready`), this.timeCompleted = this.totalFrames;
        return;
      }
      var t3 = e3.shift();
      this.timeCompleted = t3.time * this.frameRate;
      var n3 = this.path + this.fileName + `_` + this.segmentPos + `.json`;
      this.segmentPos += 1, z2.loadData(n3, this.includeLayers.bind(this), function() {
        this.trigger(`data_failed`);
      }.bind(this));
    }, B2.prototype.loadSegments = function() {
      this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
    }, B2.prototype.imagesLoaded = function() {
      this.trigger(`loaded_images`), this.checkLoaded();
    }, B2.prototype.preloadImages = function() {
      this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
    }, B2.prototype.configAnimation = function(e3) {
      if (this.renderer) try {
        this.animationData = e3, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(e3), e3.assets ||= [], this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(e3.assets), this.markers = he2(e3.markers || []), this.trigger(`config_ready`), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause();
      } catch (e4) {
        this.triggerConfigError(e4);
      }
    }, B2.prototype.waitForFontsLoaded = function() {
      this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
    }, B2.prototype.checkLoaded = function() {
      if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || this.renderer.rendererType !== `canvas`) && this.imagePreloader.loadedFootages()) {
        this.isLoaded = true;
        var e3 = se2();
        e3 && e3.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
          this.trigger(`DOMLoaded`);
        }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play();
      }
    }, B2.prototype.resize = function(e3, t3) {
      var n3 = typeof e3 == `number` ? e3 : void 0, r3 = typeof t3 == `number` ? t3 : void 0;
      this.renderer.updateContainerSize(n3, r3);
    }, B2.prototype.setSubframe = function(e3) {
      this.isSubframeEnabled = !!e3;
    }, B2.prototype.gotoFrame = function() {
      this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger(`enterFrame`), this.renderFrame(), this.trigger(`drawnFrame`);
    }, B2.prototype.renderFrame = function() {
      if (!(this.isLoaded === false || !this.renderer)) try {
        this.expressionsPlugin && this.expressionsPlugin.resetFrame(), this.renderer.renderFrame(this.currentFrame + this.firstFrame);
      } catch (e3) {
        this.triggerRenderFrameError(e3);
      }
    }, B2.prototype.play = function(e3) {
      e3 && this.name !== e3 || this.isPaused === true && (this.isPaused = false, this.trigger(`_play`), this.audioController.resume(), this._idle && (this._idle = false, this.trigger(`_active`)));
    }, B2.prototype.pause = function(e3) {
      e3 && this.name !== e3 || this.isPaused === false && (this.isPaused = true, this.trigger(`_pause`), this._idle = true, this.trigger(`_idle`), this.audioController.pause());
    }, B2.prototype.togglePause = function(e3) {
      e3 && this.name !== e3 || (this.isPaused === true ? this.play() : this.pause());
    }, B2.prototype.stop = function(e3) {
      e3 && this.name !== e3 || (this.pause(), this.playCount = 0, this._completedLoop = false, this.setCurrentRawFrameValue(0));
    }, B2.prototype.getMarkerData = function(e3) {
      for (var t3, n3 = 0; n3 < this.markers.length; n3 += 1) if (t3 = this.markers[n3], t3.payload && t3.payload.name === e3) return t3;
      return null;
    }, B2.prototype.goToAndStop = function(e3, t3, n3) {
      if (!(n3 && this.name !== n3)) {
        var r3 = Number(e3);
        if (isNaN(r3)) {
          var i3 = this.getMarkerData(e3);
          i3 && this.goToAndStop(i3.time, true);
        } else t3 ? this.setCurrentRawFrameValue(e3) : this.setCurrentRawFrameValue(e3 * this.frameModifier);
        this.pause();
      }
    }, B2.prototype.goToAndPlay = function(e3, t3, n3) {
      if (!(n3 && this.name !== n3)) {
        var r3 = Number(e3);
        if (isNaN(r3)) {
          var i3 = this.getMarkerData(e3);
          i3 && (i3.duration ? this.playSegments([i3.time, i3.time + i3.duration], true) : this.goToAndStop(i3.time, true));
        } else this.goToAndStop(r3, t3, n3);
        this.play();
      }
    }, B2.prototype.advanceTime = function(e3) {
      if (this.isPaused !== true && this.isLoaded !== false) {
        var t3 = this.currentRawFrame + e3 * this.frameModifier, n3 = false;
        t3 >= this.totalFrames - 1 && this.frameModifier > 0 ? !this.loop || this.playCount === this.loop ? this.checkSegments(t3 > this.totalFrames ? t3 % this.totalFrames : 0) || (n3 = true, t3 = this.totalFrames - 1) : t3 >= this.totalFrames ? (this.playCount += 1, this.checkSegments(t3 % this.totalFrames) || (this.setCurrentRawFrameValue(t3 % this.totalFrames), this._completedLoop = true, this.trigger(`loopComplete`))) : this.setCurrentRawFrameValue(t3) : t3 < 0 ? this.checkSegments(t3 % this.totalFrames) || (this.loop && !(this.playCount-- <= 0 && this.loop !== true) ? (this.setCurrentRawFrameValue(this.totalFrames + t3 % this.totalFrames), this._completedLoop ? this.trigger(`loopComplete`) : this._completedLoop = true) : (n3 = true, t3 = 0)) : this.setCurrentRawFrameValue(t3), n3 && (this.setCurrentRawFrameValue(t3), this.pause(), this.trigger(`complete`));
      }
    }, B2.prototype.adjustSegment = function(e3, t3) {
      this.playCount = 0, e3[1] < e3[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = e3[0] - e3[1], this.timeCompleted = this.totalFrames, this.firstFrame = e3[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - t3)) : e3[1] > e3[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = e3[1] - e3[0], this.timeCompleted = this.totalFrames, this.firstFrame = e3[0], this.setCurrentRawFrameValue(1e-3 + t3)), this.trigger(`segmentStart`);
    }, B2.prototype.setSegment = function(e3, t3) {
      var n3 = -1;
      this.isPaused && (this.currentRawFrame + this.firstFrame < e3 ? n3 = e3 : this.currentRawFrame + this.firstFrame > t3 && (n3 = t3 - e3)), this.firstFrame = e3, this.totalFrames = t3 - e3, this.timeCompleted = this.totalFrames, n3 !== -1 && this.goToAndStop(n3, true);
    }, B2.prototype.playSegments = function(e3, t3) {
      if (t3 && (this.segments.length = 0), xe2(e3[0]) === `object`) {
        var n3, r3 = e3.length;
        for (n3 = 0; n3 < r3; n3 += 1) this.segments.push(e3[n3]);
      } else this.segments.push(e3);
      this.segments.length && t3 && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
    }, B2.prototype.resetSegments = function(e3) {
      this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), e3 && this.checkSegments(0);
    }, B2.prototype.checkSegments = function(e3) {
      return this.segments.length ? (this.adjustSegment(this.segments.shift(), e3), true) : false;
    }, B2.prototype.destroy = function(e3) {
      e3 && this.name !== e3 || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger(`destroy`), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.expressionsPlugin = null, this.imagePreloader = null, this.projectInterface = null);
    }, B2.prototype.setCurrentRawFrameValue = function(e3) {
      this.currentRawFrame = e3, this.gotoFrame();
    }, B2.prototype.setSpeed = function(e3) {
      this.playSpeed = e3, this.updaFrameModifier();
    }, B2.prototype.setDirection = function(e3) {
      this.playDirection = e3 < 0 ? -1 : 1, this.updaFrameModifier();
    }, B2.prototype.setLoop = function(e3) {
      this.loop = e3;
    }, B2.prototype.setVolume = function(e3, t3) {
      t3 && this.name !== t3 || this.audioController.setVolume(e3);
    }, B2.prototype.getVolume = function() {
      return this.audioController.getVolume();
    }, B2.prototype.mute = function(e3) {
      e3 && this.name !== e3 || this.audioController.mute();
    }, B2.prototype.unmute = function(e3) {
      e3 && this.name !== e3 || this.audioController.unmute();
    }, B2.prototype.updaFrameModifier = function() {
      this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection);
    }, B2.prototype.getPath = function() {
      return this.path;
    }, B2.prototype.getAssetsPath = function(e3) {
      var t3 = ``;
      if (e3.e) t3 = e3.p;
      else if (this.assetsPath) {
        var n3 = e3.p;
        n3.indexOf(`images/`) !== -1 && (n3 = n3.split(`/`)[1]), t3 = this.assetsPath + n3;
      } else t3 = this.path, t3 += e3.u ? e3.u : ``, t3 += e3.p;
      return t3;
    }, B2.prototype.getAssetData = function(e3) {
      for (var t3 = 0, n3 = this.assets.length; t3 < n3; ) {
        if (e3 === this.assets[t3].id) return this.assets[t3];
        t3 += 1;
      }
      return null;
    }, B2.prototype.hide = function() {
      this.renderer.hide();
    }, B2.prototype.show = function() {
      this.renderer.show();
    }, B2.prototype.getDuration = function(e3) {
      return e3 ? this.totalFrames : this.totalFrames / this.frameRate;
    }, B2.prototype.updateDocumentData = function(e3, t3, n3) {
      try {
        this.renderer.getElementByPath(e3).updateDocumentData(t3, n3);
      } catch {
      }
    }, B2.prototype.trigger = function(e3) {
      if (this._cbs && this._cbs[e3]) switch (e3) {
        case `enterFrame`:
          this.triggerEvent(e3, new k2(e3, this.currentFrame, this.totalFrames, this.frameModifier));
          break;
        case `drawnFrame`:
          this.drawnFrameEvent.currentTime = this.currentFrame, this.drawnFrameEvent.totalTime = this.totalFrames, this.drawnFrameEvent.direction = this.frameModifier, this.triggerEvent(e3, this.drawnFrameEvent);
          break;
        case `loopComplete`:
          this.triggerEvent(e3, new ee2(e3, this.loop, this.playCount, this.frameMult));
          break;
        case `complete`:
          this.triggerEvent(e3, new A2(e3, this.frameMult));
          break;
        case `segmentStart`:
          this.triggerEvent(e3, new j2(e3, this.firstFrame, this.totalFrames));
          break;
        case `destroy`:
          this.triggerEvent(e3, new M2(e3, this));
          break;
        default:
          this.triggerEvent(e3);
      }
      e3 === `enterFrame` && this.onEnterFrame && this.onEnterFrame.call(this, new k2(e3, this.currentFrame, this.totalFrames, this.frameMult)), e3 === `loopComplete` && this.onLoopComplete && this.onLoopComplete.call(this, new ee2(e3, this.loop, this.playCount, this.frameMult)), e3 === `complete` && this.onComplete && this.onComplete.call(this, new A2(e3, this.frameMult)), e3 === `segmentStart` && this.onSegmentStart && this.onSegmentStart.call(this, new j2(e3, this.firstFrame, this.totalFrames)), e3 === `destroy` && this.onDestroy && this.onDestroy.call(this, new M2(e3, this));
    }, B2.prototype.triggerRenderFrameError = function(e3) {
      var t3 = new N2(e3, this.currentFrame);
      this.triggerEvent(`error`, t3), this.onError && this.onError.call(this, t3);
    }, B2.prototype.triggerConfigError = function(e3) {
      var t3 = new te2(e3, this.currentFrame);
      this.triggerEvent(`error`, t3), this.onError && this.onError.call(this, t3);
    };
    var Se2 = (function() {
      var e3 = {}, t3 = [], n3 = 0, r3 = 0, i3 = 0, a3 = true, o3 = false;
      function s3(e4) {
        for (var n4 = 0, i4 = e4.target; n4 < r3; ) t3[n4].animation === i4 && (t3.splice(n4, 1), --n4, --r3, i4.isPaused || f3()), n4 += 1;
      }
      function c3(e4, n4) {
        if (!e4) return null;
        for (var i4 = 0; i4 < r3; ) {
          if (t3[i4].elem === e4 && t3[i4].elem !== null) return t3[i4].animation;
          i4 += 1;
        }
        var a4 = new B2();
        return p3(a4, e4), a4.setData(e4, n4), a4;
      }
      function u3() {
        var e4, n4 = t3.length, r4 = [];
        for (e4 = 0; e4 < n4; e4 += 1) r4.push(t3[e4].animation);
        return r4;
      }
      function d3() {
        i3 += 1, D3();
      }
      function f3() {
        --i3;
      }
      function p3(e4, n4) {
        e4.addEventListener(`destroy`, s3), e4.addEventListener(`_active`, d3), e4.addEventListener(`_idle`, f3), t3.push({ elem: n4, animation: e4 }), r3 += 1;
      }
      function m3(e4) {
        var t4 = new B2();
        return p3(t4, null), t4.setParams(e4), t4;
      }
      function h3(e4, n4) {
        var i4;
        for (i4 = 0; i4 < r3; i4 += 1) t3[i4].animation.setSpeed(e4, n4);
      }
      function g3(e4, n4) {
        var i4;
        for (i4 = 0; i4 < r3; i4 += 1) t3[i4].animation.setDirection(e4, n4);
      }
      function _3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.play(e4);
      }
      function v3(e4) {
        var s4 = e4 - n3, c4;
        for (c4 = 0; c4 < r3; c4 += 1) t3[c4].animation.advanceTime(s4);
        n3 = e4, i3 && !o3 ? window.requestAnimationFrame(v3) : a3 = true;
      }
      function y3(e4) {
        n3 = e4, window.requestAnimationFrame(v3);
      }
      function b3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.pause(e4);
      }
      function x3(e4, n4, i4) {
        var a4;
        for (a4 = 0; a4 < r3; a4 += 1) t3[a4].animation.goToAndStop(e4, n4, i4);
      }
      function S3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.stop(e4);
      }
      function C3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.togglePause(e4);
      }
      function w3(e4) {
        var n4;
        for (n4 = r3 - 1; n4 >= 0; --n4) t3[n4].animation.destroy(e4);
      }
      function T3(e4, t4, n4) {
        var r4 = [].concat([].slice.call(document.getElementsByClassName(`lottie`)), [].slice.call(document.getElementsByClassName(`bodymovin`))), i4, a4 = r4.length;
        for (i4 = 0; i4 < a4; i4 += 1) n4 && r4[i4].setAttribute(`data-bm-type`, n4), c3(r4[i4], e4);
        if (t4 && a4 === 0) {
          n4 ||= `svg`;
          var o4 = document.getElementsByTagName(`body`)[0];
          o4.innerText = ``;
          var s4 = l2(`div`);
          s4.style.width = `100%`, s4.style.height = `100%`, s4.setAttribute(`data-bm-type`, n4), o4.appendChild(s4), c3(s4, e4);
        }
      }
      function E3() {
        var e4;
        for (e4 = 0; e4 < r3; e4 += 1) t3[e4].animation.resize();
      }
      function D3() {
        !o3 && i3 && (a3 &&= (window.requestAnimationFrame(y3), false));
      }
      function O3() {
        o3 = true;
      }
      function k3() {
        o3 = false, D3();
      }
      function A3(e4, n4) {
        var i4;
        for (i4 = 0; i4 < r3; i4 += 1) t3[i4].animation.setVolume(e4, n4);
      }
      function ee3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.mute(e4);
      }
      function j3(e4) {
        var n4;
        for (n4 = 0; n4 < r3; n4 += 1) t3[n4].animation.unmute(e4);
      }
      return e3.registerAnimation = c3, e3.loadAnimation = m3, e3.setSpeed = h3, e3.setDirection = g3, e3.play = _3, e3.pause = b3, e3.stop = S3, e3.togglePause = C3, e3.searchAnimations = T3, e3.resize = E3, e3.goToAndStop = x3, e3.destroy = w3, e3.freeze = O3, e3.unfreeze = k3, e3.setVolume = A3, e3.mute = ee3, e3.unmute = j3, e3.getRegisteredAnimations = u3, e3;
    })(), Ce2 = (function() {
      var e3 = {};
      e3.getBezierEasing = n3;
      var t3 = {};
      function n3(e4, n4, r4, i4, a4) {
        var o4 = a4 || (`bez_` + e4 + `_` + n4 + `_` + r4 + `_` + i4).replace(/\./g, `p`);
        if (t3[o4]) return t3[o4];
        var s4 = new _3([e4, n4, r4, i4]);
        return t3[o4] = s4, s4;
      }
      var r3 = 4, i3 = 1e-3, a3 = 1e-7, o3 = 10, s3 = 11, c3 = 1 / (s3 - 1), l3 = typeof Float32Array == `function`;
      function u3(e4, t4) {
        return 1 - 3 * t4 + 3 * e4;
      }
      function d3(e4, t4) {
        return 3 * t4 - 6 * e4;
      }
      function f3(e4) {
        return 3 * e4;
      }
      function p3(e4, t4, n4) {
        return ((u3(t4, n4) * e4 + d3(t4, n4)) * e4 + f3(t4)) * e4;
      }
      function m3(e4, t4, n4) {
        return 3 * u3(t4, n4) * e4 * e4 + 2 * d3(t4, n4) * e4 + f3(t4);
      }
      function h3(e4, t4, n4, r4, i4) {
        var s4, c4, l4 = 0;
        do
          c4 = t4 + (n4 - t4) / 2, s4 = p3(c4, r4, i4) - e4, s4 > 0 ? n4 = c4 : t4 = c4;
        while (Math.abs(s4) > a3 && ++l4 < o3);
        return c4;
      }
      function g3(e4, t4, n4, i4) {
        for (var a4 = 0; a4 < r3; ++a4) {
          var o4 = m3(t4, n4, i4);
          if (o4 === 0) return t4;
          var s4 = p3(t4, n4, i4) - e4;
          t4 -= s4 / o4;
        }
        return t4;
      }
      function _3(e4) {
        this._p = e4, this._mSampleValues = l3 ? new Float32Array(s3) : Array(s3), this._precomputed = false, this.get = this.get.bind(this);
      }
      return _3.prototype = { get: function(e4) {
        var t4 = this._p[0], n4 = this._p[1], r4 = this._p[2], i4 = this._p[3];
        return this._precomputed || this._precompute(), t4 === n4 && r4 === i4 ? e4 : e4 === 0 ? 0 : e4 === 1 ? 1 : p3(this._getTForX(e4), n4, i4);
      }, _precompute: function() {
        var e4 = this._p[0], t4 = this._p[1], n4 = this._p[2], r4 = this._p[3];
        this._precomputed = true, (e4 !== t4 || n4 !== r4) && this._calcSampleValues();
      }, _calcSampleValues: function() {
        for (var e4 = this._p[0], t4 = this._p[2], n4 = 0; n4 < s3; ++n4) this._mSampleValues[n4] = p3(n4 * c3, e4, t4);
      }, _getTForX: function(e4) {
        for (var t4 = this._p[0], n4 = this._p[2], r4 = this._mSampleValues, a4 = 0, o4 = 1, l4 = s3 - 1; o4 !== l4 && r4[o4] <= e4; ++o4) a4 += c3;
        --o4;
        var u4 = (e4 - r4[o4]) / (r4[o4 + 1] - r4[o4]), d4 = a4 + u4 * c3, f4 = m3(d4, t4, n4);
        return f4 >= i3 ? g3(e4, d4, t4, n4) : f4 === 0 ? d4 : h3(e4, a4, a4 + c3, t4, n4);
      } }, e3;
    })(), we2 = /* @__PURE__ */ (function() {
      function e3(e4) {
        return e4.concat(m2(e4.length));
      }
      return { double: e3 };
    })(), Te2 = /* @__PURE__ */ (function() {
      return function(e3, t3, n3) {
        var r3 = 0, i3 = e3, a3 = m2(i3), o3 = { newElement: s3, release: c3 };
        function s3() {
          var e4;
          return r3 ? (--r3, e4 = a3[r3]) : e4 = t3(), e4;
        }
        function c3(e4) {
          r3 === i3 && (a3 = we2.double(a3), i3 *= 2), n3 && n3(e4), a3[r3] = e4, r3 += 1;
        }
        return o3;
      };
    })(), Ee2 = (function() {
      function e3() {
        return { addedLength: 0, percents: p2(`float32`, ue2()), lengths: p2(`float32`, ue2()) };
      }
      return Te2(8, e3);
    })(), De2 = (function() {
      function e3() {
        return { lengths: [], totalLength: 0 };
      }
      function t3(e4) {
        var t4, n3 = e4.lengths.length;
        for (t4 = 0; t4 < n3; t4 += 1) Ee2.release(e4.lengths[t4]);
        e4.lengths.length = 0;
      }
      return Te2(8, e3, t3);
    })();
    function Oe2() {
      var e3 = Math;
      function t3(e4, t4, n4, r4, i4, a4) {
        var o4 = e4 * r4 + t4 * i4 + n4 * a4 - i4 * r4 - a4 * e4 - n4 * t4;
        return o4 > -1e-3 && o4 < 1e-3;
      }
      function n3(n4, r4, i4, a4, o4, s4, c4, l4, u4) {
        if (i4 === 0 && s4 === 0 && u4 === 0) return t3(n4, r4, a4, o4, c4, l4);
        var d4 = e3.sqrt(e3.pow(a4 - n4, 2) + e3.pow(o4 - r4, 2) + e3.pow(s4 - i4, 2)), f3 = e3.sqrt(e3.pow(c4 - n4, 2) + e3.pow(l4 - r4, 2) + e3.pow(u4 - i4, 2)), p3 = e3.sqrt(e3.pow(c4 - a4, 2) + e3.pow(l4 - o4, 2) + e3.pow(u4 - s4, 2)), m3 = d4 > f3 ? d4 > p3 ? d4 - f3 - p3 : p3 - f3 - d4 : p3 > f3 ? p3 - f3 - d4 : f3 - d4 - p3;
        return m3 > -1e-4 && m3 < 1e-4;
      }
      var r3 = /* @__PURE__ */ (function() {
        return function(e4, t4, n4, r4) {
          var i4 = ue2(), a4, o4, s4, c4, l4, u4 = 0, d4, f3 = [], p3 = [], m3 = Ee2.newElement();
          for (s4 = n4.length, a4 = 0; a4 < i4; a4 += 1) {
            for (l4 = a4 / (i4 - 1), d4 = 0, o4 = 0; o4 < s4; o4 += 1) c4 = x2(1 - l4, 3) * e4[o4] + 3 * x2(1 - l4, 2) * l4 * n4[o4] + 3 * (1 - l4) * x2(l4, 2) * r4[o4] + x2(l4, 3) * t4[o4], f3[o4] = c4, p3[o4] !== null && (d4 += x2(f3[o4] - p3[o4], 2)), p3[o4] = f3[o4];
            d4 && (d4 = S2(d4), u4 += d4), m3.percents[a4] = l4, m3.lengths[a4] = u4;
          }
          return m3.addedLength = u4, m3;
        };
      })();
      function i3(e4) {
        var t4 = De2.newElement(), n4 = e4.c, i4 = e4.v, a4 = e4.o, o4 = e4.i, s4, c4 = e4._length, l4 = t4.lengths, u4 = 0;
        for (s4 = 0; s4 < c4 - 1; s4 += 1) l4[s4] = r3(i4[s4], i4[s4 + 1], a4[s4], o4[s4 + 1]), u4 += l4[s4].addedLength;
        return n4 && c4 && (l4[s4] = r3(i4[s4], i4[0], a4[s4], o4[0]), u4 += l4[s4].addedLength), t4.totalLength = u4, t4;
      }
      function a3(e4) {
        this.segmentLength = 0, this.points = Array(e4);
      }
      function o3(e4, t4) {
        this.partialLength = e4, this.point = t4;
      }
      var s3 = /* @__PURE__ */ (function() {
        var e4 = {};
        return function(n4, r4, i4, s4) {
          var c4 = (n4[0] + `_` + n4[1] + `_` + r4[0] + `_` + r4[1] + `_` + i4[0] + `_` + i4[1] + `_` + s4[0] + `_` + s4[1]).replace(/\./g, `p`);
          if (!e4[c4]) {
            var l4 = ue2(), u4, d4, f3, p3, h3, g3 = 0, _3, v3, y3 = null;
            n4.length === 2 && (n4[0] !== r4[0] || n4[1] !== r4[1]) && t3(n4[0], n4[1], r4[0], r4[1], n4[0] + i4[0], n4[1] + i4[1]) && t3(n4[0], n4[1], r4[0], r4[1], r4[0] + s4[0], r4[1] + s4[1]) && (l4 = 2);
            var b3 = new a3(l4);
            for (f3 = i4.length, u4 = 0; u4 < l4; u4 += 1) {
              for (v3 = m2(f3), h3 = u4 / (l4 - 1), _3 = 0, d4 = 0; d4 < f3; d4 += 1) p3 = x2(1 - h3, 3) * n4[d4] + 3 * x2(1 - h3, 2) * h3 * (n4[d4] + i4[d4]) + 3 * (1 - h3) * x2(h3, 2) * (r4[d4] + s4[d4]) + x2(h3, 3) * r4[d4], v3[d4] = p3, y3 !== null && (_3 += x2(v3[d4] - y3[d4], 2));
              _3 = S2(_3), g3 += _3, b3.points[u4] = new o3(_3, v3), y3 = v3;
            }
            b3.segmentLength = g3, e4[c4] = b3;
          }
          return e4[c4];
        };
      })();
      function c3(e4, t4) {
        var n4 = t4.percents, r4 = t4.lengths, i4 = n4.length, a4 = C2((i4 - 1) * e4), o4 = e4 * t4.addedLength, s4 = 0;
        if (a4 === i4 - 1 || a4 === 0 || o4 === r4[a4]) return n4[a4];
        for (var c4 = r4[a4] > o4 ? -1 : 1, l4 = true; l4; ) if (r4[a4] <= o4 && r4[a4 + 1] > o4 ? (s4 = (o4 - r4[a4]) / (r4[a4 + 1] - r4[a4]), l4 = false) : a4 += c4, a4 < 0 || a4 >= i4 - 1) {
          if (a4 === i4 - 1) return n4[a4];
          l4 = false;
        }
        return n4[a4] + (n4[a4 + 1] - n4[a4]) * s4;
      }
      function l3(t4, n4, r4, i4, a4, o4) {
        var s4 = c3(a4, o4), l4 = 1 - s4;
        return [e3.round((l4 * l4 * l4 * t4[0] + (s4 * l4 * l4 + l4 * s4 * l4 + l4 * l4 * s4) * r4[0] + (s4 * s4 * l4 + l4 * s4 * s4 + s4 * l4 * s4) * i4[0] + s4 * s4 * s4 * n4[0]) * 1e3) / 1e3, e3.round((l4 * l4 * l4 * t4[1] + (s4 * l4 * l4 + l4 * s4 * l4 + l4 * l4 * s4) * r4[1] + (s4 * s4 * l4 + l4 * s4 * s4 + s4 * l4 * s4) * i4[1] + s4 * s4 * s4 * n4[1]) * 1e3) / 1e3];
      }
      var u3 = p2(`float32`, 8);
      function d3(t4, n4, r4, i4, a4, o4, s4) {
        a4 < 0 ? a4 = 0 : a4 > 1 && (a4 = 1);
        var l4 = c3(a4, s4);
        o4 = o4 > 1 ? 1 : o4;
        var d4 = c3(o4, s4), f3, p3 = t4.length, m3 = 1 - l4, h3 = 1 - d4, g3 = m3 * m3 * m3, _3 = l4 * m3 * m3 * 3, v3 = l4 * l4 * m3 * 3, y3 = l4 * l4 * l4, b3 = m3 * m3 * h3, x3 = l4 * m3 * h3 + m3 * l4 * h3 + m3 * m3 * d4, S3 = l4 * l4 * h3 + m3 * l4 * d4 + l4 * m3 * d4, C3 = l4 * l4 * d4, w3 = m3 * h3 * h3, T3 = l4 * h3 * h3 + m3 * d4 * h3 + m3 * h3 * d4, E3 = l4 * d4 * h3 + m3 * d4 * d4 + l4 * h3 * d4, D3 = l4 * d4 * d4, O3 = h3 * h3 * h3, k3 = d4 * h3 * h3 + h3 * d4 * h3 + h3 * h3 * d4, A3 = d4 * d4 * h3 + h3 * d4 * d4 + d4 * h3 * d4, ee3 = d4 * d4 * d4;
        for (f3 = 0; f3 < p3; f3 += 1) u3[f3 * 4] = e3.round((g3 * t4[f3] + _3 * r4[f3] + v3 * i4[f3] + y3 * n4[f3]) * 1e3) / 1e3, u3[f3 * 4 + 1] = e3.round((b3 * t4[f3] + x3 * r4[f3] + S3 * i4[f3] + C3 * n4[f3]) * 1e3) / 1e3, u3[f3 * 4 + 2] = e3.round((w3 * t4[f3] + T3 * r4[f3] + E3 * i4[f3] + D3 * n4[f3]) * 1e3) / 1e3, u3[f3 * 4 + 3] = e3.round((O3 * t4[f3] + k3 * r4[f3] + A3 * i4[f3] + ee3 * n4[f3]) * 1e3) / 1e3;
        return u3;
      }
      return { getSegmentsLength: i3, getNewSegment: d3, getPointInSegment: l3, buildBezierData: s3, pointOnLine2D: t3, pointOnLine3D: n3 };
    }
    var ke2 = Oe2(), Ae2 = i2, je2 = Math.abs;
    function Me2(e3, t3) {
      var n3 = this.offsetTime, r3;
      this.propType === `multidimensional` && (r3 = p2(`float32`, this.pv.length));
      for (var i3 = t3.lastIndex, a3 = i3, o3 = this.keyframes.length - 1, s3 = true, c3, l3, u3; s3; ) {
        if (c3 = this.keyframes[a3], l3 = this.keyframes[a3 + 1], a3 === o3 - 1 && e3 >= l3.t - n3) {
          c3.h && (c3 = l3), i3 = 0;
          break;
        }
        if (l3.t - n3 > e3) {
          i3 = a3;
          break;
        }
        a3 < o3 - 1 ? a3 += 1 : (i3 = 0, s3 = false);
      }
      u3 = this.keyframesMetadata[a3] || {};
      var d3, f3, m3, h3, g3, _3, v3 = l3.t - n3, y3 = c3.t - n3, b3;
      if (c3.to) {
        u3.bezierData || (u3.bezierData = ke2.buildBezierData(c3.s, l3.s || c3.e, c3.to, c3.ti));
        var x3 = u3.bezierData;
        if (e3 >= v3 || e3 < y3) {
          var S3 = e3 >= v3 ? x3.points.length - 1 : 0;
          for (f3 = x3.points[S3].point.length, d3 = 0; d3 < f3; d3 += 1) r3[d3] = x3.points[S3].point[d3];
        } else {
          u3.__fnct ? _3 = u3.__fnct : (_3 = Ce2.getBezierEasing(c3.o.x, c3.o.y, c3.i.x, c3.i.y, c3.n).get, u3.__fnct = _3), m3 = _3((e3 - y3) / (v3 - y3));
          var C3 = x3.segmentLength * m3, w3, T3 = t3.lastFrame < e3 && t3._lastKeyframeIndex === a3 ? t3._lastAddedLength : 0;
          for (g3 = t3.lastFrame < e3 && t3._lastKeyframeIndex === a3 ? t3._lastPoint : 0, s3 = true, h3 = x3.points.length; s3; ) {
            if (T3 += x3.points[g3].partialLength, C3 === 0 || m3 === 0 || g3 === x3.points.length - 1) {
              for (f3 = x3.points[g3].point.length, d3 = 0; d3 < f3; d3 += 1) r3[d3] = x3.points[g3].point[d3];
              break;
            }
            if (C3 >= T3 && C3 < T3 + x3.points[g3 + 1].partialLength) {
              for (w3 = (C3 - T3) / x3.points[g3 + 1].partialLength, f3 = x3.points[g3].point.length, d3 = 0; d3 < f3; d3 += 1) r3[d3] = x3.points[g3].point[d3] + (x3.points[g3 + 1].point[d3] - x3.points[g3].point[d3]) * w3;
              break;
            }
            g3 < h3 - 1 ? g3 += 1 : s3 = false;
          }
          t3._lastPoint = g3, t3._lastAddedLength = T3 - x3.points[g3].partialLength, t3._lastKeyframeIndex = a3;
        }
      } else {
        var E3, D3, O3, k3, A3;
        if (o3 = c3.s.length, b3 = l3.s || c3.e, this.sh && c3.h !== 1) {
          if (e3 >= v3) r3[0] = b3[0], r3[1] = b3[1], r3[2] = b3[2];
          else if (e3 <= y3) r3[0] = c3.s[0], r3[1] = c3.s[1], r3[2] = c3.s[2];
          else {
            var ee3 = Pe2(c3.s), j3 = Pe2(b3), M3 = (e3 - y3) / (v3 - y3);
            Ne2(r3, V2(ee3, j3, M3));
          }
        } else for (a3 = 0; a3 < o3; a3 += 1) c3.h !== 1 && (e3 >= v3 ? m3 = 1 : e3 < y3 ? m3 = 0 : (c3.o.x.constructor === Array ? (u3.__fnct || (u3.__fnct = []), u3.__fnct[a3] ? _3 = u3.__fnct[a3] : (E3 = c3.o.x[a3] === void 0 ? c3.o.x[0] : c3.o.x[a3], D3 = c3.o.y[a3] === void 0 ? c3.o.y[0] : c3.o.y[a3], O3 = c3.i.x[a3] === void 0 ? c3.i.x[0] : c3.i.x[a3], k3 = c3.i.y[a3] === void 0 ? c3.i.y[0] : c3.i.y[a3], _3 = Ce2.getBezierEasing(E3, D3, O3, k3).get, u3.__fnct[a3] = _3)) : u3.__fnct ? _3 = u3.__fnct : (E3 = c3.o.x, D3 = c3.o.y, O3 = c3.i.x, k3 = c3.i.y, _3 = Ce2.getBezierEasing(E3, D3, O3, k3).get, c3.keyframeMetadata = _3), m3 = _3((e3 - y3) / (v3 - y3)))), b3 = l3.s || c3.e, A3 = c3.h === 1 ? c3.s[a3] : c3.s[a3] + (b3[a3] - c3.s[a3]) * m3, this.propType === `multidimensional` ? r3[a3] = A3 : r3 = A3;
      }
      return t3.lastIndex = i3, r3;
    }
    function V2(e3, t3, n3) {
      var r3 = [], i3 = e3[0], a3 = e3[1], o3 = e3[2], s3 = e3[3], c3 = t3[0], l3 = t3[1], u3 = t3[2], d3 = t3[3], f3, p3 = i3 * c3 + a3 * l3 + o3 * u3 + s3 * d3, m3, h3, g3;
      return p3 < 0 && (p3 = -p3, c3 = -c3, l3 = -l3, u3 = -u3, d3 = -d3), 1 - p3 > 1e-6 ? (f3 = Math.acos(p3), m3 = Math.sin(f3), h3 = Math.sin((1 - n3) * f3) / m3, g3 = Math.sin(n3 * f3) / m3) : (h3 = 1 - n3, g3 = n3), r3[0] = h3 * i3 + g3 * c3, r3[1] = h3 * a3 + g3 * l3, r3[2] = h3 * o3 + g3 * u3, r3[3] = h3 * s3 + g3 * d3, r3;
    }
    function Ne2(e3, t3) {
      var n3 = t3[0], r3 = t3[1], i3 = t3[2], a3 = t3[3], o3 = Math.atan2(2 * r3 * a3 - 2 * n3 * i3, 1 - 2 * r3 * r3 - 2 * i3 * i3), s3 = Math.asin(2 * n3 * r3 + 2 * i3 * a3), c3 = Math.atan2(2 * n3 * a3 - 2 * r3 * i3, 1 - 2 * n3 * n3 - 2 * i3 * i3);
      e3[0] = o3 / D2, e3[1] = s3 / D2, e3[2] = c3 / D2;
    }
    function Pe2(e3) {
      var t3 = e3[0] * D2, n3 = e3[1] * D2, r3 = e3[2] * D2, i3 = Math.cos(t3 / 2), a3 = Math.cos(n3 / 2), o3 = Math.cos(r3 / 2), s3 = Math.sin(t3 / 2), c3 = Math.sin(n3 / 2), l3 = Math.sin(r3 / 2), u3 = i3 * a3 * o3 - s3 * c3 * l3;
      return [s3 * c3 * o3 + i3 * a3 * l3, s3 * a3 * o3 + i3 * c3 * l3, i3 * c3 * o3 - s3 * a3 * l3, u3];
    }
    function Fe2() {
      var e3 = this.comp.renderedFrame - this.offsetTime, t3 = this.keyframes[0].t - this.offsetTime, n3 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
      if (!(e3 === this._caching.lastFrame || this._caching.lastFrame !== Ae2 && (this._caching.lastFrame >= n3 && e3 >= n3 || this._caching.lastFrame < t3 && e3 < t3))) {
        this._caching.lastFrame >= e3 && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
        var r3 = this.interpolateValue(e3, this._caching);
        this.pv = r3;
      }
      return this._caching.lastFrame = e3, this.pv;
    }
    function Ie2(e3) {
      var t3;
      if (this.propType === `unidimensional`) t3 = e3 * this.mult, je2(this.v - t3) > 1e-5 && (this.v = t3, this._mdf = true);
      else for (var n3 = 0, r3 = this.v.length; n3 < r3; ) t3 = e3[n3] * this.mult, je2(this.v[n3] - t3) > 1e-5 && (this.v[n3] = t3, this._mdf = true), n3 += 1;
    }
    function Le2() {
      if (!(this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length)) {
        if (this.lock) {
          this.setVValue(this.pv);
          return;
        }
        this.lock = true, this._mdf = this._isFirstFrame;
        var e3, t3 = this.effectsSequence.length, n3 = this.kf ? this.pv : this.data.k;
        for (e3 = 0; e3 < t3; e3 += 1) n3 = this.effectsSequence[e3](n3);
        this.setVValue(n3), this._isFirstFrame = false, this.lock = false, this.frameId = this.elem.globalData.frameId;
      }
    }
    function Re2(e3) {
      this.effectsSequence.push(e3), this.container.addDynamicProperty(this);
    }
    function ze2(e3, t3, n3, r3) {
      this.propType = `unidimensional`, this.mult = n3 || 1, this.data = t3, this.v = n3 ? t3.k * n3 : t3.k, this.pv = t3.k, this._mdf = false, this.elem = e3, this.container = r3, this.comp = e3.comp, this.k = false, this.kf = false, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = true, this.getValue = Le2, this.setVValue = Ie2, this.addEffect = Re2;
    }
    function Be2(e3, t3, n3, r3) {
      this.propType = `multidimensional`, this.mult = n3 || 1, this.data = t3, this._mdf = false, this.elem = e3, this.container = r3, this.comp = e3.comp, this.k = false, this.kf = false, this.frameId = -1;
      var i3, a3 = t3.k.length;
      for (this.v = p2(`float32`, a3), this.pv = p2(`float32`, a3), this.vel = p2(`float32`, a3), i3 = 0; i3 < a3; i3 += 1) this.v[i3] = t3.k[i3] * this.mult, this.pv[i3] = t3.k[i3];
      this._isFirstFrame = true, this.effectsSequence = [], this.getValue = Le2, this.setVValue = Ie2, this.addEffect = Re2;
    }
    function Ve2(e3, t3, n3, r3) {
      this.propType = `unidimensional`, this.keyframes = t3.k, this.keyframesMetadata = [], this.offsetTime = e3.data.st, this.frameId = -1, this._caching = { lastFrame: Ae2, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }, this.k = true, this.kf = true, this.data = t3, this.mult = n3 || 1, this.elem = e3, this.container = r3, this.comp = e3.comp, this.v = Ae2, this.pv = Ae2, this._isFirstFrame = true, this.getValue = Le2, this.setVValue = Ie2, this.interpolateValue = Me2, this.effectsSequence = [Fe2.bind(this)], this.addEffect = Re2;
    }
    function He2(e3, t3, n3, r3) {
      this.propType = `multidimensional`;
      var i3, a3 = t3.k.length, o3, s3, c3, l3;
      for (i3 = 0; i3 < a3 - 1; i3 += 1) t3.k[i3].to && t3.k[i3].s && t3.k[i3 + 1] && t3.k[i3 + 1].s && (o3 = t3.k[i3].s, s3 = t3.k[i3 + 1].s, c3 = t3.k[i3].to, l3 = t3.k[i3].ti, (o3.length === 2 && (o3[0] !== s3[0] || o3[1] !== s3[1]) && ke2.pointOnLine2D(o3[0], o3[1], s3[0], s3[1], o3[0] + c3[0], o3[1] + c3[1]) && ke2.pointOnLine2D(o3[0], o3[1], s3[0], s3[1], s3[0] + l3[0], s3[1] + l3[1]) || o3.length === 3 && (o3[0] !== s3[0] || o3[1] !== s3[1] || o3[2] !== s3[2]) && ke2.pointOnLine3D(o3[0], o3[1], o3[2], s3[0], s3[1], s3[2], o3[0] + c3[0], o3[1] + c3[1], o3[2] + c3[2]) && ke2.pointOnLine3D(o3[0], o3[1], o3[2], s3[0], s3[1], s3[2], s3[0] + l3[0], s3[1] + l3[1], s3[2] + l3[2])) && (t3.k[i3].to = null, t3.k[i3].ti = null), o3[0] === s3[0] && o3[1] === s3[1] && c3[0] === 0 && c3[1] === 0 && l3[0] === 0 && l3[1] === 0 && (o3.length === 2 || o3[2] === s3[2] && c3[2] === 0 && l3[2] === 0) && (t3.k[i3].to = null, t3.k[i3].ti = null));
      this.effectsSequence = [Fe2.bind(this)], this.data = t3, this.keyframes = t3.k, this.keyframesMetadata = [], this.offsetTime = e3.data.st, this.k = true, this.kf = true, this._isFirstFrame = true, this.mult = n3 || 1, this.elem = e3, this.container = r3, this.comp = e3.comp, this.getValue = Le2, this.setVValue = Ie2, this.interpolateValue = Me2, this.frameId = -1;
      var u3 = t3.k[0].s.length;
      for (this.v = p2(`float32`, u3), this.pv = p2(`float32`, u3), i3 = 0; i3 < u3; i3 += 1) this.v[i3] = Ae2, this.pv[i3] = Ae2;
      this._caching = { lastFrame: Ae2, lastIndex: 0, value: p2(`float32`, u3) }, this.addEffect = Re2;
    }
    var H2 = /* @__PURE__ */ (function() {
      function e3(e4, t3, n3, r3, i3) {
        t3.sid && (t3 = e4.globalData.slotManager.getProp(t3));
        var a3;
        if (!t3.k.length) a3 = new ze2(e4, t3, r3, i3);
        else if (typeof t3.k[0] == `number`) a3 = new Be2(e4, t3, r3, i3);
        else switch (n3) {
          case 0:
            a3 = new Ve2(e4, t3, r3, i3);
            break;
          case 1:
            a3 = new He2(e4, t3, r3, i3);
        }
        return a3.effectsSequence.length && i3.addDynamicProperty(a3), a3;
      }
      return { getProp: e3 };
    })();
    function Ue2() {
    }
    Ue2.prototype = { addDynamicProperty: function(e3) {
      this.dynamicProperties.indexOf(e3) === -1 && (this.dynamicProperties.push(e3), this.container.addDynamicProperty(this), this._isAnimated = true);
    }, iterateDynamicProperties: function() {
      this._mdf = false;
      var e3, t3 = this.dynamicProperties.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.dynamicProperties[e3].getValue(), this.dynamicProperties[e3]._mdf && (this._mdf = true);
    }, initDynamicPropertyContainer: function(e3) {
      this.container = e3, this.dynamicProperties = [], this._mdf = false, this._isAnimated = false;
    } };
    var We2 = (function() {
      function e3() {
        return p2(`float32`, 2);
      }
      return Te2(8, e3);
    })();
    function Ge2() {
      this.c = false, this._length = 0, this._maxLength = 8, this.v = m2(this._maxLength), this.o = m2(this._maxLength), this.i = m2(this._maxLength);
    }
    Ge2.prototype.setPathData = function(e3, t3) {
      this.c = e3, this.setLength(t3);
      for (var n3 = 0; n3 < t3; ) this.v[n3] = We2.newElement(), this.o[n3] = We2.newElement(), this.i[n3] = We2.newElement(), n3 += 1;
    }, Ge2.prototype.setLength = function(e3) {
      for (; this._maxLength < e3; ) this.doubleArrayLength();
      this._length = e3;
    }, Ge2.prototype.doubleArrayLength = function() {
      this.v = this.v.concat(m2(this._maxLength)), this.i = this.i.concat(m2(this._maxLength)), this.o = this.o.concat(m2(this._maxLength)), this._maxLength *= 2;
    }, Ge2.prototype.setXYAt = function(e3, t3, n3, r3, i3) {
      var a3;
      switch (this._length = Math.max(this._length, r3 + 1), this._length >= this._maxLength && this.doubleArrayLength(), n3) {
        case `v`:
          a3 = this.v;
          break;
        case `i`:
          a3 = this.i;
          break;
        case `o`:
          a3 = this.o;
          break;
        default:
          a3 = [];
      }
      (!a3[r3] || a3[r3] && !i3) && (a3[r3] = We2.newElement()), a3[r3][0] = e3, a3[r3][1] = t3;
    }, Ge2.prototype.setTripleAt = function(e3, t3, n3, r3, i3, a3, o3, s3) {
      this.setXYAt(e3, t3, `v`, o3, s3), this.setXYAt(n3, r3, `o`, o3, s3), this.setXYAt(i3, a3, `i`, o3, s3);
    }, Ge2.prototype.reverse = function() {
      var e3 = new Ge2();
      e3.setPathData(this.c, this._length);
      var t3 = this.v, n3 = this.o, r3 = this.i, i3 = 0;
      this.c && (e3.setTripleAt(t3[0][0], t3[0][1], r3[0][0], r3[0][1], n3[0][0], n3[0][1], 0, false), i3 = 1);
      var a3 = this._length - 1, o3 = this._length, s3;
      for (s3 = i3; s3 < o3; s3 += 1) e3.setTripleAt(t3[a3][0], t3[a3][1], r3[a3][0], r3[a3][1], n3[a3][0], n3[a3][1], s3, false), --a3;
      return e3;
    }, Ge2.prototype.length = function() {
      return this._length;
    };
    var Ke2 = (function() {
      function e3() {
        return new Ge2();
      }
      function t3(e4) {
        var t4 = e4._length, n4;
        for (n4 = 0; n4 < t4; n4 += 1) We2.release(e4.v[n4]), We2.release(e4.i[n4]), We2.release(e4.o[n4]), e4.v[n4] = null, e4.i[n4] = null, e4.o[n4] = null;
        e4._length = 0, e4.c = false;
      }
      function n3(e4) {
        var t4 = r3.newElement(), n4, i3 = e4._length === void 0 ? e4.v.length : e4._length;
        for (t4.setLength(i3), t4.c = e4.c, n4 = 0; n4 < i3; n4 += 1) t4.setTripleAt(e4.v[n4][0], e4.v[n4][1], e4.o[n4][0], e4.o[n4][1], e4.i[n4][0], e4.i[n4][1], n4);
        return t4;
      }
      var r3 = Te2(4, e3, t3);
      return r3.clone = n3, r3;
    })();
    function qe2() {
      this._length = 0, this._maxLength = 4, this.shapes = m2(this._maxLength);
    }
    qe2.prototype.addShape = function(e3) {
      this._length === this._maxLength && (this.shapes = this.shapes.concat(m2(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = e3, this._length += 1;
    }, qe2.prototype.releaseShapes = function() {
      var e3;
      for (e3 = 0; e3 < this._length; e3 += 1) Ke2.release(this.shapes[e3]);
      this._length = 0;
    };
    var Je2 = (function() {
      var e3 = { newShapeCollection: i3, release: a3 }, t3 = 0, n3 = 4, r3 = m2(n3);
      function i3() {
        var e4;
        return t3 ? (--t3, e4 = r3[t3]) : e4 = new qe2(), e4;
      }
      function a3(e4) {
        var i4, a4 = e4._length;
        for (i4 = 0; i4 < a4; i4 += 1) Ke2.release(e4.shapes[i4]);
        e4._length = 0, t3 === n3 && (r3 = we2.double(r3), n3 *= 2), r3[t3] = e4, t3 += 1;
      }
      return e3;
    })(), Ye2 = (function() {
      var e3 = -999999;
      function t3(e4, t4, n4) {
        var r4 = n4.lastIndex, i4, a4, o4, s4, c4, l4, u3, d4, f4, p4 = this.keyframes;
        if (e4 < p4[0].t - this.offsetTime) i4 = p4[0].s[0], o4 = true, r4 = 0;
        else if (e4 >= p4[p4.length - 1].t - this.offsetTime) i4 = p4[p4.length - 1].s ? p4[p4.length - 1].s[0] : p4[p4.length - 2].e[0], o4 = true;
        else {
          for (var m4 = r4, h4 = p4.length - 1, g4 = true, _4, v3, y3; g4 && (_4 = p4[m4], v3 = p4[m4 + 1], !(v3.t - this.offsetTime > e4)); ) m4 < h4 - 1 ? m4 += 1 : g4 = false;
          if (y3 = this.keyframesMetadata[m4] || {}, o4 = _4.h === 1, r4 = m4, !o4) {
            if (e4 >= v3.t - this.offsetTime) d4 = 1;
            else if (e4 < _4.t - this.offsetTime) d4 = 0;
            else {
              var b3;
              y3.__fnct ? b3 = y3.__fnct : (b3 = Ce2.getBezierEasing(_4.o.x, _4.o.y, _4.i.x, _4.i.y).get, y3.__fnct = b3), d4 = b3((e4 - (_4.t - this.offsetTime)) / (v3.t - this.offsetTime - (_4.t - this.offsetTime)));
            }
            a4 = v3.s ? v3.s[0] : _4.e[0];
          }
          i4 = _4.s[0];
        }
        for (l4 = t4._length, u3 = i4.i[0].length, n4.lastIndex = r4, s4 = 0; s4 < l4; s4 += 1) for (c4 = 0; c4 < u3; c4 += 1) f4 = o4 ? i4.i[s4][c4] : i4.i[s4][c4] + (a4.i[s4][c4] - i4.i[s4][c4]) * d4, t4.i[s4][c4] = f4, f4 = o4 ? i4.o[s4][c4] : i4.o[s4][c4] + (a4.o[s4][c4] - i4.o[s4][c4]) * d4, t4.o[s4][c4] = f4, f4 = o4 ? i4.v[s4][c4] : i4.v[s4][c4] + (a4.v[s4][c4] - i4.v[s4][c4]) * d4, t4.v[s4][c4] = f4;
      }
      function n3() {
        var t4 = this.comp.renderedFrame - this.offsetTime, n4 = this.keyframes[0].t - this.offsetTime, r4 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, i4 = this._caching.lastFrame;
        return i4 !== e3 && (i4 < n4 && t4 < n4 || i4 > r4 && t4 > r4) || (this._caching.lastIndex = i4 < t4 ? this._caching.lastIndex : 0, this.interpolateShape(t4, this.pv, this._caching)), this._caching.lastFrame = t4, this.pv;
      }
      function r3() {
        this.paths = this.localShapeCollection;
      }
      function i3(e4, t4) {
        if (e4._length !== t4._length || e4.c !== t4.c) return false;
        var n4, r4 = e4._length;
        for (n4 = 0; n4 < r4; n4 += 1) if (e4.v[n4][0] !== t4.v[n4][0] || e4.v[n4][1] !== t4.v[n4][1] || e4.o[n4][0] !== t4.o[n4][0] || e4.o[n4][1] !== t4.o[n4][1] || e4.i[n4][0] !== t4.i[n4][0] || e4.i[n4][1] !== t4.i[n4][1]) return false;
        return true;
      }
      function a3(e4) {
        i3(this.v, e4) || (this.v = Ke2.clone(e4), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = true, this.paths = this.localShapeCollection);
      }
      function o3() {
        if (this.elem.globalData.frameId !== this.frameId) {
          if (!this.effectsSequence.length) {
            this._mdf = false;
            return;
          }
          if (this.lock) {
            this.setVValue(this.pv);
            return;
          }
          this.lock = true, this._mdf = false;
          var e4 = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k, t4, n4 = this.effectsSequence.length;
          for (t4 = 0; t4 < n4; t4 += 1) e4 = this.effectsSequence[t4](e4);
          this.setVValue(e4), this.lock = false, this.frameId = this.elem.globalData.frameId;
        }
      }
      function s3(e4, t4, n4) {
        this.propType = `shape`, this.comp = e4.comp, this.container = e4, this.elem = e4, this.data = t4, this.k = false, this.kf = false, this._mdf = false;
        var i4 = n4 === 3 ? t4.pt.k : t4.ks.k;
        this.v = Ke2.clone(i4), this.pv = Ke2.clone(this.v), this.localShapeCollection = Je2.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r3, this.effectsSequence = [];
      }
      function c3(e4) {
        this.effectsSequence.push(e4), this.container.addDynamicProperty(this);
      }
      s3.prototype.interpolateShape = t3, s3.prototype.getValue = o3, s3.prototype.setVValue = a3, s3.prototype.addEffect = c3;
      function l3(t4, i4, a4) {
        this.propType = `shape`, this.comp = t4.comp, this.elem = t4, this.container = t4, this.offsetTime = t4.data.st, this.keyframes = a4 === 3 ? i4.pt.k : i4.ks.k, this.keyframesMetadata = [], this.k = true, this.kf = true;
        var o4 = this.keyframes[0].s[0].i.length;
        this.v = Ke2.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, o4), this.pv = Ke2.clone(this.v), this.localShapeCollection = Je2.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = e3, this.reset = r3, this._caching = { lastFrame: e3, lastIndex: 0 }, this.effectsSequence = [n3.bind(this)];
      }
      l3.prototype.getValue = o3, l3.prototype.interpolateShape = t3, l3.prototype.setVValue = a3, l3.prototype.addEffect = c3;
      var d3 = (function() {
        var e4 = O2;
        function t4(e5, t5) {
          this.v = Ke2.newElement(), this.v.setPathData(true, 4), this.localShapeCollection = Je2.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = t5.d, this.elem = e5, this.comp = e5.comp, this.frameId = -1, this.initDynamicPropertyContainer(e5), this.p = H2.getProp(e5, t5.p, 1, 0, this), this.s = H2.getProp(e5, t5.s, 1, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertEllToPath());
        }
        return t4.prototype = { reset: r3, getValue: function() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
        }, convertEllToPath: function() {
          var t5 = this.p.v[0], n4 = this.p.v[1], r4 = this.s.v[0] / 2, i4 = this.s.v[1] / 2, a4 = this.d !== 3, o4 = this.v;
          o4.v[0][0] = t5, o4.v[0][1] = n4 - i4, o4.v[1][0] = a4 ? t5 + r4 : t5 - r4, o4.v[1][1] = n4, o4.v[2][0] = t5, o4.v[2][1] = n4 + i4, o4.v[3][0] = a4 ? t5 - r4 : t5 + r4, o4.v[3][1] = n4, o4.i[0][0] = a4 ? t5 - r4 * e4 : t5 + r4 * e4, o4.i[0][1] = n4 - i4, o4.i[1][0] = a4 ? t5 + r4 : t5 - r4, o4.i[1][1] = n4 - i4 * e4, o4.i[2][0] = a4 ? t5 + r4 * e4 : t5 - r4 * e4, o4.i[2][1] = n4 + i4, o4.i[3][0] = a4 ? t5 - r4 : t5 + r4, o4.i[3][1] = n4 + i4 * e4, o4.o[0][0] = a4 ? t5 + r4 * e4 : t5 - r4 * e4, o4.o[0][1] = n4 - i4, o4.o[1][0] = a4 ? t5 + r4 : t5 - r4, o4.o[1][1] = n4 + i4 * e4, o4.o[2][0] = a4 ? t5 - r4 * e4 : t5 + r4 * e4, o4.o[2][1] = n4 + i4, o4.o[3][0] = a4 ? t5 - r4 : t5 + r4, o4.o[3][1] = n4 - i4 * e4;
        } }, u2([Ue2], t4), t4;
      })(), f3 = (function() {
        function e4(e5, t4) {
          this.v = Ke2.newElement(), this.v.setPathData(true, 0), this.elem = e5, this.comp = e5.comp, this.data = t4, this.frameId = -1, this.d = t4.d, this.initDynamicPropertyContainer(e5), t4.sy === 1 ? (this.ir = H2.getProp(e5, t4.ir, 0, 0, this), this.is = H2.getProp(e5, t4.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = H2.getProp(e5, t4.pt, 0, 0, this), this.p = H2.getProp(e5, t4.p, 1, 0, this), this.r = H2.getProp(e5, t4.r, 0, D2, this), this.or = H2.getProp(e5, t4.or, 0, 0, this), this.os = H2.getProp(e5, t4.os, 0, 0.01, this), this.localShapeCollection = Je2.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertToPath());
        }
        return e4.prototype = { reset: r3, getValue: function() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
        }, convertStarToPath: function() {
          var e5 = Math.floor(this.pt.v) * 2, t4 = Math.PI * 2 / e5, n4 = true, r4 = this.or.v, i4 = this.ir.v, a4 = this.os.v, o4 = this.is.v, s4 = 2 * Math.PI * r4 / (e5 * 2), c4 = 2 * Math.PI * i4 / (e5 * 2), l4, u3, d4, f4, p4 = -Math.PI / 2;
          p4 += this.r.v;
          var m4 = this.data.d === 3 ? -1 : 1;
          for (this.v._length = 0, l4 = 0; l4 < e5; l4 += 1) {
            u3 = n4 ? r4 : i4, d4 = n4 ? a4 : o4, f4 = n4 ? s4 : c4;
            var h4 = u3 * Math.cos(p4), g4 = u3 * Math.sin(p4), _4 = h4 === 0 && g4 === 0 ? 0 : g4 / Math.sqrt(h4 * h4 + g4 * g4), v3 = h4 === 0 && g4 === 0 ? 0 : -h4 / Math.sqrt(h4 * h4 + g4 * g4);
            h4 += +this.p.v[0], g4 += +this.p.v[1], this.v.setTripleAt(h4, g4, h4 - _4 * f4 * d4 * m4, g4 - v3 * f4 * d4 * m4, h4 + _4 * f4 * d4 * m4, g4 + v3 * f4 * d4 * m4, l4, true), n4 = !n4, p4 += t4 * m4;
          }
        }, convertPolygonToPath: function() {
          var e5 = Math.floor(this.pt.v), t4 = Math.PI * 2 / e5, n4 = this.or.v, r4 = this.os.v, i4 = 2 * Math.PI * n4 / (e5 * 4), a4, o4 = -Math.PI * 0.5, s4 = this.data.d === 3 ? -1 : 1;
          for (o4 += this.r.v, this.v._length = 0, a4 = 0; a4 < e5; a4 += 1) {
            var c4 = n4 * Math.cos(o4), l4 = n4 * Math.sin(o4), u3 = c4 === 0 && l4 === 0 ? 0 : l4 / Math.sqrt(c4 * c4 + l4 * l4), d4 = c4 === 0 && l4 === 0 ? 0 : -c4 / Math.sqrt(c4 * c4 + l4 * l4);
            c4 += +this.p.v[0], l4 += +this.p.v[1], this.v.setTripleAt(c4, l4, c4 - u3 * i4 * r4 * s4, l4 - d4 * i4 * r4 * s4, c4 + u3 * i4 * r4 * s4, l4 + d4 * i4 * r4 * s4, a4, true), o4 += t4 * s4;
          }
          this.paths.length = 0, this.paths[0] = this.v;
        } }, u2([Ue2], e4), e4;
      })(), p3 = (function() {
        function e4(e5, t4) {
          this.v = Ke2.newElement(), this.v.c = true, this.localShapeCollection = Je2.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = e5, this.comp = e5.comp, this.frameId = -1, this.d = t4.d, this.initDynamicPropertyContainer(e5), this.p = H2.getProp(e5, t4.p, 1, 0, this), this.s = H2.getProp(e5, t4.s, 1, 0, this), this.r = H2.getProp(e5, t4.r, 0, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertRectToPath());
        }
        return e4.prototype = { convertRectToPath: function() {
          var e5 = this.p.v[0], t4 = this.p.v[1], n4 = this.s.v[0] / 2, r4 = this.s.v[1] / 2, i4 = w2(n4, r4, this.r.v), a4 = i4 * (1 - O2);
          this.v._length = 0, this.d === 2 || this.d === 1 ? (this.v.setTripleAt(e5 + n4, t4 - r4 + i4, e5 + n4, t4 - r4 + i4, e5 + n4, t4 - r4 + a4, 0, true), this.v.setTripleAt(e5 + n4, t4 + r4 - i4, e5 + n4, t4 + r4 - a4, e5 + n4, t4 + r4 - i4, 1, true), i4 === 0 ? (this.v.setTripleAt(e5 - n4, t4 + r4, e5 - n4 + a4, t4 + r4, e5 - n4, t4 + r4, 2), this.v.setTripleAt(e5 - n4, t4 - r4, e5 - n4, t4 - r4 + a4, e5 - n4, t4 - r4, 3)) : (this.v.setTripleAt(e5 + n4 - i4, t4 + r4, e5 + n4 - i4, t4 + r4, e5 + n4 - a4, t4 + r4, 2, true), this.v.setTripleAt(e5 - n4 + i4, t4 + r4, e5 - n4 + a4, t4 + r4, e5 - n4 + i4, t4 + r4, 3, true), this.v.setTripleAt(e5 - n4, t4 + r4 - i4, e5 - n4, t4 + r4 - i4, e5 - n4, t4 + r4 - a4, 4, true), this.v.setTripleAt(e5 - n4, t4 - r4 + i4, e5 - n4, t4 - r4 + a4, e5 - n4, t4 - r4 + i4, 5, true), this.v.setTripleAt(e5 - n4 + i4, t4 - r4, e5 - n4 + i4, t4 - r4, e5 - n4 + a4, t4 - r4, 6, true), this.v.setTripleAt(e5 + n4 - i4, t4 - r4, e5 + n4 - a4, t4 - r4, e5 + n4 - i4, t4 - r4, 7, true))) : (this.v.setTripleAt(e5 + n4, t4 - r4 + i4, e5 + n4, t4 - r4 + a4, e5 + n4, t4 - r4 + i4, 0, true), i4 === 0 ? (this.v.setTripleAt(e5 - n4, t4 - r4, e5 - n4 + a4, t4 - r4, e5 - n4, t4 - r4, 1, true), this.v.setTripleAt(e5 - n4, t4 + r4, e5 - n4, t4 + r4 - a4, e5 - n4, t4 + r4, 2, true), this.v.setTripleAt(e5 + n4, t4 + r4, e5 + n4 - a4, t4 + r4, e5 + n4, t4 + r4, 3, true)) : (this.v.setTripleAt(e5 + n4 - i4, t4 - r4, e5 + n4 - i4, t4 - r4, e5 + n4 - a4, t4 - r4, 1, true), this.v.setTripleAt(e5 - n4 + i4, t4 - r4, e5 - n4 + a4, t4 - r4, e5 - n4 + i4, t4 - r4, 2, true), this.v.setTripleAt(e5 - n4, t4 - r4 + i4, e5 - n4, t4 - r4 + i4, e5 - n4, t4 - r4 + a4, 3, true), this.v.setTripleAt(e5 - n4, t4 + r4 - i4, e5 - n4, t4 + r4 - a4, e5 - n4, t4 + r4 - i4, 4, true), this.v.setTripleAt(e5 - n4 + i4, t4 + r4, e5 - n4 + i4, t4 + r4, e5 - n4 + a4, t4 + r4, 5, true), this.v.setTripleAt(e5 + n4 - i4, t4 + r4, e5 + n4 - a4, t4 + r4, e5 + n4 - i4, t4 + r4, 6, true), this.v.setTripleAt(e5 + n4, t4 + r4 - i4, e5 + n4, t4 + r4 - i4, e5 + n4, t4 + r4 - a4, 7, true)));
        }, getValue: function() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
        }, reset: r3 }, u2([Ue2], e4), e4;
      })();
      function m3(e4, t4, n4) {
        var r4;
        return n4 === 3 || n4 === 4 ? r4 = (n4 === 3 ? t4.pt : t4.ks).k.length ? new l3(e4, t4, n4) : new s3(e4, t4, n4) : n4 === 5 ? r4 = new p3(e4, t4) : n4 === 6 ? r4 = new d3(e4, t4) : n4 === 7 && (r4 = new f3(e4, t4)), r4.k && e4.addDynamicProperty(r4), r4;
      }
      function h3() {
        return s3;
      }
      function g3() {
        return l3;
      }
      var _3 = {};
      return _3.getShapeProp = m3, _3.getConstructorFunction = h3, _3.getKeyframedConstructorFunction = g3, _3;
    })(), Xe2 = /* @__PURE__ */ (function() {
      var e3 = Math.cos, t3 = Math.sin, n3 = Math.tan, r3 = Math.round;
      function i3() {
        return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
      }
      function a3(n4) {
        if (n4 === 0) return this;
        var r4 = e3(n4), i4 = t3(n4);
        return this._t(r4, -i4, 0, 0, i4, r4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function o3(n4) {
        if (n4 === 0) return this;
        var r4 = e3(n4), i4 = t3(n4);
        return this._t(1, 0, 0, 0, 0, r4, -i4, 0, 0, i4, r4, 0, 0, 0, 0, 1);
      }
      function s3(n4) {
        if (n4 === 0) return this;
        var r4 = e3(n4), i4 = t3(n4);
        return this._t(r4, 0, i4, 0, 0, 1, 0, 0, -i4, 0, r4, 0, 0, 0, 0, 1);
      }
      function c3(n4) {
        if (n4 === 0) return this;
        var r4 = e3(n4), i4 = t3(n4);
        return this._t(r4, -i4, 0, 0, i4, r4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function l3(e4, t4) {
        return this._t(1, t4, e4, 1, 0, 0);
      }
      function u3(e4, t4) {
        return this.shear(n3(e4), n3(t4));
      }
      function d3(r4, i4) {
        var a4 = e3(i4), o4 = t3(i4);
        return this._t(a4, o4, 0, 0, -o4, a4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, n3(r4), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a4, -o4, 0, 0, o4, a4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function f3(e4, t4, n4) {
        return !n4 && n4 !== 0 && (n4 = 1), e4 === 1 && t4 === 1 && n4 === 1 ? this : this._t(e4, 0, 0, 0, 0, t4, 0, 0, 0, 0, n4, 0, 0, 0, 0, 1);
      }
      function m3(e4, t4, n4, r4, i4, a4, o4, s4, c4, l4, u4, d4, f4, p3, m4, h4) {
        return this.props[0] = e4, this.props[1] = t4, this.props[2] = n4, this.props[3] = r4, this.props[4] = i4, this.props[5] = a4, this.props[6] = o4, this.props[7] = s4, this.props[8] = c4, this.props[9] = l4, this.props[10] = u4, this.props[11] = d4, this.props[12] = f4, this.props[13] = p3, this.props[14] = m4, this.props[15] = h4, this;
      }
      function h3(e4, t4, n4) {
        return n4 ||= 0, e4 !== 0 || t4 !== 0 || n4 !== 0 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e4, t4, n4, 1) : this;
      }
      function g3(e4, t4, n4, r4, i4, a4, o4, s4, c4, l4, u4, d4, f4, p3, m4, h4) {
        var g4 = this.props;
        if (e4 === 1 && t4 === 0 && n4 === 0 && r4 === 0 && i4 === 0 && a4 === 1 && o4 === 0 && s4 === 0 && c4 === 0 && l4 === 0 && u4 === 1 && d4 === 0) return g4[12] = g4[12] * e4 + g4[15] * f4, g4[13] = g4[13] * a4 + g4[15] * p3, g4[14] = g4[14] * u4 + g4[15] * m4, g4[15] *= h4, this._identityCalculated = false, this;
        var _4 = g4[0], v4 = g4[1], y4 = g4[2], b4 = g4[3], x4 = g4[4], S4 = g4[5], C4 = g4[6], w4 = g4[7], T4 = g4[8], E4 = g4[9], D4 = g4[10], O4 = g4[11], k4 = g4[12], A4 = g4[13], ee4 = g4[14], j4 = g4[15];
        return g4[0] = _4 * e4 + v4 * i4 + y4 * c4 + b4 * f4, g4[1] = _4 * t4 + v4 * a4 + y4 * l4 + b4 * p3, g4[2] = _4 * n4 + v4 * o4 + y4 * u4 + b4 * m4, g4[3] = _4 * r4 + v4 * s4 + y4 * d4 + b4 * h4, g4[4] = x4 * e4 + S4 * i4 + C4 * c4 + w4 * f4, g4[5] = x4 * t4 + S4 * a4 + C4 * l4 + w4 * p3, g4[6] = x4 * n4 + S4 * o4 + C4 * u4 + w4 * m4, g4[7] = x4 * r4 + S4 * s4 + C4 * d4 + w4 * h4, g4[8] = T4 * e4 + E4 * i4 + D4 * c4 + O4 * f4, g4[9] = T4 * t4 + E4 * a4 + D4 * l4 + O4 * p3, g4[10] = T4 * n4 + E4 * o4 + D4 * u4 + O4 * m4, g4[11] = T4 * r4 + E4 * s4 + D4 * d4 + O4 * h4, g4[12] = k4 * e4 + A4 * i4 + ee4 * c4 + j4 * f4, g4[13] = k4 * t4 + A4 * a4 + ee4 * l4 + j4 * p3, g4[14] = k4 * n4 + A4 * o4 + ee4 * u4 + j4 * m4, g4[15] = k4 * r4 + A4 * s4 + ee4 * d4 + j4 * h4, this._identityCalculated = false, this;
      }
      function _3(e4) {
        var t4 = e4.props;
        return this.transform(t4[0], t4[1], t4[2], t4[3], t4[4], t4[5], t4[6], t4[7], t4[8], t4[9], t4[10], t4[11], t4[12], t4[13], t4[14], t4[15]);
      }
      function v3() {
        return this._identityCalculated ||= (this._identity = this.props[0] === 1 && this.props[1] === 0 && this.props[2] === 0 && this.props[3] === 0 && this.props[4] === 0 && this.props[5] === 1 && this.props[6] === 0 && this.props[7] === 0 && this.props[8] === 0 && this.props[9] === 0 && this.props[10] === 1 && this.props[11] === 0 && this.props[12] === 0 && this.props[13] === 0 && this.props[14] === 0 && this.props[15] === 1, true), this._identity;
      }
      function y3(e4) {
        for (var t4 = 0; t4 < 16; ) {
          if (e4.props[t4] !== this.props[t4]) return false;
          t4 += 1;
        }
        return true;
      }
      function b3(e4) {
        var t4;
        for (t4 = 0; t4 < 16; t4 += 1) e4.props[t4] = this.props[t4];
        return e4;
      }
      function x3(e4) {
        var t4;
        for (t4 = 0; t4 < 16; t4 += 1) this.props[t4] = e4[t4];
      }
      function S3(e4, t4, n4) {
        return { x: e4 * this.props[0] + t4 * this.props[4] + n4 * this.props[8] + this.props[12], y: e4 * this.props[1] + t4 * this.props[5] + n4 * this.props[9] + this.props[13], z: e4 * this.props[2] + t4 * this.props[6] + n4 * this.props[10] + this.props[14] };
      }
      function C3(e4, t4, n4) {
        return e4 * this.props[0] + t4 * this.props[4] + n4 * this.props[8] + this.props[12];
      }
      function w3(e4, t4, n4) {
        return e4 * this.props[1] + t4 * this.props[5] + n4 * this.props[9] + this.props[13];
      }
      function T3(e4, t4, n4) {
        return e4 * this.props[2] + t4 * this.props[6] + n4 * this.props[10] + this.props[14];
      }
      function E3() {
        var e4 = this.props[0] * this.props[5] - this.props[1] * this.props[4], t4 = this.props[5] / e4, n4 = -this.props[1] / e4, r4 = -this.props[4] / e4, i4 = this.props[0] / e4, a4 = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e4, o4 = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e4, s4 = new Xe2();
        return s4.props[0] = t4, s4.props[1] = n4, s4.props[4] = r4, s4.props[5] = i4, s4.props[12] = a4, s4.props[13] = o4, s4;
      }
      function D3(e4) {
        return this.getInverseMatrix().applyToPointArray(e4[0], e4[1], e4[2] || 0);
      }
      function O3(e4) {
        var t4, n4 = e4.length, r4 = [];
        for (t4 = 0; t4 < n4; t4 += 1) r4[t4] = D3(e4[t4]);
        return r4;
      }
      function k3(e4, t4, n4) {
        var r4 = p2(`float32`, 6);
        if (this.isIdentity()) r4[0] = e4[0], r4[1] = e4[1], r4[2] = t4[0], r4[3] = t4[1], r4[4] = n4[0], r4[5] = n4[1];
        else {
          var i4 = this.props[0], a4 = this.props[1], o4 = this.props[4], s4 = this.props[5], c4 = this.props[12], l4 = this.props[13];
          r4[0] = e4[0] * i4 + e4[1] * o4 + c4, r4[1] = e4[0] * a4 + e4[1] * s4 + l4, r4[2] = t4[0] * i4 + t4[1] * o4 + c4, r4[3] = t4[0] * a4 + t4[1] * s4 + l4, r4[4] = n4[0] * i4 + n4[1] * o4 + c4, r4[5] = n4[0] * a4 + n4[1] * s4 + l4;
        }
        return r4;
      }
      function A3(e4, t4, n4) {
        return this.isIdentity() ? [e4, t4, n4] : [e4 * this.props[0] + t4 * this.props[4] + n4 * this.props[8] + this.props[12], e4 * this.props[1] + t4 * this.props[5] + n4 * this.props[9] + this.props[13], e4 * this.props[2] + t4 * this.props[6] + n4 * this.props[10] + this.props[14]];
      }
      function ee3(e4, t4) {
        if (this.isIdentity()) return e4 + `,` + t4;
        var n4 = this.props;
        return Math.round((e4 * n4[0] + t4 * n4[4] + n4[12]) * 100) / 100 + `,` + Math.round((e4 * n4[1] + t4 * n4[5] + n4[13]) * 100) / 100;
      }
      function j3() {
        for (var e4 = 0, t4 = this.props, n4 = `matrix3d(`, i4 = 1e4; e4 < 16; ) n4 += r3(t4[e4] * i4) / i4, n4 += e4 === 15 ? `)` : `,`, e4 += 1;
        return n4;
      }
      function M3(e4) {
        var t4 = 1e4;
        return e4 < 1e-6 && e4 > 0 || e4 > -1e-6 && e4 < 0 ? r3(e4 * t4) / t4 : e4;
      }
      function N3() {
        var e4 = this.props, t4 = M3(e4[0]), n4 = M3(e4[1]), r4 = M3(e4[4]), i4 = M3(e4[5]), a4 = M3(e4[12]), o4 = M3(e4[13]);
        return `matrix(` + t4 + `,` + n4 + `,` + r4 + `,` + i4 + `,` + a4 + `,` + o4 + `)`;
      }
      return function() {
        this.reset = i3, this.rotate = a3, this.rotateX = o3, this.rotateY = s3, this.rotateZ = c3, this.skew = u3, this.skewFromAxis = d3, this.shear = l3, this.scale = f3, this.setTransform = m3, this.translate = h3, this.transform = g3, this.multiply = _3, this.applyToPoint = S3, this.applyToX = C3, this.applyToY = w3, this.applyToZ = T3, this.applyToPointArray = A3, this.applyToTriplePoints = k3, this.applyToPointStringified = ee3, this.toCSS = j3, this.to2dCSS = N3, this.clone = b3, this.cloneFromProps = x3, this.equals = y3, this.inversePoints = O3, this.inversePoint = D3, this.getInverseMatrix = E3, this._t = this.transform, this.isIdentity = v3, this._identity = true, this._identityCalculated = false, this.props = p2(`float32`, 16), this.reset();
      };
    })();
    function Ze2(e3) {
      "@babel/helpers - typeof";
      return Ze2 = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e4) {
        return typeof e4;
      } : function(e4) {
        return e4 && typeof Symbol == `function` && e4.constructor === Symbol && e4 !== Symbol.prototype ? `symbol` : typeof e4;
      }, Ze2(e3);
    }
    var U2 = {}, Qe2 = `__[STANDALONE]__`, $e2 = `__[ANIMATIONDATA]__`, et2 = ``;
    function tt2(e3) {
      s2(e3);
    }
    function nt2() {
      Qe2 === true ? Se2.searchAnimations($e2, Qe2, et2) : Se2.searchAnimations();
    }
    function rt2(e3) {
      L2(e3);
    }
    function it2(e3) {
      de2(e3);
    }
    function at2(e3) {
      return Qe2 === true && (e3.animationData = JSON.parse($e2)), Se2.loadAnimation(e3);
    }
    function ot2(e3) {
      if (typeof e3 == `string`) switch (e3) {
        case `high`:
          le2(200);
          break;
        default:
        case `medium`:
          le2(50);
          break;
        case `low`:
          le2(10);
      }
      else !isNaN(e3) && e3 > 1 && le2(e3);
    }
    function st2() {
      return typeof navigator < `u`;
    }
    function ct2(e3, t3) {
      e3 === `expressions` && oe2(t3);
    }
    function lt2(e3) {
      switch (e3) {
        case `propertyFactory`:
          return H2;
        case `shapePropertyFactory`:
          return Ye2;
        case `matrix`:
          return Xe2;
        default:
          return null;
      }
    }
    U2.play = Se2.play, U2.pause = Se2.pause, U2.setLocationHref = tt2, U2.togglePause = Se2.togglePause, U2.setSpeed = Se2.setSpeed, U2.setDirection = Se2.setDirection, U2.stop = Se2.stop, U2.searchAnimations = nt2, U2.registerAnimation = Se2.registerAnimation, U2.loadAnimation = at2, U2.setSubframeRendering = rt2, U2.resize = Se2.resize, U2.goToAndStop = Se2.goToAndStop, U2.destroy = Se2.destroy, U2.setQuality = ot2, U2.inBrowser = st2, U2.installPlugin = ct2, U2.freeze = Se2.freeze, U2.unfreeze = Se2.unfreeze, U2.setVolume = Se2.setVolume, U2.mute = Se2.mute, U2.unmute = Se2.unmute, U2.getRegisteredAnimations = Se2.getRegisteredAnimations, U2.useWebWorker = a2, U2.setIDPrefix = it2, U2.__getFactory = lt2, U2.version = `5.13.0`;
    function ut2() {
      document.readyState === `complete` && (clearInterval(ht2), nt2());
    }
    function dt2(e3) {
      for (var t3 = ft2.split(`&`), n3 = 0; n3 < t3.length; n3 += 1) {
        var r3 = t3[n3].split(`=`);
        if (decodeURIComponent(r3[0]) == e3) return decodeURIComponent(r3[1]);
      }
      return null;
    }
    var ft2 = ``;
    if (Qe2) {
      var pt2 = document.getElementsByTagName(`script`), mt2 = pt2[pt2.length - 1] || { src: `` };
      ft2 = mt2.src ? mt2.src.replace(/^[^\?]+\??/, ``) : ``, et2 = dt2(`renderer`);
    }
    var ht2 = setInterval(ut2, 100);
    try {
      ((e2 === void 0 ? `undefined` : Ze2(e2)) !== `object` || t2 === void 0) && !(typeof define == `function` && define.amd) && (window.bodymovin = U2);
    } catch {
    }
    var gt2 = (function() {
      var e3 = {}, t3 = {};
      e3.registerModifier = n3, e3.getModifier = r3;
      function n3(e4, n4) {
        t3[e4] || (t3[e4] = n4);
      }
      function r3(e4, n4, r4) {
        return new t3[e4](n4, r4);
      }
      return e3;
    })();
    function _t2() {
    }
    _t2.prototype.initModifierProperties = function() {
    }, _t2.prototype.addShapeToModifier = function() {
    }, _t2.prototype.addShape = function(e3) {
      if (!this.closed) {
        e3.sh.container.addDynamicProperty(e3.sh);
        var t3 = { shape: e3.sh, data: e3, localShapeCollection: Je2.newShapeCollection() };
        this.shapes.push(t3), this.addShapeToModifier(t3), this._isAnimated && e3.setAsAnimated();
      }
    }, _t2.prototype.init = function(e3, t3) {
      this.shapes = [], this.elem = e3, this.initDynamicPropertyContainer(e3), this.initModifierProperties(e3, t3), this.frameId = i2, this.closed = false, this.k = false, this.dynamicProperties.length ? this.k = true : this.getValue(true);
    }, _t2.prototype.processKeys = function() {
      this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
    }, u2([Ue2], _t2);
    function vt2() {
    }
    u2([_t2], vt2), vt2.prototype.initModifierProperties = function(e3, t3) {
      this.s = H2.getProp(e3, t3.s, 0, 0.01, this), this.e = H2.getProp(e3, t3.e, 0, 0.01, this), this.o = H2.getProp(e3, t3.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = t3.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
    }, vt2.prototype.addShapeToModifier = function(e3) {
      e3.pathsData = [];
    }, vt2.prototype.calculateShapeEdges = function(e3, t3, n3, r3, i3) {
      var a3 = [];
      t3 <= 1 ? a3.push({ s: e3, e: t3 }) : e3 >= 1 ? a3.push({ s: e3 - 1, e: t3 - 1 }) : (a3.push({ s: e3, e: 1 }), a3.push({ s: 0, e: t3 - 1 }));
      var o3 = [], s3, c3 = a3.length, l3;
      for (s3 = 0; s3 < c3; s3 += 1) if (l3 = a3[s3], !(l3.e * i3 < r3 || l3.s * i3 > r3 + n3)) {
        var u3 = l3.s * i3 <= r3 ? 0 : (l3.s * i3 - r3) / n3, d3 = l3.e * i3 >= r3 + n3 ? 1 : (l3.e * i3 - r3) / n3;
        o3.push([u3, d3]);
      }
      return o3.length || o3.push([0, 0]), o3;
    }, vt2.prototype.releasePathsData = function(e3) {
      var t3, n3 = e3.length;
      for (t3 = 0; t3 < n3; t3 += 1) De2.release(e3[t3]);
      return e3.length = 0, e3;
    }, vt2.prototype.processShapes = function(e3) {
      var t3, n3;
      if (this._mdf || e3) {
        var r3 = this.o.v % 360 / 360;
        if (r3 < 0 && (r3 += 1), t3 = this.s.v > 1 ? 1 + r3 : this.s.v < 0 ? 0 + r3 : this.s.v + r3, n3 = this.e.v > 1 ? 1 + r3 : this.e.v < 0 ? 0 + r3 : this.e.v + r3, t3 > n3) {
          var i3 = t3;
          t3 = n3, n3 = i3;
        }
        t3 = Math.round(t3 * 1e4) * 1e-4, n3 = Math.round(n3 * 1e4) * 1e-4, this.sValue = t3, this.eValue = n3;
      } else t3 = this.sValue, n3 = this.eValue;
      var a3, o3, s3 = this.shapes.length, c3, l3, u3, d3, f3, p3 = 0;
      if (n3 === t3) for (o3 = 0; o3 < s3; o3 += 1) this.shapes[o3].localShapeCollection.releaseShapes(), this.shapes[o3].shape._mdf = true, this.shapes[o3].shape.paths = this.shapes[o3].localShapeCollection, this._mdf && (this.shapes[o3].pathsData.length = 0);
      else if (!(n3 === 1 && t3 === 0 || n3 === 0 && t3 === 1)) {
        var m3 = [], h3, g3;
        for (o3 = 0; o3 < s3; o3 += 1) if (h3 = this.shapes[o3], !h3.shape._mdf && !this._mdf && !e3 && this.m !== 2) h3.shape.paths = h3.localShapeCollection;
        else {
          if (a3 = h3.shape.paths, l3 = a3._length, f3 = 0, !h3.shape._mdf && h3.pathsData.length) f3 = h3.totalShapeLength;
          else {
            for (u3 = this.releasePathsData(h3.pathsData), c3 = 0; c3 < l3; c3 += 1) d3 = ke2.getSegmentsLength(a3.shapes[c3]), u3.push(d3), f3 += d3.totalLength;
            h3.totalShapeLength = f3, h3.pathsData = u3;
          }
          p3 += f3, h3.shape._mdf = true;
        }
        var _3 = t3, v3 = n3, y3 = 0, b3;
        for (o3 = s3 - 1; o3 >= 0; --o3) if (h3 = this.shapes[o3], h3.shape._mdf) {
          for (g3 = h3.localShapeCollection, g3.releaseShapes(), this.m === 2 && s3 > 1 ? (b3 = this.calculateShapeEdges(t3, n3, h3.totalShapeLength, y3, p3), y3 += h3.totalShapeLength) : b3 = [[_3, v3]], l3 = b3.length, c3 = 0; c3 < l3; c3 += 1) {
            _3 = b3[c3][0], v3 = b3[c3][1], m3.length = 0, v3 <= 1 ? m3.push({ s: h3.totalShapeLength * _3, e: h3.totalShapeLength * v3 }) : _3 >= 1 ? m3.push({ s: h3.totalShapeLength * (_3 - 1), e: h3.totalShapeLength * (v3 - 1) }) : (m3.push({ s: h3.totalShapeLength * _3, e: h3.totalShapeLength }), m3.push({ s: 0, e: h3.totalShapeLength * (v3 - 1) }));
            var x3 = this.addShapes(h3, m3[0]);
            if (m3[0].s !== m3[0].e) {
              if (m3.length > 1) {
                if (h3.shape.paths.shapes[h3.shape.paths._length - 1].c) {
                  var S3 = x3.pop();
                  this.addPaths(x3, g3), x3 = this.addShapes(h3, m3[1], S3);
                } else this.addPaths(x3, g3), x3 = this.addShapes(h3, m3[1]);
              }
              this.addPaths(x3, g3);
            }
          }
          h3.shape.paths = g3;
        }
      } else if (this._mdf) for (o3 = 0; o3 < s3; o3 += 1) this.shapes[o3].pathsData.length = 0, this.shapes[o3].shape._mdf = true;
    }, vt2.prototype.addPaths = function(e3, t3) {
      var n3, r3 = e3.length;
      for (n3 = 0; n3 < r3; n3 += 1) t3.addShape(e3[n3]);
    }, vt2.prototype.addSegment = function(e3, t3, n3, r3, i3, a3, o3) {
      i3.setXYAt(t3[0], t3[1], `o`, a3), i3.setXYAt(n3[0], n3[1], `i`, a3 + 1), o3 && i3.setXYAt(e3[0], e3[1], `v`, a3), i3.setXYAt(r3[0], r3[1], `v`, a3 + 1);
    }, vt2.prototype.addSegmentFromArray = function(e3, t3, n3, r3) {
      t3.setXYAt(e3[1], e3[5], `o`, n3), t3.setXYAt(e3[2], e3[6], `i`, n3 + 1), r3 && t3.setXYAt(e3[0], e3[4], `v`, n3), t3.setXYAt(e3[3], e3[7], `v`, n3 + 1);
    }, vt2.prototype.addShapes = function(e3, t3, n3) {
      var r3 = e3.pathsData, i3 = e3.shape.paths.shapes, a3, o3 = e3.shape.paths._length, s3, c3, l3 = 0, u3, d3, f3, p3, m3 = [], h3, g3 = true;
      for (n3 ? (d3 = n3._length, h3 = n3._length) : (n3 = Ke2.newElement(), d3 = 0, h3 = 0), m3.push(n3), a3 = 0; a3 < o3; a3 += 1) {
        for (f3 = r3[a3].lengths, n3.c = i3[a3].c, c3 = i3[a3].c ? f3.length : f3.length + 1, s3 = 1; s3 < c3; s3 += 1) if (u3 = f3[s3 - 1], l3 + u3.addedLength < t3.s) l3 += u3.addedLength, n3.c = false;
        else if (l3 > t3.e) {
          n3.c = false;
          break;
        } else t3.s <= l3 && t3.e >= l3 + u3.addedLength ? (this.addSegment(i3[a3].v[s3 - 1], i3[a3].o[s3 - 1], i3[a3].i[s3], i3[a3].v[s3], n3, d3, g3), g3 = false) : (p3 = ke2.getNewSegment(i3[a3].v[s3 - 1], i3[a3].v[s3], i3[a3].o[s3 - 1], i3[a3].i[s3], (t3.s - l3) / u3.addedLength, (t3.e - l3) / u3.addedLength, f3[s3 - 1]), this.addSegmentFromArray(p3, n3, d3, g3), g3 = false, n3.c = false), l3 += u3.addedLength, d3 += 1;
        if (i3[a3].c && f3.length) {
          if (u3 = f3[s3 - 1], l3 <= t3.e) {
            var _3 = f3[s3 - 1].addedLength;
            t3.s <= l3 && t3.e >= l3 + _3 ? (this.addSegment(i3[a3].v[s3 - 1], i3[a3].o[s3 - 1], i3[a3].i[0], i3[a3].v[0], n3, d3, g3), g3 = false) : (p3 = ke2.getNewSegment(i3[a3].v[s3 - 1], i3[a3].v[0], i3[a3].o[s3 - 1], i3[a3].i[0], (t3.s - l3) / _3, (t3.e - l3) / _3, f3[s3 - 1]), this.addSegmentFromArray(p3, n3, d3, g3), g3 = false, n3.c = false);
          } else n3.c = false;
          l3 += u3.addedLength, d3 += 1;
        }
        if (n3._length && (n3.setXYAt(n3.v[h3][0], n3.v[h3][1], `i`, h3), n3.setXYAt(n3.v[n3._length - 1][0], n3.v[n3._length - 1][1], `o`, n3._length - 1)), l3 > t3.e) break;
        a3 < o3 - 1 && (n3 = Ke2.newElement(), g3 = true, m3.push(n3), d3 = 0);
      }
      return m3;
    };
    function yt2() {
    }
    u2([_t2], yt2), yt2.prototype.initModifierProperties = function(e3, t3) {
      this.getValue = this.processKeys, this.amount = H2.getProp(e3, t3.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length;
    }, yt2.prototype.processPath = function(e3, t3) {
      var n3 = t3 / 100, r3 = [0, 0], i3 = e3._length, a3 = 0;
      for (a3 = 0; a3 < i3; a3 += 1) r3[0] += e3.v[a3][0], r3[1] += e3.v[a3][1];
      r3[0] /= i3, r3[1] /= i3;
      var o3 = Ke2.newElement();
      o3.c = e3.c;
      var s3, c3, l3, u3, d3, f3;
      for (a3 = 0; a3 < i3; a3 += 1) s3 = e3.v[a3][0] + (r3[0] - e3.v[a3][0]) * n3, c3 = e3.v[a3][1] + (r3[1] - e3.v[a3][1]) * n3, l3 = e3.o[a3][0] + (r3[0] - e3.o[a3][0]) * -n3, u3 = e3.o[a3][1] + (r3[1] - e3.o[a3][1]) * -n3, d3 = e3.i[a3][0] + (r3[0] - e3.i[a3][0]) * -n3, f3 = e3.i[a3][1] + (r3[1] - e3.i[a3][1]) * -n3, o3.setTripleAt(s3, c3, l3, u3, d3, f3, a3);
      return o3;
    }, yt2.prototype.processShapes = function(e3) {
      var t3, n3, r3 = this.shapes.length, i3, a3, o3 = this.amount.v;
      if (o3 !== 0) {
        var s3, c3;
        for (n3 = 0; n3 < r3; n3 += 1) {
          if (s3 = this.shapes[n3], c3 = s3.localShapeCollection, !(!s3.shape._mdf && !this._mdf && !e3)) for (c3.releaseShapes(), s3.shape._mdf = true, t3 = s3.shape.paths.shapes, a3 = s3.shape.paths._length, i3 = 0; i3 < a3; i3 += 1) c3.addShape(this.processPath(t3[i3], o3));
          s3.shape.paths = s3.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    var bt2 = (function() {
      var e3 = [0, 0];
      function t3(e4) {
        var t4 = this._mdf;
        this.iterateDynamicProperties(), this._mdf = this._mdf || t4, this.a && e4.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && e4.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && e4.skewFromAxis(-this.sk.v, this.sa.v), this.r ? e4.rotate(-this.r.v) : e4.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? e4.translate(this.px.v, this.py.v, -this.pz.v) : e4.translate(this.px.v, this.py.v, 0) : e4.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
      }
      function n3(t4) {
        if (this.elem.globalData.frameId !== this.frameId) {
          if (this._isDirty &&= (this.precalculateMatrix(), false), this.iterateDynamicProperties(), this._mdf || t4) {
            var n4;
            if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
              var r4, i4;
              if (n4 = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r4 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / n4, 0), i4 = this.p.getValueAtTime(this.p.keyframes[0].t / n4, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r4 = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / n4, 0), i4 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / n4, 0)) : (r4 = this.p.pv, i4 = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / n4, this.p.offsetTime));
              else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                r4 = [], i4 = [];
                var a4 = this.px, o4 = this.py;
                a4._caching.lastFrame + a4.offsetTime <= a4.keyframes[0].t ? (r4[0] = a4.getValueAtTime((a4.keyframes[0].t + 0.01) / n4, 0), r4[1] = o4.getValueAtTime((o4.keyframes[0].t + 0.01) / n4, 0), i4[0] = a4.getValueAtTime(a4.keyframes[0].t / n4, 0), i4[1] = o4.getValueAtTime(o4.keyframes[0].t / n4, 0)) : a4._caching.lastFrame + a4.offsetTime >= a4.keyframes[a4.keyframes.length - 1].t ? (r4[0] = a4.getValueAtTime(a4.keyframes[a4.keyframes.length - 1].t / n4, 0), r4[1] = o4.getValueAtTime(o4.keyframes[o4.keyframes.length - 1].t / n4, 0), i4[0] = a4.getValueAtTime((a4.keyframes[a4.keyframes.length - 1].t - 0.01) / n4, 0), i4[1] = o4.getValueAtTime((o4.keyframes[o4.keyframes.length - 1].t - 0.01) / n4, 0)) : (r4 = [a4.pv, o4.pv], i4[0] = a4.getValueAtTime((a4._caching.lastFrame + a4.offsetTime - 0.01) / n4, a4.offsetTime), i4[1] = o4.getValueAtTime((o4._caching.lastFrame + o4.offsetTime - 0.01) / n4, o4.offsetTime));
              } else i4 = e3, r4 = i4;
              this.v.rotate(-Math.atan2(r4[1] - i4[1], r4[0] - i4[0]));
            }
            this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          }
          this.frameId = this.elem.globalData.frameId;
        }
      }
      function r3() {
        if (this.appliedTransformations = 0, this.pre.reset(), !this.a.effectsSequence.length) this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1;
        else return;
        if (!this.s.effectsSequence.length) this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2;
        else return;
        if (this.sk) {
          if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length) this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
          else return;
        }
        this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : !this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length && (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
      }
      function i3() {
      }
      function a3(e4) {
        this._addDynamicProperty(e4), this.elem.addDynamicProperty(e4), this._isDirty = true;
      }
      function o3(e4, t4, n4) {
        if (this.elem = e4, this.frameId = -1, this.propType = `transform`, this.data = t4, this.v = new Xe2(), this.pre = new Xe2(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(n4 || e4), t4.p && t4.p.s ? (this.px = H2.getProp(e4, t4.p.x, 0, 0, this), this.py = H2.getProp(e4, t4.p.y, 0, 0, this), t4.p.z && (this.pz = H2.getProp(e4, t4.p.z, 0, 0, this))) : this.p = H2.getProp(e4, t4.p || { k: [0, 0, 0] }, 1, 0, this), t4.rx) {
          if (this.rx = H2.getProp(e4, t4.rx, 0, D2, this), this.ry = H2.getProp(e4, t4.ry, 0, D2, this), this.rz = H2.getProp(e4, t4.rz, 0, D2, this), t4.or.k[0].ti) {
            var r4, i4 = t4.or.k.length;
            for (r4 = 0; r4 < i4; r4 += 1) t4.or.k[r4].to = null, t4.or.k[r4].ti = null;
          }
          this.or = H2.getProp(e4, t4.or, 1, D2, this), this.or.sh = true;
        } else this.r = H2.getProp(e4, t4.r || { k: 0 }, 0, D2, this);
        t4.sk && (this.sk = H2.getProp(e4, t4.sk, 0, D2, this), this.sa = H2.getProp(e4, t4.sa, 0, D2, this)), this.a = H2.getProp(e4, t4.a || { k: [0, 0, 0] }, 1, 0, this), this.s = H2.getProp(e4, t4.s || { k: [100, 100, 100] }, 1, 0.01, this), this.o = t4.o ? H2.getProp(e4, t4.o, 0, 0.01, e4) : { _mdf: false, v: 1 }, this._isDirty = true, this.dynamicProperties.length || this.getValue(true);
      }
      o3.prototype = { applyToMatrix: t3, getValue: n3, precalculateMatrix: r3, autoOrient: i3 }, u2([Ue2], o3), o3.prototype.addDynamicProperty = a3, o3.prototype._addDynamicProperty = Ue2.prototype.addDynamicProperty;
      function s3(e4, t4, n4) {
        return new o3(e4, t4, n4);
      }
      return { getTransformProperty: s3 };
    })();
    function xt2() {
    }
    u2([_t2], xt2), xt2.prototype.initModifierProperties = function(e3, t3) {
      this.getValue = this.processKeys, this.c = H2.getProp(e3, t3.c, 0, null, this), this.o = H2.getProp(e3, t3.o, 0, null, this), this.tr = bt2.getTransformProperty(e3, t3.tr, this), this.so = H2.getProp(e3, t3.tr.so, 0, 0.01, this), this.eo = H2.getProp(e3, t3.tr.eo, 0, 0.01, this), this.data = t3, this.dynamicProperties.length || this.getValue(true), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Xe2(), this.rMatrix = new Xe2(), this.sMatrix = new Xe2(), this.tMatrix = new Xe2(), this.matrix = new Xe2();
    }, xt2.prototype.applyTransforms = function(e3, t3, n3, r3, i3, a3) {
      var o3 = a3 ? -1 : 1, s3 = r3.s.v[0] + (1 - r3.s.v[0]) * (1 - i3), c3 = r3.s.v[1] + (1 - r3.s.v[1]) * (1 - i3);
      e3.translate(r3.p.v[0] * o3 * i3, r3.p.v[1] * o3 * i3, r3.p.v[2]), t3.translate(-r3.a.v[0], -r3.a.v[1], r3.a.v[2]), t3.rotate(-r3.r.v * o3 * i3), t3.translate(r3.a.v[0], r3.a.v[1], r3.a.v[2]), n3.translate(-r3.a.v[0], -r3.a.v[1], r3.a.v[2]), n3.scale(a3 ? 1 / s3 : s3, a3 ? 1 / c3 : c3), n3.translate(r3.a.v[0], r3.a.v[1], r3.a.v[2]);
    }, xt2.prototype.init = function(e3, t3, n3, r3) {
      for (this.elem = e3, this.arr = t3, this.pos = n3, this.elemsData = r3, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(e3), this.initModifierProperties(e3, t3[n3]); n3 > 0; ) --n3, this._elements.unshift(t3[n3]);
      this.dynamicProperties.length ? this.k = true : this.getValue(true);
    }, xt2.prototype.resetElements = function(e3) {
      var t3, n3 = e3.length;
      for (t3 = 0; t3 < n3; t3 += 1) e3[t3]._processed = false, e3[t3].ty === `gr` && this.resetElements(e3[t3].it);
    }, xt2.prototype.cloneElements = function(e3) {
      var t3 = JSON.parse(JSON.stringify(e3));
      return this.resetElements(t3), t3;
    }, xt2.prototype.changeGroupRender = function(e3, t3) {
      var n3, r3 = e3.length;
      for (n3 = 0; n3 < r3; n3 += 1) e3[n3]._render = t3, e3[n3].ty === `gr` && this.changeGroupRender(e3[n3].it, t3);
    }, xt2.prototype.processShapes = function(e3) {
      var t3, n3, r3, i3, a3, o3 = false;
      if (this._mdf || e3) {
        var s3 = Math.ceil(this.c.v);
        if (this._groups.length < s3) {
          for (; this._groups.length < s3; ) {
            var c3 = { it: this.cloneElements(this._elements), ty: `gr` };
            c3.it.push({ a: { a: 0, ix: 1, k: [0, 0] }, nm: `Transform`, o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: `tr` }), this.arr.splice(0, 0, c3), this._groups.splice(0, 0, c3), this._currentCopies += 1;
          }
          this.elem.reloadShapes(), o3 = true;
        }
        a3 = 0;
        var l3;
        for (r3 = 0; r3 <= this._groups.length - 1; r3 += 1) {
          if (l3 = a3 < s3, this._groups[r3]._render = l3, this.changeGroupRender(this._groups[r3].it, l3), !l3) {
            var u3 = this.elemsData[r3].it, d3 = u3[u3.length - 1];
            d3.transform.op.v === 0 ? d3.transform.op._mdf = false : (d3.transform.op._mdf = true, d3.transform.op.v = 0);
          }
          a3 += 1;
        }
        this._currentCopies = s3;
        var f3 = this.o.v, p3 = f3 % 1, m3 = f3 > 0 ? Math.floor(f3) : Math.ceil(f3), h3 = this.pMatrix.props, g3 = this.rMatrix.props, _3 = this.sMatrix.props;
        this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
        var v3 = 0;
        if (f3 > 0) {
          for (; v3 < m3; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), v3 += 1;
          p3 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p3, false), v3 += p3);
        } else if (f3 < 0) {
          for (; v3 > m3; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true), --v3;
          p3 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p3, true), v3 -= p3);
        }
        r3 = this.data.m === 1 ? 0 : this._currentCopies - 1, i3 = this.data.m === 1 ? 1 : -1, a3 = this._currentCopies;
        for (var y3, b3; a3; ) {
          if (t3 = this.elemsData[r3].it, n3 = t3[t3.length - 1].transform.mProps.v.props, b3 = n3.length, t3[t3.length - 1].transform.mProps._mdf = true, t3[t3.length - 1].transform.op._mdf = true, t3[t3.length - 1].transform.op.v = this._currentCopies === 1 ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (r3 / (this._currentCopies - 1)), v3 !== 0) {
            for ((r3 !== 0 && i3 === 1 || r3 !== this._currentCopies - 1 && i3 === -1) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), this.matrix.transform(g3[0], g3[1], g3[2], g3[3], g3[4], g3[5], g3[6], g3[7], g3[8], g3[9], g3[10], g3[11], g3[12], g3[13], g3[14], g3[15]), this.matrix.transform(_3[0], _3[1], _3[2], _3[3], _3[4], _3[5], _3[6], _3[7], _3[8], _3[9], _3[10], _3[11], _3[12], _3[13], _3[14], _3[15]), this.matrix.transform(h3[0], h3[1], h3[2], h3[3], h3[4], h3[5], h3[6], h3[7], h3[8], h3[9], h3[10], h3[11], h3[12], h3[13], h3[14], h3[15]), y3 = 0; y3 < b3; y3 += 1) n3[y3] = this.matrix.props[y3];
            this.matrix.reset();
          } else for (this.matrix.reset(), y3 = 0; y3 < b3; y3 += 1) n3[y3] = this.matrix.props[y3];
          v3 += 1, --a3, r3 += i3;
        }
      } else for (a3 = this._currentCopies, r3 = 0, i3 = 1; a3; ) t3 = this.elemsData[r3].it, n3 = t3[t3.length - 1].transform.mProps.v.props, t3[t3.length - 1].transform.mProps._mdf = false, t3[t3.length - 1].transform.op._mdf = false, --a3, r3 += i3;
      return o3;
    }, xt2.prototype.addShape = function() {
    };
    function St2() {
    }
    u2([_t2], St2), St2.prototype.initModifierProperties = function(e3, t3) {
      this.getValue = this.processKeys, this.rd = H2.getProp(e3, t3.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
    }, St2.prototype.processPath = function(e3, t3) {
      var n3 = Ke2.newElement();
      n3.c = e3.c;
      var r3, i3 = e3._length, a3, o3, s3, c3, l3, u3, d3 = 0, f3, p3, m3, h3, g3, _3;
      for (r3 = 0; r3 < i3; r3 += 1) a3 = e3.v[r3], s3 = e3.o[r3], o3 = e3.i[r3], a3[0] === s3[0] && a3[1] === s3[1] && a3[0] === o3[0] && a3[1] === o3[1] ? (r3 === 0 || r3 === i3 - 1) && !e3.c ? (n3.setTripleAt(a3[0], a3[1], s3[0], s3[1], o3[0], o3[1], d3), d3 += 1) : (c3 = r3 === 0 ? e3.v[i3 - 1] : e3.v[r3 - 1], l3 = Math.sqrt((a3[0] - c3[0]) ** 2 + (a3[1] - c3[1]) ** 2), u3 = l3 ? Math.min(l3 / 2, t3) / l3 : 0, g3 = a3[0] + (c3[0] - a3[0]) * u3, f3 = g3, _3 = a3[1] - (a3[1] - c3[1]) * u3, p3 = _3, m3 = f3 - (f3 - a3[0]) * O2, h3 = p3 - (p3 - a3[1]) * O2, n3.setTripleAt(f3, p3, m3, h3, g3, _3, d3), d3 += 1, c3 = r3 === i3 - 1 ? e3.v[0] : e3.v[r3 + 1], l3 = Math.sqrt((a3[0] - c3[0]) ** 2 + (a3[1] - c3[1]) ** 2), u3 = l3 ? Math.min(l3 / 2, t3) / l3 : 0, m3 = a3[0] + (c3[0] - a3[0]) * u3, f3 = m3, h3 = a3[1] + (c3[1] - a3[1]) * u3, p3 = h3, g3 = f3 - (f3 - a3[0]) * O2, _3 = p3 - (p3 - a3[1]) * O2, n3.setTripleAt(f3, p3, m3, h3, g3, _3, d3), d3 += 1) : (n3.setTripleAt(e3.v[r3][0], e3.v[r3][1], e3.o[r3][0], e3.o[r3][1], e3.i[r3][0], e3.i[r3][1], d3), d3 += 1);
      return n3;
    }, St2.prototype.processShapes = function(e3) {
      var t3, n3, r3 = this.shapes.length, i3, a3, o3 = this.rd.v;
      if (o3 !== 0) {
        var s3, c3;
        for (n3 = 0; n3 < r3; n3 += 1) {
          if (s3 = this.shapes[n3], c3 = s3.localShapeCollection, !(!s3.shape._mdf && !this._mdf && !e3)) for (c3.releaseShapes(), s3.shape._mdf = true, t3 = s3.shape.paths.shapes, a3 = s3.shape.paths._length, i3 = 0; i3 < a3; i3 += 1) c3.addShape(this.processPath(t3[i3], o3));
          s3.shape.paths = s3.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    function Ct2(e3, t3) {
      return Math.abs(e3 - t3) * 1e5 <= Math.min(Math.abs(e3), Math.abs(t3));
    }
    function wt2(e3) {
      return Math.abs(e3) <= 1e-5;
    }
    function Tt2(e3, t3, n3) {
      return e3 * (1 - n3) + t3 * n3;
    }
    function Et2(e3, t3, n3) {
      return [Tt2(e3[0], t3[0], n3), Tt2(e3[1], t3[1], n3)];
    }
    function Dt2(e3, t3, n3) {
      if (e3 === 0) return [];
      var r3 = t3 * t3 - 4 * e3 * n3;
      if (r3 < 0) return [];
      var i3 = -t3 / (2 * e3);
      if (r3 === 0) return [i3];
      var a3 = Math.sqrt(r3) / (2 * e3);
      return [i3 - a3, i3 + a3];
    }
    function Ot2(e3, t3, n3, r3) {
      return [-e3 + 3 * t3 - 3 * n3 + r3, 3 * e3 - 6 * t3 + 3 * n3, -3 * e3 + 3 * t3, e3];
    }
    function kt2(e3) {
      return new At2(e3, e3, e3, e3, false);
    }
    function At2(e3, t3, n3, r3, i3) {
      i3 && Bt2(e3, t3) && (t3 = Et2(e3, r3, 1 / 3)), i3 && Bt2(n3, r3) && (n3 = Et2(e3, r3, 2 / 3));
      var a3 = Ot2(e3[0], t3[0], n3[0], r3[0]), o3 = Ot2(e3[1], t3[1], n3[1], r3[1]);
      this.a = [a3[0], o3[0]], this.b = [a3[1], o3[1]], this.c = [a3[2], o3[2]], this.d = [a3[3], o3[3]], this.points = [e3, t3, n3, r3];
    }
    At2.prototype.point = function(e3) {
      return [((this.a[0] * e3 + this.b[0]) * e3 + this.c[0]) * e3 + this.d[0], ((this.a[1] * e3 + this.b[1]) * e3 + this.c[1]) * e3 + this.d[1]];
    }, At2.prototype.derivative = function(e3) {
      return [(3 * e3 * this.a[0] + 2 * this.b[0]) * e3 + this.c[0], (3 * e3 * this.a[1] + 2 * this.b[1]) * e3 + this.c[1]];
    }, At2.prototype.tangentAngle = function(e3) {
      var t3 = this.derivative(e3);
      return Math.atan2(t3[1], t3[0]);
    }, At2.prototype.normalAngle = function(e3) {
      var t3 = this.derivative(e3);
      return Math.atan2(t3[0], t3[1]);
    }, At2.prototype.inflectionPoints = function() {
      var e3 = this.a[1] * this.b[0] - this.a[0] * this.b[1];
      if (wt2(e3)) return [];
      var t3 = -0.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / e3, n3 = t3 * t3 - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / e3;
      if (n3 < 0) return [];
      var r3 = Math.sqrt(n3);
      return wt2(r3) ? r3 > 0 && r3 < 1 ? [t3] : [] : [t3 - r3, t3 + r3].filter(function(e4) {
        return e4 > 0 && e4 < 1;
      });
    }, At2.prototype.split = function(e3) {
      if (e3 <= 0) return [kt2(this.points[0]), this];
      if (e3 >= 1) return [this, kt2(this.points[this.points.length - 1])];
      var t3 = Et2(this.points[0], this.points[1], e3), n3 = Et2(this.points[1], this.points[2], e3), r3 = Et2(this.points[2], this.points[3], e3), i3 = Et2(t3, n3, e3), a3 = Et2(n3, r3, e3), o3 = Et2(i3, a3, e3);
      return [new At2(this.points[0], t3, i3, o3, true), new At2(o3, a3, r3, this.points[3], true)];
    };
    function jt2(e3, t3) {
      var n3 = e3.points[0][t3], r3 = e3.points[e3.points.length - 1][t3];
      if (n3 > r3) {
        var i3 = r3;
        r3 = n3, n3 = i3;
      }
      for (var a3 = Dt2(3 * e3.a[t3], 2 * e3.b[t3], e3.c[t3]), o3 = 0; o3 < a3.length; o3 += 1) if (a3[o3] > 0 && a3[o3] < 1) {
        var s3 = e3.point(a3[o3])[t3];
        s3 < n3 ? n3 = s3 : s3 > r3 && (r3 = s3);
      }
      return { min: n3, max: r3 };
    }
    At2.prototype.bounds = function() {
      return { x: jt2(this, 0), y: jt2(this, 1) };
    }, At2.prototype.boundingBox = function() {
      var e3 = this.bounds();
      return { left: e3.x.min, right: e3.x.max, top: e3.y.min, bottom: e3.y.max, width: e3.x.max - e3.x.min, height: e3.y.max - e3.y.min, cx: (e3.x.max + e3.x.min) / 2, cy: (e3.y.max + e3.y.min) / 2 };
    };
    function Mt2(e3, t3, n3) {
      var r3 = e3.boundingBox();
      return { cx: r3.cx, cy: r3.cy, width: r3.width, height: r3.height, bez: e3, t: (t3 + n3) / 2, t1: t3, t2: n3 };
    }
    function Nt2(e3) {
      var t3 = e3.bez.split(0.5);
      return [Mt2(t3[0], e3.t1, e3.t), Mt2(t3[1], e3.t, e3.t2)];
    }
    function Pt2(e3, t3) {
      return Math.abs(e3.cx - t3.cx) * 2 < e3.width + t3.width && Math.abs(e3.cy - t3.cy) * 2 < e3.height + t3.height;
    }
    function Ft2(e3, t3, n3, r3, i3, a3) {
      if (Pt2(e3, t3)) {
        if (n3 >= a3 || e3.width <= r3 && e3.height <= r3 && t3.width <= r3 && t3.height <= r3) {
          i3.push([e3.t, t3.t]);
          return;
        }
        var o3 = Nt2(e3), s3 = Nt2(t3);
        Ft2(o3[0], s3[0], n3 + 1, r3, i3, a3), Ft2(o3[0], s3[1], n3 + 1, r3, i3, a3), Ft2(o3[1], s3[0], n3 + 1, r3, i3, a3), Ft2(o3[1], s3[1], n3 + 1, r3, i3, a3);
      }
    }
    At2.prototype.intersections = function(e3, t3, n3) {
      t3 === void 0 && (t3 = 2), n3 === void 0 && (n3 = 7);
      var r3 = [];
      return Ft2(Mt2(this, 0, 1), Mt2(e3, 0, 1), 0, t3, r3, n3), r3;
    }, At2.shapeSegment = function(e3, t3) {
      var n3 = (t3 + 1) % e3.length();
      return new At2(e3.v[t3], e3.o[t3], e3.i[n3], e3.v[n3], true);
    }, At2.shapeSegmentInverted = function(e3, t3) {
      var n3 = (t3 + 1) % e3.length();
      return new At2(e3.v[n3], e3.i[n3], e3.o[t3], e3.v[t3], true);
    };
    function It2(e3, t3) {
      return [e3[1] * t3[2] - e3[2] * t3[1], e3[2] * t3[0] - e3[0] * t3[2], e3[0] * t3[1] - e3[1] * t3[0]];
    }
    function Lt2(e3, t3, n3, r3) {
      var i3 = [e3[0], e3[1], 1], a3 = [t3[0], t3[1], 1], o3 = [n3[0], n3[1], 1], s3 = [r3[0], r3[1], 1], c3 = It2(It2(i3, a3), It2(o3, s3));
      return wt2(c3[2]) ? null : [c3[0] / c3[2], c3[1] / c3[2]];
    }
    function Rt2(e3, t3, n3) {
      return [e3[0] + Math.cos(t3) * n3, e3[1] - Math.sin(t3) * n3];
    }
    function zt2(e3, t3) {
      return Math.hypot(e3[0] - t3[0], e3[1] - t3[1]);
    }
    function Bt2(e3, t3) {
      return Ct2(e3[0], t3[0]) && Ct2(e3[1], t3[1]);
    }
    function Vt2() {
    }
    u2([_t2], Vt2), Vt2.prototype.initModifierProperties = function(e3, t3) {
      this.getValue = this.processKeys, this.amplitude = H2.getProp(e3, t3.s, 0, null, this), this.frequency = H2.getProp(e3, t3.r, 0, null, this), this.pointsType = H2.getProp(e3, t3.pt, 0, null, this), this._isAnimated = this.amplitude.effectsSequence.length !== 0 || this.frequency.effectsSequence.length !== 0 || this.pointsType.effectsSequence.length !== 0;
    };
    function Ht2(e3, t3, n3, r3, i3, a3, o3) {
      var s3 = n3 - Math.PI / 2, c3 = n3 + Math.PI / 2, l3 = t3[0] + Math.cos(n3) * r3 * i3, u3 = t3[1] - Math.sin(n3) * r3 * i3;
      e3.setTripleAt(l3, u3, l3 + Math.cos(s3) * a3, u3 - Math.sin(s3) * a3, l3 + Math.cos(c3) * o3, u3 - Math.sin(c3) * o3, e3.length());
    }
    function Ut2(e3, t3) {
      var n3 = [t3[0] - e3[0], t3[1] - e3[1]], r3 = -Math.PI * 0.5;
      return [Math.cos(r3) * n3[0] - Math.sin(r3) * n3[1], Math.sin(r3) * n3[0] + Math.cos(r3) * n3[1]];
    }
    function Wt2(e3, t3) {
      var n3 = t3 === 0 ? e3.length() - 1 : t3 - 1, r3 = (t3 + 1) % e3.length(), i3 = e3.v[n3], a3 = e3.v[r3], o3 = Ut2(i3, a3);
      return Math.atan2(0, 1) - Math.atan2(o3[1], o3[0]);
    }
    function Gt2(e3, t3, n3, r3, i3, a3, o3) {
      var s3 = Wt2(t3, n3), c3 = t3.v[n3 % t3._length], l3 = t3.v[n3 === 0 ? t3._length - 1 : n3 - 1], u3 = t3.v[(n3 + 1) % t3._length], d3 = a3 === 2 ? Math.sqrt((c3[0] - l3[0]) ** 2 + (c3[1] - l3[1]) ** 2) : 0, f3 = a3 === 2 ? Math.sqrt((c3[0] - u3[0]) ** 2 + (c3[1] - u3[1]) ** 2) : 0;
      Ht2(e3, t3.v[n3 % t3._length], s3, o3, r3, f3 / ((i3 + 1) * 2), d3 / ((i3 + 1) * 2), a3);
    }
    function Kt2(e3, t3, n3, r3, i3, a3) {
      for (var o3 = 0; o3 < r3; o3 += 1) {
        var s3 = (o3 + 1) / (r3 + 1), c3 = i3 === 2 ? Math.sqrt((t3.points[3][0] - t3.points[0][0]) ** 2 + (t3.points[3][1] - t3.points[0][1]) ** 2) : 0, l3 = t3.normalAngle(s3);
        Ht2(e3, t3.point(s3), l3, a3, n3, c3 / ((r3 + 1) * 2), c3 / ((r3 + 1) * 2), i3), a3 = -a3;
      }
      return a3;
    }
    Vt2.prototype.processPath = function(e3, t3, n3, r3) {
      var i3 = e3._length, a3 = Ke2.newElement();
      if (a3.c = e3.c, e3.c || --i3, i3 === 0) return a3;
      var o3 = -1, s3 = At2.shapeSegment(e3, 0);
      Gt2(a3, e3, 0, t3, n3, r3, o3);
      for (var c3 = 0; c3 < i3; c3 += 1) o3 = Kt2(a3, s3, t3, n3, r3, -o3), s3 = c3 === i3 - 1 && !e3.c ? null : At2.shapeSegment(e3, (c3 + 1) % i3), Gt2(a3, e3, c3 + 1, t3, n3, r3, o3);
      return a3;
    }, Vt2.prototype.processShapes = function(e3) {
      var t3, n3, r3 = this.shapes.length, i3, a3, o3 = this.amplitude.v, s3 = Math.max(0, Math.round(this.frequency.v)), c3 = this.pointsType.v;
      if (o3 !== 0) {
        var l3, u3;
        for (n3 = 0; n3 < r3; n3 += 1) {
          if (l3 = this.shapes[n3], u3 = l3.localShapeCollection, !(!l3.shape._mdf && !this._mdf && !e3)) for (u3.releaseShapes(), l3.shape._mdf = true, t3 = l3.shape.paths.shapes, a3 = l3.shape.paths._length, i3 = 0; i3 < a3; i3 += 1) u3.addShape(this.processPath(t3[i3], o3, s3, c3));
          l3.shape.paths = l3.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    function qt2(e3, t3, n3) {
      var r3 = Math.atan2(t3[0] - e3[0], t3[1] - e3[1]);
      return [Rt2(e3, r3, n3), Rt2(t3, r3, n3)];
    }
    function Jt2(e3, t3) {
      var n3, r3, i3, a3, o3, s3, c3 = qt2(e3.points[0], e3.points[1], t3);
      n3 = c3[0], r3 = c3[1], c3 = qt2(e3.points[1], e3.points[2], t3), i3 = c3[0], a3 = c3[1], c3 = qt2(e3.points[2], e3.points[3], t3), o3 = c3[0], s3 = c3[1];
      var l3 = Lt2(n3, r3, i3, a3);
      l3 === null && (l3 = r3);
      var u3 = Lt2(o3, s3, i3, a3);
      return u3 === null && (u3 = o3), new At2(n3, l3, u3, s3);
    }
    function Yt2(e3, t3, n3, r3, i3) {
      var a3 = t3.points[3], o3 = n3.points[0];
      if (r3 === 3 || Bt2(a3, o3)) return a3;
      if (r3 === 2) {
        var s3 = -t3.tangentAngle(1), c3 = -n3.tangentAngle(0) + Math.PI, l3 = Lt2(a3, Rt2(a3, s3 + Math.PI / 2, 100), o3, Rt2(o3, s3 + Math.PI / 2, 100)), u3 = l3 ? zt2(l3, a3) : zt2(a3, o3) / 2, d3 = Rt2(a3, s3, 2 * u3 * O2);
        return e3.setXYAt(d3[0], d3[1], `o`, e3.length() - 1), d3 = Rt2(o3, c3, 2 * u3 * O2), e3.setTripleAt(o3[0], o3[1], o3[0], o3[1], d3[0], d3[1], e3.length()), o3;
      }
      var f3 = Lt2(Bt2(a3, t3.points[2]) ? t3.points[0] : t3.points[2], a3, o3, Bt2(o3, n3.points[1]) ? n3.points[3] : n3.points[1]);
      return f3 && zt2(f3, a3) < i3 ? (e3.setTripleAt(f3[0], f3[1], f3[0], f3[1], f3[0], f3[1], e3.length()), f3) : a3;
    }
    function Xt2(e3, t3) {
      var n3 = e3.intersections(t3);
      return n3.length && Ct2(n3[0][0], 1) && n3.shift(), n3.length ? n3[0] : null;
    }
    function Zt2(e3, t3) {
      var n3 = e3.slice(), r3 = t3.slice(), i3 = Xt2(e3[e3.length - 1], t3[0]);
      return i3 && (n3[e3.length - 1] = e3[e3.length - 1].split(i3[0])[0], r3[0] = t3[0].split(i3[1])[1]), e3.length > 1 && t3.length > 1 && (i3 = Xt2(e3[0], t3[t3.length - 1]), i3) ? [[e3[0].split(i3[0])[0]], [t3[t3.length - 1].split(i3[1])[1]]] : [n3, r3];
    }
    function Qt2(e3) {
      for (var t3, n3 = 1; n3 < e3.length; n3 += 1) t3 = Zt2(e3[n3 - 1], e3[n3]), e3[n3 - 1] = t3[0], e3[n3] = t3[1];
      return e3.length > 1 && (t3 = Zt2(e3[e3.length - 1], e3[0]), e3[e3.length - 1] = t3[0], e3[0] = t3[1]), e3;
    }
    function $t2(e3, t3) {
      var n3 = e3.inflectionPoints(), r3, i3, a3, o3;
      if (n3.length === 0) return [Jt2(e3, t3)];
      if (n3.length === 1 || Ct2(n3[1], 1)) return a3 = e3.split(n3[0]), r3 = a3[0], i3 = a3[1], [Jt2(r3, t3), Jt2(i3, t3)];
      a3 = e3.split(n3[0]), r3 = a3[0];
      var s3 = (n3[1] - n3[0]) / (1 - n3[0]);
      return a3 = a3[1].split(s3), o3 = a3[0], i3 = a3[1], [Jt2(r3, t3), Jt2(o3, t3), Jt2(i3, t3)];
    }
    function en2() {
    }
    u2([_t2], en2), en2.prototype.initModifierProperties = function(e3, t3) {
      this.getValue = this.processKeys, this.amount = H2.getProp(e3, t3.a, 0, null, this), this.miterLimit = H2.getProp(e3, t3.ml, 0, null, this), this.lineJoin = t3.lj, this._isAnimated = this.amount.effectsSequence.length !== 0;
    }, en2.prototype.processPath = function(e3, t3, n3, r3) {
      var i3 = Ke2.newElement();
      i3.c = e3.c;
      var a3 = e3.length();
      e3.c || --a3;
      var o3, s3, c3, l3 = [];
      for (o3 = 0; o3 < a3; o3 += 1) c3 = At2.shapeSegment(e3, o3), l3.push($t2(c3, t3));
      if (!e3.c) for (o3 = a3 - 1; o3 >= 0; --o3) c3 = At2.shapeSegmentInverted(e3, o3), l3.push($t2(c3, t3));
      l3 = Qt2(l3);
      var u3 = null, d3 = null;
      for (o3 = 0; o3 < l3.length; o3 += 1) {
        var f3 = l3[o3];
        for (d3 && (u3 = Yt2(i3, d3, f3[0], n3, r3)), d3 = f3[f3.length - 1], s3 = 0; s3 < f3.length; s3 += 1) c3 = f3[s3], u3 && Bt2(c3.points[0], u3) ? i3.setXYAt(c3.points[1][0], c3.points[1][1], `o`, i3.length() - 1) : i3.setTripleAt(c3.points[0][0], c3.points[0][1], c3.points[1][0], c3.points[1][1], c3.points[0][0], c3.points[0][1], i3.length()), i3.setTripleAt(c3.points[3][0], c3.points[3][1], c3.points[3][0], c3.points[3][1], c3.points[2][0], c3.points[2][1], i3.length()), u3 = c3.points[3];
      }
      return l3.length && Yt2(i3, d3, l3[0][0], n3, r3), i3;
    }, en2.prototype.processShapes = function(e3) {
      var t3, n3, r3 = this.shapes.length, i3, a3, o3 = this.amount.v, s3 = this.miterLimit.v, c3 = this.lineJoin;
      if (o3 !== 0) {
        var l3, u3;
        for (n3 = 0; n3 < r3; n3 += 1) {
          if (l3 = this.shapes[n3], u3 = l3.localShapeCollection, !(!l3.shape._mdf && !this._mdf && !e3)) for (u3.releaseShapes(), l3.shape._mdf = true, t3 = l3.shape.paths.shapes, a3 = l3.shape.paths._length, i3 = 0; i3 < a3; i3 += 1) u3.addShape(this.processPath(t3[i3], o3, c3, s3));
          l3.shape.paths = l3.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    function tn2(e3) {
      for (var t3 = e3.fStyle ? e3.fStyle.split(` `) : [], n3 = `normal`, r3 = `normal`, i3 = t3.length, a3, o3 = 0; o3 < i3; o3 += 1) switch (a3 = t3[o3].toLowerCase(), a3) {
        case `italic`:
          r3 = `italic`;
          break;
        case `bold`:
          n3 = `700`;
          break;
        case `black`:
          n3 = `900`;
          break;
        case `medium`:
          n3 = `500`;
          break;
        case `regular`:
        case `normal`:
          n3 = `400`;
          break;
        case `light`:
        case `thin`:
          n3 = `200`;
      }
      return { style: r3, weight: e3.fWeight || n3 };
    }
    var nn2 = (function() {
      var e3 = { w: 0, size: 0, shapes: [], data: { shapes: [] } }, t3 = [];
      t3 = t3.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
      var n3 = 127988, r3 = 917631, i3 = 917601, a3 = 917626, o3 = 65039, s3 = 8205, c3 = 127462, u3 = 127487, d3 = [`d83cdffb`, `d83cdffc`, `d83cdffd`, `d83cdffe`, `d83cdfff`];
      function f3(e4) {
        var t4 = e4.split(`,`), n4, r4 = t4.length, i4 = [];
        for (n4 = 0; n4 < r4; n4 += 1) t4[n4] !== `sans-serif` && t4[n4] !== `monospace` && i4.push(t4[n4]);
        return i4.join(`,`);
      }
      function p3(e4, t4) {
        var n4 = l2(`span`);
        n4.setAttribute(`aria-hidden`, true), n4.style.fontFamily = t4;
        var r4 = l2(`span`);
        r4.innerText = `giItT1WQy@!-/#`, n4.style.position = `absolute`, n4.style.left = `-10000px`, n4.style.top = `-10000px`, n4.style.fontSize = `300px`, n4.style.fontVariant = `normal`, n4.style.fontStyle = `normal`, n4.style.fontWeight = `normal`, n4.style.letterSpacing = `0`, n4.appendChild(r4), document.body.appendChild(n4);
        var i4 = r4.offsetWidth;
        return r4.style.fontFamily = f3(e4) + `, ` + t4, { node: r4, w: i4, parent: n4 };
      }
      function m3() {
        var e4, t4 = this.fonts.length, n4, r4, i4 = t4;
        for (e4 = 0; e4 < t4; e4 += 1) this.fonts[e4].loaded ? --i4 : this.fonts[e4].fOrigin === `n` || this.fonts[e4].origin === 0 ? this.fonts[e4].loaded = true : (n4 = this.fonts[e4].monoCase.node, r4 = this.fonts[e4].monoCase.w, n4.offsetWidth === r4 ? (n4 = this.fonts[e4].sansCase.node, r4 = this.fonts[e4].sansCase.w, n4.offsetWidth !== r4 && (--i4, this.fonts[e4].loaded = true)) : (--i4, this.fonts[e4].loaded = true), this.fonts[e4].loaded && (this.fonts[e4].sansCase.parent.parentNode.removeChild(this.fonts[e4].sansCase.parent), this.fonts[e4].monoCase.parent.parentNode.removeChild(this.fonts[e4].monoCase.parent)));
        i4 !== 0 && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10);
      }
      function h3(e4, t4) {
        var n4 = document.body && t4 ? `svg` : `canvas`, r4, i4 = tn2(e4);
        if (n4 === `svg`) {
          var a4 = R2(`text`);
          a4.style.fontSize = `100px`, a4.setAttribute(`font-family`, e4.fFamily), a4.setAttribute(`font-style`, i4.style), a4.setAttribute(`font-weight`, i4.weight), a4.textContent = `1`, e4.fClass ? (a4.style.fontFamily = `inherit`, a4.setAttribute(`class`, e4.fClass)) : a4.style.fontFamily = e4.fFamily, t4.appendChild(a4), r4 = a4;
        } else {
          var o4 = new OffscreenCanvas(500, 500).getContext(`2d`);
          o4.font = i4.style + ` ` + i4.weight + ` 100px ` + e4.fFamily, r4 = o4;
        }
        function s4(e5) {
          return n4 === `svg` ? (r4.textContent = e5, r4.getComputedTextLength()) : r4.measureText(e5).width;
        }
        return { measureText: s4 };
      }
      function g3(e4, t4) {
        if (!e4) {
          this.isLoaded = true;
          return;
        }
        if (this.chars) {
          this.isLoaded = true, this.fonts = e4.list;
          return;
        }
        if (!document.body) {
          this.isLoaded = true, e4.list.forEach(function(e5) {
            e5.helper = h3(e5), e5.cache = {};
          }), this.fonts = e4.list;
          return;
        }
        var n4 = e4.list, r4, i4 = n4.length, a4 = i4;
        for (r4 = 0; r4 < i4; r4 += 1) {
          var o4 = true, s4, c4;
          if (n4[r4].loaded = false, n4[r4].monoCase = p3(n4[r4].fFamily, `monospace`), n4[r4].sansCase = p3(n4[r4].fFamily, `sans-serif`), !n4[r4].fPath) n4[r4].loaded = true, --a4;
          else if (n4[r4].fOrigin === `p` || n4[r4].origin === 3) {
            if (s4 = document.querySelectorAll(`style[f-forigin="p"][f-family="` + n4[r4].fFamily + `"], style[f-origin="3"][f-family="` + n4[r4].fFamily + `"]`), s4.length > 0 && (o4 = false), o4) {
              var u4 = l2(`style`);
              u4.setAttribute(`f-forigin`, n4[r4].fOrigin), u4.setAttribute(`f-origin`, n4[r4].origin), u4.setAttribute(`f-family`, n4[r4].fFamily), u4.type = `text/css`, u4.innerText = `@font-face {font-family: ` + n4[r4].fFamily + `; font-style: normal; src: url('` + n4[r4].fPath + `');}`, t4.appendChild(u4);
            }
          } else if (n4[r4].fOrigin === `g` || n4[r4].origin === 1) {
            for (s4 = document.querySelectorAll(`link[f-forigin="g"], link[f-origin="1"]`), c4 = 0; c4 < s4.length; c4 += 1) s4[c4].href.indexOf(n4[r4].fPath) !== -1 && (o4 = false);
            if (o4) {
              var d4 = l2(`link`);
              d4.setAttribute(`f-forigin`, n4[r4].fOrigin), d4.setAttribute(`f-origin`, n4[r4].origin), d4.type = `text/css`, d4.rel = `stylesheet`, d4.href = n4[r4].fPath, document.body.appendChild(d4);
            }
          } else if (n4[r4].fOrigin === `t` || n4[r4].origin === 2) {
            for (s4 = document.querySelectorAll(`script[f-forigin="t"], script[f-origin="2"]`), c4 = 0; c4 < s4.length; c4 += 1) n4[r4].fPath === s4[c4].src && (o4 = false);
            if (o4) {
              var f4 = l2(`link`);
              f4.setAttribute(`f-forigin`, n4[r4].fOrigin), f4.setAttribute(`f-origin`, n4[r4].origin), f4.setAttribute(`rel`, `stylesheet`), f4.setAttribute(`href`, n4[r4].fPath), t4.appendChild(f4);
            }
          }
          n4[r4].helper = h3(n4[r4], t4), n4[r4].cache = {}, this.fonts.push(n4[r4]);
        }
        a4 === 0 ? this.isLoaded = true : setTimeout(this.checkLoadedFonts.bind(this), 100);
      }
      function _3(e4) {
        if (e4) {
          this.chars ||= [];
          var t4, n4 = e4.length, r4, i4 = this.chars.length, a4;
          for (t4 = 0; t4 < n4; t4 += 1) {
            for (r4 = 0, a4 = false; r4 < i4; ) this.chars[r4].style === e4[t4].style && this.chars[r4].fFamily === e4[t4].fFamily && this.chars[r4].ch === e4[t4].ch && (a4 = true), r4 += 1;
            a4 || (this.chars.push(e4[t4]), i4 += 1);
          }
        }
      }
      function v3(t4, n4, r4) {
        for (var i4 = 0, a4 = this.chars.length; i4 < a4; ) {
          if (this.chars[i4].ch === t4 && this.chars[i4].style === n4 && this.chars[i4].fFamily === r4) return this.chars[i4];
          i4 += 1;
        }
        return (typeof t4 == `string` && t4.charCodeAt(0) !== 13 || !t4) && console && console.warn && !this._warned && (this._warned = true, console.warn(`Missing character from exported characters list: `, t4, n4, r4)), e3;
      }
      function y3(e4, t4, n4) {
        var r4 = this.getFontByName(t4), i4 = e4;
        if (!r4.cache[i4]) {
          var a4 = r4.helper;
          if (e4 === ` `) {
            var o4 = a4.measureText(`|` + e4 + `|`), s4 = a4.measureText(`||`);
            r4.cache[i4] = (o4 - s4) / 100;
          } else r4.cache[i4] = a4.measureText(e4) / 100;
        }
        return r4.cache[i4] * n4;
      }
      function b3(e4) {
        for (var t4 = 0, n4 = this.fonts.length; t4 < n4; ) {
          if (this.fonts[t4].fName === e4) return this.fonts[t4];
          t4 += 1;
        }
        return this.fonts[0];
      }
      function x3(e4) {
        var t4 = 0, n4 = e4.charCodeAt(0);
        if (n4 >= 55296 && n4 <= 56319) {
          var r4 = e4.charCodeAt(1);
          r4 >= 56320 && r4 <= 57343 && (t4 = (n4 - 55296) * 1024 + r4 - 56320 + 65536);
        }
        return t4;
      }
      function S3(e4, t4) {
        var n4 = e4.toString(16) + t4.toString(16);
        return d3.indexOf(n4) !== -1;
      }
      function C3(e4) {
        return e4 === s3;
      }
      function w3(e4) {
        return e4 === o3;
      }
      function T3(e4) {
        var t4 = x3(e4);
        return t4 >= c3 && t4 <= u3;
      }
      function E3(e4) {
        return T3(e4.substr(0, 2)) && T3(e4.substr(2, 2));
      }
      function D3(e4) {
        return t3.indexOf(e4) !== -1;
      }
      function O3(e4, t4) {
        var o4 = x3(e4.substr(t4, 2));
        if (o4 !== n3) return false;
        var s4 = 0;
        for (t4 += 2; s4 < 5; ) {
          if (o4 = x3(e4.substr(t4, 2)), o4 < i3 || o4 > a3) return false;
          s4 += 1, t4 += 2;
        }
        return x3(e4.substr(t4, 2)) === r3;
      }
      function k3() {
        this.isLoaded = true;
      }
      var A3 = function() {
        this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = false, this._warned = false, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
      };
      return A3.isModifier = S3, A3.isZeroWidthJoiner = C3, A3.isFlagEmoji = E3, A3.isRegionalCode = T3, A3.isCombinedCharacter = D3, A3.isRegionalFlag = O3, A3.isVariationSelector = w3, A3.BLACK_FLAG_CODE_POINT = n3, A3.prototype = { addChars: _3, addFonts: g3, getCharData: v3, getFontByName: b3, measureText: y3, checkLoadedFonts: m3, setIsLoaded: k3 }, A3;
    })();
    function rn2(e3) {
      this.animationData = e3;
    }
    rn2.prototype.getProp = function(e3) {
      return this.animationData.slots && this.animationData.slots[e3.sid] ? Object.assign(e3, this.animationData.slots[e3.sid].p) : e3;
    };
    function an2(e3) {
      return new rn2(e3);
    }
    function on2() {
    }
    on2.prototype = { initRenderable: function() {
      this.isInRange = false, this.hidden = false, this.isTransparent = false, this.renderableComponents = [];
    }, addRenderableComponent: function(e3) {
      this.renderableComponents.indexOf(e3) === -1 && this.renderableComponents.push(e3);
    }, removeRenderableComponent: function(e3) {
      this.renderableComponents.indexOf(e3) !== -1 && this.renderableComponents.splice(this.renderableComponents.indexOf(e3), 1);
    }, prepareRenderableFrame: function(e3) {
      this.checkLayerLimits(e3);
    }, checkTransparency: function() {
      this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = true, this.hide()) : this.isTransparent && (this.isTransparent = false, this.show());
    }, checkLayerLimits: function(e3) {
      this.data.ip - this.data.st <= e3 && this.data.op - this.data.st > e3 ? this.isInRange !== true && (this.globalData._mdf = true, this._mdf = true, this.isInRange = true, this.show()) : this.isInRange !== false && (this.globalData._mdf = true, this.isInRange = false, this.hide());
    }, renderRenderable: function() {
      var e3, t3 = this.renderableComponents.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.renderableComponents[e3].renderFrame(this._isFirstFrame);
    }, sourceRectAtTime: function() {
      return { top: 0, left: 0, width: 100, height: 100 };
    }, getLayerSize: function() {
      return this.data.ty === 5 ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
    } };
    var sn2 = /* @__PURE__ */ (function() {
      var e3 = { 0: `source-over`, 1: `multiply`, 2: `screen`, 3: `overlay`, 4: `darken`, 5: `lighten`, 6: `color-dodge`, 7: `color-burn`, 8: `hard-light`, 9: `soft-light`, 10: `difference`, 11: `exclusion`, 12: `hue`, 13: `saturation`, 14: `color`, 15: `luminosity` };
      return function(t3) {
        return e3[t3] || ``;
      };
    })();
    function cn2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 0, 0, n3);
    }
    function ln2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 0, 0, n3);
    }
    function un2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 1, 0, n3);
    }
    function dn2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 1, 0, n3);
    }
    function fn2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 0, 0, n3);
    }
    function pn2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 0, 0, n3);
    }
    function mn2(e3, t3, n3) {
      this.p = H2.getProp(t3, e3.v, 0, 0, n3);
    }
    function hn2() {
      this.p = {};
    }
    function gn2(e3, t3) {
      var n3 = e3.ef || [];
      this.effectElements = [];
      var r3, i3 = n3.length, a3;
      for (r3 = 0; r3 < i3; r3 += 1) a3 = new _n2(n3[r3], t3), this.effectElements.push(a3);
    }
    function _n2(e3, t3) {
      this.init(e3, t3);
    }
    u2([Ue2], _n2), _n2.prototype.getValue = _n2.prototype.iterateDynamicProperties, _n2.prototype.init = function(e3, t3) {
      this.data = e3, this.effectElements = [], this.initDynamicPropertyContainer(t3);
      var n3, r3 = this.data.ef.length, i3, a3 = this.data.ef;
      for (n3 = 0; n3 < r3; n3 += 1) {
        switch (i3 = null, a3[n3].ty) {
          case 0:
            i3 = new cn2(a3[n3], t3, this);
            break;
          case 1:
            i3 = new ln2(a3[n3], t3, this);
            break;
          case 2:
            i3 = new un2(a3[n3], t3, this);
            break;
          case 3:
            i3 = new dn2(a3[n3], t3, this);
            break;
          case 4:
          case 7:
            i3 = new mn2(a3[n3], t3, this);
            break;
          case 10:
            i3 = new fn2(a3[n3], t3, this);
            break;
          case 11:
            i3 = new pn2(a3[n3], t3, this);
            break;
          case 5:
            i3 = new gn2(a3[n3], t3, this);
            break;
          default:
            i3 = new hn2(a3[n3], t3, this);
        }
        i3 && this.effectElements.push(i3);
      }
    };
    function vn2() {
    }
    vn2.prototype = { checkMasks: function() {
      if (!this.data.hasMask) return false;
      for (var e3 = 0, t3 = this.data.masksProperties.length; e3 < t3; ) {
        if (this.data.masksProperties[e3].mode !== `n` && this.data.masksProperties[e3].cl !== false) return true;
        e3 += 1;
      }
      return false;
    }, initExpressions: function() {
      var e3 = ce2();
      if (e3) {
        var t3 = e3(`layer`), n3 = e3(`effects`), r3 = e3(`shape`), i3 = e3(`text`), a3 = e3(`comp`);
        this.layerInterface = t3(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
        var o3 = n3.createEffectsInterface(this, this.layerInterface);
        this.layerInterface.registerEffectsInterface(o3), this.data.ty === 0 || this.data.xt ? this.compInterface = a3(this) : this.data.ty === 4 ? (this.layerInterface.shapeInterface = r3(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : this.data.ty === 5 && (this.layerInterface.textInterface = i3(this), this.layerInterface.text = this.layerInterface.textInterface);
      }
    }, setBlendMode: function() {
      var e3 = sn2(this.data.bm), t3 = this.baseElement || this.layerElement;
      t3.style[`mix-blend-mode`] = e3;
    }, initBaseData: function(e3, t3, n3) {
      this.globalData = t3, this.comp = n3, this.data = e3, this.layerId = P2(), this.data.sr || (this.data.sr = 1), this.effectsManager = new gn2(this.data, this, this.dynamicProperties);
    }, getType: function() {
      return this.type;
    }, sourceRectAtTime: function() {
    } };
    function yn2() {
    }
    yn2.prototype = { initFrame: function() {
      this._isFirstFrame = false, this.dynamicProperties = [], this._mdf = false;
    }, prepareProperties: function(e3, t3) {
      var n3, r3 = this.dynamicProperties.length;
      for (n3 = 0; n3 < r3; n3 += 1) (t3 || this._isParent && this.dynamicProperties[n3].propType === `transform`) && (this.dynamicProperties[n3].getValue(), this.dynamicProperties[n3]._mdf && (this.globalData._mdf = true, this._mdf = true));
    }, addDynamicProperty: function(e3) {
      this.dynamicProperties.indexOf(e3) === -1 && this.dynamicProperties.push(e3);
    } };
    function bn2(e3, t3, n3) {
      this.initFrame(), this.initRenderable(), this.assetData = t3.getAssetData(e3.refId), this.footageData = t3.imageLoader.getAsset(this.assetData), this.initBaseData(e3, t3, n3);
    }
    bn2.prototype.prepareFrame = function() {
    }, u2([on2, vn2, yn2], bn2), bn2.prototype.getBaseElement = function() {
      return null;
    }, bn2.prototype.renderFrame = function() {
    }, bn2.prototype.destroy = function() {
    }, bn2.prototype.initExpressions = function() {
      var e3 = ce2();
      if (e3) {
        var t3 = e3(`footage`);
        this.layerInterface = t3(this);
      }
    }, bn2.prototype.getFootageData = function() {
      return this.footageData;
    };
    function xn2(e3, t3, n3) {
      this.initFrame(), this.initRenderable(), this.assetData = t3.getAssetData(e3.refId), this.initBaseData(e3, t3, n3), this._isPlaying = false, this._canPlay = false;
      var r3 = this.globalData.getAssetsPath(this.assetData);
      this.audio = this.globalData.audioController.createAudio(r3), this._currentTime = 0, this.globalData.audioController.addAudio(this), this._volumeMultiplier = 1, this._volume = 1, this._previousVolume = null, this.tm = e3.tm ? H2.getProp(this, e3.tm, 0, t3.frameRate, this) : { _placeholder: true }, this.lv = H2.getProp(this, e3.au && e3.au.lv ? e3.au.lv : { k: [100] }, 1, 0.01, this);
    }
    xn2.prototype.prepareFrame = function(e3) {
      if (this.prepareRenderableFrame(e3, true), this.prepareProperties(e3, true), this.tm._placeholder) this._currentTime = e3 / this.data.sr;
      else {
        var t3 = this.tm.v;
        this._currentTime = t3;
      }
      this._volume = this.lv.v[0];
      var n3 = this._volume * this._volumeMultiplier;
      this._previousVolume !== n3 && (this._previousVolume = n3, this.audio.volume(n3));
    }, u2([on2, vn2, yn2], xn2), xn2.prototype.renderFrame = function() {
      this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(), this.audio.seek(this._currentTime / this.globalData.frameRate), this._isPlaying = true));
    }, xn2.prototype.show = function() {
    }, xn2.prototype.hide = function() {
      this.audio.pause(), this._isPlaying = false;
    }, xn2.prototype.pause = function() {
      this.audio.pause(), this._isPlaying = false, this._canPlay = false;
    }, xn2.prototype.resume = function() {
      this._canPlay = true;
    }, xn2.prototype.setRate = function(e3) {
      this.audio.rate(e3);
    }, xn2.prototype.volume = function(e3) {
      this._volumeMultiplier = e3, this._previousVolume = e3 * this._volume, this.audio.volume(this._previousVolume);
    }, xn2.prototype.getBaseElement = function() {
      return null;
    }, xn2.prototype.destroy = function() {
    }, xn2.prototype.sourceRectAtTime = function() {
    }, xn2.prototype.initExpressions = function() {
    };
    function Sn2() {
    }
    Sn2.prototype.checkLayers = function(e3) {
      var t3, n3 = this.layers.length, r3;
      for (this.completeLayers = true, t3 = n3 - 1; t3 >= 0; --t3) this.elements[t3] || (r3 = this.layers[t3], r3.ip - r3.st <= e3 - this.layers[t3].st && r3.op - r3.st > e3 - this.layers[t3].st && this.buildItem(t3)), this.completeLayers = this.elements[t3] ? this.completeLayers : false;
      this.checkPendingElements();
    }, Sn2.prototype.createItem = function(e3) {
      switch (e3.ty) {
        case 2:
          return this.createImage(e3);
        case 0:
          return this.createComp(e3);
        case 1:
          return this.createSolid(e3);
        case 3:
          return this.createNull(e3);
        case 4:
          return this.createShape(e3);
        case 5:
          return this.createText(e3);
        case 6:
          return this.createAudio(e3);
        case 13:
          return this.createCamera(e3);
        case 15:
          return this.createFootage(e3);
        default:
          return this.createNull(e3);
      }
    }, Sn2.prototype.createCamera = function() {
      throw Error(`You're using a 3d camera. Try the html renderer.`);
    }, Sn2.prototype.createAudio = function(e3) {
      return new xn2(e3, this.globalData, this);
    }, Sn2.prototype.createFootage = function(e3) {
      return new bn2(e3, this.globalData, this);
    }, Sn2.prototype.buildAllItems = function() {
      var e3, t3 = this.layers.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.buildItem(e3);
      this.checkPendingElements();
    }, Sn2.prototype.includeLayers = function(e3) {
      this.completeLayers = false;
      var t3, n3 = e3.length, r3, i3 = this.layers.length;
      for (t3 = 0; t3 < n3; t3 += 1) for (r3 = 0; r3 < i3; ) {
        if (this.layers[r3].id === e3[t3].id) {
          this.layers[r3] = e3[t3];
          break;
        }
        r3 += 1;
      }
    }, Sn2.prototype.setProjectInterface = function(e3) {
      this.globalData.projectInterface = e3;
    }, Sn2.prototype.initItems = function() {
      this.globalData.progressiveLoad || this.buildAllItems();
    }, Sn2.prototype.buildElementParenting = function(e3, t3, n3) {
      for (var r3 = this.elements, i3 = this.layers, a3 = 0, o3 = i3.length; a3 < o3; ) i3[a3].ind == t3 && (!r3[a3] || r3[a3] === true ? (this.buildItem(a3), this.addPendingElement(e3)) : (n3.push(r3[a3]), r3[a3].setAsParent(), i3[a3].parent === void 0 ? e3.setHierarchy(n3) : this.buildElementParenting(e3, i3[a3].parent, n3))), a3 += 1;
    }, Sn2.prototype.addPendingElement = function(e3) {
      this.pendingElements.push(e3);
    }, Sn2.prototype.searchExtraCompositions = function(e3) {
      var t3, n3 = e3.length;
      for (t3 = 0; t3 < n3; t3 += 1) if (e3[t3].xt) {
        var r3 = this.createComp(e3[t3]);
        r3.initExpressions(), this.globalData.projectInterface.registerComposition(r3);
      }
    }, Sn2.prototype.getElementById = function(e3) {
      var t3, n3 = this.elements.length;
      for (t3 = 0; t3 < n3; t3 += 1) if (this.elements[t3].data.ind === e3) return this.elements[t3];
      return null;
    }, Sn2.prototype.getElementByPath = function(e3) {
      var t3 = e3.shift(), n3;
      if (typeof t3 == `number`) n3 = this.elements[t3];
      else {
        var r3, i3 = this.elements.length;
        for (r3 = 0; r3 < i3; r3 += 1) if (this.elements[r3].data.nm === t3) {
          n3 = this.elements[r3];
          break;
        }
      }
      return e3.length === 0 ? n3 : n3.getElementByPath(e3);
    }, Sn2.prototype.setupGlobalData = function(e3, t3) {
      this.globalData.fontManager = new nn2(), this.globalData.slotManager = an2(e3), this.globalData.fontManager.addChars(e3.chars), this.globalData.fontManager.addFonts(e3.fonts, t3), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = e3.fr, this.globalData.nm = e3.nm, this.globalData.compSize = { w: e3.w, h: e3.h };
    };
    var Cn2 = { TRANSFORM_EFFECT: `transformEFfect` };
    function wn2() {
    }
    wn2.prototype = { initTransform: function() {
      var e3 = new Xe2();
      this.finalTransform = { mProp: this.data.ks ? bt2.getTransformProperty(this, this.data.ks, this) : { o: 0 }, _matMdf: false, _localMatMdf: false, _opMdf: false, mat: e3, localMat: e3, localOpacity: 1 }, this.data.ao && (this.finalTransform.mProp.autoOriented = true), this.data.ty;
    }, renderTransform: function() {
      if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
        var e3, t3 = this.finalTransform.mat, n3 = 0, r3 = this.hierarchy.length;
        if (!this.finalTransform._matMdf) for (; n3 < r3; ) {
          if (this.hierarchy[n3].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = true;
            break;
          }
          n3 += 1;
        }
        if (this.finalTransform._matMdf) for (e3 = this.finalTransform.mProp.v.props, t3.cloneFromProps(e3), n3 = 0; n3 < r3; n3 += 1) t3.multiply(this.hierarchy[n3].finalTransform.mProp.v);
      }
      (!this.localTransforms || this.finalTransform._matMdf) && (this.finalTransform._localMatMdf = this.finalTransform._matMdf), this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v);
    }, renderLocalTransform: function() {
      if (this.localTransforms) {
        var e3 = 0, t3 = this.localTransforms.length;
        if (this.finalTransform._localMatMdf = this.finalTransform._matMdf, !this.finalTransform._localMatMdf || !this.finalTransform._opMdf) for (; e3 < t3; ) this.localTransforms[e3]._mdf && (this.finalTransform._localMatMdf = true), this.localTransforms[e3]._opMdf && !this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v, this.finalTransform._opMdf = true), e3 += 1;
        if (this.finalTransform._localMatMdf) {
          var n3 = this.finalTransform.localMat;
          for (this.localTransforms[0].matrix.clone(n3), e3 = 1; e3 < t3; e3 += 1) {
            var r3 = this.localTransforms[e3].matrix;
            n3.multiply(r3);
          }
          n3.multiply(this.finalTransform.mat);
        }
        if (this.finalTransform._opMdf) {
          var i3 = this.finalTransform.localOpacity;
          for (e3 = 0; e3 < t3; e3 += 1) i3 *= this.localTransforms[e3].opacity * 0.01;
          this.finalTransform.localOpacity = i3;
        }
      }
    }, searchEffectTransforms: function() {
      if (this.renderableEffectsManager) {
        var e3 = this.renderableEffectsManager.getEffects(Cn2.TRANSFORM_EFFECT);
        if (e3.length) {
          this.localTransforms = [], this.finalTransform.localMat = new Xe2();
          var t3 = 0, n3 = e3.length;
          for (t3 = 0; t3 < n3; t3 += 1) this.localTransforms.push(e3[t3]);
        }
      }
    }, globalToLocal: function(e3) {
      var t3 = [];
      t3.push(this.finalTransform);
      for (var n3 = true, r3 = this.comp; n3; ) r3.finalTransform ? (r3.data.hasMask && t3.splice(0, 0, r3.finalTransform), r3 = r3.comp) : n3 = false;
      var i3, a3 = t3.length, o3;
      for (i3 = 0; i3 < a3; i3 += 1) o3 = t3[i3].mat.applyToPointArray(0, 0, 0), e3 = [e3[0] - o3[0], e3[1] - o3[1], 0];
      return e3;
    }, mHelper: new Xe2() };
    function Tn2(e3, t3, n3) {
      this.data = e3, this.element = t3, this.globalData = n3, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
      var r3 = this.globalData.defs, i3, a3 = this.masksProperties ? this.masksProperties.length : 0;
      this.viewData = m2(a3), this.solidPath = ``;
      var o3, s3 = this.masksProperties, l3 = 0, u3 = [], d3, f3, p3 = P2(), h3, g3, _3, v3, y3 = `clipPath`, b3 = `clip-path`;
      for (i3 = 0; i3 < a3; i3 += 1) if ((s3[i3].mode !== `a` && s3[i3].mode !== `n` || s3[i3].inv || s3[i3].o.k !== 100 || s3[i3].o.x) && (y3 = `mask`, b3 = `mask`), (s3[i3].mode === `s` || s3[i3].mode === `i`) && l3 === 0 ? (h3 = R2(`rect`), h3.setAttribute(`fill`, `#ffffff`), h3.setAttribute(`width`, this.element.comp.data.w || 0), h3.setAttribute(`height`, this.element.comp.data.h || 0), u3.push(h3)) : h3 = null, o3 = R2(`path`), s3[i3].mode === `n`) this.viewData[i3] = { op: H2.getProp(this.element, s3[i3].o, 0, 0.01, this.element), prop: Ye2.getShapeProp(this.element, s3[i3], 3), elem: o3, lastPath: `` }, r3.appendChild(o3);
      else {
        l3 += 1, o3.setAttribute(`fill`, s3[i3].mode === `s` ? `#000000` : `#ffffff`), o3.setAttribute(`clip-rule`, `nonzero`);
        var x3;
        if (s3[i3].x.k === 0 ? (_3 = null, v3 = null) : (y3 = `mask`, b3 = `mask`, v3 = H2.getProp(this.element, s3[i3].x, 0, null, this.element), x3 = P2(), g3 = R2(`filter`), g3.setAttribute(`id`, x3), _3 = R2(`feMorphology`), _3.setAttribute(`operator`, `erode`), _3.setAttribute(`in`, `SourceGraphic`), _3.setAttribute(`radius`, `0`), g3.appendChild(_3), r3.appendChild(g3), o3.setAttribute(`stroke`, s3[i3].mode === `s` ? `#000000` : `#ffffff`)), this.storedData[i3] = { elem: o3, x: v3, expan: _3, lastPath: ``, lastOperator: ``, filterId: x3, lastRadius: 0 }, s3[i3].mode === `i`) {
          f3 = u3.length;
          var S3 = R2(`g`);
          for (d3 = 0; d3 < f3; d3 += 1) S3.appendChild(u3[d3]);
          var C3 = R2(`mask`);
          C3.setAttribute(`mask-type`, `alpha`), C3.setAttribute(`id`, p3 + `_` + l3), C3.appendChild(o3), r3.appendChild(C3), S3.setAttribute(`mask`, `url(` + c2() + `#` + p3 + `_` + l3 + `)`), u3.length = 0, u3.push(S3);
        } else u3.push(o3);
        s3[i3].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i3] = { elem: o3, lastPath: ``, op: H2.getProp(this.element, s3[i3].o, 0, 0.01, this.element), prop: Ye2.getShapeProp(this.element, s3[i3], 3), invRect: h3 }, this.viewData[i3].prop.k || this.drawPath(s3[i3], this.viewData[i3].prop.v, this.viewData[i3]);
      }
      for (this.maskElement = R2(y3), a3 = u3.length, i3 = 0; i3 < a3; i3 += 1) this.maskElement.appendChild(u3[i3]);
      l3 > 0 && (this.maskElement.setAttribute(`id`, p3), this.element.maskedElement.setAttribute(b3, `url(` + c2() + `#` + p3 + `)`), r3.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
    }
    Tn2.prototype.getMaskProperty = function(e3) {
      return this.viewData[e3].prop;
    }, Tn2.prototype.renderFrame = function(e3) {
      var t3 = this.element.finalTransform.mat, n3, r3 = this.masksProperties.length;
      for (n3 = 0; n3 < r3; n3 += 1) if ((this.viewData[n3].prop._mdf || e3) && this.drawPath(this.masksProperties[n3], this.viewData[n3].prop.v, this.viewData[n3]), (this.viewData[n3].op._mdf || e3) && this.viewData[n3].elem.setAttribute(`fill-opacity`, this.viewData[n3].op.v), this.masksProperties[n3].mode !== `n` && (this.viewData[n3].invRect && (this.element.finalTransform.mProp._mdf || e3) && this.viewData[n3].invRect.setAttribute(`transform`, t3.getInverseMatrix().to2dCSS()), this.storedData[n3].x && (this.storedData[n3].x._mdf || e3))) {
        var i3 = this.storedData[n3].expan;
        this.storedData[n3].x.v < 0 ? (this.storedData[n3].lastOperator !== `erode` && (this.storedData[n3].lastOperator = `erode`, this.storedData[n3].elem.setAttribute(`filter`, `url(` + c2() + `#` + this.storedData[n3].filterId + `)`)), i3.setAttribute(`radius`, -this.storedData[n3].x.v)) : (this.storedData[n3].lastOperator !== `dilate` && (this.storedData[n3].lastOperator = `dilate`, this.storedData[n3].elem.setAttribute(`filter`, null)), this.storedData[n3].elem.setAttribute(`stroke-width`, this.storedData[n3].x.v * 2));
      }
    }, Tn2.prototype.getMaskelement = function() {
      return this.maskElement;
    }, Tn2.prototype.createLayerSolidPath = function() {
      var e3 = `M0,0 `;
      return e3 += ` h` + this.globalData.compSize.w, e3 += ` v` + this.globalData.compSize.h, e3 += ` h-` + this.globalData.compSize.w, e3 += ` v-` + this.globalData.compSize.h + ` `, e3;
    }, Tn2.prototype.drawPath = function(e3, t3, n3) {
      var r3 = ` M` + t3.v[0][0] + `,` + t3.v[0][1], i3, a3 = t3._length;
      for (i3 = 1; i3 < a3; i3 += 1) r3 += ` C` + t3.o[i3 - 1][0] + `,` + t3.o[i3 - 1][1] + ` ` + t3.i[i3][0] + `,` + t3.i[i3][1] + ` ` + t3.v[i3][0] + `,` + t3.v[i3][1];
      if (t3.c && a3 > 1 && (r3 += ` C` + t3.o[i3 - 1][0] + `,` + t3.o[i3 - 1][1] + ` ` + t3.i[0][0] + `,` + t3.i[0][1] + ` ` + t3.v[0][0] + `,` + t3.v[0][1]), n3.lastPath !== r3) {
        var o3 = ``;
        n3.elem && (t3.c && (o3 = e3.inv ? this.solidPath + r3 : r3), n3.elem.setAttribute(`d`, o3)), n3.lastPath = r3;
      }
    }, Tn2.prototype.destroy = function() {
      this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
    };
    var En2 = (function() {
      var e3 = {};
      e3.createFilter = t3, e3.createAlphaToLuminanceFilter = n3;
      function t3(e4, t4) {
        var n4 = R2(`filter`);
        return n4.setAttribute(`id`, e4), t4 !== true && (n4.setAttribute(`filterUnits`, `objectBoundingBox`), n4.setAttribute(`x`, `0%`), n4.setAttribute(`y`, `0%`), n4.setAttribute(`width`, `100%`), n4.setAttribute(`height`, `100%`)), n4;
      }
      function n3() {
        var e4 = R2(`feColorMatrix`);
        return e4.setAttribute(`type`, `matrix`), e4.setAttribute(`color-interpolation-filters`, `sRGB`), e4.setAttribute(`values`, `0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1`), e4;
      }
      return e3;
    })(), Dn2 = (function() {
      var e3 = { maskType: true, svgLumaHidden: true, offscreenCanvas: typeof OffscreenCanvas < `u` };
      return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (e3.maskType = false), /firefox/i.test(navigator.userAgent) && (e3.svgLumaHidden = false), e3;
    })(), On2 = {}, kn2 = `filter_result_`;
    function An2(e3) {
      var t3, n3 = `SourceGraphic`, r3 = e3.data.ef ? e3.data.ef.length : 0, i3 = P2(), a3 = En2.createFilter(i3, true), o3 = 0;
      this.filters = [];
      var s3;
      for (t3 = 0; t3 < r3; t3 += 1) {
        s3 = null;
        var l3 = e3.data.ef[t3].ty;
        if (On2[l3]) {
          var u3 = On2[l3].effect;
          s3 = new u3(a3, e3.effectsManager.effectElements[t3], e3, kn2 + o3, n3), n3 = kn2 + o3, On2[l3].countsAsEffect && (o3 += 1);
        }
        s3 && this.filters.push(s3);
      }
      o3 && (e3.globalData.defs.appendChild(a3), e3.layerElement.setAttribute(`filter`, `url(` + c2() + `#` + i3 + `)`)), this.filters.length && e3.addRenderableComponent(this);
    }
    An2.prototype.renderFrame = function(e3) {
      var t3, n3 = this.filters.length;
      for (t3 = 0; t3 < n3; t3 += 1) this.filters[t3].renderFrame(e3);
    }, An2.prototype.getEffects = function(e3) {
      var t3, n3 = this.filters.length, r3 = [];
      for (t3 = 0; t3 < n3; t3 += 1) this.filters[t3].type === e3 && r3.push(this.filters[t3]);
      return r3;
    };
    function jn2() {
    }
    jn2.prototype = { initRendererElement: function() {
      this.layerElement = R2(`g`);
    }, createContainerElements: function() {
      this.matteElement = R2(`g`), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = false;
      var e3 = null;
      if (this.data.td) {
        this.matteMasks = {};
        var t3 = R2(`g`);
        t3.setAttribute(`id`, this.layerId), t3.appendChild(this.layerElement), e3 = t3, this.globalData.defs.appendChild(t3);
      } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), e3 = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
      if (this.data.ln && this.layerElement.setAttribute(`id`, this.data.ln), this.data.cl && this.layerElement.setAttribute(`class`, this.data.cl), this.data.ty === 0 && !this.data.hd) {
        var n3 = R2(`clipPath`), r3 = R2(`path`);
        r3.setAttribute(`d`, `M0,0 L` + this.data.w + `,0 L` + this.data.w + `,` + this.data.h + ` L0,` + this.data.h + `z`);
        var i3 = P2();
        if (n3.setAttribute(`id`, i3), n3.appendChild(r3), this.globalData.defs.appendChild(n3), this.checkMasks()) {
          var a3 = R2(`g`);
          a3.setAttribute(`clip-path`, `url(` + c2() + `#` + i3 + `)`), a3.appendChild(this.layerElement), this.transformedElement = a3, e3 ? e3.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
        } else this.layerElement.setAttribute(`clip-path`, `url(` + c2() + `#` + i3 + `)`);
      }
      this.data.bm !== 0 && this.setBlendMode();
    }, renderElement: function() {
      this.finalTransform._localMatMdf && this.transformedElement.setAttribute(`transform`, this.finalTransform.localMat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute(`opacity`, this.finalTransform.localOpacity);
    }, destroyBaseElement: function() {
      this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
    }, getBaseElement: function() {
      return this.data.hd ? null : this.baseElement;
    }, createRenderableComponents: function() {
      this.maskManager = new Tn2(this.data, this, this.globalData), this.renderableEffectsManager = new An2(this), this.searchEffectTransforms();
    }, getMatte: function(e3) {
      if (this.matteMasks ||= {}, !this.matteMasks[e3]) {
        var t3 = this.layerId + `_` + e3, n3, r3, i3, a3;
        if (e3 === 1 || e3 === 3) {
          var o3 = R2(`mask`);
          o3.setAttribute(`id`, t3), o3.setAttribute(`mask-type`, e3 === 3 ? `luminance` : `alpha`), i3 = R2(`use`), i3.setAttributeNS(`http://www.w3.org/1999/xlink`, `href`, `#` + this.layerId), o3.appendChild(i3), this.globalData.defs.appendChild(o3), !Dn2.maskType && e3 === 1 && (o3.setAttribute(`mask-type`, `luminance`), n3 = P2(), r3 = En2.createFilter(n3), this.globalData.defs.appendChild(r3), r3.appendChild(En2.createAlphaToLuminanceFilter()), a3 = R2(`g`), a3.appendChild(i3), o3.appendChild(a3), a3.setAttribute(`filter`, `url(` + c2() + `#` + n3 + `)`));
        } else if (e3 === 2) {
          var s3 = R2(`mask`);
          s3.setAttribute(`id`, t3), s3.setAttribute(`mask-type`, `alpha`);
          var l3 = R2(`g`);
          s3.appendChild(l3), n3 = P2(), r3 = En2.createFilter(n3);
          var u3 = R2(`feComponentTransfer`);
          u3.setAttribute(`in`, `SourceGraphic`), r3.appendChild(u3);
          var d3 = R2(`feFuncA`);
          d3.setAttribute(`type`, `table`), d3.setAttribute(`tableValues`, `1.0 0.0`), u3.appendChild(d3), this.globalData.defs.appendChild(r3);
          var f3 = R2(`rect`);
          f3.setAttribute(`width`, this.comp.data.w), f3.setAttribute(`height`, this.comp.data.h), f3.setAttribute(`x`, `0`), f3.setAttribute(`y`, `0`), f3.setAttribute(`fill`, `#ffffff`), f3.setAttribute(`opacity`, `0`), l3.setAttribute(`filter`, `url(` + c2() + `#` + n3 + `)`), l3.appendChild(f3), i3 = R2(`use`), i3.setAttributeNS(`http://www.w3.org/1999/xlink`, `href`, `#` + this.layerId), l3.appendChild(i3), Dn2.maskType || (s3.setAttribute(`mask-type`, `luminance`), r3.appendChild(En2.createAlphaToLuminanceFilter()), a3 = R2(`g`), l3.appendChild(f3), a3.appendChild(this.layerElement), l3.appendChild(a3)), this.globalData.defs.appendChild(s3);
        }
        this.matteMasks[e3] = t3;
      }
      return this.matteMasks[e3];
    }, setMatte: function(e3) {
      this.matteElement && this.matteElement.setAttribute(`mask`, `url(` + c2() + `#` + e3 + `)`);
    } };
    function Mn2() {
    }
    Mn2.prototype = { initHierarchy: function() {
      this.hierarchy = [], this._isParent = false, this.checkParenting();
    }, setHierarchy: function(e3) {
      this.hierarchy = e3;
    }, setAsParent: function() {
      this._isParent = true;
    }, checkParenting: function() {
      this.data.parent !== void 0 && this.comp.buildElementParenting(this, this.data.parent, []);
    } };
    function Nn2() {
    }
    (function() {
      u2([on2, d2({ initElement: function(e3, t3, n3) {
        this.initFrame(), this.initBaseData(e3, t3, n3), this.initTransform(e3, t3, n3), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
      }, hide: function() {
        if (!this.hidden && (!this.isInRange || this.isTransparent)) {
          var e3 = this.baseElement || this.layerElement;
          e3.style.display = `none`, this.hidden = true;
        }
      }, show: function() {
        if (this.isInRange && !this.isTransparent) {
          if (!this.data.hd) {
            var e3 = this.baseElement || this.layerElement;
            e3.style.display = `block`;
          }
          this.hidden = false, this._isFirstFrame = true;
        }
      }, renderFrame: function() {
        this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderLocalTransform(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame &&= false);
      }, renderInnerContent: function() {
      }, prepareFrame: function(e3) {
        this._mdf = false, this.prepareRenderableFrame(e3), this.prepareProperties(e3, this.isInRange), this.checkTransparency();
      }, destroy: function() {
        this.innerElem = null, this.destroyBaseElement();
      } })], Nn2);
    })();
    function Pn2(e3, t3, n3) {
      this.assetData = t3.getAssetData(e3.refId), this.assetData && this.assetData.sid && (this.assetData = t3.slotManager.getProp(this.assetData)), this.initElement(e3, t3, n3), this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h };
    }
    u2([vn2, wn2, jn2, Mn2, yn2, Nn2], Pn2), Pn2.prototype.createContent = function() {
      var e3 = this.globalData.getAssetsPath(this.assetData);
      this.innerElem = R2(`image`), this.innerElem.setAttribute(`width`, this.assetData.w + `px`), this.innerElem.setAttribute(`height`, this.assetData.h + `px`), this.innerElem.setAttribute(`preserveAspectRatio`, this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS(`http://www.w3.org/1999/xlink`, `href`, e3), this.layerElement.appendChild(this.innerElem);
    }, Pn2.prototype.sourceRectAtTime = function() {
      return this.sourceRect;
    };
    function Fn2(e3, t3) {
      this.elem = e3, this.pos = t3;
    }
    function In2() {
    }
    In2.prototype = { addShapeToModifiers: function(e3) {
      var t3, n3 = this.shapeModifiers.length;
      for (t3 = 0; t3 < n3; t3 += 1) this.shapeModifiers[t3].addShape(e3);
    }, isShapeInAnimatedModifiers: function(e3) {
      for (var t3 = 0, n3 = this.shapeModifiers.length; t3 < n3; ) if (this.shapeModifiers[t3].isAnimatedWithShape(e3)) return true;
      return false;
    }, renderModifiers: function() {
      if (this.shapeModifiers.length) {
        var e3, t3 = this.shapes.length;
        for (e3 = 0; e3 < t3; e3 += 1) this.shapes[e3].sh.reset();
        t3 = this.shapeModifiers.length;
        var n3;
        for (e3 = t3 - 1; e3 >= 0 && (n3 = this.shapeModifiers[e3].processShapes(this._isFirstFrame), !n3); --e3) ;
      }
    }, searchProcessedElement: function(e3) {
      for (var t3 = this.processedElements, n3 = 0, r3 = t3.length; n3 < r3; ) {
        if (t3[n3].elem === e3) return t3[n3].pos;
        n3 += 1;
      }
      return 0;
    }, addProcessedElement: function(e3, t3) {
      for (var n3 = this.processedElements, r3 = n3.length; r3; ) if (--r3, n3[r3].elem === e3) {
        n3[r3].pos = t3;
        return;
      }
      n3.push(new Fn2(e3, t3));
    }, prepareFrame: function(e3) {
      this.prepareRenderableFrame(e3), this.prepareProperties(e3, this.isInRange);
    } };
    var Ln2 = { 1: `butt`, 2: `round`, 3: `square` }, Rn2 = { 1: `miter`, 2: `round`, 3: `bevel` };
    function zn2(e3, t3, n3) {
      this.caches = [], this.styles = [], this.transformers = e3, this.lStr = ``, this.sh = n3, this.lvl = t3, this._isAnimated = !!n3.k;
      for (var r3 = 0, i3 = e3.length; r3 < i3; ) {
        if (e3[r3].mProps.dynamicProperties.length) {
          this._isAnimated = true;
          break;
        }
        r3 += 1;
      }
    }
    zn2.prototype.setAsAnimated = function() {
      this._isAnimated = true;
    };
    function Bn2(e3, t3) {
      this.data = e3, this.type = e3.ty, this.d = ``, this.lvl = t3, this._mdf = false, this.closed = e3.hd === true, this.pElem = R2(`path`), this.msElem = null;
    }
    Bn2.prototype.reset = function() {
      this.d = ``, this._mdf = false;
    };
    function Vn2(e3, t3, n3, r3) {
      this.elem = e3, this.frameId = -1, this.dataProps = m2(t3.length), this.renderer = n3, this.k = false, this.dashStr = ``, this.dashArray = p2(`float32`, t3.length ? t3.length - 1 : 0), this.dashoffset = p2(`float32`, 1), this.initDynamicPropertyContainer(r3);
      var i3, a3 = t3.length || 0, o3;
      for (i3 = 0; i3 < a3; i3 += 1) o3 = H2.getProp(e3, t3[i3].v, 0, 0, this), this.k = o3.k || this.k, this.dataProps[i3] = { n: t3[i3].n, p: o3 };
      this.k || this.getValue(true), this._isAnimated = this.k;
    }
    Vn2.prototype.getValue = function(e3) {
      if (!(this.elem.globalData.frameId === this.frameId && !e3) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || e3, this._mdf)) {
        var t3 = 0, n3 = this.dataProps.length;
        for (this.renderer === `svg` && (this.dashStr = ``), t3 = 0; t3 < n3; t3 += 1) this.dataProps[t3].n === `o` ? this.dashoffset[0] = this.dataProps[t3].p.v : this.renderer === `svg` ? this.dashStr += ` ` + this.dataProps[t3].p.v : this.dashArray[t3] = this.dataProps[t3].p.v;
      }
    }, u2([Ue2], Vn2);
    function Hn2(e3, t3, n3) {
      this.initDynamicPropertyContainer(e3), this.getValue = this.iterateDynamicProperties, this.o = H2.getProp(e3, t3.o, 0, 0.01, this), this.w = H2.getProp(e3, t3.w, 0, null, this), this.d = new Vn2(e3, t3.d || {}, `svg`, this), this.c = H2.getProp(e3, t3.c, 1, 255, this), this.style = n3, this._isAnimated = !!this._isAnimated;
    }
    u2([Ue2], Hn2);
    function Un2(e3, t3, n3) {
      this.initDynamicPropertyContainer(e3), this.getValue = this.iterateDynamicProperties, this.o = H2.getProp(e3, t3.o, 0, 0.01, this), this.c = H2.getProp(e3, t3.c, 1, 255, this), this.style = n3;
    }
    u2([Ue2], Un2);
    function Wn2(e3, t3, n3) {
      this.initDynamicPropertyContainer(e3), this.getValue = this.iterateDynamicProperties, this.style = n3;
    }
    u2([Ue2], Wn2);
    function Gn2(e3, t3, n3) {
      this.data = t3, this.c = p2(`uint8c`, t3.p * 4);
      var r3 = t3.k.k[0].s ? t3.k.k[0].s.length - t3.p * 4 : t3.k.k.length - t3.p * 4;
      this.o = p2(`float32`, r3), this._cmdf = false, this._omdf = false, this._collapsable = this.checkCollapsable(), this._hasOpacity = r3, this.initDynamicPropertyContainer(n3), this.prop = H2.getProp(e3, t3.k, 1, null, this), this.k = this.prop.k, this.getValue(true);
    }
    Gn2.prototype.comparePoints = function(e3, t3) {
      for (var n3 = 0, r3 = this.o.length / 2, i3; n3 < r3; ) {
        if (i3 = Math.abs(e3[n3 * 4] - e3[t3 * 4 + n3 * 2]), i3 > 0.01) return false;
        n3 += 1;
      }
      return true;
    }, Gn2.prototype.checkCollapsable = function() {
      if (this.o.length / 2 != this.c.length / 4) return false;
      if (this.data.k.k[0].s) for (var e3 = 0, t3 = this.data.k.k.length; e3 < t3; ) {
        if (!this.comparePoints(this.data.k.k[e3].s, this.data.p)) return false;
        e3 += 1;
      }
      else if (!this.comparePoints(this.data.k.k, this.data.p)) return false;
      return true;
    }, Gn2.prototype.getValue = function(e3) {
      if (this.prop.getValue(), this._mdf = false, this._cmdf = false, this._omdf = false, this.prop._mdf || e3) {
        var t3, n3 = this.data.p * 4, r3, i3;
        for (t3 = 0; t3 < n3; t3 += 1) r3 = t3 % 4 == 0 ? 100 : 255, i3 = Math.round(this.prop.v[t3] * r3), this.c[t3] !== i3 && (this.c[t3] = i3, this._cmdf = !e3);
        if (this.o.length) for (n3 = this.prop.v.length, t3 = this.data.p * 4; t3 < n3; t3 += 1) r3 = t3 % 2 == 0 ? 100 : 1, i3 = t3 % 2 == 0 ? Math.round(this.prop.v[t3] * 100) : this.prop.v[t3], this.o[t3 - this.data.p * 4] !== i3 && (this.o[t3 - this.data.p * 4] = i3, this._omdf = !e3);
        this._mdf = !e3;
      }
    }, u2([Ue2], Gn2);
    function Kn2(e3, t3, n3) {
      this.initDynamicPropertyContainer(e3), this.getValue = this.iterateDynamicProperties, this.initGradientData(e3, t3, n3);
    }
    Kn2.prototype.initGradientData = function(e3, t3, n3) {
      this.o = H2.getProp(e3, t3.o, 0, 0.01, this), this.s = H2.getProp(e3, t3.s, 1, null, this), this.e = H2.getProp(e3, t3.e, 1, null, this), this.h = H2.getProp(e3, t3.h || { k: 0 }, 0, 0.01, this), this.a = H2.getProp(e3, t3.a || { k: 0 }, 0, D2, this), this.g = new Gn2(e3, t3.g, this), this.style = n3, this.stops = [], this.setGradientData(n3.pElem, t3), this.setGradientOpacity(t3, n3), this._isAnimated = !!this._isAnimated;
    }, Kn2.prototype.setGradientData = function(e3, t3) {
      var n3 = P2(), r3 = R2(t3.t === 1 ? `linearGradient` : `radialGradient`);
      r3.setAttribute(`id`, n3), r3.setAttribute(`spreadMethod`, `pad`), r3.setAttribute(`gradientUnits`, `userSpaceOnUse`);
      var i3 = [], a3, o3, s3 = t3.g.p * 4;
      for (o3 = 0; o3 < s3; o3 += 4) a3 = R2(`stop`), r3.appendChild(a3), i3.push(a3);
      e3.setAttribute(t3.ty === `gf` ? `fill` : `stroke`, `url(` + c2() + `#` + n3 + `)`), this.gf = r3, this.cst = i3;
    }, Kn2.prototype.setGradientOpacity = function(e3, t3) {
      if (this.g._hasOpacity && !this.g._collapsable) {
        var n3, r3, i3, a3 = R2(`mask`), o3 = R2(`path`);
        a3.appendChild(o3);
        var s3 = P2(), l3 = P2();
        a3.setAttribute(`id`, l3);
        var u3 = R2(e3.t === 1 ? `linearGradient` : `radialGradient`);
        u3.setAttribute(`id`, s3), u3.setAttribute(`spreadMethod`, `pad`), u3.setAttribute(`gradientUnits`, `userSpaceOnUse`), i3 = e3.g.k.k[0].s ? e3.g.k.k[0].s.length : e3.g.k.k.length;
        var d3 = this.stops;
        for (r3 = e3.g.p * 4; r3 < i3; r3 += 2) n3 = R2(`stop`), n3.setAttribute(`stop-color`, `rgb(255,255,255)`), u3.appendChild(n3), d3.push(n3);
        o3.setAttribute(e3.ty === `gf` ? `fill` : `stroke`, `url(` + c2() + `#` + s3 + `)`), e3.ty === `gs` && (o3.setAttribute(`stroke-linecap`, Ln2[e3.lc || 2]), o3.setAttribute(`stroke-linejoin`, Rn2[e3.lj || 2]), e3.lj === 1 && o3.setAttribute(`stroke-miterlimit`, e3.ml)), this.of = u3, this.ms = a3, this.ost = d3, this.maskId = l3, t3.msElem = o3;
      }
    }, u2([Ue2], Kn2);
    function qn2(e3, t3, n3) {
      this.initDynamicPropertyContainer(e3), this.getValue = this.iterateDynamicProperties, this.w = H2.getProp(e3, t3.w, 0, null, this), this.d = new Vn2(e3, t3.d || {}, `svg`, this), this.initGradientData(e3, t3, n3), this._isAnimated = !!this._isAnimated;
    }
    u2([Kn2, Ue2], qn2);
    function Jn2() {
      this.it = [], this.prevViewData = [], this.gr = R2(`g`);
    }
    function Yn2(e3, t3, n3) {
      this.transform = { mProps: e3, op: t3, container: n3 }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
    }
    var Xn2 = function(e3, t3, n3, r3) {
      if (t3 === 0) return ``;
      var i3 = e3.o, a3 = e3.i, o3 = e3.v, s3, c3 = ` M` + r3.applyToPointStringified(o3[0][0], o3[0][1]);
      for (s3 = 1; s3 < t3; s3 += 1) c3 += ` C` + r3.applyToPointStringified(i3[s3 - 1][0], i3[s3 - 1][1]) + ` ` + r3.applyToPointStringified(a3[s3][0], a3[s3][1]) + ` ` + r3.applyToPointStringified(o3[s3][0], o3[s3][1]);
      return n3 && t3 && (c3 += ` C` + r3.applyToPointStringified(i3[s3 - 1][0], i3[s3 - 1][1]) + ` ` + r3.applyToPointStringified(a3[0][0], a3[0][1]) + ` ` + r3.applyToPointStringified(o3[0][0], o3[0][1]), c3 += `z`), c3;
    }, Zn2 = (function() {
      var e3 = new Xe2(), t3 = new Xe2(), n3 = { createRenderFunction: r3 };
      function r3(e4) {
        switch (e4.ty) {
          case `fl`:
            return s3;
          case `gf`:
            return l3;
          case `gs`:
            return c3;
          case `st`:
            return u3;
          case `sh`:
          case `el`:
          case `rc`:
          case `sr`:
            return o3;
          case `tr`:
            return i3;
          case `no`:
            return a3;
          default:
            return null;
        }
      }
      function i3(e4, t4, n4) {
        (n4 || t4.transform.op._mdf) && t4.transform.container.setAttribute(`opacity`, t4.transform.op.v), (n4 || t4.transform.mProps._mdf) && t4.transform.container.setAttribute(`transform`, t4.transform.mProps.v.to2dCSS());
      }
      function a3() {
      }
      function o3(n4, r4, i4) {
        var a4, o4, s4, c4, l4, u4, d3 = r4.styles.length, f3 = r4.lvl, p3, m3, h3, g3;
        for (u4 = 0; u4 < d3; u4 += 1) {
          if (c4 = r4.sh._mdf || i4, r4.styles[u4].lvl < f3) {
            for (m3 = t3.reset(), h3 = f3 - r4.styles[u4].lvl, g3 = r4.transformers.length - 1; !c4 && h3 > 0; ) c4 = r4.transformers[g3].mProps._mdf || c4, --h3, --g3;
            if (c4) for (h3 = f3 - r4.styles[u4].lvl, g3 = r4.transformers.length - 1; h3 > 0; ) m3.multiply(r4.transformers[g3].mProps.v), --h3, --g3;
          } else m3 = e3;
          if (p3 = r4.sh.paths, o4 = p3._length, c4) {
            for (s4 = ``, a4 = 0; a4 < o4; a4 += 1) l4 = p3.shapes[a4], l4 && l4._length && (s4 += Xn2(l4, l4._length, l4.c, m3));
            r4.caches[u4] = s4;
          } else s4 = r4.caches[u4];
          r4.styles[u4].d += n4.hd === true ? `` : s4, r4.styles[u4]._mdf = c4 || r4.styles[u4]._mdf;
        }
      }
      function s3(e4, t4, n4) {
        var r4 = t4.style;
        (t4.c._mdf || n4) && r4.pElem.setAttribute(`fill`, `rgb(` + C2(t4.c.v[0]) + `,` + C2(t4.c.v[1]) + `,` + C2(t4.c.v[2]) + `)`), (t4.o._mdf || n4) && r4.pElem.setAttribute(`fill-opacity`, t4.o.v);
      }
      function c3(e4, t4, n4) {
        l3(e4, t4, n4), u3(e4, t4, n4);
      }
      function l3(e4, t4, n4) {
        var r4 = t4.gf, i4 = t4.g._hasOpacity, a4 = t4.s.v, o4 = t4.e.v;
        if (t4.o._mdf || n4) {
          var s4 = e4.ty === `gf` ? `fill-opacity` : `stroke-opacity`;
          t4.style.pElem.setAttribute(s4, t4.o.v);
        }
        if (t4.s._mdf || n4) {
          var c4 = e4.t === 1 ? `x1` : `cx`, l4 = c4 === `x1` ? `y1` : `cy`;
          r4.setAttribute(c4, a4[0]), r4.setAttribute(l4, a4[1]), i4 && !t4.g._collapsable && (t4.of.setAttribute(c4, a4[0]), t4.of.setAttribute(l4, a4[1]));
        }
        var u4, d3, f3, p3;
        if (t4.g._cmdf || n4) {
          u4 = t4.cst;
          var m3 = t4.g.c;
          for (f3 = u4.length, d3 = 0; d3 < f3; d3 += 1) p3 = u4[d3], p3.setAttribute(`offset`, m3[d3 * 4] + `%`), p3.setAttribute(`stop-color`, `rgb(` + m3[d3 * 4 + 1] + `,` + m3[d3 * 4 + 2] + `,` + m3[d3 * 4 + 3] + `)`);
        }
        if (i4 && (t4.g._omdf || n4)) {
          var h3 = t4.g.o;
          for (u4 = t4.g._collapsable ? t4.cst : t4.ost, f3 = u4.length, d3 = 0; d3 < f3; d3 += 1) p3 = u4[d3], t4.g._collapsable || p3.setAttribute(`offset`, h3[d3 * 2] + `%`), p3.setAttribute(`stop-opacity`, h3[d3 * 2 + 1]);
        }
        if (e4.t === 1) (t4.e._mdf || n4) && (r4.setAttribute(`x2`, o4[0]), r4.setAttribute(`y2`, o4[1]), i4 && !t4.g._collapsable && (t4.of.setAttribute(`x2`, o4[0]), t4.of.setAttribute(`y2`, o4[1])));
        else {
          var g3;
          if ((t4.s._mdf || t4.e._mdf || n4) && (g3 = Math.sqrt((a4[0] - o4[0]) ** 2 + (a4[1] - o4[1]) ** 2), r4.setAttribute(`r`, g3), i4 && !t4.g._collapsable && t4.of.setAttribute(`r`, g3)), t4.s._mdf || t4.e._mdf || t4.h._mdf || t4.a._mdf || n4) {
            g3 ||= Math.sqrt((a4[0] - o4[0]) ** 2 + (a4[1] - o4[1]) ** 2);
            var _3 = Math.atan2(o4[1] - a4[1], o4[0] - a4[0]), v3 = t4.h.v;
            v3 >= 1 ? v3 = 0.99 : v3 <= -1 && (v3 = -0.99);
            var y3 = g3 * v3, b3 = Math.cos(_3 + t4.a.v) * y3 + a4[0], x3 = Math.sin(_3 + t4.a.v) * y3 + a4[1];
            r4.setAttribute(`fx`, b3), r4.setAttribute(`fy`, x3), i4 && !t4.g._collapsable && (t4.of.setAttribute(`fx`, b3), t4.of.setAttribute(`fy`, x3));
          }
        }
      }
      function u3(e4, t4, n4) {
        var r4 = t4.style, i4 = t4.d;
        i4 && (i4._mdf || n4) && i4.dashStr && (r4.pElem.setAttribute(`stroke-dasharray`, i4.dashStr), r4.pElem.setAttribute(`stroke-dashoffset`, i4.dashoffset[0])), t4.c && (t4.c._mdf || n4) && r4.pElem.setAttribute(`stroke`, `rgb(` + C2(t4.c.v[0]) + `,` + C2(t4.c.v[1]) + `,` + C2(t4.c.v[2]) + `)`), (t4.o._mdf || n4) && r4.pElem.setAttribute(`stroke-opacity`, t4.o.v), (t4.w._mdf || n4) && (r4.pElem.setAttribute(`stroke-width`, t4.w.v), r4.msElem && r4.msElem.setAttribute(`stroke-width`, t4.w.v));
      }
      return n3;
    })();
    function W2(e3, t3, n3) {
      this.shapes = [], this.shapesData = e3.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(e3, t3, n3), this.prevViewData = [];
    }
    u2([vn2, wn2, jn2, In2, Mn2, yn2, Nn2], W2), W2.prototype.initSecondaryElement = function() {
    }, W2.prototype.identityMatrix = new Xe2(), W2.prototype.buildExpressionInterface = function() {
    }, W2.prototype.createContent = function() {
      this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true), this.filterUniqueShapes();
    }, W2.prototype.filterUniqueShapes = function() {
      var e3, t3 = this.shapes.length, n3, r3, i3 = this.stylesList.length, a3, o3 = [], s3 = false;
      for (r3 = 0; r3 < i3; r3 += 1) {
        for (a3 = this.stylesList[r3], s3 = false, o3.length = 0, e3 = 0; e3 < t3; e3 += 1) n3 = this.shapes[e3], n3.styles.indexOf(a3) !== -1 && (o3.push(n3), s3 = n3._isAnimated || s3);
        o3.length > 1 && s3 && this.setShapesAsAnimated(o3);
      }
    }, W2.prototype.setShapesAsAnimated = function(e3) {
      var t3, n3 = e3.length;
      for (t3 = 0; t3 < n3; t3 += 1) e3[t3].setAsAnimated();
    }, W2.prototype.createStyleElement = function(e3, t3) {
      var n3, r3 = new Bn2(e3, t3), i3 = r3.pElem;
      return e3.ty === `st` ? n3 = new Hn2(this, e3, r3) : e3.ty === `fl` ? n3 = new Un2(this, e3, r3) : e3.ty === `gf` || e3.ty === `gs` ? (n3 = new (e3.ty === `gf` ? Kn2 : qn2)(this, e3, r3), this.globalData.defs.appendChild(n3.gf), n3.maskId && (this.globalData.defs.appendChild(n3.ms), this.globalData.defs.appendChild(n3.of), i3.setAttribute(`mask`, `url(` + c2() + `#` + n3.maskId + `)`))) : e3.ty === `no` && (n3 = new Wn2(this, e3, r3)), (e3.ty === `st` || e3.ty === `gs`) && (i3.setAttribute(`stroke-linecap`, Ln2[e3.lc || 2]), i3.setAttribute(`stroke-linejoin`, Rn2[e3.lj || 2]), i3.setAttribute(`fill-opacity`, `0`), e3.lj === 1 && i3.setAttribute(`stroke-miterlimit`, e3.ml)), e3.r === 2 && i3.setAttribute(`fill-rule`, `evenodd`), e3.ln && i3.setAttribute(`id`, e3.ln), e3.cl && i3.setAttribute(`class`, e3.cl), e3.bm && (i3.style[`mix-blend-mode`] = sn2(e3.bm)), this.stylesList.push(r3), this.addToAnimatedContents(e3, n3), n3;
    }, W2.prototype.createGroupElement = function(e3) {
      var t3 = new Jn2();
      return e3.ln && t3.gr.setAttribute(`id`, e3.ln), e3.cl && t3.gr.setAttribute(`class`, e3.cl), e3.bm && (t3.gr.style[`mix-blend-mode`] = sn2(e3.bm)), t3;
    }, W2.prototype.createTransformElement = function(e3, t3) {
      var n3 = bt2.getTransformProperty(this, e3, this), r3 = new Yn2(n3, n3.o, t3);
      return this.addToAnimatedContents(e3, r3), r3;
    }, W2.prototype.createShapeElement = function(e3, t3, n3) {
      var r3 = 4;
      e3.ty === `rc` ? r3 = 5 : e3.ty === `el` ? r3 = 6 : e3.ty === `sr` && (r3 = 7);
      var i3 = new zn2(t3, n3, Ye2.getShapeProp(this, e3, r3, this));
      return this.shapes.push(i3), this.addShapeToModifiers(i3), this.addToAnimatedContents(e3, i3), i3;
    }, W2.prototype.addToAnimatedContents = function(e3, t3) {
      for (var n3 = 0, r3 = this.animatedContents.length; n3 < r3; ) {
        if (this.animatedContents[n3].element === t3) return;
        n3 += 1;
      }
      this.animatedContents.push({ fn: Zn2.createRenderFunction(e3), element: t3, data: e3 });
    }, W2.prototype.setElementStyles = function(e3) {
      var t3 = e3.styles, n3, r3 = this.stylesList.length;
      for (n3 = 0; n3 < r3; n3 += 1) t3.indexOf(this.stylesList[n3]) === -1 && !this.stylesList[n3].closed && t3.push(this.stylesList[n3]);
    }, W2.prototype.reloadShapes = function() {
      this._isFirstFrame = true;
      var e3, t3 = this.itemsData.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.prevViewData[e3] = this.itemsData[e3];
      for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true), this.filterUniqueShapes(), t3 = this.dynamicProperties.length, e3 = 0; e3 < t3; e3 += 1) this.dynamicProperties[e3].getValue();
      this.renderModifiers();
    }, W2.prototype.searchShapes = function(e3, t3, n3, r3, i3, a3, o3) {
      var s3 = [].concat(a3), c3, l3 = e3.length - 1, u3, d3, f3 = [], p3 = [], m3, h3, g3;
      for (c3 = l3; c3 >= 0; --c3) {
        if (g3 = this.searchProcessedElement(e3[c3]), g3 ? t3[c3] = n3[g3 - 1] : e3[c3]._render = o3, e3[c3].ty === `fl` || e3[c3].ty === `st` || e3[c3].ty === `gf` || e3[c3].ty === `gs` || e3[c3].ty === `no`) g3 ? t3[c3].style.closed = e3[c3].hd : t3[c3] = this.createStyleElement(e3[c3], i3), e3[c3]._render && t3[c3].style.pElem.parentNode !== r3 && r3.appendChild(t3[c3].style.pElem), f3.push(t3[c3].style);
        else if (e3[c3].ty === `gr`) {
          if (!g3) t3[c3] = this.createGroupElement(e3[c3]);
          else for (d3 = t3[c3].it.length, u3 = 0; u3 < d3; u3 += 1) t3[c3].prevViewData[u3] = t3[c3].it[u3];
          this.searchShapes(e3[c3].it, t3[c3].it, t3[c3].prevViewData, t3[c3].gr, i3 + 1, s3, o3), e3[c3]._render && t3[c3].gr.parentNode !== r3 && r3.appendChild(t3[c3].gr);
        } else e3[c3].ty === `tr` ? (g3 || (t3[c3] = this.createTransformElement(e3[c3], r3)), m3 = t3[c3].transform, s3.push(m3)) : e3[c3].ty === `sh` || e3[c3].ty === `rc` || e3[c3].ty === `el` || e3[c3].ty === `sr` ? (g3 || (t3[c3] = this.createShapeElement(e3[c3], s3, i3)), this.setElementStyles(t3[c3])) : e3[c3].ty === `tm` || e3[c3].ty === `rd` || e3[c3].ty === `ms` || e3[c3].ty === `pb` || e3[c3].ty === `zz` || e3[c3].ty === `op` ? (g3 ? (h3 = t3[c3], h3.closed = false) : (h3 = gt2.getModifier(e3[c3].ty), h3.init(this, e3[c3]), t3[c3] = h3, this.shapeModifiers.push(h3)), p3.push(h3)) : e3[c3].ty === `rp` && (g3 ? (h3 = t3[c3], h3.closed = true) : (h3 = gt2.getModifier(e3[c3].ty), t3[c3] = h3, h3.init(this, e3, c3, t3), this.shapeModifiers.push(h3), o3 = false), p3.push(h3));
        this.addProcessedElement(e3[c3], c3 + 1);
      }
      for (l3 = f3.length, c3 = 0; c3 < l3; c3 += 1) f3[c3].closed = true;
      for (l3 = p3.length, c3 = 0; c3 < l3; c3 += 1) p3[c3].closed = true;
    }, W2.prototype.renderInnerContent = function() {
      this.renderModifiers();
      var e3, t3 = this.stylesList.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.stylesList[e3].reset();
      for (this.renderShape(), e3 = 0; e3 < t3; e3 += 1) (this.stylesList[e3]._mdf || this._isFirstFrame) && (this.stylesList[e3].msElem && (this.stylesList[e3].msElem.setAttribute(`d`, this.stylesList[e3].d), this.stylesList[e3].d = `M0 0` + this.stylesList[e3].d), this.stylesList[e3].pElem.setAttribute(`d`, this.stylesList[e3].d || `M0 0`));
    }, W2.prototype.renderShape = function() {
      var e3, t3 = this.animatedContents.length, n3;
      for (e3 = 0; e3 < t3; e3 += 1) n3 = this.animatedContents[e3], (this._isFirstFrame || n3.element._isAnimated) && n3.data !== true && n3.fn(n3.data, n3.element, this._isFirstFrame);
    }, W2.prototype.destroy = function() {
      this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
    };
    function G2(e3, t3, n3, r3, i3, a3) {
      this.o = e3, this.sw = t3, this.sc = n3, this.fc = r3, this.m = i3, this.p = a3, this._mdf = { o: true, sw: !!t3, sc: !!n3, fc: !!r3, m: true, p: true };
    }
    G2.prototype.update = function(e3, t3, n3, r3, i3, a3) {
      this._mdf.o = false, this._mdf.sw = false, this._mdf.sc = false, this._mdf.fc = false, this._mdf.m = false, this._mdf.p = false;
      var o3 = false;
      return this.o !== e3 && (this.o = e3, this._mdf.o = true, o3 = true), this.sw !== t3 && (this.sw = t3, this._mdf.sw = true, o3 = true), this.sc !== n3 && (this.sc = n3, this._mdf.sc = true, o3 = true), this.fc !== r3 && (this.fc = r3, this._mdf.fc = true, o3 = true), this.m !== i3 && (this.m = i3, this._mdf.m = true, o3 = true), a3.length && (this.p[0] !== a3[0] || this.p[1] !== a3[1] || this.p[4] !== a3[4] || this.p[5] !== a3[5] || this.p[12] !== a3[12] || this.p[13] !== a3[13]) && (this.p = a3, this._mdf.p = true, o3 = true), o3;
    };
    function Qn2(e3, t3) {
      this._frameId = i2, this.pv = ``, this.v = ``, this.kf = false, this._isFirstFrame = true, this._mdf = false, t3.d && t3.d.sid && (t3.d = e3.globalData.slotManager.getProp(t3.d)), this.data = t3, this.elem = e3, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = false, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = { ascent: 0, boxWidth: this.defaultBoxWidth, f: ``, fStyle: ``, fWeight: ``, fc: ``, j: ``, justifyOffset: ``, l: [], lh: 0, lineWidths: [], ls: ``, of: ``, s: ``, sc: ``, sw: 0, t: 0, tr: 0, sz: 0, ps: null, fillColorAnim: false, strokeColorAnim: false, strokeWidthAnim: false, yOffset: 0, finalSize: 0, finalText: [], finalLineHeight: 0, __complete: false }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
    }
    Qn2.prototype.defaultBoxWidth = [0, 0], Qn2.prototype.copyData = function(e3, t3) {
      for (var n3 in t3) Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
      return e3;
    }, Qn2.prototype.setCurrentData = function(e3) {
      e3.__complete || this.completeTextData(e3), this.currentData = e3, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = true;
    }, Qn2.prototype.searchProperty = function() {
      return this.searchKeyframes();
    }, Qn2.prototype.searchKeyframes = function() {
      return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
    }, Qn2.prototype.addEffect = function(e3) {
      this.effectsSequence.push(e3), this.elem.addDynamicProperty(this);
    }, Qn2.prototype.getValue = function(e3) {
      if (!((this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) && !e3)) {
        this.currentData.t = this.data.d.k[this.keysIndex].s.t;
        var t3 = this.currentData, n3 = this.keysIndex;
        if (this.lock) {
          this.setCurrentData(this.currentData);
          return;
        }
        this.lock = true, this._mdf = false;
        var r3, i3 = this.effectsSequence.length, a3 = e3 || this.data.d.k[this.keysIndex].s;
        for (r3 = 0; r3 < i3; r3 += 1) a3 = n3 === this.keysIndex ? this.effectsSequence[r3](this.currentData, a3.t) : this.effectsSequence[r3](a3, a3.t);
        t3 !== a3 && this.setCurrentData(a3), this.v = this.currentData, this.pv = this.v, this.lock = false, this.frameId = this.elem.globalData.frameId;
      }
    }, Qn2.prototype.getKeyframeValue = function() {
      for (var e3 = this.data.d.k, t3 = this.elem.comp.renderedFrame, n3 = 0, r3 = e3.length; n3 <= r3 - 1 && !(n3 === r3 - 1 || e3[n3 + 1].t > t3); ) n3 += 1;
      return this.keysIndex !== n3 && (this.keysIndex = n3), this.data.d.k[this.keysIndex].s;
    }, Qn2.prototype.buildFinalText = function(e3) {
      for (var t3 = [], n3 = 0, r3 = e3.length, i3, a3, o3 = false, s3 = false, c3 = ``; n3 < r3; ) o3 = s3, s3 = false, i3 = e3.charCodeAt(n3), c3 = e3.charAt(n3), nn2.isCombinedCharacter(i3) ? o3 = true : i3 >= 55296 && i3 <= 56319 ? nn2.isRegionalFlag(e3, n3) ? c3 = e3.substr(n3, 14) : (a3 = e3.charCodeAt(n3 + 1), a3 >= 56320 && a3 <= 57343 && (nn2.isModifier(i3, a3) ? (c3 = e3.substr(n3, 2), o3 = true) : c3 = nn2.isFlagEmoji(e3.substr(n3, 4)) ? e3.substr(n3, 4) : e3.substr(n3, 2))) : i3 > 56319 ? (a3 = e3.charCodeAt(n3 + 1), nn2.isVariationSelector(i3) && (o3 = true)) : nn2.isZeroWidthJoiner(i3) && (o3 = true, s3 = true), o3 ? (t3[t3.length - 1] += c3, o3 = false) : t3.push(c3), n3 += c3.length;
      return t3;
    }, Qn2.prototype.completeTextData = function(e3) {
      e3.__complete = true;
      var t3 = this.elem.globalData.fontManager, n3 = this.data, r3 = [], i3, a3, o3, s3 = 0, c3, l3 = n3.m.g, u3 = 0, d3 = 0, f3 = 0, p3 = [], m3 = 0, h3 = 0, g3, _3, v3 = t3.getFontByName(e3.f), y3, b3 = 0, x3 = tn2(v3);
      e3.fWeight = x3.weight, e3.fStyle = x3.style, e3.finalSize = e3.s, e3.finalText = this.buildFinalText(e3.t), a3 = e3.finalText.length, e3.finalLineHeight = e3.lh;
      var S3 = e3.tr / 1e3 * e3.finalSize, C3;
      if (e3.sz) for (var w3 = true, T3 = e3.sz[0], E3 = e3.sz[1], D3, O3; w3; ) {
        O3 = this.buildFinalText(e3.t), D3 = 0, m3 = 0, a3 = O3.length, S3 = e3.tr / 1e3 * e3.finalSize;
        var k3 = -1;
        for (i3 = 0; i3 < a3; i3 += 1) C3 = O3[i3].charCodeAt(0), o3 = false, O3[i3] === ` ` ? k3 = i3 : (C3 === 13 || C3 === 3) && (m3 = 0, o3 = true, D3 += e3.finalLineHeight || e3.finalSize * 1.2), t3.chars ? (y3 = t3.getCharData(O3[i3], v3.fStyle, v3.fFamily), b3 = o3 ? 0 : y3.w * e3.finalSize / 100) : b3 = t3.measureText(O3[i3], e3.f, e3.finalSize), m3 + b3 > T3 && O3[i3] !== ` ` ? (k3 === -1 ? a3 += 1 : i3 = k3, D3 += e3.finalLineHeight || e3.finalSize * 1.2, O3.splice(i3, +(k3 === i3), `\r`), k3 = -1, m3 = 0) : (m3 += b3, m3 += S3);
        D3 += v3.ascent * e3.finalSize / 100, this.canResize && e3.finalSize > this.minimumFontSize && E3 < D3 ? (--e3.finalSize, e3.finalLineHeight = e3.finalSize * e3.lh / e3.s) : (e3.finalText = O3, a3 = e3.finalText.length, w3 = false);
      }
      m3 = -S3, b3 = 0;
      var A3 = 0, ee3;
      for (i3 = 0; i3 < a3; i3 += 1) if (o3 = false, ee3 = e3.finalText[i3], C3 = ee3.charCodeAt(0), C3 === 13 || C3 === 3 ? (A3 = 0, p3.push(m3), h3 = m3 > h3 ? m3 : h3, m3 = -2 * S3, c3 = ``, o3 = true, f3 += 1) : c3 = ee3, t3.chars ? (y3 = t3.getCharData(ee3, v3.fStyle, t3.getFontByName(e3.f).fFamily), b3 = o3 ? 0 : y3.w * e3.finalSize / 100) : b3 = t3.measureText(c3, e3.f, e3.finalSize), ee3 === ` ` ? A3 += b3 + S3 : (m3 += b3 + S3 + A3, A3 = 0), r3.push({ l: b3, an: b3, add: u3, n: o3, anIndexes: [], val: c3, line: f3, animatorJustifyOffset: 0 }), l3 == 2) {
        if (u3 += b3, c3 === `` || c3 === ` ` || i3 === a3 - 1) {
          for ((c3 === `` || c3 === ` `) && (u3 -= b3); d3 <= i3; ) r3[d3].an = u3, r3[d3].ind = s3, r3[d3].extra = b3, d3 += 1;
          s3 += 1, u3 = 0;
        }
      } else if (l3 == 3) {
        if (u3 += b3, c3 === `` || i3 === a3 - 1) {
          for (c3 === `` && (u3 -= b3); d3 <= i3; ) r3[d3].an = u3, r3[d3].ind = s3, r3[d3].extra = b3, d3 += 1;
          u3 = 0, s3 += 1;
        }
      } else r3[s3].ind = s3, r3[s3].extra = 0, s3 += 1;
      if (e3.l = r3, h3 = m3 > h3 ? m3 : h3, p3.push(m3), e3.sz) e3.boxWidth = e3.sz[0], e3.justifyOffset = 0;
      else switch (e3.boxWidth = h3, e3.j) {
        case 1:
          e3.justifyOffset = -e3.boxWidth;
          break;
        case 2:
          e3.justifyOffset = -e3.boxWidth / 2;
          break;
        default:
          e3.justifyOffset = 0;
      }
      e3.lineWidths = p3;
      var j3 = n3.a, M3, N3;
      _3 = j3.length;
      var te3, P3, F3 = [];
      for (g3 = 0; g3 < _3; g3 += 1) {
        for (M3 = j3[g3], M3.a.sc && (e3.strokeColorAnim = true), M3.a.sw && (e3.strokeWidthAnim = true), (M3.a.fc || M3.a.fh || M3.a.fs || M3.a.fb) && (e3.fillColorAnim = true), P3 = 0, te3 = M3.s.b, i3 = 0; i3 < a3; i3 += 1) N3 = r3[i3], N3.anIndexes[g3] = P3, (te3 == 1 && N3.val !== `` || te3 == 2 && N3.val !== `` && N3.val !== ` ` || te3 == 3 && (N3.n || N3.val == ` ` || i3 == a3 - 1) || te3 == 4 && (N3.n || i3 == a3 - 1)) && (M3.s.rn === 1 && F3.push(P3), P3 += 1);
        n3.a[g3].s.totalChars = P3;
        var ne3 = -1, re3;
        if (M3.s.rn === 1) for (i3 = 0; i3 < a3; i3 += 1) N3 = r3[i3], ne3 != N3.anIndexes[g3] && (ne3 = N3.anIndexes[g3], re3 = F3.splice(Math.floor(Math.random() * F3.length), 1)[0]), N3.anIndexes[g3] = re3;
      }
      e3.yOffset = e3.finalLineHeight || e3.finalSize * 1.2, e3.ls = e3.ls || 0, e3.ascent = v3.ascent * e3.finalSize / 100;
    }, Qn2.prototype.updateDocumentData = function(e3, t3) {
      t3 = t3 === void 0 ? this.keysIndex : t3;
      var n3 = this.copyData({}, this.data.d.k[t3].s);
      n3 = this.copyData(n3, e3), this.data.d.k[t3].s = n3, this.recalculate(t3), this.setCurrentData(n3), this.elem.addDynamicProperty(this);
    }, Qn2.prototype.recalculate = function(e3) {
      var t3 = this.data.d.k[e3].s;
      t3.__complete = false, this.keysIndex = 0, this._isFirstFrame = true, this.getValue(t3);
    }, Qn2.prototype.canResizeFont = function(e3) {
      this.canResize = e3, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
    }, Qn2.prototype.setMinimumFontSize = function(e3) {
      this.minimumFontSize = Math.floor(e3) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
    };
    var $n2 = (function() {
      var e3 = Math.max, t3 = Math.min, n3 = Math.floor;
      function r3(e4, t4) {
        this._currentTextLength = -1, this.k = false, this.data = t4, this.elem = e4, this.comp = e4.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(e4), this.s = H2.getProp(e4, t4.s || { k: 0 }, 0, 0, this), this.e = `e` in t4 ? H2.getProp(e4, t4.e, 0, 0, this) : { v: 100 }, this.o = H2.getProp(e4, t4.o || { k: 0 }, 0, 0, this), this.xe = H2.getProp(e4, t4.xe || { k: 0 }, 0, 0, this), this.ne = H2.getProp(e4, t4.ne || { k: 0 }, 0, 0, this), this.sm = H2.getProp(e4, t4.sm || { k: 100 }, 0, 0, this), this.a = H2.getProp(e4, t4.a, 0, 0.01, this), this.dynamicProperties.length || this.getValue();
      }
      r3.prototype = { getMult: function(r4) {
        this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
        var i4 = 0, a3 = 0, o3 = 1, s3 = 1;
        this.ne.v > 0 ? i4 = this.ne.v / 100 : a3 = -this.ne.v / 100, this.xe.v > 0 ? o3 = 1 - this.xe.v / 100 : s3 = 1 + this.xe.v / 100;
        var c3 = Ce2.getBezierEasing(i4, a3, o3, s3).get, l3 = 0, u3 = this.finalS, d3 = this.finalE, f3 = this.data.sh;
        if (f3 === 2) l3 = d3 === u3 ? +(r4 >= d3) : e3(0, t3(0.5 / (d3 - u3) + (r4 - u3) / (d3 - u3), 1)), l3 = c3(l3);
        else if (f3 === 3) l3 = d3 === u3 ? r4 >= d3 ? 0 : 1 : 1 - e3(0, t3(0.5 / (d3 - u3) + (r4 - u3) / (d3 - u3), 1)), l3 = c3(l3);
        else if (f3 === 4) d3 === u3 ? l3 = 0 : (l3 = e3(0, t3(0.5 / (d3 - u3) + (r4 - u3) / (d3 - u3), 1)), l3 < 0.5 ? l3 *= 2 : l3 = 1 - 2 * (l3 - 0.5)), l3 = c3(l3);
        else if (f3 === 5) {
          if (d3 === u3) l3 = 0;
          else {
            var p3 = d3 - u3;
            r4 = t3(e3(0, r4 + 0.5 - u3), d3 - u3);
            var m3 = -p3 / 2 + r4, h3 = p3 / 2;
            l3 = Math.sqrt(1 - m3 * m3 / (h3 * h3));
          }
          l3 = c3(l3);
        } else f3 === 6 ? (d3 === u3 ? l3 = 0 : (r4 = t3(e3(0, r4 + 0.5 - u3), d3 - u3), l3 = (1 + Math.cos(Math.PI + Math.PI * 2 * r4 / (d3 - u3))) / 2), l3 = c3(l3)) : (r4 >= n3(u3) && (l3 = r4 - u3 < 0 ? e3(0, t3(t3(d3, 1) - (u3 - r4), 1)) : e3(0, t3(d3 - r4, 1))), l3 = c3(l3));
        if (this.sm.v !== 100) {
          var g3 = this.sm.v * 0.01;
          g3 === 0 && (g3 = 1e-8);
          var _3 = 0.5 - g3 * 0.5;
          l3 < _3 ? l3 = 0 : (l3 = (l3 - _3) / g3, l3 > 1 && (l3 = 1));
        }
        return l3 * this.a.v;
      }, getValue: function(e4) {
        this.iterateDynamicProperties(), this._mdf = e4 || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, e4 && this.data.r === 2 && (this.e.v = this._currentTextLength);
        var t4 = this.data.r === 2 ? 1 : 100 / this.data.totalChars, n4 = this.o.v / t4, r4 = this.s.v / t4 + n4, i4 = this.e.v / t4 + n4;
        if (r4 > i4) {
          var a3 = r4;
          r4 = i4, i4 = a3;
        }
        this.finalS = r4, this.finalE = i4;
      } }, u2([Ue2], r3);
      function i3(e4, t4, n4) {
        return new r3(e4, t4, n4);
      }
      return { getTextSelectorProp: i3 };
    })();
    function er2(e3, t3, n3) {
      var r3 = { propType: false }, i3 = H2.getProp, a3 = t3.a;
      this.a = { r: a3.r ? i3(e3, a3.r, 0, D2, n3) : r3, rx: a3.rx ? i3(e3, a3.rx, 0, D2, n3) : r3, ry: a3.ry ? i3(e3, a3.ry, 0, D2, n3) : r3, sk: a3.sk ? i3(e3, a3.sk, 0, D2, n3) : r3, sa: a3.sa ? i3(e3, a3.sa, 0, D2, n3) : r3, s: a3.s ? i3(e3, a3.s, 1, 0.01, n3) : r3, a: a3.a ? i3(e3, a3.a, 1, 0, n3) : r3, o: a3.o ? i3(e3, a3.o, 0, 0.01, n3) : r3, p: a3.p ? i3(e3, a3.p, 1, 0, n3) : r3, sw: a3.sw ? i3(e3, a3.sw, 0, 0, n3) : r3, sc: a3.sc ? i3(e3, a3.sc, 1, 0, n3) : r3, fc: a3.fc ? i3(e3, a3.fc, 1, 0, n3) : r3, fh: a3.fh ? i3(e3, a3.fh, 0, 0, n3) : r3, fs: a3.fs ? i3(e3, a3.fs, 0, 0.01, n3) : r3, fb: a3.fb ? i3(e3, a3.fb, 0, 0.01, n3) : r3, t: a3.t ? i3(e3, a3.t, 0, 0, n3) : r3 }, this.s = $n2.getTextSelectorProp(e3, t3.s, n3), this.s.t = t3.s.t;
    }
    function tr2(e3, t3, n3) {
      this._isFirstFrame = true, this._hasMaskedPath = false, this._frameId = -1, this._textData = e3, this._renderType = t3, this._elem = n3, this._animatorsData = m2(this._textData.a.length), this._pathData = {}, this._moreOptions = { alignment: {} }, this.renderedLetters = [], this.lettersChangedFlag = false, this.initDynamicPropertyContainer(n3);
    }
    tr2.prototype.searchProperties = function() {
      var e3, t3 = this._textData.a.length, n3, r3 = H2.getProp;
      for (e3 = 0; e3 < t3; e3 += 1) n3 = this._textData.a[e3], this._animatorsData[e3] = new er2(this._elem, n3, this);
      this._textData.p && `m` in this._textData.p ? (this._pathData = { a: r3(this._elem, this._textData.p.a, 0, 0, this), f: r3(this._elem, this._textData.p.f, 0, 0, this), l: r3(this._elem, this._textData.p.l, 0, 0, this), r: r3(this._elem, this._textData.p.r, 0, 0, this), p: r3(this._elem, this._textData.p.p, 0, 0, this), m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }, this._hasMaskedPath = true) : this._hasMaskedPath = false, this._moreOptions.alignment = r3(this._elem, this._textData.m.a, 1, 0, this);
    }, tr2.prototype.getMeasures = function(e3, t3) {
      if (this.lettersChangedFlag = t3, !(!this._mdf && !this._isFirstFrame && !t3 && (!this._hasMaskedPath || !this._pathData.m._mdf))) {
        this._isFirstFrame = false;
        var n3 = this._moreOptions.alignment.v, r3 = this._animatorsData, i3 = this._textData, a3 = this.mHelper, o3 = this._renderType, s3 = this.renderedLetters.length, c3, l3, u3, d3, f3 = e3.l, p3, m3, h3, g3, _3, v3, y3, b3, x3, S3, C3, w3, T3, E3, D3;
        if (this._hasMaskedPath) {
          if (D3 = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
            var O3 = D3.v;
            this._pathData.r.v && (O3 = O3.reverse()), p3 = { tLength: 0, segments: [] }, d3 = O3._length - 1;
            var k3;
            for (w3 = 0, u3 = 0; u3 < d3; u3 += 1) k3 = ke2.buildBezierData(O3.v[u3], O3.v[u3 + 1], [O3.o[u3][0] - O3.v[u3][0], O3.o[u3][1] - O3.v[u3][1]], [O3.i[u3 + 1][0] - O3.v[u3 + 1][0], O3.i[u3 + 1][1] - O3.v[u3 + 1][1]]), p3.tLength += k3.segmentLength, p3.segments.push(k3), w3 += k3.segmentLength;
            u3 = d3, D3.v.c && (k3 = ke2.buildBezierData(O3.v[u3], O3.v[0], [O3.o[u3][0] - O3.v[u3][0], O3.o[u3][1] - O3.v[u3][1]], [O3.i[0][0] - O3.v[0][0], O3.i[0][1] - O3.v[0][1]]), p3.tLength += k3.segmentLength, p3.segments.push(k3), w3 += k3.segmentLength), this._pathData.pi = p3;
          }
          if (p3 = this._pathData.pi, m3 = this._pathData.f.v, y3 = 0, v3 = 1, g3 = 0, _3 = true, S3 = p3.segments, m3 < 0 && D3.v.c) for (p3.tLength < Math.abs(m3) && (m3 = -Math.abs(m3) % p3.tLength), y3 = S3.length - 1, x3 = S3[y3].points, v3 = x3.length - 1; m3 < 0; ) m3 += x3[v3].partialLength, --v3, v3 < 0 && (--y3, x3 = S3[y3].points, v3 = x3.length - 1);
          x3 = S3[y3].points, b3 = x3[v3 - 1], h3 = x3[v3], C3 = h3.partialLength;
        }
        d3 = f3.length, c3 = 0, l3 = 0;
        var A3 = e3.finalSize * 1.2 * 0.714, ee3 = true, j3, M3, N3, te3 = r3.length, P3, F3, ne3 = -1, L3, ae3, oe3, se3 = m3, ce3 = y3, le3 = v3, ue3 = -1, de3, R3, fe3, z3, pe3, me3, he3, ge3, _e3 = ``, ve3 = this.defaultPropsArray, ye3;
        if (e3.j === 2 || e3.j === 1) {
          var be3 = 0, xe3 = 0, B3 = e3.j === 2 ? -0.5 : -1, Se3 = 0, Ce3 = true;
          for (u3 = 0; u3 < d3; u3 += 1) if (f3[u3].n) {
            for (be3 && (be3 += xe3); Se3 < u3; ) f3[Se3].animatorJustifyOffset = be3, Se3 += 1;
            be3 = 0, Ce3 = true;
          } else {
            for (N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.t.propType && (Ce3 && e3.j === 2 && (xe3 += j3.t.v * B3), M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), F3.length ? be3 += j3.t.v * F3[0] * B3 : be3 += j3.t.v * F3 * B3);
            Ce3 = false;
          }
          for (be3 && (be3 += xe3); Se3 < u3; ) f3[Se3].animatorJustifyOffset = be3, Se3 += 1;
        }
        for (u3 = 0; u3 < d3; u3 += 1) {
          if (a3.reset(), de3 = 1, f3[u3].n) c3 = 0, l3 += e3.yOffset, l3 += +!!ee3, m3 = se3, ee3 = false, this._hasMaskedPath && (y3 = ce3, v3 = le3, x3 = S3[y3].points, b3 = x3[v3 - 1], h3 = x3[v3], C3 = h3.partialLength, g3 = 0), _e3 = ``, ge3 = ``, me3 = ``, ye3 = ``, ve3 = this.defaultPropsArray;
          else {
            if (this._hasMaskedPath) {
              if (ue3 !== f3[u3].line) {
                switch (e3.j) {
                  case 1:
                    m3 += w3 - e3.lineWidths[f3[u3].line];
                    break;
                  case 2:
                    m3 += (w3 - e3.lineWidths[f3[u3].line]) / 2;
                }
                ue3 = f3[u3].line;
              }
              ne3 !== f3[u3].ind && (f3[ne3] && (m3 += f3[ne3].extra), m3 += f3[u3].an / 2, ne3 = f3[u3].ind), m3 += n3[0] * f3[u3].an * 5e-3;
              var we3 = 0;
              for (N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.p.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), F3.length ? we3 += j3.p.v[0] * F3[0] : we3 += j3.p.v[0] * F3), j3.a.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), F3.length ? we3 += j3.a.v[0] * F3[0] : we3 += j3.a.v[0] * F3);
              for (_3 = true, this._pathData.a.v && (m3 = f3[0].an * 0.5 + (w3 - this._pathData.f.v - f3[0].an * 0.5 - f3[f3.length - 1].an * 0.5) * ne3 / (d3 - 1), m3 += this._pathData.f.v); _3; ) g3 + C3 >= m3 + we3 || !x3 ? (T3 = (m3 + we3 - g3) / h3.partialLength, ae3 = b3.point[0] + (h3.point[0] - b3.point[0]) * T3, oe3 = b3.point[1] + (h3.point[1] - b3.point[1]) * T3, a3.translate(-n3[0] * f3[u3].an * 5e-3, -(n3[1] * A3) * 0.01), _3 = false) : x3 && (g3 += h3.partialLength, v3 += 1, v3 >= x3.length && (v3 = 0, y3 += 1, S3[y3] ? x3 = S3[y3].points : D3.v.c ? (v3 = 0, y3 = 0, x3 = S3[y3].points) : (g3 -= h3.partialLength, x3 = null)), x3 && (b3 = h3, h3 = x3[v3], C3 = h3.partialLength));
              L3 = f3[u3].an / 2 - f3[u3].add, a3.translate(-L3, 0, 0);
            } else L3 = f3[u3].an / 2 - f3[u3].add, a3.translate(-L3, 0, 0), a3.translate(-n3[0] * f3[u3].an * 5e-3, -n3[1] * A3 * 0.01, 0);
            for (N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.t.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), (c3 !== 0 || e3.j !== 0) && (this._hasMaskedPath ? F3.length ? m3 += j3.t.v * F3[0] : m3 += j3.t.v * F3 : F3.length ? c3 += j3.t.v * F3[0] : c3 += j3.t.v * F3));
            for (e3.strokeWidthAnim && (fe3 = e3.sw || 0), e3.strokeColorAnim && (R3 = e3.sc ? [e3.sc[0], e3.sc[1], e3.sc[2]] : [0, 0, 0]), e3.fillColorAnim && e3.fc && (z3 = [e3.fc[0], e3.fc[1], e3.fc[2]]), N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.a.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), F3.length ? a3.translate(-j3.a.v[0] * F3[0], -j3.a.v[1] * F3[1], j3.a.v[2] * F3[2]) : a3.translate(-j3.a.v[0] * F3, -j3.a.v[1] * F3, j3.a.v[2] * F3));
            for (N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.s.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), F3.length ? a3.scale(1 + (j3.s.v[0] - 1) * F3[0], 1 + (j3.s.v[1] - 1) * F3[1], 1) : a3.scale(1 + (j3.s.v[0] - 1) * F3, 1 + (j3.s.v[1] - 1) * F3, 1));
            for (N3 = 0; N3 < te3; N3 += 1) {
              if (j3 = r3[N3].a, M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), j3.sk.propType && (F3.length ? a3.skewFromAxis(-j3.sk.v * F3[0], j3.sa.v * F3[1]) : a3.skewFromAxis(-j3.sk.v * F3, j3.sa.v * F3)), j3.r.propType && (F3.length ? a3.rotateZ(-j3.r.v * F3[2]) : a3.rotateZ(-j3.r.v * F3)), j3.ry.propType && (F3.length ? a3.rotateY(j3.ry.v * F3[1]) : a3.rotateY(j3.ry.v * F3)), j3.rx.propType && (F3.length ? a3.rotateX(j3.rx.v * F3[0]) : a3.rotateX(j3.rx.v * F3)), j3.o.propType && (F3.length ? de3 += (j3.o.v * F3[0] - de3) * F3[0] : de3 += (j3.o.v * F3 - de3) * F3), e3.strokeWidthAnim && j3.sw.propType && (F3.length ? fe3 += j3.sw.v * F3[0] : fe3 += j3.sw.v * F3), e3.strokeColorAnim && j3.sc.propType) for (pe3 = 0; pe3 < 3; pe3 += 1) F3.length ? R3[pe3] += (j3.sc.v[pe3] - R3[pe3]) * F3[0] : R3[pe3] += (j3.sc.v[pe3] - R3[pe3]) * F3;
              if (e3.fillColorAnim && e3.fc) {
                if (j3.fc.propType) for (pe3 = 0; pe3 < 3; pe3 += 1) F3.length ? z3[pe3] += (j3.fc.v[pe3] - z3[pe3]) * F3[0] : z3[pe3] += (j3.fc.v[pe3] - z3[pe3]) * F3;
                j3.fh.propType && (z3 = F3.length ? I2(z3, j3.fh.v * F3[0]) : I2(z3, j3.fh.v * F3)), j3.fs.propType && (z3 = F3.length ? re2(z3, j3.fs.v * F3[0]) : re2(z3, j3.fs.v * F3)), j3.fb.propType && (z3 = F3.length ? ie2(z3, j3.fb.v * F3[0]) : ie2(z3, j3.fb.v * F3));
              }
            }
            for (N3 = 0; N3 < te3; N3 += 1) j3 = r3[N3].a, j3.p.propType && (M3 = r3[N3].s, F3 = M3.getMult(f3[u3].anIndexes[N3], i3.a[N3].s.totalChars), this._hasMaskedPath ? F3.length ? a3.translate(0, j3.p.v[1] * F3[0], -j3.p.v[2] * F3[1]) : a3.translate(0, j3.p.v[1] * F3, -j3.p.v[2] * F3) : F3.length ? a3.translate(j3.p.v[0] * F3[0], j3.p.v[1] * F3[1], -j3.p.v[2] * F3[2]) : a3.translate(j3.p.v[0] * F3, j3.p.v[1] * F3, -j3.p.v[2] * F3));
            if (e3.strokeWidthAnim && (me3 = fe3 < 0 ? 0 : fe3), e3.strokeColorAnim && (he3 = `rgb(` + Math.round(R3[0] * 255) + `,` + Math.round(R3[1] * 255) + `,` + Math.round(R3[2] * 255) + `)`), e3.fillColorAnim && e3.fc && (ge3 = `rgb(` + Math.round(z3[0] * 255) + `,` + Math.round(z3[1] * 255) + `,` + Math.round(z3[2] * 255) + `)`), this._hasMaskedPath) {
              if (a3.translate(0, -e3.ls), a3.translate(0, n3[1] * A3 * 0.01 + l3, 0), this._pathData.p.v) {
                E3 = (h3.point[1] - b3.point[1]) / (h3.point[0] - b3.point[0]);
                var Te3 = Math.atan(E3) * 180 / Math.PI;
                h3.point[0] < b3.point[0] && (Te3 += 180), a3.rotate(-Te3 * Math.PI / 180);
              }
              a3.translate(ae3, oe3, 0), m3 -= n3[0] * f3[u3].an * 5e-3, f3[u3 + 1] && ne3 !== f3[u3 + 1].ind && (m3 += f3[u3].an / 2, m3 += e3.tr * 1e-3 * e3.finalSize);
            } else {
              switch (a3.translate(c3, l3, 0), e3.ps && a3.translate(e3.ps[0], e3.ps[1] + e3.ascent, 0), e3.j) {
                case 1:
                  a3.translate(f3[u3].animatorJustifyOffset + e3.justifyOffset + (e3.boxWidth - e3.lineWidths[f3[u3].line]), 0, 0);
                  break;
                case 2:
                  a3.translate(f3[u3].animatorJustifyOffset + e3.justifyOffset + (e3.boxWidth - e3.lineWidths[f3[u3].line]) / 2, 0, 0);
              }
              a3.translate(0, -e3.ls), a3.translate(L3, 0, 0), a3.translate(n3[0] * f3[u3].an * 5e-3, n3[1] * A3 * 0.01, 0), c3 += f3[u3].l + e3.tr * 1e-3 * e3.finalSize;
            }
            o3 === `html` ? _e3 = a3.toCSS() : o3 === `svg` ? _e3 = a3.to2dCSS() : ve3 = [a3.props[0], a3.props[1], a3.props[2], a3.props[3], a3.props[4], a3.props[5], a3.props[6], a3.props[7], a3.props[8], a3.props[9], a3.props[10], a3.props[11], a3.props[12], a3.props[13], a3.props[14], a3.props[15]], ye3 = de3;
          }
          s3 <= u3 ? (P3 = new G2(ye3, me3, he3, ge3, _e3, ve3), this.renderedLetters.push(P3), s3 += 1, this.lettersChangedFlag = true) : (P3 = this.renderedLetters[u3], this.lettersChangedFlag = P3.update(ye3, me3, he3, ge3, _e3, ve3) || this.lettersChangedFlag);
        }
      }
    }, tr2.prototype.getValue = function() {
      this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
    }, tr2.prototype.mHelper = new Xe2(), tr2.prototype.defaultPropsArray = [], u2([Ue2], tr2);
    function nr2() {
    }
    nr2.prototype.initElement = function(e3, t3, n3) {
      this.lettersChangedFlag = true, this.initFrame(), this.initBaseData(e3, t3, n3), this.textProperty = new Qn2(this, e3.t, this.dynamicProperties), this.textAnimator = new tr2(e3.t, this.renderType, this), this.initTransform(e3, t3, n3), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
    }, nr2.prototype.prepareFrame = function(e3) {
      this._mdf = false, this.prepareRenderableFrame(e3), this.prepareProperties(e3, this.isInRange);
    }, nr2.prototype.createPathShape = function(e3, t3) {
      var n3, r3 = t3.length, i3, a3 = ``;
      for (n3 = 0; n3 < r3; n3 += 1) t3[n3].ty === `sh` && (i3 = t3[n3].ks.k, a3 += Xn2(i3, i3.i.length, true, e3));
      return a3;
    }, nr2.prototype.updateDocumentData = function(e3, t3) {
      this.textProperty.updateDocumentData(e3, t3);
    }, nr2.prototype.canResizeFont = function(e3) {
      this.textProperty.canResizeFont(e3);
    }, nr2.prototype.setMinimumFontSize = function(e3) {
      this.textProperty.setMinimumFontSize(e3);
    }, nr2.prototype.applyTextPropertiesToMatrix = function(e3, t3, n3, r3, i3) {
      switch (e3.ps && t3.translate(e3.ps[0], e3.ps[1] + e3.ascent, 0), t3.translate(0, -e3.ls, 0), e3.j) {
        case 1:
          t3.translate(e3.justifyOffset + (e3.boxWidth - e3.lineWidths[n3]), 0, 0);
          break;
        case 2:
          t3.translate(e3.justifyOffset + (e3.boxWidth - e3.lineWidths[n3]) / 2, 0, 0);
      }
      t3.translate(r3, i3, 0);
    }, nr2.prototype.buildColor = function(e3) {
      return `rgb(` + Math.round(e3[0] * 255) + `,` + Math.round(e3[1] * 255) + `,` + Math.round(e3[2] * 255) + `)`;
    }, nr2.prototype.emptyProp = new G2(), nr2.prototype.destroy = function() {
    }, nr2.prototype.validateText = function() {
      (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = false, this.textProperty._mdf = false);
    };
    var rr2 = { shapes: [] };
    function ir2(e3, t3, n3) {
      this.textSpans = [], this.renderType = `svg`, this.initElement(e3, t3, n3);
    }
    u2([vn2, wn2, jn2, Mn2, yn2, Nn2, nr2], ir2), ir2.prototype.createContent = function() {
      this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = R2(`text`));
    }, ir2.prototype.buildTextContents = function(e3) {
      for (var t3 = 0, n3 = e3.length, r3 = [], i3 = ``; t3 < n3; ) e3[t3] === `\r` || e3[t3] === `` ? (r3.push(i3), i3 = ``) : i3 += e3[t3], t3 += 1;
      return r3.push(i3), r3;
    }, ir2.prototype.buildShapeData = function(e3, t3) {
      if (e3.shapes && e3.shapes.length) {
        var n3 = e3.shapes[0];
        if (n3.it) {
          var r3 = n3.it[n3.it.length - 1];
          r3.s && (r3.s.k[0] = t3, r3.s.k[1] = t3);
        }
      }
      return e3;
    }, ir2.prototype.buildNewText = function() {
      this.addDynamicProperty(this);
      var e3, t3, n3 = this.textProperty.currentData;
      this.renderedLetters = m2(n3 ? n3.l.length : 0), n3.fc ? this.layerElement.setAttribute(`fill`, this.buildColor(n3.fc)) : this.layerElement.setAttribute(`fill`, `rgba(0,0,0,0)`), n3.sc && (this.layerElement.setAttribute(`stroke`, this.buildColor(n3.sc)), this.layerElement.setAttribute(`stroke-width`, n3.sw)), this.layerElement.setAttribute(`font-size`, n3.finalSize);
      var r3 = this.globalData.fontManager.getFontByName(n3.f);
      if (r3.fClass) this.layerElement.setAttribute(`class`, r3.fClass);
      else {
        this.layerElement.setAttribute(`font-family`, r3.fFamily);
        var i3 = n3.fWeight, a3 = n3.fStyle;
        this.layerElement.setAttribute(`font-style`, a3), this.layerElement.setAttribute(`font-weight`, i3);
      }
      this.layerElement.setAttribute(`aria-label`, n3.t);
      var o3 = n3.l || [], s3 = !!this.globalData.fontManager.chars;
      t3 = o3.length;
      var c3, l3 = this.mHelper, u3 = ``, d3 = this.data.singleShape, f3 = 0, p3 = 0, h3 = true, g3 = n3.tr * 1e-3 * n3.finalSize;
      if (d3 && !s3 && !n3.sz) {
        var _3 = this.textContainer, v3 = `start`;
        switch (n3.j) {
          case 1:
            v3 = `end`;
            break;
          case 2:
            v3 = `middle`;
            break;
          default:
            v3 = `start`;
        }
        _3.setAttribute(`text-anchor`, v3), _3.setAttribute(`letter-spacing`, g3);
        var y3 = this.buildTextContents(n3.finalText);
        for (t3 = y3.length, p3 = n3.ps ? n3.ps[1] + n3.ascent : 0, e3 = 0; e3 < t3; e3 += 1) c3 = this.textSpans[e3].span || R2(`tspan`), c3.textContent = y3[e3], c3.setAttribute(`x`, 0), c3.setAttribute(`y`, p3), c3.style.display = `inherit`, _3.appendChild(c3), this.textSpans[e3] || (this.textSpans[e3] = { span: null, glyph: null }), this.textSpans[e3].span = c3, p3 += n3.finalLineHeight;
        this.layerElement.appendChild(_3);
      } else {
        var b3 = this.textSpans.length, x3;
        for (e3 = 0; e3 < t3; e3 += 1) {
          if (this.textSpans[e3] || (this.textSpans[e3] = { span: null, childSpan: null, glyph: null }), !s3 || !d3 || e3 === 0) {
            if (c3 = b3 > e3 ? this.textSpans[e3].span : R2(s3 ? `g` : `text`), b3 <= e3) {
              if (c3.setAttribute(`stroke-linecap`, `butt`), c3.setAttribute(`stroke-linejoin`, `round`), c3.setAttribute(`stroke-miterlimit`, `4`), this.textSpans[e3].span = c3, s3) {
                var S3 = R2(`g`);
                c3.appendChild(S3), this.textSpans[e3].childSpan = S3;
              }
              this.textSpans[e3].span = c3, this.layerElement.appendChild(c3);
            }
            c3.style.display = `inherit`;
          }
          if (l3.reset(), d3 && (o3[e3].n && (f3 = -g3, p3 += n3.yOffset, p3 += +!!h3, h3 = false), this.applyTextPropertiesToMatrix(n3, l3, o3[e3].line, f3, p3), f3 += o3[e3].l || 0, f3 += g3), s3) {
            x3 = this.globalData.fontManager.getCharData(n3.finalText[e3], r3.fStyle, this.globalData.fontManager.getFontByName(n3.f).fFamily);
            var C3;
            if (x3.t === 1) C3 = new lr2(x3.data, this.globalData, this);
            else {
              var w3 = rr2;
              x3.data && x3.data.shapes && (w3 = this.buildShapeData(x3.data, n3.finalSize)), C3 = new W2(w3, this.globalData, this);
            }
            if (this.textSpans[e3].glyph) {
              var T3 = this.textSpans[e3].glyph;
              this.textSpans[e3].childSpan.removeChild(T3.layerElement), T3.destroy();
            }
            this.textSpans[e3].glyph = C3, C3._debug = true, C3.prepareFrame(0), C3.renderFrame(), this.textSpans[e3].childSpan.appendChild(C3.layerElement), x3.t === 1 && this.textSpans[e3].childSpan.setAttribute(`transform`, `scale(` + n3.finalSize / 100 + `,` + n3.finalSize / 100 + `)`);
          } else d3 && c3.setAttribute(`transform`, `translate(` + l3.props[12] + `,` + l3.props[13] + `)`), c3.textContent = o3[e3].val, c3.setAttributeNS(`http://www.w3.org/XML/1998/namespace`, `xml:space`, `preserve`);
        }
        d3 && c3 && c3.setAttribute(`d`, u3);
      }
      for (; e3 < this.textSpans.length; ) this.textSpans[e3].span.style.display = `none`, e3 += 1;
      this._sizeChanged = true;
    }, ir2.prototype.sourceRectAtTime = function() {
      if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
        this._sizeChanged = false;
        var e3 = this.layerElement.getBBox();
        this.bbox = { top: e3.y, left: e3.x, width: e3.width, height: e3.height };
      }
      return this.bbox;
    }, ir2.prototype.getValue = function() {
      var e3, t3 = this.textSpans.length, n3;
      for (this.renderedFrame = this.comp.renderedFrame, e3 = 0; e3 < t3; e3 += 1) n3 = this.textSpans[e3].glyph, n3 && (n3.prepareFrame(this.comp.renderedFrame - this.data.st), n3._mdf && (this._mdf = true));
    }, ir2.prototype.renderInnerContent = function() {
      if (this.validateText(), (!this.data.singleShape || this._mdf) && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
        this._sizeChanged = true;
        var e3, t3, n3 = this.textAnimator.renderedLetters, r3 = this.textProperty.currentData.l;
        t3 = r3.length;
        var i3, a3, o3;
        for (e3 = 0; e3 < t3; e3 += 1) r3[e3].n || (i3 = n3[e3], a3 = this.textSpans[e3].span, o3 = this.textSpans[e3].glyph, o3 && o3.renderFrame(), i3._mdf.m && a3.setAttribute(`transform`, i3.m), i3._mdf.o && a3.setAttribute(`opacity`, i3.o), i3._mdf.sw && a3.setAttribute(`stroke-width`, i3.sw), i3._mdf.sc && a3.setAttribute(`stroke`, i3.sc), i3._mdf.fc && a3.setAttribute(`fill`, i3.fc));
      }
    };
    function ar2(e3, t3, n3) {
      this.initElement(e3, t3, n3);
    }
    u2([Pn2], ar2), ar2.prototype.createContent = function() {
      var e3 = R2(`rect`);
      e3.setAttribute(`width`, this.data.sw), e3.setAttribute(`height`, this.data.sh), e3.setAttribute(`fill`, this.data.sc), this.layerElement.appendChild(e3);
    };
    function or2(e3, t3, n3) {
      this.initFrame(), this.initBaseData(e3, t3, n3), this.initFrame(), this.initTransform(e3, t3, n3), this.initHierarchy();
    }
    or2.prototype.prepareFrame = function(e3) {
      this.prepareProperties(e3, true);
    }, or2.prototype.renderFrame = function() {
    }, or2.prototype.getBaseElement = function() {
      return null;
    }, or2.prototype.destroy = function() {
    }, or2.prototype.sourceRectAtTime = function() {
    }, or2.prototype.hide = function() {
    }, u2([vn2, wn2, Mn2, yn2], or2);
    function sr2() {
    }
    u2([Sn2], sr2), sr2.prototype.createNull = function(e3) {
      return new or2(e3, this.globalData, this);
    }, sr2.prototype.createShape = function(e3) {
      return new W2(e3, this.globalData, this);
    }, sr2.prototype.createText = function(e3) {
      return new ir2(e3, this.globalData, this);
    }, sr2.prototype.createImage = function(e3) {
      return new Pn2(e3, this.globalData, this);
    }, sr2.prototype.createSolid = function(e3) {
      return new ar2(e3, this.globalData, this);
    }, sr2.prototype.configAnimation = function(e3) {
      this.svgElement.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`), this.svgElement.setAttribute(`xmlns:xlink`, `http://www.w3.org/1999/xlink`), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute(`viewBox`, this.renderConfig.viewBoxSize) : this.svgElement.setAttribute(`viewBox`, `0 0 ` + e3.w + ` ` + e3.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute(`width`, e3.w), this.svgElement.setAttribute(`height`, e3.h), this.svgElement.style.width = `100%`, this.svgElement.style.height = `100%`, this.svgElement.style.transform = `translate3d(0,0,0)`, this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.width && this.svgElement.setAttribute(`width`, this.renderConfig.width), this.renderConfig.height && this.svgElement.setAttribute(`height`, this.renderConfig.height), this.renderConfig.className && this.svgElement.setAttribute(`class`, this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute(`id`, this.renderConfig.id), this.renderConfig.focusable !== void 0 && this.svgElement.setAttribute(`focusable`, this.renderConfig.focusable), this.svgElement.setAttribute(`preserveAspectRatio`, this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
      var t3 = this.globalData.defs;
      this.setupGlobalData(e3, t3), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = e3;
      var n3 = R2(`clipPath`), r3 = R2(`rect`);
      r3.setAttribute(`width`, e3.w), r3.setAttribute(`height`, e3.h), r3.setAttribute(`x`, 0), r3.setAttribute(`y`, 0);
      var i3 = P2();
      n3.setAttribute(`id`, i3), n3.appendChild(r3), this.layerElement.setAttribute(`clip-path`, `url(` + c2() + `#` + i3 + `)`), t3.appendChild(n3), this.layers = e3.layers, this.elements = m2(e3.layers.length);
    }, sr2.prototype.destroy = function() {
      this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ``), this.layerElement = null, this.globalData.defs = null;
      var e3, t3 = this.layers ? this.layers.length : 0;
      for (e3 = 0; e3 < t3; e3 += 1) this.elements[e3] && this.elements[e3].destroy && this.elements[e3].destroy();
      this.elements.length = 0, this.destroyed = true, this.animationItem = null;
    }, sr2.prototype.updateContainerSize = function() {
    }, sr2.prototype.findIndexByInd = function(e3) {
      var t3 = 0, n3 = this.layers.length;
      for (t3 = 0; t3 < n3; t3 += 1) if (this.layers[t3].ind === e3) return t3;
      return -1;
    }, sr2.prototype.buildItem = function(e3) {
      var t3 = this.elements;
      if (!(t3[e3] || this.layers[e3].ty === 99)) {
        t3[e3] = true;
        var n3 = this.createItem(this.layers[e3]);
        if (t3[e3] = n3, se2() && (this.layers[e3].ty === 0 && this.globalData.projectInterface.registerComposition(n3), n3.initExpressions()), this.appendElementInPos(n3, e3), this.layers[e3].tt) {
          var r3 = `tp` in this.layers[e3] ? this.findIndexByInd(this.layers[e3].tp) : e3 - 1;
          if (r3 === -1) return;
          if (!this.elements[r3] || this.elements[r3] === true) this.buildItem(r3), this.addPendingElement(n3);
          else {
            var i3 = t3[r3].getMatte(this.layers[e3].tt);
            n3.setMatte(i3);
          }
        }
      }
    }, sr2.prototype.checkPendingElements = function() {
      for (; this.pendingElements.length; ) {
        var e3 = this.pendingElements.pop();
        if (e3.checkParenting(), e3.data.tt) for (var t3 = 0, n3 = this.elements.length; t3 < n3; ) {
          if (this.elements[t3] === e3) {
            var r3 = `tp` in e3.data ? this.findIndexByInd(e3.data.tp) : t3 - 1, i3 = this.elements[r3].getMatte(this.layers[t3].tt);
            e3.setMatte(i3);
            break;
          }
          t3 += 1;
        }
      }
    }, sr2.prototype.renderFrame = function(e3) {
      if (!(this.renderedFrame === e3 || this.destroyed)) {
        e3 === null ? e3 = this.renderedFrame : this.renderedFrame = e3, this.globalData.frameNum = e3, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = e3, this.globalData._mdf = false;
        var t3, n3 = this.layers.length;
        for (this.completeLayers || this.checkLayers(e3), t3 = n3 - 1; t3 >= 0; --t3) (this.completeLayers || this.elements[t3]) && this.elements[t3].prepareFrame(e3 - this.layers[t3].st);
        if (this.globalData._mdf) for (t3 = 0; t3 < n3; t3 += 1) (this.completeLayers || this.elements[t3]) && this.elements[t3].renderFrame();
      }
    }, sr2.prototype.appendElementInPos = function(e3, t3) {
      var n3 = e3.getBaseElement();
      if (n3) {
        for (var r3 = 0, i3; r3 < t3; ) this.elements[r3] && this.elements[r3] !== true && this.elements[r3].getBaseElement() && (i3 = this.elements[r3].getBaseElement()), r3 += 1;
        i3 ? this.layerElement.insertBefore(n3, i3) : this.layerElement.appendChild(n3);
      }
    }, sr2.prototype.hide = function() {
      this.layerElement.style.display = `none`;
    }, sr2.prototype.show = function() {
      this.layerElement.style.display = `block`;
    };
    function cr2() {
    }
    u2([vn2, wn2, Mn2, yn2, Nn2], cr2), cr2.prototype.initElement = function(e3, t3, n3) {
      this.initFrame(), this.initBaseData(e3, t3, n3), this.initTransform(e3, t3, n3), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), (this.data.xt || !t3.progressiveLoad) && this.buildAllItems(), this.hide();
    }, cr2.prototype.prepareFrame = function(e3) {
      if (this._mdf = false, this.prepareRenderableFrame(e3), this.prepareProperties(e3, this.isInRange), !(!this.isInRange && !this.data.xt)) {
        if (this.tm._placeholder) this.renderedFrame = e3 / this.data.sr;
        else {
          var t3 = this.tm.v;
          t3 === this.data.op && (t3 = this.data.op - 1), this.renderedFrame = t3;
        }
        var n3, r3 = this.elements.length;
        for (this.completeLayers || this.checkLayers(this.renderedFrame), n3 = r3 - 1; n3 >= 0; --n3) (this.completeLayers || this.elements[n3]) && (this.elements[n3].prepareFrame(this.renderedFrame - this.layers[n3].st), this.elements[n3]._mdf && (this._mdf = true));
      }
    }, cr2.prototype.renderInnerContent = function() {
      var e3, t3 = this.layers.length;
      for (e3 = 0; e3 < t3; e3 += 1) (this.completeLayers || this.elements[e3]) && this.elements[e3].renderFrame();
    }, cr2.prototype.setElements = function(e3) {
      this.elements = e3;
    }, cr2.prototype.getElements = function() {
      return this.elements;
    }, cr2.prototype.destroyElements = function() {
      var e3, t3 = this.layers.length;
      for (e3 = 0; e3 < t3; e3 += 1) this.elements[e3] && this.elements[e3].destroy();
    }, cr2.prototype.destroy = function() {
      this.destroyElements(), this.destroyBaseElement();
    };
    function lr2(e3, t3, n3) {
      this.layers = e3.layers, this.supports3d = true, this.completeLayers = false, this.pendingElements = [], this.elements = this.layers ? m2(this.layers.length) : [], this.initElement(e3, t3, n3), this.tm = e3.tm ? H2.getProp(this, e3.tm, 0, t3.frameRate, this) : { _placeholder: true };
    }
    u2([sr2, cr2, jn2], lr2), lr2.prototype.createComp = function(e3) {
      return new lr2(e3, this.globalData, this);
    };
    function ur2(e3, t3) {
      this.animationItem = e3, this.layers = null, this.renderedFrame = -1, this.svgElement = R2(`svg`);
      var n3 = ``;
      if (t3 && t3.title) {
        var r3 = R2(`title`), i3 = P2();
        r3.setAttribute(`id`, i3), r3.textContent = t3.title, this.svgElement.appendChild(r3), n3 += i3;
      }
      if (t3 && t3.description) {
        var a3 = R2(`desc`), o3 = P2();
        a3.setAttribute(`id`, o3), a3.textContent = t3.description, this.svgElement.appendChild(a3), n3 += ` ` + o3;
      }
      n3 && this.svgElement.setAttribute(`aria-labelledby`, n3);
      var s3 = R2(`defs`);
      this.svgElement.appendChild(s3);
      var c3 = R2(`g`);
      this.svgElement.appendChild(c3), this.layerElement = c3, this.renderConfig = { preserveAspectRatio: t3 && t3.preserveAspectRatio || `xMidYMid meet`, imagePreserveAspectRatio: t3 && t3.imagePreserveAspectRatio || `xMidYMid slice`, contentVisibility: t3 && t3.contentVisibility || `visible`, progressiveLoad: t3 && t3.progressiveLoad || false, hideOnTransparent: !(t3 && t3.hideOnTransparent === false), viewBoxOnly: t3 && t3.viewBoxOnly || false, viewBoxSize: t3 && t3.viewBoxSize || false, className: t3 && t3.className || ``, id: t3 && t3.id || ``, focusable: t3 && t3.focusable, filterSize: { width: t3 && t3.filterSize && t3.filterSize.width || `100%`, height: t3 && t3.filterSize && t3.filterSize.height || `100%`, x: t3 && t3.filterSize && t3.filterSize.x || `0%`, y: t3 && t3.filterSize && t3.filterSize.y || `0%` }, width: t3 && t3.width, height: t3 && t3.height, runExpressions: !t3 || t3.runExpressions === void 0 || t3.runExpressions }, this.globalData = { _mdf: false, frameNum: -1, defs: s3, renderConfig: this.renderConfig }, this.elements = [], this.pendingElements = [], this.destroyed = false, this.rendererType = `svg`;
    }
    return u2([sr2], ur2), ur2.prototype.createComp = function(e3) {
      return new lr2(e3, this.globalData, this);
    }, ve2(`svg`, ur2), gt2.registerModifier(`tm`, vt2), gt2.registerModifier(`pb`, yt2), gt2.registerModifier(`rp`, xt2), gt2.registerModifier(`rd`, St2), gt2.registerModifier(`zz`, Vt2), gt2.registerModifier(`op`, en2), U2;
  }));
})), We = g(), Ge = c(Ue(), 1), Ke = 4, qe = 0, Je = 1, Ye = 2;
function Xe(e2) {
  let t2 = e2.length;
  for (; --t2 >= 0; ) e2[t2] = 0;
}
var Ze = 29, U = 256, Qe = 286, $e = 30, et = 19, tt = 573, nt = 15, rt = 16, it = 7, at = 256, ot = 16, st = 17, ct = 18, lt = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), ut = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), dt = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), ft = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), pt = 512, mt = Array(576);
Xe(mt);
var ht = Array(60);
Xe(ht);
var gt = Array(pt);
Xe(gt);
var _t = Array(256);
Xe(_t);
var vt = Array(Ze);
Xe(vt);
var yt = Array($e);
Xe(yt);
function bt(e2, t2, n2, r2, i2) {
  this.static_tree = e2, this.extra_bits = t2, this.extra_base = n2, this.elems = r2, this.max_length = i2, this.has_stree = e2 && e2.length;
}
var xt, St, Ct;
function wt(e2, t2) {
  this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
}
var Tt = (e2) => e2 < 256 ? gt[e2] : gt[256 + (e2 >>> 7)], Et = (e2, t2) => {
  e2.pending_buf[e2.pending++] = t2 & 255, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
}, Dt = (e2, t2, n2) => {
  e2.bi_valid > rt - n2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, Et(e2, e2.bi_buf), e2.bi_buf = t2 >> rt - e2.bi_valid, e2.bi_valid += n2 - rt) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += n2);
}, Ot = (e2, t2, n2) => {
  Dt(e2, n2[t2 * 2], n2[t2 * 2 + 1]);
}, kt = (e2, t2) => {
  let n2 = 0;
  do
    n2 |= e2 & 1, e2 >>>= 1, n2 <<= 1;
  while (--t2 > 0);
  return n2 >>> 1;
}, At = (e2) => {
  e2.bi_valid === 16 ? (Et(e2, e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0) : e2.bi_valid >= 8 && (e2.pending_buf[e2.pending++] = e2.bi_buf & 255, e2.bi_buf >>= 8, e2.bi_valid -= 8);
}, jt = (e2, t2) => {
  let n2 = t2.dyn_tree, r2 = t2.max_code, i2 = t2.stat_desc.static_tree, a2 = t2.stat_desc.has_stree, o2 = t2.stat_desc.extra_bits, s2 = t2.stat_desc.extra_base, c2 = t2.stat_desc.max_length, l2, u2, d2, f2, p2, m2, h2 = 0;
  for (f2 = 0; f2 <= nt; f2++) e2.bl_count[f2] = 0;
  for (n2[e2.heap[e2.heap_max] * 2 + 1] = 0, l2 = e2.heap_max + 1; l2 < tt; l2++) u2 = e2.heap[l2], f2 = n2[n2[u2 * 2 + 1] * 2 + 1] + 1, f2 > c2 && (f2 = c2, h2++), n2[u2 * 2 + 1] = f2, !(u2 > r2) && (e2.bl_count[f2]++, p2 = 0, u2 >= s2 && (p2 = o2[u2 - s2]), m2 = n2[u2 * 2], e2.opt_len += m2 * (f2 + p2), a2 && (e2.static_len += m2 * (i2[u2 * 2 + 1] + p2)));
  if (h2 !== 0) {
    do {
      for (f2 = c2 - 1; e2.bl_count[f2] === 0; ) f2--;
      e2.bl_count[f2]--, e2.bl_count[f2 + 1] += 2, e2.bl_count[c2]--, h2 -= 2;
    } while (h2 > 0);
    for (f2 = c2; f2 !== 0; f2--) for (u2 = e2.bl_count[f2]; u2 !== 0; ) d2 = e2.heap[--l2], !(d2 > r2) && (n2[d2 * 2 + 1] !== f2 && (e2.opt_len += (f2 - n2[d2 * 2 + 1]) * n2[d2 * 2], n2[d2 * 2 + 1] = f2), u2--);
  }
}, Mt = (e2, t2, n2) => {
  let r2 = Array(16), i2 = 0, a2, o2;
  for (a2 = 1; a2 <= nt; a2++) i2 = i2 + n2[a2 - 1] << 1, r2[a2] = i2;
  for (o2 = 0; o2 <= t2; o2++) {
    let t3 = e2[o2 * 2 + 1];
    t3 !== 0 && (e2[o2 * 2] = kt(r2[t3]++, t3));
  }
}, Nt = () => {
  let e2, t2, n2, r2, i2, a2 = Array(16);
  for (n2 = 0, r2 = 0; r2 < 28; r2++) for (vt[r2] = n2, e2 = 0; e2 < 1 << lt[r2]; e2++) _t[n2++] = r2;
  for (_t[n2 - 1] = r2, i2 = 0, r2 = 0; r2 < 16; r2++) for (yt[r2] = i2, e2 = 0; e2 < 1 << ut[r2]; e2++) gt[i2++] = r2;
  for (i2 >>= 7; r2 < $e; r2++) for (yt[r2] = i2 << 7, e2 = 0; e2 < 1 << ut[r2] - 7; e2++) gt[256 + i2++] = r2;
  for (t2 = 0; t2 <= nt; t2++) a2[t2] = 0;
  for (e2 = 0; e2 <= 143; ) mt[e2 * 2 + 1] = 8, e2++, a2[8]++;
  for (; e2 <= 255; ) mt[e2 * 2 + 1] = 9, e2++, a2[9]++;
  for (; e2 <= 279; ) mt[e2 * 2 + 1] = 7, e2++, a2[7]++;
  for (; e2 <= 287; ) mt[e2 * 2 + 1] = 8, e2++, a2[8]++;
  for (Mt(mt, 287, a2), e2 = 0; e2 < $e; e2++) ht[e2 * 2 + 1] = 5, ht[e2 * 2] = kt(e2, 5);
  xt = new bt(mt, lt, 257, Qe, nt), St = new bt(ht, ut, 0, $e, nt), Ct = new bt([], dt, 0, et, it);
}, Pt = (e2) => {
  let t2;
  for (t2 = 0; t2 < Qe; t2++) e2.dyn_ltree[t2 * 2] = 0;
  for (t2 = 0; t2 < $e; t2++) e2.dyn_dtree[t2 * 2] = 0;
  for (t2 = 0; t2 < et; t2++) e2.bl_tree[t2 * 2] = 0;
  e2.dyn_ltree[at * 2] = 1, e2.opt_len = e2.static_len = 0, e2.sym_next = e2.matches = 0;
}, Ft = (e2) => {
  e2.bi_valid > 8 ? Et(e2, e2.bi_buf) : e2.bi_valid > 0 && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
}, It = (e2, t2, n2, r2) => {
  let i2 = t2 * 2, a2 = n2 * 2;
  return e2[i2] < e2[a2] || e2[i2] === e2[a2] && r2[t2] <= r2[n2];
}, Lt = (e2, t2, n2) => {
  let r2 = e2.heap[n2], i2 = n2 << 1;
  for (; i2 <= e2.heap_len && (i2 < e2.heap_len && It(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !It(t2, r2, e2.heap[i2], e2.depth)); ) e2.heap[n2] = e2.heap[i2], n2 = i2, i2 <<= 1;
  e2.heap[n2] = r2;
}, Rt = (e2, t2, n2) => {
  let r2, i2, a2 = 0, o2, s2;
  if (e2.sym_next !== 0) do
    r2 = e2.pending_buf[e2.sym_buf + a2++] & 255, r2 += (e2.pending_buf[e2.sym_buf + a2++] & 255) << 8, i2 = e2.pending_buf[e2.sym_buf + a2++], r2 === 0 ? Ot(e2, i2, t2) : (o2 = _t[i2], Ot(e2, o2 + U + 1, t2), s2 = lt[o2], s2 !== 0 && (i2 -= vt[o2], Dt(e2, i2, s2)), r2--, o2 = Tt(r2), Ot(e2, o2, n2), s2 = ut[o2], s2 !== 0 && (r2 -= yt[o2], Dt(e2, r2, s2)));
  while (a2 < e2.sym_next);
  Ot(e2, at, t2);
}, zt = (e2, t2) => {
  let n2 = t2.dyn_tree, r2 = t2.stat_desc.static_tree, i2 = t2.stat_desc.has_stree, a2 = t2.stat_desc.elems, o2, s2, c2 = -1, l2;
  for (e2.heap_len = 0, e2.heap_max = tt, o2 = 0; o2 < a2; o2++) n2[o2 * 2] === 0 ? n2[o2 * 2 + 1] = 0 : (e2.heap[++e2.heap_len] = c2 = o2, e2.depth[o2] = 0);
  for (; e2.heap_len < 2; ) l2 = e2.heap[++e2.heap_len] = c2 < 2 ? ++c2 : 0, n2[l2 * 2] = 1, e2.depth[l2] = 0, e2.opt_len--, i2 && (e2.static_len -= r2[l2 * 2 + 1]);
  for (t2.max_code = c2, o2 = e2.heap_len >> 1; o2 >= 1; o2--) Lt(e2, n2, o2);
  l2 = a2;
  do
    o2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], Lt(e2, n2, 1), s2 = e2.heap[1], e2.heap[--e2.heap_max] = o2, e2.heap[--e2.heap_max] = s2, n2[l2 * 2] = n2[o2 * 2] + n2[s2 * 2], e2.depth[l2] = (e2.depth[o2] >= e2.depth[s2] ? e2.depth[o2] : e2.depth[s2]) + 1, n2[o2 * 2 + 1] = n2[s2 * 2 + 1] = l2, e2.heap[1] = l2++, Lt(e2, n2, 1);
  while (e2.heap_len >= 2);
  e2.heap[--e2.heap_max] = e2.heap[1], jt(e2, t2), Mt(n2, c2, e2.bl_count);
}, Bt = (e2, t2, n2) => {
  let r2, i2 = -1, a2, o2 = t2[1], s2 = 0, c2 = 7, l2 = 4;
  for (o2 === 0 && (c2 = 138, l2 = 3), t2[(n2 + 1) * 2 + 1] = 65535, r2 = 0; r2 <= n2; r2++) a2 = o2, o2 = t2[(r2 + 1) * 2 + 1], !(++s2 < c2 && a2 === o2) && (s2 < l2 ? e2.bl_tree[a2 * 2] += s2 : a2 === 0 ? s2 <= 10 ? e2.bl_tree[34]++ : e2.bl_tree[36]++ : (a2 !== i2 && e2.bl_tree[a2 * 2]++, e2.bl_tree[32]++), s2 = 0, i2 = a2, o2 === 0 ? (c2 = 138, l2 = 3) : a2 === o2 ? (c2 = 6, l2 = 3) : (c2 = 7, l2 = 4));
}, Vt = (e2, t2, n2) => {
  let r2, i2 = -1, a2, o2 = t2[1], s2 = 0, c2 = 7, l2 = 4;
  for (o2 === 0 && (c2 = 138, l2 = 3), r2 = 0; r2 <= n2; r2++) if (a2 = o2, o2 = t2[(r2 + 1) * 2 + 1], !(++s2 < c2 && a2 === o2)) {
    if (s2 < l2) do
      Ot(e2, a2, e2.bl_tree);
    while (--s2 !== 0);
    else a2 === 0 ? s2 <= 10 ? (Ot(e2, st, e2.bl_tree), Dt(e2, s2 - 3, 3)) : (Ot(e2, ct, e2.bl_tree), Dt(e2, s2 - 11, 7)) : (a2 !== i2 && (Ot(e2, a2, e2.bl_tree), s2--), Ot(e2, ot, e2.bl_tree), Dt(e2, s2 - 3, 2));
    s2 = 0, i2 = a2, o2 === 0 ? (c2 = 138, l2 = 3) : a2 === o2 ? (c2 = 6, l2 = 3) : (c2 = 7, l2 = 4);
  }
}, Ht = (e2) => {
  let t2;
  for (Bt(e2, e2.dyn_ltree, e2.l_desc.max_code), Bt(e2, e2.dyn_dtree, e2.d_desc.max_code), zt(e2, e2.bl_desc), t2 = 18; t2 >= 3 && e2.bl_tree[ft[t2] * 2 + 1] === 0; t2--) ;
  return e2.opt_len += 3 * (t2 + 1) + 5 + 5 + 4, t2;
}, Ut = (e2, t2, n2, r2) => {
  let i2;
  for (Dt(e2, t2 - 257, 5), Dt(e2, n2 - 1, 5), Dt(e2, r2 - 4, 4), i2 = 0; i2 < r2; i2++) Dt(e2, e2.bl_tree[ft[i2] * 2 + 1], 3);
  Vt(e2, e2.dyn_ltree, t2 - 1), Vt(e2, e2.dyn_dtree, n2 - 1);
}, Wt = (e2) => {
  let t2 = 4093624447, n2;
  for (n2 = 0; n2 <= 31; n2++, t2 >>>= 1) if (t2 & 1 && e2.dyn_ltree[n2 * 2] !== 0) return qe;
  if (e2.dyn_ltree[18] !== 0 || e2.dyn_ltree[20] !== 0 || e2.dyn_ltree[26] !== 0) return Je;
  for (n2 = 32; n2 < U; n2++) if (e2.dyn_ltree[n2 * 2] !== 0) return Je;
  return qe;
}, Gt = false, Kt = (e2) => {
  Gt ||= (Nt(), true), e2.l_desc = new wt(e2.dyn_ltree, xt), e2.d_desc = new wt(e2.dyn_dtree, St), e2.bl_desc = new wt(e2.bl_tree, Ct), e2.bi_buf = 0, e2.bi_valid = 0, Pt(e2);
}, qt = (e2, t2, n2, r2) => {
  Dt(e2, 0 + +!!r2, 3), Ft(e2), Et(e2, n2), Et(e2, ~n2), n2 && e2.pending_buf.set(e2.window.subarray(t2, t2 + n2), e2.pending), e2.pending += n2;
}, Jt = { _tr_init: Kt, _tr_stored_block: qt, _tr_flush_block: (e2, t2, n2, r2) => {
  let i2, a2, o2 = 0;
  e2.level > 0 ? (e2.strm.data_type === Ye && (e2.strm.data_type = Wt(e2)), zt(e2, e2.l_desc), zt(e2, e2.d_desc), o2 = Ht(e2), i2 = e2.opt_len + 3 + 7 >>> 3, a2 = e2.static_len + 3 + 7 >>> 3, a2 <= i2 && (i2 = a2)) : i2 = a2 = n2 + 5, n2 + 4 <= i2 && t2 !== -1 ? qt(e2, t2, n2, r2) : e2.strategy === Ke || a2 === i2 ? (Dt(e2, 2 + +!!r2, 3), Rt(e2, mt, ht)) : (Dt(e2, 4 + +!!r2, 3), Ut(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, o2 + 1), Rt(e2, e2.dyn_ltree, e2.dyn_dtree)), Pt(e2), r2 && Ft(e2);
}, _tr_tally: (e2, t2, n2) => (e2.pending_buf[e2.sym_buf + e2.sym_next++] = t2, e2.pending_buf[e2.sym_buf + e2.sym_next++] = t2 >> 8, e2.pending_buf[e2.sym_buf + e2.sym_next++] = n2, t2 === 0 ? e2.dyn_ltree[n2 * 2]++ : (e2.matches++, t2--, e2.dyn_ltree[(_t[n2] + U + 1) * 2]++, e2.dyn_dtree[Tt(t2) * 2]++), e2.sym_next === e2.sym_end), _tr_align: (e2) => {
  Dt(e2, 2, 3), Ot(e2, at, mt), At(e2);
} }, Yt = (e2, t2, n2, r2) => {
  let i2 = e2 & 65535 | 0, a2 = e2 >>> 16 & 65535 | 0, o2 = 0;
  for (; n2 !== 0; ) {
    o2 = n2 > 2e3 ? 2e3 : n2, n2 -= o2;
    do
      i2 = i2 + t2[r2++] | 0, a2 = a2 + i2 | 0;
    while (--o2);
    i2 %= 65521, a2 %= 65521;
  }
  return i2 | a2 << 16 | 0;
}, Xt = new Uint32Array((() => {
  let e2, t2 = [];
  for (var n2 = 0; n2 < 256; n2++) {
    e2 = n2;
    for (var r2 = 0; r2 < 8; r2++) e2 = e2 & 1 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
    t2[n2] = e2;
  }
  return t2;
})()), Zt = (e2, t2, n2, r2) => {
  let i2 = Xt, a2 = r2 + n2;
  e2 ^= -1;
  for (let n3 = r2; n3 < a2; n3++) e2 = e2 >>> 8 ^ i2[(e2 ^ t2[n3]) & 255];
  return e2 ^ -1;
}, Qt = { 2: `need dictionary`, 1: `stream end`, 0: ``, "-1": `file error`, "-2": `stream error`, "-3": `data error`, "-4": `insufficient memory`, "-5": `buffer error`, "-6": `incompatible version` }, $t = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }, { _tr_init: en, _tr_stored_block: tn, _tr_flush_block: nn, _tr_tally: rn, _tr_align: an } = Jt, { Z_NO_FLUSH: on, Z_PARTIAL_FLUSH: sn, Z_FULL_FLUSH: cn, Z_FINISH: ln, Z_BLOCK: un, Z_OK: dn, Z_STREAM_END: fn, Z_STREAM_ERROR: pn, Z_DATA_ERROR: mn, Z_BUF_ERROR: hn, Z_DEFAULT_COMPRESSION: gn, Z_FILTERED: _n, Z_HUFFMAN_ONLY: vn, Z_RLE: yn, Z_FIXED: bn, Z_DEFAULT_STRATEGY: xn, Z_UNKNOWN: Sn, Z_DEFLATED: Cn } = $t, wn = 9, Tn = 15, En = 8, Dn = 573, On = 3, kn = 258, An = 262, jn = 32, Mn = 42, Nn = 57, Pn = 69, Fn = 73, In = 91, Ln = 103, Rn = 113, zn = 666, Bn = 1, Vn = 2, Hn = 3, Un = 4, Wn = 3, Gn = (e2, t2) => (e2.msg = Qt[t2], t2), Kn = (e2) => e2 * 2 - (e2 > 4 ? 9 : 0), qn = (e2) => {
  let t2 = e2.length;
  for (; --t2 >= 0; ) e2[t2] = 0;
}, Jn = (e2) => {
  let t2, n2, r2, i2 = e2.w_size;
  t2 = e2.hash_size, r2 = t2;
  do
    n2 = e2.head[--r2], e2.head[r2] = n2 >= i2 ? n2 - i2 : 0;
  while (--t2);
  t2 = i2, r2 = t2;
  do
    n2 = e2.prev[--r2], e2.prev[r2] = n2 >= i2 ? n2 - i2 : 0;
  while (--t2);
}, Yn = (e2, t2, n2) => (t2 << e2.hash_shift ^ n2) & e2.hash_mask, Xn = (e2, t2) => {
  let n2;
  if (e2.legacy_hash) n2 = e2.ins_h = Yn(e2, e2.ins_h, e2.window[t2 + On - 1]);
  else {
    let r3 = e2.window, i2 = r3[t2] | r3[t2 + 1] << 8 | r3[t2 + 2] << 16 | r3[t2 + 3] << 24;
    n2 = e2.ins_h = Math.imul(i2, 66521) + 66521 >>> 16 & e2.hash_mask;
  }
  let r2 = e2.prev[t2 & e2.w_mask] = e2.head[n2];
  return e2.head[n2] = t2, r2;
}, Zn = (e2) => {
  let t2 = e2.state, n2 = t2.pending;
  n2 > e2.avail_out && (n2 = e2.avail_out), n2 !== 0 && (e2.output.set(t2.pending_buf.subarray(t2.pending_out, t2.pending_out + n2), e2.next_out), e2.next_out += n2, t2.pending_out += n2, e2.total_out += n2, e2.avail_out -= n2, t2.pending -= n2, t2.pending === 0 && (t2.pending_out = 0));
}, W = (e2, t2) => {
  nn(e2, e2.block_start >= 0 ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, Zn(e2.strm);
}, G = (e2, t2) => {
  e2.pending_buf[e2.pending++] = t2;
}, Qn = (e2, t2) => {
  e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = t2 & 255;
}, $n = (e2, t2, n2, r2) => {
  let i2 = e2.avail_in;
  return i2 > r2 && (i2 = r2), i2 === 0 ? 0 : (e2.avail_in -= i2, t2.set(e2.input.subarray(e2.next_in, e2.next_in + i2), n2), e2.state.wrap === 1 ? e2.adler = Yt(e2.adler, t2, i2, n2) : e2.state.wrap === 2 && (e2.adler = Zt(e2.adler, t2, i2, n2)), e2.next_in += i2, e2.total_in += i2, i2);
}, er = (e2, t2) => {
  let n2 = e2.max_chain_length, r2 = e2.strstart, i2, a2, o2 = e2.prev_length, s2 = e2.nice_match, c2 = e2.strstart > e2.w_size - An ? e2.strstart - (e2.w_size - An) : 0, l2 = e2.window, u2 = e2.w_mask, d2 = e2.prev, f2 = e2.strstart + kn, p2 = l2[r2 + o2 - 1], m2 = l2[r2 + o2];
  e2.prev_length >= e2.good_match && (n2 >>= 2), s2 > e2.lookahead && (s2 = e2.lookahead);
  do
    if (i2 = t2, l2[i2 + o2] === m2 && l2[i2 + o2 - 1] === p2 && l2[i2] === l2[r2] && l2[++i2] === l2[r2 + 1]) {
      r2 += 2, i2++;
      do
        ;
      while (l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && r2 < f2);
      if (a2 = kn - (f2 - r2), r2 = f2 - kn, a2 > o2) {
        if (e2.match_start = t2, o2 = a2, a2 >= s2) break;
        p2 = l2[r2 + o2 - 1], m2 = l2[r2 + o2];
      }
    }
  while ((t2 = d2[t2 & u2]) > c2 && --n2 !== 0);
  return o2 <= e2.lookahead ? o2 : e2.lookahead;
}, tr = (e2) => {
  let t2 = e2.w_size, n2, r2, i2;
  do {
    if (r2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= t2 + (t2 - An) && (e2.window.set(e2.window.subarray(t2, t2 + t2 - r2), 0), e2.match_start -= t2, e2.strstart -= t2, e2.block_start -= t2, e2.insert > e2.strstart && (e2.insert = e2.strstart), Jn(e2), r2 += t2), e2.strm.avail_in === 0) break;
    if (n2 = $n(e2.strm, e2.window, e2.strstart + e2.lookahead, r2), e2.lookahead += n2, !e2.legacy_hash) {
      if (e2.lookahead + e2.insert > On) for (i2 = e2.strstart - e2.insert; e2.insert && (Xn(e2, i2), i2++, e2.insert--, !(e2.lookahead + e2.insert <= On)); ) ;
    } else if (e2.lookahead + e2.insert >= On) for (i2 = e2.strstart - e2.insert, e2.ins_h = e2.window[i2], e2.ins_h = Yn(e2, e2.ins_h, e2.window[i2 + 1]); e2.insert && (Xn(e2, i2), i2++, e2.insert--, !(e2.lookahead + e2.insert < On)); ) ;
  } while (e2.lookahead < An && e2.strm.avail_in !== 0);
}, nr = (e2, t2) => {
  let n2 = e2.pending_buf_size - 5 > e2.w_size ? e2.w_size : e2.pending_buf_size - 5, r2, i2, a2, o2 = 0, s2 = e2.strm.avail_in;
  do {
    if (r2 = 65535, a2 = e2.bi_valid + 42 >> 3, e2.strm.avail_out < a2 || (a2 = e2.strm.avail_out - a2, i2 = e2.strstart - e2.block_start, r2 > i2 + e2.strm.avail_in && (r2 = i2 + e2.strm.avail_in), r2 > a2 && (r2 = a2), r2 < n2 && (r2 === 0 && t2 !== ln || t2 === on || r2 !== i2 + e2.strm.avail_in))) break;
    o2 = +(t2 === ln && r2 === i2 + e2.strm.avail_in), tn(e2, 0, 0, o2), e2.pending_buf[e2.pending - 4] = r2, e2.pending_buf[e2.pending - 3] = r2 >> 8, e2.pending_buf[e2.pending - 2] = ~r2, e2.pending_buf[e2.pending - 1] = ~r2 >> 8, Zn(e2.strm), i2 && (i2 > r2 && (i2 = r2), e2.strm.output.set(e2.window.subarray(e2.block_start, e2.block_start + i2), e2.strm.next_out), e2.strm.next_out += i2, e2.strm.avail_out -= i2, e2.strm.total_out += i2, e2.block_start += i2, r2 -= i2), r2 && ($n(e2.strm, e2.strm.output, e2.strm.next_out, r2), e2.strm.next_out += r2, e2.strm.avail_out -= r2, e2.strm.total_out += r2);
  } while (o2 === 0);
  return s2 -= e2.strm.avail_in, s2 && (s2 >= e2.w_size ? (e2.matches = 2, e2.window.set(e2.strm.input.subarray(e2.strm.next_in - e2.w_size, e2.strm.next_in), 0), e2.strstart = e2.w_size, e2.insert = e2.strstart) : (e2.window_size - e2.strstart <= s2 && (e2.strstart -= e2.w_size, e2.window.set(e2.window.subarray(e2.w_size, e2.w_size + e2.strstart), 0), e2.matches < 2 && e2.matches++, e2.insert > e2.strstart && (e2.insert = e2.strstart)), e2.window.set(e2.strm.input.subarray(e2.strm.next_in - s2, e2.strm.next_in), e2.strstart), e2.strstart += s2, e2.insert += s2 > e2.w_size - e2.insert ? e2.w_size - e2.insert : s2), e2.block_start = e2.strstart), e2.high_water < e2.strstart && (e2.high_water = e2.strstart), o2 ? Un : t2 !== on && t2 !== ln && e2.strm.avail_in === 0 && e2.strstart === e2.block_start ? Vn : (a2 = e2.window_size - e2.strstart, e2.strm.avail_in > a2 && e2.block_start >= e2.w_size && (e2.block_start -= e2.w_size, e2.strstart -= e2.w_size, e2.window.set(e2.window.subarray(e2.w_size, e2.w_size + e2.strstart), 0), e2.matches < 2 && e2.matches++, a2 += e2.w_size, e2.insert > e2.strstart && (e2.insert = e2.strstart)), a2 > e2.strm.avail_in && (a2 = e2.strm.avail_in), a2 && ($n(e2.strm, e2.window, e2.strstart, a2), e2.strstart += a2, e2.insert += a2 > e2.w_size - e2.insert ? e2.w_size - e2.insert : a2), e2.high_water < e2.strstart && (e2.high_water = e2.strstart), a2 = e2.bi_valid + 42 >> 3, a2 = e2.pending_buf_size - a2 > 65535 ? 65535 : e2.pending_buf_size - a2, n2 = a2 > e2.w_size ? e2.w_size : a2, i2 = e2.strstart - e2.block_start, (i2 >= n2 || (i2 || t2 === ln) && t2 !== on && e2.strm.avail_in === 0 && i2 <= a2) && (r2 = i2 > a2 ? a2 : i2, o2 = +(t2 === ln && e2.strm.avail_in === 0 && r2 === i2), tn(e2, e2.block_start, r2, o2), e2.block_start += r2, Zn(e2.strm)), o2 ? Hn : Bn);
}, rr = (e2, t2) => {
  let n2, r2;
  for (; ; ) {
    if (e2.lookahead < An) {
      if (tr(e2), e2.lookahead < An && t2 === on) return Bn;
      if (e2.lookahead === 0) break;
    }
    if (n2 = 0, e2.lookahead >= On && (n2 = Xn(e2, e2.strstart)), n2 !== 0 && e2.strstart - n2 <= e2.w_size - An && (e2.match_length = er(e2, n2)), e2.match_length >= On) {
      if (r2 = rn(e2, e2.strstart - e2.match_start, e2.match_length - On), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= On) {
        e2.match_length--;
        do
          e2.strstart++, n2 = Xn(e2, e2.strstart);
        while (--e2.match_length !== 0);
        e2.strstart++;
      } else e2.strstart += e2.match_length, e2.match_length = 0, e2.legacy_hash && (e2.ins_h = e2.window[e2.strstart], e2.ins_h = Yn(e2, e2.ins_h, e2.window[e2.strstart + 1]));
    } else r2 = rn(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
    if (r2 && (W(e2, false), e2.strm.avail_out === 0)) return Bn;
  }
  return e2.insert = e2.strstart < 2 ? e2.strstart : 2, t2 === ln ? (W(e2, true), e2.strm.avail_out === 0 ? Hn : Un) : e2.sym_next && (W(e2, false), e2.strm.avail_out === 0) ? Bn : Vn;
}, ir = (e2, t2) => {
  let n2, r2, i2;
  for (; ; ) {
    if (e2.lookahead < An) {
      if (tr(e2), e2.lookahead < An && t2 === on) return Bn;
      if (e2.lookahead === 0) break;
    }
    if (n2 = 0, e2.lookahead >= On && (n2 = Xn(e2, e2.strstart)), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = 2, n2 !== 0 && e2.prev_length < e2.max_lazy_match && e2.strstart - n2 <= e2.w_size - An && (e2.match_length = er(e2, n2), e2.match_length <= 5 && (e2.strategy === _n || e2.match_length === On && e2.strstart - e2.match_start > 4096) && (e2.match_length = 2)), e2.prev_length >= On && e2.match_length <= e2.prev_length) {
      i2 = e2.strstart + e2.lookahead - On, r2 = rn(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - On), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2;
      do
        ++e2.strstart <= i2 && (n2 = Xn(e2, e2.strstart));
      while (--e2.prev_length !== 0);
      if (e2.match_available = 0, e2.match_length = 2, e2.strstart++, r2 && (W(e2, false), e2.strm.avail_out === 0)) return Bn;
    } else if (e2.match_available) {
      if (r2 = rn(e2, 0, e2.window[e2.strstart - 1]), r2 && W(e2, false), e2.strstart++, e2.lookahead--, e2.strm.avail_out === 0) return Bn;
    } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
  }
  return e2.match_available &&= (r2 = rn(e2, 0, e2.window[e2.strstart - 1]), 0), e2.insert = e2.strstart < 2 ? e2.strstart : 2, t2 === ln ? (W(e2, true), e2.strm.avail_out === 0 ? Hn : Un) : e2.sym_next && (W(e2, false), e2.strm.avail_out === 0) ? Bn : Vn;
}, ar = (e2, t2) => {
  let n2, r2, i2, a2, o2 = e2.window;
  for (; ; ) {
    if (e2.lookahead <= kn) {
      if (tr(e2), e2.lookahead <= kn && t2 === on) return Bn;
      if (e2.lookahead === 0) break;
    }
    if (e2.match_length = 0, e2.lookahead >= On && e2.strstart > 0 && (i2 = e2.strstart - 1, r2 = o2[i2], r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2])) {
      a2 = e2.strstart + kn;
      do
        ;
      while (r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && r2 === o2[++i2] && i2 < a2);
      e2.match_length = kn - (a2 - i2), e2.match_length > e2.lookahead && (e2.match_length = e2.lookahead);
    }
    if (e2.match_length >= On ? (n2 = rn(e2, 1, e2.match_length - On), e2.lookahead -= e2.match_length, e2.strstart += e2.match_length, e2.match_length = 0) : (n2 = rn(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++), n2 && (W(e2, false), e2.strm.avail_out === 0)) return Bn;
  }
  return e2.insert = 0, t2 === ln ? (W(e2, true), e2.strm.avail_out === 0 ? Hn : Un) : e2.sym_next && (W(e2, false), e2.strm.avail_out === 0) ? Bn : Vn;
}, or = (e2, t2) => {
  let n2;
  for (; ; ) {
    if (e2.lookahead === 0 && (tr(e2), e2.lookahead === 0)) {
      if (t2 === on) return Bn;
      break;
    }
    if (e2.match_length = 0, n2 = rn(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++, n2 && (W(e2, false), e2.strm.avail_out === 0)) return Bn;
  }
  return e2.insert = 0, t2 === ln ? (W(e2, true), e2.strm.avail_out === 0 ? Hn : Un) : e2.sym_next && (W(e2, false), e2.strm.avail_out === 0) ? Bn : Vn;
};
function sr(e2, t2, n2, r2, i2) {
  this.good_length = e2, this.max_lazy = t2, this.nice_length = n2, this.max_chain = r2, this.func = i2;
}
var cr = [new sr(0, 0, 0, 0, nr), new sr(4, 4, 8, 4, rr), new sr(4, 5, 16, 8, rr), new sr(4, 6, 32, 32, rr), new sr(4, 4, 16, 16, ir), new sr(8, 16, 32, 32, ir), new sr(8, 16, 128, 128, ir), new sr(8, 32, 128, 256, ir), new sr(32, 128, 258, 1024, ir), new sr(32, 258, 258, 4096, ir)], lr = (e2) => {
  e2.window_size = 2 * e2.w_size, qn(e2.head), e2.max_lazy_match = cr[e2.level].max_lazy, e2.good_match = cr[e2.level].good_length, e2.nice_match = cr[e2.level].nice_length, e2.max_chain_length = cr[e2.level].max_chain, e2.strstart = 0, e2.block_start = 0, e2.lookahead = 0, e2.insert = 0, e2.match_length = e2.prev_length = 2, e2.match_available = 0, e2.ins_h = 0;
};
function ur() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Cn, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Dn * 2), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), qn(this.dyn_ltree), qn(this.dyn_dtree), qn(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), qn(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), qn(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
var dr = (e2) => {
  if (!e2) return 1;
  let t2 = e2.state;
  return +(!t2 || t2.strm !== e2 || t2.status !== Mn && t2.status !== Nn && t2.status !== Pn && t2.status !== Fn && t2.status !== In && t2.status !== Ln && t2.status !== Rn && t2.status !== zn);
}, fr = (e2) => {
  if (dr(e2)) return Gn(e2, pn);
  e2.total_in = e2.total_out = 0, e2.data_type = Sn;
  let t2 = e2.state;
  return t2.pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap === 2 ? Nn : t2.wrap ? Mn : Rn, e2.adler = t2.wrap === 2 ? 0 : 1, t2.last_flush = -2, en(t2), dn;
}, pr = (e2) => {
  let t2 = fr(e2);
  return t2 === dn && lr(e2.state), t2;
}, mr = (e2, t2) => dr(e2) || e2.state.wrap !== 2 ? pn : (e2.state.gzhead = t2, dn), hr = (e2, t2, n2, r2, i2, a2, o2) => {
  if (!e2) return pn;
  let s2 = 1;
  if (t2 === gn && (t2 = 6), r2 < 0 ? (s2 = 0, r2 = -r2) : r2 > 15 && (s2 = 2, r2 -= 16), i2 < 1 || i2 > wn || n2 !== Cn || r2 < 8 || r2 > 15 || t2 < 0 || t2 > 9 || a2 < 0 || a2 > bn || r2 === 8 && s2 !== 1) return Gn(e2, pn);
  r2 === 8 && (r2 = 9);
  let c2 = new ur();
  return e2.state = c2, c2.strm = e2, c2.status = Mn, c2.wrap = s2, c2.gzhead = null, c2.w_bits = r2, c2.w_size = 1 << c2.w_bits, c2.w_mask = c2.w_size - 1, c2.legacy_hash = +!!o2, c2.hash_bits = i2 + 7, !c2.legacy_hash && c2.hash_bits < 15 && (c2.hash_bits = 15), c2.hash_size = 1 << c2.hash_bits, c2.hash_mask = c2.hash_size - 1, c2.hash_shift = ~~((c2.hash_bits + On - 1) / On), c2.window = new Uint8Array(c2.w_size * 2), c2.head = new Uint16Array(c2.hash_size), c2.prev = new Uint16Array(c2.w_size), c2.lit_bufsize = 1 << i2 + 6, c2.pending_buf_size = c2.lit_bufsize * 4, c2.pending_buf = new Uint8Array(c2.pending_buf_size), c2.sym_buf = c2.lit_bufsize, c2.sym_end = (c2.lit_bufsize - 1) * 3, c2.level = t2, c2.strategy = a2, c2.method = n2, pr(e2);
}, gr = { deflateInit: (e2, t2) => hr(e2, t2, Cn, Tn, En, xn), deflateInit2: hr, deflateReset: pr, deflateResetKeep: fr, deflateSetHeader: mr, deflate: (e2, t2) => {
  if (dr(e2) || t2 > un || t2 < 0) return e2 ? Gn(e2, pn) : pn;
  let n2 = e2.state;
  if (!e2.output || e2.avail_in !== 0 && !e2.input || n2.status === zn && t2 !== ln) return Gn(e2, e2.avail_out === 0 ? hn : pn);
  let r2 = n2.last_flush;
  if (n2.last_flush = t2, n2.pending !== 0) {
    if (Zn(e2), e2.avail_out === 0) return n2.last_flush = -1, dn;
  } else if (e2.avail_in === 0 && Kn(t2) <= Kn(r2) && t2 !== ln) return Gn(e2, hn);
  if (n2.status === zn && e2.avail_in !== 0) return Gn(e2, hn);
  if (n2.status === Mn && n2.wrap === 0 && (n2.status = Rn), n2.status === Mn) {
    let t3 = Cn + (n2.w_bits - 8 << 4) << 8, r3 = -1;
    if (r3 = n2.strategy >= vn || n2.level < 2 ? 0 : n2.level < 6 ? 1 : n2.level === 6 ? 2 : 3, t3 |= r3 << 6, n2.strstart !== 0 && (t3 |= jn), t3 += 31 - t3 % 31, Qn(n2, t3), n2.strstart !== 0 && (Qn(n2, e2.adler >>> 16), Qn(n2, e2.adler & 65535)), e2.adler = 1, n2.status = Rn, Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
  }
  if (n2.status === Nn) {
    if (e2.adler = 0, G(n2, 31), G(n2, 139), G(n2, 8), n2.gzhead) G(n2, +!!n2.gzhead.text + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), G(n2, n2.gzhead.time & 255), G(n2, n2.gzhead.time >> 8 & 255), G(n2, n2.gzhead.time >> 16 & 255), G(n2, n2.gzhead.time >> 24 & 255), G(n2, n2.level === 9 ? 2 : n2.strategy >= vn || n2.level < 2 ? 4 : 0), G(n2, n2.gzhead.os & 255), n2.gzhead.extra && n2.gzhead.extra.length && (G(n2, n2.gzhead.extra.length & 255), G(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = Pn;
    else if (G(n2, 0), G(n2, 0), G(n2, 0), G(n2, 0), G(n2, 0), G(n2, n2.level === 9 ? 2 : n2.strategy >= vn || n2.level < 2 ? 4 : 0), G(n2, Wn), n2.status = Rn, Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
  }
  if (n2.status === Pn) {
    if (n2.gzhead.extra) {
      let t3 = n2.pending, r3 = (n2.gzhead.extra.length & 65535) - n2.gzindex;
      for (; n2.pending + r3 > n2.pending_buf_size; ) {
        let i3 = n2.pending_buf_size - n2.pending;
        if (n2.pending_buf.set(n2.gzhead.extra.subarray(n2.gzindex, n2.gzindex + i3), n2.pending), n2.pending = n2.pending_buf_size, n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3)), n2.gzindex += i3, Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
        t3 = 0, r3 -= i3;
      }
      let i2 = new Uint8Array(n2.gzhead.extra);
      n2.pending_buf.set(i2.subarray(n2.gzindex, n2.gzindex + r3), n2.pending), n2.pending += r3, n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3)), n2.gzindex = 0;
    }
    n2.status = Fn;
  }
  if (n2.status === Fn) {
    if (n2.gzhead.name) {
      let t3 = n2.pending, r3;
      do {
        if (n2.pending === n2.pending_buf_size) {
          if (n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3)), Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
          t3 = 0;
        }
        r3 = n2.gzindex < n2.gzhead.name.length ? n2.gzhead.name.charCodeAt(n2.gzindex++) & 255 : 0, G(n2, r3);
      } while (r3 !== 0);
      n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3)), n2.gzindex = 0;
    }
    n2.status = In;
  }
  if (n2.status === In) {
    if (n2.gzhead.comment) {
      let t3 = n2.pending, r3;
      do {
        if (n2.pending === n2.pending_buf_size) {
          if (n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3)), Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
          t3 = 0;
        }
        r3 = n2.gzindex < n2.gzhead.comment.length ? n2.gzhead.comment.charCodeAt(n2.gzindex++) & 255 : 0, G(n2, r3);
      } while (r3 !== 0);
      n2.gzhead.hcrc && n2.pending > t3 && (e2.adler = Zt(e2.adler, n2.pending_buf, n2.pending - t3, t3));
    }
    n2.status = Ln;
  }
  if (n2.status === Ln) {
    if (n2.gzhead.hcrc) {
      if (n2.pending + 2 > n2.pending_buf_size && (Zn(e2), n2.pending !== 0)) return n2.last_flush = -1, dn;
      G(n2, e2.adler & 255), G(n2, e2.adler >> 8 & 255), e2.adler = 0;
    }
    if (n2.status = Rn, Zn(e2), n2.pending !== 0) return n2.last_flush = -1, dn;
  }
  if (e2.avail_in !== 0 || n2.lookahead !== 0 || t2 !== on && n2.status !== zn) {
    let r3 = n2.level === 0 ? nr(n2, t2) : n2.strategy === vn ? or(n2, t2) : n2.strategy === yn ? ar(n2, t2) : cr[n2.level].func(n2, t2);
    if ((r3 === Hn || r3 === Un) && (n2.status = zn), r3 === Bn || r3 === Hn) return e2.avail_out === 0 && (n2.last_flush = -1), dn;
    if (r3 === Vn && (t2 === sn ? an(n2) : t2 !== un && (tn(n2, 0, 0, false), t2 === cn && (qn(n2.head), n2.lookahead === 0 && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), Zn(e2), e2.avail_out === 0)) return n2.last_flush = -1, dn;
  }
  return t2 === ln ? n2.wrap <= 0 ? fn : (n2.wrap === 2 ? (G(n2, e2.adler & 255), G(n2, e2.adler >> 8 & 255), G(n2, e2.adler >> 16 & 255), G(n2, e2.adler >> 24 & 255), G(n2, e2.total_in & 255), G(n2, e2.total_in >> 8 & 255), G(n2, e2.total_in >> 16 & 255), G(n2, e2.total_in >> 24 & 255)) : (Qn(n2, e2.adler >>> 16), Qn(n2, e2.adler & 65535)), Zn(e2), n2.wrap > 0 && (n2.wrap = -n2.wrap), n2.pending === 0 ? fn : dn) : dn;
}, deflateEnd: (e2) => {
  if (dr(e2)) return pn;
  let t2 = e2.state.status;
  return e2.state = null, t2 === Rn ? Gn(e2, mn) : dn;
}, deflateSetDictionary: (e2, t2) => {
  let n2 = t2.length;
  if (dr(e2)) return pn;
  let r2 = e2.state, i2 = r2.wrap;
  if (i2 === 2 || i2 === 1 && r2.status !== Mn || r2.lookahead) return pn;
  if (i2 === 1 && (e2.adler = Yt(e2.adler, t2, n2, 0)), r2.wrap = 0, n2 >= r2.w_size) {
    i2 === 0 && (qn(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0);
    let e3 = new Uint8Array(r2.w_size);
    e3.set(t2.subarray(n2 - r2.w_size, n2), 0), t2 = e3, n2 = r2.w_size;
  }
  let a2 = e2.avail_in, o2 = e2.next_in, s2 = e2.input;
  for (e2.avail_in = n2, e2.next_in = 0, e2.input = t2, tr(r2); r2.lookahead >= On; ) {
    let e3 = r2.strstart, t3 = r2.lookahead - 2;
    do
      Xn(r2, e3), e3++;
    while (--t3);
    r2.strstart = e3, r2.lookahead = 2, tr(r2);
  }
  return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = 2, r2.match_available = 0, e2.next_in = o2, e2.input = s2, e2.avail_in = a2, r2.wrap = i2, dn;
}, deflateInfo: `pako deflate (from Nodeca project)` }, _r = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), vr = { assign: function(e2) {
  let t2 = Array.prototype.slice.call(arguments, 1);
  for (; t2.length; ) {
    let n2 = t2.shift();
    if (n2) {
      if (typeof n2 != `object`) throw TypeError(n2 + `must be non-object`);
      for (let t3 in n2) _r(n2, t3) && (e2[t3] = n2[t3]);
    }
  }
  return e2;
}, flattenChunks: (e2) => {
  let t2 = 0;
  for (let n3 = 0, r2 = e2.length; n3 < r2; n3++) t2 += e2[n3].length;
  let n2 = new Uint8Array(t2);
  for (let t3 = 0, r2 = 0, i2 = e2.length; t3 < i2; t3++) {
    let i3 = e2[t3];
    n2.set(i3, r2), r2 += i3.length;
  }
  return n2;
} }, yr = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  yr = false;
}
var br = new Uint8Array(256);
for (let e2 = 0; e2 < 256; e2++) br[e2] = e2 >= 252 ? 6 : e2 >= 248 ? 5 : e2 >= 240 ? 4 : e2 >= 224 ? 3 : e2 >= 192 ? 2 : 1;
br[254] = br[255] = 1;
var xr = (e2) => {
  if (typeof TextEncoder == `function` && TextEncoder.prototype.encode) return new TextEncoder().encode(e2);
  let t2, n2, r2, i2, a2, o2 = e2.length, s2 = 0;
  for (i2 = 0; i2 < o2; i2++) n2 = e2.charCodeAt(i2), (n2 & 64512) == 55296 && i2 + 1 < o2 && (r2 = e2.charCodeAt(i2 + 1), (r2 & 64512) == 56320 && (n2 = 65536 + (n2 - 55296 << 10) + (r2 - 56320), i2++)), s2 += n2 < 128 ? 1 : n2 < 2048 ? 2 : n2 < 65536 ? 3 : 4;
  for (t2 = new Uint8Array(s2), a2 = 0, i2 = 0; a2 < s2; i2++) n2 = e2.charCodeAt(i2), (n2 & 64512) == 55296 && i2 + 1 < o2 && (r2 = e2.charCodeAt(i2 + 1), (r2 & 64512) == 56320 && (n2 = 65536 + (n2 - 55296 << 10) + (r2 - 56320), i2++)), n2 < 128 ? t2[a2++] = n2 : n2 < 2048 ? (t2[a2++] = 192 | n2 >>> 6, t2[a2++] = 128 | n2 & 63) : n2 < 65536 ? (t2[a2++] = 224 | n2 >>> 12, t2[a2++] = 128 | n2 >>> 6 & 63, t2[a2++] = 128 | n2 & 63) : (t2[a2++] = 240 | n2 >>> 18, t2[a2++] = 128 | n2 >>> 12 & 63, t2[a2++] = 128 | n2 >>> 6 & 63, t2[a2++] = 128 | n2 & 63);
  return t2;
}, Sr = (e2, t2) => {
  if (t2 < 65534 && e2.subarray && yr) return String.fromCharCode.apply(null, e2.length === t2 ? e2 : e2.subarray(0, t2));
  let n2 = ``;
  for (let r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(e2[r2]);
  return n2;
}, Cr = { string2buf: xr, buf2string: (e2, t2) => {
  let n2 = t2 || e2.length;
  if (typeof TextDecoder == `function` && TextDecoder.prototype.decode) return new TextDecoder().decode(e2.subarray(0, t2));
  let r2, i2, a2 = Array(n2 * 2);
  for (i2 = 0, r2 = 0; r2 < n2; ) {
    let t3 = e2[r2++];
    if (t3 < 128) {
      a2[i2++] = t3;
      continue;
    }
    let o2 = br[t3];
    if (o2 > 4) {
      a2[i2++] = 65533, r2 += o2 - 1;
      continue;
    }
    for (t3 &= o2 === 2 ? 31 : o2 === 3 ? 15 : 7; o2 > 1 && r2 < n2; ) t3 = t3 << 6 | e2[r2++] & 63, o2--;
    if (o2 > 1) {
      a2[i2++] = 65533;
      continue;
    }
    t3 < 65536 ? a2[i2++] = t3 : (t3 -= 65536, a2[i2++] = 55296 | t3 >> 10 & 1023, a2[i2++] = 56320 | t3 & 1023);
  }
  return Sr(a2, i2);
}, utf8border: (e2, t2) => {
  t2 ||= e2.length, t2 > e2.length && (t2 = e2.length);
  let n2 = t2 - 1;
  for (; n2 >= 0 && (e2[n2] & 192) == 128; ) n2--;
  return n2 < 0 || n2 === 0 ? t2 : n2 + br[e2[n2]] > t2 ? n2 : t2;
} };
function wr() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = ``, this.state = null, this.data_type = 2, this.adler = 0;
}
var Tr = wr, Er = Object.prototype.toString, { Z_NO_FLUSH: Dr, Z_SYNC_FLUSH: Or, Z_FULL_FLUSH: kr, Z_FINISH: Ar, Z_OK: jr, Z_STREAM_END: Mr, Z_DEFAULT_COMPRESSION: Nr, Z_DEFAULT_STRATEGY: Pr, Z_DEFLATED: Fr } = $t, Ir = { level: Nr, method: Fr, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: Pr, legacyHash: true };
function Lr(e2) {
  this.options = vr.assign({}, Ir, e2 || {});
  let t2 = this.options;
  t2.raw && t2.windowBits > 0 ? t2.windowBits = -t2.windowBits : t2.gzip && t2.windowBits > 0 && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = ``, this.ended = false, this.chunks = [], this.strm = new Tr(), this.strm.avail_out = 0;
  let n2 = gr.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy, t2.legacyHash);
  if (n2 !== jr) throw Error(Qt[n2]);
  if (t2.header && gr.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
    let e3;
    if (e3 = typeof t2.dictionary == `string` ? Cr.string2buf(t2.dictionary) : Er.call(t2.dictionary) === `[object ArrayBuffer]` ? new Uint8Array(t2.dictionary) : t2.dictionary, n2 = gr.deflateSetDictionary(this.strm, e3), n2 !== jr) throw Error(Qt[n2]);
    this._dict_set = true;
  }
}
Lr.prototype.push = function(e2, t2) {
  let n2 = this.strm, r2 = this.options.chunkSize, i2, a2;
  if (this.ended) return false;
  for (a2 = t2 === ~~t2 ? t2 : t2 === true ? Ar : Dr, n2.input = typeof e2 == `string` ? Cr.string2buf(e2) : Er.call(e2) === `[object ArrayBuffer]` ? new Uint8Array(e2) : e2, n2.next_in = 0, n2.avail_in = n2.input.length; ; ) {
    if (n2.avail_out === 0 && (n2.output = new Uint8Array(r2), n2.next_out = 0, n2.avail_out = r2), (a2 === Or || a2 === kr) && n2.avail_out <= 6) {
      this.onData(n2.output.subarray(0, n2.next_out)), n2.avail_out = 0;
      continue;
    }
    if (i2 = gr.deflate(n2, a2), i2 === Mr) return n2.next_out > 0 && this.onData(n2.output.subarray(0, n2.next_out)), i2 = gr.deflateEnd(this.strm), this.onEnd(i2), this.ended = true, i2 === jr;
    if (n2.avail_out === 0) {
      this.onData(n2.output);
      continue;
    }
    if (a2 > 0 && n2.next_out > 0) {
      this.onData(n2.output.subarray(0, n2.next_out)), n2.avail_out = 0;
      continue;
    }
    if (n2.avail_in === 0) break;
  }
  return true;
}, Lr.prototype.onData = function(e2) {
  this.chunks.push(e2);
}, Lr.prototype.onEnd = function(e2) {
  e2 === jr && (this.result = vr.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
};
function Rr(e2, t2) {
  let n2 = new Lr(t2);
  if (n2.push(e2, true), n2.err) throw n2.msg || Qt[n2.err];
  return n2.result;
}
function zr(e2, t2) {
  return t2 ||= {}, t2.raw = true, Rr(e2, t2);
}
function Br(e2, t2) {
  return t2 ||= {}, t2.gzip = true, Rr(e2, t2);
}
var Vr = { Deflate: Lr, deflate: Rr, deflateRaw: zr, gzip: Br, constants: $t }, Hr = 16209, Ur = 16191, Wr = function(e2, t2) {
  let n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2, _2, v2, y2, b2, x2, S2, C2, w2, T2, E2 = e2.state;
  n2 = e2.next_in, w2 = e2.input, r2 = n2 + (e2.avail_in - 5), i2 = e2.next_out, T2 = e2.output, a2 = i2 - (t2 - e2.avail_out), o2 = i2 + (e2.avail_out - 257), s2 = E2.dmax, c2 = E2.wsize, l2 = E2.whave, u2 = E2.wnext, d2 = E2.window, f2 = E2.hold, p2 = E2.bits, m2 = E2.lencode, h2 = E2.distcode, g2 = (1 << E2.lenbits) - 1, _2 = (1 << E2.distbits) - 1;
  top: do {
    p2 < 15 && (f2 += w2[n2++] << p2, p2 += 8, f2 += w2[n2++] << p2, p2 += 8), v2 = m2[f2 & g2];
    dolen: for (; ; ) {
      if (y2 = v2 >>> 24, f2 >>>= y2, p2 -= y2, y2 = v2 >>> 16 & 255, y2 === 0) T2[i2++] = v2 & 65535;
      else if (y2 & 16) {
        b2 = v2 & 65535, y2 &= 15, y2 && (p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8), b2 += f2 & (1 << y2) - 1, f2 >>>= y2, p2 -= y2), p2 < 15 && (f2 += w2[n2++] << p2, p2 += 8, f2 += w2[n2++] << p2, p2 += 8), v2 = h2[f2 & _2];
        dodist: for (; ; ) {
          if (y2 = v2 >>> 24, f2 >>>= y2, p2 -= y2, y2 = v2 >>> 16 & 255, y2 & 16) {
            if (x2 = v2 & 65535, y2 &= 15, p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8, p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8)), x2 += f2 & (1 << y2) - 1, x2 > s2) {
              e2.msg = `invalid distance too far back`, E2.mode = Hr;
              break top;
            }
            if (f2 >>>= y2, p2 -= y2, y2 = i2 - a2, x2 > y2) {
              if (y2 = x2 - y2, y2 > l2 && E2.sane) {
                e2.msg = `invalid distance too far back`, E2.mode = Hr;
                break top;
              }
              if (S2 = 0, C2 = d2, u2 === 0) {
                if (S2 += c2 - y2, y2 < b2) {
                  b2 -= y2;
                  do
                    T2[i2++] = d2[S2++];
                  while (--y2);
                  S2 = i2 - x2, C2 = T2;
                }
              } else if (u2 < y2) {
                if (S2 += c2 + u2 - y2, y2 -= u2, y2 < b2) {
                  b2 -= y2;
                  do
                    T2[i2++] = d2[S2++];
                  while (--y2);
                  if (S2 = 0, u2 < b2) {
                    y2 = u2, b2 -= y2;
                    do
                      T2[i2++] = d2[S2++];
                    while (--y2);
                    S2 = i2 - x2, C2 = T2;
                  }
                }
              } else if (S2 += u2 - y2, y2 < b2) {
                b2 -= y2;
                do
                  T2[i2++] = d2[S2++];
                while (--y2);
                S2 = i2 - x2, C2 = T2;
              }
              for (; b2 > 2; ) T2[i2++] = C2[S2++], T2[i2++] = C2[S2++], T2[i2++] = C2[S2++], b2 -= 3;
              b2 && (T2[i2++] = C2[S2++], b2 > 1 && (T2[i2++] = C2[S2++]));
            } else {
              S2 = i2 - x2;
              do
                T2[i2++] = T2[S2++], T2[i2++] = T2[S2++], T2[i2++] = T2[S2++], b2 -= 3;
              while (b2 > 2);
              b2 && (T2[i2++] = T2[S2++], b2 > 1 && (T2[i2++] = T2[S2++]));
            }
          } else if (y2 & 64) {
            e2.msg = `invalid distance code`, E2.mode = Hr;
            break top;
          } else {
            v2 = h2[(v2 & 65535) + (f2 & (1 << y2) - 1)];
            continue dodist;
          }
          break;
        }
      } else if (!(y2 & 64)) {
        v2 = m2[(v2 & 65535) + (f2 & (1 << y2) - 1)];
        continue dolen;
      } else if (y2 & 32) {
        E2.mode = Ur;
        break top;
      } else {
        e2.msg = `invalid literal/length code`, E2.mode = Hr;
        break top;
      }
      break;
    }
  } while (n2 < r2 && i2 < o2);
  b2 = p2 >> 3, n2 -= b2, p2 -= b2 << 3, f2 &= (1 << p2) - 1, e2.next_in = n2, e2.next_out = i2, e2.avail_in = n2 < r2 ? 5 + (r2 - n2) : 5 - (n2 - r2), e2.avail_out = i2 < o2 ? 257 + (o2 - i2) : 257 - (i2 - o2), E2.hold = f2, E2.bits = p2;
}, Gr = 15, Kr = 852, qr = 592, Jr = 0, Yr = 1, Xr = 2, Zr = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]), Qr = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 199, 75]), $r = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]), ei = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]), ti = (e2, t2, n2, r2, i2, a2, o2, s2) => {
  let c2 = s2.bits, l2 = 0, u2 = 0, d2 = 0, f2 = 0, p2 = 0, m2 = 0, h2 = 0, g2 = 0, _2 = 0, v2 = 0, y2, b2, x2, S2, C2, w2 = null, T2, E2 = new Uint16Array(16), D2 = new Uint16Array(16), O2 = null, k2, A2, ee2;
  for (l2 = 0; l2 <= Gr; l2++) E2[l2] = 0;
  for (u2 = 0; u2 < r2; u2++) E2[t2[n2 + u2]]++;
  for (p2 = c2, f2 = Gr; f2 >= 1 && E2[f2] === 0; f2--) ;
  if (p2 > f2 && (p2 = f2), f2 === 0) return i2[a2++] = 20971520, i2[a2++] = 20971520, s2.bits = 1, 0;
  for (d2 = 1; d2 < f2 && E2[d2] === 0; d2++) ;
  for (p2 < d2 && (p2 = d2), g2 = 1, l2 = 1; l2 <= Gr; l2++) if (g2 <<= 1, g2 -= E2[l2], g2 < 0) return -1;
  if (g2 > 0 && (e2 === Jr || f2 !== 1)) return -1;
  for (D2[1] = 0, l2 = 1; l2 < Gr; l2++) D2[l2 + 1] = D2[l2] + E2[l2];
  for (u2 = 0; u2 < r2; u2++) t2[n2 + u2] !== 0 && (o2[D2[t2[n2 + u2]]++] = u2);
  if (e2 === Jr ? (w2 = O2 = o2, T2 = 20) : e2 === Yr ? (w2 = Zr, O2 = Qr, T2 = 257) : (w2 = $r, O2 = ei, T2 = 0), v2 = 0, u2 = 0, l2 = d2, C2 = a2, m2 = p2, h2 = 0, x2 = -1, _2 = 1 << p2, S2 = _2 - 1, e2 === Yr && _2 > Kr || e2 === Xr && _2 > qr) return 1;
  for (; ; ) {
    k2 = l2 - h2, o2[u2] + 1 < T2 ? (A2 = 0, ee2 = o2[u2]) : o2[u2] >= T2 ? (A2 = O2[o2[u2] - T2], ee2 = w2[o2[u2] - T2]) : (A2 = 96, ee2 = 0), y2 = 1 << l2 - h2, b2 = 1 << m2, d2 = b2;
    do
      b2 -= y2, i2[C2 + (v2 >> h2) + b2] = k2 << 24 | A2 << 16 | ee2 | 0;
    while (b2 !== 0);
    for (y2 = 1 << l2 - 1; v2 & y2; ) y2 >>= 1;
    if (y2 === 0 ? v2 = 0 : (v2 &= y2 - 1, v2 += y2), u2++, --E2[l2] === 0) {
      if (l2 === f2) break;
      l2 = t2[n2 + o2[u2]];
    }
    if (l2 > p2 && (v2 & S2) !== x2) {
      for (h2 === 0 && (h2 = p2), C2 += d2, m2 = l2 - h2, g2 = 1 << m2; m2 + h2 < f2 && (g2 -= E2[m2 + h2], !(g2 <= 0)); ) m2++, g2 <<= 1;
      if (_2 += 1 << m2, e2 === Yr && _2 > Kr || e2 === Xr && _2 > qr) return 1;
      x2 = v2 & S2, i2[x2] = p2 << 24 | m2 << 16 | C2 - a2 | 0;
    }
  }
  return v2 !== 0 && (i2[C2 + v2] = l2 - h2 << 24 | 4194304), s2.bits = p2, 0;
}, ni = 0, ri = 1, ii = 2, { Z_FINISH: ai, Z_BLOCK: oi, Z_TREES: si, Z_OK: ci, Z_STREAM_END: li, Z_NEED_DICT: ui, Z_STREAM_ERROR: di, Z_DATA_ERROR: fi, Z_MEM_ERROR: pi, Z_BUF_ERROR: mi, Z_DEFLATED: hi } = $t, gi = 16180, _i = 16181, vi = 16182, yi = 16183, bi = 16184, xi = 16185, Si = 16186, Ci = 16187, wi = 16188, Ti = 16189, Ei = 16190, K = 16191, q = 16192, Di = 16193, Oi = 16194, ki = 16195, Ai = 16196, ji = 16197, Mi = 16198, Ni = 16199, Pi = 16200, Fi = 16201, Ii = 16202, Li = 16203, Ri = 16204, zi = 16205, Bi = 16206, Vi = 16207, Hi = 16208, Ui = 16209, Wi = 16210, Gi = 16211, Ki = 852, qi = 592, Ji = 15, Yi = (e2) => (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((e2 & 65280) << 8) + ((e2 & 255) << 24);
function Xi() {
  this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
var Zi = (e2) => {
  if (!e2) return 1;
  let t2 = e2.state;
  return +(!t2 || t2.strm !== e2 || t2.mode < gi || t2.mode > Gi);
}, Qi = (e2) => {
  if (Zi(e2)) return di;
  let t2 = e2.state;
  return e2.total_in = e2.total_out = t2.total = 0, e2.msg = ``, t2.wrap && (e2.adler = t2.wrap & 1), t2.mode = gi, t2.last = 0, t2.havedict = 0, t2.flags = -1, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new Int32Array(Ki), t2.distcode = t2.distdyn = new Int32Array(qi), t2.sane = 1, t2.back = -1, ci;
}, $i = (e2) => {
  if (Zi(e2)) return di;
  let t2 = e2.state;
  return t2.wsize = 0, t2.whave = 0, t2.wnext = 0, Qi(e2);
}, ea = (e2, t2) => {
  let n2;
  if (Zi(e2)) return di;
  let r2 = e2.state;
  return t2 < 0 ? (n2 = 0, t2 = -t2) : (n2 = (t2 >> 4) + 5, t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || t2 > 15) ? di : (r2.window !== null && r2.wbits !== t2 && (r2.window = null), r2.wrap = n2, r2.wbits = t2, $i(e2));
}, ta = (e2, t2) => {
  if (!e2) return di;
  let n2 = new Xi();
  e2.state = n2, n2.strm = e2, n2.window = null, n2.mode = gi;
  let r2 = ea(e2, t2);
  return r2 !== ci && (e2.state = null), r2;
}, na = (e2) => ta(e2, Ji), ra = true, ia, aa, oa = (e2) => {
  if (ra) {
    ia = new Int32Array(512), aa = new Int32Array(32);
    let t2 = 0;
    for (; t2 < 144; ) e2.lens[t2++] = 8;
    for (; t2 < 256; ) e2.lens[t2++] = 9;
    for (; t2 < 280; ) e2.lens[t2++] = 7;
    for (; t2 < 288; ) e2.lens[t2++] = 8;
    for (ti(ri, e2.lens, 0, 288, ia, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
    ti(ii, e2.lens, 0, 32, aa, 0, e2.work, { bits: 5 }), ra = false;
  }
  e2.lencode = ia, e2.lenbits = 9, e2.distcode = aa, e2.distbits = 5;
}, sa = (e2, t2, n2, r2) => {
  let i2, a2 = e2.state;
  return a2.window === null && (a2.window = new Uint8Array(1 << a2.wbits)), a2.wsize === 0 && (a2.wsize = 1 << a2.wbits, a2.wnext = 0, a2.whave = 0), r2 >= a2.wsize ? (a2.window.set(t2.subarray(n2 - a2.wsize, n2), 0), a2.wnext = 0, a2.whave = a2.wsize) : (i2 = a2.wsize - a2.wnext, i2 > r2 && (i2 = r2), a2.window.set(t2.subarray(n2 - r2, n2 - r2 + i2), a2.wnext), r2 -= i2, r2 ? (a2.window.set(t2.subarray(n2 - r2, n2), 0), a2.wnext = r2, a2.whave = a2.wsize) : (a2.wnext += i2, a2.wnext === a2.wsize && (a2.wnext = 0), a2.whave < a2.wsize && (a2.whave += i2))), 0;
}, ca = { inflateReset: $i, inflateReset2: ea, inflateResetKeep: Qi, inflateInit: na, inflateInit2: ta, inflate: (e2, t2) => {
  let n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2 = 0, _2, v2, y2, b2, x2, S2, C2, w2, T2 = new Uint8Array(4), E2, D2, O2 = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (Zi(e2) || !e2.output || !e2.input && e2.avail_in !== 0) return di;
  n2 = e2.state, n2.mode === K && (n2.mode = q), o2 = e2.next_out, i2 = e2.output, c2 = e2.avail_out, a2 = e2.next_in, r2 = e2.input, s2 = e2.avail_in, l2 = n2.hold, u2 = n2.bits, d2 = s2, f2 = c2, w2 = ci;
  inf_leave: for (; ; ) switch (n2.mode) {
    case gi:
      if (n2.wrap === 0) {
        n2.mode = q;
        break;
      }
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.wrap & 2 && l2 === 35615) {
        n2.wbits === 0 && (n2.wbits = 15), n2.check = 0, T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = Zt(n2.check, T2, 2, 0), l2 = 0, u2 = 0, n2.mode = _i;
        break;
      }
      if (n2.head && (n2.head.done = false), !(n2.wrap & 1) || (((l2 & 255) << 8) + (l2 >> 8)) % 31) {
        e2.msg = `incorrect header check`, n2.mode = Ui;
        break;
      }
      if ((l2 & 15) !== hi) {
        e2.msg = `unknown compression method`, n2.mode = Ui;
        break;
      }
      if (l2 >>>= 4, u2 -= 4, C2 = (l2 & 15) + 8, n2.wbits === 0 && (n2.wbits = C2), C2 > 15 || C2 > n2.wbits) {
        e2.msg = `invalid window size`, n2.mode = Ui;
        break;
      }
      n2.dmax = 1 << n2.wbits, n2.flags = 0, e2.adler = n2.check = 1, n2.mode = l2 & 512 ? Ti : K, l2 = 0, u2 = 0;
      break;
    case _i:
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.flags = l2, (n2.flags & 255) !== hi) {
        e2.msg = `unknown compression method`, n2.mode = Ui;
        break;
      }
      if (n2.flags & 57344) {
        e2.msg = `unknown header flags set`, n2.mode = Ui;
        break;
      }
      n2.head && (n2.head.text = l2 >> 8 & 1), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = Zt(n2.check, T2, 2, 0)), l2 = 0, u2 = 0, n2.mode = vi;
    case vi:
      for (; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      n2.head && (n2.head.time = l2), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, T2[2] = l2 >>> 16 & 255, T2[3] = l2 >>> 24 & 255, n2.check = Zt(n2.check, T2, 4, 0)), l2 = 0, u2 = 0, n2.mode = yi;
    case yi:
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      n2.head && (n2.head.xflags = l2 & 255, n2.head.os = l2 >> 8), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = Zt(n2.check, T2, 2, 0)), l2 = 0, u2 = 0, n2.mode = bi;
    case bi:
      if (n2.flags & 1024) {
        for (; u2 < 16; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.length = l2, n2.head && (n2.head.extra_len = l2), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = Zt(n2.check, T2, 2, 0)), l2 = 0, u2 = 0;
      } else n2.head && (n2.head.extra = null);
      n2.mode = xi;
    case xi:
      if (n2.flags & 1024 && (p2 = n2.length, p2 > s2 && (p2 = s2), p2 && (n2.head && (C2 = n2.head.extra_len - n2.length, n2.head.extra || (n2.head.extra = new Uint8Array(n2.head.extra_len)), n2.head.extra.set(r2.subarray(a2, a2 + p2), C2)), n2.flags & 512 && n2.wrap & 4 && (n2.check = Zt(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, n2.length -= p2), n2.length)) break inf_leave;
      n2.length = 0, n2.mode = Si;
    case Si:
      if (n2.flags & 2048) {
        if (s2 === 0) break inf_leave;
        p2 = 0;
        do
          C2 = r2[a2 + p2++], n2.head && C2 && n2.length < 65536 && (n2.head.name += String.fromCharCode(C2));
        while (C2 && p2 < s2);
        if (n2.flags & 512 && n2.wrap & 4 && (n2.check = Zt(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, C2) break inf_leave;
      } else n2.head && (n2.head.name = null);
      n2.length = 0, n2.mode = Ci;
    case Ci:
      if (n2.flags & 4096) {
        if (s2 === 0) break inf_leave;
        p2 = 0;
        do
          C2 = r2[a2 + p2++], n2.head && C2 && n2.length < 65536 && (n2.head.comment += String.fromCharCode(C2));
        while (C2 && p2 < s2);
        if (n2.flags & 512 && n2.wrap & 4 && (n2.check = Zt(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, C2) break inf_leave;
      } else n2.head && (n2.head.comment = null);
      n2.mode = wi;
    case wi:
      if (n2.flags & 512) {
        for (; u2 < 16; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (n2.wrap & 4 && l2 !== (n2.check & 65535)) {
          e2.msg = `header crc mismatch`, n2.mode = Ui;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.head && (n2.head.hcrc = n2.flags >> 9 & 1, n2.head.done = true), e2.adler = n2.check = 0, n2.mode = K;
      break;
    case Ti:
      for (; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      e2.adler = n2.check = Yi(l2), l2 = 0, u2 = 0, n2.mode = Ei;
    case Ei:
      if (n2.havedict === 0) return e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, ui;
      e2.adler = n2.check = 1, n2.mode = K;
    case K:
      if (t2 === oi || t2 === si) break inf_leave;
    case q:
      if (n2.last) {
        l2 >>>= u2 & 7, u2 -= u2 & 7, n2.mode = Bi;
        break;
      }
      for (; u2 < 3; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      switch (n2.last = l2 & 1, l2 >>>= 1, --u2, l2 & 3) {
        case 0:
          n2.mode = Di;
          break;
        case 1:
          if (oa(n2), n2.mode = Ni, t2 === si) {
            l2 >>>= 2, u2 -= 2;
            break inf_leave;
          }
          break;
        case 2:
          n2.mode = Ai;
          break;
        case 3:
          e2.msg = `invalid block type`, n2.mode = Ui;
      }
      l2 >>>= 2, u2 -= 2;
      break;
    case Di:
      for (l2 >>>= u2 & 7, u2 -= u2 & 7; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if ((l2 & 65535) != (l2 >>> 16 ^ 65535)) {
        e2.msg = `invalid stored block lengths`, n2.mode = Ui;
        break;
      }
      if (n2.length = l2 & 65535, l2 = 0, u2 = 0, n2.mode = Oi, t2 === si) break inf_leave;
    case Oi:
      n2.mode = ki;
    case ki:
      if (p2 = n2.length, p2) {
        if (p2 > s2 && (p2 = s2), p2 > c2 && (p2 = c2), p2 === 0) break inf_leave;
        i2.set(r2.subarray(a2, a2 + p2), o2), s2 -= p2, a2 += p2, c2 -= p2, o2 += p2, n2.length -= p2;
        break;
      }
      n2.mode = K;
      break;
    case Ai:
      for (; u2 < 14; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.nlen = (l2 & 31) + 257, l2 >>>= 5, u2 -= 5, n2.ndist = (l2 & 31) + 1, l2 >>>= 5, u2 -= 5, n2.ncode = (l2 & 15) + 4, l2 >>>= 4, u2 -= 4, n2.nlen > 286 || n2.ndist > 30) {
        e2.msg = `too many length or distance symbols`, n2.mode = Ui;
        break;
      }
      n2.have = 0, n2.mode = ji;
    case ji:
      for (; n2.have < n2.ncode; ) {
        for (; u2 < 3; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.lens[O2[n2.have++]] = l2 & 7, l2 >>>= 3, u2 -= 3;
      }
      for (; n2.have < 19; ) n2.lens[O2[n2.have++]] = 0;
      if (n2.lencode = n2.lendyn, n2.lenbits = 7, E2 = { bits: n2.lenbits }, w2 = ti(ni, n2.lens, 0, 19, n2.lencode, 0, n2.work, E2), n2.lenbits = E2.bits, w2) {
        e2.msg = `invalid code lengths set`, n2.mode = Ui;
        break;
      }
      n2.have = 0, n2.mode = Mi;
    case Mi:
      for (; n2.have < n2.nlen + n2.ndist; ) {
        for (; g2 = n2.lencode[l2 & (1 << n2.lenbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (y2 < 16) l2 >>>= _2, u2 -= _2, n2.lens[n2.have++] = y2;
        else {
          if (y2 === 16) {
            for (D2 = _2 + 2; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            if (l2 >>>= _2, u2 -= _2, n2.have === 0) {
              e2.msg = `invalid bit length repeat`, n2.mode = Ui;
              break;
            }
            C2 = n2.lens[n2.have - 1], p2 = 3 + (l2 & 3), l2 >>>= 2, u2 -= 2;
          } else if (y2 === 17) {
            for (D2 = _2 + 3; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            l2 >>>= _2, u2 -= _2, C2 = 0, p2 = 3 + (l2 & 7), l2 >>>= 3, u2 -= 3;
          } else {
            for (D2 = _2 + 7; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            l2 >>>= _2, u2 -= _2, C2 = 0, p2 = 11 + (l2 & 127), l2 >>>= 7, u2 -= 7;
          }
          if (n2.have + p2 > n2.nlen + n2.ndist) {
            e2.msg = `invalid bit length repeat`, n2.mode = Ui;
            break;
          }
          for (; p2--; ) n2.lens[n2.have++] = C2;
        }
      }
      if (n2.mode === Ui) break;
      if (n2.lens[256] === 0) {
        e2.msg = `invalid code -- missing end-of-block`, n2.mode = Ui;
        break;
      }
      if (n2.lenbits = 9, E2 = { bits: n2.lenbits }, w2 = ti(ri, n2.lens, 0, n2.nlen, n2.lencode, 0, n2.work, E2), n2.lenbits = E2.bits, w2) {
        e2.msg = `invalid literal/lengths set`, n2.mode = Ui;
        break;
      }
      if (n2.distbits = 6, n2.distcode = n2.distdyn, E2 = { bits: n2.distbits }, w2 = ti(ii, n2.lens, n2.nlen, n2.ndist, n2.distcode, 0, n2.work, E2), n2.distbits = E2.bits, w2) {
        e2.msg = `invalid distances set`, n2.mode = Ui;
        break;
      }
      if (n2.mode = Ni, t2 === si) break inf_leave;
    case Ni:
      n2.mode = Pi;
    case Pi:
      if (s2 >= 6 && c2 >= 258) {
        e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, Wr(e2, f2), o2 = e2.next_out, i2 = e2.output, c2 = e2.avail_out, a2 = e2.next_in, r2 = e2.input, s2 = e2.avail_in, l2 = n2.hold, u2 = n2.bits, n2.mode === K && (n2.back = -1);
        break;
      }
      for (n2.back = 0; g2 = n2.lencode[l2 & (1 << n2.lenbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (v2 && !(v2 & 240)) {
        for (b2 = _2, x2 = v2, S2 = y2; g2 = n2.lencode[S2 + ((l2 & (1 << b2 + x2) - 1) >> b2)], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(b2 + _2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        l2 >>>= b2, u2 -= b2, n2.back += b2;
      }
      if (l2 >>>= _2, u2 -= _2, n2.back += _2, n2.length = y2, v2 === 0) {
        n2.mode = zi;
        break;
      }
      if (v2 & 32) {
        n2.back = -1, n2.mode = K;
        break;
      }
      if (v2 & 64) {
        e2.msg = `invalid literal/length code`, n2.mode = Ui;
        break;
      }
      n2.extra = v2 & 15, n2.mode = Fi;
    case Fi:
      if (n2.extra) {
        for (D2 = n2.extra; u2 < D2; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.length += l2 & (1 << n2.extra) - 1, l2 >>>= n2.extra, u2 -= n2.extra, n2.back += n2.extra;
      }
      n2.was = n2.length, n2.mode = Ii;
    case Ii:
      for (; g2 = n2.distcode[l2 & (1 << n2.distbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (!(v2 & 240)) {
        for (b2 = _2, x2 = v2, S2 = y2; g2 = n2.distcode[S2 + ((l2 & (1 << b2 + x2) - 1) >> b2)], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(b2 + _2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        l2 >>>= b2, u2 -= b2, n2.back += b2;
      }
      if (l2 >>>= _2, u2 -= _2, n2.back += _2, v2 & 64) {
        e2.msg = `invalid distance code`, n2.mode = Ui;
        break;
      }
      n2.offset = y2, n2.extra = v2 & 15, n2.mode = Li;
    case Li:
      if (n2.extra) {
        for (D2 = n2.extra; u2 < D2; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.offset += l2 & (1 << n2.extra) - 1, l2 >>>= n2.extra, u2 -= n2.extra, n2.back += n2.extra;
      }
      if (n2.offset > n2.dmax) {
        e2.msg = `invalid distance too far back`, n2.mode = Ui;
        break;
      }
      n2.mode = Ri;
    case Ri:
      if (c2 === 0) break inf_leave;
      if (p2 = f2 - c2, n2.offset > p2) {
        if (p2 = n2.offset - p2, p2 > n2.whave && n2.sane) {
          e2.msg = `invalid distance too far back`, n2.mode = Ui;
          break;
        }
        p2 > n2.wnext ? (p2 -= n2.wnext, m2 = n2.wsize - p2) : m2 = n2.wnext - p2, p2 > n2.length && (p2 = n2.length), h2 = n2.window;
      } else h2 = i2, m2 = o2 - n2.offset, p2 = n2.length;
      p2 > c2 && (p2 = c2), c2 -= p2, n2.length -= p2;
      do
        i2[o2++] = h2[m2++];
      while (--p2);
      n2.length === 0 && (n2.mode = Pi);
      break;
    case zi:
      if (c2 === 0) break inf_leave;
      i2[o2++] = n2.length, c2--, n2.mode = Pi;
      break;
    case Bi:
      if (n2.wrap) {
        for (; u2 < 32; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 |= r2[a2++] << u2, u2 += 8;
        }
        if (f2 -= c2, e2.total_out += f2, n2.total += f2, n2.wrap & 4 && f2 && (e2.adler = n2.check = n2.flags ? Zt(n2.check, i2, f2, o2 - f2) : Yt(n2.check, i2, f2, o2 - f2)), f2 = c2, n2.wrap & 4 && (n2.flags ? l2 : Yi(l2)) !== n2.check) {
          e2.msg = `incorrect data check`, n2.mode = Ui;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.mode = Vi;
    case Vi:
      if (n2.wrap && n2.flags) {
        for (; u2 < 32; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (n2.wrap & 4 && l2 !== (n2.total & 4294967295)) {
          e2.msg = `incorrect length check`, n2.mode = Ui;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.mode = Hi;
    case Hi:
      w2 = li;
      break inf_leave;
    case Ui:
      w2 = fi;
      break inf_leave;
    case Wi:
      return pi;
    case Gi:
    default:
      return di;
  }
  return e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, (n2.wsize || f2 !== e2.avail_out && n2.mode < Ui && (n2.mode < Bi || t2 !== ai)) && sa(e2, e2.output, e2.next_out, f2 - e2.avail_out), d2 -= e2.avail_in, f2 -= e2.avail_out, e2.total_in += d2, e2.total_out += f2, n2.total += f2, n2.wrap & 4 && f2 && (e2.adler = n2.check = n2.flags ? Zt(n2.check, i2, f2, e2.next_out - f2) : Yt(n2.check, i2, f2, e2.next_out - f2)), e2.data_type = n2.bits + (n2.last ? 64 : 0) + (n2.mode === K ? 128 : 0) + (n2.mode === Ni || n2.mode === Oi ? 256 : 0), (d2 === 0 && f2 === 0 || t2 === ai) && w2 === ci && (w2 = mi), w2;
}, inflateEnd: (e2) => {
  if (Zi(e2)) return di;
  let t2 = e2.state;
  return t2.window &&= null, e2.state = null, ci;
}, inflateGetHeader: (e2, t2) => {
  if (Zi(e2)) return di;
  let n2 = e2.state;
  return n2.wrap & 2 ? (n2.head = t2, t2.done = false, ci) : di;
}, inflateSetDictionary: (e2, t2) => {
  let n2 = t2.length, r2, i2, a2;
  return Zi(e2) || (r2 = e2.state, r2.wrap !== 0 && r2.mode !== Ei) ? di : r2.mode === Ei && (i2 = 1, i2 = Yt(i2, t2, n2, 0), i2 !== r2.check) ? fi : (a2 = sa(e2, t2, n2, n2), a2 ? (r2.mode = Wi, pi) : (r2.havedict = 1, ci));
}, inflateInfo: `pako inflate (from Nodeca project)` };
function la() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = ``, this.comment = ``, this.hcrc = 0, this.done = false;
}
var ua = la, da = Object.prototype.toString, { Z_NO_FLUSH: fa, Z_FINISH: pa, Z_OK: ma, Z_STREAM_END: ha, Z_NEED_DICT: ga, Z_STREAM_ERROR: _a, Z_DATA_ERROR: va, Z_MEM_ERROR: ya, Z_BUF_ERROR: ba } = $t, xa = { chunkSize: 65536, windowBits: 15, to: `` };
function Sa(e2) {
  this.options = vr.assign({}, xa, e2 || {});
  let t2 = this.options;
  t2.raw && t2.windowBits >= 0 && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, t2.windowBits === 0 && (t2.windowBits = -15)), t2.windowBits >= 0 && t2.windowBits < 16 && !(e2 && e2.windowBits) && (t2.windowBits += 32), t2.windowBits > 15 && t2.windowBits < 48 && (t2.windowBits & 15 || (t2.windowBits |= 15)), this.err = 0, this.msg = ``, this.ended = false, this.chunks = [], this.strm = new Tr(), this.strm.avail_out = 0;
  let n2 = ca.inflateInit2(this.strm, t2.windowBits);
  if (n2 !== ma || (this.header = new ua(), ca.inflateGetHeader(this.strm, this.header), t2.dictionary && (typeof t2.dictionary == `string` ? t2.dictionary = Cr.string2buf(t2.dictionary) : da.call(t2.dictionary) === `[object ArrayBuffer]` && (t2.dictionary = new Uint8Array(t2.dictionary)), t2.raw && (n2 = ca.inflateSetDictionary(this.strm, t2.dictionary), n2 !== ma)))) throw Error(Qt[n2]);
}
Sa.prototype.push = function(e2, t2) {
  let n2 = this.strm, r2 = this.options.chunkSize, i2 = this.options.dictionary, a2, o2, s2;
  if (this.ended) return false;
  for (o2 = t2 === ~~t2 ? t2 : t2 === true ? pa : fa, n2.input = da.call(e2) === `[object ArrayBuffer]` ? new Uint8Array(e2) : e2, n2.next_in = 0, n2.avail_in = n2.input.length; ; ) {
    for (n2.avail_out === 0 && (n2.output = new Uint8Array(r2), n2.next_out = 0, n2.avail_out = r2), a2 = ca.inflate(n2, o2), a2 === ga && i2 && (a2 = ca.inflateSetDictionary(n2, i2), a2 === ma ? a2 = ca.inflate(n2, o2) : a2 === va && (a2 = ga)); n2.avail_in > 0 && a2 === ha && n2.state.wrap & 2 && n2.state.flags !== 0 && n2.input[n2.next_in] !== 0; ) ca.inflateReset(n2), a2 = ca.inflate(n2, o2);
    switch (a2) {
      case _a:
      case va:
      case ga:
      case ya:
        return this.onEnd(a2), this.ended = true, false;
    }
    if (s2 = n2.avail_out, n2.next_out && (n2.avail_out === 0 || a2 === ha || o2 > 0)) {
      if (this.options.to === `string`) {
        let e3 = Cr.utf8border(n2.output, n2.next_out), t3 = n2.next_out - e3, i3 = Cr.buf2string(n2.output, e3);
        n2.next_out = t3, n2.avail_out = r2 - t3, t3 && n2.output.set(n2.output.subarray(e3, e3 + t3), 0), this.onData(i3);
      } else this.onData(n2.output.length === n2.next_out ? n2.output : n2.output.subarray(0, n2.next_out)), n2.avail_out = 0, n2.next_out = 0;
    }
    if (a2 !== ma && a2 !== ba || s2 !== 0) {
      if (a2 === ha) return a2 = ca.inflateEnd(this.strm), this.onEnd(a2), this.ended = true, true;
      if (n2.avail_in === 0) {
        if (o2 === pa) return a2 = ca.inflateEnd(this.strm), this.onEnd(a2 === ma ? ba : a2), this.ended = true, false;
        break;
      }
    }
  }
  return true;
}, Sa.prototype.onData = function(e2) {
  this.chunks.push(e2);
}, Sa.prototype.onEnd = function(e2) {
  e2 === ma && (this.result = this.options.to === `string` ? this.chunks.join(``) : vr.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
};
function Ca(e2, t2) {
  let n2 = new Sa(t2);
  if (n2.push(e2, true), n2.err) throw n2.msg || Qt[n2.err];
  return n2.result;
}
function wa(e2, t2) {
  return t2 ||= {}, t2.raw = true, Ca(e2, t2);
}
var Ta = { Inflate: Sa, inflate: Ca, inflateRaw: wa, ungzip: Ca, constants: $t }, { Deflate: Ea, deflate: Da, deflateRaw: Oa, gzip: ka } = Vr, { Inflate: Aa, inflate: ja, inflateRaw: Ma, ungzip: Na } = Ta, Pa = Na, Fa = o(((e2) => {
  var t2 = Symbol.for(`react.transitional.element`), n2 = Symbol.for(`react.fragment`);
  function r2(e3, n3, r3) {
    var i2 = null;
    if (r3 !== void 0 && (i2 = `` + r3), n3.key !== void 0 && (i2 = `` + n3.key), `key` in n3) for (var a2 in r3 = {}, n3) a2 !== `key` && (r3[a2] = n3[a2]);
    else r3 = n3;
    return n3 = r3.ref, { $$typeof: t2, type: e3, key: i2, ref: n3 === void 0 ? null : n3, props: r3 };
  }
  e2.Fragment = n2, e2.jsx = r2, e2.jsxs = r2;
})), J = o(((e2, t2) => {
  t2.exports = Fa();
}))(), Ia = /* @__PURE__ */ new Map();
function La({ name: e2, label: t2, className: n2 = ``, loop: r2 = true }) {
  let i2 = (0, _.useRef)(null), [a2, o2] = (0, _.useState)(false);
  return (0, _.useEffect)(() => {
    let t3, n3 = false;
    o2(false);
    async function a3() {
      try {
        let a4 = Ia.get(e2);
        if (!a4) {
          let t4 = await fetch(`/generator/stickers/${e2}.tgs`, { cache: `force-cache` });
          if (!t4.ok) throw Error(`Sticker request failed: ${t4.status}`);
          let n4 = new Uint8Array(await t4.arrayBuffer());
          a4 = JSON.parse(Pa(n4, { to: `string` })), Ia.set(e2, a4);
        }
        if (n3 || !i2.current) return;
        let o3 = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
        t3 = Ge.default.loadAnimation({ container: i2.current, renderer: `svg`, loop: !o3 && r2, autoplay: !o3, animationData: a4, rendererSettings: { progressiveLoad: true, preserveAspectRatio: `xMidYMid meet` } }), o3 && t3.goToAndStop(0, true);
      } catch {
        n3 || o2(true);
      }
    }
    return a3(), () => {
      n3 = true, t3?.destroy();
    };
  }, [r2, e2]), (0, J.jsx)(`div`, { className: `sticker ${a2 ? `sticker--failed` : ``} ${n2}`, role: `img`, "aria-label": t2, children: (0, J.jsx)(`div`, { ref: i2, className: `sticker__canvas`, "aria-hidden": `true` }) });
}
var Ra = { ru: { "nav.home": `\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E TonSuite`, "nav.back": `\u041D\u0430\u0437\u0430\u0434`, "nav.source": `Open source`, "nav.language": `English version`, "nav.languageShort": `EN`, "status.local": `100% \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E`, "sticker.setup": `\u0423\u0442\u044F \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043A\u0440\u0430\u0441\u0438\u0432\u043E\u0435 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435`, "sticker.searching": `\u0423\u0442\u044F \u043E\u0445\u043E\u0442\u0438\u0442\u0441\u044F \u0437\u0430 \u0430\u0434\u0440\u0435\u0441\u043E\u043C`, "sticker.found": `\u0423\u0442\u044F \u043F\u0440\u0430\u0437\u0434\u043D\u0443\u0435\u0442 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441`, "sticker.seed": `\u0423\u0442\u044F \u0445\u0440\u0430\u043D\u0438\u0442 \u0441\u0435\u043A\u0440\u0435\u0442`, "setup.title": `\u041F\u043E\u0439\u043C\u0430\u0439 \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 TON-\u0430\u0434\u0440\u0435\u0441`, "setup.description": `\u0423\u0442\u044F \u043F\u0435\u0440\u0435\u0431\u0438\u0440\u0430\u0435\u0442 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0438 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0432\u0430\u0448\u0435\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u0410\u0434\u0440\u0435\u0441\u0430 \u0438 \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u044B \u043D\u0438\u043A\u0443\u0434\u0430 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F.`, "settings.title": `\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430`, "suffix.label": `\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430`, "suffix.required": `\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0441\u0438\u043C\u0432\u043E\u043B`, "suffix.characters": `\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B A\u2013Z, a\u2013z, 0\u20139, _ \u0438 -`, "suffix.maximum": `\u0414\u043E 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u2014 \u0434\u0430\u043B\u044C\u0448\u0435 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0431\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E`, "estimate.enter": `\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435`, "estimate.attempts": `\u2248 {count} \u043F\u043E\u043F\u044B\u0442\u043E\u043A`, "estimate.realistic": `\u2248 {count} \u043F\u043E\u043F\u044B\u0442\u043E\u043A \u2014 \u0440\u0435\u0430\u043B\u044C\u043D\u043E`, "estimate.long": `\u2248 {count} \u043F\u043E\u043F\u044B\u0442\u043E\u043A \u2014 \u043D\u0430\u0434\u043E\u043B\u0433\u043E`, "estimate.veryLong": `\u2248 {count} \u043F\u043E\u043F\u044B\u0442\u043E\u043A \u2014 \u043E\u0447\u0435\u043D\u044C \u043D\u0430\u0434\u043E\u043B\u0433\u043E`, "presets.label": `\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0439`, "wallet.title": `\u0412\u0435\u0440\u0441\u0438\u044F \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430`, "wallet.description": `\u0421\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u0430 \u0441 TON-\u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430\u043C\u0438`, "wallet.group": `\u0412\u0435\u0440\u0441\u0438\u044F \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430`, "wallet.recommended": `\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F`, "wallet.compatibility": `\u0421\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C`, "advanced.title": `\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E`, "mnemonic.title": `\u0421\u0438\u0434-\u0444\u0440\u0430\u0437\u0430`, "mnemonic.description": `\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F`, "mnemonic.12": `12 \u0441\u043B\u043E\u0432`, "mnemonic.24": `24 \u0441\u043B\u043E\u0432\u0430`, "mnemonic.fast": `\u0411\u044B\u0441\u0442\u0440\u0435\u0435`, "device.measure": `\u0410\u0432\u0442\u043E\u043F\u043E\u0434\u0431\u043E\u0440 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438`, "device.measureHint": `\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u0441\u0442 \xB7 \u043E\u043A\u043E\u043B\u043E {seconds} \u0441\u0435\u043A`, "device.measuring": `\u0422\u0435\u0441\u0442 {current}/{total} \xB7 {engine} \xB7 {count}`, "device.cancelMeasure": `\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u0441\u0442`, "device.measured": `\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043D\u0430`, "device.measuredValue": `{engine} \xB7 {count} \xB7 \u2248 {speed}/\u0441`, "device.measureFailed": `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u0440\u0438\u0442\u044C \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C`, "device.measureFailedHint": `\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 CPU \xB7 \u0410\u0432\u0442\u043E \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0442\u0435\u0441\u0442 \u0435\u0449\u0451 \u0440\u0430\u0437.`, "case.title": `\u0423\u0447\u0438\u0442\u044B\u0432\u0430\u0442\u044C \u0440\u0435\u0433\u0438\u0441\u0442\u0440`, "case.exact": `\u0422\u043E\u0447\u043D\u043E\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435: \u0441\u043B\u043E\u0436\u043D\u0435\u0435`, "case.relaxed": `MONEY \u0441\u043E\u0432\u043F\u0430\u0434\u0451\u0442 \u0441 money`, "threads.title": `\u041F\u043E\u0442\u043E\u043A\u0438 CPU`, "threads.description": `\u0411\u043E\u043B\u044C\u0448\u0435 \u043F\u043E\u0442\u043E\u043A\u043E\u0432 \u2014 \u0432\u044B\u0448\u0435 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438 \u043D\u0430\u0433\u0440\u0435\u0432`, "threads.gpuTitle": `GPU-\u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440\u044B`, "threads.gpuDescription": `{count} \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0445 WebGPU-\u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440\u043E\u0432`, "threads.auto": `\u0410\u0432\u0442\u043E \xB7 {count}`, "threads.maximum": `\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \xB7 {count}`, "threads.manual": `{count}`, "compute.title": `\u0423\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u0435`, "compute.description": `\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u0432\u0438\u0436\u043E\u043A`, "compute.cpu": `CPU`, "compute.cpuDescription": `\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \xB7 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0442\u043E\u043A\u043E\u0432`, "compute.gpu": `GPU \xB7 Beta`, "compute.gpuDescription": `\u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0435 WebGPU-\u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440\u044B \xB7 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438`, "compute.gpuUnavailable": `WebGPU \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432 \u044D\u0442\u043E\u043C \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435`, "compute.gpuPreparing": `\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0432\u0438\u0434\u0435\u043E\u043A\u0430\u0440\u0442\u0443\u2026`, "compute.mobileTitle": `\u0420\u0435\u0436\u0438\u043C \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430`, "compute.mobileDescription": `GPU \u0441\u043A\u0440\u044B\u0442, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E {count} CPU-\u043F\u043E\u0442\u043E\u043A\u0430 \u0431\u0435\u0437 \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0430\u0433\u0440\u0435\u0432\u0430`, "format.title": `\u0424\u043E\u0440\u043C\u0430\u0442 \u0430\u0434\u0440\u0435\u0441\u0430`, "format.nonBounceable": `Non-bounceable \xB7 \u0443\u0434\u043E\u0431\u043D\u043E \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F`, "format.bounceable": `Bounceable \xB7 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442`, "consent.title": `\u042F \u043F\u043E\u043D\u0438\u043C\u0430\u044E, \u043A\u0430\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0451\u043A`, "consent.description": `\u0415\u0441\u043B\u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u0434\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u044B, \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u0448\u0435\u043B\u0451\u043A \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E.`, "action.start": `\u041D\u0430\u0447\u0430\u0442\u044C \u043E\u0445\u043E\u0442\u0443`, "privacy.localCompute": `\u0412\u0441\u0451 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435`, "search.title": `\u0423\u0442\u044F \u0443\u0436\u0435 \u043E\u0445\u043E\u0442\u0438\u0442\u0441\u044F`, "search.description": `\u0418\u0449\u0435\u043C \u2026{suffix} \u0432 {version}-\u0430\u0434\u0440\u0435\u0441\u0430\u0445 \xB7 {engine}. \u041C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0439.`, "search.running": `\u041F\u0435\u0440\u0435\u0431\u043E\u0440 \u0438\u0434\u0451\u0442`, "search.attempts": `\u043F\u043E\u043F\u044B\u0442\u043E\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E`, "search.speed": `\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C`, "search.time": `\u0412\u0440\u0435\u043C\u044F`, "search.estimate": `\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440`, "search.sample": `\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442`, "search.preparing": `\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u2026`, "search.random": `\u041F\u043E\u0438\u0441\u043A \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043C\u043E\u0436\u0435\u0442 \u043E\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043A\u043E\u0440\u043E\u0447\u0435 \u0438\u043B\u0438 \u0434\u043B\u0438\u043D\u043D\u0435\u0435 \u0440\u0430\u0441\u0447\u0451\u0442\u0430.`, "search.stop": `\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C`, "search.paused": `\u041E\u0445\u043E\u0442\u0430 \u043D\u0430 \u043F\u0430\u0443\u0437\u0435`, "search.pause": `\u041F\u0430\u0443\u0437\u0430`, "search.resume": `\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C`, "search.power": `\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C`, "power.title": `\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u0438\u0441\u043A\u0430`, "power.description": `\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0434\u0432\u0438\u0436\u043E\u043A \u0438\u043B\u0438 \u0447\u0438\u0441\u043B\u043E \u043F\u043E\u0442\u043E\u043A\u043E\u0432. \u0421\u0447\u0451\u0442\u0447\u0438\u043A \u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F.`, "power.close": `\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u0438`, "power.current": `\u0411\u0443\u0434\u0435\u0442 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E: {count}`, "power.apply": `\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C`, "engine.cpu": `CPU \xB7 {count}`, "engine.gpu": `GPU \xB7 WebGPU`, "engine.gpuParallel": `GPU \xB7 {count} \u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440\u043E\u0432`, "eta.measuring": `\u0418\u0437\u043C\u0435\u0440\u044F\u0435\u043C\u2026`, "eta.minutes": `\u2248 {count} \u043C\u0438\u043D`, "eta.hours": `\u2248 {count} \u0447`, "eta.days": `\u2248 {count} \u0434\u043D`, "eta.years": `\u2248 {count} \u043B\u0435\u0442`, "found.status": `\u041D\u0430\u0439\u0434\u0435\u043D\u043E`, "found.title": `\u0412\u043E\u0442 \u044D\u0442\u043E \u0430\u0434\u0440\u0435\u0441!`, "found.description": `\u0423\u0442\u044F \u043D\u0430\u0448\u0451\u043B \u043D\u0443\u0436\u043D\u043E\u0435 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441, \u043F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0451\u043A.`, "found.copyAddress": `\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441`, "found.copiedAddress": `\u0410\u0434\u0440\u0435\u0441 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D`, "found.attempts": `\u041F\u043E\u043F\u044B\u0442\u043E\u043A`, "found.time": `\u0412\u0440\u0435\u043C\u044F`, "found.hiddenTitle": `\u0421\u0438\u0434 \u043F\u043E\u043A\u0430 \u0441\u043A\u0440\u044B\u0442`, "found.hiddenDescription": `\u041E\u043D \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u043F\u0430\u043C\u044F\u0442\u0438 \u044D\u0442\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0438 \u0438 \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F.`, "found.reveal": `\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u0430\u0434\u0440\u0435\u0441`, "found.revealPending": `\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0443\u2026`, "found.retry": `\u0418\u0441\u043A\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u0430\u0434\u0440\u0435\u0441`, "seedReady.status": `\u0421\u0438\u0434 \u0435\u0449\u0451 \u043D\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0442`, "seedReady.title": `\u0413\u043E\u0442\u043E\u0432\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043B\u044E\u0447?`, "seedReady.description": `\u0421\u0438\u0434-\u0444\u0440\u0430\u0437\u0430 \u0438\u0437 {count} \u0441\u043B\u043E\u0432 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F. \u0414\u043E \u044D\u0442\u043E\u0433\u043E \u043E\u043D\u0430 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430.`, "seedReady.check": `\u042F \u043D\u0430\u0445\u043E\u0436\u0443\u0441\u044C \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435`, "seedReady.checkDescription": `\u042D\u043A\u0440\u0430\u043D \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u0432\u0438\u0434\u0438\u0442, \u0437\u0430\u043F\u0438\u0441\u044C \u044D\u043A\u0440\u0430\u043D\u0430 \u0438 \u0442\u0440\u0430\u043D\u0441\u043B\u044F\u0446\u0438\u044F \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u044B.`, "seedReady.reveal": `\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0443`, "seedReady.back": `\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0430\u0434\u0440\u0435\u0441\u0443`, "seed.status": `\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0432\u0430\u0441`, "seed.title": `\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0443`, "seed.description": `\u042D\u0442\u043E \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u043A \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0443. \u0417\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u043B\u043E\u0432\u0430 \u043F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u0438 \u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u043E\u0444\u043B\u0430\u0439\u043D.`, "seed.warningTitle": `\u041D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0443`, "seed.warningDescription": `TonSuite \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u0442 \u044D\u0442\u0438 \u0441\u043B\u043E\u0432\u0430 \u0432 \u0447\u0430\u0442\u0435, \u0431\u043E\u0442\u0435 \u0438\u043B\u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0435.`, "seed.phrase": `\u0421\u0435\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u0444\u0440\u0430\u0437\u0430`, "seed.hide": `\u0421\u043A\u0440\u044B\u0442\u044C`, "seed.show": `\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C`, "seed.hidden": `\u0421\u0438\u0434-\u0444\u0440\u0430\u0437\u0430 \u0441\u043A\u0440\u044B\u0442\u0430`, "seed.copied": `\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E`, "seed.copy": `\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0443`, "seed.restart": `\u042F \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u043B \u2014 \u043D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E`, "seed.notStored": `\u0424\u0440\u0430\u0437\u0430 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435`, "footer.privacy": `\u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C`, "footer.utya": `\u0423\u0442\u044F`, "footer.author": `\u0410\u0432\u0442\u043E\u0440 \xB7 @rub1kub`, "footer.channel": `\u041A\u0430\u043D\u0430\u043B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430`, "huntModal.close": `\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E`, "huntModal.status": `\u041E\u0445\u043E\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430\u0441\u044C`, "huntModal.title": `\u0412\u0441\u0451 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u0438 \u0447\u0438\u043A\u0438-\u043F\u0443\u043A\u0438`, "huntModal.description": `\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0443\u0436\u0435 \u0438\u0449\u0435\u0442 \u0430\u0434\u0440\u0435\u0441 \u043D\u0430 \u0432\u0430\u0448\u0435\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u043A\u0430\u043D\u0430\u043B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u2014 \u0442\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F TonSuite, \u043D\u043E\u0432\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043D\u0438\u043A\u0430\u043A\u043E\u0439 \u0441\u043A\u0443\u043A\u0438.`, "huntModal.notification": `\u041A\u043E\u0433\u0434\u0430 \u043A\u043E\u0448\u0435\u043B\u0451\u043A \u043D\u0430\u0439\u0434\u0451\u0442\u0441\u044F, \u043F\u0440\u043E\u0437\u0432\u0443\u0447\u0438\u0442 \u0441\u0438\u0433\u043D\u0430\u043B \u0438 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u2014 \u0435\u0441\u043B\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442.`, "huntModal.subscribe": `\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u0430\u043D\u0430\u043B`, "huntModal.continue": `\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043E\u0445\u043E\u0442\u0443`, "notification.title": `TonSuite: \u043A\u043E\u0448\u0435\u043B\u0451\u043A \u043D\u0430\u0439\u0434\u0435\u043D!`, "notification.body": `\u0423\u0442\u044F \u043F\u043E\u0439\u043C\u0430\u043B TON-\u0430\u0434\u0440\u0435\u0441 \u0441 \u043D\u0443\u0436\u043D\u044B\u043C \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435\u043C. \u0412\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u0432\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0435\u0433\u043E.`, "error.generator": `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438\u043B\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440.`, "error.walletMissing": `\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u0448\u0435\u043B\u0451\u043A \u0443\u0436\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u043E\u0438\u0441\u043A \u0437\u0430\u043D\u043E\u0432\u043E.`, "error.clipboard": `\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0434\u0430\u043B \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0431\u0443\u0444\u0435\u0440\u0443 \u043E\u0431\u043C\u0435\u043D\u0430. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E.`, "error.gpuFallback": `GPU \u043D\u0435 \u043F\u0440\u043E\u0448\u0451\u043B \u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443. \u041F\u043E\u0438\u0441\u043A \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D \u043D\u0430 CPU.` }, en: { "nav.home": `Back to TonSuite home`, "nav.back": `Back`, "nav.source": `Open source`, "nav.language": `\u0420\u0443\u0441\u0441\u043A\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F`, "nav.languageShort": `RU`, "status.local": `100% local`, "sticker.setup": `Utya chooses a beautiful ending`, "sticker.searching": `Utya is hunting for an address`, "sticker.found": `Utya celebrates the address`, "sticker.seed": `Utya keeps the secret`, "setup.title": `Catch a beautiful TON address`, "setup.description": `Utya searches for wallets directly on your device. Addresses and recovery words are never sent anywhere.`, "settings.title": `Generator settings`, "suffix.label": `Address ending`, "suffix.required": `Enter at least one character`, "suffix.characters": `Use A\u2013Z, a\u2013z, 0\u20139, _ or -`, "suffix.maximum": `Up to 8 characters \u2014 longer searches are practically endless`, "estimate.enter": `Enter an ending`, "estimate.attempts": `\u2248 {count} attempts`, "estimate.realistic": `\u2248 {count} attempts \u2014 realistic`, "estimate.long": `\u2248 {count} attempts \u2014 a long search`, "estimate.veryLong": `\u2248 {count} attempts \u2014 extremely long`, "presets.label": `Ending examples`, "wallet.title": `Wallet version`, "wallet.description": `Compatible with TON wallets`, "wallet.group": `Wallet version`, "wallet.recommended": `Recommended`, "wallet.compatibility": `Compatibility`, "advanced.title": `Advanced`, "mnemonic.title": `Recovery phrase`, "mnemonic.description": `Choose the recovery standard`, "mnemonic.12": `12 words`, "mnemonic.24": `24 words`, "mnemonic.fast": `Faster`, "device.measure": `Auto-tune speed`, "device.measureHint": `Local test \xB7 about {seconds} sec`, "device.measuring": `Test {current}/{total} \xB7 {engine} \xB7 {count}`, "device.cancelMeasure": `Stop the local test`, "device.measured": `Speed tuned`, "device.measuredValue": `{engine} \xB7 {count} \xB7 \u2248 {speed}/s`, "device.measureFailed": `Speed test could not finish`, "device.measureFailedHint": `Use CPU \xB7 Auto or run the test again.`, "case.title": `Match letter case`, "case.exact": `Exact match: harder`, "case.relaxed": `MONEY also matches money`, "threads.title": `CPU workers`, "threads.description": `More workers increase load and heat`, "threads.gpuTitle": `GPU pipelines`, "threads.gpuDescription": `{count} parallel WebGPU pipelines`, "threads.auto": `Auto \xB7 {count}`, "threads.maximum": `Maximum \xB7 {count}`, "threads.manual": `{count}`, "compute.title": `Acceleration`, "compute.description": `Choose a compute engine`, "compute.cpu": `CPU`, "compute.cpuDescription": `Stable mode \xB7 multiple workers`, "compute.gpu": `GPU \xB7 Beta`, "compute.gpuDescription": `Parallel WebGPU pipelines \xB7 maximum throughput`, "compute.gpuUnavailable": `WebGPU is unavailable in this browser`, "compute.gpuPreparing": `Checking your graphics card\u2026`, "compute.mobileTitle": `Phone-friendly mode`, "compute.mobileDescription": `GPU is hidden and the default is {count} CPU workers to limit heat`, "format.title": `Address format`, "format.nonBounceable": `Non-bounceable \xB7 convenient for receiving`, "format.bounceable": `Bounceable \xB7 standard format`, "consent.title": `I understand how to save the wallet`, "consent.description": `If you close this tab before saving the recovery phrase, the found wallet cannot be recovered.`, "action.start": `Start hunting`, "privacy.localCompute": `Everything is computed on this device`, "search.title": `Utya is already hunting`, "search.description": `Searching for \u2026{suffix} in {version} addresses \xB7 {engine}. You may leave this tab open.`, "search.running": `Search in progress`, "search.attempts": `attempts checked`, "search.speed": `Speed`, "search.time": `Time`, "search.estimate": `Estimate`, "search.sample": `Latest candidate`, "search.preparing": `Preparing the generator\u2026`, "search.random": `The search is random. It may finish sooner or later than the estimate.`, "search.stop": `Stop`, "search.paused": `Hunt paused`, "search.pause": `Pause`, "search.resume": `Resume`, "search.power": `Power`, "power.title": `Search power`, "power.description": `Change the engine or worker count. Attempts and active time are preserved.`, "power.close": `Close power settings`, "power.current": `Will run: {count}`, "power.apply": `Apply power`, "engine.cpu": `CPU \xB7 {count}`, "engine.gpu": `GPU \xB7 WebGPU`, "engine.gpuParallel": `GPU \xB7 {count} pipelines`, "eta.measuring": `Measuring\u2026`, "eta.minutes": `\u2248 {count} min`, "eta.hours": `\u2248 {count} hr`, "eta.days": `\u2248 {count} days`, "eta.years": `\u2248 {count} years`, "found.status": `Found`, "found.title": `Now that is an address!`, "found.description": `Utya found the requested ending. Check the address before saving the wallet.`, "found.copyAddress": `Copy address`, "found.copiedAddress": `Address copied`, "found.attempts": `Attempts`, "found.time": `Time`, "found.hiddenTitle": `Recovery words are still hidden`, "found.hiddenDescription": `They exist only in this tab\u2019s memory and disappear when it is closed.`, "found.reveal": `Use this address`, "found.revealPending": `Preparing recovery words\u2026`, "found.retry": `Search for another address`, "seedReady.status": `Recovery words are not revealed`, "seedReady.title": `Ready to save the key?`, "seedReady.description": `The {count} words appear only after you confirm. Until then, they stay inside the generator.`, "seedReady.check": `I am in a private place`, "seedReady.checkDescription": `Nobody can see the screen, and screen recording or sharing is off.`, "seedReady.reveal": `Show the {count} words`, "seedReady.back": `Back to the address`, "seed.status": `Only for you`, "seed.title": `Save these {count} words`, "seed.description": `This is the only key to the wallet. Write the words down in order and store them offline.`, "seed.warningTitle": `Never share your recovery words`, "seed.warningDescription": `TonSuite will never ask for them in a chat, bot, or support message.`, "seed.phrase": `Recovery phrase`, "seed.hide": `Hide`, "seed.show": `Show`, "seed.hidden": `The {count} words are hidden`, "seed.copied": `Copied`, "seed.copy": `Copy {count} words`, "seed.restart": `I saved them \u2014 start again`, "seed.notStored": `The phrase is not stored in your browser`, "footer.privacy": `Privacy`, "footer.utya": `Utya`, "footer.author": `Author \xB7 @rub1kub`, "footer.channel": `Developer channel`, "huntModal.close": `Close dialog`, "huntModal.status": `The hunt has started`, "huntModal.title": `Free, local, and all good`, "huntModal.description": `The generator is already searching on your device. Follow the developer channel for TonSuite updates, new tools, and the fun bits.`, "huntModal.notification": `When the wallet is found, you will hear a chime and get a system notification if the browser allows it.`, "huntModal.subscribe": `Follow the channel`, "huntModal.continue": `Continue the hunt`, "notification.title": `TonSuite: wallet found!`, "notification.body": `Utya found a TON address with your ending. Return to this tab to check it.`, "error.generator": `The local generator could not start. Refresh the page or update your browser.`, "error.walletMissing": `The found wallet is no longer available. Start a new search.`, "error.clipboard": `The browser denied clipboard access. Copy the value manually.`, "error.gpuFallback": `GPU self-test failed. The search continued on CPU.` } };
function za(e2 = window.location.pathname) {
  return /^\/en(?:\/|$)/.test(e2) ? `en` : `ru`;
}
function Ba(e2, t2, n2 = {}) {
  let r2 = Ra[e2][t2];
  for (let [e3, t3] of Object.entries(n2)) r2 = r2.replaceAll(`{${e3}}`, String(t3));
  return r2;
}
function Va(e2) {
  return e2 === `en` ? `/en/generator/` : `/generator/`;
}
function Ha(e2) {
  return e2 === `en` ? `/en/` : `/`;
}
function Ua(e2) {
  return e2 === `en` ? `ru` : `en`;
}
function Wa(e2, t2) {
  return !Number.isFinite(e2) || e2 == null || e2 < 1 ? t2 : Math.max(1, Math.floor(e2));
}
function Ga(e2) {
  return Wa(e2, 4);
}
function Ka(e2) {
  let t2 = Math.max(1, Math.floor(e2)), n2 = t2 % 100, r2 = t2 % 10;
  return n2 >= 11 && n2 <= 14 ? `${t2} \u043F\u043E\u0442\u043E\u043A\u043E\u0432` : r2 === 1 ? `${t2} \u043F\u043E\u0442\u043E\u043A` : r2 >= 2 && r2 <= 4 ? `${t2} \u043F\u043E\u0442\u043E\u043A\u0430` : `${t2} \u043F\u043E\u0442\u043E\u043A\u043E\u0432`;
}
function qa(e2) {
  if (typeof e2?.userAgentData?.mobile == `boolean`) return e2.userAgentData.mobile;
  let t2 = e2?.userAgent ?? ``;
  return /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(t2) ? true : e2?.platform === `MacIntel` && (e2.maxTouchPoints ?? 0) > 1;
}
function Ja(e2, t2, n2) {
  let r2 = n2 ? [1, t2, e2] : [1, Math.min(4, e2), Math.ceil(e2 / 2), t2, e2];
  return [...new Set(r2)].filter((t3) => t3 >= 1 && t3 <= e2).sort((e3, t3) => e3 - t3);
}
function Ya(e2, t2 = 32) {
  let n2 = Ga(e2), r2 = typeof t2 == `number` ? { stabilityCap: t2 } : t2, i2 = r2.isMobile ?? false, a2 = Wa(r2.stabilityCap, 32), o2 = i2 ? Math.min(a2, 8) : a2, s2 = Math.min(n2, o2), c2 = Math.min(s2, 2), l2 = n2 > s2;
  return { deviceClass: i2 ? `mobile` : `desktop`, isMobile: i2, gpuAllowed: !i2, reportedCoreCount: n2, stabilityCap: o2, maximumWorkerCount: s2, autoWorkerCount: c2, defaultWorkerCount: c2, isCapped: l2, workerCountOptions: Array.from({ length: s2 }, (e3, t3) => t3 + 1), recommendedWorkerCounts: Ja(s2, c2, i2), choices: [{ mode: `auto`, label: `\u0410\u0432\u0442\u043E`, description: i2 ? `\u0429\u0430\u0434\u044F\u0449\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \xB7 ${Ka(c2)}` : `\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0440\u0435\u0436\u0438\u043C WebCrypto \xB7 ${Ka(c2)}`, workerCount: c2 }, { mode: `maximum`, label: `\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C`, description: i2 ? `\u041F\u0438\u043A\u043E\u0432\u0430\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \xB7 ${Ka(s2)}` : l2 ? `\u041B\u0438\u043C\u0438\u0442 \u0434\u043B\u044F \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \xB7 ${Ka(s2)}` : `\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u044F\u0434\u0440\u0430 \xB7 ${Ka(s2)}`, workerCount: s2 }] };
}
function Xa(e2 = typeof navigator > `u` ? void 0 : navigator) {
  return Ya(e2?.hardwareConcurrency, { isMobile: qa(e2) });
}
function Za(e2, t2) {
  return e2 === `auto` ? t2.autoWorkerCount : e2 === `maximum` ? t2.maximumWorkerCount : Number.isFinite(e2) ? Math.min(t2.maximumWorkerCount, Math.max(1, Math.floor(e2))) : t2.autoWorkerCount;
}
function Qa(e2, t2) {
  let n2 = Math.max(1, Math.floor(t2));
  return e2 === `cpu` ? Array.from({ length: n2 }, () => `cpu`) : Array.from({ length: n2 }, () => `gpu`);
}
var $a = 96;
function eo(e2, t2) {
  return !Number.isFinite(e2) || e2 === void 0 || e2 < 1 ? t2 : Math.max(1, Math.floor(e2));
}
function to(e2) {
  if (typeof e2 == `string`) return e2.replace(/[\u0000-\u001f\u007f-\u009f]/g, ` `).replace(/\s+/g, ` `).trim().slice(0, $a) || void 0;
}
function no(e2) {
  if (!(!Number.isFinite(e2) || e2 === void 0 || e2 <= 0)) return Math.min(64, Math.max(0.25, Math.round(e2 * 4) / 4));
}
function ro(e2) {
  if (typeof e2?.userAgentData?.mobile == `boolean`) return e2.userAgentData.mobile;
  let t2 = e2?.userAgent ?? ``;
  return /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(t2) ? true : e2?.platform === `MacIntel` && (e2.maxTouchPoints ?? 0) > 1;
}
function Y(e2) {
  if (/\b(?:arm64|aarch64)\b/i.test(e2)) return `arm64`;
  if (/\b(?:armv\d+[a-z]*|arm)\b/i.test(e2)) return `arm`;
  if (/\b(?:x86_64|amd64|x64|Win64)\b/i.test(e2)) return `x86_64`;
  if (/\b(?:i[3-6]86|x86)\b/i.test(e2)) return `x86`;
}
function io(e2) {
  if (/\b(?:arm64|aarch64|x86_64|amd64|x64|Win64)\b/i.test(e2)) return `64`;
  if (/\b(?:armv\d+[a-z]*|i[3-6]86|x86)\b/i.test(e2)) return `32`;
}
function ao(e2, t2, n2 = 0) {
  let r2 = e2.match(/;\s*([^;()]+?)\s+Build\//i)?.[1];
  if (r2) return to(r2);
  if (/\biPad\b/i.test(e2)) return `iPad`;
  if (/\biPhone\b/i.test(e2)) return `iPhone`;
  if (/\biPod\b/i.test(e2)) return `iPod`;
  if (t2 === `MacIntel` && n2 > 1) return `iPad`;
}
function oo(e2, t2, n2 = 0) {
  return /Android/i.test(e2) ? `Android` : /iPhone|iPad|iPod/i.test(e2) ? `iOS` : t2 === `MacIntel` && n2 > 1 ? `iPadOS` : /Windows/i.test(e2) ? `Windows` : /Macintosh|Mac OS X/i.test(e2) ? `macOS` : /Linux/i.test(e2) ? `Linux` : to(t2);
}
function so(e2) {
  let t2;
  try {
    t2 = e2.info;
  } catch {
    return;
  }
  if (!t2) return;
  let n2 = {};
  for (let e3 of [`vendor`, `architecture`, `device`, `description`]) try {
    let r2 = to(t2[e3]);
    r2 && (n2[e3] = r2);
  } catch {
  }
  return Object.keys(n2).length > 0 ? n2 : void 0;
}
async function co(e2) {
  if (!e2 || typeof e2.requestAdapter != `function`) return { apiAvailable: false, adapterAvailable: false };
  try {
    let t2 = await e2.requestAdapter({ powerPreference: `high-performance` });
    return t2 ? { apiAvailable: true, adapterAvailable: true, adapterInfo: so(t2) } : { apiAvailable: true, adapterAvailable: false };
  } catch {
    return { apiAvailable: true, adapterAvailable: false };
  }
}
function lo() {
  return typeof navigator > `u` ? null : navigator;
}
async function uo(e2 = {}) {
  let t2 = e2.navigator === void 0 ? lo() : e2.navigator, n2 = e2.gpu === void 0 ? t2?.gpu : e2.gpu, r2 = t2?.userAgent ?? ``, i2 = ro(t2), a2 = `${r2} ${t2?.platform ?? ``}`, o2 = t2?.userAgentData, s2;
  if (typeof o2?.getHighEntropyValues == `function`) try {
    s2 = await o2.getHighEntropyValues([`architecture`, `bitness`, `model`, `platform`]);
  } catch {
  }
  let c2 = to(s2?.architecture), l2 = to(s2?.bitness), u2 = to(s2?.model), d2 = to(s2?.platform), f2 = !!(c2 || l2 || u2 || d2), p2 = c2 ?? Y(a2), m2 = l2 ?? io(a2), h2 = u2 ?? ao(r2, t2?.platform, t2?.maxTouchPoints), g2 = d2 ?? to(o2?.platform) ?? oo(r2, t2?.platform, t2?.maxTouchPoints), _2 = `unavailable`;
  return (p2 || m2 || h2 || g2) && (_2 = f2 ? `client-hints` : r2 ? `user-agent-fallback` : `navigator-fallback`), { localOnly: true, hardwareConcurrency: eo(t2?.hardwareConcurrency, 4), mobile: i2, architecture: p2, bitness: m2, model: h2, platform: g2, deviceMemoryGiB: no(t2?.deviceMemory), hardwareDetailsSource: _2, webgpu: i2 ? { apiAvailable: !!n2, adapterAvailable: false } : await co(n2) };
}
function fo(e2) {
  return Array.from({ length: Math.max(0, e2) }, (e3, t2) => t2 + 1);
}
function po(e2) {
  let t2 = eo(e2.hardwareConcurrency, 4), n2 = e2.mobile ? 8 : 32, r2 = Math.min(t2, n2), i2 = Math.min(2, r2), a2 = !e2.mobile && e2.webgpu.adapterAvailable, o2 = a2 ? Math.min(8, Math.max(1, Math.ceil(t2 / 2))) : 0, s2 = a2 ? Math.min(16, Math.max(1, t2 * 2)) : 0;
  return { recommendedEngine: a2 ? `gpu` : `cpu`, cpu: { balancedWorkerCount: i2, peakWorkerCount: r2, workerCountOptions: fo(r2) }, gpu: { allowed: a2, balancedLaneCount: o2, peakLaneCount: s2, laneCountOptions: fo(s2) } };
}
var mo = 1800, ho = 2400;
function go(e2, t2) {
  return !Number.isFinite(e2) || e2 < 1 ? t2 : Math.max(1, Math.floor(e2));
}
function _o(e2, t2) {
  let n2 = [], r2 = /* @__PURE__ */ new Set();
  for (let i2 of e2) {
    if (!Number.isFinite(i2)) continue;
    let e3 = Math.floor(i2);
    e3 < 1 || t2 !== void 0 && e3 > t2 || r2.has(e3) || (r2.add(e3), n2.push(e3));
  }
  return n2;
}
function vo(e2) {
  let t2 = go(e2, 1), n2 = [];
  for (let e3 = 1; e3 < t2; e3 *= 2) n2.push(e3);
  return n2.push(t2), _o(n2, t2);
}
function yo({ profile: e2, recommendation: t2, maxCpuWorkers: n2, cpuDurationMs: r2 = mo, gpuDurationMs: i2 = ho }) {
  let a2 = go(n2, 1), o2 = Math.min(a2, go(t2.cpu.peakWorkerCount, a2)), s2 = go(r2, mo), c2 = go(i2, ho), l2 = vo(o2).map((e3) => ({ engine: `cpu`, count: e3, durationMs: s2 }));
  if (!e2.mobile && e2.webgpu.adapterAvailable && t2.gpu.allowed) {
    let e3 = go(t2.gpu.peakLaneCount, 1);
    for (let t3 of vo(e3)) l2.push({ engine: `gpu`, count: t3, durationMs: c2 });
  }
  return l2;
}
function bo(e2) {
  return e2.valid && e2.failed !== true && e2.fallback !== true && Number.isFinite(e2.attemptsPerSecond) && e2.attemptsPerSecond > 0 && Number.isInteger(e2.count) && e2.count > 0;
}
function xo(e2) {
  let t2 = null;
  for (let n2 of e2) bo(n2) && (t2 === null || n2.attemptsPerSecond > t2.attemptsPerSecond || n2.attemptsPerSecond === t2.attemptsPerSecond && n2.count < t2.count || n2.attemptsPerSecond === t2.attemptsPerSecond && n2.count === t2.count && n2.engine === `cpu` && t2.engine === `gpu`) && (t2 = n2);
  return t2;
}
var So = [`GRAM`, `MONEY`, `TON`, `DUCK`], Co = 16;
function wo(e2) {
  return Math.min(Co, Math.max(1, e2.maximumWorkerCount * 2));
}
function To(e2, t2, n2) {
  if (e2 === `cpu`) return Za(t2, n2);
  if (t2 === `auto`) return Math.min(8, Math.max(1, Math.ceil(n2.maximumWorkerCount / 2)));
  let r2 = wo(n2);
  return t2 === `maximum` ? r2 : Number.isFinite(t2) ? Math.min(r2, Math.max(1, Math.floor(t2))) : Math.min(8, r2);
}
function Eo(e2, t2) {
  if (!e2) return 0;
  if (t2) return 64 ** e2.length;
  let n2 = [...e2].filter((e3) => /[a-z]/i.test(e3)).length;
  return 64 ** e2.length / 2 ** n2;
}
function Do(e2, t2) {
  return Number.isFinite(e2) ? new Intl.NumberFormat(t2 === `ru` ? `ru-RU` : `en-US`, { notation: e2 >= 1e4 ? `compact` : `standard`, maximumFractionDigits: 1 }).format(Math.round(e2)) : `\u221E`;
}
function Oo(e2) {
  let t2 = Math.max(0, Math.floor(e2 / 1e3)), n2 = Math.floor(t2 / 3600), r2 = Math.floor(t2 % 3600 / 60), i2 = t2 % 60;
  return n2 > 0 ? `${n2}:${String(r2).padStart(2, `0`)}:${String(i2).padStart(2, `0`)}` : `${String(r2).padStart(2, `0`)}:${String(i2).padStart(2, `0`)}`;
}
function ko({ locale: e2 }) {
  return (0, J.jsxs)(`a`, { className: `brand`, href: Ha(e2), "aria-label": Ba(e2, `nav.home`), children: [(0, J.jsx)(`img`, { src: `/generator/brand/tonsuite-icon.jpg`, width: `38`, height: `38`, alt: ``, "aria-hidden": `true` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`b`, { children: `Ton` }), `Suite`] })] });
}
function Ao({ locale: e2 }) {
  return (0, J.jsxs)(`span`, { className: `local-pill`, children: [(0, J.jsx)(`span`, { className: `local-pill__dot` }), Ba(e2, `status.local`)] });
}
function jo({ screen: e2, locale: t2 }) {
  let n2 = { setup: { name: `thinking`, label: `sticker.setup` }, searching: { name: `hunting`, label: `sticker.searching` }, found: { name: `success`, label: `sticker.found` }, "seed-ready": { name: `secret`, label: `sticker.seed` }, seed: { name: `secret`, label: `sticker.seed` } }[e2];
  return (0, J.jsx)(La, { name: n2.name, label: Ba(t2, n2.label) });
}
function Mo({ address: e2, suffix: t2 }) {
  let n2 = e2.slice(0, Math.max(0, e2.length - t2.length)), r2 = e2.slice(-t2.length);
  return (0, J.jsxs)(`span`, { className: `address-text`, children: [n2, (0, J.jsx)(`strong`, { children: r2 })] });
}
function No() {
  let [e2, t2] = (0, _.useState)(() => za()), n2 = (0, _.useCallback)((t3, n3 = {}) => Ba(e2, t3, n3), [e2]), r2 = (0, _.useMemo)(() => Xa(), []), [i2, a2] = (0, _.useState)(null), [o2, s2] = (0, _.useState)(`setup`), [c2, l2] = (0, _.useState)(`GRAM`), [u2, d2] = (0, _.useState)(`w5`), [f2, p2] = (0, _.useState)(`multichain-12`), [m2, h2] = (0, _.useState)(`non-bounceable`), [g2, v2] = (0, _.useState)(false), [y2, b2] = (0, _.useState)(false), [x2, S2] = (0, _.useState)(`auto`), [C2, w2] = (0, _.useState)(`cpu`), [T2, E2] = (0, _.useState)(`cpu`), [D2, O2] = (0, _.useState)(``), [k2, A2] = (0, _.useState)(``), ee2 = (0, _.useMemo)(() => typeof navigator < `u` && `gpu` in navigator && r2.gpuAllowed, [r2.gpuAllowed]), [j2, M2] = (0, _.useState)({ attempts: 0, elapsedMs: 0, attemptsPerSecond: 0, sampleAddress: `` }), [N2, te2] = (0, _.useState)(null), [P2, F2] = (0, _.useState)(null), [ne2, re2] = (0, _.useState)(``), [ie2, I2] = (0, _.useState)(null), [L2, oe2] = (0, _.useState)(false), [ce2, ue2] = (0, _.useState)(false), [R2, z2] = (0, _.useState)(false), [me2, ge2] = (0, _.useState)(false), [ve2, be2] = (0, _.useState)(false), [B2, Ce2] = (0, _.useState)(`cpu`), [Te2, De2] = (0, _.useState)(`auto`), [ke2, je2] = (0, _.useState)(0), [V2, Pe2] = (0, _.useState)(false), [Ie2, Re2] = (0, _.useState)(null), [Be2, He2] = (0, _.useState)(null), [Ue2, We2] = (0, _.useState)(false), Ge2 = (0, _.useRef)([]), Ke2 = (0, _.useRef)(null), qe2 = (0, _.useRef)(/* @__PURE__ */ new Map()), Je2 = (0, _.useRef)(/* @__PURE__ */ new Map()), Ye2 = (0, _.useRef)(0), Xe2 = (0, _.useRef)(0), Ze2 = (0, _.useRef)(0), U2 = (0, _.useRef)(0), Qe2 = (0, _.useRef)({ attempts: 0, elapsedMs: 0, attemptsPerSecond: 0, sampleAddress: `` }), $e2 = (0, _.useRef)(false), et2 = (0, _.useRef)(void 0), tt2 = (0, _.useRef)(0), nt2 = (0, _.useRef)(null), rt2 = (0, _.useRef)(null), it2 = (0, _.useRef)([]), at2 = (0, _.useRef)(0), ot2 = (0, _.useRef)(null), st2 = (0, _.useMemo)(() => i2 ? po(i2) : null, [i2]), ct2 = (0, _.useMemo)(() => i2 && st2 ? yo({ profile: i2, recommendation: st2, maxCpuWorkers: r2.maximumWorkerCount }) : [], [r2.maximumWorkerCount, i2, st2]), lt2 = Math.ceil(ct2.reduce((e3, t3) => e3 + t3.durationMs, 0) / 1e3), ut2 = i2 ? i2.webgpu.adapterAvailable && !i2.mobile : ee2, dt2 = c2.trim(), ft2 = To(C2, x2, r2), pt2 = C2 === `gpu` ? Array.from({ length: wo(r2) }, (e3, t3) => t3 + 1) : r2.workerCountOptions, mt2 = To(C2, `auto`, r2), ht2 = To(C2, `maximum`, r2), gt2 = To(B2, Te2, r2), _t2 = B2 === `gpu` ? Array.from({ length: wo(r2) }, (e3, t3) => t3 + 1) : r2.workerCountOptions, vt2 = To(B2, `auto`, r2), yt2 = To(B2, `maximum`, r2), bt2 = (0, _.useMemo)(() => dt2 ? /^[A-Za-z0-9_-]+$/.test(dt2) ? dt2.length > 8 ? n2(`suffix.maximum`) : `` : n2(`suffix.characters`) : n2(`suffix.required`), [dt2, n2]), xt2 = (0, _.useMemo)(() => Eo(dt2, g2), [g2, dt2]);
  (0, _.useEffect)(() => {
    let t3 = e2 === `en`;
    document.documentElement.lang = e2, document.title = t3 ? `TON Vanity Address Generator \u2014 TonSuite` : `TON Vanity Generator \u2014 TonSuite`;
    let n3 = t3 ? `Generate vanity TON Wallet v4R2 and W5 addresses locally. Address search and recovery phrases stay in your browser.` : `\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0445 TON-\u0430\u0434\u0440\u0435\u0441\u043E\u0432 v4R2 \u0438 W5. \u041F\u0435\u0440\u0435\u0431\u043E\u0440 \u0438 \u0441\u0438\u0434-\u0444\u0440\u0430\u0437\u0430 \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0432\u0430\u0448\u0435\u043C \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.`;
    document.querySelector(`meta[name="description"]`)?.setAttribute(`content`, n3), document.querySelector(`link[rel="canonical"]`)?.setAttribute(`href`, t3 ? `https://tonsuite.org/en/generator/` : `https://tonsuite.org/generator/`), document.querySelector(`meta[property="og:url"]`)?.setAttribute(`content`, t3 ? `https://tonsuite.org/en/generator/` : `https://tonsuite.org/generator/`);
  }, [e2]), (0, _.useEffect)(() => {
    let e3 = false;
    return uo().then((t3) => {
      e3 || a2(t3);
    }).catch(() => {
      e3 || a2(null);
    }), () => {
      e3 = true;
    };
  }, []), (0, _.useEffect)(() => {
    let e3 = document.querySelector(`#generator-main h1`);
    window.requestAnimationFrame(() => e3?.focus());
  }, [o2]), (0, _.useEffect)(() => {
    let e3 = () => t2(za());
    return window.addEventListener(`popstate`, e3), () => window.removeEventListener(`popstate`, e3);
  }, []);
  let St2 = (0, _.useCallback)((t3) => {
    if (!t3) return n2(`estimate.enter`);
    let r3 = Do(t3, e2);
    return n2(t3 < 1e3 ? `estimate.attempts` : t3 < 1e8 ? `estimate.realistic` : t3 < 1e10 ? `estimate.long` : `estimate.veryLong`, { count: r3 });
  }, [e2, n2]), Ct2 = (0, _.useCallback)((e3) => {
    if (!Number.isFinite(e3) || e3 <= 0) return n2(`eta.measuring`);
    let t3 = e3 / 36e5;
    if (t3 < 1) return n2(`eta.minutes`, { count: Math.max(1, Math.round(e3 / 6e4)) });
    if (t3 < 48) return n2(`eta.hours`, { count: Math.round(t3) });
    let r3 = t3 / 24;
    return r3 < 730 ? n2(`eta.days`, { count: Math.round(r3) }) : n2(`eta.years`, { count: Math.round(r3 / 365) });
  }, [n2]), wt2 = (0, _.useCallback)((e3) => {
    Qe2.current = e3, M2(e3);
  }, []), Tt2 = (0, _.useCallback)(() => {
    Ye2.current += 1, Ge2.current.forEach((e3) => {
      e3.postMessage({ type: `stop` }), e3.terminate();
    }), Ge2.current = [], Ke2.current = null, qe2.current.clear(), Je2.current.clear();
  }, []), Et2 = (0, _.useCallback)(() => {
    it2.current.forEach((e3) => {
      e3.postMessage({ type: `stop` }), window.setTimeout(() => e3.terminate(), 50);
    }), it2.current = [];
  }, []), Dt2 = (0, _.useCallback)(() => {
    at2.current += 1, ot2.current?.(), ot2.current = null, Et2(), Pe2(false), Re2(null);
  }, [Et2]);
  (0, _.useEffect)(() => Tt2, [Tt2]), (0, _.useEffect)(() => () => {
    at2.current += 1, ot2.current?.(), ot2.current = null, Et2();
  }, [Et2]), (0, _.useEffect)(() => {
    if (!V2) return;
    let e3 = () => {
      document.visibilityState === `hidden` && Dt2();
    };
    return document.addEventListener(`visibilitychange`, e3), window.addEventListener(`pagehide`, Dt2), () => {
      document.removeEventListener(`visibilitychange`, e3), window.removeEventListener(`pagehide`, Dt2);
    };
  }, [V2, Dt2]), (0, _.useEffect)(() => () => {
    nt2.current?.close().catch(() => void 0), nt2.current = null;
  }, []), (0, _.useEffect)(() => {
    if (!R2) return;
    window.requestAnimationFrame(() => rt2.current?.focus());
    let e3 = (e4) => {
      if (e4.key === `Escape`) {
        z2(false);
        return;
      }
      if (e4.key !== `Tab`) return;
      let t3 = [...document.querySelectorAll(`.hunt-modal button:not(:disabled), .hunt-modal a[href]`)], n3 = t3.at(0), r3 = t3.at(-1);
      !n3 || !r3 || (e4.shiftKey && document.activeElement === n3 ? (e4.preventDefault(), r3.focus()) : !e4.shiftKey && document.activeElement === r3 && (e4.preventDefault(), n3.focus()));
    };
    return window.addEventListener(`keydown`, e3), () => window.removeEventListener(`keydown`, e3);
  }, [R2]), (0, _.useEffect)(() => {
    if (o2 !== `searching` || me2) return;
    let e3 = window.setInterval(() => {
      let e4 = Ze2.current + Math.max(0, Date.now() - U2.current);
      M2((t3) => {
        let n3 = { ...t3, elapsedMs: e4 };
        return Qe2.current = n3, n3;
      });
    }, 250);
    return () => window.clearInterval(e3);
  }, [me2, o2]), (0, _.useEffect)(() => {
    if (o2 !== `found` && o2 !== `seed-ready` && o2 !== `seed`) return;
    let e3 = (e4) => e4.preventDefault();
    return window.addEventListener(`beforeunload`, e3), () => window.removeEventListener(`beforeunload`, e3);
  }, [o2]);
  let Ot2 = (0, _.useCallback)(() => {
    let t3 = [...qe2.current.values()];
    if (!t3.length) return;
    let n3 = t3.reduce((e3, t4) => t4.elapsedMs > e3.elapsedMs ? t4 : e3), r3 = Xe2.current + t3.reduce((e3, t4) => e3 + t4.attempts, 0), i3 = t3.reduce((e3, t4) => e3 + t4.attemptsPerSecond, 0);
    wt2({ attempts: r3, attemptsPerSecond: t3.reduce((e3, t4) => e3 + t4.attemptsPerSecond, 0), elapsedMs: Ze2.current + Math.max(0, Date.now() - U2.current), sampleAddress: n3.sampleAddress });
    let a3 = Date.now();
    a3 - tt2.current >= 4e3 && (A2(`${Do(r3, e2)} \xB7 ${Do(i3, e2)}/s`), tt2.current = a3);
  }, [e2, wt2]), kt2 = (0, _.useCallback)(() => {
    let e3 = window.AudioContext ?? window.webkitAudioContext;
    if (!nt2.current && e3) try {
      nt2.current = new e3();
    } catch {
    }
    nt2.current?.resume().catch(() => void 0), `Notification` in window && Notification.permission === "default" && Notification.requestPermission().catch(() => void 0);
  }, []), At2 = (0, _.useCallback)(() => {
    let e3 = nt2.current;
    if (e3 && e3.resume().then(() => {
      let t3 = e3.currentTime, n3 = e3.createGain();
      n3.gain.setValueAtTime(1e-4, t3), n3.gain.exponentialRampToValueAtTime(0.22, t3 + 0.025), n3.gain.exponentialRampToValueAtTime(1e-4, t3 + 1.15), n3.connect(e3.destination), [659.25, 783.99, 1046.5].forEach((r3, i3) => {
        let a3 = e3.createOscillator(), o3 = e3.createGain(), s3 = t3 + i3 * 0.18;
        a3.type = `sine`, a3.frequency.setValueAtTime(r3, s3), o3.gain.setValueAtTime(1e-4, s3), o3.gain.exponentialRampToValueAtTime(1, s3 + 0.018), o3.gain.exponentialRampToValueAtTime(1e-4, s3 + 0.34), a3.connect(o3), o3.connect(n3), a3.start(s3), a3.stop(s3 + 0.36);
      });
    }).catch(() => void 0), `Notification` in window && Notification.permission === `granted`) try {
      new Notification(n2(`notification.title`), { body: n2(`notification.body`), icon: `/generator/brand/tonsuite-icon.jpg`, tag: `tonsuite-wallet-found` });
    } catch {
    }
  }, [n2]), jt2 = (0, _.useCallback)(() => {
    let e3 = [...qe2.current.values()], t3 = e3.length ? e3.reduce((e4, t4) => t4.elapsedMs > e4.elapsedMs ? t4 : e4) : Qe2.current;
    return { attempts: Xe2.current + e3.reduce((e4, t4) => e4 + t4.attempts, 0), attemptsPerSecond: e3.reduce((e4, t4) => e4 + t4.attemptsPerSecond, 0), elapsedMs: Ze2.current + (U2.current > 0 ? Math.max(0, Date.now() - U2.current) : 0), sampleAddress: t3.sampleAddress };
  }, []), Mt2 = (0, _.useCallback)(() => {
    let e3 = jt2();
    Xe2.current = e3.attempts, Ze2.current = e3.elapsedMs, U2.current = 0;
    let t3 = { ...e3, attemptsPerSecond: 0 };
    return wt2(t3), Tt2(), t3;
  }, [jt2, Tt2, wt2]), Nt2 = (0, _.useCallback)((t3, i3) => {
    let a3 = t3 === `gpu` && ut2 && r2.gpuAllowed ? `gpu` : `cpu`, o3 = Qa(a3, To(a3, i3, r2)), c3 = Ye2.current + 1;
    Ye2.current = c3, U2.current = Date.now(), E2(a3), je2(o3.length);
    let l3 = { suffix: dt2, version: u2, addressFormat: m2, caseSensitive: g2, engine: a3, locale: e2, mnemonicScheme: f2 }, d3 = o3.map((e3, t4) => {
      let r3 = new Worker(new URL(`/generator/assets/vanity.worker-CItyiGg3.js`, `` + import.meta.url), { type: `module`, name: `ton-vanity-${e3}-${t4}` });
      return r3.onmessage = (e4) => {
        if (c3 !== Ye2.current) return;
        let t5 = e4.data;
        if (t5.type === `engine` && (Je2.current.set(t5.workerId, t5.engine), [...Je2.current.values()].includes(`gpu`) ? E2(`gpu`) : Je2.current.size === o3.length && E2(`cpu`), t5.fallbackReason && O2(n2(`error.gpuFallback`))), t5.type === `progress` && (qe2.current.set(t5.workerId, t5.progress), Ot2()), t5.type === `candidate`) {
          if (Ke2.current && Ke2.current !== r3) {
            r3.postMessage({ type: `stop` }), r3.terminate();
            return;
          }
          Ke2.current = r3, qe2.current.set(t5.workerId, { attempts: t5.candidate.attempts, attemptsPerSecond: 0, elapsedMs: t5.candidate.elapsedMs, sampleAddress: t5.candidate.address });
          let e5 = Xe2.current + [...qe2.current.values()].reduce((e6, t6) => e6 + t6.attempts, 0), i4 = Ze2.current + Math.max(0, Date.now() - U2.current);
          te2({ ...t5.candidate, attempts: e5, elapsedMs: i4 }), A2(n2(`found.status`)), Ge2.current.forEach((e6) => {
            e6 !== r3 && (e6.postMessage({ type: `stop` }), e6.terminate());
          }), Ge2.current = [r3], At2(), s2(`found`);
        }
        t5.type === `revealed` && (F2(t5.wallet), oe2(true), ue2(false), A2(n2(`seed.title`, { count: t5.wallet.mnemonicScheme === `ton-24` ? 24 : 12 })), s2(`seed`), Tt2()), t5.type === `error` && (re2(t5.message || n2(`error.generator`)), s2(`setup`), Tt2());
      }, r3.onerror = () => {
        c3 === Ye2.current && (re2(n2(`error.generator`)), s2(`setup`), Tt2());
      }, r3.postMessage({ type: `start`, options: { ...l3, engine: e3 }, workerId: t4 }), r3;
    });
    Ge2.current = d3;
  }, [m2, Ot2, At2, g2, dt2, r2, ut2, e2, f2, Tt2, n2, u2]), Pt2 = (0, _.useCallback)((t3, n3) => new Promise((r3) => {
    let i3 = /* @__PURE__ */ new Map(), a3 = /* @__PURE__ */ new Map(), o3 = /* @__PURE__ */ new Map(), s3 = [], c3 = false, l3 = false, d3 = false, p3 = false, h3 = 0, g3 = 0, _2 = () => {
      if (d3) return;
      d3 = true, window.clearTimeout(h3), window.clearTimeout(g3), s3.forEach((e4) => {
        e4.postMessage({ type: `stop` }), window.setTimeout(() => e4.terminate(), 50);
      }), it2.current === s3 && (it2.current = []), ot2.current === _2 && (ot2.current = null);
      let e3 = 0, u3 = p3 && o3.size === t3.count && i3.size === t3.count && a3.size === t3.count;
      for (let n4 = 0; n4 < t3.count; n4 += 1) {
        let r4 = o3.get(n4), s4 = i3.get(n4), c4 = a3.get(n4);
        if (!r4 || !s4 || c4 !== t3.engine) {
          u3 = false;
          continue;
        }
        let l4 = s4.attempts - r4.attempts, d4 = s4.elapsedMs - r4.elapsedMs;
        if (l4 <= 0 || d4 <= 0) {
          u3 = false;
          continue;
        }
        e3 += l4 * 1e3 / d4;
      }
      r3({ engine: t3.engine, count: t3.count, attemptsPerSecond: e3, valid: n3 === at2.current && !l3 && !c3 && u3 && e3 > 0, fallback: c3, failed: l3 });
    }, v3 = () => {
      if (!(p3 || d3) && a3.size === t3.count && i3.size === t3.count) {
        for (let e3 = 0; e3 < t3.count; e3 += 1) if (a3.get(e3) !== t3.engine) {
          c3 = true, _2();
          return;
        }
        p3 = true, o3 = new Map(i3), window.clearTimeout(h3), g3 = window.setTimeout(_2, t3.durationMs);
      }
    };
    ot2.current = _2, h3 = window.setTimeout(() => {
      l3 = true, _2();
    }, f2 === `ton-24` ? 3e4 : Math.max(6e3, t3.durationMs * 3));
    let y3 = { suffix: `________`, version: u2, addressFormat: m2, caseSensitive: true, engine: t3.engine, locale: e2, mnemonicScheme: f2 };
    it2.current = s3;
    try {
      for (let e3 = 0; e3 < t3.count; e3 += 1) {
        let r4 = new Worker(new URL(`/generator/assets/vanity.worker-CItyiGg3.js`, `` + import.meta.url), { type: `module`, name: `ton-calibration-${t3.engine}-${e3}` });
        r4.onmessage = (e4) => {
          if (d3 || n3 !== at2.current) return;
          let r5 = e4.data;
          r5.type === `engine` && (a3.set(r5.workerId, r5.engine), r5.engine !== t3.engine && (c3 = true), v3()), r5.type === `progress` && (i3.set(r5.workerId, r5.progress), v3()), (r5.type === `error` || r5.type === `candidate`) && (l3 = true, _2());
        }, r4.onerror = () => {
          l3 = true, _2();
        }, s3.push(r4), r4.postMessage({ type: `start`, options: y3, workerId: e3 });
      }
    } catch {
      l3 = true, _2();
    }
  }), [m2, e2, f2, u2]), Ft2 = (0, _.useCallback)(() => {
    let e3 = r2.gpuAllowed ? C2 : `cpu`;
    bt2 || e3 === `gpu` && !ut2 || (Dt2(), kt2(), z2(true), Tt2(), Xe2.current = 0, Ze2.current = 0, U2.current = 0, $e2.current = false, ge2(false), be2(false), re2(``), O2(``), A2(n2(`search.running`)), tt2.current = Date.now(), te2(null), F2(null), ue2(false), oe2(false), I2(null), wt2({ attempts: 0, elapsedMs: 0, attemptsPerSecond: 0, sampleAddress: `` }), s2(`searching`), Nt2(e3, x2));
  }, [Dt2, r2.gpuAllowed, x2, C2, ut2, Nt2, kt2, Tt2, bt2, n2, wt2]), It2 = (0, _.useCallback)(() => {
    $e2.current || (Mt2(), $e2.current = true, ge2(true), A2(n2(`search.paused`)));
  }, [Mt2, n2]), Lt2 = (0, _.useCallback)(() => {
    $e2.current && ($e2.current = false, ge2(false), A2(n2(`search.running`)), tt2.current = Date.now(), Nt2(C2, x2));
  }, [x2, C2, Nt2, n2]), Rt2 = (0, _.useCallback)(() => {
    let e3 = r2.gpuAllowed ? B2 : `cpu`;
    if (e3 === `gpu` && !ut2) return;
    let t3 = $e2.current;
    t3 ? Tt2() : Mt2(), w2(e3), S2(Te2), be2(false), O2(``), t3 || ($e2.current = false, ge2(false), A2(n2(`search.running`)), Nt2(e3, Te2));
  }, [r2.gpuAllowed, ut2, Nt2, B2, Te2, Mt2, Tt2, n2]), zt2 = () => {
    Tt2(), $e2.current = false, ge2(false), be2(false), s2(`setup`);
  }, Bt2 = () => {
    o2 === `searching` ? zt2() : o2 === `seed-ready` ? s2(`found`) : o2 === `seed` ? oe2(false) : Vt2();
  }, Vt2 = () => {
    Tt2(), te2(null), F2(null), ue2(false), b2(false), oe2(false), I2(null), re2(``), Xe2.current = 0, Ze2.current = 0, U2.current = 0, $e2.current = false, ge2(false), be2(false), je2(0), A2(``), s2(`setup`);
  }, Ht2 = () => {
    let e3 = Ke2.current;
    if (!e3) {
      re2(n2(`error.walletMissing`)), Vt2();
      return;
    }
    ue2(true), e3.postMessage({ type: `reveal` });
  }, Ut2 = (n3) => {
    n3.preventDefault();
    let r3 = Ua(e2);
    window.history.pushState(null, ``, Va(r3)), t2(r3);
  }, Wt2 = async (e3, t3) => {
    try {
      await navigator.clipboard.writeText(e3), I2(t3), A2(n2(t3 === `address` ? `found.copiedAddress` : `seed.copied`)), window.clearTimeout(et2.current), et2.current = window.setTimeout(() => I2(null), 1800);
    } catch {
      re2(n2(`error.clipboard`));
    }
  }, Gt2 = async () => {
    if (V2 || ct2.length === 0) return;
    Et2();
    let e3 = at2.current + 1;
    at2.current = e3, Pe2(true), We2(false), He2(null);
    let t3 = [];
    try {
      for (let n4 = 0; n4 < ct2.length; n4 += 1) {
        let r3 = ct2[n4];
        if (!r3 || e3 !== at2.current) return;
        Re2({ current: n4 + 1, total: ct2.length, engine: r3.engine, count: r3.count });
        let i3 = await Pt2(r3, e3);
        if (e3 !== at2.current) return;
        t3.push(i3);
      }
      let n3 = xo(t3);
      if (!n3) {
        We2(true);
        return;
      }
      He2(n3), w2(n3.engine), S2(n3.count), Ce2(n3.engine), De2(n3.count);
    } catch {
      e3 === at2.current && We2(true);
    } finally {
      e3 === at2.current && (Et2(), Pe2(false), Re2(null));
    }
  }, Kt2 = (0, J.jsxs)(J.Fragment, { children: [(0, J.jsxs)(`div`, { className: `setup-hero`, children: [(0, J.jsx)(jo, { screen: `setup`, locale: e2 }), (0, J.jsxs)(`div`, { className: `hero-copy`, children: [(0, J.jsx)(Ao, { locale: e2 }), (0, J.jsx)(`h1`, { tabIndex: -1, children: n2(`setup.title`) }), (0, J.jsx)(`p`, { children: n2(`setup.description`) })] })] }), (0, J.jsxs)(`section`, { className: `panel setup-panel`, "aria-labelledby": `settings-title`, children: [(0, J.jsx)(`h2`, { id: `settings-title`, className: `sr-only`, children: n2(`settings.title`) }), (0, J.jsx)(`label`, { className: `field-label`, htmlFor: `suffix`, children: n2(`suffix.label`) }), (0, J.jsxs)(`div`, { className: `suffix-field ${bt2 && c2 ? `suffix-field--error` : ``}`, children: [(0, J.jsx)(`span`, { children: `\u2026` }), (0, J.jsx)(`input`, { id: `suffix`, value: c2, onChange: (e3) => l2(e3.target.value.replace(/\s/g, ``).slice(0, 8)), placeholder: `GRAM`, autoComplete: `off`, autoCapitalize: `characters`, spellCheck: false, "aria-describedby": `suffix-hint`, "aria-invalid": !!bt2 }), (0, J.jsxs)(`span`, { className: `character-count`, children: [dt2.length, `/8`] })] }), (0, J.jsx)(`div`, { id: `suffix-hint`, className: `field-hint ${bt2 ? `field-hint--error` : ``}`, children: bt2 || St2(xt2) }), (0, J.jsx)(`div`, { className: `preset-row`, "aria-label": n2(`presets.label`), children: So.map((e3) => (0, J.jsx)(`button`, { type: `button`, className: dt2 === e3 ? `chip chip--active` : `chip`, "aria-pressed": dt2 === e3, onClick: () => l2(e3), children: e3 }, e3)) }), (0, J.jsxs)(`div`, { className: `setting-block`, children: [(0, J.jsxs)(`div`, { className: `setting-heading`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--blue`, children: (0, J.jsx)(Le, { weight: `fill` }) }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`wallet.title`) }), (0, J.jsx)(`small`, { children: n2(`wallet.description`) })] })] }), (0, J.jsxs)(`div`, { className: `segmented`, role: `group`, "aria-label": n2(`wallet.group`), children: [(0, J.jsxs)(`button`, { type: `button`, "aria-pressed": u2 === `w5`, disabled: V2, className: u2 === `w5` ? `segmented__item is-active` : `segmented__item`, onClick: () => {
    d2(`w5`), He2(null);
  }, children: [`W5 `, (0, J.jsx)(`span`, { children: n2(`wallet.recommended`) })] }), (0, J.jsxs)(`button`, { type: `button`, "aria-pressed": u2 === `v4r2`, disabled: V2, className: u2 === `v4r2` ? `segmented__item is-active` : `segmented__item`, onClick: () => {
    d2(`v4r2`), He2(null);
  }, children: [`v4R2 `, (0, J.jsx)(`span`, { children: n2(`wallet.compatibility`) })] })] })] }), (0, J.jsxs)(`details`, { className: `advanced-settings`, children: [(0, J.jsx)(`summary`, { children: n2(`advanced.title`) }), (0, J.jsxs)(`div`, { className: `advanced-settings__body`, children: [(0, J.jsxs)(`div`, { className: `advanced-group`, children: [(0, J.jsxs)(`div`, { className: `setting-heading`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--violet`, children: (0, J.jsx)(Ee, { weight: `fill` }) }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`mnemonic.title`) }), (0, J.jsx)(`small`, { children: n2(`mnemonic.description`) })] })] }), (0, J.jsxs)(`div`, { className: `segmented`, role: `group`, "aria-label": n2(`mnemonic.title`), children: [(0, J.jsxs)(`button`, { type: `button`, "aria-pressed": f2 === `multichain-12`, disabled: V2, className: f2 === `multichain-12` ? `segmented__item is-active` : `segmented__item`, onClick: () => {
    p2(`multichain-12`), He2(null);
  }, children: [n2(`mnemonic.12`), ` `, (0, J.jsx)(`span`, { children: n2(`mnemonic.fast`) })] }), (0, J.jsxs)(`button`, { type: `button`, "aria-pressed": f2 === `ton-24`, disabled: V2, className: f2 === `ton-24` ? `segmented__item is-active` : `segmented__item`, onClick: () => {
    p2(`ton-24`), He2(null);
  }, children: [n2(`mnemonic.24`), ` `, (0, J.jsx)(`span`, { children: `TON` })] })] })] }), r2.gpuAllowed ? (0, J.jsxs)(`div`, { className: `advanced-group`, children: [(0, J.jsxs)(`div`, { className: `setting-heading`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--orange`, children: (0, J.jsx)(Se, { weight: `fill` }) }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.title`) }), (0, J.jsx)(`small`, { children: n2(`compute.description`) })] })] }), (0, J.jsxs)(`div`, { className: `engine-grid`, role: `group`, "aria-label": n2(`compute.title`), children: [(0, J.jsxs)(`button`, { type: `button`, "aria-pressed": C2 === `cpu`, disabled: V2, className: C2 === `cpu` ? `engine-card is-active` : `engine-card`, onClick: () => {
    w2(`cpu`);
  }, children: [(0, J.jsx)(pe, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.cpu`) }), (0, J.jsx)(`small`, { children: n2(`compute.cpuDescription`) })] })] }), (0, J.jsxs)(`button`, { type: `button`, "aria-pressed": C2 === `gpu`, disabled: !ut2 || V2, className: C2 === `gpu` ? `engine-card is-active` : `engine-card`, onClick: () => {
    w2(`gpu`);
  }, children: [(0, J.jsx)(Se, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.gpu`) }), (0, J.jsx)(`small`, { children: n2(ut2 ? `compute.gpuDescription` : `compute.gpuUnavailable`) })] })] })] })] }) : (0, J.jsxs)(`div`, { className: `mobile-performance-note`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--green`, children: (0, J.jsx)(pe, { weight: `fill` }) }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.mobileTitle`) }), (0, J.jsx)(`small`, { children: n2(`compute.mobileDescription`, { count: r2.autoWorkerCount }) })] })] }), st2 && (0, J.jsx)(`div`, { className: `performance-tune-row`, children: (0, J.jsxs)(`button`, { type: `button`, "aria-busy": V2, onClick: V2 ? Dt2 : () => void Gt2(), children: [V2 ? (0, J.jsx)(ze, { weight: `fill` }) : Be2 ? (0, J.jsx)(de, { weight: `fill` }) : (0, J.jsx)(Fe, { weight: `bold` }), (0, J.jsxs)(`span`, { "aria-live": `polite`, children: [(0, J.jsx)(`strong`, { children: V2 && Ie2 ? n2(`device.measuring`, { current: Ie2.current, total: Ie2.total, engine: Ie2.engine.toUpperCase(), count: Ie2.count }) : n2(Be2 ? `device.measured` : Ue2 ? `device.measureFailed` : `device.measure`) }), (0, J.jsx)(`small`, { children: V2 ? n2(`device.cancelMeasure`) : Be2 ? n2(`device.measuredValue`, { engine: Be2.engine.toUpperCase(), count: Be2.count, speed: Do(Be2.attemptsPerSecond, e2) }) : Ue2 ? n2(`device.measureFailedHint`) : n2(`device.measureHint`, { seconds: lt2 }) })] })] }) }), (0, J.jsxs)(`label`, { className: `select-row`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--green`, children: (0, J.jsx)(pe, { weight: `fill` }) }), (0, J.jsxs)(`span`, { className: `toggle-copy`, children: [(0, J.jsx)(`strong`, { children: n2(C2 === `gpu` ? `threads.gpuTitle` : `threads.title`) }), (0, J.jsx)(`small`, { children: n2(C2 === `gpu` ? `threads.gpuDescription` : `threads.description`, { count: ft2 }) })] }), (0, J.jsxs)(`select`, { value: String(x2), disabled: V2, onChange: (e3) => {
    let t3 = e3.target.value;
    S2(t3 === `auto` || t3 === `maximum` ? t3 : Number(t3));
  }, children: [(0, J.jsx)(`option`, { value: `auto`, children: n2(`threads.auto`, { count: mt2 }) }), (0, J.jsx)(`option`, { value: `maximum`, children: n2(`threads.maximum`, { count: ht2 }) }), pt2.map((e3) => (0, J.jsx)(`option`, { value: e3, children: n2(`threads.manual`, { count: e3 }) }, e3))] })] }), (0, J.jsxs)(`label`, { className: `toggle-row`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--violet`, children: (0, J.jsx)(Oe, { weight: `fill` }) }), (0, J.jsxs)(`span`, { className: `toggle-copy`, children: [(0, J.jsx)(`strong`, { children: n2(`case.title`) }), (0, J.jsx)(`small`, { children: n2(g2 ? `case.exact` : `case.relaxed`) })] }), (0, J.jsx)(`input`, { type: `checkbox`, checked: g2, onChange: (e3) => v2(e3.target.checked) }), (0, J.jsx)(`span`, { className: `toggle`, "aria-hidden": `true` })] }), (0, J.jsxs)(`div`, { className: `advanced-group`, children: [(0, J.jsx)(`div`, { className: `advanced-label`, children: n2(`format.title`) }), (0, J.jsxs)(`div`, { className: `radio-stack`, children: [(0, J.jsxs)(`label`, { children: [(0, J.jsx)(`input`, { type: `radio`, name: `address-format`, disabled: V2, checked: m2 === `non-bounceable`, onChange: () => {
    h2(`non-bounceable`), He2(null);
  } }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: `UQ\u2026` }), (0, J.jsx)(`small`, { children: n2(`format.nonBounceable`) })] })] }), (0, J.jsxs)(`label`, { children: [(0, J.jsx)(`input`, { type: `radio`, name: `address-format`, disabled: V2, checked: m2 === `bounceable`, onChange: () => {
    h2(`bounceable`), He2(null);
  } }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: `EQ\u2026` }), (0, J.jsx)(`small`, { children: n2(`format.bounceable`) })] })] })] })] })] })] })] }), ne2 && (0, J.jsx)(`div`, { className: `error-banner`, role: `alert`, children: ne2 }), (0, J.jsxs)(`button`, { type: `button`, className: `primary-button`, disabled: V2 || !!bt2 || C2 === `gpu` && !ut2, onClick: Ft2, children: [(0, J.jsx)(Oe, { weight: `bold` }), ` `, n2(`action.start`)] }), (0, J.jsxs)(`p`, { className: `privacy-note`, children: [(0, J.jsx)(Ee, { weight: `fill` }), ` `, n2(`privacy.localCompute`)] })] }), qt2 = n2(T2 === `gpu` ? `engine.gpuParallel` : `engine.cpu`, { count: ke2 }), Jt2 = (0, J.jsxs)(J.Fragment, { children: [(0, J.jsx)(jo, { screen: `searching`, locale: e2 }), (0, J.jsxs)(`div`, { className: `hero-copy`, children: [(0, J.jsx)(Ao, { locale: e2 }), (0, J.jsx)(`h1`, { tabIndex: -1, children: n2(`search.title`) }), (0, J.jsx)(`p`, { children: n2(`search.description`, { suffix: dt2, version: u2 === `w5` ? `W5` : `v4R2`, engine: qt2 }) })] }), D2 && (0, J.jsx)(`div`, { className: `notice-banner`, role: `status`, children: D2 }), (0, J.jsxs)(`section`, { className: me2 ? `panel progress-panel is-paused` : `panel progress-panel`, children: [(0, J.jsx)(`div`, { className: `pulse-orbit`, "aria-hidden": `true`, children: (0, J.jsx)(`span`, {}) }), (0, J.jsxs)(`div`, { className: me2 ? `live-label is-paused` : `live-label`, children: [(0, J.jsx)(`span`, {}), ` `, n2(me2 ? `search.paused` : `search.running`)] }), (0, J.jsx)(`div`, { className: `attempts-number`, children: Do(j2.attempts, e2) }), (0, J.jsx)(`div`, { className: `attempts-caption`, children: n2(`search.attempts`) }), (0, J.jsxs)(`div`, { className: `stats-grid`, children: [(0, J.jsxs)(`div`, { children: [(0, J.jsx)(`small`, { children: n2(`search.speed`) }), (0, J.jsxs)(`strong`, { children: [Do(j2.attemptsPerSecond, e2), `/s`] })] }), (0, J.jsxs)(`div`, { children: [(0, J.jsx)(`small`, { children: n2(`search.time`) }), (0, J.jsx)(`strong`, { children: Oo(j2.elapsedMs) })] }), (0, J.jsxs)(`div`, { children: [(0, J.jsx)(`small`, { children: n2(`search.estimate`) }), (0, J.jsx)(`strong`, { children: Ct2(xt2 / j2.attemptsPerSecond * 1e3) })] })] }), (0, J.jsxs)(`div`, { className: `sample-address`, children: [(0, J.jsx)(`small`, { children: n2(`search.sample`) }), (0, J.jsx)(`span`, { children: j2.sampleAddress || n2(`search.preparing`) })] })] }), (0, J.jsxs)(`div`, { className: `probability-note`, children: [(0, J.jsx)(we, { weight: `fill` }), (0, J.jsx)(`span`, { children: n2(`search.random`) })] }), (0, J.jsxs)(`div`, { className: `search-actions`, children: [(0, J.jsxs)(`button`, { type: `button`, className: `secondary-button`, onClick: me2 ? Lt2 : It2, children: [me2 ? (0, J.jsx)(Me, { weight: `fill` }) : (0, J.jsx)(Ae, { weight: `fill` }), ` `, n2(me2 ? `search.resume` : `search.pause`)] }), (0, J.jsxs)(`button`, { type: `button`, className: `secondary-button`, "aria-expanded": ve2, "aria-controls": `power-settings`, onClick: () => {
    Ce2(C2), De2(x2), be2((e3) => !e3);
  }, children: [(0, J.jsx)(Fe, { weight: `bold` }), ` `, n2(`search.power`)] })] }), ve2 && (0, J.jsxs)(`section`, { id: `power-settings`, className: `panel power-panel`, "aria-labelledby": `power-title`, children: [(0, J.jsxs)(`div`, { className: `power-panel__header`, children: [(0, J.jsxs)(`div`, { children: [(0, J.jsx)(`h2`, { id: `power-title`, children: n2(`power.title`) }), (0, J.jsx)(`p`, { children: n2(`power.description`) })] }), (0, J.jsx)(`button`, { type: `button`, className: `icon-button`, "aria-label": n2(`power.close`), onClick: () => be2(false), children: (0, J.jsx)(H, { weight: `bold` }) })] }), r2.gpuAllowed && (0, J.jsxs)(`div`, { className: `engine-grid`, role: `group`, "aria-label": n2(`compute.title`), children: [(0, J.jsxs)(`button`, { type: `button`, "aria-pressed": B2 === `cpu`, className: B2 === `cpu` ? `engine-card is-active` : `engine-card`, onClick: () => Ce2(`cpu`), children: [(0, J.jsx)(pe, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.cpu`) }), (0, J.jsx)(`small`, { children: n2(`compute.cpuDescription`) })] })] }), (0, J.jsxs)(`button`, { type: `button`, "aria-pressed": B2 === `gpu`, disabled: !ut2, className: B2 === `gpu` ? `engine-card is-active` : `engine-card`, onClick: () => Ce2(`gpu`), children: [(0, J.jsx)(Se, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`compute.gpu`) }), (0, J.jsx)(`small`, { children: n2(ut2 ? `compute.gpuDescription` : `compute.gpuUnavailable`) })] })] })] }), (0, J.jsxs)(`label`, { className: `select-row power-panel__workers`, children: [(0, J.jsx)(`span`, { className: `setting-icon setting-icon--green`, children: (0, J.jsx)(pe, { weight: `fill` }) }), (0, J.jsxs)(`span`, { className: `toggle-copy`, children: [(0, J.jsx)(`strong`, { children: n2(B2 === `gpu` ? `threads.gpuTitle` : `threads.title`) }), (0, J.jsx)(`small`, { children: n2(`power.current`, { count: gt2 }) })] }), (0, J.jsxs)(`select`, { value: String(Te2), onChange: (e3) => {
    let t3 = e3.target.value;
    De2(t3 === `auto` || t3 === `maximum` ? t3 : Number(t3));
  }, children: [(0, J.jsx)(`option`, { value: `auto`, children: n2(`threads.auto`, { count: vt2 }) }), (0, J.jsx)(`option`, { value: `maximum`, children: n2(`threads.maximum`, { count: yt2 }) }), _t2.map((e3) => (0, J.jsx)(`option`, { value: e3, children: n2(`threads.manual`, { count: e3 }) }, e3))] })] }), (0, J.jsxs)(`button`, { type: `button`, className: `primary-button power-panel__apply`, disabled: B2 === `gpu` && !ut2, onClick: Rt2, children: [(0, J.jsx)(le, { weight: `bold` }), ` `, n2(`power.apply`)] })] }), (0, J.jsxs)(`button`, { type: `button`, className: `secondary-button danger-button`, onClick: zt2, children: [(0, J.jsx)(ze, { weight: `fill` }), ` `, n2(`search.stop`)] })] }), Yt2 = N2 && (0, J.jsxs)(J.Fragment, { children: [(0, J.jsx)(jo, { screen: `found`, locale: e2 }), (0, J.jsxs)(`div`, { className: `hero-copy`, children: [(0, J.jsxs)(`span`, { className: `success-pill`, children: [(0, J.jsx)(de, { weight: `fill` }), ` `, n2(`found.status`)] }), (0, J.jsx)(`h1`, { tabIndex: -1, children: n2(`found.title`) }), (0, J.jsx)(`p`, { children: n2(`found.description`) })] }), (0, J.jsxs)(`section`, { className: `panel found-panel`, children: [(0, J.jsxs)(`div`, { className: `wallet-meta`, children: [(0, J.jsxs)(`span`, { children: [`TON `, N2.version === `w5` ? `W5` : `v4R2`] }), (0, J.jsx)(`span`, { children: N2.addressFormat === `bounceable` ? `Bounceable` : `Non-bounceable` })] }), (0, J.jsxs)(`div`, { className: `found-address`, children: [(0, J.jsx)(Mo, { address: N2.address, suffix: dt2 }), (0, J.jsx)(`button`, { type: `button`, className: `icon-button`, "aria-label": n2(`found.copyAddress`), onClick: () => void Wt2(N2.address, `address`), children: ie2 === `address` ? (0, J.jsx)(le, { weight: `bold` }) : (0, J.jsx)(fe, { weight: `bold` }) })] }), (0, J.jsxs)(`div`, { className: `found-stats`, children: [(0, J.jsxs)(`span`, { children: [(0, J.jsx)(`small`, { children: n2(`found.attempts`) }), (0, J.jsx)(`strong`, { children: Do(N2.attempts, e2) })] }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`small`, { children: n2(`found.time`) }), (0, J.jsx)(`strong`, { children: Oo(N2.elapsedMs) })] })] })] }), (0, J.jsxs)(`div`, { className: `warning-card`, children: [(0, J.jsx)(Ne, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`found.hiddenTitle`) }), (0, J.jsx)(`small`, { children: n2(`found.hiddenDescription`) })] })] }), (0, J.jsx)(`button`, { type: `button`, className: `primary-button`, onClick: () => {
    b2(false), s2(`seed-ready`);
  }, children: n2(`found.reveal`) }), (0, J.jsx)(`button`, { type: `button`, className: `text-button`, onClick: Vt2, children: n2(`found.retry`) })] }), Xt2 = N2 && (0, J.jsxs)(J.Fragment, { children: [(0, J.jsx)(jo, { screen: `seed-ready`, locale: e2 }), (0, J.jsxs)(`div`, { className: `hero-copy`, children: [(0, J.jsxs)(`span`, { className: `secret-pill`, children: [(0, J.jsx)(Ee, { weight: `fill` }), ` `, n2(`seedReady.status`)] }), (0, J.jsx)(`h1`, { tabIndex: -1, children: n2(`seedReady.title`) }), (0, J.jsx)(`p`, { children: n2(`seedReady.description`, { count: N2.mnemonicScheme === `ton-24` ? 24 : 12 }) })] }), (0, J.jsxs)(`div`, { className: `seed-warning`, children: [(0, J.jsx)(Ne, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`seed.warningTitle`) }), (0, J.jsx)(`small`, { children: n2(`seed.warningDescription`) })] })] }), (0, J.jsxs)(`label`, { className: `consent-card`, children: [(0, J.jsx)(`input`, { type: `checkbox`, checked: y2, onChange: (e3) => b2(e3.target.checked) }), (0, J.jsx)(`span`, { className: `checkmark`, children: (0, J.jsx)(le, { weight: `bold` }) }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`seedReady.check`) }), (0, J.jsx)(`small`, { children: n2(`seedReady.checkDescription`) })] })] }), (0, J.jsx)(`button`, { type: `button`, className: `primary-button`, disabled: !y2 || ce2, onClick: Ht2, children: ce2 ? n2(`found.revealPending`) : n2(`seedReady.reveal`, { count: N2.mnemonicScheme === `ton-24` ? 24 : 12 }) }), (0, J.jsx)(`button`, { type: `button`, className: `text-button`, onClick: () => s2(`found`), children: n2(`seedReady.back`) })] }), Zt2 = P2 && (0, J.jsxs)(J.Fragment, { children: [(0, J.jsx)(jo, { screen: `seed`, locale: e2 }), (0, J.jsxs)(`div`, { className: `hero-copy`, children: [(0, J.jsxs)(`span`, { className: `secret-pill`, children: [(0, J.jsx)(Ee, { weight: `fill` }), ` `, n2(`seed.status`)] }), (0, J.jsx)(`h1`, { tabIndex: -1, children: n2(`seed.title`, { count: P2.mnemonicScheme === `ton-24` ? 24 : 12 }) }), (0, J.jsx)(`p`, { children: n2(`seed.description`) })] }), (0, J.jsxs)(`div`, { className: `seed-warning`, children: [(0, J.jsx)(Ne, { weight: `fill` }), (0, J.jsxs)(`span`, { children: [(0, J.jsx)(`strong`, { children: n2(`seed.warningTitle`) }), (0, J.jsx)(`small`, { children: n2(`seed.warningDescription`) })] })] }), (0, J.jsxs)(`section`, { className: `panel seed-panel ${L2 ? `` : `seed-panel--hidden`}`, children: [(0, J.jsxs)(`div`, { className: `seed-toolbar`, children: [(0, J.jsx)(`span`, { children: n2(`seed.phrase`) }), (0, J.jsxs)(`button`, { type: `button`, "aria-pressed": L2, onClick: () => oe2((e3) => !e3), children: [L2 ? (0, J.jsx)(_e, {}) : (0, J.jsx)(he, {}), ` `, n2(L2 ? `seed.hide` : `seed.show`)] })] }), L2 ? (0, J.jsx)(`ol`, { className: `seed-grid`, children: P2.mnemonic.map((e3, t3) => (0, J.jsxs)(`li`, { children: [(0, J.jsx)(`span`, { children: t3 + 1 }), (0, J.jsx)(`strong`, { children: e3 })] }, `${e3}-${t3}`)) }) : (0, J.jsxs)(`div`, { className: `seed-hidden-state`, children: [(0, J.jsx)(_e, { weight: `fill` }), n2(`seed.hidden`, { count: P2.mnemonicScheme === `ton-24` ? 24 : 12 })] }), (0, J.jsxs)(`div`, { className: `seed-standard`, children: [(0, J.jsx)(`span`, { children: P2.mnemonicScheme === `ton-24` ? `TON Mnemonic` : `BIP39 \xB7 SLIP-0010` }), (0, J.jsx)(`code`, { children: P2.mnemonicScheme === `ton-24` ? `TON default seed` : `m/44'/607'/0'` })] }), (0, J.jsxs)(`button`, { type: `button`, className: `copy-seed-button`, disabled: !L2, onClick: () => void Wt2(P2.mnemonic.join(` `), `seed`), children: [ie2 === `seed` ? (0, J.jsx)(le, { weight: `bold` }) : (0, J.jsx)(fe, { weight: `bold` }), ie2 === `seed` ? n2(`seed.copied`) : n2(`seed.copy`, { count: P2.mnemonicScheme === `ton-24` ? 24 : 12 })] })] }), (0, J.jsx)(`button`, { type: `button`, className: `primary-button`, onClick: Vt2, children: n2(`seed.restart`) }), (0, J.jsxs)(`p`, { className: `privacy-note`, children: [(0, J.jsx)(Ee, { weight: `fill` }), ` `, n2(`seed.notStored`)] })] });
  return (0, J.jsxs)(`div`, { className: `app-shell`, children: [(0, J.jsx)(`a`, { className: `skip-link`, href: `#generator-main`, children: e2 === `ru` ? `\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0443` : `Skip to generator` }), (0, J.jsx)(`div`, { className: `ambient ambient--one` }), (0, J.jsx)(`div`, { className: `ambient ambient--two` }), (0, J.jsxs)(`header`, { className: `topbar`, children: [(0, J.jsxs)(`div`, { className: `topbar__leading`, children: [o2 !== `setup` && o2 !== `seed` && (0, J.jsx)(`button`, { type: `button`, className: `back-button`, onClick: Bt2, "aria-label": n2(`nav.back`), children: (0, J.jsx)(ae, { weight: `bold` }) }), (0, J.jsx)(ko, { locale: e2 })] }), (0, J.jsxs)(`nav`, { className: `topbar__actions`, "aria-label": e2 === `ru` ? `\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430` : `Generator navigation`, children: [(0, J.jsxs)(`a`, { className: `language-link`, href: Va(Ua(e2)), hrefLang: Ua(e2), "aria-label": n2(`nav.language`), onClick: Ut2, children: [(0, J.jsx)(xe, { weight: `bold` }), (0, J.jsx)(`span`, { children: n2(`nav.languageShort`) })] }), (0, J.jsxs)(`a`, { className: `github-link`, href: `https://github.com/rub1kub/ton-vanity-generator`, target: `_blank`, rel: `noreferrer`, children: [(0, J.jsx)(ye, { weight: `fill` }), ` `, (0, J.jsx)(`span`, { children: n2(`nav.source`) })] })] })] }), (0, J.jsx)(`div`, { className: `sr-only`, role: `status`, "aria-live": `polite`, "aria-atomic": `true`, children: k2 }), ne2 && o2 !== `setup` && (0, J.jsx)(`div`, { className: `global-error error-banner`, role: `alert`, children: ne2 }), (0, J.jsxs)(`main`, { id: `generator-main`, className: `generator generator--${o2}`, children: [o2 === `setup` && Kt2, o2 === `searching` && Jt2, o2 === `found` && Yt2, o2 === `seed-ready` && Xt2, o2 === `seed` && Zt2] }), R2 && (0, J.jsx)(`div`, { className: `hunt-modal-backdrop`, onMouseDown: (e3) => {
    e3.target === e3.currentTarget && z2(false);
  }, children: (0, J.jsxs)(`section`, { className: `hunt-modal`, role: `dialog`, "aria-modal": `true`, "aria-labelledby": `hunt-modal-title`, "aria-describedby": `hunt-modal-description`, children: [(0, J.jsx)(`button`, { ref: rt2, type: `button`, className: `hunt-modal__close`, "aria-label": n2(`huntModal.close`), onClick: () => z2(false), children: (0, J.jsx)(H, { weight: `bold` }) }), (0, J.jsx)(`span`, { className: `hunt-modal__icon`, "aria-hidden": `true`, children: (0, J.jsx)(se, { weight: `fill` }) }), (0, J.jsx)(`span`, { className: `hunt-modal__eyebrow`, children: n2(`huntModal.status`) }), (0, J.jsx)(`h2`, { id: `hunt-modal-title`, children: n2(`huntModal.title`) }), (0, J.jsx)(`p`, { id: `hunt-modal-description`, children: n2(`huntModal.description`) }), (0, J.jsxs)(`div`, { className: `hunt-modal__notice`, children: [(0, J.jsx)(se, { weight: `fill` }), (0, J.jsx)(`span`, { children: n2(`huntModal.notification`) })] }), (0, J.jsxs)(`a`, { className: `primary-button hunt-modal__channel`, href: `https://t.me/rubikub`, target: `_blank`, rel: `noreferrer`, onClick: () => z2(false), children: [(0, J.jsx)(Ve, { weight: `fill` }), ` `, n2(`huntModal.subscribe`)] }), (0, J.jsx)(`button`, { type: `button`, className: `hunt-modal__continue`, onClick: () => z2(false), children: n2(`huntModal.continue`) })] }) }), (0, J.jsxs)(`footer`, { className: `site-footer`, children: [(0, J.jsxs)(`span`, { children: [`\xA9 `, (/* @__PURE__ */ new Date()).getFullYear(), ` TonSuite`] }), (0, J.jsx)(`a`, { href: e2 === `ru` ? `/privacy/` : `/en/privacy/`, children: n2(`footer.privacy`) }), (0, J.jsx)(`a`, { href: `https://t.me/addstickers/UtyaDuck`, target: `_blank`, rel: `noreferrer`, children: n2(`footer.utya`) }), (0, J.jsx)(`a`, { href: `https://t.me/rub1kub`, target: `_blank`, rel: `noreferrer`, children: n2(`footer.author`) }), (0, J.jsx)(`a`, { href: `https://t.me/rubikub`, target: `_blank`, rel: `noreferrer`, children: n2(`footer.channel`) })] })] });
}
(0, We.createRoot)(document.getElementById(`root`)).render((0, J.jsx)(_.StrictMode, { children: (0, J.jsx)(No, {}) }));
