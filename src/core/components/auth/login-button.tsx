"use client";
import * as React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/core/components/ui/button";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
  provider: "discord" | "battlenet";
  children: React.ReactNode;
};

export const LoginButton = ({ session, provider, children }: Props) => {
  if (session) return null;

  return (
    <Button
      onClick={() => signIn(provider)}
      variant={"outline"}
      className={"w-full"}
    >
      {children}
    </Button>
  );
};
