import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseArt } from "./case-art";
import "./case-studies.css";

export function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return <Link className={`cs-card${featured ? " cs-card-featured" : ""}`} href={`/case-studies/${study.slug}`}>
    <CaseArt kind={study.visual} />
    <div className="cs-card-copy"><p className="cs-eyebrow">{study.category}</p><h3>{study.title}</h3><p className="cs-card-description">{study.summary}</p><div className="cs-card-footer"><span>Project story · client anonymized</span><span className="cs-card-arrow"><SkyArrow /></span></div></div>
  </Link>;
}
