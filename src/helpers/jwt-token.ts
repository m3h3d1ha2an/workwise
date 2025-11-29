import type { Algorithm, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { ExtractErrorMessage } from "./extract-error-message";

export type JwtTokenPayload = JwtPayload & { userId?: string };
type VerifySuccess = { success: true; result: JwtTokenPayload };
type VerifyFailure = { success: false; result: string };
type VerifyResponse = VerifySuccess | VerifyFailure;

const Generate = (type: "access" | "refresh", payload: JwtTokenPayload) => {
  const secret =
    type === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  const expiresIn =
    type === "refresh"
      ? env.REFRESH_TOKEN_EXPIRES_IN
      : env.ACCESS_TOKEN_EXPIRES_IN;
  const algorithm = type === "access" ? "HS256" : "HS512";
  return jwt.sign(payload, secret, { algorithm, expiresIn });
};

const Verify = (type: "access" | "refresh", token: string): VerifyResponse => {
  const secret =
    type === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  const algorithm: Algorithm = type === "access" ? "HS256" : "HS512";
  try {
    const decoded = jwt.verify(token, secret, { algorithms: [algorithm] });
    if (typeof decoded === "string") {
      return { result: "Invalid token payload structure", success: false };
    }
    return { result: decoded, success: true };
  } catch (error) {
    return { result: ExtractErrorMessage(error), success: false };
  }
};

export const JwtToken = { Generate, Verify };
