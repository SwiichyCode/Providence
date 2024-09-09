"use client";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { formSchema } from "@/core/components/dashboard/roster/raid-subscription-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/components/ui/form";
import { SwitchForm } from "@/core/components/ui/switch-form";
import { updateRosterSubscriptionAction } from "@/core/actions/update-roster-subscrition-action";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  id: string;
  rosterSubscribed: boolean | null;
};

export const RaidSubscriptionForm = ({ rosterSubscribed, id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rosterSubscribed: rosterSubscribed ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await updateRosterSubscriptionAction({
        id,
        rosterSubscribed: values.rosterSubscribed,
      });
    });
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "rosterSubscribed") {
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
        <SwitchForm control={form.control} name="rosterSubscribed" />
      </form>
    </Form>
  );
};
