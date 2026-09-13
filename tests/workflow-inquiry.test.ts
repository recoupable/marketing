import { test, expect } from 'vitest';
import { roiInquiryDraft, readinessInquiryDraft } from '../lib/workflow-inquiry.ts';
import { readinessQuestions } from '../lib/marketing-migration-tools.ts';
import { parseAgentDraft } from '../lib/agent-draft.ts';

test('ROI handoff preserves precise assumptions, results and the capacity qualification', () => {
  const draft = roiInquiryDraft({ monthlyHours: 42.5, hourlyCost: 65, timeReduction: 40, monthlySystemCost: 275, setupCost: 3200 });
  expect(draft.interest).toBe('Custom systems');
  for (const line of ['42.5 hours/month', '$65.00/hour', '40%', '$275.00/month', '$3,200.00', '17 hours/month', '$1,105.00', '$830.00', '$6,760.00', '3.86 months', 'not automatically cash saved', 'not a forecast or a Recoup quote']) expect(draft.message.includes(line), line).toBeTruthy();
  expect(parseAgentDraft(JSON.stringify({ draft, expiresAt: 2000 }), 1000)).toStrictEqual(draft);
});

test('nonpositive monthly value never invents a payback in a prepared inquiry', () => {
  const draft = roiInquiryDraft({ monthlyHours: 10, hourlyCost: 20, timeReduction: 50, monthlySystemCost: 300, setupCost: 3200 });
  expect(draft.message.includes('Monthly value after ongoing cost: -$200.00')).toBeTruthy();
  expect(draft.message.includes('Modeled payback: Not reached')).toBeTruthy();
  expect(!draft.message.includes('Infinity')).toBeTruthy();
});

test('readiness handoff includes all seven exact answers and the corresponding recommendation', () => {
  const answers: Record<string, string> = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
  const draft = readinessInquiryDraft(answers);
  expect(draft.interest).toBe('Custom systems');
  for (const question of readinessQuestions) {
    expect(draft.message.includes(question.question)).toBeTruthy();
    expect(draft.message.includes(answers[question.id])).toBeTruthy();
  }
  expect(draft.message.includes('Scope a focused first build.')).toBeTruthy();
  expect(draft.message.includes('not a confirmed project scope')).toBeTruthy();
  expect(parseAgentDraft(JSON.stringify({ draft, expiresAt: 2000 }), 1000)).toStrictEqual(draft);
});

test('uncertain access carries the information-first recommendation into contact', () => {
  const answers: Record<string, string> = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
  answers.access = readinessQuestions[3].options[2];
  const draft = readinessInquiryDraft(answers);
  expect(draft.interest).toBe('AI strategy');
  expect(draft.message.includes('We are not sure yet')).toBeTruthy();
  expect(draft.message.includes('Start with the information.')).toBeTruthy();
});
