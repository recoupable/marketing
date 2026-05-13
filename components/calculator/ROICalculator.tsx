"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ── Cost assumptions ──────────────────────────────────────────────── */

const HUMAN_COSTS = {
  socialMedia: { label: "Social media management", perArtist: 4000 },
  contentCreation: { label: "Content creation", perArtist: 2500 },
  fanEngagement: { label: "Fan engagement & DMs", perArtist: 1500 },
  analytics: { label: "Analytics & reporting", perArtist: 1000 },
  releaseCampaign: { label: "Release campaigns", perRelease: 3500 },
  playlistPitching: { label: "Playlist pitching", perRelease: 1000 },
};

const AI_COSTS = {
  perArtist: 99, // Pro plan
  perRelease: 0, // included
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function pct(a: number, b: number): string {
  if (b === 0) return "0";
  return Math.round(((b - a) / b) * 100).toString();
}

/* ── Component ─────────────────────────────────────────────────────── */

export function ROICalculator() {
  const [artists, setArtists] = useState(5);
  const [releases, setReleases] = useState(12);
  const [teamSize, setTeamSize] = useState(2);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);

  const results = useMemo(() => {
    const monthlyHuman =
      artists * (HUMAN_COSTS.socialMedia.perArtist +
        HUMAN_COSTS.contentCreation.perArtist +
        HUMAN_COSTS.fanEngagement.perArtist +
        HUMAN_COSTS.analytics.perArtist) +
      (releases / 12) * (HUMAN_COSTS.releaseCampaign.perRelease + HUMAN_COSTS.playlistPitching.perRelease);

    const monthlyAI = artists * AI_COSTS.perArtist;
    const annualSavings = (monthlyHuman - monthlyAI) * 12;
    const hoursRecovered = hoursPerWeek * 0.7 * 52; // AI handles ~70% of marketing ops
    const breakdownHuman = {
      social: artists * HUMAN_COSTS.socialMedia.perArtist,
      content: artists * HUMAN_COSTS.contentCreation.perArtist,
      engagement: artists * HUMAN_COSTS.fanEngagement.perArtist,
      analytics: artists * HUMAN_COSTS.analytics.perArtist,
      releases: (releases / 12) * (HUMAN_COSTS.releaseCampaign.perRelease + HUMAN_COSTS.playlistPitching.perRelease),
    };

    return { monthlyHuman, monthlyAI, annualSavings, hoursRecovered, breakdownHuman };
  }, [artists, releases, hoursPerWeek]);

  return (
    <div className="space-y-12">
      {/* Inputs */}
      <div className="grid gap-8 md:grid-cols-2">
        <InputSlider
          label="Artists in your roster"
          value={artists}
          onChange={setArtists}
          min={1} max={50} step={1}
          display={`${artists} artist${artists > 1 ? "s" : ""}`}
        />
        <InputSlider
          label="Releases per year"
          value={releases}
          onChange={setReleases}
          min={1} max={100} step={1}
          display={`${releases} release${releases > 1 ? "s" : ""}`}
        />
        <InputSlider
          label="Marketing team size"
          value={teamSize}
          onChange={setTeamSize}
          min={0} max={20} step={1}
          display={`${teamSize} ${teamSize === 1 ? "person" : "people"}`}
        />
        <InputSlider
          label="Hours/week on marketing ops"
          value={hoursPerWeek}
          onChange={setHoursPerWeek}
          min={5} max={80} step={5}
          display={`${hoursPerWeek} hrs/week`}
        />
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-[var(--border)] bg-[#080808] p-8 md:p-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-foreground)] mb-6">
          Your estimated savings
        </h3>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <ResultCard
            label="Current monthly cost"
            value={fmt(results.monthlyHuman)}
            sub="human marketing ops"
          />
          <ResultCard
            label="With AI agents"
            value={fmt(results.monthlyAI)}
            sub={`${fmt(results.monthlyAI)}/mo for ${artists} artist${artists > 1 ? "s" : ""}`}
            highlight
          />
          <ResultCard
            label="Annual savings"
            value={fmt(results.annualSavings)}
            sub={`${pct(results.monthlyAI, results.monthlyHuman)}% cost reduction`}
            highlight
          />
        </div>

        {/* Breakdown */}
        <div className="border-t border-[var(--border)] pt-6 mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
            Cost breakdown (monthly, human ops)
          </h4>
          <div className="space-y-2">
            <BreakdownRow label="Social media management" value={results.breakdownHuman.social} total={results.monthlyHuman} />
            <BreakdownRow label="Content creation" value={results.breakdownHuman.content} total={results.monthlyHuman} />
            <BreakdownRow label="Fan engagement" value={results.breakdownHuman.engagement} total={results.monthlyHuman} />
            <BreakdownRow label="Analytics & reporting" value={results.breakdownHuman.analytics} total={results.monthlyHuman} />
            <BreakdownRow label="Release campaigns" value={results.breakdownHuman.releases} total={results.monthlyHuman} />
          </div>
        </div>

        {/* Time savings */}
        <div className="border-t border-[var(--border)] pt-6 mb-8">
          <div className="flex items-baseline gap-3">
            <span
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {Math.round(results.hoursRecovered).toLocaleString()}
            </span>
            <span className="text-sm text-[var(--muted-foreground)]">
              hours/year recovered — reinvest in strategy, relationships, and creative work
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/advisory"
            className="rounded-lg bg-white text-black px-6 py-3 text-sm font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Get a Custom AI Roadmap →
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-center hover:bg-white/5 transition-colors"
          >
            See Pricing
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-[var(--muted-foreground)]/50 text-center max-w-lg mx-auto">
        Estimates based on industry averages for music marketing operations. Human costs reflect
        freelancer/contractor rates for US-based talent. AI costs based on Recoup Pro plan ($99/mo per artist).
        Actual savings vary by operation size and workflow complexity.
      </p>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────────── */

function InputSlider({
  label, value, onChange, min, max, step, display,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; display: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm font-medium">{label}</label>
        <span
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white h-1 bg-[var(--border)] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );
}

function ResultCard({
  label, value, sub, highlight,
}: {
  label: string; value: string; sub: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-5 ${highlight ? "bg-green-500/5 border border-green-500/20" : "bg-white/[0.02] border border-[var(--border)]"}`}>
      <div className="text-xs text-[var(--muted-foreground)] mb-2">{label}</div>
      <div
        className={`text-2xl font-bold mb-1 ${highlight ? "text-green-400" : ""}`}
        style={{ fontFamily: "var(--font-bitmap), monospace" }}
      >
        {value}
      </div>
      <div className="text-[11px] text-[var(--muted-foreground)]">{sub}</div>
    </div>
  );
}

function BreakdownRow({ label, value, total }: { label: string; value: number; total: number }) {
  const pctWidth = total > 0 ? Math.max(2, (value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-[var(--muted-foreground)] w-40 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/[0.03] rounded-full overflow-hidden">
        <div className="h-full bg-white/20 rounded-full" style={{ width: `${pctWidth}%` }} />
      </div>
      <span className="text-xs font-mono w-20 text-right">{fmt(value)}</span>
    </div>
  );
}
