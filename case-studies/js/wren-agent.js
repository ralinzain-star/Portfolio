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
      'nav.s04': '03.Skill 化',
      'nav.s05': '04.成果',
      'title.big': '機能は増やす、UI は増やさない：Wren AI の Skill 化デザイン',
      'title.sub': '新機能を出すたびに、ボタンやページ、モードがひとつ増えていました。しかし 90 日分の行動データが突きつけたのは、別の事実でした。インタラクションの 91% は、ひとつの入力ボックスで起きていたのです。そこで私は、すべての機能を会話で呼び出せる「アトミックな Skill」として作り直し、新機能のリリースに新しい UI を積み増す必要をなくしました。',
      'intro.overview.label': '解決したかった問題',
      'intro.overview.body': 'かつての Wren AI では、すべての機能に専用の入口がありました。ダッシュボードには入口、スプレッドシートには入口、チャートのピン留めにはボタン、ナレッジベースには専用ページ。ユーザーは「どこにあるか」を覚えてからでないと作業を始められず、チームは機能を出すたびに新しい UI を一から設計していました。このケーススタディでは、「ユーザーはそもそもこれらの入口を必要としていない」ことをデータで示した過程と、最終的にリリースした Skill アーキテクチャを紹介します。',
      'intro.role.label': '担当範囲',
      'intro.role.body': '<span class="stat-hi">デザイナー・リサーチャー・PM を一人で兼任</span>。Langfuse と PostHog のデータ分析、Agent UX のエンドツーエンド設計、<span class="stat-hi">モード戦略</span>、そして<span class="stat-hi">ローンチ後の仮説検証フレームワーク</span>まで一貫して担当しました。',
      'intro.time.label': '会社と時期',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最終アウトプット：すべての機能をひとつの Skill に',
      's04.lede': 'Skill はアトミックな能力モジュールです。一文で呼び出すか、agent が文脈から自動で起動します。デザインで答えるべき問いは 3 つだけでした。どう呼び出すか？どう確認するか？どう過程を見せるか？',
      's04.replay': 'リプレイ',
      's04.pause': '一時停止',
      's04.resume': '再開',
      's04.playflow': 'フローを再生',
      's04.jA.eyebrow': 'ガイド付き探索',
      's04.jA.title': 'ガイド付き探索：問いの輪郭を描く',
      's04.jA.body': '目標は明確でも、的確な問いに落とすのは意外と難しいものです。ビジネスユーザーが 「このデータを探索したい」 という曖昧な意図でやってきたとき、Agent の仕事は<span class="stat-hi">「推測」</span>ではなく<span class="stat-hi">「ガイド」</span>です。<br><br>私が設計したのは、段階的な確認フロー。結果を左右する分岐点に当たるたびに、システムが <span class="stat-hi">単一選択パネル</span>（分析タイプ・期間・セグメンテーション）を差し出します。各パネルは分析を前に進める <span class="stat-hi">Checkpoint</span> であって、探索をふさぐ壁ではありません。<code>Skip</code> も併設して、初心者に必要な案内と、熟練者に必要な自由度を両立させました。',
      's04.jB.eyebrow': 'Thinking Steps を強化',
      's04.jB.title': 'Thinking Steps の強化：透明で追える推論の軌跡',
      's04.jB.body': '私たちは透明性をプロダクトの DNA に深く組み込みました。<br><br><strong>ストリーミング推論（Streaming Logic）：</strong><span class="stat-hi">Thinking Step</span> を通じて、Agent のアクションが原語（Primitive）として流れていきます。視覚的な spinner から checkmark への変化だけでなく、その背後の SQL とツール呼び出しまで余すところなく開かれ、AI の思考の道筋を上から見渡せます。<br><br><strong>書ける精度：</strong>私たちは重たい Ad-hoc モードを完全に廃し、軽量な <span class="stat-hi">Skill</span> システムに置き換えました。ユーザーは Context 検索と Schema マッピングのロジックを自分で書け、「対話そのものが開発になる」を実現します。',
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
      's05.ref.r1': 'このプロダクトを設計しながら、ふと考え込んでしまいました。デザイナーがもう手を動かして描かないなら、それでも彼女はデザイナーなのでしょうか。伝統的な手仕事が自動化されていくこの時代、作り手の「良さ」はどう測ればいいのでしょう。物理的にせよデジタルにせよ、「モノ」がその中心性を失ったとき、デザイナーには何が残るのでしょうか。',
      's05.ref.r2': 'AI の領域のなかで何かをつくりながら、私はいつもこの問いにつきまとわれています。インターフェースがたった一つのchat bubbleと、一つのテキスト入力欄にまで削ぎ落とされたこの時代に、私たちにはいったい何ができるのでしょうか。',
      's05.ref.h1': 'プロセスの死、意図の誕生',
      's05.ref.h1b1': 'バリに滞在していたとき、Anthropic のデザイナー Jenny Wen の仕事に出会いました。彼女は「デザインプロセスは死んだ」と言い切り、その一文はデザインコミュニティに小さくない衝撃を走らせました。静かな瞑想と、ユーザーデータをひたすら見つめ続ける緊張。その両極のあいだを行き来しながら、私はひとつの答えにたどり着きます。<span class="stat-hi">私たちがデザイナーになるのは、どうしても作らずにはいられないものがあるから。この世に見たくてたまらない世界があるからです。</span>',
      's05.ref.h1b2': 'ツールは増え、ノイズもずっと大きくなりました。それでも、核心にある思想そのものは揺らぎません。私たちはいつも、自分自身に問い続けなければなりません。',
      's05.ref.li1': '私たちが届けようとしているメッセージは、いったい何か。',
      's05.ref.li2': 'ユーザーに差し出している、根源的な価値とは何か。',
      's05.ref.li3': 'このやり取りが終わったあと、ユーザーに何を持ち帰ってほしいのか。',
      's05.ref.h2': '「つくったもの」の、その先へ',
      's05.ref.h2b1': '「デザインオブジェクト」、つまりインターフェース、アイコン、レイアウトは、あくまで一つの乗り物にすぎません。より長い旅の途中にある、通過点のひとつです。デザインの本質は、ピクセルの美しさにあったことなど一度もなく、いつだって影響力そのものでした。',
      's05.ref.h2b2': 'かつて、ある師匠がこう言いました。<span class="stat-hi">「デザイナーは、対話をあきらめた瞬間に死ぬ。伝えることをやめたら、そこでデザインも終わってしまう。」</span>',
      's05.ref.h2b3': 'AI 時代のデザイナーとして、私たちの役割はすっかり変わりました。私たちはもう、ただツールを作っているのではなく、<span class="stat-hi">対話そのものの媒体</span>をかたちづくっているのです。AI が人と言葉を交わし、人を励まし、助け、力づけるための場を設計する。そしてその先で、AI を使って誰かに影響を与える何かを生み出す人たちを、もっと増やしていきたい。創造と対話がお互いを呼び起こしていく。その循環のきっかけになることこそが、私たちの本当のゴールです。',
      's02.title': 'インサイト：ユーザーは入口を覚えられない。でも、やりたいことは言える',
      's02.intro': 'ドアを覚えられない同じユーザーが、入力ボックスの中では驚くほど明瞭に語ります。',
      's02.e1.label': '証拠 01 · 機能を、言葉で「注文」する',
      's02.e1.body': '専用ボタンのある機能でも、ユーザーは打ち込んで頼みます。「チャートを作って」「レポートを生成して」「折れ線グラフに変えて」。ボタンはすぐそこにあるのに、それでも打つ。<span class="stat-hi">言語は代替手段ではなく、第一の本能です。</span>',
      's02.e2.label': '証拠 02 · 「何ができるか」さえ、メニューではなく質問で知ろうとする',
      's02.e2.body': 'トライアルユーザーは入力ボックスに <span class="stat-hi-blue">"what can I ask?"</span> と打ち込みます。メニューを開いてプロダクトを学ぶ人はいません。ユーザーの頭の中では、入力ボックスがすでにプロダクトそのものなのです。',
      's02.e3.label': '証拠 03 · インターフェースが受け止めきれないほど正確に語る',
      's02.e3.body': 'ヘビーユーザーはカラム名をそのまま文章に打ち込みます。その正確さは新規ユーザーの約 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。そして、これほど明瞭なリクエストが失敗するとき、<span class="stat-hi">95.9%</span> は旧アーキテクチャが受け止められなかったケースでした（<code>NO_RELEVANT_SQL</code>）。ボトルネックは表現側ではなく、受信側にあったのです。',
      's02.turn.label': '転換点 · すべての能力を、ユーザーが唯一覚えている入力ボックスへ移す',
      's02.turn.body': 'この結論は私たちが考え出したものではなく、ユーザーが行動で示したものです。<span class="stat-hi-blue">入力ボックスは、彼らが覚えている唯一の入口。</span>ボタンの場所をもう一度教える代わりに、すべての機能を会話の中に住む <span class="stat-hi">Skill</span> として作り直しました。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.行為數據',
      'nav.s02': '02.洞察',
      'nav.s04': '03.Skill 化',
      'nav.s05': '04.結果',
      'title.big': '加功能，不加介面：Wren AI 的 Skill 化設計',
      'title.sub': '產品每新增一個功能，往往伴隨著新按鈕、新頁面或新模式。然而，90 天的行為數據卻揭示了一個殘酷的事實：91% 的互動都發生在同一個輸入框。因此，我將產品的每項功能重構為透過對話即可呼叫的「原子化 Skill」，讓新功能的上線，從此不再需要疊加新介面。',
      'intro.overview.label': '我們要解決的問題',
      'intro.overview.body': '在過去的 Wren AI 中，每個功能都有專屬的入口：Dashboard 有入口、Spreadsheet 有入口、Pin 圖表有按鈕、知識庫有獨立頁面。用戶必須先記住「東西在哪」，才能開始工作；而團隊每推出一項新功能，就得重新設計一輪 UI。這篇案例分析將探討我如何透過數據證明「用戶根本不需要這些入口」，以及我們最終落地的 Skill 架構。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同時擔任設計師、用戶研究員與 PM</span>。獨立負責 Langfuse 與 PostHog 數據分析、Agent UX 的端到端設計、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上線後的假設驗證框架</span>。',
      'intro.time.label': '公司與時程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最終產出：每個功能都是一個 Skill',
      's04.lede': 'Skill 是一個原子化的能力模組：只要一句話就能呼叫，或由 agent 依據上下文自動觸發。在介面設計上，我們只需回答三個核心問題：怎麼觸發？怎麼確認？怎麼讓過程透明？',
      's04.replay': '重播',
      's04.pause': '暫停',
      's04.resume': '繼續',
      's04.playflow': '播放流程',
      's04.jA.eyebrow': '引導式探索',
      's04.jA.title': '引導式探索：定義問題的形狀',
      's04.jA.body': '用戶往往帶著明確的目標，卻難以描述精確的問題。當業務用戶帶著「探索這份資料」的模糊意圖進入系統時，Agent 的任務不再是<span class="stat-hi">「猜測」</span>，而是<span class="stat-hi">「引導」</span>。<br><br>我設計了一套漸進式確認流程：遇到會影響結果的分歧點時，系統會主動彈出輕量的<span class="stat-hi">單選面板</span>（如分析類型、時間維度、分群方式）。這些面板是引導前行的 <span class="stat-hi">Checkpoint</span>，同時保留了 <code>Skip</code> 選項，完美平衡了「新手需要的指引」與「專家需要的自由度」。',
      's04.jB.eyebrow': '強化 Thinking Steps',
      's04.jB.title': '強化 Thinking Steps：透明可見的推理軌跡',
      's04.jB.body': '我們將透明度深植於產品基因中。<br><br><strong>流式推理（Streaming Logic）：</strong>透過 <span class="stat-hi">Thinking Step</span>，Agent 的動作以原語（Primitive）形式流出。這不僅是視覺上的 spinner 變成 checkmark，更是背後 SQL 與工具呼叫的完整解構，讓用戶擁有上帝視角，掌握 AI 的思維脈絡。<br><br><strong>可被書寫的精準度：</strong>我們徹底取消了繁重的 Ad-hoc 模式，取而代之的是輕巧的 <span class="stat-hi">Skill</span> 系統。用戶可以自訂 Context 檢索與 Schema 對應邏輯，真正實現「對話即開發」。',
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
      's05.ref.r1': '在設計這個產品功能時，我不禁想，若一位設計師不再親手繪製，她還稱得上是設計師嗎？當傳統的手藝被自動化取代，我們要如何衡量一位創作者的「好」？當實體或數位上的「作品」不再處於核心時，設計師身上究竟還剩下什麼？',
      's05.ref.r2': '當我在 AI 的疆域裡持續打造產品，這些問題始終縈繞著我。在介面已經被簡化到只剩下一個chat bubble與一個輸入框的時代，身為設計師，我們還能做些什麼？',
      's05.ref.h1': '流程之死，意圖的誕生',
      's05.ref.h1b1': '在峇里島時，我讀到 Anthropic 設計師 Jenny Wen 的文字，她公開宣告 「設計流程已死」。這句話在設計圈投下不小的震盪。在安靜冥想與緊盯用戶數據這兩個極端之間反覆來回，我終於沉澱出一個答案，<span class="stat-hi">我們之所以成為設計師，是因為心裡有非創造不可的東西，有一個非常想看見它存在的世界。</span>',
      's05.ref.h1b2': '工具變多了，雜音也更大了，但核心的哲學從未動搖。我們必須不斷地追問自己，',
      's05.ref.li1': '我們想傳遞的訊息，究竟是什麼？',
      's05.ref.li2': '我們提供給使用者的根本價值，究竟是什麼？',
      's05.ref.li3': '當這段互動結束之後，我們希望使用者帶走什麼？',
      's05.ref.h2': '超越「作品」本身',
      's05.ref.h2b1': '「設計物件」，介面、圖示、版面，其實只是一個載體，只是更長的旅程中的一個驛站。設計的本質從來不是像素的精巧，始終是<span class="stat-hi">影響力</span>本身。',
      's05.ref.h2b2': '一位前輩曾這樣告訴我，<span class="stat-hi">「設計師永遠不能放棄對話。當設計師停止溝通的那一刻，設計也隨之死去。」</span>',
      's05.ref.h2b3': '身為 AI 時代的設計師，我們的角色早已不同。我們不再只是打磨工具，而是在塑造<span class="stat-hi">對話本身的媒介</span>。我們設計 AI 與人類交談，為了啟發、為了協助、為了賦能。我們最終想做的，是鼓勵更多人用 AI 去創造出能影響他人的事物，讓創造與對話彼此呼應，形成一個正向循環。',
      's02.title': '洞察：用戶記不住入口，但清楚自己想做什麼',
      's02.intro': '同一群記不住選單在哪的用戶，在輸入框裡的表達卻毫不含糊。',
      's02.e1.label': '證據 01 · 直接在對話裡點菜',
      's02.e1.body': '明明旁邊就有專屬按鈕，用戶依然直接開口要求：「生成一張圖」、「幫我做報表」、「改成折線圖」。對他們而言，<span class="stat-hi">語言不是備案，是第一直覺。</span>',
      's02.e2.label': '證據 02 · 連「產品能做什麼」都是用問的',
      's02.e2.body': '試用期的用戶會在輸入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。沒有人會再去翻選單來學習如何使用產品了。在用戶心中，輸入框就等於整個產品。',
      's02.e3.label': '證據 03 · 表達得比介面還精確',
      's02.e3.body': '重度用戶會直接把資料庫欄位名稱打進句子裡，精確度約是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而這些表達最清晰的請求一旦失敗，<span class="stat-hi">95.9%</span> 是因為舊架構接不住（<code>NO_RELEVANT_SQL</code>）。系統的瓶頸從來不是用戶的表達，而是產品的接收。',
      's02.turn.label': '關鍵轉折 · 把所有能力，搬進他們唯一記得的輸入框',
      's02.turn.body': '這個結論不是我們發想出來的，是用戶自己投出來的：<span class="stat-hi-blue">輸入框是他們唯一記得的入口。</span>與其再花心力教用戶按鈕在哪，不如把每個功能重建成住在對話裡的 <span class="stat-hi">Skill</span>。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.行为数据',
      'nav.s02': '02.洞察',
      'nav.s04': '03.Skill 化',
      'nav.s05': '04.结果',
      'title.big': '加功能，不加界面：Wren AI 的 Skill 化设计',
      'title.sub': '产品每新增一个功能，往往伴随着新按钮、新页面或新模式。然而，90 天的行为数据却揭示了一个残酷的事实：91% 的交互都发生在同一个输入框。因此，我将产品的每项功能重构为通过对话即可调用的「原子化 Skill」，让新功能的上线，从此不再需要叠加新界面。',
      'intro.overview.label': '我们要解决的问题',
      'intro.overview.body': '在过去的 Wren AI 中，每个功能都有专属的入口：Dashboard 有入口、Spreadsheet 有入口、Pin 图表有按钮、知识库有独立页面。用户必须先记住「东西在哪」，才能开始工作；而团队每推出一项新功能，就得重新设计一轮 UI。这篇案例分析将探讨我如何通过数据证明「用户根本不需要这些入口」，以及我们最终落地的 Skill 架构。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同时担任设计师、用户研究员与 PM</span>。独立负责 Langfuse 与 PostHog 数据分析、Agent UX 的端到端设计、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上线后的假设验证框架</span>。',
      'intro.time.label': '公司与时程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': '最终产出：每个功能都是一个 Skill',
      's04.lede': 'Skill 是一个原子化的能力模块：只要一句话就能调用，或由 agent 依据上下文自动触发。在界面设计上，我们只需回答三个核心问题：怎么触发？怎么确认？怎么让过程透明？',
      's04.replay': '重播',
      's04.pause': '暂停',
      's04.resume': '继续',
      's04.playflow': '播放流程',
      's04.jA.eyebrow': '引导式探索',
      's04.jA.title': '引导式探索：定义问题的形状',
      's04.jA.body': '用户往往带着明确的目标，却难以描述精确的问题。当业务用户带着「探索这份数据」的模糊意图进入系统时，Agent 的任务不再是<span class="stat-hi">「猜测」</span>，而是<span class="stat-hi">「引导」</span>。<br><br>我设计了一套渐进式确认流程：遇到会影响结果的分歧点时，系统会主动弹出轻量的<span class="stat-hi">单选面板</span>（如分析类型、时间维度、分群方式）。这些面板是引导前行的 <span class="stat-hi">Checkpoint</span>，同时保留了 <code>Skip</code> 选项，完美平衡了「新手需要的指引」与「专家需要的自由度」。',
      's04.jB.eyebrow': '强化 Thinking Steps',
      's04.jB.title': '强化 Thinking Steps：透明可见的推理轨迹',
      's04.jB.body': '我们将透明度深植于产品基因中。<br><br><strong>流式推理（Streaming Logic）：</strong>通过 <span class="stat-hi">Thinking Step</span>，Agent 的动作以原语（Primitive）形式流出。这不仅是视觉上的 spinner 变成 checkmark，更是背后 SQL 与工具调用的完整解构，让用户拥有上帝视角，掌握 AI 的思维脉络。<br><br><strong>可被书写的精准度：</strong>我们彻底取消了繁重的 Ad-hoc 模式，取而代之的是轻巧的 <span class="stat-hi">Skill</span> 系统。用户可以自定义 Context 检索与 Schema 对应逻辑，真正实现「对话即开发」。',
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
      's05.ref.r1': '在设计这个产品功能时，我不禁想，若一位设计师不再亲手绘制，她还称得上是设计师吗？当传统的手艺被自动化取代，我们要如何衡量一位创作者的"好"？当实体或数字上的"作品"不再处于核心时，设计师身上究竟还剩下什么？',
      's05.ref.r2': '当我在 AI 的疆域里持续打造产品，这些问题始终萦绕着我。在界面已经被简化到只剩下一个chat bubble与一个输入框的时代，身为设计师，我们还能做些什么？',
      's05.ref.h1': '流程之死，意图的诞生',
      's05.ref.h1b1': '在巴厘岛时，我读到 Anthropic 设计师 Jenny Wen 的文字，她公开宣告 "设计流程已死"。这句话在设计圈投下了不小的震动。在安静冥想与紧盯用户数据这两个极端之间反复来回，我终于沉淀出一个答案，<span class="stat-hi">我们之所以成为设计师，是因为心里有非创造不可的东西，有一个非常想看见它存在的世界。</span>',
      's05.ref.h1b2': '工具变多了，杂音也更大了，但核心的哲学从未动摇。我们必须不断地追问自己，',
      's05.ref.li1': '我们想传递的信息，究竟是什么？',
      's05.ref.li2': '我们提供给用户的根本价值，究竟是什么？',
      's05.ref.li3': '当这段互动结束之后，我们希望用户带走什么？',
      's05.ref.h2': '超越"作品"本身',
      's05.ref.h2b1': '"设计物件"，界面、图标、版面，其实只是一个载体，只是更长旅程中的一个驿站。设计的本质从来不是像素的精巧，始终是<span class="stat-hi">影响力</span>本身。',
      's05.ref.h2b2': '一位前辈曾这样告诉我，<span class="stat-hi">"设计师永远不能放弃对话。当设计师停止沟通的那一刻，设计也随之死去。"</span>',
      's05.ref.h2b3': '身为 AI 时代的设计师，我们的角色早已不同。我们不再只是打磨工具，而是在塑造<span class="stat-hi">对话本身的媒介</span>。我们设计 AI 与人类交谈，为了启发、为了协助、为了赋能。我们最终想做的，是鼓励更多人用 AI 去创造出能影响他人的事物，让创造与对话彼此呼应，形成一个正向循环。',
      's02.title': '洞察：用户记不住入口，但清楚自己想做什么',
      's02.intro': '同一群记不住菜单在哪的用户，在输入框里的表达却毫不含糊。',
      's02.e1.label': '证据 01 · 直接在对话里点菜',
      's02.e1.body': '明明旁边就有专属按钮，用户依然直接开口要求：「生成一张图」、「帮我做报表」、「改成折线图」。对他们而言，<span class="stat-hi">语言不是备案，是第一直觉。</span>',
      's02.e2.label': '证据 02 · 连「产品能做什么」都是用问的',
      's02.e2.body': '试用期的用户会在输入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。没有人会再去翻菜单来学习如何使用产品了。在用户心中，输入框就等于整个产品。',
      's02.e3.label': '证据 03 · 表达得比界面还精确',
      's02.e3.body': '重度用户会直接把数据库字段名称打进句子里，精确度约是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而这些表达最清晰的请求一旦失败，<span class="stat-hi">95.9%</span> 是因为旧架构接不住（<code>NO_RELEVANT_SQL</code>）。系统的瓶颈从来不是用户的表达，而是产品的接收。',
      's02.turn.label': '关键转折 · 把所有能力，搬进他们唯一记得的输入框',
      's02.turn.body': '这个结论不是我们发想出来的，是用户自己投出来的：<span class="stat-hi-blue">输入框是他们唯一记得的入口。</span>与其再花心力教用户按钮在哪，不如把每个功能重建成住在对话里的 <span class="stat-hi">Skill</span>。',
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
