"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { Button } from "@/core/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const AsideAuthLogout = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mt-auto rounded-lg"
          aria-label="Logout"
          onClick={() => signOut({ callbackUrl: "/auth", redirect: true })}
        >
          <LogOutIcon className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        Logout
      </TooltipContent>
    </Tooltip>
  );
};
