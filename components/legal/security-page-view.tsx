import { Calendar, Shield } from "lucide-react";

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

export function SecurityPageView() {
  const lastUpdated = formatLegalDate(LEGAL_LAST_UPDATED_ISO);

  return (
    <>
      <LegalPageHero
        badgeIcon={Shield}
        badge="Security"
        title={
          <>
            Security & <span className={gradientText}>Protection</span>
          </>
        }
        description="At ReechOut, we take security seriously. Learn about our comprehensive security measures and how we protect your data and candidate information."
        meta={[
          { icon: Calendar, label: "Last Updated", value: lastUpdated },
          {
            icon: Shield,
            label: "Security level",
            value: "Enterprise grade",
          },
        ]}
      />
      <LegalArticle>
        <LegalSection title="1. Our Security Commitment">
          <LegalP>
            At ReechOut, security is fundamental to everything we do. We are committed
            to protecting your data and ensuring the confidentiality, integrity, and
            availability of all information processed through our platform. We
            implement industry-leading security measures and follow best practices to
            safeguard your sensitive data.
          </LegalP>
          <LegalP>
            Our security framework is designed to meet or exceed industry standards and
            regulatory requirements, including GDPR, SOC 2, and ISO 27001 compliance.
          </LegalP>
        </LegalSection>

        <LegalSection title="2. Data Encryption">
          <LegalSubheading>2.1 Encryption in Transit</LegalSubheading>
          <LegalP>
            All data transmitted between your devices and our servers is encrypted
            using Transport Layer Security (TLS) 1.3, the industry standard for secure
            communications. This ensures that your data cannot be intercepted or read
            by unauthorized parties during transmission.
          </LegalP>
          <LegalUl
            items={[
              "All API communications use TLS 1.3 encryption",
              "HTTPS is enforced for all web traffic",
              "Strong cipher suites are configured to prevent vulnerabilities",
              "Certificate pinning is implemented for mobile applications",
            ]}
          />

          <LegalSubheading>2.2 Encryption at Rest</LegalSubheading>
          <LegalP>
            All sensitive data stored in our databases and file systems is encrypted at
            rest using Advanced Encryption Standard (AES-256), one of the strongest
            encryption algorithms available.
          </LegalP>
          <LegalUl
            items={[
              "Database encryption using AES-256",
              "File storage encryption for all uploaded documents",
              "Encrypted backups with separate encryption keys",
              "Key management through secure key vaults",
            ]}
          />
        </LegalSection>

        <LegalSection title="3. Access Controls and Authentication">
          <LegalP>
            We implement multiple layers of access controls to ensure that only
            authorized personnel can access your data.
          </LegalP>

          <LegalSubheading>3.1 User Authentication</LegalSubheading>
          <LegalUl
            items={[
              "Multi-factor authentication (MFA) support for enhanced account security",
              "Strong password requirements with complexity rules",
              "Session management with automatic timeout after inactivity",
              "Single Sign-On (SSO) support for enterprise customers",
              "Account lockout after multiple failed login attempts",
            ]}
          />

          <LegalSubheading>3.2 Role-Based Access Control</LegalSubheading>
          <LegalP>
            Our platform uses role-based access control (RBAC) to ensure users only have
            access to the data and features necessary for their role. Access permissions
            are regularly reviewed and updated.
          </LegalP>

          <LegalSubheading>3.3 Employee Access</LegalSubheading>
          <LegalP>
            ReechOut employees are granted access to customer data only on a
            need-to-know basis and under strict security protocols. All access is
            logged, monitored, and regularly audited.
          </LegalP>
        </LegalSection>

        <LegalSection title="4. Infrastructure Security">
          <LegalSubheading>4.1 Cloud Infrastructure</LegalSubheading>
          <LegalP>
            Our infrastructure is hosted on leading cloud providers that maintain
            industry-leading security certifications and compliance standards.
          </LegalP>
          <LegalUl
            items={[
              "Data centers with 24/7 physical security and monitoring",
              "Redundant systems and automated failover capabilities",
              "Regular security audits and vulnerability assessments",
              "DDoS protection and mitigation services",
              "Network segmentation and firewall protection",
            ]}
          />

          <LegalSubheading>4.2 System Hardening</LegalSubheading>
          <LegalP>
            All systems are hardened according to security best practices, including:
          </LegalP>
          <LegalUl
            items={[
              "Regular security patches and updates",
              "Minimal attack surface with unnecessary services disabled",
              "Intrusion detection and prevention systems",
              "Continuous security monitoring and threat detection",
            ]}
          />
        </LegalSection>

        <LegalSection title="5. Data Protection and Privacy">
          <LegalP>
            We are committed to protecting your privacy and handling your data
            responsibly.
          </LegalP>

          <LegalSubheading>5.1 Data Minimization</LegalSubheading>
          <LegalP>
            We only collect and process data that is necessary for providing our
            services. We do not sell your data to third parties.
          </LegalP>

          <LegalSubheading>5.2 Data Retention</LegalSubheading>
          <LegalP>
            Data is retained only for as long as necessary to fulfill the purposes
            outlined in our Privacy Policy. When data is no longer needed, it is
            securely deleted using industry-standard data destruction methods.
          </LegalP>

          <LegalSubheading>5.3 Data Residency</LegalSubheading>
          <LegalP>
            We provide options for data residency to meet your compliance requirements.
            You can specify where your data is stored and processed.
          </LegalP>
        </LegalSection>

        <LegalSection title="6. Compliance and Certifications">
          <LegalP>
            We maintain compliance with industry standards and regulations to ensure the
            highest level of security and data protection.
          </LegalP>
          <LegalUl
            items={[
              "GDPR: Compliant with General Data Protection Regulation requirements",
              "SOC 2 Type II: Annual audits of our security controls",
              "ISO 27001: Information security management system certification",
              "HIPAA: Healthcare data protection compliance where applicable",
              "CCPA: California Consumer Privacy Act compliance",
            ]}
          />
        </LegalSection>

        <LegalSection title="7. Security Monitoring and Incident Response">
          <LegalSubheading>7.1 Continuous Monitoring</LegalSubheading>
          <LegalP>
            We employ continuous security monitoring to detect and respond to potential
            threats in real-time. Our security operations center (SOC) monitors:
          </LegalP>
          <LegalUl
            items={[
              "Network traffic and anomalies",
              "System logs and access patterns",
              "Threat intelligence feeds",
              "Vulnerability scans and assessments",
            ]}
          />

          <LegalSubheading>7.2 Incident Response</LegalSubheading>
          <LegalP>
            We have a comprehensive incident response plan in place to quickly identify,
            contain, and remediate security incidents. In the event of a security
            incident affecting your data, we will notify you promptly in accordance with
            applicable laws and regulations.
          </LegalP>
        </LegalSection>

        <LegalSection title="8. Security Best Practices for Users">
          <LegalP>
            While we implement comprehensive security measures, you also play an
            important role in keeping your account secure:
          </LegalP>
          <LegalUl
            items={[
              "Use a strong, unique password for your account",
              "Enable multi-factor authentication (MFA) when available",
              "Keep your devices and browsers updated",
              "Never share your login credentials with others",
              "Log out when using shared or public computers",
              "Be cautious of phishing attempts and suspicious emails",
              "Regularly review your account activity and access logs",
            ]}
          />
        </LegalSection>

        <LegalSection title="9. Vulnerability Disclosure">
          <LegalP>
            We take security vulnerabilities seriously. If you discover a security
            vulnerability in our platform, please report it to us responsibly. We
            will acknowledge your report and work with you to address the issue.
          </LegalP>
          <LegalP>
            Please send security vulnerability reports to{" "}
            <a
              href="mailto:security@reechout.com"
              className="font-semibold text-[var(--primary-color)] hover:underline"
            >
              security@reechout.com
            </a>
            . We appreciate your assistance in keeping our platform secure.
          </LegalP>
        </LegalSection>

        <LegalSection title="10. Security Audits and Assessments">
          <LegalP>
            We conduct regular security audits and assessments to identify and address
            potential security issues. These include:
          </LegalP>
          <LegalUl
            items={[
              "Annual third-party security audits",
              "Penetration testing by certified security professionals",
              "Code security reviews and static analysis",
              "Infrastructure vulnerability assessments",
              "Compliance audits and certifications",
            ]}
          />
        </LegalSection>

        <LegalSection title="11. Business Continuity and Disaster Recovery">
          <LegalP>
            We maintain comprehensive business continuity and disaster recovery plans to
            ensure service availability and data protection.
          </LegalP>
          <LegalUl
            items={[
              "Regular automated backups with point-in-time recovery",
              "Disaster recovery plans tested regularly",
              "Redundant systems and infrastructure",
              "Service level agreements (SLAs) for uptime",
            ]}
          />
        </LegalSection>

        <LegalSection title="12. Security Contact Information">
          <LegalP>
            If you have any questions about our security practices or wish to report a
            security concern, please contact us:
          </LegalP>
          <LegalContactBox>
            <p>
              <strong className="text-[var(--text-heading)]">Security email:</strong>{" "}
              <a
                href="mailto:security@reechout.com"
                className="font-semibold text-[var(--primary-color)] hover:underline"
              >
                security@reechout.com
              </a>
            </p>
            <p className="mt-2">
              <strong className="text-[var(--text-heading)]">General support:</strong>{" "}
              <a
                href="mailto:support@reechout.com"
                className="font-semibold text-[var(--primary-color)] hover:underline"
              >
                support@reechout.com
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
