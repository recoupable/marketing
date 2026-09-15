import { podcastGuestInterest } from "../inquiry-topics.ts";

export type StartProjectCopy = { kicker: string; title: string; intro: string; nextTitle: string; next: string; qualified: boolean };

/** The /start-project page copy for a given preselected interest; a podcast guest is an invitation, not a project brief. */
export function startProjectCopy({ interest, freeAudit }: { interest: string; freeAudit: boolean }): StartProjectCopy {
  if (interest === podcastGuestInterest) {
    return {
      kicker: "Be a guest",
      title: "Come tell your story on the show.",
      intro: "Tell us who you are, what you run, and what you would want to talk about. A few sentences are enough.",
      nextTitle: "What happens next",
      next: "We reply within two working days with recording times. The conversation is 30 to 60 minutes, recorded remotely, and published on YouTube, Spotify and Apple Podcasts. You get the clips.",
      qualified: false,
    };
  }
  return freeAudit
    ? {
        kicker: "Free AI audit",
        title: "Get your free AI audit.",
        intro: "Bring one workflow your team wants to improve. We’ll review how it works today, where AI could help, and a practical first step.",
        nextTitle: "What happens next",
        next: "Share a few details below and we’ll follow up to arrange your audit. The audit is free. Any implementation is scoped and priced separately.",
        qualified: true,
      }
    : {
        kicker: "Start a project",
        title: "Let’s build something useful.",
        intro: "Tell us about your team, the work you want to improve, and what a useful result would look like. A few sentences are enough.",
        nextTitle: "What happens next",
        next: "We’ll discuss the project together. If we decide to work together, we’ll agree on scope and pricing before starting.",
        qualified: true,
      };
}
