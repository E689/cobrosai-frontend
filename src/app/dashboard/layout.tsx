'use client'

import { AuthContext } from "@/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { IAuthContext } from "../types/types"
import { useContext, useEffect } from "react"
import NavBar from "@/components/reusable/NavBar"
import LoaderSpiner from "@/components/reusable/LoaderSpiner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { authUser, loading } = useContext(AuthContext) as IAuthContext

  // Router
  const router = useRouter()

  useEffect(() => {
    if (!loading && !authUser) return (router.push("/auth/signin"))
  }, [authUser, loading, router])

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <LoaderSpiner />
      </div>
    )
  } else {
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
}