import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaWhatsapp, FaPhone, FaBoxOpen } from "react-icons/fa";
import { ALL_PRODUCTS, CATEGORIES, PRODUCT_CATEGORIES_GALLERY } from "../data/products";
import { SITE } from "../config/site";
import ProductCard from "./ProductCard";

export default function ProductsListing() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all"
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All Products";

  const handleCategory = (id) => {
    setActiveCategory(id);
    setSearch("");
  };

  return (
    <section className="bg-[#f8fafc] pb-20 sm:pb-28">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10">
        <div className="flex gap-8 xl:gap-10 items-start">

          {/* ── Sidebar — desktop only ─────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-1.5 w-56 xl:w-60 shrink-0 sticky top-24">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-medium mb-2 px-1">
              Filter by Category
            </p>

            {/* All Products button */}
            <button
              onClick={() => handleCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-accent hover:bg-primary/5 hover:text-primary shadow-sm border border-gray-100"
              }`}
            >
              <FaBoxOpen
                className={`text-xs shrink-0 ${activeCategory === "all" ? "text-white" : "text-primary"}`}
              />
              <span className="flex-1 text-left">All Products</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  activeCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-medium"
                }`}
              >
                {ALL_PRODUCTS.length}
              </span>
            </button>

            {/* Category buttons */}
            {PRODUCT_CATEGORIES_GALLERY.map((cat) => {
              const count = ALL_PRODUCTS.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
                    isActive
                      ? "bg-primary border-primary text-white shadow-sm shadow-primary/25"
                      : "bg-white border-gray-100 text-accent hover:border-primary/30 hover:text-primary shadow-sm"
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="flex-1 text-left text-[13px] leading-snug">{cat.name}</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-medium"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Sidebar CTA card */}
            <div className="mt-4 rounded-2xl bg-accent p-5 text-white overflow-hidden relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none" />
              <p className="text-sm font-bold mb-1 relative">Need a bulk quote?</p>
              <p className="text-xs text-white/50 mb-4 relative">We serve businesses across India.</p>
              <a
                href={SITE.whatsapp.generalEnquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors w-full relative"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>
            </div>
          </aside>

          {/* ── Main content ────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Mobile category filter — hidden on desktop ─────────────── */}
            <div className="lg:hidden">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-medium mb-3">
                Filter by Category
              </p>
              <div className="-mx-1 px-1 overflow-x-auto pb-1">
                <div className="flex gap-2 w-max">
                <button
                  onClick={() => handleCategory("all")}
                  aria-pressed={activeCategory === "all"}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeCategory === "all"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-accent border-gray-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <FaBoxOpen className="text-[10px]" />
                  All
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-medium"
                    }`}
                  >
                    {ALL_PRODUCTS.length}
                  </span>
                </button>

                {PRODUCT_CATEGORIES_GALLERY.map((cat) => {
                  const count = ALL_PRODUCTS.filter((p) => p.category === cat.id).length;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategory(cat.id)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-accent border-gray-200 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      {cat.name}
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-medium"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
                </div>
              </div>
            </div>

            {/* Search bar ────────────────────────────────────────────────── */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name or specification…"
                className="w-full pl-11 pr-10 py-3.5 text-sm rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>

            {/* Results meta row ──────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-2 items-start justify-between">
              <div>
                <h2 className="text-sm font-bold text-accent">{activeCategoryLabel}</h2>
                <p className="text-xs text-gray-medium mt-0.5">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
                  {search && (
                    <span>
                      {" "}· matching{" "}
                      <span className="text-primary font-semibold">"{search}"</span>
                    </span>
                  )}
                </p>
              </div>
              {(search || activeCategory !== "all") && (
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="text-xs text-gray-medium hover:text-primary font-medium underline underline-offset-2 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Product grid ─────────────────────────────────────────────── */}
            {filtered.length === 0 ? (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-accent font-bold text-lg mb-2">No products found</p>
                <p className="text-gray-medium text-sm mb-5">
                  Try a different category or clear your search.
                </p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="text-primary text-sm font-semibold border border-primary/30 px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  Show all products
                </button>
              </m.div>
            ) : (
              <m.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </m.div>
            )}

            {/* Bottom CTA ────────────────────────────────────────────────── */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 rounded-3xl bg-accent p-8 sm:p-12 text-center text-white overflow-hidden relative"
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 85%, #f97316 0%, transparent 45%), radial-gradient(circle at 85% 15%, #1d4ed8 0%, transparent 45%)",
                }}
              />
              <div className="relative">
                <span className="inline-block text-orange text-[11px] font-extrabold uppercase tracking-widest mb-4 px-3 py-1.5 bg-orange/10 rounded-full border border-orange/20">
                  Get in Touch
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold mb-2">Need a Custom Quote?</h2>
                <p className="text-white/60 max-w-xl mx-auto text-sm mb-7">
                  Bulk orders, custom dimensions, or OEM branding — our team responds within hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={SITE.whatsapp.generalEnquiry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3 rounded-xl transition-colors text-sm shadow-lg"
                  >
                    <FaWhatsapp />
                    WhatsApp Us
                  </a>
                  <a
                    href={SITE.phone.primary.href}
                    className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-3 rounded-xl transition-colors text-sm"
                  >
                    <FaPhone className="text-xs" />
                    {SITE.phone.primary.display}
                  </a>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </div>
    </section>
  );
}
