import { Fragment } from "react";
import { RecruitmentForm } from "@/core/components/recruitment/recruitment-form";
import { db } from "@/config/server/db";

export default async function RecruitmentPage() {
  const neededClass = await db.neededClass.findFirst();

  return (
    <Fragment>
      <RecruitmentForm neededClass={neededClass} />
    </Fragment>
  );
}
