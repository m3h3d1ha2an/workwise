"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { safeAction } from "~/lib/safe-action";
import { db } from "~/server/db";
import { SetCookies } from "./cookies";

const SignupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z.string().trim().min(1, { message: "Name is required" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignupInput = z.infer<typeof SignupSchema>;

/**
 * Sign up a new user account
 */
export const signupAction = safeAction(SignupSchema, async (data) => {
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

  SetCookies(user.id, await cookies());

  redirect("/");
});
