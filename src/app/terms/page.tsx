import Link from "next/link";
import "../globals.css";

export default function TermsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">
          CURRENT
        </Link>
        <Link href="/" className="hero-link">
          ← Back
        </Link>
      </div>
      <main className="page-main">
        <h1 className="page-title">Terms of Service</h1>
        <div className="page-body">
          <p>
            These Terms of Service govern your use of Current&apos;s platform
            and services. By accessing or using Current, you agree to these
            terms.
          </p>

          <h3>Account Responsibilities</h3>
          <p>
            You are responsible for maintaining the security of your account
            credentials and for all activity under your account. You must
            provide accurate information when creating an account.
          </p>

          <h3>Acceptable Use</h3>
          <p>
            You agree to use Current only for lawful purposes and in compliance
            with all applicable laws. You may not use the platform to distribute
            harmful, misleading, or unauthorized content.
          </p>

          <h3>Service Availability</h3>
          <p>
            We strive to maintain reliable service but do not guarantee
            uninterrupted access. We reserve the right to modify or discontinue
            features with reasonable notice.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            Current is provided &quot;as is.&quot; We are not liable for
            indirect, incidental, or consequential damages arising from your use
            of the platform.
          </p>

          <h3>Contact</h3>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:legal@current.ai" style={{ color: "var(--teal)" }}>
              legal@current.ai
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
