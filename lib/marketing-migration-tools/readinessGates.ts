import { readinessQuestions } from "./readinessQuestions.ts";

/** The three conditions a workflow must meet before a first build is the right next step. */
export function readinessGates(answers: Record<string, string>) {
  return {
    dataNeedsWork: answers.access !== readinessQuestions[3].options[0] || answers.information === readinessQuestions[2].options[2],
    unclearWork: answers.workflow === "Still deciding" || answers.method === readinessQuestions[4].options[2],
    ownerNeedsWork: answers.owner !== readinessQuestions[5].options[0],
  };
}
