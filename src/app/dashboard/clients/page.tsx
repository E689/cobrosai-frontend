'use client'

import React, { useEffect, useState, useContext } from 'react'

// Data table stuff
import { ClientsDataTable } from '@/components/Views/Clients/data-table'
import { columns } from '@/components/Views/Clients/columns'
import { IAuthContext, IClientExtendedParams } from '@/app/types/types'
import AIStats from '@/components/reusable/AIStats'
import { GetClients } from '@/lib/clientsCalls'
import { AuthContext } from '@/providers/AuthProvider'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'

async function getData(token: string, setClientsAiOn: Function): Promise<IClientExtendedParams[] | undefined> {
  // Fetch data from your API here.
  let data: IClientExtendedParams[] = []

  return await GetClients(token).then((res) => {
    if (res.status == 200) {
      setClientsAiOn(0)
      data = res.data
      return data
    }
  })

}

const Clients = () => {
  const [data, setData] = useState<IClientExtendedParams[]>([])
  const { authUser, loading } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<Boolean>(false)
  const [clientsAiOn, setClientsAiOn] = useState<number>(0)

  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      getData(authUser.token, setClientsAiOn).then((res) => {
        setData(res!)
      }).catch((err) => {
        console.error("Error: ", err)
        return err
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
            <AIStats automatedQty={clientsAiOn} automatedMax={data ? data.length : 0} />
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