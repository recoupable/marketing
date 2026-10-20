import { readBoundedJson } from "../http/readBoundedJson.ts";
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
  return readBoundedJson(request, MAX_BODY_BYTES, status => new InquiryError(status));
}
