const I18N = {
    ja: {
'nav.intro':'.イントロ','nav.s01':'01.挑戦と戦略','nav.s03':'02.モード定義','nav.s04':'03.設計上の挑戦','nav.s05':'04.結論',
      'title.big':'Embedded Threads：ひとつの対話型 AI を、あらゆる業務の現場へ',
      'title.sub':'Slack チャンネル、サポート受信箱、ダッシュボード、393px のスマホにそのまま溶け込むチャットアシスタント。Wren AI の声を、どんな文脈にも丸ごと連れていく。',
      'intro.overview.label':'プロジェクト概要',
      'intro.overview.body':'対話型 BI プロダクトとして Wren AI を育てる中で、顧客が本当に求めていたのは新しいタブではなく、すでに使い慣れたツールの中でそのままデータと対話できることでした：Slack のチャンネル、サポートの受信箱、分析ダッシュボードの片隅、移動中のスマホ。<b>Embedded Threads</b> は、私とチームが用意した答えです。同じひとつのアシスタントがチャットとしてそうした業務の現場に溶け込み、393px の画面まで Wren AI の核となる価値を届けます。',
      'intro.role.label':'担当','intro.role.body':'<span class="stat-hi">唯一のデザイナー</span>として、この組み込み体験の企画を端から端まで担当し、設定ロジック、各種デバイスへの適応、エラー時のガイド、そしてプロダクトに組み込まれた後の挙動の細部まで、あらゆる状況で最適なパフォーマンスを発揮できるよう設計しました。',
      'intro.time.label':'会社・時期','intro.time.body':'Wren AI · 2025年12月–2026年1月 · 3 週間',
      's01.title':'プロダクトの挑戦と市場戦略',
      's01.lede':'BI ツールの世界には、リアルなしきい値があります：<span class="stat-hi">わざわざ別タブに飛んでようやく使えるツールは、ユーザーに忘れ去られる運命にある</span>。',
      's01.body':'Wren AI のコアユーザーの多くは「マルチタスク、または移動中」の状態にあることが分かりました：通勤しながら Slack をチェックする、会議中にスマホでダッシュボードをスワイプする。そうしたユーザーにとって、<b>組み込み体験は加点要素ではなく</b>、プロダクトが意思決定の現場に入り込み、そこで生き残れるかを決める鍵そのものです。',
      's01.body2':'ユーザーに素早く届けるため、車輪を再発明せず、Metabase や Tableau といった業界ベンチマークを徹底的に研究しました。学習コストを下げるために業界標準に沿うべき機能と、思い切って簡素化すべき機能を、私たちは明確に切り分けました。',
      's01.body3':'最終的に私たちは <b>「プラグアンドプレイ」のインストールモデル</b> を採用しました。シンプルな Snippet を貼るだけで素早くデプロイでき、重厚な SDK フレームワークは意図的に手放しました。ユーザーが本当に望んでいるのは <span class="stat-hi">データとの対話をワークフローにシームレスに織り込むこと</span> であり、複雑なコードを維持し続けることではないからです。',
      's01.fig.cap':'Snippet を支える管理画面、チャットアイコンのブランディング、ロゴの差し替え、プライマリーカラーの設定、月次クレジット上限、埋め込みコードのコピー。右側のライブプレビューは、そのまま Slack やモバイルダッシュボードに届くサーフェスそのもの。',
      's03.title':'モード定義：アーキテクチャに名前を付けて決定の曖昧さを終わらせる',
      's03.lede':'プロダクトロジックを絶対に明快に保つため、組み込みアーキテクチャを 2 つのまったく異なる行動モードに分割した：<b>パブリックモード (Public Embed)</b> と <b>認証モード (Identity Verification)</b>。',
      's03.body':'アーキテクチャに明快な名前があれば、権限管理やデータリフレッシュ頻度といった後続の難題の答えは自然に浮かび上がる。根本哲学：<span class="stat-hi">Slack チャンネルの「共有情報」と社内システムの「パーソナライズされたデータ」は、本質的にまったく異なるプロダクトシーン</span>。一つのモードで両方をカバーしようとすれば、両端のユーザー体験が凡庸になる。',
      's03.m1.eyebrow':'モード01 · パブリック','s03.m1.title':'パブリック埋め込み',
      's03.m1.body':'<b>パブリック埋め込み</b>、Slack チャンネル、Tableau パネル、公開情報ページ向けに設計。<span class="stat-hi">「会話共有」</span>のロジックで、訪問者全員が同じ文脈でデータを交わせる、1 分以内の展開を実現。',
      's03.m2.eyebrow':'モード02 · 認証','s03.m2.title':'認証埋め込み',
      's03.m2.body':'<b>認証埋め込み</b>、アカウント体系のある社内システムや App 向け。<span class="stat-hi">ホストプロダクトのユーザー認証機構と統合し</span>、システムがアイデンティティパラメータを能動的に渡すことで、各ユーザーが自分専用の会話履歴のみにアクセスできることを保証、能力の開放と最も厳格なデータプライバシー境界を両立する。',
      's04.title':'ひとつのアシスタントを、あらゆる業務の現場へ',
      's04.lede':'本当の試練は単一の画面ではなく、<span class="stat-hi">まったく異なる埋め込み先のプロダクトをまたいで、ひとつのアシスタントの一貫性を保つこと</span>でした：Slack チャンネル、サポート受信箱、分析ダッシュボード。そのたびに作り直すことなく。',
      's04.body':'だから私は内から外へと設計し、最も厳しい制約である <span class="stat-hi">393px のスマホ幅</span> を基準点に置きました。デスクトップから縮小するのではなく、そこから始めたのです。アシスタントはどこでも同じように現れます：ユーザーがすでに開いているアプリの片隅に、静かに佇むランチャーとして。開けば、データとの対話がその場で丸ごと立ち上がる。最も狭いすき間で動くなら、より広いどこでも動きます。広いデスクトップでしか生き残れない組み込みプロダクトは、現代のチームの実際の働き方には馴染みません。',
      's04.rwd.label':'ライブデモ、ひとつのアシスタントが 4 通りの埋め込み方で',
      's04.rwd.body':'ホストを切り替えてみてください。分析ダッシュボードでは隅のバブルとして、Slack ではチャンネル内のボット返信として、サポートヘルプデスクではサイドパネルとして、スマホでは下から立ち上がる bottom-sheet として現れます。同じ Wren、同じデータ、サーフェスごとに違う埋め込みの形。',
      's04.scene.notion':'Slack チャンネル','s04.scene.inbox':'サポート受信箱','s04.scene.dashboard':'分析ダッシュボード','s04.scene.mobile':'モバイルアプリ',
      's04.size.desktop':'デスクトップ · 1024','s04.size.tablet':'タブレット · 768','s04.size.mobile':'モバイル · 393',
      's04.host.dashboard':'分析ダッシュボード','s04.host.slack':'Slack','s04.host.helpdesk':'サポートヘルプデスク','s04.host.mobile':'モバイルアプリ',
      's04.pattern.dashboard':'埋め込み：フローティングバブル','s04.pattern.slack':'埋め込み：Slack ボット返信','s04.pattern.helpdesk':'埋め込み：サイドパネル','s04.pattern.mobile':'埋め込み：ボトムシート',
      's04.slack.you':'あなた','s04.slack.q':'@Wren 先四半期に最も継続率を高めた機能は？','s04.dock.scope':'このアカウント','s04.play':'再生',
      's04.slack.a':'Saved Views、Alerts、Shared Dashboards が牽引。Saved Views だけで 30 日継続率が 18% 向上しました。','s04.slack.chart':'機能別の継続率リフト',
      's04.help.q':'このアカウントは過去 6 か月で何件の異議を申し立てましたか？','s04.help.a':'このアカウントは半年で 8 件の異議を申し立て、3 月にピーク、90% が SLA 内に解決済みです。','s04.help.chart':'月別の異議件数',
      's04.persona.h':'4人、4つの画面、4つの業界','s04.persona.1i':'Eコマース','s04.persona.1r':'オペレーションアナリスト','s04.persona.1l':'注文ダッシュボードに住んでいる。','s04.persona.2i':'SaaS','s04.persona.2r':'グロース PM','s04.persona.2l':'チームと Slack で動く。','s04.persona.3i':'フィンテック','s04.persona.3r':'サポート担当','s04.persona.3l':'ヘルプデスクで、特定の顧客に絞って。','s04.persona.4i':'ファイナンス','s04.persona.4r':'CFO','s04.persona.4l':'スマホで数字をさっと確認。',
      's04.mob.q':'今週の売上は先週比でどう推移している？','s04.mob.a':'売上は前週比 12% 増、月間目標を上回るペースです。','s04.mob.chart':'売上、直近 6 週間',
      's04.rwd2.label':'レスポンシブ・プロトタイプ、角をドラッグしてサイズ変更','s04.rwd2.body':'同じ Wren 埋め込みを 1024 / 768 / 393 で。ハンドルをドラッグするかプリセットを選ぶと、サイドバーがドロワーに畳まれ、チャットがスマホのリズムで積み替わります。',
      's04.device.desktop':'デスクトップ','s04.device.mobile':'モバイル',
      's04.rwd.preset.mobile':'モバイル · 393',
      's04.rwd.preset.tablet':'タブレット · 768',
      's04.rwd.preset.desktop':'デスクトップ · 1024',
      's04.rwd.hint':'↘ 角をドラッグ',
      's04.rwd.mock.threads':'スレッド (2)',
      's04.rwd.mock.new':'新規',
      's04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'注文数が最も多いトップ3の都市はどれ？',
      's04.rwd.mock.q':'注文数が最も多いトップ3の都市はどれ？',
      's04.rwd.mock.userq':'製品は何個ありますか？',
      's04.rwd.mock.patience':'少々お待ちください、リクエストを処理しています！',
      's04.rwd.mock.show':'思考ステップを表示',
      's04.rwd.mock.step1':'関連する Question-SQL ペアが見つかりませんでした',
      's04.rwd.mock.step2':'関連する SQL クエリ指示が見つかりませんでした',
      's04.rwd.mock.step3':'ユーザー意図を認識しました',
      's04.rwd.mock.step4':'9 個の候補モデルが見つかりました',
      's04.rwd.mock.step5a':'思考時間：',
      's04.rwd.mock.step6a':'SQL 生成時間：',
      's04.rwd.mock.step7a':'最大 500 行をフェッチ：',
      's04.rwd.mock.dp':'データプレビュー',
      's04.rwd.mock.dpq':'products データセットに製品は何件ありますか？',
      's04.rwd.mock.view':'データを見る',
      's04.rwd.mock.chart':'都市別注文数 · トップ6',
      's04.rwd.mock.answer':'製品カタログには合計 32,951 件の製品があります。',
      's04.rwd.mock.userq2':'注文数が最も多いトップ3の都市は？',
      's04.rwd.mock.answer2':'サンパウロが 15,540 件で最多、続いてリオデジャネイロ（6,882 件）、ベロオリゾンテ（2,773 件）です。',
      's04.rwd.mock.userq3':'月別の内訳も見せて。',
      's04.rwd.mock.answer3':'注文は年間を通じて着実に増え、11 月にピークを迎えます。第 4 四半期の伸びはサンパウロが牽引しています。',
      's04.rwd.mock.ask':'データを探索するには質問を入力…',
      's04.rwd.dm.title':'棒グラフにラベルを追加',
      's04.rwd.dm.tab1':'データプレビュー',
      's04.rwd.dm.tab2':'チャート',
      's04.rwd.dm.c1':'都市',
      's04.rwd.dm.c2':'注文数',
      's04.rwd.dm.c3':'ランク',
      's04.rwd.dm.chart':'都市別注文数',
      's04.rwd.empty.title':'データについて知る',
      's04.rwd.empty.sub':'こんな質問をどうぞ…',
      's04.rwd.empty.tag1':'記述的な質問',
      's04.rwd.empty.q1':'各サプライヤーの生産量あたりの単価は？',
      's04.rwd.empty.tag2':'データ品質と一貫…',
      's04.rwd.empty.q2':'検査結果に合格した製品の平均不良率は…',
      's04.rwd.empty.tag3':'比較的な質問',
      's04.rwd.empty.q3':'ルート A の平均配送コストが低い輸送方法は…',
      's04.rwd.drawer.t1':'サンプル E',
      's04.rwd.drawer.t2':'サンプル H',
's05.title':'デザインとは、「人」を起点としたナビゲーションである',
      's05.body':'今回の Wren AI の開発は、「境界」をめぐる一種の実験でした。データモデルへの執着を一度手放し、設計のアンカーをより繊細な領域、すなわち <span class="stat-hi">人のシーン</span> へと移してみたのです。「ユーザーは今どこにいて、どんなサイズの画面を見つめ、どれだけの注意を費やしている、あるいは惜しんでいるのか」を問い始めた瞬間、それまで硬直していた UI の判断は、自発的な秩序へとほどけていきました。',
      's05.body2':'そこから私たちは改めて考え直しました：データの本質とは何か。それは到着を待つだけの目的地ではなく、文脈に応じて揺れ、いつでも呼び出せる流動的な状態なのではないか。この探索を通じて、設計がユーザーの生の断面に正確に重なったとき、データはもはや負担ではなく、ユーザーと並んでいつでも行動に踏み出せる頼れるパートナーになることを実感しました。<span class="stat-hi">最良のデザインは新しい世界を生み出すのではなく、ユーザーの世界そのものに静かに溶け込んでいく</span>。',
      'footer.back':'← ポートフォリオに戻る'
    },
    'zh-tw': {
'nav.intro':'.簡介','nav.s01':'01.命題與策略','nav.s03':'02.模式定義','nav.s04':'03.設計上的挑戰','nav.s05':'04.結論',
      'title.big':'Embedded Threads：同一個對話式 AI，融入每一種商業場景',
      'title.sub':'一個隨插即用的聊天助理，能融入 Slack 頻道、客服收件匣、儀表板，乃至 393px 的手機，把 Wren AI 完整的聲音帶進每一個情境。',
      'intro.overview.label':'專案概述',
      'intro.overview.body':'在發展 Wren AI 這款對話式 BI 時，我們發現客戶最渴求的不是多開一個分頁，而是能直接在他們原本就生活的工具裡與數據對話：可能是一個 Slack 頻道、一個客服收件匣、儀表板的一角，或移動中的一支手機。<b>Embedded Threads</b> 正是我與團隊打造的解答，同一個助理以聊天的形式融入這些商業場景，把 Wren AI 的核心價值一路帶到 393px 的螢幕上。',
      'intro.role.label':'我與團隊的角色','intro.role.body':'身為<span class="stat-hi">唯一的設計師</span>，我全程負責這套嵌入式體驗的規劃，涵蓋了配置邏輯、各類裝置的適配性、出錯時的引導處理，以及產品整合後的運作細節，確保在各種情境下都有最佳表現。',
      'intro.time.label':'公司與時間','intro.time.body':'Wren AI · 2025年12月–2026年1月 · 3 週',
      's01.title':'產品命題與市場策略',
      's01.lede':'在 BI 工具領域，有一道現實的門檻：<span class="stat-hi">一個必須跳轉分頁才能使用的工具，注定會被使用者遺忘</span>。',
      's01.body':'我們發現 Wren AI 的核心用戶大多處於「多工或移動」狀態：可能在通勤時滑著 Slack，或在會議中滑著手機看板。對他們而言，<b>「嵌入式體驗」不是加分題</b>，而是產品能否進入決策現場、生存下來的關鍵。',
      's01.body2':'為了快速觸達使用者，我們避開了閉門造車，轉而深入研究 Metabase 與 Tableau 等產業指標。我們釐清了哪些功能應依循產業標準以降低學習門檻，哪些則該大刀闊斧地簡化。',
      's01.body3':'最終，我們採取了 <b>「即插即用」的安裝模型</b>，透過簡潔的程式碼片段（Snippet）即可快速部署，捨棄了沈重的 SDK 開發框架。因為我們深知，使用者需要的是 <span class="stat-hi">將數據對話無縫融入工作流</span>，而非維護複雜的代碼。',
      's01.fig.cap':'撐起這段 Snippet 的管理介面：替聊天圖示換上品牌、放上 Logo、設定主色、設定每月用量上限、複製嵌入碼。右側那塊即時預覽，就是稍後會送進 Slack 或行動儀表板的同一個介面。',
      's03.title':'模式定義：以架構命名終結決策歧義',
      's03.lede':'為了維持產品邏輯的絕對清晰，我與團隊將嵌入架構拆解為兩套截然不同的行為模式：<b>「公開模式 (Public Embed)」</b> 與 <b>「身分驗證模式 (Identity Verification)」</b>。',
      's03.body':'我與團隊深信，一旦架構擁有了清晰的定義，後續關於權限控管或資料刷新頻率的複雜難題，答案往往會自動浮現。這種拆分背後的核心哲學在於：<span class="stat-hi">存在於 Slack 頻道中的「共享資訊」，與存在於內部系統中的「個人化數據」，本質上是兩種完全不同的產品場景</span>。若試圖用一套方案涵蓋所有情境，最終只會導致兩端的用戶體驗都難以達成。',
      's03.m1.eyebrow':'模式01 · 公開','s03.m1.title':'公開嵌入',
      's03.m1.body':'<b>公開嵌入</b>，專為 Slack 頻道、Tableau 面板或公共資訊頁面設計。採取<span class="stat-hi">「對話共享」</span>的邏輯，讓所有訪客在同一個脈絡下交流數據，並實現一分鐘內快速部署的體驗。',
      's03.m2.eyebrow':'模式02 · 身分驗證','s03.m2.title':'身分驗證嵌入',
      's03.m2.body':'<b>身分驗證嵌入</b>，針對具備帳戶體系的內部系統或 App。透過<span class="stat-hi">整合原產品的使用者驗證機制</span>，由系統主動傳遞身分參數，確保每位使用者僅能存取專屬於自己的對話紀錄，在開放能力的同時，守住最嚴謹的數據隱私邊界。',
      's04.title':'同一個助理，融入每一種商業場景',
      's04.lede':'真正的試煉不在於單一畫面，而在於<span class="stat-hi">讓同一個助理在截然不同的承載產品之間維持一致</span>：Slack 頻道、客服收件匣、數據儀表板，而且不必為每一個各別重做。',
      's04.body':'因此我選擇由內而外設計，把最嚴苛的限制 <span class="stat-hi">393px 手機寬度</span> 當作基準點，而不是從桌面往下縮。這個助理在哪裡都以同樣的方式現身：靜靜待在使用者當下所在 App 的一角，化為一顆啟動鈕。一點開，完整的數據對話就在原地展開。能在最窄的縫隙裡運作，就能在任何更寬的地方運作。一個只能在寬敞桌面上存活的嵌入式產品，並不適合現代團隊真正的工作方式。',
      's04.rwd.label':'互動展示，同一個助理用四種方式嵌入','s04.rwd.body':'切換承載環境看看。在數據儀表板裡，助理是角落的浮動泡泡；在 Slack 裡，它以頻道內的機器人回覆現身；在客服 Helpdesk 裡，它是右側的側邊欄面板；在手機上，它從底部滑出成為 bottom-sheet。同一個 Wren、同一份數據，每種承載環境給一種嵌入形態。',
      's04.scene.notion':'Slack 頻道','s04.scene.inbox':'客服收件匣','s04.scene.dashboard':'數據儀表板','s04.scene.mobile':'行動 App',
      's04.size.desktop':'桌機 · 1024','s04.size.tablet':'平板 · 768','s04.size.mobile':'手機 · 393',
      's04.host.dashboard':'數據儀表板','s04.host.slack':'Slack','s04.host.helpdesk':'客服 Helpdesk','s04.host.mobile':'行動 App',
      's04.pattern.dashboard':'嵌入：浮動泡泡','s04.pattern.slack':'嵌入：Slack 機器人回覆','s04.pattern.helpdesk':'嵌入：側邊欄面板','s04.pattern.mobile':'嵌入：bottom-sheet',
      's04.slack.you':'你','s04.slack.q':'@Wren 上一季哪些功能最帶動留存？','s04.dock.scope':'此帳號','s04.play':'播放',
      's04.slack.a':'Saved Views、Alerts、Shared Dashboards 帶動最多，光是 Saved Views 就讓 30 天留存提升 18%。','s04.slack.chart':'各功能的留存提升',
      's04.help.q':'這個帳號近 6 個月提出了多少筆爭議？','s04.help.a':'這個帳號半年內提出 8 筆爭議，3 月達到高峰，其中 90% 在 SLA 內解決。','s04.help.chart':'每月爭議數',
      's04.persona.h':'四個人，四種畫面，四個產業','s04.persona.1i':'電商','s04.persona.1r':'營運分析師','s04.persona.1l':'整天泡在訂單儀表板裡。','s04.persona.2i':'SaaS','s04.persona.2r':'成長 PM','s04.persona.2l':'和團隊一起在 Slack 裡工作。','s04.persona.3i':'金融科技','s04.persona.3r':'客服專員','s04.persona.3l':'在客服台，聚焦單一帳戶。','s04.persona.4i':'金融','s04.persona.4r':'CFO','s04.persona.4l':'用手機快速看數字。',
      's04.mob.q':'本週營收跟上週比表現如何？','s04.mob.a':'營收較上週成長 12%，有望超越當月目標。','s04.mob.chart':'營收，近 6 週',
      's04.rwd2.label':'響應式 prototype，拖角落改變尺寸','s04.rwd2.body':'同一個 Wren 嵌入,在 1024 / 768 / 393 下呈現。拖動把手或選預設,看側欄收進抽屜、聊天按手機節奏重新堆疊。',
      's04.device.desktop':'桌面','s04.device.mobile':'行動',
      's04.rwd.preset.mobile':'行動 · 393',
      's04.rwd.preset.tablet':'平板 · 768',
      's04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖曳角落',
      's04.rwd.mock.threads':'Threads (2)',
      's04.rwd.mock.new':'新增',
      's04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'訂單數最多的前三個城市是哪些？',
      's04.rwd.mock.q':'訂單數最多的前三個城市是哪些？',
      's04.rwd.mock.userq':'有多少產品？',
      's04.rwd.mock.patience':'請稍候，正在處理你的請求！',
      's04.rwd.mock.show':'顯示思考步驟',
      's04.rwd.mock.step1':'找不到相關的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相關的 SQL query 指令',
      's04.rwd.mock.step3':'已辨識使用者意圖',
      's04.rwd.mock.step4':'找到 9 個候選模型',
      's04.rwd.mock.step5a':'思考時間',
      's04.rwd.mock.step6a':'SQL 語句生成',
      's04.rwd.mock.step7a':'抓取最多 500 筆資料',
      's04.rwd.mock.dp':'資料預覽',
      's04.rwd.mock.dpq':'products 資料集中有多少產品？',
      's04.rwd.mock.view':'查看資料',
      's04.rwd.mock.chart':'各城市訂單 · 前六名',
      's04.rwd.mock.answer':'產品目錄裡總共有 32,951 件產品。',
      's04.rwd.mock.userq2':'訂單數最多的前三個城市是哪些？',
      's04.rwd.mock.answer2':'聖保羅以 15,540 筆居冠，其次是里約熱內盧（6,882 筆）與貝洛奧里藏特（2,773 筆）。',
      's04.rwd.mock.userq3':'可以再依月份拆開看嗎？',
      's04.rwd.mock.answer3':'訂單量整年穩定上升，並在 11 月達到高峰；第四季的成長主要由聖保羅帶動。',
      's04.rwd.mock.ask':'輸入問題來探索你的資料…',
      's04.rwd.dm.title':'在長條圖加上標籤',
      's04.rwd.dm.tab1':'資料預覽',
      's04.rwd.dm.tab2':'圖表',
      's04.rwd.dm.c1':'城市',
      's04.rwd.dm.c2':'訂單數',
      's04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市訂單數',
      's04.rwd.empty.title':'更了解你的資料',
      's04.rwd.empty.sub':'試著問…',
      's04.rwd.empty.tag1':'描述性問題',
      's04.rwd.empty.q1':'每個供應商的生產量單位成本是多少？',
      's04.rwd.empty.tag2':'資料品質與一致…',
      's04.rwd.empty.q2':'通過檢驗結果的產品的平均不良率如何…',
      's04.rwd.empty.tag3':'比較性問題',
      's04.rwd.empty.q3':'哪些運輸方式在路線 A 上的平均運送成本較低…',
      's04.rwd.drawer.t1':'Sample E',
      's04.rwd.drawer.t2':'Sample H',
's05.title':'設計，是關於「人」的定位導航',
      's05.body':'這次 Wren AI 的開發歷程，更像是一場關於「邊界」的實驗。我們試著放下對資料模型的執念，將設計的定錨點移往更幽微的領域，<span class="stat-hi">人的場景</span>。當我們開始探尋「使用者身處何方、凝視著哪種尺寸的螢幕、正揮霍或吝嗇於多少注意力」時，原本僵硬的 UI 決策似乎找到了一種自發性的秩序。',
      's05.body2':'這讓我們重新思考：數據的本質究竟是什麼？或許，它不該是一個被動等待抵達的目的地，而是一種能隨場景波動、隨時被召喚的流動狀態。在這次的探索中，我們發現當設計能精準對齊人的生存切面，數據便不再是負擔，而是一個能與使用者並肩、隨時準備付諸行動的可靠夥伴。<span class="stat-hi">最好的設計並非創造新的世界，而是隱入使用者的世界裡</span>。',
      'footer.back':'← 返回作品集'
    },
    'zh-cn': {
'nav.intro':'.简介','nav.s01':'01.命题与策略','nav.s03':'02.模式定义','nav.s04':'03.设计上的挑战','nav.s05':'04.结论',
      'title.big':'Embedded Threads：同一个对话式 AI，融入每一种商业场景',
      'title.sub':'一个随插即用的聊天助理，能融入 Slack 频道、客服收件箱、仪表板，乃至 393px 的手机，把 Wren AI 完整的声音带进每一个情境。',
      'intro.overview.label':'项目概述',
      'intro.overview.body':'在发展 Wren AI 这款对话式 BI 时，我们发现客户最渴求的不是多开一个分页，而是能直接在他们原本就生活的工具里与数据对话：可能是一个 Slack 频道、一个客服收件箱、仪表板的一角，或移动中的一支手机。<b>Embedded Threads</b> 正是我和团队打造的解答，同一个助理以聊天的形式融入这些商业场景，把 Wren AI 的核心价值一路带到 393px 的屏幕上。',
      'intro.role.label':'我和团队的角色','intro.role.body':'身为<span class="stat-hi">唯一的设计师</span>，我全程负责这套嵌入式体验的规划，涵盖了配置逻辑、各类设备的适配性、出错时的引导处理，以及产品整合后的运作细节，确保在各种情境下都有最佳表现。',
      'intro.time.label':'公司与时间','intro.time.body':'Wren AI · 2025年12月–2026年1月 · 3 周',
      's01.title':'产品命题与市场策略',
      's01.lede':'在 BI 工具领域，有一道现实的门槛：<span class="stat-hi">一个必须跳转分页才能使用的工具，注定会被用户遗忘</span>。',
      's01.body':'我们发现 Wren AI 的核心用户大多处于「多任务或移动」状态：可能在通勤时刷着 Slack，或在会议中滑着手机看板。对他们而言，<b>「嵌入式体验」不是加分题</b>，而是产品能否进入决策现场、生存下来的关键。',
      's01.body2':'为了快速触达用户，我们避开了闭门造车，转而深入研究 Metabase 与 Tableau 等产业指标。我们厘清了哪些功能应依循产业标准以降低学习门槛，哪些则该大刀阔斧地简化。',
      's01.body3':'最终，我们采取了 <b>「即插即用」的安装模型</b>，透过简洁的代码片段（Snippet）即可快速部署，舍弃了沉重的 SDK 开发框架。因为我们深知，用户需要的是 <span class="stat-hi">将数据对话无缝融入工作流</span>，而非维护复杂的代码。',
      's01.fig.cap':'撑起这段 Snippet 的管理界面：替聊天图示换上品牌、放上 Logo、设定主色、设定每月用量上限、复制嵌入码。右侧那块即时预览，就是稍后会送进 Slack 或移动仪表板的同一个界面。',
      's03.title':'模式定义：以架构命名终结决策歧义',
      's03.lede':'为了维持产品逻辑的绝对清晰，我和团队将嵌入架构拆解为两套截然不同的行为模式：<b>「公开模式 (Public Embed)」</b> 与 <b>「身份验证模式 (Identity Verification)」</b>。',
      's03.body':'我和团队深信，一旦架构拥有了清晰的定义，后续关于权限控管或数据刷新频率的复杂难题，答案往往会自动浮现。这种拆分背后的核心哲学在于：<span class="stat-hi">存在于 Slack 频道中的「共享信息」，与存在于内部系统中的「个人化数据」，本质上是两种完全不同的产品场景</span>。若试图用一套方案涵盖所有情境，最终只会导致两端的用户体验都难以达成。',
      's03.m1.eyebrow':'模式01 · 公开','s03.m1.title':'公开嵌入',
      's03.m1.body':'<b>公开嵌入</b>，专为 Slack 频道、Tableau 面板或公共信息页面设计。采取<span class="stat-hi">「对话共享」</span>的逻辑，让所有访客在同一个脉络下交流数据，并实现一分钟内快速部署的体验。',
      's03.m2.eyebrow':'模式02 · 身份验证','s03.m2.title':'身份验证嵌入',
      's03.m2.body':'<b>身份验证嵌入</b>，针对具备账户体系的内部系统或 App。通过<span class="stat-hi">整合原产品的用户验证机制</span>，由系统主动传递身份参数，确保每位用户仅能访问专属于自己的对话记录，在开放能力的同时，守住最严谨的数据隐私边界。',
      's04.title':'同一个助理，融入每一种商业场景',
      's04.lede':'真正的试炼不在于单一画面，而在于<span class="stat-hi">让同一个助理在截然不同的承载产品之间维持一致</span>：Slack 频道、客服收件箱、数据仪表板，而且不必为每一个各别重做。',
      's04.body':'因此我选择由内而外设计，把最严苛的限制 <span class="stat-hi">393px 手机宽度</span> 当作基准点，而不是从桌面往下缩。这个助理在哪里都以同样的方式现身：静静待在用户当下所在 App 的一角，化为一颗启动钮。一点开，完整的数据对话就在原地展开。能在最窄的缝隙里运作，就能在任何更宽的地方运作。一个只能在宽敞桌面上存活的嵌入式产品，并不适合现代团队真正的工作方式。',
      's04.rwd.label':'互动展示，同一个助理用四种方式嵌入','s04.rwd.body':'切换承载环境看看。在数据仪表板里，助理是角落的浮动泡泡；在 Slack 里，它以频道内的机器人回复现身；在客服 Helpdesk 里，它是右侧的侧边栏面板；在手机上，它从底部滑出成为 bottom-sheet。同一个 Wren、同一份数据，每种承载环境给一种嵌入形态。',
      's04.scene.notion':'Slack 频道','s04.scene.inbox':'客服收件箱','s04.scene.dashboard':'数据仪表板','s04.scene.mobile':'移动 App',
      's04.size.desktop':'桌面 · 1024','s04.size.tablet':'平板 · 768','s04.size.mobile':'手机 · 393',
      's04.host.dashboard':'数据仪表板','s04.host.slack':'Slack','s04.host.helpdesk':'客服 Helpdesk','s04.host.mobile':'移动 App',
      's04.pattern.dashboard':'嵌入：浮动泡泡','s04.pattern.slack':'嵌入：Slack 机器人回复','s04.pattern.helpdesk':'嵌入：侧边栏面板','s04.pattern.mobile':'嵌入：bottom-sheet',
      's04.slack.you':'你','s04.slack.q':'@Wren 上一季哪些功能最带动留存？','s04.dock.scope':'此账号','s04.play':'播放',
      's04.slack.a':'Saved Views、Alerts、Shared Dashboards 带动最多，光是 Saved Views 就让 30 天留存提升 18%。','s04.slack.chart':'各功能的留存提升',
      's04.help.q':'这个账号近 6 个月提出了多少笔争议？','s04.help.a':'这个账号半年内提出 8 笔争议，3 月达到高峰，其中 90% 在 SLA 内解决。','s04.help.chart':'每月争议数',
      's04.persona.h':'四个人，四种画面，四个产业','s04.persona.1i':'电商','s04.persona.1r':'运营分析师','s04.persona.1l':'整天泡在订单仪表板里。','s04.persona.2i':'SaaS','s04.persona.2r':'增长 PM','s04.persona.2l':'和团队一起在 Slack 里工作。','s04.persona.3i':'金融科技','s04.persona.3r':'客服专员','s04.persona.3l':'在客服台，聚焦单一账户。','s04.persona.4i':'金融','s04.persona.4r':'CFO','s04.persona.4l':'用手机快速看数字。',
      's04.mob.q':'本周营收跟上周比表现如何？','s04.mob.a':'营收较上周增长 12%，有望超越当月目标。','s04.mob.chart':'营收，近 6 周',
      's04.rwd2.label':'响应式 prototype，拖角落改变尺寸','s04.rwd2.body':'同一个 Wren 嵌入,在 1024 / 768 / 393 下呈现。拖动把手或选预设,看侧栏收进抽屉、聊天按手机节奏重新堆叠。',
      's04.device.desktop':'桌面','s04.device.mobile':'移动',
      's04.rwd.preset.mobile':'移动 · 393',
      's04.rwd.preset.tablet':'平板 · 768',
      's04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖拽角落',
      's04.rwd.mock.threads':'Threads (2)',
      's04.rwd.mock.new':'新增',
      's04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'订单数最多的前三个城市是哪些？',
      's04.rwd.mock.q':'订单数最多的前三个城市是哪些？',
      's04.rwd.mock.userq':'有多少产品？',
      's04.rwd.mock.patience':'请稍候，正在处理你的请求！',
      's04.rwd.mock.show':'显示思考步骤',
      's04.rwd.mock.step1':'找不到相关的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相关的 SQL query 指令',
      's04.rwd.mock.step3':'已识别用户意图',
      's04.rwd.mock.step4':'找到 9 个候选模型',
      's04.rwd.mock.step5a':'思考时间',
      's04.rwd.mock.step6a':'SQL 语句生成',
      's04.rwd.mock.step7a':'抓取最多 500 笔数据',
      's04.rwd.mock.dp':'数据预览',
      's04.rwd.mock.dpq':'products 数据集中有多少产品？',
      's04.rwd.mock.view':'查看数据',
      's04.rwd.mock.chart':'各城市订单 · 前六名',
      's04.rwd.mock.answer':'产品目录里总共有 32,951 件产品。',
      's04.rwd.mock.userq2':'订单数最多的前三个城市是哪些？',
      's04.rwd.mock.answer2':'圣保罗以 15,540 笔居首，其次是里约热内卢（6,882 笔）与贝洛奥里藏特（2,773 笔）。',
      's04.rwd.mock.userq3':'可以再按月份拆开看吗？',
      's04.rwd.mock.answer3':'订单量整年稳定上升，并在 11 月达到高峰；第四季度的增长主要由圣保罗带动。',
      's04.rwd.mock.ask':'输入问题来探索你的数据…',
      's04.rwd.dm.title':'在柱状图加上标签',
      's04.rwd.dm.tab1':'数据预览',
      's04.rwd.dm.tab2':'图表',
      's04.rwd.dm.c1':'城市',
      's04.rwd.dm.c2':'订单数',
      's04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市订单数',
      's04.rwd.empty.title':'更了解你的数据',
      's04.rwd.empty.sub':'试着问…',
      's04.rwd.empty.tag1':'描述性问题',
      's04.rwd.empty.q1':'每个供应商的生产量单位成本是多少？',
      's04.rwd.empty.tag2':'数据质量与一致…',
      's04.rwd.empty.q2':'通过检验结果的产品的平均不良率如何…',
      's04.rwd.empty.tag3':'比较性问题',
      's04.rwd.empty.q3':'哪些运输方式在路线 A 上的平均运送成本较低…',
      's04.rwd.drawer.t1':'Sample E',
      's04.rwd.drawer.t2':'Sample H',
's05.title':'设计，是关于「人」的定位导航',
      's05.body':'这次 Wren AI 的开发历程，更像是一场关于「边界」的实验。我们试着放下对数据模型的执念，将设计的定锚点移往更幽微的领域，<span class="stat-hi">人的场景</span>。当我们开始探寻「用户身处何方、凝视着哪种尺寸的屏幕、正挥霍或吝啬于多少注意力」时，原本僵硬的 UI 决策似乎找到了一种自发性的秩序。',
      's05.body2':'这让我们重新思考：数据的本质究竟是什么？或许，它不该是一个被动等待抵达的目的地，而是一种能随场景波动、随时被召唤的流动状态。在这次的探索中，我们发现当设计能精准对齐人的生存切面，数据便不再是负担，而是一个能与用户并肩、随时准备付诸行动的可靠伙伴。<span class="stat-hi">最好的设计并非创造新的世界，而是隐入用户的世界里</span>。',
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

  // Embedded-everywhere demo: scenario switch + device toggle + chat-widget expand/collapse
  (() => {
    const stage = document.getElementById('et-stage');
    const launcher = document.getElementById('et-launcher');
    const panel = document.getElementById('et-panel');
    const panelClose = document.getElementById('et-panel-close');
    if (!stage) return;

    // Host scene switch + embed-pattern label
    const patternEl = document.getElementById('et-pattern');
    const EN_PATTERN = { dashboard: 'Embed pattern: floating bubble', slack: 'Embed pattern: Slack bot reply', helpdesk: 'Embed pattern: docked side panel', mobile: 'Embed pattern: bottom sheet' };
    function setPattern(scene) {
      if (!patternEl) return;
      const key = 's04.pattern.' + scene;
      patternEl.setAttribute('data-i18n', key);
      const sel = document.getElementById('nav-lang-select');
      const lang = sel ? sel.value : 'en';
      const dict = (typeof I18N !== 'undefined' && I18N[lang]) ? I18N[lang] : null;
      patternEl.textContent = (dict && dict[key] != null) ? dict[key] : (EN_PATTERN[scene] || EN_PATTERN.dashboard);
    }
    document.querySelectorAll('.et-scene-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const scene = btn.getAttribute('data-scene');
        stage.setAttribute('data-scene', scene);
        document.querySelectorAll('.et-scene-btn').forEach(b => b.classList.toggle('active', b === btn));
        setPattern(scene);
        resetScene(scene);
      });
    });

    // Widget expand / collapse, the launcher bubble opens the chat panel
    function setOpen(open) {
      if (!panel || !launcher) return;
      panel.hidden = !open;
      launcher.hidden = open;
    }
    if (launcher) launcher.addEventListener('click', () => setOpen(true));
    if (panelClose) panelClose.addEventListener('click', () => setOpen(false));

    // Mobile: tap the launcher to open the full-screen Wren app; close returns to the home
    const phoneMock = document.querySelector('.et-phone-mock');
    const phoneLauncher = document.getElementById('et-phone-launcher');
    const phoneClose = document.getElementById('et-phone-close');
    function openPhone(open) {
      if (!phoneMock) return;
      phoneMock.hidden = !open;
      if (phoneLauncher) phoneLauncher.hidden = open;
    }
    if (phoneLauncher) phoneLauncher.addEventListener('click', () => openPhone(true));
    if (phoneClose) phoneClose.addEventListener('click', () => openPhone(false));

    // Thinking-steps collapse / expand inside the panel
    const show = document.getElementById('et-show');
    const steps = document.getElementById('et-steps');
    if (show && steps) {
      show.style.cursor = 'pointer';
      show.addEventListener('click', () => {
        const collapsed = steps.hasAttribute('hidden');
        if (collapsed) steps.removeAttribute('hidden');
        else steps.setAttribute('hidden', '');
        show.classList.toggle('steps-collapsed', !collapsed);
      });
    }

    // Mobile phone: top-bar burger opens the thread-list drawer (mirrors the top prototype)
    const phoneDrawer = document.querySelector('.et-phone-mock .et-phone-drawer');
    const phoneBurger = document.querySelector('.et-phone-mock .et-phone-burger');
    if (phoneDrawer && phoneBurger) {
      const closePhoneDrawer = () => { phoneDrawer.hidden = true; };
      phoneBurger.addEventListener('click', () => { phoneDrawer.hidden = false; });
      phoneDrawer.querySelector('.rwd-mock-drawer-close')?.addEventListener('click', closePhoneDrawer);
      phoneDrawer.querySelector('.rwd-mock-drawer-backdrop')?.addEventListener('click', closePhoneDrawer);
      phoneDrawer.querySelector('.rwd-mock-drawer-new-btn')?.addEventListener('click', closePhoneDrawer);
    }

    // Journey player: list -> ask -> [pause] -> think -> [pause] -> answer, started by the Play button
    let playTimers = [];
    function clearPlay() { playTimers.forEach(clearTimeout); playTimers = []; }
    const playBtn = document.getElementById('et-play');

    function sceneParts(scene) {
      if (scene === 'slack') return { container: document.querySelector('.et-bg-slack .ets-msgs'), keep: 3, scrollEl: document.querySelector('.et-bg-slack .ets-msgs'), slack: true };
      if (scene === 'helpdesk') return { container: document.querySelector('.et-dock .et-chat-inner'), keep: 0, scrollEl: document.querySelector('.et-dock .et-chat') };
      if (scene === 'mobile') return { container: document.querySelector('.et-phone-mock .rwd-mock-chat-inner'), keep: 0, scrollEl: document.querySelector('.et-phone-mock .rwd-mock-chat'), staticDefault: true, phoneApp: true };
      return { container: document.querySelector('.et-panel .et-chat-inner'), keep: 0, scrollEl: document.querySelector('.et-panel .et-chat'), bubble: true };
    }

    // Auto-play pointer (mouse cursor on desktop scenes, tap circle on mobile)
    const cursor = document.getElementById('et-cursor');
    function moveCursorTo(el) {
      if (!cursor || !el) return;
      const sr = stage.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      cursor.style.left = (er.left - sr.left + er.width / 2) + 'px';
      cursor.style.top = (er.top - sr.top + er.height / 2) + 'px';
      cursor.hidden = false;
    }
    function pulseCursor() { if (!cursor) return; cursor.classList.remove('clicking'); void cursor.offsetWidth; cursor.classList.add('clicking'); }
    function hideCursor() { if (cursor) { cursor.hidden = true; cursor.classList.remove('clicking'); } }

    // Reset a scene to its ready state (threads list shown, empty + conversation hidden)
    function resetScene(scene) {
      clearPlay();
      hideCursor();
      if (playBtn) playBtn.classList.remove('playing');
      const p = sceneParts(scene);
      if (p.bubble) setOpen(false);
      if (p.phoneApp) openPhone(false);
      if (!p.container) return;
      const threads = p.container.querySelector('.et-threads');
      const empty = p.container.querySelector('.rwd-mock-empty');
      const pre = [threads, empty].filter(Boolean);
      const kids = Array.prototype.slice.call(p.container.children).filter(c => pre.indexOf(c) === -1);
      kids.forEach((k, i) => { k.hidden = p.staticDefault ? false : (i >= p.keep); k.classList.remove('et-fade'); });
      if (empty) { empty.hidden = true; const sc = empty.querySelector('.et-suggest-target'); if (sc) sc.classList.remove('clicked'); }
      if (threads) { threads.hidden = false; const nb = threads.querySelector('.et-threads-new'); if (nb) nb.classList.remove('clicked'); }
    }

    // Play the real prototype flow: threads -> + New -> empty/suggestions -> pick card -> question -> think -> answer
    function playScene(scene) {
      clearPlay();
      const p = sceneParts(scene);
      if (p.bubble) setOpen(true);
      if (p.phoneApp) openPhone(true);
      if (!p.container) return;
      if (playBtn) playBtn.classList.add('playing');
      const threads = p.container.querySelector('.et-threads');
      const empty = p.container.querySelector('.rwd-mock-empty');
      const pre = [threads, empty].filter(Boolean);
      const kids = Array.prototype.slice.call(p.container.children).filter(c => pre.indexOf(c) === -1);
      const revealKids = kids.slice(p.keep);
      kids.slice(0, p.keep).forEach(k => { k.hidden = false; k.classList.remove('et-fade'); });
      revealKids.forEach(k => { k.hidden = true; k.classList.remove('et-fade'); });
      if (threads) { threads.hidden = true; const nb = threads.querySelector('.et-threads-new'); if (nb) nb.classList.remove('clicked'); }
      if (empty) { empty.hidden = true; const sc = empty.querySelector('.et-suggest-target'); if (sc) sc.classList.remove('clicked'); }
      // beat keys for the conversation (pauses land between ask / think / answer / next turn)
      let turn = 0, seenChart = false;
      revealKids.forEach(el => {
        if (p.slack) { if (el.classList.contains('ets-bot')) { el._beat = 'a' + turn; } else { turn++; el._beat = 'q' + turn; } return; }
        if (el.classList.contains('rwd-mock-qbox')) { turn++; seenChart = false; el._beat = 'q' + turn; }
        else if (el.classList.contains('rwd-mock-chart') || el.classList.contains('rwd-mock-dp-wrap')) { seenChart = true; el._beat = 'a' + turn; }
        else if (el.classList.contains('rwd-mock-asst') && seenChart) { el._beat = 'a' + turn; }
        else { el._beat = 't' + turn; }
      });
      hideCursor();
      const BEAT = 1500, MICRO = 150;
      const show = (el, at) => playTimers.push(setTimeout(() => { el.hidden = false; el.classList.remove('et-fade'); void el.offsetWidth; el.classList.add('et-fade'); if (p.scrollEl) p.scrollEl.scrollTop = p.scrollEl.scrollHeight; }, at));
      const hide = (el, at) => playTimers.push(setTimeout(() => { el.hidden = true; }, at));
      const pointClick = (el, moveAt, clickAt) => {
        if (!el) return;
        playTimers.push(setTimeout(() => moveCursorTo(el), moveAt));
        playTimers.push(setTimeout(() => { pulseCursor(); el.classList.add('clicked'); }, clickAt));
      };
      let t = 600;
      if (threads) {                 // 1) threads list, cursor moves to and clicks "+ New"
        show(threads, t);
        pointClick(threads.querySelector('.et-threads-new'), t + 500, t + 1100);
        hide(threads, t + 1700);
        t += 2000;
      }
      if (empty) {                   // 2) empty state, cursor moves to and clicks a suggestion card
        show(empty, t);
        pointClick(empty.querySelector('.et-suggest-target'), t + 500, t + 1200);
        hide(empty, t + 1900);
        t += 2100;
      }
      playTimers.push(setTimeout(hideCursor, Math.max(0, t - 250)));   // pointer leaves once the answer starts building
      let prevBeat = null;           // 3) the conversation builds with pauses between phases
      revealKids.forEach(el => {
        if (prevBeat !== null) t += (el._beat !== prevBeat ? BEAT : MICRO);
        show(el, t);
        prevBeat = el._beat;
      });
      playTimers.push(setTimeout(() => { if (playBtn) playBtn.classList.remove('playing'); }, t + 700));
    }

    if (playBtn) playBtn.addEventListener('click', () => playScene(stage.getAttribute('data-scene') || 'dashboard'));

    // Start the default scene at its ready-to-play state
    resetScene(stage.getAttribute('data-scene') || 'dashboard');
  })();

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
