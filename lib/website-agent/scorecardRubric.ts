// Ordered, cumulative criteria. These are Recoup's rubric, not an industry benchmark.
export const scorecardRubric = [
  {
    id: "knowledge",
    title: "Company knowledge",
    question: "Can AI answer questions about your business?",
    criteria: [
      { id: "knowledge_use", label: "Used for real business questions" },
      {
        id: "knowledge_records",
        label: "Answers use relevant company records and show their sources",
      },
      {
        id: "knowledge_checks",
        label:
          "Accuracy is checked on representative questions, including missing answers",
      },
    ],
  },
  {
    id: "workflows",
    title: "Getting work done",
    question: "Does AI move work through to a useful result?",
    criteria: [
      { id: "workflows_use", label: "Helps with a real recurring task" },
      {
        id: "workflows_repeat",
        label: "A defined process produces an output someone can use",
      },
      {
        id: "workflows_run",
        label:
          "Used repeatedly with an owner, approvals and a way to handle failures",
      },
    ],
  },
  {
    id: "adoption",
    title: "Team adoption",
    question: "Is this part of how your team works?",
    criteria: [
      { id: "adoption_use", label: "Someone uses AI regularly for work" },
      {
        id: "adoption_shared",
        label: "More than one person follows a shared way of using it",
      },
      {
        id: "adoption_owned",
        label: "An owner maintains guidance, training and checks actual use",
      },
    ],
  },
  {
    id: "reliability",
    title: "Reliability",
    question: "Can you trust the work and control what happens?",
    criteria: [
      {
        id: "reliability_review",
        label: "Someone checks important AI output before it is used",
      },
      {
        id: "reliability_rules",
        label: "Data access, approval rules and escalation are defined",
      },
      {
        id: "reliability_monitor",
        label: "Errors are tracked and rechecked after changes",
      },
    ],
  },
  {
    id: "results",
    title: "Business results",
    question: "Do you know what AI is improving?",
    criteria: [
      {
        id: "results_goal",
        label: "Current AI use has a specific business result to track",
      },
      {
        id: "results_measure",
        label:
          "Measured against the previous process, including review and correction",
      },
      {
        id: "results_proven",
        label: "Repeated measurements show a useful improvement",
      },
    ],
  },
] as const;

export const scorecardLevels = [
  "Not yet",
  "Started",
  "Repeatable",
  "Established",
] as const;
export type ScorecardArea = (typeof scorecardRubric)[number]["id"];
export type ScorecardCriterion =
  (typeof scorecardRubric)[number]["criteria"][number]["id"];
