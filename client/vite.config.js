import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

function heroWebpPlugin() {
  return {
    name: 'hero-webp',
    apply: 'build',
    async closeBundle() {
      try {
        const sharp = (await import('sharp')).default
        await sharp(path.join(process.cwd(), 'public/hero-crates.jpg'))
          .webp({ quality: 87 })
          .toFile(path.join(process.cwd(), 'public/hero-crates.webp'))
        console.log('✓ hero-crates.webp generated')
      } catch (e) {
        console.warn('[heroWebpPlugin]', e.message)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '')
  return {
    base: process.env.VITE_BASE_PATH || '/',

    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        jpg: { quality: 72 },
        jpeg: { quality: 72 },
        png: { quality: 72 },
        webp: { quality: 80 },
        includePublic: true,
        exclude: /\.svg$/,
      }),
      heroWebpPlugin(),
    ],

    server: {
      watch: { usePolling: true, interval: 120 },
      headers: { 'Cache-Control': 'no-store' },
    },

    build: {
      target: 'esnext',
      assetsInlineLimit: 0,
      minify: 'esbuild',
      sourcemap: false,
      cssMinify: true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-icons')) return 'icons'
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/__tests__/setup.js',
      include: ['src/**/*.{test,spec}.{js,jsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        include: ['src/lib/**', 'src/hooks/**'],
      },
    },
  }
})