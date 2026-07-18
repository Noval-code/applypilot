import { prisma } from "@/lib/prisma";

export async function logTimeline({
  applicationId,
  userId,
  eventType,
  fromStatus,
  toStatus,
  description,
}: {
  applicationId: string;
  userId: string;
  eventType: string;
  fromStatus?: string | null;
  toStatus?: string | null;
  description?: string;
}) {
  try {
    await prisma.applicationTimeline.create({
      data: {
        applicationId,
        userId,
        eventType,
        fromStatus: fromStatus ?? null,
        toStatus: toStatus ?? null,
        description: description ?? null,
      },
    });
  } catch {
    // Silently fail — timeline logging should never block the main action
  }
}
