"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/track";

/**
 * Qualified contact form (W-13 / W-14) — replaces the mailto: CTA on
 * /consulting, /partners, /trust. Posts to /api/contact (Attio). Includes the
 * disqualifier line (W-14: "ready to transform, not experiment"). Keeps a
 * mailto: fallback link visible so nobody is ever blocked.
 *
 * `source` tags which page submitted it; `defaultOrgType` pre-selects the
 * segment when a page is segment-specific (e.g. partners → distributor).
 */
const ORG_TYPES = [
  { value: "label", label: "Label" },
  { value: "catalog", label: "Catalog / rights owner" },
  { value: "distributor", label: "Distributor / platform" },
  { value: "management", label: "Management company" },
  { value: "other", label: "Other" },
] as const;

const PROJECT_SIZES = [
  { value: "one-session", label: "One strategy session" },
  { value: "sprint", label: "Implementation sprint" },
  { value: "ongoing", label: "Ongoing / retainer" },
  { value: "partnership", label: "Embed / partnership" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export function ContactForm({
  source = "contact",
  showDisqualifier = true,
}: {
  source?: string;
  showDisqualifier?: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    orgType: "",
    projectSize: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          orgType: form.orgType || undefined,
          projectSize: form.projectSize || undefined,
          company: form.company || undefined,
          message: form.message || undefined,
          source,
          utm_source: "website",
          utm_medium: "contact-form",
          utm_campaign: `contact-${source}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      track("Contact Form Submitted", { source });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div
        data-testid="contact-success"
        className="rounded-2xl bg-(--background) p-8 text-center"
        style={{ boxShadow: "0 0 0 1px var(--border)" }}
      >
        <p className="font-ui font-bold text-[18px] mb-2">Thanks — we&apos;ll be in touch.</p>
        <p className="text-[14px] text-(--foreground)/55">
          We read every message and reply personally, usually within a day.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg bg-(--background) px-4 py-2.5 text-[14px] text-(--foreground) placeholder:text-(--foreground)/35 focus:outline-none focus:ring-2 focus:ring-(--foreground)/20";
  const inputShadow = { boxShadow: "0 0 0 1px var(--border)" };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
      {showDisqualifier ? (
        <p className="text-[13px] text-(--foreground)/55 leading-relaxed">
          We work with teams ready to transform, not experiment. If that&apos;s you,
          tell us what you&apos;re working on — no pitch deck required.
        </p>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
            style={inputShadow}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
            Work email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            style={inputShadow}
            placeholder="you@label.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
          Company
        </label>
        <input
          id="cf-company"
          type="text"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className={inputCls}
          style={inputShadow}
          placeholder="Label, catalog, or platform"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-org" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
            What do you run?
          </label>
          <select
            id="cf-org"
            value={form.orgType}
            onChange={(e) => update("orgType", e.target.value)}
            className={inputCls}
            style={inputShadow}
          >
            <option value="">Select one…</option>
            {ORG_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-size" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
            What are you after?
          </label>
          <select
            id="cf-size"
            value={form.projectSize}
            onChange={(e) => update("projectSize", e.target.value)}
            className={inputCls}
            style={inputShadow}
          >
            <option value="">Select one…</option>
            {PROJECT_SIZES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-msg" className="block font-ui text-[12px] font-semibold text-(--foreground)/55 mb-1.5">
          What are you working on?
        </label>
        <textarea
          id="cf-msg"
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputCls}
          style={inputShadow}
          placeholder="A sentence or two on your roster, catalog, or the workflow you want to fix."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-8 py-3.5 rounded-full text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Talk to us"}
      </button>

      {status === "error" ? (
        <p className="text-red-500 text-[12px]">
          {errorMsg}{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
            Or email us directly.
          </a>
        </p>
      ) : (
        <p className="text-[12px] text-(--foreground)/40">
          Prefer email?{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:text-(--foreground)/70">
            {siteConfig.contactEmail}
          </a>
        </p>
      )}
    </form>
  );
}
