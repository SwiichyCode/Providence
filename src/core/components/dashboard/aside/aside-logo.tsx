import React from "react";
import { Button } from "@/core/components/ui/button";
import { Triangle } from "lucide-react";

export const AsideLogo = () => {
  return (
    <div className="border-b p-2">
      <Button variant="outline" size="icon" aria-label="Home">
        <Triangle className="fill-foreground size-5" />
      </Button>
    </div>
  );
};
