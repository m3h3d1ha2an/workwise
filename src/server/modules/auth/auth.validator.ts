import z from "zod";

const SignupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { error: "Name is required" }),
    email: z.email({ error: "Email is required" }),
    password: z.string().trim().min(1, { error: "Password is required" }),
  }),
});

export const AuthValidators = { SignupSchema };
