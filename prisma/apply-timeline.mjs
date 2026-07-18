import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ApplicationTimeline" (
      id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
      applicationId TEXT NOT NULL REFERENCES "Application"(id) ON DELETE CASCADE,
      userId TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      eventType TEXT NOT NULL,
      fromStatus TEXT,
      toStatus TEXT,
      description TEXT,
      createdAt TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_timeline_app_id ON "ApplicationTimeline"(applicationId, createdAt);
    CREATE INDEX IF NOT EXISTS idx_timeline_user_id ON "ApplicationTimeline"(userId, createdAt);
  `);
  console.log("ApplicationTimeline table created");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
