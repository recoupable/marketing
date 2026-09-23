import { describe, expect, it } from "vitest";
import { validatePlaygroundBody } from "@/lib/docs/playground/validatePlaygroundBody";

const json = { contentType: "application/json", example: "{}", required: true };

describe("validatePlaygroundBody", () => {
  it("blocks a blank body when the operation requires one", () => {
    expect(validatePlaygroundBody(json, "  ")).toBe("This operation needs a request body.");
  });
  it("allows a blank optional body", () => {
    expect(validatePlaygroundBody({ ...json, required: false }, "")).toBeNull();
  });
  it("explains invalid JSON", () => {
    expect(validatePlaygroundBody(json, "{oops")).toMatch(/^Request body is not valid JSON: /);
  });
  it("accepts valid JSON and leaves non-JSON content types alone", () => {
    expect(validatePlaygroundBody(json, '{"a":1}')).toBeNull();
    expect(validatePlaygroundBody({ contentType: "text/plain", required: true }, "hello")).toBeNull();
  });
});
