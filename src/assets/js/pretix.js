(function (siteglobals) {
  var module = {},
    exports = {};
  var lang = "en";

  (function (globals) {
    var django = globals.django || (globals.django = {});

    django.pluralidx = function (count) {
      return count == 1 ? 0 : 1;
    };

    /* gettext library */

    django.catalog = django.catalog || {};

    if (!django.jsi18n_initialized) {
      django.gettext = function (msgid) {
        var value = django.catalog[msgid];
        if (typeof value == "undefined") {
          return msgid;
        } else {
          return typeof value == "string" ? value : value[0];
        }
      };

      django.ngettext = function (singular, plural, count) {
        var value = django.catalog[singular];
        if (typeof value == "undefined") {
          return count == 1 ? singular : plural;
        } else {
          return value.constructor === Array
            ? value[django.pluralidx(count)]
            : value;
        }
      };

      django.gettext_noop = function (msgid) {
        return msgid;
      };

      django.pgettext = function (context, msgid) {
        var value = django.gettext(context + "\x04" + msgid);
        if (value.indexOf("\x04") != -1) {
          value = msgid;
        }
        return value;
      };

      django.npgettext = function (context, singular, plural, count) {
        var value = django.ngettext(
          context + "\x04" + singular,
          context + "\x04" + plural,
          count
        );
        if (value.indexOf("\x04") != -1) {
          value = django.ngettext(singular, plural, count);
        }
        return value;
      };

      django.interpolate = function (fmt, obj, named) {
        if (named) {
          return fmt.replace(/%\(\w+\)s/g, function (match) {
            return String(obj[match.slice(2, -2)]);
          });
        } else {
          return fmt.replace(/%s/g, function (match) {
            return String(obj.shift());
          });
        }
      };

      /* formatting library */

      django.formats = {
        DATETIME_FORMAT: "N j, Y, P",
        DATETIME_INPUT_FORMATS: [
          "%Y-%m-%d %H:%M:%S",
          "%Y-%m-%d %H:%M:%S.%f",
          "%Y-%m-%d %H:%M",
          "%Y-%m-%d",
          "%m/%d/%Y %H:%M:%S",
          "%m/%d/%Y %H:%M:%S.%f",
          "%m/%d/%Y %H:%M",
          "%m/%d/%Y",
          "%m/%d/%y %H:%M:%S",
          "%m/%d/%y %H:%M:%S.%f",
          "%m/%d/%y %H:%M",
          "%m/%d/%y",
        ],
        DATE_FORMAT: "N j, Y",
        DATE_INPUT_FORMATS: ["%Y-%m-%d", "%m/%d/%Y", "%m/%d/%y"],
        DECIMAL_SEPARATOR: ".",
        FIRST_DAY_OF_WEEK: 0,
        MONTH_DAY_FORMAT: "F j",
        NUMBER_GROUPING: 3,
        SHORT_DATETIME_FORMAT: "Y-m-d H:i",
        SHORT_DATE_FORMAT: "Y-m-d",
        THOUSAND_SEPARATOR: ",",
        TIME_FORMAT: "H:i",
        TIME_INPUT_FORMATS: ["%H:%M:%S", "%H:%M:%S.%f", "%H:%M"],
        YEAR_MONTH_FORMAT: "F Y",
      };

      django.get_format = function (format_type) {
        var value = django.formats[format_type];
        if (typeof value == "undefined") {
          return format_type;
        } else {
          return value;
        }
      };

      /* add to global namespace */
      globals.pluralidx = django.pluralidx;
      globals.gettext = django.gettext;
      globals.ngettext = django.ngettext;
      globals.gettext_noop = django.gettext_noop;
      globals.pgettext = django.pgettext;
      globals.npgettext = django.npgettext;
      globals.interpolate = django.interpolate;
      globals.get_format = django.get_format;

      django.jsi18n_initialized = true;
    }
  })(this);

  /*!
   * Vue.js v2.4.0
   * (c) 2014-2017 Evan You
   * Released under the MIT License.
   */
  !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.Vue = e());
  })(this, function () {
    "use strict";
    function t(t) {
      return void 0 === t || null === t;
    }
    function e(t) {
      return void 0 !== t && null !== t;
    }
    function n(t) {
      return !0 === t;
    }
    function r(t) {
      return !1 === t;
    }
    function i(t) {
      return "string" == typeof t || "number" == typeof t;
    }
    function o(t) {
      return null !== t && "object" == typeof t;
    }
    function a(t) {
      return "[object Object]" === di.call(t);
    }
    function s(t) {
      return "[object RegExp]" === di.call(t);
    }
    function c(t) {
      var e = parseFloat(t);
      return e >= 0 && Math.floor(e) === e && isFinite(t);
    }
    function u(t) {
      return null == t
        ? ""
        : "object" == typeof t
        ? JSON.stringify(t, null, 2)
        : String(t);
    }
    function l(t) {
      var e = parseFloat(t);
      return isNaN(e) ? t : e;
    }
    function f(t, e) {
      for (
        var n = Object.create(null), r = t.split(","), i = 0;
        i < r.length;
        i++
      )
        n[r[i]] = !0;
      return e
        ? function (t) {
            return n[t.toLowerCase()];
          }
        : function (t) {
            return n[t];
          };
    }
    function p(t, e) {
      if (t.length) {
        var n = t.indexOf(e);
        if (n > -1) return t.splice(n, 1);
      }
    }
    function d(t, e) {
      return mi.call(t, e);
    }
    function v(t) {
      var e = Object.create(null);
      return function (n) {
        return e[n] || (e[n] = t(n));
      };
    }
    function h(t, e) {
      function n(n) {
        var r = arguments.length;
        return r ? (r > 1 ? t.apply(e, arguments) : t.call(e, n)) : t.call(e);
      }
      return (n._length = t.length), n;
    }
    function m(t, e) {
      e = e || 0;
      for (var n = t.length - e, r = new Array(n); n--; ) r[n] = t[n + e];
      return r;
    }
    function y(t, e) {
      for (var n in e) t[n] = e[n];
      return t;
    }
    function g(t) {
      for (var e = {}, n = 0; n < t.length; n++) t[n] && y(e, t[n]);
      return e;
    }
    function _(t, e, n) {}
    function b(t, e) {
      var n = o(t),
        r = o(e);
      if (!n || !r) return !n && !r && String(t) === String(e);
      try {
        return JSON.stringify(t) === JSON.stringify(e);
      } catch (n) {
        return t === e;
      }
    }
    function $(t, e) {
      for (var n = 0; n < t.length; n++) if (b(t[n], e)) return n;
      return -1;
    }
    function C(t) {
      var e = !1;
      return function () {
        e || ((e = !0), t.apply(this, arguments));
      };
    }
    function w(t) {
      var e = (t + "").charCodeAt(0);
      return 36 === e || 95 === e;
    }
    function x(t, e, n, r) {
      Object.defineProperty(t, e, {
        value: n,
        enumerable: !!r,
        writable: !0,
        configurable: !0,
      });
    }
    function A(t) {
      if (!Ti.test(t)) {
        var e = t.split(".");
        return function (t) {
          for (var n = 0; n < e.length; n++) {
            if (!t) return;
            t = t[e[n]];
          }
          return t;
        };
      }
    }
    function k(t, e, n) {
      if (Oi.errorHandler) Oi.errorHandler.call(null, t, e, n);
      else {
        if (!Ni || "undefined" == typeof console) throw t;
        console.error(t);
      }
    }
    function O(t) {
      return "function" == typeof t && /native code/.test(t.toString());
    }
    function S(t) {
      Zi.target && Yi.push(Zi.target), (Zi.target = t);
    }
    function T() {
      Zi.target = Yi.pop();
    }
    function E(t, e, n) {
      t.__proto__ = e;
    }
    function j(t, e, n) {
      for (var r = 0, i = n.length; r < i; r++) {
        var o = n[r];
        x(t, o, e[o]);
      }
    }
    function N(t, e) {
      if (o(t)) {
        var n;
        return (
          d(t, "__ob__") && t.__ob__ instanceof no
            ? (n = t.__ob__)
            : eo.shouldConvert &&
              !Ki() &&
              (Array.isArray(t) || a(t)) &&
              Object.isExtensible(t) &&
              !t._isVue &&
              (n = new no(t)),
          e && n && n.vmCount++,
          n
        );
      }
    }
    function L(t, e, n, r, i) {
      var o = new Zi(),
        a = Object.getOwnPropertyDescriptor(t, e);
      if (!a || !1 !== a.configurable) {
        var s = a && a.get,
          c = a && a.set,
          u = !i && N(n);
        Object.defineProperty(t, e, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            var e = s ? s.call(t) : n;
            return (
              Zi.target &&
                (o.depend(), u && u.dep.depend(), Array.isArray(e) && D(e)),
              e
            );
          },
          set: function (e) {
            var r = s ? s.call(t) : n;
            e === r ||
              (e !== e && r !== r) ||
              (c ? c.call(t, e) : (n = e), (u = !i && N(e)), o.notify());
          },
        });
      }
    }
    function I(t, e, n) {
      if (Array.isArray(t) && c(e))
        return (t.length = Math.max(t.length, e)), t.splice(e, 1, n), n;
      if (d(t, e)) return (t[e] = n), n;
      var r = t.__ob__;
      return t._isVue || (r && r.vmCount)
        ? n
        : r
        ? (L(r.value, e, n), r.dep.notify(), n)
        : ((t[e] = n), n);
    }
    function M(t, e) {
      if (Array.isArray(t) && c(e)) t.splice(e, 1);
      else {
        var n = t.__ob__;
        t._isVue ||
          (n && n.vmCount) ||
          (d(t, e) && (delete t[e], n && n.dep.notify()));
      }
    }
    function D(t) {
      for (var e = void 0, n = 0, r = t.length; n < r; n++)
        (e = t[n]) && e.__ob__ && e.__ob__.dep.depend(),
          Array.isArray(e) && D(e);
    }
    function P(t, e) {
      if (!e) return t;
      for (var n, r, i, o = Object.keys(e), s = 0; s < o.length; s++)
        (r = t[(n = o[s])]),
          (i = e[n]),
          d(t, n) ? a(r) && a(i) && P(r, i) : I(t, n, i);
      return t;
    }
    function F(t, e, n) {
      return n
        ? t || e
          ? function () {
              var r = "function" == typeof e ? e.call(n) : e,
                i = "function" == typeof t ? t.call(n) : void 0;
              return r ? P(r, i) : i;
            }
          : void 0
        : e
        ? t
          ? function () {
              return P("function" == typeof e ? e.call(this) : e, t.call(this));
            }
          : e
        : t;
    }
    function R(t, e) {
      return e ? (t ? t.concat(e) : Array.isArray(e) ? e : [e]) : t;
    }
    function H(t, e) {
      var n = Object.create(t || null);
      return e ? y(n, e) : n;
    }
    function B(t) {
      var e = t.props;
      if (e) {
        var n,
          r,
          i = {};
        if (Array.isArray(e))
          for (n = e.length; n--; )
            "string" == typeof (r = e[n]) && (i[gi(r)] = { type: null });
        else if (a(e))
          for (var o in e) (r = e[o]), (i[gi(o)] = a(r) ? r : { type: r });
        t.props = i;
      }
    }
    function U(t) {
      var e = t.inject;
      if (Array.isArray(e))
        for (var n = (t.inject = {}), r = 0; r < e.length; r++) n[e[r]] = e[r];
    }
    function V(t) {
      var e = t.directives;
      if (e)
        for (var n in e) {
          var r = e[n];
          "function" == typeof r && (e[n] = { bind: r, update: r });
        }
    }
    function z(t, e, n) {
      function r(r) {
        var i = ro[r] || io;
        c[r] = i(t[r], e[r], n, r);
      }
      "function" == typeof e && (e = e.options), B(e), U(e), V(e);
      var i = e.extends;
      if ((i && (t = z(t, i, n)), e.mixins))
        for (var o = 0, a = e.mixins.length; o < a; o++)
          t = z(t, e.mixins[o], n);
      var s,
        c = {};
      for (s in t) r(s);
      for (s in e) d(t, s) || r(s);
      return c;
    }
    function K(t, e, n, r) {
      if ("string" == typeof n) {
        var i = t[e];
        if (d(i, n)) return i[n];
        var o = gi(n);
        if (d(i, o)) return i[o];
        var a = _i(o);
        if (d(i, a)) return i[a];
        var s = i[n] || i[o] || i[a];
        return s;
      }
    }
    function J(t, e, n, r) {
      var i = e[t],
        o = !d(n, t),
        a = n[t];
      if (
        (G(Boolean, i.type) &&
          (o && !d(i, "default")
            ? (a = !1)
            : G(String, i.type) || ("" !== a && a !== $i(t)) || (a = !0)),
        void 0 === a)
      ) {
        a = q(r, i, t);
        var s = eo.shouldConvert;
        (eo.shouldConvert = !0), N(a), (eo.shouldConvert = s);
      }
      return a;
    }
    function q(t, e, n) {
      if (d(e, "default")) {
        var r = e.default;
        return t &&
          t.$options.propsData &&
          void 0 === t.$options.propsData[n] &&
          void 0 !== t._props[n]
          ? t._props[n]
          : "function" == typeof r && "Function" !== W(e.type)
          ? r.call(t)
          : r;
      }
    }
    function W(t) {
      var e = t && t.toString().match(/^\s*function (\w+)/);
      return e ? e[1] : "";
    }
    function G(t, e) {
      if (!Array.isArray(e)) return W(e) === W(t);
      for (var n = 0, r = e.length; n < r; n++) if (W(e[n]) === W(t)) return !0;
      return !1;
    }
    function Z(t) {
      return new oo(void 0, void 0, void 0, String(t));
    }
    function Y(t) {
      var e = new oo(
        t.tag,
        t.data,
        t.children,
        t.text,
        t.elm,
        t.context,
        t.componentOptions,
        t.asyncFactory
      );
      return (
        (e.ns = t.ns),
        (e.isStatic = t.isStatic),
        (e.key = t.key),
        (e.isComment = t.isComment),
        (e.isCloned = !0),
        e
      );
    }
    function Q(t) {
      for (var e = t.length, n = new Array(e), r = 0; r < e; r++)
        n[r] = Y(t[r]);
      return n;
    }
    function X(t) {
      function e() {
        var t = arguments,
          n = e.fns;
        if (!Array.isArray(n)) return n.apply(null, arguments);
        for (var r = n.slice(), i = 0; i < r.length; i++) r[i].apply(null, t);
      }
      return (e.fns = t), e;
    }
    function tt(e, n, r, i, o) {
      var a, s, c, u;
      for (a in e)
        (s = e[a]),
          (c = n[a]),
          (u = uo(a)),
          t(s) ||
            (t(c)
              ? (t(s.fns) && (s = e[a] = X(s)),
                r(u.name, s, u.once, u.capture, u.passive))
              : s !== c && ((c.fns = s), (e[a] = c)));
      for (a in n) t(e[a]) && i((u = uo(a)).name, n[a], u.capture);
    }
    function et(r, i, o) {
      function a() {
        o.apply(this, arguments), p(s.fns, a);
      }
      var s,
        c = r[i];
      t(c)
        ? (s = X([a]))
        : e(c.fns) && n(c.merged)
        ? (s = c).fns.push(a)
        : (s = X([c, a])),
        (s.merged = !0),
        (r[i] = s);
    }
    function nt(n, r, i) {
      var o = r.options.props;
      if (!t(o)) {
        var a = {},
          s = n.attrs,
          c = n.props;
        if (e(s) || e(c))
          for (var u in o) {
            var l = $i(u);
            rt(a, c, u, l, !0) || rt(a, s, u, l, !1);
          }
        return a;
      }
    }
    function rt(t, n, r, i, o) {
      if (e(n)) {
        if (d(n, r)) return (t[r] = n[r]), o || delete n[r], !0;
        if (d(n, i)) return (t[r] = n[i]), o || delete n[i], !0;
      }
      return !1;
    }
    function it(t) {
      for (var e = 0; e < t.length; e++)
        if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);
      return t;
    }
    function ot(t) {
      return i(t) ? [Z(t)] : Array.isArray(t) ? st(t) : void 0;
    }
    function at(t) {
      return e(t) && e(t.text) && r(t.isComment);
    }
    function st(r, o) {
      var a,
        s,
        c,
        u = [];
      for (a = 0; a < r.length; a++)
        t((s = r[a])) ||
          "boolean" == typeof s ||
          ((c = u[u.length - 1]),
          Array.isArray(s)
            ? u.push.apply(u, st(s, (o || "") + "_" + a))
            : i(s)
            ? at(c)
              ? (c.text += String(s))
              : "" !== s && u.push(Z(s))
            : at(s) && at(c)
            ? (u[u.length - 1] = Z(c.text + s.text))
            : (n(r._isVList) &&
                e(s.tag) &&
                t(s.key) &&
                e(o) &&
                (s.key = "__vlist" + o + "_" + a + "__"),
              u.push(s)));
      return u;
    }
    function ct(t, e) {
      return (
        t.__esModule && t.default && (t = t.default), o(t) ? e.extend(t) : t
      );
    }
    function ut(t, e, n, r, i) {
      var o = co();
      return (
        (o.asyncFactory = t),
        (o.asyncMeta = { data: e, context: n, children: r, tag: i }),
        o
      );
    }
    function lt(r, i, a) {
      if (n(r.error) && e(r.errorComp)) return r.errorComp;
      if (e(r.resolved)) return r.resolved;
      if (n(r.loading) && e(r.loadingComp)) return r.loadingComp;
      if (!e(r.contexts)) {
        var s = (r.contexts = [a]),
          c = !0,
          u = function () {
            for (var t = 0, e = s.length; t < e; t++) s[t].$forceUpdate();
          },
          l = C(function (t) {
            (r.resolved = ct(t, i)), c || u();
          }),
          f = C(function (t) {
            e(r.errorComp) && ((r.error = !0), u());
          }),
          p = r(l, f);
        return (
          o(p) &&
            ("function" == typeof p.then
              ? t(r.resolved) && p.then(l, f)
              : e(p.component) &&
                "function" == typeof p.component.then &&
                (p.component.then(l, f),
                e(p.error) && (r.errorComp = ct(p.error, i)),
                e(p.loading) &&
                  ((r.loadingComp = ct(p.loading, i)),
                  0 === p.delay
                    ? (r.loading = !0)
                    : setTimeout(function () {
                        t(r.resolved) && t(r.error) && ((r.loading = !0), u());
                      }, p.delay || 200)),
                e(p.timeout) &&
                  setTimeout(function () {
                    t(r.resolved) && f(null);
                  }, p.timeout))),
          (c = !1),
          r.loading ? r.loadingComp : r.resolved
        );
      }
      r.contexts.push(a);
    }
    function ft(t) {
      if (Array.isArray(t))
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          if (e(r) && e(r.componentOptions)) return r;
        }
    }
    function pt(t) {
      (t._events = Object.create(null)), (t._hasHookEvent = !1);
      var e = t.$options._parentListeners;
      e && ht(t, e);
    }
    function dt(t, e, n) {
      n ? so.$once(t, e) : so.$on(t, e);
    }
    function vt(t, e) {
      so.$off(t, e);
    }
    function ht(t, e, n) {
      (so = t), tt(e, n || {}, dt, vt, t);
    }
    function mt(t, e) {
      var n = {};
      if (!t) return n;
      for (var r = [], i = 0, o = t.length; i < o; i++) {
        var a = t[i];
        if (
          (a.context !== e && a.functionalContext !== e) ||
          !a.data ||
          null == a.data.slot
        )
          r.push(a);
        else {
          var s = a.data.slot,
            c = n[s] || (n[s] = []);
          "template" === a.tag ? c.push.apply(c, a.children) : c.push(a);
        }
      }
      return r.every(yt) || (n.default = r), n;
    }
    function yt(t) {
      return t.isComment || " " === t.text;
    }
    function gt(t, e) {
      e = e || {};
      for (var n = 0; n < t.length; n++)
        Array.isArray(t[n]) ? gt(t[n], e) : (e[t[n].key] = t[n].fn);
      return e;
    }
    function _t(t) {
      var e = t.$options,
        n = e.parent;
      if (n && !e.abstract) {
        for (; n.$options.abstract && n.$parent; ) n = n.$parent;
        n.$children.push(t);
      }
      (t.$parent = n),
        (t.$root = n ? n.$root : t),
        (t.$children = []),
        (t.$refs = {}),
        (t._watcher = null),
        (t._inactive = null),
        (t._directInactive = !1),
        (t._isMounted = !1),
        (t._isDestroyed = !1),
        (t._isBeingDestroyed = !1);
    }
    function bt(t, e, n) {
      (t.$el = e),
        t.$options.render || (t.$options.render = co),
        At(t, "beforeMount");
      var r;
      return (
        (r = function () {
          t._update(t._render(), n);
        }),
        (t._watcher = new _o(t, r, _)),
        (n = !1),
        null == t.$vnode && ((t._isMounted = !0), At(t, "mounted")),
        t
      );
    }
    function $t(t, e, n, r, i) {
      var o = !!(
        i ||
        t.$options._renderChildren ||
        r.data.scopedSlots ||
        t.$scopedSlots !== Si
      );
      if (
        ((t.$options._parentVnode = r),
        (t.$vnode = r),
        t._vnode && (t._vnode.parent = r),
        (t.$options._renderChildren = i),
        (t.$attrs = r.data && r.data.attrs),
        (t.$listeners = n),
        e && t.$options.props)
      ) {
        eo.shouldConvert = !1;
        for (
          var a = t._props, s = t.$options._propKeys || [], c = 0;
          c < s.length;
          c++
        ) {
          var u = s[c];
          a[u] = J(u, t.$options.props, e, t);
        }
        (eo.shouldConvert = !0), (t.$options.propsData = e);
      }
      if (n) {
        var l = t.$options._parentListeners;
        (t.$options._parentListeners = n), ht(t, n, l);
      }
      o && ((t.$slots = mt(i, r.context)), t.$forceUpdate());
    }
    function Ct(t) {
      for (; t && (t = t.$parent); ) if (t._inactive) return !0;
      return !1;
    }
    function wt(t, e) {
      if (e) {
        if (((t._directInactive = !1), Ct(t))) return;
      } else if (t._directInactive) return;
      if (t._inactive || null === t._inactive) {
        t._inactive = !1;
        for (var n = 0; n < t.$children.length; n++) wt(t.$children[n]);
        At(t, "activated");
      }
    }
    function xt(t, e) {
      if (!((e && ((t._directInactive = !0), Ct(t))) || t._inactive)) {
        t._inactive = !0;
        for (var n = 0; n < t.$children.length; n++) xt(t.$children[n]);
        At(t, "deactivated");
      }
    }
    function At(t, e) {
      var n = t.$options[e];
      if (n)
        for (var r = 0, i = n.length; r < i; r++)
          try {
            n[r].call(t);
          } catch (n) {
            k(n, t, e + " hook");
          }
      t._hasHookEvent && t.$emit("hook:" + e);
    }
    function kt() {
      (yo = fo.length = po.length = 0), (vo = {}), (ho = mo = !1);
    }
    function Ot() {
      mo = !0;
      var t, e;
      for (
        fo.sort(function (t, e) {
          return t.id - e.id;
        }),
          yo = 0;
        yo < fo.length;
        yo++
      )
        (e = (t = fo[yo]).id), (vo[e] = null), t.run();
      var n = po.slice(),
        r = fo.slice();
      kt(), Et(n), St(r), Ji && Oi.devtools && Ji.emit("flush");
    }
    function St(t) {
      for (var e = t.length; e--; ) {
        var n = t[e],
          r = n.vm;
        r._watcher === n && r._isMounted && At(r, "updated");
      }
    }
    function Tt(t) {
      (t._inactive = !1), po.push(t);
    }
    function Et(t) {
      for (var e = 0; e < t.length; e++) (t[e]._inactive = !0), wt(t[e], !0);
    }
    function jt(t) {
      var e = t.id;
      if (null == vo[e]) {
        if (((vo[e] = !0), mo)) {
          for (var n = fo.length - 1; n > yo && fo[n].id > t.id; ) n--;
          fo.splice(n + 1, 0, t);
        } else fo.push(t);
        ho || ((ho = !0), Wi(Ot));
      }
    }
    function Nt(t) {
      bo.clear(), Lt(t, bo);
    }
    function Lt(t, e) {
      var n,
        r,
        i = Array.isArray(t);
      if ((i || o(t)) && Object.isExtensible(t)) {
        if (t.__ob__) {
          var a = t.__ob__.dep.id;
          if (e.has(a)) return;
          e.add(a);
        }
        if (i) for (n = t.length; n--; ) Lt(t[n], e);
        else for (n = (r = Object.keys(t)).length; n--; ) Lt(t[r[n]], e);
      }
    }
    function It(t, e, n) {
      ($o.get = function () {
        return this[e][n];
      }),
        ($o.set = function (t) {
          this[e][n] = t;
        }),
        Object.defineProperty(t, n, $o);
    }
    function Mt(t) {
      t._watchers = [];
      var e = t.$options;
      e.props && Dt(t, e.props),
        e.methods && Ut(t, e.methods),
        e.data ? Pt(t) : N((t._data = {}), !0),
        e.computed && Rt(t, e.computed),
        e.watch && e.watch !== Hi && Vt(t, e.watch);
    }
    function Dt(t, e) {
      var n = t.$options.propsData || {},
        r = (t._props = {}),
        i = (t.$options._propKeys = []),
        o = !t.$parent;
      eo.shouldConvert = o;
      for (var a in e)
        !(function (o) {
          i.push(o);
          var a = J(o, e, n, t);
          L(r, o, a), o in t || It(t, "_props", o);
        })(a);
      eo.shouldConvert = !0;
    }
    function Pt(t) {
      var e = t.$options.data;
      a((e = t._data = "function" == typeof e ? Ft(e, t) : e || {})) ||
        (e = {});
      for (
        var n = Object.keys(e),
          r = t.$options.props,
          i = (t.$options.methods, n.length);
        i--;

      ) {
        var o = n[i];
        (r && d(r, o)) || w(o) || It(t, "_data", o);
      }
      N(e, !0);
    }
    function Ft(t, e) {
      try {
        return t.call(e);
      } catch (t) {
        return k(t, e, "data()"), {};
      }
    }
    function Rt(t, e) {
      var n = (t._computedWatchers = Object.create(null));
      for (var r in e) {
        var i = e[r],
          o = "function" == typeof i ? i : i.get;
        (n[r] = new _o(t, o, _, Co)), r in t || Ht(t, r, i);
      }
    }
    function Ht(t, e, n) {
      "function" == typeof n
        ? (($o.get = Bt(e)), ($o.set = _))
        : (($o.get = n.get ? (!1 !== n.cache ? Bt(e) : n.get) : _),
          ($o.set = n.set ? n.set : _)),
        Object.defineProperty(t, e, $o);
    }
    function Bt(t) {
      return function () {
        var e = this._computedWatchers && this._computedWatchers[t];
        if (e) return e.dirty && e.evaluate(), Zi.target && e.depend(), e.value;
      };
    }
    function Ut(t, e) {
      t.$options.props;
      for (var n in e) t[n] = null == e[n] ? _ : h(e[n], t);
    }
    function Vt(t, e) {
      for (var n in e) {
        var r = e[n];
        if (Array.isArray(r)) for (var i = 0; i < r.length; i++) zt(t, n, r[i]);
        else zt(t, n, r);
      }
    }
    function zt(t, e, n, r) {
      return (
        a(n) && ((r = n), (n = n.handler)),
        "string" == typeof n && (n = t[n]),
        t.$watch(e, n, r)
      );
    }
    function Kt(t) {
      var e = t.$options.provide;
      e && (t._provided = "function" == typeof e ? e.call(t) : e);
    }
    function Jt(t) {
      var e = qt(t.$options.inject, t);
      e &&
        ((eo.shouldConvert = !1),
        Object.keys(e).forEach(function (n) {
          L(t, n, e[n]);
        }),
        (eo.shouldConvert = !0));
    }
    function qt(t, e) {
      if (t) {
        for (
          var n = Object.create(null),
            r = qi ? Reflect.ownKeys(t) : Object.keys(t),
            i = 0;
          i < r.length;
          i++
        )
          for (var o = r[i], a = t[o], s = e; s; ) {
            if (s._provided && a in s._provided) {
              n[o] = s._provided[a];
              break;
            }
            s = s.$parent;
          }
        return n;
      }
    }
    function Wt(t, n, r, i, o) {
      var a = {},
        s = t.options.props;
      if (e(s)) for (var c in s) a[c] = J(c, s, n || {});
      else e(r.attrs) && Gt(a, r.attrs), e(r.props) && Gt(a, r.props);
      var u = Object.create(i),
        l = t.options.render.call(
          null,
          function (t, e, n, r) {
            return ee(u, t, e, n, r, !0);
          },
          {
            data: r,
            props: a,
            children: o,
            parent: i,
            listeners: r.on || {},
            injections: qt(t.options.inject, i),
            slots: function () {
              return mt(o, i);
            },
          }
        );
      return (
        l instanceof oo &&
          ((l.functionalContext = i),
          (l.functionalOptions = t.options),
          r.slot && ((l.data || (l.data = {})).slot = r.slot)),
        l
      );
    }
    function Gt(t, e) {
      for (var n in e) t[gi(n)] = e[n];
    }
    function Zt(r, i, a, s, c) {
      if (!t(r)) {
        var u = a.$options._base;
        if ((o(r) && (r = u.extend(r)), "function" == typeof r)) {
          var l;
          if (t(r.cid) && ((l = r), void 0 === (r = lt(l, u, a))))
            return ut(l, i, a, s, c);
          (i = i || {}), me(r), e(i.model) && te(r.options, i);
          var f = nt(i, r, c);
          if (n(r.options.functional)) return Wt(r, f, i, a, s);
          var p = i.on;
          if (n(r.options.abstract)) {
            var d = i.slot;
            (i = {}), d && (i.slot = d);
          }
          Qt(i);
          var v = r.options.name || c;
          return new oo(
            "vue-component-" + r.cid + (v ? "-" + v : ""),
            i,
            void 0,
            void 0,
            void 0,
            a,
            { Ctor: r, propsData: f, listeners: p, tag: c, children: s },
            l
          );
        }
      }
    }
    function Yt(t, n, r, i) {
      var o = t.componentOptions,
        a = {
          _isComponent: !0,
          parent: n,
          propsData: o.propsData,
          _componentTag: o.tag,
          _parentVnode: t,
          _parentListeners: o.listeners,
          _renderChildren: o.children,
          _parentElm: r || null,
          _refElm: i || null,
        },
        s = t.data.inlineTemplate;
      return (
        e(s) &&
          ((a.render = s.render), (a.staticRenderFns = s.staticRenderFns)),
        new o.Ctor(a)
      );
    }
    function Qt(t) {
      t.hook || (t.hook = {});
      for (var e = 0; e < xo.length; e++) {
        var n = xo[e],
          r = t.hook[n],
          i = wo[n];
        t.hook[n] = r ? Xt(i, r) : i;
      }
    }
    function Xt(t, e) {
      return function (n, r, i, o) {
        t(n, r, i, o), e(n, r, i, o);
      };
    }
    function te(t, n) {
      var r = (t.model && t.model.prop) || "value",
        i = (t.model && t.model.event) || "input";
      (n.props || (n.props = {}))[r] = n.model.value;
      var o = n.on || (n.on = {});
      e(o[i])
        ? (o[i] = [n.model.callback].concat(o[i]))
        : (o[i] = n.model.callback);
    }
    function ee(t, e, r, o, a, s) {
      return (
        (Array.isArray(r) || i(r)) && ((a = o), (o = r), (r = void 0)),
        n(s) && (a = ko),
        ne(t, e, r, o, a)
      );
    }
    function ne(t, n, r, i, o) {
      if (e(r) && e(r.__ob__)) return co();
      if ((e(r) && e(r.is) && (n = r.is), !n)) return co();
      Array.isArray(i) &&
        "function" == typeof i[0] &&
        (((r = r || {}).scopedSlots = { default: i[0] }), (i.length = 0)),
        o === ko ? (i = ot(i)) : o === Ao && (i = it(i));
      var a, s;
      if ("string" == typeof n) {
        var c;
        (s = Oi.getTagNamespace(n)),
          (a = Oi.isReservedTag(n)
            ? new oo(Oi.parsePlatformTagName(n), r, i, void 0, void 0, t)
            : e((c = K(t.$options, "components", n)))
            ? Zt(c, r, t, i, n)
            : new oo(n, r, i, void 0, void 0, t));
      } else a = Zt(n, r, t, i);
      return e(a) ? (s && re(a, s), a) : co();
    }
    function re(n, r) {
      if (((n.ns = r), "foreignObject" !== n.tag && e(n.children)))
        for (var i = 0, o = n.children.length; i < o; i++) {
          var a = n.children[i];
          e(a.tag) && t(a.ns) && re(a, r);
        }
    }
    function ie(t, n) {
      var r, i, a, s, c;
      if (Array.isArray(t) || "string" == typeof t)
        for (r = new Array(t.length), i = 0, a = t.length; i < a; i++)
          r[i] = n(t[i], i);
      else if ("number" == typeof t)
        for (r = new Array(t), i = 0; i < t; i++) r[i] = n(i + 1, i);
      else if (o(t))
        for (
          s = Object.keys(t), r = new Array(s.length), i = 0, a = s.length;
          i < a;
          i++
        )
          (c = s[i]), (r[i] = n(t[c], c, i));
      return e(r) && (r._isVList = !0), r;
    }
    function oe(t, e, n, r) {
      var i = this.$scopedSlots[t];
      if (i) return (n = n || {}), r && (n = y(y({}, r), n)), i(n) || e;
      var o = this.$slots[t];
      return o || e;
    }
    function ae(t) {
      return K(this.$options, "filters", t, !0) || wi;
    }
    function se(t, e, n) {
      var r = Oi.keyCodes[e] || n;
      return Array.isArray(r) ? -1 === r.indexOf(t) : r !== t;
    }
    function ce(t, e, n, r, i) {
      if (n)
        if (o(n)) {
          Array.isArray(n) && (n = g(n));
          var a;
          for (var s in n)
            !(function (o) {
              if ("class" === o || "style" === o || hi(o)) a = t;
              else {
                var s = t.attrs && t.attrs.type;
                a =
                  r || Oi.mustUseProp(e, s, o)
                    ? t.domProps || (t.domProps = {})
                    : t.attrs || (t.attrs = {});
              }
              o in a ||
                ((a[o] = n[o]),
                i &&
                  ((t.on || (t.on = {}))["update:" + o] = function (t) {
                    n[o] = t;
                  }));
            })(s);
        } else;
      return t;
    }
    function ue(t, e) {
      var n = this._staticTrees[t];
      return n && !e
        ? Array.isArray(n)
          ? Q(n)
          : Y(n)
        : ((n = this._staticTrees[t] = this.$options.staticRenderFns[t].call(
            this._renderProxy
          )),
          fe(n, "__static__" + t, !1),
          n);
    }
    function le(t, e, n) {
      return fe(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
    }
    function fe(t, e, n) {
      if (Array.isArray(t))
        for (var r = 0; r < t.length; r++)
          t[r] && "string" != typeof t[r] && pe(t[r], e + "_" + r, n);
      else pe(t, e, n);
    }
    function pe(t, e, n) {
      (t.isStatic = !0), (t.key = e), (t.isOnce = n);
    }
    function de(t, e) {
      if (e)
        if (a(e)) {
          var n = (t.on = t.on ? y({}, t.on) : {});
          for (var r in e) {
            var i = n[r],
              o = e[r];
            n[r] = i ? [].concat(o, i) : o;
          }
        } else;
      return t;
    }
    function ve(t) {
      (t._vnode = null), (t._staticTrees = null);
      var e = (t.$vnode = t.$options._parentVnode),
        n = e && e.context;
      (t.$slots = mt(t.$options._renderChildren, n)),
        (t.$scopedSlots = Si),
        (t._c = function (e, n, r, i) {
          return ee(t, e, n, r, i, !1);
        }),
        (t.$createElement = function (e, n, r, i) {
          return ee(t, e, n, r, i, !0);
        });
      var r = e && e.data;
      L(t, "$attrs", r && r.attrs, null, !0),
        L(t, "$listeners", r && r.on, null, !0);
    }
    function he(t, e) {
      var n = (t.$options = Object.create(t.constructor.options));
      (n.parent = e.parent),
        (n.propsData = e.propsData),
        (n._parentVnode = e._parentVnode),
        (n._parentListeners = e._parentListeners),
        (n._renderChildren = e._renderChildren),
        (n._componentTag = e._componentTag),
        (n._parentElm = e._parentElm),
        (n._refElm = e._refElm),
        e.render &&
          ((n.render = e.render), (n.staticRenderFns = e.staticRenderFns));
    }
    function me(t) {
      var e = t.options;
      if (t.super) {
        var n = me(t.super);
        if (n !== t.superOptions) {
          t.superOptions = n;
          var r = ye(t);
          r && y(t.extendOptions, r),
            (e = t.options = z(n, t.extendOptions)).name &&
              (e.components[e.name] = t);
        }
      }
      return e;
    }
    function ye(t) {
      var e,
        n = t.options,
        r = t.extendOptions,
        i = t.sealedOptions;
      for (var o in n)
        n[o] !== i[o] && (e || (e = {}), (e[o] = ge(n[o], r[o], i[o])));
      return e;
    }
    function ge(t, e, n) {
      if (Array.isArray(t)) {
        var r = [];
        (n = Array.isArray(n) ? n : [n]), (e = Array.isArray(e) ? e : [e]);
        for (var i = 0; i < t.length; i++)
          (e.indexOf(t[i]) >= 0 || n.indexOf(t[i]) < 0) && r.push(t[i]);
        return r;
      }
      return t;
    }
    function _e(t) {
      this._init(t);
    }
    function be(t) {
      t.use = function (t) {
        var e = this._installedPlugins || (this._installedPlugins = []);
        if (e.indexOf(t) > -1) return this;
        var n = m(arguments, 1);
        return (
          n.unshift(this),
          "function" == typeof t.install
            ? t.install.apply(t, n)
            : "function" == typeof t && t.apply(null, n),
          e.push(t),
          this
        );
      };
    }
    function $e(t) {
      t.mixin = function (t) {
        return (this.options = z(this.options, t)), this;
      };
    }
    function Ce(t) {
      t.cid = 0;
      var e = 1;
      t.extend = function (t) {
        t = t || {};
        var n = this,
          r = n.cid,
          i = t._Ctor || (t._Ctor = {});
        if (i[r]) return i[r];
        var o = t.name || n.options.name,
          a = function (t) {
            this._init(t);
          };
        return (
          (a.prototype = Object.create(n.prototype)),
          (a.prototype.constructor = a),
          (a.cid = e++),
          (a.options = z(n.options, t)),
          (a.super = n),
          a.options.props && we(a),
          a.options.computed && xe(a),
          (a.extend = n.extend),
          (a.mixin = n.mixin),
          (a.use = n.use),
          Ai.forEach(function (t) {
            a[t] = n[t];
          }),
          o && (a.options.components[o] = a),
          (a.superOptions = n.options),
          (a.extendOptions = t),
          (a.sealedOptions = y({}, a.options)),
          (i[r] = a),
          a
        );
      };
    }
    function we(t) {
      var e = t.options.props;
      for (var n in e) It(t.prototype, "_props", n);
    }
    function xe(t) {
      var e = t.options.computed;
      for (var n in e) Ht(t.prototype, n, e[n]);
    }
    function Ae(t) {
      Ai.forEach(function (e) {
        t[e] = function (t, n) {
          return n
            ? ("component" === e &&
                a(n) &&
                ((n.name = n.name || t), (n = this.options._base.extend(n))),
              "directive" === e &&
                "function" == typeof n &&
                (n = { bind: n, update: n }),
              (this.options[e + "s"][t] = n),
              n)
            : this.options[e + "s"][t];
        };
      });
    }
    function ke(t) {
      return t && (t.Ctor.options.name || t.tag);
    }
    function Oe(t, e) {
      return Array.isArray(t)
        ? t.indexOf(e) > -1
        : "string" == typeof t
        ? t.split(",").indexOf(e) > -1
        : !!s(t) && t.test(e);
    }
    function Se(t, e, n) {
      for (var r in t) {
        var i = t[r];
        if (i) {
          var o = ke(i.componentOptions);
          o && !n(o) && (i !== e && Te(i), (t[r] = null));
        }
      }
    }
    function Te(t) {
      t && t.componentInstance.$destroy();
    }
    function Ee(t) {
      for (var n = t.data, r = t, i = t; e(i.componentInstance); )
        (i = i.componentInstance._vnode).data && (n = je(i.data, n));
      for (; e((r = r.parent)); ) r.data && (n = je(n, r.data));
      return Ne(n.staticClass, n.class);
    }
    function je(t, n) {
      return {
        staticClass: Le(t.staticClass, n.staticClass),
        class: e(t.class) ? [t.class, n.class] : n.class,
      };
    }
    function Ne(t, n) {
      return e(t) || e(n) ? Le(t, Ie(n)) : "";
    }
    function Le(t, e) {
      return t ? (e ? t + " " + e : t) : e || "";
    }
    function Ie(t) {
      return Array.isArray(t)
        ? Me(t)
        : o(t)
        ? De(t)
        : "string" == typeof t
        ? t
        : "";
    }
    function Me(t) {
      for (var n, r = "", i = 0, o = t.length; i < o; i++)
        e((n = Ie(t[i]))) && "" !== n && (r && (r += " "), (r += n));
      return r;
    }
    function De(t) {
      var e = "";
      for (var n in t) t[n] && (e && (e += " "), (e += n));
      return e;
    }
    function Pe(t) {
      return Zo(t) ? "svg" : "math" === t ? "math" : void 0;
    }
    function Fe(t) {
      if ("string" == typeof t) {
        var e = document.querySelector(t);
        return e || document.createElement("div");
      }
      return t;
    }
    function Re(t, e) {
      var n = t.data.ref;
      if (n) {
        var r = t.context,
          i = t.componentInstance || t.elm,
          o = r.$refs;
        e
          ? Array.isArray(o[n])
            ? p(o[n], i)
            : o[n] === i && (o[n] = void 0)
          : t.data.refInFor
          ? Array.isArray(o[n])
            ? o[n].indexOf(i) < 0 && o[n].push(i)
            : (o[n] = [i])
          : (o[n] = i);
      }
    }
    function He(r, i) {
      return (
        r.key === i.key &&
        ((r.tag === i.tag &&
          r.isComment === i.isComment &&
          e(r.data) === e(i.data) &&
          Be(r, i)) ||
          (n(r.isAsyncPlaceholder) &&
            r.asyncFactory === i.asyncFactory &&
            t(i.asyncFactory.error)))
      );
    }
    function Be(t, n) {
      if ("input" !== t.tag) return !0;
      var r;
      return (
        (e((r = t.data)) && e((r = r.attrs)) && r.type) ===
        (e((r = n.data)) && e((r = r.attrs)) && r.type)
      );
    }
    function Ue(t, n, r) {
      var i,
        o,
        a = {};
      for (i = n; i <= r; ++i) e((o = t[i].key)) && (a[o] = i);
      return a;
    }
    function Ve(t, e) {
      (t.data.directives || e.data.directives) && ze(t, e);
    }
    function ze(t, e) {
      var n,
        r,
        i,
        o = t === ea,
        a = e === ea,
        s = Ke(t.data.directives, t.context),
        c = Ke(e.data.directives, e.context),
        u = [],
        l = [];
      for (n in c)
        (r = s[n]),
          (i = c[n]),
          r
            ? ((i.oldValue = r.value),
              qe(i, "update", e, t),
              i.def && i.def.componentUpdated && l.push(i))
            : (qe(i, "bind", e, t), i.def && i.def.inserted && u.push(i));
      if (u.length) {
        var f = function () {
          for (var n = 0; n < u.length; n++) qe(u[n], "inserted", e, t);
        };
        o ? et(e.data.hook || (e.data.hook = {}), "insert", f) : f();
      }
      if (
        (l.length &&
          et(e.data.hook || (e.data.hook = {}), "postpatch", function () {
            for (var n = 0; n < l.length; n++)
              qe(l[n], "componentUpdated", e, t);
          }),
        !o)
      )
        for (n in s) c[n] || qe(s[n], "unbind", t, t, a);
    }
    function Ke(t, e) {
      var n = Object.create(null);
      if (!t) return n;
      var r, i;
      for (r = 0; r < t.length; r++)
        (i = t[r]).modifiers || (i.modifiers = ia),
          (n[Je(i)] = i),
          (i.def = K(e.$options, "directives", i.name, !0));
      return n;
    }
    function Je(t) {
      return (
        t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".")
      );
    }
    function qe(t, e, n, r, i) {
      var o = t.def && t.def[e];
      if (o)
        try {
          o(n.elm, t, n, r, i);
        } catch (r) {
          k(r, n.context, "directive " + t.name + " " + e + " hook");
        }
    }
    function We(n, r) {
      var i = r.componentOptions;
      if (
        !(
          (e(i) && !1 === i.Ctor.options.inheritAttrs) ||
          (t(n.data.attrs) && t(r.data.attrs))
        )
      ) {
        var o,
          a,
          s = r.elm,
          c = n.data.attrs || {},
          u = r.data.attrs || {};
        e(u.__ob__) && (u = r.data.attrs = y({}, u));
        for (o in u) (a = u[o]), c[o] !== a && Ge(s, o, a);
        Mi && u.value !== c.value && Ge(s, "value", u.value);
        for (o in c)
          t(u[o]) &&
            (Ko(o)
              ? s.removeAttributeNS(zo, Jo(o))
              : Uo(o) || s.removeAttribute(o));
      }
    }
    function Ge(t, e, n) {
      Vo(e)
        ? qo(n)
          ? t.removeAttribute(e)
          : t.setAttribute(e, e)
        : Uo(e)
        ? t.setAttribute(e, qo(n) || "false" === n ? "false" : "true")
        : Ko(e)
        ? qo(n)
          ? t.removeAttributeNS(zo, Jo(e))
          : t.setAttributeNS(zo, e, n)
        : qo(n)
        ? t.removeAttribute(e)
        : t.setAttribute(e, n);
    }
    function Ze(n, r) {
      var i = r.elm,
        o = r.data,
        a = n.data;
      if (
        !(
          t(o.staticClass) &&
          t(o.class) &&
          (t(a) || (t(a.staticClass) && t(a.class)))
        )
      ) {
        var s = Ee(r),
          c = i._transitionClasses;
        e(c) && (s = Le(s, Ie(c))),
          s !== i._prevClass &&
            (i.setAttribute("class", s), (i._prevClass = s));
      }
    }
    function Ye(t) {
      function e() {
        (a || (a = [])).push(t.slice(v, i).trim()), (v = i + 1);
      }
      var n,
        r,
        i,
        o,
        a,
        s = !1,
        c = !1,
        u = !1,
        l = !1,
        f = 0,
        p = 0,
        d = 0,
        v = 0;
      for (i = 0; i < t.length; i++)
        if (((r = n), (n = t.charCodeAt(i)), s))
          39 === n && 92 !== r && (s = !1);
        else if (c) 34 === n && 92 !== r && (c = !1);
        else if (u) 96 === n && 92 !== r && (u = !1);
        else if (l) 47 === n && 92 !== r && (l = !1);
        else if (
          124 !== n ||
          124 === t.charCodeAt(i + 1) ||
          124 === t.charCodeAt(i - 1) ||
          f ||
          p ||
          d
        ) {
          switch (n) {
            case 34:
              c = !0;
              break;
            case 39:
              s = !0;
              break;
            case 96:
              u = !0;
              break;
            case 40:
              d++;
              break;
            case 41:
              d--;
              break;
            case 91:
              p++;
              break;
            case 93:
              p--;
              break;
            case 123:
              f++;
              break;
            case 125:
              f--;
          }
          if (47 === n) {
            for (
              var h = i - 1, m = void 0;
              h >= 0 && " " === (m = t.charAt(h));
              h--
            );
            (m && ca.test(m)) || (l = !0);
          }
        } else void 0 === o ? ((v = i + 1), (o = t.slice(0, i).trim())) : e();
      if ((void 0 === o ? (o = t.slice(0, i).trim()) : 0 !== v && e(), a))
        for (i = 0; i < a.length; i++) o = Qe(o, a[i]);
      return o;
    }
    function Qe(t, e) {
      var n = e.indexOf("(");
      return n < 0
        ? '_f("' + e + '")(' + t + ")"
        : '_f("' + e.slice(0, n) + '")(' + t + "," + e.slice(n + 1);
    }
    function Xe(t) {
      console.error("[Vue compiler]: " + t);
    }
    function tn(t, e) {
      return t
        ? t
            .map(function (t) {
              return t[e];
            })
            .filter(function (t) {
              return t;
            })
        : [];
    }
    function en(t, e, n) {
      (t.props || (t.props = [])).push({ name: e, value: n });
    }
    function nn(t, e, n) {
      (t.attrs || (t.attrs = [])).push({ name: e, value: n });
    }
    function rn(t, e, n, r, i, o) {
      (t.directives || (t.directives = [])).push({
        name: e,
        rawName: n,
        value: r,
        arg: i,
        modifiers: o,
      });
    }
    function on(t, e, n, r, i, o) {
      r && r.capture && (delete r.capture, (e = "!" + e)),
        r && r.once && (delete r.once, (e = "~" + e)),
        r && r.passive && (delete r.passive, (e = "&" + e));
      var a;
      r && r.native
        ? (delete r.native, (a = t.nativeEvents || (t.nativeEvents = {})))
        : (a = t.events || (t.events = {}));
      var s = { value: n, modifiers: r },
        c = a[e];
      Array.isArray(c)
        ? i
          ? c.unshift(s)
          : c.push(s)
        : (a[e] = c ? (i ? [s, c] : [c, s]) : s);
    }
    function an(t, e, n) {
      var r = sn(t, ":" + e) || sn(t, "v-bind:" + e);
      if (null != r) return Ye(r);
      if (!1 !== n) {
        var i = sn(t, e);
        if (null != i) return JSON.stringify(i);
      }
    }
    function sn(t, e) {
      var n;
      if (null != (n = t.attrsMap[e]))
        for (var r = t.attrsList, i = 0, o = r.length; i < o; i++)
          if (r[i].name === e) {
            r.splice(i, 1);
            break;
          }
      return n;
    }
    function cn(t, e, n) {
      var r = n || {},
        i = r.number,
        o = "$$v";
      r.trim && (o = "(typeof $$v === 'string'? $$v.trim(): $$v)"),
        i && (o = "_n(" + o + ")");
      var a = un(e, o);
      t.model = {
        value: "(" + e + ")",
        expression: '"' + e + '"',
        callback: "function ($$v) {" + a + "}",
      };
    }
    function un(t, e) {
      var n = ln(t);
      return null === n.idx
        ? t + "=" + e
        : "$set(" + n.exp + ", " + n.idx + ", " + e + ")";
    }
    function ln(t) {
      if (
        ((jo = t),
        (Eo = jo.length),
        (Lo = Io = Mo = 0),
        t.indexOf("[") < 0 || t.lastIndexOf("]") < Eo - 1)
      )
        return { exp: t, idx: null };
      for (; !pn(); ) dn((No = fn())) ? hn(No) : 91 === No && vn(No);
      return { exp: t.substring(0, Io), idx: t.substring(Io + 1, Mo) };
    }
    function fn() {
      return jo.charCodeAt(++Lo);
    }
    function pn() {
      return Lo >= Eo;
    }
    function dn(t) {
      return 34 === t || 39 === t;
    }
    function vn(t) {
      var e = 1;
      for (Io = Lo; !pn(); )
        if (((t = fn()), dn(t))) hn(t);
        else if ((91 === t && e++, 93 === t && e--, 0 === e)) {
          Mo = Lo;
          break;
        }
    }
    function hn(t) {
      for (var e = t; !pn() && (t = fn()) !== e; );
    }
    function mn(t, e, n) {
      var r = n && n.number,
        i = an(t, "value") || "null",
        o = an(t, "true-value") || "true",
        a = an(t, "false-value") || "false";
      en(
        t,
        "checked",
        "Array.isArray(" +
          e +
          ")?_i(" +
          e +
          "," +
          i +
          ")>-1" +
          ("true" === o ? ":(" + e + ")" : ":_q(" + e + "," + o + ")")
      ),
        on(
          t,
          la,
          "var $$a=" +
            e +
            ",$$el=$event.target,$$c=$$el.checked?(" +
            o +
            "):(" +
            a +
            ");if(Array.isArray($$a)){var $$v=" +
            (r ? "_n(" + i + ")" : i) +
            ",$$i=_i($$a,$$v);if($$c){$$i<0&&(" +
            e +
            "=$$a.concat($$v))}else{$$i>-1&&(" +
            e +
            "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{" +
            un(e, "$$c") +
            "}",
          null,
          !0
        );
    }
    function yn(t, e, n) {
      var r = n && n.number,
        i = an(t, "value") || "null";
      en(t, "checked", "_q(" + e + "," + (i = r ? "_n(" + i + ")" : i) + ")"),
        on(t, la, un(e, i), null, !0);
    }
    function gn(t, e, n) {
      var r =
        "var $$selectedVal = " +
        ('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' +
          (n && n.number ? "_n(val)" : "val") +
          "})") +
        ";";
      on(
        t,
        "change",
        (r =
          r +
          " " +
          un(e, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]")),
        null,
        !0
      );
    }
    function _n(t, e, n) {
      var r = t.attrsMap.type,
        i = n || {},
        o = i.lazy,
        a = i.number,
        s = i.trim,
        c = !o && "range" !== r,
        u = o ? "change" : "range" === r ? ua : "input",
        l = "$event.target.value";
      s && (l = "$event.target.value.trim()"), a && (l = "_n(" + l + ")");
      var f = un(e, l);
      c && (f = "if($event.target.composing)return;" + f),
        en(t, "value", "(" + e + ")"),
        on(t, u, f, null, !0),
        (s || a) && on(t, "blur", "$forceUpdate()");
    }
    function bn(t) {
      var n;
      e(t[ua]) &&
        ((t[(n = Ii ? "change" : "input")] = [].concat(t[ua], t[n] || [])),
        delete t[ua]),
        e(t[la]) &&
          ((t[(n = Ri ? "click" : "change")] = [].concat(t[la], t[n] || [])),
          delete t[la]);
    }
    function $n(t, e, n, r, i) {
      if (n) {
        var o = e,
          a = Po;
        e = function (n) {
          null !== (1 === arguments.length ? o(n) : o.apply(null, arguments)) &&
            Cn(t, e, r, a);
        };
      }
      Po.addEventListener(t, e, Bi ? { capture: r, passive: i } : r);
    }
    function Cn(t, e, n, r) {
      (r || Po).removeEventListener(t, e, n);
    }
    function wn(n, r) {
      var i = e(r.componentOptions),
        o = i ? n.data.nativeOn : n.data.on,
        a = i ? r.data.nativeOn : r.data.on;
      (t(o) && t(a)) ||
        ((a = a || {}),
        (o = o || {}),
        (Po = r.elm),
        bn(a),
        tt(a, o, $n, Cn, r.context));
    }
    function xn(n, r) {
      if (!t(n.data.domProps) || !t(r.data.domProps)) {
        var i,
          o,
          a = r.elm,
          s = n.data.domProps || {},
          c = r.data.domProps || {};
        e(c.__ob__) && (c = r.data.domProps = y({}, c));
        for (i in s) t(c[i]) && (a[i] = "");
        for (i in c)
          if (
            ((o = c[i]),
            ("textContent" !== i && "innerHTML" !== i) ||
              (r.children && (r.children.length = 0), o !== s[i]))
          )
            if ("value" === i) {
              a._value = o;
              var u = t(o) ? "" : String(o);
              An(a, r, u) && (a.value = u);
            } else a[i] = o;
      }
    }
    function An(t, e, n) {
      return !t.composing && ("option" === e.tag || kn(t, n) || On(t, n));
    }
    function kn(t, e) {
      return document.activeElement !== t && t.value !== e;
    }
    function On(t, n) {
      var r = t.value,
        i = t._vModifiers;
      return e(i) && i.number
        ? l(r) !== l(n)
        : e(i) && i.trim
        ? r.trim() !== n.trim()
        : r !== n;
    }
    function Sn(t) {
      var e = Tn(t.style);
      return t.staticStyle ? y(t.staticStyle, e) : e;
    }
    function Tn(t) {
      return Array.isArray(t) ? g(t) : "string" == typeof t ? da(t) : t;
    }
    function En(t, e) {
      var n,
        r = {};
      if (e)
        for (var i = t; i.componentInstance; )
          (i = i.componentInstance._vnode).data && (n = Sn(i.data)) && y(r, n);
      (n = Sn(t.data)) && y(r, n);
      for (var o = t; (o = o.parent); ) o.data && (n = Sn(o.data)) && y(r, n);
      return r;
    }
    function jn(n, r) {
      var i = r.data,
        o = n.data;
      if (!(t(i.staticStyle) && t(i.style) && t(o.staticStyle) && t(o.style))) {
        var a,
          s,
          c = r.elm,
          u = o.staticStyle,
          l = o.normalizedStyle || o.style || {},
          f = u || l,
          p = Tn(r.data.style) || {};
        r.data.normalizedStyle = e(p.__ob__) ? y({}, p) : p;
        var d = En(r, !0);
        for (s in f) t(d[s]) && ma(c, s, "");
        for (s in d) (a = d[s]) !== f[s] && ma(c, s, null == a ? "" : a);
      }
    }
    function Nn(t, e) {
      if (e && (e = e.trim()))
        if (t.classList)
          e.indexOf(" ") > -1
            ? e.split(/\s+/).forEach(function (e) {
                return t.classList.add(e);
              })
            : t.classList.add(e);
        else {
          var n = " " + (t.getAttribute("class") || "") + " ";
          n.indexOf(" " + e + " ") < 0 &&
            t.setAttribute("class", (n + e).trim());
        }
    }
    function Ln(t, e) {
      if (e && (e = e.trim()))
        if (t.classList)
          e.indexOf(" ") > -1
            ? e.split(/\s+/).forEach(function (e) {
                return t.classList.remove(e);
              })
            : t.classList.remove(e),
            t.classList.length || t.removeAttribute("class");
        else {
          for (
            var n = " " + (t.getAttribute("class") || "") + " ",
              r = " " + e + " ";
            n.indexOf(r) >= 0;

          )
            n = n.replace(r, " ");
          (n = n.trim())
            ? t.setAttribute("class", n)
            : t.removeAttribute("class");
        }
    }
    function In(t) {
      if (t) {
        if ("object" == typeof t) {
          var e = {};
          return !1 !== t.css && y(e, ba(t.name || "v")), y(e, t), e;
        }
        return "string" == typeof t ? ba(t) : void 0;
      }
    }
    function Mn(t) {
      Sa(function () {
        Sa(t);
      });
    }
    function Dn(t, e) {
      var n = t._transitionClasses || (t._transitionClasses = []);
      n.indexOf(e) < 0 && (n.push(e), Nn(t, e));
    }
    function Pn(t, e) {
      t._transitionClasses && p(t._transitionClasses, e), Ln(t, e);
    }
    function Fn(t, e, n) {
      var r = Rn(t, e),
        i = r.type,
        o = r.timeout,
        a = r.propCount;
      if (!i) return n();
      var s = i === Ca ? Aa : Oa,
        c = 0,
        u = function () {
          t.removeEventListener(s, l), n();
        },
        l = function (e) {
          e.target === t && ++c >= a && u();
        };
      setTimeout(function () {
        c < a && u();
      }, o + 1),
        t.addEventListener(s, l);
    }
    function Rn(t, e) {
      var n,
        r = window.getComputedStyle(t),
        i = r[xa + "Delay"].split(", "),
        o = r[xa + "Duration"].split(", "),
        a = Hn(i, o),
        s = r[ka + "Delay"].split(", "),
        c = r[ka + "Duration"].split(", "),
        u = Hn(s, c),
        l = 0,
        f = 0;
      return (
        e === Ca
          ? a > 0 && ((n = Ca), (l = a), (f = o.length))
          : e === wa
          ? u > 0 && ((n = wa), (l = u), (f = c.length))
          : (f = (n = (l = Math.max(a, u)) > 0 ? (a > u ? Ca : wa) : null)
              ? n === Ca
                ? o.length
                : c.length
              : 0),
        {
          type: n,
          timeout: l,
          propCount: f,
          hasTransform: n === Ca && Ta.test(r[xa + "Property"]),
        }
      );
    }
    function Hn(t, e) {
      for (; t.length < e.length; ) t = t.concat(t);
      return Math.max.apply(
        null,
        e.map(function (e, n) {
          return Bn(e) + Bn(t[n]);
        })
      );
    }
    function Bn(t) {
      return 1e3 * Number(t.slice(0, -1));
    }
    function Un(n, r) {
      var i = n.elm;
      e(i._leaveCb) && ((i._leaveCb.cancelled = !0), i._leaveCb());
      var a = In(n.data.transition);
      if (!t(a) && !e(i._enterCb) && 1 === i.nodeType) {
        for (
          var s = a.css,
            c = a.type,
            u = a.enterClass,
            f = a.enterToClass,
            p = a.enterActiveClass,
            d = a.appearClass,
            v = a.appearToClass,
            h = a.appearActiveClass,
            m = a.beforeEnter,
            y = a.enter,
            g = a.afterEnter,
            _ = a.enterCancelled,
            b = a.beforeAppear,
            $ = a.appear,
            w = a.afterAppear,
            x = a.appearCancelled,
            A = a.duration,
            k = lo,
            O = lo.$vnode;
          O && O.parent;

        )
          k = (O = O.parent).context;
        var S = !k._isMounted || !n.isRootInsert;
        if (!S || $ || "" === $) {
          var T = S && d ? d : u,
            E = S && h ? h : p,
            j = S && v ? v : f,
            N = S ? b || m : m,
            L = S && "function" == typeof $ ? $ : y,
            I = S ? w || g : g,
            M = S ? x || _ : _,
            D = l(o(A) ? A.enter : A),
            P = !1 !== s && !Mi,
            F = Kn(L),
            R = (i._enterCb = C(function () {
              P && (Pn(i, j), Pn(i, E)),
                R.cancelled ? (P && Pn(i, T), M && M(i)) : I && I(i),
                (i._enterCb = null);
            }));
          n.data.show ||
            et(n.data.hook || (n.data.hook = {}), "insert", function () {
              var t = i.parentNode,
                e = t && t._pending && t._pending[n.key];
              e && e.tag === n.tag && e.elm._leaveCb && e.elm._leaveCb(),
                L && L(i, R);
            }),
            N && N(i),
            P &&
              (Dn(i, T),
              Dn(i, E),
              Mn(function () {
                Dn(i, j),
                  Pn(i, T),
                  R.cancelled || F || (zn(D) ? setTimeout(R, D) : Fn(i, c, R));
              })),
            n.data.show && (r && r(), L && L(i, R)),
            P || F || R();
        }
      }
    }
    function Vn(n, r) {
      function i() {
        x.cancelled ||
          (n.data.show ||
            ((a.parentNode._pending || (a.parentNode._pending = {}))[
              n.key
            ] = n),
          v && v(a),
          b &&
            (Dn(a, f),
            Dn(a, d),
            Mn(function () {
              Dn(a, p),
                Pn(a, f),
                x.cancelled || $ || (zn(w) ? setTimeout(x, w) : Fn(a, u, x));
            })),
          h && h(a, x),
          b || $ || x());
      }
      var a = n.elm;
      e(a._enterCb) && ((a._enterCb.cancelled = !0), a._enterCb());
      var s = In(n.data.transition);
      if (t(s)) return r();
      if (!e(a._leaveCb) && 1 === a.nodeType) {
        var c = s.css,
          u = s.type,
          f = s.leaveClass,
          p = s.leaveToClass,
          d = s.leaveActiveClass,
          v = s.beforeLeave,
          h = s.leave,
          m = s.afterLeave,
          y = s.leaveCancelled,
          g = s.delayLeave,
          _ = s.duration,
          b = !1 !== c && !Mi,
          $ = Kn(h),
          w = l(o(_) ? _.leave : _),
          x = (a._leaveCb = C(function () {
            a.parentNode &&
              a.parentNode._pending &&
              (a.parentNode._pending[n.key] = null),
              b && (Pn(a, p), Pn(a, d)),
              x.cancelled ? (b && Pn(a, f), y && y(a)) : (r(), m && m(a)),
              (a._leaveCb = null);
          }));
        g ? g(i) : i();
      }
    }
    function zn(t) {
      return "number" == typeof t && !isNaN(t);
    }
    function Kn(n) {
      if (t(n)) return !1;
      var r = n.fns;
      return e(r)
        ? Kn(Array.isArray(r) ? r[0] : r)
        : (n._length || n.length) > 1;
    }
    function Jn(t, e) {
      !0 !== e.data.show && Un(e);
    }
    function qn(t, e, n) {
      var r = e.value,
        i = t.multiple;
      if (!i || Array.isArray(r)) {
        for (var o, a, s = 0, c = t.options.length; s < c; s++)
          if (((a = t.options[s]), i))
            (o = $(r, Gn(a)) > -1), a.selected !== o && (a.selected = o);
          else if (b(Gn(a), r))
            return void (t.selectedIndex !== s && (t.selectedIndex = s));
        i || (t.selectedIndex = -1);
      }
    }
    function Wn(t, e) {
      for (var n = 0, r = e.length; n < r; n++) if (b(Gn(e[n]), t)) return !1;
      return !0;
    }
    function Gn(t) {
      return "_value" in t ? t._value : t.value;
    }
    function Zn(t) {
      t.target.composing = !0;
    }
    function Yn(t) {
      t.target.composing && ((t.target.composing = !1), Qn(t.target, "input"));
    }
    function Qn(t, e) {
      var n = document.createEvent("HTMLEvents");
      n.initEvent(e, !0, !0), t.dispatchEvent(n);
    }
    function Xn(t) {
      return !t.componentInstance || (t.data && t.data.transition)
        ? t
        : Xn(t.componentInstance._vnode);
    }
    function tr(t) {
      var e = t && t.componentOptions;
      return e && e.Ctor.options.abstract ? tr(ft(e.children)) : t;
    }
    function er(t) {
      var e = {},
        n = t.$options;
      for (var r in n.propsData) e[r] = t[r];
      var i = n._parentListeners;
      for (var o in i) e[gi(o)] = i[o];
      return e;
    }
    function nr(t, e) {
      if (/\d-keep-alive$/.test(e.tag))
        return t("keep-alive", { props: e.componentOptions.propsData });
    }
    function rr(t) {
      for (; (t = t.parent); ) if (t.data.transition) return !0;
    }
    function ir(t, e) {
      return e.key === t.key && e.tag === t.tag;
    }
    function or(t) {
      return t.isComment && t.asyncFactory;
    }
    function ar(t) {
      t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb();
    }
    function sr(t) {
      t.data.newPos = t.elm.getBoundingClientRect();
    }
    function cr(t) {
      var e = t.data.pos,
        n = t.data.newPos,
        r = e.left - n.left,
        i = e.top - n.top;
      if (r || i) {
        t.data.moved = !0;
        var o = t.elm.style;
        (o.transform = o.WebkitTransform =
          "translate(" + r + "px," + i + "px)"),
          (o.transitionDuration = "0s");
      }
    }
    function ur(t, e) {
      var n = e ? Ba(e) : Ra;
      if (n.test(t)) {
        for (var r, i, o = [], a = (n.lastIndex = 0); (r = n.exec(t)); ) {
          (i = r.index) > a && o.push(JSON.stringify(t.slice(a, i)));
          var s = Ye(r[1].trim());
          o.push("_s(" + s + ")"), (a = i + r[0].length);
        }
        return a < t.length && o.push(JSON.stringify(t.slice(a))), o.join("+");
      }
    }
    function lr(t, e) {
      var n = e ? Cs : $s;
      return t.replace(n, function (t) {
        return bs[t];
      });
    }
    function fr(t, e) {
      function n(e) {
        (l += e), (t = t.substring(e));
      }
      function r(t, n, r) {
        var i, s;
        if (
          (null == n && (n = l),
          null == r && (r = l),
          t && (s = t.toLowerCase()),
          t)
        )
          for (i = a.length - 1; i >= 0 && a[i].lowerCasedTag !== s; i--);
        else i = 0;
        if (i >= 0) {
          for (var c = a.length - 1; c >= i; c--)
            e.end && e.end(a[c].tag, n, r);
          (a.length = i), (o = i && a[i - 1].tag);
        } else "br" === s ? e.start && e.start(t, [], !0, n, r) : "p" === s && (e.start && e.start(t, [], !1, n, r), e.end && e.end(t, n, r));
      }
      for (
        var i,
          o,
          a = [],
          s = e.expectHTML,
          c = e.isUnaryTag || Ci,
          u = e.canBeLeftOpenTag || Ci,
          l = 0;
        t;

      ) {
        if (((i = t), o && gs(o))) {
          var f = 0,
            p = o.toLowerCase(),
            d =
              _s[p] ||
              (_s[p] = new RegExp("([\\s\\S]*?)(</" + p + "[^>]*>)", "i")),
            v = t.replace(d, function (t, n, r) {
              return (
                (f = r.length),
                gs(p) ||
                  "noscript" === p ||
                  (n = n
                    .replace(/<!--([\s\S]*?)-->/g, "$1")
                    .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")),
                xs(p, n) && (n = n.slice(1)),
                e.chars && e.chars(n),
                ""
              );
            });
          (l += t.length - v.length), (t = v), r(p, l - f, l);
        } else {
          xs(o, t) && n(1);
          var h = t.indexOf("<");
          if (0 === h) {
            if (os.test(t)) {
              var m = t.indexOf("--\x3e");
              if (m >= 0) {
                e.shouldKeepComment && e.comment(t.substring(4, m)), n(m + 3);
                continue;
              }
            }
            if (as.test(t)) {
              var y = t.indexOf("]>");
              if (y >= 0) {
                n(y + 2);
                continue;
              }
            }
            var g = t.match(is);
            if (g) {
              n(g[0].length);
              continue;
            }
            var _ = t.match(rs);
            if (_) {
              var b = l;
              n(_[0].length), r(_[1], b, l);
              continue;
            }
            var $ = (function () {
              var e = t.match(es);
              if (e) {
                var r = { tagName: e[1], attrs: [], start: l };
                n(e[0].length);
                for (var i, o; !(i = t.match(ns)) && (o = t.match(Qa)); )
                  n(o[0].length), r.attrs.push(o);
                if (i)
                  return (r.unarySlash = i[1]), n(i[0].length), (r.end = l), r;
              }
            })();
            if ($) {
              !(function (t) {
                var n = t.tagName,
                  i = t.unarySlash;
                s && ("p" === o && Ja(n) && r(o), u(n) && o === n && r(n));
                for (
                  var l = c(n) || !!i,
                    f = t.attrs.length,
                    p = new Array(f),
                    d = 0;
                  d < f;
                  d++
                ) {
                  var v = t.attrs[d];
                  ss &&
                    -1 === v[0].indexOf('""') &&
                    ("" === v[3] && delete v[3],
                    "" === v[4] && delete v[4],
                    "" === v[5] && delete v[5]);
                  var h = v[3] || v[4] || v[5] || "";
                  p[d] = { name: v[1], value: lr(h, e.shouldDecodeNewlines) };
                }
                l ||
                  (a.push({ tag: n, lowerCasedTag: n.toLowerCase(), attrs: p }),
                  (o = n)),
                  e.start && e.start(n, p, l, t.start, t.end);
              })($);
              continue;
            }
          }
          var C = void 0,
            w = void 0,
            x = void 0;
          if (h >= 0) {
            for (
              w = t.slice(h);
              !(
                rs.test(w) ||
                es.test(w) ||
                os.test(w) ||
                as.test(w) ||
                (x = w.indexOf("<", 1)) < 0
              );

            )
              (h += x), (w = t.slice(h));
            (C = t.substring(0, h)), n(h);
          }
          h < 0 && ((C = t), (t = "")), e.chars && C && e.chars(C);
        }
        if (t === i) {
          e.chars && e.chars(t);
          break;
        }
      }
      r();
    }
    function pr(t, e) {
      function n(t) {
        t.pre && (s = !1), ds(t.tag) && (c = !1);
      }
      (cs = e.warn || Xe),
        (ds = e.isPreTag || Ci),
        (vs = e.mustUseProp || Ci),
        (hs = e.getTagNamespace || Ci),
        (ls = tn(e.modules, "transformNode")),
        (fs = tn(e.modules, "preTransformNode")),
        (ps = tn(e.modules, "postTransformNode")),
        (us = e.delimiters);
      var r,
        i,
        o = [],
        a = !1 !== e.preserveWhitespace,
        s = !1,
        c = !1;
      return (
        fr(t, {
          warn: cs,
          expectHTML: e.expectHTML,
          isUnaryTag: e.isUnaryTag,
          canBeLeftOpenTag: e.canBeLeftOpenTag,
          shouldDecodeNewlines: e.shouldDecodeNewlines,
          shouldKeepComment: e.comments,
          start: function (t, a, u) {
            function l(t) {}
            var f = (i && i.ns) || hs(t);
            Ii && "svg" === f && (a = jr(a));
            var p = {
              type: 1,
              tag: t,
              attrsList: a,
              attrsMap: Sr(a),
              parent: i,
              children: [],
            };
            f && (p.ns = f), Er(p) && !Ki() && (p.forbidden = !0);
            for (var d = 0; d < fs.length; d++) fs[d](p, e);
            if ((s || (dr(p), p.pre && (s = !0)), ds(p.tag) && (c = !0), s))
              vr(p);
            else {
              yr(p),
                gr(p),
                Cr(p),
                hr(p),
                (p.plain = !p.key && !a.length),
                mr(p),
                wr(p),
                xr(p);
              for (var v = 0; v < ls.length; v++) ls[v](p, e);
              Ar(p);
            }
            if (
              (r
                ? o.length ||
                  (r.if &&
                    (p.elseif || p.else) &&
                    (l(), $r(r, { exp: p.elseif, block: p })))
                : ((r = p), l()),
              i && !p.forbidden)
            )
              if (p.elseif || p.else) _r(p, i);
              else if (p.slotScope) {
                i.plain = !1;
                var h = p.slotTarget || '"default"';
                (i.scopedSlots || (i.scopedSlots = {}))[h] = p;
              } else i.children.push(p), (p.parent = i);
            u ? n(p) : ((i = p), o.push(p));
            for (var m = 0; m < ps.length; m++) ps[m](p, e);
          },
          end: function () {
            var t = o[o.length - 1],
              e = t.children[t.children.length - 1];
            e && 3 === e.type && " " === e.text && !c && t.children.pop(),
              (o.length -= 1),
              (i = o[o.length - 1]),
              n(t);
          },
          chars: function (t) {
            if (
              i &&
              (!Ii || "textarea" !== i.tag || i.attrsMap.placeholder !== t)
            ) {
              var e = i.children;
              if (
                (t =
                  c || t.trim()
                    ? Tr(i)
                      ? t
                      : Ns(t)
                    : a && e.length
                    ? " "
                    : "")
              ) {
                var n;
                !s && " " !== t && (n = ur(t, us))
                  ? e.push({ type: 2, expression: n, text: t })
                  : (" " === t && e.length && " " === e[e.length - 1].text) ||
                    e.push({ type: 3, text: t });
              }
            }
          },
          comment: function (t) {
            i.children.push({ type: 3, text: t, isComment: !0 });
          },
        }),
        r
      );
    }
    function dr(t) {
      null != sn(t, "v-pre") && (t.pre = !0);
    }
    function vr(t) {
      var e = t.attrsList.length;
      if (e)
        for (var n = (t.attrs = new Array(e)), r = 0; r < e; r++)
          n[r] = {
            name: t.attrsList[r].name,
            value: JSON.stringify(t.attrsList[r].value),
          };
      else t.pre || (t.plain = !0);
    }
    function hr(t) {
      var e = an(t, "key");
      e && (t.key = e);
    }
    function mr(t) {
      var e = an(t, "ref");
      e && ((t.ref = e), (t.refInFor = kr(t)));
    }
    function yr(t) {
      var e;
      if ((e = sn(t, "v-for"))) {
        var n = e.match(Os);
        if (!n) return;
        t.for = n[2].trim();
        var r = n[1].trim(),
          i = r.match(Ss);
        i
          ? ((t.alias = i[1].trim()),
            (t.iterator1 = i[2].trim()),
            i[3] && (t.iterator2 = i[3].trim()))
          : (t.alias = r);
      }
    }
    function gr(t) {
      var e = sn(t, "v-if");
      if (e) (t.if = e), $r(t, { exp: e, block: t });
      else {
        null != sn(t, "v-else") && (t.else = !0);
        var n = sn(t, "v-else-if");
        n && (t.elseif = n);
      }
    }
    function _r(t, e) {
      var n = br(e.children);
      n && n.if && $r(n, { exp: t.elseif, block: t });
    }
    function br(t) {
      for (var e = t.length; e--; ) {
        if (1 === t[e].type) return t[e];
        t.pop();
      }
    }
    function $r(t, e) {
      t.ifConditions || (t.ifConditions = []), t.ifConditions.push(e);
    }
    function Cr(t) {
      null != sn(t, "v-once") && (t.once = !0);
    }
    function wr(t) {
      if ("slot" === t.tag) t.slotName = an(t, "name");
      else {
        var e = an(t, "slot");
        e && (t.slotTarget = '""' === e ? '"default"' : e),
          "template" === t.tag && (t.slotScope = sn(t, "scope"));
      }
    }
    function xr(t) {
      var e;
      (e = an(t, "is")) && (t.component = e),
        null != sn(t, "inline-template") && (t.inlineTemplate = !0);
    }
    function Ar(t) {
      var e,
        n,
        r,
        i,
        o,
        a,
        s,
        c = t.attrsList;
      for (e = 0, n = c.length; e < n; e++)
        if (((r = i = c[e].name), (o = c[e].value), ks.test(r)))
          if (
            ((t.hasBindings = !0),
            (a = Or(r)) && (r = r.replace(js, "")),
            Es.test(r))
          )
            (r = r.replace(Es, "")),
              (o = Ye(o)),
              (s = !1),
              a &&
                (a.prop &&
                  ((s = !0), "innerHtml" === (r = gi(r)) && (r = "innerHTML")),
                a.camel && (r = gi(r)),
                a.sync && on(t, "update:" + gi(r), un(o, "$event"))),
              t.component || (!s && !vs(t.tag, t.attrsMap.type, r))
                ? nn(t, r, o)
                : en(t, r, o);
          else if (As.test(r)) on(t, (r = r.replace(As, "")), o, a, !1, cs);
          else {
            var u = (r = r.replace(ks, "")).match(Ts),
              l = u && u[1];
            l && (r = r.slice(0, -(l.length + 1))), rn(t, r, i, o, l, a);
          }
        else nn(t, r, JSON.stringify(o));
    }
    function kr(t) {
      for (var e = t; e; ) {
        if (void 0 !== e.for) return !0;
        e = e.parent;
      }
      return !1;
    }
    function Or(t) {
      var e = t.match(js);
      if (e) {
        var n = {};
        return (
          e.forEach(function (t) {
            n[t.slice(1)] = !0;
          }),
          n
        );
      }
    }
    function Sr(t) {
      for (var e = {}, n = 0, r = t.length; n < r; n++)
        e[t[n].name] = t[n].value;
      return e;
    }
    function Tr(t) {
      return "script" === t.tag || "style" === t.tag;
    }
    function Er(t) {
      return (
        "style" === t.tag ||
        ("script" === t.tag &&
          (!t.attrsMap.type || "text/javascript" === t.attrsMap.type))
      );
    }
    function jr(t) {
      for (var e = [], n = 0; n < t.length; n++) {
        var r = t[n];
        Ls.test(r.name) || ((r.name = r.name.replace(Is, "")), e.push(r));
      }
      return e;
    }
    function Nr(t, e) {
      t &&
        ((ms = Ms(e.staticKeys || "")),
        (ys = e.isReservedTag || Ci),
        Lr(t),
        Ir(t, !1));
    }
    function Lr(t) {
      if (((t.static = Mr(t)), 1 === t.type)) {
        if (
          !ys(t.tag) &&
          "slot" !== t.tag &&
          null == t.attrsMap["inline-template"]
        )
          return;
        for (var e = 0, n = t.children.length; e < n; e++) {
          var r = t.children[e];
          Lr(r), r.static || (t.static = !1);
        }
        if (t.ifConditions)
          for (var i = 1, o = t.ifConditions.length; i < o; i++) {
            var a = t.ifConditions[i].block;
            Lr(a), a.static || (t.static = !1);
          }
      }
    }
    function Ir(t, e) {
      if (1 === t.type) {
        if (
          ((t.static || t.once) && (t.staticInFor = e),
          t.static &&
            t.children.length &&
            (1 !== t.children.length || 3 !== t.children[0].type))
        )
          return void (t.staticRoot = !0);
        if (((t.staticRoot = !1), t.children))
          for (var n = 0, r = t.children.length; n < r; n++)
            Ir(t.children[n], e || !!t.for);
        if (t.ifConditions)
          for (var i = 1, o = t.ifConditions.length; i < o; i++)
            Ir(t.ifConditions[i].block, e);
      }
    }
    function Mr(t) {
      return (
        2 !== t.type &&
        (3 === t.type ||
          !(
            !t.pre &&
            (t.hasBindings ||
              t.if ||
              t.for ||
              vi(t.tag) ||
              !ys(t.tag) ||
              Dr(t) ||
              !Object.keys(t).every(ms))
          ))
      );
    }
    function Dr(t) {
      for (; t.parent; ) {
        if ("template" !== (t = t.parent).tag) return !1;
        if (t.for) return !0;
      }
      return !1;
    }
    function Pr(t, e, n) {
      var r = e ? "nativeOn:{" : "on:{";
      for (var i in t) {
        var o = t[i];
        r += '"' + i + '":' + Fr(i, o) + ",";
      }
      return r.slice(0, -1) + "}";
    }
    function Fr(t, e) {
      if (!e) return "function(){}";
      if (Array.isArray(e))
        return (
          "[" +
          e
            .map(function (e) {
              return Fr(t, e);
            })
            .join(",") +
          "]"
        );
      var n = Ps.test(e.value),
        r = Ds.test(e.value);
      if (e.modifiers) {
        var i = "",
          o = "",
          a = [];
        for (var s in e.modifiers)
          Hs[s] ? ((o += Hs[s]), Fs[s] && a.push(s)) : a.push(s);
        return (
          a.length && (i += Rr(a)),
          o && (i += o),
          "function($event){" +
            i +
            (n
              ? e.value + "($event)"
              : r
              ? "(" + e.value + ")($event)"
              : e.value) +
            "}"
        );
      }
      return n || r ? e.value : "function($event){" + e.value + "}";
    }
    function Rr(t) {
      return (
        "if(!('button' in $event)&&" + t.map(Hr).join("&&") + ")return null;"
      );
    }
    function Hr(t) {
      var e = parseInt(t, 10);
      if (e) return "$event.keyCode!==" + e;
      var n = Fs[t];
      return (
        "_k($event.keyCode," +
        JSON.stringify(t) +
        (n ? "," + JSON.stringify(n) : "") +
        ")"
      );
    }
    function Br(t, e) {
      var n = new Us(e);
      return {
        render: "with(this){return " + (t ? Ur(t, n) : '_c("div")') + "}",
        staticRenderFns: n.staticRenderFns,
      };
    }
    function Ur(t, e) {
      if (t.staticRoot && !t.staticProcessed) return Vr(t, e);
      if (t.once && !t.onceProcessed) return zr(t, e);
      if (t.for && !t.forProcessed) return qr(t, e);
      if (t.if && !t.ifProcessed) return Kr(t, e);
      if ("template" !== t.tag || t.slotTarget) {
        if ("slot" === t.tag) return ai(t, e);
        var n;
        if (t.component) n = si(t.component, t, e);
        else {
          var r = t.plain ? void 0 : Wr(t, e),
            i = t.inlineTemplate ? null : ti(t, e, !0);
          n =
            "_c('" +
            t.tag +
            "'" +
            (r ? "," + r : "") +
            (i ? "," + i : "") +
            ")";
        }
        for (var o = 0; o < e.transforms.length; o++) n = e.transforms[o](t, n);
        return n;
      }
      return ti(t, e) || "void 0";
    }
    function Vr(t, e) {
      return (
        (t.staticProcessed = !0),
        e.staticRenderFns.push("with(this){return " + Ur(t, e) + "}"),
        "_m(" +
          (e.staticRenderFns.length - 1) +
          (t.staticInFor ? ",true" : "") +
          ")"
      );
    }
    function zr(t, e) {
      if (((t.onceProcessed = !0), t.if && !t.ifProcessed)) return Kr(t, e);
      if (t.staticInFor) {
        for (var n = "", r = t.parent; r; ) {
          if (r.for) {
            n = r.key;
            break;
          }
          r = r.parent;
        }
        return n
          ? "_o(" + Ur(t, e) + "," + e.onceId++ + (n ? "," + n : "") + ")"
          : Ur(t, e);
      }
      return Vr(t, e);
    }
    function Kr(t, e, n, r) {
      return (t.ifProcessed = !0), Jr(t.ifConditions.slice(), e, n, r);
    }
    function Jr(t, e, n, r) {
      function i(t) {
        return n ? n(t, e) : t.once ? zr(t, e) : Ur(t, e);
      }
      if (!t.length) return r || "_e()";
      var o = t.shift();
      return o.exp
        ? "(" + o.exp + ")?" + i(o.block) + ":" + Jr(t, e, n, r)
        : "" + i(o.block);
    }
    function qr(t, e, n, r) {
      var i = t.for,
        o = t.alias,
        a = t.iterator1 ? "," + t.iterator1 : "",
        s = t.iterator2 ? "," + t.iterator2 : "";
      return (
        (t.forProcessed = !0),
        (r || "_l") +
          "((" +
          i +
          "),function(" +
          o +
          a +
          s +
          "){return " +
          (n || Ur)(t, e) +
          "})"
      );
    }
    function Wr(t, e) {
      var n = "{",
        r = Gr(t, e);
      r && (n += r + ","),
        t.key && (n += "key:" + t.key + ","),
        t.ref && (n += "ref:" + t.ref + ","),
        t.refInFor && (n += "refInFor:true,"),
        t.pre && (n += "pre:true,"),
        t.component && (n += 'tag:"' + t.tag + '",');
      for (var i = 0; i < e.dataGenFns.length; i++) n += e.dataGenFns[i](t);
      if (
        (t.attrs && (n += "attrs:{" + ci(t.attrs) + "},"),
        t.props && (n += "domProps:{" + ci(t.props) + "},"),
        t.events && (n += Pr(t.events, !1, e.warn) + ","),
        t.nativeEvents && (n += Pr(t.nativeEvents, !0, e.warn) + ","),
        t.slotTarget && (n += "slot:" + t.slotTarget + ","),
        t.scopedSlots && (n += Yr(t.scopedSlots, e) + ","),
        t.model &&
          (n +=
            "model:{value:" +
            t.model.value +
            ",callback:" +
            t.model.callback +
            ",expression:" +
            t.model.expression +
            "},"),
        t.inlineTemplate)
      ) {
        var o = Zr(t, e);
        o && (n += o + ",");
      }
      return (
        (n = n.replace(/,$/, "") + "}"),
        t.wrapData && (n = t.wrapData(n)),
        t.wrapListeners && (n = t.wrapListeners(n)),
        n
      );
    }
    function Gr(t, e) {
      var n = t.directives;
      if (n) {
        var r,
          i,
          o,
          a,
          s = "directives:[",
          c = !1;
        for (r = 0, i = n.length; r < i; r++) {
          (o = n[r]), (a = !0);
          var u = e.directives[o.name];
          u && (a = !!u(t, o, e.warn)),
            a &&
              ((c = !0),
              (s +=
                '{name:"' +
                o.name +
                '",rawName:"' +
                o.rawName +
                '"' +
                (o.value
                  ? ",value:(" +
                    o.value +
                    "),expression:" +
                    JSON.stringify(o.value)
                  : "") +
                (o.arg ? ',arg:"' + o.arg + '"' : "") +
                (o.modifiers
                  ? ",modifiers:" + JSON.stringify(o.modifiers)
                  : "") +
                "},"));
        }
        return c ? s.slice(0, -1) + "]" : void 0;
      }
    }
    function Zr(t, e) {
      var n = t.children[0];
      if (1 === n.type) {
        var r = Br(n, e.options);
        return (
          "inlineTemplate:{render:function(){" +
          r.render +
          "},staticRenderFns:[" +
          r.staticRenderFns
            .map(function (t) {
              return "function(){" + t + "}";
            })
            .join(",") +
          "]}"
        );
      }
    }
    function Yr(t, e) {
      return (
        "scopedSlots:_u([" +
        Object.keys(t)
          .map(function (n) {
            return Qr(n, t[n], e);
          })
          .join(",") +
        "])"
      );
    }
    function Qr(t, e, n) {
      return e.for && !e.forProcessed
        ? Xr(t, e, n)
        : "{key:" +
            t +
            ",fn:function(" +
            String(e.attrsMap.scope) +
            "){return " +
            ("template" === e.tag ? ti(e, n) || "void 0" : Ur(e, n)) +
            "}}";
    }
    function Xr(t, e, n) {
      var r = e.for,
        i = e.alias,
        o = e.iterator1 ? "," + e.iterator1 : "",
        a = e.iterator2 ? "," + e.iterator2 : "";
      return (
        (e.forProcessed = !0),
        "_l((" +
          r +
          "),function(" +
          i +
          o +
          a +
          "){return " +
          Qr(t, e, n) +
          "})"
      );
    }
    function ti(t, e, n, r, i) {
      var o = t.children;
      if (o.length) {
        var a = o[0];
        if (1 === o.length && a.for && "template" !== a.tag && "slot" !== a.tag)
          return (r || Ur)(a, e);
        var s = n ? ei(o, e.maybeComponent) : 0,
          c = i || ri;
        return (
          "[" +
          o
            .map(function (t) {
              return c(t, e);
            })
            .join(",") +
          "]" +
          (s ? "," + s : "")
        );
      }
    }
    function ei(t, e) {
      for (var n = 0, r = 0; r < t.length; r++) {
        var i = t[r];
        if (1 === i.type) {
          if (
            ni(i) ||
            (i.ifConditions &&
              i.ifConditions.some(function (t) {
                return ni(t.block);
              }))
          ) {
            n = 2;
            break;
          }
          (e(i) ||
            (i.ifConditions &&
              i.ifConditions.some(function (t) {
                return e(t.block);
              }))) &&
            (n = 1);
        }
      }
      return n;
    }
    function ni(t) {
      return void 0 !== t.for || "template" === t.tag || "slot" === t.tag;
    }
    function ri(t, e) {
      return 1 === t.type
        ? Ur(t, e)
        : 3 === t.type && t.isComment
        ? oi(t)
        : ii(t);
    }
    function ii(t) {
      return (
        "_v(" + (2 === t.type ? t.expression : ui(JSON.stringify(t.text))) + ")"
      );
    }
    function oi(t) {
      return "_e('" + t.text + "')";
    }
    function ai(t, e) {
      var n = t.slotName || '"default"',
        r = ti(t, e),
        i = "_t(" + n + (r ? "," + r : ""),
        o =
          t.attrs &&
          "{" +
            t.attrs
              .map(function (t) {
                return gi(t.name) + ":" + t.value;
              })
              .join(",") +
            "}",
        a = t.attrsMap["v-bind"];
      return (
        (!o && !a) || r || (i += ",null"),
        o && (i += "," + o),
        a && (i += (o ? "" : ",null") + "," + a),
        i + ")"
      );
    }
    function si(t, e, n) {
      var r = e.inlineTemplate ? null : ti(e, n, !0);
      return "_c(" + t + "," + Wr(e, n) + (r ? "," + r : "") + ")";
    }
    function ci(t) {
      for (var e = "", n = 0; n < t.length; n++) {
        var r = t[n];
        e += '"' + r.name + '":' + ui(r.value) + ",";
      }
      return e.slice(0, -1);
    }
    function ui(t) {
      return t.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    function li(t, e) {
      try {
        return new Function(t);
      } catch (n) {
        return e.push({ err: n, code: t }), _;
      }
    }
    function fi(t) {
      var e = Object.create(null);
      return function (n, r, i) {
        var o = (r = r || {}).delimiters ? String(r.delimiters) + n : n;
        if (e[o]) return e[o];
        var a = t(n, r),
          s = {},
          c = [];
        return (
          (s.render = li(a.render, c)),
          (s.staticRenderFns = a.staticRenderFns.map(function (t) {
            return li(t, c);
          })),
          (e[o] = s)
        );
      };
    }
    function pi(t) {
      if (t.outerHTML) return t.outerHTML;
      var e = document.createElement("div");
      return e.appendChild(t.cloneNode(!0)), e.innerHTML;
    }
    var di = Object.prototype.toString,
      vi = f("slot,component", !0),
      hi = f("key,ref,slot,is"),
      mi = Object.prototype.hasOwnProperty,
      yi = /-(\w)/g,
      gi = v(function (t) {
        return t.replace(yi, function (t, e) {
          return e ? e.toUpperCase() : "";
        });
      }),
      _i = v(function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }),
      bi = /([^-])([A-Z])/g,
      $i = v(function (t) {
        return t.replace(bi, "$1-$2").replace(bi, "$1-$2").toLowerCase();
      }),
      Ci = function (t, e, n) {
        return !1;
      },
      wi = function (t) {
        return t;
      },
      xi = "data-server-rendered",
      Ai = ["component", "directive", "filter"],
      ki = [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeDestroy",
        "destroyed",
        "activated",
        "deactivated",
      ],
      Oi = {
        optionMergeStrategies: Object.create(null),
        silent: !1,
        productionTip: !1,
        devtools: !1,
        performance: !1,
        errorHandler: null,
        warnHandler: null,
        ignoredElements: [],
        keyCodes: Object.create(null),
        isReservedTag: Ci,
        isReservedAttr: Ci,
        isUnknownElement: Ci,
        getTagNamespace: _,
        parsePlatformTagName: wi,
        mustUseProp: Ci,
        _lifecycleHooks: ki,
      },
      Si = Object.freeze({}),
      Ti = /[^\w.$]/,
      Ei = _,
      ji = "__proto__" in {},
      Ni = "undefined" != typeof window,
      Li = Ni && window.navigator.userAgent.toLowerCase(),
      Ii = Li && /msie|trident/.test(Li),
      Mi = Li && Li.indexOf("msie 9.0") > 0,
      Di = Li && Li.indexOf("edge/") > 0,
      Pi = Li && Li.indexOf("android") > 0,
      Fi = Li && /iphone|ipad|ipod|ios/.test(Li),
      Ri = Li && /chrome\/\d+/.test(Li) && !Di,
      Hi = {}.watch,
      Bi = !1;
    if (Ni)
      try {
        var Ui = {};
        Object.defineProperty(Ui, "passive", {
          get: function () {
            Bi = !0;
          },
        }),
          window.addEventListener("test-passive", null, Ui);
      } catch (t) {}
    var Vi,
      zi,
      Ki = function () {
        return (
          void 0 === Vi &&
            (Vi =
              !Ni &&
              "undefined" != typeof global &&
              "server" === global.process.env.VUE_ENV),
          Vi
        );
      },
      Ji = Ni && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
      qi =
        "undefined" != typeof Symbol &&
        O(Symbol) &&
        "undefined" != typeof Reflect &&
        O(Reflect.ownKeys),
      Wi = (function () {
        function t() {
          r = !1;
          var t = n.slice(0);
          n.length = 0;
          for (var e = 0; e < t.length; e++) t[e]();
        }
        var e,
          n = [],
          r = !1;
        if ("undefined" != typeof Promise && O(Promise)) {
          var i = Promise.resolve(),
            o = function (t) {
              console.error(t);
            };
          e = function () {
            i.then(t).catch(o), Fi && setTimeout(_);
          };
        } else if (
          "undefined" == typeof MutationObserver ||
          (!O(MutationObserver) &&
            "[object MutationObserverConstructor]" !==
              MutationObserver.toString())
        )
          e = function () {
            setTimeout(t, 0);
          };
        else {
          var a = 1,
            s = new MutationObserver(t),
            c = document.createTextNode(String(a));
          s.observe(c, { characterData: !0 }),
            (e = function () {
              (a = (a + 1) % 2), (c.data = String(a));
            });
        }
        return function (t, i) {
          var o;
          if (
            (n.push(function () {
              if (t)
                try {
                  t.call(i);
                } catch (t) {
                  k(t, i, "nextTick");
                }
              else o && o(i);
            }),
            r || ((r = !0), e()),
            !t && "undefined" != typeof Promise)
          )
            return new Promise(function (t, e) {
              o = t;
            });
        };
      })();
    zi =
      "undefined" != typeof Set && O(Set)
        ? Set
        : (function () {
            function t() {
              this.set = Object.create(null);
            }
            return (
              (t.prototype.has = function (t) {
                return !0 === this.set[t];
              }),
              (t.prototype.add = function (t) {
                this.set[t] = !0;
              }),
              (t.prototype.clear = function () {
                this.set = Object.create(null);
              }),
              t
            );
          })();
    var Gi = 0,
      Zi = function () {
        (this.id = Gi++), (this.subs = []);
      };
    (Zi.prototype.addSub = function (t) {
      this.subs.push(t);
    }),
      (Zi.prototype.removeSub = function (t) {
        p(this.subs, t);
      }),
      (Zi.prototype.depend = function () {
        Zi.target && Zi.target.addDep(this);
      }),
      (Zi.prototype.notify = function () {
        for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++)
          t[e].update();
      }),
      (Zi.target = null);
    var Yi = [],
      Qi = Array.prototype,
      Xi = Object.create(Qi);
    ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
      function (t) {
        var e = Qi[t];
        x(Xi, t, function () {
          for (var n = [], r = arguments.length; r--; ) n[r] = arguments[r];
          var i,
            o = e.apply(this, n),
            a = this.__ob__;
          switch (t) {
            case "push":
            case "unshift":
              i = n;
              break;
            case "splice":
              i = n.slice(2);
          }
          return i && a.observeArray(i), a.dep.notify(), o;
        });
      }
    );
    var to = Object.getOwnPropertyNames(Xi),
      eo = { shouldConvert: !0 },
      no = function (t) {
        (this.value = t),
          (this.dep = new Zi()),
          (this.vmCount = 0),
          x(t, "__ob__", this),
          Array.isArray(t)
            ? ((ji ? E : j)(t, Xi, to), this.observeArray(t))
            : this.walk(t);
      };
    (no.prototype.walk = function (t) {
      for (var e = Object.keys(t), n = 0; n < e.length; n++)
        L(t, e[n], t[e[n]]);
    }),
      (no.prototype.observeArray = function (t) {
        for (var e = 0, n = t.length; e < n; e++) N(t[e]);
      });
    var ro = Oi.optionMergeStrategies;
    (ro.data = function (t, e, n) {
      return n
        ? F(t, e, n)
        : e && "function" != typeof e
        ? t
        : F.call(this, t, e);
    }),
      ki.forEach(function (t) {
        ro[t] = R;
      }),
      Ai.forEach(function (t) {
        ro[t + "s"] = H;
      }),
      (ro.watch = function (t, e) {
        if ((t === Hi && (t = void 0), e === Hi && (e = void 0), !e))
          return Object.create(t || null);
        if (!t) return e;
        var n = {};
        y(n, t);
        for (var r in e) {
          var i = n[r],
            o = e[r];
          i && !Array.isArray(i) && (i = [i]),
            (n[r] = i ? i.concat(o) : Array.isArray(o) ? o : [o]);
        }
        return n;
      }),
      (ro.props = ro.methods = ro.inject = ro.computed = function (t, e) {
        if (!e) return Object.create(t || null);
        if (!t) return e;
        var n = Object.create(null);
        return y(n, t), y(n, e), n;
      }),
      (ro.provide = F);
    var io = function (t, e) {
        return void 0 === e ? t : e;
      },
      oo = function (t, e, n, r, i, o, a, s) {
        (this.tag = t),
          (this.data = e),
          (this.children = n),
          (this.text = r),
          (this.elm = i),
          (this.ns = void 0),
          (this.context = o),
          (this.functionalContext = void 0),
          (this.key = e && e.key),
          (this.componentOptions = a),
          (this.componentInstance = void 0),
          (this.parent = void 0),
          (this.raw = !1),
          (this.isStatic = !1),
          (this.isRootInsert = !0),
          (this.isComment = !1),
          (this.isCloned = !1),
          (this.isOnce = !1),
          (this.asyncFactory = s),
          (this.asyncMeta = void 0),
          (this.isAsyncPlaceholder = !1);
      },
      ao = { child: {} };
    (ao.child.get = function () {
      return this.componentInstance;
    }),
      Object.defineProperties(oo.prototype, ao);
    var so,
      co = function (t) {
        void 0 === t && (t = "");
        var e = new oo();
        return (e.text = t), (e.isComment = !0), e;
      },
      uo = v(function (t) {
        var e = "&" === t.charAt(0),
          n = "~" === (t = e ? t.slice(1) : t).charAt(0),
          r = "!" === (t = n ? t.slice(1) : t).charAt(0);
        return (
          (t = r ? t.slice(1) : t), { name: t, once: n, capture: r, passive: e }
        );
      }),
      lo = null,
      fo = [],
      po = [],
      vo = {},
      ho = !1,
      mo = !1,
      yo = 0,
      go = 0,
      _o = function (t, e, n, r) {
        (this.vm = t),
          t._watchers.push(this),
          r
            ? ((this.deep = !!r.deep),
              (this.user = !!r.user),
              (this.lazy = !!r.lazy),
              (this.sync = !!r.sync))
            : (this.deep = this.user = this.lazy = this.sync = !1),
          (this.cb = n),
          (this.id = ++go),
          (this.active = !0),
          (this.dirty = this.lazy),
          (this.deps = []),
          (this.newDeps = []),
          (this.depIds = new zi()),
          (this.newDepIds = new zi()),
          (this.expression = ""),
          "function" == typeof e
            ? (this.getter = e)
            : ((this.getter = A(e)),
              this.getter || (this.getter = function () {})),
          (this.value = this.lazy ? void 0 : this.get());
      };
    (_o.prototype.get = function () {
      S(this);
      var t,
        e = this.vm;
      try {
        t = this.getter.call(e, e);
      } catch (t) {
        if (!this.user) throw t;
        k(t, e, 'getter for watcher "' + this.expression + '"');
      } finally {
        this.deep && Nt(t), T(), this.cleanupDeps();
      }
      return t;
    }),
      (_o.prototype.addDep = function (t) {
        var e = t.id;
        this.newDepIds.has(e) ||
          (this.newDepIds.add(e),
          this.newDeps.push(t),
          this.depIds.has(e) || t.addSub(this));
      }),
      (_o.prototype.cleanupDeps = function () {
        for (var t = this, e = this.deps.length; e--; ) {
          var n = t.deps[e];
          t.newDepIds.has(n.id) || n.removeSub(t);
        }
        var r = this.depIds;
        (this.depIds = this.newDepIds),
          (this.newDepIds = r),
          this.newDepIds.clear(),
          (r = this.deps),
          (this.deps = this.newDeps),
          (this.newDeps = r),
          (this.newDeps.length = 0);
      }),
      (_o.prototype.update = function () {
        this.lazy ? (this.dirty = !0) : this.sync ? this.run() : jt(this);
      }),
      (_o.prototype.run = function () {
        if (this.active) {
          var t = this.get();
          if (t !== this.value || o(t) || this.deep) {
            var e = this.value;
            if (((this.value = t), this.user))
              try {
                this.cb.call(this.vm, t, e);
              } catch (t) {
                k(t, this.vm, 'callback for watcher "' + this.expression + '"');
              }
            else this.cb.call(this.vm, t, e);
          }
        }
      }),
      (_o.prototype.evaluate = function () {
        (this.value = this.get()), (this.dirty = !1);
      }),
      (_o.prototype.depend = function () {
        for (var t = this, e = this.deps.length; e--; ) t.deps[e].depend();
      }),
      (_o.prototype.teardown = function () {
        var t = this;
        if (this.active) {
          this.vm._isBeingDestroyed || p(this.vm._watchers, this);
          for (var e = this.deps.length; e--; ) t.deps[e].removeSub(t);
          this.active = !1;
        }
      });
    var bo = new zi(),
      $o = { enumerable: !0, configurable: !0, get: _, set: _ },
      Co = { lazy: !0 },
      wo = {
        init: function (t, e, n, r) {
          if (!t.componentInstance || t.componentInstance._isDestroyed)
            (t.componentInstance = Yt(t, lo, n, r)).$mount(
              e ? t.elm : void 0,
              e
            );
          else if (t.data.keepAlive) {
            var i = t;
            wo.prepatch(i, i);
          }
        },
        prepatch: function (t, e) {
          var n = e.componentOptions;
          $t(
            (e.componentInstance = t.componentInstance),
            n.propsData,
            n.listeners,
            e,
            n.children
          );
        },
        insert: function (t) {
          var e = t.context,
            n = t.componentInstance;
          n._isMounted || ((n._isMounted = !0), At(n, "mounted")),
            t.data.keepAlive && (e._isMounted ? Tt(n) : wt(n, !0));
        },
        destroy: function (t) {
          var e = t.componentInstance;
          e._isDestroyed || (t.data.keepAlive ? xt(e, !0) : e.$destroy());
        },
      },
      xo = Object.keys(wo),
      Ao = 1,
      ko = 2,
      Oo = 0;
    !(function (t) {
      t.prototype._init = function (t) {
        var e = this;
        (e._uid = Oo++),
          (e._isVue = !0),
          t && t._isComponent
            ? he(e, t)
            : (e.$options = z(me(e.constructor), t || {}, e)),
          (e._renderProxy = e),
          (e._self = e),
          _t(e),
          pt(e),
          ve(e),
          At(e, "beforeCreate"),
          Jt(e),
          Mt(e),
          Kt(e),
          At(e, "created"),
          e.$options.el && e.$mount(e.$options.el);
      };
    })(_e),
      (function (t) {
        var e = {};
        e.get = function () {
          return this._data;
        };
        var n = {};
        (n.get = function () {
          return this._props;
        }),
          Object.defineProperty(t.prototype, "$data", e),
          Object.defineProperty(t.prototype, "$props", n),
          (t.prototype.$set = I),
          (t.prototype.$delete = M),
          (t.prototype.$watch = function (t, e, n) {
            var r = this;
            if (a(e)) return zt(r, t, e, n);
            (n = n || {}).user = !0;
            var i = new _o(r, t, e, n);
            return (
              n.immediate && e.call(r, i.value),
              function () {
                i.teardown();
              }
            );
          });
      })(_e),
      (function (t) {
        var e = /^hook:/;
        (t.prototype.$on = function (t, n) {
          var r = this,
            i = this;
          if (Array.isArray(t))
            for (var o = 0, a = t.length; o < a; o++) r.$on(t[o], n);
          else
            (i._events[t] || (i._events[t] = [])).push(n),
              e.test(t) && (i._hasHookEvent = !0);
          return i;
        }),
          (t.prototype.$once = function (t, e) {
            function n() {
              r.$off(t, n), e.apply(r, arguments);
            }
            var r = this;
            return (n.fn = e), r.$on(t, n), r;
          }),
          (t.prototype.$off = function (t, e) {
            var n = this,
              r = this;
            if (!arguments.length) return (r._events = Object.create(null)), r;
            if (Array.isArray(t)) {
              for (var i = 0, o = t.length; i < o; i++) n.$off(t[i], e);
              return r;
            }
            var a = r._events[t];
            if (!a) return r;
            if (1 === arguments.length) return (r._events[t] = null), r;
            for (var s, c = a.length; c--; )
              if ((s = a[c]) === e || s.fn === e) {
                a.splice(c, 1);
                break;
              }
            return r;
          }),
          (t.prototype.$emit = function (t) {
            var e = this,
              n = e._events[t];
            if (n) {
              n = n.length > 1 ? m(n) : n;
              for (var r = m(arguments, 1), i = 0, o = n.length; i < o; i++)
                try {
                  n[i].apply(e, r);
                } catch (n) {
                  k(n, e, 'event handler for "' + t + '"');
                }
            }
            return e;
          });
      })(_e),
      (function (t) {
        (t.prototype._update = function (t, e) {
          var n = this;
          n._isMounted && At(n, "beforeUpdate");
          var r = n.$el,
            i = n._vnode,
            o = lo;
          (lo = n),
            (n._vnode = t),
            i
              ? (n.$el = n.__patch__(i, t))
              : ((n.$el = n.__patch__(
                  n.$el,
                  t,
                  e,
                  !1,
                  n.$options._parentElm,
                  n.$options._refElm
                )),
                (n.$options._parentElm = n.$options._refElm = null)),
            (lo = o),
            r && (r.__vue__ = null),
            n.$el && (n.$el.__vue__ = n),
            n.$vnode &&
              n.$parent &&
              n.$vnode === n.$parent._vnode &&
              (n.$parent.$el = n.$el);
        }),
          (t.prototype.$forceUpdate = function () {
            var t = this;
            t._watcher && t._watcher.update();
          }),
          (t.prototype.$destroy = function () {
            var t = this;
            if (!t._isBeingDestroyed) {
              At(t, "beforeDestroy"), (t._isBeingDestroyed = !0);
              var e = t.$parent;
              !e ||
                e._isBeingDestroyed ||
                t.$options.abstract ||
                p(e.$children, t),
                t._watcher && t._watcher.teardown();
              for (var n = t._watchers.length; n--; ) t._watchers[n].teardown();
              t._data.__ob__ && t._data.__ob__.vmCount--,
                (t._isDestroyed = !0),
                t.__patch__(t._vnode, null),
                At(t, "destroyed"),
                t.$off(),
                t.$el && (t.$el.__vue__ = null);
            }
          });
      })(_e),
      (function (t) {
        (t.prototype.$nextTick = function (t) {
          return Wi(t, this);
        }),
          (t.prototype._render = function () {
            var t = this,
              e = t.$options,
              n = e.render,
              r = e.staticRenderFns,
              i = e._parentVnode;
            if (t._isMounted)
              for (var o in t.$slots) t.$slots[o] = Q(t.$slots[o]);
            (t.$scopedSlots = (i && i.data.scopedSlots) || Si),
              r && !t._staticTrees && (t._staticTrees = []),
              (t.$vnode = i);
            var a;
            try {
              a = n.call(t._renderProxy, t.$createElement);
            } catch (e) {
              k(e, t, "render function"), (a = t._vnode);
            }
            return a instanceof oo || (a = co()), (a.parent = i), a;
          }),
          (t.prototype._o = le),
          (t.prototype._n = l),
          (t.prototype._s = u),
          (t.prototype._l = ie),
          (t.prototype._t = oe),
          (t.prototype._q = b),
          (t.prototype._i = $),
          (t.prototype._m = ue),
          (t.prototype._f = ae),
          (t.prototype._k = se),
          (t.prototype._b = ce),
          (t.prototype._v = Z),
          (t.prototype._e = co),
          (t.prototype._u = gt),
          (t.prototype._g = de);
      })(_e);
    var So = [String, RegExp, Array],
      To = {
        KeepAlive: {
          name: "keep-alive",
          abstract: !0,
          props: { include: So, exclude: So },
          created: function () {
            this.cache = Object.create(null);
          },
          destroyed: function () {
            var t = this;
            for (var e in t.cache) Te(t.cache[e]);
          },
          watch: {
            include: function (t) {
              Se(this.cache, this._vnode, function (e) {
                return Oe(t, e);
              });
            },
            exclude: function (t) {
              Se(this.cache, this._vnode, function (e) {
                return !Oe(t, e);
              });
            },
          },
          render: function () {
            var t = ft(this.$slots.default),
              e = t && t.componentOptions;
            if (e) {
              var n = ke(e);
              if (
                n &&
                ((this.include && !Oe(this.include, n)) ||
                  (this.exclude && Oe(this.exclude, n)))
              )
                return t;
              var r =
                null == t.key
                  ? e.Ctor.cid + (e.tag ? "::" + e.tag : "")
                  : t.key;
              this.cache[r]
                ? (t.componentInstance = this.cache[r].componentInstance)
                : (this.cache[r] = t),
                (t.data.keepAlive = !0);
            }
            return t;
          },
        },
      };
    !(function (t) {
      var e = {};
      (e.get = function () {
        return Oi;
      }),
        Object.defineProperty(t, "config", e),
        (t.util = { warn: Ei, extend: y, mergeOptions: z, defineReactive: L }),
        (t.set = I),
        (t.delete = M),
        (t.nextTick = Wi),
        (t.options = Object.create(null)),
        Ai.forEach(function (e) {
          t.options[e + "s"] = Object.create(null);
        }),
        (t.options._base = t),
        y(t.options.components, To),
        be(t),
        $e(t),
        Ce(t),
        Ae(t);
    })(_e),
      Object.defineProperty(_e.prototype, "$isServer", { get: Ki }),
      Object.defineProperty(_e.prototype, "$ssrContext", {
        get: function () {
          return this.$vnode && this.$vnode.ssrContext;
        },
      }),
      (_e.version = "2.4.0");
    var Eo,
      jo,
      No,
      Lo,
      Io,
      Mo,
      Do,
      Po,
      Fo,
      Ro = f("style,class"),
      Ho = f("input,textarea,option,select"),
      Bo = function (t, e, n) {
        return (
          ("value" === n && Ho(t) && "button" !== e) ||
          ("selected" === n && "option" === t) ||
          ("checked" === n && "input" === t) ||
          ("muted" === n && "video" === t)
        );
      },
      Uo = f("contenteditable,draggable,spellcheck"),
      Vo = f(
        "allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"
      ),
      zo = "http://www.w3.org/1999/xlink",
      Ko = function (t) {
        return ":" === t.charAt(5) && "xlink" === t.slice(0, 5);
      },
      Jo = function (t) {
        return Ko(t) ? t.slice(6, t.length) : "";
      },
      qo = function (t) {
        return null == t || !1 === t;
      },
      Wo = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML",
      },
      Go = f(
        "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"
      ),
      Zo = f(
        "svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",
        !0
      ),
      Yo = function (t) {
        return Go(t) || Zo(t);
      },
      Qo = Object.create(null),
      Xo = Object.freeze({
        createElement: function (t, e) {
          var n = document.createElement(t);
          return "select" !== t
            ? n
            : (e.data &&
                e.data.attrs &&
                void 0 !== e.data.attrs.multiple &&
                n.setAttribute("multiple", "multiple"),
              n);
        },
        createElementNS: function (t, e) {
          return document.createElementNS(Wo[t], e);
        },
        createTextNode: function (t) {
          return document.createTextNode(t);
        },
        createComment: function (t) {
          return document.createComment(t);
        },
        insertBefore: function (t, e, n) {
          t.insertBefore(e, n);
        },
        removeChild: function (t, e) {
          t.removeChild(e);
        },
        appendChild: function (t, e) {
          t.appendChild(e);
        },
        parentNode: function (t) {
          return t.parentNode;
        },
        nextSibling: function (t) {
          return t.nextSibling;
        },
        tagName: function (t) {
          return t.tagName;
        },
        setTextContent: function (t, e) {
          t.textContent = e;
        },
        setAttribute: function (t, e, n) {
          t.setAttribute(e, n);
        },
      }),
      ta = {
        create: function (t, e) {
          Re(e);
        },
        update: function (t, e) {
          t.data.ref !== e.data.ref && (Re(t, !0), Re(e));
        },
        destroy: function (t) {
          Re(t, !0);
        },
      },
      ea = new oo("", {}, []),
      na = ["create", "activate", "update", "remove", "destroy"],
      ra = {
        create: Ve,
        update: Ve,
        destroy: function (t) {
          Ve(t, ea);
        },
      },
      ia = Object.create(null),
      oa = [ta, ra],
      aa = { create: We, update: We },
      sa = { create: Ze, update: Ze },
      ca = /[\w).+\-_$\]]/,
      ua = "__r",
      la = "__c",
      fa = { create: wn, update: wn },
      pa = { create: xn, update: xn },
      da = v(function (t) {
        var e = {},
          n = /;(?![^(]*\))/g,
          r = /:(.+)/;
        return (
          t.split(n).forEach(function (t) {
            if (t) {
              var n = t.split(r);
              n.length > 1 && (e[n[0].trim()] = n[1].trim());
            }
          }),
          e
        );
      }),
      va = /^--/,
      ha = /\s*!important$/,
      ma = function (t, e, n) {
        if (va.test(e)) t.style.setProperty(e, n);
        else if (ha.test(n))
          t.style.setProperty(e, n.replace(ha, ""), "important");
        else {
          var r = ga(e);
          if (Array.isArray(n))
            for (var i = 0, o = n.length; i < o; i++) t.style[r] = n[i];
          else t.style[r] = n;
        }
      },
      ya = ["Webkit", "Moz", "ms"],
      ga = v(function (t) {
        if (
          ((Fo = Fo || document.createElement("div").style),
          "filter" !== (t = gi(t)) && t in Fo)
        )
          return t;
        for (
          var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0;
          n < ya.length;
          n++
        ) {
          var r = ya[n] + e;
          if (r in Fo) return r;
        }
      }),
      _a = { create: jn, update: jn },
      ba = v(function (t) {
        return {
          enterClass: t + "-enter",
          enterToClass: t + "-enter-to",
          enterActiveClass: t + "-enter-active",
          leaveClass: t + "-leave",
          leaveToClass: t + "-leave-to",
          leaveActiveClass: t + "-leave-active",
        };
      }),
      $a = Ni && !Mi,
      Ca = "transition",
      wa = "animation",
      xa = "transition",
      Aa = "transitionend",
      ka = "animation",
      Oa = "animationend";
    $a &&
      (void 0 === window.ontransitionend &&
        void 0 !== window.onwebkittransitionend &&
        ((xa = "WebkitTransition"), (Aa = "webkitTransitionEnd")),
      void 0 === window.onanimationend &&
        void 0 !== window.onwebkitanimationend &&
        ((ka = "WebkitAnimation"), (Oa = "webkitAnimationEnd")));
    var Sa =
        Ni && window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : setTimeout,
      Ta = /\b(transform|all)(,|$)/,
      Ea = (function (r) {
        function o(t) {
          return new oo(E.tagName(t).toLowerCase(), {}, [], void 0, t);
        }
        function a(t, e) {
          function n() {
            0 == --n.listeners && s(t);
          }
          return (n.listeners = e), n;
        }
        function s(t) {
          var n = E.parentNode(t);
          e(n) && E.removeChild(n, t);
        }
        function c(t, r, i, o, a) {
          if (((t.isRootInsert = !a), !u(t, r, i, o))) {
            var s = t.data,
              c = t.children,
              l = t.tag;
            e(l)
              ? ((t.elm = t.ns
                  ? E.createElementNS(t.ns, l)
                  : E.createElement(l, t)),
                y(t),
                v(t, c, r),
                e(s) && m(t, r),
                d(i, t.elm, o))
              : n(t.isComment)
              ? ((t.elm = E.createComment(t.text)), d(i, t.elm, o))
              : ((t.elm = E.createTextNode(t.text)), d(i, t.elm, o));
          }
        }
        function u(t, r, i, o) {
          var a = t.data;
          if (e(a)) {
            var s = e(t.componentInstance) && a.keepAlive;
            if (
              (e((a = a.hook)) && e((a = a.init)) && a(t, !1, i, o),
              e(t.componentInstance))
            )
              return l(t, r), n(s) && p(t, r, i, o), !0;
          }
        }
        function l(t, n) {
          e(t.data.pendingInsert) &&
            (n.push.apply(n, t.data.pendingInsert),
            (t.data.pendingInsert = null)),
            (t.elm = t.componentInstance.$el),
            h(t) ? (m(t, n), y(t)) : (Re(t), n.push(t));
        }
        function p(t, n, r, i) {
          for (var o, a = t; a.componentInstance; )
            if (
              ((a = a.componentInstance._vnode),
              e((o = a.data)) && e((o = o.transition)))
            ) {
              for (o = 0; o < S.activate.length; ++o) S.activate[o](ea, a);
              n.push(a);
              break;
            }
          d(r, t.elm, i);
        }
        function d(t, n, r) {
          e(t) &&
            (e(r)
              ? r.parentNode === t && E.insertBefore(t, n, r)
              : E.appendChild(t, n));
        }
        function v(t, e, n) {
          if (Array.isArray(e))
            for (var r = 0; r < e.length; ++r) c(e[r], n, t.elm, null, !0);
          else i(t.text) && E.appendChild(t.elm, E.createTextNode(t.text));
        }
        function h(t) {
          for (; t.componentInstance; ) t = t.componentInstance._vnode;
          return e(t.tag);
        }
        function m(t, n) {
          for (var r = 0; r < S.create.length; ++r) S.create[r](ea, t);
          e((k = t.data.hook)) &&
            (e(k.create) && k.create(ea, t), e(k.insert) && n.push(t));
        }
        function y(t) {
          for (var n, r = t; r; )
            e((n = r.context)) &&
              e((n = n.$options._scopeId)) &&
              E.setAttribute(t.elm, n, ""),
              (r = r.parent);
          e((n = lo)) &&
            n !== t.context &&
            e((n = n.$options._scopeId)) &&
            E.setAttribute(t.elm, n, "");
        }
        function g(t, e, n, r, i, o) {
          for (; r <= i; ++r) c(n[r], o, t, e);
        }
        function _(t) {
          var n,
            r,
            i = t.data;
          if (e(i))
            for (
              e((n = i.hook)) && e((n = n.destroy)) && n(t), n = 0;
              n < S.destroy.length;
              ++n
            )
              S.destroy[n](t);
          if (e((n = t.children)))
            for (r = 0; r < t.children.length; ++r) _(t.children[r]);
        }
        function b(t, n, r, i) {
          for (; r <= i; ++r) {
            var o = n[r];
            e(o) && (e(o.tag) ? ($(o), _(o)) : s(o.elm));
          }
        }
        function $(t, n) {
          if (e(n) || e(t.data)) {
            var r,
              i = S.remove.length + 1;
            for (
              e(n) ? (n.listeners += i) : (n = a(t.elm, i)),
                e((r = t.componentInstance)) &&
                  e((r = r._vnode)) &&
                  e(r.data) &&
                  $(r, n),
                r = 0;
              r < S.remove.length;
              ++r
            )
              S.remove[r](t, n);
            e((r = t.data.hook)) && e((r = r.remove)) ? r(t, n) : n();
          } else s(t.elm);
        }
        function C(n, r, i, o, a) {
          for (
            var s,
              u,
              l,
              f = 0,
              p = 0,
              d = r.length - 1,
              v = r[0],
              h = r[d],
              m = i.length - 1,
              y = i[0],
              _ = i[m],
              $ = !a;
            f <= d && p <= m;

          )
            t(v)
              ? (v = r[++f])
              : t(h)
              ? (h = r[--d])
              : He(v, y)
              ? (w(v, y, o), (v = r[++f]), (y = i[++p]))
              : He(h, _)
              ? (w(h, _, o), (h = r[--d]), (_ = i[--m]))
              : He(v, _)
              ? (w(v, _, o),
                $ && E.insertBefore(n, v.elm, E.nextSibling(h.elm)),
                (v = r[++f]),
                (_ = i[--m]))
              : He(h, y)
              ? (w(h, y, o),
                $ && E.insertBefore(n, h.elm, v.elm),
                (h = r[--d]),
                (y = i[++p]))
              : (t(s) && (s = Ue(r, f, d)),
                t((u = e(y.key) ? s[y.key] : null))
                  ? (c(y, o, n, v.elm), (y = i[++p]))
                  : He((l = r[u]), y)
                  ? (w(l, y, o),
                    (r[u] = void 0),
                    $ && E.insertBefore(n, l.elm, v.elm),
                    (y = i[++p]))
                  : (c(y, o, n, v.elm), (y = i[++p])));
          f > d
            ? g(n, t(i[m + 1]) ? null : i[m + 1].elm, i, p, m, o)
            : p > m && b(n, r, f, d);
        }
        function w(r, i, o, a) {
          if (r !== i) {
            var s = (i.elm = r.elm);
            if (n(r.isAsyncPlaceholder))
              e(i.asyncFactory.resolved)
                ? A(r.elm, i, o)
                : (i.isAsyncPlaceholder = !0);
            else if (
              n(i.isStatic) &&
              n(r.isStatic) &&
              i.key === r.key &&
              (n(i.isCloned) || n(i.isOnce))
            )
              i.componentInstance = r.componentInstance;
            else {
              var c,
                u = i.data;
              e(u) && e((c = u.hook)) && e((c = c.prepatch)) && c(r, i);
              var l = r.children,
                f = i.children;
              if (e(u) && h(i)) {
                for (c = 0; c < S.update.length; ++c) S.update[c](r, i);
                e((c = u.hook)) && e((c = c.update)) && c(r, i);
              }
              t(i.text)
                ? e(l) && e(f)
                  ? l !== f && C(s, l, f, o, a)
                  : e(f)
                  ? (e(r.text) && E.setTextContent(s, ""),
                    g(s, null, f, 0, f.length - 1, o))
                  : e(l)
                  ? b(s, l, 0, l.length - 1)
                  : e(r.text) && E.setTextContent(s, "")
                : r.text !== i.text && E.setTextContent(s, i.text),
                e(u) && e((c = u.hook)) && e((c = c.postpatch)) && c(r, i);
            }
          }
        }
        function x(t, r, i) {
          if (n(i) && e(t.parent)) t.parent.data.pendingInsert = r;
          else for (var o = 0; o < r.length; ++o) r[o].data.hook.insert(r[o]);
        }
        function A(t, r, i) {
          if (n(r.isComment) && e(r.asyncFactory))
            return (r.elm = t), (r.isAsyncPlaceholder = !0), !0;
          r.elm = t;
          var o = r.tag,
            a = r.data,
            s = r.children;
          if (
            e(a) &&
            (e((k = a.hook)) && e((k = k.init)) && k(r, !0),
            e((k = r.componentInstance)))
          )
            return l(r, i), !0;
          if (e(o)) {
            if (e(s))
              if (t.hasChildNodes()) {
                for (var c = !0, u = t.firstChild, f = 0; f < s.length; f++) {
                  if (!u || !A(u, s[f], i)) {
                    c = !1;
                    break;
                  }
                  u = u.nextSibling;
                }
                if (!c || u) return !1;
              } else v(r, s, i);
            if (e(a))
              for (var p in a)
                if (!j(p)) {
                  m(r, i);
                  break;
                }
          } else t.data !== r.text && (t.data = r.text);
          return !0;
        }
        var k,
          O,
          S = {},
          T = r.modules,
          E = r.nodeOps;
        for (k = 0; k < na.length; ++k)
          for (S[na[k]] = [], O = 0; O < T.length; ++O)
            e(T[O][na[k]]) && S[na[k]].push(T[O][na[k]]);
        var j = f("attrs,style,class,staticClass,staticStyle,key");
        return function (r, i, a, s, u, l) {
          if (!t(i)) {
            var f = !1,
              p = [];
            if (t(r)) (f = !0), c(i, p, u, l);
            else {
              var d = e(r.nodeType);
              if (!d && He(r, i)) w(r, i, p, s);
              else {
                if (d) {
                  if (
                    (1 === r.nodeType &&
                      r.hasAttribute(xi) &&
                      (r.removeAttribute(xi), (a = !0)),
                    n(a) && A(r, i, p))
                  )
                    return x(i, p, !0), r;
                  r = o(r);
                }
                var v = r.elm,
                  m = E.parentNode(v);
                if (
                  (c(i, p, v._leaveCb ? null : m, E.nextSibling(v)),
                  e(i.parent))
                ) {
                  for (var y = i.parent; y; ) (y.elm = i.elm), (y = y.parent);
                  if (h(i))
                    for (var g = 0; g < S.create.length; ++g)
                      S.create[g](ea, i.parent);
                }
                e(m) ? b(m, [r], 0, 0) : e(r.tag) && _(r);
              }
            }
            return x(i, p, f), i.elm;
          }
          e(r) && _(r);
        };
      })({
        nodeOps: Xo,
        modules: [
          aa,
          sa,
          fa,
          pa,
          _a,
          Ni
            ? {
                create: Jn,
                activate: Jn,
                remove: function (t, e) {
                  !0 !== t.data.show ? Vn(t, e) : e();
                },
              }
            : {},
        ].concat(oa),
      }),
      ja = f("text,number,password,search,email,tel,url");
    Mi &&
      document.addEventListener("selectionchange", function () {
        var t = document.activeElement;
        t && t.vmodel && Qn(t, "input");
      });
    var Na = {
        model: {
          inserted: function (t, e, n) {
            if ("select" === n.tag) {
              var r = function () {
                qn(t, e, n.context);
              };
              r(), (Ii || Di) && setTimeout(r, 0);
            } else
              ("textarea" === n.tag || ja(t.type)) &&
                ((t._vModifiers = e.modifiers),
                e.modifiers.lazy ||
                  (t.addEventListener("change", Yn),
                  Pi ||
                    (t.addEventListener("compositionstart", Zn),
                    t.addEventListener("compositionend", Yn)),
                  Mi && (t.vmodel = !0)));
          },
          componentUpdated: function (t, e, n) {
            "select" === n.tag &&
              (qn(t, e, n.context),
              (t.multiple
                ? e.value.some(function (e) {
                    return Wn(e, t.options);
                  })
                : e.value !== e.oldValue && Wn(e.value, t.options)) &&
                Qn(t, "change"));
          },
        },
        show: {
          bind: function (t, e, n) {
            var r = e.value,
              i = (n = Xn(n)).data && n.data.transition,
              o = (t.__vOriginalDisplay =
                "none" === t.style.display ? "" : t.style.display);
            r && i && !Mi
              ? ((n.data.show = !0),
                Un(n, function () {
                  t.style.display = o;
                }))
              : (t.style.display = r ? o : "none");
          },
          update: function (t, e, n) {
            var r = e.value;
            r !== e.oldValue &&
              ((n = Xn(n)).data && n.data.transition && !Mi
                ? ((n.data.show = !0),
                  r
                    ? Un(n, function () {
                        t.style.display = t.__vOriginalDisplay;
                      })
                    : Vn(n, function () {
                        t.style.display = "none";
                      }))
                : (t.style.display = r ? t.__vOriginalDisplay : "none"));
          },
          unbind: function (t, e, n, r, i) {
            i || (t.style.display = t.__vOriginalDisplay);
          },
        },
      },
      La = {
        name: String,
        appear: Boolean,
        css: Boolean,
        mode: String,
        type: String,
        enterClass: String,
        leaveClass: String,
        enterToClass: String,
        leaveToClass: String,
        enterActiveClass: String,
        leaveActiveClass: String,
        appearClass: String,
        appearActiveClass: String,
        appearToClass: String,
        duration: [Number, String, Object],
      },
      Ia = {
        name: "transition",
        props: La,
        abstract: !0,
        render: function (t) {
          var e = this,
            n = this.$options._renderChildren;
          if (
            n &&
            (n = n.filter(function (t) {
              return t.tag || or(t);
            })).length
          ) {
            var r = this.mode,
              o = n[0];
            if (rr(this.$vnode)) return o;
            var a = tr(o);
            if (!a) return o;
            if (this._leaving) return nr(t, o);
            var s = "__transition-" + this._uid + "-";
            a.key =
              null == a.key
                ? a.isComment
                  ? s + "comment"
                  : s + a.tag
                : i(a.key)
                ? 0 === String(a.key).indexOf(s)
                  ? a.key
                  : s + a.key
                : a.key;
            var c = ((a.data || (a.data = {})).transition = er(this)),
              u = this._vnode,
              l = tr(u);
            if (
              (a.data.directives &&
                a.data.directives.some(function (t) {
                  return "show" === t.name;
                }) &&
                (a.data.show = !0),
              l && l.data && !ir(a, l) && !or(l))
            ) {
              var f = l && (l.data.transition = y({}, c));
              if ("out-in" === r)
                return (
                  (this._leaving = !0),
                  et(f, "afterLeave", function () {
                    (e._leaving = !1), e.$forceUpdate();
                  }),
                  nr(t, o)
                );
              if ("in-out" === r) {
                if (or(a)) return u;
                var p,
                  d = function () {
                    p();
                  };
                et(c, "afterEnter", d),
                  et(c, "enterCancelled", d),
                  et(f, "delayLeave", function (t) {
                    p = t;
                  });
              }
            }
            return o;
          }
        },
      },
      Ma = y({ tag: String, moveClass: String }, La);
    delete Ma.mode;
    var Da = {
      Transition: Ia,
      TransitionGroup: {
        props: Ma,
        render: function (t) {
          for (
            var e = this.tag || this.$vnode.data.tag || "span",
              n = Object.create(null),
              r = (this.prevChildren = this.children),
              i = this.$slots.default || [],
              o = (this.children = []),
              a = er(this),
              s = 0;
            s < i.length;
            s++
          ) {
            var c = i[s];
            c.tag &&
              null != c.key &&
              0 !== String(c.key).indexOf("__vlist") &&
              (o.push(c),
              (n[c.key] = c),
              ((c.data || (c.data = {})).transition = a));
          }
          if (r) {
            for (var u = [], l = [], f = 0; f < r.length; f++) {
              var p = r[f];
              (p.data.transition = a),
                (p.data.pos = p.elm.getBoundingClientRect()),
                n[p.key] ? u.push(p) : l.push(p);
            }
            (this.kept = t(e, null, u)), (this.removed = l);
          }
          return t(e, null, o);
        },
        beforeUpdate: function () {
          this.__patch__(this._vnode, this.kept, !1, !0),
            (this._vnode = this.kept);
        },
        updated: function () {
          var t = this.prevChildren,
            e = this.moveClass || (this.name || "v") + "-move";
          if (t.length && this.hasMove(t[0].elm, e)) {
            t.forEach(ar), t.forEach(sr), t.forEach(cr);
            document.body.offsetHeight;
            t.forEach(function (t) {
              if (t.data.moved) {
                var n = t.elm,
                  r = n.style;
                Dn(n, e),
                  (r.transform = r.WebkitTransform = r.transitionDuration = ""),
                  n.addEventListener(
                    Aa,
                    (n._moveCb = function t(r) {
                      (r && !/transform$/.test(r.propertyName)) ||
                        (n.removeEventListener(Aa, t),
                        (n._moveCb = null),
                        Pn(n, e));
                    })
                  );
              }
            });
          }
        },
        methods: {
          hasMove: function (t, e) {
            if (!$a) return !1;
            if (this._hasMove) return this._hasMove;
            var n = t.cloneNode();
            t._transitionClasses &&
              t._transitionClasses.forEach(function (t) {
                Ln(n, t);
              }),
              Nn(n, e),
              (n.style.display = "none"),
              this.$el.appendChild(n);
            var r = Rn(n);
            return this.$el.removeChild(n), (this._hasMove = r.hasTransform);
          },
        },
      },
    };
    (_e.config.mustUseProp = Bo),
      (_e.config.isReservedTag = Yo),
      (_e.config.isReservedAttr = Ro),
      (_e.config.getTagNamespace = Pe),
      (_e.config.isUnknownElement = function (t) {
        if (!Ni) return !0;
        if (Yo(t)) return !1;
        if (((t = t.toLowerCase()), null != Qo[t])) return Qo[t];
        var e = document.createElement(t);
        return t.indexOf("-") > -1
          ? (Qo[t] =
              e.constructor === window.HTMLUnknownElement ||
              e.constructor === window.HTMLElement)
          : (Qo[t] = /HTMLUnknownElement/.test(e.toString()));
      }),
      y(_e.options.directives, Na),
      y(_e.options.components, Da),
      (_e.prototype.__patch__ = Ni ? Ea : _),
      (_e.prototype.$mount = function (t, e) {
        return (t = t && Ni ? Fe(t) : void 0), bt(this, t, e);
      }),
      setTimeout(function () {
        Oi.devtools && Ji && Ji.emit("init", _e);
      }, 0);
    var Pa,
      Fa =
        !!Ni &&
        (function (t, e) {
          var n = document.createElement("div");
          return (
            (n.innerHTML = '<div a="' + t + '"/>'), n.innerHTML.indexOf(e) > 0
          );
        })("\n", "&#10;"),
      Ra = /\{\{((?:.|\n)+?)\}\}/g,
      Ha = /[-.*+?^${}()|[\]\/\\]/g,
      Ba = v(function (t) {
        var e = t[0].replace(Ha, "\\$&"),
          n = t[1].replace(Ha, "\\$&");
        return new RegExp(e + "((?:.|\\n)+?)" + n, "g");
      }),
      Ua = [
        {
          staticKeys: ["staticClass"],
          transformNode: function (t, e) {
            e.warn;
            var n = sn(t, "class");
            n && (t.staticClass = JSON.stringify(n));
            var r = an(t, "class", !1);
            r && (t.classBinding = r);
          },
          genData: function (t) {
            var e = "";
            return (
              t.staticClass && (e += "staticClass:" + t.staticClass + ","),
              t.classBinding && (e += "class:" + t.classBinding + ","),
              e
            );
          },
        },
        {
          staticKeys: ["staticStyle"],
          transformNode: function (t, e) {
            e.warn;
            var n = sn(t, "style");
            n && (t.staticStyle = JSON.stringify(da(n)));
            var r = an(t, "style", !1);
            r && (t.styleBinding = r);
          },
          genData: function (t) {
            var e = "";
            return (
              t.staticStyle && (e += "staticStyle:" + t.staticStyle + ","),
              t.styleBinding && (e += "style:(" + t.styleBinding + "),"),
              e
            );
          },
        },
      ],
      Va = {
        model: function (t, e, n) {
          Do = n;
          var r = e.value,
            i = e.modifiers,
            o = t.tag,
            a = t.attrsMap.type;
          if (t.component) return cn(t, r, i), !1;
          if ("select" === o) gn(t, r, i);
          else if ("input" === o && "checkbox" === a) mn(t, r, i);
          else if ("input" === o && "radio" === a) yn(t, r, i);
          else if ("input" === o || "textarea" === o) _n(t, r, i);
          else if (!Oi.isReservedTag(o)) return cn(t, r, i), !1;
          return !0;
        },
        text: function (t, e) {
          e.value && en(t, "textContent", "_s(" + e.value + ")");
        },
        html: function (t, e) {
          e.value && en(t, "innerHTML", "_s(" + e.value + ")");
        },
      },
      za = f(
        "area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"
      ),
      Ka = f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
      Ja = f(
        "address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"
      ),
      qa = {
        expectHTML: !0,
        modules: Ua,
        directives: Va,
        isPreTag: function (t) {
          return "pre" === t;
        },
        isUnaryTag: za,
        mustUseProp: Bo,
        canBeLeftOpenTag: Ka,
        isReservedTag: Yo,
        getTagNamespace: Pe,
        staticKeys: (function (t) {
          return t
            .reduce(function (t, e) {
              return t.concat(e.staticKeys || []);
            }, [])
            .join(",");
        })(Ua),
      },
      Wa = {
        decode: function (t) {
          return (
            (Pa = Pa || document.createElement("div")),
            (Pa.innerHTML = t),
            Pa.textContent
          );
        },
      },
      Ga = /([^\s"'<>/=]+)/,
      Za = /(?:=)/,
      Ya = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^\s"'=<>`]+)/.source],
      Qa = new RegExp(
        "^\\s*" +
          Ga.source +
          "(?:\\s*(" +
          Za.source +
          ")\\s*(?:" +
          Ya.join("|") +
          "))?"
      ),
      Xa = "[a-zA-Z_][\\w\\-\\.]*",
      ts = "((?:" + Xa + "\\:)?" + Xa + ")",
      es = new RegExp("^<" + ts),
      ns = /^\s*(\/?)>/,
      rs = new RegExp("^<\\/" + ts + "[^>]*>"),
      is = /^<!DOCTYPE [^>]+>/i,
      os = /^<!--/,
      as = /^<!\[/,
      ss = !1;
    "x".replace(/x(.)?/g, function (t, e) {
      ss = "" === e;
    });
    var cs,
      us,
      ls,
      fs,
      ps,
      ds,
      vs,
      hs,
      ms,
      ys,
      gs = f("script,style,textarea", !0),
      _s = {},
      bs = {
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&amp;": "&",
        "&#10;": "\n",
      },
      $s = /&(?:lt|gt|quot|amp);/g,
      Cs = /&(?:lt|gt|quot|amp|#10);/g,
      ws = f("pre,textarea", !0),
      xs = function (t, e) {
        return t && ws(t) && "\n" === e[0];
      },
      As = /^@|^v-on:/,
      ks = /^v-|^@|^:/,
      Os = /(.*?)\s+(?:in|of)\s+(.*)/,
      Ss = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,
      Ts = /:(.*)$/,
      Es = /^:|^v-bind:/,
      js = /\.[^.]+/g,
      Ns = v(Wa.decode),
      Ls = /^xmlns:NS\d+/,
      Is = /^NS\d+:/,
      Ms = v(function (t) {
        return f(
          "type,tag,attrsList,attrsMap,plain,parent,children,attrs" +
            (t ? "," + t : "")
        );
      }),
      Ds = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,
      Ps = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,
      Fs = {
        esc: 27,
        tab: 9,
        enter: 13,
        space: 32,
        up: 38,
        left: 37,
        right: 39,
        down: 40,
        delete: [8, 46],
      },
      Rs = function (t) {
        return "if(" + t + ")return null;";
      },
      Hs = {
        stop: "$event.stopPropagation();",
        prevent: "$event.preventDefault();",
        self: Rs("$event.target !== $event.currentTarget"),
        ctrl: Rs("!$event.ctrlKey"),
        shift: Rs("!$event.shiftKey"),
        alt: Rs("!$event.altKey"),
        meta: Rs("!$event.metaKey"),
        left: Rs("'button' in $event && $event.button !== 0"),
        middle: Rs("'button' in $event && $event.button !== 1"),
        right: Rs("'button' in $event && $event.button !== 2"),
      },
      Bs = {
        on: function (t, e) {
          t.wrapListeners = function (t) {
            return "_g(" + t + "," + e.value + ")";
          };
        },
        bind: function (t, e) {
          t.wrapData = function (n) {
            return (
              "_b(" +
              n +
              ",'" +
              t.tag +
              "'," +
              e.value +
              "," +
              (e.modifiers && e.modifiers.prop ? "true" : "false") +
              (e.modifiers && e.modifiers.sync ? ",true" : "") +
              ")"
            );
          };
        },
        cloak: _,
      },
      Us = function (t) {
        (this.options = t),
          (this.warn = t.warn || Xe),
          (this.transforms = tn(t.modules, "transformCode")),
          (this.dataGenFns = tn(t.modules, "genData")),
          (this.directives = y(y({}, Bs), t.directives));
        var e = t.isReservedTag || Ci;
        (this.maybeComponent = function (t) {
          return !e(t.tag);
        }),
          (this.onceId = 0),
          (this.staticRenderFns = []);
      },
      Vs = (function (t) {
        return function (e) {
          function n(n, r) {
            var i = Object.create(e),
              o = [],
              a = [];
            if (
              ((i.warn = function (t, e) {
                (e ? a : o).push(t);
              }),
              r)
            ) {
              r.modules && (i.modules = (e.modules || []).concat(r.modules)),
                r.directives &&
                  (i.directives = y(Object.create(e.directives), r.directives));
              for (var s in r)
                "modules" !== s && "directives" !== s && (i[s] = r[s]);
            }
            var c = t(n, i);
            return (c.errors = o), (c.tips = a), c;
          }
          return { compile: n, compileToFunctions: fi(n) };
        };
      })(function (t, e) {
        var n = pr(t.trim(), e);
        Nr(n, e);
        var r = Br(n, e);
        return { ast: n, render: r.render, staticRenderFns: r.staticRenderFns };
      })(qa).compileToFunctions,
      zs = v(function (t) {
        var e = Fe(t);
        return e && e.innerHTML;
      }),
      Ks = _e.prototype.$mount;
    return (
      (_e.prototype.$mount = function (t, e) {
        if (
          (t = t && Fe(t)) === document.body ||
          t === document.documentElement
        )
          return this;
        var n = this.$options;
        if (!n.render) {
          var r = n.template;
          if (r)
            if ("string" == typeof r) "#" === r.charAt(0) && (r = zs(r));
            else {
              if (!r.nodeType) return this;
              r = r.innerHTML;
            }
          else t && (r = pi(t));
          if (r) {
            var i = Vs(
                r,
                {
                  shouldDecodeNewlines: Fa,
                  delimiters: n.delimiters,
                  comments: n.comments,
                },
                this
              ),
              o = i.render,
              a = i.staticRenderFns;
            (n.render = o), (n.staticRenderFns = a);
          }
        }
        return Ks.call(this, t, e);
      }),
      (_e.compile = Vs),
      _e
    );
  });
  var VueResize = (function (e) {
    "use strict";
    var t = void 0;
    function i() {
      i.init ||
        ((i.init = !0),
        (t =
          -1 !==
          (function () {
            var e = window.navigator.userAgent,
              t = e.indexOf("MSIE ");
            if (t > 0)
              return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
            if (e.indexOf("Trident/") > 0) {
              var i = e.indexOf("rv:");
              return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
            }
            var n = e.indexOf("Edge/");
            return n > 0
              ? parseInt(e.substring(n + 5, e.indexOf(".", n)), 10)
              : -1;
          })()));
    }
    var n = {
      render: function () {
        var e = this.$createElement;
        return (this._self._c || e)("div", {
          staticClass: "resize-observer",
          attrs: { tabindex: "-1" },
        });
      },
      staticRenderFns: [],
      _scopeId: "data-v-b329ee4c",
      name: "resize-observer",
      methods: {
        compareAndNotify: function () {
          (this._w === this.$el.offsetWidth &&
            this._h === this.$el.offsetHeight) ||
            ((this._w = this.$el.offsetWidth),
            (this._h = this.$el.offsetHeight),
            this.$emit("notify"));
        },
        addResizeHandlers: function () {
          this._resizeObject.contentDocument.defaultView.addEventListener(
            "resize",
            this.compareAndNotify
          ),
            this.compareAndNotify();
        },
        removeResizeHandlers: function () {
          this._resizeObject &&
            this._resizeObject.onload &&
            (!t &&
              this._resizeObject.contentDocument &&
              this._resizeObject.contentDocument.defaultView.removeEventListener(
                "resize",
                this.compareAndNotify
              ),
            delete this._resizeObject.onload);
        },
      },
      mounted: function () {
        var e = this;
        i(),
          this.$nextTick(function () {
            (e._w = e.$el.offsetWidth), (e._h = e.$el.offsetHeight);
          });
        var n = document.createElement("object");
        (this._resizeObject = n),
          n.setAttribute("aria-hidden", "true"),
          n.setAttribute("tabindex", -1),
          (n.onload = this.addResizeHandlers),
          (n.type = "text/html"),
          t && this.$el.appendChild(n),
          (n.data = "about:blank"),
          t || this.$el.appendChild(n);
      },
      beforeDestroy: function () {
        this.removeResizeHandlers();
      },
    };
    function s(e) {
      e.component("resize-observer", n), e.component("ResizeObserver", n);
    }
    var r = { version: "0.4.5", install: s },
      o = null;
    return (
      "undefined" != typeof window
        ? (o = window.Vue)
        : "undefined" != typeof global && (o = global.Vue),
      o && o.use(r),
      (e.install = s),
      (e.ResizeObserver = n),
      (e.default = r),
      e
    );
  })({});
  // Pure-js replacement for $.ready
  // by John Friend, https://github.com/jfriend00/docReady
  // MIT License

  (function (funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
      if (!readyFired) {
        // this must be set to true before we start calling callbacks
        readyFired = true;
        for (var i = 0; i < readyList.length; i++) {
          // if a callback here happens to add new ready handlers,
          // the docReady() function will see that it already fired
          // and will schedule the callback to run right after
          // this event loop finishes so all handlers will still execute
          // in order and no new ones will be added to the readyList
          // while we are processing the list
          readyList[i].fn.call(window, readyList[i].ctx);
        }
        // allow any closures held by these functions to free
        readyList = [];
      }
    }

    function readyStateChange() {
      if (document.readyState === "complete") {
        ready();
      }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
      if (typeof callback !== "function") {
        throw new TypeError("callback for docReady(fn) must be a function");
      }
      // if ready has already fired, then just schedule the callback
      // to fire asynchronously, but right away
      if (readyFired) {
        setTimeout(function () {
          callback(context);
        }, 1);
        return;
      } else {
        // add the function and context to the list
        readyList.push({ fn: callback, ctx: context });
      }
      // if document already ready to go, schedule the ready function to run
      // IE only safe when readyState is "complete", others safe when readyState is "interactive"
      if (
        document.readyState === "complete" ||
        (!document.attachEvent && document.readyState === "interactive")
      ) {
        setTimeout(ready, 1);
      } else if (!readyEventHandlersInstalled) {
        // otherwise if we don't have event handlers installed, install them
        if (document.addEventListener) {
          // first choice is DOMContentLoaded event
          document.addEventListener("DOMContentLoaded", ready, false);
          // backup is window load event
          window.addEventListener("load", ready, false);
        } else {
          // must be IE
          document.attachEvent("onreadystatechange", readyStateChange);
          window.attachEvent("onload", ready);
        }
        readyEventHandlersInstalled = true;
      }
    };
  })("docReady", window);
  // modify this previous line to pass in your own method name
  // and object for the method to be attached to
  /*global django*/
  var roundTo = function (n, digits) {
    if (digits === undefined) {
      digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
  };

  var floatformat = function (val, places) {
    "use strict";
    if (places === undefined) {
      places = 2;
    }
    if (typeof val === "string") {
      val = parseFloat(val);
    }
    var parts = roundTo(val, places).toFixed(places).split(".");
    if (places === 0) {
      return parts[0];
    }
    parts[0] = parts[0].replace(
      new RegExp(
        "\\B(?=(\\d{" + django.get_format("NUMBER_GROUPING") + "})+(?!\\d))",
        "g"
      ),
      django.get_format("THOUSAND_SEPARATOR")
    );
    return parts[0] + django.get_format("DECIMAL_SEPARATOR") + parts[1];
  };

  var autofloatformat = function (val, places) {
    "use strict";
    if (val == roundTo(val, 0)) {
      places = 0;
    }
    return floatformat(val, places);
  };
  /*global siteglobals, module, lang, django*/
  /* PRETIX WIDGET BEGINS HERE */
  /* This is embedded in an isolation wrapper that exposes siteglobals as the global
       scope. */

  window.PretixWidget = {
    build_widgets: true,
    widget_data: {
      referer: location.href,
    },
  };

  var Vue = module.exports;
  Vue.component("resize-observer", VueResize.ResizeObserver);

  var strings = {
    sold_out: django.pgettext("widget", "Sold out"),
    buy: django.pgettext("widget", "Buy"),
    register: django.pgettext("widget", "Register"),
    reserved: django.pgettext("widget", "Reserved"),
    free: django.pgettext("widget", "FREE"),
    price_from: django.pgettext("widget", "from %(currency)s %(price)s"),
    tax_incl: django.pgettext("widget", "incl. %(rate)s% %(taxname)s"),
    tax_plus: django.pgettext("widget", "plus %(rate)s% %(taxname)s"),
    tax_incl_mixed: django.pgettext("widget", "incl. taxes"),
    tax_plus_mixed: django.pgettext("widget", "plus taxes"),
    quota_left: django.pgettext("widget", "currently available: %s"),
    voucher_required: django.pgettext(
      "widget",
      "Only available with a voucher"
    ),
    order_min: django.pgettext("widget", "minimum amount to order: %s"),
    exit: django.pgettext("widget", "Close ticket shop"),
    loading_error: django.pgettext(
      "widget",
      "The ticket shop could not be loaded."
    ),
    cart_error: django.pgettext(
      "widget",
      "The cart could not be created. Please try again later"
    ),
    waiting_list: django.pgettext("widget", "Waiting list"),
    cart_exists: django.pgettext(
      "widget",
      "You currently have an active cart for this event. If you select more" +
        " products, they will be added to your existing cart."
    ),
    resume_checkout: django.pgettext("widget", "Resume checkout"),
    redeem_voucher: django.pgettext("widget", "Redeem a voucher"),
    redeem: django.pgettext("widget", "Redeem"),
    voucher_code: django.pgettext("widget", "Voucher code"),
    close: django.pgettext("widget", "Close"),
    continue: django.pgettext("widget", "Continue"),
    variations: django.pgettext("widget", "See variations"),
    back_to_list: django.pgettext("widget", "Choose a different event"),
    back_to_dates: django.pgettext("widget", "Choose a different date"),
    back: django.pgettext("widget", "Back"),
    next_month: django.pgettext("widget", "Next month"),
    previous_month: django.pgettext("widget", "Previous month"),
    next_week: django.pgettext("widget", "Next week"),
    previous_week: django.pgettext("widget", "Previous week"),
    show_seating: django.pgettext("widget", "Open seat selection"),
    days: {
      MO: django.gettext("Mo"),
      TU: django.gettext("Tu"),
      WE: django.gettext("We"),
      TH: django.gettext("Th"),
      FR: django.gettext("Fr"),
      SA: django.gettext("Sa"),
      SU: django.gettext("Su"),
    },
    months: {
      "01": django.gettext("January"),
      "02": django.gettext("February"),
      "03": django.gettext("March"),
      "04": django.gettext("April"),
      "05": django.gettext("May"),
      "06": django.gettext("June"),
      "07": django.gettext("July"),
      "08": django.gettext("August"),
      "09": django.gettext("September"),
      10: django.gettext("October"),
      11: django.gettext("November"),
      12: django.gettext("December"),
    },
  };

  var setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift() || null;
    else return null;
  };

  var padNumber = function (number, size) {
    var s = String(number);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  };

  var getISOWeeks = function (y) {
    var d, isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52;
  };

  /* HTTP API Call helpers */
  var api = {
    _getXHR: function () {
      try {
        return new window.XMLHttpRequest();
      } catch (e) {
        // explicitly bubble up the exception if not found
        return new window.ActiveXObject("Microsoft.XMLHTTP");
      }
    },

    _getJSON: function (endpoint, callback, err_callback) {
      var xhr = api._getXHR();
      xhr.open("GET", endpoint, true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText), xhr);
          } else {
            err_callback(xhr, e);
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
        err_callback(xhr, e);
      };
      xhr.send(null);
    },

    _postFormJSON: function (endpoint, form, callback, err_callback) {
      var params = [].filter
        .call(form.elements, function (el) {
          return (el.type !== "checkbox" && el.type !== "radio") || el.checked;
        })
        .filter(function (el) {
          return !!el.name && !!el.value;
        })
        .filter(function (el) {
          return !el.disabled;
        })
        .map(function (el) {
          return (
            encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value)
          );
        })
        .join("&");

      var xhr = api._getXHR();
      xhr.open("POST", endpoint, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
          } else {
            err_callback(xhr, e);
          }
        }
      };
      xhr.onerror = function (e) {
        err_callback(xhr, e);
      };
      xhr.send(params);
    },
  };

  var makeid = function (length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  var site_is_secure = function () {
    return /https.*/.test(document.location.protocol);
  };

  var widget_id = makeid(16);

  /* Vue Components */
  Vue.component("availbox", {
    template:
      '<div class="pretix-widget-availability-box">' +
      '<div class="pretix-widget-availability-unavailable" v-if="require_voucher">' +
      "<small>" +
      strings.voucher_required +
      "</small>" +
      "</div>" +
      '<div class="pretix-widget-availability-unavailable"' +
      '       v-if="!require_voucher && avail[0] < 100 && avail[0] > 10">' +
      strings.reserved +
      "</div>" +
      '<div class="pretix-widget-availability-gone" ' +
      '       v-if="!require_voucher && avail[0] <= 10">' +
      strings.sold_out +
      "</div>" +
      '<div class="pretix-widget-waiting-list-link"' +
      '     v-if="waiting_list_show">' +
      '<a :href="waiting_list_url" target="_blank" @click="$root.open_link_in_frame">' +
      strings.waiting_list +
      "</a>" +
      "</div>" +
      '<div class="pretix-widget-availability-available" v-if="!require_voucher && avail[0] === 100">' +
      '<label class="pretix-widget-item-count-single-label" v-if="order_max === 1">' +
      '<input type="checkbox" value="1" :checked="!!amount_selected" @change="amount_selected = $event.target.checked" :name="input_name">' +
      "</label>" +
      '<input type="number" class="pretix-widget-item-count-multiple" placeholder="0" min="0"' +
      '       v-model="amount_selected" :max="order_max" :name="input_name"' +
      '       v-if="order_max !== 1">' +
      "</div>" +
      "</div>",
    props: {
      item: Object,
      variation: Object,
    },
    mounted: function () {
      if (this.item.has_variations) {
        this.$set(this.variation, "amount_selected", 0);
      } else {
        // Automatically set the only available item to be selected.
        this.$set(
          this.item,
          "amount_selected",
          this.$root.itemnum === 1 && !this.$root.has_seating_plan ? 1 : 0
        );
      }
      this.$root.$emit("amounts_changed");
    },
    computed: {
      require_voucher: function () {
        return this.item.require_voucher && !this.$root.voucher_code;
      },
      amount_selected: {
        get: function () {
          return this.item.has_variations
            ? this.variation.amount_selected
            : this.item.amount_selected;
        },
        set: function (value) {
          // Unary operator to force boolean to integer conversion, as the HTML form submission
          // needs the value to be integer for all products.
          value = +value;
          if (this.item.has_variations) {
            this.variation.amount_selected = value;
          } else {
            this.item.amount_selected = value;
          }
          this.$root.$emit("amounts_changed");
        },
      },
      input_name: function () {
        if (this.item.has_variations) {
          return "variation_" + this.item.id + "_" + this.variation.id;
        } else {
          return "item_" + this.item.id;
        }
      },
      order_max: function () {
        return this.item.has_variations
          ? this.variation.order_max
          : this.item.order_max;
      },
      avail: function () {
        return this.item.has_variations
          ? this.variation.avail
          : this.item.avail;
      },
      waiting_list_show: function () {
        return (
          this.avail[0] < 100 &&
          this.$root.waiting_list_enabled &&
          this.item.allow_waitinglist
        );
      },
      waiting_list_url: function () {
        var u;
        if (this.item.has_variations) {
          u =
            this.$root.target_url +
            "w/" +
            widget_id +
            "/waitinglist/?item=" +
            this.item.id +
            "&var=" +
            this.variation.id +
            "&widget_data=" +
            encodeURIComponent(this.$root.widget_data_json);
        } else {
          u =
            this.$root.target_url +
            "w/" +
            widget_id +
            "/waitinglist/?item=" +
            this.item.id +
            "&widget_data=" +
            encodeURIComponent(this.$root.widget_data_json);
        }
        if (this.$root.subevent) {
          u += "&subevent=" + this.$root.subevent;
        }
        return u;
      },
    },
  });
  Vue.component("pricebox", {
    template:
      '<div class="pretix-widget-pricebox">' +
      '<span v-if="!free_price && !original_price">{{ priceline }}</span>' +
      '<span v-if="!free_price && original_price">' +
      '<del class="pretix-widget-pricebox-original-price">{{ original_line }}</del> ' +
      '<ins class="pretix-widget-pricebox-new-price">{{ priceline }}</ins></span>' +
      '<div v-if="free_price">' +
      "{{ $root.currency }} " +
      '<input type="number" class="pretix-widget-pricebox-price-input" placeholder="0" ' +
      '       :min="display_price_nonlocalized" :value="display_price_nonlocalized" :name="field_name"' +
      '       step="any">' +
      "</div>" +
      "<small class=\"pretix-widget-pricebox-tax\" v-if=\"price.rate != '0.00' && price.gross != '0.00'\">" +
      "{{ taxline }}" +
      "</small>" +
      "</div>",
    props: {
      price: Object,
      free_price: Boolean,
      field_name: String,
      original_price: String,
    },
    computed: {
      display_price: function () {
        if (this.$root.display_net_prices) {
          return floatformat(parseFloat(this.price.net), 2);
        } else {
          return floatformat(parseFloat(this.price.gross), 2);
        }
      },
      display_price_nonlocalized: function () {
        if (this.$root.display_net_prices) {
          return parseFloat(this.price.net).toFixed(2);
        } else {
          return parseFloat(this.price.gross).toFixed(2);
        }
      },
      original_line: function () {
        return (
          this.$root.currency +
          " " +
          floatformat(parseFloat(this.original_price), 2)
        );
      },
      priceline: function () {
        if (this.price.gross === "0.00") {
          return strings.free;
        } else {
          return this.$root.currency + " " + this.display_price;
        }
      },
      taxline: function () {
        if (this.$root.display_net_prices) {
          if (this.price.includes_mixed_tax_rate) {
            return strings.tax_plus_mixed;
          } else {
            return django.interpolate(
              strings.tax_plus,
              {
                rate: autofloatformat(this.price.rate, 2),
                taxname: this.price.name,
              },
              true
            );
          }
        } else {
          if (this.price.includes_mixed_tax_rate) {
            return strings.tax_incl_mixed;
          } else {
            return django.interpolate(
              strings.tax_incl,
              {
                rate: autofloatformat(this.price.rate, 2),
                taxname: this.price.name,
              },
              true
            );
          }
        }
      },
    },
  });
  Vue.component("variation", {
    template:
      '<div class="pretix-widget-variation">' +
      '<div class="pretix-widget-item-row">' +
      '<div class="pretix-widget-item-info-col">' +
      '<div class="pretix-widget-item-title-and-description">' +
      '<strong class="pretix-widget-item-title">{{ variation.value }}</strong>' +
      '<div class="pretix-widget-item-description" v-if="variation.description" v-html="variation.description"></div>' +
      '<p class="pretix-widget-item-meta" ' +
      '   v-if="!variation.has_variations && variation.avail[1] !== null && variation.avail[0] === 100">' +
      "<small>{{ quota_left_str }}</small>" +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="pretix-widget-item-price-col">' +
      '<pricebox :price="variation.price" :free_price="item.free_price" :original_price="orig_price"' +
      "          :field_name=\"'price_' + item.id + '_' + variation.id\" v-if=\"$root.showPrices\">" +
      "</pricebox>" +
      '<span v-if="!$root.showPrices">&nbsp;</span>' +
      "</div>" +
      '<div class="pretix-widget-item-availability-col">' +
      '<availbox :item="item" :variation="variation"></availbox>' +
      "</div>" +
      '<div class="pretix-widget-clear"></div>' +
      "</div>" +
      "</div>",
    props: {
      variation: Object,
      item: Object,
    },
    computed: {
      orig_price: function () {
        if (this.variation.original_price) {
          return this.variation.original_price;
        }
        return this.item.original_price;
      },
      quota_left_str: function () {
        return django.interpolate(strings["quota_left"], [
          this.variation.avail[1],
        ]);
      },
    },
  });
  Vue.component("item", {
    template:
      '<div v-bind:class="classObject">' +
      '<div class="pretix-widget-item-row pretix-widget-main-item-row">' +
      '<div class="pretix-widget-item-info-col">' +
      '<img :src="item.picture" v-if="item.picture" class="pretix-widget-item-picture">' +
      '<div class="pretix-widget-item-title-and-description">' +
      '<a v-if="item.has_variations && show_toggle" class="pretix-widget-item-title" href="#"' +
      '   @click.prevent="expand">' +
      "{{ item.name }}" +
      "</a>" +
      '<strong v-else class="pretix-widget-item-title">{{ item.name }}</strong>' +
      '<div class="pretix-widget-item-description" v-if="item.description" v-html="item.description"></div>' +
      '<p class="pretix-widget-item-meta" v-if="item.order_min && item.order_min > 1">' +
      "<small>{{ min_order_str }}</small>" +
      "</p>" +
      '<p class="pretix-widget-item-meta" ' +
      '    v-if="!item.has_variations && item.avail[1] !== null && item.avail[0] === 100">' +
      "<small>{{ quota_left_str }}</small>" +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="pretix-widget-item-price-col">' +
      '<pricebox :price="item.price" :free_price="item.free_price" v-if="!item.has_variations && $root.showPrices"' +
      '          :field_name="\'price_\' + item.id" :original_price="item.original_price">' +
      "</pricebox>" +
      '<div class="pretix-widget-pricebox" v-if="item.has_variations && $root.showPrices">{{ pricerange }}</div>' +
      '<span v-if="!$root.showPrices">&nbsp;</span>' +
      "</div>" +
      '<div class="pretix-widget-item-availability-col">' +
      '<a v-if="show_toggle" href="#" @click.prevent="expand">' +
      strings.variations +
      "</a>" +
      '<availbox v-if="!item.has_variations" :item="item"></availbox>' +
      "</div>" +
      '<div class="pretix-widget-clear"></div>' +
      "</div>" +
      '<div :class="varClasses" v-if="item.has_variations">' +
      '<variation v-for="variation in item.variations" :variation="variation" :item="item" :key="variation.id">' +
      "</variation>" +
      "</div>" +
      "</div>",
    props: {
      item: Object,
    },
    data: function () {
      return {
        expanded: this.$root.show_variations_expanded,
      };
    },
    methods: {
      expand: function () {
        this.expanded = !this.expanded;
      },
    },
    computed: {
      classObject: function () {
        return {
          "pretix-widget-item": true,
          "pretix-widget-item-with-picture": !!this.item.picture,
          "pretix-widget-item-with-variations": this.item.has_variations,
        };
      },
      varClasses: function () {
        return {
          "pretix-widget-item-variations": true,
          "pretix-widget-item-variations-expanded": this.expanded,
        };
      },
      min_order_str: function () {
        return django.interpolate(strings["order_min"], [this.item.order_min]);
      },
      quota_left_str: function () {
        return django.interpolate(strings["quota_left"], [this.item.avail[1]]);
      },
      show_toggle: function () {
        return this.item.has_variations && !this.$root.show_variations_expanded;
      },
      pricerange: function () {
        if (this.item.free_price) {
          return django.interpolate(
            strings.price_from,
            {
              currency: this.$root.currency,
              price: floatformat(this.item.min_price, 2),
            },
            true
          );
        } else if (this.item.min_price !== this.item.max_price) {
          return (
            this.$root.currency +
            " " +
            floatformat(this.item.min_price, 2) +
            " â€“ " +
            floatformat(this.item.max_price, 2)
          );
        } else if (
          this.item.min_price === "0.00" &&
          this.item.max_price === "0.00"
        ) {
          return strings.free;
        } else {
          return (
            this.$root.currency + " " + floatformat(this.item.min_price, 2)
          );
        }
      },
    },
  });
  Vue.component("category", {
    template:
      '<div class="pretix-widget-category">' +
      '<h3 class="pretix-widget-category-name" v-if="category.name">{{ category.name }}</h3>' +
      '<div class="pretix-widget-category-description" v-if="category.description" v-html="category.description">' +
      "</div>" +
      '<div class="pretix-widget-category-items">' +
      '<item v-for="item in category.items" :item="item" :key="item.id"></item>' +
      "</div>" +
      "</div>",
    props: {
      category: Object,
    },
  });

  var shared_methods = {
    buy: function (event) {
      if (this.$root.useIframe) {
        if (event) {
          event.preventDefault();
        }
      } else {
        return;
      }
      if (this.$root.is_button && this.$root.items.length === 0) {
        if (this.$root.voucher_code) {
          this.voucher_open(this.$root.voucher_code);
        } else {
          this.resume();
        }
      } else {
        var url = this.$root.formAction + "&locale=" + lang + "&ajax=1";
        this.$root.overlay.frame_loading = true;

        this.async_task_interval = 100;
        var form = this.$refs.form;
        if (form === undefined) {
          form = this.$refs.formcomp.$refs.form;
        }
        api._postFormJSON(
          url,
          form,
          this.buy_callback,
          this.buy_error_callback
        );
      }
    },
    buy_error_callback: function (xhr, data) {
      if (xhr.status === 405 && typeof xhr.responseURL !== "undefined") {
        // Likely a redirect!
        this.$root.target_url = xhr.responseURL.substr(
          0,
          xhr.responseURL.indexOf("/cart/add") - 18
        );
        this.$root.overlay.frame_loading = false;
        this.buy();
        return;
      }
      this.$root.overlay.error_message = strings["cart_error"];
      this.$root.overlay.frame_loading = false;
    },
    buy_check_error_callback: function (xhr, data) {
      if (xhr.status == 200 || (xhr.status >= 400 && xhr.status < 500)) {
        this.$root.overlay.error_message = strings["cart_error"];
        this.$root.overlay.frame_loading = false;
      } else {
        this.async_task_timeout = window.setTimeout(this.buy_check, 1000);
      }
    },
    buy_callback: function (data) {
      if (data.redirect) {
        var iframe = this.$root.overlay.$children[0].$refs["frame-container"]
          .children[0];
        if (data.cart_id) {
          this.$root.cart_id = data.cart_id;
          setCookie(this.$root.cookieName, data.cart_id, 30);
        }
        if (data.redirect.substr(0, 1) === "/") {
          data.redirect =
            this.$root.target_url.replace(/^([^\/]+:\/\/[^\/]+)\/.*$/, "$1") +
            data.redirect;
        }
        var url = data.redirect;
        if (url.indexOf("?")) {
          url =
            url +
            "&iframe=1&locale=" +
            lang +
            "&take_cart_id=" +
            this.$root.cart_id;
        } else {
          url =
            url +
            "?iframe=1&locale=" +
            lang +
            "&take_cart_id=" +
            this.$root.cart_id;
        }
        if (data.success === false) {
          url = url.replace(/checkout\/start/g, "");
          this.$root.overlay.error_message = data.message;
          if (data.has_cart) {
            this.$root.overlay.error_url_after = url;
          }
          this.$root.overlay.frame_loading = false;
        } else {
          iframe.src = url;
        }
      } else {
        this.async_task_id = data.async_id;
        if (data.check_url) {
          this.async_task_check_url =
            this.$root.target_url.replace(/^([^\/]+:\/\/[^\/]+)\/.*$/, "$1") +
            data.check_url;
        }
        this.async_task_timeout = window.setTimeout(
          this.buy_check,
          this.async_task_interval
        );
        this.async_task_interval = 250;
      }
    },
    buy_check: function () {
      api._getJSON(
        this.async_task_check_url,
        this.buy_callback,
        this.buy_check_error_callback
      );
    },
    redeem: function (event) {
      if (this.$root.useIframe) {
        event.preventDefault();
      } else {
        return;
      }
      var redirect_url =
        this.$root.voucherFormTarget +
        "&voucher=" +
        encodeURIComponent(this.voucher) +
        "&subevent=" +
        this.$root.subevent;
      if (this.$root.widget_data) {
        redirect_url +=
          "&widget_data=" + encodeURIComponent(this.$root.widget_data_json);
      }
      var iframe = this.$root.overlay.$children[0].$refs["frame-container"]
        .children[0];
      this.$root.overlay.frame_loading = true;
      iframe.src = redirect_url;
    },
    voucher_open: function (voucher) {
      var redirect_url;
      redirect_url =
        this.$root.voucherFormTarget +
        "&voucher=" +
        encodeURIComponent(voucher);
      if (this.$root.widget_data) {
        redirect_url +=
          "&widget_data=" + encodeURIComponent(this.$root.widget_data_json);
      }
      if (this.$root.useIframe) {
        var iframe = this.$root.overlay.$children[0].$refs["frame-container"]
          .children[0];
        this.$root.overlay.frame_loading = true;
        iframe.src = redirect_url;
      } else {
        window.open(redirect_url);
      }
    },
    resume: function () {
      var redirect_url;
      redirect_url =
        this.$root.target_url + "w/" + widget_id + "/?iframe=1&locale=" + lang;
      if (this.$root.cart_id) {
        redirect_url += "&take_cart_id=" + this.$root.cart_id;
      }
      if (this.$root.widget_data) {
        redirect_url +=
          "&widget_data=" + encodeURIComponent(this.$root.widget_data_json);
      }
      if (this.$root.useIframe) {
        var iframe = this.$root.overlay.$children[0].$refs["frame-container"]
          .children[0];
        this.$root.overlay.frame_loading = true;
        iframe.src = redirect_url;
      } else {
        window.open(redirect_url);
      }
    },
    handleResize: function () {
      this.mobile = this.$refs.wrapper.clientWidth <= 800;
    },
  };

  var shared_widget_data = function () {
    return {
      async_task_id: null,
      async_task_check_url: null,
      async_task_timeout: null,
      async_task_interval: 100,
      voucher: null,
      mobile: false,
    };
  };

  var shared_loading_fragment =
    '<div class="pretix-widget-loading" v-show="$root.loading > 0">' +
    '<svg width="128" height="128" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="pretix-widget-primary-color" d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>' +
    "</div>";

  var shared_iframe_fragment =
    '<div :class="frameClasses">' +
    '<div class="pretix-widget-frame-loading" v-show="$root.frame_loading">' +
    '<svg width="256" height="256" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="pretix-widget-primary-color" d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>' +
    "</div>" +
    '<div class="pretix-widget-frame-inner" ref="frame-container" v-show="$root.frame_shown">' +
    '<iframe frameborder="0" width="650px" height="650px" @load="iframeLoaded" ' +
    '        :name="$root.parent.widget_id" src="about:blank" v-once>' +
    "Please enable frames in your browser!" +
    "</iframe>" +
    '<div class="pretix-widget-frame-close"><a href="#" @click.prevent="close">X</a></div>' +
    "</div>" +
    "</div>";

  var shared_alert_fragment =
    '<div :class="alertClasses">' +
    '<transition name="bounce">' +
    '<div class="pretix-widget-alert-box" v-if="$root.error_message">' +
    "<p>{{ $root.error_message }}</p>" +
    '<p><button v-if="$root.error_url_after" @click.prevent="errorContinue">' +
    strings.continue +
    "</button>" +
    '<button v-else @click.prevent="errorClose">' +
    strings.close +
    "</button></p>" +
    "</div>" +
    "</transition>" +
    '<svg width="64" height="64" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" class="pretix-widget-alert-icon"><path style="fill:#ffffff;" d="M 599.86438,303.72882 H 1203.5254 V 1503.4576 H 599.86438 Z" /><path class="pretix-widget-primary-color" d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zm128 1247v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22-9.5t9-23.5zm-2-344l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10 18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z"/></svg>' +
    "</div>";

  Vue.component("pretix-overlay", {
    template:
      '<div class="pretix-widget-overlay">' +
      shared_iframe_fragment +
      shared_alert_fragment +
      "</div>",
    computed: {
      frameClasses: function () {
        return {
          "pretix-widget-frame-holder": true,
          "pretix-widget-frame-shown":
            this.$root.frame_shown || this.$root.frame_loading,
        };
      },
      alertClasses: function () {
        return {
          "pretix-widget-alert-holder": true,
          "pretix-widget-alert-shown": this.$root.error_message,
        };
      },
    },
    methods: {
      errorClose: function () {
        this.$root.error_message = null;
        this.$root.error_url_after = null;
      },
      errorContinue: function () {
        var iframe = this.$refs["frame-container"].children[0];
        iframe.src = this.$root.error_url_after;
        this.$root.frame_loading = true;
        this.$root.error_message = null;
        this.$root.error_url_after = null;
      },
      close: function () {
        this.$root.frame_shown = false;
        this.$root.parent.frame_dismissed = true;
        this.$root.parent.reload();
      },
      iframeLoaded: function () {
        if (this.$root.frame_loading) {
          this.$root.frame_loading = false;
          this.$root.frame_shown = true;
        }
      },
    },
  });

  Vue.component("pretix-widget-event-form", {
    template:
      '<div class="pretix-widget-event-form">' +
      '<div class="pretix-widget-event-list-back" v-if="$root.events || $root.weeks || $root.days">' +
      '<a href="#" @click.prevent="back_to_list" v-if="!$root.subevent">&lsaquo; ' +
      strings["back_to_list"] +
      "</a>" +
      '<a href="#" @click.prevent="back_to_list" v-if="$root.subevent">&lsaquo; ' +
      strings["back_to_dates"] +
      "</a>" +
      "</div>" +
      '<div class="pretix-widget-event-header" v-if="$root.events || $root.weeks || $root.days">' +
      "<strong>{{ $root.name }}</strong>" +
      "</div>" +
      '<div class="pretix-widget-event-details" v-if="($root.events || $root.weeks || $root.days) && $root.date_range">' +
      "{{ $root.date_range }}" +
      "</div>" +
      '<form method="post" :action="$root.formAction" ref="form" :target="$root.formTarget">' +
      '<input type="hidden" name="_voucher_code" :value="$root.voucher_code" v-if="$root.voucher_code">' +
      '<input type="hidden" name="subevent" :value="$root.subevent" />' +
      '<input type="hidden" name="widget_data" :value="$root.widget_data_json" />' +
      '<div class="pretix-widget-error-message" v-if="$root.error">{{ $root.error }}</div>' +
      '<div class="pretix-widget-info-message pretix-widget-clickable"' +
      '     v-if="$root.cart_exists">' +
      '<button @click.prevent="$parent.resume" class="pretix-widget-resume-button" type="button">' +
      strings["resume_checkout"] +
      "</button>" +
      strings["cart_exists"] +
      '<div class="pretix-widget-clear"></div>' +
      "</div>" +
      '<div class="pretix-widget-seating-link-wrapper" v-if="this.$root.has_seating_plan">' +
      '<button class="pretix-widget-seating-link" @click.prevent="$root.startseating">' +
      strings["show_seating"] +
      "</button>" +
      "</div>" +
      '<category v-for="category in this.$root.categories" :category="category" :key="category.id"></category>' +
      '<div class="pretix-widget-action" v-if="$root.display_add_to_cart">' +
      '<button @click="$parent.buy" type="submit" :disabled="buy_disabled">{{ this.buy_label }}</button>' +
      "</div>" +
      "</form>" +
      '<form method="get" :action="$root.voucherFormTarget" target="_blank" ' +
      '      v-if="$root.vouchers_exist && !$root.disable_vouchers && !$root.voucher_code">' +
      '<div class="pretix-widget-voucher">' +
      '<h3 class="pretix-widget-voucher-headline">' +
      strings["redeem_voucher"] +
      "</h3>" +
      '<div v-if="$root.voucher_explanation_text" class="pretix-widget-voucher-text">{{ $root.voucher_explanation_text }}</div>' +
      '<div class="pretix-widget-voucher-input-wrap">' +
      '<input class="pretix-widget-voucher-input" type="text" v-model="$parent.voucher" name="voucher" placeholder="' +
      strings.voucher_code +
      '">' +
      "</div>" +
      '<input type="hidden" name="subevent" :value="$root.subevent" />' +
      '<input type="hidden" name="widget_data" :value="$root.widget_data_json" />' +
      '<input type="hidden" name="locale" value="' +
      lang +
      '" />' +
      '<div class="pretix-widget-voucher-button-wrap">' +
      '<button @click="$parent.redeem">' +
      strings.redeem +
      "</button>" +
      "</div>" +
      "</div>" +
      "</form>" +
      "</div>",
    data: function () {
      return {
        buy_disabled: true,
      };
    },
    mounted: function () {
      this.$root.$on("amounts_changed", this.calculate_buy_disabled);
      this.calculate_buy_disabled();
    },
    beforeDestroy: function () {
      this.$root.$off("amounts_changed", this.calculate_buy_disabled);
    },
    computed: {
      buy_label: function () {
        var i,
          j,
          k,
          all_free = true;
        for (i = 0; i < this.$root.categories.length; i++) {
          var cat = this.$root.categories[i];
          for (j = 0; j < cat.items.length; j++) {
            var item = cat.items[j];
            for (k = 0; k < item.variations.length; k++) {
              var v = item.variations[k];
              if (v.price.gross !== "0.00") {
                all_free = false;
                break;
              }
            }
            if (item.variations.length === 0 && item.price.gross !== "0.00") {
              all_free = false;
              break;
            }
          }
          if (!all_free) {
            break;
          }
        }
        if (all_free) {
          return strings.register;
        } else {
          return strings.buy;
        }
      },
    },
    methods: {
      back_to_list: function () {
        this.$root.target_url = this.$root.parent_stack.pop();
        this.$root.error = null;
        this.$root.subevent = null;
        this.$root.trigger_load_callback();
        if (this.$root.events !== undefined && this.$root.events !== null) {
          this.$root.view = "events";
        } else if (this.$root.days !== undefined && this.$root.days !== null) {
          this.$root.view = "days";
        } else {
          this.$root.view = "weeks";
        }
      },
      calculate_buy_disabled: function () {
        var i, j, k;
        for (i = 0; i < this.$root.categories.length; i++) {
          var cat = this.$root.categories[i];
          for (j = 0; j < cat.items.length; j++) {
            var item = cat.items[j];
            if (item.has_variations) {
              for (k = 0; k < item.variations.length; k++) {
                var v = item.variations[k];
                if (v.amount_selected) {
                  this.buy_disabled = false;
                  return;
                }
              }
            } else if (item.amount_selected) {
              this.buy_disabled = false;
              return;
            }
          }
        }
        this.buy_disabled = true;
      },
    },
  });

  Vue.component("pretix-widget-event-list-entry", {
    template:
      '<a :class="classObject" @click.prevent="select">' +
      '<div class="pretix-widget-event-list-entry-name">{{ event.name }}</div>' +
      '<div class="pretix-widget-event-list-entry-date">{{ event.date_range }}</div>' +
      '<div class="pretix-widget-event-list-entry-location">{{ location }}</div>' + // hidden by css for now, but
      // used by a few people
      '<div class="pretix-widget-event-list-entry-availability"><span>{{ event.availability.text }}</span></div>' +
      "</a>",
    props: {
      event: Object,
    },
    computed: {
      classObject: function () {
        var o = {
          "pretix-widget-event-list-entry": true,
        };
        o[
          "pretix-widget-event-availability-" + this.event.availability.color
        ] = true;
        if (this.event.availability.reason) {
          o[
            "pretix-widget-event-availability-" + this.event.availability.reason
          ] = true;
        }
        return o;
      },
      location: function () {
        return this.event.location.replace(/\s*\n\s*/g, ", ");
      },
    },
    methods: {
      select: function () {
        this.$root.parent_stack.push(this.$root.target_url);
        this.$root.target_url = this.event.event_url;
        this.$root.error = null;
        this.$root.subevent = this.event.subevent;
        this.$root.loading++;
        this.$root.reload();
      },
    },
  });

  Vue.component("pretix-widget-event-list", {
    template:
      '<div class="pretix-widget-event-list">' +
      '<div class="pretix-widget-back" v-if="$root.weeks || $root.parent_stack.length > 0">' +
      '<a href="#" @click.prevent="back_to_calendar">&lsaquo; ' +
      strings["back"] +
      "</a>" +
      "</div>" +
      '<pretix-widget-event-list-entry v-for="event in $root.events" :event="event" :key="event.url"></pretix-widget-event-list-entry>' +
      "</div>",
    methods: {
      back_to_calendar: function () {
        if (this.$root.weeks) {
          this.$root.events = undefined;
          this.$root.view = "weeks";
        } else {
          this.$root.loading++;
          this.$root.target_url = this.$root.parent_stack.pop();
          this.$root.error = null;
          this.$root.reload();
        }
      },
    },
  });

  Vue.component("pretix-widget-event-calendar-event", {
    template:
      '<a :class="classObject" @click.prevent="select">' +
      '<strong class="pretix-widget-event-calendar-event-name">' +
      "{{ event.name }}" +
      "</strong>" +
      '<div class="pretix-widget-event-calendar-event-date" v-if="!event.continued && event.time">{{ event.time }}</div>' +
      '<div class="pretix-widget-event-calendar-event-availability" v-if="!event.continued">{{ event.availability.text }}</div>' +
      "</a>",
    props: {
      event: Object,
    },
    computed: {
      classObject: function () {
        var o = {
          "pretix-widget-event-calendar-event": true,
        };
        o[
          "pretix-widget-event-availability-" + this.event.availability.color
        ] = true;
        if (this.event.availability.reason) {
          o[
            "pretix-widget-event-availability-" + this.event.availability.reason
          ] = true;
        }
        return o;
      },
    },
    methods: {
      select: function () {
        this.$root.parent_stack.push(this.$root.target_url);
        this.$root.target_url = this.event.event_url;
        this.$root.error = null;
        this.$root.subevent = this.event.subevent;
        this.$root.loading++;
        this.$root.reload();
      },
    },
  });

  Vue.component("pretix-widget-event-week-cell", {
    template:
      '<div :class="classObject" @click.prevent="selectDay">' +
      '<div class="pretix-widget-event-calendar-day" v-if="day">' +
      "{{ dayhead }}" +
      "</div>" +
      '<div class="pretix-widget-event-calendar-events" v-if="day">' +
      '<pretix-widget-event-calendar-event v-for="e in day.events" :event="e"></pretix-widget-event-calendar-event>' +
      "</div>" +
      "</div>",
    props: {
      day: Object,
    },
    methods: {
      selectDay: function () {
        if (
          !this.day ||
          !this.day.events.length ||
          !this.$parent.$parent.$parent.mobile
        ) {
          return;
        }
        if (this.day.events.length === 1) {
          var ev = this.day.events[0];
          this.$root.parent_stack.push(this.$root.target_url);
          this.$root.target_url = ev.event_url;
          this.$root.error = null;
          this.$root.subevent = ev.subevent;
          this.$root.loading++;
          this.$root.reload();
        } else {
          this.$root.events = this.day.events;
          this.$root.view = "events";
        }
      },
    },
    computed: {
      dayhead: function () {
        if (!this.day) {
          return;
        }
        return this.day.day_formatted;
      },
      classObject: function () {
        var o = {};
        if (this.day && this.day.events.length > 0) {
          o["pretix-widget-has-events"] = true;
          var best = "red";
          for (var i = 0; i < this.day.events.length; i++) {
            var ev = this.day.events[i];
            if (ev.availability.color === "green") {
              best = "green";
            } else if (ev.availability.color === "orange" && best !== "green") {
              best = "orange";
            }
          }
          o["pretix-widget-day-availability-" + best] = true;
        }
        return o;
      },
    },
  });

  Vue.component("pretix-widget-event-calendar-cell", {
    template:
      '<td :class="classObject" @click.prevent="selectDay">' +
      '<div class="pretix-widget-event-calendar-day" v-if="day">' +
      "{{ daynum }}" +
      "</div>" +
      '<div class="pretix-widget-event-calendar-events" v-if="day">' +
      '<pretix-widget-event-calendar-event v-for="e in day.events" :event="e"></pretix-widget-event-calendar-event>' +
      "</div>" +
      "</td>",
    props: {
      day: Object,
    },
    methods: {
      selectDay: function () {
        if (
          !this.day ||
          !this.day.events.length ||
          !this.$parent.$parent.$parent.mobile
        ) {
          return;
        }
        if (this.day.events.length === 1) {
          var ev = this.day.events[0];
          this.$root.parent_stack.push(this.$root.target_url);
          this.$root.target_url = ev.event_url;
          this.$root.error = null;
          this.$root.subevent = ev.subevent;
          this.$root.loading++;
          this.$root.reload();
        } else {
          this.$root.events = this.day.events;
          this.$root.view = "events";
        }
      },
    },
    computed: {
      daynum: function () {
        if (!this.day) {
          return;
        }
        return this.day.date.substr(8);
      },
      classObject: function () {
        var o = {};
        if (this.day && this.day.events.length > 0) {
          o["pretix-widget-has-events"] = true;
          var best = "red";
          for (var i = 0; i < this.day.events.length; i++) {
            var ev = this.day.events[i];
            if (ev.availability.color === "green") {
              best = "green";
            } else if (ev.availability.color === "orange" && best !== "green") {
              best = "orange";
            }
          }
          o["pretix-widget-day-availability-" + best] = true;
        }
        return o;
      },
    },
  });

  Vue.component("pretix-widget-event-calendar-row", {
    template:
      "<tr>" +
      '<pretix-widget-event-calendar-cell v-for="d in week" :day="d"></pretix-widget-event-calendar-cell>' +
      "</tr>",
    props: {
      week: Array,
    },
  });

  Vue.component("pretix-widget-event-calendar", {
    template:
      '<div class="pretix-widget-event-calendar" ref="calendar">' +
      '<div class="pretix-widget-back" v-if="$root.events !== undefined">' +
      '<a href="#" @click.prevent="back_to_list">&lsaquo; ' +
      strings["back"] +
      "</a>" +
      "</div>" +
      '<div class="pretix-widget-event-calendar-head">' +
      '<a class="pretix-widget-event-calendar-previous-month" href="#" @click.prevent="prevmonth">&laquo; ' +
      strings["previous_month"] +
      "</a> " +
      "<strong>{{ monthname }}</strong> " +
      '<a class="pretix-widget-event-calendar-next-month" href="#" @click.prevent="nextmonth">' +
      strings["next_month"] +
      " &raquo;</a>" +
      "</div>" +
      '<table class="pretix-widget-event-calendar-table">' +
      "<thead>" +
      "<tr>" +
      "<th>" +
      strings["days"]["MO"] +
      "</th>" +
      "<th>" +
      strings["days"]["TU"] +
      "</th>" +
      "<th>" +
      strings["days"]["WE"] +
      "</th>" +
      "<th>" +
      strings["days"]["TH"] +
      "</th>" +
      "<th>" +
      strings["days"]["FR"] +
      "</th>" +
      "<th>" +
      strings["days"]["SA"] +
      "</th>" +
      "<th>" +
      strings["days"]["SU"] +
      "</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      '<pretix-widget-event-calendar-row v-for="week in $root.weeks" :week="week"></pretix-widget-event-calendar-row>' +
      "</tbody>" +
      "</table>" +
      "</div>",
    computed: {
      monthname: function () {
        return (
          strings["months"][this.$root.date.substr(5, 2)] +
          " " +
          this.$root.date.substr(0, 4)
        );
      },
    },
    methods: {
      back_to_list: function () {
        this.$root.weeks = undefined;
        this.$root.view = "events";
      },
      prevmonth: function () {
        var curMonth = parseInt(this.$root.date.substr(5, 2));
        var curYear = parseInt(this.$root.date.substr(0, 4));
        curMonth--;
        if (curMonth < 1) {
          curMonth = 12;
          curYear--;
        }
        this.$root.date =
          String(curYear) + "-" + padNumber(curMonth, 2) + "-01";
        this.$root.loading++;
        this.$root.reload();
      },
      nextmonth: function () {
        var curMonth = parseInt(this.$root.date.substr(5, 2));
        var curYear = parseInt(this.$root.date.substr(0, 4));
        curMonth++;
        if (curMonth > 12) {
          curMonth = 1;
          curYear++;
        }
        this.$root.date =
          String(curYear) + "-" + padNumber(curMonth, 2) + "-01";
        this.$root.loading++;
        this.$root.reload();
      },
    },
  });

  Vue.component("pretix-widget-event-week-calendar", {
    template:
      '<div class="pretix-widget-event-calendar pretix-widget-event-week-calendar" ref="weekcalendar">' +
      '<div class="pretix-widget-back" v-if="$root.events !== undefined">' +
      '<a href="#" @click.prevent="back_to_list">&lsaquo; ' +
      strings["back"] +
      "</a>" +
      "</div>" +
      '<div class="pretix-widget-event-calendar-head">' +
      '<a class="pretix-widget-event-calendar-previous-month" href="#" @click.prevent="prevweek">&laquo; ' +
      strings["previous_week"] +
      "</a> " +
      "<strong>{{ weekname }}</strong> " +
      '<a class="pretix-widget-event-calendar-next-month" href="#" @click.prevent="nextweek">' +
      strings["next_week"] +
      " &raquo;</a>" +
      "</div>" +
      '<div class="pretix-widget-event-week-table">' +
      '<div class="pretix-widget-event-week-col" v-for="d in $root.days">' +
      '<pretix-widget-event-week-cell :day="d">' +
      "</pretix-widget-event-week-cell>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>",
    computed: {
      weekname: function () {
        var curWeek = this.$root.week[1];
        var curYear = this.$root.week[0];
        return curWeek + " / " + curYear;
      },
    },
    methods: {
      back_to_list: function () {
        this.$root.weeks = undefined;
        this.$root.view = "events";
      },
      prevweek: function () {
        var curWeek = this.$root.week[1];
        var curYear = this.$root.week[0];
        curWeek--;
        if (curWeek < 1) {
          curYear--;
          curWeek = getISOWeeks(curYear);
        }
        this.$root.week = [curYear, curWeek];
        this.$root.loading++;
        this.$root.reload();
      },
      nextweek: function () {
        var curWeek = this.$root.week[1];
        var curYear = this.$root.week[0];
        curWeek++;
        if (curWeek > getISOWeeks(curYear)) {
          curWeek = 1;
          curYear++;
        }
        this.$root.week = [curYear, curWeek];
        this.$root.loading++;
        this.$root.reload();
      },
    },
  });

  Vue.component("pretix-widget", {
    template:
      '<div class="pretix-widget-wrapper" ref="wrapper">' +
      '<div :class="classObject">' +
      '<resize-observer @notify="handleResize" />' +
      shared_loading_fragment +
      '<div class="pretix-widget-error-message" v-if="$root.error && $root.view !== \'event\'">{{ $root.error }}</div>' +
      '<pretix-widget-event-form ref="formcomp" v-if="$root.view === \'event\'"></pretix-widget-event-form>' +
      "<pretix-widget-event-list v-if=\"$root.view === 'events'\"></pretix-widget-event-list>" +
      "<pretix-widget-event-calendar v-if=\"$root.view === 'weeks'\"></pretix-widget-event-calendar>" +
      "<pretix-widget-event-week-calendar v-if=\"$root.view === 'days'\"></pretix-widget-event-week-calendar>" +
      '<div class="pretix-widget-clear"></div>' +
      '<div class="pretix-widget-attribution" v-if="$root.poweredby" v-html="$root.poweredby">' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>",
    data: shared_widget_data,
    methods: shared_methods,
    mounted: function () {
      this.mobile = this.$refs.wrapper.clientWidth <= 600;
    },
    computed: {
      classObject: function () {
        o = { "pretix-widget": true };
        if (this.mobile) {
          o["pretix-widget-mobile"] = true;
        }
        return o;
      },
    },
  });

  Vue.component("pretix-button", {
    template:
      '<div class="pretix-widget-wrapper">' +
      '<div class="pretix-widget-button-container">' +
      '<form :method="$root.formMethod" :action="$root.formAction" ref="form" :target="$root.formTarget">' +
      '<input type="hidden" name="_voucher_code" :value="$root.voucher_code" v-if="$root.voucher_code">' +
      '<input type="hidden" name="voucher" :value="$root.voucher_code" v-if="$root.voucher_code">' +
      '<input type="hidden" name="subevent" :value="$root.subevent" />' +
      '<input type="hidden" name="locale" :value="$root.lang" />' +
      '<input type="hidden" name="widget_data" :value="$root.widget_data_json" />' +
      '<input type="hidden" v-for="item in $root.items" :name="item.item" :value="item.count" />' +
      '<button class="pretix-button" @click="buy">{{ $root.button_text }}</button>' +
      "</form>" +
      '<div class="pretix-widget-clear"></div>' +
      "</div>" +
      "</div>" +
      "</div>",
    data: shared_widget_data,
    methods: shared_methods,
  });

  /* Function to create the actual Vue instances */

  var shared_root_methods = {
    open_link_in_frame: function (event) {
      if (this.$root.useIframe) {
        event.preventDefault();
        var url = event.target.attributes.href.value;
        if (url.indexOf("?")) {
          url += "&iframe=1";
        } else {
          url += "?iframe=1";
        }
        this.$root.overlay.$children[0].$refs[
          "frame-container"
        ].children[0].src = url;
        this.$root.overlay.frame_loading = true;
      } else {
        return;
      }
    },
    trigger_load_callback: function () {
      this.$nextTick(function () {
        for (var i = 0; i < window.PretixWidget._loaded.length; i++) {
          window.PretixWidget._loaded[i]();
        }
      });
    },
    reload: function () {
      var url;
      if (this.$root.is_button) {
        return;
      }
      if (this.$root.subevent) {
        url =
          this.$root.target_url +
          this.$root.subevent +
          "/widget/product_list?lang=" +
          lang;
      } else {
        url = this.$root.target_url + "widget/product_list?lang=" + lang;
      }
      if (this.$root.filter) {
        url += "&" + this.$root.filter;
      }
      if (this.$root.item_filter) {
        url += "&items=" + encodeURIComponent(this.$root.item_filter);
      }
      if (this.$root.category_filter) {
        url += "&categories=" + encodeURIComponent(this.$root.category_filter);
      }
      var cart_id = getCookie(this.cookieName);
      if (this.$root.voucher_code) {
        url += "&voucher=" + encodeURIComponent(this.$root.voucher_code);
      }
      if (cart_id) {
        url += "&cart_id=" + cart_id;
      }
      if (this.$root.date !== null) {
        url +=
          "&year=" +
          this.$root.date.substr(0, 4) +
          "&month=" +
          this.$root.date.substr(5, 2);
      } else if (this.$root.week !== null) {
        url += "&year=" + this.$root.week[0] + "&week=" + this.$root.week[1];
      }
      if (this.$root.style !== null) {
        url = url + "&style=" + this.$root.style;
      }
      var root = this.$root;
      api._getJSON(
        url,
        function (data, xhr) {
          if (
            typeof xhr.responseURL !== "undefined" &&
            xhr.responseURL !== url
          ) {
            var new_url = xhr.responseURL.substr(
              0,
              xhr.responseURL.indexOf("/widget/product_list?") + 1
            );
            if (root.subevent) {
              new_url = new_url.substr(
                0,
                new_url.lastIndexOf("/", new_url.length - 1) + 1
              );
            }
            root.target_url = new_url;
            root.reload();
            return;
          }
          if (data.weeks !== undefined) {
            root.weeks = data.weeks;
            root.date = data.date;
            root.week = null;
            root.events = undefined;
            root.view = "weeks";
          } else if (data.days !== undefined) {
            root.days = data.days;
            root.date = null;
            root.week = data.week;
            root.events = undefined;
            root.view = "days";
          } else if (data.events !== undefined) {
            root.events = data.events;
            root.weeks = undefined;
            root.view = "events";
          } else {
            root.view = "event";
            root.name = data.name;
            root.date_range = data.date_range;
            root.categories = data.items_by_category;
            root.currency = data.currency;
            root.display_net_prices = data.display_net_prices;
            root.voucher_explanation_text = data.voucher_explanation_text;
            root.error = data.error;
            root.display_add_to_cart = data.display_add_to_cart;
            root.waiting_list_enabled = data.waiting_list_enabled;
            root.show_variations_expanded = data.show_variations_expanded;
            root.cart_id = cart_id;
            root.cart_exists = data.cart_exists;
            root.vouchers_exist = data.vouchers_exist;
            root.has_seating_plan = data.has_seating_plan;
            root.itemnum = data.itemnum;
          }
          root.poweredby = data.poweredby;
          if (root.loading > 0) {
            root.loading--;
            root.trigger_load_callback();
          }
          if (
            root.parent_stack.length > 0 &&
            root.has_seating_plan &&
            root.categories.length === 0 &&
            !root.frame_dismissed &&
            root.useIframe
          ) {
            // If we're on desktop and someone selects a seating-only event in a calendar, let's open it right away,
            // but only if the person didn't close it before.
            root.startseating();
          }
        },
        function (error) {
          root.categories = [];
          root.currency = "";
          root.error = strings["loading_error"];
          if (root.loading > 0) {
            root.loading--;
            root.trigger_load_callback();
          }
        }
      );
    },
    startseating: function () {
      var redirect_url = this.$root.target_url + "w/" + widget_id;
      if (this.$root.subevent) {
        redirect_url += "/" + this.$root.subevent;
      }
      redirect_url += "/seatingframe/?iframe=1&locale=" + lang;
      if (this.$root.cart_id) {
        redirect_url += "&take_cart_id=" + this.$root.cart_id;
      }
      if (this.$root.widget_data) {
        redirect_url +=
          "&widget_data=" + encodeURIComponent(this.$root.widget_data_json);
      }
      if (this.$root.useIframe) {
        var iframe = this.$root.overlay.$children[0].$refs["frame-container"]
          .children[0];
        this.$root.overlay.frame_loading = true;
        iframe.src = redirect_url;
      } else {
        window.open(redirect_url);
      }
    },
    choose_event: function (event) {
      root.target_url = event.event_url;
      this.$root.error = null;
      root.subevent = event.subevent;
      root.loading++;
      root.reload();
    },
  };

  var shared_root_computed = {
    cookieName: function () {
      return "pretix_widget_" + this.target_url.replace(/[^a-zA-Z0-9]+/g, "_");
    },
    formTarget: function () {
      var is_firefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      var is_android =
        navigator.userAgent.toLowerCase().indexOf("android") > -1;
      if (is_android && is_firefox) {
        // Opening a POST form in a new browser fails in Firefox. This is supposed to be fixed since FF 76
        // but for some reason, it is still the case in FF for Android.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1629441
        // https://github.com/pretix/pretix/issues/1040
        return "_top";
      } else {
        return "_blank";
      }
    },
    voucherFormTarget: function () {
      var form_target =
        this.target_url + "w/" + widget_id + "/redeem?iframe=1&locale=" + lang;
      var cookie = getCookie(this.cookieName);
      if (cookie) {
        form_target += "&take_cart_id=" + cookie;
      }
      if (this.subevent) {
        form_target += "&subevent=" + this.subevent;
      }
      return form_target;
    },
    formMethod: function () {
      if (!this.useIframe && this.is_button && this.items.length === 0) {
        return "get";
      }
      return "post";
    },
    formAction: function () {
      if (!this.useIframe && this.is_button && this.items.length === 0) {
        var target = this.target_url;
        if (this.voucher_code) {
          target = this.target_url + "redeem";
        }
        return target;
      }
      var checkout_url =
        "/" +
        this.target_url.replace(/^[^\/]+:\/\/([^\/]+)\//, "") +
        "w/" +
        widget_id +
        "/";
      if (!this.$root.cart_exists) {
        checkout_url += "checkout/start";
      }
      var form_target =
        this.target_url +
        "w/" +
        widget_id +
        "/cart/add?iframe=1&next=" +
        encodeURIComponent(checkout_url);
      var cookie = getCookie(this.cookieName);
      if (cookie) {
        form_target += "&take_cart_id=" + cookie;
      }
      return form_target;
    },
    useIframe: function () {
      return (
        Math.min(screen.width, window.innerWidth) >= 800 &&
        (this.skip_ssl || site_is_secure())
      );
    },
    showPrices: function () {
      var has_priced = false;
      var cnt_items = 0;
      for (var i = 0; i < this.categories.length; i++) {
        for (var j = 0; j < this.categories[i].items.length; j++) {
          var item = this.categories[i].items[j];
          if (item.has_variations) {
            cnt_items += item.variations.length;
            has_priced = true;
          } else {
            cnt_items++;
            has_priced = has_priced || item.price.gross != "0.00";
          }
        }
      }
      return has_priced || cnt_items > 1;
    },
    widget_data_json: function () {
      return JSON.stringify(this.widget_data);
    },
  };

  var create_overlay = function (app) {
    var elem = document.createElement("pretix-overlay");
    document.body.appendChild(elem);

    var framechild = new Vue({
      el: elem,
      data: function () {
        return {
          parent: app,
          frame_loading: false,
          frame_shown: false,
          error_url_after: null,
          error_message: null,
        };
      },
      methods: {},
    });
    app.$root.overlay = framechild;
  };

  function get_ga_client_id(tracking_id) {
    if (typeof ga === "undefined") {
      return null;
    }
    try {
      var trackers = ga.getAll();
      var i, len;
      for (i = 0, len = trackers.length; i < len; i += 1) {
        if (trackers[i].get("trackingId") === tracking_id) {
          return trackers[i].get("clientId");
        }
      }
    } catch (e) {}
    return null;
  }

  var create_widget = function (element) {
    var target_url = element.attributes.event.value;
    if (!target_url.match(/\/$/)) {
      target_url += "/";
    }
    var voucher = element.attributes.voucher
      ? element.attributes.voucher.value
      : null;
    var subevent = element.attributes.subevent
      ? element.attributes.subevent.value
      : null;
    var style = element.attributes.style
      ? element.attributes.style.value
      : null;
    var skip_ssl = element.attributes["skip-ssl-check"] ? true : false;
    var disable_vouchers = element.attributes["disable-vouchers"]
      ? true
      : false;
    var widget_data = JSON.parse(
      JSON.stringify(window.PretixWidget.widget_data)
    );
    var filter = element.attributes.filter
      ? element.attributes.filter.value
      : null;
    var items = element.attributes.items
      ? element.attributes.items.value
      : null;
    var categories = element.attributes.categories
      ? element.attributes.categories.value
      : null;
    for (var i = 0; i < element.attributes.length; i++) {
      var attrib = element.attributes[i];
      if (attrib.name.match(/^data-.*$/)) {
        widget_data[attrib.name.replace(/^data-/, "")] = attrib.value;
      }
    }

    if (element.tagName !== "pretix-widget") {
      element.innerHTML = "<pretix-widget></pretix-widget>";
    }

    var app = new Vue({
      el: element,
      data: function () {
        return {
          target_url: target_url,
          parent_stack: [],
          subevent: subevent,
          is_button: false,
          categories: null,
          currency: null,
          name: null,
          date_range: null,
          filter: filter,
          item_filter: items,
          category_filter: categories,
          voucher_code: voucher,
          display_net_prices: false,
          voucher_explanation_text: null,
          show_variations_expanded: false,
          skip_ssl: skip_ssl,
          style: style,
          error: null,
          weeks: null,
          days: null,
          date: null,
          week: null,
          frame_dismissed: false,
          events: null,
          view: null,
          display_add_to_cart: false,
          widget_data: widget_data,
          loading: 1,
          widget_id: "pretix-widget-" + widget_id,
          vouchers_exist: false,
          disable_vouchers: disable_vouchers,
          cart_exists: false,
          itemcount: 0,
          overlay: null,
          poweredby: "",
          has_seating_plan: false,
        };
      },
      created: function () {
        this.reload();
      },
      computed: shared_root_computed,
      methods: shared_root_methods,
    });
    create_overlay(app);
    return app;
  };

  var create_button = function (element) {
    var target_url = element.attributes.event.value;
    if (!target_url.match(/\/$/)) {
      target_url += "/";
    }
    var voucher = element.attributes.voucher
      ? element.attributes.voucher.value
      : null;
    var subevent = element.attributes.subevent
      ? element.attributes.subevent.value
      : null;
    var raw_items = element.attributes.items
      ? element.attributes.items.value
      : "";
    var skip_ssl = element.attributes["skip-ssl-check"] ? true : false;
    var button_text = element.innerHTML;
    var widget_data = JSON.parse(
      JSON.stringify(window.PretixWidget.widget_data)
    );
    for (var i = 0; i < element.attributes.length; i++) {
      var attrib = element.attributes[i];
      if (attrib.name.match(/^data-.*$/)) {
        widget_data[attrib.name.replace(/^data-/, "")] = attrib.value;
      }
    }

    if (element.tagName !== "pretix-button") {
      element.innerHTML =
        "<pretix-button>" + element.innerHTML + "</pretix-button>";
    }

    var itemsplit = raw_items.split(",");
    var items = [];
    for (var i = 0; i < itemsplit.length; i++) {
      if (itemsplit[i].indexOf("=") > 0) {
        var splitthis = itemsplit[i].split("=");
        items.push({ item: splitthis[0], count: splitthis[1] });
      }
    }

    var app = new Vue({
      el: element,
      data: function () {
        return {
          target_url: target_url,
          subevent: subevent,
          is_button: true,
          skip_ssl: skip_ssl,
          voucher_code: voucher,
          items: items,
          error: null,
          filter: null,
          frame_dismissed: false,
          widget_data: widget_data,
          widget_id: "pretix-widget-" + widget_id,
          button_text: button_text,
        };
      },
      created: function () {},
      computed: shared_root_computed,
      methods: shared_root_methods,
    });
    create_overlay(app);
    return app;
  };

  /* Find all widgets on the page and render them */
  widgetlist = [];
  buttonlist = [];
  window.PretixWidget._loaded = [];
  window.PretixWidget.addLoadListener = function (f) {
    window.PretixWidget._loaded.push(f);
  };
  window.PretixWidget.buildWidgets = function () {
    document.createElement("pretix-widget");
    document.createElement("pretix-button");
    docReady(function () {
      var widgets = document.querySelectorAll(
        "pretix-widget, div.pretix-widget-compat"
      );
      var wlength = widgets.length;
      for (var i = 0; i < wlength; i++) {
        var widget = widgets[i];
        widgetlist.push(create_widget(widget));
      }

      var buttons = document.querySelectorAll(
        "pretix-button, div.pretix-button-compat"
      );
      var blength = buttons.length;
      for (var i = 0; i < blength; i++) {
        var button = buttons[i];
        buttonlist.push(create_button(button));
      }
    });
  };

  window.PretixWidget.open = function (
    target_url,
    voucher,
    subevent,
    items,
    widget_data,
    skip_ssl_check
  ) {
    if (!target_url.match(/\/$/)) {
      target_url += "/";
    }

    var all_widget_data = JSON.parse(
      JSON.stringify(window.PretixWidget.widget_data)
    );
    if (widget_data) {
      Object.keys(widget_data).forEach(function (key) {
        all_widget_data[key] = widget_data[key];
      });
    }
    var root = document.createElement("div");
    document.body.appendChild(root);
    root.classList.add("pretix-widget-hidden");
    root.innerHTML = "<pretix-button ref='btn'></pretix-button>";
    var app = new Vue({
      el: root,
      data: function () {
        return {
          target_url: target_url,
          subevent: subevent || null,
          is_button: true,
          skip_ssl: skip_ssl_check || false,
          voucher_code: voucher || null,
          items: items || [],
          error: null,
          filter: null,
          frame_dismissed: false,
          widget_data: all_widget_data,
          widget_id: "pretix-widget-" + widget_id,
          button_text: "",
        };
      },
      created: function () {},
      computed: shared_root_computed,
      methods: shared_root_methods,
    });
    create_overlay(app);
    app.$nextTick(function () {
      if (this.$root.useIframe) {
        this.$refs.btn.buy();
      } else {
        console.log(this.$refs.btn.$refs.form);
        this.$refs.btn.$refs.form.submit();
      }
    });
  };

  if (typeof window.pretixWidgetCallback !== "undefined") {
    window.pretixWidgetCallback();
  }
  if (window.PretixWidget.build_widgets) {
    window.PretixWidget.buildWidgets();
  }

  /* Set a global variable for debugging. In DEBUG mode, siteglobals will be window, otherwise it will be something
       unnamed. */
  siteglobals.pretixwidget_debug = {
    Vue: Vue,
    widgets: widgetlist,
    buttons: buttonlist,
  };
})({});
