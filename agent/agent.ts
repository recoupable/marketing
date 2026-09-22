import { defineAgent } from "eve";
export default defineAgent({
  model: process.env.WEBSITE_AGENT_MODEL || "openai/gpt-5.4",
  defaultTools: false,
  limits: {
    // Cumulative usage includes cached research on every discovery turn.
    maxInputTokensPerSession: 2000000,
    maxOutputTokensPerSession: 20000,
    maxTokenCostUsdPerSession: 3,
    sessionTimeoutMs: 24 * 60 * 60 * 1000,
  },
});
