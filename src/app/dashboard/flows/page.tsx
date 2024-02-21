'use client'

import React, { useContext, useEffect, useState } from 'react'

import { FlowsDataTable } from '@/components/Views/Flows/data-table'
import { IAuthContext, IFlowParams } from "@/app/types/types"
import { AuthContext } from '@/providers/AuthProvider'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import { columns } from '@/components/Views/Flows/columns'
import Collection from '@/components/Views/Flows/Collection'
import { GetFlows } from '@/lib/flowCalls'


async function getData(id: string): Promise<IFlowParams[] | undefined> {
  // Fetch data from your API here.
  //let data: IFlowParams[]
  
  return await GetFlows(id).then((res) => {
    //console.info("Data from req: ", res)
    return res
  })
}

const Page = () => {
  const [data, setData] = useState<IFlowParams[]>([])
  const { authUser, loading } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<Boolean>(false)
  const [selectedFlow, setSelectedFlow] = useState<IFlowParams | undefined>(undefined)
  const [action, setAction] = useState<"edit" | "create">("edit")

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

  const selectFlow = (index: string) => {
    if (index === "Nuevo") {
      setSelectedFlow({
        name: "Nuevo"
      })
    } else {
      setSelectedFlow(data[Number(index)])
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='w-full min-h-screen flex flex-col md:flex-row gap-8 pt-[7vh] pb-[2vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='min-w-[30%] max-h-screen overflow-y-auto h-fit bg-slate-100 dark:bg-blue-950/60 rounded-lg shadow-md py-4 px-2'>
          <FlowsDataTable
            selectFlow={selectFlow}
            setAction={setAction}
            columns={columns}
            data={data}
          />
        </div>
        <div className='w-full bg-slate-100 dark:bg-blue-950/60 rounded-lg shadow-md grow'>
          {
            /**
           * TODO: Display Flow information component
           */
            selectedFlow && authUser ? (
              <Collection
                userId={authUser.id}
                flowId={selectedFlow._id}
                action={action}
              />
            ) : (<></>)
          }
        </div>
      </div>
    )
  }
}

export default Page