"use client"

import React, { useEffect, useState } from 'react'

// Zod and validation stuff
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// UI components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"
import { ICreateFlowFormParams, IFlowParams } from '@/app/types/types'
import { AddFlow, EditFlow, GetFlow } from '@/lib/flowCalls'
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
const getFlow = (flowId: string, setData: Function): void => {
  GetFlow(flowId)
    .then((res) => {
      console.log("Data res: ", res)
      setData(res)
    })
}

const editFlow = (flowId: string, flow: IFlowParams, setData: Function): void => {
  EditFlow(flowId, flow)
  .then((res) => {
    console.log("Data: ", res)
    setData(undefined)
  })
}

// If action is create, add the flow to the user.
const createFlow = (userId: string, flow: IFlowParams, setData: Function): void => {
  AddFlow(userId, flow)
  .then((res) => {
    console.log("Data: ", res)
    setData(undefined)
  })
}

const CreateFlowForm = ({ userId, action, flowId }: ICreateFlowFormParams) => {
  // Loading misc
  const [loading, setLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<IFlowParams | undefined>(undefined)

  // 1. Define your form.
  const form = useForm<IFlowParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Nuevo Flujo",
      preCollection: "Enviar correo recordando del pago 5 dias previos a la fecha.",
      paymentConfirmation: "Indicarle al cliente que envie la confirmacion de su pago y espere una respuesta.",
      paymentConfirmationVerify: "Indicarle al cliente que se ha verificado su pago, agradecer y notificarle al sistema.",
      paymentDelay: "Indicarle al cliente 1 dia despues de la fecha de pago, que no ha realizado su pago.",
      paymentDelayNewDate: "Verificar que la nueva fecha de pago NO sea mayor a 7 días de la anterior. Si lo es, indicarle que no se le puede dar mas de 7 dias.",
      collectionIgnored: "Enviarle un correo y un whatsapp al cliente recordando que tiene facturas vencidas y que no ha dado respuesta, que se le cortara el subministro del servicio.",
    },
    values: data
  })

  function onSubmit(values: IFlowParams) {
    setLoading(true)
    console.log(values)
    console.log(data)

    switch (action) {
      case "create":
        // TODO: Add create call here.
        if (values) {
          createFlow(userId, values, setData)
        }
        setLoading(false)
        break;
      case 'edit':
        if (values) {
          editFlow(data?._id!, values, setData)
        }
        setLoading(false)
        break;
      default:
        console.error("action: ", action)
    }
  }

  // UseEffect to pull data in case action is edit.
  useEffect(() => {
    //console.log(userId, flowId, action, data)
    if (action === "edit" && flowId) {
      console.log("edit")
      getFlow(flowId, setData)
    }

    if (action === "create") {
      console.log("create")
      setData({
        name: "Nuevo Flujo"
      })
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
          <FormField
            control={form.control}
            name="paymentConfirmationVerify"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Si cliente pago y esta esperando verificacion:</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDelay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Si el cliente retrazo el pago:</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDelayNewDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Si el cliente da nueva fecha de pago:</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionIgnored"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Si el cliente ignora mensajes:</FormLabel>
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