import assert from "node:assert/strict";
import test from "node:test";
import { agentError, agentOptions, handleAgentRead, handleAgentSearch, handleAgentTool } from "../lib/agent-http.ts";
import { readAgentContent, searchAgentContent } from "../lib/agent-content.ts";

const base = "https://recoup.example/agent-api/v1/";
const roi = { name: "estimate_workflow_roi", arguments: { monthlyHours: 40, hourlyCost: 40, timeReduction: 50, monthlySystemCost: 100, setupCost: 2500 } };
function post(value: unknown, headers: HeadersInit = { "Content-Type": "application/json" }) {
  return new Request(`${base}tools`, { method: "POST", headers, body: JSON.stringify(value) });
}
async function expectError(response: Response, status: number, code: string) {
  assert.equal(response.status, status);
  assert.match(response.headers.get("content-type") || "", /^application\/json/);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const body = await response.json();
  assert.equal(body.error?.code, code);
  assert.equal(typeof body.error?.message, "string");
  return body;
}

test("public search and read responses match the actual content service", async () => {
  const expected = await searchAgentContent({ query: "royalty reporting", type: "page", limit: 2 });
  assert.ok(expected.results.length > 0);
  const response = await handleAgentSearch(new Request(`${base}search?query=royalty%20reporting&type=page&limit=2`));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), expected);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.equal(response.headers.get("cache-control"), "no-store");
  const id = expected.results[0].id;
  const readResponse = await handleAgentRead(new Request(`${base}read?id=${encodeURIComponent(id)}&offset=0&maxLength=100`));
  assert.equal(readResponse.status, 200);
  const read = await readResponse.json();
  assert.deepEqual(read, await readAgentContent({ id, offset: 0, maxLength: 100 }));
  assert.ok(read.markdown.length > 0);
  assert.equal(read.nextOffset, 100);
});

test("search queries reject unknown, repeated, missing, and malformed parameters", async () => {
  for (const query of ["query=music&unknown=1", "query=music&query=royalty", "query=music&limit=1&limit=2", "query=music&type=page&type=docs", "query=music&limit=1.5", "query=music&limit=-1", "query=music&limit=NaN", "query=music&limit="]) {
    await expectError(await handleAgentSearch(new Request(`${base}search?${query}`)), 400, "INVALID_QUERY");
  }
  await expectError(await handleAgentSearch(new Request(`${base}search`)), 400, "INVALID_QUERY");
  await expectError(await handleAgentSearch(new Request(`${base}search?query=%20%20`)), 400, "INVALID_QUERY");
  await expectError(await handleAgentSearch(new Request(`${base}search?query=music&type=private`)), 400, "INVALID_TYPE");
  for (const limit of ["0", "11", "9".repeat(400)]) await expectError(await handleAgentSearch(new Request(`${base}search?query=music&limit=${limit}`)), 400, "INVALID_LIMIT");
  await expectError(await handleAgentSearch(new Request(`${base}search?query=music&cursor=bogus`)), 400, "INVALID_CURSOR");
});

test("reading requires a registered public ID and bounded integer offsets", async () => {
  for (const query of ["id=page%3A%2Fservices&url=outside", "id=page%3A%2Fservices&id=page%3A%2Fpricing", "id=page%3A%2Fservices&offset=-1", "id=page%3A%2Fservices&maxLength=2.5"]) {
    await expectError(await handleAgentRead(new Request(`${base}read?${query}`)), 400, "INVALID_QUERY");
  }
  await expectError(await handleAgentRead(new Request(`${base}read`)), 400, "INVALID_ID");
  await expectError(await handleAgentRead(new Request(`${base}read?id=page%3A%2Fno-such-page`)), 404, "NOT_FOUND");
  for (const maxLength of ["0", "12001"]) await expectError(await handleAgentRead(new Request(`${base}read?id=page%3A%2Fservices&maxLength=${maxLength}`)), 400, "INVALID_MAX_LENGTH");
  await expectError(await handleAgentRead(new Request(`${base}read?id=page%3A%2Fservices&offset=999999`)), 400, "INVALID_OFFSET");
});

test("tool dispatch uses the same search and read implementations", async () => {
  const searchInput = { query: "royalty", type: "page" as const, limit: 1 };
  const searched = await handleAgentTool(post({ name: "search_recoup", arguments: searchInput }));
  assert.equal(searched.status, 200);
  assert.deepEqual(await searched.json(), await searchAgentContent(searchInput));
  const readInput = { id: "page:/services", maxLength: 150 };
  const read = await handleAgentTool(post({ name: "read_recoup_page", arguments: readInput }));
  assert.equal(read.status, 200);
  assert.deepEqual(await read.json(), await readAgentContent(readInput));
  for (const name of ["search_recoup", "read_recoup_page"]) {
    await expectError(await handleAgentTool(post({ name, arguments: { unknown: "field" } })), 400, "INVALID_INPUT");
  }
});

test("tool dispatch rejects unknown tools, invalid envelopes, and incomplete utility inputs", async () => {
  await expectError(await handleAgentTool(post({ name: "submit_lead", arguments: {} })), 400, "UNKNOWN_TOOL");
  for (const body of [null, [], "hello", {}, { name: 2, arguments: {} }, { name: "estimate_workflow_roi", arguments: [] }, { ...roi, send: true }]) {
    await expectError(await handleAgentTool(post(body)), 400, "INVALID_INPUT");
  }
  const error = await expectError(await handleAgentTool(post({ name: "estimate_workflow_roi", arguments: {} })), 400, "INVALID_INPUT");
  assert.ok(error.error.issues.some((issue: { field: string }) => issue.field === "monthlyHours"));
  await expectError(await handleAgentTool(post({ name: "assess_workflow_readiness", arguments: { answers: {} } })), 400, "INVALID_INPUT");
});

test("tool bodies require JSON media, valid JSON, and valid UTF-8", async () => {
  await expectError(await handleAgentTool(post(roi, { "Content-Type": "text/plain" })), 415, "UNSUPPORTED_MEDIA_TYPE");
  await expectError(await handleAgentTool(new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json" } })), 400, "INVALID_JSON");
  for (const body of ["{", "{\"name\":", ""]) {
    await expectError(await handleAgentTool(new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json" }, body })), 400, "INVALID_JSON");
  }
  await expectError(await handleAgentTool(new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json" }, body: new Uint8Array([0xc3, 0x28]) })), 400, "INVALID_JSON");
  assert.equal((await handleAgentTool(post(roi, { "Content-Type": "application/json; charset=utf-8" }))).status, 200);
});

test("the 16 KB request limit is enforced on actual streamed bytes", async () => {
  const json = JSON.stringify(roi);
  const exact = new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json" }, body: json.padEnd(16_384, " ") });
  assert.equal((await handleAgentTool(exact)).status, 200);
  await expectError(await handleAgentTool(new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json", "Content-Length": "16385" }, body: "{}" })), 413, "BODY_TOO_LARGE");
  let canceled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array(8192));
      controller.enqueue(new Uint8Array(8192));
      controller.enqueue(new Uint8Array(1));
    },
    cancel() { canceled = true; },
  });
  const streamed = new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json", "Content-Length": "1" }, body: stream, duplex: "half" } as RequestInit & { duplex: "half" });
  await expectError(await handleAgentTool(streamed), 413, "BODY_TOO_LARGE");
  assert.equal(canceled, true);
  const unicode = JSON.stringify({ ...roi, padding: "🎵".repeat(4100) });
  assert.ok(unicode.length < 16_384);
  await expectError(await handleAgentTool(new Request(`${base}tools`, { method: "POST", headers: { "Content-Type": "application/json" }, body: unicode })), 413, "BODY_TOO_LARGE");
});

test("public tools do not fetch arbitrary URLs, read private IDs, or send project briefs", async context => {
  context.mock.method(globalThis, "fetch", async () => { assert.fail("Public content and utility handlers must not perform network requests"); });
  for (const id of ["https://outside.invalid/private", "file:///etc/passwd", "../private", "page:/../../private", "page:/designs/sky"]) {
    const response = await handleAgentTool(post({ name: "read_recoup_page", arguments: { id } }));
    assert.ok(response.status === 400 || response.status === 404);
    assert.ok((await response.json()).error);
  }
  const query = await handleAgentSearch(new Request(`${base}search?query=https%3A%2F%2Foutside.invalid`));
  assert.equal(query.status, 200);
  const response = await handleAgentTool(post({ name: "prepare_project_brief", arguments: { workflow: "Our finance team reconciles royalty reports by hand each month.", desiredOutcome: "Keep exceptions visible and reduce report preparation time." } }));
  assert.equal(response.status, 200);
  const receipt = await response.json();
  assert.equal(receipt.status, "draft");
  assert.equal(receipt.submitted, false);
  assert.equal(receipt.nextStep, "/contact");
  assert.equal(receipt.draft.interest, "Not sure yet");
  assert.ok(!("leadId" in receipt));
});

test("preflight and unexpected errors are bounded public responses without secret details", async () => {
  const options = agentOptions();
  assert.equal(options.status, 204);
  assert.equal(await options.text(), "");
  assert.equal(options.headers.get("access-control-allow-origin"), "*");
  assert.match(options.headers.get("access-control-allow-methods") || "", /POST/);
  assert.equal(options.headers.get("access-control-allow-credentials"), null);
  const error = await expectError(agentError(new Error("private internal exception")), 503, "UNAVAILABLE");
  assert.ok(!JSON.stringify(error).includes("private internal exception"));
});
