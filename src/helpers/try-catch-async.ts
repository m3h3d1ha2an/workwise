import type { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { Prisma } from "~/prisma/client";
import { ApiError } from "~/utils/api-error";
import { HttpStatus } from "~/utils/http-status";
import { SendResponse } from "~/utils/send-response";
import { handlePrismaError } from "./handle-prisma-error";

const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    return { status: error.statusCode, message: error.message };
  }
  if (error instanceof ZodError) {
    return { status: HttpStatus.BAD_REQUEST, message: z.prettifyError(error) };
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong!",
  };
};

type RouteContext<TParams = Record<string, string | string[] | undefined>> = {
  params: TParams;
};

type RouteHandler<TParams> = (
  request: NextRequest,
  context: RouteContext<TParams>
) => Promise<NextResponse>;

export const TryCatchAsync =
  <TParams>(handler: RouteHandler<TParams>): RouteHandler<TParams> =>
  async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("Error in route handler:", error);
      const { status, message } = handleError(error);
      return SendResponse(status, { message, success: false });
    }
  };
