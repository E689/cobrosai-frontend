'use client'

// React imports
import React, { useContext, useEffect, useState } from 'react'

// Interfaces
import { 
  IClientFlowSelector, 
  IAuthContext, 
  IFlowParams, 
  IClientParams 
} from "@/app/types/types"

// ShadCN imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

// API Calls
import { UpdateClient, GetClient } from "@/lib/clientsCalls"
import { GetFlows } from "@/lib/flowCalls"

// Providers
import { AuthContext } from "@/providers/AuthProvider"

// If action is edit, get the flow data
async function getData(id: string): Promise<IFlowParams[] | undefined> {
  return await GetFlows(id).then((res) => {
    return res
  })
}

// Get selected client data to modify it.
async function getClient(clientId: string): Promise<IClientParams> {
  return await GetClient(clientId).then((res) => res)
}

const ClientFlowSelector = ({ defaultValue, clientId }: IClientFlowSelector) => {
  // Auth provider
  const { authUser, loading } = useContext(AuthContext) as IAuthContext

  // State values
  const [value, setValue] = useState<{name: string, id: string}>({name:"Default", id:"-1"})
  const [data, setData] = useState<IFlowParams[]>([])
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [clientData, setClientData] = useState<IClientParams | undefined>(undefined)

  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      getData(authUser.id).then((res) => {
        setData(res!)
      }).catch((err) => {
        console.error("Error: ", err)
      })
      getClient(clientId).then((res: IClientParams) => {
        setClientData(res)
      })
    }
  }, [authUser, loading, isMounted, clientId])

  useEffect(() => {
    if (clientData && value.id !== "-1") {
      const res = UpdateClient(clientData!).then((res) => res)
    }
  }, [clientData, value, defaultValue])

  useEffect(() => {
    if (clientData) {
      data.map((flow: IFlowParams) => {
        if (flow._id === clientData.flow) {
          setValue({
            name: flow.name,
            id: flow._id!
          })
        }
      })
    }
  }, [clientData, data])

  const handleOnChange = (e: string) => {
    // TODO: Update Bill status
    setClientData(prevState => ({...prevState!, flow: e}))
    data.map((flow: IFlowParams) => {
      if (flow._id === e) {
        setValue({
          name: flow.name,
          id: flow._id
        })
      }
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<>{defaultValue}</>)
  else return (
    <Select
      onValueChange={handleOnChange}
    >
      <SelectTrigger
        className="m-auto p-1 rounded-md w-fit px-2 font-medium"
      >
        <p className="my-auto mx-2">{value.name}</p>
      </SelectTrigger>
      <SelectContent>
        {
          data ? (
            data.map((flow, index) => {
              return (<SelectItem key={index} value={flow._id!}>{flow.name}</SelectItem>)
            })
          ) : (<SelectItem value="Default">Default</SelectItem>)
        }
        
      </SelectContent>
    </Select>
  )
}

export default ClientFlowSelector