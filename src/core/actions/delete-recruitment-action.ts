"use server";

import { db } from "@/config/server/db";
import * as z from "zod";
import { adminAction } from "@/config/libs/next-safe-action";
import { redirect } from "next/navigation";
import { URL } from "@/config/constants/url";

const schema = z.object({
  id: z.string().min(1),
});

export const deleteRecruitmentAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.recruitment.delete({
        where: {
          id: parsedInput.id,
        },
      });
    } catch (error) {
      throw new Error(`Error while deleting recruitment`);
    }

    redirect(URL.RECRUITERS);
  });
