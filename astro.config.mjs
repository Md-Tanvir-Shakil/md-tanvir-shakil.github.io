// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// IMPORTANT (GitHub Pages):
// - `site` must be your Pages URL. For a project site it also needs `base: "/repo-name"`.
//   For a USERNAME.github.io user/org site (this default), no `base` is needed.
// - If you rename the repo away from `Md-Tanvir-Shakil.github.io`, uncomment and set `base`.
export default defineConfig({
  site: "https://Md-Tanvir-Shakil.github.io",
  // base: "/your-repo-name",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
