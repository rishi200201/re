/**
 * Container — max-width wrapper with consistent horizontal padding.
 *
 * Props:
 *  - as        string   HTML element tag (default: "div")
 *  - className string   Extra classes
 *  - children  ReactNode
 */
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag
      className={`w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </Tag>
  );
}
