import { 
  IBillLogData, 
  ICreateBillManuallyParams 
} from '@/app/types/types'
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

export const CreateBillsFromXls = async (id: string, file: File): Promise<any> => {
  let body = new FormData()
  body.append("userId", id!)
  body.append("file", file!)

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/bills/file',
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

export const CreateBillManually = async ({
  amount,
  date,
  clientId,
  clientName,
  billId,
  userId
}: ICreateBillManuallyParams): Promise<any> => {
  let body = {
    amount: amount,
    date: date,
    clientId: clientId,
    clientName: clientName,
    billId: billId,
    userId: userId
  }

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/bills',
      body,
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

// Get Bill Log data
export const GetBillLog = async (billId: string): Promise<IBillLogData[]> => {
  return await new Promise<IBillLogData[]>(async r => {
    await axios.get(
      API_URL + `/bills/log/${billId}`,
    ).then((res) => {
      r(res.data.log)
    }).catch((err => {
      r(err)
    }))
  })
}

// Get Bill Log data
export const GetBillsByClient = async (nit: string, UID: string): Promise<any> => {
  const body = {
    userId: UID,
    nit: nit
  }

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + `/bills/client`,
      body
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err)
    }))
  })
}