import { useEffect, useRef } from "react";
import { InquiryBudgetFields } from "./InquiryBudgetFields";

type Props = {
  briefValue: string;
  onBriefChange: (value: string) => void;
};

/** Collect enough to start a conversation; a detailed brief can follow by email. */
export function CompactInquiryFields({ briefValue, onBriefChange }: Props) {
  const extraFields = useRef<HTMLDetailsElement>(null);
  const hasBrief = Boolean(briefValue);
  useEffect(() => {
    if (hasBrief && extraFields.current) extraFields.current.open = true;
  }, [hasBrief]);
  return <>
    <div className="form-field wide">
      <label htmlFor="tools">Current tools (optional)</label>
      <input id="tools" name="tools" maxLength={1200} placeholder="e.g. Excel, Google Drive, DISCO — or none yet" />
    </div>
    <InquiryBudgetFields compact note="" />
    <details className="compact-inquiry-extra wide" ref={extraFields}>
      <summary>Add a note or company (optional)</summary>
      <div className="form-field">
        <label htmlFor="company">Company (optional)</label>
        <input id="company" name="company" autoComplete="organization" maxLength={160} placeholder="Company or artist name" />
      </div>
      <div className="form-field">
        <label htmlFor="message">Anything else? (optional)</label>
        <textarea id="message" name="message" rows={2} maxLength={5000} value={briefValue} onChange={event => onBriefChange(event.target.value)} placeholder="A short note or question, if you have one." />
      </div>
    </details>
  </>;
}
