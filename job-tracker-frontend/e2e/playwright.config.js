import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Location of your Playwright tests
  testDir: "./e2e/tests",

  // Global timeout
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Run tests sequentially — tests share one test account's data,
  // so parallel runs cause race conditions (rows shifting mid-test)
  fullyParallel: false,
  workers: 1,

  // HTML report
  reporter: "html",

  // Shared settings
  use: {
    baseURL: "http://localhost:5173",

    headless: true,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",
  },

  // Start the Vite dev server automatically
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },

  // Only run Chromium
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});