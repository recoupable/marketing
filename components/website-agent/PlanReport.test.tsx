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

it("renders arriving report sections without requiring the rest of the document", () => {
  const html = renderToStaticMarkup(
    <PlanReport
      streaming
      plan={{
        title: "Check release assets",
        summary: "Compare the checklist",
        inputs: ["Approved export", ""],
        steps: ["Check required files"],
      }}
    />,
  );
  expect(html).toContain("Check release assets");
  expect(html).toContain("Compare the checklist");
  expect(html).toContain("Check required files");
  expect(html).toContain('<details open=""');
  expect(html).not.toContain("Your first step");
  expect(html).not.toContain("Human review");
  expect(html).not.toContain("undefined");
});
