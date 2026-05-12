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
      });
    });
  })();

  // ── i18n ──
  const I18N = {
    en: {},
    ja: {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.はじめに',
      'nav.s01': '01.データ考古学',
      'nav.s02': '02.診断と決断',
      'nav.s04': '03.解決策',
      'nav.s05': '04.むすび',
      'title.big': 'ひとつのプロダクト、3 つの心：会話型 BI を問い直す',
      'title.sub': '約 1 万件のクエリログから 3 つの技術世代を浮かび上がらせ、AI 駆動 BI の信頼アーキテクチャを描き直した。',
      'intro.overview.label': 'はじめに',
      'intro.overview.body': 'AI 駆動の BI（Business Intelligence）で一番難しかったのは「SQL をどう生成するか」ではなく、「どうやって信頼を勝ち取るか」でした。Wren AI のシニアプロダクトデザイナーとして、私は従来の会話モデルから「Agent 時代」への転換をリードしています。ユーザーはデータと向き合うとき、「自由に探索したい」と「精密に制御したい」という 2 つの極のあいだで揺れ続けていました。このケーススタディでは、3 世代の技術更迭を通じて、線形アーキテクチャが残した信頼の穴をどう埋めたかを解きほぐします。',
      'intro.role.label': '担当範囲',
      'intro.role.body': '<span class="stat-hi">デザイナー・リサーチャー・PM を一人で兼任</span>。Langfuse と PostHog の分析、Agent UX のエンドツーエンド設計、<span class="stat-hi">モード戦略</span>、そして<span class="stat-hi">ローンチ後の仮説検証フレームワーク</span>まで一貫して担当しました。',
      'intro.time.label': '会社と時期',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': 'The Solution, 2 世代の経験を融合する',
      's04.lede': '古い機能を単に消したのではありません。過去 2 世代で積み上げた現場知を、技術とデザインの両面から深く統合しました。',
      's04.q.label': 'Interactive モードから学んだこと：対話が粘り強さを生む',
      's04.q.body': 'Interactive モードから学んだのは、<span class="stat-hi-blue">対話があれば、ユーザーは結果を粘り強く調整できる</span>ということでした。Agent Mode は一連の <span class="stat-hi">Checkpoint</span>（事前選択パネル）を通じて、データ探索を一発勝負ではなく <span class="stat-hi">テンポよく成果を積み重ねるサイクル</span> に変えます。精密だが曖昧なフィールドを入力したとき、Agent はもう <code>NO_RELEVANT_SQL</code> を返しません。先回りして意図を確かめ、失敗寸前の体験を、導かれた成功体験へと切り替えます。',
      's04.p.label': 'Ad-hoc モードを昇華：デバッグ体験を組み込みスキルに',
      's04.p.body': '以前はモードを切り替えないと得られなかった透明性を、<span class="stat-hi">Skill-based（スキル化）アーキテクチャ</span>によって Agent の中核機能として取り込みました。あの 62.5% の声に応えるべく、デバッグ体験を Agent の振る舞いそのものに編み込んでいます。ユーザーはニーズに合わせてスキルの実行パラメータを調整でき、SQL 生成と推論パスは余すところなく可視化され、自然言語でそのまま問いかけられます。',
      's04.replay': 'リプレイ',
      's04.jA.eyebrow': 'ガイド付き探索',
      's04.jA.title': 'ガイド付き探索：問いの輪郭を描く',
      's04.jA.body': '目標は明確でも、的確な問いに落とすのは意外と難しいものです。ビジネスユーザーが 「このデータを探索したい」 という曖昧な意図でやってきたとき、Agent の仕事は<span class="stat-hi">「推測」</span>ではなく<span class="stat-hi">「ガイド」</span>です。<br><br>私が設計したのは、段階的な確認フロー。結果を左右する分岐点に当たるたびに、システムが <span class="stat-hi">単一選択パネル</span>（分析タイプ・期間・セグメンテーション）を差し出します。各パネルは分析を前に進める <span class="stat-hi">Checkpoint</span> であって、探索をふさぐ壁ではありません。<code>Skip</code> も併設して、初心者に必要な案内と、熟練者に必要な自由度を両立させました。',
      's04.jB.eyebrow': 'Thinking Steps を強化',
      's04.jB.title': '厳格な監査人のコントロールを引き継ぐ, モードではなく、透明な軌跡として',
      's04.jB.body': '今回のリニューアルで、私たちは透明性をプロダクトの DNA に組み込みました。<br><br><strong>ストリーミング推論（Streaming Logic）：</strong><span class="stat-hi">Thinking Step</span> を通じて、Agent のアクションが原語（Primitive）として流れていきます。視覚的な spinner → checkmark の先には、背後の SQL とツール呼び出しが余すところなく開かれていて、AI の思考の道筋を上から見渡せます。<br><br><strong>Skill — 書ける精度：</strong>Ad-hoc Mode の境界を完全に取り払い、代わりに <span class="stat-hi">Skill</span> システムを置きました。Context 検索と Schema マッピングのロジックを自分で書け、重たいモードを、軽くて何度でも呼び出せる技能セットに変えられます。対話そのものが、開発の場になる、ということです。',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': 'Official Skills の再定義 — 「機能ボタン」から「アトミックな能力」へ',
      's04.jC.body': '<p class="body">以前の線形アーキテクチャでは、レポート生成・データ評価・ドキュメント解析といった中核機能が、UI 上のボタンや専用モードとして散らばっていました。これは開発コストを膨らませ、ユーザーの作業の流れも分断していました。私たちは Official Skills を再定義し、これらの複雑なバックエンドロジックを<span class="stat-hi">「アトミックな」</span>能力モジュールにまとめ直しました。この転換は、プロダクトに 3 つの核となる利点をもたらしました。</p><h4 class="journey-h4">1 · 統一されたルーティング — UI 操作を自然言語コマンドへ</h4><p class="body">以前は UI のクリックでしか発火できなかった特定のタスクが、すべて Skill ルーティング経由で実行されるようになりました。</p><ul class="journey-list"><li><code>generate-report</code>：「レポート生成」アイコンを探す必要はもうありません。Agent が文脈から発火するか、ユーザーがコマンドで明示的に呼びます。</li><li><code>analyze-data</code> と <code>sql-queries</code>：「問いに答える」と「SQL を書く」という別次元のタスクを切り離し、Agent はどのタイミングで探索すべきか、いつ正確な数字を取りに行くべきかを判断できます。</li></ul><h4 class="journey-h4">2 · ドキュメント処理の溝を埋める — doc と pdf の能力化</h4><p class="body">異種データ（Spreadsheet、PDF、Word）の扱いは、BI ツールの長年の痛みでした。<code>pdf</code>、<code>doc</code>、<code>spreadsheet</code> の各 Skill によって、解析ロジックを本体から切り離しています。<code>.zip</code> や複数フォーマットが混ざったファイルをドロップしても、Agent はもう混乱して読み込まず、対応する Skill へきちんとディスパッチします。</p><h4 class="journey-h4">3 · 特定のパターンを、再利用可能な「知識資産」に</h4><p class="body">業務ルール（Eval）やデータパターンをナレッジベースに足すのは、これまで手作業の繰り返しでした。今はそうしたロジックを Skill にパッケージできます。保守が楽になるだけでなく、ユーザー独自の Skill にも基準点ができました。Official Skill は <span class="stat-hi">Reference Implementation（参考実装）</span>として機能し、ユーザーが自分の Eval ロジックや専有ワークフローを、同じパターンで Agent の DNA に埋め込む方法を示します。</p><h4 class="journey-h4">Official Skills 一覧 — Agent の中核領域を定義する</h4><p class="body">私たちは 6 つの Official Skills を厳選し、Agent の基礎能力レイヤーとしました：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計意図とユースケース</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>分析のコア。ユーザーがトレンド探索、具体的な数値の取得、可視化を求めるときに発火。</td></tr><tr><td><code>sql-queries</code></td><td>精密なデータ取得。SQL の作成と実行に特化し、最短距離の回答を返す。</td></tr><tr><td><code>generate-report</code></td><td>ナラティブな出力。散らばったインサイトを、図表とサマリー付きの完成形レポートに統合。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非構造データの抽出。PDF や Word からテキスト・表を正確に取り出し、分析パイプラインへ。</td></tr><tr><td><code>spreadsheet</code></td><td>外部データの変換。CSV/Excel のインポートと変換を担い、データソースを跨いだ分析を実現。</td></tr></tbody></table><h4 class="journey-h4">なぜ、これがプロダクトにとって重要か</h4><p class="body">機能を Skill に変えることの最大の UX 価値は、<span class="stat-hi">認知負荷の削減</span>です。ユーザーは「このボタンはどこにある？」を覚える必要がなくなり、「何を達成したいか」だけに集中できます。プロダクトチームにとっては、能力拡張が驚くほど軽量になります。新しい AI 評価モデルや特定のデータクリーニングロジックを足したいとき、複雑な UI フローを書き換える必要はなく、新しい Skill をリリースすれば済みます。この「機能のデカップリング、能力のアグリゲーション」というアーキテクチャこそ、Wren AI が Agent 時代に高速で反復しつつ、監査レベルの透明性を保てる、中核的な技術資産です。</p>',
      's05.title': 'むすびにかえて、「つくったもの」の、その先へ',
      's05.closing.body1': '最終的に届けたのは、<span class="stat-hi">厳格な監査人の魂</span>を<span class="stat-hi">軽やかな対話の器</span>に宿したものでした。',
      's05.closing.body2': 'SQL 確認もロジックのデバッグも、もはや体験の外に置かれた「異物」ではありません。必要なときに呼び出せる思考の証跡として、体験の内側に溶け込んでいます。Ad-hoc を取り除くことは、信頼の受け渡しの実験でした。<span class="stat-hi">意図</span>の段階でエラーを食い止め、<span class="stat-hi">実行</span>の段階でなめらかな透明な軌跡を見せられれば、ユーザーは煩雑な検査役から、落ち着いたガバナーへと変わっていきます。インターフェースはずっとシンプルになり、それでも AI への手ごたえは、これまで届かなかった深さにまで達しました。',
      's01.title': 'The Setup, 1 つのプロダクトに宿る 3 つの技術地層',
      's01.lede': '2026 年初頭、約 1,000 プロジェクトにまたがる数万件の Langfuse トレースを掘り下げていくうちに、プロダクトの内側から 3 つのまったく異なる技術地層が立ち上がってきました。単なるバージョンアップではなく、3 つの設計哲学と AI 進化の足跡そのものが、そこに映し出されていました。',
      's01.gen1.label': '第 1 世代 · Ad-hoc Mode (2023–2024)',
      's01.gen1.body': '第 1 世代は典型的な線形パイプライン、one-shot 入力、one-shot 出力。自動販売機のように、正確な指示を投げ込めば SQL が返ってくる、それだけの仕組みです。失敗率は今も <span class="stat-hi">19.5%</span> 前後と高いまま。それでもこのモードに残る <span class="stat-hi">11%</span> のアクティブプロジェクトが、全体トラフィックの約 <span class="stat-hi">60%</span> を生み出しています。彼らは 5 回に 1 回の失敗を引き受けてでも、SQL への直接のコントロールを手放しません。',
      's01.gen2.label': '第 2 世代 · Interactive Mode (2025.09)',
      's01.gen2.body': '第 2 世代は、線形パイプラインの上に「記憶層」を重ねました、私たちが True Thread Context（真の対話文脈）と名づけたものです。ユーザーは毎回背景を説明し直す手間から解放され、履歴の文脈がそのまま引き継がれるように。連続的な分析が初めて成立しました。この構造はエラー率を <span class="stat-hi-blue">0.29%</span> までほぼ完璧に押し下げ、対話というメカニズムがパイプラインの小さなズレを吸収して直せることを証明しました。',
      's01.gen3.label': '第 3 世代 · Agent Mode (2026)',
      's01.gen3.body': '第 3 世代では、硬直した Pipeline をまるごと解体し、<span class="stat-hi">Multi-agent × Skill-based</span> の構成に置き換えました。複数の Agent がユーザーのその時々の意図に合わせて動的に協働し、前 2 世代それぞれの強みをひとつに束ねます、対話の柔軟さと、実行の精度を、同時に。',
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
      's02.title': '診断と決断、「エキスパート・パラドックス」と Ad-hoc の正体',
      's02.intro': '数万件の Langfuse トレースを分析し、89 名のアクティブユーザーに深くインタビューした結果、プロダクトが技術アーキテクチャとユーザー認知のあいだで引き裂かれていることが見えてきました。旧来の線形アーキテクチャは、パフォーマンスを縛っていただけではありません。ユーザーの本当の意図そのものを、読み違えていたのです。',
      's02.part1.label': '洞察 01 · エキスパート・パラドックス、熟練するほど、挫折する',
      's02.part1.body1': 'データから、直感に反する現象が浮かび上がりました、熟練ユーザーのほうが、初心者よりも多くつまずいていたのです。私はこれを<span class="stat-hi">「エキスパート・パラドックス」</span>と名づけました。彼らはプロンプトに精密なカラム名を並べ、アンダースコアの使用密度は試用ユーザーの<span class="stat-hi">約 12 倍</span>に達します。ところが <code>BUFF_GAME_ACCOUNTS</code> のような極めて具体的なフィールドを書いた瞬間、線形パイプラインはデータモデル（MDL）と完全一致しない限り、そのまま崩れてしまうのです。',
      's02.part1.body2': '実際、Ad-hoc の失敗のうち <span class="stat-hi">95.9%</span> が <code>NO_RELEVANT_SQL</code> と <code>NO_CHART</code> に集中していました。旧アーキテクチャには、複雑な技術詳細をさばく場面で「確認」や「誘導」を差し込む余地がなく、熟練するほど壁に突き当たる、そんな構造になっていたのです。',
      's02.part2.label': '洞察 02 · 正体、 89 名が明かす Ad-hoc の本当の役割',
      's02.part2.body1': 'データの背後にある動機を理解するため、89 名のアクティブユーザーに深く話を聞き、モード切替の行動論理を解きほぐしました。見えてきたのは、入力前に選択を強いる設計そのものが重い認知負荷になっていること、<span class="stat-hi">25%</span> のユーザーは、2 つのモードの違いすらはっきり説明できませんでした。',
      's02.part2.body2': 'さらに衝撃的だったのは、<span class="stat-hi-blue">62.5%</span> のユーザーが Ad-hoc へ切り替える理由が、別の分析 UI を使うためではなかったこと、「SQL ロジックの確認」や「デバッグ」のために切り替えていたのです。ユーザーの頭のなかで Ad-hoc は、もはや独立した分析入口ではありません。結果の正しさを担保するための<span class="stat-hi">「デバッグ専用レーン（Debug Lane）」</span>、それが実態でした。「旧モードはフォールバックとして残すべき」という前提も、同時に覆りました。安定性を理由に切り替えていたユーザーは、わずか <span class="stat-hi">2%</span>。',
      's02.turn.label': '転換点、「モード切替」から「コントロールの主導権」へ',
      's02.turn.body': 'データが示す方向はひとつでした。<span class="stat-hi-blue">ユーザーが本当に求めていたのは<span class="stat-hi">「コントロール感」</span>であって、煩雑な<span class="stat-hi">「モード切替」</span>ではなかった</span>のです。破綻した線形パイプラインを継ぎ接ぎするのではなく、2 世代をまるごと統合する、そう決断しました。新しい Agent Mode は Interactive モードの対話の粘り強さを受け継ぎ、Ad-hoc のデバッグ要件を<span class="stat-hi">スキル化</span>。熟練者は自動化された分析の恩恵を受けながら、下層のデータロジックへの主導権を手放さずに済みます。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.數據考古',
      'nav.s02': '02.診斷與決策',
      'nav.s04': '03.解決方案',
      'nav.s05': '04.結語',
      'title.big': '一個產品，三種心智：重新思考對話式 BI',
      'title.sub': '透過分析近萬筆使用者查詢數據，定義三個技術世代的分野，重新設計 AI 驅動 BI 的信任架構。',
      'intro.overview.label': '前言',
      'intro.overview.body': '在 AI 驅動的商業智能（BI）領域，我們面臨的最大挑戰從來不是「如何產生 SQL」，而是「如何贏得信任」。作為 Wren AI 的資深產品設計師，我主導了這場從傳統對話模式邁向「Agent 時代」的轉型。我們發現，用戶在面對數據時，往往處於「想要探索的自由」與「需要精準的掌控」這兩種極端的心智模型之間。本篇個案研究將詳細拆解，我們如何透過三代的技術更迭，解決線性架構留下的信任殘局。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同時擔任設計師、用戶研究員與 PM</span>。獨立負責 Langfuse 與 PostHog 分析、Agent UX 的端到端設計、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上線後的假設驗證框架</span>。',
      'intro.time.label': '公司與時程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': 'The Solution, 融合兩個世代的經驗',
      's04.lede': '我們並非單純地消滅舊功能，而是將過去兩代的實戰經驗進行了深度的技術與設計整合。',
      's04.q.label': '汲取 Interactive 模式：用對話培養耐心',
      's04.q.body': '從 Interactive 模式中，我們學到<span class="stat-hi-blue">對話能賦予用戶更多耐心去調校結果</span>。Agent Mode 透過一系列 <span class="stat-hi">Checkpoint</span>（預選答案選擇），讓數據探索不再是單次嘗試，而是一個<span class="stat-hi">有節奏、保證產出的循環</span>。當用戶輸入精準但模糊的欄位時，Agent 不再回傳 <code>NO_RELEVANT_SQL</code>，而是主動詢問釐清，將潛在的崩潰轉化為成功的引導流程。',
      's04.p.label': '轉化 Ad-hoc 模式：將除錯體驗升為內建技能',
      's04.p.body': '我們將原本必須切換模式才能獲得的透明度，透過 <span class="stat-hi">Skill-based（技能化）架構</span>，轉化為 Agent 的核心能力。針對那 62.5% 的需求，我們將除錯體驗直接內建於 Agent 的運作中。用戶現在可以根據需求客製化技能執行參數，且 SQL 生成與推理路徑完全透明並能以自然語言詢問。',
      's04.replay': '重播',
      's04.jA.eyebrow': '引導式探索',
      's04.jA.title': '引導式探索：定義問題的形狀',
      's04.jA.body': '用戶往往帶著明確的目標，卻難以描述精確的問題。當業務用戶帶著 「探索這份資料」 的模糊意圖進入系統時，Agent 的任務不再是<span class="stat-hi">「猜測」</span>，而是<span class="stat-hi">「引導」</span>。<br><br>我設計了一套漸進式確認流程：只要遇到會影響結果的分歧點，系統即主動彈出 <span class="stat-hi">單選面板</span>（如分析類型、時間維度、分群方式）。這些面板是引導前行的 <span class="stat-hi">Checkpoint</span>，而非阻礙探索的死路；我同時保留了 <code>Skip</code> 選項，平衡了「新手需要的指引」與「專家需要的自由度」。',
      's04.jB.eyebrow': '強化 Thinking Steps',
      's04.jB.title': '嚴格稽核員的控制權被繼承，以透明軌跡的形式，不再以模式存在。',
      's04.jB.body': '在本次新的改版模式中，我們將透明度嵌入了產品的基因。<br><br><strong>流式推理（Streaming Logic）：</strong>透過 <span class="stat-hi">Thinking Step</span>，Agent 的動作以原語（Primitive）形式流出。這不僅是視覺上的 spinner 到 checkmark，更是背後 SQL 與工具呼叫的完整解構，讓你擁有上帝視角，掌握 AI 的思維脈絡。<br><br><strong>Skill：可被書寫的精準度：</strong>我們徹底取消了 Ad-hoc Mode 的界限，取而代之的是 <span class="stat-hi">Skill</span> 系統。你可以自訂 Context 檢索與 Schema 對應邏輯，將原本沉重的模式轉化為輕巧、可重複呼叫的技能組，真正實現「對話即開發」。',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': '定義 Official Skills：從「功能按鈕」到「原子化能力」的轉向',
      's04.jC.body': '<p class="body">在過去的線性架構中，許多核心功能（如生成報表、數據評估、文件解析）往往被設計成散落在介面各處的按鈕或獨立模式。這不僅增加了開發成本，也限制了用戶的操作流暢度。我們重新定義了 Official Skills，將這些複雜的後端邏輯包裝成<span class="stat-hi">「原子化」</span>的能力模組。這項轉向對產品帶來了三大核心優勢。</p><h4 class="journey-h4">1 · 統一的路由架構：將介面操作轉化為自然語言指令</h4><p class="body">過去需要透過點擊介面才能觸發的特定任務，現在全部透過 Skill 路由實現。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要尋找「生成報表」的圖示，Agent 會根據上下文自動觸發，或由用戶透過指令主動呼叫。</li><li><code>analyze-data</code> 與 <code>sql-queries</code>：我們將「回答問題」與「寫 SQL」這兩種不同維度的任務拆解，讓 Agent 能精準判斷何時該進行趨勢探索，何時該精確產出數據。</li></ul><h4 class="journey-h4">2 · 抹平文件處理的鴻溝：Doc 與 PDF 的能力化</h4><p class="body">處理異質資料（如 Spreadsheet、PDF、Word）曾是 BI 工具的痛點。透過 <code>pdf</code>、<code>doc</code> 與 <code>spreadsheet</code> 技能，我們將文件解析邏輯從主程式中解耦。這意味著當用戶拖入一個 <code>.zip</code> 壓縮檔或多種格式文件時，Agent 不再是混亂地讀取，而是有條理地分配給對應的 Skill 進行處理。</p><h4 class="journey-h4">3 · 將特定 Pattern 轉化為可複用的「知識資產」</h4><p class="body">過往要把特定的業務規則（Eval）或數據模型（Pattern）加入知識庫，通常需要繁瑣的手動設定。現在，這些邏輯可以被封裝進 Skill。這不僅讓官方能力更易於維護，也為「用戶自定義 Skill」樹立了標竿。官方 Skill 就像是 <span class="stat-hi">Reference Implementation（參考實作）</span>，引導用戶理解如何將自己的 Eval 邏輯或專屬工作流，透過相同的模式無縫植入 Agent 基因。</p><h4 class="journey-h4">Official Skills 概覽：定義 Agent 的核心邊界</h4><p class="body">我們精心策展了 6 個官方技能，作為 Agent 的基礎能力層：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計目的與應用場景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>數據分析核心：當用戶需要探索趨勢、獲取特定數字或進行視覺化時觸發。</td></tr><tr><td><code>sql-queries</code></td><td>精準取數：專注於撰寫並執行 SQL，提供最直接的數據解答。</td></tr><tr><td><code>generate-report</code></td><td>敘事化產出：將散落的數據洞察整合成包含圖表與摘要的完整報告。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非結構化數據提取：從 PDF 或 Word 中精準提取文字與表格，納入分析流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部數據轉換：處理 CSV/Excel 的匯入與轉換，實現跨資料源的分析。</td></tr></tbody></table><h4 class="journey-h4">設計結語：為什麼這對產品至關重要？</h4><p class="body">將功能轉化為 Skill，最大的 UX 價值在於<span class="stat-hi">「認知負擔的降低」</span>。對於用戶來說，他們不再需要學習「這個按鈕在哪裡」，只需要關注「我想達成什麼目標」。對產品團隊而言，這套架構讓能力的擴充變得異常輕量。當我們需要加入新的 AI 評估模型或特定的數據清洗邏輯時，我們不再需要去改動複雜的 UI 流程，而是直接發佈一個新的 Skill。這種「功能解耦、能力聚合」的設計，正是 Wren AI 能在 Agent 時代快速迭代、並同時保有「稽核級透明度」的核心技術資產。</p>',
      's05.title': '結語：超越「作品」本身',
      's05.closing.body1': '我們最終實現的，是將<span class="stat-hi">「嚴格稽核」的靈魂</span>繼承進<span class="stat-hi">「輕量對話」的身軀</span>中。',
      's05.closing.body2': 'SQL 檢視與邏輯除錯不再是獨立於體驗之外的「異物」，而是隨時可供調用的思考憑證。移除 Ad-hoc 是一場關於信任移轉的實驗：當我們成功在<span class="stat-hi">「意圖階段」</span>阻斷錯誤，並在<span class="stat-hi">「執行階段」</span>提供流暢透明的軌跡，用戶便能從繁瑣的檢查員，轉化為從容的治理者。介面變簡單了，但用戶對 AI 的掌控力卻達到了前所未有的深度。',
      's01.title': 'The Setup, 一個產品中的三個技術地層',
      's01.lede': '透過分析 2026 年初橫跨將近千個專案、共上萬筆的 Langfuse 追蹤數據，產品內部呈現出三個截然不同的技術地層。這不只是版本迭代，也呈現了三套不同的設計哲學以及 AI 發展的歷史演進。',
      's01.gen1.label': '第一代 · Ad-hoc Mode (2023-2024)',
      's01.gen1.body': '第一代是典型的線性 Pipeline，one-shot 進、one-shot 出，像自動販賣機一樣：丟進精確的指令，換回一段 SQL。即便今天它的失敗率仍高達約 <span class="stat-hi">19.5%</span>，卻仍有 <span class="stat-hi">11%</span> 的活躍專案留在這裡，並貢獻了將近 <span class="stat-hi">60%</span> 的總流量。這群專業用戶寧可忍受每五次失敗一次的挫折，也不願交出對 SQL 的直接控制權。',
      's01.gen2.label': '第二代 · Interactive Mode (2025.09)',
      's01.gen2.body': '第二代在原本的線性 Pipeline 上疊了一層記憶，也就是我們稱為 True Thread Context（真實對話脈絡）的機制。用戶不再需要每一次提問都重新交代背景，歷史上下文會自動延續，讓連續性分析變得可能。這一層結構把錯誤率壓低到近乎完美的 <span class="stat-hi-blue">0.29%</span>，也證明了對話機制確實能吸收並修復 Pipeline 在執行中遺漏的小誤差。',
      's01.gen3.label': '第三代 · Agent Mode (2026)',
      's01.gen3.body': '第三代徹底拆掉僵硬的 Pipeline，換成 <span class="stat-hi">Multi-agent 與 Skill-based</span> 的組合。多個 Agent 會依照用戶當下的意圖動態協作，把前兩代各自的優點收攏在一起，同時保有對話的韌性，與技術執行的精準。',
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
      's02.title': '診斷與決策：數據背後的「專家悖論」與 Ad-hoc 的身份解碼',
      's02.intro': '我們分析了上萬筆 Langfuse 追蹤數據，並深入訪談了 89 位活躍用戶，發現產品正陷於技術架構與用戶認知脫節的困境。這項研究揭示了舊有的線性架構不僅限制了系統性能，更誤解了用戶的真實意圖。',
      's02.part1.label': '洞察 01 · 專家悖論（Expert Paradox），越專業，越挫折',
      's02.part1.body1': '數據揭露了一個反直覺的現象：專業用戶在系統中遇到的阻礙反而比新手更多，我們將其歸納為<span class="stat-hi">「專家悖論」</span>。這些活躍用戶傾向在提示詞中加入大量精準的欄位名稱，底線符號的使用密度甚至比一般試用者高出約 <span class="stat-hi">12 倍</span>。然而，當用戶寫出如 <code>BUFF_GAME_ACCOUNTS</code> 這種極其精準的技術欄位時，傳統的線性管道（Linear Pipeline）若無法與資料庫架構（MDL）完美契合，便會直接崩潰。',
      's02.part1.body2': '事實上，超過 <span class="stat-hi">95.9%</span> 的 Ad-hoc 失敗都集中在 <code>NO_RELEVANT_SQL</code> 與 <code>NO_CHART</code> 兩類錯誤。這說明了舊有架構在處理複雜技術細節時，缺乏「澄清」與「引導」的彈性，導致專家用戶反而頻繁撞牆。',
      's02.part2.label': '洞察 02 · 身份解碼， 89 位使用者揭開 Ad-hoc 的真相',
      's02.part2.body1': '為了理解數據背後的行為動機，我們對 89 位活躍用戶進行了深度調查，試圖解開他們頻繁切換模式的行為密碼。我們發現，強迫用戶在輸入前做選擇其實是沉重的認知負擔，因為高達 <span class="stat-hi">25%</span> 的用戶根本無法明確說出兩種模式的差異。',
      's02.part2.body2': '更令人震撼的發現是，<span class="stat-hi-blue">62.5%</span> 的用戶切換到 Ad-hoc 模式的實質目的並非為了使用不同的分析介面，而是為了「檢查 SQL 邏輯」或「除錯」。這意味著在用戶心中，Ad-hoc 模式已不再是一個獨立的分析入口，而是一個確保結果正確的<span class="stat-hi">「除錯專用道（Debug Lane）」</span>。此外，調查也推翻了「保留舊模式是為了備援」的假設，因為只有 <span class="stat-hi">2%</span> 的用戶是因為系統穩定性問題才切換模式。',
      's02.turn.label': '關鍵轉折：從「切換模式」到「控制主權」',
      's02.turn.body': '這些數據為我們指引了一個清晰的發展方向：<span class="stat-hi-blue">用戶真正渴望的是<span class="stat-hi">「控制感」</span>，而非繁瑣的<span class="stat-hi">「模式切換」</span></span>。我們意識到，與其修補一個漏洞百出的線性管道，不如徹底合併兩代模式。未來的 Agent Mode 必須繼承 Interactive 模式的對話韌性，同時將 Ad-hoc 模式的除錯需求「技能化」，讓專業用戶在享受自動化分析的同時，依然保有對底層數據邏輯的絕對主權。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.数据考古',
      'nav.s02': '02.诊断与决策',
      'nav.s04': '03.解决方案',
      'nav.s05': '04.结语',
      'title.big': '一个产品，三种心智：重新思考对话式 BI',
      'title.sub': '通过分析近万条用户查询数据，定义三个技术世代的分野，重新设计 AI 驱动 BI 的信任架构。',
      'intro.overview.label': '前言',
      'intro.overview.body': '在 AI 驱动的商业智能（BI）领域，我们面临的最大挑战从来不是「如何产生 SQL」，而是「如何赢得信任」。作为 Wren AI 的高级产品设计师，我主导了这场从传统对话模式迈向「Agent 时代」的转型。我们发现，用户在面对数据时，往往处于「想要探索的自由」与「需要精准的掌控」这两种极端的心智模型之间。本篇案例研究将详细拆解，我们如何通过三代的技术更迭，解决线性架构留下的信任难题。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">同时担任设计师、用户研究员与 PM</span>。独立负责 Langfuse 与 PostHog 分析、Agent UX 的端到端设计、<span class="stat-hi">模式策略制定</span>，以及<span class="stat-hi">上线后的假设验证框架</span>。',
      'intro.time.label': '公司与时程',
      'intro.time.body': 'Wren AI · 2026',
      's04.title': 'The Solution, 融合两个世代的经验',
      's04.lede': '我们并非单纯地消灭旧功能，而是将过去两代的实战经验进行了深度的技术与设计整合。',
      's04.q.label': '汲取 Interactive 模式：用对话培养耐心',
      's04.q.body': '从 Interactive 模式中，我们学到对话能赋予用户更多耐心去调校结果。Agent Mode 通过一系列 Checkpoint（预选答案选择），让数据探索不再是单次尝试，而是一个有节奏、保证产出的循环。当用户输入精准但模糊的字段时，Agent 不再返回 <code>NO_RELEVANT_SQL</code>，而是主动询问澄清，将潜在的崩溃转化为成功的引导流程。',
      's04.p.label': '转化 Ad-hoc 模式：将调试体验升为内建技能',
      's04.p.body': '我们将原本必须切换模式才能获得的透明度，通过 Skill-based（技能化）架构，转化为 Agent 的核心能力。针对那 62.5% 的需求，我们将调试体验直接内建于 Agent 的运作中。用户现在可以根据需求定制技能执行参数，且 SQL 生成与推理路径完全透明可查。',
      's04.replay': '重播',
      's04.jA.eyebrow': '引导式探索',
      's04.jA.title': '引导式探索：定义问题的形状',
      's04.jA.body': '用户往往带着明确的目标，却难以描述精确的问题。当业务用户带着 「探索这份数据」 的模糊意图进入系统时，Agent 的任务不再是<span class="stat-hi">「猜测」</span>，而是<span class="stat-hi">「引导」</span>。<br><br>我设计了一套渐进式确认流程：只要遇到会影响结果的分歧点，系统即主动弹出 <span class="stat-hi">单选面板</span>（如分析类型、时间维度、分群方式）。这些面板是引导前行的 <span class="stat-hi">Checkpoint</span>，而非阻碍探索的死路；我同时保留了 <code>Skip</code> 选项，平衡了「新手需要的指引」与「专家需要的自由度」。',
      's04.jB.eyebrow': '强化 Thinking Steps',
      's04.jB.title': '严格稽核员的控制权被继承，以透明轨迹的形式，不再以模式存在。',
      's04.jB.body': '在本次新的改版模式中，我们将透明度嵌入了产品的基因。<br><br><strong>流式推理（Streaming Logic）：</strong>通过 <span class="stat-hi">Thinking Step</span>，Agent 的动作以原语（Primitive）形式流出。这不仅是视觉上的 spinner 到 checkmark，更是背后 SQL 与工具调用的完整解构，让你拥有上帝视角，掌握 AI 的思维脉络。<br><br><strong>Skill：可被书写的精准度：</strong>我们彻底取消了 Ad-hoc Mode 的界限，取而代之的是 <span class="stat-hi">Skill</span> 系统。你可以自定义 Context 检索与 Schema 对应逻辑，把原本沉重的模式转化为轻巧、可复用的技能组，真正实现"对话即开发"。',
      's04.jC.eyebrow': 'Official Skills',
      's04.jC.title': '定义 Official Skills：从"功能按钮"到"原子化能力"的转向',
      's04.jC.body': '<p class="body">在过去的线性架构中，许多核心功能（如生成报表、数据评估、文件解析）往往被设计成散落在界面各处的按钮或独立模式。这不仅增加了开发成本，也限制了用户的操作流畅度。我们重新定义了 Official Skills，将这些复杂的后端逻辑包装成<span class="stat-hi">"原子化"</span>的能力模块。这项转向对产品带来了三大核心优势。</p><h4 class="journey-h4">1 · 统一的路由架构：将界面操作转化为自然语言指令</h4><p class="body">过去需要通过点击界面才能触发的特定任务，现在全部通过 Skill 路由实现。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要寻找"生成报表"的图标，Agent 会根据上下文自动触发，或由用户通过指令主动调用。</li><li><code>analyze-data</code> 与 <code>sql-queries</code>：我们将"回答问题"与"写 SQL"这两种不同维度的任务拆解，让 Agent 能精准判断何时该进行趋势探索，何时该精确产出数据。</li></ul><h4 class="journey-h4">2 · 抹平文件处理的鸿沟：Doc 与 PDF 的能力化</h4><p class="body">处理异质数据（如 Spreadsheet、PDF、Word）曾是 BI 工具的痛点。通过 <code>pdf</code>、<code>doc</code> 与 <code>spreadsheet</code> 技能，我们将文件解析逻辑从主程序中解耦。这意味着当用户拖入一个 <code>.zip</code> 压缩档或多种格式文件时，Agent 不再是混乱地读取，而是有条理地分配给对应的 Skill 进行处理。</p><h4 class="journey-h4">3 · 将特定 Pattern 转化为可复用的"知识资产"</h4><p class="body">过往要把特定的业务规则（Eval）或数据模型（Pattern）加入知识库，通常需要繁琐的手动设置。现在，这些逻辑可以被封装进 Skill。这不仅让官方能力更易于维护，也为"用户自定义 Skill"树立了标杆。官方 Skill 就像是 <span class="stat-hi">Reference Implementation（参考实作）</span>，引导用户理解如何将自己的 Eval 逻辑或专属工作流，通过相同的模式无缝植入 Agent 基因。</p><h4 class="journey-h4">Official Skills 概览：定义 Agent 的核心边界</h4><p class="body">我们精心策展了 6 个官方技能，作为 Agent 的基础能力层：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>设计目的与应用场景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>数据分析核心：当用户需要探索趋势、获取特定数字或进行可视化时触发。</td></tr><tr><td><code>sql-queries</code></td><td>精准取数：专注于撰写并执行 SQL，提供最直接的数据解答。</td></tr><tr><td><code>generate-report</code></td><td>叙事化产出：将散落的数据洞察整合成包含图表与摘要的完整报告。</td></tr><tr><td><code>pdf</code> / <code>doc</code></td><td>非结构化数据提取：从 PDF 或 Word 中精准提取文字与表格，纳入分析流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部数据转换：处理 CSV/Excel 的导入与转换，实现跨数据源的分析。</td></tr></tbody></table><h4 class="journey-h4">设计结语：为什么这对产品至关重要？</h4><p class="body">将功能转化为 Skill，最大的 UX 价值在于<span class="stat-hi">"认知负担的降低"</span>。对于用户来说，他们不再需要学习"这个按钮在哪里"，只需要关注"我想达成什么目标"。对产品团队而言，这套架构让能力的扩充变得异常轻量。当我们需要加入新的 AI 评估模型或特定的数据清洗逻辑时，我们不再需要去改动复杂的 UI 流程，而是直接发布一个新的 Skill。这种"功能解耦、能力聚合"的设计，正是 Wren AI 能在 Agent 时代快速迭代、并同时保有"审计级透明度"的核心技术资产。</p>',
      's05.title': '结语：超越"作品"本身',
      's05.closing.body1': '我们最终实现的，是将<span class="stat-hi">「严格稽核」的灵魂</span>继承进<span class="stat-hi">「轻量对话」的身躯</span>中。',
      's05.closing.body2': 'SQL 检视与逻辑调试不再是独立于体验之外的「异物」，而是随时可供调用的思考凭证。移除 Ad-hoc 是一场关于信任转移的实验：当我们成功在<span class="stat-hi">「意图阶段」</span>阻断错误，并在<span class="stat-hi">「执行阶段」</span>提供流畅透明的轨迹，用户便能从繁琐的检查员，转化为从容的治理者。界面变简单了，但用户对 AI 的掌控力却达到了前所未有的深度。',
      's01.title': 'The Setup, 一个产品中的三个技术地层',
      's01.lede': '通过分析 2026 年初横跨近千个项目、共上万条的 Langfuse 追踪数据，产品内部呈现出三个截然不同的技术地层。这不只是版本迭代，也呈现了三套不同的设计哲学以及 AI 发展的历史演进。',
      's01.gen1.label': '第一代 · Ad-hoc Mode (2023-2024)',
      's01.gen1.body': '第一代是典型的线性 Pipeline，one-shot 进、one-shot 出，像自动贩卖机一样：丢进精确的指令，换回一段 SQL。即便今天它的失败率仍高达约 <span class="stat-hi">19.5%</span>，却仍有 <span class="stat-hi">11%</span> 的活跃项目留在这里，并贡献了将近 <span class="stat-hi">60%</span> 的总流量。这群专业用户宁可忍受每五次失败一次的挫折，也不愿交出对 SQL 的直接控制权。',
      's01.gen2.label': '第二代 · Interactive Mode (2025.09)',
      's01.gen2.body': '第二代在原本的线性 Pipeline 上叠了一层记忆，也就是我们称为 True Thread Context（真实对话脉络）的机制。用户不再需要每一次提问都重新交代背景，历史上下文会自动延续，让连续性分析变得可能。这一层结构把错误率压低到近乎完美的 <span class="stat-hi-blue">0.29%</span>，也证明了对话机制确实能吸收并修复 Pipeline 在执行中遗漏的小误差。',
      's01.gen3.label': '第三代 · Agent Mode (2026)',
      's01.gen3.body': '第三代彻底拆掉僵硬的 Pipeline，换成 <span class="stat-hi">Multi-agent 与 Skill-based</span> 的组合。多个 Agent 会依照用户当下的意图动态协作，把前两代各自的优点收拢在一起，同时保有对话的韧性，与技术执行的精准。',
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
      's02.title': '诊断与决策：数据背后的「专家悖论」与 Ad-hoc 的身份解码',
      's02.intro': '我们分析了上万笔 Langfuse 追踪数据，并深入访谈了 89 位活跃用户，发现产品正陷于技术架构与用户认知脱节的困境。这项研究揭示了旧有的线性架构不仅限制了系统性能，更误解了用户的真实意图。',
      's02.part1.label': '洞察 01 · 专家悖论（Expert Paradox），越专业，越挫折',
      's02.part1.body1': '数据揭露了一个反直觉的现象：专业用户在系统中遇到的阻碍反而比新手更多，我们将其归纳为<span class="stat-hi">「专家悖论」</span>。这些活跃用户倾向在提示词中加入大量精准的字段名称，下划线符号的使用密度甚至比一般试用者高出约 <span class="stat-hi">12 倍</span>。然而，当用户写出如 <code>BUFF_GAME_ACCOUNTS</code> 这种极其精准的技术字段时，传统的线性管道（Linear Pipeline）若无法与数据库架构（MDL）完美契合，便会直接崩溃。',
      's02.part1.body2': '事实上，超过 <span class="stat-hi">95.9%</span> 的 Ad-hoc 失败都集中在 <code>NO_RELEVANT_SQL</code> 与 <code>NO_CHART</code> 两类错误。这说明了旧有架构在处理复杂技术细节时，缺乏「澄清」与「引导」的弹性，导致专家用户反而频繁撞墙。',
      's02.part2.label': '洞察 02 · 身份解码， 89 位使用者揭开 Ad-hoc 的真相',
      's02.part2.body1': '为了理解数据背后的行为动机，我们对 89 位活跃用户进行了深度调查，试图解开他们频繁切换模式的行为密码。我们发现，强迫用户在输入前做选择其实是沉重的认知负担，因为高达 <span class="stat-hi">25%</span> 的用户根本无法明确说出两种模式的差异。',
      's02.part2.body2': '更令人震撼的发现是，<span class="stat-hi-blue">62.5%</span> 的用户切换到 Ad-hoc 模式的实质目的并非为了使用不同的分析界面，而是为了「检查 SQL 逻辑」或「调试」。这意味着在用户心中，Ad-hoc 模式已不再是一个独立的分析入口，而是一个确保结果正确的<span class="stat-hi">「调试专用道（Debug Lane）」</span>。此外，调查也推翻了「保留旧模式是为了备援」的假设，因为只有 <span class="stat-hi">2%</span> 的用户是因为系统稳定性问题才切换模式。',
      's02.turn.label': '关键转折：从「切换模式」到「控制主权」',
      's02.turn.body': '这些数据为我们指引了一个清晰的发展方向：<span class="stat-hi-blue">用户真正渴望的是<span class="stat-hi">「控制感」</span>，而非繁琐的<span class="stat-hi">「模式切换」</span></span>。我们意识到，与其修补一个漏洞百出的线性管道，不如彻底合并两代模式。未来的 Agent Mode 必须继承 Interactive 模式的对话韧性，同时将 Ad-hoc 模式的调试需求「技能化」，让专业用户在享受自动化分析的同时，依然保有对底层数据逻辑的绝对主权。',
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
