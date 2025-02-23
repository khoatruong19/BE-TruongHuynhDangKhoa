import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { logger } from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: "1.0.0",
    },
  },
  apis: ["./src/utils/server.ts", "./src/**/*.router.ts", "./src/**/*.schema.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info("docs available at http://localhost:%d/v1/docs", port);
}
