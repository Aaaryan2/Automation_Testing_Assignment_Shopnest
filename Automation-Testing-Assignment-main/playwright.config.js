// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Two isolated projects share one config:
 *  - "api"         -> hits https://reqres.in (stand-in for the ShopNest backend)
 *  - "ui-chromium" -> hits https://the-internet.herokuapp.com (stand-in for Checkout 2.0 UI)
 *
 * Run everything:      npx playwright test
 * Run only API tests:  npx playwright test --project=api
 * Run only UI tests:   npx playwright test --project=ui-chromium
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],
  outputDir: 'test-results',

  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://reqres.in',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          // reqres.in has required an x-api-key on /api/* since its 2025 relaunch.
          // "reqres-free-v1" is the documented public demo key - no signup needed.
          // Override with your own key via REQRES_API_KEY if it ever gets rate limited.
          'x-api-key': process.env.REQRES_API_KEY || 'free_user_3HdqiK0EkciZvSuW7UfBXGAAwbS',
        },
      },
    },
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://the-internet.herokuapp.com',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});
