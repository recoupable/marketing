import type { ProofNumbers } from "@/lib/pricing/const";

export interface ProofStat {
  value: string;
  label: string;
}

/** The dated production snapshot as two labelled counts for the proof block. */
export function buildProofStats(n: ProofNumbers): ProofStat[] {
  return [
    { value: n.reportsSent30d.toLocaleString("en-US"), label: "reports emailed in the last 30 days" },
    { value: n.artistsOnReports.toLocaleString("en-US"), label: "artists on a scheduled report" },
  ];
}
