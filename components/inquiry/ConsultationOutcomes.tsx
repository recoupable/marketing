import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { homeCaseStudiesCopy } from "@/lib/copy/home-case-studies";

/** Use the published case-study summary rather than inventing a proof claim. */
export function ConsultationOutcomes({ title, outcomes }: { title: string; outcomes: readonly string[] }) {
  const example = homeCaseStudiesCopy.projects.find(project => project.id === "royalty-example");
  return <div className="lead-consultation-outcomes">
    <h2>{title}</h2>
    <ul>
      {outcomes.map(outcome => <li key={outcome}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>{outcome}</span>
      </li>)}
    </ul>
    {example && <aside className="lead-consultation-proof" aria-label="Example of our work">
      <p className="lead-proof-label">From our work · Anonymized case study</p>
      <h3>{example.title}</h3>
      <p>{example.story}</p>
      <Link href={example.href}>See what we built <SkyArrow direction="right" /></Link>
    </aside>}
  </div>;
}
