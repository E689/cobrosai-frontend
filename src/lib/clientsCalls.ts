import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get Bills
export const GetClients = async (id: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/clients/${id}`,
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}