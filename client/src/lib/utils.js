/**
 * utils.js — Shared pure utility functions.
 */

/**
 * Convert a kebab-case category slug to a display label.
 * e.g. "industrial-crates" → "Industrial Crates"
 * @param {string} slug
 * @returns {string}
 */
export function toCategoryLabel(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
