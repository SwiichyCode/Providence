"use server";
import * as z from "zod";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";

const schema = z.object({
  id: z.string(),
  roster: z.boolean().default(false).optional(),
});

export const updateRosterAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.member.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          roster: parsedInput.roster,
        },
      });
    } catch (error) {
      throw new ServerActionError("Error while updating deposit");
    }
  });
