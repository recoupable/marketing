import { expect, test } from "vitest";
import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";
import { handleWebsiteMcp } from "../lib/website-mcp/handleWebsiteMcp";

test("a real MCP client discovers and calls all five anonymous website tools", async () => {
  const client = new Client({
    name: "recoup-integration-test",
    version: "1.0.0",
  });
  const transport = new StreamableHTTPClientTransport(
    new URL("https://recoupable.dev/mcp"),
    {
      fetch: async (url, init) => handleWebsiteMcp(new Request(url, init)),
    },
  );
  await client.connect(transport);
  try {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(5);
    expect(tools.every((tool) => tool.annotations?.readOnlyHint)).toBe(true);
    const result = await client.callTool({
      name: "search_recoup",
      arguments: { query: "royalty reporting", limit: 1 },
    });
    expect(result.isError).not.toBe(true);
    expect(result.structuredContent).toHaveProperty("results");
    const read = await client.callTool({
      name: "read_recoup_page",
      arguments: { id: "page:/services", maxLength: 100 },
    });
    expect(read.structuredContent).toHaveProperty("markdown");
    const roi = await client.callTool({
      name: "estimate_workflow_roi",
      arguments: {
        monthlyHours: 40,
        hourlyCost: 40,
        timeReduction: 50,
        monthlySystemCost: 100,
        setupCost: 2500,
      },
    });
    expect(roi.structuredContent).toHaveProperty("status", "calculated");
    const draft = await client.callTool({
      name: "prepare_project_brief",
      arguments: {
        workflow: "Prepare monthly royalty reports for our artists.",
        desiredOutcome: "Reduce preparation time and keep exceptions visible.",
      },
    });
    expect(draft.structuredContent).toHaveProperty("submitted", false);
    const invalid = await client.callTool({
      name: "assess_workflow_readiness",
      arguments: { answers: {} },
    });
    expect(invalid.isError).toBe(true);
    const missing = await client.callTool({
      name: "read_recoup_page",
      arguments: { id: "https://private.invalid/secret" },
    });
    expect(missing.isError).toBe(true);
    expect(JSON.stringify(missing)).not.toContain("stack");
  } finally {
    await client.close();
  }
});

test("MCP preflight supports anonymous cross-origin clients without cookies", async () => {
  const response = await handleWebsiteMcp(
    new Request("https://recoupable.dev/mcp", { method: "OPTIONS" }),
  );
  expect(response.status).toBe(204);
  expect(response.headers.get("access-control-allow-origin")).toBe("*");
  expect(response.headers.get("access-control-allow-headers")).toContain(
    "MCP-Protocol-Version",
  );
  expect(response.headers.get("access-control-allow-headers")).toContain(
    "MCP-Method",
  );
  expect(response.headers.get("access-control-allow-headers")).toContain(
    "MCP-Name",
  );
  expect(response.headers.get("access-control-allow-credentials")).toBeNull();
});

test("MCP rejects requests for untrusted hosts before tool execution", async () => {
  const response = await handleWebsiteMcp(
    new Request("https://attacker.invalid/mcp"),
  );
  expect(response.status).toBe(403);
});

test("local Next.js host normalization accepts only loopback host aliases", async () => {
  expect(
    (
      await handleWebsiteMcp(
        new Request("http://localhost:3027/mcp", {
          method: "OPTIONS",
          headers: { host: "127.0.0.1:3027" },
        }),
      )
    ).status,
  ).toBe(204);
  expect(
    (
      await handleWebsiteMcp(
        new Request("http://localhost:3027/mcp", {
          method: "OPTIONS",
          headers: { host: "attacker.invalid" },
        }),
      )
    ).status,
  ).toBe(403);
});

test("MCP host matching is case-insensitive", async () => {
  const response = await handleWebsiteMcp(
    new Request("https://recoupable.dev/mcp", {
      method: "OPTIONS",
      headers: { host: "RECOUPABLE.DEV" },
    }),
  );
  expect(response.status).toBe(204);
});
