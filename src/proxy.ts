import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TOKEN_COOKIES } from "./server/auth/cookies";
import { HandleTokenRefresh } from "./server/auth/refresh";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};

export const proxy = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");

  const accessToken = request.cookies.get(TOKEN_COOKIES.ACCESS)?.value;
  const refreshToken = request.cookies.get(TOKEN_COOKIES.REFRESH)?.value;

  // Case 1: User has both tokens
  if (accessToken && refreshToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Case 2: User has only refresh token
  if (refreshToken) {
    return HandleTokenRefresh(request, isAuthPage, refreshToken);
  }

  // Case 3: User has no valid tokens
  if (!isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
};
