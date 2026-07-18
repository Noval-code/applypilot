import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";

export default function ApplicationDetailLoading() {
  return (
    <AppShell>
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-hairline bg-surface-card p-5 space-y-5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-36" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md border border-hairline bg-surface-bone p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-4 w-28" />
              </div>
            ))}
          </div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="space-y-5">
          <div className="rounded-xl border border-hairline bg-surface-card p-5">
            <Skeleton className="h-5 w-24" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-hairline bg-surface-card p-5">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
