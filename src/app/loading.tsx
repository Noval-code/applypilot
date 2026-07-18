import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLoading() {
  return (
    <AppShell>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-hairline bg-surface-card p-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-10 w-16" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border border-hairline bg-surface-card p-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-4 h-48 w-full" />
        </div>
        <div className="rounded-xl border border-hairline bg-surface-card p-5">
          <Skeleton className="h-4 w-28" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
