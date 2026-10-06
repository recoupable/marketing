export type InquiryMode = {
  variant?: "acquisitions" | "operations";
  qualified: boolean;
  freeAudit: boolean;
  connected: boolean;
  /** A podcast guest request: an invitation, not a project brief. */
  guest?: boolean;
  compact?: boolean;
  buildConsultation?: boolean;
  reporting?: boolean;
};

/** Every piece of copy that changes with the inquiry surface, in one place. */
export function inquiryLabels({
  variant,
  qualified,
  freeAudit,
  connected,
  guest = false,
  compact = false,
  buildConsultation = false,
  reporting = false,
}: InquiryMode) {
  if (guest) return guestLabels(connected);
  if (compact) {
    let surface = {
      websitePath: "Project inquiry /start-project",
      formLabel: "Project inquiry",
      heading: "Request a consultation",
      formIntro: "Share a few details. We’ll email you to arrange a time.",
      submit: "Request a consultation",
    };
    if (buildConsultation)
      surface = {
        ...surface,
        heading: "Let’s build your AI system",
        formIntro:
          "We’ll explore what it could do for your team, what it would take to build, and where to start. We’ll email you to arrange a time.",
        submit: "Start my AI project",
      };
    if (reporting)
      surface = {
        websitePath: "Royalty reporting /royalty-reporting",
        formLabel: "Royalty reporting inquiry",
        heading: "Discuss your reporting workflow",
        formIntro:
          "Tell us which reporting process you want to improve. We’ll email you to arrange a conversation.",
        submit: "Discuss my reporting workflow",
      };
    return {
      ...surface,
      interestLabel: "What can we help with? *",
      interestPlaceholder: "Choose a starting point",
      messageLabel: "Anything else? (optional)",
      messagePlaceholder: "A short note or question, if you have one.",
      budgetNote: "",
      submit: connected ? surface.submit : "Prepare consultation request",
    };
  }
  return {
    formIntro: "",
    websitePath: freeAudit
      ? "Free AI audit /start-project"
      : qualified
        ? "Project brief /start-project"
        : variant === "acquisitions"
          ? "Acquisition readiness"
          : variant === "operations"
            ? "Catalog operations"
            : "AI transformation",
    formLabel: freeAudit ? "Free AI audit request" : "Project inquiry",
    heading: freeAudit
      ? "Tell us what’s slowing you down."
      : qualified
        ? "Your project brief"
        : variant
          ? "Your details"
          : "Tell us about your company",
    interestLabel: variant ? "Workflow *" : "What can we help with? *",
    interestPlaceholder: variant
      ? "Choose a workflow"
      : "Select a starting point",
    messageLabel: variant
      ? "What would you like to improve? *"
      : "Tell us about the work *",
    messagePlaceholder: qualified
      ? "What happens today, how often does it repeat, and what would a better result look like?"
      : variant === "acquisitions"
        ? "Where does deal preparation slow down? Which files or tools are involved?"
        : variant === "operations"
          ? "What repeats every reporting cycle? Which files or tools are involved?"
          : "What would you like AI to help your company do?",
    budgetNote: freeAudit
      ? "For a possible build after the free audit. Choose “Not decided yet” if you’re exploring."
      : "A rough range is fine. We’ll agree on scope and price before work begins.",
    submit: connected
      ? freeAudit
        ? "Request my free audit"
        : qualified
          ? "Send your project brief"
          : "Send your inquiry"
      : freeAudit
        ? "Prepare audit request"
        : "Prepare email brief",
  };
}

function guestLabels(connected: boolean) {
  return {
    formIntro: "",
    websitePath: "Podcast guest /start-project",
    formLabel: "Podcast guest request",
    heading: "Tell us about you and your work",
    interestLabel: "What can we help with? *",
    interestPlaceholder: "Select a starting point",
    messageLabel: "What would you want to talk about? *",
    messagePlaceholder:
      "A workflow AI changed for you, a deal, a decision, the thing you wish someone had told you earlier.",
    budgetNote: "",
    submit: connected ? "Request an invite" : "Prepare invite request",
  };
}
