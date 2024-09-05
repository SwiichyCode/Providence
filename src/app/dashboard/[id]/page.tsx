import { db } from "@/config/server/db";
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
    <div className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-3">
      <EditMemberForm member={member} />
    </div>
  );
}
