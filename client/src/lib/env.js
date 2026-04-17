/**
 * env.js — Type-safe environment variable access with validation.
 *
 * WHY: Raw import.meta.env access scattered across components is hard
 * to audit, test, and refactor. This module provides:
 *  - A single place to declare which env vars exist
 *  - Dev-time warnings for missing optional vars
 *  - Typed constants so IDE autocomplete works everywhere
 *
 * USAGE: import { env } from '../lib/env'
 *        if (env.FORMSPREE_ID) { ... }
 */

function get(key) {
  return import.meta.env[key] ?? null;
}

// Validate in dev — log warnings for optional vars that aren't set.
// This surfaces misconfiguration early without hard failing in production.
if (import.meta.env.DEV) {
  const optionalVars = ["VITE_FORMSPREE_ID", "VITE_ANALYTICS_KEY", "VITE_GA4_ID"];
  const missing = optionalVars.filter((k) => !import.meta.env[k]);
  if (missing.length) {
    console.info(
      `[env] Optional vars not set (using fallbacks): ${missing.join(", ")}\n` +
        "  Copy .env.example to .env.local and fill in values."
    );
  }
}

export const env = {
  /** Formspree form ID — if absent, contact form falls back to WhatsApp. */
  FORMSPREE_ID: get("VITE_FORMSPREE_ID"),

  /**
   * Secret key that gates the /analytics dashboard.
   * Set VITE_ANALYTICS_KEY in .env.local before deploying.
   * NEVER commit the real key to source control.
   * Returns null when not set — the dashboard redirects to home.
   */
  ANALYTICS_KEY: get("VITE_ANALYTICS_KEY"),

  /**
   * Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX").
   * Leave unset to disable GA4 entirely (no tracking scripts injected).
   */
  GA4_ID: get("VITE_GA4_ID"),

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};
