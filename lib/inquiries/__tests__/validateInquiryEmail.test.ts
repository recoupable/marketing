import { describe, expect, it } from "vitest";
import { validateInquiryEmail } from "../validateInquiryEmail";

describe("validateInquiryEmail", () => {
  it("validates the address as entered and only then lowercases it", () => {
    expect(validateInquiryEmail({ email: " Taylor+Music@Example.com " })).toBe("taylor+music@example.com");
  });
  it("rejects non-ASCII letters even when lowercasing would fold them into ASCII", () => {
    // U+212A KELVIN SIGN lowercases to ASCII "k"; validating after folding would
    // accept a mailbox the visitor never typed.
    expect(() => validateInquiryEmail({ email: "Kelvin@example.com" })).toThrow();
    expect(() => validateInquiryEmail({ email: "taylor@Kelvin.com" })).toThrow();
  });
  it("still rejects malformed addresses", () => {
    for (const email of ["bad@", "a..b@example.com", "a@-example.com", "two@@example.com"]) {
      expect(() => validateInquiryEmail({ email })).toThrow();
    }
  });
});
