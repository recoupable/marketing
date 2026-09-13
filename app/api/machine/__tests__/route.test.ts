import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT } from "../route";

describe("GET /api/machine", () => {
  it("permanently redirects every request to /llms.txt regardless of path", async () => {
    for (const query of ["?path=/pricing", "?path=/does-not-exist", ""]) {
      const response = await GET(new NextRequest(`https://recoupable.dev/api/machine${query}`));
      expect(response.status, query).toBe(301);
      expect(new URL(response.headers.get("location")!, "https://recoupable.dev").pathname, query).toBe("/llms.txt");
    }
  });

  it("redirects every method the same way", async () => {
    for (const [name, handler] of Object.entries({ HEAD, POST, PUT, PATCH, DELETE, OPTIONS })) {
      const response = await handler(new NextRequest("https://recoupable.dev/api/machine?path=/pricing", { method: name }));
      expect(response.status, name).toBe(301);
      expect(new URL(response.headers.get("location")!, "https://recoupable.dev").pathname, name).toBe("/llms.txt");
    }
  });
});
