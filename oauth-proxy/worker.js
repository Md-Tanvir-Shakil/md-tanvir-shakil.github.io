/**
 * Minimal GitHub OAuth proxy for Decap CMS, deployed as a Cloudflare Worker.
 *
 * This is the ONLY piece of infrastructure in this project that isn't GitHub Pages
 * itself. It exists because GitHub's OAuth "exchange code for access token" step
 * requires a client secret, and a client secret can never be shipped to the browser
 * (see /SECURITY.md). This Worker holds that secret server-side, does the exchange,
 * and hands Decap CMS a short-lived GitHub access token via postMessage. The token
 * never touches your repository, your build, or any client-side JavaScript file.
 *
 * Deploy: see oauth-proxy/README.md. Free tier on Cloudflare Workers is more than
 * enough for a single-user CMS.
 *
 * Required secrets (set with `wrangler secret put`, NEVER committed to git):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * Optional:
 *   ALLOWED_ORIGIN — restrict which site is allowed to use this proxy
 *                    (defaults to "*"; set to your Pages URL for tighter security).
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth" || url.pathname.endsWith("/auth")) {
      return handleAuth(url, env);
    }
    if (url.pathname === "/callback" || url.pathname.endsWith("/callback")) {
      return handleCallback(url, env);
    }
    return new Response("Not found", { status: 404 });
  },
};

function handleAuth(url, env) {
  const redirectUri = `${url.origin}/callback`;
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  // A random state value mitigates CSRF; Decap doesn't verify it itself, but we
  // still generate one so the redirect isn't trivially predictable.
  authorizeUrl.searchParams.set("state", crypto.randomUUID());

  return Response.redirect(authorizeUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing ?code from GitHub", { status: 400 });
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenJson = await tokenRes.json();

  if (tokenJson.error || !tokenJson.access_token) {
    return new Response(
      `GitHub OAuth error: ${tokenJson.error_description || tokenJson.error || "unknown error"}`,
      { status: 400 }
    );
  }

  const allowedOrigin = env.ALLOWED_ORIGIN || "*";
  const payload = JSON.stringify({ token: tokenJson.access_token, provider: "github" });

  // Decap CMS's GitHub backend listens for exactly this postMessage message format.
  const html = `<!doctype html>
<html><body>
<script>
  (function () {
    function receiveMessage(message) {
      window.opener.postMessage(
        'authorization:github:success:${payload.replace(/'/g, "\\'")}',
        message.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "${allowedOrigin}");
  })();
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
