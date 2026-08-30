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
 * `/plan` table wording. Scrolls inside its own container on narrow screens;
 * the page never scrolls sideways.
 */
export function ComparisonTable() {
  const { title, columns, rows } = pricingCopy.comparison;
  return (
    <section className="max-w-3xl mx-auto mb-24">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="rounded-xl shadow-[0_0_0_1px_var(--border)]">
        <Table className="min-w-[520px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                scope="col"
                className="px-4 py-3 whitespace-normal text-muted-foreground"
              >
                Plan
              </TableHead>
              {columns.map((c) => (
                <TableHead
                  key={c}
                  scope="col"
                  className="px-4 py-3 whitespace-normal font-semibold text-foreground"
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
                  className="px-4 py-3 whitespace-normal font-medium text-foreground"
                >
                  {row.label}
                </TableHead>
                {row.values.map((v, i) => (
                  <TableCell
                    key={columns[i]}
                    className="px-4 py-3 whitespace-normal text-center text-muted-foreground"
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
