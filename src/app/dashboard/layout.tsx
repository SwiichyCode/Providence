import { Aside } from "@/core/components/dashboard/aside";
import type { PropsWithChildren } from "react";
import { getServerAuthSession } from "@/config/server/auth";
import { RedirectUnauthorized } from "@/core/components/dashboard/redirect/redirect-unauthorized";
import { DashboardBreadcrumb } from "@/core/components/dashboard/breadcrumb";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    return <RedirectUnauthorized />;
  }

  return (
    <div className="grid h-screen w-full pl-[32px]">
      <Aside />

      <main className="p-12">
        <DashboardBreadcrumb />
        {children}
      </main>
    </div>
  );
}
