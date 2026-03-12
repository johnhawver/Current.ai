"use client";

import Link from "next/link";
import RadarBackground from "@/components/RadarBackground";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Home() {
  const featuresRef = useFadeIn<HTMLElement>();
  const logoCloudRef = useFadeIn<HTMLDivElement>();
  const dashMockupRef = useFadeIn<HTMLDivElement>();
  const signalsRef = useFadeIn<HTMLElement>();
  const pricingRef = useFadeIn<HTMLElement>();
  const ctaRef = useFadeIn<HTMLElement>();
  return (
    <div id="main-content" className="min-h-screen bg-black font-sans text-white">
      <RadarBackground />

      {/* Hero — centered on the full viewport */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-5 py-2 mb-10 font-mono text-xs tracking-widest text-white/60">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
          Signal-Driven Retail Intelligence
        </div>

        {/* Headline */}
        <h1 className="font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[1.05] tracking-tight text-white/95">
          Local Signals.<br />
          Automated Sales.<br />
          <span className="text-gradient-brand">Current AI.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/50 font-light">
          Current monitors your city&apos;s real-time signals — weather, game days,
          campus events — and turns them into revenue-driving campaigns for your
          store. Automatically.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/signup"
            className="font-syne font-semibold text-sm tracking-wide bg-teal text-black rounded-lg px-8 py-3.5 no-underline transition hover:opacity-90 hover:-translate-y-px"
          >
            Start Free Trial
          </Link>
          <a
            href="#features"
            className="text-sm text-white/50 no-underline transition hover:text-teal"
          >
            See how it works →
          </a>
        </div>

        {/* Social proof stats */}
        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
          {[
            { value: "500+", label: "Retailers" },
            { value: "12K", label: "Campaigns Sent" },
            { value: "34%", label: "Avg Revenue Lift" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-syne font-bold text-2xl sm:text-3xl text-white/90">{stat.value}</p>
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it Works ── */}
      <section ref={featuresRef} id="features" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4">
            How it Works
          </p>
          <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white/95 tracking-tight leading-tight mb-20">
            Three steps to automated revenue.
          </h2>

          {/* Bento Grid — 3 cols, alternating large / small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Card 1 — The Signal (large: spans 2 cols) */}
            <div className="group md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_40px_rgba(79,209,197,0.08)]">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-teal mb-3 block">
                01 — The Signal
              </span>
              <h3 className="font-syne font-bold text-xl text-white/95 tracking-tight mb-4">
                Connect to Local Signals
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-8">
                Current plugs into real-time data streams across your city — weather forecasts, sporting events, campus foot traffic, and more — so you never miss a revenue moment.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🌤", label: "Weather", desc: "Forecasts, storms, heat waves" },
                  { icon: "📅", label: "Events", desc: "Game days, concerts, festivals" },
                  { icon: "📍", label: "Foot Traffic", desc: "Density hotspots in real time" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-zinc-800 bg-black/40 p-4 text-center transition-colors duration-300 group-hover:border-zinc-700 group-hover:bg-black/60"
                  >
                    <span className="text-3xl block mb-3">{s.icon}</span>
                    <p className="font-syne font-semibold text-sm text-white/80 mb-1">{s.label}</p>
                    <p className="font-mono text-[10px] text-white/30 leading-snug">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — The AI (small: 1 col, row-span-2 for height) */}
            <div className="group md:row-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_40px_rgba(79,209,197,0.08)]">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-teal mb-3">
                02 — The AI
              </span>
              <h3 className="font-syne font-bold text-xl text-white/95 tracking-tight mb-4">
                Autonomous Campaigns
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-6">
                Claude 4.6 analyzes every signal against your inventory, brand voice, and local context to find <span className="text-teal font-medium">Revenue Gaps</span> — untapped moments where a perfectly-timed campaign will convert.
              </p>

              <div className="rounded-lg border border-zinc-800 bg-black/40 p-5 font-mono text-xs leading-relaxed mb-6">
                <p className="text-white/30 mb-2">// Revenue gap detected</p>
                <p className="text-teal">claude<span className="text-white/20">.</span>analyze<span className="text-white/40">(</span></p>
                <p className="text-white/30 ml-3">signals<span className="text-white/20">,</span></p>
                <p className="text-white/30 ml-3">store<span className="text-white/20">.</span>context</p>
                <p className="text-white/40">)</p>
                <p className="text-white/20 mt-2">→ gap: <span className="text-teal">&quot;pre-game coffee rush&quot;</span></p>
                <p className="text-white/20">→ action: <span className="text-teal">draft_campaign</span></p>
                <p className="text-white/20">→ confidence: <span className="text-teal">0.96</span></p>
              </div>

              <div className="mt-auto flex flex-col gap-2">
                {["Signal Ingestion", "Context Matching", "Campaign Drafting", "Auto-Scheduling"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full border border-teal/30 bg-teal/10 flex items-center justify-center font-mono text-[10px] text-teal shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 — The Result (large: spans 2 cols) */}
            <div className="group md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_40px_rgba(79,209,197,0.08)]">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-teal mb-3 block">
                03 — The Result
              </span>
              <h3 className="font-syne font-bold text-xl text-white/95 tracking-tight mb-4">
                Automatic Sales
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-6">
                Signal-driven campaigns consistently outperform gut-feel marketing. Revenue climbs when every local moment is captured automatically.
              </p>

              {/* Mock upward sales trend */}
              <div className="flex items-end gap-1.5 h-36">
                {[
                  { week: "W1", val: 18 },
                  { week: "W2", val: 25 },
                  { week: "W3", val: 30 },
                  { week: "W4", val: 38 },
                  { week: "W5", val: 50 },
                  { week: "W6", val: 58 },
                  { week: "W7", val: 72 },
                  { week: "W8", val: 80 },
                  { week: "W9", val: 88 },
                  { week: "W10", val: 100 },
                ].map((d) => (
                  <div key={d.week} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md bg-teal/60 transition-all duration-300 group-hover:bg-teal"
                      style={{ height: `${d.val}%` }}
                    />
                    <span className="text-[9px] font-mono text-white/25 group-hover:text-white/40 transition-colors">{d.week}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="flex items-center gap-2 text-[10px] font-mono text-white/30">
                  <span className="w-2.5 h-2.5 rounded-sm bg-teal inline-block" /> Revenue with Current
                </span>
                <span className="font-mono text-sm text-teal group-hover:text-white transition-colors duration-300">
                  +456% over 10 weeks
                </span>
              </div>
            </div>

          </div>

          {/* ── Logo Cloud ── */}
          <div ref={logoCloudRef} className="mt-20 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-8">
              Built for Modern Retailers in Ann Arbor
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {[
                { icon: "👗", name: "Boutiques" },
                { icon: "☕", name: "Cafes" },
                { icon: "💻", name: "Tech Shops" },
                { icon: "🏋️", name: "Studios" },
                { icon: "📚", name: "Bookstores" },
              ].map((store) => (
                <div key={store.name} className="flex items-center gap-2.5 grayscale opacity-30 hover:grayscale-0 hover:opacity-70 transition-all duration-300">
                  <span className="text-2xl">{store.icon}</span>
                  <span className="font-syne font-semibold text-sm tracking-wide text-white">{store.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          {/* ── Experience the Intelligence ── */}
          <div ref={dashMockupRef} className="mt-24">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4">
              Experience the Intelligence
            </p>
            <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white/95 tracking-tight leading-tight mb-4">
              Watch Current think in real time.
            </h3>
            <p className="text-sm text-white/35 font-light max-w-xl mb-10">
              A live look inside the dashboard. Signals stream in on the left; Current&apos;s AI responds with revenue-ready actions on the right.
            </p>

            {/* Dashboard mockup chrome */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">

              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800 bg-black/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 font-mono text-[11px] text-white/20 tracking-wider">current.ai / dashboard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">

                {/* Left — Live Signals */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-800">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
                      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-teal">
                        Live Signals
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-white/15">Ann Arbor, MI</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { time: "2:41 PM", text: "Rain starting in 20 mins", icon: "🌧", severity: "high", delay: "0s" },
                      { time: "2:38 PM", text: "Foot traffic spiking on S. University", icon: "📍", severity: "medium", delay: "0.08s" },
                      { time: "2:30 PM", text: "Temperature dropping to 42 °F", icon: "🌡", severity: "low", delay: "0.16s" },
                      { time: "2:22 PM", text: "U-M library closing early today", icon: "🎓", severity: "medium", delay: "0.24s" },
                      { time: "2:15 PM", text: "Competitor on Main St running flash sale", icon: "⚡", severity: "high", delay: "0.32s" },
                      { time: "2:01 PM", text: "Lunch rush ending — traffic normalizing", icon: "📉", severity: "low", delay: "0.40s" },
                    ].map((item) => (
                      <div
                        key={item.time + item.text}
                        className="flex items-center gap-3 rounded-lg bg-black/30 border border-zinc-800 px-4 py-3 animate-feed-in"
                        style={{ animationDelay: item.delay }}
                      >
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/60 leading-snug">{item.text}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.severity === "high" ? "bg-teal" : item.severity === "medium" ? "bg-white/20" : "bg-white/8"
                          }`} />
                          <span className="font-mono text-[10px] text-white/20">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Suggested Action */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/30">
                      Suggested Action
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-teal border border-teal/20 bg-teal/[0.06] rounded-full px-2.5 py-0.5">
                      New
                    </span>
                  </div>

                  {/* Trigger context */}
                  <div className="rounded-lg border border-zinc-800 bg-black/30 p-4 mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Trigger</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌧</span>
                      <p className="text-sm text-white/60">Rain starting in 20 mins + high foot traffic nearby</p>
                    </div>
                  </div>

                  {/* Action card */}
                  <div className="rounded-lg border border-teal/20 bg-teal/[0.04] p-5 flex-1 flex flex-col animate-slide-up" style={{ animationDelay: "0.35s" }}>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-teal mb-3">
                      AI-Generated Campaign
                    </span>
                    <p className="font-syne font-bold text-lg text-white/90 tracking-tight mb-2">
                      Rainy Day Rescue
                    </p>
                    <p className="text-sm text-white/45 font-light leading-relaxed mb-5">
                      Sending <span className="text-teal font-medium">15% discount code for umbrellas</span> to 340 nearby customers. SMS goes out in 3 minutes — timed to hit right as the first drops fall.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {["SMS", "Push Notification", "Email"].map((ch) => (
                        <span key={ch} className="font-mono text-[10px] tracking-wider text-white/35 border border-zinc-800 rounded-full px-3 py-1 bg-black/30">
                          {ch}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto grid grid-cols-3 gap-3">
                      {[
                        { label: "Confidence", value: "94%" },
                        { label: "Audience", value: "340" },
                        { label: "Est. Revenue", value: "+$820" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="font-syne font-bold text-sm text-teal">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock action button */}
                  <div className="mt-4 rounded-lg bg-teal/10 border border-teal/20 py-3 text-center cursor-default select-none">
                    <span className="font-syne font-semibold text-sm text-teal tracking-wide">
                      Deploy Campaign
                    </span>
                  </div>

                  <p className="text-[11px] text-white/15 font-mono mt-3 text-center">
                    Non-functional preview — campaigns deploy from your dashboard.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Signals ── */}
      <section ref={signalsRef} className="relative py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white/95 tracking-tight leading-tight mb-4">
            The city is talking. Current listens.
          </h2>
          <p className="text-white/40 font-light mb-16">
            8 signal categories. Infinite local moments.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🌤", name: "Weather" },
              { icon: "🏈", name: "Game Days" },
              { icon: "🎓", name: "Campus Cycles" },
              { icon: "📅", name: "Local Events" },
              { icon: "❄️", name: "Seasonal Shifts" },
              { icon: "🌧", name: "Rain Events" },
              { icon: "📦", name: "Move-in Week" },
              { icon: "🎉", name: "Holidays" },
            ].map((s) => (
              <div
                key={s.name}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 text-center transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span className="text-3xl block mb-3">{s.icon}</span>
                <span className="font-syne font-semibold text-sm text-white/80">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4">
            Trusted by Retailers
          </p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white/95 tracking-tight leading-tight mb-16">
            What store owners are saying
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { quote: "Current caught a rain event I would have completely missed. The auto-generated SMS drove 40 umbrella sales in two hours.", name: "Sarah K.", store: "Main Street Outfitters" },
              { quote: "Game day campaigns used to take me all week to plan. Now Current drafts them before I finish my morning coffee.", name: "Marcus T.", store: "Blue Front Coffee" },
              { quote: "We saw a 28% revenue increase in our first month. The signal-to-campaign pipeline is genuinely magical.", name: "Priya R.", store: "The Lit Bookshop" },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md p-6 text-left"
              >
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-syne font-semibold text-sm text-white/80">{t.name}</p>
                  <p className="font-mono text-[10px] text-teal tracking-wider">{t.store}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section ref={pricingRef} id="pricing" className="relative py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white/95 tracking-tight leading-tight mb-16">
            Simple pricing. No surprises.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Starter */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-left transition-all duration-300 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 border border-white/10 px-2.5 py-1 inline-block mb-5">
                For Solo Retailers
              </span>
              <div className="font-syne font-bold text-xl text-white/90 mb-1">Starter</div>
              <div className="font-syne font-extrabold text-4xl text-teal mb-6">
                $49<span className="font-sans font-light text-sm text-white/40">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-white/50">
                {["1 store location", "3 active signal sources", "AI caption & email generation", "Weekly campaign recommendations", "Instagram & SMS ready copy"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-teal text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=starter" className="block text-center font-syne font-semibold text-sm text-teal border border-teal rounded-lg py-3 no-underline transition hover:bg-teal hover:text-black">
                Start Free
              </Link>
            </div>

            {/* Growth */}
            <div className="rounded-xl border border-teal bg-white/[0.03] p-8 text-left transition-all duration-300 hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(79,209,197,0.1)]">
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-teal border border-teal px-2.5 py-1 inline-block mb-5">
                Most Popular
              </span>
              <div className="font-syne font-bold text-xl text-white/90 mb-1">Growth</div>
              <div className="font-syne font-extrabold text-4xl text-teal mb-6">
                $99<span className="font-sans font-light text-sm text-white/40">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-white/50">
                {["Everything in Starter", "Unlimited signal sources", "AI video & Reel scripts", "POS integration (Shopify, Square)", "Advanced trigger customization", "Performance analytics", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-teal text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=growth" className="block text-center font-syne font-semibold text-sm bg-teal text-black rounded-lg py-3 no-underline transition hover:opacity-90">
                Start Free
              </Link>
            </div>
          </div>

          <p className="text-white/30 text-sm mt-8">
            No credit card required. 14-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4 text-center">
            FAQ
          </p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white/95 tracking-tight leading-tight mb-16 text-center">
            Common questions
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "How does Current detect local signals?", a: "Current integrates with public weather APIs, event databases, foot traffic data providers, and POS systems to monitor your city in real time. Signals are evaluated every 60 seconds." },
              { q: "Do I need to write my own campaigns?", a: "No. Claude 4.6 generates complete campaign copy — Instagram captions, SMS messages, emails, and in-store signage — tailored to your brand voice and the specific signal that triggered it." },
              { q: "Can I customize which signals trigger campaigns?", a: "Yes. The Growth plan includes advanced trigger customization. You can set thresholds for weather, traffic, events, and more, or create entirely custom signal rules." },
              { q: "What POS systems do you integrate with?", a: "We currently support Shopify, Square, and Toast. More integrations are on our roadmap. Contact us if you need a specific POS supported." },
              { q: "Is there a contract or commitment?", a: "No. Both plans are month-to-month with a 14-day free trial. Cancel anytime with no penalty." },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-syne font-semibold text-sm text-white/80 hover:text-white transition-colors">
                  {item.q}
                  <span className="text-white/20 group-open:rotate-45 transition-transform duration-200 text-lg ml-4 shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm text-white/40 font-light leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section ref={ctaRef} className="relative py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white/95 tracking-tight leading-tight mb-6">
            Ready to automate your revenue?
          </h2>
          <p className="text-white/40 font-light mb-10 max-w-lg mx-auto">
            Join hundreds of local retailers using Current to turn real-time signals
            into sales. Start free — no credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="font-syne font-semibold text-sm bg-teal text-black rounded-lg px-8 py-3.5 no-underline transition hover:opacity-90 hover:-translate-y-px"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="font-syne font-semibold text-sm text-white/60 border border-white/10 rounded-lg px-8 py-3.5 no-underline transition hover:border-white/20 hover:text-white/80"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <span className="font-syne font-bold text-sm tracking-[0.15em] text-teal block mb-4">CURRENT</span>
              <p className="text-xs text-white/30 leading-relaxed">
                Signal-driven marketing automation for independent retail.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Product</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/#features" className="text-xs text-white/30 no-underline hover:text-teal transition">Features</Link>
                <Link href="/#pricing" className="text-xs text-white/30 no-underline hover:text-teal transition">Pricing</Link>
                <Link href="/dashboard" className="text-xs text-white/30 no-underline hover:text-teal transition">Dashboard</Link>
                <Link href="/waitlist" className="text-xs text-white/30 no-underline hover:text-teal transition">Waitlist</Link>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Company</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/contact" className="text-xs text-white/30 no-underline hover:text-teal transition">Contact</Link>
                <a href="mailto:hello@current.ai" className="text-xs text-white/30 no-underline hover:text-teal transition">hello@current.ai</a>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Legal</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/privacy" className="text-xs text-white/30 no-underline hover:text-teal transition">Privacy Policy</Link>
                <Link href="/terms" className="text-xs text-white/30 no-underline hover:text-teal transition">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-white/20">&copy; 2026 Current Technologies, Inc.</span>
            <span className="font-mono text-[11px] text-white/20">Made in Ann Arbor, MI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
