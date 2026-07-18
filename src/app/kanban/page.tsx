import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb } from "@/lib/application-data";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AppShell } from "@/components/layout/app-shell";

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
