import express from "express";
import helmet from "helmet";
import { DB } from "@/store/db/setup";
import { usersRouter } from "@/modules/users/users.router";
import { errorHandler } from "./middlewares";
import { setDB } from "@/store/index";

export async function buildServer({ db }: { db: DB }) {
  setDB(db);

  const app = express();

  app.use(helmet());
  app.use(express.json());

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req, res) => {
    res.send("OK!");
  });

  app.use("/v1/users", usersRouter);

  app.use(errorHandler);

  return app;
}
