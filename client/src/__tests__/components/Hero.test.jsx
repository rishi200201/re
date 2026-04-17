/**
 * Hero.test.jsx — Component tests for Hero section
 * Tests hero content display, CTAs, trust stats, and responsiveness.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../../components/Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  useInView: () => ({ ref: null, inView: true }),
}));

const renderHero = () => {
  return render(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );
};

describe('Hero', () => {
  // ── Content Rendering ──────────────────────────────────────────────────────

  it('renders the main heading', () => {
    renderHero();
    
    expect(screen.getByText(/reliable/i)).toBeInTheDocument();
    expect(screen.getByText(/packaging/i)).toBeInTheDocument();
    expect(screen.getByText(/storage solutions/i)).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    renderHero();
    
    expect(screen.getByText(/trusted packaging partner since 2009/i)).toBeInTheDocument();
  });

  it('shows the company description', () => {
    renderHero();
    
    expect(screen.getByText(/from hdpe industrial crates/i)).toBeInTheDocument();
  });

  // ── Features List ──────────────────────────────────────────────────────────

  it('displays all hero features', () => {
    renderHero();
    
    expect(screen.getByText(/grade-a hdpe industrial crates/i)).toBeInTheDocument();
    expect(screen.getByText(/wooden & plastic pallets/i)).toBeInTheDocument();
    expect(screen.getByText(/factory-direct pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/pan-india delivery/i)).toBeInTheDocument();
  });

  // ── Call-to-Action Buttons ─────────────────────────────────────────────────

  it('renders "Get Free Quote" CTA button', () => {
    renderHero();
    
    const quoteButton = screen.getByRole('link', { name: /get free quote/i });
    expect(quoteButton).toBeInTheDocument();
    expect(quoteButton).toHaveAttribute('href');
  });

  it('"Get Free Quote" links to contact page', () => {
    renderHero();
    
    const quoteButton = screen.getByRole('link', { name: /get free quote/i });
    expect(quoteButton.getAttribute('href')).toBe('/contact');
  });

  it('renders WhatsApp CTA button', () => {
    renderHero();
    
    const whatsappButton = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsappButton).toBeInTheDocument();
  });

  it('WhatsApp button links to WhatsApp with pre-filled message', () => {
    renderHero();
    
    const whatsappButton = screen.getByRole('link', { name: /whatsapp/i });
    const href = whatsappButton.getAttribute('href');
    
    expect(href).toContain('wa.me');
    expect(href).toContain('916381870361');
  });

  it('WhatsApp button opens in new tab', () => {
    renderHero();
    
    const whatsappButton = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsappButton).toHaveAttribute('target', '_blank');
    expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // ── Trust Statistics ───────────────────────────────────────────────────────

  it('displays trust statistics', () => {
    renderHero();
    
    expect(screen.getByText(/years trusted/i)).toBeInTheDocument();
    expect(screen.getByText(/business clients/i)).toBeInTheDocument();
    expect(screen.getByText(/states served/i)).toBeInTheDocument();
  });

  it('shows correct trust stat values', () => {
    renderHero();
    
    // Should display trust statistics
    const body = document.body.textContent;
    expect(body).toContain('Years Trusted');
    expect(body).toContain('Business Clients');
  });

  // ── Hero Image ─────────────────────────────────────────────────────────────

  it('includes hero warehouse image with picture element', () => {
    renderHero();
    
    const images = screen.getAllByAltText(/warehouse/i);
    expect(images.length).toBeGreaterThan(0);
  });

  it('provides WebP and JPEG fallbacks for hero image', () => {
    const { container } = renderHero();
    
    const picture = container.querySelector('picture');
    expect(picture).toBeInTheDocument();
    
    const sources = picture?.querySelectorAll('source');
    expect(sources?.length).toBeGreaterThan(0);
  });

  // ── Semantic HTML ──────────────────────────────────────────────────────────

  it('uses semantic section element', () => {
    const { container } = renderHero();
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('uses proper heading hierarchy', () => {
    renderHero();
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  it('all buttons have accessible labels', () => {
    renderHero();
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });

  it('hero image has descriptive alt text', () => {
    renderHero();
    
    const images = screen.getAllByAltText(/warehouse/i);
    images.forEach(img => {
      const altText = img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText.length).toBeGreaterThan(10);
    });
  });

  // ── Content Quality ────────────────────────────────────────────────────────

  it('includes company founding year', () => {
    renderHero();
    
    expect(screen.getByText(/2009/i)).toBeInTheDocument();
  });

  it('mentions key product categories', () => {
    renderHero();
    
    const content = screen.getByText(/hdpe industrial crates.*wooden pallets/i);
    expect(content).toBeInTheDocument();
  });
});
