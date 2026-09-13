export function formatDemoMoney(cents: number): string {
  if (!Number.isSafeInteger(cents))
    throw new Error("Money must be safe integer cents.");
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
