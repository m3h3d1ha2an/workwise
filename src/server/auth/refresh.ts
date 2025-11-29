import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { JwtToken } from "~/helpers/jwt-token";
import { ClearCookies, SetCookies } from "./cookies";

const validateRefreshToken = (refreshToken: string) => {
  const parsed = z.jwt({ alg: "HS512" }).safeParse(refreshToken);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const decoded = JwtToken.Verify("refresh", refreshToken);
  if (!decoded.success) {
    throw new Error(decoded.payload);
  }

  if (!decoded.payload.userId) {
    throw new Error("Token missing userId claim");
  }

  return decoded.payload.userId;
};

export const HandleTokenRefresh = (
  request: NextRequest,
  isAuthPage: boolean,
  refreshToken: string
) => {
  try {
    const userId = validateRefreshToken(refreshToken);
    const response = NextResponse.next();
    SetCookies(userId, response.cookies);

    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  } catch (error) {
    console.error("Token refresh failed in proxy (ex middleware):", error);
    if (!isAuthPage) {
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url)
      );
      ClearCookies(response.cookies);
      return response;
    }

    const response = NextResponse.next();
    ClearCookies(response.cookies);
    return response;
  }
};
