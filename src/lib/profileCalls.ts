// Axios import
import axios from 'axios'

// Interfaces
import { IUserProfile } from '@/app/types/types'

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get User profile information
export const GetProfile = async (userId: string): Promise<IUserProfile> => {
  return await new Promise<IUserProfile>(async r => {
    await axios.get(
      API_URL + `/users/${userId}`)
      .then((res) => r(res.data.user))
      .catch((err) => r(err))
  })
}

// Set User Profile information
export const SetProfile = async (userId: string, profile: IUserProfile): Promise<string> => {
  const body = {
    companyName: profile.companyName,
    businessLogic: profile.businessLogic,
    assistantContext: profile.assistantContext
  }

  return await new Promise<string>(async r => {
    await axios.put(
      API_URL + `/users/${userId}`,
      body
    )
      .then((res) => r(res.data.message))
      .catch((err) => r(err))
  })
}