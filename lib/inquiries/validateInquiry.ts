import { validateLeadQualification, type LeadQualification } from "../lead-qualification.ts";
import { inquirySourceSchema, type InquirySource } from "../inquiry/inquirySourceSchema.ts";
import { InquiryError } from "./InquiryError.ts";
import { inquiryTextField } from "./inquiryTextField.ts";
import { validateInquiryEmail } from "./validateInquiryEmail.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  source: InquirySource;
  startedAt: number;
  qualification?: LeadQualification;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateInquiry(input: unknown, now = Date.now()): Inquiry {
  if (!isObject(input)) throw new InquiryError(400);
  if (input.website !== "") throw new InquiryError(400);
  const source = inquirySourceSchema.safeParse(input.source);
  if (!source.success) throw new InquiryError(400);
  let qualification: LeadQualification | undefined;
  if (Object.hasOwn(input, "qualification")) {
    try {
      qualification = validateLeadQualification(input.qualification);
    } catch {
      throw new InquiryError(400);
    }
  }
  const startedAt = input.startedAt;
  if (
    typeof startedAt !== "number" ||
    !Number.isSafeInteger(startedAt) ||
    startedAt > now + 5 * 60 * 1000 ||
    startedAt < now - DAY_MS
  )
    throw new InquiryError(400);

  return {
    name: inquiryTextField(input, "name", 1, 120),
    email: validateInquiryEmail(input),
    company: inquiryTextField(input, "company", 1, 160),
    interest: inquiryTextField(input, "interest", 1, 120),
    message: inquiryTextField(input, "message", 10, 6000, true),
    source: source.data,
    startedAt,
    ...(qualification ? { qualification } : {}),
  };
}
