import { cookies } from "next/headers";
import { ApiError } from "~/utils/api-error";
import { HttpStatus } from "~/utils/http-status";
import { SendResponse } from "~/utils/send-response";
import { TryCatchAsync } from "~/utils/try-catch-async";
import { AuthServices } from "./auth-service";
import { setAuthCookies } from "./auth-utility";
import { AuthValidators } from "./auth-validator";

const Signup = TryCatchAsync(async (request: Request) => {
  const payload = await request.json();
  const parsed = await AuthValidators.SignupSchema.parseAsync(payload);
  const { access, refresh } = await AuthServices.CreateUser(parsed);
  const cookieStore = await cookies();
  setAuthCookies(cookieStore, access, refresh);
  return SendResponse(HttpStatus.CREATED, {
    message: "Signed up successfully.",
    success: true,
  });
});

const Signin = TryCatchAsync(async (request: Request) => {
  const payload = await request.json();
  const parsed = await AuthValidators.SigninSchema.parseAsync(payload);
  const { access, refresh } = await AuthServices.CheckUser(parsed);
  const cookieStore = await cookies();
  setAuthCookies(cookieStore, access, refresh);
  return SendResponse(HttpStatus.ACCEPTED, {
    message: "Signed in successfully.",
    success: true,
  });
});

const Signout = TryCatchAsync(async (_request: Request) => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return SendResponse(HttpStatus.OK, {
    message: "Signed out successfully.",
    success: true,
  });
});

const Refresh = TryCatchAsync(async (_request: Request) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Refresh token not found.");
  }
  const parsed =
    await AuthValidators.RefreshTokenSchema.parseAsync(refreshToken);
  const { access, refresh } = await AuthServices.RefreshTokens(parsed);
  setAuthCookies(cookieStore, access, refresh);
  return SendResponse(HttpStatus.ACCEPTED, {
    message: "Tokens refreshed successfully.",
    success: true,
  });
});

export const AuthControllers = {
  Refresh,
  Signin,
  Signout,
  Signup,
};
