/**
 * Consulting FAQ — shared between /consulting (full list + JSON-LD, W-35) and
 * the homepage objection strip (W-33). Extracted from app/consulting/page.tsx
 * so both surfaces stay in sync.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export const consultingFaq: readonly FaqItem[] = [
  {
    q: "What does a typical engagement look like?",
    a: "It depends on where you are. Some teams need a single strategy session to get clarity; others want a multi-week implementation sprint alongside their team. We scope it together on the first call — no fixed package required.",
  },
  {
    q: "Who owns what we build — and how is our data handled?",
    a: "You do. The agents, skills, and workflows we build are yours, and they live in your stack or a repo your organization controls. We scope data access and reuse terms before work starts, and your private work is not folded into public skills without approval.",
  },
  {
    q: "Do I need technical people on my team?",
    a: "No. We translate between the technical and business sides — that's the point. You leave with a plan your team can actually run, and the same skills work whether your team lives in spreadsheets or in a terminal.",
  },
  {
    q: "Is this just about Recoup's products?",
    a: "No. We cover the full AI landscape relevant to music — tools, workflows, and build-vs-buy decisions. If Recoup's platform is the right fit, great; if not, you still leave with a clear plan you can execute anywhere.",
  },
  {
    q: "What's the time commitment?",
    a: "Sessions run 60–90 minutes. Implementation sprints take one to a few weeks depending on scope. Training can be a single half-day or spread across sessions.",
  },
] as const;

/** Condensed objection strip for the homepage (W-33) — top 4 by intent. */
export const homepageFaq: readonly FaqItem[] = [
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT is a general chatbot. Recoup is the music layer — skills, an API, and MCP integrations built for music work like research, release ops, and catalog analysis. Point your own agent at it, or have us wire it into your stack.",
  },
  consultingFaq[1], // ownership + data
  consultingFaq[2], // no technical team needed
  {
    q: "What does it cost to start?",
    a: "The open skills are free, the hosted Chat workspace starts free, and consulting sessions start at $500. Implementation and partner deals are scoped to your roster and volume.",
  },
] as const;
