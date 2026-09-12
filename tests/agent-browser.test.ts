import assert from "node:assert/strict";
import test from "node:test";
import { registerRecoupBrowserTools } from "../lib/agent-browser.ts";
import type { AgentDraft, BrowserModelContext } from "../lib/agent-browser.ts";
import { parseAgentDraft } from "../lib/agent-draft.ts";

type RegisteredTool = Parameters<BrowserModelContext["registerTool"]>[0];
const draft: AgentDraft = { interest: "Custom systems", message: "Prepare royalty reports with unresolved entries ready for review." };
const draftReceipt = { status: "draft", draft, submitted: false, nextStep: "/contact" };

async function harness(fetcher: typeof fetch) {
  const lifetime = new AbortController();
  const tools = new Map<string, RegisteredTool>();
  const receivedDrafts: AgentDraft[] = [];
  const registrationSignals: AbortSignal[] = [];
  const context: BrowserModelContext = {
    async registerTool(tool, options) {
      assert.ok(!tools.has(tool.name), "No duplicate registration within a mounted adapter");
      tools.set(tool.name, tool);
      registrationSignals.push(options.signal);
      options.signal.addEventListener("abort", () => tools.delete(tool.name), { once: true });
    },
  };
  await registerRecoupBrowserTools(context, { fetch: fetcher, onDraft: value => receivedDrafts.push(value), signal: lifetime.signal });
  function tool(name: string) {
    const entry = tools.get(name);
    assert.ok(entry, `Tool ${name} is registered`);
    return entry;
  }
  return { lifetime, tools, receivedDrafts, registrationSignals, tool };
}

test("browser tools register with cleanup signals and distinguish draft UI changes", async () => {
  const setup = await harness(async () => Response.json({ results: [] }));
  assert.equal(setup.tools.size, 5);
  assert.ok(setup.registrationSignals.every(signal => signal === setup.lifetime.signal));
  assert.equal(setup.tool("search_recoup").annotations.readOnlyHint, true);
  assert.equal(setup.tool("prepare_project_brief").annotations.readOnlyHint, false);
  setup.lifetime.abort();
  assert.equal(setup.tools.size, 0);
  assert.ok(setup.registrationSignals.every(signal => signal.aborted));
});

test("browser tool calls use the same-origin JSON endpoint and return objects without double encoding", async () => {
  const calls: unknown[] = [];
  const response = { results: [{ id: "/services", title: "Recoup services" }] };
  const setup = await harness(async (url, options) => {
    assert.equal(url, "/agent-api/v1/tools");
    assert.equal(options?.method, "POST");
    assert.equal(options?.credentials, "omit");
    assert.equal(new Headers(options?.headers).get("content-type"), "application/json");
    calls.push(JSON.parse(String(options?.body)));
    return Response.json(response);
  });
  const input = { query: "royalty reporting", type: "page", limit: 3 };
  const output = await setup.tool("search_recoup").execute(input);
  assert.deepEqual(calls, [{ name: "search_recoup", arguments: input }]);
  assert.deepEqual(output, response);
  assert.equal(typeof output, "object");
  assert.deepEqual(setup.receivedDrafts, []);
  setup.lifetime.abort();
});

test("completed brief preparation opens the draft before returning its explicit unsent receipt", async () => {
  const setup = await harness(async () => Response.json(draftReceipt));
  const result = await setup.tool("prepare_project_brief").execute({ workflow: "A repeated workflow", desiredOutcome: "A useful result" });
  assert.deepEqual(setup.receivedDrafts, [draft]);
  assert.equal(result.status, "draft");
  assert.equal(result.submitted, false);
  assert.equal(result.nextStep, "/contact");
  assert.equal(result.reviewAvailable, true);
  assert.match(String(result.handoff), /Nothing has been submitted/);
  setup.lifetime.abort();
});

test("an invocation canceled before execution makes no request and opens no draft", async () => {
  const setup = await harness(async () => { assert.fail("Canceled invocation must not fetch"); });
  const invocation = new AbortController();
  invocation.abort();
  await assert.rejects(setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal }), error => error instanceof DOMException && error.name === "AbortError");
  assert.deepEqual(setup.receivedDrafts, []);
  setup.lifetime.abort();
});

test("invocation cancellation reaches an in-flight request and never opens a draft", async () => {
  let observedSignal: AbortSignal | null = null;
  const setup = await harness(async (_url, options) => new Promise<Response>((_resolve, reject) => {
    observedSignal = options?.signal ?? null;
    assert.ok(observedSignal);
    observedSignal.addEventListener("abort", () => reject(observedSignal?.reason), { once: true });
  }));
  const invocation = new AbortController();
  const pending = setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal });
  invocation.abort();
  await assert.rejects(pending, error => error instanceof DOMException && error.name === "AbortError");
  assert.ok((observedSignal as AbortSignal | null)?.aborted);
  assert.deepEqual(setup.receivedDrafts, []);
  setup.lifetime.abort();
});

test("navigation cleanup cancels owned requests and blocks a stale invocation", async () => {
  let calls = 0;
  const setup = await harness(async (_url, options) => new Promise<Response>((_resolve, reject) => {
    calls++;
    const signal = options?.signal;
    assert.ok(signal);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  }));
  const prepare = setup.tool("prepare_project_brief");
  const pending = prepare.execute({});
  setup.lifetime.abort();
  await assert.rejects(pending, error => error instanceof DOMException && error.name === "AbortError");
  await assert.rejects(prepare.execute({}), error => error instanceof DOMException && error.name === "AbortError");
  assert.equal(calls, 1);
  assert.deepEqual(setup.receivedDrafts, []);
});

test("cancellation while decoding a response suppresses the visible draft even if fetch ignores abort", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | undefined;
  const body = new ReadableStream<Uint8Array>({ start(controller) { streamController = controller; } });
  const setup = await harness(async () => new Response(body, { headers: { "Content-Type": "application/json" } }));
  const invocation = new AbortController();
  const pending = setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal });
  invocation.abort();
  assert.ok(streamController);
  streamController.enqueue(new TextEncoder().encode(JSON.stringify(draftReceipt)));
  streamController.close();
  await assert.rejects(pending, error => error instanceof DOMException && error.name === "AbortError");
  assert.deepEqual(setup.receivedDrafts, []);
  setup.lifetime.abort();
});

test("HTTP errors and invalid JSON cannot announce a prepared draft", async () => {
  const errorBody = { error: { code: "INVALID_INPUT", message: "Complete the workflow description." } };
  const setup = await harness(async () => Response.json(errorBody, { status: 400 }));
  assert.deepEqual(await setup.tool("prepare_project_brief").execute({}), errorBody);
  assert.deepEqual(setup.receivedDrafts, []);
  setup.lifetime.abort();
  const malformed = await harness(async () => new Response("Not JSON", { status: 503 }));
  await assert.rejects(malformed.tool("prepare_project_brief").execute({}));
  assert.deepEqual(malformed.receivedDrafts, []);
  malformed.lifetime.abort();
});

test("a malformed success receipt cannot open a draft or claim a submission", async () => {
  for (const invalid of [
    { ...draftReceipt, draft: null },
    { ...draftReceipt, draft: { interest: "Custom systems", message: "short" } },
    { ...draftReceipt, submitted: true },
    { ...draftReceipt, nextStep: "https://outside.example/collect" },
    { ...draftReceipt, draft: { ...draft, interest: "Unknown" } },
  ]) {
    const setup = await harness(async () => Response.json(invalid));
    const result = await setup.tool("prepare_project_brief").execute({});
    assert.deepEqual(setup.receivedDrafts, []);
    assert.ok(result.error);
    assert.notEqual(result.status, "draft");
    setup.lifetime.abort();
  }
});

test("stored drafts must be complete, bounded, and expire within one hour", () => {
  const now = 2_000_000;
  const valid = { draft, expiresAt: now + 3_600_000 };
  assert.deepEqual(parseAgentDraft(JSON.stringify(valid), now), draft);
  assert.deepEqual(parseAgentDraft(JSON.stringify({ ...valid, expiresAt: now + 1 }), now), draft);
  for (const expiresAt of [now, now - 1, now + 3_600_001, "tomorrow", null]) assert.equal(parseAgentDraft(JSON.stringify({ ...valid, expiresAt }), now), null);
  for (const message of ["short", "x".repeat(5001), 20, null]) assert.equal(parseAgentDraft(JSON.stringify({ ...valid, draft: { ...draft, message } }), now), null);
  assert.equal(parseAgentDraft(JSON.stringify({ ...valid, draft: { ...draft, interest: "Unknown" } }), now), null);
  for (const serialized of [null, "", "{", "null", "[]", "{}", JSON.stringify({ expiresAt: now + 100 })]) assert.equal(parseAgentDraft(serialized, now), null);
  assert.deepEqual(parseAgentDraft(JSON.stringify({ ...valid, unrelated: "discard", draft: { ...draft, privateField: "discard" } }), now), draft);
});
