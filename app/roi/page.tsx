import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { roiCopy } from "@/lib/copy/roi";
import { ROICalculator } from "@/components/roi/ROICalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "ROI Calculator — See How Much AI Agents Save Your Label | Recoup",
  description: roiCopy.description,
  path: "/roi",
});

export default function ROIPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-16">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          Interactive Calculator
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {roiCopy.headline}
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
          {roiCopy.subheadline}
        </p>
      </header>

      {/* Calculator */}
      <ROICalculator />

      {/* Trust signals */}
      <div className="mt-20 pt-12 border-t border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              $15K+
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Monthly costs eliminated
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              72 hrs
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Campaign turnaround
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              40+
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Staff hours saved per month
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              4
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Enterprise customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
