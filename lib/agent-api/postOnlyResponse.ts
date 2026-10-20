import { agentResponse } from "../agent-http";
import { withAgentRateLimit } from "../agent-tools/withAgentRateLimit";
import { siteConfig } from "../config";

/** Keep discovery probes recoverable without executing a POST-only tool. */
export function postOnlyResponse(request: Request) {
  return withAgentRateLimit(request, async () => {
    const response = agentResponse(
      {
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: "This operation requires POST.",
          resolution: `Send a JSON POST as described in ${siteConfig.url}/openapi.json.`,
        },
      },
      405,
    );
    response.headers.set("Allow", "POST, OPTIONS");
    response.headers.append("Access-Control-Expose-Headers", "Allow");
    return response;
  });
}
