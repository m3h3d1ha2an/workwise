"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ============================================================================
// Server Action
// ============================================================================

/**
 * Sign out the current user
 *
 * Clears authentication cookies and redirects to the sign-in page.
 */
export const signoutAction = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/auth/signin");
};
