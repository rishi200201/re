import { m } from "framer-motion";
import { FaBuilding, FaCalendarAlt, FaUsers, FaChartLine, FaIdCard, FaIndustry } from "react-icons/fa";
import { SITE } from "../config/site";
import Container from "./Container";
import SectionHeader from "./SectionHeader";

const companyInfoCards = [
  {
    icon: FaBuilding,
    label: "Business Type",
    value: SITE.businessType,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FaIndustry,
    label: "Firm Type",
    value: SITE.firmType,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: FaCalendarAlt,
    label: "Established",
    value: SITE.foundingYear,
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    icon: FaUsers,
    label: "Team Size",
    value: SITE.employees,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: FaChartLine,
    label: "Annual Turnover",
    value: SITE.turnover,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FaIdCard,
    label: "GST Number",
    value: SITE.gst,
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function CompanyOverview() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <SectionHeader
          eyebrow="About Us"
          title="Company Overview"
          subtitle={`${SITE.legalName} — Your trusted partner for industrial packaging and storage solutions in Chennai`}
          className="mb-14"
        />

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {companyInfoCards.map((item, i) => (
            <m.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`text-xl ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-bold text-accent leading-tight break-words">
                    {item.value}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Business Description */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/30 rounded-3xl p-8 sm:p-10 border border-primary/10"
        >
          <h3 className="text-2xl font-black text-accent mb-4 flex items-center gap-3">
            <span className="w-1 h-8 bg-primary rounded-full" />
            What We Do
          </h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-base sm:text-lg">
              <span className="font-bold text-primary">Royal Enterprises (Royal Plastic Crates)</span> is a leading{" "}
              <span className="font-semibold">wholesale trader and retailer</span> based in{" "}
              <span className="font-semibold">Chennai, Tamil Nadu</span>. Since{" "}
              <span className="font-semibold">{SITE.foundingYear}</span>, we have been engaged in providing comprehensive{" "}
              <span className="font-semibold text-primary">packaging and storage solutions</span> for industrial and commercial enterprises.
            </p>
            <p className="text-base">
              Our extensive product range includes <span className="font-semibold">industrial crates, wooden pallets, plastic pallets, bins, dustbins, FIBC jumbo bags, corrugated boxes,</span> and specialized packaging materials. We focus on delivering quality products that meet the demanding requirements of manufacturing, logistics, food & beverage, and export industries.
            </p>
            <p className="text-base">
              With a dedicated team of <span className="font-semibold">{SITE.employees} professionals</span> and{" "}
              <span className="font-semibold">{SITE.stats.productVarieties}+ product variants</span>, we proudly serve businesses across India with factory-direct pricing and reliable delivery.
            </p>
          </div>
        </m.div>

        {/* Key Highlights */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-gradient-to-br from-orange/10 to-orange/5 rounded-2xl border border-orange/20">
            <div className="text-4xl font-black text-orange mb-2">{SITE.stats.productVarieties}+</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Product Variants</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
            <div className="text-4xl font-black text-primary mb-2">{SITE.stats.customerSatisfaction}%</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Customer Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/5 rounded-2xl border border-green-600/20">
            <div className="text-4xl font-black text-green-700 mb-2">{SITE.stats.yearsOfTrust}+</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Years Experience</div>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
