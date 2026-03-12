import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label && (
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-4">
          {label}
        </p>
      )}
      <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white/95 tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className={cn("text-white/40 font-light", centered && "max-w-lg mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
