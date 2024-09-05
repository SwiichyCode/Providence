"use server";
import * as z from "zod";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";

const schema = z.object({
  id: z.string(),
  deposit: z.boolean().default(false).optional(),
});

export const updateDepositAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.member.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          deposit: parsedInput.deposit,
        },
      });
    } catch (error) {
      throw new ServerActionError("Error while updating deposit");
    }
  });
