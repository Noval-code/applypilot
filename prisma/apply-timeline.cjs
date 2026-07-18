const pg = require("pg");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS "ApplicationTimeline" (
      id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "applicationId" TEXT NOT NULL REFERENCES "Application"(id) ON DELETE CASCADE,
      "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      "eventType" TEXT NOT NULL,
      "fromStatus" TEXT,
      "toStatus" TEXT,
      description TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_timeline_app_id ON "ApplicationTimeline"("applicationId", "createdAt");
    CREATE INDEX IF NOT EXISTS idx_timeline_user_id ON "ApplicationTimeline"("userId", "createdAt");
  `);
  console.log("done");
  client.release();
  await pool.end();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
