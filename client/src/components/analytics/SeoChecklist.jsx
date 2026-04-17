import { useState } from "react";
import { m } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

const STORAGE_KEY = "rc_seo_checklist_v1";

// These are manual tasks that cannot be DOM-verified (e.g. external accounts,
// GSC setup). They persist their checked state to localStorage.
const TASKS = [
  // Technical — automatically done by this codebase
  { id: "meta-tags",     group: "Technical",     label: "Meta title & description on every page" },
  { id: "canonical",     group: "Technical",     label: "Canonical URLs set per page"            },
  { id: "og-tags",       group: "Technical",     label: "Open Graph tags"                        },
  { id: "twitter-card",  group: "Technical",     label: "Twitter Card (valid image)"             },
  { id: "json-ld-org",   group: "Technical",     label: "Organization JSON-LD schema"            },
  { id: "json-ld-local", group: "Technical",     label: "LocalBusiness JSON-LD schema"           },
  { id: "agg-rating",    group: "Technical",     label: "AggregateRating in schema"              },
  { id: "sitemap",       group: "Technical",     label: "XML sitemap (22 real product URLs)"     },
  { id: "robots-txt",    group: "Technical",     label: "robots.txt configured"                  },
  { id: "noscript",      group: "Technical",     label: "Noscript fallback"                      },
  { id: "webp-hero",     group: "Performance",   label: "WebP hero image + preload"              },
  { id: "lazy-images",   group: "Performance",   label: "Lazy-load below-fold images"            },
  { id: "code-split",    group: "Performance",   label: "Route-level code splitting"             },
  { id: "map-lazy",      group: "Performance",   label: "Google Maps click-to-load"              },
  { id: "self-fonts",    group: "Performance",   label: "Self-hosted fonts (no CDN)"             },
  { id: "skip-link",     group: "Accessibility", label: "Skip-to-content link"                  },
  { id: "aria-form",     group: "Accessibility", label: "Form aria-describedby on all inputs"   },
  { id: "aria-nav",      group: "Accessibility", label: "Mobile nav aria-expanded"              },
  { id: "focus-ring",    group: "Accessibility", label: "Global focus-visible ring (CSS)"       },
  // Manual tasks — user must complete
  { id: "gsc",           group: "Pending",       label: "Submit sitemap to Google Search Console"},
  { id: "fb-page",       group: "Pending",       label: "Create Facebook business page"          },
  { id: "instagram",     group: "Pending",       label: "Create Instagram profile"              },
  { id: "linkedin",      group: "Pending",       label: "Create LinkedIn company page"          },
];

// 19 of the first 19 are "done" by default (code-level work is complete).
// The last 4 (Pending) start as false.
const DEFAULT_DONE = new Set(TASKS.slice(0, 19).map(t => t.id));

const GROUPS = [...new Set(TASKS.map(t => t.group))];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return TASKS.map(t => ({ ...t, done: t.id in saved ? saved[t.id] : DEFAULT_DONE.has(t.id) }));
  } catch {
    return TASKS.map(t => ({ ...t, done: DEFAULT_DONE.has(t.id) }));
  }
}

function persistState(items) {
  const map = Object.fromEntries(items.map(i => [i.id, i.done]));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch { /* quota exceeded — silently ignore */ }
}

export default function SeoChecklist() {
  const [items, setItems] = useState(loadState);

  const toggle = (id) => {
    setItems(prev => {
      const next = prev.map(item => item.id === id ? { ...item, done: !item.done } : item);
      persistState(next);
      return next;
    });
  };

  const doneCount = items.filter(i => i.done).length;
  const pct = Math.round((doneCount / items.length) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-accent">SEO Checklist</h2>
        <span className="text-sm font-black text-primary">{pct}%</span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <m.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-5 overflow-y-auto flex-1" style={{ maxHeight: 400 }}>
        {GROUPS.map(group => (
          <div key={group}>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-medium mb-2 px-1">
              {group}
            </p>
            <div className="space-y-1.5">
              {items.filter(item => item.group === group).map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                    item.done
                      ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-medium"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    item.done ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}>
                    {item.done ? <FaCheck className="text-[9px]" /> : <FaTimes className="text-[9px]" />}
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-medium text-center mt-4 pt-4 border-t border-gray-100">
        {doneCount}/{items.length} complete · State saved to browser
      </p>
    </div>
  );
}
