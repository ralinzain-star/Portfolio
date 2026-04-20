    // Sidebar defaults to expanded at all widths

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
        const TOP_PAD = 64;
        const tx = -(el.offsetLeft - vw / 2 + el.offsetWidth / 2);
        // Top-anchor so the island title stays visible; center short islands that fit comfortably.
        const ty = el.offsetHeight + TOP_PAD * 2 <= vh
          ? -(el.offsetTop - vh / 2 + el.offsetHeight / 2)
          : -(el.offsetTop - TOP_PAD);
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

    // Mobile: start with sidebar collapsed
    if (window.innerWidth <= 640) {
      document.body.classList.add('sidebar-collapsed');
    }

    // Minimap dot click → fly to island (reuse same fly logic)
    function flyToIsland(id) {
      const el = document.getElementById('island-' + id);
      if (!el) return;
      const vw = wrap.clientWidth, vh = wrap.clientHeight;
      const TOP_PAD = 64;
      const tx = -(el.offsetLeft - vw / 2 + el.offsetWidth / 2);
      const ty = el.offsetHeight + TOP_PAD * 2 <= vh
        ? -(el.offsetTop - vh / 2 + el.offsetHeight / 2)
        : -(el.offsetTop - TOP_PAD);
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
        'intro.bio': 'Senior Product Designer specializing in AI, SaaS, and mobile ecosystems. Currently at <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · natural language over data">Wren AI</a>. Previously crafted seamless experiences for <a data-tip="Android OS · Google hardware design team">Google Pixel</a> and <a data-tip="Asia\'s leading travel e-commerce platform">KKday</a>. Relocating to the UK or Japan, open to opportunities in both.',
        'intro.bio2': 'If you want to see how I design AI products, start with <a href="case-studies/wren-agent.html">One Product, Three Minds</a>, my rethink of conversational BI at Wren AI; <a href="case-studies/thread-tracing.html">Closing the Loop</a>, on feedback systems that turn user signals into model instructions; or <a href="case-studies/lsbg.html">Bicycle Lane Inspection</a>, an AI-assisted civic tool built for Hamburg\'s road maintenance team. For mobile systems work, there\'s the <a href="case-studies/notification.html">Notification Framework</a> I led at Google Pixel, and <a href="case-studies/a41.html">A41</a>, a native cross-store shopping experience I designed at Fable. For B2B SaaS, I built the <a href="case-studies/rezio-ds.html">Rezio Design System</a> at KKday and redesigned the <a href="case-studies/rezio.html">Rezio onboarding flow</a> that cut vendor setup time by 38%.',
        'intro.bio3': 'For how I think about AI and design more broadly, browse my <a href="#island-writing">Playground</a>, especially <a href="case-studies/designing-with-ai.html">Designing with AI</a>, where I document the workflow that lets one designer carry 6–8 FTE of scope across parallel projects. I\'m currently building <a href="case-studies/trip-planner.html">Trip Planner</a>, a Claude Code skill that turns travel research into interactive HTML guides.',
        'intro.pill.resume': 'CV ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'ralinzain@gmail.com',
        'work.badge': 'WORK',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': 'Bicycle Lane Inspection Optimization',
        'wcard1.desc': 'AI-assisted service concept helping Hamburg engineers prioritize maintenance through synthesized citizen feedback.',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': 'Redesigned fragmented cross-border fashion shopping into a streamlined native mobile checkout experience.',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Rezio Design System Overhaul',
        'wcard3.desc': 'Built a scalable design system for Rezio, leveraging advanced Figma architecture to reduce component variants by 33% and dramatically streamline the design-to-dev handoff.',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS Onboarding Revamp',
        'wcard4.desc': "Optimized Rezio's B2B onboarding, cutting setup time by 38% and achieving a SUS score of 80.3.",
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': 'Notification Framework',
        'wcard5.desc': 'Established notification governance and internal AI-driven review tools for Google Pixel hardware teams.',
        'wcard6.co': 'Wren AI · 2025',
        'wcard6.title': 'Sidebar IA Restructure',
        'wcard6.desc': 'Realigned the sidebar IA with a pivot in business strategy — elevated Threads, reshaped Credit for the Free Plan, retired unused tutorials. +20% active usage.',
        'wcard7.co': 'Wren AI · 2026',
        'wcard7.title': 'One Product, Three Minds: Rethinking Conversational BI',
        'wcard7.desc': 'Researched 1,600+ BI queries and designed a rolling-confirmation pattern for Wren AI\'s new Agent mode.',
        'wcard8.co': 'Wren AI · 2026',
        'wcard8.title': 'Closing the Loop: Designing AI Feedback Systems',
        'wcard8.desc': 'Designed Thread Tracing — an AI feedback observability system grounded in Google\'s PAIR framework that closes the loop from user signals to model instructions.',
        'wcard10.co': 'Wren AI · 2026',
        'wcard10.title': 'Designing with AI: A Systems-Level Workflow for Solo Designers',
        'wcard10.desc': 'Documented the 11-step Claude Code pipeline that lets one designer carry ~6–8 FTE of scope across 3–4 parallel projects while 40% of the week is meetings.',
        'about.badge': 'ABOUT',
        'about.bio.label': 'What I do',
        'about.bio': 'I specialize in transforming complex product requirements into intuitive systems. My focus lies at the intersection of AI product logic, SaaS scalability, and mobile usability—building design systems and AI workflows that empower both teams and users.',
        'about.offwork.label': 'Beyond work',
        'about.offwork': 'Travel is my lens for observing how people adapt to new environments and build trust in systems. Having explored 34+ cities, these insights directly inform my design intuition. Writing keeps my focus sharp, and the ocean resets my rhythm.',
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
        'article0.desc': 'On adaptation, impact over artifacts, and dancing with AI uncertainty.',
        'article1.title': 'Building a Claude Code Skill for Travel Planning',
        'article1.tag': 'Claude Code Skill',
        'article1.desc': 'A conversational AI tool that turns travel research into interactive HTML guides.',
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
        'intro.bio': '資深產品設計師，深耕 AI、SaaS 與行動生態系統。現任職於 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然語言查詢資料">Wren AI</a>，曾於 <a data-tip="Android OS · Google 硬體設計團隊">Google Pixel</a> 與 <a data-tip="亞洲領先的旅遊電商平台">KKday</a> 負責將複雜邏輯轉化為優雅的互動體驗。即將移居英國或日本，開放洽談當地的合作機會。',
        'intro.bio2': '如果你想看看我怎麼設計 AI 產品，可以從 <a href="case-studies/wren-agent.html">One Product, Three Minds</a> 開始，那是我在 Wren AI 重新思考對話式 BI 的案例；<a href="case-studies/thread-tracing.html">Closing the Loop</a>，談的是如何設計把使用者訊號轉成模型指令的回饋系統；或是 <a href="case-studies/lsbg.html">Bicycle Lane Inspection</a>，一款為漢堡道路養護團隊打造的 AI 公共服務工具。行動系統方面，有我在 Google Pixel 主導的 <a href="case-studies/notification.html">Notification Framework</a>，以及我在 Fable 設計的原生跨店購物體驗 <a href="case-studies/a41.html">A41</a>。B2B SaaS 方面，我在 KKday 打造了 <a href="case-studies/rezio-ds.html">Rezio Design System</a>，並重新設計了 <a href="case-studies/rezio.html">Rezio 廠商導入流程</a>，將設置時間縮短 38%。',
        'intro.bio3': '想了解我對 AI 與設計的看法，可以逛逛我的 <a href="#island-writing">Playground</a>，特別是 <a href="case-studies/designing-with-ai.html">Designing with AI</a>，我在裡面記錄了一位設計師如何在平行專案裡承擔 6 至 8 FTE 的工作流。目前手邊的 side project 是 <a href="case-studies/trip-planner.html">Trip Planner</a>，一款把旅行研究轉成互動 HTML 指南的 Claude Code Skill。',
        'intro.pill.resume': '履歷 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'ralinzain@gmail.com',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '單車道檢查最佳化系統',
        'wcard1.desc': '運用 AI 整合市民回饋，協助漢堡城市工程團隊精準判斷道路維護的優先順序。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — 跨境時尚平台',
        'wcard2.desc': '重構分散的跨店購物流程，將其整合為直覺且流暢的原生行動端結帳體驗。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Rezio 設計系統架構重塑',
        'wcard3.desc': '在 Rezio 建立可擴展的設計規範與元件庫，透過 Figma 進階架構精簡 33% 的變體數量，並大幅優化設計與開發間的交接協作。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 導入流程優化',
        'wcard4.desc': '重新設計 Rezio 的廠商導入流程，使設定時間縮短 38%，SUS 易用性評分提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知體驗治理框架',
        'wcard5.desc': '為 Google Pixel 團隊建立通知設計規範，並開發內部 AI 輔助審查工具。',
        'wcard6.co': 'Wren AI · 2025',
        'wcard6.title': 'Sidebar 資訊架構重構',
        'wcard6.desc': '隨商業策略轉向，重構 Sidebar 資訊架構：把空間還給 Threads、為 Free Plan 重塑 Credit、收斂沒人用的教學區。產品活躍度 +20%。',
        'wcard7.co': 'Wren AI · 2026',
        'wcard7.title': '一個產品，三種心智：重新思考對話式 BI',
        'wcard7.desc': '研究 1,600+ 筆 BI 查詢，為 Wren AI 新 Agent 模式設計滾動確認的互動模式。',
        'wcard8.co': 'Wren AI · 2026',
        'wcard8.title': '閉合迴路：設計 AI 回饋系統',
        'wcard8.desc': '設計了 Thread Tracing — 基於 Google PAIR 框架的 AI 回饋可觀測性系統，將用戶信號閉合為可執行的模型指令。',
        'wcard10.co': 'Wren AI · 2026',
        'wcard10.title': '與 AI 一起設計：為獨立設計師打造的系統級工作流',
        'wcard10.desc': '記錄 11 步的 Claude Code 工作流——讓一位設計師在 40% 時間是會議的情況下，仍能同時承擔 3–4 個並行專案、約 6–8 FTE 的工作量。',
        'about.badge': '關於我',
        'about.bio.label': '核心專長',
        'about.bio': '我致力於將複雜的產品需求梳理成清晰的系統。我的工作核心在於 AI 產品邏輯、SaaS 擴充性與行動端易用性的交會點，透過設計系統與 AI 輔助工作流，同時賦能團隊與使用者。',
        'about.offwork.label': '工作之外',
        'about.offwork': '旅行是我觀察人們如何適應陌生環境、建立信任感的實驗場。走過 34 個以上的城市，這些觀察轉化為我的設計直覺。寫作協助我專注思考，海洋則讓我找回節奏。',
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
        'article0.desc': '關於適應、以影響取代產出，以及與 AI 的不確定性共舞。',
        'article1.title': '打造旅行規劃的 Claude Code Skill',
        'article1.tag': 'Claude Code Skill',
        'article1.desc': '一個對話式 AI 工具，把旅行研究轉為互動式 HTML 指南。',
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
        'intro.bio': '高级产品设计师，专注于 AI、SaaS 与移动生态系统。现就职于 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然语言查询数据">Wren AI</a>，曾在 <a data-tip="Android OS · Google 硬件设计团队">Google Pixel</a> 与 <a data-tip="亚洲领先的旅游电商平台">KKday</a> 负责将复杂逻辑转化为清晰可用的交互体验。即将移居英国或日本，开放洽谈当地的职场机会。',
        'intro.bio2': '如果你想看看我怎么设计 AI 产品，可以从 <a href="case-studies/wren-agent.html">One Product, Three Minds</a> 开始，那是我在 Wren AI 重新思考对话式 BI 的案例；<a href="case-studies/thread-tracing.html">Closing the Loop</a>，谈的是如何设计把用户信号转成模型指令的反馈系统；或是 <a href="case-studies/lsbg.html">Bicycle Lane Inspection</a>，一款为汉堡道路养护团队打造的 AI 公共服务工具。移动系统方面，有我在 Google Pixel 主导的 <a href="case-studies/notification.html">Notification Framework</a>，以及我在 Fable 设计的原生跨店购物体验 <a href="case-studies/a41.html">A41</a>。B2B SaaS 方面，我在 KKday 打造了 <a href="case-studies/rezio-ds.html">Rezio Design System</a>，并重新设计了 <a href="case-studies/rezio.html">Rezio 厂商导入流程</a>，将配置时间缩短 38%。',
        'intro.bio3': '想了解我对 AI 与设计的看法，可以逛逛我的 <a href="#island-writing">Playground</a>，尤其是 <a href="case-studies/designing-with-ai.html">Designing with AI</a>，我在里面记录了一位设计师如何在并行项目里承担 6 至 8 FTE 的工作流。目前手边的 side project 是 <a href="case-studies/trip-planner.html">Trip Planner</a>，一款把旅行研究转成互动 HTML 指南的 Claude Code Skill。',
        'intro.pill.resume': '简历 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'ralinzain@gmail.com',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自行车道检查优化系统',
        'wcard1.desc': '结合 AI 与市民反馈，协助汉堡城市工程团队精准判断道路维护的优先级。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — 跨境时尚平台',
        'wcard2.desc': '重构分散的跨店购物流程，将其整合为高效流畅的原生移动端结账体验。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Rezio 设计系统架构重塑',
        'wcard3.desc': '在 Rezio 建立可扩展的设计规范与组件库，通过 Figma 进阶架构精简 33% 的变体数量，并大幅优化设计与开发间的交接协作。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 导入流程优化',
        'wcard4.desc': '重新设计 Rezio 的厂商导入流程，使配置时间缩短 38%，SUS 易用性评分提升至 80.3。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知体验治理框架',
        'wcard5.desc': '为 Google Pixel 团队建立通知设计规范，并开发内部 AI 辅助审核工具。',
        'wcard6.co': 'Wren AI · 2025',
        'wcard6.title': 'Sidebar 信息架构重构',
        'wcard6.desc': '随商业策略转向，重构 Sidebar 信息架构：把空间还给 Threads、为 Free Plan 重塑 Credit、收敛没人用的教学区。产品活跃度 +20%。',
        'wcard7.co': 'Wren AI · 2026',
        'wcard7.title': '一个产品，三种心智：重新思考对话式 BI',
        'wcard7.desc': '研究 1,600+ 条 BI 查询，为 Wren AI 新 Agent 模式设计滚动确认的交互模式。',
        'wcard8.co': 'Wren AI · 2026',
        'wcard8.title': '闭合回路：设计 AI 反馈系统',
        'wcard8.desc': '设计了 Thread Tracing — 基于 Google PAIR 框架的 AI 反馈可观测性系统，将用户信号闭合为可执行的模型指令。',
        'wcard10.co': 'Wren AI · 2026',
        'wcard10.title': '与 AI 一起设计：为独立设计师打造的系统级工作流',
        'wcard10.desc': '记录 11 步的 Claude Code 工作流——让一位设计师在 40% 时间是会议的情况下，仍能同时承担 3–4 个并行项目、约 6–8 FTE 的工作量。',
        'about.badge': '关于我',
        'about.bio.label': '核心专长',
        'about.bio': '我专注于将复杂的业务需求梳理为直观的系统。我的工作核心位于 AI 产品逻辑、SaaS 扩展性与移动端易用性的交汇点，通过设计系统与 AI 辅助工作流，同时赋能团队与用户。',
        'about.offwork.label': '工作之外',
        'about.offwork': '旅行是我观察人们如何适应陌生环境、建立信任感的实验场。走过 34 个以上的城市后，这些观察转化为我的设计直觉。写作协助我专注思考，大海则让我找回节奏。',
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
        'article0.desc': '关于适应、以影响取代产出，以及与 AI 的不确定性共舞。',
        'article1.title': '打造旅行规划的 Claude Code Skill',
        'article1.tag': 'Claude Code Skill',
        'article1.desc': '一个对话式 AI 工具，把旅行研究转为互动式 HTML 指南。',
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
        'intro.bio': 'AI、SaaS、モバイル領域を横断するシニアプロダクトデザイナー。現在は <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 自然言語でデータを操作">Wren AI</a> に在籍し、これまでに <a data-tip="Android OS · Google ハードウェア設計チーム">Google Pixel</a> と <a data-tip="アジア最大の旅行 EC プラットフォーム">KKday</a> で、複雑なシステムをわかりやすい体験へ整理してきた。近く英国または日本への移住を予定しており、両地域での機会にオープンです。',
        'intro.bio2': 'AI プロダクトをどう設計しているかを見たい方は、Wren AI で会話型 BI を再設計した <a href="case-studies/wren-agent.html">One Product, Three Minds</a>、ユーザーのシグナルをモデルへの指示に変えるフィードバックシステムを扱った <a href="case-studies/thread-tracing.html">Closing the Loop</a>、そしてハンブルク市の道路整備チーム向けに設計した AI 支援ツール <a href="case-studies/lsbg.html">Bicycle Lane Inspection</a> からどうぞ。モバイル系の仕事であれば、Google Pixel で率いた <a href="case-studies/notification.html">Notification Framework</a>、Fable で設計したクロスストアのネイティブ購入体験 <a href="case-studies/a41.html">A41</a> があります。B2B SaaS の領域では、KKday で <a href="case-studies/rezio-ds.html">Rezio Design System</a> を構築し、セットアップ時間を 38% 短縮した <a href="case-studies/rezio.html">Rezio の導入フロー</a> を再設計しました。',
        'intro.bio3': 'AI とデザインについての考え方は、<a href="#island-writing">Playground</a>、とりわけ、並行プロジェクトを横断しながら一人のデザイナーが 6〜8 FTE 分のスコープを担うワークフローをまとめた <a href="case-studies/designing-with-ai.html">Designing with AI</a> をご覧ください。目下は、旅行リサーチをインタラクティブな HTML ガイドに変換する Claude Code Skill、<a href="case-studies/trip-planner.html">Trip Planner</a> を育てています。',
        'intro.pill.resume': '履歴書 ↓',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'ralinzain@gmail.com',
        'work.badge': '作品',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自転車レーン検査最適化',
        'wcard1.desc': '市民の声を手がかりに、ハンブルクの自転車レーン整備の優先度判断を支える AI 活用ツール。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — オールフォーワン',
        'wcard2.desc': '分断された越境ファッション購入体験を、ネイティブでわかりやすいモバイルフローへ再設計。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Rezio デザインシステムの再構築',
        'wcard3.desc': '拡張性の高いデザインシステムを構築。Figma の高度な機能を活用し、コンポーネントのバリアントを 33% 削減するとともに、開発へのハンドオフを劇的に効率化しました。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS オンボーディング刷新',
        'wcard4.desc': '設定時間を 38% 短縮し、SUS 80.3 を達成した B2B オンボーディング再設計。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知フレームワーク',
        'wcard5.desc': 'Pixel チーム向けに、通知ガバナンスの基盤と社内 AI レビュー支援ツールを構築。',
        'wcard6.co': 'Wren AI · 2025',
        'wcard6.title': 'サイドバー IA 再構築',
        'wcard6.desc': '事業戦略の転換に合わせてサイドバーの IA を再構築——Threads にスペースを戻し、Free Plan 向けに Credit を再設計し、使われないチュートリアルを整理。アクティブ利用 +20%。',
        'wcard7.co': 'Wren AI · 2026',
        'wcard7.title': 'ひとつのプロダクト、3 つの心：会話型 BI を問い直す',
        'wcard7.desc': 'BI クエリ 1,600+ 件を調査し、Wren AI の新しい Agent モード向けにローリング確認パターンを設計。',
        'wcard8.co': 'Wren AI · 2026',
        'wcard8.title': 'ループを閉じる：AIフィードバックシステムの設計',
        'wcard8.desc': 'Thread Tracing を設計 — Google の PAIR フレームワークに基づく AI フィードバック可観測性システムで、ユーザーシグナルからモデルインストラクションへのループを閉じました。',
        'wcard10.co': 'Wren AI · 2026',
        'wcard10.title': 'AI と共にデザインする：ソロデザイナーのためのシステムレベルワークフロー',
        'wcard10.desc': '週の 40% が会議という状況の中で、1 人のデザイナーが 3〜4 の並行プロジェクト・6〜8 FTE 相当の範囲をカバーする、11 ステップの Claude Code パイプラインを記録。',
        'about.badge': '自己紹介',
        'about.bio.label': '業務内容',
        'about.bio': '複雑なプロダクトを、チームが進めやすく、ユーザーが理解しやすい形に整理するのが仕事です。AI プロダクト、SaaS、モバイル領域を中心に、デザインシステム、ユーザビリティ改善、AI 活用ワークフローの設計に取り組んでいます。',
        'about.offwork.label': 'オフタイム',
        'about.offwork': '34 都市以上を旅する中で、知らない場所でも人がどうやって空間や仕組みに順応するのかを観察してきました。そうした視点は、日々の設計判断にも戻ってきます。文章を書くことは思考を整え、海はペースを戻してくれます。',
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
        'article0.desc': '適応について、成果物より impact、そして AI の不確実性と踊ることについて。',
        'article1.title': '旅行プランニング用 Claude Code Skill の構築',
        'article1.tag': 'Claude Code Skill',
        'article1.desc': '旅行リサーチをインタラクティブな HTML ガイドへと変える、対話型 AI ツール。',
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
    const richKeys = ['intro.headline', 'intro.bio', 'intro.bio2', 'intro.bio3', 'about.bio', 'about.offwork'];
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
          if (key === 'intro.headline' || key === 'intro.bio' || key === 'intro.bio2' || key === 'intro.bio3') {
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
