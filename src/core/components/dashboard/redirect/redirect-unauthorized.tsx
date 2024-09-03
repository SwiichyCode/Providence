import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";

import { LogoutButton } from "@/core/components/auth/logout-button";

export const RedirectUnauthorized = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CardHeader>
        <CardTitle className="text-2xl">Unauthorized access</CardTitle>
        <CardDescription>
          Contact your administrator to request access
        </CardDescription>
        <LogoutButton />
      </CardHeader>
    </div>
  );
};
