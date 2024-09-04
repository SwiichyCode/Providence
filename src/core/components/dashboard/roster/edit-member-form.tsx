"use client";
import React, { useState, useTransition } from "react";
import { CLASS } from "@/config/data";
import { ROLE } from "@/config/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/core/components/dashboard/roster/add-member-schema";
import type { FormValues } from "@/core/components/dashboard/roster/add-member-form";
import type { Member } from "@prisma/client";
import { editMemberAction } from "@/core/actions/edit-member-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Form } from "@/core/components/ui/form";
import { InputForm } from "@/core/components/ui/input-form";
import { SelectForm } from "@/core/components/ui/select-form";
import { TextAreaForm } from "@/core/components/ui/textarea-form";
import { ButtonSubmit } from "@/core/components/ui/button-submit";
import { Button } from "@/core/components/ui/button";
import { removeMemberAction } from "@/core/actions/remove-member-action";

type Props = {
  member: Member;
};

export const EditMemberForm = ({ member }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pseudo: member.pseudo,
      class: member.class,
      specialization: member.specialization ?? undefined,
      role: member.role,
      appreciation: member.appreciation ?? undefined,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const payload = await editMemberAction({ id: member.id, ...values });

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const payload = await removeMemberAction({ id: member.id });

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Edit member</CardTitle>
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

            <SelectForm
              control={form.control}
              name="specialization"
              placeholder="Specialization..."
              items={
                CLASS.find((c) => c.value === form.watch("class"))
                  ?.specializations ?? []
              }
              label="Specialization"
            />

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

            <div className={"flex gap-4"}>
              <ButtonSubmit isPending={isPending}>Update</ButtonSubmit>
              <Button type="button" onClick={handleRemove}>
                Remove
              </Button>
            </div>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
