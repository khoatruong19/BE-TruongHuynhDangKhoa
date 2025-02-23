import { NextFunction, Request, RequestHandler, Response } from "express";
import { InternalServerError } from "./errors";
import { logger } from "./logger";

export const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const throwDatabaseError = (err: unknown, logMsg: string) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  logger.error({ message }, logMsg);
  throw new InternalServerError(message);
};
