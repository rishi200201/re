import { useSEO } from "../hooks/useSEO";
import PageBanner from "../components/PageBanner";
import Branches from "../components/Branches";
import MapSection from "../components/MapSection";

export default function BranchesPage() {
  useSEO({
    title: "Delivery Coverage - Royal Enterprises | Pan-India Packaging Supply from Chennai",
    description: "Royal Enterprises delivers industrial packaging products across Tamil Nadu, South India, and pan-India. Same-day dispatch from Chennai. Fast delivery to Coimbatore, Bengaluru, Hyderabad, Mumbai, Delhi & more.",
    url: "https://www.royalchennai.com/branches",
  });

  return (
    <>
      <PageBanner
        title="Delivery Coverage"
        subtitle="From our Chennai base, we deliver packaging and storage solutions across Tamil Nadu, South India, and all major industrial hubs nationwide."
        breadcrumb="Delivery Coverage"
      />
      <Branches />
      <MapSection />
    </>
  );
}
