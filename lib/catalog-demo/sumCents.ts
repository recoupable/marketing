export function sumCents(rows: readonly { amountCents: number }[]): number {
  const total = rows.reduce((sum, row) => sum + row.amountCents, 0);
  if (!Number.isSafeInteger(total))
    throw new Error("Statement total exceeds safe integer cents.");
  return total;
}
