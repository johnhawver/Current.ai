import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Current.ai",
  description: "Current.ai — Signal-driven retail intelligence for local stores.",
};

export default function PrivacyPage() {
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
        <h1 className="page-title">Privacy Policy</h1>
        <div className="page-body">
          <p>
            Current Technologies, Inc. (&quot;Current,&quot; &quot;we,&quot;
            &quot;us&quot;) is committed to protecting your privacy. This policy
            outlines how we collect, use, and safeguard your information.
          </p>

          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly — such as your email
            address, store name, and city — when you create an account or join
            our waitlist. We also collect usage data to improve our product.
          </p>

          <h3>How We Use Your Information</h3>
          <p>
            Your information is used to provide and improve Current&apos;s
            services, send relevant communications, and personalize your
            experience. We do not sell your personal data to third parties.
          </p>

          <h3>Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your
            information. However, no method of electronic storage is 100%
            secure.
          </p>

          <h3>Contact</h3>
          <p>
            Questions about this policy? Reach out at{" "}
            <a href="mailto:privacy@current.ai" className="text-teal hover:underline">
              privacy@current.ai
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
