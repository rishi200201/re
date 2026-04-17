import { useRef } from "react";
import { m, useInView } from "framer-motion";

const DEFS = [
  { key: "lcp",  label: "Largest Contentful Paint", threshold: "< 2.5s",  description: "Time until the main content is visible" },
  { key: "fcp",  label: "First Contentful Paint",   threshold: "< 1.8s",  description: "Time until first text or image appears"  },
  { key: "cls",  label: "Cumulative Layout Shift",  threshold: "< 0.1",   description: "Visual stability — how much content moves" },
  { key: "ttfb", label: "Time to First Byte",       threshold: "< 800ms", description: "Server response latency"                  },
];

const COLOR = {
  emerald: { bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  amber:   { bar: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border-amber-100"       },
  red:     { bar: "bg-red-500",     badge: "bg-red-50 text-red-700 border-red-100"             },
  gray:    { bar: "bg-gray-300",    badge: "bg-gray-50 text-gray-500 border-gray-200"          },
};

function MetricBar({ def, metric, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const c = metric ? COLOR[metric.color] ?? COLOR.gray : COLOR.gray;
  const pct = metric?.pct ?? 0;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-50 rounded-xl p-5"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-medium block">
            {def.key.toUpperCase()}
          </span>
          <p className="text-sm text-accent font-medium leading-tight mt-0.5">{def.label}</p>
          <p className="text-[11px] text-gray-medium mt-0.5">{def.description}</p>
        </div>

        <div className="text-right shrink-0">
          {metric ? (
            <>
              <p className={`text-2xl font-black leading-none ${metric.color === "emerald" ? "text-emerald-600" : metric.color === "amber" ? "text-amber-600" : "text-red-600"}`}>
                {metric.display}
              </p>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border mt-1 inline-block ${c.badge}`}>
                {metric.rating}
              </span>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-gray-300 leading-none">—</p>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border mt-1 inline-block bg-gray-50 text-gray-400 border-gray-200">
                Measuring…
              </span>
            </>
          )}
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          className={`h-full ${c.bar} rounded-full`}
        />
      </div>
      <p className="text-[11px] text-gray-medium mt-1.5">Target: {def.threshold}</p>
    </m.div>
  );
}

/**
 * PerformancePanel — accepts live metrics from usePerformanceMetrics().
 * Shows "Measuring…" until the browser reports each value.
 *
 * @param {{ metrics: ReturnType<typeof usePerformanceMetrics> }} props
 */
export default function PerformancePanel({ metrics }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-accent">Core Web Vitals</h2>
        <span className="text-xs text-gray-medium bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
          Live · Current session
        </span>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {DEFS.map((def, i) => (
          <MetricBar key={def.key} def={def} metric={metrics?.[def.key] ?? null} index={i} />
        ))}
      </div>
    </div>
  );
}
