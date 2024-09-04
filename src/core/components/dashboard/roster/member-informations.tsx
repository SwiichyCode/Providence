import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import type { Member } from "@prisma/client";

type Props = {
  members: Member[];
};

export const MemberInformations = ({ members }: Props) => {
  const tank = members.filter((member) => member.role === "Tank");
  const healer = members.filter((member) => member.role === "Healer");
  const dps = members.filter((member) => member.role === "DPS");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Total members: {members.length}
        </CardTitle>

        <CardContent className={"p-0"}>
          <ul>
            <li>-Tank: {tank.length}</li>
            <li>-Healer: {healer.length}</li>
            <li>-DPS: {dps.length}</li>
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
