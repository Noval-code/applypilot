import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fromDb, formatSalary } from "@/lib/application-data";
import { MatchScore } from "@/components/applications/match-score";
import { DeleteApplicationButton } from "@/components/applications/delete-application-button";
import { ReminderSection } from "@/components/applications/reminder-section";
import { ActivityTimeline } from "@/components/applications/activity-timeline";
import { fromDbReminder } from "@/lib/application-data";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, Mail, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/applications/status-badge";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const [application, user, reminders, timelineEvents] = await Promise.all([
    prisma.application.findUnique({
      where: { id },
      include: { detail: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { skills: true },
    }),
    prisma.reminder.findMany({
      where: { userId: session.user.id, applicationId: id },
      orderBy: { remindAt: "asc" },
    }),
    prisma.applicationTimeline.findMany({
      where: { applicationId: id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!application || application.userId !== session.user.id) {
    notFound();
  }

  const d = application.detail;

  return (
    <AppShell>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="ghost">
          <Link href="/applications">
            <ArrowLeft />
            Back
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/applications/${application.id}/edit`}>Edit application</Link>
          </Button>
          <DeleteApplicationButton id={application.id} />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <div>
              <div className="mb-3">
                <StatusBadge status={application.status as any} />
              </div>
              <CardTitle className="font-display text-2xl font-bold text-ink">{application.company}</CardTitle>
              <p className="mt-2 text-base text-charcoal font-medium">{application.position}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Salary" value={formatSalary(fromDb(application))} />
              <DetailItem label="Source" value={d?.source ?? "Not listed"} />
              <DetailItem
                label="Applied"
                value={application.appliedAt?.toISOString().split("T")[0] ?? "Not set"}
              />
              <DetailItem
                label="Deadline"
                value={application.deadlineAt?.toISOString().split("T")[0] ?? "Not set"}
              />
            </div>

            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal">Description</h3>
              <p className="mt-2 leading-7 text-body">
                {d?.description ?? "No description saved."}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal">Notes</h3>
              <p className="mt-2 leading-7 text-body">
                {d?.notes ?? "No private notes saved."}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {d?.extractedSkills && d.extractedSkills.length > 0 && user && (
            <MatchScore userSkills={user.skills} jobSkills={d.extractedSkills} />
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg font-bold text-ink">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-charcoal">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-charcoal/50" />
                {d?.location ?? "No location"}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-charcoal/50" />
                {d?.contactEmail ?? "No email"}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-charcoal/50" />
                {d?.workType ?? "No work type"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg font-bold text-ink">Job link</CardTitle>
            </CardHeader>
            <CardContent>
              {d?.jobUrl ? (
                <Button asChild variant="outline" className="w-full">
                  <a href={d.jobUrl} target="_blank" rel="noreferrer">
                    Open job post
                    <ExternalLink />
                  </a>
                </Button>
              ) : (
                <p className="text-sm text-charcoal/50">No link saved.</p>
              )}
            </CardContent>
          </Card>

          <ReminderSection
            applicationId={application.id}
            initialReminders={reminders.map(fromDbReminder)}
          />

          <ActivityTimeline
            events={timelineEvents.map((e) => ({
              id: e.id,
              eventType: e.eventType,
              fromStatus: e.fromStatus ?? undefined,
              toStatus: e.toStatus ?? undefined,
              description: e.description ?? undefined,
              createdAt: e.createdAt.toISOString(),
            }))}
          />
        </div>
      </div>
    </AppShell>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-hairline bg-surface-bone p-4">
      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
