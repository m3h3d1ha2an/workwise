import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/better-auth";

export const proxy = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/auth");

  // If user is authenticated and trying to access an /auth page, redirect to home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and trying to access a non-/auth page, redirect to sign-in
  // This condition should NOT apply if the path is already an /auth page
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Otherwise, continue to the requested page
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * This matcher applies the middleware to all request paths EXCEPT for the ones
     * explicitly listed within the negative lookahead `(?!...)`.
     *
     * - `api`: Excludes all API routes (e.g., /api/auth, /api/your-data).
     * - `_next/static`: Excludes Next.js static assets (JS, CSS, images bundled by Next.js).
     * - `_next/image`: Excludes Next.js image optimization files.
     * - `favicon.ico`: Excludes the favicon.
     * - `sitemap.xml`: Excludes the sitemap file (whether static or dynamically generated).
     * - `robots.txt`: Excludes the robots.txt file (whether static or dynamically generated).
     * - `privacy-policy`: Excludes the /privacy-policy page.
     * - `terms-of-service`: Excludes the /terms-of-service page.
     * - `icon.svg`: Excludes the specific icon.svg file.
     * - `.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|map)$`: Excludes common image, style, script, and map files.
     *
     * The middleware *will* apply to paths starting with `/auth` (e.g., /auth/sign-in, /auth/sign-up)
     * to enable the redirect logic for logged-in users trying to access these pages.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|privacy-policy|terms-of-service|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|map)$).*)",
  ],
};
