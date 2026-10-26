/* Paige Robinson — site behaviour. Vanilla, no dependencies. Works alongside motion.js.
   Renders content from data.json into [data-render] hosts, and wires the menu, motion switch,
   hover photo, credit filter, lightbox and contact form. Static markup stays usable without it. */
(function () {
  var html = document.documentElement;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ───── Templates ───── */
  var T = {
    recent: function (d) {
      return d.recent.map(function (r) {
        return '<li class="pr-recent__line pr-line" data-reveal' + (r.photo ? ' data-photo="' + esc(r.photo) + '" data-caption="' + esc(r.production + ' · ' + r.year) + '"' : '') + '>' +
          '<span class="pr-recent__text"><span class="pr-recent__role">' + esc(r.role) + '</span>' +
          '<cite class="pr-recent__prod">' + esc(r.production) + '</cite>' +
          '<span class="pr-recent__co">' + esc(r.company) + '</span></span>' +
          '<span class="pr-recent__year">' + esc(r.year) + '</span></li>';
      }).join('');
    },
    credits: function (d) {
      return d.credits.map(function (y) {
        return '<section class="pr-year" aria-label="' + esc(y.year) + '">' +
          '<span class="pr-year__num" aria-hidden="true">' + esc(y.year) + '</span>' +
          '<ul class="pr-year__lines" data-stagger="150">' + y.roles.map(function (r) {
            var kind = r.kind === 'mt' ? 'Musical Theatre' : 'Opera';
            return '<li class="pr-credit pr-line" data-reveal data-kind="' + esc(r.kind) + '"' + (r.photo ? ' data-photo="' + esc(r.photo) + '" data-caption="' + esc(r.production + ' · ' + y.year) + '"' : '') + '>' +
              '<span class="pr-credit__role">' + esc(r.role) + '</span>' +
              '<span class="pr-credit__meta"><cite class="pr-credit__prod">' + esc(r.production) + '</cite>' +
              '<span class="pr-credit__co">' + esc(r.company) + '</span>' +
              '<span class="pr-credit__kind">' + kind + '</span></span></li>';
          }).join('') + '</ul></section>';
      }).join('');
    },
    plain: function (title, items, quiet) {
      return '<section class="pr-plain' + (quiet ? ' pr-plain--quiet pr-plain--stacked' : '') + '" data-reveal>' +
        '<h3 class="pr-plain__title">' + esc(title) + '</h3><ul class="pr-plain__list">' +
        items.map(function (it) {
          return '<li class="pr-plain__item"><span><span class="pr-plain__text">' + esc(it.text) + '</span>' +
            (it.detail ? '<span class="pr-plain__detail">' + esc(it.detail) + '</span>' : '') + '</span>' +
            (it.meta ? '<span class="pr-plain__meta">' + esc(it.meta) + '</span>' : '') + '</li>';
        }).join('') + '</ul></section>';
    },
    lists: function (d) {
      return T.plain('Competitions', d.competitions.map(function (c) { return { text: c.text, detail: c.detail }; })) +
        T.plain('Scholarships and Awards', d.awards) + T.plain('Programs', d.programs);
    },
    about: function (d) { return T.plain('Education', d.education, true) + T.plain('Skills', d.skills, true); },
    personae: function (d) {
      return '<div class="pr-personae" data-stagger="150">' + d.personae.map(function (g) {
        return '<div class="pr-personae__group" data-reveal><span class="pr-personae__label">' + esc(g.label) + '</span>' +
          '<span class="pr-personae__rule"></span><ul class="pr-personae__names">' + g.names.map(function (n) {
            var name = typeof n === 'string' ? n : n.name, note = typeof n === 'string' ? '' : n.note;
            return '<li class="pr-personae__name">' + esc(name) + (note ? '<span class="pr-personae__note">' + esc(note) + '</span>' : '') + '</li>';
          }).join('') + '</ul></div>';
      }).join('') + '</div>';
    },
    stills: function (d) {
      var n = d.stills.length;
      return d.stills.map(function (s, i) {
        var label = s.production + (s.year ? ', ' + s.year : '');
        return '<figure class="pr-still pr-still--' + esc(s.align) + '" style="width:' + esc(s.width) + '" data-reveal>' +
          '<button type="button" class="pr-still__media pr-still__media--button" data-cursor data-cursor-label="View" data-parallax-root data-still="' + i + '" aria-label="Open still ' + (i + 1) + ' of ' + n + ': ' + esc(label) + '">' +
          '<span class="pr-still__layer" data-depth=".18"><img class="pr-still__img" src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" style="object-position:' + esc(s.focal) + '" loading="' + (i < 2 ? 'eager' : 'lazy') + '" decoding="async"></span>' +
          '<span class="pr-still__vignette"></span><span class="pr-spot"></span></button>' +
          '<figcaption class="pr-still__cap"><cite class="pr-still__cap-prod">' + esc(s.production) + '</cite>' +
          (s.year ? '<span class="pr-still__cap-year">' + esc(s.year) + '</span>' : '') +
          '<span class="pr-still__cap-idx">' + pad(i + 1) + ' / ' + pad(n) + '</span></figcaption></figure>';
      }).join('');
    },
    audio: function (d) {
      var roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];
      return d.audio.map(function (a, i) {
        return '<li><button type="button" class="pr-audio__btn" disabled aria-label="' + esc(a.title) + ', not yet available">' +
          '<span class="pr-audio__num">' + roman[i] + '</span><span class="pr-audio__mark" aria-hidden="true"><span class="pr-audio__tri"></span></span>' +
          '<span><span class="pr-audio__title">' + esc(a.title) + '</span><span class="pr-audio__detail">' + esc(a.detail) + '</span></span>' +
          '<span class="pr-audio__len">—</span></button></li>';
      }).join('');
    },
    /* Season: upcoming dates grouped by month; placeholders until real dates are added to data.json */
    season: function (d) {
      var s = splitSeason(d);
      if (!s.all.length) return '<p class="season__month">Placeholder · Season</p>' + gigPlaceholder() + gigPlaceholder();
      if (!s.upcoming.length) return '<div class="site-note" role="note"><p class="site-note__text">Further dates to be announced.</p></div>';
      return byMonth(s.upcoming);
    },
    seasonPast: function (d) { return byMonth(splitSeason(d).past); },
    next: function (d) { var u = splitSeason(d).upcoming; return u.length ? gig(u[0]) : ''; }
  };

  /* ───── Season helpers ───── */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var gigs = []; /* every rendered engagement, so "Add to calendar" can find it by index */
  function day(g) { var p = String(g.date).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function splitSeason(d) {
    var all = (d.season || []).filter(function (g) { return g && g.date && g.title; }).slice().sort(function (a, b) { return day(a) - day(b); });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return { all: all, upcoming: all.filter(function (g) { return day(g) >= today; }), past: all.filter(function (g) { return day(g) < today; }).reverse() };
  }
  function clock(t) {
    if (!t) return '';
    var p = t.split(':'), h = +p[0], m = p[1] || '00';
    return (h % 12 || 12) + (m === '00' ? '' : ':' + m) + (h < 12 ? ' am' : ' pm');
  }
  function byMonth(list) {
    var out = '', last = '';
    list.forEach(function (g) {
      var dt = day(g), key = MONTH[dt.getMonth()] + ' ' + dt.getFullYear();
      if (key !== last) { out += '<h3 class="season__month">' + key + '</h3>'; last = key; }
      out += gig(g);
    });
    return out;
  }
  function gig(g) {
    var dt = day(g), i = gigs.push(g) - 1;
    var where = [g.venue, g.city].filter(Boolean).map(esc).join(' · ');
    return '<article class="gig" data-reveal>' +
      '<div class="gig__date"><span class="gig__day">' + dt.getDate() + '</span><span class="gig__mon">' + MON[dt.getMonth()] + ' · ' + DOW[dt.getDay()] + '</span></div>' +
      '<div class="gig__main"><cite class="gig__title">' + esc(g.title) + '</cite>' +
        (g.role ? '<span class="gig__role">' + esc(g.role) + '</span>' : '') +
        (g.company ? '<span class="gig__co">' + esc(g.company) + '</span>' : '') + '</div>' +
      '<div class="gig__where">' + (where ? '<span>' + where + '</span>' : '') + (g.time ? '<span class="gig__time">' + clock(g.time) + '</span>' : '') +
        (g.note ? '<span class="gig__note">' + esc(g.note) + '</span>' : '') + '</div>' +
      '<div class="gig__acts">' + (g.link ? '<a class="pr-btn pr-btn--text" href="' + esc(g.link) + '" target="_blank" rel="noopener">Details</a>' : '') +
        '<button type="button" class="pr-btn pr-btn--text" data-ics="' + i + '">Add to calendar</button></div></article>';
  }
  function gigPlaceholder() {
    return '<article class="gig gig--placeholder" role="note">' +
      '<div class="gig__date"><span class="gig__day">—</span><span class="gig__mon">Date</span></div>' +
      '<div class="gig__main"><span class="site-note__kind">Placeholder · Performance</span><cite class="gig__title">Production to be supplied</cite><span class="gig__role">Role · Company</span></div>' +
      '<div class="gig__where"><span>Venue · City</span><span class="gig__time">Time</span></div><div class="gig__acts"></div></article>';
  }
  /* "Add to calendar": builds a small .ics file Apple, Google and Outlook calendars all accept */
  function ics(g) {
    function e(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/[,;]/g, '\\$&').replace(/\n/g, '\\n'); }
    function two(n) { return (n < 10 ? '0' : '') + n; }
    var dt = day(g), ymd = dt.getFullYear() + two(dt.getMonth() + 1) + two(dt.getDate()), start, end;
    if (g.time) {
      var p = g.time.split(':'), s = new Date(dt); s.setHours(+p[0], +(p[1] || 0)); var f = new Date(s.getTime() + 150 * 60000);
      var stamp = function (x) { return x.getFullYear() + two(x.getMonth() + 1) + two(x.getDate()) + 'T' + two(x.getHours()) + two(x.getMinutes()) + '00'; };
      start = 'DTSTART:' + stamp(s); end = 'DTEND:' + stamp(f);
    } else {
      var n = new Date(dt); n.setDate(n.getDate() + 1);
      start = 'DTSTART;VALUE=DATE:' + ymd; end = 'DTEND;VALUE=DATE:' + n.getFullYear() + two(n.getMonth() + 1) + two(n.getDate());
    }
    var now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Paige Robinson//Season//EN', 'BEGIN:VEVENT',
      'UID:' + ymd + '-' + e(g.title).replace(/\W+/g, '').slice(0, 24) + '@paigerobinson', 'DTSTAMP:' + now, start, end,
      'SUMMARY:' + e(g.title + ' · Paige Robinson'), 'LOCATION:' + e([g.venue, g.city].filter(Boolean).join(', ')),
      'DESCRIPTION:' + e([g.role, g.company, g.note].filter(Boolean).join(' · ')), g.link ? 'URL:' + g.link : '',
      'END:VEVENT', 'END:VCALENDAR'].filter(Boolean).join('\r\n');
  }
  function bindCalendar() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-ics]'); if (!b) return;
      var g = gigs[+b.getAttribute('data-ics')]; if (!g) return;
      var url = URL.createObjectURL(new Blob([ics(g)], { type: 'text/calendar' }));
      var a = document.createElement('a'); a.href = url; a.download = (g.title + ' ' + g.date).replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '.ics';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    });
  }

  function render(d) {
    gigs = [];
    $all('[data-render]').forEach(function (host) {
      var fn = T[host.getAttribute('data-render')];
      if (fn) host.innerHTML = fn(d);
    });
    /* sections that only appear when they have something to show */
    $all('[data-season-past],[data-next]').forEach(function (sec) { var h = $('[data-render]', sec); sec.hidden = !(h && h.innerHTML.trim()); });
    if (d.stills && $('[data-render="stills"]')) bindLightbox(d.stills);
    bindStage();
    bindFilter();
    if (window.PRMotion) window.PRMotion.refresh();
  }

  /* ───── Mobile menu ───── */
  function bindMenu() {
    var btn = $('[data-menu-open]'), ov = $('#site-menu'), close = $('[data-menu-close]');
    if (!btn || !ov) return;
    function set(open) {
      ov.classList.toggle('is-open', open); ov.setAttribute('aria-hidden', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false'); html.classList.toggle('menu-open', open);
      if (open) { var a = $('a', ov); if (a) a.focus(); } else btn.focus();
    }
    btn.addEventListener('click', function () { set(true); });
    if (close) close.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('is-open')) set(false); });
  }

  /* ───── Motion switch ───── */
  function bindSwitch() {
    var opts = $all('.pr-switch__opt');
    function sync() { var m = html.getAttribute('data-motion'); opts.forEach(function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-mode') === m ? 'true' : 'false'); }); }
    opts.forEach(function (o) { o.addEventListener('click', function () { if (window.PRMotion) window.PRMotion.set(o.getAttribute('data-mode')); else html.setAttribute('data-motion', o.getAttribute('data-mode')); sync(); }); });
    sync();
  }

  /* ───── Stage frame (Recent roles, Roles) ─────
     A fixed photo window beside the role lines. It opens on the first role's photo; pointing at or
     tabbing to a line cross-fades it to that production. Two stacked images make the cross-fade. */
  function bindStage() {
    $all('[data-stage]').forEach(function (stage) {
      if (stage.__s) return;
      var host = stage.closest('.roles-stage'), lines = $all('[data-photo]', host);
      if (!lines.length) { stage.hidden = true; return; }
      stage.__s = 1;
      var imgs = $all('img', stage), cap = $('figcaption', stage), front = 0, current = '';
      function show(line) {
        var src = line.getAttribute('data-photo'); if (src === current) return; current = src;
        var next = imgs[1 - front];
        next.onload = function () { imgs[front].classList.remove('is-on'); next.classList.add('is-on'); front = 1 - front; };
        next.alt = ''; next.src = src;
        if (next.complete && next.naturalWidth) next.onload();
        cap.textContent = line.getAttribute('data-caption') || '';
      }
      lines.forEach(function (l) {
        l.addEventListener('pointerenter', function () { if (!l.classList.contains('is-muted')) show(l); });
        l.addEventListener('focusin', function () { show(l); });
      });
      show(lines[0]);
    });
  }

  /* ───── Credit filter: dims the other lines, never removes them ───── */
  function bindFilter() {
    var bar = $('.pr-filter'); if (!bar || bar.__b) return; bar.__b = 1;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.pr-filter__opt'); if (!b) return;
      var f = b.getAttribute('data-filter');
      $all('.pr-filter__opt', bar).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      $all('.pr-credit[data-kind]').forEach(function (l) { l.classList.toggle('is-muted', f !== 'all' && l.getAttribute('data-kind') !== f); });
    });
  }

  /* ───── Lightbox ───── */
  function bindLightbox(stills) {
    var n = stills.length, idx = 0, box = null, lastFocus = null;
    function show(i) {
      idx = (i + n) % n; var s = stills[idx];
      $('.pr-lightbox__count', box).innerHTML = pad(idx + 1) + ' <span>/ ' + pad(n) + '</span>';
      var im = $('img', box); im.src = s.src; im.alt = s.alt;
      $('.pr-lightbox__cap', box).innerHTML = '<cite class="pr-still__cap-prod">' + esc(s.production) + '</cite>' + (s.year ? '<span class="pr-still__cap-year">' + esc(s.year) + '</span>' : '');
    }
    function open(i) {
      lastFocus = document.activeElement;
      box = document.createElement('div'); box.className = 'pr-lightbox';
      box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Stills');
      box.innerHTML = '<div class="pr-lightbox__top"><span class="pr-lightbox__count" aria-live="polite"></span>' +
        '<button type="button" class="pr-lightbox__close" data-lb="close">Close <span class="pr-lightbox__glyph">×</span></button></div>' +
        '<div class="pr-lightbox__stage"><div class="pr-lightbox__media"><img alt=""></div></div>' +
        '<div class="pr-lightbox__bottom"><button type="button" class="pr-lightbox__arrow" data-lb="prev"><span class="pr-lightbox__glyph">←</span> Previous</button>' +
        '<div class="pr-lightbox__cap"></div>' +
        '<button type="button" class="pr-lightbox__arrow" data-lb="next">Next <span class="pr-lightbox__glyph">→</span></button></div>';
      document.body.appendChild(box); html.classList.add('menu-open'); show(i);
      $('[data-lb="close"]', box).focus();
      box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-lb]');
        if (b) { var a = b.getAttribute('data-lb'); if (a === 'close') close(); else show(idx + (a === 'next' ? 1 : -1)); }
        else if (e.target === box || e.target.classList.contains('pr-lightbox__stage')) close();
      });
    }
    function close() { if (!box) return; box.remove(); box = null; html.classList.remove('menu-open'); if (lastFocus) lastFocus.focus(); }
    document.addEventListener('keydown', function (e) {
      if (!box) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'Tab') { var f = $all('button', box), first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
    });
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-still]'); if (b) open(parseInt(b.getAttribute('data-still'), 10)); });
  }

  /* ───── Contact form: FormSubmit over fetch, mailto fallback ───── */
  function bindForm() {
    var form = $('#contact-form'); if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      if (fd.get('_honey')) return;
      var reason = fd.get('reason') || 'Enquiry';
      fd.set('_subject', reason + ' · paigerobinson website');
      var btn = $('button[type="submit"]', form); btn.disabled = true; btn.textContent = 'Sending';
      fetch('https://formsubmit.co/ajax/paige.robinson0@gmail.com', { method: 'POST', headers: { Accept: 'application/json' }, body: fd })
        .then(function (r) { if (!r.ok) throw 0; form.outerHTML = '<p class="contact-status" role="status">Thank you. Your note has been sent.</p>'; })
        .catch(function () {
          var body = (fd.get('message') || '') + '\n\n' + (fd.get('name') || '') + ' · ' + (fd.get('email') || '');
          location.href = 'mailto:paige.robinson0@gmail.com?subject=' + encodeURIComponent(reason + ' · website') + '&body=' + encodeURIComponent(body);
          btn.disabled = false; btn.textContent = 'Send';
        });
    });
  }

  /* ───── Landing → Home: an emerald iris closes on the landing, then opens on Home ───── */
  function bindEnter() {
    var a = $('[data-enter]'), fog = $('.fog'); if (!a || !fog) return;
    var hero = a.closest('.home-hero');
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault(); /* also stops motion.js's own page dissolve */
      var href = a.getAttribute('href');
      var still = html.getAttribute('data-motion') === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches;
      try { sessionStorage.setItem('pr-fog', '1'); } catch (err) {}
      if (still) { location.href = href; return; }
      fog.classList.add('is-rising'); if (hero) hero.classList.add('is-fogging');
      setTimeout(function () { location.href = href; }, 1320); /* as the iris finishes closing */
    });
    /* Back button restores the page from cache: clear the fog so the landing shows again */
    window.addEventListener('pageshow', function (e) { if (e.persisted) { fog.classList.remove('is-rising'); if (hero) hero.classList.remove('is-fogging'); } });
  }

  /* ───── Custom cursor ─────
     A diamond dot inside a thin ring, moving as one piece exactly with the pointer. Mulberry on ivory,
     champagne over dark panels and photos; the ring grows over links and buttons, shows a word over
     stills, and steps aside for form fields. The last position carries over between pages. */
  function bindCursor() {
    if (!fine || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var c = document.createElement('div'); c.className = 'cursor is-out'; c.setAttribute('aria-hidden', 'true');
    c.innerHTML = '<span class="cursor__dot"></span><span class="cursor__ring"><span class="cursor__label"></span></span>';
    document.body.appendChild(c); html.classList.add('has-cursor');
    var label = $('.cursor__label', c), dot = $('.cursor__dot', c), x = 0, y = 0, raf = 0, target = null, dock = null;
    /* Logo dock: the monogram's diamond (6.41 units wide, centred at 37.62, 88.5 in its viewBox) slides 5.4 units
       left in CSS; the cursor's diamond is drawn to the matching spot 5.4 units right and shrinks to the same size. */
    var D = { cx: 37.62, cy: 88.5, w: 6.41, shift: 5.4, pull: 0.08 };
    function docking() {
      if (!dock) { dot.style.translate = ''; dot.style.scale = ''; return; }
      var m = dock.getScreenCTM(); if (!m) return;
      var sx = m.a * (D.cx + D.shift) + m.c * D.cy + m.e, sy = m.b * (D.cx + D.shift) + m.d * D.cy + m.f;
      /* sit in the slot, leaning a few pixels toward the pointer */
      var dx = (sx - x) * (1 - D.pull), dy = (sy - y) * (1 - D.pull);
      dot.style.translate = dx.toFixed(1) + 'px ' + dy.toFixed(1) + 'px';
      dot.style.scale = (D.w * m.a / (7 * Math.SQRT2)).toFixed(3);
    }
    var DARK = '.home-hero,.band--forest,.site-closing,.pr-screen__house,.pr-footer,.pr-rail,.pr-mnav,.pr-overlay,.pr-lightbox,.pr-still__media,.stage-photo__frame,.headshots__frame,.about-portrait__frame,.home-feature__frame,.fog';
    function place() { raf = 0; c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'; docking(); }
    function read(t) {
      if (!t || !t.closest) return;
      var view = t.closest('[data-cursor-label]');
      c.classList.toggle('is-field', !!t.closest('input,textarea,select'));
      c.classList.toggle('is-view', !!view);
      c.classList.toggle('is-link', !view && !!t.closest('a[href],button,label,[role="button"]'));
      c.classList.toggle('is-dark', !!t.closest(DARK));
      if (view) label.textContent = view.getAttribute('data-cursor-label');
      var logo = t.closest('.site-rail__brand,.site-mname');
      dock = logo ? $('.mono-mark', logo) : null;
      c.classList.toggle('is-docked', !!dock);
    }
    try { var last = JSON.parse(sessionStorage.getItem('pr-cursor') || 'null'); if (last) { x = last.x; y = last.y; place(); c.classList.remove('is-out'); read(document.elementFromPoint(x, y)); } } catch (e) {}
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      x = e.clientX; y = e.clientY; c.classList.remove('is-out');
      if (e.target !== target) { target = e.target; read(target); }
      if (!raf) raf = requestAnimationFrame(place);
    }, { passive: true });
    /* content scrolls under a still pointer: re-read what is beneath it */
    window.addEventListener('scroll', function () { if (!c.classList.contains('is-out')) { target = document.elementFromPoint(x, y); read(target); } }, { passive: true });
    document.addEventListener('pointerdown', function () { c.classList.add('is-down'); });
    document.addEventListener('pointerup', function () { c.classList.remove('is-down'); });
    document.documentElement.addEventListener('pointerleave', function () { c.classList.add('is-out'); });
    window.addEventListener('blur', function () { c.classList.add('is-out'); });
    window.addEventListener('pagehide', function () { try { sessionStorage.setItem('pr-cursor', JSON.stringify({ x: x, y: y })); } catch (e) {} });
  }

  function init() {
    bindEnter(); bindCursor(); bindMenu(); bindCalendar(); bindSwitch(); bindForm(); bindFilter();
    if ($('[data-render]')) fetch('data.json').then(function (r) { return r.json(); }).then(render).catch(function () {
      $all('[data-render]').forEach(function (h) { if (!h.children.length) h.innerHTML = '<p class="site-note__text">Content could not be loaded.</p>'; });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
