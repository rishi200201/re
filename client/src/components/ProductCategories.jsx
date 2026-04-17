import { m } from "framer-motion";
import {
  FaBoxes,
  FaPallet,
  FaBox,
  FaWhatsapp,
  FaCheck,
  FaShapes,
  FaShoppingBag,
  FaLayerGroup,
} from "react-icons/fa";
import { images } from "../assets/images/index";
import { SITE } from "../config/site";

const products = [
  {
    name: "300 Series Crate",
    subtitle: "Compact Industrial Crate",
    tag: "Best Value",
    tagColor: "bg-emerald-500",
    icon: <FaBoxes />,
    image: images.products.industrialCrates,
    specs: ["L 300 × W 200 × H 175 mm", "Load: 25 kg static", "HDPE Virgin Plastic"],
    inquiryText: "Hi, I need a quote for 300 Series Industrial Crates.",
  },
  {
    name: "400 Series Crate",
    subtitle: "Standard Industrial Crate",
    tag: "Popular",
    tagColor: "bg-primary",
    icon: <FaBoxes />,
    image: images.products.industrialCrates,
    specs: ["L 400 × W 300 × H 230 mm", "Load: 50 kg static", "Stackable & Nestable"],
    inquiryText: "Hi, I need a quote for 400 Series Industrial Crates.",
  },
  {
    name: "600×400 Series Crate",
    subtitle: "Heavy Duty Industrial Crate",
    tag: null,
    icon: <FaBoxes />,
    image: images.products.industrialCrates,
    specs: ["L 600 × W 400 × H 280 mm", "Load: 75 kg static", "Anti-Slip Base"],
    inquiryText: "Hi, I need a quote for 600x400 Series Industrial Crates.",
  },
  {
    name: "Super Jumbo Crate",
    subtitle: "Extra-Large Storage Crate",
    tag: "Heavy Duty",
    tagColor: "bg-slate-700",
    icon: <FaBoxes />,
    image: images.products.bins,
    specs: ["L 800 × W 600 × H 460 mm", "Load: 150 kg static", "Export Grade"],
    inquiryText: "Hi, I need a quote for Super Jumbo Industrial Crates.",
  },
  {
    name: "Roto Crate",
    subtitle: "Rotomoulded Crate",
    tag: null,
    icon: <FaBoxes />,
    image: images.products.industrialCrates,
    specs: ["One-piece moulded body", "Seamless, easy-clean", "Food Grade Available"],
    inquiryText: "Hi, I need a quote for Roto Crates.",
  },
  {
    name: "4-Way Wooden Pallet",
    subtitle: "Standard Timber Pallet",
    tag: "Fast Moving",
    tagColor: "bg-amber-600",
    icon: <FaPallet />,
    image: images.products.pallets,
    specs: ["1200 × 1000 mm standard", "Load: 1000 kg dynamic", "Kiln-Dried Timber"],
    inquiryText: "Hi, I need a quote for 4-Way Wooden Pallets.",
  },
  {
    name: "Euro Wooden Pallet",
    subtitle: "Export / Euro Standard",
    tag: null,
    icon: <FaPallet />,
    image: images.products.pallets,
    specs: ["1200 × 800 mm (EUR 1)", "Heat-treated (ISPM-15)", "Export Certified"],
    inquiryText: "Hi, I need a quote for Euro Standard Wooden Pallets.",
  },
  {
    name: "Plastic Rackable Pallet",
    subtitle: "HDPE Plastic Pallet",
    tag: "Long Life",
    tagColor: "bg-blue-600",
    icon: <FaShapes />,
    image: images.products.pallets,
    specs: ["1200 × 1000 mm", "Load: 3000 kg racking", "Hygienic & Washable"],
    inquiryText: "Hi, I need a quote for Plastic Rackable Pallets.",
  },
  {
    name: "Corrugated Boxes",
    subtitle: "Single / Double / Triple Wall",
    tag: "Bulk Available",
    tagColor: "bg-teal-600",
    icon: <FaBox />,
    image: images.products.cratesFabrication,
    specs: ["Custom sizes available", "Printed & plain options", "Food-grade available"],
    inquiryText: "Hi, I need a quote for Corrugated Boxes (custom sizes).",
  },
  {
    name: "Fish Crate",
    subtitle: "Aquaculture Storage",
    tag: "High Demand",
    tagColor: "bg-cyan-600",
    icon: <FaBoxes />,
    image: images.products.fishCrate,
    specs: ["L 650 × W 450 mm", "Load: 30 kg dynamic", "Double Wall Construction"],
    inquiryText: "Hi, I need a quote for Fish Crates.",
  },
  {
    name: "Bottle Crate",
    subtitle: "Beverage Logistics",
    tag: "Stackable",
    tagColor: "bg-blue-600",
    icon: <FaLayerGroup />,
    image: images.products.bottleCrate,
    specs: ["24 Partitions", "L 400 × W 300 mm", "High Impact Material"],
    inquiryText: "Hi, I need a quote for Bottle Crates.",
  },
  {
    name: "FIBC Jumbo Bags",
    subtitle: "Flexible Bulk Containers",
    tag: "Premium",
    tagColor: "bg-violet-600",
    icon: <FaShoppingBag />,
    image: images.products.dustbins,
    specs: ["500 kg – 2000 kg SWL", "UV stabilized PP fabric", "Custom loops & liners"],
    inquiryText: "Hi, I need a quote for FIBC Jumbo Bags.",
  },
];

export default function ProductCategories() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Full Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-accent mt-3">
            Product Catalog
          </h2>
          <p className="text-gray-medium mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Browse our full range — from industrial crates and pallets to corrugated boxes
            and bulk bags. Enquire via WhatsApp for best pricing on bulk orders.
          </p>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {products.map((product, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className={`relative rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group overflow-hidden ${
                product.tag === "Popular"
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-gray-100"
              }`}
            >
              {product.tag && (
                <span className={`absolute top-3 right-3 ${product.tagColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-20`}>
                  {product.tag}
                </span>
              )}

              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-primary shadow-lg">
                  {product.icon}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-bold text-accent text-sm leading-tight">{product.name}</h3>
                  <p className="text-[11px] text-gray-medium mt-0.5">{product.subtitle}</p>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {product.specs.map((spec, si) => (
                    <li key={si} className="flex items-start gap-2 text-[12px] text-accent">
                      <FaCheck className="text-primary text-[9px] mt-0.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${SITE.whatsapp.base}?text=${encodeURIComponent(product.inquiryText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                  <FaWhatsapp className="text-sm" />
                  Enquire on WhatsApp
                </a>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
