type InquiryFailure = {
  event: "inquiry_rejected" | "inquiry_failed";
  reason: "validation" | "blocked" | "unavailable" | "timeout" | "invalid_receipt";
  message: string;
};

/** Read only allowlisted codes; provider bodies and visitor details never become analytics props or UI copy. */
export async function readInquiryFailure(response: Response): Promise<InquiryFailure> {
  // A malformed 200 may already have been consumed by readInquiryReceipt.
  const body: unknown = response.status === 200 ? null : await response.json().catch(() => null);
  const code = body && typeof body === "object" && "ok" in body && body.ok === false && "code" in body ? body.code : undefined;
  if (response.status === 403 || response.status === 429 || (response.status === 400 && code === "blocked")) {
    return { event: "inquiry_rejected", reason: "blocked", message: "This submission was blocked. Your details are still here; try again or use the email option below." };
  }
  if ([400, 413, 415, 422].includes(response.status)) {
    return { event: "inquiry_rejected", reason: "validation", message: "Please check your email and required fields, then try again. Your details are still here." };
  }
  const reason = response.status >= 500 ? code === "timeout" ? "timeout" : "unavailable" : "invalid_receipt";
  return { event: "inquiry_failed", reason, message: "We couldn't confirm delivery. Your details are still here; try again or use the email option below." };
}
