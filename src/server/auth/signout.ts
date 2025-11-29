"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClearCookies } from "./cookies";

/**
 * Sign out the current user
 */
export const signoutAction = async (): Promise<void> => {
  ClearCookies(await cookies());
  redirect("/auth/signin");
};
