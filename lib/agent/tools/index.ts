import { audienceAgentTool } from "./audience-agent";
import { creatorAgentTool } from "./creator-agent";
import { insightsAgentTool } from "./insights-agent";
import { playlistAgentTool } from "./playlist-agent";
import { similarArtistsTool } from "./similar-artists";

/**
 * Tool registry for the marketing hero demo agent.
 *
 * Each key here becomes the tool name exposed to the LLM and the part-type
 * discriminator on the client side (e.g. `playlist_agent` here surfaces as
 * `tool-playlist_agent` parts in UIMessage.parts).
 *
 * Naming convention: `<domain>_agent` for the new fan-out agents so the UI
 * can render each as a labeled specialist. `similar_artists` stays as-is
 * since it predates the agent framing (it's the "Sleeper Agent" in the UI).
 */
export const demoTools = {
  similar_artists: similarArtistsTool,
  playlist_agent: playlistAgentTool,
  audience_agent: audienceAgentTool,
  creator_agent: creatorAgentTool,
  insights_agent: insightsAgentTool,
} as const;

export type DemoToolName = keyof typeof demoTools;
