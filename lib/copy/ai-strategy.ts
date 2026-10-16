export const aiStrategyCopy = {
  title: "Plan your first AI project for your music business",
  description:
    "Turn a recurring music-business task into an AI project plan. Get a goal, a checklist of missing requirements, and a way to measure the first test.",
  eyebrow: "FREE TOOL FOR MUSIC TEAMS",
  readyLabel: "YOUR PLAN",
  buildAction: "Create my AI project plan",
  offerNote: "Free to use. Download without an email.",
  exampleLabel: "EXAMPLE PROJECT PLAN",
  exampleTitle: "Monthly royalty report",
  exampleRows: [
    {
      label: "Goal",
      text: "Flag missing statements before the finance review.",
    },
    {
      label: "Still needed",
      text: "Access to the files. A person to check the report.",
    },
    {
      label: "Success check",
      text: "Less total time, including review and corrections.",
    },
  ],
  exampleCaption:
    "Your plan will use your answers and list every missing requirement.",
  starterLabel: "Start with an example",
  starters: [
    {
      label: "Royalty reporting",
      workflow: "Prepare the monthly royalty report",
      outcome:
        "Finance gets a checked report with missing statements flagged before the monthly review.",
    },
    {
      label: "Catalog cleanup",
      workflow: "Find incomplete catalog metadata",
      outcome:
        "The catalog team gets a list of missing or conflicting fields to check before delivery.",
    },
    {
      label: "Release prep",
      workflow: "Check release assets before distributor delivery",
      outcome:
        "The release manager gets a checklist of missing assets and approvals before the delivery deadline.",
    },
  ],
  progressLabel: "Project planning steps",
  stepLabels: ["Your task", "What you have", "Your test"],
  stepDescriptions: [
    "Choose one task your team repeats. Use an example or describe your own.",
    "These answers become your preparation checklist. Choose “Not sure yet” for anything you still need to confirm.",
    "Set a review date and describe the result you would need to see before doing more.",
  ],
  noScript:
    "Enable JavaScript to create a plan, or download the team worksheet below to work offline.",
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
    example: "Find a finished report or other example to compare the AI’s work against.",
    review:
      "Assign a reviewer who can catch mistakes before the output is used.",
    baseline: "Measure how long the task takes today and record any common errors.",
  },
  heading: "Plan your first\nAI project.",
  introduction:
    "Tell us which task you want AI to help with. Get a downloadable plan with a clear goal, a checklist of what’s missing, and a way to check whether it worked.",
  method: [
    {
      title: "Choose a recurring task",
      body: "Bring a recent report, release handoff, or catalog request. Ask the people doing it where time goes and what a useful result looks like.",
    },
    {
      title: "List what you need before starting",
      body: "Choose an owner, confirm access, and agree on an example the team can judge. Resolve missing inputs before committing to a build.",
    },
    {
      title: "Define a successful test",
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
      label: "Save the team time",
      measure:
        "Compare total preparation, execution, review, and correction time for the same kind of work. Record output quality and where recovered time will go. Treat cash savings as a separate, confirmed budget change.",
    },
    revenue: {
      label: "Test a revenue opportunity",
      measure:
        "Choose a comparable group or staggered rollout before starting. Track qualified opportunities and paid outcomes, include selling and delivery costs, and record other changes that could explain the result.",
    },
  },
  fields: {
    workflow: "What task do you want to improve?",
    outcome: "What should the finished result look like?",
    purpose: "Why try AI for this task?",
    owner: "Who will run this project?",
    access: "Do you have permission to use the files and tools?",
    example: "Do you have a finished example to compare against?",
    review: "Has someone agreed to check the AI’s work?",
    baseline: "Have you measured the time and quality of this task today?",
    reviewDate: "When will you review the results?",
    success: "What would make this test a success?",
    stop: "What would make you stop or change it?",
  },
  steps: [
    "What do you want AI to help with?",
    "What is already in place?",
    "How will you know it worked?",
  ],
  placeholders: {
    workflow: "e.g. Prepare the monthly royalty report",
    outcome:
      "e.g. A checked report that flags missing statements before the finance review.",
    owner: "e.g. Finance lead",
    success:
      "e.g. The report takes less total time and the reviewer finds no missing statements.",
    stop: "e.g. The report misses a statement, or checking it takes longer than doing it manually.",
  },
  privacy:
    "Your written answers stay in this page until you download them or choose to prepare an inquiry. We record tool usage without your written responses. Use role names and general descriptions; no confidential records needed.",
  resultTitle: "Your AI project plan",
  readyTitle: "You have the basics for a first test",
  gapsTitle: "Here’s what you still need",
  readinessNote:
    "This is a planning aid based on your answers. A project still needs an agreed scope, budget, and checks before it runs on live work.",
  worksheetTitle: "Not sure which task to choose?",
  worksheetBody:
    "Ask your team these 10 questions about a recent report, catalog update, or release. Use their answers to choose a task for your plan.",
  downloadWorksheet: "Download the team worksheet",
  downloadBrief: "Download my plan",
  handoff: "Discuss this project with Recoup",
  handoffNote:
    "Next, choose Use prepared brief on the contact form. Review it and add your contact details before sending.",
  handoffFailure:
    "This browser couldn’t save the plan. Download it and paste it into the contact form.",
  validation: "Complete this step with a specific answer in every field.",
  dateError: "Choose today or a later review date.",
  readyBody:
    "Before you start, agree on the budget, how much work to test, and who checks the results.",
  gapsBody:
    "Arrange each item with the person running the project. You can still download this plan and use it as your checklist.",
  resultLabels: {
    workflow: "Task",
    outcome: "Expected result",
    owner: "Project owner",
    purpose: "Test purpose",
    measure: "What to measure",
    reviewDate: "Review date",
    success: "Success criteria",
    stop: "Reasons to stop or change the test",
    gaps: "Before the test",
  },
  actions: {
    back: "Back",
    next: "Continue",
    build: "Create my plan",
    edit: "Edit answers",
    reset: "Start a new plan",
  },
  answers: { unknown: "Not sure yet", yes: "Yes", no: "No" },
} as const;
