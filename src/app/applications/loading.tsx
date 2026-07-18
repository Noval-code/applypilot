import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";

export default function ApplicationsLoading() {
  return (
    <AppShell>
      <div className="mb-5">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-1 h-4 w-56" />
      </div>
      <div className="rounded-xl border border-hairline bg-surface-card">
        <div className="border-b border-hairline p-5">
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-hairline p-4 last:border-0">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
