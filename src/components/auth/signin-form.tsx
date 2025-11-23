"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/server/better-auth/client";

export const SignInForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      toast.error(error.message);
      console.error(error);
    } else {
      toast.success("Signed in successfull");
      console.table(data);
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSignin}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image src="/icon.svg" width={50} height={50} alt="workwise-logo" />
              </div>
              <span className="sr-only">WorkWise</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to WorkWise</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required />
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading && <Loader className="size-4 animate-spin" />}
              Sign in
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
