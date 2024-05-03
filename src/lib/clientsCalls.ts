import { IClientParams } from '@/app/types/types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get User Clients
export const GetClients = async (token: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/client/`,
      {
        headers: {
          "Authorization": `Token ${token}`
        }
      }
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

// Get Client Data
export const GetClient = async (clientId: string, token: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/client/${clientId}/`,
      {
        headers: {
          "Authorization": `Token ${token}`
        }
      }
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

// Update client info
export const UpdateClient = async (
  client: IClientParams,
  token: string
): Promise<string> => {
  let body = {
    clientId: client.clientId,
    clientName: client.clientName,
    creditDays: client.creditDays,
    clientCollectionSchedule: client.clientCollectionSchedule,
    contactName: client.contactName,
    contactLastName: client.contactLastName,
    email: client.email,
    phone: client.phone,
    aIToggle: client.aIToggle,
    flow: client.flow
  }
  return await new Promise<string>(async r => {
    await axios.post(
      API_URL + `/client/update_client/`,
      body,
      {
        headers: {
          "Authorization": `Token ${token}`
        }
      }
    ).then((res) => {
      r(res.data.message)
    }).catch((err => {
      r(err)
    }))
  })
}