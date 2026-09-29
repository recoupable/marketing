import { projectBudgets, projectTimelines } from "@/lib/lead-qualification";

export function InquiryBudgetFields({ note, compact = false }: { note: string; compact?: boolean }) {
  return <>
    {!compact && <div className="lead-group-title wide"><h3><span>03</span> Budget & timing</h3><p>{note}</p></div>}
    <div className={`form-field${compact ? "" : " wide"}`}>
      <label htmlFor="budget">Initial project budget (USD) *</label>
      <select id="budget" name="budget" required defaultValue={compact ? "" : "Not decided yet"}>
        {compact && <option value="" disabled>Choose a budget</option>}
        {projectBudgets.map((budget) => <option key={budget}>{budget}</option>)}
      </select>
    </div>
    <div className={`form-field${compact ? "" : " wide"}`}>
      <label htmlFor="timeline">When would you like to start? *</label>
      <select id="timeline" name="timeline" required defaultValue={compact ? "" : "Just exploring"}>
        {compact && <option value="" disabled>Choose a timeframe</option>}
        {projectTimelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
      </select>
    </div>
  </>;
}
