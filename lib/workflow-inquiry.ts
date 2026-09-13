import type { AgentDraft } from './agent-browser.ts';
import { calculateWorkflowROI, type ROIInputs } from './marketing-migration-tools/calculateWorkflowROI.ts';
import { readinessQuestions } from './marketing-migration-tools/readinessQuestions.ts';
import { recommendReadiness } from './marketing-migration-tools/recommendReadiness.ts';

const number = (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
const usd = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);

export function roiInquiryDraft(inputs: ROIInputs): AgentDraft {
  const result = calculateWorkflowROI(inputs);
  return {
    interest: 'Custom systems',
    message: [
      'I’d like to discuss a workflow using these planning assumptions.',
      '',
      'From the Recoup workflow calculator:',
      `Current work: ${number(inputs.monthlyHours)} hours/month`,
      `Fully loaded cost: ${usd(inputs.hourlyCost)}/hour`,
      `Assumed time reduction: ${number(inputs.timeReduction)}%`,
      `Ongoing system cost: ${usd(inputs.monthlySystemCost)}/month`,
      `One-time setup cost: ${usd(inputs.setupCost)}`,
      '',
      `Modeled time freed up: ${number(result.hoursSaved)} hours/month`,
      `Monthly capacity value: ${usd(result.capacityValue)}`,
      `Monthly value after ongoing cost: ${usd(result.monthlyNetValue)}`,
      `First-year value after all costs: ${usd(result.firstYearNetValue)}`,
      `Modeled payback: ${result.paybackMonths === null ? 'Not reached' : result.paybackMonths === 0 ? 'No setup cost' : `${number(result.paybackMonths)} months`}`,
      '',
      'Time freed up is capacity, not automatically cash saved. These are planning assumptions, not a forecast or a Recoup quote.',
    ].join('\n'),
  };
}

export function readinessInquiryDraft(answers: Record<string, string>): AgentDraft {
  const result = recommendReadiness(answers);
  return {
    interest: result.interest,
    message: [
      'I’d like to discuss the next step for this workflow.',
      '',
      'From the Recoup readiness check:',
      ...readinessQuestions.flatMap(question => [question.question, answers[question.id], '']),
      `Suggested next step: ${result.title}`,
      result.description,
      '',
      'This suggestion is based on my answers, not a confirmed project scope.',
    ].join('\n'),
  };
}
