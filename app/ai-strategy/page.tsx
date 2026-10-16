import type { Metadata } from "next";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import { PageHero, PageButton, PageSection } from "@/components/sky/page-ui";
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
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.heading}
        description={copy.introduction}
        tone="light"
      >
        <PageButton href="#planner">{copy.buildAction}</PageButton>
      </PageHero>
      <section className="strategy-method" aria-label={copy.methodLabel}>
        {copy.method.map((item, index) => (
          <div key={item.title}>
            <span className="sp-kicker">0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </section>
      <StrategyPlanner />
      <PageSection title={copy.worksheetTitle} description={copy.worksheetBody}>
        <a
          className="sp-button sp-button-secondary"
          href="/downloads/recoup-team-workflow-worksheet.md"
          download
        >
          {copy.downloadWorksheet}
        </a>
      </PageSection>
      <aside className="strategy-next" aria-label={copy.related.title}>
        <h2>{copy.related.title}</h2>
        {copy.related.links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </aside>
    </div>
  );
}
