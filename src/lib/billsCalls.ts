import {
  IBillsParams,
  IUserAccount
} from "@/app/types/types"

import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get Bills
export const GetBills = async (id: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/bills/${id}`,
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}
