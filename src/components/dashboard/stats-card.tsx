import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-charcoal">{label}</p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
              {value}
            </p>
            <p className="mt-1.5 text-xs text-charcoal font-medium">{detail}</p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface-bone text-ink">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
