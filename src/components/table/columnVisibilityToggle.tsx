import * as React from "react"
import { useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ColumnVisibilityToggle({ table }: { table: ReturnType<typeof useReactTable> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {table.getAllLeafColumns().map((col) => {
          const id = col.id
          return (
            <DropdownMenuItem key={id} onClick={() => col.toggleVisibility(!col.getIsVisible())}>
              <input type="checkbox" checked={col.getIsVisible()} readOnly className="mr-2"/>
              {col.columnDef.header?.toString?.() ?? id}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
