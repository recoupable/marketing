import { describe, expect, it } from "vitest";
import { docsVaryHeader } from "@/lib/docs/docsVaryHeader";
import nextConfig from "@/next.config";

describe("docsVaryHeader", () => {
  it("declares Vary: Accept for every /docs path", () => {
    expect(docsVaryHeader).toEqual({ source: "/docs/:path*", headers: [{ key: "Vary", value: "Accept" }] });
  });

  it("is part of the Next config headers, where the renderer cannot overwrite it", async () => {
    const rules = await nextConfig.headers!();
    expect(rules).toContainEqual(docsVaryHeader);
  });
});
