"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/server/better-auth/client";

export const SignUpForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const { data, error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      toast.error(error.message);
      console.error(error);
    } else {
      toast.success("Signed up successfull.");
      console.table(data);
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSignup}>
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
              Already have an account? <Link href="/auth/sign-in">Sign in</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required />
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              {isLoading && <Loader className="size-4 animate-spin" />}
              Create Account
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking create account, you agree to our <Link href="/terms-of-service">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};
