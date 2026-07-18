"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reminderSchema } from "@/lib/validations";

export async function createReminder(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = reminderSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid data" };

  const { title, remindAt, applicationId } = parsed.data;

  try {
    const reminder = await prisma.reminder.create({
      data: {
        title,
        remindAt: new Date(remindAt),
        userId: session.user.id,
        applicationId: applicationId || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/applications/[id]");
    return { success: true, id: reminder.id };
  } catch {
    return { error: "Failed to create reminder" };
  }
}

export async function toggleReminder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const reminder = await prisma.reminder.findUnique({ where: { id } });
    if (!reminder || reminder.userId !== session.user.id) return { error: "Not found" };

    await prisma.reminder.update({
      where: { id },
      data: { isCompleted: !reminder.isCompleted },
    });

    revalidatePath("/");
    revalidatePath("/applications/[id]");
    return { success: true };
  } catch {
    return { error: "Failed to toggle reminder" };
  }
}

export async function deleteReminder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const reminder = await prisma.reminder.findUnique({ where: { id } });
    if (!reminder || reminder.userId !== session.user.id) return { error: "Not found" };

    await prisma.reminder.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/applications/[id]");
    return { success: true };
  } catch {
    return { error: "Failed to delete reminder" };
  }
}

export async function getReminders(applicationId?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return prisma.reminder.findMany({
    where: {
      userId: session.user.id,
      ...(applicationId ? { applicationId } : {}),
    },
    orderBy: { remindAt: "asc" },
  });
}
