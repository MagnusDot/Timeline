import type { HTMLAttributes, ReactNode, TimeHTMLAttributes } from "react";
import { AlertCircle, Check, CircleDotDashed, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

type TimelineStatus = "completed" | "in-progress" | "pending" | "warning";

type TimelineProps = HTMLAttributes<HTMLOListElement>;

type TimelineItemProps = HTMLAttributes<HTMLLIElement> & {
  status?: TimelineStatus;
  icon?: ReactNode;
};

type TimelineTimeProps = TimeHTMLAttributes<HTMLTimeElement> & {
  date: string;
};

const statusStyles: Record<
  TimelineStatus,
  {
    dot: string;
    ring: string;
    icon: ReactNode;
    label: string;
    badge: string;
  }
> = {
  completed: {
    dot: "bg-black text-white",
    ring: "ring-white",
    icon: <Check className="h-4 w-4" strokeWidth={1.5} />,
    label: "Termine",
    badge: "border-black bg-black text-white",
  },
  "in-progress": {
    dot: "bg-white text-black",
    ring: "ring-black",
    icon: <Clock3 className="h-4 w-4" strokeWidth={1.5} />,
    label: "En cours",
    badge: "border-black bg-white text-black",
  },
  pending: {
    dot: "bg-muted text-black",
    ring: "ring-white",
    icon: <CircleDotDashed className="h-4 w-4" strokeWidth={1.5} />,
    label: "A venir",
    badge: "border-borderLight bg-muted text-black",
  },
  warning: {
    dot: "bg-black text-white",
    ring: "ring-white",
    icon: <AlertCircle className="h-4 w-4" strokeWidth={1.5} />,
    label: "Point cle",
    badge: "border-black bg-black text-white",
  },
};

export function Timeline({ className, ...props }: TimelineProps) {
  return <ol className={cn("relative ml-3 border-l-2 border-black pl-8 md:ml-0 md:pl-10", className)} {...props} />;
}

export function TimelineItem({
  className,
  status = "completed",
  icon,
  children,
  ...props
}: TimelineItemProps) {
  const style = statusStyles[status];

  return (
    <li className={cn("group relative pb-10 last:pb-0", className)} {...props}>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-[3.1875rem] top-1 flex h-10 w-10 items-center justify-center border-2 border-black ring-[6px] transition-none md:-left-[3.6875rem]",
          style.dot,
          style.ring,
        )}
      >
        {icon ?? style.icon}
      </span>
      {children}
    </li>
  );
}

export function TimelineHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-3 md:flex-row md:items-center", className)} {...props} />;
}

export function TimelineTime({ className, date, ...props }: TimelineTimeProps) {
  return (
    <time
      dateTime={date}
      className={cn(
        "inline-flex w-fit border border-black bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-black",
        className,
      )}
      {...props}
    >
      {date}
    </time>
  );
}

export function TimelineStatusBadge({
  status,
  className,
}: {
  status: TimelineStatus;
  className?: string;
}) {
  const style = statusStyles[status];

  return (
    <span
      className={cn("inline-flex w-fit border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em]", style.badge, className)}
      style={{ transform: "translateY(2px)" }}
    >
      {style.label}
    </span>
  );
}

export function TimelineTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-display text-3xl font-semibold tracking-tight text-black", className)} {...props} />;
}

export function TimelineDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-lg leading-relaxed text-muted-foreground", className)} {...props} />;
}

export function TimelineContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border border-black bg-white p-6 md:p-8", className)} {...props} />;
}
