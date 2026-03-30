---
name: portfolio-builder
description: "Generate a self-contained portfolio case study HTML page matching Iris Hsieh's design system architecture (warm editorial style with Barlow/Noto Sans/IBM Plex Mono, scroll-reveal animations, i18n support for EN/JA/zh-TW/zh-CN). Use this skill whenever the user shares project information, case study content, design work descriptions, UX research findings, or any material intended to become a portfolio page. Trigger on: 'build a case study', 'make a portfolio page', 'turn this into a case study', 'add this project to my portfolio', sharing project details/screenshots/metrics, or even casually describing a completed project. Also trigger when the user wants to update or modify an existing case study HTML page. If the user drops any project-related content and seems to want it captured as a portfolio piece, use this skill."
---

# Portfolio Case Study Builder

You generate self-contained HTML case study pages for Iris Hsieh's portfolio site at `/Users/harmony/Documents/GitHub/Portfolio/`. Each page is a single `.html` file with inline CSS and JS, following the exact design system established in `rezio.html`.

## Why This Skill Exists

Iris's portfolio pages share a distinctive visual language: warm cream/white palette, editorial typography (Barlow for headings, Noto Sans for body, IBM Plex Mono for labels), numbered sections with uppercase headings, scroll-reveal animations, and full i18n support. Building a new case study by hand means reproducing ~1300 lines of CSS, JS animation code, and i18n scaffolding every time. This skill encodes that architecture so new pages are structurally consistent while being content-unique.

## Your Job

1. **Collect project information** from whatever the user provides (text, screenshots, links, descriptions, research notes)
2. **Identify what's missing** and ask for it — don't guess at metrics, outcomes, or decisions
3. **Generate a complete HTML page** that fits the portfolio's design system
4. **Register the page** in `index.html` if the user wants

## Information You Need

Before generating, you need enough content to fill these sections. If the user hasn't provided something, ask for it explicitly. Group your questions — don't ask one at a time.

### Required (will ask if missing)

| Field | What it is | Example from rezio |
|-------|-----------|-------------------|
| **Project title** | Display name | "KKday Rezio SaaS Service" |
| **Subtitle** | One-line description | "Redesigning the OTA product listing experience" |
| **Company / Context** | Where this happened | "KKday Rezio" |
| **Timeline** | When | "2024–2025" |
| **Role** | What the user did | "Lead interaction designer" |
| **Role description** | 2-3 sentences on scope | "As the lead interaction designer, I redesigned..." |
| **Product overview** | What the product is | "KKday Rezio is a B2B booking platform..." |
| **Cover image** | Hero photo/screenshot | Path or URL |

### Strongly recommended (will prompt once)

| Field | What it is |
|-------|-----------|
| **Key metrics / outcomes** | Quantified results (e.g., "38% reduction in setup time") |
| **Problem statement** | What was broken and why |
| **Research findings** | User interviews, personas, journey maps, pain points |
| **Solution** | What was designed and why |
| **Process artifacts** | Screenshots, prototypes, diagrams, before/after |

### Optional (use if provided)

| Field | What it is |
|-------|-----------|
| **Team outcomes** | Process improvements, team-level wins |
| **Website link** | Live product URL |
| **Personas** | Named user archetypes with attributes |
| **User journey data** | Stages, emotions, actions per stage |
| **Pain points & opportunities** | Structured findings |
| **Feature breakdowns** | Individual feature descriptions with visuals |
| **Reflections** | What would be done differently |

## Generating the Page

Read `references/template-architecture.md` for the full HTML template, CSS design tokens, component library, JS patterns, and i18n structure. That file is your source of truth for markup patterns.

### Key Architecture Rules

1. **Self-contained HTML** — all CSS in `<style>`, all JS in `<script>`, no external CSS/JS files except Google Fonts
2. **Design tokens** — always use CSS custom properties:
   ```css
   --bg: #f0ebe2;  --bg-card: #fffefb;  --border: #dbd4c9;
   --text: #2b2520;  --muted: #8c8079;  --accent: (project-specific)
   ```
3. **Typography** — three font families, used consistently:
   - `'Barlow', sans-serif` — headings, section numbers, uppercase labels
   - `'Noto Sans', sans-serif` — body text, descriptions, list items
   - `'IBM Plex Mono', monospace` — captions, tags, metadata, labels
4. **i18n** — every user-facing text gets `data-i18n="key"` attribute. JS object at bottom provides translations for `ja`, `zh-tw`, `zh-cn`. English is the default in HTML.
5. **Section pattern** — each content section follows:
   ```html
   <div id="sXX" class="sec white|cream">
     <div class="sec-inner">
       <div class="sec-head">
         <span class="sec-num">0X.</span>
         <span class="sec-title" data-i18n="sXX.title">Title</span>
       </div>
       <!-- content -->
     </div>
   </div>
   ```
6. **Alternating backgrounds** — sections alternate between `white` (#fffefb) and `cream` (#f0ebe2)
7. **Nav anchors** — sticky nav with section links and language switcher
8. **Scroll-reveal animations** — use IntersectionObserver for progressive disclosure
9. **Responsive** — breakpoints at 900px and 640px
10. **Assets** — images go in `/assets/{project-slug}/`
11. **Footer** — dark footer with contact links (email, LinkedIn, CV)

### Section Structure (typical order)

1. **Nav** — sticky, with back link "← Iris Hsieh", section anchors, language selector
2. **Title Bar** — project title + subtitle
3. **Intro** — split card: cover image left, project overview + role + timeline right
4. **01. Achievement** — key metrics, product outcomes, team outcomes
5. **02. Context / Problem** — background, goal, what was broken
6. **03. Research** — personas, user journey map, pain points & opportunities
7. **04. Diagnosis / Analysis** — deep dive into specific problems, flow walkthroughs
8. **05. Solution** — feature showcases, before/after, prototypes
9. **06. Results** — outcomes revisited, reflections, what's next
10. **Footer** — contact info

Not every section is needed. Adapt based on what content exists. A project with no research phase skips section 03. A simpler project might have fewer sections.

### Component Library

The reference file documents these reusable components:
- **Intro split card** — photo + copy side by side
- **Text blocks** — h3 label + body paragraphs
- **Stat highlights** — `<span class="stat-hi">38%</span>` yellow marker
- **Numbered / bullet lists** — `.num-list`, `.bull-list`
- **Persona table** — avatar + role + attributes grid
- **User journey map** — animated SVG chart with dots, bubbles, stages
- **Pain point callouts** — red-bordered left cards
- **Feature blocks** — title + description + screenshot/video
- **Preview grids** — 2-column image grids
- **Results row** — image + copy side by side
- **Key-value cards** — `.ofs-kv` mini tables
- **Vertical story spine** — numbered chapters with connector lines
- **Accordion cards** — expandable sections

### i18n Implementation

```javascript
const I18N = {
  ja: { /* Japanese translations */ },
  'zh-tw': { /* Traditional Chinese */ },
  'zh-cn': { /* Simplified Chinese */ },
};
```

The language switcher in the nav triggers `applyLang()` which walks all `[data-i18n]` elements. English text lives directly in HTML as the default. When generating, include placeholder translations that the user can refine — use the project content to generate reasonable JA/zh-TW/zh-CN translations.

For CJK font support, include language-specific font rules:
```css
html[lang="ja"]    body { font-family: 'Noto Sans JP', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-TW"] body { font-family: 'Noto Sans TC', 'Noto Sans', 'Barlow', sans-serif; }
html[lang="zh-CN"] body { font-family: 'Noto Sans SC', 'Noto Sans', 'Barlow', sans-serif; }
```

## Workflow

### Step 1: Assess what you have

When the user shares project material, immediately inventory what you have against the Required/Recommended/Optional fields above. Don't start generating until you have at least the Required fields.

### Step 2: Ask for missing pieces

Be specific about what's missing. Group questions. For example:

> I have enough to start building the case study, but I'm missing a few things:
> 1. **Metrics** — do you have quantified outcomes? (e.g., task time reduction, satisfaction scores, support ticket changes)
> 2. **Cover image** — do you have a hero image or screenshot for the intro card?
> 3. **Process artifacts** — any screenshots, prototypes, or diagrams I should include?

### Step 3: Generate

1. Create the assets directory: `/assets/{project-slug}/`
2. Generate the HTML file at `/{project-slug}.html`
3. Include all CSS inline, all JS inline
4. Generate i18n translations for JA, zh-TW, zh-CN
5. Use placeholder images with clear `alt` text where screenshots are expected but not yet provided — use the dashed-border placeholder pattern:
   ```html
   <div class="ofs-screenshot-placeholder">
     <div class="ofs-screenshot-icon">📸</div>
     <div class="ofs-screenshot-label">screenshot: [description]</div>
   </div>
   ```

### Step 4: Register in index.html (if requested)

Add a work card to the grid in `index.html`:
```html
<a class="wcard" href="/{slug}.html" style="text-decoration:none;color:inherit;display:flex;flex-direction:column;cursor:pointer;">
  <div class="wthumb" style="padding:0">
    <img src="/assets/{slug}/cover.png" alt="..." style="width:100%;height:100%;object-fit:cover;display:block;">
  </div>
  <div class="wbody">
    <div class="wco" data-i18n="wcardN.co">Company · Year</div>
    <div class="wtitle" data-i18n="wcardN.title">Project Title</div>
    <div class="wdesc" data-i18n="wcardN.desc">One-line description.</div>
    <div class="wtags"><span class="tag">Tag1</span><span class="tag">Tag2</span></div>
  </div>
</a>
```

## Adaptation Principles

- **Match the editorial tone** — Iris's case studies read like thoughtful design narratives, not feature lists. Lead with the problem, show the thinking, present the solution.
- **Use data to anchor claims** — highlight metrics with `.stat-hi` spans. Don't fabricate numbers.
- **Progressive complexity** — start with outcomes, then context, then deep dive. The reader should be able to stop at any section and have gotten value.
- **Visual rhythm** — alternate cream/white backgrounds, mix text blocks with visual components (tables, charts, grids). Don't have three text-only sections in a row.
- **Respect what's missing** — use placeholders rather than inventing content. Missing screenshots get placeholder slots. Missing metrics don't get mentioned.

## Existing Pages for Reference

If you need to check exact patterns, read these files:
- `/Users/harmony/Documents/GitHub/Portfolio/rezio.html` — most complete example (~3360 lines)
- `/Users/harmony/Documents/GitHub/Portfolio/notification.html` — simpler example (~656 lines)
- `/Users/harmony/Documents/GitHub/Portfolio/lsbg.html` — another example (~730 lines)
- `/Users/harmony/Documents/GitHub/Portfolio/index.html` — homepage with work card grid
