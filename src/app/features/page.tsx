import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features — Current.ai",
  description: "Explore how Current.ai uses real-time signals and AI to automate local retail marketing.",
};

const features = [
  {
    icon: "📡",
    title: "Real-Time Signal Engine",
    description:
      "Current monitors 8+ signal categories across your city — weather, events, foot traffic, competitor activity, and more — updating every 60 seconds.",
  },
  {
    icon: "🧠",
    title: "Claude 4.6 AI Brain",
    description:
      "Every signal is fed into Claude 4.6, which understands your store's inventory, brand voice, and local context to generate high-converting campaign copy.",
  },
  {
    icon: "⚡",
    title: "Instant Campaign Generation",
    description:
      "From signal detection to campaign draft in under 10 seconds. Instagram captions, SMS blasts, email copy, and in-store signage — all auto-generated.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Track which signals drive the most revenue, measure campaign effectiveness, and get weekly performance reports delivered to your inbox.",
  },
  {
    icon: "🔗",
    title: "POS Integration",
    description:
      "Connect your Shopify, Square, or Toast POS to automatically correlate signal-driven campaigns with actual sales data.",
  },
  {
    icon: "🎯",
    title: "Custom Triggers",
    description:
      "Define your own signal triggers — when temperature drops below 40°F, when a competitor posts a sale, or when foot traffic exceeds a threshold.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">CURRENT</Link>
        <Link href="/" className="hero-link">← Back</Link>
      </div>
      <main className="flex-1 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4">
            Platform Features
          </p>
          <h1 className="font-syne font-bold text-4xl sm:text-5xl text-white/95 tracking-tight leading-tight mb-6">
            Everything you need to turn signals into sales.
          </h1>
          <p className="text-white/40 font-light max-w-2xl mb-16">
            Current combines real-time local data, AI-powered analysis, and automated campaign generation into a single platform built for independent retailers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_40px_rgba(79,209,197,0.08)]"
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-syne font-bold text-lg text-white/90 tracking-tight mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/signup"
              className="font-syne font-semibold text-sm bg-teal text-black rounded-lg px-8 py-3.5 no-underline transition hover:opacity-90 hover:-translate-y-px inline-block"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
