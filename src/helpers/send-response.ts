import { NextResponse } from "next/server";
import type { HttpStatusValue } from "./http-status";

export type ApiMeta = { page: number; limit: number; total: number };
export type ApiResponse<Data> = {
  success: boolean;
  message: string;
  meta?: ApiMeta | null;
  data?: Data | null;
};

/**
 * Helper function to create a standardized NextResponse.json response.
 * This is the unified function to send both success and error responses,
 * by directly consuming an ApiResponse object.
 *
 * @param response - The complete ApiResponse object representing the body content of the response.
 * @param status - The HTTP status code for the response.
 * @returns A NextResponse object ready to be returned from your route handler.
 */
export const SendResponse = <Data>(
  status: HttpStatusValue | number,
  response: ApiResponse<Data>
) => {
  const body: ApiResponse<Data> = {
    data: response.data ?? null,
    message: response.message,
    meta: response.meta ?? null,
    success: response.success,
  };

  return NextResponse.json(body, { status });
};
