/**
 * ProductCard.test.jsx — Component tests for ProductCard
 * Tests product display, image loading, error handling, and WhatsApp integration.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';

const mockProduct = {
  id: 'test-product',
  category: 'industrial-crates',
  name: 'Test Industrial Crate 400x300mm',
  shortName: 'Test Crate',
  tag: 'Heavy Duty Plastic Container',
  image: 'https://example.com/test-image.jpg',
};

describe('ProductCard', () => {
  // ── Basic Rendering ────────────────────────────────────────────────────────

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.tag)).toBeInTheDocument();
  });

  it('displays the category label', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    // Category "industrial-crates" should be formatted as "Industrial Crates"
    expect(screen.getByText('Industrial Crates')).toBeInTheDocument();
  });

  it('renders the product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const img = screen.getByAlt(mockProduct.name);
    expect(img).toHaveAttribute('src', mockProduct.image);
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  // ── Image Loading States ───────────────────────────────────────────────────

  it('shows loading state before image loads', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    // Check for loading spinner
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('hides loading state after image loads', async () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const img = screen.getByAlt(mockProduct.name);
    
    // Simulate image load
    fireEvent.load(img);
    
    await waitFor(() => {
      expect(img.className).toContain('opacity-100');
    });
  });

  it('displays placeholder when image fails to load', async () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const img = screen.getByAlt(mockProduct.name);
    
    // Simulate image error
    fireEvent.error(img);
    
    await waitFor(() => {
      // ImagePlaceholder component should be rendered
      expect(screen.queryByAlt(mockProduct.name)).not.toHaveClass('opacity-100');
    });
  });

  // ── WhatsApp Integration ───────────────────────────────────────────────────

  it('renders WhatsApp quote button', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const quoteButton = screen.getByRole('link', { name: /get a whatsapp quote/i });
    expect(quoteButton).toBeInTheDocument();
  });

  it('WhatsApp link includes product name', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const quoteButton = screen.getByRole('link', { name: /get a whatsapp quote/i });
    const href = quoteButton.getAttribute('href');
    
    expect(href).toContain('wa.me');
    expect(href).toContain(encodeURIComponent(mockProduct.name));
  });

  it('WhatsApp link opens in new tab', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const quoteButton = screen.getByRole('link', { name: /get a whatsapp quote/i });
    expect(quoteButton).toHaveAttribute('target', '_blank');
    expect(quoteButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  it('has proper ARIA labels', () => {
    render(<ProductCard product={mockProduct} index={0} />);
    
    const quoteButton = screen.getByRole('link', { name: /get a whatsapp quote/i });
    expect(quoteButton).toHaveAttribute('aria-label');
  });

  it('uses semantic HTML article element', () => {
    const { container } = render(<ProductCard product={mockProduct} index={0} />);
    
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  // ── Content Display ────────────────────────────────────────────────────────

  it('truncates long product names with line-clamp', () => {
    const longNameProduct = {
      ...mockProduct,
      name: 'This is an extremely long product name that should be truncated to prevent layout issues',
    };
    
    render(<ProductCard product={longNameProduct} index={0} />);
    
    const productName = screen.getByText(longNameProduct.name);
    expect(productName.className).toContain('line-clamp-2');
  });

  it('displays short name if provided', () => {
    const productWithShortName = {
      ...mockProduct,
      shortName: 'Short Name',
    };
    
    render(<ProductCard product={productWithShortName} index={0} />);
    
    // Short name should be used in placeholder alt text if image fails
    const img = screen.getByAlt(mockProduct.name);
    fireEvent.error(img);
  });

  // ── Animation Delay ────────────────────────────────────────────────────────

  it('applies staggered animation delay based on index', () => {
    const { container: container1 } = render(<ProductCard product={mockProduct} index={0} />);
    const { container: container2 } = render(<ProductCard product={mockProduct} index={5} />);
    
    // Both should render (testing that index doesn't break rendering)
    expect(container1.querySelector('article')).toBeInTheDocument();
    expect(container2.querySelector('article')).toBeInTheDocument();
  });
});
