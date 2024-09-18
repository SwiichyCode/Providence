"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Form } from "@/core/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/core/components/recruitment/recruitment-schema";
import { InputForm } from "@/core/components/ui/input-form";
import type * as z from "zod";
import { SelectForm } from "@/core/components/ui/select-form";
import { CLASS } from "@/config/data";
import { TextAreaForm } from "@/core/components/ui/textarea-form";
import { ButtonSubmit } from "@/core/components/ui/button-submit";
import { postRecruitmentAction } from "@/core/actions/post-recruitment-action";
import type { NeededClass } from "@prisma/client";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  neededClass: NeededClass | null;
};

export const RecruitmentForm = ({ neededClass }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentClass, setCurrentClass] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pseudo: "",
      battleTag: "",
      class: "",
      ilvl: "",
      specialization: "",
      faction: "",
      raiderIo: "",
      warcraftLogs: "",
      presentation: "",
      motivation: "",
    },
  });

  const watchClass = form.watch("class");

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const payload = await postRecruitmentAction(values);

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }

      setSuccessMessage("Votre formulaire a bien été soumis !");

      form.reset();
    });
  }
  useEffect(() => {
    setCurrentClass(form.watch("class"));
  }, [form, watchClass]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire de recrutement</CardTitle>
        <CardDescription>
          Vous souhaitez rejoindre nos rangs ? Remplissez le formulaire
          ci-dessous et nous vous contacterons dans les plus brefs délais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <div className={"flex space-x-4"}>
              <InputForm control={form.control} name="pseudo" label="Pseudo" />
              <InputForm
                control={form.control}
                name="battleTag"
                label="BattleTag"
              />

              <InputForm
                control={form.control}
                name="discord"
                label="Discord"
              />
            </div>

            <div className={"flex w-full space-x-4"}>
              <SelectForm
                control={form.control}
                name="faction"
                placeholder="Alliance..."
                items={["Alliance", "Horde"]}
                label="Faction"
              />
              <SelectForm
                control={form.control}
                name="class"
                placeholder="Class..."
                items={
                  neededClass?.class.length
                    ? neededClass?.class
                    : CLASS.map((c) => c.value)
                }
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

              <InputForm
                control={form.control}
                name="ilvl"
                label="Ilvl"
                type="number"
              />
            </div>
            <div className="flex w-full space-x-4">
              <InputForm
                control={form.control}
                name="raiderIo"
                label="Lien Raider.io (optionnel)"
              />
              <InputForm
                control={form.control}
                name="warcraftLogs"
                label="Lien Warcraft Logs (optionnel)"
              />
            </div>
            <div className={"flex w-full flex-col space-y-4"}>
              <TextAreaForm
                control={form.control}
                name="presentation"
                label="Présentez-vous"
              />
              <TextAreaForm
                control={form.control}
                name="motivation"
                label="Pourquoi nous rejoindre ?"
              />
            </div>
            <ButtonSubmit isPending={isPending}>Soumettre</ButtonSubmit>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
      </CardFooter>
    </Card>
  );
};
