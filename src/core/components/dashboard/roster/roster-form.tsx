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
import { addMemberAction } from "@/core/components/actions/add-member-action";

export type FormValues = z.infer<typeof formSchema>;

export const CLASS = [
  {
    value: "Death Knight",
    color: "#C41E3A",
    specializations: ["Blood", "Frost", "Unholy"],
  },
  {
    value: "Demon Hunter",
    color: "#C41E3A",
    specializations: ["Havoc", "Vengeance"],
  },
  {
    value: "Druid",
    color: "#FF7C0A",
    specializations: ["Balance", "Feral", "Guardian", "Restoration"],
  },
  {
    value: "Evoker",
    color: "#FF7C0A",
    specializations: ["Augmentation", "Devastation", "Preservation"],
  },
  {
    value: "Hunter",
    color: "#AAD372",
    specializations: ["Beast Mastery", "Marksmanship", "Survival"],
  },
  {
    value: "Mage",
    color: "#AAD372",
    specializations: ["Arcane", "Fire", "Frost"],
  },
  {
    value: "Monk",
    color: "#00DC4F",
    specializations: ["Brewmaster", "Mistweaver", "Windwalker"],
  },
  {
    value: "Paladin",
    color: "#F48CBA",
    specializations: ["Holy", "Protection", "Retribution"],
  },
  {
    value: "Priest",
    color: "#FFF1C5",
    specializations: ["Discipline", "Holy", "Shadow"],
  },
  {
    value: "Rogue",
    color: "#FFF468",
    specializations: ["Assassination", "Outlaw", "Subtlety"],
  },
  {
    value: "Shaman",
    color: "#0070DD",
    specializations: ["Elemental", "Enhancement", "Restoration"],
  },
  {
    value: "Warlock",
    color: "#8788E7",
    specializations: ["Affliction", "Demonology", "Destruction"],
  },
  {
    value: "Warrior",
    color: "#C69B6D",
    specializations: ["Arms", "Fury", "Protection"],
  },
];

const ROLE = ["Tank", "Healer", "DPS"];

export const RosterForm = () => {
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
  );
};
