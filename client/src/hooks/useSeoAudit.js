/**
 * useSeoAudit — inspects the live DOM to produce real SEO + accessibility scores.
 *
 * Runs once on mount (lazy useState initializer). Each check reads the current
 * document state — meta tags, JSON-LD scripts, landmark elements, etc.
 *
 * Returns:
 *  - issues[]     : flat list with resolved: true/false — drives IssueList
 *  - seoScore     : 0–100 weighted score from SEO checks
 *  - a11yScore    : 0–100 weighted score from accessibility checks
 *  - results      : { [checkId]: boolean } — raw check results
 */

import { useState } from "react";

// ── DOM helpers ───────────────────────────────────────────────────────────────

const q    = sel => document.querySelector(sel);
const qAll = sel => [...document.querySelectorAll(sel)];
const attr = (sel, a = "content") => q(sel)?.getAttribute(a)?.trim() ?? "";

function hasLdKey(key) {
  return qAll('script[type="application/ld+json"]').some(s => {
    try { return key in JSON.parse(s.textContent); }
    catch { return false; }
  });
}

function hasLdArrayNonEmpty(key) {
  return qAll('script[type="application/ld+json"]').some(s => {
    try {
      const d = JSON.parse(s.textContent);
      return Array.isArray(d[key]) && d[key].length > 0;
    }
    catch { return false; }
  });
}

// ── Check definitions ─────────────────────────────────────────────────────────
// [id, group, title, severity, weight, checkFn, file, fix]

const CHECKS = [
  // ── SEO (total weight = 64) ─────────────────────────────────────────────
  [
    "meta-title",   "SEO", "Meta title (descriptive)",       "high",    15,
    () => (document.title?.length ?? 0) > 10,
    "index.html",  "Set a descriptive <title> tag (min 10 chars)",
  ],
  [
    "meta-desc",    "SEO", "Meta description",               "high",    15,
    () => attr('meta[name="description"]').length > 30,
    "index.html",  "Add meta[name=description] with 120–155 characters",
  ],
  [
    "canonical",    "SEO", "Canonical URL",                   "medium",   8,
    () => !!attr('link[rel="canonical"]', "href"),
    "useSEO.js",   "Pass url to useSEO() on each page",
  ],
  [
    "og-image",     "SEO", "Open Graph image",                "medium",   8,
    () => !!attr('meta[property="og:image"]'),
    "index.html",  "Add meta[property=og:image] (1200×630 px recommended)",
  ],
  [
    "tw-img-valid", "SEO", "Twitter image (valid URL)",       "high",     8,
    () => {
      const v = attr('meta[name="twitter:image"]');
      return !!v && !v.includes("carousel");
    },
    "index.html",  "Ensure twitter:image points to a real, accessible URL",
  ],
  [
    "json-ld",      "SEO", "JSON-LD structured data (2+)",   "high",    10,
    () => qAll('script[type="application/ld+json"]').length >= 2,
    "index.html",  "Add both Organization and LocalBusiness schemas",
  ],
  [
    "agg-rating",   "SEO", "AggregateRating in schema",       "medium",   7,
    () => hasLdKey("aggregateRating"),
    "index.html",  "Add aggregateRating to LocalBusiness JSON-LD",
  ],
  [
    "same-as",      "SEO", "sameAs social profiles",          "low",      3,
    () => hasLdArrayNonEmpty("sameAs"),
    "index.html",  "Add social profile URLs to sameAs in Organization schema",
  ],
  [
    "robots",       "SEO", "Robots meta tag",                 "low",      3,
    () => !!attr('meta[name="robots"]'),
    "index.html",  "Add meta[name=robots content='index,follow,...']",
  ],
  [
    "noscript",     "SEO", "Noscript fallback",               "low",      2,
    () => !!q("noscript"),
    "index.html",  "Add <noscript> with fallback contact info",
  ],
  [
    "favicon",      "SEO", "Favicon",                         "low",      3,
    () => !!q('link[rel="icon"]'),
    "index.html",  "Add <link rel=icon href=/favicon.png>",
  ],

  // ── Accessibility (total weight = 100) ──────────────────────────────────
  [
    "skip-link",    "Accessibility", "Skip-to-content link",     "high",   25,
    () => !!q('a[href="#main-content"]'),
    "Layout.jsx",  "Add <a href='#main-content' class='sr-only'> skip link",
  ],
  [
    "main-elem",    "Accessibility", "Main landmark element",    "medium", 20,
    () => !!q("main"),
    "Layout.jsx",  "Wrap page content in <main id='main-content'>",
  ],
  [
    "html-lang",    "Accessibility", "HTML lang attribute",      "medium", 15,
    () => !!(q("html")?.getAttribute("lang")),
    "index.html",  "Add lang='en' to <html> element",
  ],
  [
    "img-alts",     "Accessibility", "All images have alt text", "high",   25,
    () => {
      const imgs = qAll("img");
      return imgs.length === 0 || imgs.every(i => i.hasAttribute("alt"));
    },
    "Multiple",    "Add alt='...' attribute to every <img> element",
  ],
  [
    "page-title",   "Accessibility", "Meaningful page title",   "medium", 15,
    () => (document.title?.length ?? 0) > 5,
    "useSEO.js",   "Set a unique, descriptive title per page via useSEO()",
  ],
];

const SEO_CHECKS  = CHECKS.filter(c => c[1] === "SEO");
const A11Y_CHECKS = CHECKS.filter(c => c[1] === "Accessibility");

function weightedScore(checks, results) {
  const total  = checks.reduce((s, c) => s + c[4], 0);
  const earned = checks.reduce((s, c) => s + (results[c[0]] ? c[4] : 0), 0);
  return Math.round((earned / total) * 100);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useSeoAudit() {
  const [audit] = useState(() => {
    const results = {};
    CHECKS.forEach(([id, , , , , fn]) => {
      try { results[id] = Boolean(fn()); }
      catch { results[id] = false; }
    });

    const issues = CHECKS.map(([id, group, title, severity, , , file, fix]) => ({
      id,
      group,
      title,
      severity,
      file,
      fix,
      resolved: results[id],
    }));

    return {
      issues,
      seoScore:  weightedScore(SEO_CHECKS,  results),
      a11yScore: weightedScore(A11Y_CHECKS, results),
      results,
    };
  });

  return audit;
}
