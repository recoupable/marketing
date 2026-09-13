import { describe, expect, it } from "vitest";
import { formatResponseBody } from "@/lib/docs/playground/formatResponseBody";

describe("formatResponseBody", () => {
  it("pretty prints JSON", () => {
    expect(formatResponseBody('{"a":1,"b":[1,2]}')).toEqual({ body: '{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}', isJson: true });
  });
  it("returns raw text when the body is not JSON", () => {
    expect(formatResponseBody("<html>nope</html>")).toEqual({ body: "<html>nope</html>", isJson: false });
  });
  it("keeps an empty body empty", () => {
    expect(formatResponseBody("")).toEqual({ body: "", isJson: false });
  });
});
