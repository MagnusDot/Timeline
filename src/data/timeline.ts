import { CalendarRange, Clock3, Layers3 } from "lucide-react";
import type { TimelineMeta, TimelineStat, TimelineStatus, TimelineStep } from "@/types/timeline";

export const initialMeta: TimelineMeta = {
  title: "Timeline",
  subtitle: "Un outil editorial pour presenter une formation avec clarte, rythme et impact.",
  introduction:
    "Cette vue est concue pour construire une timeline lisible, elegante et directement exploitable dans un support client, une proposition commerciale ou une presentation interne.",
  label: "Timeline Formation",
  programName: "Programme intensif",
};

export const initialTimeline: TimelineStep[] = [
  {
    id: 1,
    date: "Semaine 01",
    title: "Kick-off & cadrage de la formation",
    duration: "2 jours",
    format: "Atelier collectif",
    objective: "Aligner les attentes, la promesse pedagogique et les indicateurs de reussite.",
    status: "completed",
  },
  {
    id: 2,
    date: "Semaine 02",
    title: "Fondamentaux metier et montee en competence",
    duration: "1 semaine",
    format: "Cours + cas pratiques",
    objective: "Installer les notions cles avec une progression lisible et rassurante.",
    status: "completed",
  },
  {
    id: 3,
    date: "Semaine 03",
    title: "Mise en situation guidee",
    duration: "1 semaine",
    format: "Workshop tutore",
    objective: "Faire passer la theorie vers l'action avec un premier projet cadre.",
    status: "in-progress",
  },
  {
    id: 4,
    date: "Semaine 04",
    title: "Projet fil rouge et coaching",
    duration: "1 semaine",
    format: "Mentorat + sprint",
    objective: "Developper l'autonomie et professionnaliser les rendus des apprenants.",
    status: "warning",
  },
  {
    id: 5,
    date: "Semaine 05",
    title: "Restitution finale et projection terrain",
    duration: "2 jours",
    format: "Demo day",
    objective: "Valoriser les acquis, mesurer la progression et preparer l'apres-formation.",
    status: "pending",
  },
];

export const statusOptions: { value: TimelineStatus; label: string }[] = [
  { value: "completed", label: "Termine" },
  { value: "in-progress", label: "En cours" },
  { value: "warning", label: "Point cle" },
  { value: "pending", label: "A venir" },
];

export const capabilityItems = [
  "Edition complete des champs depuis une modale",
  "Timeline centrale lisible pour le client final",
  "Export PNG pret a inserer dans un deck",
];

export function createEmptyStep(nextId: number): TimelineStep {
  return {
    id: nextId,
    date: `Semaine ${String(nextId).padStart(2, "0")}`,
    title: "Nouvelle etape",
    duration: "A definir",
    format: "Workshop",
    objective: "Precisez ici l'objectif de cette etape.",
    status: "pending",
  };
}

export function buildTimelineStats(timeline: TimelineStep[]): TimelineStat[] {
  const practicalSteps = timeline.filter((item) => {
    const format = item.format.toLowerCase();
    return format.includes("work") || format.includes("atelier");
  }).length;

  return [
    { label: "Duree totale", value: `${timeline.length} etapes`, icon: CalendarRange },
    { label: "Temps pratique", value: `${practicalSteps * 20}%`, icon: Layers3 },
    {
      label: "Rythme",
      value: timeline.some((item) => item.status === "in-progress") ? "Actif" : "Planifie",
      icon: Clock3,
    },
  ];
}
