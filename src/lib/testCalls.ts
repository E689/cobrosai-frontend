import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Run CRON job for user.
export const RunCron = async (userId: string): Promise<any> => {
  return await new Promise<any>(async r => {
    await axios.get(
      API_URL + `/users/email/${userId}`,
    ).then((res) => {
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}