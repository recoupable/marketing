import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { CaseArt } from "./case-art";
import { homeCaseStudiesCopy } from "@/lib/copy/home-case-studies";
import "./case-studies.css";
import "./home-case-studies.css";

export function HomeCaseStudies() {
  return <section className="sky-section sky-projects" id="case-studies" aria-labelledby="sky-projects-title">
    <header className="sky-projects-heading" id="work" data-reveal="">
      <div><p className="sky-section-label">{homeCaseStudiesCopy.eyebrow}</p><h2 id="sky-projects-title">{homeCaseStudiesCopy.title}</h2></div>
      <Link className="sky-projects-all" href="/case-studies">{homeCaseStudiesCopy.allLabel}<SkyArrow direction="right" /></Link>
    </header>
    <div className="sky-project-grid" data-reveal-group="">
      {homeCaseStudiesCopy.projects.map((project, index) => <article key={project.id} id={project.id} className={`sky-project-card${index === 0 ? " sky-project-featured" : ""}`}>
        <div className="sky-project-copy">
          <p className="sky-project-audience">{project.audience}</p>
          <h3>{project.title}</h3>
          <p className="sky-project-story">{project.story}</p>
        </div>
        <div className="sky-project-visual"><CaseArt kind={project.visual} /></div>
        <div className="sky-project-footer">
          <Link className="sky-project-link" href={project.href} aria-label={`${homeCaseStudiesCopy.readLabel}: ${project.title}`}>{homeCaseStudiesCopy.readLabel}<span><SkyArrow direction="up-right" /></span></Link>
        </div>
      </article>)}
    </div>
    <p className="sky-projects-note">{homeCaseStudiesCopy.disclosure}</p>
  </section>;
}
