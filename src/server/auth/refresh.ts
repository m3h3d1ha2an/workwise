"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";
import { HandleActionError } from "~/helpers/handle-action-error";
import { JwtToken } from "~/helpers/jwt-token";
import { type ActionResult, GenerateTokens, SetAuthCookies } from "./shared";

// ============================================================================
// Validation Schema
// ============================================================================

const RefreshTokenSchema = z.string().refine(
  (token) => {
    const result = JwtToken.Verify("refresh", token);
    return result.success;
  },
  { message: "Invalid refresh token" }
);

// ============================================================================
// Business Logic
// ============================================================================

const refreshUserTokens = (refreshToken: string) => {
  // Verify refresh token
  const decoded = JwtToken.Verify("refresh", refreshToken);
  if (!decoded.success) {
    throw new Error(decoded.result);
  }

  if (!decoded.result.userId) {
    throw new Error("Token missing userId claim");
  }

  // Generate new tokens
  return GenerateTokens(decoded.result.userId);
};

// ============================================================================
// Server Action
// ============================================================================

/**
 * Refresh the user's access token
 *
 * Reads the refresh token from cookies, validates it, generates new tokens,
 * sets cookies, and revalidates the cache.
 *
 * @returns Success result with message or error
 */
export const refreshAction = async (): Promise<ActionResult<void>> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return {
        success: false,
        error: "Refresh token not found.",
      };
    }

    // Validate refresh token
    RefreshTokenSchema.parse(refreshToken);

    // Generate new tokens
    const { access, refresh } = refreshUserTokens(refreshToken);

    // Set new authentication cookies
    SetAuthCookies(cookieStore, access, refresh);

    // Revalidate cache
    revalidatePath("/");

    return {
      success: true,
      message: "Tokens refreshed successfully.",
    };
  } catch (error) {
    return HandleActionError(error);
  }
};
