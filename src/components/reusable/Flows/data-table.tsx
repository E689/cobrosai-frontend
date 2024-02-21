"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react"
// import { DataTablePagination } from "./data-table-pagination" // Maybe later we'l need this...
import LoaderSpiner from "../LoaderSpiner"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  selectFlow: Function,
  setAction: Function
}

export function FlowsDataTable<TData, TValue>({
  columns,
  data,
  selectFlow,
  setAction
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [isMounted, setIsMounted] = useState<Boolean>(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className="w-full px-2 flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <Input
            placeholder="Buscar..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="bg-slate-100 dark:bg-blue-950/60 grow"
          />
          <Button onClick={() => {
            setAction("create")
            selectFlow("Nuevo")
          }}>
            Agregar
          </Button>
        </div>
        <div className="rounded-md border w-full bg-slate-100 dark:bg-blue-950/60">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      selectFlow(row.index)
                      setAction("edit")
                    }}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron flujos...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/** Pagination stuff... 
        <DataTablePagination table={table} />
        */}
      </div>
    )
  }
}
