import { c as bn } from "./index-DJO9vBfz.js";

var ge = { exports: {} };
(function (n, a) {
  (function (o, i) {
    i(a);
  })(bn, function (o) {
    function i(e) {
      return e.text !== void 0 && e.text !== "" ? `'${e.type}' with value '${e.text}'` : `'${e.type}'`;
    }
    class p extends Error {
      constructor(t) {
        super(`No parslet found for token: ${i(t)}`), (this.token = t), Object.setPrototypeOf(this, p.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class u extends Error {
      constructor(t) {
        super(`The parsing ended early. The next token was: ${i(t)}`),
          (this.token = t),
          Object.setPrototypeOf(this, u.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class y extends Error {
      constructor(t, r) {
        let s = `Unexpected type: '${t.type}'.`;
        r !== void 0 && (s += ` Message: ${r}`), super(s), Object.setPrototypeOf(this, y.prototype);
      }
    }
    function m(e) {
      return (t) => (t.startsWith(e) ? { type: e, text: e } : null);
    }
    function h(e) {
      let t = 0,
        r;
      const s = e[0];
      let c = !1;
      if (s !== "'" && s !== '"') return null;
      for (; t < e.length; ) {
        if ((t++, (r = e[t]), !c && r === s)) {
          t++;
          break;
        }
        c = !c && r === "\\";
      }
      if (r !== s) throw new Error("Unterminated String");
      return e.slice(0, t);
    }
    const E = new RegExp(
        "[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
        "u"
      ),
      N = new RegExp(
        "[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
        "u"
      );
    function ae(e) {
      let t = e[0];
      if (!E.test(t)) return null;
      let r = 1;
      do {
        if (((t = e[r]), !N.test(t))) break;
        r++;
      } while (r < e.length);
      return e.slice(0, r);
    }
    const K = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
    function W(e) {
      var t, r;
      return (r = (t = K.exec(e)) === null || t === void 0 ? void 0 : t[0]) !== null && r !== void 0 ? r : null;
    }
    const X = (e) => {
      const t = ae(e);
      return t == null ? null : { type: "Identifier", text: t };
    };
    function P(e) {
      return (t) => {
        if (!t.startsWith(e)) return null;
        const r = t[e.length];
        return r !== void 0 && N.test(r) ? null : { type: e, text: e };
      };
    }
    const oe = (e) => {
        const t = h(e);
        return t == null ? null : { type: "StringValue", text: t };
      },
      Ut = (e) => (e.length > 0 ? null : { type: "EOF", text: "" }),
      Vt = (e) => {
        const t = W(e);
        return t === null ? null : { type: "Number", text: t };
      },
      Kt = [
        Ut,
        m("=>"),
        m("("),
        m(")"),
        m("{"),
        m("}"),
        m("["),
        m("]"),
        m("|"),
        m("&"),
        m("<"),
        m(">"),
        m(","),
        m(";"),
        m("*"),
        m("?"),
        m("!"),
        m("="),
        m(":"),
        m("..."),
        m("."),
        m("#"),
        m("~"),
        m("/"),
        m("@"),
        P("undefined"),
        P("null"),
        P("function"),
        P("this"),
        P("new"),
        P("module"),
        P("event"),
        P("external"),
        P("typeof"),
        P("keyof"),
        P("readonly"),
        P("import"),
        P("is"),
        P("in"),
        P("asserts"),
        Vt,
        X,
        oe,
      ],
      Dt = /^\s*\n\s*/;
    class D {
      static create(t) {
        const r = this.read(t);
        t = r.text;
        const s = this.read(t);
        return (t = s.text), new D(t, void 0, r.token, s.token);
      }
      constructor(t, r, s, c) {
        (this.text = ""), (this.text = t), (this.previous = r), (this.current = s), (this.next = c);
      }
      static read(t, r = !1) {
        (r = r || Dt.test(t)), (t = t.trim());
        for (const s of Kt) {
          const c = s(t);
          if (c !== null) {
            const d = Object.assign(Object.assign({}, c), { startOfLine: r });
            return (t = t.slice(d.text.length)), { text: t, token: d };
          }
        }
        throw new Error("Unexpected Token " + t);
      }
      advance() {
        const t = D.read(this.text);
        return new D(t.text, this.current, this.next, t.token);
      }
    }
    function w(e) {
      if (e === void 0) throw new Error("Unexpected undefined");
      if (
        e.type === "JsdocTypeKeyValue" ||
        e.type === "JsdocTypeParameterList" ||
        e.type === "JsdocTypeProperty" ||
        e.type === "JsdocTypeReadonlyProperty" ||
        e.type === "JsdocTypeObjectField" ||
        e.type === "JsdocTypeJsdocObjectField" ||
        e.type === "JsdocTypeIndexSignature" ||
        e.type === "JsdocTypeMappedType"
      )
        throw new y(e);
      return e;
    }
    function se(e) {
      return e.type === "JsdocTypeKeyValue" ? Q(e) : w(e);
    }
    function $t(e) {
      return e.type === "JsdocTypeName" ? e : Q(e);
    }
    function Q(e) {
      if (e.type !== "JsdocTypeKeyValue") throw new y(e);
      return e;
    }
    function qt(e) {
      var t;
      if (e.type === "JsdocTypeVariadic") {
        if (((t = e.element) === null || t === void 0 ? void 0 : t.type) === "JsdocTypeName") return e;
        throw new y(e);
      }
      if (e.type !== "JsdocTypeNumber" && e.type !== "JsdocTypeName") throw new y(e);
      return e;
    }
    function ie(e) {
      return e.type === "JsdocTypeIndexSignature" || e.type === "JsdocTypeMappedType";
    }
    var f;
    (function (e) {
      (e[(e.ALL = 0)] = "ALL"),
        (e[(e.PARAMETER_LIST = 1)] = "PARAMETER_LIST"),
        (e[(e.OBJECT = 2)] = "OBJECT"),
        (e[(e.KEY_VALUE = 3)] = "KEY_VALUE"),
        (e[(e.INDEX_BRACKETS = 4)] = "INDEX_BRACKETS"),
        (e[(e.UNION = 5)] = "UNION"),
        (e[(e.INTERSECTION = 6)] = "INTERSECTION"),
        (e[(e.PREFIX = 7)] = "PREFIX"),
        (e[(e.INFIX = 8)] = "INFIX"),
        (e[(e.TUPLE = 9)] = "TUPLE"),
        (e[(e.SYMBOL = 10)] = "SYMBOL"),
        (e[(e.OPTIONAL = 11)] = "OPTIONAL"),
        (e[(e.NULLABLE = 12)] = "NULLABLE"),
        (e[(e.KEY_OF_TYPE_OF = 13)] = "KEY_OF_TYPE_OF"),
        (e[(e.FUNCTION = 14)] = "FUNCTION"),
        (e[(e.ARROW = 15)] = "ARROW"),
        (e[(e.ARRAY_BRACKETS = 16)] = "ARRAY_BRACKETS"),
        (e[(e.GENERIC = 17)] = "GENERIC"),
        (e[(e.NAME_PATH = 18)] = "NAME_PATH"),
        (e[(e.PARENTHESIS = 19)] = "PARENTHESIS"),
        (e[(e.SPECIAL_TYPES = 20)] = "SPECIAL_TYPES");
    })(f || (f = {}));
    class U {
      constructor(t, r, s) {
        (this.grammar = t),
          typeof r == "string" ? (this._lexer = D.create(r)) : (this._lexer = r),
          (this.baseParser = s);
      }
      get lexer() {
        return this._lexer;
      }
      parse() {
        const t = this.parseType(f.ALL);
        if (this.lexer.current.type !== "EOF") throw new u(this.lexer.current);
        return t;
      }
      parseType(t) {
        return w(this.parseIntermediateType(t));
      }
      parseIntermediateType(t) {
        const r = this.tryParslets(null, t);
        if (r === null) throw new p(this.lexer.current);
        return this.parseInfixIntermediateType(r, t);
      }
      parseInfixIntermediateType(t, r) {
        let s = this.tryParslets(t, r);
        for (; s !== null; ) (t = s), (s = this.tryParslets(t, r));
        return t;
      }
      tryParslets(t, r) {
        for (const s of this.grammar) {
          const c = s(this, r, t);
          if (c !== null) return c;
        }
        return null;
      }
      consume(t) {
        return (
          Array.isArray(t) || (t = [t]),
          t.includes(this.lexer.current.type) ? ((this._lexer = this.lexer.advance()), !0) : !1
        );
      }
      acceptLexerState(t) {
        this._lexer = t.lexer;
      }
    }
    function Ae(e) {
      return e === "EOF" || e === "|" || e === "," || e === ")" || e === ">";
    }
    const le = (e, t, r) => {
      const s = e.lexer.current.type,
        c = e.lexer.next.type;
      return (r == null && s === "?" && !Ae(c)) || (r != null && s === "?")
        ? (e.consume("?"),
          r == null
            ? { type: "JsdocTypeNullable", element: e.parseType(f.NULLABLE), meta: { position: "prefix" } }
            : { type: "JsdocTypeNullable", element: w(r), meta: { position: "suffix" } })
        : null;
    };
    function g(e) {
      const t = (r, s, c) => {
        const d = r.lexer.current.type,
          T = r.lexer.next.type;
        if (c === null) {
          if ("parsePrefix" in e && e.accept(d, T)) return e.parsePrefix(r);
        } else if ("parseInfix" in e && e.precedence > s && e.accept(d, T)) return e.parseInfix(r, c);
        return null;
      };
      return Object.defineProperty(t, "name", { value: e.name }), t;
    }
    const H = g({
        name: "optionalParslet",
        accept: (e) => e === "=",
        precedence: f.OPTIONAL,
        parsePrefix: (e) => (
          e.consume("="), { type: "JsdocTypeOptional", element: e.parseType(f.OPTIONAL), meta: { position: "prefix" } }
        ),
        parseInfix: (e, t) => (
          e.consume("="), { type: "JsdocTypeOptional", element: w(t), meta: { position: "suffix" } }
        ),
      }),
      z = g({
        name: "numberParslet",
        accept: (e) => e === "Number",
        parsePrefix: (e) => {
          const t = parseFloat(e.lexer.current.text);
          return e.consume("Number"), { type: "JsdocTypeNumber", value: t };
        },
      }),
      Bt = g({
        name: "parenthesisParslet",
        accept: (e) => e === "(",
        parsePrefix: (e) => {
          if ((e.consume("("), e.consume(")"))) return { type: "JsdocTypeParameterList", elements: [] };
          const t = e.parseIntermediateType(f.ALL);
          if (!e.consume(")")) throw new Error("Unterminated parenthesis");
          return t.type === "JsdocTypeParameterList"
            ? t
            : t.type === "JsdocTypeKeyValue"
              ? { type: "JsdocTypeParameterList", elements: [t] }
              : { type: "JsdocTypeParenthesis", element: w(t) };
        },
      }),
      Mt = g({
        name: "specialTypesParslet",
        accept: (e, t) => (e === "?" && Ae(t)) || e === "null" || e === "undefined" || e === "*",
        parsePrefix: (e) => {
          if (e.consume("null")) return { type: "JsdocTypeNull" };
          if (e.consume("undefined")) return { type: "JsdocTypeUndefined" };
          if (e.consume("*")) return { type: "JsdocTypeAny" };
          if (e.consume("?")) return { type: "JsdocTypeUnknown" };
          throw new Error("Unacceptable token: " + e.lexer.current.text);
        },
      }),
      Ct = g({
        name: "notNullableParslet",
        accept: (e) => e === "!",
        precedence: f.NULLABLE,
        parsePrefix: (e) => (
          e.consume("!"),
          { type: "JsdocTypeNotNullable", element: e.parseType(f.NULLABLE), meta: { position: "prefix" } }
        ),
        parseInfix: (e, t) => (
          e.consume("!"), { type: "JsdocTypeNotNullable", element: w(t), meta: { position: "suffix" } }
        ),
      });
    function Yt({ allowTrailingComma: e }) {
      return g({
        name: "parameterListParslet",
        accept: (t) => t === ",",
        precedence: f.PARAMETER_LIST,
        parseInfix: (t, r) => {
          const s = [se(r)];
          t.consume(",");
          do
            try {
              const c = t.parseIntermediateType(f.PARAMETER_LIST);
              s.push(se(c));
            } catch (c) {
              if (e && c instanceof p) break;
              throw c;
            }
          while (t.consume(","));
          if (s.length > 0 && s.slice(0, -1).some((c) => c.type === "JsdocTypeVariadic"))
            throw new Error("Only the last parameter may be a rest parameter");
          return { type: "JsdocTypeParameterList", elements: s };
        },
      });
    }
    const Gt = g({
        name: "genericParslet",
        accept: (e, t) => e === "<" || (e === "." && t === "<"),
        precedence: f.GENERIC,
        parseInfix: (e, t) => {
          const r = e.consume(".");
          e.consume("<");
          const s = [];
          do s.push(e.parseType(f.PARAMETER_LIST));
          while (e.consume(","));
          if (!e.consume(">")) throw new Error("Unterminated generic parameter list");
          return { type: "JsdocTypeGeneric", left: w(t), elements: s, meta: { brackets: "angle", dot: r } };
        },
      }),
      Wt = g({
        name: "unionParslet",
        accept: (e) => e === "|",
        precedence: f.UNION,
        parseInfix: (e, t) => {
          e.consume("|");
          const r = [];
          do r.push(e.parseType(f.UNION));
          while (e.consume("|"));
          return { type: "JsdocTypeUnion", elements: [w(t), ...r] };
        },
      }),
      ce = [le, H, z, Bt, Mt, Ct, Yt({ allowTrailingComma: !0 }), Gt, Wt, H];
    function Z({ allowSquareBracketsOnAnyType: e, allowJsdocNamePaths: t, pathGrammar: r }) {
      return function (c, d, T) {
        if (T == null || d >= f.NAME_PATH) return null;
        const J = c.lexer.current.type,
          k = c.lexer.next.type;
        if (
          !(
            (J === "." && k !== "<") ||
            (J === "[" && (e || T.type === "JsdocTypeName")) ||
            (t && (J === "~" || J === "#"))
          )
        )
          return null;
        let x,
          ne = !1;
        c.consume(".")
          ? (x = "property")
          : c.consume("[")
            ? ((x = "property-brackets"), (ne = !0))
            : c.consume("~")
              ? (x = "inner")
              : (c.consume("#"), (x = "instance"));
        const $e = r !== null ? new U(r, c.lexer, c) : c,
          O = $e.parseIntermediateType(f.NAME_PATH);
        c.acceptLexerState($e);
        let B;
        switch (O.type) {
          case "JsdocTypeName":
            B = { type: "JsdocTypeProperty", value: O.value, meta: { quote: void 0 } };
            break;
          case "JsdocTypeNumber":
            B = { type: "JsdocTypeProperty", value: O.value.toString(10), meta: { quote: void 0 } };
            break;
          case "JsdocTypeStringValue":
            B = { type: "JsdocTypeProperty", value: O.value, meta: { quote: O.meta.quote } };
            break;
          case "JsdocTypeSpecialNamePath":
            if (O.specialType === "event") B = O;
            else throw new y(O, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
            break;
          default:
            throw new y(
              O,
              "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'"
            );
        }
        if (ne && !c.consume("]")) {
          const qe = c.lexer.current;
          throw new Error(`Unterminated square brackets. Next token is '${qe.type}' with text '${qe.text}'`);
        }
        return { type: "JsdocTypeNamePath", left: w(T), right: B, pathType: x };
      };
    }
    function I({ allowedAdditionalTokens: e }) {
      return g({
        name: "nameParslet",
        accept: (t) => t === "Identifier" || t === "this" || t === "new" || e.includes(t),
        parsePrefix: (t) => {
          const { type: r, text: s } = t.lexer.current;
          return t.consume(r), { type: "JsdocTypeName", value: s };
        },
      });
    }
    const $ = g({
      name: "stringValueParslet",
      accept: (e) => e === "StringValue",
      parsePrefix: (e) => {
        const t = e.lexer.current.text;
        return (
          e.consume("StringValue"),
          { type: "JsdocTypeStringValue", value: t.slice(1, -1), meta: { quote: t[0] === "'" ? "single" : "double" } }
        );
      },
    });
    function ee({ pathGrammar: e, allowedTypes: t }) {
      return g({
        name: "specialNamePathParslet",
        accept: (r) => t.includes(r),
        parsePrefix: (r) => {
          const s = r.lexer.current.type;
          if ((r.consume(s), !r.consume(":"))) return { type: "JsdocTypeName", value: s };
          let c,
            d = r.lexer.current;
          if (r.consume("StringValue"))
            c = {
              type: "JsdocTypeSpecialNamePath",
              value: d.text.slice(1, -1),
              specialType: s,
              meta: { quote: d.text[0] === "'" ? "single" : "double" },
            };
          else {
            let k = "";
            const v = ["Identifier", "@", "/"];
            for (; v.some((x) => r.consume(x)); ) (k += d.text), (d = r.lexer.current);
            c = { type: "JsdocTypeSpecialNamePath", value: k, specialType: s, meta: { quote: void 0 } };
          }
          const T = new U(e, r.lexer, r),
            J = T.parseInfixIntermediateType(c, f.ALL);
          return r.acceptLexerState(T), w(J);
        },
      });
    }
    const Re = [
        I({ allowedAdditionalTokens: ["external", "module"] }),
        $,
        z,
        Z({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: null }),
      ],
      V = [...Re, ee({ allowedTypes: ["event"], pathGrammar: Re })];
    function pe(e) {
      let t;
      if (e.type === "JsdocTypeParameterList") t = e.elements;
      else if (e.type === "JsdocTypeParenthesis") t = [e.element];
      else throw new y(e);
      return t.map((r) => se(r));
    }
    function Xt(e) {
      const t = pe(e);
      if (t.some((r) => r.type === "JsdocTypeKeyValue")) throw new Error("No parameter should be named");
      return t;
    }
    function ue({
      allowNamedParameters: e,
      allowNoReturnType: t,
      allowWithoutParenthesis: r,
      allowNewAsFunctionKeyword: s,
    }) {
      return g({
        name: "functionParslet",
        accept: (c, d) => c === "function" || (s && c === "new" && d === "("),
        parsePrefix: (c) => {
          const d = c.consume("new");
          c.consume("function");
          const T = c.lexer.current.type === "(";
          if (!T) {
            if (!r) throw new Error("function is missing parameter list");
            return { type: "JsdocTypeName", value: "function" };
          }
          let J = { type: "JsdocTypeFunction", parameters: [], arrow: !1, constructor: d, parenthesis: T };
          const k = c.parseIntermediateType(f.FUNCTION);
          if (e === void 0) J.parameters = Xt(k);
          else {
            if (d && k.type === "JsdocTypeFunction" && k.arrow) return (J = k), (J.constructor = !0), J;
            J.parameters = pe(k);
            for (const v of J.parameters)
              if (v.type === "JsdocTypeKeyValue" && !e.includes(v.key))
                throw new Error(`only allowed named parameters are ${e.join(", ")} but got ${v.type}`);
          }
          if (c.consume(":")) J.returnType = c.parseType(f.PREFIX);
          else if (!t) throw new Error("function is missing return type");
          return J;
        },
      });
    }
    function ye({ allowPostfix: e, allowEnclosingBrackets: t }) {
      return g({
        name: "variadicParslet",
        accept: (r) => r === "...",
        precedence: f.PREFIX,
        parsePrefix: (r) => {
          r.consume("...");
          const s = t && r.consume("[");
          try {
            const c = r.parseType(f.PREFIX);
            if (s && !r.consume("]")) throw new Error("Unterminated variadic type. Missing ']'");
            return { type: "JsdocTypeVariadic", element: w(c), meta: { position: "prefix", squareBrackets: s } };
          } catch (c) {
            if (c instanceof p) {
              if (s) throw new Error("Empty square brackets for variadic are not allowed.");
              return { type: "JsdocTypeVariadic", meta: { position: void 0, squareBrackets: !1 } };
            } else throw c;
          }
        },
        parseInfix: e
          ? (r, s) => (
              r.consume("..."),
              { type: "JsdocTypeVariadic", element: w(s), meta: { position: "suffix", squareBrackets: !1 } }
            )
          : void 0,
      });
    }
    const _e = g({
        name: "symbolParslet",
        accept: (e) => e === "(",
        precedence: f.SYMBOL,
        parseInfix: (e, t) => {
          if (t.type !== "JsdocTypeName") throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
          e.consume("(");
          const r = { type: "JsdocTypeSymbol", value: t.value };
          if (!e.consume(")")) {
            const s = e.parseIntermediateType(f.SYMBOL);
            if (((r.element = qt(s)), !e.consume(")"))) throw new Error("Symbol does not end after value");
          }
          return r;
        },
      }),
      Fe = g({
        name: "arrayBracketsParslet",
        precedence: f.ARRAY_BRACKETS,
        accept: (e, t) => e === "[" && t === "]",
        parseInfix: (e, t) => (
          e.consume("["),
          e.consume("]"),
          {
            type: "JsdocTypeGeneric",
            left: { type: "JsdocTypeName", value: "Array" },
            elements: [w(t)],
            meta: { brackets: "square", dot: !1 },
          }
        ),
      });
    function de({ objectFieldGrammar: e, allowKeyTypes: t }) {
      return g({
        name: "objectParslet",
        accept: (r) => r === "{",
        parsePrefix: (r) => {
          r.consume("{");
          const s = { type: "JsdocTypeObject", meta: { separator: "comma" }, elements: [] };
          if (!r.consume("}")) {
            let c;
            const d = new U(e, r.lexer, r);
            for (;;) {
              d.acceptLexerState(r);
              let T = d.parseIntermediateType(f.OBJECT);
              r.acceptLexerState(d), T === void 0 && t && (T = r.parseIntermediateType(f.OBJECT));
              let J = !1;
              if (
                (T.type === "JsdocTypeNullable" && ((J = !0), (T = T.element)),
                T.type === "JsdocTypeNumber" || T.type === "JsdocTypeName" || T.type === "JsdocTypeStringValue")
              ) {
                let v;
                T.type === "JsdocTypeStringValue" && (v = T.meta.quote),
                  s.elements.push({
                    type: "JsdocTypeObjectField",
                    key: T.value.toString(),
                    right: void 0,
                    optional: J,
                    readonly: !1,
                    meta: { quote: v },
                  });
              } else if (T.type === "JsdocTypeObjectField" || T.type === "JsdocTypeJsdocObjectField")
                s.elements.push(T);
              else throw new y(T);
              if (r.lexer.current.startOfLine) c = "linebreak";
              else if (r.consume(",")) c = "comma";
              else if (r.consume(";")) c = "semicolon";
              else break;
              if (r.lexer.current.type === "}") break;
            }
            if (((s.meta.separator = c ?? "comma"), !r.consume("}")))
              throw new Error("Unterminated record type. Missing '}'");
          }
          return s;
        },
      });
    }
    function me({ allowSquaredProperties: e, allowKeyTypes: t, allowReadonly: r, allowOptional: s }) {
      return g({
        name: "objectFieldParslet",
        precedence: f.KEY_VALUE,
        accept: (c) => c === ":",
        parseInfix: (c, d) => {
          var T;
          let J = !1,
            k = !1;
          s && d.type === "JsdocTypeNullable" && ((J = !0), (d = d.element)),
            r && d.type === "JsdocTypeReadonlyProperty" && ((k = !0), (d = d.element));
          const v = (T = c.baseParser) !== null && T !== void 0 ? T : c;
          if (
            (v.acceptLexerState(c),
            d.type === "JsdocTypeNumber" || d.type === "JsdocTypeName" || d.type === "JsdocTypeStringValue" || ie(d))
          ) {
            if (ie(d) && !e) throw new y(d);
            v.consume(":");
            let x;
            d.type === "JsdocTypeStringValue" && (x = d.meta.quote);
            const ne = v.parseType(f.KEY_VALUE);
            return (
              c.acceptLexerState(v),
              {
                type: "JsdocTypeObjectField",
                key: ie(d) ? d : d.value.toString(),
                right: ne,
                optional: J,
                readonly: k,
                meta: { quote: x },
              }
            );
          } else {
            if (!t) throw new y(d);
            v.consume(":");
            const x = v.parseType(f.KEY_VALUE);
            return c.acceptLexerState(v), { type: "JsdocTypeJsdocObjectField", left: w(d), right: x };
          }
        },
      });
    }
    function fe({ allowOptional: e, allowVariadic: t }) {
      return g({
        name: "keyValueParslet",
        precedence: f.KEY_VALUE,
        accept: (r) => r === ":",
        parseInfix: (r, s) => {
          let c = !1,
            d = !1;
          if (
            (e && s.type === "JsdocTypeNullable" && ((c = !0), (s = s.element)),
            t && s.type === "JsdocTypeVariadic" && s.element !== void 0 && ((d = !0), (s = s.element)),
            s.type !== "JsdocTypeName")
          )
            throw new y(s);
          r.consume(":");
          const T = r.parseType(f.KEY_VALUE);
          return { type: "JsdocTypeKeyValue", key: s.value, right: T, optional: c, variadic: d };
        },
      });
    }
    const je = [
        ...ce,
        ue({
          allowWithoutParenthesis: !0,
          allowNamedParameters: ["this", "new"],
          allowNoReturnType: !0,
          allowNewAsFunctionKeyword: !1,
        }),
        $,
        ee({ allowedTypes: ["module", "external", "event"], pathGrammar: V }),
        ye({ allowEnclosingBrackets: !0, allowPostfix: !0 }),
        I({ allowedAdditionalTokens: ["keyof"] }),
        _e,
        Fe,
        Z({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: V }),
      ],
      Qt = [
        ...je,
        de({
          objectFieldGrammar: [
            I({ allowedAdditionalTokens: ["module", "in"] }),
            me({ allowSquaredProperties: !1, allowKeyTypes: !0, allowOptional: !1, allowReadonly: !1 }),
            ...je,
          ],
          allowKeyTypes: !0,
        }),
        fe({ allowOptional: !0, allowVariadic: !0 }),
      ],
      Le = g({
        name: "typeOfParslet",
        accept: (e) => e === "typeof",
        parsePrefix: (e) => (
          e.consume("typeof"), { type: "JsdocTypeTypeof", element: w(e.parseType(f.KEY_OF_TYPE_OF)) }
        ),
      }),
      Ht = [
        I({ allowedAdditionalTokens: ["module", "keyof", "event", "external", "in"] }),
        le,
        H,
        $,
        z,
        me({ allowSquaredProperties: !1, allowKeyTypes: !1, allowOptional: !1, allowReadonly: !1 }),
      ],
      zt = [
        ...ce,
        de({ allowKeyTypes: !1, objectFieldGrammar: Ht }),
        I({ allowedAdditionalTokens: ["event", "external", "in"] }),
        Le,
        ue({
          allowWithoutParenthesis: !1,
          allowNamedParameters: ["this", "new"],
          allowNoReturnType: !0,
          allowNewAsFunctionKeyword: !1,
        }),
        ye({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
        I({ allowedAdditionalTokens: ["keyof"] }),
        ee({ allowedTypes: ["module"], pathGrammar: V }),
        Z({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: V }),
        fe({ allowOptional: !1, allowVariadic: !1 }),
        _e,
      ],
      Zt = g({
        name: "assertsParslet",
        accept: (e) => e === "asserts",
        parsePrefix: (e) => {
          e.consume("asserts");
          const t = e.parseIntermediateType(f.SYMBOL);
          if (t.type !== "JsdocTypeName")
            throw new y(t, "A typescript asserts always has to have a name on the left side.");
          return e.consume("is"), { type: "JsdocTypeAsserts", left: t, right: w(e.parseIntermediateType(f.INFIX)) };
        },
      });
    function en({ allowQuestionMark: e }) {
      return g({
        name: "tupleParslet",
        accept: (t) => t === "[",
        parsePrefix: (t) => {
          t.consume("[");
          const r = { type: "JsdocTypeTuple", elements: [] };
          if (t.consume("]")) return r;
          const s = t.parseIntermediateType(f.ALL);
          if (
            (s.type === "JsdocTypeParameterList"
              ? s.elements[0].type === "JsdocTypeKeyValue"
                ? (r.elements = s.elements.map(Q))
                : (r.elements = s.elements.map(w))
              : s.type === "JsdocTypeKeyValue"
                ? (r.elements = [Q(s)])
                : (r.elements = [w(s)]),
            !t.consume("]"))
          )
            throw new Error("Unterminated '['");
          if (!e && r.elements.some((c) => c.type === "JsdocTypeUnknown"))
            throw new Error("Question mark in tuple not allowed");
          return r;
        },
      });
    }
    const tn = g({
        name: "keyOfParslet",
        accept: (e) => e === "keyof",
        parsePrefix: (e) => (e.consume("keyof"), { type: "JsdocTypeKeyof", element: w(e.parseType(f.KEY_OF_TYPE_OF)) }),
      }),
      nn = g({
        name: "importParslet",
        accept: (e) => e === "import",
        parsePrefix: (e) => {
          if ((e.consume("import"), !e.consume("("))) throw new Error("Missing parenthesis after import keyword");
          const t = e.parseType(f.PREFIX);
          if (t.type !== "JsdocTypeStringValue") throw new Error("Only string values are allowed as paths for imports");
          if (!e.consume(")")) throw new Error("Missing closing parenthesis after import keyword");
          return { type: "JsdocTypeImport", element: t };
        },
      }),
      rn = g({
        name: "readonlyPropertyParslet",
        accept: (e) => e === "readonly",
        parsePrefix: (e) => (
          e.consume("readonly"), { type: "JsdocTypeReadonlyProperty", element: e.parseType(f.KEY_VALUE) }
        ),
      }),
      an = g({
        name: "arrowFunctionParslet",
        precedence: f.ARROW,
        accept: (e) => e === "=>",
        parseInfix: (e, t) => (
          e.consume("=>"),
          {
            type: "JsdocTypeFunction",
            parameters: pe(t).map($t),
            arrow: !0,
            constructor: !1,
            parenthesis: !0,
            returnType: e.parseType(f.OBJECT),
          }
        ),
      }),
      on = g({
        name: "intersectionParslet",
        accept: (e) => e === "&",
        precedence: f.INTERSECTION,
        parseInfix: (e, t) => {
          e.consume("&");
          const r = [];
          do r.push(e.parseType(f.INTERSECTION));
          while (e.consume("&"));
          return { type: "JsdocTypeIntersection", elements: [w(t), ...r] };
        },
      }),
      sn = g({
        name: "predicateParslet",
        precedence: f.INFIX,
        accept: (e) => e === "is",
        parseInfix: (e, t) => {
          if (t.type !== "JsdocTypeName")
            throw new y(t, "A typescript predicate always has to have a name on the left side.");
          return e.consume("is"), { type: "JsdocTypePredicate", left: t, right: w(e.parseIntermediateType(f.INFIX)) };
        },
      }),
      ln = g({
        name: "objectSquareBracketPropertyParslet",
        accept: (e) => e === "[",
        parsePrefix: (e) => {
          if (e.baseParser === void 0) throw new Error("Only allowed inside object grammar");
          e.consume("[");
          const t = e.lexer.current.text;
          e.consume("Identifier");
          let r;
          if (e.consume(":")) {
            const s = e.baseParser;
            s.acceptLexerState(e),
              (r = { type: "JsdocTypeIndexSignature", key: t, right: s.parseType(f.INDEX_BRACKETS) }),
              e.acceptLexerState(s);
          } else if (e.consume("in")) {
            const s = e.baseParser;
            s.acceptLexerState(e),
              (r = { type: "JsdocTypeMappedType", key: t, right: s.parseType(f.ARRAY_BRACKETS) }),
              e.acceptLexerState(s);
          } else throw new Error("Missing ':' or 'in' inside square bracketed property.");
          if (!e.consume("]")) throw new Error("Unterminated square brackets");
          return r;
        },
      }),
      cn = [
        rn,
        I({ allowedAdditionalTokens: ["module", "event", "keyof", "event", "external", "in"] }),
        le,
        H,
        $,
        z,
        me({ allowSquaredProperties: !0, allowKeyTypes: !1, allowOptional: !0, allowReadonly: !0 }),
        ln,
      ],
      pn = [
        ...ce,
        de({ allowKeyTypes: !1, objectFieldGrammar: cn }),
        Le,
        tn,
        nn,
        $,
        ue({
          allowWithoutParenthesis: !0,
          allowNoReturnType: !1,
          allowNamedParameters: ["this", "new", "args"],
          allowNewAsFunctionKeyword: !0,
        }),
        en({ allowQuestionMark: !1 }),
        ye({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
        Zt,
        I({ allowedAdditionalTokens: ["event", "external", "in"] }),
        ee({ allowedTypes: ["module"], pathGrammar: V }),
        Fe,
        an,
        Z({ allowSquareBracketsOnAnyType: !0, allowJsdocNamePaths: !1, pathGrammar: V }),
        on,
        sn,
        fe({ allowVariadic: !0, allowOptional: !0 }),
      ];
    function Ue(e, t) {
      switch (t) {
        case "closure":
          return new U(zt, e).parse();
        case "jsdoc":
          return new U(Qt, e).parse();
        case "typescript":
          return new U(pn, e).parse();
      }
    }
    function un(e, t = ["typescript", "closure", "jsdoc"]) {
      let r;
      for (const s of t)
        try {
          return Ue(e, s);
        } catch (c) {
          r = c;
        }
      throw r;
    }
    function q(e, t) {
      const r = e[t.type];
      if (r === void 0) throw new Error(`In this set of transform rules exists no rule for type ${t.type}.`);
      return r(t, (s) => q(e, s));
    }
    function S(e) {
      throw new Error("This transform is not available. Are you trying the correct parsing mode?");
    }
    function Ve(e) {
      const t = { params: [] };
      for (const r of e.parameters)
        r.type === "JsdocTypeKeyValue"
          ? r.key === "this"
            ? (t.this = r.right)
            : r.key === "new"
              ? (t.new = r.right)
              : t.params.push(r)
          : t.params.push(r);
      return t;
    }
    function te(e, t, r) {
      return e === "prefix" ? r + t : t + r;
    }
    function A(e, t) {
      switch (t) {
        case "double":
          return `"${e}"`;
        case "single":
          return `'${e}'`;
        case void 0:
          return e;
      }
    }
    function Ke() {
      return {
        JsdocTypeParenthesis: (e, t) => `(${e.element !== void 0 ? t(e.element) : ""})`,
        JsdocTypeKeyof: (e, t) => `keyof ${t(e.element)}`,
        JsdocTypeFunction: (e, t) => {
          if (e.arrow) {
            if (e.returnType === void 0) throw new Error("Arrow function needs a return type.");
            let r = `(${e.parameters.map(t).join(", ")}) => ${t(e.returnType)}`;
            return e.constructor && (r = "new " + r), r;
          } else {
            let r = e.constructor ? "new" : "function";
            return (
              e.parenthesis &&
                ((r += `(${e.parameters.map(t).join(", ")})`),
                e.returnType !== void 0 && (r += `: ${t(e.returnType)}`)),
              r
            );
          }
        },
        JsdocTypeName: (e) => e.value,
        JsdocTypeTuple: (e, t) => `[${e.elements.map(t).join(", ")}]`,
        JsdocTypeVariadic: (e, t) => (e.meta.position === void 0 ? "..." : te(e.meta.position, t(e.element), "...")),
        JsdocTypeNamePath: (e, t) => {
          const r = t(e.left),
            s = t(e.right);
          switch (e.pathType) {
            case "inner":
              return `${r}~${s}`;
            case "instance":
              return `${r}#${s}`;
            case "property":
              return `${r}.${s}`;
            case "property-brackets":
              return `${r}[${s}]`;
          }
        },
        JsdocTypeStringValue: (e) => A(e.value, e.meta.quote),
        JsdocTypeAny: () => "*",
        JsdocTypeGeneric: (e, t) => {
          if (e.meta.brackets === "square") {
            const r = e.elements[0],
              s = t(r);
            return r.type === "JsdocTypeUnion" || r.type === "JsdocTypeIntersection" ? `(${s})[]` : `${s}[]`;
          } else return `${t(e.left)}${e.meta.dot ? "." : ""}<${e.elements.map(t).join(", ")}>`;
        },
        JsdocTypeImport: (e, t) => `import(${t(e.element)})`,
        JsdocTypeObjectField: (e, t) => {
          let r = "";
          return (
            e.readonly && (r += "readonly "),
            typeof e.key == "string" ? (r += A(e.key, e.meta.quote)) : (r += t(e.key)),
            e.optional && (r += "?"),
            e.right === void 0 ? r : r + `: ${t(e.right)}`
          );
        },
        JsdocTypeJsdocObjectField: (e, t) => `${t(e.left)}: ${t(e.right)}`,
        JsdocTypeKeyValue: (e, t) => {
          let r = e.key;
          return (
            e.optional && (r += "?"), e.variadic && (r = "..." + r), e.right === void 0 ? r : r + `: ${t(e.right)}`
          );
        },
        JsdocTypeSpecialNamePath: (e) => `${e.specialType}:${A(e.value, e.meta.quote)}`,
        JsdocTypeNotNullable: (e, t) => te(e.meta.position, t(e.element), "!"),
        JsdocTypeNull: () => "null",
        JsdocTypeNullable: (e, t) => te(e.meta.position, t(e.element), "?"),
        JsdocTypeNumber: (e) => e.value.toString(),
        JsdocTypeObject: (e, t) => `{${e.elements.map(t).join((e.meta.separator === "comma" ? "," : ";") + " ")}}`,
        JsdocTypeOptional: (e, t) => te(e.meta.position, t(e.element), "="),
        JsdocTypeSymbol: (e, t) => `${e.value}(${e.element !== void 0 ? t(e.element) : ""})`,
        JsdocTypeTypeof: (e, t) => `typeof ${t(e.element)}`,
        JsdocTypeUndefined: () => "undefined",
        JsdocTypeUnion: (e, t) => e.elements.map(t).join(" | "),
        JsdocTypeUnknown: () => "?",
        JsdocTypeIntersection: (e, t) => e.elements.map(t).join(" & "),
        JsdocTypeProperty: (e) => A(e.value, e.meta.quote),
        JsdocTypePredicate: (e, t) => `${t(e.left)} is ${t(e.right)}`,
        JsdocTypeIndexSignature: (e, t) => `[${e.key}: ${t(e.right)}]`,
        JsdocTypeMappedType: (e, t) => `[${e.key} in ${t(e.right)}]`,
        JsdocTypeAsserts: (e, t) => `asserts ${t(e.left)} is ${t(e.right)}`,
      };
    }
    const yn = Ke();
    function dn(e) {
      return q(yn, e);
    }
    const mn = [
      "null",
      "true",
      "false",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "export",
      "extends",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
    ];
    function R(e) {
      const t = { type: "NameExpression", name: e };
      return mn.includes(e) && (t.reservedWord = !0), t;
    }
    const fn = {
      JsdocTypeOptional: (e, t) => {
        const r = t(e.element);
        return (r.optional = !0), r;
      },
      JsdocTypeNullable: (e, t) => {
        const r = t(e.element);
        return (r.nullable = !0), r;
      },
      JsdocTypeNotNullable: (e, t) => {
        const r = t(e.element);
        return (r.nullable = !1), r;
      },
      JsdocTypeVariadic: (e, t) => {
        if (e.element === void 0) throw new Error("dots without value are not allowed in catharsis mode");
        const r = t(e.element);
        return (r.repeatable = !0), r;
      },
      JsdocTypeAny: () => ({ type: "AllLiteral" }),
      JsdocTypeNull: () => ({ type: "NullLiteral" }),
      JsdocTypeStringValue: (e) => R(A(e.value, e.meta.quote)),
      JsdocTypeUndefined: () => ({ type: "UndefinedLiteral" }),
      JsdocTypeUnknown: () => ({ type: "UnknownLiteral" }),
      JsdocTypeFunction: (e, t) => {
        const r = Ve(e),
          s = { type: "FunctionType", params: r.params.map(t) };
        return (
          r.this !== void 0 && (s.this = t(r.this)),
          r.new !== void 0 && (s.new = t(r.new)),
          e.returnType !== void 0 && (s.result = t(e.returnType)),
          s
        );
      },
      JsdocTypeGeneric: (e, t) => ({
        type: "TypeApplication",
        applications: e.elements.map((r) => t(r)),
        expression: t(e.left),
      }),
      JsdocTypeSpecialNamePath: (e) => R(e.specialType + ":" + A(e.value, e.meta.quote)),
      JsdocTypeName: (e) => (e.value !== "function" ? R(e.value) : { type: "FunctionType", params: [] }),
      JsdocTypeNumber: (e) => R(e.value.toString()),
      JsdocTypeObject: (e, t) => {
        const r = { type: "RecordType", fields: [] };
        for (const s of e.elements)
          s.type !== "JsdocTypeObjectField" && s.type !== "JsdocTypeJsdocObjectField"
            ? r.fields.push({ type: "FieldType", key: t(s), value: void 0 })
            : r.fields.push(t(s));
        return r;
      },
      JsdocTypeObjectField: (e, t) => {
        if (typeof e.key != "string") throw new Error("Index signatures and mapped types are not supported");
        return { type: "FieldType", key: R(A(e.key, e.meta.quote)), value: e.right === void 0 ? void 0 : t(e.right) };
      },
      JsdocTypeJsdocObjectField: (e, t) => ({ type: "FieldType", key: t(e.left), value: t(e.right) }),
      JsdocTypeUnion: (e, t) => ({ type: "TypeUnion", elements: e.elements.map((r) => t(r)) }),
      JsdocTypeKeyValue: (e, t) => ({
        type: "FieldType",
        key: R(e.key),
        value: e.right === void 0 ? void 0 : t(e.right),
      }),
      JsdocTypeNamePath: (e, t) => {
        const r = t(e.left);
        let s;
        e.right.type === "JsdocTypeSpecialNamePath"
          ? (s = t(e.right).name)
          : (s = A(e.right.value, e.right.meta.quote));
        const c = e.pathType === "inner" ? "~" : e.pathType === "instance" ? "#" : ".";
        return R(`${r.name}${c}${s}`);
      },
      JsdocTypeSymbol: (e) => {
        let t = "",
          r = e.element,
          s = !1;
        return (
          (r == null ? void 0 : r.type) === "JsdocTypeVariadic" &&
            (r.meta.position === "prefix" ? (t = "...") : (s = !0), (r = r.element)),
          (r == null ? void 0 : r.type) === "JsdocTypeName"
            ? (t += r.value)
            : (r == null ? void 0 : r.type) === "JsdocTypeNumber" && (t += r.value.toString()),
          s && (t += "..."),
          R(`${e.value}(${t})`)
        );
      },
      JsdocTypeParenthesis: (e, t) => t(w(e.element)),
      JsdocTypeMappedType: S,
      JsdocTypeIndexSignature: S,
      JsdocTypeImport: S,
      JsdocTypeKeyof: S,
      JsdocTypeTuple: S,
      JsdocTypeTypeof: S,
      JsdocTypeIntersection: S,
      JsdocTypeProperty: S,
      JsdocTypePredicate: S,
      JsdocTypeAsserts: S,
    };
    function Tn(e) {
      return q(fn, e);
    }
    function j(e) {
      switch (e) {
        case void 0:
          return "none";
        case "single":
          return "single";
        case "double":
          return "double";
      }
    }
    function hn(e) {
      switch (e) {
        case "inner":
          return "INNER_MEMBER";
        case "instance":
          return "INSTANCE_MEMBER";
        case "property":
          return "MEMBER";
        case "property-brackets":
          return "MEMBER";
      }
    }
    function Te(e, t) {
      return t.length === 2 ? { type: e, left: t[0], right: t[1] } : { type: e, left: t[0], right: Te(e, t.slice(1)) };
    }
    const gn = {
      JsdocTypeOptional: (e, t) => ({
        type: "OPTIONAL",
        value: t(e.element),
        meta: { syntax: e.meta.position === "prefix" ? "PREFIX_EQUAL_SIGN" : "SUFFIX_EQUALS_SIGN" },
      }),
      JsdocTypeNullable: (e, t) => ({
        type: "NULLABLE",
        value: t(e.element),
        meta: { syntax: e.meta.position === "prefix" ? "PREFIX_QUESTION_MARK" : "SUFFIX_QUESTION_MARK" },
      }),
      JsdocTypeNotNullable: (e, t) => ({
        type: "NOT_NULLABLE",
        value: t(e.element),
        meta: { syntax: e.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG" },
      }),
      JsdocTypeVariadic: (e, t) => {
        const r = {
          type: "VARIADIC",
          meta: {
            syntax:
              e.meta.position === "prefix" ? "PREFIX_DOTS" : e.meta.position === "suffix" ? "SUFFIX_DOTS" : "ONLY_DOTS",
          },
        };
        return e.element !== void 0 && (r.value = t(e.element)), r;
      },
      JsdocTypeName: (e) => ({ type: "NAME", name: e.value }),
      JsdocTypeTypeof: (e, t) => ({ type: "TYPE_QUERY", name: t(e.element) }),
      JsdocTypeTuple: (e, t) => ({ type: "TUPLE", entries: e.elements.map(t) }),
      JsdocTypeKeyof: (e, t) => ({ type: "KEY_QUERY", value: t(e.element) }),
      JsdocTypeImport: (e) => ({
        type: "IMPORT",
        path: { type: "STRING_VALUE", quoteStyle: j(e.element.meta.quote), string: e.element.value },
      }),
      JsdocTypeUndefined: () => ({ type: "NAME", name: "undefined" }),
      JsdocTypeAny: () => ({ type: "ANY" }),
      JsdocTypeFunction: (e, t) => {
        const r = Ve(e),
          s = {
            type: e.arrow ? "ARROW" : "FUNCTION",
            params: r.params.map((c) => {
              if (c.type === "JsdocTypeKeyValue") {
                if (c.right === void 0)
                  throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
                return { type: "NAMED_PARAMETER", name: c.key, typeName: t(c.right) };
              } else return t(c);
            }),
            new: null,
            returns: null,
          };
        return (
          r.this !== void 0 ? (s.this = t(r.this)) : e.arrow || (s.this = null),
          r.new !== void 0 && (s.new = t(r.new)),
          e.returnType !== void 0 && (s.returns = t(e.returnType)),
          s
        );
      },
      JsdocTypeGeneric: (e, t) => {
        const r = {
          type: "GENERIC",
          subject: t(e.left),
          objects: e.elements.map(t),
          meta: {
            syntax:
              e.meta.brackets === "square" ? "SQUARE_BRACKET" : e.meta.dot ? "ANGLE_BRACKET_WITH_DOT" : "ANGLE_BRACKET",
          },
        };
        return (
          e.meta.brackets === "square" &&
            e.elements[0].type === "JsdocTypeFunction" &&
            !e.elements[0].parenthesis &&
            (r.objects[0] = { type: "NAME", name: "function" }),
          r
        );
      },
      JsdocTypeObjectField: (e, t) => {
        if (typeof e.key != "string") throw new Error("Index signatures and mapped types are not supported");
        if (e.right === void 0)
          return { type: "RECORD_ENTRY", key: e.key, quoteStyle: j(e.meta.quote), value: null, readonly: !1 };
        let r = t(e.right);
        return (
          e.optional && (r = { type: "OPTIONAL", value: r, meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" } }),
          { type: "RECORD_ENTRY", key: e.key.toString(), quoteStyle: j(e.meta.quote), value: r, readonly: !1 }
        );
      },
      JsdocTypeJsdocObjectField: () => {
        throw new Error("Keys may not be typed in jsdoctypeparser.");
      },
      JsdocTypeKeyValue: (e, t) => {
        if (e.right === void 0)
          return { type: "RECORD_ENTRY", key: e.key, quoteStyle: "none", value: null, readonly: !1 };
        let r = t(e.right);
        return (
          e.optional && (r = { type: "OPTIONAL", value: r, meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" } }),
          { type: "RECORD_ENTRY", key: e.key, quoteStyle: "none", value: r, readonly: !1 }
        );
      },
      JsdocTypeObject: (e, t) => {
        const r = [];
        for (const s of e.elements)
          (s.type === "JsdocTypeObjectField" || s.type === "JsdocTypeJsdocObjectField") && r.push(t(s));
        return { type: "RECORD", entries: r };
      },
      JsdocTypeSpecialNamePath: (e) => {
        if (e.specialType !== "module")
          throw new Error(`jsdoctypeparser does not support type ${e.specialType} at this point.`);
        return { type: "MODULE", value: { type: "FILE_PATH", quoteStyle: j(e.meta.quote), path: e.value } };
      },
      JsdocTypeNamePath: (e, t) => {
        let r = !1,
          s,
          c;
        e.right.type === "JsdocTypeSpecialNamePath" && e.right.specialType === "event"
          ? ((r = !0), (s = e.right.value), (c = j(e.right.meta.quote)))
          : ((s = e.right.value), (c = j(e.right.meta.quote)));
        const d = { type: hn(e.pathType), owner: t(e.left), name: s, quoteStyle: c, hasEventPrefix: r };
        if (d.owner.type === "MODULE") {
          const T = d.owner;
          return (d.owner = d.owner.value), (T.value = d), T;
        } else return d;
      },
      JsdocTypeUnion: (e, t) => Te("UNION", e.elements.map(t)),
      JsdocTypeParenthesis: (e, t) => ({ type: "PARENTHESIS", value: t(w(e.element)) }),
      JsdocTypeNull: () => ({ type: "NAME", name: "null" }),
      JsdocTypeUnknown: () => ({ type: "UNKNOWN" }),
      JsdocTypeStringValue: (e) => ({ type: "STRING_VALUE", quoteStyle: j(e.meta.quote), string: e.value }),
      JsdocTypeIntersection: (e, t) => Te("INTERSECTION", e.elements.map(t)),
      JsdocTypeNumber: (e) => ({ type: "NUMBER_VALUE", number: e.value.toString() }),
      JsdocTypeSymbol: S,
      JsdocTypeProperty: S,
      JsdocTypePredicate: S,
      JsdocTypeMappedType: S,
      JsdocTypeIndexSignature: S,
      JsdocTypeAsserts: S,
    };
    function Jn(e) {
      return q(gn, e);
    }
    function wn() {
      return {
        JsdocTypeIntersection: (e, t) => ({ type: "JsdocTypeIntersection", elements: e.elements.map(t) }),
        JsdocTypeGeneric: (e, t) => ({
          type: "JsdocTypeGeneric",
          left: t(e.left),
          elements: e.elements.map(t),
          meta: { dot: e.meta.dot, brackets: e.meta.brackets },
        }),
        JsdocTypeNullable: (e) => e,
        JsdocTypeUnion: (e, t) => ({ type: "JsdocTypeUnion", elements: e.elements.map(t) }),
        JsdocTypeUnknown: (e) => e,
        JsdocTypeUndefined: (e) => e,
        JsdocTypeTypeof: (e, t) => ({ type: "JsdocTypeTypeof", element: t(e.element) }),
        JsdocTypeSymbol: (e, t) => {
          const r = { type: "JsdocTypeSymbol", value: e.value };
          return e.element !== void 0 && (r.element = t(e.element)), r;
        },
        JsdocTypeOptional: (e, t) => ({
          type: "JsdocTypeOptional",
          element: t(e.element),
          meta: { position: e.meta.position },
        }),
        JsdocTypeObject: (e, t) => ({
          type: "JsdocTypeObject",
          meta: { separator: "comma" },
          elements: e.elements.map(t),
        }),
        JsdocTypeNumber: (e) => e,
        JsdocTypeNull: (e) => e,
        JsdocTypeNotNullable: (e, t) => ({
          type: "JsdocTypeNotNullable",
          element: t(e.element),
          meta: { position: e.meta.position },
        }),
        JsdocTypeSpecialNamePath: (e) => e,
        JsdocTypeObjectField: (e, t) => ({
          type: "JsdocTypeObjectField",
          key: e.key,
          right: e.right === void 0 ? void 0 : t(e.right),
          optional: e.optional,
          readonly: e.readonly,
          meta: e.meta,
        }),
        JsdocTypeJsdocObjectField: (e, t) => ({
          type: "JsdocTypeJsdocObjectField",
          left: t(e.left),
          right: t(e.right),
        }),
        JsdocTypeKeyValue: (e, t) => ({
          type: "JsdocTypeKeyValue",
          key: e.key,
          right: e.right === void 0 ? void 0 : t(e.right),
          optional: e.optional,
          variadic: e.variadic,
        }),
        JsdocTypeImport: (e, t) => ({ type: "JsdocTypeImport", element: t(e.element) }),
        JsdocTypeAny: (e) => e,
        JsdocTypeStringValue: (e) => e,
        JsdocTypeNamePath: (e) => e,
        JsdocTypeVariadic: (e, t) => {
          const r = {
            type: "JsdocTypeVariadic",
            meta: { position: e.meta.position, squareBrackets: e.meta.squareBrackets },
          };
          return e.element !== void 0 && (r.element = t(e.element)), r;
        },
        JsdocTypeTuple: (e, t) => ({ type: "JsdocTypeTuple", elements: e.elements.map(t) }),
        JsdocTypeName: (e) => e,
        JsdocTypeFunction: (e, t) => {
          const r = {
            type: "JsdocTypeFunction",
            arrow: e.arrow,
            parameters: e.parameters.map(t),
            constructor: e.constructor,
            parenthesis: e.parenthesis,
          };
          return e.returnType !== void 0 && (r.returnType = t(e.returnType)), r;
        },
        JsdocTypeKeyof: (e, t) => ({ type: "JsdocTypeKeyof", element: t(e.element) }),
        JsdocTypeParenthesis: (e, t) => ({ type: "JsdocTypeParenthesis", element: t(e.element) }),
        JsdocTypeProperty: (e) => e,
        JsdocTypePredicate: (e, t) => ({ type: "JsdocTypePredicate", left: t(e.left), right: t(e.right) }),
        JsdocTypeIndexSignature: (e, t) => ({ type: "JsdocTypeIndexSignature", key: e.key, right: t(e.right) }),
        JsdocTypeMappedType: (e, t) => ({ type: "JsdocTypeMappedType", key: e.key, right: t(e.right) }),
        JsdocTypeAsserts: (e, t) => ({ type: "JsdocTypeAsserts", left: t(e.left), right: t(e.right) }),
      };
    }
    const De = {
      JsdocTypeAny: [],
      JsdocTypeFunction: ["parameters", "returnType"],
      JsdocTypeGeneric: ["left", "elements"],
      JsdocTypeImport: [],
      JsdocTypeIndexSignature: ["right"],
      JsdocTypeIntersection: ["elements"],
      JsdocTypeKeyof: ["element"],
      JsdocTypeKeyValue: ["right"],
      JsdocTypeMappedType: ["right"],
      JsdocTypeName: [],
      JsdocTypeNamePath: ["left", "right"],
      JsdocTypeNotNullable: ["element"],
      JsdocTypeNull: [],
      JsdocTypeNullable: ["element"],
      JsdocTypeNumber: [],
      JsdocTypeObject: ["elements"],
      JsdocTypeObjectField: ["right"],
      JsdocTypeJsdocObjectField: ["left", "right"],
      JsdocTypeOptional: ["element"],
      JsdocTypeParenthesis: ["element"],
      JsdocTypeSpecialNamePath: [],
      JsdocTypeStringValue: [],
      JsdocTypeSymbol: ["element"],
      JsdocTypeTuple: ["elements"],
      JsdocTypeTypeof: ["element"],
      JsdocTypeUndefined: [],
      JsdocTypeUnion: ["elements"],
      JsdocTypeUnknown: [],
      JsdocTypeVariadic: ["element"],
      JsdocTypeProperty: [],
      JsdocTypePredicate: ["left", "right"],
      JsdocTypeAsserts: ["left", "right"],
    };
    function he(e, t, r, s, c) {
      s == null || s(e, t, r);
      const d = De[e.type];
      for (const T of d) {
        const J = e[T];
        if (J !== void 0)
          if (Array.isArray(J)) for (const k of J) he(k, e, T, s, c);
          else he(J, e, T, s, c);
      }
      c == null || c(e, t, r);
    }
    function Nn(e, t, r) {
      he(e, void 0, void 0, t, r);
    }
    (o.catharsisTransform = Tn),
      (o.identityTransformRules = wn),
      (o.jtpTransform = Jn),
      (o.parse = Ue),
      (o.stringify = dn),
      (o.stringifyRules = Ke),
      (o.transform = q),
      (o.traverse = Nn),
      (o.tryParse = un),
      (o.visitorKeys = De);
  });
})(ge, ge.exports);
var Je = ge.exports,
  En = Object.defineProperty,
  l = (n, a) => En(n, "name", { value: a, configurable: !0 });
const { UnknownArgTypesError: Pn } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var vn = l((n) => n.name === "literal", "isLiteral"),
  Sn = l((n) => n.value.replace(/['|"]/g, ""), "toEnumOption"),
  kn = l((n) => {
    switch (n.type) {
      case "function":
        return { name: "function" };
      case "object":
        let a = {};
        return (
          n.signature.properties.forEach((o) => {
            a[o.key] = C(o.value);
          }),
          { name: "object", value: a }
        );
      default:
        throw new Pn({ type: n, language: "Flow" });
    }
  }, "convertSig"),
  C = l((n) => {
    var p, u, y, m;
    let { name: a, raw: o } = n,
      i = {};
    switch ((typeof o < "u" && (i.raw = o), n.name)) {
      case "literal":
        return { ...i, name: "other", value: n.value };
      case "string":
      case "number":
      case "symbol":
      case "boolean":
        return { ...i, name: a };
      case "Array":
        return { ...i, name: "array", value: n.elements.map(C) };
      case "signature":
        return { ...i, ...kn(n) };
      case "union":
        return (p = n.elements) != null && p.every(vn)
          ? { ...i, name: "enum", value: (u = n.elements) == null ? void 0 : u.map(Sn) }
          : { ...i, name: a, value: (y = n.elements) == null ? void 0 : y.map(C) };
      case "intersection":
        return { ...i, name: a, value: (m = n.elements) == null ? void 0 : m.map(C) };
      default:
        return { ...i, name: "other", value: a };
    }
  }, "convert");
function Be(n, a) {
  let o = {},
    i = Object.keys(n);
  for (let p = 0; p < i.length; p++) {
    let u = i[p],
      y = n[u];
    o[u] = a(y, u, n);
  }
  return o;
}
l(Be, "mapValues");
var Me = /^['"]|['"]$/g,
  xn = l((n) => n.replace(Me, ""), "trimQuotes"),
  On = l((n) => Me.test(n), "includesQuotes"),
  Ce = l((n) => {
    let a = xn(n);
    return On(n) || Number.isNaN(Number(a)) ? a : Number(a);
  }, "parseLiteral"),
  In = /^\(.*\) => /,
  M = l((n) => {
    let { name: a, raw: o, computed: i, value: p } = n,
      u = {};
    switch ((typeof o < "u" && (u.raw = o), a)) {
      case "enum": {
        let m = i ? p : p.map((h) => Ce(h.value));
        return { ...u, name: a, value: m };
      }
      case "string":
      case "number":
      case "symbol":
        return { ...u, name: a };
      case "func":
        return { ...u, name: "function" };
      case "bool":
      case "boolean":
        return { ...u, name: "boolean" };
      case "arrayOf":
      case "array":
        return { ...u, name: "array", value: p && M(p) };
      case "object":
        return { ...u, name: a };
      case "objectOf":
        return { ...u, name: a, value: M(p) };
      case "shape":
      case "exact":
        let y = Be(p, (m) => M(m));
        return { ...u, name: "object", value: y };
      case "union":
        return { ...u, name: "union", value: p.map((m) => M(m)) };
      case "instanceOf":
      case "element":
      case "elementType":
      default: {
        if ((a == null ? void 0 : a.indexOf("|")) > 0)
          try {
            let E = a.split("|").map((N) => JSON.parse(N));
            return { ...u, name: "enum", value: E };
          } catch {}
        let m = p ? `${a}(${p})` : a,
          h = In.test(a) ? "function" : "other";
        return { ...u, name: h, value: m };
      }
    }
  }, "convert");
const { UnknownArgTypesError: An } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var Rn = l((n) => {
    switch (n.type) {
      case "function":
        return { name: "function" };
      case "object":
        let a = {};
        return (
          n.signature.properties.forEach((o) => {
            a[o.key] = Y(o.value);
          }),
          { name: "object", value: a }
        );
      default:
        throw new An({ type: n, language: "Typescript" });
    }
  }, "convertSig"),
  Y = l((n) => {
    var p, u, y, m;
    let { name: a, raw: o } = n,
      i = {};
    switch ((typeof o < "u" && (i.raw = o), n.name)) {
      case "string":
      case "number":
      case "symbol":
      case "boolean":
        return { ...i, name: a };
      case "Array":
        return { ...i, name: "array", value: n.elements.map(Y) };
      case "signature":
        return { ...i, ...Rn(n) };
      case "union":
        let h;
        return (
          (p = n.elements) != null && p.every((E) => E.name === "literal")
            ? (h = { ...i, name: "enum", value: (u = n.elements) == null ? void 0 : u.map((E) => Ce(E.value)) })
            : (h = { ...i, name: a, value: (y = n.elements) == null ? void 0 : y.map(Y) }),
          h
        );
      case "intersection":
        return { ...i, name: a, value: (m = n.elements) == null ? void 0 : m.map(Y) };
      default:
        return { ...i, name: "other", value: a };
    }
  }, "convert"),
  we = l((n) => {
    let { type: a, tsType: o, flowType: i } = n;
    try {
      if (a != null) return M(a);
      if (o != null) return Y(o);
      if (i != null) return C(i);
    } catch (p) {
      console.error(p);
    }
    return null;
  }, "convert"),
  _n = ((n) => (
    (n.JAVASCRIPT = "JavaScript"), (n.FLOW = "Flow"), (n.TYPESCRIPT = "TypeScript"), (n.UNKNOWN = "Unknown"), n
  ))(_n || {}),
  Fn = ["null", "undefined"];
function re(n) {
  return Fn.some((a) => a === n);
}
l(re, "isDefaultValueBlacklisted");
var jn = l((n) => {
  if (!n) return "";
  if (typeof n == "string") return n;
  throw new Error(`Description: expected string, got: ${JSON.stringify(n)}`);
}, "str");
function Ne(n) {
  return !!n.__docgenInfo;
}
l(Ne, "hasDocgen");
function Ye(n) {
  return n != null && Object.keys(n).length > 0;
}
l(Ye, "isValidDocgenSection");
function Ge(n, a) {
  return Ne(n) ? n.__docgenInfo[a] : null;
}
l(Ge, "getDocgenSection");
function We(n) {
  return Ne(n) ? jn(n.__docgenInfo.description) : "";
}
l(We, "getDocgenDescription");
var _;
(function (n) {
  (n.start = "/**"), (n.nostart = "/***"), (n.delim = "*"), (n.end = "*/");
})((_ = _ || (_ = {})));
function Xe(n) {
  return /^\s+$/.test(n);
}
l(Xe, "isSpace");
function Qe(n) {
  let a = n.match(/\r+$/);
  return a == null ? ["", n] : [n.slice(-a[0].length), n.slice(0, -a[0].length)];
}
l(Qe, "splitCR");
function L(n) {
  let a = n.match(/^\s+/);
  return a == null ? ["", n] : [n.slice(0, a[0].length), n.slice(a[0].length)];
}
l(L, "splitSpace");
function He(n) {
  return n.split(/\n/);
}
l(He, "splitLines");
function ze(n = {}) {
  return Object.assign({ tag: "", name: "", type: "", optional: !1, description: "", problems: [], source: [] }, n);
}
l(ze, "seedSpec");
function Ze(n = {}) {
  return Object.assign(
    {
      start: "",
      delimiter: "",
      postDelimiter: "",
      tag: "",
      postTag: "",
      name: "",
      postName: "",
      type: "",
      postType: "",
      description: "",
      end: "",
      lineEnd: "",
    },
    n
  );
}
l(Ze, "seedTokens");
var Ln = /^@\S+/;
function et({ fence: n = "```" } = {}) {
  let a = tt(n),
    o = l((i, p) => (a(i) ? !p : p), "toggleFence");
  return l(function (i) {
    let p = [[]],
      u = !1;
    for (let y of i)
      Ln.test(y.tokens.description) && !u ? p.push([y]) : p[p.length - 1].push(y), (u = o(y.tokens.description, u));
    return p;
  }, "parseBlock");
}
l(et, "getParser");
function tt(n) {
  return typeof n == "string" ? (a) => a.split(n).length % 2 === 0 : n;
}
l(tt, "getFencer");
function nt({ startLine: n = 0, markers: a = _ } = {}) {
  let o = null,
    i = n;
  return l(function (p) {
    let u = p,
      y = Ze();
    if (
      (([y.lineEnd, u] = Qe(u)),
      ([y.start, u] = L(u)),
      o === null &&
        u.startsWith(a.start) &&
        !u.startsWith(a.nostart) &&
        ((o = []),
        (y.delimiter = u.slice(0, a.start.length)),
        (u = u.slice(a.start.length)),
        ([y.postDelimiter, u] = L(u))),
      o === null)
    )
      return i++, null;
    let m = u.trimRight().endsWith(a.end);
    if (
      (y.delimiter === "" &&
        u.startsWith(a.delim) &&
        !u.startsWith(a.end) &&
        ((y.delimiter = a.delim), (u = u.slice(a.delim.length)), ([y.postDelimiter, u] = L(u))),
      m)
    ) {
      let h = u.trimRight();
      (y.end = u.slice(h.length - a.end.length)), (u = h.slice(0, -a.end.length));
    }
    if (((y.description = u), o.push({ number: i, source: p, tokens: y }), i++, m)) {
      let h = o.slice();
      return (o = null), h;
    }
    return null;
  }, "parseSource");
}
l(nt, "getParser");
function rt({ tokenizers: n }) {
  return l(function (a) {
    var o;
    let i = ze({ source: a });
    for (let p of n)
      if (((i = p(i)), !((o = i.problems[i.problems.length - 1]) === null || o === void 0) && o.critical)) break;
    return i;
  }, "parseSpec");
}
l(rt, "getParser");
function at() {
  return (n) => {
    let { tokens: a } = n.source[0],
      o = a.description.match(/\s*(@(\S+))(\s*)/);
    return o === null
      ? (n.problems.push({
          code: "spec:tag:prefix",
          message: 'tag should start with "@" symbol',
          line: n.source[0].number,
          critical: !0,
        }),
        n)
      : ((a.tag = o[1]), (a.postTag = o[3]), (a.description = a.description.slice(o[0].length)), (n.tag = o[2]), n);
  };
}
l(at, "tagTokenizer");
function ot(n = "compact") {
  let a = st(n);
  return (o) => {
    let i = 0,
      p = [];
    for (let [m, { tokens: h }] of o.source.entries()) {
      let E = "";
      if (m === 0 && h.description[0] !== "{") return o;
      for (let N of h.description) if ((N === "{" && i++, N === "}" && i--, (E += N), i === 0)) break;
      if ((p.push([h, E]), i === 0)) break;
    }
    if (i !== 0)
      return (
        o.problems.push({
          code: "spec:type:unpaired-curlies",
          message: "unpaired curlies",
          line: o.source[0].number,
          critical: !0,
        }),
        o
      );
    let u = [],
      y = p[0][0].postDelimiter.length;
    for (let [m, [h, E]] of p.entries())
      (h.type = E),
        m > 0 && ((h.type = h.postDelimiter.slice(y) + E), (h.postDelimiter = h.postDelimiter.slice(0, y))),
        ([h.postType, h.description] = L(h.description.slice(E.length))),
        u.push(h.type);
    return (u[0] = u[0].slice(1)), (u[u.length - 1] = u[u.length - 1].slice(0, -1)), (o.type = a(u)), o;
  };
}
l(ot, "typeTokenizer");
var Un = l((n) => n.trim(), "trim");
function st(n) {
  return n === "compact"
    ? (a) => a.map(Un).join("")
    : n === "preserve"
      ? (a) =>
          a.join(`
`)
      : n;
}
l(st, "getJoiner");
var Vn = l((n) => n && n.startsWith('"') && n.endsWith('"'), "isQuoted");
function it() {
  let n = l((a, { tokens: o }, i) => (o.type === "" ? a : i), "typeEnd");
  return (a) => {
    let { tokens: o } = a.source[a.source.reduce(n, 0)],
      i = o.description.trimLeft(),
      p = i.split('"');
    if (p.length > 1 && p[0] === "" && p.length % 2 === 1)
      return (a.name = p[1]), (o.name = `"${p[1]}"`), ([o.postName, o.description] = L(i.slice(o.name.length))), a;
    let u = 0,
      y = "",
      m = !1,
      h;
    for (let N of i) {
      if (u === 0 && Xe(N)) break;
      N === "[" && u++, N === "]" && u--, (y += N);
    }
    if (u !== 0)
      return (
        a.problems.push({
          code: "spec:name:unpaired-brackets",
          message: "unpaired brackets",
          line: a.source[0].number,
          critical: !0,
        }),
        a
      );
    let E = y;
    if (y[0] === "[" && y[y.length - 1] === "]") {
      (m = !0), (y = y.slice(1, -1));
      let N = y.split("=");
      if (((y = N[0].trim()), N[1] !== void 0 && (h = N.slice(1).join("=").trim()), y === ""))
        return (
          a.problems.push({
            code: "spec:name:empty-name",
            message: "empty name",
            line: a.source[0].number,
            critical: !0,
          }),
          a
        );
      if (h === "")
        return (
          a.problems.push({
            code: "spec:name:empty-default",
            message: "empty default value",
            line: a.source[0].number,
            critical: !0,
          }),
          a
        );
      if (!Vn(h) && /=(?!>)/.test(h))
        return (
          a.problems.push({
            code: "spec:name:invalid-default",
            message: "invalid default value syntax",
            line: a.source[0].number,
            critical: !0,
          }),
          a
        );
    }
    return (
      (a.optional = m),
      (a.name = y),
      (o.name = E),
      h !== void 0 && (a.default = h),
      ([o.postName, o.description] = L(i.slice(o.name.length))),
      a
    );
  };
}
l(it, "nameTokenizer");
function lt(n = "compact", a = _) {
  let o = be(n);
  return (i) => ((i.description = o(i.source, a)), i);
}
l(lt, "descriptionTokenizer");
function be(n) {
  return n === "compact" ? ct : n === "preserve" ? pt : n;
}
l(be, "getJoiner");
function ct(n, a = _) {
  return n
    .map(({ tokens: { description: o } }) => o.trim())
    .filter((o) => o !== "")
    .join(" ");
}
l(ct, "compactJoiner");
var Kn = l((n, { tokens: a }, o) => (a.type === "" ? n : o), "lineNo"),
  Dn = l(
    ({ tokens: n }) => (n.delimiter === "" ? n.start : n.postDelimiter.slice(1)) + n.description,
    "getDescription"
  );
function pt(n, a = _) {
  if (n.length === 0) return "";
  n[0].tokens.description === "" && n[0].tokens.delimiter === a.start && (n = n.slice(1));
  let o = n[n.length - 1];
  return (
    o !== void 0 && o.tokens.description === "" && o.tokens.end.endsWith(a.end) && (n = n.slice(0, -1)),
    (n = n.slice(n.reduce(Kn, 0))),
    n.map(Dn).join(`
`)
  );
}
l(pt, "preserveJoiner");
function ut({
  startLine: n = 0,
  fence: a = "```",
  spacing: o = "compact",
  markers: i = _,
  tokenizers: p = [at(), ot(o), it(), lt(o)],
} = {}) {
  if (n < 0 || n % 1 > 0) throw new Error("Invalid startLine");
  let u = nt({ startLine: n, markers: i }),
    y = et({ fence: a }),
    m = rt({ tokenizers: p }),
    h = be(o);
  return function (E) {
    let N = [];
    for (let ae of He(E)) {
      let K = u(ae);
      if (K === null) continue;
      let W = y(K),
        X = W.slice(1).map(m);
      N.push({ description: h(W[0], i), tags: X, source: K, problems: X.reduce((P, oe) => P.concat(oe.problems), []) });
    }
    return N;
  };
}
l(ut, "getParser");
function yt(n) {
  return (
    n.start +
    n.delimiter +
    n.postDelimiter +
    n.tag +
    n.postTag +
    n.type +
    n.postType +
    n.name +
    n.postName +
    n.description +
    n.end +
    n.lineEnd
  );
}
l(yt, "join");
function $n() {
  return (n) =>
    n.source.map(({ tokens: a }) => yt(a)).join(`
`);
}
l($n, "getStringifier");
function dt(n, a = {}) {
  return ut(a)(n);
}
l(dt, "parse");
function mt(n) {
  return n != null && n.includes("@");
}
l(mt, "containsJsDoc");
function ft(n) {
  let a =
      `/**
` +
      (n ?? "")
        .split(
          `
`
        )
        .map((i) => ` * ${i}`).join(`
`) +
      `
*/`,
    o = dt(a, { spacing: "preserve" });
  if (!o || o.length === 0) throw new Error("Cannot parse JSDoc tags.");
  return o[0];
}
l(ft, "parse");
var qn = { tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"] },
  Bn = l((n, a = qn) => {
    if (!mt(n)) return { includesJsDoc: !1, ignore: !1 };
    let o = ft(n),
      i = Tt(o, a.tags);
    return i.ignore
      ? { includesJsDoc: !0, ignore: !0 }
      : { includesJsDoc: !0, ignore: !1, description: o.description.trim(), extractedTags: i };
  }, "parseJsDoc");
function Tt(n, a) {
  let o = { params: null, deprecated: null, returns: null, ignore: !1 };
  for (let i of n.tags)
    if (!(a !== void 0 && !a.includes(i.tag)))
      if (i.tag === "ignore") {
        o.ignore = !0;
        break;
      } else
        switch (i.tag) {
          case "param":
          case "arg":
          case "argument": {
            let p = gt(i);
            p != null && (o.params == null && (o.params = []), o.params.push(p));
            break;
          }
          case "deprecated": {
            let p = Jt(i);
            p != null && (o.deprecated = p);
            break;
          }
          case "returns": {
            let p = wt(i);
            p != null && (o.returns = p);
            break;
          }
        }
  return o;
}
l(Tt, "extractJsDocTags");
function ht(n) {
  return n.replace(/[\.-]$/, "");
}
l(ht, "normaliseParamName");
function gt(n) {
  if (!n.name || n.name === "-") return null;
  let a = ve(n.type);
  return {
    name: n.name,
    type: a,
    description: Pe(n.description),
    getPrettyName: l(() => ht(n.name), "getPrettyName"),
    getTypeName: l(() => (a ? Se(a) : null), "getTypeName"),
  };
}
l(gt, "extractParam");
function Jt(n) {
  return n.name ? Ee(n.name, n.description) : null;
}
l(Jt, "extractDeprecated");
function Ee(n, a) {
  let o = n === "" ? a : `${n} ${a}`;
  return Pe(o);
}
l(Ee, "joinNameAndDescription");
function Pe(n) {
  let a = n.replace(/^- /g, "").trim();
  return a === "" ? null : a;
}
l(Pe, "normaliseDescription");
function wt(n) {
  let a = ve(n.type);
  return a ? { type: a, description: Ee(n.name, n.description), getTypeName: l(() => Se(a), "getTypeName") } : null;
}
l(wt, "extractReturns");
var F = Je.stringifyRules(),
  Mn = F.JsdocTypeObject;
F.JsdocTypeAny = () => "any";
F.JsdocTypeObject = (n, a) => `(${Mn(n, a)})`;
F.JsdocTypeOptional = (n, a) => a(n.element);
F.JsdocTypeNullable = (n, a) => a(n.element);
F.JsdocTypeNotNullable = (n, a) => a(n.element);
F.JsdocTypeUnion = (n, a) => n.elements.map(a).join("|");
function ve(n) {
  try {
    return Je.parse(n, "typescript");
  } catch {
    return null;
  }
}
l(ve, "extractType");
function Se(n) {
  return Je.transform(F, n);
}
l(Se, "extractTypeName");
function ke(n) {
  return n.length > 90;
}
l(ke, "isTooLongForTypeSummary");
function Nt(n) {
  return n.length > 50;
}
l(Nt, "isTooLongForDefaultValueSummary");
function b(n, a) {
  return n === a ? { summary: n } : { summary: n, detail: a };
}
l(b, "createSummaryValue");
function bt(n, a) {
  if (n != null) {
    let { value: o } = n;
    if (!re(o)) return Nt(o) ? b(a == null ? void 0 : a.name, o) : b(o);
  }
  return null;
}
l(bt, "createDefaultValue");
function xe({ name: n, value: a, elements: o, raw: i }) {
  return a ?? (o != null ? o.map(xe).join(" | ") : (i ?? n));
}
l(xe, "generateUnionElement");
function Et({ name: n, raw: a, elements: o }) {
  return o != null ? b(o.map(xe).join(" | ")) : a != null ? b(a.replace(/^\|\s*/, "")) : b(n);
}
l(Et, "generateUnion");
function Pt({ type: n, raw: a }) {
  return a != null ? b(a) : b(n);
}
l(Pt, "generateFuncSignature");
function vt({ type: n, raw: a }) {
  return a != null ? (ke(a) ? b(n, a) : b(a)) : b(n);
}
l(vt, "generateObjectSignature");
function St(n) {
  let { type: a } = n;
  return a === "object" ? vt(n) : Pt(n);
}
l(St, "generateSignature");
function kt({ name: n, raw: a }) {
  return a != null ? (ke(a) ? b(n, a) : b(a)) : b(n);
}
l(kt, "generateDefault");
function xt(n) {
  if (n == null) return null;
  switch (n.name) {
    case "union":
      return Et(n);
    case "signature":
      return St(n);
    default:
      return kt(n);
  }
}
l(xt, "createType");
var Cn = l((n, a) => {
  let { flowType: o, description: i, required: p, defaultValue: u } = a;
  return { name: n, type: xt(o), required: p, description: i, defaultValue: bt(u ?? null, o ?? null) };
}, "createFlowPropDef");
function Ot({ defaultValue: n }) {
  if (n != null) {
    let { value: a } = n;
    if (!re(a)) return b(a);
  }
  return null;
}
l(Ot, "createDefaultValue");
function It({ tsType: n, required: a }) {
  if (n == null) return null;
  let o = n.name;
  return a || (o = o.replace(" | undefined", "")), b(["Array", "Record", "signature"].includes(n.name) ? n.raw : o);
}
l(It, "createType");
var Yn = l((n, a) => {
  let { description: o, required: i } = a;
  return { name: n, type: It(a), required: i, description: o, defaultValue: Ot(a) };
}, "createTsPropDef");
function At(n) {
  return n != null ? b(n.name) : null;
}
l(At, "createType");
function Rt(n) {
  let { computed: a, func: o } = n;
  return typeof a > "u" && typeof o > "u";
}
l(Rt, "isReactDocgenTypescript");
function _t(n) {
  return n
    ? n.name === "string"
      ? !0
      : n.name === "enum"
        ? Array.isArray(n.value) &&
          n.value.every(({ value: a }) => typeof a == "string" && a[0] === '"' && a[a.length - 1] === '"')
        : !1
    : !1;
}
l(_t, "isStringValued");
function Ft(n, a) {
  if (n != null) {
    let { value: o } = n;
    if (!re(o)) return Rt(n) && _t(a) ? b(JSON.stringify(o)) : b(o);
  }
  return null;
}
l(Ft, "createDefaultValue");
function Oe(n, a, o) {
  let { description: i, required: p, defaultValue: u } = o;
  return { name: n, type: At(a), required: p, description: i, defaultValue: Ft(u, a) };
}
l(Oe, "createBasicPropDef");
function G(n, a) {
  var o;
  if (a != null && a.includesJsDoc) {
    let { description: i, extractedTags: p } = a;
    i != null && (n.description = a.description);
    let u = {
      ...p,
      params:
        (o = p == null ? void 0 : p.params) == null
          ? void 0
          : o.map((y) => ({ name: y.getPrettyName(), description: y.description })),
    };
    Object.values(u).filter(Boolean).length > 0 && (n.jsDocTags = u);
  }
  return n;
}
l(G, "applyJsDocResult");
var Gn = l((n, a, o) => {
    let i = Oe(n, a.type, a);
    return (i.sbType = we(a)), G(i, o);
  }, "javaScriptFactory"),
  Wn = l((n, a, o) => {
    let i = Yn(n, a);
    return (i.sbType = we(a)), G(i, o);
  }, "tsFactory"),
  Xn = l((n, a, o) => {
    let i = Cn(n, a);
    return (i.sbType = we(a)), G(i, o);
  }, "flowFactory"),
  Qn = l((n, a, o) => {
    let i = Oe(n, { name: "unknown" }, a);
    return G(i, o);
  }, "unknownFactory"),
  jt = l((n) => {
    switch (n) {
      case "JavaScript":
        return Gn;
      case "TypeScript":
        return Wn;
      case "Flow":
        return Xn;
      default:
        return Qn;
    }
  }, "getPropDefFactory"),
  Lt = l(
    (n) => (n.type != null ? "JavaScript" : n.flowType != null ? "Flow" : n.tsType != null ? "TypeScript" : "Unknown"),
    "getTypeSystem"
  ),
  Hn = l((n) => {
    let a = Lt(n[0]),
      o = jt(a);
    return n.map((i) => {
      var u;
      let p = i;
      return (
        (u = i.type) != null && u.elements && (p = { ...i, type: { ...i.type, value: i.type.elements } }),
        Ie(p.name, p, a, o)
      );
    });
  }, "extractComponentSectionArray"),
  zn = l((n) => {
    let a = Object.keys(n),
      o = Lt(n[a[0]]),
      i = jt(o);
    return a
      .map((p) => {
        let u = n[p];
        return u != null ? Ie(p, u, o, i) : null;
      })
      .filter(Boolean);
  }, "extractComponentSectionObject"),
  ar = l((n, a) => {
    let o = Ge(n, a);
    return Ye(o) ? (Array.isArray(o) ? Hn(o) : zn(o)) : [];
  }, "extractComponentProps");
function Ie(n, a, o, i) {
  let p = Bn(a.description);
  return p.includesJsDoc && p.ignore
    ? null
    : { propDef: i(n, a, p), jsDocTags: p.extractedTags, docgenInfo: a, typeSystem: o };
}
l(Ie, "extractProp");
function Zn(n) {
  return n != null ? We(n) : "";
}
l(Zn, "extractComponentDescription");
const { combineParameters: er } = __STORYBOOK_MODULE_PREVIEW_API__;
var or = l((n) => {
    let {
        component: a,
        argTypes: o,
        parameters: { docs: i = {} },
      } = n,
      { extractArgTypes: p } = i,
      u = p && a ? p(a) : {};
    return u ? er(u, o) : o;
  }, "enhanceArgTypes"),
  tr = "storybook/docs",
  sr = `${tr}/snippet-rendered`,
  nr = ((n) => ((n.AUTO = "auto"), (n.CODE = "code"), (n.DYNAMIC = "dynamic"), n))(nr || {});
export { ke as B, Ge as Y, Nt as a, or as c, nr as g, _n as j, b as l, Zn as n, ar as o, sr as y, Ne as z };
