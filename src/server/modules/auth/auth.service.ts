import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { db } from "~/server/db";
import { ApiError } from "~/utils/api-error";
import { HttpStatus } from "~/utils/http-status";
import { parseExpiresIn } from "./auth.utility";
import type { Signin, Signup } from "./auth.validator";

const CreateUser = async (payload: Signup) => {
  const { name, email, password } = payload;
  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    throw new ApiError(
      HttpStatus.CONFLICT,
      "User with this email already exists",
    );
  }
  const hashed = await bcrypt.hash(password, 12);
  const created = await db.user.create({
    data: { name, email, password: hashed },
  });
  const access_token = jwt.sign(
    { sub: created.id },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN, algorithm: "HS256" },
  );
  const { expires: access_token_expires, maxAge: access_token_max_age } =
    parseExpiresIn(env.ACCESS_TOKEN_EXPIRES_IN);
  const refresh_token = jwt.sign(
    { sub: created.id },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN, algorithm: "HS512"  },
  );
  const { expires: refresh_token_expires, maxAge: refresh_token_max_age } =
    parseExpiresIn(env.REFRESH_TOKEN_EXPIRES_IN);

  return {
    access_token,
    access_token_expires,
    access_token_max_age,
    refresh_token,
    refresh_token_expires,
    refresh_token_max_age,
  };
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
  const access_token = jwt.sign({ sub: user.id }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN, algorithm: "HS256"
  });
  const { expires: access_token_expires, maxAge: access_token_max_age } =
    parseExpiresIn(env.ACCESS_TOKEN_EXPIRES_IN);
  const refresh_token = jwt.sign(
    { sub: user.id },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN, algorithm: "HS512" },
  );
  const { expires: refresh_token_expires, maxAge: refresh_token_max_age } =
    parseExpiresIn(env.REFRESH_TOKEN_EXPIRES_IN);

  return {
    access_token,
    access_token_expires,
    access_token_max_age,
    refresh_token,
    refresh_token_expires,
    refresh_token_max_age,
  };
};

const GenerateNewTokens = async (payload: string) => {
  const decoded = jwt.verify(payload, env.REFRESH_TOKEN_SECRET, { algorithms: ["HS512"] })
  if(typeof decoded === "string"){
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid refresh token payload structure.");
  }
  const access_token = jwt.sign({ sub: decoded.sub }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN, algorithm: "HS256"
  });
  const { expires: access_token_expires, maxAge: access_token_max_age } =
    parseExpiresIn(env.ACCESS_TOKEN_EXPIRES_IN);
  const refresh_token = jwt.sign(
    { sub: decoded.sub },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN, algorithm: "HS512" },
  );
  const { expires: refresh_token_expires, maxAge: refresh_token_max_age } =
    parseExpiresIn(env.REFRESH_TOKEN_EXPIRES_IN);
  return {
    access_token,
    access_token_expires,
    access_token_max_age,
    refresh_token,
    refresh_token_expires,
    refresh_token_max_age,
  };
};

export const AuthServices = { CreateUser, CheckUser, GenerateNewTokens };
