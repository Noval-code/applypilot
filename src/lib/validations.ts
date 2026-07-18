import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  status: z.enum([
    "WISHLIST",
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
  ]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  jobUrl: z.string().url("Use a valid URL").optional().or(z.literal("")),
  source: z.string().optional(),
  location: z.string().optional(),
  workType: z.enum(["ONSITE", "HYBRID", "REMOTE"]).optional(),
  salaryMin: z.string().regex(/^\d*$/, "Use numbers only").optional(),
  salaryMax: z.string().regex(/^\d*$/, "Use numbers only").optional(),
  currency: z.string().min(3).max(3),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  appliedAt: z.string().optional(),
  deadlineAt: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  jobDescription: z.string().optional(),
  extractedSkills: z.array(z.string()).optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Use a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Use a valid email"),
  password: z.string().min(1, "Password is required"),
});
