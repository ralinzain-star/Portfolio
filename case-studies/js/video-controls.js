/* ---------------------------------------------------------------------------
   Demo video controls
   Wraps every <video data-vc> in a positioned container and injects a
   play/pause toggle plus a restart button. The clips keep autoplay/loop/muted,
   so nothing changes until the reader touches a control.

   Button labels follow the page language, reading the same localStorage key
   and <select> the case studies already use. Labels live here rather than in
   the page I18N dict because they are aria-label/title attributes, and that
   dict only swaps innerHTML.
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var LABELS = {
    en:      { play: 'Play',   pause: 'Pause',     restart: 'Restart from the beginning' },
    ja:      { play: '再生',   pause: '一時停止',  restart: '最初から再生' },
    'zh-tw': { play: '播放',   pause: '暫停',      restart: '從頭播放' },
    'zh-cn': { play: '播放',   pause: '暂停',      restart: '从头播放' }
  };

  var ICON_PLAY    = '<svg class="vc-ico-play" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 2.8v10.4c0 .5.5.8 1 .6l8.2-5.2a.7.7 0 0 0 0-1.2L5.5 2.2a.7.7 0 0 0-1 .6z"/></svg>';
  var ICON_PAUSE   = '<svg class="vc-ico-pause" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="3.5" y="2.5" width="3.5" height="11" rx="1"/><rect x="9" y="2.5" width="3.5" height="11" rx="1"/></svg>';
  var ICON_RESTART = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 2.6a5.4 5.4 0 1 1-5.3 6.3.75.75 0 0 1 1.48-.25A3.9 3.9 0 1 0 8 4.1v1.36c0 .3-.34.46-.57.28L4.6 3.53a.35.35 0 0 1 0-.56L7.43.86c.23-.18.57-.02.57.28V2.6z"/></svg>';

  function currentLang() {
    var saved;
    try { saved = localStorage.getItem('portfolio-lang'); } catch (e) {}
    if (saved && LABELS[saved]) return saved;
    var sel = document.getElementById('nav-lang-select');
    if (sel && LABELS[sel.value]) return sel.value;
    return 'en';
  }

  var wraps = [];

  function label(el, text) {
    el.setAttribute('aria-label', text);
    el.setAttribute('title', text);
  }

  function relabel() {
    var L = LABELS[currentLang()] || LABELS.en;
    wraps.forEach(function (w) {
      label(w.toggle, w.video.paused ? L.play : L.pause);
      label(w.restart, L.restart);
    });
  }

  function button(cls, html) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'vc-btn ' + cls;
    b.innerHTML = html;
    return b;
  }

  function enhance(video) {
    if (video.dataset.vcReady) return;
    video.dataset.vcReady = '1';

    var wrap = document.createElement('div');
    wrap.className = 'vc-wrap';
    video.parentNode.insertBefore(wrap, video);
    wrap.appendChild(video);

    var bar = document.createElement('div');
    bar.className = 'vc-bar';

    var toggle  = button('vc-toggle', ICON_PLAY + ICON_PAUSE);
    var restart = button('vc-restart', ICON_RESTART);
    bar.appendChild(toggle);
    bar.appendChild(restart);
    wrap.appendChild(bar);

    var entry = { video: video, toggle: toggle, restart: restart };
    wraps.push(entry);

    function sync() {
      wrap.classList.toggle('is-playing', !video.paused);
      var L = LABELS[currentLang()] || LABELS.en;
      label(toggle, video.paused ? L.play : L.pause);
    }

    toggle.addEventListener('click', function () {
      if (video.paused) { video.play().catch(function () {}); }
      else { video.pause(); }
    });

    restart.addEventListener('click', function () {
      video.currentTime = 0;
      video.play().catch(function () {});
    });

    // Track the element, not our own clicks: autoplay may be blocked, and the
    // browser can pause on its own (background tab, data saver, reduced power).
    ['play', 'pause', 'ended'].forEach(function (ev) {
      video.addEventListener(ev, sync);
    });

    sync();
  }

  function init() {
    document.querySelectorAll('video[data-vc]').forEach(enhance);

    var sel = document.getElementById('nav-lang-select');
    if (sel) sel.addEventListener('change', relabel);
    relabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
