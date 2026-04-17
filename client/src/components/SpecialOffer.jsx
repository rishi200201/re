import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaCheckCircle, FaArrowRight, FaPhone } from "react-icons/fa";
import { SITE } from "../config/site";

const benefits = [
  "Free quote within 4 hours",
  "Minimum order: 50 units",
  "Bulk discounts on 500+ units",
  "Same-day dispatch from Chennai",
  "Pan-India delivery available",
];

export default function SpecialOffer() {
  return (
    <section className="py-16 sm:py-24 bg-gray-light">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-accent"
        >
          {/* Decorative glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange/15 rounded-full blur-3xl pointer-events-none" />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-0 p-8 sm:p-12 lg:p-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-orange/25">
                <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
                Free Delivery on Orders Above ₹50,000 in Chennai
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-tight mb-4">
                Need Bulk Packaging?<br />
                <span className="text-orange">Let&apos;s Talk.</span>
              </h2>
              <p className="text-white/60 text-base mb-8 leading-relaxed max-w-md">
                Tell us your requirements and we&apos;ll send you a competitive quote within 4 hours. Factory-direct pricing guaranteed.
              </p>
              <ul className="space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-white/75">
                    <FaCheckCircle className="text-orange text-xs shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA card */}
            <div className="lg:pl-14 lg:border-l lg:border-white/10">
              <div className="bg-white rounded-2xl p-7 shadow-2xl">
                <h3 className="text-xl font-black text-accent mb-1">Get a Free Quote</h3>
                <p className="text-gray-medium text-sm mb-6">We respond within 4 hours on business days.</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={SITE.whatsapp.forProduct("bulk packaging")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    <FaWhatsapp className="text-lg" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={SITE.phone.primary.href}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    <FaPhone className="text-xs transform scale-x-[-1]" />
                    {SITE.phone.primary.display}
                  </a>
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-accent hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                  >
                    Fill Contact Form
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
                <p className="text-gray-400 text-[11px] text-center mt-4">
                  No spam &middot; No pushy sales &middot; Just a quote
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
