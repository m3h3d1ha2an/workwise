import type { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { env } from "~/env";
import { JwtToken } from "~/helpers/jwt-token";

type CookieDuration = {
  maxAge: number;
  expires: Date;
};

const DURATION_REGEX = /(-?\d*\.?\d+)\s*([a-zA-Z]+)/;

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;
const MS_IN_WEEK = 7 * MS_IN_DAY;
const MS_IN_YEAR = 365 * MS_IN_DAY;

/**
 * Parse duration string (e.g., "15m", "7d") to milliseconds and Date
 */
const ParseExpiresIn = (value: string): CookieDuration => {
  const match = value.trim().match(DURATION_REGEX);
  if (!match) {
    throw new Error("Invalid expiresIn format");
  }

  const [, numericPart, unitPart] = match;
  if (numericPart === undefined || unitPart === undefined) {
    throw new Error("Invalid expiresIn format: failed to parse components");
  }

  const numericValue = Number.parseFloat(numericPart);
  const unit = unitPart.toLowerCase();
  let ms: number;

  switch (unit) {
    case "y":
    case "yr":
    case "year":
    case "years":
      ms = numericValue * MS_IN_YEAR;
      break;
    case "w":
    case "wk":
    case "week":
    case "weeks":
      ms = numericValue * MS_IN_WEEK;
      break;
    case "d":
    case "day":
    case "days":
      ms = numericValue * MS_IN_DAY;
      break;
    case "h":
    case "hr":
    case "hour":
    case "hours":
      ms = numericValue * MS_IN_HOUR;
      break;
    case "m":
    case "min":
    case "minute":
    case "minutes":
      ms = numericValue * MS_IN_MINUTE;
      break;
    case "s":
    case "sec":
    case "second":
    case "seconds":
      ms = numericValue * MS_IN_SECOND;
      break;
    case "ms":
    case "millisecond":
    case "milliseconds":
      ms = numericValue;
      break;
    default:
      throw new Error(`Unsupported unit in expiresIn: ${unit}`);
  }

  return {
    expires: new Date(Date.now() + ms),
    maxAge: Math.floor(ms / 1000),
  };
};

/**
 * Token cookie names
 */
export const TOKEN_COOKIES = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
} as const;

type CookieStore =
  | NextResponse["cookies"]
  | Awaited<ReturnType<typeof cookies>>;

/**
 * Set both access and refresh auth cookies
 */
export const SetCookies = (userId: string, cookieStore: CookieStore) => {
  const accessToken = JwtToken.Generate("access", { userId });
  const accessMeta = ParseExpiresIn(env.ACCESS_TOKEN_EXPIRES_IN);

  const refreshToken = JwtToken.Generate("refresh", { userId });
  const refreshMeta = ParseExpiresIn(env.REFRESH_TOKEN_EXPIRES_IN);

  cookieStore.set(TOKEN_COOKIES.ACCESS, accessToken, {
    expires: accessMeta.expires,
    httpOnly: true,
    maxAge: accessMeta.maxAge,
    path: "/",
    sameSite: "strict" as const,
    secure: env.NODE_ENV === "production",
  });
  cookieStore.set(TOKEN_COOKIES.REFRESH, refreshToken, {
    expires: refreshMeta.expires,
    httpOnly: true,
    maxAge: refreshMeta.maxAge,
    path: "/",
    sameSite: "strict" as const,
    secure: env.NODE_ENV === "production",
  });
};

/**
 * Clear both access and refresh auth cookies
 */
export const ClearCookies = (cookieStore: CookieStore) => {
  cookieStore.delete(TOKEN_COOKIES.ACCESS);
  cookieStore.delete(TOKEN_COOKIES.REFRESH);
};
