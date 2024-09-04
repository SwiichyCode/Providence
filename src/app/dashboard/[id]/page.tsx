import { db } from "@/config/server/db";
import { Fragment } from "react";
import { EditMemberForm } from "@/core/components/dashboard/roster/edit-member-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function MemberPage({ params }: Props) {
  const member = await db.member.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <Fragment>
      <EditMemberForm member={member} />
    </Fragment>
  );
}
