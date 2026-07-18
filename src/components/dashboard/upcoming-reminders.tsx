import { format, parseISO } from "date-fns";
import { BellRing } from "lucide-react";
import type { Reminder } from "@/lib/application-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UpcomingReminders({ reminders }: { reminders: Reminder[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="font-display text-lg font-bold text-ink">Upcoming reminders</CardTitle>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Follow-ups, interviews, and decision windows.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex gap-3 rounded-md border border-hairline bg-surface-bone p-3 hover:bg-surface-card transition-colors duration-100"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-card text-primary">
                <BellRing className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {reminder.title}
                </p>
                {reminder.company && (
                  <p className="mt-1 text-xs text-charcoal font-medium">
                    {reminder.company}{" — "}{reminder.position}
                  </p>
                )}
                <p className="mt-2 text-xs font-mono font-semibold text-primary uppercase">
                  {format(
                    typeof reminder.remindAt === "string"
                      ? parseISO(reminder.remindAt)
                      : reminder.remindAt,
                    "MMM d, HH:mm",
                  )}
                </p>
              </div>
            </div>
          ))}
          {reminders.length === 0 && (
            <p className="text-sm text-charcoal/50 text-center py-8">No upcoming reminders</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
