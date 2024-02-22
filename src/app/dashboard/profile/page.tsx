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

// Get user profile data function
async function getData(id: string): Promise<IUserProfile | undefined> {
  return await GetProfile(id).then((res) => {
    console.info("Data from req: ", res)
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
        console.info("User: ", authUser)
        console.info("Response: ", res)
        setData(res!)
      }).catch((err) => {
        console.log("Error: ", err)
      })
    }
  }, [authUser, loading, isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted && !authUser) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className='flex flex-col w-screen min-h-screen h-full pt-[7vh] px-8 bg-slate-200 dark:bg-blue-950/20'>
        <div className='flex w-full h-[10vh]'>
          <p className='text-md md:text-xl lg:text-xl xl:text-4xl font-bold mb-auto mr-auto uppercase'>Perfil | {authUser?.email}</p>
        </div>
        <div className='flex w-full'>
          {/**TODO: Add profile form here. */}
          <ProfileForm profileData={data!} userId={authUser?.id!} />
        </div>
      </div>
    )
  }
}

export default UserProfile