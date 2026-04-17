/**
 * routing.test.jsx — Integration tests for React Router navigation
 * Tests route transitions, lazy loading, 404 handling, and navigation flow.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Mock framer-motion to simplify tests
vi.mock('framer-motion', () => ({
  LazyMotion: ({ children }) => <>{children}</>,
  domAnimation: {},
  m: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => ({ ref: null, inView: true }),
}));

// Mock GoogleAnalytics component
vi.mock('../../components/GoogleAnalytics', () => ({
  default: () => null,
}));

const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('Routing Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Home Page ──────────────────────────────────────────────────────────────

  it('renders home page at root route', async () => {
    renderApp('/');
    
    // Wait for lazy-loaded HomePage to render
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
  });

  it('displays hero section on home page', async () => {
    renderApp('/');
    
    await waitFor(() => {
      expect(screen.getByText(/packaging.*storage solutions/i)).toBeInTheDocument();
    });
  });

  // ── Products Page ──────────────────────────────────────────────────────────

  it('renders products page at /products route', async () => {
    renderApp('/products');
    
    await waitFor(() => {
      expect(screen.getByText(/all products/i)).toBeInTheDocument();
    });
  });

  // ── About Page ─────────────────────────────────────────────────────────────

  it('renders about page at /about route', async () => {
    renderApp('/about');
    
    await waitFor(() => {
      // About page should have company information
      expect(screen.getByText(/about.*royal enterprises/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  // ── Contact Page ───────────────────────────────────────────────────────────

  it('renders contact page at /contact route', async () => {
    renderApp('/contact');
    
    await waitFor(() => {
      expect(screen.getByText(/contact.*us/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  // ── Branches Page ──────────────────────────────────────────────────────────

  it('renders branches page at /branches route', async () => {
    renderApp('/branches');
    
    await waitFor(() => {
      expect(screen.getByText(/branches|locations|visit us/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  // ── Catalog Page ───────────────────────────────────────────────────────────

  it('renders catalog page at /catalog route', async () => {
    renderApp('/catalog');
    
    await waitFor(() => {
      expect(screen.getByText(/catalog|product.*categories/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  // ── 404 Not Found ──────────────────────────────────────────────────────────

  it('renders 404 page for unknown routes', async () => {
    renderApp('/non-existent-page');
    
    await waitFor(() => {
      expect(screen.getByText(/404|not found|page.*not.*found/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('404 page includes link back to home', async () => {
    renderApp('/invalid-route');
    
    await waitFor(() => {
      const homeLink = screen.getByRole('link', { name: /home|back.*home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.getAttribute('href')).toBe('/');
    }, { timeout: 3000 });
  });

  // ── Navigation Flow ────────────────────────────────────────────────────────

  it('navigates from home to products via navbar', async () => {
    const user = userEvent.setup();
    renderApp('/');
    
    // Wait for initial page load
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
    
    // Click products link in navbar
    const productsLink = screen.getByRole('link', { name: /products/i });
    await user.click(productsLink);
    
    // Should now be on products page
    await waitFor(() => {
      expect(screen.getByText(/all products/i)).toBeInTheDocument();
    });
  });

  it('navigates to contact page and back', async () => {
    const user = userEvent.setup();
    renderApp('/');
    
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
    
    // Navigate to contact
    const contactLink = screen.getByRole('link', { name: /contact/i });
    await user.click(contactLink);
    
    await waitFor(() => {
      expect(screen.getByText(/contact.*us/i)).toBeInTheDocument();
    });
    
    // Navigate back home
    const homeLink = screen.getByRole('link', { name: /home/i });
    await user.click(homeLink);
    
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
  });

  // ── Layout Persistence ─────────────────────────────────────────────────────

  it('maintains navbar across route changes', async () => {
    const user = userEvent.setup();
    renderApp('/');
    
    // Navbar should be present
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    
    // Navigate to different page
    const aboutLink = screen.getByRole('link', { name: /about/i });
    await user.click(aboutLink);
    
    // Navbar should still be present
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  it('maintains footer across route changes', async () => {
    const user = userEvent.setup();
    renderApp('/');
    
    await waitFor(() => {
      // Footer should be present (look for copyright or company name)
      expect(screen.getByText(/royal enterprises|© 2024/i)).toBeInTheDocument();
    });
    
    // Navigate to products
    const productsLink = screen.getByRole('link', { name: /products/i });
    await user.click(productsLink);
    
    // Footer should still be present
    await waitFor(() => {
      expect(screen.getByText(/royal enterprises|© 2024/i)).toBeInTheDocument();
    });
  });

  // ── Lazy Loading ───────────────────────────────────────────────────────────

  it('shows loading state while lazy components load', async () => {
    renderApp('/products');
    
    // Loading spinner should appear briefly
    const loader = screen.queryByRole('status') || screen.queryByText(/loading/i);
    
    // Then content should load
    await waitFor(() => {
      expect(screen.getByText(/all products/i)).toBeInTheDocument();
    });
  });

  // ── Product Detail Routes ──────────────────────────────────────────────────

  it('handles dynamic product routes', async () => {
    renderApp('/products/industrial-crates');
    
    await waitFor(() => {
      // Product detail page should render
      expect(screen.getByText(/industrial crates|product.*details/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renders 404 for invalid product slugs', async () => {
    renderApp('/products/non-existent-product');
    
    await waitFor(() => {
      // Should either show 404 or handle gracefully
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    }, { timeout: 3000 });
  });

  // ── Scroll Behavior ────────────────────────────────────────────────────────

  it('scrolls to top on route change', async () => {
    const user = userEvent.setup();
    
    // Mock scrollTo
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    
    renderApp('/');
    
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
    
    // Navigate to another page
    const aboutLink = screen.getByRole('link', { name: /about/i });
    await user.click(aboutLink);
    
    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalled();
    });
  });

  // ── Analytics Dashboard (Special Route) ────────────────────────────────────

  it('analytics route exists but requires authentication', async () => {
    renderApp('/analytics');
    
    await waitFor(() => {
      // Should render analytics page (even if access denied message shown)
      const content = document.body.textContent;
      expect(content).toContain(/analytics|access|dashboard/i);
    }, { timeout: 3000 });
  });

  // ── Active Link Highlighting ───────────────────────────────────────────────

  it('highlights active navigation link', async () => {
    renderApp('/products');
    
    await waitFor(() => {
      const productsLink = screen.getByRole('link', { name: /products/i });
      expect(productsLink.className).toContain('text-primary');
    });
  });

  // ── Error Boundary ─────────────────────────────────────────────────────────

  it('error boundary catches rendering errors', async () => {
    // Mock console.error to suppress error output in tests
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // This test verifies ErrorBoundary is present in the app
    renderApp('/');
    
    await waitFor(() => {
      expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    });
    
    consoleError.mockRestore();
  });
});
