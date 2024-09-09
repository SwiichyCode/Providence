"use server";
import * as z from "zod";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";

const schema = z.object({
  id: z.string(),
  rosterSubscribed: z.boolean().default(false).optional(),
});

export const updateRosterSubscriptionAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.member.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          rosterSubscribed: parsedInput.rosterSubscribed,
        },
      });
    } catch (error) {
      throw new ServerActionError("Error while updating deposit");
    }
  });
