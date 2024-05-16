// Axios import
import axios from 'axios'

// Interfaces
import { IUserProfile } from '@/app/types/types'

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get User profile information
export const GetProfile = async (token: string): Promise<IUserProfile> => {
  return await new Promise<IUserProfile>(async r => {
    await axios.get(
      API_URL + `/user/user_extended/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => r(res.data))
      .catch((err) => r(err))
  })
}

// Set User Profile information
export const SetProfile = async (token: string, profile: IUserProfile): Promise<string> => {

  return await new Promise<string>(async r => {
    await axios.post(
      API_URL + `/user/update_user/`,
      profile,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => r(res.data.message))
      .catch((err) => r(err))
  })
}