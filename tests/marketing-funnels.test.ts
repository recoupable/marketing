import assert from "node:assert/strict";
import test from "node:test";
import { calculateWorkflowROI, readinessQuestions, recommendReadiness } from "../lib/marketing-migration-tools.ts";

test("workflow economics include setup and ongoing costs",()=>{
  const result=calculateWorkflowROI({monthlyHours:40,hourlyCost:40,timeReduction:50,monthlySystemCost:100,setupCost:2500});
  assert.equal(result.hoursSaved,20);
  assert.equal(result.capacityValue,800);
  assert.equal(result.monthlyNetValue,700);
  assert.equal(result.firstYearNetValue,5900);
  assert.equal(result.paybackMonths,2500/700);
});

test("an uneconomic workflow shows a loss and no payback rather than invented savings",()=>{
  const result=calculateWorkflowROI({monthlyHours:10,hourlyCost:20,timeReduction:50,monthlySystemCost:200,setupCost:1000});
  assert.equal(result.monthlyNetValue,-100);
  assert.equal(result.firstYearNetValue,-2200);
  assert.equal(result.paybackMonths,null);
});

test("zero costs, no work, and malformed assumptions remain finite",()=>{
  assert.deepEqual(calculateWorkflowROI({monthlyHours:0,hourlyCost:40,timeReduction:100,monthlySystemCost:0,setupCost:0}),{hoursSaved:0,capacityValue:0,monthlyNetValue:0,firstYearNetValue:0,paybackMonths:null});
  const result=calculateWorkflowROI({monthlyHours:10,hourlyCost:20,timeReduction:200,monthlySystemCost:-10,setupCost:NaN});
  assert.equal(result.hoursSaved,10);
  assert.equal(result.monthlyNetValue,200);
  assert.equal(result.paybackMonths,0);
});

const readyAnswers=Object.fromEntries(readinessQuestions.map(question=>[question.id,question.options[0]]));

test("readiness checks the information before recommending a custom build",()=>{
  const result=recommendReadiness({...readyAnswers,access:"We are not sure yet"});
  assert.equal(result.title,"Start with the information.");
  assert.equal(result.interest,"AI strategy");
});

test("readiness distinguishes an undefined task from an adoption issue",()=>{
  assert.equal(recommendReadiness({...readyAnswers,workflow:"Still deciding"}).title,"Make the job specific.");
  assert.equal(recommendReadiness({...readyAnswers,owner:"We need help training the team"}).interest,"Team training");
  assert.equal(recommendReadiness(readyAnswers).interest,"Custom systems");
});
