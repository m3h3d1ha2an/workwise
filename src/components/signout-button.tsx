"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { signoutAction } from "~/server/auth/signout";
import { Button } from "./ui/button";

export const Signout = () => {
  const [isPending, startTransition] = useTransition();
  const handleSignout = () => {
    startTransition(async () => {
      await signoutAction();
    });
  };
  return (
    <Button
      className="cursor-pointer"
      disabled={isPending}
      onClick={handleSignout}
    >
      <LogOut />
      {isPending ? "Signing Out..." : "Sign Out"}
    </Button>
  );
};
