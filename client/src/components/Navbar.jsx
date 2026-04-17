import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import { SITE } from "../config/site";

const navLinks = SITE.navLinks;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus trap: when the mobile menu is open, keep keyboard focus inside it.
  // On close, return focus to the toggle button so keyboard users don't lose context.
  useEffect(() => {
    if (!mobileOpen) {
      toggleRef.current?.focus();
      return;
    }
    const el = menuRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    el.addEventListener("keydown", trap);
    first?.focus();
    return () => el.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path || (path === "/products" && location.pathname.startsWith("/products"));
  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent py-2.5 sm:py-4"
          : "bg-white shadow-[0_1px_20px_rgba(0,0,0,0.08)] py-2"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm bg-white flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.jpg" 
              alt="Royal Enterprises Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold leading-tight tracking-tight transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-accent"
              }`}
            >
              Royal
            </span>
            <span
              className={`text-lg font-bold leading-tight tracking-tight transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-accent"
              }`}
            >
              Enterprises
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                isActive(link.path)
                  ? isTransparent
                    ? "text-white bg-white/15"
                    : "text-primary bg-primary/5"
                  : isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-accent/70 hover:text-accent hover:bg-gray-50"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <m.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full origin-left ${
                    isTransparent ? "bg-white" : "bg-primary"
                  }`}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 ${
              isTransparent
                ? "bg-white text-accent hover:bg-primary hover:text-white"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          className={`lg:hidden text-2xl p-2 rounded-lg transition-colors ${
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-accent hover:bg-gray-50"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            ref={menuRef}
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <div className="px-5 py-4 pb-7 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-medium transition-all py-3 px-4 rounded-xl text-sm ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-accent/80 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <a
                  href={SITE.phone.primary.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all"
                >
                  <FaPhone className="text-xs" />
                  {SITE.phone.primary.display}
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
