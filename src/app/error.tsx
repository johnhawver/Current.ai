"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mb-6">
        <span className="text-red-400 text-lg">!</span>
      </div>
      <h1 className="font-syne font-bold text-2xl text-white/90 tracking-tight mb-3">
        Something went wrong
      </h1>
      <p className="font-mono text-sm text-white/40 max-w-md mb-8">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="font-syne font-semibold text-sm bg-teal text-black rounded-lg px-8 py-3 transition hover:opacity-90 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
