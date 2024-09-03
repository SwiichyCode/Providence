import type { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
