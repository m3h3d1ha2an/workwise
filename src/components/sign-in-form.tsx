"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signinAction } from "~/server/auth/signin";

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(
    signinAction,
    undefined
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {/* Global Error Message */}
          {state?.success === false &&
            state.error &&
            !state.error.includes("{") && (
              <div className="rounded-md bg-destructive/15 p-3 text-destructive text-sm">
                {state.error}
              </div>
            )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isPending}
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              disabled={isPending}
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/auth/signup"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
