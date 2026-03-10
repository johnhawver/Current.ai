"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import "../globals.css";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="plan" value={plan} />

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@store.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <div className="form-group">
        <label htmlFor="storeName">Store Name</label>
        <input
          id="storeName"
          type="text"
          required
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Your Store"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ann Arbor, MI"
        />
      </div>

      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          color: "var(--text-dim)",
          letterSpacing: "0.08em",
          marginBottom: "20px",
        }}
      >
        PLAN: {plan.toUpperCase()}
      </p>

      <button type="submit" className="form-submit">
        Create Account
      </button>
    </form>
  );
}

export default function SignupPage() {
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
        <h1 className="page-title">Start your free trial</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
