import type { ComponentType } from "react";

export type TimelineStatus = "completed" | "in-progress" | "pending" | "warning";

export type TimelineStep = {
  id: number;
  date: string;
  title: string;
  duration: string;
  format: string;
  objective: string;
  status: TimelineStatus;
};

export type TimelineMeta = {
  title: string;
  subtitle: string;
  introduction: string;
  label: string;
  programName: string;
};

export type TimelineStat = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};
