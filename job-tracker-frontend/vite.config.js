import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },

    // Make sure React and React DOM are resolved to one copy
    dedupe: ["react", "react-dom"],
  },

  optimizeDeps: {
    include: ["react", "react-dom", "zustand"],
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
});