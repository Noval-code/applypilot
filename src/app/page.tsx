import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb, fromDbReminder } from "@/lib/application-data";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { EmptyState } from "@/components/ui/empty-state";
import { AppShell } from "@/components/layout/app-shell";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { detail: true },
  });

  const reminders = await prisma.reminder.findMany({
    where: { userId: session.user.id, isCompleted: false },
    orderBy: { remindAt: "asc" },
    take: 5,
    include: { application: { select: { company: true, position: true } } },
  });

  if (applications.length === 0) {
    return (
      <AppShell>
        <EmptyState
          title="Welcome to ApplyPilot"
          description="Track job applications, manage deadlines, and organize your hiring pipeline — all in one place."
          actionLabel="Add your first application"
          actionHref="/applications/new"
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <DashboardOverview
        applications={applications.map(fromDb)}
        reminders={reminders.map(fromDbReminder)}
      />
    </AppShell>
  );
}
