import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ScorecardReport } from "./ScorecardReport";
import type { ScorecardDraft } from "@/lib/website-agent/scorecard";

const scorecard: ScorecardDraft = {
  assessment: {
    scope: {
      summary: "An independent music publisher",
      quote: "We are an independent music publisher.",
    },
    priority: null,
    criteria: [
      {
        id: "knowledge_use",
        status: "yes",
        quote: "We use AI for catalog questions.",
      },
      {
        id: "knowledge_records",
        status: "yes",
        quote: "It reads our catalog and links to rows.",
      },
      {
        id: "knowledge_checks",
        status: "no",
        quote: "We haven't tested representative questions yet.",
      },
    ],
  },
  summary:
    "The knowledge work is repeatable. The other areas need more context.",
  nextMoves: [
    {
      area: "knowledge",
      action: "Check your toughest questions",
      why: "Accuracy has not been tested across the questions you rely on.",
      firstStep: "Choose questions your team can independently answer.",
      check: "Track correct answers, missing evidence and review time.",
    },
  ],
  peers: [],
};

it("renders a partial profile without treating unanswered areas as zero, plus inspectable evidence", () => {
  const html = renderToStaticMarkup(<ScorecardReport scorecard={scorecard} />);
  expect(html).toContain("1 of 5 areas assessed.");
  expect(html).toContain("Not assessed");
  expect(html).toContain("We use AI for catalog questions.");
  expect(html).toContain("Check your toughest questions");
  expect(html).toContain("self-assessment");
  expect(html).not.toContain("PEER CONTEXT");
  expect(html).not.toContain("undefined");
});

it("streams summary content without exposing an unvalidated peer example", () => {
  const html = renderToStaticMarkup(
    <ScorecardReport
      streaming
      scorecard={{
        ...scorecard,
        summary: "Your team is",
        peers: [
          {
            company: "Unvalidated peer",
            practice: "Some claim",
            relevance: "Not yet checked",
            published: null,
            source: {
              url: "https://example.com",
              title: "Example",
              quote: "Unverified quote",
            },
          },
        ],
      }}
    />,
  );
  expect(html).toContain("Your team is");
  expect(html).not.toContain("Unvalidated peer");
});

it("escapes visitor-provided text in the fixed JSON Render catalog", () => {
  const html = renderToStaticMarkup(
    <ScorecardReport
      scorecard={{
        ...scorecard,
        assessment: {
          ...scorecard.assessment,
          scope: {
            summary: "<script>alert(1)</script>",
            quote: "Some quoted text",
          },
        },
      }}
    />,
  );
  expect(html).toContain("&lt;script&gt;");
  expect(html).not.toContain("<script>");
});
