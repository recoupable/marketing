import type { Metadata } from "next";
import { withPageMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/case-studies";
import { PageCTA } from "@/components/sky/page-ui";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import "@/components/case-studies/case-studies.css";

export const metadata: Metadata = withPageMetadata({ title: "Music AI project stories | Recoup", description: "See how Recoup helps music teams prepare royalty reports, draft investment reviews, and make catalog data useful. Anonymized accounts of documented work.", alternates: { canonical: "/case-studies" } });

export default function CaseStudiesPage() {
  return <div className="sky-subpage cs-index">
    <header className="cs-index-heading"><p className="cs-eyebrow">RECOUP AT WORK</p><h1>The work changes.<br /><span>That’s the point.</span></h1><p>Royalty reporting. Investment reviews. Catalog intelligence. See what happens when AI is built around the job your team already does.</p></header>
    <section className="cs-index-grid" aria-label="Project stories" data-reveal-group="">{caseStudies.map((study, index) => <CaseStudyCard key={study.slug} study={study} featured={index === 0} />)}</section>
    <div className="cs-index-note"><span className="cs-note-mark" aria-hidden="true">i</span><p>These stories describe documented work with music teams. Client identities and financial data are kept private; illustrations show the method. Each story explains what was delivered and what has been verified.</p></div>
    <PageCTA title="What’s your team still doing the hard way?" description="Bring us the recurring report, the scattered deal files, or the process that depends on one person. We’ll work out what is worth building." />
  </div>;
}
