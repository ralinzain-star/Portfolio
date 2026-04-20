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
  })();

  // ── i18n ──
  (function() {
    const notifI18n = {
      'zh-tw': {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.介紹',
        'nav.s01': '01.起點',
        'nav.s02': '02.流程',
        'nav.s03': '03.產出',
        'nav.s04': '04.AI 分類器',
        'nav.s05': '05.影響',
        'page.title': '通知框架',
        'page.subtitle': '將零散的警告訊息，整合為統一、可審查的通知框架。',
        'intro.label.product': '專案概覽：',
        'intro.product.body1': '我們發現不同功能團隊各自發送通知，卻缺乏對整體現況的共識。結果是使用者有時收到重複訊息，有時又錯過真正重要的通知。我們決定解決這個問題，建立一套共享框架，讓團隊能在「送什麼、何時送、為什麼送」上對齊。',
        'intro.product.body2': '這項工作導入了結構化規則、擴展了通知分類，並定義了頻率與優先級模型。我也協助設計了一套 AI 驅動的分類器（Classifier）輔助工具，把框架轉化為可供規劃與驗證的審查工作流。',
        'intro.label.role': '我的角色：',
        'intro.role.body': '身為互動設計師，我<span class="stat-hi">盤點並分類了既有的通知</span>、共同制定決策框架，並將其轉化為實用的審查工具。我凝聚<span class="stat-hi">跨職能團隊</span>的共識、協助定義分類器工作流，也撰寫系統文件，讓這套規範能<span class="stat-hi">擴展到單一功能團隊之外</span>。',
        'intro.label.company': '公司與時程：',
        'intro.company.body': '大型消費電子平台 · 2025',
        's01.title': '我們的起點',
        's01.bg.label': '專案背景：',
        's01.bg.body': '我們先從平台上 <span class="stat-hi">6 個核心功能</span>的通知進行全面盤點。通知散落在不同的設計檔案中，沒有單一真實來源，每個團隊都各自為政。盤點揭露了訊息重疊、語氣不一致，以及關鍵通知完全缺席的斷層。',
        's01.goal.label': '我們的目標：',
        's01.goal.li1': '<strong>奠定基礎</strong>, 建立一套設計師與 PM 能共同參照的統一框架。',
        's01.goal.li2': '<strong>確保一致性</strong>, 減少跨功能間的冗餘與衝突訊息。',
        's01.goal.li3': '<strong>賦能更好的工作方式</strong>, 建立共享標準，讓團隊能更有自信地加速推進。',
        's02.title': '我們的流程',
        's02.lede': '框架建立在兩大支柱上，並透過迭代持續優化：<strong>分類與使用情境</strong>，以平台級通知政策為依據，經過多輪利害關係人審查調整；以及<strong>通知頻率類型</strong>，植基於既有設計系統，確保視覺與行為的一致性。',
        's02.step1.label': '步驟 1, 通知盤點',
        's02.step1.body': '我們從 6 個核心功能的通知盤點開始。通知散落在不同設計檔案中，沒有單一真實來源。我逐一以觸發條件、緊急性與頻率標記每一則，再轉化為流程圖，重建端到端的使用者旅程。',
        's02.step2.label': '步驟 2, 分類與規則',
        's02.step2.body': '基於盤點結果，我們設計出一棵分類樹，透過簡單但系統化的提問定位每一則通知：這是使用者觸發的嗎？這是裝置健康警告嗎？這具備情境脈絡嗎？每個答案都會指向特定類別、頻率類型與重要性等級。',
        's02.step3.label': '步驟 3, 跨職能對齊',
        's02.step3.body': '我與 PM 和工程師緊密合作，舉辦設計審查與情境測試，用真實使用案例壓力測試這套框架。這些會議揭露了冗餘最痛的所在、一致性最關鍵的節點，把框架塑造成<span class="stat-hi">實際可用、而非只是理論</span>的工具。',
        's03.title': '我們的產出',
        's03.step1.label': '分類與使用指引',
        's03.step1.body': '我們定義了 <span class="stat-hi">8 個類別</span>，以平台級通知政策為依據（例如：嚴重裝置健康警告、安全與隱私、背景動作、情境洞察）。這讓團隊擁有共同的詞彙，能一致地描述自己正在送出哪種訊息。',
        's03.step2.label': '頻率類型指引',
        's03.step2.body': '我們規劃了 <span class="stat-hi">4 種主要派發類型</span>：一次性資訊、再次出現、定期派發、持續中。每一種都有明確的緊急性規則、何時該消失、以及多久能再次出現。這給了團隊明確的護欄，避免過度通知與警報疲勞。',
        's03.step3.label': '排序與優先級指引',
        's03.step3.body': '每則通知都被指派一個重要性等級，決定它的視覺呈現與中斷行為。我們把通知對應到 <span class="stat-hi">4 個等級（緊急、高、中、低）</span>，確保語氣一致，也與系統行為（聲音、震動、橫幅彈出等）對齊。',
        's03.step4.label': '通知輔助工具',
        's03.step4.body': '靜態的框架還不夠，我們需要一種讓團隊能在日常工作流中真正使用它的方式。為了解決這點，我設計了<span class="stat-hi">AI 驅動的通知分類器</span>：一套結構化系統，能把設計規則轉化為可執行的產出，適用於多種輸入型態（PRD、設計稿、截圖、流程圖）。',
        's03.tree.label': '分類樹',
        's03.tree.body': '框架採用決策樹結構，讓任何通知都能被一致地分類。這套序列化流程確保了每則通知都以相同的視角被檢視，無論是哪個團隊設計的。',
        's03.tree.start.tag': '開始',
        's03.tree.start.name': '新通知',
        's03.tree.step1.tag': '步驟 1',
        's03.tree.step1.sub': '分類與使用, 選擇最能描述通知目的的類別。',
        's03.tree.cat1': '1. 嚴重裝置健康警告',
        's03.tree.cat2': '2. 安全、防護與隱私',
        's03.tree.cat3': '3. 使用者觸發',
        's03.tree.cat4': '4. 背景動作',
        's03.tree.cat5': '5. 自動系統狀態',
        's03.tree.cat6': '6. 系統管理指引',
        's03.tree.cat7': '7. 情境洞察與提醒',
        's03.tree.cat8': '8. 促銷',
        's03.tree.step2.tag': '步驟 2',
        's03.tree.step2.sub': '頻率類型, 判斷出現頻率與條件。',
        's03.tree.step3.tag': '步驟 3',
        's03.tree.step3.sub': '重要性等級, 根據緊急性與使用者影響指派優先級。',
        's03.tree.end.tag': '結束',
        's03.tree.end.name': '完成分類',
        's04.title': '設計 AI 分類器, 使用 Gemini Gem',
        's04.step1.label': '定義角色與模式',
        's04.step1.body': '我為分類器設定了明確的角色，並導入<span class="stat-hi">由輸入驅動的模式切換</span>。依據輸入是文字、規劃文件還是流程圖，分類器會自動套用對應的邏輯。這降低了模糊地帶，確保每種情境都被適當處理。',
        's04.step2.label': '標準化審查表',
        's04.step2.body': '為了讓產出能被直接使用，我建立了一張固定欄位的審查表：功能、觸發、類別、頻率、重要性、優先級、消失條件、版面／動作、顯示方式。任何推論填補的欄位都必須標記為 (AI Addition)，讓結果<span class="stat-hi">可追溯、可稽核、可供審查</span>。',
        's04.step3.label': '錨定核心文件',
        's04.step3.body': '分類器被錨定在三份權威文件上，分類與使用、頻率類型、決策樹。每次分類都會回扣這些定義並附上摘要，確保<span class="stat-hi">與框架一致</span>，而非以語言層面的猜測代替。',
        's04.step4.label': '處理複雜輸入',
        's04.step4.body': '我為容易出現雜訊的流程圖審查寫了嚴格規則。流程圖輸入時，<span class="stat-hi">只處理黃色卡片</span>，一卡一列，非通知元素一律忽略。即使是文字相同但觸發不同的條目也會被拆成獨立項目，讓討論聚焦在通知本身。',
        's04.step5.label': '可解釋的規則與反饋迴圈',
        's04.step5.body': '重要性與優先級都透過可解釋的規則推導出來（類別 → 頻率 → 系統行為）。主觀評分被換成<span class="stat-hi">團隊可辯論的邏輯</span>。我也內建了反饋迴圈：若分類被挑戰，分類器會提供替代方案、重算數值，並比對通知清單避免重複。',
        's05.title': '影響',
        's05.impact1.label': '奠定基礎',
        's05.impact1.goal': '<strong>目標：</strong>建立統一的通知框架，讓團隊有一致的方式分類與治理通知。',
        's05.impact1.body': '<strong>影響：</strong>把工作扎根在三份核心文件上，分類、頻率類型、決策樹，讓團隊擁有<span class="stat-hi">共同語言</span>。審查討論從個人詮釋，轉為更一致的決策流程。',
        's05.impact2.label': '確保一致性',
        's05.impact2.goal': '<strong>目標：</strong>避免使用者收到重複或衝突的訊息，提升整體體驗的一致性。',
        's05.impact2.body': '<strong>影響：</strong>結構化規則讓去重成為工作流的一環。AI 分類器會檢查觸發條件是否重疊，並標記推論欄位，<span class="stat-hi">同時降低遺漏與審查摩擦</span>。',
        's05.impact3.label': '賦能更好的工作方式',
        's05.impact3.goal': '<strong>目標：</strong>協助設計師與 PM 在流程早期就做出更清晰的決策。',
        's05.impact3.body': '<strong>影響：</strong>分類器導入了 MVP／長期切分、可解釋的重要性規則、替代建議，讓產品規劃<span class="stat-hi">能更早行動、理由也更清楚</span>。',
        's05.summary': '框架結合 AI 輔助工具，降低了設計良好通知所需的力氣。最終，它把一個散亂的通知問題，轉化為一套<span class="stat-hi">可重複執行的流程</span>，為團隊提供了設計審查、取捨討論，以及跨功能權責的<span class="stat-hi">共享基礎</span>。'
      },
      'zh-cn': {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.介绍',
        'nav.s01': '01.起点',
        'nav.s02': '02.流程',
        'nav.s03': '03.产出',
        'nav.s04': '04.AI 分类器',
        'nav.s05': '05.影响',
        'page.title': '通知框架',
        'page.subtitle': '将零散的警告信息，整合为统一、可审查的通知框架。',
        'intro.label.product': '项目概览：',
        'intro.product.body1': '我们发现不同功能团队各自发送通知，却缺乏对整体现状的共识。结果是用户有时收到重复消息，有时又错过真正重要的通知。我们决定解决这个问题，建立一套共享框架，让团队能在"送什么、何时送、为什么送"上对齐。',
        'intro.product.body2': '这项工作引入了结构化规则、扩展了通知分类，并定义了频率与优先级模型。我也协助设计了一套 AI 驱动的分类器（Classifier）辅助工具，把框架转化为可供规划与验证的审查工作流。',
        'intro.label.role': '我的角色：',
        'intro.role.body': '作为交互设计师，我<span class="stat-hi">盘点并分类了既有的通知</span>、共同制定决策框架，并将其转化为实用的审查工具。我凝聚<span class="stat-hi">跨职能团队</span>的共识、协助定义分类器工作流，也撰写系统文档，让这套规范能<span class="stat-hi">扩展到单一功能团队之外</span>。',
        'intro.label.company': '公司与时程：',
        'intro.company.body': '大型消费电子平台 · 2025',
        's01.title': '我们的起点',
        's01.bg.label': '项目背景：',
        's01.bg.body': '我们先从平台上 <span class="stat-hi">6 个核心功能</span>的通知进行全面盘点。通知散落在不同的设计文件中，没有单一真实来源，每个团队都各自为政。盘点揭露了消息重叠、语气不一致，以及关键通知完全缺席的断层。',
        's01.goal.label': '我们的目标：',
        's01.goal.li1': '<strong>奠定基础</strong>, 建立一套设计师与 PM 能共同参照的统一框架。',
        's01.goal.li2': '<strong>确保一致性</strong>, 减少跨功能间的冗余与冲突消息。',
        's01.goal.li3': '<strong>赋能更好的工作方式</strong>, 建立共享标准，让团队能更有自信地加速推进。',
        's02.title': '我们的流程',
        's02.lede': '框架建立在两大支柱上，并通过迭代持续优化：<strong>分类与使用情境</strong>，以平台级通知政策为依据，经过多轮利益相关者审查调整；以及<strong>通知频率类型</strong>，植基于既有设计系统，确保视觉与行为的一致性。',
        's02.step1.label': '步骤 1, 通知盘点',
        's02.step1.body': '我们从 6 个核心功能的通知盘点开始。通知散落在不同设计文件中，没有单一真实来源。我逐一以触发条件、紧急性与频率标记每一则，再转化为流程图，重建端到端的用户旅程。',
        's02.step2.label': '步骤 2, 分类与规则',
        's02.step2.body': '基于盘点结果，我们设计出一棵分类树，通过简单但系统化的提问定位每一则通知：这是用户触发的吗？这是设备健康警告吗？这具备情境脉络吗？每个答案都会指向特定类别、频率类型与重要性等级。',
        's02.step3.label': '步骤 3, 跨职能对齐',
        's02.step3.body': '我与 PM 和工程师紧密合作，举办设计评审与情境测试，用真实用例压力测试这套框架。这些会议揭露了冗余最痛的所在、一致性最关键的节点，把框架塑造成<span class="stat-hi">实际可用、而非只是理论</span>的工具。',
        's03.title': '我们的产出',
        's03.step1.label': '分类与使用指南',
        's03.step1.body': '我们定义了 <span class="stat-hi">8 个类别</span>，以平台级通知政策为依据（例如：严重设备健康警告、安全与隐私、后台动作、情境洞察）。这让团队拥有共同的词汇，能一致地描述自己正在发送哪种消息。',
        's03.step2.label': '频率类型指南',
        's03.step2.body': '我们规划了 <span class="stat-hi">4 种主要派发类型</span>：一次性信息、再次出现、定期派发、持续中。每一种都有明确的紧急性规则、何时该消失、以及多久能再次出现。这给了团队明确的护栏，避免过度通知与警报疲劳。',
        's03.step3.label': '排序与优先级指南',
        's03.step3.body': '每则通知都被指派一个重要性等级，决定它的视觉呈现与中断行为。我们把通知对应到 <span class="stat-hi">4 个等级（紧急、高、中、低）</span>，确保语气一致，也与系统行为（声音、震动、横幅弹出等）对齐。',
        's03.step4.label': '通知辅助工具',
        's03.step4.body': '静态的框架还不够，我们需要一种让团队能在日常工作流中真正使用它的方式。为了解决这点，我设计了<span class="stat-hi">AI 驱动的通知分类器</span>：一套结构化系统，能把设计规则转化为可执行的产出，适用于多种输入型态（PRD、设计稿、截图、流程图）。',
        's03.tree.label': '分类树',
        's03.tree.body': '框架采用决策树结构，让任何通知都能被一致地分类。这套序列化流程确保了每则通知都以相同的视角被审视，无论是哪个团队设计的。',
        's03.tree.start.tag': '开始',
        's03.tree.start.name': '新通知',
        's03.tree.step1.tag': '步骤 1',
        's03.tree.step1.sub': '分类与使用, 选择最能描述通知目的的类别。',
        's03.tree.cat1': '1. 严重设备健康警告',
        's03.tree.cat2': '2. 安全、防护与隐私',
        's03.tree.cat3': '3. 用户触发',
        's03.tree.cat4': '4. 后台动作',
        's03.tree.cat5': '5. 自动系统状态',
        's03.tree.cat6': '6. 系统管理指引',
        's03.tree.cat7': '7. 情境洞察与提醒',
        's03.tree.cat8': '8. 促销',
        's03.tree.step2.tag': '步骤 2',
        's03.tree.step2.sub': '频率类型, 判断出现频率与条件。',
        's03.tree.step3.tag': '步骤 3',
        's03.tree.step3.sub': '重要性等级, 根据紧急性与用户影响指派优先级。',
        's03.tree.end.tag': '结束',
        's03.tree.end.name': '完成分类',
        's04.title': '设计 AI 分类器, 使用 Gemini Gem',
        's04.step1.label': '定义角色与模式',
        's04.step1.body': '我为分类器设定了明确的角色，并引入<span class="stat-hi">由输入驱动的模式切换</span>。依据输入是文字、规划文档还是流程图，分类器会自动套用对应的逻辑。这降低了模糊地带，确保每种情境都被适当处理。',
        's04.step2.label': '标准化审查表',
        's04.step2.body': '为了让产出能被直接使用，我建立了一张固定字段的审查表：功能、触发、类别、频率、重要性、优先级、消失条件、版面／动作、显示方式。任何推论填补的字段都必须标记为 (AI Addition)，让结果<span class="stat-hi">可追溯、可审计、可供审查</span>。',
        's04.step3.label': '锚定核心文档',
        's04.step3.body': '分类器被锚定在三份权威文档上，分类与使用、频率类型、决策树。每次分类都会回扣这些定义并附上摘要，确保<span class="stat-hi">与框架一致</span>，而非以语言层面的猜测代替。',
        's04.step4.label': '处理复杂输入',
        's04.step4.body': '我为容易出现噪音的流程图审查写了严格规则。流程图输入时，<span class="stat-hi">只处理黄色卡片</span>，一卡一行，非通知元素一律忽略。即使是文字相同但触发不同的条目也会被拆成独立项目，让讨论聚焦在通知本身。',
        's04.step5.label': '可解释的规则与反馈回路',
        's04.step5.body': '重要性与优先级都通过可解释的规则推导出来（类别 → 频率 → 系统行为）。主观评分被换成<span class="stat-hi">团队可辩论的逻辑</span>。我也内置了反馈回路：若分类被挑战，分类器会提供替代方案、重算数值，并比对通知清单避免重复。',
        's05.title': '影响',
        's05.impact1.label': '奠定基础',
        's05.impact1.goal': '<strong>目标：</strong>建立统一的通知框架，让团队有一致的方式分类与治理通知。',
        's05.impact1.body': '<strong>影响：</strong>把工作扎根在三份核心文档上，分类、频率类型、决策树，让团队拥有<span class="stat-hi">共同语言</span>。审查讨论从个人诠释，转为更一致的决策流程。',
        's05.impact2.label': '确保一致性',
        's05.impact2.goal': '<strong>目标：</strong>避免用户收到重复或冲突的消息，提升整体体验的一致性。',
        's05.impact2.body': '<strong>影响：</strong>结构化规则让去重成为工作流的一环。AI 分类器会检查触发条件是否重叠，并标记推论字段，<span class="stat-hi">同时降低遗漏与审查摩擦</span>。',
        's05.impact3.label': '赋能更好的工作方式',
        's05.impact3.goal': '<strong>目标：</strong>协助设计师与 PM 在流程早期就做出更清晰的决策。',
        's05.impact3.body': '<strong>影响：</strong>分类器引入了 MVP／长期切分、可解释的重要性规则、替代建议，让产品规划<span class="stat-hi">能更早行动、理由也更清楚</span>。',
        's05.summary': '框架结合 AI 辅助工具，降低了设计良好通知所需的力气。最终，它把一个散乱的通知问题，转化为一套<span class="stat-hi">可重复执行的流程</span>，为团队提供了设计评审、取舍讨论，以及跨功能权责的<span class="stat-hi">共享基础</span>。'
      },
      ja: {
        'nav.back': '← Iris Hsieh',
        'nav.intro': '.イントロ',
        'nav.s01': '01.出発点',
        'nav.s02': '02.プロセス',
        'nav.s03': '03.成果',
        'nav.s04': '04.AI 分類器',
        'nav.s05': '05.インパクト',
        'page.title': '通知フレームワーク',
        'page.subtitle': '散在するアラートを、統一されレビュー可能な通知フレームワークへ。',
        'intro.label.product': 'プロジェクト概要：',
        'intro.product.body1': '異なる機能チームが全体像を共有しないまま通知を送信していることに気づきました。結果として、ユーザーは重複したメッセージを受け取ったり、本当に重要な通知を見逃したりしていました。この問題を解決するため、チームが「何を、いつ、なぜ」送るのかで足並みを揃えられる共通の基盤を構築しました。',
        'intro.product.body2': 'この取り組みでは、構造化されたルールの導入、通知カテゴリの拡張、頻度と優先度モデルの定義を行いました。また、フレームワークを企画・検証のためのレビュー可能なワークフローに変える、AI 駆動の分類器（Classifier）の設計も支援しました。',
        'intro.label.role': '担当役割：',
        'intro.role.body': 'インタラクションデザイナーとして、<span class="stat-hi">既存の通知を監査・分類</span>し、意思決定フレームワークを共同で作り上げ、実用的なレビューツールへと落とし込みました。<span class="stat-hi">職能横断チーム</span>の認識を合わせ、分類器ワークフローの定義を支援し、単一の機能チームを超えて<span class="stat-hi">スケールできるようシステムをドキュメント化</span>しました。',
        'intro.label.company': '企業と期間：',
        'intro.company.body': '大手消費者向け電子機器プラットフォーム · 2025',
        's01.title': '私たちの出発点',
        's01.bg.label': 'プロジェクトの背景：',
        's01.bg.body': 'プラットフォーム内の <span class="stat-hi">6 つのコア機能</span>にわたる通知の包括的な監査から始めました。通知は別々のデザインファイルに散在しており、信頼できる唯一の情報源（Single Source of Truth）がなく、各チームが孤立してデザインしていました。監査により、重複するメッセージ、ばらついたトーン、重要な通知がまったく存在しない空白が明らかになりました。',
        's01.goal.label': '私たちの目標：',
        's01.goal.li1': '<strong>基盤を構築する</strong>, デザイナーと PM が共通して参照できる統一フレームワークを作る。',
        's01.goal.li2': '<strong>一貫性を確保する</strong>, 機能間の冗長性と矛盾するメッセージを減らす。',
        's01.goal.li3': '<strong>より良い働き方を支援する</strong>, 共通基準を整え、チームが自信を持ってスピードを上げられるようにする。',
        's02.title': '私たちのプロセス',
        's02.lede': 'このフレームワークは 2 つの柱の上に構築され、それぞれ反復的に磨き上げられました。<strong>カテゴリと利用シーン</strong>、プラットフォームレベルの通知ポリシーに基づき、ステークホルダーレビューを何度も経て調整。そして<strong>通知の頻度タイプ</strong>、視覚的・振る舞いの一貫性を担保するため、既存のデザインシステムに基づいています。',
        's02.step1.label': 'ステップ 1, 通知の監査',
        's02.step1.body': '6 つのコア機能にわたる通知の包括的な監査から始めました。通知は別々のデザインファイルに散在しており、信頼できる唯一の情報源は存在しませんでした。一件ずつトリガー、緊急性、頻度でマッピングし、フローチャートに変換してエンドツーエンドのユーザージャーニーを再構築しました。',
        's02.step2.label': 'ステップ 2, 分類とルール',
        's02.step2.body': '監査結果から、シンプルだが体系的な問いを投げる分類ツリーを設計しました。これはユーザーが起点か？ デバイス健康警告か？ コンテキスト依存か？ 各回答がカテゴリ、頻度タイプ、重要度レベルへと導きます。',
        's02.step3.label': 'ステップ 3, 職能横断の整合',
        's02.step3.body': 'PM やエンジニアと密に連携し、デザインレビューとシナリオテストを行って、実際のユースケースでフレームワークにストレステストをかけました。これらのセッションで、冗長性が最も痛い箇所と一貫性が最も重要な箇所が明らかになり、フレームワークを<span class="stat-hi">理論ではなく実用的なもの</span>へと形作っていきました。',
        's03.title': '構築したもの',
        's03.step1.label': 'カテゴリと利用ガイドライン',
        's03.step1.body': 'プラットフォームレベルの通知ポリシーに基づき、<span class="stat-hi">8 つのカテゴリ</span>（重大なデバイス健康警告、セキュリティとプライバシー、バックグラウンド動作、コンテキスト洞察など）を定義しました。これによりチームは、送っているメッセージの種類を一貫して表現できる共通語彙を手にしました。',
        's03.step2.label': '頻度タイプのガイドライン',
        's03.step2.body': '<span class="stat-hi">4 つの主要な配信タイプ</span>を策定：1 回限りの情報、再表示、定期配信、継続中。それぞれに緊急性、消えるべきタイミング、再表示の頻度に関する明確なルールを設けました。これでチームには、過剰通知とアラート疲れに対する明確なガードレールができました。',
        's03.step3.label': 'ランキングと優先度のガイドライン',
        's03.step3.body': '各通知には重要度レベルが割り当てられ、視覚的扱いと割り込み動作を決定します。通知を <span class="stat-hi">4 段階（緊急、高、中、低）</span>にマッピングし、トーンの一貫性と、システム挙動（音、バイブレーション、ヘッズアップなど）との整合を両立させました。',
        's03.step4.label': '通知ヘルパーツール',
        's03.step4.body': '静的なフレームワークだけでは足りませんでした、チームが日々のワークフローで実際に使える仕組みが必要でした。これを解決するため、<span class="stat-hi">AI 駆動の通知分類器</span>を設計しました。デザインルールを、さまざまな入力タイプ（PRD、モック、スクリーンショット、フローチャート）にまたがる実行可能な出力へと変換する構造化システムです。',
        's03.tree.label': '分類ツリー',
        's03.tree.body': 'フレームワークは決定木構造を用い、どんな通知も一貫して分類できるようにしています。この順序立てたフローにより、どのチームが設計したかに関わらず、すべての通知が同じ視点で評価されることを保証します。',
        's03.tree.start.tag': '開始',
        's03.tree.start.name': '新しい通知',
        's03.tree.step1.tag': 'ステップ 1',
        's03.tree.step1.sub': 'カテゴリと利用, 通知の目的を最もよく表すカテゴリを選択。',
        's03.tree.cat1': '1. 重大なデバイス健康警告',
        's03.tree.cat2': '2. セキュリティ、安全性、プライバシー',
        's03.tree.cat3': '3. ユーザー起点',
        's03.tree.cat4': '4. バックグラウンド動作',
        's03.tree.cat5': '5. 自動システムステータス',
        's03.tree.cat6': '6. システム管理ガイダンス',
        's03.tree.cat7': '7. コンテキスト洞察とアラート',
        's03.tree.cat8': '8. プロモーション',
        's03.tree.step2.tag': 'ステップ 2',
        's03.tree.step2.sub': '頻度タイプ, 表示頻度と条件を判定。',
        's03.tree.step3.tag': 'ステップ 3',
        's03.tree.step3.sub': '重要度レベル, 緊急性とユーザー影響に基づき優先度を割り当てる。',
        's03.tree.end.tag': '終了',
        's03.tree.end.name': '分類完了',
        's04.title': 'AI 分類器の設計, Gemini Gem を活用',
        's04.step1.label': '役割とモードの定義',
        's04.step1.body': '分類器に明確な役割を設定し、<span class="stat-hi">入力駆動のモード切り替え</span>を導入しました。入力がテキストか、企画文書か、フローチャートかに応じて、分類器が適切なロジックを自動適用します。これにより曖昧さが減り、各コンテキストが適切に扱われるようになりました。',
        's04.step2.label': '標準化されたレビュー表',
        's04.step2.body': '出力をそのまま使えるよう、固定フィールドのレビュー表を作成しました：機能、トリガー、カテゴリ、頻度、重要度、優先度、消える条件、レイアウト／アクション、表示方法。推論されたデータは (AI Addition) として必ずフラグを立て、結果を<span class="stat-hi">追跡可能・監査可能・レビュー可能</span>にしました。',
        's04.step3.label': 'コアドキュメントへの固定',
        's04.step3.body': '分類器は 3 つの権威あるドキュメント、カテゴリと利用、頻度タイプ、決定木、に固定されています。各分類はこれらの定義を参照し、サマリーを付けることで、言語ベースの推測ではなく<span class="stat-hi">フレームワークとの一貫性</span>を担保しました。',
        's04.step4.label': '複雑な入力の処理',
        's04.step4.body': 'ノイズが多くなりがちなフローチャートレビューには、厳格なルールを書きました。フローチャート入力では、<span class="stat-hi">黄色いカードのみを処理</span>し、行ごとに 1 件、非通知要素は無視します。テキストが同じでもトリガーが異なれば別エントリとして扱い、議論を通知に厳密にフォーカスさせます。',
        's04.step5.label': '説明可能なルールとフィードバックループ',
        's04.step5.body': '重要度と優先度は、説明可能なルール（カテゴリ → 頻度 → システム挙動）で導出しました。主観的なスコアリングは<span class="stat-hi">チームが議論できるロジック</span>に置き換えました。フィードバックループも組み込んでいます。分類に異議があれば、分類器が代替案を提示し、値を再計算し、通知インベントリと突き合わせて重複をチェックします。',
        's05.title': 'インパクト',
        's05.impact1.label': '基盤の構築',
        's05.impact1.goal': '<strong>目標：</strong>統一された通知フレームワークを確立し、チームが一貫した方法で通知を分類・統治できるようにする。',
        's05.impact1.body': '<strong>インパクト：</strong>仕事を 3 つのコアドキュメント、カテゴリ、頻度タイプ、決定木、に根付かせることで、チームに<span class="stat-hi">共通の言語</span>を与えました。レビューの議論は、個人の解釈から、より一貫した意思決定プロセスへと変わりました。',
        's05.impact2.label': '一貫性の確保',
        's05.impact2.goal': '<strong>目標：</strong>ユーザーが重複や矛盾したメッセージを受け取るのを防ぎ、全体の体験の一貫性を高める。',
        's05.impact2.body': '<strong>インパクト：</strong>構造化されたルールにより、重複排除がワークフローの一部になりました。AI 分類器はトリガーの重複をチェックし、推論されたフィールドにフラグを立て、<span class="stat-hi">抜け漏れとレビューの摩擦の両方を低減</span>しました。',
        's05.impact3.label': 'より良い働き方の支援',
        's05.impact3.goal': '<strong>目標：</strong>デザイナーと PM がプロセスの早い段階で、より明確な判断を下せるようにする。',
        's05.impact3.body': '<strong>インパクト：</strong>分類器は MVP／長期の切り分け、説明可能な重要度ルール、代替提案を導入し、プロダクトプランニングが<span class="stat-hi">より早く、より明確な根拠をもって進む</span>ようサポートしました。',
        's05.summary': 'AI アシストツールと組み合わさったこのフレームワークは、よく考え抜かれた通知を設計するために必要な労力を減らしました。最終的に、散らばっていた通知の問題を<span class="stat-hi">再現可能なプロセス</span>へと変え、チームにデザインレビュー、トレードオフの議論、機能横断の明確な責任分担のための<span class="stat-hi">共有された基盤</span>をもたらしました。'
      }
    };

    const notifRichKeys = [
      'intro.role.body',
      's01.bg.body','s01.goal.li1','s01.goal.li2','s01.goal.li3',
      's02.lede','s02.step3.body',
      's03.step1.body','s03.step2.body','s03.step3.body','s03.step4.body',
      's03.tree.step1.sub','s03.tree.step2.sub','s03.tree.step3.sub',
      's04.step1.body','s04.step2.body','s04.step3.body','s04.step4.body','s04.step5.body',
      's05.impact1.goal','s05.impact1.body','s05.impact2.goal','s05.impact2.body','s05.impact3.goal','s05.impact3.body',
      's05.summary'
    ];

    const notifOriginals = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      notifOriginals[key] = notifRichKeys.includes(key) ? el.innerHTML : el.textContent;
    });

    function applyNotifLang(lang) {
      const t = notifI18n[lang];
      if (!t || lang === 'en') {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (notifOriginals[key] !== undefined) {
            if (notifRichKeys.includes(key)) el.innerHTML = notifOriginals[key];
            else el.textContent = notifOriginals[key];
          }
        });
        document.documentElement.lang = 'en';
        return;
      }
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
          if (notifRichKeys.includes(key)) el.innerHTML = t[key];
          else el.textContent = t[key];
        }
      });
      document.documentElement.lang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
    }

    try {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved && saved !== 'en') applyNotifLang(saved);
      const sel = document.getElementById('nav-lang-select');
      if (sel) sel.value = saved || 'en';
    } catch(e) {}

    const langSel = document.getElementById('nav-lang-select');
    if (langSel) {
      langSel.addEventListener('change', () => {
        const lang = langSel.value;
        applyNotifLang(lang);
        try { localStorage.setItem('portfolio-lang', lang); } catch(e) {}
      });
    }
  })();
