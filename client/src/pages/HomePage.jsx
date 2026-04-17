import { lazy, Suspense } from "react";
import { useSEO } from "../hooks/useSEO";
import Hero from "../components/Hero";
import CompanyOverview from "../components/CompanyOverview";
import IndustriesSection from "../components/IndustriesSection";
import StatsStrip from "../components/StatsStrip";
import ProductGallery from "../components/ProductGallery";

// Below-fold heavy sections — deferred out of the initial chunk
const FeatureShowcase = lazy(() => import("../components/FeatureShowcase"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const SpecialOffer = lazy(() => import("../components/SpecialOffer"));

export default function HomePage() {
  useSEO({
    title: "Royal Enterprises Chennai - Premium Packaging & Storage Solutions | Industrial Crates, Wooden Pallets",
    description: "Royal Enterprises — Chennai's trusted packaging partner since 2009. Suppliers of HDPE industrial crates, wooden pallets, stretch films & complete packaging solutions to 50+ product variants serving businesses across India. Factory-direct pricing.",
    keywords: "industrial crates Chennai, wooden pallets supplier, HDPE crates, packaging solutions India, bottle crates, fish crates, stretch film, FIBC bags, corrugated boxes Chennai",
    url: "https://www.royalchennai.com/",
  });

  return (
    <>
      <Hero />
      <CompanyOverview />
      <IndustriesSection />
      <StatsStrip />
      <ProductGallery />
      <Suspense fallback={null}>
        <FeatureShowcase />
        <Testimonials />
        <SpecialOffer />
      </Suspense>
    </>
  );
}
