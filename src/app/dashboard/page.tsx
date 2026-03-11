"use client";

import { useState } from "react";
import Link from "next/link";
import { createStore } from "./actions";

export default function DashboardPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    const result = await createStore(formData);
    if (result.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("saved");
    }
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">CURRENT</Link>
        <Link href="/" className="hero-link">← Home</Link>
      </div>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="signal-card-dash">
          <h2 className="font-syne font-bold text-lg text-heading tracking-tight mb-6">
            Register Your Store
          </h2>

          {status === "saved" ? (
            <p className="success-message">Store saved successfully.</p>
          ) : (
            <form action={handleSubmit}>
              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  placeholder="e.g. Blue Front Coffee"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</p>
              )}

              <button type="submit" className="generate-btn w-full" disabled={status === "saving"}>
                {status === "saving" ? "Saving…" : "Save Store"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
