import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Recoupable",
  description: "How Recoupable collects, uses, and protects your data.",
  path: "/privacy",
});

/**
 * Privacy policy page — required for email collection compliance.
 */
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p className="text-[var(--muted-foreground)]">
          Last updated: March 16, 2026
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          When you subscribe to our newsletter or use our services, we may
          collect:
        </p>
        <ul>
          <li>
            <strong>Email address</strong> — provided when you subscribe
          </li>
          <li>
            <strong>Name</strong> — optionally provided during signup
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, collected via Plausible
            Analytics (privacy-friendly, no cookies, no personal data)
          </li>
          <li>
            <strong>Attribution data</strong> — UTM parameters from the URL you
            arrived from (e.g., which social platform referred you)
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To send you our newsletter and product updates</li>
          <li>
            To understand which content and channels drive engagement (aggregate,
            not individual tracking)
          </li>
          <li>To improve our website and content</li>
        </ul>

        <h2>3. Analytics</h2>
        <p>
          We use{" "}
          <a
            href="https://plausible.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plausible Analytics
          </a>
          , a privacy-friendly analytics tool that:
        </p>
        <ul>
          <li>Does not use cookies</li>
          <li>Does not collect personal data</li>
          <li>Does not track users across websites</li>
          <li>Is fully GDPR, CCPA, and PECR compliant</li>
        </ul>

        <h2>4. CRM & Email</h2>
        <p>
          Subscriber data is stored in{" "}
          <a href="https://attio.com" target="_blank" rel="noopener noreferrer">
            Attio
          </a>
          , our CRM platform. We use it to:
        </p>
        <ul>
          <li>Manage our subscriber list</li>
          <li>Send welcome emails and occasional updates</li>
          <li>Track which content led to your subscription (attribution)</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information. We only share
          data with the service providers mentioned above (Plausible, Attio) as
          necessary to operate our services.
        </p>

        <h2>6. Your Rights</h2>
        <p>You can:</p>
        <ul>
          <li>Unsubscribe from our emails at any time (link in every email)</li>
          <li>Request deletion of your data</li>
          <li>Request a copy of your data</li>
        </ul>
        <p>
          Contact us at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          for any data requests.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on
          this page with an updated date.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about this privacy policy? Email us at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
