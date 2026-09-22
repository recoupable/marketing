import { defineAgent } from "eve";
export default defineAgent({
  model: process.env.WEBSITE_AGENT_MODEL || "openai/gpt-5.4",
  defaultTools: false,
  limits: {
    maxInputTokensPerSession: 200000,
    maxOutputTokensPerSession: 20000,
    maxTokenCostUsdPerSession: 3,
    sessionTimeoutMs: 24 * 60 * 60 * 1000,
  },
});
