# Metater.net

Static Astro site for Metater and Connor Myers. The generated `dist/` directory is committed so Cloudflare Pages and GitHub Pages publish identical files.

## Local development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm run check
npm run build
```

After changing source or content, commit the regenerated `dist/` alongside the source changes. The GitHub Pages workflow rebuilds from a clean checkout and fails if the generated output differs.

Structured games, projects, and adopters live under `src/content/`. Shared metadata and layout live in `src/layouts/BaseLayout.astro`; the site-wide design system is in `src/styles/global.css`.

## Publishing

- Cloudflare Pages: production branch `main`, build command `npm run build`, output directory `dist`.
- GitHub Pages: select **GitHub Actions** as the publishing source. `.github/workflows/pages.yml` builds, verifies, and deploys `dist/`.
- `metater.net` is canonical. Do not add a GitHub Pages `CNAME`.
- Add `www.metater.net` and its permanent apex redirect in Cloudflare; those DNS/dashboard settings are intentionally not represented as source files.

Cloudflare applies `public/_headers`; GitHub Pages serves the same site but cannot reproduce arbitrary response headers.

## Hypercone Visualizer

The legacy `/hypercone-visualizer/` route is preserved in `public/hypercone-visualizer/`. Its versioned Unity build remains on `assets.metater.net`; do not change the `v11` URLs or asset-host CORS/cache policy without testing both public origins. The portfolio launcher defers all WebGL transfer until a visitor explicitly launches the demo.
