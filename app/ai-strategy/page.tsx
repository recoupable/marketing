import type { Metadata } from "next";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import { StrategyExplorer } from "@/components/ai-strategy/StrategyExplorer";
import "./strategy.css";

export const metadata: Metadata = withPageMetadata({
  title: copy.title,
  description: copy.description,
  alternates: { canonical: "/ai-strategy" },
});

export default function AIStrategyPage() {
  return (
    <div className="sky-subpage strategy-page">
      <header className="strategy-intro">
        <p className="strategy-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <p>{copy.introduction}</p>
      </header>
      <StrategyExplorer />
      <p className="strategy-other">
        {copy.differentTask}{" "}
        <Link href="/contact?workflow=AI%20strategy">
          {copy.differentAction} <span aria-hidden="true">↗</span>
        </Link>
      </p>
    </div>
  );
}
