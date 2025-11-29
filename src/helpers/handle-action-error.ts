import { ZodError } from "zod";
import { Prisma } from "~/prisma/client";
import { ApiError } from "./api-error";
import { ExtractErrorMessage } from "./extract-error-message";
import { HandlePrismaError } from "./handle-prisma-error";

const isRedirectError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  const digest = (error as Record<string, unknown>).digest;
  return typeof digest === "string" && digest.startsWith("NEXT_REDIRECT");
};

export const HandleActionError = (
  error: unknown
): { success: false; message: string; data: unknown } => {
  // Let Next.js redirects pass through
  if (isRedirectError(error)) {
    throw error;
  }

  let message = "Something went wrong";

  if (error instanceof ApiError) {
    message = error.message;
  } else if (error instanceof ZodError) {
    message = error.issues[0]?.message || "Validation failed";
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = HandlePrismaError(error).message;
  } else {
    message = ExtractErrorMessage(error);
  }

  return { success: false, message, data: error };
};
