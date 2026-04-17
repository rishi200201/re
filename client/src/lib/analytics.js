/**
 * analytics.js — Lightweight client-side analytics tracker.
 *
 * Stores events in localStorage under a versioned key.
 * Provides derived metrics: sessions, bounce rate, avg session duration,
 * per-page view counts, and click tracking for phone/WhatsApp links.
 *
 * All data is local to the user's browser — no third-party server.
 */

const STORE_KEY = "rc_analytics_v1";
const SESSION_IDLE_MS = 30 * 60 * 1000; // 30-min gap → new session
const MAX_EVENTS = 5000;

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}"); }
  catch { return {}; }
}

function save(d) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); }
  catch { /* storage quota exceeded — silently ignore */ }
}

// ── Write API ────────────────────────────────────────────────────────────────

/** Record a page view for the given pathname. */
export function trackPageView(pathname) {
  const d = load();
  d.events = d.events ?? [];
  d.events.push({ t: "pv", p: pathname, ts: Date.now() });
  if (d.events.length > MAX_EVENTS) d.events = d.events.slice(-MAX_EVENTS);
  save(d);
}

/** Record a contact click. type: 'phone' | 'whatsapp' */
export function trackClick(type) {
  const d = load();
  d.clicks = d.clicks ?? {};
  d.clicks[type] = (d.clicks[type] ?? 0) + 1;
  save(d);
}

// ── Session builder ──────────────────────────────────────────────────────────

function buildSessions(events) {
  const pvs = events.filter(e => e.t === "pv").sort((a, b) => a.ts - b.ts);
  const sessions = [];
  let cur = null;
  for (const ev of pvs) {
    if (!cur || ev.ts - cur.lastTs > SESSION_IDLE_MS) {
      cur = { start: ev.ts, lastTs: ev.ts, pages: [ev.p] };
      sessions.push(cur);
    } else {
      cur.lastTs = ev.ts;
      cur.pages.push(ev.p);
    }
  }
  return sessions;
}

function pathTitle(p) {
  const MAP = {
    "/": "Home", "/products": "Products", "/catalog": "Catalog",
    "/contact": "Contact", "/about": "About", "/branches": "Branches",
  };
  return MAP[p] ?? (p.startsWith("/products/") ? "Product Detail" : p);
}

function fmtDuration(ms) {
  if (ms <= 0) return "—";
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return min > 0 ? `${min}m ${sec}s` : `${sec}s`;
}

// ── Read API ────────────────────────────────────────────────────────────────

/** Returns computed analytics metrics for the last 30 days. */
export function getAnalyticsData() {
  const d = load();
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = (d.events ?? []).filter(e => e.ts > cutoff);
  const sessions = buildSessions(recent);

  const bounces = sessions.filter(s => s.pages.length === 1).length;
  const bounceRate = sessions.length ? Math.round((bounces / sessions.length) * 100) : 0;

  const durSessions = sessions.filter(s => s.lastTs > s.start);
  const avgMs = durSessions.length
    ? Math.round(durSessions.reduce((a, s) => a + (s.lastTs - s.start), 0) / durSessions.length)
    : 0;

  // Per-page counts
  const pageCounts = {};
  recent.filter(e => e.t === "pv").forEach(e => {
    pageCounts[e.p] = (pageCounts[e.p] ?? 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .map(([path, views]) => ({ path, title: pathTitle(path), views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return {
    monthlyVisitors: sessions.length,
    totalPageViews: recent.filter(e => e.t === "pv").length,
    bounceRate,
    avgSession: fmtDuration(avgMs),
    contactClicks: (d.clicks?.phone ?? 0) + (d.clicks?.whatsapp ?? 0),
    topPages,
    hasData: recent.length > 0,
  };
}
