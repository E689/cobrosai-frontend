"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
import { IBillsParams } from "@/app/types/types"
// Dialog imports
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
// General UI components
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import ClientsForm from "../Clients/ClientsForm"
import AISelector from "./AISelector"
import LogSheet from "./LogSheet"

const getDueDaysColor = (value: number): string => {
  if (value < 0) {
    return "text-green-400"
  } else if (value >= 0 && value < 30) {
    return "text-yellow-400"
  } else if (value >= 30 && value < 60) {
    return "text-orange-400"
  } else if (value >= 60 && value < 90) {
    return "text-red-400"
  } else {
    return "text-red-800"
  }
}

export const columns: ColumnDef<IBillsParams>[] = [
  {
    id: "select",
    accessorKey: "client",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="m-auto"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        id={row.getValue("select")}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Empresa | Deudor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger
            className="h-[80%] my-auto px-2 rounded-lg"
          >
            {row.getValue("clientName")}
          </DialogTrigger>
          <DialogContent className="min-w-[60%]">
            <ClientsForm
              action="edit"
              client={
                {
                  clientName: row.getValue("clientName"),
                  nit: row.getValue("clientId"),
                  clientId: row.getValue("select")
                }
              }
            />
          </DialogContent>
        </Dialog>)
    },
  },
  {
    accessorKey: "clientId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("clientId")}</div>,
  },
  {
    accessorKey: "billId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. Factura
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("billId")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto (Q)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GTQ",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estatus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex">
      <AISelector
        defaultValue={row.getValue("status")}
        billId={row.getValue("billId")}
        clientId={row.getValue("clientId")}
      />
    </div>,
  },
  {
    accessorKey: "creditDays",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Días vencidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("creditDays"))}`}>
      <p>{row.getValue("creditDays")}</p>
    </div>
  },
  {
    accessorKey: "log",
    header: "Historial",
    cell: ({ row }) => {
      return (
        <LogSheet logId={row.getValue("log")} nit={row.getValue("clientId")} />
      )
    },
  },
]