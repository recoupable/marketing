import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";
import { docsHostRedirects } from "../docsHostRedirects";

const host = [{ type: "host", value: "docs.recoupable.dev" }];

describe("docs.recoupable.dev redirects", () => {
  it("sends every Mintlify path to the same slug under /docs, permanently", () => {
    const rule = docsHostRedirects.find((r) => r.source === "/:path*");
    expect(rule).toMatchObject({ has: host, destination: "https://recoupable.dev/docs/:path*", permanent: true });
  });

  it("maps the subdomain root and the llms files to their site equivalents", () => {
    const bySource = Object.fromEntries(docsHostRedirects.map((r) => [r.source, r.destination]));
    expect(bySource["/"]).toBe("https://recoupable.dev/docs");
    expect(bySource["/llms.txt"]).toBe("https://recoupable.dev/llms.txt");
    expect(bySource["/llms-full.txt"]).toBe("https://recoupable.dev/llms-full.txt");
    expect(docsHostRedirects.every((r) => r.permanent && r.has?.[0]?.value === "docs.recoupable.dev")).toBe(true);
  });

  it("is registered ahead of the path-only rules in next.config", async () => {
    const rules = await nextConfig.redirects!();
    const firstHostRule = rules.findIndex((r) => "has" in r);
    expect(firstHostRule).toBe(0);
    expect(rules.filter((r) => "has" in r)).toHaveLength(docsHostRedirects.length);
  });
});
