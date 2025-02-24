import { Response } from "express";
import { CustomError, ValidationError, ValidationErrors } from "./errors";
import { StatusCodes } from "http-status-codes";
import { isDev } from "./config";

interface BaseResponse {
  status: "error" | "success";
  code: number;
  message?: string;
}

export interface ErrorResponse extends BaseResponse {
  status: "error";
  stack?: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  errors: ValidationErrors["errors"];
}

export interface SuccessResponse<T extends Record<string, any>> extends BaseResponse {
  status: "success";
  data?: T;
}

export function writeErrorResponse(res: Response, err: CustomError) {
  const errorResponse: ErrorResponse = {
    status: "error",
    code: err.status,
    message: err.message,
    stack: isDev ? err.stack : undefined,
  };
  res.status(err.status).send(errorResponse);
}

export function writeValidationErrorResponse(res: Response, err: ValidationError) {
  const errorResponse: ValidationErrorResponse = {
    status: "error",
    code: StatusCodes.BAD_REQUEST,
    message: err.message,
    errors: err.errors.errors,
    stack: isDev ? err.stack : undefined,
  };
  res.status(StatusCodes.BAD_REQUEST).send(errorResponse);
}

type SuccessResponsePayload<T extends Record<string, any>> = Pick<SuccessResponse<T>, "code" | "message"> & {
  data?: T;
};

export function writeSuccessResponse<T extends Record<string, any>>(res: Response, payload: SuccessResponsePayload<T>) {
  const successResponse: SuccessResponse<T> = {
    status: "success",
    code: payload.code,
    message: payload.message,
    data: payload.data,
  };
  res.status(payload.code).send(successResponse);
}
