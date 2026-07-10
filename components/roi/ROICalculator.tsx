"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { roiCopy } from "@/lib/copy/roi";

/* ── Animated number ─────────────────────────────────────────────── */
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = prevValue.current;
    const to = value;
    prevValue.current = value;

    if (from === to) {
      el.textContent = `${prefix}${format(to)}${suffix}`;
      return;
    }

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      if (el) el.textContent = `${prefix}${format(current)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}

function format(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}K`;
  if (n >= 1_000) return n.toLocaleString("en-US");
  return n.toString();
}

/* ── Slider input ────────────────────────────────────────────────── */
function SliderInput({
  label,
  value,
  min,
  max,
  prefix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  prefix?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[13px] text-[var(--muted-foreground)] tracking-wide">
          {label}
        </label>
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {prefix}
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
        style={
          {
            "--slider-pct": `${pct}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

/* ── Result card ─────────────────────────────────────────────────── */
function ResultCard({
  label,
  value,
  prefix,
  suffix,
  highlight,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 text-center transition-colors ${
        highlight
          ? "bg-[var(--foreground)] text-[var(--background)]"
          : "bg-[var(--secondary)]"
      }`}
    >
      <div
        className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-tight leading-none mb-1"
        style={{ fontFamily: "var(--font-bitmap), monospace" }}
      >
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div
        className={`text-[11px] uppercase tracking-widest ${
          highlight
            ? "opacity-60"
            : "text-[var(--muted-foreground)]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Comparison bar ──────────────────────────────────────────────── */
function ComparisonBar({
  withoutHours,
  withHours,
}: {
  withoutHours: number;
  withHours: number;
}) {
  const maxHours = withoutHours;
  const withoutPct = 100;
  const withPct = maxHours > 0 ? (withHours / maxHours) * 100 : 0;

  return (
    <div className="space-y-3 mt-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[var(--muted-foreground)]">
            {roiCopy.comparison.without}
          </span>
          <span className="tabular-nums font-medium">
            {withoutHours.toLocaleString()} {roiCopy.comparison.unit}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-[var(--secondary)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--muted-foreground)] transition-all duration-500"
            style={{ width: `${withoutPct}%` }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[var(--muted-foreground)]">
            {roiCopy.comparison.with}
          </span>
          <span className="tabular-nums font-medium">
            {withHours.toLocaleString()} {roiCopy.comparison.unit}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-[var(--secondary)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--foreground)] transition-all duration-500"
            style={{ width: `${withPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main calculator ─────────────────────────────────────────────── */
export function ROICalculator() {
  const c = roiCopy.inputs;

  const [roster, setRoster] = useState<number>(c.roster.default);
  const [hoursPerArtist, setHoursPerArtist] = useState<number>(c.hoursPerArtist.default);
  const [hourlyCost, setHourlyCost] = useState<number>(c.hourlyCost.default);
  const [postsPerWeek, setPostsPerWeek] = useState<number>(c.postsPerWeek.default);

  const calc = useCallback(() => {
    const weeklyHours = roster * hoursPerArtist;
    const annualManualCost = weeklyHours * hourlyCost * 52;
    const automationRate = 0.8;

    const annualTimeSaved = Math.round(weeklyHours * automationRate * 52);
    const annualCostSaved = Math.round(annualManualCost * automationRate);

    const contentWithout = postsPerWeek * roster * 52;
    const contentWith = Math.round(contentWithout * 2.5);
    const contentBoost = contentWithout > 0
      ? Math.round(((contentWith - contentWithout) / contentWithout) * 100)
      : 0;

    let recoupAnnual: number;
    if (roster <= 1) recoupAnnual = 19 * 12;
    else if (roster <= 10) recoupAnnual = 99 * 12;
    else recoupAnnual = roster * 15 * 12;

    const netSavings = annualCostSaved - recoupAnnual;
    const roiMultiple =
      recoupAnnual > 0 ? Math.max(0, Math.round(netSavings / recoupAnnual)) : 0;

    const weeklyWithRecoup = Math.round(weeklyHours * (1 - automationRate));

    return {
      annualTimeSaved,
      annualCostSaved,
      contentBoost,
      roiMultiple,
      weeklyHours,
      weeklyWithRecoup,
    };
  }, [roster, hoursPerArtist, hourlyCost, postsPerWeek]);

  const r = calc();

  return (
    <div className="space-y-10">
      {/* ── Inputs ──────────────────────────────────────────────── */}
      <div className="space-y-6 rounded-2xl border border-[var(--border)] p-6 sm:p-8">
        <SliderInput
          label={c.roster.label}
          value={roster}
          min={c.roster.min}
          max={c.roster.max}
          onChange={setRoster}
        />
        <SliderInput
          label={c.hoursPerArtist.label}
          value={hoursPerArtist}
          min={c.hoursPerArtist.min}
          max={c.hoursPerArtist.max}
          onChange={setHoursPerArtist}
        />
        <SliderInput
          label={c.hourlyCost.label}
          value={hourlyCost}
          min={c.hourlyCost.min}
          max={c.hourlyCost.max}
          prefix="$"
          onChange={setHourlyCost}
        />
        <SliderInput
          label={c.postsPerWeek.label}
          value={postsPerWeek}
          min={c.postsPerWeek.min}
          max={c.postsPerWeek.max}
          onChange={setPostsPerWeek}
        />
      </div>

      {/* ── Results ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <ResultCard
          label={roiCopy.results.timeSaved.label}
          value={r.annualTimeSaved}
          suffix=" hrs"
        />
        <ResultCard
          label={roiCopy.results.costSaved.label}
          value={r.annualCostSaved}
          prefix="$"
          highlight
        />
        <ResultCard
          label={roiCopy.results.contentBoost.label}
          value={r.contentBoost}
          suffix="%"
        />
        <ResultCard
          label={roiCopy.results.roiMultiple.label}
          value={r.roiMultiple}
          suffix="×"
          highlight
        />
      </div>

      {/* ── Comparison ──────────────────────────────────────────── */}
      <ComparisonBar
        withoutHours={r.weeklyHours}
        withHours={r.weeklyWithRecoup}
      />

      {/* ── CTAs ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
        <Link
          href={roiCopy.cta.primaryHref}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[var(--foreground)] text-[var(--background)] px-8 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
        >
          {roiCopy.cta.primary}
        </Link>
        <Link
          href={roiCopy.cta.secondaryHref}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-8 py-3 text-sm font-medium tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)]"
        >
          {roiCopy.cta.secondary}
        </Link>
      </div>

      {/* ── Disclaimer ──────────────────────────────────────────── */}
      <p className="text-[11px] text-[var(--muted-foreground)] text-center leading-relaxed">
        {roiCopy.disclaimer}
      </p>
    </div>
  );
}
