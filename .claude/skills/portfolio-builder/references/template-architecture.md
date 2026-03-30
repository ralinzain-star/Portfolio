# Portfolio Case Study Template Architecture

This is the technical reference for generating case study HTML pages. Every pattern here is extracted from the live `rezio.html` and `notification.html` pages.

## Table of Contents

1. [Document Shell](#document-shell)
2. [CSS Design Tokens & Base Styles](#css-design-tokens)
3. [Typography Classes](#typography)
4. [Navigation](#navigation)
5. [Title Bar](#title-bar)
6. [Intro Split Card](#intro-card)
7. [Section Wrapper](#section-wrapper)
8. [Text Blocks & Lists](#text-blocks)
9. [Stat Highlights](#stat-highlights)
10. [Persona Table](#persona-table)
11. [Key-Value Cards](#kv-cards)
12. [Pain Point Callouts](#pain-callouts)
13. [Preview Grids & Images](#preview-grids)
14. [Feature Blocks](#feature-blocks)
15. [Results Row](#results-row)
16. [Vertical Story Spine](#story-spine)
17. [Screenshot Placeholders](#screenshot-placeholders)
18. [Footer](#footer)
19. [i18n System](#i18n)
20. [Scroll-Reveal Animations](#animations)
21. [Responsive Breakpoints](#responsive)
22. [Nav Active-State JS](#nav-js)

---

## 1. Document Shell {#document-shell}

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{Project Title} · Iris Hsieh</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Noto+Sans:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    /* ALL CSS HERE */
  </style>
</head>
<body>
  <!-- ALL HTML HERE -->
  <script>
    /* ALL JS HERE (i18n, animations, nav) */
  </script>
</body>
</html>
```

## 2. CSS Design Tokens & Base Styles {#css-design-tokens}

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #f0ebe2;
  --bg-card:  #fffefb;
  --border:   #dbd4c9;
  --text:     #2b2520;
  --muted:    #8c8079;
  --accent:   #c97888;  /* change per project */
}

/* Language-specific fonts */
html[lang="ja"]    body { font-family: 'Noto Sans JP', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-TW"] body { font-family: 'Noto Sans TC', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-CN"] body { font-family: 'Noto Sans SC', 'Noto Sans', 'Barlow', sans-serif; }

html, body {
  font-family: 'Noto Sans', 'Barlow', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  line-height: 1.4;
}
a { color: inherit; text-decoration: none; }
img { display: block; }
```

## 3. Typography Classes {#typography}

```css
.h3 {
  font-size: 11px; font-weight: 700; line-height: 1.2;
  letter-spacing: 0.1em; text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}
.body {
  font-size: 14px; font-weight: 400; line-height: 1.75;
  font-family: 'Noto Sans', sans-serif;
}
.body-med {
  font-size: 14px; font-weight: 600; line-height: 1.5;
  font-family: 'Noto Sans', sans-serif;
}
.body-sm {
  font-size: 13px; font-weight: 400; line-height: 1.65;
  font-family: 'Noto Sans', sans-serif;
}
.caption {
  font-size: 10px; font-weight: 400; line-height: 1.4;
  letter-spacing: 0.06em;
  font-family: 'IBM Plex Mono', monospace;
}
.text-block { display: flex; flex-direction: column; gap: 8px; }
```

## 4. Navigation {#navigation}

```css
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(240,235,226,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(43,37,32,0.08);
  padding: 16px 60px;
  display: flex; align-items: center;
}
.nav-back {
  font-size: 13px; font-weight: 600;
  color: var(--muted); letter-spacing: 0.04em;
  font-family: 'Barlow', sans-serif;
  transition: color 0.15s;
}
.nav-back:hover { color: var(--text); }
.nav-anchors {
  display: flex; align-items: center; gap: 0;
  margin-left: auto; overflow-x: auto; scrollbar-width: none;
}
.nav-anchors::-webkit-scrollbar { display: none; }
.nav-anchor {
  font-size: 11px; font-weight: 500; letter-spacing: 0.01em;
  color: var(--muted); padding: 4px 9px; border-radius: 6px;
  white-space: nowrap; font-family: 'IBM Plex Mono', monospace;
  transition: color 0.15s, background 0.15s;
}
.nav-anchor:hover { color: var(--text); }
.nav-anchor.active { color: var(--text); background: rgba(43,37,32,0.07); }
.nav-lang {
  margin-left: 20px; flex-shrink: 0;
  appearance: none; -webkit-appearance: none;
  background: transparent; border: 1px solid rgba(43,37,32,0.2);
  border-radius: 6px; padding: 3px 22px 3px 8px;
  font-size: 11px; font-weight: 600; font-family: 'Barlow', sans-serif;
  color: var(--muted); cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 6px center;
  transition: border-color 0.15s, color 0.15s;
}
.nav-lang:hover { border-color: rgba(43,37,32,0.45); color: var(--text); }
```

```html
<nav class="nav">
  <a class="nav-back" href="/#work">← Iris Hsieh</a>
  <div class="nav-anchors">
    <a class="nav-anchor" href="#intro" data-i18n="nav.intro">.Intro</a>
    <a class="nav-anchor" href="#s01" data-i18n="nav.s01">01.Achievement</a>
    <!-- ... more anchors ... -->
  </div>
  <select class="nav-lang" id="nav-lang-select">
    <option value="en">EN</option>
    <option value="ja">JA</option>
    <option value="zh-tw">繁</option>
    <option value="zh-cn">简</option>
  </select>
</nav>
```

## 5. Title Bar {#title-bar}

```css
.title-bar {
  width: 100%; background: var(--bg);
  padding: 28px 60px;
  display: flex; align-items: center; justify-content: center;
}
.title-bar-inner {
  width: 100%; max-width: 1400px;
  display: flex; flex-direction: column; gap: 12px;
}
```

```html
<div class="title-bar">
  <div class="title-bar-inner">
    <div class="title-main-heading" data-i18n="page.title"
         style="font-size:36px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;text-transform:uppercase;font-family:'Barlow',sans-serif;">
      {PROJECT TITLE}
    </div>
    <div data-i18n="page.subtitle"
         style="font-size:14px;font-weight:500;line-height:1.5;font-family:'Noto Sans',sans-serif;">
      {Subtitle}
    </div>
  </div>
</div>
```

## 6. Intro Split Card {#intro-card}

```css
.intro-card {
  width: 100%; border-radius: 20px; overflow: hidden;
  display: flex; align-items: stretch; min-height: 440px;
}
.intro-photo { flex: 1; position: relative; min-height: 320px; }
.intro-photo img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 35%;
}
.intro-copy {
  flex: 1; background: var(--bg-card);
  padding: 24px 40px;
  display: flex; flex-direction: column; gap: 16px;
  justify-content: center;
}
.intro-link {
  color: var(--text); text-decoration: none;
  font-size: 13px; font-family: 'IBM Plex Mono', monospace;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1px; transition: border-color 0.15s;
}
.intro-link:hover { border-color: var(--text); }
```

```html
<div id="intro" class="sec cream" style="padding-top:0;padding-bottom:48px;">
  <div class="sec-inner" style="max-width:100%;padding:0;">
    <div class="intro-card">
      <div class="intro-photo">
        <img src="/assets/{slug}/cover.png" alt="{alt text}" />
      </div>
      <div class="intro-copy">
        <div class="text-block">
          <p class="h3" data-i18n="intro.h3.product">Product overview</p>
          <p class="body" data-i18n="intro.product.body">{description}</p>
        </div>
        <div class="text-block">
          <p class="h3" data-i18n="intro.h3.role">My Role:</p>
          <p class="body" data-i18n="intro.role.body">{role description with <span class="stat-hi">metrics</span>}</p>
        </div>
        <div class="text-block">
          <p class="h3" data-i18n="intro.h3.time">Timeline</p>
          <p class="body">{year}</p>
        </div>
        <!-- optional website link -->
        <div class="text-block">
          <p class="h3" data-i18n="intro.h3.website">Website</p>
          <p class="body"><a href="{url}" target="_blank" rel="noopener" class="intro-link">{domain} ↗</a></p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 7. Section Wrapper {#section-wrapper}

```css
.sec {
  width: 100%; padding: 32px 60px;
  display: flex; flex-direction: column; align-items: center;
}
.sec.white { background: var(--bg-card); }
.sec.cream { background: var(--bg); }
.sec-inner {
  width: 100%; max-width: 1400px;
  display: flex; flex-direction: column; gap: 32px;
}
.sec-head {
  display: flex; gap: 28px; align-items: flex-start;
  font-size: 32px; font-weight: 800;
  font-family: 'Barlow', sans-serif; line-height: 1.1;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.sec-num { white-space: nowrap; flex-shrink: 0; }
.sec-title { flex: 1; }
```

```html
<div id="s01" class="sec white" style="padding-top:32px;padding-bottom:60px;">
  <div class="sec-inner">
    <div class="sec-head">
      <span class="sec-num">01.</span>
      <span class="sec-title" data-i18n="s01.title">Achievement</span>
    </div>
    <!-- section content -->
  </div>
</div>
```

## 8. Text Blocks & Lists {#text-blocks}

```html
<!-- Basic text block -->
<div class="text-block">
  <p class="h3" data-i18n="sXX.h3.label">LABEL</p>
  <p class="body" data-i18n="sXX.label.body">Body text here.</p>
</div>

<!-- Numbered list -->
<ol class="num-list">
  <li data-i18n="sXX.li1">First item with <span class="stat-hi">metric</span></li>
  <li data-i18n="sXX.li2">Second item</li>
</ol>

<!-- Bullet list -->
<ul class="bull-list">
  <li data-i18n="sXX.li1">Bullet item</li>
  <li data-i18n="sXX.li2">Bullet item</li>
</ul>
```

```css
.num-list { padding-left: 28px; display: flex; flex-direction: column; gap: 6px; }
.num-list li { font-size: 14px; font-weight: 500; line-height: 1.65; font-family: 'Noto Sans', sans-serif; }
.bull-list { padding-left: 28px; display: flex; flex-direction: column; gap: 4px; }
.bull-list li { font-size: 14px; line-height: 1.75; font-family: 'Noto Sans', sans-serif; }
```

## 9. Stat Highlights {#stat-highlights}

Yellow marker pen effect for key metrics:

```css
.stat-hi {
  background: #ffe033;
  padding: 0px 3px 1px; border-radius: 2px;
  font-weight: 700; color: #1a1208;
}
```

```html
<span class="stat-hi">38%</span>
```

## 10. Persona Table {#persona-table}

```css
.persona-wrap {
  background: var(--bg-card); border-radius: 10px;
  overflow: hidden; padding: 12px; width: 100%;
}
.ptable { width: 100%; border-collapse: collapse; }
.ptable .p-header-row td {
  padding: 12px; border-bottom: 1.5px solid var(--text); vertical-align: middle;
}
.ptable .p-header-row td:first-child { width: 113px; }
.p-persona-cell { display: flex; gap: 16px; align-items: center; }
.p-avatar { width: 48px; height: 56px; object-fit: cover; flex-shrink: 0; }
.p-role-label {
  font-size: 12px; font-weight: 400; line-height: 1.3;
  letter-spacing: 0.06em; text-transform: uppercase;
  font-family: 'IBM Plex Mono', monospace; color: var(--muted);
}
.p-name { font-size: 14px; font-weight: 500; line-height: 1.2; font-family: 'Noto Sans', sans-serif; }
.ptable .p-data-row td {
  padding: 12px; border-bottom: 1px solid var(--border);
  font-size: 13px; line-height: 1.3; vertical-align: top;
  font-family: 'Noto Sans', sans-serif;
}
.ptable .p-data-row td:first-child { width: 113px; color: var(--text); }
.ptable .p-data-row:last-child td { border-bottom: none; }
```

```html
<div class="persona-wrap">
  <table class="ptable">
    <tbody>
      <tr class="p-header-row">
        <td></td>
        <td>
          <div class="p-persona-cell">
            <img class="p-avatar" src="assets/{slug}/persona1.png" alt="Name" />
            <div>
              <div class="p-role-label" data-i18n="sXX.persona.role1">Role</div>
              <div class="p-name">Person Name</div>
            </div>
          </div>
        </td>
        <!-- more persona columns -->
      </tr>
      <tr class="p-data-row">
        <td data-i18n="sXX.ptable.row.label">Row Label</td>
        <td data-i18n="sXX.ptable.p1.value">Value</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 11. Key-Value Cards {#kv-cards}

```css
.ofs-kv {
  background: var(--bg); border-radius: 8px;
  padding: 10px 14px; margin-bottom: 14px;
  display: flex; flex-direction: column; gap: 5px;
}
.ofs-kv-row { display: flex; gap: 10px; font-size: 12px; }
.ofs-kv-key {
  font-family: 'IBM Plex Mono', monospace; font-size: 10px;
  color: var(--muted); min-width: 80px; padding-top: 1px; flex-shrink: 0;
}
.ofs-kv-val { color: var(--text); line-height: 1.5; }
```

```html
<div class="ofs-kv">
  <div class="ofs-kv-row">
    <span class="ofs-kv-key" data-i18n="key.label">Label</span>
    <span class="ofs-kv-val" data-i18n="key.value">Value</span>
  </div>
</div>
```

## 12. Pain Point Callouts {#pain-callouts}

```css
.ofs-pain {
  background: rgba(211,76,76,0.05);
  border-left: 3px solid rgba(211,76,76,0.4);
  border-radius: 0 6px 6px 0;
  padding: 8px 12px; margin-bottom: 8px;
  display: flex; flex-direction: column; gap: 4px;
}
.ofs-pain-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: rgba(170,55,55,0.75);
}
.ofs-pain p { font-size: 12px; color: var(--text); line-height: 1.55; }
```

```html
<div class="ofs-pain">
  <span class="ofs-pain-tag" data-i18n="sXX.painN.tag">Pain Point</span>
  <p data-i18n="sXX.painN.body">Description of the pain point.</p>
</div>
```

## 13. Preview Grids & Images {#preview-grids}

```css
.full-img { width: 100%; border-radius: 10px; object-fit: cover; }

.preview-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 26px; width: 100%;
}
.preview-grid img {
  width: 100%; object-fit: cover; border-radius: 4px;
  border: 2px solid var(--text);
}

.results-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
.results-img { width: 100%; height: 100%; border-radius: 20px; object-fit: cover; }
.results-copy { display: flex; flex-direction: column; gap: 12px; justify-content: center; }
```

## 14. Feature Blocks {#feature-blocks}

```css
.feature-title {
  font-size: 24px; font-weight: 800; line-height: 1.15;
  letter-spacing: -0.01em; text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}
.feature-block { display: flex; flex-direction: column; gap: 32px; }
```

```html
<div class="feature-block">
  <div class="feature-title" data-i18n="s05.feat1.title">Feature Name</div>
  <div class="text-block">
    <p class="body" data-i18n="s05.feat1.body">Description with <span class="stat-hi">metrics</span>.</p>
  </div>
  <img class="full-img" src="/assets/{slug}/feature1.png" alt="Feature screenshot" />
</div>
```

## 15. Results Row {#results-row}

```html
<div class="results-row">
  <img class="results-img" src="/assets/{slug}/results.png" alt="Results" />
  <div class="results-copy">
    <div class="text-block">
      <p class="body" data-i18n="s06.body1">Results text with <span class="stat-hi">metrics</span>.</p>
    </div>
    <div class="text-block">
      <p class="body" data-i18n="s06.body2">Reflection text.</p>
    </div>
  </div>
</div>
```

## 16. Vertical Story Spine {#story-spine}

Used for step-by-step flow walkthroughs (like the diagnosis section in rezio):

```css
.ofs-story { display: flex; flex-direction: column; }
.ofs-chapter { display: grid; grid-template-columns: 40px 1fr; gap: 0 20px; }
.ofs-spine { display: flex; flex-direction: column; align-items: center; }
.ofs-badge {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg); border: 1.5px solid var(--border);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px; font-weight: 600; color: var(--muted); z-index: 1;
}
.ofs-spine-line {
  width: 1.5px; flex: 1; min-height: 20px;
  background: var(--border); margin: 4px 0 0;
}
.ofs-body { padding-bottom: 36px; }
.ofs-chapter-title {
  font-size: 15px; font-weight: 700; color: var(--text);
  line-height: 1.3; padding-top: 6px; margin-bottom: 10px;
}
.ofs-chapter-story {
  font-size: 13px; color: var(--text); line-height: 1.7; margin-bottom: 12px;
}
```

```html
<div class="ofs-story">
  <div class="ofs-chapter">
    <div class="ofs-spine">
      <div class="ofs-badge">01</div>
      <div class="ofs-spine-line"></div>
    </div>
    <div class="ofs-body">
      <div class="ofs-chapter-title" data-i18n="sXX.step1.title">Step Title</div>
      <p class="ofs-chapter-story" data-i18n="sXX.story1">Description.</p>
      <!-- optional: kv card, screenshot, pain point -->
    </div>
  </div>
  <!-- more chapters... last chapter omits ofs-spine-line -->
</div>
```

## 17. Screenshot Placeholders {#screenshot-placeholders}

When a screenshot is expected but not yet available:

```css
.ofs-screenshot-placeholder {
  width: 100%; min-height: 200px; border-radius: 12px;
  border: 1.5px dashed var(--border); background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px;
}
.ofs-screenshot-icon { font-size: 28px; opacity: 0.3; }
.ofs-screenshot-label {
  font-family: 'IBM Plex Mono', monospace; font-size: 11px;
  color: var(--muted); letter-spacing: 0.04em;
}
```

For actual screenshots:
```css
.ofs-screenshot {
  width: 100%; margin-bottom: 14px;
  border-radius: 8px; overflow: hidden;
  border: 1px solid var(--border);
}
.ofs-screenshot img { width: 100%; display: block; }
```

## 18. Footer {#footer}

```css
.footer {
  background: var(--text); color: rgba(255,255,255,0.4);
  padding: 48px 60px 40px;
  display: flex; flex-direction: column; align-items: center; gap: 28px;
  font-size: 13px; letter-spacing: 0.04em;
  font-family: 'IBM Plex Mono', monospace;
}
.footer-back {
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.35);
  letter-spacing: 0.06em; font-family: 'IBM Plex Mono', monospace;
  transition: color 0.15s;
}
.footer-back:hover { color: rgba(255,255,255,0.7); }
.footer-contact { display: flex; align-items: center; gap: 0; flex-wrap: wrap; justify-content: center; }
.footer-item { display: flex; align-items: center; gap: 0; }
.footer-item a, .footer-item span {
  font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.45);
  letter-spacing: 0.02em; font-family: 'IBM Plex Mono', monospace;
  transition: color 0.15s; white-space: nowrap; padding: 0 14px;
}
.footer-item a:hover { color: rgba(255,255,255,0.9); }
.footer-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.12); flex-shrink: 0; }
```

```html
<footer class="footer">
  <a class="footer-back" href="/#work">← Back to portfolio</a>
  <div class="footer-contact">
    <div class="footer-sep"></div>
    <div class="footer-item"><a href="mailto:ralinzain@gmail.com">ralinzain@gmail.com</a></div>
    <div class="footer-sep"></div>
    <div class="footer-item"><a href="https://www.linkedin.com/in/ming-hsi-h-b59182158/" target="_blank" rel="noopener">LinkedIn</a></div>
    <div class="footer-sep"></div>
    <div class="footer-item"><a href="/Iris_Hsieh_CV.pdf" target="_blank">CV</a></div>
    <div class="footer-sep"></div>
  </div>
</footer>
```

## 19. i18n System {#i18n}

```javascript
// I18N data object — English is default in HTML
const I18N = {
  ja: {
    'nav.intro': '.イントロ',
    'nav.s01': '01.成果',
    'page.title': '{Japanese title}',
    // ... all data-i18n keys
  },
  'zh-tw': {
    'nav.intro': '.簡介',
    'nav.s01': '01.成果',
    'page.title': '{Traditional Chinese title}',
    // ...
  },
  'zh-cn': {
    'nav.intro': '.简介',
    'nav.s01': '01.成果',
    'page.title': '{Simplified Chinese title}',
    // ...
  },
};

function applyLang(lang) {
  const dict = I18N[lang] || {};
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  // Update html lang attribute for font switching
  const htmlLang = lang === 'zh-tw' ? 'zh-TW' : lang === 'zh-cn' ? 'zh-CN' : lang;
  document.documentElement.lang = htmlLang;
}

// Language switcher
const langSelect = document.getElementById('nav-lang-select');
if (langSelect) {
  // Restore from URL hash or localStorage
  const saved = localStorage.getItem('portfolio-lang');
  if (saved && I18N[saved]) {
    langSelect.value = saved;
    applyLang(saved);
  }
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    localStorage.setItem('portfolio-lang', lang);
    if (lang === 'en') location.reload();
    else applyLang(lang);
  });
}
```

## 20. Scroll-Reveal Animations {#animations}

Basic scroll-reveal pattern using IntersectionObserver:

```javascript
// Reveal elements on scroll
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
```

CSS for reveal:
```css
.reveal-on-scroll {
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-on-scroll.revealed {
  opacity: 1; transform: translateY(0);
}
```

## 21. Responsive Breakpoints {#responsive}

```css
@media (max-width: 900px) {
  .sec { padding: 28px 24px; }
  .title-bar { padding: 20px 24px; }
  .nav { padding: 14px 24px; }
  .footer { padding: 32px 24px; }
  .intro-card { flex-direction: column; }
  .intro-photo { height: 280px; position: relative; }
  .intro-photo img { position: absolute; }
  .split-row { flex-direction: column !important; }
  .results-row { grid-template-columns: 1fr; }
  .preview-grid { grid-template-columns: 1fr; }
  .sec-head { font-size: 22px; }
  .feature-title { font-size: 20px; }
}

@media (max-width: 640px) {
  .nav { padding: 12px 16px; }
  .nav-back { font-size: 11px; }
  .nav-anchor { font-size: 10px; padding: 3px 7px; }
  .title-bar { padding: 28px 20px 20px; }
  .sec { padding: 20px 20px; }
  .sec-head { font-size: 20px; }
  .title-main-heading { font-size: 22px !important; }
  .bubble-narrow-row { flex-direction: column; align-items: flex-end; gap: 8px; }
  .bubble-char { display: none; }
}
```

## 22. Nav Active-State JS {#nav-js}

Highlights current section in nav as user scrolls:

```javascript
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
```
