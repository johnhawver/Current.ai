import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300",
        hover && "hover:border-zinc-700",
        glow && "hover:border-teal/50 hover:shadow-[0_0_40px_rgba(79,209,197,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
