//TODO: WORK IN PROGRESS

import type { NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { Prisma } from "~/prisma/client";
import { ApiError } from "~/utils/api-error";
import { HttpStatus } from "~/utils/http-status";
import { SendResponse } from "~/utils/send-response";

export type RouteContext<TParams = { [key: string]: string | string[] }> = {
  params: Promise<TParams>;
};

export type RouteHandler = <TParams>(
  request: Request,
  context?: RouteContext<TParams>,
) => Promise<NextResponse>;
// const searchParams = request.nextUrl.searchParams
// const query = searchParams.get('query')

export const TryCatchAsync = (handler: RouteHandler) => {
  return async (request: Request): Promise<NextResponse<unknown>> => {
    try {
      return await handler(request);
    } catch (error) {
      console.error("Error in route handler:", error);
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = "Something went wrong!";
      if (error instanceof ApiError) {
        status = error.statusCode;
        message = error.message;
      } else if (error instanceof ZodError) {
        status = HttpStatus.BAD_REQUEST;
        message = z.prettifyError(error);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            status = HttpStatus.CONFLICT;
            message = `A record with this ${error.meta?.target} already exists.`;
            break;
          case "P2003":
            status = HttpStatus.BAD_REQUEST;
            message = `The related record for "${error.meta?.field_name}" does not exist.`;
            break;
          case "P2005":
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = `Invalid data found for "${error.meta?.field_name}". Please contact support.`;
            break;
          case "P2006":
            status = HttpStatus.BAD_REQUEST;
            message = `The value provided is not valid for "${error.meta?.field_name}".`;
            break;
          case "P2025":
            status = HttpStatus.NOT_FOUND;
            message = `${error.meta?.modelName || "Record"} doesn't exist.`;
            break;
          default:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Database operation failed.";
            break;
        }
      }
      return SendResponse(status, { success: false, message });
    }
  };
};
