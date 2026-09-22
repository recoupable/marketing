export const workflowPlanCopy = {
  title: "What could AI do for your music business?",
  description:
    "Find opportunities to reduce reporting work, spot royalty gaps, or get songs into pitches faster—with a free recommendation for your music team.",
  kicker: "A FREE BRIEF FOR YOUR MUSIC TEAM",
  start: "Get my free brief",
  note: "Three questions, then your name and email. No catalog upload.",
  privacy:
    "Your answers are sent to our AI provider when you create a plan. They stay in this browser tab until you close it or start again; they are only added to an inquiry if you choose to send one.",
  questions: [
    {
      id: "bottleneck",
      title: "What’s slowing your team down?",
      hint: "Pick any that apply.",
      options: [
        "Catalog reporting",
        "Missing royalties",
        "Pitching for briefs",
        "Acquisition diligence",
        "Something else",
      ],
    },
    {
      id: "sources",
      title: "Where does the information live?",
      hint: "Pick any that apply.",
      options: [
        "Spreadsheets",
        "Royalty platforms",
        "Shared drives",
        "Email",
        "Catalog database",
        "Not sure yet",
      ],
    },
    {
      id: "outcome",
      title: "What would your team use?",
      hint: "Pick any that apply.",
      options: [
        "A weekly catalog income report",
        "A royalty review queue",
        "A shortlist for each brief",
        "An acquisition diligence checklist",
        "A shared catalog dashboard",
        "Help me decide",
      ],
    },
  ],
} as const;
