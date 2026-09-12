export const readinessQuestions = [
  {id:"workflow",question:"Which recurring work would you like to improve?",options:["Reporting and finance", "Research and acquisition review", "Content and release planning", "Still deciding"]},
  {id:"frequency",question:"How often does your team do this work?",options:["Every day", "Every week", "Every month", "Occasionally"]},
  {id:"information",question:"Where is the information the task needs?",options:["Mostly in one system", "Across several tools and files", "We need to identify it"]},
  {id:"access",question:"Can your team access that information?",options:["Yes, with the permissions we need", "Some of it; we need to arrange access", "We are not sure yet"]},
  {id:"method",question:"Could someone else follow your current process?",options:["Yes, the steps are documented", "With help from the person doing it", "Not yet; it changes each time"]},
  {id:"owner",question:"Who would review and own the new workflow?",options:["We have someone in mind", "We need to agree on an owner", "We need help training the team"]},
  {id:"ai",question:"How is the team using AI today?",options:["We have a repeatable workflow", "A few people use individual tools", "We are getting started"]},
] as const;
