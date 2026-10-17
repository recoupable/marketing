import { expect, test } from "vitest";
import { homeCopy } from "../lib/copy/home";
import { homeHeroCopy } from "../lib/copy/home-hero";
import { homeOffersCopy } from "../lib/copy/home-offers";
import { homeCaseStudiesCopy } from "../lib/copy/home-case-studies";
import { pageEntries } from "../lib/agent-content/pageEntries";
import { entryForPath } from "../lib/agent-content/entryForPath";
import { markdownResponse } from "../lib/agent-content/markdownResponse";
import { readAgentContent } from "../lib/agent-content/readAgentContent";
import { billingCycles, planPrice, pricingInquiryHref } from "../lib/pricing";
import { absoluteUrl } from "../lib/seo";

const copies = [homeCopy, homeHeroCopy, homeOffersCopy, homeCaseStudiesCopy];
const implementationFields = new Set(["id", "visual", "file", "src", "href"]);

// Checking every editorial field catches newly added copy that the export omits.
function editorialStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) =>
    implementationFields.has(key) ? [] : editorialStrings(item),
  );
}

test("homepage exports every shared editorial field as one full document", async () => {
  const entry = entryForPath("/")!;
  const markdown = await entry.markdown();
  expect(
    pageEntries.filter((item) => item.metadata.id === "page:/"),
  ).toHaveLength(1);
  expect(entry.metadata.representation).toBe("full");
  expect(markdown).toContain(`Source: ${absoluteUrl("/")}`);
  expect(markdown).not.toContain("Summary of the public page");
  for (const text of editorialStrings(copies))
    expect(markdown, text).toContain(text);
  expect(entry.searchable).toBe(markdown);
});

test("homepage preserves section order and every FAQ answer, including collapsed answers", async () => {
  const markdown = await entryForPath("/")!.markdown();
  const sections = [
    homeHeroCopy.title.join(" "),
    homeCopy.statement.join(" "),
    homeOffersCopy.services.title,
    homeCaseStudiesCopy.title,
    homeOffersCopy.process.title,
    homeCopy.ownership.title.join(" "),
    homeCopy.engagements.title,
    homeCopy.tools.title.join(" "),
    homeCopy.questionsTitle.join(" "),
    homeCopy.contact.title,
  ];
  const positions = sections.map((section) => markdown.indexOf(section));
  expect(positions.every((position) => position >= 0)).toBe(true);
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
  for (const { question, answer } of homeCopy.questions)
    expect(markdown).toContain(`### ${question}\n\n${answer}`);
});

test("homepage includes current monthly and annual prices with billing-specific inquiry links", async () => {
  const markdown = await entryForPath("/")!.markdown();
  for (const plan of ["advisory", "partner"] as const) {
    for (const cycle of billingCycles) {
      const price = planPrice(plan, cycle);
      expect(markdown).toContain(
        `${price.monthly} / month. USD · ${price.terms}`,
      );
      expect(markdown).toContain(
        `](${absoluteUrl(pricingInquiryHref(plan, cycle))})`,
      );
    }
  }
  expect(markdown).toContain(
    `${planPrice("platform", "monthly").monthly} / month`,
  );
  for (const link of markdown.matchAll(/\]\(([^)]+)\)/g))
    expect(new URL(link[1]).origin).toBe(new URL(absoluteUrl("/")).origin);
  expect(markdown).toContain(homeCaseStudiesCopy.disclosure);
  expect(markdown).toContain(
    "illustrative figures and sample catalog entries, not client data",
  );
});

test("the raw endpoint and paginated agent reader both return the complete homepage", async () => {
  const expected = await entryForPath("/")!.markdown();
  const raw = await markdownResponse(
    new Request("https://recoupable.dev/agent-api/v1/markdown?path=/"),
  );
  expect(raw.status).toBe(200);
  expect(await raw.text()).toBe(expected);
  let offset: number | null = 0;
  let combined = "";
  while (offset !== null) {
    const chunk = await readAgentContent({
      id: "page:/",
      offset,
      maxLength: 1000,
    });
    expect(chunk.representation).toBe("full");
    combined += chunk.markdown;
    offset = chunk.nextOffset;
  }
  expect(combined).toBe(expected);
  expect(combined.trimEnd()).toMatch(
    /Implementation scoped and priced separately\.$/,
  );
});
