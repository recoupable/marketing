export type InquiryMode = {
  variant?: "acquisitions" | "operations";
  qualified: boolean;
  freeAudit: boolean;
  connected: boolean;
};

/** Every piece of copy that changes with the inquiry surface, in one place. */
export function inquiryLabels({ variant, qualified, freeAudit, connected }: InquiryMode) {
  return {
    websitePath: freeAudit ? "Free AI audit /start-project" : qualified ? "Project brief /start-project"
      : variant === "acquisitions" ? "Acquisition readiness" : variant === "operations" ? "Catalog operations" : "AI transformation",
    formLabel: freeAudit ? "Free AI audit request" : "Project inquiry",
    heading: freeAudit ? "Tell us what’s slowing you down." : qualified ? "Your project brief" : variant ? "Your details" : "Tell us about your company",
    interestLabel: variant ? "Workflow *" : "What can we help with? *",
    interestPlaceholder: variant ? "Choose a workflow" : "Select a starting point",
    messageLabel: variant ? "What would you like to improve? *" : "Tell us about the work *",
    messagePlaceholder: qualified ? "What happens today, how often does it repeat, and what would a better result look like?"
      : variant === "acquisitions" ? "Where does deal preparation slow down? Which files or tools are involved?"
        : variant === "operations" ? "What repeats every reporting cycle? Which files or tools are involved?"
          : "What would you like AI to help your company do?",
    budgetNote: freeAudit ? "For a possible build after the free audit. Choose “Not decided yet” if you’re exploring."
      : "A rough range is fine. We’ll agree on scope and price before work begins.",
    submit: connected
      ? freeAudit ? "Request my free audit" : qualified ? "Send your project brief" : "Send your inquiry"
      : freeAudit ? "Prepare audit request" : "Prepare email brief",
  };
}
