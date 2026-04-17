import { useSEO } from "../hooks/useSEO";
import PageBanner from "../components/PageBanner";
import Contact from "../components/Contact";
import MapSection from "../components/MapSection";

export default function ContactPage() {
  useSEO({
    title: "Contact Us - Royal Enterprises Chennai | +91 63818 70361 | Packaging Enquiry",
    description: "Contact Royal Enterprises for packaging product enquiries and bulk quotes. Call or WhatsApp +91 63818 70361 or +91 98411 48717. Office at Taramani, Chennai. Mon–Sat 9 AM–6 PM.",
    url: "https://www.royalchennai.com/contact",
  });

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Have a product enquiry or need a bulk quote? Call or WhatsApp us and we’ll respond fast."
        breadcrumb="Contact"
      />
      <Contact />
      <MapSection />
    </>
  );
}
