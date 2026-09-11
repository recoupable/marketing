import {
  formatRoyaltyExampleDifference,
  formatRoyaltyExampleMoney,
  royaltyExample,
} from "@/lib/sky-royalty-example";
import "./work-previews.css";

function SourceDocument() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3ZM14 3v5h4M9 12h6M9 16h6" /></svg>;
}

export function RoyaltyWorkPreview() {
  const exceptions = royaltyExample.sources.filter(source => source.differenceCents !== 0);

  return <figure className="we-preview we-preview-report" aria-label="Royalty reporting preview">
    <div className="we-report-sheet">
      <div className="we-preview-toolbar"><span><SourceDocument /> June royalty review</span><span>USD</span></div>
      <dl className="we-report-totals">
        <div><dt>Statements</dt><dd>{formatRoyaltyExampleMoney(royaltyExample.statementCents)}</dd></div>
        <div><dt>Cash received</dt><dd>{formatRoyaltyExampleMoney(royaltyExample.receiptCents)}</dd></div>
      </dl>
      <dl className="we-report-sources">
        {exceptions.map(source => <div key={source.id}><dt>{source.name}</dt><dd>{formatRoyaltyExampleDifference(source.differenceCents)}</dd></div>)}
      </dl>
      <p className="we-report-finding"><span aria-hidden="true">!</span><span><strong>{royaltyExample.exceptionCount} sources need review.</strong>The differences cancel out.</span></p>
    </div>
  </figure>;
}

export function DiligenceWorkPreview() {
  // These excerpts and the seller question match SkyInvestmentExample.
  return <figure className="we-preview we-preview-diligence" aria-label="Acquisition review preview">
    <div className="we-review-sheet">
      <div className="we-preview-toolbar"><span><SourceDocument /> Ownership &amp; rights</span><span>Draft</span></div>
      <dl className="we-review-sources">
        <div><dt>Model · assumptions tab</dt><dd>Publisher share: <strong>60%</strong></dd></div>
        <div><dt>Agreement · signature page</dt><dd>Signature: <span>[blank]</span></dd></div>
      </dl>
    </div>
    <div className="we-review-question"><span className="we-question-symbol" aria-hidden="true">?</span><div><strong>Question for the seller</strong><p>Can you provide the signed agreement supporting the modeled share?</p></div></div>
  </figure>;
}
