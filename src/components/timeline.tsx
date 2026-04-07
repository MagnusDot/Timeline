import type { HTMLAttributes, ReactNode, TimeHTMLAttributes } from "react";
import { BookOpenText, BriefcaseBusiness, Coffee, Presentation, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineType } from "@/types/timeline";

type TimelineProps = HTMLAttributes<HTMLOListElement>;

type TimelineItemProps = HTMLAttributes<HTMLLIElement> & {
  type?: TimelineType;
  icon?: ReactNode;
  showConnector?: boolean;
};

type TimelineTimeProps = TimeHTMLAttributes<HTMLTimeElement> & {
  date: string;
};

const typeStyles: Record<
  TimelineType,
  {
    dot: string;
    ring: string;
    icon: ReactNode;
    label: string;
    badge: string;
  }
> = {
  theorie: {
    dot: "bg-black text-white",
    ring: "ring-white",
    icon: <BookOpenText className="h-4 w-4" strokeWidth={1.5} />,
    label: "Théorie",
    badge: "border-black bg-black text-white",
  },
  atelier: {
    dot: "bg-white text-black",
    ring: "ring-black",
    icon: <Wrench className="h-4 w-4" strokeWidth={1.5} />,
    label: "Atelier",
    badge: "border-black bg-white text-black",
  },
  demo: {
    dot: "bg-muted text-black",
    ring: "ring-white",
    icon: <Presentation className="h-4 w-4" strokeWidth={1.5} />,
    label: "Demo",
    badge: "border-borderLight bg-muted text-black",
  },
  mentorat: {
    dot: "bg-black text-white",
    ring: "ring-white",
    icon: <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.5} />,
    label: "Mentorat",
    badge: "border-black bg-black text-white",
  },
  pause: {
    dot: "bg-white text-black",
    ring: "ring-black",
    icon: <Coffee className="h-4 w-4" strokeWidth={1.5} />,
    label: "Pause",
    badge: "border-black bg-white text-black",
  },
};

export function Timeline({ className, ...props }: TimelineProps) {
  return <ol className={cn("relative ml-3 pl-8 md:ml-0 md:pl-10", className)} {...props} />;
}

export function TimelineItem({
  className,
  type = "theorie",
  icon,
  showConnector = true,
  children,
  ...props
}: TimelineItemProps) {
  const style = typeStyles[type];

  return (
    <li className={cn("group relative pb-10 last:pb-0", className)} {...props}>
      {showConnector ? (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[-1.9375rem] top-[1.5rem] w-0 border-l-2 border-black md:left-[-2.4375rem]"
        />
      ) : null}
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

export function TimelineTypeBadge({
  type,
  className,
}: {
  type: TimelineType;
  className?: string;
}) {
  const style = typeStyles[type];

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
