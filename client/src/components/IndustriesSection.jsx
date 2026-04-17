import { m } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaIndustry,
  FaTruck,
  FaPills,
  FaSeedling,
  FaBoxes,
  FaCog,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";

const industries = [
  { icon: FaIndustry, name: "Manufacturing",           desc: "Heavy-duty crates & pallets engineered for production lines",    accent: "#1d4ed8", soft: "#eff6ff" },
  { icon: FaTruck,    name: "Logistics & Warehousing", desc: "Transit packaging & rack-ready storage for supply chains",        accent: "#2563eb", soft: "#eff6ff" },
  { icon: FaPills,    name: "Pharmaceuticals",          desc: "Hygienic HDPE crates & export-standard corrugated packaging",     accent: "#0369a1", soft: "#f0f9ff" },
  { icon: FaSeedling, name: "Agriculture & FMCG",       desc: "Fish crates, bottle crates & ventilated bulk storage bins",       accent: "#0d9488", soft: "#f0fdfa" },
  { icon: FaBoxes,    name: "E-Commerce & Retail",      desc: "Corrugated boxes, stretch films & last-mile delivery mailers",    accent: "#7c3aed", soft: "#f5f3ff" },
  { icon: FaCog,      name: "Automotive & Engineering", desc: "Custom industrial crates & precision component carriers",         accent: "#0f172a", soft: "#f8fafc" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

function IndustryCard({ ind, i }) {
  return (
    <m.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex-1 min-w-0 relative bg-white hover:bg-[#f8fafc] border border-gray-100 hover:border-blue-100 rounded-2xl p-6 transition-all duration-300 overflow-hidden group cursor-default shadow-sm hover:shadow-md"
    >
      {/* Accent left bar */}
      <div
        className="absolute top-5 bottom-5 left-0 w-[3px] rounded-r-full"
        style={{ background: ind.accent }}
      />

      {/* Icon row */}
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-[18px] shrink-0 mt-0.5"
          style={{ background: ind.soft, color: ind.accent }}
        >
          <ind.icon />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-bold mb-1.5 leading-snug"
            style={{ color: ind.accent }}
          >
            {ind.name}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">{ind.desc}</p>
        </div>
      </div>
    </m.div>
  );
}

function FlowConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-9 select-none">
      <div className="flex items-center gap-[3px] opacity-30">
        <div className="w-3 h-px bg-blue-300" />
        <div className="w-2 h-px bg-blue-200" />
        <FaChevronRight className="text-blue-300 text-[8px]" />
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#1d4ed8 1px, transparent 1px), linear-gradient(90deg, #1d4ed8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary px-3 py-1.5 bg-primary/8 rounded-full border border-primary/15 mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-accent mb-4 leading-tight">
            Packaging Solutions for Every Sector
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed">
            From automotive plants to pharmaceutical exporters — Royal Enterprises supplies
            reliable packaging to businesses across all major industries.
          </p>
        </m.div>

        {/* ── Flow layout ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">

          {/* Row 1: steps 01 → 02 → 03 */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0">
            {industries.slice(0, 3).map((ind, i) => (
              <div key={ind.name} className={`flex-1 flex items-center min-w-0 ${i > 0 ? "lg:ml-0" : ""}`}>
                <IndustryCard ind={ind} i={i} />
                {i < 2 && <FlowConnector />}
              </div>
            ))}
          </div>

          {/* S-turn connector — desktop only */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-3 px-[2px]">
            <div />
            <div className="flex items-center justify-center">
              <div className="w-px h-5 bg-blue-100 rounded-full" />
            </div>
            <div />
          </div>

          {/* Row 2: steps 04 → 05 → 06 */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0">
            {industries.slice(3, 6).map((ind, i) => (
              <div key={ind.name} className="flex-1 flex items-center min-w-0">
                <IndustryCard ind={ind} i={i + 3} />
                {i < 2 && <FlowConnector />}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 text-sm"
          >
            Enquire for Your Industry
            <FaArrowRight className="text-xs" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}


