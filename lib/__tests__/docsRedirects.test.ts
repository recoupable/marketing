import { expect, it } from "vitest";
import { nextConfig } from "../../next.config.ts";

it("permanently redirects /docs and every /docs path to the documentation site", async () => {
  const redirects = await nextConfig.redirects!();
  expect(redirects).toContainEqual({ source: "/docs", destination: "https://docs.recoupable.dev", permanent: true });
  expect(redirects).toContainEqual({ source: "/docs/:path*", destination: "https://docs.recoupable.dev/:path*", permanent: true });
});
