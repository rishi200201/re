import { useState } from "react";
import { m } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SITE } from "../config/site";
import { toCategoryLabel } from "../lib/utils";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProductCard({ product, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const categoryLabel = toCategoryLabel(product.category);

  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.28), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
    >
      {/* ── Image ──────────────────────────────────────────────────── */}
      <div
        className="relative block w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 h-[240px] sm:h-[260px]"
      >
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-[3px] border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            width={400}
            height={260}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            className={`w-full h-full object-contain object-center p-4 group-hover:scale-105 transition-transform duration-700 ease-out ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        ) : (
          <ImagePlaceholder productName={product.shortName || product.name} category={product.category} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-accent/70 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg border border-primary/10 z-10">
          {categoryLabel}
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 mb-4 min-h-[64px] flex flex-col justify-center">
          <h3 className="font-bold text-accent text-[13px] leading-snug line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-1">
            {product.tag}
          </p>
        </div>

        <a
          href={SITE.whatsapp.forProduct(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get a WhatsApp quote for ${product.name}`}
          className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xs px-3 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-sm"
        >
          <FaWhatsapp className="text-sm" />
          Get a Quote
        </a>
      </div>
    </m.article>
  );
}
