import test from 'node:test';
import assert from 'node:assert/strict';
import { roiInquiryDraft, readinessInquiryDraft } from '../lib/workflow-inquiry.ts';
import { readinessQuestions } from '../lib/marketing-migration-tools.ts';
import { parseAgentDraft } from '../lib/agent-draft.ts';

test('ROI handoff preserves precise assumptions, results and the capacity qualification', () => {
  const draft = roiInquiryDraft({ monthlyHours: 42.5, hourlyCost: 65, timeReduction: 40, monthlySystemCost: 275, setupCost: 3200 });
  assert.equal(draft.interest, 'Custom systems');
  for (const line of ['42.5 hours/month', '$65.00/hour', '40%', '$275.00/month', '$3,200.00', '17 hours/month', '$1,105.00', '$830.00', '$6,760.00', '3.86 months', 'not automatically cash saved', 'not a forecast or a Recoup quote']) assert.ok(draft.message.includes(line), line);
  assert.deepEqual(parseAgentDraft(JSON.stringify({ draft, expiresAt: 2000 }), 1000), draft);
});

test('nonpositive monthly value never invents a payback in a prepared inquiry', () => {
  const draft = roiInquiryDraft({ monthlyHours: 10, hourlyCost: 20, timeReduction: 50, monthlySystemCost: 300, setupCost: 3200 });
  assert.ok(draft.message.includes('Monthly value after ongoing cost: -$200.00'));
  assert.ok(draft.message.includes('Modeled payback: Not reached'));
  assert.ok(!draft.message.includes('Infinity'));
});

test('readiness handoff includes all seven exact answers and the corresponding recommendation', () => {
  const answers: Record<string, string> = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
  const draft = readinessInquiryDraft(answers);
  assert.equal(draft.interest, 'Custom systems');
  for (const question of readinessQuestions) {
    assert.ok(draft.message.includes(question.question));
    assert.ok(draft.message.includes(answers[question.id]));
  }
  assert.ok(draft.message.includes('Scope a focused first build.'));
  assert.ok(draft.message.includes('not a confirmed project scope'));
  assert.deepEqual(parseAgentDraft(JSON.stringify({ draft, expiresAt: 2000 }), 1000), draft);
});

test('uncertain access carries the information-first recommendation into contact', () => {
  const answers: Record<string, string> = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
  answers.access = readinessQuestions[3].options[2];
  const draft = readinessInquiryDraft(answers);
  assert.equal(draft.interest, 'AI strategy');
  assert.ok(draft.message.includes('We are not sure yet'));
  assert.ok(draft.message.includes('Start with the information.'));
});
