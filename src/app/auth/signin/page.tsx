'use client'

import { IAuthFormProps, IAuthContext } from '@/app/types/types'
import AuthForm from '@/components/reusable/AuthForm'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from "@/providers/AuthProvider"
import { useRouter } from "next/navigation"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"

const SignIn = () => {
  const { isLoggedIn, loading } = useContext(AuthContext) as IAuthContext

  // Router
  const router = useRouter()

  const AUTH_FORM_PROPS: IAuthFormProps = {
    submitText: "Inicio Sesión",
    formType: "signin"
  }

  useEffect(() => {
    if (!loading && isLoggedIn) return (router.back())
  }, [isLoggedIn, loading, router])

  if (loading) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='m-auto bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-10'>
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-3xl font-bold text-center ">Inicia Sesión</h3>
          <p className="text-muted-foreground max-w-[25ch] text-center">Ingresa tus credenciales en el formulario de abajo</p>
        </div>
        <AuthForm
          submitText={AUTH_FORM_PROPS.submitText}
          formType={AUTH_FORM_PROPS.formType}
        />
      </div>
    )
  }
}

export default SignIn