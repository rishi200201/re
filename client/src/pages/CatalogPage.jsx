import { useSEO } from "../hooks/useSEO";
import PageBanner from "../components/PageBanner";
import ProductCategories from "../components/ProductCategories";

export default function CatalogPage() {
  useSEO({
    title: "Product Catalog - Royal Enterprises | Industrial Crates, Pallets & Packaging Prices",
    description: "Full product catalog for Royal Enterprises Chennai. Industrial crates (300, 400, 600×400 series, Super Jumbo, Roto), wooden pallets, plastic pallets, corrugated boxes, FIBC bags. Get bulk pricing via WhatsApp.",
    url: "https://www.royalchennai.com/catalog",
  });

  return (
    <>
      <PageBanner
        title="Product Catalog"
        subtitle="Browse our complete range of industrial crates, pallets, and packaging materials. Enquire via WhatsApp for bulk pricing."
        breadcrumb="Product Catalog"
      />
      <ProductCategories />
    </>
  );
}
