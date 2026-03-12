export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-zinc-800 border-t-teal rounded-full animate-spin" />
      <span className="font-mono text-xs text-white/30">Loading...</span>
    </div>
  );
}
