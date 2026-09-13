import { test, expect } from "vitest";
import { ok } from "./support/ok.ts";
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
      expect(!tools.has(tool.name), "No duplicate registration within a mounted adapter").toBeTruthy();
      tools.set(tool.name, tool);
      registrationSignals.push(options.signal);
      options.signal.addEventListener("abort", () => tools.delete(tool.name), { once: true });
    },
  };
  await registerRecoupBrowserTools(context, { fetch: fetcher, onDraft: value => receivedDrafts.push(value), signal: lifetime.signal });
  function tool(name: string) {
    const entry = tools.get(name);
    ok(entry, `Tool ${name} is registered`);
    return entry;
  }
  return { lifetime, tools, receivedDrafts, registrationSignals, tool };
}

test("browser tools register with cleanup signals and distinguish draft UI changes", async () => {
  const setup = await harness(async () => Response.json({ results: [] }));
  expect(setup.tools.size).toBe(5);
  expect(setup.registrationSignals.every(signal => signal === setup.lifetime.signal)).toBeTruthy();
  expect(setup.tool("search_recoup").annotations.readOnlyHint).toBe(true);
  expect(setup.tool("prepare_project_brief").annotations.readOnlyHint).toBe(false);
  setup.lifetime.abort();
  expect(setup.tools.size).toBe(0);
  expect(setup.registrationSignals.every(signal => signal.aborted)).toBeTruthy();
});

test("browser tool calls use the same-origin JSON endpoint and return objects without double encoding", async () => {
  const calls: unknown[] = [];
  const response = { results: [{ id: "/services", title: "Recoup services" }] };
  const setup = await harness(async (url, options) => {
    expect(url).toBe("/agent-api/v1/tools");
    expect(options?.method).toBe("POST");
    expect(options?.credentials).toBe("omit");
    expect(new Headers(options?.headers).get("content-type")).toBe("application/json");
    calls.push(JSON.parse(String(options?.body)));
    return Response.json(response);
  });
  const input = { query: "royalty reporting", type: "page", limit: 3 };
  const output = await setup.tool("search_recoup").execute(input);
  expect(calls).toStrictEqual([{ name: "search_recoup", arguments: input }]);
  expect(output).toStrictEqual(response);
  expect(typeof output).toBe("object");
  expect(setup.receivedDrafts).toStrictEqual([]);
  setup.lifetime.abort();
});

test("completed brief preparation opens the draft before returning its explicit unsent receipt", async () => {
  const setup = await harness(async () => Response.json(draftReceipt));
  const result = await setup.tool("prepare_project_brief").execute({ workflow: "A repeated workflow", desiredOutcome: "A useful result" });
  expect(setup.receivedDrafts).toStrictEqual([draft]);
  expect(result.status).toBe("draft");
  expect(result.submitted).toBe(false);
  expect(result.nextStep).toBe("/contact");
  expect(result.reviewAvailable).toBe(true);
  expect(String(result.handoff)).toMatch(/Nothing has been submitted/);
  setup.lifetime.abort();
});

test("an invocation canceled before execution makes no request and opens no draft", async () => {
  const setup = await harness(async () => { expect.unreachable("Canceled invocation must not fetch"); });
  const invocation = new AbortController();
  invocation.abort();
  await expect(setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal })).rejects.toSatisfy(error => error instanceof DOMException && error.name === "AbortError");
  expect(setup.receivedDrafts).toStrictEqual([]);
  setup.lifetime.abort();
});

test("invocation cancellation reaches an in-flight request and never opens a draft", async () => {
  let observedSignal: AbortSignal | null = null;
  const setup = await harness(async (_url, options) => new Promise<Response>((_resolve, reject) => {
    observedSignal = options?.signal ?? null;
    ok(observedSignal);
    observedSignal.addEventListener("abort", () => reject(observedSignal?.reason), { once: true });
  }));
  const invocation = new AbortController();
  const pending = setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal });
  invocation.abort();
  await expect(pending).rejects.toSatisfy(error => error instanceof DOMException && error.name === "AbortError");
  expect((observedSignal as AbortSignal | null)?.aborted).toBeTruthy();
  expect(setup.receivedDrafts).toStrictEqual([]);
  setup.lifetime.abort();
});

test("navigation cleanup cancels owned requests and blocks a stale invocation", async () => {
  let calls = 0;
  const setup = await harness(async (_url, options) => new Promise<Response>((_resolve, reject) => {
    calls++;
    const signal = options?.signal;
    ok(signal);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  }));
  const prepare = setup.tool("prepare_project_brief");
  const pending = prepare.execute({});
  setup.lifetime.abort();
  await expect(pending).rejects.toSatisfy(error => error instanceof DOMException && error.name === "AbortError");
  await expect(prepare.execute({})).rejects.toSatisfy(error => error instanceof DOMException && error.name === "AbortError");
  expect(calls).toBe(1);
  expect(setup.receivedDrafts).toStrictEqual([]);
});

test("cancellation while decoding a response suppresses the visible draft even if fetch ignores abort", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | undefined;
  const body = new ReadableStream<Uint8Array>({ start(controller) { streamController = controller; } });
  const setup = await harness(async () => new Response(body, { headers: { "Content-Type": "application/json" } }));
  const invocation = new AbortController();
  const pending = setup.tool("prepare_project_brief").execute({}, { signal: invocation.signal });
  invocation.abort();
  ok(streamController);
  streamController.enqueue(new TextEncoder().encode(JSON.stringify(draftReceipt)));
  streamController.close();
  await expect(pending).rejects.toSatisfy(error => error instanceof DOMException && error.name === "AbortError");
  expect(setup.receivedDrafts).toStrictEqual([]);
  setup.lifetime.abort();
});

test("HTTP errors and invalid JSON cannot announce a prepared draft", async () => {
  const errorBody = { error: { code: "INVALID_INPUT", message: "Complete the workflow description." } };
  const setup = await harness(async () => Response.json(errorBody, { status: 400 }));
  expect(await setup.tool("prepare_project_brief").execute({})).toStrictEqual(errorBody);
  expect(setup.receivedDrafts).toStrictEqual([]);
  setup.lifetime.abort();
  const malformed = await harness(async () => new Response("Not JSON", { status: 503 }));
  await expect(malformed.tool("prepare_project_brief").execute({})).rejects.toThrow();
  expect(malformed.receivedDrafts).toStrictEqual([]);
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
    expect(setup.receivedDrafts).toStrictEqual([]);
    expect(result.error).toBeTruthy();
    expect(result.status).not.toBe("draft");
    setup.lifetime.abort();
  }
});

test("stored drafts must be complete, bounded, and expire within one hour", () => {
  const now = 2_000_000;
  const valid = { draft, expiresAt: now + 3_600_000 };
  expect(parseAgentDraft(JSON.stringify(valid), now)).toStrictEqual(draft);
  expect(parseAgentDraft(JSON.stringify({ ...valid, expiresAt: now + 1 }), now)).toStrictEqual(draft);
  for (const expiresAt of [now, now - 1, now + 3_600_001, "tomorrow", null]) expect(parseAgentDraft(JSON.stringify({ ...valid, expiresAt }), now)).toBe(null);
  for (const message of ["short", "x".repeat(5001), 20, null]) expect(parseAgentDraft(JSON.stringify({ ...valid, draft: { ...draft, message } }), now)).toBe(null);
  expect(parseAgentDraft(JSON.stringify({ ...valid, draft: { ...draft, interest: "Unknown" } }), now)).toBe(null);
  for (const serialized of [null, "", "{", "null", "[]", "{}", JSON.stringify({ expiresAt: now + 100 })]) expect(parseAgentDraft(serialized, now)).toBe(null);
  expect(parseAgentDraft(JSON.stringify({ ...valid, unrelated: "discard", draft: { ...draft, privateField: "discard" } }), now)).toStrictEqual(draft);
});
