"use server";

import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { blizzardService } from "@/core/service/blizzard.service";
import { GUILD } from "@/config/constants/guild";
import { db } from "@/config/server/db";

export const syncRosterMemberAction = adminAction.action(async () => {
  try {
    const members = await blizzardService.getGuildRoster(
      GUILD.NAME,
      GUILD.REALM,
    );
    const memberInfos = await blizzardService.getMemberInformations(members);

    await Promise.all(
      memberInfos.map(async (member) => {
        await db.rosterMember.upsert({
          where: {
            id: member.id,
          },
          update: {
            name: member.name,
            class: member.class?.name,
            realm: member.realm,
            spec: member.spec?.name,
            ilvl: member.ilvl,
          },
          create: {
            id: member.id,
            name: member.name,
            realm: member.realm,
            class: member.class?.name,
            spec: member.spec?.name,
            ilvl: member.ilvl,
          },
        });
      }),
    );
  } catch (error) {
    throw new ServerActionError("Error while syncing roster members");
  }
});
