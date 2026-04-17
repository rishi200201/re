/**
 * site.js — Single source of truth for all site-wide constants.
 *
 * WHY: Previously phone numbers, email, WhatsApp URLs, and contact
 * details were hardcoded in 7+ separate files. One business contact
 * change required hunting through the entire codebase.
 *
 * Now: update here once, propagates everywhere.
 */

export const SITE = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Royal Enterprises",
  legalName: "Royal Enterprises (Royal Plastic Crates)",
  tagline: "Packaging & Storage Solutions",
  description:
    "Chennai's trusted packaging partner since 2009. Manufacturers and suppliers of HDPE industrial crates, wooden pallets, stretch films & complete packaging solutions. Factory-direct pricing.",
  foundingYear: 2009,
  domain: "https://www.royalchennai.com",
  gst: "33AQXPC6812F1ZU",
  businessType: "Wholesale Trader / Retailer",
  firmType: "Proprietorship",
  employees: "26–50",
  turnover: "₹40 Lakhs – ₹1.5 Crore",

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: {
    primary: {
      raw: "916381870361",
      display: "+91 63818 70361",
      href: "tel:+916381870361",
    },
    secondary: {
      raw: "919841148717",
      display: "+91 98411 48717",
      href: "tel:+919841148717",
    },
  },

  email: {
    display: "royalenterpriseschennai113@gmail.com",
    href: "mailto:royalenterpriseschennai113@gmail.com",
  },

  contactPerson: {
    name: "Anitha",
    designation: "Manager",
  },

  // ── Address ───────────────────────────────────────────────────────────────
  address: {
    street: "MAHESHWARI STORE, Nehru St, Kanagam",
    area: "Tharamani",
    city: "Chennai",
    state: "Tamil Nadu",
    pin: "600 113",
    country: "India",
    full: "MAHESHWARI STORE, X6WV+555, Nehru St, Kanagam, Tharamani, Chennai, Tamil Nadu 600113",
    nearby: "Near Taramani IT Expressway, OMR Road",
    mapsUrl:
      "https://maps.google.com/?q=MAHESHWARI+STORE,+X6WV+555,+Nehru+St,+Kanagam,+Tharamani,+Chennai",
    schema: {
      streetAddress: "MAHESHWARI STORE, Nehru St, Kanagam",
      addressLocality: "Tharamani, Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600113",
      addressCountry: "IN",
    },
  },

  // ── Hours ──────────────────────────────────────────────────────────────────
  hours: {
    display: "Monday – Saturday: 9:00 AM – 6:00 PM",
    short: "Mon – Sat, 9 AM – 6 PM",
    schema: "Mo-Sa 09:00-18:00",
  },

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  whatsapp: {
    base: "https://wa.me/916381870361",
    generalEnquiry:
      "https://wa.me/916381870361?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Royal%20Enterprises%20packaging%20products",
    contactEnquiry:
      "https://wa.me/916381870361?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20products",
    /**
     * Build a product-specific WhatsApp enquiry URL.
     * @param {string} productName
     */
    forProduct: (productName) =>
      `https://wa.me/916381870361?text=${encodeURIComponent(
        `Hi, I'd like to get a quote for: ${productName}`
      )}`,
  },

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleSuffix: " | Royal Enterprises Chennai",
    defaultTitle:
      "Royal Enterprises Chennai - Premium Packaging & Storage Solutions | Industrial Crates, Wooden Pallets",
    defaultDescription:
      "Royal Enterprises — Chennai's trusted packaging partner since 2009. Suppliers of HDPE industrial crates, wooden pallets, stretch films & complete packaging solutions. Factory-direct pricing for 50+ product variants serving businesses across India.",
    ogImage: "https://www.royalchennai.com/hero-crates.jpg",
    ogImageWidth: "1200",
    ogImageHeight: "630",
  },

  // ── Key metrics (used in Hero, StatsStrip, About) ─────────────────────────
  stats: {
    yearsOfTrust: 17,
    businessClients: 850,
    productVarieties: 50,
    statesServed: 28,
    foundedYear: 2009,
    customerSatisfaction: 95,
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  navLinks: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Catalog", path: "/catalog" },
    { name: "Delivery", path: "/branches" },
    { name: "Contact", path: "/contact" },
  ],

  // ── Social / third-party ──────────────────────────────────────────────────
  social: {
    // Add when social profiles are created
    facebook: null,
    instagram: null,
    linkedin: null,
  },
};
