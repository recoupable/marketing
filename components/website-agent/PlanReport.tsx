"use client";

import React, { useState } from "react";
import { defineCatalog, type Spec } from "@json-render/core";
import { defineRegistry, Renderer, JSONUIProvider } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { z } from "zod";
import type { WorkflowPlan } from "@/lib/workflow-plan/schema";
import { MessageResponse } from "@/components/ai-elements/message";

function ReportDetails({
  streaming,
  children,
}: {
  streaming: boolean;
  children: React.ReactNode;
}) {
  // Open live sections once; preserve the visitor's choice when generation finishes.
  const [open, setOpen] = useState(streaming);
  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>How to put it into practice</summary>
      {children}
    </details>
  );
}

const catalog = defineCatalog(schema, {
  components: {
    Report: {
      props: z.object({
        title: z.string(),
        summary: z.string(),
        streaming: z.boolean(),
      }),
      slots: ["default"],
      description: "Personalized report introduction.",
    },
    Section: {
      props: z.object({
        title: z.string(),
        text: z.string(),
        highlighted: z.boolean(),
        streaming: z.boolean(),
      }),
      description: "A concrete recommendation or success criterion.",
    },
    Checklist: {
      props: z.object({
        title: z.string(),
        items: z.array(z.string()),
        ordered: z.boolean(),
        streaming: z.boolean(),
      }),
      description: "Required inputs or implementation steps.",
    },
    Details: {
      props: z.object({ streaming: z.boolean() }),
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
        {props.title && <h2>{props.title}</h2>}
        {props.summary && (
          <MessageResponse isAnimating={props.streaming}>
            {props.summary}
          </MessageResponse>
        )}
        {children}
      </>
    ),
    Section: ({ props }) => (
      <div className={props.highlighted ? "wa-first" : undefined}>
        <h3>{props.title}</h3>
        <MessageResponse isAnimating={props.streaming}>
          {props.text}
        </MessageResponse>
      </div>
    ),
    Checklist: ({ props }) => {
      const List = props.ordered ? "ol" : "ul";
      return (
        <div>
          <h3>{props.title}</h3>
          <List>
            {props.items.map((item, index) => (
              <li key={index}>
                <MessageResponse isAnimating={props.streaming}>
                  {item}
                </MessageResponse>
              </li>
            ))}
          </List>
        </div>
      );
    },
    Details: ({ props, children }) => (
      <ReportDetails streaming={props.streaming}>{children}</ReportDetails>
    ),
  },
});

export function PlanReport({
  plan,
  streaming = false,
}: {
  plan: Partial<WorkflowPlan>;
  streaming?: boolean;
}) {
  const details = ["output", "inputs", "steps", "review", "success"].filter(
    (key) => {
      const value = plan[key as keyof WorkflowPlan];
      return Array.isArray(value) ? value.some(Boolean) : !!value;
    },
  );
  const spec: Spec = {
    root: "report",
    elements: {
      report: {
        type: "Report",
        props: {
          title: plan.title ?? "",
          summary: plan.summary ?? "",
          streaming,
        },
        children: [
          ...(plan.firstStep ? ["first"] : []),
          ...(details.length ? ["details"] : []),
        ],
      },
      output: {
        type: "Section",
        props: {
          title: "What your team gets",
          text: plan.output ?? "",
          highlighted: false,
          streaming,
        },
      },
      first: {
        type: "Section",
        props: {
          title: "Your first step",
          text: plan.firstStep ?? "",
          highlighted: true,
          streaming,
        },
      },
      details: {
        type: "Details",
        props: { streaming },
        children: details,
      },
      inputs: {
        type: "Checklist",
        props: {
          title: "What you’ll need",
          items: (plan.inputs ?? []).filter(Boolean),
          ordered: false,
          streaming,
        },
      },
      steps: {
        type: "Checklist",
        props: {
          title: "How to start",
          items: (plan.steps ?? []).filter(Boolean),
          ordered: true,
          streaming,
        },
      },
      review: {
        type: "Section",
        props: {
          title: "Human review",
          text: plan.review ?? "",
          highlighted: false,
          streaming,
        },
      },
      success: {
        type: "Section",
        props: {
          title: "Check it worked",
          text: plan.success ?? "",
          highlighted: false,
          streaming,
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
