import { Link } from "react-router-dom";

export default function PageBanner({ title, subtitle, breadcrumb, breadcrumbParent }) {
  return (
    <section className="bg-accent pt-24 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {breadcrumb && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm flex-wrap">
            <Link to="/" className="text-white/50 hover:text-primary transition-colors">
              Home
            </Link>
            {breadcrumbParent && (
              <>
                <span className="text-white/30">›</span>
                <Link to={breadcrumbParent.path} className="text-white/50 hover:text-primary transition-colors">
                  {breadcrumbParent.label}
                </Link>
              </>
            )}
            <span className="text-white/30">›</span>
            <span className="text-primary font-medium">{breadcrumb}</span>
          </div>
        )}
      </div>
    </section>
  );
}
