(function() {
    const anchors = document.querySelectorAll('.nav-anchor');
    const sectionIds = ['intro','s01','s02'];
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
  })();

  // ── i18n ──
  (function() {
    const a41I18n = {
      'zh-tw': {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.介紹',
        'nav.s01': '01.起點',
        'nav.s02': '02.解決方案',
        'page.title': 'All For One（電商 App）',
        'page.subtitle': '將碎片化的時尚電商體驗，從訂單管理到跨境結帳，整合為一致且流暢的購物旅程。',
        'intro.label.product': '產品概覽：',
        'intro.product.body': 'All For One 是一款結合台韓品牌服飾的時尚電商 App。使用者可以在單一行動介面中跨店鋪瀏覽、依賣家拆單結帳，並在統一的流程中追蹤訂單。設計挑戰在於如何將破碎的商品型錄資料與跨國物流邏輯，轉化為讓使用者真正信賴的購物旅程。',
        'intro.label.role': '我的角色：',
        'intro.role.body': '我主導了<span class="stat-hi">三個核心流程</span>的重新設計：商品詳情頁、購物車與個人檔案頁。主要焦點在於汰換脆弱的 WebView 模式，打造更流暢的<span class="stat-hi">原生行動體驗</span>，並建立更清晰的結帳路徑。',
        'intro.label.time': '專案期間：',
        'intro.time.body': 'None Capital · 2021–2022',
        'intro.label.platform': '平台：',
        'intro.platform.body': 'Mobile · iOS',
        's01.title': '我們的起點',
        's01.lede': '在重新設計介面之前，我<span class="stat-hi">對現有產品進行了全面盤點</span>，以了解體驗在哪裡產生斷層，以及團隊需要什麼才能更有條理地擴展產品。',
        's01.item1.label': '理解過去的設計脈絡：',
        's01.item1.body': '在我接手此專案之前，客戶曾聘請其他設計師規劃介面。因此，在正式啟動前，我仔細盤點了過去的設計文件，以掌握產品整體的設計方向與歷史決策。',
        's01.item2.label': '轉移至 Figma 並建立設計系統：',
        's01.item2.body': '前任設計師主要使用 Adobe Illustrator 與 Avocode。為了更契合產品團隊的工作流程，我將現有檔案轉移至 Figma 與 Zeplin，並<span class="stat-hi">從零建構了一套設計系統</span>，讓後續的跨部門協作更加順暢。',
        's01.item3.label': '競品分析與資訊架構稽核：',
        's01.item3.body': '我分析了核心功能（例如：商品頁、結帳流程），研究了業界指標性競品的做法，並重新梳理了資訊架構與元件的階層關係。',
        's01.item4.label': '物流與拆單邏輯研究：',
        's01.item4.body': '由於不同電商平台的拆單邏輯差異極大，我深入研究了多個對標產品的結帳流程，以確保設計能完美適配跨國物流與履約的限制條件。',
        's02.title': '我們的解決方案',
        's02.a.title': 'a. 商品詳情頁重設計',
        's02.a.desc': '滑動原型以比較改版前後的介面差異。',
        's02.a.prev.label': '舊版設計',
        's02.a.prev.body': '在舊版中，我們無法隱藏<span class="stat-hi">基於 WebView 載入的商品頁</span>中原本自帶的購物車與購買按鈕。同時，店鋪與商品資訊只能在 WebView 內瀏覽，這常常導致使用者在操作時感到挫折與混淆。',
        's02.a.new.label': '重設計版本',
        's02.a.new.body': '在改版中，我們優化了網頁爬蟲資料的整合方式，讓設計師能夠<span class="stat-hi">在 App 內以原生元件呈現店鋪與商品資訊</span>。',
        's02.b.title': 'b. 改版核心功能亮點',
        's02.b.info.label': '商品資訊區塊',
        's02.b.info.body1': '由於商品描述資料只能以整塊圖文形式抓取，我將這個區塊重新設計為<span class="stat-hi">預設折疊</span>。使用者只有在需要時才展開，大幅減少了瀏覽與結帳過程中的視覺干擾。',
        's02.b.info.body2': '因為內容長度無法預測，我在展開後的底部加入了「回到頂部」的按鈕。我也測試過其他選項（例如「收起」），但易用性測試確認「回到頂部」是最直覺且高效的做法。',
        's02.b.picker.label': '顏色與尺寸選擇器',
        's02.b.picker.body1': '最大的挑戰來自於爬蟲資料的不一致：顏色可能被標記為「草綠色」或「綠色菱格紋」，而尺寸標籤也五花八門。這種不可預測性讓固定佈局變得完全不可行。',
        's02.b.picker.body2': '為了解決這個問題，我採用了 <span class="stat-hi">Bottom Sheet 設計</span>，在行動裝置上平衡了資訊承載量與易用性，提供了一個更穩定且彈性的使用者體驗。',
        's02.c.title': 'c. 購物車設計',
        's02.c.cart.label': '雙購物車設計（台灣與韓國）',
        's02.c.cart.body1': '在購物車設計中，國際品項與其他商品必須分開結帳，因此我們決定<span class="stat-hi">將購物車拆分為兩個區塊</span>。',
        's02.c.cart.body2': '此設計主要是為了避免使用者在點擊「結帳」後才被告知無法將所有品項合併下單。經過使用者測試後，我導入了分頁（Tabs）設計，讓使用者能輕鬆切換購物車，同時在每個分頁上直接顯示當前品項數量。',
        's02.c.checkout.label': '結帳頁面',
        's02.c.checkout.body1': '針對商品卡片（Item Cards），我們設定了三個目標：',
        's02.c.checkout.li1': '清楚呈現價格，讓使用者一目了然。',
        's02.c.checkout.li2': '凸顯配送地址，方便再次確認。',
        's02.c.checkout.li3': '保留彈性，以適配較大比例的商品圖片。',
        's02.d.title': 'd. 個人檔案頁重設計',
        's02.d.prev.label': '舊版設計',
        's02.d.prev.body1': '在最初的產品規劃中，個人檔案頁預留了未來「使用者貼文」功能的版面。然而，由於策略調整，此功能並未實作，導致預留的區域被白白浪費。',
        's02.d.prev.body2': '在電商 App 中，每一個區塊都代表<span class="stat-hi">潛在的商品觸點</span>，未使用的空間就等於錯失了與使用者互動的機會。',
        's02.d.new.label': '重設計版本',
        's02.d.new.body1': '在重新設計的個人檔案頁中，我將「我的訂單」與「客服中心」放在最上方，讓使用者能快速存取。',
        's02.d.new.body2': '在下方，我加入了「最近瀏覽」、「購物車」與「為你推薦」的橫向輪播元件，<span class="stat-hi">大幅增加了商品重新進入結帳流程的機率</span>。'
      },
      'zh-cn': {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.介绍',
        'nav.s01': '01.起点',
        'nav.s02': '02.解决方案',
        'page.title': 'All For One（电商 App）',
        'page.subtitle': '将碎片化的时尚电商体验，从订单管理到跨境结账，整合为一致且流畅的购物旅程。',
        'intro.label.product': '产品概览：',
        'intro.product.body': 'All For One 是一款聚合台韩品牌服饰的时尚电商 App。用户可以在单一移动端界面中跨店铺浏览、按卖家拆单结账，并在统一的流程中追踪订单。设计挑战在于如何将破碎的商品目录数据与跨国物流逻辑，转化为让用户真正信赖的购物旅程。',
        'intro.label.role': '我的角色：',
        'intro.role.body': '我主导了<span class="stat-hi">三个核心流程</span>的重新设计：商品详情页、购物车与个人主页。主要焦点在于替换脆弱的 WebView 模式，打造更流畅的<span class="stat-hi">原生移动体验</span>，并建立更清晰的结账路径。',
        'intro.label.time': '项目周期：',
        'intro.time.body': 'None Capital · 2021–2022',
        'intro.label.platform': '平台：',
        'intro.platform.body': 'Mobile · iOS',
        's01.title': '我们的起点',
        's01.lede': '在重新设计界面之前，我<span class="stat-hi">对现有产品进行了全面盘点</span>，以了解体验在哪里产生断层，以及团队需要什么才能更有条理地扩展产品。',
        's01.item1.label': '理解过去的设计脉络：',
        's01.item1.body': '在我接手此项目之前，客户曾聘请其他设计师规划界面。因此，在正式启动前，我仔细盘点了过去的设计文档，以掌握产品整体的设计方向与历史决策。',
        's01.item2.label': '迁移至 Figma 并建立设计系统：',
        's01.item2.body': '前任设计师主要使用 Adobe Illustrator 与 Avocode。为了更契合产品团队的工作流，我将现有文件迁移至 Figma 与 Zeplin，并<span class="stat-hi">从零构建了一套设计系统</span>，让后续的跨部门协同更加顺畅。',
        's01.item3.label': '竞品分析与信息架构审查：',
        's01.item3.body': '我分析了核心功能（例如：商品页、结账流程），研究了行业标杆竞品的做法，并重新梳理了信息架构与组件的层级关系。',
        's01.item4.label': '物流与拆单逻辑研究：',
        's01.item4.body': '由于不同电商平台的拆单逻辑差异极大，我深入研究了多个对标产品的结账流程，以确保设计能完美适配跨国物流与履约的限制条件。',
        's02.title': '我们的解决方案',
        's02.a.title': 'a. 商品详情页重设计',
        's02.a.desc': '滑动原型以比较改版前后的界面差异。',
        's02.a.prev.label': '旧版设计',
        's02.a.prev.body': '在旧版中，我们无法隐藏<span class="stat-hi">基于 WebView 加载的商品页</span>中原本自带的购物车与购买按钮。同时，店铺与商品信息只能在 WebView 内浏览，这常常导致用户在操作时感到挫折与混淆。',
        's02.a.new.label': '重设计版本',
        's02.a.new.body': '在改版中，我们优化了网页爬虫数据的整合方式，让设计师能够<span class="stat-hi">在 App 内以原生组件呈现店铺与商品信息</span>。',
        's02.b.title': 'b. 改版核心功能亮点',
        's02.b.info.label': '商品信息区块',
        's02.b.info.body1': '由于商品描述数据只能以整块图文形式抓取，我将这个区块重新设计为<span class="stat-hi">默认折叠</span>。用户只有在需要时才展开，大幅减少了浏览与结账过程中的视觉干扰。',
        's02.b.info.body2': '因为内容长度无法预测，我在展开后的底部加入了"回到顶部"的按钮。我也测试过其他选项（例如"收起"），但可用性测试确认"回到顶部"是最直观且高效的做法。',
        's02.b.picker.label': '颜色与尺寸选择器',
        's02.b.picker.body1': '最大的挑战来自于爬虫数据的不一致：颜色可能被标记为"草绿色"或"绿色菱格纹"，而尺寸标签也五花八门。这种不可预测性让固定布局变得完全不可行。',
        's02.b.picker.body2': '为了解决这个问题，我采用了 <span class="stat-hi">Bottom Sheet 设计</span>，在移动端上平衡了信息承载量与易用性，提供了一个更稳定且弹性的用户体验。',
        's02.c.title': 'c. 购物车设计',
        's02.c.cart.label': '双购物车设计（台湾与韩国）',
        's02.c.cart.body1': '在购物车设计中，国际商品与其他商品必须分开结账，因此我们决定<span class="stat-hi">将购物车拆分为两个区块</span>。',
        's02.c.cart.body2': '此设计主要是为了避免用户在点击"结账"后才被告知无法将所有商品合并下单。经过用户测试后，我引入了标签页（Tabs）设计，让用户能轻松切换购物车，同时在每个标签上直接显示当前商品数量。',
        's02.c.checkout.label': '结账页面',
        's02.c.checkout.body1': '针对商品卡片（Item Cards），我们设定了三个目标：',
        's02.c.checkout.li1': '清楚呈现价格，让用户一目了然。',
        's02.c.checkout.li2': '凸显配送地址，方便再次确认。',
        's02.c.checkout.li3': '保留弹性，以适配较大比例的商品图片。',
        's02.d.title': 'd. 个人主页重设计',
        's02.d.prev.label': '旧版设计',
        's02.d.prev.body1': '在最初的产品规划中，个人主页预留了未来"用户发帖"功能的版面。然而，由于策略调整，此功能并未实施，导致预留的区域被白白浪费。',
        's02.d.prev.body2': '在电商 App 中，每一个区块都代表<span class="stat-hi">潜在的商品触点</span>，未使用的空间就等于错失了与用户互动的机会。',
        's02.d.new.label': '重设计版本',
        's02.d.new.body1': '在重新设计的个人主页中，我将"我的订单"与"客服中心"放在最上方，让用户能快速访问。',
        's02.d.new.body2': '在下方，我加入了"最近浏览"、"购物车"与"为你推荐"的横向轮播组件，<span class="stat-hi">大幅增加了商品重新进入结账流程的概率</span>。'
      },
      'ja': {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.イントロ',
        'nav.s01': '01.出発点',
        'nav.s02': '02.ソリューション',
        'page.title': 'All For One（Eコマース App）',
        'page.subtitle': '断片化したファッションECを、注文管理から越境チェックアウトまで、一貫したシームレスな購買体験へと統合する。',
        'intro.label.product': 'プロダクト概要：',
        'intro.product.body': 'All For One は、台湾と韓国のブランドをひとつのモバイルアプリにまとめたファッションECです。ユーザーはストアをまたいで商品を閲覧し、販売者ごとに分けて決済し、統一されたフローで注文を追跡できます。設計の課題は、断片化した商品データと越境物流ロジックを、ユーザーが本当に信頼できる購買体験へと変えることでした。',
        'intro.label.role': '担当領域：',
        'intro.role.body': '商品ページ、ショッピングカート、プロフィールページという<span class="stat-hi">3つのコアフロー</span>の再設計を主導しました。不安定な WebView パターンを置き換え、より滑らかな<span class="stat-hi">ネイティブモバイル体験</span>を実現し、明確なチェックアウト経路を整えることに注力しました。',
        'intro.label.time': 'プロジェクト期間：',
        'intro.time.body': 'None Capital · 2021–2022',
        'intro.label.platform': 'プラットフォーム：',
        'intro.platform.body': 'Mobile · iOS',
        's01.title': '出発点',
        's01.lede': 'UI を再設計する前に、<span class="stat-hi">既存プロダクトの監査</span>を行い、どこで体験が崩れているか、そしてチームがよりまとまってスケールさせるには何が必要かを見極めました。',
        's01.item1.label': '過去のデザイン文脈の理解：',
        's01.item1.body': '私がこのプロジェクトを引き継ぐ前、クライアントは別のデザイナーに UI 設計を依頼していました。そこで本格着手の前に、過去のデザインドキュメントを丁寧に読み解き、プロダクト全体の方向性と過去の意思決定を把握しました。',
        's01.item2.label': 'Figma への移行とデザインシステム構築：',
        's01.item2.body': '前任のデザイナーは主に Adobe Illustrator と Avocode を使用していました。プロダクトチームのワークフローにより良く沿うため、既存ファイルを Figma と Zeplin に移行し、<span class="stat-hi">ゼロからデザインシステムを構築</span>することで、以降のコラボレーションをよりスムーズにしました。',
        's01.item3.label': '競合分析と情報アーキテクチャの監査：',
        's01.item3.body': 'コア機能（商品ページ、チェックアウトフローなど）を分析し、業界のベンチマークを調査したうえで、情報アーキテクチャとコンポーネント構造を整理し直しました。',
        's01.item4.label': '物流リサーチ：',
        's01.item4.body': 'ECプラットフォームごとに分割注文ロジックが大きく異なるため、複数のベンチマークフローをレビューし、他プロダクトが物流とフルフィルメントの制約にどう対処しているかを理解しました。',
        's02.title': 'ソリューション',
        's02.a.title': 'a. 商品詳細ページの再設計',
        's02.a.desc': 'プロトタイプをスワイプして、ビフォーとアフターを比較できます。',
        's02.a.prev.label': '旧バージョン',
        's02.a.prev.body': '旧バージョンでは、<span class="stat-hi">WebView ベースの商品ページ</span>が元から持っているカートと購入ボタンを隠すことができませんでした。さらに、店舗情報と商品情報は WebView 内でしか閲覧できず、ユーザーに混乱とフラストレーションを与えていました。',
        's02.a.new.label': '新バージョン',
        's02.a.new.body': '再設計では、スクレイピングデータの統合を改善したことで、<span class="stat-hi">店舗情報と商品情報をアプリ内にネイティブで表示</span>できるようになりました。',
        's02.b.title': 'b. 新バージョンのコア機能',
        's02.b.info.label': '商品情報セクション',
        's02.b.info.body1': '商品説明はひとかたまりでしか取得できないため、このセクションを<span class="stat-hi">デフォルトで折りたたむ</span>設計に変更しました。ユーザーは必要なときだけ展開できるため、閲覧や決済時の邪魔が大きく減りました。',
        's02.b.info.body2': '内容の長さや構造が予測できないため、展開後の末尾に「トップへ戻る」ボタンを配置しました。他の選択肢（例：「折りたたむ」）も検証しましたが、ユーザビリティテストの結果、「トップへ戻る」が最も直感的で効率的でした。',
        's02.b.picker.label': 'カラー＆サイズピッカー',
        's02.b.picker.body1': '最大の課題はスクレイピングデータの不均一さでした。色名は「草グリーン」や「グリーンのアーガイル」など揺れがあり、サイズ表記もバラバラで、固定レイアウトは現実的ではありませんでした。',
        's02.b.picker.body2': 'この問題を解決するため、<span class="stat-hi">Bottom Sheet</span> を採用しました。モバイル上で情報量と操作性のバランスが良く、より安定した柔軟な体験を提供できます。',
        's02.c.title': 'c. ショッピングカート設計',
        's02.c.cart.label': '2つのカート（台湾と韓国）',
        's02.c.cart.body1': 'ショッピングカート設計では、海外商品と国内商品を別々に決済する必要があったため、<span class="stat-hi">カートを2つに分割</span>することにしました。',
        's02.c.cart.body2': 'この設計は、ユーザーが「チェックアウト」を押した後に「すべてをまとめて注文できない」と通知される事態を避けるためのものです。ユーザーテストを経て、タブ（Tabs）を導入し、現在のアイテム数を各タブに表示しながら簡単にカートを切り替えられるようにしました。',
        's02.c.checkout.label': 'チェックアウトページ',
        's02.c.checkout.body1': '商品カードには3つのゴールを設定しました：',
        's02.c.checkout.li1': '価格を一目で把握できるよう明確に表示する。',
        's02.c.checkout.li2': '配送先住所を強調し、最終確認をしやすくする。',
        's02.c.checkout.li3': '商品画像が大きい場合にも柔軟に対応できるようにする。',
        's02.d.title': 'd. プロフィールページの再設計',
        's02.d.prev.label': '旧バージョン',
        's02.d.prev.body1': '当初のプロダクト計画では、プロフィールページに将来の「ユーザー投稿」機能のためのスペースが確保されていました。しかし戦略変更により実装されないまま、確保された領域が無駄になっていました。',
        's02.d.prev.body2': 'EC アプリでは、すべての区画が<span class="stat-hi">商品との潜在的なタッチポイント</span>になります。使われないスペースは、ユーザーエンゲージメントの機会損失を意味します。',
        's02.d.new.label': '新バージョン',
        's02.d.new.body1': '再設計したプロフィールページでは、「マイ注文」と「カスタマーサポート」を最上部に配置し、すばやくアクセスできるようにしました。',
        's02.d.new.body2': 'その下に「最近見た商品」「ショッピングカート」「あなたへのおすすめ」のカルーセルを追加し、<span class="stat-hi">商品が再びチェックアウトフローに戻る機会を大きく増やしました</span>。'
      }
    };

    const a41RichKeys = [
      'intro.role.body',
      's01.lede',
      's01.item2.body',
      's02.a.prev.body', 's02.a.new.body',
      's02.b.info.body1',
      's02.b.picker.body2',
      's02.c.cart.body1',
      's02.d.prev.body2', 's02.d.new.body2'
    ];

    const a41Originals = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      a41Originals[key] = a41RichKeys.includes(key) ? el.innerHTML : el.textContent;
    });

    function applyA41Lang(lang) {
      const t = a41I18n[lang];
      if (!t || lang === 'en') {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (a41Originals[key] !== undefined) {
            if (a41RichKeys.includes(key)) el.innerHTML = a41Originals[key];
            else el.textContent = a41Originals[key];
          }
        });
        document.documentElement.lang = 'en';
        return;
      }
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
          if (a41RichKeys.includes(key)) el.innerHTML = t[key];
          else el.textContent = t[key];
        }
      });
      document.documentElement.lang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
    }

    try {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved && saved !== 'en') applyA41Lang(saved);
      const sel = document.getElementById('nav-lang-select');
      if (sel) sel.value = saved || 'en';
    } catch(e) {}

    const langSel = document.getElementById('nav-lang-select');
    if (langSel) {
      langSel.addEventListener('change', () => {
        const lang = langSel.value;
        applyA41Lang(lang);
        try { localStorage.setItem('portfolio-lang', lang); } catch(e) {}
      });
    }
  })();
