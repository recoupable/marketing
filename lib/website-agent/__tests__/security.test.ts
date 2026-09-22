import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { readGrant, signGrant } from "../tokens";
import { POST, GET } from "../../../app/api/website-agent/[...path]/route";
vi.mock("../allowRequest", () => ({ allowRequest: vi.fn(async () => true) }));
beforeEach(() =>
  vi.stubEnv(
    "WEBSITE_AGENT_SECRET",
    "test-only-secret-with-at-least-32-characters",
  ),
);
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
const grant = () => ({
  purpose: "session" as const,
  principal: "visitor-a",
  session: "session-a",
  expires: Date.now() + 60000,
});
const context = (path: string) => ({
  params: Promise.resolve({ path: path.split("/") }),
});
describe("website agent isolation", () => {
  it("allows a new answer to steer the visitor's running conversation", async () => {
    const upstream = vi.fn(async () =>
      Response.json({ accepted: true }, { status: 202 }),
    );
    vi.stubGlobal("fetch", upstream);
    const response = await POST(
      new NextRequest(
        "http://localhost:3017/api/website-agent/eve/v1/session/session-a",
        {
          method: "POST",
          headers: {
            origin: "http://localhost:3017",
            cookie: `recoup_website_session=${signGrant(grant())}`,
          },
          body: JSON.stringify({
            message: "Individual tools",
            turnPolicy: "steer",
            model: "discard",
            inputResponses: [{ approved: true }],
          }),
        },
      ),
      context("eve/v1/session/session-a"),
    );
    expect(response.status).toBe(202);
    expect(
      JSON.parse(
        (upstream.mock.calls[0] as unknown as [URL, RequestInit])[1]
          .body as string,
      ),
    ).toEqual({
      message: "Individual tools",
      turnPolicy: "steer",
      clientContext: { entryMode: "planner" },
    });
  });
  it("rejects unsupported execution settings", async () => {
    const upstream = vi.fn();
    vi.stubGlobal("fetch", upstream);
    const response = await POST(
      new NextRequest(
        "http://localhost:3017/api/website-agent/eve/v1/session/session-a",
        {
          method: "POST",
          headers: {
            origin: "http://localhost:3017",
            cookie: `recoup_website_session=${signGrant(grant())}`,
          },
          body: JSON.stringify({ message: "hello", turnPolicy: "override" }),
        },
      ),
      context("eve/v1/session/session-a"),
    );
    expect(response.status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("rejects expired, altered and wrong-purpose grants", () => {
    const token = signGrant(grant());
    expect(readGrant(token, "session")?.session).toBe("session-a");
    expect(readGrant(token + "x", "session")).toBeNull();
    expect(readGrant(token, "internal")).toBeNull();
    expect(
      readGrant(signGrant({ ...grant(), expires: 1 }), "session"),
    ).toBeNull();
  });
  it("rejects other origins before contacting Eve", async () => {
    const response = await POST(
      new NextRequest(
        "http://localhost:3017/api/website-agent/eve/v1/session",
        {
          method: "POST",
          headers: { origin: "https://attacker.test" },
          body: JSON.stringify({ message: "hello" }),
        },
      ),
      context("eve/v1/session"),
    );
    expect(response.status).toBe(403);
  });
  it("rejects access to a different visitor's session", async () => {
    const response = await GET(
      new NextRequest(
        "http://localhost:3017/api/website-agent/eve/v1/session/session-b/stream",
        { headers: { cookie: `recoup_website_session=${signGrant(grant())}` } },
      ),
      context("eve/v1/session/session-b/stream"),
    );
    expect(response.status).toBe(403);
  });
  it("does not forward approval, model or arbitrary context", async () => {
    const upstream = vi.fn(async () =>
      Response.json({ sessionId: "new-session" }, { status: 202 }),
    );
    vi.stubGlobal("fetch", upstream);
    const response = await POST(
      new NextRequest(
        "http://localhost:3017/api/website-agent/eve/v1/session",
        {
          method: "POST",
          headers: { origin: "http://localhost:3017" },
          body: JSON.stringify({
            message: "hello",
            model: "expensive",
            inputResponses: [{ approved: true }],
            clientContext: { entryMode: "faq", privateData: "discard" },
          }),
        },
      ),
      context("eve/v1/session"),
    );
    expect(response.status).toBe(202);
    expect(
      JSON.parse(
        (upstream.mock.calls[0] as unknown as [URL, RequestInit])[1]
          .body as string,
      ),
    ).toEqual({ message: "hello", clientContext: { entryMode: "faq" } });
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
  });
});
