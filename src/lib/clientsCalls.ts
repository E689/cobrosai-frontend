import { IClientParams } from '@/app/types/types'
import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get User Clients
export const GetClients = async (id: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/clients/user/${id}`,
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

// Get Client Data
export const GetClient = async (clientId: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/client/${clientId}`,
    ).then((res) => {
      r(res.data.client)
    }).catch((err => {
      r(err)
    }))
  })
}

// Update client info
export const UpdateClient = async ({
  clientId,
  clientName,
  nit,
  creditDays,
  clientCollectionSchedule,
  contactName,
  contactLastName,
  email,
  phone,
  aIToggle
}: IClientParams): Promise<any> => {
  let body = {
    clientName,
    clientId: nit,
    creditDays,
    clientCollectionSchedule,
    contactName,
    contactLastName,
    email,
    phone,
    ai: aIToggle
  }
  return await new Promise<any>(async r => {
    await axios.put(
      API_URL + `/clients/${clientId}`,
      body
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}