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
import { signupAction } from "~/server/auth/signup";

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    undefined
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started with WorkWise.
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
            <Label htmlFor="name">Full Name</Label>
            <Input
              disabled={isPending}
              id="name"
              name="name"
              placeholder="John Doe"
              required
              type="text"
            />
          </div>

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
            <Label htmlFor="password">Password</Label>
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
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
          <div className="text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/auth/signin"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
