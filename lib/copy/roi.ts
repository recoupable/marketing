/**
 * ROI Calculator copy, types, and calculation logic.
 * Single source of truth for the interactive savings calculator.
 *
 * Built Aug 4, 2026 — nightly value session.
 * Benchmarks sourced from verified case studies (Rostrum, Fat Beats, Parlophone).
 */

/* ── Types ─────────────────────────────────────────────────────────── */

export interface ROIInputs {
  rosterSize: number;
  contentSpend: number;
  staffHours: number;
  agencySpend: number;
}

export interface ROIResults {
  monthlySavings: number;
  annualSavings: number;
  hoursSavedPerMonth: number;
  recoupMonthlyCost: number;
  recoupAnnualCost: number;
  recommendedPlan: "pro" | "partner";
  roiPercent: number;
  breakEvenDays: number;
}

export interface Benchmark {
  company: string;
  type: string;
  metric: string;
  detail: string;
}

export interface SliderConfig {
  id: keyof ROIInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  format: (v: number) => string;
}

/* ── Calculation ───────────────────────────────────────────────────── */

const STAFF_HOURLY_COST = 40; // music industry ops avg

export function calculateROI(inputs: ROIInputs): ROIResults {
  // Content creation savings: Rostrum replaced 100% of $5K agency
  const contentSavings = inputs.contentSpend * 0.85;

  // Agency/freelancer savings: Fat Beats replaced $10K creative director
  const agencySavings = inputs.agencySpend * 0.80;

  // Staff time savings: Parlophone automated 40+ hrs of reporting
  const timeSavings = inputs.staffHours * STAFF_HOURLY_COST * 0.75;

  // Recommended plan based on roster size and spend
  const isEnterprise =
    inputs.rosterSize > 15 ||
    inputs.contentSpend + inputs.agencySpend > 8000;
  const recommendedPlan: "pro" | "partner" = isEnterprise ? "partner" : "pro";
  const recoupMonthlyCost = recommendedPlan === "partner" ? 5000 : 99;
  const recoupAnnualCost = recoupMonthlyCost * 12;

  // Gross monthly savings (before Recoup cost)
  const grossMonthlySavings = contentSavings + agencySavings + timeSavings;

  // Net monthly savings
  const monthlySavings = Math.max(0, grossMonthlySavings - recoupMonthlyCost);
  const annualSavings = monthlySavings * 12;

  // Hours saved
  const hoursSavedPerMonth = Math.round(inputs.staffHours * 0.75);

  // ROI percentage
  const roiPercent =
    recoupAnnualCost > 0
      ? Math.round(((grossMonthlySavings * 12) / recoupAnnualCost - 1) * 100)
      : 0;

  // Break-even in days
  const dailySavings = grossMonthlySavings / 30;
  const breakEvenDays =
    dailySavings > 0
      ? Math.max(1, Math.round(recoupMonthlyCost / dailySavings))
      : 999;

  return {
    monthlySavings,
    annualSavings,
    hoursSavedPerMonth,
    recoupMonthlyCost,
    recoupAnnualCost,
    recommendedPlan,
    roiPercent: Math.max(0, roiPercent),
    breakEvenDays,
  };
}

/* ── Slider configuration ──────────────────────────────────────────── */

export const sliders: SliderConfig[] = [
  {
    id: "rosterSize",
    label: "Artists in your roster",
    min: 1,
    max: 200,
    step: 1,
    defaultValue: 15,
    format: (v) => (v >= 200 ? "200+" : String(v)),
  },
  {
    id: "contentSpend",
    label: "Monthly content creation spend",
    min: 0,
    max: 25000,
    step: 500,
    defaultValue: 5000,
    prefix: "$",
    format: (v) =>
      v >= 25000
        ? "$25,000+"
        : "$" + v.toLocaleString("en-US"),
  },
  {
    id: "staffHours",
    label: "Staff hours on marketing & reporting per month",
    min: 0,
    max: 120,
    step: 5,
    defaultValue: 40,
    suffix: " hrs",
    format: (v) => (v >= 120 ? "120+" : `${v} hrs`),
  },
  {
    id: "agencySpend",
    label: "Monthly agency / freelancer spend",
    min: 0,
    max: 25000,
    step: 500,
    defaultValue: 3000,
    prefix: "$",
    format: (v) =>
      v >= 25000
        ? "$25,000+"
        : "$" + v.toLocaleString("en-US"),
  },
];

/* ── Benchmarks (from verified case studies) ───────────────────────── */

export const benchmarks: Benchmark[] = [
  {
    company: "Rostrum Records",
    type: "Independent Label",
    metric: "$5K/mo agency eliminated",
    detail:
      "Replaced a $5,000/month content creation agency. Same price, 10× the output.",
  },
  {
    company: "Fat Beats",
    type: "Hip-Hop Label & Distributor",
    metric: "72 hrs vs 3 weeks",
    detail:
      "Replaced a $10,000/month creative director. Full campaign in 72 hours — was 3 weeks.",
  },
  {
    company: "Parlophone",
    type: "Warner Music Group",
    metric: "40+ hrs/mo automated",
    detail:
      "Automated 40+ hours of monthly reporting. Five employees' Monday morning work — done by 8 AM.",
  },
];

/* ── Copy ───────────────────────────────────────────────────────────── */

export const roiCopy = {
  headline: "How Much Could You Save with AI Agents?",
  subheadline:
    "Drag the sliders to match your current operation. See exactly what Recoup saves you — based on real results from real labels.",
  description:
    "Interactive ROI calculator for music companies. See how much you could save by replacing agencies, automating reporting, and scaling content with AI agents.",

  resultsTitle: "Your Estimated Savings",
  benchmarksTitle: "Based on Real Results",
  ctaTitle: "Ready to See It in Action?",
  ctaDescription:
    "Get a personalized walkthrough showing exactly how Recoup would work for your operation.",
  ctaPrimary: "Book a demo",
  ctaSecondary: "View pricing",

  formTitle: "Get Your Full Savings Report",
  formDescription:
    "Enter your details and we'll send a detailed breakdown with recommendations specific to your operation.",
};
