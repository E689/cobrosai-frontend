'use client'

import { ThemeToggle } from "@/components/theme/ThemeToggle"
import BackHome from "@/components/misc/BackHome"
import { IAuthContext, ISignInParams } from "../types/types"
import { useContext } from "react"
import { AuthContext } from "@/providers/AuthProvider"

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const user: ISignInParams = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined

  if (user) setIsLoggedIn(true)

  return (
    <div className="min-h-[90vh] md:min-h-[80vh] w-full h-full flex flex-col items-center justify-between p-5 md:p-20">
      <BackHome />
      <ThemeToggle />
      <div className="m-auto">
        {children}
      </div>
    </div>
  )
}