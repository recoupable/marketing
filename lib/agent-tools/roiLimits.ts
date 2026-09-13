import type { ROIInputs } from "../marketing-migration-tools/calculateWorkflowROI.ts";

export const roiLimits: Record<
  keyof ROIInputs,
  { maximum: number; description: string }
> = {
  monthlyHours: {
    maximum: 100_000,
    description:
      "Current total team hours spent on this workflow per month, in hours/month.",
  },
  hourlyCost: {
    maximum: 10_000,
    description: "Loaded labor cost in USD per person-hour.",
  },
  timeReduction: {
    maximum: 100,
    description:
      "Assumed share of current work time saved, in percent from 0 to 100. Supply your own assumption; this is not a Recoup performance promise.",
  },
  monthlySystemCost: {
    maximum: 1_000_000,
    description: "Estimated recurring system and operating cost, in USD/month.",
  },
  setupCost: {
    maximum: 10_000_000,
    description: "Estimated one-time implementation cost, in USD.",
  },
};
