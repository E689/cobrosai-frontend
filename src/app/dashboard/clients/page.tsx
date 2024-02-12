'use client'

import React, { useEffect, useState, useContext } from 'react'

// Data table stuff
import { ClientsDataTable } from '@/components/reusable/Clients/data-table'
import { columns } from '@/components/reusable/Clients/columns'
import { IAuthContext, IClientExtendedParams } from '@/app/types/types'
import AIStats from '@/components/reusable/AIStats'
import { GetClients } from '@/lib/clientsCalls'
import { AuthContext } from '@/providers/AuthProvider'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'

async function getData(id: string): Promise<IClientExtendedParams[] | undefined> {
  // Fetch data from your API here.
  let data: IClientExtendedParams[] = []

  return await GetClients(id).then((res) => {
    //console.info("Data from req: ", res)
    if (res.status == 200) {
      data = res.data.clients
      return data
    }
  })

}

const Clients = () => {
  const [data, setData] = useState<IClientExtendedParams[]>([])
  const { authUser, loading } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<Boolean>(false)

  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      getData(authUser!.id).then((res) => {
        console.info("User: ", authUser)
        console.info("Response: ", res)
        setData(res!)
      }).catch((err) => {
        console.log("Error")
      })
    }
  }, [authUser, loading, isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='flex flex-col w-screen min-h-screen h-full pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='flex w-full h-[10vh]'>
          <p className='text-4xl font-bold mb-auto mr-auto'>EMPRESAS | Deudores</p>
        </div>
        <div className='flex flex-row gap-1 w-full h-[10vh]'>
          <div className='flex grow'>
            {/**<ClientsStats /> */}
          </div>
          <div className='flex w-[20vw] h-full m-auto'>
            <AIStats automatedQty={0} automatedMax={data ? data.length : 0} />
          </div>
        </div>
        <div className='flex w-full'>
          <ClientsDataTable columns={columns} data={data} />
        </div>
      </div>
    )
  }
}

export default Clients