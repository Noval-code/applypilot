"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, Loader2, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/applications/status-badge";
import { Badge } from "@/components/ui/badge";
import { deleteApplication } from "@/lib/actions/applications";
import {
  type Application,
  formatSalary,
  priorityConfig,
} from "@/lib/application-data";

export function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this application? This action cannot be undone.")) return;
    setDeletingId(id);
    const result = await deleteApplication(id);
    if ("error" in result) {
      toast.error(result.error as string);
    } else {
      toast.success("Application deleted");
      router.refresh();
    }
    setDeletingId(null);
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="font-display text-lg font-bold text-ink">Applications</CardTitle>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Active records across the current search cycle.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/applications">Open list</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline-strong text-[10px] font-mono font-semibold uppercase tracking-wider text-charcoal">
                <th className="py-3 pr-4 font-medium">Company</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Priority</th>
                <th className="py-3 pr-4 font-medium">Deadline</th>
                <th className="py-3 pr-4 font-medium">Salary</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-hairline last:border-0 hover:bg-surface-bone/35 transition-colors duration-100"
                >
                  <td className="py-4 pr-4">
                    <div className="font-semibold text-ink">
                      {application.company}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-charcoal font-medium">
                      <span>{application.position}</span>
                      {application.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3 text-charcoal/50" />
                          {application.location}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={application.status} />
                  </td>
                  <td className="py-4 pr-4">
                    <Badge
                      variant={
                        application.priority === "HIGH"
                          ? "danger"
                          : application.priority === "MEDIUM"
                          ? "warning"
                          : "default"
                      }
                    >
                      {priorityConfig[application.priority].label}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4 text-ink font-mono text-xs font-semibold">
                    {application.deadlineAt ? (
                      <span className="inline-flex items-center gap-2 text-primary">
                        <CalendarDays className="size-4" />
                        {application.deadlineAt}
                      </span>
                    ) : (
                      <span className="text-charcoal/50 font-normal">Not set</span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-ink font-mono text-xs font-semibold">
                    {formatSalary(application)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/applications/${application.id}`}>
                          View
                          <ArrowUpRight />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(application.id)}
                        disabled={deletingId === application.id}
                      >
                        {deletingId === application.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4 text-rose-500" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
