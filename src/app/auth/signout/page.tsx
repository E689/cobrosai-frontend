import { AuthFormProps } from '@/app/types/types'
import AuthForm from '@/components/reusable/AuthForm'
import React from 'react'

const SignOut = () => {
  const AUTH_FORM_PROPS: AuthFormProps = {
    submitText: "Cerrar Sesión",
    formType: "signout"
  }

  return (
    <div className='m-auto bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-10'>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-3xl font-bold text-center ">Cerrar Sesión</h3>
      </div>
      <AuthForm
        submitText={AUTH_FORM_PROPS.submitText}
        formType={AUTH_FORM_PROPS.formType}
      />
    </div>
  )
}

export default SignOut