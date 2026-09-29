import { podcastGuestInterest } from "../inquiry-topics.ts";

export type StartProjectCopy = { kicker: string; title: string; intro: string; nextTitle: string; next: string; qualified: boolean };

/** The /start-project page copy for a given preselected interest; a podcast guest is an invitation, not a project brief. */
export function startProjectCopy({ interest }: { interest: string }): StartProjectCopy {
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
  return {
    kicker: "Start a project",
    title: "Let’s build something useful.",
    intro: "Share your tools, budget, and timing. We’ll help you figure out the next step.",
    nextTitle: "What happens next",
    next: "We’ll follow up by email to discuss your project. Scope and pricing are agreed together before work begins.",
    qualified: true,
  };
}
