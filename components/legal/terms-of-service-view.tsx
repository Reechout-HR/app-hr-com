import { Calendar, FileText } from "lucide-react";

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

export function TermsOfServiceView() {
  const effective = formatLegalDate(LEGAL_LAST_UPDATED_ISO);

  return (
    <>
      <LegalPageHero
        badgeIcon={FileText}
        badge="Legal"
        title={
          <>
            Terms of <span className={gradientText}>Service</span>
          </>
        }
        description="Please read these Terms of Service carefully before using our platform. By accessing or using ReechOut, you agree to be bound by these terms and conditions."
        meta={[
          { icon: Calendar, label: "Last Updated", value: effective },
          { icon: FileText, label: "Effective Date", value: effective },
        ]}
      />
      <LegalArticle>
        <LegalSection title="1. Acceptance of Terms">
          <LegalP>
            By accessing or using ReechOut (&quot;Service&quot;), you agree to be bound
            by these Terms of Service (&quot;Terms&quot;). If you disagree with any part
            of these terms, you may not access the Service.
          </LegalP>
          <LegalP>
            These Terms apply to all users of the Service, including without limitation
            users who are browsers, vendors, customers, merchants, and/or contributors
            of content.
          </LegalP>
        </LegalSection>

        <LegalSection title="2. Use of Service">
          <LegalSubheading>2.1 Eligibility</LegalSubheading>
          <LegalP>
            You must be at least 18 years old to use our Service. By using ReechOut,
            you represent and warrant that:
          </LegalP>
          <LegalUl
            items={[
              "You are at least 18 years of age",
              "You have the legal capacity to enter into these Terms",
              "You will comply with all applicable laws and regulations",
              "All information you provide is accurate and current",
            ]}
          />

          <LegalSubheading>2.2 Account Registration</LegalSubheading>
          <LegalP>To access certain features of the Service, you must register for an account. You agree to:</LegalP>
          <LegalUl
            items={[
              "Provide accurate, current, and complete information during registration",
              "Maintain and promptly update your account information",
              "Maintain the security of your password and identification",
              "Accept responsibility for all activities that occur under your account",
              "Notify us immediately of any unauthorized use of your account",
            ]}
          />
        </LegalSection>

        <LegalSection title="3. Service Description">
          <LegalP>
            ReechOut provides an AI-powered phone interview automation platform that
            enables businesses to:
          </LegalP>
          <LegalUl
            items={[
              "Conduct automated phone interviews with candidates",
              "Create and manage custom questionnaires",
              "Generate detailed candidate reports and evaluations",
              "Streamline recruitment and screening processes",
            ]}
          />
          <LegalP>
            We reserve the right to modify, suspend, or discontinue any part of the
            Service at any time, with or without notice, for any reason.
          </LegalP>
        </LegalSection>

        <LegalSection title="4. User Responsibilities and Conduct">
          <LegalP>
            You agree to use the Service only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </LegalP>
          <LegalUl
            items={[
              "Use the Service in any way that violates any applicable law or regulation",
              "Transmit any malicious code, viruses, or harmful content",
              "Attempt to gain unauthorized access to the Service or related systems",
              "Interfere with or disrupt the Service or servers connected to the Service",
              "Use the Service to collect or store personal data about other users without consent",
              "Impersonate any person or entity or falsely state your affiliation with any entity",
              "Use the Service for any fraudulent or deceptive purpose",
              "Violate any intellectual property rights of others",
            ]}
          />
        </LegalSection>

        <LegalSection title="5. Intellectual Property Rights">
          <LegalSubheading>5.1 Our Intellectual Property</LegalSubheading>
          <LegalP>
            The Service and its original content, features, and functionality are owned
            by ReechOut and are protected by international copyright, trademark,
            patent, trade secret, and other intellectual property laws.
          </LegalP>

          <LegalSubheading>5.2 Your Content</LegalSubheading>
          <LegalP>
            You retain ownership of any content you submit, post, or display on or
            through the Service (&quot;User Content&quot;). By submitting User
            Content, you grant us a worldwide, non-exclusive, royalty-free license to
            use, reproduce, modify, adapt, publish, and distribute such content for the
            purpose of providing and improving the Service.
          </LegalP>

          <LegalSubheading>5.3 Feedback</LegalSubheading>
          <LegalP>
            If you provide us with feedback, suggestions, or ideas about the Service,
            you agree that we may use such feedback without any obligation to
            compensate you.
          </LegalP>
        </LegalSection>

        <LegalSection title="6. Payment Terms">
          <LegalSubheading>6.1 Subscription Fees</LegalSubheading>
          <LegalP>
            Certain features of the Service may require payment of fees. You agree to
            pay all fees associated with your use of the Service in accordance with the
            pricing terms presented to you.
          </LegalP>

          <LegalSubheading>6.2 Billing and Renewal</LegalSubheading>
          <LegalP>
            Subscription fees are billed in advance on a monthly or annual basis. Your
            subscription will automatically renew unless you cancel before the renewal
            date. You are responsible for all applicable taxes.
          </LegalP>

          <LegalSubheading>6.3 Refunds</LegalSubheading>
          <LegalP>
            Refunds are provided in accordance with our refund policy. We reserve the
            right to change our pricing at any time, with notice to existing
            subscribers.
          </LegalP>
        </LegalSection>

        <LegalSection title="7. Privacy and Data Protection">
          <LegalP>
            Your use of the Service is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand our practices regarding the
            collection and use of your information.
          </LegalP>
          <LegalP>
            You are responsible for ensuring that you have the right to collect, use,
            and process any candidate data you provide to us through the Service.
          </LegalP>
        </LegalSection>

        <LegalSection title="8. Service Availability and Modifications">
          <LegalP>
            We strive to provide reliable service, but we do not guarantee that the
            Service will be available uninterrupted, secure, or error-free. We may
            perform scheduled or unscheduled maintenance that may temporarily interrupt
            the Service.
          </LegalP>
          <LegalP>
            We reserve the right to modify, update, or discontinue features of the
            Service at any time without prior notice. We shall not be liable to you or
            any third party for any modification, suspension, or discontinuance of the
            Service.
          </LegalP>
        </LegalSection>

        <LegalSection title="9. Termination">
          <LegalP>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason, including
            if you breach these Terms.
          </LegalP>
          <LegalP>
            Upon termination, your right to use the Service will cease immediately. You
            may terminate your account at any time by contacting us or using the
            account deletion features in the Service.
          </LegalP>
          <LegalP>
            All provisions of these Terms that by their nature should survive
            termination shall survive termination, including ownership provisions,
            warranty disclaimers, and limitations of liability.
          </LegalP>
        </LegalSection>

        <LegalSection title="10. Disclaimer of Warranties">
          <LegalP>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
            WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
            LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, OR NON-INFRINGEMENT.
          </LegalP>
          <LegalP>
            We do not warrant that the Service will meet your requirements, be
            available on an uninterrupted basis, or be error-free. We do not guarantee
            the accuracy or completeness of any information provided through the
            Service.
          </LegalP>
        </LegalSection>

        <LegalSection title="11. Limitation of Liability">
          <LegalP>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            REECHOUT, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS,
            EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF
            PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM
            YOUR USE OF THE SERVICE.
          </LegalP>
          <LegalP>
            Our total liability to you for all claims arising from or related to the
            Service shall not exceed the amount you paid us in the twelve (12) months
            preceding the claim.
          </LegalP>
        </LegalSection>

        <LegalSection title="12. Indemnification">
          <LegalP>
            You agree to indemnify, defend, and hold harmless ReechOut and its
            officers, directors, employees, and agents from and against any claims,
            liabilities, damages, losses, and expenses, including reasonable
            attorneys&apos; fees, arising out of or in any way connected with your use
            of the Service or violation of these Terms.
          </LegalP>
        </LegalSection>

        <LegalSection title="13. Governing Law and Dispute Resolution">
          <LegalP>
            These Terms shall be governed by and construed in accordance with the laws
            of the jurisdiction in which ReechOut operates, without regard to its
            conflict of law provisions.
          </LegalP>
          <LegalP>
            Any disputes arising out of or relating to these Terms or the Service shall
            be resolved through binding arbitration in accordance with the rules of the
            arbitration association, except where prohibited by law.
          </LegalP>
        </LegalSection>

        <LegalSection title="14. Changes to Terms">
          <LegalP>
            We reserve the right to modify these Terms at any time. We will notify you
            of any material changes by posting the new Terms on this page and updating
            the &quot;Last Updated&quot; date.
          </LegalP>
          <LegalP>
            Your continued use of the Service after any such changes constitutes your
            acceptance of the new Terms. If you do not agree to the modified Terms,
            you must stop using the Service.
          </LegalP>
        </LegalSection>

        <LegalSection title="15. Contact Information">
          <LegalP>If you have any questions about these Terms of Service, please contact us:</LegalP>
          <LegalContactBox>
            <p>
              <strong className="text-[var(--text-heading)]">Email:</strong>{" "}
              <a
                href="mailto:legal@reechout.com"
                className="font-semibold text-[var(--primary-color)] hover:underline"
              >
                legal@reechout.com
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
