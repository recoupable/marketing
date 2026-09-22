import { expect, it } from "vitest";
import { extractCompanyPage } from "./extractCompanyPage";
it("preserves evidence and resolves observed research links, excluding scripts and unsafe links", () => {
  const page = extractCompanyPage(
    '<title>Company &amp; Catalog</title><script>Invented acquisition</script><p>Acquired a catalog in 2024.</p><a href="/news/deal#story">Read deal</a><a href="/news/deal">Deal again</a><a href="javascript:alert(1)">No</a><a href="https://u:p@example.com">No</a>',
    "https://example.com/",
  );
  expect(page.title).toBe("Company & Catalog");
  expect(page.text).toContain("Acquired a catalog in 2024.");
  expect(page.text).not.toContain("Invented acquisition");
  expect(page.links).toEqual([
    { url: "https://example.com/news/deal", label: "Deal again" },
  ]);
});
it("reports truncation rather than implying the entire page was read", () => {
  const page = extractCompanyPage("x".repeat(21000), "https://example.com/");
  expect(page.truncated).toBe(true);
  expect(page.text).toHaveLength(20000);
});
