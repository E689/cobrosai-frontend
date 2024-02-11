"use client"

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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"

import { useEffect, useState } from "react"
import { IClientsFormParams } from "@/app/types/types"

const formSchema = z.object({
  clientName: z.string().min(2),
  nit: z.coerce.number().min(6),
  creditDays: z.coerce.number().min(1),
  clientCollectionSchedule: z.string().min(2),
  contactName: z.string().min(2),
  contactlastName: z.string().min(2),
  email: z.string().min(2),
  phone: z.coerce.number().min(8),
  aIToggle: z.coerce.boolean(),
})

const ClientsForm = ({ UID, client }: IClientsFormParams) => {
  const [isMounted, setIsMounted] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: client ? client.clientName : "",
      nit: client ? client.nit : 0,
      creditDays: 0,
      clientCollectionSchedule: "",
      contactName: "",
      contactlastName: "",
      email: "",
      phone: 0,
      aIToggle: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(UID)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<LoaderSpiner />)

  return (
    <div>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-3xl font-bold text-center ">Datos Factura</h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-3" suppressHydrationWarning>
          <div className="grid grid-cols-2 grid-flow-row gap-8">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Nombre de la empresa</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>NIT receptor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Días crédito</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientCollectionSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Horario cobros</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Nombre contacto</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactlastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Apellido contacto</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Correo electronico contacto</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Teléfono contacto</FormLabel>
                  <FormControl>
                    <Input type="phone" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aIToggle"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel className='font-bold my-auto pr-2'>Estado IA: </FormLabel>
                  <FormControl >
                    <Switch 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      className="!my-auto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Actualizar Cliente</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ClientsForm