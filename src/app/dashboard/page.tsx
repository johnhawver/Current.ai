"use client";

import { useState } from "react";
import Link from "next/link";
import { createStore } from "./actions";
import { generateBranding } from "../actions/ai-actions";
import type { BrandingResult as BrandingResultType } from "@/types";
import BrandingResult from "@/components/BrandingResult";

export default function DashboardPage() {
  const [storeStatus, setStoreStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [storeAdded, setStoreAdded] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [storeName, setStoreName] = useState("");
  const [branding, setBranding] = useState<BrandingResultType | null>(null);

  async function handleSaveStore(formData: FormData) {
    const name = formData.get("storeName") as string;
    setStoreName(name);
    setStoreStatus("saving");
    setErrorMsg("");

    const result = await createStore(formData);
    if (result.error) {
      setErrorMsg(result.error);
      setStoreStatus("error");
      return;
    }

    setStoreStatus("saved");
    setStoreAdded(true);
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

  function handleReset() {
    setStoreStatus("idle");
    setStoreAdded(false);
    setAiStatus("idle");
    setBranding(null);
    setStoreName("");
    setErrorMsg("");
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white pt-16">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">CURRENT</Link>
        <Link href="/" className="hero-link">← Home</Link>
      </div>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* ── Welcome card ── */}
        {storeStatus === "idle" && (
          <div className="rounded-xl border border-teal/20 bg-teal/[0.04] backdrop-blur-md p-8 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">👋</span>
              <div>
                <h2 className="font-syne font-bold text-lg text-white/90 tracking-tight mb-2">
                  Welcome to Current
                </h2>
                <p className="text-sm text-white/45 font-light leading-relaxed">
                  Register your store below to get started. Once registered, you can generate
                  an AI-powered branding strategy and start receiving signal-driven campaign recommendations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Store form ── */}
        {storeStatus !== "saved" && (
          <div className="signal-card-dash">
            <h2 className="font-syne font-bold text-lg text-[#F0EEE9] tracking-tight mb-6">
              Register Your Store
            </h2>

            <form action={handleSaveStore}>
              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  placeholder="e.g. Blue Front Coffee"
                  disabled={storeStatus === "saving"}
                />
              </div>

              {storeStatus === "error" && (
                <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="generate-btn w-full"
                disabled={storeStatus === "saving"}
              >
                {storeStatus === "saving" ? "Saving…" : "Save Store"}
              </button>
            </form>
          </div>
        )}

        {/* ── Store Added success ── */}
        {storeAdded && aiStatus !== "done" && (
          <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/[0.06] backdrop-blur-md px-6 py-4 mb-6">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p className="font-syne font-semibold text-sm text-green-400 tracking-tight">
              Store Added!
            </p>
          </div>
        )}

        {/* ── AI Branding section (visible after store is saved) ── */}
        {storeStatus === "saved" && aiStatus !== "done" && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#4FD1C5] mb-1">
              Store Registered
            </p>
            <h2 className="font-syne font-bold text-2xl text-[#F0EEE9] tracking-tight mb-6">
              {storeName}
            </h2>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Generate a full AI branding strategy — tagline, color palette, and growth tip — powered by Claude.
            </p>

            {aiStatus === "error" && (
              <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
            )}

            <button
              onClick={handleGenerateBranding}
              disabled={aiStatus === "generating"}
              className="relative font-syne font-semibold text-sm tracking-wide bg-[#4FD1C5] text-black rounded-lg px-8 py-3.5 transition hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-wait cursor-pointer w-full"
            >
              {aiStatus === "generating" ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
