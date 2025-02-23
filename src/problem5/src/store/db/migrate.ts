import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "@/utils/config";
import { setupDB, teardownDB } from "./setup";

async function run() {
  try {
    const { db, client } = await setupDB(config.DATABASE_URL);
    await migrate(db, { migrationsFolder: "./migrations" });
    await teardownDB(client);
    console.log("migrated successfully");
  } catch (error) {
    console.log("failed to run migrations: ", error);
  }

  process.exit(0);
}

run();
