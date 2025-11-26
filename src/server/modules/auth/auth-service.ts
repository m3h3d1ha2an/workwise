import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { ApiError } from "~/utils/api-error";
import { HttpStatus } from "~/utils/http-status";
import { JwtToken } from "~/utils/jwt-token";
import { GenerateTokens } from "./auth-utility";
import type { Signin, Signup } from "./auth-validator";

const CreateUser = async (payload: Signup) => {
  const { name, email, password } = payload;
  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    throw new ApiError(
      HttpStatus.CONFLICT,
      "User with this email already exists"
    );
  }
  const hashed = await bcrypt.hash(password, 12);
  const created = await db.user.create({
    data: { email, name, password: hashed },
  });
  return GenerateTokens(created.id);
};

const CheckUser = async (payload: Signin) => {
  const { email, password } = payload;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(HttpStatus.BAD_REQUEST, "Incorrect email or password");
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new ApiError(HttpStatus.BAD_REQUEST, "Incorrect email or password");
  }
  return GenerateTokens(user.id);
};

const RefreshTokens = (payload: string) => {
  const decoded = JwtToken.Verify("refresh", payload);
  if (!decoded.success) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, decoded.result);
  }
  if (!decoded.result.userId) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Token missing userId claim");
  }
  return GenerateTokens(decoded.result.userId);
};

export const AuthServices = { CheckUser, CreateUser, RefreshTokens };
