import z from "zod";

const SignupSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }),
  email: z.email({ error: "Email is required" }),
  password: z.string().trim().min(1, { error: "Password is required" }),
});

const SigninSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string().trim().min(1, { error: "Password is required" }),
})

const RefreshTokenSchema = z.jwt({ alg: "HS512" })

export type Signup = z.Infer<typeof SignupSchema>
export type Signin = z.Infer<typeof SigninSchema>

export const AuthValidators = { SignupSchema, SigninSchema, RefreshTokenSchema };
