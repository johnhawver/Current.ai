"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

function ConnectForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";

  const [email, setEmail] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [storeName, setStoreName] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "generating" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("analyzing");
    setErrorMsg("");

    localStorage.setItem(
      "store",
      JSON.stringify({ email, shopifyUrl, storeName })
    );

    const { error } = await supabase.from("stores").insert({
      email,
      shopify_url: shopifyUrl,
      store_name: storeName,
    });
    if (error) {
      console.log("Supabase insert error:", error.message);
    }

    let analysis = {
      products: [storeName],
      categories: ["General"],
      tags: [],
      avgPrice: 45,
      priceRange: "mid-range",
    };

    try {
      const analyzeRes = await fetch("/api/analyze-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopifyUrl }),
      });
      if (analyzeRes.ok) {
        const data = await analyzeRes.json();
        if (data.success) analysis = data;
      }
    } catch {
      console.log("Store analysis failed, using fallback");
    }

    localStorage.setItem("analysis", JSON.stringify(analysis));

    setStatus("generating");

    let plan = {
      sms: `🥶 Cold front incoming! Stay warm with 15% off ${analysis.categories[0] || "our collection"}. Shop now →`,
      email: `Subject: Cold weather is here — your wardrobe isn't ready\n\nTemperatures are dropping. Our ${analysis.categories[0] || "top picks"} are built for this.\n\nUse code STAYWARM for 15% off.`,
      strategy: `Run a flash sale on cold-weather ${analysis.categories[0] || "products"} timed to the forecast. Push urgency with a 48-hour window.`,
      source: "mock",
    };

    try {
      const planRes = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: analysis.categories,
          priceRange: analysis.priceRange,
          location: "New York",
        }),
      });
      if (planRes.ok) {
        const data = await planRes.json();
        if (data.sms) plan = data;
      }
    } catch {
      console.log("Plan generation failed, using fallback");
    }

    localStorage.setItem("plan", JSON.stringify(plan));

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
        <label htmlFor="storeName">Store Name</label>
        <input
          id="storeName"
          type="text"
          required
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="e.g. Northbound Apparel"
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

      {status === "error" && (
        <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="form-submit flex items-center justify-center gap-3"
        disabled={status === "analyzing" || status === "generating"}
      >
        {status === "analyzing" || status === "generating" ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            {status === "analyzing" ? "Analyzing store..." : "Generating plan..."}
          </>
        ) : (
          "Connect Store"
        )}
      </button>

      <p className="text-center text-white/25 text-xs mt-5 font-light leading-relaxed">
        We&apos;ll sync your Shopify catalog and start monitoring weather
        across your customer regions. No credit card required.
      </p>
    </form>
  );
}

export default function ConnectPage() {
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
          weather-triggered campaigns automatically.
        </p>
        <Suspense fallback={<div className="text-white/30 text-sm">Loading...</div>}>
          <ConnectForm />
        </Suspense>
      </main>
    </div>
  );
}
