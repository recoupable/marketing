import { useEffect, useRef, useState } from "react";

type Props = {
  preselected: boolean;
  interestOptions: readonly string[];
  interestValue: string;
  onInterestChange: (value: string) => void;
};

/** Keep a known project choice visible and submitted without asking for it twice. */
export function CompactInquiryInterest({ preselected, interestOptions, interestValue, onInterestChange }: Props) {
  const [editing, setEditing] = useState(false);
  const select = useRef<HTMLSelectElement>(null);
  useEffect(() => { if (editing) select.current?.focus(); }, [editing]);
  const showSummary = preselected && !editing && interestValue === "Custom systems";
  return <div id="project-interest" className={showSummary ? "compact-interest-summary wide" : "form-field wide"}>
    {showSummary ? <>
      <input type="hidden" name="interest" value={interestValue} />
      <span>Custom platform</span>
      <button type="button" aria-label="Change project type" onClick={() => setEditing(true)}>Change</button>
    </> : <>
      <label htmlFor="interest">What can we help with? *</label>
      <select ref={select} id="interest" name="interest" required value={interestValue} onChange={event => onInterestChange(event.target.value)}>
        <option value="" disabled>Choose a starting point</option>
        {interestOptions.map(interest => <option key={interest}>{interest}</option>)}
      </select>
    </>}
  </div>;
}
