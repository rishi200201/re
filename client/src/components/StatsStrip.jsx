import { m } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import { SITE } from "../config/site";

const stats = [
  { value: SITE.stats.yearsOfTrust,    suffix: "+", label: "Years of Trust",     desc: `Since ${SITE.stats.foundedYear}` },
  { value: SITE.stats.businessClients, suffix: "+", label: "Business Clients",   desc: "Across India" },
  { value: SITE.stats.productVarieties,suffix: "+", label: "Product Varieties",  desc: "Crates to pallets" },
  { value: SITE.stats.statesServed,    suffix: "+", label: "States Served",      desc: "Pan-India reach" },
];

export default function StatsStrip() {
  return (
    <section className="bg-accent py-14 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center md:px-8"
            >
              <div className="text-4xl sm:text-5xl font-black text-white leading-none mb-1">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  className="text-white"
                />
              </div>
              <div className="text-sm font-bold text-white/90 mt-2">{stat.label}</div>
              <div className="text-xs text-white/60 mt-0.5">{stat.desc}</div>
              <div className="w-8 h-0.5 bg-orange rounded-full mt-3" />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
