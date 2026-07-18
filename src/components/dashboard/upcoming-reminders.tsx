"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import {
  BellRing,
  CheckCircle2,
  Circle,
  Loader2,
  Trash2,
} from "lucide-react";
import { toggleReminder, deleteReminder } from "@/lib/actions/reminders";
import type { Reminder } from "@/lib/application-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function UpcomingReminders({ reminders }: { reminders: Reminder[] }) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  async function handleToggle(id: string) {
    setTogglingId(id);
    await toggleReminder(id);
    toast.success("Reminder updated");
    router.refresh();
    setTogglingId(null);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setConfirmDeleteId(null);
    await deleteReminder(id);
    toast.success("Reminder deleted");
    router.refresh();
    setDeletingId(null);
  }

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
              className={`flex gap-3 rounded-md border p-3 transition-colors ${
                reminder.isCompleted
                  ? "border-hairline bg-surface-bone/50 opacity-60"
                  : "border-hairline bg-surface-bone hover:bg-surface-card"
              }`}
            >
              <button
                onClick={() => handleToggle(reminder.id)}
                disabled={togglingId === reminder.id}
                className="shrink-0"
              >
                {togglingId === reminder.id ? (
                  <Loader2 className="size-5 animate-spin text-primary" />
                ) : reminder.isCompleted ? (
                  <CheckCircle2 className="size-5 text-emerald-500" />
                ) : (
                  <Circle className="size-5 text-charcoal/40 hover:text-primary transition-colors" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-semibold text-ink ${reminder.isCompleted ? "line-through" : ""}`}>
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
              <AlertDialog
                open={confirmDeleteId === reminder.id}
                onOpenChange={(open) => setConfirmDeleteId(open ? reminder.id : null)}
              >
                <AlertDialogTrigger asChild>
                  <button
                    disabled={deletingId === reminder.id}
                    className="shrink-0 self-start text-charcoal/40 hover:text-rose-500 transition-colors"
                  >
                    {deletingId === reminder.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete reminder</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{reminder.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(reminder.id)} disabled={deletingId === reminder.id}>
                      {deletingId === reminder.id ? <Loader2 className="size-4 animate-spin" /> : null}
                      {deletingId === reminder.id ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
