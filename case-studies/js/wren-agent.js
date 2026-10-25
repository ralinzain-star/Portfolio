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
      'nav.s01': '01.シグナル',
      'nav.s02': '02.制約',
      'nav.s03': '03.教える',
      'nav.s04': '04.直す',
      'nav.s05': '05.システム',
      'nav.s06': '06.成果',
      'title.big': '全面リデザインなしで、Wren AI 最強の課金シグナルを伸ばす',
      'title.sub': 'B2B の AI は企業のビジネスロジックを学ぶ必要がありますが、その教え方を知っているユーザーはほとんどいません。Wren AI で、作り直すことなくこの問題を解決した過程です。',
      'intro.overview.label': '解決すべき課題',
      'intro.overview.body': 'Wren AI は会話型の BI ツールで、データに自然な言葉で質問できます。ただし、うまく答えるには、まずそのビジネスの仕組み、つまり指標・定義・ルールを学ぶ必要があります。プロダクトではこれを Knowledge と呼びます。Knowledge を作ったチームは課金する確率が約 7 倍高いのに、最後まで作り切るチームはほとんどなく、POC のたびに私たちのチームが顧客の代わりに手作業で作っていました。私が引き継いだ時点で、インターフェースはすでに code-first で作り直されており、リデザインの予算もありませんでした。そこでリデザインは、エンジニアリングの ticket 1 枚ずつ進めることになりました。このケーススタディは、デザインがまだ数字を動かせる場所をどう決めたか、そしてその過程で手放さなかったものについての話です。',
      'intro.role.label': '私の役割',
      'intro.role.body': '<span class="stat-hi">唯一のプロダクトデザイナー</span>であり、<span class="stat-hi">プロダクトオーナー</span>と<span class="stat-hi">ユーザーリサーチャー</span>も兼任。Langfuse と PostHog によるデータ分析、限られたエンジニアリング予算の中でデザインの力をどこに使うかの判断、Agent UX のエンドツーエンド設計、エンジニアリングが現在それに沿って開発している<span class="stat-hi">prompt ベースのデザインシステム</span>の構築、そしてローンチ後の検証フレームワークまでを担当しました。',
      'intro.time.label': '会社・期間',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': 'Knowledge は課金を動かす。それなのに、ほとんどのチームが作り切らなかった',
      's01.lede': 'Wren AI がうまく答えるには、誰かがそのビジネスの実際の仕組み、つまり指標・定義・ルールを伝える必要があります。顧客ができることの中で、教えることは最も価値が高い行動でした。同時に、最も完了されにくい行動でもあり、その差は私たちが埋めることになりました。',
      's01.f1.label': 'Knowledge の作成は、チームが課金するかどうかの最も強いシグナルのひとつ',
      's01.f1.body': 'Knowledge を作ったユーザーの課金率は <span class="stat-hi">0.7%</span>、作らなかったユーザーは <span class="stat-hi">0.1%</span>。<span class="stat-hi">約 7 倍</span>です。測れるものの中で、顧客が取りうる最も価値の高い行動のひとつでした。',
      's01.f2.label': 'Knowledge は、プロダクトで最も完了されない機能のひとつだった',
      's01.f2.body': 'Knowledge を一度でも作ったチームは約 <span class="stat-hi">10%</span> にとどまり、年間を通じて下がり続けました。そこへ辿り着くには、ルールを一つずつ入力する手動の設定ページを通る必要があり、多くのチームが途中で諦めていました。',
      's01.f3.label': 'POC のたびに、私たちが顧客の代わりに Knowledge を手作業で作っていた',
      's01.f3.body': '顧客が自力で作り切ることはほとんどなかったため、POC は私たちの負担になりました。営業が間に入って顧客ごとの定義を集め、私たちがプロダクトに書き込み、修正のたびに同じ経路をもう一度たどります。Knowledge だけで 1 回の POC に<span class="stat-hi">2〜3 週間</span>のやり取りがかかり、数件を超えると回らなくなりました。',
      's02.title': '作り直す余地はない。だから、誰もが使う会話ボックスから手をつけた',
      's02.lede': '当時は、ほとんどのスタートアップが Claude を使って開発とデザインのスピードを上げようとしていて、私たちも例外ではありませんでした。問題を十分に理解する前に、CTO が自ら最初のリデザインを作り、インターフェース全体を code-first で書き直していたため、設計し直す余地はほとんど残っていませんでした。それでも私たちは初期のリサーチを行い、ひとつの問いに答えようとしました。<span class="stat-hi-blue">設計し直さずに、この機能をどう立て直し、良くしていけるか。</span>90 日分のプロダクトデータを引き、実際の操作録画も見ました。',
      's02.f1.label': 'インタラクションの 91% が会話ボックスで起きる',
      's02.f1.body': 'プロダクトには十数個の機能入口があります。しかし約 18,500 件のインタラクションのうち、それらの合計は<span class="stat-hi">1 割未満</span>。残りはすべて会話の中で起きていました。',
      's02.f2.label': '72% のユーザーは機能入口に一度も触れない',
      's02.f2.body': '582 名のアクティブユーザーの大半は、最初から最後まで会話ボックスの中だけで過ごしていました。最も人気の機能入口でさえ、使ったのは <span class="stat-hi">14%</span> だけです。',
      's02.f3.label': 'セッション録画の 65% で、ユーザーがメニューの間を行き来していた',
      's02.f3.body': '20 本の実際の操作録画を見ると、機能に一直線で辿り着くことはほとんどなく、典型的なのは「入って、戻って、別のメニューを試す」の繰り返しでした。',
      's02.close': 'Knowledge ページもこの十数個の入口のひとつで、ほとんど開かれていませんでした。一方で、ほぼ全員が会話ボックスを使っていました。だから、そこから手をつけることにしました。',
      's02.trade.label': '手放したもの、手放さなかったもの',
      's02.trade.lede': 'すべての判断はトレードオフで、守ったルールはひとつだけでした。スコープは手放しても、体験への責任は手放さない。だから全面的な刷新は手放し、インターフェースはほぼエンジニアリングが作ったままにしました。一度きりのビジュアル刷新も手放し、新しいスタイルは ticket ごとに、その ticket が触れた画面から届けることにしました。ページを入口にすることもやめ、教えることはチャットから始め、ページはレビューと修正だけを担います。一方で、3 つのことは譲りませんでした。チームが AI に教え切れること。これが売上に結びつく数字だからです。壊れたインタラクションは出荷しないこと。速くても、使えなければ意味がないからです。そして、教えた Knowledge をレビューできる状態に保つこと。チーム共有の定義に、黙って入り込むものがあってはいけません。',
      's02.loop.label': '会話ボックスから始める。ただし、それだけに頼らない',
      's02.loop.body': 'Knowledge のルールはどれも同じ一生をたどり、そのすべてが 1 つの markdown ファイルの上で起こります。誰かが間違った答えに気づき、直し方を教える。agent が下書きし、本人が確認する。その後、その定義の持ち主がレビューや修正を行い、以後 agent はすべての答えにそのルールを適用します。ビジネスが変わり、答えがずれ始めたら、ループはもう一度回ります。このループには、コストの高い場所が 2 つあります。<b>始めること</b>と<b>正しく保つこと</b>です。',
      's02.loop.t1': 'きっかけ',
      's02.loop.s1': '答えが間違って返ってくる',
      's02.loop.t2': '判断 1 · チャット',
      's02.loop.s2': '会話の中で直し方を教える',
      's02.loop.t3': '判断 1 · チャット',
      's02.loop.s3': 'Agent が .md ファイルを下書きし、確認して公開する',
      's02.loop.t4': '判断 2 · ページ',
      's02.loop.s4': '持ち主がフォームか markdown でレビューし、修正する',
      's02.loop.t5': '成果',
      's02.loop.s5': 'Agent が以後すべての答えにそのルールを適用する',
      's02.loop.close': '「始めること」は広さの問題です。教える人が多いほど AI はビジネスを広く理解するので、全員に開かれたチャットに置きます。「正しく保つこと」は正確さの問題です。誰も直せないルールは誰も信用しないルールになるので、定義を持つ少数の人が使うページに置きます。',
      's03.title': '判断 1：問いが生まれた場所で教える',
      's03.lede': 'ユーザーはもともと会話ボックスにいたので、Knowledge づくりも会話ボックスから始めるべきでした。',
      's03.why.body': 'すぐ横にボタンがあっても、ユーザーは打ち込んで頼みます（「Make a report for me」）。トライアルユーザーは入力ボックスにそのまま <span class="stat-hi-blue">「what can I ask?」</span> と打ち込みます。ヘビーユーザーはカラム名を文章に直接書き、その正確さは新規ユーザーの約 <span class="stat-hi">12 倍</span>。そしてその正確なリクエストが失敗するとき、<span class="stat-hi">95.9%</span> は旧アーキテクチャが受け止められなかったケースでした。入力ボックスは全員が覚えている唯一の入口です。だから、教えることもそこで起こる必要がありました。',
      's03.before.label': 'Before · 最後まで埋めなければならないページ',
      's03.before.body': 'ビジネスロジックは専用ページで一つずつ入力するもので、必要になるその瞬間とは切り離されていました。質問を中断して設定に行き、また戻ってくる。ほとんどのチームは最後まで終えられず、AI は半分しか教わらないままでした。',
      's03.after.label': 'After · フォームではなく、会話',
      's03.after.body': 'いまは同僚に説明するように AI に教えます。「アクティブな顧客とは、キャンセルされていない注文が 1 件以上ある顧客のこと」。agent は選択式の質問で確認し、ルールを markdown ファイルとして下書きし、保存する前に尋ねます。公開されると、チーム全員が同じ定義を引き継ぎます。',
      's03.demoA.cap.t': '推測せず、収束させる',
      's03.demoA.cap.d': 'agent は曖昧な依頼を選択式の質問に変えます。「active customer」は、モデルが想定した定義ではなく、ユーザー自身が選んだ定義に着地します。',
      's03.demoB.cap.t': '保存の前に確認する',
      's03.demoB.cap.d': 'agent はルールを下書きして要約を見せ、「Publish to project knowledge」を選んだときだけ書き戻します。',
      's03.applied.cap.t': 'ループが閉じる',
      's03.applied.cap.d': '後の別のスレッドで、agent は適用しているルールを名指しします：<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。一人が一度教えれば、その後は全員が同じ答えを受け取ります。',
      's03.survey.body': '<b>なぜ空の入力欄ではなく、アンケートなのか。</b>定義をゼロから書ける人は多くありませんが、選ぶことならできます。だから agent は短いアンケートのように尋ねます。選択式で、一度に一つの判断だけ。その答えがそのままルールになります。これは <a href="rezio.html#s04">KKday Rezio</a> で取ったのと同じ手です。そこでは、すべての項目を一度に見せていた設定フォームを、短いプロファイリング質問に置き換えました。設定時間は 45 分から 28 分に短縮され、営業が顧客一社ずつに付き添う必要もなくなりました。Wren の POC が抱えていたのと同じ依存です。',
      's03.rej.body': '<b>却下した設計：</b>agent が推測した内容を、確認なしにそのまま保存させる案。最も摩擦の少ないバージョンでしたが、Knowledge は共有のインフラです。聞き間違えた一文が、チーム全員の答えを静かに汚染してしまいます。明示的な公開ステップは、1 クリックと引き換えに監査可能性を得るためのものです。',
      's03.split': 'チャットは、始めることを誰にとっても安くします。ただし、チャットが書き出すのはファイルであり、ファイルには持ち主が必要です。チームが教えた内容をレビューし、ビジネスが変われば修正し、POC の間は顧客のためにそれを整える人です。<span class="stat-hi-blue">その仕事は、会話の中で行うものではありません。</span>',
      's04.title': '判断 2：そのファイルを直しやすくする',
      's04.lede': 'チャットがファイルを書き、ページがそれを直す場所になります。使うのは定義の持ち主と、POC 中の私たち自身のチームです。打ち手は 2 つ。どちらも「間違った答えから、保存されたルールまで」の経路に絞り、どちらもすでにある部品で作りました。',
      's04.m2.label': '01 · フォームは残し、問い方を直す',
      's04.m2.body': 'Knowledge ページには、私のバージョンの前に 3 つのバージョンがありました。最初はテーブルで、種類は Question-SQL pairs と Instructions の 2 つだけ、1 行ずつ追加するものでした。code-first の作り直しで、4 つのフォルダ（glossary、metrics、rules、sql）に分かれた markdown ファイルのツリーになり、agent が使える情報は増えましたが、人には空のファイルが渡されました。私たちが構造を求めた結果、その上にフォームが追加されました。<b>Metrics</b>、<b>Glossary</b>、<b>SQL pairs</b>、<b>Instructions</b> のいずれかを選び、agent が必要とする項目を埋めます。この構造は土台として十分だったので、そのまま残しました。問題が起きていたのは、いちばん大事な瞬間でした。',
      's04.v1.cap.t': 'v1 · テーブル',
      's04.v1.cap.d': '種類は Question-SQL pairs と Instructions の 2 つ。1 行ずつ追加する。',
      's04.v2.cap.t': 'v2 · ファイルツリー',
      's04.v2.cap.d': 'code-first の作り直し。4 つのフォルダの markdown ファイル。agent には情報が増え、人には空のファイルが残った。',
      's04.m2.body2': 'Knowledge は、答えが間違ったときに書かれ、同じように答えが間違ったときに直されます。フォーム版は、このループの両端で失敗していました。種類の選択画面は、それぞれを「すでに持っているもの」で説明していました（「主要な指標について合意済みの計算式があるときに使う」）。しかし人は、解決策ではなく問題を抱えてやって来ます。さらに、フォームは作成時にしか現れませんでした。既存のファイルを直そうと開いて「Edit」を押すと、生の markdown と YAML に落とされます。<span class="stat-hi-blue">誰かがルールを直しに戻ってきた、まさにその瞬間に構造が消えていたのです。</span>',
      's04.m2.body3': '修正の範囲は、間違った答えから保存されたルールまでの経路に絞りました。課金に結びついているのがその経路だからです。そして、すでにある部品だけで作りました。種類の選択画面は、いまは問題のほうを示します（「ある数字の計算方法に合意がないときに使う」）。各グループを agent がどう使うかを説明し、空のファイルの代償も伝えます。agent は読みますが、そのファイルが何のためのものかは何も伝わりません。これはコピーの変更です。「Edit in form」は作成時のフォームを再利用するので、どのファイルも構造としても markdown としても編集できます。これは、すでに持っていたコンポーネントです。<span class="stat-hi">売上に最も近いステップで、開発コストはほぼゼロでした。</span>',
      's04.v3.cap.t': 'v3 · フォームを追加',
      's04.v3.cap.d': '各種類は「すでに持っているもの」で説明されています：「You have an agreed formula for a key business metric.」',
      's04.v4.cap.t': 'v4 · 私のバージョン',
      's04.v4.cap.d': '各種類はそれが解決する問題で説明され、各グループは agent の使い方を示し、空のファイルにはその代償が書かれています。',
      's04.v4form.cap.t': 'フォームとファイルを並べて',
      's04.v4form.cap.d': 'どのファイルも、agent が必要とする項目だけのフォームとして開き、その横に書き出される markdown が表示されます。',
      's04.m3.label': '02 · 中心のタスクと競合するものを削る',
      's04.m3.body': '開発予算が固定されているなら、作り直すより取り除くほうが安く済みます。ページ上のすべての要素を、ひとつの問いで確かめました。それは、間違った答えから保存されたルールへ進む助けになっているか。なっていなければ、取り除きました。',
      's04.m3.i1.label': '「Ask agent」を Knowledge ページから外した',
      's04.m3.i1.body': '新規ファイルのメニューにあり、作業中のファイルから離れて Home へ移動させるものでした。会話で教えることはすでにチャット側にあるので（セクション 03）、ページに必要なのは直接の経路だけです。新規ファイルのボタンは、いまはすぐに種類の選択画面を開きます。',
      's04.m3.i2.label': '1 つのファイルに、表示は 2 つではなく 1 つ',
      's04.m3.i2.body': 'サイドバーの「Summary for the AI」はファイル自身の frontmatter を繰り返しており、「Edit」と「Source」は同じ生の画面に行き着いていました。サイドバーをなくし、frontmatter は本文内に一度だけ置き、2 つの入口は 2 つの明確なアクション、Edit in form と Edit markdown になりました。',
      's04.m3.i3.label': 'いま教えているプロジェクトが、常に見える',
      's04.m3.i3.body': 'Knowledge はプロジェクトに属するので、どのプロジェクトに教えているのかは一目で分からなければなりません。切り替えはバーの中央、beta バッジの隣にあり、幅が狭くなるとナビゲーションとぶつかっていました。ロゴ横のパンくずへ移し、バッジは外しました。',
      's04.m3.before.cap.t': 'Before',
      's04.m3.before.cap.d': 'frontmatter を繰り返すサイドバー、Rendered/Source の切り替え、そして同じ生の画面に行き着く Edit ボタン。',
      's04.m3.after.cap.t': 'After',
      's04.m3.after.cap.d': '1 カラムで、frontmatter は本文内に。2 つのアクションは名前のとおりに動きます：Edit in form、Edit markdown。',
      's04.m3.defer': '<b>あえて戦わなかったこと。</b>v2 が code-first で作られた時点で、そのアーキテクチャは事実上決まっていました。私のリサーチ計画は v1 を土台にしたものでした。テーブルを残し、フィルターと検索を加え、Skill で Knowledge の編集とレビューを強化する。その計画に従えば、すでに動いているコードを捨てるようエンジニアリングに求めることになります。そこで計画を 2 つに分けました。テーブルは手放し、ファイルツリーは残す。上で挙げた修正はすべて、出荷済みの構造に逆らうのではなく、それに沿って行ったものです。Skill の半分は生き残り、チャットで Knowledge を教え、確認する方法になりました（セクション 03）。あの議論に勝つには、エンジニアリングの約 1 四半期分の時間が必要だったはずです。さらに、エンジニアリングには feature flag を使って出荷する予定がなく、変更はすべてのユーザーに一度に届きます。v1、次に v2、そして作り直した v1。切り替わるたびに、ページを覚え直すことになります。<span class="stat-hi-blue">出荷済みのものの上に積み上げるコストはほぼゼロで、ユーザーが慣れ直すのも一度で済みました。</span>',
      's04.m3.close': 'どれも新しいコンポーネントを必要とせず、ページの新しい見た目のためにリデザインのプロジェクトを立てる必要もありませんでした。見た目は ticket と一緒に、セクション 05 のデザインシステムから届きました。要点はここです。この制約のもとで最もレバレッジの高いデザインの仕事は、インターフェースが何をやめるかを決めることでした。',
      's05.title': '判断 3：ticket 1 枚ずつ UI を刷新する',
      's05.lede': 'code-first の速さには代償がありました。新しい画面は毎回ゼロから生成されるため、コンポーネントも状態もトーンも、prompt のたびにずれていきます。刷新プロジェクトがスケジュールに載ることはないと分かったので、それを求めるのをやめ、エンジニアリングの作り方そのものに合わせて設計しました。',
      's05.move.body': 'デザインシステムを、AI コーディングツールが従えるルールとして書き直しました。生成される UI は、白紙からではなく同じ判断から始まります。そのうえで、展開をエンジニアリングがすでに進めている作業に結びつけました。',
      's05.ticket.label': 'リデザインのための ticket は 1 枚もない。すべての ticket が、その一部を運んだ。',
      's05.ticket.body': 'ルールは単純です。ticket がある画面に触れたら、その画面は同じ作業の中で新しいシステムに移る。優先順位を争う別枠の刷新もなければ、デザインを待つための凍結もありません。リデザインは、エンジニアリングがすでに持っているロードマップに乗って進みます。セクション 04 の Knowledge ページもこの方法で出荷されました。修正が ticket そのもので、新しい見た目はそれと一緒に届きました。',
      's05.ticket.body2': 'このケーススタディに 2 つの時代の UI が混ざっているのも、そのためです。セクション 03 のチャットの録画は、新しいシステムがチャットに届く前のもの。セクション 04 の Knowledge ページは、すでに新しいシステムの上にあります。<span class="stat-hi-blue">プロダクトは 1 画面ずつ変わっていき、スクリーンショットにそれが写っています。</span>',
      's05.close': '役割が本当に変わったと言えるのは、この部分です。<span class="stat-hi-blue">インターフェースが prompt で書かれるとき、デザイナーのレバレッジは、画面を描くことから、すべての画面が従うルールを定めることへ移ります。</span>',
      's06.title': '変わったこと、そしてまだ測っていること',
      's06.lede': '設計したのはあのループなので、測るのもあのループです。自力で始めるチームがどれだけいるか、そして POC で整えるのにどれだけかかるか。',
      's06.out2.label': '自力で AI に教えるトライアルチームが増えた',
      's06.out2.body': 'トライアル開始から 1 週間以内に Knowledge を作ったチームの割合は、ローンチ前と比べて相対的に約 <span class="stat-hi">15%</span> 増えました。私たちの側は誰も関与していません。母数はまだ小さく、確定した結果ではなく初期のシグナルですが、私が最も注視している数字です。',
      's06.out3.label': 'POC：まだ数字ではなく、営業からのシグナル',
      's06.out3.body': '以前は、Knowledge だけで POC 1 件あたり<span class="stat-hi">2〜3 週間</span>、営業を介したやり取りが必要でした。きれいな after の数字はまだありません。手元にあるのは営業チームからの声です。事前に Knowledge を作り込んでデモする必要がなくなり、プロダクトを渡して顧客自身に触ってもらえるようになった、と。',
      's06.carry.label': '会話から始める形は、Knowledge の外へ広がった',
      's06.carry.body': 'Knowledge はチャットに移した最初の機能であり、最も難しい機能でした。教えることが会話として成立すると、残りも続きました。レポート、分析、ドキュメント解析が同じ入力ボックスから呼び出す Skill になり、専用のボタンを必要とする機能はなくなりました。1 か月のうちに、旧来の入口の利用は月に数百回から<span class="stat-hi">一桁</span>に減り、元に戻してほしいという声はなく、初期のフィードバックは高評価と低評価がおよそ <span class="stat-hi">4:1</span> でした。',
      's05.jC.body': '<p class="body">Skill の作成と管理は、いまも実在する画面です。ここでアップロードし、チャットで試します。</p>',
      's05.jC.userJourney': 'ユーザージャーニー',
      's05.jC.jUpload': 'Skill をアップロード',
      's05.jC.jTry': '試してみる',
      's05.jC.play': '再生',
      's05.replay': 'リプレイ',
      's06.hard.label': 'すべてが会話ボックスの裏にあると、機能は見つけにくくなる',
      's06.hard.body': 'すべての機能が同じ入力欄の裏にあると、何ひとつ自ら名乗り出てきません。十数個のボタンは辿りにくいものでしたが、少なくともこの製品に何ができるかは伝えていました。そこで、発見の導線もメニューに戻すのではなく、入力欄の中へ移しました。',
      's06.onb.cap.t': '機能の紹介も会話の中へ',
      's06.onb.cap.d': '初回のスレッドは、agent が自分にできることを提示するところから始まります。各カードはプレビューに展開でき、「Try it out」は設定ページを開くのではなく、チャットの中でそのままフローを始めます。',
      's06.open': '未解決のまま残っているのはスケールです。厳選した数枚のカードは初日の「what can I ask?」には答えられますが、Skill のアーキテクチャは増え続ける前提で作られており、固定のウェルカム画面では追いつけません。発見可能性を最新に保つこと。それがここでの本当の負債であり、私が次に取り組む問題です。',
      's06.reflect': 'これほど速く動く小さなチームでは、デザイナーが最初からやり直せる機会はほとんどありません。私にできたのは、デザインがまだ結果を変えられる数少ない場所を選び、それ以外のすべての場所で体験の一線を守ることでした。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.訊號',
      'nav.s02': '02.限制',
      'nav.s03': '03.對話',
      'nav.s04': '04.修正',
      'nav.s05': '05.系統',
      'nav.s06': '06.成果',
      'title.big': '不靠全面改版，讓 Wren AI 最強的付費訊號長起來',
      'title.sub': 'B2B AI 必須先學會一間公司的商務邏輯，但很少用戶知道該怎麼把這些規則告訴它。這是我們在 Wren AI、不打掉重來的前提下解決這件事的過程。',
      'intro.overview.label': '我們要解決的問題',
      'intro.overview.body': 'Wren AI 是一套對話式 BI 工具：用白話就能向資料提問。但要答得好，它得先學會這間公司怎麼運作：指標、定義、規則。產品裡把這件事叫做 Knowledge。有建立 Knowledge 的團隊，付費的機率大約高出 7 倍，卻很少有人做完；每一次 POC，最後都是我們自己的團隊替客戶手動建。我接手的時候，介面已經被工程以 code-first 的方式重寫，也沒有預算做改版。於是改版變成跟著一張一張工程 ticket 發生。這篇案例談的是：我怎麼決定設計還能在哪裡推動數字，以及過程中我不肯放掉的東西。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">唯一的產品設計師</span>，同時兼任<span class="stat-hi">產品負責人</span>與<span class="stat-hi">使用者研究員</span>。負責 Langfuse 與 PostHog 的數據分析，在固定的工程預算下決定設計的力氣要花在哪裡，完成 Agent UX 的端到端設計，建立工程現在據以開發的<span class="stat-hi">prompt-based 設計系統</span>，並設計上線後的驗證框架。',
      'intro.time.label': '公司與時程',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': 'Knowledge 帶動付費，但多數團隊從沒建完',
      's01.lede': 'Wren AI 要答得好，得先有人告訴它業務到底怎麼運作：指標、定義、規則。在顧客能做的所有事情裡，把這些規則告訴它是最有價值的一件，卻也是最少被做完的一件。這個落差，最後落到我們身上。',
      's01.f1.label': '建立 Knowledge，是團隊會不會付費最強的訊號之一',
      's01.f1.body': '有建立 Knowledge 的用戶付費率是 <span class="stat-hi">0.7%</span>，沒有建立的則是 <span class="stat-hi">0.1%</span>，大約<span class="stat-hi">高出 7 倍</span>。在所有我們量得到的行為裡，它是顧客能做的最有價值的事情之一。',
      's01.f2.label': 'Knowledge 是產品裡最少被做完的功能之一',
      's01.f2.body': '只有大約 <span class="stat-hi">10%</span> 的團隊建立過任何一條，而且整年一路下滑。要用到它，得先走完一個一次只能填一條規則的手動設定頁，很多團隊做到一半就放棄了。',
      's01.f3.label': '每次 POC，都由我們替客戶手動建立 Knowledge',
      's01.f3.body': '因為客戶很少自己做完，POC 就回到我們身上。業務得介入，向每個客戶收集他們的定義，再由我們寫進產品；每一次修正，都要沿著同一條路再走一遍。光是 Knowledge，一次 POC 就要來回<span class="stat-hi">兩到三週</span>，這樣的做法撐不了幾個案子。',
      's02.title': '沒有重做的空間，於是從最多人用的對話框下手',
      's02.lede': '當時，幾乎每個新創團隊都在嘗試用 Claude 加快開發和設計，我們也不例外。在我們充分了解問題之前，CTO 就直接做出了第一個改版，用 code-first 的方式把整個介面重寫了一遍，重新設計的空間所剩無幾。但我們仍然先做了初步研究，想回答一個問題：<span class="stat-hi-blue">不重新設計的話，還能怎麼補救、優化這個功能？</span>我拉了 90 天的產品數據，也看了用戶的操作錄影。',
      's02.f1.label': '91% 的互動都發生在對話框裡',
      's02.f1.body': '產品擁有十幾個功能入口，但在近 18,500 次的互動中，所有入口的使用率合計不到<span class="stat-hi">一成</span>，其餘全數發生在對話框裡。',
      's02.f2.label': '72% 的用戶從未碰過任何功能入口',
      's02.f2.body': '在 582 位活躍用戶中，多數人從頭到尾只待在對話框裡；即便是最熱門的功能入口，也只有 <span class="stat-hi">14%</span> 的人用過。',
      's02.f3.label': '65% 的用戶錄影裡，都在選單之間來回找功能',
      's02.f3.body': '在 20 段真實的操作錄影裡，用戶找功能很少一次到位，常見的路徑是「點進去、退出來、再換一個選單試試」。',
      's02.close': 'Knowledge 頁面只是這十幾個入口之一，幾乎沒人會打開；但幾乎每個人都在用對話框。所以我們決定從最多人使用的對話框下手。',
      's02.trade.label': '放棄的範圍與堅持的底線',
      's02.trade.lede': '每個決定都是交換，而我只守一條原則：可以放棄範圍，但不放棄為體驗負責。所以我放掉了全面改版，介面大致維持工程做出來的樣子；也放掉了一次到位的視覺翻新，新風格改成跟著 ticket 上線，碰到哪裡就換到哪裡；頁面也不再當入口，建立 Knowledge 改從對話開始，頁面只負責審核與修正。但有三件事我不讓步：團隊要能把 Knowledge 建完，因為這是跟營收綁在一起的數字；壞掉的互動不能上線，再快也得能用；寫進去的 Knowledge 必須可審核，沒有任何東西能悄悄進入團隊共用的定義。',
      's02.loop.label': '從對話框下手，但不只靠對話框',
      's02.loop.body': '每一條 Knowledge 規則都走同一段生命週期，全程都落在同一個 markdown 檔案上：有人發現答案錯了，說明正確的定義；agent 起草，對方確認；之後由負責這個定義的人審核或修正；從此 agent 會把它套用到每個答案上。當業務改變、答案開始走樣，循環就再跑一次。這個循環裡有兩個最貴的地方：<b>開始</b>，以及<b>保持正確</b>。',
      's02.loop.t1': '觸發',
      's02.loop.s1': '答案出錯了',
      's02.loop.t2': '決策 1 · 對話',
      's02.loop.s2': '在對話裡說明正確的定義',
      's02.loop.t3': '決策 1 · 對話',
      's02.loop.s3': 'Agent 起草 .md 檔，你確認後發佈',
      's02.loop.t4': '決策 2 · 頁面',
      's02.loop.s4': '負責人用表單或 markdown 審核、修正',
      's02.loop.t5': '回報',
      's02.loop.s5': 'Agent 把這條規則套用到之後的每個答案',
      's02.loop.close': '「開始」是廣度的問題：參與的人越多，AI 懂的業務就越多，所以它屬於對話，開放給所有人。「保持正確」是準確度的問題：沒人修得了的規則，最後會變成沒人相信的規則，所以它屬於頁面，交給少數負責定義的人。',
      's03.title': '決策 1：在問題發生的地方建立 Knowledge',
      's03.lede': '用戶本來就待在對話框裡，所以建立 Knowledge 也該從對話框開始。',
      's03.why.body': '就算按鈕就在旁邊，用戶還是用打字下指令（「Make a report for me」）。試用者直接在輸入框打 <span class="stat-hi-blue">「what can I ask?」</span>。重度用戶會把資料庫欄位名稱直接寫進句子裡，精準度大約是新用戶的 <span class="stat-hi">12 倍</span>；而這些精準的請求失敗時，有 <span class="stat-hi">95.9%</span> 是因為舊架構接不住。對話框是每個人唯一記得的入口，所以建立 Knowledge 也必須從那裡開始。',
      's03.before.label': '之前 · 一個得填完的頁面',
      's03.before.body': '業務邏輯得在專屬頁面上一條一條填，和「需要它的當下」是脫節的。你得先中斷提問去設定，再回來。多數團隊從沒填完，AI 也就一直只懂一半的業務。',
      's03.after.label': '之後 · 一段對話，而不是一張表單',
      's03.after.body': '現在你直接在對話裡說明規則，就像跟同事交代事情：「活躍顧客的定義，是至少有一筆未取消的訂單。」agent 用選擇題跟你確認，把規則起草成 markdown 檔案，儲存之前會先問你。一旦發佈，整個團隊繼承的就是同一個定義。',
      's03.demoA.cap.t': '收斂，而不是猜',
      's03.demoA.cap.d': 'agent 把模糊的請求變成選擇題，讓「active customer」落在用戶親自選的那個定義上，而不是模型自行假設的版本。',
      's03.demoB.cap.t': '先確認，才儲存',
      's03.demoB.cap.d': 'agent 起草規則、給出摘要，只有按下「Publish to project knowledge」才會寫回。',
      's03.applied.cap.t': '循環收合',
      's03.applied.cap.d': '在之後的另一段對話裡，agent 會先講出它套用的規則：<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。一個人說明過一次，之後每個人拿到的都是同一個答案。',
      's03.survey.body': '<b>為什麼是問卷，而不是空白輸入框。</b>多數人沒辦法從零寫出一個定義，但他們選得出來。所以 agent 像一份簡短的問卷那樣問：選擇題、一次只決定一件事，答案就成為規則。這跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法是同一招：用一份簡短的類型問卷，取代一次把所有欄位攤開的設定表單。設定時間從 45 分鐘降到 28 分鐘，業務也不必再帶著每個客戶走一遍，而這正是 Wren 的 POC 同樣有的依賴。',
      's03.rej.body': '<b>我否決的設計：</b>讓 agent 把它推斷出來的東西直接存下來，不問。那是摩擦最小的版本，但 Knowledge 是共享的基礎設施，一句聽錯的話，就會悄悄污染每個隊友的答案。明確的發佈步驟，是用一次點擊換來可稽核性。',
      's03.split': '對話讓「開始」變得便宜，而且對所有人都是。但它寫出來的是一個檔案，而檔案需要有人負責：審核團隊寫進了什麼、在業務改變時修正它，並且在 POC 期間替客戶把它建好。<span class="stat-hi-blue">這些工作不該發生在對話裡。</span>',
      's04.title': '決策 2：讓這個檔案容易修正',
      's04.lede': '對話負責寫出檔案，頁面則是它被修正的地方，使用的人是負責定義的人，以及 POC 期間我們自己的團隊。這裡有兩個做法，範圍都限定在「答案出錯 → 規則存好」這條路徑上，而且都用現有的零件完成。',
      's04.m2.label': '01 · 保留表單，修正它問的東西',
      's04.m2.body': '在我的版本之前，Knowledge 頁面已經有過三個版本。最初是一張表格，只有 Question-SQL pairs 和 Instructions 兩種，一次新增一列。code-first 的重寫把它變成一棵 markdown 檔案樹，分成四個資料夾（glossary、metrics、rules、sql）；agent 能用的東西變多了，但人拿到的是一個空白檔案。我們提出要有結構，於是上面加了表單：先選 <b>Metrics</b>、<b>Glossary</b>、<b>SQL pairs</b> 或 <b>Instructions</b>，再填 agent 需要的欄位。這個結構夠穩，可以在上面繼續做，所以我保留了它。它出問題的地方，偏偏是最關鍵的那一刻。',
      's04.v1.cap.t': 'v1 · 一張表格',
      's04.v1.cap.d': '只有 Question-SQL pairs 和 Instructions 兩種，一次新增一列。',
      's04.v2.cap.t': 'v2 · 一棵檔案樹',
      's04.v2.cap.d': 'code-first 的重寫：四個資料夾的 markdown 檔案，agent 能用的更多了，人卻只拿到一個空白檔案。',
      's04.m2.body2': 'Knowledge 是在答案出錯時被寫下來的，也是在答案出錯時被修正的。表單版在這個循環的兩端都失敗了。它的類型選擇，是用「你已經有什麼」來描述每一種（「當你已經有一個大家同意的關鍵指標公式時使用」），但人是帶著問題來的，不是帶著解法來的。而且表單只在建立時出現：打開一個既有的檔案要修正，按下「Edit」就掉進原始的 markdown 和 YAML。<span class="stat-hi-blue">結構偏偏在有人回來修規則的那一刻消失了。</span>',
      's04.m2.body3': '我把修正的範圍限定在這條路徑上，也就是從答案出錯到規則存好，因為它是跟付費綁在一起的那一條；而且我只用現有的零件來做。類型選擇現在講的是問題（「當一個數字沒有大家同意的算法時使用」），說明 agent 會怎麼使用每一組，也講出空白檔案的代價：agent 還是會讀它，但沒有任何東西告訴它這個檔案是做什麼的。這是文案的修改。「Edit in form」沿用建立時的表單，所以每個檔案都能用結構或 markdown 兩種方式編輯。這是我們本來就有的元件。<span class="stat-hi">在最貼近營收的那一步上，工程成本趨近於零。</span>',
      's04.v3.cap.t': 'v3 · 加上表單',
      's04.v3.cap.d': '每一種類型用「你已經有什麼」來描述：「You have an agreed formula for a key business metric.」',
      's04.v4.cap.t': 'v4 · 我的版本',
      's04.v4.cap.d': '每一種類型用它解決的問題來描述，每一組都說明 agent 怎麼使用，空白檔案也講出它的代價。',
      's04.v4form.cap.t': '表單與檔案並排',
      's04.v4form.cap.d': '每個檔案都能用表單打開，只有 agent 需要的欄位，旁邊就是它寫出來的 markdown。',
      's04.m3.label': '02 · 砍掉跟核心任務搶注意力的東西',
      's04.m3.body': '工程預算固定的時候，拿掉比重新設計便宜。我用同一個問題檢查頁面上的每個元素：它有沒有幫助人從「答案出錯」走到「規則存好」？沒有，就拿掉。',
      's04.m3.i1.label': '「Ask agent」離開了 Knowledge 頁面',
      's04.m3.i1.body': '它原本放在新增檔案的選單裡，會把人送到 Home，離開正在處理的檔案。用對話建立 Knowledge 這件事已經有了（第 03 節），所以頁面只需要最直接的那條路：新增檔案的按鈕現在直接打開類型選擇。',
      's04.m3.i2.label': '每個檔案只有一種檢視，而不是兩種',
      's04.m3.i2.body': '側欄的「Summary for the AI」重複了檔案自己的 frontmatter，而「Edit」和「Source」通往同一個原始畫面。側欄拿掉了，frontmatter 只在內文出現一次，兩條路也變成兩個清楚的動作：Edit in form、Edit markdown。',
      's04.m3.i3.label': '你正在編輯的是哪個專案，隨時看得見',
      's04.m3.i3.body': 'Knowledge 是屬於專案的，所以你正在編輯的是哪個專案，必須一眼就看得出來。切換器原本放在導覽列中間、緊鄰 beta 標籤，畫面一窄，導覽就會跟它擠在一起。它移到 logo 旁邊成為麵包屑，標籤也拿掉了。',
      's04.m3.before.cap.t': '之前',
      's04.m3.before.cap.d': '重複 frontmatter 的側欄、Rendered/Source 切換，以及一顆通往同一個原始畫面的 Edit 按鈕。',
      's04.m3.after.cap.t': '之後',
      's04.m3.after.cap.d': '單欄、frontmatter 放進內文，兩個動作各自說明自己在做什麼：Edit in form、Edit markdown。',
      's04.m3.defer': '<b>我選擇不去打的那一仗。</b>v2 以 code-first 的方式做出來之後，架構基本上就定了。我原本的研究計畫是建立在 v1 上的：保留表格、加上篩選與搜尋，並用 Skill 強化 Knowledge 的編輯與審查。照它走，等於要工程把已經能用的程式碼丟掉。所以我把計畫拆開。表格放掉了；檔案樹留下來，上面每一個修正都是順著工程已經上線的結構做的，而不是跟它對抗。Skill 那一半活了下來，成為在對話裡建立、確認 Knowledge 的方式（第 03 節）。要打贏那場爭論，大概要花掉一整季的工程時間。更糟的是，工程並不打算用 feature flag 上線，所以每一次改動都會同時落到所有用戶身上：先是 v1，再來 v2，然後又是重做的 v1，每換一次就得重新學一次。<span class="stat-hi-blue">順著已上線的東西往上蓋，幾乎不花成本，而且用戶只需要適應一次。</span>',
      's04.m3.close': '這些都不需要新的元件，頁面的新樣貌也不需要另外開一個改版專案。它是跟著 ticket 一起來的，來自第 05 節的設計系統。重點就在這裡：在這個限制下，槓桿最高的設計工作，是決定介面不再做什麼。',
      's05.title': '決策 3：一張 ticket 一張 ticket 地翻新介面',
      's05.lede': 'code-first 的速度是有代價的。每個新畫面都從零生成，元件、狀態和語氣隨著每一次 prompt 越走越偏。改版專案永遠排不進去，所以我不再爭取，轉而為工程原本的開發方式做設計。',
      's05.move.body': '我把設計系統改寫成 AI coding 工具能遵守的規則，讓生成的介面從同一套決定出發，而不是從空白開始。接著，我把它的推行綁在工程本來就在做的工作上。',
      's05.ticket.label': '沒有任何一張 ticket 是「改版」。每一張 ticket 都帶著一小塊改版。',
      's05.ticket.body': '規則很簡單：哪張 ticket 碰到哪個畫面，那個畫面就在同一份工作裡換成新系統。不需要另外排改版的優先順序，也不必為了等設計而凍結開發。改版搭著工程原本的 roadmap 前進。第 04 節的 Knowledge 頁面就是這樣上線的：修正是 ticket 本身，新樣貌跟著一起上。',
      's05.ticket.body2': '這也是為什麼這篇案例裡會出現兩個年代的介面。第 03 節的對話錄影，是在新系統套用到對話之前錄的；第 04 節的 Knowledge 頁面則已經是新系統。<span class="stat-hi-blue">產品是一個畫面一個畫面在改變的，截圖把這件事照了出來。</span>',
      's05.close': '如果要我指出角色真正改變的地方，就是這裡。<span class="stat-hi-blue">當介面是由 prompt 寫出來的，設計師的槓桿就從畫畫面，轉移到制定每個畫面都要遵守的規則。</span>',
      's06.title': '改變了什麼，還在量什麼',
      's06.lede': '我設計的是那個循環，所以量的也是那個循環：有多少團隊自己開始，以及我們在 POC 裡把它建好要花多久。',
      's06.out2.label': '更多試用團隊自己開始建立 Knowledge',
      's06.out2.body': '試用團隊在第一週內建立 Knowledge 的比例，比上線前相對成長了約 <span class="stat-hi">15%</span>，過程中沒有我們的人介入。這是一個基數還小的早期訊號，不是定論，也是我盯得最緊的數字。',
      's06.out3.label': 'POC：來自業務的訊號，還不是一個數字',
      's06.out3.body': '以前，光是 Knowledge，每次 POC 就要透過業務來回<span class="stat-hi">兩到三週</span>。我還沒有乾淨的 after 數字，手上有的是業務團隊的回饋：他們不必再事先把 Knowledge 建好、照著示範，可以直接把產品交給客戶自己摸索。',
      's06.carry.label': '對話優先的做法，延伸到 Knowledge 以外的功能',
      's06.carry.body': 'Knowledge 是第一個被搬進對話的能力，也是最難的一個。當建立 Knowledge 可以用對話完成之後，其他能力也跟上了：報告、分析、文件解析都變成從同一個輸入框觸發的 Skill，沒有任何能力需要自己的按鈕。一個月內，舊入口的使用量從每月數百次掉到<span class="stat-hi">個位數</span>，沒有人要求改回去，早期回饋的讚與倒讚比例約為 <span class="stat-hi">4:1</span>。',
      's05.jC.body': '<p class="body">Skill 的製作與管理仍然是一個實際存在的介面：在這裡上傳，再到對話裡試用。</p>',
      's05.jC.userJourney': '用戶旅程',
      's05.jC.jUpload': '上傳 Skill',
      's05.jC.jTry': '實際試用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      's06.hard.label': '功能都收進對話框後，反而更難被發現',
      's06.hard.body': '每個能力都待在同一個輸入框後面，就沒有任何東西會自己現身。十幾顆按鈕確實難導覽，但它們至少告訴了你這個產品做得到什麼。所以「發現能力」這件事也搬進了輸入框，而不是把選單加回去。',
      's06.onb.cap.t': '功能介紹也搬進對話框',
      's06.onb.cap.d': '第一次使用時，agent 會先開一段對話，說明自己做得到什麼。每張卡片都能展開成預覽，而「Try it out」不是打開設定頁，而是直接在對話裡把流程跑起來。',
      's06.open': '還沒解決的是規模。幾張精選卡片能回答第一天的「what can I ask?」，但 Skill 架構本來就會持續成長，一份固定的歡迎清單追不上它。讓「可發現性」跟得上，才是這裡真正欠下的債，也是我接下來會處理的問題。',
      's06.reflect': '在一個跑得這麼快的小團隊裡，設計師很少有機會從頭來過。我能做的，是挑出少數幾個設計仍然能改變結果的地方，並且在其他每一處守住體驗的底線。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.信号',
      'nav.s02': '02.限制',
      'nav.s03': '03.对话',
      'nav.s04': '04.修正',
      'nav.s05': '05.系统',
      'nav.s06': '06.成果',
      'title.big': '不靠全面改版，让 Wren AI 最强的付费信号长起来',
      'title.sub': 'B2B AI 必须先学会一间公司的商务逻辑，但很少用户知道该怎么把这些规则告诉它。这是我们在 Wren AI、不推倒重来的前提下解决这件事的过程。',
      'intro.overview.label': '我们要解决的问题',
      'intro.overview.body': 'Wren AI 是一套对话式 BI 工具：用白话就能向数据提问。但要答得好，它得先学会这间公司怎么运作：指标、定义、规则。产品里把这件事叫做 Knowledge。有建立 Knowledge 的团队，付费的概率大约高出 7 倍，却很少有人做完；每一次 POC，最后都是我们自己的团队替客户手动建。我接手的时候，界面已经被工程以 code-first 的方式重写，也没有预算做改版。于是改版变成跟着一张一张工程 ticket 发生。这篇案例谈的是：我怎么决定设计还能在哪里推动数字，以及过程中我不肯放掉的东西。',
      'intro.role.label': '我的角色',
      'intro.role.body': '<span class="stat-hi">唯一的产品设计师</span>，同时兼任<span class="stat-hi">产品负责人</span>与<span class="stat-hi">用户研究员</span>。负责 Langfuse 与 PostHog 的数据分析，在固定的工程预算下决定设计的力气要花在哪里，完成 Agent UX 的端到端设计，建立工程现在据以开发的<span class="stat-hi">prompt-based 设计系统</span>，并设计上线后的验证框架。',
      'intro.time.label': '公司与时程',
      'intro.time.body': 'Wren AI · 2026',
      's01.title': 'Knowledge 带动付费，但多数团队从没建完',
      's01.lede': 'Wren AI 要答得好，得先有人告诉它业务到底怎么运作：指标、定义、规则。在顾客能做的所有事情里，把这些规则告诉它是最有价值的一件，却也是最少被做完的一件。这个落差，最后落到我们身上。',
      's01.f1.label': '建立 Knowledge，是团队会不会付费最强的信号之一',
      's01.f1.body': '有建立 Knowledge 的用户付费率是 <span class="stat-hi">0.7%</span>，没有建立的则是 <span class="stat-hi">0.1%</span>，大约<span class="stat-hi">高出 7 倍</span>。在所有我们量得到的行为里，它是顾客能做的最有价值的事情之一。',
      's01.f2.label': 'Knowledge 是产品里最少被做完的功能之一',
      's01.f2.body': '只有大约 <span class="stat-hi">10%</span> 的团队建立过任何一条，而且整年一路下滑。要用到它，得先走完一个一次只能填一条规则的手动设置页，很多团队做到一半就放弃了。',
      's01.f3.label': '每次 POC，都由我们替客户手动建立 Knowledge',
      's01.f3.body': '因为客户很少自己做完，POC 就回到我们身上。销售得介入，向每个客户收集他们的定义，再由我们写进产品；每一次修正，都要沿着同一条路再走一遍。光是 Knowledge，一次 POC 就要来回<span class="stat-hi">两到三周</span>，这样的做法撑不了几个案子。',
      's02.title': '没有重做的空间，于是从最多人用的对话框下手',
      's02.lede': '当时，几乎每个初创团队都在尝试用 Claude 加快开发和设计，我们也不例外。在我们充分了解问题之前，CTO 就直接做出了第一个改版，用 code-first 的方式把整个界面重写了一遍，重新设计的空间所剩无几。但我们仍然先做了初步研究，想回答一个问题：<span class="stat-hi-blue">不重新设计的话，还能怎么补救、优化这个功能？</span>我拉了 90 天的产品数据，也看了用户的操作录像。',
      's02.f1.label': '91% 的交互都发生在对话框里',
      's02.f1.body': '产品拥有十几个功能入口，但在近 18,500 次的交互中，所有入口的使用率合计不到<span class="stat-hi">一成</span>，其余全数发生在对话框里。',
      's02.f2.label': '72% 的用户从未碰过任何功能入口',
      's02.f2.body': '在 582 位活跃用户中，多数人从头到尾只待在对话框里；即便是最热门的功能入口，也只有 <span class="stat-hi">14%</span> 的人用过。',
      's02.f3.label': '65% 的用户录像里，都在菜单之间来回找功能',
      's02.f3.body': '在 20 段真实的操作录像里，用户找功能很少一次到位，常见的路径是「点进去、退出来、再换一个菜单试试」。',
      's02.close': 'Knowledge 页面只是这十几个入口之一，几乎没人会打开；但几乎每个人都在用对话框。所以我们决定从最多人使用的对话框下手。',
      's02.trade.label': '放弃的范围与坚持的底线',
      's02.trade.lede': '每个决定都是交换，而我只守一条原则：可以放弃范围，但不放弃为体验负责。所以我放掉了全面改版，界面大致维持工程做出来的样子；也放掉了一次到位的视觉翻新，新风格改成跟着 ticket 上线，碰到哪里就换到哪里；页面也不再当入口，建立 Knowledge 改从对话开始，页面只负责审核与修正。但有三件事我不让步：团队要能把 Knowledge 建完，因为这是跟营收绑在一起的数字；坏掉的交互不能上线，再快也得能用；写进去的 Knowledge 必须可审核，没有任何东西能悄悄进入团队共用的定义。',
      's02.loop.label': '从对话框下手，但不只靠对话框',
      's02.loop.body': '每一条 Knowledge 规则都走同一段生命周期，全程都落在同一个 markdown 文件上：有人发现答案错了，说明正确的定义；agent 起草，对方确认；之后由负责这个定义的人审核或修正；从此 agent 会把它套用到每个答案上。当业务改变、答案开始走样，循环就再跑一次。这个循环里有两个最贵的地方：<b>开始</b>，以及<b>保持正确</b>。',
      's02.loop.t1': '触发',
      's02.loop.s1': '答案出错了',
      's02.loop.t2': '决策 1 · 对话',
      's02.loop.s2': '在对话里说明正确的定义',
      's02.loop.t3': '决策 1 · 对话',
      's02.loop.s3': 'Agent 起草 .md 文件，你确认后发布',
      's02.loop.t4': '决策 2 · 页面',
      's02.loop.s4': '负责人用表单或 markdown 审核、修正',
      's02.loop.t5': '回报',
      's02.loop.s5': 'Agent 把这条规则套用到之后的每个答案',
      's02.loop.close': '「开始」是广度的问题：参与的人越多，AI 懂的业务就越多，所以它属于对话，开放给所有人。「保持正确」是准确度的问题：没人修得了的规则，最后会变成没人相信的规则，所以它属于页面，交给少数负责定义的人。',
      's03.title': '决策 1：在问题发生的地方建立 Knowledge',
      's03.lede': '用户本来就待在对话框里，所以建立 Knowledge 也该从对话框开始。',
      's03.why.body': '就算按钮就在旁边，用户还是用打字下指令（「Make a report for me」）。试用者直接在输入框打 <span class="stat-hi-blue">「what can I ask?」</span>。重度用户会把数据库字段名称直接写进句子里，精准度大约是新用户的 <span class="stat-hi">12 倍</span>；而这些精准的请求失败时，有 <span class="stat-hi">95.9%</span> 是因为旧架构接不住。对话框是每个人唯一记得的入口，所以建立 Knowledge 也必须从那里开始。',
      's03.before.label': '之前 · 一个得填完的页面',
      's03.before.body': '业务逻辑得在专属页面上一条一条填，和「需要它的当下」是脱节的。你得先中断提问去设置，再回来。多数团队从没填完，AI 也就一直只懂一半的业务。',
      's03.after.label': '之后 · 一段对话，而不是一张表单',
      's03.after.body': '现在你直接在对话里说明规则，就像跟同事交代事情：「活跃顾客的定义，是至少有一笔未取消的订单。」agent 用选择题跟你确认，把规则起草成 markdown 文件，保存之前会先问你。一旦发布，整个团队继承的就是同一个定义。',
      's03.demoA.cap.t': '收敛，而不是猜',
      's03.demoA.cap.d': 'agent 把模糊的请求变成选择题，让「active customer」落在用户亲自选的那个定义上，而不是模型自行假设的版本。',
      's03.demoB.cap.t': '先确认，才保存',
      's03.demoB.cap.d': 'agent 起草规则、给出摘要，只有按下「Publish to project knowledge」才会写回。',
      's03.applied.cap.t': '循环收合',
      's03.applied.cap.d': '在之后的另一段对话里，agent 会先讲出它套用的规则：<i>using saved definition: active customer = a customer with at least one order where order_status &lt;&gt; \'canceled\'</i>。一个人说明过一次，之后每个人拿到的都是同一个答案。',
      's03.survey.body': '<b>为什么是问卷，而不是空白输入框。</b>多数人没办法从零写出一个定义，但他们选得出来。所以 agent 像一份简短的问卷那样问：选择题、一次只决定一件事，答案就成为规则。这跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法是同一招：用一份简短的类型问卷，取代一次把所有字段摊开的设置表单。设置时间从 45 分钟降到 28 分钟，销售也不必再带着每个客户走一遍，而这正是 Wren 的 POC 同样有的依赖。',
      's03.rej.body': '<b>我否决的设计：</b>让 agent 把它推断出来的东西直接存下来，不问。那是摩擦最小的版本，但 Knowledge 是共享的基础设施，一句听错的话，就会悄悄污染每个队友的答案。明确的发布步骤，是用一次点击换来可审计性。',
      's03.split': '对话让「开始」变得便宜，而且对所有人都是。但它写出来的是一个文件，而文件需要有人负责：审核团队写进了什么、在业务改变时修正它，并且在 POC 期间替客户把它建好。<span class="stat-hi-blue">这些工作不该发生在对话里。</span>',
      's04.title': '决策 2：让这个文件容易修正',
      's04.lede': '对话负责写出文件，页面则是它被修正的地方，使用的人是负责定义的人，以及 POC 期间我们自己的团队。这里有两个做法，范围都限定在「答案出错 → 规则存好」这条路径上，而且都用现有的零件完成。',
      's04.m2.label': '01 · 保留表单，修正它问的东西',
      's04.m2.body': '在我的版本之前，Knowledge 页面已经有过三个版本。最初是一张表格，只有 Question-SQL pairs 和 Instructions 两种，一次添加一行。code-first 的重写把它变成一棵 markdown 文件树，分成四个文件夹（glossary、metrics、rules、sql）；agent 能用的东西变多了，但人拿到的是一个空白文件。我们提出要有结构，于是上面加了表单：先选 <b>Metrics</b>、<b>Glossary</b>、<b>SQL pairs</b> 或 <b>Instructions</b>，再填 agent 需要的字段。这个结构够稳，可以在上面继续做，所以我保留了它。它出问题的地方，偏偏是最关键的那一刻。',
      's04.v1.cap.t': 'v1 · 一张表格',
      's04.v1.cap.d': '只有 Question-SQL pairs 和 Instructions 两种，一次添加一行。',
      's04.v2.cap.t': 'v2 · 一棵文件树',
      's04.v2.cap.d': 'code-first 的重写：四个文件夹的 markdown 文件，agent 能用的更多了，人却只拿到一个空白文件。',
      's04.m2.body2': 'Knowledge 是在答案出错时被写下来的，也是在答案出错时被修正的。表单版在这个循环的两端都失败了。它的类型选择，是用「你已经有什么」来描述每一种（「当你已经有一个大家同意的关键指标公式时使用」），但人是带着问题来的，不是带着解法来的。而且表单只在建立时出现：打开一个既有的文件要修正，按下「Edit」就掉进原始的 markdown 和 YAML。<span class="stat-hi-blue">结构偏偏在有人回来修规则的那一刻消失了。</span>',
      's04.m2.body3': '我把修正的范围限定在这条路径上，也就是从答案出错到规则存好，因为它是跟付费绑在一起的那一条；而且我只用现有的零件来做。类型选择现在讲的是问题（「当一个数字没有大家同意的算法时使用」），说明 agent 会怎么使用每一组，也讲出空白文件的代价：agent 还是会读它，但没有任何东西告诉它这个文件是做什么的。这是文案的修改。「Edit in form」沿用建立时的表单，所以每个文件都能用结构或 markdown 两种方式编辑。这是我们本来就有的组件。<span class="stat-hi">在最贴近营收的那一步上，工程成本趋近于零。</span>',
      's04.v3.cap.t': 'v3 · 加上表单',
      's04.v3.cap.d': '每一种类型用「你已经有什么」来描述：「You have an agreed formula for a key business metric.」',
      's04.v4.cap.t': 'v4 · 我的版本',
      's04.v4.cap.d': '每一种类型用它解决的问题来描述，每一组都说明 agent 怎么使用，空白文件也讲出它的代价。',
      's04.v4form.cap.t': '表单与文件并排',
      's04.v4form.cap.d': '每个文件都能用表单打开，只有 agent 需要的字段，旁边就是它写出来的 markdown。',
      's04.m3.label': '02 · 砍掉跟核心任务抢注意力的东西',
      's04.m3.body': '工程预算固定的时候，拿掉比重新设计便宜。我用同一个问题检查页面上的每个元素：它有没有帮助人从「答案出错」走到「规则存好」？没有，就拿掉。',
      's04.m3.i1.label': '「Ask agent」离开了 Knowledge 页面',
      's04.m3.i1.body': '它原本放在添加文件的菜单里，会把人送到 Home，离开正在处理的文件。用对话建立 Knowledge 这件事已经有了（第 03 节），所以页面只需要最直接的那条路：添加文件的按钮现在直接打开类型选择。',
      's04.m3.i2.label': '每个文件只有一种视图，而不是两种',
      's04.m3.i2.body': '侧栏的「Summary for the AI」重复了文件自己的 frontmatter，而「Edit」和「Source」通往同一个原始画面。侧栏拿掉了，frontmatter 只在内文出现一次，两条路也变成两个清楚的动作：Edit in form、Edit markdown。',
      's04.m3.i3.label': '你正在编辑的是哪个项目，随时看得见',
      's04.m3.i3.body': 'Knowledge 是属于项目的，所以你正在编辑的是哪个项目，必须一眼就看得出来。切换器原本放在导航栏中间、紧邻 beta 标签，画面一窄，导航就会跟它挤在一起。它移到 logo 旁边成为面包屑，标签也拿掉了。',
      's04.m3.before.cap.t': '之前',
      's04.m3.before.cap.d': '重复 frontmatter 的侧栏、Rendered/Source 切换，以及一个通往同一个原始画面的 Edit 按钮。',
      's04.m3.after.cap.t': '之后',
      's04.m3.after.cap.d': '单栏、frontmatter 放进内文，两个动作各自说明自己在做什么：Edit in form、Edit markdown。',
      's04.m3.defer': '<b>我选择不去打的那一仗。</b>v2 以 code-first 的方式做出来之后，架构基本上就定了。我原本的研究计划是建立在 v1 上的：保留表格、加上筛选与搜索，并用 Skill 强化 Knowledge 的编辑与审查。照它走，等于要工程把已经能用的代码丢掉。所以我把计划拆开。表格放掉了；文件树留下来，上面每一个修正都是顺着工程已经上线的结构做的，而不是跟它对抗。Skill 那一半活了下来，成为在对话里建立、确认 Knowledge 的方式（第 03 节）。要打赢那场争论，大概要花掉一整季的工程时间。更糟的是，工程并不打算用 feature flag 上线，所以每一次改动都会同时落到所有用户身上：先是 v1，再来 v2，然后又是重做的 v1，每换一次就得重新学一次。<span class="stat-hi-blue">顺着已上线的东西往上盖，几乎不花成本，而且用户只需要适应一次。</span>',
      's04.m3.close': '这些都不需要新的组件，页面的新样貌也不需要另外开一个改版项目。它是跟着 ticket 一起来的，来自第 05 节的设计系统。重点就在这里：在这个限制下，杠杆最高的设计工作，是决定界面不再做什么。',
      's05.title': '决策 3：一张 ticket 一张 ticket 地翻新界面',
      's05.lede': 'code-first 的速度是有代价的。每个新画面都从零生成，组件、状态和语气随着每一次 prompt 越走越偏。改版项目永远排不进去，所以我不再争取，转而为工程原本的开发方式做设计。',
      's05.move.body': '我把设计系统改写成 AI coding 工具能遵守的规则，让生成的界面从同一套决定出发，而不是从空白开始。接着，我把它的推行绑在工程本来就在做的工作上。',
      's05.ticket.label': '没有任何一张 ticket 是「改版」。每一张 ticket 都带着一小块改版。',
      's05.ticket.body': '规则很简单：哪张 ticket 碰到哪个画面，那个画面就在同一份工作里换成新系统。不需要另外排改版的优先级，也不必为了等设计而冻结开发。改版搭着工程原本的 roadmap 前进。第 04 节的 Knowledge 页面就是这样上线的：修正是 ticket 本身，新样貌跟着一起上。',
      's05.ticket.body2': '这也是为什么这篇案例里会出现两个年代的界面。第 03 节的对话录屏，是在新系统套用到对话之前录的；第 04 节的 Knowledge 页面则已经是新系统。<span class="stat-hi-blue">产品是一个画面一个画面在改变的，截屏把这件事照了出来。</span>',
      's05.close': '如果要我指出角色真正改变的地方，就是这里。<span class="stat-hi-blue">当界面是由 prompt 写出来的，设计师的杠杆就从画画面，转移到制定每个画面都要遵守的规则。</span>',
      's06.title': '改变了什么，还在量什么',
      's06.lede': '我设计的是那个循环，所以量的也是那个循环：有多少团队自己开始，以及我们在 POC 里把它建好要花多久。',
      's06.out2.label': '更多试用团队自己开始建立 Knowledge',
      's06.out2.body': '试用团队在第一周内建立 Knowledge 的比例，比上线前相对增长了约 <span class="stat-hi">15%</span>，过程中没有我们的人介入。这是一个基数还小的早期信号，不是定论，也是我盯得最紧的数字。',
      's06.out3.label': 'POC：来自销售的信号，还不是一个数字',
      's06.out3.body': '以前，光是 Knowledge，每次 POC 就要通过销售来回<span class="stat-hi">两到三周</span>。我还没有干净的 after 数字，手上有的是销售团队的反馈：他们不必再事先把 Knowledge 建好、照着示范，可以直接把产品交给客户自己摸索。',
      's06.carry.label': '对话优先的做法，延伸到 Knowledge 以外的功能',
      's06.carry.body': 'Knowledge 是第一个被搬进对话的能力，也是最难的一个。当建立 Knowledge 可以用对话完成之后，其他能力也跟上了：报告、分析、文档解析都变成从同一个输入框触发的 Skill，没有任何能力需要自己的按钮。一个月内，旧入口的使用量从每月数百次掉到<span class="stat-hi">个位数</span>，没有人要求改回去，早期反馈的赞与踩比例约为 <span class="stat-hi">4:1</span>。',
      's05.jC.body': '<p class="body">Skill 的制作与管理仍然是一个实际存在的界面：在这里上传，再到对话里试用。</p>',
      's05.jC.userJourney': '用户旅程',
      's05.jC.jUpload': '上传 Skill',
      's05.jC.jTry': '实际试用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      's06.hard.label': '功能都收进对话框后，反而更难被发现',
      's06.hard.body': '每个能力都待在同一个输入框后面，就没有任何东西会自己现身。十几个按钮确实难导航，但它们至少告诉了你这个产品做得到什么。所以「发现能力」这件事也搬进了输入框，而不是把菜单加回去。',
      's06.onb.cap.t': '功能介绍也搬进对话框',
      's06.onb.cap.d': '第一次使用时，agent 会先开一段对话，说明自己做得到什么。每张卡片都能展开成预览，而「Try it out」不是打开设置页，而是直接在对话里把流程跑起来。',
      's06.open': '还没解决的是规模。几张精选卡片能回答第一天的「what can I ask?」，但 Skill 架构本来就会持续成长，一份固定的欢迎清单追不上它。让「可发现性」跟得上，才是这里真正欠下的债，也是我接下来会处理的问题。',
      's06.reflect': '在一个跑得这么快的小团队里，设计师很少有机会从头来过。我能做的，是挑出少数几个设计仍然能改变结果的地方，并且在其他每一处守住体验的底线。',
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
