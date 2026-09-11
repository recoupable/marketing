import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { CaseArt } from "./case-art";
import type { CaseStudy } from "@/lib/case-studies";
import "./case-studies.css";
import "./home-case-studies.css";

const projects: { id: string; title: string; audience: string; result: string; story: string; tags: string[]; visual: CaseStudy["visual"]; href: string }[] = [
  { id: "royalty-example", title: "Royalty reporting", audience: "Finance & operations", result: "Correct the export. Run the review again.", story: "We built a reconciliation workbook connecting statements, receipts, and source records. When an export changed, the team reran the report without rebuilding the process.", tags: ["Repeatable reconciliation", "Source-linked findings"], visual: "royalty", href: "/case-studies/royalty-reporting" },
  { id: "acquisition-example", title: "Investment review", audience: "Music investment", result: "The analyst started with a draft.", story: "Models, notes, prior memos, and emails came together in a diligence draft the analyst used for their review.", tags: ["Deal context assembled", "Analyst-led review"], visual: "investment", href: "/case-studies/investment-review" },
  { id: "catalog-intelligence", title: "Catalog intelligence", audience: "Catalog & creative", result: "A prepared brief. A clear review list.", story: "Recurring briefs bring catalog movements, source checks, and follow-up questions into one place for the operator to investigate.", tags: ["Recurring briefs", "Data issues flagged"], visual: "catalog", href: "/case-studies/catalog-intelligence" },
];

export function HomeCaseStudies() {
  return <section className="sky-section sky-projects" id="case-studies" aria-labelledby="sky-projects-title">
    <header className="sky-projects-heading" id="work" data-reveal="">
      <div><p className="sky-section-label">CASE STUDIES</p><h2 id="sky-projects-title">What we’ve built.<br /><span>What changed.</span></h2><p>Working systems for music companies. Here’s what teams could do with them.</p></div>
      <Link className="sky-projects-all" href="/case-studies">All case studies<SkyArrow direction="right" /></Link>
    </header>
    <div className="sky-project-grid" data-reveal-group="">
      {projects.map((project, index) => <article key={project.id} id={project.id} className={`sky-project-card${index === 0 ? " sky-project-featured" : ""}`}>
        <div className="sky-project-visual"><CaseArt kind={project.visual} /></div>
        <div className="sky-project-copy">
          <p className="sky-project-audience">{project.audience}</p><h3>{project.title}</h3>
          <p className="sky-project-result">{project.result}</p>
          <p className="sky-project-story">{project.story}</p>
          <ul className="sky-project-tags" aria-label="Project outcomes">{project.tags.map(tag => <li key={tag}><span aria-hidden="true">✓</span>{tag}</li>)}</ul>
          <Link className="sky-project-link" href={project.href} aria-label={`Read the ${project.title.toLowerCase()} case study`}>Read case study<span><SkyArrow direction="up-right" /></span></Link>
        </div>
      </article>)}
    </div>
    <p className="sky-projects-note">Client details are anonymized. Illustrations show the work, without client data.</p>
  </section>;
}
