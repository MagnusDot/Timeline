import type { ReactNode } from "react";
import { Plus, Save, X } from "lucide-react";
import { statusOptions } from "@/data/timeline";
import { Button } from "@/components/ui/button";
import type { TimelineMeta, TimelineStatus, TimelineStep } from "@/types/timeline";

type EditorModalProps = {
  isOpen: boolean;
  draftMeta: TimelineMeta;
  draftTimeline: TimelineStep[];
  onClose: () => void;
  onSave: () => void;
  onMetaChange: <K extends keyof TimelineMeta>(key: K, value: TimelineMeta[K]) => void;
  onStepChange: <K extends keyof TimelineStep>(id: number, key: K, value: TimelineStep[K]) => void;
  onAddStep: () => void;
  onRemoveStep: (id: number) => void;
  onMoveStep: (id: number, direction: "up" | "down") => void;
};

export function EditorModal({
  isOpen,
  draftMeta,
  draftTimeline,
  onClose,
  onSave,
  onMetaChange,
  onStepChange,
  onAddStep,
  onRemoveStep,
  onMoveStep,
}: EditorModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 md:p-8">
      <div className="mx-auto max-w-6xl border-2 border-black bg-white">
        <div className="flex items-center justify-between border-b-2 border-black px-6 py-5 md:px-8">
          <div>
            <p className="editorial-kicker">Edition complete</p>
            <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">Configurer la timeline</h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-black"
            onClick={onClose}
            aria-label="Fermer l'editeur"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b-2 border-black p-6 md:p-8 lg:border-b-0 lg:border-r-2">
            <div className="space-y-5">
              <Field label="Label">
                <input
                  value={draftMeta.label}
                  onChange={(event) => onMetaChange("label", event.target.value)}
                  className="w-full border-2 border-black px-4 py-3 outline-none"
                />
              </Field>

              <Field label="Titre">
                <input
                  value={draftMeta.title}
                  onChange={(event) => onMetaChange("title", event.target.value)}
                  className="w-full border-2 border-black px-4 py-3 outline-none"
                />
              </Field>

              <Field label="Nom du programme">
                <input
                  value={draftMeta.programName}
                  onChange={(event) => onMetaChange("programName", event.target.value)}
                  className="w-full border-2 border-black px-4 py-3 outline-none"
                />
              </Field>

              <Field label="Sous-titre">
                <textarea
                  value={draftMeta.subtitle}
                  onChange={(event) => onMetaChange("subtitle", event.target.value)}
                  className="min-h-28 w-full resize-y border-2 border-black px-4 py-3 outline-none"
                />
              </Field>

              <Field label="Introduction">
                <textarea
                  value={draftMeta.introduction}
                  onChange={(event) => onMetaChange("introduction", event.target.value)}
                  className="min-h-36 w-full resize-y border-2 border-black px-4 py-3 outline-none"
                />
              </Field>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-black pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="editorial-kicker">Etapes</p>
                <p className="mt-2 text-lg text-muted-foreground">
                  Modifiez tous les champs, l'ordre et le statut avant d'enregistrer.
                </p>
              </div>
              <Button variant="secondary" className="gap-3" onClick={onAddStep}>
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                Ajouter une etape
              </Button>
            </div>

            <div className="space-y-6">
              {draftTimeline.map((step, index) => (
                <StepEditor
                  key={step.id}
                  index={index}
                  step={step}
                  onStepChange={onStepChange}
                  onRemoveStep={onRemoveStep}
                  onMoveStep={onMoveStep}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t-2 border-black pt-6 sm:flex-row sm:justify-end">
              <Button variant="ghost" className="justify-center gap-2" onClick={onClose}>
                <X className="h-4 w-4" strokeWidth={1.5} />
                Annuler
              </Button>
              <Button className="gap-3" onClick={onSave}>
                <Save className="h-4 w-4" strokeWidth={1.5} />
                Enregistrer les modifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em]">{label}</label>
      {children}
    </div>
  );
}

type StepEditorProps = {
  index: number;
  step: TimelineStep;
  onStepChange: <K extends keyof TimelineStep>(id: number, key: K, value: TimelineStep[K]) => void;
  onRemoveStep: (id: number) => void;
  onMoveStep: (id: number, direction: "up" | "down") => void;
};

function StepEditor({ index, step, onStepChange, onRemoveStep, onMoveStep }: StepEditorProps) {
  return (
    <div className="border-2 border-black p-5">
      <div className="mb-5 flex flex-col gap-3 border-b border-borderLight pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl">Etape {index + 1}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">ID {step.id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={() => onMoveStep(step.id, "up")}>
            Monter
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onMoveStep(step.id, "down")}>
            Descendre
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRemoveStep(step.id)}>
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date">
          <input
            value={step.date}
            onChange={(event) => onStepChange(step.id, "date", event.target.value)}
            className="w-full border-2 border-black px-4 py-3 outline-none"
          />
        </Field>

        <Field label="Statut">
          <select
            value={step.status}
            onChange={(event) => onStepChange(step.id, "status", event.target.value as TimelineStatus)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field label="Titre">
            <input
              value={step.title}
              onChange={(event) => onStepChange(step.id, "title", event.target.value)}
              className="w-full border-2 border-black px-4 py-3 outline-none"
            />
          </Field>
        </div>

        <Field label="Duree">
          <input
            value={step.duration}
            onChange={(event) => onStepChange(step.id, "duration", event.target.value)}
            className="w-full border-2 border-black px-4 py-3 outline-none"
          />
        </Field>

        <Field label="Format">
          <input
            value={step.format}
            onChange={(event) => onStepChange(step.id, "format", event.target.value)}
            className="w-full border-2 border-black px-4 py-3 outline-none"
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Objectif">
            <textarea
              value={step.objective}
              onChange={(event) => onStepChange(step.id, "objective", event.target.value)}
              className="min-h-28 w-full resize-y border-2 border-black px-4 py-3 outline-none"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
