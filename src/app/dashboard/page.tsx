import { db } from "@/config/server/db";
import { AddMemberForm } from "@/core/components/dashboard/roster/add-member-form";
import { RosterDataTable } from "@/core/components/dashboard/roster/member-table";
import { columns } from "@/core/components/dashboard/roster/member-table/columns";
import { MemberInformations } from "@/core/components/dashboard/roster/member-informations";

export default async function DashboardPage() {
  const members = await db.member.findMany();

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-3">
      <AddMemberForm />
      <RosterDataTable columns={columns} data={members} />
      <MemberInformations members={members} />
    </div>
  );
}
