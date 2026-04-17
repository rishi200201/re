/**
 * ga.js — Google Analytics 4 tracking helpers.
 *
 * All functions are safe to call even when GA4 is not loaded
 * (env.GA4_ID not set, ad-blocker, etc.) — they silently no-op.
 */

import { env } from "./env";

function gtag(...args) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/**
 * Send a page_view event. Call on every route change.
 * @param {string} pagePath  e.g. "/products"
 * @param {string} pageTitle e.g. "Products | Royal Enterprises Chennai"
 */
export function trackGA4PageView(pagePath, pageTitle) {
  if (!env.GA4_ID) return;
  gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    send_to: env.GA4_ID,
  });
}
