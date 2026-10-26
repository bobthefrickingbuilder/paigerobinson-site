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
    /* Biography: *asterisks* mark titles, shown in italics; the press block offers each version for copying */
    bio: function (d) { return bioParas(d.bio.long); },
    bioPress: function (d) {
      return [['Short', d.bio.short], ['Long', d.bio.long]].map(function (v) {
        var words = v[1].join(' ').split(/\s+/).length;
        return '<article class="bio-copy" data-bio="' + v[0].toLowerCase() + '"><header class="bio-copy__head"><h3 class="bio-copy__title">' + v[0] +
          '</h3><span class="bio-copy__words">' + words + ' words</span><button type="button" class="bio-copy__btn">Copy</button></header>' +
          '<div class="bio-copy__text">' + bioParas(v[1]) + '</div></article>';
      }).join('');
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
    /* Photos: a program-style contents list, then one chapter per project */
    projectIndex: function (d) {
      var roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
      var press = $('#press .press-ph') ? '<li class="proj-index__press"><a href="#press"><span class="proj-index__num" aria-hidden="true"><span class="proj-index__gem"></span></span>' +
        '<span class="proj-index__title">Press photos</span><span class="proj-index__leader" aria-hidden="true"></span><span class="proj-index__meta">Headshots · portraits</span></a></li>' : '';
      return '<ol class="proj-index">' + press + d.projects.map(function (p, i) {
        return '<li><a href="#' + esc(p.slug) + '"><span class="proj-index__num">' + roman[i] + '</span>' +
          '<cite class="proj-index__title">' + esc(p.production) + '</cite><span class="proj-index__leader" aria-hidden="true"></span>' +
          '<span class="proj-index__meta">' + (p.year ? esc(p.year) + ' · ' : '') + p.photos.length + '</span></a></li>';
      }).join('') + '</ol>';
    },
    projects: function (d) {
      var roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'], k = 0;
      return d.projects.map(function (p, pi) {
        var label = p.production + (p.year ? ', ' + p.year : '');
        var alt = function (n) { return p.company ? 'Production photo ' + n + ' from ' + p.production + ' (' + p.company + (p.year ? ', ' + p.year : '') + ')' : 'Photo ' + n + ' of Paige Robinson, ' + p.production.toLowerCase(); };
        var lead = p.photos.filter(function (ph) { return ph.lead; })[0] || p.photos[0];
        var shots = [lead].concat(p.photos.filter(function (ph) { return ph !== lead; }));
        var meta = [p.role, p.company, p.year].filter(Boolean).map(esc).join(' · ');
        var html = (pi ? '<div class="stave" aria-hidden="true"></div>' : '') +
          '<section class="proj" id="' + esc(p.slug) + '" aria-labelledby="' + esc(p.slug) + '-h">' +
          '<header class="proj__head" data-reveal><span class="proj__num">' + roman[pi] + ' · ' + p.photos.length + ' photos</span>' +
          '<h2 class="proj__title" id="' + esc(p.slug) + '-h"><cite>' + esc(p.production) + '</cite></h2>' +
          (meta ? '<p class="proj__meta">' + meta + '</p>' : '') +
          (p.placeholder ? '<p class="site-note__kind">Placeholder · Title, role and year to be supplied</p>' : '') + '</header>';
        shots.forEach(function (ph, n) {
          var i = k++;
          lightboxItems.push({ src: ph.src, alt: alt(n + 1), production: p.production, year: p.year, n: n + 1, of: shots.length });
          if (n === 0) {
            html += '<figure class="pr-still proj__lead" data-reveal><button type="button" class="pr-still__media pr-still__media--button" data-cursor data-cursor-label="View" data-parallax-root data-shot="' + i + '" aria-label="Open ' + esc(label) + ', photo 1 of ' + shots.length + '">' +
              '<span class="pr-still__layer" data-depth=".18"><img class="pr-still__img" src="' + esc(ph.src) + '" alt="' + esc(alt(1)) + '" style="object-position:' + esc(p.focal || '50% 40%') + '" loading="' + (pi ? 'lazy' : 'eager') + '" decoding="async"></span>' +
              '<span class="pr-still__vignette"></span><span class="pr-spot"></span></button></figure><div class="proj__grid">';
          } else {
            html += '<button type="button" class="proj__ph" style="--r:' + (ph.w / ph.h).toFixed(4) + '" data-cursor-label="View" data-shot="' + i + '" aria-label="Open ' + esc(label) + ', photo ' + (n + 1) + ' of ' + shots.length + '">' +
              '<img src="' + esc(ph.thumb) + '" alt="' + esc(alt(n + 1)) + '" width="' + ph.w + '" height="' + ph.h + '" loading="lazy" decoding="async"></button>';
          }
        });
        return html + '</div></section>';
      }).join('');
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
        var detail = [a.composer, a.work].filter(Boolean).map(esc).join(' · ');
        return '<li class="aud" data-aud="' + i + '"><button type="button" class="pr-audio__btn aud__play" data-src="' + esc(a.src) + '" aria-pressed="false" aria-label="Play ' + esc(a.title) + '">' +
          '<span class="pr-audio__num">' + roman[i] + '</span><span class="pr-audio__mark" aria-hidden="true"><span class="pr-audio__tri"></span><span class="pr-audio__pause"></span></span>' +
          '<span><span class="pr-audio__title">' + esc(a.title) + '</span><span class="pr-audio__detail">' + detail + '</span></span>' +
          '<span class="pr-audio__len aud__time">' + esc(a.duration || '') + '</span></button>' + knobHTML() +
          '<span class="aud__prog" aria-hidden="true"><i></i></span></li>';
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

  /* ───── Audio: one clip at a time, with a volume knob ─────
     The knob (a 270° dial: ticks, a filled arc, the diamond as pointer) grows in beside a clip once it plays.
     Turn it by dragging around it, the scroll wheel, or arrow keys. Volume is shared by all clips and remembered.
     Starting any clip fades out the one playing; the YouTube video joins in through its iframe API. */
  var ARC = 2 * Math.PI * 24, SWEEP = ARC * 0.75;
  function knobHTML() {
    var ticks = '';
    for (var t = 0; t <= 10; t++) { ticks += '<line x1="32" y1="2.5" x2="32" y2="' + (t % 5 ? '5.5' : '7') + '" transform="rotate(' + (-135 + t * 27) + ' 32 32)"/>'; }
    return '<div class="knob" role="slider" tabindex="-1" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80" aria-valuetext="80%" aria-hidden="true">' +
      '<svg viewBox="0 0 64 64" aria-hidden="true"><g class="knob__ticks">' + ticks + '</g>' +
      '<circle class="knob__track" cx="32" cy="32" r="24" stroke-dasharray="' + SWEEP.toFixed(2) + ' ' + ARC.toFixed(2) + '" transform="rotate(135 32 32)"/>' +
      '<circle class="knob__level" cx="32" cy="32" r="24" stroke-dasharray="0 ' + ARC.toFixed(2) + '" transform="rotate(135 32 32)"/>' +
      '<circle class="knob__face" cx="32" cy="32" r="17"/>' +
      '<g class="knob__pointer"><path d="M32 4.5 L35.2 8 L32 11.5 L28.8 8 Z"/></g></svg>' +
      '<span class="knob__val">80</span></div>';
  }
  function bindAudio() {
    var list = $('.pr-audio'); if (!list || list.__a || !$('.aud', list)) return; list.__a = 1;
    var vol = 0.8, current = null;
    try { var sv = parseFloat(localStorage.getItem('pr-volume')); if (sv >= 0 && sv <= 1) vol = sv; } catch (e) {}
    function gain(v) { return v * v; }                      /* perceptual curve, so the knob feels even */
    function clock(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + pad(t % 60); }
    function paintKnobs() {
      $all('.knob', list).forEach(function (k) {
        $('.knob__level', k).setAttribute('stroke-dasharray', (SWEEP * vol).toFixed(2) + ' ' + ARC.toFixed(2));
        $('.knob__pointer', k).setAttribute('transform', 'rotate(' + (-135 + 270 * vol).toFixed(1) + ' 32 32)');
        var pc = Math.round(vol * 100); $('.knob__val', k).textContent = pc;
        k.setAttribute('aria-valuenow', pc); k.setAttribute('aria-valuetext', pc + '%');
      });
    }
    function setVol(v) {
      vol = Math.max(0, Math.min(1, v)); paintKnobs();
      if (current && !current.fading) current.audio.volume = gain(vol);
      try { localStorage.setItem('pr-volume', vol.toFixed(3)); } catch (e) {}
    }
    function fadeOut(item, then) {
      item.fading = true; var a = item.audio, from = a.volume, t0 = performance.now();
      (function step(now) {
        var k = Math.min(1, (now - t0) / 350); a.volume = from * (1 - k);
        if (k < 1) requestAnimationFrame(step); else { a.pause(); item.fading = false; if (then) then(); }
      })(t0);
    }
    function ui(item, state) {           /* state: playing | paused | stopped */
      var li = item.li, btn = $('.aud__play', li), title = $('.pr-audio__title', li).textContent, knob = $('.knob', li);
      li.classList.toggle('is-playing', state === 'playing');
      li.classList.toggle('is-active', state !== 'stopped');
      btn.setAttribute('aria-pressed', state === 'playing' ? 'true' : 'false');
      btn.setAttribute('aria-label', (state === 'playing' ? 'Pause ' : 'Play ') + title);
      knob.setAttribute('aria-hidden', state === 'stopped' ? 'true' : 'false'); knob.tabIndex = state === 'stopped' ? -1 : 0;
    }
    function stop(item, quiet) {
      if (!item) return;
      var done = function () { item.audio.currentTime = 0; ui(item, 'stopped'); $('.aud__time', item.li).textContent = item.len; $('.aud__prog i', item.li).style.transform = 'scaleX(0)'; };
      if (quiet || item.audio.paused) { item.audio.pause(); done(); } else fadeOut(item, done);
      if (current === item) current = null;
    }
    function bindKnob(k) {
      var drag = false;
      function fromPointer(e) {
        var r = k.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        var ang = Math.atan2(dx, -dy) * 180 / Math.PI;      /* 0 at the top, clockwise positive */
        setVol((Math.max(-135, Math.min(135, ang)) + 135) / 270);
      }
      function end() { drag = false; k.classList.remove('is-turning'); }
      k.addEventListener('pointerdown', function (e) { drag = true; k.setPointerCapture(e.pointerId); k.classList.add('is-turning'); fromPointer(e); e.preventDefault(); });
      k.addEventListener('pointermove', function (e) { if (drag) fromPointer(e); });
      k.addEventListener('pointerup', end); k.addEventListener('pointercancel', end);
      k.addEventListener('wheel', function (e) { e.preventDefault(); setVol(vol - Math.sign(e.deltaY) * 0.04); }, { passive: false });
      k.addEventListener('keydown', function (e) {
        var step = { ArrowUp: .05, ArrowRight: .05, ArrowDown: -.05, ArrowLeft: -.05, PageUp: .2, PageDown: -.2 }[e.key];
        if (step) { setVol(vol + step); e.preventDefault(); }
        else if (e.key === 'Home') { setVol(0); e.preventDefault(); } else if (e.key === 'End') { setVol(1); e.preventDefault(); }
      });
    }
    /* YouTube: pause it when a clip starts; stop the clip when the video starts */
    var yt = $('iframe[src*="youtube"]'), ytOrigin = 'https://www.youtube-nocookie.com';
    function pauseVideo() { if (yt && yt.contentWindow) yt.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), ytOrigin); }
    $all('.aud', list).forEach(function (li) {
      var btn = $('.aud__play', li), audio = new Audio(); audio.preload = 'metadata'; audio.src = btn.getAttribute('data-src');
      var item = { li: li, audio: audio, len: $('.aud__time', li).textContent, fading: false };
      audio.addEventListener('timeupdate', function () {
        if (!audio.duration || !li.classList.contains('is-active')) return;   /* a stopped row keeps its plain length */
        $('.aud__time', li).textContent = clock(audio.currentTime) + ' / ' + clock(audio.duration);
        $('.aud__prog i', li).style.transform = 'scaleX(' + (audio.currentTime / audio.duration).toFixed(4) + ')';
      });
      audio.addEventListener('ended', function () { stop(item, true); });
      btn.addEventListener('click', function () {
        if (current === item && !audio.paused) { fadeOut(item, function () { ui(item, 'paused'); }); return; }
        if (current && current !== item) stop(current);
        pauseVideo();
        current = item; audio.volume = gain(vol);
        var go = audio.play(); if (go && go.catch) go.catch(function () { ui(item, 'paused'); });
        ui(item, 'playing');
      });
      bindKnob($('.knob', li));
    });
    if (yt) {
      var listen = function () { if (yt.contentWindow) yt.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 'pr-yt', channel: 'widget' }), ytOrigin); };
      yt.addEventListener('load', function () { listen(); setTimeout(listen, 600); });
      window.addEventListener('message', function (e) {
        if (e.origin !== ytOrigin) return;
        var data; try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (err) { return; }
        if (data && data.info && data.info.playerState === 1 && current) stop(current);   /* 1 = playing */
      });
    }
    paintKnobs();
  }

  function bioParas(list) { return list.map(function (p) { return '<p>' + esc(p).replace(/\*([^*]+)\*/g, '<cite>$1</cite>') + '</p>'; }).join(''); }
  /* Copy a biography as rich text (titles stay italic in Word or Docs) with a plain-text fallback */
  function bindBioCopy() {
    $all('.bio-copy').forEach(function (art) {
      var btn = $('.bio-copy__btn', art); if (!btn || btn.__b) return; btn.__b = 1;
      btn.addEventListener('click', function () {
        var paras = $all('.bio-copy__text p', art), plain = paras.map(function (p) { return p.textContent; }).join('\n\n');
        var html = paras.map(function (p) { return '<p>' + p.innerHTML.replace(/<(\/?)cite>/g, '<$1i>') + '</p>'; }).join('');
        var done = function () { btn.textContent = 'Copied'; btn.classList.add('is-done'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('is-done'); }, 2200); };
        var fallback = function () {
          var t = document.createElement('textarea'); t.value = plain; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove();
        };
        if (navigator.clipboard && window.ClipboardItem) {
          navigator.clipboard.write([new ClipboardItem({ 'text/plain': new Blob([plain], { type: 'text/plain' }), 'text/html': new Blob([html], { type: 'text/html' }) })]).then(done, fallback);
        } else if (navigator.clipboard) navigator.clipboard.writeText(plain).then(done, fallback);
        else fallback();
      });
    });
  }

  /* Photos: the "Index" button appears once the project list has scrolled away, and leads back to it */
  function bindToIndex() {
    var btn = $('.to-index'), nav = $('#index'); if (!btn || !nav || btn.__t) return; btn.__t = 1;
    /* shows once the first photos below the index (the press photos) come into view */
    var mark = $('#press .press-grid') || $('#press') || nav;
    function update() {
      var r = mark.getBoundingClientRect();
      btn.classList.toggle('is-shown', mark === nav ? r.bottom < 0 : r.top < window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
    btn.addEventListener('click', function () { setTimeout(function () { var a = $('a', nav); if (a) a.focus({ preventScroll: true }); }, 700); });
  }

  /* Press photos: copy the image itself to the clipboard (as PNG, the format browsers accept), or download the file */
  function bindCopyImage() {
    $all('[data-copy-img]').forEach(function (btn) {
      if (btn.__c) return; btn.__c = 1;
      if (!(navigator.clipboard && window.ClipboardItem)) { btn.hidden = true; return; }
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-copy-img');
        var png = fetch(src).then(function (r) { return r.blob(); }).then(function (b) { return createImageBitmap(b); }).then(function (bmp) {
          var c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0);
          return new Promise(function (res) { c.toBlob(res, 'image/png'); });
        });
        var say = function (t) { btn.textContent = t; btn.classList.add('is-done'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('is-done'); }, 2200); };
        btn.textContent = 'Copying';
        navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]).then(function () { say('Copied'); }, function () { say('Not copied'); });
      });
    });
  }

  /* Home: a scroll cue rises in after three seconds at the top of the page, leaves once the visitor scrolls,
     and glides to the next visible section when clicked */
  function bindScrollCue() {
    var cue = $('.scroll-cue'); if (!cue || cue.__s) return; cue.__s = 1;
    var ready = false;
    function update() { cue.classList.toggle('is-shown', ready && window.scrollY < 60); }
    setTimeout(function () { ready = true; update(); }, 3000);
    window.addEventListener('scroll', update, { passive: true });
    cue.addEventListener('click', function () {
      var next = cue.closest('section').nextElementSibling;
      while (next && (next.hidden || next.tagName !== 'SECTION')) next = next.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var lightboxItems = [];
  function render(d) {
    gigs = []; lightboxItems = [];
    $all('[data-render]').forEach(function (host) {
      var fn = T[host.getAttribute('data-render')];
      /* each section renders on its own: missing data or an error in one never blanks the others */
      if (fn) { try { host.innerHTML = fn(d); } catch (err) { host.innerHTML = ''; if (window.console) console.warn('render ' + host.getAttribute('data-render'), err); } }
    });
    /* sections that only appear when they have something to show */
    $all('[data-season-past],[data-next]').forEach(function (sec) { var h = $('[data-render]', sec); sec.hidden = !(h && h.innerHTML.trim()); });
    if (d.stills && $('[data-render="stills"]')) bindLightbox(d.stills);
    if (lightboxItems.length) bindLightbox(lightboxItems);
    bindAudio();
    bindBioCopy();
    bindToIndex();
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
      $('.pr-lightbox__count', box).innerHTML = pad(s.n || idx + 1) + ' <span>/ ' + pad(s.of || n) + '</span>';
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
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-still],[data-shot]'); if (b) open(parseInt(b.getAttribute('data-still') || b.getAttribute('data-shot'), 10)); });
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
    var D = { cx: 37.62, cy: 88.5, w: 6.41, shift: 5.4, pull: 0.025 }, lockTimer = 0;
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
      c.classList.toggle('is-link', !view && !!t.closest('a[href],button,label,[role="button"],[role="slider"]'));
      c.classList.toggle('is-dark', !!t.closest(DARK));
      if (view) label.textContent = view.getAttribute('data-cursor-label');
      var logo = t.closest('.site-rail__brand,.site-mname');
      dock = logo ? $('.mono-mark', logo) : null;
      var was = c.classList.contains('is-docked');
      c.classList.toggle('is-docked', !!dock);
      /* once the dot has eased into the slot, hold it there firmly */
      if (dock && !was) { clearTimeout(lockTimer); lockTimer = setTimeout(function () { c.classList.add('is-locked'); }, 620); }
      if (!dock) { clearTimeout(lockTimer); c.classList.remove('is-locked'); }
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
    /* an embedded video has its own pointer: step aside rather than freeze at the frame's edge */
    document.addEventListener('pointerover', function (e) { if (e.target.tagName === 'IFRAME') c.classList.add('is-out'); });
    window.addEventListener('pagehide', function () { try { sessionStorage.setItem('pr-cursor', JSON.stringify({ x: x, y: y })); } catch (e) {} });
  }

  /* Arriving with a #section (Home → About's roles, a link to one project): start at the top, then glide down
     once the page has rendered, instead of jumping */
  var arrive = (location.hash || '').slice(1);
  if (arrive && !/^main$/.test(arrive) && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function glideToHash() {
    if (!arrive) return;
    var el = document.getElementById(decodeURIComponent(arrive)); arrive = '';
    if (!el) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }, reduce ? 0 : 450);
  }

  function init() {
    bindEnter(); bindCopyImage(); bindScrollCue(); bindCursor(); bindMenu(); bindCalendar(); bindSwitch(); bindForm(); bindFilter();
    if ($('[data-render]')) fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(render).then(glideToHash).catch(function () {
      $all('[data-render]').forEach(function (h) { if (!h.children.length) h.innerHTML = '<p class="site-note__text">Content could not be loaded.</p>'; });
      glideToHash();
    });
    else glideToHash();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
