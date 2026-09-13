import { test, expect } from "vitest";
import { subscribeToRecoup } from "../lib/marketing-subscribe.ts";

test("newsletter signup uses the existing lead contract and only the opted-in fields", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (url, init) => {
    calls++;
    expect(String(url).endsWith("/api/leads")).toBe(true);
    expect(init?.method).toBe("POST");
    expect(init?.headers).toStrictEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(String(init?.body))).toStrictEqual({
      kind: "subscribe", source: "/playbook", email: "reader@example.com", name: "Reader",
      utm_source: "website", utm_medium: "newsletter", utm_campaign: "ai-playbook",
    });
    return new Response(JSON.stringify({ status: "success", notified: false }), { status: 200 });
  };
  expect(await subscribeToRecoup({ source: "/playbook", email: " reader@example.com ", name: " Reader " }, fetcher)).toStrictEqual({ ok: true });
  expect(calls).toBe(1);
});

test("name is optional and resource/newsletter attribution stays explicit", async () => {
  const fetcher: typeof fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    expect("name" in body).toBe(false);
    expect(body.source).toBe("/resources");
    expect(body.utm_campaign).toBe("ai-music-notes");
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  };
  expect(await subscribeToRecoup({ source: "/resources", email: "reader@example.com", name: " " }, fetcher)).toStrictEqual({ ok: true });
});

test("HTTP success without the stored-lead receipt cannot show a saved signup", async () => {
  for (const reply of [null, {}, { status: "error" }, { success: true }]) {
    const fetcher: typeof fetch = async () => new Response(JSON.stringify(reply), { status: 200 });
    expect((await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, fetcher)).ok).toBe(false);
  }
});

test("unusual HTTP statuses, invalid responses, and transport errors stay retryable failures", async () => {
  const responses = [new Response(JSON.stringify({ status: "success" }), { status: 202 }), new Response(JSON.stringify({ status: "error" }), { status: 502 }), new Response("not JSON", { status: 200 })];
  for (const response of responses) {
    const fetcher: typeof fetch = async () => response;
    const result = await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, fetcher);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/Please try again/);
  }
  const offline: typeof fetch = async () => { throw new Error("offline"); };
  expect((await subscribeToRecoup({ source: "/blog", email: "reader@example.com" }, offline)).ok).toBe(false);
});

test("invalid input never reaches the lead endpoint", async () => {
  const fetcher: typeof fetch = async () => { expect.unreachable("No request expected"); };
  expect((await subscribeToRecoup({ source: "/blog", email: "invalid" }, fetcher)).ok).toBe(false);
  expect((await subscribeToRecoup({ source: "/blog", email: "reader@example.com", name: "x".repeat(101) }, fetcher)).ok).toBe(false);
});


test("footer signup captures only email and preserves campaign attribution", async () => {
  const fetcher: typeof fetch = async (_url, init) => {
    expect(JSON.parse(String(init?.body))).toStrictEqual({
      kind: "subscribe", source: "/footer", email: "reader@example.com",
      utm_source: "linkedin", utm_medium: "social", utm_campaign: "music-insights",
    });
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  };
  expect(await subscribeToRecoup({ source: "/footer", email: " reader@example.com ", attribution: { current: { utm_source: "linkedin", utm_medium: "social", utm_campaign: "music-insights" } } }, fetcher)).toStrictEqual({ ok: true });
});
