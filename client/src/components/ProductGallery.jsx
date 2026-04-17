import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { PRODUCT_CATEGORIES_GALLERY } from "../data/products";
import SectionHeader from "./SectionHeader";
import Container from "./Container";

export default function ProductGallery() {
  return (
    <section className="py-20 sm:py-28 bg-gray-light">
      <Container>
        <SectionHeader
          eyebrow="Our Products"
          title="One-Stop Packaging Destination"
          subtitle="Industrial-grade packaging and storage solutions for manufacturers, logistics companies, exporters, and retailers across India."
          className="mb-14"
        />

        {/* Category image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {PRODUCT_CATEGORIES_GALLERY.map((cat, i) => (
            <m.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
            >
              {/* Image */}
              <div className="block relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/30 to-transparent" />
                {/* Category label on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{cat.name}</h3>
                  <p className="text-white/80 text-xs mt-1 drop-shadow">{cat.count} products</p>
                </div>
              </div>

              {/* Items list */}
              <div className="p-5">
                <ul className="space-y-1.5 mb-4">
                  {cat.items.slice(0, 3).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-accent/70">
                      <span className="mt-1.5 w-1 h-1 bg-orange rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                  {cat.items.length > 3 && (
                    <li className="text-xs text-gray-medium ml-3">+{cat.items.length - 3} more variants</li>
                  )}
                </ul>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:gap-2.5 transition-all"
                >
                  View All <FaArrowRight className="text-[8px]" />
                </Link>
              </div>
            </m.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
        >
          <div>
            <h3 className="text-lg font-black text-accent">Need a Custom Quote?</h3>
            <p className="text-gray-medium text-sm mt-0.5">Contact us for bulk orders or custom sizes. We respond within 4 hours.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all text-sm"
            >
              Browse All
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-sm shadow-md shadow-primary/20"
            >
              Get Quote <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
