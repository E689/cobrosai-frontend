'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { IAuthContext, IUserAccount } from '@/app/types/types';

export const AuthContext = createContext<IAuthContext | null>(null)

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [authUser, setAuthUser] = useState<null | IUserAccount>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const user: IUserAccount = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined

    if (user) {
      setIsLoggedIn(true)
      setAuthUser(user)
      setIsLoading(false)
    } else {
      console.info("Auth provider didn't found a user.")
      setIsLoggedIn(false)
      setAuthUser(null)
      setIsLoading(false)
    }
  }, [])

  const value: IAuthContext = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}