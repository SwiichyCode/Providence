"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/core/components/ui/button";

export const LogoutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth", redirect: true });
  };

  return (
    <Button
      onClick={async () => await handleSignOut()}
      variant={"outline"}
      className={"w-full"}
    >
      Logout
    </Button>
  );
};
