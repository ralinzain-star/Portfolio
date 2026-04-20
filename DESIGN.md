# Portfolio Design System

Canonical spec for Iris Hsieh's portfolio. All case study HTML files at the
repo root follow this system. CSS lives inline in each file; only `index.html`
shares `style.css`.

Last aligned: 2026-04-21

---

## 1. Color palette

```css
:root {
  --bg:       #f0ebe2;   /* page background — warm cream */
  --bg-card:  #fffefb;   /* "white" sections */
  --border:   #dbd4c9;   /* dividers + tag/badge borders */
  --text:     #2b2520;   /* primary text */
  --muted:    #8c8079;   /* secondary text, tag labels, eyebrows */
  --accent:   #005abe;   /* project-specific blue — varies per case study */
}
```

Only `--accent` changes per case study (pick one blue matching the project's
brand). Everything else stays constant across the portfolio.

### Highlight colors (hard-coded, NOT variables)

```css
.stat-hi      { background: #ffe033; color: var(--text); }   /* primary win */
.stat-hi-blue { background: #d6e4ff; color: #003b87;  }      /* surprise finding */
```

- Yellow (`.stat-hi`) — primary quantifiable wins inline in prose
- Blue (`.stat-hi-blue`) — secondary / surprising findings; max 1–2 per section
- Both padded `0 4px`, `border-radius: 3px`, `font-weight: 600`

---

## 2. Typography — 5-tier scale

| Tier | Size | Weight | Family | Case / Tracking | Line-height |
|------|------|--------|--------|-----------------|-------------|
| **T1 Display** | 40px | 800 | Barlow | UPPERCASE, -0.02em | 1.05 |
| **T2 Heading** | 24px | 800 | Barlow | UPPERCASE, -0.02em | 1.15 |
| **T3 Subhead** | 18px | 700 | Barlow | normal, -0.01em    | 1.3  |
| **T4 Body**    | 14px | 400 | Noto Sans | normal           | 1.75 |
| **T5 Small / eyebrow / tag** | 11px | 700 Barlow OR 500 Plex Mono | see below | UPPERCASE +0.1em (Barlow) / +0.04em (Mono) | 1.4 |

### Mobile scaling (≤900px)

- T1 → 28px
- T2 → 20px
- T3–T5 stay the same

### Class → tier mapping

**T1 (40px)**
- `.title-main-heading`, `.title-big`, any title-bar inline page title
- `.metric-li-value` (big stat numbers like `6–8`, `16`)
- `.island-title` is an exception — stays at 72px (landscape hero only)
- `.intro-headline` stays at `clamp(36px, 4vw, 52px)` responsive

**T2 (24px)**
- `.sec-num` + `.sec-title` (the `01. Background` section heads)

**T3 (18px)**
- `.ofs-chapter-title`
- `.achieve-title`
- `.wf-step-head`
- `.label-lg`
- `.principle-title`
- `.wtitle` (work card title on index)

**T4 (14px)**
- `.body`, `.body-sm`, `.lede`
- `.metric-li-note`
- `.ofs-chapter-story`
- `.wdesc` (work card description)
- `.bull-list li`, `.num-list li`, `.ord-list li`

**T5 (11px)** — two family variants by role:

Barlow UPPERCASE eyebrow (+0.1em):
- `.h3`
- `.metric-li-label`
- `.metric-li-unit`

Plex Mono label (+0.04em):
- `.tag`
- `.step-kv-val`
- `.caption`
- `.pill` (at 11px when possible)

### Documented exceptions

- **`.step-kv-key`** — 9px Plex Mono UPPERCASE 0.12em. Tight-pill readability
  override. Do not bump to 11.
- **`.island-title`** — 72px, landscape canvas intro only.
- **`.intro-headline`** — clamp responsive hero.
- **`.skill-arch-*`** internal sizes (10–12px) — dense architecture card, kept
  compact intentionally.

### Language font stack

```css
html, body       { font-family: 'Noto Sans', 'Barlow', sans-serif; }
html[lang="ja"]    body { font-family: 'Noto Sans JP', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-TW"] body { font-family: 'Noto Sans TC', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-CN"] body { font-family: 'Noto Sans SC', 'Noto Sans', 'Barlow', sans-serif; }
```

---

## 3. Badge (numbered circle/square)

All numbered badges across the portfolio use a unified **yellow rounded
square**:

```css
{
  width: 32px; height: 32px; flex-shrink: 0;
  background: #f8d08c; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; font-family: 'Barlow', sans-serif;
  color: var(--text);
}
```

Applies to: `.ofs-badge`, `.num-badge`, `.step-num`. Don't introduce new badge
classes — reuse one of these names.

No `.accent` variant anymore — the amber color is already the highlight.

---

## 4. Tag / pill

### `.tag` — content classification chip (tight)

```css
.tag {
  font-size: 11px; font-weight: 500;
  color: var(--muted);
  background: #fff;
  border: 1px solid var(--border);
  padding: 2px 8px; border-radius: 9999px;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.04em;
  line-height: 1.4;
}
```

### `.step-kv-cell` — inline tag with key/value (case study steps)

Same visual as `.tag` but with two-tone content: uppercase key + muted value.

```css
.step-kv-cell {
  display: inline-flex; align-items: baseline; gap: 6px;
  background: #fff; border: 1px solid var(--border);
  border-radius: 9999px; padding: 2px 10px;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.04em;
}
.step-kv-key { font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; }
.step-kv-val { font-size: 11px; color: var(--muted); }
```

### `.pill` — CTA button pill (looser)

```css
.pill {
  font-size: 11px; font-weight: 600;
  font-family: 'Barlow', sans-serif;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 7px 18px; border-radius: 9999px;
  border: 1px solid var(--border);
  background: #fff; color: var(--text);
}
.pill:hover { background: var(--text); color: #fff; }
```

---

## 5. Section rhythm

### Background alternation

Intro is always cream. First content section is white. Alternate strictly:

```
intro    (cream)
sNN-1    (white)
sNN-2    (cream)
sNN-3    (white)
…
```

### Padding (vertical rhythm)

Write inline on each section's style attribute:

| Position | padding-top | padding-bottom |
|---|---|---|
| Intro (always first) | 0 | 48px |
| First content section | 32px | 60px |
| Middle sections | 32px | 32px |
| Last content section | 32px | 60px |

### Display numbering

- `.sec-num` always has the trailing period: `01.` not `01`.
- `id="sNN"` stays stable (don't renumber IDs when reordering — external links
  would break). Only the visible `.sec-num` and nav label text change.

---

## 6. Reveal animation (disabled by default)

The `.reveal-on-scroll` IntersectionObserver pattern is kept in some files for
backwards compat, but content should be visible by default:

```css
.reveal-on-scroll          { opacity: 1; transform: none; }
.reveal-on-scroll.revealed { opacity: 1; transform: none; }
```

If you re-enable fade-in per-file, the canonical opacity+translateY(16px) +
0.6s transition pattern is fine — but ask before adding motion back.

---

## 7. Component patterns

### Section head

```html
<div class="sec-head">
  <span class="sec-num">01.</span>
  <span class="sec-title" data-i18n="s01.title">Section Title</span>
</div>
```

### Lede paragraph (T4 body size)

```html
<p class="body" data-i18n="s01.lede">One opening sentence that sets the scene.</p>
```

### Numbered list (num-list pattern)

```html
<div class="num-list">
  <div class="num-row">
    <div class="num-badge">1</div>
    <div class="num-copy">
      <p class="h3" data-i18n="...">Label (T5 eyebrow)</p>
      <p class="body" data-i18n="...">Finding (T4).</p>
    </div>
  </div>
</div>
```

### Step list (step-list pattern — used in reflection-style sections)

```html
<div class="step-list">
  <div class="step-row">
    <div class="step-num">1</div>
    <div class="step-copy">
      <p class="h3" data-i18n="...">Title (T3 subhead, 18px)</p>
      <p class="body" data-i18n="...">Body (T4).</p>
    </div>
  </div>
</div>
```

### Metric list (stacked data rows)

```html
<ul class="metric-list">
  <li class="metric-li">
    <div class="metric-li-head">
      <span class="metric-li-value">6–8<span class="metric-li-unit">FTE</span></span>
      <span class="metric-li-label" data-i18n="...">Label (T5 eyebrow)</span>
    </div>
    <p class="metric-li-note" data-i18n="...">Context paragraph (T4).</p>
  </li>
</ul>
```

### OFS chapter (11-step pipeline pattern)

```html
<div class="ofs-chapter">
  <div class="ofs-spine">
    <div class="ofs-badge">00</div>
    <div class="ofs-spine-line"></div>
  </div>
  <div class="ofs-body">
    <div class="ofs-chapter-title" data-i18n="...">Step title (T3)</div>
    <div class="step-kv"> ...inline key/value tags... </div>
    <p class="ofs-chapter-story" data-i18n="...">Prose (T4).</p>
    <div class="skill-arch" data-i18n="...">...optional architecture card...</div>
    <div class="step-media"><img ... /></div>
  </div>
</div>
```

Last chapter's spine line auto-hidden:
```css
.ofs-chapter:last-child .ofs-spine-line { display: none; }
```

---

## 8. i18n

### Required languages

Every case study must cover `ja` + `zh-tw` + `zh-cn` in its I18N dict. English
is the HTML default (no `en` dict needed — HTML fallback serves).

### Key naming

- `nav.back`, `nav.intro`, `nav.s01`…`nav.sNN`
- `page.title`, `page.subtitle`
- `intro.label.*`, `intro.*.body`
- `sNN.title`, `sNN.lede`
- `sNN.itemK.label` / `sNN.itemK.body` for numbered lists
- `sNN.q.*` / `sNN.p.*` for two-col blocks

### Nav display format

`NN.ShortWord` — IBM Plex Mono 11px uppercase; keep labels compact:
`01.Archaeology`, not `01. The Archaeology of an API`.

### Nav back link

Always literally `← Iris Hsieh` in every language. Arrow stays in the string.

### Vocabulary rules per locale (from `ux-writing-translator` skill)

**Japanese (ja-JP)** — polite です/ます form throughout. Product standards:
- Cancel → `キャンセル` (NOT 取り消し)
- Sign in → `ログイン` (NOT サインイン)
- Error → `エラーが発生しました` (NOT 失敗しました, which blames user)
- Settings → `設定`. Save → `保存`. Delete → `削除`.

**Traditional Chinese (zh-TW)** — Taiwan standard:
- `登入` / `註冊` / `檔案` / `設定` / `儲存` / `帳戶` / `免費`
- Components: `元件` / `變體` / `狀態` (NOT 组件/变体/状态)
- Use `您` in formal/transactional contexts; `你` OK in marketing

**Simplified Chinese (zh-CN)** — Mainland standard:
- `登录` / `注册` / `文件` / `设置` / `保存` / `账户` / `免费`
- Components: `组件` / `变体` / `状态` (NOT 元件/變體/狀態)

### Punctuation

- Use full-width 「：」(not `:`) for label colons in CJK
- Use `，` / `、` (full-width) not `,` in CJK prose
- Avoid double em dash `——` in prose — prefer `、` / `，` / `()` / `:` based on context

---

## 9. Nav structure (every case study)

```html
<nav class="nav">
  <a class="nav-back" href="/#work" data-i18n="nav.back">← Iris Hsieh</a>
  <div class="nav-anchors">
    <a class="nav-anchor" href="#intro" data-i18n="nav.intro">.Intro</a>
    <a class="nav-anchor" href="#s01"   data-i18n="nav.s01">01.{LABEL}</a>
    <!-- one per section -->
  </div>
  <select class="nav-lang" id="nav-lang-select">
    <option value="en">EN</option>
    <option value="ja">JA</option>
    <option value="zh-tw">繁</option>
    <option value="zh-cn">简</option>
  </select>
</nav>
```

Language chip labels (`EN` / `JA` / `繁` / `简`) are literal — not translated.

---

## 10. Asset conventions

```
assets/
  <case-study-slug>/
    hero.png               # intro card image
    <feature>-detail.png   # close-ups
    Illustration.png       # brand / mascot panel (designing-with-ai)
```

- Slug matches the HTML filename (`wren-agent.html` ↔ `assets/wren-agent/`).
- Image alt text is specific: `alt="Wren AI mascot — three brand scenes"`.
- Media inside step rows uses `.step-media { margin-top: 8px; border-radius: 10px; border: 1px solid var(--border); }`.

---

## 11. Footer

Shared footer pattern — NOT internationalized:

```html
<footer class="footer">
  <!-- WeChat · Instagram · LinkedIn · WhatsApp · Email -->
</footer>
```

Labels stay in English across all language settings.

---

## 12. Editing checklist

When adding/editing a case study, walk through:

1. **Structure** — HTML section blocks, nav anchors, sec-num display all in sync
2. **Padding rhythm** — first/last `32/60`, intro `0/48`, middle `32/32`
3. **Color alternation** — cream / white strictly alternating from intro
4. **Typography** — every text class maps to a T1–T5 tier from §2
5. **Badge** — all numbered chips use the unified yellow square (§3)
6. **Tag** — white + muted text + Plex Mono 11px (§4)
7. **i18n** — every new `data-i18n` key exists in ja + zh-tw + zh-cn
8. **Reveal** — disabled by default; don't re-enable without reason (§6)
9. **Stat spans** — yellow for wins, blue for surprises, sparingly
10. **Verify** — preview in browser, switch through all 4 languages, watch console

---

## 13. What NOT to do

- **Don't** create new typography tiers outside T1–T5. If a string needs a
  different size, it belongs in an existing tier — check which one.
- **Don't** introduce new highlight colors. Yellow and blue are enough.
- **Don't** renumber section IDs (breaks external links). Only display numbers.
- **Don't** add the gold/accent left-border callout block (user preference —
  use plain body + inline stat-hi for emphasis).
- **Don't** add reveal-on-scroll motion unless asked — content should be
  immediately visible.
- **Don't** use half-width `:` or `,` in CJK prose — use full-width `：`, `，`,
  `、`.
- **Don't** use `——` double em dash in prose. Prefer `、` / `，` / `()` / `:`.
- **Don't** internationalize footer labels.
- **Don't** commit `.DS_Store` files in asset folders.
