/**
 * usePerformanceMetrics — reads real Core Web Vitals from the browser.
 *
 * Sources:
 *  - FCP  : performance.getEntriesByType("paint")
 *  - TTFB : performance.getEntriesByType("navigation")[0].responseStart
 *  - LCP  : PerformanceObserver (largest-contentful-paint, buffered)
 *  - CLS  : PerformanceObserver (layout-shift, buffered, no recent input)
 *
 * Returns null for each metric until the browser reports it.
 */

import { useState, useEffect } from "react";

const THRESHOLDS = {
  lcp:  { good: 2500, poor: 4000,  max: 4000  },
  fcp:  { good: 1800, poor: 3000,  max: 3000  },
  cls:  { good: 0.1,  poor: 0.25,  max: 0.25  },
  ttfb: { good: 800,  poor: 1800,  max: 1800  },
};

function rate(key, v) {
  const t = THRESHOLDS[key];
  if (v <= t.good) return "Good";
  if (v <= t.poor) return "Needs Work";
  return "Poor";
}

function formatMetric(key, raw) {
  if (raw === null || raw === undefined) return null;
  const r = rate(key, raw);
  return {
    raw,
    display: key === "cls" ? raw.toFixed(3) : `${(raw / 1000).toFixed(2)}s`,
    rating: r,
    color: r === "Good" ? "emerald" : r === "Needs Work" ? "amber" : "red",
    // 0–100% of the "poor" threshold for progress bar scaling
    pct: Math.min(Math.round((raw / THRESHOLDS[key].max) * 100), 100),
  };
}

export function usePerformanceMetrics() {
  const [raw, setRaw] = useState({ lcp: null, fcp: null, cls: 0, ttfb: null });

  useEffect(() => {
    // ── Synchronous reads (available immediately after load) ──────────────
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find(e => e.name === "first-contentful-paint");
    if (fcp) setRaw(p => ({ ...p, fcp: fcp.startTime }));

    const [nav] = performance.getEntriesByType("navigation");
    if (nav) setRaw(p => ({ ...p, ttfb: nav.responseStart }));

    if (!("PerformanceObserver" in window)) return;

    const observers = [];

    // ── LCP ────────────────────────────────────────────────────────────────
    try {
      const o = new PerformanceObserver(list => {
        const last = list.getEntries().at(-1);
        if (last) setRaw(p => ({ ...p, lcp: last.startTime }));
      });
      o.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(o);
    } catch { /* browser may not support this entry type */ }

    // ── CLS ────────────────────────────────────────────────────────────────
    try {
      const o = new PerformanceObserver(list => {
        const delta = list
          .getEntries()
          .filter(e => !e.hadRecentInput)
          .reduce((s, e) => s + e.value, 0);
        if (delta > 0) setRaw(p => ({ ...p, cls: (p.cls ?? 0) + delta }));
      });
      o.observe({ type: "layout-shift", buffered: true });
      observers.push(o);
    } catch { /* browser may not support this entry type */ }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return {
    lcp:  formatMetric("lcp",  raw.lcp),
    fcp:  formatMetric("fcp",  raw.fcp),
    cls:  formatMetric("cls",  raw.cls),
    ttfb: formatMetric("ttfb", raw.ttfb),
  };
}
