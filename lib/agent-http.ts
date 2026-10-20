import { maximumBatchOperations } from "./agent-tools/maximumBatchOperations.ts";
import { withAgentRateLimit } from "./agent-tools/withAgentRateLimit.ts";
import { AgentContentError } from "./agent-content/AgentContentError.ts";
import { readAgentContent } from "./agent-content/readAgentContent.ts";
import { searchAgentContent } from "./agent-content/searchAgentContent.ts";
import { AgentToolInputError } from "./agent-tools/AgentToolInputError.ts";
import { executeAgentTool } from "./agent-tools/executeAgentTool.ts";
import { boundedJson } from "./agent-tools/boundedJson.ts";
import { RequestError } from "./agent-tools/RequestError.ts";
import { z } from "zod";
import { siteConfig } from "./config.ts";
import { deprecationPolicyLink } from "./agent-api/deprecationPolicyLink";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  Link: deprecationPolicyLink,
  "Access-Control-Expose-Headers": "Link",
};

export function agentResponse(value: unknown, status = 200) {
  return Response.json(value, { status, headers });
}

export function agentOptions() {
  return new Response(null, { status: 204, headers });
}

export function agentError(error: unknown) {
  const resolution = `Check the operation and its accepted parameters in ${siteConfig.url}/openapi.json, then correct the request.`;
  if (error instanceof AgentContentError || error instanceof RequestError) {
    return agentResponse(
      { error: { code: error.code, message: error.message, resolution } },
      error.status,
    );
  }
  if (error instanceof AgentToolInputError) {
    return agentResponse(
      {
        error: {
          code: error.code,
          message: error.message,
          resolution,
          issues: error.issues,
        },
      },
      400,
    );
  }
  return agentResponse(
    {
      error: {
        code: "UNAVAILABLE",
        message: "This request could not be completed. Please retry.",
        resolution:
          "Wait briefly, then retry the same request. Contact Recoup if the problem persists.",
      },
    },
    503,
  );
}

function queryValues(request: Request, keys: string[]) {
  const params = new URL(request.url).searchParams;
  for (const key of params.keys()) {
    if (!keys.includes(key) || params.getAll(key).length !== 1)
      throw new RequestError(
        "INVALID_QUERY",
        `Unknown or repeated parameter: ${key}`,
      );
  }
  return Object.fromEntries(params.entries());
}

function numberParameter(value: string | undefined) {
  if (value === undefined) return undefined;
  if (!/^\d+$/.test(value))
    throw new RequestError(
      "INVALID_QUERY",
      "Numeric parameters must be whole nonnegative numbers.",
    );
  return Number(value);
}

export async function handleAgentSearch(request: Request) {
  return withAgentRateLimit(request, async () => {
    try {
      const input = queryValues(request, ["query", "type", "limit", "cursor"]);
      return agentResponse(
        await searchAgentContent({
          ...input,
          query: input.query,
          limit: numberParameter(input.limit),
        }),
      );
    } catch (error) {
      return agentError(error);
    }
  });
}

export async function handleAgentRead(request: Request) {
  return withAgentRateLimit(request, async () => {
    try {
      const input = queryValues(request, ["id", "offset", "maxLength"]);
      return agentResponse(
        await readAgentContent({
          id: input.id,
          offset: numberParameter(input.offset),
          maxLength: numberParameter(input.maxLength),
        }),
      );
    } catch (error) {
      return agentError(error);
    }
  });
}

export async function handleAgentTool(request: Request) {
  return withAgentRateLimit(request, async () => {
    try {
      return agentResponse(await executeAgentTool(await boundedJson(request)));
    } catch (error) {
      return agentError(error);
    }
  });
}

const batchSchema = z.strictObject({
  operations: z
    .array(
      z.strictObject({
        name: z.string().min(1).max(100),
        arguments: z.record(z.string(), z.unknown()),
      }),
    )
    .min(1)
    .max(maximumBatchOperations),
});

export async function handleAgentBatch(request: Request) {
  return withAgentRateLimit(request, async () => {
    try {
      const parsed = batchSchema.safeParse(await boundedJson(request));
      if (!parsed.success)
        throw new RequestError(
          "INVALID_INPUT",
          "Provide 1 to 10 operations, each containing a tool name and arguments object.",
        );
      const results = await Promise.all(
        parsed.data.operations.map(async (operation) => {
          try {
            return { status: 200, result: await executeAgentTool(operation) };
          } catch (error) {
            const response = agentError(error);
            return { status: response.status, ...(await response.json()) };
          }
        }),
      );
      return agentResponse({ results });
    } catch (error) {
      return agentError(error);
    }
  });
}
