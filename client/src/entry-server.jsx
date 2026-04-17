/**
 * entry-server.jsx — React SSR entry for static prerendering.
 *
 * Used by scripts/prerender.mjs after running:
 *   vite build --ssr src/entry-server.jsx --outDir dist-server
 *
 * Components use eager imports (not lazy) so renderToString captures
 * full markup without Suspense boundaries blocking output.
 */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

// All eager for SSR — no lazy() or Suspense needed in server context
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import CatalogPage from "./pages/CatalogPage";
import BranchesPage from "./pages/BranchesPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

import { SITE } from "./config/site";

/**
 * Render the React tree for a given URL to an HTML string.
 * @param {string} url  Pathname, e.g. "/" or "/about"
 * @returns {{ html: string }}
 */
export function render(url) {
  const html = renderToString(
    <LazyMotion features={domAnimation} strict>
      <StaticRouter location={url}>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </StaticRouter>
    </LazyMotion>
  );
  return { html };
}

/**
 * Static metadata for each prerendered route.
 * useSEO only runs client-side (useEffect), so the prerender
 * script uses this map to inject correct <title> and meta tags.
 */
export const ROUTE_META = {
  "/": {
    title: SITE.seo.defaultTitle,
    description: SITE.seo.defaultDescription,
    canonical: `${SITE.domain}/`,
    ogTitle: SITE.seo.defaultTitle,
    ogDescription: SITE.seo.defaultDescription,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
  "/about": {
    title: `About Us${SITE.seo.titleSuffix}`,
    description: `Learn about Royal Enterprises — Chennai's trusted packaging partner since ${SITE.foundingYear}. ${SITE.stats.businessClients}+ business clients, ${SITE.stats.statesServed} states served.`,
    canonical: `${SITE.domain}/about`,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
  "/products": {
    title: `All Products${SITE.seo.titleSuffix}`,
    description: `Browse our full range of industrial crates, wooden pallets, bins, dustbins, stretch films and more. Factory-direct pricing from ${SITE.name}, Chennai.`,
    canonical: `${SITE.domain}/products`,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
  "/catalog": {
    title: `Product Catalog${SITE.seo.titleSuffix}`,
    description: `Download or browse the complete product catalog from ${SITE.name}. HDPE industrial crates, wooden pallets, bins and more — factory-direct.`,
    canonical: `${SITE.domain}/catalog`,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
  "/branches": {
    title: `Delivery & Branches${SITE.seo.titleSuffix}`,
    description: `${SITE.name} delivers pan-India. View our branch locations and delivery coverage across ${SITE.stats.statesServed} states.`,
    canonical: `${SITE.domain}/branches`,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
  "/contact": {
    title: `Contact Us${SITE.seo.titleSuffix}`,
    description: `Get in touch with ${SITE.name}. Phone: ${SITE.phone.primary.display}. Email: ${SITE.email.display}. Address: ${SITE.address.full}.`,
    canonical: `${SITE.domain}/contact`,
    ogType: "website",
    ogImage: SITE.seo.ogImage,
  },
};
