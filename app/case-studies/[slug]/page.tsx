import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { withPageMetadata } from "@/lib/seo";
import { PageButton, PageCTA } from "@/components/sky/page-ui";
import { SkyArrow } from "@/components/sky/arrow";
import { CaseArt } from "@/components/case-studies/case-art";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import "@/components/case-studies/case-studies.css";

export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return withPageMetadata({ title: `${study.title} | Recoup`, description: study.summary, alternates: { canonical: `/case-studies/${study.slug}` } });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const related = caseStudies.filter((item) => item.slug !== study.slug);

  return <div className="sky-subpage cs-reader">
    <Link href="/case-studies" className="cs-back"><SkyArrow direction="left" /> All project stories</Link>
    <article>
      <header className="cs-story-header"><div><p className="cs-eyebrow">{study.category}</p><h1>{study.title}</h1><p className="cs-story-deck">{study.summary}</p><p className="cs-story-status">Project story · client anonymized</p><PageButton href="/contact">Talk through a similar project</PageButton></div><CaseArt kind={study.visual} /></header>
      <dl className="cs-facts"><div><dt>Built for</dt><dd>{study.audience}</dd></div><div><dt>The deliverable</dt><dd>{study.deliverable}</dd></div><div><dt>The useful change</dt><dd>{study.change}</dd></div></dl>
      <div className="cs-story-body">
        <section className="cs-story-section" aria-labelledby="cs-problem" data-reveal=""><p className="cs-eyebrow">THE PROBLEM</p><div><h2 id="cs-problem">{study.problem.title}</h2>{study.problem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
        <section className="cs-story-section cs-approach" aria-labelledby="cs-approach"><p className="cs-eyebrow">THE APPROACH</p><div><h2 id="cs-approach">Built around the work.</h2><ol data-reveal-group="">{study.approach.map((step, index) => <li key={step.title}><span className="cs-step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section>
        <section className="cs-story-section cs-outcome" aria-labelledby="cs-outcome" data-reveal=""><p className="cs-eyebrow">WHAT THE WORK DELIVERED</p><div><h2 id="cs-outcome">{study.outcome.title}</h2>{study.outcome.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href={study.nextHref} className="cs-text-link">{study.nextLabel}<SkyArrow direction="right" /></Link></div></section>
        <section className="cs-measure" aria-labelledby="cs-measure" data-reveal=""><div><p className="cs-eyebrow">FOR YOUR OWN PROJECT</p><h2 id="cs-measure">Agree on what better looks like.</h2><p>Choose the measures that matter to your team before work begins. For a similar project, we could track:</p></div><ul>{study.measure.map((measure) => <li key={measure}><SkyArrow />{measure}</li>)}</ul></section>
        <details className="cs-evidence-note"><summary>About this story<span aria-hidden="true">+</span></summary><p>{study.scope}</p></details>
      </div>
    </article>
    <section className="cs-related" aria-labelledby="cs-related-title"><div className="cs-related-heading"><p className="cs-eyebrow">MORE FROM THE WORK</p><h2 id="cs-related-title">Another problem. Another useful build.</h2></div><div className="cs-related-grid" data-reveal-group="">{related.map((item) => <CaseStudyCard key={item.slug} study={item} />)}</div></section>
    <PageCTA title="Bring us your version of the problem." description="We’ll talk through the work, the information it needs, and what a useful first build could look like." />
  </div>;
}
