# Paige Robinson — Design System

Design system for the artist website of **Paige Robinson, soprano**. Based in Rochester, New York. M.Mus. in Performance and Literature, Eastman School of Music, University of Rochester (expected 2028); B.Mus. in Vocal Performance, McGill University, Montréal, 2026. Contact: paige.robinson0@gmail.com.

Audiences: opera companies and casting directors; teachers and programs; presenters and collaborators.

**Source:** a written brief from Matthew (site designer). No codebase, Figma, logo, photographs or existing site were supplied. Everything here is built from that brief. Content in `ui_kits/website/data.json` is verbatim from her résumé as given.

The one product is a **static multi-page website** structured as a program book in five parts: I Overture, II Roles, III Stills, IV Portrait, V Correspondence.

## Open flags (do not resolve by guessing)
- Résumé asterisk next to **Eastman M.Mus. (2028)** — unexplained. Shown without asterisk; flagged in `data.json` and in a comment in `Portrait.jsx`.
- Résumé asterisk next to **Songs for a New World, 2026** — unexplained. Same treatment (`data.json`, `Roles.jsx`).
- Phone **[number withheld]** is withheld until Paige confirms it should be public (`person.phone: null`).
- Not yet supplied: bio, statement, headshot, social links, video, audio excerpts, the ~94 photos. All are labelled placeholder slots.
- Recent roles on Overture: three of the four 2026 credits were chosen (Flora, Lucia, Gherardino/Lauretta cover). Edit `recent` in `data.json`.
- Still captions pair placeholder photos with real productions as a layout demo; match real photos when reviewed.

---

## CONTENT FUNDAMENTALS
- **Voice:** third person, factual, program-book. The site never says "I" or "you" except in the form's thank-you. No exclamation marks, no superlatives, no invented quotes or reviews.
- **Casing:** Titles in Title Case ("Scholarships and Awards", "Dramatis personae" is the one Latin exception in sentence case). Eyebrows/labels are UPPERCASE via CSS with wide tracking — author them in normal case ("Recent roles").
- **Production titles** always italic (`<cite>`/`<em>`): *The Turn of the Screw*. Roles in roman on II Roles, italic in Recent roles. Companies in small caps.
- **Numbering:** parts use roman numerals (I–V); audio lists use lowercase roman (i, ii, iii). Years are old-style numerals in sand.
- **Separators:** middle dot " · " between short items; never slashes or pipes. Ranges written as words when the source does ("2015 to 2022", "2025 and 2026").
- **Placeholders** say exactly what is missing: "Placeholder · Biography — Full biography to be supplied."
- **Emoji:** never. Unicode only for ← → × and ·.
- Examples: "Soprano" · "Recent roles" · "All roles · II" · "Correspondence" · "Rochester, New York" · "© 2026 Paige Robinson".

## VISUAL FOUNDATIONS
- **Mood:** a candlelit opera house after the audience has gone. Chiaroscuro, velvet, program book, film still, generous darkness. Not bright, playful or trendy.
- **Colour:** dark only, five hues — forest `#0B3D2E` (dominant), velvet `#1B4332` (raised/fields/hover rows), moss `#2D6A4F` (hairlines/focus, never a large fill), sand `#DDBEA9` (candlelight: eyebrows, numerals, rules, glow), cream `#F2E9E4` (text at 85–100%). Derived forest shades toward black (`--pr-forest-700…950`) for vignettes, letterbox and dissolve. No other hue, no light theme, no toggle. Sand on moss (3.7:1) is decoration/large only.
- **Type:** Playfair (variable opsz, weight 300) for name, headlines, roles, numerals — high contrast at display sizes, beautiful italic for emphasis and production titles. Hanken Grotesk 300/400 for body and labels. Old-style numerals on by default (`font-variant-numeric: oldstyle-nums` on body). Labels: 10.5–12px uppercase, .24–.32em tracking, sand. "SOPRANO" at .6em.
- **Backgrounds:** solid forest; full-bleed low-key photos; radial vignettes to near-black green at the edges; a faint sand glow behind the name. No patterns, no gradients as decoration beyond vignette/glow.
- **Texture:** film grain overlay across the site (SVG fractal noise, 6% overlay blend, fixed, pointer-events none).
- **Imagery:** darkened, slightly desaturated toward forest (`--photo-filter: brightness(.72) saturate(.7)`), vignetted; forest duotone on one or two hero images only. Letterbox 2.39:1 and full-bleed crops. Never arches, circles, tilted frames, collages, mosaics, stock people, or stretched photos. Every slot declares ratio + focal point.
- **Layout:** fixed 88px left rail on desktop (no top header bar); mobile = monogram + "Index" overlay. Narrow centred columns (34rem), big margins, section gaps 96–192px. Years hang in a left margin column (22%). Stills alternate left/right at varied widths over near-black. No card grids, chip rows, masonry, mosaics, or horizontal scroll strips.
- **Borders:** 1px hairlines only — sand 35% (candle rule), moss (structure), full sand (hero rule, current-page marker, portrait offset frame). **Corner radius: 0 everywhere** (the audio play mark is the only circle).
- **Cards:** there are none. Content sits on the page separated by hairlines.
- **Shadows:** only `--shadow-deep` under the floating hover photo; a faint sand glow (`text-shadow`) on the name.
- **Transparency/blur:** scrim at 94% near-black for overlay/lightbox; blur only as the reveal start state.
- **Animation:** slow and deliberate. Ease `cubic-bezier(.2,.7,.2,1)`. Hovers 300–500ms, dissolve 600ms, reveals 900–1800ms (blur 8px → sharp, 10px drift, 150ms stagger), candle glow 8s cycle, parallax depth .12–.25. Name appears letter by letter (70ms step). Not used: bounce, magnetic buttons, count-ups, spinners, shine sweeps, marquees.
- **Hover:** text → sand (links) or full cream (role lines); siblings dim to 40%; photos lift from `brightness(.72)` to `.82`; form rule moss → sand; outline button fills velvet. **Press:** no shrink; colour only.
- **Focus:** 1px moss outline, 4px offset.
- **Motion modes:** `<html data-motion="full|subtle|off">` + `prefers-reduced-motion`. Subtle = fades only. Content is never hidden until `motion.js` sets `html.pr-motion-ready`.

## ICONOGRAPHY
There is no icon set and none is needed. The brand is typographic: navigation is roman numerals and words; arrows are the Playfair glyphs ← →; close is ×; separators are ·. The only drawn marks are CSS: the audio play triangle/pause bars inside a thin circle, the two-bar menu glyph, and the focal-point cross on placeholder slots. No emoji, no icon font, no SVG icon sprites. If an icon is ever unavoidable (e.g. social glyphs), prefer the platform name in small caps instead.

**Logo:** none supplied. The name is set in Playfair; the "PR" monogram (`Monogram` component) is type only (roman P, italic sand R). Do not draw a mark.

---

## Index
- `styles.css` — entry point (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (incl. z-index), `motion.css`, `effects.css` (vignette, glow, grain, photo filter, aspect ratios), `base.css` (element defaults, reveal states, dissolve), `components.css` (all `pr-` component classes).
- `fonts/` — self-hosted woff2 (latin + latin-ext): Playfair roman/italic (variable 300–700, opsz 5–1200), Hanken Grotesk roman/italic (300–600). SIL OFL, from Google Fonts.
- `motion/motion.js` — vanilla motion layer: reveals, stagger, parallax, spotlight cursor, grain, page dissolve, `window.PRMotion.set(mode)`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Motion, Effects, Brand).
- `components/` — React primitives (below), each with `.jsx`, `.d.ts`, `.prompt.md`; one card per folder.
- `ui_kits/website/` — five-part click-through (`index.html`), mobile frames (`mobile.html`), `data.json`.
- `thumbnail.html`, `SKILL.md`.

## Components
- **navigation/** — `Monogram`, `RailNav`, `MobileNav`
- **type/** — `Eyebrow`, `Hairline`, `PageTitle`, `GrandLink`
- **hero/** — `OvertureHero`
- **program/** — `RecentRoles`, `CreditFilter`, `CreditYear`, `PlainList`, `Personae`
- **media/** — `ImageSlot`, `Still`, `HoverPhotoField`, `ScreeningRoom`, `AudioList`, `Lightbox`
- **forms/** — `Button`, `UnderlineField`, `ReasonSelect`
- **chrome/** — `MotionSwitch`, `SiteFooter`

No source component library existed; this set is authored from the brief's page specs. Intentional additions: `ImageSlot` (shared photo/placeholder primitive with ratio + focal point) and `HoverPhotoField` (shared hover-dim + cursor-following photo for Recent roles and Roles).

## Motion attribute contract
`data-reveal[=fade|scale]`, `data-delay`, `data-stagger` (on parent), `data-title`, `data-parallax-root` + `data-depth` (on child layers), `data-cursor`.
