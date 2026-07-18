import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb } from "@/lib/application-data";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApplicationTable } from "@/components/applications/application-table";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { detail: true },
  });

  const mapped = applications.map(fromDb);

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

      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-charcoal/50" />
          <Input className="pl-10" placeholder="Search company or role" />
        </div>
        <FormSelect />
        <FormSelect />
      </div>

      <ApplicationTable applications={mapped} />
    </AppShell>
  );
}

function FormSelect() {
  return (
    <select className="h-10 rounded-md border border-hairline bg-surface-card px-3 text-sm text-ink outline-none transition-colors focus:border-hairline-strong focus:ring-2 focus:ring-ring/20 cursor-pointer">
      <option>All</option>
    </select>
  );
}
