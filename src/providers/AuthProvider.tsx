'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'
import { IAuthContext } from '@/app/types/types';

export const AuthContext = createContext<IAuthContext | null>(null)

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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