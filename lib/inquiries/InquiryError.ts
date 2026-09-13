const INVALID_MESSAGE = "Please check your details and try again.";
const UNAVAILABLE_MESSAGE = "We couldn't save your inquiry. Please try again, or email hi@recoupable.dev.";

export class InquiryError extends Error {
  readonly status: number;

  constructor(status: number, message = INVALID_MESSAGE) {
    super(message);
    this.status = status;
  }

  /** The CRM could not be reached or did not confirm the save. */
  static unavailable(): InquiryError {
    return new InquiryError(503, UNAVAILABLE_MESSAGE);
  }
}
