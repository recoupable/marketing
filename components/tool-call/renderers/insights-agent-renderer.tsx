"use client";

import { cn } from "@/lib/utils";
import type {
  Insight,
  InsightsAgentOutput,
} from "@/lib/agent/tools/insights-agent";

/**
 * Insights Agent card body. Two stacked sections:
 *   1. A monthly-listener sparkline showing the 12-month trajectory
 *   2. 3-5 sentiment-tagged headline bullets ("Just added to RapCaviar", etc.)
 *
 * Each bullet is color-coded by sentiment (positive / neutral / warning)
 * via a tiny status dot — keeps the body achromatic but signals the vibe.
 */
export function InsightsAgentRenderer({
  output,
}: {
  output: InsightsAgentOutput;
}) {
  const trend = output.monthlyListenerTrend;
  const first = trend[0]?.listeners ?? 0;
  const last = trend[trend.length - 1]?.listeners ?? 0;
  const deltaPct = first ? ((last - first) / first) * 100 : 0;

  return (
    <div className="space-y-3">
      <Sparkline points={trend} deltaPct={deltaPct} latest={last} />
      <div className="space-y-1.5">
        {output.insights.map((insight, idx) => (
          <InsightRow key={idx} insight={insight} />
        ))}
      </div>
    </div>
  );
}

function Sparkline({
  points,
  deltaPct,
  latest,
}: {
  points: InsightsAgentOutput["monthlyListenerTrend"];
  deltaPct: number;
  latest: number;
}) {
  const min = Math.min(...points.map((p) => p.listeners));
  const max = Math.max(...points.map((p) => p.listeners));
  const range = Math.max(1, max - min);
  const width = 200;
  const height = 38;
  const padX = 2;

  const path = points
    .map((p, i) => {
      const x = padX + (i / Math.max(1, points.length - 1)) * (width - padX * 2);
      const y = height - 2 - ((p.listeners - min) / range) * (height - 6);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const deltaTone =
    deltaPct >= 5
      ? "text-(--foreground)/85"
      : deltaPct <= -5
        ? "text-(--foreground)/55"
        : "text-(--foreground)/60";

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[13px] font-medium text-(--foreground)">
          {formatListeners(latest)}
        </span>
        <span
          className={cn(
            "text-[10px] font-pixel uppercase tracking-[0.12em]",
            deltaTone,
          )}
        >
          {deltaPct >= 0 ? "+" : ""}
          {deltaPct.toFixed(1)}% 12mo
        </span>
      </div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
        className="shrink-0"
      >
        <path
          d={path}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

const RECENCY_LABEL: Record<Insight["recency"], string> = {
  last_24h: "24h",
  last_7d: "7d",
  last_30d: "30d",
  longer: "30d+",
};

function InsightRow({ insight }: { insight: Insight }) {
  const dotTone =
    insight.sentiment === "positive"
      ? "bg-(--foreground)"
      : insight.sentiment === "warning"
        ? "bg-(--foreground)/45"
        : "bg-(--foreground)/25";

  return (
    <div className="flex gap-2 items-start">
      <span
        className={cn("w-1 h-1 rounded-full mt-2 shrink-0", dotTone)}
        aria-hidden
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[12px] font-medium text-(--foreground) leading-tight">
            {insight.headline}
          </span>
          <span className="text-[9px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/35 shrink-0">
            {RECENCY_LABEL[insight.recency]}
          </span>
        </div>
        <p className="text-[11.5px] text-(--foreground)/55 leading-snug mt-0.5">
          {insight.detail}
        </p>
      </div>
    </div>
  );
}

function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M listeners`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K listeners`;
  return `${n} listeners`;
}
