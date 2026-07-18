import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb } from "@/lib/application-data";
import { ApplicationForm } from "@/components/applications/application-form";
import { AppShell } from "@/components/layout/app-shell";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const application = await prisma.application.findUnique({ where: { id } });

  if (!application || application.userId !== session.user.id) {
    notFound();
  }

  return (
    <AppShell>
      <ApplicationForm
        application={fromDb(application)}
        mode="edit"
        redirectTo="/applications/[id]"
      />
    </AppShell>
  );
}
