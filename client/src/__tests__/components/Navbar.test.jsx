/**
 * Navbar.test.jsx — Component tests for Navbar
 * Tests navigation behavior, scroll effects, mobile menu, and accessibility.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Helper to render Navbar with router
const renderNavbar = (initialRoute = '/') => {
  window.history.pushState({}, 'Test page', initialRoute);
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  // ── Basic Rendering ────────────────────────────────────────────────────────

  it('renders the navbar with logo and navigation links', () => {
    renderNavbar();
    
    // Check logo
    expect(screen.getByAlt('Royal Enterprises Logo')).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays the company name', () => {
    renderNavbar();
    expect(screen.getByText('Royal')).toBeInTheDocument();
  });

  // ── Scroll Behavior ────────────────────────────────────────────────────────

  it('changes style when scrolled on homepage', async () => {
    renderNavbar('/');
    
    const nav = screen.getByRole('navigation');
    const initialClasses = nav.className;
    
    // Simulate scroll
    window.scrollY = 100;
    fireEvent.scroll(window);
    
    await waitFor(() => {
      expect(nav.className).not.toBe(initialClasses);
    });
  });

  it('has fixed background when not on homepage', () => {
    renderNavbar('/products');
    
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('bg-white');
  });

  // ── Mobile Menu ────────────────────────────────────────────────────────────

  it('opens mobile menu when toggle is clicked', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderNavbar();
    
    // Find and click the mobile menu toggle
    const toggleButton = screen.getByRole('button', { name: /open menu|menu/i });
    fireEvent.click(toggleButton);
    
    // Mobile menu should be visible
    await waitFor(() => {
      const mobileNav = screen.getAllByRole('navigation');
      expect(mobileNav.length).toBeGreaterThan(1);
    });
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderNavbar();
    
    // Open mobile menu
    const toggleButton = screen.getByRole('button', { name: /open menu|menu/i });
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      const homeLink = screen.getAllByText('Home')[0];
      fireEvent.click(homeLink);
    });
    
    // Menu should close (body overflow restored)
    expect(document.body.style.overflow).toBe('');
  });

  it('locks body scroll when mobile menu is open', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderNavbar();
    
    const toggleButton = screen.getByRole('button', { name: /open menu|menu/i });
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  // ── Active Link Highlighting ───────────────────────────────────────────────

  it('highlights the active navigation link', () => {
    renderNavbar('/products');
    
    const productsLink = screen.getByRole('link', { name: /products/i });
    expect(productsLink.className).toContain('text-primary');
  });

  it('highlights home link when on homepage', () => {
    renderNavbar('/');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.className).toContain('text-primary');
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  it('has accessible phone link', () => {
    renderNavbar();
    
    const phoneLink = screen.getByRole('link', { name: /call now/i });
    expect(phoneLink).toHaveAttribute('href', expect.stringContaining('tel:'));
  });

  it('logo link navigates to homepage', () => {
    renderNavbar('/products');
    
    const logoLink = screen.getByRole('link', { name: /royal enterprises logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  // ── Responsive Behavior ────────────────────────────────────────────────────

  it('hides mobile menu when window is resized to desktop', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderNavbar();
    
    // Open mobile menu
    const toggleButton = screen.getByRole('button', { name: /open menu|menu/i });
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
    
    // Resize to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    fireEvent(window, new Event('resize'));
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });
});
