import { IFlowChat, IFlowNewChat, IFlowParams } from '@/app/types/types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get specific Flow
export const GetFlow = async (flowId: number, token: string): Promise<IFlowParams> => {
  return await new Promise<IFlowParams>(async r => {
    await axios.get(
      API_URL + `/flow/${flowId}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    .then((res) => r(res.data))
    .catch((err) => r(err.response))
  })
}

// Get all Flows for userId
export const GetFlows = async (token: string): Promise<IFlowParams[]> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/flow/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    .then((res) => r(res.data))
    .catch((err) => r(err.response))
  })
}

// Add Flow
export const AddFlow = async (token: string, flow: IFlowParams): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + `/flow/`,
      flow,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err.response)
    }))
  })
}

// Edit Flow
export const EditFlow = async (
  flowId: number, 
  flow: IFlowParams, 
  token: string
): Promise<any> => {

  return await new Promise<any>(async r => {
    await axios.patch(
      API_URL + `/flow/${flowId}/`,
      flow,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err.response)
    }))
  })
}

// Get Flow chat.
export const GetFlowChat = async (flowId: number): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/flow/test/${flowId}`)
    .then((res) => r(res))
    .catch((err) => r(err.response))
  })
}

// Send Flow test chat message
export const SendFlowTestMessage = async (id: number, text: string, token: string): Promise<IFlowChat> => {
  return await new Promise<IFlowChat>(async r => {
    return await axios.post(
      API_URL + '/flow/chat/',
      {
        flow: id,
        text
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err)
    }))
  })
}

// Delete current chat history.
export const DeleteFlowChat = async (flowId: number): Promise<string> => {
  return await new Promise<any>(async r => {
    await axios.delete(
      API_URL + `/flow/test/${flowId}`)
    .then((res) => r(res))
    .catch((err) => r(err.response))
  })
}
