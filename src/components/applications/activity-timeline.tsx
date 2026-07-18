import { format, parseISO } from "date-fns";
import {
  CheckCircle2,
  Circle,
  FileText,
  Pencil,
  PlusCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import type { ApplicationTimelineEvent } from "@/lib/application-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const eventConfig: Record<string, { icon: typeof PlusCircle; label: string }> = {
  APPLICATION_CREATED: { icon: PlusCircle, label: "Application created" },
  APPLICATION_UPDATED: { icon: Pencil, label: "Application updated" },
  APPLICATION_DELETED: { icon: Trash2, label: "Application deleted" },
  STATUS_CHANGE: { icon: RefreshCw, label: "Status changed" },
  REMINDER_CREATED: { icon: Circle, label: "Reminder created" },
  REMINDER_COMPLETED: { icon: CheckCircle2, label: "Reminder completed" },
};

export function ActivityTimeline({ events }: { events: ApplicationTimelineEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="font-display text-lg font-bold text-ink">Activity</CardTitle>
          <p className="mt-1 text-sm text-charcoal font-medium">
            History of changes and events.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="py-6 text-center text-sm text-charcoal/50">No activity yet.</p>
        ) : (
          <div className="relative space-y-0">
            <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-hairline" />
            {events.map((event) => {
              const config = eventConfig[event.eventType] ?? { icon: FileText, label: event.eventType };
              const Icon = config.icon;
              return (
                <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-card">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-ink">{config.label}</p>
                    {event.description && (
                      <p className="mt-0.5 text-xs text-charcoal">{event.description}</p>
                    )}
                    <p className="mt-1 text-[11px] font-mono font-semibold text-ash uppercase">
                      {format(parseISO(event.createdAt), "MMM d, HH:mm")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
