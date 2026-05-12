import { similarArtistsTool } from "./similar-artists";

/**
 * Tool registry for the marketing hero demo agent.
 *
 * Keys here become the tool names exposed to the LLM. They also become the
 * part type discriminator on the client side (e.g. `similar_artists` here
 * surfaces as `tool-similar_artists` parts in UIMessage.parts).
 */
export const demoTools = {
  similar_artists: similarArtistsTool,
} as const;

export type DemoToolName = keyof typeof demoTools;
