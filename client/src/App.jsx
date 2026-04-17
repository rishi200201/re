import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleAnalytics from "./components/GoogleAnalytics";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const BranchesPage = lazy(() => import("./pages/BranchesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    // LazyMotion + domAnimation (~25 KB) excludes domMax (hover, drag, pan — unused).
    // Smaller than full motion bundle while supporting all our animation types.
    <LazyMotion features={domAnimation} strict>
      <GoogleAnalytics />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </LazyMotion>
  );
}

export default App;
