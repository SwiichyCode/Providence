"use client";

import { CLASS } from "@/config/data";
import {
  type ClassType,
  formSchema,
} from "@/core/components/dashboard/settings/settings-class-recruitment-schema";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form } from "@/core/components/ui/form";
import { MultiSelectForm } from "@/core/components/ui/multi-select-form";
import { ButtonSubmit } from "@/core/components/ui/button-submit";
import type { NeededClass } from "@prisma/client";
import { postNeededClassAction } from "@/core/actions/post-needed-class-action";

type Props = {
  neededClass: NeededClass | null;
};

type FormValues = {
  class: ClassType[];
};

export const SettingsClassRecruitmentForm = ({ neededClass }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: neededClass?.class.map((class_) => class_ as ClassType) ?? [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await postNeededClassAction({
        id: neededClass?.id,
        class: values.class.map((class_) => class_ as string),
      });

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }

      console.log(values);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <MultiSelectForm
          control={form.control}
          name={"class"}
          options={CLASS.map((class_) => {
            return { label: class_.value, value: class_.value };
          })}
          label={"Choice needed class"}
        />
        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
      </form>
    </Form>
  );
};
