import { ChevronDown, ExternalLink } from "lucide-react";
import type { z } from "zod/v3";
import {
  Sources,
  SourcesContent,
  SourcesTrigger,
  Source,
} from "@/components/ai-elements/sources";
import type { questionSchema } from "@/lib/website-agent/question";
import { MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";

export function CompanyInsight({
  insight,
  streaming = false,
}: {
  insight: Partial<NonNullable<z.infer<typeof questionSchema>["insight"]>>;
  streaming?: boolean;
}) {
  return (
    <section
      className="wa-finding"
      aria-label={insight.title || "Company finding"}
      aria-busy={streaming}
    >
      {insight.title && <h2>{insight.title}</h2>}
      {insight.finding && (
        <MessageResponse isAnimating={streaming}>
          {insight.finding}
        </MessageResponse>
      )}
      {insight.implication && (
        <MessageResponse isAnimating={streaming}>
          {insight.implication}
        </MessageResponse>
      )}
      {insight.test && (
        <div className="wa-first-test">
          <strong>A useful first test</strong>
          <MessageResponse isAnimating={streaming}>
            {insight.test}
          </MessageResponse>
        </div>
      )}
      {streaming && (
        <Shimmer className="wa-streaming-label">Writing insight…</Shimmer>
      )}
      {!streaming && insight.sources && (
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
      )}
    </section>
  );
}
