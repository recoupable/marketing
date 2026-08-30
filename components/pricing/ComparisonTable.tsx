import { ComparisonCell } from "@/components/pricing/ComparisonCell";
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
      <div className="overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--border)]">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left">
              <th scope="col" className="px-4 py-3 font-medium text-[var(--muted-foreground)]">
                Plan
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-[var(--border)]">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={columns[i]}
                    className="px-4 py-3 text-center text-[var(--muted-foreground)]"
                  >
                    <ComparisonCell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
