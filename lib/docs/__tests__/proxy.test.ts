import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const request = (path: string, accept?: string) => new NextRequest(`https://recoupable.dev${path}`, { headers: accept ? { accept } : {} });

describe("proxy", () => {
  it("rewrites markdown requests to the raw handler", () => {
    const response = proxy(request("/docs/quickstart", "text/markdown"));
    expect(response.headers.get("x-middleware-rewrite")).toBe("https://recoupable.dev/docs/raw/quickstart.md");
    expect(proxy(request("/docs/quickstart.md")).headers.get("x-middleware-rewrite")).toBe("https://recoupable.dev/docs/raw/quickstart.md");
  });

  it("passes browser requests through with Vary: Accept", () => {
    const response = proxy(request("/docs/quickstart", "text/html,*/*;q=0.8"));
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("vary")).toBe("Accept");
  });
});
