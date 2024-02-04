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
import { IDropZoneEmailForm } from '@/app/types/types'

const formSchema = z.object({
  email: z.string().email()
})

const EmailForm = ({ setEmail, setStep }: IDropZoneEmailForm) => {
  const [isMounted, setIsMounted] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setEmail(values.email)

    setStep("loading")
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<LoaderSpiner />)
  return (
    <div className="w-full max-h-screen p-3 overflow-y-auto">
      <div className='bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-10 w-[30%] m-auto'>
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-3xl font-bold text-center ">Correo Electronico</h3>
          <p className="text-muted-foreground max-w-[25ch] text-center">Ingresa un correo electronico tuyo</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-3" suppressHydrationWarning>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Correo</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Crear cuenta</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EmailForm