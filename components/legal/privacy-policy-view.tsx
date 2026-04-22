import { Calendar, FileText, Shield } from "lucide-react";

import { LegalPageHero, gradientText } from "@/components/legal/legal-page-hero";
import {
  LegalArticle,
  LegalContactBox,
  LegalP,
  LegalSection,
  LegalSubheading,
  LegalUl,
} from "@/components/legal/legal-markup";
import { formatLegalDate, LEGAL_LAST_UPDATED_ISO } from "@/lib/site/legal-shared";

export function PrivacyPolicyView() {
  const effective = formatLegalDate(LEGAL_LAST_UPDATED_ISO);

  return (
    <>
      <LegalPageHero
        badgeIcon={Shield}
        badge="Legal"
        title={
          <>
            Privacy{" "}
            <span className={gradientText}>Policy</span>
          </>
        }
        description="Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services."
        meta={[
          { icon: Calendar, label: "Last Updated", value: effective },
          { icon: FileText, label: "Effective Date", value: effective },
        ]}
      />
      <LegalArticle>
        <LegalSection title="1. Introduction">
          <LegalP>
            Welcome to ReechOut (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
            We are committed to protecting your personal information and your
            right to privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website and
            use our AI-powered phone interview automation services.
          </LegalP>
          <LegalP>
            Please read this Privacy Policy carefully. If you do not agree with the
            terms of this Privacy Policy, please do not access or use our services.
          </LegalP>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <LegalSubheading>2.1 Information You Provide to Us</LegalSubheading>
          <LegalP>
            We collect information that you provide directly to us, including:
          </LegalP>
          <LegalUl
            items={[
              "Account information: name, email address, phone number, company name, and password",
              "Profile information: job title, professional background, and preferences",
              "Interview data: candidate information, interview recordings, transcripts, and evaluation notes",
              "Communication data: messages, feedback, and support requests",
              "Payment information: billing address, payment method, and transaction details",
            ]}
          />

          <LegalSubheading>2.2 Automatically Collected Information</LegalSubheading>
          <LegalP>
            When you use our services, we automatically collect certain
            information, including:
          </LegalP>
          <LegalUl
            items={[
              "Device information: IP address, browser type, device type, operating system",
              "Usage data: pages visited, features used, time spent, click patterns",
              "Log data: access times, dates, and referring website addresses",
              "Cookies and similar tracking technologies: see our Cookie Policy for more details",
            ]}
          />
        </LegalSection>

        <LegalSection title="3. How We Use Your Information">
          <LegalP>We use the information we collect for various purposes, including:</LegalP>
          <LegalUl
            items={[
              "To provide, maintain, and improve our services",
              "To process your transactions and manage your account",
              "To conduct phone interviews and generate candidate reports",
              "To send you technical notices, updates, and support messages",
              "To respond to your comments, questions, and customer service requests",
              "To monitor and analyze trends, usage, and activities",
              "To detect, prevent, and address technical issues and security threats",
              "To comply with legal obligations and enforce our terms",
              "To send you promotional communications (with your consent)",
            ]}
          />
        </LegalSection>

        <LegalSection title="4. Information Sharing and Disclosure">
          <LegalP>
            We do not sell your personal information. We may share your information
            in the following circumstances:
          </LegalP>

          <LegalSubheading>4.1 Service Providers</LegalSubheading>
          <LegalP>
            We may share your information with third-party service providers who
            perform services on our behalf, such as cloud hosting, payment processing,
            analytics, and customer support.
          </LegalP>

          <LegalSubheading>4.2 Legal Requirements</LegalSubheading>
          <LegalP>
            We may disclose your information if required by law, court order, or
            governmental authority, or if we believe disclosure is necessary to
            protect our rights, property, or safety.
          </LegalP>

          <LegalSubheading>4.3 Business Transfers</LegalSubheading>
          <LegalP>
            In the event of a merger, acquisition, or sale of assets, your
            information may be transferred to the acquiring entity.
          </LegalP>

          <LegalSubheading>4.4 With Your Consent</LegalSubheading>
          <LegalP>
            We may share your information with third parties when you have
            explicitly consented to such sharing.
          </LegalP>
        </LegalSection>

        <LegalSection title="5. Data Security">
          <LegalP>
            We implement appropriate technical and organizational security measures to
            protect your personal information against unauthorized access, alteration,
            disclosure, or destruction. These measures include:
          </LegalP>
          <LegalUl
            items={[
              "Encryption of data in transit and at rest",
              "Regular security assessments and penetration testing",
              "Access controls and authentication mechanisms",
              "Secure data centers with physical security measures",
              "Employee training on data protection practices",
            ]}
          />
          <LegalP>
            However, no method of transmission over the Internet or electronic storage
            is 100% secure. While we strive to protect your information, we cannot
            guarantee absolute security.
          </LegalP>
        </LegalSection>

        <LegalSection title="6. Your Privacy Rights">
          <LegalP>
            Depending on your location, you may have certain rights regarding your
            personal information:
          </LegalP>
          <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-color)]">
            <li>
              <strong className="text-[var(--text-heading)]">Access:</strong>{" "}
              Request access to your personal information
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Correction:</strong>{" "}
              Request correction of inaccurate or incomplete data
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Deletion:</strong>{" "}
              Request deletion of your personal information
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Portability:</strong>{" "}
              Request transfer of your data to another service
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Objection:</strong>{" "}
              Object to processing of your personal information
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Restriction:</strong>{" "}
              Request restriction of processing your personal information
            </li>
            <li>
              <strong className="text-[var(--text-heading)]">Withdrawal:</strong>{" "}
              Withdraw consent for data processing where applicable
            </li>
          </ul>
          <LegalP>
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:privacy@reechout.com"
              className="font-semibold text-[var(--primary-color)] underline-offset-2 hover:underline"
            >
              privacy@reechout.com
            </a>
            . We will respond to your request within 30 days.
          </LegalP>
        </LegalSection>

        <LegalSection title="7. Data Retention">
          <LegalP>
            We retain your personal information for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, unless a longer retention
            period is required or permitted by law. When we no longer need your
            information, we will securely delete or anonymize it.
          </LegalP>
          <LegalP>
            Account data is retained while your account is active and for a period of
            30 days after account deletion, unless legal requirements necessitate
            longer retention.
          </LegalP>
        </LegalSection>

        <LegalSection title="8. Cookies and Tracking Technologies">
          <LegalP>
            We use cookies and similar tracking technologies to track activity on our
            website and hold certain information. You can instruct your browser to
            refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our
            service.
          </LegalP>
          <LegalP>
            For more information about how we use cookies, please refer to our Cookie
            Policy.
          </LegalP>
        </LegalSection>

        <LegalSection title="9. Children's Privacy">
          <LegalP>
            Our services are not intended for individuals under the age of 18. We do
            not knowingly collect personal information from children under 18. If you
            are a parent or guardian and believe your child has provided us with
            personal information, please contact us immediately.
          </LegalP>
        </LegalSection>

        <LegalSection title="10. International Data Transfers">
          <LegalP>
            Your information may be transferred to and processed in countries other
            than your country of residence. These countries may have data protection
            laws that differ from those in your country. We ensure that appropriate
            safeguards are in place to protect your information in accordance with
            this Privacy Policy.
          </LegalP>
        </LegalSection>

        <LegalSection title="11. Changes to This Privacy Policy">
          <LegalP>
            We may update this Privacy Policy from time to time. We will notify you of
            any changes by posting the new Privacy Policy on this page and updating the
            &quot;Last Updated&quot; date. You are advised to review this Privacy Policy
            periodically for any changes.
          </LegalP>
          <LegalP>
            Changes to this Privacy Policy are effective when they are posted on this
            page.
          </LegalP>
        </LegalSection>

        <LegalSection title="12. Contact Us">
          <LegalP>
            If you have any questions about this Privacy Policy or our data practices,
            please contact us:
          </LegalP>
          <LegalContactBox>
            <p>
              <strong className="text-[var(--text-heading)]">Email:</strong>{" "}
              <a
                href="mailto:privacy@reechout.com"
                className="font-semibold text-[var(--primary-color)] hover:underline"
              >
                privacy@reechout.com
              </a>
            </p>
            <p className="mt-2">
              <strong className="text-[var(--text-heading)]">Address:</strong>{" "}
              ReechOut, 123 Business Street, City, State, ZIP Code
            </p>
          </LegalContactBox>
        </LegalSection>
      </LegalArticle>
    </>
  );
}
