import { 
  ISignInParams, 
  IRecoverParams, 
  IChangeParams, 
  IUserAccount, 
  IRegisterParams 
} from "@/app/types/types"

import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const SignIn = async ({ email, password }: ISignInParams): Promise<any> => {
  return await new Promise<any>(async r => {
    const credentials = { email: email, password: password }
    let user: IUserAccount = { name: "", token: "" }

    await axios.post(
      API_URL + '/user/signin/',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      console.log(res.data)
      if (res.statusText === "OK") {
        user.name = res.data.user_name
        user.token = res.data.token

        localStorage.setItem('user', JSON.stringify(user))
      }
      r(res)
    }).catch((err => {
      r(err)
    }))
  })
}

export const SignOut = (): string => {
  localStorage.removeItem('user')

  return "OK"
}

// TODO: Make a Register endpoint
export const Register = async ({ email, password }: IRegisterParams): Promise<any> => {
  const credentials = {
    "email": email,
    "password": password
  }
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/users/register',
      credentials,
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

export const Recover = async ({ email }: IRecoverParams): Promise<any> => {
  const credentials = {
    "email": email
  }
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/user/forgotPassword/',
      credentials,
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

export const ChangePassword = async ({ email, oldPassword, newPassword }: IChangeParams): Promise<any> => {
  const credentials = {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword
  }
  return await new Promise<any>(async r => {
    await axios.put(
      API_URL + '/users/change-password',
      credentials,
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

// Quick register flows
export const RegisterFile = async ({ email, file }: IRegisterParams): Promise<any> => {
  let body = new FormData()
  body.append("email", email!)
  body.append("file", file!)

  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/user/quick_sign_in/',
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

export const RegisterBill = async ({ email, bill }: IRegisterParams): Promise<any> => {
  const body = {
    "date": bill?.issue_date,
    "email": email,
    "billId": bill?.dte_number,
    "amount": bill?.total!.toString(),
    "clientId": bill?.recipient_nit!.toString(),
    "clientName": bill?.recipient_name
  }
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/user/quick_sign_in_manual/',
      body,
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