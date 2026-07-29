import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Playwright test location
  testDir: "./e2e/tests",

  // Global timeout
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // Fail CI if test.only exists
  forbidOnly: !!process.env.CI,

  // Retry only in CI
  retries: process.env.CI ? 2 : 0,

  // Reporter
  reporter: "html",

  // Shared settings
  use: {
    baseURL: "http://localhost:5173",

    headless: true,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",
  },

  // Automatically start Vite
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },

  // Only Chromium
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});