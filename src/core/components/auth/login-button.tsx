"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/core/components/ui/button";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LoginButton = ({ session }: Props) => {
  if (session) return null;

  return (
    <Button
      onClick={() => signIn("discord")}
      variant={"outline"}
      className={"w-full"}
    >
      Login with Discord
    </Button>
  );
};
