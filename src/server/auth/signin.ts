"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { HandleActionError } from "~/helpers/handle-action-error";
import { db } from "~/server/db";
import { type ActionResult, GenerateTokens, SetAuthCookies } from "./shared";

// ============================================================================
// Validation Schema
// ============================================================================

const SigninSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SigninInput = z.infer<typeof SigninSchema>;

// ============================================================================
// Business Logic
// ============================================================================

const authenticateUser = async (data: SigninInput) => {
  const { email, password } = data;

  // Check if user exists
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT tokens
  return GenerateTokens(user.id);
};

// ============================================================================
// Server Action
// ============================================================================

/**
 * Sign in an existing user
 *
 * Authenticates the user, generates tokens, sets cookies,
 * revalidates the cache, and redirects to the dashboard.
 *
 * @param input - User credentials (email, password)
 * @returns Error result if failed (success redirects)
 */
export const signinAction = async (
  _prevState: ActionResult<void> | undefined,
  formData: FormData
): Promise<ActionResult<void>> => {
  try {
    const input: SigninInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    const validated = SigninSchema.parse(input);

    // Authenticate user and generate tokens
    const { access, refresh } = await authenticateUser(validated);

    // Set authentication cookies
    const cookieStore = await cookies();
    SetAuthCookies(cookieStore, access, refresh);

    // Revalidate cache and redirect
    revalidatePath("/");
    redirect("/dashboard");
  } catch (error) {
    return HandleActionError(error);
  }
};
