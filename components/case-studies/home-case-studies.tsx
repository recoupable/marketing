import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { CaseArt } from "./case-art";
import type { CaseStudy } from "@/lib/case-studies";
import "./case-studies.css";
import "./home-case-studies.css";

const projects: { id: string; title: string; audience: string; story: string; tags: string[]; visual: CaseStudy["visual"]; href: string }[] = [
  { id: "royalty-example", title: "Royalty reporting", audience: "Finance & operations", story: "A workbook that reconciles royalty statements with receipts. The team can rerun the review when an export changes.", tags: ["Repeatable reconciliation", "Source-linked findings"], visual: "royalty", href: "/case-studies/royalty-reporting" },
  { id: "acquisition-example", title: "Investment review", audience: "Music investment", story: "A diligence workspace that brings models, notes, and emails into a draft for the investment analyst to review.", tags: ["Deal context assembled", "Analyst-led review"], visual: "investment", href: "/case-studies/investment-review" },
  { id: "catalog-intelligence", title: "Catalog intelligence", audience: "Catalog & creative", story: "Recurring catalog briefs showing changes between reporting periods, data issues, and questions for the team to investigate.", tags: ["Recurring briefs", "Data issues flagged"], visual: "catalog", href: "/case-studies/catalog-intelligence" },
];

export function HomeCaseStudies() {
  return <section className="sky-section sky-projects" id="case-studies" aria-labelledby="sky-projects-title">
    <header className="sky-projects-heading" id="work" data-reveal="">
      <div><p className="sky-section-label">CASE STUDIES</p><h2 id="sky-projects-title">What we’ve built.</h2><p>Case studies from our work with music companies: royalty reporting, investment review, and catalog research.</p></div>
      <Link className="sky-projects-all" href="/case-studies">All case studies<SkyArrow direction="right" /></Link>
    </header>
    <div className="sky-project-grid" data-reveal-group="">
      {projects.map((project, index) => <article key={project.id} id={project.id} className={`sky-project-card${index === 0 ? " sky-project-featured" : ""}`}>
        <div className="sky-project-copy">
          <p className="sky-project-audience">Case study 0{index + 1} / {project.audience}</p>
          <h3>{project.title}</h3>
          <p className="sky-project-story">{project.story}</p>
        </div>
        <div className="sky-project-visual"><CaseArt kind={project.visual} /></div>
        <div className="sky-project-footer">
          <ul className="sky-project-tags" aria-label="Project outcomes">{project.tags.map(tag => <li key={tag}><span aria-hidden="true">✓</span>{tag}</li>)}</ul>
          <Link className="sky-project-link" href={project.href} aria-label={`Read the ${project.title.toLowerCase()} case study`}>Read case study<span><SkyArrow direction="up-right" /></span></Link>
        </div>
      </article>)}
    </div>
    <p className="sky-projects-note">Client details are anonymized. Illustrations show the work, without client data.</p>
  </section>;
}
