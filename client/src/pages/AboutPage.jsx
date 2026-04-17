import { useSEO } from "../hooks/useSEO";
import PageBanner from "../components/PageBanner";
import About from "../components/About";

export default function AboutPage() {
  useSEO({
    title: "About Us - Royal Enterprises | Packaging & Storage Solutions Since 2009 | Chennai",
    description: "Learn about Royal Enterprises (Royal Plastic Crates) — established in 2009 in Chennai. Trusted manufacturer and supplier of industrial crates, wooden pallets, and packaging materials. 50+ product variants serving businesses across Tamil Nadu and India. 95% customer satisfaction.",
    url: "https://www.royalchennai.com/about",
  });

  return (
    <>
      <PageBanner
        title="About Royal Enterprises"
        subtitle="Your trusted packaging and storage solutions partner since 2009. Serving businesses across India from Chennai with 50+ product variants."
        breadcrumb="About"
      />
      <About />
    </>
  );
}
