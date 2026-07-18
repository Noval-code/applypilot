"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations";

export async function createApplication(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { salaryMin, salaryMax, appliedAt, deadlineAt, jobUrl, source, location, workType, contactName, contactEmail, description, notes, jobDescription, extractedSkills, currency, ...rest } = parsed.data;

  try {
    const application = await prisma.application.create({
      data: {
        ...rest,
        userId: session.user.id,
        appliedAt: appliedAt ? new Date(appliedAt) : null,
        deadlineAt: deadlineAt ? new Date(deadlineAt) : null,
        detail: {
          create: {
            currency,
            jobUrl: jobUrl || null,
            source: source || null,
            location: location || null,
            workType: (workType as any) || null,
            salaryMin: salaryMin ? parseInt(salaryMin) : null,
            salaryMax: salaryMax ? parseInt(salaryMax) : null,
            contactName: contactName || null,
            contactEmail: contactEmail || null,
            description: description || null,
            notes: notes || null,
            jobDescription: jobDescription || null,
            extractedSkills: extractedSkills ?? [],
          },
        },
      },
    });

    revalidatePath("/applications");
    revalidatePath("/");
    return { success: true, id: application.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create application" };
  }
}

export async function updateApplication(id: string, data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { error: "Not found" };
  }

  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { salaryMin, salaryMax, appliedAt, deadlineAt, jobUrl, source, location, workType, contactName, contactEmail, description, notes, jobDescription, extractedSkills, currency, ...rest } = parsed.data;

  try {
    await prisma.application.update({
      where: { id },
      data: {
        ...rest,
        appliedAt: appliedAt ? new Date(appliedAt) : null,
        deadlineAt: deadlineAt ? new Date(deadlineAt) : null,
        detail: {
          upsert: {
            create: {
              currency,
              jobUrl: jobUrl || null,
              source: source || null,
              location: location || null,
              workType: (workType as any) || null,
              salaryMin: salaryMin ? parseInt(salaryMin) : null,
              salaryMax: salaryMax ? parseInt(salaryMax) : null,
              contactName: contactName || null,
              contactEmail: contactEmail || null,
              description: description || null,
              notes: notes || null,
              jobDescription: jobDescription || null,
              extractedSkills: extractedSkills ?? [],
            },
            update: {
              currency,
              jobUrl: jobUrl || null,
              source: source || null,
              location: location || null,
              workType: (workType as any) || null,
              salaryMin: salaryMin ? parseInt(salaryMin) : null,
              salaryMax: salaryMax ? parseInt(salaryMax) : null,
              contactName: contactName || null,
              contactEmail: contactEmail || null,
              description: description || null,
              notes: notes || null,
              jobDescription: jobDescription || null,
              extractedSkills: extractedSkills ?? [],
            },
          },
        },
      },
    });

    revalidatePath("/applications");
    revalidatePath(`/applications/${id}`);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update application" };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { error: "Not found" };
  }

  const validStatuses = ["WISHLIST", "APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"] as const;
  if (!validStatuses.includes(status as typeof validStatuses[number])) {
    return { error: "Invalid status" };
  }

  try {
    await prisma.application.update({
      where: { id },
      data: { status: status as any },
    });
    revalidatePath("/kanban");
    revalidatePath("/applications");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to update status" };
  }
}

export async function deleteApplication(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { error: "Not found" };
  }

  try {
    await prisma.application.delete({ where: { id } });
    revalidatePath("/applications");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to delete application" };
  }
}
