/* @ds-bundle: {"format":4,"namespace":"PaigeRobinsonDesignSystem_296b61","components":[{"name":"MotionSwitch","sourcePath":"components/chrome/MotionSwitch.jsx"},{"name":"SiteFooter","sourcePath":"components/chrome/SiteFooter.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"ReasonSelect","sourcePath":"components/forms/ReasonSelect.jsx"},{"name":"UnderlineField","sourcePath":"components/forms/UnderlineField.jsx"},{"name":"OvertureHero","sourcePath":"components/hero/OvertureHero.jsx"},{"name":"AudioList","sourcePath":"components/media/AudioList.jsx"},{"name":"HoverPhotoField","sourcePath":"components/media/HoverPhotoField.jsx"},{"name":"ImageSlot","sourcePath":"components/media/ImageSlot.jsx"},{"name":"Lightbox","sourcePath":"components/media/Lightbox.jsx"},{"name":"ScreeningRoom","sourcePath":"components/media/ScreeningRoom.jsx"},{"name":"Still","sourcePath":"components/media/Still.jsx"},{"name":"MobileNav","sourcePath":"components/navigation/MobileNav.jsx"},{"name":"Monogram","sourcePath":"components/navigation/Monogram.jsx"},{"name":"RailNav","sourcePath":"components/navigation/RailNav.jsx"},{"name":"CreditFilter","sourcePath":"components/program/CreditFilter.jsx"},{"name":"CreditYear","sourcePath":"components/program/CreditYear.jsx"},{"name":"Personae","sourcePath":"components/program/Personae.jsx"},{"name":"PlainList","sourcePath":"components/program/PlainList.jsx"},{"name":"RecentRoles","sourcePath":"components/program/RecentRoles.jsx"},{"name":"Eyebrow","sourcePath":"components/type/Eyebrow.jsx"},{"name":"GrandLink","sourcePath":"components/type/GrandLink.jsx"},{"name":"Hairline","sourcePath":"components/type/Hairline.jsx"},{"name":"PageTitle","sourcePath":"components/type/PageTitle.jsx"}],"sourceHashes":{"components/chrome/MotionSwitch.jsx":"c0c9ac5d52f3","components/chrome/SiteFooter.jsx":"582a06e3658f","components/forms/Button.jsx":"ac1b6264b195","components/forms/ReasonSelect.jsx":"9fd26ae0a1ef","components/forms/UnderlineField.jsx":"4ef0a96e60a2","components/hero/OvertureHero.jsx":"5f7740a3a32c","components/media/AudioList.jsx":"49036a3b1062","components/media/HoverPhotoField.jsx":"2f41799b0bb5","components/media/ImageSlot.jsx":"c1273f8bda67","components/media/Lightbox.jsx":"4e60814cfa92","components/media/ScreeningRoom.jsx":"0358ccacda98","components/media/Still.jsx":"d0390f7c17fc","components/navigation/MobileNav.jsx":"1a30a7ff1d42","components/navigation/Monogram.jsx":"7dcc852ddb19","components/navigation/RailNav.jsx":"c87677816ead","components/program/CreditFilter.jsx":"e1a0dd4bbf77","components/program/CreditYear.jsx":"69f49d254371","components/program/Personae.jsx":"5283f20f1e25","components/program/PlainList.jsx":"d8b830807aa3","components/program/RecentRoles.jsx":"7c6ef8857c75","components/type/Eyebrow.jsx":"8ab91f7b7ef8","components/type/GrandLink.jsx":"8fb57c817b57","components/type/Hairline.jsx":"286558616914","components/type/PageTitle.jsx":"82e979b47408","motion/motion.js":"4392ba373610","ui_kits/website/Correspondence.jsx":"d7daf71e5ee7","ui_kits/website/Overture.jsx":"09a4c12a2615","ui_kits/website/Placeholder.jsx":"aeaa06995000","ui_kits/website/Portrait.jsx":"fa4983c780ee","ui_kits/website/Roles.jsx":"b29f7047d5c0","ui_kits/website/Stills.jsx":"82f362968b6e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PaigeRobinsonDesignSystem_296b61 = window.PaigeRobinsonDesignSystem_296b61 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/chrome/MotionSwitch.jsx
try { (() => {
const MODES = [['full', 'Full'], ['subtle', 'Subtle'], ['off', 'Off']];
function initial() {
  try {
    const s = localStorage.getItem('pr-motion');
    if (s) return s;
  } catch (e) {}
  if (typeof document !== 'undefined' && document.documentElement.dataset.motion) return document.documentElement.dataset.motion;
  if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off';
  return 'full';
}
function MotionSwitch({
  value,
  onChange
}) {
  const [inner, setInner] = React.useState(initial);
  const v = value !== undefined ? value : inner;
  React.useEffect(() => {
    document.documentElement.dataset.motion = v;
  }, [v]);
  const set = m => {
    setInner(m);
    try {
      localStorage.setItem('pr-motion', m);
    } catch (e) {}
    if (window.PRMotion) window.PRMotion.set(m);
    onChange && onChange(m);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-switch",
    role: "group",
    "aria-label": "Motion"
  }, /*#__PURE__*/React.createElement("span", null, "Motion"), /*#__PURE__*/React.createElement("span", {
    className: "pr-switch__opts"
  }, MODES.map(([m, l]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    className: "pr-switch__opt",
    "aria-pressed": v === m,
    onClick: () => set(m)
  }, l))));
}
Object.assign(__ds_scope, { MotionSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/MotionSwitch.jsx", error: String((e && e.message) || e) }); }

// components/chrome/SiteFooter.jsx
try { (() => {
const DEFAULT_SOCIAL = [{
  label: 'Social link'
}, {
  label: 'Social link'
}];
function SiteFooter({
  year = 2026,
  name = 'Paige Robinson',
  social = DEFAULT_SOCIAL,
  showLanguage = true,
  lang = 'en',
  onLang
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "pr-footer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-footer__copy"
  }, "\xA9 ", year, " ", name), /*#__PURE__*/React.createElement("div", {
    className: "pr-footer__group"
  }, social.map((s, i) => s.href ? /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "pr-footer__social",
    href: s.href,
    rel: "me noopener",
    style: {
      borderBottomStyle: 'solid'
    }
  }, s.label) : /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "pr-footer__social",
    title: "Placeholder \u2014 not yet supplied"
  }, s.label)), showLanguage ? /*#__PURE__*/React.createElement("div", {
    className: "pr-switch",
    role: "group",
    "aria-label": "Language"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-switch__opts"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pr-switch__opt",
    "aria-pressed": lang === 'en',
    onClick: () => onLang && onLang('en'),
    lang: "en"
  }, "EN"), /*#__PURE__*/React.createElement("button", {
    className: "pr-switch__opt",
    "aria-pressed": lang === 'fr',
    onClick: () => onLang && onLang('fr'),
    lang: "fr"
  }, "FR"))) : null, /*#__PURE__*/React.createElement(__ds_scope.MotionSwitch, null)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'outline',
  type = 'button',
  href,
  disabled = false,
  onClick
}) {
  const cls = 'pr-btn pr-btn--' + variant;
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: disabled ? undefined : href,
    "aria-disabled": disabled || undefined,
    onClick: onClick
  }, children);
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    type: type,
    disabled: disabled,
    onClick: onClick
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/ReasonSelect.jsx
try { (() => {
const DEFAULT = ['Booking', 'Press', 'Lessons', 'Question'];
function ReasonSelect({
  name = 'reason',
  legend = 'Reason',
  options = DEFAULT,
  value,
  defaultValue = 'Booking',
  onChange
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value !== undefined ? value : inner;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: "pr-reason"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "pr-reason__legend"
  }, legend), /*#__PURE__*/React.createElement("div", {
    className: "pr-reason__opts"
  }, options.map(o => /*#__PURE__*/React.createElement("label", {
    key: o,
    className: "pr-reason__opt"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: o,
    checked: v === o,
    onChange: () => {
      setInner(o);
      onChange && onChange(o);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "pr-reason__txt"
  }, o)))));
}
Object.assign(__ds_scope, { ReasonSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ReasonSelect.jsx", error: String((e && e.message) || e) }); }

// components/forms/UnderlineField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function UnderlineField({
  label,
  name,
  type = 'text',
  multiline = false,
  rows = 4,
  required = false,
  placeholder,
  value,
  defaultValue,
  onChange,
  autoComplete,
  hint
}) {
  const id = 'f-' + name;
  const common = {
    id: id,
    name: name,
    required: required,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    autoComplete: autoComplete,
    className: 'pr-field__input'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "pr-field__label",
    htmlFor: id
  }, label, required ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, " \xB7 optional")), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, common)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)), hint ? /*#__PURE__*/React.createElement("span", {
    className: "pr-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { UnderlineField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/UnderlineField.jsx", error: String((e && e.message) || e) }); }

// components/media/AudioList.jsx
try { (() => {
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'];
function AudioList({
  items = []
}) {
  const [playing, setPlaying] = React.useState(-1);
  const audio = React.useRef(null);
  const toggle = i => {
    const it = items[i];
    if (!it.src) return;
    if (!audio.current) audio.current = new Audio();
    const a = audio.current;
    if (playing === i) {
      a.pause();
      setPlaying(-1);
      return;
    }
    a.src = it.src;
    a.play();
    a.onended = () => setPlaying(-1);
    setPlaying(i);
  };
  return /*#__PURE__*/React.createElement("ol", {
    className: "pr-audio",
    "data-stagger": "150"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("button", {
    className: "pr-audio__btn",
    onClick: () => toggle(i),
    disabled: !it.src,
    "aria-pressed": playing === i,
    "aria-label": (playing === i ? 'Pause ' : 'Play ') + it.title + (it.src ? '' : ' (not yet available)')
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__num"
  }, ROMAN[i] || i + 1), /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__mark",
    "aria-hidden": "true"
  }, playing === i ? /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__pause"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__tri"
  })), /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__title"
  }, it.title, it.detail ? /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__detail"
  }, it.detail) : null), /*#__PURE__*/React.createElement("span", {
    className: "pr-audio__len"
  }, it.length || (it.src ? '' : 'Pending'))))));
}
Object.assign(__ds_scope, { AudioList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/AudioList.jsx", error: String((e && e.message) || e) }); }

// components/media/ImageSlot.jsx
try { (() => {
function ImageSlot({
  src,
  alt = '',
  focal = '50% 40%',
  ratio,
  label = 'Photo slot',
  duotone = false,
  imgClassName = 'pr-still__img'
}) {
  const parts = focal.split(' ');
  if (src) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    className: imgClassName,
    src: src,
    alt: alt,
    style: {
      objectPosition: focal
    },
    loading: "lazy"
  }), duotone ? /*#__PURE__*/React.createElement("div", {
    className: "pr-still__duotone"
  }) : null);
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-slot",
    role: "img",
    "aria-label": label + ' (placeholder)',
    style: {
      '--focal-x': parts[0],
      '--focal-y': parts[1] || '50%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-slot__cross",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pr-slot__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-slot__kind"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "pr-slot__spec"
  }, (ratio ? ratio + ' · ' : '') + 'focal ' + focal)));
}
Object.assign(__ds_scope, { ImageSlot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/ImageSlot.jsx", error: String((e && e.message) || e) }); }

// components/hero/OvertureHero.jsx
try { (() => {
function letters(word, start) {
  return word.split('').map((ch, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "pr-hero__letter",
    style: {
      '--i': start + i
    },
    "aria-hidden": "true"
  }, ch));
}
function OvertureHero({
  first = 'Paige',
  last = 'Robinson',
  eyebrow = 'Soprano',
  src,
  alt = '',
  focal = '50% 30%',
  duotone = true,
  enterHref = '#overture',
  enterLabel = 'Enter',
  isStatic = false
}) {
  const ref = React.useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--cursor-x', e.clientX - r.left + 'px');
    el.style.setProperty('--cursor-y', e.clientY - r.top + 'px');
  };
  const after = (first.length + last.length) * 70 + 700 + 'ms';
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    className: 'pr-hero' + (isStatic ? ' pr-hero--static' : ''),
    "data-cursor": "",
    "data-parallax-root": "",
    onMouseMove: onMove,
    onMouseEnter: () => ref.current.classList.add('is-lit'),
    onMouseLeave: () => ref.current.classList.remove('is-lit')
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-hero__media",
    "data-depth": "0.25"
  }, /*#__PURE__*/React.createElement(__ds_scope.ImageSlot, {
    src: src,
    alt: alt,
    focal: focal,
    ratio: "full-bleed",
    label: "Hero photo \xB7 landing 1 of 4",
    duotone: duotone,
    imgClassName: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "pr-hero__vig"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-spot",
    style: {
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-hero__glow pr-candle-glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-hero__title"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pr-eyebrow pr-eyebrow--wide pr-hero__after",
    style: {
      margin: 0,
      '--after': '200ms'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "pr-hero__name",
    "aria-label": first + ' ' + last
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-hero__line"
  }, letters(first, 0)), /*#__PURE__*/React.createElement("span", {
    className: "pr-hero__line"
  }, letters(last, first.length))), /*#__PURE__*/React.createElement("hr", {
    className: "pr-hero__rule pr-hero__after",
    style: {
      '--after': after
    }
  })), /*#__PURE__*/React.createElement("a", {
    className: "pr-hero__enter pr-hero__after",
    href: enterHref,
    style: {
      '--after': after
    }
  }, enterLabel, /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true"
  })));
}
Object.assign(__ds_scope, { OvertureHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hero/OvertureHero.jsx", error: String((e && e.message) || e) }); }

// components/media/HoverPhotoField.jsx
try { (() => {
function HoverPhotoField({
  children,
  photos = {},
  className = ''
}) {
  const [hover, setHover] = React.useState(null);
  const box = React.useRef(null);
  const pos = React.useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
  });
  const raf = React.useRef(0);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const tick = () => {
    const p = pos.current;
    p.x += (p.tx - p.x) * 0.12;
    p.y += (p.ty - p.y) * 0.12;
    if (box.current) box.current.style.transform = 'translate3d(' + (p.x + 28) + 'px,' + (p.y - 120) + 'px,0)';
    if (Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3) raf.current = requestAnimationFrame(tick);
  };
  const onMove = e => {
    const t = e.target.closest ? e.target.closest('[data-photo]') : null;
    const key = t ? t.getAttribute('data-photo') : null;
    const p = pos.current;
    p.tx = e.clientX;
    p.ty = e.clientY;
    if (key && (!hover || hover.key !== key)) {
      if (!hover) {
        p.x = p.tx;
        p.y = p.ty;
      }
      setHover({
        key: key,
        label: t.getAttribute('data-photo-label') || key
      });
    }
    if (!key && hover) setHover(null);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };
  const src = hover ? photos[hover.key] : null;
  return /*#__PURE__*/React.createElement("div", {
    className: 'pr-hoverfield pr-lines ' + className,
    onMouseMove: onMove,
    onMouseLeave: () => setHover(null)
  }, children, /*#__PURE__*/React.createElement("div", {
    ref: box,
    className: 'pr-hoverphoto' + (hover ? ' is-visible' : ''),
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-hoverphoto__frame",
    style: {
      position: 'relative'
    }
  }, hover ? /*#__PURE__*/React.createElement(__ds_scope.ImageSlot, {
    src: src,
    alt: "",
    ratio: "4:5",
    focal: "50% 35%",
    label: hover.label
  }) : null)));
}
Object.assign(__ds_scope, { HoverPhotoField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/HoverPhotoField.jsx", error: String((e && e.message) || e) }); }

// components/media/Lightbox.jsx
try { (() => {
const pad = n => (n < 10 ? '0' : '') + n;
function Lightbox({
  items = [],
  index = 0,
  open = true,
  onClose,
  onIndex,
  isStatic = false
}) {
  const n = items.length;
  const go = d => onIndex && onIndex((index + d + n) % n);
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    if (!open || isStatic) return;
    const k = e => {
      if (e.key === 'Escape') onClose && onClose();else if (e.key === 'ArrowRight') go(1);else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', k);
    if (closeRef.current) closeRef.current.focus();
    return () => window.removeEventListener('keydown', k);
  }, [open, index, n, isStatic]);
  if (!open || !n) return null;
  const it = items[index];
  const ratio = it.ratio || '2.39/1';
  return /*#__PURE__*/React.createElement("div", {
    className: 'pr-lightbox' + (isStatic ? ' pr-lightbox--static' : ''),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Stills viewer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-lightbox__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-lightbox__count",
    "aria-live": "polite"
  }, pad(index + 1), " ", /*#__PURE__*/React.createElement("span", null, "/ ", pad(n))), /*#__PURE__*/React.createElement("button", {
    ref: closeRef,
    className: "pr-lightbox__close",
    onClick: onClose
  }, "Close ", /*#__PURE__*/React.createElement("span", {
    className: "pr-lightbox__glyph",
    "aria-hidden": "true"
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    className: "pr-lightbox__stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-lightbox__media",
    style: {
      aspectRatio: ratio,
      maxWidth: 'calc((100vh - 220px) * ' + ratio.replace('/', ' / ') + ')'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ImageSlot, {
    src: it.src,
    alt: it.alt,
    focal: it.focal || '50% 40%',
    ratio: ratio.replace('/', ':'),
    label: it.label || 'Still'
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pr-lightbox__bottom"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pr-lightbox__arrow",
    onClick: () => go(-1),
    "aria-label": "Previous still"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-lightbox__glyph",
    "aria-hidden": "true"
  }, "\u2190"), " Previous"), /*#__PURE__*/React.createElement("span", {
    className: "pr-still__cap",
    style: {
      justifyContent: 'center'
    }
  }, it.production ? /*#__PURE__*/React.createElement("cite", {
    className: "pr-still__cap-prod"
  }, it.production) : null, it.year ? /*#__PURE__*/React.createElement("span", {
    className: "pr-still__cap-year"
  }, it.year) : null), /*#__PURE__*/React.createElement("button", {
    className: "pr-lightbox__arrow",
    onClick: () => go(1),
    "aria-label": "Next still"
  }, "Next ", /*#__PURE__*/React.createElement("span", {
    className: "pr-lightbox__glyph",
    "aria-hidden": "true"
  }, "\u2192"))));
}
Object.assign(__ds_scope, { Lightbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Lightbox.jsx", error: String((e && e.message) || e) }); }

// components/media/ScreeningRoom.jsx
try { (() => {
function ScreeningRoom({
  src,
  kind = 'iframe',
  title = 'Video',
  caption,
  year,
  poster
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "pr-screen",
    "aria-label": "Screening room",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("p", {
    className: "pr-eyebrow",
    style: {
      margin: 0
    }
  }, "Screening room"), /*#__PURE__*/React.createElement("div", {
    className: "pr-screen__house"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-screen__frame"
  }, src && kind === 'iframe' ? /*#__PURE__*/React.createElement("iframe", {
    src: src,
    title: title,
    allow: "fullscreen; picture-in-picture",
    loading: "lazy"
  }) : null, src && kind === 'video' ? /*#__PURE__*/React.createElement("video", {
    src: src,
    poster: poster,
    controls: true,
    preload: "none",
    title: title
  }) : null, !src ? /*#__PURE__*/React.createElement(__ds_scope.ImageSlot, {
    src: poster,
    label: "Video slot \xB7 not yet supplied",
    ratio: "16:9",
    focal: "50% 45%"
  }) : null)), caption || year ? /*#__PURE__*/React.createElement("div", {
    className: "pr-screen__cap"
  }, caption ? /*#__PURE__*/React.createElement("cite", {
    className: "pr-still__cap-prod"
  }, caption) : null, year ? /*#__PURE__*/React.createElement("span", {
    className: "pr-still__cap-year"
  }, year) : null) : null);
}
Object.assign(__ds_scope, { ScreeningRoom });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/ScreeningRoom.jsx", error: String((e && e.message) || e) }); }

// components/media/Still.jsx
try { (() => {
function Still({
  src,
  alt = '',
  ratio = '2.39/1',
  focal = '50% 40%',
  production,
  year,
  index,
  width = '100%',
  align = 'center',
  label,
  duotone = false,
  parallax = true,
  onOpen
}) {
  const ref = React.useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--cursor-x', e.clientX - r.left + 'px');
    el.style.setProperty('--cursor-y', e.clientY - r.top + 'px');
  };
  const MediaTag = onOpen ? 'button' : 'div';
  const ratioLabel = ratio.replace('/', ':');
  return /*#__PURE__*/React.createElement("figure", {
    className: 'pr-still pr-still--' + align,
    style: {
      width: width
    },
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement(MediaTag, {
    ref: ref,
    className: 'pr-still__media' + (onOpen ? ' pr-still__media--button' : ''),
    style: {
      aspectRatio: ratio
    },
    "data-cursor": "",
    "data-parallax-root": parallax ? '' : undefined,
    onMouseMove: onMove,
    onMouseEnter: () => ref.current && ref.current.classList.add('is-lit'),
    onMouseLeave: () => ref.current && ref.current.classList.remove('is-lit'),
    onClick: onOpen,
    "aria-label": onOpen ? 'Open still' + (production ? ': ' + production : '') : undefined,
    type: onOpen ? 'button' : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-still__layer",
    "data-depth": parallax ? '0.12' : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.ImageSlot, {
    src: src,
    alt: alt,
    focal: focal,
    ratio: ratioLabel,
    label: label || 'Still',
    duotone: duotone
  })), /*#__PURE__*/React.createElement("div", {
    className: "pr-still__vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-spot"
  })), production || year || index ? /*#__PURE__*/React.createElement("figcaption", {
    className: "pr-still__cap"
  }, production ? /*#__PURE__*/React.createElement("cite", {
    className: "pr-still__cap-prod"
  }, production) : null, year ? /*#__PURE__*/React.createElement("span", {
    className: "pr-still__cap-year"
  }, year) : null, index ? /*#__PURE__*/React.createElement("span", {
    className: "pr-still__cap-idx"
  }, index) : null) : null);
}
Object.assign(__ds_scope, { Still });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Still.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Monogram.jsx
try { (() => {
function Monogram({
  size = 30,
  href,
  label = 'Paige Robinson, home'
}) {
  const inner = [React.createElement('span', {
    key: 'p'
  }, 'P'), React.createElement('span', {
    key: 'r',
    className: 'pr-mono__r'
  }, 'R')];
  const style = {
    fontSize: size
  };
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: "pr-mono",
    href: href,
    style: style,
    "aria-label": label
  }, inner);
  return /*#__PURE__*/React.createElement("span", {
    className: "pr-mono",
    style: style,
    "aria-hidden": "true"
  }, inner);
}
Object.assign(__ds_scope, { Monogram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Monogram.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileNav.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  numeral: 'I',
  title: 'Overture',
  href: 'index.html'
}, {
  numeral: 'II',
  title: 'Roles',
  href: 'roles.html'
}, {
  numeral: 'III',
  title: 'Stills',
  href: 'stills.html'
}, {
  numeral: 'IV',
  title: 'Portrait',
  href: 'portrait.html'
}, {
  numeral: 'V',
  title: 'Correspondence',
  href: 'correspondence.html'
}];
function MobileNav({
  items = DEFAULT_ITEMS,
  current = 'I',
  open,
  onOpenChange,
  onNavigate,
  isStatic = false,
  location = 'Rochester, New York'
}) {
  const [inner, setInner] = React.useState(false);
  const isOpen = open !== undefined ? open : inner;
  const set = v => {
    if (onOpenChange) onOpenChange(v);
    if (open === undefined) setInner(v);
  };
  React.useEffect(() => {
    if (!isOpen) return;
    const k = e => {
      if (e.key === 'Escape') set(false);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [isOpen]);
  const go = (e, it) => {
    set(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(it);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: 'pr-mnav' + (isStatic ? ' pr-mnav--static' : '')
  }, /*#__PURE__*/React.createElement(__ds_scope.Monogram, {
    href: items[0].href,
    size: 26
  }), /*#__PURE__*/React.createElement("button", {
    className: "pr-mnav__btn",
    "aria-expanded": isOpen,
    "aria-controls": "pr-overlay",
    onClick: () => set(true)
  }, "Index ", /*#__PURE__*/React.createElement("span", {
    className: "pr-mnav__bars",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)))), /*#__PURE__*/React.createElement("div", {
    id: "pr-overlay",
    className: 'pr-overlay' + (isOpen ? ' is-open' : '') + (isStatic ? ' pr-overlay--static' : ''),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Program index",
    "aria-hidden": !isOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-overlay__top"
  }, /*#__PURE__*/React.createElement(__ds_scope.Monogram, {
    size: 26
  }), /*#__PURE__*/React.createElement("button", {
    className: "pr-mnav__btn",
    onClick: () => set(false)
  }, "Close")), /*#__PURE__*/React.createElement("ol", {
    className: "pr-overlay__list"
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.numeral
  }, /*#__PURE__*/React.createElement("a", {
    className: "pr-overlay__link",
    href: it.href,
    onClick: e => go(e, it),
    "aria-current": it.numeral === current ? 'page' : undefined,
    tabIndex: isOpen ? 0 : -1
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-overlay__num"
  }, it.numeral), /*#__PURE__*/React.createElement("span", {
    className: "pr-overlay__title"
  }, it.title))))), /*#__PURE__*/React.createElement("span", {
    className: "pr-overlay__meta"
  }, location)));
}
Object.assign(__ds_scope, { MobileNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/RailNav.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  numeral: 'I',
  title: 'Overture',
  href: 'index.html'
}, {
  numeral: 'II',
  title: 'Roles',
  href: 'roles.html'
}, {
  numeral: 'III',
  title: 'Stills',
  href: 'stills.html'
}, {
  numeral: 'IV',
  title: 'Portrait',
  href: 'portrait.html'
}, {
  numeral: 'V',
  title: 'Correspondence',
  href: 'correspondence.html'
}];
function RailNav({
  items = DEFAULT_ITEMS,
  current = 'I',
  onNavigate,
  isStatic = false,
  homeHref
}) {
  const handle = (e, it) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(it);
    }
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: 'pr-rail' + (isStatic ? ' pr-rail--static' : ''),
    "aria-label": "Program"
  }, /*#__PURE__*/React.createElement(__ds_scope.Monogram, {
    href: homeHref || items[0].href,
    size: 30
  }), /*#__PURE__*/React.createElement("ol", {
    className: "pr-rail__index"
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.numeral,
    className: "pr-rail__item",
    "aria-current": it.numeral === current ? 'page' : undefined
  }, /*#__PURE__*/React.createElement("a", {
    className: "pr-rail__link",
    href: it.href,
    onClick: e => handle(e, it),
    "aria-current": it.numeral === current ? 'page' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-rail__num"
  }, it.numeral), /*#__PURE__*/React.createElement("span", {
    className: "pr-rail__title"
  }, it.title))))), /*#__PURE__*/React.createElement("span", {
    className: "pr-rail__foot"
  }, "Soprano"));
}
Object.assign(__ds_scope, { RailNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/RailNav.jsx", error: String((e && e.message) || e) }); }

// components/program/CreditFilter.jsx
try { (() => {
const OPTS = [{
  value: 'all',
  label: 'All'
}, {
  value: 'opera',
  label: 'Opera'
}, {
  value: 'mt',
  label: 'Musical Theatre'
}];
function CreditFilter({
  value = 'all',
  onChange,
  options = OPTS
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-filter",
    role: "group",
    "aria-label": "Show"
  }, options.map((o, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: o.value
  }, i > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "pr-filter__dot",
    "aria-hidden": "true"
  }, "\xB7") : null, /*#__PURE__*/React.createElement("button", {
    className: "pr-filter__opt",
    "aria-pressed": value === o.value,
    onClick: () => onChange && onChange(o.value)
  }, o.label))));
}
Object.assign(__ds_scope, { CreditFilter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/program/CreditFilter.jsx", error: String((e && e.message) || e) }); }

// components/program/CreditYear.jsx
try { (() => {
const KIND = {
  opera: 'Opera',
  mt: 'Musical Theatre'
};
function CreditYear({
  year,
  roles = [],
  filter = 'all'
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "pr-year",
    "aria-label": String(year)
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pr-year__num",
    "data-reveal": ""
  }, year), /*#__PURE__*/React.createElement("ol", {
    className: "pr-year__lines",
    "data-stagger": "150"
  }, roles.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: 'pr-credit pr-line' + (filter !== 'all' && r.kind !== filter ? ' is-muted' : ''),
    "data-reveal": "",
    "data-photo": r.photo || year + '-' + i,
    "data-photo-label": r.role + ' · ' + r.production
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-credit__role"
  }, r.role), /*#__PURE__*/React.createElement("span", {
    className: "pr-credit__meta"
  }, /*#__PURE__*/React.createElement("cite", {
    className: "pr-credit__prod"
  }, r.production), /*#__PURE__*/React.createElement("span", {
    className: "pr-credit__co"
  }, r.company), /*#__PURE__*/React.createElement("span", {
    className: "pr-credit__kind"
  }, KIND[r.kind] || r.kind))))));
}
Object.assign(__ds_scope, { CreditYear });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/program/CreditYear.jsx", error: String((e && e.message) || e) }); }

// components/program/Personae.jsx
try { (() => {
function Personae({
  groups = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-personae",
    "data-stagger": "150"
  }, groups.map(g => /*#__PURE__*/React.createElement("section", {
    key: g.label,
    className: "pr-personae__group",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pr-personae__label"
  }, g.label), /*#__PURE__*/React.createElement("span", {
    className: "pr-personae__rule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "pr-personae__names"
  }, g.names.map((n, i) => {
    const o = typeof n === 'string' ? {
      name: n
    } : n;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "pr-personae__name"
    }, o.name, o.note ? /*#__PURE__*/React.createElement("span", {
      className: "pr-personae__note"
    }, o.note) : null);
  })))));
}
Object.assign(__ds_scope, { Personae });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/program/Personae.jsx", error: String((e && e.message) || e) }); }

// components/program/PlainList.jsx
try { (() => {
function PlainList({
  title,
  items = [],
  quiet = false,
  stacked = false
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: 'pr-plain' + (quiet ? ' pr-plain--quiet' : '') + (stacked ? ' pr-plain--stacked' : '')
  }, title ? /*#__PURE__*/React.createElement("h2", {
    className: "pr-plain__title",
    "data-reveal": ""
  }, title) : null, /*#__PURE__*/React.createElement("ul", {
    className: "pr-plain__list",
    "data-stagger": "150"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "pr-plain__item",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-plain__text"
  }, it.text, it.detail ? /*#__PURE__*/React.createElement("span", {
    className: "pr-plain__detail"
  }, it.detail) : null), it.meta ? /*#__PURE__*/React.createElement("span", {
    className: "pr-plain__meta"
  }, it.meta) : null))));
}
Object.assign(__ds_scope, { PlainList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/program/PlainList.jsx", error: String((e && e.message) || e) }); }

// components/program/RecentRoles.jsx
try { (() => {
function RecentRoles({
  items = [],
  photos = {}
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.HoverPhotoField, {
    photos: photos
  }, /*#__PURE__*/React.createElement("ol", {
    className: "pr-recent",
    "data-stagger": "150"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "pr-recent__line pr-line",
    "data-reveal": "",
    "data-photo": it.photo || 'recent-' + i,
    "data-photo-label": it.role + ' · ' + it.year
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-recent__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-recent__role"
  }, it.role), /*#__PURE__*/React.createElement("span", {
    className: "pr-recent__prod"
  }, it.production)), /*#__PURE__*/React.createElement("span", {
    className: "pr-recent__year"
  }, it.year)))));
}
Object.assign(__ds_scope, { RecentRoles });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/program/RecentRoles.jsx", error: String((e && e.message) || e) }); }

// components/type/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  wide = false,
  as = 'p',
  style
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    className: 'pr-eyebrow' + (wide ? ' pr-eyebrow--wide' : ''),
    style: Object.assign({
      margin: 0
    }, style)
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/type/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/type/GrandLink.jsx
try { (() => {
function GrandLink({
  href,
  children,
  eyebrow,
  size = 'email',
  below
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pr-grand-wrap",
    "data-reveal": ""
  }, eyebrow ? /*#__PURE__*/React.createElement("p", {
    className: "pr-eyebrow",
    style: {
      margin: 0
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("a", {
    className: 'pr-grand pr-grand--' + size,
    href: href
  }, children), below ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--type-small)'
    }
  }, below) : null);
}
Object.assign(__ds_scope, { GrandLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/type/GrandLink.jsx", error: String((e && e.message) || e) }); }

// components/type/Hairline.jsx
try { (() => {
function Hairline({
  tone = 'candle',
  width = '100%',
  align = 'left',
  style
}) {
  const m = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : 0;
  const cls = 'pr-rule' + (tone === 'sand' ? ' pr-rule--sand' : tone === 'moss' ? ' pr-rule--moss' : '');
  return /*#__PURE__*/React.createElement("hr", {
    className: cls,
    style: Object.assign({
      width: width,
      margin: m
    }, style)
  });
}
Object.assign(__ds_scope, { Hairline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/type/Hairline.jsx", error: String((e && e.message) || e) }); }

// components/type/PageTitle.jsx
try { (() => {
function PageTitle({
  numeral,
  title,
  lede,
  align = 'left',
  as = 'h1'
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement("header", {
    className: 'pr-pagetitle' + (align === 'center' ? ' pr-pagetitle--center' : ''),
    "data-reveal": ""
  }, numeral ? /*#__PURE__*/React.createElement("span", {
    className: "pr-pagetitle__num",
    "aria-hidden": "true"
  }, numeral, ".") : null, /*#__PURE__*/React.createElement(Tag, {
    className: "pr-pagetitle__title",
    "data-title": ""
  }, numeral ? /*#__PURE__*/React.createElement("span", {
    className: "pr-sr"
  }, numeral, ". ") : null, title), lede ? /*#__PURE__*/React.createElement("p", {
    className: "pr-pagetitle__lede"
  }, lede) : null);
}
Object.assign(__ds_scope, { PageTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/type/PageTitle.jsx", error: String((e && e.message) || e) }); }

// motion/motion.js
try { (() => {
/* Paige Robinson — motion layer. Vanilla, no dependencies. Load with <script src="motion/motion.js" defer>.
   Attributes: data-reveal[=fade|scale], data-delay (ms), data-stagger (ms, on a parent), data-title,
   data-parallax-root + data-depth, data-cursor. Honours prefers-reduced-motion and <html data-motion="full|subtle|off">.
   Content is never hidden by CSS until this script has run (html.pr-motion-ready). */
(function () {
  var html = document.documentElement;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var stored = null;
  try {
    stored = localStorage.getItem('pr-motion');
  } catch (e) {}
  var mode = stored || html.getAttribute('data-motion') || (reduced ? 'off' : 'full');
  html.setAttribute('data-motion', mode);
  function revealAll() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* Reveals */
  var io = null;
  function prepare(el) {
    if (el.__pr) return;
    el.__pr = 1;
    var d = parseInt(el.getAttribute('data-delay') || '0', 10);
    var p = el.parentElement && el.parentElement.closest('[data-stagger]');
    if (p) {
      var step = parseInt(p.getAttribute('data-stagger') || '150', 10);
      var sibs = Array.prototype.filter.call(p.querySelectorAll('[data-reveal]'), function (n) {
        return n.closest('[data-stagger]') === p;
      });
      d += Math.min(sibs.indexOf(el), 8) * step;
    }
    if (d) el.style.setProperty('--reveal-delay', d + 'ms');
    if (io) io.observe(el);else el.classList.add('is-revealed');
  }
  function scan(root) {
    (root || document).querySelectorAll('[data-reveal]').forEach(prepare);
  }
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed');
          io.unobserve(en.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });
  }

  /* Parallax */
  var roots = [];
  function collectParallax() {
    roots = Array.prototype.slice.call(document.querySelectorAll('[data-parallax-root]'));
  }
  var ticking = false;
  function parallax() {
    ticking = false;
    if (mode !== 'full' || reduced) {
      roots.forEach(function (r) {
        r.querySelectorAll('[data-depth]').forEach(function (l) {
          l.style.transform = '';
        });
      });
      return;
    }
    var vh = window.innerHeight;
    roots.forEach(function (r) {
      var b = r.getBoundingClientRect();
      if (b.bottom < -100 || b.top > vh + 100) return;
      var off = b.top + b.height / 2 - vh / 2;
      r.querySelectorAll('[data-depth]').forEach(function (l) {
        var depth = parseFloat(l.getAttribute('data-depth')) || 0.15;
        l.style.transform = 'translate3d(0,' + (off * -depth * 0.5).toFixed(1) + 'px,0)';
      });
    });
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(parallax);
    }
  }

  /* Spotlight cursor (fine pointers only; no custom dot or ring) */
  function bindCursor(el) {
    if (el.__prc || !fine) return;
    el.__prc = 1;
    el.addEventListener('pointermove', function (e) {
      var b = el.getBoundingClientRect();
      el.style.setProperty('--cursor-x', e.clientX - b.left + 'px');
      el.style.setProperty('--cursor-y', e.clientY - b.top + 'px');
    });
    el.addEventListener('pointerenter', function () {
      el.classList.add('is-lit');
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('is-lit');
    });
  }

  /* Grain + dissolve */
  function ensureLayers() {
    if (!document.querySelector('.pr-grain')) {
      var g = document.createElement('div');
      g.className = 'pr-grain';
      g.setAttribute('aria-hidden', 'true');
      document.body.appendChild(g);
    }
    var d = document.querySelector('.pr-dissolve');
    if (!d) {
      d = document.createElement('div');
      d.className = 'pr-dissolve';
      d.setAttribute('aria-hidden', 'true');
      document.body.appendChild(d);
    }
    return d;
  }
  function dissolveTo(href) {
    var d = ensureLayers();
    if (mode === 'off' || reduced) {
      location.href = href;
      return;
    }
    d.classList.add('is-active');
    setTimeout(function () {
      location.href = href;
    }, 600);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname && url.hash || /^mailto:|^tel:/.test(a.getAttribute('href'))) return;
    e.preventDefault();
    dissolveTo(url.href);
  });
  window.addEventListener('pageshow', function () {
    var d = ensureLayers();
    d.classList.add('is-active');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        d.classList.remove('is-active');
      });
    });
  });
  function refresh() {
    scan();
    collectParallax();
    document.querySelectorAll('[data-cursor]').forEach(bindCursor);
    parallax();
  }
  function set(m) {
    mode = m;
    html.setAttribute('data-motion', m);
    try {
      localStorage.setItem('pr-motion', m);
    } catch (e) {}
    if (m === 'off') revealAll();
    parallax();
  }
  function init() {
    ensureLayers();
    if (mode !== 'off') html.classList.add('pr-motion-ready');else revealAll();
    refresh();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    if ('MutationObserver' in window) {
      var pending = false;
      new MutationObserver(function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
          refresh();
        });
      }).observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    /* Safety net: anything still hidden after 4s is shown. */
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(function (el) {
        var b = el.getBoundingClientRect();
        if (b.top < innerHeight) el.classList.add('is-revealed');
      });
    }, 4000);
  }
  window.PRMotion = {
    set: set,
    refresh: refresh,
    dissolveTo: dissolveTo,
    get mode() {
      return mode;
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "motion/motion.js", error: String((e && e.message) || e) }); }

// ui_kits/website/Correspondence.jsx
try { (() => {
function Correspondence({
  data
}) {
  const {
    GrandLink,
    UnderlineField,
    ReasonSelect,
    Button
  } = window.PRDS;
  const [sent, setSent] = React.useState(false);
  const email = data.person.email;
  return /*#__PURE__*/React.createElement("section", {
    className: "k-corr"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "pr-sr"
  }, "V. Correspondence"), /*#__PURE__*/React.createElement(GrandLink, {
    href: 'mailto:' + email,
    eyebrow: "V \xB7 Correspondence"
  }, email), sent ? /*#__PURE__*/React.createElement("div", {
    className: "k-sent",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-eyebrow"
  }, "Received"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'var(--type-h3)',
      color: 'var(--text-primary)'
    }
  }, "Thank you. Your note has been sent.")) : /*#__PURE__*/React.createElement("form", {
    className: "k-form",
    action: 'https://formsubmit.co/' + email,
    method: "POST",
    "data-reveal": "",
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_subject",
    value: "Website correspondence"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_captcha",
    value: "false"
  }), /*#__PURE__*/React.createElement("div", {
    className: "k-hp",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("label", null, "Leave empty", /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "_honey",
    tabIndex: -1,
    autoComplete: "off"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "k-form__row"
  }, /*#__PURE__*/React.createElement(UnderlineField, {
    label: "Name",
    name: "name",
    required: true,
    autoComplete: "name"
  }), /*#__PURE__*/React.createElement(UnderlineField, {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(ReasonSelect, null), /*#__PURE__*/React.createElement(UnderlineField, {
    label: "Message",
    name: "message",
    multiline: true,
    rows: 4,
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "k-form__foot"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Or write directly to ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + email,
    style: {
      borderBottom: '1px solid var(--pr-sand-35)'
    }
  }, email)), /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, "Send"))), /*#__PURE__*/React.createElement("div", {
    className: "k-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pr-eyebrow"
  }, "Rochester, New York")));
}
window.Correspondence = Correspondence;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Correspondence.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Overture.jsx
try { (() => {
function Overture({
  data,
  go
}) {
  const {
    OvertureHero,
    RecentRoles,
    Eyebrow,
    GrandLink,
    ImageSlot
  } = window.PRDS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(OvertureHero, {
    enterHref: "#overture-statement"
  }), /*#__PURE__*/React.createElement("section", {
    id: "overture-statement",
    className: "pr-section",
    style: {
      paddingTop: 'var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-statement",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Overture"), /*#__PURE__*/React.createElement(Placeholder, {
    kind: "Statement"
  }, "A short statement from Paige, in her own words. Roughly 60 to 90 words. To be supplied."))), /*#__PURE__*/React.createElement("section", {
    className: "pr-section",
    "aria-labelledby": "recent-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2",
    style: {}
  }, /*#__PURE__*/React.createElement("span", {
    id: "recent-h"
  }, "Recent roles")), /*#__PURE__*/React.createElement("a", {
    className: "pr-btn pr-btn--text",
    href: "#/roles",
    onClick: e => {
      e.preventDefault();
      go('roles');
    }
  }, "All roles \xB7 II")), /*#__PURE__*/React.createElement(RecentRoles, {
    items: data.recent
  }))), /*#__PURE__*/React.createElement("section", {
    className: "k-closing",
    "data-parallax-root": "",
    "data-cursor": ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-closing__bg",
    "data-depth": "0.2"
  }, /*#__PURE__*/React.createElement(ImageSlot, {
    label: "Closing still \xB7 full-bleed",
    ratio: "2.39:1",
    focal: "50% 45%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "k-closing__vig"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-spot"
  }), /*#__PURE__*/React.createElement(GrandLink, {
    href: "#/correspondence",
    size: "display",
    eyebrow: "V"
  }, "Correspondence")));
}
window.Overture = Overture;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Overture.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Placeholder.jsx
try { (() => {
function Placeholder({
  kind,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "k-placeholder",
    role: "note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k-placeholder__kind"
  }, "Placeholder \xB7 ", kind), /*#__PURE__*/React.createElement("p", {
    className: "k-placeholder__body"
  }, children));
}
window.Placeholder = Placeholder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Placeholder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Portrait.jsx
try { (() => {
function Portrait({
  data
}) {
  const {
    PageTitle,
    ImageSlot,
    Personae,
    PlainList,
    Eyebrow
  } = window.PRDS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "pr-section k-mobile-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap k-portrait"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-portrait__text"
  }, /*#__PURE__*/React.createElement(PageTitle, {
    numeral: "IV",
    title: "Portrait"
  }), /*#__PURE__*/React.createElement("div", {
    "data-reveal": "",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--type-lead)',
      fontFamily: 'var(--font-serif)',
      color: 'var(--text-primary)',
      lineHeight: 1.45
    }
  }, "Soprano, based in Rochester, New York."), /*#__PURE__*/React.createElement(Placeholder, {
    kind: "Biography"
  }, "Full biography to be supplied. Narrow single column, about 250 to 400 words, set in the body style below this lead line."))), /*#__PURE__*/React.createElement("figure", {
    className: "k-portrait__fig",
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement("span", {
    className: "k-portrait__frame",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "k-portrait__media",
    "data-cursor": ""
  }, /*#__PURE__*/React.createElement(ImageSlot, {
    label: "Portrait \xB7 headshot",
    ratio: "2:3",
    focal: "50% 28%"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pr-still__vignette"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "pr-section",
    "aria-labelledby": "dp-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'clamp(48px,7vw,88px)'
    },
    "data-reveal": ""
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Collaborators"), /*#__PURE__*/React.createElement("h2", {
    id: "dp-h",
    style: {
      fontSize: 'var(--type-h1)',
      fontStyle: 'italic',
      marginTop: 14
    }
  }, "Dramatis personae")), /*#__PURE__*/React.createElement(Personae, {
    groups: data.personae
  }))), /*#__PURE__*/React.createElement("section", {
    className: "pr-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap k-twocol"
  }, /*#__PURE__*/React.createElement(PlainList, {
    title: "Education",
    items: data.education,
    quiet: true,
    stacked: true
  }), /*#__PURE__*/React.createElement(PlainList, {
    title: "Skills",
    items: data.skills,
    quiet: true,
    stacked: true
  }))));
}
window.Portrait = Portrait;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Portrait.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Roles.jsx
try { (() => {
function Roles({
  data
}) {
  const {
    PageTitle,
    CreditFilter,
    CreditYear,
    HoverPhotoField,
    PlainList
  } = window.PRDS;
  const [f, setF] = React.useState('all');
  return /*#__PURE__*/React.createElement("section", {
    className: "pr-section k-mobile-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-head"
  }, /*#__PURE__*/React.createElement(PageTitle, {
    numeral: "II",
    title: "Roles"
  }), /*#__PURE__*/React.createElement(CreditFilter, {
    value: f,
    onChange: setF
  })), /*#__PURE__*/React.createElement(HoverPhotoField, null, data.credits.map(y => /*#__PURE__*/React.createElement(CreditYear, {
    key: y.year,
    year: y.year,
    roles: y.roles,
    filter: f
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement(PlainList, {
    title: "Competitions",
    items: data.competitions
  }), /*#__PURE__*/React.createElement(PlainList, {
    title: "Scholarships and Awards",
    items: data.awards
  }), /*#__PURE__*/React.createElement(PlainList, {
    title: "Programs",
    items: data.programs
  }))));
}
window.Roles = Roles;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Roles.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Stills.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stills({
  data
}) {
  const {
    PageTitle,
    Still,
    ScreeningRoom,
    AudioList,
    Lightbox,
    Eyebrow
  } = window.PRDS;
  const [open, setOpen] = React.useState(null);
  const n = data.stills.length;
  const items = data.stills.map(s => Object.assign({
    ratio: '2.39/1'
  }, s));
  const first = items.slice(0, 3),
    rest = items.slice(3);
  const pad = i => (i < 9 ? '0' : '') + (i + 1);
  const still = (s, i) => /*#__PURE__*/React.createElement(Still, _extends({
    key: i
  }, s, {
    index: pad(i) + ' / ' + (n < 10 ? '0' : '') + n,
    onOpen: () => setOpen(i)
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "pr-section k-stills-head k-mobile-pad",
    style: {
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-wrap"
  }, /*#__PURE__*/React.createElement(PageTitle, {
    numeral: "III",
    title: "Stills"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "k-stills"
  }, first.map((s, i) => still(s, i)), /*#__PURE__*/React.createElement("div", {
    className: "k-wrap",
    style: {
      maxWidth: '64rem'
    }
  }, /*#__PURE__*/React.createElement(ScreeningRoom, {
    caption: "Video excerpt \xB7 title pending"
  })), rest.map((s, i) => still(s, i + 3)), /*#__PURE__*/React.createElement("section", {
    className: "k-wrap",
    style: {
      maxWidth: '48rem'
    },
    "aria-labelledby": "audio-h"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: "audio-h"
  }, "Audio excerpts")), /*#__PURE__*/React.createElement(AudioList, {
    items: data.audio
  }))), /*#__PURE__*/React.createElement(Lightbox, {
    items: items,
    index: open === null ? 0 : open,
    open: open !== null,
    onIndex: setOpen,
    onClose: () => setOpen(null)
  }));
}
window.Stills = Stills;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Stills.jsx", error: String((e && e.message) || e) }); }

__ds_ns.MotionSwitch = __ds_scope.MotionSwitch;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ReasonSelect = __ds_scope.ReasonSelect;

__ds_ns.UnderlineField = __ds_scope.UnderlineField;

__ds_ns.OvertureHero = __ds_scope.OvertureHero;

__ds_ns.AudioList = __ds_scope.AudioList;

__ds_ns.HoverPhotoField = __ds_scope.HoverPhotoField;

__ds_ns.ImageSlot = __ds_scope.ImageSlot;

__ds_ns.Lightbox = __ds_scope.Lightbox;

__ds_ns.ScreeningRoom = __ds_scope.ScreeningRoom;

__ds_ns.Still = __ds_scope.Still;

__ds_ns.MobileNav = __ds_scope.MobileNav;

__ds_ns.Monogram = __ds_scope.Monogram;

__ds_ns.RailNav = __ds_scope.RailNav;

__ds_ns.CreditFilter = __ds_scope.CreditFilter;

__ds_ns.CreditYear = __ds_scope.CreditYear;

__ds_ns.Personae = __ds_scope.Personae;

__ds_ns.PlainList = __ds_scope.PlainList;

__ds_ns.RecentRoles = __ds_scope.RecentRoles;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GrandLink = __ds_scope.GrandLink;

__ds_ns.Hairline = __ds_scope.Hairline;

__ds_ns.PageTitle = __ds_scope.PageTitle;

})();
