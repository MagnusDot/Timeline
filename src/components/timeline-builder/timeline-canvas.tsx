import { forwardRef } from "react";
import { Rocket } from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineStatusBadge,
  TimelineTime,
  TimelineTitle,
} from "@/components/timeline";
import type { TimelineMeta, TimelineStep } from "@/types/timeline";

type TimelineCanvasProps = {
  meta: TimelineMeta;
  timeline: TimelineStep[];
};

export const TimelineCanvas = forwardRef<HTMLDivElement, TimelineCanvasProps>(function TimelineCanvas(
  { meta, timeline },
  ref,
) {
  return (
    <div ref={ref} className="border-2 border-black bg-white p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-black pb-4">
        <div>
          <p className="editorial-kicker">{meta.label}</p>
          <p className="mt-3 font-display text-3xl md:text-5xl">{meta.programName}</p>
        </div>
      </div>

      <Timeline className="bg-editorialDiagonal">
        {timeline.map((step) => (
          <TimelineItem
            key={step.id}
            status={step.status}
            icon={step.status === "warning" ? <Rocket className="h-4 w-4" strokeWidth={1.5} /> : undefined}
          >
            <TimelineHeader>
              <TimelineTime date={step.date} />
              <TimelineStatusBadge status={step.status} />
            </TimelineHeader>

            <TimelineContent className="transition-colors duration-100 hover:bg-black hover:text-white">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <TimelineTitle className="transition-colors duration-100 group-hover:text-white">
                    {step.title}
                  </TimelineTitle>
                  <TimelineDescription className="mt-4 transition-colors duration-100 group-hover:text-white/75">
                    {step.objective}
                  </TimelineDescription>
                </div>

                <div className="grid gap-3">
                  <InfoBlock label="Duree" value={step.duration} display />
                  <InfoBlock label="Format" value={step.format} />
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
});

type InfoBlockProps = {
  label: string;
  value: string;
  display?: boolean;
};

function InfoBlock({ label, value, display = false }: InfoBlockProps) {
  return (
    <div className="border border-black p-4 transition-colors duration-100 group-hover:border-white">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em]">{label}</p>
      <p className={display ? "mt-2 font-display text-2xl" : "mt-2 text-lg"}>{value}</p>
    </div>
  );
}
