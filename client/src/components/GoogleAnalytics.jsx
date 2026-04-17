import { useEffect } from "react";
import { env } from "../lib/env";

/**
 * GoogleAnalytics — Injects the GA4 gtag.js script into <head> once,
 * only when VITE_GA4_ID is configured. Returns null otherwise — zero
 * overhead when analytics are disabled.
 */
export default function GoogleAnalytics() {
  const gid = env.GA4_ID;

  useEffect(() => {
    if (!gid) return;

    // Avoid double-injection on HMR reloads
    if (document.querySelector(`script[data-ga4="${gid}"]`)) return;

    // dataLayer init + gtag function must exist before the script loads
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
    };
    window.gtag("js", new Date());
    // Disable automatic page_view — we send them manually in Layout
    // so they fire after useSEO has updated document.title.
    window.gtag("config", gid, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gid}`;
    script.setAttribute("data-ga4", gid);
    document.head.appendChild(script);
  }, [gid]);

  return null;
}
