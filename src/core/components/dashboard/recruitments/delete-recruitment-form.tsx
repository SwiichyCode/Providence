"use client";

import React, { useTransition } from "react";
import { deleteRecruitmentAction } from "@/core/actions/delete-recruitment-action";
import { Button } from "@/core/components/ui/button";

type Props = {
  recruitmentId: string;
};

export const DeleteRecruitmentForm = ({ recruitmentId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteRecruitment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await deleteRecruitmentAction({ id: recruitmentId });
    });
  };

  return (
    <form onSubmit={handleDeleteRecruitment}>
      <Button type="submit" disabled={isPending}>
        Delete
      </Button>
    </form>
  );
};
