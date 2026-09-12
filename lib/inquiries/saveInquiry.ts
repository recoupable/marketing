import { leadQualificationEntries } from "../lead-qualification.ts";
import { InquiryError } from "./InquiryError.ts";
import type { Inquiry } from "./validateInquiry.ts";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** CRM writes belong to the central api; qualification rides in the message it persists. */
export async function saveInquiry(inquiry: Inquiry, fingerprint: string, apiUrl: string, transport: typeof fetch): Promise<void> {
  const message = [
    inquiry.message,
    ...(inquiry.qualification ? leadQualificationEntries(inquiry.qualification).map(([label, value]) => `${label}: ${value}`) : []),
    `Submission ID: ${fingerprint}`,
  ].join("\n\n");
  const response = await transport(`${apiUrl.replace(/\/$/, "")}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind: "booking", source: inquiry.source,
      name: inquiry.name, email: inquiry.email, company: inquiry.company,
      package: inquiry.interest, message,
    }),
    cache: "no-store", redirect: "error", signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw InquiryError.unavailable();
  const result: unknown = await response.json();
  if (!isObject(result) || result.status !== "success") throw InquiryError.unavailable();
}
