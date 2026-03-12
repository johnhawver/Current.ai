"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <Link
          href="/"
          className="font-syne font-bold text-sm tracking-[0.15em] text-teal no-underline"
        >
          CURRENT
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-white/40 no-underline transition-colors hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton>
              <button className="font-sans text-sm text-white/60 hover:text-teal transition cursor-pointer">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="font-syne font-semibold text-sm bg-teal text-black rounded-lg px-5 py-2 transition hover:opacity-90 cursor-pointer">
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
