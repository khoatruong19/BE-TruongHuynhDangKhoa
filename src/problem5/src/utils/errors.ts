import { ReasonPhrases, StatusCodes } from "http-status-codes";

class CustomError extends Error {
  status: StatusCodes;

  constructor(message: string, status: StatusCodes) {
    super(message);
    this.status = status;
  }
}

class ConflictError extends CustomError {
  constructor(message: string = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
    super(message, statusCode);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class NotFoundError extends CustomError {
  constructor(message: string = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}

type FieldError = {
  field: string;
  error: string;
};

export type ValidationErrors = {
  field: string;
  errors: FieldError[];
};

class ValidationError extends CustomError {
  errors: ValidationErrors;
  constructor(errors: ValidationErrors) {
    super(`${errors.field} validation failed!`, StatusCodes.BAD_REQUEST);
    this.errors = errors;
  }
}

export {
  CustomError,
  ConflictError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  ValidationError,
};
