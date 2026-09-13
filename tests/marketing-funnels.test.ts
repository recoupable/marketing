import { test, expect } from "vitest";
import { calculateWorkflowROI, readinessQuestions, recommendReadiness } from "../lib/marketing-migration-tools.ts";

test("workflow economics include setup and ongoing costs",()=>{
  const result=calculateWorkflowROI({monthlyHours:40,hourlyCost:40,timeReduction:50,monthlySystemCost:100,setupCost:2500});
  expect(result.hoursSaved).toBe(20);
  expect(result.capacityValue).toBe(800);
  expect(result.monthlyNetValue).toBe(700);
  expect(result.firstYearNetValue).toBe(5900);
  expect(result.paybackMonths).toBe(2500/700);
});

test("an uneconomic workflow shows a loss and no payback rather than invented savings",()=>{
  const result=calculateWorkflowROI({monthlyHours:10,hourlyCost:20,timeReduction:50,monthlySystemCost:200,setupCost:1000});
  expect(result.monthlyNetValue).toBe(-100);
  expect(result.firstYearNetValue).toBe(-2200);
  expect(result.paybackMonths).toBe(null);
});

test("zero costs, no work, and malformed assumptions remain finite",()=>{
  expect(calculateWorkflowROI({monthlyHours:0,hourlyCost:40,timeReduction:100,monthlySystemCost:0,setupCost:0})).toStrictEqual({hoursSaved:0,capacityValue:0,monthlyNetValue:0,firstYearNetValue:0,paybackMonths:null});
  const result=calculateWorkflowROI({monthlyHours:10,hourlyCost:20,timeReduction:200,monthlySystemCost:-10,setupCost:NaN});
  expect(result.hoursSaved).toBe(10);
  expect(result.monthlyNetValue).toBe(200);
  expect(result.paybackMonths).toBe(0);
});

const readyAnswers=Object.fromEntries(readinessQuestions.map(question=>[question.id,question.options[0]]));

test("readiness checks the information before recommending a custom build",()=>{
  const result=recommendReadiness({...readyAnswers,access:"We are not sure yet"});
  expect(result.title).toBe("Start with the information.");
  expect(result.interest).toBe("AI strategy");
});

test("readiness distinguishes an undefined task from an adoption issue",()=>{
  expect(recommendReadiness({...readyAnswers,workflow:"Still deciding"}).title).toBe("Make the job specific.");
  expect(recommendReadiness({...readyAnswers,owner:"We need help training the team"}).interest).toBe("Team training");
  expect(recommendReadiness(readyAnswers).interest).toBe("Custom systems");
});
