import { getServerAuthSession } from "@/config/server/auth";
import { Aside } from "@/core/components/dashboard/aside";
import { RedirectUnauthorized } from "@/core/components/dashboard/redirect/redirect-unauthorized";
import { RosterCardForm } from "@/core/components/dashboard/roster/roster-card-form";
import { RosterForm } from "@/core/components/dashboard/roster/roster-form";
import { RosterDataTable } from "@/core/components/dashboard/roster/roster-table";

import { db } from "@/config/server/db";
import { columns } from "@/core/components/dashboard/roster/roster-table/columns";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const members = await db.member.findMany();

  if (session?.user.role !== "ADMIN") {
    return <RedirectUnauthorized />;
  }

  return (
    <div className="grid h-screen w-full pl-[32px]">
      <Aside />
      <main className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-3">
        <RosterCardForm>
          <RosterForm />
        </RosterCardForm>

        <RosterDataTable columns={columns} data={members} />
      </main>
    </div>
  );
}
