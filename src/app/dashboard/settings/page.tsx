import { SettingsClassRecruitmentForm } from "@/core/components/dashboard/settings/settings-class-recruitment-form";
import { db } from "@/config/server/db";

export default async function SettingsPage() {
  const neededClass = await db.neededClass.findFirst();

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-3">
      <SettingsClassRecruitmentForm neededClass={neededClass} />
    </div>
  );
}
