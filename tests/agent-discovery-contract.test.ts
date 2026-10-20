import { afterEach, expect, test, vi } from "vitest";
import { checkRateLimit } from "@vercel/firewall";
import * as batch from "../app/agent-api/v1/batch/route";
import * as tools from "../app/agent-api/v1/tools/route";
import { GET as apiIndex } from "../app/agent-api/v1/route";
import { websiteOpenAPI } from "../lib/agent-openapi";
import { siteConfig } from "../lib/config";
import { nextConfig } from "../next.config";
import { GET as markdown } from "../app/agent-api/v1/markdown/route";
import { deprecationPolicyLink } from "../lib/agent-api/deprecationPolicyLink";

vi.mock("@vercel/firewall", () => ({ checkRateLimit: vi.fn() }));
afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});

test("versioned OpenAPI servers resolve to the existing HTTP URLs and IDs", () => {
  const spec = websiteOpenAPI();
  const operations = Object.entries(spec.paths).flatMap(([path, methods]) =>
    Object.entries(methods).map(([method, operation]) => ({
      method,
      url: `${spec.servers[0].url}${path}`,
      id: operation.operationId,
      deprecated: operation.deprecated,
    })),
  );
  expect(operations).toEqual([
    {
      method: "post",
      url: `${siteConfig.url}/agent-api/v1/batch`,
      id: "batch_recoup_website_tools",
      deprecated: false,
    },
    {
      method: "get",
      url: `${siteConfig.url}/agent-api/v1/search`,
      id: "search_recoup",
      deprecated: false,
    },
    {
      method: "get",
      url: `${siteConfig.url}/agent-api/v1/read`,
      id: "read_recoup_page",
      deprecated: false,
    },
    {
      method: "post",
      url: `${siteConfig.url}/agent-api/v1/tools`,
      id: "execute_recoup_website_tool",
      deprecated: false,
    },
    {
      method: "get",
      url: `${siteConfig.url}/agent-api/v1/markdown`,
      id: "read_recoup_markdown",
      deprecated: false,
    },
  ]);
  expect(spec["x-api-versioning"].deprecation.scheduled).toBe(false);
  const input =
    spec.paths["/batch"].post.requestBody.content["application/json"].schema;
  expect(input.required).toContain("operations");
  expect(input.properties.operations).toMatchObject({
    type: "array",
    minItems: 1,
    maxItems: 10,
  });
});

test("unsupported tool methods preserve 405 with typed recovery and the enforced quota", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValue({ rateLimited: false });
  for (const [path, route] of [
    ["batch", batch],
    ["tools", tools],
  ] as const) {
    for (const method of ["GET", "HEAD", "PUT", "PATCH", "DELETE"] as const) {
      const response = await route[method](
        new Request(`${siteConfig.url}/agent-api/v1/${path}`, { method }),
      );
      expect(response.status).toBe(405);
      expect(response.headers.get("allow")).toBe("POST, OPTIONS");
      expect(response.headers.get("ratelimit-limit")).toBe("120");
      expect(response.headers.get("ratelimit-policy")).toContain("q=120;w=60");
      expect(response.headers.get("ratelimit-remaining")).toBeNull();
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect((await response.json()).error).toMatchObject({
        code: "METHOD_NOT_ALLOWED",
        resolution: expect.stringContaining("/openapi.json"),
      });
    }
  }
});

test("unsupported-method probes cannot evade quota enforcement or fail-open checks", async () => {
  vi.stubEnv("VERCEL", "1");
  const request = new Request(`${siteConfig.url}/agent-api/v1/batch`);
  vi.mocked(checkRateLimit).mockResolvedValueOnce({ rateLimited: true });
  const limited = await batch.GET(request);
  expect(limited.status).toBe(429);
  expect(limited.headers.get("retry-after")).toBe("60");
  vi.mocked(checkRateLimit).mockResolvedValueOnce({
    rateLimited: false,
    error: "not-found",
  });
  const unavailable = await batch.GET(request);
  expect(unavailable.status).toBe(503);
  expect(unavailable.headers.has("ratelimit-limit")).toBe(false);
});

test("the conventional versioned API alias leads to a quota-enforced discovery document", async () => {
  expect(await nextConfig.redirects!()).toContainEqual({
    source: "/api/v1/:path*",
    destination: "/agent-api/v1/:path*",
    permanent: true,
  });
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValueOnce({ rateLimited: false });
  const request = new Request(`${siteConfig.url}/agent-api/v1`);
  const response = await apiIndex(request);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(websiteOpenAPI());
  expect(response.headers.get("ratelimit-limit")).toBe("120");
  expect(response.headers.get("link")).toContain('rel="service-desc"');
  expect(response.headers.get("link")).toContain(deprecationPolicyLink);
  vi.mocked(checkRateLimit).mockResolvedValueOnce({ rateLimited: true });
  const limited = await apiIndex(request);
  expect(limited.status).toBe(429);
  expect(limited.headers.get("retry-after")).toBe("60");
});

test("JSON and Markdown expose the retirement policy without claiming an active deprecation", async () => {
  vi.stubEnv("VERCEL", "");
  const responses = [
    await apiIndex(new Request(`${siteConfig.url}/agent-api/v1`)),
    await markdown(
      new Request(`${siteConfig.url}/agent-api/v1/markdown?path=/services`),
    ),
  ];
  for (const response of responses) {
    expect(response.status).toBe(200);
    expect(response.headers.get("link")).toContain(deprecationPolicyLink);
    expect(response.headers.get("access-control-expose-headers")).toContain(
      "Link",
    );
    expect(response.headers.has("deprecation")).toBe(false);
    expect(response.headers.has("sunset")).toBe(false);
  }
  const spec = websiteOpenAPI();
  expect(
    spec.paths["/search"].get.responses["200"].headers.Link.schema.example,
  ).toBe(deprecationPolicyLink);
  expect(
    spec.paths["/markdown"].get.responses["200"].headers.Link.schema.example,
  ).toBe(deprecationPolicyLink);
  for (const headers of [
    spec.paths["/search"].get.responses["200"].headers,
    spec.paths["/markdown"].get.responses["200"].headers,
  ]) {
    expect(headers.Deprecation.description).toContain("Not emitted");
    expect(headers.Deprecation.schema.pattern).toBe("^@[0-9]+$");
    expect(headers.Sunset.description).toContain("Not emitted");
  }
});
