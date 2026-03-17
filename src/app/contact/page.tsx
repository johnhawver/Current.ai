"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
        <h1 className="page-title">Contact Us</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="you@yourbrand.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="How can we help?"
                style={{ resize: "vertical" }}
              />
            </div>
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="success-message mb-6">
              Thanks for reaching out. We&apos;ll get back to you soon.
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
