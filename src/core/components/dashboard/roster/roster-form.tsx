"use client";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { formSchema } from "@/core/components/dashboard/roster/roster-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/components/ui/form";
import { SwitchForm } from "@/core/components/ui/switch-form";
import { updateRosterAction } from "@/core/actions/update-roster-action";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  id: string;
  roster: boolean | null;
};

export const RosterForm = ({ roster, id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roster: roster ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await updateRosterAction({
        id,
        roster: values.roster,
      });
    });
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "roster") {
        void form.handleSubmit(onSubmit)();
      }

      return subscription.unsubscribe();
    });
  }, [onSubmit, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center space-y-6"
      >
        <SwitchForm control={form.control} name="roster" />
      </form>
    </Form>
  );
};
