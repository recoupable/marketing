import { test, expect } from "vitest";
import {
  annualDiscountPercent, parsePricingSelection, planPrice, pricingInquiryHref,
  pricingPlans, pricingSelectionLabel, type PricingSelection,
} from "../lib/pricing.ts";
import { inquiryMessageWithContext } from "../lib/attribution/inquiryMessageWithContext.ts";
import { prepareInquiryEmail } from "../lib/inquiry/prepareInquiryEmail.ts";
import { readInquiryReceipt } from "../lib/inquiry/readInquiryReceipt.ts";
import { createInquiryHandler } from "../lib/inquiries/createInquiryHandler.ts";
import { validateInquiry } from "../lib/inquiries/validateInquiry.ts";

const now = 1_800_000_000_000;
const inquiry = {
  name: "Taylor Example", email: "taylor@example.com", company: "Example Music",
  interest: "Custom systems", website: "", startedAt: now - 5000, source: "/start-project",
};

test("annual plans apply 20% off, round down to whole dollars, and disclose the full annual bill", () => {
  expect(annualDiscountPercent).toBe(20);
  for (const plan of pricingPlans) {
    const monthly = planPrice(plan.id, "monthly");
    const annual = planPrice(plan.id, "annual");
    expect(monthly.monthlyCents).toBe(plan.monthlyCents);
    expect(monthly.billedCents).toBe(plan.monthlyCents);
    expect(annual.monthlyCents % 100).toBe(0);
    const roundingDifference = plan.monthlyCents * 80 - annual.monthlyCents * 100;
    expect(roundingDifference >= 0 && roundingDifference < 10_000).toBeTruthy();
    expect(annual.billedCents).toBe(annual.monthlyCents * 12);
    expect(annual.terms).toBe(`${annual.billed} billed annually`);
  }
  expect(planPrice("advisory", "annual")).toStrictEqual({
    monthlyCents: 79900, billedCents: 958800,
    monthly: "$799", billed: "$9,588", annualSavings: "$2,400",
    terms: "$9,588 billed annually",
  });
  expect(planPrice("advisory", "monthly").monthly).toBe("$999");
  expect(planPrice("platform", "annual").monthly).toBe("$79");
  expect(planPrice("platform", "annual").billed).toBe("$948");
  expect(planPrice("partner", "annual").monthly).toBe("$7,999");
  expect(planPrice("partner", "annual").billed).toBe("$95,988");
});

test("pricing query accepts only supported inquiry plans and single billing values", () => {
  for (const plan of ["advisory", "partner"] as const) {
    expect(parsePricingSelection(plan, undefined)).toStrictEqual({ plan, billing: "monthly" });
    expect(parsePricingSelection(plan, "annual")).toStrictEqual({ plan, billing: "annual" });
    expect(parsePricingSelection(plan, "monthly")).toStrictEqual({ plan, billing: "monthly" });
  }
  for (const plan of [undefined, "", "platform", "premium", "Advisory", "../enterprise", ["advisory"], ["advisory", "partner"]]) {
    expect(parsePricingSelection(plan, "monthly")).toBe(undefined);
  }
  for (const billing of ["", "yearly", "ANNUAL", ["annual"], ["monthly", "annual"]]) {
    expect(parsePricingSelection("advisory", billing)).toBe(undefined);
    expect(parsePricingSelection("enterprise", billing)).toBe(undefined);
  }
});

test("inquiry links round trip billing choices and enterprise makes no recurring price promise", () => {
  for (const plan of ["advisory", "partner"] as const) {
    for (const billing of ["monthly", "annual"] as const) {
      const url = new URL(pricingInquiryHref(plan, billing), "https://recoup.test");
      expect(url.pathname).toBe("/start-project");
      expect(parsePricingSelection(url.searchParams.get("plan")!, url.searchParams.get("billing")!)).toStrictEqual({ plan, billing });
    }
  }
  expect(pricingInquiryHref("enterprise", "annual")).toBe("/start-project?plan=enterprise");
  const enterprise = parsePricingSelection("enterprise", "annual")!;
  expect(enterprise).toStrictEqual({ plan: "enterprise", billing: "monthly" });
  expect(pricingSelectionLabel(enterprise)).toBe("Enterprise · Custom engagement");
  expect(pricingSelectionLabel({ plan: "advisory", billing: "annual" })).toBe("Advisory · $799/month · $9,588 billed annually");
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
    expect(prepared.text.includes(editedBrief)).toBeTruthy();
    expect(prepared.text.includes(context)).toBeTruthy();
    expect(new URL(prepared.href).searchParams.get("body")!.includes(context)).toBeTruthy();
    const response = await handle(new Request("https://recoup.test/api/inquiries", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
      body: JSON.stringify({ ...inquiry, message }),
    }));
    expect(await readInquiryReceipt(response)).not.toBe(null);
    const plain = notes.at(-1)!.replace(/\\([\\`*_{}[\]<>()#+.!|~=-])/g, "$1");
    expect(plain.includes(context)).toBeTruthy();
    expect(plain.includes(editedBrief)).toBeTruthy();
    expect(plain.includes("Website path: Project brief /start-project")).toBeTruthy();
    expect(plain.includes("Latest visit source: source=newsletter")).toBeTruthy();
  }
  const submissionIds = notes.map(note => note.match(/Submission ID: ([a-f\d]{64})/)?.[1]);
  expect(submissionIds.every(Boolean)).toBeTruthy();
  expect(new Set(submissionIds).size, "Billing changes must not be deduplicated as the same inquiry").toBe(selections.length);
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
      expect(message.length <= 6000).toBeTruthy();
      expect(message.includes(brief)).toBeTruthy();
      expect(message.endsWith(context)).toBeTruthy();
      expect(validateInquiry({ ...inquiry, message }, now).message).toBe(message);
    }
  }
});
