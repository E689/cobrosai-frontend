import { ISignInParams, ISignOutParams, IRecoverParams, IChangeParams, IAuthContext, IUserAccount } from "@/app/types/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const SignIn = async ({ email, password }: ISignInParams): Promise<IUserAccount> => {
  return await new Promise<IUserAccount>(r => {
    const credentials: IUserAccount = { email, jwt: 'test-jwt', type: 'user' }
    /**
    const res = await fetch(API_URL + "/users/login", {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" }
    })
    // TODO: Add logic to handdle exceptions on wrong request or incorrect credentials.
    // throw new Error();
  
    const user = await res.json()
    */
    // Here I should set JWT cookie and user info as localstorage.
    localStorage.setItem('user', JSON.stringify(credentials))

    setTimeout(() => r(credentials), 1000)
  })
}

export const SignOut = async ({ jwt }: ISignOutParams): Promise<any> => {
  console.log("SignOut with: (", jwt, ")")

  return await new Promise<ISignOutParams>(r => {
    localStorage.removeItem('user')

    setTimeout(() => r({ jwt }), 1000)
  })
  /**
  const res = await fetch(API_URL + "/users/logout", {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" }
  })
  // TODO: Add logic to handdle exceptions on wrong request or incorrect credentials.
  // throw new Error();

  */
  // Here I should remove JWT cookie and user info from localstorage.
}
