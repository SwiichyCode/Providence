"use client";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { formSchema } from "@/core/components/dashboard/roster/deposit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/components/ui/form";
import { SwitchForm } from "@/core/components/ui/switch-form";
import { updateDepositAction } from "@/core/actions/update-deposit-action";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  id: string;
  deposit: boolean | null;
};

export const DepositForm = ({ deposit, id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deposit: deposit ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await updateDepositAction({
        id,
        deposit: values.deposit,
      });
    });
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "deposit") {
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
        <SwitchForm control={form.control} name="deposit" />
      </form>
    </Form>
  );
};
