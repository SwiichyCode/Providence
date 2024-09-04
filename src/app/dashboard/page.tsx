import { Fragment } from "react";
import { db } from "@/config/server/db";
import { AddMemberForm } from "@/core/components/dashboard/roster/add-member-form";
import { RosterDataTable } from "@/core/components/dashboard/roster/member-table";
import { columns } from "@/core/components/dashboard/roster/member-table/columns";

export default async function HomePage() {
  const members = await db.member.findMany();

  return (
    <Fragment>
      <AddMemberForm />
      <RosterDataTable columns={columns} data={members} />
    </Fragment>
  );
}
