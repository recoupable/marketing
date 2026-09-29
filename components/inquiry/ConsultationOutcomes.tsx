import type { StartProjectCopy } from "@/lib/inquiry/startProjectCopy";

export function ConsultationOutcomes({ title, outcomes }: { title: string; outcomes: NonNullable<StartProjectCopy["outcomes"]> }) {
  return <div className="lead-consultation-outcomes">
    <h2>{title}</h2>
    <ul>
      {outcomes.map(outcome => <li key={outcome.title}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span><strong>{outcome.title}</strong><span className="lead-capability-description">{outcome.description}</span></span>
      </li>)}
    </ul>
  </div>;
}
