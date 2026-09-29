import { podcastGuestInterest } from "../inquiry-topics.ts";

export type StartProjectCopy = { kicker: string; title: string; intro: string; nextTitle: string; next: string; qualified: boolean; outcomes?: readonly { title: string; description: string }[] };

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
  if (interest === "Custom systems") return {
    kicker: "Custom AI systems",
    title: "Your business. Your AI.",
    intro: "We design and build a custom AI system for your business. Your team gets one place to work with your company’s knowledge, run processes, and get things done across the tools you already use.",
    nextTitle: "Built around your business",
    next: "We’ll email you to arrange a time.",
    outcomes: [
      { title: "Answers grounded in your business.", description: "Ask questions across your documents, data, and systems." },
      { title: "Work your AI can take on.", description: "Research, prepare reports, and carry out repeatable processes." },
      { title: "Built around your team.", description: "Your tools, your processes, your way of working." },
    ],
    qualified: true,
  };
  return {
    kicker: "Start a project",
    title: "Start your project.",
    intro: "A few details to help us prepare for a conversation.",
    nextTitle: "What happens next",
    next: "We’ll follow up by email.",
    qualified: true,
  };
}
