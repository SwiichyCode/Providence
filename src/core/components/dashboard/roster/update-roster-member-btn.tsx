"use client";

import { syncRosterMemberAction } from "@/core/actions/sync-roster-member-action";
import { Button } from "@/core/components/ui/button";
import React, { startTransition } from "react";

export const UpdateRosterMemberBtn = () => {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      await syncRosterMemberAction();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button>Update Roster</Button>
    </form>
  );
};
