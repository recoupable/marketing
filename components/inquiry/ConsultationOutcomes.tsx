export function ConsultationOutcomes({ title, outcomes }: { title: string; outcomes: readonly string[] }) {
  return <div className="lead-consultation-outcomes">
    <h2>{title}</h2>
    <ul>
      {outcomes.map(outcome => <li key={outcome}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>{outcome}</span>
      </li>)}
    </ul>
  </div>;
}
