/**
 * api.js — API abstraction layer.
 *
 * WHY: Keeps network logic out of components and in one place.
 * When you add a real backend or swap Formspree for something else,
 * you change this file — not every component that uses it.
 *
 * Current implementations:
 *  - submitEnquiry(): Formspree if configured, WhatsApp fallback otherwise.
 *
 * Future: replace FORMSPREE_URL with your own API endpoint and the
 * component code stays unchanged.
 */

import { env } from "./env";
import { SITE } from "../config/site";

const FORMSPREE_URL = env.FORMSPREE_ID
  ? `https://formspree.io/f/${env.FORMSPREE_ID}`
  : null;

/**
 * Submit an enquiry from the contact form.
 *
 * @param {{ name: string, phone: string, message: string }} payload
 * @returns {Promise<void>}
 * @throws {Error} on network failure
 */
export async function submitEnquiry({ name, phone, message }) {
  if (FORMSPREE_URL) {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, phone, message }),
    });

    if (!res.ok) {
      // Try to extract Formspree error message for better debugging
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? `Request failed (${res.status})`);
    }

    return;
  }

  // No Formspree configured — redirect to WhatsApp as a reliable fallback.
  // This ensures zero enquiries are lost even without backend setup.
  const text = `Hi, I'm ${name} (${phone}). ${message}`;
  window.open(
    `${SITE.whatsapp.base}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
}
