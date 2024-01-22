'use client'

import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { AuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"
import { IAuthContext, ISignInParams } from "../types/types"
import { useContext } from "react"
import BackHome from "@/components/misc/BackHome"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn } = useContext(AuthContext) as IAuthContext
  const user: ISignInParams = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined

  if (!isLoggedIn && !user) {
    return (redirect("/auth/signin"))
  }
  return (
    <div className="min-h-[80vh] w-full h-full flex flex-col items-center justify-between p-20">
      <BackHome />
      <ThemeToggle />
      <div>
        <p> Hola: {user.email}</p>
      </div>
      <div className="m-auto">
        {children}
      </div>
    </div>
  )
}