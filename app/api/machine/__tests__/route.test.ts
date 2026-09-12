import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../route";

describe("GET /api/machine", () => {
  it("permanently redirects every request to /llms.txt regardless of path", async () => {
    for (const query of ["?path=/pricing", "?path=/does-not-exist", ""]) {
      const response = await GET(new NextRequest(`https://recoupable.dev/api/machine${query}`));
      expect(response.status, query).toBe(301);
      expect(new URL(response.headers.get("location")!, "https://recoupable.dev").pathname, query).toBe("/llms.txt");
    }
  });
});
