import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb } from "@/lib/application-data";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ApplicationTable } from "@/components/applications/application-table";
import { SearchFilters } from "@/components/applications/search-filters";
import { Pagination } from "@/components/ui/pagination";
import { Plus, ListTodo } from "lucide-react";
import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";

const PAGE_SIZE = 10;

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; priority?: string; sort?: string; page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const sp = await searchParams;

  const where: Prisma.ApplicationWhereInput = { userId: session.user.id };

  if (sp.q) {
    where.OR = [
      { company: { contains: sp.q, mode: "insensitive" } },
      { position: { contains: sp.q, mode: "insensitive" } },
    ];
  }

  if (sp.status) {
    where.status = sp.status as any;
  }

  if (sp.priority) {
    where.priority = sp.priority as any;
  }

  let orderBy: Prisma.ApplicationOrderByWithRelationInput = { updatedAt: "desc" };

  switch (sp.sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "company":
      orderBy = { company: "asc" };
      break;
    case "deadlineAt":
      orderBy = { deadlineAt: { sort: "asc", nulls: "last" } };
      break;
  }

  const currentPage = Math.max(1, parseInt(sp.page ?? "1"));
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [applications, totalCount] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy,
      skip,
      take: PAGE_SIZE,
      include: { detail: true },
    }),
    prisma.application.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const mapped = applications.map(fromDb);

  if (applications.length === 0) {
    return (
      <AppShell>
        <div className="mb-5">
          <h2 className="font-display text-2xl font-bold text-ink">Applications</h2>
          <p className="mt-1 text-sm text-charcoal font-medium">Track your job search cycle.</p>
        </div>
        <EmptyState
          icon={ListTodo}
          title={sp.q || sp.status || sp.priority ? "No matching applications" : "No applications yet"}
          description={
            sp.q || sp.status || sp.priority
              ? "Try adjusting your search or filter criteria."
              : "Start tracking your job hunt — add your first application to get going."
          }
          actionLabel="Add application"
          actionHref="/applications/new"
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Applications</h2>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Search cycle records, salary range, priority, and next deadline.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/applications/new">
            <Plus className="mr-1.5 size-4" />
            New application
          </Link>
        </Button>
      </div>

      <SearchFilters />

      <ApplicationTable applications={mapped} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-charcoal/60 font-medium">
          {totalCount} {totalCount === 1 ? "application" : "applications"}
          {sp.q && <> matching "{sp.q}"</>}
        </p>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </AppShell>
  );
}
