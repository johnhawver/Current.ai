"use client";

import type { BrandingResult as BrandingResultType } from "@/types";

interface BrandingResultProps {
  storeName: string;
  branding: BrandingResultType;
  onReset: () => void;
}

export default function BrandingResult({ storeName, branding, onReset }: BrandingResultProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#4FD1C5] mb-1">
        AI-Generated Brand Kit
      </p>
      <h2 className="font-syne font-bold text-2xl text-[#F0EEE9] tracking-tight mb-8">
        {storeName}
      </h2>

      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
        Tagline
      </p>
      <p className="text-xl text-white/90 font-light leading-relaxed mb-8 italic">
        &ldquo;{branding.tagline}&rdquo;
      </p>

      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
        Growth Tip
      </p>
      <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
        {branding.strategy}
      </p>

      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">
        Brand Palette
      </p>
      <div className="flex items-center gap-4">
        {branding.colors.map((hex) => (
          <div key={hex} className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full border border-white/10 shadow-lg shrink-0"
              style={{ backgroundColor: hex }}
            />
            <span className="font-mono text-xs text-white/40">
              {hex}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="mt-10 text-sm text-white/40 hover:text-[#4FD1C5] transition font-mono cursor-pointer"
      >
        + Register another store
      </button>
    </div>
  );
}
