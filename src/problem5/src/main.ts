import { config } from "@/utils/config";
import { logger } from "@/utils/logger";
import { buildServer } from "@/utils/server";
import { ping, setupDB } from "src/store/db/setup";
import { swaggerDocs } from "./utils/swagger";

const { PORT, HOST } = config;

async function main() {
  try {
    const { db } = await setupDB(config.DATABASE_URL);
    await ping(db);

    logger.info("database connected");

    const server = await buildServer({
      db,
    });

    swaggerDocs(server, PORT);

    server.listen({ port: PORT, host: HOST }, function (err) {
      if (err) logger.error("error in server listening!");
      logger.info("server listening on port: %d", PORT);
    });
  } catch (e) {
    logger.error(e, "failed to connect to database!");
    process.exit(1);
  }
}

main();
