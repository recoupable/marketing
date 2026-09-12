import { afterEach, describe, expect, it, vi } from "vitest";

async function loadConfig() {
  vi.resetModules();
  return (await import("../config.ts")).siteConfig;
}

describe("siteConfig", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("uses the origin of NEXT_PUBLIC_SITE_URL when it is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/some/path");
    expect((await loadConfig()).url).toBe("https://preview.example.com");
  });

  it("falls back to the production origin", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect((await loadConfig()).url).toBe("https://recoupable.dev");
  });

  it("reads the contact email and booking link from the environment, with an empty booking default", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "team@example.com");
    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "");
    const config = await loadConfig();
    expect(config.contactEmail).toBe("team@example.com");
    expect(config.bookingUrl).toBe("");
  });
});
