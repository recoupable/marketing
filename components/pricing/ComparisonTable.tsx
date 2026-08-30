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

/** Hairline under each cell — same shadow-as-border as app `PlanTable`. */
const cellRule = "shadow-[0_1px_0_var(--border)]";

/**
 * Side-by-side entitlements under the plan cards. Layout, type scale, and
 * hairlines match app `/plan` (`PlanTable` / `PlanTableHeader` / `PlanTableRows`).
 * On mobile, `table-fixed` + colgroup keeps all three plans on-screen.
 */
export function ComparisonTable() {
  const { title, columns, rows } = pricingCopy.comparison;
  return (
    <section className="max-w-3xl mx-auto mb-24">
      <h2 className="sr-only">{title}</h2>
      <div className="overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--border)]">
        <Table className="table-fixed border-collapse sm:table-auto">
          <colgroup className="sm:hidden">
            <col className="w-[34%]" />
            <col className="w-[20%]" />
            <col className="w-[21%]" />
            <col className="w-[25%]" />
          </colgroup>
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead
                scope="col"
                className={`h-auto px-3 py-3 text-left text-[11px] font-medium whitespace-normal text-muted-foreground sm:px-4 sm:py-4 sm:text-xs ${cellRule}`}
              >
                <span className="sm:hidden">Compare</span>
                <span className="hidden sm:inline">Compare plans</span>
              </TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.name}
                  scope="col"
                  className={`h-auto px-1 py-3 text-center whitespace-normal sm:px-4 sm:py-4 ${cellRule}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground sm:text-base">
                      {column.name}
                    </span>
                    <span className="text-[11px] font-normal text-muted-foreground sm:text-[13px]">
                      <span className="sm:hidden">
                        {column.mobilePrice ?? column.price}
                      </span>
                      <span className="hidden sm:inline">{column.price}</span>
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                className="border-0 hover:bg-transparent"
              >
                <TableCell
                  className={`px-3 py-2.5 text-left text-xs whitespace-normal text-muted-foreground sm:px-4 sm:py-3 sm:text-sm ${cellRule}`}
                >
                  <span className="sm:hidden">{row.mobileLabel}</span>
                  <span className="hidden sm:inline">{row.label}</span>
                </TableCell>
                {row.values.map((v, i) => (
                  <TableCell
                    key={columns[i].name}
                    className={`px-1 py-2.5 text-center text-xs whitespace-normal sm:px-4 sm:py-3 sm:text-sm ${cellRule}`}
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
