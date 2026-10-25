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
      'nav.s05': '05.成果',
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
      's03.survey.body': 'Knowledge づくりはシステム上では Skill として動いているので、どの会話の中でも、必要なときに呼び出して、一問一答で Knowledge を作れます。',
      's03.skill.body': 'Skill の仕組みはシンプルです。各 Skill は SKILL.md を含む 1 つのフォルダで、先頭の YAML に名前と説明を書き、本文に agent がやるべきことを書きます。agent はこの説明を読み、どの Skill をいつ使うかを自分で判断します。システムにはデータ分析、レポート作成、SQL の作成、PDF やスプレッドシートの読み取りなどの組み込み Skill があり、チームは自分たちの Skill を .zip にまとめてアップロードすることもできます。どの Skill を有効にするかは、プロジェクトごとに選べます。',
      's03.rej.body': 'agent が推測した内容を、確認なしに公開させることもしませんでした。Knowledge はチーム全員で共有するものなので、一度設定を間違えると、全員の答えが静かに変わってしまいます。「公開」のクリックがひとつ増える代わりに、すべてのルールが確認済みになります。',
      's03.split': '会話があれば誰でも Knowledge を作り始められますが、書き出されるのはやはり誰かが責任を持つべきファイルです。内容をレビューし、ビジネスが変われば直し、POC の間は顧客のために整える。<span class="stat-hi-blue">すべてを一度に見渡し、ルールを一つずつ照らし合わせて直す作業はページ向きで、一問一答で済むことが会話向きです。</span>だから、レビューと修正は Knowledge ページで行います。',
      's04.title': '判断 2：そのファイルを直しやすくする',
      's04.lede': '会話のおかげで Knowledge は作りやすくなりましたが、書き込まれたルールは結局、ページの上で誰かがレビューし、直す必要があります。定義の持ち主が内容を確認し、POC の間は私たち自身のチームが顧客のために整えます。だから Knowledge ページの使いやすさは、チームが Knowledge を作り切れるかどうかに今も直結しています。',
      's04.v1.cap.t': 'v1 · テーブル',
      's04.v1.cap.d': 'Knowledge ページは agent が登場する前に作られたもので、最初は Question-SQL pairs と Instructions の 2 種類だけを 1 行ずつ追加する、典型的な設定用の表でした。問題は、質問した瞬間と切り離されていたことです。答えが間違っていても、会話を離れてこのページでルールを一つずつ探して直す必要があり、多くのチームが途中で諦めていました。',
      's04.v2.cap.t': 'v2 · ファイルツリー',
      's04.v2.cap.d': 'CTO が vibe coding でページを作り直し、glossary・metrics・rules・sql の 4 つのフォルダに分かれた markdown ファイルのツリーにしました。AI にとっては読みやすく直しやすくなりましたが、人にとってはむしろ使いにくくなりました。Knowledge を追加するには空のファイルを開き、どのフォルダに置くか、どんな形式で書くかを、手がかりなしに自分で判断する必要がありました。',
      's04.v4.cap.t': 'v4 · 修正版',
      's04.v4.cap.d': '設計し直す余地がない中で、v4 はコピーと既存のコンポーネントだけで、ファイルツリーに構造を取り戻しました。ファイルを追加するときはまず種類を選び、各種類は解決する問題で説明されます（「ある数字の計算方法に合意がないときに使う」）。各グループは agent がどう使うかを示し、空のファイルにはその代償が書かれています。「Edit in form」は作成時のフォームを再利用するので、どのファイルも構造としても markdown としても編集できます。<span class="stat-hi">売上に最も近いステップで、開発コストはほぼゼロでした。</span>',
      's04.v4.cap.d2': 'これは <a href="rezio.html#s04">KKday Rezio</a> で取ったのと同じ手です。多くの人は定義をゼロから書けなくても、選ぶことならできます。だから最初に短い質問でどのケースかを確かめ、そのケースに必要な項目だけを見せます。すべての項目を一度に並べるフォームの代わりです。Rezio では、これで設定時間が 45 分から 28 分に短縮されました。',
      's04.v4.vid1': 'ゼロから新しいファイルを作る',
      's04.v4.vid2': '既存のファイルを編集する',
      's05.jC.body': '<p class="body">Skill の作成と管理は、いまも実在する画面です。ここでアップロードし、チャットで試します。</p>',
      's05.jC.userJourney': 'ユーザージャーニー',
      's05.jC.jUpload': 'Skill をアップロード',
      's05.jC.jTry': '試してみる',
      's05.jC.play': '再生',
      's05.replay': 'リプレイ',
      'res.title': '成果と振り返り',
      'res.lede': 'Knowledge づくりを会話に移したことで、誰がどれだけ速く作るかが変わりました。',
      'res.r1.label': '自力で Knowledge を作るトライアルチームが増えた',
      'res.r1.body': 'トライアル開始から 1 週間以内に Knowledge を作ったチームの割合は、ローンチ前と比べて相対的に約 <span class="stat-hi">15%</span> 増えました。私たちの側は誰も関与していません。初期のシグナルであり、私が最も注視している数字です。',
      'res.r2.label': 'POC が Knowledge 待ちにならなくなった',
      'res.r2.body': '以前は、Knowledge だけで POC 1 件あたり<span class="stat-hi">2〜3 週間</span>、営業を介したやり取りが必要でした。いま営業からは、事前に Knowledge を作り込む必要がなくなり、プロダクトを渡して顧客自身に作ってもらえるようになったと聞いています。きれいな after の数字はまだありません。',
      'res.r3.label': '会話から始める形は Knowledge の外へ広がった',
      'res.r3.body': 'Knowledge が Skill として機能すると、レポート、分析、ドキュメント解析も続き、すべて同じ会話ボックスから呼び出せるようになりました。A/B テストでは、会話から Knowledge を作る割合が <span class="stat-hi">42%</span> 上昇しました。1 か月のうちに、旧来の入口の利用は月に数万回から<span class="stat-hi">10 分の 1</span>に減り、元に戻してほしいという声はなく、初期のフィードバックは高評価と低評価がおよそ <span class="stat-hi">4:1</span> でした。',
      'res.ds.label': 'デザインがエンジニアリングの作り方に合わせる',
      'res.ds.body': 'このプロジェクトで、デザイナーの役割に対する考え方も変わりました。エンジニアリングは AI でコードを書き、そのスピードはどんなデザインのプロセスよりも速い。エンジニアリングにデザインを待たせるのではなく、デザインのほうを彼らの作り方に合わせました。デザインシステムを AI コーディングツールがそのまま従えるルールとして書き直したので、エンジニアリングが AI で画面を生成すると、同じコンポーネント、スタイル、インタラクションが使われます。別枠のリデザインのプロジェクトは要らず、インターフェースは出荷を続けながらも一貫性を保てます。',
      'res.next.label': '次に取り組むこと',
      'res.next.body': 'すべての機能が同じ会話ボックスの裏にあると、何ひとつ自ら名乗り出てきません。十数個のボタンは辿りにくいものでしたが、少なくともプロダクトに何ができるかは見せていました。Skill が増え続ける中で機能を見つけやすく保つこと、それが次に取り組む問題です。',
      'res.close': 'これほど速く動く小さなチームでは、デザイナーが本格的なリデザインに取り組める機会はほとんどありません。私にできたのは、デザインがまだ結果を変えられる数少ない場所を選び、それ以外のすべての場所で体験の一線を守ることでした。',
    },
    'zh-tw': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.簡介',
      'nav.s01': '01.訊號',
      'nav.s02': '02.限制',
      'nav.s03': '03.對話',
      'nav.s04': '04.修正',
      'nav.s05': '05.成果',
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
      's03.survey.body': '建立 Knowledge 在系統裡是一個 Skill，所以不管在哪一段對話裡，只要有需要，用戶都能叫出它，透過一問一答把 Knowledge 建起來。',
      's03.skill.body': 'Skill 的架構很單純：每個 Skill 都是一個資料夾，裡面有一份 SKILL.md，開頭用 YAML 寫上名稱和描述，下面寫 agent 該怎麼做。agent 會讀這些描述，自己判斷什麼時候該用哪一個 Skill。系統內建了分析數據、產生報告、撰寫 SQL、讀取 PDF 和試算表等 Skill，團隊也能把自己的 Skill 打包成 .zip 上傳；每個專案可以各自決定要開啟哪些 Skill。',
      's03.rej.body': '我也刻意不讓 agent 把推斷出來的內容直接發布。Knowledge 是整個團隊共用的，一旦設定錯誤，就會悄悄影響每個人的答案；多一次「發佈」的點擊，換來的是每一條規則都經過確認。',
      's03.split': '對話讓任何人都能開始建立 Knowledge，但它寫出來的仍是一個需要有人負責的檔案：審核內容、在業務改變時修正，並在 POC 期間替客戶建好。<span class="stat-hi-blue">需要一次看到全部、逐條比對和修改的工作，適合放在頁面上；一問一答就能完成的事，才適合交給對話。</span>所以審核與修正，交給 Knowledge 頁面來處理。',
      's04.title': '決策 2：讓這個檔案容易修正',
      's04.lede': '對話讓建立 Knowledge 變得容易，但寫進去的規則，最後還是要有人在頁面上審核和修正：負責定義的人要確認內容，POC 期間我們自己的團隊也得替客戶整理。所以 Knowledge 頁面好不好用，一樣決定了團隊能不能把 Knowledge 建完。',
      's04.v1.cap.t': 'v1 · 一張表格',
      's04.v1.cap.d': '最初的 Knowledge 頁面是在 agent 還沒出現時做的，是一張傳統的設定表格：只有 Question-SQL pairs 和 Instructions 兩種，一次新增一列。問題是它跟提問的當下脫節：答案出錯時，用戶得離開對話，到這個頁面一條一條尋找修改，多數團隊做到一半就放棄了。',
      's04.v2.cap.t': 'v2 · 一棵檔案樹',
      's04.v2.cap.d': 'CTO 用 vibe coding 把頁面重寫成一棵 markdown 檔案樹，分成 glossary、metrics、rules、sql 四個資料夾。這讓 AI 更方便閱讀和修改，對人卻更難用：新增 Knowledge 就是打開一個空白檔案，得自己知道該放哪個資料夾、該寫成什麼格式，沒有任何引導。',
      's04.v4.cap.t': 'v4 · 修正後的版本',
      's04.v4.cap.d': '在不能重新設計的限制下，v4 只用文案和既有元件，把結構補回檔案樹：新增檔案時先選類型，每種類型都用「遇到什麼問題」來描述（「當一個數字沒有大家同意的算法時使用」），每一組也說明 agent 怎麼使用，空白檔案則講出它的代價；「Edit in form」沿用建立時的表單，讓每個檔案都能用結構或 markdown 兩種方式修改。<span class="stat-hi">在最貼近營收的那一步上，工程成本趨近於零。</span>',
      's04.v4.cap.d2': '這跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法一樣。多數人沒辦法從零寫出一個定義，但選得出來，所以先用一份簡短的問卷問清楚是哪一種情況，再只攤開那種情況需要的欄位，取代一次攤開所有欄位的設定表單。在 Rezio，這讓設定時間從 45 分鐘降到 28 分鐘。',
      's04.v4.vid1': '從頭新增一個檔案',
      's04.v4.vid2': '編輯既有的檔案',
      's05.jC.body': '<p class="body">Skill 的製作與管理仍然是一個實際存在的介面：在這裡上傳，再到對話裡試用。</p>',
      's05.jC.userJourney': '用戶旅程',
      's05.jC.jUpload': '上傳 Skill',
      's05.jC.jTry': '實際試用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      'res.title': '成果與反思',
      'res.lede': '把建立 Knowledge 搬進對話之後，改變的是誰來建、建得多快。',
      'res.r1.label': '更多試用團隊自己建立 Knowledge',
      'res.r1.body': '試用團隊在第一週內建立 Knowledge 的比例，比上線前相對成長了約 <span class="stat-hi">15%</span>，過程中沒有我們的人介入。這是早期訊號，也是我盯得最緊的數字。',
      'res.r2.label': 'POC 不再卡在 Knowledge',
      'res.r2.body': '以前，光是 Knowledge，每次 POC 就要透過業務來回<span class="stat-hi">兩到三週</span>。現在業務的回饋是：不必再事先把 Knowledge 建好，可以直接把產品交給客戶，讓客戶自己建。乾淨的 after 數字還在收集中。',
      'res.r3.label': '對話優先的做法延伸到其他功能',
      'res.r3.body': 'Knowledge 以 Skill 的方式跑通之後，報告、分析、文件解析也跟著變成 Skill，全部從同一個對話框觸發。在 A/B 測試中，透過對話建立 Knowledge 的比率上升了 <span class="stat-hi">42%</span>。一個月內，舊入口的使用量從每月幾萬次掉到只剩<span class="stat-hi">十分之一</span>，沒有人要求改回去，早期回饋的讚與倒讚比例約為 <span class="stat-hi">4:1</span>。',
      'res.ds.label': '設計去配合工程的開發方式',
      'res.ds.body': '這個專案也改變了我對設計師角色的理解。工程用 AI 寫程式，速度比任何設計流程都快；與其要工程等設計，不如讓設計去適應他們的開發方式。所以我把設計系統寫成 AI coding 工具能直接遵守的規則：工程用 AI 產生畫面時，就會套用同一套元件、樣式和互動，不需要另外開改版專案，介面也能持續穩定地產出。',
      'res.next.label': '接下來要解決的事',
      'res.next.body': '所有功能都收進對話框之後，就沒有東西會自己現身。十幾顆按鈕雖然難找，至少讓人看得到產品能做什麼。Skill 會持續增加，讓用戶一直找得到這些功能，是我接下來會處理的問題。',
      'res.close': '在跑得這麼快的小團隊裡，設計師很少能等到一次完整的改版。我能做的，是挑出少數幾個設計還能改變結果的地方，並在其他每一處守住體驗的底線。',
    },
    'zh-cn': {
      'nav.back': '← Iris Hsieh',
      'nav.intro': '.简介',
      'nav.s01': '01.信号',
      'nav.s02': '02.限制',
      'nav.s03': '03.对话',
      'nav.s04': '04.修正',
      'nav.s05': '05.成果',
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
      's03.survey.body': '建立 Knowledge 在系统里是一个 Skill，所以不管在哪一段对话里，只要有需要，用户都能叫出它，通过一问一答把 Knowledge 建起来。',
      's03.skill.body': 'Skill 的架构很简单：每个 Skill 都是一个文件夹，里面有一份 SKILL.md，开头用 YAML 写上名称和描述，下面写 agent 该怎么做。agent 会读这些描述，自己判断什么时候该用哪一个 Skill。系统内置了分析数据、生成报告、编写 SQL、读取 PDF 和电子表格等 Skill，团队也能把自己的 Skill 打包成 .zip 上传；每个项目可以各自决定要开启哪些 Skill。',
      's03.rej.body': '我也刻意不让 agent 把推断出来的内容直接发布。Knowledge 是整个团队共用的，一旦设定错误，就会悄悄影响每个人的答案；多一次「发布」的点击，换来的是每一条规则都经过确认。',
      's03.split': '对话让任何人都能开始建立 Knowledge，但它写出来的仍是一个需要有人负责的文件：审核内容、在业务改变时修正，并在 POC 期间替客户建好。<span class="stat-hi-blue">需要一次看到全部、逐条比对和修改的工作，适合放在页面上；一问一答就能完成的事，才适合交给对话。</span>所以审核与修正，交给 Knowledge 页面来处理。',
      's04.title': '决策 2：让这个文件容易修正',
      's04.lede': '对话让建立 Knowledge 变得容易，但写进去的规则，最后还是要有人在页面上审核和修正：负责定义的人要确认内容，POC 期间我们自己的团队也得替客户整理。所以 Knowledge 页面好不好用，一样决定了团队能不能把 Knowledge 建完。',
      's04.v1.cap.t': 'v1 · 一张表格',
      's04.v1.cap.d': '最初的 Knowledge 页面是在 agent 还没出现时做的，是一张传统的设置表格：只有 Question-SQL pairs 和 Instructions 两种，一次新增一行。问题是它跟提问的当下脱节：答案出错时，用户得离开对话，到这个页面一条一条寻找修改，多数团队做到一半就放弃了。',
      's04.v2.cap.t': 'v2 · 一棵文件树',
      's04.v2.cap.d': 'CTO 用 vibe coding 把页面重写成一棵 markdown 文件树，分成 glossary、metrics、rules、sql 四个文件夹。这让 AI 更方便阅读和修改，对人却更难用：新增 Knowledge 就是打开一个空白文件，得自己知道该放哪个文件夹、该写成什么格式，没有任何引导。',
      's04.v4.cap.t': 'v4 · 修正后的版本',
      's04.v4.cap.d': '在不能重新设计的限制下，v4 只用文案和既有组件，把结构补回文件树：新增文件时先选类型，每种类型都用「遇到什么问题」来描述（「当一个数字没有大家同意的算法时使用」），每一组也说明 agent 怎么使用，空白文件则讲出它的代价；「Edit in form」沿用建立时的表单，让每个文件都能用结构或 markdown 两种方式修改。<span class="stat-hi">在最贴近营收的那一步上，工程成本趋近于零。</span>',
      's04.v4.cap.d2': '这跟我在 <a href="rezio.html#s04">KKday Rezio</a> 的做法一样。多数人没办法从零写出一个定义，但选得出来，所以先用一份简短的问卷问清楚是哪一种情况，再只摊开那种情况需要的字段，取代一次摊开所有字段的设置表单。在 Rezio，这让设置时间从 45 分钟降到 28 分钟。',
      's04.v4.vid1': '从头新增一个文件',
      's04.v4.vid2': '编辑既有的文件',
      's05.jC.body': '<p class="body">Skill 的制作与管理仍然是一个实际存在的界面：在这里上传，再到对话里试用。</p>',
      's05.jC.userJourney': '用户旅程',
      's05.jC.jUpload': '上传 Skill',
      's05.jC.jTry': '实际试用',
      's05.jC.play': '播放',
      's05.replay': '重播',
      'res.title': '成果与反思',
      'res.lede': '把建立 Knowledge 搬进对话之后，改变的是谁来建、建得多快。',
      'res.r1.label': '更多试用团队自己建立 Knowledge',
      'res.r1.body': '试用团队在第一周内建立 Knowledge 的比例，比上线前相对增长了约 <span class="stat-hi">15%</span>，过程中没有我们的人介入。这是早期信号，也是我盯得最紧的数字。',
      'res.r2.label': 'POC 不再卡在 Knowledge',
      'res.r2.body': '以前，光是 Knowledge，每次 POC 就要通过销售来回<span class="stat-hi">两到三周</span>。现在销售的反馈是：不必再事先把 Knowledge 建好，可以直接把产品交给客户，让客户自己建。干净的 after 数字还在收集中。',
      'res.r3.label': '对话优先的做法延伸到其他功能',
      'res.r3.body': 'Knowledge 以 Skill 的方式跑通之后，报告、分析、文档解析也跟着变成 Skill，全部从同一个对话框触发。在 A/B 测试中，通过对话建立 Knowledge 的比率上升了 <span class="stat-hi">42%</span>。一个月内，旧入口的使用量从每月几万次掉到只剩<span class="stat-hi">十分之一</span>，没有人要求改回去，早期反馈的赞与踩比例约为 <span class="stat-hi">4:1</span>。',
      'res.ds.label': '设计去配合工程的开发方式',
      'res.ds.body': '这个项目也改变了我对设计师角色的理解。工程用 AI 写代码，速度比任何设计流程都快；与其要工程等设计，不如让设计去适应他们的开发方式。所以我把设计系统写成 AI coding 工具能直接遵守的规则：工程用 AI 生成画面时，就会套用同一套组件、样式和交互，不需要另外开改版项目，界面也能持续稳定地产出。',
      'res.next.label': '接下来要解决的事',
      'res.next.body': '所有功能都收进对话框之后，就没有东西会自己现身。十几个按钮虽然难找，至少让人看得到产品能做什么。Skill 会持续增加，让用户一直找得到这些功能，是我接下来会处理的问题。',
      'res.close': '在跑得这么快的小团队里，设计师很少能等到一次完整的改版。我能做的，是挑出少数几个设计还能改变结果的地方，并在其他每一处守住体验的底线。',
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
