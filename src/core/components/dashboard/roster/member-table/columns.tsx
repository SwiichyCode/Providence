"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { classColor } from "@/config/utils";
import Link from "next/link";

export type Member = {
  id: string;
  pseudo: string;
  class: string;
  specialization: string | null;
  role: string;
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
];
