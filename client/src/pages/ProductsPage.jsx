import { useSEO } from "../hooks/useSEO";
import PageBanner from "../components/PageBanner";
import ProductsListing from "../components/ProductsListing";

export default function ProductsPage() {
  useSEO({
    title: "Products - Royal Enterprises Chennai | Industrial Crates, Pallets & Packaging",
    description: "Browse all packaging product categories at Royal Enterprises: HDPE industrial crates, bottle crates, fish crates, bins, dustbins, wooden pallets and more. Factory-direct supply across India.",
    url: "https://www.royalchennai.com/products",
  });

  return (
    <>
      <PageBanner
        title="Our Products"
        subtitle="Premium quality packaging and storage solutions — direct from the factory to your business."
        breadcrumb="Products"
      />
      <ProductsListing />
    </>
  );
}
