import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found | Royal Enterprises",
    description: "Sorry, the page you're looking for doesn't exist or has been moved. Browse our packaging and storage products at Royal Enterprises Chennai.",
    url: "https://www.royalchennai.com/404",
  });
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-accent mb-3">Page Not Found</h2>
        <p className="text-gray-medium mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
