# Paige Robinson, soprano

Static site, no build step. Deployed on Vercel.

## Pages
`index.html` landing (Enter → iris into Home) · `home.html` · `season.html` · `photos.html` · `about.html` (bio, roles, honours, education, personae, headshots) · `contact.html` · `404.html`

## Editing content
All roles, honours, stills, season dates and personae live in **`data.json`**. Edit there only.

- **Add a performance:** add an entry to `season` (see `_season_help` in the file). Past dates move to "Earlier this season" on their own; Home shows "Next performance" once a future date exists.

## Styles and scripts
- `site.css` — palette tokens at the top (gown emerald, ivory, mulberry, champagne), then layouts.
- `_ds/…` — design-system fonts and component styles.
- `site.js` renders content from `data.json`; `motion.js` handles reveals, parallax and page transitions.
- After changing CSS or JS, bump the `?v=N` on the asset links in every page so browsers fetch the new files.

## Before launch
Replace `DOMAIN` in `sitemap.xml` and `robots.txt`. Open items for Paige: the two résumé asterisks, whether to publish her phone number, bio and statement, social links, video and audio, and season dates.
