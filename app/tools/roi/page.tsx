import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { roiCopy } from "@/lib/copy/roi";
import { ROICalculator } from "@/components/roi/ROICalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "ROI Calculator — How Much Could You Save? | Recoup",
  description:
    "Calculate how much time and money AI agents could save your music business. Input your roster size, team costs, and content volume — get your ROI in seconds.",
  path: "/tools/roi",
});

export default function ROIPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-12">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          {roiCopy.badge}
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {roiCopy.headline}
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-xl mx-auto">
          {roiCopy.subheadline}
        </p>
      </header>

      {/* Calculator */}
      <ROICalculator />

      {/* Methodology */}
      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <h2
          className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          How we calculate
        </h2>
        <ul className="space-y-2">
          {roiCopy.methodology.map((item) => (
            <li
              key={item}
              className="text-[13px] text-[var(--muted-foreground)] flex items-start gap-2"
            >
              <span className="text-[var(--foreground)] mt-0.5">·</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
