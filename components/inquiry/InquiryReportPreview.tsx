import Image from "next/image";

/** Previously published platform output; this is an example, not a promised custom deliverable. */
export function InquiryReportPreview() {
  return <figure className="lead-report-preview">
    <a href="/images/pricing/weekly-report.png" target="_blank" rel="noopener noreferrer" aria-label="View a real weekly report from the Recoup platform (opens in a new tab)">
      <div className="lead-report-image">
        <Image src="/images/pricing/weekly-report.png" width={680} height={700} sizes="(max-width: 800px) 90vw, 440px" alt="Recoup weekly report for Elk Darling, showing a performance summary and stream gains by track for August 19–27, 2026." />
      </div>
      <figcaption><span><strong>A real weekly report</strong><span>From the Recoup platform</span></span><span className="lead-report-link">View report ↗</span></figcaption>
    </a>
  </figure>;
}
