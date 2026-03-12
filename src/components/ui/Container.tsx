import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
};

export default function Container({
  children,
  size = "md",
  className,
}: ContainerProps) {
  return (
    <div className={cn(sizeMap[size], "mx-auto px-6", className)}>
      {children}
    </div>
  );
}
