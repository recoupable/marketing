import type { z } from "zod/v3";
import type { briefReviewSchema } from "@/lib/website-agent/briefReview";

export function BriefReview({
  review,
}: {
  review: z.infer<typeof briefReviewSchema>;
}) {
  return (
    <section className="wa-brief-review" aria-label="Your report brief">
      <h2>Here’s what your report will address</h2>
      <dl>
        {review.recap.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
