import * as React from "react"
import type { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, Trash2 } from "lucide-react"

export function RowActions<TData>({ row }: { row: Row<TData> }) {
  const rowData = row.original as any

  const handleEdit = () => {
    // your edit logic — maybe navigate
    console.log("Edit", rowData)
  }

  const handleDelete = () => {
    // your delete logic
    console.log("Delete", rowData)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}><Edit className="mr-2" /> Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}><Trash2 className="mr-2" /> Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
