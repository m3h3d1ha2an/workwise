"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import logo from "~/app/icon.png";
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
      <CardHeader className="text-center">
        <Image
          alt="Logo"
          className="mx-auto"
          height={50}
          src={logo}
          width={50}
        />
        <CardTitle className="font-bold text-3xl text-foreground tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="mt-2 text-base text-muted-foreground">
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {/* Global Error Message */}
          {state?.success === false &&
            state.message &&
            !state.message.includes("{") && (
              <div className="rounded-md bg-destructive/15 p-3 text-destructive text-sm">
                {state.message}
              </div>
            )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isPending}
              id="email"
              name="email"
              placeholder="you@example.com"
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
              placeholder="••••••••"
              required
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex flex-col space-y-4">
          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              "Sign In"
            )}
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
