import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { PlanReport } from "./PlanReport";

it("renders the complete generated report and escapes company-provided text", () => {
  const plan = {
    title: "Royalty review <script>alert(1)</script>",
    summary: "Compare statement totals.",
    output: "A review queue with source references.",
    firstStep: "Choose two statements.",
    inputs: ["Royalty statements", "Catalog identifiers"],
    steps: ["Normalize identifiers", "Compare totals", "Review differences"],
    review: "Finance approves each discrepancy.",
    success: "Every discrepancy links to a statement.",
  };
  const html = renderToStaticMarkup(<PlanReport plan={plan} />);
  for (const text of [
    plan.summary,
    plan.output,
    plan.firstStep,
    ...plan.inputs,
    ...plan.steps,
    plan.review,
    plan.success,
  ])
    expect(html).toContain(text);
  expect(html).toContain("<details");
  expect(html).toContain("&lt;script&gt;");
  expect(html).not.toContain("<script>");
});
