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
