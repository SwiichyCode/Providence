import { columns } from "@/core/components/dashboard/roster/roster-table/column";
import { blizzardService } from "@/core/service/blizzard.service";
import { RosterDataTable } from "@/core/components/dashboard/roster/roster-table";

export default async function DashboardPage() {
  const members = await blizzardService.getMembersProfile();

  if (!members) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-2">
      <RosterDataTable columns={columns} data={members} />
    </div>
  );
}
