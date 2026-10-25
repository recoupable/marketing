import { maximumBatchOperations } from "./agent-tools/maximumBatchOperations.ts";
import { agentToolDefinitions } from "./agent-tools/agentToolDefinitions.ts";
import { siteConfig } from "./config.ts";
import { deprecationPolicyLink } from "./agent-api/deprecationPolicyLink";

const object = (
  properties: Record<string, unknown>,
  required = Object.keys(properties),
) => ({ type: "object", properties, required });
const string = { type: "string" };
const nullableOffset = { type: ["integer", "null"], minimum: 0 };
const content = object(
  {
    id: {
      type: "string",
      description: "Stable registry ID. Supply this to read_recoup_page.",
    },
    type: { type: "string", enum: ["page", "blog", "playbook"] },
    title: string,
    description: string,
    url: { type: "string", format: "uri" },
    representation: {
      type: "string",
      enum: ["summary", "full"],
      description:
        "Marketing pages are explicit summaries. Guides and articles provide their public content.",
    },
    updatedAt: {
      type: "string",
      description:
        "Source modification date when available; never a generated freshness date.",
    },
    publishedAt: {
      type: "string",
      description: "Original source publication date, when available.",
    },
    api: object({
      method: string,
      path: string,
      specificationUrl: { type: "string", format: "uri" },
    }),
  },
  ["id", "type", "title", "description", "url", "representation"],
);

const search = object({
  query: string,
  results: {
    type: "array",
    maxItems: 10,
    items: { allOf: [content, object({ excerpt: string })] },
  },
  total: { type: "integer", minimum: 0 },
  nextCursor: { type: ["string", "null"] },
});
const read = {
  allOf: [
    content,
    object({
      markdown: string,
      offset: { type: "integer", minimum: 0 },
      nextOffset: nullableOffset,
      totalLength: { type: "integer", minimum: 0 },
    }),
  ],
};
const toolSchema = (name: string) =>
  agentToolDefinitions.find((tool) => tool.name === name)!.inputSchema;
const errorSchema = object({
  error: object(
    {
      code: string,
      message: string,
      resolution: string,
      issues: {
        type: "array",
        items: object({ field: string, message: string }),
      },
    },
    ["code", "message", "resolution"],
  ),
});
const error = { $ref: "#/components/schemas/ErrorResponse" };
const policyLinkHeader = {
  description:
    'RFC 9745 rel="deprecation" link to the published versioning and retirement policy. The link is available while v1 is active; no Deprecation or Sunset date is currently scheduled.',
  schema: { type: "string", example: deprecationPolicyLink },
};
const jsonResponse = (description: string, schema: unknown) => ({
  description,
  headers: {
    Link: policyLinkHeader,
    "RateLimit-Limit": {
      description:
        "Hosted requests per IP per serving region in a 60-second fixed window.",
      schema: { type: "integer", const: 120 },
    },
    "RateLimit-Policy": {
      schema: { type: "string", example: '"recoup-public-tools";q=120;w=60' },
    },
  },
  content: { "application/json": { schema } },
});
const toolResult = {
  oneOf: [
    search,
    read,
    object({
      status: { const: "calculated" },
      assumptions: toolSchema("estimate_workflow_roi"),
      result: object({
        hoursSaved: { type: "number" },
        capacityValue: { type: "number" },
        monthlyNetValue: { type: "number" },
        firstYearNetValue: { type: "number" },
        paybackMonths: { type: ["number", "null"] },
      }),
      units: { type: "object", additionalProperties: string },
      interpretation: string,
    }),
    object({
      status: { const: "assessed" },
      answers: (
        toolSchema("assess_workflow_readiness").properties as Record<
          string,
          unknown
        >
      ).answers,
      recommendation: object({
        title: string,
        description: string,
        steps: { type: "array", items: string },
        interest: string,
      }),
    }),
    object({
      status: { const: "draft" },
      draft: object({ interest: string, message: string }),
      submitted: { const: false },
      nextStep: { const: "/contact" },
    }),
  ],
};
const errors = {
  "400": jsonResponse(
    "Invalid input, unknown tool, or unsupported cursor. Correct the named inputs before retrying.",
    error,
  ),
  "404": jsonResponse(
    "No public content has this registry ID. Search for an ID first.",
    error,
  ),
  "429": {
    ...jsonResponse(
      "Rate limit reached. Wait 60 seconds before retrying.",
      error,
    ),
    headers: {
      ...jsonResponse("", error).headers,
      "Retry-After": { schema: { type: "integer", const: 60 } },
    },
  },
  "503": jsonResponse(
    "Temporarily unable to complete the request. Retry later.",
    error,
  ),
};

function queryParameters(name: string) {
  const schema = toolSchema(name);
  return Object.entries(schema.properties as Record<string, unknown>).map(
    ([key, value]) => ({
      name: key,
      in: "query",
      required: (schema.required as string[]).includes(key),
      schema: value,
    }),
  );
}

export function websiteOpenAPI() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Recoup public website tools",
      version: "1.0.0",
      description:
        "Search and read public Recoup content, assess workflow readiness, calculate a scenario, and prepare a project brief. Free, anonymous, bounded, read-only computation: no account data, signup, purchases, or code execution. These are website tools; the authenticated music platform API and MCP are documented separately at /docs. Version v1 permits additive fields; incompatible changes require a new versioned path. Clients should ignore unknown response fields. No v1 deprecation or sunset is scheduled. Future retirement will be announced in /agents.md with a migration guide and Deprecation, Sunset, and Link headers when dates are known.",
      contact: {
        name: "Recoup",
        email: siteConfig.contactEmail,
        url: `${siteConfig.url}/contact`,
      },
      termsOfService: `${siteConfig.url}/terms`,
    },
    "x-api-versioning": {
      strategy: "url-path",
      currentVersion: "v1",
      pathPrefix: "/agent-api/v1",
      compatibleChanges: "Additive response fields; ignore unrecognized fields.",
      breakingChanges: "Require a new major URL version.",
      deprecation: {
        scheduled: false,
        policyUrl: `${siteConfig.url}/docs/public-website-api#versioning-and-deprecation`,
        responseHeaders: ["Deprecation", "Sunset", "Link"],
        announcement: "Migration guide and dated response headers before retirement.",
      },
    },
    servers: [
      {
        url: `${siteConfig.url}/agent-api/v1`,
        description:
          "Recoup public website API v1. Replace only the origin for local or preview testing; keep /agent-api/v1.",
      },
    ],
    security: [],
    components: {
      schemas: { ErrorResponse: errorSchema, ToolResult: toolResult },
    },
    externalDocs: {
      description: "Agent guide and platform connection options",
      url: `${siteConfig.url}/agents`,
    },
    paths: {
      "/batch": {
        post: {
          deprecated: false,
          operationId: "batch_recoup_website_tools",
          summary: "Run up to ten public operations in one request",
          description:
            "Independent, read-only operations run concurrently. Results preserve input order, with an individual HTTP-style status and result or error. One failed operation does not cancel the others. This is not a transaction. Maximum entire body: 16 KB. Each batch counts as one request against the shared 120 requests per minute per IP per region limit.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  ...object({
                    operations: {
                      type: "array",
                      minItems: 1,
                      maxItems: maximumBatchOperations,
                      items: {
                        oneOf: agentToolDefinitions.map((tool) => ({
                          ...object({
                            name: { type: "string", const: tool.name },
                            arguments: tool.inputSchema,
                          }),
                          additionalProperties: false,
                        })),
                      },
                    },
                  }),
                  additionalProperties: false,
                },
              },
            },
          },
          responses: {
            "200": jsonResponse(
              "Ordered per-operation results, including individual failures.",
              object({
                results: {
                  type: "array",
                  minItems: 1,
                  maxItems: maximumBatchOperations,
                  items: {
                    oneOf: [
                      object({
                        status: { const: 200 },
                        result: { $ref: "#/components/schemas/ToolResult" },
                      }),
                      object({
                        status: { type: "integer", enum: [400, 404, 503] },
                        error: errorSchema.properties.error,
                      }),
                    ],
                  },
                },
              }),
            ),
            "400": errors["400"],
            "429": errors["429"],
            "503": errors["503"],
            "413": jsonResponse("The entire batch exceeds 16 KB.", error),
            "415": jsonResponse("Send application/json.", error),
          },
        },
      },
      "/search": {
        get: {
          deprecated: false,
          operationId: "search_recoup",
          summary: "Find relevant public Recoup content",
          description: agentToolDefinitions[0].description,
          parameters: queryParameters("search_recoup"),
          responses: {
            "200": jsonResponse(
              "Matching results. An empty results array is a successful search with no match.",
              search,
            ),
            ...errors,
          },
        },
      },
      "/read": {
        get: {
          deprecated: false,
          operationId: "read_recoup_page",
          summary: "Read public content by registry ID",
          description: agentToolDefinitions[1].description,
          parameters: queryParameters("read_recoup_page"),
          responses: {
            "200": jsonResponse(
              "One bounded text segment. Continue at nextOffset until null.",
              read,
            ),
            ...errors,
          },
        },
      },
      "/tools": {
        post: {
          deprecated: false,
          operationId: "execute_recoup_website_tool",
          summary: "Run a public website tool",
          description:
            "Runs one of five public tools without saving a lead or accessing an account. Maximum request body: 16 KB. Request arguments must match the selected tool. All operations are repeatable and do not mutate server data; no idempotency key or credentials are needed. In compatible browsers, prepare_project_brief also opens a local review panel through WebMCP. A raw HTTP call returns the draft only.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  oneOf: agentToolDefinitions.map((tool) => ({
                    ...object({
                      name: { const: tool.name, type: "string" },
                      arguments: tool.inputSchema,
                    }),
                    additionalProperties: false,
                  })),
                },
              },
            },
          },
          responses: {
            "200": jsonResponse(
              "Result for the requested tool. A draft always has submitted:false.",
              { $ref: "#/components/schemas/ToolResult" },
            ),
            ...errors,
            "413": jsonResponse(
              "Request body is larger than 16 KB. Shorten the supplied context.",
              error,
            ),
            "415": jsonResponse("Send application/json.", error),
          },
        },
      },
      "/markdown": {
        get: {
          deprecated: false,
          operationId: "read_recoup_markdown",
          summary: "Read a complete public page as Markdown",
          description:
            "Use a published page path, such as /blog or /blog/your-article. Returns the same document as its .md URL and Agent view. Marketing overviews retain their summary label; articles, transcripts, and guides include the complete published text. No account state or private files are returned.",
          parameters: [
            {
              name: "path",
              in: "query",
              required: true,
              schema: { type: "string", example: "/blog" },
            },
          ],
          responses: {
            "200": {
              description: "Complete public Markdown document.",
              headers: { Link: policyLinkHeader },
              content: { "text/markdown": { schema: string } },
            },
            "429": errors["429"],
            "503": errors["503"],
            "404": {
              description: "Unknown or invalid public path.",
              headers: { Link: policyLinkHeader },
              content: { "text/markdown": { schema: string } },
            },
          },
        },
      },
    },
  };
}
