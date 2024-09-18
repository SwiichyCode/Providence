import { db } from "@/config/server/db";

type Props = {
  params: {
    id: string;
  };
};

/*const recruitment: {     id: string     pseudo: string     battleTag: string     discord: string     class: string     ilvl: string     specialization: string     faction: string     raiderIo: string | null     warcraftLogs: string | null     presentation: string     motivation: string } | null Show less*/

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
