export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    statusCode: number,
    message?: string,
    isOperational = true,
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // This check is important for the stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else if (stack) {
      this.stack = stack;
    }
  }
}
