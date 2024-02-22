"use client"

// React stuff
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'

// Components
import LoaderSpiner from "@/components/reusable/LoaderSpiner"

// Interfaces
import { IUserProfile } from '@/app/types/types'

// API Calls
import { SetProfile } from '@/lib/profileCalls'

// Flows form schema
const formSchema = z.object({
  companyName: z.string().min(2).max(50),
  businessLogic: z.string().min(10).max(500),
  assistantContext: z.string().min(10).max(500)
})

// Set profile data
function SetData(id: string, data: IUserProfile): void {
  SetProfile(id, data).then((res: any) => {
    console.info("Data from req: ", res)
  })
}

const ProfileForm = ({ profileData, userId }: { profileData: IUserProfile, userId: string }) => {
  // Loading misc
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 1. Define your form.
  const form = useForm<IUserProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "Nombre Empresa",
      businessLogic: "Somos una empresa que vende productos.",
      assistantContext: "Eres un asistente de ventas que se llama Jose Pérez, tienes 30 años y tratas con mucha amabilidad a los clientes, tu trabajo principal es realizar la cobranza de facturas.",
    },
    values: profileData
  })

  // 2. On submit function
  function onSubmit(values: IUserProfile) {
    setLoading(true)

    SetData(userId, values)
  }

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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Nombre de la empresa</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  El nombre de la empresa que realizará la cobranza.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessLogic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Giro de negocio</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Indicar la accion principal de la empresa, venta de productos o prestacion de servicios.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assistantContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Contexto del asistente</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Dale un nombre a tu asistente, indica campos que deseas agregar para mejorar su comportamiento.
                </FormDescription>
              </FormItem>
            )}
          />
          {
            loading ? (
              <LoaderSpiner />
            ) : (
              <Button type="submit" className='w-[30%] ml-auto'>Actualizar</Button>
            )
          }
        </form>
      </Form>
    )
  }
}

export default ProfileForm