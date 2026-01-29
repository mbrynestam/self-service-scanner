var fS = Object.defineProperty;
var Bf = (e) => {
  throw TypeError(e);
};
var pS = (e, t, n) => t in e ? fS(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Zl = (e, t, n) => pS(e, typeof t != "symbol" ? t + "" : t, n), eu = (e, t, n) => t.has(e) || Bf("Cannot " + n);
var P = (e, t, n) => (eu(e, t, "read from private field"), n ? n.call(e) : t.get(e)), J = (e, t, n) => t.has(e) ? Bf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), z = (e, t, n, r) => (eu(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Ie = (e, t, n) => (eu(e, t, "access private method"), n);
var Do = (e, t, n, r) => ({
  set _(s) {
    z(e, t, s, n);
  },
  get _() {
    return P(e, t, r);
  }
});
function mS(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in e)) {
          const i = Object.getOwnPropertyDescriptor(r, s);
          i && Object.defineProperty(e, s, i.get ? i : {
            enumerable: !0,
            get: () => r[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function _y(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ky = { exports: {} }, wl = {}, Ty = { exports: {} }, G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xo = Symbol.for("react.element"), gS = Symbol.for("react.portal"), yS = Symbol.for("react.fragment"), vS = Symbol.for("react.strict_mode"), wS = Symbol.for("react.profiler"), xS = Symbol.for("react.provider"), bS = Symbol.for("react.context"), SS = Symbol.for("react.forward_ref"), _S = Symbol.for("react.suspense"), kS = Symbol.for("react.memo"), TS = Symbol.for("react.lazy"), zf = Symbol.iterator;
function ES(e) {
  return e === null || typeof e != "object" ? null : (e = zf && e[zf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ey = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Cy = Object.assign, Py = {};
function Ks(e, t, n) {
  this.props = e, this.context = t, this.refs = Py, this.updater = n || Ey;
}
Ks.prototype.isReactComponent = {};
Ks.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ks.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ay() {
}
Ay.prototype = Ks.prototype;
function Wd(e, t, n) {
  this.props = e, this.context = t, this.refs = Py, this.updater = n || Ey;
}
var Hd = Wd.prototype = new Ay();
Hd.constructor = Wd;
Cy(Hd, Ks.prototype);
Hd.isPureReactComponent = !0;
var Wf = Array.isArray, Ry = Object.prototype.hasOwnProperty, Kd = { current: null }, Oy = { key: !0, ref: !0, __self: !0, __source: !0 };
function jy(e, t, n) {
  var r, s = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) Ry.call(t, r) && !Oy.hasOwnProperty(r) && (s[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) s.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    s.children = l;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) s[r] === void 0 && (s[r] = a[r]);
  return { $$typeof: xo, type: e, key: i, ref: o, props: s, _owner: Kd.current };
}
function CS(e, t) {
  return { $$typeof: xo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function qd(e) {
  return typeof e == "object" && e !== null && e.$$typeof === xo;
}
function PS(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Hf = /\/+/g;
function tu(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? PS("" + e.key) : t.toString(36);
}
function pa(e, t, n, r, s) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case xo:
        case gS:
          o = !0;
      }
  }
  if (o) return o = e, s = s(o), e = r === "" ? "." + tu(o, 0) : r, Wf(s) ? (n = "", e != null && (n = e.replace(Hf, "$&/") + "/"), pa(s, t, n, "", function(u) {
    return u;
  })) : s != null && (qd(s) && (s = CS(s, n + (!s.key || o && o.key === s.key ? "" : ("" + s.key).replace(Hf, "$&/") + "/") + e)), t.push(s)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Wf(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var l = r + tu(i, a);
    o += pa(i, t, n, l, s);
  }
  else if (l = ES(e), typeof l == "function") for (e = l.call(e), a = 0; !(i = e.next()).done; ) i = i.value, l = r + tu(i, a++), o += pa(i, t, n, l, s);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Mo(e, t, n) {
  if (e == null) return e;
  var r = [], s = 0;
  return pa(e, r, "", "", function(i) {
    return t.call(n, i, s++);
  }), r;
}
function AS(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var qe = { current: null }, ma = { transition: null }, RS = { ReactCurrentDispatcher: qe, ReactCurrentBatchConfig: ma, ReactCurrentOwner: Kd };
function Ny() {
  throw Error("act(...) is not supported in production builds of React.");
}
G.Children = { map: Mo, forEach: function(e, t, n) {
  Mo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Mo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Mo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!qd(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
G.Component = Ks;
G.Fragment = yS;
G.Profiler = wS;
G.PureComponent = Wd;
G.StrictMode = vS;
G.Suspense = _S;
G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = RS;
G.act = Ny;
G.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Cy({}, e.props), s = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Kd.current), t.key !== void 0 && (s = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (l in t) Ry.call(t, l) && !Oy.hasOwnProperty(l) && (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: xo, type: e.type, key: s, ref: i, props: r, _owner: o };
};
G.createContext = function(e) {
  return e = { $$typeof: bS, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: xS, _context: e }, e.Consumer = e;
};
G.createElement = jy;
G.createFactory = function(e) {
  var t = jy.bind(null, e);
  return t.type = e, t;
};
G.createRef = function() {
  return { current: null };
};
G.forwardRef = function(e) {
  return { $$typeof: SS, render: e };
};
G.isValidElement = qd;
G.lazy = function(e) {
  return { $$typeof: TS, _payload: { _status: -1, _result: e }, _init: AS };
};
G.memo = function(e, t) {
  return { $$typeof: kS, type: e, compare: t === void 0 ? null : t };
};
G.startTransition = function(e) {
  var t = ma.transition;
  ma.transition = {};
  try {
    e();
  } finally {
    ma.transition = t;
  }
};
G.unstable_act = Ny;
G.useCallback = function(e, t) {
  return qe.current.useCallback(e, t);
};
G.useContext = function(e) {
  return qe.current.useContext(e);
};
G.useDebugValue = function() {
};
G.useDeferredValue = function(e) {
  return qe.current.useDeferredValue(e);
};
G.useEffect = function(e, t) {
  return qe.current.useEffect(e, t);
};
G.useId = function() {
  return qe.current.useId();
};
G.useImperativeHandle = function(e, t, n) {
  return qe.current.useImperativeHandle(e, t, n);
};
G.useInsertionEffect = function(e, t) {
  return qe.current.useInsertionEffect(e, t);
};
G.useLayoutEffect = function(e, t) {
  return qe.current.useLayoutEffect(e, t);
};
G.useMemo = function(e, t) {
  return qe.current.useMemo(e, t);
};
G.useReducer = function(e, t, n) {
  return qe.current.useReducer(e, t, n);
};
G.useRef = function(e) {
  return qe.current.useRef(e);
};
G.useState = function(e) {
  return qe.current.useState(e);
};
G.useSyncExternalStore = function(e, t, n) {
  return qe.current.useSyncExternalStore(e, t, n);
};
G.useTransition = function() {
  return qe.current.useTransition();
};
G.version = "18.3.1";
Ty.exports = G;
var b = Ty.exports;
const on = /* @__PURE__ */ _y(b), OS = /* @__PURE__ */ mS({
  __proto__: null,
  default: on
}, [b]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jS = b, NS = Symbol.for("react.element"), IS = Symbol.for("react.fragment"), DS = Object.prototype.hasOwnProperty, MS = jS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, LS = { key: !0, ref: !0, __self: !0, __source: !0 };
function Iy(e, t, n) {
  var r, s = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) DS.call(t, r) && !LS.hasOwnProperty(r) && (s[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) s[r] === void 0 && (s[r] = t[r]);
  return { $$typeof: NS, type: e, key: i, ref: o, props: s, _owner: MS.current };
}
wl.Fragment = IS;
wl.jsx = Iy;
wl.jsxs = Iy;
ky.exports = wl;
var _ = ky.exports, rc = {}, Dy = { exports: {} }, ut = {}, My = { exports: {} }, Ly = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(C, j) {
    var M = C.length;
    C.push(j);
    e: for (; 0 < M; ) {
      var H = M - 1 >>> 1, oe = C[H];
      if (0 < s(oe, j)) C[H] = j, C[M] = oe, M = H;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var j = C[0], M = C.pop();
    if (M !== j) {
      C[0] = M;
      e: for (var H = 0, oe = C.length, St = oe >>> 1; H < St; ) {
        var dt = 2 * (H + 1) - 1, ni = C[dt], nn = dt + 1, lr = C[nn];
        if (0 > s(ni, M)) nn < oe && 0 > s(lr, ni) ? (C[H] = lr, C[nn] = M, H = nn) : (C[H] = ni, C[dt] = M, H = dt);
        else if (nn < oe && 0 > s(lr, M)) C[H] = lr, C[nn] = M, H = nn;
        else break e;
      }
    }
    return j;
  }
  function s(C, j) {
    var M = C.sortIndex - j.sortIndex;
    return M !== 0 ? M : C.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, a = o.now();
    e.unstable_now = function() {
      return o.now() - a;
    };
  }
  var l = [], u = [], c = 1, d = null, h = 3, f = !1, g = !1, y = !1, w = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(C) {
    for (var j = n(u); j !== null; ) {
      if (j.callback === null) r(u);
      else if (j.startTime <= C) r(u), j.sortIndex = j.expirationTime, t(l, j);
      else break;
      j = n(u);
    }
  }
  function x(C) {
    if (y = !1, v(C), !g) if (n(l) !== null) g = !0, K(S);
    else {
      var j = n(u);
      j !== null && V(x, j.startTime - C);
    }
  }
  function S(C, j) {
    g = !1, y && (y = !1, p(E), E = -1), f = !0;
    var M = h;
    try {
      for (v(j), d = n(l); d !== null && (!(d.expirationTime > j) || C && !F()); ) {
        var H = d.callback;
        if (typeof H == "function") {
          d.callback = null, h = d.priorityLevel;
          var oe = H(d.expirationTime <= j);
          j = e.unstable_now(), typeof oe == "function" ? d.callback = oe : d === n(l) && r(l), v(j);
        } else r(l);
        d = n(l);
      }
      if (d !== null) var St = !0;
      else {
        var dt = n(u);
        dt !== null && V(x, dt.startTime - j), St = !1;
      }
      return St;
    } finally {
      d = null, h = M, f = !1;
    }
  }
  var k = !1, T = null, E = -1, A = 5, R = -1;
  function F() {
    return !(e.unstable_now() - R < A);
  }
  function L() {
    if (T !== null) {
      var C = e.unstable_now();
      R = C;
      var j = !0;
      try {
        j = T(!0, C);
      } finally {
        j ? q() : (k = !1, T = null);
      }
    } else k = !1;
  }
  var q;
  if (typeof m == "function") q = function() {
    m(L);
  };
  else if (typeof MessageChannel < "u") {
    var N = new MessageChannel(), Q = N.port2;
    N.port1.onmessage = L, q = function() {
      Q.postMessage(null);
    };
  } else q = function() {
    w(L, 0);
  };
  function K(C) {
    T = C, k || (k = !0, q());
  }
  function V(C, j) {
    E = w(function() {
      C(e.unstable_now());
    }, j);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    g || f || (g = !0, K(S));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(l);
  }, e.unstable_next = function(C) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var j = 3;
        break;
      default:
        j = h;
    }
    var M = h;
    h = j;
    try {
      return C();
    } finally {
      h = M;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, j) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var M = h;
    h = C;
    try {
      return j();
    } finally {
      h = M;
    }
  }, e.unstable_scheduleCallback = function(C, j, M) {
    var H = e.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? H + M : H) : M = H, C) {
      case 1:
        var oe = -1;
        break;
      case 2:
        oe = 250;
        break;
      case 5:
        oe = 1073741823;
        break;
      case 4:
        oe = 1e4;
        break;
      default:
        oe = 5e3;
    }
    return oe = M + oe, C = { id: c++, callback: j, priorityLevel: C, startTime: M, expirationTime: oe, sortIndex: -1 }, M > H ? (C.sortIndex = M, t(u, C), n(l) === null && C === n(u) && (y ? (p(E), E = -1) : y = !0, V(x, M - H))) : (C.sortIndex = oe, t(l, C), g || f || (g = !0, K(S))), C;
  }, e.unstable_shouldYield = F, e.unstable_wrapCallback = function(C) {
    var j = h;
    return function() {
      var M = h;
      h = j;
      try {
        return C.apply(this, arguments);
      } finally {
        h = M;
      }
    };
  };
})(Ly);
My.exports = Ly;
var $S = My.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FS = b, lt = $S;
function O(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var $y = /* @__PURE__ */ new Set(), Fi = {};
function Br(e, t) {
  Ds(e, t), Ds(e + "Capture", t);
}
function Ds(e, t) {
  for (Fi[e] = t, e = 0; e < t.length; e++) $y.add(t[e]);
}
var pn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), sc = Object.prototype.hasOwnProperty, VS = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Kf = {}, qf = {};
function US(e) {
  return sc.call(qf, e) ? !0 : sc.call(Kf, e) ? !1 : VS.test(e) ? qf[e] = !0 : (Kf[e] = !0, !1);
}
function BS(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function zS(e, t, n, r) {
  if (t === null || typeof t > "u" || BS(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Ge(e, t, n, r, s, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = s, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var Ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Ne[e] = new Ge(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Ne[t] = new Ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Ne[e] = new Ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Ne[e] = new Ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Ne[e] = new Ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Ne[e] = new Ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Ne[e] = new Ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Ne[e] = new Ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Ne[e] = new Ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Gd = /[\-:]([a-z])/g;
function Qd(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Gd,
    Qd
  );
  Ne[t] = new Ge(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Gd, Qd);
  Ne[t] = new Ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Gd, Qd);
  Ne[t] = new Ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Ne[e] = new Ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ne.xlinkHref = new Ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Ne[e] = new Ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Yd(e, t, n, r) {
  var s = Ne.hasOwnProperty(t) ? Ne[t] : null;
  (s !== null ? s.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (zS(t, n, s, r) && (n = null), r || s === null ? US(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : s.mustUseProperty ? e[s.propertyName] = n === null ? s.type === 3 ? !1 : "" : n : (t = s.attributeName, r = s.attributeNamespace, n === null ? e.removeAttribute(t) : (s = s.type, n = s === 3 || s === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var bn = FS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Lo = Symbol.for("react.element"), es = Symbol.for("react.portal"), ts = Symbol.for("react.fragment"), Jd = Symbol.for("react.strict_mode"), ic = Symbol.for("react.profiler"), Fy = Symbol.for("react.provider"), Vy = Symbol.for("react.context"), Xd = Symbol.for("react.forward_ref"), oc = Symbol.for("react.suspense"), ac = Symbol.for("react.suspense_list"), Zd = Symbol.for("react.memo"), Pn = Symbol.for("react.lazy"), Uy = Symbol.for("react.offscreen"), Gf = Symbol.iterator;
function si(e) {
  return e === null || typeof e != "object" ? null : (e = Gf && e[Gf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fe = Object.assign, nu;
function gi(e) {
  if (nu === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    nu = t && t[1] || "";
  }
  return `
` + nu + e;
}
var ru = !1;
function su(e, t) {
  if (!e || ru) return "";
  ru = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var r = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        r = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (var s = u.stack.split(`
`), i = r.stack.split(`
`), o = s.length - 1, a = i.length - 1; 1 <= o && 0 <= a && s[o] !== i[a]; ) a--;
      for (; 1 <= o && 0 <= a; o--, a--) if (s[o] !== i[a]) {
        if (o !== 1 || a !== 1)
          do
            if (o--, a--, 0 > a || s[o] !== i[a]) {
              var l = `
` + s[o].replace(" at new ", " at ");
              return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l;
            }
          while (1 <= o && 0 <= a);
        break;
      }
    }
  } finally {
    ru = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? gi(e) : "";
}
function WS(e) {
  switch (e.tag) {
    case 5:
      return gi(e.type);
    case 16:
      return gi("Lazy");
    case 13:
      return gi("Suspense");
    case 19:
      return gi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = su(e.type, !1), e;
    case 11:
      return e = su(e.type.render, !1), e;
    case 1:
      return e = su(e.type, !0), e;
    default:
      return "";
  }
}
function lc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ts:
      return "Fragment";
    case es:
      return "Portal";
    case ic:
      return "Profiler";
    case Jd:
      return "StrictMode";
    case oc:
      return "Suspense";
    case ac:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Vy:
      return (e.displayName || "Context") + ".Consumer";
    case Fy:
      return (e._context.displayName || "Context") + ".Provider";
    case Xd:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Zd:
      return t = e.displayName || null, t !== null ? t : lc(e.type) || "Memo";
    case Pn:
      t = e._payload, e = e._init;
      try {
        return lc(e(t));
      } catch {
      }
  }
  return null;
}
function HS(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return lc(t);
    case 8:
      return t === Jd ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Yn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function By(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function KS(e) {
  var t = By(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var s = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return s.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function $o(e) {
  e._valueTracker || (e._valueTracker = KS(e));
}
function zy(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = By(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Na(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function uc(e, t) {
  var n = t.checked;
  return fe({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Qf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Yn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Wy(e, t) {
  t = t.checked, t != null && Yd(e, "checked", t, !1);
}
function cc(e, t) {
  Wy(e, t);
  var n = Yn(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? dc(e, t.type, n) : t.hasOwnProperty("defaultValue") && dc(e, t.type, Yn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Yf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function dc(e, t, n) {
  (t !== "number" || Na(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var yi = Array.isArray;
function ys(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
    for (n = 0; n < e.length; n++) s = t.hasOwnProperty("$" + e[n].value), e[n].selected !== s && (e[n].selected = s), s && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Yn(n), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === n) {
        e[s].selected = !0, r && (e[s].defaultSelected = !0);
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function hc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
  return fe({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Jf(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(O(92));
      if (yi(n)) {
        if (1 < n.length) throw Error(O(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Yn(n) };
}
function Hy(e, t) {
  var n = Yn(t.value), r = Yn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Xf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ky(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ky(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Fo, qy = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, s) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, s);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Fo = Fo || document.createElement("div"), Fo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Fo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Vi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var _i = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, qS = ["Webkit", "ms", "Moz", "O"];
Object.keys(_i).forEach(function(e) {
  qS.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), _i[t] = _i[e];
  });
});
function Gy(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _i.hasOwnProperty(e) && _i[e] ? ("" + t).trim() : t + "px";
}
function Qy(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, s = Gy(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, s) : e[n] = s;
  }
}
var GS = fe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function pc(e, t) {
  if (t) {
    if (GS[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(O(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(O(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(O(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(O(62));
  }
}
function mc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var gc = null;
function eh(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var yc = null, vs = null, ws = null;
function Zf(e) {
  if (e = _o(e)) {
    if (typeof yc != "function") throw Error(O(280));
    var t = e.stateNode;
    t && (t = kl(t), yc(e.stateNode, e.type, t));
  }
}
function Yy(e) {
  vs ? ws ? ws.push(e) : ws = [e] : vs = e;
}
function Jy() {
  if (vs) {
    var e = vs, t = ws;
    if (ws = vs = null, Zf(e), t) for (e = 0; e < t.length; e++) Zf(t[e]);
  }
}
function Xy(e, t) {
  return e(t);
}
function Zy() {
}
var iu = !1;
function ev(e, t, n) {
  if (iu) return e(t, n);
  iu = !0;
  try {
    return Xy(e, t, n);
  } finally {
    iu = !1, (vs !== null || ws !== null) && (Zy(), Jy());
  }
}
function Ui(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = kl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(O(231, t, typeof n));
  return n;
}
var vc = !1;
if (pn) try {
  var ii = {};
  Object.defineProperty(ii, "passive", { get: function() {
    vc = !0;
  } }), window.addEventListener("test", ii, ii), window.removeEventListener("test", ii, ii);
} catch {
  vc = !1;
}
function QS(e, t, n, r, s, i, o, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var ki = !1, Ia = null, Da = !1, wc = null, YS = { onError: function(e) {
  ki = !0, Ia = e;
} };
function JS(e, t, n, r, s, i, o, a, l) {
  ki = !1, Ia = null, QS.apply(YS, arguments);
}
function XS(e, t, n, r, s, i, o, a, l) {
  if (JS.apply(this, arguments), ki) {
    if (ki) {
      var u = Ia;
      ki = !1, Ia = null;
    } else throw Error(O(198));
    Da || (Da = !0, wc = u);
  }
}
function zr(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function tv(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ep(e) {
  if (zr(e) !== e) throw Error(O(188));
}
function ZS(e) {
  var t = e.alternate;
  if (!t) {
    if (t = zr(e), t === null) throw Error(O(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var s = n.return;
    if (s === null) break;
    var i = s.alternate;
    if (i === null) {
      if (r = s.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (s.child === i.child) {
      for (i = s.child; i; ) {
        if (i === n) return ep(s), e;
        if (i === r) return ep(s), t;
        i = i.sibling;
      }
      throw Error(O(188));
    }
    if (n.return !== r.return) n = s, r = i;
    else {
      for (var o = !1, a = s.child; a; ) {
        if (a === n) {
          o = !0, n = s, r = i;
          break;
        }
        if (a === r) {
          o = !0, r = s, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            o = !0, n = i, r = s;
            break;
          }
          if (a === r) {
            o = !0, r = i, n = s;
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(O(189));
      }
    }
    if (n.alternate !== r) throw Error(O(190));
  }
  if (n.tag !== 3) throw Error(O(188));
  return n.stateNode.current === n ? e : t;
}
function nv(e) {
  return e = ZS(e), e !== null ? rv(e) : null;
}
function rv(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = rv(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var sv = lt.unstable_scheduleCallback, tp = lt.unstable_cancelCallback, e_ = lt.unstable_shouldYield, t_ = lt.unstable_requestPaint, ye = lt.unstable_now, n_ = lt.unstable_getCurrentPriorityLevel, th = lt.unstable_ImmediatePriority, iv = lt.unstable_UserBlockingPriority, Ma = lt.unstable_NormalPriority, r_ = lt.unstable_LowPriority, ov = lt.unstable_IdlePriority, xl = null, Gt = null;
function s_(e) {
  if (Gt && typeof Gt.onCommitFiberRoot == "function") try {
    Gt.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var It = Math.clz32 ? Math.clz32 : a_, i_ = Math.log, o_ = Math.LN2;
function a_(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (i_(e) / o_ | 0) | 0;
}
var Vo = 64, Uo = 4194304;
function vi(e) {
  switch (e & -e) {
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
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function La(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, s = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~s;
    a !== 0 ? r = vi(a) : (i &= o, i !== 0 && (r = vi(i)));
  } else o = n & ~s, o !== 0 ? r = vi(o) : i !== 0 && (r = vi(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & s) && (s = r & -r, i = t & -t, s >= i || s === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - It(t), s = 1 << n, r |= e[n], t &= ~s;
  return r;
}
function l_(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
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
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function u_(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, s = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - It(i), a = 1 << o, l = s[o];
    l === -1 ? (!(a & n) || a & r) && (s[o] = l_(a, t)) : l <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function xc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function av() {
  var e = Vo;
  return Vo <<= 1, !(Vo & 4194240) && (Vo = 64), e;
}
function ou(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function bo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - It(t), e[t] = n;
}
function c_(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var s = 31 - It(n), i = 1 << s;
    t[s] = 0, r[s] = -1, e[s] = -1, n &= ~i;
  }
}
function nh(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - It(n), s = 1 << r;
    s & t | e[r] & t && (e[r] |= t), n &= ~s;
  }
}
var Z = 0;
function lv(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var uv, rh, cv, dv, hv, bc = !1, Bo = [], Bn = null, zn = null, Wn = null, Bi = /* @__PURE__ */ new Map(), zi = /* @__PURE__ */ new Map(), On = [], d_ = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function np(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Bn = null;
      break;
    case "dragenter":
    case "dragleave":
      zn = null;
      break;
    case "mouseover":
    case "mouseout":
      Wn = null;
      break;
    case "pointerover":
    case "pointerout":
      Bi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      zi.delete(t.pointerId);
  }
}
function oi(e, t, n, r, s, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [s] }, t !== null && (t = _o(t), t !== null && rh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
}
function h_(e, t, n, r, s) {
  switch (t) {
    case "focusin":
      return Bn = oi(Bn, e, t, n, r, s), !0;
    case "dragenter":
      return zn = oi(zn, e, t, n, r, s), !0;
    case "mouseover":
      return Wn = oi(Wn, e, t, n, r, s), !0;
    case "pointerover":
      var i = s.pointerId;
      return Bi.set(i, oi(Bi.get(i) || null, e, t, n, r, s)), !0;
    case "gotpointercapture":
      return i = s.pointerId, zi.set(i, oi(zi.get(i) || null, e, t, n, r, s)), !0;
  }
  return !1;
}
function fv(e) {
  var t = xr(e.target);
  if (t !== null) {
    var n = zr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = tv(n), t !== null) {
          e.blockedOn = t, hv(e.priority, function() {
            cv(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ga(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Sc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      gc = r, n.target.dispatchEvent(r), gc = null;
    } else return t = _o(n), t !== null && rh(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function rp(e, t, n) {
  ga(e) && n.delete(t);
}
function f_() {
  bc = !1, Bn !== null && ga(Bn) && (Bn = null), zn !== null && ga(zn) && (zn = null), Wn !== null && ga(Wn) && (Wn = null), Bi.forEach(rp), zi.forEach(rp);
}
function ai(e, t) {
  e.blockedOn === t && (e.blockedOn = null, bc || (bc = !0, lt.unstable_scheduleCallback(lt.unstable_NormalPriority, f_)));
}
function Wi(e) {
  function t(s) {
    return ai(s, e);
  }
  if (0 < Bo.length) {
    ai(Bo[0], e);
    for (var n = 1; n < Bo.length; n++) {
      var r = Bo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Bn !== null && ai(Bn, e), zn !== null && ai(zn, e), Wn !== null && ai(Wn, e), Bi.forEach(t), zi.forEach(t), n = 0; n < On.length; n++) r = On[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < On.length && (n = On[0], n.blockedOn === null); ) fv(n), n.blockedOn === null && On.shift();
}
var xs = bn.ReactCurrentBatchConfig, $a = !0;
function p_(e, t, n, r) {
  var s = Z, i = xs.transition;
  xs.transition = null;
  try {
    Z = 1, sh(e, t, n, r);
  } finally {
    Z = s, xs.transition = i;
  }
}
function m_(e, t, n, r) {
  var s = Z, i = xs.transition;
  xs.transition = null;
  try {
    Z = 4, sh(e, t, n, r);
  } finally {
    Z = s, xs.transition = i;
  }
}
function sh(e, t, n, r) {
  if ($a) {
    var s = Sc(e, t, n, r);
    if (s === null) gu(e, t, r, Fa, n), np(e, r);
    else if (h_(s, e, t, n, r)) r.stopPropagation();
    else if (np(e, r), t & 4 && -1 < d_.indexOf(e)) {
      for (; s !== null; ) {
        var i = _o(s);
        if (i !== null && uv(i), i = Sc(e, t, n, r), i === null && gu(e, t, r, Fa, n), i === s) break;
        s = i;
      }
      s !== null && r.stopPropagation();
    } else gu(e, t, r, null, n);
  }
}
var Fa = null;
function Sc(e, t, n, r) {
  if (Fa = null, e = eh(r), e = xr(e), e !== null) if (t = zr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = tv(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Fa = e, null;
}
function pv(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (n_()) {
        case th:
          return 1;
        case iv:
          return 4;
        case Ma:
        case r_:
          return 16;
        case ov:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Fn = null, ih = null, ya = null;
function mv() {
  if (ya) return ya;
  var e, t = ih, n = t.length, r, s = "value" in Fn ? Fn.value : Fn.textContent, i = s.length;
  for (e = 0; e < n && t[e] === s[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === s[i - r]; r++) ;
  return ya = s.slice(e, 1 < r ? 1 - r : void 0);
}
function va(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function zo() {
  return !0;
}
function sp() {
  return !1;
}
function ct(e) {
  function t(n, r, s, i, o) {
    this._reactName = n, this._targetInst = s, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? zo : sp, this.isPropagationStopped = sp, this;
  }
  return fe(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = zo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = zo);
  }, persist: function() {
  }, isPersistent: zo }), t;
}
var qs = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, oh = ct(qs), So = fe({}, qs, { view: 0, detail: 0 }), g_ = ct(So), au, lu, li, bl = fe({}, So, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ah, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== li && (li && e.type === "mousemove" ? (au = e.screenX - li.screenX, lu = e.screenY - li.screenY) : lu = au = 0, li = e), au);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : lu;
} }), ip = ct(bl), y_ = fe({}, bl, { dataTransfer: 0 }), v_ = ct(y_), w_ = fe({}, So, { relatedTarget: 0 }), uu = ct(w_), x_ = fe({}, qs, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), b_ = ct(x_), S_ = fe({}, qs, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), __ = ct(S_), k_ = fe({}, qs, { data: 0 }), op = ct(k_), T_ = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, E_ = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, C_ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function P_(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = C_[e]) ? !!t[e] : !1;
}
function ah() {
  return P_;
}
var A_ = fe({}, So, { key: function(e) {
  if (e.key) {
    var t = T_[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = va(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? E_[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ah, charCode: function(e) {
  return e.type === "keypress" ? va(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? va(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), R_ = ct(A_), O_ = fe({}, bl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ap = ct(O_), j_ = fe({}, So, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ah }), N_ = ct(j_), I_ = fe({}, qs, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), D_ = ct(I_), M_ = fe({}, bl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), L_ = ct(M_), $_ = [9, 13, 27, 32], lh = pn && "CompositionEvent" in window, Ti = null;
pn && "documentMode" in document && (Ti = document.documentMode);
var F_ = pn && "TextEvent" in window && !Ti, gv = pn && (!lh || Ti && 8 < Ti && 11 >= Ti), lp = " ", up = !1;
function yv(e, t) {
  switch (e) {
    case "keyup":
      return $_.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function vv(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var ns = !1;
function V_(e, t) {
  switch (e) {
    case "compositionend":
      return vv(t);
    case "keypress":
      return t.which !== 32 ? null : (up = !0, lp);
    case "textInput":
      return e = t.data, e === lp && up ? null : e;
    default:
      return null;
  }
}
function U_(e, t) {
  if (ns) return e === "compositionend" || !lh && yv(e, t) ? (e = mv(), ya = ih = Fn = null, ns = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gv && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var B_ = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function cp(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!B_[e.type] : t === "textarea";
}
function wv(e, t, n, r) {
  Yy(r), t = Va(t, "onChange"), 0 < t.length && (n = new oh("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Ei = null, Hi = null;
function z_(e) {
  Rv(e, 0);
}
function Sl(e) {
  var t = is(e);
  if (zy(t)) return e;
}
function W_(e, t) {
  if (e === "change") return t;
}
var xv = !1;
if (pn) {
  var cu;
  if (pn) {
    var du = "oninput" in document;
    if (!du) {
      var dp = document.createElement("div");
      dp.setAttribute("oninput", "return;"), du = typeof dp.oninput == "function";
    }
    cu = du;
  } else cu = !1;
  xv = cu && (!document.documentMode || 9 < document.documentMode);
}
function hp() {
  Ei && (Ei.detachEvent("onpropertychange", bv), Hi = Ei = null);
}
function bv(e) {
  if (e.propertyName === "value" && Sl(Hi)) {
    var t = [];
    wv(t, Hi, e, eh(e)), ev(z_, t);
  }
}
function H_(e, t, n) {
  e === "focusin" ? (hp(), Ei = t, Hi = n, Ei.attachEvent("onpropertychange", bv)) : e === "focusout" && hp();
}
function K_(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sl(Hi);
}
function q_(e, t) {
  if (e === "click") return Sl(t);
}
function G_(e, t) {
  if (e === "input" || e === "change") return Sl(t);
}
function Q_(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Mt = typeof Object.is == "function" ? Object.is : Q_;
function Ki(e, t) {
  if (Mt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var s = n[r];
    if (!sc.call(t, s) || !Mt(e[s], t[s])) return !1;
  }
  return !0;
}
function fp(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function pp(e, t) {
  var n = fp(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = fp(n);
  }
}
function Sv(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Sv(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function _v() {
  for (var e = window, t = Na(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Na(e.document);
  }
  return t;
}
function uh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Y_(e) {
  var t = _v(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Sv(n.ownerDocument.documentElement, n)) {
    if (r !== null && uh(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var s = n.textContent.length, i = Math.min(r.start, s);
        r = r.end === void 0 ? i : Math.min(r.end, s), !e.extend && i > r && (s = r, r = i, i = s), s = pp(n, i);
        var o = pp(
          n,
          r
        );
        s && o && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var J_ = pn && "documentMode" in document && 11 >= document.documentMode, rs = null, _c = null, Ci = null, kc = !1;
function mp(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  kc || rs == null || rs !== Na(r) || (r = rs, "selectionStart" in r && uh(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ci && Ki(Ci, r) || (Ci = r, r = Va(_c, "onSelect"), 0 < r.length && (t = new oh("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = rs)));
}
function Wo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ss = { animationend: Wo("Animation", "AnimationEnd"), animationiteration: Wo("Animation", "AnimationIteration"), animationstart: Wo("Animation", "AnimationStart"), transitionend: Wo("Transition", "TransitionEnd") }, hu = {}, kv = {};
pn && (kv = document.createElement("div").style, "AnimationEvent" in window || (delete ss.animationend.animation, delete ss.animationiteration.animation, delete ss.animationstart.animation), "TransitionEvent" in window || delete ss.transitionend.transition);
function _l(e) {
  if (hu[e]) return hu[e];
  if (!ss[e]) return e;
  var t = ss[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in kv) return hu[e] = t[n];
  return e;
}
var Tv = _l("animationend"), Ev = _l("animationiteration"), Cv = _l("animationstart"), Pv = _l("transitionend"), Av = /* @__PURE__ */ new Map(), gp = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function sr(e, t) {
  Av.set(e, t), Br(t, [e]);
}
for (var fu = 0; fu < gp.length; fu++) {
  var pu = gp[fu], X_ = pu.toLowerCase(), Z_ = pu[0].toUpperCase() + pu.slice(1);
  sr(X_, "on" + Z_);
}
sr(Tv, "onAnimationEnd");
sr(Ev, "onAnimationIteration");
sr(Cv, "onAnimationStart");
sr("dblclick", "onDoubleClick");
sr("focusin", "onFocus");
sr("focusout", "onBlur");
sr(Pv, "onTransitionEnd");
Ds("onMouseEnter", ["mouseout", "mouseover"]);
Ds("onMouseLeave", ["mouseout", "mouseover"]);
Ds("onPointerEnter", ["pointerout", "pointerover"]);
Ds("onPointerLeave", ["pointerout", "pointerover"]);
Br("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Br("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Br("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Br("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Br("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Br("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var wi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), e1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(wi));
function yp(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, XS(r, t, void 0, e), e.currentTarget = null;
}
function Rv(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], s = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var a = r[o], l = a.instance, u = a.currentTarget;
        if (a = a.listener, l !== i && s.isPropagationStopped()) break e;
        yp(s, a, u), i = l;
      }
      else for (o = 0; o < r.length; o++) {
        if (a = r[o], l = a.instance, u = a.currentTarget, a = a.listener, l !== i && s.isPropagationStopped()) break e;
        yp(s, a, u), i = l;
      }
    }
  }
  if (Da) throw e = wc, Da = !1, wc = null, e;
}
function re(e, t) {
  var n = t[Ac];
  n === void 0 && (n = t[Ac] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Ov(t, e, 2, !1), n.add(r));
}
function mu(e, t, n) {
  var r = 0;
  t && (r |= 4), Ov(n, e, r, t);
}
var Ho = "_reactListening" + Math.random().toString(36).slice(2);
function qi(e) {
  if (!e[Ho]) {
    e[Ho] = !0, $y.forEach(function(n) {
      n !== "selectionchange" && (e1.has(n) || mu(n, !1, e), mu(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ho] || (t[Ho] = !0, mu("selectionchange", !1, t));
  }
}
function Ov(e, t, n, r) {
  switch (pv(t)) {
    case 1:
      var s = p_;
      break;
    case 4:
      s = m_;
      break;
    default:
      s = sh;
  }
  n = s.bind(null, t, n, e), s = void 0, !vc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), r ? s !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: s }) : e.addEventListener(t, n, !0) : s !== void 0 ? e.addEventListener(t, n, { passive: s }) : e.addEventListener(t, n, !1);
}
function gu(e, t, n, r, s) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var a = r.stateNode.containerInfo;
      if (a === s || a.nodeType === 8 && a.parentNode === s) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var l = o.tag;
        if ((l === 3 || l === 4) && (l = o.stateNode.containerInfo, l === s || l.nodeType === 8 && l.parentNode === s)) return;
        o = o.return;
      }
      for (; a !== null; ) {
        if (o = xr(a), o === null) return;
        if (l = o.tag, l === 5 || l === 6) {
          r = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  ev(function() {
    var u = i, c = eh(n), d = [];
    e: {
      var h = Av.get(e);
      if (h !== void 0) {
        var f = oh, g = e;
        switch (e) {
          case "keypress":
            if (va(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = R_;
            break;
          case "focusin":
            g = "focus", f = uu;
            break;
          case "focusout":
            g = "blur", f = uu;
            break;
          case "beforeblur":
          case "afterblur":
            f = uu;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            f = ip;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            f = v_;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = N_;
            break;
          case Tv:
          case Ev:
          case Cv:
            f = b_;
            break;
          case Pv:
            f = D_;
            break;
          case "scroll":
            f = g_;
            break;
          case "wheel":
            f = L_;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = __;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            f = ap;
        }
        var y = (t & 4) !== 0, w = !y && e === "scroll", p = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var m = u, v; m !== null; ) {
          v = m;
          var x = v.stateNode;
          if (v.tag === 5 && x !== null && (v = x, p !== null && (x = Ui(m, p), x != null && y.push(Gi(m, x, v)))), w) break;
          m = m.return;
        }
        0 < y.length && (h = new f(h, g, null, n, c), d.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", h && n !== gc && (g = n.relatedTarget || n.fromElement) && (xr(g) || g[mn])) break e;
        if ((f || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, f ? (g = n.relatedTarget || n.toElement, f = u, g = g ? xr(g) : null, g !== null && (w = zr(g), g !== w || g.tag !== 5 && g.tag !== 6) && (g = null)) : (f = null, g = u), f !== g)) {
          if (y = ip, x = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (y = ap, x = "onPointerLeave", p = "onPointerEnter", m = "pointer"), w = f == null ? h : is(f), v = g == null ? h : is(g), h = new y(x, m + "leave", f, n, c), h.target = w, h.relatedTarget = v, x = null, xr(c) === u && (y = new y(p, m + "enter", g, n, c), y.target = v, y.relatedTarget = w, x = y), w = x, f && g) t: {
            for (y = f, p = g, m = 0, v = y; v; v = Wr(v)) m++;
            for (v = 0, x = p; x; x = Wr(x)) v++;
            for (; 0 < m - v; ) y = Wr(y), m--;
            for (; 0 < v - m; ) p = Wr(p), v--;
            for (; m--; ) {
              if (y === p || p !== null && y === p.alternate) break t;
              y = Wr(y), p = Wr(p);
            }
            y = null;
          }
          else y = null;
          f !== null && vp(d, h, f, y, !1), g !== null && w !== null && vp(d, w, g, y, !0);
        }
      }
      e: {
        if (h = u ? is(u) : window, f = h.nodeName && h.nodeName.toLowerCase(), f === "select" || f === "input" && h.type === "file") var S = W_;
        else if (cp(h)) if (xv) S = G_;
        else {
          S = K_;
          var k = H_;
        }
        else (f = h.nodeName) && f.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (S = q_);
        if (S && (S = S(e, u))) {
          wv(d, S, n, c);
          break e;
        }
        k && k(e, h, u), e === "focusout" && (k = h._wrapperState) && k.controlled && h.type === "number" && dc(h, "number", h.value);
      }
      switch (k = u ? is(u) : window, e) {
        case "focusin":
          (cp(k) || k.contentEditable === "true") && (rs = k, _c = u, Ci = null);
          break;
        case "focusout":
          Ci = _c = rs = null;
          break;
        case "mousedown":
          kc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          kc = !1, mp(d, n, c);
          break;
        case "selectionchange":
          if (J_) break;
        case "keydown":
        case "keyup":
          mp(d, n, c);
      }
      var T;
      if (lh) e: {
        switch (e) {
          case "compositionstart":
            var E = "onCompositionStart";
            break e;
          case "compositionend":
            E = "onCompositionEnd";
            break e;
          case "compositionupdate":
            E = "onCompositionUpdate";
            break e;
        }
        E = void 0;
      }
      else ns ? yv(e, n) && (E = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E && (gv && n.locale !== "ko" && (ns || E !== "onCompositionStart" ? E === "onCompositionEnd" && ns && (T = mv()) : (Fn = c, ih = "value" in Fn ? Fn.value : Fn.textContent, ns = !0)), k = Va(u, E), 0 < k.length && (E = new op(E, e, null, n, c), d.push({ event: E, listeners: k }), T ? E.data = T : (T = vv(n), T !== null && (E.data = T)))), (T = F_ ? V_(e, n) : U_(e, n)) && (u = Va(u, "onBeforeInput"), 0 < u.length && (c = new op("onBeforeInput", "beforeinput", null, n, c), d.push({ event: c, listeners: u }), c.data = T));
    }
    Rv(d, t);
  });
}
function Gi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Va(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var s = e, i = s.stateNode;
    s.tag === 5 && i !== null && (s = i, i = Ui(e, n), i != null && r.unshift(Gi(e, i, s)), i = Ui(e, t), i != null && r.push(Gi(e, i, s))), e = e.return;
  }
  return r;
}
function Wr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function vp(e, t, n, r, s) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n, l = a.alternate, u = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 && u !== null && (a = u, s ? (l = Ui(n, i), l != null && o.unshift(Gi(n, l, a))) : s || (l = Ui(n, i), l != null && o.push(Gi(n, l, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var t1 = /\r\n?/g, n1 = /\u0000|\uFFFD/g;
function wp(e) {
  return (typeof e == "string" ? e : "" + e).replace(t1, `
`).replace(n1, "");
}
function Ko(e, t, n) {
  if (t = wp(t), wp(e) !== t && n) throw Error(O(425));
}
function Ua() {
}
var Tc = null, Ec = null;
function Cc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Pc = typeof setTimeout == "function" ? setTimeout : void 0, r1 = typeof clearTimeout == "function" ? clearTimeout : void 0, xp = typeof Promise == "function" ? Promise : void 0, s1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof xp < "u" ? function(e) {
  return xp.resolve(null).then(e).catch(i1);
} : Pc;
function i1(e) {
  setTimeout(function() {
    throw e;
  });
}
function yu(e, t) {
  var n = t, r = 0;
  do {
    var s = n.nextSibling;
    if (e.removeChild(n), s && s.nodeType === 8) if (n = s.data, n === "/$") {
      if (r === 0) {
        e.removeChild(s), Wi(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = s;
  } while (n);
  Wi(t);
}
function Hn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function bp(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Gs = Math.random().toString(36).slice(2), Kt = "__reactFiber$" + Gs, Qi = "__reactProps$" + Gs, mn = "__reactContainer$" + Gs, Ac = "__reactEvents$" + Gs, o1 = "__reactListeners$" + Gs, a1 = "__reactHandles$" + Gs;
function xr(e) {
  var t = e[Kt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[mn] || n[Kt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = bp(e); e !== null; ) {
        if (n = e[Kt]) return n;
        e = bp(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function _o(e) {
  return e = e[Kt] || e[mn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function is(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(O(33));
}
function kl(e) {
  return e[Qi] || null;
}
var Rc = [], os = -1;
function ir(e) {
  return { current: e };
}
function se(e) {
  0 > os || (e.current = Rc[os], Rc[os] = null, os--);
}
function te(e, t) {
  os++, Rc[os] = e.current, e.current = t;
}
var Jn = {}, Ve = ir(Jn), Xe = ir(!1), Dr = Jn;
function Ms(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Jn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var s = {}, i;
  for (i in n) s[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
}
function Ze(e) {
  return e = e.childContextTypes, e != null;
}
function Ba() {
  se(Xe), se(Ve);
}
function Sp(e, t, n) {
  if (Ve.current !== Jn) throw Error(O(168));
  te(Ve, t), te(Xe, n);
}
function jv(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var s in r) if (!(s in t)) throw Error(O(108, HS(e) || "Unknown", s));
  return fe({}, n, r);
}
function za(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jn, Dr = Ve.current, te(Ve, e), te(Xe, Xe.current), !0;
}
function _p(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(O(169));
  n ? (e = jv(e, t, Dr), r.__reactInternalMemoizedMergedChildContext = e, se(Xe), se(Ve), te(Ve, e)) : se(Xe), te(Xe, n);
}
var un = null, Tl = !1, vu = !1;
function Nv(e) {
  un === null ? un = [e] : un.push(e);
}
function l1(e) {
  Tl = !0, Nv(e);
}
function or() {
  if (!vu && un !== null) {
    vu = !0;
    var e = 0, t = Z;
    try {
      var n = un;
      for (Z = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      un = null, Tl = !1;
    } catch (s) {
      throw un !== null && (un = un.slice(e + 1)), sv(th, or), s;
    } finally {
      Z = t, vu = !1;
    }
  }
  return null;
}
var as = [], ls = 0, Wa = null, Ha = 0, pt = [], mt = 0, Mr = null, dn = 1, hn = "";
function hr(e, t) {
  as[ls++] = Ha, as[ls++] = Wa, Wa = e, Ha = t;
}
function Iv(e, t, n) {
  pt[mt++] = dn, pt[mt++] = hn, pt[mt++] = Mr, Mr = e;
  var r = dn;
  e = hn;
  var s = 32 - It(r) - 1;
  r &= ~(1 << s), n += 1;
  var i = 32 - It(t) + s;
  if (30 < i) {
    var o = s - s % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, s -= o, dn = 1 << 32 - It(t) + s | n << s | r, hn = i + e;
  } else dn = 1 << i | n << s | r, hn = e;
}
function ch(e) {
  e.return !== null && (hr(e, 1), Iv(e, 1, 0));
}
function dh(e) {
  for (; e === Wa; ) Wa = as[--ls], as[ls] = null, Ha = as[--ls], as[ls] = null;
  for (; e === Mr; ) Mr = pt[--mt], pt[mt] = null, hn = pt[--mt], pt[mt] = null, dn = pt[--mt], pt[mt] = null;
}
var ot = null, it = null, le = !1, Nt = null;
function Dv(e, t) {
  var n = gt(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function kp(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ot = e, it = Hn(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ot = e, it = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mr !== null ? { id: dn, overflow: hn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = gt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ot = e, it = null, !0) : !1;
    default:
      return !1;
  }
}
function Oc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function jc(e) {
  if (le) {
    var t = it;
    if (t) {
      var n = t;
      if (!kp(e, t)) {
        if (Oc(e)) throw Error(O(418));
        t = Hn(n.nextSibling);
        var r = ot;
        t && kp(e, t) ? Dv(r, n) : (e.flags = e.flags & -4097 | 2, le = !1, ot = e);
      }
    } else {
      if (Oc(e)) throw Error(O(418));
      e.flags = e.flags & -4097 | 2, le = !1, ot = e;
    }
  }
}
function Tp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ot = e;
}
function qo(e) {
  if (e !== ot) return !1;
  if (!le) return Tp(e), le = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Cc(e.type, e.memoizedProps)), t && (t = it)) {
    if (Oc(e)) throw Mv(), Error(O(418));
    for (; t; ) Dv(e, t), t = Hn(t.nextSibling);
  }
  if (Tp(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(O(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              it = Hn(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      it = null;
    }
  } else it = ot ? Hn(e.stateNode.nextSibling) : null;
  return !0;
}
function Mv() {
  for (var e = it; e; ) e = Hn(e.nextSibling);
}
function Ls() {
  it = ot = null, le = !1;
}
function hh(e) {
  Nt === null ? Nt = [e] : Nt.push(e);
}
var u1 = bn.ReactCurrentBatchConfig;
function ui(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(O(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(O(147, e));
      var s = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = s.refs;
        o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(O(284));
    if (!n._owner) throw Error(O(290, e));
  }
  return e;
}
function Go(e, t) {
  throw e = Object.prototype.toString.call(t), Error(O(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ep(e) {
  var t = e._init;
  return t(e._payload);
}
function Lv(e) {
  function t(p, m) {
    if (e) {
      var v = p.deletions;
      v === null ? (p.deletions = [m], p.flags |= 16) : v.push(m);
    }
  }
  function n(p, m) {
    if (!e) return null;
    for (; m !== null; ) t(p, m), m = m.sibling;
    return null;
  }
  function r(p, m) {
    for (p = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? p.set(m.key, m) : p.set(m.index, m), m = m.sibling;
    return p;
  }
  function s(p, m) {
    return p = Qn(p, m), p.index = 0, p.sibling = null, p;
  }
  function i(p, m, v) {
    return p.index = v, e ? (v = p.alternate, v !== null ? (v = v.index, v < m ? (p.flags |= 2, m) : v) : (p.flags |= 2, m)) : (p.flags |= 1048576, m);
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, m, v, x) {
    return m === null || m.tag !== 6 ? (m = Tu(v, p.mode, x), m.return = p, m) : (m = s(m, v), m.return = p, m);
  }
  function l(p, m, v, x) {
    var S = v.type;
    return S === ts ? c(p, m, v.props.children, x, v.key) : m !== null && (m.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Pn && Ep(S) === m.type) ? (x = s(m, v.props), x.ref = ui(p, m, v), x.return = p, x) : (x = Ta(v.type, v.key, v.props, null, p.mode, x), x.ref = ui(p, m, v), x.return = p, x);
  }
  function u(p, m, v, x) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== v.containerInfo || m.stateNode.implementation !== v.implementation ? (m = Eu(v, p.mode, x), m.return = p, m) : (m = s(m, v.children || []), m.return = p, m);
  }
  function c(p, m, v, x, S) {
    return m === null || m.tag !== 7 ? (m = Nr(v, p.mode, x, S), m.return = p, m) : (m = s(m, v), m.return = p, m);
  }
  function d(p, m, v) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Tu("" + m, p.mode, v), m.return = p, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Lo:
          return v = Ta(m.type, m.key, m.props, null, p.mode, v), v.ref = ui(p, null, m), v.return = p, v;
        case es:
          return m = Eu(m, p.mode, v), m.return = p, m;
        case Pn:
          var x = m._init;
          return d(p, x(m._payload), v);
      }
      if (yi(m) || si(m)) return m = Nr(m, p.mode, v, null), m.return = p, m;
      Go(p, m);
    }
    return null;
  }
  function h(p, m, v, x) {
    var S = m !== null ? m.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number") return S !== null ? null : a(p, m, "" + v, x);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Lo:
          return v.key === S ? l(p, m, v, x) : null;
        case es:
          return v.key === S ? u(p, m, v, x) : null;
        case Pn:
          return S = v._init, h(
            p,
            m,
            S(v._payload),
            x
          );
      }
      if (yi(v) || si(v)) return S !== null ? null : c(p, m, v, x, null);
      Go(p, v);
    }
    return null;
  }
  function f(p, m, v, x, S) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(v) || null, a(m, p, "" + x, S);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Lo:
          return p = p.get(x.key === null ? v : x.key) || null, l(m, p, x, S);
        case es:
          return p = p.get(x.key === null ? v : x.key) || null, u(m, p, x, S);
        case Pn:
          var k = x._init;
          return f(p, m, v, k(x._payload), S);
      }
      if (yi(x) || si(x)) return p = p.get(v) || null, c(m, p, x, S, null);
      Go(m, x);
    }
    return null;
  }
  function g(p, m, v, x) {
    for (var S = null, k = null, T = m, E = m = 0, A = null; T !== null && E < v.length; E++) {
      T.index > E ? (A = T, T = null) : A = T.sibling;
      var R = h(p, T, v[E], x);
      if (R === null) {
        T === null && (T = A);
        break;
      }
      e && T && R.alternate === null && t(p, T), m = i(R, m, E), k === null ? S = R : k.sibling = R, k = R, T = A;
    }
    if (E === v.length) return n(p, T), le && hr(p, E), S;
    if (T === null) {
      for (; E < v.length; E++) T = d(p, v[E], x), T !== null && (m = i(T, m, E), k === null ? S = T : k.sibling = T, k = T);
      return le && hr(p, E), S;
    }
    for (T = r(p, T); E < v.length; E++) A = f(T, p, E, v[E], x), A !== null && (e && A.alternate !== null && T.delete(A.key === null ? E : A.key), m = i(A, m, E), k === null ? S = A : k.sibling = A, k = A);
    return e && T.forEach(function(F) {
      return t(p, F);
    }), le && hr(p, E), S;
  }
  function y(p, m, v, x) {
    var S = si(v);
    if (typeof S != "function") throw Error(O(150));
    if (v = S.call(v), v == null) throw Error(O(151));
    for (var k = S = null, T = m, E = m = 0, A = null, R = v.next(); T !== null && !R.done; E++, R = v.next()) {
      T.index > E ? (A = T, T = null) : A = T.sibling;
      var F = h(p, T, R.value, x);
      if (F === null) {
        T === null && (T = A);
        break;
      }
      e && T && F.alternate === null && t(p, T), m = i(F, m, E), k === null ? S = F : k.sibling = F, k = F, T = A;
    }
    if (R.done) return n(
      p,
      T
    ), le && hr(p, E), S;
    if (T === null) {
      for (; !R.done; E++, R = v.next()) R = d(p, R.value, x), R !== null && (m = i(R, m, E), k === null ? S = R : k.sibling = R, k = R);
      return le && hr(p, E), S;
    }
    for (T = r(p, T); !R.done; E++, R = v.next()) R = f(T, p, E, R.value, x), R !== null && (e && R.alternate !== null && T.delete(R.key === null ? E : R.key), m = i(R, m, E), k === null ? S = R : k.sibling = R, k = R);
    return e && T.forEach(function(L) {
      return t(p, L);
    }), le && hr(p, E), S;
  }
  function w(p, m, v, x) {
    if (typeof v == "object" && v !== null && v.type === ts && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Lo:
          e: {
            for (var S = v.key, k = m; k !== null; ) {
              if (k.key === S) {
                if (S = v.type, S === ts) {
                  if (k.tag === 7) {
                    n(p, k.sibling), m = s(k, v.props.children), m.return = p, p = m;
                    break e;
                  }
                } else if (k.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Pn && Ep(S) === k.type) {
                  n(p, k.sibling), m = s(k, v.props), m.ref = ui(p, k, v), m.return = p, p = m;
                  break e;
                }
                n(p, k);
                break;
              } else t(p, k);
              k = k.sibling;
            }
            v.type === ts ? (m = Nr(v.props.children, p.mode, x, v.key), m.return = p, p = m) : (x = Ta(v.type, v.key, v.props, null, p.mode, x), x.ref = ui(p, m, v), x.return = p, p = x);
          }
          return o(p);
        case es:
          e: {
            for (k = v.key; m !== null; ) {
              if (m.key === k) if (m.tag === 4 && m.stateNode.containerInfo === v.containerInfo && m.stateNode.implementation === v.implementation) {
                n(p, m.sibling), m = s(m, v.children || []), m.return = p, p = m;
                break e;
              } else {
                n(p, m);
                break;
              }
              else t(p, m);
              m = m.sibling;
            }
            m = Eu(v, p.mode, x), m.return = p, p = m;
          }
          return o(p);
        case Pn:
          return k = v._init, w(p, m, k(v._payload), x);
      }
      if (yi(v)) return g(p, m, v, x);
      if (si(v)) return y(p, m, v, x);
      Go(p, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, m !== null && m.tag === 6 ? (n(p, m.sibling), m = s(m, v), m.return = p, p = m) : (n(p, m), m = Tu(v, p.mode, x), m.return = p, p = m), o(p)) : n(p, m);
  }
  return w;
}
var $s = Lv(!0), $v = Lv(!1), Ka = ir(null), qa = null, us = null, fh = null;
function ph() {
  fh = us = qa = null;
}
function mh(e) {
  var t = Ka.current;
  se(Ka), e._currentValue = t;
}
function Nc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function bs(e, t) {
  qa = e, fh = us = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Je = !0), e.firstContext = null);
}
function xt(e) {
  var t = e._currentValue;
  if (fh !== e) if (e = { context: e, memoizedValue: t, next: null }, us === null) {
    if (qa === null) throw Error(O(308));
    us = e, qa.dependencies = { lanes: 0, firstContext: e };
  } else us = us.next = e;
  return t;
}
var br = null;
function gh(e) {
  br === null ? br = [e] : br.push(e);
}
function Fv(e, t, n, r) {
  var s = t.interleaved;
  return s === null ? (n.next = n, gh(t)) : (n.next = s.next, s.next = n), t.interleaved = n, gn(e, r);
}
function gn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var An = !1;
function yh(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Vv(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function fn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Kn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Y & 2) {
    var s = r.pending;
    return s === null ? t.next = t : (t.next = s.next, s.next = t), r.pending = t, gn(e, n);
  }
  return s = r.interleaved, s === null ? (t.next = t, gh(r)) : (t.next = s.next, s.next = t), r.interleaved = t, gn(e, n);
}
function wa(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, nh(e, n);
  }
}
function Cp(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var s = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? s = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? s = i = t : i = i.next = t;
    } else s = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: s, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Ga(e, t, n, r) {
  var s = e.updateQueue;
  An = !1;
  var i = s.firstBaseUpdate, o = s.lastBaseUpdate, a = s.shared.pending;
  if (a !== null) {
    s.shared.pending = null;
    var l = a, u = l.next;
    l.next = null, o === null ? i = u : o.next = u, o = l;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== o && (a === null ? c.firstBaseUpdate = u : a.next = u, c.lastBaseUpdate = l));
  }
  if (i !== null) {
    var d = s.baseState;
    o = 0, c = u = l = null, a = i;
    do {
      var h = a.lane, f = a.eventTime;
      if ((r & h) === h) {
        c !== null && (c = c.next = {
          eventTime: f,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, y = a;
          switch (h = t, f = n, y.tag) {
            case 1:
              if (g = y.payload, typeof g == "function") {
                d = g.call(f, d, h);
                break e;
              }
              d = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = y.payload, h = typeof g == "function" ? g.call(f, d, h) : g, h == null) break e;
              d = fe({}, d, h);
              break e;
            case 2:
              An = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = s.effects, h === null ? s.effects = [a] : h.push(a));
      } else f = { eventTime: f, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, c === null ? (u = c = f, l = d) : c = c.next = f, o |= h;
      if (a = a.next, a === null) {
        if (a = s.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, s.lastBaseUpdate = h, s.shared.pending = null;
      }
    } while (!0);
    if (c === null && (l = d), s.baseState = l, s.firstBaseUpdate = u, s.lastBaseUpdate = c, t = s.shared.interleaved, t !== null) {
      s = t;
      do
        o |= s.lane, s = s.next;
      while (s !== t);
    } else i === null && (s.shared.lanes = 0);
    $r |= o, e.lanes = o, e.memoizedState = d;
  }
}
function Pp(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], s = r.callback;
    if (s !== null) {
      if (r.callback = null, r = n, typeof s != "function") throw Error(O(191, s));
      s.call(r);
    }
  }
}
var ko = {}, Qt = ir(ko), Yi = ir(ko), Ji = ir(ko);
function Sr(e) {
  if (e === ko) throw Error(O(174));
  return e;
}
function vh(e, t) {
  switch (te(Ji, t), te(Yi, e), te(Qt, ko), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : fc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = fc(t, e);
  }
  se(Qt), te(Qt, t);
}
function Fs() {
  se(Qt), se(Yi), se(Ji);
}
function Uv(e) {
  Sr(Ji.current);
  var t = Sr(Qt.current), n = fc(t, e.type);
  t !== n && (te(Yi, e), te(Qt, n));
}
function wh(e) {
  Yi.current === e && (se(Qt), se(Yi));
}
var ce = ir(0);
function Qa(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var wu = [];
function xh() {
  for (var e = 0; e < wu.length; e++) wu[e]._workInProgressVersionPrimary = null;
  wu.length = 0;
}
var xa = bn.ReactCurrentDispatcher, xu = bn.ReactCurrentBatchConfig, Lr = 0, he = null, _e = null, Ee = null, Ya = !1, Pi = !1, Xi = 0, c1 = 0;
function De() {
  throw Error(O(321));
}
function bh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Mt(e[n], t[n])) return !1;
  return !0;
}
function Sh(e, t, n, r, s, i) {
  if (Lr = i, he = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, xa.current = e === null || e.memoizedState === null ? p1 : m1, e = n(r, s), Pi) {
    i = 0;
    do {
      if (Pi = !1, Xi = 0, 25 <= i) throw Error(O(301));
      i += 1, Ee = _e = null, t.updateQueue = null, xa.current = g1, e = n(r, s);
    } while (Pi);
  }
  if (xa.current = Ja, t = _e !== null && _e.next !== null, Lr = 0, Ee = _e = he = null, Ya = !1, t) throw Error(O(300));
  return e;
}
function _h() {
  var e = Xi !== 0;
  return Xi = 0, e;
}
function Bt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Ee === null ? he.memoizedState = Ee = e : Ee = Ee.next = e, Ee;
}
function bt() {
  if (_e === null) {
    var e = he.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = _e.next;
  var t = Ee === null ? he.memoizedState : Ee.next;
  if (t !== null) Ee = t, _e = e;
  else {
    if (e === null) throw Error(O(310));
    _e = e, e = { memoizedState: _e.memoizedState, baseState: _e.baseState, baseQueue: _e.baseQueue, queue: _e.queue, next: null }, Ee === null ? he.memoizedState = Ee = e : Ee = Ee.next = e;
  }
  return Ee;
}
function Zi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function bu(e) {
  var t = bt(), n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = _e, s = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (s !== null) {
      var o = s.next;
      s.next = i.next, i.next = o;
    }
    r.baseQueue = s = i, n.pending = null;
  }
  if (s !== null) {
    i = s.next, r = r.baseState;
    var a = o = null, l = null, u = i;
    do {
      var c = u.lane;
      if ((Lr & c) === c) l !== null && (l = l.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        l === null ? (a = l = d, o = r) : l = l.next = d, he.lanes |= c, $r |= c;
      }
      u = u.next;
    } while (u !== null && u !== i);
    l === null ? o = r : l.next = a, Mt(r, t.memoizedState) || (Je = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = l, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    s = e;
    do
      i = s.lane, he.lanes |= i, $r |= i, s = s.next;
    while (s !== e);
  } else s === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Su(e) {
  var t = bt(), n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, s = n.pending, i = t.memoizedState;
  if (s !== null) {
    n.pending = null;
    var o = s = s.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== s);
    Mt(i, t.memoizedState) || (Je = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Bv() {
}
function zv(e, t) {
  var n = he, r = bt(), s = t(), i = !Mt(r.memoizedState, s);
  if (i && (r.memoizedState = s, Je = !0), r = r.queue, kh(Kv.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || Ee !== null && Ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, eo(9, Hv.bind(null, n, r, s, t), void 0, null), Ce === null) throw Error(O(349));
    Lr & 30 || Wv(n, t, s);
  }
  return s;
}
function Wv(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = he.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, he.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Hv(e, t, n, r) {
  t.value = n, t.getSnapshot = r, qv(t) && Gv(e);
}
function Kv(e, t, n) {
  return n(function() {
    qv(t) && Gv(e);
  });
}
function qv(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Mt(e, n);
  } catch {
    return !0;
  }
}
function Gv(e) {
  var t = gn(e, 1);
  t !== null && Dt(t, e, 1, -1);
}
function Ap(e) {
  var t = Bt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zi, lastRenderedState: e }, t.queue = e, e = e.dispatch = f1.bind(null, he, e), [t.memoizedState, e];
}
function eo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = he.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, he.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Qv() {
  return bt().memoizedState;
}
function ba(e, t, n, r) {
  var s = Bt();
  he.flags |= e, s.memoizedState = eo(1 | t, n, void 0, r === void 0 ? null : r);
}
function El(e, t, n, r) {
  var s = bt();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (_e !== null) {
    var o = _e.memoizedState;
    if (i = o.destroy, r !== null && bh(r, o.deps)) {
      s.memoizedState = eo(t, n, i, r);
      return;
    }
  }
  he.flags |= e, s.memoizedState = eo(1 | t, n, i, r);
}
function Rp(e, t) {
  return ba(8390656, 8, e, t);
}
function kh(e, t) {
  return El(2048, 8, e, t);
}
function Yv(e, t) {
  return El(4, 2, e, t);
}
function Jv(e, t) {
  return El(4, 4, e, t);
}
function Xv(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Zv(e, t, n) {
  return n = n != null ? n.concat([e]) : null, El(4, 4, Xv.bind(null, t, e), n);
}
function Th() {
}
function e0(e, t) {
  var n = bt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bh(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function t0(e, t) {
  var n = bt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bh(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function n0(e, t, n) {
  return Lr & 21 ? (Mt(n, t) || (n = av(), he.lanes |= n, $r |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Je = !0), e.memoizedState = n);
}
function d1(e, t) {
  var n = Z;
  Z = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = xu.transition;
  xu.transition = {};
  try {
    e(!1), t();
  } finally {
    Z = n, xu.transition = r;
  }
}
function r0() {
  return bt().memoizedState;
}
function h1(e, t, n) {
  var r = Gn(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, s0(e)) i0(t, n);
  else if (n = Fv(e, t, n, r), n !== null) {
    var s = Ke();
    Dt(n, e, r, s), o0(n, t, r);
  }
}
function f1(e, t, n) {
  var r = Gn(e), s = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (s0(e)) i0(t, s);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (s.hasEagerState = !0, s.eagerState = a, Mt(a, o)) {
        var l = t.interleaved;
        l === null ? (s.next = s, gh(t)) : (s.next = l.next, l.next = s), t.interleaved = s;
        return;
      }
    } catch {
    } finally {
    }
    n = Fv(e, t, s, r), n !== null && (s = Ke(), Dt(n, e, r, s), o0(n, t, r));
  }
}
function s0(e) {
  var t = e.alternate;
  return e === he || t !== null && t === he;
}
function i0(e, t) {
  Pi = Ya = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function o0(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, nh(e, n);
  }
}
var Ja = { readContext: xt, useCallback: De, useContext: De, useEffect: De, useImperativeHandle: De, useInsertionEffect: De, useLayoutEffect: De, useMemo: De, useReducer: De, useRef: De, useState: De, useDebugValue: De, useDeferredValue: De, useTransition: De, useMutableSource: De, useSyncExternalStore: De, useId: De, unstable_isNewReconciler: !1 }, p1 = { readContext: xt, useCallback: function(e, t) {
  return Bt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: xt, useEffect: Rp, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ba(
    4194308,
    4,
    Xv.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ba(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ba(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Bt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Bt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = h1.bind(null, he, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Bt();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ap, useDebugValue: Th, useDeferredValue: function(e) {
  return Bt().memoizedState = e;
}, useTransition: function() {
  var e = Ap(!1), t = e[0];
  return e = d1.bind(null, e[1]), Bt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = he, s = Bt();
  if (le) {
    if (n === void 0) throw Error(O(407));
    n = n();
  } else {
    if (n = t(), Ce === null) throw Error(O(349));
    Lr & 30 || Wv(r, t, n);
  }
  s.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return s.queue = i, Rp(Kv.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, eo(9, Hv.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Bt(), t = Ce.identifierPrefix;
  if (le) {
    var n = hn, r = dn;
    n = (r & ~(1 << 32 - It(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Xi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = c1++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, m1 = {
  readContext: xt,
  useCallback: e0,
  useContext: xt,
  useEffect: kh,
  useImperativeHandle: Zv,
  useInsertionEffect: Yv,
  useLayoutEffect: Jv,
  useMemo: t0,
  useReducer: bu,
  useRef: Qv,
  useState: function() {
    return bu(Zi);
  },
  useDebugValue: Th,
  useDeferredValue: function(e) {
    var t = bt();
    return n0(t, _e.memoizedState, e);
  },
  useTransition: function() {
    var e = bu(Zi)[0], t = bt().memoizedState;
    return [e, t];
  },
  useMutableSource: Bv,
  useSyncExternalStore: zv,
  useId: r0,
  unstable_isNewReconciler: !1
}, g1 = { readContext: xt, useCallback: e0, useContext: xt, useEffect: kh, useImperativeHandle: Zv, useInsertionEffect: Yv, useLayoutEffect: Jv, useMemo: t0, useReducer: Su, useRef: Qv, useState: function() {
  return Su(Zi);
}, useDebugValue: Th, useDeferredValue: function(e) {
  var t = bt();
  return _e === null ? t.memoizedState = e : n0(t, _e.memoizedState, e);
}, useTransition: function() {
  var e = Su(Zi)[0], t = bt().memoizedState;
  return [e, t];
}, useMutableSource: Bv, useSyncExternalStore: zv, useId: r0, unstable_isNewReconciler: !1 };
function Ct(e, t) {
  if (e && e.defaultProps) {
    t = fe({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ic(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : fe({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Cl = { isMounted: function(e) {
  return (e = e._reactInternals) ? zr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Ke(), s = Gn(e), i = fn(r, s);
  i.payload = t, n != null && (i.callback = n), t = Kn(e, i, s), t !== null && (Dt(t, e, s, r), wa(t, e, s));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Ke(), s = Gn(e), i = fn(r, s);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Kn(e, i, s), t !== null && (Dt(t, e, s, r), wa(t, e, s));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Ke(), r = Gn(e), s = fn(n, r);
  s.tag = 2, t != null && (s.callback = t), t = Kn(e, s, r), t !== null && (Dt(t, e, r, n), wa(t, e, r));
} };
function Op(e, t, n, r, s, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Ki(n, r) || !Ki(s, i) : !0;
}
function a0(e, t, n) {
  var r = !1, s = Jn, i = t.contextType;
  return typeof i == "object" && i !== null ? i = xt(i) : (s = Ze(t) ? Dr : Ve.current, r = t.contextTypes, i = (r = r != null) ? Ms(e, s) : Jn), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Cl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function jp(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cl.enqueueReplaceState(t, t.state, null);
}
function Dc(e, t, n, r) {
  var s = e.stateNode;
  s.props = n, s.state = e.memoizedState, s.refs = {}, yh(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? s.context = xt(i) : (i = Ze(t) ? Dr : Ve.current, s.context = Ms(e, i)), s.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Ic(e, t, i, n), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && Cl.enqueueReplaceState(s, s.state, null), Ga(e, n, s, r), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
}
function Vs(e, t) {
  try {
    var n = "", r = t;
    do
      n += WS(r), r = r.return;
    while (r);
    var s = n;
  } catch (i) {
    s = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function _u(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Mc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var y1 = typeof WeakMap == "function" ? WeakMap : Map;
function l0(e, t, n) {
  n = fn(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Za || (Za = !0, Kc = r), Mc(e, t);
  }, n;
}
function u0(e, t, n) {
  n = fn(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var s = t.value;
    n.payload = function() {
      return r(s);
    }, n.callback = function() {
      Mc(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Mc(e, t), typeof r != "function" && (qn === null ? qn = /* @__PURE__ */ new Set([this]) : qn.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Np(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new y1();
    var s = /* @__PURE__ */ new Set();
    r.set(t, s);
  } else s = r.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), r.set(t, s));
  s.has(n) || (s.add(n), e = O1.bind(null, e, t, n), t.then(e, e));
}
function Ip(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Dp(e, t, n, r, s) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = fn(-1, 1), t.tag = 2, Kn(n, t, 1))), n.lanes |= 1), e);
}
var v1 = bn.ReactCurrentOwner, Je = !1;
function Be(e, t, n, r) {
  t.child = e === null ? $v(t, null, n, r) : $s(t, e.child, n, r);
}
function Mp(e, t, n, r, s) {
  n = n.render;
  var i = t.ref;
  return bs(t, s), r = Sh(e, t, n, r, i, s), n = _h(), e !== null && !Je ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, yn(e, t, s)) : (le && n && ch(t), t.flags |= 1, Be(e, t, r, s), t.child);
}
function Lp(e, t, n, r, s) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Nh(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, c0(e, t, i, r, s)) : (e = Ta(n.type, null, r, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & s)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ki, n(o, r) && e.ref === t.ref) return yn(e, t, s);
  }
  return t.flags |= 1, e = Qn(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function c0(e, t, n, r, s) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Ki(i, r) && e.ref === t.ref) if (Je = !1, t.pendingProps = r = i, (e.lanes & s) !== 0) e.flags & 131072 && (Je = !0);
    else return t.lanes = e.lanes, yn(e, t, s);
  }
  return Lc(e, t, n, r, s);
}
function d0(e, t, n) {
  var r = t.pendingProps, s = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, te(ds, rt), rt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, te(ds, rt), rt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, te(ds, rt), rt |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, te(ds, rt), rt |= r;
  return Be(e, t, s, n), t.child;
}
function h0(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Lc(e, t, n, r, s) {
  var i = Ze(n) ? Dr : Ve.current;
  return i = Ms(t, i), bs(t, s), n = Sh(e, t, n, r, i, s), r = _h(), e !== null && !Je ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, yn(e, t, s)) : (le && r && ch(t), t.flags |= 1, Be(e, t, n, s), t.child);
}
function $p(e, t, n, r, s) {
  if (Ze(n)) {
    var i = !0;
    za(t);
  } else i = !1;
  if (bs(t, s), t.stateNode === null) Sa(e, t), a0(t, n, r), Dc(t, n, r, s), r = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var l = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = xt(u) : (u = Ze(n) ? Dr : Ve.current, u = Ms(t, u));
    var c = n.getDerivedStateFromProps, d = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || l !== u) && jp(t, o, r, u), An = !1;
    var h = t.memoizedState;
    o.state = h, Ga(t, r, o, s), l = t.memoizedState, a !== r || h !== l || Xe.current || An ? (typeof c == "function" && (Ic(t, n, c, r), l = t.memoizedState), (a = An || Op(t, n, a, r, h, l, u)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), o.props = r, o.state = l, o.context = u, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Vv(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : Ct(t.type, a), o.props = u, d = t.pendingProps, h = o.context, l = n.contextType, typeof l == "object" && l !== null ? l = xt(l) : (l = Ze(n) ? Dr : Ve.current, l = Ms(t, l));
    var f = n.getDerivedStateFromProps;
    (c = typeof f == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== d || h !== l) && jp(t, o, r, l), An = !1, h = t.memoizedState, o.state = h, Ga(t, r, o, s);
    var g = t.memoizedState;
    a !== d || h !== g || Xe.current || An ? (typeof f == "function" && (Ic(t, n, f, r), g = t.memoizedState), (u = An || Op(t, n, u, r, h, g, l) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, g, l), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, g, l)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), o.props = r, o.state = g, o.context = l, r = u) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return $c(e, t, n, r, i, s);
}
function $c(e, t, n, r, s, i) {
  h0(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return s && _p(t, n, !1), yn(e, t, i);
  r = t.stateNode, v1.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = $s(t, e.child, null, i), t.child = $s(t, null, a, i)) : Be(e, t, a, i), t.memoizedState = r.state, s && _p(t, n, !0), t.child;
}
function f0(e) {
  var t = e.stateNode;
  t.pendingContext ? Sp(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Sp(e, t.context, !1), vh(e, t.containerInfo);
}
function Fp(e, t, n, r, s) {
  return Ls(), hh(s), t.flags |= 256, Be(e, t, n, r), t.child;
}
var Fc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function p0(e, t, n) {
  var r = t.pendingProps, s = ce.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), te(ce, s & 1), e === null)
    return jc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = Rl(o, r, 0, null), e = Nr(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Vc(n), t.memoizedState = Fc, e) : Eh(t, o));
  if (s = e.memoizedState, s !== null && (a = s.dehydrated, a !== null)) return w1(e, t, o, r, a, s, n);
  if (i) {
    i = r.fallback, o = t.mode, s = e.child, a = s.sibling;
    var l = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== s ? (r = t.child, r.childLanes = 0, r.pendingProps = l, t.deletions = null) : (r = Qn(s, l), r.subtreeFlags = s.subtreeFlags & 14680064), a !== null ? i = Qn(a, i) : (i = Nr(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Vc(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Fc, r;
  }
  return i = e.child, e = i.sibling, r = Qn(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Eh(e, t) {
  return t = Rl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Qo(e, t, n, r) {
  return r !== null && hh(r), $s(t, e.child, null, n), e = Eh(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function w1(e, t, n, r, s, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = _u(Error(O(422))), Qo(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, s = t.mode, r = Rl({ mode: "visible", children: r.children }, s, 0, null), i = Nr(i, s, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && $s(t, e.child, null, o), t.child.memoizedState = Vc(o), t.memoizedState = Fc, i);
  if (!(t.mode & 1)) return Qo(e, t, o, null);
  if (s.data === "$!") {
    if (r = s.nextSibling && s.nextSibling.dataset, r) var a = r.dgst;
    return r = a, i = Error(O(419)), r = _u(i, r, void 0), Qo(e, t, o, r);
  }
  if (a = (o & e.childLanes) !== 0, Je || a) {
    if (r = Ce, r !== null) {
      switch (o & -o) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
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
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      s = s & (r.suspendedLanes | o) ? 0 : s, s !== 0 && s !== i.retryLane && (i.retryLane = s, gn(e, s), Dt(r, e, s, -1));
    }
    return jh(), r = _u(Error(O(421))), Qo(e, t, o, r);
  }
  return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = j1.bind(null, e), s._reactRetry = t, null) : (e = i.treeContext, it = Hn(s.nextSibling), ot = t, le = !0, Nt = null, e !== null && (pt[mt++] = dn, pt[mt++] = hn, pt[mt++] = Mr, dn = e.id, hn = e.overflow, Mr = t), t = Eh(t, r.children), t.flags |= 4096, t);
}
function Vp(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Nc(e.return, t, n);
}
function ku(e, t, n, r, s) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: s } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = s);
}
function m0(e, t, n) {
  var r = t.pendingProps, s = r.revealOrder, i = r.tail;
  if (Be(e, t, r.children, n), r = ce.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Vp(e, n, t);
      else if (e.tag === 19) Vp(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (te(ce, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (s) {
    case "forwards":
      for (n = t.child, s = null; n !== null; ) e = n.alternate, e !== null && Qa(e) === null && (s = n), n = n.sibling;
      n = s, n === null ? (s = t.child, t.child = null) : (s = n.sibling, n.sibling = null), ku(t, !1, s, n, i);
      break;
    case "backwards":
      for (n = null, s = t.child, t.child = null; s !== null; ) {
        if (e = s.alternate, e !== null && Qa(e) === null) {
          t.child = s;
          break;
        }
        e = s.sibling, s.sibling = n, n = s, s = e;
      }
      ku(t, !0, n, null, i);
      break;
    case "together":
      ku(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Sa(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function yn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $r |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(O(153));
  if (t.child !== null) {
    for (e = t.child, n = Qn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Qn(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function x1(e, t, n) {
  switch (t.tag) {
    case 3:
      f0(t), Ls();
      break;
    case 5:
      Uv(t);
      break;
    case 1:
      Ze(t.type) && za(t);
      break;
    case 4:
      vh(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, s = t.memoizedProps.value;
      te(Ka, r._currentValue), r._currentValue = s;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (te(ce, ce.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? p0(e, t, n) : (te(ce, ce.current & 1), e = yn(e, t, n), e !== null ? e.sibling : null);
      te(ce, ce.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return m0(e, t, n);
        t.flags |= 128;
      }
      if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), te(ce, ce.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, d0(e, t, n);
  }
  return yn(e, t, n);
}
var g0, Uc, y0, v0;
g0 = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Uc = function() {
};
y0 = function(e, t, n, r) {
  var s = e.memoizedProps;
  if (s !== r) {
    e = t.stateNode, Sr(Qt.current);
    var i = null;
    switch (n) {
      case "input":
        s = uc(e, s), r = uc(e, r), i = [];
        break;
      case "select":
        s = fe({}, s, { value: void 0 }), r = fe({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        s = hc(e, s), r = hc(e, r), i = [];
        break;
      default:
        typeof s.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ua);
    }
    pc(n, r);
    var o;
    n = null;
    for (u in s) if (!r.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null) if (u === "style") {
      var a = s[u];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Fi.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (a = s != null ? s[u] : void 0, r.hasOwnProperty(u) && l !== a && (l != null || a != null)) if (u === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || l && l.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in l) l.hasOwnProperty(o) && a[o] !== l[o] && (n || (n = {}), n[o] = l[o]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = l;
      else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, a = a ? a.__html : void 0, l != null && a !== l && (i = i || []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (i = i || []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Fi.hasOwnProperty(u) ? (l != null && u === "onScroll" && re("scroll", e), i || a === l || (i = [])) : (i = i || []).push(u, l));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
v0 = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ci(e, t) {
  if (!le) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function Me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var s = e.child; s !== null; ) n |= s.lanes | s.childLanes, r |= s.subtreeFlags & 14680064, r |= s.flags & 14680064, s.return = e, s = s.sibling;
  else for (s = e.child; s !== null; ) n |= s.lanes | s.childLanes, r |= s.subtreeFlags, r |= s.flags, s.return = e, s = s.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function b1(e, t, n) {
  var r = t.pendingProps;
  switch (dh(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(t), null;
    case 1:
      return Ze(t.type) && Ba(), Me(t), null;
    case 3:
      return r = t.stateNode, Fs(), se(Xe), se(Ve), xh(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (qo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Nt !== null && (Qc(Nt), Nt = null))), Uc(e, t), Me(t), null;
    case 5:
      wh(t);
      var s = Sr(Ji.current);
      if (n = t.type, e !== null && t.stateNode != null) y0(e, t, n, r, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(O(166));
          return Me(t), null;
        }
        if (e = Sr(Qt.current), qo(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Kt] = t, r[Qi] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              re("cancel", r), re("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              re("load", r);
              break;
            case "video":
            case "audio":
              for (s = 0; s < wi.length; s++) re(wi[s], r);
              break;
            case "source":
              re("error", r);
              break;
            case "img":
            case "image":
            case "link":
              re(
                "error",
                r
              ), re("load", r);
              break;
            case "details":
              re("toggle", r);
              break;
            case "input":
              Qf(r, i), re("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, re("invalid", r);
              break;
            case "textarea":
              Jf(r, i), re("invalid", r);
          }
          pc(n, i), s = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && Ko(r.textContent, a, e), s = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Ko(
              r.textContent,
              a,
              e
            ), s = ["children", "" + a]) : Fi.hasOwnProperty(o) && a != null && o === "onScroll" && re("scroll", r);
          }
          switch (n) {
            case "input":
              $o(r), Yf(r, i, !0);
              break;
            case "textarea":
              $o(r), Xf(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Ua);
          }
          r = s, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ky(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Kt] = t, e[Qi] = r, g0(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = mc(n, r), n) {
              case "dialog":
                re("cancel", e), re("close", e), s = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", e), s = r;
                break;
              case "video":
              case "audio":
                for (s = 0; s < wi.length; s++) re(wi[s], e);
                s = r;
                break;
              case "source":
                re("error", e), s = r;
                break;
              case "img":
              case "image":
              case "link":
                re(
                  "error",
                  e
                ), re("load", e), s = r;
                break;
              case "details":
                re("toggle", e), s = r;
                break;
              case "input":
                Qf(e, r), s = uc(e, r), re("invalid", e);
                break;
              case "option":
                s = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, s = fe({}, r, { value: void 0 }), re("invalid", e);
                break;
              case "textarea":
                Jf(e, r), s = hc(e, r), re("invalid", e);
                break;
              default:
                s = r;
            }
            pc(n, s), a = s;
            for (i in a) if (a.hasOwnProperty(i)) {
              var l = a[i];
              i === "style" ? Qy(e, l) : i === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null && qy(e, l)) : i === "children" ? typeof l == "string" ? (n !== "textarea" || l !== "") && Vi(e, l) : typeof l == "number" && Vi(e, "" + l) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Fi.hasOwnProperty(i) ? l != null && i === "onScroll" && re("scroll", e) : l != null && Yd(e, i, l, o));
            }
            switch (n) {
              case "input":
                $o(e), Yf(e, r, !1);
                break;
              case "textarea":
                $o(e), Xf(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Yn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? ys(e, !!r.multiple, i, !1) : r.defaultValue != null && ys(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof s.onClick == "function" && (e.onclick = Ua);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Me(t), null;
    case 6:
      if (e && t.stateNode != null) v0(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(O(166));
        if (n = Sr(Ji.current), Sr(Qt.current), qo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Kt] = t, (i = r.nodeValue !== n) && (e = ot, e !== null)) switch (e.tag) {
            case 3:
              Ko(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ko(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Kt] = t, t.stateNode = r;
      }
      return Me(t), null;
    case 13:
      if (se(ce), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (le && it !== null && t.mode & 1 && !(t.flags & 128)) Mv(), Ls(), t.flags |= 98560, i = !1;
        else if (i = qo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(O(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(O(317));
            i[Kt] = t;
          } else Ls(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Me(t), i = !1;
        } else Nt !== null && (Qc(Nt), Nt = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ce.current & 1 ? Te === 0 && (Te = 3) : jh())), t.updateQueue !== null && (t.flags |= 4), Me(t), null);
    case 4:
      return Fs(), Uc(e, t), e === null && qi(t.stateNode.containerInfo), Me(t), null;
    case 10:
      return mh(t.type._context), Me(t), null;
    case 17:
      return Ze(t.type) && Ba(), Me(t), null;
    case 19:
      if (se(ce), i = t.memoizedState, i === null) return Me(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) ci(i, !1);
      else {
        if (Te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Qa(e), o !== null) {
            for (t.flags |= 128, ci(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return te(ce, ce.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && ye() > Us && (t.flags |= 128, r = !0, ci(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Qa(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ci(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !le) return Me(t), null;
        } else 2 * ye() - i.renderingStartTime > Us && n !== 1073741824 && (t.flags |= 128, r = !0, ci(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ye(), t.sibling = null, n = ce.current, te(ce, r ? n & 1 | 2 : n & 1), t) : (Me(t), null);
    case 22:
    case 23:
      return Oh(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? rt & 1073741824 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Me(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(O(156, t.tag));
}
function S1(e, t) {
  switch (dh(t), t.tag) {
    case 1:
      return Ze(t.type) && Ba(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Fs(), se(Xe), se(Ve), xh(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return wh(t), null;
    case 13:
      if (se(ce), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(O(340));
        Ls();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return se(ce), null;
    case 4:
      return Fs(), null;
    case 10:
      return mh(t.type._context), null;
    case 22:
    case 23:
      return Oh(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Yo = !1, $e = !1, _1 = typeof WeakSet == "function" ? WeakSet : Set, I = null;
function cs(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ge(e, t, r);
  }
  else n.current = null;
}
function Bc(e, t, n) {
  try {
    n();
  } catch (r) {
    ge(e, t, r);
  }
}
var Up = !1;
function k1(e, t) {
  if (Tc = $a, e = _v(), uh(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var s = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, a = -1, l = -1, u = 0, c = 0, d = e, h = null;
        t: for (; ; ) {
          for (var f; d !== n || s !== 0 && d.nodeType !== 3 || (a = o + s), d !== i || r !== 0 && d.nodeType !== 3 || (l = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (f = d.firstChild) !== null; )
            h = d, d = f;
          for (; ; ) {
            if (d === e) break t;
            if (h === n && ++u === s && (a = o), h === i && ++c === r && (l = o), (f = d.nextSibling) !== null) break;
            d = h, h = d.parentNode;
          }
          d = f;
        }
        n = a === -1 || l === -1 ? null : { start: a, end: l };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ec = { focusedElem: e, selectionRange: n }, $a = !1, I = t; I !== null; ) if (t = I, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, I = e;
  else for (; I !== null; ) {
    t = I;
    try {
      var g = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (g !== null) {
            var y = g.memoizedProps, w = g.memoizedState, p = t.stateNode, m = p.getSnapshotBeforeUpdate(t.elementType === t.type ? y : Ct(t.type, y), w);
            p.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var v = t.stateNode.containerInfo;
          v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(O(163));
      }
    } catch (x) {
      ge(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, I = e;
      break;
    }
    I = t.return;
  }
  return g = Up, Up = !1, g;
}
function Ai(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var s = r = r.next;
    do {
      if ((s.tag & e) === e) {
        var i = s.destroy;
        s.destroy = void 0, i !== void 0 && Bc(t, n, i);
      }
      s = s.next;
    } while (s !== r);
  }
}
function Pl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function zc(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function w0(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, w0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Kt], delete t[Qi], delete t[Ac], delete t[o1], delete t[a1])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function x0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bp(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || x0(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Wc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ua));
  else if (r !== 4 && (e = e.child, e !== null)) for (Wc(e, t, n), e = e.sibling; e !== null; ) Wc(e, t, n), e = e.sibling;
}
function Hc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Hc(e, t, n), e = e.sibling; e !== null; ) Hc(e, t, n), e = e.sibling;
}
var Re = null, Ot = !1;
function _n(e, t, n) {
  for (n = n.child; n !== null; ) b0(e, t, n), n = n.sibling;
}
function b0(e, t, n) {
  if (Gt && typeof Gt.onCommitFiberUnmount == "function") try {
    Gt.onCommitFiberUnmount(xl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      $e || cs(n, t);
    case 6:
      var r = Re, s = Ot;
      Re = null, _n(e, t, n), Re = r, Ot = s, Re !== null && (Ot ? (e = Re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Re.removeChild(n.stateNode));
      break;
    case 18:
      Re !== null && (Ot ? (e = Re, n = n.stateNode, e.nodeType === 8 ? yu(e.parentNode, n) : e.nodeType === 1 && yu(e, n), Wi(e)) : yu(Re, n.stateNode));
      break;
    case 4:
      r = Re, s = Ot, Re = n.stateNode.containerInfo, Ot = !0, _n(e, t, n), Re = r, Ot = s;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!$e && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        s = r = r.next;
        do {
          var i = s, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Bc(n, t, o), s = s.next;
        } while (s !== r);
      }
      _n(e, t, n);
      break;
    case 1:
      if (!$e && (cs(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        ge(n, t, a);
      }
      _n(e, t, n);
      break;
    case 21:
      _n(e, t, n);
      break;
    case 22:
      n.mode & 1 ? ($e = (r = $e) || n.memoizedState !== null, _n(e, t, n), $e = r) : _n(e, t, n);
      break;
    default:
      _n(e, t, n);
  }
}
function zp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new _1()), t.forEach(function(r) {
      var s = N1.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(s, s));
    });
  }
}
function _t(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var s = n[r];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            Re = a.stateNode, Ot = !1;
            break e;
          case 3:
            Re = a.stateNode.containerInfo, Ot = !0;
            break e;
          case 4:
            Re = a.stateNode.containerInfo, Ot = !0;
            break e;
        }
        a = a.return;
      }
      if (Re === null) throw Error(O(160));
      b0(i, o, s), Re = null, Ot = !1;
      var l = s.alternate;
      l !== null && (l.return = null), s.return = null;
    } catch (u) {
      ge(s, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) S0(t, e), t = t.sibling;
}
function S0(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (_t(t, e), Ut(e), r & 4) {
        try {
          Ai(3, e, e.return), Pl(3, e);
        } catch (y) {
          ge(e, e.return, y);
        }
        try {
          Ai(5, e, e.return);
        } catch (y) {
          ge(e, e.return, y);
        }
      }
      break;
    case 1:
      _t(t, e), Ut(e), r & 512 && n !== null && cs(n, n.return);
      break;
    case 5:
      if (_t(t, e), Ut(e), r & 512 && n !== null && cs(n, n.return), e.flags & 32) {
        var s = e.stateNode;
        try {
          Vi(s, "");
        } catch (y) {
          ge(e, e.return, y);
        }
      }
      if (r & 4 && (s = e.stateNode, s != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, l = e.updateQueue;
        if (e.updateQueue = null, l !== null) try {
          a === "input" && i.type === "radio" && i.name != null && Wy(s, i), mc(a, o);
          var u = mc(a, i);
          for (o = 0; o < l.length; o += 2) {
            var c = l[o], d = l[o + 1];
            c === "style" ? Qy(s, d) : c === "dangerouslySetInnerHTML" ? qy(s, d) : c === "children" ? Vi(s, d) : Yd(s, c, d, u);
          }
          switch (a) {
            case "input":
              cc(s, i);
              break;
            case "textarea":
              Hy(s, i);
              break;
            case "select":
              var h = s._wrapperState.wasMultiple;
              s._wrapperState.wasMultiple = !!i.multiple;
              var f = i.value;
              f != null ? ys(s, !!i.multiple, f, !1) : h !== !!i.multiple && (i.defaultValue != null ? ys(
                s,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : ys(s, !!i.multiple, i.multiple ? [] : "", !1));
          }
          s[Qi] = i;
        } catch (y) {
          ge(e, e.return, y);
        }
      }
      break;
    case 6:
      if (_t(t, e), Ut(e), r & 4) {
        if (e.stateNode === null) throw Error(O(162));
        s = e.stateNode, i = e.memoizedProps;
        try {
          s.nodeValue = i;
        } catch (y) {
          ge(e, e.return, y);
        }
      }
      break;
    case 3:
      if (_t(t, e), Ut(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Wi(t.containerInfo);
      } catch (y) {
        ge(e, e.return, y);
      }
      break;
    case 4:
      _t(t, e), Ut(e);
      break;
    case 13:
      _t(t, e), Ut(e), s = e.child, s.flags & 8192 && (i = s.memoizedState !== null, s.stateNode.isHidden = i, !i || s.alternate !== null && s.alternate.memoizedState !== null || (Ah = ye())), r & 4 && zp(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? ($e = (u = $e) || c, _t(t, e), $e = u) : _t(t, e), Ut(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1) for (I = e, c = e.child; c !== null; ) {
          for (d = I = c; I !== null; ) {
            switch (h = I, f = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ai(4, h, h.return);
                break;
              case 1:
                cs(h, h.return);
                var g = h.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                  } catch (y) {
                    ge(r, n, y);
                  }
                }
                break;
              case 5:
                cs(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Hp(d);
                  continue;
                }
            }
            f !== null ? (f.return = h, I = f) : Hp(d);
          }
          c = c.sibling;
        }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                s = d.stateNode, u ? (i = s.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = d.stateNode, l = d.memoizedProps.style, o = l != null && l.hasOwnProperty("display") ? l.display : null, a.style.display = Gy("display", o));
              } catch (y) {
                ge(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (c === null) try {
              d.stateNode.nodeValue = u ? "" : d.memoizedProps;
            } catch (y) {
              ge(e, e.return, y);
            }
          } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
            d.child.return = d, d = d.child;
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            c === d && (c = null), d = d.return;
          }
          c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
        }
      }
      break;
    case 19:
      _t(t, e), Ut(e), r & 4 && zp(e);
      break;
    case 21:
      break;
    default:
      _t(
        t,
        e
      ), Ut(e);
  }
}
function Ut(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (x0(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(O(160));
      }
      switch (r.tag) {
        case 5:
          var s = r.stateNode;
          r.flags & 32 && (Vi(s, ""), r.flags &= -33);
          var i = Bp(e);
          Hc(e, i, s);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, a = Bp(e);
          Wc(e, a, o);
          break;
        default:
          throw Error(O(161));
      }
    } catch (l) {
      ge(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function T1(e, t, n) {
  I = e, _0(e);
}
function _0(e, t, n) {
  for (var r = (e.mode & 1) !== 0; I !== null; ) {
    var s = I, i = s.child;
    if (s.tag === 22 && r) {
      var o = s.memoizedState !== null || Yo;
      if (!o) {
        var a = s.alternate, l = a !== null && a.memoizedState !== null || $e;
        a = Yo;
        var u = $e;
        if (Yo = o, ($e = l) && !u) for (I = s; I !== null; ) o = I, l = o.child, o.tag === 22 && o.memoizedState !== null ? Kp(s) : l !== null ? (l.return = o, I = l) : Kp(s);
        for (; i !== null; ) I = i, _0(i), i = i.sibling;
        I = s, Yo = a, $e = u;
      }
      Wp(e);
    } else s.subtreeFlags & 8772 && i !== null ? (i.return = s, I = i) : Wp(e);
  }
}
function Wp(e) {
  for (; I !== null; ) {
    var t = I;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            $e || Pl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !$e) if (n === null) r.componentDidMount();
            else {
              var s = t.elementType === t.type ? n.memoizedProps : Ct(t.type, n.memoizedProps);
              r.componentDidUpdate(s, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Pp(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Pp(t, o, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var l = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l.autoFocus && n.focus();
                  break;
                case "img":
                  l.src && (n.src = l.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var c = u.memoizedState;
                if (c !== null) {
                  var d = c.dehydrated;
                  d !== null && Wi(d);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(O(163));
        }
        $e || t.flags & 512 && zc(t);
      } catch (h) {
        ge(t, t.return, h);
      }
    }
    if (t === e) {
      I = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, I = n;
      break;
    }
    I = t.return;
  }
}
function Hp(e) {
  for (; I !== null; ) {
    var t = I;
    if (t === e) {
      I = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, I = n;
      break;
    }
    I = t.return;
  }
}
function Kp(e) {
  for (; I !== null; ) {
    var t = I;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Pl(4, t);
          } catch (l) {
            ge(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var s = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              ge(t, s, l);
            }
          }
          var i = t.return;
          try {
            zc(t);
          } catch (l) {
            ge(t, i, l);
          }
          break;
        case 5:
          var o = t.return;
          try {
            zc(t);
          } catch (l) {
            ge(t, o, l);
          }
      }
    } catch (l) {
      ge(t, t.return, l);
    }
    if (t === e) {
      I = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, I = a;
      break;
    }
    I = t.return;
  }
}
var E1 = Math.ceil, Xa = bn.ReactCurrentDispatcher, Ch = bn.ReactCurrentOwner, vt = bn.ReactCurrentBatchConfig, Y = 0, Ce = null, xe = null, je = 0, rt = 0, ds = ir(0), Te = 0, to = null, $r = 0, Al = 0, Ph = 0, Ri = null, Ye = null, Ah = 0, Us = 1 / 0, an = null, Za = !1, Kc = null, qn = null, Jo = !1, Vn = null, el = 0, Oi = 0, qc = null, _a = -1, ka = 0;
function Ke() {
  return Y & 6 ? ye() : _a !== -1 ? _a : _a = ye();
}
function Gn(e) {
  return e.mode & 1 ? Y & 2 && je !== 0 ? je & -je : u1.transition !== null ? (ka === 0 && (ka = av()), ka) : (e = Z, e !== 0 || (e = window.event, e = e === void 0 ? 16 : pv(e.type)), e) : 1;
}
function Dt(e, t, n, r) {
  if (50 < Oi) throw Oi = 0, qc = null, Error(O(185));
  bo(e, n, r), (!(Y & 2) || e !== Ce) && (e === Ce && (!(Y & 2) && (Al |= n), Te === 4 && jn(e, je)), et(e, r), n === 1 && Y === 0 && !(t.mode & 1) && (Us = ye() + 500, Tl && or()));
}
function et(e, t) {
  var n = e.callbackNode;
  u_(e, t);
  var r = La(e, e === Ce ? je : 0);
  if (r === 0) n !== null && tp(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && tp(n), t === 1) e.tag === 0 ? l1(qp.bind(null, e)) : Nv(qp.bind(null, e)), s1(function() {
      !(Y & 6) && or();
    }), n = null;
    else {
      switch (lv(r)) {
        case 1:
          n = th;
          break;
        case 4:
          n = iv;
          break;
        case 16:
          n = Ma;
          break;
        case 536870912:
          n = ov;
          break;
        default:
          n = Ma;
      }
      n = O0(n, k0.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function k0(e, t) {
  if (_a = -1, ka = 0, Y & 6) throw Error(O(327));
  var n = e.callbackNode;
  if (Ss() && e.callbackNode !== n) return null;
  var r = La(e, e === Ce ? je : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = tl(e, r);
  else {
    t = r;
    var s = Y;
    Y |= 2;
    var i = E0();
    (Ce !== e || je !== t) && (an = null, Us = ye() + 500, jr(e, t));
    do
      try {
        A1();
        break;
      } catch (a) {
        T0(e, a);
      }
    while (!0);
    ph(), Xa.current = i, Y = s, xe !== null ? t = 0 : (Ce = null, je = 0, t = Te);
  }
  if (t !== 0) {
    if (t === 2 && (s = xc(e), s !== 0 && (r = s, t = Gc(e, s))), t === 1) throw n = to, jr(e, 0), jn(e, r), et(e, ye()), n;
    if (t === 6) jn(e, r);
    else {
      if (s = e.current.alternate, !(r & 30) && !C1(s) && (t = tl(e, r), t === 2 && (i = xc(e), i !== 0 && (r = i, t = Gc(e, i))), t === 1)) throw n = to, jr(e, 0), jn(e, r), et(e, ye()), n;
      switch (e.finishedWork = s, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(O(345));
        case 2:
          fr(e, Ye, an);
          break;
        case 3:
          if (jn(e, r), (r & 130023424) === r && (t = Ah + 500 - ye(), 10 < t)) {
            if (La(e, 0) !== 0) break;
            if (s = e.suspendedLanes, (s & r) !== r) {
              Ke(), e.pingedLanes |= e.suspendedLanes & s;
              break;
            }
            e.timeoutHandle = Pc(fr.bind(null, e, Ye, an), t);
            break;
          }
          fr(e, Ye, an);
          break;
        case 4:
          if (jn(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, s = -1; 0 < r; ) {
            var o = 31 - It(r);
            i = 1 << o, o = t[o], o > s && (s = o), r &= ~i;
          }
          if (r = s, r = ye() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * E1(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Pc(fr.bind(null, e, Ye, an), r);
            break;
          }
          fr(e, Ye, an);
          break;
        case 5:
          fr(e, Ye, an);
          break;
        default:
          throw Error(O(329));
      }
    }
  }
  return et(e, ye()), e.callbackNode === n ? k0.bind(null, e) : null;
}
function Gc(e, t) {
  var n = Ri;
  return e.current.memoizedState.isDehydrated && (jr(e, t).flags |= 256), e = tl(e, t), e !== 2 && (t = Ye, Ye = n, t !== null && Qc(t)), e;
}
function Qc(e) {
  Ye === null ? Ye = e : Ye.push.apply(Ye, e);
}
function C1(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var s = n[r], i = s.getSnapshot;
        s = s.value;
        try {
          if (!Mt(i(), s)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function jn(e, t) {
  for (t &= ~Ph, t &= ~Al, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - It(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function qp(e) {
  if (Y & 6) throw Error(O(327));
  Ss();
  var t = La(e, 0);
  if (!(t & 1)) return et(e, ye()), null;
  var n = tl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = xc(e);
    r !== 0 && (t = r, n = Gc(e, r));
  }
  if (n === 1) throw n = to, jr(e, 0), jn(e, t), et(e, ye()), n;
  if (n === 6) throw Error(O(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, fr(e, Ye, an), et(e, ye()), null;
}
function Rh(e, t) {
  var n = Y;
  Y |= 1;
  try {
    return e(t);
  } finally {
    Y = n, Y === 0 && (Us = ye() + 500, Tl && or());
  }
}
function Fr(e) {
  Vn !== null && Vn.tag === 0 && !(Y & 6) && Ss();
  var t = Y;
  Y |= 1;
  var n = vt.transition, r = Z;
  try {
    if (vt.transition = null, Z = 1, e) return e();
  } finally {
    Z = r, vt.transition = n, Y = t, !(Y & 6) && or();
  }
}
function Oh() {
  rt = ds.current, se(ds);
}
function jr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, r1(n)), xe !== null) for (n = xe.return; n !== null; ) {
    var r = n;
    switch (dh(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ba();
        break;
      case 3:
        Fs(), se(Xe), se(Ve), xh();
        break;
      case 5:
        wh(r);
        break;
      case 4:
        Fs();
        break;
      case 13:
        se(ce);
        break;
      case 19:
        se(ce);
        break;
      case 10:
        mh(r.type._context);
        break;
      case 22:
      case 23:
        Oh();
    }
    n = n.return;
  }
  if (Ce = e, xe = e = Qn(e.current, null), je = rt = t, Te = 0, to = null, Ph = Al = $r = 0, Ye = Ri = null, br !== null) {
    for (t = 0; t < br.length; t++) if (n = br[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var s = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = s, r.next = o;
      }
      n.pending = r;
    }
    br = null;
  }
  return e;
}
function T0(e, t) {
  do {
    var n = xe;
    try {
      if (ph(), xa.current = Ja, Ya) {
        for (var r = he.memoizedState; r !== null; ) {
          var s = r.queue;
          s !== null && (s.pending = null), r = r.next;
        }
        Ya = !1;
      }
      if (Lr = 0, Ee = _e = he = null, Pi = !1, Xi = 0, Ch.current = null, n === null || n.return === null) {
        Te = 1, to = t, xe = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, l = t;
        if (t = je, a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
          var u = l, c = a, d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var h = c.alternate;
            h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var f = Ip(o);
          if (f !== null) {
            f.flags &= -257, Dp(f, o, a, i, t), f.mode & 1 && Np(i, u, t), t = f, l = u;
            var g = t.updateQueue;
            if (g === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(l), t.updateQueue = y;
            } else g.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Np(i, u, t), jh();
              break e;
            }
            l = Error(O(426));
          }
        } else if (le && a.mode & 1) {
          var w = Ip(o);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256), Dp(w, o, a, i, t), hh(Vs(l, a));
            break e;
          }
        }
        i = l = Vs(l, a), Te !== 4 && (Te = 2), Ri === null ? Ri = [i] : Ri.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = l0(i, l, t);
              Cp(i, p);
              break e;
            case 1:
              a = l;
              var m = i.type, v = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (qn === null || !qn.has(v)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var x = u0(i, a, t);
                Cp(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      P0(n);
    } catch (S) {
      t = S, xe === n && n !== null && (xe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function E0() {
  var e = Xa.current;
  return Xa.current = Ja, e === null ? Ja : e;
}
function jh() {
  (Te === 0 || Te === 3 || Te === 2) && (Te = 4), Ce === null || !($r & 268435455) && !(Al & 268435455) || jn(Ce, je);
}
function tl(e, t) {
  var n = Y;
  Y |= 2;
  var r = E0();
  (Ce !== e || je !== t) && (an = null, jr(e, t));
  do
    try {
      P1();
      break;
    } catch (s) {
      T0(e, s);
    }
  while (!0);
  if (ph(), Y = n, Xa.current = r, xe !== null) throw Error(O(261));
  return Ce = null, je = 0, Te;
}
function P1() {
  for (; xe !== null; ) C0(xe);
}
function A1() {
  for (; xe !== null && !e_(); ) C0(xe);
}
function C0(e) {
  var t = R0(e.alternate, e, rt);
  e.memoizedProps = e.pendingProps, t === null ? P0(e) : xe = t, Ch.current = null;
}
function P0(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = S1(n, t), n !== null) {
        n.flags &= 32767, xe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Te = 6, xe = null;
        return;
      }
    } else if (n = b1(n, t, rt), n !== null) {
      xe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      xe = t;
      return;
    }
    xe = t = e;
  } while (t !== null);
  Te === 0 && (Te = 5);
}
function fr(e, t, n) {
  var r = Z, s = vt.transition;
  try {
    vt.transition = null, Z = 1, R1(e, t, n, r);
  } finally {
    vt.transition = s, Z = r;
  }
  return null;
}
function R1(e, t, n, r) {
  do
    Ss();
  while (Vn !== null);
  if (Y & 6) throw Error(O(327));
  n = e.finishedWork;
  var s = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(O(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (c_(e, i), e === Ce && (xe = Ce = null, je = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Jo || (Jo = !0, O0(Ma, function() {
    return Ss(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = vt.transition, vt.transition = null;
    var o = Z;
    Z = 1;
    var a = Y;
    Y |= 4, Ch.current = null, k1(e, n), S0(n, e), Y_(Ec), $a = !!Tc, Ec = Tc = null, e.current = n, T1(n), t_(), Y = a, Z = o, vt.transition = i;
  } else e.current = n;
  if (Jo && (Jo = !1, Vn = e, el = s), i = e.pendingLanes, i === 0 && (qn = null), s_(n.stateNode), et(e, ye()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) s = t[n], r(s.value, { componentStack: s.stack, digest: s.digest });
  if (Za) throw Za = !1, e = Kc, Kc = null, e;
  return el & 1 && e.tag !== 0 && Ss(), i = e.pendingLanes, i & 1 ? e === qc ? Oi++ : (Oi = 0, qc = e) : Oi = 0, or(), null;
}
function Ss() {
  if (Vn !== null) {
    var e = lv(el), t = vt.transition, n = Z;
    try {
      if (vt.transition = null, Z = 16 > e ? 16 : e, Vn === null) var r = !1;
      else {
        if (e = Vn, Vn = null, el = 0, Y & 6) throw Error(O(331));
        var s = Y;
        for (Y |= 4, I = e.current; I !== null; ) {
          var i = I, o = i.child;
          if (I.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (I = u; I !== null; ) {
                  var c = I;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ai(8, c, i);
                  }
                  var d = c.child;
                  if (d !== null) d.return = c, I = d;
                  else for (; I !== null; ) {
                    c = I;
                    var h = c.sibling, f = c.return;
                    if (w0(c), c === u) {
                      I = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = f, I = h;
                      break;
                    }
                    I = f;
                  }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var y = g.child;
                if (y !== null) {
                  g.child = null;
                  do {
                    var w = y.sibling;
                    y.sibling = null, y = w;
                  } while (y !== null);
                }
              }
              I = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, I = o;
          else e: for (; I !== null; ) {
            if (i = I, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Ai(9, i, i.return);
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, I = p;
              break e;
            }
            I = i.return;
          }
        }
        var m = e.current;
        for (I = m; I !== null; ) {
          o = I;
          var v = o.child;
          if (o.subtreeFlags & 2064 && v !== null) v.return = o, I = v;
          else e: for (o = m; I !== null; ) {
            if (a = I, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Pl(9, a);
              }
            } catch (S) {
              ge(a, a.return, S);
            }
            if (a === o) {
              I = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, I = x;
              break e;
            }
            I = a.return;
          }
        }
        if (Y = s, or(), Gt && typeof Gt.onPostCommitFiberRoot == "function") try {
          Gt.onPostCommitFiberRoot(xl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Z = n, vt.transition = t;
    }
  }
  return !1;
}
function Gp(e, t, n) {
  t = Vs(n, t), t = l0(e, t, 1), e = Kn(e, t, 1), t = Ke(), e !== null && (bo(e, 1, t), et(e, t));
}
function ge(e, t, n) {
  if (e.tag === 3) Gp(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Gp(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (qn === null || !qn.has(r))) {
        e = Vs(n, e), e = u0(t, e, 1), t = Kn(t, e, 1), e = Ke(), t !== null && (bo(t, 1, e), et(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function O1(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Ke(), e.pingedLanes |= e.suspendedLanes & n, Ce === e && (je & n) === n && (Te === 4 || Te === 3 && (je & 130023424) === je && 500 > ye() - Ah ? jr(e, 0) : Ph |= n), et(e, t);
}
function A0(e, t) {
  t === 0 && (e.mode & 1 ? (t = Uo, Uo <<= 1, !(Uo & 130023424) && (Uo = 4194304)) : t = 1);
  var n = Ke();
  e = gn(e, t), e !== null && (bo(e, t, n), et(e, n));
}
function j1(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), A0(e, n);
}
function N1(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, s = e.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(O(314));
  }
  r !== null && r.delete(t), A0(e, n);
}
var R0;
R0 = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Xe.current) Je = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Je = !1, x1(e, t, n);
    Je = !!(e.flags & 131072);
  }
  else Je = !1, le && t.flags & 1048576 && Iv(t, Ha, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Sa(e, t), e = t.pendingProps;
      var s = Ms(t, Ve.current);
      bs(t, n), s = Sh(null, t, r, e, s, n);
      var i = _h();
      return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ze(r) ? (i = !0, za(t)) : i = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, yh(t), s.updater = Cl, t.stateNode = s, s._reactInternals = t, Dc(t, r, e, n), t = $c(null, t, r, !0, i, n)) : (t.tag = 0, le && i && ch(t), Be(null, t, s, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Sa(e, t), e = t.pendingProps, s = r._init, r = s(r._payload), t.type = r, s = t.tag = D1(r), e = Ct(r, e), s) {
          case 0:
            t = Lc(null, t, r, e, n);
            break e;
          case 1:
            t = $p(null, t, r, e, n);
            break e;
          case 11:
            t = Mp(null, t, r, e, n);
            break e;
          case 14:
            t = Lp(null, t, r, Ct(r.type, e), n);
            break e;
        }
        throw Error(O(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, s = t.pendingProps, s = t.elementType === r ? s : Ct(r, s), Lc(e, t, r, s, n);
    case 1:
      return r = t.type, s = t.pendingProps, s = t.elementType === r ? s : Ct(r, s), $p(e, t, r, s, n);
    case 3:
      e: {
        if (f0(t), e === null) throw Error(O(387));
        r = t.pendingProps, i = t.memoizedState, s = i.element, Vv(e, t), Ga(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          s = Vs(Error(O(423)), t), t = Fp(e, t, r, n, s);
          break e;
        } else if (r !== s) {
          s = Vs(Error(O(424)), t), t = Fp(e, t, r, n, s);
          break e;
        } else for (it = Hn(t.stateNode.containerInfo.firstChild), ot = t, le = !0, Nt = null, n = $v(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ls(), r === s) {
            t = yn(e, t, n);
            break e;
          }
          Be(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Uv(t), e === null && jc(t), r = t.type, s = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = s.children, Cc(r, s) ? o = null : i !== null && Cc(r, i) && (t.flags |= 32), h0(e, t), Be(e, t, o, n), t.child;
    case 6:
      return e === null && jc(t), null;
    case 13:
      return p0(e, t, n);
    case 4:
      return vh(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = $s(t, null, r, n) : Be(e, t, r, n), t.child;
    case 11:
      return r = t.type, s = t.pendingProps, s = t.elementType === r ? s : Ct(r, s), Mp(e, t, r, s, n);
    case 7:
      return Be(e, t, t.pendingProps, n), t.child;
    case 8:
      return Be(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Be(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, s = t.pendingProps, i = t.memoizedProps, o = s.value, te(Ka, r._currentValue), r._currentValue = o, i !== null) if (Mt(i.value, o)) {
          if (i.children === s.children && !Xe.current) {
            t = yn(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var l = a.firstContext; l !== null; ) {
              if (l.context === r) {
                if (i.tag === 1) {
                  l = fn(-1, n & -n), l.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var c = u.pending;
                    c === null ? l.next = l : (l.next = c.next, c.next = l), u.pending = l;
                  }
                }
                i.lanes |= n, l = i.alternate, l !== null && (l.lanes |= n), Nc(
                  i.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              l = l.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(O(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Nc(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        Be(e, t, s.children, n), t = t.child;
      }
      return t;
    case 9:
      return s = t.type, r = t.pendingProps.children, bs(t, n), s = xt(s), r = r(s), t.flags |= 1, Be(e, t, r, n), t.child;
    case 14:
      return r = t.type, s = Ct(r, t.pendingProps), s = Ct(r.type, s), Lp(e, t, r, s, n);
    case 15:
      return c0(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, s = t.pendingProps, s = t.elementType === r ? s : Ct(r, s), Sa(e, t), t.tag = 1, Ze(r) ? (e = !0, za(t)) : e = !1, bs(t, n), a0(t, r, s), Dc(t, r, s, n), $c(null, t, r, !0, e, n);
    case 19:
      return m0(e, t, n);
    case 22:
      return d0(e, t, n);
  }
  throw Error(O(156, t.tag));
};
function O0(e, t) {
  return sv(e, t);
}
function I1(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function gt(e, t, n, r) {
  return new I1(e, t, n, r);
}
function Nh(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function D1(e) {
  if (typeof e == "function") return Nh(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Xd) return 11;
    if (e === Zd) return 14;
  }
  return 2;
}
function Qn(e, t) {
  var n = e.alternate;
  return n === null ? (n = gt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ta(e, t, n, r, s, i) {
  var o = 2;
  if (r = e, typeof e == "function") Nh(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case ts:
      return Nr(n.children, s, i, t);
    case Jd:
      o = 8, s |= 8;
      break;
    case ic:
      return e = gt(12, n, t, s | 2), e.elementType = ic, e.lanes = i, e;
    case oc:
      return e = gt(13, n, t, s), e.elementType = oc, e.lanes = i, e;
    case ac:
      return e = gt(19, n, t, s), e.elementType = ac, e.lanes = i, e;
    case Uy:
      return Rl(n, s, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Fy:
          o = 10;
          break e;
        case Vy:
          o = 9;
          break e;
        case Xd:
          o = 11;
          break e;
        case Zd:
          o = 14;
          break e;
        case Pn:
          o = 16, r = null;
          break e;
      }
      throw Error(O(130, e == null ? e : typeof e, ""));
  }
  return t = gt(o, n, t, s), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Nr(e, t, n, r) {
  return e = gt(7, e, r, t), e.lanes = n, e;
}
function Rl(e, t, n, r) {
  return e = gt(22, e, r, t), e.elementType = Uy, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Tu(e, t, n) {
  return e = gt(6, e, null, t), e.lanes = n, e;
}
function Eu(e, t, n) {
  return t = gt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function M1(e, t, n, r, s) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ou(0), this.expirationTimes = ou(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ou(0), this.identifierPrefix = r, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
}
function Ih(e, t, n, r, s, i, o, a, l) {
  return e = new M1(e, t, n, a, l), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = gt(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, yh(i), e;
}
function L1(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: es, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function j0(e) {
  if (!e) return Jn;
  e = e._reactInternals;
  e: {
    if (zr(e) !== e || e.tag !== 1) throw Error(O(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ze(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(O(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ze(n)) return jv(e, n, t);
  }
  return t;
}
function N0(e, t, n, r, s, i, o, a, l) {
  return e = Ih(n, r, !0, e, s, i, o, a, l), e.context = j0(null), n = e.current, r = Ke(), s = Gn(n), i = fn(r, s), i.callback = t ?? null, Kn(n, i, s), e.current.lanes = s, bo(e, s, r), et(e, r), e;
}
function Ol(e, t, n, r) {
  var s = t.current, i = Ke(), o = Gn(s);
  return n = j0(n), t.context === null ? t.context = n : t.pendingContext = n, t = fn(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Kn(s, t, o), e !== null && (Dt(e, s, o, i), wa(e, s, o)), o;
}
function nl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Qp(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Dh(e, t) {
  Qp(e, t), (e = e.alternate) && Qp(e, t);
}
function $1() {
  return null;
}
var I0 = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Mh(e) {
  this._internalRoot = e;
}
jl.prototype.render = Mh.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(O(409));
  Ol(e, t, null, null);
};
jl.prototype.unmount = Mh.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Fr(function() {
      Ol(null, e, null, null);
    }), t[mn] = null;
  }
};
function jl(e) {
  this._internalRoot = e;
}
jl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = dv();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < On.length && t !== 0 && t < On[n].priority; n++) ;
    On.splice(n, 0, e), n === 0 && fv(e);
  }
};
function Lh(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Nl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Yp() {
}
function F1(e, t, n, r, s) {
  if (s) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var u = nl(o);
        i.call(u);
      };
    }
    var o = N0(t, r, e, 0, null, !1, !1, "", Yp);
    return e._reactRootContainer = o, e[mn] = o.current, qi(e.nodeType === 8 ? e.parentNode : e), Fr(), o;
  }
  for (; s = e.lastChild; ) e.removeChild(s);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var u = nl(l);
      a.call(u);
    };
  }
  var l = Ih(e, 0, !1, null, null, !1, !1, "", Yp);
  return e._reactRootContainer = l, e[mn] = l.current, qi(e.nodeType === 8 ? e.parentNode : e), Fr(function() {
    Ol(t, l, n, r);
  }), l;
}
function Il(e, t, n, r, s) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof s == "function") {
      var a = s;
      s = function() {
        var l = nl(o);
        a.call(l);
      };
    }
    Ol(t, o, e, s);
  } else o = F1(n, t, e, s, r);
  return nl(o);
}
uv = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = vi(t.pendingLanes);
        n !== 0 && (nh(t, n | 1), et(t, ye()), !(Y & 6) && (Us = ye() + 500, or()));
      }
      break;
    case 13:
      Fr(function() {
        var r = gn(e, 1);
        if (r !== null) {
          var s = Ke();
          Dt(r, e, 1, s);
        }
      }), Dh(e, 1);
  }
};
rh = function(e) {
  if (e.tag === 13) {
    var t = gn(e, 134217728);
    if (t !== null) {
      var n = Ke();
      Dt(t, e, 134217728, n);
    }
    Dh(e, 134217728);
  }
};
cv = function(e) {
  if (e.tag === 13) {
    var t = Gn(e), n = gn(e, t);
    if (n !== null) {
      var r = Ke();
      Dt(n, e, t, r);
    }
    Dh(e, t);
  }
};
dv = function() {
  return Z;
};
hv = function(e, t) {
  var n = Z;
  try {
    return Z = e, t();
  } finally {
    Z = n;
  }
};
yc = function(e, t, n) {
  switch (t) {
    case "input":
      if (cc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var s = kl(r);
            if (!s) throw Error(O(90));
            zy(r), cc(r, s);
          }
        }
      }
      break;
    case "textarea":
      Hy(e, n);
      break;
    case "select":
      t = n.value, t != null && ys(e, !!n.multiple, t, !1);
  }
};
Xy = Rh;
Zy = Fr;
var V1 = { usingClientEntryPoint: !1, Events: [_o, is, kl, Yy, Jy, Rh] }, di = { findFiberByHostInstance: xr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, U1 = { bundleType: di.bundleType, version: di.version, rendererPackageName: di.rendererPackageName, rendererConfig: di.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: bn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = nv(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: di.findFiberByHostInstance || $1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Xo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Xo.isDisabled && Xo.supportsFiber) try {
    xl = Xo.inject(U1), Gt = Xo;
  } catch {
  }
}
ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = V1;
ut.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Lh(t)) throw Error(O(200));
  return L1(e, t, null, n);
};
ut.createRoot = function(e, t) {
  if (!Lh(e)) throw Error(O(299));
  var n = !1, r = "", s = I0;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Ih(e, 1, !1, null, null, n, !1, r, s), e[mn] = t.current, qi(e.nodeType === 8 ? e.parentNode : e), new Mh(t);
};
ut.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(O(188)) : (e = Object.keys(e).join(","), Error(O(268, e)));
  return e = nv(t), e = e === null ? null : e.stateNode, e;
};
ut.flushSync = function(e) {
  return Fr(e);
};
ut.hydrate = function(e, t, n) {
  if (!Nl(t)) throw Error(O(200));
  return Il(null, e, t, !0, n);
};
ut.hydrateRoot = function(e, t, n) {
  if (!Lh(e)) throw Error(O(405));
  var r = n != null && n.hydratedSources || null, s = !1, i = "", o = I0;
  if (n != null && (n.unstable_strictMode === !0 && (s = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = N0(t, null, e, 1, n ?? null, s, !1, i, o), e[mn] = t.current, qi(e), r) for (e = 0; e < r.length; e++) n = r[e], s = n._getVersion, s = s(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, s] : t.mutableSourceEagerHydrationData.push(
    n,
    s
  );
  return new jl(t);
};
ut.render = function(e, t, n) {
  if (!Nl(t)) throw Error(O(200));
  return Il(null, e, t, !1, n);
};
ut.unmountComponentAtNode = function(e) {
  if (!Nl(e)) throw Error(O(40));
  return e._reactRootContainer ? (Fr(function() {
    Il(null, null, e, !1, function() {
      e._reactRootContainer = null, e[mn] = null;
    });
  }), !0) : !1;
};
ut.unstable_batchedUpdates = Rh;
ut.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Nl(n)) throw Error(O(200));
  if (e == null || e._reactInternals === void 0) throw Error(O(38));
  return Il(e, t, n, !1, r);
};
ut.version = "18.3.1-next-f1338f8080-20240426";
function D0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(D0);
    } catch (e) {
      console.error(e);
    }
}
D0(), Dy.exports = ut;
var To = Dy.exports;
const B1 = /* @__PURE__ */ _y(To);
var Jp = To;
rc.createRoot = Jp.createRoot, rc.hydrateRoot = Jp.hydrateRoot;
var Dl = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Ml = typeof window > "u" || "Deno" in globalThis;
function Pt() {
}
function z1(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function W1(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function H1(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Yc(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function K1(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Xp(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: s,
    predicate: i,
    queryKey: o,
    stale: a
  } = e;
  if (o) {
    if (r) {
      if (t.queryHash !== $h(o, t.options))
        return !1;
    } else if (!ro(t.queryKey, o))
      return !1;
  }
  if (n !== "all") {
    const l = t.isActive();
    if (n === "active" && !l || n === "inactive" && l)
      return !1;
  }
  return !(typeof a == "boolean" && t.isStale() !== a || s && s !== t.state.fetchStatus || i && !i(t));
}
function Zp(e, t) {
  const { exact: n, status: r, predicate: s, mutationKey: i } = e;
  if (i) {
    if (!t.options.mutationKey)
      return !1;
    if (n) {
      if (no(t.options.mutationKey) !== no(i))
        return !1;
    } else if (!ro(t.options.mutationKey, i))
      return !1;
  }
  return !(r && t.state.status !== r || s && !s(t));
}
function $h(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || no)(e);
}
function no(e) {
  return JSON.stringify(
    e,
    (t, n) => Jc(n) ? Object.keys(n).sort().reduce((r, s) => (r[s] = n[s], r), {}) : n
  );
}
function ro(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every((n) => ro(e[n], t[n])) : !1;
}
function M0(e, t) {
  if (e === t)
    return e;
  const n = em(e) && em(t);
  if (n || Jc(e) && Jc(t)) {
    const r = n ? e : Object.keys(e), s = r.length, i = n ? t : Object.keys(t), o = i.length, a = n ? [] : {}, l = new Set(r);
    let u = 0;
    for (let c = 0; c < o; c++) {
      const d = n ? c : i[c];
      (!n && l.has(d) || n) && e[d] === void 0 && t[d] === void 0 ? (a[d] = void 0, u++) : (a[d] = M0(e[d], t[d]), a[d] === e[d] && e[d] !== void 0 && u++);
    }
    return s === o && u === s ? e : a;
  }
  return t;
}
function em(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Jc(e) {
  if (!tm(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(!tm(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function tm(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function q1(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function G1(e, t, n) {
  return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? M0(e, t) : t;
}
function Q1(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function Y1(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var Fh = Symbol();
function L0(e, t) {
  return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === Fh ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
var Er, In, Cs, py, J1 = (py = class extends Dl {
  constructor() {
    super();
    J(this, Er);
    J(this, In);
    J(this, Cs);
    z(this, Cs, (t) => {
      if (!Ml && window.addEventListener) {
        const n = () => t();
        return window.addEventListener("visibilitychange", n, !1), () => {
          window.removeEventListener("visibilitychange", n);
        };
      }
    });
  }
  onSubscribe() {
    P(this, In) || this.setEventListener(P(this, Cs));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = P(this, In)) == null || t.call(this), z(this, In, void 0));
  }
  setEventListener(t) {
    var n;
    z(this, Cs, t), (n = P(this, In)) == null || n.call(this), z(this, In, t((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    }));
  }
  setFocused(t) {
    P(this, Er) !== t && (z(this, Er, t), this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((n) => {
      n(t);
    });
  }
  isFocused() {
    var t;
    return typeof P(this, Er) == "boolean" ? P(this, Er) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, Er = new WeakMap(), In = new WeakMap(), Cs = new WeakMap(), py), $0 = new J1(), Ps, Dn, As, my, X1 = (my = class extends Dl {
  constructor() {
    super();
    J(this, Ps, !0);
    J(this, Dn);
    J(this, As);
    z(this, As, (t) => {
      if (!Ml && window.addEventListener) {
        const n = () => t(!0), r = () => t(!1);
        return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", n), window.removeEventListener("offline", r);
        };
      }
    });
  }
  onSubscribe() {
    P(this, Dn) || this.setEventListener(P(this, As));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = P(this, Dn)) == null || t.call(this), z(this, Dn, void 0));
  }
  setEventListener(t) {
    var n;
    z(this, As, t), (n = P(this, Dn)) == null || n.call(this), z(this, Dn, t(this.setOnline.bind(this)));
  }
  setOnline(t) {
    P(this, Ps) !== t && (z(this, Ps, t), this.listeners.forEach((r) => {
      r(t);
    }));
  }
  isOnline() {
    return P(this, Ps);
  }
}, Ps = new WeakMap(), Dn = new WeakMap(), As = new WeakMap(), my), rl = new X1();
function Z1() {
  let e, t;
  const n = new Promise((s, i) => {
    e = s, t = i;
  });
  n.status = "pending", n.catch(() => {
  });
  function r(s) {
    Object.assign(n, s), delete n.resolve, delete n.reject;
  }
  return n.resolve = (s) => {
    r({
      status: "fulfilled",
      value: s
    }), e(s);
  }, n.reject = (s) => {
    r({
      status: "rejected",
      reason: s
    }), t(s);
  }, n;
}
function ek(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function F0(e) {
  return (e ?? "online") === "online" ? rl.isOnline() : !0;
}
var V0 = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent;
  }
};
function Cu(e) {
  return e instanceof V0;
}
function U0(e) {
  let t = !1, n = 0, r = !1, s;
  const i = Z1(), o = (y) => {
    var w;
    r || (h(new V0(y)), (w = e.abort) == null || w.call(e));
  }, a = () => {
    t = !0;
  }, l = () => {
    t = !1;
  }, u = () => $0.isFocused() && (e.networkMode === "always" || rl.isOnline()) && e.canRun(), c = () => F0(e.networkMode) && e.canRun(), d = (y) => {
    var w;
    r || (r = !0, (w = e.onSuccess) == null || w.call(e, y), s == null || s(), i.resolve(y));
  }, h = (y) => {
    var w;
    r || (r = !0, (w = e.onError) == null || w.call(e, y), s == null || s(), i.reject(y));
  }, f = () => new Promise((y) => {
    var w;
    s = (p) => {
      (r || u()) && y(p);
    }, (w = e.onPause) == null || w.call(e);
  }).then(() => {
    var y;
    s = void 0, r || (y = e.onContinue) == null || y.call(e);
  }), g = () => {
    if (r)
      return;
    let y;
    const w = n === 0 ? e.initialPromise : void 0;
    try {
      y = w ?? e.fn();
    } catch (p) {
      y = Promise.reject(p);
    }
    Promise.resolve(y).then(d).catch((p) => {
      var k;
      if (r)
        return;
      const m = e.retry ?? (Ml ? 0 : 3), v = e.retryDelay ?? ek, x = typeof v == "function" ? v(n, p) : v, S = m === !0 || typeof m == "number" && n < m || typeof m == "function" && m(n, p);
      if (t || !S) {
        h(p);
        return;
      }
      n++, (k = e.onFail) == null || k.call(e, n, p), q1(x).then(() => u() ? void 0 : f()).then(() => {
        t ? h(p) : g();
      });
    });
  };
  return {
    promise: i,
    cancel: o,
    continue: () => (s == null || s(), i),
    cancelRetry: a,
    continueRetry: l,
    canStart: c,
    start: () => (c() ? g() : f().then(g), i)
  };
}
var tk = (e) => setTimeout(e, 0);
function nk() {
  let e = [], t = 0, n = (a) => {
    a();
  }, r = (a) => {
    a();
  }, s = tk;
  const i = (a) => {
    t ? e.push(a) : s(() => {
      n(a);
    });
  }, o = () => {
    const a = e;
    e = [], a.length && s(() => {
      r(() => {
        a.forEach((l) => {
          n(l);
        });
      });
    });
  };
  return {
    batch: (a) => {
      let l;
      t++;
      try {
        l = a();
      } finally {
        t--, t || o();
      }
      return l;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (a) => (...l) => {
      i(() => {
        a(...l);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (a) => {
      n = a;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (a) => {
      r = a;
    },
    setScheduler: (a) => {
      s = a;
    }
  };
}
var ze = nk(), Cr, gy, B0 = (gy = class {
  constructor() {
    J(this, Cr);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), W1(this.gcTime) && z(this, Cr, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      e ?? (Ml ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    P(this, Cr) && (clearTimeout(P(this, Cr)), z(this, Cr, void 0));
  }
}, Cr = new WeakMap(), gy), Rs, Pr, ft, Ar, Le, vo, Rr, At, sn, yy, rk = (yy = class extends B0 {
  constructor(t) {
    super();
    J(this, At);
    J(this, Rs);
    J(this, Pr);
    J(this, ft);
    J(this, Ar);
    J(this, Le);
    J(this, vo);
    J(this, Rr);
    z(this, Rr, !1), z(this, vo, t.defaultOptions), this.setOptions(t.options), this.observers = [], z(this, Ar, t.client), z(this, ft, P(this, Ar).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, z(this, Rs, ik(this.options)), this.state = t.state ?? P(this, Rs), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var t;
    return (t = P(this, Le)) == null ? void 0 : t.promise;
  }
  setOptions(t) {
    this.options = { ...P(this, vo), ...t }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && P(this, ft).remove(this);
  }
  setData(t, n) {
    const r = G1(this.state.data, t, this.options);
    return Ie(this, At, sn).call(this, {
      data: r,
      type: "success",
      dataUpdatedAt: n == null ? void 0 : n.updatedAt,
      manual: n == null ? void 0 : n.manual
    }), r;
  }
  setState(t, n) {
    Ie(this, At, sn).call(this, { type: "setState", state: t, setStateOptions: n });
  }
  cancel(t) {
    var r, s;
    const n = (r = P(this, Le)) == null ? void 0 : r.promise;
    return (s = P(this, Le)) == null || s.cancel(t), n ? n.then(Pt).catch(Pt) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(P(this, Rs));
  }
  isActive() {
    return this.observers.some(
      (t) => K1(t.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Fh || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => Yc(t.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => t.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !H1(this.state.dataUpdatedAt, t);
  }
  onFocus() {
    var n;
    const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    t == null || t.refetch({ cancelRefetch: !1 }), (n = P(this, Le)) == null || n.continue();
  }
  onOnline() {
    var n;
    const t = this.observers.find((r) => r.shouldFetchOnReconnect());
    t == null || t.refetch({ cancelRefetch: !1 }), (n = P(this, Le)) == null || n.continue();
  }
  addObserver(t) {
    this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), P(this, ft).notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) && (this.observers = this.observers.filter((n) => n !== t), this.observers.length || (P(this, Le) && (P(this, Rr) ? P(this, Le).cancel({ revert: !0 }) : P(this, Le).cancelRetry()), this.scheduleGc()), P(this, ft).notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || Ie(this, At, sn).call(this, { type: "invalidate" });
  }
  fetch(t, n) {
    var u, c, d;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (n != null && n.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (P(this, Le))
        return P(this, Le).continueRetry(), P(this, Le).promise;
    }
    if (t && this.setOptions(t), !this.options.queryFn) {
      const h = this.observers.find((f) => f.options.queryFn);
      h && this.setOptions(h.options);
    }
    const r = new AbortController(), s = (h) => {
      Object.defineProperty(h, "signal", {
        enumerable: !0,
        get: () => (z(this, Rr, !0), r.signal)
      });
    }, i = () => {
      const h = L0(this.options, n), g = (() => {
        const y = {
          client: P(this, Ar),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return s(y), y;
      })();
      return z(this, Rr, !1), this.options.persister ? this.options.persister(
        h,
        g,
        this
      ) : h(g);
    }, a = (() => {
      const h = {
        fetchOptions: n,
        options: this.options,
        queryKey: this.queryKey,
        client: P(this, Ar),
        state: this.state,
        fetchFn: i
      };
      return s(h), h;
    })();
    (u = this.options.behavior) == null || u.onFetch(a, this), z(this, Pr, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((c = a.fetchOptions) == null ? void 0 : c.meta)) && Ie(this, At, sn).call(this, { type: "fetch", meta: (d = a.fetchOptions) == null ? void 0 : d.meta });
    const l = (h) => {
      var f, g, y, w;
      Cu(h) && h.silent || Ie(this, At, sn).call(this, {
        type: "error",
        error: h
      }), Cu(h) || ((g = (f = P(this, ft).config).onError) == null || g.call(
        f,
        h,
        this
      ), (w = (y = P(this, ft).config).onSettled) == null || w.call(
        y,
        this.state.data,
        h,
        this
      )), this.scheduleGc();
    };
    return z(this, Le, U0({
      initialPromise: n == null ? void 0 : n.initialPromise,
      fn: a.fetchFn,
      abort: r.abort.bind(r),
      onSuccess: (h) => {
        var f, g, y, w;
        if (h === void 0) {
          l(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(h);
        } catch (p) {
          l(p);
          return;
        }
        (g = (f = P(this, ft).config).onSuccess) == null || g.call(f, h, this), (w = (y = P(this, ft).config).onSettled) == null || w.call(
          y,
          h,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: l,
      onFail: (h, f) => {
        Ie(this, At, sn).call(this, { type: "failed", failureCount: h, error: f });
      },
      onPause: () => {
        Ie(this, At, sn).call(this, { type: "pause" });
      },
      onContinue: () => {
        Ie(this, At, sn).call(this, { type: "continue" });
      },
      retry: a.options.retry,
      retryDelay: a.options.retryDelay,
      networkMode: a.options.networkMode,
      canRun: () => !0
    })), P(this, Le).start();
  }
}, Rs = new WeakMap(), Pr = new WeakMap(), ft = new WeakMap(), Ar = new WeakMap(), Le = new WeakMap(), vo = new WeakMap(), Rr = new WeakMap(), At = new WeakSet(), sn = function(t) {
  const n = (r) => {
    switch (t.type) {
      case "failed":
        return {
          ...r,
          fetchFailureCount: t.failureCount,
          fetchFailureReason: t.error
        };
      case "pause":
        return {
          ...r,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...r,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...r,
          ...sk(r.data, this.options),
          fetchMeta: t.meta ?? null
        };
      case "success":
        return z(this, Pr, void 0), {
          ...r,
          data: t.data,
          dataUpdateCount: r.dataUpdateCount + 1,
          dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!t.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const s = t.error;
        return Cu(s) && s.revert && P(this, Pr) ? { ...P(this, Pr), fetchStatus: "idle" } : {
          ...r,
          error: s,
          errorUpdateCount: r.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: r.fetchFailureCount + 1,
          fetchFailureReason: s,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...r,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...r,
          ...t.state
        };
    }
  };
  this.state = n(this.state), ze.batch(() => {
    this.observers.forEach((r) => {
      r.onQueryUpdate();
    }), P(this, ft).notify({ query: this, type: "updated", action: t });
  });
}, yy);
function sk(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: F0(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function ik(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData, n = t !== void 0, r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var zt, vy, ok = (vy = class extends Dl {
  constructor(t = {}) {
    super();
    J(this, zt);
    this.config = t, z(this, zt, /* @__PURE__ */ new Map());
  }
  build(t, n, r) {
    const s = n.queryKey, i = n.queryHash ?? $h(s, n);
    let o = this.get(i);
    return o || (o = new rk({
      client: t,
      queryKey: s,
      queryHash: i,
      options: t.defaultQueryOptions(n),
      state: r,
      defaultOptions: t.getQueryDefaults(s)
    }), this.add(o)), o;
  }
  add(t) {
    P(this, zt).has(t.queryHash) || (P(this, zt).set(t.queryHash, t), this.notify({
      type: "added",
      query: t
    }));
  }
  remove(t) {
    const n = P(this, zt).get(t.queryHash);
    n && (t.destroy(), n === t && P(this, zt).delete(t.queryHash), this.notify({ type: "removed", query: t }));
  }
  clear() {
    ze.batch(() => {
      this.getAll().forEach((t) => {
        this.remove(t);
      });
    });
  }
  get(t) {
    return P(this, zt).get(t);
  }
  getAll() {
    return [...P(this, zt).values()];
  }
  find(t) {
    const n = { exact: !0, ...t };
    return this.getAll().find(
      (r) => Xp(n, r)
    );
  }
  findAll(t = {}) {
    const n = this.getAll();
    return Object.keys(t).length > 0 ? n.filter((r) => Xp(t, r)) : n;
  }
  notify(t) {
    ze.batch(() => {
      this.listeners.forEach((n) => {
        n(t);
      });
    });
  }
  onFocus() {
    ze.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    ze.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}, zt = new WeakMap(), vy), Wt, Ue, Or, Ht, En, wy, ak = (wy = class extends B0 {
  constructor(t) {
    super();
    J(this, Ht);
    J(this, Wt);
    J(this, Ue);
    J(this, Or);
    this.mutationId = t.mutationId, z(this, Ue, t.mutationCache), z(this, Wt, []), this.state = t.state || lk(), this.setOptions(t.options), this.scheduleGc();
  }
  setOptions(t) {
    this.options = t, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(t) {
    P(this, Wt).includes(t) || (P(this, Wt).push(t), this.clearGcTimeout(), P(this, Ue).notify({
      type: "observerAdded",
      mutation: this,
      observer: t
    }));
  }
  removeObserver(t) {
    z(this, Wt, P(this, Wt).filter((n) => n !== t)), this.scheduleGc(), P(this, Ue).notify({
      type: "observerRemoved",
      mutation: this,
      observer: t
    });
  }
  optionalRemove() {
    P(this, Wt).length || (this.state.status === "pending" ? this.scheduleGc() : P(this, Ue).remove(this));
  }
  continue() {
    var t;
    return ((t = P(this, Or)) == null ? void 0 : t.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(t) {
    var i, o, a, l, u, c, d, h, f, g, y, w, p, m, v, x, S, k, T, E;
    const n = () => {
      Ie(this, Ht, En).call(this, { type: "continue" });
    };
    z(this, Or, U0({
      fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
      onFail: (A, R) => {
        Ie(this, Ht, En).call(this, { type: "failed", failureCount: A, error: R });
      },
      onPause: () => {
        Ie(this, Ht, En).call(this, { type: "pause" });
      },
      onContinue: n,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => P(this, Ue).canRun(this)
    }));
    const r = this.state.status === "pending", s = !P(this, Or).canStart();
    try {
      if (r)
        n();
      else {
        Ie(this, Ht, En).call(this, { type: "pending", variables: t, isPaused: s }), await ((o = (i = P(this, Ue).config).onMutate) == null ? void 0 : o.call(
          i,
          t,
          this
        ));
        const R = await ((l = (a = this.options).onMutate) == null ? void 0 : l.call(a, t));
        R !== this.state.context && Ie(this, Ht, En).call(this, {
          type: "pending",
          context: R,
          variables: t,
          isPaused: s
        });
      }
      const A = await P(this, Or).start();
      return await ((c = (u = P(this, Ue).config).onSuccess) == null ? void 0 : c.call(
        u,
        A,
        t,
        this.state.context,
        this
      )), await ((h = (d = this.options).onSuccess) == null ? void 0 : h.call(d, A, t, this.state.context)), await ((g = (f = P(this, Ue).config).onSettled) == null ? void 0 : g.call(
        f,
        A,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((w = (y = this.options).onSettled) == null ? void 0 : w.call(y, A, null, t, this.state.context)), Ie(this, Ht, En).call(this, { type: "success", data: A }), A;
    } catch (A) {
      try {
        throw await ((m = (p = P(this, Ue).config).onError) == null ? void 0 : m.call(
          p,
          A,
          t,
          this.state.context,
          this
        )), await ((x = (v = this.options).onError) == null ? void 0 : x.call(
          v,
          A,
          t,
          this.state.context
        )), await ((k = (S = P(this, Ue).config).onSettled) == null ? void 0 : k.call(
          S,
          void 0,
          A,
          this.state.variables,
          this.state.context,
          this
        )), await ((E = (T = this.options).onSettled) == null ? void 0 : E.call(
          T,
          void 0,
          A,
          t,
          this.state.context
        )), A;
      } finally {
        Ie(this, Ht, En).call(this, { type: "error", error: A });
      }
    } finally {
      P(this, Ue).runNext(this);
    }
  }
}, Wt = new WeakMap(), Ue = new WeakMap(), Or = new WeakMap(), Ht = new WeakSet(), En = function(t) {
  const n = (r) => {
    switch (t.type) {
      case "failed":
        return {
          ...r,
          failureCount: t.failureCount,
          failureReason: t.error
        };
      case "pause":
        return {
          ...r,
          isPaused: !0
        };
      case "continue":
        return {
          ...r,
          isPaused: !1
        };
      case "pending":
        return {
          ...r,
          context: t.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: t.isPaused,
          status: "pending",
          variables: t.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...r,
          data: t.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...r,
          data: void 0,
          error: t.error,
          failureCount: r.failureCount + 1,
          failureReason: t.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = n(this.state), ze.batch(() => {
    P(this, Wt).forEach((r) => {
      r.onMutationUpdate(t);
    }), P(this, Ue).notify({
      mutation: this,
      type: "updated",
      action: t
    });
  });
}, wy);
function lk() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var cn, Rt, wo, xy, uk = (xy = class extends Dl {
  constructor(t = {}) {
    super();
    J(this, cn);
    J(this, Rt);
    J(this, wo);
    this.config = t, z(this, cn, /* @__PURE__ */ new Set()), z(this, Rt, /* @__PURE__ */ new Map()), z(this, wo, 0);
  }
  build(t, n, r) {
    const s = new ak({
      mutationCache: this,
      mutationId: ++Do(this, wo)._,
      options: t.defaultMutationOptions(n),
      state: r
    });
    return this.add(s), s;
  }
  add(t) {
    P(this, cn).add(t);
    const n = Zo(t);
    if (typeof n == "string") {
      const r = P(this, Rt).get(n);
      r ? r.push(t) : P(this, Rt).set(n, [t]);
    }
    this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    if (P(this, cn).delete(t)) {
      const n = Zo(t);
      if (typeof n == "string") {
        const r = P(this, Rt).get(n);
        if (r)
          if (r.length > 1) {
            const s = r.indexOf(t);
            s !== -1 && r.splice(s, 1);
          } else r[0] === t && P(this, Rt).delete(n);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const n = Zo(t);
    if (typeof n == "string") {
      const r = P(this, Rt).get(n), s = r == null ? void 0 : r.find(
        (i) => i.state.status === "pending"
      );
      return !s || s === t;
    } else
      return !0;
  }
  runNext(t) {
    var r;
    const n = Zo(t);
    if (typeof n == "string") {
      const s = (r = P(this, Rt).get(n)) == null ? void 0 : r.find((i) => i !== t && i.state.isPaused);
      return (s == null ? void 0 : s.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    ze.batch(() => {
      P(this, cn).forEach((t) => {
        this.notify({ type: "removed", mutation: t });
      }), P(this, cn).clear(), P(this, Rt).clear();
    });
  }
  getAll() {
    return Array.from(P(this, cn));
  }
  find(t) {
    const n = { exact: !0, ...t };
    return this.getAll().find(
      (r) => Zp(n, r)
    );
  }
  findAll(t = {}) {
    return this.getAll().filter((n) => Zp(t, n));
  }
  notify(t) {
    ze.batch(() => {
      this.listeners.forEach((n) => {
        n(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((n) => n.state.isPaused);
    return ze.batch(
      () => Promise.all(
        t.map((n) => n.continue().catch(Pt))
      )
    );
  }
}, cn = new WeakMap(), Rt = new WeakMap(), wo = new WeakMap(), xy);
function Zo(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
function nm(e) {
  return {
    onFetch: (t, n) => {
      var c, d, h, f, g;
      const r = t.options, s = (h = (d = (c = t.fetchOptions) == null ? void 0 : c.meta) == null ? void 0 : d.fetchMore) == null ? void 0 : h.direction, i = ((f = t.state.data) == null ? void 0 : f.pages) || [], o = ((g = t.state.data) == null ? void 0 : g.pageParams) || [];
      let a = { pages: [], pageParams: [] }, l = 0;
      const u = async () => {
        let y = !1;
        const w = (v) => {
          Object.defineProperty(v, "signal", {
            enumerable: !0,
            get: () => (t.signal.aborted ? y = !0 : t.signal.addEventListener("abort", () => {
              y = !0;
            }), t.signal)
          });
        }, p = L0(t.options, t.fetchOptions), m = async (v, x, S) => {
          if (y)
            return Promise.reject();
          if (x == null && v.pages.length)
            return Promise.resolve(v);
          const T = (() => {
            const F = {
              client: t.client,
              queryKey: t.queryKey,
              pageParam: x,
              direction: S ? "backward" : "forward",
              meta: t.options.meta
            };
            return w(F), F;
          })(), E = await p(T), { maxPages: A } = t.options, R = S ? Y1 : Q1;
          return {
            pages: R(v.pages, E, A),
            pageParams: R(v.pageParams, x, A)
          };
        };
        if (s && i.length) {
          const v = s === "backward", x = v ? ck : rm, S = {
            pages: i,
            pageParams: o
          }, k = x(r, S);
          a = await m(S, k, v);
        } else {
          const v = e ?? i.length;
          do {
            const x = l === 0 ? o[0] ?? r.initialPageParam : rm(r, a);
            if (l > 0 && x == null)
              break;
            a = await m(a, x), l++;
          } while (l < v);
        }
        return a;
      };
      t.options.persister ? t.fetchFn = () => {
        var y, w;
        return (w = (y = t.options).persister) == null ? void 0 : w.call(
          y,
          u,
          {
            client: t.client,
            queryKey: t.queryKey,
            meta: t.options.meta,
            signal: t.signal
          },
          n
        );
      } : t.fetchFn = u;
    }
  };
}
function rm(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(
    t[r],
    t,
    n[r],
    n
  ) : void 0;
}
function ck(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0;
}
var pe, Mn, Ln, Os, js, $n, Ns, Is, by, dk = (by = class {
  constructor(e = {}) {
    J(this, pe);
    J(this, Mn);
    J(this, Ln);
    J(this, Os);
    J(this, js);
    J(this, $n);
    J(this, Ns);
    J(this, Is);
    z(this, pe, e.queryCache || new ok()), z(this, Mn, e.mutationCache || new uk()), z(this, Ln, e.defaultOptions || {}), z(this, Os, /* @__PURE__ */ new Map()), z(this, js, /* @__PURE__ */ new Map()), z(this, $n, 0);
  }
  mount() {
    Do(this, $n)._++, P(this, $n) === 1 && (z(this, Ns, $0.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), P(this, pe).onFocus());
    })), z(this, Is, rl.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), P(this, pe).onOnline());
    })));
  }
  unmount() {
    var e, t;
    Do(this, $n)._--, P(this, $n) === 0 && ((e = P(this, Ns)) == null || e.call(this), z(this, Ns, void 0), (t = P(this, Is)) == null || t.call(this), z(this, Is, void 0));
  }
  isFetching(e) {
    return P(this, pe).findAll({ ...e, fetchStatus: "fetching" }).length;
  }
  isMutating(e) {
    return P(this, Mn).findAll({ ...e, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(e) {
    var n;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (n = P(this, pe).get(t.queryHash)) == null ? void 0 : n.state.data;
  }
  ensureQueryData(e) {
    const t = this.defaultQueryOptions(e), n = P(this, pe).build(this, t), r = n.state.data;
    return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(Yc(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
  }
  getQueriesData(e) {
    return P(this, pe).findAll(e).map(({ queryKey: t, state: n }) => {
      const r = n.data;
      return [t, r];
    });
  }
  setQueryData(e, t, n) {
    const r = this.defaultQueryOptions({ queryKey: e }), s = P(this, pe).get(
      r.queryHash
    ), i = s == null ? void 0 : s.state.data, o = z1(t, i);
    if (o !== void 0)
      return P(this, pe).build(this, r).setData(o, { ...n, manual: !0 });
  }
  setQueriesData(e, t, n) {
    return ze.batch(
      () => P(this, pe).findAll(e).map(({ queryKey: r }) => [
        r,
        this.setQueryData(r, t, n)
      ])
    );
  }
  getQueryState(e) {
    var n;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (n = P(this, pe).get(
      t.queryHash
    )) == null ? void 0 : n.state;
  }
  removeQueries(e) {
    const t = P(this, pe);
    ze.batch(() => {
      t.findAll(e).forEach((n) => {
        t.remove(n);
      });
    });
  }
  resetQueries(e, t) {
    const n = P(this, pe);
    return ze.batch(() => (n.findAll(e).forEach((r) => {
      r.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...e
      },
      t
    )));
  }
  cancelQueries(e, t = {}) {
    const n = { revert: !0, ...t }, r = ze.batch(
      () => P(this, pe).findAll(e).map((s) => s.cancel(n))
    );
    return Promise.all(r).then(Pt).catch(Pt);
  }
  invalidateQueries(e, t = {}) {
    return ze.batch(() => (P(this, pe).findAll(e).forEach((n) => {
      n.invalidate();
    }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...e,
        type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
      },
      t
    )));
  }
  refetchQueries(e, t = {}) {
    const n = {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }, r = ze.batch(
      () => P(this, pe).findAll(e).filter((s) => !s.isDisabled() && !s.isStatic()).map((s) => {
        let i = s.fetch(void 0, n);
        return n.throwOnError || (i = i.catch(Pt)), s.state.fetchStatus === "paused" ? Promise.resolve() : i;
      })
    );
    return Promise.all(r).then(Pt);
  }
  fetchQuery(e) {
    const t = this.defaultQueryOptions(e);
    t.retry === void 0 && (t.retry = !1);
    const n = P(this, pe).build(this, t);
    return n.isStaleByTime(
      Yc(t.staleTime, n)
    ) ? n.fetch(t) : Promise.resolve(n.state.data);
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(Pt).catch(Pt);
  }
  fetchInfiniteQuery(e) {
    return e.behavior = nm(e.pages), this.fetchQuery(e);
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(Pt).catch(Pt);
  }
  ensureInfiniteQueryData(e) {
    return e.behavior = nm(e.pages), this.ensureQueryData(e);
  }
  resumePausedMutations() {
    return rl.isOnline() ? P(this, Mn).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return P(this, pe);
  }
  getMutationCache() {
    return P(this, Mn);
  }
  getDefaultOptions() {
    return P(this, Ln);
  }
  setDefaultOptions(e) {
    z(this, Ln, e);
  }
  setQueryDefaults(e, t) {
    P(this, Os).set(no(e), {
      queryKey: e,
      defaultOptions: t
    });
  }
  getQueryDefaults(e) {
    const t = [...P(this, Os).values()], n = {};
    return t.forEach((r) => {
      ro(e, r.queryKey) && Object.assign(n, r.defaultOptions);
    }), n;
  }
  setMutationDefaults(e, t) {
    P(this, js).set(no(e), {
      mutationKey: e,
      defaultOptions: t
    });
  }
  getMutationDefaults(e) {
    const t = [...P(this, js).values()], n = {};
    return t.forEach((r) => {
      ro(e, r.mutationKey) && Object.assign(n, r.defaultOptions);
    }), n;
  }
  defaultQueryOptions(e) {
    if (e._defaulted)
      return e;
    const t = {
      ...P(this, Ln).queries,
      ...this.getQueryDefaults(e.queryKey),
      ...e,
      _defaulted: !0
    };
    return t.queryHash || (t.queryHash = $h(
      t.queryKey,
      t
    )), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Fh && (t.enabled = !1), t;
  }
  defaultMutationOptions(e) {
    return e != null && e._defaulted ? e : {
      ...P(this, Ln).mutations,
      ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
      ...e,
      _defaulted: !0
    };
  }
  clear() {
    P(this, pe).clear(), P(this, Mn).clear();
  }
}, pe = new WeakMap(), Mn = new WeakMap(), Ln = new WeakMap(), Os = new WeakMap(), js = new WeakMap(), $n = new WeakMap(), Ns = new WeakMap(), Is = new WeakMap(), by), hk = b.createContext(
  void 0
), fk = ({
  client: e,
  children: t
}) => (b.useEffect(() => (e.mount(), () => {
  e.unmount();
}), [e]), /* @__PURE__ */ _.jsx(hk.Provider, { value: e, children: t }));
function ke(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(s) {
    if (e == null || e(s), n === !1 || !s.defaultPrevented)
      return t == null ? void 0 : t(s);
  };
}
function sm(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function z0(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((s) => {
      const i = sm(s, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let s = 0; s < r.length; s++) {
          const i = r[s];
          typeof i == "function" ? i() : sm(e[s], null);
        }
      };
  };
}
function Lt(...e) {
  return b.useCallback(z0(...e), e);
}
function Ll(e, t = []) {
  let n = [];
  function r(i, o) {
    const a = b.createContext(o), l = n.length;
    n = [...n, o];
    const u = (d) => {
      var p;
      const { scope: h, children: f, ...g } = d, y = ((p = h == null ? void 0 : h[e]) == null ? void 0 : p[l]) || a, w = b.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ _.jsx(y.Provider, { value: w, children: f });
    };
    u.displayName = i + "Provider";
    function c(d, h) {
      var y;
      const f = ((y = h == null ? void 0 : h[e]) == null ? void 0 : y[l]) || a, g = b.useContext(f);
      if (g) return g;
      if (o !== void 0) return o;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [u, c];
  }
  const s = () => {
    const i = n.map((o) => b.createContext(o));
    return function(a) {
      const l = (a == null ? void 0 : a[e]) || i;
      return b.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return s.scopeName = e, [r, pk(s, ...t)];
}
function pk(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((s) => ({
      useScope: s(),
      scopeName: s.scopeName
    }));
    return function(i) {
      const o = r.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(i)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return b.useMemo(() => ({ [`__scope${t.scopeName}`]: o }), [o]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function sl(e) {
  const t = /* @__PURE__ */ gk(e), n = b.forwardRef((r, s) => {
    const { children: i, ...o } = r, a = b.Children.toArray(i), l = a.find(vk);
    if (l) {
      const u = l.props.children, c = a.map((d) => d === l ? b.Children.count(u) > 1 ? b.Children.only(null) : b.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ _.jsx(t, { ...o, ref: s, children: b.isValidElement(u) ? b.cloneElement(u, void 0, c) : null });
    }
    return /* @__PURE__ */ _.jsx(t, { ...o, ref: s, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var mk = /* @__PURE__ */ sl("Slot");
// @__NO_SIDE_EFFECTS__
function gk(e) {
  const t = b.forwardRef((n, r) => {
    const { children: s, ...i } = n;
    if (b.isValidElement(s)) {
      const o = xk(s), a = wk(i, s.props);
      return s.type !== b.Fragment && (a.ref = r ? z0(r, o) : o), b.cloneElement(s, a);
    }
    return b.Children.count(s) > 1 ? b.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var W0 = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function yk(e) {
  const t = ({ children: n }) => /* @__PURE__ */ _.jsx(_.Fragment, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = W0, t;
}
function vk(e) {
  return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === W0;
}
function wk(e, t) {
  const n = { ...t };
  for (const r in t) {
    const s = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? s && i ? n[r] = (...a) => {
      const l = i(...a);
      return s(...a), l;
    } : s && (n[r] = s) : r === "style" ? n[r] = { ...s, ...i } : r === "className" && (n[r] = [s, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function xk(e) {
  var r, s;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (s = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : s.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var bk = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Qe = bk.reduce((e, t) => {
  const n = /* @__PURE__ */ sl(`Primitive.${t}`), r = b.forwardRef((s, i) => {
    const { asChild: o, ...a } = s, l = o ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ _.jsx(l, { ...a, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function H0(e, t) {
  e && To.flushSync(() => e.dispatchEvent(t));
}
function Xn(e) {
  const t = b.useRef(e);
  return b.useEffect(() => {
    t.current = e;
  }), b.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Sk(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Xn(e);
  b.useEffect(() => {
    const r = (s) => {
      s.key === "Escape" && n(s);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var _k = "DismissableLayer", Xc = "dismissableLayer.update", kk = "dismissableLayer.pointerDownOutside", Tk = "dismissableLayer.focusOutside", im, K0 = b.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Vh = b.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: s,
      onFocusOutside: i,
      onInteractOutside: o,
      onDismiss: a,
      ...l
    } = e, u = b.useContext(K0), [c, d] = b.useState(null), h = (c == null ? void 0 : c.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, f] = b.useState({}), g = Lt(t, (T) => d(T)), y = Array.from(u.layers), [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), p = y.indexOf(w), m = c ? y.indexOf(c) : -1, v = u.layersWithOutsidePointerEventsDisabled.size > 0, x = m >= p, S = Ck((T) => {
      const E = T.target, A = [...u.branches].some((R) => R.contains(E));
      !x || A || (s == null || s(T), o == null || o(T), T.defaultPrevented || a == null || a());
    }, h), k = Pk((T) => {
      const E = T.target;
      [...u.branches].some((R) => R.contains(E)) || (i == null || i(T), o == null || o(T), T.defaultPrevented || a == null || a());
    }, h);
    return Sk((T) => {
      m === u.layers.size - 1 && (r == null || r(T), !T.defaultPrevented && a && (T.preventDefault(), a()));
    }, h), b.useEffect(() => {
      if (c)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (im = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), om(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = im);
        };
    }, [c, h, n, u]), b.useEffect(() => () => {
      c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), om());
    }, [c, u]), b.useEffect(() => {
      const T = () => f({});
      return document.addEventListener(Xc, T), () => document.removeEventListener(Xc, T);
    }, []), /* @__PURE__ */ _.jsx(
      Qe.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: v ? x ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ke(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ke(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ke(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
Vh.displayName = _k;
var Ek = "DismissableLayerBranch", q0 = b.forwardRef((e, t) => {
  const n = b.useContext(K0), r = b.useRef(null), s = Lt(t, r);
  return b.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ _.jsx(Qe.div, { ...e, ref: s });
});
q0.displayName = Ek;
function Ck(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Xn(e), r = b.useRef(!1), s = b.useRef(() => {
  });
  return b.useEffect(() => {
    const i = (a) => {
      if (a.target && !r.current) {
        let l = function() {
          G0(
            kk,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", s.current), s.current = l, t.addEventListener("click", s.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", s.current);
      r.current = !1;
    }, o = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(o), t.removeEventListener("pointerdown", i), t.removeEventListener("click", s.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Pk(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Xn(e), r = b.useRef(!1);
  return b.useEffect(() => {
    const s = (i) => {
      i.target && !r.current && G0(Tk, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", s), () => t.removeEventListener("focusin", s);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function om() {
  const e = new CustomEvent(Xc);
  document.dispatchEvent(e);
}
function G0(e, t, n, { discrete: r }) {
  const s = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && s.addEventListener(e, t, { once: !0 }), r ? H0(s, i) : s.dispatchEvent(i);
}
var Ak = Vh, Rk = q0, Zn = globalThis != null && globalThis.document ? b.useLayoutEffect : () => {
};
const Ok = ["top", "right", "bottom", "left"], er = Math.min, st = Math.max, il = Math.round, ea = Math.floor, Yt = (e) => ({
  x: e,
  y: e
}), jk = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Nk = {
  start: "end",
  end: "start"
};
function Zc(e, t, n) {
  return st(e, er(t, n));
}
function vn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wn(e) {
  return e.split("-")[0];
}
function Qs(e) {
  return e.split("-")[1];
}
function Uh(e) {
  return e === "x" ? "y" : "x";
}
function Bh(e) {
  return e === "y" ? "height" : "width";
}
const Ik = /* @__PURE__ */ new Set(["top", "bottom"]);
function qt(e) {
  return Ik.has(wn(e)) ? "y" : "x";
}
function zh(e) {
  return Uh(qt(e));
}
function Dk(e, t, n) {
  n === void 0 && (n = !1);
  const r = Qs(e), s = zh(e), i = Bh(s);
  let o = s === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (o = ol(o)), [o, ol(o)];
}
function Mk(e) {
  const t = ol(e);
  return [ed(e), t, ed(t)];
}
function ed(e) {
  return e.replace(/start|end/g, (t) => Nk[t]);
}
const am = ["left", "right"], lm = ["right", "left"], Lk = ["top", "bottom"], $k = ["bottom", "top"];
function Fk(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? lm : am : t ? am : lm;
    case "left":
    case "right":
      return t ? Lk : $k;
    default:
      return [];
  }
}
function Vk(e, t, n, r) {
  const s = Qs(e);
  let i = Fk(wn(e), n === "start", r);
  return s && (i = i.map((o) => o + "-" + s), t && (i = i.concat(i.map(ed)))), i;
}
function ol(e) {
  return e.replace(/left|right|bottom|top/g, (t) => jk[t]);
}
function Uk(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Q0(e) {
  return typeof e != "number" ? Uk(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function al(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: s
  } = e;
  return {
    width: r,
    height: s,
    top: n,
    left: t,
    right: t + r,
    bottom: n + s,
    x: t,
    y: n
  };
}
function um(e, t, n) {
  let {
    reference: r,
    floating: s
  } = e;
  const i = qt(t), o = zh(t), a = Bh(o), l = wn(t), u = i === "y", c = r.x + r.width / 2 - s.width / 2, d = r.y + r.height / 2 - s.height / 2, h = r[a] / 2 - s[a] / 2;
  let f;
  switch (l) {
    case "top":
      f = {
        x: c,
        y: r.y - s.height
      };
      break;
    case "bottom":
      f = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      f = {
        x: r.x - s.width,
        y: d
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (Qs(t)) {
    case "start":
      f[o] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      f[o] += h * (n && u ? -1 : 1);
      break;
  }
  return f;
}
const Bk = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: s = "absolute",
    middleware: i = [],
    platform: o
  } = n, a = i.filter(Boolean), l = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let u = await o.getElementRects({
    reference: e,
    floating: t,
    strategy: s
  }), {
    x: c,
    y: d
  } = um(u, r, l), h = r, f = {}, g = 0;
  for (let y = 0; y < a.length; y++) {
    const {
      name: w,
      fn: p
    } = a[y], {
      x: m,
      y: v,
      data: x,
      reset: S
    } = await p({
      x: c,
      y: d,
      initialPlacement: r,
      placement: h,
      strategy: s,
      middlewareData: f,
      rects: u,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = m ?? c, d = v ?? d, f = {
      ...f,
      [w]: {
        ...f[w],
        ...x
      }
    }, S && g <= 50 && (g++, typeof S == "object" && (S.placement && (h = S.placement), S.rects && (u = S.rects === !0 ? await o.getElementRects({
      reference: e,
      floating: t,
      strategy: s
    }) : S.rects), {
      x: c,
      y: d
    } = um(u, h, l)), y = -1);
  }
  return {
    x: c,
    y: d,
    placement: h,
    strategy: s,
    middlewareData: f
  };
};
async function so(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: s,
    platform: i,
    rects: o,
    elements: a,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: f = 0
  } = vn(t, e), g = Q0(f), w = a[h ? d === "floating" ? "reference" : "floating" : d], p = al(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n ? w : w.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), m = d === "floating" ? {
    x: r,
    y: s,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, v = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), x = await (i.isElement == null ? void 0 : i.isElement(v)) ? await (i.getScale == null ? void 0 : i.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = al(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: m,
    offsetParent: v,
    strategy: l
  }) : m);
  return {
    top: (p.top - S.top + g.top) / x.y,
    bottom: (S.bottom - p.bottom + g.bottom) / x.y,
    left: (p.left - S.left + g.left) / x.x,
    right: (S.right - p.right + g.right) / x.x
  };
}
const zk = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: s,
      rects: i,
      platform: o,
      elements: a,
      middlewareData: l
    } = t, {
      element: u,
      padding: c = 0
    } = vn(e, t) || {};
    if (u == null)
      return {};
    const d = Q0(c), h = {
      x: n,
      y: r
    }, f = zh(s), g = Bh(f), y = await o.getDimensions(u), w = f === "y", p = w ? "top" : "left", m = w ? "bottom" : "right", v = w ? "clientHeight" : "clientWidth", x = i.reference[g] + i.reference[f] - h[f] - i.floating[g], S = h[f] - i.reference[f], k = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let T = k ? k[v] : 0;
    (!T || !await (o.isElement == null ? void 0 : o.isElement(k))) && (T = a.floating[v] || i.floating[g]);
    const E = x / 2 - S / 2, A = T / 2 - y[g] / 2 - 1, R = er(d[p], A), F = er(d[m], A), L = R, q = T - y[g] - F, N = T / 2 - y[g] / 2 + E, Q = Zc(L, N, q), K = !l.arrow && Qs(s) != null && N !== Q && i.reference[g] / 2 - (N < L ? R : F) - y[g] / 2 < 0, V = K ? N < L ? N - L : N - q : 0;
    return {
      [f]: h[f] + V,
      data: {
        [f]: Q,
        centerOffset: N - Q - V,
        ...K && {
          alignmentOffset: V
        }
      },
      reset: K
    };
  }
}), Wk = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: s,
        middlewareData: i,
        rects: o,
        initialPlacement: a,
        platform: l,
        elements: u
      } = t, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: y = !0,
        ...w
      } = vn(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const p = wn(s), m = qt(a), v = wn(a) === a, x = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), S = h || (v || !y ? [ol(a)] : Mk(a)), k = g !== "none";
      !h && k && S.push(...Vk(a, y, g, x));
      const T = [a, ...S], E = await so(t, w), A = [];
      let R = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (c && A.push(E[p]), d) {
        const N = Dk(s, o, x);
        A.push(E[N[0]], E[N[1]]);
      }
      if (R = [...R, {
        placement: s,
        overflows: A
      }], !A.every((N) => N <= 0)) {
        var F, L;
        const N = (((F = i.flip) == null ? void 0 : F.index) || 0) + 1, Q = T[N];
        if (Q && (!(d === "alignment" ? m !== qt(Q) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        R.every((C) => C.overflows[0] > 0 && qt(C.placement) === m)))
          return {
            data: {
              index: N,
              overflows: R
            },
            reset: {
              placement: Q
            }
          };
        let K = (L = R.filter((V) => V.overflows[0] <= 0).sort((V, C) => V.overflows[1] - C.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!K)
          switch (f) {
            case "bestFit": {
              var q;
              const V = (q = R.filter((C) => {
                if (k) {
                  const j = qt(C.placement);
                  return j === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  j === "y";
                }
                return !0;
              }).map((C) => [C.placement, C.overflows.filter((j) => j > 0).reduce((j, M) => j + M, 0)]).sort((C, j) => C[1] - j[1])[0]) == null ? void 0 : q[0];
              V && (K = V);
              break;
            }
            case "initialPlacement":
              K = a;
              break;
          }
        if (s !== K)
          return {
            reset: {
              placement: K
            }
          };
      }
      return {};
    }
  };
};
function cm(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function dm(e) {
  return Ok.some((t) => e[t] >= 0);
}
const Hk = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...s
      } = vn(e, t);
      switch (r) {
        case "referenceHidden": {
          const i = await so(t, {
            ...s,
            elementContext: "reference"
          }), o = cm(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: dm(o)
            }
          };
        }
        case "escaped": {
          const i = await so(t, {
            ...s,
            altBoundary: !0
          }), o = cm(i, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: dm(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Y0 = /* @__PURE__ */ new Set(["left", "top"]);
async function Kk(e, t) {
  const {
    placement: n,
    platform: r,
    elements: s
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)), o = wn(n), a = Qs(n), l = qt(n) === "y", u = Y0.has(o) ? -1 : 1, c = i && l ? -1 : 1, d = vn(t, e);
  let {
    mainAxis: h,
    crossAxis: f,
    alignmentAxis: g
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof g == "number" && (f = a === "end" ? g * -1 : g), l ? {
    x: f * c,
    y: h * u
  } : {
    x: h * u,
    y: f * c
  };
}
const qk = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: s,
        y: i,
        placement: o,
        middlewareData: a
      } = t, l = await Kk(t, e);
      return o === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: s + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: o
        }
      };
    }
  };
}, Gk = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: s
      } = t, {
        mainAxis: i = !0,
        crossAxis: o = !1,
        limiter: a = {
          fn: (w) => {
            let {
              x: p,
              y: m
            } = w;
            return {
              x: p,
              y: m
            };
          }
        },
        ...l
      } = vn(e, t), u = {
        x: n,
        y: r
      }, c = await so(t, l), d = qt(wn(s)), h = Uh(d);
      let f = u[h], g = u[d];
      if (i) {
        const w = h === "y" ? "top" : "left", p = h === "y" ? "bottom" : "right", m = f + c[w], v = f - c[p];
        f = Zc(m, f, v);
      }
      if (o) {
        const w = d === "y" ? "top" : "left", p = d === "y" ? "bottom" : "right", m = g + c[w], v = g - c[p];
        g = Zc(m, g, v);
      }
      const y = a.fn({
        ...t,
        [h]: f,
        [d]: g
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r,
          enabled: {
            [h]: i,
            [d]: o
          }
        }
      };
    }
  };
}, Qk = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: s,
        rects: i,
        middlewareData: o
      } = t, {
        offset: a = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = vn(e, t), c = {
        x: n,
        y: r
      }, d = qt(s), h = Uh(d);
      let f = c[h], g = c[d];
      const y = vn(a, t), w = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (l) {
        const v = h === "y" ? "height" : "width", x = i.reference[h] - i.floating[v] + w.mainAxis, S = i.reference[h] + i.reference[v] - w.mainAxis;
        f < x ? f = x : f > S && (f = S);
      }
      if (u) {
        var p, m;
        const v = h === "y" ? "width" : "height", x = Y0.has(wn(s)), S = i.reference[d] - i.floating[v] + (x && ((p = o.offset) == null ? void 0 : p[d]) || 0) + (x ? 0 : w.crossAxis), k = i.reference[d] + i.reference[v] + (x ? 0 : ((m = o.offset) == null ? void 0 : m[d]) || 0) - (x ? w.crossAxis : 0);
        g < S ? g = S : g > k && (g = k);
      }
      return {
        [h]: f,
        [d]: g
      };
    }
  };
}, Yk = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: s,
        rects: i,
        platform: o,
        elements: a
      } = t, {
        apply: l = () => {
        },
        ...u
      } = vn(e, t), c = await so(t, u), d = wn(s), h = Qs(s), f = qt(s) === "y", {
        width: g,
        height: y
      } = i.floating;
      let w, p;
      d === "top" || d === "bottom" ? (w = d, p = h === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (p = d, w = h === "end" ? "top" : "bottom");
      const m = y - c.top - c.bottom, v = g - c.left - c.right, x = er(y - c[w], m), S = er(g - c[p], v), k = !t.middlewareData.shift;
      let T = x, E = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (E = v), (r = t.middlewareData.shift) != null && r.enabled.y && (T = m), k && !h) {
        const R = st(c.left, 0), F = st(c.right, 0), L = st(c.top, 0), q = st(c.bottom, 0);
        f ? E = g - 2 * (R !== 0 || F !== 0 ? R + F : st(c.left, c.right)) : T = y - 2 * (L !== 0 || q !== 0 ? L + q : st(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: E,
        availableHeight: T
      });
      const A = await o.getDimensions(a.floating);
      return g !== A.width || y !== A.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function $l() {
  return typeof window < "u";
}
function Ys(e) {
  return J0(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function at(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function tn(e) {
  var t;
  return (t = (J0(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function J0(e) {
  return $l() ? e instanceof Node || e instanceof at(e).Node : !1;
}
function $t(e) {
  return $l() ? e instanceof Element || e instanceof at(e).Element : !1;
}
function Zt(e) {
  return $l() ? e instanceof HTMLElement || e instanceof at(e).HTMLElement : !1;
}
function hm(e) {
  return !$l() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof at(e).ShadowRoot;
}
const Jk = /* @__PURE__ */ new Set(["inline", "contents"]);
function Eo(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: s
  } = Ft(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Jk.has(s);
}
const Xk = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Zk(e) {
  return Xk.has(Ys(e));
}
const eT = [":popover-open", ":modal"];
function Fl(e) {
  return eT.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const tT = ["transform", "translate", "scale", "rotate", "perspective"], nT = ["transform", "translate", "scale", "rotate", "perspective", "filter"], rT = ["paint", "layout", "strict", "content"];
function Wh(e) {
  const t = Hh(), n = $t(e) ? Ft(e) : e;
  return tT.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || nT.some((r) => (n.willChange || "").includes(r)) || rT.some((r) => (n.contain || "").includes(r));
}
function sT(e) {
  let t = tr(e);
  for (; Zt(t) && !Bs(t); ) {
    if (Wh(t))
      return t;
    if (Fl(t))
      return null;
    t = tr(t);
  }
  return null;
}
function Hh() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const iT = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Bs(e) {
  return iT.has(Ys(e));
}
function Ft(e) {
  return at(e).getComputedStyle(e);
}
function Vl(e) {
  return $t(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function tr(e) {
  if (Ys(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    hm(e) && e.host || // Fallback.
    tn(e)
  );
  return hm(t) ? t.host : t;
}
function X0(e) {
  const t = tr(e);
  return Bs(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Zt(t) && Eo(t) ? t : X0(t);
}
function io(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const s = X0(e), i = s === ((r = e.ownerDocument) == null ? void 0 : r.body), o = at(s);
  if (i) {
    const a = td(o);
    return t.concat(o, o.visualViewport || [], Eo(s) ? s : [], a && n ? io(a) : []);
  }
  return t.concat(s, io(s, [], n));
}
function td(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Z0(e) {
  const t = Ft(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const s = Zt(e), i = s ? e.offsetWidth : n, o = s ? e.offsetHeight : r, a = il(n) !== i || il(r) !== o;
  return a && (n = i, r = o), {
    width: n,
    height: r,
    $: a
  };
}
function Kh(e) {
  return $t(e) ? e : e.contextElement;
}
function _s(e) {
  const t = Kh(e);
  if (!Zt(t))
    return Yt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: s,
    $: i
  } = Z0(t);
  let o = (i ? il(n.width) : n.width) / r, a = (i ? il(n.height) : n.height) / s;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const oT = /* @__PURE__ */ Yt(0);
function ew(e) {
  const t = at(e);
  return !Hh() || !t.visualViewport ? oT : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function aT(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== at(e) ? !1 : t;
}
function Vr(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const s = e.getBoundingClientRect(), i = Kh(e);
  let o = Yt(1);
  t && (r ? $t(r) && (o = _s(r)) : o = _s(e));
  const a = aT(i, n, r) ? ew(i) : Yt(0);
  let l = (s.left + a.x) / o.x, u = (s.top + a.y) / o.y, c = s.width / o.x, d = s.height / o.y;
  if (i) {
    const h = at(i), f = r && $t(r) ? at(r) : r;
    let g = h, y = td(g);
    for (; y && r && f !== g; ) {
      const w = _s(y), p = y.getBoundingClientRect(), m = Ft(y), v = p.left + (y.clientLeft + parseFloat(m.paddingLeft)) * w.x, x = p.top + (y.clientTop + parseFloat(m.paddingTop)) * w.y;
      l *= w.x, u *= w.y, c *= w.x, d *= w.y, l += v, u += x, g = at(y), y = td(g);
    }
  }
  return al({
    width: c,
    height: d,
    x: l,
    y: u
  });
}
function qh(e, t) {
  const n = Vl(e).scrollLeft;
  return t ? t.left + n : Vr(tn(e)).left + n;
}
function tw(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    qh(e, r)
  )), i = r.top + t.scrollTop;
  return {
    x: s,
    y: i
  };
}
function lT(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: s
  } = e;
  const i = s === "fixed", o = tn(r), a = t ? Fl(t.floating) : !1;
  if (r === o || a && i)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Yt(1);
  const c = Yt(0), d = Zt(r);
  if ((d || !d && !i) && ((Ys(r) !== "body" || Eo(o)) && (l = Vl(r)), Zt(r))) {
    const f = Vr(r);
    u = _s(r), c.x = f.x + r.clientLeft, c.y = f.y + r.clientTop;
  }
  const h = o && !d && !i ? tw(o, l, !0) : Yt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + h.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + h.y
  };
}
function uT(e) {
  return Array.from(e.getClientRects());
}
function cT(e) {
  const t = tn(e), n = Vl(e), r = e.ownerDocument.body, s = st(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = st(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + qh(e);
  const a = -n.scrollTop;
  return Ft(r).direction === "rtl" && (o += st(t.clientWidth, r.clientWidth) - s), {
    width: s,
    height: i,
    x: o,
    y: a
  };
}
function dT(e, t) {
  const n = at(e), r = tn(e), s = n.visualViewport;
  let i = r.clientWidth, o = r.clientHeight, a = 0, l = 0;
  if (s) {
    i = s.width, o = s.height;
    const u = Hh();
    (!u || u && t === "fixed") && (a = s.offsetLeft, l = s.offsetTop);
  }
  return {
    width: i,
    height: o,
    x: a,
    y: l
  };
}
const hT = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function fT(e, t) {
  const n = Vr(e, !0, t === "fixed"), r = n.top + e.clientTop, s = n.left + e.clientLeft, i = Zt(e) ? _s(e) : Yt(1), o = e.clientWidth * i.x, a = e.clientHeight * i.y, l = s * i.x, u = r * i.y;
  return {
    width: o,
    height: a,
    x: l,
    y: u
  };
}
function fm(e, t, n) {
  let r;
  if (t === "viewport")
    r = dT(e, n);
  else if (t === "document")
    r = cT(tn(e));
  else if ($t(t))
    r = fT(t, n);
  else {
    const s = ew(e);
    r = {
      x: t.x - s.x,
      y: t.y - s.y,
      width: t.width,
      height: t.height
    };
  }
  return al(r);
}
function nw(e, t) {
  const n = tr(e);
  return n === t || !$t(n) || Bs(n) ? !1 : Ft(n).position === "fixed" || nw(n, t);
}
function pT(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = io(e, [], !1).filter((a) => $t(a) && Ys(a) !== "body"), s = null;
  const i = Ft(e).position === "fixed";
  let o = i ? tr(e) : e;
  for (; $t(o) && !Bs(o); ) {
    const a = Ft(o), l = Wh(o);
    !l && a.position === "fixed" && (s = null), (i ? !l && !s : !l && a.position === "static" && !!s && hT.has(s.position) || Eo(o) && !l && nw(e, o)) ? r = r.filter((c) => c !== o) : s = a, o = tr(o);
  }
  return t.set(e, r), r;
}
function mT(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: s
  } = e;
  const o = [...n === "clippingAncestors" ? Fl(t) ? [] : pT(t, this._c) : [].concat(n), r], a = o[0], l = o.reduce((u, c) => {
    const d = fm(t, c, s);
    return u.top = st(d.top, u.top), u.right = er(d.right, u.right), u.bottom = er(d.bottom, u.bottom), u.left = st(d.left, u.left), u;
  }, fm(t, a, s));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function gT(e) {
  const {
    width: t,
    height: n
  } = Z0(e);
  return {
    width: t,
    height: n
  };
}
function yT(e, t, n) {
  const r = Zt(t), s = tn(t), i = n === "fixed", o = Vr(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Yt(0);
  function u() {
    l.x = qh(s);
  }
  if (r || !r && !i)
    if ((Ys(t) !== "body" || Eo(s)) && (a = Vl(t)), r) {
      const f = Vr(t, !0, i, t);
      l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop;
    } else s && u();
  i && !r && s && u();
  const c = s && !r && !i ? tw(s, a) : Yt(0), d = o.left + a.scrollLeft - l.x - c.x, h = o.top + a.scrollTop - l.y - c.y;
  return {
    x: d,
    y: h,
    width: o.width,
    height: o.height
  };
}
function Pu(e) {
  return Ft(e).position === "static";
}
function pm(e, t) {
  if (!Zt(e) || Ft(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return tn(e) === n && (n = n.ownerDocument.body), n;
}
function rw(e, t) {
  const n = at(e);
  if (Fl(e))
    return n;
  if (!Zt(e)) {
    let s = tr(e);
    for (; s && !Bs(s); ) {
      if ($t(s) && !Pu(s))
        return s;
      s = tr(s);
    }
    return n;
  }
  let r = pm(e, t);
  for (; r && Zk(r) && Pu(r); )
    r = pm(r, t);
  return r && Bs(r) && Pu(r) && !Wh(r) ? n : r || sT(e) || n;
}
const vT = async function(e) {
  const t = this.getOffsetParent || rw, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: yT(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function wT(e) {
  return Ft(e).direction === "rtl";
}
const xT = {
  convertOffsetParentRelativeRectToViewportRelativeRect: lT,
  getDocumentElement: tn,
  getClippingRect: mT,
  getOffsetParent: rw,
  getElementRects: vT,
  getClientRects: uT,
  getDimensions: gT,
  getScale: _s,
  isElement: $t,
  isRTL: wT
};
function sw(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function bT(e, t) {
  let n = null, r;
  const s = tn(e);
  function i() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function o(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), i();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: d,
      width: h,
      height: f
    } = u;
    if (a || t(), !h || !f)
      return;
    const g = ea(d), y = ea(s.clientWidth - (c + h)), w = ea(s.clientHeight - (d + f)), p = ea(c), v = {
      rootMargin: -g + "px " + -y + "px " + -w + "px " + -p + "px",
      threshold: st(0, er(1, l)) || 1
    };
    let x = !0;
    function S(k) {
      const T = k[0].intersectionRatio;
      if (T !== l) {
        if (!x)
          return o();
        T ? o(!1, T) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !sw(u, e.getBoundingClientRect()) && o(), x = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...v,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, v);
    }
    n.observe(e);
  }
  return o(!0), i;
}
function ST(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: i = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = Kh(e), c = s || i ? [...u ? io(u) : [], ...io(t)] : [];
  c.forEach((p) => {
    s && p.addEventListener("scroll", n, {
      passive: !0
    }), i && p.addEventListener("resize", n);
  });
  const d = u && a ? bT(u, n) : null;
  let h = -1, f = null;
  o && (f = new ResizeObserver((p) => {
    let [m] = p;
    m && m.target === u && f && (f.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var v;
      (v = f) == null || v.observe(t);
    })), n();
  }), u && !l && f.observe(u), f.observe(t));
  let g, y = l ? Vr(e) : null;
  l && w();
  function w() {
    const p = Vr(e);
    y && !sw(y, p) && n(), y = p, g = requestAnimationFrame(w);
  }
  return n(), () => {
    var p;
    c.forEach((m) => {
      s && m.removeEventListener("scroll", n), i && m.removeEventListener("resize", n);
    }), d == null || d(), (p = f) == null || p.disconnect(), f = null, l && cancelAnimationFrame(g);
  };
}
const _T = qk, kT = Gk, TT = Wk, ET = Yk, CT = Hk, mm = zk, PT = Qk, AT = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), s = {
    platform: xT,
    ...n
  }, i = {
    ...s.platform,
    _c: r
  };
  return Bk(e, t, {
    ...s,
    platform: i
  });
};
var RT = typeof document < "u", OT = function() {
}, Ea = RT ? b.useLayoutEffect : OT;
function ll(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, s;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!ll(e[r], t[r]))
          return !1;
      return !0;
    }
    if (s = Object.keys(e), n = s.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, s[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = s[r];
      if (!(i === "_owner" && e.$$typeof) && !ll(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function iw(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function gm(e, t) {
  const n = iw(e);
  return Math.round(t * n) / n;
}
function Au(e) {
  const t = b.useRef(e);
  return Ea(() => {
    t.current = e;
  }), t;
}
function jT(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: s,
    elements: {
      reference: i,
      floating: o
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: u
  } = e, [c, d] = b.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, f] = b.useState(r);
  ll(h, r) || f(r);
  const [g, y] = b.useState(null), [w, p] = b.useState(null), m = b.useCallback((C) => {
    C !== k.current && (k.current = C, y(C));
  }, []), v = b.useCallback((C) => {
    C !== T.current && (T.current = C, p(C));
  }, []), x = i || g, S = o || w, k = b.useRef(null), T = b.useRef(null), E = b.useRef(c), A = l != null, R = Au(l), F = Au(s), L = Au(u), q = b.useCallback(() => {
    if (!k.current || !T.current)
      return;
    const C = {
      placement: t,
      strategy: n,
      middleware: h
    };
    F.current && (C.platform = F.current), AT(k.current, T.current, C).then((j) => {
      const M = {
        ...j,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      N.current && !ll(E.current, M) && (E.current = M, To.flushSync(() => {
        d(M);
      }));
    });
  }, [h, t, n, F, L]);
  Ea(() => {
    u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, d((C) => ({
      ...C,
      isPositioned: !1
    })));
  }, [u]);
  const N = b.useRef(!1);
  Ea(() => (N.current = !0, () => {
    N.current = !1;
  }), []), Ea(() => {
    if (x && (k.current = x), S && (T.current = S), x && S) {
      if (R.current)
        return R.current(x, S, q);
      q();
    }
  }, [x, S, q, R, A]);
  const Q = b.useMemo(() => ({
    reference: k,
    floating: T,
    setReference: m,
    setFloating: v
  }), [m, v]), K = b.useMemo(() => ({
    reference: x,
    floating: S
  }), [x, S]), V = b.useMemo(() => {
    const C = {
      position: n,
      left: 0,
      top: 0
    };
    if (!K.floating)
      return C;
    const j = gm(K.floating, c.x), M = gm(K.floating, c.y);
    return a ? {
      ...C,
      transform: "translate(" + j + "px, " + M + "px)",
      ...iw(K.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: j,
      top: M
    };
  }, [n, a, K.floating, c.x, c.y]);
  return b.useMemo(() => ({
    ...c,
    update: q,
    refs: Q,
    elements: K,
    floatingStyles: V
  }), [c, q, Q, K, V]);
}
const NT = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: s
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? mm({
        element: r.current,
        padding: s
      }).fn(n) : {} : r ? mm({
        element: r,
        padding: s
      }).fn(n) : {};
    }
  };
}, IT = (e, t) => ({
  ..._T(e),
  options: [e, t]
}), DT = (e, t) => ({
  ...kT(e),
  options: [e, t]
}), MT = (e, t) => ({
  ...PT(e),
  options: [e, t]
}), LT = (e, t) => ({
  ...TT(e),
  options: [e, t]
}), $T = (e, t) => ({
  ...ET(e),
  options: [e, t]
}), FT = (e, t) => ({
  ...CT(e),
  options: [e, t]
}), VT = (e, t) => ({
  ...NT(e),
  options: [e, t]
});
var UT = "Arrow", ow = b.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: s = 5, ...i } = e;
  return /* @__PURE__ */ _.jsx(
    Qe.svg,
    {
      ...i,
      ref: t,
      width: r,
      height: s,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ _.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ow.displayName = UT;
var BT = ow;
function zT(e) {
  const [t, n] = b.useState(void 0);
  return Zn(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((s) => {
        if (!Array.isArray(s) || !s.length)
          return;
        const i = s[0];
        let o, a;
        if ("borderBoxSize" in i) {
          const l = i.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          o = u.inlineSize, a = u.blockSize;
        } else
          o = e.offsetWidth, a = e.offsetHeight;
        n({ width: o, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var aw = "Popper", [lw, uw] = Ll(aw), [PD, cw] = lw(aw), dw = "PopperAnchor", hw = b.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...s } = e, i = cw(dw, n), o = b.useRef(null), a = Lt(t, o);
    return b.useEffect(() => {
      i.onAnchorChange((r == null ? void 0 : r.current) || o.current);
    }), r ? null : /* @__PURE__ */ _.jsx(Qe.div, { ...s, ref: a });
  }
);
hw.displayName = dw;
var Gh = "PopperContent", [WT, HT] = lw(Gh), fw = b.forwardRef(
  (e, t) => {
    var lr, Mf, Lf, $f, Ff, Vf;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: s = 0,
      align: i = "center",
      alignOffset: o = 0,
      arrowPadding: a = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: c = 0,
      sticky: d = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: f = "optimized",
      onPlaced: g,
      ...y
    } = e, w = cw(Gh, n), [p, m] = b.useState(null), v = Lt(t, (ri) => m(ri)), [x, S] = b.useState(null), k = zT(x), T = (k == null ? void 0 : k.width) ?? 0, E = (k == null ? void 0 : k.height) ?? 0, A = r + (i !== "center" ? "-" + i : ""), R = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, F = Array.isArray(u) ? u : [u], L = F.length > 0, q = {
      padding: R,
      boundary: F.filter(qT),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: N, floatingStyles: Q, placement: K, isPositioned: V, middlewareData: C } = jT({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: A,
      whileElementsMounted: (...ri) => ST(...ri, {
        animationFrame: f === "always"
      }),
      elements: {
        reference: w.anchor
      },
      middleware: [
        IT({ mainAxis: s + E, alignmentAxis: o }),
        l && DT({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? MT() : void 0,
          ...q
        }),
        l && LT({ ...q }),
        $T({
          ...q,
          apply: ({ elements: ri, rects: Uf, availableWidth: uS, availableHeight: cS }) => {
            const { width: dS, height: hS } = Uf.reference, Io = ri.floating.style;
            Io.setProperty("--radix-popper-available-width", `${uS}px`), Io.setProperty("--radix-popper-available-height", `${cS}px`), Io.setProperty("--radix-popper-anchor-width", `${dS}px`), Io.setProperty("--radix-popper-anchor-height", `${hS}px`);
          }
        }),
        x && VT({ element: x, padding: a }),
        GT({ arrowWidth: T, arrowHeight: E }),
        h && FT({ strategy: "referenceHidden", ...q })
      ]
    }), [j, M] = gw(K), H = Xn(g);
    Zn(() => {
      V && (H == null || H());
    }, [V, H]);
    const oe = (lr = C.arrow) == null ? void 0 : lr.x, St = (Mf = C.arrow) == null ? void 0 : Mf.y, dt = ((Lf = C.arrow) == null ? void 0 : Lf.centerOffset) !== 0, [ni, nn] = b.useState();
    return Zn(() => {
      p && nn(window.getComputedStyle(p).zIndex);
    }, [p]), /* @__PURE__ */ _.jsx(
      "div",
      {
        ref: N.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Q,
          transform: V ? Q.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ni,
          "--radix-popper-transform-origin": [
            ($f = C.transformOrigin) == null ? void 0 : $f.x,
            (Ff = C.transformOrigin) == null ? void 0 : Ff.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Vf = C.hide) == null ? void 0 : Vf.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ _.jsx(
          WT,
          {
            scope: n,
            placedSide: j,
            onArrowChange: S,
            arrowX: oe,
            arrowY: St,
            shouldHideArrow: dt,
            children: /* @__PURE__ */ _.jsx(
              Qe.div,
              {
                "data-side": j,
                "data-align": M,
                ...y,
                ref: v,
                style: {
                  ...y.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: V ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
fw.displayName = Gh;
var pw = "PopperArrow", KT = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, mw = b.forwardRef(function(t, n) {
  const { __scopePopper: r, ...s } = t, i = HT(pw, r), o = KT[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ _.jsx(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [o]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ _.jsx(
          BT,
          {
            ...s,
            ref: n,
            style: {
              ...s.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
mw.displayName = pw;
function qT(e) {
  return e !== null;
}
var GT = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var w, p, m;
    const { placement: n, rects: r, middlewareData: s } = t, o = ((w = s.arrow) == null ? void 0 : w.centerOffset) !== 0, a = o ? 0 : e.arrowWidth, l = o ? 0 : e.arrowHeight, [u, c] = gw(n), d = { start: "0%", center: "50%", end: "100%" }[c], h = (((p = s.arrow) == null ? void 0 : p.x) ?? 0) + a / 2, f = (((m = s.arrow) == null ? void 0 : m.y) ?? 0) + l / 2;
    let g = "", y = "";
    return u === "bottom" ? (g = o ? d : `${h}px`, y = `${-l}px`) : u === "top" ? (g = o ? d : `${h}px`, y = `${r.floating.height + l}px`) : u === "right" ? (g = `${-l}px`, y = o ? d : `${f}px`) : u === "left" && (g = `${r.floating.width + l}px`, y = o ? d : `${f}px`), { data: { x: g, y } };
  }
});
function gw(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var QT = hw, YT = fw, JT = mw, XT = "Portal", yw = b.forwardRef((e, t) => {
  var a;
  const { container: n, ...r } = e, [s, i] = b.useState(!1);
  Zn(() => i(!0), []);
  const o = n || s && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
  return o ? B1.createPortal(/* @__PURE__ */ _.jsx(Qe.div, { ...r, ref: t }), o) : null;
});
yw.displayName = XT;
function ZT(e, t) {
  return b.useReducer((n, r) => t[n][r] ?? n, e);
}
var Qh = (e) => {
  const { present: t, children: n } = e, r = eE(t), s = typeof n == "function" ? n({ present: r.isPresent }) : b.Children.only(n), i = Lt(r.ref, tE(s));
  return typeof n == "function" || r.isPresent ? b.cloneElement(s, { ref: i }) : null;
};
Qh.displayName = "Presence";
function eE(e) {
  const [t, n] = b.useState(), r = b.useRef(null), s = b.useRef(e), i = b.useRef("none"), o = e ? "mounted" : "unmounted", [a, l] = ZT(o, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return b.useEffect(() => {
    const u = ta(r.current);
    i.current = a === "mounted" ? u : "none";
  }, [a]), Zn(() => {
    const u = r.current, c = s.current;
    if (c !== e) {
      const h = i.current, f = ta(u);
      e ? l("MOUNT") : f === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(c && h !== f ? "ANIMATION_OUT" : "UNMOUNT"), s.current = e;
    }
  }, [e, l]), Zn(() => {
    if (t) {
      let u;
      const c = t.ownerDocument.defaultView ?? window, d = (f) => {
        const y = ta(r.current).includes(f.animationName);
        if (f.target === t && y && (l("ANIMATION_END"), !s.current)) {
          const w = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w);
          });
        }
      }, h = (f) => {
        f.target === t && (i.current = ta(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        c.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: b.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function ta(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function tE(e) {
  var r, s;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (s = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : s.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var nE = OS[" useInsertionEffect ".trim().toString()] || Zn;
function rE({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [s, i, o] = sE({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, l = a ? e : s;
  {
    const c = b.useRef(e !== void 0);
    b.useEffect(() => {
      const d = c.current;
      d !== a && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = a;
    }, [a, r]);
  }
  const u = b.useCallback(
    (c) => {
      var d;
      if (a) {
        const h = iE(c) ? c(e) : c;
        h !== e && ((d = o.current) == null || d.call(o, h));
      } else
        i(c);
    },
    [a, e, i, o]
  );
  return [l, u];
}
function sE({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = b.useState(e), s = b.useRef(n), i = b.useRef(t);
  return nE(() => {
    i.current = t;
  }, [t]), b.useEffect(() => {
    var o;
    s.current !== n && ((o = i.current) == null || o.call(i, n), s.current = n);
  }, [n, s]), [n, r, i];
}
function iE(e) {
  return typeof e == "function";
}
var oE = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), aE = "VisuallyHidden", Ul = b.forwardRef(
  (e, t) => /* @__PURE__ */ _.jsx(
    Qe.span,
    {
      ...e,
      ref: t,
      style: { ...oE, ...e.style }
    }
  )
);
Ul.displayName = aE;
var lE = Ul, [Bl, AD] = Ll("Tooltip", [
  uw
]), Yh = uw(), vw = "TooltipProvider", uE = 700, ym = "tooltip.open", [cE, ww] = Bl(vw), xw = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = uE,
    skipDelayDuration: r = 300,
    disableHoverableContent: s = !1,
    children: i
  } = e, o = b.useRef(!0), a = b.useRef(!1), l = b.useRef(0);
  return b.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ _.jsx(
    cE,
    {
      scope: t,
      isOpenDelayedRef: o,
      delayDuration: n,
      onOpen: b.useCallback(() => {
        window.clearTimeout(l.current), o.current = !1;
      }, []),
      onClose: b.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => o.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: b.useCallback((u) => {
        a.current = u;
      }, []),
      disableHoverableContent: s,
      children: i
    }
  );
};
xw.displayName = vw;
var bw = "Tooltip", [RD, zl] = Bl(bw), nd = "TooltipTrigger", dE = b.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, s = zl(nd, n), i = ww(nd, n), o = Yh(n), a = b.useRef(null), l = Lt(t, a, s.onTriggerChange), u = b.useRef(!1), c = b.useRef(!1), d = b.useCallback(() => u.current = !1, []);
    return b.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ _.jsx(QT, { asChild: !0, ...o, children: /* @__PURE__ */ _.jsx(
      Qe.button,
      {
        "aria-describedby": s.open ? s.contentId : void 0,
        "data-state": s.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: ke(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !c.current && !i.isPointerInTransitRef.current && (s.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: ke(e.onPointerLeave, () => {
          s.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: ke(e.onPointerDown, () => {
          s.open && s.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ke(e.onFocus, () => {
          u.current || s.onOpen();
        }),
        onBlur: ke(e.onBlur, s.onClose),
        onClick: ke(e.onClick, s.onClose)
      }
    ) });
  }
);
dE.displayName = nd;
var hE = "TooltipPortal", [OD, fE] = Bl(hE, {
  forceMount: void 0
}), zs = "TooltipContent", Sw = b.forwardRef(
  (e, t) => {
    const n = fE(zs, e.__scopeTooltip), { forceMount: r = n.forceMount, side: s = "top", ...i } = e, o = zl(zs, e.__scopeTooltip);
    return /* @__PURE__ */ _.jsx(Qh, { present: r || o.open, children: o.disableHoverableContent ? /* @__PURE__ */ _.jsx(_w, { side: s, ...i, ref: t }) : /* @__PURE__ */ _.jsx(pE, { side: s, ...i, ref: t }) });
  }
), pE = b.forwardRef((e, t) => {
  const n = zl(zs, e.__scopeTooltip), r = ww(zs, e.__scopeTooltip), s = b.useRef(null), i = Lt(t, s), [o, a] = b.useState(null), { trigger: l, onClose: u } = n, c = s.current, { onPointerInTransitChange: d } = r, h = b.useCallback(() => {
    a(null), d(!1);
  }, [d]), f = b.useCallback(
    (g, y) => {
      const w = g.currentTarget, p = { x: g.clientX, y: g.clientY }, m = wE(p, w.getBoundingClientRect()), v = xE(p, m), x = bE(y.getBoundingClientRect()), S = _E([...v, ...x]);
      a(S), d(!0);
    },
    [d]
  );
  return b.useEffect(() => () => h(), [h]), b.useEffect(() => {
    if (l && c) {
      const g = (w) => f(w, c), y = (w) => f(w, l);
      return l.addEventListener("pointerleave", g), c.addEventListener("pointerleave", y), () => {
        l.removeEventListener("pointerleave", g), c.removeEventListener("pointerleave", y);
      };
    }
  }, [l, c, f, h]), b.useEffect(() => {
    if (o) {
      const g = (y) => {
        const w = y.target, p = { x: y.clientX, y: y.clientY }, m = (l == null ? void 0 : l.contains(w)) || (c == null ? void 0 : c.contains(w)), v = !SE(p, o);
        m ? h() : v && (h(), u());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, c, o, u, h]), /* @__PURE__ */ _.jsx(_w, { ...e, ref: i });
}), [mE, gE] = Bl(bw, { isInside: !1 }), yE = /* @__PURE__ */ yk("TooltipContent"), _w = b.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": s,
      onEscapeKeyDown: i,
      onPointerDownOutside: o,
      ...a
    } = e, l = zl(zs, n), u = Yh(n), { onClose: c } = l;
    return b.useEffect(() => (document.addEventListener(ym, c), () => document.removeEventListener(ym, c)), [c]), b.useEffect(() => {
      if (l.trigger) {
        const d = (h) => {
          const f = h.target;
          f != null && f.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ _.jsx(
      Vh,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: o,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ _.jsxs(
          YT,
          {
            "data-state": l.stateAttribute,
            ...u,
            ...a,
            ref: t,
            style: {
              ...a.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ _.jsx(yE, { children: r }),
              /* @__PURE__ */ _.jsx(mE, { scope: n, isInside: !0, children: /* @__PURE__ */ _.jsx(lE, { id: l.contentId, role: "tooltip", children: s || r }) })
            ]
          }
        )
      }
    );
  }
);
Sw.displayName = zs;
var kw = "TooltipArrow", vE = b.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, s = Yh(n);
    return gE(
      kw,
      n
    ).isInside ? null : /* @__PURE__ */ _.jsx(JT, { ...s, ...r, ref: t });
  }
);
vE.displayName = kw;
function wE(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), s = Math.abs(t.right - e.x), i = Math.abs(t.left - e.x);
  switch (Math.min(n, r, s, i)) {
    case i:
      return "left";
    case s:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function xE(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function bE(e) {
  const { top: t, right: n, bottom: r, left: s } = e;
  return [
    { x: s, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: s, y: r }
  ];
}
function SE(e, t) {
  const { x: n, y: r } = e;
  let s = !1;
  for (let i = 0, o = t.length - 1; i < t.length; o = i++) {
    const a = t[i], l = t[o], u = a.x, c = a.y, d = l.x, h = l.y;
    c > r != h > r && n < (d - u) * (r - c) / (h - c) + u && (s = !s);
  }
  return s;
}
function _E(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), kE(t);
}
function kE(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1], o = t[t.length - 2];
      if ((i.x - o.x) * (s.y - o.y) >= (i.y - o.y) * (s.x - o.x)) t.pop();
      else break;
    }
    t.push(s);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1], o = n[n.length - 2];
      if ((i.x - o.x) * (s.y - o.y) >= (i.y - o.y) * (s.x - o.x)) n.pop();
      else break;
    }
    n.push(s);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var TE = xw, Tw = Sw;
function Ew(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (n = Ew(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Cw() {
  for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++) (e = arguments[n]) && (t = Ew(e)) && (r && (r += " "), r += t);
  return r;
}
const Jh = "-", EE = (e) => {
  const t = PE(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (o) => {
      const a = o.split(Jh);
      return a[0] === "" && a.length !== 1 && a.shift(), Pw(a, t) || CE(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = n[o] || [];
      return a && r[o] ? [...l, ...r[o]] : l;
    }
  };
}, Pw = (e, t) => {
  var o;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), s = r ? Pw(e.slice(1), r) : void 0;
  if (s)
    return s;
  if (t.validators.length === 0)
    return;
  const i = e.join(Jh);
  return (o = t.validators.find(({
    validator: a
  }) => a(i))) == null ? void 0 : o.classGroupId;
}, vm = /^\[(.+)\]$/, CE = (e) => {
  if (vm.test(e)) {
    const t = vm.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, PE = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return RE(Object.entries(e.classGroups), n).forEach(([i, o]) => {
    rd(o, r, i, t);
  }), r;
}, rd = (e, t, n, r) => {
  e.forEach((s) => {
    if (typeof s == "string") {
      const i = s === "" ? t : wm(t, s);
      i.classGroupId = n;
      return;
    }
    if (typeof s == "function") {
      if (AE(s)) {
        rd(s(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: s,
        classGroupId: n
      });
      return;
    }
    Object.entries(s).forEach(([i, o]) => {
      rd(o, wm(t, i), n, r);
    });
  });
}, wm = (e, t) => {
  let n = e;
  return t.split(Jh).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, AE = (e) => e.isThemeGetter, RE = (e, t) => t ? e.map(([n, r]) => {
  const s = r.map((i) => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([o, a]) => [t + o, a])) : i);
  return [n, s];
}) : e, OE = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const s = (i, o) => {
    n.set(i, o), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let o = n.get(i);
      if (o !== void 0)
        return o;
      if ((o = r.get(i)) !== void 0)
        return s(i, o), o;
    },
    set(i, o) {
      n.has(i) ? n.set(i, o) : s(i, o);
    }
  };
}, Aw = "!", jE = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, s = t[0], i = t.length, o = (a) => {
    const l = [];
    let u = 0, c = 0, d;
    for (let w = 0; w < a.length; w++) {
      let p = a[w];
      if (u === 0) {
        if (p === s && (r || a.slice(w, w + i) === t)) {
          l.push(a.slice(c, w)), c = w + i;
          continue;
        }
        if (p === "/") {
          d = w;
          continue;
        }
      }
      p === "[" ? u++ : p === "]" && u--;
    }
    const h = l.length === 0 ? a : a.substring(c), f = h.startsWith(Aw), g = f ? h.substring(1) : h, y = d && d > c ? d - c : void 0;
    return {
      modifiers: l,
      hasImportantModifier: f,
      baseClassName: g,
      maybePostfixModifierPosition: y
    };
  };
  return n ? (a) => n({
    className: a,
    parseClassName: o
  }) : o;
}, NE = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, IE = (e) => ({
  cache: OE(e.cacheSize),
  parseClassName: jE(e),
  ...EE(e)
}), DE = /\s+/, ME = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: s
  } = t, i = [], o = e.trim().split(DE);
  let a = "";
  for (let l = o.length - 1; l >= 0; l -= 1) {
    const u = o[l], {
      modifiers: c,
      hasImportantModifier: d,
      baseClassName: h,
      maybePostfixModifierPosition: f
    } = n(u);
    let g = !!f, y = r(g ? h.substring(0, f) : h);
    if (!y) {
      if (!g) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (y = r(h), !y) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      g = !1;
    }
    const w = NE(c).join(":"), p = d ? w + Aw : w, m = p + y;
    if (i.includes(m))
      continue;
    i.push(m);
    const v = s(y, g);
    for (let x = 0; x < v.length; ++x) {
      const S = v[x];
      i.push(p + S);
    }
    a = u + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function LE() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Rw(t)) && (r && (r += " "), r += n);
  return r;
}
const Rw = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Rw(e[r])) && (n && (n += " "), n += t);
  return n;
};
function $E(e, ...t) {
  let n, r, s, i = o;
  function o(l) {
    const u = t.reduce((c, d) => d(c), e());
    return n = IE(u), r = n.cache.get, s = n.cache.set, i = a, a(l);
  }
  function a(l) {
    const u = r(l);
    if (u)
      return u;
    const c = ME(l, n);
    return s(l, c), c;
  }
  return function() {
    return i(LE.apply(null, arguments));
  };
}
const ne = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Ow = /^\[(?:([a-z-]+):)?(.+)\]$/i, FE = /^\d+\/\d+$/, VE = /* @__PURE__ */ new Set(["px", "full", "screen"]), UE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, BE = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, zE = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, WE = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, HE = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rn = (e) => ks(e) || VE.has(e) || FE.test(e), kn = (e) => Js(e, "length", ZE), ks = (e) => !!e && !Number.isNaN(Number(e)), Ru = (e) => Js(e, "number", ks), hi = (e) => !!e && Number.isInteger(Number(e)), KE = (e) => e.endsWith("%") && ks(e.slice(0, -1)), W = (e) => Ow.test(e), Tn = (e) => UE.test(e), qE = /* @__PURE__ */ new Set(["length", "size", "percentage"]), GE = (e) => Js(e, qE, jw), QE = (e) => Js(e, "position", jw), YE = /* @__PURE__ */ new Set(["image", "url"]), JE = (e) => Js(e, YE, tC), XE = (e) => Js(e, "", eC), fi = () => !0, Js = (e, t, n) => {
  const r = Ow.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ZE = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  BE.test(e) && !zE.test(e)
), jw = () => !1, eC = (e) => WE.test(e), tC = (e) => HE.test(e), nC = () => {
  const e = ne("colors"), t = ne("spacing"), n = ne("blur"), r = ne("brightness"), s = ne("borderColor"), i = ne("borderRadius"), o = ne("borderSpacing"), a = ne("borderWidth"), l = ne("contrast"), u = ne("grayscale"), c = ne("hueRotate"), d = ne("invert"), h = ne("gap"), f = ne("gradientColorStops"), g = ne("gradientColorStopPositions"), y = ne("inset"), w = ne("margin"), p = ne("opacity"), m = ne("padding"), v = ne("saturate"), x = ne("scale"), S = ne("sepia"), k = ne("skew"), T = ne("space"), E = ne("translate"), A = () => ["auto", "contain", "none"], R = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", W, t], L = () => [W, t], q = () => ["", rn, kn], N = () => ["auto", ks, W], Q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], V = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], C = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], j = () => ["", "0", W], M = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [ks, W];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [fi],
      spacing: [rn, kn],
      blur: ["none", "", Tn, W],
      brightness: H(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Tn, W],
      borderSpacing: L(),
      borderWidth: q(),
      contrast: H(),
      grayscale: j(),
      hueRotate: H(),
      invert: j(),
      gap: L(),
      gradientColorStops: [e],
      gradientColorStopPositions: [KE, kn],
      inset: F(),
      margin: F(),
      opacity: H(),
      padding: L(),
      saturate: H(),
      scale: H(),
      sepia: j(),
      skew: H(),
      space: L(),
      translate: L()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", W]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Tn]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": M()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": M()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Q(), W]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: R()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": R()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": R()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: A()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": A()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [y]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [y]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [y]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [y]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [y]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [y]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [y]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [y]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [y]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", hi, W]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: F()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", W]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: j()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: j()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", hi, W]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [fi]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", hi, W]
        }, W]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": N()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": N()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [fi]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [hi, W]
        }, W]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": N()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": N()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", W]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", W]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...C()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...C(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...C(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [m]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [m]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [m]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [m]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [m]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [m]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [m]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [m]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [m]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [w]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [w]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [w]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [w]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [w]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [w]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [w]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [w]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [w]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [T]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [T]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", W, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [W, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [W, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [Tn]
        }, Tn]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [W, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [W, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [W, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [W, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Tn, kn]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ru]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [fi]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", W]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ks, Ru]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", rn, W]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", W]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", W]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [p]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [p]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", rn, kn]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", rn, W]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: L()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", W]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", W]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [p]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Q(), QE]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", GE]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, JE]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [g]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [g]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [f]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [f]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [f]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [i]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [i]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [i]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [i]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [i]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [i]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [i]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [i]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [i]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [i]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [i]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [i]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [p]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [a]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [p]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [s]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [s]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [s]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [s]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [s]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [s]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [s]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [s]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [s]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [s]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [rn, W]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [rn, kn]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: q()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [p]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [rn, kn]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Tn, XE]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [fi]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [p]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...V(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": V()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Tn, W]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [v]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [S]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [p]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [v]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [o]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [o]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [o]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", W]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: H()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", W]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: H()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", W]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [x]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [x]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [x]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [hi, W]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [E]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [E]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [k]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [k]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", W]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", W]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": L()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": L()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": L()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": L()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": L()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": L()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": L()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", W]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [rn, kn, Ru]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, rC = /* @__PURE__ */ $E(nC);
function Vt(...e) {
  return rC(Cw(e));
}
const sC = TE, iC = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ _.jsx(
  Tw,
  {
    ref: r,
    sideOffset: t,
    className: Vt(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
iC.displayName = Tw.displayName;
const oC = 1, aC = 1e6;
let Ou = 0;
function lC() {
  return Ou = (Ou + 1) % Number.MAX_SAFE_INTEGER, Ou.toString();
}
const ju = /* @__PURE__ */ new Map(), xm = (e) => {
  if (ju.has(e))
    return;
  const t = setTimeout(() => {
    ju.delete(e), ji({
      type: "REMOVE_TOAST",
      toastId: e
    });
  }, aC);
  ju.set(e, t);
}, uC = (e, t) => {
  switch (t.type) {
    case "ADD_TOAST":
      return {
        ...e,
        toasts: [t.toast, ...e.toasts].slice(0, oC)
      };
    case "UPDATE_TOAST":
      return {
        ...e,
        toasts: e.toasts.map((n) => n.id === t.toast.id ? { ...n, ...t.toast } : n)
      };
    case "DISMISS_TOAST": {
      const { toastId: n } = t;
      return n ? xm(n) : e.toasts.forEach((r) => {
        xm(r.id);
      }), {
        ...e,
        toasts: e.toasts.map(
          (r) => r.id === n || n === void 0 ? {
            ...r,
            open: !1
          } : r
        )
      };
    }
    case "REMOVE_TOAST":
      return t.toastId === void 0 ? {
        ...e,
        toasts: []
      } : {
        ...e,
        toasts: e.toasts.filter((n) => n.id !== t.toastId)
      };
  }
}, Ca = [];
let Pa = { toasts: [] };
function ji(e) {
  Pa = uC(Pa, e), Ca.forEach((t) => {
    t(Pa);
  });
}
function cC({ ...e }) {
  const t = lC(), n = (s) => ji({
    type: "UPDATE_TOAST",
    toast: { ...s, id: t }
  }), r = () => ji({ type: "DISMISS_TOAST", toastId: t });
  return ji({
    type: "ADD_TOAST",
    toast: {
      ...e,
      id: t,
      open: !0,
      onOpenChange: (s) => {
        s || r();
      }
    }
  }), {
    id: t,
    dismiss: r,
    update: n
  };
}
function Nw() {
  const [e, t] = b.useState(Pa);
  return b.useEffect(() => (Ca.push(t), () => {
    const n = Ca.indexOf(t);
    n > -1 && Ca.splice(n, 1);
  }), [e]), {
    ...e,
    toast: cC,
    dismiss: (n) => ji({ type: "DISMISS_TOAST", toastId: n })
  };
}
function dC(e) {
  const t = e + "CollectionProvider", [n, r] = Ll(t), [s, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), o = (y) => {
    const { scope: w, children: p } = y, m = on.useRef(null), v = on.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ _.jsx(s, { scope: w, itemMap: v, collectionRef: m, children: p });
  };
  o.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ sl(a), u = on.forwardRef(
    (y, w) => {
      const { scope: p, children: m } = y, v = i(a, p), x = Lt(w, v.collectionRef);
      return /* @__PURE__ */ _.jsx(l, { ref: x, children: m });
    }
  );
  u.displayName = a;
  const c = e + "CollectionItemSlot", d = "data-radix-collection-item", h = /* @__PURE__ */ sl(c), f = on.forwardRef(
    (y, w) => {
      const { scope: p, children: m, ...v } = y, x = on.useRef(null), S = Lt(w, x), k = i(c, p);
      return on.useEffect(() => (k.itemMap.set(x, { ref: x, ...v }), () => void k.itemMap.delete(x))), /* @__PURE__ */ _.jsx(h, { [d]: "", ref: S, children: m });
    }
  );
  f.displayName = c;
  function g(y) {
    const w = i(e + "CollectionConsumer", y);
    return on.useCallback(() => {
      const m = w.collectionRef.current;
      if (!m) return [];
      const v = Array.from(m.querySelectorAll(`[${d}]`));
      return Array.from(w.itemMap.values()).sort(
        (k, T) => v.indexOf(k.ref.current) - v.indexOf(T.ref.current)
      );
    }, [w.collectionRef, w.itemMap]);
  }
  return [
    { Provider: o, Slot: u, ItemSlot: f },
    g,
    r
  ];
}
var Xh = "ToastProvider", [Zh, hC, fC] = dC("Toast"), [Iw, jD] = Ll("Toast", [fC]), [pC, Wl] = Iw(Xh), Dw = (e) => {
  const {
    __scopeToast: t,
    label: n = "Notification",
    duration: r = 5e3,
    swipeDirection: s = "right",
    swipeThreshold: i = 50,
    children: o
  } = e, [a, l] = b.useState(null), [u, c] = b.useState(0), d = b.useRef(!1), h = b.useRef(!1);
  return n.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${Xh}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ _.jsx(Zh.Provider, { scope: t, children: /* @__PURE__ */ _.jsx(
    pC,
    {
      scope: t,
      label: n,
      duration: r,
      swipeDirection: s,
      swipeThreshold: i,
      toastCount: u,
      viewport: a,
      onViewportChange: l,
      onToastAdd: b.useCallback(() => c((f) => f + 1), []),
      onToastRemove: b.useCallback(() => c((f) => f - 1), []),
      isFocusedToastEscapeKeyDownRef: d,
      isClosePausedRef: h,
      children: o
    }
  ) });
};
Dw.displayName = Xh;
var Mw = "ToastViewport", mC = ["F8"], sd = "toast.viewportPause", id = "toast.viewportResume", Lw = b.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      hotkey: r = mC,
      label: s = "Notifications ({hotkey})",
      ...i
    } = e, o = Wl(Mw, n), a = hC(n), l = b.useRef(null), u = b.useRef(null), c = b.useRef(null), d = b.useRef(null), h = Lt(t, d, o.onViewportChange), f = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), g = o.toastCount > 0;
    b.useEffect(() => {
      const w = (p) => {
        var v;
        r.length !== 0 && r.every((x) => p[x] || p.code === x) && ((v = d.current) == null || v.focus());
      };
      return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
    }, [r]), b.useEffect(() => {
      const w = l.current, p = d.current;
      if (g && w && p) {
        const m = () => {
          if (!o.isClosePausedRef.current) {
            const k = new CustomEvent(sd);
            p.dispatchEvent(k), o.isClosePausedRef.current = !0;
          }
        }, v = () => {
          if (o.isClosePausedRef.current) {
            const k = new CustomEvent(id);
            p.dispatchEvent(k), o.isClosePausedRef.current = !1;
          }
        }, x = (k) => {
          !w.contains(k.relatedTarget) && v();
        }, S = () => {
          w.contains(document.activeElement) || v();
        };
        return w.addEventListener("focusin", m), w.addEventListener("focusout", x), w.addEventListener("pointermove", m), w.addEventListener("pointerleave", S), window.addEventListener("blur", m), window.addEventListener("focus", v), () => {
          w.removeEventListener("focusin", m), w.removeEventListener("focusout", x), w.removeEventListener("pointermove", m), w.removeEventListener("pointerleave", S), window.removeEventListener("blur", m), window.removeEventListener("focus", v);
        };
      }
    }, [g, o.isClosePausedRef]);
    const y = b.useCallback(
      ({ tabbingDirection: w }) => {
        const m = a().map((v) => {
          const x = v.ref.current, S = [x, ...PC(x)];
          return w === "forwards" ? S : S.reverse();
        });
        return (w === "forwards" ? m.reverse() : m).flat();
      },
      [a]
    );
    return b.useEffect(() => {
      const w = d.current;
      if (w) {
        const p = (m) => {
          var S, k, T;
          const v = m.altKey || m.ctrlKey || m.metaKey;
          if (m.key === "Tab" && !v) {
            const E = document.activeElement, A = m.shiftKey;
            if (m.target === w && A) {
              (S = u.current) == null || S.focus();
              return;
            }
            const L = y({ tabbingDirection: A ? "backwards" : "forwards" }), q = L.findIndex((N) => N === E);
            Nu(L.slice(q + 1)) ? m.preventDefault() : A ? (k = u.current) == null || k.focus() : (T = c.current) == null || T.focus();
          }
        };
        return w.addEventListener("keydown", p), () => w.removeEventListener("keydown", p);
      }
    }, [a, y]), /* @__PURE__ */ _.jsxs(
      Rk,
      {
        ref: l,
        role: "region",
        "aria-label": s.replace("{hotkey}", f),
        tabIndex: -1,
        style: { pointerEvents: g ? void 0 : "none" },
        children: [
          g && /* @__PURE__ */ _.jsx(
            od,
            {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const w = y({
                  tabbingDirection: "forwards"
                });
                Nu(w);
              }
            }
          ),
          /* @__PURE__ */ _.jsx(Zh.Slot, { scope: n, children: /* @__PURE__ */ _.jsx(Qe.ol, { tabIndex: -1, ...i, ref: h }) }),
          g && /* @__PURE__ */ _.jsx(
            od,
            {
              ref: c,
              onFocusFromOutsideViewport: () => {
                const w = y({
                  tabbingDirection: "backwards"
                });
                Nu(w);
              }
            }
          )
        ]
      }
    );
  }
);
Lw.displayName = Mw;
var $w = "ToastFocusProxy", od = b.forwardRef(
  (e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...s } = e, i = Wl($w, n);
    return /* @__PURE__ */ _.jsx(
      Ul,
      {
        "aria-hidden": !0,
        tabIndex: 0,
        ...s,
        ref: t,
        style: { position: "fixed" },
        onFocus: (o) => {
          var u;
          const a = o.relatedTarget;
          !((u = i.viewport) != null && u.contains(a)) && r();
        }
      }
    );
  }
);
od.displayName = $w;
var Co = "Toast", gC = "toast.swipeStart", yC = "toast.swipeMove", vC = "toast.swipeCancel", wC = "toast.swipeEnd", Fw = b.forwardRef(
  (e, t) => {
    const { forceMount: n, open: r, defaultOpen: s, onOpenChange: i, ...o } = e, [a, l] = rE({
      prop: r,
      defaultProp: s ?? !0,
      onChange: i,
      caller: Co
    });
    return /* @__PURE__ */ _.jsx(Qh, { present: n || a, children: /* @__PURE__ */ _.jsx(
      SC,
      {
        open: a,
        ...o,
        ref: t,
        onClose: () => l(!1),
        onPause: Xn(e.onPause),
        onResume: Xn(e.onResume),
        onSwipeStart: ke(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: ke(e.onSwipeMove, (u) => {
          const { x: c, y: d } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${d}px`);
        }),
        onSwipeCancel: ke(e.onSwipeCancel, (u) => {
          u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: ke(e.onSwipeEnd, (u) => {
          const { x: c, y: d } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${d}px`), l(!1);
        })
      }
    ) });
  }
);
Fw.displayName = Co;
var [xC, bC] = Iw(Co, {
  onClose() {
  }
}), SC = b.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      type: r = "foreground",
      duration: s,
      open: i,
      onClose: o,
      onEscapeKeyDown: a,
      onPause: l,
      onResume: u,
      onSwipeStart: c,
      onSwipeMove: d,
      onSwipeCancel: h,
      onSwipeEnd: f,
      ...g
    } = e, y = Wl(Co, n), [w, p] = b.useState(null), m = Lt(t, (N) => p(N)), v = b.useRef(null), x = b.useRef(null), S = s || y.duration, k = b.useRef(0), T = b.useRef(S), E = b.useRef(0), { onToastAdd: A, onToastRemove: R } = y, F = Xn(() => {
      var Q;
      (w == null ? void 0 : w.contains(document.activeElement)) && ((Q = y.viewport) == null || Q.focus()), o();
    }), L = b.useCallback(
      (N) => {
        !N || N === 1 / 0 || (window.clearTimeout(E.current), k.current = (/* @__PURE__ */ new Date()).getTime(), E.current = window.setTimeout(F, N));
      },
      [F]
    );
    b.useEffect(() => {
      const N = y.viewport;
      if (N) {
        const Q = () => {
          L(T.current), u == null || u();
        }, K = () => {
          const V = (/* @__PURE__ */ new Date()).getTime() - k.current;
          T.current = T.current - V, window.clearTimeout(E.current), l == null || l();
        };
        return N.addEventListener(sd, K), N.addEventListener(id, Q), () => {
          N.removeEventListener(sd, K), N.removeEventListener(id, Q);
        };
      }
    }, [y.viewport, S, l, u, L]), b.useEffect(() => {
      i && !y.isClosePausedRef.current && L(S);
    }, [i, S, y.isClosePausedRef, L]), b.useEffect(() => (A(), () => R()), [A, R]);
    const q = b.useMemo(() => w ? Kw(w) : null, [w]);
    return y.viewport ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      q && /* @__PURE__ */ _.jsx(
        _C,
        {
          __scopeToast: n,
          role: "status",
          "aria-live": r === "foreground" ? "assertive" : "polite",
          "aria-atomic": !0,
          children: q
        }
      ),
      /* @__PURE__ */ _.jsx(xC, { scope: n, onClose: F, children: To.createPortal(
        /* @__PURE__ */ _.jsx(Zh.ItemSlot, { scope: n, children: /* @__PURE__ */ _.jsx(
          Ak,
          {
            asChild: !0,
            onEscapeKeyDown: ke(a, () => {
              y.isFocusedToastEscapeKeyDownRef.current || F(), y.isFocusedToastEscapeKeyDownRef.current = !1;
            }),
            children: /* @__PURE__ */ _.jsx(
              Qe.li,
              {
                role: "status",
                "aria-live": "off",
                "aria-atomic": !0,
                tabIndex: 0,
                "data-state": i ? "open" : "closed",
                "data-swipe-direction": y.swipeDirection,
                ...g,
                ref: m,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: ke(e.onKeyDown, (N) => {
                  N.key === "Escape" && (a == null || a(N.nativeEvent), N.nativeEvent.defaultPrevented || (y.isFocusedToastEscapeKeyDownRef.current = !0, F()));
                }),
                onPointerDown: ke(e.onPointerDown, (N) => {
                  N.button === 0 && (v.current = { x: N.clientX, y: N.clientY });
                }),
                onPointerMove: ke(e.onPointerMove, (N) => {
                  if (!v.current) return;
                  const Q = N.clientX - v.current.x, K = N.clientY - v.current.y, V = !!x.current, C = ["left", "right"].includes(y.swipeDirection), j = ["left", "up"].includes(y.swipeDirection) ? Math.min : Math.max, M = C ? j(0, Q) : 0, H = C ? 0 : j(0, K), oe = N.pointerType === "touch" ? 10 : 2, St = { x: M, y: H }, dt = { originalEvent: N, delta: St };
                  V ? (x.current = St, na(yC, d, dt, {
                    discrete: !1
                  })) : bm(St, y.swipeDirection, oe) ? (x.current = St, na(gC, c, dt, {
                    discrete: !1
                  }), N.target.setPointerCapture(N.pointerId)) : (Math.abs(Q) > oe || Math.abs(K) > oe) && (v.current = null);
                }),
                onPointerUp: ke(e.onPointerUp, (N) => {
                  const Q = x.current, K = N.target;
                  if (K.hasPointerCapture(N.pointerId) && K.releasePointerCapture(N.pointerId), x.current = null, v.current = null, Q) {
                    const V = N.currentTarget, C = { originalEvent: N, delta: Q };
                    bm(Q, y.swipeDirection, y.swipeThreshold) ? na(wC, f, C, {
                      discrete: !0
                    }) : na(
                      vC,
                      h,
                      C,
                      {
                        discrete: !0
                      }
                    ), V.addEventListener("click", (j) => j.preventDefault(), {
                      once: !0
                    });
                  }
                })
              }
            )
          }
        ) }),
        y.viewport
      ) })
    ] }) : null;
  }
), _C = (e) => {
  const { __scopeToast: t, children: n, ...r } = e, s = Wl(Co, t), [i, o] = b.useState(!1), [a, l] = b.useState(!1);
  return EC(() => o(!0)), b.useEffect(() => {
    const u = window.setTimeout(() => l(!0), 1e3);
    return () => window.clearTimeout(u);
  }, []), a ? null : /* @__PURE__ */ _.jsx(yw, { asChild: !0, children: /* @__PURE__ */ _.jsx(Ul, { ...r, children: i && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    s.label,
    " ",
    n
  ] }) }) });
}, kC = "ToastTitle", Vw = b.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ _.jsx(Qe.div, { ...r, ref: t });
  }
);
Vw.displayName = kC;
var TC = "ToastDescription", Uw = b.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ _.jsx(Qe.div, { ...r, ref: t });
  }
);
Uw.displayName = TC;
var Bw = "ToastAction", zw = b.forwardRef(
  (e, t) => {
    const { altText: n, ...r } = e;
    return n.trim() ? /* @__PURE__ */ _.jsx(Hw, { altText: n, asChild: !0, children: /* @__PURE__ */ _.jsx(ef, { ...r, ref: t }) }) : (console.error(
      `Invalid prop \`altText\` supplied to \`${Bw}\`. Expected non-empty \`string\`.`
    ), null);
  }
);
zw.displayName = Bw;
var Ww = "ToastClose", ef = b.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e, s = bC(Ww, n);
    return /* @__PURE__ */ _.jsx(Hw, { asChild: !0, children: /* @__PURE__ */ _.jsx(
      Qe.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ke(e.onClick, s.onClose)
      }
    ) });
  }
);
ef.displayName = Ww;
var Hw = b.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...s } = e;
  return /* @__PURE__ */ _.jsx(
    Qe.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": r || void 0,
      ...s,
      ref: t
    }
  );
});
function Kw(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((r) => {
    if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), CC(r)) {
      const s = r.ariaHidden || r.hidden || r.style.display === "none", i = r.dataset.radixToastAnnounceExclude === "";
      if (!s)
        if (i) {
          const o = r.dataset.radixToastAnnounceAlt;
          o && t.push(o);
        } else
          t.push(...Kw(r));
    }
  }), t;
}
function na(e, t, n, { discrete: r }) {
  const s = n.originalEvent.currentTarget, i = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  t && s.addEventListener(e, t, { once: !0 }), r ? H0(s, i) : s.dispatchEvent(i);
}
var bm = (e, t, n = 0) => {
  const r = Math.abs(e.x), s = Math.abs(e.y), i = r > s;
  return t === "left" || t === "right" ? i && r > n : !i && s > n;
};
function EC(e = () => {
}) {
  const t = Xn(e);
  Zn(() => {
    let n = 0, r = 0;
    return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
      window.cancelAnimationFrame(n), window.cancelAnimationFrame(r);
    };
  }, [t]);
}
function CC(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function PC(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const s = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Nu(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
var AC = Dw, qw = Lw, Gw = Fw, Qw = Vw, Yw = Uw, Jw = zw, Xw = ef;
const Sm = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, _m = Cw, tf = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return _m(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: s, defaultVariants: i } = t, o = Object.keys(s).map((u) => {
    const c = n == null ? void 0 : n[u], d = i == null ? void 0 : i[u];
    if (c === null) return null;
    const h = Sm(c) || Sm(d);
    return s[u][h];
  }), a = n && Object.entries(n).reduce((u, c) => {
    let [d, h] = c;
    return h === void 0 || (u[d] = h), u;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: h, ...f } = c;
    return Object.entries(f).every((g) => {
      let [y, w] = g;
      return Array.isArray(w) ? w.includes({
        ...i,
        ...a
      }[y]) : {
        ...i,
        ...a
      }[y] === w;
    }) ? [
      ...u,
      d,
      h
    ] : u;
  }, []);
  return _m(e, o, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RC = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Zw = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var OC = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jC = b.forwardRef(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: i,
    iconNode: o,
    ...a
  }, l) => b.createElement(
    "svg",
    {
      ref: l,
      ...OC,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Zw("lucide", s),
      ...a
    },
    [
      ...o.map(([u, c]) => b.createElement(u, c)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = (e, t) => {
  const n = b.forwardRef(
    ({ className: r, ...s }, i) => b.createElement(jC, {
      ref: i,
      iconNode: t,
      className: Zw(`lucide-${RC(e)}`, r),
      ...s
    })
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NC = tt("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IC = tt("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ex = tt("Brain", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DC = tt("Calculator", [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MC = tt("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LC = tt("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $C = tt("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FC = tt("Puzzle", [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VC = tt("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ad = tt("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UC = tt("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BC = tt("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zC = tt("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WC = tt("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), HC = AC, tx = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(
  qw,
  {
    ref: n,
    className: Vt(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      e
    ),
    ...t
  }
));
tx.displayName = qw.displayName;
const KC = tf(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), nx = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ _.jsx(Gw, { ref: r, className: Vt(KC({ variant: t }), e), ...n }));
nx.displayName = Gw.displayName;
const qC = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(
  Jw,
  {
    ref: n,
    className: Vt(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      e
    ),
    ...t
  }
));
qC.displayName = Jw.displayName;
const rx = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(
  Xw,
  {
    ref: n,
    className: Vt(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e
    ),
    "toast-close": "",
    ...t,
    children: /* @__PURE__ */ _.jsx(WC, { className: "h-4 w-4" })
  }
));
rx.displayName = Xw.displayName;
const sx = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(Qw, { ref: n, className: Vt("text-sm font-semibold", e), ...t }));
sx.displayName = Qw.displayName;
const ix = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(Yw, { ref: n, className: Vt("text-sm opacity-90", e), ...t }));
ix.displayName = Yw.displayName;
function GC() {
  const { toasts: e } = Nw();
  return /* @__PURE__ */ _.jsxs(HC, { children: [
    e.map(function({ id: t, title: n, description: r, action: s, ...i }) {
      return /* @__PURE__ */ _.jsxs(nx, { ...i, children: [
        /* @__PURE__ */ _.jsxs("div", { className: "grid gap-1", children: [
          n && /* @__PURE__ */ _.jsx(sx, { children: n }),
          r && /* @__PURE__ */ _.jsx(ix, { children: r })
        ] }),
        s,
        /* @__PURE__ */ _.jsx(rx, {})
      ] }, t);
    }),
    /* @__PURE__ */ _.jsx(tx, {})
  ] });
}
const nf = b.createContext({});
function rf(e) {
  const t = b.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const ox = typeof window < "u", ax = ox ? b.useLayoutEffect : b.useEffect, Hl = /* @__PURE__ */ b.createContext(null);
function sf(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function of(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const en = (e, t, n) => n > t ? t : n < e ? e : n;
function km(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let Po = () => {
}, Ur = () => {
};
var Sy;
typeof process < "u" && ((Sy = process.env) == null ? void 0 : Sy.NODE_ENV) !== "production" && (Po = (e, t, n) => {
  !e && typeof console < "u" && console.warn(km(t, n));
}, Ur = (e, t, n) => {
  if (!e)
    throw new Error(km(t, n));
});
const xn = {}, lx = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function ux(e) {
  return typeof e == "object" && e !== null;
}
const cx = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function af(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const wt = /* @__NO_SIDE_EFFECTS__ */ (e) => e, QC = (e, t) => (n) => t(e(n)), Ao = (...e) => e.reduce(QC), oo = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const r = t - e;
  return r === 0 ? 1 : (n - e) / r;
};
class lf {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return sf(this.subscriptions, t), () => of(this.subscriptions, t);
  }
  notify(t, n, r) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](t, n, r);
      else
        for (let i = 0; i < s; i++) {
          const o = this.subscriptions[i];
          o && o(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Jt = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, yt = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function dx(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const hx = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, YC = 1e-7, JC = 12;
function XC(e, t, n, r, s) {
  let i, o, a = 0;
  do
    o = t + (n - t) / 2, i = hx(o, r, s) - e, i > 0 ? n = o : t = o;
  while (Math.abs(i) > YC && ++a < JC);
  return o;
}
function Ro(e, t, n, r) {
  if (e === t && n === r)
    return wt;
  const s = (i) => XC(i, 0, 1, e, n);
  return (i) => i === 0 || i === 1 ? i : hx(s(i), t, r);
}
const fx = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, px = (e) => (t) => 1 - e(1 - t), mx = /* @__PURE__ */ Ro(0.33, 1.53, 0.69, 0.99), uf = /* @__PURE__ */ px(mx), gx = /* @__PURE__ */ fx(uf), yx = (e) => (e *= 2) < 1 ? 0.5 * uf(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), cf = (e) => 1 - Math.sin(Math.acos(e)), vx = px(cf), wx = fx(cf), ZC = /* @__PURE__ */ Ro(0.42, 0, 1, 1), eP = /* @__PURE__ */ Ro(0, 0, 0.58, 1), xx = /* @__PURE__ */ Ro(0.42, 0, 0.58, 1), tP = (e) => Array.isArray(e) && typeof e[0] != "number", bx = (e) => Array.isArray(e) && typeof e[0] == "number", Tm = {
  linear: wt,
  easeIn: ZC,
  easeInOut: xx,
  easeOut: eP,
  circIn: cf,
  circInOut: wx,
  circOut: vx,
  backIn: uf,
  backInOut: gx,
  backOut: mx,
  anticipate: yx
}, nP = (e) => typeof e == "string", Em = (e) => {
  if (bx(e)) {
    Ur(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, r, s] = e;
    return Ro(t, n, r, s);
  } else if (nP(e))
    return Ur(Tm[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Tm[e];
  return e;
}, ra = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
], Cm = {
  value: null,
  addProjectionMetrics: null
};
function rP(e, t) {
  let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), s = !1, i = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, l = 0;
  function u(d) {
    o.has(d) && (c.schedule(d), e()), l++, d(a);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (d, h = !1, f = !1) => {
      const y = f && s ? n : r;
      return h && o.add(d), y.has(d) || y.add(d), d;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (d) => {
      r.delete(d), o.delete(d);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (d) => {
      if (a = d, s) {
        i = !0;
        return;
      }
      s = !0, [n, r] = [r, n], n.forEach(u), t && Cm.value && Cm.value.frameloop[t].push(l), l = 0, n.clear(), s = !1, i && (i = !1, c.process(d));
    }
  };
  return c;
}
const sP = 40;
function Sx(e, t) {
  let n = !1, r = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = ra.reduce((v, x) => (v[x] = rP(i, t ? x : void 0), v), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: d, preRender: h, render: f, postRender: g } = o, y = () => {
    const v = xn.useManualTiming ? s.timestamp : performance.now();
    n = !1, xn.useManualTiming || (s.delta = r ? 1e3 / 60 : Math.max(Math.min(v - s.timestamp, sP), 1)), s.timestamp = v, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), d.process(s), h.process(s), f.process(s), g.process(s), s.isProcessing = !1, n && t && (r = !1, e(y));
  }, w = () => {
    n = !0, r = !0, s.isProcessing || e(y);
  };
  return { schedule: ra.reduce((v, x) => {
    const S = o[x];
    return v[x] = (k, T = !1, E = !1) => (n || w(), S.schedule(k, T, E)), v;
  }, {}), cancel: (v) => {
    for (let x = 0; x < ra.length; x++)
      o[ra[x]].cancel(v);
  }, state: s, steps: o };
}
const { schedule: ie, cancel: nr, state: Oe, steps: Iu } = /* @__PURE__ */ Sx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : wt, !0);
let Aa;
function iP() {
  Aa = void 0;
}
const We = {
  now: () => (Aa === void 0 && We.set(Oe.isProcessing || xn.useManualTiming ? Oe.timestamp : performance.now()), Aa),
  set: (e) => {
    Aa = e, queueMicrotask(iP);
  }
}, _x = (e) => (t) => typeof t == "string" && t.startsWith(e), kx = /* @__PURE__ */ _x("--"), oP = /* @__PURE__ */ _x("var(--"), df = (e) => oP(e) ? aP.test(e.split("/*")[0].trim()) : !1, aP = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Pm(e) {
  return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--");
}
const Xs = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, ao = {
  ...Xs,
  transform: (e) => en(0, 1, e)
}, sa = {
  ...Xs,
  default: 1
}, Ni = (e) => Math.round(e * 1e5) / 1e5, hf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function lP(e) {
  return e == null;
}
const uP = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ff = (e, t) => (n) => !!(typeof n == "string" && uP.test(n) && n.startsWith(e) || t && !lP(n) && Object.prototype.hasOwnProperty.call(n, t)), Tx = (e, t, n) => (r) => {
  if (typeof r != "string")
    return r;
  const [s, i, o, a] = r.match(hf);
  return {
    [e]: parseFloat(s),
    [t]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, cP = (e) => en(0, 255, e), Du = {
  ...Xs,
  transform: (e) => Math.round(cP(e))
}, _r = {
  test: /* @__PURE__ */ ff("rgb", "red"),
  parse: /* @__PURE__ */ Tx("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Du.transform(e) + ", " + Du.transform(t) + ", " + Du.transform(n) + ", " + Ni(ao.transform(r)) + ")"
};
function dP(e) {
  let t = "", n = "", r = "", s = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), s = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), s = e.substring(4, 5), t += t, n += n, r += r, s += s), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const ld = {
  test: /* @__PURE__ */ ff("#"),
  parse: dP,
  transform: _r.transform
}, Oo = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), Cn = /* @__PURE__ */ Oo("deg"), Xt = /* @__PURE__ */ Oo("%"), D = /* @__PURE__ */ Oo("px"), hP = /* @__PURE__ */ Oo("vh"), fP = /* @__PURE__ */ Oo("vw"), Am = {
  ...Xt,
  parse: (e) => Xt.parse(e) / 100,
  transform: (e) => Xt.transform(e * 100)
}, hs = {
  test: /* @__PURE__ */ ff("hsl", "hue"),
  parse: /* @__PURE__ */ Tx("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + Xt.transform(Ni(t)) + ", " + Xt.transform(Ni(n)) + ", " + Ni(ao.transform(r)) + ")"
}, we = {
  test: (e) => _r.test(e) || ld.test(e) || hs.test(e),
  parse: (e) => _r.test(e) ? _r.parse(e) : hs.test(e) ? hs.parse(e) : ld.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? _r.transform(e) : hs.transform(e),
  getAnimatableNone: (e) => {
    const t = we.parse(e);
    return t.alpha = 0, we.transform(t);
  }
}, pP = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function mP(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(hf)) == null ? void 0 : t.length) || 0) + (((n = e.match(pP)) == null ? void 0 : n.length) || 0) > 0;
}
const Ex = "number", Cx = "color", gP = "var", yP = "var(", Rm = "${}", vP = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function lo(e) {
  const t = e.toString(), n = [], r = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let i = 0;
  const a = t.replace(vP, (l) => (we.test(l) ? (r.color.push(i), s.push(Cx), n.push(we.parse(l))) : l.startsWith(yP) ? (r.var.push(i), s.push(gP), n.push(l)) : (r.number.push(i), s.push(Ex), n.push(parseFloat(l))), ++i, Rm)).split(Rm);
  return { values: n, split: a, indexes: r, types: s };
}
function Px(e) {
  return lo(e).values;
}
function Ax(e) {
  const { split: t, types: n } = lo(e), r = t.length;
  return (s) => {
    let i = "";
    for (let o = 0; o < r; o++)
      if (i += t[o], s[o] !== void 0) {
        const a = n[o];
        a === Ex ? i += Ni(s[o]) : a === Cx ? i += we.transform(s[o]) : i += s[o];
      }
    return i;
  };
}
const wP = (e) => typeof e == "number" ? 0 : we.test(e) ? we.getAnimatableNone(e) : e;
function xP(e) {
  const t = Px(e);
  return Ax(e)(t.map(wP));
}
const rr = {
  test: mP,
  parse: Px,
  createTransformer: Ax,
  getAnimatableNone: xP
};
function Mu(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function bP({ hue: e, saturation: t, lightness: n, alpha: r }) {
  e /= 360, t /= 100, n /= 100;
  let s = 0, i = 0, o = 0;
  if (!t)
    s = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    s = Mu(l, a, e + 1 / 3), i = Mu(l, a, e), o = Mu(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(i * 255),
    blue: Math.round(o * 255),
    alpha: r
  };
}
function ul(e, t) {
  return (n) => n > 0 ? t : e;
}
const de = (e, t, n) => e + (t - e) * n, Lu = (e, t, n) => {
  const r = e * e, s = n * (t * t - r) + r;
  return s < 0 ? 0 : Math.sqrt(s);
}, SP = [ld, _r, hs], _P = (e) => SP.find((t) => t.test(e));
function Om(e) {
  const t = _P(e);
  if (Po(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === hs && (n = bP(n)), n;
}
const jm = (e, t) => {
  const n = Om(e), r = Om(t);
  if (!n || !r)
    return ul(e, t);
  const s = { ...n };
  return (i) => (s.red = Lu(n.red, r.red, i), s.green = Lu(n.green, r.green, i), s.blue = Lu(n.blue, r.blue, i), s.alpha = de(n.alpha, r.alpha, i), _r.transform(s));
}, ud = /* @__PURE__ */ new Set(["none", "hidden"]);
function kP(e, t) {
  return ud.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function TP(e, t) {
  return (n) => de(e, t, n);
}
function pf(e) {
  return typeof e == "number" ? TP : typeof e == "string" ? df(e) ? ul : we.test(e) ? jm : PP : Array.isArray(e) ? Rx : typeof e == "object" ? we.test(e) ? jm : EP : ul;
}
function Rx(e, t) {
  const n = [...e], r = n.length, s = e.map((i, o) => pf(i)(i, t[o]));
  return (i) => {
    for (let o = 0; o < r; o++)
      n[o] = s[o](i);
    return n;
  };
}
function EP(e, t) {
  const n = { ...e, ...t }, r = {};
  for (const s in n)
    e[s] !== void 0 && t[s] !== void 0 && (r[s] = pf(e[s])(e[s], t[s]));
  return (s) => {
    for (const i in r)
      n[i] = r[i](s);
    return n;
  };
}
function CP(e, t) {
  const n = [], r = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const i = t.types[s], o = e.indexes[i][r[i]], a = e.values[o] ?? 0;
    n[s] = a, r[i]++;
  }
  return n;
}
const PP = (e, t) => {
  const n = rr.createTransformer(t), r = lo(e), s = lo(t);
  return r.indexes.var.length === s.indexes.var.length && r.indexes.color.length === s.indexes.color.length && r.indexes.number.length >= s.indexes.number.length ? ud.has(e) && !s.values.length || ud.has(t) && !r.values.length ? kP(e, t) : Ao(Rx(CP(r, s), s.values), n) : (Po(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ul(e, t));
};
function Ox(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? de(e, t, n) : pf(e)(e, t);
}
const AP = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => ie.update(t, n),
    stop: () => nr(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Oe.isProcessing ? Oe.timestamp : We.now()
  };
}, jx = (e, t, n = 10) => {
  let r = "";
  const s = Math.max(Math.round(t / n), 2);
  for (let i = 0; i < s; i++)
    r += Math.round(e(i / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, cl = 2e4;
function mf(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < cl; )
    t += n, r = e.next(t);
  return t >= cl ? 1 / 0 : t;
}
function RP(e, t = 100, n) {
  const r = n({ ...e, keyframes: [0, t] }), s = Math.min(mf(r), cl);
  return {
    type: "keyframes",
    ease: (i) => r.next(s * i).value / t,
    duration: /* @__PURE__ */ yt(s)
  };
}
const OP = 5;
function Nx(e, t, n) {
  const r = Math.max(t - OP, 0);
  return dx(n - e(r), t - r);
}
const ue = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, $u = 1e-3;
function jP({ duration: e = ue.duration, bounce: t = ue.bounce, velocity: n = ue.velocity, mass: r = ue.mass }) {
  let s, i;
  Po(e <= /* @__PURE__ */ Jt(ue.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = en(ue.minDamping, ue.maxDamping, o), e = en(ue.minDuration, ue.maxDuration, /* @__PURE__ */ yt(e)), o < 1 ? (s = (u) => {
    const c = u * o, d = c * e, h = c - n, f = cd(u, o), g = Math.exp(-d);
    return $u - h / f * g;
  }, i = (u) => {
    const d = u * o * e, h = d * n + n, f = Math.pow(o, 2) * Math.pow(u, 2) * e, g = Math.exp(-d), y = cd(Math.pow(u, 2), o);
    return (-s(u) + $u > 0 ? -1 : 1) * ((h - f) * g) / y;
  }) : (s = (u) => {
    const c = Math.exp(-u * e), d = (u - n) * e + 1;
    return -$u + c * d;
  }, i = (u) => {
    const c = Math.exp(-u * e), d = (n - u) * (e * e);
    return c * d;
  });
  const a = 5 / e, l = IP(s, i, a);
  if (e = /* @__PURE__ */ Jt(e), isNaN(l))
    return {
      stiffness: ue.stiffness,
      damping: ue.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * r;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(r * u),
      duration: e
    };
  }
}
const NP = 12;
function IP(e, t, n) {
  let r = n;
  for (let s = 1; s < NP; s++)
    r = r - e(r) / t(r);
  return r;
}
function cd(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const DP = ["duration", "bounce"], MP = ["stiffness", "damping", "mass"];
function Nm(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function LP(e) {
  let t = {
    velocity: ue.velocity,
    stiffness: ue.stiffness,
    damping: ue.damping,
    mass: ue.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Nm(e, MP) && Nm(e, DP))
    if (e.visualDuration) {
      const n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), s = r * r, i = 2 * en(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(s);
      t = {
        ...t,
        mass: ue.mass,
        stiffness: s,
        damping: i
      };
    } else {
      const n = jP(e);
      t = {
        ...t,
        ...n,
        mass: ue.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function dl(e = ue.visualDuration, t = ue.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: r, restDelta: s } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: u, mass: c, duration: d, velocity: h, isResolvedFromDuration: f } = LP({
    ...n,
    velocity: -/* @__PURE__ */ yt(n.velocity || 0)
  }), g = h || 0, y = u / (2 * Math.sqrt(l * c)), w = o - i, p = /* @__PURE__ */ yt(Math.sqrt(l / c)), m = Math.abs(w) < 5;
  r || (r = m ? ue.restSpeed.granular : ue.restSpeed.default), s || (s = m ? ue.restDelta.granular : ue.restDelta.default);
  let v;
  if (y < 1) {
    const S = cd(p, y);
    v = (k) => {
      const T = Math.exp(-y * p * k);
      return o - T * ((g + y * p * w) / S * Math.sin(S * k) + w * Math.cos(S * k));
    };
  } else if (y === 1)
    v = (S) => o - Math.exp(-p * S) * (w + (g + p * w) * S);
  else {
    const S = p * Math.sqrt(y * y - 1);
    v = (k) => {
      const T = Math.exp(-y * p * k), E = Math.min(S * k, 300);
      return o - T * ((g + y * p * w) * Math.sinh(E) + S * w * Math.cosh(E)) / S;
    };
  }
  const x = {
    calculatedDuration: f && d || null,
    next: (S) => {
      const k = v(S);
      if (f)
        a.done = S >= d;
      else {
        let T = S === 0 ? g : 0;
        y < 1 && (T = S === 0 ? /* @__PURE__ */ Jt(g) : Nx(v, S, k));
        const E = Math.abs(T) <= r, A = Math.abs(o - k) <= s;
        a.done = E && A;
      }
      return a.value = a.done ? o : k, a;
    },
    toString: () => {
      const S = Math.min(mf(x), cl), k = jx((T) => x.next(S * T).value, S, 30);
      return S + "ms " + k;
    },
    toTransition: () => {
    }
  };
  return x;
}
dl.applyToOptions = (e) => {
  const t = RP(e, 100, dl);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ Jt(t.duration), e.type = "keyframes", e;
};
function dd({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: r = 325, bounceDamping: s = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const d = e[0], h = {
    done: !1,
    value: d
  }, f = (E) => a !== void 0 && E < a || l !== void 0 && E > l, g = (E) => a === void 0 ? l : l === void 0 || Math.abs(a - E) < Math.abs(l - E) ? a : l;
  let y = n * t;
  const w = d + y, p = o === void 0 ? w : o(w);
  p !== w && (y = p - d);
  const m = (E) => -y * Math.exp(-E / r), v = (E) => p + m(E), x = (E) => {
    const A = m(E), R = v(E);
    h.done = Math.abs(A) <= u, h.value = h.done ? p : R;
  };
  let S, k;
  const T = (E) => {
    f(h.value) && (S = E, k = dl({
      keyframes: [h.value, g(h.value)],
      velocity: Nx(v, E, h.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: i,
      restDelta: u,
      restSpeed: c
    }));
  };
  return T(0), {
    calculatedDuration: null,
    next: (E) => {
      let A = !1;
      return !k && S === void 0 && (A = !0, x(E), T(E)), S !== void 0 && E >= S ? k.next(E - S) : (!A && x(E), h);
    }
  };
}
function $P(e, t, n) {
  const r = [], s = n || xn.mix || Ox, i = e.length - 1;
  for (let o = 0; o < i; o++) {
    let a = s(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || wt : t;
      a = Ao(l, a);
    }
    r.push(a);
  }
  return r;
}
function FP(e, t, { clamp: n = !0, ease: r, mixer: s } = {}) {
  const i = e.length;
  if (Ur(i === t.length, "Both input and output ranges must be the same length", "range-length"), i === 1)
    return () => t[0];
  if (i === 2 && t[0] === t[1])
    return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[i - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = $P(t, r, s), l = a.length, u = (c) => {
    if (o && c < e[0])
      return t[0];
    let d = 0;
    if (l > 1)
      for (; d < e.length - 2 && !(c < e[d + 1]); d++)
        ;
    const h = /* @__PURE__ */ oo(e[d], e[d + 1], c);
    return a[d](h);
  };
  return n ? (c) => u(en(e[0], e[i - 1], c)) : u;
}
function VP(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const s = /* @__PURE__ */ oo(0, t, r);
    e.push(de(n, 1, s));
  }
}
function UP(e) {
  const t = [0];
  return VP(t, e.length - 1), t;
}
function BP(e, t) {
  return e.map((n) => n * t);
}
function zP(e, t) {
  return e.map(() => t || xx).splice(0, e.length - 1);
}
function Ii({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  const s = tP(r) ? r.map(Em) : Em(r), i = {
    done: !1,
    value: t[0]
  }, o = BP(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : UP(t),
    e
  ), a = FP(o, t, {
    ease: Array.isArray(s) ? s : zP(t, s)
  });
  return {
    calculatedDuration: e,
    next: (l) => (i.value = a(l), i.done = l >= e, i)
  };
}
const WP = (e) => e !== null;
function gf(e, { repeat: t, repeatType: n = "loop" }, r, s = 1) {
  const i = e.filter(WP), a = s < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !a || r === void 0 ? i[a] : r;
}
const HP = {
  decay: dd,
  inertia: dd,
  tween: Ii,
  keyframes: Ii,
  spring: dl
};
function Ix(e) {
  typeof e.type == "string" && (e.type = HP[e.type]);
}
class yf {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const KP = (e) => e / 100;
class vf extends yf {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var r, s;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== We.now() && this.tick(We.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (s = (r = this.options).onStop) == null || s.call(r));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Ix(t);
    const { type: n = Ii, repeat: r = 0, repeatDelay: s = 0, repeatType: i, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = n || Ii;
    l !== Ii && typeof a[0] != "number" && (this.mixKeyframes = Ao(KP, Ox(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    i === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = mf(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (r + 1) - s, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: r, totalDuration: s, mixKeyframes: i, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: u = 0, keyframes: c, repeat: d, repeatType: h, repeatDelay: f, type: g, onUpdate: y, finalKeyframe: w } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - s / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const p = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), m = this.playbackSpeed >= 0 ? p < 0 : p > s;
    this.currentTime = Math.max(p, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let v = this.currentTime, x = r;
    if (d) {
      const E = Math.min(this.currentTime, s) / a;
      let A = Math.floor(E), R = E % 1;
      !R && E >= 1 && (R = 1), R === 1 && A--, A = Math.min(A, d + 1), !!(A % 2) && (h === "reverse" ? (R = 1 - R, f && (R -= f / a)) : h === "mirror" && (x = o)), v = en(0, 1, R) * a;
    }
    const S = m ? { done: !1, value: c[0] } : x.next(v);
    i && (S.value = i(S.value));
    let { done: k } = S;
    !m && l !== null && (k = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const T = this.holdTime === null && (this.state === "finished" || this.state === "running" && k);
    return T && g !== dd && (S.value = gf(c, this.options, w, this.speed)), y && y(S.value), T && this.finish(), S;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ yt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ yt(t);
  }
  get time() {
    return /* @__PURE__ */ yt(this.currentTime);
  }
  set time(t) {
    var n;
    t = /* @__PURE__ */ Jt(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(We.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ yt(this.currentTime));
  }
  play() {
    var s, i;
    if (this.isStopped)
      return;
    const { driver: t = AP, startTime: n } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (i = (s = this.options).onPlay) == null || i.call(s);
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = n ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(We.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this);
  }
}
function qP(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const kr = (e) => e * 180 / Math.PI, hd = (e) => {
  const t = kr(Math.atan2(e[1], e[0]));
  return fd(t);
}, GP = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: hd,
  rotateZ: hd,
  skewX: (e) => kr(Math.atan(e[1])),
  skewY: (e) => kr(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, fd = (e) => (e = e % 360, e < 0 && (e += 360), e), Im = hd, Dm = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Mm = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), QP = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Dm,
  scaleY: Mm,
  scale: (e) => (Dm(e) + Mm(e)) / 2,
  rotateX: (e) => fd(kr(Math.atan2(e[6], e[5]))),
  rotateY: (e) => fd(kr(Math.atan2(-e[2], e[0]))),
  rotateZ: Im,
  rotate: Im,
  skewX: (e) => kr(Math.atan(e[4])),
  skewY: (e) => kr(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function pd(e) {
  return e.includes("scale") ? 1 : 0;
}
function md(e, t) {
  if (!e || e === "none")
    return pd(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, s;
  if (n)
    r = QP, s = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = GP, s = a;
  }
  if (!s)
    return pd(t);
  const i = r[t], o = s[1].split(",").map(JP);
  return typeof i == "function" ? i(o) : o[i];
}
const YP = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return md(n, t);
};
function JP(e) {
  return parseFloat(e.trim());
}
const Zs = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], ei = new Set(Zs), Lm = (e) => e === Xs || e === D, XP = /* @__PURE__ */ new Set(["x", "y", "z"]), ZP = Zs.filter((e) => !XP.has(e));
function eA(e) {
  const t = [];
  return ZP.forEach((n) => {
    const r = e.getValue(n);
    r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const Un = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => md(t, "x"),
  y: (e, { transform: t }) => md(t, "y")
};
Un.translateX = Un.x;
Un.translateY = Un.y;
const Ir = /* @__PURE__ */ new Set();
let gd = !1, yd = !1, vd = !1;
function Dx() {
  if (yd) {
    const e = Array.from(Ir).filter((r) => r.needsMeasurement), t = new Set(e.map((r) => r.element)), n = /* @__PURE__ */ new Map();
    t.forEach((r) => {
      const s = eA(r);
      s.length && (n.set(r, s), r.render());
    }), e.forEach((r) => r.measureInitialState()), t.forEach((r) => {
      r.render();
      const s = n.get(r);
      s && s.forEach(([i, o]) => {
        var a;
        (a = r.getValue(i)) == null || a.set(o);
      });
    }), e.forEach((r) => r.measureEndState()), e.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  yd = !1, gd = !1, Ir.forEach((e) => e.complete(vd)), Ir.clear();
}
function Mx() {
  Ir.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (yd = !0);
  });
}
function tA() {
  vd = !0, Mx(), Dx(), vd = !1;
}
class wf {
  constructor(t, n, r, s, i, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = s, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Ir.add(this), gd || (gd = !0, ie.read(Mx), ie.resolveKeyframes(Dx))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: s } = this;
    if (t[0] === null) {
      const i = s == null ? void 0 : s.get(), o = t[t.length - 1];
      if (i !== void 0)
        t[0] = i;
      else if (r && n) {
        const a = r.readValue(n, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), s && i === void 0 && s.set(t[0]);
    }
    qP(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Ir.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Ir.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const nA = (e) => e.startsWith("--");
function rA(e, t, n) {
  nA(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const sA = /* @__PURE__ */ af(() => window.ScrollTimeline !== void 0), iA = {};
function oA(e, t) {
  const n = /* @__PURE__ */ af(e);
  return () => iA[t] ?? n();
}
const Lx = /* @__PURE__ */ oA(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), xi = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, $m = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ xi([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ xi([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ xi([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ xi([0.33, 1.53, 0.69, 0.99])
};
function $x(e, t) {
  if (e)
    return typeof e == "function" ? Lx() ? jx(e, t) : "ease-out" : bx(e) ? xi(e) : Array.isArray(e) ? e.map((n) => $x(n, t) || $m.easeOut) : $m[e];
}
function aA(e, t, n, { delay: r = 0, duration: s = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const d = $x(a, s);
  Array.isArray(d) && (c.easing = d);
  const h = {
    delay: r,
    duration: s,
    easing: Array.isArray(d) ? "linear" : d,
    fill: "both",
    iterations: i + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (h.pseudoElement = u), e.animate(c, h);
}
function Fx(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function lA({ type: e, ...t }) {
  return Fx(e) && Lx() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class uA extends yf {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: n, name: r, keyframes: s, pseudoElement: i, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!i, this.allowFlatten = o, this.options = t, Ur(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = lA(t);
    this.animation = aA(n, r, s, u, i), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !i) {
        const c = gf(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : rA(n, r, c), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var t, n;
    this.isPseudoElement || (n = (t = this.animation).commitStyles) == null || n.call(t);
  }
  get duration() {
    var n, r;
    const t = ((r = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : r.call(n).duration) || 0;
    return /* @__PURE__ */ yt(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ yt(t);
  }
  get time() {
    return /* @__PURE__ */ yt(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Jt(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    var r;
    return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && sA() ? (this.animation.timeline = t, wt) : n(this);
  }
}
const Vx = {
  anticipate: yx,
  backInOut: gx,
  circInOut: wx
};
function cA(e) {
  return e in Vx;
}
function dA(e) {
  typeof e.ease == "string" && cA(e.ease) && (e.ease = Vx[e.ease]);
}
const Fu = 10;
class hA extends uA {
  constructor(t) {
    dA(t), Ix(t), super(t), t.startTime !== void 0 && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: r, onComplete: s, element: i, ...o } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new vf({
      ...o,
      autoplay: !1
    }), l = Math.max(Fu, We.now() - this.startTime), u = en(0, Fu, l - Fu);
    n.setWithVelocity(a.sample(Math.max(0, l - u)).value, a.sample(l).value, u), a.stop();
  }
}
const Fm = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(rr.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function fA(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function pA(e, t, n, r) {
  const s = e[0];
  if (s === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const i = e[e.length - 1], o = Fm(s, t), a = Fm(i, t);
  return Po(o === a, `You are trying to animate ${t} from "${s}" to "${i}". "${o ? i : s}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : fA(e) || (n === "spring" || Fx(n)) && r;
}
function wd(e) {
  e.duration = 0, e.type = "keyframes";
}
const mA = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), gA = /* @__PURE__ */ af(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function yA(e) {
  var c;
  const { motionValue: t, name: n, repeatDelay: r, repeatType: s, damping: i, type: o } = e;
  if (!(((c = t == null ? void 0 : t.owner) == null ? void 0 : c.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return gA() && n && mA.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !r && s !== "mirror" && i !== 0 && o !== "inertia";
}
const vA = 40;
class wA extends yf {
  constructor({ autoplay: t = !0, delay: n = 0, type: r = "keyframes", repeat: s = 0, repeatDelay: i = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...d }) {
    var g;
    super(), this.stop = () => {
      var y, w;
      this._animation && (this._animation.stop(), (y = this.stopTimeline) == null || y.call(this)), (w = this.keyframeResolver) == null || w.cancel();
    }, this.createdAt = We.now();
    const h = {
      autoplay: t,
      delay: n,
      type: r,
      repeat: s,
      repeatDelay: i,
      repeatType: o,
      name: l,
      motionValue: u,
      element: c,
      ...d
    }, f = (c == null ? void 0 : c.KeyframeResolver) || wf;
    this.keyframeResolver = new f(a, (y, w, p) => this.onKeyframesResolved(y, w, h, !p), l, u, c), (g = this.keyframeResolver) == null || g.scheduleResolve();
  }
  onKeyframesResolved(t, n, r, s) {
    var w, p;
    this.keyframeResolver = void 0;
    const { name: i, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = r;
    this.resolvedAt = We.now(), pA(t, i, o, a) || ((xn.instantAnimations || !l) && (c == null || c(gf(t, r, n))), t[0] = t[t.length - 1], wd(r), r.repeat = 0);
    const h = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > vA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...r,
      keyframes: t
    }, f = !u && yA(h), g = (p = (w = h.motionValue) == null ? void 0 : w.owner) == null ? void 0 : p.current, y = f ? new hA({
      ...h,
      element: g
    }) : new vf(h);
    y.finished.then(() => {
      this.notifyFinished();
    }).catch(wt), this.pendingTimeline && (this.stopTimeline = y.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = y;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), tA()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
function Ux(e, t, n, r = 0, s = 1) {
  const i = Array.from(e).sort((u, c) => u.sortNodePosition(c)).indexOf(t), o = e.size, a = (o - 1) * r;
  return typeof n == "function" ? n(i, o) : s === 1 ? i * r : a - i * r;
}
const xA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function bA(e) {
  const t = xA.exec(e);
  if (!t)
    return [,];
  const [, n, r, s] = t;
  return [`--${n ?? r}`, s];
}
const SA = 4;
function Bx(e, t, n = 1) {
  Ur(n <= SA, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [r, s] = bA(e);
  if (!r)
    return;
  const i = window.getComputedStyle(t).getPropertyValue(r);
  if (i) {
    const o = i.trim();
    return lx(o) ? parseFloat(o) : o;
  }
  return df(s) ? Bx(s, t, n + 1) : s;
}
const _A = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, kA = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), TA = {
  type: "keyframes",
  duration: 0.8
}, EA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, CA = (e, { keyframes: t }) => t.length > 2 ? TA : ei.has(e) ? e.startsWith("scale") ? kA(t[1]) : _A : EA, PA = (e) => e !== null;
function AA(e, { repeat: t, repeatType: n = "loop" }, r) {
  const s = e.filter(PA), i = t && n !== "loop" && t % 2 === 1 ? 0 : s.length - 1;
  return !i || r === void 0 ? s[i] : r;
}
function xf(e, t) {
  return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
}
function RA({ when: e, delay: t, delayChildren: n, staggerChildren: r, staggerDirection: s, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const bf = (e, t, n, r = {}, s, i) => (o) => {
  const a = xf(r, e) || {}, l = a.delay || r.delay || 0;
  let { elapsed: u = 0 } = r;
  u = u - /* @__PURE__ */ Jt(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (h) => {
      t.set(h), a.onUpdate && a.onUpdate(h);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: i ? void 0 : s
  };
  RA(a) || Object.assign(c, CA(e, c)), c.duration && (c.duration = /* @__PURE__ */ Jt(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Jt(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let d = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (wd(c), c.delay === 0 && (d = !0)), (xn.instantAnimations || xn.skipAnimations) && (d = !0, wd(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, d && !i && t.get() !== void 0) {
    const h = AA(c.keyframes, a);
    if (h !== void 0) {
      ie.update(() => {
        c.onUpdate(h), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new vf(c) : new wA(c);
};
function Vm(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, r) => {
    t[0][r] = n.get(), t[1][r] = n.getVelocity();
  }), t;
}
function Sf(e, t, n, r) {
  if (typeof t == "function") {
    const [s, i] = Vm(r);
    t = t(n !== void 0 ? n : e.custom, s, i);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [s, i] = Vm(r);
    t = t(n !== void 0 ? n : e.custom, s, i);
  }
  return t;
}
function Ts(e, t, n) {
  const r = e.getProps();
  return Sf(r, t, n !== void 0 ? n : r.custom, e);
}
const zx = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Zs
]), Um = 30, OA = (e) => !isNaN(parseFloat(e));
class jA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      var i;
      const s = We.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && ((i = this.events.change) == null || i.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = We.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = OA(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new lf());
    const r = this.events[t].add(n);
    return t === "change" ? () => {
      r(), ie.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, r) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = We.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Um)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Um);
    return dx(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var t, n;
    (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ws(e, t) {
  return new jA(e, t);
}
const xd = (e) => Array.isArray(e);
function NA(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Ws(n));
}
function IA(e) {
  return xd(e) ? e[e.length - 1] || 0 : e;
}
function DA(e, t) {
  const n = Ts(e, t);
  let { transitionEnd: r = {}, transition: s = {}, ...i } = n || {};
  i = { ...i, ...r };
  for (const o in i) {
    const a = IA(i[o]);
    NA(e, o, a);
  }
}
const Fe = (e) => !!(e && e.getVelocity);
function MA(e) {
  return !!(Fe(e) && e.add);
}
function bd(e, t) {
  const n = e.getValue("willChange");
  if (MA(n))
    return n.add(t);
  if (!n && xn.WillChange) {
    const r = new xn.WillChange("auto");
    e.addValue("willChange", r), r.add(t);
  }
}
function _f(e) {
  return e.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const LA = "framerAppearId", Wx = "data-" + _f(LA);
function Hx(e) {
  return e.props[Wx];
}
function $A({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, r;
}
function Kx(e, t, { delay: n = 0, transitionOverride: r, type: s } = {}) {
  let { transition: i = e.getDefaultTransition(), transitionEnd: o, ...a } = t;
  const l = i == null ? void 0 : i.reduceMotion;
  r && (i = r);
  const u = [], c = s && e.animationState && e.animationState.getState()[s];
  for (const d in a) {
    const h = e.getValue(d, e.latestValues[d] ?? null), f = a[d];
    if (f === void 0 || c && $A(c, d))
      continue;
    const g = {
      delay: n,
      ...xf(i || {}, d)
    }, y = h.get();
    if (y !== void 0 && !h.isAnimating && !Array.isArray(f) && f === y && !g.velocity)
      continue;
    let w = !1;
    if (window.MotionHandoffAnimation) {
      const v = Hx(e);
      if (v) {
        const x = window.MotionHandoffAnimation(v, d, ie);
        x !== null && (g.startTime = x, w = !0);
      }
    }
    bd(e, d);
    const p = l ?? e.shouldReduceMotion;
    h.start(bf(d, h, f, p && zx.has(d) ? { type: !1 } : g, e, w));
    const m = h.animation;
    m && u.push(m);
  }
  return o && Promise.all(u).then(() => {
    ie.update(() => {
      o && DA(e, o);
    });
  }), u;
}
function Sd(e, t, n = {}) {
  var l;
  const r = Ts(e, t, n.type === "exit" ? (l = e.presenceContext) == null ? void 0 : l.custom : void 0);
  let { transition: s = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (s = n.transitionOverride);
  const i = r ? () => Promise.all(Kx(e, r, n)) : () => Promise.resolve(), o = e.variantChildren && e.variantChildren.size ? (u = 0) => {
    const { delayChildren: c = 0, staggerChildren: d, staggerDirection: h } = s;
    return FA(e, t, u, c, d, h, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [u, c] = a === "beforeChildren" ? [i, o] : [o, i];
    return u().then(() => c());
  } else
    return Promise.all([i(), o(n.delay)]);
}
function FA(e, t, n = 0, r = 0, s = 0, i = 1, o) {
  const a = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t), a.push(Sd(l, t, {
      ...o,
      delay: n + (typeof r == "function" ? 0 : r) + Ux(e.variantChildren, l, r, s, i)
    }).then(() => l.notify("AnimationComplete", t)));
  return Promise.all(a);
}
function VA(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const s = t.map((i) => Sd(e, i, n));
    r = Promise.all(s);
  } else if (typeof t == "string")
    r = Sd(e, t, n);
  else {
    const s = typeof t == "function" ? Ts(e, t, n.custom) : t;
    r = Promise.all(Kx(e, s, n));
  }
  return r.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const UA = {
  test: (e) => e === "auto",
  parse: (e) => e
}, qx = (e) => (t) => t.test(e), Gx = [Xs, D, Xt, Cn, fP, hP, UA], Bm = (e) => Gx.find(qx(e));
function BA(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || cx(e) : !0;
}
const zA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function WA(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [r] = n.match(hf) || [];
  if (!r)
    return e;
  const s = n.replace(r, "");
  let i = zA.has(t) ? 1 : 0;
  return r !== n && (i *= 100), t + "(" + i + s + ")";
}
const HA = /\b([a-z-]*)\(.*?\)/gu, _d = {
  ...rr,
  getAnimatableNone: (e) => {
    const t = e.match(HA);
    return t ? t.map(WA).join(" ") : e;
  }
}, zm = {
  ...Xs,
  transform: Math.round
}, KA = {
  rotate: Cn,
  rotateX: Cn,
  rotateY: Cn,
  rotateZ: Cn,
  scale: sa,
  scaleX: sa,
  scaleY: sa,
  scaleZ: sa,
  skew: Cn,
  skewX: Cn,
  skewY: Cn,
  distance: D,
  translateX: D,
  translateY: D,
  translateZ: D,
  x: D,
  y: D,
  z: D,
  perspective: D,
  transformPerspective: D,
  opacity: ao,
  originX: Am,
  originY: Am,
  originZ: D
}, kf = {
  // Border props
  borderWidth: D,
  borderTopWidth: D,
  borderRightWidth: D,
  borderBottomWidth: D,
  borderLeftWidth: D,
  borderRadius: D,
  borderTopLeftRadius: D,
  borderTopRightRadius: D,
  borderBottomRightRadius: D,
  borderBottomLeftRadius: D,
  // Positioning props
  width: D,
  maxWidth: D,
  height: D,
  maxHeight: D,
  top: D,
  right: D,
  bottom: D,
  left: D,
  inset: D,
  insetBlock: D,
  insetBlockStart: D,
  insetBlockEnd: D,
  insetInline: D,
  insetInlineStart: D,
  insetInlineEnd: D,
  // Spacing props
  padding: D,
  paddingTop: D,
  paddingRight: D,
  paddingBottom: D,
  paddingLeft: D,
  paddingBlock: D,
  paddingBlockStart: D,
  paddingBlockEnd: D,
  paddingInline: D,
  paddingInlineStart: D,
  paddingInlineEnd: D,
  margin: D,
  marginTop: D,
  marginRight: D,
  marginBottom: D,
  marginLeft: D,
  marginBlock: D,
  marginBlockStart: D,
  marginBlockEnd: D,
  marginInline: D,
  marginInlineStart: D,
  marginInlineEnd: D,
  // Typography
  fontSize: D,
  // Misc
  backgroundPositionX: D,
  backgroundPositionY: D,
  ...KA,
  zIndex: zm,
  // SVG
  fillOpacity: ao,
  strokeOpacity: ao,
  numOctaves: zm
}, qA = {
  ...kf,
  // Color props
  color: we,
  backgroundColor: we,
  outlineColor: we,
  fill: we,
  stroke: we,
  // Border props
  borderColor: we,
  borderTopColor: we,
  borderRightColor: we,
  borderBottomColor: we,
  borderLeftColor: we,
  filter: _d,
  WebkitFilter: _d
}, Qx = (e) => qA[e];
function Yx(e, t) {
  let n = Qx(e);
  return n !== _d && (n = rr), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const GA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function QA(e, t, n) {
  let r = 0, s;
  for (; r < e.length && !s; ) {
    const i = e[r];
    typeof i == "string" && !GA.has(i) && lo(i).values.length && (s = e[r]), r++;
  }
  if (s && n)
    for (const i of t)
      e[i] = Yx(n, s);
}
class YA extends wf {
  constructor(t, n, r, s, i) {
    super(t, n, r, s, i, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      let d = t[c];
      if (typeof d == "string" && (d = d.trim(), df(d))) {
        const h = Bx(d, n.current);
        h !== void 0 && (t[c] = h), c === t.length - 1 && (this.finalKeyframe = d);
      }
    }
    if (this.resolveNoneKeyframes(), !zx.has(r) || t.length !== 2)
      return;
    const [s, i] = t, o = Bm(s), a = Bm(i), l = Pm(s), u = Pm(i);
    if (l !== u && Un[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (Lm(o) && Lm(a))
        for (let c = 0; c < t.length; c++) {
          const d = t[c];
          typeof d == "string" && (t[c] = parseFloat(d));
        }
      else Un[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, r = [];
    for (let s = 0; s < t.length; s++)
      (t[s] === null || BA(t[s])) && r.push(s);
    r.length && QA(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t || !t.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Un[r](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && t.getValue(r, s).jump(s, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: n, unresolvedKeyframes: r } = this;
    if (!t || !t.current)
      return;
    const s = t.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const i = r.length - 1, o = r[i];
    r[i] = Un[n](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
      t.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
function JA(e, t, n) {
  if (e == null)
    return [];
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    const s = document.querySelectorAll(e);
    return s ? Array.from(s) : [];
  }
  return Array.from(e).filter((r) => r != null);
}
const Jx = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function kd(e) {
  return ux(e) && "offsetHeight" in e;
}
const { schedule: Tf, cancel: ND } = /* @__PURE__ */ Sx(queueMicrotask, !1), Et = {
  x: !1,
  y: !1
};
function Xx() {
  return Et.x || Et.y;
}
function XA(e) {
  return e === "x" || e === "y" ? Et[e] ? null : (Et[e] = !0, () => {
    Et[e] = !1;
  }) : Et.x || Et.y ? null : (Et.x = Et.y = !0, () => {
    Et.x = Et.y = !1;
  });
}
function Zx(e, t) {
  const n = JA(e), r = new AbortController(), s = {
    passive: !0,
    ...t,
    signal: r.signal
  };
  return [n, s, () => r.abort()];
}
function Wm(e) {
  return !(e.pointerType === "touch" || Xx());
}
function ZA(e, t, n = {}) {
  const [r, s, i] = Zx(e, n), o = (a) => {
    if (!Wm(a))
      return;
    const { target: l } = a, u = t(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (d) => {
      Wm(d) && (u(d), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return r.forEach((a) => {
    a.addEventListener("pointerenter", o, s);
  }), i;
}
const eb = (e, t) => t ? e === t ? !0 : eb(e, t.parentElement) : !1, Ef = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, eR = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function tb(e) {
  return eR.has(e.tagName) || e.isContentEditable === !0;
}
const Ra = /* @__PURE__ */ new WeakSet();
function Hm(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Vu(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const tR = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const r = Hm(() => {
    if (Ra.has(n))
      return;
    Vu(n, "down");
    const s = Hm(() => {
      Vu(n, "up");
    }), i = () => Vu(n, "cancel");
    n.addEventListener("keyup", s, t), n.addEventListener("blur", i, t);
  });
  n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
function Km(e) {
  return Ef(e) && !Xx();
}
function nR(e, t, n = {}) {
  const [r, s, i] = Zx(e, n), o = (a) => {
    const l = a.currentTarget;
    if (!Km(a))
      return;
    Ra.add(l);
    const u = t(l, a), c = (f, g) => {
      window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", h), Ra.has(l) && Ra.delete(l), Km(f) && typeof u == "function" && u(f, { success: g });
    }, d = (f) => {
      c(f, l === window || l === document || n.useGlobalTarget || eb(l, f.target));
    }, h = (f) => {
      c(f, !1);
    };
    window.addEventListener("pointerup", d, s), window.addEventListener("pointercancel", h, s);
  };
  return r.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, s), kd(a) && (a.addEventListener("focus", (u) => tR(u, s)), !tb(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), i;
}
function nb(e) {
  return ux(e) && "ownerSVGElement" in e;
}
function rR(e) {
  return nb(e) && e.tagName === "svg";
}
const sR = [...Gx, we, rr], iR = (e) => sR.find(qx(e)), qm = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), fs = () => ({
  x: qm(),
  y: qm()
}), Gm = () => ({ min: 0, max: 0 }), Se = () => ({
  x: Gm(),
  y: Gm()
}), Td = { current: null }, rb = { current: !1 }, oR = typeof window < "u";
function aR() {
  if (rb.current = !0, !!oR)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => Td.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      Td.current = !1;
}
const lR = /* @__PURE__ */ new WeakMap();
function Kl(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function uo(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Cf = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Pf = ["initial", ...Cf];
function ql(e) {
  return Kl(e.animate) || Pf.some((t) => uo(e[t]));
}
function sb(e) {
  return !!(ql(e) || e.variants);
}
function uR(e, t, n) {
  for (const r in t) {
    const s = t[r], i = n[r];
    if (Fe(s))
      e.addValue(r, s);
    else if (Fe(i))
      e.addValue(r, Ws(s, { owner: e }));
    else if (i !== s)
      if (e.hasValue(r)) {
        const o = e.getValue(r);
        o.liveStyle === !0 ? o.jump(s) : o.hasAnimated || o.set(s);
      } else {
        const o = e.getStaticValue(r);
        e.addValue(r, Ws(o !== void 0 ? o : s, { owner: e }));
      }
  }
  for (const r in n)
    t[r] === void 0 && e.removeValue(r);
  return t;
}
const Qm = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let hl = {};
function ib(e) {
  hl = e;
}
function cR() {
  return hl;
}
class dR {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: r, reducedMotionConfig: s, blockInitialAnimation: i, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = wf, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const h = We.now();
      this.renderScheduledAt < h && (this.renderScheduledAt = h, ie.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = s, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = ql(n), this.isVariantNode = sb(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: c, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const h in d) {
      const f = d[h];
      l[h] !== void 0 && Fe(f) && f.set(l[h]);
    }
  }
  mount(t) {
    var n;
    this.current = t, lR.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (rb.current || aR(), this.shouldReduceMotion = Td.current), (n = this.parent) == null || n.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), nr(this.notifyUpdate), nr(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const r = this.features[n];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const r = ei.has(t);
    r && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && ie.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let i;
    typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      s(), i && i(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in hl) {
      const n = hl[t];
      if (!n)
        continue;
      const { isEnabled: r, Feature: s } = n;
      if (!this.features[t] && s && r(this.props) && (this.features[t] = new s(this)), this.features[t]) {
        const i = this.features[t];
        i.isMounted ? i.update() : (i.mount(), i.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Se();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let r = 0; r < Qm.length; r++) {
      const s = Qm[r];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const i = "on" + s, o = t[i];
      o && (this.propEventSubscriptions[s] = this.on(s, o));
    }
    this.prevMotionValues = uR(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r && (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let r = this.values.get(t);
    return r === void 0 && n !== void 0 && (r = Ws(n === null ? void 0 : n, { owner: this }), this.addValue(t, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let r = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return r != null && (typeof r == "string" && (lx(r) || cx(r)) ? r = parseFloat(r) : !iR(r) && rr.test(n) && (r = Yx(t, n)), this.setBaseTarget(t, Fe(r) ? r.get() : r)), Fe(r) ? r.get() : r;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var i;
    const { initial: n } = this.props;
    let r;
    if (typeof n == "string" || typeof n == "object") {
      const o = Sf(this.props, n, (i = this.presenceContext) == null ? void 0 : i.custom);
      o && (r = o[t]);
    }
    if (n && r !== void 0)
      return r;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !Fe(s) ? s : this.initialValues[t] !== void 0 && r === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new lf()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    Tf.render(this.render);
  }
}
class ob extends dR {
  constructor() {
    super(...arguments), this.KeyframeResolver = YA;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    const r = t.style;
    return r ? r[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Fe(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class ar {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function ab({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: r }
  };
}
function hR({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function fR(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), r = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x
  };
}
function Uu(e) {
  return e === void 0 || e === 1;
}
function Ed({ scale: e, scaleX: t, scaleY: n }) {
  return !Uu(e) || !Uu(t) || !Uu(n);
}
function pr(e) {
  return Ed(e) || lb(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function lb(e) {
  return Ym(e.x) || Ym(e.y);
}
function Ym(e) {
  return e && e !== "0%";
}
function fl(e, t, n) {
  const r = e - n, s = t * r;
  return n + s;
}
function Jm(e, t, n, r, s) {
  return s !== void 0 && (e = fl(e, s, r)), fl(e, n, r) + t;
}
function Cd(e, t = 0, n = 1, r, s) {
  e.min = Jm(e.min, t, n, r, s), e.max = Jm(e.max, t, n, r, s);
}
function ub(e, { x: t, y: n }) {
  Cd(e.x, t.translate, t.scale, t.originPoint), Cd(e.y, n.translate, n.scale, n.originPoint);
}
const Xm = 0.999999999999, Zm = 1.0000000000001;
function pR(e, t, n, r = !1) {
  const s = n.length;
  if (!s)
    return;
  t.x = t.y = 1;
  let i, o;
  for (let a = 0; a < s; a++) {
    i = n[a], o = i.projectionDelta;
    const { visualElement: l } = i.options;
    l && l.props.style && l.props.style.display === "contents" || (r && i.options.layoutScroll && i.scroll && i !== i.root && ms(e, {
      x: -i.scroll.offset.x,
      y: -i.scroll.offset.y
    }), o && (t.x *= o.x.scale, t.y *= o.y.scale, ub(e, o)), r && pr(i.latestValues) && ms(e, i.latestValues));
  }
  t.x < Zm && t.x > Xm && (t.x = 1), t.y < Zm && t.y > Xm && (t.y = 1);
}
function ps(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function eg(e, t, n, r, s = 0.5) {
  const i = de(e.min, e.max, s);
  Cd(e, t, n, i, r);
}
function ms(e, t) {
  eg(e.x, t.x, t.scaleX, t.scale, t.originX), eg(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function cb(e, t) {
  return ab(fR(e.getBoundingClientRect(), t));
}
function mR(e, t, n) {
  const r = cb(e, n), { scroll: s } = t;
  return s && (ps(r.x, s.offset.x), ps(r.y, s.offset.y)), r;
}
const gR = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, yR = Zs.length;
function vR(e, t, n) {
  let r = "", s = !0;
  for (let i = 0; i < yR; i++) {
    const o = Zs[i], a = e[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number")
      l = a === (o.startsWith("scale") ? 1 : 0);
    else {
      const u = parseFloat(a);
      l = o.startsWith("scale") ? u === 1 : u === 0;
    }
    if (!l || n) {
      const u = Jx(a, kf[o]);
      if (!l) {
        s = !1;
        const c = gR[o] || o;
        r += `${c}(${u}) `;
      }
      n && (t[o] = u);
    }
  }
  return r = r.trim(), n ? r = n(t, s ? "" : r) : s && (r = "none"), r;
}
function Af(e, t, n) {
  const { style: r, vars: s, transformOrigin: i } = e;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (ei.has(l)) {
      o = !0;
      continue;
    } else if (kx(l)) {
      s[l] = u;
      continue;
    } else {
      const c = Jx(u, kf[l]);
      l.startsWith("origin") ? (a = !0, i[l] = c) : r[l] = c;
    }
  }
  if (t.transform || (o || n ? r.transform = vR(t, e.transform, n) : r.transform && (r.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = i;
    r.transformOrigin = `${l} ${u} ${c}`;
  }
}
function db(e, { style: t, vars: n }, r, s) {
  const i = e.style;
  let o;
  for (o in t)
    i[o] = t[o];
  s == null || s.applyProjectionStyles(i, r);
  for (o in n)
    i.setProperty(o, n[o]);
}
function tg(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const pi = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (D.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = tg(e, t.target.x), r = tg(e, t.target.y);
    return `${n}% ${r}%`;
  }
}, wR = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const r = e, s = rr.parse(e);
    if (s.length > 5)
      return r;
    const i = rr.createTransformer(e), o = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    s[0 + o] /= a, s[1 + o] /= l;
    const u = de(a, l, 0.5);
    return typeof s[2 + o] == "number" && (s[2 + o] /= u), typeof s[3 + o] == "number" && (s[3 + o] /= u), i(s);
  }
}, Pd = {
  borderRadius: {
    ...pi,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: pi,
  borderTopRightRadius: pi,
  borderBottomLeftRadius: pi,
  borderBottomRightRadius: pi,
  boxShadow: wR
};
function hb(e, { layout: t, layoutId: n }) {
  return ei.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Pd[e] || e === "opacity");
}
function Rf(e, t, n) {
  var o;
  const r = e.style, s = t == null ? void 0 : t.style, i = {};
  if (!r)
    return i;
  for (const a in r)
    (Fe(r[a]) || s && Fe(s[a]) || hb(a, e) || ((o = n == null ? void 0 : n.getValue(a)) == null ? void 0 : o.liveStyle) !== void 0) && (i[a] = r[a]);
  return i;
}
function xR(e) {
  return window.getComputedStyle(e);
}
class bR extends ob {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = db;
  }
  readValueFromInstance(t, n) {
    var r;
    if (ei.has(n))
      return (r = this.projection) != null && r.isProjecting ? pd(n) : YP(t, n);
    {
      const s = xR(t), i = (kx(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return cb(t, n);
  }
  build(t, n, r) {
    Af(t, n, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Rf(t, n, r);
  }
}
const SR = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, _R = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function kR(e, t, n = 1, r = 0, s = !0) {
  e.pathLength = 1;
  const i = s ? SR : _R;
  e[i.offset] = `${-r}`, e[i.array] = `${t} ${n}`;
}
const TR = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function fb(e, {
  attrX: t,
  attrY: n,
  attrScale: r,
  pathLength: s,
  pathSpacing: i = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Af(e, a, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: d, style: h } = e;
  d.transform && (h.transform = d.transform, delete d.transform), (h.transform || d.transformOrigin) && (h.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), h.transform && (h.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete d.transformBox);
  for (const f of TR)
    d[f] !== void 0 && (h[f] = d[f], delete d[f]);
  t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), s !== void 0 && kR(d, s, i, o, !1);
}
const pb = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), mb = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function ER(e, t, n, r) {
  db(e, t, void 0, r);
  for (const s in t.attrs)
    e.setAttribute(pb.has(s) ? s : _f(s), t.attrs[s]);
}
function gb(e, t, n) {
  const r = Rf(e, t, n);
  for (const s in e)
    if (Fe(e[s]) || Fe(t[s])) {
      const i = Zs.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      r[i] = e[s];
    }
  return r;
}
class CR extends ob {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Se;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (ei.has(n)) {
      const r = Qx(n);
      return r && r.default || 0;
    }
    return n = pb.has(n) ? n : _f(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return gb(t, n, r);
  }
  build(t, n, r) {
    fb(t, n, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(t, n, r, s) {
    ER(t, n, r, s);
  }
  mount(t) {
    this.isSVGTag = mb(t.tagName), super.mount(t);
  }
}
const PR = Pf.length;
function yb(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? yb(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < PR; n++) {
    const r = Pf[n], s = e.props[r];
    (uo(s) || s === !1) && (t[r] = s);
  }
  return t;
}
function vb(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
const AR = [...Cf].reverse(), RR = Cf.length;
function OR(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => VA(e, n, r)));
}
function jR(e) {
  let t = OR(e), n = ng(), r = !0;
  const s = (l) => (u, c) => {
    var h;
    const d = Ts(e, c, l === "exit" ? (h = e.presenceContext) == null ? void 0 : h.custom : void 0);
    if (d) {
      const { transition: f, transitionEnd: g, ...y } = d;
      u = { ...u, ...y, ...g };
    }
    return u;
  };
  function i(l) {
    t = l(e);
  }
  function o(l) {
    const { props: u } = e, c = yb(e.parent) || {}, d = [], h = /* @__PURE__ */ new Set();
    let f = {}, g = 1 / 0;
    for (let w = 0; w < RR; w++) {
      const p = AR[w], m = n[p], v = u[p] !== void 0 ? u[p] : c[p], x = uo(v), S = p === l ? m.isActive : null;
      S === !1 && (g = w);
      let k = v === c[p] && v !== u[p] && x;
      if (k && r && e.manuallyAnimateOnMount && (k = !1), m.protectedKeys = { ...f }, // If it isn't active and hasn't *just* been set as inactive
      !m.isActive && S === null || // If we didn't and don't have any defined prop for this animation type
      !v && !m.prevProp || // Or if the prop doesn't define an animation
      Kl(v) || typeof v == "boolean")
        continue;
      const T = NR(m.prevProp, v);
      let E = T || // If we're making this variant active, we want to always make it active
      p === l && m.isActive && !k && x || // If we removed a higher-priority variant (i is in reverse order)
      w > g && x, A = !1;
      const R = Array.isArray(v) ? v : [v];
      let F = R.reduce(s(p), {});
      S === !1 && (F = {});
      const { prevResolvedValues: L = {} } = m, q = {
        ...L,
        ...F
      }, N = (V) => {
        E = !0, h.has(V) && (A = !0, h.delete(V)), m.needsAnimating[V] = !0;
        const C = e.getValue(V);
        C && (C.liveStyle = !1);
      };
      for (const V in q) {
        const C = F[V], j = L[V];
        if (f.hasOwnProperty(V))
          continue;
        let M = !1;
        xd(C) && xd(j) ? M = !vb(C, j) : M = C !== j, M ? C != null ? N(V) : h.add(V) : C !== void 0 && h.has(V) ? N(V) : m.protectedKeys[V] = !0;
      }
      m.prevProp = v, m.prevResolvedValues = F, m.isActive && (f = { ...f, ...F }), r && e.blockInitialAnimation && (E = !1);
      const Q = k && T;
      E && (!Q || A) && d.push(...R.map((V) => {
        const C = { type: p };
        if (typeof V == "string" && r && !Q && e.manuallyAnimateOnMount && e.parent) {
          const { parent: j } = e, M = Ts(j, V);
          if (j.enteringChildren && M) {
            const { delayChildren: H } = M.transition || {};
            C.delay = Ux(j.enteringChildren, e, H);
          }
        }
        return {
          animation: V,
          options: C
        };
      }));
    }
    if (h.size) {
      const w = {};
      if (typeof u.initial != "boolean") {
        const p = Ts(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        p && p.transition && (w.transition = p.transition);
      }
      h.forEach((p) => {
        const m = e.getBaseTarget(p), v = e.getValue(p);
        v && (v.liveStyle = !0), w[p] = m ?? null;
      }), d.push({ animation: w });
    }
    let y = !!d.length;
    return r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (y = !1), r = !1, y ? t(d) : Promise.resolve();
  }
  function a(l, u) {
    var d;
    if (n[l].isActive === u)
      return Promise.resolve();
    (d = e.variantChildren) == null || d.forEach((h) => {
      var f;
      return (f = h.animationState) == null ? void 0 : f.setActive(l, u);
    }), n[l].isActive = u;
    const c = o(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: i,
    getState: () => n,
    reset: () => {
      n = ng();
    }
  };
}
function NR(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !vb(t, e) : !1;
}
function ur(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function ng() {
  return {
    animate: ur(!0),
    whileInView: ur(),
    whileHover: ur(),
    whileTap: ur(),
    whileDrag: ur(),
    whileFocus: ur(),
    exit: ur()
  };
}
function rg(e, t) {
  e.min = t.min, e.max = t.max;
}
function kt(e, t) {
  rg(e.x, t.x), rg(e.y, t.y);
}
function sg(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
const wb = 1e-4, IR = 1 - wb, DR = 1 + wb, xb = 0.01, MR = 0 - xb, LR = 0 + xb;
function He(e) {
  return e.max - e.min;
}
function $R(e, t, n) {
  return Math.abs(e - t) <= n;
}
function ig(e, t, n, r = 0.5) {
  e.origin = r, e.originPoint = de(t.min, t.max, e.origin), e.scale = He(n) / He(t), e.translate = de(n.min, n.max, e.origin) - e.originPoint, (e.scale >= IR && e.scale <= DR || isNaN(e.scale)) && (e.scale = 1), (e.translate >= MR && e.translate <= LR || isNaN(e.translate)) && (e.translate = 0);
}
function Di(e, t, n, r) {
  ig(e.x, t.x, n.x, r ? r.originX : void 0), ig(e.y, t.y, n.y, r ? r.originY : void 0);
}
function og(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + He(t);
}
function FR(e, t, n) {
  og(e.x, t.x, n.x), og(e.y, t.y, n.y);
}
function ag(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + He(t);
}
function pl(e, t, n) {
  ag(e.x, t.x, n.x), ag(e.y, t.y, n.y);
}
function lg(e, t, n, r, s) {
  return e -= t, e = fl(e, 1 / n, r), s !== void 0 && (e = fl(e, 1 / s, r)), e;
}
function VR(e, t = 0, n = 1, r = 0.5, s, i = e, o = e) {
  if (Xt.test(t) && (t = parseFloat(t), t = de(o.min, o.max, t / 100) - o.min), typeof t != "number")
    return;
  let a = de(i.min, i.max, r);
  e === i && (a -= t), e.min = lg(e.min, t, n, a, s), e.max = lg(e.max, t, n, a, s);
}
function ug(e, t, [n, r, s], i, o) {
  VR(e, t[n], t[r], t[s], t.scale, i, o);
}
const UR = ["x", "scaleX", "originX"], BR = ["y", "scaleY", "originY"];
function cg(e, t, n, r) {
  ug(e.x, t, UR, n ? n.x : void 0, r ? r.x : void 0), ug(e.y, t, BR, n ? n.y : void 0, r ? r.y : void 0);
}
function dg(e) {
  return e.translate === 0 && e.scale === 1;
}
function bb(e) {
  return dg(e.x) && dg(e.y);
}
function hg(e, t) {
  return e.min === t.min && e.max === t.max;
}
function zR(e, t) {
  return hg(e.x, t.x) && hg(e.y, t.y);
}
function fg(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Sb(e, t) {
  return fg(e.x, t.x) && fg(e.y, t.y);
}
function pg(e) {
  return He(e.x) / He(e.y);
}
function mg(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
function ht(e) {
  return [e("x"), e("y")];
}
function WR(e, t, n) {
  let r = "";
  const s = e.x.translate / t.x, i = e.y.translate / t.y, o = (n == null ? void 0 : n.z) || 0;
  if ((s || i || o) && (r = `translate3d(${s}px, ${i}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: d, rotateY: h, skewX: f, skewY: g } = n;
    u && (r = `perspective(${u}px) ${r}`), c && (r += `rotate(${c}deg) `), d && (r += `rotateX(${d}deg) `), h && (r += `rotateY(${h}deg) `), f && (r += `skewX(${f}deg) `), g && (r += `skewY(${g}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none";
}
const _b = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], HR = _b.length, gg = (e) => typeof e == "string" ? parseFloat(e) : e, yg = (e) => typeof e == "number" || D.test(e);
function KR(e, t, n, r, s, i) {
  s ? (e.opacity = de(0, n.opacity ?? 1, qR(r)), e.opacityExit = de(t.opacity ?? 1, 0, GR(r))) : i && (e.opacity = de(t.opacity ?? 1, n.opacity ?? 1, r));
  for (let o = 0; o < HR; o++) {
    const a = `border${_b[o]}Radius`;
    let l = vg(t, a), u = vg(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || yg(l) === yg(u) ? (e[a] = Math.max(de(gg(l), gg(u), r), 0), (Xt.test(u) || Xt.test(l)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = de(t.rotate || 0, n.rotate || 0, r));
}
function vg(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const qR = /* @__PURE__ */ kb(0, 0.5, vx), GR = /* @__PURE__ */ kb(0.5, 0.95, wt);
function kb(e, t, n) {
  return (r) => r < e ? 0 : r > t ? 1 : n(/* @__PURE__ */ oo(e, t, r));
}
function QR(e, t, n) {
  const r = Fe(e) ? e : Ws(e);
  return r.start(bf("", r, t, n)), r.animation;
}
function co(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const YR = (e, t) => e.depth - t.depth;
class JR {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    sf(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    of(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(YR), this.isDirty = !1, this.children.forEach(t);
  }
}
function XR(e, t) {
  const n = We.now(), r = ({ timestamp: s }) => {
    const i = s - n;
    i >= t && (nr(r), e(i - t));
  };
  return ie.setup(r, !0), () => nr(r);
}
function Oa(e) {
  return Fe(e) ? e.get() : e;
}
class ZR {
  constructor() {
    this.members = [];
  }
  add(t) {
    sf(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (of(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((s) => t === s);
    if (n === 0)
      return !1;
    let r;
    for (let s = n; s >= 0; s--) {
      const i = this.members[s];
      if (i.isPresent !== !1) {
        r = i;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
      r.instance && r.scheduleRender(), t.scheduleRender();
      const s = r.options.layoutDependency, i = t.options.layoutDependency;
      s !== void 0 && i !== void 0 && s === i || (t.resumeFrom = r, n && (t.resumeFrom.preserveOpacity = !0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
      const { crossfade: a } = t.options;
      a === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const ja = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Bu = ["", "X", "Y", "Z"], eO = 1e3;
let tO = 0;
function zu(e, t, n, r) {
  const { latestValues: s } = t;
  s[e] && (n[e] = s[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
function Tb(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = Hx(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: i } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", ie, !(s || i));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && Tb(r);
}
function Eb({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: s }) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      this.id = tO++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(sO), this.nodes.forEach(lO), this.nodes.forEach(uO), this.nodes.forEach(iO);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new JR());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new lf()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o) {
      if (this.instance)
        return;
      this.isSVG = nb(o) && !rR(o), this.instance = o;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
        let c, d = 0;
        const h = () => this.root.updateBlockedByResize = !1;
        ie.read(() => {
          d = window.innerWidth;
        }), e(o, () => {
          const f = window.innerWidth;
          f !== d && (d = f, this.root.updateBlockedByResize = !0, c && c(), c = XR(h, 250), ja.hasAnimatedSinceResize && (ja.hasAnimatedSinceResize = !1, this.nodes.forEach(bg)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: d, hasRelativeLayoutChanged: h, layout: f }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const g = this.options.transition || u.getDefaultTransition() || pO, { onLayoutAnimationStart: y, onLayoutAnimationComplete: w } = u.getProps(), p = !this.targetLayout || !Sb(this.targetLayout, f), m = !d && h;
        if (this.options.layoutRoot || this.resumeFrom || m || d && (p || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const v = {
            ...xf(g, "layout"),
            onPlay: y,
            onComplete: w
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (v.delay = 0, v.type = !1), this.startAnimation(v), this.setAnimationOrigin(c, m);
        } else
          d || bg(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = f;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), nr(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(cO), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Tb(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        d.shouldResetTransform = !0, d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(wg);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(xg);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(aO), this.nodes.forEach(nO), this.nodes.forEach(rO)) : this.nodes.forEach(xg), this.clearAllSnapshots();
      const a = We.now();
      Oe.delta = en(0, 1e3 / 60, a - Oe.timestamp), Oe.timestamp = a, Oe.isProcessing = !0, Iu.update.process(Oe), Iu.preRender.process(Oe), Iu.render.process(Oe), Oe.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Tf.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(oO), this.sharedNodes.forEach(dO);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, ie.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      ie.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !He(this.snapshot.measuredBox.x) && !He(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = Se(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
        const l = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !bb(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && this.instance && (a || pr(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), mO(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var u;
      const { visualElement: o } = this.options;
      if (!o)
        return Se();
      const a = o.measureViewportBox();
      if (!(((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(gO))) {
        const { scroll: c } = this.root;
        c && (ps(a.x, c.offset.x), ps(a.y, c.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      var l;
      const a = Se();
      if (kt(a, o), (l = this.scroll) != null && l.wasRoot)
        return a;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u], { scroll: d, options: h } = c;
        c !== this.root && d && h.layoutScroll && (d.wasRoot && kt(a, o), ps(a.x, d.offset.x), ps(a.y, d.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = Se();
      kt(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && ms(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), pr(c.latestValues) && ms(l, c.latestValues);
      }
      return pr(this.latestValues) && ms(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = Se();
      kt(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !pr(u.latestValues))
          continue;
        Ed(u.latestValues) && u.updateSnapshot();
        const c = Se(), d = u.measurePageBox();
        kt(c, d), cg(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return pr(this.latestValues) && cg(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Oe.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var f;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || (f = this.parent) != null && f.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: d } = this.options;
      if (!this.layout || !(c || d))
        return;
      this.resolvedRelativeTargetAt = Oe.timestamp;
      const h = this.getClosestProjectingParent();
      h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (h && h.layout ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Se(), this.targetWithTransforms = Se()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), FR(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : kt(this.target, this.layout.layoutBox), ub(this.target, this.targetDelta)) : kt(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? this.createRelativeTarget(h, this.target, h.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ed(this.parent.latestValues) || lb(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(o, a, l) {
      this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Se(), this.relativeTargetOrigin = Se(), pl(this.relativeTargetOrigin, a, l), kt(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var g;
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let l = !0;
      if ((this.isProjectionDirty || (g = this.parent) != null && g.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === Oe.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      kt(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x, h = this.treeScale.y;
      pR(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = Se());
      const { target: f } = o;
      if (!f) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (sg(this.prevProjectionDelta.x, this.projectionDelta.x), sg(this.prevProjectionDelta.y, this.projectionDelta.y)), Di(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== d || this.treeScale.y !== h || !mg(this.projectionDelta.x, this.prevProjectionDelta.x) || !mg(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      var a;
      if ((a = this.options.visualElement) == null || a.scheduleRender(), o) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = fs(), this.projectionDelta = fs(), this.projectionDeltaWithTransform = fs();
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, d = fs();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const h = Se(), f = l ? l.source : void 0, g = this.layout ? this.layout.source : void 0, y = f !== g, w = this.getStack(), p = !w || w.members.length <= 1, m = !!(y && !p && this.options.crossfade === !0 && !this.path.some(fO));
      this.animationProgress = 0;
      let v;
      this.mixTargetDelta = (x) => {
        const S = x / 1e3;
        Sg(d.x, o.x, S), Sg(d.y, o.y, S), this.setTargetDelta(d), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (pl(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox), hO(this.relativeTarget, this.relativeTargetOrigin, h, S), v && zR(this.relativeTarget, v) && (this.isProjectionDirty = !1), v || (v = Se()), kt(v, this.relativeTarget)), y && (this.animationValues = c, KR(c, u, this.latestValues, S, m, p)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = S;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      var a, l, u;
      this.notifyListeners("animationStart"), (a = this.currentAnimation) == null || a.stop(), (u = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) == null || u.stop(), this.pendingAnimation && (nr(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = ie.update(() => {
        ja.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ws(0)), this.currentAnimation = QR(this.motionValue, [0, 1e3], {
          ...o,
          velocity: 0,
          isSync: !0,
          onUpdate: (c) => {
            this.mixTargetDelta(c), o.onUpdate && o.onUpdate(c);
          },
          onStop: () => {
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(eO), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && Cb(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || Se();
          const d = He(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + d;
          const h = He(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + h;
        }
        kt(a, l), ms(a, c), Di(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new ZR()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var a;
      const { layoutId: o } = this.options;
      return o ? ((a = this.getStack()) == null ? void 0 : a.lead) || this : this;
    }
    getPrevLead() {
      var a;
      const { layoutId: o } = this.options;
      return o ? (a = this.getStack()) == null ? void 0 : a.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && zu("z", o, u, this.animationValues);
      for (let c = 0; c < Bu.length; c++)
        zu(`rotate${Bu[c]}`, o, u, this.animationValues), zu(`skew${Bu[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = Oa(a == null ? void 0 : a.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = Oa(a == null ? void 0 : a.pointerEvents) || ""), this.hasProjected && !pr(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      o.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let d = WR(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (d = l(c, d)), o.transform = d;
      const { x: h, y: f } = this.projectionDelta;
      o.transformOrigin = `${h.origin * 100}% ${f.origin * 100}% 0`, u.animationValues ? o.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : o.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const g in Pd) {
        if (c[g] === void 0)
          continue;
        const { correct: y, applyTo: w, isCSSVariable: p } = Pd[g], m = d === "none" ? c[g] : y(c[g], u);
        if (w) {
          const v = w.length;
          for (let x = 0; x < v; x++)
            o[w[x]] = m;
        } else
          p ? this.options.visualElement.renderState.vars[g] = m : o[g] = m;
      }
      this.options.layoutId && (o.pointerEvents = u === this ? Oa(a == null ? void 0 : a.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) == null ? void 0 : a.stop();
      }), this.root.nodes.forEach(wg), this.root.sharedNodes.clear();
    }
  };
}
function nO(e) {
  e.updateLayout();
}
function rO(e) {
  var n;
  const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: s } = e.layout, { animationType: i } = e.options, o = t.source !== e.layout.source;
    i === "size" ? ht((d) => {
      const h = o ? t.measuredBox[d] : t.layoutBox[d], f = He(h);
      h.min = r[d].min, h.max = h.min + f;
    }) : Cb(i, t.layoutBox, r) && ht((d) => {
      const h = o ? t.measuredBox[d] : t.layoutBox[d], f = He(r[d]);
      h.max = h.min + f, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[d].max = e.relativeTarget[d].min + f);
    });
    const a = fs();
    Di(a, r, t.layoutBox);
    const l = fs();
    o ? Di(l, e.applyTransform(s, !0), t.measuredBox) : Di(l, r, t.layoutBox);
    const u = !bb(a);
    let c = !1;
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: h, layout: f } = d;
        if (h && f) {
          const g = Se();
          pl(g, t.layoutBox, h.layoutBox);
          const y = Se();
          pl(y, r, f.layoutBox), Sb(g, y) || (c = !0), d.options.layoutRoot && (e.relativeTarget = y, e.relativeTargetOrigin = g, e.relativeParent = d);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: t,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function sO(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function iO(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function oO(e) {
  e.clearSnapshot();
}
function wg(e) {
  e.clearMeasurements();
}
function xg(e) {
  e.isLayoutDirty = !1;
}
function aO(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function bg(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function lO(e) {
  e.resolveTargetDelta();
}
function uO(e) {
  e.calcProjection();
}
function cO(e) {
  e.resetSkewAndRotation();
}
function dO(e) {
  e.removeLeadSnapshot();
}
function Sg(e, t, n) {
  e.translate = de(t.translate, 0, n), e.scale = de(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function _g(e, t, n, r) {
  e.min = de(t.min, n.min, r), e.max = de(t.max, n.max, r);
}
function hO(e, t, n, r) {
  _g(e.x, t.x, n.x, r), _g(e.y, t.y, n.y, r);
}
function fO(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const pO = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, kg = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Tg = kg("applewebkit/") && !kg("chrome/") ? Math.round : wt;
function Eg(e) {
  e.min = Tg(e.min), e.max = Tg(e.max);
}
function mO(e) {
  Eg(e.x), Eg(e.y);
}
function Cb(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !$R(pg(t), pg(n), 0.2);
}
function gO(e) {
  var t;
  return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot);
}
const yO = Eb({
  attachResizeListener: (e, t) => co(e, "resize", t),
  measureScroll: () => {
    var e, t;
    return {
      x: document.documentElement.scrollLeft || ((e = document.body) == null ? void 0 : e.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((t = document.body) == null ? void 0 : t.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), Wu = {
  current: void 0
}, Pb = Eb({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!Wu.current) {
      const e = new yO({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), Wu.current = e;
    }
    return Wu.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), Of = b.createContext({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function Cg(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function vO(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((s) => {
      const i = Cg(s, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let s = 0; s < r.length; s++) {
          const i = r[s];
          typeof i == "function" ? i() : Cg(e[s], null);
        }
      };
  };
}
function wO(...e) {
  return b.useCallback(vO(...e), e);
}
class xO extends b.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = n.offsetParent, s = kd(r) && r.offsetWidth || 0, i = kd(r) && r.offsetHeight || 0, o = this.props.sizeRef.current;
      o.height = n.offsetHeight || 0, o.width = n.offsetWidth || 0, o.top = n.offsetTop, o.left = n.offsetLeft, o.right = s - o.width - o.left, o.bottom = i - o.height - o.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function bO({ children: e, isPresent: t, anchorX: n, anchorY: r, root: s }) {
  var d;
  const i = b.useId(), o = b.useRef(null), a = b.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: l } = b.useContext(Of), u = ((d = e.props) == null ? void 0 : d.ref) ?? (e == null ? void 0 : e.ref), c = wO(o, u);
  return b.useInsertionEffect(() => {
    const { width: h, height: f, top: g, left: y, right: w, bottom: p } = a.current;
    if (t || !o.current || !h || !f)
      return;
    const m = n === "left" ? `left: ${y}` : `right: ${w}`, v = r === "bottom" ? `bottom: ${p}` : `top: ${g}`;
    o.current.dataset.motionPopId = i;
    const x = document.createElement("style");
    l && (x.nonce = l);
    const S = s ?? document.head;
    return S.appendChild(x), x.sheet && x.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${h}px !important;
            height: ${f}px !important;
            ${m}px !important;
            ${v}px !important;
          }
        `), () => {
      S.contains(x) && S.removeChild(x);
    };
  }, [t]), _.jsx(xO, { isPresent: t, childRef: o, sizeRef: a, children: b.cloneElement(e, { ref: c }) });
}
const SO = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: s, presenceAffectsLayout: i, mode: o, anchorX: a, anchorY: l, root: u }) => {
  const c = rf(_O), d = b.useId();
  let h = !0, f = b.useMemo(() => (h = !1, {
    id: d,
    initial: t,
    isPresent: n,
    custom: s,
    onExitComplete: (g) => {
      c.set(g, !0);
      for (const y of c.values())
        if (!y)
          return;
      r && r();
    },
    register: (g) => (c.set(g, !1), () => c.delete(g))
  }), [n, c, r]);
  return i && h && (f = { ...f }), b.useMemo(() => {
    c.forEach((g, y) => c.set(y, !1));
  }, [n]), b.useEffect(() => {
    !n && !c.size && r && r();
  }, [n]), o === "popLayout" && (e = _.jsx(bO, { isPresent: n, anchorX: a, anchorY: l, root: u, children: e })), _.jsx(Hl.Provider, { value: f, children: e });
};
function _O() {
  return /* @__PURE__ */ new Map();
}
function Ab(e = !0) {
  const t = b.useContext(Hl);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: r, register: s } = t, i = b.useId();
  b.useEffect(() => {
    if (e)
      return s(i);
  }, [e]);
  const o = b.useCallback(() => e && r && r(i), [i, r, e]);
  return !n && r ? [!1, o] : [!0];
}
const ia = (e) => e.key || "";
function Pg(e) {
  const t = [];
  return b.Children.forEach(e, (n) => {
    b.isValidElement(n) && t.push(n);
  }), t;
}
const Rb = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, presenceAffectsLayout: s = !0, mode: i = "sync", propagate: o = !1, anchorX: a = "left", anchorY: l = "top", root: u }) => {
  const [c, d] = Ab(o), h = b.useMemo(() => Pg(e), [e]), f = o && !c ? [] : h.map(ia), g = b.useRef(!0), y = b.useRef(h), w = rf(() => /* @__PURE__ */ new Map()), p = b.useRef(/* @__PURE__ */ new Set()), [m, v] = b.useState(h), [x, S] = b.useState(h);
  ax(() => {
    g.current = !1, y.current = h;
    for (let E = 0; E < x.length; E++) {
      const A = ia(x[E]);
      f.includes(A) ? (w.delete(A), p.current.delete(A)) : w.get(A) !== !0 && w.set(A, !1);
    }
  }, [x, f.length, f.join("-")]);
  const k = [];
  if (h !== m) {
    let E = [...h];
    for (let A = 0; A < x.length; A++) {
      const R = x[A], F = ia(R);
      f.includes(F) || (E.splice(A, 0, R), k.push(R));
    }
    return i === "wait" && k.length && (E = k), S(Pg(E)), v(h), null;
  }
  const { forceRender: T } = b.useContext(nf);
  return _.jsx(_.Fragment, { children: x.map((E) => {
    const A = ia(E), R = o && !c ? !1 : h === x || f.includes(A), F = () => {
      if (p.current.has(A))
        return;
      if (p.current.add(A), w.has(A))
        w.set(A, !0);
      else
        return;
      let L = !0;
      w.forEach((q) => {
        q || (L = !1);
      }), L && (T == null || T(), S(y.current), o && (d == null || d()), r && r());
    };
    return _.jsx(SO, { isPresent: R, initial: !g.current || n ? void 0 : !1, custom: t, presenceAffectsLayout: s, mode: i, root: u, onExitComplete: R ? void 0 : F, anchorX: a, anchorY: l, children: E }, A);
  }) });
}, Ob = b.createContext({ strict: !1 }), Ag = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Rg = !1;
function kO() {
  if (Rg)
    return;
  const e = {};
  for (const t in Ag)
    e[t] = {
      isEnabled: (n) => Ag[t].some((r) => !!n[r])
    };
  ib(e), Rg = !0;
}
function jb() {
  return kO(), cR();
}
function TO(e) {
  const t = jb();
  for (const n in e)
    t[n] = {
      ...t[n],
      ...e[n]
    };
  ib(t);
}
const EO = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function ml(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || EO.has(e);
}
let Nb = (e) => !ml(e);
function CO(e) {
  typeof e == "function" && (Nb = (t) => t.startsWith("on") ? !ml(t) : e(t));
}
try {
  CO(require("@emotion/is-prop-valid").default);
} catch {
}
function PO(e, t, n) {
  const r = {};
  for (const s in e)
    s === "values" && typeof e.values == "object" || (Nb(s) || n === !0 && ml(s) || !t && !ml(s) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && s.startsWith("onDrag")) && (r[s] = e[s]);
  return r;
}
const Gl = /* @__PURE__ */ b.createContext({});
function AO(e, t) {
  if (ql(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || uo(n) ? n : void 0,
      animate: uo(r) ? r : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function RO(e) {
  const { initial: t, animate: n } = AO(e, b.useContext(Gl));
  return b.useMemo(() => ({ initial: t, animate: n }), [Og(t), Og(n)]);
}
function Og(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const jf = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Ib(e, t, n) {
  for (const r in t)
    !Fe(t[r]) && !hb(r, n) && (e[r] = t[r]);
}
function OO({ transformTemplate: e }, t) {
  return b.useMemo(() => {
    const n = jf();
    return Af(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function jO(e, t) {
  const n = e.style || {}, r = {};
  return Ib(r, n, e), Object.assign(r, OO(e, t)), r;
}
function NO(e, t) {
  const n = {}, r = jO(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n;
}
const Db = () => ({
  ...jf(),
  attrs: {}
});
function IO(e, t, n, r) {
  const s = b.useMemo(() => {
    const i = Db();
    return fb(i, t, mb(r), e.transformTemplate, e.style), {
      ...i.attrs,
      style: { ...i.style }
    };
  }, [t]);
  if (e.style) {
    const i = {};
    Ib(i, e.style, e), s.style = { ...i, ...s.style };
  }
  return s;
}
const DO = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Nf(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(DO.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function MO(e, t, n, { latestValues: r }, s, i = !1, o) {
  const l = (o ?? Nf(e) ? IO : NO)(t, r, s, e), u = PO(t, typeof e == "string", i), c = e !== b.Fragment ? { ...u, ...l, ref: n } : {}, { children: d } = t, h = b.useMemo(() => Fe(d) ? d.get() : d, [d]);
  return b.createElement(e, {
    ...c,
    children: h
  });
}
function LO({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, s) {
  return {
    latestValues: $O(n, r, s, e),
    renderState: t()
  };
}
function $O(e, t, n, r) {
  const s = {}, i = r(e, {});
  for (const h in i)
    s[h] = Oa(i[h]);
  let { initial: o, animate: a } = e;
  const l = ql(e), u = sb(e);
  t && u && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const d = c ? a : o;
  if (d && typeof d != "boolean" && !Kl(d)) {
    const h = Array.isArray(d) ? d : [d];
    for (let f = 0; f < h.length; f++) {
      const g = Sf(e, h[f]);
      if (g) {
        const { transitionEnd: y, transition: w, ...p } = g;
        for (const m in p) {
          let v = p[m];
          if (Array.isArray(v)) {
            const x = c ? v.length - 1 : 0;
            v = v[x];
          }
          v !== null && (s[m] = v);
        }
        for (const m in y)
          s[m] = y[m];
      }
    }
  }
  return s;
}
const Mb = (e) => (t, n) => {
  const r = b.useContext(Gl), s = b.useContext(Hl), i = () => LO(e, t, r, s);
  return n ? i() : rf(i);
}, FO = /* @__PURE__ */ Mb({
  scrapeMotionValuesFromProps: Rf,
  createRenderState: jf
}), VO = /* @__PURE__ */ Mb({
  scrapeMotionValuesFromProps: gb,
  createRenderState: Db
}), UO = Symbol.for("motionComponentSymbol");
function BO(e, t, n) {
  const r = b.useRef(n);
  b.useInsertionEffect(() => {
    r.current = n;
  });
  const s = b.useRef(null);
  return b.useCallback((i) => {
    var a;
    i && ((a = e.onMount) == null || a.call(e, i)), t && (i ? t.mount(i) : t.unmount());
    const o = r.current;
    if (typeof o == "function")
      if (i) {
        const l = o(i);
        typeof l == "function" && (s.current = l);
      } else s.current ? (s.current(), s.current = null) : o(i);
    else o && (o.current = i);
  }, [t]);
}
const Lb = b.createContext({});
function bi(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function zO(e, t, n, r, s, i) {
  var p, m;
  const { visualElement: o } = b.useContext(Gl), a = b.useContext(Ob), l = b.useContext(Hl), u = b.useContext(Of).reducedMotion, c = b.useRef(null), d = b.useRef(!1);
  r = r || a.renderer, !c.current && r && (c.current = r(e, {
    visualState: t,
    parent: o,
    props: n,
    presenceContext: l,
    blockInitialAnimation: l ? l.initial === !1 : !1,
    reducedMotionConfig: u,
    isSVG: i
  }), d.current && c.current && (c.current.manuallyAnimateOnMount = !0));
  const h = c.current, f = b.useContext(Lb);
  h && !h.projection && s && (h.type === "html" || h.type === "svg") && WO(c.current, n, s, f);
  const g = b.useRef(!1);
  b.useInsertionEffect(() => {
    h && g.current && h.update(n, l);
  });
  const y = n[Wx], w = b.useRef(!!y && !((p = window.MotionHandoffIsComplete) != null && p.call(window, y)) && ((m = window.MotionHasOptimisedAnimation) == null ? void 0 : m.call(window, y)));
  return ax(() => {
    d.current = !0, h && (g.current = !0, window.MotionIsMounted = !0, h.updateFeatures(), h.scheduleRenderMicrotask(), w.current && h.animationState && h.animationState.animateChanges());
  }), b.useEffect(() => {
    h && (!w.current && h.animationState && h.animationState.animateChanges(), w.current && (queueMicrotask(() => {
      var v;
      (v = window.MotionHandoffMarkAsComplete) == null || v.call(window, y);
    }), w.current = !1), h.enteringChildren = void 0);
  }), h;
}
function WO(e, t, n, r) {
  const { layoutId: s, layout: i, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : $b(e.parent)), e.projection.setOptions({
    layoutId: s,
    layout: i,
    alwaysMeasureLayout: !!o || a && bi(a),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof i == "string" ? i : "both",
    initialPromotionConfig: r,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function $b(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : $b(e.parent);
}
function Hu(e, { forwardMotionProps: t = !1, type: n } = {}, r, s) {
  r && TO(r);
  const i = n ? n === "svg" : Nf(e), o = i ? VO : FO;
  function a(u, c) {
    let d;
    const h = {
      ...b.useContext(Of),
      ...u,
      layoutId: HO(u)
    }, { isStatic: f } = h, g = RO(u), y = o(u, f);
    if (!f && ox) {
      KO();
      const w = qO(h);
      d = w.MeasureLayout, g.visualElement = zO(e, y, h, s, w.ProjectionNode, i);
    }
    return _.jsxs(Gl.Provider, { value: g, children: [d && g.visualElement ? _.jsx(d, { visualElement: g.visualElement, ...h }) : null, MO(e, u, BO(y, g.visualElement, c), y, f, t, i)] });
  }
  a.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const l = b.forwardRef(a);
  return l[UO] = e, l;
}
function HO({ layoutId: e }) {
  const t = b.useContext(nf).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function KO(e, t) {
  b.useContext(Ob).strict;
}
function qO(e) {
  const t = jb(), { drag: n, layout: r } = t;
  if (!n && !r)
    return {};
  const s = { ...n, ...r };
  return {
    MeasureLayout: n != null && n.isEnabled(e) || r != null && r.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function GO(e, t) {
  if (typeof Proxy > "u")
    return Hu;
  const n = /* @__PURE__ */ new Map(), r = (i, o) => Hu(i, o, e, t), s = (i, o) => r(i, o);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (i, o) => o === "create" ? r : (n.has(o) || n.set(o, Hu(o, void 0, e, t)), n.get(o))
  });
}
const QO = (e, t) => t.isSVG ?? Nf(e) ? new CR(t) : new bR(t, {
  allowProjection: e !== b.Fragment
});
class YO extends ar {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = jR(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Kl(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(), (t = this.unmountControls) == null || t.call(this);
  }
}
let JO = 0;
class XO extends ar {
  constructor() {
    super(...arguments), this.id = JO++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r)
      return;
    const s = this.node.animationState.setActive("exit", !t);
    n && !t && s.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const ZO = {
  animation: {
    Feature: YO
  },
  exit: {
    Feature: XO
  }
};
function jo(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const ej = (e) => (t) => Ef(t) && e(t, jo(t));
function Mi(e, t, n, r) {
  return co(e, t, ej(n), r);
}
const Fb = ({ current: e }) => e ? e.ownerDocument.defaultView : null, jg = (e, t) => Math.abs(e - t);
function tj(e, t) {
  const n = jg(e.x, t.x), r = jg(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
const Ng = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Vb {
  constructor(t, n, { transformPagePoint: r, contextWindow: s = window, dragSnapToOrigin: i = !1, distanceThreshold: o = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (f) => {
      this.handleScroll(f.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = qu(this.lastMoveEventInfo, this.history), g = this.startEvent !== null, y = tj(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!g && !y)
        return;
      const { point: w } = f, { timestamp: p } = Oe;
      this.history.push({ ...w, timestamp: p });
      const { onStart: m, onMove: v } = this.handlers;
      g || (m && m(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), v && v(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, g) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Ku(g, this.transformPagePoint), ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, g) => {
      this.end();
      const { onEnd: y, onSessionEnd: w, resumeAnimation: p } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && p && p(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const m = qu(f.type === "pointercancel" ? this.lastMoveEventInfo : Ku(g, this.transformPagePoint), this.history);
      this.startEvent && y && y(f, m), w && w(f, m);
    }, !Ef(t))
      return;
    this.dragSnapToOrigin = i, this.handlers = n, this.transformPagePoint = r, this.distanceThreshold = o, this.contextWindow = s || window;
    const l = jo(t), u = Ku(l, this.transformPagePoint), { point: c } = u, { timestamp: d } = Oe;
    this.history = [{ ...c, timestamp: d }];
    const { onSessionStart: h } = n;
    h && h(t, qu(u, this.history)), this.removeListeners = Ao(Mi(this.contextWindow, "pointermove", this.handlePointerMove), Mi(this.contextWindow, "pointerup", this.handlePointerUp), Mi(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(t) {
    let n = t.parentElement;
    for (; n; ) {
      const r = getComputedStyle(n);
      (Ng.has(r.overflowX) || Ng.has(r.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0,
      passive: !0
    }), window.addEventListener("scroll", this.onWindowScroll, {
      passive: !0
    }), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(t) {
    const n = this.scrollPositions.get(t);
    if (!n)
      return;
    const r = t === window, s = r ? { x: window.scrollX, y: window.scrollY } : {
      x: t.scrollLeft,
      y: t.scrollTop
    }, i = { x: s.x - n.x, y: s.y - n.y };
    i.x === 0 && i.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += i.x, this.lastMoveEventInfo.point.y += i.y) : this.history.length > 0 && (this.history[0].x -= i.x, this.history[0].y -= i.y), this.scrollPositions.set(t, s), ie.update(this.updatePoint, !0));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), nr(this.updatePoint);
  }
}
function Ku(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Ig(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function qu({ point: e }, t) {
  return {
    point: e,
    delta: Ig(e, Ub(t)),
    offset: Ig(e, nj(t)),
    velocity: rj(t, 0.1)
  };
}
function nj(e) {
  return e[0];
}
function Ub(e) {
  return e[e.length - 1];
}
function rj(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, r = null;
  const s = Ub(e);
  for (; n >= 0 && (r = e[n], !(s.timestamp - r.timestamp > /* @__PURE__ */ Jt(t))); )
    n--;
  if (!r)
    return { x: 0, y: 0 };
  const i = /* @__PURE__ */ yt(s.timestamp - r.timestamp);
  if (i === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (s.x - r.x) / i,
    y: (s.y - r.y) / i
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function sj(e, { min: t, max: n }, r) {
  return t !== void 0 && e < t ? e = r ? de(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? de(n, e, r.max) : Math.min(e, n)), e;
}
function Dg(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function ij(e, { top: t, left: n, bottom: r, right: s }) {
  return {
    x: Dg(e.x, n, s),
    y: Dg(e.y, t, r)
  };
}
function Mg(e, t) {
  let n = t.min - e.min, r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function oj(e, t) {
  return {
    x: Mg(e.x, t.x),
    y: Mg(e.y, t.y)
  };
}
function aj(e, t) {
  let n = 0.5;
  const r = He(e), s = He(t);
  return s > r ? n = /* @__PURE__ */ oo(t.min, t.max - r, e.min) : r > s && (n = /* @__PURE__ */ oo(e.min, e.max - s, t.min)), en(0, 1, n);
}
function lj(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const Ad = 0.35;
function uj(e = Ad) {
  return e === !1 ? e = 0 : e === !0 && (e = Ad), {
    x: Lg(e, "left", "right"),
    y: Lg(e, "top", "bottom")
  };
}
function Lg(e, t, n) {
  return {
    min: $g(e, t),
    max: $g(e, n)
  };
}
function $g(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const cj = /* @__PURE__ */ new WeakMap();
class dj {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Se(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: r } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const i = (d) => {
      n ? (this.stopAnimation(), this.snapToCursor(jo(d).point)) : this.pauseAnimation();
    }, o = (d, h) => {
      this.stopAnimation();
      const { drag: f, dragPropagation: g, onDragStart: y } = this.getProps();
      if (f && !g && (this.openDragLock && this.openDragLock(), this.openDragLock = XA(f), !this.openDragLock))
        return;
      this.latestPointerEvent = d, this.latestPanInfo = h, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), ht((p) => {
        let m = this.getAxisMotionValue(p).get() || 0;
        if (Xt.test(m)) {
          const { projection: v } = this.visualElement;
          if (v && v.layout) {
            const x = v.layout.layoutBox[p];
            x && (m = He(x) * (parseFloat(m) / 100));
          }
        }
        this.originPoint[p] = m;
      }), y && ie.postRender(() => y(d, h)), bd(this.visualElement, "transform");
      const { animationState: w } = this.visualElement;
      w && w.setActive("whileDrag", !0);
    }, a = (d, h) => {
      this.latestPointerEvent = d, this.latestPanInfo = h;
      const { dragPropagation: f, dragDirectionLock: g, onDirectionLock: y, onDrag: w } = this.getProps();
      if (!f && !this.openDragLock)
        return;
      const { offset: p } = h;
      if (g && this.currentDirection === null) {
        this.currentDirection = hj(p), this.currentDirection !== null && y && y(this.currentDirection);
        return;
      }
      this.updateAxis("x", h.point, p), this.updateAxis("y", h.point, p), this.visualElement.render(), w && w(d, h);
    }, l = (d, h) => {
      this.latestPointerEvent = d, this.latestPanInfo = h, this.stop(d, h), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => ht((d) => {
      var h;
      return this.getAnimationState(d) === "paused" && ((h = this.getAxisMotionValue(d).animation) == null ? void 0 : h.play());
    }), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Vb(t, {
      onSessionStart: i,
      onStart: o,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: r,
      contextWindow: Fb(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(t, n) {
    const r = t || this.latestPointerEvent, s = n || this.latestPanInfo, i = this.isDragging;
    if (this.cancel(), !i || !s || !r)
      return;
    const { velocity: o } = s;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && ie.postRender(() => a(r, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(t, n, r) {
    const { drag: s } = this.getProps();
    if (!r || !oa(t, s, this.currentDirection))
      return;
    const i = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (o = sj(o, this.constraints[t], this.elastic[t])), i.set(o);
  }
  resolveConstraints() {
    var i;
    const { dragConstraints: t, dragElastic: n } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (i = this.visualElement.projection) == null ? void 0 : i.layout, s = this.constraints;
    t && bi(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && r ? this.constraints = ij(r.layoutBox, t) : this.constraints = !1, this.elastic = uj(n), s !== this.constraints && r && this.constraints && !this.hasMutatedConstraints && ht((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = lj(r.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !bi(t))
      return !1;
    const r = t.current;
    Ur(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const i = mR(r, s.root, this.visualElement.getTransformPagePoint());
    let o = oj(s.layout.layoutBox, i);
    if (n) {
      const a = n(hR(o));
      this.hasMutatedConstraints = !!a, a && (o = ab(a));
    }
    return o;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: r, dragElastic: s, dragTransition: i, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = ht((c) => {
      if (!oa(c, n, this.currentDirection))
        return;
      let d = l && l[c] || {};
      o && (d = { min: 0, max: 0 });
      const h = s ? 200 : 1e6, f = s ? 40 : 1e7, g = {
        type: "inertia",
        velocity: r ? t[c] : 0,
        bounceStiffness: h,
        bounceDamping: f,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...i,
        ...d
      };
      return this.startAxisValueAnimation(c, g);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return bd(this.visualElement, t), r.start(bf(t, r, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    ht((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    ht((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) == null ? void 0 : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) == null ? void 0 : n.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, r = this.visualElement.getProps(), s = r[n];
    return s || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    ht((n) => {
      const { drag: r } = this.getProps();
      if (!oa(n, r, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, i = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: o, max: a } = s.layout.layoutBox[n], l = i.get() || 0;
        i.set(t[n] - de(o, a, 0.5) + l);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: r } = this.visualElement;
    if (!bi(n) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    ht((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[o] = aj({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: i } = this.visualElement.getProps();
    this.visualElement.current.style.transform = i ? i({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.resolveConstraints(), ht((o) => {
      if (!oa(o, t, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(de(l, u, s[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    cj.set(this.visualElement, this);
    const t = this.visualElement.current, n = Mi(t, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps(), d = l.target, h = d !== t && tb(d);
      u && c && !h && this.start(l);
    }), r = () => {
      const { dragConstraints: l } = this.getProps();
      bi(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, i = s.addEventListener("measure", r);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), ie.read(r);
    const o = co(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (ht((c) => {
        const d = this.getAxisMotionValue(c);
        d && (this.originPoint[c] += l[c].translate, d.set(d.get() + l[c].translate));
      }), this.visualElement.render());
    });
    return () => {
      o(), n(), i(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: r = !1, dragPropagation: s = !1, dragConstraints: i = !1, dragElastic: o = Ad, dragMomentum: a = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: s,
      dragConstraints: i,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function oa(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function hj(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class fj extends ar {
  constructor(t) {
    super(t), this.removeGroupControls = wt, this.removeListeners = wt, this.controls = new dj(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || wt;
  }
  update() {
    const { dragControls: t } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    t !== n && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Fg = (e) => (t, n) => {
  e && ie.postRender(() => e(t, n));
};
class pj extends ar {
  constructor() {
    super(...arguments), this.removePointerDownListener = wt;
  }
  onPointerDown(t) {
    this.session = new Vb(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Fb(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Fg(t),
      onStart: Fg(n),
      onMove: r,
      onEnd: (i, o) => {
        delete this.session, s && ie.postRender(() => s(i, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Mi(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Gu = !1;
class mj extends b.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: s } = this.props, { projection: i } = t;
    i && (n.group && n.group.add(i), r && r.register && s && r.register(i), Gu && i.root.didUpdate(), i.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), i.setOptions({
      ...i.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), ja.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: s, isPresent: i } = this.props, { projection: o } = r;
    return o && (o.isPresent = i, t.layoutDependency !== n && o.setOptions({
      ...o.options,
      layoutDependency: n
    }), Gu = !0, s || t.layoutDependency !== n || n === void 0 || t.isPresent !== i ? o.willUpdate() : this.safeToRemove(), t.isPresent !== i && (i ? o.promote() : o.relegate() || ie.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), Tf.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props, { projection: s } = t;
    Gu = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), r && r.deregister && r.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Bb(e) {
  const [t, n] = Ab(), r = b.useContext(nf);
  return _.jsx(mj, { ...e, layoutGroup: r, switchLayoutGroup: b.useContext(Lb), isPresent: t, safeToRemove: n });
}
const gj = {
  pan: {
    Feature: pj
  },
  drag: {
    Feature: fj,
    ProjectionNode: Pb,
    MeasureLayout: Bb
  }
};
function Vg(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, i = r[s];
  i && ie.postRender(() => i(t, jo(t)));
}
class yj extends ar {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = ZA(t, (n, r) => (Vg(this.node, r, "Start"), (s) => Vg(this.node, s, "End"))));
  }
  unmount() {
  }
}
class vj extends ar {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Ao(co(this.node.current, "focus", () => this.onFocus()), co(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ug(e, t, n) {
  const { props: r } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), i = r[s];
  i && ie.postRender(() => i(t, jo(t)));
}
class wj extends ar {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = nR(t, (n, r) => (Ug(this.node, r, "Start"), (s, { success: i }) => Ug(this.node, s, i ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Rd = /* @__PURE__ */ new WeakMap(), Qu = /* @__PURE__ */ new WeakMap(), xj = (e) => {
  const t = Rd.get(e.target);
  t && t(e);
}, bj = (e) => {
  e.forEach(xj);
};
function Sj({ root: e, ...t }) {
  const n = e || document;
  Qu.has(n) || Qu.set(n, {});
  const r = Qu.get(n), s = JSON.stringify(t);
  return r[s] || (r[s] = new IntersectionObserver(bj, { root: e, ...t })), r[s];
}
function _j(e, t, n) {
  const r = Sj(t);
  return Rd.set(e, n), r.observe(e), () => {
    Rd.delete(e), r.unobserve(e);
  };
}
const kj = {
  some: 0,
  all: 1
};
class Tj extends ar {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: r, amount: s = "some", once: i } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof s == "number" ? s : kj[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, i && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: d } = this.node.getProps(), h = u ? c : d;
      h && h(l);
    };
    return _j(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Ej(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Ej({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Cj = {
  inView: {
    Feature: Tj
  },
  tap: {
    Feature: wj
  },
  focus: {
    Feature: vj
  },
  hover: {
    Feature: yj
  }
}, Pj = {
  layout: {
    ProjectionNode: Pb,
    MeasureLayout: Bb
  }
}, Aj = {
  ...ZO,
  ...Cj,
  ...gj,
  ...Pj
}, X = /* @__PURE__ */ GO(Aj, QO), Rj = tf("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-border bg-transparent hover:bg-secondary hover:border-primary/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-secondary hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      hero: "bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300",
      heroOutline: "border-2 border-primary/50 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg rounded-xl",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), Hs = b.forwardRef(({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...s
}, i) => {
  const o = r ? mk : "button";
  return /* @__PURE__ */ _.jsx(o, { className: Vt(Rj({
    variant: t,
    size: n,
    className: e
  })), ref: i, ...s });
});
Hs.displayName = "Button";
const yr = b.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ _.jsx(
    "input",
    {
      type: t,
      className: Vt(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ref: r,
      ...n
    }
  )
);
yr.displayName = "Input";
const zb = "scanner_usage", Od = 3, Bg = 60 * 60 * 1e3;
function Wb() {
  try {
    const e = localStorage.getItem(zb);
    if (e)
      return JSON.parse(e);
  } catch {
  }
  return { count: 0, pausedAt: null };
}
function jd(e) {
  try {
    localStorage.setItem(zb, JSON.stringify(e));
  } catch {
  }
}
function aa() {
  const e = Wb();
  if (e.pausedAt) {
    const n = Date.now() - e.pausedAt;
    if (n >= Bg)
      return jd({ count: 0, pausedAt: null }), { allowed: !0, remainingUses: Od, minutesUntilReset: null };
    const r = Bg - n;
    return { allowed: !1, remainingUses: 0, minutesUntilReset: Math.ceil(r / 6e4) };
  }
  const t = Od - e.count;
  return { allowed: t > 0, remainingUses: t, minutesUntilReset: null };
}
function Oj() {
  const t = Wb().count + 1;
  t >= Od ? jd({ count: t, pausedAt: Date.now() }) : jd({ count: t, pausedAt: null });
}
function jj({ onSubmit: e }) {
  const [t, n] = b.useState(""), [r, s] = b.useState(""), [i, o] = b.useState(""), a = b.useRef(Date.now()), [l, u] = b.useState(() => aa());
  b.useEffect(() => {
    if (l.minutesUntilReset !== null) {
      const d = setInterval(() => {
        u(aa());
      }, 3e4);
      return () => clearInterval(d);
    }
  }, [l.minutesUntilReset]);
  const c = (d) => {
    d.preventDefault();
    const h = aa();
    if (!h.allowed) {
      u(h);
      return;
    }
    if (i) {
      console.log("Bot detected via honeypot");
      return;
    }
    if (Date.now() - a.current < 2e3) {
      console.log("Bot detected via timing");
      return;
    }
    let g = t.trim();
    if (!g) {
      s("Ange en webbadress");
      return;
    }
    !g.startsWith("http://") && !g.startsWith("https://") && (g = "https://" + g);
    try {
      new URL(g), s(""), Oj(), u(aa()), e(g);
    } catch {
      s("Ange en giltig webbadress");
    }
  };
  return b.useEffect(() => {
    a.current = Date.now();
  }, []), !l.allowed && l.minutesUntilReset !== null ? /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center text-center max-w-2xl mx-auto px-4", children: [
    /* @__PURE__ */ _.jsx(
      X.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", delay: 0.1 },
        className: "w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4",
        children: /* @__PURE__ */ _.jsx(LC, { className: "w-7 h-7 text-muted-foreground" })
      }
    ),
    /* @__PURE__ */ _.jsx(
      X.h2,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        className: "text-xl md:text-2xl font-bold mb-2",
        children: "Scannern tar en paus"
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.p,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        className: "text-muted-foreground mb-6 text-base",
        children: [
          "Du har använt scannern 3 gånger. Kom tillbaka om cirka ",
          l.minutesUntilReset,
          " ",
          l.minutesUntilReset === 1 ? "minut" : "minuter",
          "."
        ]
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.4 },
        className: "text-sm text-muted-foreground",
        children: [
          "Vill du diskutera möjligheterna direkt?",
          " ",
          /* @__PURE__ */ _.jsx("a", { href: "/kontakt", className: "text-primary hover:underline", children: "Kontakta oss" })
        ]
      }
    )
  ] }) : /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center text-center max-w-2xl mx-auto px-4", children: [
    /* @__PURE__ */ _.jsx(
      X.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", delay: 0.1 },
        className: "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4",
        children: /* @__PURE__ */ _.jsx(ad, { className: "w-7 h-7 text-primary" })
      }
    ),
    /* @__PURE__ */ _.jsx(
      X.h2,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        className: "text-xl md:text-2xl font-bold mb-2",
        children: "Se vilka self-service-möjligheter som finns på er webbplats"
      }
    ),
    /* @__PURE__ */ _.jsx(
      X.p,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        className: "text-muted-foreground mb-6 text-base",
        children: "Vår AI analyserar hur era köpare kan få mer kontroll i köpresan."
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.form,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4 },
        onSubmit: c,
        className: "w-full max-w-md space-y-4",
        children: [
          /* @__PURE__ */ _.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ _.jsx($C, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ _.jsx(
              yr,
              {
                type: "text",
                value: t,
                onChange: (d) => {
                  n(d.target.value), s("");
                },
                placeholder: "www.ertforetag.se",
                className: "pl-12 h-14 text-lg bg-card border-border focus:border-primary"
              }
            )
          ] }),
          /* @__PURE__ */ _.jsx(
            "input",
            {
              type: "text",
              name: "website_url_confirm",
              value: i,
              onChange: (d) => o(d.target.value),
              tabIndex: -1,
              autoComplete: "off",
              "aria-hidden": "true",
              style: {
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                height: 0,
                width: 0,
                pointerEvents: "none"
              }
            }
          ),
          r && /* @__PURE__ */ _.jsx("p", { className: "text-destructive text-sm", children: r }),
          /* @__PURE__ */ _.jsxs(
            Hs,
            {
              type: "submit",
              variant: "hero",
              size: "xl",
              className: "w-full",
              children: [
                /* @__PURE__ */ _.jsx(ad, { className: "w-5 h-5 mr-2" }),
                "Analysera min webbplats"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.6 },
        className: "text-xs text-muted-foreground mt-4",
        children: [
          "Tar cirka 30 sekunder • Helt gratis • ",
          l.remainingUses,
          " ",
          l.remainingUses === 1 ? "analys" : "analyser",
          " kvar"
        ]
      }
    )
  ] });
}
function Ql(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(e); s < r.length; s++)
      t.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[s]) && (n[r[s]] = e[r[s]]);
  return n;
}
function Nj(e, t, n, r) {
  function s(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function a(c) {
      try {
        u(r.next(c));
      } catch (d) {
        o(d);
      }
    }
    function l(c) {
      try {
        u(r.throw(c));
      } catch (d) {
        o(d);
      }
    }
    function u(c) {
      c.done ? i(c.value) : s(c.value).then(a, l);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
const Ij = (e) => e ? (...t) => e(...t) : (...t) => fetch(...t);
class If extends Error {
  constructor(t, n = "FunctionsError", r) {
    super(t), this.name = n, this.context = r;
  }
}
class Dj extends If {
  constructor(t) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", t);
  }
}
class zg extends If {
  constructor(t) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", t);
  }
}
class Wg extends If {
  constructor(t) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", t);
  }
}
var Nd;
(function(e) {
  e.Any = "any", e.ApNortheast1 = "ap-northeast-1", e.ApNortheast2 = "ap-northeast-2", e.ApSouth1 = "ap-south-1", e.ApSoutheast1 = "ap-southeast-1", e.ApSoutheast2 = "ap-southeast-2", e.CaCentral1 = "ca-central-1", e.EuCentral1 = "eu-central-1", e.EuWest1 = "eu-west-1", e.EuWest2 = "eu-west-2", e.EuWest3 = "eu-west-3", e.SaEast1 = "sa-east-1", e.UsEast1 = "us-east-1", e.UsWest1 = "us-west-1", e.UsWest2 = "us-west-2";
})(Nd || (Nd = {}));
class Mj {
  /**
   * Creates a new Functions client bound to an Edge Functions URL.
   *
   * @example
   * ```ts
   * import { FunctionsClient, FunctionRegion } from '@supabase/functions-js'
   *
   * const functions = new FunctionsClient('https://xyzcompany.supabase.co/functions/v1', {
   *   headers: { apikey: 'public-anon-key' },
   *   region: FunctionRegion.UsEast1,
   * })
   * ```
   */
  constructor(t, { headers: n = {}, customFetch: r, region: s = Nd.Any } = {}) {
    this.url = t, this.headers = n, this.region = s, this.fetch = Ij(r);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   * @example
   * ```ts
   * functions.setAuth(session.access_token)
   * ```
   */
  setAuth(t) {
    this.headers.Authorization = `Bearer ${t}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   * @example
   * ```ts
   * const { data, error } = await functions.invoke('hello-world', {
   *   body: { name: 'Ada' },
   * })
   * ```
   */
  invoke(t) {
    return Nj(this, arguments, void 0, function* (n, r = {}) {
      var s;
      let i, o;
      try {
        const { headers: a, method: l, body: u, signal: c, timeout: d } = r;
        let h = {}, { region: f } = r;
        f || (f = this.region);
        const g = new URL(`${this.url}/${n}`);
        f && f !== "any" && (h["x-region"] = f, g.searchParams.set("forceFunctionRegion", f));
        let y;
        u && (a && !Object.prototype.hasOwnProperty.call(a, "Content-Type") || !a) ? typeof Blob < "u" && u instanceof Blob || u instanceof ArrayBuffer ? (h["Content-Type"] = "application/octet-stream", y = u) : typeof u == "string" ? (h["Content-Type"] = "text/plain", y = u) : typeof FormData < "u" && u instanceof FormData ? y = u : (h["Content-Type"] = "application/json", y = JSON.stringify(u)) : u && typeof u != "string" && !(typeof Blob < "u" && u instanceof Blob) && !(u instanceof ArrayBuffer) && !(typeof FormData < "u" && u instanceof FormData) ? y = JSON.stringify(u) : y = u;
        let w = c;
        d && (o = new AbortController(), i = setTimeout(() => o.abort(), d), c ? (w = o.signal, c.addEventListener("abort", () => o.abort())) : w = o.signal);
        const p = yield this.fetch(g.toString(), {
          method: l || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, h), this.headers), a),
          body: y,
          signal: w
        }).catch((S) => {
          throw new Dj(S);
        }), m = p.headers.get("x-relay-error");
        if (m && m === "true")
          throw new zg(p);
        if (!p.ok)
          throw new Wg(p);
        let v = ((s = p.headers.get("Content-Type")) !== null && s !== void 0 ? s : "text/plain").split(";")[0].trim(), x;
        return v === "application/json" ? x = yield p.json() : v === "application/octet-stream" || v === "application/pdf" ? x = yield p.blob() : v === "text/event-stream" ? x = p : v === "multipart/form-data" ? x = yield p.formData() : x = yield p.text(), { data: x, error: null, response: p };
      } catch (a) {
        return {
          data: null,
          error: a,
          response: a instanceof Wg || a instanceof zg ? a.context : void 0
        };
      } finally {
        i && clearTimeout(i);
      }
    });
  }
}
var Lj = class extends Error {
  /**
  * @example
  * ```ts
  * import PostgrestError from '@supabase/postgrest-js'
  *
  * throw new PostgrestError({
  *   message: 'Row level security prevented the request',
  *   details: 'RLS denied the insert',
  *   hint: 'Check your policies',
  *   code: 'PGRST301',
  * })
  * ```
  */
  constructor(e) {
    super(e.message), this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code;
  }
}, $j = class {
  /**
  * Creates a builder configured for a specific PostgREST request.
  *
  * @example
  * ```ts
  * import PostgrestQueryBuilder from '@supabase/postgrest-js'
  *
  * const builder = new PostgrestQueryBuilder(
  *   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
  *   { headers: new Headers({ apikey: 'public-anon-key' }) }
  * )
  * ```
  */
  constructor(e) {
    var t, n;
    this.shouldThrowOnError = !1, this.method = e.method, this.url = e.url, this.headers = new Headers(e.headers), this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = (t = e.shouldThrowOnError) !== null && t !== void 0 ? t : !1, this.signal = e.signal, this.isMaybeSingle = (n = e.isMaybeSingle) !== null && n !== void 0 ? n : !1, e.fetch ? this.fetch = e.fetch : this.fetch = fetch;
  }
  /**
  * If there's an error with the query, throwOnError will reject the promise by
  * throwing the error instead of returning it as part of a successful response.
  *
  * {@link https://github.com/supabase/supabase-js/issues/92}
  */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
  * Set an HTTP header for the request.
  */
  setHeader(e, t) {
    return this.headers = new Headers(this.headers), this.headers.set(e, t), this;
  }
  then(e, t) {
    var n = this;
    this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json");
    const r = this.fetch;
    let s = r(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async (i) => {
      let o = null, a = null, l = null, u = i.status, c = i.statusText;
      if (i.ok) {
        var d, h;
        if (n.method !== "HEAD") {
          var f;
          const p = await i.text();
          p === "" || (n.headers.get("Accept") === "text/csv" || n.headers.get("Accept") && (!((f = n.headers.get("Accept")) === null || f === void 0) && f.includes("application/vnd.pgrst.plan+text")) ? a = p : a = JSON.parse(p));
        }
        const y = (d = n.headers.get("Prefer")) === null || d === void 0 ? void 0 : d.match(/count=(exact|planned|estimated)/), w = (h = i.headers.get("content-range")) === null || h === void 0 ? void 0 : h.split("/");
        y && w && w.length > 1 && (l = parseInt(w[1])), n.isMaybeSingle && n.method === "GET" && Array.isArray(a) && (a.length > 1 ? (o = {
          code: "PGRST116",
          details: `Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,
          hint: null,
          message: "JSON object requested, multiple (or no) rows returned"
        }, a = null, l = null, u = 406, c = "Not Acceptable") : a.length === 1 ? a = a[0] : a = null);
      } else {
        var g;
        const y = await i.text();
        try {
          o = JSON.parse(y), Array.isArray(o) && i.status === 404 && (a = [], o = null, u = 200, c = "OK");
        } catch {
          i.status === 404 && y === "" ? (u = 204, c = "No Content") : o = { message: y };
        }
        if (o && n.isMaybeSingle && (!(o == null || (g = o.details) === null || g === void 0) && g.includes("0 rows")) && (o = null, u = 200, c = "OK"), o && n.shouldThrowOnError) throw new Lj(o);
      }
      return {
        error: o,
        data: a,
        count: l,
        status: u,
        statusText: c
      };
    });
    return this.shouldThrowOnError || (s = s.catch((i) => {
      var o;
      let a = "";
      const l = i == null ? void 0 : i.cause;
      if (l) {
        var u, c, d, h;
        const g = (u = l == null ? void 0 : l.message) !== null && u !== void 0 ? u : "", y = (c = l == null ? void 0 : l.code) !== null && c !== void 0 ? c : "";
        a = `${(d = i == null ? void 0 : i.name) !== null && d !== void 0 ? d : "FetchError"}: ${i == null ? void 0 : i.message}`, a += `

Caused by: ${(h = l == null ? void 0 : l.name) !== null && h !== void 0 ? h : "Error"}: ${g}`, y && (a += ` (${y})`), l != null && l.stack && (a += `
${l.stack}`);
      } else {
        var f;
        a = (f = i == null ? void 0 : i.stack) !== null && f !== void 0 ? f : "";
      }
      return {
        error: {
          message: `${(o = i == null ? void 0 : i.name) !== null && o !== void 0 ? o : "FetchError"}: ${i == null ? void 0 : i.message}`,
          details: a,
          hint: "",
          code: ""
        },
        data: null,
        count: null,
        status: 0,
        statusText: ""
      };
    })), s.then(e, t);
  }
  /**
  * Override the type of the returned `data`.
  *
  * @typeParam NewResult - The new result type to override with
  * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
  */
  returns() {
    return this;
  }
  /**
  * Override the type of the returned `data` field in the response.
  *
  * @typeParam NewResult - The new type to cast the response data to
  * @typeParam Options - Optional type configuration (defaults to { merge: true })
  * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
  * @example
  * ```typescript
  * // Merge with existing types (default behavior)
  * const query = supabase
  *   .from('users')
  *   .select()
  *   .overrideTypes<{ custom_field: string }>()
  *
  * // Replace existing types completely
  * const replaceQuery = supabase
  *   .from('users')
  *   .select()
  *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
  * ```
  * @returns A PostgrestBuilder instance with the new type
  */
  overrideTypes() {
    return this;
  }
}, Fj = class extends $j {
  /**
  * Perform a SELECT on the query result.
  *
  * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
  * return modified rows. By calling this method, modified rows are returned in
  * `data`.
  *
  * @param columns - The columns to retrieve, separated by commas
  */
  select(e) {
    let t = !1;
    const n = (e ?? "*").split("").map((r) => /\s/.test(r) && !t ? "" : (r === '"' && (t = !t), r)).join("");
    return this.url.searchParams.set("select", n), this.headers.append("Prefer", "return=representation"), this;
  }
  /**
  * Order the query result by `column`.
  *
  * You can call this method multiple times to order by multiple columns.
  *
  * You can order referenced tables, but it only affects the ordering of the
  * parent table if you use `!inner` in the query.
  *
  * @param column - The column to order by
  * @param options - Named parameters
  * @param options.ascending - If `true`, the result will be in ascending order
  * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
  * `null`s appear last.
  * @param options.referencedTable - Set this to order a referenced table by
  * its columns
  * @param options.foreignTable - Deprecated, use `options.referencedTable`
  * instead
  */
  order(e, { ascending: t = !0, nullsFirst: n, foreignTable: r, referencedTable: s = r } = {}) {
    const i = s ? `${s}.order` : "order", o = this.url.searchParams.get(i);
    return this.url.searchParams.set(i, `${o ? `${o},` : ""}${e}.${t ? "asc" : "desc"}${n === void 0 ? "" : n ? ".nullsfirst" : ".nullslast"}`), this;
  }
  /**
  * Limit the query result by `count`.
  *
  * @param count - The maximum number of rows to return
  * @param options - Named parameters
  * @param options.referencedTable - Set this to limit rows of referenced
  * tables instead of the parent table
  * @param options.foreignTable - Deprecated, use `options.referencedTable`
  * instead
  */
  limit(e, { foreignTable: t, referencedTable: n = t } = {}) {
    const r = typeof n > "u" ? "limit" : `${n}.limit`;
    return this.url.searchParams.set(r, `${e}`), this;
  }
  /**
  * Limit the query result by starting at an offset `from` and ending at the offset `to`.
  * Only records within this range are returned.
  * This respects the query order and if there is no order clause the range could behave unexpectedly.
  * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
  * and fourth rows of the query.
  *
  * @param from - The starting index from which to limit the result
  * @param to - The last index to which to limit the result
  * @param options - Named parameters
  * @param options.referencedTable - Set this to limit rows of referenced
  * tables instead of the parent table
  * @param options.foreignTable - Deprecated, use `options.referencedTable`
  * instead
  */
  range(e, t, { foreignTable: n, referencedTable: r = n } = {}) {
    const s = typeof r > "u" ? "offset" : `${r}.offset`, i = typeof r > "u" ? "limit" : `${r}.limit`;
    return this.url.searchParams.set(s, `${e}`), this.url.searchParams.set(i, `${t - e + 1}`), this;
  }
  /**
  * Set the AbortSignal for the fetch request.
  *
  * @param signal - The AbortSignal to use for the fetch request
  */
  abortSignal(e) {
    return this.signal = e, this;
  }
  /**
  * Return `data` as a single object instead of an array of objects.
  *
  * Query result must be one row (e.g. using `.limit(1)`), otherwise this
  * returns an error.
  */
  single() {
    return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
  }
  /**
  * Return `data` as a single object instead of an array of objects.
  *
  * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
  * this returns an error.
  */
  maybeSingle() {
    return this.method === "GET" ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = !0, this;
  }
  /**
  * Return `data` as a string in CSV format.
  */
  csv() {
    return this.headers.set("Accept", "text/csv"), this;
  }
  /**
  * Return `data` as an object in [GeoJSON](https://geojson.org) format.
  */
  geojson() {
    return this.headers.set("Accept", "application/geo+json"), this;
  }
  /**
  * Return `data` as the EXPLAIN plan for the query.
  *
  * You need to enable the
  * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
  * setting before using this method.
  *
  * @param options - Named parameters
  *
  * @param options.analyze - If `true`, the query will be executed and the
  * actual run time will be returned
  *
  * @param options.verbose - If `true`, the query identifier will be returned
  * and `data` will include the output columns of the query
  *
  * @param options.settings - If `true`, include information on configuration
  * parameters that affect query planning
  *
  * @param options.buffers - If `true`, include information on buffer usage
  *
  * @param options.wal - If `true`, include information on WAL record generation
  *
  * @param options.format - The format of the output, can be `"text"` (default)
  * or `"json"`
  */
  explain({ analyze: e = !1, verbose: t = !1, settings: n = !1, buffers: r = !1, wal: s = !1, format: i = "text" } = {}) {
    var o;
    const a = [
      e ? "analyze" : null,
      t ? "verbose" : null,
      n ? "settings" : null,
      r ? "buffers" : null,
      s ? "wal" : null
    ].filter(Boolean).join("|"), l = (o = this.headers.get("Accept")) !== null && o !== void 0 ? o : "application/json";
    return this.headers.set("Accept", `application/vnd.pgrst.plan+${i}; for="${l}"; options=${a};`), i === "json" ? this : this;
  }
  /**
  * Rollback the query.
  *
  * `data` will still be returned, but the query is not committed.
  */
  rollback() {
    return this.headers.append("Prefer", "tx=rollback"), this;
  }
  /**
  * Override the type of the returned `data`.
  *
  * @typeParam NewResult - The new result type to override with
  * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
  */
  returns() {
    return this;
  }
  /**
  * Set the maximum number of rows that can be affected by the query.
  * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
  *
  * @param value - The maximum number of rows that can be affected
  */
  maxAffected(e) {
    return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e}`), this;
  }
};
const Hg = /* @__PURE__ */ new RegExp("[,()]");
var Jr = class extends Fj {
  /**
  * Match only rows where `column` is equal to `value`.
  *
  * To check if the value of `column` is NULL, you should use `.is()` instead.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  eq(e, t) {
    return this.url.searchParams.append(e, `eq.${t}`), this;
  }
  /**
  * Match only rows where `column` is not equal to `value`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  neq(e, t) {
    return this.url.searchParams.append(e, `neq.${t}`), this;
  }
  /**
  * Match only rows where `column` is greater than `value`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  gt(e, t) {
    return this.url.searchParams.append(e, `gt.${t}`), this;
  }
  /**
  * Match only rows where `column` is greater than or equal to `value`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  gte(e, t) {
    return this.url.searchParams.append(e, `gte.${t}`), this;
  }
  /**
  * Match only rows where `column` is less than `value`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  lt(e, t) {
    return this.url.searchParams.append(e, `lt.${t}`), this;
  }
  /**
  * Match only rows where `column` is less than or equal to `value`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  lte(e, t) {
    return this.url.searchParams.append(e, `lte.${t}`), this;
  }
  /**
  * Match only rows where `column` matches `pattern` case-sensitively.
  *
  * @param column - The column to filter on
  * @param pattern - The pattern to match with
  */
  like(e, t) {
    return this.url.searchParams.append(e, `like.${t}`), this;
  }
  /**
  * Match only rows where `column` matches all of `patterns` case-sensitively.
  *
  * @param column - The column to filter on
  * @param patterns - The patterns to match with
  */
  likeAllOf(e, t) {
    return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
  }
  /**
  * Match only rows where `column` matches any of `patterns` case-sensitively.
  *
  * @param column - The column to filter on
  * @param patterns - The patterns to match with
  */
  likeAnyOf(e, t) {
    return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
  }
  /**
  * Match only rows where `column` matches `pattern` case-insensitively.
  *
  * @param column - The column to filter on
  * @param pattern - The pattern to match with
  */
  ilike(e, t) {
    return this.url.searchParams.append(e, `ilike.${t}`), this;
  }
  /**
  * Match only rows where `column` matches all of `patterns` case-insensitively.
  *
  * @param column - The column to filter on
  * @param patterns - The patterns to match with
  */
  ilikeAllOf(e, t) {
    return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
  }
  /**
  * Match only rows where `column` matches any of `patterns` case-insensitively.
  *
  * @param column - The column to filter on
  * @param patterns - The patterns to match with
  */
  ilikeAnyOf(e, t) {
    return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
  }
  /**
  * Match only rows where `column` matches the PostgreSQL regex `pattern`
  * case-sensitively (using the `~` operator).
  *
  * @param column - The column to filter on
  * @param pattern - The PostgreSQL regular expression pattern to match with
  */
  regexMatch(e, t) {
    return this.url.searchParams.append(e, `match.${t}`), this;
  }
  /**
  * Match only rows where `column` matches the PostgreSQL regex `pattern`
  * case-insensitively (using the `~*` operator).
  *
  * @param column - The column to filter on
  * @param pattern - The PostgreSQL regular expression pattern to match with
  */
  regexIMatch(e, t) {
    return this.url.searchParams.append(e, `imatch.${t}`), this;
  }
  /**
  * Match only rows where `column` IS `value`.
  *
  * For non-boolean columns, this is only relevant for checking if the value of
  * `column` is NULL by setting `value` to `null`.
  *
  * For boolean columns, you can also set `value` to `true` or `false` and it
  * will behave the same way as `.eq()`.
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  is(e, t) {
    return this.url.searchParams.append(e, `is.${t}`), this;
  }
  /**
  * Match only rows where `column` IS DISTINCT FROM `value`.
  *
  * Unlike `.neq()`, this treats `NULL` as a comparable value. Two `NULL` values
  * are considered equal (not distinct), and comparing `NULL` with any non-NULL
  * value returns true (distinct).
  *
  * @param column - The column to filter on
  * @param value - The value to filter with
  */
  isDistinct(e, t) {
    return this.url.searchParams.append(e, `isdistinct.${t}`), this;
  }
  /**
  * Match only rows where `column` is included in the `values` array.
  *
  * @param column - The column to filter on
  * @param values - The values array to filter with
  */
  in(e, t) {
    const n = Array.from(new Set(t)).map((r) => typeof r == "string" && Hg.test(r) ? `"${r}"` : `${r}`).join(",");
    return this.url.searchParams.append(e, `in.(${n})`), this;
  }
  /**
  * Match only rows where `column` is NOT included in the `values` array.
  *
  * @param column - The column to filter on
  * @param values - The values array to filter with
  */
  notIn(e, t) {
    const n = Array.from(new Set(t)).map((r) => typeof r == "string" && Hg.test(r) ? `"${r}"` : `${r}`).join(",");
    return this.url.searchParams.append(e, `not.in.(${n})`), this;
  }
  /**
  * Only relevant for jsonb, array, and range columns. Match only rows where
  * `column` contains every element appearing in `value`.
  *
  * @param column - The jsonb, array, or range column to filter on
  * @param value - The jsonb, array, or range value to filter with
  */
  contains(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this;
  }
  /**
  * Only relevant for jsonb, array, and range columns. Match only rows where
  * every element appearing in `column` is contained by `value`.
  *
  * @param column - The jsonb, array, or range column to filter on
  * @param value - The jsonb, array, or range value to filter with
  */
  containedBy(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this;
  }
  /**
  * Only relevant for range columns. Match only rows where every element in
  * `column` is greater than any element in `range`.
  *
  * @param column - The range column to filter on
  * @param range - The range to filter with
  */
  rangeGt(e, t) {
    return this.url.searchParams.append(e, `sr.${t}`), this;
  }
  /**
  * Only relevant for range columns. Match only rows where every element in
  * `column` is either contained in `range` or greater than any element in
  * `range`.
  *
  * @param column - The range column to filter on
  * @param range - The range to filter with
  */
  rangeGte(e, t) {
    return this.url.searchParams.append(e, `nxl.${t}`), this;
  }
  /**
  * Only relevant for range columns. Match only rows where every element in
  * `column` is less than any element in `range`.
  *
  * @param column - The range column to filter on
  * @param range - The range to filter with
  */
  rangeLt(e, t) {
    return this.url.searchParams.append(e, `sl.${t}`), this;
  }
  /**
  * Only relevant for range columns. Match only rows where every element in
  * `column` is either contained in `range` or less than any element in
  * `range`.
  *
  * @param column - The range column to filter on
  * @param range - The range to filter with
  */
  rangeLte(e, t) {
    return this.url.searchParams.append(e, `nxr.${t}`), this;
  }
  /**
  * Only relevant for range columns. Match only rows where `column` is
  * mutually exclusive to `range` and there can be no element between the two
  * ranges.
  *
  * @param column - The range column to filter on
  * @param range - The range to filter with
  */
  rangeAdjacent(e, t) {
    return this.url.searchParams.append(e, `adj.${t}`), this;
  }
  /**
  * Only relevant for array and range columns. Match only rows where
  * `column` and `value` have an element in common.
  *
  * @param column - The array or range column to filter on
  * @param value - The array or range value to filter with
  */
  overlaps(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
  }
  /**
  * Only relevant for text and tsvector columns. Match only rows where
  * `column` matches the query string in `query`.
  *
  * @param column - The text or tsvector column to filter on
  * @param query - The query text to match with
  * @param options - Named parameters
  * @param options.config - The text search configuration to use
  * @param options.type - Change how the `query` text is interpreted
  */
  textSearch(e, t, { config: n, type: r } = {}) {
    let s = "";
    r === "plain" ? s = "pl" : r === "phrase" ? s = "ph" : r === "websearch" && (s = "w");
    const i = n === void 0 ? "" : `(${n})`;
    return this.url.searchParams.append(e, `${s}fts${i}.${t}`), this;
  }
  /**
  * Match only rows where each column in `query` keys is equal to its
  * associated value. Shorthand for multiple `.eq()`s.
  *
  * @param query - The object to filter with, with column names as keys mapped
  * to their filter values
  */
  match(e) {
    return Object.entries(e).forEach(([t, n]) => {
      this.url.searchParams.append(t, `eq.${n}`);
    }), this;
  }
  /**
  * Match only rows which doesn't satisfy the filter.
  *
  * Unlike most filters, `opearator` and `value` are used as-is and need to
  * follow [PostgREST
  * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
  * to make sure they are properly sanitized.
  *
  * @param column - The column to filter on
  * @param operator - The operator to be negated to filter with, following
  * PostgREST syntax
  * @param value - The value to filter with, following PostgREST syntax
  */
  not(e, t, n) {
    return this.url.searchParams.append(e, `not.${t}.${n}`), this;
  }
  /**
  * Match only rows which satisfy at least one of the filters.
  *
  * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
  * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
  * to make sure it's properly sanitized.
  *
  * It's currently not possible to do an `.or()` filter across multiple tables.
  *
  * @param filters - The filters to use, following PostgREST syntax
  * @param options - Named parameters
  * @param options.referencedTable - Set this to filter on referenced tables
  * instead of the parent table
  * @param options.foreignTable - Deprecated, use `referencedTable` instead
  */
  or(e, { foreignTable: t, referencedTable: n = t } = {}) {
    const r = n ? `${n}.or` : "or";
    return this.url.searchParams.append(r, `(${e})`), this;
  }
  /**
  * Match only rows which satisfy the filter. This is an escape hatch - you
  * should use the specific filter methods wherever possible.
  *
  * Unlike most filters, `opearator` and `value` are used as-is and need to
  * follow [PostgREST
  * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
  * to make sure they are properly sanitized.
  *
  * @param column - The column to filter on
  * @param operator - The operator to filter with, following PostgREST syntax
  * @param value - The value to filter with, following PostgREST syntax
  */
  filter(e, t, n) {
    return this.url.searchParams.append(e, `${t}.${n}`), this;
  }
}, Vj = class {
  /**
  * Creates a query builder scoped to a Postgres table or view.
  *
  * @example
  * ```ts
  * import PostgrestQueryBuilder from '@supabase/postgrest-js'
  *
  * const query = new PostgrestQueryBuilder(
  *   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
  *   { headers: { apikey: 'public-anon-key' } }
  * )
  * ```
  */
  constructor(e, { headers: t = {}, schema: n, fetch: r }) {
    this.url = e, this.headers = new Headers(t), this.schema = n, this.fetch = r;
  }
  /**
  * Clone URL and headers to prevent shared state between operations.
  */
  cloneRequestState() {
    return {
      url: new URL(this.url.toString()),
      headers: new Headers(this.headers)
    };
  }
  /**
  * Perform a SELECT query on the table or view.
  *
  * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
  *
  * @param options - Named parameters
  *
  * @param options.head - When set to `true`, `data` will not be returned.
  * Useful if you only need the count.
  *
  * @param options.count - Count algorithm to use to count rows in the table or view.
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  *
  * @remarks
  * When using `count` with `.range()` or `.limit()`, the returned `count` is the total number of rows
  * that match your filters, not the number of rows in the current page. Use this to build pagination UI.
  */
  select(e, t) {
    const { head: n = !1, count: r } = t ?? {}, s = n ? "HEAD" : "GET";
    let i = !1;
    const o = (e ?? "*").split("").map((u) => /\s/.test(u) && !i ? "" : (u === '"' && (i = !i), u)).join(""), { url: a, headers: l } = this.cloneRequestState();
    return a.searchParams.set("select", o), r && l.append("Prefer", `count=${r}`), new Jr({
      method: s,
      url: a,
      headers: l,
      schema: this.schema,
      fetch: this.fetch
    });
  }
  /**
  * Perform an INSERT into the table or view.
  *
  * By default, inserted rows are not returned. To return it, chain the call
  * with `.select()`.
  *
  * @param values - The values to insert. Pass an object to insert a single row
  * or an array to insert multiple rows.
  *
  * @param options - Named parameters
  *
  * @param options.count - Count algorithm to use to count inserted rows.
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  *
  * @param options.defaultToNull - Make missing fields default to `null`.
  * Otherwise, use the default value for the column. Only applies for bulk
  * inserts.
  */
  insert(e, { count: t, defaultToNull: n = !0 } = {}) {
    var r;
    const s = "POST", { url: i, headers: o } = this.cloneRequestState();
    if (t && o.append("Prefer", `count=${t}`), n || o.append("Prefer", "missing=default"), Array.isArray(e)) {
      const a = e.reduce((l, u) => l.concat(Object.keys(u)), []);
      if (a.length > 0) {
        const l = [...new Set(a)].map((u) => `"${u}"`);
        i.searchParams.set("columns", l.join(","));
      }
    }
    return new Jr({
      method: s,
      url: i,
      headers: o,
      schema: this.schema,
      body: e,
      fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch
    });
  }
  /**
  * Perform an UPSERT on the table or view. Depending on the column(s) passed
  * to `onConflict`, `.upsert()` allows you to perform the equivalent of
  * `.insert()` if a row with the corresponding `onConflict` columns doesn't
  * exist, or if it does exist, perform an alternative action depending on
  * `ignoreDuplicates`.
  *
  * By default, upserted rows are not returned. To return it, chain the call
  * with `.select()`.
  *
  * @param values - The values to upsert with. Pass an object to upsert a
  * single row or an array to upsert multiple rows.
  *
  * @param options - Named parameters
  *
  * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
  * duplicate rows are determined. Two rows are duplicates if all the
  * `onConflict` columns are equal.
  *
  * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
  * `false`, duplicate rows are merged with existing rows.
  *
  * @param options.count - Count algorithm to use to count upserted rows.
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  *
  * @param options.defaultToNull - Make missing fields default to `null`.
  * Otherwise, use the default value for the column. This only applies when
  * inserting new rows, not when merging with existing rows under
  * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
  *
  * @example Upsert a single row using a unique key
  * ```ts
  * // Upserting a single row, overwriting based on the 'username' unique column
  * const { data, error } = await supabase
  *   .from('users')
  *   .upsert({ username: 'supabot' }, { onConflict: 'username' })
  *
  * // Example response:
  * // {
  * //   data: [
  * //     { id: 4, message: 'bar', username: 'supabot' }
  * //   ],
  * //   error: null
  * // }
  * ```
  *
  * @example Upsert with conflict resolution and exact row counting
  * ```ts
  * // Upserting and returning exact count
  * const { data, error, count } = await supabase
  *   .from('users')
  *   .upsert(
  *     {
  *       id: 3,
  *       message: 'foo',
  *       username: 'supabot'
  *     },
  *     {
  *       onConflict: 'username',
  *       count: 'exact'
  *     }
  *   )
  *
  * // Example response:
  * // {
  * //   data: [
  * //     {
  * //       id: 42,
  * //       handle: "saoirse",
  * //       display_name: "Saoirse"
  * //     }
  * //   ],
  * //   count: 1,
  * //   error: null
  * // }
  * ```
  */
  upsert(e, { onConflict: t, ignoreDuplicates: n = !1, count: r, defaultToNull: s = !0 } = {}) {
    var i;
    const o = "POST", { url: a, headers: l } = this.cloneRequestState();
    if (l.append("Prefer", `resolution=${n ? "ignore" : "merge"}-duplicates`), t !== void 0 && a.searchParams.set("on_conflict", t), r && l.append("Prefer", `count=${r}`), s || l.append("Prefer", "missing=default"), Array.isArray(e)) {
      const u = e.reduce((c, d) => c.concat(Object.keys(d)), []);
      if (u.length > 0) {
        const c = [...new Set(u)].map((d) => `"${d}"`);
        a.searchParams.set("columns", c.join(","));
      }
    }
    return new Jr({
      method: o,
      url: a,
      headers: l,
      schema: this.schema,
      body: e,
      fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch
    });
  }
  /**
  * Perform an UPDATE on the table or view.
  *
  * By default, updated rows are not returned. To return it, chain the call
  * with `.select()` after filters.
  *
  * @param values - The values to update with
  *
  * @param options - Named parameters
  *
  * @param options.count - Count algorithm to use to count updated rows.
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  */
  update(e, { count: t } = {}) {
    var n;
    const r = "PATCH", { url: s, headers: i } = this.cloneRequestState();
    return t && i.append("Prefer", `count=${t}`), new Jr({
      method: r,
      url: s,
      headers: i,
      schema: this.schema,
      body: e,
      fetch: (n = this.fetch) !== null && n !== void 0 ? n : fetch
    });
  }
  /**
  * Perform a DELETE on the table or view.
  *
  * By default, deleted rows are not returned. To return it, chain the call
  * with `.select()` after filters.
  *
  * @param options - Named parameters
  *
  * @param options.count - Count algorithm to use to count deleted rows.
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  */
  delete({ count: e } = {}) {
    var t;
    const n = "DELETE", { url: r, headers: s } = this.cloneRequestState();
    return e && s.append("Prefer", `count=${e}`), new Jr({
      method: n,
      url: r,
      headers: s,
      schema: this.schema,
      fetch: (t = this.fetch) !== null && t !== void 0 ? t : fetch
    });
  }
}, Uj = class Hb {
  /**
  * Creates a PostgREST client.
  *
  * @param url - URL of the PostgREST endpoint
  * @param options - Named parameters
  * @param options.headers - Custom headers
  * @param options.schema - Postgres schema to switch to
  * @param options.fetch - Custom fetch
  * @example
  * ```ts
  * import PostgrestClient from '@supabase/postgrest-js'
  *
  * const postgrest = new PostgrestClient('https://xyzcompany.supabase.co/rest/v1', {
  *   headers: { apikey: 'public-anon-key' },
  *   schema: 'public',
  * })
  * ```
  */
  constructor(t, { headers: n = {}, schema: r, fetch: s } = {}) {
    this.url = t, this.headers = new Headers(n), this.schemaName = r, this.fetch = s;
  }
  /**
  * Perform a query on a table or a view.
  *
  * @param relation - The table or view name to query
  */
  from(t) {
    if (!t || typeof t != "string" || t.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
    return new Vj(new URL(`${this.url}/${t}`), {
      headers: new Headers(this.headers),
      schema: this.schemaName,
      fetch: this.fetch
    });
  }
  /**
  * Select a schema to query or perform an function (rpc) call.
  *
  * The schema needs to be on the list of exposed schemas inside Supabase.
  *
  * @param schema - The schema to query
  */
  schema(t) {
    return new Hb(this.url, {
      headers: this.headers,
      schema: t,
      fetch: this.fetch
    });
  }
  /**
  * Perform a function call.
  *
  * @param fn - The function name to call
  * @param args - The arguments to pass to the function call
  * @param options - Named parameters
  * @param options.head - When set to `true`, `data` will not be returned.
  * Useful if you only need the count.
  * @param options.get - When set to `true`, the function will be called with
  * read-only access mode.
  * @param options.count - Count algorithm to use to count rows returned by the
  * function. Only applicable for [set-returning
  * functions](https://www.postgresql.org/docs/current/functions-srf.html).
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  *
  * @example
  * ```ts
  * // For cross-schema functions where type inference fails, use overrideTypes:
  * const { data } = await supabase
  *   .schema('schema_b')
  *   .rpc('function_a', {})
  *   .overrideTypes<{ id: string; user_id: string }[]>()
  * ```
  */
  rpc(t, n = {}, { head: r = !1, get: s = !1, count: i } = {}) {
    var o;
    let a;
    const l = new URL(`${this.url}/rpc/${t}`);
    let u;
    const c = (f) => f !== null && typeof f == "object" && (!Array.isArray(f) || f.some(c)), d = r && Object.values(n).some(c);
    d ? (a = "POST", u = n) : r || s ? (a = r ? "HEAD" : "GET", Object.entries(n).filter(([f, g]) => g !== void 0).map(([f, g]) => [f, Array.isArray(g) ? `{${g.join(",")}}` : `${g}`]).forEach(([f, g]) => {
      l.searchParams.append(f, g);
    })) : (a = "POST", u = n);
    const h = new Headers(this.headers);
    return d ? h.set("Prefer", i ? `count=${i},return=minimal` : "return=minimal") : i && h.set("Prefer", `count=${i}`), new Jr({
      method: a,
      url: l,
      headers: h,
      schema: this.schemaName,
      body: u,
      fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch
    });
  }
};
class Bj {
  /**
   * Static-only utility – prevent instantiation.
   */
  constructor() {
  }
  static detectEnvironment() {
    var t;
    if (typeof WebSocket < "u")
      return { type: "native", constructor: WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocket < "u")
      return { type: "native", constructor: globalThis.WebSocket };
    if (typeof global < "u" && typeof global.WebSocket < "u")
      return { type: "native", constructor: global.WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocketPair < "u" && typeof globalThis.WebSocket > "u")
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    if (typeof globalThis < "u" && globalThis.EdgeRuntime || typeof navigator < "u" && (!((t = navigator.userAgent) === null || t === void 0) && t.includes("Vercel-Edge")))
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    const n = globalThis.process;
    if (n) {
      const r = n.versions;
      if (r && r.node) {
        const s = r.node, i = parseInt(s.replace(/^v/, "").split(".")[0]);
        return i >= 22 ? typeof globalThis.WebSocket < "u" ? { type: "native", constructor: globalThis.WebSocket } : {
          type: "unsupported",
          error: `Node.js ${i} detected but native WebSocket not found.`,
          workaround: "Provide a WebSocket implementation via the transport option."
        } : {
          type: "unsupported",
          error: `Node.js ${i} detected without native WebSocket support.`,
          workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  /**
   * Returns the best available WebSocket constructor for the current runtime.
   *
   * @example
   * ```ts
   * const WS = WebSocketFactory.getWebSocketConstructor()
   * const socket = new WS('wss://realtime.supabase.co/socket')
   * ```
   */
  static getWebSocketConstructor() {
    const t = this.detectEnvironment();
    if (t.constructor)
      return t.constructor;
    let n = t.error || "WebSocket not supported in this environment.";
    throw t.workaround && (n += `

Suggested solution: ${t.workaround}`), new Error(n);
  }
  /**
   * Creates a WebSocket using the detected constructor.
   *
   * @example
   * ```ts
   * const socket = WebSocketFactory.createWebSocket('wss://realtime.supabase.co/socket')
   * ```
   */
  static createWebSocket(t, n) {
    const r = this.getWebSocketConstructor();
    return new r(t, n);
  }
  /**
   * Detects whether the runtime can establish WebSocket connections.
   *
   * @example
   * ```ts
   * if (!WebSocketFactory.isWebSocketSupported()) {
   *   console.warn('Falling back to long polling')
   * }
   * ```
   */
  static isWebSocketSupported() {
    try {
      const t = this.detectEnvironment();
      return t.type === "native" || t.type === "ws";
    } catch {
      return !1;
    }
  }
}
const zj = "2.93.1", Wj = `realtime-js/${zj}`, Hj = "1.0.0", Kb = "2.0.0", Kg = Kb, Id = 1e4, Kj = 1e3, qj = 100;
var Rn;
(function(e) {
  e[e.connecting = 0] = "connecting", e[e.open = 1] = "open", e[e.closing = 2] = "closing", e[e.closed = 3] = "closed";
})(Rn || (Rn = {}));
var be;
(function(e) {
  e.closed = "closed", e.errored = "errored", e.joined = "joined", e.joining = "joining", e.leaving = "leaving";
})(be || (be = {}));
var jt;
(function(e) {
  e.close = "phx_close", e.error = "phx_error", e.join = "phx_join", e.reply = "phx_reply", e.leave = "phx_leave", e.access_token = "access_token";
})(jt || (jt = {}));
var Dd;
(function(e) {
  e.websocket = "websocket";
})(Dd || (Dd = {}));
var vr;
(function(e) {
  e.Connecting = "connecting", e.Open = "open", e.Closing = "closing", e.Closed = "closed";
})(vr || (vr = {}));
class Gj {
  constructor(t) {
    this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = t ?? [];
  }
  encode(t, n) {
    if (t.event === this.BROADCAST_EVENT && !(t.payload instanceof ArrayBuffer) && typeof t.payload.event == "string")
      return n(this._binaryEncodeUserBroadcastPush(t));
    let r = [t.join_ref, t.ref, t.topic, t.event, t.payload];
    return n(JSON.stringify(r));
  }
  _binaryEncodeUserBroadcastPush(t) {
    var n;
    return this._isArrayBuffer((n = t.payload) === null || n === void 0 ? void 0 : n.payload) ? this._encodeBinaryUserBroadcastPush(t) : this._encodeJsonUserBroadcastPush(t);
  }
  _encodeBinaryUserBroadcastPush(t) {
    var n, r;
    const s = (r = (n = t.payload) === null || n === void 0 ? void 0 : n.payload) !== null && r !== void 0 ? r : new ArrayBuffer(0);
    return this._encodeUserBroadcastPush(t, this.BINARY_ENCODING, s);
  }
  _encodeJsonUserBroadcastPush(t) {
    var n, r;
    const s = (r = (n = t.payload) === null || n === void 0 ? void 0 : n.payload) !== null && r !== void 0 ? r : {}, o = new TextEncoder().encode(JSON.stringify(s)).buffer;
    return this._encodeUserBroadcastPush(t, this.JSON_ENCODING, o);
  }
  _encodeUserBroadcastPush(t, n, r) {
    var s, i;
    const o = t.topic, a = (s = t.ref) !== null && s !== void 0 ? s : "", l = (i = t.join_ref) !== null && i !== void 0 ? i : "", u = t.payload.event, c = this.allowedMetadataKeys ? this._pick(t.payload, this.allowedMetadataKeys) : {}, d = Object.keys(c).length === 0 ? "" : JSON.stringify(c);
    if (l.length > 255)
      throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);
    if (a.length > 255)
      throw new Error(`ref length ${a.length} exceeds maximum of 255`);
    if (o.length > 255)
      throw new Error(`topic length ${o.length} exceeds maximum of 255`);
    if (u.length > 255)
      throw new Error(`userEvent length ${u.length} exceeds maximum of 255`);
    if (d.length > 255)
      throw new Error(`metadata length ${d.length} exceeds maximum of 255`);
    const h = this.USER_BROADCAST_PUSH_META_LENGTH + l.length + a.length + o.length + u.length + d.length, f = new ArrayBuffer(this.HEADER_LENGTH + h);
    let g = new DataView(f), y = 0;
    g.setUint8(y++, this.KINDS.userBroadcastPush), g.setUint8(y++, l.length), g.setUint8(y++, a.length), g.setUint8(y++, o.length), g.setUint8(y++, u.length), g.setUint8(y++, d.length), g.setUint8(y++, n), Array.from(l, (p) => g.setUint8(y++, p.charCodeAt(0))), Array.from(a, (p) => g.setUint8(y++, p.charCodeAt(0))), Array.from(o, (p) => g.setUint8(y++, p.charCodeAt(0))), Array.from(u, (p) => g.setUint8(y++, p.charCodeAt(0))), Array.from(d, (p) => g.setUint8(y++, p.charCodeAt(0)));
    var w = new Uint8Array(f.byteLength + r.byteLength);
    return w.set(new Uint8Array(f), 0), w.set(new Uint8Array(r), f.byteLength), w.buffer;
  }
  decode(t, n) {
    if (this._isArrayBuffer(t)) {
      let r = this._binaryDecode(t);
      return n(r);
    }
    if (typeof t == "string") {
      const r = JSON.parse(t), [s, i, o, a, l] = r;
      return n({ join_ref: s, ref: i, topic: o, event: a, payload: l });
    }
    return n({});
  }
  _binaryDecode(t) {
    const n = new DataView(t), r = n.getUint8(0), s = new TextDecoder();
    switch (r) {
      case this.KINDS.userBroadcast:
        return this._decodeUserBroadcast(t, n, s);
    }
  }
  _decodeUserBroadcast(t, n, r) {
    const s = n.getUint8(1), i = n.getUint8(2), o = n.getUint8(3), a = n.getUint8(4);
    let l = this.HEADER_LENGTH + 4;
    const u = r.decode(t.slice(l, l + s));
    l = l + s;
    const c = r.decode(t.slice(l, l + i));
    l = l + i;
    const d = r.decode(t.slice(l, l + o));
    l = l + o;
    const h = t.slice(l, t.byteLength), f = a === this.JSON_ENCODING ? JSON.parse(r.decode(h)) : h, g = {
      type: this.BROADCAST_EVENT,
      event: c,
      payload: f
    };
    return o > 0 && (g.meta = JSON.parse(d)), { join_ref: null, ref: null, topic: u, event: this.BROADCAST_EVENT, payload: g };
  }
  _isArrayBuffer(t) {
    var n;
    return t instanceof ArrayBuffer || ((n = t == null ? void 0 : t.constructor) === null || n === void 0 ? void 0 : n.name) === "ArrayBuffer";
  }
  _pick(t, n) {
    return !t || typeof t != "object" ? {} : Object.fromEntries(Object.entries(t).filter(([r]) => n.includes(r)));
  }
}
class qb {
  constructor(t, n) {
    this.callback = t, this.timerCalc = n, this.timer = void 0, this.tries = 0, this.callback = t, this.timerCalc = n;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
var ee;
(function(e) {
  e.abstime = "abstime", e.bool = "bool", e.date = "date", e.daterange = "daterange", e.float4 = "float4", e.float8 = "float8", e.int2 = "int2", e.int4 = "int4", e.int4range = "int4range", e.int8 = "int8", e.int8range = "int8range", e.json = "json", e.jsonb = "jsonb", e.money = "money", e.numeric = "numeric", e.oid = "oid", e.reltime = "reltime", e.text = "text", e.time = "time", e.timestamp = "timestamp", e.timestamptz = "timestamptz", e.timetz = "timetz", e.tsrange = "tsrange", e.tstzrange = "tstzrange";
})(ee || (ee = {}));
const qg = (e, t, n = {}) => {
  var r;
  const s = (r = n.skipTypes) !== null && r !== void 0 ? r : [];
  return t ? Object.keys(t).reduce((i, o) => (i[o] = Qj(o, e, t, s), i), {}) : {};
}, Qj = (e, t, n, r) => {
  const s = t.find((a) => a.name === e), i = s == null ? void 0 : s.type, o = n[e];
  return i && !r.includes(i) ? Gb(i, o) : Md(o);
}, Gb = (e, t) => {
  if (e.charAt(0) === "_") {
    const n = e.slice(1, e.length);
    return Zj(t, n);
  }
  switch (e) {
    case ee.bool:
      return Yj(t);
    case ee.float4:
    case ee.float8:
    case ee.int2:
    case ee.int4:
    case ee.int8:
    case ee.numeric:
    case ee.oid:
      return Jj(t);
    case ee.json:
    case ee.jsonb:
      return Xj(t);
    case ee.timestamp:
      return eN(t);
    case ee.abstime:
    case ee.date:
    case ee.daterange:
    case ee.int4range:
    case ee.int8range:
    case ee.money:
    case ee.reltime:
    case ee.text:
    case ee.time:
    case ee.timestamptz:
    case ee.timetz:
    case ee.tsrange:
    case ee.tstzrange:
      return Md(t);
    default:
      return Md(t);
  }
}, Md = (e) => e, Yj = (e) => {
  switch (e) {
    case "t":
      return !0;
    case "f":
      return !1;
    default:
      return e;
  }
}, Jj = (e) => {
  if (typeof e == "string") {
    const t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return e;
}, Xj = (e) => {
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  return e;
}, Zj = (e, t) => {
  if (typeof e != "string")
    return e;
  const n = e.length - 1, r = e[n];
  if (e[0] === "{" && r === "}") {
    let i;
    const o = e.slice(1, n);
    try {
      i = JSON.parse("[" + o + "]");
    } catch {
      i = o ? o.split(",") : [];
    }
    return i.map((a) => Gb(t, a));
  }
  return e;
}, eN = (e) => typeof e == "string" ? e.replace(" ", "T") : e, Qb = (e) => {
  const t = new URL(e);
  return t.protocol = t.protocol.replace(/^ws/i, "http"), t.pathname = t.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), t.pathname === "" || t.pathname === "/" ? t.pathname = "/api/broadcast" : t.pathname = t.pathname + "/api/broadcast", t.href;
};
class Yu {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(t, n, r = {}, s = Id) {
    this.channel = t, this.event = n, this.payload = r, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
  }
  resend(t) {
    this.timeout = t, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
  }
  send() {
    this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    }));
  }
  updatePayload(t) {
    this.payload = Object.assign(Object.assign({}, this.payload), t);
  }
  receive(t, n) {
    var r;
    return this._hasReceived(t) && n((r = this.receivedResp) === null || r === void 0 ? void 0 : r.response), this.recHooks.push({ status: t, callback: n }), this;
  }
  startTimeout() {
    if (this.timeoutTimer)
      return;
    this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
    const t = (n) => {
      this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = n, this._matchReceive(n);
    };
    this.channel._on(this.refEvent, {}, t), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(t, n) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: t, response: n });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
  }
  _matchReceive({ status: t, response: n }) {
    this.recHooks.filter((r) => r.status === t).forEach((r) => r.callback(n));
  }
  _hasReceived(t) {
    return this.receivedResp && this.receivedResp.status === t;
  }
}
var Gg;
(function(e) {
  e.SYNC = "sync", e.JOIN = "join", e.LEAVE = "leave";
})(Gg || (Gg = {}));
class Li {
  /**
   * Creates a Presence helper that keeps the local presence state in sync with the server.
   *
   * @param channel - The realtime channel to bind to.
   * @param opts - Optional custom event names, e.g. `{ events: { state: 'state', diff: 'diff' } }`.
   *
   * @example
   * ```ts
   * const presence = new RealtimePresence(channel)
   *
   * channel.on('presence', ({ event, key }) => {
   *   console.log(`Presence ${event} on ${key}`)
   * })
   * ```
   */
  constructor(t, n) {
    this.channel = t, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = !1, this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const r = (n == null ? void 0 : n.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(r.state, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = Li.syncState(this.state, s, i, o), this.pendingDiffs.forEach((l) => {
        this.state = Li.syncDiff(this.state, l, i, o);
      }), this.pendingDiffs = [], a();
    }), this.channel._on(r.diff, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = Li.syncDiff(this.state, s, i, o), a());
    }), this.onJoin((s, i, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: s,
        currentPresences: i,
        newPresences: o
      });
    }), this.onLeave((s, i, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: s,
        currentPresences: i,
        leftPresences: o
      });
    }), this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(t, n, r, s) {
    const i = this.cloneDeep(t), o = this.transformState(n), a = {}, l = {};
    return this.map(i, (u, c) => {
      o[u] || (l[u] = c);
    }), this.map(o, (u, c) => {
      const d = i[u];
      if (d) {
        const h = c.map((w) => w.presence_ref), f = d.map((w) => w.presence_ref), g = c.filter((w) => f.indexOf(w.presence_ref) < 0), y = d.filter((w) => h.indexOf(w.presence_ref) < 0);
        g.length > 0 && (a[u] = g), y.length > 0 && (l[u] = y);
      } else
        a[u] = c;
    }), this.syncDiff(i, { joins: a, leaves: l }, r, s);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(t, n, r, s) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(n.joins),
      leaves: this.transformState(n.leaves)
    };
    return r || (r = () => {
    }), s || (s = () => {
    }), this.map(i, (a, l) => {
      var u;
      const c = (u = t[a]) !== null && u !== void 0 ? u : [];
      if (t[a] = this.cloneDeep(l), c.length > 0) {
        const d = t[a].map((f) => f.presence_ref), h = c.filter((f) => d.indexOf(f.presence_ref) < 0);
        t[a].unshift(...h);
      }
      r(a, c, l);
    }), this.map(o, (a, l) => {
      let u = t[a];
      if (!u)
        return;
      const c = l.map((d) => d.presence_ref);
      u = u.filter((d) => c.indexOf(d.presence_ref) < 0), t[a] = u, s(a, u, l), u.length === 0 && delete t[a];
    }), t;
  }
  /** @internal */
  static map(t, n) {
    return Object.getOwnPropertyNames(t).map((r) => n(r, t[r]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(t) {
    return t = this.cloneDeep(t), Object.getOwnPropertyNames(t).reduce((n, r) => {
      const s = t[r];
      return "metas" in s ? n[r] = s.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : n[r] = s, n;
    }, {});
  }
  /** @internal */
  static cloneDeep(t) {
    return JSON.parse(JSON.stringify(t));
  }
  /** @internal */
  onJoin(t) {
    this.caller.onJoin = t;
  }
  /** @internal */
  onLeave(t) {
    this.caller.onLeave = t;
  }
  /** @internal */
  onSync(t) {
    this.caller.onSync = t;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var Qg;
(function(e) {
  e.ALL = "*", e.INSERT = "INSERT", e.UPDATE = "UPDATE", e.DELETE = "DELETE";
})(Qg || (Qg = {}));
var $i;
(function(e) {
  e.BROADCAST = "broadcast", e.PRESENCE = "presence", e.POSTGRES_CHANGES = "postgres_changes", e.SYSTEM = "system";
})($i || ($i = {}));
var ln;
(function(e) {
  e.SUBSCRIBED = "SUBSCRIBED", e.TIMED_OUT = "TIMED_OUT", e.CLOSED = "CLOSED", e.CHANNEL_ERROR = "CHANNEL_ERROR";
})(ln || (ln = {}));
class gs {
  /**
   * Creates a channel that can broadcast messages, sync presence, and listen to Postgres changes.
   *
   * The topic determines which realtime stream you are subscribing to. Config options let you
   * enable acknowledgement for broadcasts, presence tracking, or private channels.
   *
   * @example
   * ```ts
   * import RealtimeClient from '@supabase/realtime-js'
   *
   * const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
   *   params: { apikey: 'public-anon-key' },
   * })
   * const channel = new RealtimeChannel('realtime:public:messages', { config: {} }, client)
   * ```
   */
  constructor(t, n = { config: {} }, r) {
    var s, i;
    if (this.topic = t, this.params = n, this.socket = r, this.bindings = {}, this.state = be.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = t.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "", enabled: !1 },
      private: !1
    }, n.config), this.timeout = this.socket.timeout, this.joinPush = new Yu(this, jt.join, this.params, this.timeout), this.rejoinTimer = new qb(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = be.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((o) => o.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = be.closed, this.socket._remove(this);
    }), this._onError((o) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, o), this.state = be.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = be.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("error", (o) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, o), this.state = be.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(jt.reply, {}, (o, a) => {
      this._trigger(this._replyEventName(a), o);
    }), this.presence = new Li(this), this.broadcastEndpointURL = Qb(this.socket.endPoint), this.private = this.params.config.private || !1, !this.private && (!((i = (s = this.params.config) === null || s === void 0 ? void 0 : s.broadcast) === null || i === void 0) && i.replay))
      throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
  }
  /** Subscribe registers your client with the server */
  subscribe(t, n = this.timeout) {
    var r, s, i;
    if (this.socket.isConnected() || this.socket.connect(), this.state == be.closed) {
      const { config: { broadcast: o, presence: a, private: l } } = this.params, u = (s = (r = this.bindings.postgres_changes) === null || r === void 0 ? void 0 : r.map((f) => f.filter)) !== null && s !== void 0 ? s : [], c = !!this.bindings[$i.PRESENCE] && this.bindings[$i.PRESENCE].length > 0 || ((i = this.params.config.presence) === null || i === void 0 ? void 0 : i.enabled) === !0, d = {}, h = {
        broadcast: o,
        presence: Object.assign(Object.assign({}, a), { enabled: c }),
        postgres_changes: u,
        private: l
      };
      this.socket.accessTokenValue && (d.access_token = this.socket.accessTokenValue), this._onError((f) => t == null ? void 0 : t(ln.CHANNEL_ERROR, f)), this._onClose(() => t == null ? void 0 : t(ln.CLOSED)), this.updateJoinPayload(Object.assign({ config: h }, d)), this.joinedOnce = !0, this._rejoin(n), this.joinPush.receive("ok", async ({ postgres_changes: f }) => {
        var g;
        if (this.socket._isManualToken() || this.socket.setAuth(), f === void 0) {
          t == null || t(ln.SUBSCRIBED);
          return;
        } else {
          const y = this.bindings.postgres_changes, w = (g = y == null ? void 0 : y.length) !== null && g !== void 0 ? g : 0, p = [];
          for (let m = 0; m < w; m++) {
            const v = y[m], { filter: { event: x, schema: S, table: k, filter: T } } = v, E = f && f[m];
            if (E && E.event === x && gs.isFilterValueEqual(E.schema, S) && gs.isFilterValueEqual(E.table, k) && gs.isFilterValueEqual(E.filter, T))
              p.push(Object.assign(Object.assign({}, v), { id: E.id }));
            else {
              this.unsubscribe(), this.state = be.errored, t == null || t(ln.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = p, t && t(ln.SUBSCRIBED);
          return;
        }
      }).receive("error", (f) => {
        this.state = be.errored, t == null || t(ln.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(f).join(", ") || "error")));
      }).receive("timeout", () => {
        t == null || t(ln.TIMED_OUT);
      });
    }
    return this;
  }
  /**
   * Returns the current presence state for this channel.
   *
   * The shape is a map keyed by presence key (for example a user id) where each entry contains the
   * tracked metadata for that user.
   */
  presenceState() {
    return this.presence.state;
  }
  /**
   * Sends the supplied payload to the presence tracker so other subscribers can see that this
   * client is online. Use `untrack` to stop broadcasting presence for the same key.
   */
  async track(t, n = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload: t
    }, n.timeout || this.timeout);
  }
  /**
   * Removes the current presence state for this client.
   */
  async untrack(t = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, t);
  }
  on(t, n, r) {
    return this.state === be.joined && t === $i.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(async () => await this.subscribe())), this._on(t, n, r);
  }
  /**
   * Sends a broadcast message explicitly via REST API.
   *
   * This method always uses the REST API endpoint regardless of WebSocket connection state.
   * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
   *
   * @param event The name of the broadcast event
   * @param payload Payload to be sent (required)
   * @param opts Options including timeout
   * @returns Promise resolving to object with success status, and error details if failed
   */
  async httpSend(t, n, r = {}) {
    var s;
    if (n == null)
      return Promise.reject("Payload is required for httpSend()");
    const i = {
      apikey: this.socket.apiKey ? this.socket.apiKey : "",
      "Content-Type": "application/json"
    };
    this.socket.accessTokenValue && (i.Authorization = `Bearer ${this.socket.accessTokenValue}`);
    const o = {
      method: "POST",
      headers: i,
      body: JSON.stringify({
        messages: [
          {
            topic: this.subTopic,
            event: t,
            payload: n,
            private: this.private
          }
        ]
      })
    }, a = await this._fetchWithTimeout(this.broadcastEndpointURL, o, (s = r.timeout) !== null && s !== void 0 ? s : this.timeout);
    if (a.status === 202)
      return { success: !0 };
    let l = a.statusText;
    try {
      const u = await a.json();
      l = u.error || u.message || l;
    } catch {
    }
    return Promise.reject(new Error(l));
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(t, n = {}) {
    var r, s;
    if (!this._canPush() && t.type === "broadcast") {
      console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
      const { event: i, payload: o } = t, a = {
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": "application/json"
      };
      this.socket.accessTokenValue && (a.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      const l = {
        method: "POST",
        headers: a,
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: i,
              payload: o,
              private: this.private
            }
          ]
        })
      };
      try {
        const u = await this._fetchWithTimeout(this.broadcastEndpointURL, l, (r = n.timeout) !== null && r !== void 0 ? r : this.timeout);
        return await ((s = u.body) === null || s === void 0 ? void 0 : s.cancel()), u.ok ? "ok" : "error";
      } catch (u) {
        return u.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((i) => {
        var o, a, l;
        const u = this._push(t.type, t, n.timeout || this.timeout);
        t.type === "broadcast" && !(!((l = (a = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || a === void 0 ? void 0 : a.broadcast) === null || l === void 0) && l.ack) && i("ok"), u.receive("ok", () => i("ok")), u.receive("error", () => i("error")), u.receive("timeout", () => i("timed out"));
      });
  }
  /**
   * Updates the payload that will be sent the next time the channel joins (reconnects).
   * Useful for rotating access tokens or updating config without re-creating the channel.
   */
  updateJoinPayload(t) {
    this.joinPush.updatePayload(t);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(t = this.timeout) {
    this.state = be.leaving;
    const n = () => {
      this.socket.log("channel", `leave ${this.topic}`), this._trigger(jt.close, "leave", this._joinRef());
    };
    this.joinPush.destroy();
    let r = null;
    return new Promise((s) => {
      r = new Yu(this, jt.leave, {}, t), r.receive("ok", () => {
        n(), s("ok");
      }).receive("timeout", () => {
        n(), s("timed out");
      }).receive("error", () => {
        s("error");
      }), r.send(), this._canPush() || r.trigger("ok", {});
    }).finally(() => {
      r == null || r.destroy();
    });
  }
  /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */
  teardown() {
    this.pushBuffer.forEach((t) => t.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = be.closed, this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(t, n, r) {
    const s = new AbortController(), i = setTimeout(() => s.abort(), r), o = await this.socket.fetch(t, Object.assign(Object.assign({}, n), { signal: s.signal }));
    return clearTimeout(i), o;
  }
  /** @internal */
  _push(t, n, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new Yu(this, t, n, r);
    return this._canPush() ? s.send() : this._addToPushBuffer(s), s;
  }
  /** @internal */
  _addToPushBuffer(t) {
    if (t.startTimeout(), this.pushBuffer.push(t), this.pushBuffer.length > qj) {
      const n = this.pushBuffer.shift();
      n && (n.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${n.event}`, n.payload));
    }
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(t, n, r) {
    return n;
  }
  /** @internal */
  _isMember(t) {
    return this.topic === t;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(t, n, r) {
    var s, i;
    const o = t.toLocaleLowerCase(), { close: a, error: l, leave: u, join: c } = jt;
    if (r && [a, l, u, c].indexOf(o) >= 0 && r !== this._joinRef())
      return;
    let h = this._onMessage(o, n, r);
    if (n && !h)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter((f) => {
      var g, y, w;
      return ((g = f.filter) === null || g === void 0 ? void 0 : g.event) === "*" || ((w = (y = f.filter) === null || y === void 0 ? void 0 : y.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase()) === o;
    }).map((f) => f.callback(h, r)) : (i = this.bindings[o]) === null || i === void 0 || i.filter((f) => {
      var g, y, w, p, m, v;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in f) {
          const x = f.id, S = (g = f.filter) === null || g === void 0 ? void 0 : g.event;
          return x && ((y = n.ids) === null || y === void 0 ? void 0 : y.includes(x)) && (S === "*" || (S == null ? void 0 : S.toLocaleLowerCase()) === ((w = n.data) === null || w === void 0 ? void 0 : w.type.toLocaleLowerCase()));
        } else {
          const x = (m = (p = f == null ? void 0 : f.filter) === null || p === void 0 ? void 0 : p.event) === null || m === void 0 ? void 0 : m.toLocaleLowerCase();
          return x === "*" || x === ((v = n == null ? void 0 : n.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase());
        }
      else
        return f.type.toLocaleLowerCase() === o;
    }).map((f) => {
      if (typeof h == "object" && "ids" in h) {
        const g = h.data, { schema: y, table: w, commit_timestamp: p, type: m, errors: v } = g;
        h = Object.assign(Object.assign({}, {
          schema: y,
          table: w,
          commit_timestamp: p,
          eventType: m,
          new: {},
          old: {},
          errors: v
        }), this._getPayloadRecords(g));
      }
      f.callback(h, r);
    });
  }
  /** @internal */
  _isClosed() {
    return this.state === be.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === be.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === be.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === be.leaving;
  }
  /** @internal */
  _replyEventName(t) {
    return `chan_reply_${t}`;
  }
  /** @internal */
  _on(t, n, r) {
    const s = t.toLocaleLowerCase(), i = {
      type: s,
      filter: n,
      callback: r
    };
    return this.bindings[s] ? this.bindings[s].push(i) : this.bindings[s] = [i], this;
  }
  /** @internal */
  _off(t, n) {
    const r = t.toLocaleLowerCase();
    return this.bindings[r] && (this.bindings[r] = this.bindings[r].filter((s) => {
      var i;
      return !(((i = s.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === r && gs.isEqual(s.filter, n));
    })), this;
  }
  /** @internal */
  static isEqual(t, n) {
    if (Object.keys(t).length !== Object.keys(n).length)
      return !1;
    for (const r in t)
      if (t[r] !== n[r])
        return !1;
    return !0;
  }
  /**
   * Compares two optional filter values for equality.
   * Treats undefined, null, and empty string as equivalent empty values.
   * @internal
   */
  static isFilterValueEqual(t, n) {
    return (t ?? void 0) === (n ?? void 0);
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(t) {
    this._on(jt.close, {}, t);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(t) {
    this._on(jt.error, {}, (n) => t(n));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(t = this.timeout) {
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = be.joining, this.joinPush.resend(t));
  }
  /** @internal */
  _getPayloadRecords(t) {
    const n = {
      new: {},
      old: {}
    };
    return (t.type === "INSERT" || t.type === "UPDATE") && (n.new = qg(t.columns, t.record)), (t.type === "UPDATE" || t.type === "DELETE") && (n.old = qg(t.columns, t.old_record)), n;
  }
}
const Ju = () => {
}, la = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
}, tN = [1e3, 2e3, 5e3, 1e4], nN = 1e4, rN = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class sN {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.heartbeatCallback The optional function to handle heartbeat status and latency.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.logLevel Sets the log level for Realtime
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   * @param options.vsn The protocol version to use when connecting. Supported versions are "1.0.0" and "2.0.0". Defaults to "2.0.0".
   * @example
   * ```ts
   * import RealtimeClient from '@supabase/realtime-js'
   *
   * const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
   *   params: { apikey: 'public-anon-key' },
   * })
   * client.connect()
   * ```
   */
  constructor(t, n) {
    var r;
    if (this.accessTokenValue = null, this.apiKey = null, this._manuallySetToken = !1, this.channels = new Array(), this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = Id, this.transport = null, this.heartbeatIntervalMs = la.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = Ju, this.ref = 0, this.reconnectTimer = null, this.vsn = Kg, this.logger = Ju, this.conn = null, this.sendBuffer = [], this.serializer = new Gj(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = !1, this._authPromise = null, this._heartbeatSentAt = null, this._resolveFetch = (s) => s ? (...i) => s(...i) : (...i) => fetch(...i), !(!((r = n == null ? void 0 : n.params) === null || r === void 0) && r.apikey))
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = n.params.apikey, this.endPoint = `${t}/${Dd.websocket}`, this.httpEndpoint = Qb(t), this._initializeOptions(n), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(n == null ? void 0 : n.fetch);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (!(this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected())) {
      if (this._setConnectionState("connecting"), this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this.transport)
        this.conn = new this.transport(this.endpointURL());
      else
        try {
          this.conn = Bj.createWebSocket(this.endpointURL());
        } catch (t) {
          this._setConnectionState("disconnected");
          const n = t.message;
          throw n.includes("Node.js") ? new Error(`${n}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`) : new Error(`WebSocket not available: ${n}`);
        }
      this._setupConnectionHandlers();
    }
  }
  /**
   * Returns the URL of the websocket.
   * @returns string The URL of the websocket.
   */
  endpointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: this.vsn }));
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(t, n) {
    if (!this.isDisconnecting())
      if (this._setConnectionState("disconnecting", !0), this.conn) {
        const r = setTimeout(() => {
          this._setConnectionState("disconnected");
        }, 100);
        this.conn.onclose = () => {
          clearTimeout(r), this._setConnectionState("disconnected");
        }, typeof this.conn.close == "function" && (t ? this.conn.close(t, n ?? "") : this.conn.close()), this._teardownConnection();
      } else
        this._setConnectionState("disconnected");
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(t) {
    const n = await t.unsubscribe();
    return this.channels.length === 0 && this.disconnect(), n;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const t = await Promise.all(this.channels.map((n) => n.unsubscribe()));
    return this.channels = [], this.disconnect(), t;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(t, n, r) {
    this.logger(t, n, r);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case Rn.connecting:
        return vr.Connecting;
      case Rn.open:
        return vr.Open;
      case Rn.closing:
        return vr.Closing;
      default:
        return vr.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === vr.Open;
  }
  /**
   * Returns `true` if the connection is currently connecting.
   */
  isConnecting() {
    return this._connectionState === "connecting";
  }
  /**
   * Returns `true` if the connection is currently disconnecting.
   */
  isDisconnecting() {
    return this._connectionState === "disconnecting";
  }
  /**
   * Creates (or reuses) a {@link RealtimeChannel} for the provided topic.
   *
   * Topics are automatically prefixed with `realtime:` to match the Realtime service.
   * If a channel with the same topic already exists it will be returned instead of creating
   * a duplicate connection.
   */
  channel(t, n = { config: {} }) {
    const r = `realtime:${t}`, s = this.getChannels().find((i) => i.topic === r);
    if (s)
      return s;
    {
      const i = new gs(`realtime:${t}`, n, this);
      return this.channels.push(i), i;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(t) {
    const { topic: n, event: r, payload: s, ref: i } = t, o = () => {
      this.encode(t, (a) => {
        var l;
        (l = this.conn) === null || l === void 0 || l.send(a);
      });
    };
    this.log("push", `${n} ${r} (${i})`, s), this.isConnected() ? o() : this.sendBuffer.push(o);
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * If param is null it will use the `accessToken` callback function or the token set on the client.
   *
   * On callback used, it will set the value of the token internal to the client.
   *
   * When a token is explicitly provided, it will be preserved across channel operations
   * (including removeChannel and resubscribe). The `accessToken` callback will not be
   * invoked until `setAuth()` is called without arguments.
   *
   * @param token A JWT string to override the token set on the client.
   *
   * @example
   * // Use a manual token (preserved across resubscribes, ignores accessToken callback)
   * client.realtime.setAuth('my-custom-jwt')
   *
   * // Switch back to using the accessToken callback
   * client.realtime.setAuth()
   */
  async setAuth(t = null) {
    this._authPromise = this._performAuth(t);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  /**
   * Returns true if the current access token was explicitly set via setAuth(token),
   * false if it was obtained via the accessToken callback.
   * @internal
   */
  _isManualToken() {
    return this._manuallySetToken;
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var t;
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (n) {
        this.log("error", "error in heartbeat callback", n);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null, this._heartbeatSentAt = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      try {
        this.heartbeatCallback("timeout");
      } catch (n) {
        this.log("error", "error in heartbeat callback", n);
      }
      this._wasManualDisconnect = !1, (t = this.conn) === null || t === void 0 || t.close(Kj, "heartbeat timeout"), setTimeout(() => {
        var n;
        this.isConnected() || (n = this.reconnectTimer) === null || n === void 0 || n.scheduleTimeout();
      }, la.HEARTBEAT_TIMEOUT_FALLBACK);
      return;
    }
    this._heartbeatSentAt = Date.now(), this.pendingHeartbeatRef = this._makeRef(), this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    try {
      this.heartbeatCallback("sent");
    } catch (n) {
      this.log("error", "error in heartbeat callback", n);
    }
    this._setAuthSafely("heartbeat");
  }
  /**
   * Sets a callback that receives lifecycle events for internal heartbeat messages.
   * Useful for instrumenting connection health (e.g. sent/ok/timeout/disconnected).
   */
  onHeartbeat(t) {
    this.heartbeatCallback = t;
  }
  /**
   * Flushes send buffer
   */
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((t) => t()), this.sendBuffer = []);
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let t = this.ref + 1;
    return t === this.ref ? this.ref = 0 : this.ref = t, this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(t) {
    let n = this.channels.find((r) => r.topic === t && (r._isJoined() || r._isJoining()));
    n && (this.log("transport", `leaving duplicate topic "${t}"`), n.unsubscribe());
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(t) {
    this.channels = this.channels.filter((n) => n.topic !== t.topic);
  }
  /** @internal */
  _onConnMessage(t) {
    this.decode(t.data, (n) => {
      if (n.topic === "phoenix" && n.event === "phx_reply" && n.ref && n.ref === this.pendingHeartbeatRef) {
        const u = this._heartbeatSentAt ? Date.now() - this._heartbeatSentAt : void 0;
        try {
          this.heartbeatCallback(n.payload.status === "ok" ? "ok" : "error", u);
        } catch (c) {
          this.log("error", "error in heartbeat callback", c);
        }
        this._heartbeatSentAt = null, this.pendingHeartbeatRef = null;
      }
      const { topic: r, event: s, payload: i, ref: o } = n, a = o ? `(${o})` : "", l = i.status || "";
      this.log("receive", `${l} ${r} ${s} ${a}`.trim(), i), this.channels.filter((u) => u._isMember(r)).forEach((u) => u._trigger(s, i, o)), this._triggerStateCallbacks("message", n);
    });
  }
  /**
   * Clear specific timer
   * @internal
   */
  _clearTimer(t) {
    var n;
    t === "heartbeat" && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : t === "reconnect" && ((n = this.reconnectTimer) === null || n === void 0 || n.reset());
  }
  /**
   * Clear all timers
   * @internal
   */
  _clearAllTimers() {
    this._clearTimer("heartbeat"), this._clearTimer("reconnect");
  }
  /**
   * Setup connection handlers for WebSocket events
   * @internal
   */
  _setupConnectionHandlers() {
    this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (t) => this._onConnError(t), this.conn.onmessage = (t) => this._onConnMessage(t), this.conn.onclose = (t) => this._onConnClose(t), this.conn.readyState === Rn.open && this._onConnOpen());
  }
  /**
   * Teardown connection and cleanup resources
   * @internal
   */
  _teardownConnection() {
    if (this.conn) {
      if (this.conn.readyState === Rn.open || this.conn.readyState === Rn.connecting)
        try {
          this.conn.close();
        } catch (t) {
          this.log("error", "Error closing connection", t);
        }
      this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null;
    }
    this._clearAllTimers(), this._terminateWorker(), this.channels.forEach((t) => t.teardown());
  }
  /** @internal */
  _onConnOpen() {
    this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).then(() => {
      this.flushSendBuffer();
    }).catch((n) => {
      this.log("error", "error waiting for auth on connect", n), this.flushSendBuffer();
    }), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
  }
  /** @internal */
  _startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  /** @internal */
  _startWorkerHeartbeat() {
    this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
    const t = this._workerObjectUrl(this.workerUrl);
    this.workerRef = new Worker(t), this.workerRef.onerror = (n) => {
      this.log("worker", "worker error", n.message), this._terminateWorker();
    }, this.workerRef.onmessage = (n) => {
      n.data.event === "keepAlive" && this.sendHeartbeat();
    }, this.workerRef.postMessage({
      event: "start",
      interval: this.heartbeatIntervalMs
    });
  }
  /**
   * Terminate the Web Worker and clear the reference
   * @internal
   */
  _terminateWorker() {
    this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
  }
  /** @internal */
  _onConnClose(t) {
    var n;
    this._setConnectionState("disconnected"), this.log("transport", "close", t), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || (n = this.reconnectTimer) === null || n === void 0 || n.scheduleTimeout(), this._triggerStateCallbacks("close", t);
  }
  /** @internal */
  _onConnError(t) {
    this._setConnectionState("disconnected"), this.log("transport", `${t}`), this._triggerChanError(), this._triggerStateCallbacks("error", t);
    try {
      this.heartbeatCallback("error");
    } catch (n) {
      this.log("error", "error in heartbeat callback", n);
    }
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((t) => t._trigger(jt.error));
  }
  /** @internal */
  _appendParams(t, n) {
    if (Object.keys(n).length === 0)
      return t;
    const r = t.match(/\?/) ? "&" : "?", s = new URLSearchParams(n);
    return `${t}${r}${s}`;
  }
  _workerObjectUrl(t) {
    let n;
    if (t)
      n = t;
    else {
      const r = new Blob([rN], { type: "application/javascript" });
      n = URL.createObjectURL(r);
    }
    return n;
  }
  /**
   * Set connection state with proper state management
   * @internal
   */
  _setConnectionState(t, n = !1) {
    this._connectionState = t, t === "connecting" ? this._wasManualDisconnect = !1 : t === "disconnecting" && (this._wasManualDisconnect = n);
  }
  /**
   * Perform the actual auth operation
   * @internal
   */
  async _performAuth(t = null) {
    let n, r = !1;
    if (t)
      n = t, r = !0;
    else if (this.accessToken)
      try {
        n = await this.accessToken();
      } catch (s) {
        this.log("error", "Error fetching access token from callback", s), n = this.accessTokenValue;
      }
    else
      n = this.accessTokenValue;
    r ? this._manuallySetToken = !0 : this.accessToken && (this._manuallySetToken = !1), this.accessTokenValue != n && (this.accessTokenValue = n, this.channels.forEach((s) => {
      const i = {
        access_token: n,
        version: Wj
      };
      n && s.updateJoinPayload(i), s.joinedOnce && s._isJoined() && s._push(jt.access_token, {
        access_token: n
      });
    }));
  }
  /**
   * Wait for any in-flight auth operations to complete
   * @internal
   */
  async _waitForAuthIfNeeded() {
    this._authPromise && await this._authPromise;
  }
  /**
   * Safely call setAuth with standardized error handling
   * @internal
   */
  _setAuthSafely(t = "general") {
    this._isManualToken() || this.setAuth().catch((n) => {
      this.log("error", `Error setting auth in ${t}`, n);
    });
  }
  /**
   * Trigger state change callbacks with proper error handling
   * @internal
   */
  _triggerStateCallbacks(t, n) {
    try {
      this.stateChangeCallbacks[t].forEach((r) => {
        try {
          r(n);
        } catch (s) {
          this.log("error", `error in ${t} callback`, s);
        }
      });
    } catch (r) {
      this.log("error", `error triggering ${t} callbacks`, r);
    }
  }
  /**
   * Setup reconnection timer with proper configuration
   * @internal
   */
  _setupReconnectionTimer() {
    this.reconnectTimer = new qb(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
      }, la.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(t) {
    var n, r, s, i, o, a, l, u, c, d, h, f;
    switch (this.transport = (n = t == null ? void 0 : t.transport) !== null && n !== void 0 ? n : null, this.timeout = (r = t == null ? void 0 : t.timeout) !== null && r !== void 0 ? r : Id, this.heartbeatIntervalMs = (s = t == null ? void 0 : t.heartbeatIntervalMs) !== null && s !== void 0 ? s : la.HEARTBEAT_INTERVAL, this.worker = (i = t == null ? void 0 : t.worker) !== null && i !== void 0 ? i : !1, this.accessToken = (o = t == null ? void 0 : t.accessToken) !== null && o !== void 0 ? o : null, this.heartbeatCallback = (a = t == null ? void 0 : t.heartbeatCallback) !== null && a !== void 0 ? a : Ju, this.vsn = (l = t == null ? void 0 : t.vsn) !== null && l !== void 0 ? l : Kg, t != null && t.params && (this.params = t.params), t != null && t.logger && (this.logger = t.logger), (t != null && t.logLevel || t != null && t.log_level) && (this.logLevel = t.logLevel || t.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = (u = t == null ? void 0 : t.reconnectAfterMs) !== null && u !== void 0 ? u : (g) => tN[g - 1] || nN, this.vsn) {
      case Hj:
        this.encode = (c = t == null ? void 0 : t.encode) !== null && c !== void 0 ? c : (g, y) => y(JSON.stringify(g)), this.decode = (d = t == null ? void 0 : t.decode) !== null && d !== void 0 ? d : (g, y) => y(JSON.parse(g));
        break;
      case Kb:
        this.encode = (h = t == null ? void 0 : t.encode) !== null && h !== void 0 ? h : this.serializer.encode.bind(this.serializer), this.decode = (f = t == null ? void 0 : t.decode) !== null && f !== void 0 ? f : this.serializer.decode.bind(this.serializer);
        break;
      default:
        throw new Error(`Unsupported serializer version: ${this.vsn}`);
    }
    if (this.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.workerUrl = t == null ? void 0 : t.workerUrl;
    }
  }
}
var ho = class extends Error {
  constructor(e, t) {
    var n;
    super(e), this.name = "IcebergError", this.status = t.status, this.icebergType = t.icebergType, this.icebergCode = t.icebergCode, this.details = t.details, this.isCommitStateUnknown = t.icebergType === "CommitStateUnknownException" || [500, 502, 504].includes(t.status) && ((n = t.icebergType) == null ? void 0 : n.includes("CommitState")) === !0;
  }
  /**
   * Returns true if the error is a 404 Not Found error.
   */
  isNotFound() {
    return this.status === 404;
  }
  /**
   * Returns true if the error is a 409 Conflict error.
   */
  isConflict() {
    return this.status === 409;
  }
  /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function iN(e, t, n) {
  const r = new URL(t, e);
  if (n)
    for (const [s, i] of Object.entries(n))
      i !== void 0 && r.searchParams.set(s, i);
  return r.toString();
}
async function oN(e) {
  return !e || e.type === "none" ? {} : e.type === "bearer" ? { Authorization: `Bearer ${e.token}` } : e.type === "header" ? { [e.name]: e.value } : e.type === "custom" ? await e.getHeaders() : {};
}
function aN(e) {
  const t = e.fetchImpl ?? globalThis.fetch;
  return {
    async request({
      method: n,
      path: r,
      query: s,
      body: i,
      headers: o
    }) {
      const a = iN(e.baseUrl, r, s), l = await oN(e.auth), u = await t(a, {
        method: n,
        headers: {
          ...i ? { "Content-Type": "application/json" } : {},
          ...l,
          ...o
        },
        body: i ? JSON.stringify(i) : void 0
      }), c = await u.text(), d = (u.headers.get("content-type") || "").includes("application/json"), h = d && c ? JSON.parse(c) : c;
      if (!u.ok) {
        const f = d ? h : void 0, g = f == null ? void 0 : f.error;
        throw new ho(
          (g == null ? void 0 : g.message) ?? `Request failed with status ${u.status}`,
          {
            status: u.status,
            icebergType: g == null ? void 0 : g.type,
            icebergCode: g == null ? void 0 : g.code,
            details: f
          }
        );
      }
      return { status: u.status, headers: u.headers, data: h };
    }
  };
}
function ua(e) {
  return e.join("");
}
var lN = class {
  constructor(e, t = "") {
    this.client = e, this.prefix = t;
  }
  async listNamespaces(e) {
    const t = e ? { parent: ua(e.namespace) } : void 0;
    return (await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces`,
      query: t
    })).data.namespaces.map((r) => ({ namespace: r }));
  }
  async createNamespace(e, t) {
    const n = {
      namespace: e.namespace,
      properties: t == null ? void 0 : t.properties
    };
    return (await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces`,
      body: n
    })).data;
  }
  async dropNamespace(e) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${ua(e.namespace)}`
    });
  }
  async loadNamespaceMetadata(e) {
    return {
      properties: (await this.client.request({
        method: "GET",
        path: `${this.prefix}/namespaces/${ua(e.namespace)}`
      })).data.properties
    };
  }
  async namespaceExists(e) {
    try {
      return await this.client.request({
        method: "HEAD",
        path: `${this.prefix}/namespaces/${ua(e.namespace)}`
      }), !0;
    } catch (t) {
      if (t instanceof ho && t.status === 404)
        return !1;
      throw t;
    }
  }
  async createNamespaceIfNotExists(e, t) {
    try {
      return await this.createNamespace(e, t);
    } catch (n) {
      if (n instanceof ho && n.status === 409)
        return;
      throw n;
    }
  }
};
function Hr(e) {
  return e.join("");
}
var uN = class {
  constructor(e, t = "", n) {
    this.client = e, this.prefix = t, this.accessDelegation = n;
  }
  async listTables(e) {
    return (await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables`
    })).data.identifiers;
  }
  async createTable(e, t) {
    const n = {};
    return this.accessDelegation && (n["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables`,
      body: t,
      headers: n
    })).data.metadata;
  }
  async updateTable(e, t) {
    const n = await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables/${e.name}`,
      body: t
    });
    return {
      "metadata-location": n.data["metadata-location"],
      metadata: n.data.metadata
    };
  }
  async dropTable(e, t) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables/${e.name}`,
      query: { purgeRequested: String((t == null ? void 0 : t.purge) ?? !1) }
    });
  }
  async loadTable(e) {
    const t = {};
    return this.accessDelegation && (t["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables/${e.name}`,
      headers: t
    })).data.metadata;
  }
  async tableExists(e) {
    const t = {};
    this.accessDelegation && (t["X-Iceberg-Access-Delegation"] = this.accessDelegation);
    try {
      return await this.client.request({
        method: "HEAD",
        path: `${this.prefix}/namespaces/${Hr(e.namespace)}/tables/${e.name}`,
        headers: t
      }), !0;
    } catch (n) {
      if (n instanceof ho && n.status === 404)
        return !1;
      throw n;
    }
  }
  async createTableIfNotExists(e, t) {
    try {
      return await this.createTable(e, t);
    } catch (n) {
      if (n instanceof ho && n.status === 409)
        return await this.loadTable({ namespace: e.namespace, name: t.name });
      throw n;
    }
  }
}, cN = class {
  /**
   * Creates a new Iceberg REST Catalog client.
   *
   * @param options - Configuration options for the catalog client
   */
  constructor(e) {
    var r;
    let t = "v1";
    e.catalogName && (t += `/${e.catalogName}`);
    const n = e.baseUrl.endsWith("/") ? e.baseUrl : `${e.baseUrl}/`;
    this.client = aN({
      baseUrl: n,
      auth: e.auth,
      fetchImpl: e.fetch
    }), this.accessDelegation = (r = e.accessDelegation) == null ? void 0 : r.join(","), this.namespaceOps = new lN(this.client, t), this.tableOps = new uN(this.client, t, this.accessDelegation);
  }
  /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */
  async listNamespaces(e) {
    return this.namespaceOps.listNamespaces(e);
  }
  /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */
  async createNamespace(e, t) {
    return this.namespaceOps.createNamespace(e, t);
  }
  /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */
  async dropNamespace(e) {
    await this.namespaceOps.dropNamespace(e);
  }
  /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */
  async loadNamespaceMetadata(e) {
    return this.namespaceOps.loadNamespaceMetadata(e);
  }
  /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */
  async listTables(e) {
    return this.tableOps.listTables(e);
  }
  /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */
  async createTable(e, t) {
    return this.tableOps.createTable(e, t);
  }
  /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */
  async updateTable(e, t) {
    return this.tableOps.updateTable(e, t);
  }
  /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */
  async dropTable(e, t) {
    await this.tableOps.dropTable(e, t);
  }
  /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */
  async loadTable(e) {
    return this.tableOps.loadTable(e);
  }
  /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */
  async namespaceExists(e) {
    return this.namespaceOps.namespaceExists(e);
  }
  /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */
  async tableExists(e) {
    return this.tableOps.tableExists(e);
  }
  /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */
  async createNamespaceIfNotExists(e, t) {
    return this.namespaceOps.createNamespaceIfNotExists(e, t);
  }
  /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */
  async createTableIfNotExists(e, t) {
    return this.tableOps.createTableIfNotExists(e, t);
  }
}, Yl = class extends Error {
  constructor(e, t = "storage", n, r) {
    super(e), this.__isStorageError = !0, this.namespace = t, this.name = t === "vectors" ? "StorageVectorsError" : "StorageError", this.status = n, this.statusCode = r;
  }
};
function Jl(e) {
  return typeof e == "object" && e !== null && "__isStorageError" in e;
}
var ca = class extends Yl {
  constructor(e, t, n, r = "storage") {
    super(e, r, t, n), this.name = r === "vectors" ? "StorageVectorsApiError" : "StorageApiError", this.status = t, this.statusCode = n;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}, Yb = class extends Yl {
  constructor(e, t, n = "storage") {
    super(e, n), this.name = n === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t;
  }
};
const dN = (e) => e ? (...t) => e(...t) : (...t) => fetch(...t), hN = (e) => {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Ld = (e) => {
  if (Array.isArray(e)) return e.map((n) => Ld(n));
  if (typeof e == "function" || e !== Object(e)) return e;
  const t = {};
  return Object.entries(e).forEach(([n, r]) => {
    const s = n.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    t[s] = Ld(r);
  }), t;
}, fN = (e) => !e || typeof e != "string" || e.length === 0 || e.length > 100 || e.trim() !== e || e.includes("/") || e.includes("\\") ? !1 : /^[\w!.\*'() &$@=;:+,?-]+$/.test(e);
function fo(e) {
  "@babel/helpers - typeof";
  return fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fo(e);
}
function pN(e, t) {
  if (fo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (fo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function mN(e) {
  var t = pN(e, "string");
  return fo(t) == "symbol" ? t : t + "";
}
function gN(e, t, n) {
  return (t = mN(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Yg(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function B(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yg(Object(n), !0).forEach(function(r) {
      gN(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yg(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const Jg = (e) => {
  var t;
  return e.msg || e.message || e.error_description || (typeof e.error == "string" ? e.error : (t = e.error) === null || t === void 0 ? void 0 : t.message) || JSON.stringify(e);
}, yN = async (e, t, n, r) => {
  if (e && typeof e == "object" && "status" in e && "ok" in e && typeof e.status == "number" && !(n != null && n.noResolveJson)) {
    const s = e, i = s.status || 500;
    if (typeof s.json == "function") s.json().then((o) => {
      const a = (o == null ? void 0 : o.statusCode) || (o == null ? void 0 : o.code) || i + "";
      t(new ca(Jg(o), i, a, r));
    }).catch(() => {
      if (r === "vectors") {
        const o = i + "";
        t(new ca(s.statusText || `HTTP ${i} error`, i, o, r));
      } else {
        const o = i + "";
        t(new ca(s.statusText || `HTTP ${i} error`, i, o, r));
      }
    });
    else {
      const o = i + "";
      t(new ca(s.statusText || `HTTP ${i} error`, i, o, r));
    }
  } else t(new Yb(Jg(e), e, r));
}, vN = (e, t, n, r) => {
  const s = {
    method: e,
    headers: (t == null ? void 0 : t.headers) || {}
  };
  return e === "GET" || e === "HEAD" || !r ? B(B({}, s), n) : (hN(r) ? (s.headers = B({ "Content-Type": "application/json" }, t == null ? void 0 : t.headers), s.body = JSON.stringify(r)) : s.body = r, t != null && t.duplex && (s.duplex = t.duplex), B(B({}, s), n));
};
async function mi(e, t, n, r, s, i, o) {
  return new Promise((a, l) => {
    e(n, vN(t, r, s, i)).then((u) => {
      if (!u.ok) throw u;
      if (r != null && r.noResolveJson) return u;
      if (o === "vectors") {
        const c = u.headers.get("content-type");
        if (!c || !c.includes("application/json")) return {};
      }
      return u.json();
    }).then((u) => a(u)).catch((u) => yN(u, l, r, o));
  });
}
function wN(e = "storage") {
  return {
    get: async (t, n, r, s) => mi(t, "GET", n, r, s, void 0, e),
    post: async (t, n, r, s, i) => mi(t, "POST", n, s, i, r, e),
    put: async (t, n, r, s, i) => mi(t, "PUT", n, s, i, r, e),
    head: async (t, n, r, s) => mi(t, "HEAD", n, B(B({}, r), {}, { noResolveJson: !0 }), s, void 0, e),
    remove: async (t, n, r, s, i) => mi(t, "DELETE", n, s, i, r, e)
  };
}
const xN = wN("storage"), { get: po, post: ae, put: $d, head: bN, remove: Df } = xN;
var ti = class {
  /**
  * Creates a new BaseApiClient instance
  * @param url - Base URL for API requests
  * @param headers - Default headers for API requests
  * @param fetch - Optional custom fetch implementation
  * @param namespace - Error namespace ('storage' or 'vectors')
  */
  constructor(e, t = {}, n, r = "storage") {
    this.shouldThrowOnError = !1, this.url = e, this.headers = t, this.fetch = dN(n), this.namespace = r;
  }
  /**
  * Enable throwing errors instead of returning them.
  * When enabled, errors are thrown instead of returned in { data, error } format.
  *
  * @returns this - For method chaining
  */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
  * Handles API operation with standardized error handling
  * Eliminates repetitive try-catch blocks across all API methods
  *
  * This wrapper:
  * 1. Executes the operation
  * 2. Returns { data, error: null } on success
  * 3. Returns { data: null, error } on failure (if shouldThrowOnError is false)
  * 4. Throws error on failure (if shouldThrowOnError is true)
  *
  * @typeParam T - The expected data type from the operation
  * @param operation - Async function that performs the API call
  * @returns Promise with { data, error } tuple
  *
  * @example
  * ```typescript
  * async listBuckets() {
  *   return this.handleOperation(async () => {
  *     return await get(this.fetch, `${this.url}/bucket`, {
  *       headers: this.headers,
  *     })
  *   })
  * }
  * ```
  */
  async handleOperation(e) {
    var t = this;
    try {
      return {
        data: await e(),
        error: null
      };
    } catch (n) {
      if (t.shouldThrowOnError) throw n;
      if (Jl(n)) return {
        data: null,
        error: n
      };
      throw n;
    }
  }
}, SN = class {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  async execute() {
    var e = this;
    try {
      return {
        data: (await e.downloadFn()).body,
        error: null
      };
    } catch (t) {
      if (e.shouldThrowOnError) throw t;
      if (Jl(t)) return {
        data: null,
        error: t
      };
      throw t;
    }
  }
};
let Jb;
Jb = Symbol.toStringTag;
var _N = class {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t, this[Jb] = "BlobDownloadBuilder", this.promise = null;
  }
  asStream() {
    return new SN(this.downloadFn, this.shouldThrowOnError);
  }
  then(e, t) {
    return this.getPromise().then(e, t);
  }
  catch(e) {
    return this.getPromise().catch(e);
  }
  finally(e) {
    return this.getPromise().finally(e);
  }
  getPromise() {
    return this.promise || (this.promise = this.execute()), this.promise;
  }
  async execute() {
    var e = this;
    try {
      return {
        data: await (await e.downloadFn()).blob(),
        error: null
      };
    } catch (t) {
      if (e.shouldThrowOnError) throw t;
      if (Jl(t)) return {
        data: null,
        error: t
      };
      throw t;
    }
  }
};
const kN = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
}, Xg = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: !1
};
var TN = class extends ti {
  constructor(e, t = {}, n, r) {
    super(e, t, r, "storage"), this.bucketId = n;
  }
  /**
  * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
  *
  * @param method HTTP method.
  * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
  * @param fileBody The body of the file to be stored in the bucket.
  */
  async uploadOrUpdate(e, t, n, r) {
    var s = this;
    return s.handleOperation(async () => {
      let i;
      const o = B(B({}, Xg), r);
      let a = B(B({}, s.headers), e === "POST" && { "x-upsert": String(o.upsert) });
      const l = o.metadata;
      typeof Blob < "u" && n instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), l && i.append("metadata", s.encodeMetadata(l)), i.append("", n)) : typeof FormData < "u" && n instanceof FormData ? (i = n, i.has("cacheControl") || i.append("cacheControl", o.cacheControl), l && !i.has("metadata") && i.append("metadata", s.encodeMetadata(l))) : (i = n, a["cache-control"] = `max-age=${o.cacheControl}`, a["content-type"] = o.contentType, l && (a["x-metadata"] = s.toBase64(s.encodeMetadata(l))), (typeof ReadableStream < "u" && i instanceof ReadableStream || i && typeof i == "object" && "pipe" in i && typeof i.pipe == "function") && !o.duplex && (o.duplex = "half")), r != null && r.headers && (a = B(B({}, a), r.headers));
      const u = s._removeEmptyFolders(t), c = s._getFinalPath(u), d = await (e == "PUT" ? $d : ae)(s.fetch, `${s.url}/object/${c}`, i, B({ headers: a }, o != null && o.duplex ? { duplex: o.duplex } : {}));
      return {
        path: u,
        id: d.Id,
        fullPath: d.Key
      };
    });
  }
  /**
  * Uploads a file to an existing bucket.
  *
  * @category File Buckets
  * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
  * @param fileBody The body of the file to be stored in the bucket.
  * @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
  * @returns Promise with response containing file path, id, and fullPath or error
  *
  * @example Upload file
  * ```js
  * const avatarFile = event.target.files[0]
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .upload('public/avatar1.png', avatarFile, {
  *     cacheControl: '3600',
  *     upsert: false
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "path": "public/avatar1.png",
  *     "fullPath": "avatars/public/avatar1.png"
  *   },
  *   "error": null
  * }
  * ```
  *
  * @example Upload file using `ArrayBuffer` from base64 file data
  * ```js
  * import { decode } from 'base64-arraybuffer'
  *
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .upload('public/avatar1.png', decode('base64FileData'), {
  *     contentType: 'image/png'
  *   })
  * ```
  */
  async upload(e, t, n) {
    return this.uploadOrUpdate("POST", e, t, n);
  }
  /**
  * Upload a file with a token generated from `createSignedUploadUrl`.
  *
  * @category File Buckets
  * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
  * @param token The token generated from `createSignedUploadUrl`
  * @param fileBody The body of the file to be stored in the bucket.
  * @param fileOptions HTTP headers (cacheControl, contentType, etc.).
  * **Note:** The `upsert` option has no effect here. To enable upsert behavior,
  * pass `{ upsert: true }` when calling `createSignedUploadUrl()` instead.
  * @returns Promise with response containing file path and fullPath or error
  *
  * @example Upload to a signed URL
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .uploadToSignedUrl('folder/cat.jpg', 'token-from-createSignedUploadUrl', file)
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "path": "folder/cat.jpg",
  *     "fullPath": "avatars/folder/cat.jpg"
  *   },
  *   "error": null
  * }
  * ```
  */
  async uploadToSignedUrl(e, t, n, r) {
    var s = this;
    const i = s._removeEmptyFolders(e), o = s._getFinalPath(i), a = new URL(s.url + `/object/upload/sign/${o}`);
    return a.searchParams.set("token", t), s.handleOperation(async () => {
      let l;
      const u = B({ upsert: Xg.upsert }, r), c = B(B({}, s.headers), { "x-upsert": String(u.upsert) });
      return typeof Blob < "u" && n instanceof Blob ? (l = new FormData(), l.append("cacheControl", u.cacheControl), l.append("", n)) : typeof FormData < "u" && n instanceof FormData ? (l = n, l.append("cacheControl", u.cacheControl)) : (l = n, c["cache-control"] = `max-age=${u.cacheControl}`, c["content-type"] = u.contentType), {
        path: i,
        fullPath: (await $d(s.fetch, a.toString(), l, { headers: c })).Key
      };
    });
  }
  /**
  * Creates a signed upload URL.
  * Signed upload URLs can be used to upload files to the bucket without further authentication.
  * They are valid for 2 hours.
  *
  * @category File Buckets
  * @param path The file path, including the current file name. For example `folder/image.png`.
  * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
  * @returns Promise with response containing signed upload URL, token, and path or error
  *
  * @example Create Signed Upload URL
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .createSignedUploadUrl('folder/cat.jpg')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "signedUrl": "https://example.supabase.co/storage/v1/object/upload/sign/avatars/folder/cat.jpg?token=<TOKEN>",
  *     "path": "folder/cat.jpg",
  *     "token": "<TOKEN>"
  *   },
  *   "error": null
  * }
  * ```
  */
  async createSignedUploadUrl(e, t) {
    var n = this;
    return n.handleOperation(async () => {
      let r = n._getFinalPath(e);
      const s = B({}, n.headers);
      t != null && t.upsert && (s["x-upsert"] = "true");
      const i = await ae(n.fetch, `${n.url}/object/upload/sign/${r}`, {}, { headers: s }), o = new URL(n.url + i.url), a = o.searchParams.get("token");
      if (!a) throw new Yl("No token returned by API");
      return {
        signedUrl: o.toString(),
        path: e,
        token: a
      };
    });
  }
  /**
  * Replaces an existing file at the specified path with a new one.
  *
  * @category File Buckets
  * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
  * @param fileBody The body of the file to be stored in the bucket.
  * @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
  * @returns Promise with response containing file path, id, and fullPath or error
  *
  * @example Update file
  * ```js
  * const avatarFile = event.target.files[0]
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .update('public/avatar1.png', avatarFile, {
  *     cacheControl: '3600',
  *     upsert: true
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "path": "public/avatar1.png",
  *     "fullPath": "avatars/public/avatar1.png"
  *   },
  *   "error": null
  * }
  * ```
  *
  * @example Update file using `ArrayBuffer` from base64 file data
  * ```js
  * import {decode} from 'base64-arraybuffer'
  *
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .update('public/avatar1.png', decode('base64FileData'), {
  *     contentType: 'image/png'
  *   })
  * ```
  */
  async update(e, t, n) {
    return this.uploadOrUpdate("PUT", e, t, n);
  }
  /**
  * Moves an existing file to a new path in the same bucket.
  *
  * @category File Buckets
  * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
  * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
  * @param options The destination options.
  * @returns Promise with response containing success message or error
  *
  * @example Move file
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .move('public/avatar1.png', 'private/avatar2.png')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "message": "Successfully moved"
  *   },
  *   "error": null
  * }
  * ```
  */
  async move(e, t, n) {
    var r = this;
    return r.handleOperation(async () => await ae(r.fetch, `${r.url}/object/move`, {
      bucketId: r.bucketId,
      sourceKey: e,
      destinationKey: t,
      destinationBucket: n == null ? void 0 : n.destinationBucket
    }, { headers: r.headers }));
  }
  /**
  * Copies an existing file to a new path in the same bucket.
  *
  * @category File Buckets
  * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
  * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
  * @param options The destination options.
  * @returns Promise with response containing copied file path or error
  *
  * @example Copy file
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .copy('public/avatar1.png', 'private/avatar2.png')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "path": "avatars/private/avatar2.png"
  *   },
  *   "error": null
  * }
  * ```
  */
  async copy(e, t, n) {
    var r = this;
    return r.handleOperation(async () => ({ path: (await ae(r.fetch, `${r.url}/object/copy`, {
      bucketId: r.bucketId,
      sourceKey: e,
      destinationKey: t,
      destinationBucket: n == null ? void 0 : n.destinationBucket
    }, { headers: r.headers })).Key }));
  }
  /**
  * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
  *
  * @category File Buckets
  * @param path The file path, including the current file name. For example `folder/image.png`.
  * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
  * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
  * @param options.transform Transform the asset before serving it to the client.
  * @returns Promise with response containing signed URL or error
  *
  * @example Create Signed URL
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .createSignedUrl('folder/avatar1.png', 60)
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
  *   },
  *   "error": null
  * }
  * ```
  *
  * @example Create a signed URL for an asset with transformations
  * ```js
  * const { data } = await supabase
  *   .storage
  *   .from('avatars')
  *   .createSignedUrl('folder/avatar1.png', 60, {
  *     transform: {
  *       width: 100,
  *       height: 100,
  *     }
  *   })
  * ```
  *
  * @example Create a signed URL which triggers the download of the asset
  * ```js
  * const { data } = await supabase
  *   .storage
  *   .from('avatars')
  *   .createSignedUrl('folder/avatar1.png', 60, {
  *     download: true,
  *   })
  * ```
  */
  async createSignedUrl(e, t, n) {
    var r = this;
    return r.handleOperation(async () => {
      let s = r._getFinalPath(e), i = await ae(r.fetch, `${r.url}/object/sign/${s}`, B({ expiresIn: t }, n != null && n.transform ? { transform: n.transform } : {}), { headers: r.headers });
      const o = n != null && n.download ? `&download=${n.download === !0 ? "" : n.download}` : "";
      return { signedUrl: encodeURI(`${r.url}${i.signedURL}${o}`) };
    });
  }
  /**
  * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
  *
  * @category File Buckets
  * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
  * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
  * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
  * @returns Promise with response containing array of objects with signedUrl, path, and error or error
  *
  * @example Create Signed URLs
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": [
  *     {
  *       "error": null,
  *       "path": "folder/avatar1.png",
  *       "signedURL": "/object/sign/avatars/folder/avatar1.png?token=<TOKEN>",
  *       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
  *     },
  *     {
  *       "error": null,
  *       "path": "folder/avatar2.png",
  *       "signedURL": "/object/sign/avatars/folder/avatar2.png?token=<TOKEN>",
  *       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar2.png?token=<TOKEN>"
  *     }
  *   ],
  *   "error": null
  * }
  * ```
  */
  async createSignedUrls(e, t, n) {
    var r = this;
    return r.handleOperation(async () => {
      const s = await ae(r.fetch, `${r.url}/object/sign/${r.bucketId}`, {
        expiresIn: t,
        paths: e
      }, { headers: r.headers }), i = n != null && n.download ? `&download=${n.download === !0 ? "" : n.download}` : "";
      return s.map((o) => B(B({}, o), {}, { signedUrl: o.signedURL ? encodeURI(`${r.url}${o.signedURL}${i}`) : null }));
    });
  }
  /**
  * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
  *
  * @category File Buckets
  * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
  * @param options.transform Transform the asset before serving it to the client.
  * @returns BlobDownloadBuilder instance for downloading the file
  *
  * @example Download file
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .download('folder/avatar1.png')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": <BLOB>,
  *   "error": null
  * }
  * ```
  *
  * @example Download file with transformations
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .download('folder/avatar1.png', {
  *     transform: {
  *       width: 100,
  *       height: 100,
  *       quality: 80
  *     }
  *   })
  * ```
  */
  download(e, t) {
    const n = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", r = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), s = r ? `?${r}` : "", i = this._getFinalPath(e), o = () => po(this.fetch, `${this.url}/${n}/${i}${s}`, {
      headers: this.headers,
      noResolveJson: !0
    });
    return new _N(o, this.shouldThrowOnError);
  }
  /**
  * Retrieves the details of an existing file.
  *
  * @category File Buckets
  * @param path The file path, including the file name. For example `folder/image.png`.
  * @returns Promise with response containing file metadata or error
  *
  * @example Get file info
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .info('folder/avatar1.png')
  * ```
  */
  async info(e) {
    var t = this;
    const n = t._getFinalPath(e);
    return t.handleOperation(async () => Ld(await po(t.fetch, `${t.url}/object/info/${n}`, { headers: t.headers })));
  }
  /**
  * Checks the existence of a file.
  *
  * @category File Buckets
  * @param path The file path, including the file name. For example `folder/image.png`.
  * @returns Promise with response containing boolean indicating file existence or error
  *
  * @example Check file existence
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .exists('folder/avatar1.png')
  * ```
  */
  async exists(e) {
    var t = this;
    const n = t._getFinalPath(e);
    try {
      return await bN(t.fetch, `${t.url}/object/${n}`, { headers: t.headers }), {
        data: !0,
        error: null
      };
    } catch (r) {
      if (t.shouldThrowOnError) throw r;
      if (Jl(r) && r instanceof Yb) {
        const s = r.originalError;
        if ([400, 404].includes(s == null ? void 0 : s.status)) return {
          data: !1,
          error: r
        };
      }
      throw r;
    }
  }
  /**
  * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
  * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
  *
  * @category File Buckets
  * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
  * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
  * @param options.transform Transform the asset before serving it to the client.
  * @returns Object with public URL
  *
  * @example Returns the URL for an asset in a public bucket
  * ```js
  * const { data } = supabase
  *   .storage
  *   .from('public-bucket')
  *   .getPublicUrl('folder/avatar1.png')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "publicUrl": "https://example.supabase.co/storage/v1/object/public/public-bucket/folder/avatar1.png"
  *   }
  * }
  * ```
  *
  * @example Returns the URL for an asset in a public bucket with transformations
  * ```js
  * const { data } = supabase
  *   .storage
  *   .from('public-bucket')
  *   .getPublicUrl('folder/avatar1.png', {
  *     transform: {
  *       width: 100,
  *       height: 100,
  *     }
  *   })
  * ```
  *
  * @example Returns the URL which triggers the download of an asset in a public bucket
  * ```js
  * const { data } = supabase
  *   .storage
  *   .from('public-bucket')
  *   .getPublicUrl('folder/avatar1.png', {
  *     download: true,
  *   })
  * ```
  */
  getPublicUrl(e, t) {
    const n = this._getFinalPath(e), r = [], s = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    s !== "" && r.push(s);
    const i = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", o = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    o !== "" && r.push(o);
    let a = r.join("&");
    return a !== "" && (a = `?${a}`), { data: { publicUrl: encodeURI(`${this.url}/${i}/public/${n}${a}`) } };
  }
  /**
  * Deletes files within the same bucket
  *
  * @category File Buckets
  * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
  * @returns Promise with response containing array of deleted file objects or error
  *
  * @example Delete file
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .remove(['folder/avatar1.png'])
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": [],
  *   "error": null
  * }
  * ```
  */
  async remove(e) {
    var t = this;
    return t.handleOperation(async () => await Df(t.fetch, `${t.url}/object/${t.bucketId}`, { prefixes: e }, { headers: t.headers }));
  }
  /**
  * Get file metadata
  * @param id the file id to retrieve metadata
  */
  /**
  * Update file metadata
  * @param id the file id to update metadata
  * @param meta the new file metadata
  */
  /**
  * Lists all the files and folders within a path of the bucket.
  *
  * @category File Buckets
  * @param path The folder path.
  * @param options Search options including limit (defaults to 100), offset, sortBy, and search
  * @param parameters Optional fetch parameters including signal for cancellation
  * @returns Promise with response containing array of files or error
  *
  * @example List files in a bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .list('folder', {
  *     limit: 100,
  *     offset: 0,
  *     sortBy: { column: 'name', order: 'asc' },
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": [
  *     {
  *       "name": "avatar1.png",
  *       "id": "e668cf7f-821b-4a2f-9dce-7dfa5dd1cfd2",
  *       "updated_at": "2024-05-22T23:06:05.580Z",
  *       "created_at": "2024-05-22T23:04:34.443Z",
  *       "last_accessed_at": "2024-05-22T23:04:34.443Z",
  *       "metadata": {
  *         "eTag": "\"c5e8c553235d9af30ef4f6e280790b92\"",
  *         "size": 32175,
  *         "mimetype": "image/png",
  *         "cacheControl": "max-age=3600",
  *         "lastModified": "2024-05-22T23:06:05.574Z",
  *         "contentLength": 32175,
  *         "httpStatusCode": 200
  *       }
  *     }
  *   ],
  *   "error": null
  * }
  * ```
  *
  * @example Search files in a bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .from('avatars')
  *   .list('folder', {
  *     limit: 100,
  *     offset: 0,
  *     sortBy: { column: 'name', order: 'asc' },
  *     search: 'jon'
  *   })
  * ```
  */
  async list(e, t, n) {
    var r = this;
    return r.handleOperation(async () => {
      const s = B(B(B({}, kN), t), {}, { prefix: e || "" });
      return await ae(r.fetch, `${r.url}/object/list/${r.bucketId}`, s, { headers: r.headers }, n);
    });
  }
  /**
  * @experimental this method signature might change in the future
  *
  * @category File Buckets
  * @param options search options
  * @param parameters
  */
  async listV2(e, t) {
    var n = this;
    return n.handleOperation(async () => {
      const r = B({}, e);
      return await ae(n.fetch, `${n.url}/object/list-v2/${n.bucketId}`, r, { headers: n.headers }, t);
    });
  }
  encodeMetadata(e) {
    return JSON.stringify(e);
  }
  toBase64(e) {
    return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
  }
};
const EN = "2.93.1", No = { "X-Client-Info": `storage-js/${EN}` };
var CN = class extends ti {
  constructor(e, t = {}, n, r) {
    const s = new URL(e);
    r != null && r.useNewHostname && /supabase\.(co|in|red)$/.test(s.hostname) && !s.hostname.includes("storage.supabase.") && (s.hostname = s.hostname.replace("supabase.", "storage.supabase."));
    const i = s.href.replace(/\/$/, ""), o = B(B({}, No), t);
    super(i, o, n, "storage");
  }
  /**
  * Retrieves the details of all Storage buckets within an existing project.
  *
  * @category File Buckets
  * @param options Query parameters for listing buckets
  * @param options.limit Maximum number of buckets to return
  * @param options.offset Number of buckets to skip
  * @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
  * @param options.sortOrder Sort order ('asc' or 'desc')
  * @param options.search Search term to filter bucket names
  * @returns Promise with response containing array of buckets or error
  *
  * @example List buckets
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .listBuckets()
  * ```
  *
  * @example List buckets with options
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .listBuckets({
  *     limit: 10,
  *     offset: 0,
  *     sortColumn: 'created_at',
  *     sortOrder: 'desc',
  *     search: 'prod'
  *   })
  * ```
  */
  async listBuckets(e) {
    var t = this;
    return t.handleOperation(async () => {
      const n = t.listBucketOptionsToQueryString(e);
      return await po(t.fetch, `${t.url}/bucket${n}`, { headers: t.headers });
    });
  }
  /**
  * Retrieves the details of an existing Storage bucket.
  *
  * @category File Buckets
  * @param id The unique identifier of the bucket you would like to retrieve.
  * @returns Promise with response containing bucket details or error
  *
  * @example Get bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .getBucket('avatars')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "id": "avatars",
  *     "name": "avatars",
  *     "owner": "",
  *     "public": false,
  *     "file_size_limit": 1024,
  *     "allowed_mime_types": [
  *       "image/png"
  *     ],
  *     "created_at": "2024-05-22T22:26:05.100Z",
  *     "updated_at": "2024-05-22T22:26:05.100Z"
  *   },
  *   "error": null
  * }
  * ```
  */
  async getBucket(e) {
    var t = this;
    return t.handleOperation(async () => await po(t.fetch, `${t.url}/bucket/${e}`, { headers: t.headers }));
  }
  /**
  * Creates a new Storage bucket
  *
  * @category File Buckets
  * @param id A unique identifier for the bucket you are creating.
  * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
  * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
  * The global file size limit takes precedence over this value.
  * The default value is null, which doesn't set a per bucket file size limit.
  * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
  * The default value is null, which allows files with all mime types to be uploaded.
  * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
  * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
  *   - default bucket type is `STANDARD`
  * @returns Promise with response containing newly created bucket name or error
  *
  * @example Create bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .createBucket('avatars', {
  *     public: false,
  *     allowedMimeTypes: ['image/png'],
  *     fileSizeLimit: 1024
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "name": "avatars"
  *   },
  *   "error": null
  * }
  * ```
  */
  async createBucket(e, t = { public: !1 }) {
    var n = this;
    return n.handleOperation(async () => await ae(n.fetch, `${n.url}/bucket`, {
      id: e,
      name: e,
      type: t.type,
      public: t.public,
      file_size_limit: t.fileSizeLimit,
      allowed_mime_types: t.allowedMimeTypes
    }, { headers: n.headers }));
  }
  /**
  * Updates a Storage bucket
  *
  * @category File Buckets
  * @param id A unique identifier for the bucket you are updating.
  * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
  * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
  * The global file size limit takes precedence over this value.
  * The default value is null, which doesn't set a per bucket file size limit.
  * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
  * The default value is null, which allows files with all mime types to be uploaded.
  * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
  * @returns Promise with response containing success message or error
  *
  * @example Update bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .updateBucket('avatars', {
  *     public: false,
  *     allowedMimeTypes: ['image/png'],
  *     fileSizeLimit: 1024
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "message": "Successfully updated"
  *   },
  *   "error": null
  * }
  * ```
  */
  async updateBucket(e, t) {
    var n = this;
    return n.handleOperation(async () => await $d(n.fetch, `${n.url}/bucket/${e}`, {
      id: e,
      name: e,
      public: t.public,
      file_size_limit: t.fileSizeLimit,
      allowed_mime_types: t.allowedMimeTypes
    }, { headers: n.headers }));
  }
  /**
  * Removes all objects inside a single bucket.
  *
  * @category File Buckets
  * @param id The unique identifier of the bucket you would like to empty.
  * @returns Promise with success message or error
  *
  * @example Empty bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .emptyBucket('avatars')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "message": "Successfully emptied"
  *   },
  *   "error": null
  * }
  * ```
  */
  async emptyBucket(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/bucket/${e}/empty`, {}, { headers: t.headers }));
  }
  /**
  * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
  * You must first `empty()` the bucket.
  *
  * @category File Buckets
  * @param id The unique identifier of the bucket you would like to delete.
  * @returns Promise with success message or error
  *
  * @example Delete bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .deleteBucket('avatars')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "message": "Successfully deleted"
  *   },
  *   "error": null
  * }
  * ```
  */
  async deleteBucket(e) {
    var t = this;
    return t.handleOperation(async () => await Df(t.fetch, `${t.url}/bucket/${e}`, {}, { headers: t.headers }));
  }
  listBucketOptionsToQueryString(e) {
    const t = {};
    return e && ("limit" in e && (t.limit = String(e.limit)), "offset" in e && (t.offset = String(e.offset)), e.search && (t.search = e.search), e.sortColumn && (t.sortColumn = e.sortColumn), e.sortOrder && (t.sortOrder = e.sortOrder)), Object.keys(t).length > 0 ? "?" + new URLSearchParams(t).toString() : "";
  }
}, PN = class extends ti {
  /**
  * @alpha
  *
  * Creates a new StorageAnalyticsClient instance
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @param url - The base URL for the storage API
  * @param headers - HTTP headers to include in requests
  * @param fetch - Optional custom fetch implementation
  *
  * @example
  * ```typescript
  * const client = new StorageAnalyticsClient(url, headers)
  * ```
  */
  constructor(e, t = {}, n) {
    const r = e.replace(/\/$/, ""), s = B(B({}, No), t);
    super(r, s, n, "storage");
  }
  /**
  * @alpha
  *
  * Creates a new analytics bucket using Iceberg tables
  * Analytics buckets are optimized for analytical queries and data processing
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @param name A unique name for the bucket you are creating
  * @returns Promise with response containing newly created analytics bucket or error
  *
  * @example Create analytics bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .analytics
  *   .createBucket('analytics-data')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "name": "analytics-data",
  *     "type": "ANALYTICS",
  *     "format": "iceberg",
  *     "created_at": "2024-05-22T22:26:05.100Z",
  *     "updated_at": "2024-05-22T22:26:05.100Z"
  *   },
  *   "error": null
  * }
  * ```
  */
  async createBucket(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/bucket`, { name: e }, { headers: t.headers }));
  }
  /**
  * @alpha
  *
  * Retrieves the details of all Analytics Storage buckets within an existing project
  * Only returns buckets of type 'ANALYTICS'
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @param options Query parameters for listing buckets
  * @param options.limit Maximum number of buckets to return
  * @param options.offset Number of buckets to skip
  * @param options.sortColumn Column to sort by ('name', 'created_at', 'updated_at')
  * @param options.sortOrder Sort order ('asc' or 'desc')
  * @param options.search Search term to filter bucket names
  * @returns Promise with response containing array of analytics buckets or error
  *
  * @example List analytics buckets
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .analytics
  *   .listBuckets({
  *     limit: 10,
  *     offset: 0,
  *     sortColumn: 'created_at',
  *     sortOrder: 'desc'
  *   })
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": [
  *     {
  *       "name": "analytics-data",
  *       "type": "ANALYTICS",
  *       "format": "iceberg",
  *       "created_at": "2024-05-22T22:26:05.100Z",
  *       "updated_at": "2024-05-22T22:26:05.100Z"
  *     }
  *   ],
  *   "error": null
  * }
  * ```
  */
  async listBuckets(e) {
    var t = this;
    return t.handleOperation(async () => {
      const n = new URLSearchParams();
      (e == null ? void 0 : e.limit) !== void 0 && n.set("limit", e.limit.toString()), (e == null ? void 0 : e.offset) !== void 0 && n.set("offset", e.offset.toString()), e != null && e.sortColumn && n.set("sortColumn", e.sortColumn), e != null && e.sortOrder && n.set("sortOrder", e.sortOrder), e != null && e.search && n.set("search", e.search);
      const r = n.toString(), s = r ? `${t.url}/bucket?${r}` : `${t.url}/bucket`;
      return await po(t.fetch, s, { headers: t.headers });
    });
  }
  /**
  * @alpha
  *
  * Deletes an existing analytics bucket
  * A bucket can't be deleted with existing objects inside it
  * You must first empty the bucket before deletion
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @param bucketName The unique identifier of the bucket you would like to delete
  * @returns Promise with response containing success message or error
  *
  * @example Delete analytics bucket
  * ```js
  * const { data, error } = await supabase
  *   .storage
  *   .analytics
  *   .deleteBucket('analytics-data')
  * ```
  *
  * Response:
  * ```json
  * {
  *   "data": {
  *     "message": "Successfully deleted"
  *   },
  *   "error": null
  * }
  * ```
  */
  async deleteBucket(e) {
    var t = this;
    return t.handleOperation(async () => await Df(t.fetch, `${t.url}/bucket/${e}`, {}, { headers: t.headers }));
  }
  /**
  * @alpha
  *
  * Get an Iceberg REST Catalog client configured for a specific analytics bucket
  * Use this to perform advanced table and namespace operations within the bucket
  * The returned client provides full access to the Apache Iceberg REST Catalog API
  * with the Supabase `{ data, error }` pattern for consistent error handling on all operations.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @param bucketName - The name of the analytics bucket (warehouse) to connect to
  * @returns The wrapped Iceberg catalog client
  * @throws {StorageError} If the bucket name is invalid
  *
  * @example Get catalog and create table
  * ```js
  * // First, create an analytics bucket
  * const { data: bucket, error: bucketError } = await supabase
  *   .storage
  *   .analytics
  *   .createBucket('analytics-data')
  *
  * // Get the Iceberg catalog for that bucket
  * const catalog = supabase.storage.analytics.from('analytics-data')
  *
  * // Create a namespace
  * const { error: nsError } = await catalog.createNamespace({ namespace: ['default'] })
  *
  * // Create a table with schema
  * const { data: tableMetadata, error: tableError } = await catalog.createTable(
  *   { namespace: ['default'] },
  *   {
  *     name: 'events',
  *     schema: {
  *       type: 'struct',
  *       fields: [
  *         { id: 1, name: 'id', type: 'long', required: true },
  *         { id: 2, name: 'timestamp', type: 'timestamp', required: true },
  *         { id: 3, name: 'user_id', type: 'string', required: false }
  *       ],
  *       'schema-id': 0,
  *       'identifier-field-ids': [1]
  *     },
  *     'partition-spec': {
  *       'spec-id': 0,
  *       fields: []
  *     },
  *     'write-order': {
  *       'order-id': 0,
  *       fields: []
  *     },
  *     properties: {
  *       'write.format.default': 'parquet'
  *     }
  *   }
  * )
  * ```
  *
  * @example List tables in namespace
  * ```js
  * const catalog = supabase.storage.analytics.from('analytics-data')
  *
  * // List all tables in the default namespace
  * const { data: tables, error: listError } = await catalog.listTables({ namespace: ['default'] })
  * if (listError) {
  *   if (listError.isNotFound()) {
  *     console.log('Namespace not found')
  *   }
  *   return
  * }
  * console.log(tables) // [{ namespace: ['default'], name: 'events' }]
  * ```
  *
  * @example Working with namespaces
  * ```js
  * const catalog = supabase.storage.analytics.from('analytics-data')
  *
  * // List all namespaces
  * const { data: namespaces } = await catalog.listNamespaces()
  *
  * // Create namespace with properties
  * await catalog.createNamespace(
  *   { namespace: ['production'] },
  *   { properties: { owner: 'data-team', env: 'prod' } }
  * )
  * ```
  *
  * @example Cleanup operations
  * ```js
  * const catalog = supabase.storage.analytics.from('analytics-data')
  *
  * // Drop table with purge option (removes all data)
  * const { error: dropError } = await catalog.dropTable(
  *   { namespace: ['default'], name: 'events' },
  *   { purge: true }
  * )
  *
  * if (dropError?.isNotFound()) {
  *   console.log('Table does not exist')
  * }
  *
  * // Drop namespace (must be empty)
  * await catalog.dropNamespace({ namespace: ['default'] })
  * ```
  *
  * @remarks
  * This method provides a bridge between Supabase's bucket management and the standard
  * Apache Iceberg REST Catalog API. The bucket name maps to the Iceberg warehouse parameter.
  * All authentication and configuration is handled automatically using your Supabase credentials.
  *
  * **Error Handling**: Invalid bucket names throw immediately. All catalog
  * operations return `{ data, error }` where errors are `IcebergError` instances from iceberg-js.
  * Use helper methods like `error.isNotFound()` or check `error.status` for specific error handling.
  * Use `.throwOnError()` on the analytics client if you prefer exceptions for catalog operations.
  *
  * **Cleanup Operations**: When using `dropTable`, the `purge: true` option permanently
  * deletes all table data. Without it, the table is marked as deleted but data remains.
  *
  * **Library Dependency**: The returned catalog wraps `IcebergRestCatalog` from iceberg-js.
  * For complete API documentation and advanced usage, refer to the
  * [iceberg-js documentation](https://supabase.github.io/iceberg-js/).
  */
  from(e) {
    var t = this;
    if (!fN(e)) throw new Yl("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
    const n = new cN({
      baseUrl: this.url,
      catalogName: e,
      auth: {
        type: "custom",
        getHeaders: async () => t.headers
      },
      fetch: this.fetch
    }), r = this.shouldThrowOnError;
    return new Proxy(n, { get(s, i) {
      const o = s[i];
      return typeof o != "function" ? o : async (...a) => {
        try {
          return {
            data: await o.apply(s, a),
            error: null
          };
        } catch (l) {
          if (r) throw l;
          return {
            data: null,
            error: l
          };
        }
      };
    } });
  }
}, AN = class extends ti {
  /** Creates a new VectorIndexApi instance */
  constructor(e, t = {}, n) {
    const r = e.replace(/\/$/, ""), s = B(B({}, No), {}, { "Content-Type": "application/json" }, t);
    super(r, s, n, "vectors");
  }
  /** Creates a new vector index within a bucket */
  async createIndex(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/CreateIndex`, e, { headers: t.headers }) || {});
  }
  /** Retrieves metadata for a specific vector index */
  async getIndex(e, t) {
    var n = this;
    return n.handleOperation(async () => await ae(n.fetch, `${n.url}/GetIndex`, {
      vectorBucketName: e,
      indexName: t
    }, { headers: n.headers }));
  }
  /** Lists vector indexes within a bucket with optional filtering and pagination */
  async listIndexes(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/ListIndexes`, e, { headers: t.headers }));
  }
  /** Deletes a vector index and all its data */
  async deleteIndex(e, t) {
    var n = this;
    return n.handleOperation(async () => await ae(n.fetch, `${n.url}/DeleteIndex`, {
      vectorBucketName: e,
      indexName: t
    }, { headers: n.headers }) || {});
  }
}, RN = class extends ti {
  /** Creates a new VectorDataApi instance */
  constructor(e, t = {}, n) {
    const r = e.replace(/\/$/, ""), s = B(B({}, No), {}, { "Content-Type": "application/json" }, t);
    super(r, s, n, "vectors");
  }
  /** Inserts or updates vectors in batch (1-500 per request) */
  async putVectors(e) {
    var t = this;
    if (e.vectors.length < 1 || e.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/PutVectors`, e, { headers: t.headers }) || {});
  }
  /** Retrieves vectors by their keys in batch */
  async getVectors(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/GetVectors`, e, { headers: t.headers }));
  }
  /** Lists vectors in an index with pagination */
  async listVectors(e) {
    var t = this;
    if (e.segmentCount !== void 0) {
      if (e.segmentCount < 1 || e.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
      if (e.segmentIndex !== void 0 && (e.segmentIndex < 0 || e.segmentIndex >= e.segmentCount))
        throw new Error(`segmentIndex must be between 0 and ${e.segmentCount - 1}`);
    }
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/ListVectors`, e, { headers: t.headers }));
  }
  /** Queries for similar vectors using approximate nearest neighbor search */
  async queryVectors(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/QueryVectors`, e, { headers: t.headers }));
  }
  /** Deletes vectors by their keys in batch (1-500 per request) */
  async deleteVectors(e) {
    var t = this;
    if (e.keys.length < 1 || e.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/DeleteVectors`, e, { headers: t.headers }) || {});
  }
}, ON = class extends ti {
  /** Creates a new VectorBucketApi instance */
  constructor(e, t = {}, n) {
    const r = e.replace(/\/$/, ""), s = B(B({}, No), {}, { "Content-Type": "application/json" }, t);
    super(r, s, n, "vectors");
  }
  /** Creates a new vector bucket */
  async createBucket(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/CreateVectorBucket`, { vectorBucketName: e }, { headers: t.headers }) || {});
  }
  /** Retrieves metadata for a specific vector bucket */
  async getBucket(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/GetVectorBucket`, { vectorBucketName: e }, { headers: t.headers }));
  }
  /** Lists vector buckets with optional filtering and pagination */
  async listBuckets(e = {}) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/ListVectorBuckets`, e, { headers: t.headers }));
  }
  /** Deletes a vector bucket (must be empty first) */
  async deleteBucket(e) {
    var t = this;
    return t.handleOperation(async () => await ae(t.fetch, `${t.url}/DeleteVectorBucket`, { vectorBucketName: e }, { headers: t.headers }) || {});
  }
}, jN = class extends ON {
  /**
  * @alpha
  *
  * Creates a StorageVectorsClient that can manage buckets, indexes, and vectors.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param url - Base URL of the Storage Vectors REST API.
  * @param options.headers - Optional headers (for example `Authorization`) applied to every request.
  * @param options.fetch - Optional custom `fetch` implementation for non-browser runtimes.
  *
  * @example
  * ```typescript
  * const client = new StorageVectorsClient(url, options)
  * ```
  */
  constructor(e, t = {}) {
    super(e, t.headers || {}, t.fetch);
  }
  /**
  *
  * @alpha
  *
  * Access operations for a specific vector bucket
  * Returns a scoped client for index and vector operations within the bucket
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param vectorBucketName - Name of the vector bucket
  * @returns Bucket-scoped client with index and vector operations
  *
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * ```
  */
  from(e) {
    return new NN(this.url, this.headers, e, this.fetch);
  }
  /**
  *
  * @alpha
  *
  * Creates a new vector bucket
  * Vector buckets are containers for vector indexes and their data
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param vectorBucketName - Unique name for the vector bucket
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const { data, error } = await supabase
  *   .storage
  *   .vectors
  *   .createBucket('embeddings-prod')
  * ```
  */
  async createBucket(e) {
    var t = () => super.createBucket, n = this;
    return t().call(n, e);
  }
  /**
  *
  * @alpha
  *
  * Retrieves metadata for a specific vector bucket
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param vectorBucketName - Name of the vector bucket
  * @returns Promise with bucket metadata or error
  *
  * @example
  * ```typescript
  * const { data, error } = await supabase
  *   .storage
  *   .vectors
  *   .getBucket('embeddings-prod')
  *
  * console.log('Bucket created:', data?.vectorBucket.creationTime)
  * ```
  */
  async getBucket(e) {
    var t = () => super.getBucket, n = this;
    return t().call(n, e);
  }
  /**
  *
  * @alpha
  *
  * Lists all vector buckets with optional filtering and pagination
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Optional filters (prefix, maxResults, nextToken)
  * @returns Promise with list of buckets or error
  *
  * @example
  * ```typescript
  * const { data, error } = await supabase
  *   .storage
  *   .vectors
  *   .listBuckets({ prefix: 'embeddings-' })
  *
  * data?.vectorBuckets.forEach(bucket => {
  *   console.log(bucket.vectorBucketName)
  * })
  * ```
  */
  async listBuckets(e = {}) {
    var t = () => super.listBuckets, n = this;
    return t().call(n, e);
  }
  /**
  *
  * @alpha
  *
  * Deletes a vector bucket (bucket must be empty)
  * All indexes must be deleted before deleting the bucket
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param vectorBucketName - Name of the vector bucket to delete
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const { data, error } = await supabase
  *   .storage
  *   .vectors
  *   .deleteBucket('embeddings-old')
  * ```
  */
  async deleteBucket(e) {
    var t = () => super.deleteBucket, n = this;
    return t().call(n, e);
  }
}, NN = class extends AN {
  /**
  * @alpha
  *
  * Creates a helper that automatically scopes all index operations to the provided bucket.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * ```
  */
  constructor(e, t, n, r) {
    super(e, t, r), this.vectorBucketName = n;
  }
  /**
  *
  * @alpha
  *
  * Creates a new vector index in this bucket
  * Convenience method that automatically includes the bucket name
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Index configuration (vectorBucketName is automatically set)
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * await bucket.createIndex({
  *   indexName: 'documents-openai',
  *   dataType: 'float32',
  *   dimension: 1536,
  *   distanceMetric: 'cosine',
  *   metadataConfiguration: {
  *     nonFilterableMetadataKeys: ['raw_text']
  *   }
  * })
  * ```
  */
  async createIndex(e) {
    var t = () => super.createIndex, n = this;
    return t().call(n, B(B({}, e), {}, { vectorBucketName: n.vectorBucketName }));
  }
  /**
  *
  * @alpha
  *
  * Lists indexes in this bucket
  * Convenience method that automatically includes the bucket name
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Listing options (vectorBucketName is automatically set)
  * @returns Promise with response containing indexes array and pagination token or error
  *
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * const { data } = await bucket.listIndexes({ prefix: 'documents-' })
  * ```
  */
  async listIndexes(e = {}) {
    var t = () => super.listIndexes, n = this;
    return t().call(n, B(B({}, e), {}, { vectorBucketName: n.vectorBucketName }));
  }
  /**
  *
  * @alpha
  *
  * Retrieves metadata for a specific index in this bucket
  * Convenience method that automatically includes the bucket name
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param indexName - Name of the index to retrieve
  * @returns Promise with index metadata or error
  *
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * const { data } = await bucket.getIndex('documents-openai')
  * console.log('Dimension:', data?.index.dimension)
  * ```
  */
  async getIndex(e) {
    var t = () => super.getIndex, n = this;
    return t().call(n, n.vectorBucketName, e);
  }
  /**
  *
  * @alpha
  *
  * Deletes an index from this bucket
  * Convenience method that automatically includes the bucket name
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param indexName - Name of the index to delete
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const bucket = supabase.storage.vectors.from('embeddings-prod')
  * await bucket.deleteIndex('old-index')
  * ```
  */
  async deleteIndex(e) {
    var t = () => super.deleteIndex, n = this;
    return t().call(n, n.vectorBucketName, e);
  }
  /**
  *
  * @alpha
  *
  * Access operations for a specific index within this bucket
  * Returns a scoped client for vector data operations
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param indexName - Name of the index
  * @returns Index-scoped client with vector data operations
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  *
  * // Insert vectors
  * await index.putVectors({
  *   vectors: [
  *     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
  *   ]
  * })
  *
  * // Query similar vectors
  * const { data } = await index.queryVectors({
  *   queryVector: { float32: [...] },
  *   topK: 5
  * })
  * ```
  */
  index(e) {
    return new IN(this.url, this.headers, this.vectorBucketName, e, this.fetch);
  }
}, IN = class extends RN {
  /**
  *
  * @alpha
  *
  * Creates a helper that automatically scopes all vector operations to the provided bucket/index names.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * ```
  */
  constructor(e, t, n, r, s) {
    super(e, t, s), this.vectorBucketName = n, this.indexName = r;
  }
  /**
  *
  * @alpha
  *
  * Inserts or updates vectors in this index
  * Convenience method that automatically includes bucket and index names
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Vector insertion options (bucket and index names automatically set)
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * await index.putVectors({
  *   vectors: [
  *     {
  *       key: 'doc-1',
  *       data: { float32: [0.1, 0.2, ...] },
  *       metadata: { title: 'Introduction', page: 1 }
  *     }
  *   ]
  * })
  * ```
  */
  async putVectors(e) {
    var t = () => super.putVectors, n = this;
    return t().call(n, B(B({}, e), {}, {
      vectorBucketName: n.vectorBucketName,
      indexName: n.indexName
    }));
  }
  /**
  *
  * @alpha
  *
  * Retrieves vectors by keys from this index
  * Convenience method that automatically includes bucket and index names
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Vector retrieval options (bucket and index names automatically set)
  * @returns Promise with response containing vectors array or error
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * const { data } = await index.getVectors({
  *   keys: ['doc-1', 'doc-2'],
  *   returnMetadata: true
  * })
  * ```
  */
  async getVectors(e) {
    var t = () => super.getVectors, n = this;
    return t().call(n, B(B({}, e), {}, {
      vectorBucketName: n.vectorBucketName,
      indexName: n.indexName
    }));
  }
  /**
  *
  * @alpha
  *
  * Lists vectors in this index with pagination
  * Convenience method that automatically includes bucket and index names
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Listing options (bucket and index names automatically set)
  * @returns Promise with response containing vectors array and pagination token or error
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * const { data } = await index.listVectors({
  *   maxResults: 500,
  *   returnMetadata: true
  * })
  * ```
  */
  async listVectors(e = {}) {
    var t = () => super.listVectors, n = this;
    return t().call(n, B(B({}, e), {}, {
      vectorBucketName: n.vectorBucketName,
      indexName: n.indexName
    }));
  }
  /**
  *
  * @alpha
  *
  * Queries for similar vectors in this index
  * Convenience method that automatically includes bucket and index names
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Query options (bucket and index names automatically set)
  * @returns Promise with response containing matches array of similar vectors ordered by distance or error
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * const { data } = await index.queryVectors({
  *   queryVector: { float32: [0.1, 0.2, ...] },
  *   topK: 5,
  *   filter: { category: 'technical' },
  *   returnDistance: true,
  *   returnMetadata: true
  * })
  * ```
  */
  async queryVectors(e) {
    var t = () => super.queryVectors, n = this;
    return t().call(n, B(B({}, e), {}, {
      vectorBucketName: n.vectorBucketName,
      indexName: n.indexName
    }));
  }
  /**
  *
  * @alpha
  *
  * Deletes vectors by keys from this index
  * Convenience method that automatically includes bucket and index names
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @param options - Deletion options (bucket and index names automatically set)
  * @returns Promise with empty response on success or error
  *
  * @example
  * ```typescript
  * const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
  * await index.deleteVectors({
  *   keys: ['doc-1', 'doc-2', 'doc-3']
  * })
  * ```
  */
  async deleteVectors(e) {
    var t = () => super.deleteVectors, n = this;
    return t().call(n, B(B({}, e), {}, {
      vectorBucketName: n.vectorBucketName,
      indexName: n.indexName
    }));
  }
}, DN = class extends CN {
  /**
  * Creates a client for Storage buckets, files, analytics, and vectors.
  *
  * @category File Buckets
  * @example
  * ```ts
  * import { StorageClient } from '@supabase/storage-js'
  *
  * const storage = new StorageClient('https://xyzcompany.supabase.co/storage/v1', {
  *   apikey: 'public-anon-key',
  * })
  * const avatars = storage.from('avatars')
  * ```
  */
  constructor(e, t = {}, n, r) {
    super(e, t, n, r);
  }
  /**
  * Perform file operation in a bucket.
  *
  * @category File Buckets
  * @param id The bucket id to operate on.
  *
  * @example
  * ```typescript
  * const avatars = supabase.storage.from('avatars')
  * ```
  */
  from(e) {
    return new TN(this.url, this.headers, e, this.fetch);
  }
  /**
  *
  * @alpha
  *
  * Access vector storage operations.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Vector Buckets
  * @returns A StorageVectorsClient instance configured with the current storage settings.
  */
  get vectors() {
    return new jN(this.url + "/vector", {
      headers: this.headers,
      fetch: this.fetch
    });
  }
  /**
  *
  * @alpha
  *
  * Access analytics storage operations using Iceberg tables.
  *
  * **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
  *
  * @category Analytics Buckets
  * @returns A StorageAnalyticsClient instance configured with the current storage settings.
  */
  get analytics() {
    return new PN(this.url + "/iceberg", this.headers, this.fetch);
  }
};
const Xb = "2.93.1", Xr = 30 * 1e3, Fd = 3, Xu = Fd * Xr, MN = "http://localhost:9999", LN = "supabase.auth.token", $N = { "X-Client-Info": `gotrue-js/${Xb}` }, Vd = "X-Supabase-Api-Version", Zb = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
}, FN = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, VN = 10 * 60 * 1e3;
class mo extends Error {
  constructor(t, n, r) {
    super(t), this.__isAuthError = !0, this.name = "AuthError", this.status = n, this.code = r;
  }
}
function $(e) {
  return typeof e == "object" && e !== null && "__isAuthError" in e;
}
class UN extends mo {
  constructor(t, n, r) {
    super(t, n, r), this.name = "AuthApiError", this.status = n, this.code = r;
  }
}
function BN(e) {
  return $(e) && e.name === "AuthApiError";
}
class wr extends mo {
  constructor(t, n) {
    super(t), this.name = "AuthUnknownError", this.originalError = n;
  }
}
class Sn extends mo {
  constructor(t, n, r, s) {
    super(t, r, s), this.name = n, this.status = r;
  }
}
class nt extends Sn {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function Zu(e) {
  return $(e) && e.name === "AuthSessionMissingError";
}
class Kr extends Sn {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class da extends Sn {
  constructor(t) {
    super(t, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class ha extends Sn {
  constructor(t, n = null) {
    super(t, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = n;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
function zN(e) {
  return $(e) && e.name === "AuthImplicitGrantRedirectError";
}
class Zg extends Sn {
  constructor(t, n = null) {
    super(t, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = n;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
class WN extends Sn {
  constructor() {
    super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
  }
}
class Ud extends Sn {
  constructor(t, n) {
    super(t, "AuthRetryableFetchError", n, void 0);
  }
}
function ec(e) {
  return $(e) && e.name === "AuthRetryableFetchError";
}
class ey extends Sn {
  constructor(t, n, r) {
    super(t, "AuthWeakPasswordError", n, "weak_password"), this.reasons = r;
  }
}
class Bd extends Sn {
  constructor(t) {
    super(t, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const gl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), ty = ` 	
\r=`.split(""), HN = (() => {
  const e = new Array(128);
  for (let t = 0; t < e.length; t += 1)
    e[t] = -1;
  for (let t = 0; t < ty.length; t += 1)
    e[ty[t].charCodeAt(0)] = -2;
  for (let t = 0; t < gl.length; t += 1)
    e[gl[t].charCodeAt(0)] = t;
  return e;
})();
function ny(e, t, n) {
  if (e !== null)
    for (t.queue = t.queue << 8 | e, t.queuedBits += 8; t.queuedBits >= 6; ) {
      const r = t.queue >> t.queuedBits - 6 & 63;
      n(gl[r]), t.queuedBits -= 6;
    }
  else if (t.queuedBits > 0)
    for (t.queue = t.queue << 6 - t.queuedBits, t.queuedBits = 6; t.queuedBits >= 6; ) {
      const r = t.queue >> t.queuedBits - 6 & 63;
      n(gl[r]), t.queuedBits -= 6;
    }
}
function eS(e, t, n) {
  const r = HN[e];
  if (r > -1)
    for (t.queue = t.queue << 6 | r, t.queuedBits += 6; t.queuedBits >= 8; )
      n(t.queue >> t.queuedBits - 8 & 255), t.queuedBits -= 8;
  else {
    if (r === -2)
      return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`);
  }
}
function ry(e) {
  const t = [], n = (o) => {
    t.push(String.fromCodePoint(o));
  }, r = {
    utf8seq: 0,
    codepoint: 0
  }, s = { queue: 0, queuedBits: 0 }, i = (o) => {
    GN(o, r, n);
  };
  for (let o = 0; o < e.length; o += 1)
    eS(e.charCodeAt(o), s, i);
  return t.join("");
}
function KN(e, t) {
  if (e <= 127) {
    t(e);
    return;
  } else if (e <= 2047) {
    t(192 | e >> 6), t(128 | e & 63);
    return;
  } else if (e <= 65535) {
    t(224 | e >> 12), t(128 | e >> 6 & 63), t(128 | e & 63);
    return;
  } else if (e <= 1114111) {
    t(240 | e >> 18), t(128 | e >> 12 & 63), t(128 | e >> 6 & 63), t(128 | e & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`);
}
function qN(e, t) {
  for (let n = 0; n < e.length; n += 1) {
    let r = e.charCodeAt(n);
    if (r > 55295 && r <= 56319) {
      const s = (r - 55296) * 1024 & 65535;
      r = (e.charCodeAt(n + 1) - 56320 & 65535 | s) + 65536, n += 1;
    }
    KN(r, t);
  }
}
function GN(e, t, n) {
  if (t.utf8seq === 0) {
    if (e <= 127) {
      n(e);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if (!(e >> 7 - r & 1)) {
        t.utf8seq = r;
        break;
      }
    if (t.utf8seq === 2)
      t.codepoint = e & 31;
    else if (t.utf8seq === 3)
      t.codepoint = e & 15;
    else if (t.utf8seq === 4)
      t.codepoint = e & 7;
    else
      throw new Error("Invalid UTF-8 sequence");
    t.utf8seq -= 1;
  } else if (t.utf8seq > 0) {
    if (e <= 127)
      throw new Error("Invalid UTF-8 sequence");
    t.codepoint = t.codepoint << 6 | e & 63, t.utf8seq -= 1, t.utf8seq === 0 && n(t.codepoint);
  }
}
function Es(e) {
  const t = [], n = { queue: 0, queuedBits: 0 }, r = (s) => {
    t.push(s);
  };
  for (let s = 0; s < e.length; s += 1)
    eS(e.charCodeAt(s), n, r);
  return new Uint8Array(t);
}
function QN(e) {
  const t = [];
  return qN(e, (n) => t.push(n)), new Uint8Array(t);
}
function Tr(e) {
  const t = [], n = { queue: 0, queuedBits: 0 }, r = (s) => {
    t.push(s);
  };
  return e.forEach((s) => ny(s, n, r)), ny(null, n, r), t.join("");
}
function YN(e) {
  return Math.round(Date.now() / 1e3) + e;
}
function JN() {
  return Symbol("auth-callback");
}
const Ae = () => typeof window < "u" && typeof document < "u", cr = {
  tested: !1,
  writable: !1
}, tS = () => {
  if (!Ae())
    return !1;
  try {
    if (typeof globalThis.localStorage != "object")
      return !1;
  } catch {
    return !1;
  }
  if (cr.tested)
    return cr.writable;
  const e = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(e, e), globalThis.localStorage.removeItem(e), cr.tested = !0, cr.writable = !0;
  } catch {
    cr.tested = !0, cr.writable = !1;
  }
  return cr.writable;
};
function XN(e) {
  const t = {}, n = new URL(e);
  if (n.hash && n.hash[0] === "#")
    try {
      new URLSearchParams(n.hash.substring(1)).forEach((s, i) => {
        t[i] = s;
      });
    } catch {
    }
  return n.searchParams.forEach((r, s) => {
    t[s] = r;
  }), t;
}
const nS = (e) => e ? (...t) => e(...t) : (...t) => fetch(...t), ZN = (e) => typeof e == "object" && e !== null && "status" in e && "ok" in e && "json" in e && typeof e.json == "function", Zr = async (e, t, n) => {
  await e.setItem(t, JSON.stringify(n));
}, dr = async (e, t) => {
  const n = await e.getItem(t);
  if (!n)
    return null;
  try {
    return JSON.parse(n);
  } catch {
    return n;
  }
}, Pe = async (e, t) => {
  await e.removeItem(t);
};
class Xl {
  constructor() {
    this.promise = new Xl.promiseConstructor((t, n) => {
      this.resolve = t, this.reject = n;
    });
  }
}
Xl.promiseConstructor = Promise;
function fa(e) {
  const t = e.split(".");
  if (t.length !== 3)
    throw new Bd("Invalid JWT structure");
  for (let r = 0; r < t.length; r++)
    if (!FN.test(t[r]))
      throw new Bd("JWT not in base64url format");
  return {
    // using base64url lib
    header: JSON.parse(ry(t[0])),
    payload: JSON.parse(ry(t[1])),
    signature: Es(t[2]),
    raw: {
      header: t[0],
      payload: t[1]
    }
  };
}
async function eI(e) {
  return await new Promise((t) => {
    setTimeout(() => t(null), e);
  });
}
function tI(e, t) {
  return new Promise((r, s) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await e(i);
          if (!t(i, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!t(i, o)) {
            s(o);
            return;
          }
        }
    })();
  });
}
function nI(e) {
  return ("0" + e.toString(16)).substr(-2);
}
function rI() {
  const t = new Uint32Array(56);
  if (typeof crypto > "u") {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", r = n.length;
    let s = "";
    for (let i = 0; i < 56; i++)
      s += n.charAt(Math.floor(Math.random() * r));
    return s;
  }
  return crypto.getRandomValues(t), Array.from(t, nI).join("");
}
async function sI(e) {
  const n = new TextEncoder().encode(e), r = await crypto.subtle.digest("SHA-256", n), s = new Uint8Array(r);
  return Array.from(s).map((i) => String.fromCharCode(i)).join("");
}
async function iI(e) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e;
  const n = await sI(e);
  return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function qr(e, t, n = !1) {
  const r = rI();
  let s = r;
  n && (s += "/PASSWORD_RECOVERY"), await Zr(e, `${t}-code-verifier`, s);
  const i = await iI(r);
  return [i, r === i ? "plain" : "s256"];
}
const oI = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function aI(e) {
  const t = e.headers.get(Vd);
  if (!t || !t.match(oI))
    return null;
  try {
    return /* @__PURE__ */ new Date(`${t}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function lI(e) {
  if (!e)
    throw new Error("Missing exp claim");
  const t = Math.floor(Date.now() / 1e3);
  if (e <= t)
    throw new Error("JWT has expired");
}
function uI(e) {
  switch (e) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
const cI = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Gr(e) {
  if (!cI.test(e))
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function tc() {
  const e = {};
  return new Proxy(e, {
    get: (t, n) => {
      if (n === "__isUserNotAvailableProxy")
        return !0;
      if (typeof n == "symbol") {
        const r = n.toString();
        if (r === "Symbol(Symbol.toPrimitive)" || r === "Symbol(Symbol.toStringTag)" || r === "Symbol(util.inspect.custom)")
          return;
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${n}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (t, n) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (t, n) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
function dI(e, t) {
  return new Proxy(e, {
    get: (n, r, s) => {
      if (r === "__isInsecureUserWarningProxy")
        return !0;
      if (typeof r == "symbol") {
        const i = r.toString();
        if (i === "Symbol(Symbol.toPrimitive)" || i === "Symbol(Symbol.toStringTag)" || i === "Symbol(util.inspect.custom)" || i === "Symbol(nodejs.util.inspect.custom)")
          return Reflect.get(n, r, s);
      }
      return !t.value && typeof r == "string" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), t.value = !0), Reflect.get(n, r, s);
    }
  });
}
function sy(e) {
  return JSON.parse(JSON.stringify(e));
}
const mr = (e) => e.msg || e.message || e.error_description || e.error || JSON.stringify(e), hI = [502, 503, 504];
async function iy(e) {
  var t;
  if (!ZN(e))
    throw new Ud(mr(e), 0);
  if (hI.includes(e.status))
    throw new Ud(mr(e), e.status);
  let n;
  try {
    n = await e.json();
  } catch (i) {
    throw new wr(mr(i), i);
  }
  let r;
  const s = aI(e);
  if (s && s.getTime() >= Zb["2024-01-01"].timestamp && typeof n == "object" && n && typeof n.code == "string" ? r = n.code : typeof n == "object" && n && typeof n.error_code == "string" && (r = n.error_code), r) {
    if (r === "weak_password")
      throw new ey(mr(n), e.status, ((t = n.weak_password) === null || t === void 0 ? void 0 : t.reasons) || []);
    if (r === "session_not_found")
      throw new nt();
  } else if (typeof n == "object" && n && typeof n.weak_password == "object" && n.weak_password && Array.isArray(n.weak_password.reasons) && n.weak_password.reasons.length && n.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0))
    throw new ey(mr(n), e.status, n.weak_password.reasons);
  throw new UN(mr(n), e.status || 500, r);
}
const fI = (e, t, n, r) => {
  const s = { method: e, headers: (t == null ? void 0 : t.headers) || {} };
  return e === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, t == null ? void 0 : t.headers), s.body = JSON.stringify(r), Object.assign(Object.assign({}, s), n));
};
async function U(e, t, n, r) {
  var s;
  const i = Object.assign({}, r == null ? void 0 : r.headers);
  i[Vd] || (i[Vd] = Zb["2024-01-01"].name), r != null && r.jwt && (i.Authorization = `Bearer ${r.jwt}`);
  const o = (s = r == null ? void 0 : r.query) !== null && s !== void 0 ? s : {};
  r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
  const a = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", l = await pI(e, t, n + a, {
    headers: i,
    noResolveJson: r == null ? void 0 : r.noResolveJson
  }, {}, r == null ? void 0 : r.body);
  return r != null && r.xform ? r == null ? void 0 : r.xform(l) : { data: Object.assign({}, l), error: null };
}
async function pI(e, t, n, r, s, i) {
  const o = fI(t, r, s, i);
  let a;
  try {
    a = await e(n, Object.assign({}, o));
  } catch (l) {
    throw console.error(l), new Ud(mr(l), 0);
  }
  if (a.ok || await iy(a), r != null && r.noResolveJson)
    return a;
  try {
    return await a.json();
  } catch (l) {
    await iy(l);
  }
}
function Tt(e) {
  var t;
  let n = null;
  yI(e) && (n = Object.assign({}, e), e.expires_at || (n.expires_at = YN(e.expires_in)));
  const r = (t = e.user) !== null && t !== void 0 ? t : e;
  return { data: { session: n, user: r }, error: null };
}
function oy(e) {
  const t = Tt(e);
  return !t.error && e.weak_password && typeof e.weak_password == "object" && Array.isArray(e.weak_password.reasons) && e.weak_password.reasons.length && e.weak_password.message && typeof e.weak_password.message == "string" && e.weak_password.reasons.reduce((n, r) => n && typeof r == "string", !0) && (t.data.weak_password = e.weak_password), t;
}
function Nn(e) {
  var t;
  return { data: { user: (t = e.user) !== null && t !== void 0 ? t : e }, error: null };
}
function mI(e) {
  return { data: e, error: null };
}
function gI(e) {
  const { action_link: t, email_otp: n, hashed_token: r, redirect_to: s, verification_type: i } = e, o = Ql(e, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), a = {
    action_link: t,
    email_otp: n,
    hashed_token: r,
    redirect_to: s,
    verification_type: i
  }, l = Object.assign({}, o);
  return {
    data: {
      properties: a,
      user: l
    },
    error: null
  };
}
function ay(e) {
  return e;
}
function yI(e) {
  return e.access_token && e.refresh_token && e.expires_in;
}
const nc = ["global", "local", "others"];
class vI {
  /**
   * Creates an admin API client that can be used to manage users and OAuth clients.
   *
   * @example
   * ```ts
   * import { GoTrueAdminApi } from '@supabase/auth-js'
   *
   * const admin = new GoTrueAdminApi({
   *   url: 'https://xyzcompany.supabase.co/auth/v1',
   *   headers: { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` },
   * })
   * ```
   */
  constructor({ url: t = "", headers: n = {}, fetch: r }) {
    this.url = t, this.headers = n, this.fetch = nS(r), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    }, this.oauth = {
      listClients: this._listOAuthClients.bind(this),
      createClient: this._createOAuthClient.bind(this),
      getClient: this._getOAuthClient.bind(this),
      updateClient: this._updateOAuthClient.bind(this),
      deleteClient: this._deleteOAuthClient.bind(this),
      regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(t, n = nc[0]) {
    if (nc.indexOf(n) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${nc.join(", ")}`);
    try {
      return await U(this.fetch, "POST", `${this.url}/logout?scope=${n}`, {
        headers: this.headers,
        jwt: t,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (r) {
      if ($(r))
        return { data: null, error: r };
      throw r;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(t, n = {}) {
    try {
      return await U(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: t, data: n.data },
        headers: this.headers,
        redirectTo: n.redirectTo,
        xform: Nn
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(t) {
    try {
      const { options: n } = t, r = Ql(t, ["options"]), s = Object.assign(Object.assign({}, r), n);
      return "newEmail" in r && (s.new_email = r == null ? void 0 : r.newEmail, delete s.newEmail), await U(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: s,
        headers: this.headers,
        xform: gI,
        redirectTo: n == null ? void 0 : n.redirectTo
      });
    } catch (n) {
      if ($(n))
        return {
          data: {
            properties: null,
            user: null
          },
          error: n
        };
      throw n;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(t) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/users`, {
        body: t,
        headers: this.headers,
        xform: Nn
      });
    } catch (n) {
      if ($(n))
        return { data: { user: null }, error: n };
      throw n;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(t) {
    var n, r, s, i, o, a, l;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 }, c = await U(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (r = (n = t == null ? void 0 : t.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "",
          per_page: (i = (s = t == null ? void 0 : t.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: ay
      });
      if (c.error)
        throw c.error;
      const d = await c.json(), h = (o = c.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, f = (l = (a = c.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && l !== void 0 ? l : [];
      return f.length > 0 && (f.forEach((g) => {
        const y = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)), w = JSON.parse(g.split(";")[1].split("=")[1]);
        u[`${w}Page`] = y;
      }), u.total = parseInt(h)), { data: Object.assign(Object.assign({}, d), u), error: null };
    } catch (u) {
      if ($(u))
        return { data: { users: [] }, error: u };
      throw u;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(t) {
    Gr(t);
    try {
      return await U(this.fetch, "GET", `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        xform: Nn
      });
    } catch (n) {
      if ($(n))
        return { data: { user: null }, error: n };
      throw n;
    }
  }
  /**
   * Updates the user data. Changes are applied directly without confirmation flows.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(t, n) {
    Gr(t);
    try {
      return await U(this.fetch, "PUT", `${this.url}/admin/users/${t}`, {
        body: n,
        headers: this.headers,
        xform: Nn
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(t, n = !1) {
    Gr(t);
    try {
      return await U(this.fetch, "DELETE", `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        body: {
          should_soft_delete: n
        },
        xform: Nn
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(t) {
    Gr(t.userId);
    try {
      const { data: n, error: r } = await U(this.fetch, "GET", `${this.url}/admin/users/${t.userId}/factors`, {
        headers: this.headers,
        xform: (s) => ({ data: { factors: s }, error: null })
      });
      return { data: n, error: r };
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
  async _deleteFactor(t) {
    Gr(t.userId), Gr(t.id);
    try {
      return { data: await U(this.fetch, "DELETE", `${this.url}/admin/users/${t.userId}/factors/${t.id}`, {
        headers: this.headers
      }), error: null };
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Lists all OAuth clients with optional pagination.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _listOAuthClients(t) {
    var n, r, s, i, o, a, l;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 }, c = await U(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (r = (n = t == null ? void 0 : t.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "",
          per_page: (i = (s = t == null ? void 0 : t.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: ay
      });
      if (c.error)
        throw c.error;
      const d = await c.json(), h = (o = c.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, f = (l = (a = c.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && l !== void 0 ? l : [];
      return f.length > 0 && (f.forEach((g) => {
        const y = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)), w = JSON.parse(g.split(";")[1].split("=")[1]);
        u[`${w}Page`] = y;
      }), u.total = parseInt(h)), { data: Object.assign(Object.assign({}, d), u), error: null };
    } catch (u) {
      if ($(u))
        return { data: { clients: [] }, error: u };
      throw u;
    }
  }
  /**
   * Creates a new OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _createOAuthClient(t) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: t,
        headers: this.headers,
        xform: (n) => ({ data: n, error: null })
      });
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Gets details of a specific OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _getOAuthClient(t) {
    try {
      return await U(this.fetch, "GET", `${this.url}/admin/oauth/clients/${t}`, {
        headers: this.headers,
        xform: (n) => ({ data: n, error: null })
      });
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Updates an existing OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _updateOAuthClient(t, n) {
    try {
      return await U(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${t}`, {
        body: n,
        headers: this.headers,
        xform: (r) => ({ data: r, error: null })
      });
    } catch (r) {
      if ($(r))
        return { data: null, error: r };
      throw r;
    }
  }
  /**
   * Deletes an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _deleteOAuthClient(t) {
    try {
      return await U(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${t}`, {
        headers: this.headers,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Regenerates the secret for an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _regenerateOAuthClientSecret(t) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/oauth/clients/${t}/regenerate_secret`, {
        headers: this.headers,
        xform: (n) => ({ data: n, error: null })
      });
    } catch (n) {
      if ($(n))
        return { data: null, error: n };
      throw n;
    }
  }
}
function ly(e = {}) {
  return {
    getItem: (t) => e[t] || null,
    setItem: (t, n) => {
      e[t] = n;
    },
    removeItem: (t) => {
      delete e[t];
    }
  };
}
const Qr = {
  /**
   * @experimental
   */
  debug: !!(globalThis && tS() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class rS extends Error {
  constructor(t) {
    super(t), this.isAcquireTimeout = !0;
  }
}
class wI extends rS {
}
async function xI(e, t, n) {
  Qr.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e, t);
  const r = new globalThis.AbortController();
  return t > 0 && setTimeout(() => {
    r.abort(), Qr.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e);
  }, t), await Promise.resolve().then(() => globalThis.navigator.locks.request(e, t === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: r.signal
  }, async (s) => {
    if (s) {
      Qr.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", e, s.name);
      try {
        return await n();
      } finally {
        Qr.debug && console.log("@supabase/gotrue-js: navigatorLock: released", e, s.name);
      }
    } else {
      if (t === 0)
        throw Qr.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", e), new wI(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);
      if (Qr.debug)
        try {
          const i = await globalThis.navigator.locks.query();
          console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(i, null, "  "));
        } catch (i) {
          console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", i);
        }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await n();
    }
  }));
}
function bI() {
  if (typeof globalThis != "object")
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: !0
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
function sS(e) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(e))
    throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);
  return e.toLowerCase();
}
function SI(e) {
  return parseInt(e, 16);
}
function _I(e) {
  const t = new TextEncoder().encode(e);
  return "0x" + Array.from(t, (r) => r.toString(16).padStart(2, "0")).join("");
}
function kI(e) {
  var t;
  const { chainId: n, domain: r, expirationTime: s, issuedAt: i = /* @__PURE__ */ new Date(), nonce: o, notBefore: a, requestId: l, resources: u, scheme: c, uri: d, version: h } = e;
  {
    if (!Number.isInteger(n))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${n}`);
    if (!r)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (o && o.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);
    if (!d)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (h !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);
    if (!((t = e.statement) === null || t === void 0) && t.includes(`
`))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);
  }
  const f = sS(e.address), g = c ? `${c}://${r}` : r, y = e.statement ? `${e.statement}
` : "", w = `${g} wants you to sign in with your Ethereum account:
${f}

${y}`;
  let p = `URI: ${d}
Version: ${h}
Chain ID: ${n}${o ? `
Nonce: ${o}` : ""}
Issued At: ${i.toISOString()}`;
  if (s && (p += `
Expiration Time: ${s.toISOString()}`), a && (p += `
Not Before: ${a.toISOString()}`), l && (p += `
Request ID: ${l}`), u) {
    let m = `
Resources:`;
    for (const v of u) {
      if (!v || typeof v != "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);
      m += `
- ${v}`;
    }
    p += m;
  }
  return `${w}
${p}`;
}
class ve extends Error {
  constructor({ message: t, code: n, cause: r, name: s }) {
    var i;
    super(t, { cause: r }), this.__isWebAuthnError = !0, this.name = (i = s ?? (r instanceof Error ? r.name : void 0)) !== null && i !== void 0 ? i : "Unknown Error", this.code = n;
  }
}
class yl extends ve {
  constructor(t, n) {
    super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: n,
      message: t
    }), this.name = "WebAuthnUnknownError", this.originalError = n;
  }
}
function TI({ error: e, options: t }) {
  var n, r, s;
  const { publicKey: i } = t;
  if (!i)
    throw Error("options was missing required publicKey property");
  if (e.name === "AbortError") {
    if (t.signal instanceof AbortSignal)
      return new ve({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: e
      });
  } else if (e.name === "ConstraintError") {
    if (((n = i.authenticatorSelection) === null || n === void 0 ? void 0 : n.requireResidentKey) === !0)
      return new ve({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: e
      });
    if (
      // @ts-ignore: `mediation` doesn't yet exist on CredentialCreationOptions but it's possible as of Sept 2024
      t.mediation === "conditional" && ((r = i.authenticatorSelection) === null || r === void 0 ? void 0 : r.userVerification) === "required"
    )
      return new ve({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: e
      });
    if (((s = i.authenticatorSelection) === null || s === void 0 ? void 0 : s.userVerification) === "required")
      return new ve({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: e
      });
  } else {
    if (e.name === "InvalidStateError")
      return new ve({
        message: "The authenticator was previously registered",
        code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
        cause: e
      });
    if (e.name === "NotAllowedError")
      return new ve({
        message: e.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: e
      });
    if (e.name === "NotSupportedError")
      return i.pubKeyCredParams.filter((a) => a.type === "public-key").length === 0 ? new ve({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: e
      }) : new ve({
        message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
        code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
        cause: e
      });
    if (e.name === "SecurityError") {
      const o = window.location.hostname;
      if (iS(o)) {
        if (i.rp.id !== o)
          return new ve({
            message: `The RP ID "${i.rp.id}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: e
          });
      } else return new ve({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: e
      });
    } else if (e.name === "TypeError") {
      if (i.user.id.byteLength < 1 || i.user.id.byteLength > 64)
        return new ve({
          message: "User ID was not between 1 and 64 characters",
          code: "ERROR_INVALID_USER_ID_LENGTH",
          cause: e
        });
    } else if (e.name === "UnknownError")
      return new ve({
        message: "The authenticator was unable to process the specified options, or could not create a new credential",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: e
      });
  }
  return new ve({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: e
  });
}
function EI({ error: e, options: t }) {
  const { publicKey: n } = t;
  if (!n)
    throw Error("options was missing required publicKey property");
  if (e.name === "AbortError") {
    if (t.signal instanceof AbortSignal)
      return new ve({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: e
      });
  } else {
    if (e.name === "NotAllowedError")
      return new ve({
        message: e.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: e
      });
    if (e.name === "SecurityError") {
      const r = window.location.hostname;
      if (iS(r)) {
        if (n.rpId !== r)
          return new ve({
            message: `The RP ID "${n.rpId}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: e
          });
      } else return new ve({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: e
      });
    } else if (e.name === "UnknownError")
      return new ve({
        message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: e
      });
  }
  return new ve({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: e
  });
}
class CI {
  /**
   * Create an abort signal for a new WebAuthn operation.
   * Automatically cancels any existing operation.
   *
   * @returns {AbortSignal} Signal to pass to navigator.credentials.create() or .get()
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal MDN - AbortSignal}
   */
  createNewAbortSignal() {
    if (this.controller) {
      const n = new Error("Cancelling existing WebAuthn API call for new one");
      n.name = "AbortError", this.controller.abort(n);
    }
    const t = new AbortController();
    return this.controller = t, t.signal;
  }
  /**
   * Manually cancel the current WebAuthn operation.
   * Useful for cleaning up when user cancels or navigates away.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort MDN - AbortController.abort}
   */
  cancelCeremony() {
    if (this.controller) {
      const t = new Error("Manually cancelling existing WebAuthn API call");
      t.name = "AbortError", this.controller.abort(t), this.controller = void 0;
    }
  }
}
const PI = new CI();
function AI(e) {
  if (!e)
    throw new Error("Credential creation options are required");
  if (typeof PublicKeyCredential < "u" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function")
    return PublicKeyCredential.parseCreationOptionsFromJSON(
      /** we assert the options here as typescript still doesn't know about future webauthn types */
      e
    );
  const { challenge: t, user: n, excludeCredentials: r } = e, s = Ql(
    e,
    ["challenge", "user", "excludeCredentials"]
  ), i = Es(t).buffer, o = Object.assign(Object.assign({}, n), { id: Es(n.id).buffer }), a = Object.assign(Object.assign({}, s), {
    challenge: i,
    user: o
  });
  if (r && r.length > 0) {
    a.excludeCredentials = new Array(r.length);
    for (let l = 0; l < r.length; l++) {
      const u = r[l];
      a.excludeCredentials[l] = Object.assign(Object.assign({}, u), {
        id: Es(u.id).buffer,
        type: u.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: u.transports
      });
    }
  }
  return a;
}
function RI(e) {
  if (!e)
    throw new Error("Credential request options are required");
  if (typeof PublicKeyCredential < "u" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function")
    return PublicKeyCredential.parseRequestOptionsFromJSON(e);
  const { challenge: t, allowCredentials: n } = e, r = Ql(
    e,
    ["challenge", "allowCredentials"]
  ), s = Es(t).buffer, i = Object.assign(Object.assign({}, r), { challenge: s });
  if (n && n.length > 0) {
    i.allowCredentials = new Array(n.length);
    for (let o = 0; o < n.length; o++) {
      const a = n[o];
      i.allowCredentials[o] = Object.assign(Object.assign({}, a), {
        id: Es(a.id).buffer,
        type: a.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: a.transports
      });
    }
  }
  return i;
}
function OI(e) {
  var t;
  if ("toJSON" in e && typeof e.toJSON == "function")
    return e.toJSON();
  const n = e;
  return {
    id: e.id,
    rawId: e.id,
    response: {
      attestationObject: Tr(new Uint8Array(e.response.attestationObject)),
      clientDataJSON: Tr(new Uint8Array(e.response.clientDataJSON))
    },
    type: "public-key",
    clientExtensionResults: e.getClientExtensionResults(),
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (t = n.authenticatorAttachment) !== null && t !== void 0 ? t : void 0
  };
}
function jI(e) {
  var t;
  if ("toJSON" in e && typeof e.toJSON == "function")
    return e.toJSON();
  const n = e, r = e.getClientExtensionResults(), s = e.response;
  return {
    id: e.id,
    rawId: e.id,
    // W3C spec expects rawId to match id for JSON format
    response: {
      authenticatorData: Tr(new Uint8Array(s.authenticatorData)),
      clientDataJSON: Tr(new Uint8Array(s.clientDataJSON)),
      signature: Tr(new Uint8Array(s.signature)),
      userHandle: s.userHandle ? Tr(new Uint8Array(s.userHandle)) : void 0
    },
    type: "public-key",
    clientExtensionResults: r,
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (t = n.authenticatorAttachment) !== null && t !== void 0 ? t : void 0
  };
}
function iS(e) {
  return (
    // Consider localhost valid as well since it's okay wrt Secure Contexts
    e === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)
  );
}
function uy() {
  var e, t;
  return !!(Ae() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((e = navigator == null ? void 0 : navigator.credentials) === null || e === void 0 ? void 0 : e.create) == "function" && typeof ((t = navigator == null ? void 0 : navigator.credentials) === null || t === void 0 ? void 0 : t.get) == "function");
}
async function NI(e) {
  try {
    const t = await navigator.credentials.create(
      /** we assert the type here until typescript types are updated */
      e
    );
    return t ? t instanceof PublicKeyCredential ? { data: t, error: null } : {
      data: null,
      error: new yl("Browser returned unexpected credential type", t)
    } : {
      data: null,
      error: new yl("Empty credential response", t)
    };
  } catch (t) {
    return {
      data: null,
      error: TI({
        error: t,
        options: e
      })
    };
  }
}
async function II(e) {
  try {
    const t = await navigator.credentials.get(
      /** we assert the type here until typescript types are updated */
      e
    );
    return t ? t instanceof PublicKeyCredential ? { data: t, error: null } : {
      data: null,
      error: new yl("Browser returned unexpected credential type", t)
    } : {
      data: null,
      error: new yl("Empty credential response", t)
    };
  } catch (t) {
    return {
      data: null,
      error: EI({
        error: t,
        options: e
      })
    };
  }
}
const DI = {
  hints: ["security-key"],
  authenticatorSelection: {
    authenticatorAttachment: "cross-platform",
    requireResidentKey: !1,
    /** set to preferred because older yubikeys don't have PIN/Biometric */
    userVerification: "preferred",
    residentKey: "discouraged"
  },
  attestation: "direct"
}, MI = {
  /** set to preferred because older yubikeys don't have PIN/Biometric */
  userVerification: "preferred",
  hints: ["security-key"],
  attestation: "direct"
};
function vl(...e) {
  const t = (s) => s !== null && typeof s == "object" && !Array.isArray(s), n = (s) => s instanceof ArrayBuffer || ArrayBuffer.isView(s), r = {};
  for (const s of e)
    if (s)
      for (const i in s) {
        const o = s[i];
        if (o !== void 0)
          if (Array.isArray(o))
            r[i] = o;
          else if (n(o))
            r[i] = o;
          else if (t(o)) {
            const a = r[i];
            t(a) ? r[i] = vl(a, o) : r[i] = vl(o);
          } else
            r[i] = o;
      }
  return r;
}
function LI(e, t) {
  return vl(DI, e, t || {});
}
function $I(e, t) {
  return vl(MI, e, t || {});
}
class FI {
  constructor(t) {
    this.client = t, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
  }
  /**
   * Enroll a new WebAuthn factor.
   * Creates an unverified WebAuthn factor that must be verified with a credential.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Omit<MFAEnrollWebauthnParams, 'factorType'>} params - Enrollment parameters (friendlyName required)
   * @returns {Promise<AuthMFAEnrollWebauthnResponse>} Enrolled factor details or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registering a New Credential}
   */
  async _enroll(t) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, t), { factorType: "webauthn" }));
  }
  /**
   * Challenge for WebAuthn credential creation or authentication.
   * Combines server challenge with browser credential operations.
   * Handles both registration (create) and authentication (request) flows.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {MFAChallengeWebauthnParams & { friendlyName?: string; signal?: AbortSignal }} params - Challenge parameters including factorId
   * @param {Object} overrides - Allows you to override the parameters passed to navigator.credentials
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides.create - Override options for credential creation
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides.request - Override options for credential request
   * @returns {Promise<RequestResult>} Challenge response with credential or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-credential-creation W3C WebAuthn Spec - Credential Creation}
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying Assertion}
   */
  async _challenge({ factorId: t, webauthn: n, friendlyName: r, signal: s }, i) {
    try {
      const { data: o, error: a } = await this.client.mfa.challenge({
        factorId: t,
        webauthn: n
      });
      if (!o)
        return { data: null, error: a };
      const l = s ?? PI.createNewAbortSignal();
      if (o.webauthn.type === "create") {
        const { user: u } = o.webauthn.credential_options.publicKey;
        u.name || (u.name = `${u.id}:${r}`), u.displayName || (u.displayName = u.name);
      }
      switch (o.webauthn.type) {
        case "create": {
          const u = LI(o.webauthn.credential_options.publicKey, i == null ? void 0 : i.create), { data: c, error: d } = await NI({
            publicKey: u,
            signal: l
          });
          return c ? {
            data: {
              factorId: t,
              challengeId: o.id,
              webauthn: {
                type: o.webauthn.type,
                credential_response: c
              }
            },
            error: null
          } : { data: null, error: d };
        }
        case "request": {
          const u = $I(o.webauthn.credential_options.publicKey, i == null ? void 0 : i.request), { data: c, error: d } = await II(Object.assign(Object.assign({}, o.webauthn.credential_options), { publicKey: u, signal: l }));
          return c ? {
            data: {
              factorId: t,
              challengeId: o.id,
              webauthn: {
                type: o.webauthn.type,
                credential_response: c
              }
            },
            error: null
          } : { data: null, error: d };
        }
      }
    } catch (o) {
      return $(o) ? { data: null, error: o } : {
        data: null,
        error: new wr("Unexpected error in challenge", o)
      };
    }
  }
  /**
   * Verify a WebAuthn credential with the server.
   * Completes the WebAuthn ceremony by sending the credential to the server for verification.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Verification parameters
   * @param {string} params.challengeId - ID of the challenge being verified
   * @param {string} params.factorId - ID of the WebAuthn factor
   * @param {MFAVerifyWebauthnParams<T>['webauthn']} params.webauthn - WebAuthn credential response
   * @returns {Promise<AuthMFAVerifyResponse>} Verification result with session or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying an Authentication Assertion}
   * */
  async _verify({ challengeId: t, factorId: n, webauthn: r }) {
    return this.client.mfa.verify({
      factorId: n,
      challengeId: t,
      webauthn: r
    });
  }
  /**
   * Complete WebAuthn authentication flow.
   * Performs challenge and verification in a single operation for existing credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Authentication parameters
   * @param {string} params.factorId - ID of the WebAuthn factor to authenticate with
   * @param {Object} params.webauthn - WebAuthn configuration
   * @param {string} params.webauthn.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.webauthn.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.webauthn.signal - Optional abort signal
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides - Override options for navigator.credentials.get
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Authentication result
   * @see {@link https://w3c.github.io/webauthn/#sctn-authentication W3C WebAuthn Spec - Authentication Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions MDN - PublicKeyCredentialRequestOptions}
   */
  async _authenticate({ factorId: t, webauthn: { rpId: n = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0, signal: s } = {} }, i) {
    if (!n)
      return {
        data: null,
        error: new mo("rpId is required for WebAuthn authentication")
      };
    try {
      if (!uy())
        return {
          data: null,
          error: new wr("Browser does not support WebAuthn", null)
        };
      const { data: o, error: a } = await this.challenge({
        factorId: t,
        webauthn: { rpId: n, rpOrigins: r },
        signal: s
      }, { request: i });
      if (!o)
        return { data: null, error: a };
      const { webauthn: l } = o;
      return this._verify({
        factorId: t,
        challengeId: o.challengeId,
        webauthn: {
          type: l.type,
          rpId: n,
          rpOrigins: r,
          credential_response: l.credential_response
        }
      });
    } catch (o) {
      return $(o) ? { data: null, error: o } : {
        data: null,
        error: new wr("Unexpected error in authenticate", o)
      };
    }
  }
  /**
   * Complete WebAuthn registration flow.
   * Performs enrollment, challenge, and verification in a single operation for new credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Registration parameters
   * @param {string} params.friendlyName - User-friendly name for the credential
   * @param {string} params.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.signal - Optional abort signal
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides - Override options for navigator.credentials.create
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Registration result
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registration Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions MDN - PublicKeyCredentialCreationOptions}
   */
  async _register({ friendlyName: t, webauthn: { rpId: n = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0, signal: s } = {} }, i) {
    if (!n)
      return {
        data: null,
        error: new mo("rpId is required for WebAuthn registration")
      };
    try {
      if (!uy())
        return {
          data: null,
          error: new wr("Browser does not support WebAuthn", null)
        };
      const { data: o, error: a } = await this._enroll({
        friendlyName: t
      });
      if (!o)
        return await this.client.mfa.listFactors().then((c) => {
          var d;
          return (d = c.data) === null || d === void 0 ? void 0 : d.all.find((h) => h.factor_type === "webauthn" && h.friendly_name === t && h.status !== "unverified");
        }).then((c) => c ? this.client.mfa.unenroll({ factorId: c == null ? void 0 : c.id }) : void 0), { data: null, error: a };
      const { data: l, error: u } = await this._challenge({
        factorId: o.id,
        friendlyName: o.friendly_name,
        webauthn: { rpId: n, rpOrigins: r },
        signal: s
      }, {
        create: i
      });
      return l ? this._verify({
        factorId: o.id,
        challengeId: l.challengeId,
        webauthn: {
          rpId: n,
          rpOrigins: r,
          type: l.webauthn.type,
          credential_response: l.webauthn.credential_response
        }
      }) : { data: null, error: u };
    } catch (o) {
      return $(o) ? { data: null, error: o } : {
        data: null,
        error: new wr("Unexpected error in register", o)
      };
    }
  }
}
bI();
const VI = {
  url: MN,
  storageKey: LN,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: $N,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1,
  throwOnError: !1,
  lockAcquireTimeout: 1e4
  // 10 seconds
};
async function cy(e, t, n) {
  return await n();
}
const Yr = {};
class go {
  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  get jwks() {
    var t, n;
    return (n = (t = Yr[this.storageKey]) === null || t === void 0 ? void 0 : t.jwks) !== null && n !== void 0 ? n : { keys: [] };
  }
  set jwks(t) {
    Yr[this.storageKey] = Object.assign(Object.assign({}, Yr[this.storageKey]), { jwks: t });
  }
  get jwks_cached_at() {
    var t, n;
    return (n = (t = Yr[this.storageKey]) === null || t === void 0 ? void 0 : t.cachedAt) !== null && n !== void 0 ? n : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(t) {
    Yr[this.storageKey] = Object.assign(Object.assign({}, Yr[this.storageKey]), { cachedAt: t });
  }
  /**
   * Create a new client for use in the browser.
   *
   * @example
   * ```ts
   * import { GoTrueClient } from '@supabase/auth-js'
   *
   * const auth = new GoTrueClient({
   *   url: 'https://xyzcompany.supabase.co/auth/v1',
   *   headers: { apikey: 'public-anon-key' },
   *   storageKey: 'supabase-auth',
   * })
   * ```
   */
  constructor(t) {
    var n, r, s;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
    const i = Object.assign(Object.assign({}, VI), t);
    if (this.storageKey = i.storageKey, this.instanceID = (n = go.nextInstanceID[this.storageKey]) !== null && n !== void 0 ? n : 0, go.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!i.debug, typeof i.debug == "function" && (this.logger = i.debug), this.instanceID > 0 && Ae()) {
      const o = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
      console.warn(o), this.logDebugMessages && console.trace(o);
    }
    if (this.persistSession = i.persistSession, this.autoRefreshToken = i.autoRefreshToken, this.admin = new vI({
      url: i.url,
      headers: i.headers,
      fetch: i.fetch
    }), this.url = i.url, this.headers = i.headers, this.fetch = nS(i.fetch), this.lock = i.lock || cy, this.detectSessionInUrl = i.detectSessionInUrl, this.flowType = i.flowType, this.hasCustomAuthorizationHeader = i.hasCustomAuthorizationHeader, this.throwOnError = i.throwOnError, this.lockAcquireTimeout = i.lockAcquireTimeout, i.lock ? this.lock = i.lock : this.persistSession && Ae() && (!((r = globalThis == null ? void 0 : globalThis.navigator) === null || r === void 0) && r.locks) ? this.lock = xI : this.lock = cy, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      webauthn: new FI(this)
    }, this.oauth = {
      getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
      approveAuthorization: this._approveAuthorization.bind(this),
      denyAuthorization: this._denyAuthorization.bind(this),
      listGrants: this._listOAuthGrants.bind(this),
      revokeGrant: this._revokeOAuthGrant.bind(this)
    }, this.persistSession ? (i.storage ? this.storage = i.storage : tS() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = ly(this.memoryStorage)), i.userStorage && (this.userStorage = i.userStorage)) : (this.memoryStorage = {}, this.storage = ly(this.memoryStorage)), Ae() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (o) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", o);
      }
      (s = this.broadcastChannel) === null || s === void 0 || s.addEventListener("message", async (o) => {
        this._debug("received broadcast notification from other tab or client", o);
        try {
          await this._notifyAllSubscribers(o.data.event, o.data.session, !1);
        } catch (a) {
          this._debug("#broadcastChannel", "error", a);
        }
      });
    }
    this.initialize().catch((o) => {
      this._debug("#initialize()", "error", o);
    });
  }
  /**
   * Returns whether error throwing mode is enabled for this client.
   */
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  /**
   * Centralizes return handling with optional error throwing. When `throwOnError` is enabled
   * and the provided result contains a non-nullish error, the error is thrown instead of
   * being returned. This ensures consistent behavior across all public API methods.
   */
  _returnResult(t) {
    if (this.throwOnError && t && t.error)
      throw t.error;
    return t;
  }
  _logPrefix() {
    return `GoTrueClient@${this.storageKey}:${this.instanceID} (${Xb}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
  }
  _debug(...t) {
    return this.logDebugMessages && this.logger(this._logPrefix(), ...t), this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()))(), await this.initializePromise);
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    var t;
    try {
      let n = {}, r = "none";
      if (Ae() && (n = XN(window.location.href), this._isImplicitGrantCallback(n) ? r = "implicit" : await this._isPKCECallback(n) && (r = "pkce")), Ae() && this.detectSessionInUrl && r !== "none") {
        const { data: s, error: i } = await this._getSessionFromURL(n, r);
        if (i) {
          if (this._debug("#_initialize()", "error detecting session from URL", i), zN(i)) {
            const l = (t = i.details) === null || t === void 0 ? void 0 : t.code;
            if (l === "identity_already_exists" || l === "identity_not_found" || l === "single_identity_not_deletable")
              return { error: i };
          }
          return { error: i };
        }
        const { session: o, redirectType: a } = s;
        return this._debug("#_initialize()", "detected session in URL", o, "redirect type", a), await this._saveSession(o), setTimeout(async () => {
          a === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o) : await this._notifyAllSubscribers("SIGNED_IN", o);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (n) {
      return $(n) ? this._returnResult({ error: n }) : this._returnResult({
        error: new wr("Unexpected error during initialization", n)
      });
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(t) {
    var n, r, s;
    try {
      const i = await U(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (r = (n = t == null ? void 0 : t.options) === null || n === void 0 ? void 0 : n.data) !== null && r !== void 0 ? r : {},
          gotrue_meta_security: { captcha_token: (s = t == null ? void 0 : t.options) === null || s === void 0 ? void 0 : s.captchaToken }
        },
        xform: Tt
      }), { data: o, error: a } = i;
      if (a || !o)
        return this._returnResult({ data: { user: null, session: null }, error: a });
      const l = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), this._returnResult({ data: { user: u, session: l }, error: null });
    } catch (i) {
      if ($(i))
        return this._returnResult({ data: { user: null, session: null }, error: i });
      throw i;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(t) {
    var n, r, s;
    try {
      let i;
      if ("email" in t) {
        const { email: c, password: d, options: h } = t;
        let f = null, g = null;
        this.flowType === "pkce" && ([f, g] = await qr(this.storage, this.storageKey)), i = await U(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: h == null ? void 0 : h.emailRedirectTo,
          body: {
            email: c,
            password: d,
            data: (n = h == null ? void 0 : h.data) !== null && n !== void 0 ? n : {},
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken },
            code_challenge: f,
            code_challenge_method: g
          },
          xform: Tt
        });
      } else if ("phone" in t) {
        const { phone: c, password: d, options: h } = t;
        i = await U(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: c,
            password: d,
            data: (r = h == null ? void 0 : h.data) !== null && r !== void 0 ? r : {},
            channel: (s = h == null ? void 0 : h.channel) !== null && s !== void 0 ? s : "sms",
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken }
          },
          xform: Tt
        });
      } else
        throw new da("You must provide either an email or phone number and a password");
      const { data: o, error: a } = i;
      if (a || !o)
        return await Pe(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({ data: { user: null, session: null }, error: a });
      const l = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), this._returnResult({ data: { user: u, session: l }, error: null });
    } catch (i) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(i))
        return this._returnResult({ data: { user: null, session: null }, error: i });
      throw i;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(t) {
    try {
      let n;
      if ("email" in t) {
        const { email: i, password: o, options: a } = t;
        n = await U(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: oy
        });
      } else if ("phone" in t) {
        const { phone: i, password: o, options: a } = t;
        n = await U(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: oy
        });
      } else
        throw new da("You must provide either an email or phone number and a password");
      const { data: r, error: s } = n;
      if (s)
        return this._returnResult({ data: { user: null, session: null }, error: s });
      if (!r || !r.session || !r.user) {
        const i = new Kr();
        return this._returnResult({ data: { user: null, session: null }, error: i });
      }
      return r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), this._returnResult({
        data: Object.assign({ user: r.user, session: r.session }, r.weak_password ? { weakPassword: r.weak_password } : null),
        error: s
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: { user: null, session: null }, error: n });
      throw n;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(t) {
    var n, r, s, i;
    return await this._handleProviderSignIn(t.provider, {
      redirectTo: (n = t.options) === null || n === void 0 ? void 0 : n.redirectTo,
      scopes: (r = t.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams: (s = t.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect: (i = t.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(t) {
    return await this.initializePromise, this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(t));
  }
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
   * both of which derive from the EIP-4361 standard
   * With slight variation on Solana's side.
   * @reference https://eips.ethereum.org/EIPS/eip-4361
   */
  async signInWithWeb3(t) {
    const { chain: n } = t;
    switch (n) {
      case "ethereum":
        return await this.signInWithEthereum(t);
      case "solana":
        return await this.signInWithSolana(t);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${n}"`);
    }
  }
  async signInWithEthereum(t) {
    var n, r, s, i, o, a, l, u, c, d, h;
    let f, g;
    if ("message" in t)
      f = t.message, g = t.signature;
    else {
      const { chain: y, wallet: w, statement: p, options: m } = t;
      let v;
      if (Ae())
        if (typeof w == "object")
          v = w;
        else {
          const A = window;
          if ("ethereum" in A && typeof A.ethereum == "object" && "request" in A.ethereum && typeof A.ethereum.request == "function")
            v = A.ethereum;
          else
            throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof w != "object" || !(m != null && m.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        v = w;
      }
      const x = new URL((n = m == null ? void 0 : m.url) !== null && n !== void 0 ? n : window.location.href), S = await v.request({
        method: "eth_requestAccounts"
      }).then((A) => A).catch(() => {
        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
      });
      if (!S || S.length === 0)
        throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
      const k = sS(S[0]);
      let T = (r = m == null ? void 0 : m.signInWithEthereum) === null || r === void 0 ? void 0 : r.chainId;
      if (!T) {
        const A = await v.request({
          method: "eth_chainId"
        });
        T = SI(A);
      }
      const E = {
        domain: x.host,
        address: k,
        statement: p,
        uri: x.href,
        version: "1",
        chainId: T,
        nonce: (s = m == null ? void 0 : m.signInWithEthereum) === null || s === void 0 ? void 0 : s.nonce,
        issuedAt: (o = (i = m == null ? void 0 : m.signInWithEthereum) === null || i === void 0 ? void 0 : i.issuedAt) !== null && o !== void 0 ? o : /* @__PURE__ */ new Date(),
        expirationTime: (a = m == null ? void 0 : m.signInWithEthereum) === null || a === void 0 ? void 0 : a.expirationTime,
        notBefore: (l = m == null ? void 0 : m.signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
        requestId: (u = m == null ? void 0 : m.signInWithEthereum) === null || u === void 0 ? void 0 : u.requestId,
        resources: (c = m == null ? void 0 : m.signInWithEthereum) === null || c === void 0 ? void 0 : c.resources
      };
      f = kI(E), g = await v.request({
        method: "personal_sign",
        params: [_I(f), k]
      });
    }
    try {
      const { data: y, error: w } = await U(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message: f,
          signature: g
        }, !((d = t.options) === null || d === void 0) && d.captchaToken ? { gotrue_meta_security: { captcha_token: (h = t.options) === null || h === void 0 ? void 0 : h.captchaToken } } : null),
        xform: Tt
      });
      if (w)
        throw w;
      if (!y || !y.session || !y.user) {
        const p = new Kr();
        return this._returnResult({ data: { user: null, session: null }, error: p });
      }
      return y.session && (await this._saveSession(y.session), await this._notifyAllSubscribers("SIGNED_IN", y.session)), this._returnResult({ data: Object.assign({}, y), error: w });
    } catch (y) {
      if ($(y))
        return this._returnResult({ data: { user: null, session: null }, error: y });
      throw y;
    }
  }
  async signInWithSolana(t) {
    var n, r, s, i, o, a, l, u, c, d, h, f;
    let g, y;
    if ("message" in t)
      g = t.message, y = t.signature;
    else {
      const { chain: w, wallet: p, statement: m, options: v } = t;
      let x;
      if (Ae())
        if (typeof p == "object")
          x = p;
        else {
          const k = window;
          if ("solana" in k && typeof k.solana == "object" && ("signIn" in k.solana && typeof k.solana.signIn == "function" || "signMessage" in k.solana && typeof k.solana.signMessage == "function"))
            x = k.solana;
          else
            throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof p != "object" || !(v != null && v.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        x = p;
      }
      const S = new URL((n = v == null ? void 0 : v.url) !== null && n !== void 0 ? n : window.location.href);
      if ("signIn" in x && x.signIn) {
        const k = await x.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, v == null ? void 0 : v.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: S.host,
          uri: S.href
        }), m ? { statement: m } : null));
        let T;
        if (Array.isArray(k) && k[0] && typeof k[0] == "object")
          T = k[0];
        else if (k && typeof k == "object" && "signedMessage" in k && "signature" in k)
          T = k;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in T && "signature" in T && (typeof T.signedMessage == "string" || T.signedMessage instanceof Uint8Array) && T.signature instanceof Uint8Array)
          g = typeof T.signedMessage == "string" ? T.signedMessage : new TextDecoder().decode(T.signedMessage), y = T.signature;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in x) || typeof x.signMessage != "function" || !("publicKey" in x) || typeof x != "object" || !x.publicKey || !("toBase58" in x.publicKey) || typeof x.publicKey.toBase58 != "function")
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        g = [
          `${S.host} wants you to sign in with your Solana account:`,
          x.publicKey.toBase58(),
          ...m ? ["", m, ""] : [""],
          "Version: 1",
          `URI: ${S.href}`,
          `Issued At: ${(s = (r = v == null ? void 0 : v.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && s !== void 0 ? s : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...!((i = v == null ? void 0 : v.signInWithSolana) === null || i === void 0) && i.notBefore ? [`Not Before: ${v.signInWithSolana.notBefore}`] : [],
          ...!((o = v == null ? void 0 : v.signInWithSolana) === null || o === void 0) && o.expirationTime ? [`Expiration Time: ${v.signInWithSolana.expirationTime}`] : [],
          ...!((a = v == null ? void 0 : v.signInWithSolana) === null || a === void 0) && a.chainId ? [`Chain ID: ${v.signInWithSolana.chainId}`] : [],
          ...!((l = v == null ? void 0 : v.signInWithSolana) === null || l === void 0) && l.nonce ? [`Nonce: ${v.signInWithSolana.nonce}`] : [],
          ...!((u = v == null ? void 0 : v.signInWithSolana) === null || u === void 0) && u.requestId ? [`Request ID: ${v.signInWithSolana.requestId}`] : [],
          ...!((d = (c = v == null ? void 0 : v.signInWithSolana) === null || c === void 0 ? void 0 : c.resources) === null || d === void 0) && d.length ? [
            "Resources",
            ...v.signInWithSolana.resources.map((T) => `- ${T}`)
          ] : []
        ].join(`
`);
        const k = await x.signMessage(new TextEncoder().encode(g), "utf8");
        if (!k || !(k instanceof Uint8Array))
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        y = k;
      }
    }
    try {
      const { data: w, error: p } = await U(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message: g, signature: Tr(y) }, !((h = t.options) === null || h === void 0) && h.captchaToken ? { gotrue_meta_security: { captcha_token: (f = t.options) === null || f === void 0 ? void 0 : f.captchaToken } } : null),
        xform: Tt
      });
      if (p)
        throw p;
      if (!w || !w.session || !w.user) {
        const m = new Kr();
        return this._returnResult({ data: { user: null, session: null }, error: m });
      }
      return w.session && (await this._saveSession(w.session), await this._notifyAllSubscribers("SIGNED_IN", w.session)), this._returnResult({ data: Object.assign({}, w), error: p });
    } catch (w) {
      if ($(w))
        return this._returnResult({ data: { user: null, session: null }, error: w });
      throw w;
    }
  }
  async _exchangeCodeForSession(t) {
    const n = await dr(this.storage, `${this.storageKey}-code-verifier`), [r, s] = (n ?? "").split("/");
    try {
      if (!r && this.flowType === "pkce")
        throw new WN();
      const { data: i, error: o } = await U(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: t,
          code_verifier: r
        },
        xform: Tt
      });
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      if (!i || !i.session || !i.user) {
        const a = new Kr();
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: a
        });
      }
      return i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), this._returnResult({ data: Object.assign(Object.assign({}, i), { redirectType: s ?? null }), error: o });
    } catch (i) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(i))
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: i
        });
      throw i;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(t) {
    try {
      const { options: n, provider: r, token: s, access_token: i, nonce: o } = t, a = await U(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: r,
          id_token: s,
          access_token: i,
          nonce: o,
          gotrue_meta_security: { captcha_token: n == null ? void 0 : n.captchaToken }
        },
        xform: Tt
      }), { data: l, error: u } = a;
      if (u)
        return this._returnResult({ data: { user: null, session: null }, error: u });
      if (!l || !l.session || !l.user) {
        const c = new Kr();
        return this._returnResult({ data: { user: null, session: null }, error: c });
      }
      return l.session && (await this._saveSession(l.session), await this._notifyAllSubscribers("SIGNED_IN", l.session)), this._returnResult({ data: l, error: u });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: { user: null, session: null }, error: n });
      throw n;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(t) {
    var n, r, s, i, o;
    try {
      if ("email" in t) {
        const { email: a, options: l } = t;
        let u = null, c = null;
        this.flowType === "pkce" && ([u, c] = await qr(this.storage, this.storageKey));
        const { error: d } = await U(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: a,
            data: (n = l == null ? void 0 : l.data) !== null && n !== void 0 ? n : {},
            create_user: (r = l == null ? void 0 : l.shouldCreateUser) !== null && r !== void 0 ? r : !0,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
            code_challenge: u,
            code_challenge_method: c
          },
          redirectTo: l == null ? void 0 : l.emailRedirectTo
        });
        return this._returnResult({ data: { user: null, session: null }, error: d });
      }
      if ("phone" in t) {
        const { phone: a, options: l } = t, { data: u, error: c } = await U(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: a,
            data: (s = l == null ? void 0 : l.data) !== null && s !== void 0 ? s : {},
            create_user: (i = l == null ? void 0 : l.shouldCreateUser) !== null && i !== void 0 ? i : !0,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
            channel: (o = l == null ? void 0 : l.channel) !== null && o !== void 0 ? o : "sms"
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: u == null ? void 0 : u.message_id },
          error: c
        });
      }
      throw new da("You must provide either an email or phone number.");
    } catch (a) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(a))
        return this._returnResult({ data: { user: null, session: null }, error: a });
      throw a;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(t) {
    var n, r;
    try {
      let s, i;
      "options" in t && (s = (n = t.options) === null || n === void 0 ? void 0 : n.redirectTo, i = (r = t.options) === null || r === void 0 ? void 0 : r.captchaToken);
      const { data: o, error: a } = await U(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, t), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: s,
        xform: Tt
      });
      if (a)
        throw a;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const l = o.session, u = o.user;
      return l != null && l.access_token && (await this._saveSession(l), await this._notifyAllSubscribers(t.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), this._returnResult({ data: { user: u, session: l }, error: null });
    } catch (s) {
      if ($(s))
        return this._returnResult({ data: { user: null, session: null }, error: s });
      throw s;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(t) {
    var n, r, s, i, o;
    try {
      let a = null, l = null;
      this.flowType === "pkce" && ([a, l] = await qr(this.storage, this.storageKey));
      const u = await U(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in t ? { provider_id: t.providerId } : null), "domain" in t ? { domain: t.domain } : null), { redirect_to: (r = (n = t.options) === null || n === void 0 ? void 0 : n.redirectTo) !== null && r !== void 0 ? r : void 0 }), !((s = t == null ? void 0 : t.options) === null || s === void 0) && s.captchaToken ? { gotrue_meta_security: { captcha_token: t.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: a, code_challenge_method: l }),
        headers: this.headers,
        xform: mI
      });
      return !((i = u.data) === null || i === void 0) && i.url && Ae() && !(!((o = t.options) === null || o === void 0) && o.skipBrowserRedirect) && window.location.assign(u.data.url), this._returnResult(u);
    } catch (a) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(a))
        return this._returnResult({ data: null, error: a });
      throw a;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (t) => {
        const { data: { session: n }, error: r } = t;
        if (r)
          throw r;
        if (!n)
          throw new nt();
        const { error: s } = await U(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: n.access_token
        });
        return this._returnResult({ data: { user: null, session: null }, error: s });
      });
    } catch (t) {
      if ($(t))
        return this._returnResult({ data: { user: null, session: null }, error: t });
      throw t;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(t) {
    try {
      const n = `${this.url}/resend`;
      if ("email" in t) {
        const { email: r, type: s, options: i } = t, { error: o } = await U(this.fetch, "POST", n, {
          headers: this.headers,
          body: {
            email: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return this._returnResult({ data: { user: null, session: null }, error: o });
      } else if ("phone" in t) {
        const { phone: r, type: s, options: i } = t, { data: o, error: a } = await U(this.fetch, "POST", n, {
          headers: this.headers,
          body: {
            phone: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: o == null ? void 0 : o.message_id },
          error: a
        });
      }
      throw new da("You must provide either an email or phone number and a type");
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: { user: null, session: null }, error: n });
      throw n;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async (n) => n));
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(t, n) {
    this._debug("#_acquireLock", "begin", t);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s = (async () => (await r, await n()))();
        return this.pendingInLock.push((async () => {
          try {
            await s;
          } catch {
          }
        })()), s;
      }
      return await this.lock(`lock:${this.storageKey}`, t, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const r = n();
          for (this.pendingInLock.push((async () => {
            try {
              await r;
            } catch {
            }
          })()), await r; this.pendingInLock.length; ) {
            const s = [...this.pendingInLock];
            await Promise.all(s), this.pendingInLock.splice(0, s.length);
          }
          return await r;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(t) {
    this._debug("#_useSession", "begin");
    try {
      const n = await this.__loadSession();
      return await t(n);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    try {
      let t = null;
      const n = await dr(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", n), n !== null && (this._isValidSession(n) ? t = n : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t)
        return { data: { session: null }, error: null };
      const r = t.expires_at ? t.expires_at * 1e3 - Date.now() < Xu : !1;
      if (this._debug("#__loadSession()", `session has${r ? "" : " not"} expired`, "expires_at", t.expires_at), !r) {
        if (this.userStorage) {
          const o = await dr(this.userStorage, this.storageKey + "-user");
          o != null && o.user ? t.user = o.user : t.user = tc();
        }
        if (this.storage.isServer && t.user && !t.user.__isUserNotAvailableProxy) {
          const o = { value: this.suppressGetSessionWarning };
          t.user = dI(t.user, o), o.value && (this.suppressGetSessionWarning = !0);
        }
        return { data: { session: t }, error: null };
      }
      const { data: s, error: i } = await this._callRefreshToken(t.refresh_token);
      return i ? this._returnResult({ data: { session: null }, error: i }) : this._returnResult({ data: { session: s }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(t) {
    if (t)
      return await this._getUser(t);
    await this.initializePromise;
    const n = await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser());
    return n.data.user && (this.suppressGetSessionWarning = !0), n;
  }
  async _getUser(t) {
    try {
      return t ? await U(this.fetch, "GET", `${this.url}/user`, {
        headers: this.headers,
        jwt: t,
        xform: Nn
      }) : await this._useSession(async (n) => {
        var r, s, i;
        const { data: o, error: a } = n;
        if (a)
          throw a;
        return !(!((r = o.session) === null || r === void 0) && r.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new nt() } : await U(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (s = o.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0,
          xform: Nn
        });
      });
    } catch (n) {
      if ($(n))
        return Zu(n) && (await this._removeSession(), await Pe(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ data: { user: null }, error: n });
      throw n;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(t, n = {}) {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(t, n));
  }
  async _updateUser(t, n = {}) {
    try {
      return await this._useSession(async (r) => {
        const { data: s, error: i } = r;
        if (i)
          throw i;
        if (!s.session)
          throw new nt();
        const o = s.session;
        let a = null, l = null;
        this.flowType === "pkce" && t.email != null && ([a, l] = await qr(this.storage, this.storageKey));
        const { data: u, error: c } = await U(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: n == null ? void 0 : n.emailRedirectTo,
          body: Object.assign(Object.assign({}, t), { code_challenge: a, code_challenge_method: l }),
          jwt: o.access_token,
          xform: Nn
        });
        if (c)
          throw c;
        return o.user = u.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), this._returnResult({ data: { user: o.user }, error: null });
      });
    } catch (r) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(r))
        return this._returnResult({ data: { user: null }, error: r });
      throw r;
    }
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(t) {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(t));
  }
  async _setSession(t) {
    try {
      if (!t.access_token || !t.refresh_token)
        throw new nt();
      const n = Date.now() / 1e3;
      let r = n, s = !0, i = null;
      const { payload: o } = fa(t.access_token);
      if (o.exp && (r = o.exp, s = r <= n), s) {
        const { data: a, error: l } = await this._callRefreshToken(t.refresh_token);
        if (l)
          return this._returnResult({ data: { user: null, session: null }, error: l });
        if (!a)
          return { data: { user: null, session: null }, error: null };
        i = a;
      } else {
        const { data: a, error: l } = await this._getUser(t.access_token);
        if (l)
          return this._returnResult({ data: { user: null, session: null }, error: l });
        i = {
          access_token: t.access_token,
          refresh_token: t.refresh_token,
          user: a.user,
          token_type: "bearer",
          expires_in: r - n,
          expires_at: r
        }, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i);
      }
      return this._returnResult({ data: { user: i.user, session: i }, error: null });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: { session: null, user: null }, error: n });
      throw n;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(t) {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(t));
  }
  async _refreshSession(t) {
    try {
      return await this._useSession(async (n) => {
        var r;
        if (!t) {
          const { data: o, error: a } = n;
          if (a)
            throw a;
          t = (r = o.session) !== null && r !== void 0 ? r : void 0;
        }
        if (!(t != null && t.refresh_token))
          throw new nt();
        const { data: s, error: i } = await this._callRefreshToken(t.refresh_token);
        return i ? this._returnResult({ data: { user: null, session: null }, error: i }) : s ? this._returnResult({ data: { user: s.user, session: s }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: { user: null, session: null }, error: n });
      throw n;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(t, n) {
    try {
      if (!Ae())
        throw new ha("No browser detected.");
      if (t.error || t.error_description || t.error_code)
        throw new ha(t.error_description || "Error in URL with unspecified error_description", {
          error: t.error || "unspecified_error",
          code: t.error_code || "unspecified_code"
        });
      switch (n) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new Zg("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new ha("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (n === "pkce") {
        if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !t.code)
          throw new Zg("No code detected.");
        const { data: m, error: v } = await this._exchangeCodeForSession(t.code);
        if (v)
          throw v;
        const x = new URL(window.location.href);
        return x.searchParams.delete("code"), window.history.replaceState(window.history.state, "", x.toString()), { data: { session: m.session, redirectType: null }, error: null };
      }
      const { provider_token: r, provider_refresh_token: s, access_token: i, refresh_token: o, expires_in: a, expires_at: l, token_type: u } = t;
      if (!i || !a || !o || !u)
        throw new ha("No session defined in URL");
      const c = Math.round(Date.now() / 1e3), d = parseInt(a);
      let h = c + d;
      l && (h = parseInt(l));
      const f = h - c;
      f * 1e3 <= Xr && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${d}s`);
      const g = h - d;
      c - g >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", g, h, c) : c - g < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", g, h, c);
      const { data: y, error: w } = await this._getUser(i);
      if (w)
        throw w;
      const p = {
        provider_token: r,
        provider_refresh_token: s,
        access_token: i,
        expires_in: d,
        expires_at: h,
        refresh_token: o,
        token_type: u,
        user: y.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: p, redirectType: t.type }, error: null });
    } catch (r) {
      if ($(r))
        return this._returnResult({ data: { session: null, redirectType: null }, error: r });
      throw r;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   *
   * If `detectSessionInUrl` is a function, it will be called with the URL and params to determine
   * if the URL should be processed as a Supabase auth callback. This allows users to exclude
   * URLs from other OAuth providers (e.g., Facebook Login) that also return access_token in the fragment.
   */
  _isImplicitGrantCallback(t) {
    return typeof this.detectSessionInUrl == "function" ? this.detectSessionInUrl(new URL(window.location.href), t) : !!(t.access_token || t.error_description);
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCECallback(t) {
    const n = await dr(this.storage, `${this.storageKey}-code-verifier`);
    return !!(t.code && n);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(t = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(t));
  }
  async _signOut({ scope: t } = { scope: "global" }) {
    return await this._useSession(async (n) => {
      var r;
      const { data: s, error: i } = n;
      if (i && !Zu(i))
        return this._returnResult({ error: i });
      const o = (r = s.session) === null || r === void 0 ? void 0 : r.access_token;
      if (o) {
        const { error: a } = await this.admin.signOut(o, t);
        if (a && !(BN(a) && (a.status === 404 || a.status === 401 || a.status === 403) || Zu(a)))
          return this._returnResult({ error: a });
      }
      return t !== "others" && (await this._removeSession(), await Pe(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ error: null });
    });
  }
  onAuthStateChange(t) {
    const n = JN(), r = {
      id: n,
      callback: t,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", n), this.stateChangeEmitters.delete(n);
      }
    };
    return this._debug("#onAuthStateChange()", "registered callback with id", n), this.stateChangeEmitters.set(n, r), (async () => (await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => {
      this._emitInitialSession(n);
    })))(), { data: { subscription: r } };
  }
  async _emitInitialSession(t) {
    return await this._useSession(async (n) => {
      var r, s;
      try {
        const { data: { session: i }, error: o } = n;
        if (o)
          throw o;
        await ((r = this.stateChangeEmitters.get(t)) === null || r === void 0 ? void 0 : r.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", t, "session", i);
      } catch (i) {
        await ((s = this.stateChangeEmitters.get(t)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", t, "error", i), console.error(i);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(t, n = {}) {
    let r = null, s = null;
    this.flowType === "pkce" && ([r, s] = await qr(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await U(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: t,
          code_challenge: r,
          code_challenge_method: s,
          gotrue_meta_security: { captcha_token: n.captchaToken }
        },
        headers: this.headers,
        redirectTo: n.redirectTo
      });
    } catch (i) {
      if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(i))
        return this._returnResult({ data: null, error: i });
      throw i;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var t;
    try {
      const { data: n, error: r } = await this.getUser();
      if (r)
        throw r;
      return this._returnResult({ data: { identities: (t = n.user.identities) !== null && t !== void 0 ? t : [] }, error: null });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async linkIdentity(t) {
    return "token" in t ? this.linkIdentityIdToken(t) : this.linkIdentityOAuth(t);
  }
  async linkIdentityOAuth(t) {
    var n;
    try {
      const { data: r, error: s } = await this._useSession(async (i) => {
        var o, a, l, u, c;
        const { data: d, error: h } = i;
        if (h)
          throw h;
        const f = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, t.provider, {
          redirectTo: (o = t.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (a = t.options) === null || a === void 0 ? void 0 : a.scopes,
          queryParams: (l = t.options) === null || l === void 0 ? void 0 : l.queryParams,
          skipBrowserRedirect: !0
        });
        return await U(this.fetch, "GET", f, {
          headers: this.headers,
          jwt: (c = (u = d.session) === null || u === void 0 ? void 0 : u.access_token) !== null && c !== void 0 ? c : void 0
        });
      });
      if (s)
        throw s;
      return Ae() && !(!((n = t.options) === null || n === void 0) && n.skipBrowserRedirect) && window.location.assign(r == null ? void 0 : r.url), this._returnResult({
        data: { provider: t.provider, url: r == null ? void 0 : r.url },
        error: null
      });
    } catch (r) {
      if ($(r))
        return this._returnResult({ data: { provider: t.provider, url: null }, error: r });
      throw r;
    }
  }
  async linkIdentityIdToken(t) {
    return await this._useSession(async (n) => {
      var r;
      try {
        const { error: s, data: { session: i } } = n;
        if (s)
          throw s;
        const { options: o, provider: a, token: l, access_token: u, nonce: c } = t, d = await U(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
          headers: this.headers,
          jwt: (r = i == null ? void 0 : i.access_token) !== null && r !== void 0 ? r : void 0,
          body: {
            provider: a,
            id_token: l,
            access_token: u,
            nonce: c,
            link_identity: !0,
            gotrue_meta_security: { captcha_token: o == null ? void 0 : o.captchaToken }
          },
          xform: Tt
        }), { data: h, error: f } = d;
        return f ? this._returnResult({ data: { user: null, session: null }, error: f }) : !h || !h.session || !h.user ? this._returnResult({
          data: { user: null, session: null },
          error: new Kr()
        }) : (h.session && (await this._saveSession(h.session), await this._notifyAllSubscribers("USER_UPDATED", h.session)), this._returnResult({ data: h, error: f }));
      } catch (s) {
        if (await Pe(this.storage, `${this.storageKey}-code-verifier`), $(s))
          return this._returnResult({ data: { user: null, session: null }, error: s });
        throw s;
      }
    });
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(t) {
    try {
      return await this._useSession(async (n) => {
        var r, s;
        const { data: i, error: o } = n;
        if (o)
          throw o;
        return await U(this.fetch, "DELETE", `${this.url}/user/identities/${t.identity_id}`, {
          headers: this.headers,
          jwt: (s = (r = i.session) === null || r === void 0 ? void 0 : r.access_token) !== null && s !== void 0 ? s : void 0
        });
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(t) {
    const n = `#_refreshAccessToken(${t.substring(0, 5)}...)`;
    this._debug(n, "begin");
    try {
      const r = Date.now();
      return await tI(async (s) => (s > 0 && await eI(200 * Math.pow(2, s - 1)), this._debug(n, "refreshing attempt", s), await U(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: t },
        headers: this.headers,
        xform: Tt
      })), (s, i) => {
        const o = 200 * Math.pow(2, s);
        return i && ec(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + o - r < Xr;
      });
    } catch (r) {
      if (this._debug(n, "error", r), $(r))
        return this._returnResult({ data: { session: null, user: null }, error: r });
      throw r;
    } finally {
      this._debug(n, "end");
    }
  }
  _isValidSession(t) {
    return typeof t == "object" && t !== null && "access_token" in t && "refresh_token" in t && "expires_at" in t;
  }
  async _handleProviderSignIn(t, n) {
    const r = await this._getUrlForProvider(`${this.url}/authorize`, t, {
      redirectTo: n.redirectTo,
      scopes: n.scopes,
      queryParams: n.queryParams
    });
    return this._debug("#_handleProviderSignIn()", "provider", t, "options", n, "url", r), Ae() && !n.skipBrowserRedirect && window.location.assign(r), { data: { provider: t, url: r }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var t, n;
    const r = "#_recoverAndRefresh()";
    this._debug(r, "begin");
    try {
      const s = await dr(this.storage, this.storageKey);
      if (s && this.userStorage) {
        let o = await dr(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o && (o = { user: s.user }, await Zr(this.userStorage, this.storageKey + "-user", o)), s.user = (t = o == null ? void 0 : o.user) !== null && t !== void 0 ? t : tc();
      } else if (s && !s.user && !s.user) {
        const o = await dr(this.storage, this.storageKey + "-user");
        o && (o != null && o.user) ? (s.user = o.user, await Pe(this.storage, this.storageKey + "-user"), await Zr(this.storage, this.storageKey, s)) : s.user = tc();
      }
      if (this._debug(r, "session from storage", s), !this._isValidSession(s)) {
        this._debug(r, "session is not valid"), s !== null && await this._removeSession();
        return;
      }
      const i = ((n = s.expires_at) !== null && n !== void 0 ? n : 1 / 0) * 1e3 - Date.now() < Xu;
      if (this._debug(r, `session has${i ? "" : " not"} expired with margin of ${Xu}s`), i) {
        if (this.autoRefreshToken && s.refresh_token) {
          const { error: o } = await this._callRefreshToken(s.refresh_token);
          o && (console.error(o), ec(o) || (this._debug(r, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else if (s.user && s.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: a } = await this._getUser(s.access_token);
          !a && (o != null && o.user) ? (s.user = o.user, await this._saveSession(s), await this._notifyAllSubscribers("SIGNED_IN", s)) : this._debug(r, "could not get user data, skipping SIGNED_IN notification");
        } catch (o) {
          console.error("Error getting user data:", o), this._debug(r, "error getting user data, skipping SIGNED_IN notification", o);
        }
      else
        await this._notifyAllSubscribers("SIGNED_IN", s);
    } catch (s) {
      this._debug(r, "error", s), console.error(s);
      return;
    } finally {
      this._debug(r, "end");
    }
  }
  async _callRefreshToken(t) {
    var n, r;
    if (!t)
      throw new nt();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const s = `#_callRefreshToken(${t.substring(0, 5)}...)`;
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new Xl();
      const { data: i, error: o } = await this._refreshAccessToken(t);
      if (o)
        throw o;
      if (!i.session)
        throw new nt();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const a = { data: i.session, error: null };
      return this.refreshingDeferred.resolve(a), a;
    } catch (i) {
      if (this._debug(s, "error", i), $(i)) {
        const o = { data: null, error: i };
        return ec(i) || await this._removeSession(), (n = this.refreshingDeferred) === null || n === void 0 || n.resolve(o), o;
      }
      throw (r = this.refreshingDeferred) === null || r === void 0 || r.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(s, "end");
    }
  }
  async _notifyAllSubscribers(t, n, r = !0) {
    const s = `#_notifyAllSubscribers(${t})`;
    this._debug(s, "begin", n, `broadcast = ${r}`);
    try {
      this.broadcastChannel && r && this.broadcastChannel.postMessage({ event: t, session: n });
      const i = [], o = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
        try {
          await a.callback(t, n);
        } catch (l) {
          i.push(l);
        }
      });
      if (await Promise.all(o), i.length > 0) {
        for (let a = 0; a < i.length; a += 1)
          console.error(i[a]);
        throw i[0];
      }
    } finally {
      this._debug(s, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(t) {
    this._debug("#_saveSession()", t), this.suppressGetSessionWarning = !0, await Pe(this.storage, `${this.storageKey}-code-verifier`);
    const n = Object.assign({}, t), r = n.user && n.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !r && n.user && await Zr(this.userStorage, this.storageKey + "-user", {
        user: n.user
      });
      const s = Object.assign({}, n);
      delete s.user;
      const i = sy(s);
      await Zr(this.storage, this.storageKey, i);
    } else {
      const s = sy(n);
      await Zr(this.storage, this.storageKey, s);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()"), this.suppressGetSessionWarning = !1, await Pe(this.storage, this.storageKey), await Pe(this.storage, this.storageKey + "-code-verifier"), await Pe(this.storage, this.storageKey + "-user"), this.userStorage && await Pe(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const t = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      t && Ae() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", t);
    } catch (n) {
      console.error("removing visibilitychange callback failed", n);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    const t = setInterval(() => this._autoRefreshTokenTick(), Xr);
    this.autoRefreshTicker = t, t && typeof t == "object" && typeof t.unref == "function" ? t.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(t);
    const n = setTimeout(async () => {
      await this.initializePromise, await this._autoRefreshTokenTick();
    }, 0);
    this.autoRefreshTickTimeout = n, n && typeof n == "object" && typeof n.unref == "function" ? n.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(n);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const t = this.autoRefreshTicker;
    this.autoRefreshTicker = null, t && clearInterval(t);
    const n = this.autoRefreshTickTimeout;
    this.autoRefreshTickTimeout = null, n && clearTimeout(n);
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const t = Date.now();
          try {
            return await this._useSession(async (n) => {
              const { data: { session: r } } = n;
              if (!r || !r.refresh_token || !r.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const s = Math.floor((r.expires_at * 1e3 - t) / Xr);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${s} ticks, a tick lasts ${Xr}ms, refresh threshold is ${Fd} ticks`), s <= Fd && await this._callRefreshToken(r.refresh_token);
            });
          } catch (n) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", n);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (t) {
      if (t.isAcquireTimeout || t instanceof rS)
        this._debug("auto refresh token tick lock not available");
      else
        throw t;
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    if (this._debug("#_handleVisibilityChange()"), !Ae() || !(window != null && window.addEventListener))
      return this.autoRefreshToken && this.startAutoRefresh(), !1;
    try {
      this.visibilityChangedCallback = async () => {
        try {
          await this._onVisibilityChanged(!1);
        } catch (t) {
          this._debug("#visibilityChangedCallback", "error", t);
        }
      }, window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0);
    } catch (t) {
      console.error("_handleVisibilityChange", t);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(t) {
    const n = `#_onVisibilityChanged(${t})`;
    this._debug(n, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), t || (await this.initializePromise, await this._acquireLock(this.lockAcquireTimeout, async () => {
      if (document.visibilityState !== "visible") {
        this._debug(n, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        return;
      }
      await this._recoverAndRefresh();
    }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(t, n, r) {
    const s = [`provider=${encodeURIComponent(n)}`];
    if (r != null && r.redirectTo && s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`), r != null && r.scopes && s.push(`scopes=${encodeURIComponent(r.scopes)}`), this.flowType === "pkce") {
      const [i, o] = await qr(this.storage, this.storageKey), a = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      s.push(a.toString());
    }
    if (r != null && r.queryParams) {
      const i = new URLSearchParams(r.queryParams);
      s.push(i.toString());
    }
    return r != null && r.skipBrowserRedirect && s.push(`skip_http_redirect=${r.skipBrowserRedirect}`), `${t}?${s.join("&")}`;
  }
  async _unenroll(t) {
    try {
      return await this._useSession(async (n) => {
        var r;
        const { data: s, error: i } = n;
        return i ? this._returnResult({ data: null, error: i }) : await U(this.fetch, "DELETE", `${this.url}/factors/${t.factorId}`, {
          headers: this.headers,
          jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
        });
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _enroll(t) {
    try {
      return await this._useSession(async (n) => {
        var r, s;
        const { data: i, error: o } = n;
        if (o)
          return this._returnResult({ data: null, error: o });
        const a = Object.assign({ friendly_name: t.friendlyName, factor_type: t.factorType }, t.factorType === "phone" ? { phone: t.phone } : t.factorType === "totp" ? { issuer: t.issuer } : {}), { data: l, error: u } = await U(this.fetch, "POST", `${this.url}/factors`, {
          body: a,
          headers: this.headers,
          jwt: (r = i == null ? void 0 : i.session) === null || r === void 0 ? void 0 : r.access_token
        });
        return u ? this._returnResult({ data: null, error: u }) : (t.factorType === "totp" && l.type === "totp" && (!((s = l == null ? void 0 : l.totp) === null || s === void 0) && s.qr_code) && (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`), this._returnResult({ data: l, error: null }));
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _verify(t) {
    return this._acquireLock(this.lockAcquireTimeout, async () => {
      try {
        return await this._useSession(async (n) => {
          var r;
          const { data: s, error: i } = n;
          if (i)
            return this._returnResult({ data: null, error: i });
          const o = Object.assign({ challenge_id: t.challengeId }, "webauthn" in t ? {
            webauthn: Object.assign(Object.assign({}, t.webauthn), { credential_response: t.webauthn.type === "create" ? OI(t.webauthn.credential_response) : jI(t.webauthn.credential_response) })
          } : { code: t.code }), { data: a, error: l } = await U(this.fetch, "POST", `${this.url}/factors/${t.factorId}/verify`, {
            body: o,
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
          return l ? this._returnResult({ data: null, error: l }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a.expires_in }, a)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a), this._returnResult({ data: a, error: l }));
        });
      } catch (n) {
        if ($(n))
          return this._returnResult({ data: null, error: n });
        throw n;
      }
    });
  }
  async _challenge(t) {
    return this._acquireLock(this.lockAcquireTimeout, async () => {
      try {
        return await this._useSession(async (n) => {
          var r;
          const { data: s, error: i } = n;
          if (i)
            return this._returnResult({ data: null, error: i });
          const o = await U(this.fetch, "POST", `${this.url}/factors/${t.factorId}/challenge`, {
            body: t,
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
          if (o.error)
            return o;
          const { data: a } = o;
          if (a.type !== "webauthn")
            return { data: a, error: null };
          switch (a.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, a), { webauthn: Object.assign(Object.assign({}, a.webauthn), { credential_options: Object.assign(Object.assign({}, a.webauthn.credential_options), { publicKey: AI(a.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, a), { webauthn: Object.assign(Object.assign({}, a.webauthn), { credential_options: Object.assign(Object.assign({}, a.webauthn.credential_options), { publicKey: RI(a.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
          }
        });
      } catch (n) {
        if ($(n))
          return this._returnResult({ data: null, error: n });
        throw n;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(t) {
    const { data: n, error: r } = await this._challenge({
      factorId: t.factorId
    });
    return r ? this._returnResult({ data: null, error: r }) : await this._verify({
      factorId: t.factorId,
      challengeId: n.id,
      code: t.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    var t;
    const { data: { user: n }, error: r } = await this.getUser();
    if (r)
      return { data: null, error: r };
    const s = {
      all: [],
      phone: [],
      totp: [],
      webauthn: []
    };
    for (const i of (t = n == null ? void 0 : n.factors) !== null && t !== void 0 ? t : [])
      s.all.push(i), i.status === "verified" && s[i.factor_type].push(i);
    return {
      data: s,
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel(t) {
    var n, r, s, i;
    if (t)
      try {
        const { payload: f } = fa(t);
        let g = null;
        f.aal && (g = f.aal);
        let y = g;
        const { data: { user: w }, error: p } = await this.getUser(t);
        if (p)
          return this._returnResult({ data: null, error: p });
        ((r = (n = w == null ? void 0 : w.factors) === null || n === void 0 ? void 0 : n.filter((x) => x.status === "verified")) !== null && r !== void 0 ? r : []).length > 0 && (y = "aal2");
        const v = f.amr || [];
        return { data: { currentLevel: g, nextLevel: y, currentAuthenticationMethods: v }, error: null };
      } catch (f) {
        if ($(f))
          return this._returnResult({ data: null, error: f });
        throw f;
      }
    const { data: { session: o }, error: a } = await this.getSession();
    if (a)
      return this._returnResult({ data: null, error: a });
    if (!o)
      return {
        data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
        error: null
      };
    const { payload: l } = fa(o.access_token);
    let u = null;
    l.aal && (u = l.aal);
    let c = u;
    ((i = (s = o.user.factors) === null || s === void 0 ? void 0 : s.filter((f) => f.status === "verified")) !== null && i !== void 0 ? i : []).length > 0 && (c = "aal2");
    const h = l.amr || [];
    return { data: { currentLevel: u, nextLevel: c, currentAuthenticationMethods: h }, error: null };
  }
  /**
   * Retrieves details about an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * Returns authorization details including client info, scopes, and user information.
   * If the API returns a redirect_uri, it means consent was already given - the caller
   * should handle the redirect manually if needed.
   */
  async _getAuthorizationDetails(t) {
    try {
      return await this._useSession(async (n) => {
        const { data: { session: r }, error: s } = n;
        return s ? this._returnResult({ data: null, error: s }) : r ? await U(this.fetch, "GET", `${this.url}/oauth/authorizations/${t}`, {
          headers: this.headers,
          jwt: r.access_token,
          xform: (i) => ({ data: i, error: null })
        }) : this._returnResult({ data: null, error: new nt() });
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  /**
   * Approves an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _approveAuthorization(t, n) {
    try {
      return await this._useSession(async (r) => {
        const { data: { session: s }, error: i } = r;
        if (i)
          return this._returnResult({ data: null, error: i });
        if (!s)
          return this._returnResult({ data: null, error: new nt() });
        const o = await U(this.fetch, "POST", `${this.url}/oauth/authorizations/${t}/consent`, {
          headers: this.headers,
          jwt: s.access_token,
          body: { action: "approve" },
          xform: (a) => ({ data: a, error: null })
        });
        return o.data && o.data.redirect_url && Ae() && !(n != null && n.skipBrowserRedirect) && window.location.assign(o.data.redirect_url), o;
      });
    } catch (r) {
      if ($(r))
        return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  /**
   * Denies an OAuth authorization request.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _denyAuthorization(t, n) {
    try {
      return await this._useSession(async (r) => {
        const { data: { session: s }, error: i } = r;
        if (i)
          return this._returnResult({ data: null, error: i });
        if (!s)
          return this._returnResult({ data: null, error: new nt() });
        const o = await U(this.fetch, "POST", `${this.url}/oauth/authorizations/${t}/consent`, {
          headers: this.headers,
          jwt: s.access_token,
          body: { action: "deny" },
          xform: (a) => ({ data: a, error: null })
        });
        return o.data && o.data.redirect_url && Ae() && !(n != null && n.skipBrowserRedirect) && window.location.assign(o.data.redirect_url), o;
      });
    } catch (r) {
      if ($(r))
        return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  /**
   * Lists all OAuth grants that the authenticated user has authorized.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _listOAuthGrants() {
    try {
      return await this._useSession(async (t) => {
        const { data: { session: n }, error: r } = t;
        return r ? this._returnResult({ data: null, error: r }) : n ? await U(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
          headers: this.headers,
          jwt: n.access_token,
          xform: (s) => ({ data: s, error: null })
        }) : this._returnResult({ data: null, error: new nt() });
      });
    } catch (t) {
      if ($(t))
        return this._returnResult({ data: null, error: t });
      throw t;
    }
  }
  /**
   * Revokes a user's OAuth grant for a specific client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   */
  async _revokeOAuthGrant(t) {
    try {
      return await this._useSession(async (n) => {
        const { data: { session: r }, error: s } = n;
        return s ? this._returnResult({ data: null, error: s }) : r ? (await U(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
          headers: this.headers,
          jwt: r.access_token,
          query: { client_id: t.clientId },
          noResolveJson: !0
        }), { data: {}, error: null }) : this._returnResult({ data: null, error: new nt() });
      });
    } catch (n) {
      if ($(n))
        return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async fetchJwk(t, n = { keys: [] }) {
    let r = n.keys.find((a) => a.kid === t);
    if (r)
      return r;
    const s = Date.now();
    if (r = this.jwks.keys.find((a) => a.kid === t), r && this.jwks_cached_at + VN > s)
      return r;
    const { data: i, error: o } = await U(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (o)
      throw o;
    return !i.keys || i.keys.length === 0 || (this.jwks = i, this.jwks_cached_at = s, r = i.keys.find((a) => a.kid === t), !r) ? null : r;
  }
  /**
   * Extracts the JWT claims present in the access token by first verifying the
   * JWT against the server's JSON Web Key Set endpoint
   * `/.well-known/jwks.json` which is often cached, resulting in significantly
   * faster responses. Prefer this method over {@link #getUser} which always
   * sends a request to the Auth server for each JWT.
   *
   * If the project is not using an asymmetric JWT signing key (like ECC or
   * RSA) it always sends a request to the Auth server (similar to {@link
   * #getUser}) to verify the JWT.
   *
   * @param jwt An optional specific JWT you wish to verify, not the one you
   *            can obtain from {@link #getSession}.
   * @param options Various additional options that allow you to customize the
   *                behavior of this method.
   */
  async getClaims(t, n = {}) {
    try {
      let r = t;
      if (!r) {
        const { data: f, error: g } = await this.getSession();
        if (g || !f.session)
          return this._returnResult({ data: null, error: g });
        r = f.session.access_token;
      }
      const { header: s, payload: i, signature: o, raw: { header: a, payload: l } } = fa(r);
      n != null && n.allowExpired || lI(i.exp);
      const u = !s.alg || s.alg.startsWith("HS") || !s.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(s.kid, n != null && n.keys ? { keys: n.keys } : n == null ? void 0 : n.jwks);
      if (!u) {
        const { error: f } = await this.getUser(r);
        if (f)
          throw f;
        return {
          data: {
            claims: i,
            header: s,
            signature: o
          },
          error: null
        };
      }
      const c = uI(s.alg), d = await crypto.subtle.importKey("jwk", u, c, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(c, d, o, QN(`${a}.${l}`)))
        throw new Bd("Invalid JWT signature");
      return {
        data: {
          claims: i,
          header: s,
          signature: o
        },
        error: null
      };
    } catch (r) {
      if ($(r))
        return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
}
go.nextInstanceID = {};
const UI = go, BI = "2.93.1";
let Si = "";
typeof Deno < "u" ? Si = "deno" : typeof document < "u" ? Si = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? Si = "react-native" : Si = "node";
function zI() {
  const e = globalThis.process;
  if (e && e.platform) {
    const t = e.platform;
    if (t === "darwin") return "macOS";
    if (t === "win32") return "Windows";
    if (t === "linux") return "Linux";
    if (t === "android") return "Android";
  }
  if (typeof navigator < "u" && navigator.userAgentData && navigator.userAgentData.platform) {
    const t = navigator.userAgentData.platform;
    if (t === "macOS") return "macOS";
    if (t === "Windows") return "Windows";
    if (t === "Linux") return "Linux";
    if (t === "Android") return "Android";
    if (t === "iOS") return "iOS";
  }
  return null;
}
function WI() {
  const e = globalThis.process;
  if (e) {
    const t = e.versions;
    if (t && t.node && typeof window > "u")
      try {
        const n = globalThis.require;
        if (n) return n("os").release();
      } catch {
        return null;
      }
  }
  if (typeof Deno < "u" && Deno.osRelease) try {
    return Deno.osRelease();
  } catch {
    return null;
  }
  return typeof navigator < "u" && navigator.userAgentData && navigator.userAgentData.platformVersion ? navigator.userAgentData.platformVersion : null;
}
function HI() {
  if (typeof Deno < "u") return "deno";
  if (typeof Bun < "u") return "bun";
  const e = globalThis.process;
  if (e) {
    const t = e.versions;
    if (t && t.node) return "node";
  }
  return null;
}
function KI() {
  if (typeof Deno < "u" && Deno.version) return Deno.version.deno;
  if (typeof Bun < "u" && Bun.version) return Bun.version;
  const e = globalThis.process;
  if (e) {
    const t = e.versions;
    if (t && t.node) return t.node;
  }
  return null;
}
function qI() {
  const e = { "X-Client-Info": `supabase-js-${Si}/${BI}` }, t = zI();
  t && (e["X-Supabase-Client-Platform"] = t);
  const n = WI();
  n && (e["X-Supabase-Client-Platform-Version"] = n);
  const r = HI();
  r && (e["X-Supabase-Client-Runtime"] = r);
  const s = KI();
  return s && (e["X-Supabase-Client-Runtime-Version"] = s), e;
}
const GI = qI(), QI = { headers: GI }, YI = { schema: "public" }, JI = {
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  flowType: "implicit"
}, XI = {};
function yo(e) {
  "@babel/helpers - typeof";
  return yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yo(e);
}
function ZI(e, t) {
  if (yo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (yo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eD(e) {
  var t = ZI(e, "string");
  return yo(t) == "symbol" ? t : t + "";
}
function tD(e, t, n) {
  return (t = eD(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function dy(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dy(Object(n), !0).forEach(function(r) {
      tD(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dy(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const nD = (e) => e ? (...t) => e(...t) : (...t) => fetch(...t), rD = () => Headers, sD = (e, t, n) => {
  const r = nD(n), s = rD();
  return async (i, o) => {
    var a;
    const l = (a = await t()) !== null && a !== void 0 ? a : e;
    let u = new s(o == null ? void 0 : o.headers);
    return u.has("apikey") || u.set("apikey", e), u.has("Authorization") || u.set("Authorization", `Bearer ${l}`), r(i, me(me({}, o), {}, { headers: u }));
  };
};
function iD(e) {
  return e.endsWith("/") ? e : e + "/";
}
function oD(e, t) {
  var n, r;
  const { db: s, auth: i, realtime: o, global: a } = e, { db: l, auth: u, realtime: c, global: d } = t, h = {
    db: me(me({}, l), s),
    auth: me(me({}, u), i),
    realtime: me(me({}, c), o),
    storage: {},
    global: me(me(me({}, d), a), {}, { headers: me(me({}, (n = d == null ? void 0 : d.headers) !== null && n !== void 0 ? n : {}), (r = a == null ? void 0 : a.headers) !== null && r !== void 0 ? r : {}) }),
    accessToken: async () => ""
  };
  return e.accessToken ? h.accessToken = e.accessToken : delete h.accessToken, h;
}
function aD(e) {
  const t = e == null ? void 0 : e.trim();
  if (!t) throw new Error("supabaseUrl is required.");
  if (!t.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(iD(t));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
var lD = class extends UI {
  constructor(e) {
    super(e);
  }
}, uD = class {
  /**
  * Create a new client for use in the browser.
  * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
  * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
  * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
  * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
  * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
  * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
  * @param options.realtime Options passed along to realtime-js constructor.
  * @param options.storage Options passed along to the storage-js constructor.
  * @param options.global.fetch A custom fetch implementation.
  * @param options.global.headers Any additional headers to send with each network request.
  * @example
  * ```ts
  * import { createClient } from '@supabase/supabase-js'
  *
  * const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
  * const { data } = await supabase.from('profiles').select('*')
  * ```
  */
  constructor(e, t, n) {
    var r, s;
    this.supabaseUrl = e, this.supabaseKey = t;
    const i = aD(e);
    if (!t) throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", i), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", i), this.storageUrl = new URL("storage/v1", i), this.functionsUrl = new URL("functions/v1", i);
    const o = `sb-${i.hostname.split(".")[0]}-auth-token`, a = {
      db: YI,
      realtime: XI,
      auth: me(me({}, JI), {}, { storageKey: o }),
      global: QI
    }, l = oD(n ?? {}, a);
    if (this.storageKey = (r = l.auth.storageKey) !== null && r !== void 0 ? r : "", this.headers = (s = l.global.headers) !== null && s !== void 0 ? s : {}, l.accessToken)
      this.accessToken = l.accessToken, this.auth = new Proxy({}, { get: (c, d) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`);
      } });
    else {
      var u;
      this.auth = this._initSupabaseAuthClient((u = l.auth) !== null && u !== void 0 ? u : {}, this.headers, l.global.fetch);
    }
    this.fetch = sD(t, this._getAccessToken.bind(this), l.global.fetch), this.realtime = this._initRealtimeClient(me({
      headers: this.headers,
      accessToken: this._getAccessToken.bind(this)
    }, l.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then((c) => this.realtime.setAuth(c)).catch((c) => console.warn("Failed to set initial Realtime auth token:", c)), this.rest = new Uj(new URL("rest/v1", i).href, {
      headers: this.headers,
      schema: l.db.schema,
      fetch: this.fetch
    }), this.storage = new DN(this.storageUrl.href, this.headers, this.fetch, n == null ? void 0 : n.storage), l.accessToken || this._listenForAuthEvents();
  }
  /**
  * Supabase Functions allows you to deploy and invoke edge functions.
  */
  get functions() {
    return new Mj(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
  * Perform a query on a table or a view.
  *
  * @param relation - The table or view name to query
  */
  from(e) {
    return this.rest.from(e);
  }
  /**
  * Select a schema to query or perform an function (rpc) call.
  *
  * The schema needs to be on the list of exposed schemas inside Supabase.
  *
  * @param schema - The schema to query
  */
  schema(e) {
    return this.rest.schema(e);
  }
  /**
  * Perform a function call.
  *
  * @param fn - The function name to call
  * @param args - The arguments to pass to the function call
  * @param options - Named parameters
  * @param options.head - When set to `true`, `data` will not be returned.
  * Useful if you only need the count.
  * @param options.get - When set to `true`, the function will be called with
  * read-only access mode.
  * @param options.count - Count algorithm to use to count rows returned by the
  * function. Only applicable for [set-returning
  * functions](https://www.postgresql.org/docs/current/functions-srf.html).
  *
  * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
  * hood.
  *
  * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
  * statistics under the hood.
  *
  * `"estimated"`: Uses exact count for low numbers and planned count for high
  * numbers.
  */
  rpc(e, t = {}, n = {
    head: !1,
    get: !1,
    count: void 0
  }) {
    return this.rest.rpc(e, t, n);
  }
  /**
  * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
  *
  * @param {string} name - The name of the Realtime channel.
  * @param {Object} opts - The options to pass to the Realtime channel.
  *
  */
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  /**
  * Returns all Realtime channels.
  */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
  * Unsubscribes and removes Realtime channel from Realtime client.
  *
  * @param {RealtimeChannel} channel - The name of the Realtime channel.
  *
  */
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  /**
  * Unsubscribes and removes all Realtime channels from Realtime client.
  */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  async _getAccessToken() {
    var e = this, t, n;
    if (e.accessToken) return await e.accessToken();
    const { data: r } = await e.auth.getSession();
    return (t = (n = r.session) === null || n === void 0 ? void 0 : n.access_token) !== null && t !== void 0 ? t : e.supabaseKey;
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: n, storage: r, userStorage: s, storageKey: i, flowType: o, lock: a, debug: l, throwOnError: u }, c, d) {
    const h = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new lD({
      url: this.authUrl.href,
      headers: me(me({}, h), c),
      storageKey: i,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: n,
      storage: r,
      userStorage: s,
      flowType: o,
      lock: a,
      debug: l,
      throwOnError: u,
      fetch: d,
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((f) => f.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(e) {
    return new sN(this.realtimeUrl.href, me(me({}, e), {}, { params: me(me({}, { apikey: this.supabaseKey }), e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((e, t) => {
      this._handleTokenChanged(e, "CLIENT", t == null ? void 0 : t.access_token);
    });
  }
  _handleTokenChanged(e, t, n) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== n ? (this.changedAccessToken = n, this.realtime.setAuth(n)) : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
};
const cD = (e, t, n) => new uD(e, t, n);
function dD() {
  if (typeof window < "u") return !1;
  const e = globalThis.process;
  if (!e) return !1;
  const t = e.version;
  if (t == null) return !1;
  const n = t.match(/^v(\d+)\./);
  return n ? parseInt(n[1], 10) <= 18 : !1;
}
dD() && console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
const hD = "https://hjuagnuimzjqfkfiorwt.supabase.co", fD = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdWFnbnVpbXpqcWZrZmlvcnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MzY0NjAsImV4cCI6MjA4NTIxMjQ2MH0.BYHvJ_HByxl4zawhQniWZD_t6tt8Y9y5kzHTDrgxFMo", zd = cD(hD, fD, {
  auth: {
    storage: localStorage,
    persistSession: !0,
    autoRefreshToken: !0
  }
});
function pD({ url: e, onComplete: t }) {
  const [n, r] = b.useState(!1), [s, i] = b.useState(null), [o, a] = b.useState([]), [l, u] = b.useState(0), [c, d] = b.useState(""), h = b.useRef([]), f = b.useRef(!1), g = b.useRef([]), y = (S) => {
    const k = [];
    return S.coreOffering && k.push(`> Kärnverksamhet: ${S.coreOffering}`), S.industry && k.push(`> Bransch: ${S.industry}`), S.targetAudience && k.push(`> Målgrupp: ${S.targetAudience}`), S.buyerRoles && S.buyerRoles.length > 0 && k.push(`> Köproller: ${S.buyerRoles.slice(0, 3).join(", ")}`), S.painPoints && S.painPoints.length > 0 && k.push(`> Pain point: "${S.painPoints[0]}"`), S.buyerQuestions && S.buyerQuestions.length > 0 && k.push(`> Vanlig fråga: "${S.buyerQuestions[0]}"`), S.concerns && S.concerns.length > 0 && k.push(`> Oro: "${S.concerns[0]}"`), k.push("> Brainstormar self-service verktyg som matchar målgruppens behov..."), k.push("> Analyserar och väljer ut de verktyg med största affärsnytta..."), S.opportunities && S.opportunities.length > 0 && k.push(`> Identifierade ${S.opportunities.length} self-service-möjligheter`), k;
  };
  b.useEffect(() => {
    if (f.current) return;
    f.current = !0, (async () => {
      console.log("Starting analysis for:", e);
      try {
        const { data: k, error: T } = await zd.functions.invoke("analyze-website", {
          body: { url: e }
        });
        if (console.log("Analysis response:", k), !T && (k != null && k.analysis)) {
          i(k.analysis), k.analysis.opportunities && (h.current = k.analysis.opportunities);
          const E = y(k.analysis);
          g.current = E;
        }
      } catch (k) {
        console.error("Failed to fetch analysis:", k);
      }
    })();
  }, [e]), b.useEffect(() => {
    if (g.current.length === 0) return;
    if (l >= g.current.length) {
      const E = setTimeout(() => {
        r(!0), setTimeout(() => {
          t(h.current);
        }, 1e3);
      }, 800);
      return () => clearTimeout(E);
    }
    const S = g.current[l];
    let k = 0;
    d("");
    const T = setInterval(() => {
      k < S.length ? (d(S.substring(0, k + 1)), k++) : (clearInterval(T), setTimeout(() => {
        a((E) => [...E, S]), d(""), u((E) => E + 1);
      }, 150));
    }, 12);
    return () => clearInterval(T);
  }, [l, s, t]), b.useEffect(() => {
    s && g.current.length > 0 && l === 0 && (u(0), d(""));
  }, [s]);
  const [w, p] = b.useState(5), m = b.useRef(null), v = b.useRef(0);
  b.useEffect(() => {
    m.current = s;
  }, [s]), b.useEffect(() => {
    v.current = o.length;
  }, [o.length]), b.useEffect(() => {
    const S = setInterval(() => {
      p((k) => {
        const T = m.current !== null, E = v.current, A = g.current.length || 1;
        if (T) {
          const R = 70 + (E + 1) / A * 28;
          return k < R ? k + 0.6 : k < 99 ? k + 0.1 : 99;
        } else
          return k < 60 ? k + 0.5 : k < 75 ? k + 0.2 : k + 0.08;
      });
    }, 100);
    return () => clearInterval(S);
  }, []);
  const x = w;
  return /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center text-center max-w-2xl mx-auto px-4", children: [
    /* @__PURE__ */ _.jsx("div", { className: "relative w-16 h-16 mb-4", children: /* @__PURE__ */ _.jsx(
      X.div,
      {
        className: "absolute inset-0 rounded-full bg-primary/20 flex items-center justify-center",
        animate: n ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.3, 0.6]
        },
        transition: {
          duration: 1.5,
          repeat: 1 / 0,
          ease: "easeInOut"
        },
        children: n ? /* @__PURE__ */ _.jsx(MC, { className: "w-8 h-8 text-primary" }) : /* @__PURE__ */ _.jsx(ex, { className: "w-8 h-8 text-primary" })
      }
    ) }),
    /* @__PURE__ */ _.jsxs("div", { className: "text-sm text-muted-foreground mb-4", children: [
      "Analyserar: ",
      /* @__PURE__ */ _.jsx("span", { className: "font-medium text-foreground", children: e.replace(/^https?:\/\//, "") })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "w-full max-w-md mb-6", children: /* @__PURE__ */ _.jsx("div", { className: "h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ _.jsx(
      X.div,
      {
        className: "h-full bg-primary rounded-full",
        initial: { width: "5%" },
        animate: { width: `${x}%` },
        transition: { duration: 0.3 }
      }
    ) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "w-full max-w-lg bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-sm text-center min-h-[200px]", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-2 mb-3 pb-2 border-b border-[#30363d]", children: [
        /* @__PURE__ */ _.jsx(BC, { className: "w-4 h-4 text-[#8b949e]" }),
        /* @__PURE__ */ _.jsx("span", { className: "text-[#8b949e] text-xs", children: "buyr-scanner" })
      ] }),
      /* @__PURE__ */ _.jsxs("div", { className: "space-y-1", children: [
        !s && /* @__PURE__ */ _.jsxs(
          X.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "text-[#8b949e]",
            children: [
              /* @__PURE__ */ _.jsx("span", { className: "text-[#58a6ff]", children: "$" }),
              " Ansluter till AI...",
              /* @__PURE__ */ _.jsx(
                X.span,
                {
                  animate: { opacity: [1, 0, 1] },
                  transition: { duration: 0.8, repeat: 1 / 0 },
                  className: "ml-1",
                  children: "_"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ _.jsx(Rb, { children: o.map((S, k) => /* @__PURE__ */ _.jsx(
          X.div,
          {
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
            className: "text-[#c9d1d9]",
            children: /* @__PURE__ */ _.jsx("span", { className: "text-[#7ee787]", children: S })
          },
          k
        )) }),
        c && /* @__PURE__ */ _.jsxs("div", { className: "text-[#c9d1d9]", children: [
          /* @__PURE__ */ _.jsx("span", { className: "text-[#7ee787]", children: c }),
          /* @__PURE__ */ _.jsx(
            X.span,
            {
              animate: { opacity: [1, 0, 1] },
              transition: { duration: 0.5, repeat: 1 / 0 },
              className: "text-[#7ee787]",
              children: "_"
            }
          )
        ] }),
        n && /* @__PURE__ */ _.jsxs(
          X.div,
          {
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
            className: "mt-3 pt-2 border-t border-[#30363d]",
            children: [
              /* @__PURE__ */ _.jsx("span", { className: "text-[#58a6ff]", children: "$" }),
              /* @__PURE__ */ _.jsx("span", { className: "text-[#c9d1d9] ml-2", children: "Analys klar. Laddar resultat..." })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const mD = [
  {
    id: "pricing",
    icon: DC,
    title: "Visa pris tidigare i köpresan",
    description: "För köpare som vill förstå budget innan dialog"
  },
  {
    id: "assessment",
    icon: ex,
    title: "Hjälpa köpare förstå sitt behov",
    description: "Assessment, guider, självtester"
  },
  {
    id: "configurator",
    icon: FC,
    title: "Låta köpare bygga sin lösning",
    description: "Konfiguratorer och valverktyg"
  },
  {
    id: "selector",
    icon: UC,
    title: "Hjälpa köpare välja rätt alternativ",
    description: "Produkt-/lösningsväljare"
  }
];
function gD({ onSelect: e }) {
  return /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ _.jsx(
      X.h2,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "text-xl md:text-2xl font-bold text-center mb-2",
        children: "Vilket område är mest relevant för er just nu?"
      }
    ),
    /* @__PURE__ */ _.jsx(
      X.p,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "text-muted-foreground text-center mb-5 text-sm",
        children: "Välj det som bäst matchar era köpares behov"
      }
    ),
    /* @__PURE__ */ _.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 w-full", children: mD.map((t, n) => /* @__PURE__ */ _.jsxs(
      X.button,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 + n * 0.1 },
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        onClick: () => e(t.id),
        className: "group relative p-4 bg-card rounded-xl border border-transparent hover:border-primary transition-all duration-300 text-left",
        children: [
          /* @__PURE__ */ _.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ _.jsx(t.icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ _.jsx("h3", { className: "text-base font-semibold mb-1 group-hover:text-primary transition-colors", children: t.title }),
          /* @__PURE__ */ _.jsx("p", { className: "text-xs text-muted-foreground", children: t.description }),
          /* @__PURE__ */ _.jsx("div", { className: "absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ _.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ _.jsx(
            "svg",
            {
              className: "w-4 h-4 text-primary",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ _.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                }
              )
            }
          ) }) })
        ]
      },
      t.id
    )) })
  ] });
}
const yD = {
  pricing: [
    { title: "Priskalkylator", value: "Mycket högt", shortReason: "Visa kostnader tidigt" },
    { title: "Prisguide", value: "Högt", shortReason: "Jämför alternativ" },
    { title: "ROI-kalkylator", value: "Högt", shortReason: "Motivera investering" }
  ],
  assessment: [
    { title: "Behovsanalys", value: "Mycket högt", shortReason: "Kvalificera leads" },
    { title: "Mognadstest", value: "Högt", shortReason: "Identifiera gap" },
    { title: "Checklista", value: "Medium", shortReason: "Strukturera processen" }
  ],
  configurator: [
    { title: "Produktkonfigurator", value: "Mycket högt", shortReason: "Bygg egen lösning" },
    { title: "Paketbyggare", value: "Högt", shortReason: "Skräddarsy paket" },
    { title: "Kapacitetsplanerare", value: "Högt", shortReason: "Dimensionera rätt" }
  ],
  selector: [
    { title: "Produktväljare", value: "Mycket högt", shortReason: "Hitta rätt lösning" },
    { title: "Jämförelseverktyg", value: "Högt", shortReason: "Jämför alternativ" },
    { title: "Rekommendationsmotor", value: "Högt", shortReason: "Personlig vägledning" }
  ]
}, hy = {
  "Mycket högt": "text-primary",
  Högt: "text-amber-400",
  Medium: "text-blue-400"
};
function vD(e, t) {
  return e % 2 === 1 && t === 0 && e > 1 ? "col-span-2" : "col-span-1";
}
function wD(e) {
  return e === 1 ? "grid-cols-1" : "grid-cols-2";
}
function xD({ focusArea: e, url: t, onSelectSuggestion: n }) {
  const r = yD[e].slice(0, 6), s = t.replace(/^https?:\/\//, "").split("/")[0], i = r.length, o = i % 2 === 1 && i > 1;
  return /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center max-w-2xl mx-auto px-2 h-full", children: [
    /* @__PURE__ */ _.jsx(
      X.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-3",
        children: /* @__PURE__ */ _.jsxs("h2", { className: "text-sm md:text-base font-bold mb-1", children: [
          "Self-service-möjligheter för ",
          s
        ] })
      }
    ),
    /* @__PURE__ */ _.jsx("div", { className: `w-full grid ${wD(i)} gap-2 flex-1`, children: r.map((a, l) => {
      const u = vD(i, l), c = o && l === 0;
      return /* @__PURE__ */ _.jsxs(
        X.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.05 + l * 0.06 },
          className: `${u} bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-200 p-3 relative flex flex-col`,
          children: [
            /* @__PURE__ */ _.jsx("div", { className: "absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ _.jsx("span", { className: "text-[10px] font-bold text-primary-foreground", children: l + 1 }) }),
            /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ _.jsx("h3", { className: `font-semibold mb-1 pr-4 ${c ? "text-base" : "text-sm"}`, children: a.title }),
              /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ _.jsx(zC, { className: `w-3 h-3 ${hy[a.value]}` }),
                /* @__PURE__ */ _.jsx("span", { className: `text-[10px] font-medium ${hy[a.value]}`, children: a.value })
              ] }),
              /* @__PURE__ */ _.jsx("p", { className: `text-muted-foreground mb-2 flex-1 ${c ? "text-xs" : "text-[11px]"}`, children: a.shortReason }),
              /* @__PURE__ */ _.jsxs(
                Hs,
                {
                  variant: "hero",
                  size: "sm",
                  onClick: () => n(l),
                  className: `w-full text-xs ${c ? "h-8" : "h-7"}`,
                  children: [
                    "Välj",
                    /* @__PURE__ */ _.jsx(IC, { className: "w-3 h-3 ml-1" })
                  ]
                }
              )
            ] }),
            l === 0 && /* @__PURE__ */ _.jsx("div", { className: "absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" })
          ]
        },
        l
      );
    }) }),
    /* @__PURE__ */ _.jsx(
      X.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.3 },
        className: "text-[10px] text-muted-foreground text-center mt-2",
        children: "Baserat på best practices för B2B self-service"
      }
    )
  ] });
}
var bD = "Label", oS = b.forwardRef((e, t) => /* @__PURE__ */ _.jsx(
  Qe.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var s;
      n.target.closest("button, input, select, textarea") || ((s = e.onMouseDown) == null || s.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
oS.displayName = bD;
var aS = oS;
const SD = tf("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"), gr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(aS, { ref: n, className: Vt(SD(), e), ...t }));
gr.displayName = aS.displayName;
const lS = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _.jsx(
  "textarea",
  {
    className: Vt(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ref: n,
    ...t
  }
));
lS.displayName = "Textarea";
const fy = {
  pricing: ["Interaktiv priskalkylator", "Prisguide med scenarion", "ROI-kalkylator"],
  assessment: ["Självtest för behovsanalys", "Interaktiv mognadsanalys", "Checklista för utvärdering"],
  configurator: ["Produktkonfigurator", "Paketbyggare", "Kapacitetsplanerare"],
  selector: ["Produktväljare", "Jämförelseverktyg", "Rekommendationsmotor"]
};
function _D({ focusArea: e, suggestionIndex: t, url: n, opportunities: r, onReset: s }) {
  const i = fy[e][t] || fy[e][0], { toast: o } = Nw(), [a, l] = b.useState(!1), [u, c] = b.useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  }), d = async (f) => {
    f.preventDefault(), l(!0);
    const g = {
      ...u,
      analyzedUrl: n,
      selectedTool: i,
      focusArea: e,
      opportunities: r.map((y) => y.title),
      source: "scanner"
    };
    try {
      const { error: y } = await zd.functions.invoke("send-lead-notification", {
        body: g
      });
      y && console.error("Email notification error:", y);
      try {
        await zd.functions.invoke("submit-to-hubspot", {
          body: g
        });
      } catch (w) {
        console.error("HubSpot backup error:", w);
      }
      o({
        title: "Tack! Vi hör av oss snart.",
        description: "Du kommer få din prototyp inom 24 timmar."
      });
    } catch (y) {
      console.error("Error submitting form:", y), o({
        title: "Något gick fel",
        description: "Försök igen senare.",
        variant: "destructive"
      });
    } finally {
      l(!1);
    }
  }, h = (f) => {
    c((g) => ({
      ...g,
      [f.target.name]: f.target.value
    }));
  };
  return /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col items-center max-w-lg mx-auto px-4", children: [
    /* @__PURE__ */ _.jsxs(
      X.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-4",
        children: [
          /* @__PURE__ */ _.jsxs("div", { className: "inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3", children: [
            /* @__PURE__ */ _.jsx(ad, { className: "w-3 h-3" }),
            i
          ] }),
          /* @__PURE__ */ _.jsx("h2", { className: "text-xl md:text-2xl font-bold mb-2", children: "Vill du se en klickbar prototyp?" }),
          /* @__PURE__ */ _.jsx("p", { className: "text-sm text-muted-foreground", children: "Vi tar fram en AI-prototyp som visar hur detta verktyg kan fungera för er." })
        ]
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.form,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        onSubmit: d,
        className: "w-full space-y-4",
        children: [
          /* @__PURE__ */ _.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ _.jsx(gr, { htmlFor: "firstName", className: "text-xs", children: "Förnamn *" }),
              /* @__PURE__ */ _.jsx(
                yr,
                {
                  id: "firstName",
                  name: "firstName",
                  value: u.firstName,
                  onChange: h,
                  required: !0,
                  placeholder: "Ditt förnamn",
                  className: "h-9"
                }
              )
            ] }),
            /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ _.jsx(gr, { htmlFor: "lastName", className: "text-xs", children: "Efternamn *" }),
              /* @__PURE__ */ _.jsx(
                yr,
                {
                  id: "lastName",
                  name: "lastName",
                  value: u.lastName,
                  onChange: h,
                  required: !0,
                  placeholder: "Ditt efternamn",
                  className: "h-9"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ _.jsx(gr, { htmlFor: "email", className: "text-xs", children: "E-post *" }),
            /* @__PURE__ */ _.jsx(
              yr,
              {
                id: "email",
                name: "email",
                type: "email",
                value: u.email,
                onChange: h,
                required: !0,
                placeholder: "din@epost.se",
                className: "h-9"
              }
            )
          ] }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ _.jsx(gr, { htmlFor: "company", className: "text-xs", children: "Företag *" }),
            /* @__PURE__ */ _.jsx(
              yr,
              {
                id: "company",
                name: "company",
                value: u.company,
                onChange: h,
                required: !0,
                placeholder: "Ditt företag",
                className: "h-9"
              }
            )
          ] }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ _.jsx(gr, { htmlFor: "phone", className: "text-xs", children: "Telefon" }),
            /* @__PURE__ */ _.jsx(
              yr,
              {
                id: "phone",
                name: "phone",
                type: "tel",
                value: u.phone,
                onChange: h,
                placeholder: "070-123 45 67",
                className: "h-9"
              }
            )
          ] }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ _.jsx(gr, { htmlFor: "message", className: "text-xs", children: "Meddelande" }),
            /* @__PURE__ */ _.jsx(
              lS,
              {
                id: "message",
                name: "message",
                value: u.message,
                onChange: h,
                placeholder: "Berätta kort om era behov...",
                rows: 3,
                className: "resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ _.jsx(Hs, { type: "submit", className: "w-full", disabled: a, children: a ? "Skickar..." : /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
            /* @__PURE__ */ _.jsx(VC, { className: "w-4 h-4 mr-2" }),
            "Skicka förfrågan"
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ _.jsxs(
      X.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.4 },
        className: "flex items-center justify-center gap-3 mt-4 text-[10px] text-muted-foreground",
        children: [
          /* @__PURE__ */ _.jsx("span", { children: "🔒 GDPR-säkert" }),
          /* @__PURE__ */ _.jsx("span", { children: "•" }),
          /* @__PURE__ */ _.jsx("span", { children: "Inga förpliktelser" }),
          /* @__PURE__ */ _.jsx("span", { children: "•" }),
          /* @__PURE__ */ _.jsx("span", { children: "Svar inom 24h" })
        ]
      }
    ),
    /* @__PURE__ */ _.jsx(
      X.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5 },
        className: "mt-4",
        children: /* @__PURE__ */ _.jsx(Hs, { variant: "ghost", size: "sm", onClick: s, children: "Gör en ny analys" })
      }
    )
  ] });
}
function kD({ onClose: e, embedded: t = !1 }) {
  const [n, r] = b.useState(1), [s, i] = b.useState({
    url: "",
    focusArea: null,
    selectedSuggestion: null,
    opportunities: []
  }), o = (h) => {
    i((f) => ({ ...f, url: h })), r(2);
  }, a = (h) => {
    h && i((f) => ({ ...f, opportunities: h })), r(3);
  }, l = (h) => {
    i((f) => ({ ...f, focusArea: h })), r(4);
  }, u = (h) => {
    i((f) => ({ ...f, selectedSuggestion: h })), r(5);
  }, c = () => {
    n > 1 && r(n - 1);
  }, d = () => {
    r(1), i({ url: "", focusArea: null, selectedSuggestion: null, opportunities: [] });
  };
  return /* @__PURE__ */ _.jsxs("div", { className: `w-full ${t ? "" : "min-h-[500px]"} max-h-[800px] overflow-y-auto relative`, children: [
    n > 1 && n < 5 && /* @__PURE__ */ _.jsx(
      X.div,
      {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        className: "absolute top-0 left-0 z-10",
        children: /* @__PURE__ */ _.jsxs(
          Hs,
          {
            variant: "ghost",
            size: "sm",
            onClick: c,
            className: "text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ _.jsx(NC, { className: "w-4 h-4 mr-2" }),
              "Tillbaka"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ _.jsx("div", { className: "flex justify-center mb-8 pt-2", children: /* @__PURE__ */ _.jsx("div", { className: "flex items-center gap-2", children: [1, 2, 3, 4, 5].map((h) => /* @__PURE__ */ _.jsx(
      "div",
      {
        className: `h-1.5 rounded-full transition-all duration-300 ${h === n ? "w-8 bg-primary" : h < n ? "w-4 bg-primary/50" : "w-4 bg-muted"}`
      },
      h
    )) }) }),
    /* @__PURE__ */ _.jsxs(Rb, { mode: "wait", children: [
      n === 1 && /* @__PURE__ */ _.jsx(
        X.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ _.jsx(jj, { onSubmit: o })
        },
        "step1"
      ),
      n === 2 && /* @__PURE__ */ _.jsx(
        X.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ _.jsx(pD, { url: s.url, onComplete: a })
        },
        "step2"
      ),
      n === 3 && /* @__PURE__ */ _.jsx(
        X.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ _.jsx(gD, { onSelect: l })
        },
        "step3"
      ),
      n === 4 && /* @__PURE__ */ _.jsx(
        X.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ _.jsx(
            xD,
            {
              focusArea: s.focusArea,
              url: s.url,
              onSelectSuggestion: u
            }
          )
        },
        "step4"
      ),
      n === 5 && /* @__PURE__ */ _.jsx(
        X.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ _.jsx(
            _D,
            {
              focusArea: s.focusArea,
              suggestionIndex: s.selectedSuggestion,
              url: s.url,
              opportunities: s.opportunities,
              onReset: d
            }
          )
        },
        "step5"
      )
    ] })
  ] });
}
const TD = new dk();
class ED extends HTMLElement {
  constructor() {
    super();
    Zl(this, "root", null);
    Zl(this, "mountPoint", null);
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    var s, i, o;
    this.mountPoint = document.createElement("div"), this.mountPoint.setAttribute("id", "buyr-scanner-root");
    const n = document.createElement("style");
    n.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Flow+Circular&display=swap');
      
      :host {
        display: block;
        font-family: 'Flow Circular', system-ui, -apple-system, sans-serif;
      }
      
      #buyr-scanner-root {
        --background: 0 0% 5%;
        --foreground: 0 0% 100%;
        --card: 0 0% 10%;
        --card-foreground: 0 0% 100%;
        --popover: 0 0% 10%;
        --popover-foreground: 0 0% 100%;
        --primary: 145 89% 71%;
        --primary-foreground: 0 0% 5%;
        --secondary: 0 0% 15%;
        --secondary-foreground: 0 0% 100%;
        --muted: 0 0% 15%;
        --muted-foreground: 0 0% 65%;
        --accent: 145 89% 71%;
        --accent-foreground: 0 0% 5%;
        --destructive: 0 84% 60%;
        --destructive-foreground: 0 0% 100%;
        --border: 0 0% 18%;
        --input: 0 0% 18%;
        --ring: 145 89% 71%;
        --radius: 0.75rem;
        
        background: transparent;
        color: hsl(var(--foreground));
        font-family: 'Flow Circular', system-ui, -apple-system, sans-serif;
        font-size: 18px;
        line-height: 1.7;
      }
      
      #buyr-scanner-root * {
        box-sizing: border-box;
      }
    `;
    const r = this.getAttribute("css-url");
    if (r) {
      const a = document.createElement("link");
      a.rel = "stylesheet", a.href = r, (s = this.shadowRoot) == null || s.appendChild(a);
    }
    (i = this.shadowRoot) == null || i.appendChild(n), (o = this.shadowRoot) == null || o.appendChild(this.mountPoint), this.root = rc.createRoot(this.mountPoint), this.root.render(
      /* @__PURE__ */ _.jsx(on.StrictMode, { children: /* @__PURE__ */ _.jsx(fk, { client: TD, children: /* @__PURE__ */ _.jsxs(sC, { children: [
        /* @__PURE__ */ _.jsx(GC, {}),
        /* @__PURE__ */ _.jsx(kD, { embedded: !0 })
      ] }) }) })
    );
  }
  disconnectedCallback() {
    this.root && (this.root.unmount(), this.root = null);
  }
}
customElements.get("buyr-scanner") || customElements.define("buyr-scanner", ED);
export {
  ED as BuyrScanner
};
