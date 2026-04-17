/**
 * analytics.test.js — Unit tests for lib/analytics.js
 *
 * Tests pure logic: session building, bounce rate, page view counting,
 * click tracking, and the 30-day rolling window filter.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { trackPageView, trackClick, getAnalyticsData } from '../lib/analytics';

// ── localStorage mock ────────────────────────────────────────────────────────

let store = {};

beforeEach(() => {
  store = {};
  vi.stubGlobal('localStorage', {
    getItem:    (k)    => store[k] ?? null,
    setItem:    (k, v) => { store[k] = v; },
    removeItem: (k)    => { delete store[k]; },
    clear:      ()     => { store = {}; },
  });
});

// ── trackPageView ────────────────────────────────────────────────────────────

describe('trackPageView', () => {
  it('persists a page-view event to localStorage', () => {
    trackPageView('/');
    const data = getAnalyticsData();
    expect(data.totalPageViews).toBe(1);
  });

  it('increments total page views on each call', () => {
    trackPageView('/');
    trackPageView('/products');
    trackPageView('/contact');
    expect(getAnalyticsData().totalPageViews).toBe(3);
  });

  it('does not throw when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('quota'); },
      setItem: () => { throw new Error('quota'); },
    });
    expect(() => trackPageView('/')).not.toThrow();
  });
});

// ── trackClick ───────────────────────────────────────────────────────────────

describe('trackClick', () => {
  it('tracks phone clicks', () => {
    trackClick('phone');
    trackClick('phone');
    expect(getAnalyticsData().contactClicks).toBe(2);
  });

  it('tracks whatsapp clicks', () => {
    trackClick('whatsapp');
    expect(getAnalyticsData().contactClicks).toBe(1);
  });

  it('sums phone and whatsapp into contactClicks', () => {
    trackClick('phone');
    trackClick('whatsapp');
    trackClick('whatsapp');
    expect(getAnalyticsData().contactClicks).toBe(3);
  });
});

// ── Bounce rate ───────────────────────────────────────────────────────────────

describe('getAnalyticsData — bounce rate', () => {
  it('returns 100% bounce rate when all sessions view only one page', () => {
    trackPageView('/');
    const data = getAnalyticsData();
    // Single session, single page — 100% bounce
    expect(data.bounceRate).toBe(100);
  });

  it('returns 0% bounce rate when session has multiple pages', () => {
    const now = Date.now();
    // Simulate two page views in same session (< 30 min apart)
    trackPageView('/');
    // Manually inject a second view 1 minute later in the same session
    const raw = JSON.parse(localStorage.getItem('rc_analytics_v1'));
    raw.events.push({ t: 'pv', p: '/products', ts: now + 60_000 });
    localStorage.setItem('rc_analytics_v1', JSON.stringify(raw));

    const data = getAnalyticsData();
    expect(data.bounceRate).toBe(0);
  });
});

// ── Top pages ─────────────────────────────────────────────────────────────────

describe('getAnalyticsData — top pages', () => {
  it('ranks pages by view count descending', () => {
    trackPageView('/products');
    trackPageView('/products');
    trackPageView('/');
    const { topPages } = getAnalyticsData();
    expect(topPages[0].path).toBe('/products');
    expect(topPages[0].views).toBe(2);
    expect(topPages[1].path).toBe('/');
    expect(topPages[1].views).toBe(1);
  });

  it('limits top pages to 5 entries', () => {
    ['/a', '/b', '/c', '/d', '/e', '/f'].forEach(p => trackPageView(p));
    expect(getAnalyticsData().topPages.length).toBeLessThanOrEqual(5);
  });
});

// ── 30-day rolling window ─────────────────────────────────────────────────────

describe('getAnalyticsData — 30-day window', () => {
  it('excludes events older than 30 days from totals', () => {
    const thirtyOneDaysAgo = Date.now() - 31 * 24 * 60 * 60 * 1000;
    // Inject a stale event directly
    const raw = { events: [{ t: 'pv', p: '/', ts: thirtyOneDaysAgo }] };
    localStorage.setItem('rc_analytics_v1', JSON.stringify(raw));

    const data = getAnalyticsData();
    expect(data.totalPageViews).toBe(0);
    expect(data.hasData).toBe(false);
  });
});

// ── hasData flag ──────────────────────────────────────────────────────────────

describe('getAnalyticsData — hasData', () => {
  it('is false when no events exist', () => {
    expect(getAnalyticsData().hasData).toBe(false);
  });

  it('is true after recording a page view', () => {
    trackPageView('/');
    expect(getAnalyticsData().hasData).toBe(true);
  });
});
