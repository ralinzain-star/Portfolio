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

    // Hash-on-load: fly to island if URL has #target (e.g. /#work from case study back button)
    const hashTarget = location.hash.replace('#', '');
    if (hashTarget && document.getElementById('island-' + hashTarget)) {
      setTimeout(() => {
        flyToIsland(hashTarget);
        history.replaceState(null, '', location.pathname);
      }, 120);
    }

    // ── LANGUAGE SWITCHER ──────────────────────────────────────────
    const i18n = {
      en: {
        'sidebar.subtitle': 'Portfolio',
        'sidebar.sections': 'Sections',
        'sidebar.intro': 'Intro',
        'sidebar.work': 'Work',
        'sidebar.writing': 'Playground',
        'sidebar.about': 'About',
        'sidebar.things': 'Things',
        'sidebar.flight': 'Flight',
        'sidebar.skills': 'Skills & CV',
        'sidebar.drag': 'Drag',
        'sidebar.explore': ' to explore',
        'intro.eyebrow': 'AI · Mobile · SaaS · Design System',
        'intro.headline': 'Iris Hsieh — Co-prospering with <span class="hl">AI</span>, defining the <span class="hl hl-pink">next possibility</span> of digital product experience.',
        'intro.bio': 'Senior Product Designer specializing in AI, SaaS, and mobile ecosystems. Currently at <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · natural language over data">Wren AI</a>. Previously crafted seamless experiences for <a data-tip="Android OS · Google hardware design team">Google Pixel</a> and <a data-tip="Asia\'s leading travel e-commerce platform">KKday</a>. UK-based, open to opportunities across Europe and Japan.',
        'intro.pill.resume': 'CV ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': 'WORK',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': 'Bicycle Lane Inspection Optimization',
        'wcard1.desc': 'AI-assisted service concept helping Hamburg engineers prioritize maintenance through synthesized citizen feedback.',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': 'Redesigned fragmented cross-border fashion shopping into a streamlined native mobile checkout experience.',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Design System Overhaul',
        'wcard3.desc': 'Architected a scalable system that reduced component variants by 33% and bridged the gap between design and code.',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS Onboarding Revamp',
        'wcard4.desc': "Optimized Rezio's B2B onboarding, cutting setup time by 38% and achieving a SUS score of 80.3.",
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': 'Notification Framework',
        'wcard5.desc': 'Established notification governance and internal AI-driven review tools for Google Pixel hardware teams.',
        'about.badge': 'ABOUT',
        'about.bio.label': 'What I do',
        'about.bio': 'I specialize in transforming complex product requirements into intuitive systems. My focus lies at the intersection of AI product logic, SaaS scalability, and mobile usability—building design systems and AI workflows that empower both teams and users.',
        'about.offwork.label': 'Beyond work',
        'about.offwork': 'Travel is my lens for observing how people adapt to new environments and build trust in systems. Having explored 34+ cities, these insights directly inform my design intuition. Music keeps my focus sharp, and the ocean resets my rhythm.',
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
        'writing.subtitle': 'Personal projects & explorations',
        'edu.masters': 'M. Information Management',
        'edu.exchange': 'Exchange · HCI',
        'edu.bachelors': 'B. Information Management',
        'article0.title': 'Reflections on Design: From Pixel-Perfect Obsession to the AI Cthulhu',
        'article0.tag': 'Reflection',
        'article1.title': 'Building a Claude Skill for Travel Planning',
        'article1.tag': 'Claude Skill',
        'gate.status': 'Gate Open',
        'gate.info': 'Turning 29 in',
      },
      'zh-tw': {
        'sidebar.subtitle': '作品集',
        'sidebar.sections': '分區',
        'sidebar.intro': '介紹',
        'sidebar.work': '作品',
        'sidebar.writing': '實驗場',
        'sidebar.about': '關於',
        'sidebar.things': '其他',
        'sidebar.flight': '旅行誌',
        'sidebar.skills': '技能 & 履歷',
        'sidebar.drag': '拖曳',
        'sidebar.explore': '來探索',
        'intro.eyebrow': 'AI · 行動裝置 · SaaS · 設計系統',
        'intro.headline': 'Iris Hsieh — 與 <span class="hl">AI</span> 共榮，定義數位產品體驗的<span class="hl hl-pink">下一種可能</span>。',
        'intro.bio': '資深產品設計師，深耕 AI、SaaS 與行動生態系統。現任職於 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然語言查詢資料">Wren AI</a>，曾於 <a data-tip="Android OS · Google 硬體設計團隊">Google Pixel</a> 與 <a data-tip="亞洲領先的旅遊電商平台">KKday</a> 負責將複雜邏輯轉化為優雅的互動體驗。現居英國，開放洽談歐洲及日本的合作機會。',
        'intro.pill.resume': '履歷 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '單車道檢查最佳化系統',
        'wcard1.desc': '運用 AI 整合市民回饋，協助漢堡城市工程團隊精準判斷道路維護的優先順序。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — 跨境時尚平台',
        'wcard2.desc': '重構分散的跨店購物流程，將其整合為直覺且流暢的原生行動端結帳體驗。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '設計系統全方位重塑',
        'wcard3.desc': '建立可擴充的元件規範，成功精簡 33% 的變體數量，並大幅提升開發交接效率。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 導入流程優化',
        'wcard4.desc': '重新設計 Rezio 的廠商導入流程，使設定時間縮短 38%，SUS 易用性評分提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知體驗治理框架',
        'wcard5.desc': '為 Google Pixel 團隊建立通知設計規範，並開發內部 AI 輔助審查工具。',
        'about.badge': '關於我',
        'about.bio.label': '核心專長',
        'about.bio': '我致力於將複雜的產品需求梳理成清晰的系統。我的工作核心在於 AI 產品邏輯、SaaS 擴充性與行動端易用性的交會點，透過設計系統與 AI 輔助工作流，同時賦能團隊與使用者。',
        'about.offwork.label': '工作之外',
        'about.offwork': '旅行是我觀察人們如何適應陌生環境、建立信任感的實驗場。走過 34 個以上的城市，這些觀察轉化為我的設計直覺。音樂協助我專注思考，海洋則讓我找回節奏。',
        'about.exp.label': '工作經歷',
        'about.tools.label': '設計工具',
        'writing.badge': '文章',
        'skills.badge': '技能 & 履歷',
        'memo.quote': '旅行讓你從不同角度看待事物，這對設計師來說是不可或缺的。',
        'tip.wrenai': 'Text-to-SQL AI · 以自然語言查詢資料',
        'tip.pixel': 'Android OS · Google 硬體設計團隊',
        'tip.kkday': '亞洲領先的旅遊電商平台',
        'about.edu.label': '學歷背景',
        'about.subtitle': '關於我',
        'writing.subtitle': '個人專案與探索',
        'edu.masters': '資訊管理碩士 (NTUST)',
        'edu.exchange': '交換學生 · HCI (TU Darmstadt)',
        'edu.bachelors': '資訊管理學士',
        'article0.title': '設計反思：從像素級的執著，到馴服 AI 克蘇魯',
        'article0.tag': '我的思考',
        'article1.title': '打造旅行規劃的 Claude Skill',
        'article1.tag': 'Claude Skill',
        'gate.status': '登機口開放',
        'gate.info': '距離 29 歲還有',
      },
      'zh-cn': {
        'sidebar.subtitle': '作品集',
        'sidebar.sections': '分区',
        'sidebar.intro': '介绍',
        'sidebar.work': '作品',
        'sidebar.writing': '实验场',
        'sidebar.about': '关于',
        'sidebar.things': '其他',
        'sidebar.flight': '旅行志',
        'sidebar.skills': '技能 & 简历',
        'sidebar.drag': '拖拽',
        'sidebar.explore': '来探索',
        'intro.eyebrow': 'AI · 移动端 · SaaS · 设计系统',
        'intro.headline': 'Iris Hsieh — 与 <span class="hl">AI</span> 共荣，定义数字产品体验的<span class="hl hl-pink">下一种可能</span>。',
        'intro.bio': '高级产品设计师，专注于 AI、SaaS 与移动生态系统。现就职于 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然语言查询数据">Wren AI</a>，曾在 <a data-tip="Android OS · Google 硬件设计团队">Google Pixel</a> 与 <a data-tip="亚洲领先的旅游电商平台">KKday</a> 负责将复杂逻辑转化为清晰可用的交互体验。现居英国，开放洽谈欧洲及日本的职场机会。',
        'intro.pill.resume': '简历 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自行车道检查优化系统',
        'wcard1.desc': '结合 AI 与市民反馈，协助汉堡城市工程团队精准判断道路维护的优先级。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — 跨境时尚平台',
        'wcard2.desc': '重构分散的跨店购物流程，将其整合为高效流畅的原生移动端结账体验。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '设计系统全方位重塑',
        'wcard3.desc': '建立可扩展的组件规范，成功精简 33% 的变体数量，并显著提升研发交付效率。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 导入流程优化',
        'wcard4.desc': '重新设计 Rezio 的厂商导入流程，使配置时间缩短 38%，SUS 易用性评分提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知体验治理框架',
        'wcard5.desc': '为 Google Pixel 团队建立通知设计规范，并开发内部 AI 辅助审核工具。',
        'about.badge': '关于我',
        'about.bio.label': '核心专长',
        'about.bio': '我专注于将复杂的业务需求梳理为直观的系统。我的工作核心位于 AI 产品逻辑、SaaS 扩展性与移动端易用性的交汇点，通过设计系统与 AI 辅助工作流，同时赋能团队与用户。',
        'about.offwork.label': '工作之外',
        'about.offwork': '旅行是我观察人们如何适应陌生环境、建立信任感的实验场。走过 34 个以上的城市后，这些观察转化为我的设计直觉。音乐协助我专注思考，大海则让我找回节奏。',
        'about.exp.label': '工作经历',
        'about.tools.label': '工具',
        'writing.badge': '文章',
        'skills.badge': '技能 & 简历',
        'memo.quote': '旅行让你从不同角度看待事物，这对设计师来说是不可或缺的。',
        'tip.wrenai': 'Text-to-SQL AI · 以自然语言查询数据',
        'tip.pixel': 'Android OS · Google 硬件设计团队',
        'tip.kkday': '亚洲领先的旅游电商平台',
        'about.edu.label': '学历背景',
        'about.subtitle': '关于我',
        'writing.subtitle': '个人专案与探索',
        'edu.masters': '信息管理硕士',
        'edu.exchange': '交换生 · HCI',
        'edu.bachelors': '信息管理学士',
        'article0.title': '设计反思：从像素级的执着，到驯服 AI 克苏鲁',
        'article0.tag': '我的思考',
        'article1.title': '打造旅行规划的 Claude Skill',
        'article1.tag': 'Claude Skill',
        'gate.status': '登机口开放',
        'gate.info': '距离 29 岁还有',
      },
      ja: {
        'sidebar.subtitle': 'ポートフォリオ',
        'sidebar.sections': 'セクション',
        'sidebar.intro': 'イントロ',
        'sidebar.work': '作品',
        'sidebar.writing': 'プレイグラウンド',
        'sidebar.about': '自己紹介',
        'sidebar.things': 'その他',
        'sidebar.flight': '旅の記録',
        'sidebar.skills': 'スキル & CV',
        'sidebar.drag': 'ドラッグ',
        'sidebar.explore': 'で探索',
        'intro.eyebrow': 'AI · モバイル · SaaS · デザインシステム',
        'intro.headline': 'Iris Hsieh — <span class="hl">AI</span> と共栄し、デジタルプロダクト体験の<span class="hl hl-pink">次なる可能性</span>を定義する。',
        'intro.bio': 'AI、SaaS、モバイル領域を横断するシニアプロダクトデザイナー。現在は <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 自然言語でデータを操作">Wren AI</a> に在籍し、これまでに <a data-tip="Android OS · Google ハードウェア設計チーム">Google Pixel</a> と <a data-tip="アジア最大の旅行 EC プラットフォーム">KKday</a> で、複雑なシステムをわかりやすい体験へ整理してきた。英国在住。ヨーロッパや日本での機会にもオープンです。',
        'intro.pill.resume': '履歴書 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'メール',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自転車レーン検査最適化',
        'wcard1.desc': '市民の声を手がかりに、ハンブルクの自転車レーン整備の優先度判断を支える AI 活用ツール。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — オールフォーワン',
        'wcard2.desc': '分断された越境ファッション購入体験を、ネイティブでわかりやすいモバイルフローへ再設計。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'デザインシステム刷新',
        'wcard3.desc': 'コンポーネントを 33% 削減し、エンジニアとの連携を円滑にするスケーラブルなシステムを構築。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS オンボーディング刷新',
        'wcard4.desc': '設定時間を 38% 短縮し、SUS 80.3 を達成した B2B オンボーディング再設計。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知フレームワーク',
        'wcard5.desc': 'Pixel チーム向けに、通知ガバナンスの基盤と社内 AI レビュー支援ツールを構築。',
        'about.badge': '自己紹介',
        'about.bio.label': '業務内容',
        'about.bio': '複雑なプロダクトを、チームが進めやすく、ユーザーが理解しやすい形に整理するのが仕事です。AI プロダクト、SaaS、モバイル領域を中心に、デザインシステム、ユーザビリティ改善、AI 活用ワークフローの設計に取り組んでいます。',
        'about.offwork.label': 'オフタイム',
        'about.offwork': '34 都市以上を旅する中で、知らない場所でも人がどうやって空間や仕組みに順応するのかを観察してきました。そうした視点は、日々の設計判断にも戻ってきます。音楽は思考を整え、海はペースを戻してくれます。',
        'about.exp.label': '職歴',
        'about.tools.label': 'ツール',
        'writing.badge': '執筆',
        'skills.badge': 'スキル & CV',
        'memo.quote': '旅は、物事を異なる視点で見る力を与えてくれる。デザイナーにとって、それは欠かせないものです。',
        'tip.wrenai': 'Text-to-SQL AI · 自然言語でデータを操作',
        'tip.pixel': 'Android OS · Google ハードウェア設計チーム',
        'tip.kkday': 'アジア最大の旅行 EC プラットフォーム',
        'about.edu.label': '学歴',
        'about.subtitle': 'プロフィール',
        'writing.subtitle': '個人プロジェクト',
        'edu.masters': '情報管理学修士',
        'edu.exchange': '交換留学 · HCI',
        'edu.bachelors': '情報管理学学士',
        'article0.title': 'デザインに関する考察：ピクセルパーフェクトへの執着からAIという未知の領域へ',
        'article0.tag': 'リフレクション',
        'article1.title': '旅行プランニング用 Claude Skill の構築',
        'article1.tag': 'Claude Skill',
        'gate.status': 'ゲートオープン',
        'gate.info': '29歳まであと',
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

    /* ── Article Popup ──────────────────────────── */
    (function() {
      var overlay = document.getElementById('article-overlay');
      if (!overlay) return;
      var titleEl = document.getElementById('article-popup-title');
      var body = document.getElementById('article-popup-body');
      var closeBtn = document.getElementById('article-popup-close');
      document.querySelectorAll('[data-article]').forEach(function(item) {
        item.addEventListener('click', function() {
          var tmpl = document.getElementById(item.dataset.article);
          if (!tmpl) return;
          var lang = document.documentElement.lang || 'en';
          var langKey = lang === 'zh-TW' ? 'zh-tw' : lang === 'zh-CN' ? 'zh-cn' : lang === 'ja' ? 'ja' : 'en';
          var titleKey = 'title' + (langKey !== 'en' ? '-' + langKey : '');
          titleEl.textContent = tmpl.dataset[titleKey.replace(/-([a-z])/g, function(m,c){return c.toUpperCase()})] || tmpl.dataset.title || '';
          var clone = tmpl.content.cloneNode(true);
          var allP = clone.querySelectorAll('p[data-lang]');
          allP.forEach(function(p) { if (p.dataset.lang !== langKey) p.remove(); });
          var articleVideo = clone.querySelector('.article-video');
          if (articleVideo) {
            var visiblePs = clone.querySelectorAll('p[data-lang]');
            if (visiblePs.length >= 2) visiblePs[1].after(articleVideo);
          }
          body.innerHTML = '';
          body.appendChild(clone);
          overlay.classList.add('open');
        });
      });
      closeBtn.addEventListener('click', function() { overlay.classList.remove('open'); });
      overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.classList.remove('open'); });
    })();
