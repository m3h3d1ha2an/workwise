import type z from "zod";
import { db } from "~/server/db";
import type { AuthValidators } from "./auth.validator";

const createUser = async (
  payload: z.Infer<typeof AuthValidators.SignupSchema>["body"],
) => {
  const result = await db.user.create({ data: payload });
  console.log(result);
};

export const AuthServices = { createUser };
