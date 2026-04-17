/**
 * ImagePlaceholder.jsx - Professional placeholder component with labels
 * Shows product name on placeholder until real image is added
 */

// eslint-disable-next-line no-unused-vars
import { FaBox } from "react-icons/fa";

export default function ImagePlaceholder({ productName, category }) {
  const getCategoryColor = (cat) => {
    const colors = {
      "fibc-bags": "from-purple-100 to-purple-200",
      "boxes": "from-amber-100 to-amber-200",
      "industrial-crates": "from-blue-100 to-blue-200",
      "bottle-crates": "from-green-100 to-green-200",
      "fish-crates": "from-cyan-100 to-cyan-200",
      "pallets": "from-orange-100 to-orange-200",
      "bins": "from-indigo-100 to-indigo-200",
      "dustbins": "from-red-100 to-red-200",
      "crates-fabrication": "from-pink-100 to-pink-200",
    };
    return colors[cat] || "from-gray-100 to-gray-200";
  };

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${getCategoryColor(
        category
      )} flex flex-col items-center justify-center p-4 relative`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 text-center">
        <FaBox className="text-4xl sm:text-5xl text-gray-400 mb-3 mx-auto" />
        <p className="text-xs font-bold text-gray-600 leading-tight px-2 line-clamp-2">
          {productName}
        </p>
        <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">
          Image Placeholder
        </p>
      </div>
    </div>
  );
}
