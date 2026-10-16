export const aiStrategyCopy = {
  title: "Choose your first AI project for your music business",
  description:
    "Choose an AI project for your music team. Check the work, access and owner, then download a pilot brief with clear measures and a review date.",
  eyebrow: "THE RECOUP METHOD",
  readyLabel: "READY TO REVIEW",
  buildAction: "Build my project brief",
  noScript:
    "Enable JavaScript to build a brief, or download the team worksheet below to work offline.",
  methodLabel: "How Recoup approaches AI projects",
  related: {
    title: "Work through the details",
    links: [
      { href: "/roi", label: "Estimate the time and cost" },
      {
        href: "/workflow-plan",
        label: "Develop the workflow with Recoup’s assistant",
      },
      { href: "/advisory", label: "See how Recoup helps your team" },
    ],
  },
  prerequisiteMessages: {
    access: "Confirm permission to use the required files and tools.",
    example: "Choose a representative completed task and its accepted output.",
    review:
      "Assign a reviewer who can catch mistakes before the output is used.",
    baseline: "Record how the work performs today before comparing a pilot.",
  },
  heading: "Choose the work.\nThen choose the AI.",
  introduction:
    "Start with a recurring job in your music business. Leave with a project brief your team can challenge, test, and use.",
  method: [
    {
      title: "Find the work worth changing",
      body: "Bring a recent report, release handoff, or catalog request. Ask the people doing it where time goes and what a useful result looks like.",
    },
    {
      title: "Make a test possible",
      body: "Choose an owner, confirm access, and agree on an example the team can judge. Resolve missing inputs before committing to a build.",
    },
    {
      title: "Decide what earns another round",
      body: "Write down the measure, the review date, and the reason to stop. Keep a record of what improved and what still needs a person.",
    },
  ],
  purposes: {
    feasibility: {
      label: "Find out if AI can do the job",
      measure:
        "Test representative examples, including difficult cases. Record accepted outputs, corrections, and failures. Decide whether there is enough evidence to scope a build.",
    },
    capacity: {
      label: "Give the team time back",
      measure:
        "Compare total preparation, execution, review, and correction time for the same kind of work. Record output quality and where recovered time will go. Treat cash savings as a separate, confirmed budget change.",
    },
    revenue: {
      label: "Create a commercial opportunity",
      measure:
        "Choose a comparable group or staggered rollout before starting. Track qualified opportunities and paid outcomes, include selling and delivery costs, and record other changes that could explain the result.",
    },
  },
  fields: {
    workflow: "Which recurring job would you change?",
    outcome: "What should be different when it works?",
    purpose: "What must this first test establish?",
    owner: "Who owns the result? A role is enough.",
    access: "Can the team use the required files and tools with permission?",
    example: "Do you have a completed example and an accepted output?",
    review: "Is someone responsible for checking the output before use?",
    baseline: "Have you recorded how the work performs today?",
    reviewDate: "When will the owner review the evidence?",
    success: "What result would justify continuing?",
    stop: "What result would make you stop or change the test?",
  },
  steps: ["Name the work", "Check the inputs", "Set the test"],
  placeholders: {
    workflow: "Prepare the weekly catalog exceptions report",
    outcome:
      "Finance receives a checked list of unmatched records before the Monday review.",
    owner: "Catalog operations lead",
    success:
      "The reviewer accepts the report with fewer corrections and less total preparation time.",
    stop: "Unmatched rights records are presented as confirmed matches, or checking takes longer.",
  },
  privacy:
    "Your written answers stay in this page until you download them or choose to prepare an inquiry. We record tool usage without your written responses. Use role names and general descriptions; no confidential records needed.",
  resultTitle: "Your first-project brief",
  readyTitle: "Scope a small test",
  gapsTitle: "Prepare the missing inputs",
  readinessNote:
    "This is a planning aid based on your answers. A project still needs an agreed scope, budget, and checks before it runs on live work.",
  worksheetTitle: "Ask the team about last week",
  worksheetBody:
    "Use the Recoup team worksheet to collect a recent example, the handoffs, existing tools, and the result people need. Keep responses in your own workspace.",
  downloadWorksheet: "Download the team worksheet",
  downloadBrief: "Download my brief",
  handoff: "Discuss this project with Recoup",
  handoffNote:
    "Next, choose Use prepared brief on the contact form. Review it and add your contact details before sending.",
  handoffFailure:
    "This browser couldn’t save the brief. Download it and paste it into the contact form.",
  validation: "Complete this step with a specific answer in every field.",
  dateError: "Choose today or a later review date.",
  readyBody:
    "You have identified the basic inputs. Agree on the test size, cost ceiling, and acceptance checks with the owner.",
  gapsBody:
    "Resolve these items with the owner, then return to the brief. An unanswered question remains open.",
  resultLabels: {
    workflow: "The work",
    outcome: "Intended change",
    owner: "Owner",
    purpose: "Test purpose",
    measure: "What to measure",
    reviewDate: "Review date",
    success: "Continue when",
    stop: "Stop or revise when",
    gaps: "Before the test",
  },
  actions: {
    back: "Back",
    next: "Continue",
    build: "Build my brief",
    edit: "Edit answers",
    reset: "Start a new brief",
  },
  answers: { unknown: "Not sure yet", yes: "Yes", no: "No" },
} as const;
