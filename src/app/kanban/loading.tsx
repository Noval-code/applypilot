import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";

export default function KanbanLoading() {
  return (
    <AppShell>
      <div className="mb-5">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-1 h-4 w-48" />
      </div>
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-hairline bg-surface-card p-3">
            <Skeleton className="h-5 w-20" />
            <div className="mt-3 space-y-3">
              {Array.from({ length: 2 }).map((_, j) => (
                <Skeleton key={j} className="h-24 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
