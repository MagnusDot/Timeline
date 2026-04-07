import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { buildTimelineStats, createEmptyStep, initialMeta, initialTimeline } from "@/data/timeline";
import type { TimelineMeta, TimelineStep } from "@/types/timeline";

const STORAGE_KEY = "timeline-builder-state";

type PersistedTimelineState = {
  meta: TimelineMeta;
  timeline: TimelineStep[];
};

function isTimelineStep(value: unknown): value is TimelineStep {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const step = value as Record<string, unknown>;
  return (
    typeof step.id === "number" &&
    typeof step.date === "string" &&
    typeof step.title === "string" &&
    typeof step.duration === "string" &&
    typeof step.format === "string" &&
    typeof step.objective === "string" &&
    (step.type === "theorie" ||
      step.type === "atelier" ||
      step.type === "demo" ||
      step.type === "mentorat" ||
      step.type === "pause")
  );
}

function isTimelineMeta(value: unknown): value is TimelineMeta {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const meta = value as Record<string, unknown>;
  return (
    typeof meta.title === "string" &&
    typeof meta.subtitle === "string" &&
    typeof meta.introduction === "string" &&
    typeof meta.label === "string" &&
    typeof meta.programName === "string"
  );
}

function readPersistedState(): PersistedTimelineState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) {
      return null;
    }

    const parsed = JSON.parse(rawState) as {
      meta?: unknown;
      timeline?: unknown;
    };

    if (!isTimelineMeta(parsed.meta) || !Array.isArray(parsed.timeline) || !parsed.timeline.every(isTimelineStep)) {
      return null;
    }

    return {
      meta: parsed.meta,
      timeline: parsed.timeline,
    };
  } catch {
    return null;
  }
}

export function useTimelineBuilder() {
  const persistedState = readPersistedState();
  const [meta, setMeta] = useState<TimelineMeta>(persistedState?.meta ?? initialMeta);
  const [draftMeta, setDraftMeta] = useState<TimelineMeta>(persistedState?.meta ?? initialMeta);
  const [timeline, setTimeline] = useState<TimelineStep[]>(persistedState?.timeline ?? initialTimeline);
  const [draftTimeline, setDraftTimeline] = useState<TimelineStep[]>(persistedState?.timeline ?? initialTimeline);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => buildTimelineStats(timeline), [timeline]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stateToPersist: PersistedTimelineState = { meta, timeline };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [meta, timeline]);

  const openEditor = () => {
    setDraftMeta(meta);
    setDraftTimeline(timeline);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
  };

  const saveEditor = () => {
    setMeta(draftMeta);
    setTimeline(draftTimeline);
    closeEditor();
  };

  const resetAll = () => {
    setMeta(initialMeta);
    setDraftMeta(initialMeta);
    setTimeline(initialTimeline);
    setDraftTimeline(initialTimeline);
    setExportError("");

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateDraftMeta = <K extends keyof TimelineMeta>(key: K, value: TimelineMeta[K]) => {
    setDraftMeta((current) => ({ ...current, [key]: value }));
  };

  const updateDraftStep = <K extends keyof TimelineStep>(id: number, key: K, value: TimelineStep[K]) => {
    setDraftTimeline((current) =>
      current.map((step) => (step.id === id ? { ...step, [key]: value } : step)),
    );
  };

  const addStep = () => {
    setDraftTimeline((current) => [...current, createEmptyStep(current.length + 1)]);
  };

  const removeStep = (id: number) => {
    setDraftTimeline((current) => current.filter((step) => step.id !== id));
  };

  const moveStep = (id: number, direction: "up" | "down") => {
    setDraftTimeline((current) => {
      const index = current.findIndex((step) => step.id === id);
      if (index === -1) {
        return current;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const exportTimeline = async () => {
    if (!exportRef.current) {
      return;
    }

    setIsExporting(true);
    setExportError("");

    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `${meta.label.toLowerCase().replace(/\s+/g, "-") || "timeline"}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setExportError("L'export PNG a echoue. Verifiez que les dependances sont bien installees.");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    meta,
    draftMeta,
    timeline,
    draftTimeline,
    stats,
    isEditorOpen,
    isExporting,
    exportError,
    exportRef,
    openEditor,
    closeEditor,
    saveEditor,
    resetAll,
    updateDraftMeta,
    updateDraftStep,
    addStep,
    removeStep,
    moveStep,
    exportTimeline,
  };
}
