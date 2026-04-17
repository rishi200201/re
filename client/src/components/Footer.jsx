import { Link } from "react-router-dom";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaChevronRight, FaClock } from "react-icons/fa";
import { SITE } from "../config/site";

// Reuse site-wide nav links — single source of truth in config/site.js
const quickLinks = SITE.navLinks;

const hqLocation = {
  name: "Chennai Headquarters",
  address: SITE.address.full,
  nearby: SITE.address.nearby,
};

export default function Footer() {
  return (
    <footer className="bg-accent text-white">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 overflow-hidden shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Royal Enterprises</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mt-0.5 tracking-[0.2em]">Packaging & Storage</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Trusted packaging partner since 2009.
              Supplying industrial crates, wooden pallets, and complete
              packaging solutions to businesses across India.
            </p>
            <div className="space-y-2">
              <a
                href={SITE.phone.primary.href}
                className="inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/25 text-primary text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaPhone className="text-xs" />
                {SITE.phone.primary.display}
              </a>
              <a
                href={SITE.phone.secondary.href}
                className="inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/25 text-primary text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ml-2"
              >
                <FaPhone className="text-xs" />
                {SITE.phone.secondary.display}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm group"
                  >
                    <FaChevronRight className="text-[8px] text-primary/50 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Our Location</h4>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                <FaMapMarkerAlt className="text-primary text-xs shrink-0" />
                {hqLocation.name}
              </p>
              <p className="text-white/60 text-xs ml-5 leading-relaxed">{hqLocation.address}</p>
              <p className="text-white/40 text-xs ml-5 italic">{hqLocation.nearby}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Contact Info</h4>
            <div className="space-y-3">
              <a href={SITE.phone.primary.href} className="flex items-center gap-2.5 text-white/50 hover:text-primary transition-colors text-sm">
                <FaPhone className="text-primary text-xs" />
                {SITE.phone.primary.display}
              </a>
              <a href={SITE.phone.secondary.href} className="flex items-center gap-2.5 text-white/50 hover:text-primary transition-colors text-sm">
                <FaPhone className="text-primary text-xs" />
                {SITE.phone.secondary.display}
              </a>
              <a href={SITE.email.href} className="flex items-center gap-2.5 text-white/50 hover:text-primary transition-colors text-sm">
                <FaEnvelope className="text-primary text-xs" />
                <span className="break-all">{SITE.email.display}</span>
              </a>
              <p className="flex items-start gap-2.5 text-white/50 text-sm">
                <FaMapMarkerAlt className="text-primary text-xs mt-1 shrink-0" />
                {SITE.address.area}, {SITE.address.city} – {SITE.address.pin}
              </p>
              <p className="flex items-center gap-2.5 text-white/50 text-sm">
                <FaClock className="text-primary text-xs" />
                {SITE.hours.short}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Royal Enterprises. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Developed by <span className="text-white/40 font-medium">Rishi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
