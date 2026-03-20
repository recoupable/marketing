import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use | Recoupable",
  description: "Terms and conditions for using Recoupable services.",
  path: "/terms-of-use",
});

/**
 * Terms of Use page — real content from recoupable.com.
 * Full legal TOS for Recoupable LLC.
 */
export default function TermsOfUsePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Use</h1>
      <div className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p>
          Welcome and thank you for your interest in {siteConfig.legalName}{" "}
          (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo; or
          &ldquo;our&rdquo;). This Terms of Use Agreement (&ldquo;Terms of
          Use&rdquo;, and together with any applicable Supplemental Terms as
          defined in Section 1.2, the &ldquo;Agreement&rdquo;) describes the
          terms and conditions that apply to your use of (i) the website located
          at{" "}
          <a href={siteConfig.url}>{siteConfig.url}</a> and its subdomains and
          any of Company&apos;s other websites on which a link to these Terms of
          Use appears (collectively, the &ldquo;Website&rdquo;) and (ii) the
          services, content, and other resources available on or enabled via our
          Website, including any application programming interfaces
          (&ldquo;API&rdquo;) that we make available and our AI agent platform
          and tools for artists, labels, and partners (collectively, with our
          Website, the &ldquo;Service&rdquo;).
        </p>

        <p className="font-semibold uppercase text-sm">
          PLEASE READ THIS AGREEMENT CAREFULLY. IT GOVERNS THE USE OF THE
          SERVICE AND APPLIES TO ALL VISITORS AND USERS. BY ACCESSING OR USING
          THE SERVICE IN ANY WAY, YOU REPRESENT THAT: (1) YOU HAVE READ,
          UNDERSTAND, AND AGREE TO BE BOUND BY THIS AGREEMENT, (2) YOU ARE OF
          LEGAL AGE TO FORM A BINDING CONTRACT WITH COMPANY, AND (3) YOU ARE NOT
          BARRED FROM USING THE SERVICE UNDER THE LAWS OF YOUR PLACE OF
          RESIDENCE OR ANY OTHER APPLICABLE JURISDICTION.
        </p>

        <p className="font-semibold uppercase text-sm">
          IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS OF USE, YOU MAY NOT
          ACCESS OR USE THE SERVICE.
        </p>

        <h2>1. Use of the Service</h2>
        <p>
          <strong>1.1. Scope.</strong> The Service and content available on the
          Service are protected by applicable intellectual property (including
          copyright) laws. Unless subject to a separate license agreement between
          you and Company, your right to access and use the Service, in whole or
          in part, is subject to this Agreement.
        </p>
        <p>
          <strong>1.2. Licenses.</strong> Subject to your compliance with this
          Agreement, Company grants you a limited non-exclusive, non-transferable,
          non-sublicensable, revocable license to: (i) access and use the
          Service; and (ii) access and use any APIs the Company makes available
          to you (if any), solely for your own personal or internal business
          purposes.
        </p>
        <p>
          <strong>1.3. Supplemental Terms.</strong> Your use of, and
          participation in, certain features and functionality of the Service may
          be subject to additional terms (&ldquo;Supplemental Terms&rdquo;). If
          these Terms of Use are inconsistent with the Supplemental Terms, then
          the Supplemental Terms control with respect to such supplemental
          Service.
        </p>
        <p>
          <strong>1.4. Updates.</strong> You understand that the Service is
          evolving. As a result, Company may require you to install updates to
          any software. You acknowledge and agree that Company may update the
          Service with or without notifying you. Any future release, update or
          other addition to the Service shall be subject to this Agreement.
        </p>
        <p>
          <strong>1.5. API Limitations.</strong> Company may limit the number of
          network calls, maximum file size, and anything else about the API that
          the Company deems appropriate. Company may impose or modify these
          limitations without notice.
        </p>

        <h2>2. Registration</h2>
        <p>
          <strong>2.1.</strong> In order to access certain features of the
          Service, you may be required to register an account (&ldquo;Account&rdquo;).
        </p>
        <p>
          <strong>2.2.</strong> You shall provide true, accurate, current, and
          complete information about yourself, and maintain and promptly update
          the Registration Data to keep it accurate.
        </p>
        <p>
          <strong>2.3.</strong> You have no ownership or other property interest
          in your Account. You are responsible for all activities that occur
          under your Account. You may not share your Account or password with
          anyone.
        </p>

        <h2>3. Responsibility for Content</h2>
        <p>
          You are entirely responsible for all Content that you upload, post,
          email, transmit or otherwise make available through the Service
          (&ldquo;Your Content&rdquo;). Company has no obligation to store any
          of Your Content. You are solely responsible for applying the
          appropriate level of access to Your Content.
        </p>

        <h2>4. Ownership</h2>
        <p>
          <strong>4.1.</strong> You agree that Company and its suppliers own all
          rights, title and interest in the Service.
        </p>
        <p>
          <strong>4.2.</strong> Company does not claim ownership of Your Content.
          However, you grant Company a non-exclusive, transferable, perpetual,
          irrevocable, worldwide, fully-paid, royalty-free, sublicensable right
          and license to use Your Content for the purposes of operating and
          providing the Service.
        </p>
        <p>
          <strong>4.3. Inputs and Outputs.</strong> The Company does not claim
          ownership of any of your Inputs or Outputs, nor does it restrict the
          use of Outputs for commercial use. You acknowledge that Inputs and
          Outputs may be used by the Company to train, develop, enhance, evolve
          and improve its AI models, algorithms and related technology.
        </p>

        <h2>5. User Conduct</h2>
        <p>
          You shall not use the Service for any unlawful purpose, make available
          any content that is threatening, abusive, defamatory, or offensive, or
          use the Service to develop competing products. You shall not license,
          sell, rent, or commercially exploit the Service. You shall not reverse
          engineer any part of the Service or use automated tools to scrape data.
        </p>

        <h2>6. Monitoring</h2>
        <p>
          Company may investigate, monitor, pre-screen, remove, refuse, or
          review the Service and/or Content at any time. Company reserves the
          right to terminate or suspend your access for any or no reason.
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          The Service may contain links to third-party websites, applications,
          and advertisements. Company is not responsible for any Third-Party
          Services. You use all links at your own risk.
        </p>

        <h2>8. Purchase Terms</h2>
        <p>
          The Company uses Stripe, Inc. for payment services. You agree to be
          bound by Stripe&apos;s Privacy Policy and Terms of Service. Except as
          set forth herein, amounts due are non-refundable. You may request a
          refund within seven (7) days of your initial purchase, provided no
          Credits have been used.
        </p>

        <h2>9. Subscriptions</h2>
        <p>
          Subscriptions automatically renew at Company&apos;s then-current price
          until terminated. You may cancel by logging into your Account or by
          contacting{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          . If you cancel, you may continue to use your Subscription until the
          end of the then-current term; it will not renew thereafter.
        </p>

        <h2>10. Indemnification</h2>
        <p>
          You shall indemnify and hold Company harmless from any losses, costs,
          liabilities and expenses relating to or arising out of Your Content,
          your misuse of the Service, your violation of this Agreement, or your
          violation of any rights of another party.
        </p>

        <h2>11. Disclaimer of Warranties</h2>
        <p>
          YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED
          ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITH
          ALL FAULTS. COMPANY MAKES NO WARRANTY THAT THE SERVICE WILL MEET YOUR
          REQUIREMENTS OR BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE.
        </p>

        <h2>12. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY LOSS OF PROFITS, REVENUE
          OR DATA, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES.
          COMPANY SHALL NOT BE LIABLE TO YOU FOR MORE THAN THE GREATER OF (i) THE
          TOTAL AMOUNT PAID TO COMPANY BY YOU DURING THE THREE-MONTH PERIOD
          PRIOR TO THE ACT GIVING RISE TO SUCH LIABILITY; (ii) $100.
        </p>

        <h2>13. Arbitration Agreement</h2>
        <p>
          You and Company agree that any dispute will be resolved by binding
          arbitration rather than in court, except that you and Company may
          assert claims in small-claims court if qualified. You and Company waive
          any right to a jury trial. Claims may only be brought on an individual
          basis, not as part of a class action. You may opt out within 30 days by
          writing to{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          or {siteConfig.legalName}, Attn: Legal, {siteConfig.address}.
        </p>

        <h2>14. General Provisions</h2>
        <p>
          This Agreement is governed by the laws of the State of Delaware. All
          claims and disputes will be litigated exclusively in the state or
          federal courts located in Delaware. This Agreement constitutes the
          final, complete and exclusive agreement between the parties.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </li>
          <li>
            Mail: {siteConfig.legalName}, Attn: Legal Dept.,{" "}
            {siteConfig.address}
          </li>
        </ul>
      </div>
    </div>
  );
}
