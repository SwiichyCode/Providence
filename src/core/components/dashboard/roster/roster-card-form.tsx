import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import type { PropsWithChildren } from "react";

export const RosterCardForm = ({ children }: PropsWithChildren) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add member</CardTitle>
        <CardDescription>Complete the different fields</CardDescription>
        <CardContent className={"p-0"}>{children}</CardContent>
      </CardHeader>
    </Card>
  );
};
