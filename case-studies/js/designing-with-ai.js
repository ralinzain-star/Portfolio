// ===== i18n =====
    const I18N = {
      ja: {
        'nav.intro': '.イントロ',
        'nav.s01': '03.成果',
        'nav.s02': '01.背景',
        'nav.s03': '02.パイプライン',
        's01.title': '結び:1 人が 1 つのシステムになるとき',
        's01.body': 'これは Wren AI での私のリアルな数字、上のパイプラインが実際に稼働している証拠です。記録されているのは私の体力の限界ではなく、問いが「どうやってデザイン時間を増やすか」から「どうやってデザインするシステムを指揮するか」に変わったときに到達できる規模です。',
        's01.m1.label': '私はデザイナーであり、1 個軍団',
        's01.m1.note': '以前は、これには 6〜8 人の異なる職能(PM、リサーチャー、UI/UX、テクニカルライティング、モーションデザインまで)が必要でした。今、その境界は私の中で完全に崩壊しています。AI のレバレッジで、1 人が生産ライン全体を指揮できます。',
        's01.m2.label': '行列のないパラレルワールド',
        's01.m2.note': 'ここに<span class="stat-hi">「デザイン待ち」の空白時間はありません</span>。3〜4 つの戦線が同時進行: Agent Mode のロジック、Embedded Threads の体験、デザインシステムのメンテナンス。すべて稼働中で、列に並んで止まってはいません。',
        's01.m3.label': '構造に刻まれる時間',
        's01.m3.note': '週 16 時間、これは私が「人間」として支払わなければならないコミュニケーション税。40% の時間は会議でロックされ、削れません。つまり、<span class="stat-hi">残りの 1 分 1 分が数倍の価値を出さなければならない</span>ということです。',
        's01.m4.label': '24 時間、指揮者として',
        's01.m4.note': '会議を差し引いて、週に残る 24 時間こそが私の本当の戦場。<span class="stat-hi">1 プロジェクトあたり平均 6 時間にも満たない</span>。狂気の沙汰?いいえ、図面を描く職人ではなく、Claude Code を指揮して構想を実装するシステムオーナーになったとき、1 週間分のワークロードは本当に 6 時間の中に収まります。',
        'page.title': 'AI と共にデザインする',
        'page.subtitle': 'ソロデザイナーのためのシステムレベルのワークフロー, Wren AI で Claude Code を中心に再構築。',
        'intro.h3.product': '前提',
        'intro.product.body': '2026年初頭、Anthropic のあるデザイナーが「従来のデザインプロセスは死んだ」と宣言した。同じ頃、私は Wren AI のただ一人のプロダクトデザイナーだった, B2B AI プラットフォームのプロダクトデザインを一人で担い、週<span class="stat-hi">16時間</span>が会議で消え、常に<span class="stat-hi">3〜4件</span>のプロジェクトを並行して抱えていた。このケーススタディは、それを現実に可能にするために構築した 11 ステップの AI ワークフローを記録している。',
        'intro.h3.role': '私の役割',
        'intro.role.body': 'Wren AI のシニアプロダクトデザイナー。そして必然的に、<span class="stat-hi">PM、リサーチャー、UI/UX、テクニカルライター、モーションデザインまで</span>。このワークフローは、一人のデザイナーが従来<span class="stat-hi">〜6〜8 FTE</span>相当の職域を品質を保ちつつこなす方法です。',
        'intro.h3.time': 'タイムライン',
        'intro.time.body': '2026 → 現在',
        's02.title': 'このワークフローが存在する理由',
        's02.h3.moment': 'きっかけ',
        's02.moment.body': '2026年初頭。Anthropic のあるデザイナーが、従来のデザインプロセス（ディスカバリー → リサーチ → ワイヤーフレーム → モックアップ → スペック → ハンドオフ）は時代遅れだと主張する投稿を公開した。モデルはデザイナーがスケッチするより速く動くインターフェースを生成できる。成果物（Figma ファイル）はもはや価値の在処ではない。',
        's02.moment.body2': '私はそれを、たった一人のプロダクトデザイナーとして B2B AI スタートアップで読んだ。反対する余裕はなかった。現実はすでに私を押しつぶしていた：',
        's02.li1': '<span class="stat-hi">一人のデザイナー</span>が、プロダクトデザイン、ビジュアルデザイン、プロトタイピング、リサーチ、ブランドまで <span class="stat-hi">デザイン生産ライン全体</span> を一人で担う。',
        's02.li2': '週<span class="stat-hi">16 時間</span>が構造的に会議に拘束され、削減不能。',
        's02.li3': '<span class="stat-hi">毎週リリース</span>, 機能 1 件がブリーフからリリースまで、実作業時間は平均 1 週半以内。',
        's02.li4': 'エンジニアはすでに日常的に Claude Code を使用中, 私のハンドオフがその流れに合わなければ、私がボトルネックになる。',
        's02.li5': '採用を排除するスタートアップ予算。',
        's02.h3.reframe': '視点の転換',
        's02.reframe.body': '古い問い, <span class="stat-hi">「どうやってデザイン時間を絞り出すか」</span>, には答えがなかった。週は満杯だった。新しい問いはこうなった：<span class="stat-hi">「デザインするシステムをどう指揮するか」</span>',
        's02.reframe.body2': 'Claude Code がそのシステムになった。時折触れるツールではなく、中央のオーケストレーション層として, スペック、prototype、リサーチサマリー、マーケティング動画、Notion 更新、プロダクトドキュメントがすべて通過する場所として。以下が辿り着いたパイプラインです。',
        's03.title': '11 ステップの AI パイプライン',
        's03.h3': 'ステップ 00 → 11',
        's03.body': '各ステップは Claude Code のスキル、プラグイン、またはツール間のスクリプト化されたハンドオフです。下の縦の背骨は時系列で読めます, 分析から始まり、スペック、journey、prototype、Figma、ハンドオフ、動画、ブランド、ドッグフーディング、PM オプス、外部ドキュメントまで。',
        's03.step0.title': '行動分析＆バックテスト',
        's03.step0.story': 'Claude Code のスキルが、アナリティクスイベント、セッションレコーディング、サポートチケットを取り込む。ファネル離脱、摩擦パターン、異常値を含む行動レポートを生成し、前回のデザイン変更と突き合わせて実際に何が動いたかを検証する。',
        's03.step0.tool': 'Claude Code スキル',
        's03.step0.output': '週次行動レポート＋デザイン差分レビュー',
        's03.step0.replaces': 'データアナリスト＋UX リサーチャー',
        's03.step0.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-research</span><span class="skill-arch-sub">行動モード · 週次</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">生シグナル収集, 分析イベント、セッション録画、サポートチケット</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">統合, 親和図 → インパクト／工数 → ジョブ理論</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">パターン抽出, ファネル離脱、フリクション、異常値</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">バックテスト, 前回のデザイン変更と差分を取り、実リフトを測定</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">行動レポート作成, ランク付け所見＋デザイン差分レビュー</span></li></ol><div class="skill-arch-foot">毎週月曜に実行。レポートはステップ 01 に供給される, 新規スペックはすべてデータが実際に示したものから始まる。</div>',
        's03.step1.title': 'スペック作成＆機能ブレスト',
        's03.step1.story': 'CEO からの一行ブリーフが、フルスペックになる, 課題定義、スコープ、エッジケース、受け入れ基準、リスクリスト, プロダクトの面と既存のデザインシステムを把握している Claude Code スキル内で。私は文章ではなく、議論の形を編集する。',
        's03.step1.tool': 'Claude Code スキル',
        's03.step1.output': 'PRD 水準のスペック＋エッジケース＆受け入れ基準',
        's03.step1.replaces': 'プロダクトマネージャー',
        's03.step1.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">prd-development</span><span class="skill-arch-sub">8 フェーズのワークフロー</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">エグゼクティブサマリー</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">課題定義, エビデンスに基づく顧客の痛み</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">ターゲットユーザー＆ペルソナ</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">戦略コンテキスト, OKR、市場、Why now</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">ソリューション概要, 高レベルの形、フロー</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">成功指標, プライマリ / セカンダリ / ガードレール</span></li><li><span class="skill-arch-no">07</span><span class="skill-arch-ph">user journey＆要件</span></li><li><span class="skill-arch-no">08</span><span class="skill-arch-ph">スコープ外＆依存関係</span></li></ol><div class="skill-arch-foot">2〜4 日で 8 つ以上のコンポーネント／インタラクティブ スキルをオーケストレーション。</div>',
        's03.step2.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">journey-map</span><span class="skill-arch-sub">6 ステップのビルダー</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">入力ソース, 会話 / ファイル / Figma</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">journeyデータ収集, ステージ、アクション、レスポンス、タグ</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">確認ループ, ツリー要約で反復</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">JSON 生成, <code>docs/journeys/{slug}.json</code></span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">HTML 生成, データ駆動のスタイル付きレンダリング</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">完了 → <code>/dogfooding</code> に引き継ぎ</span></li></ol><div class="skill-arch-foot">以降のすべてのステップが参照する単一の事実ソースを出力。</div>',
        's03.step2.title': 'HTML としてのuser journey',
        's03.step2.story': 'スペックがスキルに流れ込み、インタラクティブな HTML user journeyを生み出す, ステージ、アクション、感情、ペインポイント、機会の瞬間。リンクで共有でき、レビュー編集に耐え、以降のすべてのステップが参照する単一の真実源になる。',
        's03.step2.tool': 'Claude Code スキル → HTML',
        's03.step2.output': 'インタラクティブなjourney map（スタンドアロンリンク）',
        's03.step2.replaces': 'サービスデザイナー / UX リサーチャー',
        's03.step3.title': 'user journey + Storybook からprototype',
        's03.step3.story': 'journey HTML とチームの Storybook コンポーネントドキュメントをスキルに投入する。ルーティング、ステート、インタラクション、ダミーデータを備えた動く HTML/CSS/JS prototypeが生成される。',
        's03.step3.tool': 'Claude Code スキル＋Storybook',
        's03.step3.output': '実行可能な HTML/CSS/JS prototype',
        's03.step3.replaces': 'プロトタイパー / フロントエンドデザイナー',
        's03.step3.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Reference</span><span class="skill-arch-slug">storybook</span><span class="skill-arch-sub">中身</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">ファウンデーション, デザイントークン（カラー、タイポグラフィ、スペーシング、ラディアス、モーション）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">コンポーネント, 全 UI プリミティブを variant × state（default、hover、active、disabled、loading、error）網羅</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">パターン, 組み合わせブロック（ツールバー、空状態、オンボーディング、サイドパネル）</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">インタラクション stories, play 関数で hover / focus / loading / error のパスを再現</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">ドキュメント, 自動生成の prop テーブル＋利用ガイドライン</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">A11y アドオン, コントラスト、キーボード操作、aria ロールを全 story でチェック</span></li></ol><div class="skill-arch-foot">Claude は Storybook を「何が再利用できるか」の事実ソースとして読む。既存コンポーネントがあるなら、それを使う, prototype で再発明しない。</div>',
        's03.step4.title': 'Claude Code で反復',
        's03.step4.story': 'prototypeを Claude Code 上で直接修正する, フローを練り直し、ステートを締め、空 / エラー / ロード分岐を埋める。インタラクションデザインが起きる場所はもうここです, Figma のフレームではなく、動くコードの中。prototypeが正式なデザイン成果物になります。並行して、既存コンポーネントでニーズを満たせるか評価し、足りない場合は <code>design-system</code> エージェントを起動して新コンポーネントを共同で作成する。',
        's03.step4.tool': 'Claude Code（手動ディレクション）',
        's03.step4.output': 'レビュー可能なprototype v1',
        's03.step4.replaces': 'インタラクションデザイナー',
        's03.step4.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Agent</span><span class="skill-arch-slug">design-system</span><span class="skill-arch-sub">5 オプションのメニュー型エージェント</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">既存コンポーネント検索, 作る前に再利用をチェック</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">コンポーネント分析, 6 フェーズのスペック（分解 → 状態 → インタラクション）</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">prototypeビルダー, インタラクティブ HTML を生成</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">Figma コンポーネントドキュメント, スペックページの作成</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">ハンドオフ評価, フロントエンド引き渡し前の準備度チェック</span></li></ol><div class="skill-arch-foot">必要時に <code>DESIGN-COMPONENTS.md</code> ＋ <code>DESIGN-TOKENS.md</code> を読み、Figma MCP でデザインコンテキストを取得。1 回 1 スキル、フェーズ省略なし。</div>',
        's03.step5.title': 'Figma → Figma Make → prototypeへ戻す',
        's03.step5.story': 'prototypeを Figma に取り込み、レイアウトを整え、デザインシステムに対するコンポーネント利用を修正する。次に Figma Make に入れ、表示ステートの探索と代替レイアウトの高速テストを行う。勝ち残ったものは Claude Code にプロンプトとして戻し、prototypeを更新する。ピクセルに直接触れるのはここだけ, そして一番短いステップです。',
        's03.step5.tool': 'Figma ＋ Figma Make ⇄ Claude Code',
        's03.step5.output': 'デザインシステム整合済みprototype v2',
        's03.step5.replaces': 'UI デザイナー',
        's03.step5.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Loop</span><span class="skill-arch-slug">figma ⇄ claude-code</span><span class="skill-arch-sub">ピクセル探索の回り道</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">prototype を Figma に取り込み, Figma MCP コネクターで同期、レイアウトを再編成してデザインシステムのトークンに合わせる</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">HTML ファイルをそのまま Figma Make に貼る, 再構築せずに状態や代替版面を即探索</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">バリアント生成, 同じプロンプトで 3〜5 種のレイアウト／ステート組み合わせを並列で</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">勝者を選ぶ, 見た目ではなくデザインシステムとの整合性で横並び比較</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">プロンプトで書き戻す, Claude Code が prototype を更新し、Figma とパリティを保つ</span></li></ol><div class="skill-arch-foot">コネクター同期がデフォルトのループ。HTML 直貼りは、コミットされた変更ではなく高速探索が欲しいときのエスケープハッチ。</div>',
        's03.step6.title': 'ハンドオフ：Figma＋prototype → エンジニア → Claude',
        's03.step6.story': 'エンジニアは Figma <em>と</em>動くprototypeの両方を受け取る。prototypeを自分の Claude Code セッションに投入して本番コードを生成する, 私のprototypeをモックではなく、実行可能なスペックとして扱う。翻訳すべきものが無いので、ハンドオフの曖昧さはほぼゼロに落ちる。',
        's03.step6.tool': 'スペックとしてのprototype → エンジニアの Claude',
        's03.step6.output': '本番投入可能なフィーチャーブランチ',
        's03.step6.replaces': 'デザインエンジニア / デザインオプス',
        's03.step6.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">wren-ux-writing</span><span class="skill-arch-sub">コピーレビュー · en / zh-TW / ja</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">ボイスプロファイルをロード, <code>voice-profile-en.md</code> ＋ <code>patterns.md</code>（トーン＋標準文言）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">パターン適用, ボタン、エラー、空状態、確認、バリデーション</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">グロッサリー確認, <code>i18n/glossary.md</code> で用語マッピングをロケール横断で統一</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">ローカライズ, <code>i18n/zh-tw.md</code> / <code>i18n/ja.md</code> のリライト、逐語訳ではない</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">レビューパス, <code>review.md</code> で声・明瞭さ・一貫性をハンドオフ前にチェック</span></li></ol><div class="skill-arch-foot">prototype のコピーとエンジニアリング branch の両方で走る。出力はグロッサリー整合済みの EN / zh-TW / ja 文字列, コードレビューで文言修正ラウンドを挟まずにリリース可能。</div>',
        's03.step7.title': 'Remotion でマーケティング動画',
        's03.step7.story': 'Claude Code が同じprototypeを Remotion でラップし、ローンチ動画を生成する, シーンタイミング、画面上のキャプション、ボイスオーバー下書きまで。私が After Effects を開かなくても、マーケは編集即可能な MP4 を手にする。デザイン成果物とマーケ成果物が同じ源を共有する。',
        's03.step7.tool': 'Claude Code ＋ Remotion',
        's03.step7.output': 'マーケティング用ローンチ動画（MP4）',
        's03.step7.replaces': 'モーションデザイナー / 動画編集者',
        's03.step7.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Framework</span><span class="skill-arch-slug">remotion</span><span class="skill-arch-sub">React → MP4</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">React/TS で構成, シーン = コンポーネント、タイム = props</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">パラメータ化, <code>inputProps</code> でコピー／データ／色を差し替え</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">Studio でプレビュー, ホットリロードのタイムライン</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">MP4 にレンダリング, CLI、サーバー、Remotion Lambda</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">Player で埋め込み, 同じコンポジションをアプリ内に（任意）</span></li></ol><div class="skill-arch-foot">ソース = prototype。同じ React コンポーネントでデザイン成果物とマーケティング MP4 を両立、After Effects 不要。</div>',
        's03.step8.title': 'ブランド：マスコット、バナー、ティザー動画',
        's03.step8.story': 'Gemini、Weave、Lovart（フリーティアのみ）がブランドレイヤーをカバーする, 会社マスコットのイラスト、キャンペーンバナー、短いティザー動画。',
        's03.step8.tool': 'Gemini ＋ Weave ＋ Lovart（無料）',
        's03.step8.output': 'マスコット、バナー一式、ティザー動画',
        's03.step8.replaces': 'イラストレーター / ブランドデザイナー',
        's03.step9.title': 'ドッグフーディング → サマリー → タスク割り当て',
        's03.step9.story': 'prototypeを駆動したのと同じuser journeyが、ドッグフーディング用チェックリストも生成する。社内テスターが埋め、Claude Code スキルが所見を統合し、重大度で並べ、修正案を提示し、担当者別にタスクを下書きする。月曜朝にはもう、手書きしていないスプリント準備済みバックログが揃っている。',
        's03.step9.tool': 'journey map＋ Claude Code スキル',
        's03.step9.output': 'ドッグフーディングサマリー＋優先度順タスク',
        's03.step9.replaces': 'UX リサーチャー＋プログラムマネージャー',
        's03.step9.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">dogfooding</span><span class="skill-arch-sub">6 ステップのフォーム生成</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">ソース選択, 既存journey / ファイル / ゼロから</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">分析＆変換, 4〜5 個のテスト可能なセクションに再編成</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">確認ループ, 構造サマリーで反復</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">出力先, Notion ページ / ローカル Markdown</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">フォーム生成, セクション＋バグ／評価／Exit 基準</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">言語, デフォルト英語、journeyに応じて zh-TW</span></li></ol><div class="skill-arch-foot">テスター 1 人 20 分が予算。<code>docs/journeys/{slug}.json</code> を参照, prototypeを駆動した同じソース。</div>',
        's03.step10.title': 'PM オプス：Notion 同期と作業負荷計算',
        's03.step10.story': 'Claude が Notion のプロダクトロードマップをバックログに照らして更新し、各メンバーの作業負荷を再計算し、爆発する前に過密週をあぶり出す。週次ロードマップレビューは、2 時間のスプレッドシート作業ではなく、Claude の下書きを 10 分で確認するだけの仕事になる。',
        's03.step10.tool': 'Claude ＋ Notion MCP',
        's03.step10.output': '更新済みロードマップ＋作業負荷アラート',
        's03.step10.replaces': 'プロデューサー / PM オプス',
        's03.step10.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">roadmap-planning</span><span class="skill-arch-sub">5 フェーズのワークフロー</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">インプット収集, 事業目標、顧客課題、制約</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">イニシアチブ定義, 仮説＆指標付きのエピック</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">優先順位付け, インパクト／工数／戦略適合で評価</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">シーケンス, 依存関係を踏まえたリリース／四半期配置</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">コミュニケーション, Now / Next / Later のナラティブ</span></li></ol><div class="skill-arch-foot">機能リストではなく成果ドリブン。Notion に同期され、ロードマップ・バックログ・作業負荷計算が 1 つの面に集約される。</div>',
        's03.step11.title': '外部プロダクトドキュメント',
        's03.step11.story': 'journey map＋ Claude Code スキル＋ Claude Chrome プラグインが、顧客向けドキュメントを生み出す, ヘルプセンターページ、API リファレンスの雛形、リリースノート下書き。prototypeを駆動したのと同じ源が、機能ローンチ時にユーザーが読む言葉も駆動する。',
        's03.step11.tool': 'journey＋ Claude スキル＋ Claude Chrome プラグイン',
        's03.step11.output': '外部プロダクトドキュメント',
        's03.step11.replaces': 'テクニカルライター / コンテンツデザイナー',
        's03.step11.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-facing-docs</span><span class="skill-arch-sub">PRD → 4 セクションの Markdown</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">PRD ソースを尋ねる, 貼り付け or Notion URL</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">トーン確認, フレンドリー／テクニカル／フォーマル</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">PRD 解析＆書き換えルール適用, 社内言葉を削除</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">4 セクション生成, Overview · How It Works · Using · Tips</span></li></ol><div class="skill-arch-foot">PRD を読み、ユーザー視点で書き直し、エンジニアリング／PM フレーミングを落とす。ヘルプセンターおよびマニュアル向け, ツールチップやリリースノートではない。</div>',
      },
      'zh-tw': {
        'nav.intro': '.簡介',
        'nav.s01': '03.成就',
        'nav.s02': '01.背景',
        'nav.s03': '02.流程',
        's01.title': '結語: 當一個人運作成一套系統',
        's01.body': '這是我在 Wren AI 的真實數字，也是上面那套流程確實在運作的證據。它們記錄的不是我的體力極限，而是當提問從「怎麼擠出更多設計時間」變成「怎麼指揮一套能設計的系統」之後，所能達到的規模。',
        's01.m1.label': '我是設計師，也是一支軍隊',
        's01.m1.note': '以前，這需要 6 到 8 個不同職能的腦袋: PM、研究員、UI/UX、技術文案、甚至動效設計。現在，這些邊界在我這裡徹底塌縮。藉由 AI 的槓桿，我一個人就能統籌整條生產線。',
        's01.m2.label': '拒絕排隊的平行時空',
        's01.m2.note': '這裡<span class="stat-hi">沒有「等設計稿」的空窗期</span>。3 到 4 條戰線同時推進: Agent Mode 的邏輯、Embedded Threads 的體驗、設計系統的維護，全部處於活動狀態，而非排隊掛機。',
        's01.m3.label': '被結構化切碎的時間',
        's01.m3.note': '每週 16 小時，是我身為「人類」必須付出的溝通稅。這 40% 的時間被會議鎖死，無法刪減。這也意味著，<span class="stat-hi">剩下的每一分鐘都必須發揮數倍的價值</span>。',
        's01.m4.label': '24 小時的「指揮家」時刻',
        's01.m4.note': '扣掉會議，每週剩下的 24 小時是我真正的戰場。<span class="stat-hi">每個專案平均分不到 6 小時</span>。聽起來很瘋狂？但當我不再是畫圖的工匠，而是指揮 Claude Code 實踐構思的系統負責人，一週的工作量，確實在 6 小時內落地。',
        'page.title': '與 AI 一起設計',
        'page.subtitle': '為獨立設計師打造的系統級工作流, 在 Wren AI 以 Claude Code 為核心重構。',
        'intro.h3.product': '起點',
        'intro.product.body': '2026 年初，一位 Anthropic 的設計師宣告：傳統設計流程已死。那時我正是 Wren AI 唯一的產品設計師, 一個人扛著一整個 B2B AI 平台的產品設計，每週<span class="stat-hi">16 小時</span>被會議吞掉，同時還有<span class="stat-hi">3–4 個專案</span>並行推進。這份案例記錄了我為了讓這件事真的可行，親手搭起來的 11 步 AI 工作流。',
        'intro.h3.role': '我的角色',
        'intro.role.body': 'Wren AI 資深產品設計師。也因為現實需要:<span class="stat-hi">PM、研究員、UI/UX、技術文案、甚至動效設計</span>。這套工作流是一個人如何扛下<span class="stat-hi">約 6–8 個 FTE</span>的傳統職能範圍，又不讓作品品質掉下來的方法。',
        'intro.h3.time': '時間',
        'intro.time.body': '2026 → 至今',
        's02.title': '為什麼會長出這套工作流',
        's02.h3.moment': '那一刻',
        's02.moment.body': '2026 年初，一位 Anthropic 設計師的文章打破了寧靜。他主張傳統設計流程(探索、研究、線框、視覺、規格、交付)已成遺跡。當模型產出可運作介面的速度超越了設計師落筆草圖的速度，那個精心雕琢的 Figma 檔案，便不再是價值的核心。',
        's02.moment.body2': '當時，身為 B2B AI 新創唯一的產品設計師，我讀著文章，身後是步步進逼的現實：',
        's02.li1': '<span class="stat-hi">一人分飾多角</span>：從產品設計、品牌視覺到用戶研究，我就是<span class="stat-hi">整條設計生產線</span>。',
        's02.li2': '<span class="stat-hi">會議夾縫求生</span>：每週 <span class="stat-hi">16 小時</span> 的結構性會議如鐵律般無法刪減。',
        's02.li3': '<span class="stat-hi">每週都有新 release</span>,一個功能從 brief 到上線，實際設計時間平均不超過一週半。',
        's02.li4': '<span class="stat-hi">工程節奏的衝擊</span>：開發端早已全面導入 Claude Code。如果我的產出無法與他們的自動化流程對接，我就是團隊最大的瓶頸。',
        's02.li5': '<span class="stat-hi">預算天花板</span>：新創的資源條件封死了招聘的可能。',
        's02.h3.reframe': '視角轉換',
        's02.reframe.body': '舊問題,<span class="stat-hi">「怎麼擠出更多設計時間」</span>,已是死路；那一週早就滿了。新問題變成：<span class="stat-hi">「怎麼指揮一套能設計的系統」</span>',
        's02.reframe.body2': '答案只有一個：我不再是生產零件的人，而是指揮系統運作的人,而 Claude Code，就是那個系統。規格、prototype、研究摘要、行銷影片、Notion 更新、產品文件，全部都流經它。以下就是我最後落地的這套流程。',
        's03.title': '11 步 AI 流程',
        's03.h3': 'Steps 00 → 11',
        's03.body': '每一步都是一個 Claude Code skill、一個外掛，或是工具之間寫好的腳本交接。下方這條縱向主幹按時間順序讀, 從頂端的行為數據開始，依序經過規格、journey、prototype、Figma、交付、影片、品牌、dogfooding、PM ops,到外部文件。',
        's03.step0.title': '行為分析與回測',
        's03.step0.story': '一個 Claude Code skill 吃進數據事件、session 錄影和客服 ticket,產出一份行為報告, 漏斗流失、摩擦模式、異常點, 再拿它跟上一輪設計改動做回測，看看什麼東西真的有動。',
        's03.step0.tool': 'Claude Code skill',
        's03.step0.output': '週度行為報告＋設計差異檢視',
        's03.step0.replaces': '資料分析師＋UX 研究員',
        's03.step0.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-research</span><span class="skill-arch-sub">行為模式 · 週節奏</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">抓原始訊號, 分析事件、session 錄影、客服 ticket</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">整合, 親和圖 → 影響力 / 成本 → Jobs-to-be-done</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">撈出模式, 漏斗流失、摩擦、異常點</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">回測, 跟上一輪設計改動做 diff,量真實有動的部分</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">寫行為報告, 排序後的發現＋設計差異檢視</span></li></ol><div class="skill-arch-foot">每週一跑一次。報告會餵進 step 01, 每一份新規格都從「資料真的有動的那塊」開始。</div>',
        's03.step1.title': '規格撰寫與功能發想',
        's03.step1.story': 'CEO 丟來的一句話 brief,會變成一份完整規格, 問題陳述、範圍、邊界案例、驗收條件、風險清單, 在一個了解產品切面與現有設計系統的 Claude Code skill 裡完成。我修改論述的結構，而不是逐字潤稿。',
        's03.step1.tool': 'Claude Code skill',
        's03.step1.output': 'PRD 等級規格，含邊界案例與驗收條件',
        's03.step1.replaces': '產品經理',
        's03.step1.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">prd-development</span><span class="skill-arch-sub">8 階段工作流</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">執行摘要</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">問題陳述, 有證據的客戶痛點</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">目標用戶與 Persona</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">策略脈絡, OKR、市場、為何是現在</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">解法概觀, 高層次輪廓與流程</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">成功指標, 主指標 / 次指標 / 防守指標</span></li><li><span class="skill-arch-no">07</span><span class="skill-arch-ph">user journey與需求</span></li><li><span class="skill-arch-no">08</span><span class="skill-arch-ph">範圍外與依賴</span></li></ol><div class="skill-arch-foot">在 2–4 天內串起 8+ 個元件與互動子 skill。</div>',
        's03.step2.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">journey-map</span><span class="skill-arch-sub">6 步驟建構器</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">輸入來源, 對話 / 檔案 / Figma</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">蒐集 user journey 資料, 階段、行為、系統反應、標籤</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">確認回圈, 樹狀摘要反覆校正</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">輸出 JSON, <code>docs/journeys/{slug}.json</code></span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">輸出 HTML, 資料驅動的樣式渲染</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">完成 → 交棒給 <code>/dogfooding</code></span></li></ol><div class="skill-arch-foot">產出是後續每一步都會參照的單一事實來源。</div>',
        's03.step2.title': '以 HTML 呈現的user journey',
        's03.step2.story': '規格餵進一個 skill,產出一份互動式 HTML user journey, 階段、行為、情緒、痛點、機會時刻。它可以用連結分享、經得起 review 修改，並成為後面每一步都會參照的單一事實來源。',
        's03.step2.tool': 'Claude Code skill → HTML',
        's03.step2.output': '互動式journey map(獨立連結)',
        's03.step2.replaces': '服務設計師 / UX 研究員',
        's03.step3.title': '用 User Journey + Storybook 做 Prototype',
        's03.step3.story': '我把journey HTML 和團隊的 Storybook 元件文件一起丟進一個 skill,它會生出一份可運行的 HTML/CSS/JS prototype, 路由、狀態、互動、假資料都齊全。',
        's03.step3.tool': 'Claude Code skill＋Storybook',
        's03.step3.output': '可執行的 HTML/CSS/JS prototype',
        's03.step3.replaces': 'prototype製作者 / 前端設計師',
        's03.step3.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Reference</span><span class="skill-arch-slug">storybook</span><span class="skill-arch-sub">裡面有什麼</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">Foundations, design tokens（色、字體、間距、圓角、動效）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">Components, 所有 UI primitive,含每個 variant × state（default、hover、active、disabled、loading、error）</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">Patterns, 組合區塊（toolbar、空狀態、onboarding、side panel）</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">Interaction stories, 用 play 函式還原 hover / focus / loading / error 的路徑</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">Docs, 自動生成的 prop 表＋每個元件的使用指南</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">A11y addon, 對比、鍵盤操作、aria role 每個 story 都跑一次</span></li></ol><div class="skill-arch-foot">Claude 把 Storybook 當成「什麼可以重用」的事實來源。既有元件存在就得用, 不在 prototype 裡重造。</div>',
        's03.step4.title': '在 Claude Code 裡迭代',
        's03.step4.story': '我直接在 Claude Code 裡修prototype, 重做流程、收緊狀態、補齊 empty / error / loading 分支。互動設計現在就發生在這裡：在會跑的程式碼裡，不在 Figma 畫框裡。prototype就是正式的設計產物。同時間,我也會同步評估舊有元件能不能滿足需求, 若無法滿足,就叫出 <code>design-system</code> agent 協作製作新元件。',
        's03.step4.tool': 'Claude Code(手動引導)',
        's03.step4.output': '可被 review 的prototype v1',
        's03.step4.replaces': '互動設計師',
        's03.step4.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Agent</span><span class="skill-arch-slug">design-system</span><span class="skill-arch-sub">5 選單 agent</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">既有元件搜尋, 動手前先確認能不能重用</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">元件分析, 6 階段規格（拆解 → 狀態 → 互動）</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">prototype建構, 產出互動式 HTML</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">Figma 元件文件, 規格頁撰寫</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">交付評估, 前端接手前的準備度檢查</span></li></ol><div class="skill-arch-foot">需要時才讀 <code>DESIGN-COMPONENTS.md</code> ＋ <code>DESIGN-TOKENS.md</code>，並透過 Figma MCP 取得設計脈絡。一次跑一個 skill,不跳階段。</div>',
        's03.step5.title': '同步到 Figma → Figma Make → 回到prototype',
        's03.step5.story': '我把prototype拉進 Figma 重新整理版面、對齊設計系統的元件使用，再丟進 Figma Make 快速探索不同顯示狀態和替代版面。哪個贏，我就帶著 prompt 回到 Claude Code 更新prototype。這是整個流程裡唯一我還在直接動像素的一步, 也是最短的一步。',
        's03.step5.tool': 'Figma＋Figma Make ⇄ Claude Code',
        's03.step5.output': '對齊設計系統的prototype v2',
        's03.step5.replaces': 'UI 設計師',
        's03.step5.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Loop</span><span class="skill-arch-slug">figma ⇄ claude-code</span><span class="skill-arch-sub">像素探索的繞路</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">把 prototype 拉進 Figma, 走 Figma MCP connector sync,版面重新分組並對齊 design system tokens</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">直接把 HTML 檔貼進 Figma Make, 跳過重建,立刻探索狀態與替代版面</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">產生變體, 同一組 prompt 並行生出 3–5 種排版／狀態組合</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">挑出贏家, 不比美感,比跟 design system 的契合度</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">帶 prompt 寫回去, Claude Code 更新 prototype,跟 Figma 維持同步</span></li></ol><div class="skill-arch-foot">Connector sync 是預設迴圈。直接貼 HTML 是逃生門, 我想快探索、不想先 commit 時才用。</div>',
        's03.step6.title': '交付: Figma＋prototype → 工程師 → Claude',
        's03.step6.story': '工程師同時拿到 Figma <em>和</em>一份會動的prototype。他們把prototype餵進自己的 Claude Code session 產出正式程式碼, 把我的prototype當成可執行的規格，而不是一張要重新詮釋的視覺稿。交付的模糊地帶趨近於零，因為已經沒有需要翻譯的東西。',
        's03.step6.tool': '以prototype作為規格 → 工程師的 Claude',
        's03.step6.output': '可上線的 feature branch',
        's03.step6.replaces': '設計工程師 / 設計 ops',
        's03.step6.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">wren-ux-writing</span><span class="skill-arch-sub">文案審查 · en / zh-TW / ja</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">載入語氣檔, <code>voice-profile-en.md</code> ＋ <code>patterns.md</code>（語氣＋標準句型）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">套用 pattern, 按鈕、錯誤、空狀態、確認、驗證</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">對照 glossary, <code>i18n/glossary.md</code> 讓術語對應跨語系一致</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">在地化, <code>i18n/zh-tw.md</code> / <code>i18n/ja.md</code> 重寫,不是逐字翻譯</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">Review 一遍, 用 <code>review.md</code> 在交付前檢查語氣、清晰度、一致性</span></li></ol><div class="skill-arch-foot">同一份 skill 跑 prototype 文案,也跑工程 branch。輸出: 對齊 glossary 的 EN / zh-TW / ja 文字, 不用在 code review 再跑一輪文案修訂就能上線。</div>',
        's03.step7.title': '用 Remotion 產行銷影片',
        's03.step7.story': 'Claude Code 用 Remotion 把同一份prototype包起來，產出一支上線影片, 場景節奏、畫面上的註解、旁白草稿都齊全。行銷拿到一個可以直接剪的 MP4,而我不用打開 After Effects。設計產物和行銷產物共用同一個來源。',
        's03.step7.tool': 'Claude Code＋Remotion',
        's03.step7.output': '供行銷使用的上線影片(MP4)',
        's03.step7.replaces': '動效設計師 / 影片剪輯',
        's03.step7.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Framework</span><span class="skill-arch-slug">remotion</span><span class="skill-arch-sub">React → MP4</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">以 React/TS 組合, 場景 = component,時間 = props</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">參數化, 用 <code>inputProps</code> 換文案、資料、顏色</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">Studio 預覽, 熱重載的時間軸、用真實資料迭代</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">渲染成 MP4, CLI、Server,或 Remotion Lambda</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">用 Player 內嵌, 同一份 composition 放回 app（可選）</span></li></ol><div class="skill-arch-foot">來源 = prototype。同一套 React 元件同時驅動設計產物與行銷 MP4，不再開 After Effects。</div>',
        's03.step8.title': '品牌：吉祥物、Banner、預告影片',
        's03.step8.story': 'Gemini、Weave 和 Lovart(都只用免費額度)負責品牌層, 公司吉祥物插畫、活動 banner、短預告影片。',
        's03.step8.tool': 'Gemini＋Weave＋Lovart(免費)',
        's03.step8.output': '吉祥物、一組 banner、預告影片',
        's03.step8.replaces': '插畫師 / 品牌設計師',
        's03.step9.title': 'Dogfooding → 摘要 → 任務分派',
        's03.step9.story': '驅動prototype的那份user journey，也會產出一份 dogfooding 檢查表。內部測試者填完，一個 Claude Code skill 把發現整合起來、依嚴重度排序、提出修正方案，並依負責人草擬任務分派。星期一早上，我已經有一份不用我手寫的、可以排進 sprint 的 backlog。',
        's03.step9.tool': 'journey map＋Claude Code skill',
        's03.step9.output': 'Dogfooding 摘要＋排序後的任務',
        's03.step9.replaces': 'UX 研究員＋專案經理',
        's03.step9.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">dogfooding</span><span class="skill-arch-sub">6 步驟表單生成器</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">來源選擇, 既有journey / 檔案 / 從零開始</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">分析與轉換, 重新分成 4–5 個可測試區段</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">確認回圈, 用結構摘要反覆校正</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">輸出目的地, Notion 頁面 / 本地 Markdown</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">產出表單, 區段＋Bugs/評分/Exit 條件</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">語言, 預設英文，journey為中文時用 zh-TW</span></li></ol><div class="skill-arch-foot">一位測試者 20 分鐘為預算。讀 <code>docs/journeys/{slug}.json</code>, 和驅動prototype同一份來源。</div>',
        's03.step10.title': 'PM ops:Notion 同步與工時計算',
        's03.step10.story': 'Claude 依 backlog 更新 Notion 上的產品路線圖，重新計算每個人的工時，並在過載週爆炸前先把它撈出來。週度路線圖會議從 2 小時的試算表作業，變成花 10 分鐘 review Claude 的草稿。',
        's03.step10.tool': 'Claude＋Notion MCP',
        's03.step10.output': '更新後的路線圖＋工時警示',
        's03.step10.replaces': 'Producer / PM ops',
        's03.step10.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">roadmap-planning</span><span class="skill-arch-sub">5 階段工作流</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">蒐集輸入, 商業目標、客戶痛點、技術限制</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">定義 Initiatives, 含假設與指標的 Epic</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">排優先序, 以影響力 / 成本 / 策略契合度評分</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">排序, 依相依性放進 release 或季度</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">溝通, Now / Next / Later 敘事給利害關係人</span></li></ol><div class="skill-arch-foot">結果導向,不是功能清單。同步回 Notion,讓路線圖、backlog、工時計算活在同一個介面。</div>',
        's03.step11.title': '對外產品文件',
        's03.step11.story': 'journey map＋一個 Claude Code skill＋ Claude Chrome plugin，產出對客戶的文件, 幫助中心頁面、API reference 雛形、release note 草稿。驅動prototype的那份來源，現在也在驅動功能上線時使用者會讀到的那些字。',
        's03.step11.tool': 'journey＋Claude skill＋Claude Chrome plugin',
        's03.step11.output': '對外產品文件',
        's03.step11.replaces': '技術文件寫手 / 內容設計師',
        's03.step11.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-facing-docs</span><span class="skill-arch-sub">PRD → 4 段 Markdown</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">詢問 PRD 來源, 貼上或 Notion URL</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">確認語氣, 親切／技術／正式</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">解析 PRD 並套改寫規則, 把內部用語洗掉</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">產出四段, Overview · How It Works · Using · Tips</span></li></ol><div class="skill-arch-foot">讀 PRD,用使用者視角重寫,把工程／PM 的框架拿掉。適用於幫助中心與產品手冊, 不是 tooltip 或 release note。</div>',
      },
      'zh-cn': {
        'nav.intro': '.简介',
        'nav.s01': '03.成就',
        'nav.s02': '01.背景',
        'nav.s03': '02.流程',
        's01.title': '结语: 当一个人运作成一套系统',
        's01.body': '这是我在 Wren AI 的真实数字，也是上面那套流程确实在运作的证据。它们记录的不是我的体力极限，而是当提问从「怎么挤出更多设计时间」变成「怎么指挥一套能设计的系统」之后，所能达到的规模。',
        's01.m1.label': '我是设计师，也是一支军队',
        's01.m1.note': '以前，这需要 6 到 8 个不同职能的脑袋: PM、研究员、UI/UX、技术文案、甚至动效设计。现在，这些边界在我这里彻底塌缩。借由 AI 的杠杆，我一个人就能统筹整条生产线。',
        's01.m2.label': '拒绝排队的平行时空',
        's01.m2.note': '这里<span class="stat-hi">没有「等设计稿」的空窗期</span>。3 到 4 条战线同时推进: Agent Mode 的逻辑、Embedded Threads 的体验、设计系统的维护，全部处于活动状态，而非排队挂机。',
        's01.m3.label': '被结构化切碎的时间',
        's01.m3.note': '每周 16 小时，是我身为「人类」必须付出的沟通税。这 40% 的时间被会议锁死，无法删减。这也意味着，<span class="stat-hi">剩下的每一分钟都必须发挥数倍的价值</span>。',
        's01.m4.label': '24 小时的「指挥家」时刻',
        's01.m4.note': '扣掉会议，每周剩下的 24 小时是我真正的战场。<span class="stat-hi">每个项目平均分不到 6 小时</span>。听起来很疯狂？但当我不再是画图的工匠，而是指挥 Claude Code 实践构思的系统负责人，一周的工作量，确实在 6 小时内落地。',
        'page.title': '与 AI 一起设计',
        'page.subtitle': '为独立设计师打造的系统级工作流, 在 Wren AI 以 Claude Code 为核心重构。',
        'intro.h3.product': '起点',
        'intro.product.body': '2026 年初，一位 Anthropic 的设计师宣告：传统设计流程已死。那时我正是 Wren AI 唯一的产品设计师, 一个人扛着一整个 B2B AI 平台的产品设计，每周<span class="stat-hi">16 小时</span>被会议吞掉，同时还有<span class="stat-hi">3–4 个项目</span>并行推进。这份案例记录了我为了让这件事真的可行，亲手搭起来的 11 步 AI 工作流。',
        'intro.h3.role': '我的角色',
        'intro.role.body': 'Wren AI 资深产品设计师。也因为现实需要: <span class="stat-hi">PM、研究员、UI/UX、技术文案、甚至动效设计</span>。这套工作流是一个人如何扛下<span class="stat-hi">约 6–8 个 FTE</span>的传统职能范围，又不让作品品质掉下来的方法。',
        'intro.h3.time': '时间',
        'intro.time.body': '2026 → 至今',
        's02.title': '为什么会长出这套工作流',
        's02.h3.moment': '那一刻',
        's02.moment.body': '2026 年初。一位 Anthropic 的设计师发表了一篇文章，主张传统设计流程, 探索 → 研究 → 线框 → 视觉稿 → 规格 → 交付, 已经过时。模型产出可运行界面的速度，比设计师画草图还快。产物(那个 Figma 档)不再是价值所在。',
        's02.moment.body2': '我是在一间我是唯一产品设计师的 B2B AI 创业公司里读到这篇文章的。我没有不同意的余地。现实早就压过来了:',
        's02.li1': '<span class="stat-hi">一位设计师</span>扛起<span class="stat-hi">整条设计生产线</span>：产品设计、视觉、prototype、研究与品牌。',
        's02.li2': '每周<span class="stat-hi">16 小时</span>结构性地被会议占走，无法砍掉。',
        's02.li3': '<span class="stat-hi">每周都有新 release</span>,一个功能从 brief 到上线，实际设计时间平均不超过一周半。',
        's02.li4': '工程师早就每天使用 Claude Code, 如果我的交付跟他们的流程接不起来，我就是瓶颈。',
        's02.li5': '创业公司预算排除了招人。',
        's02.h3.reframe': '视角转换',
        's02.reframe.body': '旧问题, <span class="stat-hi">「怎么挤出更多设计时间」</span>, 已是死路；那一周早就满了。新问题变成：<span class="stat-hi">「怎么指挥一套能设计的系统」</span>',
        's02.reframe.body2': 'Claude Code 成了那个系统。不是偶尔拿起来用的工具，而是中央的协作层, 规格、prototype、研究摘要、营销视频、Notion 更新、产品文档，全部都流经它。以下就是我最后落地的这套流程。',
        's03.title': '11 步 AI 流程',
        's03.h3': 'Steps 00 → 11',
        's03.body': '每一步都是一个 Claude Code skill、一个插件，或是工具之间写好的脚本交接。下方这条纵向主干按时间顺序读, 从顶端的行为数据开始，依次经过规格、journey、prototype、Figma、交付、视频、品牌、dogfooding、PM ops,到外部文档。',
        's03.step0.title': '行为分析与回测',
        's03.step0.story': '一个 Claude Code skill 吃进数据事件、session 录像和客服 ticket,产出一份行为报告, 漏斗流失、摩擦模式、异常点, 再拿它跟上一轮设计改动做回测，看看什么东西真的有动。',
        's03.step0.tool': 'Claude Code skill',
        's03.step0.output': '周度行为报告＋设计差异检视',
        's03.step0.replaces': '数据分析师＋UX 研究员',
        's03.step0.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-research</span><span class="skill-arch-sub">行为模式 · 周节奏</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">抓原始信号, 分析事件、session 录影、客服 ticket</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">整合, 亲和图 → 影响力 / 成本 → Jobs-to-be-done</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">捞出模式, 漏斗流失、摩擦、异常点</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">回测, 跟上一轮设计改动做 diff,量真实有动的部分</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">写行为报告, 排序后的发现＋设计差异检视</span></li></ol><div class="skill-arch-foot">每周一跑一次。报告会喂进 step 01, 每一份新规格都从"数据真的有动的那块"开始。</div>',
        's03.step1.title': '规格撰写与功能发想',
        's03.step1.story': 'CEO 丢来的一句话 brief,会变成一份完整规格, 问题陈述、范围、边界案例、验收条件、风险清单, 在一个了解产品切面与现有设计系统的 Claude Code skill 里完成。我修改论述的结构，而不是逐字润稿。',
        's03.step1.tool': 'Claude Code skill',
        's03.step1.output': 'PRD 等级规格，含边界案例与验收条件',
        's03.step1.replaces': '产品经理',
        's03.step1.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">prd-development</span><span class="skill-arch-sub">8 阶段工作流</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">执行摘要</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">问题陈述, 有证据的客户痛点</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">目标用户与 Persona</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">战略语境, OKR、市场、为何是现在</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">解法概览, 高层轮廓与流程</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">成功指标, 主指标 / 次指标 / 防守指标</span></li><li><span class="skill-arch-no">07</span><span class="skill-arch-ph">user journey与需求</span></li><li><span class="skill-arch-no">08</span><span class="skill-arch-ph">范围外与依赖</span></li></ol><div class="skill-arch-foot">在 2–4 天内串起 8+ 个组件与交互子 skill。</div>',
        's03.step2.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">journey-map</span><span class="skill-arch-sub">6 步构建器</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">输入来源, 对话 / 文件 / Figma</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">搜集 user journey 数据, 阶段、行为、系统反应、标签</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">确认循环, 树状摘要反复校对</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">输出 JSON, <code>docs/journeys/{slug}.json</code></span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">输出 HTML, 数据驱动的样式渲染</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">完成 → 交棒给 <code>/dogfooding</code></span></li></ol><div class="skill-arch-foot">产出是后续每一步都会参照的单一事实来源。</div>',
        's03.step2.title': '以 HTML 呈现的user journey',
        's03.step2.story': '规格喂进一个 skill,产出一份互动式 HTML user journey, 阶段、行为、情绪、痛点、机会时刻。它可以用链接分享、经得起 review 修改，并成为后面每一步都会参照的单一事实来源。',
        's03.step2.tool': 'Claude Code skill → HTML',
        's03.step2.output': '互动式journey map(独立链接)',
        's03.step2.replaces': '服务设计师 / UX 研究员',
        's03.step3.title': '用 User Journey + Storybook 做 Prototype',
        's03.step3.story': '我把journey HTML 和团队的 Storybook 组件文档一起丢进一个 skill,它会生出一份可运行的 HTML/CSS/JS prototype, 路由、状态、交互、假数据都齐全。',
        's03.step3.tool': 'Claude Code skill＋Storybook',
        's03.step3.output': '可执行的 HTML/CSS/JS prototype',
        's03.step3.replaces': 'prototype制作者 / 前端设计师',
        's03.step3.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Reference</span><span class="skill-arch-slug">storybook</span><span class="skill-arch-sub">里面有什么</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">Foundations, design tokens（色、字体、间距、圆角、动效）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">Components, 所有 UI primitive,含每个 variant × state（default、hover、active、disabled、loading、error）</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">Patterns, 组合区块（toolbar、空状态、onboarding、side panel）</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">Interaction stories, 用 play 函数还原 hover / focus / loading / error 的路径</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">Docs, 自动生成的 prop 表＋每个组件的使用指南</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">A11y addon, 对比度、键盘操作、aria role 每个 story 都跑一次</span></li></ol><div class="skill-arch-foot">Claude 把 Storybook 当成"什么可以复用"的事实来源。既有组件存在就得用, 不在 prototype 里重造。</div>',
        's03.step4.title': '在 Claude Code 里迭代',
        's03.step4.story': '我直接在 Claude Code 里改prototype, 重做流程、收紧状态、补齐 empty / error / loading 分支。交互设计现在就发生在这里：在会跑的代码里，不在 Figma 画框里。prototype就是正式的设计产物。同时,我也会同步评估旧有组件能不能满足需求, 若无法满足,就叫出 <code>design-system</code> agent 协作制作新组件。',
        's03.step4.tool': 'Claude Code(手动引导)',
        's03.step4.output': '可被 review 的prototype v1',
        's03.step4.replaces': '交互设计师',
        's03.step4.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Agent</span><span class="skill-arch-slug">design-system</span><span class="skill-arch-sub">5 菜单 agent</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">既有组件搜索, 动手前先确认能不能复用</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">组件分析, 6 阶段规格（拆解 → 状态 → 交互）</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">prototype构建, 产出交互式 HTML</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">Figma 组件文档, 规格页撰写</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">交付评估, 前端接手前的准备度检查</span></li></ol><div class="skill-arch-foot">需要时才读 <code>DESIGN-COMPONENTS.md</code> ＋ <code>DESIGN-TOKENS.md</code>，并通过 Figma MCP 获取设计上下文。一次跑一个 skill,不跳阶段。</div>',
        's03.step5.title': '同步到 Figma → Figma Make → 回到prototype',
        's03.step5.story': '我把prototype拉进 Figma 重新整理版面、对齐设计系统的组件使用，再丢进 Figma Make 快速探索不同显示状态和替代版面。哪个赢，我就带着 prompt 回到 Claude Code 更新prototype。这是整个流程里唯一我还在直接动像素的一步, 也是最短的一步。',
        's03.step5.tool': 'Figma＋Figma Make ⇄ Claude Code',
        's03.step5.output': '对齐设计系统的prototype v2',
        's03.step5.replaces': 'UI 设计师',
        's03.step5.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Loop</span><span class="skill-arch-slug">figma ⇄ claude-code</span><span class="skill-arch-sub">像素探索的绕路</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">把 prototype 拉进 Figma, 走 Figma MCP connector sync,版面重新分组并对齐 design system tokens</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">直接把 HTML 文件贴进 Figma Make, 跳过重建,立刻探索状态与替代版面</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">产生变体, 同一组 prompt 并行生出 3–5 种排版／状态组合</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">挑出赢家, 不比美感,比跟 design system 的契合度</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">带 prompt 写回去, Claude Code 更新 prototype,跟 Figma 维持同步</span></li></ol><div class="skill-arch-foot">Connector sync 是默认循环。直接贴 HTML 是逃生门, 我想快速探索、不想先 commit 时才用。</div>',
        's03.step6.title': '交付: Figma＋prototype → 工程师 → Claude',
        's03.step6.story': '工程师同时拿到 Figma <em>和</em>一份会动的prototype。他们把prototype喂进自己的 Claude Code session 产出正式代码, 把我的prototype当成可执行的规格，而不是一张要重新诠释的视觉稿。交付的模糊地带趋近于零，因为已经没有需要翻译的东西。',
        's03.step6.tool': '以prototype作为规格 → 工程师的 Claude',
        's03.step6.output': '可上线的 feature branch',
        's03.step6.replaces': '设计工程师 / 设计 ops',
        's03.step6.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">wren-ux-writing</span><span class="skill-arch-sub">文案审查 · en / zh-TW / ja</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">载入语气档, <code>voice-profile-en.md</code> ＋ <code>patterns.md</code>（语气＋标准句型）</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">套用 pattern, 按钮、错误、空状态、确认、验证</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">对照 glossary, <code>i18n/glossary.md</code> 让术语对应跨语系一致</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">本地化, <code>i18n/zh-tw.md</code> / <code>i18n/ja.md</code> 重写,不是逐字翻译</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">Review 一遍, 用 <code>review.md</code> 在交付前检查语气、清晰度、一致性</span></li></ol><div class="skill-arch-foot">同一份 skill 跑 prototype 文案,也跑工程 branch。输出: 对齐 glossary 的 EN / zh-TW / ja 文字, 不用在 code review 再跑一轮文案修订就能上线。</div>',
        's03.step7.title': '用 Remotion 产营销视频',
        's03.step7.story': 'Claude Code 用 Remotion 把同一份prototype包起来，产出一支上线视频, 场景节奏、画面上的注解、旁白草稿都齐全。营销拿到一个可以直接剪的 MP4,而我不用打开 After Effects。设计产物和营销产物共用同一个来源。',
        's03.step7.tool': 'Claude Code＋Remotion',
        's03.step7.output': '供营销使用的上线视频(MP4)',
        's03.step7.replaces': '动效设计师 / 视频剪辑',
        's03.step7.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Framework</span><span class="skill-arch-slug">remotion</span><span class="skill-arch-sub">React → MP4</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">以 React/TS 组合, 场景 = component,时间 = props</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">参数化, 用 <code>inputProps</code> 换文案、数据、颜色</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">Studio 预览, 热重载时间线,用真实数据迭代</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">渲染为 MP4, CLI、Server,或 Remotion Lambda</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">用 Player 嵌入, 同一份 composition 放回 app（可选）</span></li></ol><div class="skill-arch-foot">来源 = prototype。同一套 React 组件同时驱动设计产物与营销 MP4,不再打开 After Effects。</div>',
        's03.step8.title': '品牌：吉祥物、Banner、预告视频',
        's03.step8.story': 'Gemini、Weave 和 Lovart(都只用免费额度)负责品牌层, 公司吉祥物插画、活动 banner、短预告视频。',
        's03.step8.tool': 'Gemini＋Weave＋Lovart(免费)',
        's03.step8.output': '吉祥物、一组 banner、预告视频',
        's03.step8.replaces': '插画师 / 品牌设计师',
        's03.step9.title': 'Dogfooding → 摘要 → 任务分派',
        's03.step9.story': '驱动prototype的那份user journey，也会产出一份 dogfooding 检查表。内部测试者填完，一个 Claude Code skill 把发现整合起来、依严重度排序、提出修正方案，并依负责人草拟任务分派。星期一早上，我已经有一份不用我手写的、可以排进 sprint 的 backlog。',
        's03.step9.tool': 'journey map＋Claude Code skill',
        's03.step9.output': 'Dogfooding 摘要＋排序后的任务',
        's03.step9.replaces': 'UX 研究员＋项目经理',
        's03.step9.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">dogfooding</span><span class="skill-arch-sub">6 步表单生成器</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">来源选择, 既有journey / 文件 / 从零开始</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">分析与转换, 重新分成 4–5 个可测试区段</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">确认循环, 用结构摘要反复校对</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">输出目的地, Notion 页面 / 本地 Markdown</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">产出表单, 区段＋Bugs/评分/Exit 条件</span></li><li><span class="skill-arch-no">06</span><span class="skill-arch-ph">语言, 默认英文，journey为中文时用 zh-TW</span></li></ol><div class="skill-arch-foot">一位测试者 20 分钟为预算。读 <code>docs/journeys/{slug}.json</code>, 和驱动prototype同一份来源。</div>',
        's03.step10.title': 'PM ops:Notion 同步与工时计算',
        's03.step10.story': 'Claude 依 backlog 更新 Notion 上的产品路线图，重新计算每个人的工时，并在过载周爆炸前先把它捞出来。周度路线图会议从 2 小时的表格作业，变成花 10 分钟 review Claude 的草稿。',
        's03.step10.tool': 'Claude＋Notion MCP',
        's03.step10.output': '更新后的路线图＋工时警示',
        's03.step10.replaces': 'Producer / PM ops',
        's03.step10.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">roadmap-planning</span><span class="skill-arch-sub">5 阶段工作流</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">搜集输入, 商业目标、客户痛点、技术约束</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">定义 Initiatives, 含假设与指标的 Epic</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">排优先序, 以影响力 / 成本 / 战略契合度评分</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">排序, 按相依性放入 release 或季度</span></li><li><span class="skill-arch-no">05</span><span class="skill-arch-ph">沟通, Now / Next / Later 叙事给利益相关人</span></li></ol><div class="skill-arch-foot">结果导向,不是功能清单。同步回 Notion,让路线图、backlog、工时计算活在同一个界面。</div>',
        's03.step11.title': '对外产品文档',
        's03.step11.story': 'journey map＋一个 Claude Code skill＋ Claude Chrome plugin，产出对客户的文档, 帮助中心页面、API reference 雏形、release note 草稿。驱动prototype的那份来源，现在也在驱动功能上线时用户会读到的那些字。',
        's03.step11.tool': 'journey＋Claude skill＋Claude Chrome plugin',
        's03.step11.output': '对外产品文档',
        's03.step11.replaces': '技术文档撰写者 / 内容设计师',
        's03.step11.arch': '<div class="skill-arch-head"><span class="skill-arch-tag">Skill</span><span class="skill-arch-slug">user-facing-docs</span><span class="skill-arch-sub">PRD → 4 段 Markdown</span></div><ol class="skill-arch-steps"><li><span class="skill-arch-no">01</span><span class="skill-arch-ph">询问 PRD 来源, 粘贴或 Notion URL</span></li><li><span class="skill-arch-no">02</span><span class="skill-arch-ph">确认语气, 亲切／技术／正式</span></li><li><span class="skill-arch-no">03</span><span class="skill-arch-ph">解析 PRD 并套用改写规则, 把内部用语洗掉</span></li><li><span class="skill-arch-no">04</span><span class="skill-arch-ph">产出四段, Overview · How It Works · Using · Tips</span></li></ol><div class="skill-arch-foot">读 PRD,用用户视角重写,把工程／PM 的框架拿掉。适用于帮助中心与产品手册, 不是 tooltip 或 release note。</div>',
      },
    };

    function applyLang(lang) {
      const dict = I18N[lang] || {};
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] != null) el.innerHTML = dict[key];
      });
      const htmlLang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
      document.documentElement.lang = htmlLang;
      applyPangu();
    }

    // Pangu whitespace: insert a space between CJK characters and half-width
    // Latin letters / digits so the two scripts don't touch each other.
    const PANGU_CJK = '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff';
    const PANGU_ANS = 'A-Za-z0-9';
    const PANGU_RE1 = new RegExp('([' + PANGU_CJK + '])([' + PANGU_ANS + '])', 'g');
    const PANGU_RE2 = new RegExp('([' + PANGU_ANS + '])([' + PANGU_CJK + '])', 'g');
    function panguText(s) {
      return s.replace(PANGU_RE1, '$1 $2').replace(PANGU_RE2, '$1 $2');
    }
    function applyPangu(root) {
      const node = root || document.body;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const p = n.parentNode;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.nodeName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') {
            return NodeFilter.FILTER_REJECT;
          }
          return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      let cur;
      while ((cur = walker.nextNode())) nodes.push(cur);
      nodes.forEach(n => {
        const next = panguText(n.nodeValue);
        if (next !== n.nodeValue) n.nodeValue = next;
      });
    }

    const langSelect = document.getElementById('nav-lang-select');
    if (langSelect) {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved && (I18N[saved] || saved === 'en')) {
        langSelect.value = saved;
        if (saved !== 'en') applyLang(saved);
      }
      langSelect.addEventListener('change', () => {
        const lang = langSelect.value;
        localStorage.setItem('portfolio-lang', lang);
        if (lang === 'en') location.reload();
        else applyLang(lang);
      });
    }
    // Run pangu once on initial load too (covers EN default and any saved-lang path)
    applyPangu();

    // Reveal on scroll
    (() => {
      const targets = document.querySelectorAll('.reveal-on-scroll');
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
