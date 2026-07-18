"use client";

import { useMemo, useState, useTransition } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, GripVertical } from "lucide-react";
import { StatusBadge } from "@/components/applications/status-badge";
import { Card } from "@/components/ui/card";
import {
  type Application,
  type ApplicationStatus,
  statuses,
  statusConfig,
} from "@/lib/application-data";
import { updateApplicationStatus } from "@/lib/actions/applications";
import { cn } from "@/lib/utils";

export function KanbanBoard({ applications }: { applications: Application[] }) {
  const [items, setItems] = useState(applications);
  const [, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const grouped = useMemo(() => {
    return statuses.reduce<Record<ApplicationStatus, Application[]>>(
      (acc, status) => {
        acc[status] = items.filter((item) => item.status === status);
        return acc;
      },
      { WISHLIST: [], APPLIED: [], SCREENING: [], INTERVIEW: [], OFFER: [], REJECTED: [] },
    );
  }, [items]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const nextStatus = over.id as ApplicationStatus;
    if (!statuses.includes(nextStatus)) return;

    const appId = active.id as string;

    setItems((current) =>
      current.map((item) =>
        item.id === appId ? { ...item, status: nextStatus } : item,
      ),
    );

    startTransition(async () => {
      await updateApplicationStatus(appId, nextStatus);
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 xl:grid-cols-6">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            applications={grouped[status]}
          />
        ))}
      </div>
    </DndContext>
  );
}

function KanbanColumn({
  status,
  applications,
}: {
  status: ApplicationStatus;
  applications: Application[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = statusConfig[status];

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "min-h-[460px] rounded-md border border-hairline bg-surface-bone/50 p-3 transition-all duration-150",
        isOver && "border-ring bg-surface-card",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <StatusBadge status={status} />
        <span className="rounded-md bg-surface-card border border-hairline px-2 py-0.5 text-xs font-mono font-semibold text-charcoal">
          {applications.length}
        </span>
      </div>

      <div className="space-y-3">
        {applications.map((application) => (
          <KanbanItem key={application.id} application={application} />
        ))}
        {applications.length === 0 && (
          <div className="rounded-md border border-dashed border-hairline p-4 text-center text-xs text-charcoal/50 font-medium">
            {config.label} is empty
          </div>
        )}
      </div>
    </section>
  );
}

function KanbanItem({ application }: { application: Application }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
  });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab p-3 active:cursor-grabbing",
        isDragging && "z-20 opacity-70 shadow-lg",
      )}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 size-4 shrink-0 text-charcoal/45" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{application.company}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-charcoal font-medium">
            {application.position}
          </p>
          {application.deadlineAt && (
            <p className="mt-2.5 flex items-center gap-1 text-xs font-mono font-semibold text-primary">
              <CalendarDays className="size-3.5" />
              {application.deadlineAt}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
