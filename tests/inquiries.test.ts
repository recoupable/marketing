import { test, expect } from "vitest";

// Node 24 strips TypeScript; dynamic URL keeps the app's bundler tsconfig intact.
const { createInquiryHandler }: typeof import("../lib/inquiries/createInquiryHandler") =
  await import(new URL("../lib/inquiries/createInquiryHandler.ts", import.meta.url).href);
const { validateInquiry }: typeof import("../lib/inquiries/validateInquiry") =
  await import(new URL("../lib/inquiries/validateInquiry.ts", import.meta.url).href);

const now = 1_800_000_000_000;
const valid = {
  name: "Taylor Example",
  email: "Taylor+music@example.com",
  company: "Example Music",
  interest: "Custom AI systems",
  message: "We want to make our catalog searchable.\nKeep this second line.",
  website: "",
  startedAt: now - 5_000,
  source: "/contact",
};

function request(
  body: unknown = valid,
  headers: Record<string, string> = {},
  url = "https://recoup.test/api/inquiries",
) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://recoup.test", ...headers },
    body: JSON.stringify(body),
  });
}

function mockedLeadApi(overrides: { failNote?: boolean } = {}) {
  const calls: { url: string; method: string; body: Record<string, unknown> | undefined }[] = [];
  const transport: typeof fetch = async (input, init) => {
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ url: String(input), method: init?.method ?? "GET", body });
        if (overrides.failNote) return Response.json({ error: "Private provider detail" }, { status: 500 });
    return Response.json({ status: "success" });
  };
  const handle = createInquiryHandler({ getApiUrl: () => "https://api.recoup.test/api", now: () => now, fetch: transport });
  return { calls, handle };
}

test("normalizes identity fields and preserves the project brief", () => {
  const result = validateInquiry({ ...valid, name: "  Taylor Example  " }, now);
  expect(result.name).toBe("Taylor Example");
  expect(result.email).toBe("taylor+music@example.com");
  expect(result.message).toBe(valid.message);
});

test("rejects malformed identity, oversized fields, bots, and stale forms", () => {
  for (const patch of [
    { email: "bad@" }, { email: "a..b@example.com" }, { email: "a@-example.com" },
    { name: "" }, { company: "x".repeat(161) }, { interest: null },
    { message: "short" }, { message: "x".repeat(6001) }, { name: "Taylor\nSpoof" },
    { website: "https://spam.test" }, { startedAt: now - 86_400_001 },
    { startedAt: now + 300_001 }, { startedAt: NaN }, { source: "/music-videos" }, { source: undefined },
  ]) expect(() => validateInquiry({ ...valid, ...patch }, now)).toThrow();
  expect(() => validateInquiry(null, now)).toThrow();
});

test("missing API configuration returns truthful unavailability without a CRM call", async () => {
  let calls = 0;
  const handle = createInquiryHandler({
    getApiUrl: () => undefined, now: () => now,
    fetch: async () => { calls++; throw new Error("Unexpected CRM call"); },
  });
  const response = await handle(request());
  expect(response.status).toBe(503);
  expect((await response.json()).ok).toBe(false);
  expect(calls).toBe(0);
});

test("rejects wrong content type, cross-origin requests, malformed JSON, and large streams", async () => {
  const { handle, calls } = mockedLeadApi();
  expect((await handle(request(valid, { "Content-Type": "text/plain" }))).status).toBe(415);
  expect((await handle(request(valid, { Origin: "https://other.test" }))).status).toBe(403);
  expect((await handle(request(valid, { Origin: "" }))).status).toBe(403);
  expect((await handle(request(valid, { "Content-Length": "40000" }))).status).toBe(413);
  expect((await handle(request({ ...valid, message: "x".repeat(33000) }))).status).toBe(413);
  const malformed = new Request("https://recoup.test/api/inquiries", {
    method: "POST", body: "{broken", headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
  });
  expect((await handle(malformed)).status).toBe(400);
  expect(calls.length).toBe(0);
});

test("only confirms after the central API confirms the inquiry was saved", async () => {
  const { handle, calls } = mockedLeadApi();
  const response = await handle(request());
  expect(response.status).toBe(200);
  const receipt = await response.json();
  expect(Object.keys(receipt).sort()).toEqual(["ok", "submission_id"]);
  expect(receipt.ok).toBe(true);
  expect(receipt.submission_id).toMatch(/^[a-f\d]{64}$/);
  expect(calls.length).toBe(1);
  expect(calls[0].url).toBe("https://api.recoup.test/api/leads");
  expect(calls[0].body?.kind).toBe("booking");
  expect(calls[0].body?.source).toBe("/contact");
  expect(calls[0].body?.email).toBe("taylor+music@example.com");
  expect(calls[0].body?.company).toBe("Example Music");
  expect(calls[0].body?.package).toBe("Custom AI systems");
  expect(String(calls[0].body?.message)).toMatch(/Keep this second line/);
  expect(response.headers.get("cache-control")).toBe("no-store");
});

test("a failed note write does not confirm success or disclose provider data", async () => {
  const { handle } = mockedLeadApi({ failNote: true });
  const response = await handle(request());
  expect(response.status).toBe(503);
  const text = await response.text();
  expect(text).toMatch(/"ok":false/);
  expect(text).not.toMatch(/Private provider detail|test-token|Taylor/);
});

test("coalesces simultaneous duplicate submissions in one process", async () => {
  const { handle, calls } = mockedLeadApi();
  const responses = await Promise.all([handle(request()), handle(request())]);
  expect(responses.map((response) => response.status)).toStrictEqual([200, 200]);
  expect(calls.filter((call) => call.method === "POST").length).toBe(1);
});

test("an unexpected or unavailable CRM response never reports success", async () => {
  for (const providerResponse of [
    () => Response.json({ data: { id: {} } }),
    () => Response.json({ error: "Private CRM error" }, { status: 429 }),
    () => { throw new TypeError("Private transport error"); },
  ]) {
    const handle = createInquiryHandler({
      getApiUrl: () => "https://api.recoup.test/api", now: () => now, fetch: async () => providerResponse(),
    });
    const response = await handle(request());
    expect(response.status).toBe(503);
    expect(await response.text()).not.toMatch(/Private/);
  }
});

test("accepts the public localhost alias when Next canonicalizes its request URL", async () => {
  const handle = createInquiryHandler({ getApiUrl: () => undefined, now: () => now });
  const response = await handle(request(valid, {
    Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000",
  }, "http://localhost:3000/api/inquiries"));
  // Reaches the credential check; no live transport is invoked.
  expect(response.status).toBe(503);
  expect((await response.json()).error).toMatch(/couldn't save/);
});

test("accepts a Vercel custom domain using its public Host and forwarded URL protocol", async () => {
  const { handle } = mockedLeadApi();
  const response = await handle(request(valid, {
    Host: "recoupable.dev", Origin: "https://recoupable.dev",
    "X-Forwarded-Host": "recoupable.dev", "X-Forwarded-Proto": "https",
  }, "https://deployment.vercel.app/api/inquiries"));
  expect(response.status).toBe(200);
});

test("public Host matching still rejects foreign origins, ports, schemes, and spoofed forwarded hosts", async () => {
  const { handle, calls } = mockedLeadApi();
  const scenarios: Record<string, string>[] = [
    { Host: "127.0.0.1:3000", Origin: "http://localhost:3000" },
    { Host: "recoup.test", Origin: "https://other.test", "X-Forwarded-Host": "other.test" },
    { Host: "recoup.test", Origin: "https://recoup.test:444" },
    { Host: "recoup.test", Origin: "http://recoup.test" },
    { Host: "recoup.test@other.test", Origin: "https://other.test" },
    { Host: "recoup.test", Origin: "https://recoup.test", "Sec-Fetch-Site": "cross-site" },
  ];
  for (const headers of scenarios) {
    expect((await handle(request(valid, headers))).status).toBe(403);
  }
  expect(calls.length).toBe(0);
});
