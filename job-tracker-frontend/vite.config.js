import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      includeAssets: [
        "favicon.ico",
        "robots.txt",
      ],

      manifest: {
        id: "/",

        name: "Job Tracker SaaS",
        short_name: "Job Tracker",
        description:
          "Track and manage your job applications with ease.",

        theme_color: "#0f172a",
        background_color: "#0f172a",

        display: "standalone",

        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff2}",
        ],

        runtimeCaching: [
          // Google Fonts
          {
            urlPattern:
              /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,

            handler: "CacheFirst",

            options: {
              cacheName: "google-fonts",

              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Static assets
          {
            urlPattern:
              /\.(?:js|css|html|png|jpg|jpeg|svg|gif|webp|woff2?)$/i,

            handler: "StaleWhileRevalidate",

            options: {
              cacheName: "static-assets",

              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          // Job Search API
          {
            urlPattern: /\/api\/.*\/jobs\/search/i,

            handler: "NetworkFirst",

            options: {
              cacheName: "job-search-api",

              networkTimeoutSeconds: 5,

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 10,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});