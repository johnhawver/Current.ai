"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
        <h1 className="page-title">Join the Waitlist</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="waitlist-email">Email</label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbrand.com"
              />
            </div>
            <button type="submit" className="form-submit">
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="success-message mb-6">
              You&apos;re on the list. We&apos;ll reach out shortly.
            </p>
            <Link
              href="/"
              className="font-syne font-semibold text-sm text-teal no-underline hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
