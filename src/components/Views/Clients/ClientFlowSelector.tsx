'use client'

import { IClientFlowSelector, IAuthContext } from "@/app/types/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { AuthContext } from "@/providers/AuthProvider"

import React, { useContext, useEffect, useState } from 'react'

const ClientFlowSelector = ({ defaultValue, clientId }: IClientFlowSelector) => {
  const [value, setValue] = useState<string>("Default")
  const { authUser } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const handleOnChange = (e: string) => {
    // TODO: Update Bill status
    setValue(e)
    // Call EP to update bill status.
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<>{defaultValue}</>)
  else return (
    <Select
      defaultValue={value}
      onValueChange={handleOnChange}
    >
      <SelectTrigger
        className="m-auto p-1 rounded-md w-fit px-2 font-medium"
      >
        <p className="my-auto mx-2">{value}</p>
      </SelectTrigger>
      <SelectContent>
        {/**
         * TODO: build these values dynamically.
         */}
        <SelectItem value="Default">Default</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ClientFlowSelector