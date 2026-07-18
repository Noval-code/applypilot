"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSidebarStats() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { applications: 0, offers: 0, reminders: 0 };

  const [applications, reminders] = await Promise.all([
    prisma.application.count({ where: { userId: session.user.id } }),
    prisma.reminder.count({ where: { userId: session.user.id, isCompleted: false } }),
  ]);

  const offers = await prisma.application.count({
    where: { userId: session.user.id, status: "OFFER" },
  });

  return { applications, offers, reminders };
}
