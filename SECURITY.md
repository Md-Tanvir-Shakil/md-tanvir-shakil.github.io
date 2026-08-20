# Security Model

This project is designed so that **no GitHub token, API secret, or credential ever
appears in client-side JavaScript, in this repository, or on the public website.**

## What ships to the browser

The built site (`dist/`, published to GitHub Pages) is plain static HTML/CSS/JS. It
contains:

- Your public content (research, projects, publications, etc.)
- A public Web3Forms **access key** (`src/data/site.json` → `contactForm.accessKey`).
  This is designed by Web3Forms to be public/client-side — it identifies where
  submissions get routed, it is not a secret that grants account access. Treat it
  like a public API key, not a password.
- The Decap CMS admin bundle (`/admin`), loaded from a CDN. It contains **no
  credentials** — it's the same static JS for every Decap CMS user.

Nothing else with any authentication value is part of the build output.

## Where the one real secret lives

Editing content through `/admin` requires a GitHub access token so Decap CMS can
read/write files via the GitHub API. That token is obtained via GitHub OAuth, which
requires a **client secret** — and a client secret can never be safely shipped to a
browser.

This project keeps that secret in exactly one place: **Cloudflare Worker secrets**
(`oauth-proxy/`), set via `wrangler secret put` and encrypted at rest by Cloudflare.
It is never committed to git, never present in `wrangler.toml`, and never logged.
See `oauth-proxy/README.md` for the full flow.

If you don't want to run that Worker at all, use the **local editing** path instead
(`npm run dev` + `npx decap-server`) — this requires no OAuth app and no secret
anywhere, at the cost of only being able to publish from your own machine. See the
README's "Content management" section.

## What the resulting GitHub token can do

The token Decap CMS receives is scoped by your GitHub OAuth App + your account's own
permissions (this project requests `repo, user` scope, matching what's needed to
read/write your content repository). It:

- Lives only in the Decap CMS browser session (in-memory), not in `localStorage`.
- Is never written to disk, logged, or transmitted anywhere by the OAuth proxy Worker
  beyond the one `postMessage` back to your own browser tab.
- Can be revoked at any time from GitHub → Settings → Applications → Authorized
  OAuth Apps, without touching the Worker or this repository.

## Editorial workflow as a safety net

`config.yml` sets `publish_mode: editorial_workflow`, so every content change made
through `/admin` becomes a branch + pull request rather than a direct commit to
`main`. This gives you a review step and full `git` history/rollback for every
content change, not just code changes (see README → "Version control").

## Reporting a concern

This is a personal portfolio project with no backend service processing user data
beyond the optional contact form (handled entirely by Web3Forms, per their own
privacy/security practices — see https://web3forms.com). If you fork this project and
find a security issue in the OAuth proxy or CMS configuration, review
`oauth-proxy/worker.js` directly — it is intentionally short (~90 lines) so it can be
audited in full before you deploy it.
