import { m } from "framer-motion";

const colorMap = {
  green:  { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", bar: "bg-emerald-500" },
  blue:   { bg: "bg-blue-50",    border: "border-blue-100",    text: "text-blue-600",    bar: "bg-blue-500" },
  purple: { bg: "bg-violet-50",  border: "border-violet-100",  text: "text-violet-600",  bar: "bg-violet-500" },
  orange: { bg: "bg-orange-50",  border: "border-orange-100",  text: "text-orange-600",  bar: "bg-orange" },
};

/**
 * ScoreCard — Overview metric card for the analytics dashboard.
 * @param {{ label: string, value: number|string, max: number, color: string, icon: string, delta: string|null }} props
 */
export default function ScoreCard({ label, value, max, color, icon, delta }) {
  const c = colorMap[color] ?? colorMap.blue;
  const isNumeric = typeof value === "number" && Number.isFinite(value);
  const pct = isNumeric && max > 0
    ? Math.max(0, Math.min(100, Math.round((value / max) * 100)))
    : 0;
  const isCount = isNumeric && value === max && delta === null;

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl p-5 shadow-sm border ${c.border} flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
        {delta && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            {delta}
          </span>
        )}
      </div>

      <div>
        <p className={`text-3xl font-black ${c.text} leading-none`}>
          {value}
          {isNumeric && !isCount && <span className="text-lg text-gray-300 font-normal">/{max}</span>}
        </p>
        <p className="text-sm font-semibold text-gray-medium mt-1">{label}</p>
      </div>

      {isNumeric && !isCount && (
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className={`h-full ${c.bar} rounded-full`}
          />
        </div>
      )}
    </m.div>
  );
}
