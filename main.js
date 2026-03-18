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
        'sidebar.skills': 'Skills & CV',
        'sidebar.drag': 'drag',
        'sidebar.explore': ' to explore',
        'intro.eyebrow': 'AI · Mobile · SaaS · Complex Systems',
        'intro.pill.resume': 'CV \u2193',
        'intro.pill.linkedin': 'LinkedIn',
        'intro.pill.email': 'Email',
        'work.badge': 'WORK',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': 'Bicycle Lane Inspection Optimization',
        'wcard1.desc': 'Smart AI tools for LSBG engineers to collect and visualize citizen feedback, improving bicycle lane prioritization.',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': 'Fashion e-commerce app curating outfits from South Korean online stores.',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'Design System Overhaul',
        'wcard3.desc': 'Co-led design system rebuild, reducing component variants by 33% and adding key elements using AI prototyping.',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS Onboarding Revamp',
        'wcard4.desc': "Streamlined KKday Rezio's onboarding flows with GetYourGuide and Viator integrations. Cut setup time 38%, SUS score 80.3.",
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': 'Notification Framework',
        'wcard5.desc': 'Established notification delivery standards and built an internal Gemini bot for future notification planning.',
        'about.badge': 'ABOUT',
        'about.bio.label': 'What I do',
        'about.offwork.label': 'Off-work',
        'about.exp.label': 'Experience',
        'about.tools.label': 'Tools',
        'writing.badge': 'WRITING',
        'skills.badge': 'SKILLS & CV',
        'memo.quote': 'Travel allows you to see things from a different perspective, and that is essential for a designer.',
        'tip.wrenai': 'Text-to-SQL AI · natural language over data',
        'tip.pixel': 'Android OS · Google hardware design team',
        'tip.kkday': "Asia's leading travel e-commerce platform",
        'about.edu.label': 'Education',
        'about.subtitle': 'Something about me',
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
        'sidebar.skills': '\u30b9\u30ad\u30eb & CV',
        'sidebar.drag': '\u30c9\u30e9\u30c3\u30b0',
        'sidebar.explore': '\u3067\u63a2\u7d22',
        'intro.eyebrow': 'AI · モバイル · SaaS · 複雑なシステム',
        'intro.headline': 'Iris Hsieh — <span class="hl">AI</span> と共に<span class="hl hl-pink">創る</span>デザイナー。',
        'intro.bio': 'シニアプロダクトデザイナー。AI が日常に溶け込む時代、インターフェースのあり方を問い直し続けている。現在は <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 自然言語でデータを操作">Wren AI</a> に在籍し、<a data-tip="Android OS · Google ハードウェア設計チーム">Google Pixel</a>・<a data-tip="アジア最大の旅行 EC プラットフォーム">KKday</a> での経験を経て、複雑なシステムに人間的な体験を吹き込むことを続けている。英国在住。ヨーロッパや日本でのポジションにもオープンです。',
        'intro.pill.resume': '\u5c65\u6b74\u66f8',
        'intro.pill.linkedin': 'LINKEDIN',
        'intro.pill.email': '\u30e1\u30fc\u30eb',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自転車レーン検査最適化',
        'wcard1.desc': '冬の現場巡視を減らしたい――そこから始まった。市民の声を AI で整理し、ハンブルクの自転車レーン整備を、感覚ではなくデータで動かす仕組みへと変えた。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — オールフォーワン',
        'wcard2.desc': '韓国発のファッションを、ひとつのアプリで完結させる体験。バラバラだったオンラインストアを、コーディネートという軸で束ねた。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': 'デザインシステム刷新',
        'wcard3.desc': '膨れ上がったコンポーネントを整理し、チームの共通言語を作り直した。33% の削減より大事だったのは、設計と実装の対話がなめらかになったこと。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS オンボーディング刷新',
        'wcard4.desc': '初日から迷子にならないために。GetYourGuide と Viator の接続を見直し、設定にかかる時間を 38% 縮めた。ユーザビリティ評価は 80.3 と、業界基準を超えた。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知フレームワーク',
        'wcard5.desc': '通知は多ければいいわけじゃない。Pixel の配信標準を整え、Gemini で動く社内ツールを作り、次の通知設計の土台を置いた。',
        'about.badge': '\u81ea\u5df1\u7d39\u4ecb',
        'about.bio.label': '\u696d\u52d9\u5185\u5bb9',
        'about.bio': 'AI プロダクト・SaaS・モバイル・EC・Web3 と、5 年以上かけて多様な領域を渡り歩いてきた。複雑なシステムの中に、人が自然に使える筋道を見つけることが仕事の核にある。AI を道具として使いこなしながら、設計システムの構築とユーザビリティの改善を続けている。',
        'about.offwork.label': '\u30aa\u30d5\u30bf\u30a4\u30e0',
        'about.offwork': '34 都市以上を旅してきた。見知らぬ場所で当然の「当たり前」が崩れるとき、新しい視点が生まれる。その積み重ねがデザインに戻ってくる。音楽で頭を整理し、海に出ると余計なものが落ちる。',
        'about.exp.label': '\u8077\u6b74',
        'about.tools.label': '\u30c4\u30fc\u30eb',
        'writing.badge': '\u57f7\u7b46',
        'skills.badge': '\u30b9\u30ad\u30eb & CV',
        'memo.quote': '旅は物事を違う視点で見ることを可能にする。それはデザイナーにとって不可欠なことだ。',
        'tip.wrenai': 'Text-to-SQL AI · 自然言語でデータを操作',
        'tip.pixel': 'Android OS · Google ハードウェア設計チーム',
        'tip.kkday': 'アジア最大の旅行 EC プラットフォーム',
        'about.edu.label': '学歴',
        'about.subtitle': '私について',
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
        'sidebar.skills': '\u6280\u80fd & \u5c65\u6b77',
        'sidebar.drag': '\u62d6\u66f3',
        'sidebar.explore': '\u4f86\u63a2\u7d22',
        'intro.eyebrow': 'AI · 行動裝置 · SaaS · 複雜系統',
        'intro.headline': 'Iris Hsieh — 與 <span class="hl">AI</span> <span class="hl hl-pink">協作</span>的設計師。',
        'intro.bio': 'Iris 是一位資深產品設計師。在 AI 滲透日常的時代裡，持續思考介面究竟該長什麼樣子。目前任職於 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然語言查詢資料">Wren AI</a>，先前在 <a data-tip="Android OS · Google 硬體設計團隊">Google Pixel</a> 和 <a data-tip="亞洲領先的旅遊電商平台">KKday</a> 累積了深厚的跨域經驗。現居英國，開放洽談歐洲及日本的職涯機會。',
        'intro.pill.resume': '\u5c65\u6b77',
        'intro.pill.linkedin': 'LINKEDIN',
        'intro.pill.email': 'Email',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '單車道檢查最佳化',
        'wcard1.desc': '工程師不該在冬天踩著雪去巡檢。透過 AI 整合市民回饋，讓漢堡的單車道維護，從憑感覺變成有數據可循的決策。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': '韓國街頭的穿搭靈感，整合進一支 App。讓喜歡 K-fashion 的人，不用在各個網站之間跳來跳去，也能找到完整的造型。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '設計系統重建',
        'wcard3.desc': '元件越堆越多，沒有人知道該用哪個。重新梳理設計系統、砍掉三分之一的變體，讓設計和工程之間的協作順了起來。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 導入流程重設計',
        'wcard4.desc': '新用戶第一次進來，不該像在走迷宮。重整 GetYourGuide 和 Viator 的接入流程，設定時間縮短了 38%，SUS 評分 80.3，超過業界的「良好」門檻。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知框架',
        'wcard5.desc': '通知多不代表做得好。為 Pixel 建立通知配送規範，並用 Gemini 打造內部工具，讓下一次的設計決策有跡可循。',
        'about.badge': '\u95dc\u65bc',
        'about.bio.label': '\u6211\u7684\u5de5\u4f5c',
        'about.bio': '五年多來游走於 AI 產品、SaaS 平台、行動應用、電商與 Web3 之間，習慣在複雜的系統裡找出最直覺的路徑。設計系統建構、易用性研究、AI 輔助原型開發，是日常工作的核心；比起交付頁面，更在意整個流程有沒有真的對人有意義。',
        'about.offwork.label': '\u5de5\u4f5c\u5916',
        'about.offwork': '走過 34 個以上的城市。旅行讓我習慣在陌生的地方快速找到節奏。音樂讓我沉下來，海讓我回到自己。',
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
        'article2.tag': '行動端',
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
        'sidebar.skills': '\u6280\u80fd & \u7b80\u5386',
        'sidebar.drag': '\u62d6\u62fd',
        'sidebar.explore': '\u6765\u63a2\u7d22',
        'intro.eyebrow': 'AI · 移动端 · SaaS · 复杂系统',
        'intro.headline': 'Iris Hsieh — 与 <span class="hl">AI</span> <span class="hl hl-pink">协作</span>的设计师。',
        'intro.bio': 'Iris 是一位高级产品设计师。在 AI 融入日常的时代，持续思考界面该有的形态。目前任职于 <a href="https://getwren.ai" target="_blank" rel="noreferrer" data-tip="Text-to-SQL AI · 以自然语言查询数据">Wren AI</a>，先前在 <a data-tip="Android OS · Google 硬件设计团队">Google Pixel</a> 与 <a data-tip="亚洲领先的旅游电商平台">KKday</a> 深耕多年。现居英国，开放洽谈欧洲及日本的职业机会。',
        'intro.pill.resume': '\u7b80\u5386',
        'intro.pill.linkedin': 'LINKEDIN',
        'intro.pill.email': 'Email',
        'work.badge': '\u4f5c\u54c1',
        'wcard1.co': 'LSBG · 2023',
        'wcard1.title': '自行车道检查优化',
        'wcard1.desc': '工程师不该在冬天踩着雪去巡检。借助 AI 整合市民反馈，让汉堡自行车道的维护，从凭感觉变成有据可查的决策。',
        'wcard2.co': 'None Capital · 2022–23',
        'wcard2.title': 'A41 — All For One',
        'wcard2.desc': '韩国街头的穿搭灵感，整合进一个 App。让喜欢 K-fashion 的人，不用在各个网站间来回跳转，也能找到完整的造型。',
        'wcard3.co': 'KKday · Rezio · 2024–25',
        'wcard3.title': '设计系统重建',
        'wcard3.desc': '组件越堆越多，没有人知道该用哪个。重新梳理设计系统、砍掉三分之一的变体，让设计与工程之间的协作顺畅起来。',
        'wcard4.co': 'KKday Rezio · 2024–25',
        'wcard4.title': 'B2B SaaS 导入流程重设计',
        'wcard4.desc': '新用户第一次进来，不该像在走迷宫。重整 GetYourGuide 和 Viator 的接入流程，设置时间缩短了 38%，SUS 评分 80.3，超过业界的「良好」门槛。',
        'wcard5.co': 'Google Pixel · 2025',
        'wcard5.title': '通知框架',
        'wcard5.desc': '通知多不代表做得好。为 Pixel 建立通知配送规范，并用 Gemini 构建内部工具，让下一次的设计决策有据可依。',
        'about.badge': '\u5173\u4e8e',
        'about.bio.label': '\u6211\u7684\u5de5\u4f5c',
        'about.bio': '五年多来穿梭于 AI 产品、SaaS 平台、移动应用、电商与 Web3 之间，擅长在复杂系统里找出最直觉的路径。设计系统搭建、易用性研究、AI 辅助原型开发是日常核心；比起交付页面，更在意整个流程有没有真正对人有意义。',
        'about.offwork.label': '\u5de5\u4f5c\u4e4b\u5916',
        'about.offwork': '走过 34 个以上的城市。旅行让我习惯在陌生的环境里快速找到节奏。音乐让我沉下来，大海让我回到自己。',
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
