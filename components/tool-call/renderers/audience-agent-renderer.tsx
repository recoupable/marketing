"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  AudienceAgentOutput,
  Market,
} from "@/lib/agent/tools/audience-agent";

/**
 * Audience Agent card body. Three stacked sections:
 *   1. Top 5 markets — city + country + listener count + trend arrow
 *   2. Age split — horizontal stacked bar (18-24 / 25-34 / 35-44 / 45+)
 *   3. Gender split — horizontal stacked bar (female / male / other)
 *
 * The stacked bars are deliberately achromatic — varying opacity steps
 * instead of color — so the eye reads the proportions, not the palette.
 * Brand stays monochrome; data is the splash of meaning.
 */
export function AudienceAgentRenderer({
  output,
}: {
  output: AudienceAgentOutput;
}) {
  const ageEntries = Object.entries(output.ageSplit) as Array<
    [keyof AudienceAgentOutput["ageSplit"], number]
  >;
  const genderEntries = Object.entries(output.genderSplit) as Array<
    [keyof AudienceAgentOutput["genderSplit"], number]
  >;

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        {output.topMarkets.map((m) => (
          <MarketRow key={`${m.city}-${m.country}`} market={m} />
        ))}
      </div>
      <SegmentBar
        label="AGE"
        segments={ageEntries.map(([k, v]) => ({ key: k, value: v }))}
      />
      <SegmentBar
        label="GENDER"
        segments={genderEntries.map(([k, v]) => ({ key: k, value: v }))}
      />
    </div>
  );
}

function MarketRow({ market }: { market: Market }) {
  const TrendIcon =
    market.trend === "growth"
      ? ArrowUpRight
      : market.trend === "decline"
        ? ArrowDownRight
        : Minus;
  const trendTone =
    market.trend === "growth"
      ? "text-(--foreground)/85"
      : market.trend === "decline"
        ? "text-(--foreground)/40"
        : "text-(--foreground)/55";

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-baseline gap-1.5 min-w-0">
        <span className="text-[12px] font-medium text-(--foreground) truncate">
          {market.city}
        </span>
        <span className="text-[10px] font-pixel uppercase tracking-[0.12em] text-(--foreground)/40 shrink-0">
          {market.country}
        </span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[11px] tabular-nums text-(--foreground)/70">
          {formatListeners(market.listeners)}
        </span>
        <TrendIcon className={cn("w-3 h-3", trendTone)} aria-hidden />
      </div>
    </div>
  );
}

function SegmentBar({
  label,
  segments,
}: {
  label: string;
  segments: { key: string; value: number }[];
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/35">
          {label}
        </span>
        <div className="flex gap-1.5 text-[9.5px] font-pixel uppercase tracking-[0.08em] text-(--foreground)/45">
          {segments.map((s) => (
            <span key={s.key}>
              {s.key} {Math.round(s.value * 100)}%
            </span>
          ))}
        </div>
      </div>
      <div className="flex h-1 rounded-full overflow-hidden bg-(--foreground)/8">
        {segments.map((s, i) => (
          <div
            key={s.key}
            className="h-full"
            style={{
              width: `${s.value * 100}%`,
              backgroundColor: `color-mix(in srgb, var(--foreground) ${
                100 - i * 22
              }%, transparent)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}
