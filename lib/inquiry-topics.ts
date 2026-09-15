/** The interest a podcast guest request carries; the /start-project guest flow keys off it. */
export const podcastGuestInterest = "Podcast guest";

export const generalInterests = [
  "AI strategy",
  "Custom systems",
  "Team training",
  podcastGuestInterest,
  "Not sure yet",
] as const;
