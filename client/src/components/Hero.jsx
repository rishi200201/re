import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { FaWhatsapp, FaArrowRight, FaCheckCircle, FaTruck, FaShieldAlt } from "react-icons/fa";
import { SITE } from "../config/site";

// Public-path image — no Vite hash, enabling <link rel="preload"> in index.html.
// High-quality plastic crates image from Unsplash
const HERO_JPG = "/hero-crates.jpg";
const HERO_WEBP = "/hero-crates.webp";

const heroFeatures = [
  "Grade-A HDPE Industrial Crates",
  "Wooden & Plastic Pallets",
  "Factory-Direct Pricing",
  "Pan-India Delivery",
];

const trustStats = [
  { value: `${SITE.stats.yearsOfTrust}+`,     label: "Years Trusted" },
  { value: `${SITE.stats.businessClients}+`,   label: "Business Clients" },
  { value: `${SITE.stats.statesServed}+`,      label: "States Served" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-accent overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-20 w-full items-center pt-24 pb-20 lg:py-24">

          {/* ─ Left: Content ─────────────────────────────────────────── */}
          <div>
            <m.div {...fadeUp(0)} className="mb-6">
              <span className="inline-flex items-center gap-2.5 bg-orange/15 border border-orange/25 text-orange text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
                Trusted Packaging Partner Since 2009
              </span>
            </m.div>

            <m.h1
              {...fadeUp(0.1)}
              className="text-[2.1rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-black text-white leading-[1.05] tracking-tight mb-5"
            >
              Reliable<br />
              <span className="text-primary-light">Packaging</span> &<br />
              Storage Solutions.
            </m.h1>

            <m.p
              {...fadeUp(0.2)}
              className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            >
              From HDPE industrial crates to wooden pallets — supplying manufacturers,
              logistics firms, and retailers across India with factory-direct quality and pricing.
            </m.p>

            <m.div
              {...fadeUp(0.3)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-9"
            >
              {heroFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                  <FaCheckCircle className="text-orange shrink-0 text-xs" />
                  {f}
                </div>
              ))}
            </m.div>

            <m.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-orange hover:bg-orange-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange/30 hover:shadow-orange/50 hover:scale-[1.02] text-sm w-full sm:w-auto"
              >
                Get Free Quote
                <FaArrowRight className="text-xs" />
              </Link>
              <a
                href={SITE.whatsapp.generalEnquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm w-full sm:w-auto"
              >
                <FaWhatsapp className="text-xl text-green-400" />
                WhatsApp Us
              </a>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="relative rounded-2xl overflow-hidden shadow-xl lg:hidden mb-9"
              style={{ aspectRatio: "16/10" }}
            >
              <picture>
                <source srcSet={HERO_WEBP} type="image/webp" />
                <img
                  src={HERO_JPG}
                  alt="HDPE Industrial Crates - All Types and Varieties"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/55 to-transparent" />
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex items-center justify-between sm:justify-start gap-5 sm:gap-8 pt-7 border-t border-white/10"
            >
              {trustStats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-black text-white leading-none">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 font-semibold uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </m.div>
          </div>

          {/* ─ Right: Image Panel ────────────────────────────────────── */}
          <div className="relative hidden lg:block">
            <m.div
              initial={{ opacity: 0, scale: 0.93, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <picture>
                <source srcSet={HERO_WEBP} type="image/webp" />
                <img
                  src={HERO_JPG}
                  alt="HDPE Industrial Crates - All Types and Varieties"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-accent/10 to-transparent" />
            </m.div>

            {/* Floating: clients */}
            <m.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-2xl p-5 min-w-[160px]"
            >
              <div className="text-4xl font-black text-primary leading-none">50+</div>
              <div className="text-xs text-gray-medium font-semibold mt-1 uppercase tracking-wide">Product Variants</div>
              <div className="flex items-center mt-3">
                {["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"].map((c, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 ${c} rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold`}
                    style={{ marginLeft: i > 0 ? "-6px" : 0 }}
                  >
                    {["R", "S", "A", "M", "P"][i]}
                  </div>
                ))}
                <span className="text-[10px] text-gray-medium ml-2">+845</span>
              </div>
            </m.div>

            {/* Floating: years */}
            <m.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute -top-5 -right-4 bg-orange rounded-2xl shadow-xl px-5 py-4 text-white"
            >
              <div className="text-3xl font-black leading-none">17+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">Years of Trust</div>
            </m.div>

            {/* Floating: delivery */}
            <m.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute bottom-24 -right-6 bg-accent border border-white/10 rounded-xl shadow-xl px-4 py-3"
            >
              <div className="text-white font-bold text-xs flex items-center gap-2">
                <FaTruck className="text-orange text-sm" />
                Pan-India Delivery
              </div>
              <div className="text-white/50 text-[10px] mt-0.5 ml-5">Same-day dispatch available</div>
            </m.div>

            {/* Quality overlay badge */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute top-6 left-6 flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2"
            >
              <FaShieldAlt className="text-orange text-sm" />
              <span className="text-white text-xs font-semibold">Grade-A HDPE Quality</span>
            </m.div>
          </div>
        </div>
      </div>

      {/* Wave divider into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#f1f5f9" />
        </svg>
      </div>
    </section>
  );
}

