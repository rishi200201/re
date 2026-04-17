import { m } from "framer-motion";
import { FaMapMarkerAlt, FaTruck, FaBuilding } from "react-icons/fa";
import { SITE } from "../config/site";

const regions = [
  {
    name: "Tamil Nadu",
    description: "Same-day & next-day delivery available for bulk orders.",
    address: `Our HQ: ${SITE.address.full}`,
    areas: [
      "Chennai (Same Day)",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
    ],
    clients: [
      "Automotive plants – Sriperumbudur & Ambattur",
      "FMCG distribution centers",
      "Pharma companies – Guindy & Poonamallee",
      "Cold chain & logistics warehouses",
    ],
  },
  {
    name: "South India",
    description: "2–3 day delivery across southern states.",
    address: "Supply via transport partners to all major cities",
    areas: [
      "Bengaluru, Karnataka",
      "Hyderabad, Telangana",
      "Kochi & Thrissur, Kerala",
      "Visakhapatnam, AP",
      "Hubli-Dharwad",
      "Mysore & Tumkur",
    ],
    clients: [
      "Warehousing & 3PL companies",
      "Manufacturing & engineering firms",
      "Agri-produce exporters",
      "Retail & e-commerce distribution",
    ],
  },
  {
    name: "Pan India",
    description: "3–7 day delivery to all major industrial hubs.",
    address: "Delivery via road, rail & courier across India",
    areas: [
      "Mumbai & Pune, Maharashtra",
      "Delhi NCR",
      "Kolkata, West Bengal",
      "Ahmedabad, Gujarat",
      "Ludhiana, Punjab",
      "Jaipur, Rajasthan",
    ],
    clients: [
      "Export-oriented units (EOU)",
      "FMCG & FMCD manufacturers",
      "Chemical & industrial sectors",
      "Logistics & freight companies",
    ],
  },
];

export default function Branches() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Delivery Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-accent mt-3">
            We Deliver Across India
          </h2>
          <p className="text-gray-medium mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            From our Chennai base, Royal Enterprises supplies packaging and storage products
            to manufacturers, logistics firms, and businesses nationwide.
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {regions.map((b, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col bg-white"
            >
              {/* Header */}
              <div className="bg-accent p-6 text-white">
                <FaTruck className="text-primary text-lg mb-2" />
                <h3 className="text-lg font-bold">{b.name}</h3>
                <p className="text-white/60 text-sm mt-1">{b.description}</p>
              </div>

              {/* Address */}
              <div className="px-6 pt-5">
                <div className="flex items-start gap-2.5 text-sm text-gray-medium">
                  <FaMapMarkerAlt className="text-primary text-xs mt-1 shrink-0" />
                  <span>{b.address}</span>
                </div>
              </div>

              {/* Areas */}
              <div className="px-6 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-medium font-semibold mb-2.5">
                  Cities Covered
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {b.areas.map((area, j) => (
                    <span
                      key={j}
                      className="bg-gray-light text-accent text-[11px] font-medium px-2.5 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clients */}
              <div className="px-6 pt-4 pb-5 flex-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-medium font-semibold mb-2.5">
                  Key Client Sectors
                </p>
                <ul className="space-y-2">
                  {b.clients.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-accent/80">
                      <FaBuilding className="text-primary text-[10px] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
