"use client";
import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type * as z from "zod";
import { formSchema } from "@/core/components/dashboard/roster/add-member-schema";
import { Form } from "@/core/components/ui/form";
import { InputForm } from "@/core/components/ui/input-form";
import { ButtonSubmit } from "@/core/components/ui/button-submit";
import { TextAreaForm } from "@/core/components/ui/textarea-form";
import { SelectForm } from "@/core/components/ui/select-form";
import { addMemberAction } from "@/core/actions/add-member-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { CLASS } from "@/config/data";
import { ROLE } from "@/config/data";

export type FormValues = z.infer<typeof formSchema>;

export const AddMemberForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentClass, setCurrentClass] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pseudo: "",
      class: "",
      specialization: "",
      role: "",
      appreciation: "",
    },
  });

  const watchClass = form.watch("class");

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await addMemberAction(values);

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }

      form.reset();
    });
  }

  useEffect(() => {
    setCurrentClass(form.watch("class"));
  }, [form, watchClass]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add member</CardTitle>
        <CardDescription>Complete the different fields</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <InputForm control={form.control} name="pseudo" label="Pseudo" />

            <SelectForm
              control={form.control}
              name="class"
              placeholder="Class..."
              items={CLASS.map((c) => c.value)}
              label="Class"
            />

            {currentClass && (
              <SelectForm
                control={form.control}
                name="specialization"
                placeholder="Specialization..."
                items={
                  CLASS.find((c) => c.value === currentClass)
                    ?.specializations ?? []
                }
                label="Specialization"
              />
            )}

            <SelectForm
              control={form.control}
              name="role"
              placeholder="Role..."
              items={ROLE}
              label="Role"
            />

            <TextAreaForm
              control={form.control}
              name="appreciation"
              label="Appreciation"
            />

            <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
