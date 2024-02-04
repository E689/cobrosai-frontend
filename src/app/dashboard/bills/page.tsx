import React from 'react'

// Data table stuff
import { BillsDataTable } from '@/components/reusable/Bills/data-table'
import { columns } from '@/components/reusable/Bills/columns'
import { IBillsTable } from '@/app/types/types'

async function getData(): Promise<IBillsTable[]> {
  // Fetch data from your API here.
  return [
    
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