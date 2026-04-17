/**
 * products.js — Single source of truth for all product data.
 *
 * Exports:
 *  - CATEGORIES              → filter tabs for ProductsListing
 *  - ALL_PRODUCTS            → flat list for ProductsListing (added Plastic Pallet)
 *  - PRODUCT_DETAILS         → detail map for ProductDetailPage
 *  - PRODUCT_CATEGORIES_GALLERY → homepage ProductGallery cards
 */

import industrialCratesImg from "../assets/images/products/industrial-crates.png";
import bottleCrateImg from "../assets/images/products/bottle-crate.png";
import fishCrateImg from "../assets/images/products/fish-crate.png";
import cratesFabricationImg from "../assets/images/products/crates-fabrication.jpg";
import binsImg from "../assets/images/products/bins.jpg";
import dustbinsImg from "../assets/images/products/dustbins.jpg";
import palletsImg from "../assets/images/products/pallets.jpg";

const S3 =
  "https://s3-ap-southeast-1.amazonaws.com/pepupload/MjA5NTU1/mediabank/images/products";

// ─── Category gallery cards (homepage ProductGallery) ─────────────────────
// Add new categories here ONLY — CATEGORIES is derived from this automatically.

export const PRODUCT_CATEGORIES_GALLERY = [
  {
    id: "industrial-crates",
    name: "Industrial Crates",
    image: industrialCratesImg,
    count: 7,
    items: [
      "Storage Crate 300×200 mm",
      "Heavy Duty 400×300 mm",
      "Reinforced 500×325 mm",
      "Large 600×400 mm",
      "Jumbo Crate & More",
    ],
  },
  {
    id: "bottle-crates",
    name: "Bottle Crates",
    image: bottleCrateImg,
    count: 4,
    items: [
      "Goli Soda Crate",
      "Milk Bottle Crate",
      "750 Ml Beverage Crate",
      "Half Size Crate",
    ],
  },
  {
    id: "fish-crates",
    name: "Fish Crates",
    image: fishCrateImg,
    count: 2,
    items: [
      "Double Wall Fish Crate",
      "Ribbon Style Crate",
    ],
  },
  {
    id: "crates-fabrication",
    name: "Crates Fabrication",
    image: cratesFabricationImg,
    count: 1,
    items: [
      "Crate Partitions",
      "Custom OEM Sizes",
    ],
  },
  {
    id: "bins",
    name: "Industrial Bins",
    image: binsImg,
    count: 4,
    items: ["5 Ltr Bin", "15 Ltr Bin", "30 Ltr Bin", "60 Ltr Bin"],
  },
  {
    id: "dustbins",
    name: "Dustbins",
    image: dustbinsImg,
    count: 1,
    items: [
      "Twin Compartment 35 Litre",
    ],
  },
  {
    id: "pallets",
    name: "Wooden Plastic Pallets",
    image: palletsImg,
    count: 3,
    items: [
      "Wooden Timber Pallets",
      "Heavy Duty Wooden Pallet",
      "Export Pallet Packing",
    ],
  },
  {
    id: "fibc-bags",
    name: "FIBC Jumbo Bags",
    image: binsImg,
    count: 1,
    items: [
      "Industrial FIBC Bags",
    ],
  },
];

// ─── Category filter tabs — derived from PRODUCT_CATEGORIES_GALLERY ──────────

export const CATEGORIES = [
  { id: "all", label: "All Products" },
  ...PRODUCT_CATEGORIES_GALLERY.map(({ id, name }) => ({ id, label: name })),
];

// ─── Flat product list (ProductsListing / ProductCard) ────────────────────

export const ALL_PRODUCTS = [
  // ── Industrial Crates ─────────────────────────────────────────────────────
  {
    id: "ic-300x200",
    category: "industrial-crates",
    name: "Industrial Storage Crate 300×200 mm",
    shortName: "Storage Crate 300×200",
    tag: "Durable Plastic For Warehouses",
    image: `${S3}/IndustrialStorageCrate300x200mmDurablePlasticForWarehouses491805675_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-400x300",
    category: "industrial-crates",
    name: "Heavy Duty Industrial Crate 400×300 mm",
    shortName: "Heavy Duty Crate 400×300",
    tag: "Plastic Logistics Container",
    image: `${S3}/HeavyDutyIndustrialCrate400x300mmPlasticLogisticsContainer300787863_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-500x325",
    category: "industrial-crates",
    name: "Reinforced Industrial Crate 500×325 mm",
    shortName: "Reinforced Crate 500×325",
    tag: "Plastic Material Handling Box",
    image: `${S3}/ReinforcedIndustrialCrate500x325mmPlasticMaterialHandlingBox953371142_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-600x400",
    category: "industrial-crates",
    name: "Large Industrial Crate 600×400 mm",
    shortName: "Large Crate 600×400",
    tag: "Heavy Duty Plastic Storage",
    image: `${S3}/LargeIndustrialCrate600x400mmHeavyDutyPlasticStorage1079515431_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-jumbo",
    category: "industrial-crates",
    name: "Jumbo Industrial Crate",
    shortName: "Jumbo Industrial Crate",
    tag: "Extra Large Plastic Container For Industry",
    image: `${S3}/JumboIndustrialCrateExtraLargePlasticContainerForIndustry930506185_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-lid",
    category: "industrial-crates",
    name: "Transparent Crate Lid",
    shortName: "Transparent Crate Lid",
    tag: "Plastic Cover For Industrial Storage Crates",
    image: `${S3}/TransparentCrateLidPlasticCoverForIndustrialStorageCrates1187885793_209555.jpg`,
    detailId: "industrial-crates",
  },
  {
    id: "ic-material-handling",
    category: "industrial-crates",
    name: "Industrial Crates For Material Handling",
    shortName: "Material Handling Crates",
    tag: "Industrial Storage & Transport",
    image: `${S3}/IndustrialCratesForMaterialHandling1515555040_209555.jpg`,
    detailId: "industrial-crates",
  },

  // ── Bottle Crates ─────────────────────────────────────────────────────────
  {
    id: "bc-goli-soda",
    category: "bottle-crates",
    name: "Goli Soda Plastic Crate 24 Partition",
    shortName: "Goli Soda Crate",
    tag: "Beverage Industry Transport",
    image: `${S3}/GoliSodaPlasticCrate24PartitionBeverageIndustryTransport1331420541_209555.jpg`,
    detailId: "bottle-crates",
  },
  {
    id: "bc-half-size",
    category: "bottle-crates",
    name: "Half Size Bottle Crate 24 Partition",
    shortName: "Half Size Bottle Crate",
    tag: "Compact Plastic Storage Box",
    image: `${S3}/HalfSizeBottleCrate24PartitionCompactPlasticStorageBox418092194_209555.jpg`,
    detailId: "bottle-crates",
  },
  {
    id: "bc-750ml",
    category: "bottle-crates",
    name: "750 Ml Plastic Bottle Crate",
    shortName: "750 Ml Bottle Crate",
    tag: "Beverage Transport & Storage",
    image: `${S3}/750MlPlasticBottleCrateBeverageTransportStorageUse20168619_209555.jpg`,
    detailId: "bottle-crates",
  },
  {
    id: "bc-milk",
    category: "bottle-crates",
    name: "Milk Bottle Crate 500 & 1000 Ml",
    shortName: "Milk Bottle Crate",
    tag: "Durable Dairy Plastic Crate",
    image: `${S3}/MilkBottleCrateFor5001000MlDurableDairyPlasticCrate318442911_209555.jpg`,
    detailId: "bottle-crates",
  },

  // ── Fish Crates ───────────────────────────────────────────────────────────
  {
    id: "fc-double-wall",
    category: "fish-crates",
    name: "Double Wall Fish Crate 650×450×315 mm",
    shortName: "Double Wall Fish Crate",
    tag: "Plastic Seafood Transport",
    image: `${S3}/DoubleWallFishCrate650x450x315mmPlasticSeafoodTransport1798153015_209555.jpg`,
    detailId: "fish-crates",
  },
  {
    id: "fc-ribbon",
    category: "fish-crates",
    name: "Ribbon Style Fish Crate",
    shortName: "Ribbon Style Fish Crate",
    tag: "Durable Plastic For Fish Handling",
    image: `${S3}/RibbonStyleFishCrateDurablePlasticForFishHandling1433598375_209555.jpg`,
    detailId: "fish-crates",
  },

  // ── Crates Fabrication ────────────────────────────────────────────────────
  {
    id: "cf-partition",
    category: "crates-fabrication",
    name: "Plastic Crate Partition",
    shortName: "Crate Partition",
    tag: "Divider Panels For Storage Organization",
    image: `${S3}/PlasticCratePartitionDividerPanelsForStorageOrganization69350217_209555.jpg`,
    detailId: "crates-fabrication",
  },

  // ── Bins ──────────────────────────────────────────────────────────────────
  {
    id: "bins-storage",
    category: "bins",
    name: "Plastic Storage Bin",
    shortName: "Storage Bin",
    tag: "5, 15, 25, 35, 45 & 50 Litre",
    image: `${S3}/PlasticStorageBinAvailableIn51525354550Litre945349238_209555.jpg`,
    detailId: "bins",
  },

  // ── Dustbins ──────────────────────────────────────────────────────────────
  {
    id: "db-twin",
    category: "dustbins",
    name: "Twin Compartment Dustbin 20 & 35 Litre",
    shortName: "Twin Compartment Dustbin",
    tag: "Plastic Segregation Bin",
    image: `${S3}/TwinCompartmentDustbin2035LitrePlasticSegregationBin620268853_209555.jpg`,
    detailId: "dustbins",
  },

  // ── Pallets ───────────────────────────────────────────────────────────────
  {
    id: "pallets-wooden",
    category: "pallets",
    name: "Wooden Timber Pallet",
    shortName: "Wooden Pallet",
    tag: "Industrial Storage & Transport Platform",
    image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform165488169_209555.jpg`,
    detailId: "pallets",
  },
  {
    id: "pallets-heavy-duty-wooden",
    category: "pallets",
    name: "Heavy Duty Wooden Pallet",
    shortName: "Heavy Duty Wooden Pallet",
    tag: "Industrial Grade Wood Platform",
    image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform165488169_209555.jpg`,
    detailId: "pallets",
  },
  {
    id: "pallets-export",
    category: "pallets",
    name: "Export Pallet Packing",
    shortName: "Export Pallet",
    tag: "International Shipping Platform",
    image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform165488169_209555.jpg`,
    detailId: "pallets",
  },

  // ── FIBC Jumbo Bags ───────────────────────────────────────────────────────
  // TODO: Replace with actual FIBC bag product photos
  // Recommendation: White/beige woven bulk bags with lifting loops
  {
    id: "fibc-industrial",
    category: "fibc-bags",
    name: "Industrial FIBC Jumbo Bags",
    shortName: "FIBC Jumbo Bags",
    tag: "Bulk Storage & Transport — 500kg to 2000kg",
    image: binsImg, // Placeholder - needs FIBC-specific image
    detailId: "fibc-bags",
  },
];

// ─── Detailed product data (ProductDetailPage) ────────────────────────────

export const PRODUCT_DETAILS = {
  "industrial-crates": {
    title: "Industrial Crates",
    subtitle: "Premium HDPE Storage Solutions",
    description:
      "Our industrial crates are manufactured from high-grade HDPE plastic, designed to withstand heavy loads and demanding warehouse conditions. These stackable and nestable crates are widely used in manufacturing, automotive, and retail sectors.",
    image: industrialCratesImg,
    features: [
      "Grade-A Virgin HDPE Plastic",
      "Stackable & Space-Saving Design",
      "Impact & Corrosion Resistant",
      "Chemical & UV Resistant",
      "Load Bearing Capacity up to 50kg",
    ],
    variants: [
      {
        name: "Industrial Storage Crate 300 x 200 mm",
        size: "300 × 200 mm",
        capacity: "Durable Plastic For Warehouses",
        image: `${S3}/IndustrialStorageCrate300x200mmDurablePlasticForWarehouses491805675_209555.jpg`,
      },
      {
        name: "Heavy Duty Industrial Crate 400x300 mm",
        size: "400 × 300 mm",
        capacity: "Plastic Logistics Container",
        image: `${S3}/HeavyDutyIndustrialCrate400x300mmPlasticLogisticsContainer300787863_209555.jpg`,
      },
      {
        name: "Reinforced Industrial Crate 500x325 mm",
        size: "500 × 325 mm",
        capacity: "Plastic Material Handling Box",
        image: `${S3}/ReinforcedIndustrialCrate500x325mmPlasticMaterialHandlingBox953371142_209555.jpg`,
      },
      {
        name: "Large Industrial Crate 600x400 mm",
        size: "600 × 400 mm",
        capacity: "Heavy Duty Plastic Storage",
        image: `${S3}/LargeIndustrialCrate600x400mmHeavyDutyPlasticStorage1079515431_209555.jpg`,
      },
      {
        name: "Jumbo Industrial Crate",
        size: "Extra Large",
        capacity: "Extra Large Plastic Container For Industry",
        image: `${S3}/JumboIndustrialCrateExtraLargePlasticContainerForIndustry930506185_209555.jpg`,
      },
      {
        name: "Transparent Crate Lid",
        size: "Custom Fit",
        capacity: "Plastic Cover For Industrial Storage Crates",
        image: `${S3}/TransparentCrateLidPlasticCoverForIndustrialStorageCrates1187885793_209555.jpg`,
      },
      {
        name: "Industrial Crates For Material Handling",
        size: "Bulk Set",
        capacity: "Industrial Crates For Material Handling",
        image: `${S3}/IndustrialCratesForMaterialHandling1515555040_209555.jpg`,
      },
    ],
    applications: [
      "Automotive Parts Storage",
      "Warehouse Distribution",
      "Retail Inventory Management",
      "Industrial Assembly Lines",
    ],
  },

  "bottle-crates": {
    title: "Bottle Crates",
    subtitle: "Safe Beverage Transportation",
    description:
      "Designed specifically for the beverage industry, our bottle crates feature robust partitions that protect glass and plastic bottles during transit. These crates are engineered for safe stacking and easy handling.",
    image: bottleCrateImg,
    features: [
      "Individual Bottle Partitions",
      "High Impact Polypropylene",
      "Anti-Slip Bottom Design",
      "Ergonomic Side Handles",
      "Weather Resistant",
    ],
    variants: [
      {
        name: "Goli Soda Plastic Crate",
        size: "24 Partitions",
        capacity: "Beverage Industry Transport",
        image: `${S3}/GoliSodaPlasticCrate24PartitionBeverageIndustryTransport1331420541_209555.jpg`,
      },
      {
        name: "Half Size Bottle Crate",
        size: "24 Partitions",
        capacity: "Compact Plastic Storage Box",
        image: `${S3}/HalfSizeBottleCrate24PartitionCompactPlasticStorageBox418092194_209555.jpg`,
      },
      {
        name: "750 Ml Plastic Bottle Crate",
        size: "Standard Size",
        capacity: "Beverage Transport & Storage Use",
        image: `${S3}/750MlPlasticBottleCrateBeverageTransportStorageUse20168619_209555.jpg`,
      },
      {
        name: "Milk Bottle Crate",
        size: "For 500 & 1000 Ml",
        capacity: "Durable Dairy Plastic Crate",
        image: `${S3}/MilkBottleCrateFor5001000MlDurableDairyPlasticCrate318442911_209555.jpg`,
      },
    ],
    applications: [
      "Brewery Logistics",
      "Soft Drink Distribution",
      "Dairy Home Delivery",
      "Restaurant & Bar Inventory",
    ],
  },

  "fish-crates": {
    title: "Fish Crates",
    subtitle: "Hygienic Seafood Packaging",
    description:
      "Our fish crates are built for the harsh conditions of aquaculture and seafood processing. Featuring double-wall construction and excellent drainage, these crates maintain product freshness while ensuring durability in wet environments.",
    image: fishCrateImg,
    features: [
      "Double-Wall Insulation Support",
      "Hygienic Easy-to-Clean Design",
      "Drainage Slots for Water Management",
      "Food-Grade Safe Materials",
      "Frost Resistant for Cold Storage",
    ],
    variants: [
      {
        name: "Double Wall Fish Crate",
        size: "650x450x315 mm",
        capacity: "Plastic Seafood Transport",
        image: `${S3}/DoubleWallFishCrate650x450x315mmPlasticSeafoodTransport1798153015_209555.jpg`,
      },
      {
        name: "Ribbon Style Fish Crate",
        size: "Standard Mesh",
        capacity: "Durable Plastic For Fish Handling",
        image: `${S3}/RibbonStyleFishCrateDurablePlasticForFishHandling1433598375_209555.jpg`,
      },
    ],
    applications: [
      "Fish Farming & Harvesting",
      "Cold Chain Logistics",
      "Market Display",
      "Exporters & Processing Units",
    ],
  },

  "crates-fabrication": {
    title: "Crates Fabrication",
    subtitle: "Customized Storage Solutions",
    description:
      "We specialize in the fabrication of modular and joint crates for unique industrial requirements. Our partition dividers and custom sizes ensure that even the most delicate parts are stored safely and efficiently.",
    image: cratesFabricationImg,
    features: [
      "Custom Sizing & Dimensions",
      "Internal Foam/Fabric Linkings",
      "Modular Joint Construction",
      "Specialized Partitioning",
      "Branding/OEM Options",
    ],
    variants: [
      {
        name: "Plastic Crate Partition",
        size: "Custom Dividers",
        capacity: "Divider Panels For Storage Organization",
        image: `${S3}/PlasticCratePartitionDividerPanel1268091879_209555.jpg`,
      },
    ],
    applications: [
      "Electronics Manufacturing",
      "Precision Engineering",
      "Custom Kit Packaging",
      "Laboratory Storage",
    ],
  },

  bins: {
    title: "Industrial Bins",
    subtitle: "Heavy-Duty Storage Containers",
    description:
      "Versatile storage bins for organization within warehouses, hardware stores, and factories. Available in various capacities, these bins are perfect for sorting small parts, granules, or liquid storage.",
    image: binsImg,
    features: [
      "Reinforced Structural Design",
      "Tapered for Easy Nesting",
      "Chemical Resistant Lining",
      "Available with/without Lids",
      "Multiple Litre Capacities",
    ],
    variants: [
      { name: "5 Ltr Bin", size: "Compact", capacity: "Small Parts" },
      { name: "15 Ltr Bin", size: "Medium", capacity: "Tool Storage" },
      { name: "30 Ltr Bin", size: "Standard", capacity: "Bulk Sorting" },
      { name: "60 Ltr Bin", size: "Large", capacity: "Heavy Storage" },
    ],
    applications: [
      "Hardware Store Sorting",
      "Workshop Organization",
      "Pharmaceutical Raw Materials",
      "Waste Sorting & Recycling",
    ],
  },

  dustbins: {
    title: "Dustbins",
    subtitle: "Industrial Waste Management",
    description:
      "Robust waste bins designed for heavy industrial use. Our dustbins are equipped with durable wheels and lids to ensure easy waste disposal while maintaining workplace hygiene.",
    image: dustbinsImg,
    features: [
      "High Impact Strength",
      "Foot-Pedal Operated Models",
      "Heavy-Duty Castor Wheels",
      "Odor-Sealing Lids",
      "Color-Coded for Segregation",
    ],
    variants: [
      {
        name: "Twin Compartment Dustbin",
        size: "20 & 35 Litre",
        capacity: "Plastic Segregation Bin",
        image: `${S3}/TwinCompartmentDustbin2035LitrePlasticSegregationBin_209555.jpg`,
      },
    ],
    applications: [
      "Factory Floor Waste",
      "Public Infrastructure",
      "Medical Waste Sorting",
      "Housing Societies",
    ],
  },

  pallets: {
    title: "Wooden Plastic Pallets",
    subtitle: "Foundation for Global Logistics",
    description:
      "Supplying both premium kiln-dried wooden pallets and high-density plastic pallets. Our pallets are engineered for two-way or four-way entry, ensuring maximum compatibility with forklifts and pallet jacks.",
    image: palletsImg,
    features: [
      "ISPM-15 Heat Treated (Wood)",
      "Rackable & Stackable (Plastic)",
      "Reinforced Loading Surface",
      "Four-Way Entry Design",
      "Export Quality Certified",
    ],
    variants: [
      {
        name: "Wooden Timber Pallet",
        size: "Custom Sizes",
        capacity: "Industrial Storage & Transport Platform",
        image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform_209555.jpg`,
      },
      {
        name: "Heavy Duty Wooden Pallet",
        size: "Industrial Grade",
        capacity: "Heavy Load Bearing Platform",
        image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform_209555.jpg`,
      },
      {
        name: "Export Pallet Packing",
        size: "ISPM-15 Certified",
        capacity: "International Shipping Platform",
        image: `${S3}/WoodenTimberPalletIndustrialStorageTransportPlatform_209555.jpg`,
      },
    ],
    applications: [
      "Export Logistics",
      "Cold Chain Distribution",
      "Pharmaceutical Exports",
      "Automotive Manufacturing",
    ],
  },

  "fibc-bags": {
    title: "FIBC Jumbo Bags",
    subtitle: "Bulk Material Handling Solutions",
    description:
      "Heavy-duty Flexible Intermediate Bulk Containers (FIBC) designed for safe transportation and storage of bulk materials. Our jumbo bags feature reinforced stitching and UV-stabilized fabric for maximum durability.",
    image: binsImg,
    features: [
      "Food Grade & Industrial Grade",
      "Load Capacity: 500kg to 2000kg",
      "UV Stabilized Woven PP Fabric",
      "Top & Bottom Spout Options",
      "Custom Printing Available",
    ],
    variants: [
      {
        name: "Industrial FIBC Jumbo Bags",
        size: "1000-2000kg",
        capacity: "Heavy Duty Woven Polypropylene",
      },
    ],
    applications: [
      "Chemical & Fertilizer Transport",
      "Agricultural Produce Storage",
      "Construction Materials",
      "Pharmaceutical Raw Materials",
    ],
  },

  boxes: {
    title: "Boxes & Packaging",
    subtitle: "Complete Packaging Solutions",
    description:
      "Comprehensive range of corrugated boxes, PP boxes, and specialized packaging solutions. From standard shipping boxes to temperature-controlled ice boxes, we provide packaging for every industry need.",
    image: cratesFabricationImg,
    features: [
      "3-Ply & 5-Ply Corrugated Options",
      "Waterproof PP Corrugated Boxes",
      "Temperature Control Ice Boxes",
      "Custom Sizes & Branding",
      "Food-Safe Materials",
    ],
    variants: [
      {
        name: "Corrugated Boxes",
        size: "Custom Sizes",
        capacity: "Industrial Packaging & Shipping",
      },
      {
        name: "PP Corrugated Box",
        size: "Waterproof",
        capacity: "Moisture Resistant Packaging",
      },
      {
        name: "Insulated Ice Box",
        size: "Various Capacities",
        capacity: "Temperature Control Storage",
      },
      {
        name: "Custom Packaging",
        size: "Made to Order",
        capacity: "Tailored Business Solutions",
      },
    ],
    applications: [
      "E-Commerce Shipping",
      "Food & Beverage Packaging",
      "Pharmaceutical Cold Chain",
      "Electronics Protection",
    ],
  },
};

