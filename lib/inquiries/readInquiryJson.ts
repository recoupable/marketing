import { InquiryError } from "./InquiryError.ts";

const MAX_BODY_BYTES = 32 * 1024;

function expectedOrigin(request: Request): string {
  try {
    const requestUrl = new URL(request.url);
    // Next may use its configured hostname in request.url (e.g. localhost for
    // a 127.0.0.1 request). Host preserves the public destination on Vercel too.
    // Next already derives request.url's protocol from the forwarded protocol.
    // https://vercel.com/docs/headers/request-headers#host
    const host = request.headers.get("host") ?? requestUrl.host;
    if (!host || /[\s\\/@?#,]/u.test(host) || !["http:", "https:"].includes(requestUrl.protocol)) throw new InquiryError(403);
    return new URL(`${requestUrl.protocol}//${host}`).origin;
  } catch {
    throw new InquiryError(403);
  }
}

/** Same-origin JSON only, streamed with a hard byte cap. */
export async function readInquiryJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") throw new InquiryError(415);
  const origin = request.headers.get("origin");
  if (!origin || origin !== expectedOrigin(request) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new InquiryError(403);
  }
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
