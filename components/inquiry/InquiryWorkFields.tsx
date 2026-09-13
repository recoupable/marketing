import type { inquiryLabels } from "./inquiryLabels";

type InquiryWorkFieldsProps = {
  labels: ReturnType<typeof inquiryLabels>;
  interestOptions: readonly string[];
  interestValue: string;
  onInterestChange: (value: string) => void;
  briefValue: string;
  onBriefChange: (value: string) => void;
  qualified: boolean;
};

export function InquiryWorkFields({ labels, interestOptions, interestValue, onInterestChange, briefValue, onBriefChange, qualified }: InquiryWorkFieldsProps) {
  return <>
    <div className="form-field wide">
      <label htmlFor="interest">{labels.interestLabel}</label>
      <select id="interest" name="interest" required value={interestValue} onChange={(event) => onInterestChange(event.target.value)}>
        <option value="" disabled>{labels.interestPlaceholder}</option>
        {interestOptions.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
      </select>
    </div>
    <div className="form-field wide">
      <label htmlFor="message">{labels.messageLabel}</label>
      <textarea id="message" name="message" required minLength={20} maxLength={5000} value={briefValue} onChange={(event) => onBriefChange(event.target.value)} placeholder={labels.messagePlaceholder} />
    </div>
    {qualified && <div className="form-field wide">
      <label htmlFor="tools">Current tools & providers (optional)</label>
      <textarea id="tools" name="tools" maxLength={1200} rows={3} placeholder="Software, data sources, royalty administrators, or other providers we should work alongside." />
    </div>}
  </>;
}
