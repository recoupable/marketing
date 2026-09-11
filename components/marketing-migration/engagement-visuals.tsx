import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import {
  formatRoyaltyExampleDifference,
  formatRoyaltyExampleMoney,
  royaltyExample,
} from "@/lib/sky-royalty-example";
import "./engagement.css";

function DocumentMark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3h9l5 5v13H5V3ZM14 3v6h5M9 13h6M9 17h6" /></svg>;
}

export function AdvisoryRoadmap() {
  return (
    <figure className="eg-roadmap">
      <figcaption className="eg-roadmap-heading">
        <span className="eg-label">YOUR AI ROADMAP</span>
        <strong>What comes first.</strong>
        <p>A clear priority. The dependencies. A way to measure it.</p>
      </figcaption>
      <ol className="eg-roadmap-items">
        <li>
          <span className="eg-roadmap-number">01</span>
          <div><span className="eg-label">FIRST PROJECT</span><strong>Royalty reconciliation</strong><p>Match statements to receipts. Keep differences visible.</p></div>
        </li>
        <li>
          <span className="eg-roadmap-number">02</span>
          <div><span className="eg-label">BEFORE WE BUILD</span><strong>Get the right records.</strong><p>Agree on file access, catalog identifiers, and who reviews the results.</p></div>
        </li>
        <li>
          <span className="eg-roadmap-number">03</span>
          <div><span className="eg-label">MEASURE THE CHANGE</span><strong>Preparation time. Review quality.</strong><p>Set a baseline with the team before the first build.</p></div>
        </li>
      </ol>
      <p className="eg-roadmap-footnote">Your roadmap starts with your team’s priorities.</p>
    </figure>
  );
}

export function BuildReview() {
  const source = royaltyExample.sources[0];

  return (
    <figure className="eg-build-review">
      <figcaption className="eg-label">FROM YOUR FILES TO A REVIEWABLE REPORT</figcaption>
      <div className="eg-build-inputs">
        <div><span><DocumentMark /></span><div><strong>Statements</strong><small>{source.statementRows[0].file}</small></div></div>
        <div><span><DocumentMark /></span><div><strong>Cash receipts</strong><small>{source.receiptRows[0].file}</small></div></div>
      </div>
      <div className="eg-build-connection" aria-hidden="true"><i /><SkyArrow direction="down" /></div>
      <div className="eg-build-report">
        <div className="eg-build-report-heading"><span>Royalty review</span><span>Needs review</span></div>
        <strong className="eg-build-source">{source.name}</strong>
        <dl className="eg-build-amounts">
          <div><dt>Statements</dt><dd>{formatRoyaltyExampleMoney(source.statementCents)}</dd></div>
          <div><dt>Cash received</dt><dd>{formatRoyaltyExampleMoney(source.receiptCents)}</dd></div>
        </dl>
        <div className="eg-build-finding"><span aria-hidden="true">!</span><div><strong>{formatRoyaltyExampleDifference(source.differenceCents)} to review</strong><p>Trace the difference to Catalog B.</p></div></div>
        <Link href="/operations#royalty-example" className="eg-build-example-link">Inspect the full report <SkyArrow /></Link>
      </div>
    </figure>
  );
}
