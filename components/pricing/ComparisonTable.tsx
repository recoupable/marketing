import { ComparisonCell } from "@/components/pricing/ComparisonCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pricingCopy } from "@/lib/copy/pricing";

/**
 * Side-by-side entitlements under the plan cards, so a visitor can answer
 * "which plan is me?" without reading three bullet lists. Rows match the app
 * `/plan` table wording. On mobile, `table-fixed` + a narrow feature column
 * keeps Free / Starter / Pro on-screen with no horizontal scroll (same idea as
 * app `PlanTable`).
 */
export function ComparisonTable() {
  const { title, columns, rows } = pricingCopy.comparison;
  return (
    <section className="max-w-3xl mx-auto mb-24">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--border)]">
        <Table className="table-fixed sm:table-auto">
          <colgroup className="sm:hidden">
            <col className="w-[28%]" />
            <col className="w-[24%]" />
            <col className="w-[24%]" />
            <col className="w-[24%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                scope="col"
                className="px-2 py-2 text-xs whitespace-normal text-muted-foreground sm:px-4 sm:py-3 sm:text-sm"
              >
                Plan
              </TableHead>
              {columns.map((c) => (
                <TableHead
                  key={c}
                  scope="col"
                  className="px-1 py-2 text-center text-xs whitespace-normal font-semibold text-foreground sm:px-4 sm:py-3 sm:text-left sm:text-sm"
                >
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label} className="hover:bg-transparent">
                <TableHead
                  scope="row"
                  className="px-2 py-2 text-xs whitespace-normal font-medium leading-snug text-foreground sm:px-4 sm:py-3 sm:text-sm"
                >
                  {row.label}
                </TableHead>
                {row.values.map((v, i) => (
                  <TableCell
                    key={columns[i]}
                    className="px-1 py-2 text-center text-xs whitespace-normal text-muted-foreground sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <ComparisonCell value={v} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
