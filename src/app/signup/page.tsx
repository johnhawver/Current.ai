"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SignupRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get("plan");
    router.replace(plan ? `/connect?plan=${plan}` : "/connect");
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white/30 text-sm font-mono">Redirecting...</p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-white/30 text-sm font-mono">Loading...</p>
        </div>
      }
    >
      <SignupRedirect />
    </Suspense>
  );
}
