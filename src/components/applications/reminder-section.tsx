"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BellRing,
  CheckCircle2,
  Circle,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { createReminder, toggleReminder, deleteReminder } from "@/lib/actions/reminders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Reminder } from "@/lib/application-data";

export function ReminderSection({
  applicationId,
  initialReminders,
}: {
  applicationId: string;
  initialReminders: Reminder[];
}) {
  const router = useRouter();
  const [reminders, setReminders] = useState(initialReminders);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !remindAt) return;

    setSaving(true);
    const result = await createReminder({ title, remindAt, applicationId });
    if ("error" in result) {
      toast.error(result.error as string);
    } else {
      toast.success("Reminder created");
      setTitle("");
      setRemindAt("");
      setShowForm(false);
      router.refresh();
    }
    setSaving(false);
  }

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-display text-lg font-bold text-ink">Reminders</CardTitle>
            <p className="mt-1 text-sm text-charcoal font-medium">
              Follow-ups, interviews, deadlines.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
            {showForm ? "Cancel" : "Add"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showForm && (
          <form onSubmit={handleCreate} className="space-y-3 rounded-md border border-hairline p-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Follow up with HR"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Date & time</Label>
              <Input
                type="datetime-local"
                value={remindAt}
                onChange={(e) => setRemindAt(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm" disabled={saving || !title || !remindAt}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : <BellRing className="size-4" />}
              {saving ? "Saving..." : "Save reminder"}
            </Button>
          </form>
        )}

        {reminders.length === 0 && !showForm && (
          <p className="py-6 text-center text-sm text-charcoal/50">No reminders yet.</p>
        )}

        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`flex items-center gap-3 rounded-md border p-3 transition-colors ${
              reminder.isCompleted
                ? "border-hairline bg-surface-bone/50 opacity-60"
                : "border-hairline bg-surface-bone"
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
              <p className="mt-1 text-xs font-mono font-semibold text-primary uppercase">
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
                  className="shrink-0 text-charcoal/40 hover:text-rose-500 transition-colors"
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
      </CardContent>
    </Card>
  );
}
