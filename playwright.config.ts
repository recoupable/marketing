import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config for the marketing site. Tests run against a server on
 * BASE_URL (defaults to the prod server on :3100). CI can point BASE_URL
 * elsewhere. Desktop + mobile projects exercise the responsive layout (W-34).
 */
const baseURL = process.env.BASE_URL || "http://localhost:3100";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
