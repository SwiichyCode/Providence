"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { classColor } from "@/config/utils";
import Link from "next/link";
import { DepositForm } from "@/core/components/dashboard/roster/deposit-form";
import { RosterForm } from "@/core/components/dashboard/roster/roster-form";

export type Member = {
  id: string;
  pseudo: string;
  class: string;
  specialization: string | null;
  role: string;
  deposit: boolean | null;
  roster: boolean | null;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "pseudo",
    header: "Pseudo",
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
    accessorKey: "specialization",
    header: "Specialization",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: (props) => (
      <Link href={`/dashboard/${String(props.row.original.id)}`}>View</Link>
    ),
  },
  {
    accessorKey: "deposit",
    header: "Deposit",
    cell: (props) => (
      <DepositForm
        id={props.row.original.id}
        deposit={props.row.original.deposit}
      />
    ),
  },
  {
    accessorKey: "roster",
    header: "Roster",
    cell: (props) => (
      <RosterForm
        id={props.row.original.id}
        roster={props.row.original.roster}
      />
    ),
  },
];
