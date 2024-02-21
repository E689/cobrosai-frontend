'use client'

import React, { useEffect, useState, useContext } from 'react'

// Data table stuff
import { BillsDataTable } from '@/components/Views/Bills/data-table'
import { columns } from '@/components/Views/Bills/columns'
import { IAuthContext, IBillsParams } from '@/app/types/types'
import { GetBillsByClient } from '@/lib/billsCalls'
import { AuthContext } from '@/providers/AuthProvider'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'

async function getData(uid: string, nit: string): Promise<IBillsParams[]> {
  // TODO: Change this call for a specific client bills
  return await GetBillsByClient(nit, uid)
  .then((res) => {
    return res.bills
  })
}

const ClientDetail = ({ params }: { params: { clientId: string } }) => {
  const [data, setData] = useState<IBillsParams[]>([])
  const { authUser, loading } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<Boolean>(false)

  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      getData(authUser.id, params.clientId).then((res) => {
        console.info("User: ", authUser)
        console.info("Response: ", res)
        setData(res)
      }).catch((err) => {
        console.log("Error")
      })
    }
  }, [authUser, loading, isMounted, params])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='flex flex-col w-screen min-h-screen h-full pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='flex w-full h-[10vh]'>
          <p className='text-4xl font-bold mb-auto mr-auto'>{params.clientId} | {data && data.length > 0 ? data[0].clientName : ""}</p>
        </div>
        <div className='flex flex-row gap-1 w-full h-[10vh]'>
          <div className='grow'>
            {/**
             * TODO: Build the client stats component.
             */}
          </div>
        </div>
        <div className='flex w-full'>
          <BillsDataTable columns={columns} data={data} />
        </div>
      </div>
    )
  }
}

export default ClientDetail