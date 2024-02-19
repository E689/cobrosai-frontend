import { IFlowParams } from '@/app/types/types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get specific Flow
export const GetFlow = async (flowId: string): Promise<IFlowParams> => {
  return await new Promise<IFlowParams>(async r => {
    await axios.get(
      API_URL + `/flows/${flowId}`)
    .then((res) => r(res.data))
    .catch((err) => r(err))
  })
}

// Get all Flows for userId
export const GetFlows = async (userId: string): Promise<IFlowParams[]> => {
  return await new Promise<IFlowParams[]>(async r => {
    await axios.get(
      API_URL + `/flows/user/${userId}`)
    .then((res) => r(res.data))
    .catch((err) => r(err))
  })
}