'use client'

import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { AuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"
import { IAuthContext } from "../types/types"
import { useContext } from "react"
import BackHome from "@/components/misc/BackHome"

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn } = useContext(AuthContext) as IAuthContext

  if (isLoggedIn) {
    return (redirect("/dashboard"))
  }
  return (
    <div className="min-h-[80vh] w-full h-full flex flex-col items-center justify-between p-20">
      <BackHome />
      <ThemeToggle />
      <div className="m-auto">
        {children}
      </div>
    </div>
  )
}