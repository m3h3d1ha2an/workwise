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

const SignupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z.string().trim().min(1, { message: "Name is required" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignupInput = z.infer<typeof SignupSchema>;

// ============================================================================
// Business Logic
// ============================================================================

const createUser = async (data: SignupInput) => {
  const { name, email, password } = data;

  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user in database
  const user = await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  // Generate JWT tokens
  return GenerateTokens(user.id);
};

// ============================================================================
// Server Action
// ============================================================================

/**
 * Sign up a new user account
 *
 * Creates a new user, generates authentication tokens, sets cookies,
 * revalidates the cache, and redirects to the dashboard.
 *
 * @param input - User registration data (email, name, password)
 * @returns Error result if failed (success redirects)
 */
export const signupAction = async (
  _prevState: ActionResult<void> | undefined,
  formData: FormData
): Promise<ActionResult<void>> => {
  try {
    const input: SignupInput = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    const validated = SignupSchema.parse(input);

    // Create user and generate tokens
    const { access, refresh } = await createUser(validated);

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
