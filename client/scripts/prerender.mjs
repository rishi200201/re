/**
 * prerender.mjs — Static prerender script.
 *
 * Runs after `vite build` + `vite build --ssr` to inject server-rendered
 * React markup and route-specific meta tags into the Vite-built index.html.
 * Each route gets its own dist/<route>/index.html for clean static hosting.
 *
 * Usage:
 *   node scripts/prerender.mjs
 *
 * Or via npm:
 *   npm run build:full
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

// ── Validate prerequisites ────────────────────────────────────────────────

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  console.error("❌  dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}
if (!fs.existsSync(serverDir)) {
  console.error("❌  dist-server/ not found. Run `npm run build:server` first.");
  process.exit(1);
}

// ── Load server bundle ────────────────────────────────────────────────────

const serverEntry = path.join(serverDir, "entry-server.js");
const { render, ROUTE_META } = await import(serverEntry);

// ── Read template ─────────────────────────────────────────────────────────

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// ── Meta injection helper ─────────────────────────────────────────────────

function injectMeta(html, meta) {
  if (!meta) return html;

  if (meta.title) {
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${escHtml(meta.title)}</title>`
    );
  }
  if (meta.description) {
    html = html.replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${escHtml(meta.description)}$2`
    );
  }
  if (meta.canonical) {
    html = html.replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${escHtml(meta.canonical)}$2`
    );
  }
  if (meta.ogTitle) {
    html = html.replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${escHtml(meta.ogTitle)}$2`
    );
  }
  if (meta.ogDescription) {
    html = html.replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${escHtml(meta.ogDescription)}$2`
    );
  }
  if (meta.canonical) {
    html = html.replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      `$1${escHtml(meta.canonical)}$2`
    );
  }
  return html;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Render each route ─────────────────────────────────────────────────────

const routes = Object.keys(ROUTE_META);
let ok = 0;

for (const route of routes) {
  try {
    const { html: appHtml } = render(route);
    const meta = ROUTE_META[route];

    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );
    page = injectMeta(page, meta);

    // Write to dist/<route>/index.html
    if (route === "/") {
      fs.writeFileSync(path.join(distDir, "index.html"), page);
    } else {
      const dir = path.join(distDir, route.slice(1)); // strip leading /
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), page);
    }

    console.log(`  ✓  ${route}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${route}  —  ${err.message}`);
  }
}

console.log(`\nPrerender complete: ${ok}/${routes.length} routes.`);
