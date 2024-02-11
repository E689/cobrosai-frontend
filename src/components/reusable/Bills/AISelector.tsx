'use client'

import { IAISelector, IAIStatuses, IAuthContext } from "@/app/types/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthContext } from "@/providers/AuthProvider"

import React, { useContext, useEffect, useState } from 'react'

const AISelector = ({ defaultValue, billId, clientId }: IAISelector) => {
  const [value, setValue] = useState<string>(defaultValue.toString())
  const { authUser } = useContext(AuthContext) as IAuthContext
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const getAIColor = (value: string): string => {
    switch (value) {
      case "AIOff":
        return "bg-gray-400"
      case "Human":
        return "bg-blue-400"
      case "Paid":
        return "bg-green-400"
      case "Process":
        return "bg-yellow-400"
      case "Anulada":
        return "bg-red-400"
      default:
        return ""
    }
  }

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
        className={
          `m-auto p-1 rounded-md w-full font-medium
           ${getAIColor(value)}`
        }
      >
        <p className="m-auto text-black">{value}</p>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="AIOff">AIOff</SelectItem>
        <SelectItem value="Human">Human</SelectItem>
        <SelectItem value="Paid">Paid</SelectItem>
        <SelectItem value="Process">Process</SelectItem>
        <SelectItem value="Anulada">Anulada</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default AISelector