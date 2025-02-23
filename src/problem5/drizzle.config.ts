import { defineConfig } from "drizzle-kit";
import { config } from "./src/utils/config";

export default defineConfig({
  schema: "./src/store/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL ?? "",
  },
});
