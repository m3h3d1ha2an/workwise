import { cookies } from "next/headers";
import { env } from "~/env";
import { HttpStatus } from "~/utils/http-status";
import { SendResponse } from "~/utils/send-response";
import { TryCatchAsync } from "~/utils/try-catch-async";
import { AuthServices } from "./auth.service";
import { AuthValidators } from "./auth.validator";
import { ApiError } from "~/utils/api-error";

const Signup = TryCatchAsync(async (request: Request) => {
  const payload = await request.json();
  const parsed = await AuthValidators.SignupSchema.parseAsync(payload);
  const result = await AuthServices.CreateUser(parsed);
  const cookie_store = await cookies();
  cookie_store.set("access_token", result.access_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.access_token_expires,
    maxAge: result.access_token_max_age,
  });
  cookie_store.set("refresh_token", result.refresh_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.refresh_token_expires,
    maxAge: result.refresh_token_max_age,
  });
  return SendResponse(HttpStatus.CREATED, {
    success: true,
    message: "Signed up successfully.",
  });
});

const Signin = TryCatchAsync(async (request: Request) => {
  const payload = await request.json();
  const parsed = await AuthValidators.SigninSchema.parseAsync(payload);
  const result = await AuthServices.CheckUser(parsed);
  const cookie_store = await cookies();
  cookie_store.set("access_token", result.access_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.access_token_expires,
    maxAge: result.access_token_max_age,
  });
  cookie_store.set("refresh_token", result.refresh_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.refresh_token_expires,
    maxAge: result.refresh_token_max_age,
  });
  return SendResponse(HttpStatus.ACCEPTED, {
    success: true,
    message: "Signed in successfully.",
  });
});

const Signout = TryCatchAsync(async (_request: Request) => {
  const cookie_store = await cookies();
  cookie_store.delete("access_token");
  cookie_store.delete("refresh_token");

  return SendResponse(HttpStatus.OK, {
    success: true,
    message: "Signed out successfully.",
  });
});

const Refresh = TryCatchAsync(async (_request: Request) => {
  const cookie_store = await cookies();
  const refresh_token = cookie_store.get("refresh_token")?.value;
  if(!refresh_token){
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Refresh token not found.");
  }
  const parsed = await AuthValidators.RefreshTokenSchema.parseAsync(refresh_token)
  const result = await AuthServices.GenerateNewTokens(parsed)
  cookie_store.set("access_token", result.access_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.access_token_expires,
    maxAge: result.access_token_max_age,
  });
  cookie_store.set("refresh_token", result.refresh_token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: result.refresh_token_expires,
    maxAge: result.refresh_token_max_age,
  });
  return SendResponse(HttpStatus.ACCEPTED, {
    success: true,
    message: "Tokens refreshed successfully.",
  });
});

export const AuthControllers = {
  Signup,
  Signin,
  Signout,
  Refresh,
};
