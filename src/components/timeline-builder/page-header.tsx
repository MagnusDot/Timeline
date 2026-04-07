import { Download, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TimelineMeta } from "@/types/timeline";

type PageHeaderProps = {
  meta: TimelineMeta;
  isExporting: boolean;
  onEdit: () => void;
  onExport: () => void;
};

export function PageHeader({ meta, isExporting, onEdit, onExport }: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-black pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="editorial-kicker">{meta.label}</p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl leading-none tracking-tighter md:text-8xl lg:text-[9rem]">
          {meta.title}
        </h1>
        <p className="mt-4 max-w-3xl font-display text-2xl italic leading-tight md:text-4xl">{meta.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" variant="secondary" className="gap-3" onClick={onEdit}>
          <PencilLine className="h-4 w-4" strokeWidth={1.5} />
          Editer la timeline
        </Button>
        <Button size="lg" className="gap-3" onClick={onExport} disabled={isExporting}>
          <Download className="h-4 w-4" strokeWidth={1.5} />
          {isExporting ? "Export en cours" : "Exporter en PNG"}
        </Button>
      </div>
    </div>
  );
}
