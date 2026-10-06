type MeasurementQueue = (
  command: "measure",
  event: "lead_created",
  data: { type: "customer_action" },
  options: { event_id: string; opt_out: true },
) => void;

const eventIds = new Map<string, string>();

/** Only call after a verified inquiry receipt; never pass form fields to the pixel. */
export function trackInquiryConversion(submissionId: string): void {
  if (typeof window === "undefined" || !/^[a-f\d]{64}$/.test(submissionId)) return;
  try {
    const queue = (window as Window & { oaiq?: MeasurementQueue }).oaiq;
    if (!queue) return;
    // Keep the content-derived receipt local; export only a random identifier.
    let eventId = eventIds.get(submissionId);
    if (!eventId) {
      eventId = crypto.randomUUID();
      eventIds.set(submissionId, eventId);
    }
    queue("measure", "lead_created", { type: "customer_action" }, {
      event_id: eventId,
      opt_out: true,
    });
  } catch {
    // A blocked pixel must not turn a delivered inquiry into a form error.
  }
}
