"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateBranding } from "../actions/ai-actions";
import type { BrandingResult as BrandingResultType } from "@/types";
import BrandingResult from "@/components/BrandingResult";
import { useStore } from "@/hooks/useStore";

interface StoreData {
  email: string;
  shopifyUrl: string;
  storeName: string;
}

interface PlanData {
  sms: string;
  email: string;
  strategy: string;
  weather?: { temp: number; condition: string; description: string };
  source?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { store: dbStore, loading: storeLoading } = useStore();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [ready, setReady] = useState(false);
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [planStatus, setPlanStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [aiStatus, setAiStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [storeName, setStoreName] = useState("");
  const [branding, setBranding] = useState<BrandingResultType | null>(null);

  useEffect(() => {
    if (storeLoading) return;

    if (dbStore) {
      const data: StoreData = {
        email: dbStore.email ?? "",
        shopifyUrl: dbStore.shopify_url ?? "",
        storeName: dbStore.store_name,
      };
      setStoreData(data);
      setStoreName(data.storeName);
      setReady(true);
      return;
    }

    const raw = localStorage.getItem("store");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      const parsed: StoreData = JSON.parse(raw);
      setStoreData(parsed);
      setStoreName(parsed.storeName);
    } catch {
      router.replace("/");
      return;
    }
    setReady(true);

    const savedPlan = localStorage.getItem("plan");
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
        setPlanStatus("done");
      } catch { /* ignore */ }
    }
  }, [storeLoading, dbStore, router]);

  async function handleGenerateNewPlan() {
    setPlanStatus("loading");

    const analysisRaw = localStorage.getItem("analysis");
    let categories = ["General"];
    let priceRange = "mid-range";
    if (analysisRaw) {
      try {
        const a = JSON.parse(analysisRaw);
        if (a.categories?.length) categories = a.categories;
        if (a.priceRange) priceRange = a.priceRange;
      } catch { /* ignore */ }
    }

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories, priceRange, location: "New York" }),
      });

      if (res.ok) {
        const data: PlanData = await res.json();
        setPlan(data);
        localStorage.setItem("plan", JSON.stringify(data));
        setPlanStatus("done");
        return;
      }
    } catch {
      console.log("Plan generation failed");
    }

    setPlanStatus("error");
  }

  async function handleGenerateBranding() {
    setAiStatus("generating");
    setErrorMsg("");
    const result = await generateBranding(storeName);
    if (result.error) {
      setErrorMsg(result.error);
      setAiStatus("error");
      return;
    }
    setBranding(result.data!);
    setAiStatus("done");
  }

  function handleLogout() {
    localStorage.removeItem("store");
    router.replace("/");
  }

  function handleBrandingReset() {
    setAiStatus("idle");
    setBranding(null);
    setErrorMsg("");
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/30 text-sm font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white pt-16">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">CURRENT</Link>
        <button
          onClick={handleLogout}
          className="font-sans text-sm text-white/40 hover:text-red-400 transition cursor-pointer"
        >
          Log out
        </button>
      </div>

      <main className="dashboard-main">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="dashboard-title mb-0">Your Store Dashboard</h1>
        </div>

        {/* ── Connected store info ── */}
        {storeData && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-teal">
                Connected Store
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-400 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Active
              </span>
            </div>
            <h2 className="font-syne font-bold text-xl text-white/90 tracking-tight mb-3">
              {storeData.storeName}
            </h2>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-white/40 font-light">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest mr-2">URL</span>
                {storeData.shopifyUrl}
              </p>
              <p className="text-sm text-white/40 font-light">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest mr-2">Email</span>
                {storeData.email}
              </p>
            </div>
          </div>
        )}

        {/* ── AI Promotion Plan ── */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-teal">
              AI Promotion Plan
            </p>
            {plan?.weather && (
              <span className="font-mono text-[10px] text-white/30 tracking-wider">
                {plan.weather.temp}°F · {plan.weather.condition}
              </span>
            )}
          </div>

          {plan && planStatus === "done" ? (
            <div className="flex flex-col gap-3 mb-5">
              <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
                <p className="font-mono text-[10px] text-teal uppercase tracking-widest mb-2">SMS Campaign</p>
                <p className="text-sm text-white/70 font-light leading-relaxed">{plan.sms}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
                <p className="font-mono text-[10px] text-teal uppercase tracking-widest mb-2">Email Campaign</p>
                <p className="text-sm text-white/70 font-light leading-relaxed whitespace-pre-line">{plan.email}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
                <p className="font-mono text-[10px] text-teal uppercase tracking-widest mb-2">Strategy</p>
                <p className="text-sm text-white/70 font-light leading-relaxed">{plan.strategy}</p>
              </div>
              {plan.source && (
                <p className="font-mono text-[10px] text-white/15 text-right">
                  Source: {plan.source}
                </p>
              )}
            </div>
          ) : planStatus !== "loading" ? (
            <p className="text-sm text-white/30 font-light mb-5">
              Generate a weather-driven campaign plan for your store.
            </p>
          ) : null}

          <button
            onClick={handleGenerateNewPlan}
            disabled={planStatus === "loading"}
            className="font-syne font-semibold text-sm tracking-wide bg-teal text-black rounded-lg px-6 py-3 transition hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-wait cursor-pointer w-full"
          >
            {planStatus === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Generating plan...
              </span>
            ) : plan ? "Generate New Plan" : "Generate AI Plan"}
          </button>
        </div>

        {/* ── AI Branding section ── */}
        {aiStatus !== "done" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 mb-6">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-teal mb-4">
              Brand Strategy
            </p>
            <p className="text-sm text-white/40 font-light leading-relaxed mb-5">
              Generate an AI-powered brand kit — tagline, color palette, and growth tip — for {storeName}.
            </p>

            {aiStatus === "error" && (
              <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
            )}

            <button
              onClick={handleGenerateBranding}
              disabled={aiStatus === "generating"}
              className="font-syne font-semibold text-sm tracking-wide border border-teal text-teal rounded-lg px-6 py-3 transition hover:bg-teal hover:text-black disabled:opacity-60 disabled:cursor-wait cursor-pointer w-full"
            >
              {aiStatus === "generating" ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
                  Generating…
                </span>
              ) : (
                "Generate AI Strategy"
              )}
            </button>
          </div>
        )}

        {/* ── Branding result card ── */}
        {aiStatus === "done" && branding && (
          <BrandingResult
            storeName={storeName}
            branding={branding}
            onReset={handleBrandingReset}
          />
        )}

        {/* ── Disconnect store ── */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="text-sm text-white/25 hover:text-red-400 transition cursor-pointer font-mono"
          >
            Disconnect store & log out
          </button>
        </div>
      </main>
    </div>
  );
}
