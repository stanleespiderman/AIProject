import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "lg" | "md" | "sm";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-2xl font-display font-extrabold uppercase tracking-wide transition active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-volt text-ink shadow-[0_10px_40px_-12px] shadow-volt/60 hover:bg-[#e0ff6a]",
  secondary: "border border-line bg-panel-2 text-fg hover:border-muted",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  lg: "h-16 w-full px-6 text-2xl",
  md: "h-12 px-5 text-lg",
  sm: "h-11 px-4 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className = "",
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
