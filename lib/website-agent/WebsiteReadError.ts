const messages = {
  http: "This page returned an HTTP error.",
  timeout: "This page did not respond within 10 seconds.",
  unsupported: "This page is not readable HTML or text.",
  too_large: "This page exceeds the reading size limit.",
  redirects: "This page redirects too many times.",
  empty: "This page contains too little readable text.",
  unavailable: "This page could not be read.",
};

/** Only known, public-safe failure details are passed to the agent. */
export class WebsiteReadError extends Error {
  constructor(
    readonly reason: keyof typeof messages,
    readonly statusCode?: number,
  ) {
    super(
      reason === "http" && statusCode
        ? `This page returned HTTP ${statusCode}.`
        : messages[reason],
    );
    this.name = "WebsiteReadError";
  }
}
