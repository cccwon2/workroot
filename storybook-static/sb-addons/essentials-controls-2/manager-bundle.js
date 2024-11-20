try {
  (() => {
    var fp = Object.create;
    var kn = Object.defineProperty;
    var hp = Object.getOwnPropertyDescriptor;
    var mp = Object.getOwnPropertyNames;
    var yp = Object.getPrototypeOf,
      gp = Object.prototype.hasOwnProperty;
    var Pe = ((e) =>
      typeof require < "u"
        ? require
        : typeof Proxy < "u"
          ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] })
          : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var Qe = (e, t) => () => (e && (t = e((e = 0))), t);
    var bp = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
      qa = (e, t) => {
        for (var r in t) kn(e, r, { get: t[r], enumerable: !0 });
      },
      Ep = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of mp(t))
            !gp.call(e, o) && o !== r && kn(e, o, { get: () => t[o], enumerable: !(n = hp(t, o)) || n.enumerable });
        return e;
      };
    var vp = (e, t, r) => (
      (r = e != null ? fp(yp(e)) : {}),
      Ep(t || !e || !e.__esModule ? kn(r, "default", { value: e, enumerable: !0 }) : r, e)
    );
    var V = Qe(() => {});
    var J = Qe(() => {});
    var z = Qe(() => {});
    function Cp(e, t, { signal: r, edges: n } = {}) {
      let o,
        a = null,
        i = n != null && n.includes("leading"),
        l = n == null || n.includes("trailing"),
        s = () => {
          a !== null && (e.apply(o, a), (o = void 0), (a = null));
        },
        c = () => {
          l && s(), f();
        },
        d = null,
        p = () => {
          d != null && clearTimeout(d),
            (d = setTimeout(() => {
              (d = null), c();
            }, t));
        },
        h = () => {
          d !== null && (clearTimeout(d), (d = null));
        },
        f = () => {
          h(), (o = void 0), (a = null);
        },
        b = () => {
          h(), s();
        },
        g = function (...x) {
          if (r?.aborted) return;
          (o = this), (a = x);
          let S = d == null;
          p(), i && S && s();
        };
      return (g.schedule = p), (g.cancel = f), (g.flush = b), r?.addEventListener("abort", f, { once: !0 }), g;
    }
    function Ha(e, t = 0, r = {}) {
      typeof r != "object" && (r = {});
      let { signal: n, leading: o = !1, trailing: a = !0, maxWait: i } = r,
        l = Array(2);
      o && (l[0] = "leading"), a && (l[1] = "trailing");
      let s,
        c = null,
        d = Cp(
          function (...f) {
            (s = e.apply(this, f)), (c = null);
          },
          t,
          { signal: n, edges: l }
        ),
        p = function (...f) {
          if (i != null) {
            if (c === null) c = Date.now();
            else if (Date.now() - c >= i) return (s = e.apply(this, f)), (c = Date.now()), d.cancel(), d.schedule(), s;
          }
          return d.apply(this, f), s;
        },
        h = () => (d.flush(), s);
      return (p.cancel = d.cancel), (p.flush = h), p;
    }
    function Ga(e) {
      return Array.from(new Set(e));
    }
    function Wa(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) && (r[a] = i);
      }
      return r;
    }
    function kp(e) {
      return ArrayBuffer.isView(e) && !(e instanceof DataView);
    }
    function Ip(e) {
      return e == null || (typeof e != "object" && typeof e != "function");
    }
    function Va(e) {
      return jt(e);
    }
    function jt(e, t = new Map()) {
      if (Ip(e)) return e;
      if (t.has(e)) return t.get(e);
      if (Array.isArray(e)) {
        let r = new Array(e.length);
        t.set(e, r);
        for (let n = 0; n < e.length; n++) r[n] = jt(e[n], t);
        return (
          Object.prototype.hasOwnProperty.call(e, "index") && (r.index = e.index),
          Object.prototype.hasOwnProperty.call(e, "input") && (r.input = e.input),
          r
        );
      }
      if (e instanceof Date) return new Date(e.getTime());
      if (e instanceof RegExp) {
        let r = new RegExp(e.source, e.flags);
        return (r.lastIndex = e.lastIndex), r;
      }
      if (e instanceof Map) {
        let r = new Map();
        t.set(e, r);
        for (let [n, o] of e.entries()) r.set(n, jt(o, t));
        return r;
      }
      if (e instanceof Set) {
        let r = new Set();
        t.set(e, r);
        for (let n of e.values()) r.add(jt(n, t));
        return r;
      }
      if (typeof Buffer < "u" && Buffer.isBuffer(e)) return e.subarray();
      if (kp(e)) {
        let r = new (Object.getPrototypeOf(e).constructor)(e.length);
        t.set(e, r);
        for (let n = 0; n < e.length; n++) r[n] = jt(e[n], t);
        return r;
      }
      if (e instanceof ArrayBuffer || (typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer))
        return e.slice(0);
      if (e instanceof DataView) {
        let r = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
        return t.set(e, r), vt(r, e, t), r;
      }
      if (typeof File < "u" && e instanceof File) {
        let r = new File([e], e.name, { type: e.type });
        return t.set(e, r), vt(r, e, t), r;
      }
      if (e instanceof Blob) {
        let r = new Blob([e], { type: e.type });
        return t.set(e, r), vt(r, e, t), r;
      }
      if (e instanceof Error) {
        let r = new e.constructor();
        return (
          t.set(e, r),
          (r.message = e.message),
          (r.name = e.name),
          (r.stack = e.stack),
          (r.cause = e.cause),
          vt(r, e, t),
          r
        );
      }
      if (typeof e == "object" && e !== null) {
        let r = {};
        return t.set(e, r), vt(r, e, t), r;
      }
      return e;
    }
    function vt(e, t, r) {
      let n = Object.keys(t);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = Object.getOwnPropertyDescriptor(t, a);
        (i?.writable || i?.set) && (e[a] = jt(t[a], r));
      }
    }
    function Ka(e) {
      if (typeof e != "object") return Va(e);
      switch (Object.prototype.toString.call(e)) {
        case Dp:
        case Op:
        case Rp: {
          let t = new e.constructor(e?.valueOf());
          return vt(t, e), t;
        }
        case _p: {
          let t = {};
          return vt(t, e), (t.length = e.length), (t[Symbol.iterator] = e[Symbol.iterator]), t;
        }
        default:
          return Va(e);
      }
    }
    var Bt,
      xp,
      Ja,
      Sp,
      za,
      wp,
      Ap,
      sr,
      je,
      Tp,
      Lt,
      Op,
      Dp,
      Rp,
      _p,
      Fe,
      lr,
      In = Qe(() => {
        V();
        J();
        z();
        (Bt = ((e) =>
          typeof Pe < "u"
            ? Pe
            : typeof Proxy < "u"
              ? new Proxy(e, { get: (t, r) => (typeof Pe < "u" ? Pe : t)[r] })
              : e)(function (e) {
          if (typeof Pe < "u") return Pe.apply(this, arguments);
          throw Error('Dynamic require of "' + e + '" is not supported');
        })),
          (xp = Object.create),
          (Ja = Object.defineProperty),
          (Sp = Object.getOwnPropertyDescriptor),
          (za = Object.getOwnPropertyNames),
          (wp = Object.getPrototypeOf),
          (Ap = Object.prototype.hasOwnProperty),
          (sr = ((e) =>
            typeof Bt < "u"
              ? Bt
              : typeof Proxy < "u"
                ? new Proxy(e, { get: (t, r) => (typeof Bt < "u" ? Bt : t)[r] })
                : e)(function (e) {
            if (typeof Bt < "u") return Bt.apply(this, arguments);
            throw Error('Dynamic require of "' + e + '" is not supported');
          })),
          (je = (e, t) =>
            function () {
              return t || (0, e[za(e)[0]])((t = { exports: {} }).exports, t), t.exports;
            }),
          (Tp = (e, t, r, n) => {
            if ((t && typeof t == "object") || typeof t == "function")
              for (let o of za(t))
                !Ap.call(e, o) && o !== r && Ja(e, o, { get: () => t[o], enumerable: !(n = Sp(t, o)) || n.enumerable });
            return e;
          }),
          (Lt = (e, t, r) => (
            (r = e != null ? xp(wp(e)) : {}),
            Tp(t || !e || !e.__esModule ? Ja(r, "default", { value: e, enumerable: !0 }) : r, e)
          ));
        (Op = "[object String]"), (Dp = "[object Number]"), (Rp = "[object Boolean]"), (_p = "[object Arguments]");
        (Fe = (e) => `control-${e.replace(/\s+/g, "-")}`), (lr = (e) => `set-${e.replace(/\s+/g, "-")}`);
      });
    var m,
      Ya,
      it,
      Wv,
      Kv,
      Yv,
      Xv,
      Xa,
      Qv,
      ue,
      ur,
      On,
      Zv,
      ex,
      tx,
      rx,
      Qa,
      nx,
      ox,
      ax,
      xe,
      Za,
      ix,
      sx,
      Se,
      lx,
      ux,
      cx,
      ei,
      st,
      dx,
      Re,
      X,
      px,
      fx,
      hx,
      Dr = Qe(() => {
        V();
        J();
        z();
        (m = __REACT__),
          ({
            Children: Ya,
            Component: it,
            Fragment: Wv,
            Profiler: Kv,
            PureComponent: Yv,
            StrictMode: Xv,
            Suspense: Xa,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Qv,
            cloneElement: ue,
            createContext: ur,
            createElement: On,
            createFactory: Zv,
            createRef: ex,
            forwardRef: tx,
            isValidElement: rx,
            lazy: Qa,
            memo: nx,
            startTransition: ox,
            unstable_act: ax,
            useCallback: xe,
            useContext: Za,
            useDebugValue: ix,
            useDeferredValue: sx,
            useEffect: Se,
            useId: lx,
            useImperativeHandle: ux,
            useInsertionEffect: cx,
            useLayoutEffect: ei,
            useMemo: st,
            useReducer: dx,
            useRef: Re,
            useState: X,
            useSyncExternalStore: px,
            useTransition: fx,
            version: hx,
          } = __REACT__);
      });
    var ti = {};
    qa(ti, {
      A: () => Np,
      ActionBar: () => Dn,
      AddonPanel: () => Rn,
      Badge: () => _n,
      Bar: () => Pn,
      Blockquote: () => Bp,
      Button: () => lt,
      ClipboardCode: () => jp,
      Code: () => Lp,
      DL: () => Mp,
      Div: () => Up,
      DocumentWrapper: () => $p,
      EmptyTabContent: () => Fn,
      ErrorFormatter: () => qp,
      FlexBar: () => Nn,
      Form: () => Ve,
      H1: () => Vp,
      H2: () => Bn,
      H3: () => Jp,
      H4: () => zp,
      H5: () => Hp,
      H6: () => Gp,
      HR: () => Wp,
      IconButton: () => ze,
      IconButtonSkeleton: () => Kp,
      Icons: () => Yp,
      Img: () => Xp,
      LI: () => Qp,
      Link: () => xt,
      ListItem: () => Zp,
      Loader: () => ef,
      Modal: () => He,
      OL: () => tf,
      P: () => rf,
      Placeholder: () => nf,
      Pre: () => of,
      ResetWrapper: () => jn,
      ScrollArea: () => af,
      Separator: () => sf,
      Spaced: () => Ln,
      Span: () => lf,
      StorybookIcon: () => uf,
      StorybookLogo: () => cf,
      Symbols: () => df,
      SyntaxHighlighter: () => Rr,
      TT: () => pf,
      TabBar: () => ff,
      TabButton: () => hf,
      TabWrapper: () => mf,
      Table: () => yf,
      Tabs: () => gf,
      TabsState: () => bf,
      TooltipLinkList: () => Ef,
      TooltipMessage: () => vf,
      TooltipNote: () => St,
      UL: () => xf,
      WithTooltip: () => ut,
      WithTooltipPure: () => Mn,
      Zoom: () => Un,
      codeCommon: () => Mt,
      components: () => $n,
      createCopyToClipboardFunction: () => Sf,
      default: () => Fp,
      getStoryHref: () => wf,
      icons: () => Af,
      interleaveSeparators: () => Tf,
      nameSpaceClassNames: () => qn,
      resetComponents: () => Cf,
      withReset: () => Ut,
    });
    var Fp,
      Np,
      Dn,
      Rn,
      _n,
      Pn,
      Bp,
      lt,
      jp,
      Lp,
      Mp,
      Up,
      $p,
      Fn,
      qp,
      Nn,
      Ve,
      Vp,
      Bn,
      Jp,
      zp,
      Hp,
      Gp,
      Wp,
      ze,
      Kp,
      Yp,
      Xp,
      Qp,
      xt,
      Zp,
      ef,
      He,
      tf,
      rf,
      nf,
      of,
      jn,
      af,
      sf,
      Ln,
      lf,
      uf,
      cf,
      df,
      Rr,
      pf,
      ff,
      hf,
      mf,
      yf,
      gf,
      bf,
      Ef,
      vf,
      St,
      xf,
      ut,
      Mn,
      Un,
      Mt,
      $n,
      Sf,
      wf,
      Af,
      Tf,
      qn,
      Cf,
      Ut,
      _r = Qe(() => {
        V();
        J();
        z();
        (Fp = __STORYBOOK_COMPONENTS__),
          ({
            A: Np,
            ActionBar: Dn,
            AddonPanel: Rn,
            Badge: _n,
            Bar: Pn,
            Blockquote: Bp,
            Button: lt,
            ClipboardCode: jp,
            Code: Lp,
            DL: Mp,
            Div: Up,
            DocumentWrapper: $p,
            EmptyTabContent: Fn,
            ErrorFormatter: qp,
            FlexBar: Nn,
            Form: Ve,
            H1: Vp,
            H2: Bn,
            H3: Jp,
            H4: zp,
            H5: Hp,
            H6: Gp,
            HR: Wp,
            IconButton: ze,
            IconButtonSkeleton: Kp,
            Icons: Yp,
            Img: Xp,
            LI: Qp,
            Link: xt,
            ListItem: Zp,
            Loader: ef,
            Modal: He,
            OL: tf,
            P: rf,
            Placeholder: nf,
            Pre: of,
            ResetWrapper: jn,
            ScrollArea: af,
            Separator: sf,
            Spaced: Ln,
            Span: lf,
            StorybookIcon: uf,
            StorybookLogo: cf,
            Symbols: df,
            SyntaxHighlighter: Rr,
            TT: pf,
            TabBar: ff,
            TabButton: hf,
            TabWrapper: mf,
            Table: yf,
            Tabs: gf,
            TabsState: bf,
            TooltipLinkList: Ef,
            TooltipMessage: vf,
            TooltipNote: St,
            UL: xf,
            WithTooltip: ut,
            WithTooltipPure: Mn,
            Zoom: Un,
            codeCommon: Mt,
            components: $n,
            createCopyToClipboardFunction: Sf,
            getStoryHref: wf,
            icons: Af,
            interleaveSeparators: Tf,
            nameSpaceClassNames: qn,
            resetComponents: Cf,
            withReset: Ut,
          } = __STORYBOOK_COMPONENTS__);
      });
    var NS,
      BS,
      jS,
      LS,
      ki,
      MS,
      Ur,
      Ii,
      US,
      $S,
      qS,
      VS,
      JS,
      zS,
      HS,
      Oi,
      GS,
      WS,
      Kn,
      KS,
      R,
      Yn,
      YS,
      Xn,
      XS,
      Qn = Qe(() => {
        V();
        J();
        z();
        (NS = __STORYBOOK_THEMING__),
          ({
            CacheProvider: BS,
            ClassNames: jS,
            Global: LS,
            ThemeProvider: ki,
            background: MS,
            color: Ur,
            convert: Ii,
            create: US,
            createCache: $S,
            createGlobal: qS,
            createReset: VS,
            css: JS,
            darken: zS,
            ensure: HS,
            ignoreSsrWarning: Oi,
            isPropValid: GS,
            jsx: WS,
            keyframes: Kn,
            lighten: KS,
            styled: R,
            themes: Yn,
            typography: YS,
            useTheme: Xn,
            withTheme: XS,
          } = __STORYBOOK_THEMING__);
      });
    var iw,
      sw,
      lw,
      Zn,
      uw,
      cw,
      dw,
      pw,
      fw,
      hw,
      mw,
      yw,
      gw,
      bw,
      Ew,
      vw,
      xw,
      Sw,
      ww,
      Aw,
      Tw,
      Cw,
      kw,
      Iw,
      Ow,
      Dw,
      Rw,
      _w,
      Pw,
      Fw,
      Nw,
      Bw,
      jw,
      Lw,
      Mw,
      Uw,
      $w,
      qw,
      Vw,
      Jw,
      zw,
      Hw,
      Gw,
      Ww,
      Kw,
      Yw,
      Xw,
      _i,
      Pi,
      Qw,
      Fi,
      eo,
      Zw,
      eA,
      Ni,
      tA,
      rA,
      nA,
      oA,
      aA,
      iA,
      sA,
      lA,
      uA,
      cA,
      dA,
      pA,
      fA,
      hA,
      mA,
      yA,
      gA,
      bA,
      EA,
      vA,
      xA,
      SA,
      wA,
      AA,
      TA,
      CA,
      kA,
      IA,
      OA,
      DA,
      RA,
      _A,
      PA,
      $r,
      FA,
      NA,
      BA,
      jA,
      LA,
      MA,
      UA,
      Bi,
      ji,
      $A,
      qA,
      VA,
      JA,
      zA,
      HA,
      GA,
      WA,
      KA,
      YA,
      XA,
      QA,
      ZA,
      eT,
      tT,
      rT,
      nT,
      oT,
      aT,
      iT,
      sT,
      lT,
      uT,
      cT,
      dT,
      pT,
      fT,
      hT,
      mT,
      yT,
      gT,
      bT,
      ET,
      Li,
      vT,
      xT,
      ST,
      wT,
      AT,
      TT,
      CT,
      Mi,
      kT,
      IT,
      OT,
      DT,
      RT,
      _T,
      PT,
      FT,
      NT,
      BT,
      jT,
      LT,
      MT,
      UT,
      $T,
      qT,
      VT,
      JT,
      zT,
      HT,
      GT,
      WT,
      KT,
      YT,
      XT,
      QT,
      ZT,
      eC,
      tC,
      rC,
      nC,
      oC,
      aC,
      iC,
      sC,
      lC,
      uC,
      cC,
      dC,
      pC,
      fC,
      hC,
      mC,
      yC,
      gC,
      bC,
      EC,
      vC,
      xC,
      SC,
      wC,
      AC,
      TC,
      CC,
      kC,
      IC,
      OC,
      DC,
      RC,
      _C,
      PC,
      FC,
      NC,
      BC,
      jC,
      Ui,
      LC,
      MC,
      UC,
      $C,
      qC,
      VC,
      JC,
      zC,
      HC,
      GC,
      WC,
      KC,
      YC,
      to,
      XC,
      QC,
      ZC,
      e5,
      t5,
      r5,
      n5,
      o5,
      a5,
      i5,
      $i,
      s5,
      l5,
      u5,
      c5,
      d5,
      p5,
      qi,
      Vi,
      Ji,
      f5,
      ro = Qe(() => {
        V();
        J();
        z();
        (iw = __STORYBOOK_ICONS__),
          ({
            AccessibilityAltIcon: sw,
            AccessibilityIcon: lw,
            AddIcon: Zn,
            AdminIcon: uw,
            AlertAltIcon: cw,
            AlertIcon: dw,
            AlignLeftIcon: pw,
            AlignRightIcon: fw,
            AppleIcon: hw,
            ArrowBottomLeftIcon: mw,
            ArrowBottomRightIcon: yw,
            ArrowDownIcon: gw,
            ArrowLeftIcon: bw,
            ArrowRightIcon: Ew,
            ArrowSolidDownIcon: vw,
            ArrowSolidLeftIcon: xw,
            ArrowSolidRightIcon: Sw,
            ArrowSolidUpIcon: ww,
            ArrowTopLeftIcon: Aw,
            ArrowTopRightIcon: Tw,
            ArrowUpIcon: Cw,
            AzureDevOpsIcon: kw,
            BackIcon: Iw,
            BasketIcon: Ow,
            BatchAcceptIcon: Dw,
            BatchDenyIcon: Rw,
            BeakerIcon: _w,
            BellIcon: Pw,
            BitbucketIcon: Fw,
            BoldIcon: Nw,
            BookIcon: Bw,
            BookmarkHollowIcon: jw,
            BookmarkIcon: Lw,
            BottomBarIcon: Mw,
            BottomBarToggleIcon: Uw,
            BoxIcon: $w,
            BranchIcon: qw,
            BrowserIcon: Vw,
            ButtonIcon: Jw,
            CPUIcon: zw,
            CalendarIcon: Hw,
            CameraIcon: Gw,
            CategoryIcon: Ww,
            CertificateIcon: Kw,
            ChangedIcon: Yw,
            ChatIcon: Xw,
            CheckIcon: _i,
            ChevronDownIcon: Pi,
            ChevronLeftIcon: Qw,
            ChevronRightIcon: Fi,
            ChevronSmallDownIcon: eo,
            ChevronSmallLeftIcon: Zw,
            ChevronSmallRightIcon: eA,
            ChevronSmallUpIcon: Ni,
            ChevronUpIcon: tA,
            ChromaticIcon: rA,
            ChromeIcon: nA,
            CircleHollowIcon: oA,
            CircleIcon: aA,
            ClearIcon: iA,
            CloseAltIcon: sA,
            CloseIcon: lA,
            CloudHollowIcon: uA,
            CloudIcon: cA,
            CogIcon: dA,
            CollapseIcon: pA,
            CommandIcon: fA,
            CommentAddIcon: hA,
            CommentIcon: mA,
            CommentsIcon: yA,
            CommitIcon: gA,
            CompassIcon: bA,
            ComponentDrivenIcon: EA,
            ComponentIcon: vA,
            ContrastIcon: xA,
            ControlsIcon: SA,
            CopyIcon: wA,
            CreditIcon: AA,
            CrossIcon: TA,
            DashboardIcon: CA,
            DatabaseIcon: kA,
            DeleteIcon: IA,
            DiamondIcon: OA,
            DirectionIcon: DA,
            DiscordIcon: RA,
            DocChartIcon: _A,
            DocListIcon: PA,
            DocumentIcon: $r,
            DownloadIcon: FA,
            DragIcon: NA,
            EditIcon: BA,
            EllipsisIcon: jA,
            EmailIcon: LA,
            ExpandAltIcon: MA,
            ExpandIcon: UA,
            EyeCloseIcon: Bi,
            EyeIcon: ji,
            FaceHappyIcon: $A,
            FaceNeutralIcon: qA,
            FaceSadIcon: VA,
            FacebookIcon: JA,
            FailedIcon: zA,
            FastForwardIcon: HA,
            FigmaIcon: GA,
            FilterIcon: WA,
            FlagIcon: KA,
            FolderIcon: YA,
            FormIcon: XA,
            GDriveIcon: QA,
            GithubIcon: ZA,
            GitlabIcon: eT,
            GlobeIcon: tT,
            GoogleIcon: rT,
            GraphBarIcon: nT,
            GraphLineIcon: oT,
            GraphqlIcon: aT,
            GridAltIcon: iT,
            GridIcon: sT,
            GrowIcon: lT,
            HeartHollowIcon: uT,
            HeartIcon: cT,
            HomeIcon: dT,
            HourglassIcon: pT,
            InfoIcon: fT,
            ItalicIcon: hT,
            JumpToIcon: mT,
            KeyIcon: yT,
            LightningIcon: gT,
            LightningOffIcon: bT,
            LinkBrokenIcon: ET,
            LinkIcon: Li,
            LinkedinIcon: vT,
            LinuxIcon: xT,
            ListOrderedIcon: ST,
            ListUnorderedIcon: wT,
            LocationIcon: AT,
            LockIcon: TT,
            MarkdownIcon: CT,
            MarkupIcon: Mi,
            MediumIcon: kT,
            MemoryIcon: IT,
            MenuIcon: OT,
            MergeIcon: DT,
            MirrorIcon: RT,
            MobileIcon: _T,
            MoonIcon: PT,
            NutIcon: FT,
            OutboxIcon: NT,
            OutlineIcon: BT,
            PaintBrushIcon: jT,
            PaperClipIcon: LT,
            ParagraphIcon: MT,
            PassedIcon: UT,
            PhoneIcon: $T,
            PhotoDragIcon: qT,
            PhotoIcon: VT,
            PinAltIcon: JT,
            PinIcon: zT,
            PlayAllHollowIcon: HT,
            PlayBackIcon: GT,
            PlayHollowIcon: WT,
            PlayIcon: KT,
            PlayNextIcon: YT,
            PlusIcon: XT,
            PointerDefaultIcon: QT,
            PointerHandIcon: ZT,
            PowerIcon: eC,
            PrintIcon: tC,
            ProceedIcon: rC,
            ProfileIcon: nC,
            PullRequestIcon: oC,
            QuestionIcon: aC,
            RSSIcon: iC,
            RedirectIcon: sC,
            ReduxIcon: lC,
            RefreshIcon: uC,
            ReplyIcon: cC,
            RepoIcon: dC,
            RequestChangeIcon: pC,
            RewindIcon: fC,
            RulerIcon: hC,
            SaveIcon: mC,
            SearchIcon: yC,
            ShareAltIcon: gC,
            ShareIcon: bC,
            ShieldIcon: EC,
            SideBySideIcon: vC,
            SidebarAltIcon: xC,
            SidebarAltToggleIcon: SC,
            SidebarIcon: wC,
            SidebarToggleIcon: AC,
            SpeakerIcon: TC,
            StackedIcon: CC,
            StarHollowIcon: kC,
            StarIcon: IC,
            StatusFailIcon: OC,
            StatusPassIcon: DC,
            StatusWarnIcon: RC,
            StickerIcon: _C,
            StopAltHollowIcon: PC,
            StopAltIcon: FC,
            StopIcon: NC,
            StorybookIcon: BC,
            StructureIcon: jC,
            SubtractIcon: Ui,
            SunIcon: LC,
            SupportIcon: MC,
            SwitchAltIcon: UC,
            SyncIcon: $C,
            TabletIcon: qC,
            ThumbsUpIcon: VC,
            TimeIcon: JC,
            TimerIcon: zC,
            TransferIcon: HC,
            TrashIcon: GC,
            TwitterIcon: WC,
            TypeIcon: KC,
            UbuntuIcon: YC,
            UndoIcon: to,
            UnfoldIcon: XC,
            UnlockIcon: QC,
            UnpinIcon: ZC,
            UploadIcon: e5,
            UserAddIcon: t5,
            UserAltIcon: r5,
            UserIcon: n5,
            UsersIcon: o5,
            VSCodeIcon: a5,
            VerifiedIcon: i5,
            VideoIcon: $i,
            WandIcon: s5,
            WatchIcon: l5,
            WindowsIcon: u5,
            WrenchIcon: c5,
            XIcon: d5,
            YoutubeIcon: p5,
            ZoomIcon: qi,
            ZoomOutIcon: Vi,
            ZoomResetIcon: Ji,
            iconList: f5,
          } = __STORYBOOK_ICONS__);
      });
    var Xl = bp((rn, Yl) => {
      V();
      J();
      z();
      (function (e, t) {
        typeof rn == "object" && typeof Yl < "u"
          ? t(rn)
          : typeof define == "function" && define.amd
            ? define(["exports"], t)
            : ((e = typeof globalThis < "u" ? globalThis : e || self), t((e.jtpp = {})));
      })(rn, function (e) {
        "use strict";
        function t(u) {
          return u.text !== void 0 && u.text !== "" ? `'${u.type}' with value '${u.text}'` : `'${u.type}'`;
        }
        class r extends Error {
          constructor(y) {
            super(`No parslet found for token: ${t(y)}`), (this.token = y), Object.setPrototypeOf(this, r.prototype);
          }
          getToken() {
            return this.token;
          }
        }
        class n extends Error {
          constructor(y) {
            super(`The parsing ended early. The next token was: ${t(y)}`),
              (this.token = y),
              Object.setPrototypeOf(this, n.prototype);
          }
          getToken() {
            return this.token;
          }
        }
        class o extends Error {
          constructor(y, v) {
            let O = `Unexpected type: '${y.type}'.`;
            v !== void 0 && (O += ` Message: ${v}`), super(O), Object.setPrototypeOf(this, o.prototype);
          }
        }
        function a(u) {
          return (y) => (y.startsWith(u) ? { type: u, text: u } : null);
        }
        function i(u) {
          let y = 0,
            v,
            O = u[0],
            j = !1;
          if (O !== "'" && O !== '"') return null;
          for (; y < u.length; ) {
            if ((y++, (v = u[y]), !j && v === O)) {
              y++;
              break;
            }
            j = !j && v === "\\";
          }
          if (v !== O) throw new Error("Unterminated String");
          return u.slice(0, y);
        }
        let l = new RegExp(
            "[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
            "u"
          ),
          s = new RegExp(
            "[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
            "u"
          );
        function c(u) {
          let y = u[0];
          if (!l.test(y)) return null;
          let v = 1;
          do {
            if (((y = u[v]), !s.test(y))) break;
            v++;
          } while (v < u.length);
          return u.slice(0, v);
        }
        let d = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
        function p(u) {
          var y, v;
          return (v = (y = d.exec(u)) === null || y === void 0 ? void 0 : y[0]) !== null && v !== void 0 ? v : null;
        }
        let h = (u) => {
          let y = c(u);
          return y == null ? null : { type: "Identifier", text: y };
        };
        function f(u) {
          return (y) => {
            if (!y.startsWith(u)) return null;
            let v = y[u.length];
            return v !== void 0 && s.test(v) ? null : { type: u, text: u };
          };
        }
        let b = (u) => {
            let y = i(u);
            return y == null ? null : { type: "StringValue", text: y };
          },
          g = (u) => (u.length > 0 ? null : { type: "EOF", text: "" }),
          x = (u) => {
            let y = p(u);
            return y === null ? null : { type: "Number", text: y };
          },
          S = [
            g,
            a("=>"),
            a("("),
            a(")"),
            a("{"),
            a("}"),
            a("["),
            a("]"),
            a("|"),
            a("&"),
            a("<"),
            a(">"),
            a(","),
            a(";"),
            a("*"),
            a("?"),
            a("!"),
            a("="),
            a(":"),
            a("..."),
            a("."),
            a("#"),
            a("~"),
            a("/"),
            a("@"),
            f("undefined"),
            f("null"),
            f("function"),
            f("this"),
            f("new"),
            f("module"),
            f("event"),
            f("external"),
            f("typeof"),
            f("keyof"),
            f("readonly"),
            f("import"),
            f("is"),
            f("in"),
            f("asserts"),
            x,
            h,
            b,
          ],
          A = /^\s*\n\s*/;
        class k {
          static create(y) {
            let v = this.read(y);
            y = v.text;
            let O = this.read(y);
            return (y = O.text), new k(y, void 0, v.token, O.token);
          }
          constructor(y, v, O, j) {
            (this.text = ""), (this.text = y), (this.previous = v), (this.current = O), (this.next = j);
          }
          static read(y, v = !1) {
            (v = v || A.test(y)), (y = y.trim());
            for (let O of S) {
              let j = O(y);
              if (j !== null) {
                let q = Object.assign(Object.assign({}, j), { startOfLine: v });
                return (y = y.slice(q.text.length)), { text: y, token: q };
              }
            }
            throw new Error("Unexpected Token " + y);
          }
          advance() {
            let y = k.read(this.text);
            return new k(y.text, this.current, this.next, y.token);
          }
        }
        function T(u) {
          if (u === void 0) throw new Error("Unexpected undefined");
          if (
            u.type === "JsdocTypeKeyValue" ||
            u.type === "JsdocTypeParameterList" ||
            u.type === "JsdocTypeProperty" ||
            u.type === "JsdocTypeReadonlyProperty" ||
            u.type === "JsdocTypeObjectField" ||
            u.type === "JsdocTypeJsdocObjectField" ||
            u.type === "JsdocTypeIndexSignature" ||
            u.type === "JsdocTypeMappedType"
          )
            throw new o(u);
          return u;
        }
        function I(u) {
          return u.type === "JsdocTypeKeyValue" ? F(u) : T(u);
        }
        function D(u) {
          return u.type === "JsdocTypeName" ? u : F(u);
        }
        function F(u) {
          if (u.type !== "JsdocTypeKeyValue") throw new o(u);
          return u;
        }
        function P(u) {
          var y;
          if (u.type === "JsdocTypeVariadic") {
            if (((y = u.element) === null || y === void 0 ? void 0 : y.type) === "JsdocTypeName") return u;
            throw new o(u);
          }
          if (u.type !== "JsdocTypeNumber" && u.type !== "JsdocTypeName") throw new o(u);
          return u;
        }
        function L(u) {
          return u.type === "JsdocTypeIndexSignature" || u.type === "JsdocTypeMappedType";
        }
        var B;
        (function (u) {
          (u[(u.ALL = 0)] = "ALL"),
            (u[(u.PARAMETER_LIST = 1)] = "PARAMETER_LIST"),
            (u[(u.OBJECT = 2)] = "OBJECT"),
            (u[(u.KEY_VALUE = 3)] = "KEY_VALUE"),
            (u[(u.INDEX_BRACKETS = 4)] = "INDEX_BRACKETS"),
            (u[(u.UNION = 5)] = "UNION"),
            (u[(u.INTERSECTION = 6)] = "INTERSECTION"),
            (u[(u.PREFIX = 7)] = "PREFIX"),
            (u[(u.INFIX = 8)] = "INFIX"),
            (u[(u.TUPLE = 9)] = "TUPLE"),
            (u[(u.SYMBOL = 10)] = "SYMBOL"),
            (u[(u.OPTIONAL = 11)] = "OPTIONAL"),
            (u[(u.NULLABLE = 12)] = "NULLABLE"),
            (u[(u.KEY_OF_TYPE_OF = 13)] = "KEY_OF_TYPE_OF"),
            (u[(u.FUNCTION = 14)] = "FUNCTION"),
            (u[(u.ARROW = 15)] = "ARROW"),
            (u[(u.ARRAY_BRACKETS = 16)] = "ARRAY_BRACKETS"),
            (u[(u.GENERIC = 17)] = "GENERIC"),
            (u[(u.NAME_PATH = 18)] = "NAME_PATH"),
            (u[(u.PARENTHESIS = 19)] = "PARENTHESIS"),
            (u[(u.SPECIAL_TYPES = 20)] = "SPECIAL_TYPES");
        })(B || (B = {}));
        class G {
          constructor(y, v, O) {
            (this.grammar = y),
              typeof v == "string" ? (this._lexer = k.create(v)) : (this._lexer = v),
              (this.baseParser = O);
          }
          get lexer() {
            return this._lexer;
          }
          parse() {
            let y = this.parseType(B.ALL);
            if (this.lexer.current.type !== "EOF") throw new n(this.lexer.current);
            return y;
          }
          parseType(y) {
            return T(this.parseIntermediateType(y));
          }
          parseIntermediateType(y) {
            let v = this.tryParslets(null, y);
            if (v === null) throw new r(this.lexer.current);
            return this.parseInfixIntermediateType(v, y);
          }
          parseInfixIntermediateType(y, v) {
            let O = this.tryParslets(y, v);
            for (; O !== null; ) (y = O), (O = this.tryParslets(y, v));
            return y;
          }
          tryParslets(y, v) {
            for (let O of this.grammar) {
              let j = O(this, v, y);
              if (j !== null) return j;
            }
            return null;
          }
          consume(y) {
            return (
              Array.isArray(y) || (y = [y]),
              y.includes(this.lexer.current.type) ? ((this._lexer = this.lexer.advance()), !0) : !1
            );
          }
          acceptLexerState(y) {
            this._lexer = y.lexer;
          }
        }
        function $(u) {
          return u === "EOF" || u === "|" || u === "," || u === ")" || u === ">";
        }
        let H = (u, y, v) => {
          let O = u.lexer.current.type,
            j = u.lexer.next.type;
          return (v == null && O === "?" && !$(j)) || (v != null && O === "?")
            ? (u.consume("?"),
              v == null
                ? { type: "JsdocTypeNullable", element: u.parseType(B.NULLABLE), meta: { position: "prefix" } }
                : { type: "JsdocTypeNullable", element: T(v), meta: { position: "suffix" } })
            : null;
        };
        function w(u) {
          let y = (v, O, j) => {
            let q = v.lexer.current.type,
              W = v.lexer.next.type;
            if (j === null) {
              if ("parsePrefix" in u && u.accept(q, W)) return u.parsePrefix(v);
            } else if ("parseInfix" in u && u.precedence > O && u.accept(q, W)) return u.parseInfix(v, j);
            return null;
          };
          return Object.defineProperty(y, "name", { value: u.name }), y;
        }
        let C = w({
            name: "optionalParslet",
            accept: (u) => u === "=",
            precedence: B.OPTIONAL,
            parsePrefix: (u) => (
              u.consume("="),
              { type: "JsdocTypeOptional", element: u.parseType(B.OPTIONAL), meta: { position: "prefix" } }
            ),
            parseInfix: (u, y) => (
              u.consume("="), { type: "JsdocTypeOptional", element: T(y), meta: { position: "suffix" } }
            ),
          }),
          _ = w({
            name: "numberParslet",
            accept: (u) => u === "Number",
            parsePrefix: (u) => {
              let y = parseFloat(u.lexer.current.text);
              return u.consume("Number"), { type: "JsdocTypeNumber", value: y };
            },
          }),
          M = w({
            name: "parenthesisParslet",
            accept: (u) => u === "(",
            parsePrefix: (u) => {
              if ((u.consume("("), u.consume(")"))) return { type: "JsdocTypeParameterList", elements: [] };
              let y = u.parseIntermediateType(B.ALL);
              if (!u.consume(")")) throw new Error("Unterminated parenthesis");
              return y.type === "JsdocTypeParameterList"
                ? y
                : y.type === "JsdocTypeKeyValue"
                  ? { type: "JsdocTypeParameterList", elements: [y] }
                  : { type: "JsdocTypeParenthesis", element: T(y) };
            },
          }),
          U = w({
            name: "specialTypesParslet",
            accept: (u, y) => (u === "?" && $(y)) || u === "null" || u === "undefined" || u === "*",
            parsePrefix: (u) => {
              if (u.consume("null")) return { type: "JsdocTypeNull" };
              if (u.consume("undefined")) return { type: "JsdocTypeUndefined" };
              if (u.consume("*")) return { type: "JsdocTypeAny" };
              if (u.consume("?")) return { type: "JsdocTypeUnknown" };
              throw new Error("Unacceptable token: " + u.lexer.current.text);
            },
          }),
          K = w({
            name: "notNullableParslet",
            accept: (u) => u === "!",
            precedence: B.NULLABLE,
            parsePrefix: (u) => (
              u.consume("!"),
              { type: "JsdocTypeNotNullable", element: u.parseType(B.NULLABLE), meta: { position: "prefix" } }
            ),
            parseInfix: (u, y) => (
              u.consume("!"), { type: "JsdocTypeNotNullable", element: T(y), meta: { position: "suffix" } }
            ),
          });
        function re({ allowTrailingComma: u }) {
          return w({
            name: "parameterListParslet",
            accept: (y) => y === ",",
            precedence: B.PARAMETER_LIST,
            parseInfix: (y, v) => {
              let O = [I(v)];
              y.consume(",");
              do
                try {
                  let j = y.parseIntermediateType(B.PARAMETER_LIST);
                  O.push(I(j));
                } catch (j) {
                  if (u && j instanceof r) break;
                  throw j;
                }
              while (y.consume(","));
              if (O.length > 0 && O.slice(0, -1).some((j) => j.type === "JsdocTypeVariadic"))
                throw new Error("Only the last parameter may be a rest parameter");
              return { type: "JsdocTypeParameterList", elements: O };
            },
          });
        }
        let Z = w({
            name: "genericParslet",
            accept: (u, y) => u === "<" || (u === "." && y === "<"),
            precedence: B.GENERIC,
            parseInfix: (u, y) => {
              let v = u.consume(".");
              u.consume("<");
              let O = [];
              do O.push(u.parseType(B.PARAMETER_LIST));
              while (u.consume(","));
              if (!u.consume(">")) throw new Error("Unterminated generic parameter list");
              return { type: "JsdocTypeGeneric", left: T(y), elements: O, meta: { brackets: "angle", dot: v } };
            },
          }),
          Y = w({
            name: "unionParslet",
            accept: (u) => u === "|",
            precedence: B.UNION,
            parseInfix: (u, y) => {
              u.consume("|");
              let v = [];
              do v.push(u.parseType(B.UNION));
              while (u.consume("|"));
              return { type: "JsdocTypeUnion", elements: [T(y), ...v] };
            },
          }),
          ee = [H, C, _, M, U, K, re({ allowTrailingComma: !0 }), Z, Y, C];
        function ye({ allowSquareBracketsOnAnyType: u, allowJsdocNamePaths: y, pathGrammar: v }) {
          return function (j, q, W) {
            if (W == null || q >= B.NAME_PATH) return null;
            let te = j.lexer.current.type,
              Ce = j.lexer.next.type;
            if (
              !(
                (te === "." && Ce !== "<") ||
                (te === "[" && (u || W.type === "JsdocTypeName")) ||
                (y && (te === "~" || te === "#"))
              )
            )
              return null;
            let Le,
              Or = !1;
            j.consume(".")
              ? (Le = "property")
              : j.consume("[")
                ? ((Le = "property-brackets"), (Or = !0))
                : j.consume("~")
                  ? (Le = "inner")
                  : (j.consume("#"), (Le = "instance"));
            let Ua = v !== null ? new G(v, j.lexer, j) : j,
              Xe = Ua.parseIntermediateType(B.NAME_PATH);
            j.acceptLexerState(Ua);
            let ir;
            switch (Xe.type) {
              case "JsdocTypeName":
                ir = { type: "JsdocTypeProperty", value: Xe.value, meta: { quote: void 0 } };
                break;
              case "JsdocTypeNumber":
                ir = { type: "JsdocTypeProperty", value: Xe.value.toString(10), meta: { quote: void 0 } };
                break;
              case "JsdocTypeStringValue":
                ir = { type: "JsdocTypeProperty", value: Xe.value, meta: { quote: Xe.meta.quote } };
                break;
              case "JsdocTypeSpecialNamePath":
                if (Xe.specialType === "event") ir = Xe;
                else throw new o(Xe, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
                break;
              default:
                throw new o(
                  Xe,
                  "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'"
                );
            }
            if (Or && !j.consume("]")) {
              let $a = j.lexer.current;
              throw new Error(`Unterminated square brackets. Next token is '${$a.type}' with text '${$a.text}'`);
            }
            return { type: "JsdocTypeNamePath", left: T(W), right: ir, pathType: Le };
          };
        }
        function le({ allowedAdditionalTokens: u }) {
          return w({
            name: "nameParslet",
            accept: (y) => y === "Identifier" || y === "this" || y === "new" || u.includes(y),
            parsePrefix: (y) => {
              let { type: v, text: O } = y.lexer.current;
              return y.consume(v), { type: "JsdocTypeName", value: O };
            },
          });
        }
        let Ae = w({
          name: "stringValueParslet",
          accept: (u) => u === "StringValue",
          parsePrefix: (u) => {
            let y = u.lexer.current.text;
            return (
              u.consume("StringValue"),
              {
                type: "JsdocTypeStringValue",
                value: y.slice(1, -1),
                meta: { quote: y[0] === "'" ? "single" : "double" },
              }
            );
          },
        });
        function ne({ pathGrammar: u, allowedTypes: y }) {
          return w({
            name: "specialNamePathParslet",
            accept: (v) => y.includes(v),
            parsePrefix: (v) => {
              let O = v.lexer.current.type;
              if ((v.consume(O), !v.consume(":"))) return { type: "JsdocTypeName", value: O };
              let j,
                q = v.lexer.current;
              if (v.consume("StringValue"))
                j = {
                  type: "JsdocTypeSpecialNamePath",
                  value: q.text.slice(1, -1),
                  specialType: O,
                  meta: { quote: q.text[0] === "'" ? "single" : "double" },
                };
              else {
                let Ce = "",
                  ve = ["Identifier", "@", "/"];
                for (; ve.some((Le) => v.consume(Le)); ) (Ce += q.text), (q = v.lexer.current);
                j = { type: "JsdocTypeSpecialNamePath", value: Ce, specialType: O, meta: { quote: void 0 } };
              }
              let W = new G(u, v.lexer, v),
                te = W.parseInfixIntermediateType(j, B.ALL);
              return v.acceptLexerState(W), T(te);
            },
          });
        }
        let qe = [
            le({ allowedAdditionalTokens: ["external", "module"] }),
            Ae,
            _,
            ye({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: null }),
          ],
          Be = [...qe, ne({ allowedTypes: ["event"], pathGrammar: qe })];
        function Ye(u) {
          let y;
          if (u.type === "JsdocTypeParameterList") y = u.elements;
          else if (u.type === "JsdocTypeParenthesis") y = [u.element];
          else throw new o(u);
          return y.map((v) => I(v));
        }
        function nr(u) {
          let y = Ye(u);
          if (y.some((v) => v.type === "JsdocTypeKeyValue")) throw new Error("No parameter should be named");
          return y;
        }
        function Ft({
          allowNamedParameters: u,
          allowNoReturnType: y,
          allowWithoutParenthesis: v,
          allowNewAsFunctionKeyword: O,
        }) {
          return w({
            name: "functionParslet",
            accept: (j, q) => j === "function" || (O && j === "new" && q === "("),
            parsePrefix: (j) => {
              let q = j.consume("new");
              j.consume("function");
              let W = j.lexer.current.type === "(";
              if (!W) {
                if (!v) throw new Error("function is missing parameter list");
                return { type: "JsdocTypeName", value: "function" };
              }
              let te = { type: "JsdocTypeFunction", parameters: [], arrow: !1, constructor: q, parenthesis: W },
                Ce = j.parseIntermediateType(B.FUNCTION);
              if (u === void 0) te.parameters = nr(Ce);
              else {
                if (q && Ce.type === "JsdocTypeFunction" && Ce.arrow) return (te = Ce), (te.constructor = !0), te;
                te.parameters = Ye(Ce);
                for (let ve of te.parameters)
                  if (ve.type === "JsdocTypeKeyValue" && !u.includes(ve.key))
                    throw new Error(`only allowed named parameters are ${u.join(", ")} but got ${ve.type}`);
              }
              if (j.consume(":")) te.returnType = j.parseType(B.PREFIX);
              else if (!y) throw new Error("function is missing return type");
              return te;
            },
          });
        }
        function or({ allowPostfix: u, allowEnclosingBrackets: y }) {
          return w({
            name: "variadicParslet",
            accept: (v) => v === "...",
            precedence: B.PREFIX,
            parsePrefix: (v) => {
              v.consume("...");
              let O = y && v.consume("[");
              try {
                let j = v.parseType(B.PREFIX);
                if (O && !v.consume("]")) throw new Error("Unterminated variadic type. Missing ']'");
                return { type: "JsdocTypeVariadic", element: T(j), meta: { position: "prefix", squareBrackets: O } };
              } catch (j) {
                if (j instanceof r) {
                  if (O) throw new Error("Empty square brackets for variadic are not allowed.");
                  return { type: "JsdocTypeVariadic", meta: { position: void 0, squareBrackets: !1 } };
                } else throw j;
              }
            },
            parseInfix: u
              ? (v, O) => (
                  v.consume("..."),
                  { type: "JsdocTypeVariadic", element: T(O), meta: { position: "suffix", squareBrackets: !1 } }
                )
              : void 0,
          });
        }
        let Cr = w({
            name: "symbolParslet",
            accept: (u) => u === "(",
            precedence: B.SYMBOL,
            parseInfix: (u, y) => {
              if (y.type !== "JsdocTypeName")
                throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
              u.consume("(");
              let v = { type: "JsdocTypeSymbol", value: y.value };
              if (!u.consume(")")) {
                let O = u.parseIntermediateType(B.SYMBOL);
                if (((v.element = P(O)), !u.consume(")"))) throw new Error("Symbol does not end after value");
              }
              return v;
            },
          }),
          _e = w({
            name: "arrayBracketsParslet",
            precedence: B.ARRAY_BRACKETS,
            accept: (u, y) => u === "[" && y === "]",
            parseInfix: (u, y) => (
              u.consume("["),
              u.consume("]"),
              {
                type: "JsdocTypeGeneric",
                left: { type: "JsdocTypeName", value: "Array" },
                elements: [T(y)],
                meta: { brackets: "square", dot: !1 },
              }
            ),
          });
        function De({ objectFieldGrammar: u, allowKeyTypes: y }) {
          return w({
            name: "objectParslet",
            accept: (v) => v === "{",
            parsePrefix: (v) => {
              v.consume("{");
              let O = { type: "JsdocTypeObject", meta: { separator: "comma" }, elements: [] };
              if (!v.consume("}")) {
                let j,
                  q = new G(u, v.lexer, v);
                for (;;) {
                  q.acceptLexerState(v);
                  let W = q.parseIntermediateType(B.OBJECT);
                  v.acceptLexerState(q), W === void 0 && y && (W = v.parseIntermediateType(B.OBJECT));
                  let te = !1;
                  if (
                    (W.type === "JsdocTypeNullable" && ((te = !0), (W = W.element)),
                    W.type === "JsdocTypeNumber" || W.type === "JsdocTypeName" || W.type === "JsdocTypeStringValue")
                  ) {
                    let ve;
                    W.type === "JsdocTypeStringValue" && (ve = W.meta.quote),
                      O.elements.push({
                        type: "JsdocTypeObjectField",
                        key: W.value.toString(),
                        right: void 0,
                        optional: te,
                        readonly: !1,
                        meta: { quote: ve },
                      });
                  } else if (W.type === "JsdocTypeObjectField" || W.type === "JsdocTypeJsdocObjectField")
                    O.elements.push(W);
                  else throw new o(W);
                  if (v.lexer.current.startOfLine) j = "linebreak";
                  else if (v.consume(",")) j = "comma";
                  else if (v.consume(";")) j = "semicolon";
                  else break;
                  if (v.lexer.current.type === "}") break;
                }
                if (((O.meta.separator = j ?? "comma"), !v.consume("}")))
                  throw new Error("Unterminated record type. Missing '}'");
              }
              return O;
            },
          });
        }
        function nt({ allowSquaredProperties: u, allowKeyTypes: y, allowReadonly: v, allowOptional: O }) {
          return w({
            name: "objectFieldParslet",
            precedence: B.KEY_VALUE,
            accept: (j) => j === ":",
            parseInfix: (j, q) => {
              var W;
              let te = !1,
                Ce = !1;
              O && q.type === "JsdocTypeNullable" && ((te = !0), (q = q.element)),
                v && q.type === "JsdocTypeReadonlyProperty" && ((Ce = !0), (q = q.element));
              let ve = (W = j.baseParser) !== null && W !== void 0 ? W : j;
              if (
                (ve.acceptLexerState(j),
                q.type === "JsdocTypeNumber" || q.type === "JsdocTypeName" || q.type === "JsdocTypeStringValue" || L(q))
              ) {
                if (L(q) && !u) throw new o(q);
                ve.consume(":");
                let Le;
                q.type === "JsdocTypeStringValue" && (Le = q.meta.quote);
                let Or = ve.parseType(B.KEY_VALUE);
                return (
                  j.acceptLexerState(ve),
                  {
                    type: "JsdocTypeObjectField",
                    key: L(q) ? q : q.value.toString(),
                    right: Or,
                    optional: te,
                    readonly: Ce,
                    meta: { quote: Le },
                  }
                );
              } else {
                if (!y) throw new o(q);
                ve.consume(":");
                let Le = ve.parseType(B.KEY_VALUE);
                return j.acceptLexerState(ve), { type: "JsdocTypeJsdocObjectField", left: T(q), right: Le };
              }
            },
          });
        }
        function Nt({ allowOptional: u, allowVariadic: y }) {
          return w({
            name: "keyValueParslet",
            precedence: B.KEY_VALUE,
            accept: (v) => v === ":",
            parseInfix: (v, O) => {
              let j = !1,
                q = !1;
              if (
                (u && O.type === "JsdocTypeNullable" && ((j = !0), (O = O.element)),
                y && O.type === "JsdocTypeVariadic" && O.element !== void 0 && ((q = !0), (O = O.element)),
                O.type !== "JsdocTypeName")
              )
                throw new o(O);
              v.consume(":");
              let W = v.parseType(B.KEY_VALUE);
              return { type: "JsdocTypeKeyValue", key: O.value, right: W, optional: j, variadic: q };
            },
          });
        }
        let kr = [
            ...ee,
            Ft({
              allowWithoutParenthesis: !0,
              allowNamedParameters: ["this", "new"],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            Ae,
            ne({ allowedTypes: ["module", "external", "event"], pathGrammar: Be }),
            or({ allowEnclosingBrackets: !0, allowPostfix: !0 }),
            le({ allowedAdditionalTokens: ["keyof"] }),
            Cr,
            _e,
            ye({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: Be }),
          ],
          An = [
            ...kr,
            De({
              objectFieldGrammar: [
                le({ allowedAdditionalTokens: ["module", "in"] }),
                nt({ allowSquaredProperties: !1, allowKeyTypes: !0, allowOptional: !1, allowReadonly: !1 }),
                ...kr,
              ],
              allowKeyTypes: !0,
            }),
            Nt({ allowOptional: !0, allowVariadic: !0 }),
          ],
          Na = w({
            name: "typeOfParslet",
            accept: (u) => u === "typeof",
            parsePrefix: (u) => (
              u.consume("typeof"), { type: "JsdocTypeTypeof", element: T(u.parseType(B.KEY_OF_TYPE_OF)) }
            ),
          }),
          Vd = [
            le({ allowedAdditionalTokens: ["module", "keyof", "event", "external", "in"] }),
            H,
            C,
            Ae,
            _,
            nt({ allowSquaredProperties: !1, allowKeyTypes: !1, allowOptional: !1, allowReadonly: !1 }),
          ],
          Jd = [
            ...ee,
            De({ allowKeyTypes: !1, objectFieldGrammar: Vd }),
            le({ allowedAdditionalTokens: ["event", "external", "in"] }),
            Na,
            Ft({
              allowWithoutParenthesis: !1,
              allowNamedParameters: ["this", "new"],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            or({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
            le({ allowedAdditionalTokens: ["keyof"] }),
            ne({ allowedTypes: ["module"], pathGrammar: Be }),
            ye({ allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: Be }),
            Nt({ allowOptional: !1, allowVariadic: !1 }),
            Cr,
          ],
          zd = w({
            name: "assertsParslet",
            accept: (u) => u === "asserts",
            parsePrefix: (u) => {
              u.consume("asserts");
              let y = u.parseIntermediateType(B.SYMBOL);
              if (y.type !== "JsdocTypeName")
                throw new o(y, "A typescript asserts always has to have a name on the left side.");
              return u.consume("is"), { type: "JsdocTypeAsserts", left: y, right: T(u.parseIntermediateType(B.INFIX)) };
            },
          });
        function Hd({ allowQuestionMark: u }) {
          return w({
            name: "tupleParslet",
            accept: (y) => y === "[",
            parsePrefix: (y) => {
              y.consume("[");
              let v = { type: "JsdocTypeTuple", elements: [] };
              if (y.consume("]")) return v;
              let O = y.parseIntermediateType(B.ALL);
              if (
                (O.type === "JsdocTypeParameterList"
                  ? O.elements[0].type === "JsdocTypeKeyValue"
                    ? (v.elements = O.elements.map(F))
                    : (v.elements = O.elements.map(T))
                  : O.type === "JsdocTypeKeyValue"
                    ? (v.elements = [F(O)])
                    : (v.elements = [T(O)]),
                !y.consume("]"))
              )
                throw new Error("Unterminated '['");
              if (!u && v.elements.some((j) => j.type === "JsdocTypeUnknown"))
                throw new Error("Question mark in tuple not allowed");
              return v;
            },
          });
        }
        let Gd = w({
            name: "keyOfParslet",
            accept: (u) => u === "keyof",
            parsePrefix: (u) => (
              u.consume("keyof"), { type: "JsdocTypeKeyof", element: T(u.parseType(B.KEY_OF_TYPE_OF)) }
            ),
          }),
          Wd = w({
            name: "importParslet",
            accept: (u) => u === "import",
            parsePrefix: (u) => {
              if ((u.consume("import"), !u.consume("("))) throw new Error("Missing parenthesis after import keyword");
              let y = u.parseType(B.PREFIX);
              if (y.type !== "JsdocTypeStringValue")
                throw new Error("Only string values are allowed as paths for imports");
              if (!u.consume(")")) throw new Error("Missing closing parenthesis after import keyword");
              return { type: "JsdocTypeImport", element: y };
            },
          }),
          Kd = w({
            name: "readonlyPropertyParslet",
            accept: (u) => u === "readonly",
            parsePrefix: (u) => (
              u.consume("readonly"), { type: "JsdocTypeReadonlyProperty", element: u.parseType(B.KEY_VALUE) }
            ),
          }),
          Yd = w({
            name: "arrowFunctionParslet",
            precedence: B.ARROW,
            accept: (u) => u === "=>",
            parseInfix: (u, y) => (
              u.consume("=>"),
              {
                type: "JsdocTypeFunction",
                parameters: Ye(y).map(D),
                arrow: !0,
                constructor: !1,
                parenthesis: !0,
                returnType: u.parseType(B.OBJECT),
              }
            ),
          }),
          Xd = w({
            name: "intersectionParslet",
            accept: (u) => u === "&",
            precedence: B.INTERSECTION,
            parseInfix: (u, y) => {
              u.consume("&");
              let v = [];
              do v.push(u.parseType(B.INTERSECTION));
              while (u.consume("&"));
              return { type: "JsdocTypeIntersection", elements: [T(y), ...v] };
            },
          }),
          Qd = w({
            name: "predicateParslet",
            precedence: B.INFIX,
            accept: (u) => u === "is",
            parseInfix: (u, y) => {
              if (y.type !== "JsdocTypeName")
                throw new o(y, "A typescript predicate always has to have a name on the left side.");
              return (
                u.consume("is"), { type: "JsdocTypePredicate", left: y, right: T(u.parseIntermediateType(B.INFIX)) }
              );
            },
          }),
          Zd = w({
            name: "objectSquareBracketPropertyParslet",
            accept: (u) => u === "[",
            parsePrefix: (u) => {
              if (u.baseParser === void 0) throw new Error("Only allowed inside object grammar");
              u.consume("[");
              let y = u.lexer.current.text;
              u.consume("Identifier");
              let v;
              if (u.consume(":")) {
                let O = u.baseParser;
                O.acceptLexerState(u),
                  (v = { type: "JsdocTypeIndexSignature", key: y, right: O.parseType(B.INDEX_BRACKETS) }),
                  u.acceptLexerState(O);
              } else if (u.consume("in")) {
                let O = u.baseParser;
                O.acceptLexerState(u),
                  (v = { type: "JsdocTypeMappedType", key: y, right: O.parseType(B.ARRAY_BRACKETS) }),
                  u.acceptLexerState(O);
              } else throw new Error("Missing ':' or 'in' inside square bracketed property.");
              if (!u.consume("]")) throw new Error("Unterminated square brackets");
              return v;
            },
          }),
          ep = [
            Kd,
            le({ allowedAdditionalTokens: ["module", "event", "keyof", "event", "external", "in"] }),
            H,
            C,
            Ae,
            _,
            nt({ allowSquaredProperties: !0, allowKeyTypes: !1, allowOptional: !0, allowReadonly: !0 }),
            Zd,
          ],
          tp = [
            ...ee,
            De({ allowKeyTypes: !1, objectFieldGrammar: ep }),
            Na,
            Gd,
            Wd,
            Ae,
            Ft({
              allowWithoutParenthesis: !0,
              allowNoReturnType: !1,
              allowNamedParameters: ["this", "new", "args"],
              allowNewAsFunctionKeyword: !0,
            }),
            Hd({ allowQuestionMark: !1 }),
            or({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
            zd,
            le({ allowedAdditionalTokens: ["event", "external", "in"] }),
            ne({ allowedTypes: ["module"], pathGrammar: Be }),
            _e,
            Yd,
            ye({ allowSquareBracketsOnAnyType: !0, allowJsdocNamePaths: !1, pathGrammar: Be }),
            Xd,
            Qd,
            Nt({ allowVariadic: !0, allowOptional: !0 }),
          ];
        function Ba(u, y) {
          switch (y) {
            case "closure":
              return new G(Jd, u).parse();
            case "jsdoc":
              return new G(An, u).parse();
            case "typescript":
              return new G(tp, u).parse();
          }
        }
        function rp(u, y = ["typescript", "closure", "jsdoc"]) {
          let v;
          for (let O of y)
            try {
              return Ba(u, O);
            } catch (j) {
              v = j;
            }
          throw v;
        }
        function ar(u, y) {
          let v = u[y.type];
          if (v === void 0) throw new Error(`In this set of transform rules exists no rule for type ${y.type}.`);
          return v(y, (O) => ar(u, O));
        }
        function Te(u) {
          throw new Error("This transform is not available. Are you trying the correct parsing mode?");
        }
        function ja(u) {
          let y = { params: [] };
          for (let v of u.parameters)
            v.type === "JsdocTypeKeyValue"
              ? v.key === "this"
                ? (y.this = v.right)
                : v.key === "new"
                  ? (y.new = v.right)
                  : y.params.push(v)
              : y.params.push(v);
          return y;
        }
        function Ir(u, y, v) {
          return u === "prefix" ? v + y : y + v;
        }
        function ot(u, y) {
          switch (y) {
            case "double":
              return `"${u}"`;
            case "single":
              return `'${u}'`;
            case void 0:
              return u;
          }
        }
        function La() {
          return {
            JsdocTypeParenthesis: (u, y) => `(${u.element !== void 0 ? y(u.element) : ""})`,
            JsdocTypeKeyof: (u, y) => `keyof ${y(u.element)}`,
            JsdocTypeFunction: (u, y) => {
              if (u.arrow) {
                if (u.returnType === void 0) throw new Error("Arrow function needs a return type.");
                let v = `(${u.parameters.map(y).join(", ")}) => ${y(u.returnType)}`;
                return u.constructor && (v = "new " + v), v;
              } else {
                let v = u.constructor ? "new" : "function";
                return (
                  u.parenthesis &&
                    ((v += `(${u.parameters.map(y).join(", ")})`),
                    u.returnType !== void 0 && (v += `: ${y(u.returnType)}`)),
                  v
                );
              }
            },
            JsdocTypeName: (u) => u.value,
            JsdocTypeTuple: (u, y) => `[${u.elements.map(y).join(", ")}]`,
            JsdocTypeVariadic: (u, y) =>
              u.meta.position === void 0 ? "..." : Ir(u.meta.position, y(u.element), "..."),
            JsdocTypeNamePath: (u, y) => {
              let v = y(u.left),
                O = y(u.right);
              switch (u.pathType) {
                case "inner":
                  return `${v}~${O}`;
                case "instance":
                  return `${v}#${O}`;
                case "property":
                  return `${v}.${O}`;
                case "property-brackets":
                  return `${v}[${O}]`;
              }
            },
            JsdocTypeStringValue: (u) => ot(u.value, u.meta.quote),
            JsdocTypeAny: () => "*",
            JsdocTypeGeneric: (u, y) => {
              if (u.meta.brackets === "square") {
                let v = u.elements[0],
                  O = y(v);
                return v.type === "JsdocTypeUnion" || v.type === "JsdocTypeIntersection" ? `(${O})[]` : `${O}[]`;
              } else return `${y(u.left)}${u.meta.dot ? "." : ""}<${u.elements.map(y).join(", ")}>`;
            },
            JsdocTypeImport: (u, y) => `import(${y(u.element)})`,
            JsdocTypeObjectField: (u, y) => {
              let v = "";
              return (
                u.readonly && (v += "readonly "),
                typeof u.key == "string" ? (v += ot(u.key, u.meta.quote)) : (v += y(u.key)),
                u.optional && (v += "?"),
                u.right === void 0 ? v : v + `: ${y(u.right)}`
              );
            },
            JsdocTypeJsdocObjectField: (u, y) => `${y(u.left)}: ${y(u.right)}`,
            JsdocTypeKeyValue: (u, y) => {
              let v = u.key;
              return (
                u.optional && (v += "?"), u.variadic && (v = "..." + v), u.right === void 0 ? v : v + `: ${y(u.right)}`
              );
            },
            JsdocTypeSpecialNamePath: (u) => `${u.specialType}:${ot(u.value, u.meta.quote)}`,
            JsdocTypeNotNullable: (u, y) => Ir(u.meta.position, y(u.element), "!"),
            JsdocTypeNull: () => "null",
            JsdocTypeNullable: (u, y) => Ir(u.meta.position, y(u.element), "?"),
            JsdocTypeNumber: (u) => u.value.toString(),
            JsdocTypeObject: (u, y) => `{${u.elements.map(y).join((u.meta.separator === "comma" ? "," : ";") + " ")}}`,
            JsdocTypeOptional: (u, y) => Ir(u.meta.position, y(u.element), "="),
            JsdocTypeSymbol: (u, y) => `${u.value}(${u.element !== void 0 ? y(u.element) : ""})`,
            JsdocTypeTypeof: (u, y) => `typeof ${y(u.element)}`,
            JsdocTypeUndefined: () => "undefined",
            JsdocTypeUnion: (u, y) => u.elements.map(y).join(" | "),
            JsdocTypeUnknown: () => "?",
            JsdocTypeIntersection: (u, y) => u.elements.map(y).join(" & "),
            JsdocTypeProperty: (u) => ot(u.value, u.meta.quote),
            JsdocTypePredicate: (u, y) => `${y(u.left)} is ${y(u.right)}`,
            JsdocTypeIndexSignature: (u, y) => `[${u.key}: ${y(u.right)}]`,
            JsdocTypeMappedType: (u, y) => `[${u.key} in ${y(u.right)}]`,
            JsdocTypeAsserts: (u, y) => `asserts ${y(u.left)} is ${y(u.right)}`,
          };
        }
        let np = La();
        function op(u) {
          return ar(np, u);
        }
        let ap = [
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
        function at(u) {
          let y = { type: "NameExpression", name: u };
          return ap.includes(u) && (y.reservedWord = !0), y;
        }
        let ip = {
          JsdocTypeOptional: (u, y) => {
            let v = y(u.element);
            return (v.optional = !0), v;
          },
          JsdocTypeNullable: (u, y) => {
            let v = y(u.element);
            return (v.nullable = !0), v;
          },
          JsdocTypeNotNullable: (u, y) => {
            let v = y(u.element);
            return (v.nullable = !1), v;
          },
          JsdocTypeVariadic: (u, y) => {
            if (u.element === void 0) throw new Error("dots without value are not allowed in catharsis mode");
            let v = y(u.element);
            return (v.repeatable = !0), v;
          },
          JsdocTypeAny: () => ({ type: "AllLiteral" }),
          JsdocTypeNull: () => ({ type: "NullLiteral" }),
          JsdocTypeStringValue: (u) => at(ot(u.value, u.meta.quote)),
          JsdocTypeUndefined: () => ({ type: "UndefinedLiteral" }),
          JsdocTypeUnknown: () => ({ type: "UnknownLiteral" }),
          JsdocTypeFunction: (u, y) => {
            let v = ja(u),
              O = { type: "FunctionType", params: v.params.map(y) };
            return (
              v.this !== void 0 && (O.this = y(v.this)),
              v.new !== void 0 && (O.new = y(v.new)),
              u.returnType !== void 0 && (O.result = y(u.returnType)),
              O
            );
          },
          JsdocTypeGeneric: (u, y) => ({
            type: "TypeApplication",
            applications: u.elements.map((v) => y(v)),
            expression: y(u.left),
          }),
          JsdocTypeSpecialNamePath: (u) => at(u.specialType + ":" + ot(u.value, u.meta.quote)),
          JsdocTypeName: (u) => (u.value !== "function" ? at(u.value) : { type: "FunctionType", params: [] }),
          JsdocTypeNumber: (u) => at(u.value.toString()),
          JsdocTypeObject: (u, y) => {
            let v = { type: "RecordType", fields: [] };
            for (let O of u.elements)
              O.type !== "JsdocTypeObjectField" && O.type !== "JsdocTypeJsdocObjectField"
                ? v.fields.push({ type: "FieldType", key: y(O), value: void 0 })
                : v.fields.push(y(O));
            return v;
          },
          JsdocTypeObjectField: (u, y) => {
            if (typeof u.key != "string") throw new Error("Index signatures and mapped types are not supported");
            return {
              type: "FieldType",
              key: at(ot(u.key, u.meta.quote)),
              value: u.right === void 0 ? void 0 : y(u.right),
            };
          },
          JsdocTypeJsdocObjectField: (u, y) => ({ type: "FieldType", key: y(u.left), value: y(u.right) }),
          JsdocTypeUnion: (u, y) => ({ type: "TypeUnion", elements: u.elements.map((v) => y(v)) }),
          JsdocTypeKeyValue: (u, y) => ({
            type: "FieldType",
            key: at(u.key),
            value: u.right === void 0 ? void 0 : y(u.right),
          }),
          JsdocTypeNamePath: (u, y) => {
            let v = y(u.left),
              O;
            u.right.type === "JsdocTypeSpecialNamePath"
              ? (O = y(u.right).name)
              : (O = ot(u.right.value, u.right.meta.quote));
            let j = u.pathType === "inner" ? "~" : u.pathType === "instance" ? "#" : ".";
            return at(`${v.name}${j}${O}`);
          },
          JsdocTypeSymbol: (u) => {
            let y = "",
              v = u.element,
              O = !1;
            return (
              v?.type === "JsdocTypeVariadic" &&
                (v.meta.position === "prefix" ? (y = "...") : (O = !0), (v = v.element)),
              v?.type === "JsdocTypeName" ? (y += v.value) : v?.type === "JsdocTypeNumber" && (y += v.value.toString()),
              O && (y += "..."),
              at(`${u.value}(${y})`)
            );
          },
          JsdocTypeParenthesis: (u, y) => y(T(u.element)),
          JsdocTypeMappedType: Te,
          JsdocTypeIndexSignature: Te,
          JsdocTypeImport: Te,
          JsdocTypeKeyof: Te,
          JsdocTypeTuple: Te,
          JsdocTypeTypeof: Te,
          JsdocTypeIntersection: Te,
          JsdocTypeProperty: Te,
          JsdocTypePredicate: Te,
          JsdocTypeAsserts: Te,
        };
        function sp(u) {
          return ar(ip, u);
        }
        function Et(u) {
          switch (u) {
            case void 0:
              return "none";
            case "single":
              return "single";
            case "double":
              return "double";
          }
        }
        function lp(u) {
          switch (u) {
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
        function Tn(u, y) {
          return y.length === 2
            ? { type: u, left: y[0], right: y[1] }
            : { type: u, left: y[0], right: Tn(u, y.slice(1)) };
        }
        let up = {
          JsdocTypeOptional: (u, y) => ({
            type: "OPTIONAL",
            value: y(u.element),
            meta: { syntax: u.meta.position === "prefix" ? "PREFIX_EQUAL_SIGN" : "SUFFIX_EQUALS_SIGN" },
          }),
          JsdocTypeNullable: (u, y) => ({
            type: "NULLABLE",
            value: y(u.element),
            meta: { syntax: u.meta.position === "prefix" ? "PREFIX_QUESTION_MARK" : "SUFFIX_QUESTION_MARK" },
          }),
          JsdocTypeNotNullable: (u, y) => ({
            type: "NOT_NULLABLE",
            value: y(u.element),
            meta: { syntax: u.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG" },
          }),
          JsdocTypeVariadic: (u, y) => {
            let v = {
              type: "VARIADIC",
              meta: {
                syntax:
                  u.meta.position === "prefix"
                    ? "PREFIX_DOTS"
                    : u.meta.position === "suffix"
                      ? "SUFFIX_DOTS"
                      : "ONLY_DOTS",
              },
            };
            return u.element !== void 0 && (v.value = y(u.element)), v;
          },
          JsdocTypeName: (u) => ({ type: "NAME", name: u.value }),
          JsdocTypeTypeof: (u, y) => ({ type: "TYPE_QUERY", name: y(u.element) }),
          JsdocTypeTuple: (u, y) => ({ type: "TUPLE", entries: u.elements.map(y) }),
          JsdocTypeKeyof: (u, y) => ({ type: "KEY_QUERY", value: y(u.element) }),
          JsdocTypeImport: (u) => ({
            type: "IMPORT",
            path: { type: "STRING_VALUE", quoteStyle: Et(u.element.meta.quote), string: u.element.value },
          }),
          JsdocTypeUndefined: () => ({ type: "NAME", name: "undefined" }),
          JsdocTypeAny: () => ({ type: "ANY" }),
          JsdocTypeFunction: (u, y) => {
            let v = ja(u),
              O = {
                type: u.arrow ? "ARROW" : "FUNCTION",
                params: v.params.map((j) => {
                  if (j.type === "JsdocTypeKeyValue") {
                    if (j.right === void 0)
                      throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
                    return { type: "NAMED_PARAMETER", name: j.key, typeName: y(j.right) };
                  } else return y(j);
                }),
                new: null,
                returns: null,
              };
            return (
              v.this !== void 0 ? (O.this = y(v.this)) : u.arrow || (O.this = null),
              v.new !== void 0 && (O.new = y(v.new)),
              u.returnType !== void 0 && (O.returns = y(u.returnType)),
              O
            );
          },
          JsdocTypeGeneric: (u, y) => {
            let v = {
              type: "GENERIC",
              subject: y(u.left),
              objects: u.elements.map(y),
              meta: {
                syntax:
                  u.meta.brackets === "square"
                    ? "SQUARE_BRACKET"
                    : u.meta.dot
                      ? "ANGLE_BRACKET_WITH_DOT"
                      : "ANGLE_BRACKET",
              },
            };
            return (
              u.meta.brackets === "square" &&
                u.elements[0].type === "JsdocTypeFunction" &&
                !u.elements[0].parenthesis &&
                (v.objects[0] = { type: "NAME", name: "function" }),
              v
            );
          },
          JsdocTypeObjectField: (u, y) => {
            if (typeof u.key != "string") throw new Error("Index signatures and mapped types are not supported");
            if (u.right === void 0)
              return { type: "RECORD_ENTRY", key: u.key, quoteStyle: Et(u.meta.quote), value: null, readonly: !1 };
            let v = y(u.right);
            return (
              u.optional && (v = { type: "OPTIONAL", value: v, meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" } }),
              { type: "RECORD_ENTRY", key: u.key.toString(), quoteStyle: Et(u.meta.quote), value: v, readonly: !1 }
            );
          },
          JsdocTypeJsdocObjectField: () => {
            throw new Error("Keys may not be typed in jsdoctypeparser.");
          },
          JsdocTypeKeyValue: (u, y) => {
            if (u.right === void 0)
              return { type: "RECORD_ENTRY", key: u.key, quoteStyle: "none", value: null, readonly: !1 };
            let v = y(u.right);
            return (
              u.optional && (v = { type: "OPTIONAL", value: v, meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" } }),
              { type: "RECORD_ENTRY", key: u.key, quoteStyle: "none", value: v, readonly: !1 }
            );
          },
          JsdocTypeObject: (u, y) => {
            let v = [];
            for (let O of u.elements)
              (O.type === "JsdocTypeObjectField" || O.type === "JsdocTypeJsdocObjectField") && v.push(y(O));
            return { type: "RECORD", entries: v };
          },
          JsdocTypeSpecialNamePath: (u) => {
            if (u.specialType !== "module")
              throw new Error(`jsdoctypeparser does not support type ${u.specialType} at this point.`);
            return { type: "MODULE", value: { type: "FILE_PATH", quoteStyle: Et(u.meta.quote), path: u.value } };
          },
          JsdocTypeNamePath: (u, y) => {
            let v = !1,
              O,
              j;
            u.right.type === "JsdocTypeSpecialNamePath" && u.right.specialType === "event"
              ? ((v = !0), (O = u.right.value), (j = Et(u.right.meta.quote)))
              : ((O = u.right.value), (j = Et(u.right.meta.quote)));
            let q = { type: lp(u.pathType), owner: y(u.left), name: O, quoteStyle: j, hasEventPrefix: v };
            if (q.owner.type === "MODULE") {
              let W = q.owner;
              return (q.owner = q.owner.value), (W.value = q), W;
            } else return q;
          },
          JsdocTypeUnion: (u, y) => Tn("UNION", u.elements.map(y)),
          JsdocTypeParenthesis: (u, y) => ({ type: "PARENTHESIS", value: y(T(u.element)) }),
          JsdocTypeNull: () => ({ type: "NAME", name: "null" }),
          JsdocTypeUnknown: () => ({ type: "UNKNOWN" }),
          JsdocTypeStringValue: (u) => ({ type: "STRING_VALUE", quoteStyle: Et(u.meta.quote), string: u.value }),
          JsdocTypeIntersection: (u, y) => Tn("INTERSECTION", u.elements.map(y)),
          JsdocTypeNumber: (u) => ({ type: "NUMBER_VALUE", number: u.value.toString() }),
          JsdocTypeSymbol: Te,
          JsdocTypeProperty: Te,
          JsdocTypePredicate: Te,
          JsdocTypeMappedType: Te,
          JsdocTypeIndexSignature: Te,
          JsdocTypeAsserts: Te,
        };
        function cp(u) {
          return ar(up, u);
        }
        function dp() {
          return {
            JsdocTypeIntersection: (u, y) => ({ type: "JsdocTypeIntersection", elements: u.elements.map(y) }),
            JsdocTypeGeneric: (u, y) => ({
              type: "JsdocTypeGeneric",
              left: y(u.left),
              elements: u.elements.map(y),
              meta: { dot: u.meta.dot, brackets: u.meta.brackets },
            }),
            JsdocTypeNullable: (u) => u,
            JsdocTypeUnion: (u, y) => ({ type: "JsdocTypeUnion", elements: u.elements.map(y) }),
            JsdocTypeUnknown: (u) => u,
            JsdocTypeUndefined: (u) => u,
            JsdocTypeTypeof: (u, y) => ({ type: "JsdocTypeTypeof", element: y(u.element) }),
            JsdocTypeSymbol: (u, y) => {
              let v = { type: "JsdocTypeSymbol", value: u.value };
              return u.element !== void 0 && (v.element = y(u.element)), v;
            },
            JsdocTypeOptional: (u, y) => ({
              type: "JsdocTypeOptional",
              element: y(u.element),
              meta: { position: u.meta.position },
            }),
            JsdocTypeObject: (u, y) => ({
              type: "JsdocTypeObject",
              meta: { separator: "comma" },
              elements: u.elements.map(y),
            }),
            JsdocTypeNumber: (u) => u,
            JsdocTypeNull: (u) => u,
            JsdocTypeNotNullable: (u, y) => ({
              type: "JsdocTypeNotNullable",
              element: y(u.element),
              meta: { position: u.meta.position },
            }),
            JsdocTypeSpecialNamePath: (u) => u,
            JsdocTypeObjectField: (u, y) => ({
              type: "JsdocTypeObjectField",
              key: u.key,
              right: u.right === void 0 ? void 0 : y(u.right),
              optional: u.optional,
              readonly: u.readonly,
              meta: u.meta,
            }),
            JsdocTypeJsdocObjectField: (u, y) => ({
              type: "JsdocTypeJsdocObjectField",
              left: y(u.left),
              right: y(u.right),
            }),
            JsdocTypeKeyValue: (u, y) => ({
              type: "JsdocTypeKeyValue",
              key: u.key,
              right: u.right === void 0 ? void 0 : y(u.right),
              optional: u.optional,
              variadic: u.variadic,
            }),
            JsdocTypeImport: (u, y) => ({ type: "JsdocTypeImport", element: y(u.element) }),
            JsdocTypeAny: (u) => u,
            JsdocTypeStringValue: (u) => u,
            JsdocTypeNamePath: (u) => u,
            JsdocTypeVariadic: (u, y) => {
              let v = {
                type: "JsdocTypeVariadic",
                meta: { position: u.meta.position, squareBrackets: u.meta.squareBrackets },
              };
              return u.element !== void 0 && (v.element = y(u.element)), v;
            },
            JsdocTypeTuple: (u, y) => ({ type: "JsdocTypeTuple", elements: u.elements.map(y) }),
            JsdocTypeName: (u) => u,
            JsdocTypeFunction: (u, y) => {
              let v = {
                type: "JsdocTypeFunction",
                arrow: u.arrow,
                parameters: u.parameters.map(y),
                constructor: u.constructor,
                parenthesis: u.parenthesis,
              };
              return u.returnType !== void 0 && (v.returnType = y(u.returnType)), v;
            },
            JsdocTypeKeyof: (u, y) => ({ type: "JsdocTypeKeyof", element: y(u.element) }),
            JsdocTypeParenthesis: (u, y) => ({ type: "JsdocTypeParenthesis", element: y(u.element) }),
            JsdocTypeProperty: (u) => u,
            JsdocTypePredicate: (u, y) => ({ type: "JsdocTypePredicate", left: y(u.left), right: y(u.right) }),
            JsdocTypeIndexSignature: (u, y) => ({ type: "JsdocTypeIndexSignature", key: u.key, right: y(u.right) }),
            JsdocTypeMappedType: (u, y) => ({ type: "JsdocTypeMappedType", key: u.key, right: y(u.right) }),
            JsdocTypeAsserts: (u, y) => ({ type: "JsdocTypeAsserts", left: y(u.left), right: y(u.right) }),
          };
        }
        let Ma = {
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
        function Cn(u, y, v, O, j) {
          O?.(u, y, v);
          let q = Ma[u.type];
          for (let W of q) {
            let te = u[W];
            if (te !== void 0)
              if (Array.isArray(te)) for (let Ce of te) Cn(Ce, u, W, O, j);
              else Cn(te, u, W, O, j);
          }
          j?.(u, y, v);
        }
        function pp(u, y, v) {
          Cn(u, void 0, void 0, y, v);
        }
        (e.catharsisTransform = sp),
          (e.identityTransformRules = dp),
          (e.jtpTransform = cp),
          (e.parse = Ba),
          (e.stringify = op),
          (e.stringifyRules = La),
          (e.transform = ar),
          (e.traverse = pp),
          (e.tryParse = rp),
          (e.visitorKeys = Ma);
      });
    });
    var fc = {};
    qa(fc, { ColorControl: () => pc, default: () => Qy });
    function Ot() {
      return (Ot =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }).apply(this, arguments);
    }
    function ra(e, t) {
      if (e == null) return {};
      var r,
        n,
        o = {},
        a = Object.keys(e);
      for (n = 0; n < a.length; n++) t.indexOf((r = a[n])) >= 0 || (o[r] = e[r]);
      return o;
    }
    function Xo(e) {
      var t = Re(e),
        r = Re(function (n) {
          t.current && t.current(n);
        });
      return (t.current = e), r.current;
    }
    function lc(e, t, r) {
      var n = Xo(r),
        o = X(function () {
          return e.toHsva(t);
        }),
        a = o[0],
        i = o[1],
        l = Re({ color: t, hsva: a });
      Se(
        function () {
          if (!e.equal(t, l.current.color)) {
            var c = e.toHsva(t);
            (l.current = { hsva: c, color: t }), i(c);
          }
        },
        [t, e]
      ),
        Se(
          function () {
            var c;
            ic(a, l.current.hsva) ||
              e.equal((c = e.fromHsva(a)), l.current.color) ||
              ((l.current = { hsva: a, color: c }), n(c));
          },
          [a, e, n]
        );
      var s = xe(function (c) {
        i(function (d) {
          return Object.assign({}, d, c);
        });
      }, []);
      return [a, s];
    }
    var fy,
      ec,
      hy,
      my,
      Ue,
      Kt,
      Er,
      Qo,
      Ku,
      Yu,
      na,
      vr,
      oa,
      Ee,
      yy,
      gy,
      Zo,
      by,
      Ey,
      vy,
      xy,
      tc,
      ea,
      ln,
      rc,
      Sy,
      on,
      wy,
      nc,
      oc,
      ac,
      ic,
      sc,
      Ay,
      Ty,
      Cy,
      Xu,
      uc,
      ky,
      Iy,
      Oy,
      Dy,
      cc,
      Ry,
      _y,
      Py,
      Fy,
      Ny,
      By,
      jy,
      Ly,
      My,
      Uy,
      $y,
      Qu,
      qy,
      Vy,
      dc,
      an,
      Jy,
      zy,
      Hy,
      ta,
      Gy,
      Wy,
      sn,
      Zu,
      Wt,
      Ky,
      Yy,
      un,
      Xy,
      pc,
      Qy,
      hc = Qe(() => {
        V();
        J();
        z();
        In();
        Dr();
        _r();
        Qn();
        ro();
        (fy = je({
          "../../node_modules/color-name/index.js"(e, t) {
            t.exports = {
              aliceblue: [240, 248, 255],
              antiquewhite: [250, 235, 215],
              aqua: [0, 255, 255],
              aquamarine: [127, 255, 212],
              azure: [240, 255, 255],
              beige: [245, 245, 220],
              bisque: [255, 228, 196],
              black: [0, 0, 0],
              blanchedalmond: [255, 235, 205],
              blue: [0, 0, 255],
              blueviolet: [138, 43, 226],
              brown: [165, 42, 42],
              burlywood: [222, 184, 135],
              cadetblue: [95, 158, 160],
              chartreuse: [127, 255, 0],
              chocolate: [210, 105, 30],
              coral: [255, 127, 80],
              cornflowerblue: [100, 149, 237],
              cornsilk: [255, 248, 220],
              crimson: [220, 20, 60],
              cyan: [0, 255, 255],
              darkblue: [0, 0, 139],
              darkcyan: [0, 139, 139],
              darkgoldenrod: [184, 134, 11],
              darkgray: [169, 169, 169],
              darkgreen: [0, 100, 0],
              darkgrey: [169, 169, 169],
              darkkhaki: [189, 183, 107],
              darkmagenta: [139, 0, 139],
              darkolivegreen: [85, 107, 47],
              darkorange: [255, 140, 0],
              darkorchid: [153, 50, 204],
              darkred: [139, 0, 0],
              darksalmon: [233, 150, 122],
              darkseagreen: [143, 188, 143],
              darkslateblue: [72, 61, 139],
              darkslategray: [47, 79, 79],
              darkslategrey: [47, 79, 79],
              darkturquoise: [0, 206, 209],
              darkviolet: [148, 0, 211],
              deeppink: [255, 20, 147],
              deepskyblue: [0, 191, 255],
              dimgray: [105, 105, 105],
              dimgrey: [105, 105, 105],
              dodgerblue: [30, 144, 255],
              firebrick: [178, 34, 34],
              floralwhite: [255, 250, 240],
              forestgreen: [34, 139, 34],
              fuchsia: [255, 0, 255],
              gainsboro: [220, 220, 220],
              ghostwhite: [248, 248, 255],
              gold: [255, 215, 0],
              goldenrod: [218, 165, 32],
              gray: [128, 128, 128],
              green: [0, 128, 0],
              greenyellow: [173, 255, 47],
              grey: [128, 128, 128],
              honeydew: [240, 255, 240],
              hotpink: [255, 105, 180],
              indianred: [205, 92, 92],
              indigo: [75, 0, 130],
              ivory: [255, 255, 240],
              khaki: [240, 230, 140],
              lavender: [230, 230, 250],
              lavenderblush: [255, 240, 245],
              lawngreen: [124, 252, 0],
              lemonchiffon: [255, 250, 205],
              lightblue: [173, 216, 230],
              lightcoral: [240, 128, 128],
              lightcyan: [224, 255, 255],
              lightgoldenrodyellow: [250, 250, 210],
              lightgray: [211, 211, 211],
              lightgreen: [144, 238, 144],
              lightgrey: [211, 211, 211],
              lightpink: [255, 182, 193],
              lightsalmon: [255, 160, 122],
              lightseagreen: [32, 178, 170],
              lightskyblue: [135, 206, 250],
              lightslategray: [119, 136, 153],
              lightslategrey: [119, 136, 153],
              lightsteelblue: [176, 196, 222],
              lightyellow: [255, 255, 224],
              lime: [0, 255, 0],
              limegreen: [50, 205, 50],
              linen: [250, 240, 230],
              magenta: [255, 0, 255],
              maroon: [128, 0, 0],
              mediumaquamarine: [102, 205, 170],
              mediumblue: [0, 0, 205],
              mediumorchid: [186, 85, 211],
              mediumpurple: [147, 112, 219],
              mediumseagreen: [60, 179, 113],
              mediumslateblue: [123, 104, 238],
              mediumspringgreen: [0, 250, 154],
              mediumturquoise: [72, 209, 204],
              mediumvioletred: [199, 21, 133],
              midnightblue: [25, 25, 112],
              mintcream: [245, 255, 250],
              mistyrose: [255, 228, 225],
              moccasin: [255, 228, 181],
              navajowhite: [255, 222, 173],
              navy: [0, 0, 128],
              oldlace: [253, 245, 230],
              olive: [128, 128, 0],
              olivedrab: [107, 142, 35],
              orange: [255, 165, 0],
              orangered: [255, 69, 0],
              orchid: [218, 112, 214],
              palegoldenrod: [238, 232, 170],
              palegreen: [152, 251, 152],
              paleturquoise: [175, 238, 238],
              palevioletred: [219, 112, 147],
              papayawhip: [255, 239, 213],
              peachpuff: [255, 218, 185],
              peru: [205, 133, 63],
              pink: [255, 192, 203],
              plum: [221, 160, 221],
              powderblue: [176, 224, 230],
              purple: [128, 0, 128],
              rebeccapurple: [102, 51, 153],
              red: [255, 0, 0],
              rosybrown: [188, 143, 143],
              royalblue: [65, 105, 225],
              saddlebrown: [139, 69, 19],
              salmon: [250, 128, 114],
              sandybrown: [244, 164, 96],
              seagreen: [46, 139, 87],
              seashell: [255, 245, 238],
              sienna: [160, 82, 45],
              silver: [192, 192, 192],
              skyblue: [135, 206, 235],
              slateblue: [106, 90, 205],
              slategray: [112, 128, 144],
              slategrey: [112, 128, 144],
              snow: [255, 250, 250],
              springgreen: [0, 255, 127],
              steelblue: [70, 130, 180],
              tan: [210, 180, 140],
              teal: [0, 128, 128],
              thistle: [216, 191, 216],
              tomato: [255, 99, 71],
              turquoise: [64, 224, 208],
              violet: [238, 130, 238],
              wheat: [245, 222, 179],
              white: [255, 255, 255],
              whitesmoke: [245, 245, 245],
              yellow: [255, 255, 0],
              yellowgreen: [154, 205, 50],
            };
          },
        })),
          (ec = je({
            "../../node_modules/color-convert/conversions.js"(e, t) {
              var r = fy(),
                n = {};
              for (let i of Object.keys(r)) n[r[i]] = i;
              var o = {
                rgb: { channels: 3, labels: "rgb" },
                hsl: { channels: 3, labels: "hsl" },
                hsv: { channels: 3, labels: "hsv" },
                hwb: { channels: 3, labels: "hwb" },
                cmyk: { channels: 4, labels: "cmyk" },
                xyz: { channels: 3, labels: "xyz" },
                lab: { channels: 3, labels: "lab" },
                lch: { channels: 3, labels: "lch" },
                hex: { channels: 1, labels: ["hex"] },
                keyword: { channels: 1, labels: ["keyword"] },
                ansi16: { channels: 1, labels: ["ansi16"] },
                ansi256: { channels: 1, labels: ["ansi256"] },
                hcg: { channels: 3, labels: ["h", "c", "g"] },
                apple: { channels: 3, labels: ["r16", "g16", "b16"] },
                gray: { channels: 1, labels: ["gray"] },
              };
              t.exports = o;
              for (let i of Object.keys(o)) {
                if (!("channels" in o[i])) throw new Error("missing channels property: " + i);
                if (!("labels" in o[i])) throw new Error("missing channel labels property: " + i);
                if (o[i].labels.length !== o[i].channels) throw new Error("channel and label counts mismatch: " + i);
                let { channels: l, labels: s } = o[i];
                delete o[i].channels,
                  delete o[i].labels,
                  Object.defineProperty(o[i], "channels", { value: l }),
                  Object.defineProperty(o[i], "labels", { value: s });
              }
              (o.rgb.hsl = function (i) {
                let l = i[0] / 255,
                  s = i[1] / 255,
                  c = i[2] / 255,
                  d = Math.min(l, s, c),
                  p = Math.max(l, s, c),
                  h = p - d,
                  f,
                  b;
                p === d
                  ? (f = 0)
                  : l === p
                    ? (f = (s - c) / h)
                    : s === p
                      ? (f = 2 + (c - l) / h)
                      : c === p && (f = 4 + (l - s) / h),
                  (f = Math.min(f * 60, 360)),
                  f < 0 && (f += 360);
                let g = (d + p) / 2;
                return p === d ? (b = 0) : g <= 0.5 ? (b = h / (p + d)) : (b = h / (2 - p - d)), [f, b * 100, g * 100];
              }),
                (o.rgb.hsv = function (i) {
                  let l,
                    s,
                    c,
                    d,
                    p,
                    h = i[0] / 255,
                    f = i[1] / 255,
                    b = i[2] / 255,
                    g = Math.max(h, f, b),
                    x = g - Math.min(h, f, b),
                    S = function (A) {
                      return (g - A) / 6 / x + 1 / 2;
                    };
                  return (
                    x === 0
                      ? ((d = 0), (p = 0))
                      : ((p = x / g),
                        (l = S(h)),
                        (s = S(f)),
                        (c = S(b)),
                        h === g ? (d = c - s) : f === g ? (d = 1 / 3 + l - c) : b === g && (d = 2 / 3 + s - l),
                        d < 0 ? (d += 1) : d > 1 && (d -= 1)),
                    [d * 360, p * 100, g * 100]
                  );
                }),
                (o.rgb.hwb = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = i[2],
                    d = o.rgb.hsl(i)[0],
                    p = (1 / 255) * Math.min(l, Math.min(s, c));
                  return (c = 1 - (1 / 255) * Math.max(l, Math.max(s, c))), [d, p * 100, c * 100];
                }),
                (o.rgb.cmyk = function (i) {
                  let l = i[0] / 255,
                    s = i[1] / 255,
                    c = i[2] / 255,
                    d = Math.min(1 - l, 1 - s, 1 - c),
                    p = (1 - l - d) / (1 - d) || 0,
                    h = (1 - s - d) / (1 - d) || 0,
                    f = (1 - c - d) / (1 - d) || 0;
                  return [p * 100, h * 100, f * 100, d * 100];
                });
              function a(i, l) {
                return (i[0] - l[0]) ** 2 + (i[1] - l[1]) ** 2 + (i[2] - l[2]) ** 2;
              }
              (o.rgb.keyword = function (i) {
                let l = n[i];
                if (l) return l;
                let s = 1 / 0,
                  c;
                for (let d of Object.keys(r)) {
                  let p = r[d],
                    h = a(i, p);
                  h < s && ((s = h), (c = d));
                }
                return c;
              }),
                (o.keyword.rgb = function (i) {
                  return r[i];
                }),
                (o.rgb.xyz = function (i) {
                  let l = i[0] / 255,
                    s = i[1] / 255,
                    c = i[2] / 255;
                  (l = l > 0.04045 ? ((l + 0.055) / 1.055) ** 2.4 : l / 12.92),
                    (s = s > 0.04045 ? ((s + 0.055) / 1.055) ** 2.4 : s / 12.92),
                    (c = c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92);
                  let d = l * 0.4124 + s * 0.3576 + c * 0.1805,
                    p = l * 0.2126 + s * 0.7152 + c * 0.0722,
                    h = l * 0.0193 + s * 0.1192 + c * 0.9505;
                  return [d * 100, p * 100, h * 100];
                }),
                (o.rgb.lab = function (i) {
                  let l = o.rgb.xyz(i),
                    s = l[0],
                    c = l[1],
                    d = l[2];
                  (s /= 95.047),
                    (c /= 100),
                    (d /= 108.883),
                    (s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116),
                    (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116),
                    (d = d > 0.008856 ? d ** (1 / 3) : 7.787 * d + 16 / 116);
                  let p = 116 * c - 16,
                    h = 500 * (s - c),
                    f = 200 * (c - d);
                  return [p, h, f];
                }),
                (o.hsl.rgb = function (i) {
                  let l = i[0] / 360,
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d,
                    p,
                    h;
                  if (s === 0) return (h = c * 255), [h, h, h];
                  c < 0.5 ? (d = c * (1 + s)) : (d = c + s - c * s);
                  let f = 2 * c - d,
                    b = [0, 0, 0];
                  for (let g = 0; g < 3; g++)
                    (p = l + (1 / 3) * -(g - 1)),
                      p < 0 && p++,
                      p > 1 && p--,
                      6 * p < 1
                        ? (h = f + (d - f) * 6 * p)
                        : 2 * p < 1
                          ? (h = d)
                          : 3 * p < 2
                            ? (h = f + (d - f) * (2 / 3 - p) * 6)
                            : (h = f),
                      (b[g] = h * 255);
                  return b;
                }),
                (o.hsl.hsv = function (i) {
                  let l = i[0],
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d = s,
                    p = Math.max(c, 0.01);
                  (c *= 2), (s *= c <= 1 ? c : 2 - c), (d *= p <= 1 ? p : 2 - p);
                  let h = (c + s) / 2,
                    f = c === 0 ? (2 * d) / (p + d) : (2 * s) / (c + s);
                  return [l, f * 100, h * 100];
                }),
                (o.hsv.rgb = function (i) {
                  let l = i[0] / 60,
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d = Math.floor(l) % 6,
                    p = l - Math.floor(l),
                    h = 255 * c * (1 - s),
                    f = 255 * c * (1 - s * p),
                    b = 255 * c * (1 - s * (1 - p));
                  switch (((c *= 255), d)) {
                    case 0:
                      return [c, b, h];
                    case 1:
                      return [f, c, h];
                    case 2:
                      return [h, c, b];
                    case 3:
                      return [h, f, c];
                    case 4:
                      return [b, h, c];
                    case 5:
                      return [c, h, f];
                  }
                }),
                (o.hsv.hsl = function (i) {
                  let l = i[0],
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d = Math.max(c, 0.01),
                    p,
                    h;
                  h = (2 - s) * c;
                  let f = (2 - s) * d;
                  return (p = s * d), (p /= f <= 1 ? f : 2 - f), (p = p || 0), (h /= 2), [l, p * 100, h * 100];
                }),
                (o.hwb.rgb = function (i) {
                  let l = i[0] / 360,
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d = s + c,
                    p;
                  d > 1 && ((s /= d), (c /= d));
                  let h = Math.floor(6 * l),
                    f = 1 - c;
                  (p = 6 * l - h), h & 1 && (p = 1 - p);
                  let b = s + p * (f - s),
                    g,
                    x,
                    S;
                  switch (h) {
                    default:
                    case 6:
                    case 0:
                      (g = f), (x = b), (S = s);
                      break;
                    case 1:
                      (g = b), (x = f), (S = s);
                      break;
                    case 2:
                      (g = s), (x = f), (S = b);
                      break;
                    case 3:
                      (g = s), (x = b), (S = f);
                      break;
                    case 4:
                      (g = b), (x = s), (S = f);
                      break;
                    case 5:
                      (g = f), (x = s), (S = b);
                      break;
                  }
                  return [g * 255, x * 255, S * 255];
                }),
                (o.cmyk.rgb = function (i) {
                  let l = i[0] / 100,
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d = i[3] / 100,
                    p = 1 - Math.min(1, l * (1 - d) + d),
                    h = 1 - Math.min(1, s * (1 - d) + d),
                    f = 1 - Math.min(1, c * (1 - d) + d);
                  return [p * 255, h * 255, f * 255];
                }),
                (o.xyz.rgb = function (i) {
                  let l = i[0] / 100,
                    s = i[1] / 100,
                    c = i[2] / 100,
                    d,
                    p,
                    h;
                  return (
                    (d = l * 3.2406 + s * -1.5372 + c * -0.4986),
                    (p = l * -0.9689 + s * 1.8758 + c * 0.0415),
                    (h = l * 0.0557 + s * -0.204 + c * 1.057),
                    (d = d > 0.0031308 ? 1.055 * d ** (1 / 2.4) - 0.055 : d * 12.92),
                    (p = p > 0.0031308 ? 1.055 * p ** (1 / 2.4) - 0.055 : p * 12.92),
                    (h = h > 0.0031308 ? 1.055 * h ** (1 / 2.4) - 0.055 : h * 12.92),
                    (d = Math.min(Math.max(0, d), 1)),
                    (p = Math.min(Math.max(0, p), 1)),
                    (h = Math.min(Math.max(0, h), 1)),
                    [d * 255, p * 255, h * 255]
                  );
                }),
                (o.xyz.lab = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = i[2];
                  (l /= 95.047),
                    (s /= 100),
                    (c /= 108.883),
                    (l = l > 0.008856 ? l ** (1 / 3) : 7.787 * l + 16 / 116),
                    (s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116),
                    (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116);
                  let d = 116 * s - 16,
                    p = 500 * (l - s),
                    h = 200 * (s - c);
                  return [d, p, h];
                }),
                (o.lab.xyz = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = i[2],
                    d,
                    p,
                    h;
                  (p = (l + 16) / 116), (d = s / 500 + p), (h = p - c / 200);
                  let f = p ** 3,
                    b = d ** 3,
                    g = h ** 3;
                  return (
                    (p = f > 0.008856 ? f : (p - 16 / 116) / 7.787),
                    (d = b > 0.008856 ? b : (d - 16 / 116) / 7.787),
                    (h = g > 0.008856 ? g : (h - 16 / 116) / 7.787),
                    (d *= 95.047),
                    (p *= 100),
                    (h *= 108.883),
                    [d, p, h]
                  );
                }),
                (o.lab.lch = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = i[2],
                    d;
                  (d = (Math.atan2(c, s) * 360) / 2 / Math.PI), d < 0 && (d += 360);
                  let p = Math.sqrt(s * s + c * c);
                  return [l, p, d];
                }),
                (o.lch.lab = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = (i[2] / 360) * 2 * Math.PI,
                    d = s * Math.cos(c),
                    p = s * Math.sin(c);
                  return [l, d, p];
                }),
                (o.rgb.ansi16 = function (i, l = null) {
                  let [s, c, d] = i,
                    p = l === null ? o.rgb.hsv(i)[2] : l;
                  if (((p = Math.round(p / 50)), p === 0)) return 30;
                  let h = 30 + ((Math.round(d / 255) << 2) | (Math.round(c / 255) << 1) | Math.round(s / 255));
                  return p === 2 && (h += 60), h;
                }),
                (o.hsv.ansi16 = function (i) {
                  return o.rgb.ansi16(o.hsv.rgb(i), i[2]);
                }),
                (o.rgb.ansi256 = function (i) {
                  let l = i[0],
                    s = i[1],
                    c = i[2];
                  return l === s && s === c
                    ? l < 8
                      ? 16
                      : l > 248
                        ? 231
                        : Math.round(((l - 8) / 247) * 24) + 232
                    : 16 + 36 * Math.round((l / 255) * 5) + 6 * Math.round((s / 255) * 5) + Math.round((c / 255) * 5);
                }),
                (o.ansi16.rgb = function (i) {
                  let l = i % 10;
                  if (l === 0 || l === 7) return i > 50 && (l += 3.5), (l = (l / 10.5) * 255), [l, l, l];
                  let s = (~~(i > 50) + 1) * 0.5,
                    c = (l & 1) * s * 255,
                    d = ((l >> 1) & 1) * s * 255,
                    p = ((l >> 2) & 1) * s * 255;
                  return [c, d, p];
                }),
                (o.ansi256.rgb = function (i) {
                  if (i >= 232) {
                    let p = (i - 232) * 10 + 8;
                    return [p, p, p];
                  }
                  i -= 16;
                  let l,
                    s = (Math.floor(i / 36) / 5) * 255,
                    c = (Math.floor((l = i % 36) / 6) / 5) * 255,
                    d = ((l % 6) / 5) * 255;
                  return [s, c, d];
                }),
                (o.rgb.hex = function (i) {
                  let l = (
                    ((Math.round(i[0]) & 255) << 16) +
                    ((Math.round(i[1]) & 255) << 8) +
                    (Math.round(i[2]) & 255)
                  )
                    .toString(16)
                    .toUpperCase();
                  return "000000".substring(l.length) + l;
                }),
                (o.hex.rgb = function (i) {
                  let l = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                  if (!l) return [0, 0, 0];
                  let s = l[0];
                  l[0].length === 3 &&
                    (s = s
                      .split("")
                      .map((f) => f + f)
                      .join(""));
                  let c = parseInt(s, 16),
                    d = (c >> 16) & 255,
                    p = (c >> 8) & 255,
                    h = c & 255;
                  return [d, p, h];
                }),
                (o.rgb.hcg = function (i) {
                  let l = i[0] / 255,
                    s = i[1] / 255,
                    c = i[2] / 255,
                    d = Math.max(Math.max(l, s), c),
                    p = Math.min(Math.min(l, s), c),
                    h = d - p,
                    f,
                    b;
                  return (
                    h < 1 ? (f = p / (1 - h)) : (f = 0),
                    h <= 0
                      ? (b = 0)
                      : d === l
                        ? (b = ((s - c) / h) % 6)
                        : d === s
                          ? (b = 2 + (c - l) / h)
                          : (b = 4 + (l - s) / h),
                    (b /= 6),
                    (b %= 1),
                    [b * 360, h * 100, f * 100]
                  );
                }),
                (o.hsl.hcg = function (i) {
                  let l = i[1] / 100,
                    s = i[2] / 100,
                    c = s < 0.5 ? 2 * l * s : 2 * l * (1 - s),
                    d = 0;
                  return c < 1 && (d = (s - 0.5 * c) / (1 - c)), [i[0], c * 100, d * 100];
                }),
                (o.hsv.hcg = function (i) {
                  let l = i[1] / 100,
                    s = i[2] / 100,
                    c = l * s,
                    d = 0;
                  return c < 1 && (d = (s - c) / (1 - c)), [i[0], c * 100, d * 100];
                }),
                (o.hcg.rgb = function (i) {
                  let l = i[0] / 360,
                    s = i[1] / 100,
                    c = i[2] / 100;
                  if (s === 0) return [c * 255, c * 255, c * 255];
                  let d = [0, 0, 0],
                    p = (l % 1) * 6,
                    h = p % 1,
                    f = 1 - h,
                    b = 0;
                  switch (Math.floor(p)) {
                    case 0:
                      (d[0] = 1), (d[1] = h), (d[2] = 0);
                      break;
                    case 1:
                      (d[0] = f), (d[1] = 1), (d[2] = 0);
                      break;
                    case 2:
                      (d[0] = 0), (d[1] = 1), (d[2] = h);
                      break;
                    case 3:
                      (d[0] = 0), (d[1] = f), (d[2] = 1);
                      break;
                    case 4:
                      (d[0] = h), (d[1] = 0), (d[2] = 1);
                      break;
                    default:
                      (d[0] = 1), (d[1] = 0), (d[2] = f);
                  }
                  return (b = (1 - s) * c), [(s * d[0] + b) * 255, (s * d[1] + b) * 255, (s * d[2] + b) * 255];
                }),
                (o.hcg.hsv = function (i) {
                  let l = i[1] / 100,
                    s = i[2] / 100,
                    c = l + s * (1 - l),
                    d = 0;
                  return c > 0 && (d = l / c), [i[0], d * 100, c * 100];
                }),
                (o.hcg.hsl = function (i) {
                  let l = i[1] / 100,
                    s = (i[2] / 100) * (1 - l) + 0.5 * l,
                    c = 0;
                  return (
                    s > 0 && s < 0.5 ? (c = l / (2 * s)) : s >= 0.5 && s < 1 && (c = l / (2 * (1 - s))),
                    [i[0], c * 100, s * 100]
                  );
                }),
                (o.hcg.hwb = function (i) {
                  let l = i[1] / 100,
                    s = i[2] / 100,
                    c = l + s * (1 - l);
                  return [i[0], (c - l) * 100, (1 - c) * 100];
                }),
                (o.hwb.hcg = function (i) {
                  let l = i[1] / 100,
                    s = 1 - i[2] / 100,
                    c = s - l,
                    d = 0;
                  return c < 1 && (d = (s - c) / (1 - c)), [i[0], c * 100, d * 100];
                }),
                (o.apple.rgb = function (i) {
                  return [(i[0] / 65535) * 255, (i[1] / 65535) * 255, (i[2] / 65535) * 255];
                }),
                (o.rgb.apple = function (i) {
                  return [(i[0] / 255) * 65535, (i[1] / 255) * 65535, (i[2] / 255) * 65535];
                }),
                (o.gray.rgb = function (i) {
                  return [(i[0] / 100) * 255, (i[0] / 100) * 255, (i[0] / 100) * 255];
                }),
                (o.gray.hsl = function (i) {
                  return [0, 0, i[0]];
                }),
                (o.gray.hsv = o.gray.hsl),
                (o.gray.hwb = function (i) {
                  return [0, 100, i[0]];
                }),
                (o.gray.cmyk = function (i) {
                  return [0, 0, 0, i[0]];
                }),
                (o.gray.lab = function (i) {
                  return [i[0], 0, 0];
                }),
                (o.gray.hex = function (i) {
                  let l = Math.round((i[0] / 100) * 255) & 255,
                    s = ((l << 16) + (l << 8) + l).toString(16).toUpperCase();
                  return "000000".substring(s.length) + s;
                }),
                (o.rgb.gray = function (i) {
                  return [((i[0] + i[1] + i[2]) / 3 / 255) * 100];
                });
            },
          })),
          (hy = je({
            "../../node_modules/color-convert/route.js"(e, t) {
              var r = ec();
              function n() {
                let l = {},
                  s = Object.keys(r);
                for (let c = s.length, d = 0; d < c; d++) l[s[d]] = { distance: -1, parent: null };
                return l;
              }
              function o(l) {
                let s = n(),
                  c = [l];
                for (s[l].distance = 0; c.length; ) {
                  let d = c.pop(),
                    p = Object.keys(r[d]);
                  for (let h = p.length, f = 0; f < h; f++) {
                    let b = p[f],
                      g = s[b];
                    g.distance === -1 && ((g.distance = s[d].distance + 1), (g.parent = d), c.unshift(b));
                  }
                }
                return s;
              }
              function a(l, s) {
                return function (c) {
                  return s(l(c));
                };
              }
              function i(l, s) {
                let c = [s[l].parent, l],
                  d = r[s[l].parent][l],
                  p = s[l].parent;
                for (; s[p].parent; ) c.unshift(s[p].parent), (d = a(r[s[p].parent][p], d)), (p = s[p].parent);
                return (d.conversion = c), d;
              }
              t.exports = function (l) {
                let s = o(l),
                  c = {},
                  d = Object.keys(s);
                for (let p = d.length, h = 0; h < p; h++) {
                  let f = d[h];
                  s[f].parent !== null && (c[f] = i(f, s));
                }
                return c;
              };
            },
          })),
          (my = je({
            "../../node_modules/color-convert/index.js"(e, t) {
              var r = ec(),
                n = hy(),
                o = {},
                a = Object.keys(r);
              function i(s) {
                let c = function (...d) {
                  let p = d[0];
                  return p == null ? p : (p.length > 1 && (d = p), s(d));
                };
                return "conversion" in s && (c.conversion = s.conversion), c;
              }
              function l(s) {
                let c = function (...d) {
                  let p = d[0];
                  if (p == null) return p;
                  p.length > 1 && (d = p);
                  let h = s(d);
                  if (typeof h == "object") for (let f = h.length, b = 0; b < f; b++) h[b] = Math.round(h[b]);
                  return h;
                };
                return "conversion" in s && (c.conversion = s.conversion), c;
              }
              a.forEach((s) => {
                (o[s] = {}),
                  Object.defineProperty(o[s], "channels", { value: r[s].channels }),
                  Object.defineProperty(o[s], "labels", { value: r[s].labels });
                let c = n(s);
                Object.keys(c).forEach((d) => {
                  let p = c[d];
                  (o[s][d] = l(p)), (o[s][d].raw = i(p));
                });
              }),
                (t.exports = o);
            },
          })),
          (Ue = Lt(my()));
        (Kt = function (e, t, r) {
          return t === void 0 && (t = 0), r === void 0 && (r = 1), e > r ? r : e < t ? t : e;
        }),
          (Er = function (e) {
            return "touches" in e;
          }),
          (Qo = function (e) {
            return (e && e.ownerDocument.defaultView) || self;
          }),
          (Ku = function (e, t, r) {
            var n = e.getBoundingClientRect(),
              o = Er(t)
                ? (function (a, i) {
                    for (var l = 0; l < a.length; l++) if (a[l].identifier === i) return a[l];
                    return a[0];
                  })(t.touches, r)
                : t;
            return {
              left: Kt((o.pageX - (n.left + Qo(e).pageXOffset)) / n.width),
              top: Kt((o.pageY - (n.top + Qo(e).pageYOffset)) / n.height),
            };
          }),
          (Yu = function (e) {
            !Er(e) && e.preventDefault();
          }),
          (na = m.memo(function (e) {
            var t = e.onMove,
              r = e.onKey,
              n = ra(e, ["onMove", "onKey"]),
              o = Re(null),
              a = Xo(t),
              i = Xo(r),
              l = Re(null),
              s = Re(!1),
              c = st(
                function () {
                  var f = function (x) {
                      Yu(x),
                        (Er(x) ? x.touches.length > 0 : x.buttons > 0) && o.current
                          ? a(Ku(o.current, x, l.current))
                          : g(!1);
                    },
                    b = function () {
                      return g(!1);
                    };
                  function g(x) {
                    var S = s.current,
                      A = Qo(o.current),
                      k = x ? A.addEventListener : A.removeEventListener;
                    k(S ? "touchmove" : "mousemove", f), k(S ? "touchend" : "mouseup", b);
                  }
                  return [
                    function (x) {
                      var S = x.nativeEvent,
                        A = o.current;
                      if (
                        A &&
                        (Yu(S),
                        !(function (T, I) {
                          return I && !Er(T);
                        })(S, s.current) && A)
                      ) {
                        if (Er(S)) {
                          s.current = !0;
                          var k = S.changedTouches || [];
                          k.length && (l.current = k[0].identifier);
                        }
                        A.focus(), a(Ku(A, S, l.current)), g(!0);
                      }
                    },
                    function (x) {
                      var S = x.which || x.keyCode;
                      S < 37 ||
                        S > 40 ||
                        (x.preventDefault(),
                        i({
                          left: S === 39 ? 0.05 : S === 37 ? -0.05 : 0,
                          top: S === 40 ? 0.05 : S === 38 ? -0.05 : 0,
                        }));
                    },
                    g,
                  ];
                },
                [i, a]
              ),
              d = c[0],
              p = c[1],
              h = c[2];
            return (
              Se(
                function () {
                  return h;
                },
                [h]
              ),
              m.createElement(
                "div",
                Ot({}, n, {
                  onTouchStart: d,
                  onMouseDown: d,
                  className: "react-colorful__interactive",
                  ref: o,
                  onKeyDown: p,
                  tabIndex: 0,
                  role: "slider",
                })
              )
            );
          })),
          (vr = function (e) {
            return e.filter(Boolean).join(" ");
          }),
          (oa = function (e) {
            var t = e.color,
              r = e.left,
              n = e.top,
              o = n === void 0 ? 0.5 : n,
              a = vr(["react-colorful__pointer", e.className]);
            return m.createElement(
              "div",
              { className: a, style: { top: 100 * o + "%", left: 100 * r + "%" } },
              m.createElement("div", { className: "react-colorful__pointer-fill", style: { backgroundColor: t } })
            );
          }),
          (Ee = function (e, t, r) {
            return t === void 0 && (t = 0), r === void 0 && (r = Math.pow(10, t)), Math.round(r * e) / r;
          }),
          (yy = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }),
          (gy = function (e) {
            return nc(Zo(e));
          }),
          (Zo = function (e) {
            return (
              e[0] === "#" && (e = e.substring(1)),
              e.length < 6
                ? {
                    r: parseInt(e[0] + e[0], 16),
                    g: parseInt(e[1] + e[1], 16),
                    b: parseInt(e[2] + e[2], 16),
                    a: e.length === 4 ? Ee(parseInt(e[3] + e[3], 16) / 255, 2) : 1,
                  }
                : {
                    r: parseInt(e.substring(0, 2), 16),
                    g: parseInt(e.substring(2, 4), 16),
                    b: parseInt(e.substring(4, 6), 16),
                    a: e.length === 8 ? Ee(parseInt(e.substring(6, 8), 16) / 255, 2) : 1,
                  }
            );
          }),
          (by = function (e, t) {
            return t === void 0 && (t = "deg"), Number(e) * (yy[t] || 1);
          }),
          (Ey = function (e) {
            var t =
              /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
                e
              );
            return t
              ? vy({
                  h: by(t[1], t[2]),
                  s: Number(t[3]),
                  l: Number(t[4]),
                  a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
                })
              : { h: 0, s: 0, v: 0, a: 1 };
          }),
          (vy = function (e) {
            var t = e.s,
              r = e.l;
            return {
              h: e.h,
              s: (t *= (r < 50 ? r : 100 - r) / 100) > 0 ? ((2 * t) / (r + t)) * 100 : 0,
              v: r + t,
              a: e.a,
            };
          }),
          (xy = function (e) {
            return wy(rc(e));
          }),
          (tc = function (e) {
            var t = e.s,
              r = e.v,
              n = e.a,
              o = ((200 - t) * r) / 100;
            return {
              h: Ee(e.h),
              s: Ee(o > 0 && o < 200 ? ((t * r) / 100 / (o <= 100 ? o : 200 - o)) * 100 : 0),
              l: Ee(o / 2),
              a: Ee(n, 2),
            };
          }),
          (ea = function (e) {
            var t = tc(e);
            return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
          }),
          (ln = function (e) {
            var t = tc(e);
            return "hsla(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
          }),
          (rc = function (e) {
            var t = e.h,
              r = e.s,
              n = e.v,
              o = e.a;
            (t = (t / 360) * 6), (r /= 100), (n /= 100);
            var a = Math.floor(t),
              i = n * (1 - r),
              l = n * (1 - (t - a) * r),
              s = n * (1 - (1 - t + a) * r),
              c = a % 6;
            return {
              r: Ee(255 * [n, l, i, i, s, n][c]),
              g: Ee(255 * [s, n, n, l, i, i][c]),
              b: Ee(255 * [i, i, s, n, n, l][c]),
              a: Ee(o, 2),
            };
          }),
          (Sy = function (e) {
            var t =
              /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
                e
              );
            return t
              ? nc({
                  r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                  g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                  b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                  a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1),
                })
              : { h: 0, s: 0, v: 0, a: 1 };
          }),
          (on = function (e) {
            var t = e.toString(16);
            return t.length < 2 ? "0" + t : t;
          }),
          (wy = function (e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a,
              a = o < 1 ? on(Ee(255 * o)) : "";
            return "#" + on(t) + on(r) + on(n) + a;
          }),
          (nc = function (e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a,
              a = Math.max(t, r, n),
              i = a - Math.min(t, r, n),
              l = i ? (a === t ? (r - n) / i : a === r ? 2 + (n - t) / i : 4 + (t - r) / i) : 0;
            return { h: Ee(60 * (l < 0 ? l + 6 : l)), s: Ee(a ? (i / a) * 100 : 0), v: Ee((a / 255) * 100), a: o };
          }),
          (oc = m.memo(function (e) {
            var t = e.hue,
              r = e.onChange,
              n = vr(["react-colorful__hue", e.className]);
            return m.createElement(
              "div",
              { className: n },
              m.createElement(
                na,
                {
                  onMove: function (o) {
                    r({ h: 360 * o.left });
                  },
                  onKey: function (o) {
                    r({ h: Kt(t + 360 * o.left, 0, 360) });
                  },
                  "aria-label": "Hue",
                  "aria-valuenow": Ee(t),
                  "aria-valuemax": "360",
                  "aria-valuemin": "0",
                },
                m.createElement(oa, {
                  className: "react-colorful__hue-pointer",
                  left: t / 360,
                  color: ea({ h: t, s: 100, v: 100, a: 1 }),
                })
              )
            );
          })),
          (ac = m.memo(function (e) {
            var t = e.hsva,
              r = e.onChange,
              n = { backgroundColor: ea({ h: t.h, s: 100, v: 100, a: 1 }) };
            return m.createElement(
              "div",
              { className: "react-colorful__saturation", style: n },
              m.createElement(
                na,
                {
                  onMove: function (o) {
                    r({ s: 100 * o.left, v: 100 - 100 * o.top });
                  },
                  onKey: function (o) {
                    r({ s: Kt(t.s + 100 * o.left, 0, 100), v: Kt(t.v - 100 * o.top, 0, 100) });
                  },
                  "aria-label": "Color",
                  "aria-valuetext": "Saturation " + Ee(t.s) + "%, Brightness " + Ee(t.v) + "%",
                },
                m.createElement(oa, {
                  className: "react-colorful__saturation-pointer",
                  top: 1 - t.v / 100,
                  left: t.s / 100,
                  color: ea(t),
                })
              )
            );
          })),
          (ic = function (e, t) {
            if (e === t) return !0;
            for (var r in e) if (e[r] !== t[r]) return !1;
            return !0;
          }),
          (sc = function (e, t) {
            return e.replace(/\s/g, "") === t.replace(/\s/g, "");
          }),
          (Ay = function (e, t) {
            return e.toLowerCase() === t.toLowerCase() || ic(Zo(e), Zo(t));
          });
        (Ty = typeof window < "u" ? ei : Se),
          (Cy = function () {
            return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
          }),
          (Xu = new Map()),
          (uc = function (e) {
            Ty(function () {
              var t = e.current ? e.current.ownerDocument : document;
              if (t !== void 0 && !Xu.has(t)) {
                var r = t.createElement("style");
                (r.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`),
                  Xu.set(t, r);
                var n = Cy();
                n && r.setAttribute("nonce", n), t.head.appendChild(r);
              }
            }, []);
          }),
          (ky = function (e) {
            var t = e.className,
              r = e.colorModel,
              n = e.color,
              o = n === void 0 ? r.defaultColor : n,
              a = e.onChange,
              i = ra(e, ["className", "colorModel", "color", "onChange"]),
              l = Re(null);
            uc(l);
            var s = lc(r, o, a),
              c = s[0],
              d = s[1],
              p = vr(["react-colorful", t]);
            return m.createElement(
              "div",
              Ot({}, i, { ref: l, className: p }),
              m.createElement(ac, { hsva: c, onChange: d }),
              m.createElement(oc, { hue: c.h, onChange: d, className: "react-colorful__last-control" })
            );
          }),
          (Iy = {
            defaultColor: "000",
            toHsva: gy,
            fromHsva: function (e) {
              return xy({ h: e.h, s: e.s, v: e.v, a: 1 });
            },
            equal: Ay,
          }),
          (Oy = function (e) {
            return m.createElement(ky, Ot({}, e, { colorModel: Iy }));
          }),
          (Dy = function (e) {
            var t = e.className,
              r = e.hsva,
              n = e.onChange,
              o = {
                backgroundImage:
                  "linear-gradient(90deg, " +
                  ln(Object.assign({}, r, { a: 0 })) +
                  ", " +
                  ln(Object.assign({}, r, { a: 1 })) +
                  ")",
              },
              a = vr(["react-colorful__alpha", t]),
              i = Ee(100 * r.a);
            return m.createElement(
              "div",
              { className: a },
              m.createElement("div", { className: "react-colorful__alpha-gradient", style: o }),
              m.createElement(
                na,
                {
                  onMove: function (l) {
                    n({ a: l.left });
                  },
                  onKey: function (l) {
                    n({ a: Kt(r.a + l.left) });
                  },
                  "aria-label": "Alpha",
                  "aria-valuetext": i + "%",
                  "aria-valuenow": i,
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                },
                m.createElement(oa, { className: "react-colorful__alpha-pointer", left: r.a, color: ln(r) })
              )
            );
          }),
          (cc = function (e) {
            var t = e.className,
              r = e.colorModel,
              n = e.color,
              o = n === void 0 ? r.defaultColor : n,
              a = e.onChange,
              i = ra(e, ["className", "colorModel", "color", "onChange"]),
              l = Re(null);
            uc(l);
            var s = lc(r, o, a),
              c = s[0],
              d = s[1],
              p = vr(["react-colorful", t]);
            return m.createElement(
              "div",
              Ot({}, i, { ref: l, className: p }),
              m.createElement(ac, { hsva: c, onChange: d }),
              m.createElement(oc, { hue: c.h, onChange: d }),
              m.createElement(Dy, { hsva: c, onChange: d, className: "react-colorful__last-control" })
            );
          }),
          (Ry = { defaultColor: "hsla(0, 0%, 0%, 1)", toHsva: Ey, fromHsva: ln, equal: sc }),
          (_y = function (e) {
            return m.createElement(cc, Ot({}, e, { colorModel: Ry }));
          }),
          (Py = {
            defaultColor: "rgba(0, 0, 0, 1)",
            toHsva: Sy,
            fromHsva: function (e) {
              var t = rc(e);
              return "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + t.a + ")";
            },
            equal: sc,
          }),
          (Fy = function (e) {
            return m.createElement(cc, Ot({}, e, { colorModel: Py }));
          }),
          (Ny = R.div({ position: "relative", maxWidth: 250, '&[aria-readonly="true"]': { opacity: 0.5 } })),
          (By = R(ut)({
            position: "absolute",
            zIndex: 1,
            top: 4,
            left: 4,
            "[aria-readonly=true] &": { cursor: "not-allowed" },
          })),
          (jy = R.div({
            width: 200,
            margin: 5,
            ".react-colorful__saturation": { borderRadius: "4px 4px 0 0" },
            ".react-colorful__hue": { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 5%)" },
            ".react-colorful__last-control": { borderRadius: "0 0 4px 4px" },
          })),
          (Ly = R(St)(({ theme: e }) => ({ fontFamily: e.typography.fonts.base }))),
          (My = R.div({
            display: "grid",
            gridTemplateColumns: "repeat(9, 16px)",
            gap: 6,
            padding: 3,
            marginTop: 5,
            width: 200,
          })),
          (Uy = R.div(({ theme: e, active: t }) => ({
            width: 16,
            height: 16,
            boxShadow: t
              ? `${e.appBorderColor} 0 0 0 1px inset, ${e.textMutedColor}50 0 0 0 4px`
              : `${e.appBorderColor} 0 0 0 1px inset`,
            borderRadius: e.appBorderRadius,
          }))),
          ($y = `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`),
          (Qu = ({ value: e, style: t, ...r }) => {
            let n = `linear-gradient(${e}, ${e}), ${$y}, linear-gradient(#fff, #fff)`;
            return m.createElement(Uy, { ...r, style: { ...t, backgroundImage: n } });
          }),
          (qy = R(Ve.Input)(({ theme: e, readOnly: t }) => ({
            width: "100%",
            paddingLeft: 30,
            paddingRight: 30,
            boxSizing: "border-box",
            fontFamily: e.typography.fonts.base,
          }))),
          (Vy = R(Mi)(({ theme: e }) => ({
            position: "absolute",
            zIndex: 1,
            top: 6,
            right: 7,
            width: 20,
            height: 20,
            padding: 4,
            boxSizing: "border-box",
            cursor: "pointer",
            color: e.input.color,
          }))),
          (dc = ((e) => ((e.RGB = "rgb"), (e.HSL = "hsl"), (e.HEX = "hex"), e))(dc || {})),
          (an = Object.values(dc)),
          (Jy = /\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/),
          (zy = /^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i),
          (Hy = /^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i),
          (ta = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i),
          (Gy = /^\s*#?([0-9a-f]{3})\s*$/i),
          (Wy = { hex: Oy, rgb: Fy, hsl: _y }),
          (sn = { hex: "transparent", rgb: "rgba(0, 0, 0, 0)", hsl: "hsla(0, 0%, 0%, 0)" }),
          (Zu = (e) => {
            let t = e?.match(Jy);
            if (!t) return [0, 0, 0, 1];
            let [, r, n, o, a = 1] = t;
            return [r, n, o, a].map(Number);
          }),
          (Wt = (e) => {
            if (!e) return;
            let t = !0;
            if (zy.test(e)) {
              let [i, l, s, c] = Zu(e),
                [d, p, h] = Ue.default.rgb.hsl([i, l, s]) || [0, 0, 0];
              return {
                valid: t,
                value: e,
                keyword: Ue.default.rgb.keyword([i, l, s]),
                colorSpace: "rgb",
                rgb: e,
                hsl: `hsla(${d}, ${p}%, ${h}%, ${c})`,
                hex: `#${Ue.default.rgb.hex([i, l, s]).toLowerCase()}`,
              };
            }
            if (Hy.test(e)) {
              let [i, l, s, c] = Zu(e),
                [d, p, h] = Ue.default.hsl.rgb([i, l, s]) || [0, 0, 0];
              return {
                valid: t,
                value: e,
                keyword: Ue.default.hsl.keyword([i, l, s]),
                colorSpace: "hsl",
                rgb: `rgba(${d}, ${p}, ${h}, ${c})`,
                hsl: e,
                hex: `#${Ue.default.hsl.hex([i, l, s]).toLowerCase()}`,
              };
            }
            let r = e.replace("#", ""),
              n = Ue.default.keyword.rgb(r) || Ue.default.hex.rgb(r),
              o = Ue.default.rgb.hsl(n),
              a = e;
            if ((/[^#a-f0-9]/i.test(e) ? (a = r) : ta.test(e) && (a = `#${r}`), a.startsWith("#"))) t = ta.test(a);
            else
              try {
                Ue.default.keyword.hex(a);
              } catch {
                t = !1;
              }
            return {
              valid: t,
              value: a,
              keyword: Ue.default.rgb.keyword(n),
              colorSpace: "hex",
              rgb: `rgba(${n[0]}, ${n[1]}, ${n[2]}, 1)`,
              hsl: `hsla(${o[0]}, ${o[1]}%, ${o[2]}%, 1)`,
              hex: a,
            };
          }),
          (Ky = (e, t, r) => {
            if (!e || !t?.valid) return sn[r];
            if (r !== "hex") return t?.[r] || sn[r];
            if (!t.hex.startsWith("#"))
              try {
                return `#${Ue.default.keyword.hex(t.hex)}`;
              } catch {
                return sn.hex;
              }
            let n = t.hex.match(Gy);
            if (!n) return ta.test(t.hex) ? t.hex : sn.hex;
            let [o, a, i] = n[1].split("");
            return `#${o}${o}${a}${a}${i}${i}`;
          }),
          (Yy = (e, t) => {
            let [r, n] = X(e || ""),
              [o, a] = X(() => Wt(r)),
              [i, l] = X(o?.colorSpace || "hex");
            Se(() => {
              let p = e || "",
                h = Wt(p);
              n(p), a(h), l(h?.colorSpace || "hex");
            }, [e]);
            let s = st(() => Ky(r, o, i).toLowerCase(), [r, o, i]),
              c = xe(
                (p) => {
                  let h = Wt(p),
                    f = h?.value || p || "";
                  n(f), f === "" && (a(void 0), t(void 0)), h && (a(h), l(h.colorSpace), t(h.value));
                },
                [t]
              ),
              d = xe(() => {
                let p = an.indexOf(i) + 1;
                p >= an.length && (p = 0), l(an[p]);
                let h = o?.[an[p]] || "";
                n(h), t(h);
              }, [o, i, t]);
            return { value: r, realValue: s, updateValue: c, color: o, colorSpace: i, cycleColorSpace: d };
          }),
          (un = (e) => e.replace(/\s*/, "").toLowerCase()),
          (Xy = (e, t, r) => {
            let [n, o] = X(t?.valid ? [t] : []);
            Se(() => {
              t === void 0 && o([]);
            }, [t]);
            let a = st(
                () =>
                  (e || [])
                    .map((l) =>
                      typeof l == "string" ? Wt(l) : l.title ? { ...Wt(l.color), keyword: l.title } : Wt(l.color)
                    )
                    .concat(n)
                    .filter(Boolean)
                    .slice(-27),
                [e, n]
              ),
              i = xe(
                (l) => {
                  l?.valid && (a.some((s) => un(s[r]) === un(l[r])) || o((s) => s.concat(l)));
                },
                [r, a]
              );
            return { presets: a, addPreset: i };
          }),
          (pc = ({
            name: e,
            value: t,
            onChange: r,
            onFocus: n,
            onBlur: o,
            presetColors: a,
            startOpen: i = !1,
            argType: l,
          }) => {
            let s = xe(Ha(r, 200), [r]),
              { value: c, realValue: d, updateValue: p, color: h, colorSpace: f, cycleColorSpace: b } = Yy(t, s),
              { presets: g, addPreset: x } = Xy(a, h, f),
              S = Wy[f],
              A = !!l?.table?.readonly;
            return m.createElement(
              Ny,
              { "aria-readonly": A },
              m.createElement(
                By,
                {
                  startOpen: i,
                  trigger: A ? [null] : void 0,
                  closeOnOutsideClick: !0,
                  onVisibleChange: () => x(h),
                  tooltip: m.createElement(
                    jy,
                    null,
                    m.createElement(S, {
                      color: d === "transparent" ? "#000000" : d,
                      onChange: p,
                      onFocus: n,
                      onBlur: o,
                    }),
                    g.length > 0 &&
                      m.createElement(
                        My,
                        null,
                        g.map((k, T) =>
                          m.createElement(
                            ut,
                            {
                              key: `${k.value}-${T}`,
                              hasChrome: !1,
                              tooltip: m.createElement(Ly, { note: k.keyword || k.value }),
                            },
                            m.createElement(Qu, {
                              value: k[f],
                              active: h && un(k[f]) === un(h[f]),
                              onClick: () => p(k.value),
                            })
                          )
                        )
                      )
                  ),
                },
                m.createElement(Qu, { value: d, style: { margin: 4 } })
              ),
              m.createElement(qy, {
                id: Fe(e),
                value: c,
                onChange: (k) => p(k.target.value),
                onFocus: (k) => k.target.select(),
                readOnly: A,
                placeholder: "Choose color...",
              }),
              c ? m.createElement(Vy, { onClick: b }) : null
            );
          }),
          (Qy = pc);
      });
    V();
    J();
    z();
    V();
    J();
    z();
    V();
    J();
    z();
    In();
    Dr();
    Dr();
    _r();
    V();
    J();
    z();
    V();
    J();
    z();
    var xx = __STORYBOOK_CORE_EVENTS__,
      {
        ARGTYPES_INFO_REQUEST: ri,
        ARGTYPES_INFO_RESPONSE: Vn,
        CHANNEL_CREATED: Sx,
        CHANNEL_WS_DISCONNECT: wx,
        CONFIG_ERROR: ni,
        CREATE_NEW_STORYFILE_REQUEST: Ax,
        CREATE_NEW_STORYFILE_RESPONSE: Tx,
        CURRENT_STORY_WAS_SET: Jn,
        DOCS_PREPARED: oi,
        DOCS_RENDERED: Pr,
        FILE_COMPONENT_SEARCH_REQUEST: Cx,
        FILE_COMPONENT_SEARCH_RESPONSE: kx,
        FORCE_REMOUNT: ai,
        FORCE_RE_RENDER: Fr,
        GLOBALS_UPDATED: $t,
        NAVIGATE_URL: ii,
        PLAY_FUNCTION_THREW_EXCEPTION: si,
        PRELOAD_ENTRIES: li,
        PREVIEW_BUILDER_PROGRESS: Ix,
        PREVIEW_KEYDOWN: ui,
        REGISTER_SUBSCRIPTION: Ox,
        REQUEST_WHATS_NEW_DATA: Dx,
        RESET_STORY_ARGS: Nr,
        RESULT_WHATS_NEW_DATA: Rx,
        SAVE_STORY_REQUEST: zn,
        SAVE_STORY_RESPONSE: Br,
        SELECT_STORY: _x,
        SET_CONFIG: Px,
        SET_CURRENT_STORY: ci,
        SET_FILTER: Fx,
        SET_GLOBALS: di,
        SET_INDEX: Nx,
        SET_STORIES: Bx,
        SET_WHATS_NEW_CACHE: jx,
        SHARED_STATE_CHANGED: Lx,
        SHARED_STATE_SET: Mx,
        STORIES_COLLAPSE_ALL: Ux,
        STORIES_EXPAND_ALL: $x,
        STORY_ARGS_UPDATED: pi,
        STORY_CHANGED: fi,
        STORY_ERRORED: hi,
        STORY_INDEX_INVALIDATED: mi,
        STORY_MISSING: Hn,
        STORY_PREPARED: yi,
        STORY_RENDERED: cr,
        STORY_RENDER_PHASE_CHANGED: qt,
        STORY_SPECIFIED: gi,
        STORY_THREW_EXCEPTION: bi,
        STORY_UNCHANGED: Ei,
        TELEMETRY_ERROR: qx,
        TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: Vx,
        TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: Jx,
        TESTING_MODULE_CRASH_REPORT: zx,
        TESTING_MODULE_PROGRESS_REPORT: Hx,
        TESTING_MODULE_RUN_ALL_REQUEST: Gx,
        TESTING_MODULE_RUN_REQUEST: Wx,
        TESTING_MODULE_WATCH_MODE_REQUEST: Kx,
        TOGGLE_WHATS_NEW_NOTIFICATIONS: Yx,
        UNHANDLED_ERRORS_WHILE_PLAYING: vi,
        UPDATE_GLOBALS: jr,
        UPDATE_QUERY_PARAMS: xi,
        UPDATE_STORY_ARGS: Lr,
      } = __STORYBOOK_CORE_EVENTS__;
    V();
    J();
    z();
    var iS = __STORYBOOK_API__,
      {
        ActiveTabs: sS,
        Consumer: lS,
        ManagerContext: uS,
        Provider: cS,
        RequestResponseError: dS,
        addons: Mr,
        combineParameters: pS,
        controlOrMetaKey: fS,
        controlOrMetaSymbol: hS,
        eventMatchesShortcut: mS,
        eventToShortcut: yS,
        experimental_requestResponse: Gn,
        isMacLike: gS,
        isShortcutTaken: bS,
        keyToSymbol: ES,
        merge: vS,
        mockChannel: xS,
        optionOrAltSymbol: SS,
        shortcutMatchesShortcut: wS,
        shortcutToHumanString: AS,
        types: Si,
        useAddonState: TS,
        useArgTypes: Wn,
        useArgs: wi,
        useChannel: CS,
        useGlobalTypes: kS,
        useGlobals: Ai,
        useParameter: Ti,
        useSharedState: IS,
        useStoryPrepared: OS,
        useStorybookApi: DS,
        useStorybookState: Ci,
      } = __STORYBOOK_API__;
    Qn();
    V();
    J();
    z();
    var Di = Object.prototype.hasOwnProperty;
    function Ri(e, t, r) {
      for (r of e.keys()) if (wt(r, t)) return r;
    }
    function wt(e, t) {
      var r, n, o;
      if (e === t) return !0;
      if (e && t && (r = e.constructor) === t.constructor) {
        if (r === Date) return e.getTime() === t.getTime();
        if (r === RegExp) return e.toString() === t.toString();
        if (r === Array) {
          if ((n = e.length) === t.length) for (; n-- && wt(e[n], t[n]); );
          return n === -1;
        }
        if (r === Set) {
          if (e.size !== t.size) return !1;
          for (n of e) if (((o = n), (o && typeof o == "object" && ((o = Ri(t, o)), !o)) || !t.has(o))) return !1;
          return !0;
        }
        if (r === Map) {
          if (e.size !== t.size) return !1;
          for (n of e)
            if (((o = n[0]), (o && typeof o == "object" && ((o = Ri(t, o)), !o)) || !wt(n[1], t.get(o)))) return !1;
          return !0;
        }
        if (r === ArrayBuffer) (e = new Uint8Array(e)), (t = new Uint8Array(t));
        else if (r === DataView) {
          if ((n = e.byteLength) === t.byteLength) for (; n-- && e.getInt8(n) === t.getInt8(n); );
          return n === -1;
        }
        if (ArrayBuffer.isView(e)) {
          if ((n = e.byteLength) === t.byteLength) for (; n-- && e[n] === t[n]; );
          return n === -1;
        }
        if (!r || typeof e == "object") {
          n = 0;
          for (r in e) if ((Di.call(e, r) && ++n && !Di.call(t, r)) || !(r in t) || !wt(e[r], t[r])) return !1;
          return Object.keys(t).length === n;
        }
      }
      return e !== e && t !== t;
    }
    ro();
    V();
    J();
    z();
    var b5 = __STORYBOOK_CLIENT_LOGGER__,
      { deprecate: E5, logger: qr, once: zi, pretty: v5 } = __STORYBOOK_CLIENT_LOGGER__;
    V();
    J();
    z();
    V();
    J();
    z();
    V();
    J();
    z();
    var T5 = __STORYBOOK_CHANNELS__,
      {
        Channel: Hi,
        PostMessageTransport: C5,
        WebsocketTransport: k5,
        createBrowserChannel: I5,
      } = __STORYBOOK_CHANNELS__;
    V();
    J();
    z();
    var P5 = __STORYBOOK_CLIENT_LOGGER__,
      { deprecate: Ze, logger: Q, once: ct, pretty: F5 } = __STORYBOOK_CLIENT_LOGGER__;
    V();
    J();
    z();
    var kf = Object.defineProperty,
      ce = (e, t) => kf(e, "name", { value: t, configurable: !0 });
    function de(e) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      var n = Array.from(typeof e == "string" ? [e] : e);
      n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var o = n.reduce(function (l, s) {
        var c = s.match(/\n([\t ]+|(?!\s).)/g);
        return c
          ? l.concat(
              c.map(function (d) {
                var p, h;
                return (h = (p = d.match(/[\t ]/g)) === null || p === void 0 ? void 0 : p.length) !== null &&
                  h !== void 0
                  ? h
                  : 0;
              })
            )
          : l;
      }, []);
      if (o.length) {
        var a = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, o) +
            "}",
          "g"
        );
        n = n.map(function (l) {
          return l.replace(
            a,
            `
`
          );
        });
      }
      n[0] = n[0].replace(/^\r?\n/, "");
      var i = n[0];
      return (
        t.forEach(function (l, s) {
          var c = i.match(/(?:^|\n)( *)$/),
            d = c ? c[1] : "",
            p = l;
          typeof l == "string" &&
            l.includes(`
`) &&
            (p = String(l)
              .split(
                `
`
              )
              .map(function (h, f) {
                return f === 0 ? h : "" + d + h;
              }).join(`
`)),
            (i += p + n[s + 1]);
        }),
        i
      );
    }
    ce(de, "dedent");
    function no({ code: e, category: t }) {
      let r = String(e).padStart(4, "0");
      return `SB_${t}_${r}`;
    }
    ce(no, "parseErrorCode");
    var Gi = class Wi extends Error {
      constructor(t) {
        super(Wi.getFullMessage(t)),
          (this.data = {}),
          (this.fromStorybook = !0),
          (this.category = t.category),
          (this.documentation = t.documentation ?? !1),
          (this.code = t.code);
      }
      get fullErrorCode() {
        return no({ code: this.code, category: this.category });
      }
      get name() {
        let t = this.constructor.name;
        return `${this.fullErrorCode} (${t})`;
      }
      static getFullMessage({ documentation: t, code: r, category: n, message: o }) {
        let a;
        return (
          t === !0
            ? (a = `https://storybook.js.org/error/${no({ code: r, category: n })}`)
            : typeof t == "string"
              ? (a = t)
              : Array.isArray(t) &&
                (a = `
${t.map((i) => `	- ${i}`).join(`
`)}`),
          `${o}${
            a != null
              ? `

More info: ${a}
`
              : ""
          }`
        );
      }
    };
    ce(Gi, "StorybookError");
    var ge = Gi,
      If = ((e) => (
        (e.BLOCKS = "BLOCKS"),
        (e.DOCS_TOOLS = "DOCS-TOOLS"),
        (e.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER"),
        (e.PREVIEW_CHANNELS = "PREVIEW_CHANNELS"),
        (e.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS"),
        (e.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER"),
        (e.PREVIEW_API = "PREVIEW_API"),
        (e.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM"),
        (e.PREVIEW_ROUTER = "PREVIEW_ROUTER"),
        (e.PREVIEW_THEMING = "PREVIEW_THEMING"),
        (e.RENDERER_HTML = "RENDERER_HTML"),
        (e.RENDERER_PREACT = "RENDERER_PREACT"),
        (e.RENDERER_REACT = "RENDERER_REACT"),
        (e.RENDERER_SERVER = "RENDERER_SERVER"),
        (e.RENDERER_SVELTE = "RENDERER_SVELTE"),
        (e.RENDERER_VUE = "RENDERER_VUE"),
        (e.RENDERER_VUE3 = "RENDERER_VUE3"),
        (e.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS"),
        (e.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS"),
        (e.ADDON_VITEST = "ADDON_VITEST"),
        e
      ))(If || {}),
      Ki = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 1,
            message: de`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`,
          }),
            (this.data = t);
        }
      };
    ce(Ki, "MissingStoryAfterHmrError");
    var Yi = Ki,
      Of = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 2,
            documentation:
              "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",
            message: de`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${
          t.deprecated
            ? `
This is deprecated and won't work in Storybook 8 anymore.
`
            : ""
        }
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`,
          }),
            (this.data = t);
        }
      };
    ce(Of, "ImplicitActionsDuringRendering");
    var Xi = class extends ge {
      constructor() {
        super({
          category: "PREVIEW_API",
          code: 3,
          message: de`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`,
        });
      }
    };
    ce(Xi, "CalledExtractOnStoreError");
    var Qi = Xi,
      Zi = class extends ge {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 4,
            message: de`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
            documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field",
          });
        }
      };
    ce(Zi, "MissingRenderToCanvasError");
    var es = Zi,
      ts = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 5,
            message: de`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`,
          }),
            (this.data = t);
        }
      };
    ce(ts, "CalledPreviewMethodBeforeInitializationError");
    var Ne = ts,
      rs = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 6,
            message: de`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`,
          }),
            (this.data = t);
        }
      };
    ce(rs, "StoryIndexFetchError");
    var ns = rs,
      os = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 7,
            message: de`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`,
          }),
            (this.data = t);
        }
      };
    ce(os, "MdxFileWithNoCsfReferencesError");
    var as = os,
      is = class extends ge {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 8,
            message: de`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`,
          });
        }
      };
    ce(is, "EmptyIndexError");
    var ss = is,
      ls = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 9,
            message: de`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`,
          }),
            (this.data = t);
        }
      };
    ce(ls, "NoStoryMatchError");
    var us = ls,
      cs = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 10,
            message: de`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`,
          }),
            (this.data = t);
        }
      };
    ce(cs, "MissingStoryFromCsfFileError");
    var ds = cs,
      ps = class extends ge {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 11,
            message: de`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`,
          });
        }
      };
    ce(ps, "StoryStoreAccessedBeforeInitializationError");
    var fs = ps,
      hs = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 12,
            message: de`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`,
          }),
            (this.data = t);
        }
      };
    ce(hs, "MountMustBeDestructuredError");
    var Vr = hs,
      ms = class extends ge {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 14,
            message: de`
        No render function available for storyId '${t.id}'
      `,
          }),
            (this.data = t);
        }
      };
    ce(ms, "NoRenderFunctionError");
    var ys = ms,
      gs = class extends ge {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 15,
            message: de`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `,
          });
        }
      };
    ce(gs, "NoStoryMountedError");
    var bs = gs,
      Df = class extends ge {
        constructor() {
          super({
            category: "FRAMEWORK_NEXTJS",
            code: 1,
            documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
            message: de`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `,
          });
        }
      };
    ce(Df, "NextJsSharpError");
    var Rf = class extends ge {
      constructor(t) {
        super({
          category: "FRAMEWORK_NEXTJS",
          code: 2,
          message: de`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `,
        }),
          (this.data = t);
      }
    };
    ce(Rf, "NextjsRouterMocksNotAvailable");
    var Es = class extends ge {
      constructor(t) {
        super({
          category: "DOCS-TOOLS",
          code: 1,
          documentation: "https://github.com/storybookjs/storybook/issues/26606",
          message: de`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `,
        }),
          (this.data = t);
      }
    };
    ce(Es, "UnknownArgTypesError");
    var Jr = Es,
      _f = class extends ge {
        constructor(t) {
          super({
            category: "ADDON_VITEST",
            code: 1,
            message: de`
        Encountered an unsupported value "${t.value}" when setting the viewport ${t.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `,
          }),
            (this.data = t);
        }
      };
    ce(_f, "UnsupportedViewportDimensionError");
    V();
    J();
    z();
    var Pf = Object.create,
      ws = Object.defineProperty,
      Ff = Object.getOwnPropertyDescriptor,
      Nf = Object.getOwnPropertyNames,
      Bf = Object.getPrototypeOf,
      jf = Object.prototype.hasOwnProperty,
      Lf = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
      Mf = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of Nf(t))
            !jf.call(e, o) && o !== r && ws(e, o, { get: () => t[o], enumerable: !(n = Ff(t, o)) || n.enumerable });
        return e;
      },
      Uf = (e, t, r) => (
        (r = e != null ? Pf(Bf(e)) : {}),
        Mf(t || !e || !e.__esModule ? ws(r, "default", { value: e, enumerable: !0 }) : r, e)
      ),
      $f = Lf((e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isEqual = (function () {
            var t = Object.prototype.toString,
              r = Object.getPrototypeOf,
              n = Object.getOwnPropertySymbols
                ? function (o) {
                    return Object.keys(o).concat(Object.getOwnPropertySymbols(o));
                  }
                : Object.keys;
            return function (o, a) {
              return (function i(l, s, c) {
                var d,
                  p,
                  h,
                  f = t.call(l),
                  b = t.call(s);
                if (l === s) return !0;
                if (l == null || s == null) return !1;
                if (c.indexOf(l) > -1 && c.indexOf(s) > -1) return !0;
                if (
                  (c.push(l, s),
                  f != b ||
                    ((d = n(l)),
                    (p = n(s)),
                    d.length != p.length ||
                      d.some(function (g) {
                        return !i(l[g], s[g], c);
                      })))
                )
                  return !1;
                switch (f.slice(8, -1)) {
                  case "Symbol":
                    return l.valueOf() == s.valueOf();
                  case "Date":
                  case "Number":
                    return +l == +s || (+l != +l && +s != +s);
                  case "RegExp":
                  case "Function":
                  case "String":
                  case "Boolean":
                    return "" + l == "" + s;
                  case "Set":
                  case "Map":
                    (d = l.entries()), (p = s.entries());
                    do if (!i((h = d.next()).value, p.next().value, c)) return !1;
                    while (!h.done);
                    return !0;
                  case "ArrayBuffer":
                    (l = new Uint8Array(l)), (s = new Uint8Array(s));
                  case "DataView":
                    (l = new Uint8Array(l.buffer)), (s = new Uint8Array(s.buffer));
                  case "Float32Array":
                  case "Float64Array":
                  case "Int8Array":
                  case "Int16Array":
                  case "Int32Array":
                  case "Uint8Array":
                  case "Uint16Array":
                  case "Uint32Array":
                  case "Uint8ClampedArray":
                  case "Arguments":
                  case "Array":
                    if (l.length != s.length) return !1;
                    for (h = 0; h < l.length; h++)
                      if ((h in l || h in s) && (h in l != h in s || !i(l[h], s[h], c))) return !1;
                    return !0;
                  case "Object":
                    return i(r(l), r(s), c);
                  default:
                    return !1;
                }
              })(o, a, []);
            };
          })());
      });
    function qf(e) {
      return e
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\./g, " ")
        .replace(/([^\n])([A-Z])([a-z])/g, (t, r, n, o) => `${r} ${n}${o}`)
        .replace(/([a-z])([A-Z])/g, (t, r, n) => `${r} ${n}`)
        .replace(/([a-z])([0-9])/gi, (t, r, n) => `${r} ${n}`)
        .replace(/([0-9])([a-z])/gi, (t, r, n) => `${r} ${n}`)
        .replace(/(\s|^)(\w)/g, (t, r, n) => `${r}${n.toUpperCase()}`)
        .replace(/ +/g, " ")
        .trim();
    }
    var vs = Uf($f()),
      As = (e) => e.map((t) => typeof t < "u").filter(Boolean).length,
      Vf = (e, t) => {
        let { exists: r, eq: n, neq: o, truthy: a } = e;
        if (As([r, n, o, a]) > 1)
          throw new Error(`Invalid conditional test ${JSON.stringify({ exists: r, eq: n, neq: o })}`);
        if (typeof n < "u") return (0, vs.isEqual)(t, n);
        if (typeof o < "u") return !(0, vs.isEqual)(t, o);
        if (typeof r < "u") {
          let i = typeof t < "u";
          return r ? i : !i;
        }
        return typeof a > "u" || a ? !!t : !t;
      },
      Ts = (e, t, r) => {
        if (!e.if) return !0;
        let { arg: n, global: o } = e.if;
        if (As([n, o]) !== 1) throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n, global: o })}`);
        let a = n ? t[n] : r[o];
        return Vf(e.if, a);
      },
      oo = (e) =>
        e
          .toLowerCase()
          .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          .replace(/-+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, ""),
      xs = (e, t) => {
        let r = oo(e);
        if (r === "") throw new Error(`Invalid ${t} '${e}', must include alphanumeric characters`);
        return r;
      },
      Cs = (e, t) => `${xs(e, "kind")}${t ? `--${xs(t, "name")}` : ""}`,
      ks = (e) => qf(e);
    function Ss(e, t) {
      return Array.isArray(t) ? t.includes(e) : e.match(t);
    }
    function zr(e, { includeStories: t, excludeStories: r }) {
      return e !== "__esModule" && (!t || Ss(e, t)) && (!r || !Ss(e, r));
    }
    var Is = (...e) => {
      let t = e.reduce((r, n) => (n.startsWith("!") ? r.delete(n.slice(1)) : r.add(n), r), new Set());
      return Array.from(t);
    };
    var Jf = Object.create,
      ko = Object.defineProperty,
      zf = Object.getOwnPropertyDescriptor,
      Hf = Object.getOwnPropertyNames,
      Gf = Object.getPrototypeOf,
      Wf = Object.prototype.hasOwnProperty,
      E = (e, t) => ko(e, "name", { value: t, configurable: !0 }),
      Hr = ((e) =>
        typeof Pe < "u" ? Pe : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof Pe < "u" ? Pe : t)[r] }) : e)(
        function (e) {
          if (typeof Pe < "u") return Pe.apply(this, arguments);
          throw Error('Dynamic require of "' + e + '" is not supported');
        }
      ),
      we = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
      Kf = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of Hf(t))
            !Wf.call(e, o) && o !== r && ko(e, o, { get: () => t[o], enumerable: !(n = zf(t, o)) || n.enumerable });
        return e;
      },
      Ht = (e, t, r) => (
        (r = e != null ? Jf(Gf(e)) : {}),
        Kf(t || !e || !e.__esModule ? ko(r, "default", { value: e, enumerable: !0 }) : r, e)
      ),
      Js = we((e, t) => {
        (function (r) {
          if (typeof e == "object" && typeof t < "u") t.exports = r();
          else if (typeof define == "function" && define.amd) define([], r);
          else {
            var n;
            typeof window < "u" || typeof window < "u" ? (n = window) : typeof self < "u" ? (n = self) : (n = this),
              (n.memoizerific = r());
          }
        })(function () {
          var r, n, o;
          return E(function a(i, l, s) {
            function c(h, f) {
              if (!l[h]) {
                if (!i[h]) {
                  var b = typeof Hr == "function" && Hr;
                  if (!f && b) return b(h, !0);
                  if (d) return d(h, !0);
                  var g = new Error("Cannot find module '" + h + "'");
                  throw ((g.code = "MODULE_NOT_FOUND"), g);
                }
                var x = (l[h] = { exports: {} });
                i[h][0].call(
                  x.exports,
                  function (S) {
                    var A = i[h][1][S];
                    return c(A || S);
                  },
                  x,
                  x.exports,
                  a,
                  i,
                  l,
                  s
                );
              }
              return l[h].exports;
            }
            E(c, "s");
            for (var d = typeof Hr == "function" && Hr, p = 0; p < s.length; p++) c(s[p]);
            return c;
          }, "e")(
            {
              1: [
                function (a, i, l) {
                  i.exports = function (s) {
                    if (typeof Map != "function" || s) {
                      var c = a("./similar");
                      return new c();
                    } else return new Map();
                  };
                },
                { "./similar": 2 },
              ],
              2: [
                function (a, i, l) {
                  function s() {
                    return (this.list = []), (this.lastItem = void 0), (this.size = 0), this;
                  }
                  E(s, "Similar"),
                    (s.prototype.get = function (c) {
                      var d;
                      if (this.lastItem && this.isEqual(this.lastItem.key, c)) return this.lastItem.val;
                      if (((d = this.indexOf(c)), d >= 0)) return (this.lastItem = this.list[d]), this.list[d].val;
                    }),
                    (s.prototype.set = function (c, d) {
                      var p;
                      return this.lastItem && this.isEqual(this.lastItem.key, c)
                        ? ((this.lastItem.val = d), this)
                        : ((p = this.indexOf(c)),
                          p >= 0
                            ? ((this.lastItem = this.list[p]), (this.list[p].val = d), this)
                            : ((this.lastItem = { key: c, val: d }), this.list.push(this.lastItem), this.size++, this));
                    }),
                    (s.prototype.delete = function (c) {
                      var d;
                      if (
                        (this.lastItem && this.isEqual(this.lastItem.key, c) && (this.lastItem = void 0),
                        (d = this.indexOf(c)),
                        d >= 0)
                      )
                        return this.size--, this.list.splice(d, 1)[0];
                    }),
                    (s.prototype.has = function (c) {
                      var d;
                      return this.lastItem && this.isEqual(this.lastItem.key, c)
                        ? !0
                        : ((d = this.indexOf(c)), d >= 0 ? ((this.lastItem = this.list[d]), !0) : !1);
                    }),
                    (s.prototype.forEach = function (c, d) {
                      var p;
                      for (p = 0; p < this.size; p++) c.call(d || this, this.list[p].val, this.list[p].key, this);
                    }),
                    (s.prototype.indexOf = function (c) {
                      var d;
                      for (d = 0; d < this.size; d++) if (this.isEqual(this.list[d].key, c)) return d;
                      return -1;
                    }),
                    (s.prototype.isEqual = function (c, d) {
                      return c === d || (c !== c && d !== d);
                    }),
                    (i.exports = s);
                },
                {},
              ],
              3: [
                function (a, i, l) {
                  var s = a("map-or-similar");
                  i.exports = function (h) {
                    var f = new s(!1),
                      b = [];
                    return function (g) {
                      var x = E(function () {
                        var S = f,
                          A,
                          k,
                          T = arguments.length - 1,
                          I = Array(T + 1),
                          D = !0,
                          F;
                        if ((x.numArgs || x.numArgs === 0) && x.numArgs !== T + 1)
                          throw new Error(
                            "Memoizerific functions should always be called with the same number of arguments"
                          );
                        for (F = 0; F < T; F++) {
                          if (((I[F] = { cacheItem: S, arg: arguments[F] }), S.has(arguments[F]))) {
                            S = S.get(arguments[F]);
                            continue;
                          }
                          (D = !1), (A = new s(!1)), S.set(arguments[F], A), (S = A);
                        }
                        return (
                          D && (S.has(arguments[T]) ? (k = S.get(arguments[T])) : (D = !1)),
                          D || ((k = g.apply(null, arguments)), S.set(arguments[T], k)),
                          h > 0 &&
                            ((I[T] = { cacheItem: S, arg: arguments[T] }),
                            D ? c(b, I) : b.push(I),
                            b.length > h && d(b.shift())),
                          (x.wasMemoized = D),
                          (x.numArgs = T + 1),
                          k
                        );
                      }, "memoizerific");
                      return (x.limit = h), (x.wasMemoized = !1), (x.cache = f), (x.lru = b), x;
                    };
                  };
                  function c(h, f) {
                    var b = h.length,
                      g = f.length,
                      x,
                      S,
                      A;
                    for (S = 0; S < b; S++) {
                      for (x = !0, A = 0; A < g; A++)
                        if (!p(h[S][A].arg, f[A].arg)) {
                          x = !1;
                          break;
                        }
                      if (x) break;
                    }
                    h.push(h.splice(S, 1)[0]);
                  }
                  E(c, "moveToMostRecentLru");
                  function d(h) {
                    var f = h.length,
                      b = h[f - 1],
                      g,
                      x;
                    for (
                      b.cacheItem.delete(b.arg), x = f - 2;
                      x >= 0 && ((b = h[x]), (g = b.cacheItem.get(b.arg)), !g || !g.size);
                      x--
                    )
                      b.cacheItem.delete(b.arg);
                  }
                  E(d, "removeCachedResult");
                  function p(h, f) {
                    return h === f || (h !== h && f !== f);
                  }
                  E(p, "isEqual");
                },
                { "map-or-similar": 1 },
              ],
            },
            {},
            [3]
          )(3);
        });
      }),
      zs = we((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.encodeString = n);
        var t = Array.from({ length: 256 }, (o, a) => "%" + ((a < 16 ? "0" : "") + a.toString(16)).toUpperCase()),
          r = new Int8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
          ]);
        function n(o) {
          let a = o.length;
          if (a === 0) return "";
          let i = "",
            l = 0,
            s = 0;
          e: for (; s < a; s++) {
            let c = o.charCodeAt(s);
            for (; c < 128; ) {
              if ((r[c] !== 1 && (l < s && (i += o.slice(l, s)), (l = s + 1), (i += t[c])), ++s === a)) break e;
              c = o.charCodeAt(s);
            }
            if ((l < s && (i += o.slice(l, s)), c < 2048)) {
              (l = s + 1), (i += t[192 | (c >> 6)] + t[128 | (c & 63)]);
              continue;
            }
            if (c < 55296 || c >= 57344) {
              (l = s + 1), (i += t[224 | (c >> 12)] + t[128 | ((c >> 6) & 63)] + t[128 | (c & 63)]);
              continue;
            }
            if ((++s, s >= a)) throw new Error("URI malformed");
            let d = o.charCodeAt(s) & 1023;
            (l = s + 1),
              (c = 65536 + (((c & 1023) << 10) | d)),
              (i += t[240 | (c >> 18)] + t[128 | ((c >> 12) & 63)] + t[128 | ((c >> 6) & 63)] + t[128 | (c & 63)]);
          }
          return l === 0 ? o : l < a ? i + o.slice(l) : i;
        }
        E(n, "encodeString");
      }),
      Io = we((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.defaultOptions = e.defaultShouldSerializeObject = e.defaultValueSerializer = void 0);
        var t = zs(),
          r = E((a) => {
            switch (typeof a) {
              case "string":
                return (0, t.encodeString)(a);
              case "bigint":
              case "boolean":
                return "" + a;
              case "number":
                if (Number.isFinite(a)) return a < 1e21 ? "" + a : (0, t.encodeString)("" + a);
                break;
            }
            return a instanceof Date ? (0, t.encodeString)(a.toISOString()) : "";
          }, "defaultValueSerializer");
        e.defaultValueSerializer = r;
        var n = E((a) => a instanceof Date, "defaultShouldSerializeObject");
        e.defaultShouldSerializeObject = n;
        var o = E((a) => a, "identityFunc");
        e.defaultOptions = {
          nesting: !0,
          nestingSyntax: "dot",
          arrayRepeat: !1,
          arrayRepeatSyntax: "repeat",
          delimiter: 38,
          valueDeserializer: o,
          valueSerializer: e.defaultValueSerializer,
          keyDeserializer: o,
          shouldSerializeObject: e.defaultShouldSerializeObject,
        };
      }),
      Hs = we((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.getDeepObject = o), (e.stringifyObject = d);
        var t = Io(),
          r = zs();
        function n(p) {
          return p === "__proto__" || p === "constructor" || p === "prototype";
        }
        E(n, "isPrototypeKey");
        function o(p, h, f, b, g) {
          if (n(h)) return p;
          let x = p[h];
          return typeof x == "object" && x !== null
            ? x
            : !b && (g || typeof f == "number" || (typeof f == "string" && f * 0 === 0 && f.indexOf(".") === -1))
              ? (p[h] = [])
              : (p[h] = {});
        }
        E(o, "getDeepObject");
        var a = 20,
          i = "[]",
          l = "[",
          s = "]",
          c = ".";
        function d(p, h, f = 0, b, g) {
          let {
              nestingSyntax: x = t.defaultOptions.nestingSyntax,
              arrayRepeat: S = t.defaultOptions.arrayRepeat,
              arrayRepeatSyntax: A = t.defaultOptions.arrayRepeatSyntax,
              nesting: k = t.defaultOptions.nesting,
              delimiter: T = t.defaultOptions.delimiter,
              valueSerializer: I = t.defaultOptions.valueSerializer,
              shouldSerializeObject: D = t.defaultOptions.shouldSerializeObject,
            } = h,
            F = typeof T == "number" ? String.fromCharCode(T) : T,
            P = g === !0 && S,
            L = x === "dot" || (x === "js" && !g);
          if (f > a) return "";
          let B = "",
            G = !0,
            $ = !1;
          for (let H in p) {
            let w = p[H],
              C;
            b
              ? ((C = b), P ? A === "bracket" && (C += i) : L ? ((C += c), (C += H)) : ((C += l), (C += H), (C += s)))
              : (C = H),
              G || (B += F),
              typeof w == "object" && w !== null && !D(w)
                ? (($ = w.pop !== void 0), (k || (S && $)) && (B += d(w, h, f + 1, C, $)))
                : ((B += (0, r.encodeString)(C)), (B += "="), (B += I(w, H))),
              G && (G = !1);
          }
          return B;
        }
        E(d, "stringifyObject");
      }),
      Yf = we((e, t) => {
        "use strict";
        var r = 12,
          n = 0,
          o = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12,
            12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
          ];
        function a(s) {
          var c = s.indexOf("%");
          if (c === -1) return s;
          for (var d = s.length, p = "", h = 0, f = 0, b = c, g = r; c > -1 && c < d; ) {
            var x = l(s[c + 1], 4),
              S = l(s[c + 2], 0),
              A = x | S,
              k = o[A];
            if (((g = o[256 + g + k]), (f = (f << 6) | (A & o[364 + k])), g === r))
              (p += s.slice(h, b)),
                (p += f <= 65535 ? String.fromCharCode(f) : String.fromCharCode(55232 + (f >> 10), 56320 + (f & 1023))),
                (f = 0),
                (h = c + 3),
                (c = b = s.indexOf("%", h));
            else {
              if (g === n) return null;
              if (((c += 3), c < d && s.charCodeAt(c) === 37)) continue;
              return null;
            }
          }
          return p + s.slice(h);
        }
        E(a, "decodeURIComponent");
        var i = {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          a: 10,
          A: 10,
          b: 11,
          B: 11,
          c: 12,
          C: 12,
          d: 13,
          D: 13,
          e: 14,
          E: 14,
          f: 15,
          F: 15,
        };
        function l(s, c) {
          var d = i[s];
          return d === void 0 ? 255 : d << c;
        }
        E(l, "hexCodeToInt"), (t.exports = a);
      }),
      Xf = we((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (p) {
            return p && p.__esModule ? p : { default: p };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.numberValueDeserializer = e.numberKeyDeserializer = void 0),
          (e.parse = d);
        var r = Hs(),
          n = Io(),
          o = t(Yf()),
          a = E((p) => {
            let h = Number(p);
            return Number.isNaN(h) ? p : h;
          }, "numberKeyDeserializer");
        e.numberKeyDeserializer = a;
        var i = E((p) => {
          let h = Number(p);
          return Number.isNaN(h) ? p : h;
        }, "numberValueDeserializer");
        e.numberValueDeserializer = i;
        var l = /\+/g,
          s = E(function () {}, "Empty");
        s.prototype = Object.create(null);
        function c(p, h, f, b, g) {
          let x = p.substring(h, f);
          return b && (x = x.replace(l, " ")), g && (x = (0, o.default)(x) || x), x;
        }
        E(c, "computeKeySlice");
        function d(p, h) {
          let {
              valueDeserializer: f = n.defaultOptions.valueDeserializer,
              keyDeserializer: b = n.defaultOptions.keyDeserializer,
              arrayRepeatSyntax: g = n.defaultOptions.arrayRepeatSyntax,
              nesting: x = n.defaultOptions.nesting,
              arrayRepeat: S = n.defaultOptions.arrayRepeat,
              nestingSyntax: A = n.defaultOptions.nestingSyntax,
              delimiter: k = n.defaultOptions.delimiter,
            } = h ?? {},
            T = typeof k == "string" ? k.charCodeAt(0) : k,
            I = A === "js",
            D = new s();
          if (typeof p != "string") return D;
          let F = p.length,
            P = "",
            L = -1,
            B = -1,
            G = -1,
            $ = D,
            H,
            w = "",
            C = "",
            _ = !1,
            M = !1,
            U = !1,
            K = !1,
            re = !1,
            Z = !1,
            Y = !1,
            ee = 0,
            ye = -1,
            le = -1,
            Ae = -1;
          for (let ne = 0; ne < F + 1; ne++) {
            if (((ee = ne !== F ? p.charCodeAt(ne) : T), ee === T)) {
              if (
                ((Y = B > L),
                Y || (B = ne),
                G !== B - 1 &&
                  ((C = c(p, G + 1, ye > -1 ? ye : B, U, _)),
                  (w = b(C)),
                  H !== void 0 && ($ = (0, r.getDeepObject)($, H, w, I && re, I && Z))),
                Y || w !== "")
              ) {
                Y && ((P = p.slice(B + 1, ne)), K && (P = P.replace(l, " ")), M && (P = (0, o.default)(P) || P));
                let qe = f(P, w);
                if (S) {
                  let Be = $[w];
                  Be === void 0 ? (ye > -1 ? ($[w] = [qe]) : ($[w] = qe)) : Be.pop ? Be.push(qe) : ($[w] = [Be, qe]);
                } else $[w] = qe;
              }
              (P = ""),
                (L = ne),
                (B = ne),
                (_ = !1),
                (M = !1),
                (U = !1),
                (K = !1),
                (re = !1),
                (Z = !1),
                (ye = -1),
                (G = ne),
                ($ = D),
                (H = void 0),
                (w = "");
            } else
              ee === 93
                ? (S && g === "bracket" && Ae === 91 && (ye = le),
                  x &&
                    (A === "index" || I) &&
                    B <= L &&
                    (G !== le &&
                      ((C = c(p, G + 1, ne, U, _)),
                      (w = b(C)),
                      H !== void 0 && ($ = (0, r.getDeepObject)($, H, w, void 0, I)),
                      (H = w),
                      (U = !1),
                      (_ = !1)),
                    (G = ne),
                    (Z = !0),
                    (re = !1)))
                : ee === 46
                  ? x &&
                    (A === "dot" || I) &&
                    B <= L &&
                    (G !== le &&
                      ((C = c(p, G + 1, ne, U, _)),
                      (w = b(C)),
                      H !== void 0 && ($ = (0, r.getDeepObject)($, H, w, I)),
                      (H = w),
                      (U = !1),
                      (_ = !1)),
                    (re = !0),
                    (Z = !1),
                    (G = ne))
                  : ee === 91
                    ? x &&
                      (A === "index" || I) &&
                      B <= L &&
                      (G !== le &&
                        ((C = c(p, G + 1, ne, U, _)),
                        (w = b(C)),
                        I && H !== void 0 && ($ = (0, r.getDeepObject)($, H, w, I)),
                        (H = w),
                        (U = !1),
                        (_ = !1),
                        (re = !1),
                        (Z = !0)),
                      (G = ne))
                    : ee === 61
                      ? B <= L
                        ? (B = ne)
                        : (M = !0)
                      : ee === 43
                        ? B > L
                          ? (K = !0)
                          : (U = !0)
                        : ee === 37 && (B > L ? (M = !0) : (_ = !0));
            (le = ne), (Ae = ee);
          }
          return D;
        }
        E(d, "parse");
      }),
      Qf = we((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.stringify = r);
        var t = Hs();
        function r(n, o) {
          if (n === null || typeof n != "object") return "";
          let a = o ?? {};
          return (0, t.stringifyObject)(n, a);
        }
        E(r, "stringify");
      }),
      Oo = we((e) => {
        "use strict";
        var t =
            (e && e.__createBinding) ||
            (Object.create
              ? function (a, i, l, s) {
                  s === void 0 && (s = l);
                  var c = Object.getOwnPropertyDescriptor(i, l);
                  (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) &&
                    (c = {
                      enumerable: !0,
                      get: E(function () {
                        return i[l];
                      }, "get"),
                    }),
                    Object.defineProperty(a, s, c);
                }
              : function (a, i, l, s) {
                  s === void 0 && (s = l), (a[s] = i[l]);
                }),
          r =
            (e && e.__exportStar) ||
            function (a, i) {
              for (var l in a) l !== "default" && !Object.prototype.hasOwnProperty.call(i, l) && t(i, a, l);
            };
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.stringify = e.parse = void 0);
        var n = Xf();
        Object.defineProperty(e, "parse", {
          enumerable: !0,
          get: E(function () {
            return n.parse;
          }, "get"),
        });
        var o = Qf();
        Object.defineProperty(e, "stringify", {
          enumerable: !0,
          get: E(function () {
            return o.stringify;
          }, "get"),
        }),
          r(Io(), e);
      }),
      Gs = we((e, t) => {
        t.exports = {
          Aacute: "\xC1",
          aacute: "\xE1",
          Abreve: "\u0102",
          abreve: "\u0103",
          ac: "\u223E",
          acd: "\u223F",
          acE: "\u223E\u0333",
          Acirc: "\xC2",
          acirc: "\xE2",
          acute: "\xB4",
          Acy: "\u0410",
          acy: "\u0430",
          AElig: "\xC6",
          aelig: "\xE6",
          af: "\u2061",
          Afr: "\u{1D504}",
          afr: "\u{1D51E}",
          Agrave: "\xC0",
          agrave: "\xE0",
          alefsym: "\u2135",
          aleph: "\u2135",
          Alpha: "\u0391",
          alpha: "\u03B1",
          Amacr: "\u0100",
          amacr: "\u0101",
          amalg: "\u2A3F",
          amp: "&",
          AMP: "&",
          andand: "\u2A55",
          And: "\u2A53",
          and: "\u2227",
          andd: "\u2A5C",
          andslope: "\u2A58",
          andv: "\u2A5A",
          ang: "\u2220",
          ange: "\u29A4",
          angle: "\u2220",
          angmsdaa: "\u29A8",
          angmsdab: "\u29A9",
          angmsdac: "\u29AA",
          angmsdad: "\u29AB",
          angmsdae: "\u29AC",
          angmsdaf: "\u29AD",
          angmsdag: "\u29AE",
          angmsdah: "\u29AF",
          angmsd: "\u2221",
          angrt: "\u221F",
          angrtvb: "\u22BE",
          angrtvbd: "\u299D",
          angsph: "\u2222",
          angst: "\xC5",
          angzarr: "\u237C",
          Aogon: "\u0104",
          aogon: "\u0105",
          Aopf: "\u{1D538}",
          aopf: "\u{1D552}",
          apacir: "\u2A6F",
          ap: "\u2248",
          apE: "\u2A70",
          ape: "\u224A",
          apid: "\u224B",
          apos: "'",
          ApplyFunction: "\u2061",
          approx: "\u2248",
          approxeq: "\u224A",
          Aring: "\xC5",
          aring: "\xE5",
          Ascr: "\u{1D49C}",
          ascr: "\u{1D4B6}",
          Assign: "\u2254",
          ast: "*",
          asymp: "\u2248",
          asympeq: "\u224D",
          Atilde: "\xC3",
          atilde: "\xE3",
          Auml: "\xC4",
          auml: "\xE4",
          awconint: "\u2233",
          awint: "\u2A11",
          backcong: "\u224C",
          backepsilon: "\u03F6",
          backprime: "\u2035",
          backsim: "\u223D",
          backsimeq: "\u22CD",
          Backslash: "\u2216",
          Barv: "\u2AE7",
          barvee: "\u22BD",
          barwed: "\u2305",
          Barwed: "\u2306",
          barwedge: "\u2305",
          bbrk: "\u23B5",
          bbrktbrk: "\u23B6",
          bcong: "\u224C",
          Bcy: "\u0411",
          bcy: "\u0431",
          bdquo: "\u201E",
          becaus: "\u2235",
          because: "\u2235",
          Because: "\u2235",
          bemptyv: "\u29B0",
          bepsi: "\u03F6",
          bernou: "\u212C",
          Bernoullis: "\u212C",
          Beta: "\u0392",
          beta: "\u03B2",
          beth: "\u2136",
          between: "\u226C",
          Bfr: "\u{1D505}",
          bfr: "\u{1D51F}",
          bigcap: "\u22C2",
          bigcirc: "\u25EF",
          bigcup: "\u22C3",
          bigodot: "\u2A00",
          bigoplus: "\u2A01",
          bigotimes: "\u2A02",
          bigsqcup: "\u2A06",
          bigstar: "\u2605",
          bigtriangledown: "\u25BD",
          bigtriangleup: "\u25B3",
          biguplus: "\u2A04",
          bigvee: "\u22C1",
          bigwedge: "\u22C0",
          bkarow: "\u290D",
          blacklozenge: "\u29EB",
          blacksquare: "\u25AA",
          blacktriangle: "\u25B4",
          blacktriangledown: "\u25BE",
          blacktriangleleft: "\u25C2",
          blacktriangleright: "\u25B8",
          blank: "\u2423",
          blk12: "\u2592",
          blk14: "\u2591",
          blk34: "\u2593",
          block: "\u2588",
          bne: "=\u20E5",
          bnequiv: "\u2261\u20E5",
          bNot: "\u2AED",
          bnot: "\u2310",
          Bopf: "\u{1D539}",
          bopf: "\u{1D553}",
          bot: "\u22A5",
          bottom: "\u22A5",
          bowtie: "\u22C8",
          boxbox: "\u29C9",
          boxdl: "\u2510",
          boxdL: "\u2555",
          boxDl: "\u2556",
          boxDL: "\u2557",
          boxdr: "\u250C",
          boxdR: "\u2552",
          boxDr: "\u2553",
          boxDR: "\u2554",
          boxh: "\u2500",
          boxH: "\u2550",
          boxhd: "\u252C",
          boxHd: "\u2564",
          boxhD: "\u2565",
          boxHD: "\u2566",
          boxhu: "\u2534",
          boxHu: "\u2567",
          boxhU: "\u2568",
          boxHU: "\u2569",
          boxminus: "\u229F",
          boxplus: "\u229E",
          boxtimes: "\u22A0",
          boxul: "\u2518",
          boxuL: "\u255B",
          boxUl: "\u255C",
          boxUL: "\u255D",
          boxur: "\u2514",
          boxuR: "\u2558",
          boxUr: "\u2559",
          boxUR: "\u255A",
          boxv: "\u2502",
          boxV: "\u2551",
          boxvh: "\u253C",
          boxvH: "\u256A",
          boxVh: "\u256B",
          boxVH: "\u256C",
          boxvl: "\u2524",
          boxvL: "\u2561",
          boxVl: "\u2562",
          boxVL: "\u2563",
          boxvr: "\u251C",
          boxvR: "\u255E",
          boxVr: "\u255F",
          boxVR: "\u2560",
          bprime: "\u2035",
          breve: "\u02D8",
          Breve: "\u02D8",
          brvbar: "\xA6",
          bscr: "\u{1D4B7}",
          Bscr: "\u212C",
          bsemi: "\u204F",
          bsim: "\u223D",
          bsime: "\u22CD",
          bsolb: "\u29C5",
          bsol: "\\",
          bsolhsub: "\u27C8",
          bull: "\u2022",
          bullet: "\u2022",
          bump: "\u224E",
          bumpE: "\u2AAE",
          bumpe: "\u224F",
          Bumpeq: "\u224E",
          bumpeq: "\u224F",
          Cacute: "\u0106",
          cacute: "\u0107",
          capand: "\u2A44",
          capbrcup: "\u2A49",
          capcap: "\u2A4B",
          cap: "\u2229",
          Cap: "\u22D2",
          capcup: "\u2A47",
          capdot: "\u2A40",
          CapitalDifferentialD: "\u2145",
          caps: "\u2229\uFE00",
          caret: "\u2041",
          caron: "\u02C7",
          Cayleys: "\u212D",
          ccaps: "\u2A4D",
          Ccaron: "\u010C",
          ccaron: "\u010D",
          Ccedil: "\xC7",
          ccedil: "\xE7",
          Ccirc: "\u0108",
          ccirc: "\u0109",
          Cconint: "\u2230",
          ccups: "\u2A4C",
          ccupssm: "\u2A50",
          Cdot: "\u010A",
          cdot: "\u010B",
          cedil: "\xB8",
          Cedilla: "\xB8",
          cemptyv: "\u29B2",
          cent: "\xA2",
          centerdot: "\xB7",
          CenterDot: "\xB7",
          cfr: "\u{1D520}",
          Cfr: "\u212D",
          CHcy: "\u0427",
          chcy: "\u0447",
          check: "\u2713",
          checkmark: "\u2713",
          Chi: "\u03A7",
          chi: "\u03C7",
          circ: "\u02C6",
          circeq: "\u2257",
          circlearrowleft: "\u21BA",
          circlearrowright: "\u21BB",
          circledast: "\u229B",
          circledcirc: "\u229A",
          circleddash: "\u229D",
          CircleDot: "\u2299",
          circledR: "\xAE",
          circledS: "\u24C8",
          CircleMinus: "\u2296",
          CirclePlus: "\u2295",
          CircleTimes: "\u2297",
          cir: "\u25CB",
          cirE: "\u29C3",
          cire: "\u2257",
          cirfnint: "\u2A10",
          cirmid: "\u2AEF",
          cirscir: "\u29C2",
          ClockwiseContourIntegral: "\u2232",
          CloseCurlyDoubleQuote: "\u201D",
          CloseCurlyQuote: "\u2019",
          clubs: "\u2663",
          clubsuit: "\u2663",
          colon: ":",
          Colon: "\u2237",
          Colone: "\u2A74",
          colone: "\u2254",
          coloneq: "\u2254",
          comma: ",",
          commat: "@",
          comp: "\u2201",
          compfn: "\u2218",
          complement: "\u2201",
          complexes: "\u2102",
          cong: "\u2245",
          congdot: "\u2A6D",
          Congruent: "\u2261",
          conint: "\u222E",
          Conint: "\u222F",
          ContourIntegral: "\u222E",
          copf: "\u{1D554}",
          Copf: "\u2102",
          coprod: "\u2210",
          Coproduct: "\u2210",
          copy: "\xA9",
          COPY: "\xA9",
          copysr: "\u2117",
          CounterClockwiseContourIntegral: "\u2233",
          crarr: "\u21B5",
          cross: "\u2717",
          Cross: "\u2A2F",
          Cscr: "\u{1D49E}",
          cscr: "\u{1D4B8}",
          csub: "\u2ACF",
          csube: "\u2AD1",
          csup: "\u2AD0",
          csupe: "\u2AD2",
          ctdot: "\u22EF",
          cudarrl: "\u2938",
          cudarrr: "\u2935",
          cuepr: "\u22DE",
          cuesc: "\u22DF",
          cularr: "\u21B6",
          cularrp: "\u293D",
          cupbrcap: "\u2A48",
          cupcap: "\u2A46",
          CupCap: "\u224D",
          cup: "\u222A",
          Cup: "\u22D3",
          cupcup: "\u2A4A",
          cupdot: "\u228D",
          cupor: "\u2A45",
          cups: "\u222A\uFE00",
          curarr: "\u21B7",
          curarrm: "\u293C",
          curlyeqprec: "\u22DE",
          curlyeqsucc: "\u22DF",
          curlyvee: "\u22CE",
          curlywedge: "\u22CF",
          curren: "\xA4",
          curvearrowleft: "\u21B6",
          curvearrowright: "\u21B7",
          cuvee: "\u22CE",
          cuwed: "\u22CF",
          cwconint: "\u2232",
          cwint: "\u2231",
          cylcty: "\u232D",
          dagger: "\u2020",
          Dagger: "\u2021",
          daleth: "\u2138",
          darr: "\u2193",
          Darr: "\u21A1",
          dArr: "\u21D3",
          dash: "\u2010",
          Dashv: "\u2AE4",
          dashv: "\u22A3",
          dbkarow: "\u290F",
          dblac: "\u02DD",
          Dcaron: "\u010E",
          dcaron: "\u010F",
          Dcy: "\u0414",
          dcy: "\u0434",
          ddagger: "\u2021",
          ddarr: "\u21CA",
          DD: "\u2145",
          dd: "\u2146",
          DDotrahd: "\u2911",
          ddotseq: "\u2A77",
          deg: "\xB0",
          Del: "\u2207",
          Delta: "\u0394",
          delta: "\u03B4",
          demptyv: "\u29B1",
          dfisht: "\u297F",
          Dfr: "\u{1D507}",
          dfr: "\u{1D521}",
          dHar: "\u2965",
          dharl: "\u21C3",
          dharr: "\u21C2",
          DiacriticalAcute: "\xB4",
          DiacriticalDot: "\u02D9",
          DiacriticalDoubleAcute: "\u02DD",
          DiacriticalGrave: "`",
          DiacriticalTilde: "\u02DC",
          diam: "\u22C4",
          diamond: "\u22C4",
          Diamond: "\u22C4",
          diamondsuit: "\u2666",
          diams: "\u2666",
          die: "\xA8",
          DifferentialD: "\u2146",
          digamma: "\u03DD",
          disin: "\u22F2",
          div: "\xF7",
          divide: "\xF7",
          divideontimes: "\u22C7",
          divonx: "\u22C7",
          DJcy: "\u0402",
          djcy: "\u0452",
          dlcorn: "\u231E",
          dlcrop: "\u230D",
          dollar: "$",
          Dopf: "\u{1D53B}",
          dopf: "\u{1D555}",
          Dot: "\xA8",
          dot: "\u02D9",
          DotDot: "\u20DC",
          doteq: "\u2250",
          doteqdot: "\u2251",
          DotEqual: "\u2250",
          dotminus: "\u2238",
          dotplus: "\u2214",
          dotsquare: "\u22A1",
          doublebarwedge: "\u2306",
          DoubleContourIntegral: "\u222F",
          DoubleDot: "\xA8",
          DoubleDownArrow: "\u21D3",
          DoubleLeftArrow: "\u21D0",
          DoubleLeftRightArrow: "\u21D4",
          DoubleLeftTee: "\u2AE4",
          DoubleLongLeftArrow: "\u27F8",
          DoubleLongLeftRightArrow: "\u27FA",
          DoubleLongRightArrow: "\u27F9",
          DoubleRightArrow: "\u21D2",
          DoubleRightTee: "\u22A8",
          DoubleUpArrow: "\u21D1",
          DoubleUpDownArrow: "\u21D5",
          DoubleVerticalBar: "\u2225",
          DownArrowBar: "\u2913",
          downarrow: "\u2193",
          DownArrow: "\u2193",
          Downarrow: "\u21D3",
          DownArrowUpArrow: "\u21F5",
          DownBreve: "\u0311",
          downdownarrows: "\u21CA",
          downharpoonleft: "\u21C3",
          downharpoonright: "\u21C2",
          DownLeftRightVector: "\u2950",
          DownLeftTeeVector: "\u295E",
          DownLeftVectorBar: "\u2956",
          DownLeftVector: "\u21BD",
          DownRightTeeVector: "\u295F",
          DownRightVectorBar: "\u2957",
          DownRightVector: "\u21C1",
          DownTeeArrow: "\u21A7",
          DownTee: "\u22A4",
          drbkarow: "\u2910",
          drcorn: "\u231F",
          drcrop: "\u230C",
          Dscr: "\u{1D49F}",
          dscr: "\u{1D4B9}",
          DScy: "\u0405",
          dscy: "\u0455",
          dsol: "\u29F6",
          Dstrok: "\u0110",
          dstrok: "\u0111",
          dtdot: "\u22F1",
          dtri: "\u25BF",
          dtrif: "\u25BE",
          duarr: "\u21F5",
          duhar: "\u296F",
          dwangle: "\u29A6",
          DZcy: "\u040F",
          dzcy: "\u045F",
          dzigrarr: "\u27FF",
          Eacute: "\xC9",
          eacute: "\xE9",
          easter: "\u2A6E",
          Ecaron: "\u011A",
          ecaron: "\u011B",
          Ecirc: "\xCA",
          ecirc: "\xEA",
          ecir: "\u2256",
          ecolon: "\u2255",
          Ecy: "\u042D",
          ecy: "\u044D",
          eDDot: "\u2A77",
          Edot: "\u0116",
          edot: "\u0117",
          eDot: "\u2251",
          ee: "\u2147",
          efDot: "\u2252",
          Efr: "\u{1D508}",
          efr: "\u{1D522}",
          eg: "\u2A9A",
          Egrave: "\xC8",
          egrave: "\xE8",
          egs: "\u2A96",
          egsdot: "\u2A98",
          el: "\u2A99",
          Element: "\u2208",
          elinters: "\u23E7",
          ell: "\u2113",
          els: "\u2A95",
          elsdot: "\u2A97",
          Emacr: "\u0112",
          emacr: "\u0113",
          empty: "\u2205",
          emptyset: "\u2205",
          EmptySmallSquare: "\u25FB",
          emptyv: "\u2205",
          EmptyVerySmallSquare: "\u25AB",
          emsp13: "\u2004",
          emsp14: "\u2005",
          emsp: "\u2003",
          ENG: "\u014A",
          eng: "\u014B",
          ensp: "\u2002",
          Eogon: "\u0118",
          eogon: "\u0119",
          Eopf: "\u{1D53C}",
          eopf: "\u{1D556}",
          epar: "\u22D5",
          eparsl: "\u29E3",
          eplus: "\u2A71",
          epsi: "\u03B5",
          Epsilon: "\u0395",
          epsilon: "\u03B5",
          epsiv: "\u03F5",
          eqcirc: "\u2256",
          eqcolon: "\u2255",
          eqsim: "\u2242",
          eqslantgtr: "\u2A96",
          eqslantless: "\u2A95",
          Equal: "\u2A75",
          equals: "=",
          EqualTilde: "\u2242",
          equest: "\u225F",
          Equilibrium: "\u21CC",
          equiv: "\u2261",
          equivDD: "\u2A78",
          eqvparsl: "\u29E5",
          erarr: "\u2971",
          erDot: "\u2253",
          escr: "\u212F",
          Escr: "\u2130",
          esdot: "\u2250",
          Esim: "\u2A73",
          esim: "\u2242",
          Eta: "\u0397",
          eta: "\u03B7",
          ETH: "\xD0",
          eth: "\xF0",
          Euml: "\xCB",
          euml: "\xEB",
          euro: "\u20AC",
          excl: "!",
          exist: "\u2203",
          Exists: "\u2203",
          expectation: "\u2130",
          exponentiale: "\u2147",
          ExponentialE: "\u2147",
          fallingdotseq: "\u2252",
          Fcy: "\u0424",
          fcy: "\u0444",
          female: "\u2640",
          ffilig: "\uFB03",
          fflig: "\uFB00",
          ffllig: "\uFB04",
          Ffr: "\u{1D509}",
          ffr: "\u{1D523}",
          filig: "\uFB01",
          FilledSmallSquare: "\u25FC",
          FilledVerySmallSquare: "\u25AA",
          fjlig: "fj",
          flat: "\u266D",
          fllig: "\uFB02",
          fltns: "\u25B1",
          fnof: "\u0192",
          Fopf: "\u{1D53D}",
          fopf: "\u{1D557}",
          forall: "\u2200",
          ForAll: "\u2200",
          fork: "\u22D4",
          forkv: "\u2AD9",
          Fouriertrf: "\u2131",
          fpartint: "\u2A0D",
          frac12: "\xBD",
          frac13: "\u2153",
          frac14: "\xBC",
          frac15: "\u2155",
          frac16: "\u2159",
          frac18: "\u215B",
          frac23: "\u2154",
          frac25: "\u2156",
          frac34: "\xBE",
          frac35: "\u2157",
          frac38: "\u215C",
          frac45: "\u2158",
          frac56: "\u215A",
          frac58: "\u215D",
          frac78: "\u215E",
          frasl: "\u2044",
          frown: "\u2322",
          fscr: "\u{1D4BB}",
          Fscr: "\u2131",
          gacute: "\u01F5",
          Gamma: "\u0393",
          gamma: "\u03B3",
          Gammad: "\u03DC",
          gammad: "\u03DD",
          gap: "\u2A86",
          Gbreve: "\u011E",
          gbreve: "\u011F",
          Gcedil: "\u0122",
          Gcirc: "\u011C",
          gcirc: "\u011D",
          Gcy: "\u0413",
          gcy: "\u0433",
          Gdot: "\u0120",
          gdot: "\u0121",
          ge: "\u2265",
          gE: "\u2267",
          gEl: "\u2A8C",
          gel: "\u22DB",
          geq: "\u2265",
          geqq: "\u2267",
          geqslant: "\u2A7E",
          gescc: "\u2AA9",
          ges: "\u2A7E",
          gesdot: "\u2A80",
          gesdoto: "\u2A82",
          gesdotol: "\u2A84",
          gesl: "\u22DB\uFE00",
          gesles: "\u2A94",
          Gfr: "\u{1D50A}",
          gfr: "\u{1D524}",
          gg: "\u226B",
          Gg: "\u22D9",
          ggg: "\u22D9",
          gimel: "\u2137",
          GJcy: "\u0403",
          gjcy: "\u0453",
          gla: "\u2AA5",
          gl: "\u2277",
          glE: "\u2A92",
          glj: "\u2AA4",
          gnap: "\u2A8A",
          gnapprox: "\u2A8A",
          gne: "\u2A88",
          gnE: "\u2269",
          gneq: "\u2A88",
          gneqq: "\u2269",
          gnsim: "\u22E7",
          Gopf: "\u{1D53E}",
          gopf: "\u{1D558}",
          grave: "`",
          GreaterEqual: "\u2265",
          GreaterEqualLess: "\u22DB",
          GreaterFullEqual: "\u2267",
          GreaterGreater: "\u2AA2",
          GreaterLess: "\u2277",
          GreaterSlantEqual: "\u2A7E",
          GreaterTilde: "\u2273",
          Gscr: "\u{1D4A2}",
          gscr: "\u210A",
          gsim: "\u2273",
          gsime: "\u2A8E",
          gsiml: "\u2A90",
          gtcc: "\u2AA7",
          gtcir: "\u2A7A",
          gt: ">",
          GT: ">",
          Gt: "\u226B",
          gtdot: "\u22D7",
          gtlPar: "\u2995",
          gtquest: "\u2A7C",
          gtrapprox: "\u2A86",
          gtrarr: "\u2978",
          gtrdot: "\u22D7",
          gtreqless: "\u22DB",
          gtreqqless: "\u2A8C",
          gtrless: "\u2277",
          gtrsim: "\u2273",
          gvertneqq: "\u2269\uFE00",
          gvnE: "\u2269\uFE00",
          Hacek: "\u02C7",
          hairsp: "\u200A",
          half: "\xBD",
          hamilt: "\u210B",
          HARDcy: "\u042A",
          hardcy: "\u044A",
          harrcir: "\u2948",
          harr: "\u2194",
          hArr: "\u21D4",
          harrw: "\u21AD",
          Hat: "^",
          hbar: "\u210F",
          Hcirc: "\u0124",
          hcirc: "\u0125",
          hearts: "\u2665",
          heartsuit: "\u2665",
          hellip: "\u2026",
          hercon: "\u22B9",
          hfr: "\u{1D525}",
          Hfr: "\u210C",
          HilbertSpace: "\u210B",
          hksearow: "\u2925",
          hkswarow: "\u2926",
          hoarr: "\u21FF",
          homtht: "\u223B",
          hookleftarrow: "\u21A9",
          hookrightarrow: "\u21AA",
          hopf: "\u{1D559}",
          Hopf: "\u210D",
          horbar: "\u2015",
          HorizontalLine: "\u2500",
          hscr: "\u{1D4BD}",
          Hscr: "\u210B",
          hslash: "\u210F",
          Hstrok: "\u0126",
          hstrok: "\u0127",
          HumpDownHump: "\u224E",
          HumpEqual: "\u224F",
          hybull: "\u2043",
          hyphen: "\u2010",
          Iacute: "\xCD",
          iacute: "\xED",
          ic: "\u2063",
          Icirc: "\xCE",
          icirc: "\xEE",
          Icy: "\u0418",
          icy: "\u0438",
          Idot: "\u0130",
          IEcy: "\u0415",
          iecy: "\u0435",
          iexcl: "\xA1",
          iff: "\u21D4",
          ifr: "\u{1D526}",
          Ifr: "\u2111",
          Igrave: "\xCC",
          igrave: "\xEC",
          ii: "\u2148",
          iiiint: "\u2A0C",
          iiint: "\u222D",
          iinfin: "\u29DC",
          iiota: "\u2129",
          IJlig: "\u0132",
          ijlig: "\u0133",
          Imacr: "\u012A",
          imacr: "\u012B",
          image: "\u2111",
          ImaginaryI: "\u2148",
          imagline: "\u2110",
          imagpart: "\u2111",
          imath: "\u0131",
          Im: "\u2111",
          imof: "\u22B7",
          imped: "\u01B5",
          Implies: "\u21D2",
          incare: "\u2105",
          in: "\u2208",
          infin: "\u221E",
          infintie: "\u29DD",
          inodot: "\u0131",
          intcal: "\u22BA",
          int: "\u222B",
          Int: "\u222C",
          integers: "\u2124",
          Integral: "\u222B",
          intercal: "\u22BA",
          Intersection: "\u22C2",
          intlarhk: "\u2A17",
          intprod: "\u2A3C",
          InvisibleComma: "\u2063",
          InvisibleTimes: "\u2062",
          IOcy: "\u0401",
          iocy: "\u0451",
          Iogon: "\u012E",
          iogon: "\u012F",
          Iopf: "\u{1D540}",
          iopf: "\u{1D55A}",
          Iota: "\u0399",
          iota: "\u03B9",
          iprod: "\u2A3C",
          iquest: "\xBF",
          iscr: "\u{1D4BE}",
          Iscr: "\u2110",
          isin: "\u2208",
          isindot: "\u22F5",
          isinE: "\u22F9",
          isins: "\u22F4",
          isinsv: "\u22F3",
          isinv: "\u2208",
          it: "\u2062",
          Itilde: "\u0128",
          itilde: "\u0129",
          Iukcy: "\u0406",
          iukcy: "\u0456",
          Iuml: "\xCF",
          iuml: "\xEF",
          Jcirc: "\u0134",
          jcirc: "\u0135",
          Jcy: "\u0419",
          jcy: "\u0439",
          Jfr: "\u{1D50D}",
          jfr: "\u{1D527}",
          jmath: "\u0237",
          Jopf: "\u{1D541}",
          jopf: "\u{1D55B}",
          Jscr: "\u{1D4A5}",
          jscr: "\u{1D4BF}",
          Jsercy: "\u0408",
          jsercy: "\u0458",
          Jukcy: "\u0404",
          jukcy: "\u0454",
          Kappa: "\u039A",
          kappa: "\u03BA",
          kappav: "\u03F0",
          Kcedil: "\u0136",
          kcedil: "\u0137",
          Kcy: "\u041A",
          kcy: "\u043A",
          Kfr: "\u{1D50E}",
          kfr: "\u{1D528}",
          kgreen: "\u0138",
          KHcy: "\u0425",
          khcy: "\u0445",
          KJcy: "\u040C",
          kjcy: "\u045C",
          Kopf: "\u{1D542}",
          kopf: "\u{1D55C}",
          Kscr: "\u{1D4A6}",
          kscr: "\u{1D4C0}",
          lAarr: "\u21DA",
          Lacute: "\u0139",
          lacute: "\u013A",
          laemptyv: "\u29B4",
          lagran: "\u2112",
          Lambda: "\u039B",
          lambda: "\u03BB",
          lang: "\u27E8",
          Lang: "\u27EA",
          langd: "\u2991",
          langle: "\u27E8",
          lap: "\u2A85",
          Laplacetrf: "\u2112",
          laquo: "\xAB",
          larrb: "\u21E4",
          larrbfs: "\u291F",
          larr: "\u2190",
          Larr: "\u219E",
          lArr: "\u21D0",
          larrfs: "\u291D",
          larrhk: "\u21A9",
          larrlp: "\u21AB",
          larrpl: "\u2939",
          larrsim: "\u2973",
          larrtl: "\u21A2",
          latail: "\u2919",
          lAtail: "\u291B",
          lat: "\u2AAB",
          late: "\u2AAD",
          lates: "\u2AAD\uFE00",
          lbarr: "\u290C",
          lBarr: "\u290E",
          lbbrk: "\u2772",
          lbrace: "{",
          lbrack: "[",
          lbrke: "\u298B",
          lbrksld: "\u298F",
          lbrkslu: "\u298D",
          Lcaron: "\u013D",
          lcaron: "\u013E",
          Lcedil: "\u013B",
          lcedil: "\u013C",
          lceil: "\u2308",
          lcub: "{",
          Lcy: "\u041B",
          lcy: "\u043B",
          ldca: "\u2936",
          ldquo: "\u201C",
          ldquor: "\u201E",
          ldrdhar: "\u2967",
          ldrushar: "\u294B",
          ldsh: "\u21B2",
          le: "\u2264",
          lE: "\u2266",
          LeftAngleBracket: "\u27E8",
          LeftArrowBar: "\u21E4",
          leftarrow: "\u2190",
          LeftArrow: "\u2190",
          Leftarrow: "\u21D0",
          LeftArrowRightArrow: "\u21C6",
          leftarrowtail: "\u21A2",
          LeftCeiling: "\u2308",
          LeftDoubleBracket: "\u27E6",
          LeftDownTeeVector: "\u2961",
          LeftDownVectorBar: "\u2959",
          LeftDownVector: "\u21C3",
          LeftFloor: "\u230A",
          leftharpoondown: "\u21BD",
          leftharpoonup: "\u21BC",
          leftleftarrows: "\u21C7",
          leftrightarrow: "\u2194",
          LeftRightArrow: "\u2194",
          Leftrightarrow: "\u21D4",
          leftrightarrows: "\u21C6",
          leftrightharpoons: "\u21CB",
          leftrightsquigarrow: "\u21AD",
          LeftRightVector: "\u294E",
          LeftTeeArrow: "\u21A4",
          LeftTee: "\u22A3",
          LeftTeeVector: "\u295A",
          leftthreetimes: "\u22CB",
          LeftTriangleBar: "\u29CF",
          LeftTriangle: "\u22B2",
          LeftTriangleEqual: "\u22B4",
          LeftUpDownVector: "\u2951",
          LeftUpTeeVector: "\u2960",
          LeftUpVectorBar: "\u2958",
          LeftUpVector: "\u21BF",
          LeftVectorBar: "\u2952",
          LeftVector: "\u21BC",
          lEg: "\u2A8B",
          leg: "\u22DA",
          leq: "\u2264",
          leqq: "\u2266",
          leqslant: "\u2A7D",
          lescc: "\u2AA8",
          les: "\u2A7D",
          lesdot: "\u2A7F",
          lesdoto: "\u2A81",
          lesdotor: "\u2A83",
          lesg: "\u22DA\uFE00",
          lesges: "\u2A93",
          lessapprox: "\u2A85",
          lessdot: "\u22D6",
          lesseqgtr: "\u22DA",
          lesseqqgtr: "\u2A8B",
          LessEqualGreater: "\u22DA",
          LessFullEqual: "\u2266",
          LessGreater: "\u2276",
          lessgtr: "\u2276",
          LessLess: "\u2AA1",
          lesssim: "\u2272",
          LessSlantEqual: "\u2A7D",
          LessTilde: "\u2272",
          lfisht: "\u297C",
          lfloor: "\u230A",
          Lfr: "\u{1D50F}",
          lfr: "\u{1D529}",
          lg: "\u2276",
          lgE: "\u2A91",
          lHar: "\u2962",
          lhard: "\u21BD",
          lharu: "\u21BC",
          lharul: "\u296A",
          lhblk: "\u2584",
          LJcy: "\u0409",
          ljcy: "\u0459",
          llarr: "\u21C7",
          ll: "\u226A",
          Ll: "\u22D8",
          llcorner: "\u231E",
          Lleftarrow: "\u21DA",
          llhard: "\u296B",
          lltri: "\u25FA",
          Lmidot: "\u013F",
          lmidot: "\u0140",
          lmoustache: "\u23B0",
          lmoust: "\u23B0",
          lnap: "\u2A89",
          lnapprox: "\u2A89",
          lne: "\u2A87",
          lnE: "\u2268",
          lneq: "\u2A87",
          lneqq: "\u2268",
          lnsim: "\u22E6",
          loang: "\u27EC",
          loarr: "\u21FD",
          lobrk: "\u27E6",
          longleftarrow: "\u27F5",
          LongLeftArrow: "\u27F5",
          Longleftarrow: "\u27F8",
          longleftrightarrow: "\u27F7",
          LongLeftRightArrow: "\u27F7",
          Longleftrightarrow: "\u27FA",
          longmapsto: "\u27FC",
          longrightarrow: "\u27F6",
          LongRightArrow: "\u27F6",
          Longrightarrow: "\u27F9",
          looparrowleft: "\u21AB",
          looparrowright: "\u21AC",
          lopar: "\u2985",
          Lopf: "\u{1D543}",
          lopf: "\u{1D55D}",
          loplus: "\u2A2D",
          lotimes: "\u2A34",
          lowast: "\u2217",
          lowbar: "_",
          LowerLeftArrow: "\u2199",
          LowerRightArrow: "\u2198",
          loz: "\u25CA",
          lozenge: "\u25CA",
          lozf: "\u29EB",
          lpar: "(",
          lparlt: "\u2993",
          lrarr: "\u21C6",
          lrcorner: "\u231F",
          lrhar: "\u21CB",
          lrhard: "\u296D",
          lrm: "\u200E",
          lrtri: "\u22BF",
          lsaquo: "\u2039",
          lscr: "\u{1D4C1}",
          Lscr: "\u2112",
          lsh: "\u21B0",
          Lsh: "\u21B0",
          lsim: "\u2272",
          lsime: "\u2A8D",
          lsimg: "\u2A8F",
          lsqb: "[",
          lsquo: "\u2018",
          lsquor: "\u201A",
          Lstrok: "\u0141",
          lstrok: "\u0142",
          ltcc: "\u2AA6",
          ltcir: "\u2A79",
          lt: "<",
          LT: "<",
          Lt: "\u226A",
          ltdot: "\u22D6",
          lthree: "\u22CB",
          ltimes: "\u22C9",
          ltlarr: "\u2976",
          ltquest: "\u2A7B",
          ltri: "\u25C3",
          ltrie: "\u22B4",
          ltrif: "\u25C2",
          ltrPar: "\u2996",
          lurdshar: "\u294A",
          luruhar: "\u2966",
          lvertneqq: "\u2268\uFE00",
          lvnE: "\u2268\uFE00",
          macr: "\xAF",
          male: "\u2642",
          malt: "\u2720",
          maltese: "\u2720",
          Map: "\u2905",
          map: "\u21A6",
          mapsto: "\u21A6",
          mapstodown: "\u21A7",
          mapstoleft: "\u21A4",
          mapstoup: "\u21A5",
          marker: "\u25AE",
          mcomma: "\u2A29",
          Mcy: "\u041C",
          mcy: "\u043C",
          mdash: "\u2014",
          mDDot: "\u223A",
          measuredangle: "\u2221",
          MediumSpace: "\u205F",
          Mellintrf: "\u2133",
          Mfr: "\u{1D510}",
          mfr: "\u{1D52A}",
          mho: "\u2127",
          micro: "\xB5",
          midast: "*",
          midcir: "\u2AF0",
          mid: "\u2223",
          middot: "\xB7",
          minusb: "\u229F",
          minus: "\u2212",
          minusd: "\u2238",
          minusdu: "\u2A2A",
          MinusPlus: "\u2213",
          mlcp: "\u2ADB",
          mldr: "\u2026",
          mnplus: "\u2213",
          models: "\u22A7",
          Mopf: "\u{1D544}",
          mopf: "\u{1D55E}",
          mp: "\u2213",
          mscr: "\u{1D4C2}",
          Mscr: "\u2133",
          mstpos: "\u223E",
          Mu: "\u039C",
          mu: "\u03BC",
          multimap: "\u22B8",
          mumap: "\u22B8",
          nabla: "\u2207",
          Nacute: "\u0143",
          nacute: "\u0144",
          nang: "\u2220\u20D2",
          nap: "\u2249",
          napE: "\u2A70\u0338",
          napid: "\u224B\u0338",
          napos: "\u0149",
          napprox: "\u2249",
          natural: "\u266E",
          naturals: "\u2115",
          natur: "\u266E",
          nbsp: "\xA0",
          nbump: "\u224E\u0338",
          nbumpe: "\u224F\u0338",
          ncap: "\u2A43",
          Ncaron: "\u0147",
          ncaron: "\u0148",
          Ncedil: "\u0145",
          ncedil: "\u0146",
          ncong: "\u2247",
          ncongdot: "\u2A6D\u0338",
          ncup: "\u2A42",
          Ncy: "\u041D",
          ncy: "\u043D",
          ndash: "\u2013",
          nearhk: "\u2924",
          nearr: "\u2197",
          neArr: "\u21D7",
          nearrow: "\u2197",
          ne: "\u2260",
          nedot: "\u2250\u0338",
          NegativeMediumSpace: "\u200B",
          NegativeThickSpace: "\u200B",
          NegativeThinSpace: "\u200B",
          NegativeVeryThinSpace: "\u200B",
          nequiv: "\u2262",
          nesear: "\u2928",
          nesim: "\u2242\u0338",
          NestedGreaterGreater: "\u226B",
          NestedLessLess: "\u226A",
          NewLine: `
`,
          nexist: "\u2204",
          nexists: "\u2204",
          Nfr: "\u{1D511}",
          nfr: "\u{1D52B}",
          ngE: "\u2267\u0338",
          nge: "\u2271",
          ngeq: "\u2271",
          ngeqq: "\u2267\u0338",
          ngeqslant: "\u2A7E\u0338",
          nges: "\u2A7E\u0338",
          nGg: "\u22D9\u0338",
          ngsim: "\u2275",
          nGt: "\u226B\u20D2",
          ngt: "\u226F",
          ngtr: "\u226F",
          nGtv: "\u226B\u0338",
          nharr: "\u21AE",
          nhArr: "\u21CE",
          nhpar: "\u2AF2",
          ni: "\u220B",
          nis: "\u22FC",
          nisd: "\u22FA",
          niv: "\u220B",
          NJcy: "\u040A",
          njcy: "\u045A",
          nlarr: "\u219A",
          nlArr: "\u21CD",
          nldr: "\u2025",
          nlE: "\u2266\u0338",
          nle: "\u2270",
          nleftarrow: "\u219A",
          nLeftarrow: "\u21CD",
          nleftrightarrow: "\u21AE",
          nLeftrightarrow: "\u21CE",
          nleq: "\u2270",
          nleqq: "\u2266\u0338",
          nleqslant: "\u2A7D\u0338",
          nles: "\u2A7D\u0338",
          nless: "\u226E",
          nLl: "\u22D8\u0338",
          nlsim: "\u2274",
          nLt: "\u226A\u20D2",
          nlt: "\u226E",
          nltri: "\u22EA",
          nltrie: "\u22EC",
          nLtv: "\u226A\u0338",
          nmid: "\u2224",
          NoBreak: "\u2060",
          NonBreakingSpace: "\xA0",
          nopf: "\u{1D55F}",
          Nopf: "\u2115",
          Not: "\u2AEC",
          not: "\xAC",
          NotCongruent: "\u2262",
          NotCupCap: "\u226D",
          NotDoubleVerticalBar: "\u2226",
          NotElement: "\u2209",
          NotEqual: "\u2260",
          NotEqualTilde: "\u2242\u0338",
          NotExists: "\u2204",
          NotGreater: "\u226F",
          NotGreaterEqual: "\u2271",
          NotGreaterFullEqual: "\u2267\u0338",
          NotGreaterGreater: "\u226B\u0338",
          NotGreaterLess: "\u2279",
          NotGreaterSlantEqual: "\u2A7E\u0338",
          NotGreaterTilde: "\u2275",
          NotHumpDownHump: "\u224E\u0338",
          NotHumpEqual: "\u224F\u0338",
          notin: "\u2209",
          notindot: "\u22F5\u0338",
          notinE: "\u22F9\u0338",
          notinva: "\u2209",
          notinvb: "\u22F7",
          notinvc: "\u22F6",
          NotLeftTriangleBar: "\u29CF\u0338",
          NotLeftTriangle: "\u22EA",
          NotLeftTriangleEqual: "\u22EC",
          NotLess: "\u226E",
          NotLessEqual: "\u2270",
          NotLessGreater: "\u2278",
          NotLessLess: "\u226A\u0338",
          NotLessSlantEqual: "\u2A7D\u0338",
          NotLessTilde: "\u2274",
          NotNestedGreaterGreater: "\u2AA2\u0338",
          NotNestedLessLess: "\u2AA1\u0338",
          notni: "\u220C",
          notniva: "\u220C",
          notnivb: "\u22FE",
          notnivc: "\u22FD",
          NotPrecedes: "\u2280",
          NotPrecedesEqual: "\u2AAF\u0338",
          NotPrecedesSlantEqual: "\u22E0",
          NotReverseElement: "\u220C",
          NotRightTriangleBar: "\u29D0\u0338",
          NotRightTriangle: "\u22EB",
          NotRightTriangleEqual: "\u22ED",
          NotSquareSubset: "\u228F\u0338",
          NotSquareSubsetEqual: "\u22E2",
          NotSquareSuperset: "\u2290\u0338",
          NotSquareSupersetEqual: "\u22E3",
          NotSubset: "\u2282\u20D2",
          NotSubsetEqual: "\u2288",
          NotSucceeds: "\u2281",
          NotSucceedsEqual: "\u2AB0\u0338",
          NotSucceedsSlantEqual: "\u22E1",
          NotSucceedsTilde: "\u227F\u0338",
          NotSuperset: "\u2283\u20D2",
          NotSupersetEqual: "\u2289",
          NotTilde: "\u2241",
          NotTildeEqual: "\u2244",
          NotTildeFullEqual: "\u2247",
          NotTildeTilde: "\u2249",
          NotVerticalBar: "\u2224",
          nparallel: "\u2226",
          npar: "\u2226",
          nparsl: "\u2AFD\u20E5",
          npart: "\u2202\u0338",
          npolint: "\u2A14",
          npr: "\u2280",
          nprcue: "\u22E0",
          nprec: "\u2280",
          npreceq: "\u2AAF\u0338",
          npre: "\u2AAF\u0338",
          nrarrc: "\u2933\u0338",
          nrarr: "\u219B",
          nrArr: "\u21CF",
          nrarrw: "\u219D\u0338",
          nrightarrow: "\u219B",
          nRightarrow: "\u21CF",
          nrtri: "\u22EB",
          nrtrie: "\u22ED",
          nsc: "\u2281",
          nsccue: "\u22E1",
          nsce: "\u2AB0\u0338",
          Nscr: "\u{1D4A9}",
          nscr: "\u{1D4C3}",
          nshortmid: "\u2224",
          nshortparallel: "\u2226",
          nsim: "\u2241",
          nsime: "\u2244",
          nsimeq: "\u2244",
          nsmid: "\u2224",
          nspar: "\u2226",
          nsqsube: "\u22E2",
          nsqsupe: "\u22E3",
          nsub: "\u2284",
          nsubE: "\u2AC5\u0338",
          nsube: "\u2288",
          nsubset: "\u2282\u20D2",
          nsubseteq: "\u2288",
          nsubseteqq: "\u2AC5\u0338",
          nsucc: "\u2281",
          nsucceq: "\u2AB0\u0338",
          nsup: "\u2285",
          nsupE: "\u2AC6\u0338",
          nsupe: "\u2289",
          nsupset: "\u2283\u20D2",
          nsupseteq: "\u2289",
          nsupseteqq: "\u2AC6\u0338",
          ntgl: "\u2279",
          Ntilde: "\xD1",
          ntilde: "\xF1",
          ntlg: "\u2278",
          ntriangleleft: "\u22EA",
          ntrianglelefteq: "\u22EC",
          ntriangleright: "\u22EB",
          ntrianglerighteq: "\u22ED",
          Nu: "\u039D",
          nu: "\u03BD",
          num: "#",
          numero: "\u2116",
          numsp: "\u2007",
          nvap: "\u224D\u20D2",
          nvdash: "\u22AC",
          nvDash: "\u22AD",
          nVdash: "\u22AE",
          nVDash: "\u22AF",
          nvge: "\u2265\u20D2",
          nvgt: ">\u20D2",
          nvHarr: "\u2904",
          nvinfin: "\u29DE",
          nvlArr: "\u2902",
          nvle: "\u2264\u20D2",
          nvlt: "<\u20D2",
          nvltrie: "\u22B4\u20D2",
          nvrArr: "\u2903",
          nvrtrie: "\u22B5\u20D2",
          nvsim: "\u223C\u20D2",
          nwarhk: "\u2923",
          nwarr: "\u2196",
          nwArr: "\u21D6",
          nwarrow: "\u2196",
          nwnear: "\u2927",
          Oacute: "\xD3",
          oacute: "\xF3",
          oast: "\u229B",
          Ocirc: "\xD4",
          ocirc: "\xF4",
          ocir: "\u229A",
          Ocy: "\u041E",
          ocy: "\u043E",
          odash: "\u229D",
          Odblac: "\u0150",
          odblac: "\u0151",
          odiv: "\u2A38",
          odot: "\u2299",
          odsold: "\u29BC",
          OElig: "\u0152",
          oelig: "\u0153",
          ofcir: "\u29BF",
          Ofr: "\u{1D512}",
          ofr: "\u{1D52C}",
          ogon: "\u02DB",
          Ograve: "\xD2",
          ograve: "\xF2",
          ogt: "\u29C1",
          ohbar: "\u29B5",
          ohm: "\u03A9",
          oint: "\u222E",
          olarr: "\u21BA",
          olcir: "\u29BE",
          olcross: "\u29BB",
          oline: "\u203E",
          olt: "\u29C0",
          Omacr: "\u014C",
          omacr: "\u014D",
          Omega: "\u03A9",
          omega: "\u03C9",
          Omicron: "\u039F",
          omicron: "\u03BF",
          omid: "\u29B6",
          ominus: "\u2296",
          Oopf: "\u{1D546}",
          oopf: "\u{1D560}",
          opar: "\u29B7",
          OpenCurlyDoubleQuote: "\u201C",
          OpenCurlyQuote: "\u2018",
          operp: "\u29B9",
          oplus: "\u2295",
          orarr: "\u21BB",
          Or: "\u2A54",
          or: "\u2228",
          ord: "\u2A5D",
          order: "\u2134",
          orderof: "\u2134",
          ordf: "\xAA",
          ordm: "\xBA",
          origof: "\u22B6",
          oror: "\u2A56",
          orslope: "\u2A57",
          orv: "\u2A5B",
          oS: "\u24C8",
          Oscr: "\u{1D4AA}",
          oscr: "\u2134",
          Oslash: "\xD8",
          oslash: "\xF8",
          osol: "\u2298",
          Otilde: "\xD5",
          otilde: "\xF5",
          otimesas: "\u2A36",
          Otimes: "\u2A37",
          otimes: "\u2297",
          Ouml: "\xD6",
          ouml: "\xF6",
          ovbar: "\u233D",
          OverBar: "\u203E",
          OverBrace: "\u23DE",
          OverBracket: "\u23B4",
          OverParenthesis: "\u23DC",
          para: "\xB6",
          parallel: "\u2225",
          par: "\u2225",
          parsim: "\u2AF3",
          parsl: "\u2AFD",
          part: "\u2202",
          PartialD: "\u2202",
          Pcy: "\u041F",
          pcy: "\u043F",
          percnt: "%",
          period: ".",
          permil: "\u2030",
          perp: "\u22A5",
          pertenk: "\u2031",
          Pfr: "\u{1D513}",
          pfr: "\u{1D52D}",
          Phi: "\u03A6",
          phi: "\u03C6",
          phiv: "\u03D5",
          phmmat: "\u2133",
          phone: "\u260E",
          Pi: "\u03A0",
          pi: "\u03C0",
          pitchfork: "\u22D4",
          piv: "\u03D6",
          planck: "\u210F",
          planckh: "\u210E",
          plankv: "\u210F",
          plusacir: "\u2A23",
          plusb: "\u229E",
          pluscir: "\u2A22",
          plus: "+",
          plusdo: "\u2214",
          plusdu: "\u2A25",
          pluse: "\u2A72",
          PlusMinus: "\xB1",
          plusmn: "\xB1",
          plussim: "\u2A26",
          plustwo: "\u2A27",
          pm: "\xB1",
          Poincareplane: "\u210C",
          pointint: "\u2A15",
          popf: "\u{1D561}",
          Popf: "\u2119",
          pound: "\xA3",
          prap: "\u2AB7",
          Pr: "\u2ABB",
          pr: "\u227A",
          prcue: "\u227C",
          precapprox: "\u2AB7",
          prec: "\u227A",
          preccurlyeq: "\u227C",
          Precedes: "\u227A",
          PrecedesEqual: "\u2AAF",
          PrecedesSlantEqual: "\u227C",
          PrecedesTilde: "\u227E",
          preceq: "\u2AAF",
          precnapprox: "\u2AB9",
          precneqq: "\u2AB5",
          precnsim: "\u22E8",
          pre: "\u2AAF",
          prE: "\u2AB3",
          precsim: "\u227E",
          prime: "\u2032",
          Prime: "\u2033",
          primes: "\u2119",
          prnap: "\u2AB9",
          prnE: "\u2AB5",
          prnsim: "\u22E8",
          prod: "\u220F",
          Product: "\u220F",
          profalar: "\u232E",
          profline: "\u2312",
          profsurf: "\u2313",
          prop: "\u221D",
          Proportional: "\u221D",
          Proportion: "\u2237",
          propto: "\u221D",
          prsim: "\u227E",
          prurel: "\u22B0",
          Pscr: "\u{1D4AB}",
          pscr: "\u{1D4C5}",
          Psi: "\u03A8",
          psi: "\u03C8",
          puncsp: "\u2008",
          Qfr: "\u{1D514}",
          qfr: "\u{1D52E}",
          qint: "\u2A0C",
          qopf: "\u{1D562}",
          Qopf: "\u211A",
          qprime: "\u2057",
          Qscr: "\u{1D4AC}",
          qscr: "\u{1D4C6}",
          quaternions: "\u210D",
          quatint: "\u2A16",
          quest: "?",
          questeq: "\u225F",
          quot: '"',
          QUOT: '"',
          rAarr: "\u21DB",
          race: "\u223D\u0331",
          Racute: "\u0154",
          racute: "\u0155",
          radic: "\u221A",
          raemptyv: "\u29B3",
          rang: "\u27E9",
          Rang: "\u27EB",
          rangd: "\u2992",
          range: "\u29A5",
          rangle: "\u27E9",
          raquo: "\xBB",
          rarrap: "\u2975",
          rarrb: "\u21E5",
          rarrbfs: "\u2920",
          rarrc: "\u2933",
          rarr: "\u2192",
          Rarr: "\u21A0",
          rArr: "\u21D2",
          rarrfs: "\u291E",
          rarrhk: "\u21AA",
          rarrlp: "\u21AC",
          rarrpl: "\u2945",
          rarrsim: "\u2974",
          Rarrtl: "\u2916",
          rarrtl: "\u21A3",
          rarrw: "\u219D",
          ratail: "\u291A",
          rAtail: "\u291C",
          ratio: "\u2236",
          rationals: "\u211A",
          rbarr: "\u290D",
          rBarr: "\u290F",
          RBarr: "\u2910",
          rbbrk: "\u2773",
          rbrace: "}",
          rbrack: "]",
          rbrke: "\u298C",
          rbrksld: "\u298E",
          rbrkslu: "\u2990",
          Rcaron: "\u0158",
          rcaron: "\u0159",
          Rcedil: "\u0156",
          rcedil: "\u0157",
          rceil: "\u2309",
          rcub: "}",
          Rcy: "\u0420",
          rcy: "\u0440",
          rdca: "\u2937",
          rdldhar: "\u2969",
          rdquo: "\u201D",
          rdquor: "\u201D",
          rdsh: "\u21B3",
          real: "\u211C",
          realine: "\u211B",
          realpart: "\u211C",
          reals: "\u211D",
          Re: "\u211C",
          rect: "\u25AD",
          reg: "\xAE",
          REG: "\xAE",
          ReverseElement: "\u220B",
          ReverseEquilibrium: "\u21CB",
          ReverseUpEquilibrium: "\u296F",
          rfisht: "\u297D",
          rfloor: "\u230B",
          rfr: "\u{1D52F}",
          Rfr: "\u211C",
          rHar: "\u2964",
          rhard: "\u21C1",
          rharu: "\u21C0",
          rharul: "\u296C",
          Rho: "\u03A1",
          rho: "\u03C1",
          rhov: "\u03F1",
          RightAngleBracket: "\u27E9",
          RightArrowBar: "\u21E5",
          rightarrow: "\u2192",
          RightArrow: "\u2192",
          Rightarrow: "\u21D2",
          RightArrowLeftArrow: "\u21C4",
          rightarrowtail: "\u21A3",
          RightCeiling: "\u2309",
          RightDoubleBracket: "\u27E7",
          RightDownTeeVector: "\u295D",
          RightDownVectorBar: "\u2955",
          RightDownVector: "\u21C2",
          RightFloor: "\u230B",
          rightharpoondown: "\u21C1",
          rightharpoonup: "\u21C0",
          rightleftarrows: "\u21C4",
          rightleftharpoons: "\u21CC",
          rightrightarrows: "\u21C9",
          rightsquigarrow: "\u219D",
          RightTeeArrow: "\u21A6",
          RightTee: "\u22A2",
          RightTeeVector: "\u295B",
          rightthreetimes: "\u22CC",
          RightTriangleBar: "\u29D0",
          RightTriangle: "\u22B3",
          RightTriangleEqual: "\u22B5",
          RightUpDownVector: "\u294F",
          RightUpTeeVector: "\u295C",
          RightUpVectorBar: "\u2954",
          RightUpVector: "\u21BE",
          RightVectorBar: "\u2953",
          RightVector: "\u21C0",
          ring: "\u02DA",
          risingdotseq: "\u2253",
          rlarr: "\u21C4",
          rlhar: "\u21CC",
          rlm: "\u200F",
          rmoustache: "\u23B1",
          rmoust: "\u23B1",
          rnmid: "\u2AEE",
          roang: "\u27ED",
          roarr: "\u21FE",
          robrk: "\u27E7",
          ropar: "\u2986",
          ropf: "\u{1D563}",
          Ropf: "\u211D",
          roplus: "\u2A2E",
          rotimes: "\u2A35",
          RoundImplies: "\u2970",
          rpar: ")",
          rpargt: "\u2994",
          rppolint: "\u2A12",
          rrarr: "\u21C9",
          Rrightarrow: "\u21DB",
          rsaquo: "\u203A",
          rscr: "\u{1D4C7}",
          Rscr: "\u211B",
          rsh: "\u21B1",
          Rsh: "\u21B1",
          rsqb: "]",
          rsquo: "\u2019",
          rsquor: "\u2019",
          rthree: "\u22CC",
          rtimes: "\u22CA",
          rtri: "\u25B9",
          rtrie: "\u22B5",
          rtrif: "\u25B8",
          rtriltri: "\u29CE",
          RuleDelayed: "\u29F4",
          ruluhar: "\u2968",
          rx: "\u211E",
          Sacute: "\u015A",
          sacute: "\u015B",
          sbquo: "\u201A",
          scap: "\u2AB8",
          Scaron: "\u0160",
          scaron: "\u0161",
          Sc: "\u2ABC",
          sc: "\u227B",
          sccue: "\u227D",
          sce: "\u2AB0",
          scE: "\u2AB4",
          Scedil: "\u015E",
          scedil: "\u015F",
          Scirc: "\u015C",
          scirc: "\u015D",
          scnap: "\u2ABA",
          scnE: "\u2AB6",
          scnsim: "\u22E9",
          scpolint: "\u2A13",
          scsim: "\u227F",
          Scy: "\u0421",
          scy: "\u0441",
          sdotb: "\u22A1",
          sdot: "\u22C5",
          sdote: "\u2A66",
          searhk: "\u2925",
          searr: "\u2198",
          seArr: "\u21D8",
          searrow: "\u2198",
          sect: "\xA7",
          semi: ";",
          seswar: "\u2929",
          setminus: "\u2216",
          setmn: "\u2216",
          sext: "\u2736",
          Sfr: "\u{1D516}",
          sfr: "\u{1D530}",
          sfrown: "\u2322",
          sharp: "\u266F",
          SHCHcy: "\u0429",
          shchcy: "\u0449",
          SHcy: "\u0428",
          shcy: "\u0448",
          ShortDownArrow: "\u2193",
          ShortLeftArrow: "\u2190",
          shortmid: "\u2223",
          shortparallel: "\u2225",
          ShortRightArrow: "\u2192",
          ShortUpArrow: "\u2191",
          shy: "\xAD",
          Sigma: "\u03A3",
          sigma: "\u03C3",
          sigmaf: "\u03C2",
          sigmav: "\u03C2",
          sim: "\u223C",
          simdot: "\u2A6A",
          sime: "\u2243",
          simeq: "\u2243",
          simg: "\u2A9E",
          simgE: "\u2AA0",
          siml: "\u2A9D",
          simlE: "\u2A9F",
          simne: "\u2246",
          simplus: "\u2A24",
          simrarr: "\u2972",
          slarr: "\u2190",
          SmallCircle: "\u2218",
          smallsetminus: "\u2216",
          smashp: "\u2A33",
          smeparsl: "\u29E4",
          smid: "\u2223",
          smile: "\u2323",
          smt: "\u2AAA",
          smte: "\u2AAC",
          smtes: "\u2AAC\uFE00",
          SOFTcy: "\u042C",
          softcy: "\u044C",
          solbar: "\u233F",
          solb: "\u29C4",
          sol: "/",
          Sopf: "\u{1D54A}",
          sopf: "\u{1D564}",
          spades: "\u2660",
          spadesuit: "\u2660",
          spar: "\u2225",
          sqcap: "\u2293",
          sqcaps: "\u2293\uFE00",
          sqcup: "\u2294",
          sqcups: "\u2294\uFE00",
          Sqrt: "\u221A",
          sqsub: "\u228F",
          sqsube: "\u2291",
          sqsubset: "\u228F",
          sqsubseteq: "\u2291",
          sqsup: "\u2290",
          sqsupe: "\u2292",
          sqsupset: "\u2290",
          sqsupseteq: "\u2292",
          square: "\u25A1",
          Square: "\u25A1",
          SquareIntersection: "\u2293",
          SquareSubset: "\u228F",
          SquareSubsetEqual: "\u2291",
          SquareSuperset: "\u2290",
          SquareSupersetEqual: "\u2292",
          SquareUnion: "\u2294",
          squarf: "\u25AA",
          squ: "\u25A1",
          squf: "\u25AA",
          srarr: "\u2192",
          Sscr: "\u{1D4AE}",
          sscr: "\u{1D4C8}",
          ssetmn: "\u2216",
          ssmile: "\u2323",
          sstarf: "\u22C6",
          Star: "\u22C6",
          star: "\u2606",
          starf: "\u2605",
          straightepsilon: "\u03F5",
          straightphi: "\u03D5",
          strns: "\xAF",
          sub: "\u2282",
          Sub: "\u22D0",
          subdot: "\u2ABD",
          subE: "\u2AC5",
          sube: "\u2286",
          subedot: "\u2AC3",
          submult: "\u2AC1",
          subnE: "\u2ACB",
          subne: "\u228A",
          subplus: "\u2ABF",
          subrarr: "\u2979",
          subset: "\u2282",
          Subset: "\u22D0",
          subseteq: "\u2286",
          subseteqq: "\u2AC5",
          SubsetEqual: "\u2286",
          subsetneq: "\u228A",
          subsetneqq: "\u2ACB",
          subsim: "\u2AC7",
          subsub: "\u2AD5",
          subsup: "\u2AD3",
          succapprox: "\u2AB8",
          succ: "\u227B",
          succcurlyeq: "\u227D",
          Succeeds: "\u227B",
          SucceedsEqual: "\u2AB0",
          SucceedsSlantEqual: "\u227D",
          SucceedsTilde: "\u227F",
          succeq: "\u2AB0",
          succnapprox: "\u2ABA",
          succneqq: "\u2AB6",
          succnsim: "\u22E9",
          succsim: "\u227F",
          SuchThat: "\u220B",
          sum: "\u2211",
          Sum: "\u2211",
          sung: "\u266A",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          sup: "\u2283",
          Sup: "\u22D1",
          supdot: "\u2ABE",
          supdsub: "\u2AD8",
          supE: "\u2AC6",
          supe: "\u2287",
          supedot: "\u2AC4",
          Superset: "\u2283",
          SupersetEqual: "\u2287",
          suphsol: "\u27C9",
          suphsub: "\u2AD7",
          suplarr: "\u297B",
          supmult: "\u2AC2",
          supnE: "\u2ACC",
          supne: "\u228B",
          supplus: "\u2AC0",
          supset: "\u2283",
          Supset: "\u22D1",
          supseteq: "\u2287",
          supseteqq: "\u2AC6",
          supsetneq: "\u228B",
          supsetneqq: "\u2ACC",
          supsim: "\u2AC8",
          supsub: "\u2AD4",
          supsup: "\u2AD6",
          swarhk: "\u2926",
          swarr: "\u2199",
          swArr: "\u21D9",
          swarrow: "\u2199",
          swnwar: "\u292A",
          szlig: "\xDF",
          Tab: "	",
          target: "\u2316",
          Tau: "\u03A4",
          tau: "\u03C4",
          tbrk: "\u23B4",
          Tcaron: "\u0164",
          tcaron: "\u0165",
          Tcedil: "\u0162",
          tcedil: "\u0163",
          Tcy: "\u0422",
          tcy: "\u0442",
          tdot: "\u20DB",
          telrec: "\u2315",
          Tfr: "\u{1D517}",
          tfr: "\u{1D531}",
          there4: "\u2234",
          therefore: "\u2234",
          Therefore: "\u2234",
          Theta: "\u0398",
          theta: "\u03B8",
          thetasym: "\u03D1",
          thetav: "\u03D1",
          thickapprox: "\u2248",
          thicksim: "\u223C",
          ThickSpace: "\u205F\u200A",
          ThinSpace: "\u2009",
          thinsp: "\u2009",
          thkap: "\u2248",
          thksim: "\u223C",
          THORN: "\xDE",
          thorn: "\xFE",
          tilde: "\u02DC",
          Tilde: "\u223C",
          TildeEqual: "\u2243",
          TildeFullEqual: "\u2245",
          TildeTilde: "\u2248",
          timesbar: "\u2A31",
          timesb: "\u22A0",
          times: "\xD7",
          timesd: "\u2A30",
          tint: "\u222D",
          toea: "\u2928",
          topbot: "\u2336",
          topcir: "\u2AF1",
          top: "\u22A4",
          Topf: "\u{1D54B}",
          topf: "\u{1D565}",
          topfork: "\u2ADA",
          tosa: "\u2929",
          tprime: "\u2034",
          trade: "\u2122",
          TRADE: "\u2122",
          triangle: "\u25B5",
          triangledown: "\u25BF",
          triangleleft: "\u25C3",
          trianglelefteq: "\u22B4",
          triangleq: "\u225C",
          triangleright: "\u25B9",
          trianglerighteq: "\u22B5",
          tridot: "\u25EC",
          trie: "\u225C",
          triminus: "\u2A3A",
          TripleDot: "\u20DB",
          triplus: "\u2A39",
          trisb: "\u29CD",
          tritime: "\u2A3B",
          trpezium: "\u23E2",
          Tscr: "\u{1D4AF}",
          tscr: "\u{1D4C9}",
          TScy: "\u0426",
          tscy: "\u0446",
          TSHcy: "\u040B",
          tshcy: "\u045B",
          Tstrok: "\u0166",
          tstrok: "\u0167",
          twixt: "\u226C",
          twoheadleftarrow: "\u219E",
          twoheadrightarrow: "\u21A0",
          Uacute: "\xDA",
          uacute: "\xFA",
          uarr: "\u2191",
          Uarr: "\u219F",
          uArr: "\u21D1",
          Uarrocir: "\u2949",
          Ubrcy: "\u040E",
          ubrcy: "\u045E",
          Ubreve: "\u016C",
          ubreve: "\u016D",
          Ucirc: "\xDB",
          ucirc: "\xFB",
          Ucy: "\u0423",
          ucy: "\u0443",
          udarr: "\u21C5",
          Udblac: "\u0170",
          udblac: "\u0171",
          udhar: "\u296E",
          ufisht: "\u297E",
          Ufr: "\u{1D518}",
          ufr: "\u{1D532}",
          Ugrave: "\xD9",
          ugrave: "\xF9",
          uHar: "\u2963",
          uharl: "\u21BF",
          uharr: "\u21BE",
          uhblk: "\u2580",
          ulcorn: "\u231C",
          ulcorner: "\u231C",
          ulcrop: "\u230F",
          ultri: "\u25F8",
          Umacr: "\u016A",
          umacr: "\u016B",
          uml: "\xA8",
          UnderBar: "_",
          UnderBrace: "\u23DF",
          UnderBracket: "\u23B5",
          UnderParenthesis: "\u23DD",
          Union: "\u22C3",
          UnionPlus: "\u228E",
          Uogon: "\u0172",
          uogon: "\u0173",
          Uopf: "\u{1D54C}",
          uopf: "\u{1D566}",
          UpArrowBar: "\u2912",
          uparrow: "\u2191",
          UpArrow: "\u2191",
          Uparrow: "\u21D1",
          UpArrowDownArrow: "\u21C5",
          updownarrow: "\u2195",
          UpDownArrow: "\u2195",
          Updownarrow: "\u21D5",
          UpEquilibrium: "\u296E",
          upharpoonleft: "\u21BF",
          upharpoonright: "\u21BE",
          uplus: "\u228E",
          UpperLeftArrow: "\u2196",
          UpperRightArrow: "\u2197",
          upsi: "\u03C5",
          Upsi: "\u03D2",
          upsih: "\u03D2",
          Upsilon: "\u03A5",
          upsilon: "\u03C5",
          UpTeeArrow: "\u21A5",
          UpTee: "\u22A5",
          upuparrows: "\u21C8",
          urcorn: "\u231D",
          urcorner: "\u231D",
          urcrop: "\u230E",
          Uring: "\u016E",
          uring: "\u016F",
          urtri: "\u25F9",
          Uscr: "\u{1D4B0}",
          uscr: "\u{1D4CA}",
          utdot: "\u22F0",
          Utilde: "\u0168",
          utilde: "\u0169",
          utri: "\u25B5",
          utrif: "\u25B4",
          uuarr: "\u21C8",
          Uuml: "\xDC",
          uuml: "\xFC",
          uwangle: "\u29A7",
          vangrt: "\u299C",
          varepsilon: "\u03F5",
          varkappa: "\u03F0",
          varnothing: "\u2205",
          varphi: "\u03D5",
          varpi: "\u03D6",
          varpropto: "\u221D",
          varr: "\u2195",
          vArr: "\u21D5",
          varrho: "\u03F1",
          varsigma: "\u03C2",
          varsubsetneq: "\u228A\uFE00",
          varsubsetneqq: "\u2ACB\uFE00",
          varsupsetneq: "\u228B\uFE00",
          varsupsetneqq: "\u2ACC\uFE00",
          vartheta: "\u03D1",
          vartriangleleft: "\u22B2",
          vartriangleright: "\u22B3",
          vBar: "\u2AE8",
          Vbar: "\u2AEB",
          vBarv: "\u2AE9",
          Vcy: "\u0412",
          vcy: "\u0432",
          vdash: "\u22A2",
          vDash: "\u22A8",
          Vdash: "\u22A9",
          VDash: "\u22AB",
          Vdashl: "\u2AE6",
          veebar: "\u22BB",
          vee: "\u2228",
          Vee: "\u22C1",
          veeeq: "\u225A",
          vellip: "\u22EE",
          verbar: "|",
          Verbar: "\u2016",
          vert: "|",
          Vert: "\u2016",
          VerticalBar: "\u2223",
          VerticalLine: "|",
          VerticalSeparator: "\u2758",
          VerticalTilde: "\u2240",
          VeryThinSpace: "\u200A",
          Vfr: "\u{1D519}",
          vfr: "\u{1D533}",
          vltri: "\u22B2",
          vnsub: "\u2282\u20D2",
          vnsup: "\u2283\u20D2",
          Vopf: "\u{1D54D}",
          vopf: "\u{1D567}",
          vprop: "\u221D",
          vrtri: "\u22B3",
          Vscr: "\u{1D4B1}",
          vscr: "\u{1D4CB}",
          vsubnE: "\u2ACB\uFE00",
          vsubne: "\u228A\uFE00",
          vsupnE: "\u2ACC\uFE00",
          vsupne: "\u228B\uFE00",
          Vvdash: "\u22AA",
          vzigzag: "\u299A",
          Wcirc: "\u0174",
          wcirc: "\u0175",
          wedbar: "\u2A5F",
          wedge: "\u2227",
          Wedge: "\u22C0",
          wedgeq: "\u2259",
          weierp: "\u2118",
          Wfr: "\u{1D51A}",
          wfr: "\u{1D534}",
          Wopf: "\u{1D54E}",
          wopf: "\u{1D568}",
          wp: "\u2118",
          wr: "\u2240",
          wreath: "\u2240",
          Wscr: "\u{1D4B2}",
          wscr: "\u{1D4CC}",
          xcap: "\u22C2",
          xcirc: "\u25EF",
          xcup: "\u22C3",
          xdtri: "\u25BD",
          Xfr: "\u{1D51B}",
          xfr: "\u{1D535}",
          xharr: "\u27F7",
          xhArr: "\u27FA",
          Xi: "\u039E",
          xi: "\u03BE",
          xlarr: "\u27F5",
          xlArr: "\u27F8",
          xmap: "\u27FC",
          xnis: "\u22FB",
          xodot: "\u2A00",
          Xopf: "\u{1D54F}",
          xopf: "\u{1D569}",
          xoplus: "\u2A01",
          xotime: "\u2A02",
          xrarr: "\u27F6",
          xrArr: "\u27F9",
          Xscr: "\u{1D4B3}",
          xscr: "\u{1D4CD}",
          xsqcup: "\u2A06",
          xuplus: "\u2A04",
          xutri: "\u25B3",
          xvee: "\u22C1",
          xwedge: "\u22C0",
          Yacute: "\xDD",
          yacute: "\xFD",
          YAcy: "\u042F",
          yacy: "\u044F",
          Ycirc: "\u0176",
          ycirc: "\u0177",
          Ycy: "\u042B",
          ycy: "\u044B",
          yen: "\xA5",
          Yfr: "\u{1D51C}",
          yfr: "\u{1D536}",
          YIcy: "\u0407",
          yicy: "\u0457",
          Yopf: "\u{1D550}",
          yopf: "\u{1D56A}",
          Yscr: "\u{1D4B4}",
          yscr: "\u{1D4CE}",
          YUcy: "\u042E",
          yucy: "\u044E",
          yuml: "\xFF",
          Yuml: "\u0178",
          Zacute: "\u0179",
          zacute: "\u017A",
          Zcaron: "\u017D",
          zcaron: "\u017E",
          Zcy: "\u0417",
          zcy: "\u0437",
          Zdot: "\u017B",
          zdot: "\u017C",
          zeetrf: "\u2128",
          ZeroWidthSpace: "\u200B",
          Zeta: "\u0396",
          zeta: "\u03B6",
          zfr: "\u{1D537}",
          Zfr: "\u2128",
          ZHcy: "\u0416",
          zhcy: "\u0436",
          zigrarr: "\u21DD",
          zopf: "\u{1D56B}",
          Zopf: "\u2124",
          Zscr: "\u{1D4B5}",
          zscr: "\u{1D4CF}",
          zwj: "\u200D",
          zwnj: "\u200C",
        };
      }),
      Zf = we((e, t) => {
        t.exports = {
          Aacute: "\xC1",
          aacute: "\xE1",
          Acirc: "\xC2",
          acirc: "\xE2",
          acute: "\xB4",
          AElig: "\xC6",
          aelig: "\xE6",
          Agrave: "\xC0",
          agrave: "\xE0",
          amp: "&",
          AMP: "&",
          Aring: "\xC5",
          aring: "\xE5",
          Atilde: "\xC3",
          atilde: "\xE3",
          Auml: "\xC4",
          auml: "\xE4",
          brvbar: "\xA6",
          Ccedil: "\xC7",
          ccedil: "\xE7",
          cedil: "\xB8",
          cent: "\xA2",
          copy: "\xA9",
          COPY: "\xA9",
          curren: "\xA4",
          deg: "\xB0",
          divide: "\xF7",
          Eacute: "\xC9",
          eacute: "\xE9",
          Ecirc: "\xCA",
          ecirc: "\xEA",
          Egrave: "\xC8",
          egrave: "\xE8",
          ETH: "\xD0",
          eth: "\xF0",
          Euml: "\xCB",
          euml: "\xEB",
          frac12: "\xBD",
          frac14: "\xBC",
          frac34: "\xBE",
          gt: ">",
          GT: ">",
          Iacute: "\xCD",
          iacute: "\xED",
          Icirc: "\xCE",
          icirc: "\xEE",
          iexcl: "\xA1",
          Igrave: "\xCC",
          igrave: "\xEC",
          iquest: "\xBF",
          Iuml: "\xCF",
          iuml: "\xEF",
          laquo: "\xAB",
          lt: "<",
          LT: "<",
          macr: "\xAF",
          micro: "\xB5",
          middot: "\xB7",
          nbsp: "\xA0",
          not: "\xAC",
          Ntilde: "\xD1",
          ntilde: "\xF1",
          Oacute: "\xD3",
          oacute: "\xF3",
          Ocirc: "\xD4",
          ocirc: "\xF4",
          Ograve: "\xD2",
          ograve: "\xF2",
          ordf: "\xAA",
          ordm: "\xBA",
          Oslash: "\xD8",
          oslash: "\xF8",
          Otilde: "\xD5",
          otilde: "\xF5",
          Ouml: "\xD6",
          ouml: "\xF6",
          para: "\xB6",
          plusmn: "\xB1",
          pound: "\xA3",
          quot: '"',
          QUOT: '"',
          raquo: "\xBB",
          reg: "\xAE",
          REG: "\xAE",
          sect: "\xA7",
          shy: "\xAD",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          szlig: "\xDF",
          THORN: "\xDE",
          thorn: "\xFE",
          times: "\xD7",
          Uacute: "\xDA",
          uacute: "\xFA",
          Ucirc: "\xDB",
          ucirc: "\xFB",
          Ugrave: "\xD9",
          ugrave: "\xF9",
          uml: "\xA8",
          Uuml: "\xDC",
          uuml: "\xFC",
          Yacute: "\xDD",
          yacute: "\xFD",
          yen: "\xA5",
          yuml: "\xFF",
        };
      }),
      Ws = we((e, t) => {
        t.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
      }),
      eh = we((e, t) => {
        t.exports = {
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        };
      }),
      th = we((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (a) {
            return a && a.__esModule ? a : { default: a };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = t(eh()),
          n =
            String.fromCodePoint ||
            function (a) {
              var i = "";
              return (
                a > 65535 &&
                  ((a -= 65536), (i += String.fromCharCode(((a >>> 10) & 1023) | 55296)), (a = 56320 | (a & 1023))),
                (i += String.fromCharCode(a)),
                i
              );
            };
        function o(a) {
          return (a >= 55296 && a <= 57343) || a > 1114111 ? "\uFFFD" : (a in r.default && (a = r.default[a]), n(a));
        }
        E(o, "decodeCodePoint"), (e.default = o);
      }),
      Os = we((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (d) {
            return d && d.__esModule ? d : { default: d };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.decodeHTML = e.decodeHTMLStrict = e.decodeXML = void 0);
        var r = t(Gs()),
          n = t(Zf()),
          o = t(Ws()),
          a = t(th()),
          i = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
        (e.decodeXML = l(o.default)), (e.decodeHTMLStrict = l(r.default));
        function l(d) {
          var p = c(d);
          return function (h) {
            return String(h).replace(i, p);
          };
        }
        E(l, "getStrictDecoder");
        var s = E(function (d, p) {
          return d < p ? 1 : -1;
        }, "sorter");
        e.decodeHTML = (function () {
          for (
            var d = Object.keys(n.default).sort(s), p = Object.keys(r.default).sort(s), h = 0, f = 0;
            h < p.length;
            h++
          )
            d[f] === p[h] ? ((p[h] += ";?"), f++) : (p[h] += ";");
          var b = new RegExp("&(?:" + p.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
            g = c(r.default);
          function x(S) {
            return S.substr(-1) !== ";" && (S += ";"), g(S);
          }
          return (
            E(x, "replacer"),
            function (S) {
              return String(S).replace(b, x);
            }
          );
        })();
        function c(d) {
          return E(function (p) {
            if (p.charAt(1) === "#") {
              var h = p.charAt(2);
              return h === "X" || h === "x"
                ? a.default(parseInt(p.substr(3), 16))
                : a.default(parseInt(p.substr(2), 10));
            }
            return d[p.slice(1, -1)] || p;
          }, "replace");
        }
        E(c, "getReplacer");
      }),
      Ds = we((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (A) {
            return A && A.__esModule ? A : { default: A };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.escapeUTF8 = e.escape = e.encodeNonAsciiHTML = e.encodeHTML = e.encodeXML = void 0);
        var r = t(Ws()),
          n = s(r.default),
          o = c(n);
        e.encodeXML = S(n);
        var a = t(Gs()),
          i = s(a.default),
          l = c(i);
        (e.encodeHTML = f(i, l)), (e.encodeNonAsciiHTML = S(i));
        function s(A) {
          return Object.keys(A)
            .sort()
            .reduce(function (k, T) {
              return (k[A[T]] = "&" + T + ";"), k;
            }, {});
        }
        E(s, "getInverseObj");
        function c(A) {
          for (var k = [], T = [], I = 0, D = Object.keys(A); I < D.length; I++) {
            var F = D[I];
            F.length === 1 ? k.push("\\" + F) : T.push(F);
          }
          k.sort();
          for (var P = 0; P < k.length - 1; P++) {
            for (var L = P; L < k.length - 1 && k[L].charCodeAt(1) + 1 === k[L + 1].charCodeAt(1); ) L += 1;
            var B = 1 + L - P;
            B < 3 || k.splice(P, B, k[P] + "-" + k[L]);
          }
          return T.unshift("[" + k.join("") + "]"), new RegExp(T.join("|"), "g");
        }
        E(c, "getInverseReplacer");
        var d =
            /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
          p =
            String.prototype.codePointAt != null
              ? function (A) {
                  return A.codePointAt(0);
                }
              : function (A) {
                  return (A.charCodeAt(0) - 55296) * 1024 + A.charCodeAt(1) - 56320 + 65536;
                };
        function h(A) {
          return "&#x" + (A.length > 1 ? p(A) : A.charCodeAt(0)).toString(16).toUpperCase() + ";";
        }
        E(h, "singleCharReplacer");
        function f(A, k) {
          return function (T) {
            return T.replace(k, function (I) {
              return A[I];
            }).replace(d, h);
          };
        }
        E(f, "getInverse");
        var b = new RegExp(o.source + "|" + d.source, "g");
        function g(A) {
          return A.replace(b, h);
        }
        E(g, "escape"), (e.escape = g);
        function x(A) {
          return A.replace(o, h);
        }
        E(x, "escapeUTF8"), (e.escapeUTF8 = x);
        function S(A) {
          return function (k) {
            return k.replace(b, function (T) {
              return A[T] || h(T);
            });
          };
        }
        E(S, "getASCIIEncoder");
      }),
      rh = we((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.decodeXMLStrict =
            e.decodeHTML5Strict =
            e.decodeHTML4Strict =
            e.decodeHTML5 =
            e.decodeHTML4 =
            e.decodeHTMLStrict =
            e.decodeHTML =
            e.decodeXML =
            e.encodeHTML5 =
            e.encodeHTML4 =
            e.escapeUTF8 =
            e.escape =
            e.encodeNonAsciiHTML =
            e.encodeHTML =
            e.encodeXML =
            e.encode =
            e.decodeStrict =
            e.decode =
              void 0);
        var t = Os(),
          r = Ds();
        function n(s, c) {
          return (!c || c <= 0 ? t.decodeXML : t.decodeHTML)(s);
        }
        E(n, "decode"), (e.decode = n);
        function o(s, c) {
          return (!c || c <= 0 ? t.decodeXML : t.decodeHTMLStrict)(s);
        }
        E(o, "decodeStrict"), (e.decodeStrict = o);
        function a(s, c) {
          return (!c || c <= 0 ? r.encodeXML : r.encodeHTML)(s);
        }
        E(a, "encode"), (e.encode = a);
        var i = Ds();
        Object.defineProperty(e, "encodeXML", {
          enumerable: !0,
          get: E(function () {
            return i.encodeXML;
          }, "get"),
        }),
          Object.defineProperty(e, "encodeHTML", {
            enumerable: !0,
            get: E(function () {
              return i.encodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeNonAsciiHTML", {
            enumerable: !0,
            get: E(function () {
              return i.encodeNonAsciiHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "escape", {
            enumerable: !0,
            get: E(function () {
              return i.escape;
            }, "get"),
          }),
          Object.defineProperty(e, "escapeUTF8", {
            enumerable: !0,
            get: E(function () {
              return i.escapeUTF8;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeHTML4", {
            enumerable: !0,
            get: E(function () {
              return i.encodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeHTML5", {
            enumerable: !0,
            get: E(function () {
              return i.encodeHTML;
            }, "get"),
          });
        var l = Os();
        Object.defineProperty(e, "decodeXML", {
          enumerable: !0,
          get: E(function () {
            return l.decodeXML;
          }, "get"),
        }),
          Object.defineProperty(e, "decodeHTML", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTMLStrict", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML4", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML5", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML4Strict", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML5Strict", {
            enumerable: !0,
            get: E(function () {
              return l.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeXMLStrict", {
            enumerable: !0,
            get: E(function () {
              return l.decodeXML;
            }, "get"),
          });
      }),
      nh = we((e, t) => {
        "use strict";
        function r(w, C) {
          if (!(w instanceof C)) throw new TypeError("Cannot call a class as a function");
        }
        E(r, "_classCallCheck");
        function n(w, C) {
          for (var _ = 0; _ < C.length; _++) {
            var M = C[_];
            (M.enumerable = M.enumerable || !1),
              (M.configurable = !0),
              "value" in M && (M.writable = !0),
              Object.defineProperty(w, M.key, M);
          }
        }
        E(n, "_defineProperties");
        function o(w, C, _) {
          return C && n(w.prototype, C), _ && n(w, _), w;
        }
        E(o, "_createClass");
        function a(w, C) {
          var _ = (typeof Symbol < "u" && w[Symbol.iterator]) || w["@@iterator"];
          if (!_) {
            if (Array.isArray(w) || (_ = i(w)) || (C && w && typeof w.length == "number")) {
              _ && (w = _);
              var M = 0,
                U = E(function () {}, "F");
              return {
                s: U,
                n: E(function () {
                  return M >= w.length ? { done: !0 } : { done: !1, value: w[M++] };
                }, "n"),
                e: E(function (Y) {
                  throw Y;
                }, "e"),
                f: U,
              };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var K = !0,
            re = !1,
            Z;
          return {
            s: E(function () {
              _ = _.call(w);
            }, "s"),
            n: E(function () {
              var Y = _.next();
              return (K = Y.done), Y;
            }, "n"),
            e: E(function (Y) {
              (re = !0), (Z = Y);
            }, "e"),
            f: E(function () {
              try {
                !K && _.return != null && _.return();
              } finally {
                if (re) throw Z;
              }
            }, "f"),
          };
        }
        E(a, "_createForOfIteratorHelper");
        function i(w, C) {
          if (w) {
            if (typeof w == "string") return l(w, C);
            var _ = Object.prototype.toString.call(w).slice(8, -1);
            if ((_ === "Object" && w.constructor && (_ = w.constructor.name), _ === "Map" || _ === "Set"))
              return Array.from(w);
            if (_ === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)) return l(w, C);
          }
        }
        E(i, "_unsupportedIterableToArray");
        function l(w, C) {
          (C == null || C > w.length) && (C = w.length);
          for (var _ = 0, M = new Array(C); _ < C; _++) M[_] = w[_];
          return M;
        }
        E(l, "_arrayLikeToArray");
        var s = rh(),
          c = { fg: "#FFF", bg: "#000", newline: !1, escapeXML: !1, stream: !1, colors: d() };
        function d() {
          var w = {
            0: "#000",
            1: "#A00",
            2: "#0A0",
            3: "#A50",
            4: "#00A",
            5: "#A0A",
            6: "#0AA",
            7: "#AAA",
            8: "#555",
            9: "#F55",
            10: "#5F5",
            11: "#FF5",
            12: "#55F",
            13: "#F5F",
            14: "#5FF",
            15: "#FFF",
          };
          return (
            A(0, 5).forEach(function (C) {
              A(0, 5).forEach(function (_) {
                A(0, 5).forEach(function (M) {
                  return p(C, _, M, w);
                });
              });
            }),
            A(0, 23).forEach(function (C) {
              var _ = C + 232,
                M = h(C * 10 + 8);
              w[_] = "#" + M + M + M;
            }),
            w
          );
        }
        E(d, "getDefaultColors");
        function p(w, C, _, M) {
          var U = 16 + w * 36 + C * 6 + _,
            K = w > 0 ? w * 40 + 55 : 0,
            re = C > 0 ? C * 40 + 55 : 0,
            Z = _ > 0 ? _ * 40 + 55 : 0;
          M[U] = f([K, re, Z]);
        }
        E(p, "setStyleColor");
        function h(w) {
          for (var C = w.toString(16); C.length < 2; ) C = "0" + C;
          return C;
        }
        E(h, "toHexString");
        function f(w) {
          var C = [],
            _ = a(w),
            M;
          try {
            for (_.s(); !(M = _.n()).done; ) {
              var U = M.value;
              C.push(h(U));
            }
          } catch (K) {
            _.e(K);
          } finally {
            _.f();
          }
          return "#" + C.join("");
        }
        E(f, "toColorHexString");
        function b(w, C, _, M) {
          var U;
          return (
            C === "text"
              ? (U = I(_, M))
              : C === "display"
                ? (U = x(w, _, M))
                : C === "xterm256Foreground"
                  ? (U = P(w, M.colors[_]))
                  : C === "xterm256Background"
                    ? (U = L(w, M.colors[_]))
                    : C === "rgb" && (U = g(w, _)),
            U
          );
        }
        E(b, "generateOutput");
        function g(w, C) {
          C = C.substring(2).slice(0, -1);
          var _ = +C.substr(0, 2),
            M = C.substring(5).split(";"),
            U = M.map(function (K) {
              return ("0" + Number(K).toString(16)).substr(-2);
            }).join("");
          return F(w, (_ === 38 ? "color:#" : "background-color:#") + U);
        }
        E(g, "handleRgb");
        function x(w, C, _) {
          C = parseInt(C, 10);
          var M = {
              "-1": E(function () {
                return "<br/>";
              }, "_"),
              0: E(function () {
                return w.length && S(w);
              }, "_"),
              1: E(function () {
                return D(w, "b");
              }, "_"),
              3: E(function () {
                return D(w, "i");
              }, "_"),
              4: E(function () {
                return D(w, "u");
              }, "_"),
              8: E(function () {
                return F(w, "display:none");
              }, "_"),
              9: E(function () {
                return D(w, "strike");
              }, "_"),
              22: E(function () {
                return F(w, "font-weight:normal;text-decoration:none;font-style:normal");
              }, "_"),
              23: E(function () {
                return B(w, "i");
              }, "_"),
              24: E(function () {
                return B(w, "u");
              }, "_"),
              39: E(function () {
                return P(w, _.fg);
              }, "_"),
              49: E(function () {
                return L(w, _.bg);
              }, "_"),
              53: E(function () {
                return F(w, "text-decoration:overline");
              }, "_"),
            },
            U;
          return (
            M[C]
              ? (U = M[C]())
              : 4 < C && C < 7
                ? (U = D(w, "blink"))
                : 29 < C && C < 38
                  ? (U = P(w, _.colors[C - 30]))
                  : 39 < C && C < 48
                    ? (U = L(w, _.colors[C - 40]))
                    : 89 < C && C < 98
                      ? (U = P(w, _.colors[8 + (C - 90)]))
                      : 99 < C && C < 108 && (U = L(w, _.colors[8 + (C - 100)])),
            U
          );
        }
        E(x, "handleDisplay");
        function S(w) {
          var C = w.slice(0);
          return (
            (w.length = 0),
            C.reverse()
              .map(function (_) {
                return "</" + _ + ">";
              })
              .join("")
          );
        }
        E(S, "resetStyles");
        function A(w, C) {
          for (var _ = [], M = w; M <= C; M++) _.push(M);
          return _;
        }
        E(A, "range");
        function k(w) {
          return function (C) {
            return (w === null || C.category !== w) && w !== "all";
          };
        }
        E(k, "notCategory");
        function T(w) {
          w = parseInt(w, 10);
          var C = null;
          return (
            w === 0
              ? (C = "all")
              : w === 1
                ? (C = "bold")
                : 2 < w && w < 5
                  ? (C = "underline")
                  : 4 < w && w < 7
                    ? (C = "blink")
                    : w === 8
                      ? (C = "hide")
                      : w === 9
                        ? (C = "strike")
                        : (29 < w && w < 38) || w === 39 || (89 < w && w < 98)
                          ? (C = "foreground-color")
                          : ((39 < w && w < 48) || w === 49 || (99 < w && w < 108)) && (C = "background-color"),
            C
          );
        }
        E(T, "categoryForCode");
        function I(w, C) {
          return C.escapeXML ? s.encodeXML(w) : w;
        }
        E(I, "pushText");
        function D(w, C, _) {
          return _ || (_ = ""), w.push(C), "<".concat(C).concat(_ ? ' style="'.concat(_, '"') : "", ">");
        }
        E(D, "pushTag");
        function F(w, C) {
          return D(w, "span", C);
        }
        E(F, "pushStyle");
        function P(w, C) {
          return D(w, "span", "color:" + C);
        }
        E(P, "pushForegroundColor");
        function L(w, C) {
          return D(w, "span", "background-color:" + C);
        }
        E(L, "pushBackgroundColor");
        function B(w, C) {
          var _;
          if ((w.slice(-1)[0] === C && (_ = w.pop()), _)) return "</" + C + ">";
        }
        E(B, "closeTag");
        function G(w, C, _) {
          var M = !1,
            U = 3;
          function K() {
            return "";
          }
          E(K, "remove");
          function re(_e, De) {
            return _("xterm256Foreground", De), "";
          }
          E(re, "removeXterm256Foreground");
          function Z(_e, De) {
            return _("xterm256Background", De), "";
          }
          E(Z, "removeXterm256Background");
          function Y(_e) {
            return C.newline ? _("display", -1) : _("text", _e), "";
          }
          E(Y, "newline");
          function ee(_e, De) {
            (M = !0), De.trim().length === 0 && (De = "0"), (De = De.trimRight(";").split(";"));
            var nt = a(De),
              Nt;
            try {
              for (nt.s(); !(Nt = nt.n()).done; ) {
                var kr = Nt.value;
                _("display", kr);
              }
            } catch (An) {
              nt.e(An);
            } finally {
              nt.f();
            }
            return "";
          }
          E(ee, "ansiMess");
          function ye(_e) {
            return _("text", _e), "";
          }
          E(ye, "realText");
          function le(_e) {
            return _("rgb", _e), "";
          }
          E(le, "rgb");
          var Ae = [
            { pattern: /^\x08+/, sub: K },
            { pattern: /^\x1b\[[012]?K/, sub: K },
            { pattern: /^\x1b\[\(B/, sub: K },
            { pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: le },
            { pattern: /^\x1b\[38;5;(\d+)m/, sub: re },
            { pattern: /^\x1b\[48;5;(\d+)m/, sub: Z },
            { pattern: /^\n/, sub: Y },
            { pattern: /^\r+\n/, sub: Y },
            { pattern: /^\r/, sub: Y },
            { pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: ee },
            { pattern: /^\x1b\[\d?J/, sub: K },
            { pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: K },
            { pattern: /^\x1b\[?[\d;]{0,3}/, sub: K },
            { pattern: /^(([^\x1b\x08\r\n])+)/, sub: ye },
          ];
          function ne(_e, De) {
            (De > U && M) || ((M = !1), (w = w.replace(_e.pattern, _e.sub)));
          }
          E(ne, "process");
          var qe = [],
            Be = w,
            Ye = Be.length;
          e: for (; Ye > 0; ) {
            for (var nr = 0, Ft = 0, or = Ae.length; Ft < or; nr = ++Ft) {
              var Cr = Ae[nr];
              if ((ne(Cr, nr), w.length !== Ye)) {
                Ye = w.length;
                continue e;
              }
            }
            if (w.length === Ye) break;
            qe.push(0), (Ye = w.length);
          }
          return qe;
        }
        E(G, "tokenize");
        function $(w, C, _) {
          return C !== "text" && ((w = w.filter(k(T(_)))), w.push({ token: C, data: _, category: T(_) })), w;
        }
        E($, "updateStickyStack");
        var H = (function () {
          function w(C) {
            r(this, w),
              (C = C || {}),
              C.colors && (C.colors = Object.assign({}, c.colors, C.colors)),
              (this.options = Object.assign({}, c, C)),
              (this.stack = []),
              (this.stickyStack = []);
          }
          return (
            E(w, "Filter"),
            o(w, [
              {
                key: "toHtml",
                value: E(function (C) {
                  var _ = this;
                  C = typeof C == "string" ? [C] : C;
                  var M = this.stack,
                    U = this.options,
                    K = [];
                  return (
                    this.stickyStack.forEach(function (re) {
                      var Z = b(M, re.token, re.data, U);
                      Z && K.push(Z);
                    }),
                    G(C.join(""), U, function (re, Z) {
                      var Y = b(M, re, Z, U);
                      Y && K.push(Y), U.stream && (_.stickyStack = $(_.stickyStack, re, Z));
                    }),
                    M.length && K.push(S(M)),
                    K.join("")
                  );
                }, "toHtml"),
              },
            ]),
            w
          );
        })();
        t.exports = H;
      }),
      be = (() => {
        let e;
        return (
          typeof window < "u"
            ? (e = window)
            : typeof globalThis < "u"
              ? (e = globalThis)
              : typeof window < "u"
                ? (e = window)
                : typeof self < "u"
                  ? (e = self)
                  : (e = {}),
          e
        );
      })();
    function Ks() {
      let e = { setHandler: E(() => {}, "setHandler"), send: E(() => {}, "send") };
      return new Hi({ transport: e });
    }
    E(Ks, "mockChannel");
    var Ys = class {
      constructor() {
        (this.getChannel = E(() => {
          if (!this.channel) {
            let t = Ks();
            return this.setChannel(t), t;
          }
          return this.channel;
        }, "getChannel")),
          (this.ready = E(() => this.promise, "ready")),
          (this.hasChannel = E(() => !!this.channel, "hasChannel")),
          (this.setChannel = E((t) => {
            (this.channel = t), this.resolve();
          }, "setChannel")),
          (this.promise = new Promise((t) => {
            this.resolve = () => t(this.getChannel());
          }));
      }
    };
    E(Ys, "AddonStore");
    var oh = Ys,
      ao = "__STORYBOOK_ADDONS_PREVIEW";
    function Xs() {
      return be[ao] || (be[ao] = new oh()), be[ao];
    }
    E(Xs, "getAddonsStore");
    var Ct = Xs(),
      Qs = class {
        constructor() {
          (this.hookListsMap = void 0),
            (this.mountedDecorators = void 0),
            (this.prevMountedDecorators = void 0),
            (this.currentHooks = void 0),
            (this.nextHookIndex = void 0),
            (this.currentPhase = void 0),
            (this.currentEffects = void 0),
            (this.prevEffects = void 0),
            (this.currentDecoratorName = void 0),
            (this.hasUpdates = void 0),
            (this.currentContext = void 0),
            (this.renderListener = E((t) => {
              t === this.currentContext?.id &&
                (this.triggerEffects(), (this.currentContext = null), this.removeRenderListeners());
            }, "renderListener")),
            this.init();
        }
        init() {
          (this.hookListsMap = new WeakMap()),
            (this.mountedDecorators = new Set()),
            (this.prevMountedDecorators = new Set()),
            (this.currentHooks = []),
            (this.nextHookIndex = 0),
            (this.currentPhase = "NONE"),
            (this.currentEffects = []),
            (this.prevEffects = []),
            (this.currentDecoratorName = null),
            (this.hasUpdates = !1),
            (this.currentContext = null);
        }
        clean() {
          this.prevEffects.forEach((t) => {
            t.destroy && t.destroy();
          }),
            this.init(),
            this.removeRenderListeners();
        }
        getNextHook() {
          let t = this.currentHooks[this.nextHookIndex];
          return (this.nextHookIndex += 1), t;
        }
        triggerEffects() {
          this.prevEffects.forEach((t) => {
            !this.currentEffects.includes(t) && t.destroy && t.destroy();
          }),
            this.currentEffects.forEach((t) => {
              this.prevEffects.includes(t) || (t.destroy = t.create());
            }),
            (this.prevEffects = this.currentEffects),
            (this.currentEffects = []);
        }
        addRenderListeners() {
          this.removeRenderListeners(), Ct.getChannel().on(cr, this.renderListener);
        }
        removeRenderListeners() {
          Ct.getChannel().removeListener(cr, this.renderListener);
        }
      };
    E(Qs, "HooksContext");
    var Zs = Qs;
    function fo(e) {
      let t = E((...r) => {
        let { hooks: n } = typeof r[0] == "function" ? r[1] : r[0],
          o = n.currentPhase,
          a = n.currentHooks,
          i = n.nextHookIndex,
          l = n.currentDecoratorName;
        (n.currentDecoratorName = e.name),
          n.prevMountedDecorators.has(e)
            ? ((n.currentPhase = "UPDATE"), (n.currentHooks = n.hookListsMap.get(e) || []))
            : ((n.currentPhase = "MOUNT"),
              (n.currentHooks = []),
              n.hookListsMap.set(e, n.currentHooks),
              n.prevMountedDecorators.add(e)),
          (n.nextHookIndex = 0);
        let s = be.STORYBOOK_HOOKS_CONTEXT;
        be.STORYBOOK_HOOKS_CONTEXT = n;
        let c = e(...r);
        if (((be.STORYBOOK_HOOKS_CONTEXT = s), n.currentPhase === "UPDATE" && n.getNextHook() != null))
          throw new Error(
            "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
          );
        return (n.currentPhase = o), (n.currentHooks = a), (n.nextHookIndex = i), (n.currentDecoratorName = l), c;
      }, "hookified");
      return (t.originalFn = e), t;
    }
    E(fo, "hookify");
    var io = 0,
      ah = 25,
      ih = E(
        (e) => (t, r) => {
          let n = e(
            fo(t),
            r.map((o) => fo(o))
          );
          return (o) => {
            let { hooks: a } = o;
            (a.prevMountedDecorators ??= new Set()),
              (a.mountedDecorators = new Set([t, ...r])),
              (a.currentContext = o),
              (a.hasUpdates = !1);
            let i = n(o);
            for (io = 1; a.hasUpdates; )
              if (((a.hasUpdates = !1), (a.currentEffects = []), (i = n(o)), (io += 1), io > ah))
                throw new Error(
                  "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
                );
            return a.addRenderListeners(), i;
          };
        },
        "applyHooks"
      ),
      sh = E((e, t) => e.length === t.length && e.every((r, n) => r === t[n]), "areDepsEqual"),
      Do = E(
        () => new Error("Storybook preview hooks can only be called inside decorators and story functions."),
        "invalidHooksError"
      );
    function Ro() {
      return be.STORYBOOK_HOOKS_CONTEXT || null;
    }
    E(Ro, "getHooksContextOrNull");
    function Zr() {
      let e = Ro();
      if (e == null) throw Do();
      return e;
    }
    E(Zr, "getHooksContextOrThrow");
    function el(e, t, r) {
      let n = Zr();
      if (n.currentPhase === "MOUNT") {
        r != null &&
          !Array.isArray(r) &&
          Q.warn(
            `${e} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`
          );
        let o = { name: e, deps: r };
        return n.currentHooks.push(o), t(o), o;
      }
      if (n.currentPhase === "UPDATE") {
        let o = n.getNextHook();
        if (o == null) throw new Error("Rendered more hooks than during the previous render.");
        return (
          o.name !== e &&
            Q.warn(
              `Storybook has detected a change in the order of Hooks${n.currentDecoratorName ? ` called by ${n.currentDecoratorName}` : ""}. This will lead to bugs and errors if not fixed.`
            ),
          r != null &&
            o.deps == null &&
            Q.warn(
              `${e} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`
            ),
          r != null &&
            o.deps != null &&
            r.length !== o.deps.length &&
            Q.warn(`The final argument passed to ${e} changed size between renders. The order and size of this array must remain constant.
Previous: ${o.deps}
Incoming: ${r}`),
          (r == null || o.deps == null || !sh(r, o.deps)) && (t(o), (o.deps = r)),
          o
        );
      }
      throw Do();
    }
    E(el, "useHook");
    function hr(e, t, r) {
      let { memoizedState: n } = el(
        e,
        (o) => {
          o.memoizedState = t();
        },
        r
      );
      return n;
    }
    E(hr, "useMemoLike");
    function lh(e, t) {
      return hr("useMemo", e, t);
    }
    E(lh, "useMemo");
    function fr(e, t) {
      return hr("useCallback", () => e, t);
    }
    E(fr, "useCallback");
    function _o(e, t) {
      return hr(e, () => ({ current: t }), []);
    }
    E(_o, "useRefLike");
    function uh(e) {
      return _o("useRef", e);
    }
    E(uh, "useRef");
    function tl() {
      let e = Ro();
      if (e != null && e.currentPhase !== "NONE") e.hasUpdates = !0;
      else
        try {
          Ct.getChannel().emit(Fr);
        } catch {
          Q.warn("State updates of Storybook preview hooks work only in browser");
        }
    }
    E(tl, "triggerUpdate");
    function Po(e, t) {
      let r = _o(e, typeof t == "function" ? t() : t),
        n = E((o) => {
          (r.current = typeof o == "function" ? o(r.current) : o), tl();
        }, "setState");
      return [r.current, n];
    }
    E(Po, "useStateLike");
    function ch(e) {
      return Po("useState", e);
    }
    E(ch, "useState");
    function dh(e, t, r) {
      let n = r != null ? () => r(t) : t,
        [o, a] = Po("useReducer", n);
      return [o, E((i) => a((l) => e(l, i)), "dispatch")];
    }
    E(dh, "useReducer");
    function rl(e, t) {
      let r = Zr(),
        n = hr("useEffect", () => ({ create: e }), t);
      r.currentEffects.includes(n) || r.currentEffects.push(n);
    }
    E(rl, "useEffect");
    function ph(e, t = []) {
      let r = Ct.getChannel();
      return (
        rl(
          () => (
            Object.entries(e).forEach(([n, o]) => r.on(n, o)),
            () => {
              Object.entries(e).forEach(([n, o]) => r.removeListener(n, o));
            }
          ),
          [...Object.keys(e), ...t]
        ),
        fr(r.emit.bind(r), [r])
      );
    }
    E(ph, "useChannel");
    function en() {
      let { currentContext: e } = Zr();
      if (e == null) throw Do();
      return e;
    }
    E(en, "useStoryContext");
    function fh(e, t) {
      let { parameters: r } = en();
      if (e) return r[e] ?? t;
    }
    E(fh, "useParameter");
    function hh() {
      let e = Ct.getChannel(),
        { id: t, args: r } = en(),
        n = fr((a) => e.emit(Lr, { storyId: t, updatedArgs: a }), [e, t]),
        o = fr((a) => e.emit(Nr, { storyId: t, argNames: a }), [e, t]);
      return [r, n, o];
    }
    E(hh, "useArgs");
    function mh() {
      let e = Ct.getChannel(),
        { globals: t } = en(),
        r = fr((n) => e.emit(jr, { globals: n }), [e]);
      return [t, r];
    }
    E(mh, "useGlobals");
    var yk = E(({ name: e, parameterName: t, wrapper: r, skipIfNoParametersOrOptions: n = !1 }) => {
      let o = E(
        (a) => (i, l) => {
          let s = l.parameters && l.parameters[t];
          return (s && s.disable) || (n && !a && !s) ? i(l) : r(i, l, { options: a, parameters: s });
        },
        "decorator"
      );
      return (...a) =>
        typeof a[0] == "function"
          ? o()(...a)
          : (...i) => {
              if (i.length > 1) return a.length > 1 ? o(a)(...i) : o(...a)(...i);
              throw new Error(`Passing stories directly into ${e}() is not allowed,
        instead use addDecorator(${e}) and pass options with the '${t}' parameter`);
            };
    }, "makeDecorator");
    function nl(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) || (r[a] = i);
      }
      return r;
    }
    E(nl, "omitBy");
    function ol(e, t) {
      let r = {};
      for (let n = 0; n < t.length; n++) {
        let o = t[n];
        Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
      }
      return r;
    }
    E(ol, "pick");
    function al(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) && (r[a] = i);
      }
      return r;
    }
    E(al, "pickBy");
    function Je(e) {
      if (typeof e != "object" || e == null) return !1;
      if (Object.getPrototypeOf(e) === null) return !0;
      if (e.toString() !== "[object Object]") return !1;
      let t = e;
      for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t;
    }
    E(Je, "isPlainObject");
    function kt(e, t) {
      let r = {},
        n = Object.keys(e);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = e[a];
        r[a] = t(i, a, e);
      }
      return r;
    }
    E(kt, "mapValues");
    var yh = "[object RegExp]",
      gh = "[object String]",
      bh = "[object Number]",
      Eh = "[object Boolean]",
      Rs = "[object Arguments]",
      vh = "[object Symbol]",
      xh = "[object Date]",
      Sh = "[object Map]",
      wh = "[object Set]",
      Ah = "[object Array]",
      Th = "[object Function]",
      Ch = "[object ArrayBuffer]",
      so = "[object Object]",
      kh = "[object Error]",
      Ih = "[object DataView]",
      Oh = "[object Uint8Array]",
      Dh = "[object Uint8ClampedArray]",
      Rh = "[object Uint16Array]",
      _h = "[object Uint32Array]",
      Ph = "[object BigUint64Array]",
      Fh = "[object Int8Array]",
      Nh = "[object Int16Array]",
      Bh = "[object Int32Array]",
      jh = "[object BigInt64Array]",
      Lh = "[object Float32Array]",
      Mh = "[object Float64Array]";
    function ho(e) {
      return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
    }
    E(ho, "getSymbols");
    function mo(e) {
      return e == null ? (e === void 0 ? "[object Undefined]" : "[object Null]") : Object.prototype.toString.call(e);
    }
    E(mo, "getTag");
    function il(e, t) {
      if (typeof e == typeof t)
        switch (typeof e) {
          case "bigint":
          case "string":
          case "boolean":
          case "symbol":
          case "undefined":
            return e === t;
          case "number":
            return e === t || Object.is(e, t);
          case "function":
            return e === t;
          case "object":
            return Ge(e, t);
        }
      return Ge(e, t);
    }
    E(il, "isEqual");
    function Ge(e, t, r) {
      if (Object.is(e, t)) return !0;
      let n = mo(e),
        o = mo(t);
      if ((n === Rs && (n = so), o === Rs && (o = so), n !== o)) return !1;
      switch (n) {
        case gh:
          return e.toString() === t.toString();
        case bh: {
          let l = e.valueOf(),
            s = t.valueOf();
          return l === s || (Number.isNaN(l) && Number.isNaN(s));
        }
        case Eh:
        case xh:
        case vh:
          return Object.is(e.valueOf(), t.valueOf());
        case yh:
          return e.source === t.source && e.flags === t.flags;
        case Th:
          return e === t;
      }
      r = r ?? new Map();
      let a = r.get(e),
        i = r.get(t);
      if (a != null && i != null) return a === t;
      r.set(e, t), r.set(t, e);
      try {
        switch (n) {
          case Sh: {
            if (e.size !== t.size) return !1;
            for (let [l, s] of e.entries()) if (!t.has(l) || !Ge(s, t.get(l), r)) return !1;
            return !0;
          }
          case wh: {
            if (e.size !== t.size) return !1;
            let l = Array.from(e.values()),
              s = Array.from(t.values());
            for (let c = 0; c < l.length; c++) {
              let d = l[c],
                p = s.findIndex((h) => Ge(d, h, r));
              if (p === -1) return !1;
              s.splice(p, 1);
            }
            return !0;
          }
          case Ah:
          case Oh:
          case Dh:
          case Rh:
          case _h:
          case Ph:
          case Fh:
          case Nh:
          case Bh:
          case jh:
          case Lh:
          case Mh: {
            if ((typeof Buffer < "u" && Buffer.isBuffer(e) !== Buffer.isBuffer(t)) || e.length !== t.length) return !1;
            for (let l = 0; l < e.length; l++) if (!Ge(e[l], t[l], r)) return !1;
            return !0;
          }
          case Ch:
            return e.byteLength !== t.byteLength ? !1 : Ge(new Uint8Array(e), new Uint8Array(t), r);
          case Ih:
            return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : Ge(e.buffer, t.buffer, r);
          case kh:
            return e.name === t.name && e.message === t.message;
          case so: {
            if (!(Ge(e.constructor, t.constructor, r) || (Je(e) && Je(t)))) return !1;
            let l = [...Object.keys(e), ...ho(e)],
              s = [...Object.keys(t), ...ho(t)];
            if (l.length !== s.length) return !1;
            for (let c = 0; c < l.length; c++) {
              let d = l[c],
                p = e[d];
              if (!Object.prototype.hasOwnProperty.call(t, d)) return !1;
              let h = t[d];
              if (!Ge(p, h, r)) return !1;
            }
            return !0;
          }
          default:
            return !1;
        }
      } finally {
        r.delete(e), r.delete(t);
      }
    }
    E(Ge, "areObjectsEqual");
    var lo = Ht(Js(), 1);
    function Me(e) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      var n = Array.from(typeof e == "string" ? [e] : e);
      n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var o = n.reduce(function (l, s) {
        var c = s.match(/\n([\t ]+|(?!\s).)/g);
        return c
          ? l.concat(
              c.map(function (d) {
                var p, h;
                return (h = (p = d.match(/[\t ]/g)) === null || p === void 0 ? void 0 : p.length) !== null &&
                  h !== void 0
                  ? h
                  : 0;
              })
            )
          : l;
      }, []);
      if (o.length) {
        var a = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, o) +
            "}",
          "g"
        );
        n = n.map(function (l) {
          return l.replace(
            a,
            `
`
          );
        });
      }
      n[0] = n[0].replace(/^\r?\n/, "");
      var i = n[0];
      return (
        t.forEach(function (l, s) {
          var c = i.match(/(?:^|\n)( *)$/),
            d = c ? c[1] : "",
            p = l;
          typeof l == "string" &&
            l.includes(`
`) &&
            (p = String(l)
              .split(
                `
`
              )
              .map(function (h, f) {
                return f === 0 ? h : "" + d + h;
              }).join(`
`)),
            (i += p + n[s + 1]);
        }),
        i
      );
    }
    E(Me, "dedent");
    var Vt = Symbol("incompatible"),
      yo = E((e, t) => {
        let r = t.type;
        if (e == null || !r || t.mapping) return e;
        switch (r.name) {
          case "string":
            return String(e);
          case "enum":
            return e;
          case "number":
            return Number(e);
          case "boolean":
            return String(e) === "true";
          case "array":
            return !r.value || !Array.isArray(e)
              ? Vt
              : e.reduce((n, o, a) => {
                  let i = yo(o, { type: r.value });
                  return i !== Vt && (n[a] = i), n;
                }, new Array(e.length));
          case "object":
            return typeof e == "string" || typeof e == "number"
              ? e
              : !r.value || typeof e != "object"
                ? Vt
                : Object.entries(e).reduce((n, [o, a]) => {
                    let i = yo(a, { type: r.value[o] });
                    return i === Vt ? n : Object.assign(n, { [o]: i });
                  }, {});
          default:
            return Vt;
        }
      }, "map"),
      Uh = E(
        (e, t) =>
          Object.entries(e).reduce((r, [n, o]) => {
            if (!t[n]) return r;
            let a = yo(o, t[n]);
            return a === Vt ? r : Object.assign(r, { [n]: a });
          }, {}),
        "mapArgsToTypes"
      ),
      go = E(
        (e, t) =>
          Array.isArray(e) && Array.isArray(t)
            ? t.reduce((r, n, o) => ((r[o] = go(e[o], t[o])), r), [...e]).filter((r) => r !== void 0)
            : !Je(e) || !Je(t)
              ? t
              : Object.keys({ ...e, ...t }).reduce((r, n) => {
                  if (n in t) {
                    let o = go(e[n], t[n]);
                    o !== void 0 && (r[n] = o);
                  } else r[n] = e[n];
                  return r;
                }, {}),
        "combineArgs"
      ),
      $h = E(
        (e, t) =>
          Object.entries(t).reduce((r, [n, { options: o }]) => {
            function a() {
              return n in e && (r[n] = e[n]), r;
            }
            if ((E(a, "allowArg"), !o)) return a();
            if (!Array.isArray(o))
              return (
                ct.error(Me`
        Invalid argType: '${n}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `),
                a()
              );
            if (o.some((p) => p && ["object", "function"].includes(typeof p)))
              return (
                ct.error(Me`
        Invalid argType: '${n}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `),
                a()
              );
            let i = Array.isArray(e[n]),
              l = i && e[n].findIndex((p) => !o.includes(p)),
              s = i && l === -1;
            if (e[n] === void 0 || o.includes(e[n]) || s) return a();
            let c = i ? `${n}[${l}]` : n,
              d = o.map((p) => (typeof p == "string" ? `'${p}'` : String(p))).join(", ");
            return ct.warn(`Received illegal value for '${c}'. Supported options: ${d}`), r;
          }, {}),
        "validateOptions"
      ),
      dr = Symbol("Deeply equal"),
      Kr = E((e, t) => {
        if (typeof e != typeof t) return t;
        if (il(e, t)) return dr;
        if (Array.isArray(e) && Array.isArray(t)) {
          let r = t.reduce((n, o, a) => {
            let i = Kr(e[a], o);
            return i !== dr && (n[a] = i), n;
          }, new Array(t.length));
          return t.length >= e.length ? r : r.concat(new Array(e.length - t.length).fill(void 0));
        }
        return Je(e) && Je(t)
          ? Object.keys({ ...e, ...t }).reduce((r, n) => {
              let o = Kr(e?.[n], t?.[n]);
              return o === dr ? r : Object.assign(r, { [n]: o });
            }, {})
          : t;
      }, "deepDiff"),
      sl = "UNTARGETED";
    function ll({ args: e, argTypes: t }) {
      let r = {};
      return (
        Object.entries(e).forEach(([n, o]) => {
          let { target: a = sl } = t[n] || {};
          (r[a] = r[a] || {}), (r[a][n] = o);
        }),
        r
      );
    }
    E(ll, "groupArgsByTarget");
    function ul(e) {
      return Object.keys(e).forEach((t) => e[t] === void 0 && delete e[t]), e;
    }
    E(ul, "deleteUndefined");
    var cl = class {
      constructor() {
        (this.initialArgsByStoryId = {}), (this.argsByStoryId = {});
      }
      get(t) {
        if (!(t in this.argsByStoryId)) throw new Error(`No args known for ${t} -- has it been rendered yet?`);
        return this.argsByStoryId[t];
      }
      setInitial(t) {
        if (!this.initialArgsByStoryId[t.id])
          (this.initialArgsByStoryId[t.id] = t.initialArgs), (this.argsByStoryId[t.id] = t.initialArgs);
        else if (this.initialArgsByStoryId[t.id] !== t.initialArgs) {
          let r = Kr(this.initialArgsByStoryId[t.id], this.argsByStoryId[t.id]);
          (this.initialArgsByStoryId[t.id] = t.initialArgs),
            (this.argsByStoryId[t.id] = t.initialArgs),
            r !== dr && this.updateFromDelta(t, r);
        }
      }
      updateFromDelta(t, r) {
        let n = $h(r, t.argTypes);
        this.argsByStoryId[t.id] = go(this.argsByStoryId[t.id], n);
      }
      updateFromPersisted(t, r) {
        let n = Uh(r, t.argTypes);
        return this.updateFromDelta(t, n);
      }
      update(t, r) {
        if (!(t in this.argsByStoryId)) throw new Error(`No args known for ${t} -- has it been rendered yet?`);
        this.argsByStoryId[t] = ul({ ...this.argsByStoryId[t], ...r });
      }
    };
    E(cl, "ArgsStore");
    var qh = cl,
      dl = E(
        (e = {}) => Object.entries(e).reduce((t, [r, { defaultValue: n }]) => (typeof n < "u" && (t[r] = n), t), {}),
        "getValuesFromArgTypes"
      ),
      pl = class {
        constructor({ globals: t = {}, globalTypes: r = {} }) {
          this.set({ globals: t, globalTypes: r });
        }
        set({ globals: t = {}, globalTypes: r = {} }) {
          let n = this.initialGlobals && Kr(this.initialGlobals, this.globals);
          this.allowedGlobalNames = new Set([...Object.keys(t), ...Object.keys(r)]);
          let o = dl(r);
          (this.initialGlobals = { ...o, ...t }),
            (this.globals = this.initialGlobals),
            n && n !== dr && this.updateFromPersisted(n);
        }
        filterAllowedGlobals(t) {
          return Object.entries(t).reduce(
            (r, [n, o]) => (
              this.allowedGlobalNames.has(n)
                ? (r[n] = o)
                : Q.warn(`Attempted to set a global (${n}) that is not defined in initial globals or globalTypes`),
              r
            ),
            {}
          );
        }
        updateFromPersisted(t) {
          let r = this.filterAllowedGlobals(t);
          this.globals = { ...this.globals, ...r };
        }
        get() {
          return this.globals;
        }
        update(t) {
          this.globals = { ...this.globals, ...this.filterAllowedGlobals(t) };
        }
      };
    E(pl, "GlobalsStore");
    var Vh = pl,
      Jh = Ht(Js(), 1),
      zh = (0, Jh.default)(1)((e) =>
        Object.values(e).reduce((t, r) => ((t[r.importPath] = t[r.importPath] || r), t), {})
      ),
      fl = class {
        constructor({ entries: t } = { v: 5, entries: {} }) {
          this.entries = t;
        }
        entryFromSpecifier(t) {
          let r = Object.values(this.entries);
          if (t === "*") return r[0];
          if (typeof t == "string") return this.entries[t] ? this.entries[t] : r.find((a) => a.id.startsWith(t));
          let { name: n, title: o } = t;
          return r.find((a) => a.name === n && a.title === o);
        }
        storyIdToEntry(t) {
          let r = this.entries[t];
          if (!r) throw new Yi({ storyId: t });
          return r;
        }
        importPathToEntry(t) {
          return zh(this.entries)[t];
        }
      };
    E(fl, "StoryIndexStore");
    var Hh = fl,
      Gh = E((e) => (typeof e == "string" ? { name: e } : e), "normalizeType"),
      Wh = E((e) => (typeof e == "string" ? { type: e } : e), "normalizeControl"),
      Kh = E((e, t) => {
        let { type: r, control: n, ...o } = e,
          a = { name: t, ...o };
        return r && (a.type = Gh(r)), n ? (a.control = Wh(n)) : n === !1 && (a.control = { disable: !0 }), a;
      }, "normalizeInputType"),
      Yr = E((e) => kt(e, Kh), "normalizeInputTypes"),
      pe = E((e) => (Array.isArray(e) ? e : e ? [e] : []), "normalizeArrays"),
      Yh = Me`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
    function Fo(e, t, r) {
      let n = t,
        o = typeof t == "function" ? t : null,
        { story: a } = n;
      a && (Q.debug("deprecated story", a), Ze(Yh));
      let i = ks(e),
        l = (typeof n != "function" && n.name) || n.storyName || a?.name || i,
        s = [...pe(n.decorators), ...pe(a?.decorators)],
        c = { ...a?.parameters, ...n.parameters },
        d = { ...a?.args, ...n.args },
        p = { ...a?.argTypes, ...n.argTypes },
        h = [...pe(n.loaders), ...pe(a?.loaders)],
        f = [...pe(n.beforeEach), ...pe(a?.beforeEach)],
        { render: b, play: g, tags: x = [], globals: S = {} } = n,
        A = c.__id || Cs(r.id, i);
      return {
        moduleExport: t,
        id: A,
        name: l,
        tags: x,
        decorators: s,
        parameters: c,
        args: d,
        argTypes: Yr(p),
        loaders: h,
        beforeEach: f,
        globals: S,
        ...(b && { render: b }),
        ...(o && { userStoryFn: o }),
        ...(g && { play: g }),
      };
    }
    E(Fo, "normalizeStory");
    function No(e, t = e.title, r) {
      let { id: n, argTypes: o } = e;
      return {
        id: oo(n || t),
        ...e,
        title: t,
        ...(o && { argTypes: Yr(o) }),
        parameters: { fileName: r, ...e.parameters },
      };
    }
    E(No, "normalizeComponentAnnotations");
    var Xh = E((e) => {
        let { globals: t, globalTypes: r } = e;
        (t || r) &&
          Q.error("Global args/argTypes can only be set globally", JSON.stringify({ globals: t, globalTypes: r }));
      }, "checkGlobals"),
      Qh = E((e) => {
        let { options: t } = e;
        t?.storySort && Q.error("The storySort option parameter can only be set globally");
      }, "checkStorySort"),
      _s = E((e) => {
        e && (Xh(e), Qh(e));
      }, "checkDisallowedParameters");
    function hl(e, t, r) {
      let { default: n, __namedExportsOrder: o, ...a } = e,
        i = No(n, r, t);
      _s(i.parameters);
      let l = { meta: i, stories: {}, moduleExports: e };
      return (
        Object.keys(a).forEach((s) => {
          if (zr(s, i)) {
            let c = Fo(s, a[s], i);
            _s(c.parameters), (l.stories[c.id] = c);
          }
        }),
        l
      );
    }
    E(hl, "processCSFFile");
    function ml(e) {
      return e != null && yl(e).includes("mount");
    }
    E(ml, "mountDestructured");
    function yl(e) {
      let t = e.toString().match(/[^(]*\(([^)]*)/);
      if (!t) return [];
      let r = bo(t[1]);
      if (!r.length) return [];
      let n = r[0];
      return n.startsWith("{") && n.endsWith("}")
        ? bo(n.slice(1, -1).replace(/\s/g, "")).map((o) => o.replace(/:.*|=.*/g, ""))
        : [];
    }
    E(yl, "getUsedProps");
    function bo(e) {
      let t = [],
        r = [],
        n = 0;
      for (let a = 0; a < e.length; a++)
        if (e[a] === "{" || e[a] === "[") r.push(e[a] === "{" ? "}" : "]");
        else if (e[a] === r[r.length - 1]) r.pop();
        else if (!r.length && e[a] === ",") {
          let i = e.substring(n, a).trim();
          i && t.push(i), (n = a + 1);
        }
      let o = e.substring(n).trim();
      return o && t.push(o), t;
    }
    E(bo, "splitByComma");
    function gl(e, t, r) {
      let n = r(e);
      return (o) => t(n, o);
    }
    E(gl, "decorateStory");
    function bl({
      componentId: e,
      title: t,
      kind: r,
      id: n,
      name: o,
      story: a,
      parameters: i,
      initialArgs: l,
      argTypes: s,
      ...c
    } = {}) {
      return c;
    }
    E(bl, "sanitizeStoryContextUpdate");
    function El(e, t) {
      let r = {},
        n = E(
          (a) => (i) => {
            if (!r.value) throw new Error("Decorated function called without init");
            return (r.value = { ...r.value, ...bl(i) }), a(r.value);
          },
          "bindWithContext"
        ),
        o = t.reduce((a, i) => gl(a, i, n), e);
      return (a) => ((r.value = a), o(a));
    }
    E(El, "defaultDecorateStory");
    var et = E((...e) => {
      let t = {},
        r = e.filter(Boolean),
        n = r.reduce(
          (o, a) => (
            Object.entries(a).forEach(([i, l]) => {
              let s = o[i];
              Array.isArray(l) || typeof s > "u"
                ? (o[i] = l)
                : Je(l) && Je(s)
                  ? (t[i] = !0)
                  : typeof l < "u" && (o[i] = l);
            }),
            o
          ),
          {}
        );
      return (
        Object.keys(t).forEach((o) => {
          let a = r
            .filter(Boolean)
            .map((i) => i[o])
            .filter((i) => typeof i < "u");
          a.every((i) => Je(i)) ? (n[o] = et(...a)) : (n[o] = a[a.length - 1]);
        }),
        n
      );
    }, "combineParameters");
    function Bo(e, t, r) {
      let { moduleExport: n, id: o, name: a } = e || {},
        i = jo(e, t, r),
        l = E(async (I) => {
          let D = {};
          for (let F of [
            ...("__STORYBOOK_TEST_LOADERS__" in be && Array.isArray(be.__STORYBOOK_TEST_LOADERS__)
              ? [be.__STORYBOOK_TEST_LOADERS__]
              : []),
            pe(r.loaders),
            pe(t.loaders),
            pe(e.loaders),
          ]) {
            if (I.abortSignal.aborted) return D;
            let P = await Promise.all(F.map((L) => L(I)));
            Object.assign(D, ...P);
          }
          return D;
        }, "applyLoaders"),
        s = E(async (I) => {
          let D = new Array();
          for (let F of [...pe(r.beforeEach), ...pe(t.beforeEach), ...pe(e.beforeEach)]) {
            if (I.abortSignal.aborted) return D;
            let P = await F(I);
            P && D.push(P);
          }
          return D;
        }, "applyBeforeEach"),
        c = E((I) => I.originalStoryFn(I.args, I), "undecoratedStoryFn"),
        { applyDecorators: d = El, runStep: p } = r,
        h = [...pe(e?.decorators), ...pe(t?.decorators), ...pe(r?.decorators)],
        f = e?.userStoryFn || e?.render || t.render || r.render,
        b = ih(d)(c, h),
        g = E((I) => b(I), "unboundStoryFn"),
        x = e?.play ?? t?.play,
        S = ml(x);
      if (!f && !S) throw new ys({ id: o });
      let A = E((I) => async () => (await I.renderToCanvas(), I.canvas), "defaultMount"),
        k = e.mount ?? t.mount ?? r.mount ?? A,
        T = r.testingLibraryRender;
      return {
        storyGlobals: {},
        ...i,
        moduleExport: n,
        id: o,
        name: a,
        story: a,
        originalStoryFn: f,
        undecoratedStoryFn: c,
        unboundStoryFn: g,
        applyLoaders: l,
        applyBeforeEach: s,
        playFunction: x,
        runStep: p,
        mount: k,
        testingLibraryRender: T,
        renderToCanvas: r.renderToCanvas,
        usesMount: S,
      };
    }
    E(Bo, "prepareStory");
    function vl(e, t, r) {
      return { ...jo(void 0, e, t), moduleExport: r };
    }
    E(vl, "prepareMeta");
    function jo(e, t, r) {
      let n = ["dev", "test"],
        o = be.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [],
        a = Is(...n, ...o, ...(r.tags ?? []), ...(t.tags ?? []), ...(e?.tags ?? [])),
        i = et(r.parameters, t.parameters, e?.parameters),
        { argTypesEnhancers: l = [], argsEnhancers: s = [] } = r,
        c = et(r.argTypes, t.argTypes, e?.argTypes);
      if (e) {
        let S = e?.userStoryFn || e?.render || t.render || r.render;
        i.__isArgsStory = S && S.length > 0;
      }
      let d = { ...r.args, ...t.args, ...e?.args },
        p = { ...t.globals, ...e?.globals },
        h = {
          componentId: t.id,
          title: t.title,
          kind: t.title,
          id: e?.id || t.id,
          name: e?.name || "__meta",
          story: e?.name || "__meta",
          component: t.component,
          subcomponents: t.subcomponents,
          tags: a,
          parameters: i,
          initialArgs: d,
          argTypes: c,
          storyGlobals: p,
        };
      h.argTypes = l.reduce((S, A) => A({ ...h, argTypes: S }), h.argTypes);
      let f = { ...d };
      h.initialArgs = s.reduce((S, A) => ({ ...S, ...A({ ...h, initialArgs: S }) }), f);
      let { name: b, story: g, ...x } = h;
      return x;
    }
    E(jo, "preparePartialAnnotations");
    function Lo(e) {
      let { args: t } = e,
        r = { ...e, allArgs: void 0, argsByTarget: void 0 };
      if (be.FEATURES?.argTypeTargetsV7) {
        let a = ll(e);
        r = { ...e, allArgs: e.args, argsByTarget: a, args: a[sl] || {} };
      }
      let n = Object.entries(r.args).reduce((a, [i, l]) => {
          if (!r.argTypes[i]?.mapping) return (a[i] = l), a;
          let s = E((c) => {
            let d = r.argTypes[i].mapping;
            return d && c in d ? d[c] : c;
          }, "mappingFn");
          return (a[i] = Array.isArray(l) ? l.map(s) : s(l)), a;
        }, {}),
        o = Object.entries(n).reduce((a, [i, l]) => {
          let s = r.argTypes[i] || {};
          return Ts(s, n, r.globals) && (a[i] = l), a;
        }, {});
      return { ...r, unmappedArgs: t, args: o };
    }
    E(Lo, "prepareContext");
    var Eo = E((e, t, r) => {
        let n = typeof e;
        switch (n) {
          case "boolean":
          case "string":
          case "number":
          case "function":
          case "symbol":
            return { name: n };
          default:
            break;
        }
        return e
          ? r.has(e)
            ? (Q.warn(Me`
        We've detected a cycle in arg '${t}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),
              { name: "other", value: "cyclic object" })
            : (r.add(e),
              Array.isArray(e)
                ? { name: "array", value: e.length > 0 ? Eo(e[0], t, new Set(r)) : { name: "other", value: "unknown" } }
                : { name: "object", value: kt(e, (o) => Eo(o, t, new Set(r))) })
          : { name: "object", value: {} };
      }, "inferType"),
      xl = E((e) => {
        let { id: t, argTypes: r = {}, initialArgs: n = {} } = e,
          o = kt(n, (i, l) => ({ name: l, type: Eo(i, `${t}.${l}`, new Set()) })),
          a = kt(r, (i, l) => ({ name: l }));
        return et(o, a, r);
      }, "inferArgTypes");
    xl.secondPass = !0;
    var Ps = E((e, t) => (Array.isArray(t) ? t.includes(e) : e.match(t)), "matches"),
      Zh = E(
        (e, t, r) =>
          !t && !r
            ? e
            : e &&
              al(e, (n, o) => {
                let a = n.name || o.toString();
                return !!(!t || Ps(a, t)) && (!r || !Ps(a, r));
              }),
        "filterArgTypes"
      ),
      em = E((e, t, r) => {
        let { type: n, options: o } = e;
        if (n) {
          if (r.color && r.color.test(t)) {
            let a = n.name;
            if (a === "string") return { control: { type: "color" } };
            a !== "enum" &&
              Q.warn(`Addon controls: Control of type color only supports string, received "${a}" instead`);
          }
          if (r.date && r.date.test(t)) return { control: { type: "date" } };
          switch (n.name) {
            case "array":
              return { control: { type: "object" } };
            case "boolean":
              return { control: { type: "boolean" } };
            case "string":
              return { control: { type: "text" } };
            case "number":
              return { control: { type: "number" } };
            case "enum": {
              let { value: a } = n;
              return { control: { type: a?.length <= 5 ? "radio" : "select" }, options: a };
            }
            case "function":
            case "symbol":
              return null;
            default:
              return { control: { type: o ? "select" : "object" } };
          }
        }
      }, "inferControl"),
      Sl = E((e) => {
        let {
          argTypes: t,
          parameters: { __isArgsStory: r, controls: { include: n = null, exclude: o = null, matchers: a = {} } = {} },
        } = e;
        if (!r) return t;
        let i = Zh(t, n, o),
          l = kt(i, (s, c) => s?.type && em(s, c.toString(), a));
        return et(l, i);
      }, "inferControls");
    Sl.secondPass = !0;
    function Xr({
      argTypes: e,
      globalTypes: t,
      argTypesEnhancers: r,
      decorators: n,
      loaders: o,
      beforeEach: a,
      globals: i,
      initialGlobals: l,
      ...s
    }) {
      return (
        i &&
          Object.keys(i).length > 0 &&
          Ze(Me`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `),
        {
          ...(e && { argTypes: Yr(e) }),
          ...(t && { globalTypes: Yr(t) }),
          decorators: pe(n),
          loaders: pe(o),
          beforeEach: pe(a),
          argTypesEnhancers: [...(r || []), xl, Sl],
          initialGlobals: et(l, i),
          ...s,
        }
      );
    }
    E(Xr, "normalizeProjectAnnotations");
    var tm = E(
      (e) => async () => {
        let t = [];
        for (let r of e) {
          let n = await r();
          n && t.unshift(n);
        }
        return async () => {
          for (let r of t) await r();
        };
      },
      "composeBeforeAllHooks"
    );
    function wl(e) {
      return async (t, r, n) => {
        await e.reduceRight(
          (o, a) => async () => a(t, o, n),
          async () => r(n)
        )();
      };
    }
    E(wl, "composeStepRunners");
    function zt(e, t) {
      return e.map((r) => r.default?.[t] ?? r[t]).filter(Boolean);
    }
    E(zt, "getField");
    function dt(e, t, r = {}) {
      return zt(e, t).reduce((n, o) => {
        let a = pe(o);
        return r.reverseFileOrder ? [...a, ...n] : [...n, ...a];
      }, []);
    }
    E(dt, "getArrayField");
    function Jt(e, t) {
      return Object.assign({}, ...zt(e, t));
    }
    E(Jt, "getObjectField");
    function At(e, t) {
      return zt(e, t).pop();
    }
    E(At, "getSingletonField");
    function Qr(e) {
      let t = dt(e, "argTypesEnhancers"),
        r = zt(e, "runStep"),
        n = dt(e, "beforeAll");
      return {
        parameters: et(...zt(e, "parameters")),
        decorators: dt(e, "decorators", { reverseFileOrder: !(be.FEATURES?.legacyDecoratorFileOrder ?? !1) }),
        args: Jt(e, "args"),
        argsEnhancers: dt(e, "argsEnhancers"),
        argTypes: Jt(e, "argTypes"),
        argTypesEnhancers: [...t.filter((o) => !o.secondPass), ...t.filter((o) => o.secondPass)],
        globals: Jt(e, "globals"),
        initialGlobals: Jt(e, "initialGlobals"),
        globalTypes: Jt(e, "globalTypes"),
        loaders: dt(e, "loaders"),
        beforeAll: tm(n),
        beforeEach: dt(e, "beforeEach"),
        render: At(e, "render"),
        renderToCanvas: At(e, "renderToCanvas"),
        renderToDOM: At(e, "renderToDOM"),
        applyDecorators: At(e, "applyDecorators"),
        runStep: wl(r),
        tags: dt(e, "tags"),
        mount: At(e, "mount"),
        testingLibraryRender: At(e, "testingLibraryRender"),
      };
    }
    E(Qr, "composeConfigs");
    function rm(e) {
      globalThis.defaultProjectAnnotations = e;
    }
    E(rm, "setDefaultProjectAnnotations");
    var nm = "ComposedStory",
      om = "Unnamed Story";
    function Al(e) {
      return e ? ("default" in e ? e.default : e) : {};
    }
    E(Al, "extractAnnotation");
    function am(e) {
      let t = Array.isArray(e) ? e : [e];
      return (
        (globalThis.globalProjectAnnotations = Qr(t.map(Al))),
        Qr([globalThis.defaultProjectAnnotations ?? {}, globalThis.globalProjectAnnotations ?? {}])
      );
    }
    E(am, "setProjectAnnotations");
    var pt = [];
    function Tl(e, t, r, n, o) {
      if (e === void 0) throw new Error("Expected a story but received undefined.");
      t.title = t.title ?? nm;
      let a = No(t),
        i = o || e.storyName || e.story?.name || e.name || om,
        l = Fo(i, e, a),
        s = Xr(
          Qr([
            n && Object.keys(n).length > 0 ? n : (globalThis.defaultProjectAnnotations ?? {}),
            globalThis.globalProjectAnnotations ?? {},
            r ?? {},
          ])
        ),
        c = Bo(l, a, s),
        d = { ...dl(s.globalTypes), ...s.initialGlobals, ...c.storyGlobals },
        p = E(() => {
          let x = Lo({
            hooks: new Zs(),
            globals: d,
            args: { ...c.initialArgs },
            viewMode: "story",
            loaded: {},
            abortSignal: new AbortController().signal,
            step: E((S, A) => c.runStep(S, A, x), "step"),
            canvasElement: null,
            canvas: {},
            globalTypes: s.globalTypes,
            ...c,
            context: null,
            mount: null,
          });
          return (
            (x.context = x),
            c.renderToCanvas &&
              (x.renderToCanvas = async () => {
                let S = await c.renderToCanvas?.(
                  {
                    componentId: c.componentId,
                    title: c.title,
                    id: c.id,
                    name: c.name,
                    tags: c.tags,
                    showMain: E(() => {}, "showMain"),
                    showError: E((A) => {
                      throw new Error(`${A.title}
${A.description}`);
                    }, "showError"),
                    showException: E((A) => {
                      throw A;
                    }, "showException"),
                    forceRemount: !0,
                    storyContext: x,
                    storyFn: E(() => c.unboundStoryFn(x), "storyFn"),
                    unboundStoryFn: c.unboundStoryFn,
                  },
                  x.canvasElement
                );
                S && pt.push(S);
              }),
            (x.mount = c.mount(x)),
            x
          );
        }, "initializeContext"),
        h,
        f = E(async (x) => {
          let S = p();
          return (
            (S.canvasElement ??= globalThis?.document?.body),
            h && (S.loaded = h.loaded),
            Object.assign(S, x),
            c.playFunction(S)
          );
        }, "play"),
        b = E((x) => {
          let S = p();
          return Object.assign(S, x), Cl(c, S);
        }, "run"),
        g = c.playFunction ? f : void 0;
      return Object.assign(
        E(function (x) {
          let S = p();
          return h && (S.loaded = h.loaded), (S.args = { ...S.initialArgs, ...x }), c.unboundStoryFn(S);
        }, "storyFn"),
        {
          id: c.id,
          storyName: i,
          load: E(async () => {
            for (let S of [...pt].reverse()) await S();
            pt.length = 0;
            let x = p();
            (x.loaded = await c.applyLoaders(x)), pt.push(...(await c.applyBeforeEach(x)).filter(Boolean)), (h = x);
          }, "load"),
          globals: d,
          args: c.initialArgs,
          parameters: c.parameters,
          argTypes: c.argTypes,
          play: g,
          run: b,
          tags: c.tags,
        }
      );
    }
    E(Tl, "composeStory");
    var im = E((e, t, r, n) => Tl(e, t, r, {}, n), "defaultComposeStory");
    function sm(e, t, r = im) {
      let { default: n, __esModule: o, __namedExportsOrder: a, ...i } = e;
      return Object.entries(i).reduce((l, [s, c]) => (zr(s, n) ? Object.assign(l, { [s]: r(c, n, t, s) }) : l), {});
    }
    E(sm, "composeStories");
    function lm(e) {
      return e.extend({
        mount: E(async ({ mount: t, page: r }, n) => {
          await n(async (o, ...a) => {
            if (!("__pw_type" in o) || ("__pw_type" in o && o.__pw_type !== "jsx"))
              throw new Error(Me`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
            await r.evaluate(async (l) => {
              let s = await globalThis.__pwUnwrapObject?.(l);
              return ("__pw_type" in s ? s.type : s)?.load?.();
            }, o);
            let i = await t(o, ...a);
            return (
              await r.evaluate(async (l) => {
                let s = await globalThis.__pwUnwrapObject?.(l),
                  c = "__pw_type" in s ? s.type : s,
                  d = document.querySelector("#root");
                return c?.play?.({ canvasElement: d });
              }, o),
              i
            );
          });
        }, "mount"),
      });
    }
    E(lm, "createPlaywrightTest");
    async function Cl(e, t) {
      for (let o of [...pt].reverse()) await o();
      if (((pt.length = 0), !t.canvasElement)) {
        let o = document.createElement("div");
        globalThis?.document?.body?.appendChild(o),
          (t.canvasElement = o),
          pt.push(() => {
            globalThis?.document?.body?.contains(o) && globalThis?.document?.body?.removeChild(o);
          });
      }
      if (((t.loaded = await e.applyLoaders(t)), t.abortSignal.aborted)) return;
      pt.push(...(await e.applyBeforeEach(t)).filter(Boolean));
      let r = e.playFunction,
        n = e.usesMount;
      n || (await t.mount()),
        !t.abortSignal.aborted &&
          r &&
          (n ||
            (t.mount = async () => {
              throw new Vr({ playFunction: r.toString() });
            }),
          await r(t));
    }
    E(Cl, "runStory");
    function vo(e, t) {
      return nl(ol(e, t), (r) => r === void 0);
    }
    E(vo, "picky");
    var Fs = 1e3,
      um = 1e4,
      kl = class {
        constructor(t, r, n) {
          (this.importFn = r),
            (this.getStoriesJsonData = E(() => {
              let i = this.getSetStoriesPayload(),
                l = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
              return {
                v: 3,
                stories: kt(i.stories, (s) => {
                  let { importPath: c } = this.storyIndex.entries[s.id];
                  return {
                    ...vo(s, ["id", "name", "title"]),
                    importPath: c,
                    kind: s.title,
                    story: s.name,
                    parameters: { ...vo(s.parameters, l), fileName: c },
                  };
                }),
              };
            }, "getStoriesJsonData")),
            (this.storyIndex = new Hh(t)),
            (this.projectAnnotations = Xr(n));
          let { initialGlobals: o, globalTypes: a } = this.projectAnnotations;
          (this.args = new qh()),
            (this.userGlobals = new Vh({ globals: o, globalTypes: a })),
            (this.hooks = {}),
            (this.cleanupCallbacks = {}),
            (this.processCSFFileWithCache = (0, lo.default)(Fs)(hl)),
            (this.prepareMetaWithCache = (0, lo.default)(Fs)(vl)),
            (this.prepareStoryWithCache = (0, lo.default)(um)(Bo));
        }
        setProjectAnnotations(t) {
          this.projectAnnotations = Xr(t);
          let { initialGlobals: r, globalTypes: n } = t;
          this.userGlobals.set({ globals: r, globalTypes: n });
        }
        async onStoriesChanged({ importFn: t, storyIndex: r }) {
          t && (this.importFn = t),
            r && (this.storyIndex.entries = r.entries),
            this.cachedCSFFiles && (await this.cacheAllCSFFiles());
        }
        async storyIdToEntry(t) {
          return this.storyIndex.storyIdToEntry(t);
        }
        async loadCSFFileByStoryId(t) {
          let { importPath: r, title: n } = this.storyIndex.storyIdToEntry(t),
            o = await this.importFn(r);
          return this.processCSFFileWithCache(o, r, n);
        }
        async loadAllCSFFiles() {
          let t = {};
          return (
            Object.entries(this.storyIndex.entries).forEach(([r, { importPath: n }]) => {
              t[n] = r;
            }),
            (
              await Promise.all(
                Object.entries(t).map(async ([r, n]) => ({
                  importPath: r,
                  csfFile: await this.loadCSFFileByStoryId(n),
                }))
              )
            ).reduce((r, { importPath: n, csfFile: o }) => ((r[n] = o), r), {})
          );
        }
        async cacheAllCSFFiles() {
          this.cachedCSFFiles = await this.loadAllCSFFiles();
        }
        preparedMetaFromCSFFile({ csfFile: t }) {
          let r = t.meta;
          return this.prepareMetaWithCache(r, this.projectAnnotations, t.moduleExports.default);
        }
        async loadStory({ storyId: t }) {
          let r = await this.loadCSFFileByStoryId(t);
          return this.storyFromCSFFile({ storyId: t, csfFile: r });
        }
        storyFromCSFFile({ storyId: t, csfFile: r }) {
          let n = r.stories[t];
          if (!n) throw new ds({ storyId: t });
          let o = r.meta,
            a = this.prepareStoryWithCache(n, o, this.projectAnnotations);
          return this.args.setInitial(a), (this.hooks[a.id] = this.hooks[a.id] || new Zs()), a;
        }
        componentStoriesFromCSFFile({ csfFile: t }) {
          return Object.keys(this.storyIndex.entries)
            .filter((r) => !!t.stories[r])
            .map((r) => this.storyFromCSFFile({ storyId: r, csfFile: t }));
        }
        async loadEntry(t) {
          let r = await this.storyIdToEntry(t),
            n = r.type === "docs" ? r.storiesImports : [],
            [o, ...a] = await Promise.all([
              this.importFn(r.importPath),
              ...n.map((i) => {
                let l = this.storyIndex.importPathToEntry(i);
                return this.loadCSFFileByStoryId(l.id);
              }),
            ]);
          return { entryExports: o, csfFiles: a };
        }
        getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
          let n = this.userGlobals.get(),
            { initialGlobals: o } = this.userGlobals;
          return Lo({
            ...t,
            args: r ? t.initialArgs : this.args.get(t.id),
            initialGlobals: o,
            globalTypes: this.projectAnnotations.globalTypes,
            userGlobals: n,
            globals: { ...n, ...t.storyGlobals },
            hooks: this.hooks[t.id],
          });
        }
        addCleanupCallbacks(t, r) {
          this.cleanupCallbacks[t.id] = r;
        }
        async cleanupStory(t) {
          this.hooks[t.id].clean();
          let r = this.cleanupCallbacks[t.id];
          if (r) for (let n of [...r].reverse()) await n();
          delete this.cleanupCallbacks[t.id];
        }
        extract(t = { includeDocsOnly: !1 }) {
          let { cachedCSFFiles: r } = this;
          if (!r) throw new Qi();
          return Object.entries(this.storyIndex.entries).reduce((n, [o, { type: a, importPath: i }]) => {
            if (a === "docs") return n;
            let l = r[i],
              s = this.storyFromCSFFile({ storyId: o, csfFile: l });
            return (
              (!t.includeDocsOnly && s.parameters.docsOnly) ||
                (n[o] = Object.entries(s).reduce(
                  (c, [d, p]) =>
                    d === "moduleExport" || typeof p == "function"
                      ? c
                      : Array.isArray(p)
                        ? Object.assign(c, { [d]: p.slice().sort() })
                        : Object.assign(c, { [d]: p }),
                  { args: s.initialArgs }
                )),
              n
            );
          }, {});
        }
        getSetStoriesPayload() {
          let t = this.extract({ includeDocsOnly: !0 }),
            r = Object.values(t).reduce((n, { title: o }) => ((n[o] = {}), n), {});
          return { v: 2, globals: this.userGlobals.get(), globalParameters: {}, kindParameters: r, stories: t };
        }
        raw() {
          return (
            Ze("StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"),
            Object.values(this.extract())
              .map(({ id: t }) => this.fromId(t))
              .filter(Boolean)
          );
        }
        fromId(t) {
          if (
            (Ze("StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"),
            !this.cachedCSFFiles)
          )
            throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
          let r;
          try {
            ({ importPath: r } = this.storyIndex.storyIdToEntry(t));
          } catch {
            return null;
          }
          let n = this.cachedCSFFiles[r],
            o = this.storyFromCSFFile({ storyId: t, csfFile: n });
          return {
            ...o,
            storyFn: E((a) => {
              let i = {
                ...this.getStoryContext(o),
                abortSignal: new AbortController().signal,
                canvasElement: null,
                loaded: {},
                step: E((l, s) => o.runStep(l, s, i), "step"),
                context: null,
                mount: null,
                canvas: {},
                viewMode: "story",
              };
              return o.unboundStoryFn({ ...i, ...a });
            }, "storyFn"),
          };
        }
      };
    E(kl, "StoryStore");
    var cm = kl;
    function Il(e) {
      return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
    }
    E(Il, "slash");
    var dm = E((e) => {
      if (e.length === 0) return e;
      let t = e[e.length - 1],
        r = t?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
      if (e.length === 1) return [r];
      let n = e[e.length - 2];
      return r && n && r.toLowerCase() === n.toLowerCase()
        ? [...e.slice(0, -2), r]
        : r && (/^(story|stories)([.][^.]+)$/i.test(t) || /^index$/i.test(r))
          ? e.slice(0, -1)
          : [...e.slice(0, -1), r];
    }, "sanitize");
    function xo(e) {
      return e
        .flatMap((t) => t.split("/"))
        .filter(Boolean)
        .join("/");
    }
    E(xo, "pathJoin");
    var pm = E((e, t, r) => {
        let { directory: n, importPathMatcher: o, titlePrefix: a = "" } = t || {};
        typeof e == "number" &&
          ct.warn(Me`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
        let i = Il(String(e));
        if (o.exec(i)) {
          if (!r) {
            let l = i.replace(n, ""),
              s = xo([a, l]).split("/");
            return (s = dm(s)), s.join("/");
          }
          return a ? xo([a, r]) : r;
        }
      }, "userOrAutoTitleFromSpecifier"),
      Mk = E((e, t, r) => {
        for (let n = 0; n < t.length; n += 1) {
          let o = pm(e, t[n], r);
          if (o) return o;
        }
        return r || void 0;
      }, "userOrAutoTitle"),
      Ns = /\s*\/\s*/,
      fm = E(
        (e = {}) =>
          (t, r) => {
            if (t.title === r.title && !e.includeNames) return 0;
            let n = e.method || "configure",
              o = e.order || [],
              a = t.title.trim().split(Ns),
              i = r.title.trim().split(Ns);
            e.includeNames && (a.push(t.name), i.push(r.name));
            let l = 0;
            for (; a[l] || i[l]; ) {
              if (!a[l]) return -1;
              if (!i[l]) return 1;
              let s = a[l],
                c = i[l];
              if (s !== c) {
                let p = o.indexOf(s),
                  h = o.indexOf(c),
                  f = o.indexOf("*");
                return p !== -1 || h !== -1
                  ? (p === -1 && (f !== -1 ? (p = f) : (p = o.length)),
                    h === -1 && (f !== -1 ? (h = f) : (h = o.length)),
                    p - h)
                  : n === "configure"
                    ? 0
                    : s.localeCompare(c, e.locales ? e.locales : void 0, { numeric: !0, sensitivity: "accent" });
              }
              let d = o.indexOf(s);
              d === -1 && (d = o.indexOf("*")), (o = d !== -1 && Array.isArray(o[d + 1]) ? o[d + 1] : []), (l += 1);
            }
            return 0;
          },
        "storySort"
      ),
      hm = E((e, t, r) => {
        if (t) {
          let n;
          typeof t == "function" ? (n = t) : (n = fm(t)), e.sort(n);
        } else e.sort((n, o) => r.indexOf(n.importPath) - r.indexOf(o.importPath));
        return e;
      }, "sortStoriesCommon"),
      Uk = E((e, t, r) => {
        try {
          return hm(e, t, r);
        } catch (n) {
          throw new Error(Me`
    Error sorting stories with sort parameter ${t}:

    > ${n.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
        }
      }, "sortStoriesV7"),
      tn = new Error("prepareAborted"),
      { AbortController: Bs } = globalThis;
    function So(e) {
      try {
        let { name: t = "Error", message: r = String(e), stack: n } = e;
        return { name: t, message: r, stack: n };
      } catch {
        return { name: "Error", message: String(e) };
      }
    }
    E(So, "serializeError");
    var Ol = class {
      constructor(t, r, n, o, a, i, l = { autoplay: !0, forceInitialArgs: !1 }, s) {
        (this.channel = t),
          (this.store = r),
          (this.renderToScreen = n),
          (this.callbacks = o),
          (this.id = a),
          (this.viewMode = i),
          (this.renderOptions = l),
          (this.type = "story"),
          (this.notYetRendered = !0),
          (this.rerenderEnqueued = !1),
          (this.disableKeyListeners = !1),
          (this.teardownRender = E(() => {}, "teardownRender")),
          (this.torndown = !1),
          (this.abortController = new Bs()),
          s && ((this.story = s), (this.phase = "preparing"));
      }
      async runPhase(t, r, n) {
        (this.phase = r),
          this.channel.emit(qt, { newPhase: this.phase, storyId: this.id }),
          n && (await n(), this.checkIfAborted(t));
      }
      checkIfAborted(t) {
        return t.aborted
          ? ((this.phase = "aborted"), this.channel.emit(qt, { newPhase: this.phase, storyId: this.id }), !0)
          : !1;
      }
      async prepare() {
        if (
          (await this.runPhase(this.abortController.signal, "preparing", async () => {
            this.story = await this.store.loadStory({ storyId: this.id });
          }),
          this.abortController.signal.aborted)
        )
          throw (await this.store.cleanupStory(this.story), tn);
      }
      isEqual(t) {
        return !!(this.id === t.id && this.story && this.story === t.story);
      }
      isPreparing() {
        return ["preparing"].includes(this.phase);
      }
      isPending() {
        return ["loading", "beforeEach", "rendering", "playing"].includes(this.phase);
      }
      async renderToElement(t) {
        return (this.canvasElement = t), this.render({ initial: !0, forceRemount: !0 });
      }
      storyContext() {
        if (!this.story) throw new Error("Cannot call storyContext before preparing");
        let { forceInitialArgs: t } = this.renderOptions;
        return this.store.getStoryContext(this.story, { forceInitialArgs: t });
      }
      async render({ initial: t = !1, forceRemount: r = !1 } = {}) {
        let { canvasElement: n } = this;
        if (!this.story) throw new Error("cannot render when not prepared");
        let o = this.story;
        if (!n) throw new Error("cannot render when canvasElement is unset");
        let {
          id: a,
          componentId: i,
          title: l,
          name: s,
          tags: c,
          applyLoaders: d,
          applyBeforeEach: p,
          unboundStoryFn: h,
          playFunction: f,
          runStep: b,
        } = o;
        r && !t && (this.cancelRender(), (this.abortController = new Bs()));
        let g = this.abortController.signal,
          x = !1,
          S = o.usesMount;
        try {
          let A = {
            ...this.storyContext(),
            viewMode: this.viewMode,
            abortSignal: g,
            canvasElement: n,
            loaded: {},
            step: E((P, L) => b(P, L, A), "step"),
            context: null,
            canvas: {},
            renderToCanvas: E(async () => {
              let P = await this.renderToScreen(k, n);
              (this.teardownRender = P || (() => {})), (x = !0);
            }, "renderToCanvas"),
            mount: E(async (...P) => {
              this.callbacks.showStoryDuringRender?.();
              let L = null;
              return (
                await this.runPhase(g, "rendering", async () => {
                  L = await o.mount(A)(...P);
                }),
                S && (await this.runPhase(g, "playing")),
                L
              );
            }, "mount"),
          };
          A.context = A;
          let k = {
            componentId: i,
            title: l,
            kind: l,
            id: a,
            name: s,
            story: s,
            tags: c,
            ...this.callbacks,
            showError: E((P) => ((this.phase = "errored"), this.callbacks.showError(P)), "showError"),
            showException: E((P) => ((this.phase = "errored"), this.callbacks.showException(P)), "showException"),
            forceRemount: r || this.notYetRendered,
            storyContext: A,
            storyFn: E(() => h(A), "storyFn"),
            unboundStoryFn: h,
          };
          if (
            (await this.runPhase(g, "loading", async () => {
              A.loaded = await d(A);
            }),
            g.aborted)
          )
            return;
          let T = await p(A);
          if (
            (this.store.addCleanupCallbacks(o, T),
            this.checkIfAborted(g) || (!x && !S && (await A.mount()), (this.notYetRendered = !1), g.aborted))
          )
            return;
          let I = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0,
            D = new Set(),
            F = E((P) => D.add("error" in P ? P.error : P.reason), "onError");
          if (this.renderOptions.autoplay && r && f && this.phase !== "errored") {
            window.addEventListener("error", F),
              window.addEventListener("unhandledrejection", F),
              (this.disableKeyListeners = !0);
            try {
              if (
                (S
                  ? await f(A)
                  : ((A.mount = async () => {
                      throw new Vr({ playFunction: f.toString() });
                    }),
                    await this.runPhase(g, "playing", async () => f(A))),
                !x)
              )
                throw new bs();
              this.checkIfAborted(g),
                !I && D.size > 0 ? await this.runPhase(g, "errored") : await this.runPhase(g, "played");
            } catch (P) {
              if (
                (this.callbacks.showStoryDuringRender?.(),
                await this.runPhase(g, "errored", async () => {
                  this.channel.emit(si, So(P));
                }),
                this.story.parameters.throwPlayFunctionExceptions !== !1)
              )
                throw P;
              console.error(P);
            }
            if (
              (!I && D.size > 0 && this.channel.emit(vi, Array.from(D).map(So)),
              (this.disableKeyListeners = !1),
              window.removeEventListener("unhandledrejection", F),
              window.removeEventListener("error", F),
              g.aborted)
            )
              return;
          }
          await this.runPhase(g, "completed", async () => this.channel.emit(cr, a));
        } catch (A) {
          (this.phase = "errored"), this.callbacks.showException(A);
        }
        this.rerenderEnqueued && ((this.rerenderEnqueued = !1), this.render());
      }
      async rerender() {
        if (this.isPending() && this.phase !== "playing") this.rerenderEnqueued = !0;
        else return this.render();
      }
      async remount() {
        return await this.teardown(), this.render({ forceRemount: !0 });
      }
      cancelRender() {
        this.abortController?.abort();
      }
      async teardown() {
        (this.torndown = !0), this.cancelRender(), this.story && (await this.store.cleanupStory(this.story));
        for (let t = 0; t < 3; t += 1) {
          if (!this.isPending()) {
            await this.teardownRender();
            return;
          }
          await new Promise((r) => setTimeout(r, 0));
        }
        window.location.reload(), await new Promise(() => {});
      }
    };
    E(Ol, "StoryRender");
    var wo = Ol,
      { fetch: mm } = be,
      ym = "./index.json",
      Dl = class {
        constructor(t, r, n = Ct.getChannel(), o = !0) {
          (this.importFn = t),
            (this.getProjectAnnotations = r),
            (this.channel = n),
            (this.storyRenders = []),
            (this.storeInitializationPromise = new Promise((a, i) => {
              (this.resolveStoreInitializationPromise = a), (this.rejectStoreInitializationPromise = i);
            })),
            o && this.initialize();
        }
        get storyStore() {
          return new Proxy(
            {},
            {
              get: E((t, r) => {
                if (this.storyStoreValue)
                  return (
                    Ze("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[r]
                  );
                throw new fs();
              }, "get"),
            }
          );
        }
        async initialize() {
          this.setupListeners();
          try {
            let t = await this.getProjectAnnotationsOrRenderError();
            await this.runBeforeAllHook(t), await this.initializeWithProjectAnnotations(t);
          } catch (t) {
            this.rejectStoreInitializationPromise(t);
          }
        }
        ready() {
          return this.storeInitializationPromise;
        }
        setupListeners() {
          this.channel.on(mi, this.onStoryIndexChanged.bind(this)),
            this.channel.on(jr, this.onUpdateGlobals.bind(this)),
            this.channel.on(Lr, this.onUpdateArgs.bind(this)),
            this.channel.on(ri, this.onRequestArgTypesInfo.bind(this)),
            this.channel.on(Nr, this.onResetArgs.bind(this)),
            this.channel.on(Fr, this.onForceReRender.bind(this)),
            this.channel.on(ai, this.onForceRemount.bind(this));
        }
        async getProjectAnnotationsOrRenderError() {
          try {
            let t = await this.getProjectAnnotations();
            if (((this.renderToCanvas = t.renderToCanvas), !this.renderToCanvas)) throw new es();
            return t;
          } catch (t) {
            throw (this.renderPreviewEntryError("Error reading preview.js:", t), t);
          }
        }
        async initializeWithProjectAnnotations(t) {
          this.projectAnnotationsBeforeInitialization = t;
          try {
            let r = await this.getStoryIndexFromServer();
            return this.initializeWithStoryIndex(r);
          } catch (r) {
            throw (this.renderPreviewEntryError("Error loading story index:", r), r);
          }
        }
        async runBeforeAllHook(t) {
          try {
            await this.beforeAllCleanup?.(), (this.beforeAllCleanup = await t.beforeAll?.());
          } catch (r) {
            throw (this.renderPreviewEntryError("Error in beforeAll hook:", r), r);
          }
        }
        async getStoryIndexFromServer() {
          let t = await mm(ym);
          if (t.status === 200) return t.json();
          throw new ns({ text: await t.text() });
        }
        initializeWithStoryIndex(t) {
          if (!this.projectAnnotationsBeforeInitialization)
            throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
          (this.storyStoreValue = new cm(t, this.importFn, this.projectAnnotationsBeforeInitialization)),
            delete this.projectAnnotationsBeforeInitialization,
            this.setInitialGlobals(),
            this.resolveStoreInitializationPromise();
        }
        async setInitialGlobals() {
          this.emitGlobals();
        }
        emitGlobals() {
          if (!this.storyStoreValue) throw new Ne({ methodName: "emitGlobals" });
          let t = {
            globals: this.storyStoreValue.userGlobals.get() || {},
            globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {},
          };
          this.channel.emit(di, t);
        }
        async onGetProjectAnnotationsChanged({ getProjectAnnotations: t }) {
          delete this.previewEntryError, (this.getProjectAnnotations = t);
          let r = await this.getProjectAnnotationsOrRenderError();
          if ((await this.runBeforeAllHook(r), !this.storyStoreValue)) {
            await this.initializeWithProjectAnnotations(r);
            return;
          }
          this.storyStoreValue.setProjectAnnotations(r), this.emitGlobals();
        }
        async onStoryIndexChanged() {
          if ((delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization)))
            try {
              let t = await this.getStoryIndexFromServer();
              if (this.projectAnnotationsBeforeInitialization) {
                this.initializeWithStoryIndex(t);
                return;
              }
              await this.onStoriesChanged({ storyIndex: t });
            } catch (t) {
              throw (this.renderPreviewEntryError("Error loading story index:", t), t);
            }
        }
        async onStoriesChanged({ importFn: t, storyIndex: r }) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "onStoriesChanged" });
          await this.storyStoreValue.onStoriesChanged({ importFn: t, storyIndex: r });
        }
        async onUpdateGlobals({ globals: t, currentStory: r }) {
          if ((this.storyStoreValue || (await this.storeInitializationPromise), !this.storyStoreValue))
            throw new Ne({ methodName: "onUpdateGlobals" });
          if ((this.storyStoreValue.userGlobals.update(t), r)) {
            let {
              initialGlobals: n,
              storyGlobals: o,
              userGlobals: a,
              globals: i,
            } = this.storyStoreValue.getStoryContext(r);
            this.channel.emit($t, { initialGlobals: n, userGlobals: a, storyGlobals: o, globals: i });
          } else {
            let { initialGlobals: n, globals: o } = this.storyStoreValue.userGlobals;
            this.channel.emit($t, { initialGlobals: n, userGlobals: o, storyGlobals: {}, globals: o });
          }
          await Promise.all(this.storyRenders.map((n) => n.rerender()));
        }
        async onUpdateArgs({ storyId: t, updatedArgs: r }) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "onUpdateArgs" });
          this.storyStoreValue.args.update(t, r),
            await Promise.all(
              this.storyRenders
                .filter((n) => n.id === t && !n.renderOptions.forceInitialArgs)
                .map((n) => (n.story && n.story.usesMount ? n.remount() : n.rerender()))
            ),
            this.channel.emit(pi, { storyId: t, args: this.storyStoreValue.args.get(t) });
        }
        async onRequestArgTypesInfo({ id: t, payload: r }) {
          try {
            await this.storeInitializationPromise;
            let n = await this.storyStoreValue?.loadStory(r);
            this.channel.emit(Vn, { id: t, success: !0, payload: { argTypes: n?.argTypes || {} }, error: null });
          } catch (n) {
            this.channel.emit(Vn, { id: t, success: !1, error: n?.message });
          }
        }
        async onResetArgs({ storyId: t, argNames: r }) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "onResetArgs" });
          let n =
              this.storyRenders.find((a) => a.id === t)?.story ||
              (await this.storyStoreValue.loadStory({ storyId: t })),
            o = (
              r || [...new Set([...Object.keys(n.initialArgs), ...Object.keys(this.storyStoreValue.args.get(t))])]
            ).reduce((a, i) => ((a[i] = n.initialArgs[i]), a), {});
          await this.onUpdateArgs({ storyId: t, updatedArgs: o });
        }
        async onForceReRender() {
          await Promise.all(this.storyRenders.map((t) => t.rerender()));
        }
        async onForceRemount({ storyId: t }) {
          await Promise.all(this.storyRenders.filter((r) => r.id === t).map((r) => r.remount()));
        }
        renderStoryToElement(t, r, n, o) {
          if (!this.renderToCanvas || !this.storyStoreValue) throw new Ne({ methodName: "renderStoryToElement" });
          let a = new wo(this.channel, this.storyStoreValue, this.renderToCanvas, n, t.id, "docs", o, t);
          return (
            a.renderToElement(r),
            this.storyRenders.push(a),
            async () => {
              await this.teardownRender(a);
            }
          );
        }
        async teardownRender(t, { viewModeChanged: r } = {}) {
          (this.storyRenders = this.storyRenders.filter((n) => n !== t)), await t?.teardown?.({ viewModeChanged: r });
        }
        async loadStory({ storyId: t }) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "loadStory" });
          return this.storyStoreValue.loadStory({ storyId: t });
        }
        getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "getStoryContext" });
          return this.storyStoreValue.getStoryContext(t, { forceInitialArgs: r });
        }
        async extract(t) {
          if (!this.storyStoreValue) throw new Ne({ methodName: "extract" });
          if (this.previewEntryError) throw this.previewEntryError;
          return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(t);
        }
        renderPreviewEntryError(t, r) {
          (this.previewEntryError = r), Q.error(t), Q.error(r), this.channel.emit(ni, r);
        }
      };
    E(Dl, "Preview");
    var gm = Dl,
      bm = !1,
      uo = "Invariant failed";
    function Gr(e, t) {
      if (!e) {
        if (bm) throw new Error(uo);
        var r = typeof t == "function" ? t() : t,
          n = r ? "".concat(uo, ": ").concat(r) : uo;
        throw new Error(n);
      }
    }
    E(Gr, "invariant");
    var Rl = class {
      constructor(t, r, n, o) {
        (this.channel = t),
          (this.store = r),
          (this.renderStoryToElement = n),
          (this.storyIdByName = E((a) => {
            let i = this.nameToStoryId.get(a);
            if (i) return i;
            throw new Error(`No story found with that name: ${a}`);
          }, "storyIdByName")),
          (this.componentStories = E(() => this.componentStoriesValue, "componentStories")),
          (this.componentStoriesFromCSFFile = E(
            (a) => this.store.componentStoriesFromCSFFile({ csfFile: a }),
            "componentStoriesFromCSFFile"
          )),
          (this.storyById = E((a) => {
            if (!a) {
              if (!this.primaryStory)
                throw new Error("No primary story defined for docs entry. Did you forget to use `<Meta>`?");
              return this.primaryStory;
            }
            let i = this.storyIdToCSFFile.get(a);
            if (!i) throw new Error(`Called \`storyById\` for story that was never loaded: ${a}`);
            return this.store.storyFromCSFFile({ storyId: a, csfFile: i });
          }, "storyById")),
          (this.getStoryContext = E(
            (a) => ({ ...this.store.getStoryContext(a), loaded: {}, viewMode: "docs" }),
            "getStoryContext"
          )),
          (this.loadStory = E((a) => this.store.loadStory({ storyId: a }), "loadStory")),
          (this.componentStoriesValue = []),
          (this.storyIdToCSFFile = new Map()),
          (this.exportToStory = new Map()),
          (this.exportsToCSFFile = new Map()),
          (this.nameToStoryId = new Map()),
          (this.attachedCSFFiles = new Set()),
          o.forEach((a, i) => {
            this.referenceCSFFile(a);
          });
      }
      referenceCSFFile(t) {
        this.exportsToCSFFile.set(t.moduleExports, t),
          this.exportsToCSFFile.set(t.moduleExports.default, t),
          this.store.componentStoriesFromCSFFile({ csfFile: t }).forEach((r) => {
            let n = t.stories[r.id];
            this.storyIdToCSFFile.set(n.id, t), this.exportToStory.set(n.moduleExport, r);
          });
      }
      attachCSFFile(t) {
        if (!this.exportsToCSFFile.has(t.moduleExports))
          throw new Error("Cannot attach a CSF file that has not been referenced");
        this.attachedCSFFiles.has(t) ||
          (this.attachedCSFFiles.add(t),
          this.store.componentStoriesFromCSFFile({ csfFile: t }).forEach((r) => {
            this.nameToStoryId.set(r.name, r.id),
              this.componentStoriesValue.push(r),
              this.primaryStory || (this.primaryStory = r);
          }));
      }
      referenceMeta(t, r) {
        let n = this.resolveModuleExport(t);
        if (n.type !== "meta")
          throw new Error(
            "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?"
          );
        r && this.attachCSFFile(n.csfFile);
      }
      get projectAnnotations() {
        let { projectAnnotations: t } = this.store;
        if (!t) throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
        return t;
      }
      resolveAttachedModuleExportType(t) {
        if (t === "story") {
          if (!this.primaryStory)
            throw new Error("No primary story attached to this docs file, did you forget to use <Meta of={} />?");
          return { type: "story", story: this.primaryStory };
        }
        if (this.attachedCSFFiles.size === 0)
          throw new Error("No CSF file attached to this docs file, did you forget to use <Meta of={} />?");
        let r = Array.from(this.attachedCSFFiles)[0];
        if (t === "meta") return { type: "meta", csfFile: r };
        let { component: n } = r.meta;
        if (!n) throw new Error("Attached CSF file does not defined a component, did you forget to export one?");
        return { type: "component", component: n };
      }
      resolveModuleExport(t) {
        let r = this.exportsToCSFFile.get(t);
        if (r) return { type: "meta", csfFile: r };
        let n = this.exportToStory.get(t);
        return n ? { type: "story", story: n } : { type: "component", component: t };
      }
      resolveOf(t, r = []) {
        let n;
        if (["component", "meta", "story"].includes(t)) {
          let o = t;
          n = this.resolveAttachedModuleExportType(o);
        } else n = this.resolveModuleExport(t);
        if (r.length && !r.includes(n.type)) {
          let o = n.type === "component" ? "component or unknown" : n.type;
          throw new Error(Me`Invalid value passed to the 'of' prop. The value was resolved to a '${o}' type but the only types for this block are: ${r.join(", ")}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
        }
        switch (n.type) {
          case "component":
            return { ...n, projectAnnotations: this.projectAnnotations };
          case "meta":
            return { ...n, preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: n.csfFile }) };
          case "story":
          default:
            return n;
        }
      }
    };
    E(Rl, "DocsContext");
    var _l = Rl,
      Pl = class {
        constructor(t, r, n, o) {
          (this.channel = t),
            (this.store = r),
            (this.entry = n),
            (this.callbacks = o),
            (this.type = "docs"),
            (this.subtype = "csf"),
            (this.torndown = !1),
            (this.disableKeyListeners = !1),
            (this.preparing = !1),
            (this.id = n.id);
        }
        isPreparing() {
          return this.preparing;
        }
        async prepare() {
          this.preparing = !0;
          let { entryExports: t, csfFiles: r = [] } = await this.store.loadEntry(this.id);
          if (this.torndown) throw tn;
          let { importPath: n, title: o } = this.entry,
            a = this.store.processCSFFileWithCache(t, n, o),
            i = Object.keys(a.stories)[0];
          (this.story = this.store.storyFromCSFFile({ storyId: i, csfFile: a })),
            (this.csfFiles = [a, ...r]),
            (this.preparing = !1);
        }
        isEqual(t) {
          return !!(this.id === t.id && this.story && this.story === t.story);
        }
        docsContext(t) {
          if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
          let r = new _l(this.channel, this.store, t, this.csfFiles);
          return this.csfFiles.forEach((n) => r.attachCSFFile(n)), r;
        }
        async renderToElement(t, r) {
          if (!this.story || !this.csfFiles) throw new Error("Cannot render docs before preparing");
          let n = this.docsContext(r),
            { docs: o } = this.story.parameters || {};
          if (!o) throw new Error("Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed");
          let a = await o.renderer(),
            { render: i } = a,
            l = E(async () => {
              try {
                await i(n, o, t), this.channel.emit(Pr, this.id);
              } catch (s) {
                this.callbacks.showException(s);
              }
            }, "renderDocs");
          return (
            (this.rerender = async () => l()),
            (this.teardownRender = async ({ viewModeChanged: s }) => {
              !s || !t || a.unmount(t);
            }),
            l()
          );
        }
        async teardown({ viewModeChanged: t } = {}) {
          this.teardownRender?.({ viewModeChanged: t }), (this.torndown = !0);
        }
      };
    E(Pl, "CsfDocsRender");
    var js = Pl,
      Fl = class {
        constructor(t, r, n, o) {
          (this.channel = t),
            (this.store = r),
            (this.entry = n),
            (this.callbacks = o),
            (this.type = "docs"),
            (this.subtype = "mdx"),
            (this.torndown = !1),
            (this.disableKeyListeners = !1),
            (this.preparing = !1),
            (this.id = n.id);
        }
        isPreparing() {
          return this.preparing;
        }
        async prepare() {
          this.preparing = !0;
          let { entryExports: t, csfFiles: r = [] } = await this.store.loadEntry(this.id);
          if (this.torndown) throw tn;
          (this.csfFiles = r), (this.exports = t), (this.preparing = !1);
        }
        isEqual(t) {
          return !!(this.id === t.id && this.exports && this.exports === t.exports);
        }
        docsContext(t) {
          if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
          return new _l(this.channel, this.store, t, this.csfFiles);
        }
        async renderToElement(t, r) {
          if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
            throw new Error("Cannot render docs before preparing");
          let n = this.docsContext(r),
            { docs: o } = this.store.projectAnnotations.parameters || {};
          if (!o) throw new Error("Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed");
          let a = { ...o, page: this.exports.default },
            i = await o.renderer(),
            { render: l } = i,
            s = E(async () => {
              try {
                await l(n, a, t), this.channel.emit(Pr, this.id);
              } catch (c) {
                this.callbacks.showException(c);
              }
            }, "renderDocs");
          return (
            (this.rerender = async () => s()),
            (this.teardownRender = async ({ viewModeChanged: c } = {}) => {
              !c || !t || (i.unmount(t), (this.torndown = !0));
            }),
            s()
          );
        }
        async teardown({ viewModeChanged: t } = {}) {
          this.teardownRender?.({ viewModeChanged: t }), (this.torndown = !0);
        }
      };
    E(Fl, "MdxDocsRender");
    var Ls = Fl,
      Em = globalThis;
    function Nl(e) {
      let t = (e.composedPath && e.composedPath()[0]) || e.target;
      return /input|textarea/i.test(t.tagName) || t.getAttribute("contenteditable") !== null;
    }
    E(Nl, "focusInInput");
    var Bl = "attached-mdx",
      vm = "unattached-mdx";
    function jl({ tags: e }) {
      return e?.includes(vm) || e?.includes(Bl);
    }
    E(jl, "isMdxEntry");
    function Wr(e) {
      return e.type === "story";
    }
    E(Wr, "isStoryRender");
    function Ll(e) {
      return e.type === "docs";
    }
    E(Ll, "isDocsRender");
    function Ml(e) {
      return Ll(e) && e.subtype === "csf";
    }
    E(Ml, "isCsfDocsRender");
    var Ul = class extends gm {
      constructor(t, r, n, o) {
        super(t, r, void 0, !1),
          (this.importFn = t),
          (this.getProjectAnnotations = r),
          (this.selectionStore = n),
          (this.view = o),
          this.initialize();
      }
      setupListeners() {
        super.setupListeners(),
          (Em.onkeydown = this.onKeydown.bind(this)),
          this.channel.on(ci, this.onSetCurrentStory.bind(this)),
          this.channel.on(xi, this.onUpdateQueryParams.bind(this)),
          this.channel.on(li, this.onPreloadStories.bind(this));
      }
      async setInitialGlobals() {
        if (!this.storyStoreValue) throw new Ne({ methodName: "setInitialGlobals" });
        let { globals: t } = this.selectionStore.selectionSpecifier || {};
        t && this.storyStoreValue.userGlobals.updateFromPersisted(t), this.emitGlobals();
      }
      async initializeWithStoryIndex(t) {
        return await super.initializeWithStoryIndex(t), this.selectSpecifiedStory();
      }
      async selectSpecifiedStory() {
        if (!this.storyStoreValue) throw new Ne({ methodName: "selectSpecifiedStory" });
        if (this.selectionStore.selection) {
          await this.renderSelection();
          return;
        }
        if (!this.selectionStore.selectionSpecifier) {
          this.renderMissingStory();
          return;
        }
        let { storySpecifier: t, args: r } = this.selectionStore.selectionSpecifier,
          n = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
        if (!n) {
          t === "*"
            ? this.renderStoryLoadingException(t, new ss())
            : this.renderStoryLoadingException(t, new us({ storySpecifier: t.toString() }));
          return;
        }
        let { id: o, type: a } = n;
        this.selectionStore.setSelection({ storyId: o, viewMode: a }),
          this.channel.emit(gi, this.selectionStore.selection),
          this.channel.emit(Jn, this.selectionStore.selection),
          await this.renderSelection({ persistedArgs: r });
      }
      async onGetProjectAnnotationsChanged({ getProjectAnnotations: t }) {
        await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: t }),
          this.selectionStore.selection && this.renderSelection();
      }
      async onStoriesChanged({ importFn: t, storyIndex: r }) {
        await super.onStoriesChanged({ importFn: t, storyIndex: r }),
          this.selectionStore.selection ? await this.renderSelection() : await this.selectSpecifiedStory();
      }
      onKeydown(t) {
        if (!this.storyRenders.find((r) => r.disableKeyListeners) && !Nl(t)) {
          let { altKey: r, ctrlKey: n, metaKey: o, shiftKey: a, key: i, code: l, keyCode: s } = t;
          this.channel.emit(ui, {
            event: { altKey: r, ctrlKey: n, metaKey: o, shiftKey: a, key: i, code: l, keyCode: s },
          });
        }
      }
      async onSetCurrentStory(t) {
        this.selectionStore.setSelection({ viewMode: "story", ...t }),
          await this.storeInitializationPromise,
          this.channel.emit(Jn, this.selectionStore.selection),
          this.renderSelection();
      }
      onUpdateQueryParams(t) {
        this.selectionStore.setQueryParams(t);
      }
      async onUpdateGlobals({ globals: t }) {
        let r = (this.currentRender instanceof wo && this.currentRender.story) || void 0;
        super.onUpdateGlobals({ globals: t, currentStory: r }),
          (this.currentRender instanceof Ls || this.currentRender instanceof js) &&
            (await this.currentRender.rerender?.());
      }
      async onUpdateArgs({ storyId: t, updatedArgs: r }) {
        super.onUpdateArgs({ storyId: t, updatedArgs: r });
      }
      async onPreloadStories({ ids: t }) {
        await this.storeInitializationPromise,
          this.storyStoreValue && (await Promise.allSettled(t.map((r) => this.storyStoreValue?.loadEntry(r))));
      }
      async renderSelection({ persistedArgs: t } = {}) {
        let { renderToCanvas: r } = this;
        if (!this.storyStoreValue || !r) throw new Ne({ methodName: "renderSelection" });
        let { selection: n } = this.selectionStore;
        if (!n) throw new Error("Cannot call renderSelection as no selection was made");
        let { storyId: o } = n,
          a;
        try {
          a = await this.storyStoreValue.storyIdToEntry(o);
        } catch (h) {
          this.currentRender && (await this.teardownRender(this.currentRender)), this.renderStoryLoadingException(o, h);
          return;
        }
        let i = this.currentSelection?.storyId !== o,
          l = this.currentRender?.type !== a.type;
        a.type === "story"
          ? this.view.showPreparingStory({ immediate: l })
          : this.view.showPreparingDocs({ immediate: l }),
          this.currentRender?.isPreparing() && (await this.teardownRender(this.currentRender));
        let s;
        a.type === "story"
          ? (s = new wo(this.channel, this.storyStoreValue, r, this.mainStoryCallbacks(o), o, "story"))
          : jl(a)
            ? (s = new Ls(this.channel, this.storyStoreValue, a, this.mainStoryCallbacks(o)))
            : (s = new js(this.channel, this.storyStoreValue, a, this.mainStoryCallbacks(o)));
        let c = this.currentSelection;
        this.currentSelection = n;
        let d = this.currentRender;
        this.currentRender = s;
        try {
          await s.prepare();
        } catch (h) {
          d && (await this.teardownRender(d)), h !== tn && this.renderStoryLoadingException(o, h);
          return;
        }
        let p = !i && d && !s.isEqual(d);
        if (
          (t && Wr(s) && (Gr(!!s.story), this.storyStoreValue.args.updateFromPersisted(s.story, t)),
          d && !d.torndown && !i && !p && !l)
        ) {
          (this.currentRender = d), this.channel.emit(Ei, o), this.view.showMain();
          return;
        }
        if (
          (d && (await this.teardownRender(d, { viewModeChanged: l })),
          c && (i || l) && this.channel.emit(fi, o),
          Wr(s))
        ) {
          Gr(!!s.story);
          let {
            parameters: h,
            initialArgs: f,
            argTypes: b,
            unmappedArgs: g,
            initialGlobals: x,
            userGlobals: S,
            storyGlobals: A,
            globals: k,
          } = this.storyStoreValue.getStoryContext(s.story);
          this.channel.emit(yi, { id: o, parameters: h, initialArgs: f, argTypes: b, args: g }),
            this.channel.emit($t, { userGlobals: S, storyGlobals: A, globals: k, initialGlobals: x });
        } else {
          let { parameters: h } = this.storyStoreValue.projectAnnotations,
            { initialGlobals: f, globals: b } = this.storyStoreValue.userGlobals;
          if (
            (this.channel.emit($t, { globals: b, initialGlobals: f, storyGlobals: {}, userGlobals: b }),
            Ml(s) || s.entry.tags?.includes(Bl))
          ) {
            if (!s.csfFiles) throw new as({ storyId: o });
            ({ parameters: h } = this.storyStoreValue.preparedMetaFromCSFFile({ csfFile: s.csfFiles[0] }));
          }
          this.channel.emit(oi, { id: o, parameters: h });
        }
        Wr(s)
          ? (Gr(!!s.story),
            this.storyRenders.push(s),
            this.currentRender.renderToElement(this.view.prepareForStory(s.story)))
          : this.currentRender.renderToElement(this.view.prepareForDocs(), this.renderStoryToElement.bind(this));
      }
      async teardownRender(t, { viewModeChanged: r = !1 } = {}) {
        (this.storyRenders = this.storyRenders.filter((n) => n !== t)), await t?.teardown?.({ viewModeChanged: r });
      }
      mainStoryCallbacks(t) {
        return {
          showStoryDuringRender: E(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
          showMain: E(() => this.view.showMain(), "showMain"),
          showError: E((r) => this.renderError(t, r), "showError"),
          showException: E((r) => this.renderException(t, r), "showException"),
        };
      }
      renderPreviewEntryError(t, r) {
        super.renderPreviewEntryError(t, r), this.view.showErrorDisplay(r);
      }
      renderMissingStory() {
        this.view.showNoPreview(), this.channel.emit(Hn);
      }
      renderStoryLoadingException(t, r) {
        Q.error(r), this.view.showErrorDisplay(r), this.channel.emit(Hn, t);
      }
      renderException(t, r) {
        let { name: n = "Error", message: o = String(r), stack: a } = r;
        this.channel.emit(bi, { name: n, message: o, stack: a }),
          this.channel.emit(qt, { newPhase: "errored", storyId: t }),
          this.view.showErrorDisplay(r),
          Q.error(`Error rendering story '${t}':`),
          Q.error(r);
      }
      renderError(t, { title: r, description: n }) {
        Q.error(`Error rendering story ${r}: ${n}`),
          this.channel.emit(hi, { title: r, description: n }),
          this.channel.emit(qt, { newPhase: "errored", storyId: t }),
          this.view.showErrorDisplay({ message: r, stack: n });
      }
    };
    E(Ul, "PreviewWithSelection");
    var xm = Ul,
      Ao = Ht(Oo(), 1),
      Sm = Ht(Oo(), 1),
      Ms = /^[a-zA-Z0-9 _-]*$/,
      $l = /^-?[0-9]+(\.[0-9]+)?$/,
      wm = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i,
      ql = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
      To = E(
        (e = "", t) =>
          e === null || e === "" || !Ms.test(e)
            ? !1
            : t == null || t instanceof Date || typeof t == "number" || typeof t == "boolean"
              ? !0
              : typeof t == "string"
                ? Ms.test(t) || $l.test(t) || wm.test(t) || ql.test(t)
                : Array.isArray(t)
                  ? t.every((r) => To(e, r))
                  : Je(t)
                    ? Object.entries(t).every(([r, n]) => To(r, n))
                    : !1,
        "validateArgs"
      ),
      Am = {
        delimiter: ";",
        nesting: !0,
        arrayRepeat: !0,
        arrayRepeatSyntax: "bracket",
        nestingSyntax: "js",
        valueDeserializer(e) {
          if (e.startsWith("!")) {
            if (e === "!undefined") return;
            if (e === "!null") return null;
            if (e === "!true") return !0;
            if (e === "!false") return !1;
            if (e.startsWith("!date(") && e.endsWith(")")) return new Date(e.replaceAll(" ", "+").slice(6, -1));
            if (e.startsWith("!hex(") && e.endsWith(")")) return `#${e.slice(5, -1)}`;
            let t = e.slice(1).match(ql);
            if (t)
              return e.startsWith("!rgba") || e.startsWith("!RGBA")
                ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})`
                : e.startsWith("!hsla") || e.startsWith("!HSLA")
                  ? `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%, ${t[5]})`
                  : e.startsWith("!rgb") || e.startsWith("!RGB")
                    ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]})`
                    : `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%)`;
          }
          return $l.test(e) ? Number(e) : e;
        },
      },
      Us = E((e) => {
        let t = e.split(";").map((r) => r.replace("=", "~").replace(":", "="));
        return Object.entries((0, Sm.parse)(t.join(";"), Am)).reduce(
          (r, [n, o]) =>
            To(n, o)
              ? Object.assign(r, { [n]: o })
              : (ct.warn(Me`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `),
                r),
          {}
        );
      }, "parseArgsParam"),
      { history: Vl, document: ft } = be;
    function Jl(e) {
      let t = (e || "").match(/^\/story\/(.+)/);
      if (!t) throw new Error(`Invalid path '${e}',  must start with '/story/'`);
      return t[1];
    }
    E(Jl, "pathToId");
    var zl = E(({ selection: e, extraParams: t }) => {
        let r = ft?.location.search.slice(1),
          { path: n, selectedKind: o, selectedStory: a, ...i } = (0, Ao.parse)(r);
        return `?${(0, Ao.stringify)({ ...i, ...t, ...(e && { id: e.storyId, viewMode: e.viewMode }) })}`;
      }, "getQueryString"),
      Tm = E((e) => {
        if (!e) return;
        let t = zl({ selection: e }),
          { hash: r = "" } = ft.location;
        (ft.title = e.storyId), Vl.replaceState({}, "", `${ft.location.pathname}${t}${r}`);
      }, "setPath"),
      Cm = E((e) => e != null && typeof e == "object" && Array.isArray(e) === !1, "isObject"),
      pr = E((e) => {
        if (e !== void 0) {
          if (typeof e == "string") return e;
          if (Array.isArray(e)) return pr(e[0]);
          if (Cm(e)) return pr(Object.values(e).filter(Boolean));
        }
      }, "getFirstString"),
      km = E(() => {
        if (typeof ft < "u") {
          let e = ft.location.search.slice(1),
            t = (0, Ao.parse)(e),
            r = typeof t.args == "string" ? Us(t.args) : void 0,
            n = typeof t.globals == "string" ? Us(t.globals) : void 0,
            o = pr(t.viewMode);
          (typeof o != "string" || !o.match(/docs|story/)) && (o = "story");
          let a = pr(t.path),
            i = a ? Jl(a) : pr(t.id);
          if (i) return { storySpecifier: i, args: r, globals: n, viewMode: o };
        }
        return null;
      }, "getSelectionSpecifierFromPath"),
      Hl = class {
        constructor() {
          this.selectionSpecifier = km();
        }
        setSelection(t) {
          (this.selection = t), Tm(this.selection);
        }
        setQueryParams(t) {
          let r = zl({ extraParams: t }),
            { hash: n = "" } = ft.location;
          Vl.replaceState({}, "", `${ft.location.pathname}${r}${n}`);
        }
      };
    E(Hl, "UrlStore");
    var Im = Hl,
      Om = Ht(nh(), 1),
      Dm = Ht(Oo(), 1),
      { document: ke } = be,
      $s = 100,
      Gl = ((e) => (
        (e.MAIN = "MAIN"),
        (e.NOPREVIEW = "NOPREVIEW"),
        (e.PREPARING_STORY = "PREPARING_STORY"),
        (e.PREPARING_DOCS = "PREPARING_DOCS"),
        (e.ERROR = "ERROR"),
        e
      ))(Gl || {}),
      co = {
        PREPARING_STORY: "sb-show-preparing-story",
        PREPARING_DOCS: "sb-show-preparing-docs",
        MAIN: "sb-show-main",
        NOPREVIEW: "sb-show-nopreview",
        ERROR: "sb-show-errordisplay",
      },
      po = { centered: "sb-main-centered", fullscreen: "sb-main-fullscreen", padded: "sb-main-padded" },
      qs = new Om.default({ escapeXML: !0 }),
      Wl = class {
        constructor() {
          if (((this.testing = !1), typeof ke < "u")) {
            let { __SPECIAL_TEST_PARAMETER__: t } = (0, Dm.parse)(ke.location.search.slice(1));
            switch (t) {
              case "preparing-story": {
                this.showPreparingStory(), (this.testing = !0);
                break;
              }
              case "preparing-docs": {
                this.showPreparingDocs(), (this.testing = !0);
                break;
              }
              default:
            }
          }
        }
        prepareForStory(t) {
          return (
            this.showStory(),
            this.applyLayout(t.parameters.layout),
            (ke.documentElement.scrollTop = 0),
            (ke.documentElement.scrollLeft = 0),
            this.storyRoot()
          );
        }
        storyRoot() {
          return ke.getElementById("storybook-root");
        }
        prepareForDocs() {
          return (
            this.showMain(),
            this.showDocs(),
            this.applyLayout("fullscreen"),
            (ke.documentElement.scrollTop = 0),
            (ke.documentElement.scrollLeft = 0),
            this.docsRoot()
          );
        }
        docsRoot() {
          return ke.getElementById("storybook-docs");
        }
        applyLayout(t = "padded") {
          if (t === "none") {
            ke.body.classList.remove(this.currentLayoutClass), (this.currentLayoutClass = null);
            return;
          }
          this.checkIfLayoutExists(t);
          let r = po[t];
          ke.body.classList.remove(this.currentLayoutClass), ke.body.classList.add(r), (this.currentLayoutClass = r);
        }
        checkIfLayoutExists(t) {
          po[t] ||
            Q.warn(Me`
          The desired layout: ${t} is not a valid option.
          The possible options are: ${Object.keys(po).join(", ")}, none.
        `);
        }
        showMode(t) {
          clearTimeout(this.preparingTimeout),
            Object.keys(Gl).forEach((r) => {
              r === t ? ke.body.classList.add(co[r]) : ke.body.classList.remove(co[r]);
            });
        }
        showErrorDisplay({ message: t = "", stack: r = "" }) {
          let n = t,
            o = r,
            a = t.split(`
`);
          a.length > 1 &&
            (([n] = a),
            (o = a
              .slice(1)
              .join(
                `
`
              )
              .replace(/^\n/, ""))),
            (ke.getElementById("error-message").innerHTML = qs.toHtml(n)),
            (ke.getElementById("error-stack").innerHTML = qs.toHtml(o)),
            this.showMode("ERROR");
        }
        showNoPreview() {
          this.testing ||
            (this.showMode("NOPREVIEW"),
            this.storyRoot()?.setAttribute("hidden", "true"),
            this.docsRoot()?.setAttribute("hidden", "true"));
        }
        showPreparingStory({ immediate: t = !1 } = {}) {
          clearTimeout(this.preparingTimeout),
            t
              ? this.showMode("PREPARING_STORY")
              : (this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_STORY"), $s));
        }
        showPreparingDocs({ immediate: t = !1 } = {}) {
          clearTimeout(this.preparingTimeout),
            t
              ? this.showMode("PREPARING_DOCS")
              : (this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_DOCS"), $s));
        }
        showMain() {
          this.showMode("MAIN");
        }
        showDocs() {
          this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
        }
        showStory() {
          this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
        }
        showStoryDuringRender() {
          ke.body.classList.add(co.MAIN);
        }
      };
    E(Wl, "WebView");
    var Rm = Wl,
      _m = class extends xm {
        constructor(t, r) {
          super(t, r, new Im(), new Rm()),
            (this.importFn = t),
            (this.getProjectAnnotations = r),
            (be.__STORYBOOK_PREVIEW__ = this);
        }
      };
    E(_m, "PreviewWeb");
    var { document: Tt } = be,
      Pm = [
        "application/javascript",
        "application/ecmascript",
        "application/x-ecmascript",
        "application/x-javascript",
        "text/ecmascript",
        "text/javascript",
        "text/javascript1.0",
        "text/javascript1.1",
        "text/javascript1.2",
        "text/javascript1.3",
        "text/javascript1.4",
        "text/javascript1.5",
        "text/jscript",
        "text/livescript",
        "text/x-ecmascript",
        "text/x-javascript",
        "module",
      ],
      Fm = "script",
      Vs = "scripts-root";
    function Co() {
      let e = Tt.createEvent("Event");
      e.initEvent("DOMContentLoaded", !0, !0), Tt.dispatchEvent(e);
    }
    E(Co, "simulateDOMContentLoaded");
    function Kl(e, t, r) {
      let n = Tt.createElement("script");
      (n.type = e.type === "module" ? "module" : "text/javascript"),
        e.src ? ((n.onload = t), (n.onerror = t), (n.src = e.src)) : (n.textContent = e.innerText),
        r ? r.appendChild(n) : Tt.head.appendChild(n),
        e.parentNode.removeChild(e),
        e.src || t();
    }
    E(Kl, "insertScript");
    function Mo(e, t, r = 0) {
      e[r](() => {
        r++, r === e.length ? t() : Mo(e, t, r);
      });
    }
    E(Mo, "insertScriptsSequentially");
    function Nm(e) {
      let t = Tt.getElementById(Vs);
      t ? (t.innerHTML = "") : ((t = Tt.createElement("div")), (t.id = Vs), Tt.body.appendChild(t));
      let r = Array.from(e.querySelectorAll(Fm));
      if (r.length) {
        let n = [];
        r.forEach((o) => {
          let a = o.getAttribute("type");
          (!a || Pm.includes(a)) && n.push((i) => Kl(o, i, t));
        }),
          n.length && Mo(n, Co, void 0);
      } else Co();
    }
    E(Nm, "simulatePageLoad");
    V();
    J();
    z();
    V();
    J();
    z();
    var Gt = vp(Xl(), 1);
    var Bm = Object.defineProperty,
      N = (e, t) => Bm(e, "name", { value: t, configurable: !0 }),
      jm = N((e) => e.name === "literal", "isLiteral"),
      Lm = N((e) => e.value.replace(/['|"]/g, ""), "toEnumOption"),
      Mm = N((e) => {
        switch (e.type) {
          case "function":
            return { name: "function" };
          case "object":
            let t = {};
            return (
              e.signature.properties.forEach((r) => {
                t[r.key] = yr(r.value);
              }),
              { name: "object", value: t }
            );
          default:
            throw new Jr({ type: e, language: "Flow" });
        }
      }, "convertSig"),
      yr = N((e) => {
        let { name: t, raw: r } = e,
          n = {};
        switch ((typeof r < "u" && (n.raw = r), e.name)) {
          case "literal":
            return { ...n, name: "other", value: e.value };
          case "string":
          case "number":
          case "symbol":
          case "boolean":
            return { ...n, name: t };
          case "Array":
            return { ...n, name: "array", value: e.elements.map(yr) };
          case "signature":
            return { ...n, ...Mm(e) };
          case "union":
            return e.elements?.every(jm)
              ? { ...n, name: "enum", value: e.elements?.map(Lm) }
              : { ...n, name: t, value: e.elements?.map(yr) };
          case "intersection":
            return { ...n, name: t, value: e.elements?.map(yr) };
          default:
            return { ...n, name: "other", value: t };
        }
      }, "convert");
    function Ql(e, t) {
      let r = {},
        n = Object.keys(e);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = e[a];
        r[a] = t(i, a, e);
      }
      return r;
    }
    N(Ql, "mapValues");
    var Zl = /^['"]|['"]$/g,
      Um = N((e) => e.replace(Zl, ""), "trimQuotes"),
      $m = N((e) => Zl.test(e), "includesQuotes"),
      eu = N((e) => {
        let t = Um(e);
        return $m(e) || Number.isNaN(Number(t)) ? t : Number(t);
      }, "parseLiteral"),
      qm = /^\(.*\) => /,
      mr = N((e) => {
        let { name: t, raw: r, computed: n, value: o } = e,
          a = {};
        switch ((typeof r < "u" && (a.raw = r), t)) {
          case "enum": {
            let l = n ? o : o.map((s) => eu(s.value));
            return { ...a, name: t, value: l };
          }
          case "string":
          case "number":
          case "symbol":
            return { ...a, name: t };
          case "func":
            return { ...a, name: "function" };
          case "bool":
          case "boolean":
            return { ...a, name: "boolean" };
          case "arrayOf":
          case "array":
            return { ...a, name: "array", value: o && mr(o) };
          case "object":
            return { ...a, name: t };
          case "objectOf":
            return { ...a, name: t, value: mr(o) };
          case "shape":
          case "exact":
            let i = Ql(o, (l) => mr(l));
            return { ...a, name: "object", value: i };
          case "union":
            return { ...a, name: "union", value: o.map((l) => mr(l)) };
          case "instanceOf":
          case "element":
          case "elementType":
          default: {
            if (t?.indexOf("|") > 0)
              try {
                let c = t.split("|").map((d) => JSON.parse(d));
                return { ...a, name: "enum", value: c };
              } catch {}
            let l = o ? `${t}(${o})` : t,
              s = qm.test(t) ? "function" : "other";
            return { ...a, name: s, value: l };
          }
        }
      }, "convert"),
      Vm = N((e) => {
        switch (e.type) {
          case "function":
            return { name: "function" };
          case "object":
            let t = {};
            return (
              e.signature.properties.forEach((r) => {
                t[r.key] = gr(r.value);
              }),
              { name: "object", value: t }
            );
          default:
            throw new Jr({ type: e, language: "Typescript" });
        }
      }, "convertSig"),
      gr = N((e) => {
        let { name: t, raw: r } = e,
          n = {};
        switch ((typeof r < "u" && (n.raw = r), e.name)) {
          case "string":
          case "number":
          case "symbol":
          case "boolean":
            return { ...n, name: t };
          case "Array":
            return { ...n, name: "array", value: e.elements.map(gr) };
          case "signature":
            return { ...n, ...Vm(e) };
          case "union":
            let o;
            return (
              e.elements?.every((a) => a.name === "literal")
                ? (o = { ...n, name: "enum", value: e.elements?.map((a) => eu(a.value)) })
                : (o = { ...n, name: t, value: e.elements?.map(gr) }),
              o
            );
          case "intersection":
            return { ...n, name: t, value: e.elements?.map(gr) };
          default:
            return { ...n, name: "other", value: t };
        }
      }, "convert"),
      Uo = N((e) => {
        let { type: t, tsType: r, flowType: n } = e;
        try {
          if (t != null) return mr(t);
          if (r != null) return gr(r);
          if (n != null) return yr(n);
        } catch (o) {
          console.error(o);
        }
        return null;
      }, "convert"),
      Jm = ((e) => (
        (e.JAVASCRIPT = "JavaScript"), (e.FLOW = "Flow"), (e.TYPESCRIPT = "TypeScript"), (e.UNKNOWN = "Unknown"), e
      ))(Jm || {}),
      zm = ["null", "undefined"];
    function nn(e) {
      return zm.some((t) => t === e);
    }
    N(nn, "isDefaultValueBlacklisted");
    var Hm = N((e) => {
      if (!e) return "";
      if (typeof e == "string") return e;
      throw new Error(`Description: expected string, got: ${JSON.stringify(e)}`);
    }, "str");
    function $o(e) {
      return !!e.__docgenInfo;
    }
    N($o, "hasDocgen");
    function tu(e) {
      return e != null && Object.keys(e).length > 0;
    }
    N(tu, "isValidDocgenSection");
    function ru(e, t) {
      return $o(e) ? e.__docgenInfo[t] : null;
    }
    N(ru, "getDocgenSection");
    function nu(e) {
      return $o(e) ? Hm(e.__docgenInfo.description) : "";
    }
    N(nu, "getDocgenDescription");
    var ht;
    (function (e) {
      (e.start = "/**"), (e.nostart = "/***"), (e.delim = "*"), (e.end = "*/");
    })((ht = ht || (ht = {})));
    function ou(e) {
      return /^\s+$/.test(e);
    }
    N(ou, "isSpace");
    function au(e) {
      let t = e.match(/\r+$/);
      return t == null ? ["", e] : [e.slice(-t[0].length), e.slice(0, -t[0].length)];
    }
    N(au, "splitCR");
    function It(e) {
      let t = e.match(/^\s+/);
      return t == null ? ["", e] : [e.slice(0, t[0].length), e.slice(t[0].length)];
    }
    N(It, "splitSpace");
    function iu(e) {
      return e.split(/\n/);
    }
    N(iu, "splitLines");
    function su(e = {}) {
      return Object.assign({ tag: "", name: "", type: "", optional: !1, description: "", problems: [], source: [] }, e);
    }
    N(su, "seedSpec");
    function lu(e = {}) {
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
        e
      );
    }
    N(lu, "seedTokens");
    var Gm = /^@\S+/;
    function uu({ fence: e = "```" } = {}) {
      let t = cu(e),
        r = N((n, o) => (t(n) ? !o : o), "toggleFence");
      return N(function (n) {
        let o = [[]],
          a = !1;
        for (let i of n)
          Gm.test(i.tokens.description) && !a ? o.push([i]) : o[o.length - 1].push(i), (a = r(i.tokens.description, a));
        return o;
      }, "parseBlock");
    }
    N(uu, "getParser");
    function cu(e) {
      return typeof e == "string" ? (t) => t.split(e).length % 2 === 0 : e;
    }
    N(cu, "getFencer");
    function du({ startLine: e = 0, markers: t = ht } = {}) {
      let r = null,
        n = e;
      return N(function (o) {
        let a = o,
          i = lu();
        if (
          (([i.lineEnd, a] = au(a)),
          ([i.start, a] = It(a)),
          r === null &&
            a.startsWith(t.start) &&
            !a.startsWith(t.nostart) &&
            ((r = []),
            (i.delimiter = a.slice(0, t.start.length)),
            (a = a.slice(t.start.length)),
            ([i.postDelimiter, a] = It(a))),
          r === null)
        )
          return n++, null;
        let l = a.trimRight().endsWith(t.end);
        if (
          (i.delimiter === "" &&
            a.startsWith(t.delim) &&
            !a.startsWith(t.end) &&
            ((i.delimiter = t.delim), (a = a.slice(t.delim.length)), ([i.postDelimiter, a] = It(a))),
          l)
        ) {
          let s = a.trimRight();
          (i.end = a.slice(s.length - t.end.length)), (a = s.slice(0, -t.end.length));
        }
        if (((i.description = a), r.push({ number: n, source: o, tokens: i }), n++, l)) {
          let s = r.slice();
          return (r = null), s;
        }
        return null;
      }, "parseSource");
    }
    N(du, "getParser");
    function pu({ tokenizers: e }) {
      return N(function (t) {
        var r;
        let n = su({ source: t });
        for (let o of e)
          if (((n = o(n)), !((r = n.problems[n.problems.length - 1]) === null || r === void 0) && r.critical)) break;
        return n;
      }, "parseSpec");
    }
    N(pu, "getParser");
    function fu() {
      return (e) => {
        let { tokens: t } = e.source[0],
          r = t.description.match(/\s*(@(\S+))(\s*)/);
        return r === null
          ? (e.problems.push({
              code: "spec:tag:prefix",
              message: 'tag should start with "@" symbol',
              line: e.source[0].number,
              critical: !0,
            }),
            e)
          : ((t.tag = r[1]), (t.postTag = r[3]), (t.description = t.description.slice(r[0].length)), (e.tag = r[2]), e);
      };
    }
    N(fu, "tagTokenizer");
    function hu(e = "compact") {
      let t = mu(e);
      return (r) => {
        let n = 0,
          o = [];
        for (let [l, { tokens: s }] of r.source.entries()) {
          let c = "";
          if (l === 0 && s.description[0] !== "{") return r;
          for (let d of s.description) if ((d === "{" && n++, d === "}" && n--, (c += d), n === 0)) break;
          if ((o.push([s, c]), n === 0)) break;
        }
        if (n !== 0)
          return (
            r.problems.push({
              code: "spec:type:unpaired-curlies",
              message: "unpaired curlies",
              line: r.source[0].number,
              critical: !0,
            }),
            r
          );
        let a = [],
          i = o[0][0].postDelimiter.length;
        for (let [l, [s, c]] of o.entries())
          (s.type = c),
            l > 0 && ((s.type = s.postDelimiter.slice(i) + c), (s.postDelimiter = s.postDelimiter.slice(0, i))),
            ([s.postType, s.description] = It(s.description.slice(c.length))),
            a.push(s.type);
        return (a[0] = a[0].slice(1)), (a[a.length - 1] = a[a.length - 1].slice(0, -1)), (r.type = t(a)), r;
      };
    }
    N(hu, "typeTokenizer");
    var Wm = N((e) => e.trim(), "trim");
    function mu(e) {
      return e === "compact"
        ? (t) => t.map(Wm).join("")
        : e === "preserve"
          ? (t) =>
              t.join(`
`)
          : e;
    }
    N(mu, "getJoiner");
    var Km = N((e) => e && e.startsWith('"') && e.endsWith('"'), "isQuoted");
    function yu() {
      let e = N((t, { tokens: r }, n) => (r.type === "" ? t : n), "typeEnd");
      return (t) => {
        let { tokens: r } = t.source[t.source.reduce(e, 0)],
          n = r.description.trimLeft(),
          o = n.split('"');
        if (o.length > 1 && o[0] === "" && o.length % 2 === 1)
          return (t.name = o[1]), (r.name = `"${o[1]}"`), ([r.postName, r.description] = It(n.slice(r.name.length))), t;
        let a = 0,
          i = "",
          l = !1,
          s;
        for (let d of n) {
          if (a === 0 && ou(d)) break;
          d === "[" && a++, d === "]" && a--, (i += d);
        }
        if (a !== 0)
          return (
            t.problems.push({
              code: "spec:name:unpaired-brackets",
              message: "unpaired brackets",
              line: t.source[0].number,
              critical: !0,
            }),
            t
          );
        let c = i;
        if (i[0] === "[" && i[i.length - 1] === "]") {
          (l = !0), (i = i.slice(1, -1));
          let d = i.split("=");
          if (((i = d[0].trim()), d[1] !== void 0 && (s = d.slice(1).join("=").trim()), i === ""))
            return (
              t.problems.push({
                code: "spec:name:empty-name",
                message: "empty name",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
          if (s === "")
            return (
              t.problems.push({
                code: "spec:name:empty-default",
                message: "empty default value",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
          if (!Km(s) && /=(?!>)/.test(s))
            return (
              t.problems.push({
                code: "spec:name:invalid-default",
                message: "invalid default value syntax",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
        }
        return (
          (t.optional = l),
          (t.name = i),
          (r.name = c),
          s !== void 0 && (t.default = s),
          ([r.postName, r.description] = It(n.slice(r.name.length))),
          t
        );
      };
    }
    N(yu, "nameTokenizer");
    function gu(e = "compact", t = ht) {
      let r = qo(e);
      return (n) => ((n.description = r(n.source, t)), n);
    }
    N(gu, "descriptionTokenizer");
    function qo(e) {
      return e === "compact" ? bu : e === "preserve" ? Eu : e;
    }
    N(qo, "getJoiner");
    function bu(e, t = ht) {
      return e
        .map(({ tokens: { description: r } }) => r.trim())
        .filter((r) => r !== "")
        .join(" ");
    }
    N(bu, "compactJoiner");
    var Ym = N((e, { tokens: t }, r) => (t.type === "" ? e : r), "lineNo"),
      Xm = N(
        ({ tokens: e }) => (e.delimiter === "" ? e.start : e.postDelimiter.slice(1)) + e.description,
        "getDescription"
      );
    function Eu(e, t = ht) {
      if (e.length === 0) return "";
      e[0].tokens.description === "" && e[0].tokens.delimiter === t.start && (e = e.slice(1));
      let r = e[e.length - 1];
      return (
        r !== void 0 && r.tokens.description === "" && r.tokens.end.endsWith(t.end) && (e = e.slice(0, -1)),
        (e = e.slice(e.reduce(Ym, 0))),
        e.map(Xm).join(`
`)
      );
    }
    N(Eu, "preserveJoiner");
    function vu({
      startLine: e = 0,
      fence: t = "```",
      spacing: r = "compact",
      markers: n = ht,
      tokenizers: o = [fu(), hu(r), yu(), gu(r)],
    } = {}) {
      if (e < 0 || e % 1 > 0) throw new Error("Invalid startLine");
      let a = du({ startLine: e, markers: n }),
        i = uu({ fence: t }),
        l = pu({ tokenizers: o }),
        s = qo(r);
      return function (c) {
        let d = [];
        for (let p of iu(c)) {
          let h = a(p);
          if (h === null) continue;
          let f = i(h),
            b = f.slice(1).map(l);
          d.push({
            description: s(f[0], n),
            tags: b,
            source: h,
            problems: b.reduce((g, x) => g.concat(x.problems), []),
          });
        }
        return d;
      };
    }
    N(vu, "getParser");
    function xu(e) {
      return (
        e.start +
        e.delimiter +
        e.postDelimiter +
        e.tag +
        e.postTag +
        e.type +
        e.postType +
        e.name +
        e.postName +
        e.description +
        e.end +
        e.lineEnd
      );
    }
    N(xu, "join");
    function Su() {
      return (e) =>
        e.source.map(({ tokens: t }) => xu(t)).join(`
`);
    }
    N(Su, "getStringifier");
    var Qm = {
        line: 0,
        start: 0,
        delimiter: 0,
        postDelimiter: 0,
        tag: 0,
        postTag: 0,
        name: 0,
        postName: 0,
        type: 0,
        postType: 0,
        description: 0,
        end: 0,
        lineEnd: 0,
      },
      wI = Object.keys(Qm);
    function wu(e, t = {}) {
      return vu(t)(e);
    }
    N(wu, "parse");
    var AI = Su();
    function Au(e) {
      return e != null && e.includes("@");
    }
    N(Au, "containsJsDoc");
    function Tu(e) {
      let t =
          `/**
` +
          (e ?? "")
            .split(
              `
`
            )
            .map((n) => ` * ${n}`).join(`
`) +
          `
*/`,
        r = wu(t, { spacing: "preserve" });
      if (!r || r.length === 0) throw new Error("Cannot parse JSDoc tags.");
      return r[0];
    }
    N(Tu, "parse");
    var Zm = { tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"] },
      ey = N((e, t = Zm) => {
        if (!Au(e)) return { includesJsDoc: !1, ignore: !1 };
        let r = Tu(e),
          n = Cu(r, t.tags);
        return n.ignore
          ? { includesJsDoc: !0, ignore: !0 }
          : { includesJsDoc: !0, ignore: !1, description: r.description.trim(), extractedTags: n };
      }, "parseJsDoc");
    function Cu(e, t) {
      let r = { params: null, deprecated: null, returns: null, ignore: !1 };
      for (let n of e.tags)
        if (!(t !== void 0 && !t.includes(n.tag)))
          if (n.tag === "ignore") {
            r.ignore = !0;
            break;
          } else
            switch (n.tag) {
              case "param":
              case "arg":
              case "argument": {
                let o = Iu(n);
                o != null && (r.params == null && (r.params = []), r.params.push(o));
                break;
              }
              case "deprecated": {
                let o = Ou(n);
                o != null && (r.deprecated = o);
                break;
              }
              case "returns": {
                let o = Du(n);
                o != null && (r.returns = o);
                break;
              }
              default:
                break;
            }
      return r;
    }
    N(Cu, "extractJsDocTags");
    function ku(e) {
      return e.replace(/[\.-]$/, "");
    }
    N(ku, "normaliseParamName");
    function Iu(e) {
      if (!e.name || e.name === "-") return null;
      let t = zo(e.type);
      return {
        name: e.name,
        type: t,
        description: Jo(e.description),
        getPrettyName: N(() => ku(e.name), "getPrettyName"),
        getTypeName: N(() => (t ? Ho(t) : null), "getTypeName"),
      };
    }
    N(Iu, "extractParam");
    function Ou(e) {
      return e.name ? Vo(e.name, e.description) : null;
    }
    N(Ou, "extractDeprecated");
    function Vo(e, t) {
      let r = e === "" ? t : `${e} ${t}`;
      return Jo(r);
    }
    N(Vo, "joinNameAndDescription");
    function Jo(e) {
      let t = e.replace(/^- /g, "").trim();
      return t === "" ? null : t;
    }
    N(Jo, "normaliseDescription");
    function Du(e) {
      let t = zo(e.type);
      return t ? { type: t, description: Vo(e.name, e.description), getTypeName: N(() => Ho(t), "getTypeName") } : null;
    }
    N(Du, "extractReturns");
    var mt = (0, Gt.stringifyRules)(),
      ty = mt.JsdocTypeObject;
    mt.JsdocTypeAny = () => "any";
    mt.JsdocTypeObject = (e, t) => `(${ty(e, t)})`;
    mt.JsdocTypeOptional = (e, t) => t(e.element);
    mt.JsdocTypeNullable = (e, t) => t(e.element);
    mt.JsdocTypeNotNullable = (e, t) => t(e.element);
    mt.JsdocTypeUnion = (e, t) => e.elements.map(t).join("|");
    function zo(e) {
      try {
        return (0, Gt.parse)(e, "typescript");
      } catch {
        return null;
      }
    }
    N(zo, "extractType");
    function Ho(e) {
      return (0, Gt.transform)(mt, e);
    }
    N(Ho, "extractTypeName");
    function Go(e) {
      return e.length > 90;
    }
    N(Go, "isTooLongForTypeSummary");
    function Ru(e) {
      return e.length > 50;
    }
    N(Ru, "isTooLongForDefaultValueSummary");
    function fe(e, t) {
      return e === t ? { summary: e } : { summary: e, detail: t };
    }
    N(fe, "createSummaryValue");
    var TI = N((e) => e.replace(/\\r\\n/g, "\\n"), "normalizeNewlines");
    function _u(e, t) {
      if (e != null) {
        let { value: r } = e;
        if (!nn(r)) return Ru(r) ? fe(t?.name, r) : fe(r);
      }
      return null;
    }
    N(_u, "createDefaultValue");
    function Wo({ name: e, value: t, elements: r, raw: n }) {
      return t ?? (r != null ? r.map(Wo).join(" | ") : (n ?? e));
    }
    N(Wo, "generateUnionElement");
    function Pu({ name: e, raw: t, elements: r }) {
      return r != null ? fe(r.map(Wo).join(" | ")) : t != null ? fe(t.replace(/^\|\s*/, "")) : fe(e);
    }
    N(Pu, "generateUnion");
    function Fu({ type: e, raw: t }) {
      return t != null ? fe(t) : fe(e);
    }
    N(Fu, "generateFuncSignature");
    function Nu({ type: e, raw: t }) {
      return t != null ? (Go(t) ? fe(e, t) : fe(t)) : fe(e);
    }
    N(Nu, "generateObjectSignature");
    function Bu(e) {
      let { type: t } = e;
      return t === "object" ? Nu(e) : Fu(e);
    }
    N(Bu, "generateSignature");
    function ju({ name: e, raw: t }) {
      return t != null ? (Go(t) ? fe(e, t) : fe(t)) : fe(e);
    }
    N(ju, "generateDefault");
    function Lu(e) {
      if (e == null) return null;
      switch (e.name) {
        case "union":
          return Pu(e);
        case "signature":
          return Bu(e);
        default:
          return ju(e);
      }
    }
    N(Lu, "createType");
    var ry = N((e, t) => {
      let { flowType: r, description: n, required: o, defaultValue: a } = t;
      return { name: e, type: Lu(r), required: o, description: n, defaultValue: _u(a ?? null, r ?? null) };
    }, "createFlowPropDef");
    function Mu({ defaultValue: e }) {
      if (e != null) {
        let { value: t } = e;
        if (!nn(t)) return fe(t);
      }
      return null;
    }
    N(Mu, "createDefaultValue");
    function Uu({ tsType: e, required: t }) {
      if (e == null) return null;
      let r = e.name;
      return (
        t || (r = r.replace(" | undefined", "")), fe(["Array", "Record", "signature"].includes(e.name) ? e.raw : r)
      );
    }
    N(Uu, "createType");
    var ny = N((e, t) => {
      let { description: r, required: n } = t;
      return { name: e, type: Uu(t), required: n, description: r, defaultValue: Mu(t) };
    }, "createTsPropDef");
    function $u(e) {
      return e != null ? fe(e.name) : null;
    }
    N($u, "createType");
    function qu(e) {
      let { computed: t, func: r } = e;
      return typeof t > "u" && typeof r > "u";
    }
    N(qu, "isReactDocgenTypescript");
    function Vu(e) {
      return e
        ? e.name === "string"
          ? !0
          : e.name === "enum"
            ? Array.isArray(e.value) &&
              e.value.every(({ value: t }) => typeof t == "string" && t[0] === '"' && t[t.length - 1] === '"')
            : !1
        : !1;
    }
    N(Vu, "isStringValued");
    function Ju(e, t) {
      if (e != null) {
        let { value: r } = e;
        if (!nn(r)) return qu(e) && Vu(t) ? fe(JSON.stringify(r)) : fe(r);
      }
      return null;
    }
    N(Ju, "createDefaultValue");
    function Ko(e, t, r) {
      let { description: n, required: o, defaultValue: a } = r;
      return { name: e, type: $u(t), required: o, description: n, defaultValue: Ju(a, t) };
    }
    N(Ko, "createBasicPropDef");
    function br(e, t) {
      if (t?.includesJsDoc) {
        let { description: r, extractedTags: n } = t;
        r != null && (e.description = t.description);
        let o = { ...n, params: n?.params?.map((a) => ({ name: a.getPrettyName(), description: a.description })) };
        Object.values(o).filter(Boolean).length > 0 && (e.jsDocTags = o);
      }
      return e;
    }
    N(br, "applyJsDocResult");
    var oy = N((e, t, r) => {
        let n = Ko(e, t.type, t);
        return (n.sbType = Uo(t)), br(n, r);
      }, "javaScriptFactory"),
      ay = N((e, t, r) => {
        let n = ny(e, t);
        return (n.sbType = Uo(t)), br(n, r);
      }, "tsFactory"),
      iy = N((e, t, r) => {
        let n = ry(e, t);
        return (n.sbType = Uo(t)), br(n, r);
      }, "flowFactory"),
      sy = N((e, t, r) => {
        let n = Ko(e, { name: "unknown" }, t);
        return br(n, r);
      }, "unknownFactory"),
      zu = N((e) => {
        switch (e) {
          case "JavaScript":
            return oy;
          case "TypeScript":
            return ay;
          case "Flow":
            return iy;
          default:
            return sy;
        }
      }, "getPropDefFactory"),
      Hu = N(
        (e) =>
          e.type != null ? "JavaScript" : e.flowType != null ? "Flow" : e.tsType != null ? "TypeScript" : "Unknown",
        "getTypeSystem"
      ),
      ly = N((e) => {
        let t = Hu(e[0]),
          r = zu(t);
        return e.map((n) => {
          let o = n;
          return n.type?.elements && (o = { ...n, type: { ...n.type, value: n.type.elements } }), Yo(o.name, o, t, r);
        });
      }, "extractComponentSectionArray"),
      uy = N((e) => {
        let t = Object.keys(e),
          r = Hu(e[t[0]]),
          n = zu(r);
        return t
          .map((o) => {
            let a = e[o];
            return a != null ? Yo(o, a, r, n) : null;
          })
          .filter(Boolean);
      }, "extractComponentSectionObject"),
      CI = N((e, t) => {
        let r = ru(e, t);
        return tu(r) ? (Array.isArray(r) ? ly(r) : uy(r)) : [];
      }, "extractComponentProps");
    function Yo(e, t, r, n) {
      let o = ey(t.description);
      return o.includesJsDoc && o.ignore
        ? null
        : { propDef: n(e, t, o), jsDocTags: o.extractedTags, docgenInfo: t, typeSystem: r };
    }
    N(Yo, "extractProp");
    function cy(e) {
      return e != null ? nu(e) : "";
    }
    N(cy, "extractComponentDescription");
    var II = N((e) => {
        let {
            component: t,
            argTypes: r,
            parameters: { docs: n = {} },
          } = e,
          { extractArgTypes: o } = n,
          a = o && t ? o(t) : {};
        return a ? et(a, r) : r;
      }, "enhanceArgTypes"),
      Gu = "storybook/docs",
      OI = `${Gu}/panel`;
    var DI = `${Gu}/snippet-rendered`,
      dy = ((e) => ((e.AUTO = "auto"), (e.CODE = "code"), (e.DYNAMIC = "dynamic"), e))(dy || {}),
      py = /(addons\/|addon-|addon-essentials\/)(docs|controls)/,
      RI = N((e) => e.presetsList?.some((t) => py.test(t.name)), "hasDocsOrControls");
    V();
    J();
    z();
    V();
    J();
    z();
    var zI = __STORYBOOK_CHANNELS__,
      {
        Channel: HI,
        PostMessageTransport: GI,
        WebsocketTransport: WI,
        createBrowserChannel: KI,
      } = __STORYBOOK_CHANNELS__;
    V();
    J();
    z();
    var Wu = (() => {
      let e;
      return (
        typeof window < "u"
          ? (e = window)
          : typeof globalThis < "u"
            ? (e = globalThis)
            : typeof window < "u"
              ? (e = window)
              : typeof self < "u"
                ? (e = self)
                : (e = {}),
        e
      );
    })();
    var Zy = Object.create,
      zc = Object.defineProperty,
      eg = Object.getOwnPropertyDescriptor,
      tg = Object.getOwnPropertyNames,
      rg = Object.getPrototypeOf,
      ng = Object.prototype.hasOwnProperty,
      og = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
      ag = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of tg(t))
            !ng.call(e, o) && o !== r && zc(e, o, { get: () => t[o], enumerable: !(n = eg(t, o)) || n.enumerable });
        return e;
      },
      ig = (e, t, r) => (
        (r = e != null ? Zy(rg(e)) : {}),
        ag(t || !e || !e.__esModule ? zc(r, "default", { value: e, enumerable: !0 }) : r, e)
      ),
      sg = og((e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isEqual = (function () {
            var t = Object.prototype.toString,
              r = Object.getPrototypeOf,
              n = Object.getOwnPropertySymbols
                ? function (o) {
                    return Object.keys(o).concat(Object.getOwnPropertySymbols(o));
                  }
                : Object.keys;
            return function (o, a) {
              return (function i(l, s, c) {
                var d,
                  p,
                  h,
                  f = t.call(l),
                  b = t.call(s);
                if (l === s) return !0;
                if (l == null || s == null) return !1;
                if (c.indexOf(l) > -1 && c.indexOf(s) > -1) return !0;
                if (
                  (c.push(l, s),
                  f != b ||
                    ((d = n(l)),
                    (p = n(s)),
                    d.length != p.length ||
                      d.some(function (g) {
                        return !i(l[g], s[g], c);
                      })))
                )
                  return !1;
                switch (f.slice(8, -1)) {
                  case "Symbol":
                    return l.valueOf() == s.valueOf();
                  case "Date":
                  case "Number":
                    return +l == +s || (+l != +l && +s != +s);
                  case "RegExp":
                  case "Function":
                  case "String":
                  case "Boolean":
                    return "" + l == "" + s;
                  case "Set":
                  case "Map":
                    (d = l.entries()), (p = s.entries());
                    do if (!i((h = d.next()).value, p.next().value, c)) return !1;
                    while (!h.done);
                    return !0;
                  case "ArrayBuffer":
                    (l = new Uint8Array(l)), (s = new Uint8Array(s));
                  case "DataView":
                    (l = new Uint8Array(l.buffer)), (s = new Uint8Array(s.buffer));
                  case "Float32Array":
                  case "Float64Array":
                  case "Int8Array":
                  case "Int16Array":
                  case "Int32Array":
                  case "Uint8Array":
                  case "Uint16Array":
                  case "Uint32Array":
                  case "Uint8ClampedArray":
                  case "Arguments":
                  case "Array":
                    if (l.length != s.length) return !1;
                    for (h = 0; h < l.length; h++)
                      if ((h in l || h in s) && (h in l != h in s || !i(l[h], s[h], c))) return !1;
                    return !0;
                  case "Object":
                    return i(r(l), r(s), c);
                  default:
                    return !1;
                }
              })(o, a, []);
            };
          })());
      }),
      mc = ig(sg()),
      Hc = (e) => e.map((t) => typeof t < "u").filter(Boolean).length,
      lg = (e, t) => {
        let { exists: r, eq: n, neq: o, truthy: a } = e;
        if (Hc([r, n, o, a]) > 1)
          throw new Error(`Invalid conditional test ${JSON.stringify({ exists: r, eq: n, neq: o })}`);
        if (typeof n < "u") return (0, mc.isEqual)(t, n);
        if (typeof o < "u") return !(0, mc.isEqual)(t, o);
        if (typeof r < "u") {
          let i = typeof t < "u";
          return r ? i : !i;
        }
        return typeof a > "u" || a ? !!t : !t;
      },
      ug = (e, t, r) => {
        if (!e.if) return !0;
        let { arg: n, global: o } = e.if;
        if (Hc([n, o]) !== 1) throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n, global: o })}`);
        let a = n ? t[n] : r[o];
        return lg(e.if, a);
      },
      Gc = je({
        "../../node_modules/memoizerific/memoizerific.js"(e, t) {
          (function (r) {
            if (typeof e == "object" && typeof t < "u") t.exports = r();
            else if (typeof define == "function" && define.amd) define([], r);
            else {
              var n;
              typeof window < "u" || typeof window < "u" ? (n = window) : typeof self < "u" ? (n = self) : (n = this),
                (n.memoizerific = r());
            }
          })(function () {
            return (function r(n, o, a) {
              function i(c, d) {
                if (!o[c]) {
                  if (!n[c]) {
                    var p = typeof sr == "function" && sr;
                    if (!d && p) return p(c, !0);
                    if (l) return l(c, !0);
                    var h = new Error("Cannot find module '" + c + "'");
                    throw ((h.code = "MODULE_NOT_FOUND"), h);
                  }
                  var f = (o[c] = { exports: {} });
                  n[c][0].call(
                    f.exports,
                    function (b) {
                      var g = n[c][1][b];
                      return i(g || b);
                    },
                    f,
                    f.exports,
                    r,
                    n,
                    o,
                    a
                  );
                }
                return o[c].exports;
              }
              for (var l = typeof sr == "function" && sr, s = 0; s < a.length; s++) i(a[s]);
              return i;
            })(
              {
                1: [
                  function (r, n, o) {
                    n.exports = function (a) {
                      if (typeof Map != "function" || a) {
                        var i = r("./similar");
                        return new i();
                      } else return new Map();
                    };
                  },
                  { "./similar": 2 },
                ],
                2: [
                  function (r, n, o) {
                    function a() {
                      return (this.list = []), (this.lastItem = void 0), (this.size = 0), this;
                    }
                    (a.prototype.get = function (i) {
                      var l;
                      if (this.lastItem && this.isEqual(this.lastItem.key, i)) return this.lastItem.val;
                      if (((l = this.indexOf(i)), l >= 0)) return (this.lastItem = this.list[l]), this.list[l].val;
                    }),
                      (a.prototype.set = function (i, l) {
                        var s;
                        return this.lastItem && this.isEqual(this.lastItem.key, i)
                          ? ((this.lastItem.val = l), this)
                          : ((s = this.indexOf(i)),
                            s >= 0
                              ? ((this.lastItem = this.list[s]), (this.list[s].val = l), this)
                              : ((this.lastItem = { key: i, val: l }),
                                this.list.push(this.lastItem),
                                this.size++,
                                this));
                      }),
                      (a.prototype.delete = function (i) {
                        var l;
                        if (
                          (this.lastItem && this.isEqual(this.lastItem.key, i) && (this.lastItem = void 0),
                          (l = this.indexOf(i)),
                          l >= 0)
                        )
                          return this.size--, this.list.splice(l, 1)[0];
                      }),
                      (a.prototype.has = function (i) {
                        var l;
                        return this.lastItem && this.isEqual(this.lastItem.key, i)
                          ? !0
                          : ((l = this.indexOf(i)), l >= 0 ? ((this.lastItem = this.list[l]), !0) : !1);
                      }),
                      (a.prototype.forEach = function (i, l) {
                        var s;
                        for (s = 0; s < this.size; s++) i.call(l || this, this.list[s].val, this.list[s].key, this);
                      }),
                      (a.prototype.indexOf = function (i) {
                        var l;
                        for (l = 0; l < this.size; l++) if (this.isEqual(this.list[l].key, i)) return l;
                        return -1;
                      }),
                      (a.prototype.isEqual = function (i, l) {
                        return i === l || (i !== i && l !== l);
                      }),
                      (n.exports = a);
                  },
                  {},
                ],
                3: [
                  function (r, n, o) {
                    var a = r("map-or-similar");
                    n.exports = function (c) {
                      var d = new a(!1),
                        p = [];
                      return function (h) {
                        var f = function () {
                          var b = d,
                            g,
                            x,
                            S = arguments.length - 1,
                            A = Array(S + 1),
                            k = !0,
                            T;
                          if ((f.numArgs || f.numArgs === 0) && f.numArgs !== S + 1)
                            throw new Error(
                              "Memoizerific functions should always be called with the same number of arguments"
                            );
                          for (T = 0; T < S; T++) {
                            if (((A[T] = { cacheItem: b, arg: arguments[T] }), b.has(arguments[T]))) {
                              b = b.get(arguments[T]);
                              continue;
                            }
                            (k = !1), (g = new a(!1)), b.set(arguments[T], g), (b = g);
                          }
                          return (
                            k && (b.has(arguments[S]) ? (x = b.get(arguments[S])) : (k = !1)),
                            k || ((x = h.apply(null, arguments)), b.set(arguments[S], x)),
                            c > 0 &&
                              ((A[S] = { cacheItem: b, arg: arguments[S] }),
                              k ? i(p, A) : p.push(A),
                              p.length > c && l(p.shift())),
                            (f.wasMemoized = k),
                            (f.numArgs = S + 1),
                            x
                          );
                        };
                        return (f.limit = c), (f.wasMemoized = !1), (f.cache = d), (f.lru = p), f;
                      };
                    };
                    function i(c, d) {
                      var p = c.length,
                        h = d.length,
                        f,
                        b,
                        g;
                      for (b = 0; b < p; b++) {
                        for (f = !0, g = 0; g < h; g++)
                          if (!s(c[b][g].arg, d[g].arg)) {
                            f = !1;
                            break;
                          }
                        if (f) break;
                      }
                      c.push(c.splice(b, 1)[0]);
                    }
                    function l(c) {
                      var d = c.length,
                        p = c[d - 1],
                        h,
                        f;
                      for (
                        p.cacheItem.delete(p.arg), f = d - 2;
                        f >= 0 && ((p = c[f]), (h = p.cacheItem.get(p.arg)), !h || !h.size);
                        f--
                      )
                        p.cacheItem.delete(p.arg);
                    }
                    function s(c, d) {
                      return c === d || (c !== c && d !== d);
                    }
                  },
                  { "map-or-similar": 1 },
                ],
              },
              {},
              [3]
            )(3);
          });
        },
      }),
      cg = je({
        "../../node_modules/tocbot/src/js/default-options.js"(e, t) {
          t.exports = {
            tocSelector: ".js-toc",
            contentSelector: ".js-toc-content",
            headingSelector: "h1, h2, h3",
            ignoreSelector: ".js-toc-ignore",
            hasInnerContainers: !1,
            linkClass: "toc-link",
            extraLinkClasses: "",
            activeLinkClass: "is-active-link",
            listClass: "toc-list",
            extraListClasses: "",
            isCollapsedClass: "is-collapsed",
            collapsibleClass: "is-collapsible",
            listItemClass: "toc-list-item",
            activeListItemClass: "is-active-li",
            collapseDepth: 0,
            scrollSmooth: !0,
            scrollSmoothDuration: 420,
            scrollSmoothOffset: 0,
            scrollEndCallback: function (r) {},
            headingsOffset: 1,
            throttleTimeout: 50,
            positionFixedSelector: null,
            positionFixedClass: "is-position-fixed",
            fixedSidebarOffset: "auto",
            includeHtml: !1,
            includeTitleTags: !1,
            onClick: function (r) {},
            orderedList: !0,
            scrollContainer: null,
            skipRendering: !1,
            headingLabelCallback: !1,
            ignoreHiddenElements: !1,
            headingObjectCallback: null,
            basePath: "",
            disableTocScrollSync: !1,
            tocScrollOffset: 0,
          };
        },
      }),
      dg = je({
        "../../node_modules/tocbot/src/js/build-html.js"(e, t) {
          t.exports = function (r) {
            var n = [].forEach,
              o = [].some,
              a = document.body,
              i,
              l = !0,
              s = " ";
            function c(T, I) {
              var D = I.appendChild(p(T));
              if (T.children.length) {
                var F = h(T.isCollapsed);
                T.children.forEach(function (P) {
                  c(P, F);
                }),
                  D.appendChild(F);
              }
            }
            function d(T, I) {
              var D = !1,
                F = h(D);
              if (
                (I.forEach(function (P) {
                  c(P, F);
                }),
                (i = T || i),
                i !== null)
              )
                return i.firstChild && i.removeChild(i.firstChild), I.length === 0 ? i : i.appendChild(F);
            }
            function p(T) {
              var I = document.createElement("li"),
                D = document.createElement("a");
              return (
                r.listItemClass && I.setAttribute("class", r.listItemClass),
                r.onClick && (D.onclick = r.onClick),
                r.includeTitleTags && D.setAttribute("title", T.textContent),
                r.includeHtml && T.childNodes.length
                  ? n.call(T.childNodes, function (F) {
                      D.appendChild(F.cloneNode(!0));
                    })
                  : (D.textContent = T.textContent),
                D.setAttribute("href", r.basePath + "#" + T.id),
                D.setAttribute("class", r.linkClass + s + "node-name--" + T.nodeName + s + r.extraLinkClasses),
                I.appendChild(D),
                I
              );
            }
            function h(T) {
              var I = r.orderedList ? "ol" : "ul",
                D = document.createElement(I),
                F = r.listClass + s + r.extraListClasses;
              return (
                T && ((F = F + s + r.collapsibleClass), (F = F + s + r.isCollapsedClass)), D.setAttribute("class", F), D
              );
            }
            function f() {
              if (r.scrollContainer && document.querySelector(r.scrollContainer)) {
                var T;
                T = document.querySelector(r.scrollContainer).scrollTop;
              } else T = document.documentElement.scrollTop || a.scrollTop;
              var I = document.querySelector(r.positionFixedSelector);
              r.fixedSidebarOffset === "auto" && (r.fixedSidebarOffset = i.offsetTop),
                T > r.fixedSidebarOffset
                  ? I.className.indexOf(r.positionFixedClass) === -1 && (I.className += s + r.positionFixedClass)
                  : (I.className = I.className.replace(s + r.positionFixedClass, ""));
            }
            function b(T) {
              var I = 0;
              return T !== null && ((I = T.offsetTop), r.hasInnerContainers && (I += b(T.offsetParent))), I;
            }
            function g(T, I) {
              return T && T.className !== I && (T.className = I), T;
            }
            function x(T) {
              if (r.scrollContainer && document.querySelector(r.scrollContainer)) {
                var I;
                I = document.querySelector(r.scrollContainer).scrollTop;
              } else I = document.documentElement.scrollTop || a.scrollTop;
              r.positionFixedSelector && f();
              var D = T,
                F;
              if (l && i !== null && D.length > 0) {
                o.call(D, function (w, C) {
                  if (b(w) > I + r.headingsOffset + 10) {
                    var _ = C === 0 ? C : C - 1;
                    return (F = D[_]), !0;
                  } else if (C === D.length - 1) return (F = D[D.length - 1]), !0;
                });
                var P = i.querySelector("." + r.activeLinkClass),
                  L = i.querySelector(
                    "." +
                      r.linkClass +
                      ".node-name--" +
                      F.nodeName +
                      '[href="' +
                      r.basePath +
                      "#" +
                      F.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1") +
                      '"]'
                  );
                if (P === L) return;
                var B = i.querySelectorAll("." + r.linkClass);
                n.call(B, function (w) {
                  g(w, w.className.replace(s + r.activeLinkClass, ""));
                });
                var G = i.querySelectorAll("." + r.listItemClass);
                n.call(G, function (w) {
                  g(w, w.className.replace(s + r.activeListItemClass, ""));
                }),
                  L && L.className.indexOf(r.activeLinkClass) === -1 && (L.className += s + r.activeLinkClass);
                var $ = L && L.parentNode;
                $ && $.className.indexOf(r.activeListItemClass) === -1 && ($.className += s + r.activeListItemClass);
                var H = i.querySelectorAll("." + r.listClass + "." + r.collapsibleClass);
                n.call(H, function (w) {
                  w.className.indexOf(r.isCollapsedClass) === -1 && (w.className += s + r.isCollapsedClass);
                }),
                  L &&
                    L.nextSibling &&
                    L.nextSibling.className.indexOf(r.isCollapsedClass) !== -1 &&
                    g(L.nextSibling, L.nextSibling.className.replace(s + r.isCollapsedClass, "")),
                  S(L && L.parentNode.parentNode);
              }
            }
            function S(T) {
              return T &&
                T.className.indexOf(r.collapsibleClass) !== -1 &&
                T.className.indexOf(r.isCollapsedClass) !== -1
                ? (g(T, T.className.replace(s + r.isCollapsedClass, "")), S(T.parentNode.parentNode))
                : T;
            }
            function A(T) {
              var I = T.target || T.srcElement;
              typeof I.className != "string" || I.className.indexOf(r.linkClass) === -1 || (l = !1);
            }
            function k() {
              l = !0;
            }
            return { enableTocAnimation: k, disableTocAnimation: A, render: d, updateToc: x };
          };
        },
      }),
      pg = je({
        "../../node_modules/tocbot/src/js/parse-content.js"(e, t) {
          t.exports = function (r) {
            var n = [].reduce;
            function o(p) {
              return p[p.length - 1];
            }
            function a(p) {
              return +p.nodeName.toUpperCase().replace("H", "");
            }
            function i(p) {
              try {
                return p instanceof window.HTMLElement || p instanceof window.parent.HTMLElement;
              } catch {
                return p instanceof window.HTMLElement;
              }
            }
            function l(p) {
              if (!i(p)) return p;
              if (r.ignoreHiddenElements && (!p.offsetHeight || !p.offsetParent)) return null;
              let h =
                p.getAttribute("data-heading-label") ||
                (r.headingLabelCallback
                  ? String(r.headingLabelCallback(p.innerText))
                  : (p.innerText || p.textContent).trim());
              var f = { id: p.id, children: [], nodeName: p.nodeName, headingLevel: a(p), textContent: h };
              return (
                r.includeHtml && (f.childNodes = p.childNodes),
                r.headingObjectCallback ? r.headingObjectCallback(f, p) : f
              );
            }
            function s(p, h) {
              for (
                var f = l(p), b = f.headingLevel, g = h, x = o(g), S = x ? x.headingLevel : 0, A = b - S;
                A > 0 && ((x = o(g)), !(x && b === x.headingLevel));

              )
                x && x.children !== void 0 && (g = x.children), A--;
              return b >= r.collapseDepth && (f.isCollapsed = !0), g.push(f), g;
            }
            function c(p, h) {
              var f = h;
              r.ignoreSelector &&
                (f = h.split(",").map(function (b) {
                  return b.trim() + ":not(" + r.ignoreSelector + ")";
                }));
              try {
                return p.querySelectorAll(f);
              } catch {
                return console.warn("Headers not found with selector: " + f), null;
              }
            }
            function d(p) {
              return n.call(
                p,
                function (h, f) {
                  var b = l(f);
                  return b && s(b, h.nest), h;
                },
                { nest: [] }
              );
            }
            return { nestHeadingsArray: d, selectHeadings: c };
          };
        },
      }),
      fg = je({
        "../../node_modules/tocbot/src/js/update-toc-scroll.js"(e, t) {
          t.exports = function (r) {
            var n = r.tocElement || document.querySelector(r.tocSelector);
            if (n && n.scrollHeight > n.clientHeight) {
              var o = n.querySelector("." + r.activeListItemClass);
              o && (n.scrollTop = o.offsetTop - r.tocScrollOffset);
            }
          };
        },
      }),
      hg = je({
        "../../node_modules/tocbot/src/js/scroll-smooth/index.js"(e) {
          e.initSmoothScrolling = t;
          function t(n) {
            var o = n.duration,
              a = n.offset,
              i = location.hash ? c(location.href) : location.href;
            l();
            function l() {
              document.body.addEventListener("click", p, !1);
              function p(h) {
                !s(h.target) ||
                  h.target.className.indexOf("no-smooth-scroll") > -1 ||
                  (h.target.href.charAt(h.target.href.length - 2) === "#" &&
                    h.target.href.charAt(h.target.href.length - 1) === "!") ||
                  h.target.className.indexOf(n.linkClass) === -1 ||
                  r(h.target.hash, {
                    duration: o,
                    offset: a,
                    callback: function () {
                      d(h.target.hash);
                    },
                  });
              }
            }
            function s(p) {
              return (
                p.tagName.toLowerCase() === "a" &&
                (p.hash.length > 0 || p.href.charAt(p.href.length - 1) === "#") &&
                (c(p.href) === i || c(p.href) + "#" === i)
              );
            }
            function c(p) {
              return p.slice(0, p.lastIndexOf("#"));
            }
            function d(p) {
              var h = document.getElementById(p.substring(1));
              h && (/^(?:a|select|input|button|textarea)$/i.test(h.tagName) || (h.tabIndex = -1), h.focus());
            }
          }
          function r(n, o) {
            var a = window.pageYOffset,
              i = { duration: o.duration, offset: o.offset || 0, callback: o.callback, easing: o.easing || b },
              l =
                document.querySelector('[id="' + decodeURI(n).split("#").join("") + '"]') ||
                document.querySelector('[id="' + n.split("#").join("") + '"]'),
              s =
                typeof n == "string"
                  ? i.offset +
                    (n
                      ? (l && l.getBoundingClientRect().top) || 0
                      : -(document.documentElement.scrollTop || document.body.scrollTop))
                  : n,
              c = typeof i.duration == "function" ? i.duration(s) : i.duration,
              d,
              p;
            requestAnimationFrame(function (g) {
              (d = g), h(g);
            });
            function h(g) {
              (p = g - d), window.scrollTo(0, i.easing(p, a, s, c)), p < c ? requestAnimationFrame(h) : f();
            }
            function f() {
              window.scrollTo(0, a + s), typeof i.callback == "function" && i.callback();
            }
            function b(g, x, S, A) {
              return (g /= A / 2), g < 1 ? (S / 2) * g * g + x : (g--, (-S / 2) * (g * (g - 2) - 1) + x);
            }
          }
        },
      }),
      mg = je({
        "../../node_modules/tocbot/src/js/index.js"(e, t) {
          (function (r, n) {
            typeof define == "function" && define.amd
              ? define([], n(r))
              : typeof e == "object"
                ? (t.exports = n(r))
                : (r.tocbot = n(r));
          })(typeof window < "u" ? window : window || window, function (r) {
            var n = cg(),
              o = {},
              a = {},
              i = dg(),
              l = pg(),
              s = fg(),
              c,
              d,
              p = !!r && !!r.document && !!r.document.querySelector && !!r.addEventListener;
            if (typeof window > "u" && !p) return;
            var h,
              f = Object.prototype.hasOwnProperty;
            function b() {
              for (var A = {}, k = 0; k < arguments.length; k++) {
                var T = arguments[k];
                for (var I in T) f.call(T, I) && (A[I] = T[I]);
              }
              return A;
            }
            function g(A, k, T) {
              k || (k = 250);
              var I, D;
              return function () {
                var F = T || this,
                  P = +new Date(),
                  L = arguments;
                I && P < I + k
                  ? (clearTimeout(D),
                    (D = setTimeout(function () {
                      (I = P), A.apply(F, L);
                    }, k)))
                  : ((I = P), A.apply(F, L));
              };
            }
            function x(A) {
              try {
                return A.contentElement || document.querySelector(A.contentSelector);
              } catch {
                return console.warn("Contents element not found: " + A.contentSelector), null;
              }
            }
            function S(A) {
              try {
                return A.tocElement || document.querySelector(A.tocSelector);
              } catch {
                return console.warn("TOC element not found: " + A.tocSelector), null;
              }
            }
            return (
              (a.destroy = function () {
                var A = S(o);
                A !== null &&
                  (o.skipRendering || (A && (A.innerHTML = "")),
                  o.scrollContainer && document.querySelector(o.scrollContainer)
                    ? (document
                        .querySelector(o.scrollContainer)
                        .removeEventListener("scroll", this._scrollListener, !1),
                      document.querySelector(o.scrollContainer).removeEventListener("resize", this._scrollListener, !1),
                      c &&
                        document.querySelector(o.scrollContainer).removeEventListener("click", this._clickListener, !1))
                    : (document.removeEventListener("scroll", this._scrollListener, !1),
                      document.removeEventListener("resize", this._scrollListener, !1),
                      c && document.removeEventListener("click", this._clickListener, !1)));
              }),
              (a.init = function (A) {
                if (p) {
                  (o = b(n, A || {})),
                    (this.options = o),
                    (this.state = {}),
                    o.scrollSmooth &&
                      ((o.duration = o.scrollSmoothDuration),
                      (o.offset = o.scrollSmoothOffset),
                      (a.scrollSmooth = hg().initSmoothScrolling(o))),
                    (c = i(o)),
                    (d = l(o)),
                    (this._buildHtml = c),
                    (this._parseContent = d),
                    (this._headingsArray = h),
                    a.destroy();
                  var k = x(o);
                  if (k !== null) {
                    var T = S(o);
                    if (T !== null && ((h = d.selectHeadings(k, o.headingSelector)), h !== null)) {
                      var I = d.nestHeadingsArray(h),
                        D = I.nest;
                      if (!o.skipRendering) c.render(T, D);
                      else return this;
                      (this._scrollListener = g(function (P) {
                        c.updateToc(h), !o.disableTocScrollSync && s(o);
                        var L = P && P.target && P.target.scrollingElement && P.target.scrollingElement.scrollTop === 0;
                        ((P && (P.eventPhase === 0 || P.currentTarget === null)) || L) &&
                          (c.updateToc(h), o.scrollEndCallback && o.scrollEndCallback(P));
                      }, o.throttleTimeout)),
                        this._scrollListener(),
                        o.scrollContainer && document.querySelector(o.scrollContainer)
                          ? (document
                              .querySelector(o.scrollContainer)
                              .addEventListener("scroll", this._scrollListener, !1),
                            document
                              .querySelector(o.scrollContainer)
                              .addEventListener("resize", this._scrollListener, !1))
                          : (document.addEventListener("scroll", this._scrollListener, !1),
                            document.addEventListener("resize", this._scrollListener, !1));
                      var F = null;
                      return (
                        (this._clickListener = g(function (P) {
                          o.scrollSmooth && c.disableTocAnimation(P),
                            c.updateToc(h),
                            F && clearTimeout(F),
                            (F = setTimeout(function () {
                              c.enableTocAnimation();
                            }, o.scrollSmoothDuration));
                        }, o.throttleTimeout)),
                        o.scrollContainer && document.querySelector(o.scrollContainer)
                          ? document.querySelector(o.scrollContainer).addEventListener("click", this._clickListener, !1)
                          : document.addEventListener("click", this._clickListener, !1),
                        this
                      );
                    }
                  }
                }
              }),
              (a.refresh = function (A) {
                a.destroy(), a.init(A || this.options);
              }),
              (r.tocbot = a),
              a
            );
          });
        },
      });
    function Qt() {
      return (
        (Qt = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        Qt.apply(null, arguments)
      );
    }
    function yg(e) {
      if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function wr(e, t) {
      return (
        (wr = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (r, n) {
              return (r.__proto__ = n), r;
            }),
        wr(e, t)
      );
    }
    function gg(e, t) {
      (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), wr(e, t);
    }
    function ga(e) {
      return (
        (ga = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        ga(e)
      );
    }
    function bg(e) {
      try {
        return Function.toString.call(e).indexOf("[native code]") !== -1;
      } catch {
        return typeof e == "function";
      }
    }
    function Wc() {
      try {
        var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch {}
      return (Wc = function () {
        return !!e;
      })();
    }
    function Eg(e, t, r) {
      if (Wc()) return Reflect.construct.apply(null, arguments);
      var n = [null];
      n.push.apply(n, t);
      var o = new (e.bind.apply(e, n))();
      return r && wr(o, r.prototype), o;
    }
    function ba(e) {
      var t = typeof Map == "function" ? new Map() : void 0;
      return (
        (ba = function (r) {
          if (r === null || !bg(r)) return r;
          if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
          if (t !== void 0) {
            if (t.has(r)) return t.get(r);
            t.set(r, n);
          }
          function n() {
            return Eg(r, arguments, ga(this).constructor);
          }
          return (
            (n.prototype = Object.create(r.prototype, {
              constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 },
            })),
            wr(n, r)
          );
        }),
        ba(e)
      );
    }
    var vg = {
      1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
      2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
      3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
      4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
      5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
      6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
      7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
      8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
      9: `Please provide a number of steps to the modularScale helper.

`,
      10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
      11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
      12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
      13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
      14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
      15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
      16: `You must provide a template to this method.

`,
      17: `You passed an unsupported selector state to this method.

`,
      18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
      19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
      20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
      21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      23: `fontFace expects a name of a font-family.

`,
      24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
      25: `fontFace expects localFonts to be an array.

`,
      26: `fontFace expects fileFormats to be an array.

`,
      27: `radialGradient requries at least 2 color-stops to properly render.

`,
      28: `Please supply a filename to retinaImage() as the first argument.

`,
      29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
      30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
      32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
      33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
      34: `borderRadius expects a radius value as a string or number as the second argument.

`,
      35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
      36: `Property must be a string value.

`,
      37: `Syntax Error at %s.

`,
      38: `Formula contains a function that needs parentheses at %s.

`,
      39: `Formula is missing closing parenthesis at %s.

`,
      40: `Formula has too many closing parentheses at %s.

`,
      41: `All values in a formula must have the same unit or be unitless.

`,
      42: `Please provide a number of steps to the modularScale helper.

`,
      43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
      44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
      45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
      46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
      47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
      48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
      49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
      50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
      51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
      52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
      53: `fontFace expects localFonts to be an array.

`,
      54: `fontFace expects fileFormats to be an array.

`,
      55: `fontFace expects a name of a font-family.

`,
      56: `linearGradient requries at least 2 color-stops to properly render.

`,
      57: `radialGradient requries at least 2 color-stops to properly render.

`,
      58: `Please supply a filename to retinaImage() as the first argument.

`,
      59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
      60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      61: `Property must be a string value.

`,
      62: `borderRadius expects a radius value as a string or number as the second argument.

`,
      63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
      64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
      65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
      66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
      67: `You must provide a template to this method.

`,
      68: `You passed an unsupported selector state to this method.

`,
      69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
      70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
      71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
      72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
      73: `Please provide a valid CSS variable.

`,
      74: `CSS variable not found and no default was provided.

`,
      75: `important requires a valid style object, got a %s instead.

`,
      76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
      77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
      78: `base must be set in "px" or "%" but you set it in "%s".
`,
    };
    function xg() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      var n = t[0],
        o = [],
        a;
      for (a = 1; a < t.length; a += 1) o.push(t[a]);
      return (
        o.forEach(function (i) {
          n = n.replace(/%[a-z]/, i);
        }),
        n
      );
    }
    var Ke = (function (e) {
      gg(t, e);
      function t(r) {
        for (var n, o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++) a[i - 1] = arguments[i];
        return (n = e.call(this, xg.apply(void 0, [vg[r]].concat(a))) || this), yg(n);
      }
      return t;
    })(ba(Error));
    function aa(e) {
      return Math.round(e * 255);
    }
    function Sg(e, t, r) {
      return aa(e) + "," + aa(t) + "," + aa(r);
    }
    function Ar(e, t, r, n) {
      if ((n === void 0 && (n = Sg), t === 0)) return n(r, r, r);
      var o = (((e % 360) + 360) % 360) / 60,
        a = (1 - Math.abs(2 * r - 1)) * t,
        i = a * (1 - Math.abs((o % 2) - 1)),
        l = 0,
        s = 0,
        c = 0;
      o >= 0 && o < 1
        ? ((l = a), (s = i))
        : o >= 1 && o < 2
          ? ((l = i), (s = a))
          : o >= 2 && o < 3
            ? ((s = a), (c = i))
            : o >= 3 && o < 4
              ? ((s = i), (c = a))
              : o >= 4 && o < 5
                ? ((l = i), (c = a))
                : o >= 5 && o < 6 && ((l = a), (c = i));
      var d = r - a / 2,
        p = l + d,
        h = s + d,
        f = c + d;
      return n(p, h, f);
    }
    var yc = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "639",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32",
    };
    function wg(e) {
      if (typeof e != "string") return e;
      var t = e.toLowerCase();
      return yc[t] ? "#" + yc[t] : e;
    }
    var Ag = /^#[a-fA-F0-9]{6}$/,
      Tg = /^#[a-fA-F0-9]{8}$/,
      Cg = /^#[a-fA-F0-9]{3}$/,
      kg = /^#[a-fA-F0-9]{4}$/,
      ia = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
      Ig =
        /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,
      Og =
        /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
      Dg =
        /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
    function yn(e) {
      if (typeof e != "string") throw new Ke(3);
      var t = wg(e);
      if (t.match(Ag))
        return {
          red: parseInt("" + t[1] + t[2], 16),
          green: parseInt("" + t[3] + t[4], 16),
          blue: parseInt("" + t[5] + t[6], 16),
        };
      if (t.match(Tg)) {
        var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + t[1] + t[2], 16),
          green: parseInt("" + t[3] + t[4], 16),
          blue: parseInt("" + t[5] + t[6], 16),
          alpha: r,
        };
      }
      if (t.match(Cg))
        return {
          red: parseInt("" + t[1] + t[1], 16),
          green: parseInt("" + t[2] + t[2], 16),
          blue: parseInt("" + t[3] + t[3], 16),
        };
      if (t.match(kg)) {
        var n = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + t[1] + t[1], 16),
          green: parseInt("" + t[2] + t[2], 16),
          blue: parseInt("" + t[3] + t[3], 16),
          alpha: n,
        };
      }
      var o = ia.exec(t);
      if (o) return { red: parseInt("" + o[1], 10), green: parseInt("" + o[2], 10), blue: parseInt("" + o[3], 10) };
      var a = Ig.exec(t.substring(0, 50));
      if (a)
        return {
          red: parseInt("" + a[1], 10),
          green: parseInt("" + a[2], 10),
          blue: parseInt("" + a[3], 10),
          alpha: parseFloat("" + a[4]) > 1 ? parseFloat("" + a[4]) / 100 : parseFloat("" + a[4]),
        };
      var i = Og.exec(t);
      if (i) {
        var l = parseInt("" + i[1], 10),
          s = parseInt("" + i[2], 10) / 100,
          c = parseInt("" + i[3], 10) / 100,
          d = "rgb(" + Ar(l, s, c) + ")",
          p = ia.exec(d);
        if (!p) throw new Ke(4, t, d);
        return { red: parseInt("" + p[1], 10), green: parseInt("" + p[2], 10), blue: parseInt("" + p[3], 10) };
      }
      var h = Dg.exec(t.substring(0, 50));
      if (h) {
        var f = parseInt("" + h[1], 10),
          b = parseInt("" + h[2], 10) / 100,
          g = parseInt("" + h[3], 10) / 100,
          x = "rgb(" + Ar(f, b, g) + ")",
          S = ia.exec(x);
        if (!S) throw new Ke(4, t, x);
        return {
          red: parseInt("" + S[1], 10),
          green: parseInt("" + S[2], 10),
          blue: parseInt("" + S[3], 10),
          alpha: parseFloat("" + h[4]) > 1 ? parseFloat("" + h[4]) / 100 : parseFloat("" + h[4]),
        };
      }
      throw new Ke(5);
    }
    function Rg(e) {
      var t = e.red / 255,
        r = e.green / 255,
        n = e.blue / 255,
        o = Math.max(t, r, n),
        a = Math.min(t, r, n),
        i = (o + a) / 2;
      if (o === a)
        return e.alpha !== void 0
          ? { hue: 0, saturation: 0, lightness: i, alpha: e.alpha }
          : { hue: 0, saturation: 0, lightness: i };
      var l,
        s = o - a,
        c = i > 0.5 ? s / (2 - o - a) : s / (o + a);
      switch (o) {
        case t:
          l = (r - n) / s + (r < n ? 6 : 0);
          break;
        case r:
          l = (n - t) / s + 2;
          break;
        default:
          l = (t - r) / s + 4;
          break;
      }
      return (
        (l *= 60),
        e.alpha !== void 0
          ? { hue: l, saturation: c, lightness: i, alpha: e.alpha }
          : { hue: l, saturation: c, lightness: i }
      );
    }
    function Kc(e) {
      return Rg(yn(e));
    }
    var _g = function (e) {
        return e.length === 7 && e[1] === e[2] && e[3] === e[4] && e[5] === e[6] ? "#" + e[1] + e[3] + e[5] : e;
      },
      Ea = _g;
    function Dt(e) {
      var t = e.toString(16);
      return t.length === 1 ? "0" + t : t;
    }
    function sa(e) {
      return Dt(Math.round(e * 255));
    }
    function Pg(e, t, r) {
      return Ea("#" + sa(e) + sa(t) + sa(r));
    }
    function mn(e, t, r) {
      return Ar(e, t, r, Pg);
    }
    function Fg(e, t, r) {
      if (typeof e == "number" && typeof t == "number" && typeof r == "number") return mn(e, t, r);
      if (typeof e == "object" && t === void 0 && r === void 0) return mn(e.hue, e.saturation, e.lightness);
      throw new Ke(1);
    }
    function Ng(e, t, r, n) {
      if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number")
        return n >= 1 ? mn(e, t, r) : "rgba(" + Ar(e, t, r) + "," + n + ")";
      if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
        return e.alpha >= 1
          ? mn(e.hue, e.saturation, e.lightness)
          : "rgba(" + Ar(e.hue, e.saturation, e.lightness) + "," + e.alpha + ")";
      throw new Ke(2);
    }
    function va(e, t, r) {
      if (typeof e == "number" && typeof t == "number" && typeof r == "number") return Ea("#" + Dt(e) + Dt(t) + Dt(r));
      if (typeof e == "object" && t === void 0 && r === void 0) return Ea("#" + Dt(e.red) + Dt(e.green) + Dt(e.blue));
      throw new Ke(6);
    }
    function rt(e, t, r, n) {
      if (typeof e == "string" && typeof t == "number") {
        var o = yn(e);
        return "rgba(" + o.red + "," + o.green + "," + o.blue + "," + t + ")";
      } else {
        if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number")
          return n >= 1 ? va(e, t, r) : "rgba(" + e + "," + t + "," + r + "," + n + ")";
        if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
          return e.alpha >= 1
            ? va(e.red, e.green, e.blue)
            : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
      }
      throw new Ke(7);
    }
    var Bg = function (e) {
        return (
          typeof e.red == "number" &&
          typeof e.green == "number" &&
          typeof e.blue == "number" &&
          (typeof e.alpha != "number" || typeof e.alpha > "u")
        );
      },
      jg = function (e) {
        return (
          typeof e.red == "number" &&
          typeof e.green == "number" &&
          typeof e.blue == "number" &&
          typeof e.alpha == "number"
        );
      },
      Lg = function (e) {
        return (
          typeof e.hue == "number" &&
          typeof e.saturation == "number" &&
          typeof e.lightness == "number" &&
          (typeof e.alpha != "number" || typeof e.alpha > "u")
        );
      },
      Mg = function (e) {
        return (
          typeof e.hue == "number" &&
          typeof e.saturation == "number" &&
          typeof e.lightness == "number" &&
          typeof e.alpha == "number"
        );
      };
    function Yc(e) {
      if (typeof e != "object") throw new Ke(8);
      if (jg(e)) return rt(e);
      if (Bg(e)) return va(e);
      if (Mg(e)) return Ng(e);
      if (Lg(e)) return Fg(e);
      throw new Ke(8);
    }
    function Xc(e, t, r) {
      return function () {
        var n = r.concat(Array.prototype.slice.call(arguments));
        return n.length >= t ? e.apply(this, n) : Xc(e, t, n);
      };
    }
    function gn(e) {
      return Xc(e, e.length, []);
    }
    function bn(e, t, r) {
      return Math.max(e, Math.min(t, r));
    }
    function Ug(e, t) {
      if (t === "transparent") return t;
      var r = Kc(t);
      return Yc(Qt({}, r, { lightness: bn(0, 1, r.lightness - parseFloat(e)) }));
    }
    var $g = gn(Ug),
      We = $g;
    function qg(e, t) {
      if (t === "transparent") return t;
      var r = Kc(t);
      return Yc(Qt({}, r, { lightness: bn(0, 1, r.lightness + parseFloat(e)) }));
    }
    var Vg = gn(qg),
      Rt = Vg;
    function Jg(e, t) {
      if (t === "transparent") return t;
      var r = yn(t),
        n = typeof r.alpha == "number" ? r.alpha : 1,
        o = Qt({}, r, { alpha: bn(0, 1, (n * 100 + parseFloat(e) * 100) / 100) });
      return rt(o);
    }
    var zg = gn(Jg),
      cn = zg;
    function Hg(e, t) {
      if (t === "transparent") return t;
      var r = yn(t),
        n = typeof r.alpha == "number" ? r.alpha : 1,
        o = Qt({}, r, { alpha: bn(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100) });
      return rt(o);
    }
    var Gg = gn(Hg),
      se = Gg,
      Wg = R.div(Ut, ({ theme: e }) => ({
        backgroundColor: e.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)",
        borderRadius: e.appBorderRadius,
        border: `1px dashed ${e.appBorderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        margin: "25px 0 40px",
        color: se(0.3, e.color.defaultText),
        fontSize: e.typography.size.s2,
      })),
      Qc = (e) => m.createElement(Wg, { ...e, className: "docblock-emptyblock sb-unstyled" }),
      Kg = R(Rr)(({ theme: e }) => ({
        fontSize: `${e.typography.size.s2 - 1}px`,
        lineHeight: "19px",
        margin: "25px 0 40px",
        borderRadius: e.appBorderRadius,
        boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        "pre.prismjs": { padding: 20, background: "inherit" },
      })),
      Yg = R.div(({ theme: e }) => ({
        background: e.background.content,
        borderRadius: e.appBorderRadius,
        border: `1px solid ${e.appBorderColor}`,
        boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        margin: "25px 0 40px",
        padding: "20px 20px 20px 22px",
      })),
      dn = R.div(({ theme: e }) => ({
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
        background: e.appBorderColor,
        height: 17,
        marginTop: 1,
        width: "60%",
        [`&:first-child${Oi}`]: { margin: 0 },
      })),
      Xg = () =>
        m.createElement(
          Yg,
          null,
          m.createElement(dn, null),
          m.createElement(dn, { style: { width: "80%" } }),
          m.createElement(dn, { style: { width: "30%" } }),
          m.createElement(dn, { style: { width: "80%" } })
        ),
      Qg = ({ isLoading: e, error: t, language: r, code: n, dark: o, format: a = !1, ...i }) => {
        let { typography: l } = Xn();
        if (e) return m.createElement(Xg, null);
        if (t) return m.createElement(Qc, null, t);
        let s = m.createElement(
          Kg,
          { bordered: !0, copyable: !0, format: a, language: r, className: "docblock-source sb-unstyled", ...i },
          n
        );
        if (typeof o > "u") return s;
        let c = o ? Yn.dark : Yn.light;
        return m.createElement(ki, { theme: Ii({ ...c, fontCode: l.fonts.mono, fontBase: l.fonts.base }) }, s);
      },
      he = (e) => `& :where(${e}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${e}))`,
      Ca = 600;
    R.h1(Ut, ({ theme: e }) => ({
      color: e.color.defaultText,
      fontSize: e.typography.size.m3,
      fontWeight: e.typography.weight.bold,
      lineHeight: "32px",
      [`@media (min-width: ${Ca}px)`]: { fontSize: e.typography.size.l1, lineHeight: "36px", marginBottom: "16px" },
    }));
    R.h2(Ut, ({ theme: e }) => ({
      fontWeight: e.typography.weight.regular,
      fontSize: e.typography.size.s3,
      lineHeight: "20px",
      borderBottom: "none",
      marginBottom: 15,
      [`@media (min-width: ${Ca}px)`]: { fontSize: e.typography.size.m1, lineHeight: "28px", marginBottom: 24 },
      color: se(0.25, e.color.defaultText),
    }));
    R.div(({ theme: e }) => {
      let t = {
          fontFamily: e.typography.fonts.base,
          fontSize: e.typography.size.s3,
          margin: 0,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
          WebkitOverflowScrolling: "touch",
        },
        r = {
          margin: "20px 0 8px",
          padding: 0,
          cursor: "text",
          position: "relative",
          color: e.color.defaultText,
          "&:first-of-type": { marginTop: 0, paddingTop: 0 },
          "&:hover a.anchor": { textDecoration: "none" },
          "& code": { fontSize: "inherit" },
        },
        n = {
          lineHeight: 1,
          margin: "0 2px",
          padding: "3px 5px",
          whiteSpace: "nowrap",
          borderRadius: 3,
          fontSize: e.typography.size.s2 - 1,
          border: e.base === "light" ? `1px solid ${e.color.mediumlight}` : `1px solid ${e.color.darker}`,
          color: e.base === "light" ? se(0.1, e.color.defaultText) : se(0.3, e.color.defaultText),
          backgroundColor: e.base === "light" ? e.color.lighter : e.color.border,
        };
      return {
        maxWidth: 1e3,
        width: "100%",
        [he("a")]: {
          ...t,
          fontSize: "inherit",
          lineHeight: "24px",
          color: e.color.secondary,
          textDecoration: "none",
          "&.absent": { color: "#cc0000" },
          "&.anchor": {
            display: "block",
            paddingLeft: 30,
            marginLeft: -30,
            cursor: "pointer",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
          },
        },
        [he("blockquote")]: {
          ...t,
          margin: "16px 0",
          borderLeft: `4px solid ${e.color.medium}`,
          padding: "0 15px",
          color: e.color.dark,
          "& > :first-of-type": { marginTop: 0 },
          "& > :last-child": { marginBottom: 0 },
        },
        [he("div")]: t,
        [he("dl")]: {
          ...t,
          margin: "16px 0",
          padding: 0,
          "& dt": { fontSize: "14px", fontWeight: "bold", fontStyle: "italic", padding: 0, margin: "16px 0 4px" },
          "& dt:first-of-type": { padding: 0 },
          "& dt > :first-of-type": { marginTop: 0 },
          "& dt > :last-child": { marginBottom: 0 },
          "& dd": { margin: "0 0 16px", padding: "0 15px" },
          "& dd > :first-of-type": { marginTop: 0 },
          "& dd > :last-child": { marginBottom: 0 },
        },
        [he("h1")]: { ...t, ...r, fontSize: `${e.typography.size.l1}px`, fontWeight: e.typography.weight.bold },
        [he("h2")]: {
          ...t,
          ...r,
          fontSize: `${e.typography.size.m2}px`,
          paddingBottom: 4,
          borderBottom: `1px solid ${e.appBorderColor}`,
        },
        [he("h3")]: { ...t, ...r, fontSize: `${e.typography.size.m1}px`, fontWeight: e.typography.weight.bold },
        [he("h4")]: { ...t, ...r, fontSize: `${e.typography.size.s3}px` },
        [he("h5")]: { ...t, ...r, fontSize: `${e.typography.size.s2}px` },
        [he("h6")]: { ...t, ...r, fontSize: `${e.typography.size.s2}px`, color: e.color.dark },
        [he("hr")]: { border: "0 none", borderTop: `1px solid ${e.appBorderColor}`, height: 4, padding: 0 },
        [he("img")]: { maxWidth: "100%" },
        [he("li")]: {
          ...t,
          fontSize: e.typography.size.s2,
          color: e.color.defaultText,
          lineHeight: "24px",
          "& + li": { marginTop: ".25em" },
          "& ul, & ol": { marginTop: ".25em", marginBottom: 0 },
          "& code": n,
        },
        [he("ol")]: {
          ...t,
          margin: "16px 0",
          paddingLeft: 30,
          "& :first-of-type": { marginTop: 0 },
          "& :last-child": { marginBottom: 0 },
        },
        [he("p")]: {
          ...t,
          margin: "16px 0",
          fontSize: e.typography.size.s2,
          lineHeight: "24px",
          color: e.color.defaultText,
          "& code": n,
        },
        [he("pre")]: {
          ...t,
          fontFamily: e.typography.fonts.mono,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: "18px",
          padding: "11px 1rem",
          whiteSpace: "pre-wrap",
          color: "inherit",
          borderRadius: 3,
          margin: "1rem 0",
          "&:not(.prismjs)": { background: "transparent", border: "none", borderRadius: 0, padding: 0, margin: 0 },
          "& pre, &.prismjs": {
            padding: 15,
            margin: 0,
            whiteSpace: "pre-wrap",
            color: "inherit",
            fontSize: "13px",
            lineHeight: "19px",
            code: { color: "inherit", fontSize: "inherit" },
          },
          "& code": { whiteSpace: "pre" },
          "& code, & tt": { border: "none" },
        },
        [he("span")]: {
          ...t,
          "&.frame": {
            display: "block",
            overflow: "hidden",
            "& > span": {
              border: `1px solid ${e.color.medium}`,
              display: "block",
              float: "left",
              overflow: "hidden",
              margin: "13px 0 0",
              padding: 7,
              width: "auto",
            },
            "& span img": { display: "block", float: "left" },
            "& span span": { clear: "both", color: e.color.darkest, display: "block", padding: "5px 0 0" },
          },
          "&.align-center": {
            display: "block",
            overflow: "hidden",
            clear: "both",
            "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "center" },
            "& span img": { margin: "0 auto", textAlign: "center" },
          },
          "&.align-right": {
            display: "block",
            overflow: "hidden",
            clear: "both",
            "& > span": { display: "block", overflow: "hidden", margin: "13px 0 0", textAlign: "right" },
            "& span img": { margin: 0, textAlign: "right" },
          },
          "&.float-left": {
            display: "block",
            marginRight: 13,
            overflow: "hidden",
            float: "left",
            "& span": { margin: "13px 0 0" },
          },
          "&.float-right": {
            display: "block",
            marginLeft: 13,
            overflow: "hidden",
            float: "right",
            "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "right" },
          },
        },
        [he("table")]: {
          ...t,
          margin: "16px 0",
          fontSize: e.typography.size.s2,
          lineHeight: "24px",
          padding: 0,
          borderCollapse: "collapse",
          "& tr": {
            borderTop: `1px solid ${e.appBorderColor}`,
            backgroundColor: e.appContentBg,
            margin: 0,
            padding: 0,
          },
          "& tr:nth-of-type(2n)": { backgroundColor: e.base === "dark" ? e.color.darker : e.color.lighter },
          "& tr th": {
            fontWeight: "bold",
            color: e.color.defaultText,
            border: `1px solid ${e.appBorderColor}`,
            margin: 0,
            padding: "6px 13px",
          },
          "& tr td": {
            border: `1px solid ${e.appBorderColor}`,
            color: e.color.defaultText,
            margin: 0,
            padding: "6px 13px",
          },
          "& tr th :first-of-type, & tr td :first-of-type": { marginTop: 0 },
          "& tr th :last-child, & tr td :last-child": { marginBottom: 0 },
        },
        [he("ul")]: {
          ...t,
          margin: "16px 0",
          paddingLeft: 30,
          "& :first-of-type": { marginTop: 0 },
          "& :last-child": { marginBottom: 0 },
          listStyle: "disc",
        },
      };
    });
    R.div(({ theme: e }) => ({
      background: e.background.content,
      display: "flex",
      justifyContent: "center",
      padding: "4rem 20px",
      minHeight: "100vh",
      boxSizing: "border-box",
      gap: "3rem",
      [`@media (min-width: ${Ca}px)`]: {},
    }));
    var En = (e) => ({
        borderRadius: e.appBorderRadius,
        background: e.background.content,
        boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        border: `1px solid ${e.appBorderColor}`,
      }),
      Zg = ur({ scale: 1 });
    R.strong(({ theme: e }) => ({ color: e.color.orange }));
    var e0 = R(Nn)({ position: "absolute", left: 0, right: 0, top: 0, transition: "transform .2s linear" }),
      t0 = R.div({ display: "flex", alignItems: "center", gap: 4 }),
      r0 = R.div(({ theme: e }) => ({
        width: 14,
        height: 14,
        borderRadius: 2,
        margin: "0 7px",
        backgroundColor: e.appBorderColor,
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
      })),
      n0 = ({ isLoading: e, storyId: t, baseUrl: r, zoom: n, resetZoom: o, ...a }) =>
        m.createElement(
          e0,
          { ...a },
          m.createElement(
            t0,
            { key: "left" },
            e
              ? [1, 2, 3].map((i) => m.createElement(r0, { key: i }))
              : m.createElement(
                  m.Fragment,
                  null,
                  m.createElement(
                    ze,
                    {
                      key: "zoomin",
                      onClick: (i) => {
                        i.preventDefault(), n(0.8);
                      },
                      title: "Zoom in",
                    },
                    m.createElement(qi, null)
                  ),
                  m.createElement(
                    ze,
                    {
                      key: "zoomout",
                      onClick: (i) => {
                        i.preventDefault(), n(1.25);
                      },
                      title: "Zoom out",
                    },
                    m.createElement(Vi, null)
                  ),
                  m.createElement(
                    ze,
                    {
                      key: "zoomreset",
                      onClick: (i) => {
                        i.preventDefault(), o();
                      },
                      title: "Reset zoom",
                    },
                    m.createElement(Ji, null)
                  )
                )
          )
        ),
      o0 = R.div(
        ({ isColumn: e, columns: t, layout: r }) => ({
          display: e || !t ? "block" : "flex",
          position: "relative",
          flexWrap: "wrap",
          overflow: "auto",
          flexDirection: e ? "column" : "row",
          "& .innerZoomElementWrapper > *": e
            ? { width: r !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "block" }
            : { maxWidth: r !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "inline-block" },
        }),
        ({ layout: e = "padded" }) =>
          e === "centered" || e === "padded"
            ? {
                padding: "30px 20px",
                "& .innerZoomElementWrapper > *": { width: "auto", border: "10px solid transparent!important" },
              }
            : {},
        ({ layout: e = "padded" }) =>
          e === "centered"
            ? {
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
              }
            : {},
        ({ columns: e }) =>
          e && e > 1 ? { ".innerZoomElementWrapper > *": { minWidth: `calc(100% / ${e} - 20px)` } } : {}
      ),
      gc = R(Qg)(({ theme: e }) => ({
        margin: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: e.appBorderRadius,
        borderBottomRightRadius: e.appBorderRadius,
        border: "none",
        background: e.base === "light" ? "rgba(0, 0, 0, 0.85)" : We(0.05, e.background.content),
        color: e.color.lightest,
        button: { background: e.base === "light" ? "rgba(0, 0, 0, 0.85)" : We(0.05, e.background.content) },
      })),
      a0 = R.div(
        ({ theme: e, withSource: t, isExpanded: r }) => ({
          position: "relative",
          overflow: "hidden",
          margin: "25px 0 40px",
          ...En(e),
          borderBottomLeftRadius: t && r && 0,
          borderBottomRightRadius: t && r && 0,
          borderBottomWidth: r && 0,
          "h3 + &": { marginTop: "16px" },
        }),
        ({ withToolbar: e }) => e && { paddingTop: 40 }
      ),
      i0 = (e, t, r) => {
        switch (!0) {
          case !!(e && e.error):
            return {
              source: null,
              actionItem: {
                title: "No code available",
                className: "docblock-code-toggle docblock-code-toggle--disabled",
                disabled: !0,
                onClick: () => r(!1),
              },
            };
          case t:
            return {
              source: m.createElement(gc, { ...e, dark: !0 }),
              actionItem: {
                title: "Hide code",
                className: "docblock-code-toggle docblock-code-toggle--expanded",
                onClick: () => r(!1),
              },
            };
          default:
            return {
              source: m.createElement(gc, { ...e, dark: !0 }),
              actionItem: { title: "Show code", className: "docblock-code-toggle", onClick: () => r(!0) },
            };
        }
      };
    function s0(e) {
      if (Ya.count(e) === 1) {
        let t = e;
        if (t.props) return t.props.id;
      }
      return null;
    }
    var l0 = R(n0)({ position: "absolute", top: 0, left: 0, right: 0, height: 40 }),
      u0 = R.div({ overflow: "hidden", position: "relative" }),
      c0 = ({
        isLoading: e,
        isColumn: t,
        columns: r,
        children: n,
        withSource: o,
        withToolbar: a = !1,
        isExpanded: i = !1,
        additionalActions: l,
        className: s,
        layout: c = "padded",
        ...d
      }) => {
        let [p, h] = X(i),
          { source: f, actionItem: b } = i0(o, p, h),
          [g, x] = X(1),
          S = [s].concat(["sbdocs", "sbdocs-preview", "sb-unstyled"]),
          A = o ? [b] : [],
          [k, T] = X(l ? [...l] : []),
          I = [...A, ...k],
          { window: D } = globalThis,
          F = xe(async (L) => {
            let { createCopyToClipboardFunction: B } = await Promise.resolve().then(() => (_r(), ti));
            B();
          }, []),
          P = (L) => {
            let B = D.getSelection();
            (B && B.type === "Range") ||
              (L.preventDefault(),
              k.filter((G) => G.title === "Copied").length === 0 &&
                F(f.props.code).then(() => {
                  T([...k, { title: "Copied", onClick: () => {} }]),
                    D.setTimeout(() => T(k.filter((G) => G.title !== "Copied")), 1500);
                }));
          };
        return m.createElement(
          a0,
          { withSource: o, withToolbar: a, ...d, className: S.join(" ") },
          a &&
            m.createElement(l0, {
              isLoading: e,
              border: !0,
              zoom: (L) => x(g * L),
              resetZoom: () => x(1),
              storyId: s0(n),
              baseUrl: "./iframe.html",
            }),
          m.createElement(
            Zg.Provider,
            { value: { scale: g } },
            m.createElement(
              u0,
              { className: "docs-story", onCopyCapture: o && P },
              m.createElement(
                o0,
                { isColumn: t || !Array.isArray(n), columns: r, layout: c },
                m.createElement(
                  Un.Element,
                  { scale: g },
                  Array.isArray(n)
                    ? n.map((L, B) => m.createElement("div", { key: B }, L))
                    : m.createElement("div", null, n)
                )
              ),
              m.createElement(Dn, { actionItems: I })
            )
          ),
          o && p && f
        );
      };
    R(c0)(() => ({ ".docs-story": { paddingTop: 32, paddingBottom: 40 } }));
    function _t() {
      return (
        (_t = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        _t.apply(this, arguments)
      );
    }
    var d0 = ["children", "options"],
      bc,
      Ec;
    (function (e) {
      (e.blockQuote = "0"),
        (e.breakLine = "1"),
        (e.breakThematic = "2"),
        (e.codeBlock = "3"),
        (e.codeFenced = "4"),
        (e.codeInline = "5"),
        (e.footnote = "6"),
        (e.footnoteReference = "7"),
        (e.gfmTask = "8"),
        (e.heading = "9"),
        (e.headingSetext = "10"),
        (e.htmlBlock = "11"),
        (e.htmlComment = "12"),
        (e.htmlSelfClosing = "13"),
        (e.image = "14"),
        (e.link = "15"),
        (e.linkAngleBraceStyleDetector = "16"),
        (e.linkBareUrlDetector = "17"),
        (e.linkMailtoDetector = "18"),
        (e.newlineCoalescer = "19"),
        (e.orderedList = "20"),
        (e.paragraph = "21"),
        (e.ref = "22"),
        (e.refImage = "23"),
        (e.refLink = "24"),
        (e.table = "25"),
        (e.tableSeparator = "26"),
        (e.text = "27"),
        (e.textBolded = "28"),
        (e.textEmphasized = "29"),
        (e.textEscaped = "30"),
        (e.textMarked = "31"),
        (e.textStrikethroughed = "32"),
        (e.unorderedList = "33");
    })(bc || (bc = {})),
      (function (e) {
        (e[(e.MAX = 0)] = "MAX"),
          (e[(e.HIGH = 1)] = "HIGH"),
          (e[(e.MED = 2)] = "MED"),
          (e[(e.LOW = 3)] = "LOW"),
          (e[(e.MIN = 4)] = "MIN");
      })(Ec || (Ec = {}));
    var vc = [
        "allowFullScreen",
        "allowTransparency",
        "autoComplete",
        "autoFocus",
        "autoPlay",
        "cellPadding",
        "cellSpacing",
        "charSet",
        "className",
        "classId",
        "colSpan",
        "contentEditable",
        "contextMenu",
        "crossOrigin",
        "encType",
        "formAction",
        "formEncType",
        "formMethod",
        "formNoValidate",
        "formTarget",
        "frameBorder",
        "hrefLang",
        "inputMode",
        "keyParams",
        "keyType",
        "marginHeight",
        "marginWidth",
        "maxLength",
        "mediaGroup",
        "minLength",
        "noValidate",
        "radioGroup",
        "readOnly",
        "rowSpan",
        "spellCheck",
        "srcDoc",
        "srcLang",
        "srcSet",
        "tabIndex",
        "useMap",
      ].reduce((e, t) => ((e[t.toLowerCase()] = t), e), { for: "htmlFor" }),
      xc = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: "\xA0", quot: "\u201C" },
      p0 = ["style", "script"],
      f0 =
        /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,
      h0 = /mailto:/i,
      m0 = /\n{2,}$/,
      Zc = /^(\s*>[\s\S]*?)(?=\n{2,})/,
      y0 = /^ *> ?/gm,
      g0 = /^ {2,}\n/,
      b0 = /^(?:( *[-*_])){3,} *(?:\n *)+\n/,
      ed = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,
      td = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,
      E0 = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
      v0 = /^(?:\n *)*\n/,
      x0 = /\r\n?/g,
      S0 = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,
      w0 = /^\[\^([^\]]+)]/,
      A0 = /\f/g,
      T0 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,
      C0 = /^\s*?\[(x|\s)\]/,
      rd = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
      nd = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
      od = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,
      xa =
        /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,
      k0 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
      ad = /^<!--[\s\S]*?(?:-->)/,
      I0 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/,
      Sa = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,
      O0 = /^\{.*\}$/,
      D0 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
      R0 = /^<([^ >]+@[^ >]+)>/,
      _0 = /^<([^ >]+:\/[^ >]+)>/,
      P0 = /-([a-z])?/gi,
      id = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,
      F0 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,
      N0 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/,
      B0 = /^\[([^\]]*)\] ?\[([^\]]*)\]/,
      j0 = /(\[|\])/g,
      L0 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,
      M0 = /\t/g,
      U0 = /^ *\| */,
      $0 = /(^ *\||\| *$)/g,
      q0 = / *$/,
      V0 = /^ *:-+: *$/,
      J0 = /^ *:-+ *$/,
      z0 = /^ *-+: *$/,
      vn = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)",
      H0 = new RegExp(`^([*_])\\1${vn}\\1\\1(?!\\1)`),
      G0 = new RegExp(`^([*_])${vn}\\1(?!\\1|\\w)`),
      W0 = new RegExp(`^==${vn}==`),
      K0 = new RegExp(`^~~${vn}~~`),
      Y0 = /^\\([^0-9A-Za-z\s])/,
      X0 = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,
      Q0 = /^\n+/,
      Z0 = /^([ \t]*)/,
      e2 = /\\([^\\])/g,
      Sc = / *\n+$/,
      t2 = /(?:^|\n)( *)$/,
      ka = "(?:\\d+\\.)",
      Ia = "(?:[*+-])";
    function sd(e) {
      return "( *)(" + (e === 1 ? ka : Ia) + ") +";
    }
    var ld = sd(1),
      ud = sd(2);
    function cd(e) {
      return new RegExp("^" + (e === 1 ? ld : ud));
    }
    var r2 = cd(1),
      n2 = cd(2);
    function dd(e) {
      return new RegExp(
        "^" + (e === 1 ? ld : ud) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? ka : Ia) + " )[^\\n]*)*(\\n|$)",
        "gm"
      );
    }
    var pd = dd(1),
      fd = dd(2);
    function hd(e) {
      let t = e === 1 ? ka : Ia;
      return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
    }
    var md = hd(1),
      yd = hd(2);
    function wc(e, t) {
      let r = t === 1,
        n = r ? md : yd,
        o = r ? pd : fd,
        a = r ? r2 : n2;
      return {
        match(i, l, s) {
          let c = t2.exec(s);
          return c && (l.list || (!l.inline && !l.simple)) ? n.exec((i = c[1] + i)) : null;
        },
        order: 1,
        parse(i, l, s) {
          let c = r ? +i[2] : void 0,
            d = i[0]
              .replace(
                m0,
                `
`
              )
              .match(o),
            p = !1;
          return {
            items: d.map(function (h, f) {
              let b = a.exec(h)[0].length,
                g = new RegExp("^ {1," + b + "}", "gm"),
                x = h.replace(g, "").replace(a, ""),
                S = f === d.length - 1,
                A =
                  x.indexOf(`

`) !== -1 ||
                  (S && p);
              p = A;
              let k = s.inline,
                T = s.list,
                I;
              (s.list = !0),
                A
                  ? ((s.inline = !1),
                    (I = x.replace(
                      Sc,
                      `

`
                    )))
                  : ((s.inline = !0), (I = x.replace(Sc, "")));
              let D = l(I, s);
              return (s.inline = k), (s.list = T), D;
            }),
            ordered: r,
            start: c,
          };
        },
        render: (i, l, s) =>
          e(
            i.ordered ? "ol" : "ul",
            { key: s.key, start: i.type === "20" ? i.start : void 0 },
            i.items.map(function (c, d) {
              return e("li", { key: d }, l(c, s));
            })
          ),
      };
    }
    var o2 = new RegExp(
        `^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`
      ),
      a2 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,
      gd = [Zc, ed, td, rd, od, nd, ad, id, pd, md, fd, yd],
      i2 = [...gd, /^[^\n]+(?:  \n|\n{2,})/, xa, Sa];
    function s2(e) {
      return e
        .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a")
        .replace(/[çÇ]/g, "c")
        .replace(/[ðÐ]/g, "d")
        .replace(/[ÈÉÊËéèêë]/g, "e")
        .replace(/[ÏïÎîÍíÌì]/g, "i")
        .replace(/[Ññ]/g, "n")
        .replace(/[øØœŒÕõÔôÓóÒò]/g, "o")
        .replace(/[ÜüÛûÚúÙù]/g, "u")
        .replace(/[ŸÿÝý]/g, "y")
        .replace(/[^a-z0-9- ]/gi, "")
        .replace(/ /gi, "-")
        .toLowerCase();
    }
    function l2(e) {
      return z0.test(e) ? "right" : V0.test(e) ? "center" : J0.test(e) ? "left" : null;
    }
    function Ac(e, t, r) {
      let n = r.inTable;
      r.inTable = !0;
      let o = t(e.trim(), r);
      r.inTable = n;
      let a = [[]];
      return (
        o.forEach(function (i, l) {
          i.type === "26"
            ? l !== 0 && l !== o.length - 1 && a.push([])
            : (i.type !== "27" || (o[l + 1] != null && o[l + 1].type !== "26") || (i.text = i.text.replace(q0, "")),
              a[a.length - 1].push(i));
        }),
        a
      );
    }
    function u2(e, t, r) {
      r.inline = !0;
      let n = Ac(e[1], t, r),
        o = e[2].replace($0, "").split("|").map(l2),
        a = (function (i, l, s) {
          return i
            .trim()
            .split(
              `
`
            )
            .map(function (c) {
              return Ac(c, l, s);
            });
        })(e[3], t, r);
      return (r.inline = !1), { align: o, cells: a, header: n, type: "25" };
    }
    function Tc(e, t) {
      return e.align[t] == null ? {} : { textAlign: e.align[t] };
    }
    function yt(e) {
      return function (t, r) {
        return r.inline ? e.exec(t) : null;
      };
    }
    function gt(e) {
      return function (t, r) {
        return r.inline || r.simple ? e.exec(t) : null;
      };
    }
    function tt(e) {
      return function (t, r) {
        return r.inline || r.simple ? null : e.exec(t);
      };
    }
    function xr(e) {
      return function (t) {
        return e.exec(t);
      };
    }
    function c2(e, t, r) {
      if (
        t.inline ||
        t.simple ||
        (r &&
          !r.endsWith(`
`))
      )
        return null;
      let n = "";
      e.split(
        `
`
      ).every(
        (a) =>
          !gd.some((i) => i.test(a)) &&
          ((n +=
            a +
            `
`),
          a.trim())
      );
      let o = n.trimEnd();
      return o == "" ? null : [n, o];
    }
    function Yt(e) {
      try {
        if (
          decodeURIComponent(e)
            .replace(/[^A-Za-z0-9/:]/g, "")
            .match(/^\s*(javascript|vbscript|data(?!:image)):/i)
        )
          return;
      } catch {
        return null;
      }
      return e;
    }
    function Cc(e) {
      return e.replace(e2, "$1");
    }
    function hn(e, t, r) {
      let n = r.inline || !1,
        o = r.simple || !1;
      (r.inline = !0), (r.simple = !0);
      let a = e(t, r);
      return (r.inline = n), (r.simple = o), a;
    }
    function d2(e, t, r) {
      let n = r.inline || !1,
        o = r.simple || !1;
      (r.inline = !1), (r.simple = !0);
      let a = e(t, r);
      return (r.inline = n), (r.simple = o), a;
    }
    function p2(e, t, r) {
      return (r.inline = !1), e(t, r);
    }
    var la = (e, t, r) => ({ children: hn(t, e[1], r) });
    function ua() {
      return {};
    }
    function ca() {
      return null;
    }
    function f2(...e) {
      return e.filter(Boolean).join(" ");
    }
    function da(e, t, r) {
      let n = e,
        o = t.split(".");
      for (; o.length && ((n = n[o[0]]), n !== void 0); ) o.shift();
      return n || r;
    }
    function h2(e = "", t = {}) {
      (t.overrides = t.overrides || {}),
        (t.slugify = t.slugify || s2),
        (t.namedCodesToUnicode = t.namedCodesToUnicode ? _t({}, xc, t.namedCodesToUnicode) : xc);
      let r = t.createElement || On;
      function n(f, b, ...g) {
        let x = da(t.overrides, `${f}.props`, {});
        return r(
          (function (S, A) {
            let k = da(A, S);
            return k
              ? typeof k == "function" || (typeof k == "object" && "render" in k)
                ? k
                : da(A, `${S}.component`, S)
              : S;
          })(f, t.overrides),
          _t({}, b, x, { className: f2(b?.className, x.className) || void 0 }),
          ...g
        );
      }
      function o(f) {
        f = f.replace(T0, "");
        let b = !1;
        t.forceInline ? (b = !0) : t.forceBlock || (b = L0.test(f) === !1);
        let g = d(
          c(
            b
              ? f
              : `${f.trimEnd().replace(Q0, "")}

`,
            { inline: b }
          )
        );
        for (; typeof g[g.length - 1] == "string" && !g[g.length - 1].trim(); ) g.pop();
        if (t.wrapper === null) return g;
        let x = t.wrapper || (b ? "span" : "div"),
          S;
        if (g.length > 1 || t.forceWrapper) S = g;
        else {
          if (g.length === 1) return (S = g[0]), typeof S == "string" ? n("span", { key: "outer" }, S) : S;
          S = null;
        }
        return On(x, { key: "outer" }, S);
      }
      function a(f) {
        let b = f.match(f0);
        return b
          ? b.reduce(function (g, x, S) {
              let A = x.indexOf("=");
              if (A !== -1) {
                let k = (function (F) {
                    return (
                      F.indexOf("-") !== -1 &&
                        F.match(I0) === null &&
                        (F = F.replace(P0, function (P, L) {
                          return L.toUpperCase();
                        })),
                      F
                    );
                  })(x.slice(0, A)).trim(),
                  T = (function (F) {
                    let P = F[0];
                    return (P === '"' || P === "'") && F.length >= 2 && F[F.length - 1] === P ? F.slice(1, -1) : F;
                  })(x.slice(A + 1).trim()),
                  I = vc[k] || k,
                  D = (g[I] = (function (F, P) {
                    return F === "style"
                      ? P.split(/;\s?/).reduce(function (L, B) {
                          let G = B.slice(0, B.indexOf(":"));
                          return (
                            (L[G.trim().replace(/(-[a-z])/g, ($) => $[1].toUpperCase())] = B.slice(
                              G.length + 1
                            ).trim()),
                            L
                          );
                        }, {})
                      : F === "href" || F === "src"
                        ? Yt(P)
                        : (P.match(O0) && (P = P.slice(1, P.length - 1)), P === "true" || (P !== "false" && P));
                  })(k, T));
                typeof D == "string" && (xa.test(D) || Sa.test(D)) && (g[I] = ue(o(D.trim()), { key: S }));
              } else x !== "style" && (g[vc[x] || x] = !0);
              return g;
            }, {})
          : null;
      }
      let i = [],
        l = {},
        s = {
          0: {
            match: tt(Zc),
            order: 1,
            parse: (f, b, g) => ({ children: b(f[0].replace(y0, ""), g) }),
            render: (f, b, g) => n("blockquote", { key: g.key }, b(f.children, g)),
          },
          1: { match: xr(g0), order: 1, parse: ua, render: (f, b, g) => n("br", { key: g.key }) },
          2: { match: tt(b0), order: 1, parse: ua, render: (f, b, g) => n("hr", { key: g.key }) },
          3: {
            match: tt(td),
            order: 0,
            parse: (f) => ({ lang: void 0, text: f[0].replace(/^ {4}/gm, "").replace(/\n+$/, "") }),
            render: (f, b, g) =>
              n(
                "pre",
                { key: g.key },
                n("code", _t({}, f.attrs, { className: f.lang ? `lang-${f.lang}` : "" }), f.text)
              ),
          },
          4: {
            match: tt(ed),
            order: 0,
            parse: (f) => ({ attrs: a(f[3] || ""), lang: f[2] || void 0, text: f[4], type: "3" }),
          },
          5: {
            match: gt(E0),
            order: 3,
            parse: (f) => ({ text: f[2] }),
            render: (f, b, g) => n("code", { key: g.key }, f.text),
          },
          6: { match: tt(S0), order: 0, parse: (f) => (i.push({ footnote: f[2], identifier: f[1] }), {}), render: ca },
          7: {
            match: yt(w0),
            order: 1,
            parse: (f) => ({ target: `#${t.slugify(f[1])}`, text: f[1] }),
            render: (f, b, g) => n("a", { key: g.key, href: Yt(f.target) }, n("sup", { key: g.key }, f.text)),
          },
          8: {
            match: yt(C0),
            order: 1,
            parse: (f) => ({ completed: f[1].toLowerCase() === "x" }),
            render: (f, b, g) => n("input", { checked: f.completed, key: g.key, readOnly: !0, type: "checkbox" }),
          },
          9: {
            match: tt(t.enforceAtxHeadings ? nd : rd),
            order: 1,
            parse: (f, b, g) => ({ children: hn(b, f[2], g), id: t.slugify(f[2]), level: f[1].length }),
            render: (f, b, g) => n(`h${f.level}`, { id: f.id, key: g.key }, b(f.children, g)),
          },
          10: {
            match: tt(od),
            order: 0,
            parse: (f, b, g) => ({ children: hn(b, f[1], g), level: f[2] === "=" ? 1 : 2, type: "9" }),
          },
          11: {
            match: xr(xa),
            order: 1,
            parse(f, b, g) {
              let [, x] = f[3].match(Z0),
                S = new RegExp(`^${x}`, "gm"),
                A = f[3].replace(S, ""),
                k = ((T = A), i2.some((P) => P.test(T)) ? p2 : hn);
              var T;
              let I = f[1].toLowerCase(),
                D = p0.indexOf(I) !== -1,
                F = { attrs: a(f[2]), noInnerParse: D, tag: (D ? I : f[1]).trim() };
              return (
                (g.inAnchor = g.inAnchor || I === "a"),
                D ? (F.text = f[3]) : (F.children = k(b, A, g)),
                (g.inAnchor = !1),
                F
              );
            },
            render: (f, b, g) => n(f.tag, _t({ key: g.key }, f.attrs), f.text || b(f.children, g)),
          },
          13: {
            match: xr(Sa),
            order: 1,
            parse: (f) => ({ attrs: a(f[2] || ""), tag: f[1].trim() }),
            render: (f, b, g) => n(f.tag, _t({}, f.attrs, { key: g.key })),
          },
          12: { match: xr(ad), order: 1, parse: () => ({}), render: ca },
          14: {
            match: gt(a2),
            order: 1,
            parse: (f) => ({ alt: f[1], target: Cc(f[2]), title: f[3] }),
            render: (f, b, g) =>
              n("img", { key: g.key, alt: f.alt || void 0, title: f.title || void 0, src: Yt(f.target) }),
          },
          15: {
            match: yt(o2),
            order: 3,
            parse: (f, b, g) => ({ children: d2(b, f[1], g), target: Cc(f[2]), title: f[3] }),
            render: (f, b, g) => n("a", { key: g.key, href: Yt(f.target), title: f.title }, b(f.children, g)),
          },
          16: {
            match: yt(_0),
            order: 0,
            parse: (f) => ({ children: [{ text: f[1], type: "27" }], target: f[1], type: "15" }),
          },
          17: {
            match: (f, b) => (b.inAnchor ? null : yt(D0)(f, b)),
            order: 0,
            parse: (f) => ({ children: [{ text: f[1], type: "27" }], target: f[1], title: void 0, type: "15" }),
          },
          18: {
            match: yt(R0),
            order: 0,
            parse(f) {
              let b = f[1],
                g = f[1];
              return (
                h0.test(g) || (g = "mailto:" + g),
                { children: [{ text: b.replace("mailto:", ""), type: "27" }], target: g, type: "15" }
              );
            },
          },
          20: wc(n, 1),
          33: wc(n, 2),
          19: {
            match: tt(v0),
            order: 3,
            parse: ua,
            render: () => `
`,
          },
          21: { match: c2, order: 3, parse: la, render: (f, b, g) => n("p", { key: g.key }, b(f.children, g)) },
          22: { match: yt(F0), order: 0, parse: (f) => ((l[f[1]] = { target: f[2], title: f[4] }), {}), render: ca },
          23: {
            match: gt(N0),
            order: 0,
            parse: (f) => ({ alt: f[1] || void 0, ref: f[2] }),
            render: (f, b, g) =>
              l[f.ref] ? n("img", { key: g.key, alt: f.alt, src: Yt(l[f.ref].target), title: l[f.ref].title }) : null,
          },
          24: {
            match: yt(B0),
            order: 0,
            parse: (f, b, g) => ({ children: b(f[1], g), fallbackChildren: b(f[0].replace(j0, "\\$1"), g), ref: f[2] }),
            render: (f, b, g) =>
              l[f.ref]
                ? n("a", { key: g.key, href: Yt(l[f.ref].target), title: l[f.ref].title }, b(f.children, g))
                : n("span", { key: g.key }, b(f.fallbackChildren, g)),
          },
          25: {
            match: tt(id),
            order: 1,
            parse: u2,
            render: (f, b, g) =>
              n(
                "table",
                { key: g.key },
                n(
                  "thead",
                  null,
                  n(
                    "tr",
                    null,
                    f.header.map(function (x, S) {
                      return n("th", { key: S, style: Tc(f, S) }, b(x, g));
                    })
                  )
                ),
                n(
                  "tbody",
                  null,
                  f.cells.map(function (x, S) {
                    return n(
                      "tr",
                      { key: S },
                      x.map(function (A, k) {
                        return n("td", { key: k, style: Tc(f, k) }, b(A, g));
                      })
                    );
                  })
                )
              ),
          },
          26: {
            match: function (f, b) {
              return b.inTable ? ((b.inline = !0), U0.exec(f)) : null;
            },
            order: 1,
            parse: function () {
              return { type: "26" };
            },
            render: () => " | ",
          },
          27: {
            match: xr(X0),
            order: 4,
            parse: (f) => ({
              text: f[0].replace(k0, (b, g) => (t.namedCodesToUnicode[g] ? t.namedCodesToUnicode[g] : b)),
            }),
            render: (f) => f.text,
          },
          28: {
            match: gt(H0),
            order: 2,
            parse: (f, b, g) => ({ children: b(f[2], g) }),
            render: (f, b, g) => n("strong", { key: g.key }, b(f.children, g)),
          },
          29: {
            match: gt(G0),
            order: 3,
            parse: (f, b, g) => ({ children: b(f[2], g) }),
            render: (f, b, g) => n("em", { key: g.key }, b(f.children, g)),
          },
          30: { match: gt(Y0), order: 1, parse: (f) => ({ text: f[1], type: "27" }) },
          31: { match: gt(W0), order: 3, parse: la, render: (f, b, g) => n("mark", { key: g.key }, b(f.children, g)) },
          32: { match: gt(K0), order: 3, parse: la, render: (f, b, g) => n("del", { key: g.key }, b(f.children, g)) },
        };
      t.disableParsingRawHTML === !0 && (delete s[11], delete s[13]);
      let c = (function (f) {
          let b = Object.keys(f);
          function g(x, S) {
            let A = [],
              k = "";
            for (; x; ) {
              let T = 0;
              for (; T < b.length; ) {
                let I = b[T],
                  D = f[I],
                  F = D.match(x, S, k);
                if (F) {
                  let P = F[0];
                  x = x.substring(P.length);
                  let L = D.parse(F, g, S);
                  L.type == null && (L.type = I), A.push(L), (k = P);
                  break;
                }
                T++;
              }
            }
            return A;
          }
          return (
            b.sort(function (x, S) {
              let A = f[x].order,
                k = f[S].order;
              return A !== k ? A - k : x < S ? -1 : 1;
            }),
            function (x, S) {
              return g(
                (function (A) {
                  return A.replace(
                    x0,
                    `
`
                  )
                    .replace(A0, "")
                    .replace(M0, "    ");
                })(x),
                S
              );
            }
          );
        })(s),
        d =
          ((p = (function (f, b) {
            return function (g, x, S) {
              let A = f[g.type].render;
              return b ? b(() => A(g, x, S), g, x, S) : A(g, x, S);
            };
          })(s, t.renderRule)),
          function f(b, g = {}) {
            if (Array.isArray(b)) {
              let x = g.key,
                S = [],
                A = !1;
              for (let k = 0; k < b.length; k++) {
                g.key = k;
                let T = f(b[k], g),
                  I = typeof T == "string";
                I && A ? (S[S.length - 1] += T) : T !== null && S.push(T), (A = I);
              }
              return (g.key = x), S;
            }
            return p(b, f, g);
          });
      var p;
      let h = o(e);
      return i.length
        ? n(
            "div",
            null,
            h,
            n(
              "footer",
              { key: "footer" },
              i.map(function (f) {
                return n(
                  "div",
                  { id: t.slugify(f.identifier), key: f.identifier },
                  f.identifier,
                  d(c(f.footnote, { inline: !0 }))
                );
              })
            )
          )
        : h;
    }
    var m2 = (e) => {
        let { children: t = "", options: r } = e,
          n = (function (o, a) {
            if (o == null) return {};
            var i,
              l,
              s = {},
              c = Object.keys(o);
            for (l = 0; l < c.length; l++) a.indexOf((i = c[l])) >= 0 || (s[i] = o[i]);
            return s;
          })(e, d0);
        return ue(h2(t, r), n);
      },
      y2 = R.label(({ theme: e }) => ({
        lineHeight: "18px",
        alignItems: "center",
        marginBottom: 8,
        display: "inline-block",
        position: "relative",
        whiteSpace: "nowrap",
        background: e.boolean.background,
        borderRadius: "3em",
        padding: 1,
        '&[aria-disabled="true"]': { opacity: 0.5, input: { cursor: "not-allowed" } },
        input: {
          appearance: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          borderRadius: "3em",
          "&:focus": { outline: "none", boxShadow: `${e.color.secondary} 0 0 0 1px inset !important` },
        },
        span: {
          textAlign: "center",
          fontSize: e.typography.size.s1,
          fontWeight: e.typography.weight.bold,
          lineHeight: "1",
          cursor: "pointer",
          display: "inline-block",
          padding: "7px 15px",
          transition: "all 100ms ease-out",
          userSelect: "none",
          borderRadius: "3em",
          color: se(0.5, e.color.defaultText),
          background: "transparent",
          "&:hover": { boxShadow: `${cn(0.3, e.appBorderColor)} 0 0 0 1px inset` },
          "&:active": { boxShadow: `${cn(0.05, e.appBorderColor)} 0 0 0 2px inset`, color: cn(1, e.appBorderColor) },
          "&:first-of-type": { paddingRight: 8 },
          "&:last-of-type": { paddingLeft: 8 },
        },
        "input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type": {
          background: e.boolean.selectedBackground,
          boxShadow: e.base === "light" ? `${cn(0.1, e.appBorderColor)} 0 0 2px` : `${e.appBorderColor} 0 0 0 1px`,
          color: e.color.defaultText,
          padding: "7px 15px",
        },
      })),
      g2 = (e) => e === "true",
      b2 = ({ name: e, value: t, onChange: r, onBlur: n, onFocus: o, argType: a }) => {
        let i = xe(() => r(!1), [r]),
          l = !!a?.table?.readonly;
        if (t === void 0)
          return m.createElement(
            lt,
            { variant: "outline", size: "medium", id: lr(e), onClick: i, disabled: l },
            "Set boolean"
          );
        let s = Fe(e),
          c = typeof t == "string" ? g2(t) : t;
        return m.createElement(
          y2,
          { "aria-disabled": l, htmlFor: s, "aria-label": e },
          m.createElement("input", {
            id: s,
            type: "checkbox",
            onChange: (d) => r(d.target.checked),
            checked: c,
            role: "switch",
            disabled: l,
            name: e,
            onBlur: n,
            onFocus: o,
          }),
          m.createElement("span", { "aria-hidden": "true" }, "False"),
          m.createElement("span", { "aria-hidden": "true" }, "True")
        );
      },
      E2 = (e) => {
        let [t, r, n] = e.split("-"),
          o = new Date();
        return o.setFullYear(parseInt(t, 10), parseInt(r, 10) - 1, parseInt(n, 10)), o;
      },
      v2 = (e) => {
        let [t, r] = e.split(":"),
          n = new Date();
        return n.setHours(parseInt(t, 10)), n.setMinutes(parseInt(r, 10)), n;
      },
      x2 = (e) => {
        let t = new Date(e),
          r = `000${t.getFullYear()}`.slice(-4),
          n = `0${t.getMonth() + 1}`.slice(-2),
          o = `0${t.getDate()}`.slice(-2);
        return `${r}-${n}-${o}`;
      },
      S2 = (e) => {
        let t = new Date(e),
          r = `0${t.getHours()}`.slice(-2),
          n = `0${t.getMinutes()}`.slice(-2);
        return `${r}:${n}`;
      },
      kc = R(Ve.Input)(({ readOnly: e }) => ({ opacity: e ? 0.5 : 1 })),
      w2 = R.div(({ theme: e }) => ({
        flex: 1,
        display: "flex",
        input: {
          marginLeft: 10,
          flex: 1,
          height: 32,
          "&::-webkit-calendar-picker-indicator": {
            opacity: 0.5,
            height: 12,
            filter: e.base === "light" ? void 0 : "invert(1)",
          },
        },
        "input:first-of-type": { marginLeft: 0, flexGrow: 4 },
        "input:last-of-type": { flexGrow: 3 },
      })),
      A2 = ({ name: e, value: t, onChange: r, onFocus: n, onBlur: o, argType: a }) => {
        let [i, l] = X(!0),
          s = Re(),
          c = Re(),
          d = !!a?.table?.readonly;
        Se(() => {
          i !== !1 &&
            (s && s.current && (s.current.value = t ? x2(t) : ""),
            c && c.current && (c.current.value = t ? S2(t) : ""));
        }, [t]);
        let p = (b) => {
            if (!b.target.value) return r();
            let g = E2(b.target.value),
              x = new Date(t);
            x.setFullYear(g.getFullYear(), g.getMonth(), g.getDate());
            let S = x.getTime();
            S && r(S), l(!!S);
          },
          h = (b) => {
            if (!b.target.value) return r();
            let g = v2(b.target.value),
              x = new Date(t);
            x.setHours(g.getHours()), x.setMinutes(g.getMinutes());
            let S = x.getTime();
            S && r(S), l(!!S);
          },
          f = Fe(e);
        return m.createElement(
          w2,
          null,
          m.createElement(kc, {
            type: "date",
            max: "9999-12-31",
            ref: s,
            id: `${f}-date`,
            name: `${f}-date`,
            readOnly: d,
            onChange: p,
            onFocus: n,
            onBlur: o,
          }),
          m.createElement(kc, {
            type: "time",
            id: `${f}-time`,
            name: `${f}-time`,
            ref: c,
            onChange: h,
            readOnly: d,
            onFocus: n,
            onBlur: o,
          }),
          i ? null : m.createElement("div", null, "invalid")
        );
      },
      T2 = R.label({ display: "flex" }),
      C2 = (e) => {
        let t = parseFloat(e);
        return Number.isNaN(t) ? void 0 : t;
      },
      k2 = R(Ve.Input)(({ readOnly: e }) => ({ opacity: e ? 0.5 : 1 })),
      I2 = ({ name: e, value: t, onChange: r, min: n, max: o, step: a, onBlur: i, onFocus: l, argType: s }) => {
        let [c, d] = X(typeof t == "number" ? t : ""),
          [p, h] = X(!1),
          [f, b] = X(null),
          g = !!s?.table?.readonly,
          x = xe(
            (k) => {
              d(k.target.value);
              let T = parseFloat(k.target.value);
              Number.isNaN(T) ? b(new Error(`'${k.target.value}' is not a number`)) : (r(T), b(null));
            },
            [r, b]
          ),
          S = xe(() => {
            d("0"), r(0), h(!0);
          }, [h]),
          A = Re(null);
        return (
          Se(() => {
            p && A.current && A.current.select();
          }, [p]),
          Se(() => {
            c !== (typeof t == "number" ? t : "") && d(t);
          }, [t]),
          t === void 0
            ? m.createElement(
                lt,
                { variant: "outline", size: "medium", id: lr(e), onClick: S, disabled: g },
                "Set number"
              )
            : m.createElement(
                T2,
                null,
                m.createElement(k2, {
                  ref: A,
                  id: Fe(e),
                  type: "number",
                  onChange: x,
                  size: "flex",
                  placeholder: "Edit number...",
                  value: c,
                  valid: f ? "error" : null,
                  autoFocus: p,
                  readOnly: g,
                  name: e,
                  min: n,
                  max: o,
                  step: a,
                  onFocus: l,
                  onBlur: i,
                })
              )
        );
      },
      bd = (e, t) => {
        let r = t && Object.entries(t).find(([n, o]) => o === e);
        return r ? r[0] : void 0;
      },
      wa = (e, t) =>
        e && t
          ? Object.entries(t)
              .filter((r) => e.includes(r[1]))
              .map((r) => r[0])
          : [],
      Ed = (e, t) => e && t && e.map((r) => t[r]),
      O2 = R.div(
        ({ isInline: e }) =>
          e
            ? {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                label: { display: "inline-flex", marginRight: 15 },
              }
            : { label: { display: "flex" } },
        (e) => {
          if (e["aria-readonly"] === "true") return { input: { cursor: "not-allowed" } };
        }
      ),
      D2 = R.span({ "[aria-readonly=true] &": { opacity: 0.5 } }),
      R2 = R.label({
        lineHeight: "20px",
        alignItems: "center",
        marginBottom: 8,
        "&:last-child": { marginBottom: 0 },
        input: { margin: 0, marginRight: 6 },
      }),
      Ic = ({ name: e, options: t, value: r, onChange: n, isInline: o, argType: a }) => {
        if (!t) return qr.warn(`Checkbox with no options: ${e}`), m.createElement(m.Fragment, null, "-");
        let i = wa(r, t),
          [l, s] = X(i),
          c = !!a?.table?.readonly,
          d = (h) => {
            let f = h.target.value,
              b = [...l];
            b.includes(f) ? b.splice(b.indexOf(f), 1) : b.push(f), n(Ed(b, t)), s(b);
          };
        Se(() => {
          s(wa(r, t));
        }, [r]);
        let p = Fe(e);
        return m.createElement(
          O2,
          { "aria-readonly": c, isInline: o },
          Object.keys(t).map((h, f) => {
            let b = `${p}-${f}`;
            return m.createElement(
              R2,
              { key: b, htmlFor: b },
              m.createElement("input", {
                type: "checkbox",
                disabled: c,
                id: b,
                name: b,
                value: h,
                onChange: d,
                checked: l?.includes(h),
              }),
              m.createElement(D2, null, h)
            );
          })
        );
      },
      _2 = R.div(
        ({ isInline: e }) =>
          e
            ? {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                label: { display: "inline-flex", marginRight: 15 },
              }
            : { label: { display: "flex" } },
        (e) => {
          if (e["aria-readonly"] === "true") return { input: { cursor: "not-allowed" } };
        }
      ),
      P2 = R.span({ "[aria-readonly=true] &": { opacity: 0.5 } }),
      F2 = R.label({
        lineHeight: "20px",
        alignItems: "center",
        marginBottom: 8,
        "&:last-child": { marginBottom: 0 },
        input: { margin: 0, marginRight: 6 },
      }),
      Oc = ({ name: e, options: t, value: r, onChange: n, isInline: o, argType: a }) => {
        if (!t) return qr.warn(`Radio with no options: ${e}`), m.createElement(m.Fragment, null, "-");
        let i = bd(r, t),
          l = Fe(e),
          s = !!a?.table?.readonly;
        return m.createElement(
          _2,
          { "aria-readonly": s, isInline: o },
          Object.keys(t).map((c, d) => {
            let p = `${l}-${d}`;
            return m.createElement(
              F2,
              { key: p, htmlFor: p },
              m.createElement("input", {
                type: "radio",
                id: p,
                name: l,
                disabled: s,
                value: c,
                onChange: (h) => n(t[h.currentTarget.value]),
                checked: c === i,
              }),
              m.createElement(P2, null, c)
            );
          })
        );
      },
      N2 = {
        appearance: "none",
        border: "0 none",
        boxSizing: "inherit",
        display: " block",
        margin: " 0",
        background: "transparent",
        padding: 0,
        fontSize: "inherit",
        position: "relative",
      },
      vd = R.select(N2, ({ theme: e }) => ({
        boxSizing: "border-box",
        position: "relative",
        padding: "6px 10px",
        width: "100%",
        color: e.input.color || "inherit",
        background: e.input.background,
        borderRadius: e.input.borderRadius,
        boxShadow: `${e.input.border} 0 0 0 1px inset`,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: "20px",
        "&:focus": { boxShadow: `${e.color.secondary} 0 0 0 1px inset`, outline: "none" },
        "&[disabled]": { cursor: "not-allowed", opacity: 0.5 },
        "::placeholder": { color: e.textMutedColor },
        "&[multiple]": {
          overflow: "auto",
          padding: 0,
          option: { display: "block", padding: "6px 10px", marginLeft: 1, marginRight: 1 },
        },
      })),
      xd = R.span(({ theme: e }) => ({
        display: "inline-block",
        lineHeight: "normal",
        overflow: "hidden",
        position: "relative",
        verticalAlign: "top",
        width: "100%",
        svg: {
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          height: "12px",
          marginTop: "-6px",
          right: "12px",
          top: "50%",
          fill: e.textMutedColor,
          path: { fill: e.textMutedColor },
        },
      })),
      Dc = "Choose option...",
      B2 = ({ name: e, value: t, options: r, onChange: n, argType: o }) => {
        let a = (c) => {
            n(r[c.currentTarget.value]);
          },
          i = bd(t, r) || Dc,
          l = Fe(e),
          s = !!o?.table?.readonly;
        return m.createElement(
          xd,
          null,
          m.createElement(eo, null),
          m.createElement(
            vd,
            { disabled: s, id: l, value: i, onChange: a },
            m.createElement("option", { key: "no-selection", disabled: !0 }, Dc),
            Object.keys(r).map((c) => m.createElement("option", { key: c, value: c }, c))
          )
        );
      },
      j2 = ({ name: e, value: t, options: r, onChange: n, argType: o }) => {
        let a = (c) => {
            let d = Array.from(c.currentTarget.options)
              .filter((p) => p.selected)
              .map((p) => p.value);
            n(Ed(d, r));
          },
          i = wa(t, r),
          l = Fe(e),
          s = !!o?.table?.readonly;
        return m.createElement(
          xd,
          null,
          m.createElement(
            vd,
            { disabled: s, id: l, multiple: !0, value: i, onChange: a },
            Object.keys(r).map((c) => m.createElement("option", { key: c, value: c }, c))
          )
        );
      },
      Rc = (e) => {
        let { name: t, options: r } = e;
        return r
          ? e.isMulti
            ? m.createElement(j2, { ...e })
            : m.createElement(B2, { ...e })
          : (qr.warn(`Select with no options: ${t}`), m.createElement(m.Fragment, null, "-"));
      },
      L2 = (e, t) => (Array.isArray(e) ? e.reduce((r, n) => ((r[t?.[n] || String(n)] = n), r), {}) : e),
      M2 = { check: Ic, "inline-check": Ic, radio: Oc, "inline-radio": Oc, select: Rc, "multi-select": Rc },
      Xt = (e) => {
        let { type: t = "select", labels: r, argType: n } = e,
          o = {
            ...e,
            argType: n,
            options: n ? L2(n.options, r) : {},
            isInline: t.includes("inline"),
            isMulti: t.includes("multi"),
          },
          a = M2[t];
        if (a) return m.createElement(a, { ...o });
        throw new Error(`Unknown options type: ${t}`);
      },
      U2 = "Error",
      $2 = "Object",
      q2 = "Array",
      V2 = "String",
      J2 = "Number",
      z2 = "Boolean",
      H2 = "Date",
      G2 = "Null",
      W2 = "Undefined",
      K2 = "Function",
      Y2 = "Symbol",
      Sd = "ADD_DELTA_TYPE",
      wd = "REMOVE_DELTA_TYPE",
      Ad = "UPDATE_DELTA_TYPE",
      Oa = "value",
      X2 = "key";
    function Pt(e) {
      return e !== null && typeof e == "object" && !Array.isArray(e) && typeof e[Symbol.iterator] == "function"
        ? "Iterable"
        : Object.prototype.toString.call(e).slice(8, -1);
    }
    function Td(e, t) {
      let r = Pt(e),
        n = Pt(t);
      return (r === "Function" || n === "Function") && n !== r;
    }
    var Da = class extends it {
      constructor(e) {
        super(e),
          (this.state = { inputRefKey: null, inputRefValue: null }),
          (this.refInputValue = this.refInputValue.bind(this)),
          (this.refInputKey = this.refInputKey.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this)),
          (this.onSubmit = this.onSubmit.bind(this));
      }
      componentDidMount() {
        let { inputRefKey: e, inputRefValue: t } = this.state,
          { onlyValue: r } = this.props;
        e && typeof e.focus == "function" && e.focus(),
          r && t && typeof t.focus == "function" && t.focus(),
          document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") && (e.preventDefault(), this.onSubmit()),
          (e.code === "Escape" || e.key === "Escape") && (e.preventDefault(), this.props.handleCancel()));
      }
      onSubmit() {
        let { handleAdd: e, onlyValue: t, onSubmitValueParser: r, keyPath: n, deep: o } = this.props,
          { inputRefKey: a, inputRefValue: i } = this.state,
          l = {};
        if (!t) {
          if (!a.value) return;
          l.key = a.value;
        }
        (l.newValue = r(!1, n, o, l.key, i.value)), e(l);
      }
      refInputKey(e) {
        this.state.inputRefKey = e;
      }
      refInputValue(e) {
        this.state.inputRefValue = e;
      }
      render() {
        let {
            handleCancel: e,
            onlyValue: t,
            addButtonElement: r,
            cancelButtonElement: n,
            inputElementGenerator: o,
            keyPath: a,
            deep: i,
          } = this.props,
          l = ue(r, { onClick: this.onSubmit }),
          s = ue(n, { onClick: e }),
          c = o(Oa, a, i),
          d = ue(c, { placeholder: "Value", ref: this.refInputValue }),
          p = null;
        if (!t) {
          let h = o(X2, a, i);
          p = ue(h, { placeholder: "Key", ref: this.refInputKey });
        }
        return m.createElement("span", { className: "rejt-add-value-node" }, p, d, s, l);
      }
    };
    Da.defaultProps = {
      onlyValue: !1,
      addButtonElement: m.createElement("button", null, "+"),
      cancelButtonElement: m.createElement("button", null, "c"),
    };
    var Cd = class extends it {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = {
          data: e.data,
          name: e.name,
          keyPath: t,
          deep: e.deep,
          nextDeep: e.deep + 1,
          collapsed: e.isCollapsed(t, e.deep, e.data),
          addFormVisible: !1,
        }),
          (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
          (this.handleRemoveItem = this.handleRemoveItem.bind(this)),
          (this.handleAddMode = this.handleAddMode.bind(this)),
          (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
          (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
          (this.handleEditValue = this.handleEditValue.bind(this)),
          (this.onChildUpdate = this.onChildUpdate.bind(this)),
          (this.renderCollapsed = this.renderCollapsed.bind(this)),
          (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      onChildUpdate(e, t) {
        let { data: r, keyPath: n } = this.state;
        (r[e] = t), this.setState({ data: r });
        let { onUpdate: o } = this.props,
          a = n.length;
        o(n[a - 1], r);
      }
      handleAddMode() {
        this.setState({ addFormVisible: !0 });
      }
      handleCollapseMode() {
        this.setState((e) => ({ collapsed: !e.collapsed }));
      }
      handleRemoveItem(e) {
        return () => {
          let { beforeRemoveAction: t, logger: r } = this.props,
            { data: n, keyPath: o, nextDeep: a } = this.state,
            i = n[e];
          t(e, o, a, i)
            .then(() => {
              let l = { keyPath: o, deep: a, key: e, oldValue: i, type: wd };
              n.splice(e, 1), this.setState({ data: n });
              let { onUpdate: s, onDeltaUpdate: c } = this.props;
              s(o[o.length - 1], n), c(l);
            })
            .catch(r.error);
        };
      }
      handleAddValueAdd({ newValue: e }) {
        let { data: t, keyPath: r, nextDeep: n } = this.state,
          { beforeAddAction: o, logger: a } = this.props;
        o(t.length, r, n, e)
          .then(() => {
            let i = [...t, e];
            this.setState({ data: i }), this.handleAddValueCancel();
            let { onUpdate: l, onDeltaUpdate: s } = this.props;
            l(r[r.length - 1], i), s({ type: Sd, keyPath: r, deep: n, key: i.length - 1, newValue: e });
          })
          .catch(a.error);
      }
      handleAddValueCancel() {
        this.setState({ addFormVisible: !1 });
      }
      handleEditValue({ key: e, value: t }) {
        return new Promise((r, n) => {
          let { beforeUpdateAction: o } = this.props,
            { data: a, keyPath: i, nextDeep: l } = this.state,
            s = a[e];
          o(e, i, l, s, t)
            .then(() => {
              (a[e] = t), this.setState({ data: a });
              let { onUpdate: c, onDeltaUpdate: d } = this.props;
              c(i[i.length - 1], a), d({ type: Ad, keyPath: i, deep: l, key: e, newValue: t, oldValue: s }), r(void 0);
            })
            .catch(n);
        });
      }
      renderCollapsed() {
        let { name: e, data: t, keyPath: r, deep: n } = this.state,
          { handleRemove: o, readOnly: a, getStyle: i, dataType: l, minusMenuElement: s } = this.props,
          { minus: c, collapsed: d } = i(e, t, r, n, l),
          p = a(e, t, r, n, l),
          h = ue(s, { onClick: o, className: "rejt-minus-menu", style: c });
        return m.createElement(
          "span",
          { className: "rejt-collapsed" },
          m.createElement(
            "span",
            { className: "rejt-collapsed-text", style: d, onClick: this.handleCollapseMode },
            "[...] ",
            t.length,
            " ",
            t.length === 1 ? "item" : "items"
          ),
          !p && h
        );
      }
      renderNotCollapsed() {
        let { name: e, data: t, keyPath: r, deep: n, addFormVisible: o, nextDeep: a } = this.state,
          {
            isCollapsed: i,
            handleRemove: l,
            onDeltaUpdate: s,
            readOnly: c,
            getStyle: d,
            dataType: p,
            addButtonElement: h,
            cancelButtonElement: f,
            editButtonElement: b,
            inputElementGenerator: g,
            textareaElementGenerator: x,
            minusMenuElement: S,
            plusMenuElement: A,
            beforeRemoveAction: k,
            beforeAddAction: T,
            beforeUpdateAction: I,
            logger: D,
            onSubmitValueParser: F,
          } = this.props,
          { minus: P, plus: L, delimiter: B, ul: G, addForm: $ } = d(e, t, r, n, p),
          H = c(e, t, r, n, p),
          w = ue(A, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: L }),
          C = ue(S, { onClick: l, className: "rejt-minus-menu", style: P });
        return m.createElement(
          "span",
          { className: "rejt-not-collapsed" },
          m.createElement("span", { className: "rejt-not-collapsed-delimiter", style: B }, "["),
          !o && w,
          m.createElement(
            "ul",
            { className: "rejt-not-collapsed-list", style: G },
            t.map((_, M) =>
              m.createElement(xn, {
                key: M,
                name: M.toString(),
                data: _,
                keyPath: r,
                deep: a,
                isCollapsed: i,
                handleRemove: this.handleRemoveItem(M),
                handleUpdateValue: this.handleEditValue,
                onUpdate: this.onChildUpdate,
                onDeltaUpdate: s,
                readOnly: c,
                getStyle: d,
                addButtonElement: h,
                cancelButtonElement: f,
                editButtonElement: b,
                inputElementGenerator: g,
                textareaElementGenerator: x,
                minusMenuElement: S,
                plusMenuElement: A,
                beforeRemoveAction: k,
                beforeAddAction: T,
                beforeUpdateAction: I,
                logger: D,
                onSubmitValueParser: F,
              })
            )
          ),
          !H &&
            o &&
            m.createElement(
              "div",
              { className: "rejt-add-form", style: $ },
              m.createElement(Da, {
                handleAdd: this.handleAddValueAdd,
                handleCancel: this.handleAddValueCancel,
                onlyValue: !0,
                addButtonElement: h,
                cancelButtonElement: f,
                inputElementGenerator: g,
                keyPath: r,
                deep: n,
                onSubmitValueParser: F,
              })
            ),
          m.createElement("span", { className: "rejt-not-collapsed-delimiter", style: B }, "]"),
          !H && C
        );
      }
      render() {
        let { name: e, collapsed: t, data: r, keyPath: n, deep: o } = this.state,
          { dataType: a, getStyle: i } = this.props,
          l = t ? this.renderCollapsed() : this.renderNotCollapsed(),
          s = i(e, r, n, o, a);
        return m.createElement(
          "div",
          { className: "rejt-array-node" },
          m.createElement(
            "span",
            { onClick: this.handleCollapseMode },
            m.createElement("span", { className: "rejt-name", style: s.name }, e, " :", " ")
          ),
          l
        );
      }
    };
    Cd.defaultProps = {
      keyPath: [],
      deep: 0,
      minusMenuElement: m.createElement("span", null, " - "),
      plusMenuElement: m.createElement("span", null, " + "),
    };
    var kd = class extends it {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = { value: e.value, name: e.name, keyPath: t, deep: e.deep, editEnabled: !1, inputRef: null }),
          (this.handleEditMode = this.handleEditMode.bind(this)),
          (this.refInput = this.refInput.bind(this)),
          (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
          (this.handleEdit = this.handleEdit.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.value !== t.value ? { value: e.value } : null;
      }
      componentDidUpdate() {
        let { editEnabled: e, inputRef: t, name: r, value: n, keyPath: o, deep: a } = this.state,
          { readOnly: i, dataType: l } = this.props,
          s = i(r, n, o, a, l);
        e && !s && typeof t.focus == "function" && t.focus();
      }
      componentDidMount() {
        document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") && (e.preventDefault(), this.handleEdit()),
          (e.code === "Escape" || e.key === "Escape") && (e.preventDefault(), this.handleCancelEdit()));
      }
      handleEdit() {
        let { handleUpdateValue: e, originalValue: t, logger: r, onSubmitValueParser: n, keyPath: o } = this.props,
          { inputRef: a, name: i, deep: l } = this.state;
        if (!a) return;
        let s = n(!0, o, l, i, a.value);
        e({ value: s, key: i })
          .then(() => {
            Td(t, s) || this.handleCancelEdit();
          })
          .catch(r.error);
      }
      handleEditMode() {
        this.setState({ editEnabled: !0 });
      }
      refInput(e) {
        this.state.inputRef = e;
      }
      handleCancelEdit() {
        this.setState({ editEnabled: !1 });
      }
      render() {
        let { name: e, value: t, editEnabled: r, keyPath: n, deep: o } = this.state,
          {
            handleRemove: a,
            originalValue: i,
            readOnly: l,
            dataType: s,
            getStyle: c,
            editButtonElement: d,
            cancelButtonElement: p,
            textareaElementGenerator: h,
            minusMenuElement: f,
            keyPath: b,
          } = this.props,
          g = c(e, i, n, o, s),
          x = null,
          S = null,
          A = l(e, i, n, o, s);
        if (r && !A) {
          let k = h(Oa, b, o, e, i, s),
            T = ue(d, { onClick: this.handleEdit }),
            I = ue(p, { onClick: this.handleCancelEdit }),
            D = ue(k, { ref: this.refInput, defaultValue: i });
          (x = m.createElement("span", { className: "rejt-edit-form", style: g.editForm }, D, " ", I, T)), (S = null);
        } else {
          x = m.createElement(
            "span",
            { className: "rejt-value", style: g.value, onClick: A ? null : this.handleEditMode },
            t
          );
          let k = ue(f, { onClick: a, className: "rejt-minus-menu", style: g.minus });
          S = A ? null : k;
        }
        return m.createElement(
          "li",
          { className: "rejt-function-value-node", style: g.li },
          m.createElement("span", { className: "rejt-name", style: g.name }, e, " :", " "),
          x,
          S
        );
      }
    };
    kd.defaultProps = {
      keyPath: [],
      deep: 0,
      handleUpdateValue: () => {},
      editButtonElement: m.createElement("button", null, "e"),
      cancelButtonElement: m.createElement("button", null, "c"),
      minusMenuElement: m.createElement("span", null, " - "),
    };
    var xn = class extends it {
      constructor(e) {
        super(e), (this.state = { data: e.data, name: e.name, keyPath: e.keyPath, deep: e.deep });
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      render() {
        let { data: e, name: t, keyPath: r, deep: n } = this.state,
          {
            isCollapsed: o,
            handleRemove: a,
            handleUpdateValue: i,
            onUpdate: l,
            onDeltaUpdate: s,
            readOnly: c,
            getStyle: d,
            addButtonElement: p,
            cancelButtonElement: h,
            editButtonElement: f,
            inputElementGenerator: b,
            textareaElementGenerator: g,
            minusMenuElement: x,
            plusMenuElement: S,
            beforeRemoveAction: A,
            beforeAddAction: k,
            beforeUpdateAction: T,
            logger: I,
            onSubmitValueParser: D,
          } = this.props,
          F = () => !0,
          P = Pt(e);
        switch (P) {
          case U2:
            return m.createElement(Aa, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: l,
              onDeltaUpdate: s,
              readOnly: F,
              dataType: P,
              getStyle: d,
              addButtonElement: p,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              textareaElementGenerator: g,
              minusMenuElement: x,
              plusMenuElement: S,
              beforeRemoveAction: A,
              beforeAddAction: k,
              beforeUpdateAction: T,
              logger: I,
              onSubmitValueParser: D,
            });
          case $2:
            return m.createElement(Aa, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: l,
              onDeltaUpdate: s,
              readOnly: c,
              dataType: P,
              getStyle: d,
              addButtonElement: p,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              textareaElementGenerator: g,
              minusMenuElement: x,
              plusMenuElement: S,
              beforeRemoveAction: A,
              beforeAddAction: k,
              beforeUpdateAction: T,
              logger: I,
              onSubmitValueParser: D,
            });
          case q2:
            return m.createElement(Cd, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: l,
              onDeltaUpdate: s,
              readOnly: c,
              dataType: P,
              getStyle: d,
              addButtonElement: p,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              textareaElementGenerator: g,
              minusMenuElement: x,
              plusMenuElement: S,
              beforeRemoveAction: A,
              beforeAddAction: k,
              beforeUpdateAction: T,
              logger: I,
              onSubmitValueParser: D,
            });
          case V2:
            return m.createElement(bt, {
              name: t,
              value: `"${e}"`,
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case J2:
            return m.createElement(bt, {
              name: t,
              value: e,
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case z2:
            return m.createElement(bt, {
              name: t,
              value: e ? "true" : "false",
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case H2:
            return m.createElement(bt, {
              name: t,
              value: e.toISOString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: F,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case G2:
            return m.createElement(bt, {
              name: t,
              value: "null",
              originalValue: "null",
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case W2:
            return m.createElement(bt, {
              name: t,
              value: "undefined",
              originalValue: "undefined",
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case K2:
            return m.createElement(kd, {
              name: t,
              value: e.toString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              textareaElementGenerator: g,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          case Y2:
            return m.createElement(bt, {
              name: t,
              value: e.toString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: F,
              dataType: P,
              getStyle: d,
              cancelButtonElement: h,
              editButtonElement: f,
              inputElementGenerator: b,
              minusMenuElement: x,
              logger: I,
              onSubmitValueParser: D,
            });
          default:
            return null;
        }
      }
    };
    xn.defaultProps = { keyPath: [], deep: 0 };
    var Aa = class extends it {
      constructor(e) {
        super(e);
        let t = e.deep === -1 ? [] : [...e.keyPath, e.name];
        (this.state = {
          name: e.name,
          data: e.data,
          keyPath: t,
          deep: e.deep,
          nextDeep: e.deep + 1,
          collapsed: e.isCollapsed(t, e.deep, e.data),
          addFormVisible: !1,
        }),
          (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
          (this.handleRemoveValue = this.handleRemoveValue.bind(this)),
          (this.handleAddMode = this.handleAddMode.bind(this)),
          (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
          (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
          (this.handleEditValue = this.handleEditValue.bind(this)),
          (this.onChildUpdate = this.onChildUpdate.bind(this)),
          (this.renderCollapsed = this.renderCollapsed.bind(this)),
          (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      onChildUpdate(e, t) {
        let { data: r, keyPath: n } = this.state;
        (r[e] = t), this.setState({ data: r });
        let { onUpdate: o } = this.props,
          a = n.length;
        o(n[a - 1], r);
      }
      handleAddMode() {
        this.setState({ addFormVisible: !0 });
      }
      handleAddValueCancel() {
        this.setState({ addFormVisible: !1 });
      }
      handleAddValueAdd({ key: e, newValue: t }) {
        let { data: r, keyPath: n, nextDeep: o } = this.state,
          { beforeAddAction: a, logger: i } = this.props;
        a(e, n, o, t)
          .then(() => {
            (r[e] = t), this.setState({ data: r }), this.handleAddValueCancel();
            let { onUpdate: l, onDeltaUpdate: s } = this.props;
            l(n[n.length - 1], r), s({ type: Sd, keyPath: n, deep: o, key: e, newValue: t });
          })
          .catch(i.error);
      }
      handleRemoveValue(e) {
        return () => {
          let { beforeRemoveAction: t, logger: r } = this.props,
            { data: n, keyPath: o, nextDeep: a } = this.state,
            i = n[e];
          t(e, o, a, i)
            .then(() => {
              let l = { keyPath: o, deep: a, key: e, oldValue: i, type: wd };
              delete n[e], this.setState({ data: n });
              let { onUpdate: s, onDeltaUpdate: c } = this.props;
              s(o[o.length - 1], n), c(l);
            })
            .catch(r.error);
        };
      }
      handleCollapseMode() {
        this.setState((e) => ({ collapsed: !e.collapsed }));
      }
      handleEditValue({ key: e, value: t }) {
        return new Promise((r, n) => {
          let { beforeUpdateAction: o } = this.props,
            { data: a, keyPath: i, nextDeep: l } = this.state,
            s = a[e];
          o(e, i, l, s, t)
            .then(() => {
              (a[e] = t), this.setState({ data: a });
              let { onUpdate: c, onDeltaUpdate: d } = this.props;
              c(i[i.length - 1], a), d({ type: Ad, keyPath: i, deep: l, key: e, newValue: t, oldValue: s }), r();
            })
            .catch(n);
        });
      }
      renderCollapsed() {
        let { name: e, keyPath: t, deep: r, data: n } = this.state,
          { handleRemove: o, readOnly: a, dataType: i, getStyle: l, minusMenuElement: s } = this.props,
          { minus: c, collapsed: d } = l(e, n, t, r, i),
          p = Object.getOwnPropertyNames(n),
          h = a(e, n, t, r, i),
          f = ue(s, { onClick: o, className: "rejt-minus-menu", style: c });
        return m.createElement(
          "span",
          { className: "rejt-collapsed" },
          m.createElement(
            "span",
            { className: "rejt-collapsed-text", style: d, onClick: this.handleCollapseMode },
            "{...}",
            " ",
            p.length,
            " ",
            p.length === 1 ? "key" : "keys"
          ),
          !h && f
        );
      }
      renderNotCollapsed() {
        let { name: e, data: t, keyPath: r, deep: n, nextDeep: o, addFormVisible: a } = this.state,
          {
            isCollapsed: i,
            handleRemove: l,
            onDeltaUpdate: s,
            readOnly: c,
            getStyle: d,
            dataType: p,
            addButtonElement: h,
            cancelButtonElement: f,
            editButtonElement: b,
            inputElementGenerator: g,
            textareaElementGenerator: x,
            minusMenuElement: S,
            plusMenuElement: A,
            beforeRemoveAction: k,
            beforeAddAction: T,
            beforeUpdateAction: I,
            logger: D,
            onSubmitValueParser: F,
          } = this.props,
          { minus: P, plus: L, addForm: B, ul: G, delimiter: $ } = d(e, t, r, n, p),
          H = Object.getOwnPropertyNames(t),
          w = c(e, t, r, n, p),
          C = ue(A, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: L }),
          _ = ue(S, { onClick: l, className: "rejt-minus-menu", style: P }),
          M = H.map((U) =>
            m.createElement(xn, {
              key: U,
              name: U,
              data: t[U],
              keyPath: r,
              deep: o,
              isCollapsed: i,
              handleRemove: this.handleRemoveValue(U),
              handleUpdateValue: this.handleEditValue,
              onUpdate: this.onChildUpdate,
              onDeltaUpdate: s,
              readOnly: c,
              getStyle: d,
              addButtonElement: h,
              cancelButtonElement: f,
              editButtonElement: b,
              inputElementGenerator: g,
              textareaElementGenerator: x,
              minusMenuElement: S,
              plusMenuElement: A,
              beforeRemoveAction: k,
              beforeAddAction: T,
              beforeUpdateAction: I,
              logger: D,
              onSubmitValueParser: F,
            })
          );
        return m.createElement(
          "span",
          { className: "rejt-not-collapsed" },
          m.createElement("span", { className: "rejt-not-collapsed-delimiter", style: $ }, "{"),
          !w && C,
          m.createElement("ul", { className: "rejt-not-collapsed-list", style: G }, M),
          !w &&
            a &&
            m.createElement(
              "div",
              { className: "rejt-add-form", style: B },
              m.createElement(Da, {
                handleAdd: this.handleAddValueAdd,
                handleCancel: this.handleAddValueCancel,
                addButtonElement: h,
                cancelButtonElement: f,
                inputElementGenerator: g,
                keyPath: r,
                deep: n,
                onSubmitValueParser: F,
              })
            ),
          m.createElement("span", { className: "rejt-not-collapsed-delimiter", style: $ }, "}"),
          !w && _
        );
      }
      render() {
        let { name: e, collapsed: t, data: r, keyPath: n, deep: o } = this.state,
          { getStyle: a, dataType: i } = this.props,
          l = t ? this.renderCollapsed() : this.renderNotCollapsed(),
          s = a(e, r, n, o, i);
        return m.createElement(
          "div",
          { className: "rejt-object-node" },
          m.createElement(
            "span",
            { onClick: this.handleCollapseMode },
            m.createElement("span", { className: "rejt-name", style: s.name }, e, " :", " ")
          ),
          l
        );
      }
    };
    Aa.defaultProps = {
      keyPath: [],
      deep: 0,
      minusMenuElement: m.createElement("span", null, " - "),
      plusMenuElement: m.createElement("span", null, " + "),
    };
    var bt = class extends it {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = { value: e.value, name: e.name, keyPath: t, deep: e.deep, editEnabled: !1, inputRef: null }),
          (this.handleEditMode = this.handleEditMode.bind(this)),
          (this.refInput = this.refInput.bind(this)),
          (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
          (this.handleEdit = this.handleEdit.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.value !== t.value ? { value: e.value } : null;
      }
      componentDidUpdate() {
        let { editEnabled: e, inputRef: t, name: r, value: n, keyPath: o, deep: a } = this.state,
          { readOnly: i, dataType: l } = this.props,
          s = i(r, n, o, a, l);
        e && !s && typeof t.focus == "function" && t.focus();
      }
      componentDidMount() {
        document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") && (e.preventDefault(), this.handleEdit()),
          (e.code === "Escape" || e.key === "Escape") && (e.preventDefault(), this.handleCancelEdit()));
      }
      handleEdit() {
        let { handleUpdateValue: e, originalValue: t, logger: r, onSubmitValueParser: n, keyPath: o } = this.props,
          { inputRef: a, name: i, deep: l } = this.state;
        if (!a) return;
        let s = n(!0, o, l, i, a.value);
        e({ value: s, key: i })
          .then(() => {
            Td(t, s) || this.handleCancelEdit();
          })
          .catch(r.error);
      }
      handleEditMode() {
        this.setState({ editEnabled: !0 });
      }
      refInput(e) {
        this.state.inputRef = e;
      }
      handleCancelEdit() {
        this.setState({ editEnabled: !1 });
      }
      render() {
        let { name: e, value: t, editEnabled: r, keyPath: n, deep: o } = this.state,
          {
            handleRemove: a,
            originalValue: i,
            readOnly: l,
            dataType: s,
            getStyle: c,
            editButtonElement: d,
            cancelButtonElement: p,
            inputElementGenerator: h,
            minusMenuElement: f,
            keyPath: b,
          } = this.props,
          g = c(e, i, n, o, s),
          x = l(e, i, n, o, s),
          S = r && !x,
          A = h(Oa, b, o, e, i, s),
          k = ue(d, { onClick: this.handleEdit }),
          T = ue(p, { onClick: this.handleCancelEdit }),
          I = ue(A, { ref: this.refInput, defaultValue: JSON.stringify(i) }),
          D = ue(f, { onClick: a, className: "rejt-minus-menu", style: g.minus });
        return m.createElement(
          "li",
          { className: "rejt-value-node", style: g.li },
          m.createElement("span", { className: "rejt-name", style: g.name }, e, " : "),
          S
            ? m.createElement("span", { className: "rejt-edit-form", style: g.editForm }, I, " ", T, k)
            : m.createElement(
                "span",
                { className: "rejt-value", style: g.value, onClick: x ? null : this.handleEditMode },
                String(t)
              ),
          !x && !S && D
        );
      }
    };
    bt.defaultProps = {
      keyPath: [],
      deep: 0,
      handleUpdateValue: () => Promise.resolve(),
      editButtonElement: m.createElement("button", null, "e"),
      cancelButtonElement: m.createElement("button", null, "c"),
      minusMenuElement: m.createElement("span", null, " - "),
    };
    function Q2(e) {
      let t = e;
      if (t.indexOf("function") === 0) return (0, eval)(`(${t})`);
      try {
        t = JSON.parse(e);
      } catch {}
      return t;
    }
    var Z2 = {
        minus: { color: "red" },
        plus: { color: "green" },
        collapsed: { color: "grey" },
        delimiter: {},
        ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" },
        name: { color: "#2287CD" },
        addForm: {},
      },
      eb = {
        minus: { color: "red" },
        plus: { color: "green" },
        collapsed: { color: "grey" },
        delimiter: {},
        ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" },
        name: { color: "#2287CD" },
        addForm: {},
      },
      tb = {
        minus: { color: "red" },
        editForm: {},
        value: { color: "#7bba3d" },
        li: { minHeight: "22px", lineHeight: "22px", outline: "0px" },
        name: { color: "#2287CD" },
      },
      Id = class extends it {
        constructor(e) {
          super(e),
            (this.state = { data: e.data, rootName: e.rootName }),
            (this.onUpdate = this.onUpdate.bind(this)),
            (this.removeRoot = this.removeRoot.bind(this));
        }
        static getDerivedStateFromProps(e, t) {
          return e.data !== t.data || e.rootName !== t.rootName ? { data: e.data, rootName: e.rootName } : null;
        }
        onUpdate(e, t) {
          this.setState({ data: t }), this.props.onFullyUpdate(t);
        }
        removeRoot() {
          this.onUpdate(null, null);
        }
        render() {
          let { data: e, rootName: t } = this.state,
            {
              isCollapsed: r,
              onDeltaUpdate: n,
              readOnly: o,
              getStyle: a,
              addButtonElement: i,
              cancelButtonElement: l,
              editButtonElement: s,
              inputElement: c,
              textareaElement: d,
              minusMenuElement: p,
              plusMenuElement: h,
              beforeRemoveAction: f,
              beforeAddAction: b,
              beforeUpdateAction: g,
              logger: x,
              onSubmitValueParser: S,
              fallback: A = null,
            } = this.props,
            k = Pt(e),
            T = o;
          Pt(o) === "Boolean" && (T = () => o);
          let I = c;
          c && Pt(c) !== "Function" && (I = () => c);
          let D = d;
          return (
            d && Pt(d) !== "Function" && (D = () => d),
            k === "Object" || k === "Array"
              ? m.createElement(
                  "div",
                  { className: "rejt-tree" },
                  m.createElement(xn, {
                    data: e,
                    name: t,
                    deep: -1,
                    isCollapsed: r,
                    onUpdate: this.onUpdate,
                    onDeltaUpdate: n,
                    readOnly: T,
                    getStyle: a,
                    addButtonElement: i,
                    cancelButtonElement: l,
                    editButtonElement: s,
                    inputElementGenerator: I,
                    textareaElementGenerator: D,
                    minusMenuElement: p,
                    plusMenuElement: h,
                    handleRemove: this.removeRoot,
                    beforeRemoveAction: f,
                    beforeAddAction: b,
                    beforeUpdateAction: g,
                    logger: x,
                    onSubmitValueParser: S,
                  })
                )
              : A
          );
        }
      };
    Id.defaultProps = {
      rootName: "root",
      isCollapsed: (e, t) => t !== -1,
      getStyle: (e, t, r, n, o) => {
        switch (o) {
          case "Object":
          case "Error":
            return Z2;
          case "Array":
            return eb;
          default:
            return tb;
        }
      },
      readOnly: () => !1,
      onFullyUpdate: () => {},
      onDeltaUpdate: () => {},
      beforeRemoveAction: () => Promise.resolve(),
      beforeAddAction: () => Promise.resolve(),
      beforeUpdateAction: () => Promise.resolve(),
      logger: { error: () => {} },
      onSubmitValueParser: (e, t, r, n, o) => Q2(o),
      inputElement: () => m.createElement("input", null),
      textareaElement: () => m.createElement("textarea", null),
      fallback: null,
    };
    var { window: rb } = globalThis,
      nb = R.div(({ theme: e }) => ({
        position: "relative",
        display: "flex",
        '&[aria-readonly="true"]': { opacity: 0.5 },
        ".rejt-tree": { marginLeft: "1rem", fontSize: "13px" },
        ".rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed":
          { "& > svg": { opacity: 0, transition: "opacity 0.2s" } },
        ".rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed":
          { "& > svg": { opacity: 1 } },
        ".rejt-edit-form button": { display: "none" },
        ".rejt-add-form": { marginLeft: 10 },
        ".rejt-add-value-node": { display: "inline-flex", alignItems: "center" },
        ".rejt-name": { lineHeight: "22px" },
        ".rejt-not-collapsed-delimiter": { lineHeight: "22px" },
        ".rejt-plus-menu": { marginLeft: 5 },
        ".rejt-object-node > span > *, .rejt-array-node > span > *": { position: "relative", zIndex: 2 },
        ".rejt-object-node, .rejt-array-node": { position: "relative" },
        ".rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before":
          {
            content: '""',
            position: "absolute",
            top: 0,
            display: "block",
            width: "100%",
            marginLeft: "-1rem",
            padding: "0 4px 0 1rem",
            height: 22,
          },
        ".rejt-collapsed::before, .rejt-not-collapsed::before": {
          zIndex: 1,
          background: "transparent",
          borderRadius: 4,
          transition: "background 0.2s",
          pointerEvents: "none",
          opacity: 0.1,
        },
        ".rejt-object-node:hover, .rejt-array-node:hover": {
          "& > .rejt-collapsed::before, & > .rejt-not-collapsed::before": { background: e.color.secondary },
        },
        ".rejt-collapsed::after, .rejt-not-collapsed::after": {
          content: '""',
          position: "absolute",
          display: "inline-block",
          pointerEvents: "none",
          width: 0,
          height: 0,
        },
        ".rejt-collapsed::after": {
          left: -8,
          top: 8,
          borderTop: "3px solid transparent",
          borderBottom: "3px solid transparent",
          borderLeft: "3px solid rgba(153,153,153,0.6)",
        },
        ".rejt-not-collapsed::after": {
          left: -10,
          top: 10,
          borderTop: "3px solid rgba(153,153,153,0.6)",
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
        },
        ".rejt-value": {
          display: "inline-block",
          border: "1px solid transparent",
          borderRadius: 4,
          margin: "1px 0",
          padding: "0 4px",
          cursor: "text",
          color: e.color.defaultText,
        },
        ".rejt-value-node:hover > .rejt-value": { background: e.color.lighter, borderColor: e.appBorderColor },
      })),
      pa = R.button(({ theme: e, primary: t }) => ({
        border: 0,
        height: 20,
        margin: 1,
        borderRadius: 4,
        background: t ? e.color.secondary : "transparent",
        color: t ? e.color.lightest : e.color.dark,
        fontWeight: t ? "bold" : "normal",
        cursor: "pointer",
        order: t ? "initial" : 9,
      })),
      ob = R(Zn)(({ theme: e, disabled: t }) => ({
        display: "inline-block",
        verticalAlign: "middle",
        width: 15,
        height: 15,
        padding: 3,
        marginLeft: 5,
        cursor: t ? "not-allowed" : "pointer",
        color: e.textMutedColor,
        "&:hover": t ? {} : { color: e.color.ancillary },
        "svg + &": { marginLeft: 0 },
      })),
      ab = R(Ui)(({ theme: e, disabled: t }) => ({
        display: "inline-block",
        verticalAlign: "middle",
        width: 15,
        height: 15,
        padding: 3,
        marginLeft: 5,
        cursor: t ? "not-allowed" : "pointer",
        color: e.textMutedColor,
        "&:hover": t ? {} : { color: e.color.negative },
        "svg + &": { marginLeft: 0 },
      })),
      _c = R.input(({ theme: e, placeholder: t }) => ({
        outline: 0,
        margin: t ? 1 : "1px 0",
        padding: "3px 4px",
        color: e.color.defaultText,
        background: e.background.app,
        border: `1px solid ${e.appBorderColor}`,
        borderRadius: 4,
        lineHeight: "14px",
        width: t === "Key" ? 80 : 120,
        "&:focus": { border: `1px solid ${e.color.secondary}` },
      })),
      ib = R(ze)(({ theme: e }) => ({
        position: "absolute",
        zIndex: 2,
        top: 2,
        right: 2,
        height: 21,
        padding: "0 3px",
        background: e.background.bar,
        border: `1px solid ${e.appBorderColor}`,
        borderRadius: 3,
        color: e.textMutedColor,
        fontSize: "9px",
        fontWeight: "bold",
        textDecoration: "none",
        span: { marginLeft: 3, marginTop: 1 },
      })),
      sb = R(Ve.Textarea)(({ theme: e }) => ({
        flex: 1,
        padding: "7px 6px",
        fontFamily: e.typography.fonts.mono,
        fontSize: "12px",
        lineHeight: "18px",
        "&::placeholder": { fontFamily: e.typography.fonts.base, fontSize: "13px" },
        "&:placeholder-shown": { padding: "7px 10px" },
      })),
      lb = { bubbles: !0, cancelable: !0, key: "Enter", code: "Enter", keyCode: 13 },
      ub = (e) => {
        e.currentTarget.dispatchEvent(new rb.KeyboardEvent("keydown", lb));
      },
      cb = (e) => {
        e.currentTarget.select();
      },
      db = (e) => () => ({
        name: { color: e.color.secondary },
        collapsed: { color: e.color.dark },
        ul: { listStyle: "none", margin: "0 0 0 1rem", padding: 0 },
        li: { outline: 0 },
      }),
      Pc = ({ name: e, value: t, onChange: r, argType: n }) => {
        let o = Xn(),
          a = st(() => t && Ka(t), [t]),
          i = a != null,
          [l, s] = X(!i),
          [c, d] = X(null),
          p = !!n?.table?.readonly,
          h = xe(
            (k) => {
              try {
                k && r(JSON.parse(k)), d(void 0);
              } catch (T) {
                d(T);
              }
            },
            [r]
          ),
          [f, b] = X(!1),
          g = xe(() => {
            r({}), b(!0);
          }, [b]),
          x = Re(null);
        if (
          (Se(() => {
            f && x.current && x.current.select();
          }, [f]),
          !i)
        )
          return m.createElement(lt, { disabled: p, id: lr(e), onClick: g }, "Set object");
        let S = m.createElement(sb, {
            ref: x,
            id: Fe(e),
            name: e,
            defaultValue: t === null ? "" : JSON.stringify(t, null, 2),
            onBlur: (k) => h(k.target.value),
            placeholder: "Edit JSON string...",
            autoFocus: f,
            valid: c ? "error" : null,
            readOnly: p,
          }),
          A = Array.isArray(t) || (typeof t == "object" && t?.constructor === Object);
        return m.createElement(
          nb,
          { "aria-readonly": p },
          A &&
            m.createElement(
              ib,
              {
                onClick: (k) => {
                  k.preventDefault(), s((T) => !T);
                },
              },
              l ? m.createElement(Bi, null) : m.createElement(ji, null),
              m.createElement("span", null, "RAW")
            ),
          l
            ? S
            : m.createElement(Id, {
                readOnly: p || !A,
                isCollapsed: A ? void 0 : () => !0,
                data: a,
                rootName: e,
                onFullyUpdate: r,
                getStyle: db(o),
                cancelButtonElement: m.createElement(pa, { type: "button" }, "Cancel"),
                editButtonElement: m.createElement(pa, { type: "submit" }, "Save"),
                addButtonElement: m.createElement(pa, { type: "submit", primary: !0 }, "Save"),
                plusMenuElement: m.createElement(ob, null),
                minusMenuElement: m.createElement(ab, null),
                inputElement: (k, T, I, D) =>
                  D ? m.createElement(_c, { onFocus: cb, onBlur: ub }) : m.createElement(_c, null),
                fallback: S,
              })
        );
      },
      pb = R.input(({ theme: e, min: t, max: r, value: n, disabled: o }) => ({
        "&": { width: "100%", backgroundColor: "transparent", appearance: "none" },
        "&::-webkit-slider-runnable-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          borderRadius: 6,
          width: "100%",
          height: 6,
          cursor: o ? "not-allowed" : "pointer",
        },
        "&::-webkit-slider-thumb": {
          marginTop: "-6px",
          width: 16,
          height: 16,
          border: `1px solid ${rt(e.appBorderColor, 0.2)}`,
          borderRadius: "50px",
          boxShadow: `0 1px 3px 0px ${rt(e.appBorderColor, 0.2)}`,
          cursor: o ? "not-allowed" : "grab",
          appearance: "none",
          background: `${e.input.background}`,
          transition: "all 150ms ease-out",
          "&:hover": {
            background: `${We(0.05, e.input.background)}`,
            transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
            transition: "all 50ms ease-out",
          },
          "&:active": {
            background: `${e.input.background}`,
            transform: "scale3d(1, 1, 1) translateY(0px)",
            cursor: o ? "not-allowed" : "grab",
          },
        },
        "&:focus": {
          outline: "none",
          "&::-webkit-slider-runnable-track": { borderColor: rt(e.color.secondary, 0.4) },
          "&::-webkit-slider-thumb": {
            borderColor: e.color.secondary,
            boxShadow: `0 0px 5px 0px ${e.color.secondary}`,
          },
        },
        "&::-moz-range-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          borderRadius: 6,
          width: "100%",
          height: 6,
          cursor: o ? "not-allowed" : "pointer",
          outline: "none",
        },
        "&::-moz-range-thumb": {
          width: 16,
          height: 16,
          border: `1px solid ${rt(e.appBorderColor, 0.2)}`,
          borderRadius: "50px",
          boxShadow: `0 1px 3px 0px ${rt(e.appBorderColor, 0.2)}`,
          cursor: o ? "not-allowed" : "grap",
          background: `${e.input.background}`,
          transition: "all 150ms ease-out",
          "&:hover": {
            background: `${We(0.05, e.input.background)}`,
            transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
            transition: "all 50ms ease-out",
          },
          "&:active": {
            background: `${e.input.background}`,
            transform: "scale3d(1, 1, 1) translateY(0px)",
            cursor: "grabbing",
          },
        },
        "&::-ms-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${We(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Rt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          color: "transparent",
          width: "100%",
          height: "6px",
          cursor: "pointer",
        },
        "&::-ms-fill-lower": { borderRadius: 6 },
        "&::-ms-fill-upper": { borderRadius: 6 },
        "&::-ms-thumb": {
          width: 16,
          height: 16,
          background: `${e.input.background}`,
          border: `1px solid ${rt(e.appBorderColor, 0.2)}`,
          borderRadius: 50,
          cursor: "grab",
          marginTop: 0,
        },
        "@supports (-ms-ime-align:auto)": { "input[type=range]": { margin: "0" } },
      })),
      Od = R.span({
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 12,
        whiteSpace: "nowrap",
        fontFeatureSettings: "tnum",
        fontVariantNumeric: "tabular-nums",
        "[aria-readonly=true] &": { opacity: 0.5 },
      }),
      fb = R(Od)(({ numberOFDecimalsPlaces: e, max: t }) => ({
        width: `${e + t.toString().length * 2 + 3}ch`,
        textAlign: "right",
        flexShrink: 0,
      })),
      hb = R.div({ display: "flex", alignItems: "center", width: "100%" });
    function mb(e) {
      let t = e.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
    }
    var yb = ({
        name: e,
        value: t,
        onChange: r,
        min: n = 0,
        max: o = 100,
        step: a = 1,
        onBlur: i,
        onFocus: l,
        argType: s,
      }) => {
        let c = (f) => {
            r(C2(f.target.value));
          },
          d = t !== void 0,
          p = st(() => mb(a), [a]),
          h = !!s?.table?.readonly;
        return m.createElement(
          hb,
          { "aria-readonly": h },
          m.createElement(Od, null, n),
          m.createElement(pb, {
            id: Fe(e),
            type: "range",
            disabled: h,
            onChange: c,
            name: e,
            value: t,
            min: n,
            max: o,
            step: a,
            onFocus: l,
            onBlur: i,
          }),
          m.createElement(fb, { numberOFDecimalsPlaces: p, max: o }, d ? t.toFixed(p) : "--", " / ", o)
        );
      },
      gb = R.label({ display: "flex" }),
      bb = R.div(({ isMaxed: e }) => ({ marginLeft: "0.75rem", paddingTop: "0.35rem", color: e ? "red" : void 0 })),
      Eb = ({ name: e, value: t, onChange: r, onFocus: n, onBlur: o, maxLength: a, argType: i }) => {
        let l = (f) => {
            r(f.target.value);
          },
          s = !!i?.table?.readonly,
          [c, d] = X(!1),
          p = xe(() => {
            r(""), d(!0);
          }, [d]);
        if (t === void 0)
          return m.createElement(
            lt,
            { variant: "outline", size: "medium", disabled: s, id: lr(e), onClick: p },
            "Set string"
          );
        let h = typeof t == "string";
        return m.createElement(
          gb,
          null,
          m.createElement(Ve.Textarea, {
            id: Fe(e),
            maxLength: a,
            onChange: l,
            disabled: s,
            size: "flex",
            placeholder: "Edit string...",
            autoFocus: c,
            valid: h ? null : "error",
            name: e,
            value: h ? t : "",
            onFocus: n,
            onBlur: o,
          }),
          a && m.createElement(bb, { isMaxed: t?.length === a }, t?.length ?? 0, " / ", a)
        );
      },
      vb = R(Ve.Input)({ padding: 10 });
    function xb(e) {
      e.forEach((t) => {
        t.startsWith("blob:") && URL.revokeObjectURL(t);
      });
    }
    var Sb = ({ onChange: e, name: t, accept: r = "image/*", value: n, argType: o }) => {
        let a = Re(null),
          i = o?.control?.readOnly;
        function l(s) {
          if (!s.target.files) return;
          let c = Array.from(s.target.files).map((d) => URL.createObjectURL(d));
          e(c), xb(n);
        }
        return (
          Se(() => {
            n == null && a.current && (a.current.value = null);
          }, [n, t]),
          m.createElement(vb, {
            ref: a,
            id: Fe(t),
            type: "file",
            name: t,
            multiple: !0,
            disabled: i,
            onChange: l,
            accept: r,
            size: "flex",
          })
        );
      },
      wb = Qa(() => Promise.resolve().then(() => (hc(), fc))),
      Ab = (e) => m.createElement(Xa, { fallback: m.createElement("div", null) }, m.createElement(wb, { ...e })),
      Tb = {
        array: Pc,
        object: Pc,
        boolean: b2,
        color: Ab,
        date: A2,
        number: I2,
        check: Xt,
        "inline-check": Xt,
        radio: Xt,
        "inline-radio": Xt,
        select: Xt,
        "multi-select": Xt,
        range: yb,
        text: Eb,
        file: Sb,
      },
      Fc = () => m.createElement(m.Fragment, null, "-"),
      Cb = ({ row: e, arg: t, updateArgs: r, isHovered: n }) => {
        let { key: o, control: a } = e,
          [i, l] = X(!1),
          [s, c] = X({ value: t });
        Se(() => {
          i || c({ value: t });
        }, [i, t]);
        let d = xe((g) => (c({ value: g }), r({ [o]: g }), g), [r, o]),
          p = xe(() => l(!1), []),
          h = xe(() => l(!0), []);
        if (!a || a.disable) {
          let g = a?.disable !== !0 && e?.type?.name !== "function";
          return n && g
            ? m.createElement(
                xt,
                { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: !0 },
                "Setup controls"
              )
            : m.createElement(Fc, null);
        }
        let f = { name: o, argType: e, value: s.value, onChange: d, onBlur: p, onFocus: h },
          b = Tb[a.type] || Fc;
        return m.createElement(b, { ...f, ...a, controlType: a.type });
      },
      kb = R.table(({ theme: e }) => ({
        "&&": {
          borderCollapse: "collapse",
          borderSpacing: 0,
          border: "none",
          tr: { border: "none !important", background: "none" },
          "td, th": { padding: 0, border: "none", width: "auto!important" },
          marginTop: 0,
          marginBottom: 0,
          "th:first-of-type, td:first-of-type": { paddingLeft: 0 },
          "th:last-of-type, td:last-of-type": { paddingRight: 0 },
          td: { paddingTop: 0, paddingBottom: 4, "&:not(:first-of-type)": { paddingLeft: 10, paddingRight: 0 } },
          tbody: { boxShadow: "none", border: "none" },
          code: Mt({ theme: e }),
          div: { span: { fontWeight: "bold" } },
          "& code": { margin: 0, display: "inline-block", fontSize: e.typography.size.s1 },
        },
      })),
      Ib = ({ tags: e }) => {
        let t = (e.params || []).filter((a) => a.description),
          r = t.length !== 0,
          n = e.deprecated != null,
          o = e.returns != null && e.returns.description != null;
        return !r && !o && !n
          ? null
          : m.createElement(
              m.Fragment,
              null,
              m.createElement(
                kb,
                null,
                m.createElement(
                  "tbody",
                  null,
                  n &&
                    m.createElement(
                      "tr",
                      { key: "deprecated" },
                      m.createElement(
                        "td",
                        { colSpan: 2 },
                        m.createElement("strong", null, "Deprecated"),
                        ": ",
                        e.deprecated.toString()
                      )
                    ),
                  r &&
                    t.map((a) =>
                      m.createElement(
                        "tr",
                        { key: a.name },
                        m.createElement("td", null, m.createElement("code", null, a.name)),
                        m.createElement("td", null, a.description)
                      )
                    ),
                  o &&
                    m.createElement(
                      "tr",
                      { key: "returns" },
                      m.createElement("td", null, m.createElement("code", null, "Returns")),
                      m.createElement("td", null, e.returns.description)
                    )
                )
              )
            );
      },
      Ob = Lt(Gc()),
      Ta = 8,
      Nc = R.div(({ isExpanded: e }) => ({
        display: "flex",
        flexDirection: e ? "column" : "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginBottom: "-4px",
        minWidth: 100,
      })),
      Db = R.span(Mt, ({ theme: e, simple: t = !1 }) => ({
        flex: "0 0 auto",
        fontFamily: e.typography.fonts.mono,
        fontSize: e.typography.size.s1,
        wordBreak: "break-word",
        whiteSpace: "normal",
        maxWidth: "100%",
        margin: 0,
        marginRight: "4px",
        marginBottom: "4px",
        paddingTop: "2px",
        paddingBottom: "2px",
        lineHeight: "13px",
        ...(t && { background: "transparent", border: "0 none", paddingLeft: 0 }),
      })),
      Rb = R.button(({ theme: e }) => ({
        fontFamily: e.typography.fonts.mono,
        color: e.color.secondary,
        marginBottom: "4px",
        background: "none",
        border: "none",
      })),
      _b = R.div(Mt, ({ theme: e }) => ({
        fontFamily: e.typography.fonts.mono,
        color: e.color.secondary,
        fontSize: e.typography.size.s1,
        margin: 0,
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      })),
      Pb = R.div(({ theme: e, width: t }) => ({
        width: t,
        minWidth: 200,
        maxWidth: 800,
        padding: 15,
        fontFamily: e.typography.fonts.mono,
        fontSize: e.typography.size.s1,
        boxSizing: "content-box",
        "& code": { padding: "0 !important" },
      })),
      Fb = R(Ni)({ marginLeft: 4 }),
      Nb = R(eo)({ marginLeft: 4 }),
      Bb = () => m.createElement("span", null, "-"),
      Dd = ({ text: e, simple: t }) => m.createElement(Db, { simple: t }, e),
      jb = (0, Ob.default)(1e3)((e) => {
        let t = e.split(/\r?\n/);
        return `${Math.max(...t.map((r) => r.length))}ch`;
      }),
      Lb = (e) => {
        if (!e) return [e];
        let t = e.split("|").map((r) => r.trim());
        return Ga(t);
      },
      Bc = (e, t = !0) => {
        let r = e;
        return t || (r = e.slice(0, Ta)), r.map((n) => m.createElement(Dd, { key: n, text: n === "" ? '""' : n }));
      },
      Mb = ({ value: e, initialExpandedArgs: t }) => {
        let { summary: r, detail: n } = e,
          [o, a] = X(!1),
          [i, l] = X(t || !1);
        if (r == null) return null;
        let s = typeof r.toString == "function" ? r.toString() : r;
        if (n == null) {
          if (/[(){}[\]<>]/.test(s)) return m.createElement(Dd, { text: s });
          let c = Lb(s),
            d = c.length;
          return d > Ta
            ? m.createElement(
                Nc,
                { isExpanded: i },
                Bc(c, i),
                m.createElement(Rb, { onClick: () => l(!i) }, i ? "Show less..." : `Show ${d - Ta} more...`)
              )
            : m.createElement(Nc, null, Bc(c));
        }
        return m.createElement(
          Mn,
          {
            closeOnOutsideClick: !0,
            placement: "bottom",
            visible: o,
            onVisibleChange: (c) => {
              a(c);
            },
            tooltip: m.createElement(Pb, { width: jb(n) }, m.createElement(Rr, { language: "jsx", format: !1 }, n)),
          },
          m.createElement(
            _b,
            { className: "sbdocs-expandable" },
            m.createElement("span", null, s),
            o ? m.createElement(Fb, null) : m.createElement(Nb, null)
          )
        );
      },
      fa = ({ value: e, initialExpandedArgs: t }) =>
        e == null ? m.createElement(Bb, null) : m.createElement(Mb, { value: e, initialExpandedArgs: t }),
      Ub = R.span({ fontWeight: "bold" }),
      $b = R.span(({ theme: e }) => ({ color: e.color.negative, fontFamily: e.typography.fonts.mono, cursor: "help" })),
      qb = R.div(({ theme: e }) => ({
        "&&": { p: { margin: "0 0 10px 0" }, a: { color: e.color.secondary } },
        code: { ...Mt({ theme: e }), fontSize: 12, fontFamily: e.typography.fonts.mono },
        "& code": { margin: 0, display: "inline-block" },
        "& pre > code": { whiteSpace: "pre-wrap" },
      })),
      Vb = R.div(({ theme: e, hasDescription: t }) => ({
        color: e.base === "light" ? se(0.1, e.color.defaultText) : se(0.2, e.color.defaultText),
        marginTop: t ? 4 : 0,
      })),
      Jb = R.div(({ theme: e, hasDescription: t }) => ({
        color: e.base === "light" ? se(0.1, e.color.defaultText) : se(0.2, e.color.defaultText),
        marginTop: t ? 12 : 0,
        marginBottom: 12,
      })),
      zb = R.td(({ theme: e, expandable: t }) => ({ paddingLeft: t ? "40px !important" : "20px !important" })),
      Hb = (e) => e && { summary: typeof e == "string" ? e : e.name },
      pn = (e) => {
        let [t, r] = X(!1),
          { row: n, updateArgs: o, compact: a, expandable: i, initialExpandedArgs: l } = e,
          { name: s, description: c } = n,
          d = n.table || {},
          p = d.type || Hb(n.type),
          h = d.defaultValue || n.defaultValue,
          f = n.type?.required,
          b = c != null && c !== "";
        return m.createElement(
          "tr",
          { onMouseEnter: () => r(!0), onMouseLeave: () => r(!1) },
          m.createElement(
            zb,
            { expandable: i },
            m.createElement(Ub, null, s),
            f ? m.createElement($b, { title: "Required" }, "*") : null
          ),
          a
            ? null
            : m.createElement(
                "td",
                null,
                b && m.createElement(qb, null, m.createElement(m2, null, c)),
                d.jsDocTags != null
                  ? m.createElement(
                      m.Fragment,
                      null,
                      m.createElement(
                        Jb,
                        { hasDescription: b },
                        m.createElement(fa, { value: p, initialExpandedArgs: l })
                      ),
                      m.createElement(Ib, { tags: d.jsDocTags })
                    )
                  : m.createElement(
                      Vb,
                      { hasDescription: b },
                      m.createElement(fa, { value: p, initialExpandedArgs: l })
                    )
              ),
          a ? null : m.createElement("td", null, m.createElement(fa, { value: h, initialExpandedArgs: l })),
          o ? m.createElement("td", null, m.createElement(Cb, { ...e, isHovered: t })) : null
        );
      },
      Gb = R.div(({ inAddonPanel: e, theme: t }) => ({
        height: e ? "100%" : "auto",
        display: "flex",
        border: e ? "none" : `1px solid ${t.appBorderColor}`,
        borderRadius: e ? 0 : t.appBorderRadius,
        padding: e ? 0 : 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 15,
        background: t.background.content,
        boxShadow: "rgba(0, 0, 0, 0.10) 0 1px 3px 0",
      })),
      Wb = R.div(({ theme: e }) => ({ display: "flex", fontSize: e.typography.size.s2 - 1, gap: 25 })),
      Kb = R.div(({ theme: e }) => ({ width: 1, height: 16, backgroundColor: e.appBorderColor })),
      Yb = ({ inAddonPanel: e }) => {
        let [t, r] = X(!0);
        return (
          Se(() => {
            let n = setTimeout(() => {
              r(!1);
            }, 100);
            return () => clearTimeout(n);
          }, []),
          t
            ? null
            : m.createElement(
                Gb,
                { inAddonPanel: e },
                m.createElement(Fn, {
                  title: e
                    ? "Interactive story playground"
                    : "Args table with interactive controls couldn't be auto-generated",
                  description: m.createElement(
                    m.Fragment,
                    null,
                    "Controls give you an easy to use interface to test your components. Set your story args and you'll see controls appearing here automatically."
                  ),
                  footer: m.createElement(
                    Wb,
                    null,
                    e &&
                      m.createElement(
                        m.Fragment,
                        null,
                        m.createElement(
                          xt,
                          { href: "https://youtu.be/0gOfS6K0x0E", target: "_blank", withArrow: !0 },
                          m.createElement($i, null),
                          " Watch 5m video"
                        ),
                        m.createElement(Kb, null),
                        m.createElement(
                          xt,
                          {
                            href: "https://storybook.js.org/docs/essentials/controls",
                            target: "_blank",
                            withArrow: !0,
                          },
                          m.createElement($r, null),
                          " Read docs"
                        )
                      ),
                    !e &&
                      m.createElement(
                        xt,
                        { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: !0 },
                        m.createElement($r, null),
                        " Learn how to set that up"
                      )
                  ),
                })
              )
        );
      },
      Xb = R(Pi)(({ theme: e }) => ({
        marginRight: 8,
        marginLeft: -10,
        marginTop: -2,
        height: 12,
        width: 12,
        color: e.base === "light" ? se(0.25, e.color.defaultText) : se(0.3, e.color.defaultText),
        border: "none",
        display: "inline-block",
      })),
      Qb = R(Fi)(({ theme: e }) => ({
        marginRight: 8,
        marginLeft: -10,
        marginTop: -2,
        height: 12,
        width: 12,
        color: e.base === "light" ? se(0.25, e.color.defaultText) : se(0.3, e.color.defaultText),
        border: "none",
        display: "inline-block",
      })),
      Zb = R.span(({ theme: e }) => ({ display: "flex", lineHeight: "20px", alignItems: "center" })),
      e1 = R.td(({ theme: e }) => ({
        position: "relative",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s1 - 1,
        color: e.base === "light" ? se(0.4, e.color.defaultText) : se(0.6, e.color.defaultText),
        background: `${e.background.app} !important`,
        "& ~ td": { background: `${e.background.app} !important` },
      })),
      t1 = R.td(({ theme: e }) => ({
        position: "relative",
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        background: e.background.app,
      })),
      r1 = R.td(() => ({ position: "relative" })),
      n1 = R.tr(({ theme: e }) => ({
        "&:hover > td": {
          backgroundColor: `${Rt(0.005, e.background.app)} !important`,
          boxShadow: `${e.color.mediumlight} 0 - 1px 0 0 inset`,
          cursor: "row-resize",
        },
      })),
      jc = R.button(() => ({
        background: "none",
        border: "none",
        padding: "0",
        font: "inherit",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        width: "100%",
        color: "transparent",
        cursor: "row-resize !important",
      })),
      ha = ({ level: e = "section", label: t, children: r, initialExpanded: n = !0, colSpan: o = 3 }) => {
        let [a, i] = X(n),
          l = e === "subsection" ? t1 : e1,
          s = r?.length || 0,
          c = e === "subsection" ? `${s} item${s !== 1 ? "s" : ""}` : "",
          d = `${a ? "Hide" : "Show"} ${e === "subsection" ? s : t} item${s !== 1 ? "s" : ""}`;
        return m.createElement(
          m.Fragment,
          null,
          m.createElement(
            n1,
            { title: d },
            m.createElement(
              l,
              { colSpan: 1 },
              m.createElement(jc, { onClick: (p) => i(!a), tabIndex: 0 }, d),
              m.createElement(Zb, null, a ? m.createElement(Xb, null) : m.createElement(Qb, null), t)
            ),
            m.createElement(
              r1,
              { colSpan: o - 1 },
              m.createElement(jc, { onClick: (p) => i(!a), tabIndex: -1, style: { outline: "none" } }, d),
              a ? null : c
            )
          ),
          a ? r : null
        );
      },
      fn = R.div(({ theme: e }) => ({
        display: "flex",
        gap: 16,
        borderBottom: `1px solid ${e.appBorderColor}`,
        "&:last-child": { borderBottom: 0 },
      })),
      Ie = R.div(({ numColumn: e }) => ({
        display: "flex",
        flexDirection: "column",
        flex: e || 1,
        gap: 5,
        padding: "12px 20px",
      })),
      me = R.div(({ theme: e, width: t, height: r }) => ({
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
        background: e.appBorderColor,
        width: t || "100%",
        height: r || 16,
        borderRadius: 3,
      })),
      Oe = [2, 4, 2, 2],
      o1 = () =>
        m.createElement(
          m.Fragment,
          null,
          m.createElement(
            fn,
            null,
            m.createElement(Ie, { numColumn: Oe[0] }, m.createElement(me, { width: "60%" })),
            m.createElement(Ie, { numColumn: Oe[1] }, m.createElement(me, { width: "30%" })),
            m.createElement(Ie, { numColumn: Oe[2] }, m.createElement(me, { width: "60%" })),
            m.createElement(Ie, { numColumn: Oe[3] }, m.createElement(me, { width: "60%" }))
          ),
          m.createElement(
            fn,
            null,
            m.createElement(Ie, { numColumn: Oe[0] }, m.createElement(me, { width: "60%" })),
            m.createElement(
              Ie,
              { numColumn: Oe[1] },
              m.createElement(me, { width: "80%" }),
              m.createElement(me, { width: "30%" })
            ),
            m.createElement(Ie, { numColumn: Oe[2] }, m.createElement(me, { width: "60%" })),
            m.createElement(Ie, { numColumn: Oe[3] }, m.createElement(me, { width: "60%" }))
          ),
          m.createElement(
            fn,
            null,
            m.createElement(Ie, { numColumn: Oe[0] }, m.createElement(me, { width: "60%" })),
            m.createElement(
              Ie,
              { numColumn: Oe[1] },
              m.createElement(me, { width: "80%" }),
              m.createElement(me, { width: "30%" })
            ),
            m.createElement(Ie, { numColumn: Oe[2] }, m.createElement(me, { width: "60%" })),
            m.createElement(Ie, { numColumn: Oe[3] }, m.createElement(me, { width: "60%" }))
          ),
          m.createElement(
            fn,
            null,
            m.createElement(Ie, { numColumn: Oe[0] }, m.createElement(me, { width: "60%" })),
            m.createElement(
              Ie,
              { numColumn: Oe[1] },
              m.createElement(me, { width: "80%" }),
              m.createElement(me, { width: "30%" })
            ),
            m.createElement(Ie, { numColumn: Oe[2] }, m.createElement(me, { width: "60%" })),
            m.createElement(Ie, { numColumn: Oe[3] }, m.createElement(me, { width: "60%" }))
          )
        ),
      a1 = R.table(({ theme: e, compact: t, inAddonPanel: r }) => ({
        "&&": {
          borderSpacing: 0,
          color: e.color.defaultText,
          "td, th": { padding: 0, border: "none", verticalAlign: "top", textOverflow: "ellipsis" },
          fontSize: e.typography.size.s2 - 1,
          lineHeight: "20px",
          textAlign: "left",
          width: "100%",
          marginTop: r ? 0 : 25,
          marginBottom: r ? 0 : 40,
          "thead th:first-of-type, td:first-of-type": { width: "25%" },
          "th:first-of-type, td:first-of-type": { paddingLeft: 20 },
          "th:nth-of-type(2), td:nth-of-type(2)": { ...(t ? null : { width: "35%" }) },
          "td:nth-of-type(3)": { ...(t ? null : { width: "15%" }) },
          "th:last-of-type, td:last-of-type": { paddingRight: 20, ...(t ? null : { width: "25%" }) },
          th: {
            color: e.base === "light" ? se(0.25, e.color.defaultText) : se(0.45, e.color.defaultText),
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,
          },
          td: {
            paddingTop: "10px",
            paddingBottom: "10px",
            "&:not(:first-of-type)": { paddingLeft: 15, paddingRight: 15 },
            "&:last-of-type": { paddingRight: 20 },
          },
          marginLeft: r ? 0 : 1,
          marginRight: r ? 0 : 1,
          tbody: {
            ...(r
              ? null
              : {
                  filter:
                    e.base === "light"
                      ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))"
                      : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))",
                }),
            "> tr > *": { background: e.background.content, borderTop: `1px solid ${e.appBorderColor}` },
            ...(r
              ? null
              : {
                  "> tr:first-of-type > *": { borderBlockStart: `1px solid ${e.appBorderColor}` },
                  "> tr:last-of-type > *": { borderBlockEnd: `1px solid ${e.appBorderColor}` },
                  "> tr > *:first-of-type": { borderInlineStart: `1px solid ${e.appBorderColor}` },
                  "> tr > *:last-of-type": { borderInlineEnd: `1px solid ${e.appBorderColor}` },
                  "> tr:first-of-type > td:first-of-type": { borderTopLeftRadius: e.appBorderRadius },
                  "> tr:first-of-type > td:last-of-type": { borderTopRightRadius: e.appBorderRadius },
                  "> tr:last-of-type > td:first-of-type": { borderBottomLeftRadius: e.appBorderRadius },
                  "> tr:last-of-type > td:last-of-type": { borderBottomRightRadius: e.appBorderRadius },
                }),
          },
        },
      })),
      i1 = R(ze)(({ theme: e }) => ({ margin: "-4px -12px -4px 0" })),
      s1 = R.span({ display: "flex", justifyContent: "space-between" }),
      l1 = {
        alpha: (e, t) => e.name.localeCompare(t.name),
        requiredFirst: (e, t) => +!!t.type?.required - +!!e.type?.required || e.name.localeCompare(t.name),
        none: void 0,
      },
      u1 = (e, t) => {
        let r = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
        if (!e) return r;
        Object.entries(e).forEach(([a, i]) => {
          let { category: l, subcategory: s } = i?.table || {};
          if (l) {
            let c = r.sections[l] || { ungrouped: [], subsections: {} };
            if (!s) c.ungrouped.push({ key: a, ...i });
            else {
              let d = c.subsections[s] || [];
              d.push({ key: a, ...i }), (c.subsections[s] = d);
            }
            r.sections[l] = c;
          } else if (s) {
            let c = r.ungroupedSubsections[s] || [];
            c.push({ key: a, ...i }), (r.ungroupedSubsections[s] = c);
          } else r.ungrouped.push({ key: a, ...i });
        });
        let n = l1[t],
          o = (a) => (n ? Object.keys(a).reduce((i, l) => ({ ...i, [l]: a[l].sort(n) }), {}) : a);
        return {
          ungrouped: r.ungrouped.sort(n),
          ungroupedSubsections: o(r.ungroupedSubsections),
          sections: Object.keys(r.sections).reduce(
            (a, i) => ({
              ...a,
              [i]: { ungrouped: r.sections[i].ungrouped.sort(n), subsections: o(r.sections[i].subsections) },
            }),
            {}
          ),
        };
      },
      c1 = (e, t, r) => {
        try {
          return ug(e, t, r);
        } catch (n) {
          return zi.warn(n.message), !1;
        }
      },
      d1 = (e) => {
        let {
          updateArgs: t,
          resetArgs: r,
          compact: n,
          inAddonPanel: o,
          initialExpandedArgs: a,
          sort: i = "none",
          isLoading: l,
        } = e;
        if ("error" in e) {
          let { error: A } = e;
          return m.createElement(
            Qc,
            null,
            A,
            "\xA0",
            m.createElement(
              xt,
              { href: "http://storybook.js.org/docs/", target: "_blank", withArrow: !0 },
              m.createElement($r, null),
              " Read the docs"
            )
          );
        }
        if (l) return m.createElement(o1, null);
        let { rows: s, args: c, globals: d } = "rows" in e && e,
          p = u1(
            Wa(s || {}, (A) => !A?.table?.disable && c1(A, c || {}, d || {})),
            i
          ),
          h = p.ungrouped.length === 0,
          f = Object.entries(p.sections).length === 0,
          b = Object.entries(p.ungroupedSubsections).length === 0;
        if (h && f && b) return m.createElement(Yb, { inAddonPanel: o });
        let g = 1;
        t && (g += 1), n || (g += 2);
        let x = Object.keys(p.sections).length > 0,
          S = { updateArgs: t, compact: n, inAddonPanel: o, initialExpandedArgs: a };
        return m.createElement(
          jn,
          null,
          m.createElement(
            a1,
            { compact: n, inAddonPanel: o, className: "docblock-argstable sb-unstyled" },
            m.createElement(
              "thead",
              { className: "docblock-argstable-head" },
              m.createElement(
                "tr",
                null,
                m.createElement("th", null, m.createElement("span", null, "Name")),
                n ? null : m.createElement("th", null, m.createElement("span", null, "Description")),
                n ? null : m.createElement("th", null, m.createElement("span", null, "Default")),
                t
                  ? m.createElement(
                      "th",
                      null,
                      m.createElement(
                        s1,
                        null,
                        "Control",
                        " ",
                        !l &&
                          r &&
                          m.createElement(
                            i1,
                            { onClick: () => r(), title: "Reset controls" },
                            m.createElement(to, { "aria-hidden": !0 })
                          )
                      )
                    )
                  : null
              )
            ),
            m.createElement(
              "tbody",
              { className: "docblock-argstable-body" },
              p.ungrouped.map((A) => m.createElement(pn, { key: A.key, row: A, arg: c && c[A.key], ...S })),
              Object.entries(p.ungroupedSubsections).map(([A, k]) =>
                m.createElement(
                  ha,
                  { key: A, label: A, level: "subsection", colSpan: g },
                  k.map((T) => m.createElement(pn, { key: T.key, row: T, arg: c && c[T.key], expandable: x, ...S }))
                )
              ),
              Object.entries(p.sections).map(([A, k]) =>
                m.createElement(
                  ha,
                  { key: A, label: A, level: "section", colSpan: g },
                  k.ungrouped.map((T) => m.createElement(pn, { key: T.key, row: T, arg: c && c[T.key], ...S })),
                  Object.entries(k.subsections).map(([T, I]) =>
                    m.createElement(
                      ha,
                      { key: T, label: T, level: "subsection", colSpan: g },
                      I.map((D) => m.createElement(pn, { key: D.key, row: D, arg: c && c[D.key], expandable: x, ...S }))
                    )
                  )
                )
              )
            )
          )
        );
      };
    R.div(({ theme: e }) => ({
      marginRight: 30,
      fontSize: `${e.typography.size.s1}px`,
      color: e.base === "light" ? se(0.4, e.color.defaultText) : se(0.6, e.color.defaultText),
    }));
    R.div({ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" });
    R.div({
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      "&:not(:last-child)": { marginBottom: "1rem" },
    });
    R.div(Ut, ({ theme: e }) => ({ ...En(e), margin: "25px 0 40px", padding: "30px 20px" }));
    R.div(({ theme: e }) => ({ fontWeight: e.typography.weight.bold, color: e.color.defaultText }));
    R.div(({ theme: e }) => ({
      color: e.base === "light" ? se(0.2, e.color.defaultText) : se(0.6, e.color.defaultText),
    }));
    R.div({ flex: "0 0 30%", lineHeight: "20px", marginTop: 5 });
    R.div(({ theme: e }) => ({
      flex: 1,
      textAlign: "center",
      fontFamily: e.typography.fonts.mono,
      fontSize: e.typography.size.s1,
      lineHeight: 1,
      overflow: "hidden",
      color: e.base === "light" ? se(0.4, e.color.defaultText) : se(0.6, e.color.defaultText),
      "> div": { display: "inline-block", overflow: "hidden", maxWidth: "100%", textOverflow: "ellipsis" },
      span: { display: "block", marginTop: 2 },
    }));
    R.div({ display: "flex", flexDirection: "row" });
    R.div(({ background: e }) => ({
      position: "relative",
      flex: 1,
      "&::before": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: e,
        content: '""',
      },
    }));
    R.div(({ theme: e }) => ({
      ...En(e),
      display: "flex",
      flexDirection: "row",
      height: 50,
      marginBottom: 5,
      overflow: "hidden",
      backgroundColor: "white",
      backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)",
      backgroundClip: "padding-box",
    }));
    R.div({ display: "flex", flexDirection: "column", flex: 1, position: "relative", marginBottom: 30 });
    R.div({ flex: 1, display: "flex", flexDirection: "row" });
    R.div({ display: "flex", alignItems: "flex-start" });
    R.div({ flex: "0 0 30%" });
    R.div({ flex: 1 });
    R.div(({ theme: e }) => ({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 20,
      fontWeight: e.typography.weight.bold,
      color: e.base === "light" ? se(0.4, e.color.defaultText) : se(0.6, e.color.defaultText),
    }));
    R.div(({ theme: e }) => ({
      fontSize: e.typography.size.s2,
      lineHeight: "20px",
      display: "flex",
      flexDirection: "column",
    }));
    R.div(({ theme: e }) => ({
      fontFamily: e.typography.fonts.base,
      fontSize: e.typography.size.s2,
      color: e.color.defaultText,
      marginLeft: 10,
      lineHeight: 1.2,
    }));
    R.div(({ theme: e }) => ({
      ...En(e),
      overflow: "hidden",
      height: 40,
      width: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      "> img, > svg": { width: 20, height: 20 },
    }));
    R.div({
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      flex: "0 1 calc(20% - 10px)",
      minWidth: 120,
      margin: "0px 10px 30px 0",
    });
    R.div({ display: "flex", flexFlow: "row wrap" });
    globalThis &&
      globalThis.__DOCS_CONTEXT__ === void 0 &&
      ((globalThis.__DOCS_CONTEXT__ = ur(null)), (globalThis.__DOCS_CONTEXT__.displayName = "DocsContext"));
    var p1 = globalThis ? globalThis.__DOCS_CONTEXT__ : ur(null),
      f1 = Object.create,
      Rd = Object.defineProperty,
      h1 = Object.getOwnPropertyDescriptor,
      _d = Object.getOwnPropertyNames,
      m1 = Object.getPrototypeOf,
      y1 = Object.prototype.hasOwnProperty,
      $e = (e, t) =>
        function () {
          return t || (0, e[_d(e)[0]])((t = { exports: {} }).exports, t), t.exports;
        },
      g1 = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of _d(t))
            !y1.call(e, o) && o !== r && Rd(e, o, { get: () => t[o], enumerable: !(n = h1(t, o)) || n.enumerable });
        return e;
      },
      Ra = (e, t, r) => (
        (r = e != null ? f1(m1(e)) : {}),
        g1(t || !e || !e.__esModule ? Rd(r, "default", { value: e, enumerable: !0 }) : r, e)
      ),
      b1 = Lt(Gc(), 1),
      Pd = $e({
        "node_modules/has-symbols/shams.js"(e, t) {
          t.exports = function () {
            if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
            if (typeof Symbol.iterator == "symbol") return !0;
            var r = {},
              n = Symbol("test"),
              o = Object(n);
            if (
              typeof n == "string" ||
              Object.prototype.toString.call(n) !== "[object Symbol]" ||
              Object.prototype.toString.call(o) !== "[object Symbol]"
            )
              return !1;
            var a = 42;
            r[n] = a;
            for (n in r) return !1;
            if (
              (typeof Object.keys == "function" && Object.keys(r).length !== 0) ||
              (typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(r).length !== 0)
            )
              return !1;
            var i = Object.getOwnPropertySymbols(r);
            if (i.length !== 1 || i[0] !== n || !Object.prototype.propertyIsEnumerable.call(r, n)) return !1;
            if (typeof Object.getOwnPropertyDescriptor == "function") {
              var l = Object.getOwnPropertyDescriptor(r, n);
              if (l.value !== a || l.enumerable !== !0) return !1;
            }
            return !0;
          };
        },
      }),
      Fd = $e({
        "node_modules/has-symbols/index.js"(e, t) {
          var r = typeof Symbol < "u" && Symbol,
            n = Pd();
          t.exports = function () {
            return typeof r != "function" ||
              typeof Symbol != "function" ||
              typeof r("foo") != "symbol" ||
              typeof Symbol("bar") != "symbol"
              ? !1
              : n();
          };
        },
      }),
      E1 = $e({
        "node_modules/function-bind/implementation.js"(e, t) {
          var r = "Function.prototype.bind called on incompatible ",
            n = Array.prototype.slice,
            o = Object.prototype.toString,
            a = "[object Function]";
          t.exports = function (i) {
            var l = this;
            if (typeof l != "function" || o.call(l) !== a) throw new TypeError(r + l);
            for (
              var s = n.call(arguments, 1),
                c,
                d = function () {
                  if (this instanceof c) {
                    var g = l.apply(this, s.concat(n.call(arguments)));
                    return Object(g) === g ? g : this;
                  } else return l.apply(i, s.concat(n.call(arguments)));
                },
                p = Math.max(0, l.length - s.length),
                h = [],
                f = 0;
              f < p;
              f++
            )
              h.push("$" + f);
            if (
              ((c = Function(
                "binder",
                "return function (" + h.join(",") + "){ return binder.apply(this,arguments); }"
              )(d)),
              l.prototype)
            ) {
              var b = function () {};
              (b.prototype = l.prototype), (c.prototype = new b()), (b.prototype = null);
            }
            return c;
          };
        },
      }),
      _a = $e({
        "node_modules/function-bind/index.js"(e, t) {
          var r = E1();
          t.exports = Function.prototype.bind || r;
        },
      }),
      v1 = $e({
        "node_modules/has/src/index.js"(e, t) {
          var r = _a();
          t.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
        },
      }),
      Nd = $e({
        "node_modules/get-intrinsic/index.js"(e, t) {
          var r,
            n = SyntaxError,
            o = Function,
            a = TypeError,
            i = function ($) {
              try {
                return o('"use strict"; return (' + $ + ").constructor;")();
              } catch {}
            },
            l = Object.getOwnPropertyDescriptor;
          if (l)
            try {
              l({}, "");
            } catch {
              l = null;
            }
          var s = function () {
              throw new a();
            },
            c = l
              ? (function () {
                  try {
                    return arguments.callee, s;
                  } catch {
                    try {
                      return l(arguments, "callee").get;
                    } catch {
                      return s;
                    }
                  }
                })()
              : s,
            d = Fd()(),
            p =
              Object.getPrototypeOf ||
              function ($) {
                return $.__proto__;
              },
            h = {},
            f = typeof Uint8Array > "u" ? r : p(Uint8Array),
            b = {
              "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
              "%Array%": Array,
              "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
              "%ArrayIteratorPrototype%": d ? p([][Symbol.iterator]()) : r,
              "%AsyncFromSyncIteratorPrototype%": r,
              "%AsyncFunction%": h,
              "%AsyncGenerator%": h,
              "%AsyncGeneratorFunction%": h,
              "%AsyncIteratorPrototype%": h,
              "%Atomics%": typeof Atomics > "u" ? r : Atomics,
              "%BigInt%": typeof BigInt > "u" ? r : BigInt,
              "%Boolean%": Boolean,
              "%DataView%": typeof DataView > "u" ? r : DataView,
              "%Date%": Date,
              "%decodeURI%": decodeURI,
              "%decodeURIComponent%": decodeURIComponent,
              "%encodeURI%": encodeURI,
              "%encodeURIComponent%": encodeURIComponent,
              "%Error%": Error,
              "%eval%": eval,
              "%EvalError%": EvalError,
              "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
              "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
              "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
              "%Function%": o,
              "%GeneratorFunction%": h,
              "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
              "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
              "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
              "%isFinite%": isFinite,
              "%isNaN%": isNaN,
              "%IteratorPrototype%": d ? p(p([][Symbol.iterator]())) : r,
              "%JSON%": typeof JSON == "object" ? JSON : r,
              "%Map%": typeof Map > "u" ? r : Map,
              "%MapIteratorPrototype%": typeof Map > "u" || !d ? r : p(new Map()[Symbol.iterator]()),
              "%Math%": Math,
              "%Number%": Number,
              "%Object%": Object,
              "%parseFloat%": parseFloat,
              "%parseInt%": parseInt,
              "%Promise%": typeof Promise > "u" ? r : Promise,
              "%Proxy%": typeof Proxy > "u" ? r : Proxy,
              "%RangeError%": RangeError,
              "%ReferenceError%": ReferenceError,
              "%Reflect%": typeof Reflect > "u" ? r : Reflect,
              "%RegExp%": RegExp,
              "%Set%": typeof Set > "u" ? r : Set,
              "%SetIteratorPrototype%": typeof Set > "u" || !d ? r : p(new Set()[Symbol.iterator]()),
              "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
              "%String%": String,
              "%StringIteratorPrototype%": d ? p(""[Symbol.iterator]()) : r,
              "%Symbol%": d ? Symbol : r,
              "%SyntaxError%": n,
              "%ThrowTypeError%": c,
              "%TypedArray%": f,
              "%TypeError%": a,
              "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
              "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
              "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
              "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
              "%URIError%": URIError,
              "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
              "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
              "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
            },
            g = function $(H) {
              var w;
              if (H === "%AsyncFunction%") w = i("async function () {}");
              else if (H === "%GeneratorFunction%") w = i("function* () {}");
              else if (H === "%AsyncGeneratorFunction%") w = i("async function* () {}");
              else if (H === "%AsyncGenerator%") {
                var C = $("%AsyncGeneratorFunction%");
                C && (w = C.prototype);
              } else if (H === "%AsyncIteratorPrototype%") {
                var _ = $("%AsyncGenerator%");
                _ && (w = p(_.prototype));
              }
              return (b[H] = w), w;
            },
            x = {
              "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
              "%ArrayPrototype%": ["Array", "prototype"],
              "%ArrayProto_entries%": ["Array", "prototype", "entries"],
              "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
              "%ArrayProto_keys%": ["Array", "prototype", "keys"],
              "%ArrayProto_values%": ["Array", "prototype", "values"],
              "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
              "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
              "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
              "%BooleanPrototype%": ["Boolean", "prototype"],
              "%DataViewPrototype%": ["DataView", "prototype"],
              "%DatePrototype%": ["Date", "prototype"],
              "%ErrorPrototype%": ["Error", "prototype"],
              "%EvalErrorPrototype%": ["EvalError", "prototype"],
              "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
              "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
              "%FunctionPrototype%": ["Function", "prototype"],
              "%Generator%": ["GeneratorFunction", "prototype"],
              "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
              "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
              "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
              "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
              "%JSONParse%": ["JSON", "parse"],
              "%JSONStringify%": ["JSON", "stringify"],
              "%MapPrototype%": ["Map", "prototype"],
              "%NumberPrototype%": ["Number", "prototype"],
              "%ObjectPrototype%": ["Object", "prototype"],
              "%ObjProto_toString%": ["Object", "prototype", "toString"],
              "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
              "%PromisePrototype%": ["Promise", "prototype"],
              "%PromiseProto_then%": ["Promise", "prototype", "then"],
              "%Promise_all%": ["Promise", "all"],
              "%Promise_reject%": ["Promise", "reject"],
              "%Promise_resolve%": ["Promise", "resolve"],
              "%RangeErrorPrototype%": ["RangeError", "prototype"],
              "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
              "%RegExpPrototype%": ["RegExp", "prototype"],
              "%SetPrototype%": ["Set", "prototype"],
              "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
              "%StringPrototype%": ["String", "prototype"],
              "%SymbolPrototype%": ["Symbol", "prototype"],
              "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
              "%TypedArrayPrototype%": ["TypedArray", "prototype"],
              "%TypeErrorPrototype%": ["TypeError", "prototype"],
              "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
              "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
              "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
              "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
              "%URIErrorPrototype%": ["URIError", "prototype"],
              "%WeakMapPrototype%": ["WeakMap", "prototype"],
              "%WeakSetPrototype%": ["WeakSet", "prototype"],
            },
            S = _a(),
            A = v1(),
            k = S.call(Function.call, Array.prototype.concat),
            T = S.call(Function.apply, Array.prototype.splice),
            I = S.call(Function.call, String.prototype.replace),
            D = S.call(Function.call, String.prototype.slice),
            F = S.call(Function.call, RegExp.prototype.exec),
            P = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
            L = /\\(\\)?/g,
            B = function ($) {
              var H = D($, 0, 1),
                w = D($, -1);
              if (H === "%" && w !== "%") throw new n("invalid intrinsic syntax, expected closing `%`");
              if (w === "%" && H !== "%") throw new n("invalid intrinsic syntax, expected opening `%`");
              var C = [];
              return (
                I($, P, function (_, M, U, K) {
                  C[C.length] = U ? I(K, L, "$1") : M || _;
                }),
                C
              );
            },
            G = function ($, H) {
              var w = $,
                C;
              if ((A(x, w) && ((C = x[w]), (w = "%" + C[0] + "%")), A(b, w))) {
                var _ = b[w];
                if ((_ === h && (_ = g(w)), typeof _ > "u" && !H))
                  throw new a("intrinsic " + $ + " exists, but is not available. Please file an issue!");
                return { alias: C, name: w, value: _ };
              }
              throw new n("intrinsic " + $ + " does not exist!");
            };
          t.exports = function ($, H) {
            if (typeof $ != "string" || $.length === 0) throw new a("intrinsic name must be a non-empty string");
            if (arguments.length > 1 && typeof H != "boolean") throw new a('"allowMissing" argument must be a boolean');
            if (F(/^%?[^%]*%?$/, $) === null)
              throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
            var w = B($),
              C = w.length > 0 ? w[0] : "",
              _ = G("%" + C + "%", H),
              M = _.name,
              U = _.value,
              K = !1,
              re = _.alias;
            re && ((C = re[0]), T(w, k([0, 1], re)));
            for (var Z = 1, Y = !0; Z < w.length; Z += 1) {
              var ee = w[Z],
                ye = D(ee, 0, 1),
                le = D(ee, -1);
              if ((ye === '"' || ye === "'" || ye === "`" || le === '"' || le === "'" || le === "`") && ye !== le)
                throw new n("property names with quotes must have matching quotes");
              if (((ee === "constructor" || !Y) && (K = !0), (C += "." + ee), (M = "%" + C + "%"), A(b, M))) U = b[M];
              else if (U != null) {
                if (!(ee in U)) {
                  if (!H) throw new a("base intrinsic for " + $ + " exists, but the property is not available.");
                  return;
                }
                if (l && Z + 1 >= w.length) {
                  var Ae = l(U, ee);
                  (Y = !!Ae), Y && "get" in Ae && !("originalValue" in Ae.get) ? (U = Ae.get) : (U = U[ee]);
                } else (Y = A(U, ee)), (U = U[ee]);
                Y && !K && (b[M] = U);
              }
            }
            return U;
          };
        },
      }),
      x1 = $e({
        "node_modules/call-bind/index.js"(e, t) {
          var r = _a(),
            n = Nd(),
            o = n("%Function.prototype.apply%"),
            a = n("%Function.prototype.call%"),
            i = n("%Reflect.apply%", !0) || r.call(a, o),
            l = n("%Object.getOwnPropertyDescriptor%", !0),
            s = n("%Object.defineProperty%", !0),
            c = n("%Math.max%");
          if (s)
            try {
              s({}, "a", { value: 1 });
            } catch {
              s = null;
            }
          t.exports = function (p) {
            var h = i(r, a, arguments);
            if (l && s) {
              var f = l(h, "length");
              f.configurable && s(h, "length", { value: 1 + c(0, p.length - (arguments.length - 1)) });
            }
            return h;
          };
          var d = function () {
            return i(r, o, arguments);
          };
          s ? s(t.exports, "apply", { value: d }) : (t.exports.apply = d);
        },
      }),
      S1 = $e({
        "node_modules/call-bind/callBound.js"(e, t) {
          var r = Nd(),
            n = x1(),
            o = n(r("String.prototype.indexOf"));
          t.exports = function (a, i) {
            var l = r(a, !!i);
            return typeof l == "function" && o(a, ".prototype.") > -1 ? n(l) : l;
          };
        },
      }),
      w1 = $e({
        "node_modules/has-tostringtag/shams.js"(e, t) {
          var r = Pd();
          t.exports = function () {
            return r() && !!Symbol.toStringTag;
          };
        },
      }),
      A1 = $e({
        "node_modules/is-regex/index.js"(e, t) {
          var r = S1(),
            n = w1()(),
            o,
            a,
            i,
            l;
          n &&
            ((o = r("Object.prototype.hasOwnProperty")),
            (a = r("RegExp.prototype.exec")),
            (i = {}),
            (s = function () {
              throw i;
            }),
            (l = { toString: s, valueOf: s }),
            typeof Symbol.toPrimitive == "symbol" && (l[Symbol.toPrimitive] = s));
          var s,
            c = r("Object.prototype.toString"),
            d = Object.getOwnPropertyDescriptor,
            p = "[object RegExp]";
          t.exports = n
            ? function (h) {
                if (!h || typeof h != "object") return !1;
                var f = d(h, "lastIndex"),
                  b = f && o(f, "value");
                if (!b) return !1;
                try {
                  a(h, l);
                } catch (g) {
                  return g === i;
                }
              }
            : function (h) {
                return !h || (typeof h != "object" && typeof h != "function") ? !1 : c(h) === p;
              };
        },
      }),
      T1 = $e({
        "node_modules/is-function/index.js"(e, t) {
          t.exports = n;
          var r = Object.prototype.toString;
          function n(o) {
            if (!o) return !1;
            var a = r.call(o);
            return (
              a === "[object Function]" ||
              (typeof o == "function" && a !== "[object RegExp]") ||
              (typeof window < "u" &&
                (o === window.setTimeout || o === window.alert || o === window.confirm || o === window.prompt))
            );
          }
        },
      }),
      C1 = $e({
        "node_modules/is-symbol/index.js"(e, t) {
          var r = Object.prototype.toString,
            n = Fd()();
          n
            ? ((o = Symbol.prototype.toString),
              (a = /^Symbol\(.*\)$/),
              (i = function (l) {
                return typeof l.valueOf() != "symbol" ? !1 : a.test(o.call(l));
              }),
              (t.exports = function (l) {
                if (typeof l == "symbol") return !0;
                if (r.call(l) !== "[object Symbol]") return !1;
                try {
                  return i(l);
                } catch {
                  return !1;
                }
              }))
            : (t.exports = function (l) {
                return !1;
              });
          var o, a, i;
        },
      });
    Ra(A1());
    Ra(T1());
    Ra(C1());
    var k1 = typeof window == "object" && window && window.Object === Object && window,
      I1 = k1,
      O1 = typeof self == "object" && self && self.Object === Object && self,
      D1 = I1 || O1 || Function("return this")(),
      Pa = D1,
      R1 = Pa.Symbol,
      Zt = R1,
      Bd = Object.prototype,
      _1 = Bd.hasOwnProperty,
      P1 = Bd.toString,
      Sr = Zt ? Zt.toStringTag : void 0;
    function F1(e) {
      var t = _1.call(e, Sr),
        r = e[Sr];
      try {
        e[Sr] = void 0;
        var n = !0;
      } catch {}
      var o = P1.call(e);
      return n && (t ? (e[Sr] = r) : delete e[Sr]), o;
    }
    var N1 = F1,
      B1 = Object.prototype,
      j1 = B1.toString;
    function L1(e) {
      return j1.call(e);
    }
    var M1 = L1,
      U1 = "[object Null]",
      $1 = "[object Undefined]",
      Lc = Zt ? Zt.toStringTag : void 0;
    function q1(e) {
      return e == null ? (e === void 0 ? $1 : U1) : Lc && Lc in Object(e) ? N1(e) : M1(e);
    }
    var V1 = q1,
      Mc = Zt ? Zt.prototype : void 0;
    Mc && Mc.toString;
    function J1(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    var jd = J1,
      z1 = "[object AsyncFunction]",
      H1 = "[object Function]",
      G1 = "[object GeneratorFunction]",
      W1 = "[object Proxy]";
    function K1(e) {
      if (!jd(e)) return !1;
      var t = V1(e);
      return t == H1 || t == G1 || t == z1 || t == W1;
    }
    var Y1 = K1,
      X1 = Pa["__core-js_shared__"],
      ma = X1,
      Uc = (function () {
        var e = /[^.]+$/.exec((ma && ma.keys && ma.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function Q1(e) {
      return !!Uc && Uc in e;
    }
    var Z1 = Q1,
      eE = Function.prototype,
      tE = eE.toString;
    function rE(e) {
      if (e != null) {
        try {
          return tE.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    var nE = rE,
      oE = /[\\^$.*+?()[\]{}|]/g,
      aE = /^\[object .+?Constructor\]$/,
      iE = Function.prototype,
      sE = Object.prototype,
      lE = iE.toString,
      uE = sE.hasOwnProperty,
      cE = RegExp(
        "^" +
          lE
            .call(uE)
            .replace(oE, "\\$&")
            .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
          "$"
      );
    function dE(e) {
      if (!jd(e) || Z1(e)) return !1;
      var t = Y1(e) ? cE : aE;
      return t.test(nE(e));
    }
    var pE = dE;
    function fE(e, t) {
      return e?.[t];
    }
    var hE = fE;
    function mE(e, t) {
      var r = hE(e, t);
      return pE(r) ? r : void 0;
    }
    var Ld = mE;
    function yE(e, t) {
      return e === t || (e !== e && t !== t);
    }
    var gE = yE,
      bE = Ld(Object, "create"),
      Tr = bE;
    function EE() {
      (this.__data__ = Tr ? Tr(null) : {}), (this.size = 0);
    }
    var vE = EE;
    function xE(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    var SE = xE,
      wE = "__lodash_hash_undefined__",
      AE = Object.prototype,
      TE = AE.hasOwnProperty;
    function CE(e) {
      var t = this.__data__;
      if (Tr) {
        var r = t[e];
        return r === wE ? void 0 : r;
      }
      return TE.call(t, e) ? t[e] : void 0;
    }
    var kE = CE,
      IE = Object.prototype,
      OE = IE.hasOwnProperty;
    function DE(e) {
      var t = this.__data__;
      return Tr ? t[e] !== void 0 : OE.call(t, e);
    }
    var RE = DE,
      _E = "__lodash_hash_undefined__";
    function PE(e, t) {
      var r = this.__data__;
      return (this.size += this.has(e) ? 0 : 1), (r[e] = Tr && t === void 0 ? _E : t), this;
    }
    var FE = PE;
    function er(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    er.prototype.clear = vE;
    er.prototype.delete = SE;
    er.prototype.get = kE;
    er.prototype.has = RE;
    er.prototype.set = FE;
    var $c = er;
    function NE() {
      (this.__data__ = []), (this.size = 0);
    }
    var BE = NE;
    function jE(e, t) {
      for (var r = e.length; r--; ) if (gE(e[r][0], t)) return r;
      return -1;
    }
    var Sn = jE,
      LE = Array.prototype,
      ME = LE.splice;
    function UE(e) {
      var t = this.__data__,
        r = Sn(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : ME.call(t, r, 1), --this.size, !0;
    }
    var $E = UE;
    function qE(e) {
      var t = this.__data__,
        r = Sn(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    var VE = qE;
    function JE(e) {
      return Sn(this.__data__, e) > -1;
    }
    var zE = JE;
    function HE(e, t) {
      var r = this.__data__,
        n = Sn(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    var GE = HE;
    function tr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    tr.prototype.clear = BE;
    tr.prototype.delete = $E;
    tr.prototype.get = VE;
    tr.prototype.has = zE;
    tr.prototype.set = GE;
    var WE = tr,
      KE = Ld(Pa, "Map"),
      YE = KE;
    function XE() {
      (this.size = 0), (this.__data__ = { hash: new $c(), map: new (YE || WE)(), string: new $c() });
    }
    var QE = XE;
    function ZE(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    var ev = ZE;
    function tv(e, t) {
      var r = e.__data__;
      return ev(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    var wn = tv;
    function rv(e) {
      var t = wn(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    var nv = rv;
    function ov(e) {
      return wn(this, e).get(e);
    }
    var av = ov;
    function iv(e) {
      return wn(this, e).has(e);
    }
    var sv = iv;
    function lv(e, t) {
      var r = wn(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    var uv = lv;
    function rr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    rr.prototype.clear = QE;
    rr.prototype.delete = nv;
    rr.prototype.get = av;
    rr.prototype.has = sv;
    rr.prototype.set = uv;
    var Md = rr,
      cv = "Expected a function";
    function Fa(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function")) throw new TypeError(cv);
      var r = function () {
        var n = arguments,
          o = t ? t.apply(this, n) : n[0],
          a = r.cache;
        if (a.has(o)) return a.get(o);
        var i = e.apply(this, n);
        return (r.cache = a.set(o, i) || a), i;
      };
      return (r.cache = new (Fa.Cache || Md)()), r;
    }
    Fa.Cache = Md;
    var dv = Fa,
      pv = 500;
    function fv(e) {
      var t = dv(e, function (n) {
          return r.size === pv && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    var hv = fv,
      mv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      yv = /\\(\\)?/g;
    hv(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(mv, function (r, n, o, a) {
          t.push(o ? a.replace(yv, "$1") : n || r);
        }),
        t
      );
    });
    var gv = (e) => {
      let t = null,
        r = !1,
        n = !1,
        o = !1,
        a = "";
      if (e.indexOf("//") >= 0 || e.indexOf("/*") >= 0)
        for (let i = 0; i < e.length; i += 1)
          !t && !r && !n && !o
            ? e[i] === '"' || e[i] === "'" || e[i] === "`"
              ? (t = e[i])
              : e[i] === "/" && e[i + 1] === "*"
                ? (r = !0)
                : e[i] === "/" && e[i + 1] === "/"
                  ? (n = !0)
                  : e[i] === "/" && e[i + 1] !== "/" && (o = !0)
            : (t &&
                ((e[i] === t && e[i - 1] !== "\\") ||
                  (e[i] ===
                    `
` &&
                    t !== "`")) &&
                (t = null),
              o &&
                ((e[i] === "/" && e[i - 1] !== "\\") ||
                  e[i] ===
                    `
`) &&
                (o = !1),
              r && e[i - 1] === "/" && e[i - 2] === "*" && (r = !1),
              n &&
                e[i] ===
                  `
` &&
                (n = !1)),
            !r && !n && (a += e[i]);
      else a = e;
      return a;
    };
    (0, b1.default)(1e4)((e) => gv(e).replace(/\n\s*/g, "").trim());
    ur({ sources: {} });
    var { document: bv } = globalThis;
    function Ev(e, t) {
      e.channel.emit(ii, t);
    }
    $n.a;
    var Ud = ["h1", "h2", "h3", "h4", "h5", "h6"],
      vv = Ud.reduce(
        (e, t) => ({
          ...e,
          [t]: R(t)({
            "& svg": { position: "relative", top: "-0.1em", visibility: "hidden" },
            "&:hover svg": { visibility: "visible" },
          }),
        }),
        {}
      ),
      xv = R.a(() => ({
        float: "left",
        lineHeight: "inherit",
        paddingRight: "10px",
        marginLeft: "-24px",
        color: "inherit",
      })),
      Sv = ({ as: e, id: t, children: r, ...n }) => {
        let o = Za(p1),
          a = vv[e],
          i = `#${t}`;
        return m.createElement(
          a,
          { id: t, ...n },
          m.createElement(
            xv,
            {
              "aria-hidden": "true",
              href: i,
              tabIndex: -1,
              target: "_self",
              onClick: (l) => {
                bv.getElementById(t) && Ev(o, i);
              },
            },
            m.createElement(Li, null)
          ),
          r
        );
      },
      $d = (e) => {
        let { as: t, id: r, children: n, ...o } = e;
        if (r) return m.createElement(Sv, { as: t, id: r, ...o }, n);
        let a = t,
          { as: i, ...l } = e;
        return m.createElement(a, { ...qn(l, t) });
      };
    Ud.reduce((e, t) => ({ ...e, [t]: (r) => m.createElement($d, { as: t, ...r }) }), {});
    var wv = ((e) => ((e.INFO = "info"), (e.NOTES = "notes"), (e.DOCGEN = "docgen"), (e.AUTO = "auto"), e))(wv || {});
    Lt(mg());
    R.div(({ theme: e }) => ({ width: "10rem", "@media (max-width: 768px)": { display: "none" } }));
    R.div(({ theme: e }) => ({
      position: "fixed",
      bottom: 0,
      top: 0,
      width: "10rem",
      paddingTop: "4rem",
      paddingBottom: "2rem",
      overflowY: "auto",
      fontFamily: e.typography.fonts.base,
      fontSize: e.typography.size.s2,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      WebkitOverflowScrolling: "touch",
      "& *": { boxSizing: "border-box" },
      "& > .toc-wrapper > .toc-list": {
        paddingLeft: 0,
        borderLeft: `solid 2px ${e.color.mediumlight}`,
        ".toc-list": {
          paddingLeft: 0,
          borderLeft: `solid 2px ${e.color.mediumlight}`,
          ".toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${e.color.mediumlight}` },
        },
      },
      "& .toc-list-item": {
        position: "relative",
        listStyleType: "none",
        marginLeft: 20,
        paddingTop: 3,
        paddingBottom: 3,
      },
      "& .toc-list-item::before": {
        content: '""',
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        transform: "translateX(calc(-2px - 20px))",
        borderLeft: `solid 2px ${e.color.mediumdark}`,
        opacity: 0,
        transition: "opacity 0.2s",
      },
      "& .toc-list-item.is-active-li::before": { opacity: 1 },
      "& .toc-list-item > a": { color: e.color.defaultText, textDecoration: "none" },
      "& .toc-list-item.is-active-li > a": { fontWeight: 600, color: e.color.secondary, textDecoration: "none" },
    }));
    R.p(({ theme: e }) => ({
      fontWeight: 600,
      fontSize: "0.875em",
      color: e.textColor,
      textTransform: "uppercase",
      marginBottom: 10,
    }));
    var Av = ({ children: e, disableAnchor: t, ...r }) => {
      if (t || typeof e != "string") return m.createElement(Bn, null, e);
      let n = e.toLowerCase().replace(/[^a-z0-9]/gi, "-");
      return m.createElement($d, { as: "h2", id: n, ...r }, e);
    };
    R(Av)(({ theme: e }) => ({
      fontSize: `${e.typography.size.s2 - 1}px`,
      fontWeight: e.typography.weight.bold,
      lineHeight: "16px",
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      color: e.textMutedColor,
      border: 0,
      marginBottom: "12px",
      "&:first-of-type": { marginTop: "56px" },
    }));
    var Tv = Kn({ from: { transform: "translateY(40px)" }, to: { transform: "translateY(0)" } }),
      Cv = Kn({ from: { background: "var(--highlight-bg-color)" }, to: {} }),
      kv = R.div({ containerType: "size", position: "sticky", bottom: 0, height: 39, overflow: "hidden", zIndex: 1 }),
      Iv = R(Pn)(({ theme: e }) => ({
        "--highlight-bg-color": e.base === "dark" ? "#153B5B" : "#E0F0FF",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 6,
        padding: "6px 10px",
        animation: `${Tv} 300ms, ${Cv} 2s`,
        background: e.background.bar,
        borderTop: `1px solid ${e.appBorderColor}`,
        fontSize: e.typography.size.s2,
        "@container (max-width: 799px)": { flexDirection: "row", justifyContent: "flex-end" },
      })),
      Ov = R.div({ display: "flex", flex: "99 0 auto", alignItems: "center", marginLeft: 10, gap: 6 }),
      Dv = R.div(({ theme: e }) => ({
        display: "flex",
        flex: "1 0 0",
        alignItems: "center",
        gap: 2,
        color: e.color.mediumdark,
        fontSize: e.typography.size.s2,
      })),
      ya = R.div({
        "@container (max-width: 799px)": {
          lineHeight: 0,
          textIndent: "-9999px",
          "&::after": { content: "attr(data-short-label)", display: "block", lineHeight: "initial", textIndent: "0" },
        },
      }),
      Rv = R(Ve.Input)(({ theme: e }) => ({
        "::placeholder": { color: e.color.mediumdark },
        "&:invalid:not(:placeholder-shown)": { boxShadow: `${e.color.negative} 0 0 0 1px inset` },
      })),
      _v = ({ saveStory: e, createStory: t, resetArgs: r }) => {
        let n = m.useRef(null),
          [o, a] = m.useState(!1),
          [i, l] = m.useState(!1),
          [s, c] = m.useState(""),
          [d, p] = m.useState(null),
          h = async () => {
            o || (a(!0), await e().catch(() => {}), a(!1));
          },
          f = () => {
            l(!0), c(""), setTimeout(() => n.current?.focus(), 0);
          },
          b = (g) => {
            let x = g.target.value
              .replace(/^[^a-z]/i, "")
              .replace(/[^a-z0-9-_ ]/gi, "")
              .replaceAll(/([-_ ]+[a-z0-9])/gi, (S) => S.toUpperCase().replace(/[-_ ]/g, ""));
            c(x.charAt(0).toUpperCase() + x.slice(1));
          };
        return m.createElement(
          kv,
          { id: "save-from-controls" },
          m.createElement(
            Iv,
            null,
            m.createElement(
              Dv,
              null,
              m.createElement(
                ut,
                {
                  as: "div",
                  hasChrome: !1,
                  trigger: "hover",
                  tooltip: m.createElement(St, { note: "Save changes to story" }),
                },
                m.createElement(
                  ze,
                  { "aria-label": "Save changes to story", disabled: o, onClick: h },
                  m.createElement(_i, null),
                  m.createElement(ya, { "data-short-label": "Save" }, "Update story")
                )
              ),
              m.createElement(
                ut,
                {
                  as: "div",
                  hasChrome: !1,
                  trigger: "hover",
                  tooltip: m.createElement(St, { note: "Create new story with these settings" }),
                },
                m.createElement(
                  ze,
                  { "aria-label": "Create new story with these settings", onClick: f },
                  m.createElement(Zn, null),
                  m.createElement(ya, { "data-short-label": "New" }, "Create new story")
                )
              ),
              m.createElement(
                ut,
                { as: "div", hasChrome: !1, trigger: "hover", tooltip: m.createElement(St, { note: "Reset changes" }) },
                m.createElement(
                  ze,
                  { "aria-label": "Reset changes", onClick: () => r() },
                  m.createElement(to, null),
                  m.createElement("span", null, "Reset")
                )
              )
            ),
            m.createElement(
              Ov,
              null,
              m.createElement(
                ya,
                { "data-short-label": "Unsaved changes" },
                "You modified this story. Do you want to save your changes?"
              )
            ),
            m.createElement(
              He,
              { width: 350, open: i, onOpenChange: l },
              m.createElement(
                Ve,
                {
                  onSubmit: async (g) => {
                    if ((g.preventDefault(), !o))
                      try {
                        p(null), a(!0), await t(s.replace(/^[^a-z]/i, "").replaceAll(/[^a-z0-9]/gi, "")), l(!1), a(!1);
                      } catch (x) {
                        p(x.message), a(!1);
                      }
                  },
                  id: "create-new-story-form",
                },
                m.createElement(
                  He.Content,
                  null,
                  m.createElement(
                    He.Header,
                    null,
                    m.createElement(He.Title, null, "Create new story"),
                    m.createElement(He.Description, null, "This will add a new story to your existing stories file.")
                  ),
                  m.createElement(Rv, { onChange: b, placeholder: "Story export name", readOnly: o, ref: n, value: s }),
                  m.createElement(
                    He.Actions,
                    null,
                    m.createElement(
                      lt,
                      { disabled: o || !s, size: "medium", type: "submit", variant: "solid" },
                      "Create"
                    ),
                    m.createElement(
                      He.Dialog.Close,
                      { asChild: !0 },
                      m.createElement(lt, { disabled: o, size: "medium", type: "reset" }, "Cancel")
                    )
                  )
                )
              ),
              d && m.createElement(He.Error, null, d)
            )
          )
        );
      },
      qc = "addon-controls",
      qd = "controls",
      Vc = (e) => Object.entries(e).reduce((t, [r, n]) => (n !== void 0 ? Object.assign(t, { [r]: n }) : t), {}),
      Pv = R.div({
        display: "grid",
        gridTemplateRows: "1fr 39px",
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
      }),
      Fv = ({ saveStory: e, createStory: t }) => {
        let [r, n] = X(!0),
          [o, a, i, l] = wi(),
          [s] = Ai(),
          c = Wn(),
          { expanded: d, sort: p, presetColors: h, disableSaveFromUI: f = !1 } = Ti(qd, {}),
          { path: b, previewInitialized: g } = Ci();
        Se(() => {
          g && n(!1);
        }, [g]);
        let x = Object.values(c).some((k) => k?.control),
          S = Object.entries(c).reduce((k, [T, I]) => {
            let D = I?.control;
            return (
              typeof D != "object" || D?.type !== "color" || D?.presetColors
                ? (k[T] = I)
                : (k[T] = { ...I, control: { ...D, presetColors: h } }),
              k
            );
          }, {}),
          A = st(() => !!o && !!l && !wt(Vc(o), Vc(l)), [o, l]);
        return m.createElement(
          Pv,
          null,
          m.createElement(d1, {
            key: b,
            compact: !d && x,
            rows: S,
            args: o,
            globals: s,
            updateArgs: a,
            resetArgs: i,
            inAddonPanel: !0,
            sort: p,
            isLoading: r,
          }),
          x &&
            A &&
            Wu.CONFIG_TYPE === "DEVELOPMENT" &&
            f !== !0 &&
            m.createElement(_v, { resetArgs: i, saveStory: e, createStory: t })
        );
      };
    function Nv() {
      let e = Wn(),
        t = Object.values(e).filter((r) => r?.control && !r?.table?.disable).length;
      return m.createElement(
        "div",
        null,
        m.createElement(
          Ln,
          { col: 1 },
          m.createElement("span", { style: { display: "inline-block", verticalAlign: "middle" } }, "Controls"),
          t === 0 ? "" : m.createElement(_n, { status: "neutral" }, t)
        )
      );
    }
    var Jc = (e) => JSON.stringify(e, (t, r) => (typeof r == "function" ? "__sb_empty_function_arg__" : r));
    Mr.register(qc, (e) => {
      let t = Mr.getChannel(),
        r = async () => {
          let o = e.getCurrentStoryData();
          if (o.type !== "story") throw new Error("Not a story");
          try {
            let a = await Gn(t, zn, Br, {
              args: Jc(
                Object.entries(o.args || {}).reduce((i, [l, s]) => (wt(s, o.initialArgs?.[l]) || (i[l] = s), i), {})
              ),
              csfId: o.id,
              importPath: o.importPath,
            });
            e.addNotification({
              id: "save-story-success",
              icon: { name: "passed", color: Ur.positive },
              content: {
                headline: "Story saved",
                subHeadline: m.createElement(
                  m.Fragment,
                  null,
                  "Updated story ",
                  m.createElement("b", null, a.sourceStoryName),
                  "."
                ),
              },
              duration: 8e3,
            });
          } catch (a) {
            throw (
              (e.addNotification({
                id: "save-story-error",
                icon: { name: "failed", color: Ur.negative },
                content: {
                  headline: "Failed to save story",
                  subHeadline: a?.message || "Check the Storybook process on the command line for more details.",
                },
                duration: 8e3,
              }),
              a)
            );
          }
        },
        n = async (o) => {
          let a = e.getCurrentStoryData();
          if (a.type !== "story") throw new Error("Not a story");
          let i = await Gn(t, zn, Br, { args: a.args && Jc(a.args), csfId: a.id, importPath: a.importPath, name: o });
          e.addNotification({
            id: "save-story-success",
            icon: { name: "passed", color: Ur.positive },
            content: {
              headline: "Story created",
              subHeadline: m.createElement(
                m.Fragment,
                null,
                "Added story ",
                m.createElement("b", null, i.newStoryName),
                " based on ",
                m.createElement("b", null, i.sourceStoryName),
                "."
              ),
            },
            duration: 8e3,
            onClick: ({ onDismiss: l }) => {
              l(), e.selectStory(i.newStoryId);
            },
          });
        };
      Mr.add(qc, {
        title: Nv,
        type: Si.PANEL,
        paramKey: qd,
        render: ({ active: o }) =>
          !o || !e.getCurrentStoryData()
            ? null
            : m.createElement(Rn, { active: o }, m.createElement(Fv, { saveStory: r, createStory: n })),
      }),
        t.on(Br, (o) => {
          if (!o.success) return;
          let a = e.getCurrentStoryData();
          a.type === "story" && (e.resetStoryArgs(a), o.payload.newStoryId && e.selectStory(o.payload.newStoryId));
        });
    });
  })();
} catch (e) {
  console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
