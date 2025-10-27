import * as React from "react"
import { DataTable } from "@/components/table/DataTable"
import { type ColumnDef } from "@tanstack/react-table"
import { Avatar } from "@/components/ui/avatar"

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const sampleData: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin", createdAt: "2024-01-01" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "Editor", createdAt: "2024-02-14" },
  // ...more
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <img src={`https://i.pravatar.cc/40?img=${row.index + 1}`} alt={String(getValue())} />
        </Avatar>
        <div>
          <div className="font-medium">{getValue()}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => <div className="text-xs text-muted-foreground">{info.getValue()}</div>,
  },
]

export default function UsersTablePage() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={sampleData} pageSizeOptions={[5,10,25]} />
    </div>
  )
}
