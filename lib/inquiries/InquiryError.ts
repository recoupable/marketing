const INVALID_MESSAGE = "Please check your details and try again.";
const UNAVAILABLE_MESSAGE = "We couldn't save your inquiry. Please try again, or email hi@recoupable.dev.";

export class InquiryError extends Error {
  readonly status: number;
  readonly code: "validation" | "blocked" | "unavailable" | "timeout";

  constructor(status: number, message = INVALID_MESSAGE, code?: InquiryError["code"]) {
    super(message);
    this.status = status;
    this.code = code ?? (status >= 500 ? "unavailable" : status === 403 ? "blocked" : "validation");
  }

  /** The CRM could not be reached or did not confirm the save. */
  static unavailable(): InquiryError {
    return new InquiryError(503, UNAVAILABLE_MESSAGE);
  }
}
