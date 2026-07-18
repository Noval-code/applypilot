"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type Application,
  type ApplicationPriority,
  type WorkType,
  statuses,
  statusConfig,
} from "@/lib/application-data";
import {
  applicationSchema,
  type ApplicationFormValues,
} from "@/lib/validations";
import { createApplication, updateApplication } from "@/lib/actions/applications";

const priorityOptions: ApplicationPriority[] = ["LOW", "MEDIUM", "HIGH"];
const workTypeOptions: WorkType[] = ["REMOTE", "HYBRID", "ONSITE"];

const baseValues: ApplicationFormValues = {
  company: "",
  position: "",
  status: "WISHLIST",
  priority: "MEDIUM",
  jobUrl: "",
  source: "",
  location: "",
  workType: "REMOTE",
  salaryMin: "",
  salaryMax: "",
  currency: "IDR",
  contactName: "",
  contactEmail: "",
  appliedAt: "",
  deadlineAt: "",
  description: "",
  notes: "",
};

function toDefaultValues(application?: Application): ApplicationFormValues {
  if (!application) {
    return baseValues;
  }

  return {
    company: application.company,
    position: application.position,
    status: application.status,
    priority: application.priority,
    jobUrl: application.jobUrl ?? "",
    source: application.source ?? "",
    location: application.location ?? "",
    workType: application.workType ?? "REMOTE",
    salaryMin: application.salaryMin ? String(application.salaryMin) : "",
    salaryMax: application.salaryMax ? String(application.salaryMax) : "",
    currency: application.currency,
    contactName: application.contactName ?? "",
    contactEmail: application.contactEmail ?? "",
    appliedAt: application.appliedAt ?? "",
    deadlineAt: application.deadlineAt ?? "",
    description: application.description ?? "",
    notes: application.notes ?? "",
  };
}

export function ApplicationForm({
  application,
  mode = "create",
  redirectTo,
}: {
  application?: Application;
  mode?: "create" | "edit";
  redirectTo?: string;
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const raw: Record<string, FormDataEntryValue> = {};
      for (const [key, val] of formData.entries()) {
        raw[key] = val;
      }
      const parsed = applicationSchema.safeParse(raw);
      if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors, success: false };
      }

      const result = mode === "create"
        ? await createApplication(parsed.data)
        : await updateApplication(application!.id, parsed.data);

      if ("error" in result) {
        return { error: result.error, success: false };
      }

      if (redirectTo && "id" in result) {
        window.location.href = redirectTo.replace("[id]", result.id as string);
      }

      return { error: null, success: true };
    },
    { error: null, success: false },
  );

  const {
    register,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: toDefaultValues(application),
  });

  return (
    <form action={formAction} className="space-y-5">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="font-display text-lg font-bold text-ink">
              {mode === "create" ? "New application" : "Edit application"}
            </CardTitle>
            <p className="mt-1 text-sm text-charcoal font-medium">
              Company, role, source, status, and compensation notes.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <Field label="Company" error={errors.company?.message || (typeof state.error === 'object' && state.error !== null && 'company' in state.error ? (state.error as Record<string, string[]>).company?.[0] : undefined)}>
            <Input placeholder="Northstar Labs" {...register("company")} />
          </Field>

          <Field label="Position" error={errors.position?.message}>
            <Input placeholder="Full Stack Developer" {...register("position")} />
          </Field>

          <Field label="Status">
            <select
              className="h-10 w-full rounded-md border border-hairline bg-surface-card px-3 text-sm text-ink outline-none transition-colors focus:border-hairline-strong focus:ring-2 focus:ring-ring/20 cursor-pointer"
              {...register("status")}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {statusConfig[status].label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Priority">
            <select
              className="h-10 w-full rounded-md border border-hairline bg-surface-card px-3 text-sm text-ink outline-none transition-colors focus:border-hairline-strong focus:ring-2 focus:ring-ring/20 cursor-pointer"
              {...register("priority")}
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Job URL" error={errors.jobUrl?.message}>
            <Input placeholder="https://company.com/careers" {...register("jobUrl")} />
          </Field>

          <Field label="Source">
            <Input placeholder="LinkedIn, referral, company site" {...register("source")} />
          </Field>

          <Field label="Location">
            <Input placeholder="Jakarta, Remote, Singapore" {...register("location")} />
          </Field>

          <Field label="Work type">
            <select
              className="h-10 w-full rounded-md border border-hairline bg-surface-card px-3 text-sm text-ink outline-none transition-colors focus:border-hairline-strong focus:ring-2 focus:ring-ring/20 cursor-pointer"
              {...register("workType")}
            >
              {workTypeOptions.map((workType) => (
                <option key={workType} value={workType}>
                  {workType}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Salary min">
            <Input inputMode="numeric" placeholder="16000000" {...register("salaryMin")} />
          </Field>

          <Field label="Salary max">
            <Input inputMode="numeric" placeholder="24000000" {...register("salaryMax")} />
          </Field>

          <Field label="Applied date">
            <Input type="date" {...register("appliedAt")} />
          </Field>

          <Field label="Deadline">
            <Input type="date" {...register("deadlineAt")} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg font-bold text-ink">Notes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <Field label="Description">
            <Textarea
              placeholder="Main responsibilities and requirements"
              {...register("description")}
            />
          </Field>
          <Field label="Private notes">
            <Textarea
              placeholder="Interview prep, contact notes, next action"
              {...register("notes")}
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {state.success && (
          <p className="text-sm font-semibold text-emerald-700">
            {application?.company ?? "Application"} {mode === "create" ? "created" : "updated"} successfully
          </p>
        )}
        {state.error && typeof state.error === 'string' && (
          <p className="text-sm font-semibold text-rose-600">{state.error}</p>
        )}
        <Button type="submit" className="sm:w-auto" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save />}
          {pending ? "Saving..." : "Save application"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}
