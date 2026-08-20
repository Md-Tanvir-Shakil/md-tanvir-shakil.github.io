# GitHub OAuth Proxy (for the Decap CMS admin panel)

## Why this exists

GitHub Pages serves static files only — there is no server to run backend code. Decap
CMS (the `/admin` panel) needs *some* way to turn a GitHub login into an access token
it can use to read/write files in your repo via the GitHub API. That token exchange
step requires a GitHub OAuth **client secret**, and a client secret must never be
shipped in client-side JavaScript (anyone could open dev tools and steal it).

This folder is a ~90-line Cloudflare Worker that does only that one thing: it holds
the client secret server-side, completes the OAuth code-for-token exchange when you
log into `/admin`, and hands the resulting token to Decap CMS in your browser via
`postMessage`. The token is never written to disk, never logged, and never touches
your GitHub repository. It is the smallest piece of non-GitHub infrastructure this
project needs, and it costs $0 on Cloudflare's free tier for a single-user CMS.

If you don't want to run this at all, see **"Alternative: fully local editing"**
below — you can skip it entirely and still use the CMS.

## 1. Create a GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.
2. Homepage URL: your Pages URL, e.g. `https://Md-Tanvir-Shakil.github.io`
3. Authorization callback URL: the Worker URL you'll get in step 3 below, with
   `/callback` appended, e.g. `https://portfolio-cms-oauth.YOUR-SUBDOMAIN.workers.dev/callback`
   (you can create the Worker first to get this URL, then edit the OAuth App).
4. Save the **Client ID**. Generate and save a **Client Secret** — you'll only see it once.

## 2. Deploy the Worker (Cloudflare, free tier)

```bash
npm install -g wrangler
cd oauth-proxy
wrangler login
wrangler deploy
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
```

`wrangler deploy` prints your Worker's URL — that's the callback base from step 1.

## 3. Point Decap CMS at the proxy

In `public/admin/config.yml`, set:

```yaml
backend:
  name: github
  repo: YOUR-USERNAME/YOUR-REPO
  branch: main
  base_url: https://portfolio-cms-oauth.YOUR-SUBDOMAIN.workers.dev
  auth_endpoint: auth
```

Commit and push. Visit `https://YOUR-SITE/admin/`, click "Login with GitHub", and
you should be redirected through GitHub and back into the CMS.

## Alternative: fully local editing (zero external infra)

You do not need this Worker (or any OAuth app) to use the CMS from your own machine:

```bash
npm run dev            # in one terminal
npx decap-server        # in another terminal — a local git-backed proxy
```

With `local_backend: true` set in `config.yml` (already set by default in this
project), visiting `http://localhost:4321/admin/` while both processes run will use
the local proxy instead of GitHub OAuth. Changes are written straight to your working
directory; you review and `git push` them yourself. This is the simplest and most
secure option if you're comfortable running the dashboard from your computer rather
than from a phone/browser anywhere.

## Security notes

- The client secret lives only in Cloudflare's encrypted secret store, set via
  `wrangler secret put` — never in a file, never in this repository.
- The resulting GitHub token is scoped to whatever the OAuth App + your GitHub account
  permissions allow (default scope requested here: `repo, user`). It lives only in
  the Decap CMS browser session (memory), not in localStorage, and is never persisted
  by this Worker.
- `ALLOWED_ORIGIN` in `wrangler.toml` can be tightened from `"*"` to your exact site
  URL to reduce where the token can be delivered.
- If you ever suspect the client secret leaked, revoke and regenerate it from the
  GitHub OAuth App settings — the Worker keeps working once you `wrangler secret put`
  the new value.
