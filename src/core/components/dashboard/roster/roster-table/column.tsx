"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { classColor } from "@/config/utils";

export type RosterMember = {
  name: string;
  ilvl: number;
  class: string;
  spec: string;
  realm: string;
};

export const columns: ColumnDef<RosterMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ilvl",
    header: "Ilvl",
  },
  {
    accessorKey: "class",
    header: "Class",

    cell: (props) => (
      <span style={{ color: classColor(String(props.getValue())) }}>
        {String(props.getValue())}
      </span>
    ),
  },
  {
    accessorKey: "spec",
    header: "Spec",
  },
  {
    accessorKey: "Armurerie",
    header: "Armurerie",
    cell: (props) => (
      <Link
        href={`https://worldofwarcraft.blizzard.com/en-gb/character/eu/${props.row.original.realm}/${props.row.original.name}`}
        target={"_blank"}
      >
        Armurerie
      </Link>
    ),
  },
  {
    accessorKey: "WarcraftLogs",
    header: "WarcraftLogs",
    cell: (props) => (
      <Link
        href={`https://www.warcraftlogs.com/character/eu/${props.row.original.realm}/${props.row.original.name}`}
        target={"_blank"}
      >
        WarcraftLogs
      </Link>
    ),
  },
];
