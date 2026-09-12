import type { Metadata } from "next";
import "../../directions.css";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { SkyArrow } from "@/components/sky/arrow";
import { catalogDirections } from "@/lib/catalog-directions";
import { siteConfig } from "@/lib/config";

const direction = catalogDirections.acquisitions;

export const metadata: Metadata = {
  title: "Discuss your acquisition workflow",
  description:
    "Talk with Recoup about custom AI systems for catalog intake, diligence preparation, and acquisition reporting.",
  alternates: { canonical: "/contact" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AcquisitionContactPage({
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
    <section className="contact-layout section-padding direction-contact direction-acquisitions">
      <div className="contact-copy">
        <Link href="/acquisitions" className="text-link">
          Back to catalog acquisitions <SkyArrow direction="left" />
        </Link>
        <h1>Let’s talk about your next acquisition.</h1>
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
        source="/acquisitions/contact"
        key={initialInterest ?? "acquisitions"}
        connected={true}
        variant="acquisitions"
        initialInterest={initialInterest}
      />
    </section>
  );
}
