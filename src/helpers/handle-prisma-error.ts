import type { Prisma } from "~/prisma/client";
import { HttpStatus } from "./http-status";

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  switch (error.code) {
    case "P2002":
      return {
        status: HttpStatus.CONFLICT,
        message: `A record with this ${error.meta?.target} already exists.`,
      };
    case "P2003":
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `The related record for "${error.meta?.field_name}" does not exist.`,
      };
    case "P2005":
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Invalid data found for "${error.meta?.field_name}". Please contact support.`,
      };
    case "P2006":
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `The value provided is not valid for "${error.meta?.field_name}".`,
      };
    case "P2025":
      return {
        status: HttpStatus.NOT_FOUND,
        message: `${error.meta?.modelName || "Record"} doesn't exist.`,
      };
    default:
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Database operation failed.",
      };
  }
};
