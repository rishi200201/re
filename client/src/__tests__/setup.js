import '@testing-library/jest-dom';

// Mock window.scrollTo for jsdom
window.scrollTo = () => {};

// Mock IntersectionObserver for framer-motion's useInView
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
