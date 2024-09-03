"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/core/components/ui/button";

export const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/auth", redirect: true })}
      variant={"outline"}
      className={"w-full"}
    >
      Logout
    </Button>
  );
};
