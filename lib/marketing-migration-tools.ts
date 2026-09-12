export type ROIInputs = { monthlyHours: number; hourlyCost: number; timeReduction: number; monthlySystemCost: number; setupCost: number };

export function calculateWorkflowROI(inputs: ROIInputs) {
  const safe = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
  const hoursSaved = safe(inputs.monthlyHours) * Math.min(100, safe(inputs.timeReduction)) / 100;
  const capacityValue = hoursSaved * safe(inputs.hourlyCost);
  const monthlyNetValue = capacityValue - safe(inputs.monthlySystemCost);
  const firstYearNetValue = monthlyNetValue * 12 - safe(inputs.setupCost);
  const paybackMonths = monthlyNetValue > 0 ? safe(inputs.setupCost) / monthlyNetValue : null;
  return { hoursSaved, capacityValue, monthlyNetValue, firstYearNetValue, paybackMonths };
}

export const readinessQuestions = [
  {id:"workflow",question:"Which recurring work would you like to improve?",options:["Reporting and finance", "Research and acquisition review", "Content and release planning", "Still deciding"]},
  {id:"frequency",question:"How often does your team do this work?",options:["Every day", "Every week", "Every month", "Occasionally"]},
  {id:"information",question:"Where is the information the task needs?",options:["Mostly in one system", "Across several tools and files", "We need to identify it"]},
  {id:"access",question:"Can your team access that information?",options:["Yes, with the permissions we need", "Some of it; we need to arrange access", "We are not sure yet"]},
  {id:"method",question:"Could someone else follow your current process?",options:["Yes, the steps are documented", "With help from the person doing it", "Not yet; it changes each time"]},
  {id:"owner",question:"Who would review and own the new workflow?",options:["We have someone in mind", "We need to agree on an owner", "We need help training the team"]},
  {id:"ai",question:"How is the team using AI today?",options:["We have a repeatable workflow", "A few people use individual tools", "We are getting started"]},
] as const;

export function recommendReadiness(answers: Record<string,string>) {
  const dataNeedsWork = answers.access !== readinessQuestions[3].options[0] || answers.information === readinessQuestions[2].options[2];
  const ownerNeedsWork = answers.owner !== readinessQuestions[5].options[0];
  const unclearWork = answers.workflow === "Still deciding" || answers.method === readinessQuestions[4].options[2];
  if(dataNeedsWork) return {title:"Start with the information.",description:"Before choosing an AI tool, map the records this workflow needs and confirm who can access them.",steps:["List the files, systems, and people involved.","Confirm access and permissions for the task.","Choose a small set of records to test the workflow."],interest:"AI strategy"};
  if(unclearWork) return {title:"Make the job specific.",description:"Choose one repeatable task and define a useful result. A clear example gives you something to build and test against.",steps:["Pick one recurring report, brief, or preparation task.","Write down what goes in and what good output looks like.","Record the current steps and the time they take."],interest:"AI strategy"};
  if(ownerNeedsWork) return {title:"Put an owner around the workflow.",description:"A useful system needs someone who can judge the result, make corrections, and help the team keep using it.",steps:["Name the person who will review the output.","Practice the workflow on a real task together.","Capture the method and its review steps for the wider team."],interest:"Team training"};
  return {title:"Scope a focused first build.",description:"You have a recurring job, accessible information, and someone to own it. A small, testable first version is a useful next step.",steps:["Agree on the input, output, and review standard.","Build a first version on a limited set of real tasks.","Compare the result with the current process before expanding."],interest:"Custom systems"};
}
