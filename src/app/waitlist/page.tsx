"use client";

import { useState } from "react";
import Link from "next/link";
import "../globals.css";

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
                placeholder="you@store.com"
              />
            </div>
            <button type="submit" className="form-submit">
              Get Early Access
            </button>
          </form>
        ) : (
          <p className="success-message">
            You&apos;re on the list. We&apos;ll reach out shortly.
          </p>
        )}
      </main>
    </div>
  );
}
