import { Component } from "react";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";
import { SITE } from "../config/site";

/**
 * Generate a short random ID for error reports.
 * Lets users quote the ID when contacting support.
 */
function generateErrorId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

/**
 * Report to Sentry if the SDK is loaded via CDN / npm.
 * This pattern keeps Sentry optional — add the script tag to index.html
 * or `npm install @sentry/react` and call Sentry.init() in main.jsx
 * without modifying this file.
 */
function reportError(error, info, errorId) {
  if (typeof window !== "undefined" && window.Sentry) {
    window.Sentry.withScope((scope) => {
      scope.setTag("errorBoundary", true);
      scope.setExtra("errorId", errorId);
      scope.setExtra("componentStack", info?.componentStack);
      window.Sentry.captureException(error);
    });
  }

  if (import.meta.env.DEV) {
    console.group(`[ErrorBoundary] #${errorId}`);
    console.error(error);
    console.error(info?.componentStack);
    console.groupEnd();
  }
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorId: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorId: generateErrorId() };
  }

  componentDidCatch(error, info) {
    reportError(error, info, this.state.errorId);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorId: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-light px-5">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-2xl text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-accent mb-3">Something went wrong</h1>
            <p className="text-gray-medium mb-3 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page or return home.
            </p>
            {this.state.errorId && (
              <p className="text-xs text-gray-medium/60 mb-8 font-mono">
                Error ID: <span className="font-semibold text-gray-medium">{this.state.errorId}</span>
                {" — "}
                <a
                  href={SITE.phone.primary.href}
                  className="underline hover:text-primary transition-colors"
                >
                  call us
                </a>{" "}
                and quote this ID for support.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
              >
                <FaRedo className="text-sm" />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-accent font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FaHome className="text-sm" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
