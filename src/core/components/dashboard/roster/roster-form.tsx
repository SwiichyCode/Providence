"use client";
import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type * as z from "zod";
import { formSchema } from "@/core/components/dashboard/roster/roster-schema";
import { Form } from "@/core/components/ui/form";
import { InputForm } from "@/core/components/ui/input-form";
import { ButtonSubmit } from "@/core/components/ui/button-submit";
import { TextAreaForm } from "@/core/components/ui/textarea-form";
import { SelectForm } from "@/core/components/ui/select-form";

export type FormValues = z.infer<typeof formSchema>;

const CLASS = [
  {
    value: "Death Knight",
    specializations: ["Blood", "Frost", "Unholy"],
  },
  {
    value: "Demon Hunter",
    specializations: ["Havoc", "Vengeance"],
  },
  {
    value: "Druid",
    specializations: ["Balance", "Feral", "Guardian", "Restoration"],
  },
  {
    value: "Evoker",
    specializations: ["Augmentation", "Devastation", "Preservation"],
  },
  {
    value: "Hunter",
    specializations: ["Beast Mastery", "Marksmanship", "Survival"],
  },
  {
    value: "Mage",
    specializations: ["Arcane", "Fire", "Frost"],
  },
  {
    value: "Monk",
    specializations: ["Brewmaster", "Mistweaver", "Windwalker"],
  },
  {
    value: "Paladin",
    specializations: ["Holy", "Protection", "Retribution"],
  },
  {
    value: "Priest",
    specializations: ["Discipline", "Holy", "Shadow"],
  },
  {
    value: "Rogue",
    specializations: ["Assassination", "Outlaw", "Subtlety"],
  },
  {
    value: "Shaman",
    specializations: ["Elemental", "Enhancement", "Restoration"],
  },
  {
    value: "Warlock",
    specializations: ["Affliction", "Demonology", "Destruction"],
  },
  {
    value: "Warrior",
    specializations: ["Arms", "Fury", "Protection"],
  },
];

export const RosterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [currentClass, setCurrentClass] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const watchClass = form.watch("class");

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log(values);
    });
  }

  useEffect(() => {
    setCurrentClass(form.watch("class"));
    console.log("test");
  }, [form, watchClass]);

  return (
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
              CLASS.find((c) => c.value === currentClass)?.specializations ?? []
            }
            label="Specialization"
          />
        )}

        <TextAreaForm
          control={form.control}
          name="appreciation"
          label="Appreciation"
        />
        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
      </form>
    </Form>
  );
};
