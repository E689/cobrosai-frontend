'use client'

import { AuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"
import { IAuthContext } from "../types/types"
import { useContext, useEffect } from "react"
import NavBar from "@/components/reusable/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { authUser } = useContext(AuthContext) as IAuthContext

  useEffect(()=> {
    if (!authUser) return (redirect("/auth/signin"))
  }, [authUser])

  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] w-full h-full flex flex-col items-center justify-between">
        <div className="m-auto">
          {children}
        </div>
      </div>
    </div>
  )
}