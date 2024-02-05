"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
import { IBillsParams } from "@/app/types/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import { TbMessageSearch } from "react-icons/tb";

const getAIColor = (value: string): string => {
  switch (value) {
    case "AIOff":
      return "bg-gray-400"
    case "Human":
      return "bg-blue-400"
    case "Paid":
      return "bg-green-400"
    case "Process":
      return "bg-yellow-400"
    default:
      return ""
  }
}

const getDueDaysColor = (value: number): string => {
  if (value < 0) {
    return "text-green-400"
  } else if (value >= 0 && value < 15) {
    return "text-yellow-400"
  } else if (value >= 15 && value < 30) {
    return "text-orange-400"
  } else {
    return "text-red-400"
  }
}

export const columns: ColumnDef<IBillsParams>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("clientName")}</div>,
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
    cell: ({ row }) => <div className="uppercase flex">
      <p
        className={
          `m-auto p-1 rounded-md w-full text-black font-medium text-center hover:cursor-pointer
           ${getAIColor(row.getValue("status"))} `
        }>
        {row.getValue("status")}
      </p>
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
    </div>,
  },
  {
    id: "log",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Historial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex">
      <TbMessageSearch 
      size={20} 
      className="m-auto cursor-pointer" 
      onClick={() => {console.log(row.getValue("logs"))}}/>
    </div>,
  },
]
