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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"

import { useEffect, useState } from "react"
import { IDropZoneBillForm } from '@/app/types/types'

const formSchema = z.object({
  date: z.string().min(2),
  invoiceNo: z.string().min(1),
  nit: z.coerce.number().min(6),
  amount: z.coerce.number().min(1),
  companyName: z.string().optional()
})

const BillForm = ({ setDate, setInvoiceNo, setNIT, setAmount, setCompanyName, setStep }: IDropZoneBillForm) => {
  const [isMounted, setIsMounted] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      invoiceNo: "",
      nit: 0,
      amount: 0,
      companyName: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setDate(values.date)
    setInvoiceNo(values.invoiceNo)
    setNIT(values.nit)
    setAmount(values.amount)
    setCompanyName(values.companyName)

    if (setStep) setStep("emailForm")
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Fecha Emision</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Fecha donde se emitio la factura.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>No. Factura</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Numero de factura.
                </FormDescription>
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
                <FormDescription>
                  NIT del receptor de la factura.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Monto total</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Monto total de la factura emitida.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Nombre Empresa</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre de la empresa receptora.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Crear factura</Button>
        </form>
      </Form>
    </div>
  )
}

export default BillForm