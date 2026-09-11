import assert from "node:assert/strict";
import test from "node:test";
import { absoluteUrl, isSearchPreview, organizationGraph, serializeJsonLd, withPageMetadata } from "../lib/seo.ts";
import { site } from "../lib/site.ts";

test("public metadata keeps the canonical page identity in social previews", () => {
  const metadata = withPageMetadata({ title: "Custom music AI systems", description: "Built around catalog data and existing tools.", alternates: { canonical: "/build" } });
  assert.equal(metadata.alternates?.canonical, "/build");
  assert.equal(metadata.openGraph?.url, `${site.url}/build`);
  assert.equal(metadata.openGraph?.title, "Custom music AI systems");
  assert.equal(metadata.twitter?.description, metadata.description);
  assert.ok(metadata.openGraph?.images);
  assert.equal(metadata.robots, undefined, "Page must inherit preview exclusions rather than force indexing");
});

test("preview and explicit staging exclusion do not affect normal production", () => {
  assert.equal(isSearchPreview({ VERCEL_ENV: "preview" }), true);
  assert.equal(isSearchPreview({ NEXT_PUBLIC_SITE_INDEXABLE: "false" }), true);
  assert.equal(isSearchPreview({ VERCEL_ENV: "production" }), false);
  assert.equal(isSearchPreview({}), false);
});

test("structured data cannot break out of its script element", () => {
  const value = { name: '</script><img src=x onerror="alert(1)">', note: "Music & AI" };
  const encoded = serializeJsonLd(value);
  assert.equal(encoded.includes("<"), false);
  assert.deepEqual(JSON.parse(encoded), value);
});

test("organization, founder and website identities link to real public destinations", () => {
  const graph = organizationGraph()["@graph"];
  assert.equal(graph[0]["@id"], absoluteUrl("/#organization"));
  assert.equal(graph[0].founder?.url, absoluteUrl("/about#sidney-swift"));
  assert.equal(graph[1].publisher?.["@id"], graph[0]["@id"]);
  assert.equal(graph[0].logo?.url, absoluteUrl("/images/recoup-logo.svg"));
  assert.ok(!("aggregateRating" in graph[0]), "Decorative stars are not customer ratings");
});
