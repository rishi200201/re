import { m } from "framer-motion";

/**
 * Reusable section header with optional eyebrow text, title, and subtitle.
 *
 * Props:
 *  - eyebrow   string   Small uppercase label above the title
 *  - title     string   Main heading (required)
 *  - subtitle  string   Optional paragraph below
 *  - centered  bool     Center-align text (default: true)
 *  - light     bool     White text variant for dark backgrounds
 *  - className string   Extra classes applied to wrapper
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
  className = "",
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 ${
            light ? "text-orange" : "text-primary"
          }`}
        >
          <span
            className={`w-6 h-[2px] rounded-full inline-block ${
              light ? "bg-orange" : "bg-primary"
            }`}
          />
          {eyebrow}
          <span
            className={`w-6 h-[2px] rounded-full inline-block ${
              light ? "bg-orange" : "bg-primary"
            }`}
          />
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-[2.6rem] font-black leading-tight tracking-tight ${
          light ? "text-white" : "text-accent"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-gray-medium"}`}
        >
          {subtitle}
        </p>
      )}
    </m.div>
  );
}
