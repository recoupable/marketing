import type { WorkflowAnswers, WorkflowPlan } from "./schema";

export function starterPlan(answers: WorkflowAnswers): WorkflowPlan {
  const tasks: Record<
    WorkflowAnswers["bottleneck"][number],
    { title: string; input: string; output: string; task: string; review: string }
  > = {
    "Catalog reporting": {
      title: "A catalog income change report",
      output: "A spreadsheet with catalog ID, previous-period income, current-period income, change, currency and source statement. A short summary highlights changes that need review.",
      input:
        "Two comparable royalty periods, catalog identifiers and currency definitions.",
      task: "Calculate changes deterministically, then draft an explanation with a source row for each number. Separate confirmed causes from questions.",
      review:
        "A royalty or finance owner checks period, currency, adjustments and calculations before the report is shared.",
    },
    "Missing royalties": {
      title: "A royalty exception review queue",
      output: "A review table with work or recording ID, payer, expected period, observed payment, reason for the flag, supporting source and review status. A flagged item is not proof of missing money.",
      input:
        "Registrations, ownership records, statements and expected payment periods.",
      task: "Match recordings and works, flag unmatched records and show the evidence. Label gaps as candidates for review, not money proven missing.",
      review:
        "Your royalty team verifies ownership, payment timing and any claim before contacting a payer.",
    },
    "Pitching for briefs": {
      title: "A brief-to-catalog shortlist",
      output: "A shortlist with track title, listening link, fit to the brief, relevant metadata and rights-clearance questions, ready for a creative teammate to review.",
      input:
        "One past brief, searchable track metadata and current rights-clearance information.",
      task: "Produce a short list with reasons each track fits the brief, listening links and explicit clearance unknowns.",
      review:
        "A creative teammate listens to every selection and confirms rights and availability before any pitch is sent.",
    },
    "Acquisition diligence": {
      title: "A source-linked diligence checklist",
      output: "A checklist with each diligence question, supporting document and page, extracted fact, missing evidence and reviewer. Unverified claims remain visibly unresolved.",
      input:
        "A sample statement, catalog schedule and an approved diligence checklist.",
      task: "Extract relevant facts with source references; flag missing documents and inconsistent identifiers. Keep assumptions separate from evidence.",
      review:
        "Finance and legal reviewers verify all figures, rights and assumptions. The output is not a valuation or an investment recommendation.",
    },
    "Something else": {
      title: "One repeatable workflow, ready to test",
      output: "A draft of one recurring deliverable, with source references and an unresolved-items list for its owner to review.",
      input:
        "One completed example, its original inputs and your team's review criteria.",
      task: "Draft the requested output from the sample and link every factual claim to its input. Mark anything unsupported for review.",
      review:
        "Choose a teammate who knows the work to compare the draft with a known good result before it is used.",
    },
  };
  const task = answers.bottleneck.length === 1
    ? tasks[answers.bottleneck[0]]
    : {
        title: "Choose your first workflow pilot",
      output: "A comparison table of the selected workflows: frequency, time spent, available inputs, review effort and a recommended first test once those details are confirmed.",
        input: "One completed example from each selected workflow and the inputs used.",
        task: "Compare frequency, time spent, available inputs and review effort across the selected workflows. Choose one repeatable task with accessible inputs to test first.",
        review: "The people doing these workflows confirm the comparison and review the chosen pilot before any output is used.",
      };
  return {
    title: task.title,
    summary: `Start with a small, read-only pilot. Your desired result: ${answers.outcome.join("; ")}`,
    output: task.output,
    inputs: [
      task.input,
      `An approved export from: ${answers.sources.join(", ")}.`,
      "A named workflow owner and permission to use the selected records.",
    ],
    steps: [
      "Choose one completed example and record how the team handles it today.",
      task.task,
      "Compare the draft with the completed example. Record errors, missing evidence and review time before expanding.",
    ],
    review: task.review,
    firstStep:
      "Ask the person doing this work to walk through one completed example. Save the input, final output and the checks they made; use that as your first test case.",
    success:
      "Agree on an acceptable error rate and measure total time including human review against the current process. Stop if review costs outweigh the benefit.",
  };
}
