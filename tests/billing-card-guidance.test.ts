import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const guide = readFileSync(new URL("../content/docs/source/credits.mdx", import.meta.url), "utf8");
const accounts = JSON.parse(readFileSync(new URL("../content/docs/source/api-reference/openapi/accounts.json", import.meta.url), "utf8"));
const pages = JSON.parse(readFileSync(new URL("../content/docs/manifest.json", import.meta.url), "utf8")) as { slug: string; body: string }[];

function expectCurrentLookupOnly(text: string) {
  expect(text).not.toMatch(/no payment method has been saved yet|account has never saved a payment method/i);
  expect(text).toContain("no supported default card");
}

test("the billing guide and response schema describe null as a current lookup, not account history", () => {
  const paragraph = guide.split("\n\n").find(text => text.startsWith("`card` is `null`"));
  expect(paragraph).toBeDefined();
  expectCurrentLookupOnly(paragraph!);
  expect(paragraph).toContain("does not establish whether a card was saved previously");
  expect(paragraph).toContain("other saved cards remain");
  expectCurrentLookupOnly(accounts.components.schemas.AccountPaymentMethodResponse.properties.card.description);
  expectCurrentLookupOnly(accounts.paths["/api/accounts/{id}/payment-method"].get.description);
});

test("the generated billing guide retains the current lookup limits", () => {
  const page = pages.find(page => page.slug === "credits");
  expect(page).toBeDefined();
  expectCurrentLookupOnly(page!.body);
  expect(page!.body).toContain("does not establish whether a card was saved previously");
});
