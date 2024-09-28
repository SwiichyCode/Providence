import { db } from "@/config/server/db";
import { DeleteRecruitmentForm } from "@/core/components/dashboard/recruitments/delete-recruitment-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function RecruitmentPage({ params }: Props) {
  const recruitment = await db.recruitment.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!recruitment) {
    return <div>Recruitment not found</div>;
  }

  return (
    <div>
      <DeleteRecruitmentForm recruitmentId={recruitment.id} />
      <ul>
        <li>{recruitment.pseudo}</li>
        <li>{recruitment.battleTag}</li>
        <li>{recruitment.discord}</li>
        <li>{recruitment.class}</li>
        <li>{recruitment.ilvl}</li>
        <li>{recruitment.specialization}</li>
        <li>{recruitment.faction}</li>
        <li>{recruitment.raiderIo}</li>
        <li>{recruitment.warcraftLogs}</li>
        <li>{recruitment.presentation}</li>
        <li>{recruitment.motivation}</li>
      </ul>
    </div>
  );
}
