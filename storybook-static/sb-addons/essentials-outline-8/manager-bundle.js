try {
  (() => {
    var t = __REACT__,
      {
        Children: k,
        Component: R,
        Fragment: P,
        Profiler: w,
        PureComponent: L,
        StrictMode: E,
        Suspense: D,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: H,
        cloneElement: v,
        createContext: x,
        createElement: M,
        createFactory: F,
        createRef: U,
        forwardRef: N,
        isValidElement: G,
        lazy: W,
        memo: u,
        startTransition: K,
        unstable_act: Y,
        useCallback: d,
        useContext: q,
        useDebugValue: V,
        useDeferredValue: Z,
        useEffect: p,
        useId: z,
        useImperativeHandle: J,
        useInsertionEffect: Q,
        useLayoutEffect: X,
        useMemo: $,
        useReducer: j,
        useRef: oo,
        useState: no,
        useSyncExternalStore: eo,
        useTransition: co,
        version: to,
      } = __REACT__;
    var io = __STORYBOOK_API__,
      {
        ActiveTabs: so,
        Consumer: uo,
        ManagerContext: po,
        Provider: mo,
        RequestResponseError: So,
        addons: l,
        combineParameters: Co,
        controlOrMetaKey: ho,
        controlOrMetaSymbol: Ao,
        eventMatchesShortcut: To,
        eventToShortcut: _o,
        experimental_requestResponse: bo,
        isMacLike: go,
        isShortcutTaken: yo,
        keyToSymbol: Oo,
        merge: Bo,
        mockChannel: fo,
        optionOrAltSymbol: ko,
        shortcutMatchesShortcut: Ro,
        shortcutToHumanString: Po,
        types: m,
        useAddonState: wo,
        useArgTypes: Lo,
        useArgs: Eo,
        useChannel: Do,
        useGlobalTypes: Ho,
        useGlobals: S,
        useParameter: vo,
        useSharedState: xo,
        useStoryPrepared: Mo,
        useStorybookApi: C,
        useStorybookState: Fo,
      } = __STORYBOOK_API__;
    var Ko = __STORYBOOK_COMPONENTS__,
      {
        A: Yo,
        ActionBar: qo,
        AddonPanel: Vo,
        Badge: Zo,
        Bar: zo,
        Blockquote: Jo,
        Button: Qo,
        ClipboardCode: Xo,
        Code: $o,
        DL: jo,
        Div: on,
        DocumentWrapper: nn,
        EmptyTabContent: en,
        ErrorFormatter: cn,
        FlexBar: tn,
        Form: rn,
        H1: In,
        H2: an,
        H3: ln,
        H4: sn,
        H5: un,
        H6: dn,
        HR: pn,
        IconButton: h,
        IconButtonSkeleton: mn,
        Icons: Sn,
        Img: Cn,
        LI: hn,
        Link: An,
        ListItem: Tn,
        Loader: _n,
        Modal: bn,
        OL: gn,
        P: yn,
        Placeholder: On,
        Pre: Bn,
        ResetWrapper: fn,
        ScrollArea: kn,
        Separator: Rn,
        Spaced: Pn,
        Span: wn,
        StorybookIcon: Ln,
        StorybookLogo: En,
        Symbols: Dn,
        SyntaxHighlighter: Hn,
        TT: vn,
        TabBar: xn,
        TabButton: Mn,
        TabWrapper: Fn,
        Table: Un,
        Tabs: Nn,
        TabsState: Gn,
        TooltipLinkList: Wn,
        TooltipMessage: Kn,
        TooltipNote: Yn,
        UL: qn,
        WithTooltip: Vn,
        WithTooltipPure: Zn,
        Zoom: zn,
        codeCommon: Jn,
        components: Qn,
        createCopyToClipboardFunction: Xn,
        getStoryHref: $n,
        icons: jn,
        interleaveSeparators: oe,
        nameSpaceClassNames: ne,
        resetComponents: ee,
        withReset: ce,
      } = __STORYBOOK_COMPONENTS__;
    var le = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: ie,
        AccessibilityIcon: se,
        AddIcon: ue,
        AdminIcon: de,
        AlertAltIcon: pe,
        AlertIcon: me,
        AlignLeftIcon: Se,
        AlignRightIcon: Ce,
        AppleIcon: he,
        ArrowBottomLeftIcon: Ae,
        ArrowBottomRightIcon: Te,
        ArrowDownIcon: _e,
        ArrowLeftIcon: be,
        ArrowRightIcon: ge,
        ArrowSolidDownIcon: ye,
        ArrowSolidLeftIcon: Oe,
        ArrowSolidRightIcon: Be,
        ArrowSolidUpIcon: fe,
        ArrowTopLeftIcon: ke,
        ArrowTopRightIcon: Re,
        ArrowUpIcon: Pe,
        AzureDevOpsIcon: we,
        BackIcon: Le,
        BasketIcon: Ee,
        BatchAcceptIcon: De,
        BatchDenyIcon: He,
        BeakerIcon: ve,
        BellIcon: xe,
        BitbucketIcon: Me,
        BoldIcon: Fe,
        BookIcon: Ue,
        BookmarkHollowIcon: Ne,
        BookmarkIcon: Ge,
        BottomBarIcon: We,
        BottomBarToggleIcon: Ke,
        BoxIcon: Ye,
        BranchIcon: qe,
        BrowserIcon: Ve,
        ButtonIcon: Ze,
        CPUIcon: ze,
        CalendarIcon: Je,
        CameraIcon: Qe,
        CategoryIcon: Xe,
        CertificateIcon: $e,
        ChangedIcon: je,
        ChatIcon: oc,
        CheckIcon: nc,
        ChevronDownIcon: ec,
        ChevronLeftIcon: cc,
        ChevronRightIcon: tc,
        ChevronSmallDownIcon: rc,
        ChevronSmallLeftIcon: Ic,
        ChevronSmallRightIcon: ac,
        ChevronSmallUpIcon: lc,
        ChevronUpIcon: ic,
        ChromaticIcon: sc,
        ChromeIcon: uc,
        CircleHollowIcon: dc,
        CircleIcon: pc,
        ClearIcon: mc,
        CloseAltIcon: Sc,
        CloseIcon: Cc,
        CloudHollowIcon: hc,
        CloudIcon: Ac,
        CogIcon: Tc,
        CollapseIcon: _c,
        CommandIcon: bc,
        CommentAddIcon: gc,
        CommentIcon: yc,
        CommentsIcon: Oc,
        CommitIcon: Bc,
        CompassIcon: fc,
        ComponentDrivenIcon: kc,
        ComponentIcon: Rc,
        ContrastIcon: Pc,
        ControlsIcon: wc,
        CopyIcon: Lc,
        CreditIcon: Ec,
        CrossIcon: Dc,
        DashboardIcon: Hc,
        DatabaseIcon: vc,
        DeleteIcon: xc,
        DiamondIcon: Mc,
        DirectionIcon: Fc,
        DiscordIcon: Uc,
        DocChartIcon: Nc,
        DocListIcon: Gc,
        DocumentIcon: Wc,
        DownloadIcon: Kc,
        DragIcon: Yc,
        EditIcon: qc,
        EllipsisIcon: Vc,
        EmailIcon: Zc,
        ExpandAltIcon: zc,
        ExpandIcon: Jc,
        EyeCloseIcon: Qc,
        EyeIcon: Xc,
        FaceHappyIcon: $c,
        FaceNeutralIcon: jc,
        FaceSadIcon: ot,
        FacebookIcon: nt,
        FailedIcon: et,
        FastForwardIcon: ct,
        FigmaIcon: tt,
        FilterIcon: rt,
        FlagIcon: It,
        FolderIcon: at,
        FormIcon: lt,
        GDriveIcon: it,
        GithubIcon: st,
        GitlabIcon: ut,
        GlobeIcon: dt,
        GoogleIcon: pt,
        GraphBarIcon: mt,
        GraphLineIcon: St,
        GraphqlIcon: Ct,
        GridAltIcon: ht,
        GridIcon: At,
        GrowIcon: Tt,
        HeartHollowIcon: _t,
        HeartIcon: bt,
        HomeIcon: gt,
        HourglassIcon: yt,
        InfoIcon: Ot,
        ItalicIcon: Bt,
        JumpToIcon: ft,
        KeyIcon: kt,
        LightningIcon: Rt,
        LightningOffIcon: Pt,
        LinkBrokenIcon: wt,
        LinkIcon: Lt,
        LinkedinIcon: Et,
        LinuxIcon: Dt,
        ListOrderedIcon: Ht,
        ListUnorderedIcon: vt,
        LocationIcon: xt,
        LockIcon: Mt,
        MarkdownIcon: Ft,
        MarkupIcon: Ut,
        MediumIcon: Nt,
        MemoryIcon: Gt,
        MenuIcon: Wt,
        MergeIcon: Kt,
        MirrorIcon: Yt,
        MobileIcon: qt,
        MoonIcon: Vt,
        NutIcon: Zt,
        OutboxIcon: zt,
        OutlineIcon: A,
        PaintBrushIcon: Jt,
        PaperClipIcon: Qt,
        ParagraphIcon: Xt,
        PassedIcon: $t,
        PhoneIcon: jt,
        PhotoDragIcon: or,
        PhotoIcon: nr,
        PinAltIcon: er,
        PinIcon: cr,
        PlayAllHollowIcon: tr,
        PlayBackIcon: rr,
        PlayHollowIcon: Ir,
        PlayIcon: ar,
        PlayNextIcon: lr,
        PlusIcon: ir,
        PointerDefaultIcon: sr,
        PointerHandIcon: ur,
        PowerIcon: dr,
        PrintIcon: pr,
        ProceedIcon: mr,
        ProfileIcon: Sr,
        PullRequestIcon: Cr,
        QuestionIcon: hr,
        RSSIcon: Ar,
        RedirectIcon: Tr,
        ReduxIcon: _r,
        RefreshIcon: br,
        ReplyIcon: gr,
        RepoIcon: yr,
        RequestChangeIcon: Or,
        RewindIcon: Br,
        RulerIcon: fr,
        SaveIcon: kr,
        SearchIcon: Rr,
        ShareAltIcon: Pr,
        ShareIcon: wr,
        ShieldIcon: Lr,
        SideBySideIcon: Er,
        SidebarAltIcon: Dr,
        SidebarAltToggleIcon: Hr,
        SidebarIcon: vr,
        SidebarToggleIcon: xr,
        SpeakerIcon: Mr,
        StackedIcon: Fr,
        StarHollowIcon: Ur,
        StarIcon: Nr,
        StatusFailIcon: Gr,
        StatusPassIcon: Wr,
        StatusWarnIcon: Kr,
        StickerIcon: Yr,
        StopAltHollowIcon: qr,
        StopAltIcon: Vr,
        StopIcon: Zr,
        StorybookIcon: zr,
        StructureIcon: Jr,
        SubtractIcon: Qr,
        SunIcon: Xr,
        SupportIcon: $r,
        SwitchAltIcon: jr,
        SyncIcon: oI,
        TabletIcon: nI,
        ThumbsUpIcon: eI,
        TimeIcon: cI,
        TimerIcon: tI,
        TransferIcon: rI,
        TrashIcon: II,
        TwitterIcon: aI,
        TypeIcon: lI,
        UbuntuIcon: iI,
        UndoIcon: sI,
        UnfoldIcon: uI,
        UnlockIcon: dI,
        UnpinIcon: pI,
        UploadIcon: mI,
        UserAddIcon: SI,
        UserAltIcon: CI,
        UserIcon: hI,
        UsersIcon: AI,
        VSCodeIcon: TI,
        VerifiedIcon: _I,
        VideoIcon: bI,
        WandIcon: gI,
        WatchIcon: yI,
        WindowsIcon: OI,
        WrenchIcon: BI,
        XIcon: fI,
        YoutubeIcon: kI,
        ZoomIcon: RI,
        ZoomOutIcon: PI,
        ZoomResetIcon: wI,
        iconList: LI,
      } = __STORYBOOK_ICONS__;
    var i = "storybook/outline",
      T = "outline",
      _ = u(function () {
        let [c, r] = S(),
          s = C(),
          I = [!0, "true"].includes(c[T]),
          a = d(() => r({ [T]: !I }), [I]);
        return (
          p(() => {
            s.setAddonShortcut(i, {
              label: "Toggle Outline",
              defaultShortcut: ["alt", "O"],
              actionName: "outline",
              showInMenu: !1,
              action: a,
            });
          }, [a, s]),
          t.createElement(
            h,
            { key: "outline", active: I, title: "Apply outlines to the preview", onClick: a },
            t.createElement(A, null)
          )
        );
      });
    l.register(i, () => {
      l.add(i, {
        title: "Outline",
        type: m.TOOL,
        match: ({ viewMode: c, tabId: r }) => !!(c && c.match(/^(story|docs)$/)) && !r,
        render: () => t.createElement(_, null),
      });
    });
  })();
} catch (e) {
  console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
