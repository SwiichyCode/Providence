import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { Button } from "@/core/components/ui/button";
import { Book, SquareTerminal, Settings } from "lucide-react";
import { URL } from "@/config/constants/url";

const globalNavigationItems = [
  {
    label: "Dashboard",
    icon: <SquareTerminal className="size-5" />,
    href: URL.DASHBOARD,
  },
  {
    label: "Recruiters",
    icon: <Book className="size-5" />,
    href: URL.RECRUITERS,
  },
  {
    label: "Settings",
    icon: <Settings className="size-5" />,
    href: URL.SETTINGS,
  },
  {
    label: "Recruitment",
    icon: <Book className="size-5" />,
    href: URL.RECRUITMENT,
  },
];

export const AsideGlobalNavigation = () => {
  return (
    <nav className="grid gap-1 p-2">
      <TooltipProvider>
        {globalNavigationItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label={item.label}
                >
                  {item.icon}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
};
