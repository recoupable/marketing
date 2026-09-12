import { describe, expect, it } from "vitest";
import { joinApiUrl } from "@/lib/docs/playground/joinApiUrl";

/** siteConfig.apiUrl already ends in /api and every spec path starts with /api. */
describe("joinApiUrl", () => {
  it("collapses the duplicate /api segment", () => {
    expect(joinApiUrl("https://test-recoup-api.vercel.app/api", "/api/artists")).toBe(
      "https://test-recoup-api.vercel.app/api/artists",
    );
  });
  it("keeps a path that does not start with /api", () => {
    expect(joinApiUrl("https://x.dev/api", "/health")).toBe("https://x.dev/api/health");
  });
  it("tolerates a trailing slash on the base", () => {
    expect(joinApiUrl("https://x.dev/api/", "/api/artists/{id}")).toBe("https://x.dev/api/artists/{id}");
  });
});
