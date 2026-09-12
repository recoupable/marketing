import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { LegalDocument } from "@/app/privacy/legal-document";
import { legalSite as siteConfig } from "@/app/privacy/legal-site";

export const metadata: Metadata = withPageMetadata({ title: "Privacy Policy", description: "How Recoup collects, uses, discloses, and safeguards your information.", alternates: { canonical: "/privacy" } });

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-your-information', title: 'How We Use Your Information' },
  { id: 'information-sharing-and-disclosure', title: 'Information Sharing and Disclosure' },
  { id: 'third-party-services', title: 'Third-Party Services' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights-and-choices', title: 'Your Rights and Choices' },
  { id: 'children-apos-s-privacy', title: "Children's Privacy" },
  { id: 'international-data-transfers', title: 'International Data Transfers' },
  { id: 'changes-to-this-privacy-policy', title: 'Changes to This Privacy Policy' },
  { id: 'contact-us', title: 'Contact Us' }
];

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" sections={sections} updated="July 24, 2025">

        <h2 id="introduction">Introduction</h2>
        <p>
          At Recoup (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;), we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or use our services.
        </p>
        <p>
          By accessing or using our services, you agree to the collection and use
          of information in accordance with this policy.
        </p>

        <h2 id="information-we-collect">Information We Collect</h2>

        <h3>Personal Information</h3>
        <p>
          We may collect personally identifiable information that you voluntarily
          provide to us when you:
        </p>
        <ul>
          <li>Create an account or register for our services</li>
          <li>Subscribe to our newsletter or marketing communications</li>
          <li>Contact us through our website or support channels</li>
          <li>Participate in surveys, contests, or promotional activities</li>
          <li>
            Book a demo or consultation through our Calendly integration
          </li>
        </ul>

        <h3>Usage Data</h3>
        <p>
          We automatically collect certain information when you visit our
          website, including:
        </p>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on our site</li>
          <li>Referring website addresses</li>
          <li>Operating system and device characteristics</li>
        </ul>

        <h3>Cookies and Tracking Technologies</h3>
        <p>
          We use cookies, web beacons, and similar tracking technologies to
          enhance your experience on our website and analyze usage patterns.
        </p>

        <h2 id="how-we-use-your-information">How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including:
        </p>
        <ul>
          <li>Providing and maintaining our services</li>
          <li>Processing transactions and managing accounts</li>
          <li>Communicating with you about our services and updates</li>
          <li>Personalizing your experience on our website</li>
          <li>Analyzing usage patterns to improve our services</li>
          <li>Preventing fraud and ensuring security</li>
          <li>Complying with legal obligations</li>
          <li>Marketing and promotional communications (with your consent)</li>
        </ul>

        <h2 id="information-sharing-and-disclosure">Information Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties except in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> We may share information with
            trusted third-party service providers who assist us in operating our
            website and conducting our business
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information when
            required by law or to protect our rights and safety
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or sale of assets, your information may be transferred
          </li>
          <li>
            <strong>Consent:</strong> We may share information with your explicit
            consent
          </li>
        </ul>
        <p>
          We do not transfer or disclose Google user data to third parties for
          purposes other than those described in this Privacy Policy. Any access,
          use, or sharing of Google user data is strictly limited to providing
          and improving our services, fulfilling obligations required by law, or
          actions that you have explicitly authorized. We do not use Google user
          data for advertising, profiling, or any other unrelated purposes.
        </p>

        <h2 id="third-party-services">Third-Party Services</h2>
        <p>
          Our website integrates with third-party services that may collect
          information independently:
        </p>
        <ul>
          <li>
            <strong>Calendly:</strong> For booking demos and consultations
          </li>
          <li>
            <strong>SEObot:</strong> For blog content management
          </li>
          <li>
            <strong>Analytics Services:</strong> For website performance analysis
          </li>
          <li>
            <strong>Email Marketing Platforms:</strong> For newsletter and
            communication services
          </li>
        </ul>

        <h2 id="data-security">Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures
          to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. These measures include:
        </p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication procedures</li>
          <li>Employee training on data protection practices</li>
        </ul>

        <h2 id="your-rights-and-choices">Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have certain rights regarding your
          personal information:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> Request access to your personal information
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate
            information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal
            information
          </li>
          <li>
            <strong>Portability:</strong> Request transfer of your information
          </li>
          <li>
            <strong>Objection:</strong> Object to certain processing activities
          </li>
          <li>
            <strong>Opt-out:</strong> Unsubscribe from marketing communications
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information
          provided below.
        </p>

        <h2 id="children-apos-s-privacy">Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          you are a parent or guardian and believe your child has provided us with
          personal information, please contact us so we can take appropriate
          action.
        </p>

        <h2 id="international-data-transfers">International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other
          than your own. We ensure that such transfers comply with applicable
          data protection laws and implement appropriate safeguards to protect
          your information.
        </p>

        <h2 id="changes-to-this-privacy-policy">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &ldquo;Last updated&rdquo; date. We encourage you to
          review this Privacy Policy periodically for any changes.
        </p>

        <h2 id="contact-us">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy
          practices, please contact us:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </li>
          <li>
            Website:{" "}
            <a href={siteConfig.url}>{siteConfig.url}</a>
          </li>
        </ul>
        <p>
          <strong>Response Time:</strong> We aim to respond to all
          privacy-related inquiries within 30 days.
        </p>

  </LegalDocument>;
}
