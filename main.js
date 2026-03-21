    const wrap   = document.getElementById('canvasWrap');
    const canvas = document.getElementById('canvas');
    const mmVp   = document.getElementById('mmVp');

    const CW = 4800, CH = 3200;
    const MW = 148,  MH = 94;
    // content bounding box (islands span ~40→2540 × 30→1430)
    const MM_OX = 40, MM_OY = 30, MM_CW = 2500, MM_CH = 1400, MM_PAD = 10;
    const scX = (MW - MM_PAD*2) / MM_CW;
    const scY = (MH - MM_PAD*2) / MM_CH;

    let ox = 0, oy = 0;
    let dragging = false, sx, sy, sox, soy;

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function applyT() {
      const vw = wrap.clientWidth, vh = wrap.clientHeight;
      ox = clamp(ox, -(CW - vw * 0.35), vw * 0.35);
      oy = clamp(oy, -(CH - vh * 0.35), vh * 0.35);
      canvas.style.transform = `translate(${ox}px,${oy}px)`;
      // update minimap viewport — same content-bbox scale as dots
      const vw2 = vw * scX, vh2 = vh * scY;
      mmVp.style.width  = vw2 + 'px';
      mmVp.style.height = vh2 + 'px';
      mmVp.style.left   = clamp((-ox - MM_OX) * scX + MM_PAD, 0, MW - vw2) + 'px';
      mmVp.style.top    = clamp((-oy - MM_OY) * scY + MM_PAD, 0, MH - vh2) + 'px';
    }

    wrap.addEventListener('mousedown', e => {
      if (e.target.closest('a,button,.pill,.sb-item,.island-bubble,.deco-scatter')) return;
      dragging = true; sx = e.clientX; sy = e.clientY; sox = ox; soy = oy;
      document.body.classList.add('panning');
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ox = sox + e.clientX - sx; oy = soy + e.clientY - sy; applyT();
    });
    window.addEventListener('mouseup', () => { dragging = false; document.body.classList.remove('panning'); });

    wrap.addEventListener('touchstart', e => {
      const t = e.touches[0]; dragging = true;
      sx = t.clientX; sy = t.clientY; sox = ox; soy = oy;
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (!dragging) return;
      const t = e.touches[0]; ox = sox + t.clientX - sx; oy = soy + t.clientY - sy; applyT();
    }, { passive: true });
    window.addEventListener('touchend', () => { dragging = false; });

    // Nav → fly to island
    document.querySelectorAll('.sb-item[data-target]').forEach(item => {
      item.addEventListener('click', e => {
        const id = item.dataset.target;
        const el = document.getElementById('island-' + id);
        if (!el) return;

        document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Mobile: scroll to section + collapse nav
        if (window.innerWidth <= 640) {
          document.body.classList.add('sidebar-collapsed');
          setTimeout(() => {
            const headerH = document.querySelector('.sb-header').offsetHeight;
            const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 60);
          return;
        }

        // Desktop: fly canvas to island
        const vw = wrap.clientWidth, vh = wrap.clientHeight;
        const tx = -(el.offsetLeft - vw / 2 + el.offsetWidth / 2);
        const ty = -(el.offsetTop  - vh / 2 + el.offsetHeight / 2);
        const from = { x: ox, y: oy }, to = { x: tx, y: ty };
        const dur = 650, start = performance.now();
        const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
        const step = now => {
          const p = Math.min((now - start) / dur, 1), e2 = ease(p);
          ox = from.x + (to.x - from.x) * e2;
          oy = from.y + (to.y - from.y) * e2;
          applyT(); if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    });

    ox = 120; oy = -20;
    applyT();

    // Sidebar collapse toggle
    const toggleBtn  = document.getElementById('sidebarToggle');
    const revealBtn  = document.getElementById('sidebarReveal');
    function toggleSidebar() {
      document.body.classList.toggle('sidebar-collapsed');
      // after transition, recalc canvas
      setTimeout(applyT, 300);
    }
    toggleBtn.addEventListener('click', toggleSidebar);
    revealBtn.addEventListener('click', toggleSidebar);

    // Minimap dot click → fly to island (reuse same fly logic)
    function flyToIsland(id) {
      const el = document.getElementById('island-' + id);
      if (!el) return;
      const vw = wrap.clientWidth, vh = wrap.clientHeight;
      const tx = -(el.offsetLeft - vw / 2 + el.offsetWidth / 2);
      const ty = -(el.offsetTop  - vh / 2 + el.offsetHeight / 2);
      const from = { x: ox, y: oy }, to = { x: tx, y: ty };
      const dur = 650, start = performance.now();
      const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
      const step = now => {
        const p = Math.min((now - start) / dur, 1), e2 = ease(p);
        ox = from.x + (to.x - from.x) * e2;
        oy = from.y + (to.y - from.y) * e2;
        applyT(); if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
      const sbItem = document.querySelector(`.sb-item[data-target="${id}"]`);
      if (sbItem) sbItem.classList.add('active');
    }
    document.querySelectorAll('.mm-island[data-target]').forEach(dot => {
      dot.addEventListener('click', () => flyToIsland(dot.dataset.target));
    });

    // ── LANGUAGE SWITCHER ──────────────────────────────────────────
    const i18n = {
      en: {
        'sidebar.subtitle': 'Portfolio',
        'sidebar.sections': 'Sections',
        'sidebar.intro': 'Intro',
        'sidebar.work': 'Work',
        'sidebar.writing': 'Writing',
        'sidebar.about': 'About',
        'sidebar.things': 'Things',
        'sidebar.flight': 'Flight',
        'sidebar.skills': 'Skills & CV',
        'sidebar.drag': 'Drag',
        'sidebar.explore': ' to explore',
        'intro.eyebrow': 'AI · Mobile · SaaS · Complex Systems',
        'intro.pill.resume': 'CV \u2193',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': 'WORK',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': 'Bicycle Lane Inspection Optimization',
        'wcard1.desc': 'AI-assisted service concept that helps Hamburg engineers prioritize bicycle lane maintenance with citizen feedback.',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': 'Redesigned fragmented cross-store fashion shopping into a clearer native mobile checkout experience.',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Design System Overhaul',
        'wcard3.desc': 'Rebuilt the design system to cut component variants by 33% and make handoff clearer.',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS Onboarding Revamp',
        'wcard4.desc': "Redesigned Rezio's B2B onboarding, cutting setup time by 38% and raising SUS to 80.3.",
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': 'Notification Framework',
        'wcard5.desc': 'Built a notification governance framework and internal AI review tool for Pixel teams.',
        'about.badge': 'ABOUT',
        'about.bio.label': 'What I do',
        'about.offwork.label': 'Beyond work',
        'about.exp.label': 'Experience',
        'about.tools.label': 'Tools',
        'writing.badge': 'WRITING',
        'skills.badge': 'SKILLS & CV',
        'memo.quote': 'Travel allows you to see things from a different perspective, and that is essential for a designer.',
        'tip.wrenai': 'Text-to-SQL AI · natural language over data',
        'tip.pixel': 'Android OS · Google hardware design team',
        'tip.kkday': "Asia's leading travel e-commerce platform",
        'about.edu.label': 'Education',
        'about.subtitle': 'Profile',
        'writing.subtitle': 'Design thinking & notes',
        'edu.masters': 'M. Information Management',
        'edu.exchange': 'Exchange · HCI',
        'edu.bachelors': 'B. Information Management',
        'article1.title': 'Designing Trust in LLM Outputs',
        'article1.tag': 'AI UX',
        'article2.title': 'One-Tap Decisions: Mobile UX for In-Destination Travellers',
        'article2.tag': 'Mobile',
        'article3.title': 'When the Notification Is the Product',
        'article3.tag': 'Systems',
        'article4.title': 'Haptics as Feedback Language',
        'article4.tag': 'Interaction',
        'gate.status': 'Gate Open',
        'gate.info': 'Turning 29 in',
      },
      ja: {
        'sidebar.subtitle': '\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa',
        'sidebar.sections': '\u30bb\u30af\u30b7\u30e7\u30f3',
        'sidebar.intro': '\u30a4\u30f3\u30c8\u30ed',
        'sidebar.work': '\u4f5c\u54c1',
        'sidebar.writing': '\u57f7\u7b46',
        'sidebar.about': '\u81ea\u5df1\u7d39\u4ecb',
        'sidebar.things': '\u305d\u306e\u4ed6',
        'sidebar.flight': '\u65c5\u306e\u8a18\u9332',
        'sidebar.skills': '\u30b9\u30ad\u30eb & CV',
        'sidebar.drag': '\u30c9\u30e9\u30c3\u30b0',
        'sidebar.explore': '\u3067\u63a2\u7d22',
        'intro.eyebrow': 'AI · モバイル · SaaS · 複雑なシステム',
        'intro.headline': 'Iris Hsieh — 複雑なプロダクトを <span class="hl">整理し</span>、<span class="hl hl-pink">AI</span> と共に設計する。',
        'intro.bio': 'AI、SaaS、モバイル領域を横断するシニアプロダクトデザイナー。現在は <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 自然言語でデータを操作">Wren AI</a> に在籍し、これまでに <a data-tip="Android OS · Google ハードウェア設計チーム">Google Pixel</a> と <a data-tip="アジア最大の旅行 EC プラットフォーム">KKday</a> で、複雑なシステムをわかりやすい体験へ整理してきた。英国在住。ヨーロッパや日本での機会にもオープンです。',
        'intro.pill.resume': '\u5c65\u6b74\u66f8',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': '\u30e1\u30fc\u30eb',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自転車レーン検査最適化',
        'wcard1.desc': '市民の声を手がかりに、ハンブルクの自転車レーン整備の優先度判断を支える AI 活用ツール。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — オールフォーワン',
        'wcard2.desc': '分断された越境ファッション購入体験を、ネイティブでわかりやすいモバイルフローへ再設計。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'デザインシステム刷新',
        'wcard3.desc': 'コンポーネントを 33% 削減し、引き継ぎのしやすさを高めたデザインシステム再構築。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS オンボーディング刷新',
        'wcard4.desc': '設定時間を 38% 短縮し、SUS 80.3 を達成した B2B オンボーディング再設計。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知フレームワーク',
        'wcard5.desc': 'Pixel チーム向けに、通知ガバナンスの基盤と社内 AI レビュー支援ツールを構築。',
        'about.badge': '\u81ea\u5df1\u7d39\u4ecb',
        'about.bio.label': '\u696d\u52d9\u5185\u5bb9',
        'about.bio': '複雑なプロダクトを、チームが進めやすく、ユーザーが理解しやすい形に整理するのが仕事です。AI プロダクト、SaaS、モバイル領域を中心に、デザインシステム、ユーザビリティ改善、AI 活用ワークフローの設計に取り組んでいます。',
        'about.offwork.label': '\u30aa\u30d5\u30bf\u30a4\u30e0',
        'about.offwork': '34 都市以上を旅する中で、知らない場所でも人がどうやって空間や仕組みに順応するのかを観察してきました。そうした視点は、日々の設計判断にも戻ってきます。音楽は思考を整え、海はペースを戻してくれます。',
        'about.exp.label': '\u8077\u6b74',
        'about.tools.label': '\u30c4\u30fc\u30eb',
        'writing.badge': '\u57f7\u7b46',
        'skills.badge': '\u30b9\u30ad\u30eb & CV',
        'memo.quote': '旅は、物事を異なる視点で見る力を与えてくれる。デザイナーにとって、それは欠かせないものだ。',
        'tip.wrenai': 'Text-to-SQL AI · 自然言語でデータを操作',
        'tip.pixel': 'Android OS · Google ハードウェア設計チーム',
        'tip.kkday': 'アジア最大の旅行 EC プラットフォーム',
        'about.edu.label': '学歴',
        'about.subtitle': 'プロフィール',
        'writing.subtitle': 'デザイン思考とノート',
        'edu.masters': '情報管理学修士',
        'edu.exchange': '交換留学 · HCI',
        'edu.bachelors': '情報管理学学士',
        'article1.title': 'LLM 出力におけるトラストのデザイン',
        'article1.tag': 'AI UX',
        'article2.title': 'ワンタップで決断：旅先でのモバイル UX',
        'article2.tag': 'モバイル',
        'article3.title': '通知そのものがプロダクトになるとき',
        'article3.tag': 'システム',
        'article4.title': 'フィードバック言語としての触覚',
        'article4.tag': 'インタラクション',
        'gate.status': 'ゲートオープン',
        'gate.info': '29歳まであと',
      },
      'zh-tw': {
        'sidebar.subtitle': '\u4f5c\u54c1\u96c6',
        'sidebar.sections': '\u5206\u5340',
        'sidebar.intro': '\u4ecb\u7d39',
        'sidebar.work': '\u4f5c\u54c1',
        'sidebar.writing': '\u6587\u7ae0',
        'sidebar.about': '\u95dc\u65bc',
        'sidebar.things': '\u5176\u4ed6',
        'sidebar.flight': '\u65c5\u884c',
        'sidebar.skills': '\u6280\u80fd & \u5c65\u6b77',
        'sidebar.drag': '\u62d6\u66f3',
        'sidebar.explore': '\u4ee5\u63a2\u7d22',
        'intro.eyebrow': 'AI · 行動裝置 · SaaS · 複雜系統',
        'intro.headline': 'Iris Hsieh — 與 <span class="hl">AI</span> 協作，設計<span class="hl hl-pink">複雜產品</span>。',
        'intro.bio': '資深產品設計師，專注於 AI、SaaS 與行動產品系統。現任職於 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然語言查詢資料">Wren AI</a>，曾於 <a data-tip="Android OS · Google 硬體設計團隊">Google Pixel</a> 與 <a data-tip="亞洲領先的旅遊電商平台">KKday</a> 負責將複雜流程整理成清楚可用的體驗。現居英國，開放洽談歐洲及日本的職涯機會。',
        'intro.pill.resume': '\u5c65\u6b77',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '單車道檢查最佳化',
        'wcard1.desc': '以 AI 與市民回饋協助漢堡工程團隊判斷單車道維護優先順序。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': '把分散的跨店時尚購物流程，重新整理成更清楚的原生行動體驗。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '設計系統重建',
        'wcard3.desc': '重建設計系統，刪減 33% 變體，讓設計與工程交接更清楚。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 導入流程重設計',
        'wcard4.desc': '重新設計 Rezio 的 B2B 導入流程，讓設定時間縮短 38%，SUS 提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知框架',
        'wcard5.desc': '為 Pixel 團隊建立通知治理框架與內部 AI 審查工具。',
        'about.badge': '\u95dc\u65bc',
        'about.bio.label': '\u6211\u7684\u5de5\u4f5c',
        'about.bio': '我專注於把複雜產品整理成團隊更容易推進、使用者更容易理解的系統。工作核心涵蓋 AI 產品、SaaS 與行動體驗中的設計系統、易用性優化，以及 AI 輔助工作流程。',
        'about.offwork.label': '工作以外',
        'about.offwork': '旅行讓我持續觀察，人們如何在陌生環境中理解空間、建立信任、找到方向。走過 34 個以上的城市後，這些觀察也自然回到我的設計判斷裡。音樂讓我慢下來，海讓我重置節奏。',
        'about.exp.label': '\u5de5\u4f5c\u7d93\u6b77',
        'about.tools.label': '\u5de5\u5177',
        'writing.badge': '\u6587\u7ae0',
        'skills.badge': '\u6280\u80fd & \u5c65\u6b77',
        'memo.quote': '旅行讓你從不同角度看待事物，這對設計師來說是不可或缺的。',
        'tip.wrenai': 'Text-to-SQL AI · 以自然語言查詢資料',
        'tip.pixel': 'Android OS · Google 硬體設計團隊',
        'tip.kkday': '亞洲領先的旅遊電商平台',
        'about.edu.label': '學歷',
        'about.subtitle': '關於我',
        'writing.subtitle': '設計思維與筆記',
        'edu.masters': '資訊管理學碩士',
        'edu.exchange': '交換 · HCI',
        'edu.bachelors': '資訊管理學學士',
        'article1.title': '設計 LLM 輸出中的信任感',
        'article1.tag': 'AI UX',
        'article2.title': '一鍵決策：旅途中的行動端 UX',
        'article2.tag': '行動',
        'article3.title': '當通知本身就是產品',
        'article3.tag': '系統',
        'article4.title': '觸覺作為回饋語言',
        'article4.tag': '互動',
        'gate.status': '登機口開放',
        'gate.info': '距離 29 歲還有',
      },
      'zh-cn': {
        'sidebar.subtitle': '\u4f5c\u54c1\u96c6',
        'sidebar.sections': '\u5206\u533a',
        'sidebar.intro': '\u7b80\u4ecb',
        'sidebar.work': '\u4f5c\u54c1',
        'sidebar.writing': '\u6587\u7ae0',
        'sidebar.about': '\u5173\u4e8e',
        'sidebar.things': '\u5176\u4ed6',
        'sidebar.flight': '\u65c5\u884c',
        'sidebar.skills': '\u6280\u80fd & \u7b80\u5386',
        'sidebar.drag': '\u62d6\u62fd',
        'sidebar.explore': '\u4ee5\u63a2\u7d22',
        'intro.eyebrow': 'AI · 移动端 · SaaS · 复杂系统',
        'intro.headline': 'Iris Hsieh — 与 <span class="hl">AI</span> 协作，设计<span class="hl hl-pink">复杂产品</span>。',
        'intro.bio': '高级产品设计师，专注于 AI、SaaS 与移动产品系统。现任职于 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然语言查询数据">Wren AI</a>，曾在 <a data-tip="Android OS · Google 硬件设计团队">Google Pixel</a> 与 <a data-tip="亚洲领先的旅游电商平台">KKday</a> 负责将复杂流程整理成清晰可用的体验。现居英国，开放洽谈欧洲及日本的职业机会。',
        'intro.pill.resume': '\u7b80\u5386',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自行车道检查优化',
        'wcard1.desc': '结合 AI 与市民反馈，帮助汉堡工程团队判断自行车道维护优先级。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': '把分散的跨店时尚购物流程，重构为更清晰的原生移动体验。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '设计系统重建',
        'wcard3.desc': '重建设计系统，删减 33% 变体，让设计与工程交接更清晰。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 导入流程重设计',
        'wcard4.desc': '重新设计 Rezio 的 B2B 导入流程，让设定时间缩短 38%，SUS 提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知框架',
        'wcard5.desc': '为 Pixel 团队建立通知治理框架与内部 AI 审查工具。',
        'about.badge': '\u5173\u4e8e',
        'about.bio.label': '\u6211\u7684\u5de5\u4f5c',
        'about.bio': '我专注于把复杂产品整理成团队更容易推进、用户更容易理解的系统。工作核心涵盖 AI 产品、SaaS 与移动体验中的设计系统、易用性优化，以及 AI 辅助工作流。',
        'about.offwork.label': '\u5de5\u4f5c\u4e4b\u5916',
        'about.offwork': '旅行让我持续观察，人们如何在陌生环境中理解空间、建立信任、找到方向。走过 34 个以上的城市后，这些观察也自然回到我的设计判断里。音乐让我慢下来，大海让我重置节奏。',
        'about.exp.label': '\u5de5\u4f5c\u7ecf\u5386',
        'about.tools.label': '\u5de5\u5177',
        'writing.badge': '\u6587\u7ae0',
        'skills.badge': '\u6280\u80fd & \u7b80\u5386',
        'memo.quote': '旅行让你从不同角度看待事物，这对设计师来说是不可或缺的。',
        'tip.wrenai': 'Text-to-SQL AI · 以自然语言查询数据',
        'tip.pixel': 'Android OS · Google 硬件设计团队',
        'tip.kkday': '亚洲领先的旅游电商平台',
        'about.edu.label': '学历',
        'about.subtitle': '关于我',
        'writing.subtitle': '设计思维与笔记',
        'edu.masters': '信息管理学硕士',
        'edu.exchange': '交换 · HCI',
        'edu.bachelors': '信息管理学学士',
        'article1.title': '设计 LLM 输出中的信任感',
        'article1.tag': 'AI UX',
        'article2.title': '一键决策：旅途中的移动端 UX',
        'article2.tag': '移动端',
        'article3.title': '当通知本身就是产品',
        'article3.tag': '系统',
        'article4.title': '触觉作为反馈语言',
        'article4.tag': '交互',
        'gate.status': '登机口开放',
        'gate.info': '距离 29 岁还有',
      }
    };

    // Keys whose content should be set via textContent (plain text only, no child elements to preserve)
    // For elements with rich child HTML (intro.headline, intro.bio, about.bio, about.offwork),
    // we use textContent which replaces all children — acceptable since non-English translations are plain text.
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    // Store original innerHTML for elements with rich child content
    const richKeys = ['intro.headline', 'intro.bio', 'about.bio', 'about.offwork'];
    const originalHTML = {};
    richKeys.forEach(key => {
      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) originalHTML[key] = el.innerHTML;
    });

    // Pangu spacing: insert space between CJK and Latin/numbers
    function pangu(str) {
      if (!str) return str;
      return str
        .replace(/([\u3000-\u9fff\uff00-\uffef])([A-Za-z0-9])/g, '$1 $2')
        .replace(/([A-Za-z0-9])([\u3000-\u9fff\uff00-\uffef])/g, '$1 $2');
    }

    function applyLang(lang) {
      currentLang = lang;
      const t = i18n[lang];
      if (!t) return;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // For rich-HTML elements in English, always restore original markup
        if (richKeys.includes(key)) {
          if (key === 'intro.headline' || key === 'intro.bio') {
            // Always use innerHTML so spans/links render in every language
            if (lang === 'en') {
              if (originalHTML[key]) el.innerHTML = originalHTML[key];
            } else if (t[key]) {
              el.innerHTML = t[key];
            }
          } else {
            if (lang === 'en') {
              if (originalHTML[key]) el.innerHTML = originalHTML[key];
            } else if (t[key]) {
              el.textContent = pangu(t[key]);
            }
          }
          return;
        }
        if (t[key] !== undefined && t[key] !== '') {
          el.textContent = lang === 'en' ? t[key] : pangu(t[key]);
        }
      });
      langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
      // Update company tooltips
      const tips = t || i18n['en'];
      const bioEl = document.querySelector('.intro-bio');
      if (bioEl) {
        const [wren, pixel, kkday] = bioEl.querySelectorAll('a[data-tip]');
        if (wren)   wren.dataset.tip   = tips['tip.wrenai'] || wren.dataset.tip;
        if (pixel)  pixel.dataset.tip  = tips['tip.pixel']  || pixel.dataset.tip;
        if (kkday)  kkday.dataset.tip  = tips['tip.kkday']  || kkday.dataset.tip;
      }
      // Update html lang attribute (triggers CSS font-family switch)
      document.documentElement.lang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
      // Persist selection
      try { localStorage.setItem('portfolio-lang', lang); } catch(e) {}
    }

    // Restore saved language on load
    try {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved && i18n[saved]) applyLang(saved);
    } catch(e) {}

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    // Checklist stagger: assign --i to each skill item for CSS animation delay
    document.querySelectorAll('.sk-item').forEach((el, i) => {
      el.style.setProperty('--i', i);
    });

    // Checklist animation: 1s delay on Skills focus, persist until another section
    (() => {
      const skillsLink = document.querySelector('[data-target="skills"]');
      const skillsFrame = document.querySelector('.skills-frame');
      const otherLinks = document.querySelectorAll('.sb-item:not([data-target="skills"])');
      if (!skillsLink || !skillsFrame) return;

      let checkTimer = null;

      skillsLink.addEventListener('click', () => {
        // reset so re-clicking always replays after 1s
        clearTimeout(checkTimer);
        skillsFrame.classList.remove('is-checking');
        void skillsFrame.offsetWidth; // force reflow
        checkTimer = setTimeout(() => {
          skillsFrame.classList.add('is-checking');
        }, 1000);
      });

      // Remove checked state when navigating away to another section
      otherLinks.forEach(link => {
        link.addEventListener('click', () => {
          clearTimeout(checkTimer);
          skillsFrame.classList.remove('is-checking');
        });
      });
    })();

    // Blob fallback: fires only when server returns wrong MIME type (dev only)
    function fixVideoMime(v) {
      const url = (v.getAttribute('src') || v.src).split('?')[0] + '?_=' + Date.now();
      fetch(url, {cache: 'no-store'}).then(r => r.blob()).then(b => {
        v.src = URL.createObjectURL(new Blob([b], {type: 'video/mp4'}));
        v.load();
      }).catch(() => {});
    }
    document.querySelectorAll('video[src]').forEach(function(v) {
      if (v.error && v.error.code === 4) {
        fixVideoMime(v);
      } else {
        v.addEventListener('error', function onErr() {
          if (v.error && v.error.code === 4) {
            v.removeEventListener('error', onErr);
            fixVideoMime(v);
          }
        });
      }
    });

    // ── Ticket hover → airplane window city view ──────────────────────────
    (function() {
      const win = document.querySelector('.deco-window');
      if (!win) return;
      const cityViews = win.querySelectorAll('.city-view');

      document.querySelectorAll('.deco-scatter[data-city]').forEach(ticket => {
        ticket.addEventListener('mouseenter', () => {
          const city = ticket.dataset.city;
          win.classList.add('window-open');
          cityViews.forEach(v => {
            const active = v.dataset.city === city;
            v.classList.toggle('active', active);
            if (v.tagName === 'VIDEO') {
              if (active) { v.currentTime = 0; v.play(); }
              else v.pause();
            }
          });
        });
        ticket.addEventListener('mouseleave', () => {
          win.classList.remove('window-open');
          cityViews.forEach(v => {
            v.classList.remove('active');
            if (v.tagName === 'VIDEO') v.pause();
          });
        });
      });
    })();

    // ── Ticket hover → memo text swap ─────────────────────────────────────
    (function() {
      const memo = document.querySelector('.deco-memo');
      if (!memo) return;
      const quoteEl = memo.querySelector('.memo-quote-text');
      const attrEl  = memo.querySelector('.memo-attr');
      if (!quoteEl) return;

      document.querySelectorAll('.deco-scatter[data-memo]').forEach(ticket => {
        ticket.addEventListener('mouseenter', () => {
          quoteEl.textContent = ticket.dataset.memo;
          if (attrEl) attrEl.style.opacity = '0';
        });
        ticket.addEventListener('mouseleave', () => {
          quoteEl.textContent = 'Travel allows you to see things from a different perspective, and that is essential for a designer.';
          if (attrEl) attrEl.style.opacity = '1';
        });
      });
    })();

    // Gate card: days until 29th birthday (born 1997-10-12)
    (() => {
      const el = document.getElementById('gate-days');
      if (!el) return;
      const now = new Date();
      const bday = new Date(now.getFullYear(), 9, 12); // Oct 12 this year
      if (bday <= now) bday.setFullYear(bday.getFullYear() + 1);
      const days = Math.ceil((bday - now) / 86400000);
      el.textContent = days + 'd';
    })();

    // Gate card: pan canvas so card is centered in viewport on hover
    (() => {
      const gate = document.querySelector('.gate-deco');
      if (!gate) return;
      let savedOx, savedOy, focused = false;
      const DUR = 650;
      const EASE = `transform ${DUR}ms cubic-bezier(0.4,0,0.2,1)`;

      function restore() {
        focused = false;
        canvas.style.transition = EASE;
        ox = savedOx; oy = savedOy; applyT();
        setTimeout(() => { canvas.style.transition = ''; }, DUR);
      }

      gate.addEventListener('mouseenter', () => {
        if (focused) return;
        focused = true;
        savedOx = ox; savedOy = oy;
        const cardX = 1880 + gate.offsetWidth  / 2;
        const cardY = 280  + gate.offsetHeight / 2;
        canvas.style.transition = EASE;
        ox = wrap.clientWidth  / 2 - cardX;
        oy = wrap.clientHeight / 2 - cardY;
        applyT();

        // After pan completes, watch for mouse leaving — restore after 5s delay
        setTimeout(() => {
          if (!focused) return;
          let leaveTimer = null;
          function onMove(e) {
            if (!focused) { document.removeEventListener('mousemove', onMove); return; }
            const hw = gate.offsetWidth  / 2 + 28;
            const hh = gate.offsetHeight / 2 + 28;
            const cx = wrap.clientWidth  / 2;
            const cy = wrap.clientHeight / 2;
            const outside = e.clientX < cx - hw || e.clientX > cx + hw ||
                            e.clientY < cy - hh || e.clientY > cy + hh;
            if (outside && !leaveTimer) {
              leaveTimer = setTimeout(() => {
                document.removeEventListener('mousemove', onMove);
                restore();
              }, 5000);
            } else if (!outside && leaveTimer) {
              clearTimeout(leaveTimer);
              leaveTimer = null;
            }
          }
          document.addEventListener('mousemove', onMove);
        }, DUR);
      });
    })();

    // Window: pan canvas to center on hover
    (() => {
      const win = document.querySelector('.deco-window');
      if (!win) return;
      let savedOx, savedOy, focused = false;
      const DUR = 650;
      const EASE = `transform ${DUR}ms cubic-bezier(0.4,0,0.2,1)`;
      const WIN_X = 2350 + 170, WIN_Y = 80 + 170; // canvas center of window

      function restore() {
        focused = false;
        canvas.style.transition = EASE;
        ox = savedOx; oy = savedOy; applyT();
        setTimeout(() => { canvas.style.transition = ''; }, DUR);
      }

      win.addEventListener('mouseenter', () => {
        if (focused) return;
        focused = true;
        savedOx = ox; savedOy = oy;
        canvas.style.transition = EASE;
        ox = wrap.clientWidth  / 2 - WIN_X;
        oy = wrap.clientHeight / 2 - WIN_Y;
        applyT();

        setTimeout(() => {
          if (!focused) return;
          let leaveTimer = null;
          function onMove(e) {
            if (!focused) { document.removeEventListener('mousemove', onMove); return; }
            const hw = 170 + 40, hh = 170 + 40;
            const cx = wrap.clientWidth  / 2;
            const cy = wrap.clientHeight / 2;
            const outside = e.clientX < cx - hw || e.clientX > cx + hw ||
                            e.clientY < cy - hh || e.clientY > cy + hh;
            if (outside && !leaveTimer) {
              leaveTimer = setTimeout(() => {
                document.removeEventListener('mousemove', onMove);
                restore();
              }, 5000);
            } else if (!outside && leaveTimer) {
              clearTimeout(leaveTimer);
              leaveTimer = null;
            }
          }
          document.addEventListener('mousemove', onMove);
        }, DUR);
      });
    })();
