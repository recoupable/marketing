import type { Metadata } from "next";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import { SkyArrow } from "@/components/sky/arrow";
import { StrategyPlanner } from "@/components/ai-strategy/StrategyPlanner";
import "./strategy.css";

export const metadata: Metadata = withPageMetadata({
  title: copy.title,
  description: copy.description,
  alternates: { canonical: "/ai-strategy" },
});

export default function AIStrategyPage() {
  return (
    <div className="sky-subpage strategy-page">
      <div className="strategy-workspace">
        <header className="strategy-intro">
          <p className="strategy-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.heading}</h1>
          <p className="strategy-description">{copy.introduction}</p>
          <p className="strategy-offer-note">{copy.offerNote}</p>
        </header>
        <StrategyPlanner />
        <aside className="strategy-example" aria-label={copy.exampleLabel}>
          <p className="strategy-eyebrow">{copy.exampleLabel}</p>
          <div className="strategy-example-sheet">
            <div className="strategy-example-heading">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M8 12h8M8 16h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2>{copy.exampleTitle}</h2>
            </div>
            <dl>
              {copy.exampleRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="strategy-example-caption">{copy.exampleCaption}</p>
        </aside>
      </div>
      <section className="strategy-worksheet">
        <div>
          <h2>{copy.worksheetTitle}</h2>
          <p>{copy.worksheetBody}</p>
        </div>
        <a href="/downloads/recoup-team-workflow-worksheet.md" download>
          {copy.downloadWorksheet}
          <SkyArrow />
        </a>
      </section>
      <aside className="strategy-next" aria-label={copy.related.title}>
        {copy.related.links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
            <SkyArrow />
          </Link>
        ))}
      </aside>
    </div>
  );
}
