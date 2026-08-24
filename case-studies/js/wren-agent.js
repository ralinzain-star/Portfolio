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
        // Reloading the iframe destroys the demo mid-run, so the step-list
        // orchestrator has to be told: otherwise it waits forever for a
        // jc_play_done that can never arrive and Play stays disabled.
        document.dispatchEvent(new CustomEvent('jc-frame-reload', { detail: { frame } }));
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
      'nav.s01': '01.逆説',
      'nav.s02': '02.回り道',
      'nav.s03': '03.痕跡',
      'nav.s04': '04.教える',
      'nav.s05': '05.Skill 化',
      'nav.s06': '06.成果',
      'title.big': '話しかけて AI に教える',
      'title.sub': '対話で Knowledge を組み立て、AI を企業内部のロジックに合わせる。',
      'intro.overview.label': '解決したかった問題',
      'intro.overview.body': 'Wren AI は会話型の BI ツールで、データに自然言語で問いかけられます。ただし、うまく答えるにはまず AI に教える必要があります。指標、定義、ビジネスルール。この「教える」行為は、システム上 Knowledge と呼ばれています。従来の製品では、Knowledge は専用ページに一行ずつ入力するもので、誰も覚えられない十数個の機能入口と並んで置かれていました。データが示した事実は明快でした。Knowledge を作ったチームほど課金する確率がずっと高い。それなのに、最後までやり切る人はほとんどいませんでした。このケーススタディでは、私が「教える」こと、そして最終的にすべての機能を、ユーザーが実際に過ごす唯一の場所、チャットボックスへ移した過程を追います。',
      'intro.role.label': '担当範囲',
      'intro.role.body': '<span class="stat-hi">唯一のプロダクトデザイナー</span>であり、<span class="stat-hi">プロダクトオーナー</span>と<span class="stat-hi">ユーザーリサーチャー</span>も兼任。Langfuse と PostHog のデータ分析、Agent UX のエンドツーエンド設計、そして<span class="stat-hi">ローンチ後の仮説検証フレームワーク</span>まで一貫して担当し、エンジニアリングチームとともに世に出しました。',
      'intro.time.label': '会社と時期',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': 'チームにとって最も価値ある行為が、最も完了されない行為だった',
      's01.lede': 'Wren がうまく答えるには、まず誰かが業務の実際の動き方を教える必要があります。指標、定義、ルール。この「教える」という行為を、製品では Knowledge と呼んでいます。測定できるすべての行動の中で、それは最も価値が高く、そして最もやり切られない行動でした。',
      's01.f1.label': 'Knowledge を作ることは、チームが課金する最も強いシグナルのひとつだった',
      's01.f1.body': 'アクティベーションのデータでは、AI に教えることは、観測できた中でも最も強い課金シグナルのひとつでした。Knowledge を作ったユーザーの課金率は <span class="stat-hi">0.7%</span>、作らなかったユーザーは <span class="stat-hi">0.1%</span>。<span class="stat-hi">約 7 倍</span>です。教えることは「あれば嬉しい」ではありませんでした。測れるものの中で、顧客が取りうる最も価値の高い行動のひとつだったのです。',
      's01.f2.label': 'しかし同時に、製品の中で最も完了されない機能のひとつでもあった',
      's01.f2.body': 'Knowledge を一件でも作ったチームは <span class="stat-hi">10%</span> 程度にとどまり、その比率は一年を通して下がり続けました。使うには一行ずつ手入力する設定ページを最後まで進める必要があり、多くのチームは途中で投げ出しました。手元にあった最も強いレバーが、ずっと触られないままでした。',
      's01.chart.cap': '課金率（ユーザー単位 · Knowledge を作った人とそれ以外）',
      's01.chart.r1': 'Knowledge を作った',
      's01.chart.tag': '約 7 倍',
      's01.chart.r2': '作らなかった',
      's01.chart.note': '相関であり、課金サンプルは小さく、インタビューで検証中です。',
      's02.title': '先にページを作り直した。そしてデータがそれを否定した',
      's02.lede': '最も素直な解釈は「設定ページが最後まで進みにくい」でした。だから私が直そうとしたのもそこです。テンプレートの充実、一括インポート、より親切な空状態。着手する前に、チームがどこで離脱しているかを確かめるため 90 日分のプロダクトデータを引きました。そこに出てきたのは、私が探していたものではありませんでした。',
      's02.f1.label': 'インタラクションの 91% がひとつの入力ボックスで起きる',
      's02.f1.body': 'プロダクトには十数個の機能入口があります。しかし約 18,500 件のインタラクションのうち、それらの合計は<span class="stat-hi">1 割未満</span>。残りはすべて会話の中で起きていました。',
      's02.f2.label': '72% のユーザーは機能入口に一度も触れない',
      's02.f2.body': '582 名のアクティブユーザーの大半は、最初から最後まで会話ボックスの中だけで過ごしていました。最も人気の機能入口でさえ、使ったのは <span class="stat-hi">14%</span> だけです。',
      's02.f3.label': '20 本のセッション録画のうち、13 本でメニュー間の行き来が発生',
      's02.f3.body': '実際の操作を見ると、機能に辿り着く典型的な経路は一直線ではありません。「入って、戻って、別のメニューを試す」の繰り返しでした。',
      's02.close': 'これらの数字はどれも「使いにくいページ」を説明していません。「誰も辿り着かないページ」を説明しています。ユーザーは Knowledge の中で失敗していたのではなく、そもそも到達していなかった。誰も訪れない目的地を磨いても、不在によって動いている数字は動きません。そこでページの再設計をやめ、ユーザーが実際にいる場所を見に行きました。',
      's03.title': 'ユーザーは画面を覚えていないが、やりたいことは正確に言える',
      's03.lede': 'いちばん動かしにくかった能力は、レポートのボタンではなく、「教える」こと自体でした。Wren がうまく答えるには、まず誰かが業務の実態を教えなければなりません。指標、定義、ルール。それが Knowledge であり、製品の中でいちばん重いインターフェースであると同時に、静かにいちばん価値の高い行動でもありました。',
      's03.e1.label': '証拠 01 · 機能を、言葉で「注文」する',
      's03.e1.body': '専用ボタンのある機能でも、ユーザーは打ち込んで頼みます。「チャートを作って」「レポートを生成して」「折れ線グラフに変えて」。ボタンはすぐそこにあるのに、それでも打つ。<span class="stat-hi">言語は代替手段ではなく、第一の本能です。</span>',
      's03.e2.label': '証拠 02 · 「何ができるか」さえ、メニューではなく質問で知ろうとする',
      's03.e2.body': 'トライアルユーザーは入力ボックスに <span class="stat-hi-blue">"what can I ask?"</span> と打ち込みます。メニューを開いてプロダクトを学ぶ人はいません。ユーザーの頭の中では、入力ボックスがすでにプロダクトそのものなのです。',
      's03.e3.label': '証拠 03 · インターフェースが受け止めきれないほど正確に語る',
      's03.e3.body': 'ヘビーユーザーはカラム名をそのまま文章に打ち込みます。その正確さは新規ユーザーの約 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。そして、これほど明瞭なリクエストが失敗するとき、<span class="stat-hi">95.9%</span> は旧アーキテクチャが受け止められなかったケースでした（<code>NO_RELEVANT_SQL</code>）。ボトルネックは表現側ではなく、受信側にあったのです。',
      's03.turn.label': '転換点 · すべての能力を、ユーザーが唯一覚えている入力ボックスへ移す',
      's03.turn.body': '<span class="stat-hi-blue">入力ボックスは、彼らが覚えている唯一の入口です。</span>これは私が推論で辿り着いた結論ではありません。間違ったものを一度設計してみて、ようやく見えたことでした。そこが見えてしまえば、次の一手は自然でした。ボタンの場所を教え直すのではなく、あらゆる機能を対話の中に住む <span class="stat-hi">Skill</span> として作り直す。しかも、最も移しにくく、最も価値の高いものから。つまり、AI に教えるという行為そのものから。',
      's04.title': '話しかけて AI に教える：Knowledge が Skill になる',
      's04.lede': '「教える」ことは、製品の中で最も対話に移しにくいものでした。レポートボタンは一度のクリックに一つの結果ですが、教えることは構造があり、複数の手順を踏み、しかも正しくなければなりません。あなたが教えた内容を、チーム全員が引き継ぐからです。だからこそ、最初に手をつけました。',
      's04.before.label': 'Before · Knowledge は、やり切らないといけないページだった',
      's04.before.body': '業務ロジックは、専用ページで一行ずつ入力する手作業の Knowledge 設定を通して入っていました。しかも、それが必要になる瞬間から切り離されていました。質問を中断して設定しに行き、また戻ってくる。多くのチームは最後までやり切れず、AI は中途半端に教えられたままでした。',
      's04.after.label': 'After · Knowledge は、フォームではなく会話になった',
      's04.after.body': '今は、同僚にブリーフィングするように、話しかけて AI に教えられます。「アクティブ顧客とは、キャンセルされていない注文が 1 件以上あること」。agent は聞き取った内容を選択式の質問で確認し、ルールを markdown ファイルとして下書きし、どうするかを尋ねます。明示的な承認なしには何も公開されず、公開されれば、チーム全体が同じ定義を受け継ぎます。',
      's04.demo.label': '出荷されたフロー、4 つの瞬間',
      's04.demoA.cap': '<b>01 · 推測せず、収束させる。</b>agent は曖昧な依頼を選択式の質問に変えます。「active customer」は、モデルが勝手に想定した定義ではなく、ユーザー自身が選んだひとつの定義に着地します。',
      's04.demoB.cap': '<b>02 · 保存の前に、確認。</b>agent はルールを markdown ファイルとして下書きし、サマリーを見せて、どうするかを尋ねます。「Publish to project knowledge」を選んだときだけ書き戻される。システムは決めつけず、必ず尋ねます。',
      's04.kb.cap': '<b>03 · ページは消えたのではなく、監査面になった。</b>教えられたルールはすべて、バージョン管理できる markdown ファイルとして glossary・rules・SQL パターンに整理され、チーム全員がレビューできます。',
      's04.applied.cap': '<b>04 · ループが閉じる。</b>新しいスレッド、あとから来た質問。agent は答える前に、適用しているルールの名前を出します。<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。ひとりがついでに一度教えただけです。それ以降に聞いた人は全員、同じ定義を受け取り、どの定義が使われたかも見えます。',
      's04.rej.label': '途中で却下した設計',
      's04.rej.sub': 'agent が推測した内容を、黙って保存させる',
      's04.rej.body': 'いちばん摩擦のないバージョンは、確認せずに修正を取り込むことです。私はこれを却下しました。Knowledge は共有インフラだからです。聞き間違えたひとつの文が、誰にも気づかれないまま、チーム全員の回答を静かに汚染してしまう。下書きと明示的な「Publish to project knowledge」のゲートは、クリック 1 回と引き換えに監査可能性を手に入れる取引です。',
      's04.close': 'これがパターンを証明したケースでした。製品の中でいちばん構造的で、いちばん「設定っぽい」タスクである「教える」ことさえ会話に畳み込めるなら、ほかのすべても同じようにできるはずです。',
      's05.title': '最終アウトプット：すべての機能をひとつの Skill に',
      's05.jC.body': '<p class="body">以前の線形アーキテクチャでは、レポート生成・データ評価・ドキュメント解析といった中核機能が、UI 上のボタンや専用モードとして散らばっていました。これは開発コストを膨らませ、ユーザーの作業の流れも分断していました。私たちは Official Skills を再定義し、これらの複雑なバックエンドロジックを<span class="stat-hi">「アトミックな」</span>能力モジュールにまとめ直しました。</p><p class="body">この転換における最も深いデザイン上の意味は、<span class="stat-hi">あらゆる能力が同じトリガー文法に収束する</span>ことで、どれを呼び出すのも、ユーザーが既に使っている入力ボックスの一文で済むようになる、ということです。Skill の作成と管理は下のデモのとおり今も一つの画面ですが、使うために機能を探し回る必要は誰にもありません。これによって得られるのは、ひとつのルーティング層と、インターフェースを増やさずに広げられる能力セットです。</p><h4 class="journey-h4">統一されたルーティング：UI 操作を自然言語コマンドへ</h4><p class="body">以前は UI のクリックでしか発火できなかった特定のタスクが、すべて Skill ルーティング経由で実行されるようになりました。</p><ul class="journey-list"><li><code>generate-report</code>：「レポート生成」アイコンを探す必要はもうありません。Agent が文脈から発火するか、ユーザーがコマンドで明示的に呼びます。</li><li><code>analyze-data</code> と <code>sql-queries</code>：「問いに答える」と「SQL を書く」という別次元のタスクを切り離し、Agent はどのタイミングで探索すべきか、いつ正確な数字を取りに行くべきかを判断できます。</li></ul><h4 class="journey-h4">Official Skills 一覧：Agent の中核領域を定義する</h4><p class="body">私たちは 6 つの Official Skills を厳選し、Agent の基礎能力レイヤーとしました：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計意図とユースケース</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>分析のコア。ユーザーがトレンド探索、具体的な数値の取得、可視化を求めるときに発火。</td></tr><tr><td><code>sql-queries</code></td><td>精密なデータ取得。SQL の作成と実行に特化し、最短距離の回答を返す。</td></tr><tr><td><code>generate-report</code></td><td>ナラティブな出力。散らばったインサイトを、図表とサマリー付きの完成形レポートに統合。</td></tr><tr><td><code>pdf</code></td><td>非構造データの抽出。PDF からテキストと表を正確に取り出し、分析パイプラインへ。</td></tr><tr><td><code>doc</code></td><td>Word ドキュメントの解析。<code>.doc</code> / <code>.docx</code> を同じパイプラインへ。</td></tr><tr><td><code>spreadsheet</code></td><td>外部データの変換。CSV/Excel のインポートと変換を担い、データソースを跨いだ分析を実現。</td></tr></tbody></table><h4 class="journey-h4">なぜ、これがプロダクトにとって重要か</h4><p class="body">機能を Skill に変えることの最大の UX 価値は、<span class="stat-hi">認知負荷の削減</span>です。ユーザーは「このボタンはどこにある？」を覚える必要がなくなり、「何を達成したいか」だけに集中できます。プロダクトチームにとっては、能力拡張が驚くほど軽量になります。新しい AI 評価モデルや特定のデータクリーニングロジックを足したいとき、複雑な UI フローを書き換える必要はなく、新しい Skill をリリースすれば済みます。この「機能のデカップリング、能力のアグリゲーション」というアーキテクチャこそ、Wren AI が Agent 時代に高速で反復しつつ、監査レベルの透明性を保てる、中核的な技術資産です。</p>',
      's05.jC.userJourney': 'ユーザージャーニー',
      's05.jC.jUpload': 'Skill をアップロード',
      's05.jC.jTry': '試してみる',
      's05.jC.play': '再生',
      's05.replay': 'リプレイ',
      's06.title': '成果、そしてこのやり方が難しくしたこと',
      's06.out1.label': 'ユーザーは地図を学ばなくなった',
      's06.out1.body': 'ゴールを言葉にするだけ。ローンチから 1 か月以内に、旧入口の利用は月数百件から<span class="stat-hi">1 桁</span>に落ち、誰も戻りませんでした。初期フィードバックは約 <span class="stat-hi">4:1</span> でポジティブ（サンプルは小さく、追跡継続中）。',
      's06.out2.label': 'チームは UI に触れずに機能を出せる',
      's06.out2.body': '新しい能力 = <span class="stat-hi">Skill</span> をひとつ公開すること。新しいボタンも、ページも、チュートリアルも要りません。UI 開発は機能ごとの固定費から、一度きりのアーキテクチャ投資に変わりました。',
      's06.out3.label': '統一されたトリガー文法がエコシステムを開いた',
      's06.out3.body': 'ユーザー自作の Skill は Official Skills と同じルールで動きます。能力の拡張は、もはやプロダクトチームだけのものではありません。',
      's06.hard.label': 'このやり方が難しくしたこと、そしてどう手を打ったか',
      's06.hard.body': 'いまやすべての機能が同じ入力欄の裏にあります。つまり、何ひとつ自ら名乗り出てきません。旧来の画面は辿りにくかったものの、十数個のボタンは少なくとも「この製品に何ができるか」を伝えていました。そのボタンがまだ画面にあった時点で、トライアルユーザーはすでに <span class="stat-hi-blue">「what can I ask?」</span> と打ち込んでいたのです。そこで、発見の導線もメニューに戻すのではなく、同じ入力欄の中へ移しました。',
      's06.onb.cap': '<b>発見の導線も入力欄の中へ。</b>初回のスレッドで、Agent が自分に何ができるかを提示します。各カードはプレビューへ展開し、「Try it out」は設定ページを開くのではなく、チャットの中でそのままフローを開始します。問いが生まれる場所で、答えが返ってくる形です。',
      's06.open': '未解決のまま残っているのはスケールです。厳選された数枚のカードは、訪れたその日の「what can I ask?」には答えられます。しかし Skill アーキテクチャの狙いは、画面を増やさずに機能を増やせることであり、カスタム Skill によって作る側もユーザーに開かれています。増え続ける前提の面を、固定のウェルカム画面が追いかけきることはできません。広がっていく機能群に対して発見可能性をどう保つか。それがここでの本当の負債であり、私が次に取り組む問題です。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.悖論',
      'nav.s02': '02.彎路',
      'nav.s03': '03.證據',
      'nav.s04': '04.教 AI',
      'nav.s05': '05.Skill 化',
      'nav.s06': '06.結果',
      'title.big': '用對話教會 AI',
      'title.sub': '用對話的方式建構 Knowledge，讓 AI 符合企業內部的邏輯。',
      'intro.overview.label': '我們要解決的問題',
      'intro.overview.body': 'Wren AI 是一款對話式 BI 工具，你可以用自然語言向資料提問。但要答得好，得先教會它：指標、定義、商業規則。這件「教」的事，在系統中被稱作 Knowledge，在舊版產品裡，它是一個要一行一行填寫的專屬頁面，和十幾個沒人記得住的功能入口並排放著。數據把利害關係講得很清楚：有建立 Knowledge 的團隊，付費機率高出許多，偏偏幾乎沒人把它做完。這篇案例分析要談的，就是我如何把「教 AI」這件事，以及最終把每一項功能，都搬進用戶真正待著的唯一地方：對話框。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">唯一的產品設計師</span>，同時兼任<span class="stat-hi">產品負責人</span>與<span class="stat-hi">使用者研究員</span>。負責 Langfuse 與 PostHog 數據分析、Agent UX 的端到端設計，以及<span class="stat-hi">上線後的假設驗證框架</span>，並與工程團隊一起交付。',
      'intro.time.label': '公司與時程',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': '團隊最有價值的那個行為，幾乎沒有人做完',
      's01.lede': 'Wren 要答得好，得先有人告訴它業務到底怎麼運作：指標、定義、規則。這件「教」的事，在產品裡叫做 Knowledge。在所有我們量得到的行為裡，它是最有價值的一個，同時也是最少被做完的一個。',
      's01.f1.label': '建立 Knowledge，是團隊會不會付費最強的訊號之一',
      's01.f1.body': '在我們的啟用數據裡，教 AI 這件事，是我們觀測得到最強的付費訊號之一。有建立 Knowledge 的用戶付費率是 <span class="stat-hi">0.7%</span>，沒有建立的則是 <span class="stat-hi">0.1%</span>，大約<span class="stat-hi">高出 7 倍</span>。教 AI 不是「有更好」，在所有量得到的行為裡，它是顧客能做的最有價值的事情之一。',
      's01.f2.label': '偏偏，它也是產品裡最少被做完的事情之一',
      's01.f2.body': '只有大約 <span class="stat-hi">10%</span> 的團隊建立過任何一條，而且整年一路下滑。因為要用到它，得先走完一個要一行一行填寫的手動設定頁，很多團隊做到一半就放棄了。我們手上最強的槓桿，一直沒被碰過。',
      's01.chart.cap': '付費率（以人計 · 有建立 Knowledge 與其餘）',
      's01.chart.r1': '有建立 Knowledge',
      's01.chart.tag': '約 7 倍',
      's01.chart.r2': '沒有建立',
      's01.chart.note': '此為相關性、付費樣本偏小，仍在訪談驗證中。',
      's02.title': '我先重做了那個頁面，然後數據把它殺了',
      's02.lede': '最直覺的解讀是那個設定頁太難走完，所以我一開始要修的就是它：更好的範本、批次匯入、更友善的空狀態。真正動工之前，我拉了 90 天的產品數據，想確認團隊是在哪一步掉的。結果它給我看的，是我原本沒有在找的東西。',
      's02.f1.label': '91% 的互動發生在同一個輸入框',
      's02.f1.body': '產品擁有十幾個功能入口，但在近 18,500 次的互動中，所有入口的使用率合計不到<span class="stat-hi">一成</span>，其餘全數發生在對話框裡。',
      's02.f2.label': '72% 的用戶從未碰過任何功能入口',
      's02.f2.body': '在 582 位活躍用戶中，多數人從頭到尾只待在對話框裡；即便是最熱門的功能入口，也只有 <span class="stat-hi">14%</span> 的人用過。',
      's02.f3.label': '20 段用戶錄影裡，有 13 段在選單間折返迷航',
      's02.f3.body': '觀察真實的操作錄影，用戶尋找功能的典型路徑並非直線直達，而是「點進去、退出、再換個選單試試看」。',
      's02.close': '這些數字沒有一個在描述「一個很難用的頁面」，它們描述的是「一個沒有人走到的頁面」。用戶不是在 Knowledge 裡面失敗，是根本沒有抵達。打磨一個沒人造訪的目的地，動不了一個由缺席驅動的數字。所以我停下重做頁面的工作，改去看用戶實際上待在哪裡。',
      's03.title': '用戶記不住入口，但清楚自己想做什麼',
      's03.lede': '最難搬的能力不是某顆報表按鈕，而是「教」這件事本身。Wren 要答得好，得先有人告訴它業務到底怎麼運作：指標、定義、規則。這就是 Knowledge，它既是產品裡最重的一道介面，也悄悄是團隊能做的最有價值的行為。',
      's03.e1.label': '證據 01 · 直接在對話裡點菜',
      's03.e1.body': '明明旁邊就有專屬按鈕，用戶依然直接開口要求：「生成一張圖」、「幫我做報表」、「改成折線圖」。對他們而言，<span class="stat-hi">語言不是備案，是第一直覺。</span>',
      's03.e2.label': '證據 02 · 連「產品能做什麼」都是用問的',
      's03.e2.body': '試用期的用戶會在輸入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。沒有人會再去翻選單來學習如何使用產品了。在用戶心中，輸入框就等於整個產品。',
      's03.e3.label': '證據 03 · 表達得比介面還精確',
      's03.e3.body': '重度用戶會直接把資料庫欄位名稱打進句子裡，精確度約是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而這些表達最清晰的請求一旦失敗，<span class="stat-hi">95.9%</span> 是因為舊架構接不住（<code>NO_RELEVANT_SQL</code>）。系統的瓶頸從來不是用戶的表達，而是產品的接收。',
      's03.turn.label': '關鍵轉折 · 把所有能力，搬進他們唯一記得的輸入框',
      's03.turn.body': '<span class="stat-hi-blue">輸入框是他們唯一記得的入口。</span>這個結論不是我推導出來的，我得先把錯的東西設計過一遍，才看得見它。一旦看清楚，接下來的動作就很自然了：與其再花心力教用戶按鈕在哪，我把每個功能都重建成住在對話裡的 <span class="stat-hi">Skill</span>，而且從最難搬、也最有價值的那一個開始，也就是教 AI 這件事本身。',
      's04.title': '用對話教會 AI：Knowledge 變成一個 Skill',
      's04.lede': '「教」是產品裡最難搬進對話的一件事。一顆報表按鈕是一次點擊、一個結果；教學則是有結構的、多步驟的，而且必須正確，因為團隊裡每個人都會繼承你教的東西。正因為如此，它才是第一個要做的。',
      's04.before.label': 'Before · Knowledge 是一個你得填完的頁面',
      's04.before.body': '業務邏輯是透過一個手動的 Knowledge 設定進來的，在專屬頁面上一行一行填，而且和「需要它的當下」是脫節的。你得先中斷提問去設定，再回來。多數團隊從沒填完，AI 也就一直只被教了一半。',
      's04.after.label': 'After · Knowledge 是一段對話，不是一張表單',
      's04.after.body': '現在你用說的教 AI，就像跟同事交代事情：「活躍顧客的定義，是至少有一筆未取消的訂單。」agent 會用選擇題跟你確認它聽到的內容，把規則起草成一個 markdown 檔案，再問你要怎麼處理。沒有明確的同意，什麼都不會被發佈；一旦發佈，整個團隊繼承的就是同一個定義。',
      's04.demo.label': '實際上線的流程，四個時刻',
      's04.demoA.cap': '<b>01 · 收斂，而不是猜。</b>agent 把模糊的請求變成選擇題，讓「active customer」落在用戶親自選的那一個定義上，而不是模型自行假設的版本。',
      's04.demoB.cap': '<b>02 · 先確認，才儲存。</b>agent 把規則起草成 markdown 檔案、給出摘要，然後問你要怎麼處理。只有按下「Publish to project knowledge」才會寫回。系統從不假設，它永遠先問。',
      's04.kb.cap': '<b>03 · 頁面沒有消失，它變成了稽核介面。</b>每一條教過的規則都是一個可版本控管的 markdown 檔案，分類在 glossary、rules 與 SQL patterns 之下，整個團隊都能檢視。',
      's04.applied.cap': '<b>04 · 迴圈收合。</b>換一條新的對話、換一個之後才問的問題，agent 在回答之前先把它套用的規則講出來：<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。這條規則只有一個人、在某次對話裡順手教過一次。之後每一個問的人，拿到的都是同一個定義，而且看得到它用的是哪一條。',
      's04.rej.label': '一路上被我否決的設計',
      's04.rej.sub': '讓 agent 把它推斷到的東西默默存起來',
      's04.rej.body': '摩擦最小的版本，是不問就把修正收下。我否決了它，因為 Knowledge 是共享的基礎設施：一句聽錯的話，會在沒有人知道原因的情況下，安靜地污染每個隊友的答案。「草稿＋明確按下 Publish to project knowledge」這道關卡，是用一次點擊換來可稽核性。',
      's04.close': '這就是證明整套模式的那個案例。如果連「教」這件產品裡最結構化、最「像在做設定」的任務，都能收進一段對話，那其他所有事也一樣可以。',
      's05.title': '最終產出：每個功能都是一個 Skill',
      's05.jC.body': '<p class="body">在過去的線性架構中，許多核心功能（如生成報表、數據評估、文件解析）往往被設計成散落在介面各處的按鈕或獨立模式。這不僅增加了開發成本，也限制了用戶的操作流暢度。我們重新定義了 Official Skills，將這些複雜的後端邏輯包裝成<span class="stat-hi">「原子化」</span>的能力模組。</p><p class="body">這項轉向最深的設計意義在於：<span class="stat-hi">每一個能力都收斂為同一種觸發語法</span>，所以要用哪一個，都只是在用戶本來就在打字的那個框裡講一句話。撰寫與治理 Skill 仍然是一個實際的介面，就像下方 demo 呈現的那樣，但沒有人需要為了「使用」而先去找到某個功能。這帶來的，是一層統一的路由，以及一組不必跟著長出新介面就能擴充的能力。</p><h4 class="journey-h4">統一的路由架構：將介面操作轉化為自然語言指令</h4><p class="body">過去需要透過點擊介面才能觸發的特定任務，現在全部透過 Skill 路由實現。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要尋找「生成報表」的圖示，Agent 會根據上下文自動觸發，或由用戶透過指令主動呼叫。</li><li><code>analyze-data</code> 與 <code>sql-queries</code>：我們將「回答問題」與「寫 SQL」這兩種不同維度的任務拆解，讓 Agent 能精準判斷何時該進行趨勢探索，何時該精確產出數據。</li></ul><h4 class="journey-h4">Official Skills 概覽：定義 Agent 的核心邊界</h4><p class="body">我們精心策展了 6 個官方技能，作為 Agent 的基礎能力層：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>設計目的與應用場景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>數據分析核心：當用戶需要探索趨勢、獲取特定數字或進行視覺化時觸發。</td></tr><tr><td><code>sql-queries</code></td><td>精準取數：專注於撰寫並執行 SQL，提供最直接的數據解答。</td></tr><tr><td><code>generate-report</code></td><td>敘事化產出：將散落的數據洞察整合成包含圖表與摘要的完整報告。</td></tr><tr><td><code>pdf</code></td><td>非結構化數據提取：從 PDF 中精準提取文字與表格，納入分析流程。</td></tr><tr><td><code>doc</code></td><td>Word 文件解析：把 <code>.doc</code> 與 <code>.docx</code> 帶進同一條流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部數據轉換：處理 CSV/Excel 的匯入與轉換，實現跨資料源的分析。</td></tr></tbody></table><h4 class="journey-h4">設計結語：為什麼這對產品至關重要？</h4><p class="body">將功能轉化為 Skill，最大的 UX 價值在於<span class="stat-hi">「認知負擔的降低」</span>。對於用戶來說，他們不再需要學習「這個按鈕在哪裡」，只需要關注「我想達成什麼目標」。對產品團隊而言，這套架構讓能力的擴充變得異常輕量。當我們需要加入新的 AI 評估模型或特定的數據清洗邏輯時，我們不再需要去改動複雜的 UI 流程，而是直接發佈一個新的 Skill。這種「功能解耦、能力聚合」的設計，正是 Wren AI 能在 Agent 時代快速迭代、並同時保有「稽核級透明度」的核心技術資產。</p>',
      's05.jC.userJourney': '用戶旅程',
      's05.jC.jUpload': '上傳 Skill',
      's05.jC.jTry': '實際試用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      's06.title': '結果，以及這個做法讓什麼變難了',
      's06.out1.label': '用戶不用再學地圖',
      's06.out1.body': '描述目標就好。上線一個月內，舊入口的使用量從每月數百次掉到<span class="stat-hi">個位數</span>，沒有人回頭；早期回饋的讚與倒讚比例約為 <span class="stat-hi">4:1</span>（樣本尚小，持續追蹤中）。',
      's06.out2.label': '團隊出新功能，不再動 UI',
      's06.out2.body': '新能力就等於發佈一個 <span class="stat-hi">Skill</span>：沒有新按鈕、新頁面、新教學。介面開發從每個功能的固定成本，變成了一次性的架構投資。',
      's06.out3.label': '統一的觸發語法打開了生態',
      's06.out3.body': '用戶自訂 Skill 與 Official Skills 遵循同一套規則，能力的擴充從此不再只屬於產品團隊。',
      's06.hard.label': '這個做法讓什麼變難了，以及我們怎麼處理',
      's06.hard.body': '現在每個能力都待在同一個輸入框後面，也就是說，沒有任何東西會自己現身。舊介面確實難導覽，但那十幾顆按鈕至少告訴了你這個產品做得到什麼。按鈕都還在的時候，試用者就已經在打 <span class="stat-hi-blue">「what can I ask?」</span> 了。所以我們把「發現能力」這件事也搬進輸入框裡，而不是把選單加回去。',
      's06.onb.cap': '<b>連「發現」也搬進了對話裡。</b>第一次使用時，Agent 會先開一個對話，主動說明自己做得到什麼。每張卡片都能展開成預覽，而「Try it out」不是打開設定頁，是直接在對話裡把流程跑起來。問題在哪裡出現，答案就在那裡給。',
      's06.open': '真正還沒解決的是規模。幾張精選卡片，能回答你抵達那天的「what can I ask?」。但 Skill 架構的用意，正是讓能力可以成長而介面不必跟著長大，而自訂 Skill 更把「誰能做能力」交還給了使用者。一份固定的歡迎清單，追不上一個被設計成會持續擴張的面。如何讓可發現性跟上一個註定會長大的能力集合，才是這裡真正欠下的債，也是我接下來會處理的問題。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.悖论',
      'nav.s02': '02.弯路',
      'nav.s03': '03.证据',
      'nav.s04': '04.教 AI',
      'nav.s05': '05.Skill 化',
      'nav.s06': '06.结果',
      'title.big': '用对话教会 AI',
      'title.sub': '用对话的方式建构 Knowledge，让 AI 符合企业内部的逻辑。',
      'intro.overview.label': '我们要解决的问题',
      'intro.overview.body': 'Wren AI 是一款对话式 BI 工具，你可以用自然语言向数据提问。但要答得好，得先教会它：指标、定义、业务规则。这件「教」的事，在系统中被称作 Knowledge，在旧版产品里，它是一个要一行一行填写的专属页面，和十几个没人记得住的功能入口并排放着。数据把利害关系讲得很清楚：有建立 Knowledge 的团队，付费概率高出许多，偏偏几乎没人把它做完。这篇案例分析要谈的，就是我如何把「教 AI」这件事，以及最终把每一项功能，都搬进用户真正待着的唯一地方：对话框。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">唯一的产品设计师</span>，同时兼任<span class="stat-hi">产品负责人</span>与<span class="stat-hi">用户研究员</span>。负责 Langfuse 与 PostHog 数据分析、Agent UX 的端到端设计，以及<span class="stat-hi">上线后的假设验证框架</span>，并与工程团队一起交付。',
      'intro.time.label': '公司与时程',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': '团队最有价值的那个行为，几乎没有人做完',
      's01.lede': 'Wren 要答得好，得先有人告诉它业务到底怎么运作：指标、定义、规则。这件「教」的事，在产品里叫做 Knowledge。在所有我们量得到的行为里，它是最有价值的一个，同时也是最少被做完的一个。',
      's01.f1.label': '建立 Knowledge，是团队会不会付费最强的信号之一',
      's01.f1.body': '在我们的激活数据里，教 AI 这件事，是我们观测得到最强的付费信号之一。有建立 Knowledge 的用户付费率是 <span class="stat-hi">0.7%</span>，没有建立的则是 <span class="stat-hi">0.1%</span>，大约<span class="stat-hi">高出 7 倍</span>。教 AI 不是「有更好」，在所有量得到的行为里，它是客户能做的最有价值的事情之一。',
      's01.f2.label': '偏偏，它也是产品里最少被做完的事情之一',
      's01.f2.body': '只有大约 <span class="stat-hi">10%</span> 的团队建立过任何一条，而且整年一路下滑。因为要用到它，得先走完一个要一行一行填写的手动设置页，很多团队做到一半就放弃了。我们手上最强的杠杆，一直没被碰过。',
      's01.chart.cap': '付费率（以人计 · 有建立 Knowledge 与其余）',
      's01.chart.r1': '有建立 Knowledge',
      's01.chart.tag': '约 7 倍',
      's01.chart.r2': '没有建立',
      's01.chart.note': '此为相关性、付费样本偏小，仍在访谈验证中。',
      's02.title': '我先重做了那个页面，然后数据把它杀了',
      's02.lede': '最直觉的解读是那个设置页太难走完，所以我一开始要修的就是它：更好的模板、批量导入、更友善的空状态。真正动工之前，我拉了 90 天的产品数据，想确认团队是在哪一步掉的。结果它给我看的，是我原本没有在找的东西。',
      's02.f1.label': '91% 的交互发生在同一个输入框',
      's02.f1.body': '产品拥有十几个功能入口，但在近 18,500 次的交互中，所有入口的使用率合计不到<span class="stat-hi">一成</span>，其余全数发生在对话框里。',
      's02.f2.label': '72% 的用户从未碰过任何功能入口',
      's02.f2.body': '在 582 位活跃用户中，多数人从头到尾只待在对话框里；即便是最热门的功能入口，也只有 <span class="stat-hi">14%</span> 的人用过。',
      's02.f3.label': '20 段用户录像里，有 13 段在菜单间折返迷航',
      's02.f3.body': '观察真实的操作录像，用户寻找功能的典型路径并非直线直达，而是「点进去、退出、再换个菜单试试看」。',
      's02.close': '这些数字没有一个在描述「一个很难用的页面」，它们描述的是「一个没有人走到的页面」。用户不是在 Knowledge 里面失败，是根本没有抵达。打磨一个没人造访的目的地，动不了一个由缺席驱动的数字。所以我停下重做页面的工作，改去看用户实际上待在哪里。',
      's03.title': '用户记不住入口，但清楚自己想做什么',
      's03.lede': '最难搬的能力不是某颗报表按钮，而是「教」这件事本身。Wren 要答得好，得先有人告诉它业务到底怎么运作：指标、定义、规则。这就是 Knowledge，它既是产品里最重的一道界面，也悄悄是团队能做的最有价值的行为。',
      's03.e1.label': '证据 01 · 直接在对话里点菜',
      's03.e1.body': '明明旁边就有专属按钮，用户依然直接开口要求：「生成一张图」、「帮我做报表」、「改成折线图」。对他们而言，<span class="stat-hi">语言不是备案，是第一直觉。</span>',
      's03.e2.label': '证据 02 · 连「产品能做什么」都是用问的',
      's03.e2.body': '试用期的用户会在输入框直接打出 <span class="stat-hi-blue">"what can I ask?"</span>。没有人会再去翻菜单来学习如何使用产品了。在用户心中，输入框就等于整个产品。',
      's03.e3.label': '证据 03 · 表达得比界面还精确',
      's03.e3.body': '重度用户会直接把数据库字段名称打进句子里，精确度约是新手的 <span class="stat-hi">12 倍</span>：「Show DAU from <code>BUFF_GAME_DAILY_ACTIVE_USERS</code>…」。而这些表达最清晰的请求一旦失败，<span class="stat-hi">95.9%</span> 是因为旧架构接不住（<code>NO_RELEVANT_SQL</code>）。系统的瓶颈从来不是用户的表达，而是产品的接收。',
      's03.turn.label': '关键转折 · 把所有能力，搬进他们唯一记得的输入框',
      's03.turn.body': '<span class="stat-hi-blue">输入框是他们唯一记得的入口。</span>这个结论不是我推导出来的，我得先把错的东西设计过一遍，才看得见它。一旦看清楚，接下来的动作就很自然了：与其再花心力教用户按钮在哪，我把每个功能都重建成住在对话里的 <span class="stat-hi">Skill</span>，而且从最难搬、也最有价值的那一个开始，也就是教 AI 这件事本身。',
      's04.title': '用对话教会 AI：Knowledge 变成一个 Skill',
      's04.lede': '「教」是产品里最难搬进对话的一件事。一颗报表按钮是一次点击、一个结果；教学则是有结构的、多步骤的，而且必须正确，因为团队里每个人都会继承你教的东西。正因为如此，它才是第一个要做的。',
      's04.before.label': 'Before · Knowledge 是一个你得填完的页面',
      's04.before.body': '业务逻辑是通过一个手动的 Knowledge 设置进来的，在专属页面上一行一行填，而且和「需要它的当下」是脱节的。你得先中断提问去设置，再回来。多数团队从没填完，AI 也就一直只被教了一半。',
      's04.after.label': 'After · Knowledge 是一段对话，不是一张表单',
      's04.after.body': '现在你用说的教 AI，就像跟同事交代事情：「活跃客户的定义，是至少有一笔未取消的订单。」agent 会用选择题跟你确认它听到的内容，把规则起草成一个 markdown 文件，再问你要怎么处理。没有明确的同意，什么都不会被发布；一旦发布，整个团队继承的就是同一个定义。',
      's04.demo.label': '实际上线的流程，四个时刻',
      's04.demoA.cap': '<b>01 · 收敛，而不是猜。</b>agent 把模糊的请求变成选择题，让「active customer」落在用户亲自选的那一个定义上，而不是模型自行假设的版本。',
      's04.demoB.cap': '<b>02 · 先确认，才保存。</b>agent 把规则起草成 markdown 文件、给出摘要，然后问你要怎么处理。只有按下「Publish to project knowledge」才会写回。系统从不假设，它永远先问。',
      's04.kb.cap': '<b>03 · 页面没有消失，它变成了审计界面。</b>每一条教过的规则都是一个可版本管理的 markdown 文件，分类在 glossary、rules 与 SQL patterns 之下，整个团队都能查看。',
      's04.applied.cap': '<b>04 · 回路闭合。</b>换一条新的对话、换一个之后才问的问题，agent 在回答之前先把它套用的规则讲出来：<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。这条规则只有一个人、在某次对话里顺手教过一次。之后每一个问的人，拿到的都是同一个定义，而且看得到它用的是哪一条。',
      's04.rej.label': '一路上被我否决的设计',
      's04.rej.sub': '让 agent 把它推断到的东西默默存起来',
      's04.rej.body': '摩擦最小的版本，是不问就把修正收下。我否决了它，因为 Knowledge 是共享的基础设施：一句听错的话，会在没有人知道原因的情况下，安静地污染每个队友的答案。「草稿＋明确按下 Publish to project knowledge」这道关卡，是用一次点击换来可审计性。',
      's04.close': '这就是证明整套模式的那个案例。如果连「教」这件产品里最结构化、最「像在做设置」的任务，都能收进一段对话，那其他所有事也一样可以。',
      's05.title': '最终产出：每个功能都是一个 Skill',
      's05.jC.body': '<p class="body">在过去的线性架构中，许多核心功能（如生成报表、数据评估、文件解析）往往被设计成散落在界面各处的按钮或独立模式。这不仅增加了开发成本，也限制了用户的操作流畅度。我们重新定义了 Official Skills，将这些复杂的后端逻辑包装成<span class="stat-hi">"原子化"</span>的能力模块。</p><p class="body">这项转向最深的设计意义在于：<span class="stat-hi">每一个能力都收敛为同一种触发语法</span>，所以要用哪一个，都只是在用户本来就在打字的那个框里讲一句话。撰写与治理 Skill 仍然是一个实际的界面，就像下方 demo 呈现的那样，但没有人需要为了「使用」而先去找到某个功能。这带来的，是一层统一的路由，以及一组不必跟着长出新界面就能扩充的能力。</p><h4 class="journey-h4">统一的路由架构：将界面操作转化为自然语言指令</h4><p class="body">过去需要通过点击界面才能触发的特定任务，现在全部通过 Skill 路由实现。</p><ul class="journey-list"><li><code>generate-report</code>：不再需要寻找"生成报表"的图标，Agent 会根据上下文自动触发，或由用户通过指令主动调用。</li><li><code>analyze-data</code> 与 <code>sql-queries</code>：我们将"回答问题"与"写 SQL"这两种不同维度的任务拆解，让 Agent 能精准判断何时该进行趋势探索，何时该精确产出数据。</li></ul><h4 class="journey-h4">Official Skills 概览：定义 Agent 的核心边界</h4><p class="body">我们精心策展了 6 个官方技能，作为 Agent 的基础能力层：</p><table class="skill-table"><thead><tr><th>Skill ID</th><th>设计目的与应用场景</th></tr></thead><tbody><tr><td><code>analyze-data</code></td><td>数据分析核心：当用户需要探索趋势、获取特定数字或进行可视化时触发。</td></tr><tr><td><code>sql-queries</code></td><td>精准取数：专注于撰写并执行 SQL，提供最直接的数据解答。</td></tr><tr><td><code>generate-report</code></td><td>叙事化产出：将散落的数据洞察整合成包含图表与摘要的完整报告。</td></tr><tr><td><code>pdf</code></td><td>非结构化数据提取：从 PDF 中精准提取文字与表格，纳入分析流程。</td></tr><tr><td><code>doc</code></td><td>Word 文件解析：把 <code>.doc</code> 与 <code>.docx</code> 带进同一条流程。</td></tr><tr><td><code>spreadsheet</code></td><td>外部数据转换：处理 CSV/Excel 的导入与转换，实现跨数据源的分析。</td></tr></tbody></table><h4 class="journey-h4">设计结语：为什么这对产品至关重要？</h4><p class="body">将功能转化为 Skill，最大的 UX 价值在于<span class="stat-hi">"认知负担的降低"</span>。对于用户来说，他们不再需要学习"这个按钮在哪里"，只需要关注"我想达成什么目标"。对产品团队而言，这套架构让能力的扩充变得异常轻量。当我们需要加入新的 AI 评估模型或特定的数据清洗逻辑时，我们不再需要去改动复杂的 UI 流程，而是直接发布一个新的 Skill。这种"功能解耦、能力聚合"的设计，正是 Wren AI 能在 Agent 时代快速迭代、并同时保有"审计级透明度"的核心技术资产。</p>',
      's05.jC.userJourney': '用户旅程',
      's05.jC.jUpload': '上传 Skill',
      's05.jC.jTry': '实际试用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      's06.title': '结果，以及这个做法让什么变难了',
      's06.out1.label': '用户不用再学地图',
      's06.out1.body': '描述目标就好。上线一个月内，旧入口的使用量从每月数百次掉到<span class="stat-hi">个位数</span>，没有人回头；早期反馈的赞与踩比例约为 <span class="stat-hi">4:1</span>（样本尚小，持续跟踪中）。',
      's06.out2.label': '团队出新功能，不再动 UI',
      's06.out2.body': '新能力就等于发布一个 <span class="stat-hi">Skill</span>：没有新按钮、新页面、新教程。界面开发从每个功能的固定成本，变成了一次性的架构投资。',
      's06.out3.label': '统一的触发语法打开了生态',
      's06.out3.body': '用户自定义 Skill 与 Official Skills 遵循同一套规则，能力的扩展从此不再只属于产品团队。',
      's06.hard.label': '这个做法让什么变难了，以及我们怎么处理',
      's06.hard.body': '现在每个能力都待在同一个输入框后面，也就是说，没有任何东西会自己现身。旧界面确实难导览，但那十几颗按钮至少告诉了你这个产品做得到什么。按钮都还在的时候，试用者就已经在打 <span class="stat-hi-blue">「what can I ask?」</span> 了。所以我们把「发现能力」这件事也搬进输入框里，而不是把菜单加回去。',
      's06.onb.cap': '<b>连「发现」也搬进了对话里。</b>第一次使用时，Agent 会先开一个对话，主动说明自己做得到什么。每张卡片都能展开成预览，而「Try it out」不是打开设置页，是直接在对话里把流程跑起来。问题在哪里出现，答案就在那里给。',
      's06.open': '真正还没解决的是规模。几张精选卡片，能回答你抵达那天的「what can I ask?」。但 Skill 架构的用意，正是让能力可以成长而界面不必跟着长大，而自定义 Skill 更把「谁能做能力」交还给了用户。一份固定的欢迎清单，追不上一个被设计成会持续扩张的面。如何让可发现性跟上一个注定会长大的能力集合，才是这里真正欠下的债，也是我接下来会处理的问题。',
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
