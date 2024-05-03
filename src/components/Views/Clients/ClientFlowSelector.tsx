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
import { toast } from "react-toastify";

// API Calls
import { UpdateClient, GetClient } from "@/lib/clientsCalls"
import { GetFlows } from "@/lib/flowCalls"

// Providers
import { AuthContext } from "@/providers/AuthProvider"

// If action is edit, get the flow data
async function getData(token: string): Promise<IFlowParams[] | undefined> {
  return await GetFlows(token)
    .then((res) => {
      if (res.status !== 200) {
        toast.error("No se encontro el flujo.")
      } else {
        return res.data as IFlowParams[]
      }
    })
}

// Get selected client data to modify it.
async function getClient(clientId: string, token: string): Promise<IClientParams | undefined> {
  return await GetClient(clientId, token)
  .then((res) => {
    if (res.status !== 200) {
      toast.error("No se encontraron clientes.")
    } else {
      return res.data as IClientParams
    }
  })
}

const ClientFlowSelector = ({ defaultValue, clientId }: IClientFlowSelector) => {
  // Auth provider
  const { authUser, loading } = useContext(AuthContext) as IAuthContext

  // State values
  const [value, setValue] = useState<{ name: string, id: number }>({ name: "Default", id: -1 })
  const [data, setData] = useState<IFlowParams[]>([])
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [clientData, setClientData] = useState<IClientParams | undefined>(undefined)

  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      // TODO: Fix rerender of this component on the sorting of the table.
      getData(authUser.token).then((res) => {
        setData(res!)
      }).catch((err) => {
        toast.error("No se encontro informacion.")
        console.error("Error: ", err)
      })
      getClient(clientId, authUser.token).then((res: IClientParams | undefined) => {
        setClientData(res)
      })
    }
  }, [authUser, loading, isMounted, clientId])

  useEffect(() => {
    if (clientData && value.id !== -1 && authUser?.token) {
      const res = UpdateClient(clientData!, authUser?.token)
        .then((res) => res)
    }
  }, [clientData, value, defaultValue, authUser])

  useEffect(() => {
    if (clientData && data && data.length > 0) {
      data.map((flow: IFlowParams) => {
        if (flow.id === clientData.flow) {
          setValue({
            name: flow.name,
            id: flow.id!
          })
        }
      })
    }
  }, [clientData, data])

  const handleOnChange = (e: any) => {
    // TODO: Update Bill status
    setClientData(prevState => ({ ...prevState!, flow: e }))
    data.map((flow: IFlowParams) => {
      if (flow.id.toString() === e) {
        setValue({
          name: flow.name,
          id: flow.id
        })
      }
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<>{defaultValue}</>)
  else {
    return (
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
            (data && data.length > 0) ? (
              data.map((flow, index) => {
                return (<SelectItem key={index} value={flow.id!.toString()}>{flow.name}</SelectItem>)
              })
            ) : (<SelectItem value="Default">Default</SelectItem>)
          }

        </SelectContent>
      </Select>
    )
  }
}

export default ClientFlowSelector