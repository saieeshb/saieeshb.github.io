# saieeshb.github.io

Personal academic portfolio for **Saieesh Bairam** — MBBS candidate at Osmania Medical College and clinical researcher.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Editing content

All page content lives in a single file:

```
src/data/portfolio.ts
```

Update your bio, research projects, publications, experience, education, and skills there — the page rebuilds from that data. No HTML editing needed for routine updates.

## Local development

Requires [Node.js](https://nodejs.org) 18.14 or newer.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:4321
npm run build    # build the production site into ./dist
npm run preview  # preview the production build locally
```

## Deployment

Pushing to the `master` (or `main`) branch triggers the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages.

**One-time setup:** in the repository on GitHub, go to **Settings → Pages** and
set **Source** to **GitHub Actions**.

The site is served at <https://saieeshb.github.io>.

## Project structure

```
├── public/              # static assets (favicon)
├── src/
│   ├── data/
│   │   └── portfolio.ts # ← all site content
│   ├── layouts/
│   │   └── Layout.astro # <head>, fonts, metadata
│   ├── pages/
│   │   └── index.astro  # page structure & sections
│   └── styles/
│       └── global.css   # design system & styles
├── astro.config.mjs
└── package.json
```
