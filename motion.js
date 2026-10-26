/* Paige Robinson — motion layer. Vanilla, no dependencies. Load with <script src="motion/motion.js" defer>.
   Attributes: data-reveal[=fade|scale], data-delay (ms), data-stagger (ms, on a parent), data-title,
   data-parallax-root + data-depth, data-cursor. Honours prefers-reduced-motion and <html data-motion="full|subtle|off">.
   Content is never hidden by CSS until this script has run (html.pr-motion-ready). */
(function () {
  var html = document.documentElement;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  /* Full motion by default; a visitor's system reduced-motion setting is the only thing that turns it down. */
  try { localStorage.removeItem('pr-motion'); } catch (e) {}
  var mode = reduced ? 'off' : 'full';
  html.setAttribute('data-motion', mode);

  function revealAll() { document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-revealed'); }); }

  /* Reveals */
  var io = null;
  function prepare(el) {
    if (el.__pr) return; el.__pr = 1;
    var d = parseInt(el.getAttribute('data-delay') || '0', 10);
    var p = el.parentElement && el.parentElement.closest('[data-stagger]');
    if (p) {
      var step = parseInt(p.getAttribute('data-stagger') || '150', 10);
      var sibs = Array.prototype.filter.call(p.querySelectorAll('[data-reveal]'), function (n) { return n.closest('[data-stagger]') === p; });
      d += Math.min(sibs.indexOf(el), 8) * step;
    }
    if (d) el.style.setProperty('--reveal-delay', d + 'ms');
    if (io) io.observe(el); else el.classList.add('is-revealed');
  }
  function scan(root) { (root || document).querySelectorAll('[data-reveal]').forEach(prepare); }
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-revealed'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  /* Parallax */
  var roots = [];
  function collectParallax() { roots = Array.prototype.slice.call(document.querySelectorAll('[data-parallax-root]')); }
  var ticking = false;
  function parallax() {
    ticking = false;
    if (mode !== 'full' || reduced) { roots.forEach(function (r) { r.querySelectorAll('[data-depth]').forEach(function (l) { l.style.transform = ''; }); }); return; }
    var vh = window.innerHeight;
    roots.forEach(function (r) {
      var b = r.getBoundingClientRect();
      if (b.bottom < -100 || b.top > vh + 100) return;
      var off = (b.top + b.height / 2) - vh / 2;
      r.querySelectorAll('[data-depth]').forEach(function (l) {
        var depth = parseFloat(l.getAttribute('data-depth')) || 0.15;
        l.style.transform = 'translate3d(0,' + (off * -depth * 0.5).toFixed(1) + 'px,0)';
      });
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }

  /* Spotlight cursor (fine pointers only; no custom dot or ring) */
  function bindCursor(el) {
    if (el.__prc || !fine) return; el.__prc = 1;
    el.addEventListener('pointermove', function (e) {
      var b = el.getBoundingClientRect();
      el.style.setProperty('--cursor-x', (e.clientX - b.left) + 'px');
      el.style.setProperty('--cursor-y', (e.clientY - b.top) + 'px');
    });
    el.addEventListener('pointerenter', function () { el.classList.add('is-lit'); });
    el.addEventListener('pointerleave', function () { el.classList.remove('is-lit'); });
  }

  /* Grain + dissolve */
  function ensureLayers() {
    if (!document.querySelector('.pr-grain')) { var g = document.createElement('div'); g.className = 'pr-grain'; g.setAttribute('aria-hidden', 'true'); document.body.appendChild(g); }
    var d = document.querySelector('.pr-dissolve');
    if (!d) { d = document.createElement('div'); d.className = 'pr-dissolve'; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d); }
    return d;
  }
  function dissolveTo(href) {
    var d = ensureLayers();
    if (mode === 'off' || reduced) { location.href = href; return; }
    d.classList.add('is-active');
    setTimeout(function () { location.href = href; }, 600);
  }
  /* Browsers with cross-document view transitions get the CSS focus-pull in site.css instead;
     this dissolve is only the fallback for the rest. */
  var nativeVT = 'CSSViewTransitionRule' in window;
  document.addEventListener('click', function (e) {
    if (nativeVT) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash) || /^mailto:|^tel:/.test(a.getAttribute('href'))) return;
    e.preventDefault(); dissolveTo(url.href);
  });
  window.addEventListener('pageshow', function () {
    if (nativeVT) return;
    var d = ensureLayers(); d.classList.add('is-active');
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.remove('is-active'); }); });
  });

  function refresh() { scan(); collectParallax(); document.querySelectorAll('[data-cursor]').forEach(bindCursor); parallax(); }
  function set(m) {
    mode = m; html.setAttribute('data-motion', m);
    try { localStorage.setItem('pr-motion', m); } catch (e) {}
    if (m === 'off') revealAll();
    parallax();
  }

  function init() {
    ensureLayers();
    if (mode !== 'off') html.classList.add('pr-motion-ready'); else revealAll();
    refresh();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if ('MutationObserver' in window) {
      var pending = false;
      new MutationObserver(function () { if (pending) return; pending = true; requestAnimationFrame(function () { pending = false; refresh(); }); })
        .observe(document.body, { childList: true, subtree: true });
    }
    /* Safety net: anything still hidden after 4s is shown. */
    setTimeout(function () { document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(function (el) { var b = el.getBoundingClientRect(); if (b.top < innerHeight) el.classList.add('is-revealed'); }); }, 4000);
  }
  window.PRMotion = { set: set, refresh: refresh, dissolveTo: dissolveTo, get mode() { return mode; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
