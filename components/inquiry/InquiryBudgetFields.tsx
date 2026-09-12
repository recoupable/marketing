import { projectBudgets, projectTimelines } from "@/lib/lead-qualification";

export function InquiryBudgetFields({ note }: { note: string }) {
  return <>
    <div className="lead-group-title wide"><h3><span>03</span> Budget & timing</h3><p>{note}</p></div>
    <div className="form-field wide">
      <label htmlFor="budget">Initial project budget (USD) *</label>
      <select id="budget" name="budget" required defaultValue="Not decided yet">
        {projectBudgets.map((budget) => <option key={budget}>{budget}</option>)}
      </select>
    </div>
    <div className="form-field wide">
      <label htmlFor="timeline">When would you like to start? *</label>
      <select id="timeline" name="timeline" required defaultValue="Just exploring">
        {projectTimelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
      </select>
    </div>
  </>;
}
