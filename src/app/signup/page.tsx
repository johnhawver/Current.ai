"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");

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
          placeholder="you@yourbrand.com"
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
        <label htmlFor="shopifyUrl">Shopify Store URL</label>
        <input
          id="shopifyUrl"
          type="text"
          required
          value={shopifyUrl}
          onChange={(e) => setShopifyUrl(e.target.value)}
          placeholder="your-store.myshopify.com"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] text-dim tracking-[0.08em]">
          PLAN: {plan.toUpperCase()}
        </p>
        <p className="font-mono text-[11px] text-white/30 tracking-[0.08em]">
          14-day free trial
        </p>
      </div>

      <button type="submit" className="form-submit">
        Connect Store & Start Free Trial
      </button>

      <p className="text-center text-white/25 text-xs mt-5 font-light leading-relaxed">
        We&apos;ll connect to your Shopify catalog and start monitoring weather
        across your customer regions. No credit card required.
      </p>
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
        <h1 className="page-title">Connect your Shopify store</h1>
        <p className="text-white/40 text-sm font-light leading-relaxed -mt-4 mb-8">
          Current will sync your product catalog and start generating
          weather-triggered email and SMS campaigns automatically.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
