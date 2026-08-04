// Boot guard: on staticrypt pages this file can execute from cache before
// document.write has streamed the decrypted DOM in — poll until the page
// content actually exists, then initialize once.
(function __waBoot() {
  if (!document.querySelector('.title-bar')) {
    window.__waBootTries = (window.__waBootTries || 0) + 1;
    if (window.__waBootTries < 200) { setTimeout(__waBoot, 50); return; }
  }
// ── NAV active state + scroll reveal ──
  (function() {
    const anchors = document.querySelectorAll('.nav-anchor');
    const sectionIds = ['intro','s01','s02','s03','s04','s05'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const navEl = document.querySelector('.nav');
    function update() {
      const navH = navEl ? navEl.offsetHeight : 57;
      const scrollY = window.scrollY + navH + 40;
      let active = sections[0];
      sections.forEach(sec => { if (sec && sec.offsetTop <= scrollY) active = sec; });
      anchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + (active ? active.id : ''));
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Count-up numbers + grow bars for the paid-rate chart (s03).
    // The HTML keeps final values/widths as a no-JS fallback; JS resets them
    // off-screen and animates on scroll-in.
    const countupEls = document.querySelectorAll('[data-countup]');
    const fillEls = document.querySelectorAll('[data-fill]');
    const runOnView = (els, fn) => {
      if (!els.length) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      els.forEach(el => io.observe(el));
    };
    const countUp = (el) => {
      const target = parseFloat(el.getAttribute('data-countup')) || 0;
      const dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1100; let start = null;
      const step = (ts) => {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(dec) + suffix;
      };
      requestAnimationFrame(step);
    };
    countupEls.forEach(el => {
      const dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = (0).toFixed(dec) + (el.getAttribute('data-suffix') || '');
    });
    fillEls.forEach(el => { el.style.width = '0'; });
    runOnView(countupEls, countUp);
    runOnView(fillEls, el => { el.style.width = el.getAttribute('data-fill'); });

    // Replay buttons for journey iframes
    document.querySelectorAll('.journey-frame-replay').forEach(btn => {
      btn.addEventListener('click', () => {
        const frame = btn.closest('.journey-frame');
        const iframe = frame && frame.querySelector('iframe');
        if (!iframe) return;
        const src = iframe.getAttribute('data-src') || iframe.src;
        // Force a full reload by clearing and resetting the src
        iframe.src = 'about:blank';
        requestAnimationFrame(() => { iframe.src = src; });
        frame.classList.add('is-playing');
        frame.classList.remove('is-paused');
      });
    });

    // Click-to-play overlays: the demo stays a static preview until Play
    document.querySelectorAll('.journey-play').forEach(btn => {
      btn.addEventListener('click', () => {
        const frame = btn.closest('.journey-frame');
        const iframe = frame && frame.querySelector('iframe');
        if (!iframe) return;
        iframe.src = iframe.getAttribute('data-src');
        frame.classList.add('is-playing');
        frame.classList.remove('is-paused');
      });
    });

    // Pause / Resume: freezes the demo's timer queue mid-flight via postMessage
    // (the pausable scheduler lives at the top of chat-home.html)
    document.querySelectorAll('.journey-frame-pause').forEach(btn => {
      btn.addEventListener('click', () => {
        const frame = btn.closest('.journey-frame');
        const iframe = frame && frame.querySelector('iframe');
        if (!iframe || !iframe.contentWindow) return;
        const pausing = !frame.classList.contains('is-paused');
        iframe.contentWindow.postMessage({ type: pausing ? 'demo_pause' : 'demo_resume' }, '*');
        frame.classList.toggle('is-paused', pausing);
      });
    });
    // If the user pauses before the iframe finishes loading, the message is
    // lost — re-send the pause once the demo page is actually there.
    document.querySelectorAll('.journey-frame iframe').forEach(ifr => {
      ifr.addEventListener('load', () => {
        const frame = ifr.closest('.journey-frame');
        if (frame && frame.classList.contains('is-paused') && ifr.contentWindow) {
          ifr.contentWindow.postMessage({ type: 'demo_pause' }, '*');
        }
      });
    });
  })();

  // ── i18n ──
  const I18N = {
    en: {},
    ja: {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.はじめに',
      'nav.s01': '01.行動データ',
      'nav.s02': '02.インサイト',
      'nav.s03': '03.教える',
      'nav.s04': '04.Skill 化',
      'nav.s05': '05.成果',
      'title.big': '話しかけて AI に教える',
      'title.sub': 'Wren AI に業務ロジックを教えるのは、多くのチームがやり切れない手作業の Knowledge ページでした。しかも Knowledge を作ることは、チームが課金する最も強いシグナルのひとつ。そこで私はそれを Skill にしました。同僚に教えるように、質問の途中で話しかけて AI に教える。そのパターンが、すべての機能の動き方になりました。',
      'intro.overview.label': '解決したかった問題',
      'intro.overview.body': 'Wren AI は会話型の BI ツールで、データに自然言語で問いかけられます。ただし、うまく答えるにはまず AI に教える必要があります。指標、定義、ビジネスルール。この「教える」ことを Knowledge と呼びます。従来の製品では、Knowledge は専用ページに一行ずつ入力するもので、誰も覚えられない十数個の機能入口と並んで置かれていました。データが示した事実は明快でした。Knowledge を作ったチームほど課金する確率がずっと高い。それなのに、最後までやり切る人はほとんどいませんでした。このケーススタディでは、私が「教える」こと、そして最終的にすべての機能を、ユーザーが実際に過ごす唯一の場所、チャットボックスへ移した過程を追います。',
      'intro.role.label': '担当範囲',
      'intro.role.body': '<span class="stat-hi">デザイナー・リサーチャー・PM を一人で兼任</span>。Langfuse と PostHog のデータ分析、Agent UX のエンドツーエンド設計、<span class="stat-hi">モード戦略</span>、そして<span class="stat-hi">ローンチ後の仮説検証フレームワーク</span>まで一貫して担当しました。',
      'intro.time.label': '会社と時期',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最終アウトプット：すべての機能をひとつの Skill に',
      's04.lede': 'Knowledge がパターンを証明してくれたので、私はそれを一般化しました。Skill はアトミックな能力モジュールです。一文で呼び出すか、agent が文脈から自動で起動します。デザインで答えるべき問いは 3 つだけでした。どう呼び出すか？どう確認するか？どう過程を見せるか？',
      's04.replay': 'リプレイ',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': 'Official Skills の再定義：「機能ボタン」から「アトミックな能力」へ',
      's04.jC.body': '<p class="body">以前の線形アーキテクチャでは、レポート生成・データ評価・ドキュメント解析といった中核機能が、UI 上のボタンや専用モードとして散らばっていました。これは開発コストを膨らませ、ユーザーの作業の流れも分断していました。私たちは Official Skills を再定義し、これらの複雑なバックエンドロジックを<span class="stat-hi">「アトミックな」</span>能力モジュールにまとめ直しました。</p><p class="body">この転換における最も深いデザイン上の意味は、<span class="stat-hi">Skill によって、ユーザーは対話だけでシステム全体を貫通できる</span>こと、そしてすべての機能と体系的かつ安全にやり取りできるようになることです。あらゆる能力が同じトリガー文法に収束することで、自然言語がプロダクトの唯一の入口となります。この土台の上に、3 つの核となる利点が見えてきました。</p><h4 class="journey-h4">1 · 統一されたルーティング：UI 操作を自然言語コマンドへ</h4><p class="body">以前は UI のクリックでしか発火できなかった特定のタスクが、すべて Skill ルーティング経由で実行されるようになりました。</p><ul class="journey-list"><li><code>generate-report</code>：「レポート生成」アイコンを探す必要はもうありません。Agent が文脈から発火するか、ユーザーがコマンドで明示的に呼びます。</li><li><code>analyze-data</code> と <code>sql-queries</code>：「問いに答える」と「SQL を書く」という別次元のタスクを切り離し、Agent はどのタイミングで探索すべきか、いつ正確な数字を取りに行くべきかを判断できます。</li></ul><h4 class="journey-h4">2 · ドキュメント処理の溝を埋める：doc と pdf の能力化</h4><p class="body">異種データ（Spreadsheet、PDF、Word）の扱いは、BI ツールの長年の痛みでした。<code>pdf</code>、<code>doc</code>、<code>spreadsheet</code> の各 Skill によって、解析ロジックを本体から切り離しています。<code>.zip</code> や複数フォーマットが混ざったファイルをドロップしても、Agent はもう混乱して読み込まず、対応する Skill へきちんとディスパッチします。</p><h4 class="journey-h4">3 · 特定のパターンを、再利用可能な「知識資産」に</h4><p class="body">業務ルール（Eval）やデータパターンをナレッジベースに足すのは、これまで手作業の繰り返しでした。今はそうしたロジックを Skill にパッケージできます。保守が楽になるだけでなく、ユーザー独自の Skill にも基準点ができました。Official Skill は <span class="stat-hi">Reference Implementation（参考実装）</span>として機能し、ユーザーが自分の Eval ロジックや専有ワークフローを、同じパターンで Agent の DNA に埋め込む方法を示します。</p><h4 class="journey-h4">Official Skills 一覧：Agent の中核領域を定義する</h4><p class="body">私たちは 6 つの Official Skills を厳選し、Agent の基礎能力レイヤーとしました：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計意図とユースケース</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>分析のコア。ユーザーがトレンド探索、具体的な数値の取得、可視化を求めるときに発火。</td></tr><tr><td><code>sql-queries</code></td><td>精密なデータ取得。SQL の作成と実行に特化し、最短距離の回答を返す。</td></tr><tr><td><code>generate-report</code></td><td>ナラティブな出力。散らばったインサイトを、図表とサマリー付きの完成形レポートに統合。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非構造データの抽出。PDF や Word からテキスト・表を正確に取り出し、分析パイプラインへ。</td></tr><tr><td><code>spreadsheet</code></td><td>外部データの変換。CSV/Excel のインポートと変換を担い、データソースを跨いだ分析を実現。</td></tr></tbody></table><h4 class="journey-h4">なぜ、これがプロダクトにとって重要か</h4><p class="body">機能を Skill に変えることの最大の UX 価値は、<span class="stat-hi">認知負荷の削減</span>です。ユーザーは「このボタンはどこにある？」を覚える必要がなくなり、「何を達成したいか」だけに集中できます。プロダクトチームにとっては、能力拡張が驚くほど軽量になります。新しい AI 評価モデルや特定のデータクリーニングロジックを足したいとき、複雑な UI フローを書き換える必要はなく、新しい Skill をリリースすれば済みます。この「機能のデカップリング、能力のアグリゲーション」というアーキテクチャこそ、Wren AI が Agent 時代に高速で反復しつつ、監査レベルの透明性を保てる、中核的な技術資産です。</p>',
      's05.title': '成果：増えたのは能力、UI ではない',
      's05.out1.label': 'ユーザーは地図を学ばなくなった',
      's05.out1.body': 'ゴールを言葉にするだけ。ローンチから 1 か月以内に、旧入口の利用は月数千件から<span class="stat-hi">1 桁</span>に落ち、誰も戻りませんでした。初期フィードバックは約 <span class="stat-hi">4:1</span> でポジティブ（サンプルは小さく、追跡継続中）。',
      's05.out2.label': 'チームは UI に触れずに機能を出せる',
      's05.out2.body': '新しい能力 = <span class="stat-hi">Skill</span> をひとつ公開すること。新しいボタンも、ページも、チュートリアルも要りません。UI 開発は機能ごとの固定費から、一度きりのアーキテクチャ投資に変わりました。',
      's05.out3.label': '統一されたトリガー文法がエコシステムを開いた',
      's05.out3.body': 'ユーザー自作の Skill は Official Skills と同じルールで動きます。能力の拡張は、もはやプロダクトチームだけのものではありません。',
      's01.title': 'ユーザーは足で投票する：十数個のドア、使われるのはひとつ',
      's01.lede': 'ユーザーが入口を覚えているかどうかは、本人に聞くよりも行動を見るほうが確かです。過去 90 日間のプロダクトデータを掘り下げ、以下がわかりました。',
      's01.f1.label': 'インタラクションの 91% がひとつの入力ボックスで起きる',
      's01.f1.body': 'プロダクトには十数個の機能入口があります。しかし約 18,500 件のインタラクションのうち、それらの合計は<span class="stat-hi">1 割未満</span>。残りはすべて会話の中で起きていました。',
      's01.f2.label': '72% のユーザーは機能入口に一度も触れない',
      's01.f2.body': '582 名のアクティブユーザーの大半は、最初から最後まで会話ボックスの中だけで過ごしていました。最も人気の機能入口でさえ、使ったのは <span class="stat-hi">14%</span> だけです。',
      's01.f3.label': '20 本のセッション録画のうち、13 本でメニュー間の行き来が発生',
      's01.f3.body': '実際の操作を見ると、機能に辿り着く典型的な経路は一直線ではありません。「入って、戻って、別のメニューを試す」の繰り返しでした。',
      's01.closing': 'ユーザーのスキル不足ではありません。入口の違いはドキュメントに明記され、UI にもツールチップがあります。それでも 89 名のアクティブユーザー調査では、<span class="stat-hi">25%</span> が 2 つの入口の違いを説明できませんでした。入口を覚えることはプロダクトが課した宿題であり、ユーザーは一度もやろうとしなかったのです。',
      's02.title': 'インサイト：ユーザーは入口を覚えられない。でも、やりたいことは言える',
      's02.intro': 'ドアを覚えられない同じユーザーが、入力ボックスの中では驚くほど明瞭に語ります。',
      's02.e1.label': '証拠 01 · 機能を、言葉で「注文」する',
      's02.e1.body': '専用ボタンのある機能でも、ユーザーは打ち込んで頼みます。「チャートを作って」「レポートを生成して」「折れ線グラフに変えて」。ボタンはすぐそこにあるのに、それでも打つ。<span class="stat-hi">言語は代替手段ではなく、第一の本能です。</span>',
      's02.e2.label': '証拠 02 · 「何ができるか」さえ、メニューではなく質問で知ろうとする',
      's02.e2.body': 'トライアルユーザーは入力ボックスに <span class="stat-hi-blue">"what can I ask?"</span> と打ち込みます。メニューを開いてプロダクトを学ぶ人はいません。ユーザーの頭の中では、入力ボックスがすでにプロダクトそのものなのです。',
      's02.e3.label': '証拠 03 · インターフェースが受け止めきれないほど正確に語る',
      's02.e3.body': 'ヘビーユーザーはカラム名をそのまま文章に打ち込みます。その正確さは新規ユーザーの約 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。そして、これほど明瞭なリクエストが失敗するとき、<span class="stat-hi">95.9%</span> は旧アーキテクチャが受け止められなかったケースでした（<code>NO_RELEVANT_SQL</code>）。ボトルネックは表現側ではなく、受信側にあったのです。',
      's02.turn.label': '転換点 · すべての能力を、ユーザーが唯一覚えている入力ボックスへ移す',
      's02.turn.body': 'この結論は私たちが考え出したものではなく、ユーザーが行動で示したものです。<span class="stat-hi-blue">入力ボックスは、彼らが覚えている唯一の入口。</span>ボタンの場所をもう一度教える代わりに、私はすべての機能を会話の中に住む <span class="stat-hi">Skill</span> として作り直しました。最初に手をつけたのは、いちばん動かしにくく、いちばん価値の高いもの、AI に教えること自体でした。',
      's03.title': '話しかけて AI に教える：Knowledge が Skill になる',
      's03.lede': 'いちばん動かしにくかった能力は、レポートのボタンではなく、「教える」こと自体でした。Wren がうまく答えるには、まず誰かが業務の実態を教えなければなりません。指標、定義、ルール。それが Knowledge であり、製品の中でいちばん重いインターフェースであると同時に、静かにいちばん価値の高い行動でもありました。',
      's03.f1.label': 'Knowledge を作ることは、チームが課金する最も強い予兆のひとつ',
      's03.f1.body': 'アクティベーションのデータでは、Knowledge を作ったユーザーの課金率はベースの約 <span class="stat-hi">2.9 倍</span>でした。さらにチームメイトの招待と重なると、製品の中で最も強い課金シグナルになります。ユーザー単位で約 <span class="stat-hi">16%（ベースの約 13 倍）</span>、<span class="stat-hi-blue">チーム単位で約 47%</span>。AI に教えることは「あれば嬉しい」ではなく、顧客が取りうる最も価値の高い行動でした。（相関であり、課金サンプルは小さく、インタビューで検証中です。）',
      's03.f2.label': 'それなのに、最後までやり切られない機能でもあった',
      's03.f2.body': 'Knowledge を実際に作ったチームは約 <span class="stat-hi">10%</span> にとどまり、採用率は一年を通じて下がり続けました。いちばん強いレバーが、ほとんど触られないまま置かれていたのです。理由は、そこに辿り着くのに一行ずつ入力する手作業の設定ページが必要で、多くのチームが途中で諦めていたからでした。',
      's03.chart.cap': '課金率（行動別 · ユーザー単位 · ベース約 1%）',
      's03.chart.r1': 'チームメイトを招待 ＋ Knowledge を作成',
      's03.chart.r2': '招待のみ',
      's03.chart.r3': 'Knowledge のみ',
      's03.chart.r4': 'どちらもなし',
      's03.chart.tag': 'ベースの約 13 倍',
      's03.chart.note': '相関であり、課金サンプルは小さく、インタビューで検証中です。',
      's03.before.label': 'Before · Knowledge は、やり切らないといけないページだった',
      's03.before.body': '業務ロジックは、専用ページで一行ずつ入力する手作業の Knowledge 設定を通して入っていました。しかも、それが必要になる瞬間から切り離されていました。質問を中断して設定しに行き、また戻ってくる。多くのチームは最後までやり切れず、AI は中途半端に教えられたままでした。',
      's03.after.label': 'After · Knowledge は、質問の途中の一文になった',
      's03.after.body': '今は、質問しながら AI に教えられます。同僚を正すように、「売上は返金を除いて」と。Knowledge Skill と agent がそのロジックを捉え、構造化し、Knowledge に書き戻します。ついでに直した一言が、チーム全体が受け継ぐ永続的なルールになるのです。',
      's03.detail.label': 'デザインの詳細',
      's03.detail.li1': 'Knowledge をチャットボックスに移し、別ページを開かずに質問の途中で AI に教えられるようにした。',
      's03.detail.li2': 'Skill と agent がロジックを捉え、自動で構造化して Knowledge に書き戻す。',
      's03.result.label': '結果',
      's03.result.li1': '教えることが、ユーザーが既にいる場所へ移った。別の設定作業も、文脈の切り替えもない。',
      's03.result.li2': 'デザインが行動に従うようになった。行動をインターフェースに従わせるのではなく。',
      's03.close': 'これがパターンを証明したケースでした。製品の中でいちばん構造的で、いちばん「設定っぽい」タスクである「教える」ことさえ一文に畳み込めるなら、ほかのすべても同じようにできるはずです。',
      's05.close': '一本の筋が通っています。AI に教えるためにも、能力を増やすためにも、私は新しいインターフェースを一切足しませんでした。どちらも、ユーザーが既に打ち込んでいる一文の中へ移し、そうすることで製品を、最も価値の高い行動へまっすぐ向けたのです。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.行為數據',
      'nav.s02': '02.洞察',
      'nav.s03': '03.教 AI',
      'nav.s04': '04.Skill 化',
      'nav.s05': '05.結果',
      'title.big': '用對話教會 AI',
      'title.sub': '教 Wren AI 業務邏輯，過去得填一個多數團隊從沒填完的手動 Knowledge 頁面，偏偏建立 Knowledge 是團隊會不會付費最強的訊號之一。於是我把它做成一個 Skill：像教同事一樣，在問問題的當下用說的教 AI，而這套模式，成了每一項功能運作的方式。',
      'intro.overview.label': '我們要解決的問題',
      'intro.overview.body': 'Wren AI 是一款對話式 BI 工具，你可以用自然語言向資料提問。但要答得好，得先教會它：指標、定義、商業規則。這件「教」的事叫做 Knowledge，在舊版產品裡，它是一個要一行一行填寫的專屬頁面，和十幾個沒人記得住的功能入口並排放著。數據把利害關係講得很清楚：有建立 Knowledge 的團隊，付費機率高出許多，偏偏幾乎沒人把它做完。這篇案例分析要談的，就是我如何把「教 AI」這件事，以及最終把每一項功能，都搬進用戶真正待著的唯一地方：對話框。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同時擔任設計師、用戶研究員與 PM</span>。獨立負責 Langfuse 與 PostHog 數據分析、Agent UX 的端到端設計、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上線後的假設驗證框架</span>。',
      'intro.time.label': '公司與時程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最終產出：每個功能都是一個 Skill',
      's04.lede': 'Knowledge 證明了這套模式行得通，於是我把它一般化。Skill 是一個原子化的能力模組：只要一句話就能呼叫，或由 agent 依據上下文自動觸發。在介面設計上，我只需回答三個核心問題：怎麼觸發？怎麼確認？怎麼讓過程透明？',
      's04.replay': '重播',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': '定義 Official Skills：從「功能按鈕」到「原子化能力」的轉向',
      's04.jC.body': '<p class="body">在過去的線性架構中，許多核心功能（如生成報表、數據評估、文件解析）往往被設計成散落在介面各處的按鈕或獨立模式。這不僅增加了開發成本，也限制了用戶的操作流暢度。我們重新定義了 Official Skills，將這些複雜的後端邏輯包裝成<span class="stat-hi">「原子化」</span>的能力模組。</p><p class="body">這項轉向最深的設計意義在於：<span class="stat-hi">Skill 讓用戶僅憑對話就能穿透整個系統</span>，與所有功能進行系統化、安全的交互。當每一個能力都收斂為同一種觸發語法，自然語言便成為了產品唯一的入口。在這個基礎上，我們看到了三個核心優勢。</p><h4 class="journey-h4">1 · 統一的路由架構：將介面操作轉化為自然語言指令</h4><p class="body">過去需要透過點擊介面才能觸發的特定任務，現在全部透過 Skill 路由實現。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要尋找「生成報表」的圖示，Agent 會根據上下文自動觸發，或由用戶透過指令主動呼叫。</li><li><code>analyze-data</code> 與 <code>sql-queries</code>：我們將「回答問題」與「寫 SQL」這兩種不同維度的任務拆解，讓 Agent 能精準判斷何時該進行趨勢探索，何時該精確產出數據。</li></ul><h4 class="journey-h4">2 · 抹平文件處理的鴻溝：Doc 與 PDF 的能力化</h4><p class="body">處理異質資料（如 Spreadsheet、PDF、Word）曾是 BI 工具的痛點。透過 <code>pdf</code>、<code>doc</code> 與 <code>spreadsheet</code> 技能，我們將文件解析邏輯從主程式中解耦。這意味著當用戶拖入一個 <code>.zip</code> 壓縮檔或多種格式文件時，Agent 不再是混亂地讀取，而是有條理地分配給對應的 Skill 進行處理。</p><h4 class="journey-h4">3 · 將特定 Pattern 轉化為可複用的「知識資產」</h4><p class="body">過往要把特定的業務規則（Eval）或數據模型（Pattern）加入知識庫，通常需要繁瑣的手動設定。現在，這些邏輯可以被封裝進 Skill。這不僅讓官方能力更易於維護，也為「用戶自定義 Skill」樹立了標竿。官方 Skill 就像是 <span class="stat-hi">Reference Implementation（參考實作）</span>，引導用戶理解如何將自己的 Eval 邏輯或專屬工作流，透過相同的模式無縫植入 Agent 基因。</p><h4 class="journey-h4">Official Skills 概覽：定義 Agent 的核心邊界</h4><p class="body">我們精心策展了 6 個官方技能，作為 Agent 的基礎能力層：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計目的與應用場景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>數據分析核心：當用戶需要探索趨勢、獲取特定數字或進行視覺化時觸發。</td></tr><tr><td><code>sql-queries</code></td><td>精準取數：專注於撰寫並執行 SQL，提供最直接的數據解答。</td></tr><tr><td><code>generate-report</code></td><td>敘事化產出：將散落的數據洞察整合成包含圖表與摘要的完整報告。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非結構化數據提取：從 PDF 或 Word 中精準提取文字與表格，納入分析流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部數據轉換：處理 CSV/Excel 的匯入與轉換，實現跨資料源的分析。</td></tr></tbody></table><h4 class="journey-h4">設計結語：為什麼這對產品至關重要？</h4><p class="body">將功能轉化為 Skill，最大的 UX 價值在於<span class="stat-hi">「認知負擔的降低」</span>。對於用戶來說，他們不再需要學習「這個按鈕在哪裡」，只需要關注「我想達成什麼目標」。對產品團隊而言，這套架構讓能力的擴充變得異常輕量。當我們需要加入新的 AI 評估模型或特定的數據清洗邏輯時，我們不再需要去改動複雜的 UI 流程，而是直接發佈一個新的 Skill。這種「功能解耦、能力聚合」的設計，正是 Wren AI 能在 Agent 時代快速迭代、並同時保有「稽核級透明度」的核心技術資產。</p>',
      's05.title': '結果：加的是能力，不是介面',
      's05.out1.label': '用戶不用再學地圖',
      's05.out1.body': '描述目標就好。上線一個月內，舊入口的使用量從每月數千次掉到<span class="stat-hi">個位數</span>，沒有人回頭；早期回饋的讚與倒讚比例約為 <span class="stat-hi">4:1</span>（樣本尚小，持續追蹤中）。',
      's05.out2.label': '團隊出新功能，不再動 UI',
      's05.out2.body': '新能力就等於發佈一個 <span class="stat-hi">Skill</span>：沒有新按鈕、新頁面、新教學。介面開發從每個功能的固定成本，變成了一次性的架構投資。',
      's05.out3.label': '統一的觸發語法打開了生態',
      's05.out3.body': '用戶自訂 Skill 與 Official Skills 遵循同一套規則，能力的擴充從此不再只屬於產品團隊。',
      's01.title': '用戶用腳投票：十幾扇門，卻只走一扇',
      's01.lede': '想知道用戶是否記得住入口，與其用問的，不如直接觀察行為。我深挖了過去 90 天的產品數據，發現了以下事實：',
      's01.f1.label': '91% 的互動發生在同一個輸入框',
      's01.f1.body': '產品擁有十幾個功能入口，但在近 18,500 次的互動中，所有入口的使用率合計不到<span class="stat-hi">一成</span>，其餘全數發生在對話框裡。',
      's01.f2.label': '72% 的用戶從未碰過任何功能入口',
      's01.f2.body': '在 582 位活躍用戶中，多數人從頭到尾只待在對話框裡；即便是最熱門的功能入口，也只有 <span class="stat-hi">14%</span> 的人用過。',
      's01.f3.label': '20 段用戶錄影裡，有 13 段在選單間折返迷航',
      's01.f3.body': '觀察真實的操作錄影，用戶尋找功能的典型路徑並非直線直達，而是「點進去、退出、再換個選單試試看」。',
      's01.closing': '這並非用戶技能不足。各入口的差異早就寫在文件裡，UI 上也有輔助說明，但在 89 位活躍用戶的調查中，仍有 <span class="stat-hi">25%</span> 的人說不出其中兩個入口的差別。記住入口，本來就是產品強加給用戶的功課，而用戶從來都不想寫。',
      's02.title': '洞察：用戶記不住入口，但清楚自己想做什麼',
      's02.intro': '同一群記不住選單在哪的用戶，在輸入框裡的表達卻毫不含糊。',
      's02.e1.label': '證據 01 · 直接在對話裡點菜',
      's02.e1.body': '明明旁邊就有專屬按鈕，用戶依然直接開口要求：「生成一張圖」、「幫我做報表」、「改成折線圖」。對他們而言，<span class="stat-hi">語言不是備案，是第一直覺。</span>',
      's02.e2.label': '證據 02 · 連「產品能做什麼」都是用問的',
      's02.e2.body': '試用期的用戶會在輸入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。沒有人會再去翻選單來學習如何使用產品了。在用戶心中，輸入框就等於整個產品。',
      's02.e3.label': '證據 03 · 表達得比介面還精確',
      's02.e3.body': '重度用戶會直接把資料庫欄位名稱打進句子裡，精確度約是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而這些表達最清晰的請求一旦失敗，<span class="stat-hi">95.9%</span> 是因為舊架構接不住（<code>NO_RELEVANT_SQL</code>）。系統的瓶頸從來不是用戶的表達，而是產品的接收。',
      's02.turn.label': '關鍵轉折 · 把所有能力，搬進他們唯一記得的輸入框',
      's02.turn.body': '這個結論不是我們發想出來的，是用戶自己投出來的：<span class="stat-hi-blue">輸入框是他們唯一記得的入口。</span>與其再花心力教用戶按鈕在哪，我把每個功能都重建成住在對話裡的 <span class="stat-hi">Skill</span>，而且從最難搬、也最有價值的那一個開始：教 AI 這件事本身。',
      's03.title': '用對話教會 AI：Knowledge 變成一個 Skill',
      's03.lede': '最難搬的能力不是某顆報表按鈕，而是「教」這件事本身。Wren 要答得好，得先有人告訴它業務到底怎麼運作：指標、定義、規則。這就是 Knowledge，它既是產品裡最重的一道介面，也悄悄是團隊能做的最有價值的行為。',
      's03.f1.label': '建立 Knowledge，是團隊會不會付費最強的訊號之一',
      's03.f1.body': '在我們的啟用數據裡，有建立 Knowledge 的用戶，付費率約為基準的 <span class="stat-hi">2.9 倍</span>。再疊上「邀請隊友」，它就成了產品裡最強的付費訊號：以人計約 <span class="stat-hi">16%（約基準的 13 倍）</span>，<span class="stat-hi-blue">以團隊計約 47%</span>。教 AI 不是「有更好」，而是顧客能做的最有價值的行為。（此為相關性、付費樣本偏小，仍在訪談驗證中。）',
      's03.f2.label': '偏偏，它也是最少被做完的功能之一',
      's03.f2.body': '真正建立 Knowledge 的團隊只有約 <span class="stat-hi">10%</span>，而且採用率整年一路下滑。我們手上最強的槓桿，幾乎沒被碰過，因為要用到它，得先走完一個要一行一行填寫的手動設定頁，很多團隊做到一半就放棄了。',
      's03.chart.cap': '付費率（依行為 · 以人計 · 基準約 1%）',
      's03.chart.r1': '邀請隊友 ＋ 建立 Knowledge',
      's03.chart.r2': '只有邀請',
      's03.chart.r3': '只有 Knowledge',
      's03.chart.r4': '兩者皆無',
      's03.chart.tag': '約基準的 13 倍',
      's03.chart.note': '此為相關性、付費樣本偏小，仍在訪談驗證中。',
      's03.before.label': 'Before · Knowledge 是一個你得填完的頁面',
      's03.before.body': '業務邏輯是透過一個手動的 Knowledge 設定進來的，在專屬頁面上一行一行填，而且和「需要它的當下」是脫節的。你得先中斷提問去設定，再回來。多數團隊從沒填完，AI 也就一直只被教了一半。',
      's03.after.label': 'After · Knowledge 變成問問題途中的一句話',
      's03.after.body': '現在你可以邊問邊教，就像糾正同事那樣：「營收要扣掉退款。」Knowledge Skill 和 agent 會接住這條邏輯、整理好，再寫回 Knowledge。順手改的一句話，就變成整個團隊都會繼承的長效規則。',
      's03.detail.label': '設計細節',
      's03.detail.li1': '把 Knowledge 搬進對話框，讓人在問問題途中就教 AI，不必再開一個獨立頁面。',
      's03.detail.li2': 'Skill 與 agent 接住這條邏輯，自動整理後寫回 Knowledge。',
      's03.result.label': '結果',
      's03.result.li1': '「教」這件事，搬到了用戶本來就在的地方，沒有另外的設定任務，也沒有情境切換。',
      's03.result.li2': '讓設計跟著行為走，而不是逼行為去遷就介面。',
      's03.close': '這就是證明整套模式的那個案例。如果連「教」這件產品裡最結構化、最「像在做設定」的任務，都能收進一句話，那其他所有事也一樣可以。',
      's05.close': '有一條主線貫穿始終：不管是教 AI，還是擴充能力，我都沒有再加任何一道介面。兩件事我都搬進了用戶本來就在打的那一句話裡，也因此讓產品，直直對準了它手上最有價值的那個行為。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.行为数据',
      'nav.s02': '02.洞察',
      'nav.s03': '03.教 AI',
      'nav.s04': '04.Skill 化',
      'nav.s05': '05.结果',
      'title.big': '用对话教会 AI',
      'title.sub': '教 Wren AI 业务逻辑，过去得填一个多数团队从没填完的手动 Knowledge 页面，偏偏建立 Knowledge 是团队会不会付费最强的信号之一。于是我把它做成一个 Skill：像教同事一样，在问问题的当下用说的教 AI，而这套模式，成了每一项功能运作的方式。',
      'intro.overview.label': '我们要解决的问题',
      'intro.overview.body': 'Wren AI 是一款对话式 BI 工具，你可以用自然语言向数据提问。但要答得好，得先教会它：指标、定义、业务规则。这件「教」的事叫做 Knowledge，在旧版产品里，它是一个要一行一行填写的专属页面，和十几个没人记得住的功能入口并排放着。数据把利害关系讲得很清楚：有建立 Knowledge 的团队，付费概率高出许多，偏偏几乎没人把它做完。这篇案例分析要谈的，就是我如何把「教 AI」这件事，以及最终把每一项功能，都搬进用户真正待着的唯一地方：对话框。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同时担任设计师、用户研究员与 PM</span>。独立负责 Langfuse 与 PostHog 数据分析、Agent UX 的端到端设计、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上线后的假设验证框架</span>。',
      'intro.time.label': '公司与时程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最终产出：每个功能都是一个 Skill',
      's04.lede': 'Knowledge 证明了这套模式行得通，于是我把它一般化。Skill 是一个原子化的能力模块：只要一句话就能调用，或由 agent 依据上下文自动触发。在界面设计上，我只需回答三个核心问题：怎么触发？怎么确认？怎么让过程透明？',
      's04.replay': '重播',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': '定义 Official Skills：从"功能按钮"到"原子化能力"的转向',
      's04.jC.body': '<p class="body">在过去的线性架构中，许多核心功能（如生成报表、数据评估、文件解析）往往被设计成散落在界面各处的按钮或独立模式。这不仅增加了开发成本，也限制了用户的操作流畅度。我们重新定义了 Official Skills，将这些复杂的后端逻辑包装成<span class="stat-hi">"原子化"</span>的能力模块。</p><p class="body">这项转向最深的设计意义在于：<span class="stat-hi">Skill 让用户仅凭对话就能穿透整个系统</span>，与所有功能进行系统化、安全的交互。当每一个能力都收敛为同一种触发语法，自然语言便成为了产品唯一的入口。在这个基础上，我们看到了三个核心优势。</p><h4 class="journey-h4">1 · 统一的路由架构：将界面操作转化为自然语言指令</h4><p class="body">过去需要通过点击界面才能触发的特定任务，现在全部通过 Skill 路由实现。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要寻找"生成报表"的图标，Agent 会根据上下文自动触发，或由用户通过指令主动调用。</li><li><code>analyze-data</code> 与 <code>sql-queries</code>：我们将"回答问题"与"写 SQL"这两种不同维度的任务拆解，让 Agent 能精准判断何时该进行趋势探索，何时该精确产出数据。</li></ul><h4 class="journey-h4">2 · 抹平文件处理的鸿沟：Doc 与 PDF 的能力化</h4><p class="body">处理异质数据（如 Spreadsheet、PDF、Word）曾是 BI 工具的痛点。通过 <code>pdf</code>、<code>doc</code> 与 <code>spreadsheet</code> 技能，我们将文件解析逻辑从主程序中解耦。这意味着当用户拖入一个 <code>.zip</code> 压缩档或多种格式文件时，Agent 不再是混乱地读取，而是有条理地分配给对应的 Skill 进行处理。</p><h4 class="journey-h4">3 · 将特定 Pattern 转化为可复用的"知识资产"</h4><p class="body">过往要把特定的业务规则（Eval）或数据模型（Pattern）加入知识库，通常需要繁琐的手动设置。现在，这些逻辑可以被封装进 Skill。这不仅让官方能力更易于维护，也为"用户自定义 Skill"树立了标杆。官方 Skill 就像是 <span class="stat-hi">Reference Implementation（参考实作）</span>，引导用户理解如何将自己的 Eval 逻辑或专属工作流，通过相同的模式无缝植入 Agent 基因。</p><h4 class="journey-h4">Official Skills 概览：定义 Agent 的核心边界</h4><p class="body">我们精心策展了 6 个官方技能，作为 Agent 的基础能力层：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>设计目的与应用场景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>数据分析核心：当用户需要探索趋势、获取特定数字或进行可视化时触发。</td></tr><tr><td><code>sql-queries</code></td><td>精准取数：专注于撰写并执行 SQL，提供最直接的数据解答。</td></tr><tr><td><code>generate-report</code></td><td>叙事化产出：将散落的数据洞察整合成包含图表与摘要的完整报告。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非结构化数据提取：从 PDF 或 Word 中精准提取文字与表格，纳入分析流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部数据转换：处理 CSV/Excel 的导入与转换，实现跨数据源的分析。</td></tr></tbody></table><h4 class="journey-h4">设计结语：为什么这对产品至关重要？</h4><p class="body">将功能转化为 Skill，最大的 UX 价值在于<span class="stat-hi">"认知负担的降低"</span>。对于用户来说，他们不再需要学习"这个按钮在哪里"，只需要关注"我想达成什么目标"。对产品团队而言，这套架构让能力的扩充变得异常轻量。当我们需要加入新的 AI 评估模型或特定的数据清洗逻辑时，我们不再需要去改动复杂的 UI 流程，而是直接发布一个新的 Skill。这种"功能解耦、能力聚合"的设计，正是 Wren AI 能在 Agent 时代快速迭代、并同时保有"审计级透明度"的核心技术资产。</p>',
      's05.title': '结果：加的是能力，不是界面',
      's05.out1.label': '用户不用再学地图',
      's05.out1.body': '描述目标就好。上线一个月内，旧入口的使用量从每月数千次掉到<span class="stat-hi">个位数</span>，没有人回头；早期反馈的赞与踩比例约为 <span class="stat-hi">4:1</span>（样本尚小，持续跟踪中）。',
      's05.out2.label': '团队出新功能，不再动 UI',
      's05.out2.body': '新能力就等于发布一个 <span class="stat-hi">Skill</span>：没有新按钮、新页面、新教程。界面开发从每个功能的固定成本，变成了一次性的架构投资。',
      's05.out3.label': '统一的触发语法打开了生态',
      's05.out3.body': '用户自定义 Skill 与 Official Skills 遵循同一套规则，能力的扩展从此不再只属于产品团队。',
      's01.title': '用户用脚投票：十几扇门，却只走一扇',
      's01.lede': '想知道用户是否记得住入口，与其用问的，不如直接观察行为。我深挖了过去 90 天的产品数据，发现了以下事实：',
      's01.f1.label': '91% 的交互发生在同一个输入框',
      's01.f1.body': '产品拥有十几个功能入口，但在近 18,500 次的交互中，所有入口的使用率合计不到<span class="stat-hi">一成</span>，其余全数发生在对话框里。',
      's01.f2.label': '72% 的用户从未碰过任何功能入口',
      's01.f2.body': '在 582 位活跃用户中，多数人从头到尾只待在对话框里；即便是最热门的功能入口，也只有 <span class="stat-hi">14%</span> 的人用过。',
      's01.f3.label': '20 段用户录像里，有 13 段在菜单间折返迷航',
      's01.f3.body': '观察真实的操作录像，用户寻找功能的典型路径并非直线直达，而是「点进去、退出、再换个菜单试试看」。',
      's01.closing': '这并非用户技能不足。各入口的差异早就写在文档里，UI 上也有辅助说明，但在 89 位活跃用户的调查中，仍有 <span class="stat-hi">25%</span> 的人说不出其中两个入口的差别。记住入口，本来就是产品强加给用户的功课，而用户从来都不想写。',
      's02.title': '洞察：用户记不住入口，但清楚自己想做什么',
      's02.intro': '同一群记不住菜单在哪的用户，在输入框里的表达却毫不含糊。',
      's02.e1.label': '证据 01 · 直接在对话里点菜',
      's02.e1.body': '明明旁边就有专属按钮，用户依然直接开口要求：「生成一张图」、「帮我做报表」、「改成折线图」。对他们而言，<span class="stat-hi">语言不是备案，是第一直觉。</span>',
      's02.e2.label': '证据 02 · 连「产品能做什么」都是用问的',
      's02.e2.body': '试用期的用户会在输入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。没有人会再去翻菜单来学习如何使用产品了。在用户心中，输入框就等于整个产品。',
      's02.e3.label': '证据 03 · 表达得比界面还精确',
      's02.e3.body': '重度用户会直接把数据库字段名称打进句子里，精确度约是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而这些表达最清晰的请求一旦失败，<span class="stat-hi">95.9%</span> 是因为旧架构接不住（<code>NO_RELEVANT_SQL</code>）。系统的瓶颈从来不是用户的表达，而是产品的接收。',
      's02.turn.label': '关键转折 · 把所有能力，搬进他们唯一记得的输入框',
      's02.turn.body': '这个结论不是我们发想出来的，是用户自己投出来的：<span class="stat-hi-blue">输入框是他们唯一记得的入口。</span>与其再花心力教用户按钮在哪，我把每个功能都重建成住在对话里的 <span class="stat-hi">Skill</span>，而且从最难搬、也最有价值的那一个开始：教 AI 这件事本身。',
      's03.title': '用对话教会 AI：Knowledge 变成一个 Skill',
      's03.lede': '最难搬的能力不是某颗报表按钮，而是「教」这件事本身。Wren 要答得好，得先有人告诉它业务到底怎么运作：指标、定义、规则。这就是 Knowledge，它既是产品里最重的一道界面，也悄悄是团队能做的最有价值的行为。',
      's03.f1.label': '建立 Knowledge，是团队会不会付费最强的信号之一',
      's03.f1.body': '在我们的激活数据里，有建立 Knowledge 的用户，付费率约为基准的 <span class="stat-hi">2.9 倍</span>。再叠上「邀请队友」，它就成了产品里最强的付费信号：以人计约 <span class="stat-hi">16%（约基准的 13 倍）</span>，<span class="stat-hi-blue">以团队计约 47%</span>。教 AI 不是「有更好」，而是客户能做的最有价值的行为。（此为相关性、付费样本偏小，仍在访谈验证中。）',
      's03.f2.label': '偏偏，它也是最少被做完的功能之一',
      's03.f2.body': '真正建立 Knowledge 的团队只有约 <span class="stat-hi">10%</span>，而且采用率整年一路下滑。我们手上最强的杠杆，几乎没被碰过，因为要用到它，得先走完一个要一行一行填写的手动设置页，很多团队做到一半就放弃了。',
      's03.chart.cap': '付费率（依行为 · 以人计 · 基准约 1%）',
      's03.chart.r1': '邀请队友 ＋ 建立 Knowledge',
      's03.chart.r2': '只有邀请',
      's03.chart.r3': '只有 Knowledge',
      's03.chart.r4': '两者皆无',
      's03.chart.tag': '约基准的 13 倍',
      's03.chart.note': '此为相关性、付费样本偏小，仍在访谈验证中。',
      's03.before.label': 'Before · Knowledge 是一个你得填完的页面',
      's03.before.body': '业务逻辑是通过一个手动的 Knowledge 设置进来的，在专属页面上一行一行填，而且和「需要它的当下」是脱节的。你得先中断提问去设置，再回来。多数团队从没填完，AI 也就一直只被教了一半。',
      's03.after.label': 'After · Knowledge 变成问问题途中的一句话',
      's03.after.body': '现在你可以边问边教，就像纠正同事那样：「营收要扣掉退款。」Knowledge Skill 和 agent 会接住这条逻辑、整理好，再写回 Knowledge。顺手改的一句话，就变成整个团队都会继承的长效规则。',
      's03.detail.label': '设计细节',
      's03.detail.li1': '把 Knowledge 搬进对话框，让人在问问题途中就教 AI，不必再开一个独立页面。',
      's03.detail.li2': 'Skill 与 agent 接住这条逻辑，自动整理后写回 Knowledge。',
      's03.result.label': '结果',
      's03.result.li1': '「教」这件事，搬到了用户本来就在的地方，没有另外的设置任务，也没有情境切换。',
      's03.result.li2': '让设计跟着行为走，而不是逼行为去迁就界面。',
      's03.close': '这就是证明整套模式的那个案例。如果连「教」这件产品里最结构化、最「像在做设置」的任务，都能收进一句话，那其他所有事也一样可以。',
      's05.close': '有一条主线贯穿始终：不管是教 AI，还是扩充能力，我都没有再加任何一道界面。两件事我都搬进了用户本来就在打的那一句话里，也因此让产品，直直对准了它手上最有价值的那个行为。',
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (lang === 'en') {
        // restore: the default English text remains in HTML; nothing to do
        // but if we switched away and back, restore requires storing original
        const orig = el.getAttribute('data-i18n-orig');
        if (orig != null) el.innerHTML = orig;
      } else if (dict[key] != null) {
        if (!el.hasAttribute('data-i18n-orig')) el.setAttribute('data-i18n-orig', el.innerHTML);
        el.innerHTML = dict[key];
      }
    });
    const htmlEl = document.documentElement;
    if (lang === 'en') htmlEl.setAttribute('lang', 'en');
    else if (lang === 'ja') htmlEl.setAttribute('lang', 'ja');
    else if (lang === 'zh-tw') htmlEl.setAttribute('lang', 'zh-TW');
    else if (lang === 'zh-cn') htmlEl.setAttribute('lang', 'zh-CN');
  }

  // ── Language switcher ──
  (function() {
    const sel = document.getElementById('nav-lang-select');
    if (!sel) return;
    try {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved) { sel.value = saved; applyLang(saved); }
    } catch(e) {}
    sel.addEventListener('change', () => {
      try { localStorage.setItem('portfolio-lang', sel.value); } catch(e) {}
      applyLang(sel.value);
    });
  })();

})();
