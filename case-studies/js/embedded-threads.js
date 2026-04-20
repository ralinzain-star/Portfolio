const I18N = {
    ja: {
      'nav.intro':'.イントロ','nav.s01':'01.背景','nav.s02':'02.2モード','nav.s03':'03.参考事例','nav.s04':'04.システム','nav.s05':'05.サーフェス','nav.s06':'06.リリース',
      'title.big':'Embedded Threads：Wren AI を他プロダクトの"一級市民"にする',
      'title.sub':'Notion・Tableau・エンタープライズ SaaS の中で Wren AI の会話型 BI を稼働させるための、連携・認証・クォータ・エラー設計。テナント性・信頼・ブランドを犠牲にしない。',
      'hero.eyebrow':'Wren AI · SaaS 0.53.0 · Self-hosted 1.9.0','hero.l1':'Wren AI','hero.l2':'あなたの','hero.l3':'プロダクトの中へ。',
      'hero.m1':', Embedded Threads ,','hero.m2':'2026.2.16 → 2026.3.20',
      'intro.overview.label':'プロジェクト概要',
      'intro.overview.body':'Wren AI はオープンソースの対話型 BI。ユーザーは自然言語でデータに質問できます。顧客は Wren AI を<em>別タブではなく</em>自社プロダクト内（Notion サイドバー・社内 SaaS ダッシュボード・Tableau パネル）で動かしたいと繰り返し要望してきました。<b>Embedded Threads</b> は、それを実現するために私が設計した機能です：2 つの統合モード、Credit ベースのクォータ、監査付きアクティビティ、UI カスタマイズ、そして 13 コードのエラー体系。',
      'intro.role.label':'担当','intro.role.body':'3 人チームで<span class="stat-hi">唯一のデザイナー</span>。PM <b>Freda</b>・エンジニアリング <b>Andy Yen</b> と協業。モード設計、認証 UX、カスタマイズ UI、アクティビティログ、エラーコード体系、SaaS / Self-hosted 間のパリティまで担当。',
      'intro.time.label':'会社・時期','intro.time.body':'Wren AI · 2026年2–3月 · SaaS 0.53.0（Wren 2.0）および Self-hosted 1.9.0 にてリリース',
      's01.title':'01. 背景, BI プロダクトは他のプロダクトの中で生きる時代',
      's01.lede':'自社ドメインにしか存在しない BI ツールは、わざわざ訪問してもらう必要があります。定着する顧客は、データ Q&A を意思決定の現場（Notion ドキュメント、Tableau ダッシュボード、社内業務 SaaS）まで持ち込める人たちでした。組み込みは"あれば嬉しい"ではなく、プロダクトが引っ張られていた方向です。',
      's01.pill1':'対象 · Notion · Tableau · 社内SaaS','s01.pill2':'プラットフォーム · SaaS + Self-hosted','s01.pill3':'リリース · Wren 2.0 · 2026.3.20','s01.pill4':'制約 · 5週間',
      's01.why.label':'なぜ組み込みが採用を止めていたか','s01.why.body':'エンタープライズの購入検討者はトライアルで毎回同じ 3 つの質問をします：<em>エンドユーザーは互いのデータを見えてしまうか？</em>、<em>プロジェクト別に支出上限を設定できるか？</em>、<em>顧客の前で組み込みが壊れたらどうなるか？</em>。これらは"デモ"の質問ではなく、合否を決める質問です。',
      's01.bet.label':'デザインの賭け','s01.bet.body':'Embedded Threads を本体アプリの削減版ではなく、<em>独立したプロダクトサーフェス</em>として扱うこと。専用のセットアップ、固有の UI フィルタ、独自の監査スキーマ、独自のエラー語彙。目標：ホスト側が午後に導入し、購買会議で承認される。',
      's01.insight.label':'枠組みの質問','s01.insight.body':'ホストプロダクトが本当に欲しい組み込みはどちらか？ ページを読む誰もが話しかけられる公開ウィジェット、それともログイン済みユーザーが自分の履歴だけを見るテナント対応パネル？ これを最初に答えることで、全体のアーキテクチャが決まりました。',
      's02.title':'02. 2 つの統合モード, トレードオフを隠さず、名付ける',
      's02.lede':'テナント性を自動で推測する"賢い"単一モードを作る誘惑がありました。それを断る規律。顧客が 1 画面でデプロイ速度とデータ分離のトレードオフを見て、目を開けて選べるようにする。',
      's02.m1.eyebrow':'モード01 · パブリック','s02.m1.title':'パブリック埋め込み',
      's02.m1.body':'ドロップインの URL／iframe。ログイン不要。すべての閲覧者が同じ共有スレッドを見ます, Notion ページ・公開ドキュメント・デモサイト向け。',
      's02.m1.k1':'最適','s02.m1.v1':'Notion サイドバー、Tableau パネル、公開ドキュメント',
      's02.m1.k2':'分離','s02.m1.v2':'なし。スレッドは閲覧者間で共有。',
      's02.m1.k3':'セットアップ','s02.m1.v3':'トグル ON。iframe をコピー。完了。',
      's02.m1.k4':'デフォルト','s02.m1.v4':'<b>OFF</b>。ユーザーが明示的に有効化, デフォルトでデータが漏れる組み込みは出しません。',
      's02.m2.eyebrow':'モード02 · アイデンティティ検証','s02.m2.title':'アイデンティティ検証埋め込み',
      's02.m2.body':'JWT 署名。ホスト側がエンドユーザーを認証し、短命な ID トークンを Wren AI に渡す。各ユーザーは自分のスレッドのみ参照, 構造的にマルチテナント。',
      's02.m2.k1':'最適','s02.m2.v1':'エンタープライズ SaaS、社内ツール、ログインを伴うすべて',
      's02.m2.k2':'分離','s02.m2.v2':'厳密なユーザー単位。スレッドはトークン上の identity にスコープされます。',
      's02.m2.k3':'セットアップ','s02.m2.v3':'共有シークレットを生成。バックエンドで JWT 署名。iframe に渡す。',
      's02.m2.k4':'キー運用','s02.m2.v4':'リセットは以後の iframe ロードを無効化しますが、ライブセッションはトークン TTL まで生かします, 顧客が鍵更新で自社プロダクトを止めないための意図的な猶予期間。',
      's02.shot.label':'screenshot：Embed 設定画面, モード切替、シークレットキーパネル、プレビュー',
      's03.title':'03. 業界参考, Metabase・Tableau・Power BI から学ぶ',
      's03.lede':'埋め込み型アナリティクスは成熟領域です。Figma を開く前に、Metabase・Tableau・Power BI が同じ問題をどう解いたかを 1 週間読み込みました。模倣のためではなく、確立されたパターンの範囲と、まだシンプル化の余地を知るために。',
      's03.r1.tag':'OSSベンチマーク','s03.r1.body':'JWT 署名による Static / Interactive 埋め込み。<span class="mono">postMessage</span> による iframe 動的リサイズ。開発者側の使いやすさが最良。','s03.r1.take':'採用：JWT 信頼モデル、高さ同期用の postMessage。',
      's03.r2.tag':'エンタープライズの金字塔','s03.r2.body':'Connected Apps + EAS、細粒度の JS API (v3)：<span class="mono">filterTheView</span>、<span class="mono">getDataFromView</span>、イベントリスナー。','s03.r2.take':'意図的に見送り：プログラマブル JS SDK。Notion／Tableau ドロップイン用途には重い。',
      's03.r3.tag':'Microsoft エコシステム','s03.r3.body':'Access Token（ユーザー認証）と Embed Token（データ認可）を分離し、行レベルセキュリティを実装。Azure AD 色が強いが、二トークン分離の発想は概念的に美しい。','s03.r3.take':'検討：二トークン分離。v1 では見送り, 現行テナンシーモデルでは単一 JWT で十分。',
      's03.takeaway.label':'結論として取り入れた点','s03.takeaway.body':'業界は JWT ベースの信頼と postMessage によるクロスオリジン UI 同期に収束しています。そこから分岐した点：<b>JS SDK 不要</b>。顧客は iframe タグを貼り付け、バックエンドの JWT 署名関数 1 つで v1 を出荷できるようにしました。',
      's04.title':'04. システム, クォータ、アクティビティ、カスタマイズ、エラー',
      's04.lede':'モードを選ぶのは最初の一歩。その下で 4 つの並列システムが必要でした：Credit ベースの使用量制限、完全な監査履歴、ホスト側のブランドカスタマイズ、13 コードのエラー語彙。それぞれ独自のエッジケースがあり、それぞれ他社プロダクト内で自然に見える必要がありました。',
      's04.f1.eyebrow':'機能01 · クォータ','s04.f1.title':'Web Credit 上限、プロジェクト単位、月次自動リセット',
      's04.f1.body':'組み込みの対話は毎回 Web Credit を消費します。上限がなければ、不具合のあるクライアント埋め込みが午後のうちに予算を使い切ってしまいます。デフォルトは<span class="stat-hi">プロジェクトあたり月 20 credits</span>、プロジェクト単位で設定可、毎月 1 日に自動リセット。上限到達時は<b>読み取り専用</b>に切替, スレッドは見え、質問は不可。顧客向けサーフェスが突然空白のエラー画面になりません。',
      's04.f1.s1.label':'スコープ','s04.f1.s1.foot':'ユーザー単位ではなくプロジェクト単位, 課金対象サーフェス。',
      's04.f1.s2.label':'デフォルト上限','s04.f1.s2.foot':'デモは回る、かつ合理的な上限。',
      's04.f1.s3.label':'リセット','s04.f1.s3.foot':'毎月 1 日、自動。',
      's04.f1.s4.label':'上限時','s04.f1.s4.foot':'閲覧は可、質問は不可。',
      's04.f2.eyebrow':'機能02 · アクティビティログ','s04.f2.title':'全ての組み込み操作を監査品質で',
      's04.f2.body':'組み込みサーフェスはホストアプリの外で動きますが、Project Owner は「誰が・いつ・何を・いくらで聞いたか」を答える必要があります, 監査、デバッグ、従量課金のために。私は 7 つのアクションとテナント意識のメタデータを含むアクティビティスキーマを設計しました。クエリコンソールを開かずに読めるように。',
      's04.f2.col1':'アクション','s04.f2.col2':'メッセージ','s04.f2.col3':'主要メタデータ',
      's04.f2.r1.msg':'${user} が "${question}" で "${thread}" を作成','s04.f2.r1.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r2.msg':'${user} が "${thread}" で追質問','s04.f2.r2.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r3.msg':'${user} が "${thread}" を削除','s04.f2.r3.meta':'thread.id · thread.name · timestamp',
      's04.f2.r4.msg':'オーナーが共有シークレットキーを生成','s04.f2.r4.meta':'(ホストレベル操作)',
      's04.f2.r5.msg':'オーナーが共有シークレットキーを再生成','s04.f2.r5.meta':'(新規iframeロード無効化／ライブセッションはTTLまで有効)',
      's04.f2.r6.msg':'${user} が埋め込み設定を保存','s04.f2.r6.meta':'identity_verification · public_embed · chat_icon · logo · credit_limit · display_name',
      's04.f2.r7.msg':'${user} がホームのおすすめ質問を生成','s04.f2.r7.meta':'recommended_questions · model_used · tokens · duration_ms',
      's04.f2.note.label':'やっておいてよかった小さな判断','s04.f2.note.body':'Activity Log 内の組み込みスレッドリンクは<b>無効化</b>し、ツールチップで<em>"埋め込みスレッドでは利用不可"</em>と表示。クリックすると本体アプリが開き、組み込み側で意図的に隠したサーフェスが露出してしまうためです。ログは記録であって、裏口ではありません。',
      's04.f3.eyebrow':'機能03 · カスタマイズ','s04.f3.title':'ネイティブに感じる分だけ。それ以上は渡さない。',
      's04.f3.body':'組み込みはホストプロダクトに馴染む必要がありますが、不具合時に Wren AI が BI エンジンとして識別できることも必要です。所有感を変えつつ下層プロダクトを隠蔽しない 4 つのサーフェスにカスタマイズを絞りました：会社ロゴ、チャットアイコン、テーマカラー、表示名。残りは Wren AI のデフォルトを継承します。',
      's04.f3.l1':'<b>会社ロゴ</b>, iframe ヘッダーに表示',
      's04.f3.l2':'<b>チャットアイコン</b>, 各応答の AI アバター',
      's04.f3.l3':'<b>テーマカラー</b>, プライマリアクセント、ホスト準拠',
      's04.f3.l4':'<b>表示名</b>, 組み込みがコピー内で自身を呼ぶ名',
      's04.f3.l5':'<b>RWD</b>, Notion サイドバー、ボトムシート、フル iframe すべてに対応',
      's04.f3.shot':'screenshot：カスタマイズプレビュー, ロゴ + テーマ差替の前後',
      's04.f3.rwd.label':'RWD プレイグラウンド, 右下の角をドラッグ',
      's04.f3.rwd.body':'組み込みは Notion サイドバー（約 393px）、ウェブのボトムシート（約 768px）、フルページ iframe（1024px+）で同じように動く必要があります。右下の角をドラッグするかプリセットに切り替えて、レイアウトがどう畳まれるかを確認してください, スレッドリストが最初に消え、次に追質問チップ、最後にチャートが縮みます。',
      's04.rwd.preset.mobile':'モバイル · 393','s04.rwd.preset.tablet':'タブレット · 768','s04.rwd.preset.desktop':'デスクトップ · 1024',
      's04.rwd.hint':'↘ 角をドラッグ',
      's04.rwd.bp.mobile':'モバイル ≤ 480','s04.rwd.bp.tablet':'タブレット 481–900','s04.rwd.bp.desktop':'デスクトップ > 900',
      's04.rwd.mock.threads':'スレッド (2)','s04.rwd.mock.new':'新規','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'注文数が最も多いトップ3の都市はどれ？',
      's04.rwd.mock.q':'注文数が最も多いトップ3の都市はどれ？',
      's04.rwd.mock.userq':'製品は何個ありますか？',
      's04.rwd.mock.patience':'少々お待ちください, リクエストを処理しています！',
      's04.rwd.mock.show':'思考ステップを表示',
      's04.rwd.mock.step1':'関連する Question-SQL ペアが見つかりませんでした',
      's04.rwd.mock.step2':'関連する SQL クエリ指示が見つかりませんでした',
      's04.rwd.mock.step3':'ユーザー意図を認識しました',
      's04.rwd.mock.step4':'9 個の候補モデルが見つかりました',
      's04.rwd.mock.step5a':'思考時間：','s04.rwd.mock.step6a':'SQL 生成時間：','s04.rwd.mock.step7a':'最大 500 行をフェッチ：',
      's04.rwd.mock.dp':'データプレビュー','s04.rwd.mock.dpq':'products データセットに製品は何件ありますか？','s04.rwd.mock.view':'データを見る',
      's04.rwd.mock.chart':'都市別注文数 · トップ6',
      's04.rwd.mock.answer':'製品カタログには合計 32,951 件の製品があります。',
      's04.rwd.mock.chip1':'棒グラフにラベルを追加','s04.rwd.mock.chip2':'トップ3だけ表示','s04.rwd.mock.chip3':'タイトルを変更',
      's04.rwd.mock.ask':'データを探索するには質問を入力…',
      's04.rwd.dm.title':'棒グラフにラベルを追加','s04.rwd.dm.tab1':'データプレビュー','s04.rwd.dm.tab2':'チャート',
      's04.rwd.dm.c1':'都市','s04.rwd.dm.c2':'注文数','s04.rwd.dm.c3':'ランク',
      's04.rwd.dm.chart':'都市別注文数',
      's04.rwd.empty.title':'データについて知る','s04.rwd.empty.sub':'こんな質問をどうぞ...',
      's04.rwd.empty.tag1':'記述的な質問','s04.rwd.empty.q1':'各サプライヤーの生産量あたりの単価は？',
      's04.rwd.empty.tag2':'データ品質と一貫…','s04.rwd.empty.q2':'検査結果に合格した製品の平均不良率は…',
      's04.rwd.empty.tag3':'比較的な質問','s04.rwd.empty.q3':'ルート A の平均配送コストが低い輸送方法は…',
      's04.rwd.drawer.t1':'サンプル E','s04.rwd.drawer.t2':'サンプル H',
      's04.f4.eyebrow':'機能04 · UI フィルタ','s04.f4.title':'配管を隠し、チャットに読ませる',
      's04.f4.body':'本体アプリは豊富な UI を提供します, サジェストチップ、思考ステップ、Question-SQL ペア、チャート命令、候補モデル。パワーユーザーには有用ですが、他社の Notion 内で鎮座する組み込みではノイズ。組み込みでは以下を非表示に：',
      's04.f4.l1':'<b>サジェストチップ</b>（ホームのおすすめ質問）, デフォルト OFF',
      's04.f4.l2':'<b>思考ステップ</b>の展開出力',
      's04.f4.l3':'<b>Question-SQL pairs found</b>, モデル出所の非表示',
      's04.f4.l4':'<b>SQL / summarizing / chart instructions</b> のブロック',
      's04.f4.l5':'<b>候補モデル</b>, 組み込み内で LLM を選ばせない',
      's04.f4.note.label':'1 つだけ残した例外','s04.f4.note.body':'<b>追質問サジェスト</b>は残します。回答後にユーザーを動かし続ける最も低コストな手段で、技術的ではなく会話的に読まれます。"Undeployed changes detected, will deploy when you ask" バナーもカット：組み込みでデプロイ権限は無く、警告はノイズです。',
      's04.f5.eyebrow':'機能05 · エラー処理','s04.f5.title':'13 個のエラーコード、3 段階の重大度、1 つのルール',
      's04.f5.body':'組み込みは必ず壊れます, トークンは期限切れになり、データモデルは壊れ、クレジットは尽き、ユーザーは未ログイン。私が守ったルール：<em>組み込みサーフェスは絶対に真っ白にしない、そしてユーザーは誰の責任かが分かる。</em> 障害を 3 段階に分け、それぞれ別の UI 処理を与えました。',
      's04.f5.g1.tag':'フルページ','s04.f5.g1.title':'ブロッキング, 組み込み使用不可',
      's04.f5.e1':'ユーザー未ログイン','s04.f5.e2':'埋め込みモード無効','s04.f5.e3':'プロジェクトメンバー外',
      's04.f5.e4':'埋め込み設定なし','s04.f5.e5':'データモデル未デプロイ','s04.f5.e6':'内部重大エラー','s04.f5.e7':'AI サービス異常',
      's04.f5.g2.tag':'読み取り専用','s04.f5.g2.title':'クォータ, 閲覧可、質問不可',
      's04.f5.e8':'クォータ枯渇','s04.f5.e9':'API クレジット無し','s04.f5.e10':'モデル解析エラー',
      's04.f5.g3.tag':'スレッド内','s04.f5.g3.title':'操作系, 継続して質問可',
      's04.f5.e11':'スレッドが見つからない','s04.f5.e12':'タスクが見つからない','s04.f5.e13':'入力パラメータ不正',
      's04.f5.e14':'該当データなし','s04.f5.e15':'クエリを生成できません',
      's05.title':'05. サーフェス間のパリティ, 初日から SaaS と Self-hosted を揃える',
      's05.lede':'Wren AI はマネージド SaaS と顧客ホストの両方で出荷されます。Embedded Threads は両方で同一に振る舞う必要がありましたが、裏側の配管は静かに分岐させる必要がありました。デザイン作業の大半は、その分岐をエンドユーザーから見えなくすることでした。',
      's05.sa.tag':'サーフェス01 · SaaS','s05.sa.title':'Wren AI Cloud',
      's05.sa.k1':'アセット保存','s05.sa.v1':'Google Cloud Storage。ロゴ／チャットアイコンは <span class="mono">next/image</span> でアップロード。',
      's05.sa.k2':'課金','s05.sa.v2':'質問ごとに Web Credit。v1 はエンタープライズ層。',
      's05.sa.k3':'アクティビティ','s05.sa.v3':'単一の <span class="mono">org_audit_log</span> ストリーム。',
      's05.sh.tag':'サーフェス02 · Self-hosted','s05.sh.title':'顧客環境',
      's05.sh.k1':'アセット保存','s05.sh.v1':'Minio バケット <span class="mono">wrenai://{project_id}/...</span>。プレビューは <span class="mono">next/image</span> ではなくネイティブ <span class="mono">&lt;img&gt;</span> で描画し、顧客ドメインで正しく表示。',
      's05.sh.k2':'課金','s05.sh.v2':'API コール計測。<span class="mono">api_history</span> + <span class="mono">org_audit_log</span> を <span class="mono">org_audit_log_id</span> でリンク。',
      's05.sh.k3':'機能ゲート','s05.sh.v3':'ライセンス制御。埋め込みチャットは Enterprise Plus 層のみ（Cloud から 3 ヶ月後リリース）。',
      's05.note.label':'見えない分岐','s05.note.body':'Self-hosted の API Activity タブは、埋め込みスレッドの API history を意図的に<b>隠します</b>, 2 つのビューに重複表示するのではなく、Web Activity Log に 1 度だけ出す。小さな分類判断ですが、顧客がバグとして報告したであろう重複エントリを大量に整理しました。',
      's05.code.eyebrow':'クロスオリジン通信','s05.code.title':'postMessage, ホストと組み込みの唯一の契約',
      's05.code.body':'iframe はオリジン越しに関数呼び出しができません。ホストと組み込みの間を流れるすべて, config、リサイズヒント、コールバック, は <span class="mono">postMessage</span> 経由。顧客がプロトコルをリバースエンジニアリングしなくて済むよう、最小限の単一契約を文書化しました：',
      's06.title':'06. リリース, そして次に変えること',
      's06.s1.label':'リリース','s06.s1.foot':'SaaS（Wren 2.0）· 2026.3.20',
      's06.s2.label':'Self-hosted','s06.s2.foot':'同日。サーフェス間パリティ。',
      's06.s3.label':'モード','s06.s3.foot':'パブリック + アイデンティティ検証。',
      's06.s4.label':'エラーコード','s06.s4.foot':'3 重大度, 決して空白画面を見せない。',
      's06.r1.title':'トレードオフに名前をつけることこそが本体の仕事だった',
      's06.r1.story':'プロジェクト全体で最も価値ある 1 時間は、単一の"賢いモード"を<em>作らない</em>と決めた時間でした。清潔な二項対立, Public vs Identity, が以降のスペックを決めました：片方は URL 共有スレッド、もう片方はすべてを署名済みアイデンティティにスコープ。下流のエッジケース（クォータ、アクティビティ、エラーコード）すべてがその明瞭さを継承しました。',
      's06.r2.title':'エラーは第一級のサーフェスであり、後付けではない',
      's06.r2.story':'13 コードのエラー分類に、ハッピーパスとほぼ同じ時間を費やしました。組み込みは公衆の場で失敗します, 他社のプロダクト内で、他社のユーザーの前で。"何かうまくいきませんでした"では通用しません。重大度（ブロッキング／読み取り専用／スレッド内）を先に命名したことで、出荷時にはエンジニアリングとサポートが同じ語彙を話していました。',
      's06.r3.title':'パリティは想定より高くついた',
      's06.r3.story':'SaaS と Self-hosted を同一に感じさせること, Minio と GCS の切替、ライセンスゲート、<span class="mono">api_history</span> と <span class="mono">org_audit_log</span> の整合, に、デザイン-エンジニアリング時間の約 1/3 を使いました。次回は 1 週目からパリティ仕様を単独のアーティファクトとして書きます。',
      's06.r4.title':'次, 出荷だけでなく採用を測る',
      's06.r4.story':'v1 は出荷済み。v1.1 は傾聴。モード選択（Public vs Identity の割合）、組み込みユーザーの初質問までの時間、エラーコード頻度、クォータ枯渇率, この 4 シグナルが、私たちが可視化したトレードオフが顧客の実際の選択と一致するかどうかを教えてくれます。',
      'footer.back':'← ポートフォリオに戻る'
    },
    'zh-tw': {
      'nav.intro':'.簡介','nav.s01':'01.背景','nav.s02':'02.兩種模式','nav.s03':'03.業界參考','nav.s04':'04.系統','nav.s05':'05.跨介面','nav.s06':'06.上線',
      'title.big':'Embedded Threads：讓 Wren AI 在別人的產品裡也是一等公民',
      'title.sub':'設計整合、認證、用量與錯誤系統,讓 Wren AI 的對話式 BI 能住進 Notion、Tableau 與企業 SaaS, 不犧牲多租戶、信任或品牌。',
      'hero.eyebrow':'Wren AI · SaaS 0.53.0 · Self-hosted 1.9.0','hero.l1':'Wren AI','hero.l2':'住進','hero.l3':'你的產品。',
      'hero.m1':', Embedded Threads ,','hero.m2':'2026.2.16 → 2026.3.20',
      'intro.overview.label':'專案概述',
      'intro.overview.body':'Wren AI 是開源的對話式 BI,讓業務使用者用自然語言向資料提問。客戶越來越希望 Wren AI 住進<em>他們自己的介面</em>, Notion 側欄、內部 SaaS 儀表板、Tableau 面板, 而不是另開一個分頁。<b>Embedded Threads</b> 就是我為此設計的功能:兩種整合模式、Credit 用量控制、稽核級活動紀錄、品牌客製、以及一套 13 碼的錯誤代號系統,讓嵌入介面在出錯時也仍然得體。',
      'intro.role.label':'我的角色','intro.role.body':'三人交付團隊中<span class="stat-hi">唯一的設計師</span>, PM <b>Freda</b>、工程負責人 <b>Andy Yen</b>,與我。我負責端到端規格:模式架構、認證 UX、品牌客製介面、活動紀錄 schema、錯誤代號分類,以及 SaaS 與 Self-hosted 的對齊。',
      'intro.time.label':'公司・時間','intro.time.body':'Wren AI · 2026年2–3月 · 於 SaaS 0.53.0 (Wren 2.0) 與 Self-hosted 1.9.0 上線',
      's01.title':'01. 背景, BI 產品現在得住進別人的產品裡',
      's01.lede':'只住在自己網域的 BI 工具,是一個得要人專程拜訪的工具。真正留下來的客戶,是能把資料 Q&A 帶進決策現場的那些, Notion 文件、Tableau 儀表板、內部營運 SaaS。嵌入不是 nice-to-have,而是產品被拉過去的方向。',
      's01.pill1':'目標 · Notion · Tableau · 內部SaaS','s01.pill2':'平台 · SaaS + Self-hosted','s01.pill3':'版本 · Wren 2.0 · 2026.3.20','s01.pill4':'限制 · 5 週交付',
      's01.why.label':'為何嵌入卡住了導入','s01.why.body':'企業買家在試用時總是問同樣三個問題:<em>我的終端用戶會彼此看到對方的資料嗎?</em>、<em>每個專案的花費如何設上限?</em>、<em>嵌入在我的客戶面前壞掉時會怎樣?</em>。這些不是「demo」問題,而是決定能不能過的問題。',
      's01.bet.label':'設計上的賭注','s01.bet.body':'把 Embedded Threads 當成自己的產品介面, 而不是主 App 的刪減版。這意味著專屬的設定流程、不同的 UI 過濾策略、自己的稽核 schema、自己的錯誤詞彙。目標:宿主產品可以在一個下午內導入,採購會議中一次通過。',
      's01.insight.label':'定錨問題','s01.insight.body':'宿主產品真正想要的嵌入是哪一種? 讀到頁面的任何人都能對話的公開小工具,還是每個登入使用者只看得到自己歷史的多租戶面板? 先答好這題,整個架構才有辦法展開。',
      's02.title':'02. 兩種整合模式, 不把取捨藏起來,而是把它命名出來',
      's02.lede':'誘惑是:做一個「聰明」的單一模式,自己推斷租戶狀態。紀律是:拒絕這麼做。客戶必須在一個畫面裡,清楚看到部署速度與資料隔離之間的取捨, 然後睜著眼睛選。',
      's02.m1.eyebrow':'模式01 · 公開','s02.m1.title':'公開嵌入',
      's02.m1.body':'即插即用的 URL / iframe。不需登入。所有觀看者看到同一批共享 threads, 適合 Notion 頁面、公開文件、Demo 站。',
      's02.m1.k1':'最適合','s02.m1.v1':'Notion 側欄、Tableau 面板、公開文件',
      's02.m1.k2':'隔離','s02.m1.v2':'無。Threads 在觀看者之間共享。',
      's02.m1.k3':'設定','s02.m1.v3':'打開開關。複製 iframe。完成。',
      's02.m1.k4':'預設','s02.m1.v4':'<b>關閉</b>。必須由使用者主動開啟, 預設就會漏資料的嵌入,我們不出貨。',
      's02.m2.eyebrow':'模式02 · 身份驗證','s02.m2.title':'身份驗證嵌入',
      's02.m2.body':'JWT 簽章。宿主產品認證終端使用者,交給 Wren AI 一個短期身份 token,每個使用者只看得到自己的 threads, 在結構上就是多租戶。',
      's02.m2.k1':'最適合','s02.m2.v1':'企業 SaaS、內部工具、任何有登入的產品',
      's02.m2.k2':'隔離','s02.m2.v2':'嚴格的 per-user。Threads 依 token 上的 identity 切分。',
      's02.m2.k3':'設定','s02.m2.v3':'產生共享密鑰。在後端簽 JWT。傳給 iframe。',
      's02.m2.k4':'密鑰衛生','s02.m2.v4':'重置會讓未來的 iframe 載入失效,但活著的 session 仍保留到 token TTL, 故意的緩衝期,避免客戶一次輪替密鑰就把自己產品弄停擺。',
      's02.shot.label':'screenshot:Embed 設定頁, 模式切換、密鑰面板、預覽',
      's03.title':'03. 業界參考, 向 Metabase、Tableau、Power BI 學',
      's03.lede':'嵌入式分析是個成熟的領域。打開 Figma 之前,我花了一週讀 Metabase、Tableau、Power BI 怎麼解同一個問題, 不是為了照抄,而是為了知道成熟模式在哪裡結束、哪裡還能再簡化。',
      's03.r1.tag':'開源指標','s03.r1.body':'透過 JWT 簽章做 Static 與 Interactive 嵌入。透過 <span class="mono">postMessage</span> 做 iframe 動態高度同步。開發者端最俐落。','s03.r1.take':'借用:JWT 信任模型、高度同步用的 postMessage。',
      's03.r2.tag':'企業黃金標準','s03.r2.body':'Connected Apps + EAS,細緻的 JS API (v3):<span class="mono">filterTheView</span>、<span class="mono">getDataFromView</span>、事件監聽。','s03.r2.take':'刻意跳過:可程式化 JS SDK。對我們 Notion / Tableau 的 drop-in 情境太重。',
      's03.r3.tag':'Microsoft 生態','s03.r3.body':'把 Access Token (使用者認證) 與 Embed Token (資料授權) 分開,做 row-level security。Azure AD 味很重,但雙 token 分離在概念上很漂亮。','s03.r3.take':'評估過雙 token 拆分。v1 放棄, 現行租戶模型用單一 JWT 就夠。',
      's03.takeaway.label':'最後帶走的是什麼','s03.takeaway.body':'業界收斂到 JWT 信任 + postMessage 做 cross-origin UI 同步。我們分岔的地方是:<b>不要求 JS SDK</b>。客戶應該可以用貼上 iframe 標籤 + 一個後端 JWT 簽章函式就出貨 v1, 不需要更多。',
      's04.title':'04. 系統, 用量、活動紀錄、客製化、錯誤處理',
      's04.lede':'選模式只是第一步。底下還有四個系統要同時運作:Credit 用量上限、完整稽核軌跡、宿主端的品牌客製、13 碼錯誤詞彙。每個都有自己的邊界情境,每個在別人的產品裡 render 時都得像原生的。',
      's04.f1.eyebrow':'功能01 · 用量','s04.f1.title':'Web Credit 上限,依 Project,每月自動重置',
      's04.f1.body':'每一次嵌入對話都會燒 Web Credit。沒有上限的話,一個 bug 的 client 嵌入可能一個下午把客戶預算吃光。預設是 <span class="stat-hi">每個 project 每月 20 credits</span>,可依 project 調整,每月 1 號自動重置。打到上限就把嵌入切到<b>唯讀</b>, thread 還能看,但不能問, 客戶面向的介面不會突然變成空白錯誤頁。',
      's04.f1.s1.label':'作用範圍','s04.f1.s1.foot':'不是 per-user 而是 per-project, 以計費介面為準。',
      's04.f1.s2.label':'預設上限','s04.f1.s2.foot':'合理的天花板,demo 還跑得動。',
      's04.f1.s3.label':'重置','s04.f1.s3.foot':'每月 1 號,自動。',
      's04.f1.s4.label':'超額狀態','s04.f1.s4.foot':'Thread 可讀,發問停用。',
      's04.f2.eyebrow':'功能02 · 活動紀錄','s04.f2.title':'每次嵌入互動,都留下稽核級紀錄',
      's04.f2.body':'嵌入介面跑在宿主 App 之外,但 Project Owner 仍需要回答「誰在什麼時候問了什麼、花了多少」，給法遵、給除錯、給計量計費。我設計了一份有 7 種 action、帶租戶中繼資料的活動 schema,讓這份 log 不需要打開 query console 就讀得懂。',
      's04.f2.col1':'Action','s04.f2.col2':'訊息','s04.f2.col3':'關鍵 metadata',
      's04.f2.r1.msg':'${user} 透過 "${question}" 建立了 "${thread}"','s04.f2.r1.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r2.msg':'${user} 在 "${thread}" 問了追問','s04.f2.r2.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r3.msg':'${user} 刪除了 "${thread}"','s04.f2.r3.meta':'thread.id · thread.name · timestamp',
      's04.f2.r4.msg':'Owner 產生了共享密鑰','s04.f2.r4.meta':'(宿主層級操作)',
      's04.f2.r5.msg':'Owner 輪替了共享密鑰','s04.f2.r5.meta':'(未來 iframe 載入失效;活著的 session 保留到 TTL)',
      's04.f2.r6.msg':'${user} 儲存了 embedded threads 設定','s04.f2.r6.meta':'identity_verification · public_embed · chat_icon · logo · credit_limit · display_name',
      's04.f2.r7.msg':'${user} 產生了首頁建議問題','s04.f2.r7.meta':'recommended_questions · model_used · tokens · duration_ms',
      's04.f2.note.label':'一個慶幸當時做了的小決定','s04.f2.note.body':'Activity Log 裡的 thread 連結對嵌入 threads <b>停用</b>,tooltip 寫 <em>「Unavailable for embedded threads」</em>。點進去會開主 App,把嵌入端刻意不外露的介面曝光。Log 是紀錄,不是後門。',
      's04.f3.eyebrow':'功能03 · 客製化','s04.f3.title':'足以感覺原生的品牌控制。再多就不給。',
      's04.f3.body':'嵌入得看起來像是宿主產品的一部分, 但出錯時 Wren AI 仍得被辨識為底下的 BI 引擎。我把客製化收斂到四個會影響「擁有感」但不會隱藏底層產品的介面:公司 logo、chat icon、主題色、display name。其餘沿用 Wren AI 預設。',
      's04.f3.l1':'<b>公司 Logo</b>, 顯示在 iframe 標頭',
      's04.f3.l2':'<b>Chat Icon</b>, 每次回應的 AI 頭像',
      's04.f3.l3':'<b>主題色</b>, 主要強調色,跟隨宿主產品',
      's04.f3.l4':'<b>Display Name</b>, 嵌入在文案中怎麼稱呼自己',
      's04.f3.l5':'<b>RWD</b>, 在 Notion 側欄、底部彈窗、全頁 iframe 都能正常跑',
      's04.f3.shot':'screenshot:客製化預覽, 換 logo 與主題色前後',
      's04.f3.rwd.label':'RWD 互動區, 拖右下角改尺寸',
      's04.f3.rwd.body':'嵌入必須在 Notion 側欄(~393px)、網頁底部彈窗(~768px)、全頁 iframe(1024px+)裡行為一致。拖拽右下角,或切換下面的 preset,看布局如何坍縮, thread 清單先消失,再是追問 chips,最後 chart 縮小。',
      's04.rwd.preset.mobile':'行動 · 393','s04.rwd.preset.tablet':'平板 · 768','s04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖曳角落',
      's04.rwd.bp.mobile':'Mobile ≤ 480','s04.rwd.bp.tablet':'平板 481–900','s04.rwd.bp.desktop':'桌面 > 900',
      's04.rwd.mock.threads':'Threads (2)','s04.rwd.mock.new':'新增','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'訂單數最多的前三個城市是哪些?',
      's04.rwd.mock.q':'訂單數最多的前三個城市是哪些?',
      's04.rwd.mock.userq':'有多少產品?',
      's04.rwd.mock.patience':'請稍候, 正在處理你的請求！',
      's04.rwd.mock.show':'顯示思考步驟',
      's04.rwd.mock.step1':'找不到相關的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相關的 SQL query 指令',
      's04.rwd.mock.step3':'已辨識使用者意圖',
      's04.rwd.mock.step4':'找到 9 個候選模型',
      's04.rwd.mock.step5a':'思考時間','s04.rwd.mock.step6a':'SQL 語句生成','s04.rwd.mock.step7a':'抓取最多 500 筆資料',
      's04.rwd.mock.dp':'資料預覽','s04.rwd.mock.dpq':'products 資料集中有多少產品?','s04.rwd.mock.view':'查看資料',
      's04.rwd.mock.chart':'各城市訂單 · 前六名',
      's04.rwd.mock.answer':'產品目錄裡總共有 32,951 筆產品。',
      's04.rwd.mock.chip1':'在長條圖加上標籤','s04.rwd.mock.chip2':'只顯示前三名','s04.rwd.mock.chip3':'重命名標題',
      's04.rwd.mock.ask':'輸入問題來探索你的資料…',
      's04.rwd.dm.title':'在長條圖加上標籤','s04.rwd.dm.tab1':'資料預覽','s04.rwd.dm.tab2':'圖表',
      's04.rwd.dm.c1':'城市','s04.rwd.dm.c2':'訂單數','s04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市訂單數',
      's04.rwd.empty.title':'更了解你的資料','s04.rwd.empty.sub':'試著問...',
      's04.rwd.empty.tag1':'描述性問題','s04.rwd.empty.q1':'每個供應商的生產量單位成本是多少?',
      's04.rwd.empty.tag2':'資料品質與一致…','s04.rwd.empty.q2':'通過檢驗結果的產品的平均不良率如何…',
      's04.rwd.empty.tag3':'比較性問題','s04.rwd.empty.q3':'哪些運輸方式在路線 A 上的平均運送成本較低…',
      's04.rwd.drawer.t1':'Sample E','s04.rwd.drawer.t2':'Sample H',
      's04.f4.eyebrow':'功能04 · UI 過濾','s04.f4.title':'把管線藏起來,讓嵌入讀起來像聊天,不是工具',
      's04.f4.body':'主 Wren AI App 暴露了很多介面, 建議問題、思考步驟、Question-SQL pairs、chart 指令、candidate models。對 power user 都有用,對坐在別人 Notion 裡的嵌入則是噪音。嵌入中我隱藏了:',
      's04.f4.l1':'<b>建議問題 chips</b>(首頁層級), 預設關閉',
      's04.f4.l2':'<b>思考步驟</b>展開內容',
      's04.f4.l3':'<b>Question-SQL pairs found</b>, 模型出處隱藏',
      's04.f4.l4':'<b>SQL / summarizing / chart instructions</b> 區塊',
      's04.f4.l5':'<b>Candidate models</b>, 使用者在嵌入裡不選 LLM',
      's04.f4.note.label':'我爭取保留的一個例外','s04.f4.note.body':'<b>建議追問 (suggested follow-ups)</b>留下。這是回答之後讓使用者繼續動起來成本最低的方式,讀起來像對話不像技術。「Undeployed changes detected, will deploy when you ask」這段警示也砍掉:嵌入端的使用者不擁有 deploy 權,警告只是噪音。',
      's04.f5.eyebrow':'功能05 · 錯誤處理','s04.f5.title':'13 個錯誤代號,3 個嚴重度,1 條規則',
      's04.f5.body':'嵌入一定會壞, token 會過期、資料模型會斷、credit 會用完、使用者會沒登入。我堅守的規則是:<em>嵌入介面不能變空白,使用者永遠知道是誰的責任。</em> 我把錯誤分成三個嚴重度,每個都有專屬的 UI 處理。',
      's04.f5.g1.tag':'整頁','s04.f5.g1.title':'阻斷, 嵌入無法使用',
      's04.f5.e1':'使用者未登入','s04.f5.e2':'嵌入模式未開啟','s04.f5.e3':'不在專案成員內',
      's04.f5.e4':'無嵌入設定','s04.f5.e5':'尚未部署資料模型','s04.f5.e6':'內部系統嚴重錯誤','s04.f5.e7':'AI 服務異常',
      's04.f5.g2.tag':'唯讀','s04.f5.g2.title':'用量, 可讀,不可問',
      's04.f5.e8':'額度已用完','s04.f5.e9':'無 API 點數','s04.f5.e10':'模型解析錯誤',
      's04.f5.g3.tag':'對話內','s04.f5.g3.title':'操作性, 可繼續發問',
      's04.f5.e11':'找不到 Thread','s04.f5.e12':'找不到任務','s04.f5.e13':'輸入參數錯誤',
      's04.f5.e14':'找不到相關資料','s04.f5.e15':'無法生成查詢',
      's05.title':'05. 跨介面對齊, 第一天就讓 SaaS 與 Self-hosted 同步',
      's05.lede':'Wren AI 同時出 managed SaaS 與客戶自架版。Embedded Threads 在兩邊必須行為一致,但底下的管線得悄悄分岔。設計工作的大半,就是把這些分岔對終端使用者藏起來。',
      's05.sa.tag':'介面01 · SaaS','s05.sa.title':'Wren AI Cloud',
      's05.sa.k1':'資產儲存','s05.sa.v1':'Google Cloud Storage。Logo / chat icon 透過 <span class="mono">next/image</span> 上傳。',
      's05.sa.k2':'計費','s05.sa.v2':'每次發問計 Web Credit。v1 僅 enterprise 層開啟。',
      's05.sa.k3':'活動紀錄','s05.sa.v3':'單一 <span class="mono">org_audit_log</span> 串流。',
      's05.sh.tag':'介面02 · Self-hosted','s05.sh.title':'客戶環境',
      's05.sh.k1':'資產儲存','s05.sh.v1':'Minio bucket <span class="mono">wrenai://{project_id}/...</span>。預覽改用原生 <span class="mono">&lt;img&gt;</span>,不用 <span class="mono">next/image</span>,讓客戶的 domain 能正常顯示。',
      's05.sh.k2':'計費','s05.sh.v2':'計 API call。<span class="mono">api_history</span> + <span class="mono">org_audit_log</span> 以 <span class="mono">org_audit_log_id</span> 連結。',
      's05.sh.k3':'功能門檻','s05.sh.v3':'由 license 控制。嵌入 chat 僅 Enterprise Plus 層可用(比 Cloud 晚三個月)。',
      's05.note.label':'那個看不見的分岔','s05.note.body':'Self-hosted 的 API Activity tab 刻意<b>隱藏</b>嵌入 threads 的 api history, 這些已經在 web Activity Log 記過一次,不該在兩個檢視裡各出現一次。是很小的分類決定,但少了一大堆會被客戶當 bug 回報的重複紀錄。',
      's05.code.eyebrow':'跨 origin 溝通','s05.code.title':'postMessage, 宿主與嵌入唯一的契約',
      's05.code.body':'iframe 不能跨 origin 呼叫函式。宿主與嵌入之間流動的一切, config、resize 提示、callback, 都走 <span class="mono">postMessage</span>。我寫了一份最小、單一的契約,客戶不用逆向工程就能接:',
      's06.title':'06. 上線, 以及下次我會改什麼',
      's06.s1.label':'版本','s06.s1.foot':'SaaS (Wren 2.0) · 2026.3.20',
      's06.s2.label':'Self-hosted','s06.s2.foot':'同日。跨介面同步。',
      's06.s3.label':'模式','s06.s3.foot':'公開 + 身份驗證。',
      's06.s4.label':'錯誤代號','s06.s4.foot':'三級嚴重度, 不留空白頁。',
      's06.r1.title':'把取捨命名出來,才是真正的工作',
      's06.r1.story':'整個專案最有價值的一小時,是我們決定<em>不</em>做單一「聰明」模式那一小時。一個乾淨的二選一, Public vs Identity, 讓後面所有規格都自動對齊:一邊以 URL 共享 threads,另一邊把所有東西綁到簽章 identity。下游每一個邊界情境(用量、活動、錯誤代號)都繼承了這份清晰。',
      's06.r2.title':'錯誤是一等公民介面,不是事後補的',
      's06.r2.story':'13 碼錯誤分類花的時間幾乎等於 happy path。嵌入會在公眾場合壞, 在別人的產品裡、在別人的使用者面前。「Something went wrong」在那裡是不能接受的。先把嚴重度命名出來(阻斷 / 唯讀 / 對話內),出貨時工程跟 support 已經在講同一種語言。',
      's06.r3.title':'對齊成本比我預期的高',
      's06.r3.story':'讓 SaaS 與 Self-hosted 感覺一樣, 同時走 Minio vs GCS 的資產、license 卡關、<span class="mono">api_history</span> 與 <span class="mono">org_audit_log</span> 的對齊, 大概吃掉了設計-工程時間的 1/3。下次我會在第一週把對齊規格當獨立 artifact 寫,而不是擠在主規格的邊角。',
      's06.r4.title':'接下來, 要量測採用,而不只是出貨',
      's06.r4.story':'v1 已出;v1.1 是傾聽。我在埋 mode-selection(Public vs Identity 比例)、嵌入使用者的 first-ask time、錯誤代號頻率、用量耗盡率。這四個訊號會告訴我們,我們攤開的那個取捨,是不是客戶實際會做的選擇, 或者該把它合併、該再拆分。',
      'footer.back':'← 返回作品集'
    },
    'zh-cn': {
      'nav.intro':'.简介','nav.s01':'01.背景','nav.s02':'02.两种模式','nav.s03':'03.业界参考','nav.s04':'04.系统','nav.s05':'05.跨界面','nav.s06':'06.上线',
      'title.big':'Embedded Threads：让 Wren AI 在别人的产品里也是一等公民',
      'title.sub':'设计整合、认证、用量与错误系统，让 Wren AI 的对话式 BI 能嵌入 Notion、Tableau 与企业 SaaS, 不牺牲多租户、信任或品牌。',
      'hero.eyebrow':'Wren AI · SaaS 0.53.0 · Self-hosted 1.9.0','hero.l1':'Wren AI','hero.l2':'住进','hero.l3':'你的产品。',
      'hero.m1':', Embedded Threads ,','hero.m2':'2026.2.16 → 2026.3.20',
      'intro.overview.label':'项目概述',
      'intro.overview.body':'Wren AI 是开源的对话式 BI，让业务使用者用自然语言向数据提问。客户越来越希望 Wren AI 住进<em>他们自己的界面</em>, Notion 侧栏、内部 SaaS 仪表板、Tableau 面板, 而不是另开一个分页。<b>Embedded Threads</b> 就是我为此设计的功能：两种整合模式、Credit 用量控制、审计级活动记录、品牌定制、以及一套 13 码的错误代号系统，让嵌入界面在出错时也仍然得体。',
      'intro.role.label':'我的角色','intro.role.body':'三人交付团队中<span class="stat-hi">唯一的设计师</span>, PM <b>Freda</b>、工程负责人 <b>Andy Yen</b>，与我。我负责端到端规格：模式架构、认证 UX、定制界面、活动记录 schema、错误代号分类，以及 SaaS 与 Self-hosted 的对齐。',
      'intro.time.label':'公司・时间','intro.time.body':'Wren AI · 2026年2–3月 · 于 SaaS 0.53.0 (Wren 2.0) 与 Self-hosted 1.9.0 上线',
      's01.title':'01. 背景, BI 产品现在得住进别人的产品里',
      's01.lede':'只住在自己域名的 BI 工具，是一个得要人专程拜访的工具。真正留下来的客户，是能把数据 Q&A 带进决策现场的那些, Notion 文档、Tableau 仪表板、内部运营 SaaS。嵌入不是 nice-to-have，而是产品被拉过去的方向。',
      's01.pill1':'目标 · Notion · Tableau · 内部SaaS','s01.pill2':'平台 · SaaS + Self-hosted','s01.pill3':'版本 · Wren 2.0 · 2026.3.20','s01.pill4':'约束 · 5 周交付',
      's01.why.label':'为何嵌入卡住了落地','s01.why.body':'企业买家在试用时总是问同样三个问题：<em>我的终端用户会彼此看到对方的数据吗？</em>、<em>每个项目的花费如何设上限？</em>、<em>嵌入在我的客户面前坏掉时会怎样？</em>。这些不是"demo"问题，而是决定能不能过的问题。',
      's01.bet.label':'设计上的赌注','s01.bet.body':'把 Embedded Threads 当成自己的产品界面, 而不是主 App 的删减版。这意味着专属的设置流程、不同的 UI 过滤策略、自己的审计 schema、自己的错误词汇。目标：宿主产品可以在一个下午内接入，采购会议中一次通过。',
      's01.insight.label':'定锚问题','s01.insight.body':'宿主产品真正想要的嵌入是哪一种？ 读到页面的任何人都能对话的公开小部件，还是每个登录用户只看得到自己历史的多租户面板？ 先答好这题，整个架构才有办法展开。',
      's02.title':'02. 两种整合模式, 不把取舍藏起来，而是把它命名出来',
      's02.lede':'诱惑是：做一个"聪明"的单一模式，自己推断租户状态。纪律是：拒绝这么做。客户必须在一个画面里，清楚看到部署速度与数据隔离之间的取舍, 然后睁着眼睛选。',
      's02.m1.eyebrow':'模式01 · 公开','s02.m1.title':'公开嵌入',
      's02.m1.body':'即插即用的 URL / iframe。不需登录。所有观看者看到同一批共享 threads, 适合 Notion 页面、公开文档、Demo 站。',
      's02.m1.k1':'最适合','s02.m1.v1':'Notion 侧栏、Tableau 面板、公开文档',
      's02.m1.k2':'隔离','s02.m1.v2':'无。Threads 在观看者之间共享。',
      's02.m1.k3':'设置','s02.m1.v3':'打开开关。复制 iframe。完成。',
      's02.m1.k4':'默认','s02.m1.v4':'<b>关闭</b>。必须由用户主动开启, 默认就会漏数据的嵌入，我们不出货。',
      's02.m2.eyebrow':'模式02 · 身份验证','s02.m2.title':'身份验证嵌入',
      's02.m2.body':'JWT 签名。宿主产品认证终端用户，交给 Wren AI 一个短期身份 token，每个用户只看得到自己的 threads, 在结构上就是多租户。',
      's02.m2.k1':'最适合','s02.m2.v1':'企业 SaaS、内部工具、任何有登录的产品',
      's02.m2.k2':'隔离','s02.m2.v2':'严格的 per-user。Threads 依 token 上的 identity 切分。',
      's02.m2.k3':'设置','s02.m2.v3':'生成共享密钥。在后端签 JWT。传给 iframe。',
      's02.m2.k4':'密钥卫生','s02.m2.v4':'重置会让未来的 iframe 载入失效，但活着的 session 仍保留到 token TTL, 故意的缓冲期，避免客户一次轮替密钥就把自己产品弄停摆。',
      's02.shot.label':'screenshot：Embed 设置页, 模式切换、密钥面板、预览',
      's03.title':'03. 业界参考, 向 Metabase、Tableau、Power BI 学',
      's03.lede':'嵌入式分析是个成熟的领域。打开 Figma 之前，我花了一周读 Metabase、Tableau、Power BI 怎么解同一个问题, 不是为了照抄，而是为了知道成熟模式在哪里结束、哪里还能再简化。',
      's03.r1.tag':'开源标杆','s03.r1.body':'透过 JWT 签名做 Static 与 Interactive 嵌入。透过 <span class="mono">postMessage</span> 做 iframe 动态高度同步。开发者端最利落。','s03.r1.take':'借用：JWT 信任模型、高度同步用的 postMessage。',
      's03.r2.tag':'企业黄金标准','s03.r2.body':'Connected Apps + EAS，细致的 JS API (v3)：<span class="mono">filterTheView</span>、<span class="mono">getDataFromView</span>、事件监听。','s03.r2.take':'刻意跳过：可编程 JS SDK。对我们 Notion / Tableau 的 drop-in 情境太重。',
      's03.r3.tag':'Microsoft 生态','s03.r3.body':'把 Access Token (用户认证) 与 Embed Token (数据授权) 分开，做 row-level security。Azure AD 味很重，但双 token 分离在概念上很漂亮。','s03.r3.take':'评估过双 token 拆分。v1 放弃, 现行租户模型用单一 JWT 就够。',
      's03.takeaway.label':'最后带走的是什么','s03.takeaway.body':'业界收敛到 JWT 信任 + postMessage 做 cross-origin UI 同步。我们分岔的地方是：<b>不要求 JS SDK</b>。客户应该可以用贴上 iframe 标签 + 一个后端 JWT 签名函数就出货 v1, 不需要更多。',
      's04.title':'04. 系统, 用量、活动记录、定制、错误处理',
      's04.lede':'选模式只是第一步。底下还有四个系统要同时运作：Credit 用量上限、完整审计轨迹、宿主端的品牌定制、13 码错误词汇。每个都有自己的边界情境，每个在别人的产品里渲染时都得像原生的。',
      's04.f1.eyebrow':'功能01 · 用量','s04.f1.title':'Web Credit 上限，依 Project，每月自动重置',
      's04.f1.body':'每一次嵌入对话都会烧 Web Credit。没有上限的话，一个 bug 的 client 嵌入可能一个下午把客户预算吃光。默认是 <span class="stat-hi">每个 project 每月 20 credits</span>，可依 project 调整，每月 1 号自动重置。打到上限就把嵌入切到<b>只读</b>, thread 还能看，但不能问, 客户面向的界面不会突然变成空白错误页。',
      's04.f1.s1.label':'作用范围','s04.f1.s1.foot':'不是 per-user 而是 per-project, 以计费界面为准。',
      's04.f1.s2.label':'默认上限','s04.f1.s2.foot':'合理的天花板，demo 还跑得动。',
      's04.f1.s3.label':'重置','s04.f1.s3.foot':'每月 1 号，自动。',
      's04.f1.s4.label':'超额状态','s04.f1.s4.foot':'Thread 可读，发问停用。',
      's04.f2.eyebrow':'功能02 · 活动记录','s04.f2.title':'每次嵌入交互，都留下审计级记录',
      's04.f2.body':'嵌入界面跑在宿主 App 之外，但 Project Owner 仍需要回答"谁在什么时候问了什么、花了多少", 给合规、给 debug、给计量计费。我设计了一份有 7 种 action、带租户元数据的活动 schema，让这份 log 不需要打开 query console 就读得懂。',
      's04.f2.col1':'Action','s04.f2.col2':'消息','s04.f2.col3':'关键 metadata',
      's04.f2.r1.msg':'${user} 透过 "${question}" 建立了 "${thread}"','s04.f2.r1.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r2.msg':'${user} 在 "${thread}" 问了追问','s04.f2.r2.meta':'question · sql · answer · credit_used · duration_ms',
      's04.f2.r3.msg':'${user} 删除了 "${thread}"','s04.f2.r3.meta':'thread.id · thread.name · timestamp',
      's04.f2.r4.msg':'Owner 生成了共享密钥','s04.f2.r4.meta':'(宿主层级操作)',
      's04.f2.r5.msg':'Owner 轮替了共享密钥','s04.f2.r5.meta':'(未来 iframe 载入失效；活着的 session 保留到 TTL)',
      's04.f2.r6.msg':'${user} 保存了 embedded threads 设置','s04.f2.r6.meta':'identity_verification · public_embed · chat_icon · logo · credit_limit · display_name',
      's04.f2.r7.msg':'${user} 生成了首页建议问题','s04.f2.r7.meta':'recommended_questions · model_used · tokens · duration_ms',
      's04.f2.note.label':'一个庆幸当时做了的小决定','s04.f2.note.body':'Activity Log 里的 thread 链接对嵌入 threads <b>停用</b>，tooltip 写 <em>"Unavailable for embedded threads"</em>。点进去会开主 App，把嵌入端刻意不外露的界面曝光。Log 是记录，不是后门。',
      's04.f3.eyebrow':'功能03 · 定制','s04.f3.title':'足以感觉原生的品牌控制。再多就不给。',
      's04.f3.body':'嵌入得看起来像是宿主产品的一部分, 但出错时 Wren AI 仍得被辨识为底下的 BI 引擎。我把定制收敛到四个会影响"拥有感"但不会隐藏底层产品的界面：公司 logo、chat icon、主题色、display name。其余沿用 Wren AI 默认。',
      's04.f3.l1':'<b>公司 Logo</b>, 显示在 iframe 标头',
      's04.f3.l2':'<b>Chat Icon</b>, 每次回应的 AI 头像',
      's04.f3.l3':'<b>主题色</b>, 主要强调色，跟随宿主产品',
      's04.f3.l4':'<b>Display Name</b>, 嵌入在文案中怎么称呼自己',
      's04.f3.l5':'<b>RWD</b>, 在 Notion 侧栏、底部弹窗、全页 iframe 都能正常跑',
      's04.f3.shot':'screenshot：定制预览, 换 logo 与主题色前后',
      's04.f3.rwd.label':'RWD 互动区, 拖右下角改尺寸',
      's04.f3.rwd.body':'嵌入必须在 Notion 侧栏（~393px）、网页底部弹窗（~768px）、全页 iframe（1024px+）里行为一致。拖拽右下角，或切换下面的 preset，看布局如何坍缩, thread 清单先消失，再是追问 chips，最后 chart 缩小。',
      's04.rwd.preset.mobile':'移动 · 393','s04.rwd.preset.tablet':'平板 · 768','s04.rwd.preset.desktop':'桌面 · 1024',
      's04.rwd.hint':'↘ 拖拽角落',
      's04.rwd.bp.mobile':'Mobile ≤ 480','s04.rwd.bp.tablet':'平板 481–900','s04.rwd.bp.desktop':'桌面 > 900',
      's04.rwd.mock.threads':'Threads (2)','s04.rwd.mock.new':'新增','s04.rwd.mock.powered':'Powered by Wren AI',
      's04.rwd.mock.t1':'订单数最多的前三个城市是哪些？',
      's04.rwd.mock.q':'订单数最多的前三个城市是哪些？',
      's04.rwd.mock.userq':'有多少产品？',
      's04.rwd.mock.patience':'请稍候, 正在处理你的请求！',
      's04.rwd.mock.show':'显示思考步骤',
      's04.rwd.mock.step1':'找不到相关的 Question-SQL pair',
      's04.rwd.mock.step2':'找不到相关的 SQL query 指令',
      's04.rwd.mock.step3':'已识别用户意图',
      's04.rwd.mock.step4':'找到 9 个候选模型',
      's04.rwd.mock.step5a':'思考时间','s04.rwd.mock.step6a':'SQL 语句生成','s04.rwd.mock.step7a':'抓取最多 500 笔资料',
      's04.rwd.mock.dp':'数据预览','s04.rwd.mock.dpq':'products 数据集中有多少产品？','s04.rwd.mock.view':'查看数据',
      's04.rwd.mock.chart':'各城市订单 · 前六名',
      's04.rwd.mock.answer':'产品目录里总共有 32,951 笔产品。',
      's04.rwd.mock.chip1':'在柱状图加上标签','s04.rwd.mock.chip2':'只显示前三名','s04.rwd.mock.chip3':'重命名标题',
      's04.rwd.mock.ask':'输入问题来探索你的数据…',
      's04.rwd.dm.title':'在柱状图加上标签','s04.rwd.dm.tab1':'数据预览','s04.rwd.dm.tab2':'图表',
      's04.rwd.dm.c1':'城市','s04.rwd.dm.c2':'订单数','s04.rwd.dm.c3':'排名',
      's04.rwd.dm.chart':'各城市订单数',
      's04.rwd.empty.title':'更了解你的数据','s04.rwd.empty.sub':'试着问...',
      's04.rwd.empty.tag1':'描述性问题','s04.rwd.empty.q1':'每个供应商的生产量单位成本是多少？',
      's04.rwd.empty.tag2':'数据质量与一致…','s04.rwd.empty.q2':'通过检验结果的产品的平均不良率如何…',
      's04.rwd.empty.tag3':'比较性问题','s04.rwd.empty.q3':'哪些运输方式在路线 A 上的平均运送成本较低…',
      's04.rwd.drawer.t1':'Sample E','s04.rwd.drawer.t2':'Sample H',
      's04.f4.eyebrow':'功能04 · UI 过滤','s04.f4.title':'把管线藏起来，让嵌入读起来像聊天，不是工具',
      's04.f4.body':'主 Wren AI App 暴露了很多界面, 建议问题、思考步骤、Question-SQL pairs、chart 指令、candidate models。对 power user 都有用，对坐在别人 Notion 里的嵌入则是噪音。嵌入中我隐藏了：',
      's04.f4.l1':'<b>建议问题 chips</b>（首页层级）, 默认关闭',
      's04.f4.l2':'<b>思考步骤</b>展开内容',
      's04.f4.l3':'<b>Question-SQL pairs found</b>, 模型出处隐藏',
      's04.f4.l4':'<b>SQL / summarizing / chart instructions</b> 区块',
      's04.f4.l5':'<b>Candidate models</b>, 用户在嵌入里不选 LLM',
      's04.f4.note.label':'我争取保留的一个例外','s04.f4.note.body':'<b>建议追问 (suggested follow-ups)</b>留下。这是回答之后让用户继续动起来成本最低的方式，读起来像对话不像技术。"Undeployed changes detected, will deploy when you ask"这段警示也砍掉：嵌入端的用户不拥有 deploy 权，警告只是噪音。',
      's04.f5.eyebrow':'功能05 · 错误处理','s04.f5.title':'13 个错误代号，3 个严重度，1 条规则',
      's04.f5.body':'嵌入一定会坏, token 会过期、数据模型会断、credit 会用完、用户会没登录。我坚守的规则是：<em>嵌入界面不能变空白，用户永远知道是谁的责任。</em> 我把错误分成三个严重度，每个都有专属的 UI 处理。',
      's04.f5.g1.tag':'整页','s04.f5.g1.title':'阻断, 嵌入无法使用',
      's04.f5.e1':'用户未登录','s04.f5.e2':'嵌入模式未开启','s04.f5.e3':'不在项目成员内',
      's04.f5.e4':'无嵌入设置','s04.f5.e5':'尚未部署数据模型','s04.f5.e6':'内部系统严重错误','s04.f5.e7':'AI 服务异常',
      's04.f5.g2.tag':'只读','s04.f5.g2.title':'用量, 可读，不可问',
      's04.f5.e8':'额度已用完','s04.f5.e9':'无 API 点数','s04.f5.e10':'模型解析错误',
      's04.f5.g3.tag':'对话内','s04.f5.g3.title':'操作性, 可继续发问',
      's04.f5.e11':'找不到 Thread','s04.f5.e12':'找不到任务','s04.f5.e13':'输入参数错误',
      's04.f5.e14':'找不到相关数据','s04.f5.e15':'无法生成查询',
      's05.title':'05. 跨界面对齐, 第一天就让 SaaS 与 Self-hosted 同步',
      's05.lede':'Wren AI 同时出 managed SaaS 与客户自架版。Embedded Threads 在两边必须行为一致，但底下的管线得悄悄分岔。设计工作的大半，就是把这些分岔对终端用户藏起来。',
      's05.sa.tag':'界面01 · SaaS','s05.sa.title':'Wren AI Cloud',
      's05.sa.k1':'资产存储','s05.sa.v1':'Google Cloud Storage。Logo / chat icon 透过 <span class="mono">next/image</span> 上传。',
      's05.sa.k2':'计费','s05.sa.v2':'每次发问计 Web Credit。v1 仅 enterprise 层开启。',
      's05.sa.k3':'活动记录','s05.sa.v3':'单一 <span class="mono">org_audit_log</span> 流。',
      's05.sh.tag':'界面02 · Self-hosted','s05.sh.title':'客户环境',
      's05.sh.k1':'资产存储','s05.sh.v1':'Minio bucket <span class="mono">wrenai://{project_id}/...</span>。预览改用原生 <span class="mono">&lt;img&gt;</span>，不用 <span class="mono">next/image</span>，让客户的 domain 能正常显示。',
      's05.sh.k2':'计费','s05.sh.v2':'计 API call。<span class="mono">api_history</span> + <span class="mono">org_audit_log</span> 以 <span class="mono">org_audit_log_id</span> 关联。',
      's05.sh.k3':'功能门槛','s05.sh.v3':'由 license 控制。嵌入 chat 仅 Enterprise Plus 层可用（比 Cloud 晚三个月）。',
      's05.note.label':'那个看不见的分岔','s05.note.body':'Self-hosted 的 API Activity tab 刻意<b>隐藏</b>嵌入 threads 的 api history, 这些已经在 web Activity Log 记过一次，不该在两个视图里各出现一次。是很小的分类决定，但少了一大堆会被客户当 bug 回报的重复记录。',
      's05.code.eyebrow':'跨 origin 通信','s05.code.title':'postMessage, 宿主与嵌入唯一的契约',
      's05.code.body':'iframe 不能跨 origin 呼叫函数。宿主与嵌入之间流动的一切, config、resize 提示、callback, 都走 <span class="mono">postMessage</span>。我写了一份最小、单一的契约，客户不用逆向工程就能接：',
      's06.title':'06. 上线, 以及下次我会改什么',
      's06.s1.label':'版本','s06.s1.foot':'SaaS (Wren 2.0) · 2026.3.20',
      's06.s2.label':'Self-hosted','s06.s2.foot':'同日。跨界面同步。',
      's06.s3.label':'模式','s06.s3.foot':'公开 + 身份验证。',
      's06.s4.label':'错误代号','s06.s4.foot':'三级严重度, 不留空白页。',
      's06.r1.title':'把取舍命名出来，才是真正的工作',
      's06.r1.story':'整个项目最有价值的一小时，是我们决定<em>不</em>做单一"聪明"模式那一小时。一个干净的二选一, Public vs Identity, 让后面所有规格都自动对齐：一边以 URL 共享 threads，另一边把所有东西绑到签名 identity。下游每一个边界情境（用量、活动、错误代号）都继承了这份清晰。',
      's06.r2.title':'错误是一等公民界面，不是事后补的',
      's06.r2.story':'13 码错误分类花的时间几乎等于 happy path。嵌入会在公众场合坏, 在别人的产品里、在别人的用户面前。"Something went wrong"在那里是不能接受的。先把严重度命名出来（阻断 / 只读 / 对话内），出货时工程跟 support 已经在讲同一种语言。',
      's06.r3.title':'对齐成本比我预期的高',
      's06.r3.story':'让 SaaS 与 Self-hosted 感觉一样, 同时走 Minio vs GCS 的资产、license 卡关、<span class="mono">api_history</span> 与 <span class="mono">org_audit_log</span> 的对齐, 大概吃掉了设计-工程时间的 1/3。下次我会在第一周把对齐规格当独立 artifact 写，而不是挤在主规格的边角。',
      's06.r4.title':'接下来, 要测量采用，而不只是出货',
      's06.r4.story':'v1 已出；v1.1 是倾听。我在埋 mode-selection（Public vs Identity 比例）、嵌入用户的 first-ask time、错误代号频率、用量耗尽率。这四个信号会告诉我们，我们摊开的那个取舍，是不是客户实际会做的选择, 或者该把它合并、该再拆分。',
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
