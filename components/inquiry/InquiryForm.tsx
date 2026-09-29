"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { AgentDraftImport } from "@/components/agents/draft-import";
import type { AgentDraft } from "@/lib/agent-browser";
import { catalogDirections } from "@/lib/catalog-directions";
import { generalInterests, podcastGuestInterest } from "@/lib/inquiry-topics";
import type { InquirySource } from "@/lib/inquiry/inquirySourceSchema";
import { siteConfig } from "@/lib/config";
import { CompactInquiryInterest } from "./CompactInquiryInterest";
import { CompactInquiryFields } from "./CompactInquiryFields";
import { InquiryBudgetFields } from "./InquiryBudgetFields";
import { InquiryCompanyFields } from "./InquiryCompanyFields";
import { InquiryIdentityFields } from "./InquiryIdentityFields";
import { InquiryRecoveryPanel } from "./InquiryRecoveryPanel";
import { InquirySuccessPanel } from "./InquirySuccessPanel";
import { InquiryWorkFields } from "./InquiryWorkFields";
import { inquiryLabels } from "./inquiryLabels";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import "./inquiry-form.css";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export type InquiryFormProps = {
  /** The page hosting the form; stored as the lead's source. */
  source: InquirySource;
  connected: boolean;
  variant?: "acquisitions" | "operations";
  initialInterest?: string;
  initialBrief?: string;
  pricingContext?: string;
  plan?: string;
  qualified?: boolean;
  freeAudit?: boolean;
  compact?: boolean;
  preselectedProject?: boolean;
  readinessHandoff?: boolean;
};

export function InquiryForm({ source, connected, variant, initialInterest, initialBrief, pricingContext, plan, qualified = false, freeAudit = false, compact = false, preselectedProject = false, readinessHandoff = false }: InquiryFormProps) {
  const interestOptions = variant ? catalogDirections[variant].interestOptions : generalInterests;
  const selectedInterest = interestOptions.some((interest) => interest === initialInterest) ? initialInterest ?? "" : "";
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const nameInput = useRef<HTMLInputElement>(null);
  const validationMessage = useRef<HTMLParagraphElement>(null);
  const focusAfterReset = useRef(false);
  const [interestValue, setInterestValue] = useState(selectedInterest);
  // Guest mode follows the interest the visitor currently has selected, not only the one the URL preselected.
  const compactProject = compact && interestValue !== podcastGuestInterest;
  const needsQualification = compact ? compactProject : qualified;
  const labels = inquiryLabels({ variant, qualified: needsQualification, freeAudit, connected, compact: compactProject, buildConsultation: interestValue === "Custom systems", guest: interestValue === podcastGuestInterest });
  const [briefValue, setBriefValue] = useState(initialBrief ?? "");
  const [draftApplied, setDraftApplied] = useState(false);
  const inquiry = useInquirySubmit({ source, plan, connected, qualified: needsQualification, compact: compactProject, websitePath: labels.websitePath, pricingContext });
  const { status, qualificationError } = inquiry;
  useEffect(() => { if (qualificationError) validationMessage.current?.focus(); }, [qualificationError]);
  useEffect(() => {
    if (status === "idle" && focusAfterReset.current) {
      focusAfterReset.current = false;
      nameInput.current?.focus();
    }
  }, [status]);
  function applyDraft(draft: AgentDraft) {
    inquiry.clearFeedback();
    setInterestValue(draft.interest);
    setBriefValue(draft.message);
    setDraftApplied(true);
  }
  if (status === "sent") return <InquirySuccessPanel consultation={compactProject} qualified={qualified} onReset={() => {
    focusAfterReset.current = true;
    inquiry.reset();
    setInterestValue(selectedInterest);
    setBriefValue(initialBrief ?? "");
    setDraftApplied(false);
  }} />;
  const busy = !hydrated || status === "sending";
  return (
    <form className={`inquiry-form${qualified || compact ? " lead-inquiry" : ""}${compactProject ? " compact-inquiry" : ""}`} method="post" action={source} onSubmit={inquiry.submit} onChange={inquiry.clearFeedback} onFocus={inquiry.markStarted}
      aria-label={labels.formLabel} aria-busy={status === "sending"} aria-describedby={connected ? undefined : "inquiry-handoff"}>
      <h2>{labels.heading}</h2>
      {compactProject && <p className="lead-consultation-intro">{labels.formIntro}</p>}
      {!compactProject && (qualified || compact) && <p className="lead-field-help">Fields marked * are required. A rough starting point is enough.</p>}
      <noscript><p className="inquiry-no-script">To send an inquiry, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. The form needs JavaScript to prepare or send your message.</p></noscript>
      <fieldset className="inquiry-fields" disabled={busy}>
        {!variant && (draftApplied ? <div className="agent-draft-import" role="status">
          <strong>{readinessHandoff ? "Your readiness answers are included below." : "Your brief is included below."}</strong>
          <p>Add your contact details. You can edit the included note before sending. Nothing has been sent yet.</p>
        </div> : hydrated && <AgentDraftImport onApply={applyDraft} autoApply={readinessHandoff} />)}
        {!connected && <p className="form-note form-handoff" id="inquiry-handoff">This form prepares an email draft for you to review and send.</p>}
        <div className="form-grid">
          {needsQualification && !compactProject && <div className="lead-group-title wide"><h3><span>01</span> You & your company</h3></div>}
          {compactProject && <CompactInquiryInterest preselected={preselectedProject} interestOptions={interestOptions} interestValue={interestValue} onInterestChange={setInterestValue} />}
          <InquiryIdentityFields nameInput={nameInput} compact={compactProject} />
          {compactProject ? <CompactInquiryFields briefValue={briefValue} onBriefChange={setBriefValue} /> : <>
            {needsQualification && <InquiryCompanyFields />}
            <InquiryWorkFields labels={labels} interestOptions={interestOptions} interestValue={interestValue} onInterestChange={setInterestValue} briefValue={briefValue} onBriefChange={setBriefValue} qualified={needsQualification} />
            {needsQualification && <InquiryBudgetFields note={labels.budgetNote} />}
          </>}
        </div>
        {qualificationError && <p ref={validationMessage} tabIndex={-1} role="alert" className="form-feedback">{qualificationError}</p>}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="button" type="submit" disabled={busy}>{status === "sending" ? "Sending your inquiry…" : labels.submit}<SkyArrow direction={compactProject ? "right" : "up-right"} /></button>
      </fieldset>
      {!compactProject && <p className="form-note">{connected && "We’ll use these details to respond to your inquiry. No mailing list. "}<a href="/privacy">Privacy policy</a></p>}
      {(status === "error" || status === "email") && inquiry.preparedEmail && <InquiryRecoveryPanel status={status} preparedEmail={inquiry.preparedEmail} qualified={qualified} />}
    </form>
  );
}
