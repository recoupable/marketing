import type { Metadata } from "next";
import "../../directions.css";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { SkyArrow } from "@/components/sky/arrow";
import { catalogDirections } from "@/lib/catalog-directions";
import { siteConfig } from "@/lib/config";

const direction = catalogDirections.operations;

export const metadata: Metadata = {
  title: "Discuss your catalog workflow",
  description:
    "Talk with Recoup about custom AI systems for royalty workflows, catalog reporting, and portfolio operations.",
  alternates: { canonical: "/contact" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OperationsContactPage({
  searchParams,
}: {
  searchParams: Promise<{ workflow?: string | string[] }>;
}) {
  const { workflow } = await searchParams;
  const initialInterest =
    typeof workflow === "string" &&
    direction.interestOptions.some((interest) => interest === workflow)
      ? workflow
      : undefined;

  return (
    <section className="contact-layout section-padding direction-contact direction-operations">
      <div className="contact-copy">
        <Link href="/operations" className="text-link">
          Back to catalog operations <SkyArrow direction="left" />
        </Link>
        <h1>Let’s talk about your catalog.</h1>
        <p>
          We’ll identify a useful first build, the data it needs, and a rough
          scope.
        </p>
        <div className="contact-details">
          <span className="mono">OR EMAIL US</span>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </div>
      </div>
      <InquiryForm
        source="/operations/contact"
        key={initialInterest ?? "operations"}
        connected={true}
        variant="operations"
        initialInterest={initialInterest}
      />
    </section>
  );
}
