import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em]",
  {
    variants: {
      variant: {
        default: "border-black bg-black text-white",
        accent: "border-black bg-white text-black",
        warm: "border-black bg-muted text-black",
        neutral: "border-borderLight bg-white text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
