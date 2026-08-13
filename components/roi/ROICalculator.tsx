"use client";

import { useState, FormEvent } from "react";
import {
  calculateROI,
  sliders,
  benchmarks,
  roiCopy,
  type ROIInputs,
} from "@/lib/copy/roi";
import { ArrowRight, TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { postCapture } from "@/lib/postCapture";
import { CaptureErrorNotice } from "@/components/lead-capture/CaptureErrorNotice";

/* ── helpers ───────────────────────────────────────────────────────── */

function fmt(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  return "$" + n.toLocaleString("en-US");
}

/* ── component ─────────────────────────────────────────────────────── */

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    rosterSize: 15,
    contentSpend: 5000,
    staffHours: 40,
    agencySpend: 3000,
  });

  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captureError, setCaptureError] = useState("");

  const results = calculateROI(inputs);

  function handleSlider(id: keyof ROIInputs, value: number) {
    setInputs((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // The calculator result is already on screen; persisting the lead is a
    // separate concern and its failure must be surfaced, not discarded
    // (recoupable/chat#1800).
    const captured = await postCapture("/api/subscribe", {
      email: contact.email,
      name: contact.name,
      company: contact.company,
      utm_campaign: "roi-calculator",
      utm_medium: "lead-magnet",
      roi_inputs: inputs,
      roi_results: {
        annualSavings: results.annualSavings,
        monthlySavings: results.monthlySavings,
        hoursSaved: results.hoursSavedPerMonth,
        roi: results.roiPercent,
        recommendedPlan: results.recommendedPlan,
      },
    });

    setCaptureError(captured.ok ? "" : captured.error);
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="space-y-16">
      {/* ── Sliders ── */}
      <div className="grid gap-8 md:grid-cols-2">
        {sliders.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <label
                htmlFor={s.id}
                className="text-sm font-medium text-[var(--foreground)]"
              >
                {s.label}
              </label>
              <span
                className="text-lg font-bold tabular-nums"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {s.format(inputs[s.id])}
              </span>
            </div>
            <input
              id={s.id}
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={inputs[s.id]}
              onChange={(e) => handleSlider(s.id, Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-white/[0.08]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-shadow
                [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_rgba(255,255,255,0.5)]
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-[11px] text-neutral-500">
              <span>{s.format(s.min)}</span>
              <span>{s.format(s.max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Results ── */}
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {roiCopy.resultsTitle}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Annual savings */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-emerald-400 tabular-nums transition-all duration-300"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {fmt(results.annualSavings)}
            </div>
            <p className="text-xs text-neutral-400 mt-1">Saved per year</p>
          </div>

          {/* Monthly savings */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-emerald-400 tabular-nums transition-all duration-300"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {fmt(results.monthlySavings)}
            </div>
            <p className="text-xs text-neutral-400 mt-1">Saved per month</p>
          </div>

          {/* Hours saved */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-blue-400 tabular-nums transition-all duration-300"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {results.hoursSavedPerMonth}
            </div>
            <p className="text-xs text-neutral-400 mt-1">Hours saved / month</p>
          </div>

          {/* ROI */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-amber-400 tabular-nums transition-all duration-300"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {results.roiPercent}%
            </div>
            <p className="text-xs text-neutral-400 mt-1">Return on investment</p>
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-400 border-t border-white/[0.06] pt-6">
          <span>
            Recommended plan:{" "}
            <strong className="text-[var(--foreground)]">
              {results.recommendedPlan === "partner" ? "Partner" : "Pro"} (
              {fmt(results.recoupMonthlyCost)}/mo)
            </strong>
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span>
            Break-even:{" "}
            <strong className="text-[var(--foreground)]">
              {results.breakEvenDays} days
            </strong>
          </span>
        </div>
      </div>

      {/* ── Benchmarks ── */}
      <div>
        <h2
          className="text-xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {roiCopy.benchmarksTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {benchmarks.map((b) => (
            <div
              key={b.company}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {b.type}
                </span>
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">
                {b.company}
              </h3>
              <p
                className="text-emerald-400 font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {b.metric}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {b.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lead Capture ── */}
      {!submitted ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 max-w-lg mx-auto">
          <h2
            className="text-xl font-bold mb-2 text-center"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {roiCopy.formTitle}
          </h2>
          <p className="text-sm text-neutral-400 text-center mb-6">
            {roiCopy.formDescription}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={contact.name}
              onChange={(e) =>
                setContact((c) => ({ ...c, name: e.target.value }))
              }
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-neutral-500 focus:outline-none focus:border-white/[0.25] transition-colors"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={contact.email}
              onChange={(e) =>
                setContact((c) => ({ ...c, email: e.target.value }))
              }
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-neutral-500 focus:outline-none focus:border-white/[0.25] transition-colors"
            />
            <input
              type="text"
              placeholder="Company / label name"
              required
              value={contact.company}
              onChange={(e) =>
                setContact((c) => ({ ...c, company: e.target.value }))
              }
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-neutral-500 focus:outline-none focus:border-white/[0.25] transition-colors"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Get my savings report"}
            </button>
          </form>
        </div>
      ) : captureError ? (
        <div className="max-w-lg mx-auto">
          <CaptureErrorNotice message={captureError} />
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 md:p-10 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            Your numbers are saved
          </h3>
          <p className="text-sm text-neutral-400 mb-6">
            We have your details and will be in touch. In the meantime:
          </p>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Book a demo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="text-center pt-4">
        <p className="text-sm text-neutral-500 mb-4">{roiCopy.ctaDescription}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
          >
            {roiCopy.ctaPrimary} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
          >
            {roiCopy.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
