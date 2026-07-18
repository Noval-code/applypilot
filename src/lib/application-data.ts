import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileCheck2,
  Handshake,
  MessageSquareText,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export type ApplicationStatus =
  | "WISHLIST"
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export type WorkType = "ONSITE" | "HYBRID" | "REMOTE";

export type ApplicationPriority = "LOW" | "MEDIUM" | "HIGH";

export type Application = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  workType: WorkType;
  jobUrl?: string;
  source?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  appliedAt?: string;
  deadlineAt?: string;
  description?: string;
  notes?: string;
  jobDescription?: string;
  extractedSkills?: string[];
};

export type Reminder = {
  id: string;
  title: string;
  remindAt: string;
  applicationId?: string;
  company?: string;
  position?: string;
  isCompleted: boolean;
};

export const statusConfig: Record<
  ApplicationStatus,
  {
    label: string;
    shortLabel: string;
    icon: LucideIcon;
    className: string;
  }
> = {
  WISHLIST: {
    label: "Wishlist",
    shortLabel: "Wish",
    icon: CircleDashed,
    className: "border-hairline bg-surface-card text-charcoal",
  },
  APPLIED: {
    label: "Applied",
    shortLabel: "Applied",
    icon: FileCheck2,
    className: "border-blue-200 bg-blue-50/30 text-blue-800",
  },
  SCREENING: {
    label: "Screening",
    shortLabel: "Screen",
    icon: MessageSquareText,
    className: "border-amber-200 bg-amber-50/30 text-amber-800",
  },
  INTERVIEW: {
    label: "Interview",
    shortLabel: "Meet",
    icon: BriefcaseBusiness,
    className: "border-indigo-200 bg-indigo-50/30 text-indigo-800",
  },
  OFFER: {
    label: "Offer",
    shortLabel: "Offer",
    icon: Handshake,
    className: "border-emerald-200 bg-emerald-50/30 text-emerald-800",
  },
  REJECTED: {
    label: "Rejected",
    shortLabel: "Closed",
    icon: XCircle,
    className: "border-rose-200 bg-rose-50/30 text-rose-800",
  },
};

export const statuses = Object.keys(statusConfig) as ApplicationStatus[];

export const priorityConfig: Record<
  ApplicationPriority,
  { label: string; className: string }
> = {
  LOW: {
    label: "Low",
    className: "bg-surface-bone text-charcoal",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-amber-100 text-amber-700",
  },
  HIGH: {
    label: "High",
    className: "bg-rose-100 text-rose-700",
  },
};

export const sampleApplications: Application[] = [
  {
    id: "app-1",
    company: "Northstar Labs",
    position: "Frontend Engineer",
    status: "INTERVIEW",
    priority: "HIGH",
    jobUrl: "https://example.com/jobs/frontend-engineer",
    source: "LinkedIn",
    location: "Remote",
    workType: "REMOTE",
    salaryMin: 18000000,
    salaryMax: 26000000,
    currency: "IDR",
    contactName: "Maya Santoso",
    contactEmail: "maya@example.com",
    appliedAt: "2026-07-01",
    deadlineAt: "2026-07-12",
    description:
      "Build design-system driven product surfaces using React, TypeScript, and accessible component patterns.",
    notes:
      "Prepare examples about responsive UI, dashboard state, and form validation.",
  },
  {
    id: "app-2",
    company: "OrbitPay",
    position: "Full Stack Developer",
    status: "SCREENING",
    priority: "HIGH",
    jobUrl: "https://example.com/jobs/full-stack-developer",
    source: "Company site",
    location: "Jakarta",
    workType: "HYBRID",
    salaryMin: 16000000,
    salaryMax: 24000000,
    currency: "IDR",
    contactName: "Raka Putra",
    appliedAt: "2026-07-03",
    deadlineAt: "2026-07-11",
    description:
      "Own features across Next.js, PostgreSQL, Prisma, testing, and deployment pipelines.",
    notes: "Ask about API ownership and production monitoring.",
  },
  {
    id: "app-3",
    company: "AtlasCare",
    position: "Product Engineer",
    status: "APPLIED",
    priority: "MEDIUM",
    jobUrl: "https://example.com/jobs/product-engineer",
    source: "Referral",
    location: "Bandung",
    workType: "HYBRID",
    salaryMin: 14000000,
    salaryMax: 21000000,
    currency: "IDR",
    appliedAt: "2026-07-05",
    deadlineAt: "2026-07-15",
    description:
      "Ship customer-facing workflows with strong product sense and reliable data models.",
    notes: "Follow up with Dina after one week.",
  },
  {
    id: "app-4",
    company: "CraftOS",
    position: "Junior Full Stack Engineer",
    status: "WISHLIST",
    priority: "MEDIUM",
    jobUrl: "https://example.com/jobs/junior-full-stack",
    source: "GitHub Jobs",
    location: "Singapore",
    workType: "REMOTE",
    salaryMin: 22000000,
    salaryMax: 30000000,
    currency: "IDR",
    deadlineAt: "2026-07-20",
    description:
      "Contribute to internal tools, admin dashboards, and workflow automation.",
    notes: "Tailor CV around admin dashboard and CRUD workflow projects.",
  },
  {
    id: "app-5",
    company: "Lumen Studio",
    position: "UI Engineer",
    status: "OFFER",
    priority: "LOW",
    source: "Twitter",
    location: "Remote",
    workType: "REMOTE",
    salaryMin: 12000000,
    salaryMax: 18000000,
    currency: "IDR",
    appliedAt: "2026-06-18",
    deadlineAt: "2026-07-10",
    description:
      "Create polished interfaces for SaaS teams with a focus on interaction quality.",
    notes: "Review contract details and compare benefits.",
  },
  {
    id: "app-6",
    company: "BlueGrid",
    position: "Backend Developer",
    status: "REJECTED",
    priority: "LOW",
    source: "Job board",
    location: "Surabaya",
    workType: "ONSITE",
    currency: "IDR",
    appliedAt: "2026-06-24",
    description:
      "Maintain Node.js APIs, PostgreSQL schema, and background processing jobs.",
    notes: "Rejected after screening; revisit backend interview prep.",
  },
];

export const sampleReminders: Reminder[] = [
  {
    id: "rem-1",
    applicationId: "app-2",
    company: "OrbitPay",
    position: "Full Stack Developer",
    title: "Follow up screening result",
    remindAt: "2026-07-11T09:00:00.000Z",
    isCompleted: false,
  },
  {
    id: "rem-2",
    applicationId: "app-1",
    company: "Northstar Labs",
    position: "Frontend Engineer",
    title: "Prepare technical interview notes",
    remindAt: "2026-07-12T13:00:00.000Z",
    isCompleted: false,
  },
  {
    id: "rem-3",
    applicationId: "app-5",
    company: "Lumen Studio",
    position: "UI Engineer",
    title: "Review offer checklist",
    remindAt: "2026-07-10T08:30:00.000Z",
    isCompleted: false,
  },
];

export const chartData = statuses.map((status) => ({
  status: statusConfig[status].shortLabel,
  total: sampleApplications.filter((application) => application.status === status)
    .length,
}));

export const dashboardStats = [
  {
    label: "Total applications",
    value: sampleApplications.length,
    detail: "6 active records",
    icon: BriefcaseBusiness,
  },
  {
    label: "Interviews",
    value: sampleApplications.filter(
      (application) => application.status === "INTERVIEW",
    ).length,
    detail: "1 scheduled",
    icon: Clock3,
  },
  {
    label: "Offers",
    value: sampleApplications.filter((application) => application.status === "OFFER")
      .length,
    detail: "1 pending review",
    icon: CheckCircle2,
  },
  {
    label: "Upcoming reminders",
    value: sampleReminders.filter((reminder) => !reminder.isCompleted).length,
    detail: "Next 7 days",
    icon: Clock3,
  },
];

export function getApplicationById(id: string) {
  return sampleApplications.find((application) => application.id === id);
}

export function formatSalary(application: Application) {
  if (!application.salaryMin && !application.salaryMax) {
    return "Not listed";
  }

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: application.currency,
    maximumFractionDigits: 0,
  });

  if (application.salaryMin && application.salaryMax) {
    return `${formatter.format(application.salaryMin)} - ${formatter.format(
      application.salaryMax,
    )}`;
  }

  return formatter.format(application.salaryMin ?? application.salaryMax ?? 0);
}

/** Convert a Prisma Reminder (with included application) to the UI Reminder type */
export function fromDbReminder(
  reminder: {
    id: string;
    title: string;
    remindAt: Date;
    applicationId: string | null;
    isCompleted: boolean;
    application?: {
      company: string | null;
      position: string | null;
    } | null;
  },
): Reminder {
  return {
    id: reminder.id,
    title: reminder.title,
    remindAt: reminder.remindAt.toISOString(),
    applicationId: reminder.applicationId ?? undefined,
    company: reminder.application?.company ?? undefined,
    position: reminder.application?.position ?? undefined,
    isCompleted: reminder.isCompleted,
  };
}

/** Convert a Prisma Application row (with optional detail join) to the UI Application type */
export function fromDb(app: {
  id: string;
  company: string;
  position: string;
  status: string;
  priority: string;
  appliedAt: Date | null;
  deadlineAt: Date | null;
  detail?: {
    jobUrl: string | null;
    source: string | null;
    location: string | null;
    workType: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    currency: string;
    contactName: string | null;
    contactEmail: string | null;
    description: string | null;
    notes: string | null;
    jobDescription: string | null;
    extractedSkills: string[];
  } | null;
}): Application {
  const d = app.detail;
  return {
    id: app.id,
    company: app.company,
    position: app.position,
    status: app.status as ApplicationStatus,
    priority: app.priority as ApplicationPriority,
    workType: (d?.workType ?? "ONSITE") as WorkType,
    jobUrl: d?.jobUrl ?? undefined,
    source: d?.source ?? undefined,
    location: d?.location ?? undefined,
    contactName: d?.contactName ?? undefined,
    contactEmail: d?.contactEmail ?? undefined,
    salaryMin: d?.salaryMin ?? undefined,
    salaryMax: d?.salaryMax ?? undefined,
    currency: d?.currency ?? "IDR",
    description: d?.description ?? undefined,
    notes: d?.notes ?? undefined,
    jobDescription: d?.jobDescription ?? undefined,
    extractedSkills: d?.extractedSkills ?? undefined,
    appliedAt: app.appliedAt?.toISOString().split("T")[0] ?? undefined,
    deadlineAt: app.deadlineAt?.toISOString().split("T")[0] ?? undefined,
  };
}
