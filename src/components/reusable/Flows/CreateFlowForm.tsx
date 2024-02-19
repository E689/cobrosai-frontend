"use client"

import React, { useContext, useEffect, useState } from 'react'

// Zod and validation stuff
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// UI components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"
import { IAuthContext, ICreateFlowFormParams, IFlowParams } from '@/app/types/types'
import { AuthContext } from '@/providers/AuthProvider'
import { useRouter } from 'next/router'
import { GetFlow } from '@/lib/flowCalls'
import { Input } from '@/components/ui/input'

// Flows form schema
const formSchema = z.object({
  name: z.string().min(2).max(50),
  preCollection: z.string().min(2).max(500),
  paymentConfirmation: z.string().min(2).max(500),
  paymentConfirmationVerify: z.string().min(2).max(500),
  paymentDelay: z.string().min(2).max(500),
  paymentDelayNewDate: z.string().min(2).max(500),
  collectionIgnored: z.string().min(2).max(500),
})

// If action is edit, get the flow data
const getData = (flowId: string, setData: Function): void => {
  GetFlow(flowId)
    .then((res) => setData(res))
}

const CreateFlowForm = ({ userId, action, flowId }: ICreateFlowFormParams) => {
  // Loading misc
  const [loading, setLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<IFlowParams | undefined>(undefined)
  const { authUser } = useContext(AuthContext) as IAuthContext

  // Router
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<IFlowParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Default",
      preCollection: "",
      paymentConfirmation: "",
      paymentConfirmationVerify: "",
      paymentDelay: "",
      paymentDelayNewDate: "",
      collectionIgnored: "",
    },
    values: data
  })

  function onSubmit(values: IFlowParams) {
    setLoading(true)

    switch (action) {
      case "create":
        // TODO: Add creat call here.
        break;
      case 'edit':
        // TODO: Add edit call here.
        break;
      default:
        console.error("action: ", action)
    }
  }

  // UseEffect to pull data in case action is edit.
  useEffect(() => {
    if (action === "edit" && flowId) {
      getData(flowId, setData)
    }

    // Clean-up to remove unused data.
    return () => {
      setData(undefined)
    }
  }, [action, flowId])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="p-5 flex flex-col gap-3 w-full h-full" 
          suppressHydrationWarning
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preCollection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrucciones pre-cobranza</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Si cliente desea pagar:</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {
            loading ? (
              <LoaderSpiner />
            ) : (
              <Button type="submit">{action === "create" ? ("Guardar") : ("Editar")}</Button>
            )
          }
        </form>
      </Form>
    )
  }
}

export default CreateFlowForm