"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
import { IFlowParams } from "@/app/types/types"

export const columns: ColumnDef<IFlowParams>[] = [
  {
    accessorKey: "name",
    header: "Plantillas de cobro / Flujos IA",
    cell: ({ row }) => (
      <div className="flex">
        {/** TODO: Add component to load flow */}
        <p>{row.getValue("name")}</p>
      </div>
    )
  },
]