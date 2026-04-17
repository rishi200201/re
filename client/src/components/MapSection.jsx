import { useState } from "react";
import { m } from "framer-motion";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { SITE } from "../config/site";

// Standard Google Maps embed URL — stable ?q=...&output=embed format, no undocumented params.
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&output=embed`;

export default function MapSection() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="py-16 sm:py-20 bg-gray-light">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Find Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mt-2">
            Our Location — Taramani, Chennai
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-md"
        >
          {mapLoaded ? (
            <iframe
              title="Royal Enterprises Location — Taramani, Chennai"
              src={MAP_SRC}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[400px] lg:h-[450px]"
            />
          ) : (
            /* Click-to-load placeholder — avoids loading heavy Google iframe until needed */
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-5 group hover:from-primary/5 hover:to-primary/10 transition-all duration-300 cursor-pointer"
              aria-label="Load interactive Google Map"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt className="text-2xl text-primary" />
              </div>
              <div className="text-center px-6">
                <p className="text-accent font-bold text-base mb-1">
                  {SITE.address.full}
                </p>
                <p className="text-gray-medium text-sm">{SITE.address.nearby}</p>
              </div>
              <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm group-hover:bg-primary-dark transition-colors">
                <FaMapMarkerAlt className="text-xs" />
                Click to load interactive map
              </span>
            </button>
          )}
        </m.div>

        <div className="text-center mt-6">
          <a
            href={SITE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Open in Google Maps
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
