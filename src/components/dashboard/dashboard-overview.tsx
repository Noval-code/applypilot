import type { Application, Reminder } from "@/lib/application-data";
import { ApplicationTable } from "@/components/applications/application-table";
import { ApplicationChart } from "@/components/dashboard/application-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function getDashboardStats(applications: Application[], reminders: Reminder[]) {
  return [
    {
      label: "Total applications",
      value: applications.length,
      detail: `${applications.length} active records`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Interviews",
      value: applications.filter((a) => a.status === "INTERVIEW").length,
      detail: `${applications.filter((a) => a.status === "INTERVIEW").length} scheduled`,
      icon: Clock3,
    },
    {
      label: "Offers",
      value: applications.filter((a) => a.status === "OFFER").length,
      detail: `${applications.filter((a) => a.status === "OFFER").length} pending review`,
      icon: CheckCircle2,
    },
    {
      label: "Upcoming reminders",
      value: reminders.length,
      detail: "Next 7 days",
      icon: Clock3,
    },
  ];
}

function getChartData(applications: Application[]) {
  const statuses = ["WISHLIST", "APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"] as const;
  const labels: Record<string, string> = {
    WISHLIST: "Wish",
    APPLIED: "Applied",
    SCREENING: "Screen",
    INTERVIEW: "Meet",
    OFFER: "Offer",
    REJECTED: "Closed",
  };

  return statuses.map((status) => ({
    status: labels[status],
    total: applications.filter((a) => a.status === status).length,
  }));
}

export function DashboardOverview({
  applications,
  reminders,
}: {
  applications: Application[];
  reminders: Reminder[];
}) {
  const stats = getDashboardStats(applications, reminders);
  const chartData = getChartData(applications);

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.6fr)]">
        <ApplicationChart data={chartData} />
        <UpcomingReminders reminders={reminders} />
      </section>

      <section className="mt-5">
        <ApplicationTable applications={applications.slice(0, 5)} />
      </section>
    </>
  );
}
