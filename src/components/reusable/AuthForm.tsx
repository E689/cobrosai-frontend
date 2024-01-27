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

// Requests imports
import { SignIn, SignOut } from "@/lib/authCalls"
import { IAuthContext, IAuthFormProps } from "@/app/types/types"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"

const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().email(),
  confirm: z.string().min(2).max(50)
})

const AuthForm = ({ submitText, formType, file }: IAuthFormProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { setIsLoggedIn, setAuthUser } = useContext(AuthContext) as IAuthContext

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "1234",
      email: "test@cobros.ia",
      confirm: "1234"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    switch (formType) {
      case "signin":
        SignIn({ email: values.email, password: values.password })
        .then((res) => {
          setIsLoggedIn(true)
          setAuthUser(res)
        })
        break;
      case "signout":
        const JWT = "test-jwt"
        SignOut({ jwt: JWT })
        .then((res) => {
          setIsLoggedIn(false)
          setAuthUser(null)
        })
        break;
      case "quick":
        // TODO: Add quick register call
        console.log("Got this file: ", file)
        window.location.replace(process.env.NEXT_PUBLIC_BASE_URL + "/auth/signin")
      default:
        console.log("What are you doing user? STAP!")
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return(<LoaderSpiner />)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-3" suppressHydrationWarning>
        {
          ["signin", "register", "recover", "quick"].includes(formType) ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Correo Electronico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Correo electronico para inicio de sesión.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (<></>)
        }
        {
          ["signin", "register", "change"].includes(formType) ? (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contraseña para inicio de sesión.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (<></>)
        }
        {
          ["register", "change"].includes(formType) ? (
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Repita su contraseña.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (<></>)
        }
        <Button type="submit">{ submitText }</Button>
      </form>
    </Form>
  )
}

export default AuthForm