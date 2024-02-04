"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
import { IBillsTable } from "@/app/types/types"

export const columns: ColumnDef<IBillsTable>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "clientName",
    header: "Empresa | Deudor",
  },
  {
    accessorKey: "clientNit",
    header: "NIT",
  },
  {
    accessorKey: "billId",
    header: "No. Factura",
  },
  {
    accessorKey: "amount",
    header: "Monto",
  },
  {
    accessorKey: "status",
    header: "Estatus",
  },
  {
    accessorKey: "dueDays",
    header: "Dias vencidos",
  },
  {
    accessorKey: "logs",
    header: "Historial",
  },
]
