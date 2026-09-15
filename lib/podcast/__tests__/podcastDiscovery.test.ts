import { expect, test } from "vitest";
import { headerNavigation } from "../../copy/navigation.ts";
import { publicRoutes } from "../../public-routes.ts";
import { siteConfig } from "../../config.ts";
import { subscribeToRecoup } from "../../marketing-subscribe.ts";

test("/podcast is a public route", () => {
  expect(publicRoutes).toContain("/podcast");
});

test("Podcast replaces About in the Resources dropdown; About stays off the header", () => {
  const resources = headerNavigation.find((item) => item.label === "Resources");
  const hrefs = resources && "links" in resources ? resources.links.map((link) => link.href) : [];
  expect(hrefs).toContain("/podcast");
  expect(hrefs).not.toContain("/about");
});

test("the three listening platforms are configured", () => {
  expect(siteConfig.podcast.spotify).toMatch(/^https:\/\/open\.spotify\.com\/show\//);
  expect(siteConfig.podcast.apple).toMatch(/^https:\/\/podcasts\.apple\.com\//);
  expect(siteConfig.podcast.youtube).toMatch(/^https:\/\/www\.youtube\.com\/playlist\?list=/);
});

test("a /podcast subscribe is a lead tagged with the podcast campaign", async () => {
  const calls: unknown[] = [];
  const fetcher = (async (_url: unknown, init?: RequestInit) => {
    calls.push(JSON.parse(String(init?.body)));
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  }) as unknown as typeof fetch;
  const result = await subscribeToRecoup({ email: "listener@example.com", source: "/podcast" }, fetcher);
  expect(result).toStrictEqual({ ok: true });
  expect(calls[0]).toMatchObject({ kind: "subscribe", source: "/podcast", utm_campaign: "podcast" });
});
