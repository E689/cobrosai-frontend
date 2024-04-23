import { 
  IBillLogData, 
  ICreateBillManuallyParams 
} from '@/app/types/types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get Bills
export const GetBills = async (token: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/invoice/`,
      {
        headers: {
          "Authorization": token
        }
      }
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

export const CreateBillsFromXls = async (token: string, file: File): Promise<any> => {
  let body = new FormData()
  body.append("file", file!)

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/invoice/add_bills_with_file/',
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
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
  token
}: ICreateBillManuallyParams): Promise<any> => {
  let body = {
    amount: amount,
    date: date,
    clientId: clientId,
    clientName: clientName,
    billId: billId,
  }

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/invoice/',
      body,
      {
        headers: {
          'Authorization': token
        }
      }
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

// Get Bills by client
export const GetBillsByClient = async (client_id: string, token: string): Promise<any> => {

  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/invoice/${client_id}/`,
      {
        headers: {
          Authorization: token
        }
      }
    ).then((res) => {
      r(res.data)
    }).catch((err => {
      r(err)
    }))
  })
}