import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "text-white/40 border-white/10 bg-white/[0.03]",
  success: "text-teal border-teal/30 bg-teal/10",
  warning: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  danger: "text-red-400 border-red-500/30 bg-red-500/10",
  info: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border inline-flex items-center",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
