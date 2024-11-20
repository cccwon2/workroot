import "../sb-preview/runtime.js";
import { b as L, a as nr, _ as sr } from "./chunk-XP5HYGXS-BGCqD1aY.js";
import { _ as tr } from "./iframe-zchCIFEx.js";
import { r as Y, R as re } from "./index-DJO9vBfz.js";
import { r as ar } from "./index-DJdX7xnk.js";

const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ["./react-18-BWhC85Cb.js", "./index-DJO9vBfz.js", "./index-DJdX7xnk.js"])
) => i.map((i) => d[i]);
import { _ as sr, a as nr, b as L } from "./chunk-XP5HYGXS-BGCqD1aY.js";
import { r as Y, R as re } from "./index-DJO9vBfz.js";
import { r as ar } from "./index-DJdX7xnk.js";
import "../sb-preview/runtime.js";
var b = {};
/**
 * @license React
 * react-dom-test-utils.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var K = Y,
  ye = ar;
function Ve(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (r = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function Fe(e) {
  if (Ve(e) !== e) throw Error("Unable to find node on an unmounted component.");
}
function ir(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Ve(e)), t === null)) throw Error("Unable to find node on an unmounted component.");
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var o = r.return;
    if (o === null) break;
    var a = o.alternate;
    if (a === null) {
      if (((n = o.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (o.child === a.child) {
      for (a = o.child; a; ) {
        if (a === r) return Fe(o), e;
        if (a === n) return Fe(o), t;
        a = a.sibling;
      }
      throw Error("Unable to find node on an unmounted component.");
    }
    if (r.return !== n.return) (r = o), (n = a);
    else {
      for (var l = !1, h = o.child; h; ) {
        if (h === r) {
          (l = !0), (r = o), (n = a);
          break;
        }
        if (h === n) {
          (l = !0), (n = o), (r = a);
          break;
        }
        h = h.sibling;
      }
      if (!l) {
        for (h = a.child; h; ) {
          if (h === r) {
            (l = !0), (r = a), (n = o);
            break;
          }
          if (h === n) {
            (l = !0), (n = a), (r = o);
            break;
          }
          h = h.sibling;
        }
        if (!l)
          throw Error(
            "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
          );
      }
    }
    if (r.alternate !== n)
      throw Error(
        "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
      );
  }
  if (r.tag !== 3) throw Error("Unable to find node on an unmounted component.");
  return r.stateNode.current === r ? e : t;
}
var F = Object.assign;
function _e(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ie() {
  return !0;
}
function qe() {
  return !1;
}
function q(e) {
  function t(r, n, o, a, l) {
    (this._reactName = r),
      (this._targetInst = o),
      (this.type = n),
      (this.nativeEvent = a),
      (this.target = l),
      (this.currentTarget = null);
    for (var h in e) e.hasOwnProperty(h) && ((r = e[h]), (this[h] = r ? r(a) : a[h]));
    return (
      (this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? ie : qe),
      (this.isPropagationStopped = qe),
      this
    );
  }
  return (
    F(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1),
          (this.isDefaultPrevented = ie));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
          (this.isPropagationStopped = ie));
      },
      persist: function () {},
      isPersistent: ie,
    }),
    t
  );
}
var z = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  or = q(z),
  se = F({}, z, { view: 0, detail: 0 });
q(se);
var Le,
  we,
  ee,
  pe = F({}, se, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ae,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ee &&
            (ee && e.type === "mousemove"
              ? ((Le = e.screenX - ee.screenX), (we = e.screenY - ee.screenY))
              : (we = Le = 0),
            (ee = e)),
          Le);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : we;
    },
  });
q(pe);
var lr = F({}, pe, { dataTransfer: 0 });
q(lr);
var ur = F({}, se, { relatedTarget: 0 });
q(ur);
var pr = F({}, z, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
q(pr);
var cr = F({}, z, {
  clipboardData: function (e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  },
});
q(cr);
var mr = F({}, z, { data: 0 });
q(mr);
var hr = {
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
    MozPrintableKey: "Unidentified",
  },
  dr = {
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
    224: "Meta",
  },
  fr = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Er(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = fr[e]) ? !!t[e] : !1;
}
function Ae() {
  return Er;
}
var vr = F({}, se, {
  key: function (e) {
    if (e.key) {
      var t = hr[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress"
      ? ((e = _e(e)), e === 13 ? "Enter" : String.fromCharCode(e))
      : e.type === "keydown" || e.type === "keyup"
        ? dr[e.keyCode] || "Unidentified"
        : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: Ae,
  charCode: function (e) {
    return e.type === "keypress" ? _e(e) : 0;
  },
  keyCode: function (e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  },
  which: function (e) {
    return e.type === "keypress" ? _e(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  },
});
q(vr);
var Rr = F({}, pe, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0,
});
q(Rr);
var gr = F({}, se, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Ae,
});
q(gr);
var Ir = F({}, z, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
q(Ir);
var $r = F({}, pe, {
  deltaX: function (e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function (e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0,
});
q($r);
function _r(e, t, r, n, o, a, l, h, s) {
  var i = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, i);
  } catch (I) {
    this.onError(I);
  }
}
var te = !1,
  le = null,
  ue = !1,
  Oe = null,
  Lr = {
    onError: function (e) {
      (te = !0), (le = e);
    },
  };
function wr(e, t, r, n, o, a, l, h, s) {
  (te = !1), (le = null), _r.apply(Lr, arguments);
}
function Tr(e, t, r, n, o, a, l, h, s) {
  if ((wr.apply(this, arguments), te)) {
    if (te) {
      var i = le;
      (te = !1), (le = null);
    } else
      throw Error(
        "clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue."
      );
    ue || ((ue = !0), (Oe = i));
  }
}
var Ce = Array.isArray,
  ne = ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,
  Nr = ne[0],
  Or = ne[1],
  Sr = ne[2],
  yr = ne[3],
  Ar = ne[4],
  Cr = K.unstable_act;
function xr() {}
function Dr(e, t) {
  if (!e) return [];
  if (((e = ir(e)), !e)) return [];
  for (var r = e, n = []; ; ) {
    if (r.tag === 5 || r.tag === 6 || r.tag === 1 || r.tag === 0) {
      var o = r.stateNode;
      t(o) && n.push(o);
    }
    if (r.child) (r.child.return = r), (r = r.child);
    else {
      if (r === e) return n;
      for (; !r.sibling; ) {
        if (!r.return || r.return === e) return n;
        r = r.return;
      }
      (r.sibling.return = r.return), (r = r.sibling);
    }
  }
}
function H(e, t) {
  if (e && !e._reactInternals) {
    var r = String(e);
    throw (
      ((e = Ce(e)
        ? "an array"
        : e && e.nodeType === 1 && e.tagName
          ? "a DOM node"
          : r === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : r),
      Error(t + "(...): the first argument must be a React class instance. Instead received: " + (e + ".")))
    );
  }
}
function ce(e) {
  return !(!e || e.nodeType !== 1 || !e.tagName);
}
function xe(e) {
  return ce(e) ? !1 : e != null && typeof e.render == "function" && typeof e.setState == "function";
}
function Ye(e, t) {
  return xe(e) ? e._reactInternals.type === t : !1;
}
function me(e, t) {
  return H(e, "findAllInRenderedTree"), e ? Dr(e._reactInternals, t) : [];
}
function We(e, t) {
  return (
    H(e, "scryRenderedDOMComponentsWithClass"),
    me(e, function (r) {
      if (ce(r)) {
        var n = r.className;
        typeof n != "string" && (n = r.getAttribute("class") || "");
        var o = n.split(/\s+/);
        if (!Ce(t)) {
          if (t === void 0)
            throw Error("TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.");
          t = t.split(/\s+/);
        }
        return t.every(function (a) {
          return o.indexOf(a) !== -1;
        });
      }
      return !1;
    })
  );
}
function He(e, t) {
  return (
    H(e, "scryRenderedDOMComponentsWithTag"),
    me(e, function (r) {
      return ce(r) && r.tagName.toUpperCase() === t.toUpperCase();
    })
  );
}
function Be(e, t) {
  return (
    H(e, "scryRenderedComponentsWithType"),
    me(e, function (r) {
      return Ye(r, t);
    })
  );
}
function Ge(e, t, r) {
  var n = e.type || "unknown-event";
  (e.currentTarget = Or(r)), Tr(n, t, void 0, e), (e.currentTarget = null);
}
function Ke(e, t, r) {
  for (var n = []; e; ) {
    n.push(e);
    do e = e.return;
    while (e && e.tag !== 5);
    e = e || null;
  }
  for (e = n.length; 0 < e--; ) t(n[e], "captured", r);
  for (e = 0; e < n.length; e++) t(n[e], "bubbled", r);
}
function ze(e, t) {
  var r = e.stateNode;
  if (!r) return null;
  var n = Sr(r);
  if (!n) return null;
  r = n[t];
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
      (n = !n.disabled) ||
        ((e = e.type), (n = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
        (e = !n);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function")
    throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
  return r;
}
function Pr(e, t, r) {
  e &&
    r &&
    r._reactName &&
    (t = ze(e, r._reactName)) &&
    (r._dispatchListeners == null && (r._dispatchListeners = []),
    r._dispatchInstances == null && (r._dispatchInstances = []),
    r._dispatchListeners.push(t),
    r._dispatchInstances.push(e));
}
function jr(e, t, r) {
  var n = r._reactName;
  t === "captured" && (n += "Capture"),
    (t = ze(e, n)) &&
      (r._dispatchListeners == null && (r._dispatchListeners = []),
      r._dispatchInstances == null && (r._dispatchInstances = []),
      r._dispatchListeners.push(t),
      r._dispatchInstances.push(e));
}
var Ze = {},
  br = new Set(["mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave"]);
function Ur(e) {
  return function (t, r) {
    if (K.isValidElement(t))
      throw Error(
        "TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering."
      );
    if (xe(t))
      throw Error(
        "TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead."
      );
    var n = "on" + e[0].toUpperCase() + e.slice(1),
      o = new xr();
    (o.target = t), (o.type = e.toLowerCase());
    var a = Nr(t),
      l = new or(n, o.type, a, o, t);
    l.persist(),
      F(l, r),
      br.has(e) ? l && l._reactName && Pr(l._targetInst, null, l) : l && l._reactName && Ke(l._targetInst, jr, l),
      ye.unstable_batchedUpdates(function () {
        if ((yr(t), l)) {
          var h = l._dispatchListeners,
            s = l._dispatchInstances;
          if (Ce(h)) for (var i = 0; i < h.length && !l.isPropagationStopped(); i++) Ge(l, h[i], s[i]);
          else h && Ge(l, h, s);
          (l._dispatchListeners = null), (l._dispatchInstances = null), l.isPersistent() || l.constructor.release(l);
        }
        if (ue) throw ((h = Oe), (ue = !1), (Oe = null), h);
      }),
      Ar();
  };
}
"blur cancel click close contextMenu copy cut auxClick doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play pointerCancel pointerDown pointerUp rateChange reset resize seeked submit touchCancel touchEnd touchStart volumeChange drag dragEnter dragExit dragLeave dragOver mouseMove mouseOut mouseOver pointerMove pointerOut pointerOver scroll toggle touchMove wheel abort animationEnd animationIteration animationStart canPlay canPlayThrough durationChange emptied encrypted ended error gotPointerCapture load loadedData loadedMetadata loadStart lostPointerCapture playing progress seeking stalled suspend timeUpdate transitionEnd waiting mouseEnter mouseLeave pointerEnter pointerLeave change select beforeInput compositionEnd compositionStart compositionUpdate"
  .split(" ")
  .forEach(function (e) {
    Ze[e] = Ur(e);
  });
b.Simulate = Ze;
b.act = Cr;
b.findAllInRenderedTree = me;
b.findRenderedComponentWithType = function (e, t) {
  if ((H(e, "findRenderedComponentWithType"), (e = Be(e, t)), e.length !== 1))
    throw Error("Did not find exactly one match (found: " + e.length + ") for componentType:" + t);
  return e[0];
};
b.findRenderedDOMComponentWithClass = function (e, t) {
  if ((H(e, "findRenderedDOMComponentWithClass"), (e = We(e, t)), e.length !== 1))
    throw Error("Did not find exactly one match (found: " + e.length + ") for class:" + t);
  return e[0];
};
b.findRenderedDOMComponentWithTag = function (e, t) {
  if ((H(e, "findRenderedDOMComponentWithTag"), (e = He(e, t)), e.length !== 1))
    throw Error("Did not find exactly one match (found: " + e.length + ") for tag:" + t);
  return e[0];
};
b.isCompositeComponent = xe;
b.isCompositeComponentWithType = Ye;
b.isDOMComponent = ce;
b.isDOMComponentElement = function (e) {
  return !!(e && K.isValidElement(e) && e.tagName);
};
b.isElement = function (e) {
  return K.isValidElement(e);
};
b.isElementOfType = function (e, t) {
  return K.isValidElement(e) && e.type === t;
};
b.mockComponent = function (e, t) {
  return (
    (t = t || e.mockTagName || "div"),
    e.prototype.render.mockImplementation(function () {
      return K.createElement(t, null, this.props.children);
    }),
    this
  );
};
b.nativeTouchData = function (e, t) {
  return { touches: [{ pageX: e, pageY: t }] };
};
b.renderIntoDocument = function (e) {
  var t = document.createElement("div");
  return ye.render(e, t);
};
b.scryRenderedComponentsWithType = Be;
b.scryRenderedDOMComponentsWithClass = We;
b.scryRenderedDOMComponentsWithTag = He;
b.traverseTwoPhase = Ke;
var Te = {};
const { global: kr } = __STORYBOOK_MODULE_GLOBAL__;
var he = L({
    "../../node_modules/semver/internal/constants.js"(e, t) {
      var r = "2.0.0",
        n = Number.MAX_SAFE_INTEGER || 9007199254740991,
        o = 16,
        a = 250,
        l = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
      t.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: o,
        MAX_SAFE_BUILD_LENGTH: a,
        MAX_SAFE_INTEGER: n,
        RELEASE_TYPES: l,
        SEMVER_SPEC_VERSION: r,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2,
      };
    },
  }),
  de = L({
    "../../node_modules/semver/internal/debug.js"(e, t) {
      var r =
        typeof process == "object" && Te && Te.NODE_DEBUG && /\bsemver\b/i.test(Te.NODE_DEBUG)
          ? (...n) => console.error("SEMVER", ...n)
          : () => {};
      t.exports = r;
    },
  }),
  ae = L({
    "../../node_modules/semver/internal/re.js"(e, t) {
      var { MAX_SAFE_COMPONENT_LENGTH: r, MAX_SAFE_BUILD_LENGTH: n, MAX_LENGTH: o } = he(),
        a = de();
      e = t.exports = {};
      var l = (e.re = []),
        h = (e.safeRe = []),
        s = (e.src = []),
        i = (e.t = {}),
        I = 0,
        u = "[a-zA-Z0-9-]",
        c = [
          ["\\s", 1],
          ["\\d", o],
          [u, n],
        ],
        m = (f) => {
          for (let [T, N] of c) f = f.split(`${T}*`).join(`${T}{0,${N}}`).split(`${T}+`).join(`${T}{1,${N}}`);
          return f;
        },
        p = (f, T, N) => {
          let S = m(T),
            x = I++;
          a(f, x, T),
            (i[f] = x),
            (s[x] = T),
            (l[x] = new RegExp(T, N ? "g" : void 0)),
            (h[x] = new RegExp(S, N ? "g" : void 0));
        };
      p("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
        p("NUMERICIDENTIFIERLOOSE", "\\d+"),
        p("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${u}*`),
        p("MAINVERSION", `(${s[i.NUMERICIDENTIFIER]})\\.(${s[i.NUMERICIDENTIFIER]})\\.(${s[i.NUMERICIDENTIFIER]})`),
        p(
          "MAINVERSIONLOOSE",
          `(${s[i.NUMERICIDENTIFIERLOOSE]})\\.(${s[i.NUMERICIDENTIFIERLOOSE]})\\.(${s[i.NUMERICIDENTIFIERLOOSE]})`
        ),
        p("PRERELEASEIDENTIFIER", `(?:${s[i.NUMERICIDENTIFIER]}|${s[i.NONNUMERICIDENTIFIER]})`),
        p("PRERELEASEIDENTIFIERLOOSE", `(?:${s[i.NUMERICIDENTIFIERLOOSE]}|${s[i.NONNUMERICIDENTIFIER]})`),
        p("PRERELEASE", `(?:-(${s[i.PRERELEASEIDENTIFIER]}(?:\\.${s[i.PRERELEASEIDENTIFIER]})*))`),
        p("PRERELEASELOOSE", `(?:-?(${s[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${s[i.PRERELEASEIDENTIFIERLOOSE]})*))`),
        p("BUILDIDENTIFIER", `${u}+`),
        p("BUILD", `(?:\\+(${s[i.BUILDIDENTIFIER]}(?:\\.${s[i.BUILDIDENTIFIER]})*))`),
        p("FULLPLAIN", `v?${s[i.MAINVERSION]}${s[i.PRERELEASE]}?${s[i.BUILD]}?`),
        p("FULL", `^${s[i.FULLPLAIN]}$`),
        p("LOOSEPLAIN", `[v=\\s]*${s[i.MAINVERSIONLOOSE]}${s[i.PRERELEASELOOSE]}?${s[i.BUILD]}?`),
        p("LOOSE", `^${s[i.LOOSEPLAIN]}$`),
        p("GTLT", "((?:<|>)?=?)"),
        p("XRANGEIDENTIFIERLOOSE", `${s[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
        p("XRANGEIDENTIFIER", `${s[i.NUMERICIDENTIFIER]}|x|X|\\*`),
        p(
          "XRANGEPLAIN",
          `[v=\\s]*(${s[i.XRANGEIDENTIFIER]})(?:\\.(${s[i.XRANGEIDENTIFIER]})(?:\\.(${s[i.XRANGEIDENTIFIER]})(?:${s[i.PRERELEASE]})?${s[i.BUILD]}?)?)?`
        ),
        p(
          "XRANGEPLAINLOOSE",
          `[v=\\s]*(${s[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[i.XRANGEIDENTIFIERLOOSE]})(?:${s[i.PRERELEASELOOSE]})?${s[i.BUILD]}?)?)?`
        ),
        p("XRANGE", `^${s[i.GTLT]}\\s*${s[i.XRANGEPLAIN]}$`),
        p("XRANGELOOSE", `^${s[i.GTLT]}\\s*${s[i.XRANGEPLAINLOOSE]}$`),
        p("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`),
        p("COERCE", `${s[i.COERCEPLAIN]}(?:$|[^\\d])`),
        p("COERCEFULL", s[i.COERCEPLAIN] + `(?:${s[i.PRERELEASE]})?(?:${s[i.BUILD]})?(?:$|[^\\d])`),
        p("COERCERTL", s[i.COERCE], !0),
        p("COERCERTLFULL", s[i.COERCEFULL], !0),
        p("LONETILDE", "(?:~>?)"),
        p("TILDETRIM", `(\\s*)${s[i.LONETILDE]}\\s+`, !0),
        (e.tildeTrimReplace = "$1~"),
        p("TILDE", `^${s[i.LONETILDE]}${s[i.XRANGEPLAIN]}$`),
        p("TILDELOOSE", `^${s[i.LONETILDE]}${s[i.XRANGEPLAINLOOSE]}$`),
        p("LONECARET", "(?:\\^)"),
        p("CARETTRIM", `(\\s*)${s[i.LONECARET]}\\s+`, !0),
        (e.caretTrimReplace = "$1^"),
        p("CARET", `^${s[i.LONECARET]}${s[i.XRANGEPLAIN]}$`),
        p("CARETLOOSE", `^${s[i.LONECARET]}${s[i.XRANGEPLAINLOOSE]}$`),
        p("COMPARATORLOOSE", `^${s[i.GTLT]}\\s*(${s[i.LOOSEPLAIN]})$|^$`),
        p("COMPARATOR", `^${s[i.GTLT]}\\s*(${s[i.FULLPLAIN]})$|^$`),
        p("COMPARATORTRIM", `(\\s*)${s[i.GTLT]}\\s*(${s[i.LOOSEPLAIN]}|${s[i.XRANGEPLAIN]})`, !0),
        (e.comparatorTrimReplace = "$1$2$3"),
        p("HYPHENRANGE", `^\\s*(${s[i.XRANGEPLAIN]})\\s+-\\s+(${s[i.XRANGEPLAIN]})\\s*$`),
        p("HYPHENRANGELOOSE", `^\\s*(${s[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${s[i.XRANGEPLAINLOOSE]})\\s*$`),
        p("STAR", "(<|>)?=?\\s*\\*"),
        p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
        p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    },
  }),
  De = L({
    "../../node_modules/semver/internal/parse-options.js"(e, t) {
      var r = Object.freeze({ loose: !0 }),
        n = Object.freeze({}),
        o = (a) => (a ? (typeof a != "object" ? r : a) : n);
      t.exports = o;
    },
  }),
  Je = L({
    "../../node_modules/semver/internal/identifiers.js"(e, t) {
      var r = /^[0-9]+$/,
        n = (a, l) => {
          let h = r.test(a),
            s = r.test(l);
          return h && s && ((a = +a), (l = +l)), a === l ? 0 : h && !s ? -1 : s && !h ? 1 : a < l ? -1 : 1;
        },
        o = (a, l) => n(l, a);
      t.exports = { compareIdentifiers: n, rcompareIdentifiers: o };
    },
  }),
  U = L({
    "../../node_modules/semver/classes/semver.js"(e, t) {
      var r = de(),
        { MAX_LENGTH: n, MAX_SAFE_INTEGER: o } = he(),
        { safeRe: a, t: l } = ae(),
        h = De(),
        { compareIdentifiers: s } = Je(),
        i = class V {
          constructor(u, c) {
            if (((c = h(c)), u instanceof V)) {
              if (u.loose === !!c.loose && u.includePrerelease === !!c.includePrerelease) return u;
              u = u.version;
            } else if (typeof u != "string")
              throw new TypeError(`Invalid version. Must be a string. Got type "${typeof u}".`);
            if (u.length > n) throw new TypeError(`version is longer than ${n} characters`);
            r("SemVer", u, c),
              (this.options = c),
              (this.loose = !!c.loose),
              (this.includePrerelease = !!c.includePrerelease);
            let m = u.trim().match(c.loose ? a[l.LOOSE] : a[l.FULL]);
            if (!m) throw new TypeError(`Invalid Version: ${u}`);
            if (
              ((this.raw = u),
              (this.major = +m[1]),
              (this.minor = +m[2]),
              (this.patch = +m[3]),
              this.major > o || this.major < 0)
            )
              throw new TypeError("Invalid major version");
            if (this.minor > o || this.minor < 0) throw new TypeError("Invalid minor version");
            if (this.patch > o || this.patch < 0) throw new TypeError("Invalid patch version");
            m[4]
              ? (this.prerelease = m[4].split(".").map((p) => {
                  if (/^[0-9]+$/.test(p)) {
                    let f = +p;
                    if (f >= 0 && f < o) return f;
                  }
                  return p;
                }))
              : (this.prerelease = []),
              (this.build = m[5] ? m[5].split(".") : []),
              this.format();
          }
          format() {
            return (
              (this.version = `${this.major}.${this.minor}.${this.patch}`),
              this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(u) {
            if ((r("SemVer.compare", this.version, this.options, u), !(u instanceof V))) {
              if (typeof u == "string" && u === this.version) return 0;
              u = new V(u, this.options);
            }
            return u.version === this.version ? 0 : this.compareMain(u) || this.comparePre(u);
          }
          compareMain(u) {
            return (
              u instanceof V || (u = new V(u, this.options)),
              s(this.major, u.major) || s(this.minor, u.minor) || s(this.patch, u.patch)
            );
          }
          comparePre(u) {
            if ((u instanceof V || (u = new V(u, this.options)), this.prerelease.length && !u.prerelease.length))
              return -1;
            if (!this.prerelease.length && u.prerelease.length) return 1;
            if (!this.prerelease.length && !u.prerelease.length) return 0;
            let c = 0;
            do {
              let m = this.prerelease[c],
                p = u.prerelease[c];
              if ((r("prerelease compare", c, m, p), m === void 0 && p === void 0)) return 0;
              if (p === void 0) return 1;
              if (m === void 0) return -1;
              if (m !== p) return s(m, p);
            } while (++c);
          }
          compareBuild(u) {
            u instanceof V || (u = new V(u, this.options));
            let c = 0;
            do {
              let m = this.build[c],
                p = u.build[c];
              if ((r("build compare", c, m, p), m === void 0 && p === void 0)) return 0;
              if (p === void 0) return 1;
              if (m === void 0) return -1;
              if (m !== p) return s(m, p);
            } while (++c);
          }
          inc(u, c, m) {
            switch (u) {
              case "premajor":
                (this.prerelease.length = 0), (this.patch = 0), (this.minor = 0), this.major++, this.inc("pre", c, m);
                break;
              case "preminor":
                (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc("pre", c, m);
                break;
              case "prepatch":
                (this.prerelease.length = 0), this.inc("patch", c, m), this.inc("pre", c, m);
                break;
              case "prerelease":
                this.prerelease.length === 0 && this.inc("patch", c, m), this.inc("pre", c, m);
                break;
              case "major":
                (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "minor":
                (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "patch":
                this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
                break;
              case "pre": {
                let p = Number(m) ? 1 : 0;
                if (!c && m === !1) throw new Error("invalid increment argument: identifier is empty");
                if (this.prerelease.length === 0) this.prerelease = [p];
                else {
                  let f = this.prerelease.length;
                  for (; --f >= 0; ) typeof this.prerelease[f] == "number" && (this.prerelease[f]++, (f = -2));
                  if (f === -1) {
                    if (c === this.prerelease.join(".") && m === !1)
                      throw new Error("invalid increment argument: identifier already exists");
                    this.prerelease.push(p);
                  }
                }
                if (c) {
                  let f = [c, p];
                  m === !1 && (f = [c]),
                    s(this.prerelease[0], c) === 0
                      ? isNaN(this.prerelease[1]) && (this.prerelease = f)
                      : (this.prerelease = f);
                }
                break;
              }
              default:
                throw new Error(`invalid increment argument: ${u}`);
            }
            return (this.raw = this.format()), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
          }
        };
      t.exports = i;
    },
  }),
  Z = L({
    "../../node_modules/semver/functions/parse.js"(e, t) {
      var r = U(),
        n = (o, a, l = !1) => {
          if (o instanceof r) return o;
          try {
            return new r(o, a);
          } catch (h) {
            if (!l) return null;
            throw h;
          }
        };
      t.exports = n;
    },
  }),
  Fr = L({
    "../../node_modules/semver/functions/valid.js"(e, t) {
      var r = Z(),
        n = (o, a) => {
          let l = r(o, a);
          return l ? l.version : null;
        };
      t.exports = n;
    },
  }),
  qr = L({
    "../../node_modules/semver/functions/clean.js"(e, t) {
      var r = Z(),
        n = (o, a) => {
          let l = r(o.trim().replace(/^[=v]+/, ""), a);
          return l ? l.version : null;
        };
      t.exports = n;
    },
  }),
  Gr = L({
    "../../node_modules/semver/functions/inc.js"(e, t) {
      var r = U(),
        n = (o, a, l, h, s) => {
          typeof l == "string" && ((s = h), (h = l), (l = void 0));
          try {
            return new r(o instanceof r ? o.version : o, l).inc(a, h, s).version;
          } catch {
            return null;
          }
        };
      t.exports = n;
    },
  }),
  Mr = L({
    "../../node_modules/semver/functions/diff.js"(e, t) {
      var r = Z(),
        n = (o, a) => {
          let l = r(o, null, !0),
            h = r(a, null, !0),
            s = l.compare(h);
          if (s === 0) return null;
          let i = s > 0,
            I = i ? l : h,
            u = i ? h : l,
            c = !!I.prerelease.length;
          if (u.prerelease.length && !c)
            return !u.patch && !u.minor ? "major" : I.patch ? "patch" : I.minor ? "minor" : "major";
          let m = c ? "pre" : "";
          return l.major !== h.major
            ? m + "major"
            : l.minor !== h.minor
              ? m + "minor"
              : l.patch !== h.patch
                ? m + "patch"
                : "prerelease";
        };
      t.exports = n;
    },
  }),
  Xr = L({
    "../../node_modules/semver/functions/major.js"(e, t) {
      var r = U(),
        n = (o, a) => new r(o, a).major;
      t.exports = n;
    },
  }),
  Vr = L({
    "../../node_modules/semver/functions/minor.js"(e, t) {
      var r = U(),
        n = (o, a) => new r(o, a).minor;
      t.exports = n;
    },
  }),
  Yr = L({
    "../../node_modules/semver/functions/patch.js"(e, t) {
      var r = U(),
        n = (o, a) => new r(o, a).patch;
      t.exports = n;
    },
  }),
  Wr = L({
    "../../node_modules/semver/functions/prerelease.js"(e, t) {
      var r = Z(),
        n = (o, a) => {
          let l = r(o, a);
          return l && l.prerelease.length ? l.prerelease : null;
        };
      t.exports = n;
    },
  }),
  M = L({
    "../../node_modules/semver/functions/compare.js"(e, t) {
      var r = U(),
        n = (o, a, l) => new r(o, l).compare(new r(a, l));
      t.exports = n;
    },
  }),
  Hr = L({
    "../../node_modules/semver/functions/rcompare.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(a, o, l);
      t.exports = n;
    },
  }),
  Br = L({
    "../../node_modules/semver/functions/compare-loose.js"(e, t) {
      var r = M(),
        n = (o, a) => r(o, a, !0);
      t.exports = n;
    },
  }),
  Pe = L({
    "../../node_modules/semver/functions/compare-build.js"(e, t) {
      var r = U(),
        n = (o, a, l) => {
          let h = new r(o, l),
            s = new r(a, l);
          return h.compare(s) || h.compareBuild(s);
        };
      t.exports = n;
    },
  }),
  Kr = L({
    "../../node_modules/semver/functions/sort.js"(e, t) {
      var r = Pe(),
        n = (o, a) => o.sort((l, h) => r(l, h, a));
      t.exports = n;
    },
  }),
  zr = L({
    "../../node_modules/semver/functions/rsort.js"(e, t) {
      var r = Pe(),
        n = (o, a) => o.sort((l, h) => r(h, l, a));
      t.exports = n;
    },
  }),
  fe = L({
    "../../node_modules/semver/functions/gt.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) > 0;
      t.exports = n;
    },
  }),
  je = L({
    "../../node_modules/semver/functions/lt.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) < 0;
      t.exports = n;
    },
  }),
  Qe = L({
    "../../node_modules/semver/functions/eq.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) === 0;
      t.exports = n;
    },
  }),
  er = L({
    "../../node_modules/semver/functions/neq.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) !== 0;
      t.exports = n;
    },
  }),
  be = L({
    "../../node_modules/semver/functions/gte.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) >= 0;
      t.exports = n;
    },
  }),
  Ue = L({
    "../../node_modules/semver/functions/lte.js"(e, t) {
      var r = M(),
        n = (o, a, l) => r(o, a, l) <= 0;
      t.exports = n;
    },
  }),
  rr = L({
    "../../node_modules/semver/functions/cmp.js"(e, t) {
      var r = Qe(),
        n = er(),
        o = fe(),
        a = be(),
        l = je(),
        h = Ue(),
        s = (i, I, u, c) => {
          switch (I) {
            case "===":
              return typeof i == "object" && (i = i.version), typeof u == "object" && (u = u.version), i === u;
            case "!==":
              return typeof i == "object" && (i = i.version), typeof u == "object" && (u = u.version), i !== u;
            case "":
            case "=":
            case "==":
              return r(i, u, c);
            case "!=":
              return n(i, u, c);
            case ">":
              return o(i, u, c);
            case ">=":
              return a(i, u, c);
            case "<":
              return l(i, u, c);
            case "<=":
              return h(i, u, c);
            default:
              throw new TypeError(`Invalid operator: ${I}`);
          }
        };
      t.exports = s;
    },
  }),
  Zr = L({
    "../../node_modules/semver/functions/coerce.js"(e, t) {
      var r = U(),
        n = Z(),
        { safeRe: o, t: a } = ae(),
        l = (h, s) => {
          if (h instanceof r) return h;
          if ((typeof h == "number" && (h = String(h)), typeof h != "string")) return null;
          s = s || {};
          let i = null;
          if (!s.rtl) i = h.match(s.includePrerelease ? o[a.COERCEFULL] : o[a.COERCE]);
          else {
            let f = s.includePrerelease ? o[a.COERCERTLFULL] : o[a.COERCERTL],
              T;
            for (; (T = f.exec(h)) && (!i || i.index + i[0].length !== h.length); )
              (!i || T.index + T[0].length !== i.index + i[0].length) && (i = T),
                (f.lastIndex = T.index + T[1].length + T[2].length);
            f.lastIndex = -1;
          }
          if (i === null) return null;
          let I = i[2],
            u = i[3] || "0",
            c = i[4] || "0",
            m = s.includePrerelease && i[5] ? `-${i[5]}` : "",
            p = s.includePrerelease && i[6] ? `+${i[6]}` : "";
          return n(`${I}.${u}.${c}${m}${p}`, s);
        };
      t.exports = l;
    },
  }),
  Jr = L({
    "../../node_modules/semver/internal/lrucache.js"(e, t) {
      var r = class {
        constructor() {
          (this.max = 1e3), (this.map = new Map());
        }
        get(n) {
          let o = this.map.get(n);
          if (o !== void 0) return this.map.delete(n), this.map.set(n, o), o;
        }
        delete(n) {
          return this.map.delete(n);
        }
        set(n, o) {
          if (!this.delete(n) && o !== void 0) {
            if (this.map.size >= this.max) {
              let a = this.map.keys().next().value;
              this.delete(a);
            }
            this.map.set(n, o);
          }
          return this;
        }
      };
      t.exports = r;
    },
  }),
  X = L({
    "../../node_modules/semver/classes/range.js"(e, t) {
      var r = /\s+/g,
        n = class oe {
          constructor(d, g) {
            if (((g = l(g)), d instanceof oe))
              return d.loose === !!g.loose && d.includePrerelease === !!g.includePrerelease ? d : new oe(d.raw, g);
            if (d instanceof h) return (this.raw = d.value), (this.set = [[d]]), (this.formatted = void 0), this;
            if (
              ((this.options = g),
              (this.loose = !!g.loose),
              (this.includePrerelease = !!g.includePrerelease),
              (this.raw = d.trim().replace(r, " ")),
              (this.set = this.raw
                .split("||")
                .map((v) => this.parseRange(v.trim()))
                .filter((v) => v.length)),
              !this.set.length)
            )
              throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
            if (this.set.length > 1) {
              let v = this.set[0];
              if (((this.set = this.set.filter(($) => !N($[0]))), this.set.length === 0)) this.set = [v];
              else if (this.set.length > 1) {
                for (let $ of this.set)
                  if ($.length === 1 && S($[0])) {
                    this.set = [$];
                    break;
                  }
              }
            }
            this.formatted = void 0;
          }
          get range() {
            if (this.formatted === void 0) {
              this.formatted = "";
              for (let d = 0; d < this.set.length; d++) {
                d > 0 && (this.formatted += "||");
                let g = this.set[d];
                for (let v = 0; v < g.length; v++)
                  v > 0 && (this.formatted += " "), (this.formatted += g[v].toString().trim());
              }
            }
            return this.formatted;
          }
          format() {
            return this.range;
          }
          toString() {
            return this.range;
          }
          parseRange(d) {
            let g = ((this.options.includePrerelease && f) | (this.options.loose && T)) + ":" + d,
              v = a.get(g);
            if (v) return v;
            let $ = this.options.loose,
              R = $ ? I[u.HYPHENRANGELOOSE] : I[u.HYPHENRANGE];
            (d = d.replace(R, Ie(this.options.includePrerelease))),
              s("hyphen replace", d),
              (d = d.replace(I[u.COMPARATORTRIM], c)),
              s("comparator trim", d),
              (d = d.replace(I[u.TILDETRIM], m)),
              s("tilde trim", d),
              (d = d.replace(I[u.CARETTRIM], p)),
              s("caret trim", d);
            let _ = d
              .split(" ")
              .map((C) => G(C, this.options))
              .join(" ")
              .split(/\s+/)
              .map((C) => ge(C, this.options));
            $ && (_ = _.filter((C) => (s("loose invalid filter", C, this.options), !!C.match(I[u.COMPARATORLOOSE])))),
              s("range list", _);
            let y = new Map(),
              O = _.map((C) => new h(C, this.options));
            for (let C of O) {
              if (N(C)) return [C];
              y.set(C.value, C);
            }
            y.size > 1 && y.has("") && y.delete("");
            let A = [...y.values()];
            return a.set(g, A), A;
          }
          intersects(d, g) {
            if (!(d instanceof oe)) throw new TypeError("a Range is required");
            return this.set.some(
              (v) => x(v, g) && d.set.some(($) => x($, g) && v.every((R) => $.every((_) => R.intersects(_, g))))
            );
          }
          test(d) {
            if (!d) return !1;
            if (typeof d == "string")
              try {
                d = new i(d, this.options);
              } catch {
                return !1;
              }
            for (let g = 0; g < this.set.length; g++) if ($e(this.set[g], d, this.options)) return !0;
            return !1;
          }
        };
      t.exports = n;
      var o = Jr(),
        a = new o(),
        l = De(),
        h = Ee(),
        s = de(),
        i = U(),
        { safeRe: I, t: u, comparatorTrimReplace: c, tildeTrimReplace: m, caretTrimReplace: p } = ae(),
        { FLAG_INCLUDE_PRERELEASE: f, FLAG_LOOSE: T } = he(),
        N = (E) => E.value === "<0.0.0-0",
        S = (E) => E.value === "",
        x = (E, d) => {
          let g = !0,
            v = E.slice(),
            $ = v.pop();
          for (; g && v.length; ) (g = v.every((R) => $.intersects(R, d))), ($ = v.pop());
          return g;
        },
        G = (E, d) => (
          s("comp", E, d),
          (E = P(E, d)),
          s("caret", E),
          (E = W(E, d)),
          s("tildes", E),
          (E = w(E, d)),
          s("xrange", E),
          (E = Re(E, d)),
          s("stars", E),
          E
        ),
        D = (E) => !E || E.toLowerCase() === "x" || E === "*",
        W = (E, d) =>
          E.trim()
            .split(/\s+/)
            .map((g) => k(g, d))
            .join(" "),
        k = (E, d) => {
          let g = d.loose ? I[u.TILDELOOSE] : I[u.TILDE];
          return E.replace(g, (v, $, R, _, y) => {
            s("tilde", E, v, $, R, _, y);
            let O;
            return (
              D($)
                ? (O = "")
                : D(R)
                  ? (O = `>=${$}.0.0 <${+$ + 1}.0.0-0`)
                  : D(_)
                    ? (O = `>=${$}.${R}.0 <${$}.${+R + 1}.0-0`)
                    : y
                      ? (s("replaceTilde pr", y), (O = `>=${$}.${R}.${_}-${y} <${$}.${+R + 1}.0-0`))
                      : (O = `>=${$}.${R}.${_} <${$}.${+R + 1}.0-0`),
              s("tilde return", O),
              O
            );
          });
        },
        P = (E, d) =>
          E.trim()
            .split(/\s+/)
            .map((g) => j(g, d))
            .join(" "),
        j = (E, d) => {
          s("caret", E, d);
          let g = d.loose ? I[u.CARETLOOSE] : I[u.CARET],
            v = d.includePrerelease ? "-0" : "";
          return E.replace(g, ($, R, _, y, O) => {
            s("caret", E, $, R, _, y, O);
            let A;
            return (
              D(R)
                ? (A = "")
                : D(_)
                  ? (A = `>=${R}.0.0${v} <${+R + 1}.0.0-0`)
                  : D(y)
                    ? R === "0"
                      ? (A = `>=${R}.${_}.0${v} <${R}.${+_ + 1}.0-0`)
                      : (A = `>=${R}.${_}.0${v} <${+R + 1}.0.0-0`)
                    : O
                      ? (s("replaceCaret pr", O),
                        R === "0"
                          ? _ === "0"
                            ? (A = `>=${R}.${_}.${y}-${O} <${R}.${_}.${+y + 1}-0`)
                            : (A = `>=${R}.${_}.${y}-${O} <${R}.${+_ + 1}.0-0`)
                          : (A = `>=${R}.${_}.${y}-${O} <${+R + 1}.0.0-0`))
                      : (s("no pr"),
                        R === "0"
                          ? _ === "0"
                            ? (A = `>=${R}.${_}.${y}${v} <${R}.${_}.${+y + 1}-0`)
                            : (A = `>=${R}.${_}.${y}${v} <${R}.${+_ + 1}.0-0`)
                          : (A = `>=${R}.${_}.${y} <${+R + 1}.0.0-0`)),
              s("caret return", A),
              A
            );
          });
        },
        w = (E, d) => (
          s("replaceXRanges", E, d),
          E.split(/\s+/)
            .map((g) => J(g, d))
            .join(" ")
        ),
        J = (E, d) => {
          E = E.trim();
          let g = d.loose ? I[u.XRANGELOOSE] : I[u.XRANGE];
          return E.replace(g, (v, $, R, _, y, O) => {
            s("xRange", E, v, $, R, _, y, O);
            let A = D(R),
              C = A || D(_),
              B = C || D(y),
              Q = B;
            return (
              $ === "=" && Q && ($ = ""),
              (O = d.includePrerelease ? "-0" : ""),
              A
                ? $ === ">" || $ === "<"
                  ? (v = "<0.0.0-0")
                  : (v = "*")
                : $ && Q
                  ? (C && (_ = 0),
                    (y = 0),
                    $ === ">"
                      ? (($ = ">="), C ? ((R = +R + 1), (_ = 0), (y = 0)) : ((_ = +_ + 1), (y = 0)))
                      : $ === "<=" && (($ = "<"), C ? (R = +R + 1) : (_ = +_ + 1)),
                    $ === "<" && (O = "-0"),
                    (v = `${$ + R}.${_}.${y}${O}`))
                  : C
                    ? (v = `>=${R}.0.0${O} <${+R + 1}.0.0-0`)
                    : B && (v = `>=${R}.${_}.0${O} <${R}.${+_ + 1}.0-0`),
              s("xRange return", v),
              v
            );
          });
        },
        Re = (E, d) => (s("replaceStars", E, d), E.trim().replace(I[u.STAR], "")),
        ge = (E, d) => (s("replaceGTE0", E, d), E.trim().replace(I[d.includePrerelease ? u.GTE0PRE : u.GTE0], "")),
        Ie = (E) => (d, g, v, $, R, _, y, O, A, C, B, Q) => (
          D(v)
            ? (g = "")
            : D($)
              ? (g = `>=${v}.0.0${E ? "-0" : ""}`)
              : D(R)
                ? (g = `>=${v}.${$}.0${E ? "-0" : ""}`)
                : _
                  ? (g = `>=${g}`)
                  : (g = `>=${g}${E ? "-0" : ""}`),
          D(A)
            ? (O = "")
            : D(C)
              ? (O = `<${+A + 1}.0.0-0`)
              : D(B)
                ? (O = `<${A}.${+C + 1}.0-0`)
                : Q
                  ? (O = `<=${A}.${C}.${B}-${Q}`)
                  : E
                    ? (O = `<${A}.${C}.${+B + 1}-0`)
                    : (O = `<=${O}`),
          `${g} ${O}`.trim()
        ),
        $e = (E, d, g) => {
          for (let v = 0; v < E.length; v++) if (!E[v].test(d)) return !1;
          if (d.prerelease.length && !g.includePrerelease) {
            for (let v = 0; v < E.length; v++)
              if ((s(E[v].semver), E[v].semver !== h.ANY && E[v].semver.prerelease.length > 0)) {
                let $ = E[v].semver;
                if ($.major === d.major && $.minor === d.minor && $.patch === d.patch) return !0;
              }
            return !1;
          }
          return !0;
        };
    },
  }),
  Ee = L({
    "../../node_modules/semver/classes/comparator.js"(e, t) {
      var r = Symbol("SemVer ANY"),
        n = class Se {
          static get ANY() {
            return r;
          }
          constructor(c, m) {
            if (((m = o(m)), c instanceof Se)) {
              if (c.loose === !!m.loose) return c;
              c = c.value;
            }
            (c = c.trim().split(/\s+/).join(" ")),
              s("comparator", c, m),
              (this.options = m),
              (this.loose = !!m.loose),
              this.parse(c),
              this.semver === r ? (this.value = "") : (this.value = this.operator + this.semver.version),
              s("comp", this);
          }
          parse(c) {
            let m = this.options.loose ? a[l.COMPARATORLOOSE] : a[l.COMPARATOR],
              p = c.match(m);
            if (!p) throw new TypeError(`Invalid comparator: ${c}`);
            (this.operator = p[1] !== void 0 ? p[1] : ""),
              this.operator === "=" && (this.operator = ""),
              p[2] ? (this.semver = new i(p[2], this.options.loose)) : (this.semver = r);
          }
          toString() {
            return this.value;
          }
          test(c) {
            if ((s("Comparator.test", c, this.options.loose), this.semver === r || c === r)) return !0;
            if (typeof c == "string")
              try {
                c = new i(c, this.options);
              } catch {
                return !1;
              }
            return h(c, this.operator, this.semver, this.options);
          }
          intersects(c, m) {
            if (!(c instanceof Se)) throw new TypeError("a Comparator is required");
            return this.operator === ""
              ? this.value === ""
                ? !0
                : new I(c.value, m).test(this.value)
              : c.operator === ""
                ? c.value === ""
                  ? !0
                  : new I(this.value, m).test(c.semver)
                : ((m = o(m)),
                  (m.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0")) ||
                  (!m.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")))
                    ? !1
                    : !!(
                        (this.operator.startsWith(">") && c.operator.startsWith(">")) ||
                        (this.operator.startsWith("<") && c.operator.startsWith("<")) ||
                        (this.semver.version === c.semver.version &&
                          this.operator.includes("=") &&
                          c.operator.includes("=")) ||
                        (h(this.semver, "<", c.semver, m) &&
                          this.operator.startsWith(">") &&
                          c.operator.startsWith("<")) ||
                        (h(this.semver, ">", c.semver, m) &&
                          this.operator.startsWith("<") &&
                          c.operator.startsWith(">"))
                      ));
          }
        };
      t.exports = n;
      var o = De(),
        { safeRe: a, t: l } = ae(),
        h = rr(),
        s = de(),
        i = U(),
        I = X();
    },
  }),
  ve = L({
    "../../node_modules/semver/functions/satisfies.js"(e, t) {
      var r = X(),
        n = (o, a, l) => {
          try {
            a = new r(a, l);
          } catch {
            return !1;
          }
          return a.test(o);
        };
      t.exports = n;
    },
  }),
  Qr = L({
    "../../node_modules/semver/ranges/to-comparators.js"(e, t) {
      var r = X(),
        n = (o, a) =>
          new r(o, a).set.map((l) =>
            l
              .map((h) => h.value)
              .join(" ")
              .trim()
              .split(" ")
          );
      t.exports = n;
    },
  }),
  et = L({
    "../../node_modules/semver/ranges/max-satisfying.js"(e, t) {
      var r = U(),
        n = X(),
        o = (a, l, h) => {
          let s = null,
            i = null,
            I = null;
          try {
            I = new n(l, h);
          } catch {
            return null;
          }
          return (
            a.forEach((u) => {
              I.test(u) && (!s || i.compare(u) === -1) && ((s = u), (i = new r(s, h)));
            }),
            s
          );
        };
      t.exports = o;
    },
  }),
  rt = L({
    "../../node_modules/semver/ranges/min-satisfying.js"(e, t) {
      var r = U(),
        n = X(),
        o = (a, l, h) => {
          let s = null,
            i = null,
            I = null;
          try {
            I = new n(l, h);
          } catch {
            return null;
          }
          return (
            a.forEach((u) => {
              I.test(u) && (!s || i.compare(u) === 1) && ((s = u), (i = new r(s, h)));
            }),
            s
          );
        };
      t.exports = o;
    },
  }),
  tt = L({
    "../../node_modules/semver/ranges/min-version.js"(e, t) {
      var r = U(),
        n = X(),
        o = fe(),
        a = (l, h) => {
          l = new n(l, h);
          let s = new r("0.0.0");
          if (l.test(s) || ((s = new r("0.0.0-0")), l.test(s))) return s;
          s = null;
          for (let i = 0; i < l.set.length; ++i) {
            let I = l.set[i],
              u = null;
            I.forEach((c) => {
              let m = new r(c.semver.version);
              switch (c.operator) {
                case ">":
                  m.prerelease.length === 0 ? m.patch++ : m.prerelease.push(0), (m.raw = m.format());
                case "":
                case ">=":
                  (!u || o(m, u)) && (u = m);
                  break;
                case "<":
                case "<=":
                  break;
                default:
                  throw new Error(`Unexpected operation: ${c.operator}`);
              }
            }),
              u && (!s || o(s, u)) && (s = u);
          }
          return s && l.test(s) ? s : null;
        };
      t.exports = a;
    },
  }),
  st = L({
    "../../node_modules/semver/ranges/valid.js"(e, t) {
      var r = X(),
        n = (o, a) => {
          try {
            return new r(o, a).range || "*";
          } catch {
            return null;
          }
        };
      t.exports = n;
    },
  }),
  ke = L({
    "../../node_modules/semver/ranges/outside.js"(e, t) {
      var r = U(),
        n = Ee(),
        { ANY: o } = n,
        a = X(),
        l = ve(),
        h = fe(),
        s = je(),
        i = Ue(),
        I = be(),
        u = (c, m, p, f) => {
          (c = new r(c, f)), (m = new a(m, f));
          let T, N, S, x, G;
          switch (p) {
            case ">":
              (T = h), (N = i), (S = s), (x = ">"), (G = ">=");
              break;
            case "<":
              (T = s), (N = I), (S = h), (x = "<"), (G = "<=");
              break;
            default:
              throw new TypeError('Must provide a hilo val of "<" or ">"');
          }
          if (l(c, m, f)) return !1;
          for (let D = 0; D < m.set.length; ++D) {
            let W = m.set[D],
              k = null,
              P = null;
            if (
              (W.forEach((j) => {
                j.semver === o && (j = new n(">=0.0.0")),
                  (k = k || j),
                  (P = P || j),
                  T(j.semver, k.semver, f) ? (k = j) : S(j.semver, P.semver, f) && (P = j);
              }),
              k.operator === x ||
                k.operator === G ||
                ((!P.operator || P.operator === x) && N(c, P.semver)) ||
                (P.operator === G && S(c, P.semver)))
            )
              return !1;
          }
          return !0;
        };
      t.exports = u;
    },
  }),
  nt = L({
    "../../node_modules/semver/ranges/gtr.js"(e, t) {
      var r = ke(),
        n = (o, a, l) => r(o, a, ">", l);
      t.exports = n;
    },
  }),
  at = L({
    "../../node_modules/semver/ranges/ltr.js"(e, t) {
      var r = ke(),
        n = (o, a, l) => r(o, a, "<", l);
      t.exports = n;
    },
  }),
  it = L({
    "../../node_modules/semver/ranges/intersects.js"(e, t) {
      var r = X(),
        n = (o, a, l) => ((o = new r(o, l)), (a = new r(a, l)), o.intersects(a, l));
      t.exports = n;
    },
  }),
  ot = L({
    "../../node_modules/semver/ranges/simplify.js"(e, t) {
      var r = ve(),
        n = M();
      t.exports = (o, a, l) => {
        let h = [],
          s = null,
          i = null,
          I = o.sort((p, f) => n(p, f, l));
        for (let p of I) r(p, a, l) ? ((i = p), s || (s = p)) : (i && h.push([s, i]), (i = null), (s = null));
        s && h.push([s, null]);
        let u = [];
        for (let [p, f] of h)
          p === f
            ? u.push(p)
            : !f && p === I[0]
              ? u.push("*")
              : f
                ? p === I[0]
                  ? u.push(`<=${f}`)
                  : u.push(`${p} - ${f}`)
                : u.push(`>=${p}`);
        let c = u.join(" || "),
          m = typeof a.raw == "string" ? a.raw : String(a);
        return c.length < m.length ? c : a;
      };
    },
  }),
  lt = L({
    "../../node_modules/semver/ranges/subset.js"(e, t) {
      var r = X(),
        n = Ee(),
        { ANY: o } = n,
        a = ve(),
        l = M(),
        h = (m, p, f = {}) => {
          if (m === p) return !0;
          (m = new r(m, f)), (p = new r(p, f));
          let T = !1;
          e: for (let N of m.set) {
            for (let S of p.set) {
              let x = I(N, S, f);
              if (((T = T || x !== null), x)) continue e;
            }
            if (T) return !1;
          }
          return !0;
        },
        s = [new n(">=0.0.0-0")],
        i = [new n(">=0.0.0")],
        I = (m, p, f) => {
          if (m === p) return !0;
          if (m.length === 1 && m[0].semver === o) {
            if (p.length === 1 && p[0].semver === o) return !0;
            f.includePrerelease ? (m = s) : (m = i);
          }
          if (p.length === 1 && p[0].semver === o) {
            if (f.includePrerelease) return !0;
            p = i;
          }
          let T = new Set(),
            N,
            S;
          for (let w of m)
            w.operator === ">" || w.operator === ">="
              ? (N = u(N, w, f))
              : w.operator === "<" || w.operator === "<="
                ? (S = c(S, w, f))
                : T.add(w.semver);
          if (T.size > 1) return null;
          let x;
          if (
            N &&
            S &&
            ((x = l(N.semver, S.semver, f)), x > 0 || (x === 0 && (N.operator !== ">=" || S.operator !== "<=")))
          )
            return null;
          for (let w of T) {
            if ((N && !a(w, String(N), f)) || (S && !a(w, String(S), f))) return null;
            for (let J of p) if (!a(w, String(J), f)) return !1;
            return !0;
          }
          let G,
            D,
            W,
            k,
            P = S && !f.includePrerelease && S.semver.prerelease.length ? S.semver : !1,
            j = N && !f.includePrerelease && N.semver.prerelease.length ? N.semver : !1;
          P && P.prerelease.length === 1 && S.operator === "<" && P.prerelease[0] === 0 && (P = !1);
          for (let w of p) {
            if (
              ((k = k || w.operator === ">" || w.operator === ">="),
              (W = W || w.operator === "<" || w.operator === "<="),
              N)
            ) {
              if (
                (j &&
                  w.semver.prerelease &&
                  w.semver.prerelease.length &&
                  w.semver.major === j.major &&
                  w.semver.minor === j.minor &&
                  w.semver.patch === j.patch &&
                  (j = !1),
                w.operator === ">" || w.operator === ">=")
              ) {
                if (((G = u(N, w, f)), G === w && G !== N)) return !1;
              } else if (N.operator === ">=" && !a(N.semver, String(w), f)) return !1;
            }
            if (S) {
              if (
                (P &&
                  w.semver.prerelease &&
                  w.semver.prerelease.length &&
                  w.semver.major === P.major &&
                  w.semver.minor === P.minor &&
                  w.semver.patch === P.patch &&
                  (P = !1),
                w.operator === "<" || w.operator === "<=")
              ) {
                if (((D = c(S, w, f)), D === w && D !== S)) return !1;
              } else if (S.operator === "<=" && !a(S.semver, String(w), f)) return !1;
            }
            if (!w.operator && (S || N) && x !== 0) return !1;
          }
          return !((N && W && !S && x !== 0) || (S && k && !N && x !== 0) || j || P);
        },
        u = (m, p, f) => {
          if (!m) return p;
          let T = l(m.semver, p.semver, f);
          return T > 0 ? m : T < 0 || (p.operator === ">" && m.operator === ">=") ? p : m;
        },
        c = (m, p, f) => {
          if (!m) return p;
          let T = l(m.semver, p.semver, f);
          return T < 0 ? m : T > 0 || (p.operator === "<" && m.operator === "<=") ? p : m;
        };
      t.exports = h;
    },
  }),
  ut = L({
    "../../node_modules/semver/index.js"(e, t) {
      var r = ae(),
        n = he(),
        o = U(),
        a = Je(),
        l = Z(),
        h = Fr(),
        s = qr(),
        i = Gr(),
        I = Mr(),
        u = Xr(),
        c = Vr(),
        m = Yr(),
        p = Wr(),
        f = M(),
        T = Hr(),
        N = Br(),
        S = Pe(),
        x = Kr(),
        G = zr(),
        D = fe(),
        W = je(),
        k = Qe(),
        P = er(),
        j = be(),
        w = Ue(),
        J = rr(),
        Re = Zr(),
        ge = Ee(),
        Ie = X(),
        $e = ve(),
        E = Qr(),
        d = et(),
        g = rt(),
        v = tt(),
        $ = st(),
        R = ke(),
        _ = nt(),
        y = at(),
        O = it(),
        A = ot(),
        C = lt();
      t.exports = {
        parse: l,
        valid: h,
        clean: s,
        inc: i,
        diff: I,
        major: u,
        minor: c,
        patch: m,
        prerelease: p,
        compare: f,
        rcompare: T,
        compareLoose: N,
        compareBuild: S,
        sort: x,
        rsort: G,
        gt: D,
        lt: W,
        eq: k,
        neq: P,
        gte: j,
        lte: w,
        cmp: J,
        coerce: Re,
        Comparator: ge,
        Range: Ie,
        satisfies: $e,
        toComparators: E,
        maxSatisfying: d,
        minSatisfying: g,
        minVersion: v,
        validRange: $,
        outside: R,
        gtr: _,
        ltr: y,
        intersects: O,
        simplifyRange: A,
        subset: C,
        SemVer: o,
        re: r.re,
        src: r.src,
        tokens: r.t,
        SEMVER_SPEC_VERSION: n.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: n.RELEASE_TYPES,
        compareIdentifiers: a.compareIdentifiers,
        rcompareIdentifiers: a.rcompareIdentifiers,
      };
    },
  }),
  pt = {};
sr(pt, { decorators: () => vt, mount: () => ft, parameters: () => Et, render: () => ct, renderToCanvas: () => dt });
var Me = nr(ut()),
  ct = (e, t) => {
    let { id: r, component: n } = t;
    if (!n)
      throw new Error(`Unable to render story ${r} as the component annotation is missing from the default export`);
    return re.createElement(n, { ...e });
  };
function mt() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var { FRAMEWORK_OPTIONS: Ne } = kr,
  ht = class extends Y.Component {
    constructor() {
      super(...arguments), (this.state = { hasError: !1 });
    }
    static getDerivedStateFromError() {
      return { hasError: !0 };
    }
    componentDidMount() {
      let { hasError: e } = this.state,
        { showMain: t } = this.props;
      e || t();
    }
    componentDidCatch(e) {
      let { showException: t } = this.props;
      t(e);
    }
    render() {
      let { hasError: e } = this.state,
        { children: t } = this.props;
      return e ? null : t;
    }
  },
  Xe = Ne != null && Ne.strictMode ? Y.StrictMode : Y.Fragment;
async function dt({ storyContext: e, unboundStoryFn: t, showMain: r, showException: n, forceRemount: o }, a) {
  var u, c;
  let { renderElement: l, unmountElement: h } = await tr(
      async () => {
        const { renderElement: m, unmountElement: p } = await import("./react-18-BWhC85Cb.js");
        return { renderElement: m, unmountElement: p };
      },
      __vite__mapDeps([0, 1, 2]),
      import.meta.url
    ),
    s = t,
    i = mt()
      ? re.createElement(s, { ...e })
      : re.createElement(ht, { showMain: r, showException: n }, re.createElement(s, { ...e })),
    I = Xe ? re.createElement(Xe, null, i) : i;
  return (
    o && h(a),
    await l(
      I,
      a,
      (c = (u = e == null ? void 0 : e.parameters) == null ? void 0 : u.react) == null ? void 0 : c.rootOptions
    ),
    () => h(a)
  );
}
var ft = (e) => async (t) => (t != null && (e.originalStoryFn = () => t), await e.renderToCanvas(), e.canvas),
  Et = { renderer: "react" },
  vt = [
    (e, t) => {
      var o, a;
      if (!((a = (o = t.parameters) == null ? void 0 : o.react) != null && a.rsc)) return Y.createElement(e, null);
      let r = Me.default.major(Y.version),
        n = Me.default.minor(Y.version);
      if (r < 18 || (r === 18 && n < 3)) throw new Error("React Server Components require React >= 18.3");
      return Y.createElement(Y.Suspense, null, Y.createElement(e, null));
    },
  ];
export { vt as decorators, ft as mount, Et as parameters, ct as render, dt as renderToCanvas };
