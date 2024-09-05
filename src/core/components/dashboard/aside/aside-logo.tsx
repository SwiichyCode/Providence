import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { Triangle } from "lucide-react";
import { URL } from "@/config/constants/url";

export const AsideLogo = () => {
  return (
    <div className="border-b p-2">
      <Button variant="outline" size="icon" aria-label="Home">
        <Link href={URL.HOME}>
          <Triangle className="size-5 fill-foreground" />
        </Link>
      </Button>
    </div>
  );
};
