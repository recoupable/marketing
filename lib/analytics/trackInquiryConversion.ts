type MeasurementQueue = (
  command: "measure",
  event: "lead_created",
  data: { type: "customer_action" },
  options: { event_id: string; opt_out: true },
) => void;

/** Only call after a verified inquiry receipt; never pass form fields to the pixel. */
export function trackInquiryConversion(submissionId: string): void {
  if (typeof window === "undefined" || !/^[a-f\d]{64}$/.test(submissionId)) return;
  try {
    const queue = (window as Window & { oaiq?: MeasurementQueue }).oaiq;
    queue?.("measure", "lead_created", { type: "customer_action" }, {
      event_id: `inquiry_${submissionId}`,
      opt_out: true,
    });
  } catch {
    // A blocked pixel must not turn a delivered inquiry into a form error.
  }
}
