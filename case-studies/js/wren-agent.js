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
      'intro.overview.body': 'Wren AI は会話型の BI ツールで、データに自然な言葉で質問できます。ただし、うまく答えるには、まずそのビジネスの仕組み、つまり指標・定義・ルールを学ぶ必要があります。プロダクトではこれを Knowledge と呼びます。Knowledge を作ったチームは課金する確率が約 7 倍高いのに、最後まで作り切るチームはほとんどなく、POC のたびに私たちのチームが顧客の代わりに手作業で作っていました。',
      'intro.role.label': '私の役割',
      'intro.role.body': '私はチームで<span class="stat-hi">唯一のプロダクトデザイナー</span>で、<span class="stat-hi">プロダクトオーナー</span>と<span class="stat-hi">ユーザーリサーチャー</span>も兼任していました。Langfuse と PostHog でデータを分析し、限られた開発リソースの中でデザインをどこに注ぐかを決め、Agent UX をエンドツーエンドで設計し、ローンチ後の検証方法も設計しました。',
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
      's02.lede': '当時は、ほとんどのスタートアップが Claude を使って開発とデザインのスピードを上げようとしていて、私たちも例外ではありませんでした。問題を十分に理解する前に、CTO が自ら最初のリデザインを作り、インターフェース全体を code-first で書き直していました。作り直したばかりのものを、もう一度ゼロから設計し直すことはできません。そこで問いを変えました。<span class="stat-hi-blue">設計し直さずに、この機能をどう立て直し、良くしていけるか。</span>その答えを探すため、90 日分のプロダクトデータを引き、実際の操作録画も見ました。',
      's02.f1.label': 'インタラクションの 91% が会話ボックスで起きる',
      's02.f1.body': 'プロダクトには十数個の機能入口があります。しかし約 18,500 件のインタラクションのうち、それらの合計は<span class="stat-hi">1 割未満</span>。残りはすべて会話の中で起きていました。',
      's02.f2.label': '72% のユーザーは機能入口に一度も触れない',
      's02.f2.body': '582 名のアクティブユーザーの大半は、最初から最後まで会話ボックスの中だけで過ごしていました。最も人気の機能入口でさえ、使ったのは <span class="stat-hi">14%</span> だけです。',
      's02.f3.label': 'セッション録画の 65% で、ユーザーがメニューの間を行き来していた',
      's02.f3.body': '20 本の実際の操作録画を見ると、機能に一直線で辿り着くことはほとんどなく、典型的なのは「入って、戻って、別のメニューを試す」の繰り返しでした。',
      's02.close': 'Knowledge ページもこの十数個の入口のひとつで、ほとんど開かれていませんでした。でも、誰もがもともと会話ボックスにいました。だから Knowledge づくりも、いちばん使われている会話ボックスから始めることにしました。',
      's03.title': '判断 1：問いが生まれた場所で教える',
      's03.why.body': 'ユーザーは、すぐ横にボタンがあっても、習慣のように会話ボックスに打ち込んでいました。だから Knowledge づくりも会話ボックスに移しました。たとえば、アナリストが「先月のアクティブ顧客は何人？」と聞いたのに、AI がキャンセル済みの注文まで数えてしまったとします。以前は、質問を中断して Knowledge ページに移り、ルールを追加してから戻って聞き直す必要があり、多くの人が途中で諦めていました。いまは会話の中でそのまま「アクティブ顧客とは、キャンセルされていない注文が 1 件以上ある顧客のこと」と伝えられます。agent は選択式の質問で細部を確認し、ルールを markdown ファイルとして下書きし、保存する前にもう一度確認します。公開されれば、その後チームの誰が「アクティブ顧客」について聞いても、同じ定義が使われます。',
      's03.demoA.cap.t': '選択式の質問で定義を絞り込む',
      's03.demoA.cap.d': '初めて使うとき、会話は Wren AI でできることを紹介する短いチュートリアルから始まります。アナリストが Knowledge のカードを開いて「Try it out」を押すと、あらかじめ用意された依頼文で会話が始まります。そこから agent は、どの種類の Knowledge か、最初にどの用語を定義するか、アクティブ顧客をどう数えるかを一歩ずつ尋ねます。毎回ひとつ選ぶだけなので、保存されるのはモデルが想定した定義ではなく、アナリスト自身が選んだ定義です。',
      's03.demoB.cap.t': '下書きを確認してから公開する',
      's03.demoB.cap.d': '定義が決まると、agent はルールを markdown ファイルとして下書きし、短い要約を見せたうえで、公開するか、下書きのまま残すか、破棄するかを尋ねます。アナリストが「Publish to project knowledge」を選んだときだけ、そのルールがチーム共有の Knowledge に入ります。',
      's03.applied.cap.t': '以後の答えは同じ定義を使う',
      's03.applied.cap.d': 'その後、別のスレッドで誰かがアクティブ顧客について尋ねます。agent は答える前に、使っているルールを示します：「アクティブ顧客＝キャンセルされていない注文が 1 件以上ある顧客」。アナリストが一度定義しただけで、その後は全員が同じ答えを受け取ります。',
      's03.survey.body': 'Knowledge づくりはシステム上では Skill として動いているので、どの会話の中でも、必要なときに呼び出して、一問一答のアンケート形式で Knowledge を作れます。アンケートにしたのは、多くの人は定義をゼロから書けなくても、選ぶことならできるからです。これは <a href="rezio.html#s04">KKday Rezio</a> で取ったのと同じ手です。すべての項目を一度に見せていた設定フォームを短い質問票に置き換え、設定時間は 45 分から 28 分に短縮されました。',
      's03.rej.body': 'agent が推測した内容を、確認なしに公開させることもしませんでした。Knowledge はチーム全員で共有するものなので、一度設定を間違えると、全員の答えが静かに変わってしまいます。「公開」のクリックがひとつ増える代わりに、すべてのルールが確認済みになります。',
      's03.split': '会話があれば誰でも Knowledge を作り始められますが、書き出されるのはやはり誰かが責任を持つべきファイルです。内容をレビューし、ビジネスが変われば直し、POC の間は顧客のために整える。<span class="stat-hi-blue">すべてを一度に見渡し、ルールを一つずつ照らし合わせて直す作業はページ向きで、一問一答で済むことが会話向きです。</span>だから、レビューと修正は Knowledge ページで行います。',
      's04.title': '判断 2：そのファイルを直しやすくする',
      's04.lede': '会話のおかげで Knowledge は作りやすくなりましたが、書き込まれたルールは結局、ページの上で誰かがレビューし、直す必要があります。定義の持ち主が内容を確認し、POC の間は私たち自身のチームが顧客のために整えます。だから Knowledge ページの使いやすさは、チームが Knowledge を作り切れるかどうかに今も直結しています。このページには全部で 4 つのバージョンがありました。最初の表は、agent が登場する前の典型的な設定ページでした。CTO が vibe coding でファイルツリーに作り直し、agent が読めるものは増えましたが、人は空のファイルの前に取り残されました。移行期には、私がフォームを加えて構造を取り戻しました。そして最後に、設計し直す余地がない中で、コピーと既存のコンポーネントだけを使い、最もつまずきやすいステップを直しました。',
      's04.v1.cap.t': 'v1 · テーブル',
      's04.v1.cap.d': 'Knowledge ページは最初、Question-SQL pairs と Instructions の 2 種類だけを 1 行ずつ追加する表でした。問題は、質問した瞬間と切り離されていたことです。答えが間違っていても、会話を離れてこのページでルールを一つずつ入力する必要があり、多くのチームが途中で諦めていました。',
      's04.v2.cap.t': 'v2 · ファイルツリー',
      's04.v2.cap.d': 'CTO が vibe coding でページを作り直し、glossary・metrics・rules・sql の 4 つのフォルダに分かれた markdown ファイルのツリーにしました。agent が読めるものは増えましたが、人にとってはむしろ使いにくくなりました。Knowledge を追加するには空のファイルを開き、どのフォルダに置くか、どんな形式で書くかを、手がかりなしに自分で判断する必要がありました。',
      's04.v3.cap.t': 'v3 · つなぎのフォーム',
      's04.v3.cap.d': 'つなぎとして、ツリーの上にフォームを加えることを提案しました。Metrics、Glossary、SQL pairs、Instructions のいずれかを選び、agent が必要とする項目を埋める形です。構造は戻りましたが、問題が 2 つ残りました。各種類は「すでに持っているもの」で説明されていましたが、人は問題を抱えてやって来ます。そしてフォームは作成時にしか現れず、直そうとして「Edit」を押すと、生の markdown と YAML に戻ってしまいました。',
      's04.v4.cap.t': 'v4 · 修正版',
      's04.v4.cap.d': 'v4 で変えたのはコピーだけで、既存のコンポーネントを再利用しました。種類の選択画面は問題のほうを示し（「ある数字の計算方法に合意がないときに使う」）、各グループを agent がどう使うかを説明し、空のファイルの代償も伝えます。「Edit in form」は作成時のフォームを再利用するので、どのファイルも構造としても markdown としても編集できます。<span class="stat-hi">売上に最も近いステップで、開発コストはほぼゼロでした。</span>',
      's04.v4form.cap.t': 'フォームとファイルを並べて',
      's04.v4form.cap.d': 'どのファイルも、agent が必要とする項目だけのフォームとして開き、その横に書き出される markdown が表示されます。',
      's04.m3.close': 'ページの新しい見た目のために、リデザインのプロジェクトは立てていません。デザインシステムを AI コーディングツールがそのまま従えるルールとして書き直したので、エンジニアリングが AI で画面を生成すると、同じコンポーネントとスタイルが使われます。この ticket が出荷された時点で、新しい見た目も一緒に届きました。',
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
      'intro.overview.body': 'Wren AI 是一套對話式 BI 工具：用白話就能向資料提問。但要答得好，它得先學會這間公司怎麼運作：指標、定義、規則。產品裡把這件事叫做 Knowledge。有建立 Knowledge 的團隊，付費的機率大約高出 7 倍，卻很少有人做完；每一次 POC，最後都是我們自己的團隊替客戶手動建。',
      'intro.role.label': '我的角色',
      'intro.role.body': '我是團隊裡<span class="stat-hi">唯一的產品設計師</span>，同時兼任<span class="stat-hi">產品負責人</span>和<span class="stat-hi">使用者研究員</span>。我用 Langfuse 和 PostHog 分析數據，在有限的工程資源下決定設計該投入在哪裡，負責 Agent UX 從頭到尾的設計，也規劃了上線後的驗證方式。',
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
      's02.lede': '當時，幾乎每個新創團隊都在嘗試用 Claude 加快開發和設計，我們也不例外。在我們充分了解問題之前，CTO 就直接做出了第一個改版，用 code-first 的方式把整個介面重寫了一遍。介面才剛重做過，不可能再從頭設計一次，於是我們把問題換成：<span class="stat-hi-blue">在不重新設計的前提下，還能怎麼補救、優化這個功能？</span>為了找到答案，我拉了 90 天的產品數據，也看了用戶的操作錄影。',
      's02.f1.label': '91% 的互動都發生在對話框裡',
      's02.f1.body': '產品擁有十幾個功能入口，但在近 18,500 次的互動中，所有入口的使用率合計不到<span class="stat-hi">一成</span>，其餘全數發生在對話框裡。',
      's02.f2.label': '72% 的用戶從未碰過任何功能入口',
      's02.f2.body': '在 582 位活躍用戶中，多數人從頭到尾只待在對話框裡；即便是最熱門的功能入口，也只有 <span class="stat-hi">14%</span> 的人用過。',
      's02.f3.label': '65% 的用戶錄影裡，都在選單之間來回找功能',
      's02.f3.body': '在 20 段真實的操作錄影裡，用戶找功能很少一次到位，常見的路徑是「點進去、退出來、再換一個選單試試」。',
      's02.close': 'Knowledge 頁面只是這十幾個入口之一，幾乎沒人會打開；但每個人本來就待在對話框裡。所以建立 Knowledge，也該從最多人使用的對話框開始。',
      's03.title': '決策 1：在問題發生的地方建立 Knowledge',
      's03.why.body': '用戶習慣直接在對話框裡打字，就算旁邊有按鈕也一樣，所以我們把建立 Knowledge 也搬進對話框。舉個例子：一位分析師問「上個月有多少活躍顧客？」，AI 卻把已取消的訂單也算了進去。以前，他得先中斷提問，切到 Knowledge 頁面新增一條規則，再回來重問，多數人做到一半就放棄了。現在，他可以直接在對話裡說：「活躍顧客的定義，是至少有一筆未取消的訂單。」agent 會用選擇題跟他確認細節，把規則起草成 markdown 檔案，儲存前再問一次。一旦發佈，團隊裡之後任何人問到「活躍顧客」，用的都是同一個定義。',
      's03.demoA.cap.t': '用選擇題釐清定義',
      's03.demoA.cap.d': '第一次使用時，對話框會先出現一份簡短的教學，介紹 Wren AI 能做的事。分析師展開 Knowledge 這張卡片，按下「Try it out」，對話就從一句預先寫好的請求開始。接著 agent 用選擇題一步一步問：要建立哪一種 Knowledge？要先定義哪個詞？「活躍顧客」該怎麼算？分析師每一步只要選一個選項，最後存下來的，就是他親自選的定義，而不是模型自己假設的版本。',
      's03.demoB.cap.t': '確認草稿後才發佈',
      's03.demoB.cap.d': '選完定義後，agent 先把規則起草成一份 markdown 檔案，附上簡短摘要，再問他要怎麼處理：發佈、存成草稿，或捨棄。只有他選了「Publish to project knowledge」，這條規則才會真的進入團隊共用的 Knowledge。',
      's03.applied.cap.t': '之後的回答都套用同一個定義',
      's03.applied.cap.d': '之後，有人在新的對話裡問到活躍顧客。agent 回答前會先說明它用的是哪條規則：「活躍顧客＝至少有一筆未取消訂單的顧客」。分析師只定義過一次，之後每個人拿到的都是同一個答案。',
      's03.survey.body': '建立 Knowledge 在系統裡是一個 Skill，所以不管在哪一段對話裡，只要有需要，用戶都能叫出它，用一問一答的問卷方式把 Knowledge 建起來。之所以用問卷，是因為多數人沒辦法從零寫出一個定義，但選得出來。這跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法一樣：用一份簡短的問卷，取代一次攤開所有欄位的設定表單，設定時間從 45 分鐘降到 28 分鐘。',
      's03.rej.body': '我也刻意不讓 agent 把推斷出來的內容直接發布。Knowledge 是整個團隊共用的，一旦設定錯誤，就會悄悄影響每個人的答案；多一次「發佈」的點擊，換來的是每一條規則都經過確認。',
      's03.split': '對話讓任何人都能開始建立 Knowledge，但它寫出來的仍是一個需要有人負責的檔案：審核內容、在業務改變時修正，並在 POC 期間替客戶建好。<span class="stat-hi-blue">需要一次看到全部、逐條比對和修改的工作，適合放在頁面上；一問一答就能完成的事，才適合交給對話。</span>所以審核與修正，交給 Knowledge 頁面來處理。',
      's04.title': '決策 2：讓這個檔案容易修正',
      's04.lede': '對話讓建立 Knowledge 變得容易，但寫進去的規則，最後還是要有人在頁面上審核和修正：負責定義的人要確認內容，POC 期間我們自己的團隊也得替客戶整理。所以 Knowledge 頁面好不好用，一樣決定了團隊能不能把 Knowledge 建完。這個頁面前後一共有四個版本：最早的表格，是 agent 還沒出現時的傳統設定頁；CTO 用 vibe coding 把它重寫成檔案樹，agent 能讀的東西變多了，人卻被留在空白檔案前；過渡期我加上表單，把結構找回來；最後在不能重新設計的限制下，只用文案和既有元件，修正了最常出錯的那一步。',
      's04.v1.cap.t': 'v1 · 一張表格',
      's04.v1.cap.d': '最初的 Knowledge 頁面是一張表格，只有 Question-SQL pairs 和 Instructions 兩種，一次新增一列。問題是它跟提問的當下脫節：答案出錯時，用戶得離開對話，到這個頁面一條一條填，多數團隊做到一半就放棄了。',
      's04.v2.cap.t': 'v2 · 一棵檔案樹',
      's04.v2.cap.d': 'CTO 用 vibe coding 把頁面重寫成一棵 markdown 檔案樹，分成 glossary、metrics、rules、sql 四個資料夾。agent 能讀的東西變多了，對人卻更難用：新增 Knowledge 就是打開一個空白檔案，得自己知道該放哪個資料夾、該寫成什麼格式，沒有任何引導。',
      's04.v3.cap.t': 'v3 · 過渡期的表單',
      's04.v3.cap.d': '在過渡期，我建議先在檔案樹上加一層表單：先選 Metrics、Glossary、SQL pairs 或 Instructions，再填 agent 需要的欄位。結構回來了，但還有兩個問題：每種類型是用「你已經有什麼」來描述，可是人是帶著問題來的；而且表單只在建立時出現，回頭修改時，「Edit」又會掉回原始的 markdown 和 YAML。',
      's04.v4.cap.t': 'v4 · 修正後的版本',
      's04.v4.cap.d': 'v4 只改了文案，並沿用既有的元件。類型選擇改成講問題（「當一個數字沒有大家同意的算法時使用」），每一組都說明 agent 怎麼使用，空白檔案也講出它的代價；「Edit in form」沿用建立時的表單，讓每個檔案都能用結構或 markdown 兩種方式修改。<span class="stat-hi">在最貼近營收的那一步上，工程成本趨近於零。</span>',
      's04.v4form.cap.t': '表單與檔案並排',
      's04.v4form.cap.d': '每個檔案都能用表單打開，只有 agent 需要的欄位，旁邊就是它寫出來的 markdown。',
      's04.m3.close': '頁面的新樣貌沒有另外開改版專案。我把設計系統寫成 AI coding 工具能直接遵守的規則，工程用 AI 產生畫面時，就會套用同一套元件和樣式；所以這張 ticket 一做完，新樣貌就跟著上線了。',
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
      'intro.overview.body': 'Wren AI 是一套对话式 BI 工具：用白话就能向数据提问。但要答得好，它得先学会这间公司怎么运作：指标、定义、规则。产品里把这件事叫做 Knowledge。有建立 Knowledge 的团队，付费的概率大约高出 7 倍，却很少有人做完；每一次 POC，最后都是我们自己的团队替客户手动建。',
      'intro.role.label': '我的角色',
      'intro.role.body': '我是团队里<span class="stat-hi">唯一的产品设计师</span>，同时兼任<span class="stat-hi">产品负责人</span>和<span class="stat-hi">用户研究员</span>。我用 Langfuse 和 PostHog 分析数据，在有限的工程资源下决定设计该投入在哪里，负责 Agent UX 从头到尾的设计，也规划了上线后的验证方式。',
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
      's02.lede': '当时，几乎每个初创团队都在尝试用 Claude 加快开发和设计，我们也不例外。在我们充分了解问题之前，CTO 就直接做出了第一个改版，用 code-first 的方式把整个界面重写了一遍。界面才刚重做过，不可能再从头设计一次，于是我们把问题换成：<span class="stat-hi-blue">在不重新设计的前提下，还能怎么补救、优化这个功能？</span>为了找到答案，我拉了 90 天的产品数据，也看了用户的操作录像。',
      's02.f1.label': '91% 的交互都发生在对话框里',
      's02.f1.body': '产品拥有十几个功能入口，但在近 18,500 次的交互中，所有入口的使用率合计不到<span class="stat-hi">一成</span>，其余全数发生在对话框里。',
      's02.f2.label': '72% 的用户从未碰过任何功能入口',
      's02.f2.body': '在 582 位活跃用户中，多数人从头到尾只待在对话框里；即便是最热门的功能入口，也只有 <span class="stat-hi">14%</span> 的人用过。',
      's02.f3.label': '65% 的用户录像里，都在菜单之间来回找功能',
      's02.f3.body': '在 20 段真实的操作录像里，用户找功能很少一次到位，常见的路径是「点进去、退出来、再换一个菜单试试」。',
      's02.close': 'Knowledge 页面只是这十几个入口之一，几乎没人会打开；但每个人本来就待在对话框里。所以建立 Knowledge，也该从最多人使用的对话框开始。',
      's03.title': '决策 1：在问题发生的地方建立 Knowledge',
      's03.why.body': '用户习惯直接在对话框里打字，就算旁边有按钮也一样，所以我们把建立 Knowledge 也搬进对话框。举个例子：一位分析师问「上个月有多少活跃顾客？」，AI 却把已取消的订单也算了进去。以前，他得先中断提问，切到 Knowledge 页面新增一条规则，再回来重问，多数人做到一半就放弃了。现在，他可以直接在对话里说：「活跃顾客的定义，是至少有一笔未取消的订单。」agent 会用选择题跟他确认细节，把规则起草成 markdown 文件，保存前再问一次。一旦发布，团队里之后任何人问到「活跃顾客」，用的都是同一个定义。',
      's03.demoA.cap.t': '用选择题厘清定义',
      's03.demoA.cap.d': '第一次使用时，对话框会先出现一份简短的教学，介绍 Wren AI 能做的事。分析师展开 Knowledge 这张卡片，按下「Try it out」，对话就从一句预先写好的请求开始。接着 agent 用选择题一步一步问：要建立哪一种 Knowledge？要先定义哪个词？「活跃顾客」该怎么算？分析师每一步只要选一个选项，最后存下来的，就是他亲自选的定义，而不是模型自己假设的版本。',
      's03.demoB.cap.t': '确认草稿后才发布',
      's03.demoB.cap.d': '选完定义后，agent 先把规则起草成一份 markdown 文件，附上简短摘要，再问他要怎么处理：发布、存成草稿，或舍弃。只有他选了「Publish to project knowledge」，这条规则才会真的进入团队共用的 Knowledge。',
      's03.applied.cap.t': '之后的回答都套用同一个定义',
      's03.applied.cap.d': '之后，有人在新的对话里问到活跃顾客。agent 回答前会先说明它用的是哪条规则：「活跃顾客＝至少有一笔未取消订单的顾客」。分析师只定义过一次，之后每个人拿到的都是同一个答案。',
      's03.survey.body': '建立 Knowledge 在系统里是一个 Skill，所以不管在哪一段对话里，只要有需要，用户都能叫出它，用一问一答的问卷方式把 Knowledge 建起来。之所以用问卷，是因为多数人没办法从零写出一个定义，但选得出来。这跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法一样：用一份简短的问卷，取代一次摊开所有字段的设置表单，设置时间从 45 分钟降到 28 分钟。',
      's03.rej.body': '我也刻意不让 agent 把推断出来的内容直接发布。Knowledge 是整个团队共用的，一旦设定错误，就会悄悄影响每个人的答案；多一次「发布」的点击，换来的是每一条规则都经过确认。',
      's03.split': '对话让任何人都能开始建立 Knowledge，但它写出来的仍是一个需要有人负责的文件：审核内容、在业务改变时修正，并在 POC 期间替客户建好。<span class="stat-hi-blue">需要一次看到全部、逐条比对和修改的工作，适合放在页面上；一问一答就能完成的事，才适合交给对话。</span>所以审核与修正，交给 Knowledge 页面来处理。',
      's04.title': '决策 2：让这个文件容易修正',
      's04.lede': '对话让建立 Knowledge 变得容易，但写进去的规则，最后还是要有人在页面上审核和修正：负责定义的人要确认内容，POC 期间我们自己的团队也得替客户整理。所以 Knowledge 页面好不好用，一样决定了团队能不能把 Knowledge 建完。这个页面前后一共有四个版本：最早的表格，是 agent 还没出现时的传统设置页；CTO 用 vibe coding 把它重写成文件树，agent 能读的东西变多了，人却被留在空白文件前；过渡期我加上表单，把结构找回来；最后在不能重新设计的限制下，只用文案和既有组件，修正了最常出错的那一步。',
      's04.v1.cap.t': 'v1 · 一张表格',
      's04.v1.cap.d': '最初的 Knowledge 页面是一张表格，只有 Question-SQL pairs 和 Instructions 两种，一次新增一行。问题是它跟提问的当下脱节：答案出错时，用户得离开对话，到这个页面一条一条填，多数团队做到一半就放弃了。',
      's04.v2.cap.t': 'v2 · 一棵文件树',
      's04.v2.cap.d': 'CTO 用 vibe coding 把页面重写成一棵 markdown 文件树，分成 glossary、metrics、rules、sql 四个文件夹。agent 能读的东西变多了，对人却更难用：新增 Knowledge 就是打开一个空白文件，得自己知道该放哪个文件夹、该写成什么格式，没有任何引导。',
      's04.v3.cap.t': 'v3 · 过渡期的表单',
      's04.v3.cap.d': '在过渡期，我建议先在文件树上加一层表单：先选 Metrics、Glossary、SQL pairs 或 Instructions，再填 agent 需要的字段。结构回来了，但还有两个问题：每种类型是用「你已经有什么」来描述，可是人是带着问题来的；而且表单只在建立时出现，回头修改时，「Edit」又会掉回原始的 markdown 和 YAML。',
      's04.v4.cap.t': 'v4 · 修正后的版本',
      's04.v4.cap.d': 'v4 只改了文案，并沿用既有的组件。类型选择改成讲问题（「当一个数字没有大家同意的算法时使用」），每一组都说明 agent 怎么使用，空白文件也讲出它的代价；「Edit in form」沿用建立时的表单，让每个文件都能用结构或 markdown 两种方式修改。<span class="stat-hi">在最贴近营收的那一步上，工程成本趋近于零。</span>',
      's04.v4form.cap.t': '表单与文件并排',
      's04.v4form.cap.d': '每个文件都能用表单打开，只有 agent 需要的字段，旁边就是它写出来的 markdown。',
      's04.m3.close': '页面的新样貌没有另外开改版项目。我把设计系统写成 AI coding 工具能直接遵守的规则，工程用 AI 生成画面时，就会套用同一套组件和样式；所以这张 ticket 一做完，新样貌就跟着上线了。',
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
