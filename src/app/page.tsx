"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function RadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rings: { born: number }[] = [];
    let lastSpawn = 0;
    let animId: number;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      canvas!.width = r.width * dpr;
      canvas!.height = r.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    function draw(time: number) {
      const r = canvas!.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(w, h) / 2;

      ctx!.clearRect(0, 0, w, h);

      if (time - lastSpawn > 3500 || rings.length === 0) {
        rings.push({ born: time });
        lastSpawn = time;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const age = time - rings[i].born;
        const p = age / 7000;
        if (p > 1) { rings.splice(i, 1); continue; }
        ctx!.beginPath();
        ctx!.arc(cx, cy, p * maxR, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(79,209,197,${0.12 * (1 - p)})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(79,209,197,0.25)";
      ctx!.fill();

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
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
          <span className="text-teal">Current AI.</span>
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
            href="#how-it-works"
            className="text-sm text-white/50 no-underline transition hover:text-teal"
          >
            See how it works →
          </a>
        </div>
      </div>
    </div>
  );
}
