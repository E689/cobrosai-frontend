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
import { ChangePassword, Recover, Register, SignIn, SignOut } from "@/lib/authCalls"
import { IAuthContext, IAuthFormProps } from "@/app/types/types"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/providers/AuthProvider"

const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().email(),
  confirm: z.string().min(2).max(50),
  newPassword: z.string().min(2).max(50),
})

const AuthForm = ({ submitText, formType, file }: IAuthFormProps) => {
  // 0. Get Error hooks and set router
  const {
    setError,
    formState: { errors }
  } = useForm()

  // Loading misc
  const [loading, setLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false)
  const { setIsLoggedIn, setAuthUser } = useContext(AuthContext) as IAuthContext

  // Router
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "1234",
      email: "ale.crts1996@gmail.com",
      confirm: "1234",
      newPassword: "12345"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    switch (formType) {
      case "register":
        if (values.password === values.confirm) {
          Register({ email: values.email, password: values.password })
            .then((res) => {
              setLoading(false)
              if (res.statusText === "Created") {
                router.push("/auth/signin")
              } else if (res?.code === "ERR_BAD_REQUEST") {
                setError("formerror", { type: "Mismatch", message: res.response.data?.message })
              }
            })
        } else {
          setLoading(false)
          setError("formerror", { type: "Mismatch", message: "Las contraseñas no coinciden" })
        }
        break;
      case "signin":
        SignIn({ email: values.email, password: values.password })
          .then((res) => {
            setLoading(false)
            if (res.statusText === "OK") {
              setIsLoggedIn(true)
              setAuthUser(res)
            } else if (res?.code === "ERR_BAD_REQUEST") {
              setError("formerror", { type: "Mismatch", message: res.response.data?.error })
            }
          })
        break;
      case "signout":
        if (SignOut() === "OK") {
          setLoading(false)
          setIsLoggedIn(false)
          setAuthUser(null)
        }
        break;
      case "recover":
        Recover({ email: values.email })
          .then((res) => {
            setLoading(false)
            //console.log(res)
            if (res.statusText === "OK") {
              router.push("/auth/signin")
            } else if (res?.code === "ERR_BAD_REQUEST") {
              setError("formerror", { type: "Mismatch", message: res.response.data?.message })
            }
          })
        break;
      case "change":
        if (values.newPassword === values.confirm) {
          ChangePassword({ email: values.email, oldPassword: values.password, newPassword: values.newPassword })
          .then((res) => {
            setLoading(false)
            console.log(res)
            if (res.statusText === "OK") {
              router.push("/dashboard/bills")
            } else if (res?.code === "ERR_BAD_REQUEST") {
              setError("formerror", { type: "Mismatch", message: res.response.data?.message })
            }
          })
        } else {
          setLoading(false)
          setError("formerror", { type: "Mismatch", message: "Las contraseñas muevas no coinciden." })
        }
        break;
      case "quick":
        // TODO: Add quick register call
        console.log("Got this file: ", file)
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/auth/signin"
      default:
        console.log("What are you doing user? STAP!")
        setLoading(true)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (<LoaderSpiner />)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-3" suppressHydrationWarning>
        {
          ["signin", "register", "recover", "quick", "change"].includes(formType) ? (
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
          ["change"].includes(formType) ? (
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Su nueva contraseña para inicio de sesión.
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
        {
          loading ? (
            <LoaderSpiner />
          ) : (
            <Button type="submit">{submitText}</Button>
          )
        }
        {errors.formerror && <FormMessage className='m-auto'>{errors.formerror?.message?.toString()}</FormMessage>}
      </form>
    </Form>
  )
}

export default AuthForm