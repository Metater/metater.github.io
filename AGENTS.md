# AGENTS.md — Metater.net

This file is the operating guide for coding agents working in this repository. Read it before changing source, content, assets, generated output, deployment files, or the preserved Unity WebGL shell.

The repository is the source for both:

- `https://metater.net` on Cloudflare Pages, which is the canonical site.
- `https://metater.github.io` on GitHub Pages, which is a functional mirror whose canonical metadata still points to `metater.net`.

The site belongs to Connor Myers and is led visually by the **Metater** brand. It presents games, open-source Unity tooling, multiplayer systems, and selected technical/creative projects.

## Non-negotiable project rules

1. Keep the site statically generated. Do not convert it to an SPA or add a framework runtime.
2. Use Astro components, content collections, authored CSS, and minimal progressive JavaScript.
3. Ordinary content pages should work without JavaScript. JavaScript is reserved for genuinely live or interactive features.
4. Always regenerate and commit `dist/` after changing source, content, public assets, or build configuration.
5. Never edit generated `dist/` files as the source of truth. Edit `src/`, `public/`, `functions/`, or configuration, then run `npm run build`.
6. Preserve the complete `public/hypercone-visualizer/` directory and its public `/hypercone-visualizer/` output. The Unity binaries remain externally hosted.
7. Do not change the Hypercone `assets.metater.net` versioned build URLs or asset-host CORS behavior without testing both public origins.
8. Keep internal site links root-relative so they work on both hosting origins.
9. Canonical URLs, Open Graph URLs, sitemap URLs, and structured-data site URLs must use `https://metater.net`.
10. Do not add a root `CNAME`. Cloudflare Pages owns the canonical custom domain; GitHub Pages is the mirror.
11. Do not add analytics, trackers, contact-form services, autoplay video, decorative background video, large client libraries, or framework hydration without explicit approval.
12. Claims, metrics, roles, statuses, company relationships, and release information must be factual and approved. Do not invent marketing claims.

## Start every task here

This repository contains a `.codegraph/` index. When locating or understanding code, use CodeGraph before broad text searches:

```powershell
codegraph.cmd explore "the component, route, schema, or behavior you need to understand"
```

Use `rg` or `rg --files` afterward for exact strings, asset paths, and verification. If CodeGraph is unavailable, continue with `rg` and direct file reads.

Before editing:

```powershell
git status --short
```

The worktree may contain user changes. Preserve unrelated modifications and never discard or overwrite them. Avoid destructive Git commands.

## Technology and build contract

- Node.js: 24
- Package manager: npm with committed `package-lock.json`
- Framework: Astro 7 in static-output mode
- Language: Astro, TypeScript, JavaScript, JSON, and authored CSS
- Fonts: self-hosted Manrope variable and IBM Plex Mono through `@fontsource`
- Main commands:

```powershell
npm ci
npm run dev
npm run check
npm run build
```

On Windows PowerShell systems where `npm.ps1` is blocked, use:

```powershell
npm.cmd run dev
npm.cmd run check
npm.cmd run build
```

`npm run build` runs `astro check` followed by `astro build`. It must finish with zero errors. The production output is `dist/`, using real nested `index.html` files and trailing-slash routes.

The GitHub Actions workflow in `.github/workflows/pages.yml` performs a clean `npm ci`, rebuilds, and fails if generated `dist/` differs from the committed output. A source change without regenerated output is therefore incomplete.

## Repository map

```text
/
├── .github/workflows/pages.yml       GitHub Pages build and deploy workflow
├── functions/api/                    Cloudflare Pages Functions
├── public/                           Files copied into dist without bundling
│   ├── hypercone-visualizer/         Preserved Unity HTML shell and TemplateData
│   ├── media/projects/               Project/adopter artwork
│   ├── media/steam/                  Steam capsules, heroes, screenshots
│   ├── _headers                      Cloudflare response-header rules
│   └── metadata assets               Favicons, manifest, OG image, robots
├── src/
│   ├── components/                   Shared Astro UI and progressive JS
│   ├── content/                      Typed JSON content collections
│   │   ├── adopters/
│   │   ├── games/
│   │   └── projects/
│   ├── layouts/BaseLayout.astro      Global metadata, header, main, footer
│   ├── pages/                        Static routes and dynamic collection routes
│   └── styles/global.css             Entire site design system
├── src/content.config.ts             Zod schemas for structured content
├── astro.config.mjs                  Static build and local Steam API proxy
└── dist/                             Committed generated production output
```

## Current route architecture

- `/` — brand-led home page.
- `/metavoicechat/` — flagship MetaVoiceChat product page.
- `/steam/` — editorial Steam catalog.
- `/steam/<slug>/` — generated game detail pages from `src/content/games/*.json`.
- `/portfolio/` — project index.
- `/portfolio/<slug>/` — generated project pages from `src/content/projects/*.json` unless a project defines `customPath`.
- `/contact/` — contact and Ko-fi support page.
- `/demos/hypercone-visualizer/` — focused opt-in demo launcher.
- `/hypercone-visualizer/` — preserved Unity shell output. It is not promoted as a separate-launch option in the UI.
- `/404.html` — branded static 404.
- `/sitemap.xml` — explicit canonical route list from `src/pages/sitemap.xml.ts`.

Navigation priority is always:

1. MetaVoiceChat
2. Steam
3. Portfolio
4. Contact

Do not reorder this without explicit direction.

## Visual and editorial direction

The design is **Precision Editorial**, not “gamer neon,” a dashboard, or a generic startup landing page.

Core colors are defined as CSS custom properties in `src/styles/global.css`:

- Deep green-graphite base around `#121613`
- Canvas around `#171C18`
- Surface around `#1D241F`
- Raised surface around `#252E27`
- Borders around `#344238`
- Primary text around `#F1F5F2`
- Muted text around `#9DA9A0`
- Bright green accent around `#69F58B`

Use the green accent sparingly for focus rings, links, selected navigation, small labels, metrics, and primary action details. Do not create broad neon glows or large green backgrounds.

Design traits to preserve:

- Large editorial headings with tight letter spacing.
- Generous vertical space and restrained asymmetry.
- Fine borders and clearly divided sections.
- Manrope for display/body text and IBM Plex Mono for metadata.
- Root `.shell` containers and existing responsive breakpoints.
- Short opacity/transform transitions only.
- Full functionality with `prefers-reduced-motion: reduce`.
- No animated cursor, persistent glow, parallax, page-transition framework, or visual clutter.

Reuse existing classes and compositions before inventing new ones:

- `.shell`
- `.hero`, `.hero__grid`, `.hero__aside`
- `.section`, `.section--tight`, `.section-heading`, `.section-title`
- `.section-number`, `.kicker`, `.meta-label`
- `.button`, `.button--primary`, `.button--quiet`, `.button-row`
- `.tag-list`, `.editorial-list`
- `.media-card`, `.path-card`, `.proof-band`
- `.case-hero`, `.case-grid`
- `.game-feature`, `.game-detail-*`, `.game-gallery`, `.game-pillars`
- `.metric-row`

When adding CSS:

1. Search `src/styles/global.css` for an existing pattern.
2. Add styles to the relevant conceptual section instead of appending disconnected overrides.
3. Add responsive behavior to the existing `900px` and `620px` media blocks when appropriate.
4. Confirm the layout at desktop and narrow mobile widths.
5. Avoid fixed heights unless the media composition truly requires them.
6. Preserve visible focus, adequate contrast, and 44×44 minimum interactive targets.

## Editorial voice and factual wording

The writing should be direct, specific, and confident. Avoid inflated case-study language, self-congratulatory filler, and cheesy marketing phrases.

Good:

- “I made Hypercone Visualizer for a college cosmology class.”
- “It lets you look into the fourth dimension through an interactive four-dimensional hypercone visualization.”
- “Airport Security Sucks! was made under Jatater Worldwide.”

Avoid:

- Turning every small project into a grand business transformation.
- Claiming a feature “revolutionizes,” “redefines,” or “unlocks limitless possibilities.”
- Describing games as “collaborations” when that wording was not approved.
- Calling Turkey Bois permanently independent or implying a definite future plan.
- Writing “Jatater Worldwide LLC.” The approved public name is **Jatater Worldwide**.
- Reintroducing the removed Steam-page copy about “three titles,” “two collaborations,” or “one independent project.”

Current relationship wording:

- Jatater Worldwide is the game studio run by Connor Myers / Metater and JakeHub.
- Airport Security Sucks! and IM LOOPY FOR DOOP LOOPS!!! were made under Jatater Worldwide.
- Turkey Bois is currently on hold. Do not imply it is definitely abandoned, definitely solo, or definitely resuming.

Metrics need clear semantics. For example, the MetaVoiceChat “6M+” figure means aggregate player reach across selected games using MetaVoiceChat. It is not package downloads, monthly active users, or a complete census.

## Content collections

All collection fields are validated in `src/content.config.ts`. Update the schema and every affected entry together when adding or changing fields.

### Games

Game entries live in `src/content/games/<slug>.json`. The filename becomes the URL slug under `/steam/<slug>/`.

Required data includes:

- title, summary, status, and release date
- developer, publisher, studio, and approved role wording
- Steam URL
- catalog image and alt text
- detail-page tagline and overview
- hero image and alt text
- gallery images and alt text
- design/system highlights
- technologies
- metrics
- display order

The shared page is `src/pages/steam/[slug].astro`. Do not create a separate hand-written page for each game unless the game genuinely cannot fit the shared structure.

To add a game:

1. Add optimized media under `public/media/steam/<slug>/`.
2. Add a catalog image under `public/media/steam/`.
3. Create `src/content/games/<slug>.json` matching the schema.
4. Verify the new `/steam/<slug>/` page and catalog card.
5. Add the route to `src/pages/sitemap.xml.ts` if it should be indexed.
6. Run the production build and inspect regenerated `dist/`.

Steam artwork guidance:

- Prefer official supplied Steam media.
- Use WebP or AVIF for large photographic/gameplay media when practical.
- Give all images explicit width, height, and useful alt text.
- Do not use `object-fit: cover` when it cuts off logos, titles, UI, or important text.
- Use a contained presentation with a designed surface for wide logo/banner art.
- Do not dump every supplied image into the page. Select the strongest hero and a small representative gallery.

Metrics use the shared `metric` schema. Keep a methodology note and source/as-of information where available. Never silently change player counts, player-hours, impressions, or release status.

Airport Security Sucks! currently also shows a live Steam current-player count. That behavior is intentionally special-cased by game ID in the Steam templates.

### Projects and full case studies

Project entries live in `src/content/projects/<slug>.json`. By default, `src/pages/portfolio/[slug].astro` generates the project page.

The full case-study structure is intentional and should be used for projects with enough real substance:

1. Challenge — the actual problem or constraint.
2. Responsibilities — what Connor personally owned.
3. Decisions — meaningful implementation choices and tradeoffs.
4. Outcomes — factual results or capabilities enabled.

The fields are:

- `title`
- `eyebrow`
- `summary` — used in cards and SEO description
- `description` — opening project-page paragraph
- `challenge`
- `responsibilities[]`
- `decisions[]`
- `outcomes[]`
- `technologies[]`
- `links[]`
- optional `image` and `imageAlt`
- `featured`
- optional `customPath`
- optional `demo`
- `order`

Use a full case study when:

- Connor can state his specific ownership.
- There were meaningful constraints or tradeoffs.
- Outcomes can be described factually.
- The detail adds useful context beyond a card and technology list.

Do not pad weak material to fill the four sections. A short project should stay short.

`MetaFizzySteamworks` is the current reference for a normal generated technical case study.

### Compact projects

Hypercone Visualizer is intentionally compact. It is a college cosmology-class project that lets the visitor look into the fourth dimension. It does **not** display the four-part Challenge/Responsibility/Decisions/Outcomes block.

The current template detects this with:

```ts
const isHypercone = project.id === 'hypercone-visualizer';
```

This is acceptable for the one existing exception. If another compact project is added, do not accumulate project-ID checks. Generalize the schema instead, for example with a `presentation` field such as `case-study | compact`, update existing JSON entries, and conditionally render from that typed field.

A compact project should still have:

- a clear title and eyebrow
- one short factual summary
- a direct description of what it is and why it exists
- optional technologies, media, links, or demo
- no empty headings or padded business language

If a project needs a wholly unique route, add `customPath` and create a matching page under `src/pages/`. Ensure the portfolio card links to it and add the canonical route to the sitemap.

### Adopters

MetaVoiceChat adopter entries live in `src/content/adopters/*.json` and are rendered on `/metavoicechat/`.

Required concepts include:

- game or open-source project type
- public URL
- approved image and alt text
- precise relationship wording
- optional player/developer reach
- source note and as-of date
- display order

Do not describe this as an exhaustive customer list. Do not imply a commercial relationship where only public usage or attribution is known.

MirrorVR uses the supplied `public/media/projects/mirrorvr.png` branding and the approved “1,000+ developers” statement. Its contained, full-width card treatment is intentional because the logo is extremely wide and should not be cropped.

## Live-data components and progressive JavaScript

### GitHub repository data

`src/components/GitHubRepoStats.astro` renders useful static fallback values first, then refreshes MetaVoiceChat description, stars, forks, and contributor count from the public GitHub API.

Rules:

- Keep meaningful server-rendered fallback content.
- Validate response status and data types.
- Show a quiet fallback status when the API is unavailable.
- Do not hide the whole section because a third-party request failed.
- Do not add an authentication token to client-side source.
- Treat API rate limits and network failure as normal conditions.

### Steam current-player data

`src/components/SteamPlayerCount.astro` fetches `/api/steam-current-players` on the canonical site and localhost. On `metater.github.io`, it fetches `https://metater.net/api/steam-current-players` because GitHub Pages cannot run server functions.

`astro.config.mjs` proxies the local same-origin API path to `https://metater.net`, avoiding browser CORS problems during local development. Changes to Astro configuration require restarting the dev server.

The Cloudflare Pages Function is `functions/api/steam-current-players.js`. It:

- calls Steam’s current-player endpoint for app ID `4285690`
- validates the response shape
- applies short shared caching on success
- returns a stable failure shape on upstream errors
- restricts cross-origin callers to the approved site, mirror, and development origins

Never call the Steam API directly from browser JavaScript; use the function. Never expose secrets in client code. Keep the UI usable when live data is unavailable.

## Interactive demos and Hypercone

`src/components/WebGLLauncher.astro` is the reusable opt-in iframe launcher. It must not create the iframe or assign its `src` until the visitor presses the launch button. This guarantees zero WebGL transfer before activation.

Current launcher behavior includes:

- responsive aspect ratio
- approximate download disclosure
- explicit launch
- loading/progress state
- retry
- unload/return control
- fullscreen
- a single active demo controller
- validated same-origin `postMessage` handling
- focus restoration
- reduced-motion handling

The launcher intentionally has **no “Open separately” support**. Do not reintroduce standalone-launch buttons or fallback links unless explicitly requested.

The trusted Hypercone iframe requires:

- `sandbox="allow-scripts allow-same-origin"`
- fullscreen permission
- same-origin shell hosting

`allow-same-origin` is necessary because the current external Unity asset CORS configuration does not accept an opaque `Origin: null`. This means the sandbox is not a strong security boundary. Never load an untrusted demo into this same-origin arrangement.

Hypercone-specific invariants:

- Keep `public/hypercone-visualizer/` intact.
- Keep the build binaries on `https://assets.metater.net/hypercone-visualizer/Build/`.
- Preserve the versioned `v11` URLs unless a replacement has been tested.
- Do not copy the large `.data`, `.wasm`, framework, or loader build into this repository.
- The shell may use relative `TemplateData` paths.
- The public shell and demo page use `noindex` behavior; the portfolio project remains indexable.
- The build currently does not require cross-origin isolation.

If a future Unity build needs `SharedArrayBuffer` or multithreading, it requires COOP/COEP headers. GitHub Pages cannot provide arbitrary response headers, so such a build must use a dedicated Cloudflare-hosted demo origin or page, with a static fallback on the mirror.

## Metadata, SEO, and indexing

`src/layouts/BaseLayout.astro` owns:

- document title formatting
- description
- canonical link
- favicons and manifest
- Open Graph metadata
- Twitter card metadata
- optional robots noindex
- optional JSON-LD

Use unique page titles and descriptions. Supply an appropriate image when a game or major project has approved artwork.

Structured data must remain factual:

- `Person` for Connor Myers on the home page.
- `SoftwareSourceCode` for MetaVoiceChat.
- `VideoGame` for factual Steam game pages.

Update `src/pages/sitemap.xml.ts` when adding or removing an indexable canonical route. Do not add demo shells, noindex routes, GitHub mirror URLs, or noncanonical URLs.

The favicon and wordmark mark use the supplied astronaut artwork. Do not revert the header to the old plain letter “M.”

## Accessibility requirements

Every feature must preserve:

- semantic landmarks and logical heading order
- the skip link
- keyboard-operable navigation and controls
- visible `:focus-visible` treatment
- descriptive image alt text
- descriptive iframe titles
- persistent error/fallback information for failed interactive content
- AA contrast
- layouts that survive 200% zoom, long text, and narrow viewports
- no information communicated through green alone
- no essential motion

Do not add clickable `<div>` elements. Use links for navigation and buttons for actions. Keep native behavior wherever possible.

## Performance requirements

Preserve the static-first performance model:

- Zero JavaScript on ordinary content pages unless a page has a justified live feature.
- Keep demo-enabled JavaScript small and dependency-free.
- Keep Unity completely unloaded until explicit activation.
- Use lazy loading below the fold.
- Use explicit image dimensions to prevent layout shifts.
- Use optimized AVIF/WebP media where appropriate.
- Do not autoplay video; use posters and `preload="none"`.
- Do not add third-party scripts to the initial release.

When adding a dependency, explain why existing Astro, browser APIs, and CSS cannot reasonably solve the problem. Avoid UI libraries and animation dependencies.

## Deployment behavior

### GitHub Pages

`.github/workflows/pages.yml` is the only intended GitHub Pages publication path. Repository settings must use GitHub Actions, not branch publication.

The workflow uses current major versions of official actions and Node 24. Do not downgrade it to deprecated Node 20-based action versions.

### Cloudflare Pages

Expected project settings:

- production branch: `main`
- build command: `npm run build`
- output directory: `dist`

If Cloudflare logs say “No build command specified. Skipping build step,” the dashboard project settings are wrong even if file upload succeeds. Fix the Cloudflare Pages settings rather than restructuring the repository around a misconfigured deployment.

`public/_headers` is honored by Cloudflare and copied to `dist/_headers`. GitHub Pages cannot reproduce arbitrary response headers.

Cloudflare Functions under `functions/` are available only on Cloudflare Pages. The static GitHub mirror must call the canonical Cloudflare endpoint when it needs server behavior.

## Adding a normal site section or feature

1. Identify whether the feature belongs in existing content, a component, or a route.
2. Use CodeGraph to find its dependencies and current rendering path.
3. Prefer extending a content schema and shared template over duplicating markup.
4. Add the minimum progressive JavaScript needed, with static fallback content.
5. Reuse existing CSS structures and tokens.
6. Add factual metadata and structured data only when appropriate.
7. Add the route to the sitemap if canonical and indexable.
8. Test keyboard behavior, narrow layout, long text, reduced motion, missing images, and failed network requests as relevant.
9. Run the full build.
10. Inspect `git diff` and commit regenerated `dist/` with source changes.

## Validation checklist

At minimum, run:

```powershell
npm.cmd run build
git diff --check
git status --short
```

Also verify as relevant:

- `astro check` reports zero errors, warnings, and hints.
- Every expected route has a generated `dist/.../index.html`.
- Root-relative internal links resolve.
- Sitemap contains only canonical indexable routes.
- Canonical and Open Graph URLs use `https://metater.net`.
- No excluded wording or unapproved claim appears in source or generated HTML.
- Desktop and mobile layouts have no horizontal overflow.
- Images do not crop important titles, logos, or interface text.
- Live-data failure states remain readable.
- Hypercone creates no iframe and transfers no WebGL before launch.
- Only one demo iframe exists at a time.
- The legacy Hypercone shell files still appear in `dist/hypercone-visualizer/`.
- `dist/` exactly reflects a clean production build.

For a clean committed-output check equivalent to CI:

```powershell
npm ci
npm run build
git diff --exit-code -- dist
```

The final command is expected to be clean only after the regenerated output has been committed.

## Common mistakes to avoid

- Editing `dist/` directly.
- Forgetting to commit regenerated `dist/`.
- Adding a route but not the sitemap entry.
- Adding a collection field without updating `src/content.config.ts`.
- Adding a new compact project through another hard-coded ID check instead of generalizing presentation data.
- Cropping wide logo art with `object-fit: cover`.
- Fetching Steam directly from the browser.
- Assuming Cloudflare Functions exist on GitHub Pages.
- Breaking localhost by forcing a cross-origin request that could use the Vite proxy.
- Reintroducing “Open separately” to the demo launcher.
- Loading Unity before explicit launch.
- Changing Hypercone build URLs casually.
- Reverting the astronaut wordmark to a plain “M.”
- Calling Jatater Worldwide an LLC in public copy.
- Making Turkey Bois sound definitively solo, cancelled, or scheduled.
- Turning concise personal work into exaggerated corporate case-study prose.
- Publishing unverified metrics, roles, adopter relationships, testimonials, or roadmap promises.

## Completion standard

A change is complete only when:

1. The requested behavior and copy are present in source.
2. The implementation follows the static-first design and existing visual language.
3. Content claims remain accurate and appropriately qualified.
4. Accessibility and failure states are considered.
5. The production build succeeds.
6. Generated `dist/` is updated.
7. Relevant routes and assets are verified.
8. Unrelated user changes remain untouched.

When reporting work, distinguish clearly between what was statically checked, what was visually inspected, what was tested against live services, and what still requires deployment or external dashboard changes.
