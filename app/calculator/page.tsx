import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ROICalculator } from "@/components/calculator/ROICalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "AI ROI Calculator for Music | Recoup",
  description:
    "Calculate how much your label or management company could save by replacing manual marketing ops with AI agents. Free interactive tool.",
  path: "/calculator",
});

/* ── Credential badges (same pattern as advisory page) ─────────────── */
const credentials = [
  { stat: "97%", label: "Cost Reduction", detail: "Average savings vs. human marketing ops" },
  { stat: "70%", label: "Time Recovered", detail: "Hours reinvested in strategy & relationships" },
  { stat: "$99", label: "Per Artist/Mo", detail: "Flat pricing, unlimited content & engagement" },
];

export default function CalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-16">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          Free Tool
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          How much is manual marketing costing you?
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-xl mx-auto">
          Plug in your numbers. See what AI agents save you — in dollars and hours.
          Built for labels, managers, and distributors running real rosters.
        </p>
      </header>

      {/* Credential badges */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {credentials.map((c) => (
          <div key={c.label} className="text-center p-4">
            <div
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.stat}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-1">
              {c.label}
            </div>
            <div className="text-[11px] text-[var(--muted-foreground)]">
              {c.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <ROICalculator />

      {/* Social proof */}
      <div className="text-center mt-16 mb-8">
        <p className="text-sm text-[var(--muted-foreground)] italic">
          Built by{" "}
          <a href="/advisory" className="underline hover:text-[var(--foreground)]">
            Sidney Swift
          </a>{" "}
          — Grammy-winning producer, US patent holder, founder of Recoup.
          <br />
          These numbers come from running AI agents across real artist rosters.
        </p>
      </div>
    </div>
  );
}
