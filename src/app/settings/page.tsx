import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/layout/app-shell";
import { SkillsForm } from "@/components/settings/skills-form";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, skills: true },
  });

  return (
    <AppShell>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-bold text-ink">Settings</h2>
        <p className="mt-1 text-sm text-charcoal font-medium">
          Profile, skills, and notification defaults.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SkillsForm name={user?.name} email={user?.email} skills={user?.skills ?? []} />
      </div>
    </AppShell>
  );
}
