/**
 * Re-capture m-map.png and m-retro.png with Leaflet tiles fully loaded.
 * Waits for actual tile image requests to complete.
 */
const { chromium } = require('/Users/harmony/Documents/GitHub/busan-fukuoka/node_modules/playwright');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'assets/trip-planner/showcase');
const VIEWPORT = { width: 390, height: 844 };
const DSF = 2;

function dateOverrideScript(isoTime) {
  return `
    (function(){
      const fakeNow = new Date('${isoTime}').getTime();
      const RealDate = Date;
      function FakeDate(...args) {
        if (args.length === 0) return new RealDate(fakeNow);
        return new RealDate(...args);
      }
      FakeDate.now = () => fakeNow;
      FakeDate.parse = RealDate.parse;
      FakeDate.UTC = RealDate.UTC;
      FakeDate.prototype = RealDate.prototype;
      Object.setPrototypeOf(FakeDate, RealDate);
      window.Date = FakeDate;
    })();
  `;
}

async function waitForLeafletTiles(page) {
  // Wait for leaflet-tile-loaded class on all tile images
  await page.waitForFunction(() => {
    const tiles = document.querySelectorAll('.leaflet-tile');
    if (tiles.length === 0) return false;
    return [...tiles].every(t => t.classList.contains('leaflet-tile-loaded') && t.complete !== false);
  }, { timeout: 15000 }).catch(() => console.warn('  ⚠ tile wait timed out, continuing'));
  await page.waitForTimeout(1200); // extra buffer for render
}

async function triggerLeafletResize(page) {
  await page.evaluate(() => {
    window.dispatchEvent(new Event('resize'));
    // Try to invalidateSize on all leaflet maps via their global
    if (typeof L !== 'undefined') {
      document.querySelectorAll('.leaflet-container').forEach(container => {
        // Walk L._leaflet maps registry — fallback: find map via stored _leaflet_map
        for (const key in container) {
          if (key.startsWith('_leaflet') && container[key]?.invalidateSize) {
            container[key].invalidateSize();
          }
        }
      });
    }
  });
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch();

  try {
    // ── m-map.png ──
    console.log('▶ m-map.png');
    {
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: DSF });
      const page = await context.newPage();
      await page.addInitScript(dateOverrideScript('2026-04-03T13:45:00+09:00'));
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

      // Dismiss splash
      await page.evaluate(() => {
        const c = document.getElementById('cover');
        if (c) { c.style.display = 'none'; c.classList.add('cover-hidden'); }
      });
      // Dismiss overlay
      await page.evaluate(() => {
        const ov = document.getElementById('today-overlay');
        if (ov) { ov.classList.add('hidden'); ov.style.display = 'none'; }
        document.body.classList.remove('overlay-open');
      });
      await page.waitForTimeout(300);

      // Switch to time tab (POI map)
      await page.evaluate(() => {
        const btns = document.querySelectorAll('button[data-tab="time"]');
        if (btns.length) btns[btns.length - 1].click();
      });
      await page.waitForTimeout(1000);

      await triggerLeafletResize(page);
      await waitForLeafletTiles(page);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const out = path.join(OUT_DIR, 'm-map.png');
      await page.screenshot({ path: out });
      console.log('  ✓', out);
      await context.close();
    }

    // ── m-retro.png ──
    console.log('▶ m-retro.png');
    {
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: DSF });
      const page = await context.newPage();
      await page.addInitScript(dateOverrideScript('2026-04-15T10:00:00+09:00'));
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

      await page.evaluate(() => {
        const c = document.getElementById('cover');
        if (c) { c.style.display = 'none'; c.classList.add('cover-hidden'); }
        const ov = document.getElementById('today-overlay');
        if (ov) { ov.classList.add('hidden'); ov.style.display = 'none'; }
        document.body.classList.remove('overlay-open');
      });
      await page.waitForTimeout(300);

      await page.evaluate(() => {
        const btns = document.querySelectorAll('button[data-tab="retro"]');
        if (btns.length) btns[btns.length - 1].click();
      });
      await page.waitForTimeout(1500);

      await triggerLeafletResize(page);
      await waitForLeafletTiles(page);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const out = path.join(OUT_DIR, 'm-retro.png');
      await page.screenshot({ path: out });
      console.log('  ✓', out);
      await context.close();
    }

    console.log('\n✅ Done.');
  } finally {
    await browser.close();
  }
})();
