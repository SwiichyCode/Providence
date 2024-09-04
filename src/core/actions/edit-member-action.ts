"use server";

import { revalidatePath } from "next/cache";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";
import * as z from "zod";

const schema = z.object({
  id: z.string(),
  pseudo: z.string(),
  class: z.string(),
  specialization: z.string().optional(),
  role: z.string(),
  appreciation: z.string().optional(),
});

export const editMemberAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.member.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          class: parsedInput.class,
          specialization: parsedInput.specialization,
          role: parsedInput.role,
          appreciation: parsedInput.appreciation,
        },
      });
    } catch (error) {
      throw new ServerActionError("Error while adding member");
    }

    revalidatePath(`/dashboard/${parsedInput.id}`);
  });
