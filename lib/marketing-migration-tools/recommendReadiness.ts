import { readinessQuestions } from "./readinessQuestions.ts";

const recommendations = {
  information: {title:"Start with the information.",description:"Before choosing an AI tool, map the records this workflow needs and confirm who can access them.",steps:["List the files, systems, and people involved.","Confirm access and permissions for the task.","Choose a small set of records to test the workflow."],interest:"AI strategy"},
  work: {title:"Make the job specific.",description:"Choose one repeatable task and define a useful result. A clear example gives you something to build and test against.",steps:["Pick one recurring report, brief, or preparation task.","Write down what goes in and what good output looks like.","Record the current steps and the time they take."],interest:"AI strategy"},
  owner: {title:"Put an owner around the workflow.",description:"A useful system needs someone who can judge the result, make corrections, and help the team keep using it.",steps:["Name the person who will review the output.","Practice the workflow on a real task together.","Capture the method and its review steps for the wider team."],interest:"Team training"},
  build: {title:"Scope a focused first build.",description:"You have a recurring job, accessible information, and someone to own it. A small, testable first version is a useful next step.",steps:["Agree on the input, output, and review standard.","Build a first version on a limited set of real tasks.","Compare the result with the current process before expanding."],interest:"Custom systems"},
} as const;

/** The first failed gate picks the next step; `score` is how many of the three gates passed. */
export function recommendReadiness(answers: Record<string,string>) {
  const dataNeedsWork = answers.access !== readinessQuestions[3].options[0] || answers.information === readinessQuestions[2].options[2];
  const unclearWork = answers.workflow === "Still deciding" || answers.method === readinessQuestions[4].options[2];
  const ownerNeedsWork = answers.owner !== readinessQuestions[5].options[0];
  const score = [dataNeedsWork, unclearWork, ownerNeedsWork].filter((gate) => !gate).length;
  const next = dataNeedsWork ? recommendations.information : unclearWork ? recommendations.work : ownerNeedsWork ? recommendations.owner : recommendations.build;
  return { ...next, score };
}
