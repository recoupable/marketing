import { createHash } from "node:crypto";
import { leadQualificationEntries, validateLeadQualification, type LeadQualification } from "./lead-qualification.ts";

const MAX_BODY_BYTES = 32 * 1024;
const MAX_PENDING_INQUIRIES = 128;
const DAY_MS = 24 * 60 * 60 * 1000;
const INVALID_MESSAGE = "Please check your details and try again.";
const UNAVAILABLE_MESSAGE =
  "We couldn't save your inquiry. Please try again, or email hi@recoupable.dev.";

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  startedAt: number;
  qualification?: LeadQualification;
};

type InquiryOptions = {
  getApiUrl: () => string | undefined;
  fetch?: typeof fetch;
  now?: () => number;
};

class InquiryError extends Error {
  readonly status: number;

  constructor(status: number, message = INVALID_MESSAGE) {
    super(message);
    this.status = status;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textField(
  input: Record<string, unknown>,
  field: string,
  min: number,
  max: number,
  multiline = false,
): string {
  const value = input[field];
  if (typeof value !== "string") throw new InquiryError(400);
  const text = value.trim();
  // Keep the submitted brief intact; reject control characters, not punctuation.
  const invalidControl = multiline
    ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u
    : /[\u0000-\u001f\u007f]/u;
  if (text.length < min || text.length > max || invalidControl.test(text)) {
    throw new InquiryError(400);
  }
  return text;
}

export function validateInquiry(input: unknown, now = Date.now()): Inquiry {
  if (!isObject(input)) throw new InquiryError(400);
  if (input.website !== "") throw new InquiryError(400);
  let qualification: LeadQualification | undefined;
  if (Object.hasOwn(input, "qualification")) {
    try {
      qualification = validateLeadQualification(input.qualification);
    } catch {
      throw new InquiryError(400);
    }
  }

  const email = textField(input, "email", 3, 254).toLowerCase();
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
    !domain
      .split(".")
      .every((part) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(part))
  )
    throw new InquiryError(400);

  const startedAt = input.startedAt;
  if (
    typeof startedAt !== "number" ||
    !Number.isSafeInteger(startedAt) ||
    startedAt > now + 5 * 60 * 1000 ||
    startedAt < now - DAY_MS
  )
    throw new InquiryError(400);

  return {
    name: textField(input, "name", 1, 120),
    email,
    company: textField(input, "company", 1, 160),
    interest: textField(input, "interest", 1, 120),
    message: textField(input, "message", 10, 6000, true),
    startedAt,
    ...(qualification ? { qualification } : {}),
  };
}

async function readJson(request: Request): Promise<unknown> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") throw new InquiryError(415);
  const origin = request.headers.get("origin");
  let expectedOrigin: string;
  try {
    const requestUrl = new URL(request.url);
    // Next may use its configured hostname in request.url (e.g. localhost for
    // a 127.0.0.1 request). Host preserves the public destination on Vercel too.
    // Next already derives request.url's protocol from the forwarded protocol.
    // https://vercel.com/docs/headers/request-headers#host
    const host = request.headers.get("host") ?? requestUrl.host;
    if (
      !host || /[\s\\/@?#,]/u.test(host) ||
      !["http:", "https:"].includes(requestUrl.protocol)
    ) throw new InquiryError(403);
    expectedOrigin = new URL(`${requestUrl.protocol}//${host}`).origin;
  } catch {
    throw new InquiryError(403);
  }
  if (
    !origin ||
    origin !== expectedOrigin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    throw new InquiryError(403);

  const length = request.headers.get("content-length");
  if (length !== null) {
    if (!/^\d+$/.test(length)) throw new InquiryError(400);
    if (Number(length) > MAX_BODY_BYTES) throw new InquiryError(413);
  }
  if (!request.body) throw new InquiryError(400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => undefined);
        throw new InquiryError(413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body) as unknown;
  } catch (error) {
    if (error instanceof InquiryError) throw error;
    throw new InquiryError(400);
  } finally {
    reader.releaseLock();
  }
}

async function saveInquiry(
  inquiry: Inquiry, fingerprint: string, apiUrl: string, transport: typeof fetch,
): Promise<void> {
  // CRM writes belong to the central API. Keep qualification in its supported
  // message field so budget, company size, and timeline survive schema parsing.
  const message = [
    inquiry.message,
    ...(inquiry.qualification ? leadQualificationEntries(inquiry.qualification)
      .map(([label, value]) => `${label}: ${value}`) : []),
    `Submission ID: ${fingerprint}`,
  ].join("\n\n");
  const response = await transport(`${apiUrl.replace(/\/$/, "")}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "booking", source: inquiry.qualification ? "/start-project" : "/contact",
      name: inquiry.name, email: inquiry.email, company: inquiry.company,
      package: inquiry.interest, message }),
    cache: "no-store", redirect: "error", signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new InquiryError(503, UNAVAILABLE_MESSAGE);
  const result: unknown = await response.json();
  if (!isObject(result) || result.status !== "success") throw new InquiryError(503, UNAVAILABLE_MESSAGE);
}

/** Injectable transport keeps tests offline; configuration is read per request. */
export function createInquiryHandler(options: InquiryOptions) {
  const transport = options.fetch ?? fetch;
  const now = options.now ?? Date.now;
  // Coalesce simultaneous browser retries in this process; never store raw PII.
  const pending = new Map<string, Promise<void>>();

  return async function handleInquiry(request: Request): Promise<Response> {
    const headers = { "Cache-Control": "no-store" };
    try {
      const inquiry = validateInquiry(await readJson(request), now());
      const apiUrl = options.getApiUrl()?.trim();
      if (!apiUrl) throw new InquiryError(503, UNAVAILABLE_MESSAGE);
      const fingerprint = createHash("sha256")
        .update(JSON.stringify(inquiry))
        .digest("hex");
      let saving = pending.get(fingerprint);
      if (!saving) {
        if (pending.size >= MAX_PENDING_INQUIRIES)
          throw new InquiryError(503, UNAVAILABLE_MESSAGE);
        saving = saveInquiry(inquiry, fingerprint, apiUrl, transport);
        pending.set(fingerprint, saving);
      }
      try {
        await saving;
      } finally {
        if (pending.get(fingerprint) === saving) pending.delete(fingerprint);
      }
      return Response.json({ ok: true }, { headers });
    } catch (error) {
      const status = error instanceof InquiryError ? error.status : 503;
      const message =
        error instanceof InquiryError ? error.message : UNAVAILABLE_MESSAGE;
      // Deliberately do not log request bodies, provider errors, or credentials.
      return Response.json({ ok: false, error: message }, { status, headers });
    }
  };
}
