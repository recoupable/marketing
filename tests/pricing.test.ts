import assert from "node:assert/strict";
import { test } from "node:test";
import {
  annualDiscountPercent, parsePricingSelection, planPrice, pricingInquiryHref,
  pricingPlans, pricingSelectionLabel, type PricingSelection,
} from "../lib/pricing.ts";
import { inquiryMessageWithContext } from "../lib/referral-attribution.ts";
import { prepareInquiryEmail, hasInquiryReceipt } from "../lib/inquiry-client.ts";
import { createInquiryHandler, validateInquiry } from "../lib/inquiries.ts";

const now = 1_800_000_000_000;
const inquiry = {
  name: "Taylor Example", email: "taylor@example.com", company: "Example Music",
  interest: "Custom systems", website: "", startedAt: now - 5000,
};

test("annual plans apply 20% off, round down to whole dollars, and disclose the full annual bill", () => {
  assert.equal(annualDiscountPercent, 20);
  for (const plan of pricingPlans) {
    const monthly = planPrice(plan.id, "monthly");
    const annual = planPrice(plan.id, "annual");
    assert.equal(monthly.monthlyCents, plan.monthlyCents);
    assert.equal(monthly.billedCents, plan.monthlyCents);
    assert.equal(annual.monthlyCents % 100, 0);
    const roundingDifference = plan.monthlyCents * 80 - annual.monthlyCents * 100;
    assert.ok(roundingDifference >= 0 && roundingDifference < 10_000);
    assert.equal(annual.billedCents, annual.monthlyCents * 12);
    assert.equal(annual.terms, `${annual.billed} billed annually`);
  }
  assert.deepEqual(planPrice("advisory", "annual"), {
    monthlyCents: 79900, billedCents: 958800,
    monthly: "$799", billed: "$9,588", annualSavings: "$2,400",
    terms: "$9,588 billed annually",
  });
  assert.equal(planPrice("advisory", "monthly").monthly, "$999");
  assert.equal(planPrice("platform", "annual").monthly, "$79");
  assert.equal(planPrice("platform", "annual").billed, "$948");
  assert.equal(planPrice("partner", "annual").monthly, "$7,999");
  assert.equal(planPrice("partner", "annual").billed, "$95,988");
});

test("pricing query accepts only supported inquiry plans and single billing values", () => {
  for (const plan of ["advisory", "partner"] as const) {
    assert.deepEqual(parsePricingSelection(plan, undefined), { plan, billing: "monthly" });
    assert.deepEqual(parsePricingSelection(plan, "annual"), { plan, billing: "annual" });
    assert.deepEqual(parsePricingSelection(plan, "monthly"), { plan, billing: "monthly" });
  }
  for (const plan of [undefined, "", "platform", "premium", "Advisory", "../enterprise", ["advisory"], ["advisory", "partner"]]) {
    assert.equal(parsePricingSelection(plan, "monthly"), undefined);
  }
  for (const billing of ["", "yearly", "ANNUAL", ["annual"], ["monthly", "annual"]]) {
    assert.equal(parsePricingSelection("advisory", billing), undefined);
    assert.equal(parsePricingSelection("enterprise", billing), undefined);
  }
});

test("inquiry links round trip billing choices and enterprise makes no recurring price promise", () => {
  for (const plan of ["advisory", "partner"] as const) {
    for (const billing of ["monthly", "annual"] as const) {
      const url = new URL(pricingInquiryHref(plan, billing), "https://recoup.test");
      assert.equal(url.pathname, "/start-project");
      assert.deepEqual(parsePricingSelection(url.searchParams.get("plan")!, url.searchParams.get("billing")!), { plan, billing });
    }
  }
  assert.equal(pricingInquiryHref("enterprise", "annual"), "/start-project?plan=enterprise");
  const enterprise = parsePricingSelection("enterprise", "annual")!;
  assert.deepEqual(enterprise, { plan: "enterprise", billing: "monthly" });
  assert.equal(pricingSelectionLabel(enterprise), "Enterprise · Custom engagement");
  assert.equal(pricingSelectionLabel({ plan: "advisory", billing: "annual" }), "Advisory · $799/month · $9,588 billed annually");
});

test("full plan and billing context survives edited briefs through copied email and CRM notes", async () => {
  const notes: string[] = [];
  const handle = createInquiryHandler({
    getApiUrl: () => "https://api.recoup.test/api", now: () => now,
    fetch: async (_input, init) => {
                  const body = JSON.parse(String(init?.body));
      notes.push(body.message);
      return Response.json({ status: "success" });
    },
  });
  const editedBrief = "Please build a royalty review workflow. We rewrote this brief after selecting the plan.";
  const selections: PricingSelection[] = [
    { plan: "advisory", billing: "monthly" },
    { plan: "advisory", billing: "annual" },
    { plan: "partner", billing: "monthly" },
    { plan: "partner", billing: "annual" },
    { plan: "enterprise", billing: "monthly" },
  ];
  for (const selection of selections) {
    // Selected pricing is submission context, independent of the editable brief.
    const context = `Selected plan: ${pricingSelectionLabel(selection)}`;
    const message = `${inquiryMessageWithContext(editedBrief, "Project brief /start-project", { current: { utm_source: "newsletter" } })}\n\n${context}`;
    const prepared = prepareInquiryEmail("hi@recoupable.dev", { ...inquiry, message });
    assert.ok(prepared.text.includes(editedBrief));
    assert.ok(prepared.text.includes(context));
    assert.ok(new URL(prepared.href).searchParams.get("body")!.includes(context));
    const response = await handle(new Request("https://recoup.test/api/inquiries", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
      body: JSON.stringify({ ...inquiry, message }),
    }));
    assert.equal(await hasInquiryReceipt(response), true);
    const plain = notes.at(-1)!.replace(/\\([\\`*_{}[\]<>()#+.!|~=-])/g, "$1");
    assert.ok(plain.includes(context));
    assert.ok(plain.includes(editedBrief));
    assert.ok(plain.includes("Website path: Project brief /start-project"));
    assert.ok(plain.includes("Latest visit source: utm_source=newsletter"));
  }
  const submissionIds = notes.map(note => note.match(/Submission ID: ([a-f\d]{64})/)?.[1]);
  assert.ok(submissionIds.every(Boolean));
  assert.equal(new Set(submissionIds).size, selections.length, "Billing changes must not be deduplicated as the same inquiry");
});

test("maximum brief and bounded referral data leave room for every pricing selection", () => {
  const brief = "x".repeat(5000);
  const attribution = {
    first: { utm_source: "a".repeat(64), utm_medium: "b".repeat(64), utm_campaign: "c".repeat(64) },
    current: { utm_source: "d".repeat(64), utm_medium: "e".repeat(64), utm_campaign: "f".repeat(64) },
  };
  for (const plan of ["advisory", "partner", "enterprise"] as const) {
    for (const billing of ["monthly", "annual"] as const) {
      const context = `Selected plan: ${pricingSelectionLabel({ plan, billing })}`;
      const message = `${inquiryMessageWithContext(brief, "Project brief /start-project", attribution)}\n\n${context}`;
      assert.ok(message.length <= 6000);
      assert.ok(message.includes(brief));
      assert.ok(message.endsWith(context));
      assert.equal(validateInquiry({ ...inquiry, message }, now).message, message);
    }
  }
});
