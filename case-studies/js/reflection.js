// ── Language switcher ──
  (function() {
    const sel = document.getElementById('nav-lang-select');
    if (!sel) return;

    const titles = {
      en: 'Reflections on Design: From Pixel-Perfect Obsession to the AI Cthulhu',
      'zh-tw': '設計反思：從像素級的執著，到馴服 AI 克蘇魯',
      'zh-cn': '设计反思：从像素级的执着，到驯服 AI 克苏鲁',
      ja: 'デザインに関する考察：ピクセルパーフェクトへの執着からAIという未知の領域へ'
    };
    const quotes = {
      en: 'We are no longer simple builders; we are attempting to tame an uncertain power.',
      'zh-tw': '我們不再是單純的建造者，而是試圖馴服一股不確定的力量。',
      'zh-cn': '我们不再是单纯的建造者，而是试图驯服一股不确定的力量。',
      ja: '私たちはもはや単なる「作り手」ではなく、不確実な力を手なずけようとする存在なのです。'
    };

    function applyLang(lang) {
      // title
      const h1 = document.getElementById('article-title');
      if (h1 && titles[lang]) h1.textContent = titles[lang];
      // pull quote
      const pq = document.querySelector('.pull-quote');
      if (pq && quotes[lang]) pq.textContent = quotes[lang];
      // paragraphs
      document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
      });
    }

    try {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved) { sel.value = saved; applyLang(saved); }
    } catch(e) {}

    sel.addEventListener('change', () => {
      const lang = sel.value;
      try { localStorage.setItem('portfolio-lang', lang); } catch(e) {}
      applyLang(lang);
    });
  })();
