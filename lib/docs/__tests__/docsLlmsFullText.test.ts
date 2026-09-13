import { describe, expect, it } from "vitest";
import { docsLlmsFullText } from "@/lib/docs/docsLlmsFullText";
import { docs } from "@/lib/docs";
import { siteConfig } from "@/lib/config";

describe("docsLlmsFullText", () => {
  it("concatenates every page's raw markdown in navigation order, each headed by its title and source", async () => {
    const pages = [docs.find(page => page.slug === "quickstart")!, docs.find(page => page.slug === "authentication")!];
    const text = await docsLlmsFullText(pages);
    const quickstart = text.indexOf(`# Quickstart\n\nSource: ${siteConfig.url}/docs/quickstart\n`);
    const authentication = text.indexOf(`# Authentication\n\nSource: ${siteConfig.url}/docs/authentication\n`);
    expect(quickstart).toBe(0);
    expect(authentication).toBeGreaterThan(quickstart);
    expect(text).toContain("x-api-key");
  });

  it("includes an endpoint page's operation slice", async () => {
    const page = docs.find(item => item.api?.spec)!;
    const text = await docsLlmsFullText([page]);
    expect(text).toContain(`## ${page.api!.method} ${page.api!.path}`);
    expect(text).toContain("## Operation and referenced schemas");
  });
});
