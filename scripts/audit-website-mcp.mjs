import assert from "node:assert/strict";
import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

const origin = new URL(process.argv[2] ?? "http://localhost:3027");
const client = new Client({
  name: "recoup-public-mcp-audit",
  version: "1.0.0",
});
await client.connect(
  new StreamableHTTPClientTransport(new URL("/mcp", origin)),
);
let checked = 0;
async function verify(name, run) {
  await run();
  checked++;
  console.log(`PASS ${name}`);
}
try {
  const { tools } = await client.listTools();
  await verify("five public tools with read-only annotations", () => {
    assert.equal(tools.length, 5);
    assert.ok(tools.every((tool) => tool.annotations?.readOnlyHint));
  });
  let first;
  await verify("find published royalty reporting information", async () => {
    const result = await client.callTool({
      name: "search_recoup",
      arguments: { query: "royalty reporting", limit: 1 },
    });
    assert.ok(!result.isError);
    first = result.structuredContent.results[0];
    assert.ok(first.id && first.url);
  });
  await verify("read the returned public source ID", async () => {
    const result = await client.callTool({
      name: "read_recoup_page",
      arguments: { id: first.id, maxLength: 80 },
    });
    assert.equal(result.structuredContent.markdown.length, 80);
    assert.equal(result.structuredContent.nextOffset, 80);
  });
  await verify("continue a long source at its returned offset", async () => {
    const result = await client.callTool({
      name: "read_recoup_page",
      arguments: { id: first.id, offset: 80, maxLength: 80 },
    });
    assert.equal(result.structuredContent.offset, 80);
    assert.equal(result.structuredContent.markdown.length, 80);
  });
  await verify("calculate supplied synthetic assumptions", async () => {
    const result = await client.callTool({
      name: "estimate_workflow_roi",
      arguments: {
        monthlyHours: 40,
        hourlyCost: 40,
        timeReduction: 50,
        monthlySystemCost: 100,
        setupCost: 2500,
      },
    });
    assert.equal(result.structuredContent.result.hoursSaved, 20);
    assert.match(result.structuredContent.interpretation, /not guaranteed/);
  });
  await verify("assess a complete synthetic workflow fixture", async () => {
    const schema = tools.find(
      (tool) => tool.name === "assess_workflow_readiness",
    ).inputSchema;
    const answers = Object.fromEntries(
      Object.entries(schema.properties.answers.properties).map(
        ([key, value]) => [key, value.enum[0]],
      ),
    );
    const result = await client.callTool({
      name: "assess_workflow_readiness",
      arguments: { answers },
    });
    assert.equal(result.structuredContent.status, "assessed");
  });
  await verify("prepare a draft without sending an inquiry", async () => {
    const result = await client.callTool({
      name: "prepare_project_brief",
      arguments: {
        workflow: "Prepare monthly royalty reports for our artists.",
        desiredOutcome: "Reduce preparation time and keep exceptions visible.",
      },
    });
    assert.equal(result.structuredContent.status, "draft");
    assert.equal(result.structuredContent.submitted, false);
  });
  await verify("refuse arbitrary private URLs", async () => {
    const result = await client.callTool({
      name: "read_recoup_page",
      arguments: { id: "https://private.invalid/secret" },
    });
    assert.equal(result.isError, true);
  });
  await verify("reject incomplete calculation inputs", async () => {
    const result = await client.callTool({
      name: "estimate_workflow_roi",
      arguments: {},
    });
    assert.equal(result.isError, true);
  });
  await verify("return an honest empty search", async () => {
    const result = await client.callTool({
      name: "search_recoup",
      arguments: { query: "nonexistent-zxqv-audit-9102" },
    });
    assert.equal(result.structuredContent.total, 0);
  });
} finally {
  await client.close();
}
assert.equal(checked, 10);
console.log(
  `Verified ${checked} public MCP scenarios at ${origin.origin}; no account actions or submissions.`,
);
