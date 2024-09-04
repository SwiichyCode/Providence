"use server";

import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import * as z from "zod";
import { db } from "@/config/server/db";
import { redirect } from "next/navigation";

const schema = z.object({
  id: z.string(),
});

export const removeMemberAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.member.delete({
        where: {
          id: parsedInput.id,
        },
      });
    } catch (error) {
      throw new ServerActionError("Error while removing member");
    }

    redirect("/dashboard");
  });
