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
    let user: IUserAccount = { email: "", jwt: undefined, type: 0, id: "" }

    await axios.post(
      API_URL + '/users/login',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      if (res.statusText === "OK") {
        user.email = res.data.email
        user.id = res.data.id
        user.jwt = res.data.jwt
        user.type = res.data.type

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
      API_URL + '/users/forgot-password',
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
      API_URL + '/users/register/file',
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
    "date": bill?.date,
    "email": email,
    "billId": bill?.billId,
    "amount": bill?.amount!.toString(),
    "clientId": bill?.clientId!.toString(),
    "clientName": bill?.clientName
  }
  return await new Promise<any>(async r => {
    await axios.post(
      API_URL + '/users/register/bill',
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