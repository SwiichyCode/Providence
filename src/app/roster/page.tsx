import { blizzardService } from "@/core/service/blizzard.service";
import { RosterDataTable } from "@/core/components/dashboard/roster/roster-table";
import { columns } from "@/core/components/dashboard/roster/roster-table/column";

export default async function Page() {
  const members = await blizzardService.getMembersProfile();
  const highestIlvlMember = members?.filter((member) => member.ilvl >= 605);
  const lowestIlvlMember = members?.filter((member) => member.ilvl < 605);

  if (!members) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"p-12"}>
      <div className={"w-full max-w-2xl"}>
        <RosterDataTable columns={columns} data={members} />
      </div>
    </div>
  );
}
