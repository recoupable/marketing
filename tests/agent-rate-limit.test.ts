import { afterEach, expect, test, vi } from "vitest";
import { checkRateLimit } from "@vercel/firewall";
import { withAgentRateLimit } from "../lib/agent-tools/withAgentRateLimit";
import { deprecationPolicyLink } from "../lib/agent-api/deprecationPolicyLink";

vi.mock("@vercel/firewall", () => ({ checkRateLimit: vi.fn() }));
afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});
const request = new Request(
  "https://recoupable.dev/agent-api/v1/search?query=royalty",
);

test("allowed requests expose the enforced policy without fabricated remaining counts", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValue({ rateLimited: false });
  const response = await withAgentRateLimit(request, async () =>
    Response.json({ ok: true }),
  );
  expect(response.status).toBe(200);
  expect(checkRateLimit).toHaveBeenCalledWith("recoup-public-tools", {
    request,
    timeout: 1500,
  });
  expect(response.headers.get("ratelimit-limit")).toBe("120");
  expect(response.headers.get("ratelimit-policy")).toContain("w=60");
  expect(response.headers.get("ratelimit-remaining")).toBeNull();
});

test("exhausted callers receive a recoverable 429 before tools run", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValue({ rateLimited: true });
  const run = vi.fn();
  const response = await withAgentRateLimit(request, run);
  expect(run).not.toHaveBeenCalled();
  expect(response.status).toBe(429);
  expect(response.headers.get("retry-after")).toBe("60");
  expect(response.headers.get("link")).toBe(deprecationPolicyLink);
  expect(response.headers.get("access-control-expose-headers")).toContain("Link");
  expect(response.headers.has("deprecation")).toBe(false);
  expect(response.headers.has("sunset")).toBe(false);
  expect((await response.json()).error.code).toBe("RATE_LIMITED");
});

test("failed rate checks stop execution without exposing provider details", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockRejectedValue(
    new Error("sensitive provider detail"),
  );
  const run = vi.fn();
  const response = await withAgentRateLimit(request, run);
  expect(run).not.toHaveBeenCalled();
  expect(response.status).toBe(503);
  expect(response.headers.get("link")).toBe(deprecationPolicyLink);
  expect(response.headers.get("access-control-expose-headers")).toContain("Link");
  expect(await response.text()).not.toContain("sensitive");
});

test("local development has no remote limiter or production quota claims", async () => {
  vi.stubEnv("VERCEL", "");
  const response = await withAgentRateLimit(request, async () =>
    Response.json({ ok: true }),
  );
  expect(checkRateLimit).not.toHaveBeenCalled();
  expect(response.headers.has("ratelimit-limit")).toBe(false);
});

test("a missing firewall rule cannot be mistaken for an enforced quota", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValue({
    rateLimited: false,
    error: "not-found",
  });
  const run = vi.fn();
  const response = await withAgentRateLimit(request, run);
  expect(run).not.toHaveBeenCalled();
  expect(response.status).toBe(503);
  expect(response.headers.has("ratelimit-limit")).toBe(false);
});

test("a returned firewall error cannot run tools and exposes retry guidance", async () => {
  vi.stubEnv("VERCEL", "1");
  vi.mocked(checkRateLimit).mockResolvedValue({
    rateLimited: false,
    error: "blocked",
  });
  const run = vi.fn();
  const response = await withAgentRateLimit(request, run);
  expect(run).not.toHaveBeenCalled();
  expect(response.status).toBe(503);
  expect(response.headers.get("access-control-expose-headers")).toContain(
    "Retry-After",
  );
});
