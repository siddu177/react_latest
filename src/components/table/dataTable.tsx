import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type getRowSelectionColumn,
  useReactTable,
  type Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table" // If you have shadcn table primitives. Otherwise we will use simple elements below.
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ColumnVisibilityToggle } from "./ColumnVisibilityToggle"
import { PaginationControls } from "./PaginationControls"
import { RowActions } from "./RowActions"

type Props<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  pageSizeOptions?: number[]
}

export function DataTable<TData>({ columns, data, pageSizeOptions = [5, 10, 20] }: Props<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean> | undefined>(undefined)

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row: any) => row.id ?? JSON.stringify(row),
    getRowCanSelect: () => true,
    // Add row selection column
    // Note: TanStack v8 suggests adding selection column as a column def.
  })

  // add selection column dynamically (so consumer doesn't need to)
  const colsWithSelection = React.useMemo(() => {
    const selectionCol = {
      id: "__select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: Row<TData> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={`Select row ${row.index}`}
        />
      ),
      size: 32,
      enableSorting: false,
    } as ColumnDef<TData, any>

    // don't duplicate if user already defined a selection column
    const exists = columns.some((c) => (c as any).id === "__select")
    return exists ? columns : [selectionCol, ...columns]
  }, [columns])

  // re-create table with selection column
  const tableWithSelection = useReactTable({
    data,
    columns: colsWithSelection,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <ColumnVisibilityToggle table={tableWithSelection} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            {tableWithSelection.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn("px-3 py-2 text-left text-sm font-medium text-muted-foreground")}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2 select-none cursor-pointer"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[String(header.column.getIsSorted() as any)] ?? null}
                      </div>
                    )}
                  </th>
                ))}
                {/* Row Actions head */}
                <th className="px-3 py-2 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y">
            {tableWithSelection.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No results.
                </td>
              </tr>
            ) : (
              tableWithSelection.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 align-top text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}

                  <td className="px-3 py-2 align-top text-sm">
                    <RowActions row={row} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination summary */}
      <div className="flex items-center justify-between mt-3 gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {tableWithSelection.getState().pagination.pageIndex * tableWithSelection.getState().pagination.pageSize + 1}
          {" - "}
          {Math.min((tableWithSelection.getState().pagination.pageIndex + 1) * tableWithSelection.getState().pagination.pageSize, data.length)}
          {" of "} {data.length}
        </div>

        <div>
          <PaginationControls table={tableWithSelection} pageSizeOptions={pageSizeOptions} />
        </div>
      </div>
    </div>
  )
}
