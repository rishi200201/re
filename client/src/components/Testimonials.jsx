import { m } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import Container from "./Container";

const reviews = [
  {
    name: "Rajesh Kumar",
    company: "Apex Auto Components Pvt. Ltd.",
    initial: "R",
    color: "bg-blue-600",
    rating: 5,
    timeAgo: "3 months ago",
    text: "We have been sourcing industrial crates from Royal Enterprises for over 2 years. The quality is consistently excellent — HDPE grade A, perfectly stackable, and they never break even under heavy load. Delivery to our Ambattur plant is always on time.",
  },
  {
    name: "Suresh Iyer",
    company: "FreshMart Distribution, Coimbatore",
    initial: "S",
    color: "bg-emerald-600",
    rating: 5,
    timeAgo: "5 months ago",
    text: "We needed food-grade plastic crates in bulk for our produce distribution network across Tamil Nadu. Royal Enterprises delivered 1,500 units within 4 days with excellent post-order support. Very competitive pricing.",
  },
  {
    name: "Priya Venkatesh",
    company: "VKS Logistics & Warehousing",
    initial: "P",
    color: "bg-violet-600",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Sourced 300 wooden pallets and 200 plastic rackable pallets for our new warehouse in Sriperumbudur. Royal Enterprises gave us the best price in the market, delivered on schedule, and the quality passed our vendor audit.",
  },
  {
    name: "Mohammed Farhan",
    company: "PharmaTech Exports, Chennai",
    initial: "M",
    color: "bg-rose-600",
    rating: 5,
    timeAgo: "2 months ago",
    text: "For pharmaceutical exports, packaging integrity is critical. Royal Enterprises' corrugated boxes and FIBC bags met our export specifications and ISPM-15 requirements. The team was knowledgeable and responsive.",
  },
  {
    name: "Arjun Nair",
    company: "GreenPack Industries, Kochi",
    initial: "A",
    color: "bg-amber-600",
    rating: 5,
    timeAgo: "4 months ago",
    text: "We source stretch films and strapping rolls regularly. Their pricing is 15–20% better than local suppliers here in Kochi, and the pan-India delivery is reliable. We've been satisfied customers for 2 years.",
  },
  {
    name: "Kavitha Rajan",
    company: "SunFresh Agro Pvt. Ltd.",
    initial: "K",
    color: "bg-teal-600",
    rating: 5,
    timeAgo: "6 months ago",
    text: "We use fish crates for our seafood export business. Royal Enterprises provided exactly what we needed — food-grade, easy to clean, and frost-resistant. Excellent quality at reasonable bulk pricing.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={`text-xs ${i < rating ? "text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-accent overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Client Testimonials"
          title="Trusted by 500+ Businesses"
          subtitle="Real feedback from manufacturers, exporters, and logistics companies across India."
          light
          className="mb-4"
        />

        {/* Aggregate */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className="text-amber-400 text-lg" />
            ))}
          </div>
          <span className="text-3xl font-black text-white">5.0</span>
          <span className="text-white/40 text-sm border-l border-white/20 pl-3">
            500+ verified clients
          </span>
        </m.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 flex flex-col"
            >
              <FaQuoteLeft className="text-orange/40 text-2xl mb-4 shrink-0" />
              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">{r.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm truncate">{r.name}</h4>
                  <p className="text-[11px] text-white/50 truncate mt-0.5">{r.company}</p>
                  <StarRating rating={r.rating} />
                </div>
                <span className="text-[10px] text-white/30 shrink-0 self-start mt-0.5">{r.timeAgo}</span>
              </div>
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
