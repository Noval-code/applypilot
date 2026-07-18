import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb } from "@/lib/application-data";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { EmptyState } from "@/components/ui/empty-state";
import { AppShell } from "@/components/layout/app-shell";
import { Columns3 } from "lucide-react";

export default async function KanbanPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  const mapped = applications.map(fromDb);

  if (applications.length === 0) {
    return (
      <AppShell>
        <div className="mb-5">
          <h2 className="font-display text-2xl font-bold text-ink">Kanban pipeline</h2>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Drag cards across hiring stages and review active movement.
          </p>
        </div>
        <EmptyState
          icon={Columns3}
          title="Pipeline is empty"
          description="Add applications first — they will appear here as draggable cards."
          actionLabel="Add application"
          actionHref="/applications/new"
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-bold text-ink">Kanban pipeline</h2>
        <p className="mt-1 text-sm text-charcoal font-medium">
          Drag cards across hiring stages and review active movement.
        </p>
      </div>

      <KanbanBoard applications={mapped} />
    </AppShell>
  );
}
