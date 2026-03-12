"use client";

import { useState } from "react";
import Link from "next/link";
import { createStore } from "./actions";
import { generateBranding, type BrandingResult } from "../actions/ai-actions";

export default function DashboardPage() {
  const [status, setStatus] = useState<
    "idle" | "saving" | "generating" | "done" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [storeName, setStoreName] = useState("");
  const [branding, setBranding] = useState<BrandingResult | null>(null);

  async function handleSubmit(formData: FormData) {
    const name = formData.get("storeName") as string;
    setStoreName(name);
    setStatus("saving");

    const storeResult = await createStore(formData);
    if (storeResult.error) {
      setErrorMsg(storeResult.error);
      setStatus("error");
      return;
    }

    setStatus("generating");
    const aiResult = await generateBranding(name);
    if (aiResult.error) {
      setErrorMsg(aiResult.error);
      setStatus("error");
      return;
    }

    setBranding(aiResult.data!);
    setStatus("done");
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">CURRENT</Link>
        <Link href="/" className="hero-link">← Home</Link>
      </div>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* ── Store form ── */}
        {status !== "done" && (
          <div className="signal-card-dash">
            <h2 className="font-syne font-bold text-lg text-[#F0EEE9] tracking-tight mb-6">
              Register Your Store
            </h2>

            <form action={handleSubmit}>
              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  placeholder="e.g. Blue Front Coffee"
                  disabled={status === "saving" || status === "generating"}
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="generate-btn w-full"
                disabled={status === "saving" || status === "generating"}
              >
                {status === "saving"
                  ? "Saving store…"
                  : status === "generating"
                  ? "Generating branding…"
                  : "Save Store"}
              </button>
            </form>
          </div>
        )}

        {/* ── Branding result card ── */}
        {status === "done" && branding && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#4FD1C5] mb-2">
              AI-Generated Brand Kit
            </p>
            <h2 className="font-syne font-bold text-2xl text-[#F0EEE9] tracking-tight mb-6">
              {storeName}
            </h2>

            <p className="text-white/50 text-sm font-mono uppercase tracking-widest mb-2">
              Tagline
            </p>
            <p className="text-lg text-white/90 font-light leading-relaxed mb-8 italic">
              &ldquo;{branding.tagline}&rdquo;
            </p>

            <p className="text-white/50 text-sm font-mono uppercase tracking-widest mb-4">
              Brand Palette
            </p>
            <div className="flex gap-4">
              {branding.colors.map((hex) => (
                <div key={hex} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-lg border border-white/10 shadow-lg"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="font-mono text-xs text-white/40">
                    {hex}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setStatus("idle");
                setBranding(null);
                setStoreName("");
                setErrorMsg("");
              }}
              className="mt-8 text-sm text-white/40 hover:text-[#4FD1C5] transition font-mono cursor-pointer"
            >
              + Register another store
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
