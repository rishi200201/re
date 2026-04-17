/**
 * useSEO.test.js — Hook tests for useSEO
 * Tests dynamic meta tag updates, title changes, and Open Graph tags.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSEO } from '../../hooks/useSEO';

describe('useSEO', () => {
  // Store original head content to restore after tests
  let originalHead;

  beforeEach(() => {
    originalHead = document.head.innerHTML;
    document.head.innerHTML = '';
    document.title = 'Original Title';
  });

  afterEach(() => {
    document.head.innerHTML = originalHead;
  });

  // ── Title Updates ──────────────────────────────────────────────────────────

  it('updates document title', () => {
    renderHook(() => useSEO({ title: 'Test Page Title' }));
    
    expect(document.title).toBe('Test Page Title');
  });

  it('does not update title when title prop is undefined', () => {
    document.title = 'Existing Title';
    renderHook(() => useSEO({ description: 'Test description' }));
    
    expect(document.title).toBe('Existing Title');
  });

  // ── Meta Description ───────────────────────────────────────────────────────

  it('creates meta description tag', () => {
    renderHook(() => useSEO({ description: 'This is a test description' }));
    
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toBe('This is a test description');
  });

  it('updates existing meta description', () => {
    // Create initial description
    renderHook(() => useSEO({ description: 'First description' }));
    
    // Update description
    renderHook(() => useSEO({ description: 'Second description' }));
    
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Second description');
    
    // Should not create duplicate
    const allDescriptions = document.querySelectorAll('meta[name="description"]');
    expect(allDescriptions.length).toBe(1);
  });

  // ── Meta Keywords ──────────────────────────────────────────────────────────

  it('creates meta keywords tag', () => {
    renderHook(() => useSEO({ keywords: 'test, keywords, seo' }));
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toBeInTheDocument();
    expect(metaKeywords?.getAttribute('content')).toBe('test, keywords, seo');
  });

  it('updates existing meta keywords', () => {
    renderHook(() => useSEO({ keywords: 'old keywords' }));
    renderHook(() => useSEO({ keywords: 'new keywords' }));
    
    const allKeywords = document.querySelectorAll('meta[name="keywords"]');
    expect(allKeywords.length).toBe(1);
    expect(allKeywords[0].getAttribute('content')).toBe('new keywords');
  });

  // ── Canonical URL ──────────────────────────────────────────────────────────

  it('creates canonical link', () => {
    renderHook(() => useSEO({ url: 'https://example.com/test-page' }));
    
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical?.getAttribute('href')).toBe('https://example.com/test-page');
  });

  it('updates existing canonical link', () => {
    renderHook(() => useSEO({ url: 'https://example.com/page1' }));
    renderHook(() => useSEO({ url: 'https://example.com/page2' }));
    
    const allCanonicals = document.querySelectorAll('link[rel="canonical"]');
    expect(allCanonicals.length).toBe(1);
    expect(allCanonicals[0].getAttribute('href')).toBe('https://example.com/page2');
  });

  // ── Open Graph Tags ────────────────────────────────────────────────────────

  it('creates Open Graph title', () => {
    renderHook(() => useSEO({ title: 'Test Page', ogTitle: 'OG Test Page' }));
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeInTheDocument();
    expect(ogTitle?.getAttribute('content')).toBe('OG Test Page');
  });

  it('uses title as fallback for og:title when ogTitle is not provided', () => {
    renderHook(() => useSEO({ title: 'Test Page' }));
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Test Page');
  });

  it('creates Open Graph description', () => {
    renderHook(() => useSEO({ 
      description: 'Regular description',
      ogDescription: 'OG specific description'
    }));
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    expect(ogDescription?.getAttribute('content')).toBe('OG specific description');
  });

  it('uses description as fallback for og:description', () => {
    renderHook(() => useSEO({ description: 'Test description' }));
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    expect(ogDescription?.getAttribute('content')).toBe('Test description');
  });

  it('creates Open Graph image', () => {
    renderHook(() => useSEO({ ogImage: 'https://example.com/image.jpg' }));
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toBeInTheDocument();
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.jpg');
  });

  it('creates Open Graph URL', () => {
    renderHook(() => useSEO({ url: 'https://example.com/test' }));
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl).toBeInTheDocument();
    expect(ogUrl?.getAttribute('content')).toBe('https://example.com/test');
  });

  it('creates Open Graph type with default value', () => {
    renderHook(() => useSEO({ title: 'Test' }));
    
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toBeInTheDocument();
    expect(ogType?.getAttribute('content')).toBe('website');
  });

  it('allows custom Open Graph type', () => {
    renderHook(() => useSEO({ title: 'Test', ogType: 'article' }));
    
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('article');
  });

  // ── Twitter Card Tags ──────────────────────────────────────────────────────

  it('creates Twitter card type', () => {
    renderHook(() => useSEO({ title: 'Test' }));
    
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).toBeInTheDocument();
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });

  it('creates Twitter title', () => {
    renderHook(() => useSEO({ title: 'Test Title', ogTitle: 'OG Title' }));
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.getAttribute('content')).toBe('OG Title');
  });

  it('creates Twitter description', () => {
    renderHook(() => useSEO({ description: 'Test description' }));
    
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    expect(twitterDesc).toBeInTheDocument();
  });

  it('creates Twitter image', () => {
    renderHook(() => useSEO({ ogImage: 'https://example.com/twitter-image.jpg' }));
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    expect(twitterImage?.getAttribute('content')).toBe('https://example.com/twitter-image.jpg');
  });

  // ── Complete SEO Setup ─────────────────────────────────────────────────────

  it('handles complete SEO configuration', () => {
    const seoConfig = {
      title: 'Complete Test Page',
      description: 'This is a complete test description',
      keywords: 'test, seo, complete',
      url: 'https://example.com/complete',
      ogTitle: 'OG Complete Test',
      ogDescription: 'OG complete description',
      ogImage: 'https://example.com/og-image.jpg',
      ogType: 'article',
    };

    renderHook(() => useSEO(seoConfig));

    expect(document.title).toBe(seoConfig.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(seoConfig.description);
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe(seoConfig.keywords);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(seoConfig.url);
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(seoConfig.ogTitle);
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(seoConfig.ogDescription);
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(seoConfig.ogImage);
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(seoConfig.ogType);
  });

  // ── Update on Dependency Change ────────────────────────────────────────────

  it('updates SEO when props change', () => {
    const { rerender } = renderHook(
      ({ title }) => useSEO({ title }),
      { initialProps: { title: 'First Title' } }
    );

    expect(document.title).toBe('First Title');

    rerender({ title: 'Second Title' });

    expect(document.title).toBe('Second Title');
  });

  // ── Graceful Handling of Missing Values ────────────────────────────────────

  it('handles undefined values gracefully', () => {
    expect(() => {
      renderHook(() => useSEO({ title: undefined, description: undefined }));
    }).not.toThrow();
  });

  it('does not create tags for undefined values', () => {
    renderHook(() => useSEO({ title: 'Test' }));
    
    // Keywords not provided, should not exist
    const keywords = document.querySelector('meta[name="keywords"]');
    expect(keywords).not.toBeInTheDocument();
  });
});
