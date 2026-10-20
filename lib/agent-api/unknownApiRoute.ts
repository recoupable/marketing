import { agentResponse } from "../agent-http.ts";
import { siteConfig } from "../config.ts";

export function unknownApiRoute() {
  return agentResponse({ error: {
    code: "NOT_FOUND",
    message: "This API route does not exist.",
    resolution: `Choose an operation from ${siteConfig.url}/openapi.json. Public website tools are under /agent-api/v1; platform operations use https://api.recoupable.dev/api.`,
  } }, 404);
}
