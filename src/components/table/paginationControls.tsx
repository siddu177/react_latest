import * as React from "react"
import { useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaginationControls({ table, pageSizeOptions = [5,10,20] }: { table: ReturnType<typeof useReactTable>, pageSizeOptions?: number[] }) {
  const state = table.getState().pagination
  const goto = (idx: number) => table.setPageIndex(idx)

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Prev
      </Button>

      <div className="text-sm">
        Page {state.pageIndex + 1} of {table.getPageCount()}
      </div>

      <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>

      <Select onValueChange={(v) => table.setPageSize(Number(v))} value={String(state.pageSize)}>
        <SelectTrigger className="w-[80px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((p) => <SelectItem value={String(p)} key={p}>{p} / page</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
