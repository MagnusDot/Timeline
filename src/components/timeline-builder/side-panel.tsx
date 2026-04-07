import { ArrowRight, CheckCircle2, RefreshCcw } from "lucide-react";
import { capabilityItems } from "@/data/timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineMeta, TimelineStat } from "@/types/timeline";

type SidePanelProps = {
  meta: TimelineMeta;
  stats: TimelineStat[];
  onReset: () => void;
  onEdit: () => void;
};

export function SidePanel({ meta, stats, onReset, onEdit }: SidePanelProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <Badge variant="accent" className="w-fit">
          Outil de presentation
        </Badge>
        <CardTitle className="text-4xl md:text-5xl">{meta.programName}</CardTitle>
        <CardDescription>{meta.introduction}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border-t border-borderLight pt-5 first:border-t-0 first:pt-0">
            <Icon className="mb-3 h-5 w-5 text-black" strokeWidth={1.5} />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-4xl leading-none">{value}</p>
          </div>
        ))}

        <div className="border-t-2 border-black pt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Capacites de l'outil
          </p>
          <div className="mt-4 space-y-3">
            {capabilityItems.map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-black" strokeWidth={1.5} />
                <p className="text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="ghost" className="justify-start gap-2" onClick={onReset}>
            <RefreshCcw className="h-4 w-4" strokeWidth={1.5} />
            Reinitialiser l'exemple
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={onEdit}>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            Ouvrir l'edition
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
