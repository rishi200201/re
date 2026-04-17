import { useParams, Link, useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { FaWhatsapp, FaArrowLeft, FaCheckCircle, FaPhone, FaTag, FaBoxOpen } from "react-icons/fa";
import { useSEO } from "../hooks/useSEO";
import { ALL_PRODUCTS, PRODUCT_DETAILS } from "../data/products";
import { SITE } from "../config/site";
import { toCategoryLabel } from "../lib/utils";
import PageBanner from "../components/PageBanner";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = ALL_PRODUCTS.find((p) => p.id === slug);
  const detail = product ? PRODUCT_DETAILS[product.detailId] : null;

  useSEO(
    product
      ? {
          title: `${product.name} | ${SITE.name} Chennai`,
          description: detail?.description
            ? detail.description.slice(0, 160)
            : `Buy ${product.name} from Royal Enterprises Chennai. Factory-direct pricing, pan-India delivery.`,
          url: `${SITE.domain}/products/${product.id}`,
          ogType: "product",
          ogTitle: product.name,
          ogDescription: detail?.description?.slice(0, 160),
          ogImage: SITE.seo.ogImage,
        }
      : {
          title: `Product Not Found | ${SITE.name}`,
          description: "The requested product could not be found.",
        }
  );

  // Product not found — show a helpful fallback instead of crashing
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-5 text-center">
        <FaBoxOpen className="text-6xl text-gray-300" />
        <h1 className="text-2xl font-bold text-accent">Product Not Found</h1>
        <p className="text-gray-medium max-w-sm">
          We couldn&apos;t find that product. It may have been removed or the link might be incorrect.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          Browse All Products
        </Link>
      </div>
    );
  }

  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const categoryLabel = toCategoryLabel(product.category);

  return (
    <>
      <PageBanner
        title={product.shortName || product.name}
        breadcrumb={product.shortName || product.name}
        breadcrumbParent={{ label: "Products", path: "/products" }}
      />

      <section className="py-14 sm:py-20 bg-gray-light">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Back button */}
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/products");
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-gray-medium hover:text-primary transition-colors mb-8"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: Image ─────────────────────────────────────────── */}
            <m.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <img
                  src={detail?.image || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width={640}
                  height={480}
                />
                {/* Category tag */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border border-primary/10">
                  {categoryLabel}
                </span>
              </div>

              {/* Variant thumbnails (if available) */}
              {detail?.variants?.length > 1 && (
                <div className="p-4 flex gap-2.5 overflow-x-auto scrollbar-none">
                  {detail.variants.slice(0, 6).map((v) => (
                    <div
                      key={v.name}
                      className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-200"
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </m.div>

            {/* ── Right: Details ───────────────────────────────────────── */}
            <m.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Title + tag */}
              <div>
                <span className="inline-flex items-center gap-1.5 text-orange text-[11px] font-bold uppercase tracking-widest mb-3">
                  <FaTag className="text-[10px]" />
                  {product.tag}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-accent leading-tight tracking-tight mb-2">
                  {product.name}
                </h1>
                {detail?.subtitle && (
                  <p className="text-primary font-semibold text-sm">{detail.subtitle}</p>
                )}
              </div>

              {/* Description */}
              {detail?.description && (
                <p className="text-gray-medium leading-relaxed">
                  {detail.description}
                </p>
              )}

              {/* Features */}
              {detail?.features?.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-accent text-sm uppercase tracking-wide mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {detail.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-accent">
                        <FaCheckCircle className="text-primary shrink-0 text-base" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Available variants list */}
              {detail?.variants?.length > 0 && (
                <div>
                  <h3 className="font-bold text-accent text-sm uppercase tracking-wide mb-3">
                    Available Variants
                  </h3>
                  <div className="flex flex-col gap-2">
                    {detail.variants.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 text-sm"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                        <span className="font-semibold text-accent">{v.size}</span>
                        <span className="text-gray-medium text-xs truncate">— {v.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {detail?.applications?.length > 0 && (
                <div>
                  <h3 className="font-bold text-accent text-sm uppercase tracking-wide mb-3">
                    Common Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detail.applications.map((app, i) => (
                      <span
                        key={i}
                        className="bg-primary/8 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/15"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={SITE.whatsapp.forProduct(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-4 rounded-xl shadow-md shadow-green-500/20 transition-all hover:scale-[1.02] text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  Get a Price Quote
                </a>
                <a
                  href={SITE.phone.primary.href}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] text-sm"
                >
                  <FaPhone className="text-sm" />
                  Call Now
                </a>
              </div>

              {/* Trust badge */}
              <p className="text-xs text-gray-medium flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                Factory-direct pricing · Pan-India delivery · Bulk order discounts available
              </p>
            </m.div>
          </div>

          {/* ── Related Products ─────────────────────────────────────────── */}
          {relatedProducts.length > 0 && (
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-xl font-bold text-accent mb-6">
                More in {categoryLabel}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/products/${rp.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={rp.image}
                        alt={rp.shortName}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-accent text-xs leading-snug line-clamp-2">
                        {rp.shortName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </m.div>
          )}
        </div>
      </section>
    </>
  );
}
