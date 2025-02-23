import { Response, NextFunction, RequestHandler, Request } from "express";
import { ZodTypeAny, z } from "zod";
import { CustomError, ValidationError } from "./errors";
import { writeErrorResponse, writeValidationErrorResponse } from "./response";

type ValidateField = "body" | "params" | "query";

export const validateRequest = (fields: {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Object.entries(fields).forEach(([field, schema]) => validateSchema(schema, field as ValidateField, req, next));
    next();
  };
};

const validateSchema = (schema: z.ZodTypeAny, field: ValidateField, req: Request, next: NextFunction) => {
  const validationResult = schema.safeParse(req[field]);
  if (!validationResult.success) {
    const validationError = {
      field,
      errors: validationResult.error.errors.map((error) => ({
        field: error.path[0] as string,
        error: error.message,
      })),
    };
    return next(new ValidationError(validationError));
  }

  req[field] = validationResult.data;
};

export const errorHandler = (error: CustomError | ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ValidationError) return writeValidationErrorResponse(res, error);
  return writeErrorResponse(res, error);
};
