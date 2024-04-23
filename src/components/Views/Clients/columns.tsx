"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
import { IClientExtendedParams } from "@/app/types/types"
// Dialog imports
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
// General UI components
import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import { TbMessageSearch } from "react-icons/tb";
import ClientsForm from "./ClientsForm"
import { redirect } from "next/navigation"
import ClientDetailButton from "./ClientDetailButton"
import ClientFlowSelector from "./ClientFlowSelector"

const getMsgColor = (value: string): string => {
  switch (value) {
    // TODO: Last Message color logic here.
    default:
      return ""
  }
}

const getDueDaysColor = (value: number): string => {
  if (value < 0) {
    return "text-green-400"
  } else if (value >= 0 && value < 31) {
    return "text-yellow-400"
  } else if (value >= 31 && value < 60) {
    return "text-orange-400"
  } else if (value >= 61 && value < 91) {
    return "text-red-400"
  } else {
    return "text-red-800"
  }
}

export const columns: ColumnDef<IClientExtendedParams>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[25vw]"
        >
          Empresa | Deudor
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger
            className="my-auto px-2 text-justify"
          >
            {row.getValue("clientName")}
          </DialogTrigger>
          <DialogContent className="min-w-[60%]">
            <ClientsForm
              action="edit"
              client={
                {
                  clientName: row.getValue("clientName"),
                  nit: row.getValue("nit"),
                  clientId: row.original.clientId
                }
              }
            />
          </DialogContent>
        </Dialog>)
    },
  },
  {
    accessorKey: "nit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIT
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("nit")}</div>,
  },
  {
    accessorKey: "expired",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit h-full m-0 p-0 whitespace-normal"
        >
          Cant. <br />
          vencidos
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">
      <p>{row.getValue("expired")}</p>
    </div>,
  },
  {
    accessorKey: "lowExpired",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-yellow-400 w-fit h-full m-0 p-0 whitespace-normal"
        >
          0-30
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("lowExpired"))}`}>
      <p>{row.getValue("lowExpired")}</p>
    </div>,
  },
  {
    accessorKey: "mediumExpired",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-orange-400 w-fit h-full m-0 p-0 whitespace-normal"
        >
          31-60
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("mediumExpired"))}`}>
      <p>{row.getValue("mediumExpired")}</p>
    </div>,
  },
  {
    accessorKey: "highExpired",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-red-400 w-fit h-full m-0 p-0 whitespace-normal"
        >
          61-90
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("highExpired"))}`}>
      <p>{row.getValue("highExpired")}</p>
    </div>,
  },
  {
    accessorKey: "criticalExpired",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-red-800 w-fit h-full m-0 p-0 whitespace-normal"
        >
          90+
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("criticalExpired"))}`}>
      <p>{row.getValue("criticalExpired")}</p>
    </div>,
  },
  {
    accessorKey: "lastMessage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit h-full m-0 p-0 whitespace-normal"
        >
          Ultimo mensaje
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center w-full h-full`}>
      <p>{row.getValue("lastMessage")}</p>
    </div>,
  },
  {
    accessorKey: "ignoredMsgs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit h-full m-0 p-0 whitespace-normal"
        >
          Ignorados
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("ignoredMsgs"))}`}>
      <p>{row.getValue("ignoredMsgs")}</p>
    </div>,
  },
  {
    accessorKey: "brokenPromises",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit h-full m-0 p-0 whitespace-normal"
        >
          Rotas
        </Button>
      )
    },
    cell: ({ row }) => <div className={`text-center ${getDueDaysColor(row.getValue("brokenPromises"))}`}>
      <p>{row.getValue("brokenPromises")}</p>
    </div>,
  },
  {
    accessorKey: "collectionFlow",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Flujo de cobro
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex">
       <ClientFlowSelector
        defaultValue={row.original.flow!}
        clientId={row.original.clientId}
      />
    </div>,
  },
  {
    id: "details",
    header: "Detalle",
    cell: ({ row }) => <ClientDetailButton clientId={row.original.clientId} />,
  },
]