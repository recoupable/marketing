"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { royaltyExample, formatRoyaltyExampleMoney, formatRoyaltyExampleDifference, type RoyaltyExampleRow } from "@/lib/sky-royalty-example";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-royalty-example.css";

function ReportIcon({ kind = "document" }: { kind?: "document" | "check" | "chart" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "check" ? <path d="m5 12 4 4L19 6" /> : kind === "chart" ? <path d="M5 19V9m7 10V5m7 14v-7" /> : <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8m-8 4h5" /></>}
  </svg>;
}

function SourceRows({ title, rows }: { title: string; rows: readonly RoyaltyExampleRow[] }) {
  return <div className="sky-royalty-source-group">
    <h4>{title}</h4>
    <p className="sky-royalty-filename"><ReportIcon /> {rows[0]?.file}</p>
    <ul>{rows.map((row) => <li key={row.id}><span>{row.description}<small>Row {row.line} · {row.id}</small></span><span>{formatRoyaltyExampleMoney(row.amountCents)}</span></li>)}</ul>
  </div>;
}

export function SkyRoyaltyExample({ featured = false }: { featured?: boolean }) {
  const [selectedId, setSelectedId] = useState<string>(royaltyExample.sources[0].id);
  const sourcePane = useRef<HTMLElement>(null);
  const selected = royaltyExample.sources.find((source) => source.id === selectedId)!;
  const needsReview = selected.differenceCents !== 0;
  const comparisonMax = Math.max(selected.statementCents, selected.receiptCents, 1);

  return (
    <section className={`sky-royalty-section sky-section${featured ? " sky-royalty-featured" : ""}`} id="work" aria-labelledby="sky-royalty-title">
      {featured ? <header className="sky-work-demo-heading"><h3 id="sky-royalty-title">Explore the workflow</h3><p>An interactive illustration of the reporting method.</p></header> : <header className="sky-royalty-heading" data-reveal="">
        <p className="sky-royalty-eyebrow"><span aria-hidden="true" /> What we help build</p>
        <h2 id="sky-royalty-title">Royalty reports.<br /><span>With the answers behind the numbers.</span></h2>
        <p>Bring statements and receipts together, prepare the report,<br className="sky-royalty-desktop-break" /> and see what still needs review.</p>
      </header>}
      <div className="sky-royalty-tray" id="royalty-example">
        <div className="sky-royalty-tray-label"><span><ReportIcon kind="chart" /> Royalty reporting</span><span>Statements <SkyArrow direction="right" /> report <SkyArrow direction="right" /> review</span></div>
        <div className="sky-royalty-workspace">
          <div className="sky-royalty-report">
            <div className="sky-royalty-report-top"><span><ReportIcon kind="chart" /> Royalty review</span><span className="sky-royalty-draft">June <span aria-hidden="true">/</span> USD</span></div>
            <div className="sky-royalty-report-body">
              <div className="sky-royalty-summary" data-reveal="">
                <div className="sky-royalty-total"><span>Total statements</span><strong>{formatRoyaltyExampleMoney(royaltyExample.statementCents)}</strong></div>
                <div className="sky-royalty-cash"><span className="sky-royalty-cash-check"><ReportIcon kind="check" /></span><span>Cash received<strong>{formatRoyaltyExampleMoney(royaltyExample.receiptCents)}</strong></span></div>
              </div>
              <div className="sky-royalty-income-bar" aria-hidden="true">{royaltyExample.sources.map((source) => <span key={source.id} className={`sky-royalty-income-${source.id}`} style={{ flexGrow: source.statementCents }} />)}</div>
              <div className="sky-royalty-source-list" role="group" aria-label="Compare payment sources">
                <div className="sky-royalty-column-labels" aria-hidden="true"><span>Payment source</span><span>Difference</span><span /></div>
                {royaltyExample.sources.map((source, index) => (
                  <button className="sky-royalty-source-button" type="button" key={source.id} onClick={() => setSelectedId(source.id)} aria-pressed={selectedId === source.id} aria-controls="sky-royalty-source-pane" aria-label={`Inspect ${source.name}: ${source.differenceCents === 0 ? "totals match" : `${formatRoyaltyExampleDifference(source.differenceCents)} difference`}`}>
                    <span className="sky-royalty-source-name"><span className={`sky-royalty-source-symbol sky-royalty-income-${source.id}`} aria-hidden="true">0{index + 1}</span><span>{source.name}<small>{source.type}</small></span></span>
                    <span className={`sky-royalty-difference${source.differenceCents === 0 ? " sky-royalty-matched" : ""}`}>{source.differenceCents === 0 ? <><ReportIcon kind="check" /> Matches</> : formatRoyaltyExampleDifference(source.differenceCents)}</span>
                    <span className="sky-royalty-row-arrow" aria-hidden="true"><SkyArrow direction="right" /></span>
                  </button>
                ))}
              </div>
              <p className="sky-royalty-report-hint"><span aria-hidden="true" /> Select a source to follow the money.</p>
              <a className="sky-royalty-view-details" href="#sky-royalty-source-pane" onClick={() => sourcePane.current?.focus({ preventScroll: true })}>
                <span>View {selected.name} details</span><SkyArrow direction="down" />
              </a>
            </div>
            <div className="sky-royalty-report-files"><span><ReportIcon /> Statements</span><span><ReportIcon /> Receipts</span><span>3 sources</span></div>
          </div>
          <div className="sky-royalty-inspection">
            <div className="sky-royalty-finding" data-reveal=""><strong>{String(royaltyExample.exceptionCount).padStart(2, "0")}</strong><div><h3>The total matches.<br />Two sources don’t.</h3><p>The differences cancel out. Both need review.</p></div><span className="sky-royalty-finding-symbol" aria-hidden="true">!</span></div>
            <aside ref={sourcePane} className="sky-royalty-source-pane" id="sky-royalty-source-pane" tabIndex={-1} aria-live="polite" aria-atomic="true" aria-labelledby="sky-royalty-source-title">
              <div className="sky-royalty-pane-top"><span>Follow the difference</span><span className={`sky-royalty-status${needsReview ? "" : " sky-royalty-status-match"}`}><span />{needsReview ? "Needs review" : "Totals match"}</span></div>
              <h3 id="sky-royalty-source-title">{selected.name}</h3>
              <div className="sky-royalty-comparison">
                <div><span>Statement total<strong>{formatRoyaltyExampleMoney(selected.statementCents)}</strong></span><div className="sky-royalty-comparison-track"><span style={{ width: `${selected.statementCents / comparisonMax * 100}%` }} /></div></div>
                <div><span>Cash received<strong>{formatRoyaltyExampleMoney(selected.receiptCents)}</strong></span><div className="sky-royalty-comparison-track sky-royalty-comparison-cash"><span style={{ width: `${selected.receiptCents / comparisonMax * 100}%` }} /></div></div>
              </div>
              <div className="sky-royalty-next-question"><span className="sky-royalty-question-label">{needsReview ? `${formatRoyaltyExampleDifference(selected.differenceCents)} difference` : "No difference"}<ReportIcon kind={needsReview ? "document" : "check"} /></span><p>{selected.question}</p></div>
              <details className="sky-royalty-evidence" key={selected.id}>
                <summary>Trace to source records <SkyArrow direction="down" /></summary>
                <div><SourceRows title="Statement records" rows={selected.statementRows} /><SourceRows title="Receipt records" rows={selected.receiptRows} /></div>
              </details>
            </aside>
          </div>
        </div>
      </div>
      {!featured && <div className="sky-royalty-section-footer"><p>Bring us your reporting workflow.</p><Link href="/start-project?workflow=Custom%20systems&project=royalty-reporting" className="sky-royalty-contact">Get a Free Audit <span><SkyArrow /></span></Link></div>}
    </section>
  );
}
