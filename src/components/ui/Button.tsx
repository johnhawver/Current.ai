import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-teal text-black hover:opacity-90 hover:-translate-y-px",
  secondary:
    "text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80",
  ghost:
    "text-white/50 hover:text-teal",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-sm px-8 py-3.5",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = AsButton | AsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", className, ...rest } = props;

  const classes = cn(
    "font-syne font-semibold tracking-wide rounded-lg no-underline transition-all duration-200 inline-flex items-center justify-center cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in rest && rest.href) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
