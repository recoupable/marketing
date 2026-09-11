"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { PageMark } from "@/components/sky/brand";
import { catalogDirections } from "@/lib/catalog-directions";
import { generalInterests } from "@/lib/inquiry-topics";
import { site } from "@/lib/site";
import { currentReferralAttribution, inquiryMessageWithContext } from "@/lib/referral-attribution";
import { AgentDraftImport } from "@/components/agents/draft-import";
import { copyInquiryText, hasInquiryReceipt, prepareInquiryEmail } from "@/lib/inquiry-client";
import { companyTypes, projectBudgets, projectTimelines, validateLeadQualification, type LeadQualification } from "@/lib/lead-qualification";
import "./inquiry-form.css";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function InquiryForm({
  connected,
  variant,
  initialInterest,
  initialBrief,
  pricingContext,
  qualified = false,
  freeAudit = false,
}: {
  connected: boolean;
  variant?: "acquisitions" | "operations";
  initialInterest?: string;
  initialBrief?: string;
  pricingContext?: string;
  qualified?: boolean;
  freeAudit?: boolean;
}) {
  const direction = variant ? catalogDirections[variant] : undefined;
  const interestOptions = direction?.interestOptions ?? generalInterests;
  const selectedInterest = interestOptions.some(
    (interest) => interest === initialInterest,
  )
    ? initialInterest
    : "";
  const websitePath = freeAudit ? "Free AI audit /start-project" : qualified ? "Project brief /start-project" :
    variant === "acquisitions"
      ? "Acquisition readiness"
      : variant === "operations"
        ? "Catalog operations"
        : "AI transformation";
  const startedAt = useRef(0);
  const nameInput = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const preparedText = useRef<HTMLTextAreaElement>(null);
  const recoveryHeading = useRef<HTMLParagraphElement>(null);
  const validationMessage = useRef<HTMLParagraphElement>(null);
  const focusAfterReset = useRef(false);
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "email"
  >("idle");
  const [preparedEmail, setPreparedEmail] = useState<ReturnType<typeof prepareInquiryEmail> | null>(null);
  const [copyStatus, setCopyStatus] = useState<"copied" | "manual" | null>(null);
  const [interestValue, setInterestValue] = useState(selectedInterest ?? "");
  const [briefValue, setBriefValue] = useState(initialBrief ?? "");
  const [qualificationError, setQualificationError] = useState<string | null>(null);
  useEffect(() => { if (qualificationError) validationMessage.current?.focus(); }, [qualificationError]);
  useEffect(() => {
    if (status === "sent") {
      successHeading.current?.focus();
    } else if (qualified && (status === "email" || status === "error")) {
      recoveryHeading.current?.focus();
    } else if (status === "idle" && focusAfterReset.current) {
      focusAfterReset.current = false;
      nameInput.current?.focus();
    }
  }, [status, qualified]);
  function clearFeedbackOnEdit() {
    setQualificationError(null);
    if (status === "email" || status === "error") {
      setStatus("idle");
      setPreparedEmail(null);
      setCopyStatus(null);
    }
  }
  async function copyInquiry() {
    if (!preparedEmail) return;
    const clipboard = navigator.clipboard;
    const result = await copyInquiryText(preparedEmail.text, clipboard?.writeText.bind(clipboard));
    setCopyStatus(result);
    if (result === "manual") {
      preparedText.current?.focus();
      preparedText.current?.select();
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || status === "sending") return;
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(form.entries());
    let qualification: LeadQualification | undefined;
    try { if (qualified) qualification = validateLeadQualification({
      companyType: String(fields.companyType ?? ""),
      role: String(fields.role ?? ""),
      companyWebsite: String(fields.companyWebsite ?? ""),
      phone: String(fields.phone ?? ""),
      budget: String(fields.budget ?? ""),
      timeline: String(fields.timeline ?? ""),
      tools: String(fields.tools ?? ""),
    }); } catch (error) {
      setQualificationError(error instanceof Error ? error.message : "Please check the company and project details.");
      return;
    }
    // Page context describes the inquiry; it is not an authentication signal.
    // Keep the selected plan outside the editable brief so edits and imported
    // project drafts cannot silently discard the visitor's billing selection.
    const message = inquiryMessageWithContext(String(fields.message ?? ""), websitePath, currentReferralAttribution());
    const data = {
      name: fields.name, email: fields.email, company: fields.company,
      interest: fields.interest, website: fields.website,
      message: pricingContext ? `${message}\n\nSelected plan: ${pricingContext}` : message,
      ...(qualification ? { qualification } : {}),
    };
    const prepared = prepareInquiryEmail(site.email, {
      name: String(data.name), email: String(data.email), company: String(data.company),
      interest: String(data.interest), message: String(data.message),
      ...(qualification ? { qualification } : {}),
    });
    setPreparedEmail(prepared);
    setCopyStatus(null);
    if (!connected) {
      setStatus("email");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          startedAt: startedAt.current || Date.now() - 5000,
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!(await hasInquiryReceipt(response))) throw new Error("Unable to confirm inquiry delivery");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent")
    return (
      <div className={`inquiry-form form-success${qualified ? " lead-inquiry" : ""}`} role="status">
        <span className="inquiry-success-mark"><PageMark /></span>
        <h3 ref={successHeading} tabIndex={-1}>
          Thanks. We’ll be in touch.
        </h3>
        <p>Your inquiry is with Recoup. We’ll follow up by email.</p>
        <button
          className="button"
          onClick={() => {
            focusAfterReset.current = true;
            setStatus("idle");
            startedAt.current = 0;
            setInterestValue(selectedInterest ?? "");
            setBriefValue(initialBrief ?? "");
            setPreparedEmail(null);
            setCopyStatus(null);
          }}
        >
          Start another inquiry <SkyArrow />
        </button>
      </div>
    );
  return (
    <form
      className={`inquiry-form${qualified ? " lead-inquiry" : ""}`}
      method="post"
      action={qualified ? "/start-project" : "/contact"}
      onSubmit={submit}
      onChange={clearFeedbackOnEdit}
      onFocus={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      aria-label={freeAudit ? "Free AI audit request" : "Project inquiry"}
      aria-busy={status === "sending"}
      aria-describedby={connected ? undefined : "inquiry-handoff"}
    >
      <h2>{freeAudit ? "Tell us what’s slowing you down." : qualified ? "Your project brief" : variant ? "Your details" : "Tell us about your company"}</h2>
      {qualified && <p className="lead-field-help">Fields marked * are required. A rough starting point is enough.</p>}
      <noscript><p className="inquiry-no-script">To send an inquiry, email <a href={`mailto:${site.email}`}>{site.email}</a>. The form needs JavaScript to prepare or send your message.</p></noscript>
      <fieldset className="inquiry-fields" disabled={!hydrated || status === "sending"}>
      {!variant && <AgentDraftImport onApply={draft => { clearFeedbackOnEdit(); setInterestValue(draft.interest); setBriefValue(draft.message); }} />}
      {!connected && (
        <p className="form-note form-handoff" id="inquiry-handoff">
          This form prepares an email draft for you to review and send.
        </p>
      )}
      <div className="form-grid">
        {qualified && <div className="lead-group-title wide"><h3><span>01</span> You & your company</h3></div>}
        <div className="form-field">
          <label htmlFor="name">Your name *</label>
          <input
            ref={nameInput}
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Full name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Work email *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </div>
        <div className="form-field wide">
          <label htmlFor="company">Company *</label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={160}
            placeholder="Your company or fund"
          />
        </div>
        {qualified && <>
          <div className="form-field wide">
            <label htmlFor="companyType">Company type *</label>
            <select id="companyType" name="companyType" required defaultValue="">
              <option value="" disabled>Choose a company type</option>
              {companyTypes.map(type => <option key={type}>{type}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="role">Your role (optional)</label>
            <input id="role" name="role" autoComplete="organization-title" maxLength={120} placeholder="e.g. Head of operations" />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" />
          </div>
          <div className="form-field wide">
            <label htmlFor="companyWebsite">Company website (optional)</label>
            <input id="companyWebsite" name="companyWebsite" type="text" inputMode="url" autoComplete="url" maxLength={2048} placeholder="yourcompany.com" />
          </div>
          <div className="lead-group-title wide"><h3><span>02</span> The work</h3></div>
        </>}
        <div className="form-field wide">
          <label htmlFor="interest">
            {variant ? "Workflow *" : "What can we help with? *"}
          </label>
          <select
            id="interest"
            name="interest"
            required
            value={interestValue}
            onChange={event => setInterestValue(event.target.value)}
          >
            <option value="" disabled>
              {variant ? "Choose a workflow" : "Select a starting point"}
            </option>
            {interestOptions.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field wide">
          <label htmlFor="message">
            {variant ? "What would you like to improve? *" : "Tell us about the work *"}
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={20}
            maxLength={5000}
            value={briefValue}
            onChange={event => setBriefValue(event.target.value)}
            placeholder={
              qualified ? "What happens today, how often does it repeat, and what would a better result look like?" : variant === "acquisitions"
                ? "Where does deal preparation slow down? Which files or tools are involved?"
                : variant === "operations"
                  ? "What repeats every reporting cycle? Which files or tools are involved?"
                  : "What would you like AI to help your company do?"
            }
          />
        </div>
        {qualified && <>
          <div className="form-field wide">
            <label htmlFor="tools">Current tools & providers (optional)</label>
            <textarea id="tools" name="tools" maxLength={1200} rows={3} placeholder="Software, data sources, royalty administrators, or other providers we should work alongside." />
          </div>
          <div className="lead-group-title wide"><h3><span>03</span> Budget & timing</h3><p>{freeAudit ? "For a possible build after the free audit. Choose “Not decided yet” if you’re exploring." : "A rough range is fine. We’ll agree on scope and price before work begins."}</p></div>
          <div className="form-field wide">
            <label htmlFor="budget">Initial project budget (USD) *</label>
            <select id="budget" name="budget" required defaultValue="Not decided yet">
              {projectBudgets.map(budget => <option key={budget}>{budget}</option>)}
            </select>
          </div>
          <div className="form-field wide">
            <label htmlFor="timeline">When would you like to start? *</label>
            <select id="timeline" name="timeline" required defaultValue="Just exploring">
              {projectTimelines.map(timeline => <option key={timeline}>{timeline}</option>)}
            </select>
          </div>
        </>}
      </div>
      {qualificationError && <p ref={validationMessage} tabIndex={-1} role="alert" className="form-feedback">{qualificationError}</p>}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button" type="submit" disabled={!hydrated || status === "sending"}>
        {status === "sending"
          ? "Sending your inquiry…"
          : connected
            ? freeAudit ? "Request my free audit" : qualified ? "Send your project brief" : "Send your inquiry"
            : freeAudit ? "Prepare audit request" : "Prepare email brief"}
        <SkyArrow />
      </button>
      </fieldset>
      <p className="form-note">
        {connected &&
          "We’ll use these details to respond to your inquiry. No mailing list. "}
        <a href="/privacy">Privacy policy</a>
      </p>
      {(status === "error" || status === "email") && preparedEmail && (
        <div className="inquiry-recovery">
          <p ref={recoveryHeading} tabIndex={-1} role={status === "error" ? "alert" : "status"}>
            {status === "error"
              ? "We couldn’t confirm delivery. Your details are still here. Try again, or send the prepared inquiry by email."
              : "Your email draft is ready. Nothing has been sent yet. Open it in your email app, or copy the inquiry into a new message."}
          </p>
          <div className="inquiry-recovery-actions">
            <a href={preparedEmail.href}>Open email draft <SkyArrow /></a>
            <button type="button" onClick={copyInquiry}>{copyStatus === "copied" ? "Copied" : "Copy inquiry"}</button>
          </div>
          <label htmlFor="prepared-inquiry">Prepared inquiry</label>
          <textarea id="prepared-inquiry" ref={preparedText} readOnly value={preparedEmail.text} rows={9} />
          <p className="inquiry-copy-status" role="status">{copyStatus === "copied"
            ? "Inquiry copied. Paste it into your email app to send."
            : copyStatus === "manual" ? "Copy wasn’t available. The inquiry is selected. Use your device’s copy command." : "You can also select and copy the text above."}</p>
        </div>
      )}
    </form>
  );
}
