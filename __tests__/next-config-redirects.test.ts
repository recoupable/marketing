import { describe, expect, it } from "vitest";
import { nextConfig } from "../next.config";

// Every legacy URL resolves in a single permanent hop; no rule may point at another rule's source.
const finalTargets: Record<string, string> = {
  "/company/about": "/about",
  "/company/recoup-records": "/records",
  "/company/recoupable-records": "/records",
  "/learn": "/resources",
  "/build/start": "/start-project?workflow=Custom%20systems",
  "/advisory/book": "/contact?workflow=AI%20strategy",
  "/designs/sky": "/",
};

describe("next.config redirects", () => {
  it("sends each legacy URL straight to its final target as a 308", async () => {
    const rules = await nextConfig.redirects!();
    for (const [source, destination] of Object.entries(finalTargets)) {
      expect(rules.find((rule) => rule.source === source), source).toMatchObject({ destination, permanent: true });
    }
  });

  it("never chains one redirect into another", async () => {
    const rules = await nextConfig.redirects!();
    const sources = new Set(rules.map((rule) => rule.source));
    for (const rule of rules) expect(sources.has(rule.destination.split("?")[0]), rule.source).toBe(false);
  });
});
