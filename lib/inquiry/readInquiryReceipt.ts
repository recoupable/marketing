export type InquiryReceipt = { submissionId: string };

/**
 * The endpoint returns exactly `{ ok: true, submission_id }` after saving or
 * recognizing a saved retry; anything else is not a delivery.
 */
export async function readInquiryReceipt(response: Response): Promise<InquiryReceipt | null> {
  const type = response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (response.status !== 200 || type !== "application/json") return null;
  try {
    const receipt: unknown = await response.json();
    if (!receipt || typeof receipt !== "object" || Array.isArray(receipt)) return null;
    if (Object.keys(receipt).sort().join() !== "ok,submission_id") return null;
    const { ok, submission_id } = receipt as Record<string, unknown>;
    if (ok !== true || typeof submission_id !== "string" || !/^[a-f\d]{64}$/.test(submission_id)) return null;
    return { submissionId: submission_id };
  } catch {
    return null;
  }
}
