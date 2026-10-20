import { websiteOpenAPI } from "@/lib/agent-openapi";
import { agentOptions, agentResponse } from "@/lib/agent-http";
import { withAgentRateLimit } from "@/lib/agent-tools/withAgentRateLimit";

/** Discover this public API from its versioned base URL. */
export function GET(request: Request) {
  return withAgentRateLimit(request, async () => {
    const response = agentResponse(websiteOpenAPI());
    response.headers.append(
      "Link",
      '</openapi.json>; rel="service-desc"; type="application/json", </agents>; rel="service-doc"',
    );
    return response;
  });
}

export { agentOptions as OPTIONS };
