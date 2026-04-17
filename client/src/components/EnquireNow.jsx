import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { SITE } from "../config/site";

export default function EnquireNow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 sm:gap-3 items-end"
        >
          {/* WhatsApp button */}
          <a
            href={SITE.whatsapp.generalEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="text-xl sm:text-2xl" />
          </a>

          {/* Call button */}
          <a
            href={SITE.phone.primary.href}
            className="w-11 h-11 sm:w-12 sm:h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-110"
            aria-label={`Call us at ${SITE.phone.primary.display}`}
          >
            <FaPhone className="text-sm transform scale-x-[-1]" />
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}

