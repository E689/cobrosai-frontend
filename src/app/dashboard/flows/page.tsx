'use client'

import React, { useContext, useEffect, useState } from 'react'

// UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import { columns } from '@/components/Views/Flows/columns'
import Collection from '@/components/Views/Flows/Collection'
import { FlowsDataTable } from '@/components/Views/Flows/data-table'

import { IAuthContext, IFlowParams } from "@/app/types/types"
import { AuthContext } from '@/providers/AuthProvider'
import { GetFlows } from '@/lib/flowCalls'
import FlowTestChat from '@/components/Views/Flows/FlowTestChat'


async function getData(token: string): Promise<IFlowParams[] | undefined> {
  return await GetFlows(token).then((res) => {
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
      getData(authUser.token).then((res) => {
        setData(res!)
      }).catch((err) => {
        console.error("Error: ", err)
      })
    }
  }, [authUser, loading, isMounted])

  const selectFlow = (index: string) => {
    if (index === "Nuevo") {
      setSelectedFlow({
        id: 0,
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
              <Tabs defaultValue='flow' className='w-full h-full'>
                <TabsList className='mx-8 mt-4'>
                  <TabsTrigger value='flow'>Flujo</TabsTrigger>
                  <TabsTrigger value='chat'>Chat</TabsTrigger>
                </TabsList>
                <TabsContent value='flow'>
                  <Collection
                    userId={authUser.token}
                    flowId={selectedFlow.id}
                    action={action}
                  />
                </TabsContent>
                <TabsContent value='chat'>
                  <FlowTestChat flowId={selectedFlow.id!}/>
                </TabsContent>
              </Tabs>
            ) : (<></>)
          }
        </div>
      </div>
    )
  }
}

export default Page