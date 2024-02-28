import { IFlowChat, IFlowParams } from '@/app/types/types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get specific Flow
export const GetFlow = async (flowId: string): Promise<IFlowParams> => {
  return await new Promise<IFlowParams>(async r => {
    await axios.get(
      API_URL + `/flows/${flowId}`)
    .then((res) => r(res.data.flow))
    .catch((err) => r(err))
  })
}

// Get all Flows for userId
export const GetFlows = async (userId: string): Promise<IFlowParams[]> => {
  return await new Promise<IFlowParams[]>(async r => {
    await axios.get(
      API_URL + `/flows/user/${userId}`)
    .then((res) => r(res.data.flows))
    .catch((err) => r(err))
  })
}

// Add Flow
export const AddFlow = async (UID: string, flow: IFlowParams): Promise<any> => {
  const body = {
    userId: UID,
    flow: flow
  }

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + `/flows`,
      body
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err)
    }))
  })
}

// Edit Flow
export const EditFlow = async (flowId: string, flow: IFlowParams): Promise<any> => {
  const body = {
    flow: flow
  }

  return await new Promise<any>(async r => {
    await axios.put(
      API_URL + `/flows/${flowId}`,
      body
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err)
    }))
  })
}

// Get Flow chat.
export const GetFlowChat = async (flowId: string): Promise<any> => {
  return await new Promise<IFlowChat[]>(async r => {
    await axios.get(
      API_URL + `/flow/test/${flowId}`)
    .then((res) => r(res.data.testLog))
    .catch((err) => r(err))
  })
}

// Send Flow test chat message
export const SendFlowTestMessage = async (id: string, text: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/flow/test',
      {
        id,
        text
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

// Delete current chat history.
export const DeleteFlowChat = async (flowId: string): Promise<string> => {
  return await new Promise<string>(async r => {
    await axios.delete(
      API_URL + `/flow/test/${flowId}`)
    .then((res) => r(res.data.message))
    .catch((err) => r(err))
  })
}
