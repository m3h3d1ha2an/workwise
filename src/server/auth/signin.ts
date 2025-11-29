"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { safeAction } from "~/lib/safe-action";
import { db } from "~/server/db";
import { SetCookies } from "./cookies";

const SigninSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SigninInput = z.infer<typeof SigninSchema>;

/**
 * Sign in an existing user
 */
export const signinAction = safeAction(SigninSchema, async (data) => {
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

  SetCookies(user.id, await cookies());

  redirect("/");
});
