/** "5" for a capped plan or "Unlimited", the app `/plan` table's cell wording. */
export function formatAnalyzeLimit(analyzeLimit: number | null): string {
  return analyzeLimit === null ? "Unlimited" : String(analyzeLimit);
}
