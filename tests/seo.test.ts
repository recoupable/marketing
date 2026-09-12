import { test, expect } from "vitest";
import { absoluteUrl, isSearchPreview, organizationGraph, serializeJsonLd, withPageMetadata } from "../lib/seo.ts";
import { siteConfig } from "../lib/config.ts";

test("public metadata keeps the canonical page identity in social previews", () => {
  const metadata = withPageMetadata({ title: "Custom music AI systems", description: "Built around catalog data and existing tools.", alternates: { canonical: "/build" } });
  expect(metadata.alternates?.canonical).toBe("/build");
  expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/build`);
  expect(metadata.openGraph?.title).toBe("Custom music AI systems");
  expect(metadata.twitter?.description).toBe(metadata.description);
  expect(metadata.openGraph?.images).toBeTruthy();
  expect(metadata.robots, "Page must inherit preview exclusions rather than force indexing").toBe(undefined);
});

test("preview and explicit staging exclusion do not affect normal production", () => {
  expect(isSearchPreview({ VERCEL_ENV: "preview" })).toBe(true);
  expect(isSearchPreview({ NEXT_PUBLIC_SITE_INDEXABLE: "false" })).toBe(true);
  expect(isSearchPreview({ VERCEL_ENV: "production" })).toBe(false);
  expect(isSearchPreview({})).toBe(false);
});

test("structured data cannot break out of its script element", () => {
  const value = { name: '</script><img src=x onerror="alert(1)">', note: "Music & AI" };
  const encoded = serializeJsonLd(value);
  expect(encoded.includes("<")).toBe(false);
  expect(JSON.parse(encoded)).toStrictEqual(value);
});

test("organization, founder and website identities link to real public destinations", () => {
  const graph = organizationGraph()["@graph"];
  expect(graph[0]["@id"]).toBe(absoluteUrl("/#organization"));
  expect(graph[0].founder?.url).toBe(absoluteUrl("/about#sidney-swift"));
  expect(graph[1].publisher?.["@id"]).toBe(graph[0]["@id"]);
  expect(graph[0].logo?.url).toBe(absoluteUrl("/images/recoup-logo.svg"));
  expect(!("aggregateRating" in graph[0]), "Decorative stars are not customer ratings").toBeTruthy();
});
