import React from 'react'

// Data table stuff
import { BillsDataTable } from '@/components/reusable/Bills/data-table'
import { columns } from '@/components/reusable/Bills/columns'
import { IBillsParams } from '@/app/types/types'

async function getData(): Promise<IBillsParams[]> {
  // Fetch data from your API here.
  return [
    {
      date: "15-02-2024",
      clientName: "Perry",
      clientNit: 4083042,
      billId: "0003",
      amount: 4759.50,
      status: "AIOff",
      dueDays: 25,
      logs: "/log"
    },
    {
      date: "18-02-2024",
      clientName: "UIM",
      clientNit: 586575,
      billId: "0002",
      amount: 8756.50,
      status: "AIOff",
      dueDays: -25,
      logs: "/log"
    },
    {
      date: "28-02-2024",
      clientName: "UIM",
      clientNit: 586575,
      billId: "0002",
      amount: 789.50,
      status: "AIOff",
      dueDays: -5,
      logs: "/log"
    }
    // ...
  ]
}

const Bills = async () => {
  const data = await getData()

  return (
    <div className='flex flex-col w-screen h-screen pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/50'>
      <div className='flex w-full h-[10vh]'>
        <p className='text-4xl font-bold mb-auto mr-auto'>COBROS | Facturas</p>
      </div>
      <div className='flex flex-row gap-1 w-full h-[10vh]'>
        <div className='flex flex-row gap-3 grow m-auto'>
          <p>Subir archivo</p>
          <p>Ingreso manual</p>
        </div>
        <div className='flex w-[20vw] h-full m-auto'>
          Estadisticas
        </div>
      </div>
      <div className='flex w-full'>
        <BillsDataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Bills