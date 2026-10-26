import { expect, it } from "vitest";
import { docsUrl } from "../docsUrl.ts";

it("builds documentation-site URLs", () => {
  expect(docsUrl()).toBe("https://docs.recoupable.dev");
  expect(docsUrl("/api-reference/artists/list")).toBe("https://docs.recoupable.dev/api-reference/artists/list");
});
