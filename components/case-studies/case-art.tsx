import type { CaseStudy } from "@/lib/case-studies";
import { SkyArrow } from "@/components/sky/arrow";
import "./case-motion.css";

function DocumentIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 3H6v18h13V8l-5-5Z" /><path d="M14 3v5h5M9 12h6M9 16h4" /></svg>;
}

export function CaseArt({ kind }: { kind: CaseStudy["visual"] }) {
  return <div className={`cs-art cs-art-${kind}`} aria-hidden="true">
    {kind === "royalty" && <>
      <div className="cs-source-stack"><span><DocumentIcon />Statements</span><span><DocumentIcon />Receipts</span></div>
      <div className="cs-report-paper"><div className="cs-art-paper-top"><span>ROYALTY REVIEW</span><span className="cs-status-dot" /></div><strong>Statement reconciliation</strong><div className="cs-report-line"><span>By payment source</span><span>Checked</span></div><div className="cs-report-line"><span>Timing differences</span><span>Separated</span></div><div className="cs-report-line"><span>Open questions</span><span>For review</span></div></div>
      <div className="cs-art-note"><span>↳</span> Findings linked to source records.</div>
    </>}
    {kind === "investment" && <>
      <div className="cs-invest-inputs"><span>Model</span><span>Emails</span><span>Notes</span></div>
      <div className="cs-memo-paper"><div className="cs-art-paper-top"><span>INVESTMENT MEMO</span><span>Draft</span></div><strong>Investment review draft</strong><div className="cs-memo-rule" /><div className="cs-memo-rule" /><div className="cs-memo-rule cs-memo-rule-short" /><div className="cs-memo-cite"><DocumentIcon /><span>Model + supporting documents</span></div></div>
      <div className="cs-memo-note"><span>Next</span> Analyst review <SkyArrow direction="right" /></div>
    </>}
    {kind === "catalog" && <>
      <div className="cs-catalog-orbit cs-catalog-orbit-one" /><div className="cs-catalog-orbit cs-catalog-orbit-two" />
      <div className="cs-brief-paper"><div className="cs-art-paper-top"><span>CATALOG INTELLIGENCE</span><span className="cs-status-dot" /></div><strong>Catalog monitoring brief</strong><div className="cs-brief-row"><i /><div><b>What changed</b><span>Compare the reporting periods</span></div><SkyArrow direction="right" /></div><div className="cs-brief-row"><i /><div><b>What to check</b><span>Source coverage and freshness</span></div><SkyArrow direction="right" /></div></div>
      <span className="cs-brief-note">Changes, source checks, and review questions.</span>
    </>}
  </div>;
}
