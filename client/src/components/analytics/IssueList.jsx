import { m } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const severityConfig = {
  high:   { label: "High",   Icon: FaExclamationCircle,  color: "text-red-500",   bg: "bg-red-50",   border: "border-red-100" },
  medium: { label: "Medium", Icon: FaExclamationTriangle, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  low:    { label: "Low",    Icon: FaInfoCircle,          color: "text-blue-500",  bg: "bg-blue-50",  border: "border-blue-100" },
};

/**
 * IssueList — Displays a tracked list of SEO / accessibility issues with resolved state.
 * @param {{ issues: Array<{ id: number, severity: string, title: string, file: string, fix: string, resolved: boolean }> }} props
 */
export default function IssueList({ issues }) {
  const resolvedCount = issues.filter((i) => i.resolved).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-accent">Issue Tracker</h2>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          {resolvedCount}/{issues.length} Resolved
        </span>
      </div>

      <div className="space-y-2.5 overflow-y-auto flex-1" style={{ maxHeight: 480 }}>
        {issues.map((issue, i) => {
          const s = severityConfig[issue.severity] ?? severityConfig.low;
          const { Icon } = s;

          return (
            <m.div
              key={issue.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-xl p-4 border ${
                issue.resolved
                  ? "bg-emerald-50/70 border-emerald-100"
                  : `${s.bg} ${s.border}`
              }`}
            >
              <div className="flex items-start gap-3">
                {issue.resolved ? (
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <Icon className={`${s.color} mt-0.5 shrink-0`} />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`text-sm font-semibold ${
                        issue.resolved
                          ? "text-emerald-700 line-through decoration-emerald-400/60"
                          : "text-accent"
                      }`}
                    >
                      {issue.title}
                    </p>
                    {!issue.resolved && (
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${s.bg} ${s.color} border ${s.border}`}
                      >
                        {s.label}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-medium font-mono mt-0.5">{issue.file}</p>
                  <p className="text-xs text-gray-medium mt-1 leading-relaxed">{issue.fix}</p>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
