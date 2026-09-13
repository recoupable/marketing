"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { inquiryMessageWithContext } from "@/lib/attribution/inquiryMessageWithContext";
import { prepareInquiryEmail } from "@/lib/inquiry/prepareInquiryEmail";
import { readInquiryReceipt } from "@/lib/inquiry/readInquiryReceipt";
import type { InquirySource } from "@/lib/inquiry/inquirySourceSchema";
import { validateLeadQualification, type LeadQualification } from "@/lib/lead-qualification";
import { site } from "@/lib/site";

export type InquiryStatus = "idle" | "sending" | "sent" | "error" | "email";
export type PreparedEmail = ReturnType<typeof prepareInquiryEmail>;
type Options = { source: InquirySource; plan?: string; connected: boolean; qualified: boolean; websitePath: string; pricingContext?: string };

const qualificationKeys = ["companyType", "role", "companyWebsite", "phone", "budget", "timeline", "tools"] as const;

/** Owns the submission lifecycle and the funnel events tied to it; no visitor details reach analytics. */
export function useInquirySubmit({ source, plan, connected, qualified, websitePath, pricingContext }: Options) {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<InquiryStatus>("idle");
  const [preparedEmail, setPreparedEmail] = useState<PreparedEmail | null>(null);
  const [qualificationError, setQualificationError] = useState<string | null>(null);
  const planProps = plan ? { plan } : {};

  function markStarted() {
    if (startedAt.current) return;
    startedAt.current = Date.now();
    trackEvent("inquiry_started", { source, ...planProps });
  }
  function clearFeedback() {
    setQualificationError(null);
    if (status === "email" || status === "error") {
      setStatus("idle");
      setPreparedEmail(null);
    }
  }
  function reset() {
    startedAt.current = 0;
    setStatus("idle");
    setPreparedEmail(null);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const text = (key: string) => String(fields[key] ?? "");
    let qualification: LeadQualification | undefined;
    if (qualified) {
      try {
        qualification = validateLeadQualification(Object.fromEntries(qualificationKeys.map((key) => [key, text(key)])));
      } catch (error) {
        setQualificationError(error instanceof Error ? error.message : "Please check the company and project details.");
        trackEvent("inquiry_failed", { source, reason: "validation" });
        return;
      }
    }
    // Page context describes the inquiry; it is not an authentication signal.
    // Keep the selected plan outside the editable brief so edits and imported
    // project drafts cannot silently discard the visitor's billing selection.
    const context = inquiryMessageWithContext(text("message"), websitePath, currentReferralAttribution());
    const message = pricingContext ? `${context}\n\nSelected plan: ${pricingContext}` : context;
    const data = { name: text("name"), email: text("email"), company: text("company"), interest: text("interest"), message, ...(qualification ? { qualification } : {}) };
    setPreparedEmail(prepareInquiryEmail(site.email, data));
    if (!connected) {
      setStatus("email");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, website: text("website"), startedAt: startedAt.current || Date.now() - 5000 }),
        signal: AbortSignal.timeout(20000),
      });
      const receipt = await readInquiryReceipt(response);
      if (!receipt) {
        trackEvent("inquiry_failed", { source, reason: "rejected" });
        setStatus("error");
        return;
      }
      trackEvent("inquiry_submitted", {
        source, ...planProps, submission_id: receipt.submissionId,
        ...(qualification ? { budget: qualification.budget, timeline: qualification.timeline, company_type: qualification.companyType } : {}),
      });
      setStatus("sent");
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      trackEvent("inquiry_failed", { source, reason: timedOut ? "timeout" : "network" });
      setStatus("error");
    }
  }
  return { status, preparedEmail, qualificationError, submit, reset, clearFeedback, markStarted };
}
