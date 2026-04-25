const I18N = {
    ja: {
      'nav.intro':'.イントロ','nav.s01':'01.背景','nav.s02':'02.2モード','nav.s03':'03.参考','nav.s04':'04.5つの設計判断','nav.s05':'05.どこにでも','nav.s06':'06.リリース',
      'title.big':'Embedded Threads：意思決定の現場に BI を持ち込む',
      'title.sub':'Notion のサイドバー、モバイルのボトムシート、393px のスマホ画面の中で、声を失わずに動く対話型 BI サーフェスをデザインする。',
      'intro.overview.label':'プロジェクト概要',
      'intro.overview.body':'Wren AI は対話型 BI プロダクトです。顧客が繰り返し求めていたのは、新しいタブを開くことではなく、<em>すでにいる場所でデータに質問できる</em>こと, ノートPC で開いた Notion のサイドバー、スマホのボトムシートモーダル、会議の合間の Tableau のパネル。<b>Embedded Threads</b> は、そうした場所に住むサーフェスとして私が設計しました, 1024px のデスクトップ分割から 393px のスマホ画面まで、Wren AI らしさを失わずに。',
      'intro.role.label':'担当','intro.role.body':'<span class="stat-hi">唯一のデザイナー。</span>組み込み体験を端から端まで担当, どう設定され、どの画面サイズに適応し、壊れたときに何を語り、誰かのプロダクトの中に住んだ後どう振る舞うか。',
      'intro.time.label':'会社・時期','intro.time.body':'Wren AI · 2026年2–3月 · 2 週間',
      's01.title':'BI はもうダッシュボードに住んでいない。意思決定が起きる場所に住む。',
      's01.lede':'自分のタブの中でしか開かない BI ツールは、ユーザーが忘れるツールです。Wren AI を本当に使ってくれた顧客は、すでに別のタスクの最中に Wren を呼び出せる人たち, 通勤中の電車で Notion のドキュメントを読み、会議の合間にスマホで社内ダッシュボードを確認し、スライドの合間に Tableau のパネルをチラ見する。組み込みは "あれば嬉しい" ではなく、ユーザーが覚えているツールと忘れるツールの境目でした。',
      's01.pill1':'対象 · Notion · モバイルダッシュボード · Tableau','s01.pill2':'画面サイズ · 393 → 1024px+','s01.pill3':'リリース · Wren 2.0 · 2026年3月','s01.pill4':'制約 · 2週間でリリース',
      's01.why.label':'デザインしていた行動','s01.why.body':'最も明確なシグナルは、ユーザーがデータに質問するときの実際の状況でした。みんなデスクの前にはいない。通勤中はスマホで、会議室ではタブレットで、ノート PC では他のタブが 3 つ開いた状態で。組み込みは <span class="stat-hi">チラッと見て、一度だけ聞き、行動できる</span> サーフェスでなければならない, ホストプロダクトを離れた感覚なしに。',
      's01.bet.label':'デザインの賭け','s01.bet.body':'Embedded Threads を、メインアプリの縮小版ではなく、独自のサーフェスとして扱う。つまり制約から内側へ設計する, 393px のスマホ幅、コンテンツの上にせり上がるボトムシート、ホストページの幅の 30% を超えないサイドバー。<em>393 で動けば、他のサイズでも動く。1024 でしか動かなければ、意味がない。</em>',
      's01.frame.body':'<b>枠組みの問い、</b>ユーザーはこれを尋ねるとき、どこにいるのか? どんなデータモデルが必要か、どんな権限を持つべきかではなく、<span class="stat-hi">物理的にどこで、どの画面で、どれだけ注意を払って</span>。これに最初に答えると、それ以降の判断がすべて並び替わりました。',
      's02.title':'2 つのモード, 人がどう組み込むかから設計した',
      's02.lede':'誘惑は、すべてを処理する 1 つの "賢い" モードを作ることでした。規律は、それを断ること。それぞれが実際の行動に紐づいた 2 つの明快なサーフェス, ドキュメントに貼るか、ログインして自分の履歴を見るか。',
      's02.m1.eyebrow':'モード01 · パブリック','s02.m1.title':'パブリック埋め込み',
      's02.m1.body':'共有チャット。ページを開いた誰もが同じスレッドを見る, Notion ページ、公開ドキュメント、マーケティングサイトに最適。',
      's02.m1.k1':'最適','s02.m1.v1':'Notion サイドバー、Tableau パネル、公開ドキュメント',
      's02.m1.k2':'ユーザー体験','s02.m1.v2':'1 つの共有スレッド。全員が同じ会話を読む。',
      's02.m1.k3':'セットアップ','s02.m1.v3':'トグル ON。コピー。ペースト。1 分以内。',
      's02.m1.k4':'デフォルト','s02.m1.v4':'<b>OFF。</b>偶発的にデータが漏れる状態で出荷しない。',
      's02.m2.eyebrow':'モード02 · アイデンティティ検証','s02.m2.title':'アイデンティティ検証埋め込み',
      's02.m2.body':'パーソナルチャット。組み込みがロードされたとき、ホストプロダクトがユーザーが誰かを引き渡すので、各人は自分の履歴だけを見る。',
      's02.m2.k1':'最適','s02.m2.v1':'モバイルダッシュボード、社内 SaaS、ログインを伴うすべて',
      's02.m2.k2':'ユーザー体験','s02.m2.v2':'自分のスレッド、自分の履歴。他人のものは見えない。',
      's02.m2.k3':'セットアップ','s02.m2.v3':'もう少し手間がかかる, ホストプロダクトがユーザーの ID を渡す。',
      's02.m2.k4':'なぜ分けたか','s02.m2.v4':'Notion ドキュメントの共有埋め込みと、ログイン済みのモバイルダッシュボードのパーソナル埋め込みは別のプロダクト。同じふりをすれば両方が悪くなる。',
      's02.frame.body':'<b>トレードオフを命名することが仕事だった。</b>2 つを統合<em>しない</em>と決めるのに、午後を 1 つ使いました。Public と Identity それぞれに名前とデフォルトが付くと、後続のすべての問い, 誰もログインしていないときに何を見せる、いつスレッドをリフレッシュする、空状態で何を言う, に明らかな答えがありました。<span class="stat-hi">モデルの曖昧さは、後で UI で支払うコスト。</span>',
      's03.title':'まずご近所を観察してから、何を真似しないかを決めた',
      's03.lede':'埋め込み型アナリティクスは新しい領域ではありません。Figma を開く前に Metabase、Tableau、Power BI と一週間過ごしました, どれも真似するためではなく、業界が収束している点と、まだ簡素化できる点を知るために。',
      's03.r1.tag':'OSS のベンチマーク',
      's03.r1.body':'見えたもの：「ドキュメントに入れたい」から「動いている」までの摩擦が最も少ない。カテゴリで最もすっきりした初回体験。',
      's03.r1.take':'取り入れたもの：そのドロップイン感。顧客が v1 を試すのにドキュメントを 1 週間読まずに済むこと。',
      's03.r2.tag':'エンタープライズの金字塔',
      's03.r2.body':'見えたもの：すべての設定が露出し、すべての挙動がプログラム可能。強力だが重い。',
      's03.r2.take':'見送ったもの：プログラマブルなサーフェス。多くの顧客は SDK にコードを書くのではなく、Notion ページやモバイルダッシュボードに組み込みを落としたいだけ。',
      's03.r3.tag':'Microsoft エコシステム',
      's03.r3.body':'見えたもの：認証とデータ権限を別の関心事として扱う。概念的にはエレガント。',
      's03.r3.take':'v2 に保留：その 2 層の分離。v1 の顧客には 1 層で十分, 2 層目は価値ではなく設計のオーバーヘッド。',
      's03.takeaway.body':'<b>持ち帰った原則、</b>業界が合意していることはやる、業界がやり過ぎていることはやらない。<span class="stat-hi">「スニペットをコピペすれば動く」</span>が v1 のバーになり、その一文がそれ以降のすべての埋め込み設定画面を形作りました。',
      's04.title':'並行で走る 5 つのデザイン判断',
      's04.lede':'モードを選ぶのは最初の一歩。その下に同時に着地させる 5 つの設計問題が並んでいた, 利用上限、アクティビティの記録、ブランドのカスタマイズ、メインアプリから何を隠すか、壊れたときの語り方。それぞれにエッジケースがあり、それぞれが他社プロダクトの中で「住人」のように見える必要がありました。',
      's04.f1.eyebrow':'01 · 利用上限','s04.f1.title':'組み込みが一晩で月予算を燃やさないように',
      's04.f1.body':'すべての質問は顧客にとってコストです。上限がなければ、クライアントのページの 1 つのバグが午後のうちに月予算を尽きさせかねない。<span class="stat-hi">プロジェクトごとのデフォルト上限、月初に自動リセット</span>を設定し、上限超過状態をエラーではなく <em>読み取り専用</em> にしました：スレッドは見えたまま、誰も質問できないだけ。<b>組み込みが顧客の前で空白にならない。</b>',
      's04.f1.s1.label':'スコープ','s04.f1.s1.foot':'ユーザー単位ではなくプロジェクト単位。請求対象はプロジェクト。',
      's04.f1.s2.label':'デフォルト上限','s04.f1.s2.foot':'デモが本物に感じる程度、害が出ない程度。',
      's04.f1.s3.label':'リセット','s04.f1.s3.foot':'毎月 1 日、自動。',
      's04.f1.s4.label':'上限超過','s04.f1.s4.foot':'スレッドは表示、質問は無効。決して空白にしない。',
      's04.f2.eyebrow':'02 · アクティビティログ','s04.f2.title':'誰が、何を、いつ、いくらで',
      's04.f2.body':'組み込みはメインアプリの外で動きますが、Project Owner は明らかな質問に答える必要があります, <em>誰が、いつ、いくらかけて、何を聞いたか</em>, コンプライアンス、デバッグ、課金のために。Project Owner にとって本当に意味のあるアクションだけにログのスコープを絞りました, <span class="stat-hi">役に立つ程度に多く、ノイズにならない程度に少なく</span>。',
      's04.f2.l1':'<b>スレッドを作成、</b>それを開いた最初の質問とともに',
      's04.f2.l2':'<b>追加質問をした、</b>誰がどの会話を続けたか',
      's04.f2.l3':'<b>スレッドを削除、</b>誰が、いつ',
      's04.f2.l4':'<b>埋め込み設定を変更、</b>誰が何をトグルしたか（モード、ブランド、上限）',
      's04.f2.l5':'<b>アクセスキーをローテート、</b>ライブセッションが切れないよう意図的な猶予期間付き',
      's04.f2.note.body':'<b>残せてよかった小さな判断。</b>ログ内のスレッドタイトルは、組み込みスレッドに対しては<em>クリック不可</em>。理由をツールチップで説明します。クリックするとメインアプリが開き、組み込みが意図的に隠したサーフェスを露出してしまう。<span class="stat-hi">ログは記録であって、裏口ではない。</span>',
      's04.f3.eyebrow':'03 · ブランドカスタマイズ','s04.f3.title':'住人に見えるだけ、それ以上は渡さない',
      's04.f3.body':'組み込みはホストプロダクトの一部に見える必要がありますが、何かが壊れたときにユーザーが Wren AI だと認識できる必要もある。カスタマイズ可能なサーフェスを 4 つに絞りました：ロゴ、チャットアイコン、プライマリカラー、表示名。それ以外はデフォルトを継承。<span class="stat-hi">「これも変えていいですよ」が増えるたびに、顧客の午後にセットアップタスクが追加されている</span>, サーフェスを小さく保つことは制限ではなく、礼儀でした。',
      's04.f3.l1':'<b>会社ロゴ、</b>iframe ヘッダーに表示',
      's04.f3.l2':'<b>チャットアイコン、</b>各応答の AI アバター',
      's04.f3.l3':'<b>テーマカラー、</b>プライマリアクセント、ホスト準拠',
      's04.f3.l4':'<b>表示名、</b>組み込みが UI コピー内で自身を呼ぶ名前',
      's04.f3.l5':'<b>レスポンシブレイアウト、</b>Notion サイドバーからスマホのボトムシート、フルページ iframe まで',
      's04.f3.rwd.label':'RWD プレイグラウンド, 角をドラッグして崩れ方を見る',
      's04.f3.rwd.body':'同じ組み込みが、Notion サイドバー（〜393px）、スマホのボトムシート（〜768px）、フルページ iframe（〜1024px+）で動く必要があります。明示的な <span class="stat-hi">折り畳み優先順位</span> を設計しました, スレッドリストが最初、次にフォローアップチップ、最後にチャートが縮む。<em>モバイルファーストはデスクトップを縮めたものではない。逆です, 393 を最初に正しくし、広いサイズはその余分なスペースを稼ぐ。</em>',
      's04.rwd.preset.mobile':'モバイル · 393','s04.rwd.preset.tablet':'タブレット · 768','s04.rwd.preset.desktop':'デスクトップ · 1024',
      's04.rwd.hint':'↘ 角をドラッグ',
      's04.rwd.mock.threads':'スレッド (2)','s04.rwd.mock.new':'新規','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'注文数が最も多いトップ3の都市はどれ?',
      's04.rwd.mock.q':'注文数が最も多いトップ3の都市はどれ?',
      's04.rwd.mock.userq':'製品は何個ありますか?',
      's04.rwd.mock.patience':'少々お待ちください, リクエストを処理しています!',
      's04.rwd.mock.show':'思考ステップを表示',
      's04.rwd.mock.step1':'関連する Question-SQL ペアが見つかりませんでした',
      's04.rwd.mock.step2':'関連する SQL クエリ指示が見つかりませんでした',
      's04.rwd.mock.step3':'ユーザー意図を認識しました',
      's04.rwd.mock.step4':'9 個の候補モデルが見つかりました',
      's04.rwd.mock.step5a':'思考時間：','s04.rwd.mock.step6a':'SQL 生成時間：','s04.rwd.mock.step7a':'最大 500 行をフェッチ：',
      's04.rwd.mock.dp':'データプレビュー','s04.rwd.mock.dpq':'products データセットに製品は何件ありますか?','s04.rwd.mock.view':'データを見る',
      's04.rwd.mock.chart':'都市別注文数 · トップ6',
      's04.rwd.mock.answer':'製品カタログには合計 32,951 件の製品があります。',
      's04.rwd.mock.ask':'データを探索するには質問を入力…',
      's04.rwd.dm.title':'棒グラフにラベルを追加','s04.rwd.dm.tab1':'データプレビュー','s04.rwd.dm.tab2':'チャート',
      's04.rwd.dm.c1':'都市','s04.rwd.dm.c2':'注文数','s04.rwd.dm.c3':'ランク',
      's04.rwd.dm.chart':'都市別注文数',
      's04.rwd.empty.title':'データについて知る','s04.rwd.empty.sub':'こんな質問をどうぞ...',
      's04.rwd.empty.tag1':'記述的な質問','s04.rwd.empty.q1':'各サプライヤーの生産量あたりの単価は?',
      's04.rwd.empty.tag2':'データ品質と一貫…','s04.rwd.empty.q2':'検査結果に合格した製品の平均不良率は…',
      's04.rwd.empty.tag3':'比較的な質問','s04.rwd.empty.q3':'ルート A の平均配送コストが低い輸送方法は…',
      's04.rwd.drawer.t1':'サンプル E','s04.rwd.drawer.t2':'サンプル H',
      's04.f4.eyebrow':'04 · ワークショップを隠す','s04.f4.title':'ツールではなく会話に読めるように',
      's04.f4.body':'メインの Wren AI アプリは多くを露出します, サジェストチップ、思考ステップ、候補モデル、クエリの出所。パワーユーザーには有用ですが、誰かの Notion ページに組み込みが落ちた瞬間にはノイズです。組み込みでは大半を隠し、他には渡していない 1 つだけを残しました, <span class="stat-hi">追加質問のサジェスト</span>。回答後にユーザーを動かし続ける最も低コストな手段で、技術的ではなく会話的に読まれます。<em>答えがどう作られたかに関するものは隠す、次に何を聞くかに関するものは残す。</em>',
      's04.f5.eyebrow':'05 · 壊れたときの語り方','s04.f5.title':'3 段階の重大度、1 つのルール、決して空白にしない',
      's04.f5.body':'組み込みは必ず壊れます, トークンは期限切れに、モデルはずれ、クォータは尽き、ユーザーは常にログインしていない。私が守ったルール：<span class="stat-hi">組み込みサーフェスは絶対に空白にならない、ユーザーは誰の責任かを必ず分かる</span>。障害を 3 段階に分け、それぞれ独自の UI 処理を与えました, 文言、アイコン、CTA が 15 個ではなく 1 つの判断から派生するように。',
      's04.f5.l1':'<b>フルページブロック、</b>組み込みがまったく動かせない。未ログイン、未設定、サービス停止。正直に、平易に、何が欠けていて誰が直せるかを正確に言う。',
      's04.f5.l2':'<b>読み取り専用、</b>見られるが使えない。クォータ枯渇、モデルがパースできない。スレッドは残る、入力は無効、説明は 1 行。',
      's04.f5.l3':'<b>スレッド内通知、</b>この質問は失敗したが会話は続く。データがマッチしない、クエリが走らない。バブル内に小さなメッセージ、ユーザーは次へ。',
      's04.f5.note.body':'<b>難しかったのは分類ではなく、文言。</b>「Something went wrong」では、組み込みが他社プロダクトの中で他社のユーザーの前にいるとき通用しません。すべての行が <em>何が起きたか、何ができるか、何を試すべきでないか</em> を言う必要があった。Wren AI が所有していない画面で代弁するということは、すべての言葉が効くということでした。',
      's05.title':'1 つの組み込み、どこにホストされていても',
      's05.lede':'Wren AI は 2 つのフレーバーで出荷されます, マネージドのクラウド版と、顧客が自社で動かすセルフホスト版。組み込みは両方で同じように振る舞う必要がありました。このセクションのデザイン作業の大半は、2 つのサーフェスを作ることではなく, 下層の差分を、組み込みを実際に使う人から見えなくすることでした。',
      's05.same.label':'両方で同じに保つもの',
      's05.same.body':'同じ設定画面。同じエラーメッセージ。393px の折り畳みを含む同じレスポンシブ挙動。<span class="stat-hi">組み込みを読むユーザーが、顧客がクラウドかセルフホストかを見分けられない</span>こと、両方を比較検討する顧客が 2 つの異なるプロダクトを学ばずに済むこと。',
      's05.diff.label':'意図的に違うもの',
      's05.diff.body':'セルフホストではこの機能が上位ライセンス層でゲートされるため、設定画面に「お使いのプランでは利用できません」状態が必要でした, <em>隠さず</em>（混乱を招く）、見えてロックされた状態で、明確な説明付き。同じアクティビティが環境ごとに 1 箇所だけに表示される, 2 つのビューに重複しないようにする, ここを正しく扱うのは予想以上に時間がかかりました。',
      's05.note.body':'<b>見えない整列。</b>一貫したユーザー体験は、バックエンドを同一にすることではなく、<span class="stat-hi">どの差分を隠し、どの差分を声に出すかを決めること</span>。間違ったほうを隠せば不誠実に見える。間違ったほうを名指せば散らかって見える。その線をどこに引くかが、このプロジェクトで最も長く考えた判断の 1 つでした。',
      's06.title':'リリース',
      's06.s1.label':'リリース','s06.s1.foot':'クラウドとセルフホスト、同日 · 2026年3月',
      's06.s2.label':'最小画面','s06.s2.foot':'モバイルファーストで設計、そこから上にスケール。',
      's06.s3.label':'モード','s06.s3.foot':'Public と Identity、統合せず命名。',
      's06.s4.label':'エラー状態','s06.s4.foot':'3 段階の重大度、1 つのルール、決して空白にしない。',
      'footer.back':'← ポートフォリオに戻る'
    },
    'zh-tw': {
      'nav.intro':'.簡介','nav.s01':'01.背景','nav.s02':'02.兩種模式','nav.s03':'03.業界參考','nav.s04':'04.五個設計判斷','nav.s05':'05.同一個嵌入','nav.s06':'06.上線',
      'title.big':'Embedded Threads:把 BI 帶到決策真正發生的地方',
      'title.sub':'設計一個會住進 Notion 側欄、行動底部彈窗、393px 手機螢幕的對話式 BI 介面, 而且不丟掉自己的聲音。',
      'intro.overview.label':'專案概述',
      'intro.overview.body':'Wren AI 是個對話式 BI 產品。客戶不斷提出來的需求,不是再多開一個分頁,而是希望能<em>在他們已經在的地方對資料提問</em>:筆電上的 Notion 側欄、手機上的底部彈窗 modal、會議之間 Tableau 儀表板裡的一個 panel。<b>Embedded Threads</b> 就是我為這些場景設計的介面,從 1024px 桌面分割視窗到 393px 手機螢幕,而不丟掉 Wren AI 的本質。',
      'intro.role.label':'我的角色','intro.role.body':'<span class="stat-hi">唯一的設計師。</span>我從頭到尾擁有這個嵌入體驗:它怎麼被設定、怎麼適應不同螢幕尺寸、出錯時怎麼說話、住進別人的產品後怎麼運作。',
      'intro.time.label':'公司・時間','intro.time.body':'Wren AI · 2026年2–3月 · 兩週',
      's01.title':'BI 已經不住在儀表板裡了。它住在決策發生的地方。',
      's01.lede':'一個只在自己分頁裡打開的 BI 工具,是個會被遺忘的工具。真正使用 Wren AI 的客戶,是那些可以邊做事邊把 Wren 叫出來的人, 通勤路上在火車上讀 Notion 文件、會議中用手機看內部儀表板、簡報空檔瞄一眼 Tableau 面板。嵌入不是 nice-to-have,而是「會被記得的工具」與「不會被記得的工具」之間的分水嶺。',
      's01.pill1':'介面 · Notion · 行動儀表板 · Tableau','s01.pill2':'螢幕尺寸 · 393 → 1024px+','s01.pill3':'版本 · Wren 2.0 · 2026年3月','s01.pill4':'限制 · 2 週上線',
      's01.why.label':'我在為什麼樣的行為而設計','s01.why.body':'最清楚的訊號,是我看著大家實際在問資料問題的方式。沒有人坐在自己桌前。是通勤中拿著手機,是會議室裡開著平板,是另外三個分頁同時打開的筆電。嵌入必須是一個能讓人 <span class="stat-hi">瞄一眼、問一次、付諸行動</span> 的介面, 而且過程中不會覺得自己離開了宿主產品。',
      's01.bet.label':'設計上的賭注','s01.bet.body':'把 Embedded Threads 當成自己的介面,而不是主 App 的縮小版。也就是說,從限制往內設計:393px 的手機寬度、會從內容上方滑出的底部彈窗、寬度永遠不超過宿主頁面 30% 的側欄。<em>如果在 393 上能用,在其他地方也會能用。如果只在 1024 上能用,那就沒有意義。</em>',
      's01.frame.body':'<b>定錨的問題、</b>使用者問這題的時候,人會在哪裡? 不是他需要哪個資料模型,不是他應該擁有哪些權限,而是 <span class="stat-hi">人在哪裡、用什麼螢幕、有多少注意力</span>。先答好這題,後面所有判斷都重新排序了。',
      's02.title':'兩種模式,從人怎麼嵌入往回設計',
      's02.lede':'誘惑是做一個「聰明」的單一模式,自己處理所有情境。紀律是拒絕。兩個清楚的介面,各自綁著一種真實行為, 丟進文件,或登入後看自己的歷史。',
      's02.m1.eyebrow':'模式01 · 公開','s02.m1.title':'公開嵌入',
      's02.m1.body':'共享聊天。任何打開頁面的人看到的都是同一批 thread, 適合 Notion 頁面、公開文件、行銷網站。',
      's02.m1.k1':'最適合','s02.m1.v1':'Notion 側欄、Tableau 面板、公開文件',
      's02.m1.k2':'使用者看到什麼','s02.m1.v2':'同一條共享 thread。所有人讀同一份對話。',
      's02.m1.k3':'設定','s02.m1.v3':'打開開關。複製。貼上。一分鐘內。',
      's02.m1.k4':'預設','s02.m1.v4':'<b>關閉。</b>嵌入永遠不會在「可能不小心漏資料」的狀態下出貨。',
      's02.m2.eyebrow':'模式02 · 身份驗證','s02.m2.title':'身份驗證嵌入',
      's02.m2.body':'個人聊天。嵌入載入時,宿主產品會把使用者是誰交過來,所以每個人只看到自己的歷史。',
      's02.m2.k1':'最適合','s02.m2.v1':'行動儀表板、內部 SaaS、任何有登入的產品',
      's02.m2.k2':'使用者看到什麼','s02.m2.v2':'自己的 thread、自己的歷史。看不到別人的。',
      's02.m2.k3':'設定','s02.m2.v3':'多一點手續, 宿主產品要把使用者身份傳進來。',
      's02.m2.k4':'為什麼分開','s02.m2.v4':'Notion 文件裡的共享嵌入,跟登入後行動儀表板裡的個人嵌入,是兩個不同的產品。假裝它們一樣,只會讓兩邊都變糟。',
      's02.frame.body':'<b>把取捨命名出來才是真正的工作。</b>一整個下午就花在決定<em>不</em>把這兩個合併。Public 和 Identity 各自有了名字跟預設之後,後面所有的問題, 沒人登入時要顯示什麼、什麼時候 thread 要重新整理、空狀態要說什麼, 都自動有了答案。<span class="stat-hi">模型上的曖昧,代價會在 UI 上付出。</span>',
      's03.title':'先觀察鄰居,再決定哪些不要照抄',
      's03.lede':'嵌入式分析不是新事物。打開 Figma 之前,我花了一週把 Metabase、Tableau、Power BI 全用過一遍, 不是為了照抄,而是要看清業界在哪裡收斂、哪裡還能再簡化。',
      's03.r1.tag':'開源指標',
      's03.r1.body':'我看到的:從「我想把這個放進文件」到「跑起來了」摩擦最小的路徑。整個品類裡最俐落的初次體驗。',
      's03.r1.take':'我帶走的:那種 drop-in 的感覺。客戶不該為了試 v1 先讀一週的文件。',
      's03.r2.tag':'企業金字塔',
      's03.r2.body':'我看到的:每個設定都暴露,每個行為都可程式化。強大,但很重。',
      's03.r2.take':'我跳過的:可程式化的介面。我們大多數客戶想要的是把嵌入丟進 Notion 頁面或行動儀表板,不是去寫程式串 SDK。',
      's03.r3.tag':'Microsoft 生態',
      's03.r3.body':'我看到的:把身份驗證跟資料權限當成兩個獨立的議題。概念上很漂亮。',
      's03.r3.take':'我留給 v2:那個雙層拆分。對 v1 客戶來說一層就夠, 第二層是設計成本,不是價值。',
      's03.takeaway.body':'<b>我帶走的原則、</b>業界同意的事去做,業界做過頭的事不要做。<span class="stat-hi">「複製貼上一段 snippet 就跑得起來」</span>成了 v1 的門檻,這一句話形塑了之後所有的嵌入設定畫面。',
      's04.title':'五個並行的設計判斷',
      's04.lede':'選模式只是第一步。底下還躺著五個必須同時落地的設計問題, 用量上限、活動紀錄、品牌客製、要從主 App 隱藏什麼、出錯時怎麼說話。每個都有自己的邊界情境,每個在別人的產品裡都得像個本地住戶。',
      's04.f1.eyebrow':'01 · 用量上限','s04.f1.title':'別讓嵌入一夜燒掉一個月的預算',
      's04.f1.body':'每個提問都讓客戶花錢。沒有上限的話,客戶頁面上的一個 bug 可能在一個下午就把月預算抽乾。我設定了 <span class="stat-hi">每個 project 的預設天花板,每月 1 號自動重置</span>,並且讓超額狀態變成 <em>唯讀</em> 而不是錯誤畫面:thread 還能看,只是沒人能問。<b>嵌入不會在某個客戶的客戶面前變成空白。</b>',
      's04.f1.s1.label':'作用範圍','s04.f1.s1.foot':'依 project,不是依 user。Project 才是計費對象。',
      's04.f1.s2.label':'預設上限','s04.f1.s2.foot':'夠 demo 看起來真實,不夠造成傷害。',
      's04.f1.s3.label':'重置','s04.f1.s3.foot':'每月 1 號,自動。',
      's04.f1.s4.label':'超額狀態','s04.f1.s4.foot':'Thread 仍可看,發問停用。永遠不空白。',
      's04.f2.eyebrow':'02 · 活動紀錄','s04.f2.title':'誰問了什麼、什麼時候、花多少',
      's04.f2.body':'嵌入跑在主 App 之外,但 Project Owner 還是得回答最基本的問題, <em>誰、什麼時候、花了多少、問了什麼</em>, 給法遵、給除錯、給計費。我把 log 收斂到對 project owner 真正有意義的動作, <span class="stat-hi">夠用,但不到變成噪音</span>。',
      's04.f2.l1':'<b>建立了 thread、</b>連同打開它的第一個問題',
      's04.f2.l2':'<b>問了追問、</b>誰繼續了哪一段對話',
      's04.f2.l3':'<b>刪除了 thread、</b>誰、什麼時候',
      's04.f2.l4':'<b>改了嵌入設定、</b>誰開關了什麼(模式、品牌、上限)',
      's04.f2.l5':'<b>輪替了存取金鑰、</b>留刻意的緩衝期,讓活著的 session 不會中斷',
      's04.f2.note.body':'<b>還好我堅持的一個小決定。</b>Log 裡的 thread 標題對嵌入 thread <em>不可點擊</em>,tooltip 解釋為什麼。點下去會打開主 App,把嵌入特意藏起來的介面曝光。<span class="stat-hi">Log 是紀錄,不是後門。</span>',
      's04.f3.eyebrow':'03 · 品牌客製','s04.f3.title':'剛好夠像個本地住戶,不能再多',
      's04.f3.body':'嵌入要看起來屬於宿主產品,但出錯的時候,使用者必須能認出這是 Wren AI。我把可客製的介面收斂到四件事:logo、chat icon、主題色、display name。其餘沿用預設。<span class="stat-hi">每多一個「對,這個你也可以改」,就是你給客戶的下午多加一項設定工作</span>, 把介面留小,是禮貌,不是限制。',
      's04.f3.l1':'<b>公司 Logo、</b>顯示在 iframe 標頭',
      's04.f3.l2':'<b>Chat Icon、</b>每次回應的 AI 頭像',
      's04.f3.l3':'<b>主題色、</b>主要強調色,跟隨宿主產品',
      's04.f3.l4':'<b>Display Name、</b>嵌入在 UI 文案中怎麼稱呼自己',
      's04.f3.l5':'<b>RWD、</b>從 Notion 側欄到手機底部彈窗到全頁 iframe 都撐得住',
      's04.f3.rwd.label':'RWD 互動區, 拖右下角看它怎麼坍縮',
      's04.f3.rwd.body':'同一個嵌入必須住在 Notion 側欄(~393px)、手機底部彈窗(~768px)、全頁 iframe(~1024px+)。我設計了明確的 <span class="stat-hi">坍縮優先順序</span>, thread 列表先消失,接著追問 chips,最後 chart 縮小。<em>Mobile-first 不是把桌面變小。剛好相反, 先把 393 弄對,寬一點的尺寸再去贏得它的多餘空間。</em>',
      's04.rwd.preset.mobile':'行動 · 393','s04.rwd.preset.tablet':'平板 · 768','s04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖曳角落',
      's04.rwd.mock.threads':'Threads (2)','s04.rwd.mock.new':'新增','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'訂單數最多的前三個城市是哪些?',
      's04.rwd.mock.q':'訂單數最多的前三個城市是哪些?',
      's04.rwd.mock.userq':'有多少產品?',
      's04.rwd.mock.patience':'請稍候, 正在處理你的請求!',
      's04.rwd.mock.show':'顯示思考步驟',
      's04.rwd.mock.step1':'找不到相關的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相關的 SQL query 指令',
      's04.rwd.mock.step3':'已辨識使用者意圖',
      's04.rwd.mock.step4':'找到 9 個候選模型',
      's04.rwd.mock.step5a':'思考時間','s04.rwd.mock.step6a':'SQL 語句生成','s04.rwd.mock.step7a':'抓取最多 500 筆資料',
      's04.rwd.mock.dp':'資料預覽','s04.rwd.mock.dpq':'products 資料集中有多少產品?','s04.rwd.mock.view':'查看資料',
      's04.rwd.mock.chart':'各城市訂單 · 前六名',
      's04.rwd.mock.answer':'產品目錄裡總共有 32,951 筆產品。',
      's04.rwd.mock.ask':'輸入問題來探索你的資料…',
      's04.rwd.dm.title':'在長條圖加上標籤','s04.rwd.dm.tab1':'資料預覽','s04.rwd.dm.tab2':'圖表',
      's04.rwd.dm.c1':'城市','s04.rwd.dm.c2':'訂單數','s04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市訂單數',
      's04.rwd.empty.title':'更了解你的資料','s04.rwd.empty.sub':'試著問...',
      's04.rwd.empty.tag1':'描述性問題','s04.rwd.empty.q1':'每個供應商的生產量單位成本是多少?',
      's04.rwd.empty.tag2':'資料品質與一致…','s04.rwd.empty.q2':'通過檢驗結果的產品的平均不良率如何…',
      's04.rwd.empty.tag3':'比較性問題','s04.rwd.empty.q3':'哪些運輸方式在路線 A 上的平均運送成本較低…',
      's04.rwd.drawer.t1':'Sample E','s04.rwd.drawer.t2':'Sample H',
      's04.f4.eyebrow':'04 · 把工作間藏起來','s04.f4.title':'讓它讀起來像對話,不是工具',
      's04.f4.body':'主 Wren AI App 暴露了很多東西, 建議 chips、思考步驟、候選模型、查詢出處。對 power user 有用,對住進別人 Notion 頁面的嵌入是噪音。我在嵌入裡藏掉了大部分,留下了一樣別人沒有的, <span class="stat-hi">建議追問 (suggested follow-ups)</span>。這是回答之後讓使用者繼續動起來成本最低的方式,讀起來像對話,不像技術。<em>跟「答案怎麼算出來」有關的東西藏起來,跟「下一步要問什麼」有關的東西留下。</em>',
      's04.f5.eyebrow':'05 · 嵌入壞掉時怎麼說話','s04.f5.title':'三種嚴重度,一條規則,永遠不空白',
      's04.f5.body':'嵌入一定會壞, token 會過期、模型會漂移、額度會用完、使用者不見得有登入。我堅守的規則是:<span class="stat-hi">嵌入介面永遠不變空白,而且使用者永遠知道是誰的責任</span>。我把錯誤分成三個嚴重度,每個都有專屬的 UI 處理, 文案、icon、CTA 都從一個決定推下去,而不是分十五次決定。',
      's04.f5.l1':'<b>整頁阻斷、</b>嵌入完全跑不起來。沒登入、沒設定、服務掛了。誠實、白話,精準說出少了什麼、誰能修。',
      's04.f5.l2':'<b>唯讀、</b>嵌入可以看,但不能用。額度用完、模型解析失敗。Thread 還在,輸入框鎖住,解釋只一句話。',
      's04.f5.l3':'<b>對話內提示、</b>這個問題失敗,但對話可以繼續。沒有匹配資料、查詢跑不出來。Bubble 裡一個小提示,然後使用者繼續走。',
      's04.f5.note.body':'<b>難的不是分類,是文案。</b>「Something went wrong」放在別人的產品裡、別人的使用者面前是不及格的。每一行都得說清楚 <em>發生了什麼、他可以做什麼、他不該再試什麼</em>。在不屬於自己的螢幕上代表 Wren AI 說話,意味著每個字都有重量。',
      's05.title':'同一個嵌入,不管被誰托管',
      's05.lede':'Wren AI 同時出兩種版本, managed 雲端版、客戶自架版。嵌入在兩邊得有同樣的行為。這一節大部分的設計工作不是做兩個介面,而是讓底下的差異對實際在用嵌入的人來說隱形。',
      's05.same.label':'兩邊都一樣的部分',
      's05.same.body':'同一個設定畫面。同一套錯誤訊息。同一套 RWD 行為,包括 393px 的坍縮。<span class="stat-hi">使用者看著嵌入時,不該分得出客戶用的是雲端還是自架</span>;同時在評估兩邊的客戶,也不該被迫學兩套產品。',
      's05.diff.label':'故意不一樣的部分',
      's05.diff.body':'自架版把這個功能擋在更高的 license 層級之後,所以設定畫面需要一個體面的「你的方案沒有開」狀態, <em>不是隱藏</em>(會讓人困惑)而是顯示但鎖住,附上清楚的說明。同樣的活動,在每個環境裡只該出現在一個地方,不要在兩個檢視裡各記一次, 這部分比想像中更花時間才弄對。',
      's05.note.body':'<b>看不見的對齊。</b>一致的使用者體驗,不是讓後端長得一樣,而是 <span class="stat-hi">決定哪些差異要藏、哪些差異要大聲說出來</span>。藏錯了,看起來不誠實。說錯了,看起來雜亂。要把這條線畫在哪裡,是這個專案裡比較長的一個判斷。',
      's06.title':'上線',
      's06.s1.label':'版本','s06.s1.foot':'雲端與自架版同日上線 · 2026年3月',
      's06.s2.label':'最小螢幕','s06.s2.foot':'從行動端往上設計,寬螢幕再去贏得它的空間。',
      's06.s3.label':'模式','s06.s3.foot':'Public 與 Identity,各自命名,不合併。',
      's06.s4.label':'錯誤狀態','s06.s4.foot':'三種嚴重度,一條規則,永遠不空白。',
      'footer.back':'← 返回作品集'
    },
    'zh-cn': {
      'nav.intro':'.简介','nav.s01':'01.背景','nav.s02':'02.两种模式','nav.s03':'03.业界参考','nav.s04':'04.五个设计判断','nav.s05':'05.同一个嵌入','nav.s06':'06.上线',
      'title.big':'Embedded Threads:把 BI 带到决策真正发生的地方',
      'title.sub':'设计一个会住进 Notion 侧栏、移动底部弹窗、393px 手机屏幕的对话式 BI 界面, 而且不丢掉自己的声音。',
      'intro.overview.label':'项目概述',
      'intro.overview.body':'Wren AI 是个对话式 BI 产品。客户不断提出来的需求,不是再多开一个分页,而是希望能<em>在他们已经在的地方对数据提问</em>:笔电上的 Notion 侧栏、手机上的底部弹窗 modal、会议之间 Tableau 仪表板里的一个 panel。<b>Embedded Threads</b> 就是我为这些场景设计的界面,从 1024px 桌面分割视窗到 393px 手机屏幕,而不丢掉 Wren AI 的本质。',
      'intro.role.label':'我的角色','intro.role.body':'<span class="stat-hi">唯一的设计师。</span>我从头到尾拥有这个嵌入体验:它怎么被设定、怎么适应不同屏幕尺寸、出错时怎么说话、住进别人的产品后怎么运作。',
      'intro.time.label':'公司・时间','intro.time.body':'Wren AI · 2026年2–3月 · 两周',
      's01.title':'BI 已经不住在仪表板里了。它住在决策发生的地方。',
      's01.lede':'一个只在自己分页里打开的 BI 工具,是个会被遗忘的工具。真正使用 Wren AI 的客户,是那些可以边做事边把 Wren 叫出来的人, 通勤路上在火车上读 Notion 文档、会议中用手机看内部仪表板、汇报空挡瞄一眼 Tableau 面板。嵌入不是 nice-to-have,而是"会被记得的工具"与"不会被记得的工具"之间的分水岭。',
      's01.pill1':'界面 · Notion · 移动仪表板 · Tableau','s01.pill2':'屏幕尺寸 · 393 → 1024px+','s01.pill3':'版本 · Wren 2.0 · 2026年3月','s01.pill4':'约束 · 2 周上线',
      's01.why.label':'我在为什么样的行为而设计','s01.why.body':'最清楚的信号,是我看着大家实际在问数据问题的方式。没有人坐在自己桌前。是通勤中拿着手机,是会议室里开着平板,是另外三个分页同时打开的笔电。嵌入必须是一个能让人 <span class="stat-hi">瞄一眼、问一次、付诸行动</span> 的界面, 而且过程中不会觉得自己离开了宿主产品。',
      's01.bet.label':'设计上的赌注','s01.bet.body':'把 Embedded Threads 当成自己的界面,而不是主 App 的缩小版。也就是说,从限制往内设计:393px 的手机宽度、会从内容上方滑出的底部弹窗、宽度永远不超过宿主页面 30% 的侧栏。<em>如果在 393 上能用,在其他地方也会能用。如果只在 1024 上能用,那就没有意义。</em>',
      's01.frame.body':'<b>定锚的问题、</b>用户问这题的时候,人会在哪里? 不是他需要哪个数据模型,不是他应该拥有哪些权限,而是 <span class="stat-hi">人在哪里、用什么屏幕、有多少注意力</span>。先答好这题,后面所有判断都重新排序了。',
      's02.title':'两种模式,从人怎么嵌入往回设计',
      's02.lede':'诱惑是做一个"聪明"的单一模式,自己处理所有情境。纪律是拒绝。两个清楚的界面,各自绑着一种真实行为, 丢进文档,或登录后看自己的历史。',
      's02.m1.eyebrow':'模式01 · 公开','s02.m1.title':'公开嵌入',
      's02.m1.body':'共享聊天。任何打开页面的人看到的都是同一批 thread, 适合 Notion 页面、公开文档、营销网站。',
      's02.m1.k1':'最适合','s02.m1.v1':'Notion 侧栏、Tableau 面板、公开文档',
      's02.m1.k2':'用户看到什么','s02.m1.v2':'同一条共享 thread。所有人读同一份对话。',
      's02.m1.k3':'设置','s02.m1.v3':'打开开关。复制。粘贴。一分钟内。',
      's02.m1.k4':'默认','s02.m1.v4':'<b>关闭。</b>嵌入永远不会在"可能不小心漏数据"的状态下出货。',
      's02.m2.eyebrow':'模式02 · 身份验证','s02.m2.title':'身份验证嵌入',
      's02.m2.body':'个人聊天。嵌入加载时,宿主产品会把用户是谁交过来,所以每个人只看到自己的历史。',
      's02.m2.k1':'最适合','s02.m2.v1':'移动仪表板、内部 SaaS、任何有登录的产品',
      's02.m2.k2':'用户看到什么','s02.m2.v2':'自己的 thread、自己的历史。看不到别人的。',
      's02.m2.k3':'设置','s02.m2.v3':'多一点手续, 宿主产品要把用户身份传进来。',
      's02.m2.k4':'为什么分开','s02.m2.v4':'Notion 文档里的共享嵌入,跟登录后移动仪表板里的个人嵌入,是两个不同的产品。假装它们一样,只会让两边都变糟。',
      's02.frame.body':'<b>把取舍命名出来才是真正的工作。</b>一整个下午就花在决定<em>不</em>把这两个合并。Public 和 Identity 各自有了名字跟默认之后,后面所有的问题, 没人登录时要显示什么、什么时候 thread 要刷新、空状态要说什么, 都自动有了答案。<span class="stat-hi">模型上的暧昧,代价会在 UI 上付出。</span>',
      's03.title':'先观察邻居,再决定哪些不要照抄',
      's03.lede':'嵌入式分析不是新事物。打开 Figma 之前,我花了一周把 Metabase、Tableau、Power BI 全用过一遍, 不是为了照抄,而是要看清业界在哪里收敛、哪里还能再简化。',
      's03.r1.tag':'开源标杆',
      's03.r1.body':'我看到的:从"我想把这个放进文档"到"跑起来了"摩擦最小的路径。整个品类里最利落的初次体验。',
      's03.r1.take':'我带走的:那种 drop-in 的感觉。客户不该为了试 v1 先读一周的文档。',
      's03.r2.tag':'企业金字塔',
      's03.r2.body':'我看到的:每个设置都暴露,每个行为都可编程。强大,但很重。',
      's03.r2.take':'我跳过的:可编程的界面。我们大多数客户想要的是把嵌入丢进 Notion 页面或移动仪表板,不是去写程序串 SDK。',
      's03.r3.tag':'Microsoft 生态',
      's03.r3.body':'我看到的:把身份验证跟数据权限当成两个独立的议题。概念上很漂亮。',
      's03.r3.take':'我留给 v2:那个双层拆分。对 v1 客户来说一层就够, 第二层是设计成本,不是价值。',
      's03.takeaway.body':'<b>我带走的原则、</b>业界同意的事去做,业界做过头的事不要做。<span class="stat-hi">"复制粘贴一段 snippet 就跑得起来"</span>成了 v1 的门槛,这一句话形塑了之后所有的嵌入设置画面。',
      's04.title':'五个并行的设计判断',
      's04.lede':'选模式只是第一步。底下还躺着五个必须同时落地的设计问题, 用量上限、活动记录、品牌定制、要从主 App 隐藏什么、出错时怎么说话。每个都有自己的边界情境,每个在别人的产品里都得像个本地住户。',
      's04.f1.eyebrow':'01 · 用量上限','s04.f1.title':'别让嵌入一夜烧掉一个月的预算',
      's04.f1.body':'每个提问都让客户花钱。没有上限的话,客户页面上的一个 bug 可能在一个下午就把月预算抽干。我设置了 <span class="stat-hi">每个 project 的默认天花板,每月 1 号自动重置</span>,并且让超额状态变成 <em>只读</em> 而不是错误画面:thread 还能看,只是没人能问。<b>嵌入不会在某个客户的客户面前变成空白。</b>',
      's04.f1.s1.label':'作用范围','s04.f1.s1.foot':'依 project,不是依 user。Project 才是计费对象。',
      's04.f1.s2.label':'默认上限','s04.f1.s2.foot':'够 demo 看起来真实,不够造成伤害。',
      's04.f1.s3.label':'重置','s04.f1.s3.foot':'每月 1 号,自动。',
      's04.f1.s4.label':'超额状态','s04.f1.s4.foot':'Thread 仍可看,发问停用。永远不空白。',
      's04.f2.eyebrow':'02 · 活动记录','s04.f2.title':'谁问了什么、什么时候、花多少',
      's04.f2.body':'嵌入跑在主 App 之外,但 Project Owner 还是得回答最基本的问题, <em>谁、什么时候、花了多少、问了什么</em>, 给合规、给 debug、给计费。我把 log 收敛到对 project owner 真正有意义的动作, <span class="stat-hi">够用,但不到变成噪音</span>。',
      's04.f2.l1':'<b>建立了 thread、</b>连同打开它的第一个问题',
      's04.f2.l2':'<b>问了追问、</b>谁继续了哪一段对话',
      's04.f2.l3':'<b>删除了 thread、</b>谁、什么时候',
      's04.f2.l4':'<b>改了嵌入设置、</b>谁开关了什么(模式、品牌、上限)',
      's04.f2.l5':'<b>轮替了访问密钥、</b>留刻意的缓冲期,让活着的 session 不会中断',
      's04.f2.note.body':'<b>还好我坚持的一个小决定。</b>Log 里的 thread 标题对嵌入 thread <em>不可点击</em>,tooltip 解释为什么。点下去会打开主 App,把嵌入特意藏起来的界面曝光。<span class="stat-hi">Log 是记录,不是后门。</span>',
      's04.f3.eyebrow':'03 · 品牌定制','s04.f3.title':'刚好够像个本地住户,不能再多',
      's04.f3.body':'嵌入要看起来属于宿主产品,但出错的时候,用户必须能认出这是 Wren AI。我把可定制的界面收敛到四件事:logo、chat icon、主题色、display name。其余沿用默认。<span class="stat-hi">每多一个"对,这个你也可以改",就是你给客户的下午多加一项设置工作</span>, 把界面留小,是礼貌,不是限制。',
      's04.f3.l1':'<b>公司 Logo、</b>显示在 iframe 标头',
      's04.f3.l2':'<b>Chat Icon、</b>每次回应的 AI 头像',
      's04.f3.l3':'<b>主题色、</b>主要强调色,跟随宿主产品',
      's04.f3.l4':'<b>Display Name、</b>嵌入在 UI 文案中怎么称呼自己',
      's04.f3.l5':'<b>RWD、</b>从 Notion 侧栏到手机底部弹窗到全页 iframe 都撑得住',
      's04.f3.rwd.label':'RWD 互动区, 拖右下角看它怎么坍缩',
      's04.f3.rwd.body':'同一个嵌入必须住在 Notion 侧栏(~393px)、手机底部弹窗(~768px)、全页 iframe(~1024px+)。我设计了明确的 <span class="stat-hi">坍缩优先级</span>, thread 列表先消失,接着追问 chips,最后 chart 缩小。<em>Mobile-first 不是把桌面变小。刚好相反, 先把 393 弄对,宽一点的尺寸再去赢得它的多余空间。</em>',
      's04.rwd.preset.mobile':'移动 · 393','s04.rwd.preset.tablet':'平板 · 768','s04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖拽角落',
      's04.rwd.mock.threads':'Threads (2)','s04.rwd.mock.new':'新增','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'订单数最多的前三个城市是哪些?',
      's04.rwd.mock.q':'订单数最多的前三个城市是哪些?',
      's04.rwd.mock.userq':'有多少产品?',
      's04.rwd.mock.patience':'请稍候, 正在处理你的请求!',
      's04.rwd.mock.show':'显示思考步骤',
      's04.rwd.mock.step1':'找不到相关的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相关的 SQL query 指令',
      's04.rwd.mock.step3':'已识别用户意图',
      's04.rwd.mock.step4':'找到 9 个候选模型',
      's04.rwd.mock.step5a':'思考时间','s04.rwd.mock.step6a':'SQL 语句生成','s04.rwd.mock.step7a':'抓取最多 500 笔数据',
      's04.rwd.mock.dp':'数据预览','s04.rwd.mock.dpq':'products 数据集中有多少产品?','s04.rwd.mock.view':'查看数据',
      's04.rwd.mock.chart':'各城市订单 · 前六名',
      's04.rwd.mock.answer':'产品目录里总共有 32,951 笔产品。',
      's04.rwd.mock.ask':'输入问题来探索你的数据…',
      's04.rwd.dm.title':'在柱状图加上标签','s04.rwd.dm.tab1':'数据预览','s04.rwd.dm.tab2':'图表',
      's04.rwd.dm.c1':'城市','s04.rwd.dm.c2':'订单数','s04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市订单数',
      's04.rwd.empty.title':'更了解你的数据','s04.rwd.empty.sub':'试着问...',
      's04.rwd.empty.tag1':'描述性问题','s04.rwd.empty.q1':'每个供应商的生产量单位成本是多少?',
      's04.rwd.empty.tag2':'数据质量与一致…','s04.rwd.empty.q2':'通过检验结果的产品的平均不良率如何…',
      's04.rwd.empty.tag3':'比较性问题','s04.rwd.empty.q3':'哪些运输方式在路线 A 上的平均运送成本较低…',
      's04.rwd.drawer.t1':'Sample E','s04.rwd.drawer.t2':'Sample H',
      's04.f4.eyebrow':'04 · 把工作间藏起来','s04.f4.title':'让它读起来像对话,不是工具',
      's04.f4.body':'主 Wren AI App 暴露了很多东西, 建议 chips、思考步骤、候选模型、查询出处。对 power user 有用,对住进别人 Notion 页面的嵌入是噪音。我在嵌入里藏掉了大部分,留下了一样别人没有的, <span class="stat-hi">建议追问 (suggested follow-ups)</span>。这是回答之后让用户继续动起来成本最低的方式,读起来像对话,不像技术。<em>跟"答案怎么算出来"有关的东西藏起来,跟"下一步要问什么"有关的东西留下。</em>',
      's04.f5.eyebrow':'05 · 嵌入坏掉时怎么说话','s04.f5.title':'三种严重度,一条规则,永远不空白',
      's04.f5.body':'嵌入一定会坏, token 会过期、模型会漂移、额度会用完、用户不见得有登录。我坚守的规则是:<span class="stat-hi">嵌入界面永远不变空白,而且用户永远知道是谁的责任</span>。我把错误分成三个严重度,每个都有专属的 UI 处理, 文案、icon、CTA 都从一个决定推下去,而不是分十五次决定。',
      's04.f5.l1':'<b>整页阻断、</b>嵌入完全跑不起来。没登录、没设置、服务挂了。诚实、白话,精准说出少了什么、谁能修。',
      's04.f5.l2':'<b>只读、</b>嵌入可以看,但不能用。额度用完、模型解析失败。Thread 还在,输入框锁住,解释只一句话。',
      's04.f5.l3':'<b>对话内提示、</b>这个问题失败,但对话可以继续。没有匹配数据、查询跑不出来。Bubble 里一个小提示,然后用户继续走。',
      's04.f5.note.body':'<b>难的不是分类,是文案。</b>"Something went wrong"放在别人的产品里、别人的用户面前是不及格的。每一行都得说清楚 <em>发生了什么、他可以做什么、他不该再试什么</em>。在不属于自己的屏幕上代表 Wren AI 说话,意味着每个字都有重量。',
      's05.title':'同一个嵌入,不管被谁托管',
      's05.lede':'Wren AI 同时出两种版本, managed 云端版、客户自架版。嵌入在两边得有同样的行为。这一节大部分的设计工作不是做两个界面,而是让底下的差异对实际在用嵌入的人来说隐形。',
      's05.same.label':'两边都一样的部分',
      's05.same.body':'同一个设置画面。同一套错误信息。同一套 RWD 行为,包括 393px 的坍缩。<span class="stat-hi">用户看着嵌入时,不该分得出客户用的是云端还是自架</span>;同时在评估两边的客户,也不该被迫学两套产品。',
      's05.diff.label':'故意不一样的部分',
      's05.diff.body':'自架版把这个功能挡在更高的 license 层级之后,所以设置画面需要一个体面的"你的方案没有开"状态, <em>不是隐藏</em>(会让人困惑)而是显示但锁住,附上清楚的说明。同样的活动,在每个环境里只该出现在一个地方,不要在两个视图里各记一次, 这部分比想像中更花时间才弄对。',
      's05.note.body':'<b>看不见的对齐。</b>一致的用户体验,不是让后端长得一样,而是 <span class="stat-hi">决定哪些差异要藏、哪些差异要大声说出来</span>。藏错了,看起来不诚实。说错了,看起来杂乱。要把这条线画在哪里,是这个项目里比较长的一个判断。',
      's06.title':'上线',
      's06.s1.label':'版本','s06.s1.foot':'云端与自架版同日上线 · 2026年3月',
      's06.s2.label':'最小屏幕','s06.s2.foot':'从移动端往上设计,宽屏幕再去赢得它的空间。',
      's06.s3.label':'模式','s06.s3.foot':'Public 与 Identity,各自命名,不合并。',
      's06.s4.label':'错误状态','s06.s4.foot':'三种严重度,一条规则,永远不空白。',
      'footer.back':'← 返回作品集'
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    const htmlLang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
    document.documentElement.lang = htmlLang;
  }

  const langSelect = document.getElementById('nav-lang-select');
  if (langSelect) {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && I18N[saved]) {
      langSelect.value = saved;
      applyLang(saved);
    } else if (saved === 'en') {
      langSelect.value = 'en';
    }
    langSelect.addEventListener('change', () => {
      const lang = langSelect.value;
      localStorage.setItem('portfolio-lang', lang);
      if (lang === 'en') location.reload();
      else applyLang(lang);
    });
  }

  // RWD playground
  (() => {
    const frame = document.getElementById('rwd-frame');
    const sizeLabel = document.getElementById('rwd-size');
    if (!frame || !sizeLabel) return;

    const MIN_W = 320, MAX_W = 1200, MIN_H = 420, MAX_H = 800;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    function setSize(w, h) {
      w = clamp(Math.round(w), MIN_W, MAX_W);
      h = clamp(Math.round(h), MIN_H, MAX_H);
      frame.style.width = w + 'px';
      frame.style.height = h + 'px';
      sizeLabel.textContent = w + ' × ' + h;
      // Clear preset active state when freeform
      document.querySelectorAll('.rwd-btn').forEach(b => {
        const bw = parseInt(b.getAttribute('data-w'), 10);
        const bh = parseInt(b.getAttribute('data-h'), 10);
        b.classList.toggle('active', bw === w && bh === h);
      });
    }

    // Presets
    document.querySelectorAll('.rwd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.getAttribute('data-w'), 10);
        const h = parseInt(btn.getAttribute('data-h'), 10);
        setSize(w, h);
      });
    });

    // Drag to resize
    let dragState = null;
    function onPointerMove(e) {
      if (!dragState) return;
      e.preventDefault();
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      let w = dragState.startW, h = dragState.startH;
      if (dragState.dir === 'r' || dragState.dir === 'br') w = dragState.startW + dx;
      if (dragState.dir === 'b' || dragState.dir === 'br') h = dragState.startH + dy;
      setSize(w, h);
    }
    function onPointerUp() {
      if (!dragState) return;
      frame.classList.remove('dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      dragState = null;
    }
    document.querySelectorAll('.rwd-handle').forEach(h => {
      h.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const rect = frame.getBoundingClientRect();
        dragState = {
          startX: e.clientX,
          startY: e.clientY,
          startW: rect.width,
          startH: rect.height,
          dir: h.getAttribute('data-dir')
        };
        frame.classList.add('dragging');
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      });
    });

    // View data toggle, clicking View data (or the data-preview card itself) opens/closes
    // the right-side panel. Adds .panel-open to .rwd-mock so sidebar collapses on desktop.
    const viewBtn = document.getElementById('rwd-view-btn');
    const dataPanel = document.getElementById('rwd-data-panel');
    const dataClose = document.getElementById('rwd-data-close');
    const dpCard = frame.querySelector('.rwd-mock-dp');
    const mockRoot = frame.querySelector('.rwd-mock');
    function setPanel(open) {
      if (!dataPanel || !mockRoot) return;
      if (open) {
        dataPanel.hidden = false;
        mockRoot.classList.add('panel-open');
      } else {
        dataPanel.hidden = true;
        mockRoot.classList.remove('panel-open');
        // When the panel closes, also collapse the sidebar back to the default icon-only
        // state, otherwise it "pops back" to 280px if it was auto-expanded beforehand.
        mockRoot.classList.remove('side-expanded');
      }
    }
    function togglePanel(e) {
      if (e) e.stopPropagation();
      setPanel(dataPanel && dataPanel.hidden);
    }
    if (viewBtn) viewBtn.addEventListener('click', togglePanel);
    if (dpCard) {
      // Clicking anywhere on the data-preview card toggles the panel too, the whole card
      // is the interaction surface. The inner View-data button still works via its own
      // listener (stopPropagation on the card keeps them from double-firing).
      dpCard.style.cursor = 'pointer';
      dpCard.addEventListener('click', (e) => {
        if (viewBtn && viewBtn.contains(e.target)) return; // viewBtn handles itself
        togglePanel();
      });
    }
    if (dataClose) dataClose.addEventListener('click', () => setPanel(false));

    // Burger drawer toggle
    const burger = frame.querySelector('.rwd-mock-burger');
    const drawer = document.getElementById('rwd-drawer');
    const drawerClose = document.getElementById('rwd-drawer-close');
    const drawerBackdrop = document.getElementById('rwd-drawer-backdrop');
    if (burger && drawer) {
      burger.addEventListener('click', () => { drawer.hidden = false; });
    }
    if (drawerClose && drawer) {
      drawerClose.addEventListener('click', () => { drawer.hidden = true; });
    }
    if (drawerBackdrop && drawer) {
      drawerBackdrop.addEventListener('click', () => { drawer.hidden = true; });
    }

    // Auto-close drawer/panel when switching to larger preset
    document.querySelectorAll('.rwd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.getAttribute('data-w'), 10);
        if (w > 540 && drawer) drawer.hidden = true;
      });
    });

    // Tab switching inside data panel (Data Preview / Chart)
    const tabs = document.querySelectorAll('.rwd-mock-tab');
    const tableView = frame.querySelector('.rwd-mock-table');
    const chartView = frame.querySelector('.rwd-mock-chart-view');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        if (tableView) tableView.hidden = target !== 'table';
        if (chartView) chartView.hidden = target !== 'chart';
      });
    });

    // Shared "new thread" handler, used by all three entry points (top-bar plus,
    // sidebar + New, drawer + New). Resets to a clean empty-open state regardless of
    // what was active before (panel open, sidebar expanded, drawer open, etc.).
    const plusBtn = frame.querySelector('.rwd-mock-plus');
    const emptyState = frame.querySelector('.rwd-mock-empty');
    const chatInner = frame.querySelector('.rwd-mock-chat-inner');
    const topTitle = frame.querySelector('.rwd-mock-q-title');
    const titleI18nKey = topTitle ? topTitle.getAttribute('data-i18n') : '';
    const titleDefault = 'Which are the top 3 cities with the highest number of orders?';
    function getCurrentTitle() {
      if (!titleI18nKey) return titleDefault;
      const lang = document.getElementById('nav-lang-select')?.value || 'en';
      const dict = I18N[lang];
      return dict?.[titleI18nKey] ?? titleDefault;
    }
    function openEmptyState() {
      if (!emptyState || !chatInner || !mockRoot) return;
      emptyState.hidden = false;
      chatInner.hidden = true;
      mockRoot.classList.add('empty-open');
      // Clean up any conflicting state so the empty view is the only visible state
      mockRoot.classList.remove('panel-open', 'side-expanded');
      if (dataPanel) dataPanel.hidden = true;
      if (drawer) drawer.hidden = true;
      if (topTitle) topTitle.textContent = '';
    }
    if (plusBtn) plusBtn.addEventListener('click', openEmptyState);
    // Clicking a suggestion card returns to thread view
    frame.querySelectorAll('.rwd-mock-empty-card').forEach(card => {
      card.addEventListener('click', () => {
        if (emptyState) emptyState.hidden = true;
        if (chatInner) chatInner.hidden = false;
        if (mockRoot) mockRoot.classList.remove('empty-open');
        if (topTitle) topTitle.textContent = getCurrentTitle();
      });
    });

    // Drawer "+ New" button
    const drawerNewBtn = frame.querySelector('.rwd-mock-drawer-new-btn');
    if (drawerNewBtn) drawerNewBtn.addEventListener('click', openEmptyState);

    // Desktop sidebar "+ New" button (Figma 2742:7521)
    const sideNewBtn = frame.querySelector('.rwd-mock-side .rwd-mock-new-btn');
    if (sideNewBtn) sideNewBtn.addEventListener('click', openEmptyState);

    // The entire "Threads (2) / + New" row is a single click target, clicking anywhere
    // on it (label area, + icon, or button) switches to the new-thread empty state.
    const sideRow = frame.querySelector('.rwd-mock-side .rwd-mock-side-row');
    if (sideRow) {
      sideRow.style.cursor = 'pointer';
      sideRow.addEventListener('click', openEmptyState);
    }

    // Sidebar toggle (burger button in sidebar head), default collapsed, click to expand
    const sideToggle = frame.querySelector('.rwd-mock-side-toggle');
    if (sideToggle && mockRoot) {
      sideToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mockRoot.classList.toggle('side-expanded');
      });
    }

    // Click-outside-to-close, when sidebar is expanded at tablet range and the dark
    // backdrop is visible, clicking the backdrop (any area outside the sidebar and panel)
    // collapses the sidebar. Matches standard modal-drawer UX.
    if (mockRoot) {
      mockRoot.addEventListener('click', (e) => {
        if (!mockRoot.classList.contains('side-expanded')) return;
        if (mockRoot.classList.contains('panel-open')) return;
        const side = frame.querySelector('.rwd-mock-side');
        if (side && side.contains(e.target)) return; // clicks inside sidebar never close
        // Only close on tablet range, at desktop the sidebar can stay expanded freely
        const frameW = frame.getBoundingClientRect().width;
        if (frameW > 900) return;
        mockRoot.classList.remove('side-expanded');
      });
    }
  })();

  // Scroll reveal
  (() => {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    targets.forEach(el => obs.observe(el));
  })();

  // Nav active state
  (() => {
    const anchors = document.querySelectorAll('.nav-anchor');
    const sections = [];
    anchors.forEach(a => {
      const id = a.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      if (el) sections.push({ el, anchor: a });
    });
    if (!sections.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const match = sections.find(s => s.el === entry.target);
        if (match) {
          if (entry.isIntersecting) match.anchor.classList.add('active');
          else match.anchor.classList.remove('active');
        }
      });
    }, { threshold: 0.15, rootMargin: '-60px 0px -40% 0px' });
    sections.forEach(s => obs.observe(s.el));
  })();
