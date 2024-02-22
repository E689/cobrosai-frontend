'use client'

// React imports
import React, { useContext, useEffect, useState } from 'react'

// Providers
import { AuthContext } from '@/providers/AuthProvider'

// Components
import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import ProfileForm from '@/components/Views/Profile/UserProfileForm'

// Interfaces
import {
  IAuthContext,
  IUserProfile
} from '@/app/types/types'

// Data calls imports
import { GetProfile } from '@/lib/profileCalls'
import { RunCron } from '@/lib/testCalls'

// Get user profile data function
async function getData(id: string): Promise<IUserProfile | undefined> {
  return await GetProfile(id).then((res) => {
    return res
  })
}

// User profile main component
const UserProfile = () => {
  // Auth context data
  const { authUser, loading } = useContext(AuthContext) as IAuthContext

  // State variables
  const [isMounted, setIsMounted] = useState<Boolean>(false)
  const [data, setData] = useState<IUserProfile | undefined>(undefined)

  // Get initial loading data
  useEffect(() => {
    // I make sure to just make 1 getData.
    // Has to be mounted, not loading and with a valid user.
    if (isMounted && !loading && authUser) {
      getData(authUser.id).then((res) => {
        setData(res!)
      }).catch((err) => {
        console.error("Error: ", err)
      })
    }
  }, [authUser, loading, isMounted])

  const handleRunCron = (userId: string): void => {
    RunCron(userId)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted && !authUser) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='flex flex-col gap-2 w-screen min-h-screen h-full pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='flex w-full h-[10vh]'>
          <p className='text-md md:text-xl lg:text-xl xl:text-4xl font-bold mb-auto mr-auto uppercase'>Perfil | {authUser?.email}</p>
        </div>
        <div className='flex w-full bg-slate-100 dark:bg-blue-950/60 rounded-lg shadow-md'>
          <ProfileForm profileData={data!} userId={authUser?.id!} />
        </div>
        <div
          className='flex w-fit p-2 bg-slate-100 dark:bg-blue-950/60 rounded-lg shadow-md cursor-pointer'
          onClick={() => { handleRunCron(authUser?.id!) }}
        >
          Run Cron
        </div>
      </div>
    )
  }
}

export default UserProfile