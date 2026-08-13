/**
 * Case Studies page copy — single source of truth.
 * Data sourced from strategy/case-studies.md (verified numbers from real customers).
 */

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  segment: string;
  headline: string;
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  highlight: { value: string; label: string };
  quote?: { text: string; attribution: string };
}

export interface AggStat {
  value: string;
  label: string;
}

export const caseStudiesCopy = {
  title: "Customer Stories",
  description:
    "Real results from real labels. See how music companies use Recoup to replace expensive services, automate manual work, and move faster than their competition.",

  aggStats: [
    { value: "$15K+", label: "Monthly costs eliminated" },
    { value: "72 hrs", label: "Campaign turnaround (was 3 weeks)" },
    { value: "40+", label: "Staff hours saved per month" },
  ] satisfies AggStat[],

  studies: [
    {
      id: "rostrum",
      company: "Rostrum Records",
      segment: "Independent Label",
      headline: "Replaced a $5,000/month content agency",
      challenge:
        "Rostrum's marketing team was paying $5,000 per month for an external content creation agency. Briefs went out, revisions went back and forth, and turnaround was measured in days. For a label releasing multiple projects per month, some artists got content and others didn't.",
      solution:
        "Recoup replaced the agency at the same price point. The team now generates 30 days of branded, artist-specific social content in a single session. Weekly release reports that required manual data pulls were automated. And Gatsby Grace — a new AI artist — was created entirely on the platform, with 22 finished videos produced in one session.",
      metrics: [
        {
          label: "Agency spend",
          before: "$5,000/mo",
          after: "$0 (eliminated)",
        },
        {
          label: "Content turnaround",
          before: "3–5 days per batch",
          after: "Minutes per batch",
        },
        {
          label: "Content volume",
          before: "Limited by agency bandwidth",
          after: "30 days in one session",
        },
        {
          label: "Release reporting",
          before: "Manual (5+ staff hrs/wk)",
          after: "Automated (Monday delivery)",
        },
      ],
      highlight: { value: "$0", label: "Net cost change — same price, 10× output" },
      quote: {
        text: "We were paying an agency the same amount to do a fraction of what Recoup handles for us. The content turnaround alone would have justified it.",
        attribution: "Rostrum Records",
      },
    },
    {
      id: "fatbeats",
      company: "Fat Beats",
      segment: "Iconic Hip-Hop Label & Distributor",
      headline: "Replaced a $10,000/month creative director — in 72 hours",
      challenge:
        "Fat Beats was spending $10,000 per month on a creative director for a major album rollout. The typical timeline from brief to final deliverables was 2–3 weeks, with multiple rounds of revisions. Tight release schedules meant either starting campaigns late or stockpiling assets far in advance.",
      solution:
        "Recoup generated the complete campaign package — social visuals, promotional materials, content calendar — from artist context loaded into the platform. No revision cycles. The assets didn't just serve one album — they became the foundation for Fat Beats' ongoing release pipeline.",
      metrics: [
        {
          label: "Creative director retainer",
          before: "$10,000/mo",
          after: "$0 (eliminated for campaign)",
        },
        {
          label: "Time to campaign assets",
          before: "2–3 weeks",
          after: "72 hours",
        },
        {
          label: "Revision cycles",
          before: "3–5 rounds",
          after: "Generated on-brand from context",
        },
        {
          label: "Asset reusability",
          before: "One-off campaign",
          after: "Powers entire release pipeline",
        },
      ],
      highlight: { value: "72 hrs", label: "Brief to complete campaign — was 3 weeks" },
      quote: {
        text: "We got in 72 hours what used to take us three weeks and $10K. And the assets weren't throwaway — they set the tone for everything we've released since.",
        attribution: "Fat Beats",
      },
    },
    {
      id: "parlophone",
      company: "Parlophone Records",
      segment: "Warner Music Group Label",
      headline: "Automated 40+ hours of monthly reporting",
      challenge:
        "Every week, Parlophone's team compiled release reports covering streaming performance, playlist adds, social growth, and competitive positioning. Five employees contributed a combined 40+ hours per month to a process that was almost entirely manual: log into each platform, cross-reference data, compile into templates, distribute to stakeholders.",
      solution:
        "Recoup automated the entire workflow. Streaming numbers, playlist adds, social growth, and demographics are pulled automatically from APIs. Reports generate in Parlophone's existing format and arrive every Monday morning — no human intervention required.",
      metrics: [
        {
          label: "Staff on weekly reports",
          before: "5 employees",
          after: "0 (automated)",
        },
        {
          label: "Hours per month",
          before: "40+",
          after: "0 (automated)",
        },
        {
          label: "Estimated cost saved",
          before: "$3,000–$5,000/mo",
          after: "Reallocated to strategy",
        },
        {
          label: "Report delivery",
          before: "End of week (manual)",
          after: "Monday 8 AM (automatic)",
        },
      ],
      highlight: { value: "0 hrs", label: "Manual reporting — was 40+ hrs/month" },
      quote: {
        text: "We had five people spending their Mondays pulling numbers. Now the reports are waiting for us when we get in. The team can actually think about what the numbers mean.",
        attribution: "Parlophone Records",
      },
    },
  ] satisfies CaseStudy[],

  cta: {
    headline: "See what Recoup can do for your label",
    description:
      "Get a free catalog valuation and see how AI agents can run your music operations.",
    buttonLabel: "Get Your Valuation",
    buttonHref: "/valuation",
  },
} as const;
