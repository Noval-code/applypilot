"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  jobDescription: "",
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
    jobDescription: application.jobDescription ?? "",
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
  const [extracting, startExtract] = useTransition();
  const [submitting, startSubmit] = useTransition();
  const [extractError, setExtractError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: toDefaultValues(application),
  });

  async function onSubmit(data: ApplicationFormValues) {
    setSubmitError("");
    startSubmit(async () => {
      const result = mode === "create"
        ? await createApplication({ ...data, extractedSkills })
        : await updateApplication(application!.id, { ...data, extractedSkills });

      if ("error" in result) {
        const msg = typeof result.error === "string" ? result.error : "Please fix the form errors";
        setSubmitError(msg);
        toast.error(msg);
        return;
      }

      toast.success(mode === "create" ? "Application created!" : "Application updated!");

      if (redirectTo && "id" in result) {
        setTimeout(() => {
          window.location.href = redirectTo.replace("[id]", result.id as string);
        }, 1200);
      }
    });
  }

  async function handleAutoFill() {
    const jd = (document.querySelector('[name="jobDescription"]') as HTMLTextAreaElement)?.value;
    if (!jd || jd.length < 20) {
      setExtractError("Paste job description first (min 20 chars)");
      return;
    }
    setExtractError("");
    startExtract(async () => {
      try {
        const res = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription: jd }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Extraction failed");
        }
        const data = await res.json();
        setExtractedSkills(data.skills ?? []);
        reset({
          ...baseValues,
          jobDescription: jd,
          company: data.company || "",
          position: data.position || "",
          workType: data.workType || "REMOTE",
          salaryMin: data.salaryMin ? String(data.salaryMin) : "",
          salaryMax: data.salaryMax ? String(data.salaryMax) : "",
        });
      } catch (e: any) {
        setExtractError(e.message ?? "Failed to extract");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <Field label="Company" error={errors.company?.message}>
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

          <Field label="Contact name">
            <Input placeholder="Jane Doe" {...register("contactName")} />
          </Field>

          <Field label="Contact email" error={errors.contactEmail?.message}>
            <Input type="email" placeholder="jane@company.com" {...register("contactEmail")} />
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg font-bold text-ink">Job description</CardTitle>
              <p className="mt-1 text-sm text-charcoal font-medium">
                Paste the job posting — AI will auto-fill fields.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAutoFill}
              disabled={extracting}
            >
              {extracting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {extracting ? "Extracting..." : "Auto-fill"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste full job description here..."
            className="min-h-[140px]"
            {...register("jobDescription")}
          />
          {extractError && (
            <p className="mt-2 text-sm font-medium text-rose-600">{extractError}</p>
          )}
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
        {submitError && (
          <p className="text-sm font-semibold text-rose-600">{submitError}</p>
        )}
        <Button type="submit" className="sm:w-auto" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : <Save />}
          {submitting ? "Saving..." : "Save application"}
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
