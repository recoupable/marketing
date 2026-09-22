"use client";

import React from "react";
import { defineCatalog, type Spec } from "@json-render/core";
import { defineRegistry, Renderer, JSONUIProvider } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { z } from "zod";
import type { WorkflowPlan } from "@/lib/workflow-plan/schema";

const catalog = defineCatalog(schema, {
  components: {
    Report: {
      props: z.object({ title: z.string(), summary: z.string() }),
      slots: ["default"],
      description: "Personalized report introduction.",
    },
    Section: {
      props: z.object({
        title: z.string(),
        text: z.string(),
        highlighted: z.boolean(),
      }),
      description: "A concrete recommendation or success criterion.",
    },
    Checklist: {
      props: z.object({
        title: z.string(),
        items: z.array(z.string()),
        ordered: z.boolean(),
      }),
      description: "Required inputs or implementation steps.",
    },
    Details: {
      props: z.object({}),
      slots: ["default"],
      description: "Expandable implementation details.",
    },
  },
  actions: {},
});

const { registry } = defineRegistry(catalog, {
  components: {
    Report: ({ props, children }) => (
      <>
        <h2>{props.title}</h2>
        <p>{props.summary}</p>
        {children}
      </>
    ),
    Section: ({ props }) => (
      <div className={props.highlighted ? "wa-first" : undefined}>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    ),
    Checklist: ({ props }) => {
      const List = props.ordered ? "ol" : "ul";
      return (
        <div>
          <h3>{props.title}</h3>
          <List>
            {props.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </List>
        </div>
      );
    },
    Details: ({ children }) => (
      <details>
        <summary>How to put it into practice</summary>
        {children}
      </details>
    ),
  },
});

export function PlanReport({ plan }: { plan: WorkflowPlan }) {
  const spec: Spec = {
    root: "report",
    elements: {
      report: {
        type: "Report",
        props: { title: plan.title, summary: plan.summary },
        children: ["first", "details"],
      },
      output: {
        type: "Section",
        props: {
          title: "What your team gets",
          text: plan.output,
          highlighted: false,
        },
      },
      first: {
        type: "Section",
        props: {
          title: "Your first step",
          text: plan.firstStep,
          highlighted: true,
        },
      },
      details: {
        type: "Details",
        props: {},
        children: ["output", "inputs", "steps", "review", "success"],
      },
      inputs: {
        type: "Checklist",
        props: {
          title: "What you’ll need",
          items: plan.inputs,
          ordered: false,
        },
      },
      steps: {
        type: "Checklist",
        props: { title: "How to start", items: plan.steps, ordered: true },
      },
      review: {
        type: "Section",
        props: { title: "Human review", text: plan.review, highlighted: false },
      },
      success: {
        type: "Section",
        props: {
          title: "Check it worked",
          text: plan.success,
          highlighted: false,
        },
      },
    },
  };
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
