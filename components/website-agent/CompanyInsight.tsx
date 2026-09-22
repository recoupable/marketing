import { ChevronDown, ExternalLink } from "lucide-react";
import type { z } from "zod/v3";
import {
  Sources,
  SourcesContent,
  SourcesTrigger,
  Source,
} from "@/components/ai-elements/sources";
import type { questionSchema } from "@/lib/website-agent/question";

export function CompanyInsight({
  insight,
}: {
  insight: NonNullable<z.infer<typeof questionSchema>["insight"]>;
}) {
  return (
    <section className="wa-finding" aria-label={insight.title}>
      <h2>{insight.title}</h2>
      <p>{insight.finding}</p>
      <p>{insight.implication}</p>
      <div className="wa-first-test">
        <strong>A useful first test</strong>
        <p>{insight.test}</p>
      </div>
      <Sources className="wa-sources">
        <SourcesTrigger count={insight.sources.length}>
          <span>
            {insight.sources.length}{" "}
            {insight.sources.length === 1 ? "source" : "sources"}
          </span>
          <ChevronDown size={13} />
        </SourcesTrigger>
        <SourcesContent>
          {insight.sources.map((source, index) => (
            <div className="wa-evidence" key={`${source.url}-${index}`}>
              <Source href={source.url} title={source.title}>
                <span>{source.title}</span>
                <ExternalLink size={12} aria-hidden="true" />
              </Source>
              <blockquote>{source.quote}</blockquote>
            </div>
          ))}
        </SourcesContent>
      </Sources>
    </section>
  );
}
