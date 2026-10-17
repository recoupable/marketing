export const aiStrategyCopy = {
  title: "AI for your music team's repetitive work | Examples",
  description:
    "See how Recoup could automate royalty reporting, catalog cleanup, and release prep. Explore an example, then talk with us about your team’s work.",
  eyebrow: "AI FOR MUSIC TEAMS",
  heading: "Spend less time\non music admin.",
  introduction:
    "Pick the work that slows your team down. See what we’d build to help.",
  choicesLabel: "What does your team spend time on?",
  resultLabel: "WHAT WE’D BUILD",
  previewLabel: "EXAMPLE OUTPUT",
  handoff: "Talk to Recoup",
  handoffNote: "We’ll work out the scope and price with you before building.",
  download: "Save this example",
  detailsLabel: "How we’d get started",
  requirementsLabel: "What we’d check together",
  measureLabel: "How we’d measure the result",
  differentTask: "Something else taking up your time?",
  differentAction: "Let’s talk about it",
  exampleNote: "An example of a system we can scope with your team.",
  downloadTitle: "Recoup: automation example",
  inquiryMessage: "I’d like to talk about automating",
  projects: [
    {
      id: "royalty-reporting",
      label: "Royalty reports",
      pain: "Pulling statements into spreadsheets",
      title: "Royalty reports, ready for review.",
      description:
        "We’d build a system that brings statements together, matches entries to your catalog, and flags the items your finance team needs to check.",
      previewTitle: "Monthly royalty review",
      rows: [
        {
          label: "Statement coverage",
          value: "Missing statement",
          attention: true,
        },
        { label: "Catalog matches", value: "Needs review", attention: true },
        { label: "Source references", value: "Included", attention: false },
      ],
      review: "Your finance team checks exceptions and approves the report.",
      firstTest:
        "We’d start with one reporting period and compare the output with a report your team has already checked.",
      requirements: [
        "Permission to use the statements and catalog records.",
        "A finished report and the matching rules your team uses.",
        "A finance reviewer to check totals and unresolved entries.",
        "The time it takes to prepare, review, and correct a report today.",
      ],
      measure:
        "Compare the total time to an approved report, including corrections. Check that totals match and every unresolved entry stays visible.",
    },
    {
      id: "catalog-cleanup",
      label: "Catalog cleanup",
      pain: "Fixing missing and conflicting data",
      title: "A catalog cleanup list your team can act on.",
      description:
        "We’d check catalog records for missing identifiers, conflicting credits, and possible duplicates, then put the issues in one review list.",
      previewTitle: "Catalog checks",
      rows: [
        {
          label: "Recording identifier",
          value: "Missing ISRC",
          attention: true,
        },
        { label: "Writer credit", value: "Conflicting names", attention: true },
        {
          label: "Possible duplicate",
          value: "Check before merging",
          attention: true,
        },
      ],
      review: "Your catalog team approves changes before records are updated.",
      firstTest:
        "We’d check a small catalog sample against records your team trusts, including known errors and duplicates.",
      requirements: [
        "Permission to use a catalog export and its reference records.",
        "Known examples of correct records and common errors.",
        "A catalog reviewer who can approve corrections.",
        "The time and error rate of the current cleanup process.",
      ],
      measure:
        "Compare review time and confirmed errors found. Track false matches and missed issues before expanding to more records.",
    },
    {
      id: "release-prep",
      label: "Release prep",
      pain: "Chasing files and approvals",
      title: "Know what’s missing before release day.",
      description:
        "We’d bring release files and approvals into one checklist, so your team can see what’s ready and who needs to follow up.",
      previewTitle: "Release delivery checklist",
      rows: [
        { label: "Master audio", value: "Received", attention: false },
        { label: "Cover artwork", value: "Awaiting approval", attention: true },
        { label: "Credits & splits", value: "Needs review", attention: true },
      ],
      review: "Your release manager approves the final delivery.",
      firstTest:
        "We’d use one release to check whether the system catches missing files and approvals before the delivery deadline.",
      requirements: [
        "Permission to read the release files and approval records.",
        "Your delivery checklist and an example of a completed release.",
        "A release manager to confirm readiness and approve delivery.",
        "The time spent chasing files and the issues currently missed.",
      ],
      measure:
        "Track time spent following up and missed requirements. Count review and correction time before calling it a time saving.",
    },
  ],
} as const;
