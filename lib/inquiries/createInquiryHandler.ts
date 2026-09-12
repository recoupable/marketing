import { createHash } from "node:crypto";
import { InquiryError } from "./InquiryError.ts";
import { readInquiryJson } from "./readInquiryJson.ts";
import { saveInquiry } from "./saveInquiry.ts";
import { validateInquiry } from "./validateInquiry.ts";

const MAX_PENDING_INQUIRIES = 128;

type InquiryOptions = {
  getApiUrl: () => string | undefined;
  fetch?: typeof fetch;
  now?: () => number;
};

/** Injectable transport keeps tests offline; configuration is read per request. */
export function createInquiryHandler(options: InquiryOptions) {
  const transport = options.fetch ?? fetch;
  const now = options.now ?? Date.now;
  // Coalesce simultaneous browser retries in this process; never store raw PII.
  const pending = new Map<string, Promise<void>>();

  return async function handleInquiry(request: Request): Promise<Response> {
    const headers = { "Cache-Control": "no-store" };
    try {
      const inquiry = validateInquiry(await readInquiryJson(request), now());
      const apiUrl = options.getApiUrl()?.trim();
      if (!apiUrl) throw InquiryError.unavailable();
      const fingerprint = createHash("sha256").update(JSON.stringify(inquiry)).digest("hex");
      let saving = pending.get(fingerprint);
      if (!saving) {
        if (pending.size >= MAX_PENDING_INQUIRIES) throw InquiryError.unavailable();
        saving = saveInquiry(inquiry, fingerprint, apiUrl, transport);
        pending.set(fingerprint, saving);
      }
      try {
        await saving;
      } finally {
        if (pending.get(fingerprint) === saving) pending.delete(fingerprint);
      }
      // The fingerprint doubles as the visitor-facing submission id: it is in
      // the CRM note, so analytics and the note can be joined without PII.
      return Response.json({ ok: true, submission_id: fingerprint }, { headers });
    } catch (error) {
      const status = error instanceof InquiryError ? error.status : 503;
      const message = error instanceof InquiryError ? error.message : InquiryError.unavailable().message;
      // Deliberately do not log request bodies, provider errors, or credentials.
      return Response.json({ ok: false, error: message }, { status, headers });
    }
  };
}
