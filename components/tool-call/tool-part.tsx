"use client";

import { ToolHeader, type ToolPartState } from "./tool-header";
import { SimilarArtistsRenderer } from "./renderers/similar-artists-renderer";
import type { SimilarArtistsOutput } from "@/lib/agent/tools/similar-artists";

/**
 * Shape we consume from `UIMessage.parts` for tool entries. We type the
 * fields we read manually rather than pulling the generic Vercel AI SDK
 * tool-part type — the actual runtime shape is stable enough that the
 * stricter typing here gives us better autocomplete in the dispatcher.
 */
export type ToolPartLike = {
  type: string;
  state: ToolPartState;
  toolCallId?: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

const TOOL_LABELS: Record<string, string> = {
  "tool-similar_artists": "Similar Artists",
};

export function isToolPart(part: { type: string }): boolean {
  return part.type.startsWith("tool-");
}

/**
 * Dispatcher that routes a tool part from `msg.parts` to the matching
 * renderer. Lives flush — no outer card chrome — because the caller
 * (HeroDemo's assistant message card) already provides the surface.
 *
 * Unknown tool types fall through to a minimal JSON output so the demo
 * never throws on a tool we forgot to register a renderer for.
 */
export function ToolPart({ part }: { part: ToolPartLike }) {
  const label =
    TOOL_LABELS[part.type] ?? part.type.replace(/^tool-/, "").replace(/_/g, " ");

  if (part.type === "tool-similar_artists") {
    const input = part.input as { artist?: string } | undefined;
    const output = part.output as SimilarArtistsOutput | undefined;
    const summary = input?.artist ? `for ${input.artist}` : undefined;

    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <SimilarArtistsRenderer output={output} />}
      </div>
    );
  }

  return (
    <div>
      <ToolHeader label={label} state={part.state} />
      {part.output !== undefined && (
        <pre className="text-[11px] text-(--foreground)/50 overflow-auto whitespace-pre-wrap break-all">
          {JSON.stringify(part.output, null, 2)}
        </pre>
      )}
    </div>
  );
}
