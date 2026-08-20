# MD. Tanvir Shakil — Portfolio & Research Site

A GitHub-native personal website for an Embedded Systems / IoT / IIoT / AIoT / Edge AI
engineer, positioned for PhD/M.Sc. research applications, research collaboration, and
embedded engineering roles. Built with [Astro](https://astro.build), TypeScript, and
Tailwind CSS v4; content is structured Markdown/JSON validated by Zod schemas; the
whole site builds to static HTML and deploys to **GitHub Pages** via **GitHub
Actions**. Content is editable through a Git-based CMS ([Decap CMS](https://decapcms.org))
mounted at `/admin`, with no database and no always-on server.

---

## 1. Architecture, in brief

```
Content (Markdown/JSON in this repo)
        ↓
Astro Content Collections (Zod-validated at build time)
        ↓
Astro build → static HTML/CSS/JS
        ↓
GitHub Actions (.github/workflows/deploy.yml)
        ↓
GitHub Pages (https://Md-Tanvir-Shakil.github.io)
```

Editing content:

```
/admin (Decap CMS)  →  GitHub OAuth (via a tiny Cloudflare Worker proxy)
        ↓
Commits/PR to this repo (editorial workflow — reviewable before merge)
        ↓
Push to main triggers the GitHub Actions workflow above
```

**Why this shape:** every piece of the *public* site is 100% GitHub Pages-compatible —
no server, no database, nothing that can go down independently of GitHub. The single
non-GitHub component is a ~90-line Cloudflare Worker that exists only to complete a
GitHub OAuth token exchange (a step that structurally requires a secret, which can
never be safely shipped to a browser). See `SECURITY.md` for the full reasoning, and
`oauth-proxy/README.md` if you'd rather skip that Worker entirely and edit locally
instead.

Full content-type reference is in `src/content.config.ts` (the Zod schemas) — that
file is the single source of truth for every field on every content type.

---

## 2. Local development

Requirements: Node 20+.

```bash
npm install
npm run dev       # http://localhost:4321
```

Other scripts:

```bash
npm run check     # astro check — type-checks AND validates all content against schemas
npm run build     # production build to dist/ (runs `check` first)
npm run preview   # preview the production build locally
```

### Editing content locally (no GitHub OAuth needed)

```bash
npm run dev            # terminal 1
npx decap-server        # terminal 2 — local git-backed proxy for Decap CMS
```

Then open `http://localhost:4321/admin/`. Decap CMS will read/write files directly in
your working directory; review with `git diff` and commit/push yourself.

---

## 3. GitHub setup

1. **Create the repository.** For a user/organization site, name it exactly
   `Md-Tanvir-Shakil.github.io` (this is what makes GitHub serve it at that URL with no
   extra config). If you use a different repo name, it becomes a *project* site at
   `Md-Tanvir-Shakil.github.io/REPO-NAME` — in that case also uncomment and set `base`
   in `astro.config.mjs`.
2. Push this project to that repository (`main` branch).
3. **Enable Pages via Actions.** Repo → Settings → Pages → Build and deployment →
   Source: **GitHub Actions**. (No further config needed — `.github/workflows/deploy.yml`
   handles the rest.)
4. Push to `main` (or re-run the workflow manually from the Actions tab). The first
   run publishes the site.

### Custom domain (optional, e.g. `tanvirshakil.com`)

1. Repo → Settings → Pages → Custom domain → enter your domain. GitHub creates a
   `CNAME` file in the Pages deployment automatically once you save this.
2. At your DNS provider, add the records GitHub's docs specify for apex/subdomain
   (typically `A`/`AAAA` records to GitHub's IPs for an apex domain, or a `CNAME`
   record to `Md-Tanvir-Shakil.github.io` for a subdomain like `www`).
3. Update `site` in `astro.config.mjs` and `siteUrl` in `src/data/site.json` to the
   new domain, and update `public/robots.txt`'s `Sitemap:` line. Redeploy.

No other architectural change is needed — this was designed in from the start (see
project brief §34).

### Repository permissions

The deploy workflow uses the built-in `GITHUB_TOKEN` (scoped automatically by the
`permissions:` block in the workflow file) — you do not need to create or store any
personal access token for deployment to work.

---

## 4. Dashboard / CMS setup (Decap CMS)

The admin panel lives at `/admin` (`public/admin/index.html` + `config.yml`) and is
part of the static site — no separate deployment needed for the panel itself.

**Before first use**, edit `public/admin/config.yml`:

- `backend.repo` → `"YOUR-USERNAME/YOUR-REPO"`
- `backend.base_url` → your OAuth proxy Worker URL (see `oauth-proxy/README.md`), or
  skip this and use local editing (`npx decap-server`) instead.

Then either:

- **Cloud editing (edit from any browser/phone):** deploy the OAuth proxy once
  (`oauth-proxy/README.md`, ~10 minutes, free Cloudflare tier), then log in at
  `https://YOUR-SITE/admin/` with your GitHub account.
- **Local-only editing:** run `npm run dev` + `npx decap-server` and use
  `http://localhost:4321/admin/` — zero external services, see §2 above.

Every save creates a branch + pull request (`publish_mode: editorial_workflow` in
`config.yml`), so you always get a review step and full history before content goes
live — pushing that PR's branch or merging it triggers `pr-preview-check.yml` (build
validation) and, once merged to `main`, `deploy.yml` (the real deploy).

---

## 5. Content management

All content types are defined in `src/content.config.ts` and live under
`src/content/<type>/*.md`. You can edit them either through `/admin` or directly as
files — both produce identical output because both are validated against the same
Zod schemas at build time (an invalid entry fails `npm run build`/`astro check` with a
clear error instead of silently breaking the live site).

| Content type | Folder | Detail page |
|---|---|---|
| Research interests | `src/content/research/` | `/research/[slug]` |
| Projects (research + engineering) | `src/content/projects/` | `/projects/[slug]` |
| Publications | `src/content/publications/` | `/publications/[slug]` |
| Blog / writing | `src/content/blog/` | `/writing/[slug]` |
| Experience | `src/content/experience/` | listed on `/experience` |
| Education | `src/content/education/` | listed on `/education` |

Site-wide settings (name, bio, social links, SEO keywords, contact form key, skills
list) are plain JSON in `src/data/{profile,site,skills}.json`, editable via `/admin` →
**Website Settings**, or directly.

### Adding a new project (example — same pattern for research/publications/blog)

**Via the CMS:** `/admin` → Projects → New Project → fill the form (including
technologies, hardware, GitHub repo link, images via the built-in uploader) → Publish.
That's it — no code, no manual rebuild command; the GitHub Actions pipeline handles
build + deploy once the PR is merged.

**Via files:** copy an existing file in `src/content/projects/`, edit the frontmatter
fields and Markdown body, save as a new `.md` file with a URL-friendly filename (the
filename becomes the slug, e.g. `esp32-zigbee-gateway.md` → `/projects/esp32-zigbee-gateway`).

### Example / placeholder content

This template ships with one example entry per collection (clearly marked "(Sample)"
in titles, or with `[ADD ...]` placeholder fields), so every page type has something
to preview. **Replace or delete these before publishing for real** — see the inline
notes in each file. The one publication example is set to `draft: true` so it's
already hidden from the live site.

---

## 6. Deployment — how it actually works

1. You (or the CMS, via a merged PR) push a commit to `main`.
2. `.github/workflows/deploy.yml` runs: installs dependencies, runs `astro check`
   (type-check + content-schema validation), builds the static site, uploads it as a
   Pages artifact, and deploys it.
3. GitHub Pages serves the result at your configured URL.
4. `.github/workflows/pr-preview-check.yml` runs the same check+build (without
   deploying) on every pull request, so a broken content edit is caught before it can
   reach `main`.

You never run a manual build/deploy command in normal use.

---

## 7. Security

See `SECURITY.md` for the full model. Summary: no token or secret is ever present in
this repository or in the built site; the one GitHub OAuth client secret required for
cloud-based CMS editing lives only in Cloudflare Worker secrets
(`oauth-proxy/`), or is avoided entirely if you use local-only editing.

---

## 8. Project structure

```
src/
  content.config.ts       # Zod schemas — the source of truth for every content type
  content/
    research/              # Research interests
    projects/               # Research + engineering projects
    publications/            # Publications & research outputs
    blog/                     # Technical writing
    experience/                # Work experience
    education/                  # Academic background
  data/
    profile.json            # Name, bio, social links, CV path
    site.json                # Site title/description, SEO keywords, contact form key
    skills.json               # Skills grouped by category
  components/               # Reusable UI: Navbar, Footer, cards, ThemeToggle, etc.
  layouts/BaseLayout.astro   # Shared page shell (head, nav, footer)
  pages/                     # Route definitions (file-based routing)
  styles/global.css          # Design tokens (light/dark) + Tailwind import
public/
  admin/                    # Decap CMS (config.yml + index.html)
  documents/                 # Put cv.pdf here
  images/                     # Static images, uploads land in images/uploads/
oauth-proxy/                # Cloudflare Worker for GitHub OAuth (CMS cloud editing)
.github/workflows/          # CI: deploy.yml (main) + pr-preview-check.yml (PRs)
```

---

## 9. SEO & performance

- Per-page meta tags, canonical URLs, Open Graph + Twitter cards (`src/components/BaseHead.astro`).
- JSON-LD: `Person` schema sitewide, `Article` schema on blog posts, `ScholarlyArticle`
  schema on publications.
- `sitemap-index.xml` generated automatically by `@astrojs/sitemap`; `robots.txt` in `public/`.
- No client-side framework runtime shipped by default — pages are static HTML with a
  handful of small inline scripts (theme toggle, mobile nav, client-side filter,
  contact form submit). Images should be added as reasonably-sized files under
  `public/images/`; Astro's `<Image>`/`astro:assets` can be adopted later for
  automatic optimization if you move images into `src/`.

## 10. Accessibility

Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip-to-content link, visible
focus states, alt-text-ready image fields throughout the content schemas, and a
`prefers-reduced-motion` override in `global.css`. Run an accessibility audit
(Lighthouse or axe) after adding your real content and images, since alt text quality
depends on what you write into the CMS's image fields.

## 11. Analytics

Disabled by default. `src/data/site.json` → `analytics.provider` accepts `"none"`,
`"plausible"`, `"umami"`, or `"google-analytics"`; wire up the corresponding snippet in
`BaseLayout.astro`/`BaseHead.astro` when you pick one (left unimplemented by default so
no analytics script ships until you explicitly opt in).

## 12. Future expansion

The schema in `src/content.config.ts` is intentionally narrow but extensible — new
optional fields (patents, talks, certifications, awards, datasets) can be added to any
collection without breaking existing content, since every new field should be
`.optional()` or have a `.default()`. New collections (e.g. `talks`, `awards`) follow
the same three-step pattern: define the Zod schema, add a matching Decap CMS
collection block, add a page under `src/pages/`.
