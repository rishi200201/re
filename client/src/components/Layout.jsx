import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EnquireNow from "./EnquireNow";
import { trackPageView, trackClick } from "../lib/analytics";
import { trackGA4PageView } from "../lib/ga";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/**
 * AnalyticsTracker — invisible component that records page views and
 * phone/WhatsApp link clicks into localStorage for the analytics dashboard.
 * Uses a global delegated click listener so every link is covered without
 * modifying individual components.
 */
function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
    // Fire GA4 page_view after React has committed (document.title is current)
    trackGA4PageView(pathname, document.title);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackClick("phone");
      else if (href.includes("wa.me")) trackClick("whatsapp");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

export default function Layout() {
  return (
    <>
      {/*
        Skip-to-content: hidden until focused via Tab key.
        Satisfies WCAG 2.1 SC 2.4.1 — lets keyboard/screen-reader users
        jump past the repeated nav directly to page content.
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <AnalyticsTracker />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EnquireNow />
    </>
  );
}
