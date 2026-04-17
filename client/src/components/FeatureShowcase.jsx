import { m } from "framer-motion";
import { FaMedal, FaTruck, FaTag, FaTools, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { images } from "../assets/images/index";
import SectionHeader from "./SectionHeader";
import Container from "./Container";

const features = [
  {
    step: "01",
    icon: FaMedal,
    title: "Premium Material Quality",
    description:
      "All our products are manufactured using high-grade HDPE plastic and premium kiln-dried timber, ensuring maximum durability and longevity under demanding industrial conditions.",
    highlights: ["HDPE Grade A virgin plastic", "Load-tested & certified", "Food grade certified"],
    image: images.common.premiumQuality,
  },
  {
    step: "02",
    icon: FaTruck,
    title: "Pan-India Supply & Delivery",
    description:
      "We deliver packaging and storage solutions across Tamil Nadu and all major industrial hubs in India. Fast turnaround times with competitive freight rates on bulk orders.",
    highlights: ["Chennai same-day dispatch", "All major metro cities covered", "Bulk orders welcome"],
    image: images.common.supplyDelivery,
  },
  {
    step: "03",
    icon: FaTag,
    title: "Factory Direct Pricing",
    description:
      "We offer the best market prices without compromising on quality. As direct manufacturers, we eliminate middlemen and pass the cost savings directly to our business clients.",
    highlights: ["No middlemen — direct from factory", "Negotiable bulk discounts", "Transparent pricing always"],
    image: images.common.factoryPricing,
  },
  {
    step: "04",
    icon: FaTools,
    title: "Custom Manufacturing",
    description:
      "Need specific crate sizes, custom pallet dimensions, or bulk quantities with branding? Our manufacturing team can design and produce to your exact specifications.",
    highlights: ["Custom sizes & dimensions", "OEM & branded packaging", "Quick production turnaround"],
    image: images.products.industrialCrates,
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="What Makes Royal Enterprises Different"
          subtitle="Since 2015, we've been delivering premium packaging and storage solutions to businesses across India with quality and reliability at our core."
          className="mb-20"
        />

        <div className="space-y-20 sm:space-y-28">
          {features.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            const Icon = feature.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"
              >
                {/* Image */}
                <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-[280px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />
                    {/* Step badge */}
                    <div className="absolute top-5 left-5 w-12 h-12 bg-orange rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="text-white text-lg" />
                    </div>
                    {/* Step number ghost */}
                    <div className="absolute bottom-4 right-5 text-7xl font-black text-white/10 leading-none select-none">
                      {feature.step}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                  <span className="inline-flex items-center gap-2 text-orange text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="w-5 h-[2px] bg-orange rounded-full" />
                    Step {feature.step}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-accent leading-tight mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-medium leading-relaxed mb-7">{feature.description}</p>
                  <ul className="space-y-3 mb-8">
                    {feature.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-center gap-3">
                        <FaCheckCircle className="text-primary text-sm shrink-0" />
                        <span className="text-sm font-semibold text-accent">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm border-b-2 border-primary/30 hover:border-primary pb-0.5 transition-colors duration-200"
                  >
                    Get a Free Quote →
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
