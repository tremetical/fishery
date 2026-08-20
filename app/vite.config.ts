import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE is set by CI for GitHub Pages project-site deploys (e.g. "/fishery/").
const base = process.env.BASE ?? '/';

export default defineConfig({
  base,
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2', 'icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'Preflight — PPL Study',
        short_name: 'Preflight',
        description:
          'Offline spaced-repetition study app for the FAA Private Pilot written exam and early flight training.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0d12',
        theme_color: '#0a0d12',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the entire build: the app must be fully usable in airplane mode.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,webmanifest}'],
        navigateFallback: base + 'index.html',
      },
    }),
  ],
  test: {
    environment: 'jsdom',
  },
});
