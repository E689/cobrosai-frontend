'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { IAuthContext, IUserAccount } from '@/app/types/types';

export const AuthContext = createContext<IAuthContext | null>(null)

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [authUser, setAuthUser] = useState<null | IUserAccount>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user: IUserAccount = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined
    if (user) {
      console.log("Auth provider set the user: ", user)
      setIsLoggedIn(true)
      setAuthUser(user)
    } else {
      console.log("Auth provider didn't found a user.")
      setIsLoggedIn(false)
      setAuthUser(null)
    }
  }, [])

  const value: IAuthContext = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}