import assert from "node:assert/strict";
import test from "node:test";
import { subscribeToRecoup } from "../lib/marketing-subscribe.ts";

test("newsletter signup uses the existing lead contract and only the opted-in fields", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (url, init) => {
    calls++;
    assert.equal(String(url).endsWith("/api/leads"), true);
    assert.equal(init?.method, "POST");
    assert.deepEqual(init?.headers, { "Content-Type": "application/json" });
    assert.deepEqual(JSON.parse(String(init?.body)), {
      kind: "subscribe", source: "/playbook", email: "reader@example.com", name: "Reader",
      utm_source: "website", utm_medium: "newsletter", utm_campaign: "ai-playbook",
    });
    return new Response(JSON.stringify({ status: "success", notified: false }), { status: 200 });
  };
  assert.deepEqual(await subscribeToRecoup({ source: "/playbook", email: " reader@example.com ", name: " Reader " }, fetcher), { ok: true });
  assert.equal(calls, 1);
});

test("name is optional and resource/newsletter attribution stays explicit", async () => {
  const fetcher: typeof fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    assert.equal("name" in body, false);
    assert.equal(body.source, "/resources");
    assert.equal(body.utm_campaign, "ai-music-notes");
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  };
  assert.deepEqual(await subscribeToRecoup({ source: "/resources", email: "reader@example.com", name: " " }, fetcher), { ok: true });
});

test("HTTP success without the stored-lead receipt cannot show a saved signup", async () => {
  for (const reply of [null, {}, { status: "error" }, { success: true }]) {
    const fetcher: typeof fetch = async () => new Response(JSON.stringify(reply), { status: 200 });
    assert.equal((await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, fetcher)).ok, false);
  }
});

test("unusual HTTP statuses, invalid responses, and transport errors stay retryable failures", async () => {
  const responses = [new Response(JSON.stringify({ status: "success" }), { status: 202 }), new Response(JSON.stringify({ status: "error" }), { status: 502 }), new Response("not JSON", { status: 200 })];
  for (const response of responses) {
    const fetcher: typeof fetch = async () => response;
    const result = await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, fetcher);
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /Please try again/);
  }
  const offline: typeof fetch = async () => { throw new Error("offline"); };
  assert.equal((await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, offline)).ok, false);
});

test("invalid input never reaches the lead endpoint", async () => {
  const fetcher: typeof fetch = async () => { assert.fail("No request expected"); };
  assert.equal((await subscribeToRecoup({ source: "/blog", email: "invalid" }, fetcher)).ok, false);
  assert.equal((await subscribeToRecoup({ source: "/blog", email: "reader@example.com", name: "x".repeat(101) }, fetcher)).ok, false);
});
