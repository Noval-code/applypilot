import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";

export default function SettingsLoading() {
  return (
    <AppShell>
      <div className="mb-5">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="mt-1 h-4 w-48" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-surface-card p-5 space-y-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="rounded-xl border border-hairline bg-surface-card p-5 space-y-4">
          <Skeleton className="h-5 w-28" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </AppShell>
  );
}
