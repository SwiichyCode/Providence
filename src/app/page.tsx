import { getServerAuthSession } from "@/config/server/auth";
import { Aside } from "@/core/components/dashboard/aside";
import { RedirectUnauthorized } from "@/core/components/dashboard/redirect/redirect-unauthorized";
import { Roster } from "@/core/components/dashboard/roster";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    return <RedirectUnauthorized />;
  }

  return (
    <div className="grid h-screen w-full pl-[32px]">
      <Aside />
      <Roster />
    </div>
  );
}
