import { InquiryError } from "./InquiryError.ts";
import { inquiryTextField } from "./inquiryTextField.ts";

/** Validates the address exactly as typed; the ASCII-only result is lowercased for the CRM. */
export function validateInquiryEmail(input: Record<string, unknown>): string {
  const email = inquiryTextField(input, "email", 3, 254);
  const [local, domain, extra] = email.split("@");
  if (
    extra !== undefined ||
    !local ||
    local.length > 64 ||
    !domain ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !domain.includes(".") ||
    !domain.split(".").every((part) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(part))
  )
    throw new InquiryError(400);
  return email.toLowerCase();
}
