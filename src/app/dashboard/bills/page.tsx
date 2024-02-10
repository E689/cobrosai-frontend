'use client'

import React, { useEffect, useState, useContext } from 'react'

// Data table stuff
import { BillsDataTable } from '@/components/reusable/Bills/data-table'
import { columns } from '@/components/reusable/Bills/columns'
import { IAuthContext, IBillsParams } from '@/app/types/types'
import AIStats from '@/components/reusable/AIStats'
import { GetBills } from '@/lib/billsCalls'
import { AuthContext } from '@/providers/AuthProvider'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import UploadBills from '@/components/reusable/Bills/UploadBills'

async function getData(id: string): Promise<IBillsParams[] | undefined> {
  // Fetch data from your API here.
  let data: IBillsParams[] = []

  return await GetBills(id).then((res) => {
    //console.info("Data from req: ", res)
    if (res.status == 200) {
      data = res.data.bills
      return data
    }
  })

}

const Bills = () => {
  const [data, setData] = useState<IBillsParams[]>([])
  const { authUser } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<Boolean>(false)

  useEffect(() => {
    if (authUser) {
      getData(authUser!.id).then((res) => {
        //console.info("Data for user: ", authUser)
        setData(res!)
      }).catch((err) => {
        console.log("Error")
      })
    }
  }, [authUser])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='flex flex-col w-screen min-h-screen h-full pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='flex w-full h-[10vh]'>
          <p className='text-4xl font-bold mb-auto mr-auto'>COBROS | Facturas</p>
        </div>
        <div className='flex flex-row gap-1 w-full h-[10vh]'>
          <UploadBills />
          <div className='flex w-[20vw] h-full m-auto'>
            <AIStats automatedQty={0} automatedMax={data ? data.length : 0} />
          </div>
        </div>
        <div className='flex w-full'>
          <BillsDataTable columns={columns} data={data} />
        </div>
      </div>
    )
  }
}

export default Bills