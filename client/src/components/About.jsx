import { m } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import AnimatedNumber from "./AnimatedNumber";
import { images } from "../assets/images/index";

const highlights = [
  "Trusted packaging partner since 2009",
  "50+ product variants available",
  "HDPE-grade A industrial crates",
  "ISI certified products available",
  "Taramani, Chennai-based manufacturer",
  "Competitive factory-direct pricing",
];

export default function About() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={images.common.aboutFactory}
                alt="Royal Enterprises Industrial Crates"
                loading="lazy"
                className="w-full h-[350px] sm:h-[440px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-4 bg-primary text-white rounded-xl px-6 py-4 shadow-xl shadow-primary/20">
              <div className="text-3xl font-extrabold leading-none">
                <AnimatedNumber
                  value={17}
                  suffix="+"
                  duration={2}
                  className="text-white"
                />
              </div>
              <div className="text-sm font-medium text-white/80 mt-1">Years of Trust</div>
            </div>
          </m.div>

          {/* Text Side */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-accent mt-3 mb-6 leading-tight">
              Welcome to Royal Enterprises
            </h2>
            <p className="text-gray-medium text-base sm:text-lg leading-relaxed mb-5">
              Established in 2009, Royal Enterprises (Royal Plastic Crates) has grown to become a trusted
              packaging and storage solutions provider in Chennai. We serve businesses
              across Tamil Nadu and India with 50+ premium-quality product variants.
            </p>
            <p className="text-gray-medium leading-relaxed mb-8">
              From HDPE industrial crates in multiple series and configurations to
              wooden pallets, plastic pallets, stretch films, and corrugated packaging —
              we provide the right solution for every storage and logistics need,
              at factory-direct prices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-primary text-sm shrink-0" />
                  <span className="text-sm font-medium text-accent">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-light rounded-xl px-5 py-3">
                <div className="text-xs text-gray-medium uppercase tracking-wider font-semibold mb-1">Est.</div>
                <div className="text-sm font-bold text-accent">Since 2009</div>
              </div>
              <div className="bg-gray-light rounded-xl px-5 py-3">
                <div className="text-xs text-gray-medium uppercase tracking-wider font-semibold mb-1">Products</div>
                <div className="text-sm font-bold text-accent">Crates, Pallets & More</div>
              </div>
              <div className="bg-gray-light rounded-xl px-5 py-3">
                <div className="text-xs text-gray-medium uppercase tracking-wider font-semibold mb-1">Supply</div>
                <div className="text-sm font-bold text-accent">Pan-India Delivery</div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
