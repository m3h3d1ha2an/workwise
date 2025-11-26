import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const publicPrefixes = ["/auth"];

  if (publicPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    if (!pathname.startsWith("/auth/signin")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    return NextResponse.next();
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
