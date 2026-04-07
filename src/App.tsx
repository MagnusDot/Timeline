import { EditorModal } from "@/components/timeline-builder/editor-modal";
import { PageHeader } from "@/components/timeline-builder/page-header";
import { SidePanel } from "@/components/timeline-builder/side-panel";
import { TimelineCanvas } from "@/components/timeline-builder/timeline-canvas";
import { useTimelineBuilder } from "@/hooks/use-timeline-builder";

export default function App() {
  const {
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
  } = useTimelineBuilder();

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="editorial-inset mx-auto max-w-editorial py-10 md:py-16">
        <PageHeader meta={meta} isExporting={isExporting} onEdit={openEditor} onExport={exportTimeline} />

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <SidePanel meta={meta} stats={stats} onReset={resetAll} onEdit={openEditor} />
          <TimelineCanvas ref={exportRef} meta={meta} timeline={timeline} />
        </div>

        {exportError ? <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em]">{exportError}</p> : null}
      </section>

      <EditorModal
        isOpen={isEditorOpen}
        draftMeta={draftMeta}
        draftTimeline={draftTimeline}
        onClose={closeEditor}
        onSave={saveEditor}
        onMetaChange={updateDraftMeta}
        onStepChange={updateDraftStep}
        onAddStep={addStep}
        onRemoveStep={removeStep}
        onMoveStep={moveStep}
      />
    </main>
  );
}
