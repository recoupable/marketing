"use client";

import { ToolHeader, type ToolPartState } from "./tool-header";
import { AudienceAgentRenderer } from "./renderers/audience-agent-renderer";
import { CreatorAgentRenderer } from "./renderers/creator-agent-renderer";
import { InsightsAgentRenderer } from "./renderers/insights-agent-renderer";
import { PlaylistAgentRenderer } from "./renderers/playlist-agent-renderer";
import { SimilarArtistsRenderer } from "./renderers/similar-artists-renderer";
import type { AudienceAgentOutput } from "@/lib/agent/tools/audience-agent";
import type { CreatorAgentOutput } from "@/lib/agent/tools/creator-agent";
import type { InsightsAgentOutput } from "@/lib/agent/tools/insights-agent";
import type { PlaylistAgentOutput } from "@/lib/agent/tools/playlist-agent";
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

/**
 * Maps each tool's `tool-<name>` part type to a human-readable label
 * shown in the agent's header chip. New agents added to the registry
 * should register their label here too.
 */
const TOOL_LABELS: Record<string, string> = {
  "tool-similar_artists": "Sleeper Agent",
  "tool-playlist_agent": "Playlist Agent",
  "tool-audience_agent": "Audience Agent",
  "tool-creator_agent": "Creator Agent",
  "tool-insights_agent": "Insights Agent",
};

export function isToolPart(part: { type: string }): boolean {
  return part.type.startsWith("tool-");
}

/**
 * Dispatcher that routes a tool part from `msg.parts` to the matching
 * renderer. Lives flush — no outer card chrome — because the caller
 * (HeroDemo's assistant message card, or the AgentTree fan-out grid)
 * already provides the surface.
 *
 * Unknown tool types fall through to a minimal JSON output so the demo
 * never throws on a tool we forgot to register a renderer for.
 */
export function ToolPart({ part }: { part: ToolPartLike }) {
  const label =
    TOOL_LABELS[part.type] ??
    part.type.replace(/^tool-/, "").replace(/_/g, " ");
  const input = part.input as { artist?: string } | undefined;
  const summary = input?.artist ? `for ${input.artist}` : undefined;

  if (part.type === "tool-similar_artists") {
    const output = part.output as SimilarArtistsOutput | undefined;
    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <SimilarArtistsRenderer output={output} />}
      </div>
    );
  }

  if (part.type === "tool-playlist_agent") {
    const output = part.output as PlaylistAgentOutput | undefined;
    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <PlaylistAgentRenderer output={output} />}
      </div>
    );
  }

  if (part.type === "tool-audience_agent") {
    const output = part.output as AudienceAgentOutput | undefined;
    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <AudienceAgentRenderer output={output} />}
      </div>
    );
  }

  if (part.type === "tool-creator_agent") {
    const output = part.output as CreatorAgentOutput | undefined;
    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <CreatorAgentRenderer output={output} />}
      </div>
    );
  }

  if (part.type === "tool-insights_agent") {
    const output = part.output as InsightsAgentOutput | undefined;
    return (
      <div>
        <ToolHeader label={label} state={part.state} summary={summary} />
        {output && <InsightsAgentRenderer output={output} />}
      </div>
    );
  }

  // Fallback for unknown tool types — defensive only, shouldn't fire in prod.
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
